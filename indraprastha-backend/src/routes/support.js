const express = require('express');
const { pool } = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Student authentication (for submitting complaints)
async function authenticateToken(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = header.replace('Bearer ', '').trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      `SELECT active_session_id FROM users WHERE id = $1`,
      [payload.id]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    const activeSessionId = result.rows[0].active_session_id;
    if (!activeSessionId || payload.sessionId !== activeSessionId) {
      return res.status(401).json({ error: 'Session expired. Logged in on another device.' });
    }
    req.user = payload;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin authentication (for reading/managing complaints in admin panel)
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

// POST - Student submits a complaint or question report
router.post('/complaints', authenticateToken, async (req, res) => {
  try {
    const { title, description, report_type } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Description is required' });
    }

    // Validate report_type
    const validReportTypes = ['general', 'question_report'];
    const reportType = validReportTypes.includes(report_type) ? report_type : 'general';

    // Get user email and phone
    const userResult = await pool.query(
      'SELECT email, full_name, phone FROM users WHERE id = $1',
      [userId]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Rate limit check for question_report: max 4 per month
    if (reportType === 'question_report') {
      const countResult = await pool.query(
        `SELECT COUNT(*) as count 
         FROM complaints 
         WHERE user_id = $1 AND report_type = 'question_report' 
         AND created_at >= NOW() - INTERVAL '1 month'`,
        [userId]
      );
      const reportCount = parseInt(countResult.rows[0].count, 10);
      if (reportCount >= 4) {
        return res.status(400).json({ error: 'Monthly limit reached: You can only submit 4 question reports per month.' });
      }
    }

    // Insert complaint
    const result = await pool.query(
      `INSERT INTO complaints (user_id, title, description, email, full_name, phone, status, report_type, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'open', $7, NOW())
       RETURNING id, created_at`,
      [userId, title.trim(), description.trim(), user.email, user.full_name, user.phone, reportType]
    );

    const complaint = result.rows[0];

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaintId: complaint.id,
      submittedAt: complaint.created_at,
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// GET - Admin endpoint to fetch all complaints (uses admin JWT auth)
router.get('/complaints', adminAuth, async (req, res) => {
  try {
    const { type } = req.query; // Optional filter: 'question_report' or 'general'

    let queryText = `SELECT id, user_id, full_name, email, phone, title, description, status, report_type, created_at
       FROM complaints`;
    const queryParams = [];

    if (type && ['question_report', 'general'].includes(type)) {
      queryText += ` WHERE report_type = $1`;
      queryParams.push(type);
    }

    queryText += ` ORDER BY created_at DESC`;

    const result = await pool.query(queryText, queryParams);

    res.json({
      success: true,
      complaints: result.rows,
      totalCount: result.rows.length,
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// GET - Admin endpoint to fetch complaint by ID (uses admin JWT auth)
router.get('/complaints/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, user_id, full_name, email, phone, title, description, status, report_type, created_at FROM complaints WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({
      success: true,
      complaint: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

// PATCH - Admin endpoint to update complaint status (uses admin JWT auth)
router.patch('/complaints/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      `UPDATE complaints
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, status, updated_at`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json({
      success: true,
      message: 'Complaint status updated',
      complaint: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});

module.exports = router;
