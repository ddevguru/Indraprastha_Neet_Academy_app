const { pool } = require('../src/db');

async function sync() {
  const existing = await pool.query('SELECT id, name, amount_inr FROM packages');
  console.log('Existing packages:', existing.rows);

  const has2027 = existing.rows.some(p => p.name === 'Target NEET 2027' || p.name === 'Starter');
  const has2028 = existing.rows.some(p => p.name === 'Target NEET 2028');

  // Ensure Target NEET 2027 package exists
  const existing2027 = existing.rows.find(p => p.name === 'Target NEET 2027');
  if (!existing2027) {
    const res = await pool.query(`
      INSERT INTO packages (name, price_label, validity, highlight, features_json, is_active, amount_inr)
      VALUES (
        'Target NEET 2027',
        'Rs 2999',
        'NEET 2027',
        'Complete 2-Year Target NEET 2027 Preparation',
        $1,
        TRUE,
        2999.00
      ) RETURNING id, name, amount_inr
    `, [JSON.stringify([
      "Chapterwise pyq",
      "Chapterwise test Series ( 45 question in 45 minutes )",
      "Practice Session of Every Chapter ( one session includes more than 100 question in every chapter )",
      "Grant test including full syllabus",
      "Subject Wise Test",
      "Custom Module for Wrong & bookmarked question",
      "Experince CBT Mode On our website Any time on all the questions",
      "Pratice anywhere anytime On our application",
      "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
      "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )"
    ])]);
    console.log('Created Target NEET 2027 package:', res.rows[0]);
  }

  // Ensure Target NEET 2028 package exists
  const existing2028 = existing.rows.find(p => p.name === 'Target NEET 2028');
  if (!existing2028) {
    const res = await pool.query(`
      INSERT INTO packages (name, price_label, validity, highlight, features_json, is_active, amount_inr)
      VALUES (
        'Target NEET 2028',
        'Rs 5500',
        'NEET 2028',
        'Complete Target NEET 2028 Preparation',
        $1,
        TRUE,
        5500.00
      ) RETURNING id, name, amount_inr
    `, [JSON.stringify([
      "Chapterwise pyq",
      "Chapterwise test Series ( 45 question in 45 minutes )",
      "Practice Session of Every Chapter ( one session includes more than 100 question in every chapter )",
      "Grant test including full syllabus",
      "Subject Wise Test",
      "Custom Module for Wrong & bookmarked question",
      "Experince CBT Mode On our website Any time on all the questions",
      "Pratice anywhere anytime On our application",
      "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
      "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )"
    ])]);
    console.log('Created Target NEET 2028 package:', res.rows[0]);
  }

  const all = await pool.query('SELECT id, name, price_label, amount_inr, is_active FROM packages ORDER BY id ASC');
  console.log('All packages:', all.rows);
  await pool.end();
}

sync().catch(e => {
  console.error(e);
  process.exit(1);
});
