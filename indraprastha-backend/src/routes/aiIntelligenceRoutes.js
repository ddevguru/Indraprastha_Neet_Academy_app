/**
 * AI-Powered Personalized Learning Intelligence Routes
 * Indraprastha NEET Academy
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const aiIntelligenceService = require('../services/aiIntelligenceService');

const router = express.Router();

/**
 * Standard Student Authentication Middleware
 */
async function userAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
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
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token: ' + err.message });
  }
}

/**
 * GET /api/ai-intelligence/overview
 * AI Learning Overview Dashboard: Mastery score, 4-category counts, subject breakdown, today's tasks
 */
router.get('/overview', userAuth, async (req, res) => {
  try {
    const overview = await aiIntelligenceService.getOverview(req.user.id);
    return res.json({
      success: true,
      data: overview
    });
  } catch (err) {
    console.error('[AI_INTELLIGENCE_OVERVIEW_ERROR]', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch AI learning overview' });
  }
});

/**
 * GET /api/ai-intelligence/categories/:category
 * Fetch topics under one of the 4 learning categories:
 *  - 'not_studied'
 *  - 'poorly_understood'
 *  - 'repeated_mistakes'
 *  - 'needs_revision'
 * Optional Query: ?subject=Physics|Chemistry|Biology
 */
router.get('/categories/:category', userAuth, async (req, res) => {
  try {
    const { category } = req.params;
    const { subject } = req.query;

    const data = await aiIntelligenceService.getCategoryTopics(req.user.id, category, subject);
    return res.json({
      success: true,
      data
    });
  } catch (err) {
    console.error('[AI_INTELLIGENCE_CATEGORY_ERROR]', err);
    return res.status(400).json({ error: err.message || 'Failed to fetch category topics' });
  }
});

/**
 * GET /api/ai-intelligence/topics/detail
 * Deep-dive analysis for a single topic
 * Query params: ?subject=Physics&topic=Dimensional Analysis
 */
router.get('/topics/detail', userAuth, async (req, res) => {
  try {
    const { subject, topic } = req.query;
    if (!subject || !topic) {
      return res.status(400).json({ error: 'Both subject and topic query parameters are required' });
    }

    const detail = await aiIntelligenceService.getTopicDetail(req.user.id, subject, topic);
    return res.json({
      success: true,
      data: detail
    });
  } catch (err) {
    console.error('[AI_INTELLIGENCE_TOPIC_DETAIL_ERROR]', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch topic details' });
  }
});

/**
 * GET /api/ai-intelligence/study-plan
 * Personalized Daily Study Plan: Prioritized learning tasks, MCQs, PYQs, and revision schedule
 */
router.get('/study-plan', userAuth, async (req, res) => {
  try {
    const plan = await aiIntelligenceService.getStudyPlan(req.user.id);
    return res.json({
      success: true,
      data: plan
    });
  } catch (err) {
    console.error('[AI_INTELLIGENCE_STUDY_PLAN_ERROR]', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch personalized study plan' });
  }
});

/**
 * POST /api/ai-intelligence/recommendations/:id/complete
 * Mark a personalized recommendation task as completed
 */
router.post('/recommendations/:id/complete', userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await aiIntelligenceService.completeRecommendation(req.user.id, id);
    return res.json({
      success: true,
      message: 'Recommendation marked as completed',
      data: result.recommendation
    });
  } catch (err) {
    console.error('[AI_INTELLIGENCE_RECOMMENDATION_COMPLETE_ERROR]', err);
    return res.status(400).json({ error: err.message || 'Failed to complete recommendation' });
  }
});

/**
 * POST /api/ai-intelligence/analyze
 * Trigger on-demand full re-analysis of student learning history
 */
router.post('/analyze', userAuth, async (req, res) => {
  try {
    const result = await aiIntelligenceService.analyzeStudentTopicProgress(req.user.id);
    const overview = await aiIntelligenceService.getOverview(req.user.id);
    return res.json({
      success: true,
      message: 'AI Learning Analysis completed successfully',
      data: {
        analysis: result,
        overview
      }
    });
  } catch (err) {
    console.error('[AI_INTELLIGENCE_ANALYZE_TRIGGER_ERROR]', err);
    return res.status(500).json({ error: err.message || 'Failed to run AI analysis' });
  }
});

module.exports = router;

