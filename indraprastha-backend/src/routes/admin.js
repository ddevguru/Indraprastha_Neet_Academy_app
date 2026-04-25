const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcryptjs');

const { pool } = require('../db');
const { uploadBufferToDrive } = require('../services/drive');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Admin auth required' });
  }

  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin role required' });
    }
    req.admin = payload;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid admin token' });
  }
}

function hierarchyFromBody(body = {}) {
  return {
    batchId: body.batchId,
    classLabel: body.classLabel || null,
    subject: body.subject || '',
    topic: body.topic || '',
  };
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const result = await pool.query(
    'SELECT * FROM admin_users WHERE username = $1 LIMIT 1',
    [username]
  );
  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const admin = result.rows[0];
  const passwordOk = await bcrypt.compare(password, admin.password_hash);
  if (!passwordOk) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin', username: admin.username, adminId: admin.id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  return res.json({ success: true, token });
});

router.get('/dashboard', adminAuth, async (_req, res) => {
  const [bookCount, practiceCount, testCount, videoCount, userCount] =
    await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM books'),
      pool.query('SELECT COUNT(*)::int AS count FROM practice_sets'),
      pool.query('SELECT COUNT(*)::int AS count FROM tests'),
      pool.query('SELECT COUNT(*)::int AS count FROM videos'),
      pool.query('SELECT COUNT(*)::int AS count FROM users'),
    ]);

  return res.json({
    success: true,
    stats: {
      books: bookCount.rows[0].count,
      practiceSets: practiceCount.rows[0].count,
      tests: testCount.rows[0].count,
      videos: videoCount.rows[0].count,
      users: userCount.rows[0].count,
    },
  });
});

router.get('/batches', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT b.id, b.name, b.target_year, b.class_label, c.name AS course_name
     FROM batches b
     JOIN courses c ON c.id = b.course_id
     ORDER BY b.id ASC`
  );
  res.json({ success: true, batches: result.rows });
});

router.get('/filters', adminAuth, async (_req, res) => {
  const [batches, subjects, topics] = await Promise.all([
    pool.query(
      `SELECT b.id, b.name, b.class_label, c.name AS course_name
       FROM batches b
       JOIN courses c ON c.id = b.course_id
       ORDER BY b.id ASC`
    ),
    pool.query(
      `SELECT DISTINCT subject
       FROM books
       WHERE subject IS NOT NULL AND subject <> ''
       ORDER BY subject ASC`
    ),
    pool.query(
      `SELECT DISTINCT topic
       FROM (
         SELECT topic FROM books
         UNION ALL
         SELECT topic FROM practice_sets
         UNION ALL
         SELECT topic FROM tests
         UNION ALL
         SELECT topic FROM videos
       ) t
       WHERE topic IS NOT NULL AND topic <> ''
       ORDER BY topic ASC`
    ),
  ]);
  return res.json({
    success: true,
    filters: {
      batches: batches.rows,
      subjects: subjects.rows.map((r) => r.subject),
      topics: topics.rows.map((r) => r.topic),
    },
  });
});

router.post('/books', adminAuth, async (req, res) => {
  const { title, level, category } = req.body;
  const { batchId, classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `INSERT INTO books (batch_id, class_label, title, subject, topic, level, category)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [batchId, classLabel, title, subject, topic, level || 'Core', category || 'NCERT books']
  );
  res.json({ success: true, book: result.rows[0] });
});

router.get('/books', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT bk.*, b.name AS batch_name
     FROM books bk
     JOIN batches b ON b.id = bk.batch_id
     ORDER BY bk.id DESC`
  );
  return res.json({ success: true, books: result.rows });
});

router.put('/books/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { title, level, category } = req.body;
  const { classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `UPDATE books
     SET title = COALESCE($2, title),
         class_label = COALESCE($3, class_label),
         subject = COALESCE($4, subject),
         topic = COALESCE($5, topic),
         level = COALESCE($6, level),
         category = COALESCE($7, category)
     WHERE id = $1
     RETURNING *`,
    [id, title, classLabel, subject, topic, level, category]
  );
  res.json({ success: true, book: result.rows[0] });
});

router.delete('/books/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM books WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

router.post('/books/:bookId/chapters', adminAuth, async (req, res) => {
  const { bookId } = req.params;
  const { title, overview, noteSummary, highlight } = req.body;
  const result = await pool.query(
    `INSERT INTO book_chapters (book_id, title, overview, note_summary, highlight, material_type)
     VALUES ($1, $2, $3, $4, $5, 'text')
     RETURNING *`,
    [bookId, title, overview || '', noteSummary || '', highlight || '']
  );
  res.json({ success: true, chapter: result.rows[0] });
});

router.post(
  '/books/:bookId/chapters/upload-pdf',
  adminAuth,
  upload.single('pdf'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'PDF file is required' });
      }

      const uploaded = await uploadBufferToDrive({
        fileBuffer: req.file.buffer,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        folderId: process.env.GDRIVE_FOLDER_ID,
      });

      const chapterTitle = req.body.title || req.file.originalname;
      const chapter = await pool.query(
        `INSERT INTO book_chapters (
          book_id, title, overview, note_summary, highlight, material_type, material_drive_link
         ) VALUES ($1,$2,$3,$4,$5,'pdf',$6)
         RETURNING *`,
        [
          req.params.bookId,
          chapterTitle,
          req.body.overview || '',
          '',
          '',
          uploaded.webViewLink || uploaded.webContentLink,
        ]
      );

      return res.json({ success: true, chapter: chapter.rows[0], drive: uploaded });
    } catch (error) {
      return res.status(500).json({ error: error.message || 'PDF upload failed' });
    }
  }
);

router.post('/chapters/:chapterId/pyqs', adminAuth, async (req, res) => {
  const { chapterId } = req.params;
  const { question, optionA, optionB, optionC, optionD, correctOption, explanation, yearLabel } =
    req.body;
  const result = await pool.query(
    `INSERT INTO pyqs (
      chapter_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, year_label
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      chapterId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation || '',
      yearLabel || 'NEET',
    ]
  );
  res.json({ success: true, pyq: result.rows[0] });
});

router.post('/practice-sets', adminAuth, async (req, res) => {
  const { title, difficulty, estimatedMinutes } = req.body;
  const { batchId, classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `INSERT INTO practice_sets (batch_id, class_label, subject, title, topic, difficulty, estimated_minutes)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [batchId, classLabel, subject, title, topic, difficulty || 'Moderate', estimatedMinutes || 20]
  );
  res.json({ success: true, practiceSet: result.rows[0] });
});

router.get('/practice-sets', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT ps.*, b.name AS batch_name
     FROM practice_sets ps
     JOIN batches b ON b.id = ps.batch_id
     ORDER BY ps.id DESC`
  );
  res.json({ success: true, practiceSets: result.rows });
});

router.put('/practice-sets/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { title, difficulty, estimatedMinutes } = req.body;
  const { classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `UPDATE practice_sets
     SET title = COALESCE($2, title),
         class_label = COALESCE($3, class_label),
         subject = COALESCE($4, subject),
         topic = COALESCE($5, topic),
         difficulty = COALESCE($6, difficulty),
         estimated_minutes = COALESCE($7, estimated_minutes)
     WHERE id = $1
     RETURNING *`,
    [id, title, classLabel, subject, topic, difficulty, estimatedMinutes]
  );
  res.json({ success: true, practiceSet: result.rows[0] });
});

router.delete('/practice-sets/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM practice_sets WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

router.post('/tests', adminAuth, async (req, res) => {
  const {
    title,
    category,
    durationMinutes,
    marks,
    questionCount,
    syllabusCoverage,
    scheduleLabel,
  } = req.body;
  const { batchId, classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `INSERT INTO tests (
      batch_id, class_label, subject, topic, title, category, duration_minutes, marks, question_count, syllabus_coverage, schedule_label
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [
      batchId,
      classLabel,
      subject,
      topic,
      title,
      category || 'Grand test',
      durationMinutes || 180,
      marks || 720,
      questionCount || 180,
      syllabusCoverage || '',
      scheduleLabel || '',
    ]
  );
  res.json({ success: true, test: result.rows[0] });
});

router.get('/tests', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT t.*, b.name AS batch_name
     FROM tests t
     JOIN batches b ON b.id = t.batch_id
     ORDER BY t.id DESC`
  );
  res.json({ success: true, tests: result.rows });
});

router.put('/tests/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { title, category, durationMinutes, marks, questionCount, syllabusCoverage, scheduleLabel } =
    req.body;
  const { classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `UPDATE tests
     SET title = COALESCE($2, title),
         class_label = COALESCE($3, class_label),
         subject = COALESCE($4, subject),
         topic = COALESCE($5, topic),
         category = COALESCE($6, category),
         duration_minutes = COALESCE($7, duration_minutes),
         marks = COALESCE($8, marks),
         question_count = COALESCE($9, question_count),
         syllabus_coverage = COALESCE($10, syllabus_coverage),
         schedule_label = COALESCE($11, schedule_label)
     WHERE id = $1
     RETURNING *`,
    [id, title, classLabel, subject, topic, category, durationMinutes, marks, questionCount, syllabusCoverage, scheduleLabel]
  );
  res.json({ success: true, test: result.rows[0] });
});

router.delete('/tests/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM tests WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

router.get('/tests/:testId/questions', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT *
     FROM test_questions
     WHERE test_id = $1
     ORDER BY id ASC`,
    [req.params.testId]
  );
  res.json({ success: true, questions: result.rows });
});

router.post('/tests/:testId/questions', adminAuth, async (req, res) => {
  const { subject, question, optionA, optionB, optionC, optionD, correctOption, explanation } =
    req.body;
  const result = await pool.query(
    `INSERT INTO test_questions (
      test_id, subject, question, option_a, option_b, option_c, option_d, correct_option, explanation
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      req.params.testId,
      subject || 'Biology',
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation || '',
    ]
  );
  res.json({ success: true, question: result.rows[0] });
});

router.put('/test-questions/:id', adminAuth, async (req, res) => {
  const { subject, question, optionA, optionB, optionC, optionD, correctOption, explanation } =
    req.body;
  const result = await pool.query(
    `UPDATE test_questions
     SET subject = COALESCE($2, subject),
         question = COALESCE($3, question),
         option_a = COALESCE($4, option_a),
         option_b = COALESCE($5, option_b),
         option_c = COALESCE($6, option_c),
         option_d = COALESCE($7, option_d),
         correct_option = COALESCE($8, correct_option),
         explanation = COALESCE($9, explanation)
     WHERE id = $1
     RETURNING *`,
    [req.params.id, subject, question, optionA, optionB, optionC, optionD, correctOption, explanation]
  );
  res.json({ success: true, question: result.rows[0] });
});

router.delete('/test-questions/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM test_questions WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

router.post('/videos/upload', adminAuth, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Video file is required' });
    }

    const uploaded = await uploadBufferToDrive({
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      folderId: process.env.GDRIVE_FOLDER_ID,
    });

    const {
      title,
      subject,
      topic,
      classLabel,
      chapterHint,
      sectionLabel,
      durationLabel,
    } = req.body;
    const { batchId } = hierarchyFromBody(req.body);
    const dbResult = await pool.query(
      `INSERT INTO videos (
        batch_id, class_label, title, subject, topic, chapter_hint, section_label, duration_label, drive_link
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        batchId,
        classLabel || null,
        title,
        subject,
        topic || '',
        chapterHint || '',
        sectionLabel || 'Concept explainers',
        durationLabel || '15 min',
        uploaded.webViewLink || uploaded.webContentLink,
      ]
    );

    return res.json({
      success: true,
      video: dbResult.rows[0],
      drive: uploaded,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Upload failed',
    });
  }
});

router.get('/videos', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT v.*, b.name AS batch_name
     FROM videos v
     JOIN batches b ON b.id = v.batch_id
     ORDER BY v.id DESC`
  );
  res.json({ success: true, videos: result.rows });
});

router.put('/videos/:id', adminAuth, async (req, res) => {
  const { title, chapterHint, sectionLabel, durationLabel } = req.body;
  const { classLabel, subject, topic } = hierarchyFromBody(req.body);
  const result = await pool.query(
    `UPDATE videos
     SET title = COALESCE($2, title),
         class_label = COALESCE($3, class_label),
         subject = COALESCE($4, subject),
         topic = COALESCE($5, topic),
         chapter_hint = COALESCE($6, chapter_hint),
         section_label = COALESCE($7, section_label),
         duration_label = COALESCE($8, duration_label)
     WHERE id = $1
     RETURNING *`,
    [req.params.id, title, classLabel, subject, topic, chapterHint, sectionLabel, durationLabel]
  );
  res.json({ success: true, video: result.rows[0] });
});

router.delete('/videos/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM videos WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
