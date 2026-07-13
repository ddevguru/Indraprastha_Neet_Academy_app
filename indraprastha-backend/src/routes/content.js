const express = require('express');
const jwt = require('jsonwebtoken');
const https = require('https');
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

const imageByteCache = new Map();
const IMAGE_CACHE_TTL_MS = 60 * 60 * 1000;
const API_PUBLIC_BASE_URL =
  process.env.API_PUBLIC_BASE_URL || 'https://api.indraprasthaneetacademy.com/api';

router.use((_req, res, next) => {
  // Small private cache window improves app responsiveness on back-navigation.
  res.setHeader('Cache-Control', 'private, max-age=20, stale-while-revalidate=40');
  next();
});

function buildContentImageUrl(fileId, width = 1000) {
  if (!fileId) return '';
  const w = Math.min(Math.max(Number(width) || 1000, 200), 1600);
  return `${API_PUBLIC_BASE_URL}/content/images/${fileId}?w=${w}`;
}

async function loadContentScope(req) {
  if (req.contentScope) return req.contentScope;
  const result = await pool.query(
    `SELECT u.batch_id, b.class_label
     FROM users u
     LEFT JOIN batches b ON b.id = u.batch_id
     WHERE u.id = $1`,
    [req.user.id]
  );
  req.contentScope = {
    batchId: result.rows[0]?.batch_id ?? null,
    classLabel: (result.rows[0]?.class_label || '').toString().trim(),
  };
  return req.contentScope;
}

function fetchUrlBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error('Too many redirects'));
      return;
    }
    https
      .get(url, { headers: { 'User-Agent': 'Indraprastha-ImageProxy/1.0' } }, (response) => {
        if (
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          fetchUrlBuffer(response.headers.location, redirectCount + 1)
            .then(resolve)
            .catch(reject);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Image fetch failed (${response.statusCode})`));
          return;
        }
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          resolve({
            buffer: Buffer.concat(chunks),
            contentType: response.headers['content-type'] || 'image/jpeg',
          });
        });
      })
      .on('error', reject);
  });
}

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
    // Return downloadLink so the Flutter app can wrap it inside the
    // Google viewerng embedded viewer, which works reliably in Android
    // WebView. The old previewLink (/file/d/{id}/preview) is blocked
    // by X-Frame-Options on most Android WebView builds.
    material_drive_link:
      links.downloadLink || normalizeDriveLink(chapter.material_drive_link, 'download'),
  };
}

function mapExplanationImageEntry(img) {
  if (!img || typeof img !== 'object') return img;
  const fileId =
    img.image_drive_file_id || extractDriveFileId(img.image_drive_link || img.image_url);
  const links = buildDrivePublicLinks(fileId);
  const resolved =
    buildContentImageUrl(fileId, 1000) ||
    links.imageLink ||
    normalizeDriveLink(img.image_url || img.image_drive_link, 'image');
  return {
    ...img,
    image_drive_file_id: fileId || '',
    image_url: resolved,
    image_drive_link: resolved,
  };
}

function mapQuestionImageLink(question) {
  const fileId =
    question.question_image_drive_file_id || extractDriveFileId(question.question_image_link);
  const links = buildDrivePublicLinks(fileId);
  const expFileId =
    question.explanation_image_drive_file_id ||
    extractDriveFileId(question.explanation_image_link);
  const expLinks = buildDrivePublicLinks(expFileId);
  const explanationImagesList = question.explanation_images_list;
  const proxyImage =
    buildContentImageUrl(fileId, 1000) ||
    normalizeDriveLink(question.question_image_link, 'image');
  const proxyExplanation =
    buildContentImageUrl(expFileId, 1000) ||
    normalizeDriveLink(question.explanation_image_link, 'image');
  return {
    ...question,
    question_image_drive_file_id: fileId || '',
    question_image_link: proxyImage || links.imageLink || '',
    explanation_image_drive_file_id: expFileId || '',
    explanation_image_link: proxyExplanation || expLinks.imageLink || '',
    explanation_images_list: Array.isArray(explanationImagesList)
      ? explanationImagesList.map(mapExplanationImageEntry)
      : explanationImagesList,
  };
}

async function ensureChapterExtracted(chapter) {
  const noteSummary = (chapter.note_summary || '').toString().trim();
  const materialType = (chapter.material_type || '').toString().toLowerCase();
  const persistedFileId = chapter.material_drive_file_id || extractDriveFileId(chapter.material_drive_link);
  const fileId = persistedFileId || (await findRecentPdfInFolder(chapter.material_drive_folder_id));

  if (materialType !== 'pdf' || noteSummary.length > 0 || !fileId) {
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

router.get('/images/:fileId', userAuth, async (req, res) => {
  try {
    const fileId =
      extractDriveFileId(req.params.fileId) || String(req.params.fileId || '').trim();
    const width = Math.min(Math.max(parseInt(req.query.w, 10) || 900, 200), 1600);
    if (!fileId) {
      return res.status(400).json({ error: 'Invalid image id' });
    }

    const cacheKey = `${fileId}:${width}`;
    const cached = imageByteCache.get(cacheKey);
    if (cached && Date.now() - cached.at < IMAGE_CACHE_TTL_MS) {
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Cache-Control', 'private, max-age=86400, stale-while-revalidate=604800');
      return res.send(cached.buffer);
    }

    const thumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
    let payload = null;
    try {
      payload = await fetchUrlBuffer(thumbUrl);
    } catch (_) {
      const buffer = await downloadDriveFileBuffer(fileId);
      if (!buffer.length) {
        return res.status(404).json({ error: 'Image not found' });
      }
      payload = { buffer, contentType: 'image/jpeg' };
    }

    imageByteCache.set(cacheKey, {
      buffer: payload.buffer,
      contentType: payload.contentType,
      at: Date.now(),
    });
    res.setHeader('Content-Type', payload.contentType);
    res.setHeader('Cache-Control', 'private, max-age=86400, stale-while-revalidate=604800');
    return res.send(payload.buffer);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Image proxy failed' });
  }
});

router.get('/filters', userAuth, async (req, res) => {
  const scope = await loadContentScope(req);
  const [subjects, topics, categories] = await Promise.all([
    pool.query(
      `SELECT DISTINCT subject AS value FROM (
         SELECT subject FROM books WHERE subject <> ''
         UNION SELECT subject FROM practice_sets WHERE subject <> ''
         UNION SELECT subject FROM tests WHERE subject <> ''
       ) s ORDER BY value ASC`
    ),
    pool.query(
      `SELECT DISTINCT topic AS value FROM (
         SELECT topic FROM books WHERE topic <> ''
         UNION SELECT topic FROM practice_sets WHERE topic <> ''
         UNION SELECT topic FROM tests WHERE topic <> ''
       ) t ORDER BY value ASC`
    ),
    pool.query(
      `SELECT DISTINCT category AS value FROM tests
       WHERE category <> ''
       ORDER BY value ASC`
    ),
  ]);

  return res.json({
    success: true,
    batchId: scope.batchId,
    classLabel: scope.classLabel,
    subjects: subjects.rows.map((r) => r.value).filter(Boolean),
    topics: topics.rows.map((r) => r.value).filter(Boolean),
    testCategories: categories.rows.map((r) => r.value).filter(Boolean),
  });
});

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
     WHERE ($1 = '' OR bk.subject = $1)
       AND ($2 = '' OR bk.topic = $2)
     ORDER BY id DESC`,
    [subject, topic]
  );
  res.json({ success: true, books: books.rows });
});

router.get('/books/:bookId/chapters', userAuth, async (req, res) => {
  const chapters = await pool.query(
    `SELECT ch.id, ch.title, ch.overview, ch.note_summary, ch.highlight, ch.material_type, ch.material_drive_link, ch.material_drive_file_id, ch.material_drive_folder_id,
        (SELECT COUNT(*)::int FROM pyqs p WHERE p.chapter_id = ch.id) AS linked_pyq_count
     FROM book_chapters ch
     WHERE ch.book_id = $1
     ORDER BY ch.id ASC`,
    [req.params.bookId]
  );
  if (chapters.rows.length > 0) {
    return res.json({
      success: true,
      chapters: chapters.rows.map(mapChapterLinks),
    });
  }

  // Backward-compatible fallback:
  // if an old book exists without chapters, create one default chapter from book topic/title.
  const bookResult = await pool.query(
    `SELECT id, title, topic
     FROM books
     WHERE id = $1
     LIMIT 1`,
    [req.params.bookId]
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
     WHERE ch.id = $1
     LIMIT 1`,
    [req.params.chapterId]
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
     WHERE p.chapter_id = $1
     ORDER BY p.id ASC`,
    [req.params.chapterId]
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
     WHERE (ps.source_type IS NULL OR ps.source_type = 'topic_mcq')
       AND ($1 = '' OR ps.subject = $1)
       AND ($2 = '' OR ps.topic = $2)
     ORDER BY id DESC`,
    [subject, topic]
  );
  res.json({ success: true, practiceSets: result.rows });
});

router.get('/practice-sets/:setId/questions', userAuth, async (req, res) => {
  const setMeta = await pool.query(
    `SELECT ps.id, ps.title, ps.topic, ps.subject, ps.difficulty, ps.estimated_minutes
     FROM practice_sets ps
     WHERE ps.id = $1
     LIMIT 1`,
    [req.params.setId]
  );
  if (setMeta.rows.length === 0) {
    return res.status(404).json({ error: 'Practice set not found' });
  }
  const questions = await pool.query(
    `SELECT pq.id, pq.question, pq.option_a, pq.option_b, pq.option_c, pq.option_d, pq.correct_option, pq.explanation,
        pq.question_image_link, pq.question_image_drive_file_id, pq.question_image_drive_folder_id,
        pq.explanation_image_link, pq.explanation_image_drive_file_id, pq.explanation_image_drive_folder_id,
        (
          SELECT json_agg(
            json_build_object(
              'id', ei.id,
              'image_url', ei.image_url,
              'image_drive_file_id', ei.image_drive_file_id,
              'image_drive_link', ei.image_drive_link,
              'caption', ei.caption,
              'order_index', ei.order_index
            ) ORDER BY ei.order_index
          )
          FROM explanation_images ei
          WHERE ei.practice_question_id = pq.id
        ) as explanation_images_list
     FROM practice_questions pq
     WHERE pq.practice_set_id = $1
     ORDER BY pq.id ASC`,
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
  const category = req.query.category?.toString() || '';
  const result = await pool.query(
    `SELECT t.id, t.title, t.category, t.subject, t.topic, t.class_label, t.duration_minutes, t.marks, t.question_count, t.syllabus_coverage, t.schedule_label,
        (ta.id IS NOT NULL) AS is_completed,
        ta.score AS last_score
     FROM tests t
     LEFT JOIN LATERAL (
       SELECT id, score
       FROM test_attempts
       WHERE user_id = $3 AND test_id = t.id
       ORDER BY attempted_at DESC
       LIMIT 1
     ) ta ON true
     WHERE ($1 = '' OR t.subject = $1)
       AND ($2 = '' OR t.topic = $2)
       AND ($4 = '' OR LOWER(t.category) LIKE '%' || LOWER($4) || '%')
     ORDER BY id DESC`,
    [subject, topic, req.user.id, category]
  );
  res.json({ success: true, tests: result.rows });
});

router.get('/tests/:testId/questions', userAuth, async (req, res) => {
  const testMeta = await pool.query(
    `SELECT t.id, t.title, t.subject, t.topic, t.duration_minutes, t.marks, t.question_count
     FROM tests t
     WHERE t.id = $1
     LIMIT 1`,
    [req.params.testId]
  );
  if (testMeta.rows.length === 0) {
    return res.status(404).json({ error: 'Test not found' });
  }
  const questions = await pool.query(
    `SELECT tq.id, tq.subject, tq.question, tq.option_a, tq.option_b, tq.option_c, tq.option_d,
        tq.correct_option, tq.explanation,
        tq.question_image_link, tq.question_image_drive_file_id, tq.question_image_drive_folder_id,
        tq.explanation_image_link, tq.explanation_image_drive_file_id, tq.explanation_image_drive_folder_id,
        (
          SELECT json_agg(
            json_build_object(
              'id', ei.id,
              'image_url', ei.image_url,
              'image_drive_file_id', ei.image_drive_file_id,
              'image_drive_link', ei.image_drive_link,
              'caption', ei.caption,
              'order_index', ei.order_index
            ) ORDER BY ei.order_index
          )
          FROM explanation_images ei
          WHERE ei.test_question_id = tq.id
        ) as explanation_images_list
     FROM test_questions tq
     WHERE tq.test_id = $1
     ORDER BY tq.id ASC`,
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
     WHERE ($1 = '' OR v.subject = $1)
       AND ($2 = '' OR v.topic = $2)
     ORDER BY id DESC`,
    [subject, topic]
  );
  res.json({ success: true, videos: result.rows });
});

router.get('/mcqs', userAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, subject, topic, question,
              option_a, option_b, option_c, option_d, correct_option,
              explanation, question_image_link, question_image_drive_file_id,
              created_at, is_active
       FROM daily_mcqs
       WHERE is_active = TRUE
       ORDER BY created_at DESC
       LIMIT 100`
    );
    res.json({ success: true, mcqs: result.rows.map(mapQuestionImageLink) });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Failed to fetch MCQs' });
  }
});

router.get('/packages', userAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT id, name, price_label, validity, highlight, features_json, is_active, amount_inr
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
    const testExists = await pool.query(
      `SELECT id, title, subject, topic
       FROM tests
       WHERE id = $1
       LIMIT 1`,
      [testId]
    );
    if (testExists.rows.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
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

    // Fetch test questions with explanation images
    const questionsWithExplanations = await pool.query(
      `SELECT
        tq.id,
        tq.question,
        tq.option_a,
        tq.option_b,
        tq.option_c,
        tq.option_d,
        tq.correct_option,
        tq.explanation,
        tq.explanation_image_link,
        tq.explanation_image_drive_file_id,
        tq.explanation_image_drive_folder_id,
        (
          SELECT json_agg(
            json_build_object(
              'id', ei.id,
              'image_url', ei.image_url,
              'image_drive_file_id', ei.image_drive_file_id,
              'image_drive_link', ei.image_drive_link,
              'caption', ei.caption,
              'order_index', ei.order_index
            ) ORDER BY ei.order_index
          )
          FROM explanation_images ei
          WHERE ei.test_question_id = tq.id
        ) as explanation_images_list
       FROM test_questions tq
       WHERE tq.test_id = $1
       ORDER BY tq.id ASC`,
      [testId]
    );

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
      questionsWithExplanations: questionsWithExplanations.rows.map(mapQuestionImageLink),
      aiAnalytics: {
        test_id: testId,
        user_id: req.user.id,
        score: score,
        accuracy: accuracy,
        subject: testMeta.subject,
        topic: testMeta.topic,
        insights: insightsRows,
        message: 'AI analytics calculated. Review insights above.'
      }
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

// ── FCM token registration ────────────────────────────────────────────────────

router.post('/fcm-token', userAuth, async (req, res) => {
  const { token } = req.body;
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return res.status(400).json({ error: 'token is required' });
  }
  try {
    await pool.query(
      `INSERT INTO fcm_tokens (user_id, token, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (token) DO UPDATE
         SET user_id = EXCLUDED.user_id,
             updated_at = CURRENT_TIMESTAMP`,
      [req.user.id, token.trim()]
    );
    return res.json({ success: true });
  } catch (e) {
    console.error('[FCM] token register error:', e.message);
    return res.status(500).json({ error: 'Failed to register token' });
  }
});

module.exports = router;