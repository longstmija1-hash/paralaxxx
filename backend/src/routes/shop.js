const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/shop/items
router.get('/items', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, description, image_url, coin_price, stock
       FROM shop_items WHERE is_active = TRUE ORDER BY coin_price ASC`
    );
    return res.json({ items: result.rows });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch shop items' });
  }
});

// POST /api/shop/orders — purchase an item
router.post('/orders', authenticate, authorize('student'), async (req, res) => {
  const { itemId, quantity = 1, address } = req.body;
  if (!itemId) return res.status(400).json({ error: 'itemId is required' });

  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // Get item
    const itemResult = await client.query(
      'SELECT * FROM shop_items WHERE id = $1 AND is_active = TRUE',
      [itemId]
    );
    if (itemResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Item not found' });
    }
    const item = itemResult.rows[0];
    const totalCoins = item.coin_price * quantity;

    // Check stock
    if (item.stock !== -1 && item.stock < quantity) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Not enough stock' });
    }

    // Check coin balance
    const gamResult = await client.query(
      'SELECT coin_balance FROM gamification WHERE user_id = $1 FOR UPDATE',
      [req.user.id]
    );
    const { coin_balance } = gamResult.rows[0];
    if (coin_balance < totalCoins) {
      await client.query('ROLLBACK');
      return res.status(402).json({ error: 'Недостаточно коинов', have: coin_balance, need: totalCoins });
    }

    // Deduct coins
    await client.query(
      `UPDATE gamification SET coin_balance = coin_balance - $1 WHERE user_id = $2`,
      [totalCoins, req.user.id]
    );
    await client.query(
      `INSERT INTO coin_transactions (user_id, amount, reason) VALUES ($1, $2, $3)`,
      [req.user.id, -totalCoins, `Покупка: ${item.name} x${quantity}`]
    );

    // Reduce stock
    if (item.stock !== -1) {
      await client.query(
        'UPDATE shop_items SET stock = stock - $1 WHERE id = $2',
        [quantity, itemId]
      );
    }

    // Create order
    const orderResult = await client.query(
      `INSERT INTO shop_orders (user_id, item_id, quantity, total_coins, address)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.id, itemId, quantity, totalCoins, address || null]
    );

    await client.query('COMMIT');

    return res.status(201).json({
      order: orderResult.rows[0],
      coinsSpent: totalCoins,
      message: `🎁 Заказ оформлен! Потрачено ${totalCoins} коинов.`,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[shop/orders]', err.message);
    return res.status(500).json({ error: 'Purchase failed' });
  } finally {
    client.release();
  }
});

// GET /api/shop/orders — user's orders
router.get('/orders', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT o.*, i.name AS item_name, i.image_url
       FROM shop_orders o JOIN shop_items i ON o.item_id = i.id
       WHERE o.user_id = $1 ORDER BY o.ordered_at DESC`,
      [req.user.id]
    );
    return res.json({ orders: result.rows });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
