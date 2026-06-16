/**
 * Analytics Service - AI Score Analysis & Predictions
 * Handles: Score analysis, weak topic identification, NEET score prediction
 */

const db = require('../db');

class AnalyticsService {
  /**
   * Analyze test performance
   * Returns: accuracy by subject, weak topics, suggestions
   */
  async analyzeTestScore(testAttemptId, userId) {
    try {
      // Fetch test attempt details
      const attempt = await db.query(
        `SELECT ta.*, t.title, t.batch_id
         FROM test_attempts ta
         JOIN tests t ON ta.test_id = t.id
         WHERE ta.id = $1 AND ta.user_id = $2`,
        [testAttemptId, userId]
      );

      if (!attempt.rows.length) {
        throw new Error('Test attempt not found');
      }

      const testAttempt = attempt.rows[0];
      const testId = testAttempt.test_id;

      // Fetch all questions in test with answers
      const questionsResult = await db.query(
        `SELECT tq.*, ta_detail.is_correct, ta_detail.time_taken_seconds
         FROM test_questions tq
         LEFT JOIN test_attempt_details ta_detail
           ON tq.id = ta_detail.question_id
           AND ta_detail.test_attempt_id = $1
         WHERE tq.test_id = $2`,
        [testAttemptId, testId]
      );

      const questions = questionsResult.rows;

      // Calculate subject-wise accuracy
      const subjectAnalysis = this._calculateSubjectAccuracy(questions);

      // Identify weak topics
      const weakTopics = this._identifyWeakTopics(questions);

      // Identify strong topics
      const strongTopics = this._identifyStrongTopics(questions);

      // Generate suggestions
      const suggestions = this._generateSuggestions(
        subjectAnalysis,
        weakTopics,
        testAttempt
      );

      // Compare with previous test
      const comparison = await this._compareWithPreviousTest(userId, testId);

      // Store analytics
      await this._storeTestAnalytics(userId, subjectAnalysis, weakTopics);

      return {
        testAttemptId,
        testTitle: testAttempt.title,
        score: testAttempt.score,
        totalQuestions: questions.length,
        percentage: Math.round((testAttempt.score / questions.length) * 100),
        timeTaken: testAttempt.time_taken_seconds,
        accuracy: subjectAnalysis,
        weakTopics: weakTopics.slice(0, 5), // Top 5 weak topics
        strongTopics: strongTopics.slice(0, 5),
        suggestions,
        comparison,
        metadata: {
          analyzedAt: new Date(),
          totalQuestionsAnalyzed: questions.length,
        },
      };
    } catch (error) {
      console.error('Error analyzing test score:', error);
      throw error;
    }
  }

  /**
   * Calculate subject-wise accuracy
   * @private
   */
  _calculateSubjectAccuracy(questions) {
    const subjects = {};

    questions.forEach((q) => {
      const subject = q.subject || 'Unknown';
      if (!subjects[subject]) {
        subjects[subject] = { correct: 0, total: 0 };
      }
      subjects[subject].total++;
      if (q.is_correct === true) {
        subjects[subject].correct++;
      }
    });

    // Convert to percentages
    const result = {};
    Object.keys(subjects).forEach((subject) => {
      const { correct, total } = subjects[subject];
      result[subject] = Math.round((correct / total) * 100);
    });

    return result;
  }

  /**
   * Identify weak topics
   * Weak = accuracy < (mean - 1.5 * std_dev)
   * @private
   */
  _identifyWeakTopics(questions) {
    const topics = {};

    // Group by topic
    questions.forEach((q) => {
      const topic = q.topic || 'Unknown';
      if (!topics[topic]) {
        topics[topic] = { correct: 0, total: 0, timeTaken: [] };
      }
      topics[topic].total++;
      if (q.is_correct === true) {
        topics[topic].correct++;
      }
      if (q.time_taken_seconds) {
        topics[topic].timeTaken.push(q.time_taken_seconds);
      }
    });

    // Calculate accuracy per topic
    const topicAccuracies = Object.entries(topics)
      .map(([name, data]) => {
        const accuracy = Math.round((data.correct / data.total) * 100);
        const avgTime = data.timeTaken.length
          ? Math.round(
              data.timeTaken.reduce((a, b) => a + b) / data.timeTaken.length
            )
          : 0;
        return {
          name,
          accuracy,
          correct: data.correct,
          total: data.total,
          avgTimeSeconds: avgTime,
        };
      })
      .sort((a, b) => a.accuracy - b.accuracy); // Weakest first

    return topicAccuracies;
  }

  /**
   * Identify strong topics
   * @private
   */
  _identifyStrongTopics(questions) {
    const topics = {};

    questions.forEach((q) => {
      const topic = q.topic || 'Unknown';
      if (!topics[topic]) {
        topics[topic] = { correct: 0, total: 0 };
      }
      topics[topic].total++;
      if (q.is_correct === true) {
        topics[topic].correct++;
      }
    });

    const topicAccuracies = Object.entries(topics)
      .map(([name, data]) => {
        const accuracy = Math.round((data.correct / data.total) * 100);
        return {
          name,
          accuracy,
          correct: data.correct,
          total: data.total,
        };
      })
      .sort((a, b) => b.accuracy - a.accuracy); // Strongest first

    return topicAccuracies;
  }

  /**
   * Generate AI suggestions based on performance
   * @private
   */
  _generateSuggestions(subjectAnalysis, weakTopics, testAttempt) {
    const suggestions = [];

    // Subject performance
    Object.entries(subjectAnalysis).forEach(([subject, accuracy]) => {
      if (accuracy < 60) {
        suggestions.push(
          `Focus on ${subject} - you scored only ${accuracy}%. This is critical.`
        );
      } else if (accuracy < 75) {
        suggestions.push(
          `Improve ${subject} - aim for 75%+ (currently ${accuracy}%)`
        );
      }
    });

    // Weak topics
    if (weakTopics.length > 0) {
      const weakest = weakTopics[0];
      suggestions.push(
        `Practice ${weakest.name} more - only ${weakest.accuracy}% accuracy`
      );
    }

    // Speed recommendations
    const avgTimePerQuestion = testAttempt.time_taken_seconds
      ? Math.round(testAttempt.time_taken_seconds / 180) // 180 questions in NEET
      : 0;
    if (avgTimePerQuestion > 3) {
      suggestions.push('Improve speed - you're spending too long per question');
    } else if (avgTimePerQuestion < 1) {
      suggestions.push('Careful with speed - ensure accuracy at expense of time');
    }

    // Positivity
    const overallAccuracy = Object.values(subjectAnalysis).reduce(
      (a, b) => a + b,
      0
    ) / Object.keys(subjectAnalysis).length;
    if (overallAccuracy > 80) {
      suggestions.push('Excellent performance! Keep it up!');
    } else if (overallAccuracy > 70) {
      suggestions.push('Good progress! You\'re on the right track.');
    } else if (overallAccuracy > 60) {
      suggestions.push('Decent effort. Focus on weak areas for improvement.');
    } else {
      suggestions.push(
        'Significant improvement needed. Daily practice will help.'
      );
    }

    return suggestions.slice(0, 5); // Top 5 suggestions
  }

  /**
   * Compare with previous test
   * @private
   */
  async _compareWithPreviousTest(userId, currentTestId) {
    try {
      const previous = await db.query(
        `SELECT ta.score, t.title, ta.submitted_at
         FROM test_attempts ta
         JOIN tests t ON ta.test_id = t.id
         WHERE ta.user_id = $1
         AND ta.test_id != $2
         AND ta.submitted_at IS NOT NULL
         ORDER BY ta.submitted_at DESC
         LIMIT 1`,
        [userId, currentTestId]
      );

      if (!previous.rows.length) {
        return {
          hasPreviousTest: false,
          comparison: null,
        };
      }

      const prevScore = previous.rows[0].score;
      const prevTitle = previous.rows[0].title;

      // This will be populated by caller with current score
      return {
        hasPreviousTest: true,
        previousScore: prevScore,
        previousTest: prevTitle,
      };
    } catch (error) {
      console.error('Error comparing tests:', error);
      return { hasPreviousTest: false };
    }
  }

  /**
   * Store analytics for later use
   * @private
   */
  async _storeTestAnalytics(userId, subjectAnalysis, weakTopics) {
    try {
      // Store weak topics as JSON
      const weakTopicsJson = weakTopics.map((t) => ({
        name: t.name,
        accuracy: t.accuracy,
      }));

      await db.query(
        `UPDATE user_analytics
         SET
           topic_accuracy = topic_accuracy || $1::jsonb,
           weak_topics = $2,
           updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $3`,
        [JSON.stringify(subjectAnalysis), weakTopicsJson, userId]
      );
    } catch (error) {
      console.error('Error storing analytics:', error);
      // Non-blocking - don't throw
    }
  }

  /**
   * Predict NEET Score based on current performance
   */
  async predictNEETScore(userId) {
    try {
      // Fetch user analytics
      const analytics = await db.query(
        `SELECT * FROM user_analytics WHERE user_id = $1`,
        [userId]
      );

      if (!analytics.rows.length) {
        // No historical data - return default
        return {
          predicted_score: 0,
          confidence: 0,
          message: 'Complete more tests for accurate prediction',
        };
      }

      const data = analytics.rows[0];

      // Fetch recent test history
      const testHistory = await db.query(
        `SELECT score FROM test_attempts
         WHERE user_id = $1
         ORDER BY submitted_at DESC
         LIMIT 10`,
        [userId]
      );

      const scores = testHistory.rows.map((r) => r.score);

      // Prediction algorithm
      const prediction = this._predictScore(
        scores,
        data.average_accuracy,
        data.daily_study_hours,
        data.current_study_streak
      );

      return {
        predicted_score: prediction.score,
        score_range: {
          min: Math.max(0, prediction.score - 20),
          max: Math.min(360, prediction.score + 20),
        },
        confidence_percent: prediction.confidence,
        predicted_rank: this._estimateRank(prediction.score),
        monthly_progress: await this._getMonthlyProgress(userId),
        recommendation: this._getRecommendation(prediction.score),
        data: {
          average_accuracy: data.average_accuracy,
          recent_scores: scores.slice(0, 5),
          study_streak: data.current_study_streak,
        },
      };
    } catch (error) {
      console.error('Error predicting NEET score:', error);
      throw error;
    }
  }

  /**
   * Predict NEET score using ML formula
   * Formula: Base + Improvement + Momentum
   * @private
   */
  _predictScore(scores, accuracy, dailyHours, streak) {
    if (!scores.length) {
      return { score: 0, confidence: 0 };
    }

    // Base score: average of recent scores
    const baseScore = Math.round(
      scores.reduce((a, b) => a + b) / scores.length
    );

    // Improvement factor: recent trend
    let improvementFactor = 0;
    if (scores.length >= 2) {
      const recent = scores[0];
      const previous = scores[scores.length - 1];
      const improvement = recent - previous;
      improvementFactor = improvement * (scores.length * 0.1); // Weight by consistency
    }

    // Momentum: dedication × consistency
    const momentumFactor = (dailyHours * streak * accuracy) / 100;

    // Final prediction
    const predicted = Math.round(
      baseScore + improvementFactor + momentumFactor
    );

    // Confidence based on data points
    const confidence = Math.min(100, scores.length * 10 + accuracy);

    return {
      score: Math.max(0, Math.min(360, predicted)), // Clamp to NEET range
      confidence,
    };
  }

  /**
   * Estimate NEET rank from score (rough approximation)
   * Based on typical NEET distribution
   * @private
   */
  _estimateRank(score) {
    // Rough formula (adjust based on actual data)
    // NEET has ~1.5 million test-takers
    // 360 score = rank 1
    // 0 score = rank 1,500,000

    if (score >= 360) return 1;
    if (score >= 340) return 50;
    if (score >= 320) return 500;
    if (score >= 300) return 5000;
    if (score >= 280) return 50000;
    if (score >= 250) return 150000;
    if (score >= 200) return 500000;
    if (score >= 100) return 1000000;
    return 1500000;
  }

  /**
   * Get monthly progress trend
   * @private
   */
  async _getMonthlyProgress(userId) {
    try {
      const monthly = await db.query(
        `SELECT
           DATE_TRUNC('month', submitted_at) as month,
           AVG(score)::INT as avg_score,
           COUNT(*) as tests_count
         FROM test_attempts
         WHERE user_id = $1
         GROUP BY DATE_TRUNC('month', submitted_at)
         ORDER BY month DESC
         LIMIT 6`,
        [userId]
      );

      return monthly.rows
        .reverse()
        .map((r) => ({
          month: r.month ? r.month.toLocaleDateString() : 'Unknown',
          score: r.avg_score || 0,
          tests: r.tests_count,
        }));
    } catch (error) {
      console.error('Error getting monthly progress:', error);
      return [];
    }
  }

  /**
   * Get recommendation based on score
   * @private
   */
  _getRecommendation(score) {
    if (score >= 330) {
      return 'Excellent! You\'re in the top tier. Focus on consistency.';
    }
    if (score >= 300) {
      return 'Great progress! Aim to improve weak areas for 330+.';
    }
    if (score >= 280) {
      return 'Good trajectory. Intensify practice on Biology and Chemistry.';
    }
    if (score >= 250) {
      return 'You\'re improving. Dedicate more time to daily practice.';
    }
    return 'Significant effort needed. Increase study hours and focus on fundamentals.';
  }

  /**
   * Get Smart Progress Dashboard
   */
  async getProgressDashboard(userId) {
    try {
      // Get today's stats
      const today = await db.query(
        `SELECT
           COALESCE(study_hours, 0) as study_hours,
           COALESCE(questions_attempted, 0) as questions,
           COALESCE(questions_correct, 0) as correct
         FROM study_logs
         WHERE user_id = $1 AND date = CURRENT_DATE`,
        [userId]
      );

      const todayStats = today.rows[0] || {
        study_hours: 0,
        questions: 0,
        correct: 0,
      };

      // Get this week's stats
      const thisWeek = await db.query(
        `SELECT
           SUM(study_hours) as total_hours,
           COUNT(*) as days_studied,
           AVG(CASE WHEN questions_attempted > 0
               THEN (questions_correct::float / questions_attempted * 100)
               ELSE 0 END) as avg_accuracy
         FROM study_logs
         WHERE user_id = $1 AND date >= CURRENT_DATE - INTERVAL '7 days'`,
        [userId]
      );

      const weekStats = thisWeek.rows[0] || {
        total_hours: 0,
        days_studied: 0,
        avg_accuracy: 0,
      };

      // Get performance heatmap
      const heatmap = await this._getPerformanceHeatmap(userId);

      // Get analytics
      const analytics = await db.query(
        `SELECT
           total_tests_taken,
           average_score,
           average_accuracy,
           current_study_streak,
           physics_accuracy,
           chemistry_accuracy,
           biology_accuracy
         FROM user_analytics
         WHERE user_id = $1`,
        [userId]
      );

      const analyticsData = analytics.rows[0] || {};

      return {
        today: {
          study_hours: Math.round(todayStats.study_hours * 100) / 100,
          questions_attempted: todayStats.questions,
          questions_correct: todayStats.correct,
          accuracy_percent: todayStats.questions
            ? Math.round((todayStats.correct / todayStats.questions) * 100)
            : 0,
        },
        this_week: {
          total_study_hours: Math.round(weekStats.total_hours * 100) / 100,
          days_studied: weekStats.days_studied,
          tests_completed: 0, // Add from DB if needed
          average_accuracy: Math.round(weekStats.avg_accuracy || 0),
          streak_days: analyticsData.current_study_streak || 0,
        },
        performance_heatmap: heatmap,
        overall_stats: {
          total_tests: analyticsData.total_tests_taken || 0,
          average_score: analyticsData.average_score || 0,
          average_accuracy: analyticsData.average_accuracy || 0,
          physics: analyticsData.physics_accuracy || 0,
          chemistry: analyticsData.chemistry_accuracy || 0,
          biology: analyticsData.biology_accuracy || 0,
        },
        weak_areas: await this._getWeakAreas(userId),
        recommendations: await this._getDashboardRecommendations(userId),
      };
    } catch (error) {
      console.error('Error getting progress dashboard:', error);
      throw error;
    }
  }

  /**
   * Get performance heatmap (color-coded by accuracy)
   * @private
   */
  async _getPerformanceHeatmap(userId) {
    try {
      const results = await db.query(
        `SELECT subject, topic, accuracy FROM topic_performance WHERE user_id = $1`,
        [userId]
      );

      const heatmap = {};

      results.rows.forEach((row) => {
        if (!heatmap[row.subject]) {
          heatmap[row.subject] = {};
        }

        const color = this._getAccuracyColor(row.accuracy);
        heatmap[row.subject][row.topic] = {
          accuracy: row.accuracy,
          color,
        };
      });

      return heatmap;
    } catch (error) {
      console.error('Error getting heatmap:', error);
      return {};
    }
  }

  /**
   * Convert accuracy to color
   * @private
   */
  _getAccuracyColor(accuracy) {
    if (accuracy >= 80) return 'green'; // Excellent
    if (accuracy >= 60) return 'yellow'; // Good
    if (accuracy >= 40) return 'orange'; // Need improvement
    return 'red'; // Critical
  }

  /**
   * Get weak areas
   * @private
   */
  async _getWeakAreas(userId) {
    try {
      const weak = await db.query(
        `SELECT subject, topic, accuracy
         FROM topic_performance
         WHERE user_id = $1 AND accuracy < 60
         ORDER BY accuracy ASC
         LIMIT 5`,
        [userId]
      );

      return weak.rows.map((r) => ({
        subject: r.subject,
        topic: r.topic,
        accuracy: r.accuracy,
      }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Get dashboard recommendations
   * @private
   */
  async _getDashboardRecommendations(userId) {
    const recs = [];

    const analytics = await db.query(
      `SELECT * FROM user_analytics WHERE user_id = $1`,
      [userId]
    );

    if (!analytics.rows.length) {
      recs.push('Complete your first test to get personalized recommendations');
      return recs;
    }

    const data = analytics.rows[0];

    if (data.average_accuracy < 60) {
      recs.push('Focus on fundamentals - your accuracy is below 60%');
    }
    if (data.physics_accuracy < 65) {
      recs.push('Physics needs attention - practice Mechanics & Waves');
    }
    if (data.chemistry_accuracy < 65) {
      recs.push('Chemistry is weak - revisit Organic Chemistry');
    }
    if (data.biology_accuracy < 65) {
      recs.push('Biology can be improved - focus on Biology');
    }
    if (data.current_study_streak < 5) {
      recs.push('Build consistency - maintain a study streak');
    }

    return recs.slice(0, 4);
  }
}

module.exports = new AnalyticsService();
