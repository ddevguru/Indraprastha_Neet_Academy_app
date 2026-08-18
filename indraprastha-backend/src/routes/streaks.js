const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // TODO: Verify token and extract user_id
  req.user_id = 1; // Placeholder - replace with actual user from token
  next();
};

// Get current streak
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;

    // Get current streak count
    const streakQuery = `
      SELECT
        COUNT(DISTINCT activity_date) as total_active_days,
        COALESCE(MAX(streak_count), 0) as current_streak,
        SUM(CASE WHEN activity_type = 'practice' THEN activity_count ELSE 0 END) as total_questions,
        SUM(duration_minutes) as total_time_minutes,
        MAX(activity_date) as last_active
      FROM user_streaks
      WHERE user_id = ?
    `;

    const [streakData] = await db.query(streakQuery, [userId]);

    res.json({
      currentStreak: streakData[0]?.current_streak || 0,
      totalActiveDays: streakData[0]?.total_active_days || 0,
      totalQuestions: streakData[0]?.total_questions || 0,
      totalTimeMinutes: streakData[0]?.total_time_minutes || 0,
      lastActive: streakData[0]?.last_active || null,
    });
  } catch (error) {
    console.error('Error fetching current streak:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get monthly streaks
router.get('/monthly/:month/:year', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;
    const { month, year } = req.params;

    const monthQuery = `
      SELECT
        DAY(activity_date) as date,
        COALESCE(MAX(streak_count), 0) as streak_count,
        SUM(activity_count) as total_activities,
        SUM(duration_minutes) as duration_minutes
      FROM user_streaks
      WHERE user_id = ?
        AND MONTH(activity_date) = ?
        AND YEAR(activity_date) = ?
      GROUP BY DAY(activity_date)
      ORDER BY activity_date ASC
    `;

    const [monthData] = await db.query(monthQuery, [userId, month, year]);

    const streaksMap = {};
    monthData.forEach(row => {
      streaksMap[row.date] = {
        streak: row.streak_count,
        activities: row.total_activities,
        duration: row.duration_minutes,
      };
    });

    res.json(streaksMap);
  } catch (error) {
    console.error('Error fetching monthly streaks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all months with streaks
router.get('/months', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;

    const monthsQuery = `
      SELECT DISTINCT
        DATE_FORMAT(activity_date, '%B %Y') as month,
        DATE_FORMAT(activity_date, '%m') as month_num,
        DATE_FORMAT(activity_date, '%Y') as year
      FROM user_streaks
      WHERE user_id = ?
      ORDER BY activity_date DESC
    `;

    const [months] = await db.query(monthsQuery, [userId]);
    res.json(months);
  } catch (error) {
    console.error('Error fetching months:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific day details
router.get('/day/:date', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;
    const { date } = req.params; // Format: YYYY-MM-DD

    // Get streak info for the day
    const dayQuery = `
      SELECT
        activity_date,
        COALESCE(MAX(streak_count), 0) as streak_count,
        SUM(duration_minutes) as total_time_minutes,
        MAX(last_active_time) as last_active
      FROM user_streaks
      WHERE user_id = ? AND activity_date = ?
      GROUP BY activity_date
    `;

    const [dayData] = await db.query(dayQuery, [userId, date]);

    if (!dayData.length) {
      return res.status(404).json({ error: 'No activity found for this date' });
    }

    // Get activities breakdown
    const activitiesQuery = `
      SELECT
        activity_type,
        activity_count,
        duration_minutes,
        metadata
      FROM user_activities
      WHERE user_id = ? AND activity_date = ?
      ORDER BY created_at DESC
    `;

    const [activities] = await db.query(activitiesQuery, [userId, date]);

    // Get content viewed
    const contentQuery = `
      SELECT
        content_name,
        content_type
      FROM user_content_views
      WHERE user_id = ? AND DATE(viewed_at) = ?
      ORDER BY viewed_at DESC
    `;

    const [content] = await db.query(contentQuery, [userId, date]);

    res.json({
      date: dayData[0].activity_date,
      streak: dayData[0].streak_count,
      totalTime: dayData[0].total_time_minutes,
      lastActive: dayData[0].last_active,
      activities: activities.map(act => ({
        type: act.activity_type,
        count: act.activity_count,
        duration: act.duration_minutes,
        metadata: JSON.parse(act.metadata || '{}'),
      })),
      contentViewed: content.map(c => ({
        name: c.content_name,
        type: c.content_type,
      })),
    });
  } catch (error) {
    console.error('Error fetching day details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Log activity (called when user does something)
router.post('/log-activity', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;
    const { activityType, activityCount, durationMinutes, metadata } = req.body;

    const today = new Date().toISOString().split('T')[0];

    // Insert into user_activities
    const insertQuery = `
      INSERT INTO user_activities
      (user_id, activity_date, activity_type, activity_count, duration_minutes, metadata, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    await db.query(insertQuery, [
      userId,
      today,
      activityType,
      activityCount,
      durationMinutes,
      JSON.stringify(metadata || {}),
    ]);

    // Update streak
    const streakQuery = `
      INSERT INTO user_streaks
      (user_id, activity_date, streak_count, last_active_time, duration_minutes, activity_type, activity_count)
      VALUES (?, ?,
        (SELECT COALESCE(MAX(streak_count), 0) + 1 FROM user_streaks
         WHERE user_id = ? AND activity_date = DATE_SUB(?, INTERVAL 1 DAY)),
        NOW(), ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        activity_count = activity_count + ?,
        duration_minutes = duration_minutes + ?,
        last_active_time = NOW()
    `;

    await db.query(streakQuery, [
      userId, today, userId, today, durationMinutes, activityType, activityCount,
      activityCount, durationMinutes
    ]);

    res.json({ success: true, message: 'Activity logged' });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
