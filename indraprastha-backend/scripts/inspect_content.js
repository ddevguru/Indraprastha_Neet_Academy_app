const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../src/db.js');

async function inspectContent() {
  try {
    const courses = await db.query('SELECT * FROM courses');
    console.log('Courses:', courses.rows);

    const batches = await db.query('SELECT * FROM batches');
    console.log('Batches:', batches.rows);

    const books = await db.query('SELECT id, title, subject, category FROM books');
    console.log('Books:', books.rows);

    const chapters = await db.query('SELECT id, book_id, title FROM book_chapters LIMIT 10');
    console.log('Chapters sample:', chapters.rows);

    const practiceSets = await db.query('SELECT id, title, subject, topic FROM practice_sets LIMIT 10');
    console.log('Practice Sets sample:', practiceSets.rows);

    const tests = await db.query('SELECT id, title, subject, topic FROM tests LIMIT 10');
    console.log('Tests sample:', tests.rows);

    const testQ = await db.query('SELECT id, test_id, subject, chapter, topic FROM test_questions LIMIT 10');
    console.log('Test Questions sample:', testQ.rows);

    const users = await db.query('SELECT id, phone, full_name, batch_id FROM users');
    console.log('Users in DB:', users.rows);

    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

inspectContent();

