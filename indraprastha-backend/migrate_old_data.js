/**
 * Migration script: old indraprastha_old DB → new indraprastha_db
 *
 * Run AFTER:
 *   1. New backend started once (schema created)
 *   2. Old SQL imported into indraprastha_old DB
 *
 * Usage: node migrate_old_data.js
 */

require('dotenv').config();
const { Pool } = require('pg');

const OLD_DB = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'indraprastha_old',
  user: process.env.DB_USER || 'neetadmin',
  password: process.env.DB_PASSWORD || 'Indraprastha@123',
});

const NEW_DB = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'indraprastha_db',
  user: process.env.DB_USER || 'neetadmin',
  password: process.env.DB_PASSWORD || 'Indraprastha@123',
});

// Parse PostgreSQL text[] array format → JS array
function parsePgArray(str) {
  if (!str || str === '{}') return [];
  // Remove outer braces
  const inner = str.replace(/^\{/, '').replace(/\}$/, '');
  const result = [];
  let current = '';
  let inQuote = false;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === '"' && inner[i - 1] !== '\\') {
      inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      result.push(current.trim().replace(/^"(.*)"$/, '$1'));
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) result.push(current.trim().replace(/^"(.*)"$/, '$1'));
  return result;
}

// Find which letter (A/B/C/D) matches correct_answer text
function findCorrectOption(options, correctAnswer) {
  const letters = ['A', 'B', 'C', 'D'];
  const correct = (correctAnswer || '').trim().toLowerCase();
  for (let i = 0; i < options.length && i < 4; i++) {
    if ((options[i] || '').trim().toLowerCase() === correct) {
      return letters[i];
    }
  }
  return 'A'; // fallback
}

async function getBatchIds() {
  const res = await NEW_DB.query('SELECT id, name, class_label FROM batches ORDER BY id');
  const map = {};
  for (const row of res.rows) {
    if (row.class_label === 'Class 11') map['11'] = row.id;
    if (row.class_label === 'Class 12') map['12'] = row.id;
    if (row.class_label === 'Dropper') map['dropper'] = row.id;
  }
  console.log('Batches found:', res.rows.map(r => `${r.id}=${r.name}`).join(', '));
  return map;
}

async function migrateQuestions(batchMap) {
  console.log('\n--- Migrating questions → practice_sets + practice_questions ---');

  const questions = await OLD_DB.query(`
    SELECT class, subject, chapter, question_text, options, correct_answer, question_image
    FROM public.questions
    WHERE question_type = 'objective'
    ORDER BY class, subject, chapter
  `);

  console.log(`Found ${questions.rows.length} objective questions`);

  // Group by (class, subject, chapter) for practice sets
  const groups = {};
  for (const q of questions.rows) {
    const key = `${q.class}|||${q.subject}|||${q.chapter}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(q);
  }

  console.log(`Creating ${Object.keys(groups).length} practice sets...`);

  let totalInserted = 0;
  for (const [key, qs] of Object.entries(groups)) {
    const [classNum, subject, chapter] = key.split('|||');
    const batchId = batchMap[classNum] || batchMap['12'];
    const classLabel = classNum === '11' ? 'Class 11' : 'Class 12';

    // Create practice set
    const setRes = await NEW_DB.query(
      `INSERT INTO practice_sets (batch_id, class_label, subject, title, topic, difficulty, estimated_minutes)
       VALUES ($1, $2, $3, $4, $5, 'Moderate', $6)
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [batchId, classLabel, subject, `${subject} - ${chapter}`, chapter, Math.ceil(qs.length * 1.5)]
    );

    if (setRes.rows.length === 0) {
      // Already exists — get its id
      const existing = await NEW_DB.query(
        `SELECT id FROM practice_sets WHERE batch_id=$1 AND subject=$2 AND topic=$3 LIMIT 1`,
        [batchId, subject, chapter]
      );
      if (existing.rows.length === 0) continue;
      var setId = existing.rows[0].id;
    } else {
      var setId = setRes.rows[0].id;
    }

    // Insert questions
    for (const q of qs) {
      const options = parsePgArray(q.options);
      if (options.length < 4) continue; // skip incomplete questions

      const [optA, optB, optC, optD] = options;
      const correctOption = findCorrectOption(options, q.correct_answer);

      try {
        await NEW_DB.query(
          `INSERT INTO practice_questions
             (practice_set_id, question, option_a, option_b, option_c, option_d, correct_option, question_image_link)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [setId, q.question_text, optA, optB, optC, optD, correctOption,
           q.question_image || null]
        );
        totalInserted++;
      } catch (_) {}
    }
  }

  console.log(`✅ Inserted ${totalInserted} practice questions`);
}

async function migrateMcqs(batchMap) {
  console.log('\n--- Migrating mcqofthedays → daily_mcqs ---');

  const mcqs = await OLD_DB.query(`
    SELECT subject, chapter, topic, question, options, correct_answer, video_link, image_url
    FROM public.mcqofthedays
  `);

  console.log(`Found ${mcqs.rows.length} MCQs`);

  // Use dropper batch or class 12 as default
  const batchId = batchMap['12'] || batchMap['dropper'] || Object.values(batchMap)[0];

  let count = 0;
  for (const m of mcqs.rows) {
    const options = parsePgArray(m.options);
    if (options.length < 4) continue;

    const [optA, optB, optC, optD] = options;
    const correctOption = findCorrectOption(options, m.correct_answer);

    try {
      await NEW_DB.query(
        `INSERT INTO daily_mcqs
           (batch_id, subject, topic, question, option_a, option_b, option_c, option_d,
            correct_option, question_image_link, is_active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,TRUE)`,
        [batchId, m.subject, m.topic || m.chapter, m.question,
         optA, optB, optC, optD, correctOption, m.image_url || null]
      );
      count++;
    } catch (_) {}
  }

  console.log(`✅ Inserted ${count} daily MCQs`);
}

async function migrateTests(batchMap) {
  console.log('\n--- Migrating tests → tests + test_questions ---');

  const tests = await OLD_DB.query(`
    SELECT id, subject, chapter, topic, questions, duration
    FROM public.tests
  `);

  console.log(`Found ${tests.rows.length} tests`);

  const batchId = batchMap['12'] || Object.values(batchMap)[0];
  let testCount = 0;
  let qCount = 0;

  for (const t of tests.rows) {
    const questions = Array.isArray(t.questions) ? t.questions : [];
    if (questions.length === 0) continue;

    const durationMins = Math.ceil((t.duration || questions.length * 60) / 60);

    const testRes = await NEW_DB.query(
      `INSERT INTO tests
         (batch_id, subject, topic, title, category, duration_minutes, question_count)
       VALUES ($1,$2,$3,$4,'Chapter test',$5,$6)
       RETURNING id`,
      [batchId, t.subject, t.topic || t.chapter,
       `${t.subject} - ${t.chapter || t.topic}`,
       durationMins, questions.length]
    );

    const testId = testRes.rows[0].id;
    testCount++;

    for (const q of questions) {
      const qText = q.questionText || q.question_text || q.question || '';
      if (!qText) continue;

      const opts = q.options || [];
      const optA = opts[0] || '';
      const optB = opts[1] || '';
      const optC = opts[2] || '';
      const optD = opts[3] || '';

      const correctRaw = q.correctAnswer || q.correct_answer || '';
      const correctOption = findCorrectOption([optA, optB, optC, optD], correctRaw);

      try {
        await NEW_DB.query(
          `INSERT INTO test_questions
             (test_id, subject, question, option_a, option_b, option_c, option_d, correct_option)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [testId, t.subject, qText, optA, optB, optC, optD, correctOption]
        );
        qCount++;
      } catch (_) {}
    }
  }

  console.log(`✅ Inserted ${testCount} tests with ${qCount} questions`);
}

async function main() {
  console.log('=== Indraprastha DB Migration ===\n');
  console.log('Connecting to databases...');

  try {
    await OLD_DB.query('SELECT 1');
    console.log('✅ Old DB connected (indraprastha_old)');
  } catch (e) {
    console.error('❌ Cannot connect to old DB:', e.message);
    process.exit(1);
  }

  try {
    await NEW_DB.query('SELECT 1');
    console.log('✅ New DB connected (indraprastha_db)');
  } catch (e) {
    console.error('❌ Cannot connect to new DB:', e.message);
    process.exit(1);
  }

  const batchMap = await getBatchIds();
  if (Object.keys(batchMap).length === 0) {
    console.error('❌ No batches found in new DB. Start the backend first to create the schema.');
    process.exit(1);
  }

  await migrateQuestions(batchMap);
  await migrateMcqs(batchMap);
  await migrateTests(batchMap);

  console.log('\n=== Migration Complete ===');
  await OLD_DB.end();
  await NEW_DB.end();
}

main().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});
