/**
 * AI-Powered Similar Questions Service
 * Integrates real OpenAI API with strict NEET chapter/topic locking,
 * database persistence, and quality control validation.
 */

const OpenAI = require('openai');
const { pool } = require('../db');
const neetQuestionEngine = require('./neetQuestionEngine');

// Direct OpenAI Key provided for deployment without environment variable configuration
const DIRECT_OPENAI_KEY = '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';

class AISimilarQuestionsService {
  constructor() {
    this.defaultModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  }

  /**
   * Retrieves the configured OpenAI client.
   * Throws clear configuration error if OPENAI_API_KEY is not set.
   * @private
   */
  _getClient() {
    let apiKey = process.env.OPENAI_API_KEY !== undefined ? process.env.OPENAI_API_KEY : DIRECT_OPENAI_KEY;
    if (!apiKey && process.env.CHATGPT_API_KEY) apiKey = process.env.CHATGPT_API_KEY;
    apiKey = (apiKey || '').trim();
    if (!apiKey) {
      const err = new Error(
        'OPENAI_API_KEY is not configured on the server. Please configure OPENAI_API_KEY in the server environment.'
      );
      err.code = 'CONFIG_ERROR';
      err.status = 503;
      err.statusCode = 503;
      throw err;
    }
    return new OpenAI({
      apiKey,
      timeout: 35000,
      maxRetries: 2,
    });
  }

  /**
   * Validates requested question count is integer between 1 and 10.
   */
  validateRequestedCount(count) {
    const requestedCount = Number(count);
    if (!Number.isInteger(requestedCount) || requestedCount < 1 || requestedCount > 10) {
      const err = new Error('Question count must be an integer between 1 and 10.');
      err.status = 400;
      err.statusCode = 400;
      throw err;
    }
    return requestedCount;
  }

  /**
   * Constructs strict prompt locking subject, chapter, and concept.
   */
  buildStrictPrompt(sourceContext, requestedCount) {
    const lockedSubject = sourceContext.subject || 'Physics';
    const lockedChapter = sourceContext.chapter || sourceContext.topic || 'Current Electricity';
    const lockedConcept = sourceContext.concept || sourceContext.topic || "Ohm's Law";
    const randomSeed = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    const system = `You are a subject-specialist educational assessment engine at Indraprastha NEET Academy.
Your task is to generate authentic, high-yield, personalized NEET practice Multiple Choice Questions (MCQs).

HARD SCIENTIFIC CONSTRAINTS (MANDATORY):
1. Subject lock: Every generated question must match the original subject: "${lockedSubject}".
2. Chapter lock: Every generated question must match the original chapter: "${lockedChapter}".
3. Concept lock: Every generated question must directly assess the same concept or closely related sub-concept: "${lockedConcept}".
   Do NOT broaden scope to the entire subject. Do NOT introduce unrelated chapters.
4. Diversity & Non-repetition:
   - Generate EXACTLY ${requestedCount} distinct, original questions.
   - Each question must assess a different sub-problem or numerical variation.
   - DO NOT repeat identical questions or copy the source verbatim.
5. Answer correctness: The correct answer and explanation must agree with the question.
6. Random Seed: ${randomSeed}.

OUTPUT SCHEMA (STRICT JSON ONLY):
{
  "questions": [
    {
      "id": 1,
      "question_text": "Complete question statement...",
      "option_a": "First distinct option",
      "option_b": "Second distinct option",
      "option_c": "Third distinct option",
      "option_d": "Fourth distinct option",
      "correct_option": "A",
      "explanation": "Detailed step-by-step scientific explanation with formulas."
    }
  ]
}`;

    const user = `A NEET student answered this question INCORRECTLY:
- Subject: ${lockedSubject}
- Chapter: ${lockedChapter}
- Core Concept Tested: ${lockedConcept}
- Original Question: "${sourceContext.questionText || ''}"
${sourceContext.options?.length ? `- Original Options: ${sourceContext.options.join(' | ')}` : ''}
${sourceContext.correctOption ? `- Original Correct Answer: Option ${sourceContext.correctOption}` : ''}
${sourceContext.userAnswer ? `- STUDENT WRONG ANSWER CONTEXT: Option ${sourceContext.userAnswer}` : ''}
${sourceContext.explanation ? `- Original Solution: "${sourceContext.explanation}"` : ''}

TASK:
Generate EXACTLY ${requestedCount} brand-new, unique NEET practice MCQs strictly testing ${lockedSubject} -> ${lockedChapter} -> ${lockedConcept}.
Return ONLY valid JSON matching the schema.`;

    return { system, user };
  }

  /**
   * Calls real OpenAI API and parses JSON response.
   */
  async callOpenAIGeneration(prompt, count) {
    const openai = this._getClient();
    const model = process.env.OPENAI_MODEL || this.defaultModel;

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: prompt.system },
          { role: 'user', content: prompt.user },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.75,
      });
    } catch (apiErr) {
      console.error('[AI_SIMILAR_QUESTIONS_OPENAI_ERROR]', apiErr.message);
      const isQuota = apiErr.status === 429 || apiErr.message?.includes('quota');
      const isAuth = apiErr.status === 401;
      const customErr = new Error(
        isQuota
          ? 'OpenAI API rate limit or quota exceeded. Please check your OpenAI account billing or try again later.'
          : isAuth
          ? 'Invalid OpenAI API key. Please check OPENAI_API_KEY in your server configuration.'
          : `AI question generation service error: ${apiErr.message}`
      );
      customErr.status = isAuth ? 401 : isQuota ? 429 : 503;
      customErr.statusCode = customErr.status;
      throw customErr;
    }

    const content = completion.choices?.[0]?.message?.content;
    if (!content) {
      const err = new Error('OpenAI returned an empty response. Please try again.');
      err.status = 502;
      err.statusCode = 502;
      throw err;
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseErr) {
      const err = new Error('AI generation produced invalid JSON. Please try again.');
      err.status = 502;
      err.statusCode = 502;
      throw err;
    }

    const rawList = parsed.questions || parsed.mcqs || parsed.data;
    if (!Array.isArray(rawList) || rawList.length === 0) {
      const err = new Error('OpenAI response did not contain a valid list of questions.');
      err.status = 502;
      err.statusCode = 502;
      throw err;
    }

    return rawList;
  }

  /**
   * Validates and normalizes generated questions against source constraints.
   */
  validateGeneratedQuestions(rawList, sourceContext, requestedCount) {
    if (!Array.isArray(rawList) || rawList.length === 0) {
      const err = new Error('OpenAI response did not contain a valid list of questions.');
      err.status = 502;
      err.statusCode = 502;
      throw err;
    }

    const validQuestions = [];
    const seenTexts = new Set();
    const letters = ['A', 'B', 'C', 'D'];
    const origText = (sourceContext?.questionText || '').trim().toLowerCase();

    for (const q of rawList) {
      const qText = (q.question_text || q.question || '').trim();
      const optA = (q.option_a || q.optionA || q.options?.[0] || '').trim();
      const optB = (q.option_b || q.optionB || q.options?.[1] || '').trim();
      const optC = (q.option_c || q.optionC || q.options?.[2] || '').trim();
      const optD = (q.option_d || q.optionD || q.options?.[3] || '').trim();
      const correct = (q.correct_option || q.correctOption || q.correct_answer || 'A')
        .toString()
        .trim()
        .toUpperCase();
      const expl = (q.explanation || q.solution || '').trim();

      // Check required fields & valid MCQ correct option
      if (!qText || !optA || !optB || !optC || !optD || !letters.includes(correct)) {
        continue;
      }

      // Check duplicate within batch
      const textSig = qText.slice(0, 40).toLowerCase();
      if (seenTexts.has(textSig)) {
        continue;
      }
      seenTexts.add(textSig);

      // Check not copy of original
      if (origText && qText.toLowerCase() === origText) {
        continue;
      }

      validQuestions.push({
        id: validQuestions.length + 1,
        question_text: qText,
        option_a: optA,
        option_b: optB,
        option_c: optC,
        option_d: optD,
        correct_option: correct,
        explanation: expl || `Correct answer is Option ${correct}. Refer to standard ${sourceContext?.chapter || 'NCERT'} formulation.`,
        subject: sourceContext?.subject || 'Physics',
        chapter: sourceContext?.chapter || sourceContext?.topic || 'General',
        topic: sourceContext?.chapter || sourceContext?.topic || 'General',
        concept: sourceContext?.concept || sourceContext?.topic || 'General',
        difficulty: 'Medium',
      });

      if (validQuestions.length >= requestedCount) {
        break;
      }
    }

    if (validQuestions.length < requestedCount) {
      const err = new Error(
        `Failed strict quality validation: Generated only ${validQuestions.length} unique valid question(s), but ${requestedCount} were requested.`
      );
      err.status = 502;
      err.statusCode = 502;
      throw err;
    }

    return validQuestions.slice(0, requestedCount);
  }

  /**
   * Fetches authoritative question metadata from the trusted database
   * @private
   */
  async _fetchSourceQuestionFromDb(sourceQuestionId, sourceType = 'test') {
    if (!sourceQuestionId) return null;

    try {
      if (sourceType === 'practice') {
        const res = await pool.query(
          `SELECT pq.id, pq.question, pq.option_a, pq.option_b, pq.option_c, pq.option_d,
                  pq.correct_option, pq.explanation,
                  ps.subject, ps.topic, ps.title as set_title
           FROM practice_questions pq
           JOIN practice_sets ps ON pq.practice_set_id = ps.id
           WHERE pq.id = $1`,
          [sourceQuestionId]
        );
        if (res.rows.length > 0) {
          const row = res.rows[0];
          return {
            id: row.id,
            questionText: row.question,
            options: [row.option_a, row.option_b, row.option_c, row.option_d],
            correctOption: row.correct_option,
            explanation: row.explanation,
            subject: row.subject || '',
            topic: row.topic || row.set_title || '',
            sourceType: 'practice',
          };
        }
      } else {
        const res = await pool.query(
          `SELECT tq.id, tq.question, tq.option_a, tq.option_b, tq.option_c, tq.option_d,
                  tq.correct_option, tq.explanation,
                  COALESCE(NULLIF(TRIM(tq.subject), ''), t.subject, '') as subject,
                  COALESCE(NULLIF(TRIM(tq.topic), ''), NULLIF(TRIM(tq.chapter), ''), t.topic, t.title, '') as topic
           FROM test_questions tq
           JOIN tests t ON tq.test_id = t.id
           WHERE tq.id = $1`,
          [sourceQuestionId]
        );
        if (res.rows.length > 0) {
          const row = res.rows[0];
          return {
            id: row.id,
            questionText: row.question,
            options: [row.option_a, row.option_b, row.option_c, row.option_d],
            correctOption: row.correct_option,
            explanation: row.explanation,
            subject: row.subject || '',
            topic: row.topic || '',
            sourceType: 'test',
          };
        }
      }
    } catch (e) {
      console.warn('[AI_SIMILAR_QUESTIONS] DB lookup failed, using client payload:', e.message);
    }
    return null;
  }

  /**
   * Generates similar questions using the real OpenAI API with strict context locking.
   * NEVER returns mock questions or fallbacks.
   */
  async generateSimilarQuestions({
    userId,
    sourceQuestionId,
    sourceType = 'test',
    testId,
    questionText,
    subject,
    topic,
    options = [],
    explanation = '',
    userAnswer = '',
    count = 5,
  }) {
    // 1. Validate requested count strictly between 1 and 10
    const requestedCount = Number(count);
    if (!Number.isInteger(requestedCount) || requestedCount < 1 || requestedCount > 10) {
      const err = new Error('Requested question count must be an integer between 1 and 10.');
      err.status = 400;
      throw err;
    }

    // 2. Fetch authoritative metadata from database
    const dbSource = await this._fetchSourceQuestionFromDb(sourceQuestionId, sourceType);
    const effectiveQuestionText = (dbSource?.questionText || questionText || '').trim();
    const effectiveSubject = (dbSource?.subject || subject || '').trim();
    const effectiveTopic = (dbSource?.topic || topic || '').trim();
    const effectiveOptions = dbSource?.options?.length ? dbSource.options : options;
    const effectiveExplanation = (dbSource?.explanation || explanation || '').trim();
    const effectiveCorrectOption = dbSource?.correctOption || '';

    if (!effectiveQuestionText) {
      const err = new Error('Original question text could not be found or validated.');
      err.status = 400;
      throw err;
    }

    // 3. Resolve exact syllabus chapter and micro-concept
    const resolution = neetQuestionEngine.resolveSubjectAndTopic({
      questionText: effectiveQuestionText,
      subject: effectiveSubject,
      topic: effectiveTopic,
      explanation: effectiveExplanation,
      options: effectiveOptions,
    });

    const lockedSubject = resolution.detectedSubject;
    const lockedChapter = resolution.detectedTopic;
    const lockedConcept = resolution.detectedConcept;

    const sourceContext = {
      subject: lockedSubject,
      chapter: lockedChapter,
      topic: lockedChapter,
      concept: lockedConcept,
      questionText: effectiveQuestionText,
      options: effectiveOptions,
      correctOption: effectiveCorrectOption,
      userAnswer,
      explanation: effectiveExplanation,
    };

    // 4. Construct strict prompts and call real OpenAI API
    const prompts = this.buildStrictPrompt(sourceContext, requestedCount);
    const rawList = await this.callOpenAIGeneration(prompts, requestedCount);

    // 5. Strictly validate, deduplicate, and normalize questions
    const validQuestions = this.validateGeneratedQuestions(rawList, sourceContext, requestedCount);

    // 7. Persist Practice Batch and Questions in PostgreSQL
    let batchId = null;
    try {
      const batchRes = await pool.query(
        `INSERT INTO ai_similar_question_batches
         (user_id, source_question_id, source_type, test_id, subject, chapter, topic, concept, difficulty, requested_count, valid_count, model, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'completed')
         RETURNING id`,
        [
          userId || null,
          sourceQuestionId || null,
          sourceType || 'test',
          testId || null,
          lockedSubject,
          lockedChapter,
          lockedChapter,
          lockedConcept,
          'Medium',
          requestedCount,
          validQuestions.length,
          model,
        ]
      );
      batchId = batchRes.rows[0].id;

      // Insert all generated questions
      for (const vq of validQuestions) {
        const qRes = await pool.query(
          `INSERT INTO ai_similar_questions
           (batch_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id`,
          [
            batchId,
            vq.question_text,
            vq.option_a,
            vq.option_b,
            vq.option_c,
            vq.option_d,
            vq.correct_option,
            vq.explanation,
          ]
        );
        vq.db_id = qRes.rows[0].id;
      }
    } catch (dbErr) {
      console.warn('[AI_SIMILAR_QUESTIONS] Failed to persist batch in DB:', dbErr.message);
    }

    return {
      success: true,
      batch_id: batchId,
      subject: lockedSubject,
      chapter: lockedChapter,
      topic: lockedChapter,
      concept: lockedConcept,
      requested_count: requestedCount,
      valid_count: validQuestions.length,
      model,
      questions: validQuestions,
    };
  }

  /**
   * Submits student answers for an AI-generated practice batch
   */
  async submitBatchAnswers({ userId, batchId, answers = {} }) {
    if (!batchId) {
      const err = new Error('Batch ID is required.');
      err.status = 400;
      throw err;
    }

    // Verify batch ownership
    const batchRes = await pool.query(
      `SELECT id, user_id, subject, chapter, topic, concept FROM ai_similar_question_batches WHERE id = $1`,
      [batchId]
    );
    if (batchRes.rows.length === 0) {
      const err = new Error('Practice batch not found.');
      err.status = 404;
      throw err;
    }

    const batch = batchRes.rows[0];
    if (userId && batch.user_id && batch.user_id !== userId) {
      const err = new Error('Unauthorized to submit answers for this batch.');
      err.status = 403;
      throw err;
    }

    // Fetch batch questions
    const qRes = await pool.query(
      `SELECT id, correct_option FROM ai_similar_questions WHERE batch_id = $1 ORDER BY id ASC`,
      [batchId]
    );

    let correctCount = 0;
    let wrongCount = 0;
    const now = new Date();

    for (let i = 0; i < qRes.rows.length; i++) {
      const qRow = qRes.rows[i];
      // Lookup answer by db id or 1-based index or 0-based index
      const userAns = (
        answers[qRow.id] ??
        answers[`${qRow.id}`] ??
        answers[i + 1] ??
        answers[`${i + 1}`] ??
        answers[i] ??
        answers[`${i}`] ??
        ''
      ).toString().toUpperCase().trim();

      if (userAns) {
        const isCorrect = userAns === qRow.correct_option.trim().toUpperCase();
        if (isCorrect) correctCount++;
        else wrongCount++;

        await pool.query(
          `UPDATE ai_similar_questions
           SET user_answer = $1, is_correct = $2, answered_at = $3
           WHERE id = $4`,
          [userAns, isCorrect, now, qRow.id]
        );
      }
    }

    const total = qRes.rows.length;
    const accuracy = total > 0 ? Number(((correctCount / total) * 100).toFixed(1)) : 0;

    return {
      success: true,
      batch_id: batchId,
      total_questions: total,
      correct_count: correctCount,
      wrong_count: wrongCount,
      accuracy,
      subject: batch.subject,
      chapter: batch.chapter,
      concept: batch.concept,
    };
  }

  /**
   * Retrieves a previously generated batch
   */
  async getBatchDetails({ userId, batchId }) {
    const batchRes = await pool.query(
      `SELECT * FROM ai_similar_question_batches WHERE id = $1`,
      [batchId]
    );
    if (batchRes.rows.length === 0) {
      const err = new Error('Practice batch not found.');
      err.status = 404;
      throw err;
    }

    const batch = batchRes.rows[0];
    if (userId && batch.user_id && batch.user_id !== userId) {
      const err = new Error('Unauthorized.');
      err.status = 403;
      throw err;
    }

    const qRes = await pool.query(
      `SELECT id, question_text, option_a, option_b, option_c, option_d,
              correct_option, explanation, user_answer, is_correct, answered_at
       FROM ai_similar_questions
       WHERE batch_id = $1
       ORDER BY id ASC`,
      [batchId]
    );

    return {
      success: true,
      batch,
      questions: qRes.rows,
    };
  }
}

module.exports = new AISimilarQuestionsService();
