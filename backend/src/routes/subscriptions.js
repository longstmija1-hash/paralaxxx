const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * POST /api/subscriptions/webhook
 * Stripe webhook handler — updates subscription status in DB
 * In production: verify Stripe signature using stripe.webhooks.constructEvent()
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  // TODO: const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // TODO: const sig = req.headers['stripe-signature'];
  // TODO: const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

  // For MVP: parse body directly (add Stripe signature verification before going live!)
  let event;
  try {
    event = JSON.parse(req.body);
  } catch {
    return res.status(400).json({ error: 'Invalid webhook payload' });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const userId = sub.metadata?.userId;
        if (!userId) break;
        const plan = sub.metadata?.plan || 'listener';
        await db.query(
          `INSERT INTO subscriptions (user_id, plan, status, stripe_subscription_id, stripe_customer_id, expires_at)
           VALUES ($1, $2, $3, $4, $5, to_timestamp($6))
           ON CONFLICT (stripe_subscription_id) DO UPDATE
           SET status = $3, expires_at = to_timestamp($6)`,
          [userId, plan, sub.status === 'active' ? 'active' : 'paused',
           sub.id, sub.customer, sub.current_period_end]
        );
        await db.query('UPDATE users SET plan = $1 WHERE id = $2', [plan, userId]);
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        await db.query(
          `UPDATE subscriptions SET status = 'cancelled' WHERE stripe_subscription_id = $1`,
          [sub.id]
        );
        const userId = sub.metadata?.userId;
        if (userId) {
          await db.query("UPDATE users SET plan = 'listener' WHERE id = $1", [userId]);
        }
        break;
      }
      case 'invoice.payment_failed': {
        // Could trigger notification to user via Socket.io
        console.log('[Stripe] Payment failed:', event.data.object.customer);
        break;
      }
    }
    return res.json({ received: true });
  } catch (err) {
    console.error('[subscriptions/webhook]', err.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// GET /api/subscriptions/my
router.get('/my', async (req, res) => {
  const { authenticate } = require('../middleware/auth');
  return authenticate(req, res, async () => {
    try {
      const result = await db.query(
        `SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [req.user.id]
      );
      return res.json({ subscription: result.rows[0] || null });
    } catch {
      return res.status(500).json({ error: 'Failed to fetch subscription' });
    }
  });
});

module.exports = router;
