const express = require('express');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const router = express.Router();

router.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

async function userAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      'SELECT id, batch_id, active_session_id FROM users WHERE id = $1',
      [payload.id]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid user' });
    }
    const user = result.rows[0];
    if (!user.active_session_id || user.active_session_id !== payload.sessionId) {
      return res.status(401).json({ error: 'Session expired' });
    }

    req.user = user;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/course', userAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT c.id, c.name, b.id AS batch_id, b.name AS batch_name, b.target_year, b.class_label
     FROM users u
     JOIN batches b ON b.id = u.batch_id
     JOIN courses c ON c.id = b.course_id
     WHERE u.id = $1`,
    [req.user.id]
  );
  res.json({ success: true, course: result.rows[0] || null });
});

router.get('/books', userAuth, async (req, res) => {
  const subject = req.query.subject?.toString() || '';
  const topic = req.query.topic?.toString() || '';
  const books = await pool.query(
    `SELECT bk.id, bk.title, bk.subject, bk.topic, bk.level, bk.category, bk.class_label
     FROM books bk
     JOIN batches ub ON ub.id = $1
     WHERE bk.batch_id = $1
       AND (bk.class_label IS NULL OR bk.class_label = '' OR bk.class_label = ub.class_label)
       AND ($2 = '' OR bk.subject = $2)
       AND ($3 = '' OR bk.topic = $3)
     ORDER BY id DESC`,
    [req.user.batch_id, subject, topic]
  );
  res.json({ success: true, books: books.rows });
});

router.get('/books/:bookId/chapters', userAuth, async (req, res) => {
  const chapters = await pool.query(
    `SELECT ch.id, ch.title, ch.overview, ch.note_summary, ch.highlight, ch.material_type, ch.material_drive_link,
        (SELECT COUNT(*)::int FROM pyqs p WHERE p.chapter_id = ch.id) AS linked_pyq_count
     FROM book_chapters ch
     JOIN books b ON b.id = ch.book_id
     WHERE ch.book_id = $1 AND b.batch_id = $2
     ORDER BY ch.id ASC`,
    [req.params.bookId, req.user.batch_id]
  );
  res.json({ success: true, chapters: chapters.rows });
});

router.get('/chapters/:chapterId/pyqs', userAuth, async (req, res) => {
  const pyqs = await pool.query(
    `SELECT p.id, p.question, p.option_a, p.option_b, p.option_c, p.option_d, p.correct_option, p.explanation, p.year_label
     FROM pyqs p
     JOIN book_chapters ch ON ch.id = p.chapter_id
     JOIN books b ON b.id = ch.book_id
     WHERE p.chapter_id = $1 AND b.batch_id = $2
     ORDER BY p.id ASC`,
    [req.params.chapterId, req.user.batch_id]
  );
  res.json({ success: true, pyqs: pyqs.rows });
});

router.get('/practice-sets', userAuth, async (req, res) => {
  const subject = req.query.subject?.toString() || '';
  const topic = req.query.topic?.toString() || '';
  const result = await pool.query(
    `SELECT ps.id, ps.title, ps.topic, ps.subject, ps.class_label, ps.difficulty, ps.estimated_minutes
     FROM practice_sets ps
     JOIN batches ub ON ub.id = $1
     WHERE ps.batch_id = $1
       AND (ps.class_label IS NULL OR ps.class_label = '' OR ps.class_label = ub.class_label)
       AND ($2 = '' OR ps.subject = $2)
       AND ($3 = '' OR ps.topic = $3)
     ORDER BY id DESC`,
    [req.user.batch_id, subject, topic]
  );
  res.json({ success: true, practiceSets: result.rows });
});

router.get('/tests', userAuth, async (req, res) => {
  const subject = req.query.subject?.toString() || '';
  const topic = req.query.topic?.toString() || '';
  const result = await pool.query(
    `SELECT t.id, t.title, t.category, t.subject, t.topic, t.class_label, t.duration_minutes, t.marks, t.question_count, t.syllabus_coverage, t.schedule_label
     FROM tests t
     JOIN batches ub ON ub.id = $1
     WHERE t.batch_id = $1
       AND (t.class_label IS NULL OR t.class_label = '' OR t.class_label = ub.class_label)
       AND ($2 = '' OR t.subject = $2)
       AND ($3 = '' OR t.topic = $3)
     ORDER BY id DESC`,
    [req.user.batch_id, subject, topic]
  );
  res.json({ success: true, tests: result.rows });
});

router.get('/videos', userAuth, async (req, res) => {
  const subject = req.query.subject?.toString() || '';
  const topic = req.query.topic?.toString() || '';
  const result = await pool.query(
    `SELECT v.id, v.title, v.subject, v.topic, v.class_label, v.chapter_hint, v.section_label, v.duration_label, v.drive_link
     FROM videos v
     JOIN batches ub ON ub.id = $1
     WHERE v.batch_id = $1
       AND (v.class_label IS NULL OR v.class_label = '' OR v.class_label = ub.class_label)
       AND ($2 = '' OR v.subject = $2)
       AND ($3 = '' OR v.topic = $3)
     ORDER BY id DESC`,
    [req.user.batch_id, subject, topic]
  );
  res.json({ success: true, videos: result.rows });
});

router.post('/tests/:testId/submit', userAuth, async (req, res) => {
  const { score = 0, accuracy = 0, correctCount = 0, wrongCount = 0, unattemptedCount = 0 } = req.body;
  const attempt = await pool.query(
    `INSERT INTO test_attempts (user_id, test_id, score, accuracy)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [req.user.id, req.params.testId, score, accuracy]
  );
  const analytics = await pool.query(
    `INSERT INTO exam_analytics (user_id, test_id, overall_accuracy, correct_count, wrong_count, unattempted_count)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [req.user.id, req.params.testId, accuracy, correctCount, wrongCount, unattemptedCount]
  );
  const analyticsId = analytics.rows[0].id;
  const insightRows = [
    ['AI Exam Summary', 'Your biology score is stable but physics accuracy dropped. Revise mechanics and do 30 mixed MCQs.', 'high'],
    ['Recommended Next Step', 'Do 1 full test after 48 hours and review incorrect questions section-wise.', 'medium'],
  ];
  for (const [title, body, priority] of insightRows) {
    await pool.query(
      `INSERT INTO ai_insights (analytics_id, insight_title, insight_body, priority)
       VALUES ($1,$2,$3,$4)`,
      [analyticsId, title, body, priority]
    );
  }

  res.json({ success: true, attempt: attempt.rows[0], analytics: analytics.rows[0] });
});

router.get('/analytics/latest', userAuth, async (req, res) => {
  const analyticsResult = await pool.query(
    `SELECT *
     FROM exam_analytics
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [req.user.id]
  );

  if (analyticsResult.rows.length === 0) {
    return res.json({
      success: true,
      analytics: null,
      donut: { correct: 0, wrong: 0, unattempted: 0 },
      insights: [],
    });
  }

  const analytics = analyticsResult.rows[0];
  const insights = await pool.query(
    `SELECT insight_title, insight_body, priority
     FROM ai_insights
     WHERE analytics_id = $1
     ORDER BY id ASC`,
    [analytics.id]
  );

  res.json({
    success: true,
    analytics,
    donut: {
      correct: analytics.correct_count,
      wrong: analytics.wrong_count,
      unattempted: analytics.unattempted_count,
    },
    insights: insights.rows,
  });
});

module.exports = router;
