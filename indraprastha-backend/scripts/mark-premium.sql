-- SQL Script to grant active Premium ("Rank Pro") subscription to the specified 4 phone numbers
-- Numbers: 7703033682, 9621131030, 7338025635, 7828088544

-- Step 1: Ensure users exist in the users table
INSERT INTO users (phone, preferred_plan, full_name, is_profile_complete)
VALUES 
  ('7703033682', 'Rank Pro', 'User 7703033682', false),
  ('9621131030', 'Rank Pro', 'User 9621131030', false),
  ('7338025635', 'Rank Pro', 'User 7338025635', false),
  ('7828088544', 'Rank Pro', 'User 7828088544', false)
ON CONFLICT (phone) DO UPDATE 
SET preferred_plan = 'Rank Pro';

-- Step 2: Update preferred_plan in users table
UPDATE users
SET preferred_plan = 'Rank Pro'
WHERE phone IN ('7703033682', '9621131030', '7338025635', '7828088544')
   OR RIGHT(REGEXP_REPLACE(phone, '\D', '', 'g'), 10) IN ('7703033682', '9621131030', '7338025635', '7828088544');

-- Step 3: Insert / Update active subscription in user_subscriptions (1 year validity)
INSERT INTO user_subscriptions (
  user_id, plan_name, starts_at, expires_at, status, updated_at
)
SELECT 
  id, 
  'Rank Pro', 
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP + INTERVAL '1 year', 
  'active', 
  CURRENT_TIMESTAMP
FROM users
WHERE phone IN ('7703033682', '9621131030', '7338025635', '7828088544')
   OR RIGHT(REGEXP_REPLACE(phone, '\D', '', 'g'), 10) IN ('7703033682', '9621131030', '7338025635', '7828088544')
ON CONFLICT (user_id) 
DO UPDATE SET
  plan_name = 'Rank Pro',
  starts_at = CURRENT_TIMESTAMP,
  expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
  status = 'active',
  updated_at = CURRENT_TIMESTAMP;

-- Step 4: Verify subscription status
SELECT 
  u.id, 
  u.phone, 
  u.full_name, 
  u.preferred_plan, 
  us.plan_name AS subscription_plan, 
  us.status AS subscription_status, 
  us.starts_at, 
  us.expires_at,
  (us.status = 'active' AND us.expires_at > CURRENT_TIMESTAMP) AS has_active_subscription
FROM users u
LEFT JOIN user_subscriptions us ON us.user_id = u.id
WHERE u.phone IN ('7703033682', '9621131030', '7338025635', '7828088544')
   OR RIGHT(REGEXP_REPLACE(u.phone, '\D', '', 'g'), 10) IN ('7703033682', '9621131030', '7338025635', '7828088544');
