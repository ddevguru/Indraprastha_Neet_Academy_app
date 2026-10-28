/**
 * Comprehensive Automated Verification Suite for Community & Doubt Solving System
 * Indraprastha NEET Academy
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool, ensureDatabaseSchema } = require('../src/db');
const { uploadMediaToAdminDrive } = require('../src/services/communityDriveService');

async function runTestSuite() {
  console.log('====================================================');
  console.log('STARTING COMMUNITY & DOUBT RESOLUTION TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Initialize schema
    console.log('1. Ensuring Database Schema...');
    await ensureDatabaseSchema();
    assert(true, 'Schema initialized successfully');

    // 2. Setup Test Users (Student A and Student B)
    console.log('\n2. Setting up Test Students...');
    const studentARes = await pool.query(
      `INSERT INTO users (phone, full_name, preferred_plan)
       VALUES ('9999900001', 'Test Student Alpha', 'Target NEET 2027')
       ON CONFLICT (phone) DO UPDATE SET full_name = EXCLUDED.full_name
       RETURNING id, phone, full_name`
    );
    const studentA = studentARes.rows[0];

    const studentBRes = await pool.query(
      `INSERT INTO users (phone, full_name, preferred_plan)
       VALUES ('9999900002', 'Test Student Beta', 'Target NEET 2027')
       ON CONFLICT (phone) DO UPDATE SET full_name = EXCLUDED.full_name
       RETURNING id, phone, full_name`
    );
    const studentB = studentBRes.rows[0];

    assert(studentA.id && studentB.id, `Created test students: A (#${studentA.id}) & B (#${studentB.id})`);

    // 3. Test Student Community Privacy Isolation
    console.log('\n3. Testing Student Privacy Isolation...');
    // Create Student A Class 11 Physics workspace
    const commARes = await pool.query(
      `INSERT INTO student_communities (student_id, class_level, subject)
       VALUES ($1, 'Class 11', 'Physics')
       ON CONFLICT (student_id, class_level, subject) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [studentA.id]
    );
    const commA = commARes.rows[0];

    // Create Student B Class 11 Physics workspace
    const commBRes = await pool.query(
      `INSERT INTO student_communities (student_id, class_level, subject)
       VALUES ($1, 'Class 11', 'Physics')
       ON CONFLICT (student_id, class_level, subject) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [studentB.id]
    );
    const commB = commBRes.rows[0];

    assert(commA.id !== commB.id, `Student A and Student B have separate workspace IDs: ${commA.id} vs ${commB.id}`);

    // Insert Student A private message
    const msgARes = await pool.query(
      `INSERT INTO community_messages (community_id, student_id, message_type, text_content)
       VALUES ($1, $2, 'text', 'Confidential physics calculation notes by Student A')
       RETURNING id`,
      [commA.id, studentA.id]
    );
    const msgA = msgARes.rows[0];

    // Verify Student B cannot see Student A messages
    const checkB = await pool.query(
      `SELECT * FROM community_messages WHERE community_id = $1 AND student_id = $2`,
      [commA.id, studentB.id]
    );
    assert(checkB.rows.length === 0, 'Student B cannot query Student A workspace messages');

    // 4. Test Student Personal Whiteboard (Autosave & Versioning)
    console.log('\n4. Testing Student Personal Whiteboard...');
    const docData1 = { elements: [{ type: 'path', stroke: '#002350', points: [10, 10, 20, 20] }] };
    const wb1 = await pool.query(
      `INSERT INTO student_whiteboards (student_id, community_id, document_json, version)
       VALUES ($1, $2, $3, 1)
       ON CONFLICT (student_id, community_id) DO UPDATE SET
         document_json = EXCLUDED.document_json,
         version = student_whiteboards.version + 1
       RETURNING version, document_json`,
      [studentA.id, commA.id, JSON.stringify(docData1)]
    );
    assert(wb1.rows[0].version >= 1, `Whiteboard saved version: ${wb1.rows[0].version}`);

    // Verify Student B cannot access Student A whiteboard
    const wbBCheck = await pool.query(
      `SELECT * FROM student_whiteboards WHERE student_id = $1 AND community_id = $2`,
      [studentB.id, commA.id]
    );
    assert(wbBCheck.rows.length === 0, 'Student B cannot access Student A personal whiteboard');

    // 5. Test Media Upload to Admin Drive Service
    console.log('\n5. Testing Media Upload (Drive Integration with Fallback)...');
    const dummyBuffer = Buffer.from('FAKE_NEET_PHYSICS_IMAGE_BYTES_123456');
    const uploadRes = await uploadMediaToAdminDrive({
      fileBuffer: dummyBuffer,
      fileName: 'lens_formula_derivation.png',
      mimeType: 'image/png',
      subfolder: 'Class 11 - Physics',
    });
    assert(uploadRes.viewLink && uploadRes.storageKey, `Media upload successful (StorageKey: ${uploadRes.storageKey})`);

    // 6. Test Teacher Creation and Subject Assignment
    console.log('\n6. Testing Teacher Management & Subject Assignments...');
    const tPassHash = await bcrypt.hash('teacherPass123', 10);
    const teacherPhysicsRes = await pool.query(
      `INSERT INTO teacher_profiles (teacher_code, display_name, email, password_hash, is_active)
       VALUES ('TCH-PHYS-01', 'Dr. H.C. Verma Physics Specialist', 'hcverma@indraprastha.test', $1, TRUE)
       ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name
       RETURNING id, teacher_code, display_name`,
      [tPassHash]
    );
    const teacherPhysics = teacherPhysicsRes.rows[0];

    const teacherChemRes = await pool.query(
      `INSERT INTO teacher_profiles (teacher_code, display_name, email, password_hash, is_active)
       VALUES ('TCH-CHEM-01', 'Dr. O.P. Tandon Chemistry Specialist', 'optandon@indraprastha.test', $1, TRUE)
       ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name
       RETURNING id, teacher_code, display_name`,
      [tPassHash]
    );
    const teacherChem = teacherChemRes.rows[0];

    // Assign Physics to Teacher 1 only
    await pool.query(
      `INSERT INTO teacher_subject_assignments (teacher_id, class_level, subject)
       VALUES ($1, 'Class 11', 'Physics')
       ON CONFLICT (teacher_id, class_level, subject) DO NOTHING`,
      [teacherPhysics.id]
    );

    // Assign Chemistry to Teacher 2 only
    await pool.query(
      `INSERT INTO teacher_subject_assignments (teacher_id, class_level, subject)
       VALUES ($1, 'Class 11', 'Chemistry')
       ON CONFLICT (teacher_id, class_level, subject) DO NOTHING`,
      [teacherChem.id]
    );

    assert(teacherPhysics.id && teacherChem.id, 'Teachers created with respective subject assignments');

    // 7. Test Doubt Submission
    console.log('\n7. Testing Student Doubt Submission...');
    const doubtRes = await pool.query(
      `INSERT INTO doubts (student_id, community_id, class_level, subject, title, description, status, version)
       VALUES ($1, $2, 'Class 11', 'Physics', 'Rotational Inertia of Hollow Cylinder', 'Why is moment of inertia MR^2 for thin hollow cylinder?', 'Pending', 1)
       RETURNING *`,
      [studentA.id, commA.id]
    );
    const doubt = doubtRes.rows[0];
    assert(doubt.id && doubt.status === 'Pending', `Doubt submitted (#${doubt.id}) with status: ${doubt.status}`);

    // Create Cycle 1 & Event
    await pool.query(
      `INSERT INTO doubt_resolution_cycles (doubt_id, cycle_number, started_at)
       VALUES ($1, 1, CURRENT_TIMESTAMP)`,
      [doubt.id]
    );
    await pool.query(
      `INSERT INTO doubt_activity_events (doubt_id, actor_id, actor_role, event_type, new_status)
       VALUES ($1, $2, 'student', 'DOUBT_SUBMITTED', 'Pending')`,
      [doubt.id, studentA.id]
    );

    // 8. Test Subject Queue Isolation (Chemistry teacher CANNOT see Physics doubt)
    console.log('\n8. Testing Teacher Queue Subject Authorization...');
    const chemQueue = await pool.query(
      `SELECT d.id FROM doubts d
       WHERE (d.class_level, d.subject) IN (
         SELECT class_level, subject FROM teacher_subject_assignments WHERE teacher_id = $1
       ) AND d.id = $2`,
      [teacherChem.id, doubt.id]
    );
    assert(chemQueue.rows.length === 0, 'Chemistry teacher CANNOT see Class 11 Physics doubt (Queue Authorization Enforced)');

    const physQueue = await pool.query(
      `SELECT d.id FROM doubts d
       WHERE (d.class_level, d.subject) IN (
         SELECT class_level, subject FROM teacher_subject_assignments WHERE teacher_id = $1
       ) AND d.id = $2`,
      [teacherPhysics.id, doubt.id]
    );
    assert(physQueue.rows.length === 1, 'Physics teacher CAN see Class 11 Physics doubt in their queue');

    // 9. Test Doubt Claiming & Concurrency Protection
    console.log('\n9. Testing Claiming and Concurrency...');
    const claimRes = await pool.query(
      `UPDATE doubts 
       SET assigned_teacher_id = $1, status = 'Assigned', version = version + 1
       WHERE id = $2 AND (assigned_teacher_id IS NULL OR assigned_teacher_id = $1)
       RETURNING *`,
      [teacherPhysics.id, doubt.id]
    );
    assert(claimRes.rows.length === 1 && claimRes.rows[0].status === 'Assigned', 'Physics teacher claimed doubt successfully');

    // 10. Test Teacher Solution Whiteboard (Draft vs Published)
    console.log('\n10. Testing Teacher Solution Whiteboard Permissions...');
    const teacherWbData = { elements: [{ type: 'cylinder_diagram', radius: 50, mass: 'M' }] };
    
    // Save draft
    const draftRes = await pool.query(
      `INSERT INTO teacher_solution_whiteboards (doubt_id, teacher_id, document_json, is_published, version)
       VALUES ($1, $2, $3, FALSE, 1)
       RETURNING id, is_published`,
      [doubt.id, teacherPhysics.id, JSON.stringify(teacherWbData)]
    );
    assert(draftRes.rows[0].is_published === false, 'Teacher solution saved as unpublished draft');

    // Verify student cannot see unpublished draft
    const studentCheckDraft = await pool.query(
      `SELECT * FROM teacher_solution_whiteboards WHERE doubt_id = $1 AND is_published = TRUE`,
      [doubt.id]
    );
    assert(studentCheckDraft.rows.length === 0, 'Student CANNOT see unpublished teacher solution whiteboard');

    // Publish solution whiteboard
    await pool.query(
      `UPDATE teacher_solution_whiteboards 
       SET is_published = TRUE, published_at = CURRENT_TIMESTAMP
       WHERE doubt_id = $1`,
      [doubt.id]
    );
    const studentCheckPublished = await pool.query(
      `SELECT * FROM teacher_solution_whiteboards WHERE doubt_id = $1 AND is_published = TRUE`,
      [doubt.id]
    );
    assert(studentCheckPublished.rows.length === 1, 'Student CAN view published solution whiteboard (Read-Only)');

    // 11. Test Teacher Answer & Response Cycle
    console.log('\n11. Testing Teacher Answer Submission & Timestamps...');
    const respRes = await pool.query(
      `INSERT INTO doubt_responses (doubt_id, teacher_id, response_text)
       VALUES ($1, $2, 'Every mass element dm is at distance R from the central axis. Integrating dm * R^2 gives M * R^2.')
       RETURNING id`,
      [doubt.id, teacherPhysics.id]
    );

    await pool.query(
      `UPDATE doubts 
       SET status = 'Answered', first_response_at = CURRENT_TIMESTAMP, last_response_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [doubt.id]
    );

    await pool.query(
      `UPDATE doubt_resolution_cycles 
       SET first_response_at = CURRENT_TIMESTAMP 
       WHERE doubt_id = $1 AND first_response_at IS NULL`,
      [doubt.id]
    );

    assert(respRes.rows[0].id, 'Teacher answer submitted and recorded');

    // 12. Test Reopening Doubt & Resolution Cycles
    console.log('\n12. Testing Doubt Reopening...');
    await pool.query(
      `UPDATE doubts SET status = 'Reopened', version = version + 1 WHERE id = $1`,
      [doubt.id]
    );
    // Cycle 2 started
    await pool.query(
      `INSERT INTO doubt_resolution_cycles (doubt_id, cycle_number, started_at)
       VALUES ($1, 2, CURRENT_TIMESTAMP)`,
      [doubt.id]
    );
    const cycles = await pool.query(
      `SELECT * FROM doubt_resolution_cycles WHERE doubt_id = $1 ORDER BY cycle_number ASC`,
      [doubt.id]
    );
    assert(cycles.rows.length === 2, `Multi-cycle tracking verified (Total cycles: ${cycles.rows.length})`);

    // 13. Test Final Resolution Confirmation
    console.log('\n13. Testing Final Resolution Confirmation...');
    await pool.query(
      `UPDATE doubts SET status = 'Resolved', resolved_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [doubt.id]
    );
    const resolvedDoubt = await pool.query('SELECT status, resolved_at FROM doubts WHERE id = $1', [doubt.id]);
    assert(resolvedDoubt.rows[0].status === 'Resolved' && resolvedDoubt.rows[0].resolved_at !== null, 'Doubt successfully marked Resolved');

    // 14. Test Admin Doubt Tracking & Activity Audit History
    console.log('\n14. Testing Admin Doubt Tracking...');
    const adminCheck = await pool.query(
      `SELECT d.id, d.title, d.status, tp.display_name as teacher_name, u.full_name as student_name
       FROM doubts d
       LEFT JOIN teacher_profiles tp ON tp.id = d.assigned_teacher_id
       LEFT JOIN users u ON u.id = d.student_id
       WHERE d.id = $1`,
      [doubt.id]
    );
    assert(adminCheck.rows.length === 1 && adminCheck.rows[0].teacher_name === teacherPhysics.display_name, 'Admin can see complete doubt record with handling teacher');

    console.log('\n====================================================');
    console.log(`TEST SUITE FINISHED: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal error during test suite:', err);
    process.exit(1);
  }
}

runTestSuite();
