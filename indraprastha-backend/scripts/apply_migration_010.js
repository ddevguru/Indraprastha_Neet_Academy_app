require('dotenv').config({ path: 'c:/indraprastha/indraprastha-backend/.env' });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'indraprastha_db',
  user: process.env.DB_USER || 'neetadmin',
  password: process.env.DB_PASSWORD || 'Indraprastha@123',
  ssl: false
});

async function migrate() {
  console.log('Connecting to local database...');
  await pool.query(`
    ALTER TABLE book_chapters
    ADD COLUMN IF NOT EXISTS highlight_drive_link TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS highlight_drive_file_id TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS highlight_drive_folder_id TEXT DEFAULT '';
  `);
  console.log('Columns added to book_chapters.');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS chapter_highlight_questions (
      id SERIAL PRIMARY KEY,
      chapter_id INTEGER NOT NULL REFERENCES book_chapters(id) ON DELETE CASCADE,
      highlight_text TEXT NOT NULL,
      page_number INTEGER DEFAULT 1,
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_highlight_questions_chapter_id ON chapter_highlight_questions(chapter_id);
  `);
  console.log('Table chapter_highlight_questions verified.');

  const res = await pool.query(`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'book_chapters' AND column_name LIKE '%highlight%';
  `);
  console.log('Verified columns in book_chapters:', res.rows.map(r => r.column_name));
  await pool.end();
}

migrate().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});
