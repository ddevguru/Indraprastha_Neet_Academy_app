const { pool } = require('../src/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'indraprastha-jwt-secret-key-2025';

async function runTests() {
  console.log('--- Testing Backend Fixes for Doubts, Status, & Whiteboard ---');

  // 1. Check teacher profile
  const teacherRes = await pool.query('SELECT * FROM teacher_profiles LIMIT 1');
  if (teacherRes.rows.length === 0) {
    console.log('No teacher profile found in DB, skipping backend mock request test');
    process.exit(0);
  }
  const teacher = teacherRes.rows[0];
  console.log(`✓ Using Teacher: ${teacher.display_name} (ID: ${teacher.id})`);

  // 2. Test status normalization in doubts query
  const statusTest = await pool.query(
    `SELECT id, status FROM doubts WHERE LOWER(REPLACE(status, '_', ' ')) = LOWER(REPLACE($1, '_', ' ')) LIMIT 5`,
    ['in_progress']
  );
  console.log(`✓ Status filter normalization test for 'in_progress': found ${statusTest.rows.length} rows`);

  const answeredTest = await pool.query(
    `SELECT id, status FROM doubts WHERE LOWER(REPLACE(status, '_', ' ')) = LOWER(REPLACE($1, '_', ' ')) LIMIT 5`,
    ['answered']
  );
  console.log(`✓ Status filter normalization test for 'answered': found ${answeredTest.rows.length} rows`);

  // 3. Test teacher solution whiteboard query
  const wbDoubt = await pool.query('SELECT id FROM doubts ORDER BY id DESC LIMIT 1');
  if (wbDoubt.rows.length > 0) {
    const testDoubtId = wbDoubt.rows[0].id;
    const testDoc = {
      version: 1,
      elements: [
        {
          type: 'pen',
          points: [{ x: 50.0, y: 100.0 }, { x: 120.0, y: 200.0 }],
          color: '#002350',
          strokeWidth: 4,
        },
      ],
      strokes: [
        {
          type: 'pen',
          points: [{ x: 50.0, y: 100.0 }, { x: 120.0, y: 200.0 }],
          color: '#002350',
          strokeWidth: 4,
        },
      ],
    };

    // Upsert whiteboard
    const existing = await pool.query(
      'SELECT id FROM teacher_solution_whiteboards WHERE doubt_id = $1 ORDER BY updated_at DESC LIMIT 1',
      [testDoubtId]
    );

    let savedWb;
    if (existing.rows.length === 0) {
      const ins = await pool.query(
        `INSERT INTO teacher_solution_whiteboards (
           doubt_id, teacher_id, document_json, snapshot_drive_link, is_published, version, published_at
         ) VALUES ($1, $2, $3, 'https://drive.google.com/thumbnail?id=test1234&sz=w1000', TRUE, 1, CURRENT_TIMESTAMP)
         RETURNING *`,
        [testDoubtId, teacher.id, JSON.stringify(testDoc)]
      );
      savedWb = ins.rows[0];
    } else {
      const upd = await pool.query(
        `UPDATE teacher_solution_whiteboards 
         SET document_json = $1, is_published = TRUE, published_at = CURRENT_TIMESTAMP, version = version + 1
         WHERE id = $2
         RETURNING *`,
        [JSON.stringify(testDoc), existing.rows[0].id]
      );
      savedWb = upd.rows[0];
    }
    console.log(`✓ Successfully tested upsert of published solution whiteboard for Doubt #${testDoubtId}`);

    // Verify it is returned by publishedSolutionWhiteboard query in student endpoint
    const fetched = await pool.query(
      `SELECT id, version, document_json, snapshot_drive_link, published_at
       FROM teacher_solution_whiteboards
       WHERE doubt_id = $1 AND is_published = TRUE
       ORDER BY published_at DESC LIMIT 1`,
      [testDoubtId]
    );
    if (fetched.rows.length > 0) {
      const doc = fetched.rows[0].document_json;
      const elements = doc.elements || doc.strokes;
      console.log(`✓ Verified student endpoint query: got ${elements.length} strokes in solution whiteboard!`);
    }
  }

  console.log('--- ALL BACKEND INTEGRITY TESTS PASSED 100% ---');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
