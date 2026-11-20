const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../src/db.js');
const aiIntelligenceService = require('../src/services/aiIntelligenceService');

async function seedHistory() {
  try {
    console.log('Seeding rich test learning activity for Student ID 1 & 2...');

    // 1. Ensure test questions exist in test_questions table for learning history
    const existingQ = await db.query('SELECT COUNT(*) FROM test_questions');
    if (parseInt(existingQ.rows[0].count, 10) === 0) {
      console.log('Inserting seed test questions...');
      // Insert a dummy test if needed
      const testRes = await db.query(`
        INSERT INTO tests (id, batch_id, title, category, subject, topic, marks, question_count)
        VALUES (1, 1, 'Physics Diagnostics - Mechanics', 'Full Length', 'Physics', 'Rotational Motion', 180, 45)
        ON CONFLICT (id) DO NOTHING
        RETURNING id;
      `);

      // Insert questions covering diverse topics
      const sampleQs = [
        { id: 101, subject: 'Physics', chapter: 'Rotational Motion', topic: 'Moment of Inertia & Rolling Motion', correct: 'B' },
        { id: 102, subject: 'Physics', chapter: 'Rotational Motion', topic: 'Moment of Inertia & Rolling Motion', correct: 'A' },
        { id: 103, subject: 'Physics', chapter: 'Rotational Motion', topic: 'Moment of Inertia & Rolling Motion', correct: 'C' },
        { id: 104, subject: 'Physics', chapter: 'Laws of Motion', topic: 'Friction & Pulley Constraint Systems', correct: 'D' },
        { id: 105, subject: 'Physics', chapter: 'Laws of Motion', topic: 'Friction & Pulley Constraint Systems', correct: 'A' },
        { id: 106, subject: 'Chemistry', chapter: 'Equilibrium', topic: 'Ionic Equilibrium, Buffer & Solubility Product', correct: 'C' },
        { id: 107, subject: 'Chemistry', chapter: 'Equilibrium', topic: 'Ionic Equilibrium, Buffer & Solubility Product', correct: 'B' },
        { id: 108, subject: 'Biology', chapter: 'Principles of Inheritance and Variation', topic: 'Mendelian Genetics, Linkage & Pedigree Analysis', correct: 'A' },
        { id: 109, subject: 'Biology', chapter: 'Principles of Inheritance and Variation', topic: 'Mendelian Genetics, Linkage & Pedigree Analysis', correct: 'D' },
        { id: 110, subject: 'Biology', chapter: 'Cell: The Unit of Life', topic: 'Endomembrane System & Fluid Mosaic Model', correct: 'B' },
      ];

      for (const q of sampleQs) {
        await db.query(`
          INSERT INTO test_questions (id, test_id, subject, chapter, topic, question, option_a, option_b, option_c, option_d, correct_option)
          VALUES ($1, 1, $2, $3, $4, 'Diagnostic Question', 'Opt A', 'Opt B', 'Opt C', 'Opt D', $5)
          ON CONFLICT (id) DO NOTHING;
        `, [q.id, q.subject, q.chapter, q.topic, q.correct]);
      }
    }

    // 2. Clear old answers for student 1 to seed controlled scenarios
    await db.query('DELETE FROM user_answers WHERE user_id = 1');
    await db.query('DELETE FROM user_content_views WHERE user_id = 1');

    const now = new Date();

    // A. Chapter view for 'Rotational Motion' and 'Principles of Inheritance and Variation'
    await db.query(`
      INSERT INTO user_content_views (user_id, content_id, content_name, content_type, viewed_at)
      VALUES 
        (1, 1, 'Moment of Inertia & Rolling Motion', 'chapter_notes', $1),
        (1, 2, 'Mendelian Genetics, Linkage & Pedigree Analysis', 'chapter_notes', $2),
        (1, 3, 'Cell: The Unit of Life', 'chapter_notes', $3)
    `, [
      new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000), // 25 days ago (needs revision!)
      new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    ]);

    // B. Poorly understood + Repeated Mistakes in 'Moment of Inertia & Rolling Motion'
    // Student attempted 12 questions, got only 4 right (33% accuracy), and answered Q101 wrong 3 times!
    for (let i = 0; i < 3; i++) {
      await db.query(`
        INSERT INTO user_answers (user_id, question_id, test_id, option_key, is_correct, answered_at)
        VALUES (1, 101, 1, 'C', FALSE, $1)
      `, [new Date(now.getTime() - (3 - i) * 12 * 60 * 60 * 1000)]);
    }
    for (let i = 0; i < 2; i++) {
      await db.query(`
        INSERT INTO user_answers (user_id, question_id, test_id, option_key, is_correct, answered_at)
        VALUES (1, 102, 1, 'D', FALSE, $1)
      `, [new Date(now.getTime() - (2 - i) * 10 * 60 * 60 * 1000)]);
    }
    // A couple correct
    await db.query(`
      INSERT INTO user_answers (user_id, question_id, test_id, option_key, is_correct, answered_at)
      VALUES 
        (1, 103, 1, 'C', TRUE, $1),
        (1, 103, 1, 'C', TRUE, $2)
    `, [new Date(now.getTime() - 5 * 60 * 60 * 1000), now]);

    // C. Needs Revision: 'Mendelian Genetics'
    // Student practiced 25 days ago with high accuracy (80%), but has not practiced since
    for (let i = 0; i < 8; i++) {
      const isCorr = i < 6;
      await db.query(`
        INSERT INTO user_answers (user_id, question_id, test_id, option_key, is_correct, answered_at)
        VALUES (1, 108, 1, $1, $2, $3)
      `, [isCorr ? 'A' : 'B', isCorr, new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000)]);
    }

    // D. Good Understanding: 'Cell: The Unit of Life'
    for (let i = 0; i < 10; i++) {
      await db.query(`
        INSERT INTO user_answers (user_id, question_id, test_id, option_key, is_correct, answered_at)
        VALUES (1, 110, 1, 'B', TRUE, $1)
      `, [new Date(now.getTime() - (10 - i) * 60 * 60 * 1000)]);
    }

    // Now re-trigger AI Analysis!
    console.log('\nTriggering AI Analysis with new learning interactions...');
    await aiIntelligenceService.analyzeStudentTopicProgress(1);

    const overview = await aiIntelligenceService.getOverview(1);
    console.log('\n=== UPDATED AI OVERVIEW ===');
    console.log('Overall Mastery:', overview.overallMastery, '%');
    console.log('Category Counts:', overview.categories);
    console.log('Subject Breakdown:', overview.subjectMastery);
    console.log('Today Recommendations:');
    overview.todayRecommendations.forEach(r => {
      console.log(`  - [${r.category}] (Priority ${r.priority}) ${r.title}`);
    });

    console.log('\nSeeding complete and verified across all 4 categories!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedHistory();
