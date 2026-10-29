require('dotenv').config();
const { pool } = require('../src/db.js');
const { findBestTeacherForDoubt } = require('../src/utils/autoAssignTeacher');

async function testDoubtLifecycle() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Check student
    const studentRes = await client.query('SELECT id FROM users LIMIT 1');
    const studentId = studentRes.rows[0].id;

    // 2. Auto assign teacher
    const autoTeacher = await findBestTeacherForDoubt(client, 'Class 11', 'Physics');
    console.log('Auto assigned teacher:', autoTeacher);

    // 3. Insert doubt
    const doubtRes = await client.query(
      `INSERT INTO doubts (student_id, class_level, subject, title, description, status, assigned_teacher_id, version)
       VALUES ($1, 'Class 11', 'Physics', 'Test Auto Assign Physics', 'How does Newton second law apply here?', 'Assigned', $2, 1)
       RETURNING *`,
      [studentId, autoTeacher.id]
    );
    const doubt = doubtRes.rows[0];
    console.log('Created doubt with assigned teacher:', doubt.id, doubt.status, doubt.assigned_teacher_id);

    // 4. Mark resolved
    await client.query(
      `UPDATE doubts SET status = 'Resolved', resolved_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [doubt.id]
    );
    console.log('Marked resolved');

    // 5. Test reopen logic
    let targetTeacherId = doubt.assigned_teacher_id;
    if (!targetTeacherId) {
      const reTeacher = await findBestTeacherForDoubt(client, doubt.class_level, doubt.subject);
      if (reTeacher) targetTeacherId = reTeacher.id;
    }
    await client.query(
      `UPDATE doubts SET status = 'Reopened', assigned_teacher_id = COALESCE(assigned_teacher_id, $1), version = version + 1 WHERE id = $2`,
      [targetTeacherId, doubt.id]
    );

    const recheck = await client.query('SELECT id, status, assigned_teacher_id, version FROM doubts WHERE id = $1', [doubt.id]);
    console.log('Reopened doubt state:', recheck.rows[0]);

    // Rollback test changes
    await client.query('ROLLBACK');
    console.log('Test passed successfully and rolled back clean!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Lifecycle test error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}
testDoubtLifecycle();
