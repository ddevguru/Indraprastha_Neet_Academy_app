/**
 * Analytics Routes
 * Endpoints for AI-powered analytics and predictions
 */

const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analytics');

// Middleware to ensure user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

/**
 * GET /analytics/analyze-test/:testAttemptId
 * Analyze a specific test attempt
 */
router.post('/analyze-test/:testAttemptId', requireAuth, async (req, res) => {
  try {
    const { testAttemptId } = req.params;
    const userId = req.userId;

    const analysis = await analyticsService.analyzeTestScore(
      testAttemptId,
      userId
    );

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Error analyzing test:', error);
    res.status(400).json({
      error: error.message || 'Failed to analyze test',
    });
  }
});

/**
 * GET /analytics/predict-neet-score
 * Predict NEET score based on current performance
 */
router.get('/predict-neet-score', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;

    const prediction = await analyticsService.predictNEETScore(userId);

    res.json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error('Error predicting NEET score:', error);
    res.status(400).json({
      error: error.message || 'Failed to predict score',
    });
  }
});

/**
 * GET /analytics/dashboard
 * Get comprehensive progress dashboard
 */
router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;

    const dashboard = await analyticsService.getProgressDashboard(userId);

    res.json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error('Error getting dashboard:', error);
    res.status(400).json({
      error: error.message || 'Failed to get dashboard',
    });
  }
});

/**
 * POST /analytics/log-study-session
 * Log daily study hours and activity
 */
router.post('/log-study-session', requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { studyHours, questionsAttempted, questionsCorrect } = req.body;

    if (!studyHours || typeof studyHours !== 'number') {
      return res.status(400).json({ error: 'Invalid study hours' });
    }

    // Get or create study log for today
    const db = require('../db');

    await db.query(
      `INSERT INTO study_logs (user_id, date, study_hours, questions_attempted, questions_correct)
       VALUES ($1, CURRENT_DATE, $2, $3, $4)
       ON CONFLICT (user_id, date) DO UPDATE SET
         study_hours = EXCLUDED.study_hours,
         questions_attempted = EXCLUDED.questions_attempted,
         questions_correct = EXCLUDED.questions_correct`,
      [userId, studyHours, questionsAttempted || 0, questionsCorrect || 0]
    );

    // Update user analytics streak
    await updateStudyStreak(userId);

    res.json({
      success: true,
      message: 'Study session logged successfully',
    });
  } catch (error) {
    console.error('Error logging study session:', error);
    res.status(400).json({
      error: error.message || 'Failed to log study session',
    });
  }
});

/**
 * Helper: Update study streak
 */
async function updateStudyStreak(userId) {
  const db = require('../db');

  try {
    // Get last study date
    const lastStudy = await db.query(
      `SELECT date FROM study_logs
       WHERE user_id = $1
       ORDER BY date DESC
       LIMIT 2`,
      [userId]
    );

    if (lastStudy.rows.length < 2) {
      // First study session
      await db.query(
        `UPDATE user_analytics
         SET current_study_streak = 1
         WHERE user_id = $1`,
        [userId]
      );
      return;
    }

    const today = lastStudy.rows[0].date;
    const yesterday = lastStudy.rows[1].date;

    // Check if streak continues
    const dayDiff = Math.floor(
      (new Date(today) - new Date(yesterday)) / (1000 * 60 * 60 * 24)
    );

    let streak = 1;
    if (dayDiff === 1) {
      // Streak continues
      const result = await db.query(
        `SELECT current_study_streak FROM user_analytics WHERE user_id = $1`,
        [userId]
      );
      streak = (result.rows[0]?.current_study_streak || 0) + 1;
    }

    await db.query(
      `UPDATE user_analytics
       SET
         current_study_streak = $1,
         longest_study_streak = GREATEST(longest_study_streak, $1)
       WHERE user_id = $2`,
      [streak, userId]
    );
  } catch (error) {
    console.error('Error updating streak:', error);
  }
}

module.exports = router;
