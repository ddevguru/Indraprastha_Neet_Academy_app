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

/**
 * Helper to record user activity & update daily streak automatically
 */
async function recordUserStreakActivity(pool, userId, { activityType, activityCount = 1, durationMinutes = 10, metadata = {} }) {
  if (!userId) return;
  const today = new Date().toISOString().split('T')[0];
  const safeCount = Number(activityCount) || 1;
  const safeDuration = Number(durationMinutes) || 10;

  // 1. Insert into user_activities
  await pool.query(
    `INSERT INTO user_activities (user_id, activity_date, activity_type, activity_count, duration_minutes, metadata)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [userId, today, activityType || 'practice', safeCount, safeDuration, JSON.stringify(metadata || {})]
  ).catch(e => console.error('[STREAK_ACTIVITY_INSERT_ERROR]', e.message));

  // 2. Calculate streak count: find last active date before today
  const lastStreakRes = await pool.query(
    `SELECT activity_date, streak_count FROM user_streaks
     WHERE user_id = $1
     ORDER BY activity_date DESC LIMIT 1`,
    [userId]
  ).catch(() => ({ rows: [] }));

  let newStreak = 1;
  if (lastStreakRes.rows.length > 0) {
    const lastDateStr = new Date(lastStreakRes.rows[0].activity_date).toISOString().split('T')[0];
    const lastStreak = lastStreakRes.rows[0].streak_count || 1;

    if (lastDateStr === today) {
      newStreak = lastStreak;
    } else {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDateStr === yesterday) {
        newStreak = lastStreak + 1;
      } else {
        newStreak = 1;
      }
    }
  }

  // 3. Upsert user_streaks
  await pool.query(
    `INSERT INTO user_streaks (user_id, activity_date, streak_count, last_active_time, duration_minutes, activity_type, activity_count)
     VALUES ($1, $2, $3, NOW(), $4, $5, $6)
     ON CONFLICT (user_id, activity_date) DO UPDATE SET
       activity_count = user_streaks.activity_count + EXCLUDED.activity_count,
       duration_minutes = user_streaks.duration_minutes + EXCLUDED.duration_minutes,
       streak_count = GREATEST(user_streaks.streak_count, EXCLUDED.streak_count),
       last_active_time = NOW()`,
    [userId, today, newStreak, safeDuration, activityType || 'practice', safeCount]
  ).catch(e => console.error('[STREAK_UPSERT_ERROR]', e.message));
}

// Get current streak & overall metrics
router.get('/current', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;

    // 1. Get distinct activity dates to compute true current streak and total active days
    const datesRes = await db.pool.query(
      `SELECT DISTINCT activity_date::text as adate FROM (
         SELECT activity_date FROM user_streaks WHERE user_id = $1
         UNION
         SELECT attempted_at::date as activity_date FROM test_attempts WHERE user_id = $1
         UNION
         SELECT attempted_at::date as activity_date FROM practice_attempts WHERE user_id = $1
         UNION
         SELECT activity_date FROM user_activities WHERE user_id = $1
       ) t ORDER BY adate DESC`,
      [userId]
    );

    const activeDates = datesRes.rows.map(r => r.adate);
    const totalActiveDays = activeDates.length;

    // Compute active consecutive streak ending today or yesterday
    let currentStreak = 0;
    if (activeDates.length > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      const latestDate = activeDates[0];
      if (latestDate === todayStr || latestDate === yesterdayStr) {
        currentStreak = 1;
        let prevDate = new Date(latestDate);
        for (let i = 1; i < activeDates.length; i++) {
          const currDate = new Date(activeDates[i]);
          const diffDays = Math.round((prevDate - currDate) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentStreak++;
            prevDate = currDate;
          } else {
            break;
          }
        }
      }
    }

    // 2. Compute total questions, correct, wrong, and time
    const testStatsRes = await db.pool.query(
      `SELECT
         COALESCE(SUM(ea.correct_count), 0)::int as correct_count,
         COALESCE(SUM(ea.wrong_count), 0)::int as wrong_count,
         COALESCE(SUM(ea.unattempted_count), 0)::int as unattempted_count,
         COUNT(ta.id)::int as test_count
       FROM test_attempts ta
       LEFT JOIN exam_analytics ea ON ea.user_id = ta.user_id AND ea.test_id = ta.test_id
       WHERE ta.user_id = $1`,
      [userId]
    );

    const practiceStatsRes = await db.pool.query(
      `SELECT
         COALESCE(SUM(correct_count), 0)::int as correct_count,
         COALESCE(SUM(wrong_count), 0)::int as wrong_count,
         COUNT(id)::int as practice_count
       FROM practice_attempts
       WHERE user_id = $1`,
      [userId]
    );

    const activityStatsRes = await db.pool.query(
      `SELECT
         COALESCE(SUM(activity_count), 0)::int as total_activity_count,
         COALESCE(SUM(duration_minutes), 0)::int as total_duration
       FROM user_activities
       WHERE user_id = $1`,
      [userId]
    );

    const tStats = testStatsRes.rows[0] || {};
    const pStats = practiceStatsRes.rows[0] || {};
    const aStats = activityStatsRes.rows[0] || {};

    const totalRight = (tStats.correct_count || 0) + (pStats.correct_count || 0);
    const totalWrong = (tStats.wrong_count || 0) + (pStats.wrong_count || 0);
    const totalQuestions = totalRight + totalWrong + (tStats.unattempted_count || 0) + (aStats.total_activity_count || 0);
    const totalTimeMinutes = (aStats.total_duration || 0) + ((tStats.test_count || 0) * 30) + ((pStats.practice_count || 0) * 15);
    const lastActive = activeDates.length > 0 ? activeDates[0] : null;

    res.json({
      currentStreak,
      totalActiveDays,
      totalQuestions,
      totalRight,
      totalWrong,
      totalTimeMinutes,
      lastActive,
    });
  } catch (error) {
    console.error('Error fetching current streak:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get monthly streaks - returns all dates in month with streak data
router.get('/monthly/:month/:year', authenticateToken, async (req, res) => {
  try {
    const userId = req.user_id;
    const { month, year } = req.params;

    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    const streaksMap = {};
    for (let date = 1; date <= 31; date++) {
      streaksMap[date] = { streak: 0, activities: 0, duration: 0 };
    }

    const monthQuery = `
      SELECT
        EXTRACT(DAY FROM activity_date)::int as date,
        COALESCE(MAX(streak_count), 1) as streak_count,
        COALESCE(SUM(activity_count), 1) as total_activities,
        COALESCE(SUM(duration_minutes), 15) as duration_minutes
      FROM (
        SELECT activity_date, streak_count, activity_count, duration_minutes FROM user_streaks WHERE user_id = $1
        UNION ALL
        SELECT attempted_at::date as activity_date, 1 as streak_count, 10 as activity_count, 30 as duration_minutes FROM test_attempts WHERE user_id = $1
        UNION ALL
        SELECT attempted_at::date as activity_date, 1 as streak_count, (correct_count + wrong_count) as activity_count, 15 as duration_minutes FROM practice_attempts WHERE user_id = $1
        UNION ALL
        SELECT activity_date, 1 as streak_count, activity_count, duration_minutes FROM user_activities WHERE user_id = $1
      ) combined
      WHERE EXTRACT(MONTH FROM activity_date) = $2::int
        AND EXTRACT(YEAR FROM activity_date) = $3::int
      GROUP BY EXTRACT(DAY FROM activity_date)
    `;

    const monthResult = await db.pool.query(monthQuery, [userId, monthNum, yearNum]);
    monthResult.rows.forEach(row => {
      if (row.date >= 1 && row.date <= 31) {
        streaksMap[row.date] = {
          streak: parseInt(row.streak_count) || 1,
          activities: parseInt(row.total_activities) || 1,
          duration: parseInt(row.duration_minutes) || 15,
        };
      }
    });

    res.json(streaksMap);
  } catch (error) {
    console.error('Error fetching monthly streaks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all months of current year (2026)
router.get('/months', authenticateToken, async (req, res) => {
  try {
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

    const dayResult = await db.pool.query(
      `SELECT streak_count, duration_minutes, last_active_time
       FROM user_streaks
       WHERE user_id = $1 AND activity_date = $2::date
       LIMIT 1`,
      [userId, date]
    ).catch(() => ({ rows: [] }));

    const testsResult = await db.pool.query(
      `SELECT
         ta.id,
         t.title as test_title,
         t.subject,
         ta.score,
         ta.accuracy,
         COALESCE(ea.correct_count, 0)::int as correct_count,
         COALESCE(ea.wrong_count, 0)::int as wrong_count,
         COALESCE(ea.unattempted_count, 0)::int as unattempted_count,
         ta.attempted_at
       FROM test_attempts ta
       JOIN tests t ON t.id = ta.test_id
       LEFT JOIN exam_analytics ea ON ea.user_id = ta.user_id AND ea.test_id = ta.test_id
       WHERE ta.user_id = $1 AND ta.attempted_at::date = $2::date
       ORDER BY ta.attempted_at DESC`,
      [userId, date]
    ).catch(() => ({ rows: [] }));

    const practiceResult = await db.pool.query(
      `SELECT
         pa.id,
         ps.title as practice_title,
         ps.topic,
         pa.score,
         pa.accuracy,
         COALESCE(pa.correct_count, 0)::int as correct_count,
         COALESCE(pa.wrong_count, 0)::int as wrong_count,
         pa.attempted_at
       FROM practice_attempts pa
       JOIN practice_sets ps ON ps.id = pa.practice_set_id
       WHERE pa.user_id = $1 AND pa.attempted_at::date = $2::date
       ORDER BY pa.attempted_at DESC`,
      [userId, date]
    ).catch(() => ({ rows: [] }));

    const activitiesResult = await db.pool.query(
      `SELECT activity_type, activity_count, duration_minutes, metadata
       FROM user_activities
       WHERE user_id = $1 AND activity_date = $2::date
       ORDER BY created_at DESC`,
      [userId, date]
    ).catch(() => ({ rows: [] }));

    const contentResult = await db.pool.query(
      `SELECT content_name, content_type
       FROM user_content_views
       WHERE user_id = $1 AND viewed_at::date = $2::date
       ORDER BY viewed_at DESC
       LIMIT 20`,
      [userId, date]
    ).catch(() => ({ rows: [] }));

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

    activitiesResult.rows.forEach(act => {
      if (act.metadata) {
        try {
          const meta = typeof act.metadata === 'string' ? JSON.parse(act.metadata) : act.metadata;
          if (meta.correctCount) totalRight += parseInt(meta.correctCount) || 0;
          if (meta.wrongCount) totalWrong += parseInt(meta.wrongCount) || 0;
        } catch (_) {}
      }
    });

    let totalTime = dayResult.rows[0]?.duration_minutes || 0;
    if (totalTime === 0) {
      activitiesResult.rows.forEach(act => {
        totalTime += parseInt(act.duration_minutes) || 0;
      });
      totalTime += (testsResult.rows.length * 30) + (practiceResult.rows.length * 15);
    }

    res.json({
      date,
      streak: dayResult.rows[0]?.streak_count || (testsResult.rows.length + practiceResult.rows.length + activitiesResult.rows.length > 0 ? 1 : 0),
      totalTime,
      lastActive: dayResult.rows[0]?.last_active_time || 'Active',
      totalRight,
      totalWrong,
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
      activities: activitiesResult.rows.map(act => ({
        type: act.activity_type,
        count: act.activity_count,
        duration: act.duration_minutes,
      })),
      contentViewed: contentResult.rows.map(c => ({
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

    await recordUserStreakActivity(db.pool, userId, {
      activityType,
      activityCount,
      durationMinutes,
      metadata,
    });

    res.json({ success: true, message: 'Activity logged' });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
module.exports.recordUserStreakActivity = recordUserStreakActivity;
