const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../src/db.js');

async function check() {
  try {
    const tables = [
      'topic_performance',
      'student_test_analytics',
      'user_answers',
      'user_content_views',
      'user_analytics',
      'test_attempt_details',
      'test_attempts',
      'test_questions',
      'practice_questions',
      'pyqs',
      'book_chapters'
    ];
    for (const t of tables) {
      const colRes = await db.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1 
        ORDER BY ordinal_position;
      `, [t]);
      console.log(`\n=== Table '${t}' (${colRes.rows.length} cols) ===`);
      console.log(colRes.rows.map(c => `${c.column_name} (${c.data_type})`).join(', '));
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

check();
