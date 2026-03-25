const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/gamification/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT lives_count, coin_balance, reset_at, updated_at FROM gamification WHERE user_id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gamification record not found' });
    }
    return res.json({ gamification: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch gamification data' });
  }
});

// GET /api/gamification/transactions
router.get('/transactions', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT amount, reason, created_at FROM coin_transactions
       WHERE user_id = $1 ORDER BY created_at DESC LIMIT 30`,
      [req.user.id]
    );
    return res.json({ transactions: result.rows });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST /api/gamification/award-coins (admin only)
router.post('/award-coins', authenticate, authorize('admin', 'curator'), async (req, res) => {
  const { studentId, amount, reason } = req.body;
  if (!studentId || !amount || !reason) {
    return res.status(400).json({ error: 'studentId, amount, and reason are required' });
  }
  try {
    await db.query(
      `UPDATE gamification SET coin_balance = coin_balance + $1 WHERE user_id = $2`,
      [amount, studentId]
    );
    await db.query(
      `INSERT INTO coin_transactions (user_id, amount, reason) VALUES ($1, $2, $3)`,
      [studentId, amount, reason]
    );

    // Notify student
    const io = req.app.locals.io;
    if (io) {
      io.to(`user_${studentId}`).emit('coins_earned', {
        amount,
        reason,
        message: `🪙 +${amount} коинов: ${reason}`,
      });
    }

    return res.json({ success: true, awarded: amount });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to award coins' });
  }
});

// POST /api/gamification/trigger-life-check (admin only, for testing)
router.post('/trigger-life-check', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { runLifeChecker } = require('../services/lifeChecker');
    const io = req.app.locals.io;
    await runLifeChecker(io);
    return res.json({ success: true, message: 'Life checker ran successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Life checker failed' });
  }
});

module.exports = router;
