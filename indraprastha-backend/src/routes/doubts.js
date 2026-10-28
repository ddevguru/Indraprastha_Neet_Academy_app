const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

// Student Auth Middleware
async function studentAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const token = header.slice(7).trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.id) {
      return res.status(401).json({ error: 'Invalid authentication payload' });
    }

    const userRes = await pool.query('SELECT id, phone, full_name, is_blocked FROM users WHERE id = $1', [payload.id]);
    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    const user = userRes.rows[0];
    if (user.is_blocked) {
      return res.status(403).json({ error: 'Account suspended' });
    }

    req.user = { id: user.id, phone: user.phone, name: user.full_name || 'Student' };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * POST /api/doubts
 * Explicitly submit a doubt
 */
router.post('/', studentAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const studentId = req.user.id;
    const {
      title,
      description,
      classLevel,
      subject,
      communityId,
      attachments = [], // [{ storageKey, originalFilename, mimeType, fileSize, driveFileId, driveViewLink, driveDownloadLink }]
    } = req.body;

    if (!title || !description || !classLevel || !subject) {
      return res.status(400).json({ error: 'Title, description, classLevel, and subject are required' });
    }

    await client.query('BEGIN');

    // 1. Create doubt record
    const doubtRes = await client.query(
      `INSERT INTO doubts (
         student_id, community_id, class_level, subject, title, description, status, version, created_at, updated_at
       ) VALUES ($1, $2, $3, $4, $5, $6, 'Pending', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [studentId, communityId || null, classLevel, subject, title.trim(), description.trim()]
    );
    const doubt = doubtRes.rows[0];

    // 2. Insert attachments
    const savedAttachments = [];
    for (const att of attachments) {
      const attRes = await client.query(
        `INSERT INTO doubt_attachments (
           doubt_id, storage_key, original_filename, mime_type, file_size,
           drive_file_id, drive_view_link, drive_download_link
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          doubt.id,
          att.storageKey || `gdrive://${att.driveFileId || Date.now()}`,
          att.originalFilename || 'attachment',
          att.mimeType || 'application/octet-stream',
          att.fileSize || 0,
          att.driveFileId || '',
          att.driveViewLink || att.viewLink || '',
          att.driveDownloadLink || att.downloadLink || '',
        ]
      );
      savedAttachments.push(attRes.rows[0]);
    }

    // 3. Record status history
    await client.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, NULL, 'Pending', $2, 'student', 'Initial doubt submission')`,
      [doubt.id, studentId]
    );

    // 4. Record activity event
    await client.query(
      `INSERT INTO doubt_activity_events (
         doubt_id, actor_id, actor_role, event_type, previous_status, new_status, metadata_json
       ) VALUES ($1, $2, 'student', 'DOUBT_SUBMITTED', NULL, 'Pending', $3)`,
      [doubt.id, studentId, JSON.stringify({ title, classLevel, subject, attachmentCount: attachments.length })]
    );

    // 5. Create resolution cycle #1
    await client.query(
      `INSERT INTO doubt_resolution_cycles (doubt_id, cycle_number, started_at)
       VALUES ($1, 1, CURRENT_TIMESTAMP)`,
      [doubt.id]
    );

    // 6. Record audit log
    await client.query(
      `INSERT INTO doubt_audit_logs (doubt_id, actor_id, actor_role, action, metadata_json)
       VALUES ($1, $2, 'student', 'SUBMIT_DOUBT', $3)`,
      [doubt.id, studentId, JSON.stringify({ doubtId: doubt.id, title })]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      doubt: {
        ...doubt,
        attachments: savedAttachments,
      },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[SUBMIT_DOUBT_ERROR]', err);
    res.status(500).json({ error: 'Failed to submit doubt' });
  } finally {
    client.release();
  }
});

/**
 * GET /api/doubts/my
 * List all doubts submitted by student with answers & whiteboard solutions
 */
router.get('/my', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const { status, subject, classLevel } = req.query;

    let queryText = `
      SELECT 
        d.*,
        tp.display_name as assigned_teacher_name,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', da.id,
                'originalFilename', da.original_filename,
                'mimeType', da.mime_type,
                'fileSize', da.file_size,
                'driveFileId', da.drive_file_id,
                'driveViewLink', da.drive_view_link,
                'driveDownloadLink', da.drive_download_link
              )
            ) FROM doubt_attachments da WHERE da.doubt_id = d.id
          ), '[]'
        ) as attachments,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', dr.id,
                'responseText', dr.response_text,
                'teacherName', tp2.display_name,
                'createdAt', dr.created_at,
                'publishedAt', dr.published_at,
                'attachments', (
                  SELECT COALESCE(
                    json_agg(
                      json_build_object(
                        'id', dra.id,
                        'originalFilename', dra.original_filename,
                        'mimeType', dra.mime_type,
                        'fileSize', dra.file_size,
                        'driveFileId', dra.drive_file_id,
                        'driveViewLink', dra.drive_view_link,
                        'driveDownloadLink', dra.drive_download_link
                      )
                    ), '[]'
                  ) FROM doubt_response_attachments dra WHERE dra.response_id = dr.id
                )
              ) ORDER BY dr.created_at ASC
            )
            FROM doubt_responses dr
            LEFT JOIN teacher_profiles tp2 ON tp2.id = dr.teacher_id
            WHERE dr.doubt_id = d.id
          ), '[]'
        ) as responses,
        (
          SELECT json_build_object(
            'id', tsw.id,
            'version', tsw.version,
            'documentJson', tsw.document_json,
            'snapshotDriveLink', tsw.snapshot_drive_link,
            'publishedAt', tsw.published_at
          )
          FROM teacher_solution_whiteboards tsw
          WHERE tsw.doubt_id = d.id AND tsw.is_published = TRUE
          ORDER BY tsw.published_at DESC
          LIMIT 1
        ) as published_solution_whiteboard
      FROM doubts d
      LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
      WHERE d.student_id = $1
    `;
    const params = [studentId];

    if (status) {
      params.push(status);
      queryText += ` AND d.status = $${params.length}`;
    }
    if (subject) {
      params.push(subject);
      queryText += ` AND d.subject = $${params.length}`;
    }
    if (classLevel) {
      params.push(classLevel);
      queryText += ` AND d.class_level = $${params.length}`;
    }

    queryText += ` ORDER BY d.updated_at DESC, d.created_at DESC`;

    const { rows } = await pool.query(queryText, params);

    res.json({ success: true, doubts: rows });
  } catch (err) {
    console.error('[GET_MY_DOUBTS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch student doubts' });
  }
});

/**
 * GET /api/doubts/:doubtId
 * Get specific doubt details for student
 */
router.get('/:doubtId', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const doubtId = parseInt(req.params.doubtId, 10);

    const doubtRes = await pool.query(
      `SELECT d.*, tp.display_name as assigned_teacher_name
       FROM doubts d
       LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
       WHERE d.id = $1 AND d.student_id = $2`,
      [doubtId, studentId]
    );

    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found or not authorized' });
    }
    const doubt = doubtRes.rows[0];

    // Attachments
    const attRes = await pool.query(
      'SELECT * FROM doubt_attachments WHERE doubt_id = $1 ORDER BY id ASC',
      [doubtId]
    );

    // Responses (only published)
    const respRes = await pool.query(
      `SELECT dr.*, tp.display_name as teacher_name
       FROM doubt_responses dr
       LEFT JOIN teacher_profiles tp ON tp.id = dr.teacher_id
       WHERE dr.doubt_id = $1
       ORDER BY dr.created_at ASC`,
      [doubtId]
    );

    // Response attachments
    const responses = [];
    for (const r of respRes.rows) {
      const respAtt = await pool.query(
        'SELECT * FROM doubt_response_attachments WHERE response_id = $1',
        [r.id]
      );
      responses.push({ ...r, attachments: respAtt.rows });
    }

    // Published solution whiteboard only (Drafts must never be exposed to students!)
    const wbRes = await pool.query(
      `SELECT id, version, document_json, snapshot_drive_link, published_at
       FROM teacher_solution_whiteboards
       WHERE doubt_id = $1 AND is_published = TRUE
       ORDER BY published_at DESC LIMIT 1`,
      [doubtId]
    );

    // Timeline / Status history
    const histRes = await pool.query(
      `SELECT * FROM doubt_status_history WHERE doubt_id = $1 ORDER BY changed_at ASC`,
      [doubtId]
    );

    res.json({
      success: true,
      doubt: {
        ...doubt,
        attachments: attRes.rows,
        responses,
        publishedSolutionWhiteboard: wbRes.rows[0] || null,
        history: histRes.rows,
      },
    });
  } catch (err) {
    console.error('[GET_DOUBT_DETAIL_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch doubt details' });
  }
});

/**
 * POST /api/doubts/:doubtId/reopen
 * Reopen doubt for further clarification
 */
router.post('/:doubtId/reopen', studentAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const studentId = req.user.id;
    const doubtId = parseInt(req.params.doubtId, 10);
    const { clarificationText = '' } = req.body;

    if (!clarificationText.trim()) {
      return res.status(400).json({ error: 'Clarification explanation is required to reopen' });
    }

    await client.query('BEGIN');

    // Verify ownership
    const doubtRes = await client.query(
      'SELECT id, status, assigned_teacher_id FROM doubts WHERE id = $1 AND student_id = $2 FOR UPDATE',
      [doubtId, studentId]
    );
    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found or not authorized' });
    }
    const doubt = doubtRes.rows[0];

    const prevStatus = doubt.status;
    const newStatus = 'Reopened';

    // 1. Update doubt status
    await client.query(
      `UPDATE doubts 
       SET status = $1, version = version + 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [newStatus, doubtId]
    );

    // 2. Status history
    await client.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, $2, $3, $4, 'student', $5)`,
      [doubtId, prevStatus, newStatus, studentId, clarificationText]
    );

    // 3. Activity event
    await client.query(
      `INSERT INTO doubt_activity_events (
         doubt_id, actor_id, actor_role, event_type, previous_status, new_status, metadata_json
       ) VALUES ($1, $2, 'student', 'DOUBT_REOPENED', $3, $4, $5)`,
      [doubtId, studentId, prevStatus, newStatus, JSON.stringify({ clarificationText })]
    );

    // 4. Close previous cycle & create new resolution cycle
    const cycleRes = await client.query(
      'SELECT COALESCE(MAX(cycle_number), 1) as max_cycle FROM doubt_resolution_cycles WHERE doubt_id = $1',
      [doubtId]
    );
    const nextCycle = (cycleRes.rows[0]?.max_cycle || 1) + 1;

    await client.query(
      `UPDATE doubt_resolution_cycles 
       SET reopened_at = CURRENT_TIMESTAMP 
       WHERE doubt_id = $1 AND cycle_number = $2`,
      [doubtId, nextCycle - 1]
    );

    await client.query(
      `INSERT INTO doubt_resolution_cycles (doubt_id, cycle_number, started_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [doubtId, nextCycle]
    );

    // 5. Notify teacher if assigned
    if (doubt.assigned_teacher_id) {
      await client.query(
        `INSERT INTO community_notifications (user_id, user_role, title, message, doubt_id)
         VALUES ($1, 'teacher', 'Doubt Reopened', $2, $3)`,
        [
          doubt.assigned_teacher_id,
          `Student requested clarification on Doubt #${doubtId}: "${clarificationText.slice(0, 100)}"`,
          doubtId,
        ]
      );
    }

    await client.query('COMMIT');

    res.json({ success: true, message: 'Doubt reopened successfully', status: newStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[REOPEN_DOUBT_ERROR]', err);
    res.status(500).json({ error: 'Failed to reopen doubt' });
  } finally {
    client.release();
  }
});

/**
 * POST /api/doubts/:doubtId/confirm-resolution
 * Student confirms doubt is satisfied and resolved
 */
router.post('/:doubtId/confirm-resolution', studentAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const studentId = req.user.id;
    const doubtId = parseInt(req.params.doubtId, 10);

    await client.query('BEGIN');

    const doubtRes = await client.query(
      'SELECT id, status FROM doubts WHERE id = $1 AND student_id = $2 FOR UPDATE',
      [doubtId, studentId]
    );
    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found or not authorized' });
    }
    const prevStatus = doubtRes.rows[0].status;

    await client.query(
      `UPDATE doubts 
       SET status = 'Resolved', resolved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [doubtId]
    );

    await client.query(
      `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
       VALUES ($1, $2, 'Resolved', $3, 'student', 'Student confirmed resolution')`,
      [doubtId, prevStatus, studentId]
    );

    await client.query(
      `INSERT INTO doubt_activity_events (
         doubt_id, actor_id, actor_role, event_type, previous_status, new_status
       ) VALUES ($1, $2, 'student', 'DOUBT_RESOLVED', $3, 'Resolved')`,
      [doubtId, studentId, prevStatus]
    );

    // Close resolution cycle
    await client.query(
      `UPDATE doubt_resolution_cycles 
       SET resolved_at = CURRENT_TIMESTAMP, closed_by_user_id = $2
       WHERE doubt_id = $1 AND resolved_at IS NULL`,
      [doubtId, studentId]
    );

    await client.query('COMMIT');

    res.json({ success: true, message: 'Doubt resolved' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[CONFIRM_RESOLUTION_ERROR]', err);
    res.status(500).json({ error: 'Failed to confirm resolution' });
  } finally {
    client.release();
  }
});

module.exports = router;
