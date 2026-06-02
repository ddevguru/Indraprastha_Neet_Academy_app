/**
 * Migration: reads indraprastha_final.sql directly → inserts into indraprastha_db
 * No need to import the old SQL into a separate database.
 *
 * Usage: node migrate_old_data.js
 */

require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const NEW_DB = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'indraprastha_db',
  user: process.env.DB_USER || 'neetadmin',
  password: process.env.DB_PASSWORD || 'Indraprastha@123',
});

const SQL_FILE = path.join(__dirname, 'indraprastha_final.sql');

// ─── SQL file parser ──────────────────────────────────────────────────────────

function parseSqlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const tables = {};
  let currentTable = null;
  let currentCols = [];
  let inCopy = false;

  for (const line of lines) {
    const stripped = line.trimEnd();

    if (stripped.startsWith('COPY public.') && stripped.includes('FROM stdin')) {
      const m = stripped.match(/COPY public\.(\w+)\s*\(([^)]+)\)/);
      if (m) {
        currentTable = m[1];
        currentCols = m[2].split(',').map(c => c.trim());
        tables[currentTable] = { cols: currentCols, rows: [] };
        inCopy = true;
      }
      continue;
    }

    if (stripped === '\\.' && inCopy) {
      inCopy = false;
      currentTable = null;
      continue;
    }

    if (inCopy && currentTable && stripped) {
      const values = stripped.split('\t').map(v => v === '\\N' ? null : v);
      const row = {};
      currentCols.forEach((col, i) => { row[col] = values[i] ?? null; });
      tables[currentTable].rows.push(row);
    }
  }

  return tables;
}

// ─── Parse PostgreSQL array format → JS array ─────────────────────────────────

function parsePgArray(str) {
  if (!str || str === '{}') return [];
  const inner = str.replace(/^\{/, '').replace(/\}$/, '');
  const result = [];
  let current = '';
  let inQuote = false;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === '"' && inner[i - 1] !== '\\') {
      inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      result.push(current.trim().replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'));
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    result.push(current.trim().replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'));
  }
  return result;
}

function findCorrectOption(options, correctAnswer) {
  const letters = ['A', 'B', 'C', 'D'];
  const correct = (correctAnswer || '').trim().toLowerCase();
  for (let i = 0; i < options.length && i < 4; i++) {
    if ((options[i] || '').trim().toLowerCase() === correct) return letters[i];
  }
  return 'A';
}

// ─── Migration functions ──────────────────────────────────────────────────────

async function getBatchIds() {
  const res = await NEW_DB.query('SELECT id, name, class_label FROM batches ORDER BY id');
  const map = {};
  for (const row of res.rows) {
    if (row.class_label === 'Class 11') map['11'] = row.id;
    if (row.class_label === 'Class 12') map['12'] = row.id;
    if (row.class_label === 'Dropper')  map['dropper'] = row.id;
  }
  console.log('Batches:', res.rows.map(r => `${r.id}=${r.class_label}`).join(', '));
  return map;
}

async function migrateQuestions(tables, batchMap) {
  console.log('\n--- questions → practice_sets + practice_questions ---');
  const rows = (tables['questions'] || { rows: [] }).rows
    .filter(r => r.question_type === 'objective');

  console.log(`Found ${rows.length} objective questions`);
  if (rows.length === 0) return;

  // Group by class + subject + chapter
  const groups = {};
  for (const q of rows) {
    const key = `${q.class}|||${q.subject}|||${q.chapter}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(q);
  }

  let totalQ = 0;
  let batchCount = 0;

  for (const [key, qs] of Object.entries(groups)) {
    const [classNum, subject, chapter] = key.split('|||');
    const batchId = batchMap[classNum] || batchMap['12'];
    const classLabel = classNum === '11' ? 'Class 11' : 'Class 12';

    const setRes = await NEW_DB.query(
      `INSERT INTO practice_sets (batch_id, class_label, subject, title, topic, difficulty, estimated_minutes)
       VALUES ($1,$2,$3,$4,$5,'Moderate',$6) RETURNING id`,
      [batchId, classLabel, subject, `${subject} - ${chapter}`, chapter, Math.ceil(qs.length * 1.5)]
    );
    const setId = setRes.rows[0].id;
    batchCount++;

    for (const q of qs) {
      const options = parsePgArray(q.options);
      if (options.length < 2) continue;

      const optA = options[0] || '';
      const optB = options[1] || '';
      const optC = options[2] || '';
      const optD = options[3] || '';
      const correctOption = findCorrectOption(options, q.correct_answer);

      try {
        await NEW_DB.query(
          `INSERT INTO practice_questions
             (practice_set_id, question, option_a, option_b, option_c, option_d,
              correct_option, question_image_link)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [setId, q.question_text, optA, optB, optC, optD, correctOption,
           q.question_image || null]
        );
        totalQ++;
      } catch (_) {}
    }

    if (batchCount % 50 === 0) {
      process.stdout.write(`  ${batchCount} sets, ${totalQ} questions...\r`);
    }
  }

  console.log(`✅ Created ${batchCount} practice sets, inserted ${totalQ} questions`);
}

async function migrateMcqs(tables, batchMap) {
  console.log('\n--- mcqofthedays → daily_mcqs ---');
  const rows = (tables['mcqofthedays'] || { rows: [] }).rows;
  console.log(`Found ${rows.length} MCQs`);
  if (rows.length === 0) return;

  const batchId = batchMap['12'] || batchMap['dropper'] || Object.values(batchMap)[0];
  let count = 0;

  for (const m of rows) {
    const options = parsePgArray(m.options);
    if (options.length < 2) continue;
    const [optA, optB, optC, optD] = options;
    const correctOption = findCorrectOption(options, m.correct_answer);

    try {
      await NEW_DB.query(
        `INSERT INTO daily_mcqs
           (batch_id, subject, topic, question, option_a, option_b, option_c, option_d,
            correct_option, question_image_link, is_active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,TRUE)`,
        [batchId, m.subject, m.topic || m.chapter, m.question,
         optA, optB, optC || '', optD || '', correctOption, m.image_url || null]
      );
      count++;
    } catch (_) {}
  }
  console.log(`✅ Inserted ${count} daily MCQs`);
}

async function migrateTests(tables, batchMap) {
  console.log('\n--- tests → tests + test_questions ---');
  const rows = (tables['tests'] || { rows: [] }).rows;
  console.log(`Found ${rows.length} tests`);
  if (rows.length === 0) return;

  const batchId = batchMap['12'] || Object.values(batchMap)[0];
  let testCount = 0, qCount = 0;

  for (const t of rows) {
    let questions = [];
    try { questions = JSON.parse(t.questions || '[]'); } catch (_) {}
    if (!questions.length) continue;

    const durationMins = Math.ceil((parseInt(t.duration) || questions.length * 60) / 60);

    const testRes = await NEW_DB.query(
      `INSERT INTO tests (batch_id, subject, topic, title, category, duration_minutes, question_count)
       VALUES ($1,$2,$3,$4,'Chapter test',$5,$6) RETURNING id`,
      [batchId, t.subject, t.topic || t.chapter,
       `${t.subject} - ${t.chapter || t.topic}`, durationMins, questions.length]
    );
    const testId = testRes.rows[0].id;
    testCount++;

    for (const q of questions) {
      const qText = q.questionText || q.question_text || q.question || '';
      if (!qText) continue;
      const opts = q.options || [];
      const correctOption = findCorrectOption(
        [opts[0], opts[1], opts[2], opts[3]],
        q.correctAnswer || q.correct_answer || ''
      );
      try {
        await NEW_DB.query(
          `INSERT INTO test_questions
             (test_id, subject, question, option_a, option_b, option_c, option_d, correct_option)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [testId, t.subject, qText, opts[0]||'', opts[1]||'', opts[2]||'', opts[3]||'', correctOption]
        );
        qCount++;
      } catch (_) {}
    }
  }
  console.log(`✅ Inserted ${testCount} tests with ${qCount} questions`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Indraprastha Migration (reading SQL file directly) ===\n');

  if (!fs.existsSync(SQL_FILE)) {
    console.error('❌ indraprastha_final.sql not found in', __dirname);
    process.exit(1);
  }

  try {
    await NEW_DB.query('SELECT 1');
    console.log('✅ New DB connected');
  } catch (e) {
    console.error('❌ Cannot connect to new DB:', e.message);
    process.exit(1);
  }

  console.log('Parsing SQL file...');
  const tables = parseSqlFile(SQL_FILE);

  for (const [t, data] of Object.entries(tables)) {
    console.log(`  ${t}: ${data.rows.length} rows`);
  }

  const batchMap = await getBatchIds();
  if (!Object.keys(batchMap).length) {
    console.error('❌ No batches in new DB. Start the backend first.');
    process.exit(1);
  }

  await migrateQuestions(tables, batchMap);
  await migrateMcqs(tables, batchMap);
  await migrateTests(tables, batchMap);

  console.log('\n=== Migration Complete ===');
  await NEW_DB.end();
}

main().catch(e => { console.error('Migration failed:', e); process.exit(1); });
