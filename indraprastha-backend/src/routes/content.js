const express = require('express');
const jwt = require('jsonwebtoken');
const pdfParse = require('pdf-parse');
const { pool } = require('../db');
const {
  normalizeDriveLink,
  extractDriveFileId,
  buildDrivePublicLinks,
  downloadDriveFileBuffer,
  extractPdfTextWithDriveOcr,
  findRecentPdfInFolder,
} = require('../services/drive');

const router = express.Router();

router.use((_req, res, next) => {
  // Small private cache window improves app responsiveness on back-navigation.
  res.setHeader('Cache-Control', 'private, max-age=20, stale-while-revalidate=40');
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

function mapChapterLinks(chapter) {
  const fileId = chapter.material_drive_file_id || extractDriveFileId(chapter.material_drive_link);
  const links = buildDrivePublicLinks(fileId);
  return {
    ...chapter,
    material_drive_file_id: fileId || '',
    material_drive_link:
      links.previewLink || normalizeDriveLink(chapter.material_drive_link, 'preview'),
  };
}

function mapQuestionImageLink(question) {
  const fileId =
    question.question_image_drive_file_id || extractDriveFileId(question.question_image_link);
  const links = buildDrivePublicLinks(fileId);
  return {
    ...question,
    question_image_drive_file_id: fileId || '',
    question_image_link:
      links.imageLink || normalizeDriveLink(question.question_image_link, 'image'),
  };
}

async function ensureChapterExtracted(chapter) {
  const noteSummary = (chapter.note_summary || '').toString().trim();
  const materialType = (chapter.material_type || '').toString().toLowerCase();
  const persistedFileId = chapter.material_drive_file_id || extractDriveFileId(chapter.material_drive_link);
  const fileId = persistedFileId || (await findRecentPdfInFolder(chapter.material_drive_folder_id));

  if (materialType !== 'pdf' || noteSummary.isNotEmpty || !fileId) {
    return mapChapterLinks({
      ...chapter,
      material_drive_file_id: persistedFileId || fileId || '',
    });
  }

  try {
    const pdfBuffer = await downloadDriveFileBuffer(fileId);
    if (!pdfBuffer.length) {
      return mapChapterLinks(chapter);
    }
    let extractedText = '';
    try {
      const parsed = await pdfParse(pdfBuffer);
      extractedText = (parsed.text || '').replace(/\u0000/g, '').trim();
    } catch (_) {}

    const ocrText = await extractPdfTextWithDriveOcr({
      fileBuffer: pdfBuffer,
      fileName: `${chapter.title || 'chapter'}.pdf`,
    });
    if ((ocrText || '').trim().length > extractedText.length) {
      extractedText = (ocrText || '').trim();
    }
    const cleaned = (extractedText || '').replace(/\u0000/g, '').trim();
    if (!cleaned) {
      return mapChapterLinks(chapter);
    }

    const highlight =
      cleaned.replace(/\n+/g, ' ').split(/[.?!]/).find((s) => s.trim().length > 20)?.trim().slice(0, 220) ||
      cleaned.slice(0, 220);

    const updated = await pool.query(
      `UPDATE book_chapters
       SET note_summary = $2,
           highlight = CASE WHEN COALESCE(highlight, '') = '' THEN $3 ELSE highlight END,
           material_drive_file_id = COALESCE(NULLIF(material_drive_file_id, ''), $4)
       WHERE id = $1
       RETURNING id, title, overview, note_summary, highlight, material_type, material_drive_link, material_drive_file_id, material_drive_folder_id`,
      [chapter.id, cleaned.slice(0, 120000), highlight, fileId]
    );
    return mapChapterLinks({
      ...chapter,
      ...updated.rows[0],
    });
  } catch (_) {
    return mapChapterLinks(chapter);
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
    `SELECT ch.id, ch.title, ch.overview, ch.note_summary, ch.highlight, ch.material_type, ch.material_drive_link, ch.material_drive_file_id, ch.material_drive_folder_id,
        (SELECT COUNT(*)::int FROM pyqs p WHERE p.chapter_id = ch.id) AS linked_pyq_count
     FROM book_chapters ch
     JOIN books b ON b.id = ch.book_id
     WHERE ch.book_id = $1 AND b.batch_id = $2
     ORDER BY ch.id ASC`,
    [req.params.bookId, req.user.batch_id]
  );
  if (chapters.rows.length > 0) {
    const hydrated = await Promise.all(chapters.rows.map(ensureChapterExtracted));
    return res.json({ success: true, chapters: hydrated });
  }

  // Backward-compatible fallback:
  // if an old book exists without chapters, create one default chapter from book topic/title.
  const bookResult = await pool.query(
    `SELECT id, title, topic
     FROM books
     WHERE id = $1 AND batch_id = $2
     LIMIT 1`,
    [req.params.bookId, req.user.batch_id]
  );
  if (bookResult.rows.length === 0) {
    return res.json({ success: true, chapters: [] });
  }

  const book = bookResult.rows[0];
  const defaultChapterTitle =
    (book.topic && String(book.topic).trim()) ||
    `${book.title || 'Book'} Chapter 1`;
  const created = await pool.query(
    `INSERT INTO book_chapters (book_id, title, overview, note_summary, highlight, material_type)
     VALUES ($1, $2, '', '', '', 'text')
     RETURNING id, title, overview, note_summary, highlight, material_type, material_drive_link, material_drive_file_id, material_drive_folder_id`,
    [book.id, defaultChapterTitle]
  );

  const chapter = {
    ...mapChapterLinks(created.rows[0]),
    linked_pyq_count: 0,
  };
  return res.json({ success: true, chapters: [chapter] });
});

router.get('/chapters/:chapterId', userAuth, async (req, res) => {
  const chapter = await pool.query(
    `SELECT ch.id, ch.title, ch.overview, ch.note_summary, ch.highlight, ch.material_type, ch.material_drive_link, ch.material_drive_file_id, ch.material_drive_folder_id,
        (SELECT COUNT(*)::int FROM pyqs p WHERE p.chapter_id = ch.id) AS linked_pyq_count
     FROM book_chapters ch
     JOIN books b ON b.id = ch.book_id
     WHERE ch.id = $1 AND b.batch_id = $2
     LIMIT 1`,
    [req.params.chapterId, req.user.batch_id]
  );
  if (chapter.rows.length === 0) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  res.json({ success: true, chapter: await ensureChapterExtracted(chapter.rows[0]) });
});

router.get('/chapters/:chapterId/pyqs', userAuth, async (req, res) => {
  const pyqs = await pool.query(
    `SELECT p.id, p.question, p.option_a, p.option_b, p.option_c, p.option_d, p.correct_option, p.explanation, p.year_label, p.question_image_link, p.question_image_drive_file_id, p.question_image_drive_folder_id
     FROM pyqs p
     JOIN book_chapters ch ON ch.id = p.chapter_id
     JOIN books b ON b.id = ch.book_id
     WHERE p.chapter_id = $1 AND b.batch_id = $2
     ORDER BY p.id ASC`,
    [req.params.chapterId, req.user.batch_id]
  );
  res.json({ success: true, pyqs: pyqs.rows.map(mapQuestionImageLink) });
});

router.get('/practice-sets', userAuth, async (req, res) => {
  const subject = req.query.subject?.toString() || '';
  const topic = req.query.topic?.toString() || '';
  const result = await pool.query(
    `SELECT ps.id, ps.title, ps.topic, ps.subject, ps.class_label, ps.difficulty, ps.estimated_minutes,
        (SELECT COUNT(*)::int FROM practice_questions pq WHERE pq.practice_set_id = ps.id) AS question_count
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

router.get('/practice-sets/:setId/questions', userAuth, async (req, res) => {
  const setMeta = await pool.query(
    `SELECT ps.id, ps.title, ps.topic, ps.subject, ps.difficulty, ps.estimated_minutes
     FROM practice_sets ps
     JOIN batches ub ON ub.id = $2
     WHERE ps.id = $1
       AND ps.batch_id = $2
       AND (ps.class_label IS NULL OR ps.class_label = '' OR ps.class_label = ub.class_label)
     LIMIT 1`,
    [req.params.setId, req.user.batch_id]
  );
  if (setMeta.rows.length === 0) {
    return res.status(404).json({ error: 'Practice set not found' });
  }
  const questions = await pool.query(
    `SELECT id, question, option_a, option_b, option_c, option_d, correct_option, explanation, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
     FROM practice_questions
     WHERE practice_set_id = $1
     ORDER BY id ASC`,
    [req.params.setId]
  );
  res.json({
    success: true,
    practiceSet: setMeta.rows[0],
    questions: questions.rows.map(mapQuestionImageLink),
  });
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

router.get('/tests/:testId/questions', userAuth, async (req, res) => {
  const testMeta = await pool.query(
    `SELECT t.id, t.title, t.subject, t.topic, t.duration_minutes, t.marks, t.question_count
     FROM tests t
     JOIN batches ub ON ub.id = $2
     WHERE t.id = $1
       AND t.batch_id = $2
       AND (t.class_label IS NULL OR t.class_label = '' OR t.class_label = ub.class_label)
     LIMIT 1`,
    [req.params.testId, req.user.batch_id]
  );
  if (testMeta.rows.length === 0) {
    return res.status(404).json({ error: 'Test not found' });
  }
  const questions = await pool.query(
    `SELECT id, subject, question, option_a, option_b, option_c, option_d, correct_option, explanation, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
     FROM test_questions
     WHERE test_id = $1
     ORDER BY id ASC`,
    [req.params.testId]
  );
  res.json({
    success: true,
    test: testMeta.rows[0],
    questions: questions.rows.map(mapQuestionImageLink),
  });
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

router.get('/packages', userAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT id, name, price_label, validity, highlight, features_json, is_active
     FROM packages
     WHERE is_active = true
     ORDER BY id ASC`
  );
  res.json({ success: true, packages: result.rows });
});

router.post('/tests/:testId/submit', userAuth, async (req, res) => {
  try {
    const testId = Number(req.params.testId);
    if (!Number.isFinite(testId) || testId <= 0) {
      return res.status(400).json({ error: 'Invalid testId' });
    }
    // Ensure user is submitting only their batch's test.
    const testExists = await pool.query(
      `SELECT id, title, subject, topic
       FROM tests
       WHERE id = $1 AND batch_id = $2
       LIMIT 1`,
      [testId, req.user.batch_id]
    );
    if (testExists.rows.length === 0) {
      return res.status(404).json({ error: 'Test not found for your batch' });
    }

    const {
      score = 0,
      accuracy = 0,
      correctCount = 0,
      wrongCount = 0,
      unattemptedCount = 0,
    } = req.body || {};

    const attempt = await pool.query(
      `INSERT INTO test_attempts (user_id, test_id, score, accuracy)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [req.user.id, testId, score, accuracy]
    );
    const analytics = await pool.query(
      `INSERT INTO exam_analytics (user_id, test_id, overall_accuracy, correct_count, wrong_count, unattempted_count)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [req.user.id, testId, accuracy, correctCount, wrongCount, unattemptedCount]
    );
    const analyticsId = analytics.rows[0].id;
    const testMeta = testExists.rows[0];
    const subject = (testMeta.subject || 'this subject').toString();
    const topic = (testMeta.topic || 'current topic').toString();
    const safeAccuracy = Number(accuracy) || 0;
    const safeCorrect = Number(correctCount) || 0;
    const safeWrong = Number(wrongCount) || 0;
    const safeUnattempted = Number(unattemptedCount) || 0;
    const totalAttempted = safeCorrect + safeWrong;
    const attemptRate = totalAttempted + safeUnattempted > 0
      ? Math.round((totalAttempted / (totalAttempted + safeUnattempted)) * 100)
      : 0;

    const insightRows = [
      [
        `${subject} • ${topic} performance`,
        `You scored ${safeAccuracy.toFixed(1)}% accuracy in ${subject} (${topic}). Correct: ${safeCorrect}, Wrong: ${safeWrong}, Unattempted: ${safeUnattempted}.`,
        safeAccuracy < 55 ? 'high' : safeAccuracy < 75 ? 'medium' : 'low',
      ],
      [
        `Next action for ${topic}`,
        safeWrong > safeCorrect
          ? `Wrong answers are higher than correct in ${topic}. Revise theory first, then solve 30 targeted MCQs from ${topic}.`
          : `Keep momentum in ${topic}: do one timed revision quiz and analyse each wrong option.`,
        'medium',
      ],
      [
        'Attempt strategy',
        attemptRate < 80
          ? `Attempt rate is ${attemptRate}%. Increase attempt rate with elimination strategy and mark best possible options in ${subject}.`
          : `Attempt rate is ${attemptRate}%, which is good. Focus on reducing silly mistakes in ${topic}.`,
        'low',
      ],
    ];
    let insightsRows = [];
    try {
      for (const [title, body, priority] of insightRows) {
        await pool.query(
          `INSERT INTO ai_insights (analytics_id, insight_title, insight_body, priority)
           VALUES ($1,$2,$3,$4)`,
          [analyticsId, title, body, priority]
        );
      }

      const insights = await pool.query(
        `SELECT insight_title, insight_body, priority
         FROM ai_insights
         WHERE analytics_id = $1
         ORDER BY id ASC`,
        [analyticsId]
      );
      insightsRows = insights.rows;
    } catch (insightError) {
      console.error('[CONTENT_SUBMIT_INSIGHTS_ERROR]', {
        message: insightError?.message || 'Insight insert failed',
        stack: insightError?.stack,
        analyticsId,
      });
      insightsRows = insightRows.map(([insight_title, insight_body, priority]) => ({
        insight_title,
        insight_body,
        priority,
      }));
    }

    return res.json({
      success: true,
      attempt: attempt.rows[0],
      analytics: analytics.rows[0],
      donut: {
        correct: analytics.rows[0].correct_count,
        wrong: analytics.rows[0].wrong_count,
        unattempted: analytics.rows[0].unattempted_count,
      },
      insights: insightsRows,
    });
  } catch (e) {
    console.error('[CONTENT_SUBMIT_ERROR]', {
      message: e?.message || 'Unknown error',
      stack: e?.stack,
      testId: req.params?.testId,
      userId: req.user?.id,
    });
    return res.status(500).json({ error: e?.message || 'Submit failed' });
  }
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
