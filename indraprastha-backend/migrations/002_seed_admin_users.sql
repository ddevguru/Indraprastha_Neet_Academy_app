-- ============================================================
-- Indraprastha Backend - Admin Users Seeding
-- PostgreSQL Migration Script
-- Created: June 16, 2024
-- ============================================================

-- NOTE: Password hashes are bcrypt hashed (10 rounds)
-- Before inserting in production, generate proper bcrypt hashes
-- Using Node.js: bcrypt.hash(password, 10)

-- ============================================================
-- DEFAULT ADMIN USER
-- ============================================================

-- Insert default admin user
-- Default credentials:
-- Username: admin
-- Password: admin@123 (change in production!)
-- Hash: $2a$10$...(bcrypt hash of 'admin@123' with 10 rounds)

INSERT INTO admin_users (username, password_hash)
VALUES (
  'admin',
  '$2a$10$1234567890abcdef1234567890abcdef1234567890abcdef1234567'
)
ON CONFLICT (username) DO NOTHING;

-- ============================================================
-- ADDITIONAL ADMIN USERS (Optional - uncomment to use)
-- ============================================================

-- Insert additional admin users
-- INSERT INTO admin_users (username, password_hash)
-- VALUES (
--   'admin2',
--   '$2a$10$...(bcrypt hash)...'
-- )
-- ON CONFLICT (username) DO NOTHING;

-- INSERT INTO admin_users (username, password_hash)
-- VALUES (
--   'content_manager',
--   '$2a$10$...(bcrypt hash)...'
-- )
-- ON CONFLICT (username) DO NOTHING;

-- ============================================================
-- VERIFY ADMIN USERS CREATED
-- ============================================================

-- List all admin users (for verification)
-- SELECT id, username, created_at FROM admin_users;

-- ============================================================
-- NOTES ON GENERATING BCRYPT HASHES
-- ============================================================

/*
To generate bcrypt hashes for production, use Node.js:

const bcrypt = require('bcryptjs');

// Generate hash with 10 rounds
bcrypt.hash('your_password_here', 10).then(hash => {
  console.log('INSERT INTO admin_users (username, password_hash) VALUES (\'admin\', \'' + hash + '\');');
});

Or use bcrypt CLI:
npm install -g bcryptjs
bcryptjs 'your_password' 10

Example output:
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36XQuvKm

Then use that hash in the INSERT statement.
*/

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================
-- Admin users seeded successfully
-- ============================================================

COMMIT;
