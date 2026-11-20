const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../src/db.js');

async function runMigration() {
  try {
    console.log('Running Migration 011: AI Learning Intelligence Tables...');
    const sql = fs.readFileSync(path.join(__dirname, '../migrations/011_create_ai_learning_intelligence_tables.sql'), 'utf8');
    await db.query(sql);
    console.log('Migration 011 SQL executed successfully.');

    // Verify tables
    const checkRes = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_name IN (
          'student_topic_learning_state',
          'student_repeated_mistakes',
          'student_ai_recommendations',
          'ai_model_registry'
        )
      ORDER BY table_name;
    `);

    console.log('Verified created tables:', checkRes.rows.map(r => r.table_name));

    if (checkRes.rows.length === 4) {
      console.log('ALL 4 AI LEARNING INTELLIGENCE TABLES CREATED & VERIFIED!');
      process.exit(0);
    } else {
      console.error('Mismatch in table count. Found:', checkRes.rows.length);
      process.exit(1);
    }
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();

