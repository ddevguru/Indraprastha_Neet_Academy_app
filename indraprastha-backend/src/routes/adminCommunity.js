const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../db');

// Admin Auth Middleware
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

router.use(adminAuth);

// ─────────────────────────────────────────────────────────────
// 1. TEACHER MANAGEMENT
// ─────────────────────────────────────────────────────────────

/**
 * GET /api/admin/teachers
 * List all teachers with their assignments & performance
 */
router.get('/teachers', async (req, res) => {
  try {
    const query = `
      SELECT 
        tp.id,
        tp.teacher_code,
        tp.display_name,
        tp.email,
        tp.phone,
        tp.is_active,
        tp.created_at,
        tp.updated_at,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', tsa.id,
              'classLevel', tsa.class_level,
              'subject', tsa.subject
            )
          ) FILTER (WHERE tsa.id IS NOT NULL), '[]'
        ) as assignments,
        COUNT(DISTINCT d.id) as total_assigned_doubts,
        COUNT(DISTINCT d.id) FILTER (WHERE d.status = 'Resolved') as total_resolved_doubts,
        COUNT(DISTINCT d.id) FILTER (WHERE d.status IN ('Assigned', 'In Progress')) as active_workload,
        AVG(EXTRACT(EPOCH FROM (d.first_response_at - d.created_at)) / 60) FILTER (WHERE d.first_response_at IS NOT NULL) as avg_response_mins
      FROM teacher_profiles tp
      LEFT JOIN teacher_subject_assignments tsa ON tsa.teacher_id = tp.id
      LEFT JOIN doubts d ON d.assigned_teacher_id = tp.id
      GROUP BY tp.id
      ORDER BY tp.created_at DESC
    `;

    const { rows } = await pool.query(query);

    res.json({
      success: true,
      teachers: rows.map((r) => ({
        ...r,
        avgResponseMinutes: Math.round(parseFloat(r.avg_response_mins || '0')),
        totalAssignedDoubts: parseInt(r.total_assigned_doubts || '0', 10),
        totalResolvedDoubts: parseInt(r.total_resolved_doubts || '0', 10),
        activeWorkload: parseInt(r.active_workload || '0', 10),
      })),
    });
  } catch (err) {
    console.error('[ADMIN_GET_TEACHERS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

/**
 * POST /api/admin/teachers
 * Create a new teacher account and assign subjects
 */
router.post('/teachers', async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      teacherCode,
      displayName,
      email,
      phone = '',
      password,
      assignments = [], // [{ classLevel, subject }]
    } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).json({ error: 'Display name, email, and password are required' });
    }

    const code = (teacherCode || `TCH-${Date.now().toString().slice(-4)}`).trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check duplicate email or code
    const dupCheck = await client.query(
      'SELECT id FROM teacher_profiles WHERE LOWER(email) = $1 OR teacher_code = $2',
      [cleanEmail, code]
    );
    if (dupCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Teacher with this email or teacher code already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await client.query('BEGIN');

    const teacherRes = await client.query(
      `INSERT INTO teacher_profiles (
         teacher_code, display_name, email, phone, password_hash, is_active
       ) VALUES ($1, $2, $3, $4, $5, TRUE)
       RETURNING id, teacher_code, display_name, email, phone, is_active, created_at`,
      [code, displayName.trim(), cleanEmail, phone.trim(), passwordHash]
    );
    const teacher = teacherRes.rows[0];

    // Assign classes and subjects
    const savedAssignments = [];
    for (const a of assignments) {
      if (a.classLevel && a.subject) {
        const assignRes = await client.query(
          `INSERT INTO teacher_subject_assignments (teacher_id, class_level, subject)
           VALUES ($1, $2, $3)
           ON CONFLICT (teacher_id, class_level, subject) DO NOTHING
           RETURNING *`,
          [teacher.id, a.classLevel, a.subject]
        );
        if (assignRes.rows.length > 0) {
          savedAssignments.push(assignRes.rows[0]);
        }
      }
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      teacher: {
        ...teacher,
        assignments: savedAssignments,
      },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[ADMIN_CREATE_TEACHER_ERROR]', err);
    res.status(500).json({ error: 'Failed to create teacher' });
  } finally {
    client.release();
  }
});

/**
 * PATCH /api/admin/teachers/:id
 * Update teacher profile, activate/deactivate, or reset password
 */
router.patch('/teachers/:id', async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    const { displayName, phone, isActive, password } = req.body;

    const updates = [];
    const params = [teacherId];

    if (displayName !== undefined) {
      params.push(displayName.trim());
      updates.push(`display_name = $${params.length}`);
    }
    if (phone !== undefined) {
      params.push(phone.trim());
      updates.push(`phone = $${params.length}`);
    }
    if (isActive !== undefined) {
      params.push(Boolean(isActive));
      updates.push(`is_active = $${params.length}`);
    }
    if (password && String(password).trim().length >= 6) {
      const hash = await bcrypt.hash(password.trim(), 10);
      params.push(hash);
      updates.push(`password_hash = $${params.length}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = `
      UPDATE teacher_profiles 
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING id, teacher_code, display_name, email, phone, is_active, updated_at
    `;

    const { rows } = await pool.query(query, params);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ success: true, teacher: rows[0] });
  } catch (err) {
    console.error('[ADMIN_UPDATE_TEACHER_ERROR]', err);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
});

/**
 * GET /api/admin/teachers/:id/performance
 * Detailed performance metrics for a specific teacher
 */
router.get('/teachers/:id/performance', async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10);

    const counts = await pool.query(
      `SELECT 
         COUNT(*) as assigned_count,
         COUNT(*) FILTER (WHERE status = 'Answered') as answered_count,
         COUNT(*) FILTER (WHERE status = 'Resolved') as resolved_count,
         COUNT(*) FILTER (WHERE status = 'Reopened') as reopened_count,
         AVG(EXTRACT(EPOCH FROM (first_response_at - created_at)) / 60) FILTER (WHERE first_response_at IS NOT NULL) as avg_first_response_mins,
         AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600) FILTER (WHERE resolved_at IS NOT NULL) as avg_resolution_hours
       FROM doubts
       WHERE assigned_teacher_id = $1`,
      [teacherId]
    );

    const r = counts.rows[0] || {};
    const avgFirstResponse = r.avg_first_response_mins ? Math.round(parseFloat(r.avg_first_response_mins)) : null;
    const avgResolution = r.avg_resolution_hours ? Math.round(parseFloat(r.avg_resolution_hours) * 10) / 10 : null;

    res.json({
      success: true,
      performance: {
        assignedCount: parseInt(r.assigned_count || '0', 10),
        answeredCount: parseInt(r.answered_count || '0', 10),
        resolvedCount: parseInt(r.resolved_count || '0', 10),
        reopenedCount: parseInt(r.reopened_count || '0', 10),
        avgFirstResponseMinutes: avgFirstResponse,
        avgResolutionHours: avgResolution,
      },
    });
  } catch (err) {
    console.error('[ADMIN_GET_TEACHER_PERFORMANCE_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch teacher performance' });
  }
});

/**
 * POST /api/admin/teachers/:id/assignments
 */
router.post('/teachers/:id/assignments', async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    const { classLevel, subject } = req.body;

    if (!classLevel || !subject) {
      return res.status(400).json({ error: 'Class level and subject are required' });
    }

    const { rows } = await pool.query(
      `INSERT INTO teacher_subject_assignments (teacher_id, class_level, subject)
       VALUES ($1, $2, $3)
       ON CONFLICT (teacher_id, class_level, subject) DO NOTHING
       RETURNING *`,
      [teacherId, classLevel, subject]
    );

    res.json({ success: true, assignment: rows[0] || null });
  } catch (err) {
    console.error('[ADD_TEACHER_ASSIGNMENT_ERROR]', err);
    res.status(500).json({ error: 'Failed to add assignment' });
  }
});

/**
 * DELETE /api/admin/teachers/:id/assignments/:assignmentId
 */
router.delete('/teachers/:id/assignments/:assignmentId', async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    const assignmentId = parseInt(req.params.assignmentId, 10);

    await pool.query(
      'DELETE FROM teacher_subject_assignments WHERE id = $1 AND teacher_id = $2',
      [assignmentId, teacherId]
    );

    res.json({ success: true, message: 'Assignment removed' });
  } catch (err) {
    console.error('[REMOVE_TEACHER_ASSIGNMENT_ERROR]', err);
    res.status(500).json({ error: 'Failed to remove assignment' });
  }
});

// ─────────────────────────────────────────────────────────────
// 2. DOUBT TRACKING & RESOLUTION MONITORING
// ─────────────────────────────────────────────────────────────

/**
 * GET /api/admin/doubts
 * Doubt tracking table with full lifecycle timestamps and handling teachers
 */
router.get('/doubts', async (req, res) => {
  try {
    const {
      status,
      classLevel,
      subject,
      teacherId,
      search,
      startDate,
      endDate,
      limit = 50,
      offset = 0,
    } = req.query;

    let queryText = `
      SELECT 
        d.id,
        d.id as doubt_id,
        d.student_id,
        u.full_name as student_name,
        u.phone as student_phone,
        d.class_level,
        d.subject,
        d.title,
        d.status,
        d.assigned_teacher_id,
        tp.display_name as assigned_teacher_name,
        d.created_at as submission_time,
        d.first_opened_at,
        d.first_response_at,
        d.last_response_at,
        d.resolved_at,
        d.updated_at as last_activity,
        d.version,
        (
          SELECT COUNT(*) - 1
          FROM doubt_resolution_cycles
          WHERE doubt_id = d.id
        ) as reopen_count,
        ROUND(
          CAST(EXTRACT(EPOCH FROM (COALESCE(d.resolved_at, CURRENT_TIMESTAMP) - d.created_at)) / 60 AS NUMERIC), 
          1
        ) as total_elapsed_minutes,
        ROUND(
          CAST(EXTRACT(EPOCH FROM (d.first_response_at - d.created_at)) / 60 AS NUMERIC), 
          1
        ) as first_response_minutes
      FROM doubts d
      LEFT JOIN users u ON u.id = d.student_id
      LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      params.push(status);
      queryText += ` AND d.status = $${params.length}`;
    }
    if (classLevel) {
      params.push(classLevel);
      queryText += ` AND d.class_level = $${params.length}`;
    }
    if (subject) {
      params.push(subject);
      queryText += ` AND d.subject = $${params.length}`;
    }
    if (teacherId) {
      params.push(parseInt(teacherId, 10));
      queryText += ` AND d.assigned_teacher_id = $${params.length}`;
    }
    if (startDate) {
      params.push(startDate);
      queryText += ` AND d.created_at >= $${params.length}`;
    }
    if (endDate) {
      params.push(endDate);
      queryText += ` AND d.created_at <= $${params.length}`;
    }
    if (search) {
      params.push(`%${search.trim()}%`);
      queryText += ` AND (d.title ILIKE $${params.length} OR u.full_name ILIKE $${params.length} OR CAST(d.id AS TEXT) = $${params.length - 1})`;
    }

    queryText += ` ORDER BY d.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const { rows } = await pool.query(queryText, params);

    // Total count for pagination
    const countRes = await pool.query('SELECT COUNT(*) as total FROM doubts');

    res.json({
      success: true,
      total: parseInt(countRes.rows[0]?.total || '0', 10),
      doubts: rows,
    });
  } catch (err) {
    console.error('[ADMIN_GET_DOUBTS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch doubts tracking table' });
  }
});

/**
 * GET /api/admin/doubts/:id
 * Detailed Doubt Tracking Page (Lifecycle, handling teacher, answer, whiteboard, audit events)
 */
router.get('/doubts/:id', async (req, res) => {
  try {
    const doubtId = parseInt(req.params.id, 10);

    const doubtRes = await pool.query(
      `SELECT d.*, u.full_name as student_name, u.phone as student_phone,
              tp.display_name as assigned_teacher_name, tp.email as assigned_teacher_email
       FROM doubts d
       LEFT JOIN users u ON u.id = d.student_id
       LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
       WHERE d.id = $1`,
      [doubtId]
    );

    if (doubtRes.rows.length === 0) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    const doubt = doubtRes.rows[0];

    // Original submitted attachments
    const attRes = await pool.query(
      'SELECT * FROM doubt_attachments WHERE doubt_id = $1 ORDER BY id ASC',
      [doubtId]
    );

    // All teacher responses
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

    // Published solution whiteboard
    const wbRes = await pool.query(
      `SELECT * FROM teacher_solution_whiteboards 
       WHERE doubt_id = $1 
       ORDER BY updated_at DESC LIMIT 1`,
      [doubtId]
    );

    // Activity events timeline
    const eventsRes = await pool.query(
      `SELECT dae.*, 
              CASE 
                WHEN dae.actor_role = 'teacher' THEN tp.display_name
                WHEN dae.actor_role = 'student' THEN u.full_name
                ELSE 'Admin/System'
              END as actor_name
       FROM doubt_activity_events dae
       LEFT JOIN teacher_profiles tp ON tp.id = dae.actor_id AND dae.actor_role = 'teacher'
       LEFT JOIN users u ON u.id = dae.actor_id AND dae.actor_role = 'student'
       WHERE dae.doubt_id = $1
       ORDER BY dae.event_timestamp ASC`,
      [doubtId]
    );

    // Resolution cycles
    const cyclesRes = await pool.query(
      'SELECT * FROM doubt_resolution_cycles WHERE doubt_id = $1 ORDER BY cycle_number ASC',
      [doubtId]
    );

    res.json({
      success: true,
      doubt: {
        ...doubt,
        attachments: attRes.rows,
        responses,
        solutionWhiteboard: wbRes.rows[0] || null,
        timeline: eventsRes.rows,
        resolutionCycles: cyclesRes.rows,
      },
    });
  } catch (err) {
    console.error('[ADMIN_GET_DOUBT_DETAIL_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch doubt audit details' });
  }
});

/**
 * GET /api/admin/doubts/analytics
 * Executive analytics on doubt resolution and teacher metrics
 */
router.get('/doubts-analytics', async (req, res) => {
  try {
    const counts = await pool.query(`
      SELECT 
        COUNT(*) as total_submitted,
        COUNT(*) FILTER (WHERE status = 'Resolved') as total_resolved,
        COUNT(*) FILTER (WHERE status = 'Pending') as pending,
        COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'Assigned') as assigned,
        COUNT(*) FILTER (WHERE status = 'Answered') as answered,
        COUNT(*) FILTER (WHERE status = 'Reopened') as reopened,
        COUNT(*) FILTER (WHERE assigned_teacher_id IS NULL AND status = 'Pending') as unassigned,
        AVG(EXTRACT(EPOCH FROM (first_response_at - created_at)) / 60) FILTER (WHERE first_response_at IS NOT NULL) as avg_first_response_mins,
        AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 60) FILTER (WHERE resolved_at IS NOT NULL) as avg_resolution_mins
      FROM doubts
    `);

    const bySubject = await pool.query(`
      SELECT class_level, subject, COUNT(*) as count
      FROM doubts
      GROUP BY class_level, subject
      ORDER BY count DESC
    `);

    const byStatus = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM doubts
      GROUP BY status
    `);

    const c = counts.rows[0];

    const totalSubmitted = parseInt(c.total_submitted || '0', 10);
    const totalResolved = parseInt(c.total_resolved || '0', 10);
    const totalReopened = parseInt(c.reopened || '0', 10);

    const resolutionRate = totalSubmitted > 0 ? Math.round((totalResolved / totalSubmitted) * 100) : 0;
    const reopenRate = totalSubmitted > 0 ? Math.round((totalReopened / totalSubmitted) * 100) : 0;

    const avgResMinutes = Math.round(parseFloat(c.avg_resolution_mins || '0'));
    const avgResHours = avgResMinutes > 0 ? Math.round((avgResMinutes / 60) * 10) / 10 : null;

    const analyticsObj = {
      totalSubmitted,
      totalResolved,
      pending: parseInt(c.pending || '0', 10),
      inProgress: parseInt(c.in_progress || '0', 10),
      assigned: parseInt(c.assigned || '0', 10),
      answered: parseInt(c.answered || '0', 10),
      reopened: totalReopened,
      unassigned: parseInt(c.unassigned || '0', 10),
      resolutionRate,
      reopenRate,
      avgFirstResponseMinutes: Math.round(parseFloat(c.avg_first_response_mins || '0')),
      avgResolutionMinutes: avgResMinutes,
      avgResolutionHours: avgResHours,
      bySubject: bySubject.rows,
      byStatus: byStatus.rows,
      // Snake_case keys expected by flutter KPI cards
      total_doubts: totalSubmitted,
      pending_doubts: parseInt(c.pending || '0', 10),
      resolved_doubts: totalResolved,
      reopened_doubts: totalReopened,
      avg_resolution_hours: avgResHours,
    };

    res.json({
      success: true,
      analytics: analyticsObj,
      metrics: analyticsObj,
    });
  } catch (err) {
    console.error('[ADMIN_DOUBTS_ANALYTICS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

/**
 * GET /api/admin/reports/doubts
 * Export doubts report as CSV
 */
router.get('/reports/doubts', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        d.id as "Doubt ID",
        u.full_name as "Student Name",
        u.phone as "Student Phone",
        d.class_level as "Class",
        d.subject as "Subject",
        d.title as "Title",
        d.status as "Status",
        tp.display_name as "Assigned Teacher",
        to_char(d.created_at, 'YYYY-MM-DD HH24:MI:SS') as "Submitted At",
        to_char(d.first_response_at, 'YYYY-MM-DD HH24:MI:SS') as "First Response At",
        to_char(d.resolved_at, 'YYYY-MM-DD HH24:MI:SS') as "Resolved At",
        ROUND(CAST(EXTRACT(EPOCH FROM (COALESCE(d.resolved_at, CURRENT_TIMESTAMP) - d.created_at)) / 60 AS NUMERIC), 1) as "Resolution Elapsed (Mins)"
      FROM doubts d
      LEFT JOIN users u ON u.id = d.student_id
      LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
      ORDER BY d.created_at DESC
    `);

    if (rows.length === 0) {
      return res.type('text/csv').send('Doubt ID,Student Name,Class,Subject,Status');
    }

    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    for (const r of rows) {
      const line = headers.map((h) => {
        const val = r[h] === null || r[h] === undefined ? '' : String(r[h]).replace(/"/g, '""');
        return `"${val}"`;
      });
      csvLines.push(line.join(','));
    }

    res.setHeader('Content-Disposition', 'attachment; filename="doubts_resolution_report.csv"');
    res.type('text/csv').send(csvLines.join('\n'));
  } catch (err) {
    console.error('[EXPORT_DOUBTS_CSV_ERROR]', err);
    res.status(500).json({ error: 'Failed to export doubts report' });
  }
});

module.exports = router;
