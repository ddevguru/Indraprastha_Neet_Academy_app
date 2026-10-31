const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const { uploadMediaToAdminDrive, LOCAL_FALLBACK_DIR } = require('../services/communityDriveService');
const { findBestTeacherForDoubt } = require('../utils/autoAssignTeacher');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max for video/audio/files
});

// Student Authentication Middleware
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

    // Verify active session if present
    const userRes = await pool.query('SELECT id, phone, is_blocked, active_session_id FROM users WHERE id = $1', [payload.id]);
    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    const user = userRes.rows[0];
    if (user.is_blocked) {
      return res.status(403).json({ error: 'Account has been suspended' });
    }

    req.user = { id: user.id, phone: user.phone };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Media Upload Authentication Middleware (permits Students, Teachers, and Admins)
async function uploadAuth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const token = header.slice(7).trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 1. Teacher authentication
    if (payload.role === 'teacher' && payload.teacherId) {
      const teacherRes = await pool.query(
        'SELECT id, teacher_code, display_name, email, is_active FROM teacher_profiles WHERE id = $1',
        [payload.teacherId]
      );
      if (teacherRes.rows.length === 0) {
        return res.status(401).json({ error: 'Teacher profile not found' });
      }
      const teacher = teacherRes.rows[0];
      if (!teacher.is_active) {
        return res.status(403).json({ error: 'Teacher account is deactivated' });
      }
      req.teacher = teacher;
      req.userRole = 'teacher';
      return next();
    }

    // 2. Admin authentication
    if (payload.role === 'admin') {
      req.admin = payload;
      req.userRole = 'admin';
      return next();
    }

    // 3. Student authentication (payload.id)
    if (payload.id) {
      const userRes = await pool.query(
        'SELECT id, phone, is_blocked, active_session_id FROM users WHERE id = $1',
        [payload.id]
      );
      if (userRes.rows.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }
      const user = userRes.rows[0];
      if (user.is_blocked) {
        return res.status(403).json({ error: 'Account has been suspended' });
      }
      req.user = { id: user.id, phone: user.phone };
      req.userRole = 'student';
      return next();
    }

    return res.status(401).json({ error: 'Invalid authentication payload' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

const SIX_SUBJECTS = [
  { classLevel: 'Class 11', subject: 'Chemistry', icon: '🧪', color: '#D2AE39' },
  { classLevel: 'Class 11', subject: 'Biology', icon: '🧬', color: '#2E8B57' },
  { classLevel: 'Class 11', subject: 'Physics', icon: '⚛️', color: '#002350' },
  { classLevel: 'Class 12', subject: 'Chemistry', icon: '⚗️', color: '#D2AE39' },
  { classLevel: 'Class 12', subject: 'Biology', icon: '🌿', color: '#2E8B57' },
  { classLevel: 'Class 12', subject: 'Physics', icon: '🧲', color: '#002350' },
];

/**
 * GET /api/community/subjects
 * Returns the 6 subject workspaces for the authenticated student
 */
router.get('/subjects', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;

    // Ensure workspaces exist for all 6 subjects
    for (const sub of SIX_SUBJECTS) {
      await pool.query(
        `INSERT INTO student_communities (student_id, class_level, subject)
         VALUES ($1, $2, $3)
         ON CONFLICT (student_id, class_level, subject) DO NOTHING`,
        [studentId, sub.classLevel, sub.subject]
      );
    }

    // Query subject cards with last activity and message counts
    const query = `
      SELECT 
        sc.id as community_id,
        sc.class_level,
        sc.subject,
        sc.created_at,
        sc.updated_at,
        COUNT(cm.id) FILTER (WHERE cm.deleted_at IS NULL) as total_messages,
        MAX(cm.created_at) as last_activity_at,
        (
          SELECT cm2.text_content
          FROM community_messages cm2
          WHERE cm2.community_id = sc.id AND cm2.deleted_at IS NULL
          ORDER BY cm2.created_at DESC
          LIMIT 1
        ) as last_message_snippet,
        (
          SELECT cm2.message_type
          FROM community_messages cm2
          WHERE cm2.community_id = sc.id AND cm2.deleted_at IS NULL
          ORDER BY cm2.created_at DESC
          LIMIT 1
        ) as last_message_type
      FROM student_communities sc
      LEFT JOIN community_messages cm ON cm.community_id = sc.id AND cm.deleted_at IS NULL
      WHERE sc.student_id = $1
      GROUP BY sc.id, sc.class_level, sc.subject, sc.created_at, sc.updated_at
      ORDER BY sc.class_level ASC, sc.subject ASC
    `;

    const { rows } = await pool.query(query, [studentId]);

    const result = rows.map((r) => {
      const meta = SIX_SUBJECTS.find(
        (s) => s.classLevel === r.class_level && s.subject === r.subject
      ) || { icon: '📚', color: '#002350' };

      return {
        communityId: r.community_id,
        classLevel: r.class_level,
        subject: r.subject,
        icon: meta.icon,
        color: meta.color,
        totalMessages: parseInt(r.total_messages || '0', 10),
        lastActivityAt: r.last_activity_at || r.updated_at,
        lastMessageSnippet: r.last_message_snippet || '',
        lastMessageType: r.last_message_type || 'text',
      };
    });

    res.json({ success: true, subjects: result });
  } catch (err) {
    console.error('[GET_COMMUNITY_SUBJECTS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch community subjects' });
  }
});

/**
 * GET /api/community/:communityId/messages
 * Paged chat history for student's private workspace
 */
router.get('/:communityId/messages', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const communityId = parseInt(req.params.communityId, 10);
    const limit = Math.min(parseInt(req.query.limit || '50', 10), 100);
    const before = req.query.before; // ISO timestamp string or message ID

    // Verify ownership
    const commRes = await pool.query(
      'SELECT id, class_level, subject FROM student_communities WHERE id = $1 AND student_id = $2',
      [communityId, studentId]
    );
    if (commRes.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied to this private workspace' });
    }

    let queryText = `
      SELECT 
        cm.id,
        cm.community_id,
        cm.student_id,
        cm.message_type,
        cm.text_content,
        cm.doubt_id,
        cm.created_at,
        cm.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ca.id,
              'storageKey', ca.storage_key,
              'originalFilename', ca.original_filename,
              'mimeType', ca.mime_type,
              'fileSize', ca.file_size,
              'driveFileId', ca.drive_file_id,
              'driveViewLink', ca.drive_view_link,
              'driveDownloadLink', ca.drive_download_link
            )
          ) FILTER (WHERE ca.id IS NOT NULL), '[]'
        ) as attachments
      FROM community_messages cm
      LEFT JOIN community_attachments ca ON ca.message_id = cm.id
      WHERE cm.community_id = $1 AND cm.student_id = $2 AND cm.deleted_at IS NULL
    `;
    const params = [communityId, studentId];

    if (before) {
      params.push(before);
      queryText += ` AND cm.created_at < $3`;
    }

    queryText += `
      GROUP BY cm.id
      ORDER BY cm.created_at DESC
      LIMIT $${params.length + 1}
    `;
    params.push(limit);

    const { rows } = await pool.query(queryText, params);

    // Return chronological order (oldest to newest) for smooth chat UI
    res.json({
      success: true,
      community: commRes.rows[0],
      messages: rows.reverse(),
    });
  } catch (err) {
    console.error('[GET_COMMUNITY_MESSAGES_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

/**
 * POST /api/community/upload
 * Direct file upload to Admin's Google Drive
 */
router.post('/upload', uploadAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { subfolder = 'CommunityMedia' } = req.body;
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
    console.error('[COMMUNITY_UPLOAD_ERROR]', err);
    res.status(500).json({ error: 'Failed to upload media to Google Drive' });
  }
});

/**
 * POST /api/community/:communityId/messages
 * Send message with optional attachments in private workspace
 */
router.post('/:communityId/messages', studentAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    const studentId = req.user.id;
    const communityId = parseInt(req.params.communityId, 10);
    const {
      textContent = '',
      messageType = 'text',
      attachments = [], // Array of attachment objects from /upload
      doubtId = null,
    } = req.body;

    // Verify ownership & get subject/class
    const commRes = await client.query(
      'SELECT id, class_level, subject FROM student_communities WHERE id = $1 AND student_id = $2',
      [communityId, studentId]
    );
    if (commRes.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { class_level, subject } = commRes.rows[0];

    await client.query('BEGIN');

    // If doubtId was not already provided by client, auto-create a doubt so it immediately shows up in 'My Doubts' and Teacher Queue
    let finalDoubtId = doubtId ? parseInt(doubtId, 10) : null;
    if (!finalDoubtId) {
      const trimmedText = textContent.trim();
      const title = trimmedText.length > 60
        ? `${trimmedText.substring(0, 57)}...`
        : (trimmedText || (attachments.length > 0 ? `Question: ${attachments[0].originalFilename || 'Media'}` : 'New Question'));
      const description = trimmedText || 'Please see the attached question.';

      const autoTeacher = await findBestTeacherForDoubt(client, class_level, subject);
      const initialStatus = autoTeacher ? 'Assigned' : 'Pending';
      const assignedTeacherId = autoTeacher ? autoTeacher.id : null;

      const doubtRes = await client.query(
        `INSERT INTO doubts (
           student_id, community_id, class_level, subject, title, description, status, assigned_teacher_id, version, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         RETURNING *`,
        [studentId, communityId, class_level, subject, title, description, initialStatus, assignedTeacherId]
      );
      const newDoubt = doubtRes.rows[0];
      finalDoubtId = newDoubt.id;

      for (const att of attachments) {
        await client.query(
          `INSERT INTO doubt_attachments (
             doubt_id, storage_key, original_filename, mime_type, file_size,
             drive_file_id, drive_view_link, drive_download_link
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            newDoubt.id,
            att.storageKey || `gdrive://${att.driveFileId || Date.now()}`,
            att.originalFilename || 'attachment',
            att.mimeType || 'application/octet-stream',
            att.fileSize || 0,
            att.driveFileId || '',
            att.driveViewLink || att.viewLink || '',
            att.driveDownloadLink || att.downloadLink || '',
          ]
        );
      }

      await client.query(
        `INSERT INTO doubt_status_history (doubt_id, previous_status, new_status, changed_by_user_id, changed_by_role, reason)
         VALUES ($1, NULL, $2, $3, $4, $5)`,
        [
          newDoubt.id,
          initialStatus,
          studentId,
          autoTeacher ? 'system' : 'student',
          autoTeacher
            ? `Automatically assigned to faculty: ${autoTeacher.display_name}`
            : 'Submitted via Subject Community Chat (Pending teacher assignment)',
        ]
      );

      await client.query(
        `INSERT INTO doubt_activity_events (
           doubt_id, actor_id, actor_role, event_type, previous_status, new_status, metadata_json
         ) VALUES ($1, $2, $3, $4, NULL, $5, $6)`,
        [
          newDoubt.id,
          studentId,
          autoTeacher ? 'system' : 'student',
          autoTeacher ? 'DOUBT_AUTO_ASSIGNED' : 'DOUBT_SUBMITTED',
          initialStatus,
          JSON.stringify({
            title,
            classLevel: class_level,
            subject,
            assignedTeacherId,
            assignedTeacherName: autoTeacher ? autoTeacher.display_name : null,
            fromChat: true,
          }),
        ]
      );

      if (autoTeacher) {
        await client.query(
          `INSERT INTO community_notifications (user_id, user_role, title, message, doubt_id)
           VALUES ($1, 'teacher', 'New Doubt Assigned', $2, $3)`,
          [
            autoTeacher.id,
            `New question submitted in ${subject} (${class_level}): "${title.slice(0, 80)}"`,
            newDoubt.id,
          ]
        );
      }

      await client.query(
        `INSERT INTO doubt_resolution_cycles (doubt_id, cycle_number, started_at)
         VALUES ($1, 1, CURRENT_TIMESTAMP)`,
        [newDoubt.id]
      );

      await client.query(
        `INSERT INTO doubt_audit_logs (doubt_id, actor_id, actor_role, action, metadata_json)
         VALUES ($1, $2, 'student', 'SUBMIT_DOUBT_FROM_CHAT', $3)`,
        [newDoubt.id, studentId, JSON.stringify({ doubtId: newDoubt.id, title })]
      );
    }

    const msgRes = await client.query(
      `INSERT INTO community_messages (community_id, student_id, message_type, text_content, doubt_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [communityId, studentId, messageType, textContent, finalDoubtId]
    );
    const message = msgRes.rows[0];

    const savedAttachments = [];
    for (const att of attachments) {
      const attRes = await client.query(
        `INSERT INTO community_attachments (
           message_id, storage_key, original_filename, mime_type, file_size,
           drive_file_id, drive_view_link, drive_download_link
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          message.id,
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

    // Update community timestamp
    await client.query('UPDATE student_communities SET updated_at = CURRENT_TIMESTAMP WHERE id = $1', [communityId]);

    await client.query('COMMIT');

    res.json({
      success: true,
      doubtId: finalDoubtId,
      message: {
        ...message,
        attachments: savedAttachments,
        doubt_id: finalDoubtId,
      },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[POST_COMMUNITY_MESSAGE_ERROR]', err);
    res.status(500).json({ error: 'Failed to send message' });
  } finally {
    client.release();
  }
});

/**
 * PATCH /api/community/messages/:messageId
 * Edit student's own message
 */
router.patch('/messages/:messageId', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const messageId = parseInt(req.params.messageId, 10);
    const { textContent = '' } = req.body;

    const result = await pool.query(
      `UPDATE community_messages 
       SET text_content = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND student_id = $3 AND deleted_at IS NULL
       RETURNING *`,
      [textContent, messageId, studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found or not authorized' });
    }

    res.json({ success: true, message: result.rows[0] });
  } catch (err) {
    console.error('[EDIT_MESSAGE_ERROR]', err);
    res.status(500).json({ error: 'Failed to edit message' });
  }
});

/**
 * DELETE /api/community/messages/:messageId
 * Soft delete student's own message
 */
router.delete('/messages/:messageId', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const messageId = parseInt(req.params.messageId, 10);

    const result = await pool.query(
      `UPDATE community_messages 
       SET deleted_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND student_id = $2 AND deleted_at IS NULL
       RETURNING id`,
      [messageId, studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found or not authorized' });
    }

    res.json({ success: true, messageId });
  } catch (err) {
    console.error('[DELETE_MESSAGE_ERROR]', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

/**
 * GET /api/community/:communityId/whiteboard
 * Retrieve student's personal private whiteboard
 */
router.get('/:communityId/whiteboard', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const communityId = parseInt(req.params.communityId, 10);

    // Verify community ownership
    const comm = await pool.query('SELECT id FROM student_communities WHERE id = $1 AND student_id = $2', [communityId, studentId]);
    if (comm.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { rows } = await pool.query(
      `SELECT * FROM student_whiteboards WHERE student_id = $1 AND community_id = $2`,
      [studentId, communityId]
    );

    if (rows.length === 0) {
      return res.json({
        success: true,
        whiteboard: {
          student_id: studentId,
          community_id: communityId,
          document_json: { elements: [] },
          version: 1,
        },
      });
    }

    res.json({ success: true, whiteboard: rows[0] });
  } catch (err) {
    console.error('[GET_WHITEBOARD_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch personal whiteboard' });
  }
});

/**
 * PUT /api/community/:communityId/whiteboard
 * Save/autosave student's personal private whiteboard
 */
router.put('/:communityId/whiteboard', studentAuth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const communityId = parseInt(req.params.communityId, 10);
    const { documentJson = { elements: [] }, snapshotDriveLink = '', snapshotDriveFileId = '' } = req.body;

    // Verify ownership
    const comm = await pool.query('SELECT id FROM student_communities WHERE id = $1 AND student_id = $2', [communityId, studentId]);
    if (comm.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const docStr = typeof documentJson === 'string' ? documentJson : JSON.stringify(documentJson);

    const { rows } = await pool.query(
      `INSERT INTO student_whiteboards (
         student_id, community_id, document_json, snapshot_drive_link, snapshot_drive_file_id, version, updated_at
       ) VALUES ($1, $2, $3, $4, $5, 1, CURRENT_TIMESTAMP)
       ON CONFLICT (student_id, community_id) DO UPDATE SET
         document_json = EXCLUDED.document_json,
         snapshot_drive_link = COALESCE(NULLIF(EXCLUDED.snapshot_drive_link, ''), student_whiteboards.snapshot_drive_link),
         snapshot_drive_file_id = COALESCE(NULLIF(EXCLUDED.snapshot_drive_file_id, ''), student_whiteboards.snapshot_drive_file_id),
         version = student_whiteboards.version + 1,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [studentId, communityId, docStr, snapshotDriveLink, snapshotDriveFileId]
    );

    res.json({ success: true, whiteboard: rows[0] });
  } catch (err) {
    console.error('[SAVE_WHITEBOARD_ERROR]', err);
    res.status(500).json({ error: 'Failed to save whiteboard' });
  }
});

/**
 * GET /api/community/files/local/:fileName
 * Serve local fallback media if used
 */
router.get('/files/local/:fileName', (req, res) => {
  const safeName = path.basename(req.params.fileName);
  const filePath = path.join(LOCAL_FALLBACK_DIR, safeName);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  res.status(404).send('File not found');
});

module.exports = router;
