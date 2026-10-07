/**
 * AI Mentor Service - Indraprastha NEET Academy
 * Provides structured, personalized academic mentoring for NEET test performance.
 * Supports Gemini API / OpenAI API with fallback rule-based mentor engine.
 */

const https = require('https');
const http = require('http');

const GEMINI_DIRECT_KEY = 'AQ.Ab8RN6KkjCy0yuPGxEGIngoRbNeaFRlqpuEEcMwaZXM09XsdFw';

class AIMentorService {
  /**
   * Generate structured AI Mentor analysis for a student's test performance.
   * @param {Object} analytics - Anonymized test performance metrics
   * @returns {Promise<Object>} Structured mentor guidance JSON
   */
  async generateMentorAnalysis(analytics) {
    const anonymizedInput = this._anonymizeAnalytics(analytics);

    try {
      const apiKey = process.env.GEMINI_API_KEY || GEMINI_DIRECT_KEY || process.env.OPENAI_API_KEY;
      if (apiKey) {
        if (process.env.GEMINI_API_KEY || GEMINI_DIRECT_KEY) {
          return await this._callGeminiAPI(anonymizedInput, process.env.GEMINI_API_KEY || GEMINI_DIRECT_KEY);
        } else {
          return await this._callOpenAIAPI(anonymizedInput);
        }
      }
    } catch (err) {
      console.warn('[AI_MENTOR_WARNING] External LLM API failed/unavailable, using fallback mentor engine:', err.message);
    }

    // High quality rule-based mentor analysis fallback
    return this._generateFallbackResponse(anonymizedInput);
  }

  /**
   * Remove any sensitive personal information before sending to external APIs.
   * @private
   */
  _anonymizeAnalytics(analytics) {
    return {
      test_name: String(analytics.test_name || 'NEET Test'),
      score: Number(analytics.score || 0),
      maximum_score: Number(analytics.maximum_score || 720),
      rank: Number(analytics.rank || 1),
      total_participants: Number(analytics.total_participants || 1),
      performance_category: String(analytics.performance_category || 'Average'),
      subjects: Array.isArray(analytics.subjects)
        ? analytics.subjects.map((s) => ({
            subject: String(s.subject),
            student_score: Number(s.student_score || 0),
            max_score: Number(s.max_score || 180),
            top100_average: Number(s.top100_average || 0),
            overall_average: Number(s.overall_average || 0),
          }))
        : [],
      weak_topics: Array.isArray(analytics.weak_topics)
        ? analytics.weak_topics.map((t) => (typeof t === 'string' ? t : t.topic || t.name))
        : [],
      strong_topics: Array.isArray(analytics.strong_topics)
        ? analytics.strong_topics.map((t) => (typeof t === 'string' ? t : t.topic || t.name))
        : [],
    };
  }

  /**
   * Call Google Gemini API
   * @private
   */
  async _callGeminiAPI(inputData, keyOverride) {
    const apiKey = keyOverride || process.env.GEMINI_API_KEY || GEMINI_DIRECT_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const promptText = `
You are an expert NEET Academic Mentor at Indraprastha NEET Academy.
Analyze the following anonymized student test performance analytics and generate structured actionable guidance.

Student Analytics JSON:
${JSON.stringify(inputData, null, 2)}

Strict Requirements:
1. Respond ONLY with valid JSON.
2. Follow this exact JSON schema:
{
  "summary": "Short 2-line executive performance summary",
  "performance_overview": "Detailed explanation comparing score against Top-100 benchmark and overall average",
  "priority_subject": "Name of the main subject needing immediate attention",
  "priority_topics": ["Topic 1", "Topic 2"],
  "strengths": ["Topic 1", "Topic 2"],
  "recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3"
  ],
  "motivation": "Encouraging, realistic closing message for the NEET aspirant"
}
3. Never invent scores or topics outside the provided data.
4. Keep tone academic, supportive, and focused on NEET rank optimization.
5. IF the test is a single-subject test (e.g. Physics), ALL recommendations, priority subjects, strengths, and performance overview MUST be strictly relevant to that subject (Physics). DO NOT mention or suggest unrelated subjects (such as Biology or Chemistry) if the test was for Physics.
`;

    const bodyData = JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    return new Promise((resolve, reject) => {
      const u = new URL(url);
      const req = https.request(
        u,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(bodyData),
          },
          timeout: 10000,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                const parsed = JSON.parse(data);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  const jsonRes = JSON.parse(text);
                  return resolve(jsonRes);
                }
              }
              reject(new Error(`Gemini API error code: ${res.statusCode}`));
            } catch (e) {
              reject(e);
            }
          });
        }
      );
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Gemini API timeout'));
      });
      req.write(bodyData);
      req.end();
    });
  }

  /**
   * Call OpenAI API
   * @private
   */
  async _callOpenAIAPI(inputData) {
    const apiKey = process.env.OPENAI_API_KEY;
    const bodyData = JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are an expert NEET Academic Mentor. Respond strictly with JSON matching schema: {"summary": "", "performance_overview": "", "priority_subject": "", "priority_topics": [], "strengths": [], "recommendations": [], "motivation": ""}. If the test is for a specific subject (e.g. Physics), all priority subjects and recommendations must be strictly for that subject. Do not invent data.`,
        },
        {
          role: 'user',
          content: JSON.stringify(inputData),
        },
      ],
    });

    return new Promise((resolve, reject) => {
      const req = https.request(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(bodyData),
          },
          timeout: 10000,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                const parsed = JSON.parse(data);
                const text = parsed.choices?.[0]?.message?.content;
                if (text) {
                  return resolve(JSON.parse(text));
                }
              }
              reject(new Error(`OpenAI API status: ${res.statusCode}`));
            } catch (e) {
              reject(e);
            }
          });
        }
      );
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('OpenAI API timeout'));
      });
      req.write(bodyData);
      req.end();
    });
  }

  /**
   * Fallback Rule-Based Academic Mentor Engine
   * Generates deterministic, highly structured mentor recommendations from actual analytics data.
   * @private
   */
  _generateFallbackResponse(data) {
    const {
      test_name = 'NEET Test',
      test_subject = '',
      score = 0,
      maximum_score = 720,
      rank = 1,
      total_participants = 1,
      performance_category = 'Average',
      subjects = [],
      weak_topics = [],
      strong_topics = [],
    } = data;

    // Detect primary test subject from analytics inputs or test_name
    let primarySubject = test_subject;
    if (!primarySubject && test_name) {
      const nameLower = test_name.toLowerCase();
      if (nameLower.includes('physics')) primarySubject = 'Physics';
      else if (nameLower.includes('chemistry')) primarySubject = 'Chemistry';
      else if (nameLower.includes('biology')) primarySubject = 'Biology';
      else if (nameLower.includes('botany')) primarySubject = 'Botany';
      else if (nameLower.includes('zoology')) primarySubject = 'Zoology';
    }
    if (!primarySubject && subjects.length > 0 && subjects[0].subject) {
      primarySubject = subjects[0].subject;
    }
    if (!primarySubject) {
      primarySubject = 'Physics';
    }

    const isSingleSubject = subjects.length <= 1;

    let prioritySubjectName = primarySubject;
    let strongSubjectName = primarySubject;
    let lowestSubject = null;
    let highestSubject = null;

    if (subjects.length > 0) {
      lowestSubject = subjects[0];
      highestSubject = subjects[0];

      subjects.forEach((s) => {
        const currentPct = s.max_score > 0 ? s.student_score / s.max_score : 0;
        const lowestPct = lowestSubject && lowestSubject.max_score > 0 ? lowestSubject.student_score / lowestSubject.max_score : 0;
        const highestPct = highestSubject && highestSubject.max_score > 0 ? highestSubject.student_score / highestSubject.max_score : 0;

        if (currentPct < lowestPct) lowestSubject = s;
        if (currentPct > highestPct) highestSubject = s;
      });

      if (lowestSubject && lowestSubject.subject) prioritySubjectName = lowestSubject.subject;
      if (highestSubject && highestSubject.subject) strongSubjectName = highestSubject.subject;
    }

    const summary = `You achieved ${score}/${maximum_score} (AIR #${rank} of ${total_participants} candidates). Your overall performance category is "${performance_category}".`;

    let overview = '';
    if (isSingleSubject) {
      overview = `In ${test_name} (${primarySubject}), your total score is ${score}/${maximum_score}.`;
      if (lowestSubject && lowestSubject.top100_average > 0) {
        overview += ` Your performance is evaluated against a Top 100 average of ${lowestSubject.top100_average}.`;
      }
    } else {
      overview = `In ${test_name}, your strongest subject was ${strongSubjectName}`;
      if (highestSubject && highestSubject.top100_average > 0) {
        overview += ` (${highestSubject.student_score}/${highestSubject.max_score} vs Top 100 average of ${highestSubject.top100_average}).`;
      } else {
        overview += `.`;
      }

      if (lowestSubject && lowestSubject.subject !== strongSubjectName) {
        overview += ` ${lowestSubject.subject} is currently your primary area of score growth, scoring ${lowestSubject.student_score}/${lowestSubject.max_score}`;
        if (lowestSubject.top100_average > 0) {
          overview += ` compared to the Top 100 benchmark average of ${lowestSubject.top100_average}.`;
        } else {
          overview += `.`;
        }
      }
    }

    const priorityTopicsList = weak_topics.slice(0, 3);
    const strengthsList = strong_topics.slice(0, 3);

    const recommendations = [];
    if (priorityTopicsList.length > 0) {
      recommendations.push(`Prioritize NCERT theory revision for ${priorityTopicsList.join(' & ')}.`);
      recommendations.push(`Solve at least 30 targeted MCQs daily in ${priorityTopicsList[0]} to fix concept gaps.`);
    } else {
      recommendations.push(`Focus on timed revision quizzes in ${prioritySubjectName}.`);
    }

    if (!isSingleSubject && lowestSubject && lowestSubject.subject) {
      recommendations.push(`Analyse all incorrect attempts in ${lowestSubject.subject} to eliminate silly mistakes.`);
    } else {
      recommendations.push(`Analyse all incorrect attempts in ${prioritySubjectName} to eliminate silly mistakes.`);
    }
    recommendations.push(`Take a targeted ${prioritySubjectName} booster test next week to verify retention.`);

    const motivation = `Consistency in daily practice bridges the gap to top performance. Keep sharpening your ${prioritySubjectName} concepts systematically!`;

    return {
      summary,
      performance_overview: overview,
      priority_subject: prioritySubjectName,
      priority_topics: priorityTopicsList,
      strengths: strengthsList,
      recommendations,
      motivation,
    };
  }
}

module.exports = new AIMentorService();
