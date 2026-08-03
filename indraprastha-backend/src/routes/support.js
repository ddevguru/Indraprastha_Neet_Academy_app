const express = require('express');
const { pool } = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

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

// POST - Student submits a complaint
router.post('/complaints', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Description is required' });
    }

    // Get user email
    const userResult = await pool.query(
      'SELECT email, full_name FROM users WHERE id = $1',
      [userId]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Insert complaint
    const result = await pool.query(
      `INSERT INTO complaints (user_id, title, description, email, full_name, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'open', NOW())
       RETURNING id, created_at`,
      [userId, title.trim(), description.trim(), user.email, user.full_name]
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

// GET - Admin endpoint to fetch all complaints
router.get('/complaints', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    const userResult = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = userResult.rows[0];

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }

    // Fetch all complaints
    const result = await pool.query(
      `SELECT id, user_id, full_name, email, title, description, status, created_at
       FROM complaints
       ORDER BY created_at DESC`
    );

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

// GET - Admin endpoint to fetch complaint by ID
router.get('/complaints/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    const userResult = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = userResult.rows[0];

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      'SELECT id, user_id, full_name, email, title, description, status, created_at FROM complaints WHERE id = $1',
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

// PATCH - Admin endpoint to update complaint status
router.patch('/complaints/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if user is admin
    const userResult = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = userResult.rows[0];

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

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
