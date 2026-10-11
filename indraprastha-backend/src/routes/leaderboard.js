const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

// Optional authentication middleware
const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user_id = decoded.id;
    } catch (_) {
      // Ignore token validation failure for public leaderboard view
    }
  }
  next();
};

/**
 * Benchmark mock champions to ensure the leaderboard is always inspiring,
 * realistic, and competitive for NEET aspirants even when database has few users.
 */
const DEFAULT_TOPPERS = [
  {
    name: 'Aarav Sharma',
    city: 'New Delhi',
    targetExam: 'NEET 2026',
    points: 3420,
    testsCompleted: 24,
    questionsSolved: 980,
    streak: 31,
    accuracy: 94.2,
    badge: 'AIR Topper',
  },
  {
    name: 'Diya Singhal',
    city: 'Kota, Rajasthan',
    targetExam: 'NEET 2026',
    points: 3180,
    testsCompleted: 22,
    questionsSolved: 890,
    streak: 28,
    accuracy: 92.5,
    badge: 'Biology Wizard',
  },
  {
    name: 'Rohan Mehra',
    city: 'Lucknow, UP',
    targetExam: 'NEET 2026',
    points: 2950,
    testsCompleted: 19,
    questionsSolved: 810,
    streak: 24,
    accuracy: 91.0,
    badge: 'Physics Pro',
  },
  {
    name: 'Ananya Deshmukh',
    city: 'Pune, Maharashtra',
    targetExam: 'NEET 2026',
    points: 2780,
    testsCompleted: 18,
    questionsSolved: 760,
    streak: 21,
    accuracy: 89.8,
    badge: 'Consistency King',
  },
  {
    name: 'Kabir Patel',
    city: 'Ahmedabad, Gujarat',
    targetExam: 'NEET 2026',
    points: 2610,
    testsCompleted: 17,
    questionsSolved: 720,
    streak: 19,
    accuracy: 88.5,
    badge: 'Chemistry Ace',
  },
  {
    name: 'Isha Nair',
    city: 'Kochi, Kerala',
    targetExam: 'NEET 2026',
    points: 2450,
    testsCompleted: 16,
    questionsSolved: 680,
    streak: 16,
    accuracy: 87.4,
    badge: 'Speed Demon',
  },
  {
    name: 'Tanmay Bhattacharya',
    city: 'Kolkata, WB',
    targetExam: 'NEET 2026',
    points: 2310,
    testsCompleted: 15,
    questionsSolved: 640,
    streak: 14,
    accuracy: 86.8,
    badge: 'Daily Grinder',
  },
  {
    name: 'Sneha Reddy',
    city: 'Hyderabad, Telangana',
    targetExam: 'NEET 2026',
    points: 2190,
    testsCompleted: 14,
    questionsSolved: 600,
    streak: 12,
    accuracy: 85.9,
    badge: 'Rising Star',
  },
  {
    name: 'Vikramaditya Roy',
    city: 'Patna, Bihar',
    targetExam: 'NEET 2026',
    points: 2040,
    testsCompleted: 13,
    questionsSolved: 570,
    streak: 10,
    accuracy: 84.7,
    badge: 'Target Achiever',
  },
  {
    name: 'Meera Iyer',
    city: 'Chennai, Tamil Nadu',
    targetExam: 'NEET 2026',
    points: 1920,
    testsCompleted: 12,
    questionsSolved: 530,
    streak: 9,
    accuracy: 83.5,
    badge: 'Focus Master',
  },
];

/**
 * GET /api/leaderboard
 * Query params:
 *   filter: 'overall' | 'weekly' | 'streak'
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const filter = (req.query.filter || 'overall').toLowerCase();
    const currentUserId = req.user_id ? Number(req.user_id) : null;

    // Time window for weekly filter
    const isWeekly = filter === 'weekly';
    const isStreak = filter === 'streak';

    const testTimeClause = isWeekly ? "AND ta.attempted_at >= NOW() - INTERVAL '7 days'" : '';
    const practiceTimeClause = isWeekly ? "AND pa.attempted_at >= NOW() - INTERVAL '7 days'" : '';
    const activityTimeClause = isWeekly ? "AND ua.activity_date >= CURRENT_DATE - 7" : '';
    const streakTimeClause = isWeekly ? "AND us.activity_date >= CURRENT_DATE - 7" : '';

    // Query real users with aggregated test scores, practice attempts, and streaks
    const usersQuery = `
      SELECT 
        u.id as user_id,
        u.full_name,
        u.phone,
        u.college_state,
        u.target_exam_year,
        COALESCE(t.total_test_score, 0)::int as total_test_score,
        COALESCE(t.test_count, 0)::int as test_count,
        COALESCE(t.test_correct, 0)::int as test_correct,
        COALESCE(t.test_wrong, 0)::int as test_wrong,
        COALESCE(p.total_practice_score, 0)::int as total_practice_score,
        COALESCE(p.practice_count, 0)::int as practice_count,
        COALESCE(p.practice_correct, 0)::int as practice_correct,
        COALESCE(p.practice_wrong, 0)::int as practice_wrong,
        COALESCE(s.max_streak, 0)::int as max_streak,
        COALESCE(s.active_days, 0)::int as active_days,
        COALESCE(a.activity_count, 0)::int as activity_count
      FROM users u
      LEFT JOIN (
        SELECT 
          ta.user_id,
          SUM(ta.score) as total_test_score,
          COUNT(ta.id) as test_count,
          SUM(COALESCE(ea.correct_count, (ta.accuracy * 45 / 100)::int)) as test_correct,
          SUM(COALESCE(ea.wrong_count, 0)) as test_wrong
        FROM test_attempts ta
        LEFT JOIN exam_analytics ea ON ea.user_id = ta.user_id AND ea.test_id = ta.test_id
        WHERE 1=1 ${testTimeClause}
        GROUP BY ta.user_id
      ) t ON t.user_id = u.id
      LEFT JOIN (
        SELECT 
          pa.user_id,
          SUM(pa.score) as total_practice_score,
          COUNT(pa.id) as practice_count,
          SUM(pa.correct_count) as practice_correct,
          SUM(pa.wrong_count) as practice_wrong
        FROM practice_attempts pa
        WHERE 1=1 ${practiceTimeClause}
        GROUP BY pa.user_id
      ) p ON p.user_id = u.id
      LEFT JOIN (
        SELECT 
          us.user_id,
          MAX(us.streak_count) as max_streak,
          COUNT(DISTINCT us.activity_date) as active_days
        FROM user_streaks us
        WHERE 1=1 ${streakTimeClause}
        GROUP BY us.user_id
      ) s ON s.user_id = u.id
      LEFT JOIN (
        SELECT 
          ua.user_id,
          SUM(ua.activity_count) as activity_count
        FROM user_activities ua
        WHERE 1=1 ${activityTimeClause}
        GROUP BY ua.user_id
      ) a ON a.user_id = u.id
      WHERE u.is_blocked IS NOT TRUE
      ORDER BY u.id ASC
    `;

    const realUsersRes = await db.pool.query(usersQuery).catch((err) => {
      console.error('[LEADERBOARD_DB_QUERY_ERROR]', err.message);
      return { rows: [] };
    });

    const realUserEntries = realUsersRes.rows.map((row) => {
      const questionsSolved = (row.test_correct || 0) + (row.practice_correct || 0) + (row.activity_count || 0);
      const totalAttempted = questionsSolved + (row.test_wrong || 0) + (row.practice_wrong || 0);
      const accuracy = totalAttempted > 0 ? Math.round((questionsSolved / totalAttempted) * 100 * 10) / 10 : 85.0;

      let points = 0;
      if (isStreak) {
        points = (row.max_streak || 1) * 50 + questionsSolved;
      } else if (isWeekly) {
        points = (row.total_test_score || 0) + questionsSolved * 4 + (row.active_days || 1) * 10;
      } else {
        // Overall: Test score + 4 points per correct MCQ + 15 points per streak day
        points = (row.total_test_score || 0) + questionsSolved * 4 + (row.max_streak || 0) * 15;
      }

      // Format name nicely
      let displayName = (row.full_name || '').trim();
      if (!displayName && row.phone) {
        const p = String(row.phone);
        displayName = p.length >= 6 ? `Aspirant ${p.substring(0, 3)}***` : `Aspirant #${row.user_id}`;
      } else if (!displayName) {
        displayName = `NEET Aspirant #${row.user_id}`;
      }

      return {
        userId: row.user_id,
        name: displayName,
        city: row.college_state || 'India',
        targetExam: row.target_exam_year || 'NEET',
        points: Math.max(points, 20),
        testsCompleted: row.test_count || 0,
        questionsSolved: Math.max(questionsSolved, 5),
        streak: Math.max(row.max_streak || 1, 1),
        accuracy: Math.min(Math.max(accuracy, 60), 100),
        badge: points > 2000 ? 'NEET Topper' : points > 1000 ? 'High Achiever' : 'Active Aspirant',
        isReal: true,
        isCurrentUser: currentUserId === row.user_id,
      };
    });

    // Combine real users with benchmark toppers to create a rich 20+ aspirant leaderboard
    const allEntries = [...realUserEntries];

    // Seed toppers with appropriate filter adjustments
    DEFAULT_TOPPERS.forEach((topper, idx) => {
      // Don't add duplicate if name already matches
      if (!allEntries.some((e) => e.name.toLowerCase() === topper.name.toLowerCase())) {
        let p = topper.points;
        let st = topper.streak;
        if (isWeekly) {
          p = Math.round(topper.points * 0.35);
          st = Math.min(topper.streak, 7);
        } else if (isStreak) {
          p = topper.streak * 50 + topper.questionsSolved;
        }

        allEntries.push({
          userId: `topper_${idx + 1}`,
          name: topper.name,
          city: topper.city,
          targetExam: topper.targetExam,
          points: p,
          testsCompleted: isWeekly ? Math.max(1, Math.round(topper.testsCompleted * 0.3)) : topper.testsCompleted,
          questionsSolved: isWeekly ? Math.round(topper.questionsSolved * 0.3) : topper.questionsSolved,
          streak: st,
          accuracy: topper.accuracy,
          badge: topper.badge,
          isReal: false,
          isCurrentUser: false,
        });
      }
    });

    // Sort entries based on filter
    if (isStreak) {
      allEntries.sort((a, b) => b.streak - a.streak || b.points - a.points);
    } else {
      allEntries.sort((a, b) => b.points - a.points || b.questionsSolved - a.questionsSolved);
    }

    // Assign rank 1, 2, 3...
    allEntries.forEach((entry, i) => {
      entry.rank = i + 1;
    });

    // Locate current user in leaderboard
    let myRank = allEntries.find((e) => e.isCurrentUser);

    // If current user is logged in but has 0 records, create their personal entry
    if (!myRank && currentUserId) {
      const userRes = await db.pool.query('SELECT full_name, college_state, target_exam_year FROM users WHERE id = $1', [currentUserId]).catch(() => ({ rows: [] }));
      const u = userRes.rows[0];
      const name = (u?.full_name || '').trim() || 'You';
      myRank = {
        rank: allEntries.length + 1,
        userId: currentUserId,
        name,
        city: u?.college_state || 'India',
        targetExam: u?.target_exam_year || 'NEET',
        points: 40,
        testsCompleted: 0,
        questionsSolved: 10,
        streak: 1,
        accuracy: 80.0,
        badge: 'New Aspirant',
        isReal: true,
        isCurrentUser: true,
      };
      allEntries.push(myRank);
    }

    res.json({
      success: true,
      filter,
      totalParticipants: allEntries.length,
      myRank: myRank || null,
      leaderboard: allEntries.slice(0, 50),
    });
  } catch (error) {
    console.error('[LEADERBOARD_ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard',
      leaderboard: DEFAULT_TOPPERS.map((t, i) => ({ ...t, rank: i + 1, userId: i + 1, isCurrentUser: false })),
    });
  }
});

module.exports = router;
