const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// ─── Student Dashboard ──────────────────────────────────────────────────────
// GET /api/dashboard/student
router.get('/student', authenticate, authorize('student'), async (req, res) => {
  try {
    const userId = req.user.id;

    // Gamification stats
    const gamResult = await db.query(
      'SELECT lives_count, coin_balance, reset_at FROM gamification WHERE user_id = $1',
      [userId]
    );
    const gamification = gamResult.rows[0] || { lives_count: 3, coin_balance: 0 };

    // Upcoming lessons (next 7 days)
    const lessonsResult = await db.query(
      `SELECT l.id, l.title, l.published_at, c.title AS course_title,
              h.status AS hw_status, h.deadline AS hw_deadline
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       JOIN lessons l ON l.course_id = c.id
       LEFT JOIN homeworks h ON h.lesson_id = l.id AND h.student_id = $1
       WHERE e.student_id = $1
         AND l.published_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
       ORDER BY l.published_at ASC
       LIMIT 10`,
      [userId]
    );

    // Overdue HWs
    const overdueResult = await db.query(
      `SELECT h.id, h.deadline, h.status, l.title AS lesson_title
       FROM homeworks h
       JOIN lessons l ON h.lesson_id = l.id
       WHERE h.student_id = $1 AND h.status IN ('pending', 'overdue')
       ORDER BY h.deadline ASC`,
      [userId]
    );

    // Recent coin transactions
    const coinsResult = await db.query(
      `SELECT amount, reason, created_at
       FROM coin_transactions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 5`,
      [userId]
    );

    return res.json({
      user: req.user,
      gamification,
      upcomingLessons: lessonsResult.rows,
      overdueHomeworks: overdueResult.rows,
      recentCoins: coinsResult.rows,
    });
  } catch (err) {
    console.error('[dashboard/student]', err.message);
    return res.status(500).json({ error: 'Failed to load student dashboard' });
  }
});

// ─── Parent Dashboard ───────────────────────────────────────────────────────
// GET /api/dashboard/parent/:childId
router.get('/parent/:childId', authenticate, authorize('parent', 'admin'), async (req, res) => {
  const { childId } = req.params;

  // Verify parent-child relationship
  if (req.user.role === 'parent') {
    const rel = await db.query(
      'SELECT id FROM parent_child WHERE parent_id = $1 AND child_id = $2',
      [req.user.id, childId]
    );
    if (rel.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied: not your child' });
    }
  }

  try {
    // Child info
    const childResult = await db.query(
      'SELECT id, name, email, plan FROM users WHERE id = $1',
      [childId]
    );
    if (childResult.rows.length === 0) {
      return res.status(404).json({ error: 'Child not found' });
    }

    // Gamification
    const gamResult = await db.query(
      'SELECT lives_count, coin_balance, reset_at FROM gamification WHERE user_id = $1',
      [childId]
    );

    // Homework report table
    const hwReport = await db.query(
      `SELECT
         l.title AS lesson_title,
         c.title AS course_title,
         h.status,
         h.deadline,
         h.submitted_at,
         h.curator_comment,
         g.lives_count
       FROM homeworks h
       JOIN lessons l ON h.lesson_id = l.id
       JOIN courses c ON l.course_id = c.id
       JOIN gamification g ON g.user_id = h.student_id
       WHERE h.student_id = $1
       ORDER BY h.deadline DESC
       LIMIT 50`,
      [childId]
    );

    // Subscription info
    const subResult = await db.query(
      `SELECT plan, status, expires_at, price_rub
       FROM subscriptions
       WHERE user_id = $1 AND status = 'active'
       ORDER BY created_at DESC LIMIT 1`,
      [childId]
    );

    return res.json({
      child: childResult.rows[0],
      gamification: gamResult.rows[0] || { lives_count: 3, coin_balance: 0 },
      homeworkReport: hwReport.rows,
      subscription: subResult.rows[0] || null,
    });
  } catch (err) {
    console.error('[dashboard/parent]', err.message);
    return res.status(500).json({ error: 'Failed to load parent dashboard' });
  }
});

// ─── Curator Dashboard ──────────────────────────────────────────────────────
// GET /api/dashboard/curator
router.get('/curator', authenticate, authorize('curator', 'admin'), async (req, res) => {
  try {
    const curatorId = req.user.id;

    // Students assigned to this curator
    const studentsResult = await db.query(
      `SELECT u.id, u.name, u.email, u.plan, g.lives_count, g.coin_balance
       FROM curator_students cs
       JOIN users u ON cs.student_id = u.id
       LEFT JOIN gamification g ON g.user_id = u.id
       WHERE cs.curator_id = $1
       ORDER BY u.name ASC`,
      [curatorId]
    );

    // HW queue: all submitted (unreviewed) homeworks from their students
    const hwQueueResult = await db.query(
      `SELECT
         h.id, h.github_url, h.file_path, h.code_snippet,
         h.submitted_at, h.deadline,
         l.title AS lesson_title,
         u.name AS student_name, u.id AS student_id
       FROM homeworks h
       JOIN curator_students cs ON cs.student_id = h.student_id AND cs.curator_id = $1
       JOIN lessons l ON h.lesson_id = l.id
       JOIN users u ON h.student_id = u.id
       WHERE h.status = 'submitted'
       ORDER BY h.submitted_at ASC`,
      [curatorId]
    );

    return res.json({
      curator: req.user,
      students: studentsResult.rows,
      hwQueue: hwQueueResult.rows,
    });
  } catch (err) {
    console.error('[dashboard/curator]', err.message);
    return res.status(500).json({ error: 'Failed to load curator dashboard' });
  }
});

module.exports = router;
