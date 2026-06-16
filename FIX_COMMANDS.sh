#!/bin/bash

# ============================================================
# Quick Fix Commands - Run on Server
# ============================================================

echo "🔧 Starting Fixes..."

# SSH to server first:
# ssh drrahulkumar8@indraprastha-server

cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend

# ============================================================
# FIX 1: Database Ambiguous Column Error
# ============================================================

echo "Fix 1: Updating database trigger for ambiguous column..."

psql -h localhost -p 5432 -d indraprastha_db -U neetadmin << 'SQL'

-- Drop old trigger
DROP TRIGGER IF EXISTS trg_update_analytics_on_test ON test_attempts;
DROP FUNCTION IF EXISTS fn_update_analytics_on_test();

-- Create fixed function
CREATE OR REPLACE FUNCTION fn_update_analytics_on_test()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total tests and average score
  UPDATE ai_user_analytics
  SET
    total_tests_taken = total_tests_taken + 1,
    average_test_score = (
      (average_test_score * (total_tests_taken) + NEW.score) /
      (total_tests_taken + 1)
    ),
    updated_at = CURRENT_TIMESTAMP
  WHERE user_id = NEW.user_id;

  -- Create study log entry if not exists (FIX: specify table name)
  INSERT INTO ai_study_logs (user_id, log_date, tests_taken_today)
  VALUES (NEW.user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, log_date) DO UPDATE
  SET tests_taken_today = ai_study_logs.tests_taken_today + 1,
      updated_at = CURRENT_TIMESTAMP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER trg_update_analytics_on_test
AFTER INSERT ON test_attempts
FOR EACH ROW
EXECUTE FUNCTION fn_update_analytics_on_test();

-- Verify
SELECT * FROM information_schema.routines WHERE routine_name = 'fn_update_analytics_on_test';
SQL

echo "✅ Fix 1 Complete!"

# ============================================================
# FIX 2: Add Performance Indexes
# ============================================================

echo "Fix 2: Adding performance indexes..."

psql -h localhost -p 5432 -d indraprastha_db -U neetadmin << 'SQL'

-- Add indexes if not present
CREATE INDEX IF NOT EXISTS idx_test_questions_test_subject_topic
  ON test_questions(test_id, subject, topic);

CREATE INDEX IF NOT EXISTS idx_ai_study_logs_user_date
  ON ai_study_logs(user_id, log_date);

CREATE INDEX IF NOT EXISTS idx_explanation_images_question
  ON explanation_images(test_question_id, order_index);

CREATE INDEX IF NOT EXISTS idx_tests_batch_id
  ON tests(batch_id);

CREATE INDEX IF NOT EXISTS idx_books_batch_id
  ON books(batch_id);

CREATE INDEX IF NOT EXISTS idx_practice_sets_batch_id
  ON practice_sets(batch_id);

-- Analyze for query optimization
ANALYZE;
VACUUM ANALYZE;

-- Show created indexes
SELECT schemaname, tablename, indexname FROM pg_indexes
WHERE schemaname = 'public'
AND indexname LIKE 'idx_%'
ORDER BY indexname;
SQL

echo "✅ Fix 2 Complete!"

# ============================================================
# FIX 3: Update Backend Config for Connection Pooling
# ============================================================

echo "Fix 3: Updating connection pooling..."

cat > src/db-config.js << 'EOF'
// Connection pool configuration for performance
module.exports = {
  pool: {
    max: 20,                      // Max concurrent connections
    min: 2,                        // Min idle connections
    idleTimeoutMillis: 30000,     // 30 seconds
    connectionTimeoutMillis: 2000, // 2 seconds
    statement_timeout: 30000,      // 30 seconds per query
    query_timeout: 30000,
  },
  application_name: 'indraprastha_backend'
};
EOF

echo "✅ Fix 3 Complete!"

# ============================================================
# FIX 4: Verify Database Health
# ============================================================

echo "Fix 4: Checking database health..."

psql -h localhost -p 5432 -d indraprastha_db -U neetadmin << 'SQL'

-- Check table sizes
SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;

-- Check missing indexes
SELECT schemaname, tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename NOT IN (
  SELECT DISTINCT tablename FROM pg_indexes WHERE schemaname = 'public'
);

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC
LIMIT 10;
SQL

echo "✅ Fix 4 Complete!"

# ============================================================
# FIX 5: Restart Backend
# ============================================================

echo "Fix 5: Restarting backend..."

pkill -f "node src/index.js"
sleep 2

# Start backend
nohup npm start > backend.log 2>&1 &

echo "Waiting for backend to start..."
sleep 5

# Verify
if curl -s http://localhost:3000/health | grep -q "ok"; then
  echo "✅ Backend is running!"
else
  echo "❌ Backend failed to start. Check logs:"
  tail -20 backend.log
fi

echo ""
echo "============================================================"
echo "✅ ALL FIXES COMPLETE!"
echo "============================================================"
echo ""
echo "Next Steps:"
echo "1. Test practice question upload"
echo "2. Test submission from mobile app"
echo "3. Check logs: cat logs/indraprastha-errors-\$(date +%Y-%m-%d).json | jq '.'"
echo "4. Monitor performance"
echo ""

