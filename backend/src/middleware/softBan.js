const db = require('../db');

/**
 * SOFT BAN MIDDLEWARE
 *
 * Blocks access if the student has 0 lives remaining.
 * Only applies to students — curators and admins pass through.
 * Apply this middleware to routes that should be restricted when banned:
 *   - POST /homeworks/submit
 *   - GET/POST /chat/curator
 */
const softBan = async (req, res, next) => {
  // Only enforce for students
  if (!req.user || req.user.role !== 'student') {
    return next();
  }

  try {
    const result = await db.query(
      'SELECT lives_count FROM gamification WHERE user_id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      // No gamification record means they haven't started — allow through
      return next();
    }

    const { lives_count } = result.rows[0];

    if (lives_count === 0) {
      return res.status(403).json({
        error: 'Soft ban active',
        message:
          'У тебя закончились жизни! Доступ к сдаче ДЗ и чату с куратором заблокирован. Обратись в поддержку или дождись начала нового месяца.',
        code: 'SOFT_BANNED',
        lives_count: 0,
      });
    }

    next();
  } catch (err) {
    console.error('[softBan middleware] Error:', err.message);
    next(); // fail open to avoid blocking legitimate users on DB error
  }
};

module.exports = { softBan };
