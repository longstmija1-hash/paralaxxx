const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');
const { softBan } = require('../middleware/softBan');

const router = express.Router();
const COINS_PER_HW = parseInt(process.env.COINS_PER_HW || '10', 10);

// GET /api/homeworks/lesson/:lessonId — get HW for a lesson (student's own)
router.get('/lesson/:lessonId', authenticate, authorize('student'), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM homeworks WHERE lesson_id = $1 AND student_id = $2`,
      [req.params.lessonId, req.user.id]
    );
    return res.json({ homework: result.rows[0] || null });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch homework' });
  }
});

// POST /api/homeworks/submit — submit a homework
// Blocked by softBan middleware if lives === 0
router.post('/submit', authenticate, authorize('student'), softBan, async (req, res) => {
  const { lessonId, githubUrl, codeSnippet } = req.body;
  if (!lessonId) {
    return res.status(400).json({ error: 'lessonId is required' });
  }
  if (!githubUrl && !codeSnippet) {
    return res.status(400).json({ error: 'Provide a GitHub URL or code snippet' });
  }

  try {
    // Check if HW record exists
    const existing = await db.query(
      `SELECT id, status, deadline FROM homeworks WHERE lesson_id = $1 AND student_id = $2`,
      [lessonId, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'No homework record found for this lesson' });
    }

    const hw = existing.rows[0];
    if (['accepted'].includes(hw.status)) {
      return res.status(409).json({ error: 'Homework already accepted' });
    }

    // Update submission
    const result = await db.query(
      `UPDATE homeworks
       SET github_url = $1, code_snippet = $2, status = 'submitted', submitted_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [githubUrl || null, codeSnippet || null, hw.id]
    );

    // Award coins if submitted before deadline
    if (new Date() <= new Date(hw.deadline)) {
      await db.query(
        `UPDATE gamification SET coin_balance = coin_balance + $1 WHERE user_id = $2`,
        [COINS_PER_HW, req.user.id]
      );
      await db.query(
        `INSERT INTO coin_transactions (user_id, amount, reason)
         VALUES ($1, $2, $3)`,
        [req.user.id, COINS_PER_HW, `ДЗ сдано вовремя (урок #${lessonId})`]
      );
    }

    return res.json({ homework: result.rows[0], coinsEarned: COINS_PER_HW });
  } catch (err) {
    console.error('[homeworks/submit]', err.message);
    return res.status(500).json({ error: 'Failed to submit homework' });
  }
});

// PATCH /api/homeworks/:id/review — curator reviews HW
router.patch('/:id/review', authenticate, authorize('curator', 'admin'), async (req, res) => {
  const { action, comment, audioCommentUrl } = req.body;
  if (!['accept', 'revision'].includes(action)) {
    return res.status(400).json({ error: "Action must be 'accept' or 'revision'" });
  }

  try {
    const newStatus = action === 'accept' ? 'accepted' : 'revision';
    const result = await db.query(
      `UPDATE homeworks
       SET status = $1,
           curator_comment = $2,
           audio_comment_url = $3,
           reviewer_id = $4,
           reviewed_at = NOW()
       WHERE id = $5
       RETURNING *, student_id`,
      [newStatus, comment || null, audioCommentUrl || null, req.user.id, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Homework not found' });
    }

    const hw = result.rows[0];

    // Emit real-time notification to student
    const io = req.app.locals.io;
    if (io) {
      io.to(`user_${hw.student_id}`).emit('hw_reviewed', {
        hwId: hw.id,
        status: newStatus,
        comment: hw.curator_comment,
        message:
          newStatus === 'accepted'
            ? '✅ Куратор принял твоё ДЗ! Молодец!'
            : `🔁 Куратор отправил ДЗ на доработку: ${hw.curator_comment}`,
      });
    }

    return res.json({ homework: hw });
  } catch (err) {
    console.error('[homeworks/review]', err.message);
    return res.status(500).json({ error: 'Failed to review homework' });
  }
});

// GET /api/homeworks/:id — get single homework (curator/admin)
router.get('/:id', authenticate, authorize('curator', 'admin', 'student'), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT h.*, l.title AS lesson_title, u.name AS student_name
       FROM homeworks h
       JOIN lessons l ON h.lesson_id = l.id
       JOIN users u ON h.student_id = u.id
       WHERE h.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json({ homework: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch homework' });
  }
});

module.exports = router;
