const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
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
      WHERE user_id = $1
    `;

    const streakResult = await db.pool.query(streakQuery, [userId]);
    const streakData = streakResult.rows;

    res.json({
      currentStreak: parseInt(streakData[0]?.current_streak) || 0,
      totalActiveDays: parseInt(streakData[0]?.total_active_days) || 0,
      totalQuestions: parseInt(streakData[0]?.total_questions) || 0,
      totalTimeMinutes: parseInt(streakData[0]?.total_time_minutes) || 0,
      lastActive: streakData[0]?.last_active || null,
    });
  } catch (error) {
    console.error('Error fetching current streak:', error.message, error.sql);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: error.sql
    });
  }
});

// Get monthly streaks - returns all dates in month with streak data
router.get('/monthly/:month/:year', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;
    const { month, year } = req.params;

    const monthQuery = `
      SELECT
        EXTRACT(DAY FROM activity_date)::int as date,
        COALESCE(streak_count, 0) as streak_count,
        COALESCE(activity_count, 0) as total_activities,
        COALESCE(duration_minutes, 0) as duration_minutes
      FROM user_streaks
      WHERE user_id = $1
        AND EXTRACT(MONTH FROM activity_date) = $2::int
        AND EXTRACT(YEAR FROM activity_date) = $3::int
      ORDER BY activity_date ASC
    `;

    const monthResult = await db.pool.query(monthQuery, [userId, month, year]);
    const monthData = monthResult.rows;

    // Create a map with all possible dates (1-31) initialized to 0
    const streaksMap = {};
    for (let date = 1; date <= 31; date++) {
      streaksMap[date] = { streak: 0, activities: 0, duration: 0 };
    }

    // Fill in actual data from database
    monthData.forEach(row => {
      streaksMap[row.date] = {
        streak: row.streak_count,
        activities: row.total_activities,
        duration: row.duration_minutes,
      };
    });

    res.json(streaksMap);
  } catch (error) {
    console.error('Error fetching monthly streaks:', error.message, error.sql);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: error.sql
    });
  }
});

// Get all months of current year (2026)
router.get('/months', authenticateToken, async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const months = [
      { month: 'January 2026', month_num: '01', year: '2026' },
      { month: 'February 2026', month_num: '02', year: '2026' },
      { month: 'March 2026', month_num: '03', year: '2026' },
      { month: 'April 2026', month_num: '04', year: '2026' },
      { month: 'May 2026', month_num: '05', year: '2026' },
      { month: 'June 2026', month_num: '06', year: '2026' },
      { month: 'July 2026', month_num: '07', year: '2026' },
      { month: 'August 2026', month_num: '08', year: '2026' },
      { month: 'September 2026', month_num: '09', year: '2026' },
      { month: 'October 2026', month_num: '10', year: '2026' },
      { month: 'November 2026', month_num: '11', year: '2026' },
      { month: 'December 2026', month_num: '12', year: '2026' },
    ];

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
        COALESCE(streak_count, 0) as streak_count,
        COALESCE(duration_minutes, 0) as total_time_minutes,
        last_active_time as last_active
      FROM user_streaks
      WHERE user_id = $1 AND activity_date = $2::date
      LIMIT 1
    `;

    const dayResult = await db.pool.query(dayQuery, [userId, date]);
    const dayData = dayResult.rows;

    // Get test attempts on that date
    const testsQuery = `
      SELECT
        ta.id,
        t.title as test_title,
        t.subject,
        ta.score,
        ta.accuracy,
        COALESCE(ea.correct_count, 0) as correct_count,
        COALESCE(ea.wrong_count, 0) as wrong_count,
        COALESCE(ea.unattempted_count, 0) as unattempted_count,
        ta.attempted_at
      FROM test_attempts ta
      JOIN tests t ON t.id = ta.test_id
      LEFT JOIN exam_analytics ea ON ea.user_id = ta.user_id AND ea.test_id = ta.test_id
      WHERE ta.user_id = $1 AND ta.attempted_at::date = $2::date
      ORDER BY ta.attempted_at DESC
    `;
    const testsResult = await db.pool.query(testsQuery, [userId, date]).catch(() => ({ rows: [] }));

    // Get practice attempts on that date
    const practiceQuery = `
      SELECT
        pa.id,
        ps.title as practice_title,
        ps.topic,
        pa.score,
        pa.accuracy,
        COALESCE(pa.correct_count, 0) as correct_count,
        COALESCE(pa.wrong_count, 0) as wrong_count,
        pa.attempted_at
      FROM practice_attempts pa
      JOIN practice_sets ps ON ps.id = pa.practice_set_id
      WHERE pa.user_id = $1 AND pa.attempted_at::date = $2::date
      ORDER BY pa.attempted_at DESC
    `;
    const practiceResult = await db.pool.query(practiceQuery, [userId, date]).catch(() => ({ rows: [] }));

    // Get activities breakdown
    const activitiesQuery = `
      SELECT
        activity_type,
        activity_count,
        duration_minutes
      FROM user_activities
      WHERE user_id = $1 AND activity_date = $2::date
      ORDER BY created_at DESC
    `;

    const activitiesResult = await db.pool.query(activitiesQuery, [userId, date]).catch(() => ({ rows: [] }));
    const activities = activitiesResult.rows;

    // Get content viewed
    const contentQuery = `
      SELECT
        content_name,
        content_type
      FROM user_content_views
      WHERE user_id = $1 AND viewed_at::date = $2::date
      ORDER BY viewed_at DESC
      LIMIT 20
    `;

    const contentResult = await db.pool.query(contentQuery, [userId, date]).catch(() => ({ rows: [] }));
    const content = contentResult.rows;

    // Compute total right and wrong
    let totalRight = 0;
    let totalWrong = 0;
    testsResult.rows.forEach(t => {
      totalRight += parseInt(t.correct_count) || 0;
      totalWrong += parseInt(t.wrong_count) || 0;
    });
    practiceResult.rows.forEach(p => {
      totalRight += parseInt(p.correct_count) || 0;
      totalWrong += parseInt(p.wrong_count) || 0;
    });

    res.json({
      date: date,
      streak: dayData[0]?.streak_count || 0,
      totalTime: dayData[0]?.total_time_minutes || 0,
      lastActive: dayData[0]?.last_active || null,
      totalRight: totalRight,
      totalWrong: totalWrong,
      tests: testsResult.rows.map(t => ({
        id: t.id,
        title: t.test_title || 'Mock Test',
        subject: t.subject || 'General',
        score: t.score,
        accuracy: t.accuracy,
        correctCount: parseInt(t.correct_count) || 0,
        wrongCount: parseInt(t.wrong_count) || 0,
        unattemptedCount: parseInt(t.unattempted_count) || 0,
        attemptedAt: t.attempted_at,
      })),
      practice: practiceResult.rows.map(p => ({
        id: p.id,
        title: p.practice_title || 'Practice Set',
        topic: p.topic || 'General',
        score: p.score,
        accuracy: p.accuracy,
        correctCount: parseInt(p.correct_count) || 0,
        wrongCount: parseInt(p.wrong_count) || 0,
        attemptedAt: p.attempted_at,
      })),
      activities: activities.map(act => ({
        type: act.activity_type,
        count: act.activity_count,
        duration: act.duration_minutes,
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
      (user_id, activity_date, activity_type, activity_count, duration_minutes, metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
    `;

    await db.pool.query(insertQuery, [
      userId,
      today,
      activityType,
      activityCount,
      durationMinutes,
      JSON.stringify(metadata || {}),
    ]);

    // Upsert streak (PostgreSQL style)
    const streakQuery = `
      INSERT INTO user_streaks
      (user_id, activity_date, streak_count, last_active_time, duration_minutes, activity_type, activity_count)
      VALUES (
        $1,
        $2,
        COALESCE((SELECT MAX(streak_count) FROM user_streaks
                  WHERE user_id = $1 AND activity_date = $2::date - INTERVAL '1 day'), 0) + 1,
        NOW(),
        $3,
        $4,
        $5
      )
      ON CONFLICT (user_id, activity_date) DO UPDATE SET
        activity_count = user_streaks.activity_count + $5,
        duration_minutes = user_streaks.duration_minutes + $3,
        last_active_time = NOW()
    `;

    await db.pool.query(streakQuery, [
      userId, today, durationMinutes, activityType, activityCount
    ]);

    res.json({ success: true, message: 'Activity logged' });
  } catch (error) {
    console.error('Error logging activity:', error.message, error.sql);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: error.sql
    });
  }
});

module.exports = router;
