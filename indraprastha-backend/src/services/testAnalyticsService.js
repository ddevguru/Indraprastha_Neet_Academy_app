/**
 * Advanced Test Performance Analytics Engine - Indraprastha NEET Academy
 * Handles:
 * - Test-Specific Top 100 Benchmark calculation
 * - Subject-wise Performance comparison (Student vs Top 100 vs Overall)
 * - Chapter/Topic level accuracy calculation
 * - Configurable Weak & Strong Topic identification (MIN_QUESTIONS = 3)
 * - Priority Areas detection
 * - Historical Performance trends & Topic Improvement tracking
 * - Database-backed practice set recommendations
 * - AI Mentor integration & persistence
 */

const db = require('../db');
const aiMentorService = require('./aiMentorService');

// Configurable Constants
const WEAK_TOPIC_THRESHOLD = 50; // < 50%
const STRONG_TOPIC_THRESHOLD = 75; // >= 75%
const MIN_QUESTIONS_FOR_TOPIC_ANALYSIS = 3; // Must have at least 3 questions

class TestAnalyticsService {
  /**
   * Main entry point to compute, persist and return test performance analytics for a student submission.
   */
  async calculateTestAnalytics(userId, testId, attemptId = null, userAnswersPayload = null) {
    try {
      // 1. Fetch Test Information
      const testRes = await db.query(
        `SELECT id, title, subject, topic, marks, question_count
         FROM tests
         WHERE id = $1
         LIMIT 1`,
        [testId]
      );
      if (!testRes.rows.length) {
        throw new Error('Test not found');
      }
      const testMeta = testRes.rows[0];
      const maxMarks = Number(testMeta.marks) || 720;

      // 2. Fetch Questions for this Test
      const questionsRes = await db.query(
        `SELECT id, subject, chapter, topic, correct_option
         FROM test_questions
         WHERE test_id = $1
         ORDER BY id ASC`,
        [testId]
      );
      const questions = questionsRes.rows;

      // If detailed user answers were provided in payload, record them in test_attempt_details / user_answers
      if (Array.isArray(userAnswersPayload) && userAnswersPayload.length > 0 && attemptId) {
        await this._storeUserAnswers(userId, testId, attemptId, userAnswersPayload, questions, testMeta);
      }

      // 3. Query Target Student's Attempt
      let studentAttemptRow = null;
      if (attemptId) {
        const attRes = await db.query(
          `SELECT id, score, accuracy, attempted_at FROM test_attempts WHERE id = $1 AND user_id = $2`,
          [attemptId, userId]
        );
        if (attRes.rows.length) studentAttemptRow = attRes.rows[0];
      }
      if (!studentAttemptRow) {
        const attRes = await db.query(
          `SELECT id, score, accuracy, attempted_at FROM test_attempts WHERE user_id = $1 AND test_id = $2 ORDER BY attempted_at DESC LIMIT 1`,
          [userId, testId]
        );
        if (attRes.rows.length) studentAttemptRow = attRes.rows[0];
      }

      const studentScore = studentAttemptRow ? Number(studentAttemptRow.score) || 0 : 0;
      const studentAttemptId = studentAttemptRow ? studentAttemptRow.id : attemptId;

      // 4. Calculate Test-Specific Top 100 Benchmark & Participant Ranks
      const participantAttemptsRes = await db.query(
        `SELECT ta.user_id, MAX(ta.score) as score, MIN(ta.attempted_at) as attempted_at
         FROM test_attempts ta
         WHERE ta.test_id = $1
         GROUP BY ta.user_id
         ORDER BY score DESC, attempted_at ASC`,
        [testId]
      );

      const participants = participantAttemptsRes.rows;
      const totalParticipantsCount = Math.max(1, participants.length);

      // Student Rank calculation (1-indexed)
      let studentRank = 1;
      const studentRankIndex = participants.findIndex((p) => Number(p.user_id) === Number(userId));
      if (studentRankIndex >= 0) {
        studentRank = studentRankIndex + 1;
      }

      // Select Top 100 Students for THIS test
      const top100Count = Math.min(totalParticipantsCount, 100);
      const top100Participants = participants.slice(0, top100Count);

      const overallScores = participants.map((p) => Number(p.score) || 0);
      const top100Scores = top100Participants.map((p) => Number(p.score) || 0);

      const overallAverageTotalScore = Math.round(overallScores.reduce((a, b) => a + b, 0) / totalParticipantsCount);
      const top100AverageTotalScore = Math.round(top100Scores.reduce((a, b) => a + b, 0) / top100Count);

      // 5. Subject-Wise Breakdown Calculation (Dynamic Subjects)
      const dynamicSubjects = this._extractDynamicSubjects(questions, testMeta);
      const subjectAnalysis = await this._calculateSubjectPerformance(
        userId,
        testId,
        studentAttemptId,
        questions,
        dynamicSubjects,
        participants,
        top100Participants,
        maxMarks
      );

      // Save/update test_benchmarks
      await db.query(
        `INSERT INTO test_benchmarks (test_id, total_participants, top100_count, overall_average_score, top100_average_score, subject_benchmarks, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
         ON CONFLICT (test_id) DO UPDATE SET
           total_participants = EXCLUDED.total_participants,
           top100_count = EXCLUDED.top100_count,
           overall_average_score = EXCLUDED.overall_average_score,
           top100_average_score = EXCLUDED.top100_average_score,
           subject_benchmarks = EXCLUDED.subject_benchmarks,
           updated_at = CURRENT_TIMESTAMP`,
        [testId, totalParticipantsCount, top100Count, overallAverageTotalScore, top100AverageTotalScore, JSON.stringify(subjectAnalysis)]
      );

      // 6. Performance Category
      const performanceCategory = this._calculatePerformanceCategory(
        studentScore,
        overallAverageTotalScore,
        top100AverageTotalScore
      );

      // 7. Topic & Chapter Level Analysis
      const topicAnalysisResult = await this._calculateTopicAnalysis(
        userId,
        testId,
        studentAttemptId,
        questions,
        testMeta
      );

      const { topicAnalysis, weakTopics, strongTopics, priorityAreas } = topicAnalysisResult;

      // 8. Historical Performance Trend & Topic Improvement
      const historicalPerformance = await this._getHistoricalPerformance(userId, testId);
      const topicImprovement = await this._getTopicImprovement(userId, weakTopics, priorityAreas, topicAnalysis);

      // 9. Database-Backed Recommended Practice Sets
      const recommendedPractice = await this._getRecommendedPractice(weakTopics, priorityAreas);

      // 10. AI Mentor Analysis & Caching
      const aiInputPayload = {
        test_name: testMeta.title,
        test_subject: testMeta.subject || this._inferSubject(null, testMeta),
        score: studentScore,
        maximum_score: maxMarks,
        rank: studentRank,
        total_participants: totalParticipantsCount,
        performance_category: performanceCategory,
        subjects: subjectAnalysis,
        weak_topics: weakTopics.map((w) => `${w.subject} → ${w.topic}`),
        strong_topics: strongTopics.map((s) => `${s.subject} → ${s.topic}`),
      };

      const aiMentorResponse = await aiMentorService.generateMentorAnalysis(aiInputPayload);

      // Store AI Mentor response in ai_test_analysis table
      if (studentAttemptId) {
        await db.query(
          `INSERT INTO ai_test_analysis (user_id, test_id, attempt_id, ai_response, created_at)
           VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
           ON CONFLICT (user_id, test_id, attempt_id) DO UPDATE SET
             ai_response = EXCLUDED.ai_response,
             created_at = CURRENT_TIMESTAMP`,
          [userId, testId, studentAttemptId, JSON.stringify(aiMentorResponse)]
        );
      }

      // 11. Final Structured Response
      const fullAnalysis = {
        test: {
          id: testId,
          name: testMeta.title,
          maximum_score: maxMarks,
        },
        student: {
          score: studentScore,
          rank: studentRank,
          total_participants: totalParticipantsCount,
          performance_category: performanceCategory,
        },
        benchmark: {
          top100_count: top100Count,
          overall_participant_count: totalParticipantsCount,
          overall_average_score: overallAverageTotalScore,
          top100_average_score: top100AverageTotalScore,
        },
        subjects: subjectAnalysis,
        topic_analysis: topicAnalysis,
        weak_topics: weakTopics,
        strong_topics: strongTopics,
        priority_areas: priorityAreas,
        historical_performance: historicalPerformance,
        topic_improvement: topicImprovement,
        recommended_practice: recommendedPractice,
        ai_analysis: aiMentorResponse,
      };

      // Store in student_test_analytics
      if (studentAttemptId) {
        await db.query(
          `INSERT INTO student_test_analytics (
             user_id, test_id, attempt_id, score, total_marks, rank, total_participants,
             performance_category, subject_analysis, topic_analysis, weak_topics,
             strong_topics, priority_areas, historical_performance, topic_improvement,
             recommended_practice, updated_at
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, CURRENT_TIMESTAMP)
           ON CONFLICT (user_id, test_id, attempt_id) DO UPDATE SET
             score = EXCLUDED.score,
             total_marks = EXCLUDED.total_marks,
             rank = EXCLUDED.rank,
             total_participants = EXCLUDED.total_participants,
             performance_category = EXCLUDED.performance_category,
             subject_analysis = EXCLUDED.subject_analysis,
             topic_analysis = EXCLUDED.topic_analysis,
             weak_topics = EXCLUDED.weak_topics,
             strong_topics = EXCLUDED.strong_topics,
             priority_areas = EXCLUDED.priority_areas,
             historical_performance = EXCLUDED.historical_performance,
             topic_improvement = EXCLUDED.topic_improvement,
             recommended_practice = EXCLUDED.recommended_practice,
             updated_at = CURRENT_TIMESTAMP`,
          [
            userId,
            testId,
            studentAttemptId,
            studentScore,
            maxMarks,
            studentRank,
            totalParticipantsCount,
            performanceCategory,
            JSON.stringify(subjectAnalysis),
            JSON.stringify(topicAnalysis),
            JSON.stringify(weakTopics),
            JSON.stringify(strongTopics),
            JSON.stringify(priorityAreas),
            JSON.stringify(historicalPerformance),
            JSON.stringify(topicImprovement),
            JSON.stringify(recommendedPractice),
          ]
        );
      }

      return fullAnalysis;
    } catch (error) {
      console.error('Error calculating test analytics:', error);
      throw error;
    }
  }

  /**
   * Fetch pre-computed or on-demand performance analysis for a student and test.
   * Enforces security check: Student MUST have attempted the test.
   */
  async getPerformanceAnalysis(userId, testId) {
    // 1. Authorization check: Student must have attempted test
    const attCheck = await db.query(
      `SELECT id, score, attempted_at FROM test_attempts WHERE user_id = $1 AND test_id = $2 ORDER BY attempted_at DESC LIMIT 1`,
      [userId, testId]
    );

    if (!attCheck.rows.length) {
      const err = new Error('Access denied: You must attempt this test to view performance analysis.');
      err.statusCode = 403;
      throw err;
    }

    const attemptId = attCheck.rows[0].id;

    // 2. Check if cached analysis exists in student_test_analytics
    const cachedRes = await db.query(
      `SELECT sta.*, ai.ai_response, t.title as test_name, t.marks as test_max_marks
       FROM student_test_analytics sta
       JOIN tests t ON sta.test_id = t.id
       LEFT JOIN ai_test_analysis ai ON sta.attempt_id = ai.attempt_id
       WHERE sta.user_id = $1 AND sta.test_id = $2 AND sta.attempt_id = $3`,
      [userId, testId, attemptId]
    );

    if (cachedRes.rows.length) {
      const row = cachedRes.rows[0];
      const benchmarkRes = await db.query(`SELECT * FROM test_benchmarks WHERE test_id = $1`, [testId]);
      const bench = benchmarkRes.rows.length ? benchmarkRes.rows[0] : {};

      return {
        test: {
          id: Number(testId),
          name: row.test_name,
          maximum_score: Number(row.test_max_marks) || 720,
        },
        student: {
          score: Number(row.score),
          rank: Number(row.rank),
          total_participants: Number(row.total_participants),
          performance_category: row.performance_category,
        },
        benchmark: {
          top100_count: Number(bench.top100_count) || 1,
          overall_participant_count: Number(bench.total_participants) || Number(row.total_participants),
          overall_average_score: Number(bench.overall_average_score) || 0,
          top100_average_score: Number(bench.top100_average_score) || 0,
        },
        subjects: row.subject_analysis || [],
        topic_analysis: row.topic_analysis || [],
        weak_topics: row.weak_topics || [],
        strong_topics: row.strong_topics || [],
        priority_areas: row.priority_areas || [],
        historical_performance: row.historical_performance || [],
        topic_improvement: row.topic_improvement || [],
        recommended_practice: row.recommended_practice || [],
        ai_analysis: row.ai_response || {},
      };
    }

    // 3. Fallback: On-demand recalculation
    return await this.calculateTestAnalytics(userId, testId, attemptId);
  }

  /**
   * Helper: Infer subject from question or test metadata
   * @private
   */
  _inferSubject(q, testMeta) {
    if (q && q.subject && typeof q.subject === 'string' && q.subject.trim()) {
      return q.subject.trim();
    }
    if (testMeta && testMeta.subject && typeof testMeta.subject === 'string' && testMeta.subject.trim()) {
      return testMeta.subject.trim();
    }
    const title = (testMeta && testMeta.title ? testMeta.title : '').toLowerCase();
    if (title.includes('physics')) return 'Physics';
    if (title.includes('chemistry')) return 'Chemistry';
    if (title.includes('biology')) return 'Biology';
    if (title.includes('botany')) return 'Botany';
    if (title.includes('zoology')) return 'Zoology';
    return 'Physics';
  }

  /**
   * Helper: Store user answer records into user_answers and test_attempt_details
   * @private
   */
  async _storeUserAnswers(userId, testId, attemptId, userAnswersPayload, questions, testMeta = {}) {
    try {
      const qMap = new Map();
      questions.forEach((q) => qMap.set(q.id, q));

      for (let i = 0; i < userAnswersPayload.length; i++) {
        const item = userAnswersPayload[i];
        const qId = Number(item.questionId || item.question_id || (questions[i] ? questions[i].id : 0));
        if (!qId) continue;

        const q = qMap.get(qId) || questions[i] || {};
        const selectedOption = String(item.selectedOption || item.optionKey || item.user_answer || '').toUpperCase();
        const correctOption = String(q.correct_option || '').toUpperCase();
        const isCorrect = selectedOption.length > 0 && selectedOption === correctOption;

        if (selectedOption.length > 0) {
          await db.query(
            `INSERT INTO user_answers (user_id, question_id, test_id, option_key, is_correct, answered_at)
             VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)`,
            [userId, qId, testId, selectedOption, isCorrect]
          );

          await db.query(
            `INSERT INTO test_attempt_details (test_attempt_id, question_id, subject, topic, is_correct, time_taken_seconds, user_answer, correct_answer)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              attemptId,
              qId,
              this._inferSubject(q, testMeta),
              q.topic || 'General',
              isCorrect,
              Number(item.timeTakenSeconds) || 0,
              selectedOption,
              correctOption,
            ]
          );
        }
      }
    } catch (err) {
      console.error('Error storing user answer details:', err.message);
    }
  }

  /**
   * Extract dynamic subject list from questions
   * @private
   */
  _extractDynamicSubjects(questions, testMeta) {
    const subjSet = new Set();
    questions.forEach((q) => {
      if (q.subject && q.subject.trim()) {
        subjSet.add(q.subject.trim());
      }
    });

    if (subjSet.size === 0) {
      if (testMeta.subject && testMeta.subject.trim()) {
        subjSet.add(testMeta.subject.trim());
      } else {
        const titleLower = (testMeta.title || '').toLowerCase();
        if (titleLower.includes('physics')) subjSet.add('Physics');
        else if (titleLower.includes('chemistry')) subjSet.add('Chemistry');
        else if (titleLower.includes('biology')) subjSet.add('Biology');
        else if (titleLower.includes('botany')) subjSet.add('Botany');
        else if (titleLower.includes('zoology')) subjSet.add('Zoology');
        else {
          subjSet.add('Physics');
          subjSet.add('Chemistry');
          subjSet.add('Biology');
        }
      }
    }

    return Array.from(subjSet);
  }

  /**
   * Calculate subject performance for student, top 100 average, and overall average
   * @private
   */
  async _calculateSubjectPerformance(
    userId,
    testId,
    attemptId,
    questions,
    dynamicSubjects,
    participants,
    top100Participants,
    maxMarks
  ) {
    const qBySubject = {};
    dynamicSubjects.forEach((s) => (qBySubject[s] = []));

    questions.forEach((q) => {
      const s = q.subject && dynamicSubjects.includes(q.subject.trim()) ? q.subject.trim() : dynamicSubjects[0];
      if (!qBySubject[s]) qBySubject[s] = [];
      qBySubject[s].push(q);
    });

    // Compute subject max score based on question counts (+4 marks per question)
    const subjectMaxMarks = {};
    dynamicSubjects.forEach((s) => {
      const qCount = (qBySubject[s] || []).length;
      subjectMaxMarks[s] = qCount > 0 ? qCount * 4 : Math.round(maxMarks / dynamicSubjects.length);
    });

    // Fetch student's answer details for this attempt if recorded
    const studentAnsRes = attemptId
      ? await db.query(
          `SELECT question_id, is_correct, user_answer FROM test_attempt_details WHERE test_attempt_id = $1`,
          [attemptId]
        ).catch((err) => {
          console.error('[TEST_ATTEMPT_DETAILS_QUERY_ERROR]', err.message);
          return { rows: [] };
        })
      : { rows: [] };

    const ansMap = new Map();
    studentAnsRes.rows.forEach((r) => ansMap.set(r.question_id, r));

    // Calculate target student's score per subject
    const studentSubjectScores = {};
    dynamicSubjects.forEach((s) => {
      const subjectQs = qBySubject[s] || [];
      let score = 0;
      subjectQs.forEach((q) => {
        const userAns = ansMap.get(q.id);
        if (userAns && userAns.user_answer) {
          if (userAns.is_correct) {
            score += 4;
          } else {
            score -= 1;
          }
        }
      });
      studentSubjectScores[s] = Math.max(0, score);
    });

    // Calculate top 100 averages and overall averages per subject
    const top100AvgSubjectScores = {};
    const overallAvgSubjectScores = {};

    dynamicSubjects.forEach((s) => {
      const subjMax = subjectMaxMarks[s];

      // Proportional calculation fallback for overall test participants
      const calculateAvgForGroup = (group) => {
        if (!group || group.length === 0) return 0;
        let sum = 0;
        group.forEach((p) => {
          const totScore = Number(p.score) || 0;
          const ratio = maxMarks > 0 ? totScore / maxMarks : 0;
          sum += Math.round(ratio * subjMax);
        });
        return Math.round(sum / group.length);
      };

      top100AvgSubjectScores[s] = calculateAvgForGroup(top100Participants);
      overallAvgSubjectScores[s] = calculateAvgForGroup(participants);

      // If student is in top 100, ensure top 100 average is at least realistic
      if (top100AvgSubjectScores[s] < studentSubjectScores[s] && top100Participants.some((p) => Number(p.user_id) === Number(userId))) {
        top100AvgSubjectScores[s] = Math.max(top100AvgSubjectScores[s], studentSubjectScores[s]);
      }
    });

    // Format output array
    return dynamicSubjects.map((s) => {
      const studentScore = studentSubjectScores[s] || 0;
      const top100Avg = top100AvgSubjectScores[s] || 0;
      const overallAvg = overallAvgSubjectScores[s] || 0;
      const maxScore = subjectMaxMarks[s] || 180;

      let status = 'Needs Improvement';
      if (top100Avg > 0 && studentScore >= top100Avg) {
        status = 'Excellent';
      } else if (overallAvg > 0 && studentScore >= overallAvg + 0.5 * (top100Avg - overallAvg)) {
        status = 'Strong';
      } else if (studentScore >= overallAvg) {
        status = 'Above Average';
      } else if (studentScore >= 0.7 * overallAvg) {
        status = 'Average';
      }

      return {
        subject: s,
        student_score: studentScore,
        max_score: maxScore,
        top100_average: top100Avg,
        overall_average: overallAvg,
        status: status,
      };
    });
  }

  /**
   * Relative Performance Category calculation
   * @private
   */
  _calculatePerformanceCategory(score, overallAvg, top100Avg) {
    if (top100Avg > 0 && score >= top100Avg * 0.95) return 'Excellent';
    if (overallAvg > 0 && score >= overallAvg + 0.6 * (top100Avg - overallAvg)) return 'Strong';
    if (score >= overallAvg) return 'Above Average';
    if (score >= 0.75 * overallAvg) return 'Average';
    return 'Needs Improvement';
  }

  /**
   * Topic and Chapter Analysis
   * @private
   */
  async _calculateTopicAnalysis(userId, testId, attemptId, questions, testMeta) {
    const detailsRes = attemptId
      ? await db.query(
          `SELECT question_id, is_correct, user_answer FROM test_attempt_details WHERE test_attempt_id = $1`,
          [attemptId]
        ).catch((err) => {
          console.error('[TEST_ATTEMPT_DETAILS_QUERY_ERROR]', err.message);
          return { rows: [] };
        })
      : { rows: [] };

    const ansMap = new Map();
    detailsRes.rows.forEach((r) => ansMap.set(r.question_id, r));

    // Group by (subject, chapter, topic)
    const topicGroupMap = new Map();

    questions.forEach((q) => {
      const subject = (q.subject || testMeta.subject || this._inferSubject(q, testMeta)).trim();
      const chapter = (q.chapter || 'General Chapter').trim();
      const topic = (q.topic || testMeta.topic || 'General Topic').trim();
      const key = `${subject}::${chapter}::${topic}`;

      if (!topicGroupMap.has(key)) {
        topicGroupMap.set(key, {
          subject,
          chapter,
          topic,
          questions_count: 0,
          correct_count: 0,
          wrong_count: 0,
          unattempted_count: 0,
        });
      }

      const item = topicGroupMap.get(key);
      item.questions_count++;

      const userAns = ansMap.get(q.id);
      if (userAns && userAns.user_answer) {
        if (userAns.is_correct) {
          item.correct_count++;
        } else {
          item.wrong_count++;
        }
      } else {
        item.unattempted_count++;
      }
    });

    const topicAnalysis = [];
    const weakTopics = [];
    const strongTopics = [];
    const candidatePriorityTopics = [];

    topicGroupMap.forEach((item) => {
      const pct = item.questions_count > 0 ? Math.round((item.correct_count / item.questions_count) * 100) : 0;
      const topicObj = {
        subject: item.subject,
        chapter: item.chapter,
        topic: item.topic,
        questions_count: item.questions_count,
        correct_count: item.correct_count,
        wrong_count: item.wrong_count,
        unattempted_count: item.unattempted_count,
        score_percentage: pct,
      };

      topicAnalysis.push(topicObj);

      // Feature 7 & 8: Must satisfy MIN_QUESTIONS_FOR_TOPIC_ANALYSIS (3) threshold
      if (item.questions_count >= MIN_QUESTIONS_FOR_TOPIC_ANALYSIS) {
        if (pct < WEAK_TOPIC_THRESHOLD) {
          weakTopics.push({
            subject: item.subject,
            topic: item.topic,
            score_percentage: pct,
          });
        }
        if (pct >= STRONG_TOPIC_THRESHOLD) {
          strongTopics.push({
            subject: item.subject,
            topic: item.topic,
            score_percentage: pct,
          });
        }

        candidatePriorityTopics.push({
          ...topicObj,
          priority_weight: (100 - pct) * 1.5 + item.wrong_count * 10,
        });
      }
    });

    // Feature 9: Generate Priority Areas sorted by priority weight
    candidatePriorityTopics.sort((a, b) => b.priority_weight - a.priority_weight);

    const priorityAreas = candidatePriorityTopics.slice(0, 4).map((t, index) => ({
      subject: t.subject,
      chapter: t.chapter,
      topic: t.topic,
      priority: index + 1,
      score_percentage: t.score_percentage,
      wrong_count: t.wrong_count,
    }));

    return {
      topicAnalysis,
      weakTopics,
      strongTopics,
      priorityAreas,
    };
  }

  /**
   * Historical Performance Trend across attempted tests
   * @private
   */
  async _getHistoricalPerformance(userId, currentTestId) {
    try {
      const res = await db.query(
        `SELECT ta.test_id, t.title as test_name, ta.score, t.marks as total_marks, ta.attempted_at
         FROM test_attempts ta
         JOIN tests t ON ta.test_id = t.id
         WHERE ta.user_id = $1 AND ta.test_id != $2
         ORDER BY ta.attempted_at ASC
         LIMIT 10`,
        [userId, currentTestId]
      );

      return res.rows.map((r) => ({
        test_id: r.test_id,
        test_title: r.test_name,
        score: Number(r.score),
        total_marks: Number(r.total_marks) || 720,
        attempted_at: r.attempted_at,
      }));
    } catch (e) {
      console.error('Error fetching historical performance:', e.message);
      return [];
    }
  }

  /**
   * Topic Improvement Tracking (+X percentage points)
   * @private
   */
  async _getTopicImprovement(userId, weakTopics, priorityAreas, currentTopicAnalysis) {
    try {
      const topicImprovement = [];
      const pastAnalyticsRes = await db.query(
        `SELECT topic_analysis FROM student_test_analytics WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5`,
        [userId]
      );

      if (!pastAnalyticsRes.rows.length) return [];

      // Collect all past topic scores
      const pastTopicScoresMap = new Map();
      pastAnalyticsRes.rows.forEach((row) => {
        const list = row.topic_analysis || [];
        list.forEach((t) => {
          const key = `${t.subject}::${t.topic}`;
          if (!pastTopicScoresMap.has(key)) {
            pastTopicScoresMap.set(key, t.score_percentage);
          }
        });
      });

      currentTopicAnalysis.forEach((t) => {
        const key = `${t.subject}::${t.topic}`;
        if (pastTopicScoresMap.has(key)) {
          const prevPct = pastTopicScoresMap.get(key);
          const currPct = t.score_percentage;
          const diff = currPct - prevPct;

          if (diff !== 0) {
            topicImprovement.push({
              subject: t.subject,
              topic: t.topic,
              previous_percentage: prevPct,
              current_percentage: currPct,
              improvement: diff,
            });
          }
        }
      });

      return topicImprovement.slice(0, 5);
    } catch (e) {
      console.error('Error calculating topic improvement:', e.message);
      return [];
    }
  }

  /**
   * Retrieve database-backed recommended practice sets matching weak topics
   * @private
   */
  async _getRecommendedPractice(weakTopics, priorityAreas) {
    try {
      const targetTopics = [...weakTopics.map((w) => w.topic), ...priorityAreas.map((p) => p.topic)];
      const targetSubjects = [...weakTopics.map((w) => w.subject), ...priorityAreas.map((p) => p.subject)];

      if (targetTopics.length === 0 && targetSubjects.length === 0) return [];

      const res = await db.query(
        `SELECT id, title, subject, topic, difficulty, estimated_minutes
         FROM practice_sets
         WHERE LOWER(topic) = ANY($1) OR LOWER(subject) = ANY($2)
         ORDER BY id ASC
         LIMIT 5`,
        [targetTopics.map((t) => t.toLowerCase()), targetSubjects.map((s) => s.toLowerCase())]
      );

      return res.rows.map((r) => ({
        id: r.id,
        title: r.title,
        subject: r.subject,
        topic: r.topic,
        difficulty: r.difficulty || 'Moderate',
        estimated_minutes: r.estimated_minutes || 20,
      }));
    } catch (e) {
      console.error('Error fetching recommended practice sets:', e.message);
      return [];
    }
  }
}

module.exports = new TestAnalyticsService();
