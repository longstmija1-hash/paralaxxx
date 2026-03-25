const db = require('../db');

/**
 * LIFE CHECKER SERVICE
 *
 * Called by the daily cron job.
 * Finds all overdue homeworks, deducts a life, checks for soft ban,
 * and emits real-time Socket.io events to affected students.
 *
 * @param {import('socket.io').Server} io
 */
const runLifeChecker = async (io) => {
  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // 1) Find all overdue, unsubmitted homeworks that haven't had a life deducted yet
    const overdueResult = await client.query(`
      SELECT
        h.id AS hw_id,
        h.student_id,
        h.lesson_id,
        h.deadline,
        l.title AS lesson_title
      FROM homeworks h
      JOIN lessons l ON h.lesson_id = l.id
      WHERE
        h.status = 'pending'
        AND h.deadline < NOW()
        AND h.life_deducted = FALSE
    `);

    console.log(`[LifeChecker] Found ${overdueResult.rows.length} overdue homeworks`);

    for (const hw of overdueResult.rows) {
      // 2) Mark homework as overdue and flag life_deducted
      await client.query(
        `UPDATE homeworks
         SET status = 'overdue', life_deducted = TRUE
         WHERE id = $1`,
        [hw.hw_id]
      );

      // 3) Decrement lives (minimum 0)
      const updateResult = await client.query(
        `UPDATE gamification
         SET lives_count = GREATEST(lives_count - 1, 0),
             updated_at = NOW()
         WHERE user_id = $1
         RETURNING lives_count`,
        [hw.student_id]
      );

      const newLivesCount = updateResult.rows[0]?.lives_count ?? 0;
      console.log(
        `[LifeChecker] Student ${hw.student_id} lost a life. Lives remaining: ${newLivesCount}`
      );

      // 4) Soft ban: downgrade plan if lives === 0
      if (newLivesCount === 0) {
        await client.query(
          `UPDATE users SET plan = 'listener' WHERE id = $1 AND plan = 'student'`,
          [hw.student_id]
        );
        console.log(`[LifeChecker] Student ${hw.student_id} downgraded to 'listener' plan`);
      }

      // 5) Emit real-time Socket.io event to the student
      if (io) {
        io.to(`user_${hw.student_id}`).emit('life_lost', {
          studentId: hw.student_id,
          hwId: hw.hw_id,
          lessonTitle: hw.lesson_title,
          livesRemaining: newLivesCount,
          isBanned: newLivesCount === 0,
          message:
            newLivesCount === 0
              ? '💀 У тебя 0 жизней! Доступ к ручной проверке заблокирован.'
              : `🔥 Сгорела жизнь! Урок: «${hw.lesson_title}». Осталось ${newLivesCount} жизни. Соберись!`,
        });
      }
    }

    await client.query('COMMIT');
    console.log('[LifeChecker] Done.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[LifeChecker] Error, rolled back:', err.message);
  } finally {
    client.release();
  }
};

module.exports = { runLifeChecker };
