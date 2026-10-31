const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { pool } = require('../db');
const { uploadMediaToAdminDrive } = require('../services/communityDriveService');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

// Teacher Auth Middleware
async function teacherAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Teacher authentication required' });
  }

  try {
    const token = header.slice(7).trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'teacher' || !payload.teacherId) {
      return res.status(403).json({ error: 'Teacher role required' });
    }

    // Verify teacher is active in DB
    const teacherRes = await pool.query(
      'SELECT id, teacher_code, display_name, email, is_active FROM teacher_profiles WHERE id = $1',
      [payload.teacherId]
    );

    if (teacherRes.rows.length === 0) {
      return res.status(401).json({ error: 'Teacher profile not found' });
    }

    const teacher = teacherRes.rows[0];
    if (!teacher.is_active) {
      return res.status(403).json({ error: 'Teacher account is deactivated. Contact administrator.' });
    }

    req.teacher = teacher;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired teacher token' });
  }
}

/**
 * POST /api/teacher/login
 * Teacher login with active credentials
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email/Teacher code and password are required' });
    }

    const trimmedIdentifier = String(email).trim().toLowerCase();

    const { rows } = await pool.query(
      `SELECT * FROM teacher_profiles 
       WHERE LOWER(email) = $1 OR LOWER(teacher_code) = $1`,
      [trimmedIdentifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const teacher = rows[0];

    if (!teacher.is_active) {
      return res.status(403).json({ error: 'Account is deactivated. Please contact admin.' });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch assigned subjects
    const assignmentsRes = await pool.query(
      `SELECT class_level, subject FROM teacher_subject_assignments WHERE teacher_id = $1`,
      [teacher.id]
    );

    const token = jwt.sign(
      {
        teacherId: teacher.id,
        teacherCode: teacher.teacher_code,
        displayName: teacher.display_name,
        role: 'teacher',
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      teacher: {
        id: teacher.id,
        teacherCode: teacher.teacher_code,
        displayName: teacher.display_name,
        email: teacher.email,
        phone: teacher.phone,
        assignments: assignmentsRes.rows,
      },
    });
  } catch (err) {
    console.error('[TEACHER_LOGIN_ERROR]', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * GET /api/teacher/profile
 */
router.get('/profile', teacherAuth, async (req, res) => {
  try {
    const assignments = await pool.query(
      'SELECT id, class_level, subject, created_at FROM teacher_subject_assignments WHERE teacher_id = $1',
      [req.teacher.id]
    );

    res.json({
      success: true,
      teacher: {
        ...req.teacher,
        assignments: assignments.rows,
      },
    });
  } catch (err) {
    console.error('[TEACHER_PROFILE_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

/**
 * GET /api/teacher/dashboard
 * Workload & metrics for assigned subjects
 */
router.get('/dashboard', teacherAuth, async (req, res) => {
  try {
    const teacherId = req.teacher.id;

    // 1. Get teacher's assigned subjects
    const assignRes = await pool.query(
      'SELECT class_level, subject FROM teacher_subject_assignments WHERE teacher_id = $1',
      [teacherId]
    );
    const assignments = assignRes.rows;

    if (assignments.length === 0) {
      return res.json({
        success: true,
        metrics: {
          totalEligible: 0,
          pending: 0,
          assigned: 0,
          inProgress: 0,
          answered: 0,
          resolved: 0,
          reopened: 0,
          avgResponseTimeMinutes: 0,
          avgResolutionTimeMinutes: 0,
        },
        recentDoubts: [],
      });
    }

    // Condition to match any assigned (class_level, subject)
    const matchConditions = assignments.map((_, i) => `(d.class_level = $${i * 2 + 1} AND d.subject = $${i * 2 + 2})`).join(' OR ');
    const matchParams = [];
    assignments.forEach((a) => {
      matchParams.push(a.class_level, a.subject);
    });

    // Count by status
    const countsRes = await pool.query(
      `SELECT 
         COUNT(*) as total_eligible,
         COUNT(*) FILTER (WHERE d.status = 'Pending') as pending,
         COUNT(*) FILTER (WHERE d.status = 'Assigned' AND d.assigned_teacher_id = ${teacherId}) as my_assigned,
         COUNT(*) FILTER (WHERE d.status = 'In Progress' AND d.assigned_teacher_id = ${teacherId}) as my_in_progress,
         COUNT(*) FILTER (WHERE d.status = 'Answered' AND d.assigned_teacher_id = ${teacherId}) as my_answered,
         COUNT(*) FILTER (WHERE d.status = 'Resolved' AND d.assigned_teacher_id = ${teacherId}) as my_resolved,
         COUNT(*) FILTER (WHERE d.status = 'Reopened') as reopened,
         AVG(
           EXTRACT(EPOCH FROM (d.first_response_at - d.created_at)) / 60
         ) FILTER (WHERE d.assigned_teacher_id = ${teacherId} AND d.first_response_at IS NOT NULL) as avg_response_mins,
         AVG(
           EXTRACT(EPOCH FROM (d.resolved_at - d.created_at)) / 60
         ) FILTER (WHERE d.assigned_teacher_id = ${teacherId} AND d.resolved_at IS NOT NULL) as avg_resolution_mins
       FROM doubts d
       WHERE (${matchConditions} OR d.assigned_teacher_id = ${teacherId})`,
      matchParams
    );

    const c = countsRes.rows[0];

    // Recent doubts for teacher queue (Student anonymity guaranteed)
    const recentRes = await pool.query(
      `SELECT d.id, d.title, d.class_level, d.subject, d.status, d.created_at, d.updated_at,
              d.assigned_teacher_id, tp.display_name as assigned_teacher_name,
              'Student' as student_name
       FROM doubts d
       LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
       WHERE (${matchConditions} OR d.assigned_teacher_id = ${teacherId})
       ORDER BY d.updated_at DESC LIMIT 10`,
      matchParams
    );

    const metricsObj = {
      totalEligible: parseInt(c.total_eligible || '0', 10),
      pending: parseInt(c.pending || '0', 10),
      assigned: parseInt(c.my_assigned || '0', 10),
      inProgress: parseInt(c.my_in_progress || '0', 10),
      answered: parseInt(c.my_answered || '0', 10),
      resolved: parseInt(c.my_resolved || '0', 10),
      reopened: parseInt(c.reopened || '0', 10),
      // Snake_case aliases
      total_eligible: parseInt(c.total_eligible || '0', 10),
      in_progress: parseInt(c.my_in_progress || '0', 10),
      avgResponseTimeMinutes: Math.round(parseFloat(c.avg_response_mins || '0')),
      avgResolutionTimeMinutes: Math.round(parseFloat(c.avg_resolution_mins || '0')),
    };

    res.json({
      success: true,
      metrics: metricsObj,
      stats: metricsObj,
      recentDoubts: recentRes.rows,
    });
  } catch (err) {
    console.error('[TEACHER_DASHBOARD_ERROR]', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

/**
 * GET /api/teacher/doubts
 * Subject-filtered doubt queue
 */
router.get('/doubts', teacherAuth, async (req, res) => {
  try {
    const teacherId = req.teacher.id;
    const { status, classLevel, subject, search } = req.query;

    // Fetch assigned subjects
    const assignRes = await pool.query(
      'SELECT class_level, subject FROM teacher_subject_assignments WHERE teacher_id = $1',
      [teacherId]
    );
    const assignments = assignRes.rows;

    if (assignments.length === 0) {
      return res.json({ success: true, doubts: [] });
    }

    let matchConditions = assignments.map((_, i) => `(d.class_level = $${i * 2 + 1} AND d.subject = $${i * 2 + 2})`).join(' OR ');
    let params = [];
    assignments.forEach((a) => params.push(a.class_level, a.subject));

    let queryText = `
      SELECT 
        d.id, d.title, d.description, d.class_level, d.subject, d.status,
        d.created_at, d.updated_at, d.first_opened_at, d.first_response_at, d.resolved_at,
        d.assigned_teacher_id, tp.display_name as assigned_teacher_name,
        0 as student_id, 'Student' as student_name,
        (SELECT COUNT(*) FROM doubt_attachments WHERE doubt_id = d.id) as attachment_count,
        (SELECT COUNT(*) FROM doubt_responses WHERE doubt_id = d.id) as response_count
      FROM doubts d
      LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
      WHERE (${matchConditions} OR d.assigned_teacher_id = ${teacherId})
    `;

    if (status) {
      const normalizedStatus = status.toLowerCase().replace(/_/g, ' ');
      params.push(normalizedStatus);
      queryText += ` AND LOWER(REPLACE(d.status, '_', ' ')) = $${params.length}`;
    }
    if (classLevel) {
      params.push(classLevel);
      queryText += ` AND d.class_level = $${params.length}`;
    }
    if (subject) {
      params.push(subject);
      queryText += ` AND d.subject = $${params.length}`;
    }
    if (search) {
      params.push(`%${search.trim()}%`);
      queryText += ` AND (d.title ILIKE $${params.length} OR d.description ILIKE $${params.length} OR CAST(d.id AS TEXT) = $${params.length - 1})`;
    }

    queryText += ` ORDER BY d.updated_at DESC, d.created_at DESC LIMIT 100`;

    const { rows } = await pool.query(queryText, params);

    res.json({ success: true, doubts: rows });
  } catch (err) {
    console.error('[TEACHER_DOUBTS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch doubts' });
  }
});

/**
 * GET /api/teacher/doubts/:doubtId
 * View doubt details for resolution
 */
router.get('/doubts/:doubtId', teacherAuth, async (req, res) => {
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);

    const doubtRes = await pool.query(
      `SELECT d.id, d.class_level, d.subject, d.title, d.description, d.status,
              d.created_at, d.updated_at, d.first_opened_at, d.first_response_at, d.resolved_at,
              d.assigned_teacher_id, tp.display_name as assigned_teacher_name,
              0 as student_id, 'Student' as student_name
       FROM doubts d
       LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
       WHERE d.id = $1`,
      [doubtId]
    );

    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    const doubt = doubtRes.rows[0];

    // Verify teacher is assigned this subject or this doubt is assigned to teacher
    if (doubt.assigned_teacher_id !== teacherId) {
      const authCheck = await pool.query(
        `SELECT id FROM teacher_subject_assignments 
         WHERE teacher_id = $1 AND (class_level = $2 OR class_level = 'All') AND subject = $3`,
        [teacherId, doubt.class_level, doubt.subject]
      );
      if (authCheck.rows.length === 0) {
        return res.status(403).json({ error: 'You are not assigned to this subject/class' });
      }
    }

    // Record first opened if null
    if (!doubt.first_opened_at) {
      await pool.query('UPDATE doubts SET first_opened_at = CURRENT_TIMESTAMP WHERE id = $1', [doubtId]);
      await pool.query(
        `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, metadata_json)
         VALUES ($1, $2, 'teacher', 'DOUBT_VIEWED', $3)`,
        [doubtId, teacherId, JSON.stringify({ teacherName: req.teacher.display_name })]
      );
    }

    // Attachments
    const attRes = await pool.query(
      'SELECT * FROM doubt_attachments WHERE doubt_id = $1 ORDER BY id ASC',
      [doubtId]
    );

    // Responses
    const respRes = await pool.query(
      `SELECT dr.*, tp.display_name as teacher_name
       FROM doubt_responses dr
       LEFT JOIN teacher_profiles tp ON tp.id = dr.teacher_id
       WHERE dr.doubt_id = $1
       ORDER BY dr.created_at ASC`,
      [doubtId]
    );

    const responses = [];
    for (const r of respRes.rows) {
      const respAtt = await pool.query(
        'SELECT * FROM doubt_response_attachments WHERE response_id = $1',
        [r.id]
      );
      responses.push({ ...r, attachments: respAtt.rows });
    }

    // Solution whiteboard (Teacher can see draft or published version)
    const wbRes = await pool.query(
      `SELECT * FROM teacher_solution_whiteboards 
       WHERE doubt_id = $1 
       ORDER BY updated_at DESC LIMIT 1`,
      [doubtId]
    );

    // History
    const histRes = await pool.query(
      'SELECT * FROM doubt_status_history WHERE doubt_id = $1 ORDER BY changed_at ASC',
      [doubtId]
    );

    res.json({
      success: true,
      doubt: {
        ...doubt,
        attachments: attRes.rows,
        responses,
        solutionWhiteboard: wbRes.rows[0] || null,
        whiteboard: wbRes.rows[0] || null,
        history: histRes.rows,
      },
    });
  } catch (err) {
    console.error('[TEACHER_DOUBT_DETAIL_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch doubt details' });
  }
});

/**
 * POST /api/teacher/doubts/:doubtId/claim
 * Claim doubt (prevents duplicate claims using atomic UPDATE)
 */
router.post('/doubts/:doubtId/claim', teacherAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);

    await client.query('BEGIN');

    // Verify teacher subject assignment first
    const doubtRes = await client.query('SELECT class_level, subject, status, assigned_teacher_id FROM doubts WHERE id = $1 FOR UPDATE', [doubtId]);
    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    const doubt = doubtRes.rows[0];

    const authCheck = await client.query(
      'SELECT id FROM teacher_subject_assignments WHERE teacher_id = $1 AND class_level = $2 AND subject = $3',
      [teacherId, doubt.class_level, doubt.subject]
    );
    if (authCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not authorized for this subject' });
    }

    if (doubt.assigned_teacher_id && doubt.assigned_teacher_id !== teacherId) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Doubt has already been claimed by another teacher' });
    }

    const prevStatus = doubt.status;
    const newStatus = 'Assigned';

    await client.query(
      `UPDATE doubts 
       SET assigned_teacher_id = $1, status = $2, version = version + 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [teacherId, newStatus, doubtId]
    );

    await client.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, $2, $3, $4, 'teacher', 'Teacher claimed doubt')`,
      [doubtId, prevStatus, newStatus, teacherId]
    );

    await client.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, previous_status, new_status, metadata_json)
       VALUES ($1, $2, 'teacher', 'DOUBT_CLAIMED', $3, $4, $5)`,
      [doubtId, teacherId, prevStatus, newStatus, JSON.stringify({ teacherName: req.teacher.display_name })]
    );

    await client.query('COMMIT');

    res.json({ success: true, message: 'Doubt claimed successfully', status: newStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[CLAIM_DOUBT_ERROR]', err);
    res.status(500).json({ error: 'Failed to claim doubt' });
  } finally {
    client.release();
  }
});

/**
 * POST /api/teacher/doubts/:doubtId/start
 * Start solving doubt
 */
router.post('/doubts/:doubtId/start', teacherAuth, async (req, res) => {
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);

    const doubtRes = await pool.query('SELECT status, assigned_teacher_id FROM doubts WHERE id = $1', [doubtId]);
    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found' });
    }

    const prevStatus = doubtRes.rows[0].status;
    const newStatus = 'In Progress';

    await pool.query(
      `UPDATE doubts 
       SET status = $1, assigned_teacher_id = COALESCE(assigned_teacher_id, $2), updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [newStatus, teacherId, doubtId]
    );

    await pool.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, $2, $3, $4, 'teacher', 'Started solving')`,
      [doubtId, prevStatus, newStatus, teacherId]
    );

    await pool.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, previous_status, new_status)
       VALUES ($1, $2, 'teacher', 'DOUBT_WORK_STARTED', $3, $4)`,
      [doubtId, teacherId, prevStatus, newStatus]
    );

    res.json({ success: true, status: newStatus });
  } catch (err) {
    console.error('[START_SOLVING_ERROR]', err);
    res.status(500).json({ error: 'Failed to start solving' });
  }
});

/**
 * POST /api/teacher/doubts/:doubtId/responses
 * Submit answer with optional attachments
 */
router.post('/doubts/:doubtId/responses', teacherAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);
    const text = req.body.responseText || req.body.response_text || '';
    const attachments = req.body.attachments || [];

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Answer explanation text is required' });
    }

    await client.query('BEGIN');

    // 1. Insert response
    const respRes = await client.query(
      `INSERT INTO doubt_responses (doubt_id, teacher_id, response_text, created_at, published_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [doubtId, teacherId, text.trim()]
    );
    const response = respRes.rows[0];

    // 2. Attachments
    const savedAtts = [];
    for (const att of attachments) {
      const attRes = await client.query(
        `INSERT INTO doubt_response_attachments (
           response_id, storage_key, original_filename, mime_type, file_size,
           drive_file_id, drive_view_link, drive_download_link
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          response.id,
          att.storageKey || att.storage_key || `gdrive://${att.driveFileId || att.drive_file_id || Date.now()}`,
          att.originalFilename || att.original_filename || 'attachment',
          att.mimeType || att.mime_type || 'application/octet-stream',
          att.fileSize || att.file_size || 0,
          att.driveFileId || att.drive_file_id || '',
          att.driveViewLink || att.drive_view_link || att.viewLink || att.view_link || att.fileUrl || att.file_url || '',
          att.driveDownloadLink || att.drive_download_link || att.downloadLink || att.download_link || '',
        ]
      );
      savedAtts.push(attRes.rows[0]);
    }

    // 3. Update doubt status & timestamps
    const doubtRes = await client.query(
      `SELECT status, student_id, first_response_at FROM doubts WHERE id = $1 FOR UPDATE`,
      [doubtId]
    );
    const doubt = doubtRes.rows[0];
    const prevStatus = doubt.status;
    const newStatus = 'Answered';

    await client.query(
      `UPDATE doubts 
       SET status = $1, 
           assigned_teacher_id = $2,
           first_response_at = COALESCE(first_response_at, CURRENT_TIMESTAMP),
           last_response_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [newStatus, teacherId, doubtId]
    );

    // 4. Update current resolution cycle
    await client.query(
      `UPDATE doubt_resolution_cycles 
       SET first_response_at = COALESCE(first_response_at, CURRENT_TIMESTAMP)
       WHERE doubt_id = $1 AND first_response_at IS NULL`,
      [doubtId]
    );

    // 5. Record status history
    await client.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, $2, $3, $4, 'teacher', 'Teacher submitted answer')`,
      [doubtId, prevStatus, newStatus, teacherId]
    );

    // 6. Record activity event
    await client.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, previous_status, new_status, response_id)
       VALUES ($1, $2, 'teacher', 'ANSWER_SUBMITTED', $3, $4, $5)`,
      [doubtId, teacherId, prevStatus, newStatus, response.id]
    );

    // 7. Notify student
    await client.query(
      `INSERT INTO community_notifications (user_id, user_role, title, message, doubt_id)
       VALUES ($1, 'student', 'Doubt Answered', $2, $3)`,
      [
        doubt.student_id,
        `Teacher ${req.teacher.display_name} has answered your Doubt #${doubtId}.`,
        doubtId,
      ]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      response: {
        ...response,
        attachments: savedAtts,
      },
      status: newStatus,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[SUBMIT_ANSWER_ERROR]', err);
    res.status(500).json({ error: 'Failed to submit answer' });
  } finally {
    client.release();
  }
});

/**
 * GET /api/teacher/doubts/:doubtId/whiteboard
 * Get solution whiteboard
 */
router.get('/doubts/:doubtId/whiteboard', teacherAuth, async (req, res) => {
  try {
    const doubtId = parseInt(req.params.doubtId, 10);
    const { rows } = await pool.query(
      'SELECT * FROM teacher_solution_whiteboards WHERE doubt_id = $1 ORDER BY updated_at DESC LIMIT 1',
      [doubtId]
    );

    if (rows.length === 0) {
      return res.json({
        success: true,
        whiteboard: {
          doubt_id: doubtId,
          teacher_id: req.teacher.id,
          document_json: { elements: [] },
          version: 1,
          is_published: false,
        },
      });
    }

    res.json({ success: true, whiteboard: rows[0] });
  } catch (err) {
    console.error('[GET_TEACHER_WHITEBOARD_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch solution whiteboard' });
  }
});

/**
 * PUT /api/teacher/doubts/:doubtId/whiteboard
 * Save teacher solution whiteboard draft
 */
router.put('/doubts/:doubtId/whiteboard', teacherAuth, async (req, res) => {
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);
    const { documentJson = { elements: [] }, snapshotDriveLink = '', snapshotDriveFileId = '' } = req.body;

    const docStr = typeof documentJson === 'string' ? documentJson : JSON.stringify(documentJson);

    // Check if whiteboard exists
    const existing = await pool.query(
      'SELECT id, version, is_published FROM teacher_solution_whiteboards WHERE doubt_id = $1',
      [doubtId]
    );

    let whiteboard;
    if (existing.rows.length === 0) {
      const ins = await pool.query(
        `INSERT INTO teacher_solution_whiteboards (
           doubt_id, teacher_id, document_json, snapshot_drive_link, snapshot_drive_file_id, version, is_published, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, 1, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         RETURNING *`,
        [doubtId, teacherId, docStr, snapshotDriveLink, snapshotDriveFileId]
      );
      whiteboard = ins.rows[0];
    } else {
      const upd = await pool.query(
        `UPDATE teacher_solution_whiteboards 
         SET teacher_id = $1, document_json = $2, 
             snapshot_drive_link = COALESCE(NULLIF($3, ''), snapshot_drive_link),
             snapshot_drive_file_id = COALESCE(NULLIF($4, ''), snapshot_drive_file_id),
             version = version + 1, updated_at = CURRENT_TIMESTAMP
         WHERE doubt_id = $5
         RETURNING *`,
        [teacherId, docStr, snapshotDriveLink, snapshotDriveFileId, doubtId]
      );
      whiteboard = upd.rows[0];
    }

    await pool.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, whiteboard_version_id)
       VALUES ($1, $2, 'teacher', 'WHITEBOARD_DRAFT_SAVED', $3)`,
      [doubtId, teacherId, whiteboard.version]
    );

    res.json({ success: true, whiteboard });
  } catch (err) {
    console.error('[SAVE_TEACHER_WHITEBOARD_ERROR]', err);
    res.status(500).json({ error: 'Failed to save solution whiteboard' });
  }
});

/**
 * POST /api/teacher/doubts/:doubtId/publish-solution
 * Publish solution whiteboard to student
 */
router.post('/doubts/:doubtId/publish-solution', teacherAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);
    const { documentJson, snapshotDriveLink = '', snapshotDriveFileId = '' } = req.body;

    await client.query('BEGIN');

    let whiteboard;
    const existing = await client.query(
      'SELECT id, version FROM teacher_solution_whiteboards WHERE doubt_id = $1 ORDER BY updated_at DESC LIMIT 1',
      [doubtId]
    );

    if (documentJson) {
      const docStr = typeof documentJson === 'string' ? documentJson : JSON.stringify(documentJson);
      if (existing.rows.length === 0) {
        const ins = await client.query(
          `INSERT INTO teacher_solution_whiteboards (
             doubt_id, teacher_id, document_json, snapshot_drive_link, snapshot_drive_file_id, version, is_published, published_at, updated_at
           ) VALUES ($1, $2, $3, $4, $5, 1, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
           RETURNING *`,
          [doubtId, teacherId, docStr, snapshotDriveLink, snapshotDriveFileId]
        );
        whiteboard = ins.rows[0];
      } else {
        const upd = await client.query(
          `UPDATE teacher_solution_whiteboards
           SET teacher_id = $1,
               document_json = $2,
               snapshot_drive_link = COALESCE(NULLIF($3, ''), snapshot_drive_link),
               snapshot_drive_file_id = COALESCE(NULLIF($4, ''), snapshot_drive_file_id),
               is_published = TRUE,
               published_at = CURRENT_TIMESTAMP,
               version = version + 1,
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $5
           RETURNING *`,
          [teacherId, docStr, snapshotDriveLink, snapshotDriveFileId, existing.rows[0].id]
        );
        whiteboard = upd.rows[0];
      }
    } else {
      const upd = await client.query(
        `UPDATE teacher_solution_whiteboards
         SET is_published = TRUE, published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
         WHERE doubt_id = $1
         RETURNING *`,
        [doubtId]
      );
      whiteboard = upd.rows[0];
    }

    // Advance doubt status to Answered if currently Assigned or In Progress
    await client.query(
      `UPDATE doubts 
       SET status = 'Answered', updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND status IN ('Assigned', 'In Progress')`,
      [doubtId]
    );

    // Activity event
    await client.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, whiteboard_version_id)
       VALUES ($1, $2, 'teacher', 'WHITEBOARD_PUBLISHED', $3)`,
      [doubtId, teacherId, whiteboard?.version || 1]
    );

    // Notify student
    const dRes = await client.query('SELECT student_id FROM doubts WHERE id = $1', [doubtId]);
    if (dRes.rows.length > 0) {
      await client.query(
        `INSERT INTO community_notifications (user_id, user_role, title, message, doubt_id)
         VALUES ($1, 'student', 'Solution Whiteboard Published', $2, $3)`,
        [
          dRes.rows[0].student_id,
          `Teacher ${req.teacher.display_name} published an interactive solution whiteboard for Doubt #${doubtId}.`,
          doubtId,
        ]
      );
    }

    await client.query('COMMIT');

    res.json({ success: true, message: 'Solution whiteboard published successfully', whiteboard });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[PUBLISH_WHITEBOARD_ERROR]', err);
    res.status(500).json({ error: 'Failed to publish solution whiteboard' });
  } finally {
    client.release();
  }
});

/**
 * POST /api/teacher/doubts/:doubtId/resolve
 * Mark doubt resolved
 */
router.post('/doubts/:doubtId/resolve', teacherAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const teacherId = req.teacher.id;
    const doubtId = parseInt(req.params.doubtId, 10);

    await client.query('BEGIN');

    const doubtRes = await client.query('SELECT status, student_id FROM doubts WHERE id = $1 FOR UPDATE', [doubtId]);
    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    const prevStatus = doubtRes.rows[0].status;
    const newStatus = 'Resolved';

    await client.query(
      `UPDATE doubts 
       SET status = $1, resolved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [newStatus, doubtId]
    );

    await client.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, $2, $3, $4, 'teacher', 'Teacher marked resolved')`,
      [doubtId, prevStatus, newStatus, teacherId]
    );

    await client.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, previous_status, new_status)
       VALUES ($1, $2, 'teacher', 'DOUBT_RESOLVED', $3, $4)`,
      [doubtId, teacherId, prevStatus, newStatus]
    );

    // Close resolution cycle
    await client.query(
      `UPDATE doubt_resolution_cycles 
       SET resolved_at = CURRENT_TIMESTAMP, closed_by_user_id = $2
       WHERE doubt_id = $1 AND resolved_at IS NULL`,
      [doubtId, teacherId]
    );

    await client.query('COMMIT');

    res.json({ success: true, status: newStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[TEACHER_RESOLVE_DOUBT_ERROR]', err);
    res.status(500).json({ error: 'Failed to resolve doubt' });
  } finally {
    client.release();
  }
});

/**
 * POST /api/teacher/upload
 * Direct file upload to Google Drive for teachers
 */
router.post('/upload', teacherAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { subfolder = 'TeacherAnswers' } = req.body;
    const uploadResult = await uploadMediaToAdminDrive({
      fileBuffer: req.file.buffer,
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      subfolder,
    });

    res.json({
      success: true,
      file: {
        originalFilename: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        driveFileId: uploadResult.driveFileId,
        viewLink: uploadResult.viewLink,
        downloadLink: uploadResult.downloadLink,
        imageLink: uploadResult.imageLink,
        storageKey: uploadResult.storageKey,
      },
    });
  } catch (err) {
    console.error('[TEACHER_UPLOAD_ERROR]', err);
    res.status(500).json({ error: 'Failed to upload media to Google Drive' });
  }
});

module.exports = router;
