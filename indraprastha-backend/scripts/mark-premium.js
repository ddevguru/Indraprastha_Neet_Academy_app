const { pool } = require('../src/db');

const targetPhones = [
  '7703033682',
  '9621131030',
  '7338025635',
  '7828088544'
];

async function markPremium() {
  console.log('--- Checking database for target phone numbers ---');
  
  // Find matching users (by exact phone or last 10 digits match)
  const usersRes = await pool.query(
    `SELECT u.id, u.phone, u.full_name, u.preferred_plan, us.status as sub_status, us.expires_at 
     FROM users u
     LEFT JOIN user_subscriptions us ON us.user_id = u.id
     WHERE u.phone IN ($1, $2, $3, $4)
        OR RIGHT(REGEXP_REPLACE(u.phone, '\\D', '', 'g'), 10) IN ($1, $2, $3, $4)`,
    targetPhones
  );

  console.log(`Found ${usersRes.rows.length} existing user(s):`);
  console.table(usersRes.rows);

  const foundPhones = usersRes.rows.map(r => r.phone);
  const missingPhones = targetPhones.filter(p => !foundPhones.some(fp => fp && fp.includes(p)));

  if (missingPhones.length > 0) {
    console.log(`\nWarning: The following numbers were not found in the users table: ${missingPhones.join(', ')}`);
    console.log('Creating placeholder user entries for missing numbers so subscription can be marked...');
    
    for (const phone of missingPhones) {
      const inserted = await pool.query(
        `INSERT INTO users (phone, preferred_plan, full_name, is_profile_complete)
         VALUES ($1, 'Rank Pro', $2, false)
         ON CONFLICT (phone) DO UPDATE SET preferred_plan = 'Rank Pro'
         RETURNING id, phone, full_name, preferred_plan`,
        [phone, `User ${phone}`]
      );
      console.log(`Created user: ID ${inserted.rows[0].id} (${inserted.rows[0].phone})`);
    }
  }

  console.log('\n--- Updating subscriptions to active Rank Pro (1 year validity) ---');

  const updateSubRes = await pool.query(
    `INSERT INTO user_subscriptions (
       user_id, plan_name, starts_at, expires_at, status, updated_at
     )
     SELECT id, 'Rank Pro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 year', 'active', CURRENT_TIMESTAMP
     FROM users
     WHERE phone IN ($1, $2, $3, $4)
        OR RIGHT(REGEXP_REPLACE(phone, '\\D', '', 'g'), 10) IN ($1, $2, $3, $4)
     ON CONFLICT (user_id)
     DO UPDATE SET
       plan_name = 'Rank Pro',
       starts_at = CURRENT_TIMESTAMP,
       expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
       status = 'active',
       updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    targetPhones
  );

  await pool.query(
    `UPDATE users
     SET preferred_plan = 'Rank Pro'
     WHERE phone IN ($1, $2, $3, $4)
        OR RIGHT(REGEXP_REPLACE(phone, '\\D', '', 'g'), 10) IN ($1, $2, $3, $4)`,
    targetPhones
  );

  console.log(`Updated ${updateSubRes.rows.length} subscription record(s):`);
  console.table(updateSubRes.rows);

  console.log('\n--- Final Verification ---');
  const finalCheck = await pool.query(
    `SELECT u.id, u.phone, u.full_name, u.preferred_plan, us.plan_name as sub_plan, us.status, us.starts_at, us.expires_at
     FROM users u
     JOIN user_subscriptions us ON us.user_id = u.id
     WHERE u.phone IN ($1, $2, $3, $4)
        OR RIGHT(REGEXP_REPLACE(u.phone, '\\D', '', 'g'), 10) IN ($1, $2, $3, $4)`,
    targetPhones
  );
  console.table(finalCheck.rows);

  await pool.end();
}

markPremium().catch(err => {
  console.error('Error executing markPremium:', err);
  process.exit(1);
});
