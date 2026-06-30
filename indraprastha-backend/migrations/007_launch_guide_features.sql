-- Launch guide: Apple Sign In + onboarding checklist persistence
ALTER TABLE users ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_checklist JSONB DEFAULT '{}'::jsonb;
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_checklist_dismissed BOOLEAN DEFAULT FALSE;
ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;
