const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const { pool } = require('../db');
const {
  uploadBufferToDrive,
  uploadFilePathToDrive,
  extractPdfTextWithDriveOcr,
  normalizeDriveLink,
  extractDriveFileId,
  buildDrivePublicLinks,
  ensureDriveFolderPath,
  getDriveOAuthConsentUrl,
  exchangeDriveOAuthCode,
} = require('../services/drive');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const UPLOAD_ROOT = path.join(os.tmpdir(), 'indra_uploads');
function ensureUploadRoot() {
  try {
    fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
  } catch (_) {}
}
ensureUploadRoot();

function logAdminRouteError(route, error, extra = {}) {
  console.error('[ADMIN_ROUTE_ERROR]', {
    route,
    message: error?.message || 'Unknown error',
    stack: error?.stack,
    ...extra,
  });
}

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

async function extractPdfBasics(fileBuffer, fileName = 'document.pdf') {
  try {
    const parsed = await pdfParse(Buffer.from(fileBuffer));
    let rawText = (parsed.text || '')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\u0000/g, '');

    // For scanned/image PDFs, pdf-parse often returns little/no text.
    // Fallback to Drive OCR extraction.
    if (!rawText || rawText.trim().length < 200) {
      const ocrText = await extractPdfTextWithDriveOcr({
        fileBuffer,
        fileName,
      });
      if ((ocrText || '').trim().length > (rawText || '').trim().length) {
        rawText = ocrText;
      }
    }

    if (!rawText || rawText.trim().length === 0) {
      return {
        noteSummary: '',
        highlight: '',
      };
    }
    // Keep extraction as-is so student app can render original PDF text flow.
    const noteSummary = rawText.slice(0, 120000).trim();
    const firstSentence = rawText
      .replace(/\n+/g, ' ')
      .split(/[.?!]/)
      .find((s) => s.trim().length > 20) || rawText;
    const highlight = firstSentence.trim().slice(0, 220);
    return {
      noteSummary,
      highlight,
    };
  } catch (_) {
    return {
      noteSummary: '',
      highlight: '',
    };
  }
}

function sanitizeForPostgresText(value) {
  if (value == null) return '';
  const s = String(value);
  // Postgres TEXT cannot contain NUL (0x00)
  return s.replace(/\u0000/g, '');
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

async function uploadQuestionImageByHierarchy({
  file,
  batchId,
  classLabel,
  subject,
  topic,
  contentType,
  contentId,
}) {
  const batchRes = await pool.query('SELECT name FROM batches WHERE id = $1', [batchId]);
  const batchName = batchRes.rows[0]?.name || `Batch-${batchId}`;
  const idSegment =
    contentType && contentId ? `${String(contentType).toUpperCase()}-${contentId}` : '';
  const resolvedFolderId = await ensureDriveFolderPath({
    rootFolderId: process.env.GDRIVE_FOLDER_ID,
    segments: [
      batchName,
      classLabel || 'General',
      subject || 'General',
      topic || 'Questions',
      idSegment || 'General',
    ],
  });
  const uploaded = await uploadBufferToDrive({
    fileBuffer: file.buffer,
    fileName: file.originalname,
    mimeType: file.mimetype,
    folderId: resolvedFolderId,
  });
  return {
    driveLink: uploaded.imageLink || normalizeDriveLink(uploaded.webViewLink, 'image') || '',
    driveFileId: uploaded.fileId || '',
    drive: uploaded,
    driveFolderId: resolvedFolderId,
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

router.get('/drive/oauth/start', adminAuth, async (_req, res) => {
  try {
    const authUrl = getDriveOAuthConsentUrl();
    return res.json({
      success: true,
      authUrl,
      message:
        'Open this URL, approve access, then use /admin/drive/oauth/exchange with returned code.',
    });
  } catch (e) {
    logAdminRouteError('/drive/oauth/start', e);
    return res.status(500).json({ error: e.message || 'OAuth init failed' });
  }
});

router.get('/drive/oauth/status', adminAuth, async (_req, res) => {
  const dbToken = await pool.query(
    `SELECT value FROM app_config WHERE key = 'GDRIVE_OAUTH_REFRESH_TOKEN' LIMIT 1`
  );
  const hasDbToken = dbToken.rows.length > 0 && !!dbToken.rows[0].value;
  const hasEnvToken = !!process.env.GDRIVE_OAUTH_REFRESH_TOKEN;
  return res.json({
    success: true,
    hasRefreshToken: hasDbToken || hasEnvToken,
    source: hasDbToken ? 'db' : hasEnvToken ? 'env' : 'none',
  });
});

router.post('/drive/oauth/exchange', adminAuth, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'code is required' });
    }
    const tokens = await exchangeDriveOAuthCode({ code });
    if (tokens.refreshToken) {
      await pool.query(
        `INSERT INTO app_config (key, value, updated_at)
         VALUES ('GDRIVE_OAUTH_REFRESH_TOKEN', $1, CURRENT_TIMESTAMP)
         ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
        [tokens.refreshToken]
      );
      process.env.GDRIVE_OAUTH_REFRESH_TOKEN = tokens.refreshToken;
    }
    return res.json({
      success: true,
      tokens,
      message: tokens.refreshToken
        ? 'Refresh token saved to database and activated.'
        : 'No new refresh token returned. Existing token remains unchanged.',
    });
  } catch (e) {
    logAdminRouteError('/drive/oauth/exchange', e);
    return res.status(500).json({ error: e.message || 'OAuth exchange failed' });
  }
});

router.post('/question-images/upload', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'image file is required' });
    const { batchId, classLabel, subject, topic, contentType, contentId } = req.body;
    if (!batchId) return res.status(400).json({ error: 'batchId is required' });
    const uploaded = await uploadQuestionImageByHierarchy({
      file: req.file,
      batchId,
      classLabel: classLabel || '',
      subject: subject || '',
      topic: topic || 'Questions',
      contentType: contentType || '',
      contentId: contentId || '',
    });
    return res.json({
      success: true,
      driveLink: uploaded.driveLink,
      imageLink: uploaded.driveLink,
      driveFileId: uploaded.driveFileId,
      drive: uploaded.drive,
      driveFolderId: uploaded.driveFolderId,
    });
  } catch (e) {
    logAdminRouteError('/question-images/upload', e);
    return res.status(500).json({ error: e.message || 'Image upload failed' });
  }
});

router.get('/dashboard', adminAuth, async (_req, res) => {
  const [bookCount, practiceCount, testCount, videoCount, userCount, packageCount] =
    await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM books'),
      pool.query('SELECT COUNT(*)::int AS count FROM practice_sets'),
      pool.query('SELECT COUNT(*)::int AS count FROM tests'),
      pool.query('SELECT COUNT(*)::int AS count FROM videos'),
      pool.query('SELECT COUNT(*)::int AS count FROM users'),
      pool.query('SELECT COUNT(*)::int AS count FROM packages'),
    ]);

  return res.json({
    success: true,
    stats: {
      books: bookCount.rows[0].count,
      practiceSets: practiceCount.rows[0].count,
      tests: testCount.rows[0].count,
      videos: videoCount.rows[0].count,
      users: userCount.rows[0].count,
      packages: packageCount.rows[0].count,
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

router.post('/batches', adminAuth, async (req, res) => {
  const { name, targetYear, classLabel } = req.body;
  if (!name || !classLabel) {
    return res.status(400).json({ error: 'name and classLabel are required' });
  }
  const course = await pool.query(
    `INSERT INTO courses (name)
     VALUES ('Neet Dropper Batch')
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`
  );
  const result = await pool.query(
    `INSERT INTO batches (course_id, name, target_year, class_label)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [course.rows[0].id, name, targetYear || '', classLabel]
  );
  return res.json({ success: true, batch: result.rows[0] });
});

router.get('/classes', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT id, name
     FROM classes
     ORDER BY name ASC`
  );
  return res.json({ success: true, classes: result.rows });
});

router.post('/classes', adminAuth, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const result = await pool.query(
    `INSERT INTO classes (name)
     VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING *`,
    [name]
  );
  return res.json({ success: true, classItem: result.rows[0] });
});

router.get('/subjects', adminAuth, async (req, res) => {
  const classId = Number(req.query.classId || 0);
  const result = await pool.query(
    `SELECT s.id, s.name, s.class_id, c.name AS class_name
     FROM subjects s
     LEFT JOIN classes c ON c.id = s.class_id
     WHERE ($1 = 0 OR s.class_id = $1)
     ORDER BY s.name ASC`,
    [classId]
  );
  return res.json({ success: true, subjects: result.rows });
});

router.post('/subjects', adminAuth, async (req, res) => {
  const { classId, name } = req.body;
  if (!classId || !name) {
    return res.status(400).json({ error: 'classId and name are required' });
  }
  const result = await pool.query(
    `INSERT INTO subjects (class_id, name)
     VALUES ($1,$2)
     ON CONFLICT (class_id, name) DO UPDATE SET name = EXCLUDED.name
     RETURNING *`,
    [classId, name]
  );
  return res.json({ success: true, subject: result.rows[0] });
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
      classes: [...new Set(batches.rows.map((r) => r.class_label).filter(Boolean))],
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

router.get('/books/:bookId/chapters', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT id, book_id, title, overview, note_summary, highlight, material_type, material_drive_link, material_drive_file_id, material_drive_folder_id
     FROM book_chapters
     WHERE book_id = $1
     ORDER BY id ASC`,
    [req.params.bookId]
  );
  return res.json({ success: true, chapters: result.rows.map(mapChapterLinks) });
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
  const bookCheck = await pool.query(
    `SELECT id
     FROM books
     WHERE id = $1
     LIMIT 1`,
    [bookId]
  );
  if (bookCheck.rows.length === 0) {
    return res.status(404).json({ error: 'Book not found. Refresh list and try again.' });
  }
  const result = await pool.query(
    `INSERT INTO book_chapters (book_id, title, overview, note_summary, highlight, material_type)
     VALUES ($1, $2, $3, $4, $5, 'text')
     RETURNING *`,
    [
      bookId,
      title,
      overview || '',
      sanitizeForPostgresText(noteSummary || ''),
      sanitizeForPostgresText(highlight || ''),
    ]
  );
  res.json({ success: true, chapter: result.rows[0] });
});

router.post(
  '/books/upload-by-hierarchy',
  adminAuth,
  upload.single('pdf'),
  async (req, res) => {
    try {
      const { batchId, classLabel, subject, chapterTitle } = req.body;
      if (!batchId || !classLabel || !subject || !chapterTitle || !req.file) {
        return res.status(400).json({
          error: 'batchId, classLabel, subject, chapterTitle and pdf file are required',
        });
      }

      const existingBook = await pool.query(
        `SELECT id
         FROM books
         WHERE batch_id = $1 AND class_label = $2 AND subject = $3
         LIMIT 1`,
        [batchId, classLabel, subject]
      );

      let bookId = existingBook.rows[0]?.id;
      const batchRes = await pool.query('SELECT name FROM batches WHERE id = $1', [batchId]);
      const batchName = batchRes.rows[0]?.name || `Batch-${batchId}`;
      if (!bookId) {
        const createdBook = await pool.query(
          `INSERT INTO books (batch_id, class_label, title, subject, topic, level, category)
           VALUES ($1,$2,$3,$4,$5,'Core','NCERT books')
           RETURNING id`,
          [batchId, classLabel, `${subject} Master Book`, subject, chapterTitle]
        );
        bookId = createdBook.rows[0].id;
      }

      const resolvedFolderId = await ensureDriveFolderPath({
        rootFolderId: process.env.GDRIVE_FOLDER_ID,
        segments: [batchName, classLabel, subject, chapterTitle],
      });
      const uploaded = await uploadBufferToDrive({
        fileBuffer: req.file.buffer,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        folderId: resolvedFolderId,
      });
      const extracted = await extractPdfBasics(req.file.buffer, req.file.originalname);

      const chapter = await pool.query(
        `INSERT INTO book_chapters (
          book_id, title, overview, note_summary, highlight, material_type, material_drive_link, material_drive_file_id, material_drive_folder_id
         ) VALUES ($1,$2,$3,$4,$5,'pdf',$6,$7,$8)
         RETURNING *`,
        [
          bookId,
          chapterTitle,
          req.body.overview || 'Imported from PDF',
          extracted.noteSummary,
          extracted.highlight,
          uploaded.previewLink || normalizeDriveLink(uploaded.webViewLink, 'preview'),
          uploaded.fileId || '',
          resolvedFolderId,
        ]
      );

      return res.json({
        success: true,
        bookId,
        chapter: chapter.rows[0],
        drive: uploaded,
        driveFolder: {
          id: resolvedFolderId,
          path: [batchName, classLabel, subject, chapterTitle],
        },
        extracted,
      });
    } catch (error) {
      logAdminRouteError('/books/upload-by-hierarchy', error);
      return res.status(500).json({ error: error.message || 'Book upload failed' });
    }
  }
);

// Chunked PDF upload (Render-safe) -> Drive + extract + book_chapters insert
router.post('/books/pdf-upload-init', adminAuth, async (req, res) => {
  try {
    const { batchId, classLabel, subject, chapterTitle, fileName, mimeType } = req.body;
    if (!batchId || !classLabel || !subject || !chapterTitle || !fileName) {
      return res.status(400).json({
        error: 'batchId, classLabel, subject, chapterTitle, fileName are required',
      });
    }
    const uploadId = crypto.randomUUID();
    const dir = path.join(UPLOAD_ROOT, uploadId);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'meta.json'),
      JSON.stringify(
        {
          uploadId,
          kind: 'pdf',
          batchId,
          classLabel,
          subject,
          chapterTitle,
          fileName,
          mimeType: mimeType || 'application/pdf',
          createdAt: Date.now(),
        },
        null,
        2
      )
    );
    return res.json({ success: true, uploadId, chunkSize: 512 * 1024 });
  } catch (e) {
    logAdminRouteError('/books/pdf-upload-init', e);
    return res.status(500).json({ error: e.message || 'init failed' });
  }
});

router.post('/books/pdf-upload-chunk', adminAuth, upload.single('chunk'), async (req, res) => {
  try {
    const { uploadId, index, totalChunks } = req.body;
    if (!uploadId || index === undefined || !req.file) {
      return res.status(400).json({ error: 'uploadId, index, chunk are required' });
    }
    const dir = path.join(UPLOAD_ROOT, uploadId);
    if (!fs.existsSync(dir)) {
      return res.status(404).json({ error: 'upload session not found' });
    }
    const idx = Number(index);
    if (!Number.isFinite(idx) || idx < 0) {
      return res.status(400).json({ error: 'invalid index' });
    }
    fs.writeFileSync(path.join(dir, `chunk_${idx}.bin`), req.file.buffer);
    if (totalChunks !== undefined) {
      fs.writeFileSync(path.join(dir, 'total.txt'), String(totalChunks));
    }
    return res.json({ success: true });
  } catch (e) {
    logAdminRouteError('/books/pdf-upload-chunk', e, { uploadId: req.body?.uploadId });
    return res.status(500).json({ error: e.message || 'chunk failed' });
  }
});

router.post('/books/pdf-upload-complete', adminAuth, async (req, res) => {
  try {
    const { uploadId } = req.body;
    if (!uploadId) {
      return res.status(400).json({ error: 'uploadId is required' });
    }
    const dir = path.join(UPLOAD_ROOT, uploadId);
    const metaPath = path.join(dir, 'meta.json');
    if (!fs.existsSync(metaPath)) {
      return res.status(404).json({ error: 'upload session not found' });
    }
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const chunks = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('chunk_') && f.endsWith('.bin'))
      .sort((a, b) => {
        const ai = Number(a.replace('chunk_', '').replace('.bin', ''));
        const bi = Number(b.replace('chunk_', '').replace('.bin', ''));
        return ai - bi;
      });
    if (chunks.length === 0) {
      return res.status(400).json({ error: 'no chunks uploaded' });
    }
    const assembledPath = path.join(dir, meta.fileName);
    const out = fs.createWriteStream(assembledPath);
    for (const f of chunks) {
      out.write(fs.readFileSync(path.join(dir, f)));
    }
    await new Promise((resolve) => out.end(resolve));

    const existingBook = await pool.query(
      `SELECT id
       FROM books
       WHERE batch_id = $1 AND class_label = $2 AND subject = $3
       LIMIT 1`,
      [meta.batchId, meta.classLabel, meta.subject]
    );
    let bookId = existingBook.rows[0]?.id;
    if (!bookId) {
      const createdBook = await pool.query(
        `INSERT INTO books (batch_id, class_label, title, subject, topic, level, category)
         VALUES ($1,$2,$3,$4,$5,'Core','NCERT books')
         RETURNING id`,
        [meta.batchId, meta.classLabel, `${meta.subject} Master Book`, meta.subject, meta.chapterTitle]
      );
      bookId = createdBook.rows[0].id;
    }

    const batchRes = await pool.query('SELECT name FROM batches WHERE id = $1', [meta.batchId]);
    const batchName = batchRes.rows[0]?.name || `Batch-${meta.batchId}`;
    const resolvedFolderId = await ensureDriveFolderPath({
      rootFolderId: process.env.GDRIVE_FOLDER_ID,
      segments: [batchName, meta.classLabel, meta.subject, meta.chapterTitle],
    });

    const uploaded = await uploadFilePathToDrive({
      filePath: assembledPath,
      fileName: meta.fileName,
      mimeType: meta.mimeType || 'application/pdf',
      folderId: resolvedFolderId,
    });

    const pdfBuffer = fs.readFileSync(assembledPath);
    const extracted = await extractPdfBasics(pdfBuffer, meta.fileName);

    const safeNoteSummary = sanitizeForPostgresText(extracted.noteSummary);
    const safeHighlight = sanitizeForPostgresText(extracted.highlight);
    const chapter = await pool.query(
      `INSERT INTO book_chapters (
        book_id, title, overview, note_summary, highlight, material_type, material_drive_link, material_drive_file_id, material_drive_folder_id
       ) VALUES ($1,$2,$3,$4,$5,'pdf',$6,$7,$8)
       RETURNING *`,
      [
        bookId,
        meta.chapterTitle,
        'Imported from PDF',
        safeNoteSummary,
        safeHighlight,
        uploaded.previewLink || normalizeDriveLink(uploaded.webViewLink, 'preview'),
        uploaded.fileId || '',
        resolvedFolderId,
      ]
    );

    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (_) {}

    return res.json({
      success: true,
      bookId,
      chapter: chapter.rows[0],
      drive: uploaded,
      driveFolder: {
        id: resolvedFolderId,
        path: [batchName, meta.classLabel, meta.subject, meta.chapterTitle],
      },
      extracted,
    });
  } catch (e) {
    logAdminRouteError('/books/pdf-upload-complete', e, { uploadId: req.body?.uploadId });
    return res.status(500).json({ error: e.message || 'complete failed' });
  }
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

      const bookRes = await pool.query(
        `SELECT b.batch_id, b.class_label, b.subject, bt.name AS batch_name
         FROM books b
         JOIN batches bt ON bt.id = b.batch_id
         WHERE b.id = $1
         LIMIT 1`,
        [req.params.bookId]
      );
      if (bookRes.rows.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      const bookMeta = bookRes.rows[0];
      const chapterTitle = req.body.title || req.file.originalname;
      const resolvedFolderId = await ensureDriveFolderPath({
        rootFolderId: process.env.GDRIVE_FOLDER_ID,
        segments: [
          bookMeta.batch_name || `Batch-${bookMeta.batch_id}`,
          bookMeta.class_label || 'General',
          bookMeta.subject || 'General',
          chapterTitle,
        ],
      });

      const uploaded = await uploadBufferToDrive({
        fileBuffer: req.file.buffer,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        folderId: resolvedFolderId,
      });
      const extracted = await extractPdfBasics(req.file.buffer, req.file.originalname);

      const safeNoteSummary = sanitizeForPostgresText(extracted.noteSummary);
      const safeHighlight = sanitizeForPostgresText(extracted.highlight);
      const chapter = await pool.query(
        `INSERT INTO book_chapters (
          book_id, title, overview, note_summary, highlight, material_type, material_drive_link, material_drive_file_id, material_drive_folder_id
         ) VALUES ($1,$2,$3,$4,$5,'pdf',$6,$7,$8)
         RETURNING *`,
        [
          req.params.bookId,
          chapterTitle,
          req.body.overview || 'Imported from PDF',
          safeNoteSummary,
          safeHighlight,
          uploaded.previewLink || normalizeDriveLink(uploaded.webViewLink, 'preview'),
          uploaded.fileId || '',
          resolvedFolderId,
        ]
      );

      return res.json({
        success: true,
        chapter: chapter.rows[0],
        drive: uploaded,
        driveFolder: {
          id: resolvedFolderId,
          path: [
            bookMeta.batch_name || `Batch-${bookMeta.batch_id}`,
            bookMeta.class_label || 'General',
            bookMeta.subject || 'General',
            chapterTitle,
          ],
        },
        extracted,
      });
    } catch (error) {
      logAdminRouteError('/books/:bookId/pdf', error, { bookId: req.params?.bookId });
      return res.status(500).json({ error: error.message || 'PDF upload failed' });
    }
  }
);

router.post('/chapters/:chapterId/pyqs', adminAuth, async (req, res) => {
  const { chapterId } = req.params;
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    explanation,
    yearLabel,
    questionImageLink,
  } =
    req.body;
  const chapterCheck = await pool.query(
    `SELECT id
     FROM book_chapters
     WHERE id = $1
     LIMIT 1`,
    [chapterId]
  );
  if (chapterCheck.rows.length === 0) {
    return res.status(404).json({
      error: 'Selected chapter does not exist. Refresh chapters and select again.',
    });
  }
  const result = await pool.query(
    `INSERT INTO pyqs (
      chapter_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, year_label, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
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
      normalizeDriveLink(questionImageLink || '', 'image'),
      extractDriveFileId(questionImageLink || ''),
      '',
    ]
  );
  res.json({ success: true, pyq: mapQuestionImageLink(result.rows[0]) });
});

router.get('/chapters/:chapterId/pyqs', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT id, chapter_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, year_label, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
     FROM pyqs
     WHERE chapter_id = $1
     ORDER BY id DESC`,
    [req.params.chapterId]
  );
  res.json({ success: true, pyqs: result.rows.map(mapQuestionImageLink) });
});

router.put('/pyqs/:id', adminAuth, async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    explanation,
    yearLabel,
    questionImageLink,
  } = req.body;
  const result = await pool.query(
    `UPDATE pyqs
     SET question = COALESCE($2, question),
         option_a = COALESCE($3, option_a),
         option_b = COALESCE($4, option_b),
         option_c = COALESCE($5, option_c),
         option_d = COALESCE($6, option_d),
         correct_option = COALESCE($7, correct_option),
         explanation = COALESCE($8, explanation),
         year_label = COALESCE($9, year_label),
         question_image_link = COALESCE($10, question_image_link),
         question_image_drive_file_id = COALESCE($11, question_image_drive_file_id),
         question_image_drive_folder_id = COALESCE($12, question_image_drive_folder_id)
     WHERE id = $1
     RETURNING *`,
    [
      req.params.id,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation,
      yearLabel,
      questionImageLink == null ? null : normalizeDriveLink(questionImageLink, 'image'),
      questionImageLink == null ? null : extractDriveFileId(questionImageLink),
      null,
    ]
  );
  return res.json({
    success: true,
    pyq: result.rows[0] ? mapQuestionImageLink(result.rows[0]) : null,
  });
});

router.delete('/pyqs/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM pyqs WHERE id = $1', [req.params.id]);
  return res.json({ success: true });
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

router.get('/practice-sets/:setId/questions', adminAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT id, practice_set_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
     FROM practice_questions
     WHERE practice_set_id = $1
     ORDER BY id ASC`,
    [req.params.setId]
  );
  return res.json({ success: true, questions: result.rows.map(mapQuestionImageLink) });
});

router.post('/practice-sets/:setId/questions', adminAuth, async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctOption, explanation, questionImageLink } =
    req.body;
  const result = await pool.query(
    `INSERT INTO practice_questions (
      practice_set_id, question, option_a, option_b, option_c, option_d, correct_option, explanation, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [
      req.params.setId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation || '',
      normalizeDriveLink(questionImageLink || '', 'image'),
      extractDriveFileId(questionImageLink || ''),
      '',
    ]
  );
  return res.json({ success: true, question: mapQuestionImageLink(result.rows[0]) });
});

router.put('/practice-questions/:id', adminAuth, async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctOption, explanation, questionImageLink } =
    req.body;
  const result = await pool.query(
    `UPDATE practice_questions
     SET question = COALESCE($2, question),
         option_a = COALESCE($3, option_a),
         option_b = COALESCE($4, option_b),
         option_c = COALESCE($5, option_c),
         option_d = COALESCE($6, option_d),
         correct_option = COALESCE($7, correct_option),
         explanation = COALESCE($8, explanation),
         question_image_link = COALESCE($9, question_image_link),
         question_image_drive_file_id = COALESCE($10, question_image_drive_file_id),
         question_image_drive_folder_id = COALESCE($11, question_image_drive_folder_id)
     WHERE id = $1
     RETURNING *`,
    [
      req.params.id,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation,
      questionImageLink == null ? null : normalizeDriveLink(questionImageLink, 'image'),
      questionImageLink == null ? null : extractDriveFileId(questionImageLink),
      null,
    ]
  );
  return res.json({
    success: true,
    question: result.rows[0] ? mapQuestionImageLink(result.rows[0]) : null,
  });
});

router.delete('/practice-questions/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM practice_questions WHERE id = $1', [req.params.id]);
  return res.json({ success: true });
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
  res.json({ success: true, questions: result.rows.map(mapQuestionImageLink) });
});

router.post('/tests/:testId/questions', adminAuth, async (req, res) => {
  const {
    subject,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    explanation,
    questionImageLink,
  } =
    req.body;
  const result = await pool.query(
    `INSERT INTO test_questions (
      test_id, subject, question, option_a, option_b, option_c, option_d, correct_option, explanation, question_image_link, question_image_drive_file_id, question_image_drive_folder_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
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
      normalizeDriveLink(questionImageLink || '', 'image'),
      extractDriveFileId(questionImageLink || ''),
      '',
    ]
  );
  res.json({ success: true, question: mapQuestionImageLink(result.rows[0]) });
});

router.put('/test-questions/:id', adminAuth, async (req, res) => {
  const {
    subject,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    explanation,
    questionImageLink,
  } =
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
         explanation = COALESCE($9, explanation),
         question_image_link = COALESCE($10, question_image_link),
         question_image_drive_file_id = COALESCE($11, question_image_drive_file_id),
         question_image_drive_folder_id = COALESCE($12, question_image_drive_folder_id)
     WHERE id = $1
     RETURNING *`,
    [
      req.params.id,
      subject,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      explanation,
      questionImageLink == null ? null : normalizeDriveLink(questionImageLink, 'image'),
      questionImageLink == null ? null : extractDriveFileId(questionImageLink),
      null,
    ]
  );
  res.json({
    success: true,
    question: result.rows[0] ? mapQuestionImageLink(result.rows[0]) : null,
  });
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
    const batchRes = await pool.query('SELECT name FROM batches WHERE id = $1', [batchId]);
    const batchName = batchRes.rows[0]?.name || `Batch-${batchId}`;
    const folderSegments = [
      batchName,
      classLabel || 'General',
      subject || 'General',
      topic || chapterHint || 'General',
    ];
    const resolvedFolderId = await ensureDriveFolderPath({
      rootFolderId: process.env.GDRIVE_FOLDER_ID,
      segments: folderSegments,
    });

    const uploaded = await uploadBufferToDrive({
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      folderId: resolvedFolderId,
    });
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
      driveFolder: {
        id: resolvedFolderId,
        path: folderSegments,
      },
    });
  } catch (error) {
    logAdminRouteError('/videos/upload', error);
    return res.status(500).json({
      error: error.message || 'Upload failed',
    });
  }
});

// Chunked upload (Render-safe) for direct video upload
router.post('/videos/upload-init', adminAuth, async (req, res) => {
  try {
    const {
      title,
      subject,
      topic,
      classLabel,
      chapterHint,
      sectionLabel,
      durationLabel,
      fileName,
      mimeType,
    } = req.body;
    const { batchId } = hierarchyFromBody(req.body);
    if (!batchId || !title || !fileName) {
      return res.status(400).json({ error: 'batchId, title, fileName are required' });
    }
    const uploadId = crypto.randomUUID();
    const dir = path.join(UPLOAD_ROOT, uploadId);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'meta.json'),
      JSON.stringify(
        {
          uploadId,
          batchId,
          title,
          subject: subject || '',
          topic: topic || '',
          classLabel: classLabel || '',
          chapterHint: chapterHint || '',
          sectionLabel: sectionLabel || 'Concept explainers',
          durationLabel: durationLabel || '15 min',
          fileName,
          mimeType: mimeType || 'video/mp4',
          createdAt: Date.now(),
        },
        null,
        2
      )
    );
    return res.json({ success: true, uploadId, chunkSize: 2 * 1024 * 1024 });
  } catch (e) {
    logAdminRouteError('/videos/upload-init', e);
    return res.status(500).json({ error: e.message || 'init failed' });
  }
});

router.post('/videos/upload-chunk', adminAuth, upload.single('chunk'), async (req, res) => {
  try {
    const { uploadId, index, totalChunks } = req.body;
    if (!uploadId || index === undefined || !req.file) {
      return res.status(400).json({ error: 'uploadId, index, chunk are required' });
    }
    const dir = path.join(UPLOAD_ROOT, uploadId);
    if (!fs.existsSync(dir)) {
      return res.status(404).json({ error: 'upload session not found' });
    }
    const idx = Number(index);
    if (!Number.isFinite(idx) || idx < 0) {
      return res.status(400).json({ error: 'invalid index' });
    }
    fs.writeFileSync(path.join(dir, `chunk_${idx}.bin`), req.file.buffer);
    if (totalChunks !== undefined) {
      fs.writeFileSync(path.join(dir, 'total.txt'), String(totalChunks));
    }
    return res.json({ success: true });
  } catch (e) {
    logAdminRouteError('/videos/upload-chunk', e, { uploadId: req.body?.uploadId });
    return res.status(500).json({ error: e.message || 'chunk failed' });
  }
});

router.post('/videos/upload-complete', adminAuth, async (req, res) => {
  try {
    const { uploadId } = req.body;
    if (!uploadId) {
      return res.status(400).json({ error: 'uploadId is required' });
    }
    const dir = path.join(UPLOAD_ROOT, uploadId);
    const metaPath = path.join(dir, 'meta.json');
    if (!fs.existsSync(metaPath)) {
      return res.status(404).json({ error: 'upload session not found' });
    }
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const chunks = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('chunk_') && f.endsWith('.bin'))
      .sort((a, b) => {
        const ai = Number(a.replace('chunk_', '').replace('.bin', ''));
        const bi = Number(b.replace('chunk_', '').replace('.bin', ''));
        return ai - bi;
      });
    if (chunks.length === 0) {
      return res.status(400).json({ error: 'no chunks uploaded' });
    }
    const assembledPath = path.join(dir, meta.fileName);
    const out = fs.createWriteStream(assembledPath);
    for (const f of chunks) {
      const p = path.join(dir, f);
      out.write(fs.readFileSync(p));
    }
    await new Promise((resolve) => out.end(resolve));

    const batchRes = await pool.query('SELECT name FROM batches WHERE id = $1', [meta.batchId]);
    const batchName = batchRes.rows[0]?.name || `Batch-${meta.batchId}`;
    const folderSegments = [
      batchName,
      meta.classLabel || 'General',
      meta.subject || 'General',
      meta.topic || meta.chapterHint || 'General',
    ];
    const resolvedFolderId = await ensureDriveFolderPath({
      rootFolderId: process.env.GDRIVE_FOLDER_ID,
      segments: folderSegments,
    });

    const uploaded = await uploadFilePathToDrive({
      filePath: assembledPath,
      fileName: meta.fileName,
      mimeType: meta.mimeType || 'video/mp4',
      folderId: resolvedFolderId,
    });

    const dbResult = await pool.query(
      `INSERT INTO videos (
        batch_id, class_label, title, subject, topic, chapter_hint, section_label, duration_label, drive_link
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        meta.batchId,
        meta.classLabel || null,
        meta.title,
        meta.subject || '',
        meta.topic || '',
        meta.chapterHint || '',
        meta.sectionLabel || 'Concept explainers',
        meta.durationLabel || '15 min',
        uploaded.webViewLink || uploaded.webContentLink,
      ]
    );

    // cleanup
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch (_) {}

    return res.json({
      success: true,
      video: dbResult.rows[0],
      drive: uploaded,
      driveFolder: { id: resolvedFolderId, path: folderSegments },
    });
  } catch (e) {
    logAdminRouteError('/videos/upload-complete', e, { uploadId: req.body?.uploadId });
    return res.status(500).json({ error: e.message || 'complete failed' });
  }
});

// Fallback for Render / large uploads:
// allow admin to save a Drive link directly (upload can be done manually).
router.post('/videos', adminAuth, async (req, res) => {
  try {
    const {
      title,
      subject,
      topic,
      classLabel,
      chapterHint,
      sectionLabel,
      durationLabel,
      driveLink,
    } = req.body;
    const { batchId } = hierarchyFromBody(req.body);
    if (!batchId || !title || !driveLink) {
      return res.status(400).json({ error: 'batchId, title and driveLink are required' });
    }
    const dbResult = await pool.query(
      `INSERT INTO videos (
        batch_id, class_label, title, subject, topic, chapter_hint, section_label, duration_label, drive_link
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        batchId,
        classLabel || null,
        title,
        subject || '',
        topic || '',
        chapterHint || '',
        sectionLabel || 'Concept explainers',
        durationLabel || '15 min',
        driveLink,
      ]
    );
    return res.json({ success: true, video: dbResult.rows[0] });
  } catch (error) {
    logAdminRouteError('/videos', error);
    return res.status(500).json({ error: error.message || 'Failed' });
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

router.get('/packages', adminAuth, async (_req, res) => {
  const result = await pool.query(
    `SELECT id, name, price_label, validity, highlight, features_json, is_active
     FROM packages
     ORDER BY id DESC`
  );
  res.json({ success: true, packages: result.rows });
});

router.post('/packages', adminAuth, async (req, res) => {
  const { name, priceLabel, validity, highlight, features, isActive } = req.body;
  if (!name || !priceLabel || !validity) {
    return res.status(400).json({ error: 'name, priceLabel, validity are required' });
  }
  const result = await pool.query(
    `INSERT INTO packages (name, price_label, validity, highlight, features_json, is_active)
     VALUES ($1,$2,$3,$4,$5::jsonb,$6)
     RETURNING *`,
    [
      name,
      priceLabel,
      validity,
      highlight || '',
      JSON.stringify(Array.isArray(features) ? features : []),
      isActive ?? true,
    ]
  );
  res.json({ success: true, package: result.rows[0] });
});

router.put('/packages/:id', adminAuth, async (req, res) => {
  const { name, priceLabel, validity, highlight, features, isActive } = req.body;
  const result = await pool.query(
    `UPDATE packages
     SET name = COALESCE($2, name),
         price_label = COALESCE($3, price_label),
         validity = COALESCE($4, validity),
         highlight = COALESCE($5, highlight),
         features_json = COALESCE($6::jsonb, features_json),
         is_active = COALESCE($7, is_active)
     WHERE id = $1
     RETURNING *`,
    [
      req.params.id,
      name,
      priceLabel,
      validity,
      highlight,
      features == null ? null : JSON.stringify(Array.isArray(features) ? features : []),
      isActive,
    ]
  );
  res.json({ success: true, package: result.rows[0] });
});

router.delete('/packages/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM packages WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
