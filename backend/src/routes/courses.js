const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.*, COUNT(l.id)::int AS lesson_count
       FROM courses c
       LEFT JOIN lessons l ON l.course_id = c.id
       WHERE c.is_active = TRUE
       GROUP BY c.id ORDER BY c.direction, c.id`
    );
    return res.json({ courses: result.rows });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /api/courses/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const course = await db.query('SELECT * FROM courses WHERE id = $1', [req.params.id]);
    if (!course.rows.length) return res.status(404).json({ error: 'Course not found' });

    const lessons = await db.query(
      `SELECT id, title, order_num, published_at, deadline_days
       FROM lessons WHERE course_id = $1 ORDER BY order_num ASC`,
      [req.params.id]
    );

    // Check enrollment
    const enrolled = await db.query(
      'SELECT id FROM enrollments WHERE student_id = $1 AND course_id = $2',
      [req.user.id, req.params.id]
    );

    return res.json({
      course: course.rows[0],
      lessons: lessons.rows,
      isEnrolled: enrolled.rows.length > 0,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// GET /api/courses/:courseId/lessons/:lessonId
router.get('/:courseId/lessons/:lessonId', authenticate, async (req, res) => {
  try {
    // Verify enrollment
    const enrolled = await db.query(
      'SELECT id FROM enrollments WHERE student_id = $1 AND course_id = $2',
      [req.user.id, req.params.courseId]
    );
    if (!enrolled.rows.length && req.user.role === 'student') {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }

    const lessonResult = await db.query('SELECT * FROM lessons WHERE id = $1', [req.params.lessonId]);
    if (!lessonResult.rows.length) return res.status(404).json({ error: 'Lesson not found' });

    const lesson = lessonResult.rows[0];

    // Get or create homework record
    let hwResult = await db.query(
      'SELECT * FROM homeworks WHERE lesson_id = $1 AND student_id = $2',
      [lesson.id, req.user.id]
    );
    if (hwResult.rows.length === 0 && req.user.role === 'student') {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + (lesson.deadline_days || 7));
      hwResult = await db.query(
        `INSERT INTO homeworks (lesson_id, student_id, deadline, status)
         VALUES ($1, $2, $3, 'pending') RETURNING *`,
        [lesson.id, req.user.id, deadline]
      );
    }

    return res.json({
      lesson,
      homework: hwResult.rows[0] || null,
    });
  } catch (err) {
    console.error('[courses/lesson]', err.message);
    return res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// POST /api/courses/:id/enroll
router.post('/:id/enroll', authenticate, authorize('student', 'admin'), async (req, res) => {
  try {
    await db.query(
      `INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [req.user.id, req.params.id]
    );
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to enroll' });
  }
});

module.exports = router;
