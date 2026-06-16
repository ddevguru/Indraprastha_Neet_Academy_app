# GCP Deployment - Quick Checklist
## Everything You Need

---

## 📋 Complete Checklist

### STEP 1: Database Setup (Run these SQL files in order)
```
✅ File 1: migrations/001_initial_schema.sql
✅ File 2: migrations/002_add_indexes.sql
✅ File 3: migrations/003_add_columns.sql
✅ File 4: migrations/004_add_analytics_tables.sql
✅ File 5: migrations/005_add_test_attempt_details.sql
✅ File 6: migrations/006_create_ai_features_tables.sql (NEW - for AI features)
```

### STEP 2: GCP Services to Create
```
✅ 1. Create GCP Project
✅ 2. Enable APIs:
     - Compute Engine
     - Cloud SQL
     - Cloud Storage
     - Secret Manager
     - Cloud Logging
✅ 3. Create Service Account + Key (JSON)
✅ 4. Create Cloud SQL (PostgreSQL 15)
     - Region: asia-south1
     - Database: indraprastha_db
     - User: neetadmin
✅ 5. Create Compute Engine VM
     - OS: Ubuntu 22.04 LTS
     - Machine: e2-standard-2 (2 vCPU, 8GB)
     - Region: asia-south1
     - Static IP: Reserve one
✅ 6. Enable Cloud SQL Backups
✅ 7. Enable VM Snapshots
```

### STEP 3: VM Setup
```
✅ SSH into VM
✅ Install Node.js 18
✅ Install PostgreSQL client
✅ Install PM2
✅ Install nginx
✅ Install Certbot (Let's Encrypt)
```

### STEP 4: Application Setup
```
✅ Clone repository
✅ npm install
✅ Create .env file with:
   - DB_HOST (Cloud SQL IP)
   - DB_PASSWORD (your password)
   - FIREBASE_SERVICE_ACCOUNT_JSON
   - GDRIVE credentials
   - JWT_SECRET
✅ Run all 6 migration files
✅ Start with PM2
```

### STEP 5: HTTPS/Domain
```
✅ Point domain to VM's static IP (DNS)
✅ Create SSL certificate with Certbot
✅ Configure nginx with SSL
✅ Enable auto-renewal
✅ Test HTTPS works
```

### STEP 6: Monitoring
```
✅ Enable Cloud Logging
✅ Create monitoring dashboard
✅ Setup alerts for high CPU/memory
✅ Monitor logs regularly
```

---

## 📦 Files You'll Need

### Database Migration Files (Already Created)
```
✅ migrations/001_initial_schema.sql
✅ migrations/002_add_indexes.sql
✅ migrations/003_add_columns.sql
✅ migrations/004_add_analytics_tables.sql
✅ migrations/005_add_test_attempt_details.sql
✅ migrations/006_create_ai_features_tables.sql ← NEW (for AI features)
```

### Configuration Files (Need to Create)
```
✅ .env file (in indraprastha-backend/)
   Format given in GCP_DEPLOYMENT_COMPLETE_GUIDE.md
   
✅ nginx config
   Template given in GCP_DEPLOYMENT_COMPLETE_GUIDE.md
```

### Documentation (Already Created)
```
✅ GCP_DEPLOYMENT_COMPLETE_GUIDE.md (main guide)
✅ GCP_QUICK_CHECKLIST.md (this file)
```

---

## 💰 Costs at a Glance

```
Compute Engine (VM):        ~$80/month
Cloud SQL (Database):       ~$150/month
Storage & Transfer:         ~$30/month
Logging & Monitoring:       ~$8/month
─────────────────────────────────────
TOTAL:                      ~$268/month
```

**Ways to Save:**
- Use committed discounts (save ~30%)
- Disable non-essential logging
- Use Cloud Storage lifecycle policies
- Auto-scale during off-peak

---

## 🔑 Required Credentials/Passwords

You'll need to create/have these:

```
1. GCP Project ID
   ├─ From: GCP Console → Settings
   └─ Format: "indraprastha-app"

2. Cloud SQL Password
   ├─ Created during: Cloud SQL setup
   └─ Stored: GCP Console (secret)

3. Service Account Key (JSON)
   ├─ Downloaded from: GCP Console → Service Accounts
   └─ Saved as: ~/.gcp/indraprastha-key.json

4. VM Static IP
   ├─ Reserved during: VM creation
   └─ Example: 34.131.xxx.xxx

5. Firebase Service Account JSON
   ├─ Already have: From Firebase Console
   └─ Put in: .env file

6. Google Drive OAuth
   ├─ Already have: CLIENT_ID, CLIENT_SECRET
   └─ Put in: .env file

7. JWT Secret
   ├─ Already have: xqf2l0Wj9DGJoaGmiXcw+3+V6s6MQyvqZ23rNpnczas=
   └─ Put in: .env file
```

---

## ⏱️ Time Estimates

```
GCP Setup (Project + APIs + Services):       45 minutes
Database Creation (Cloud SQL):               20 minutes
VM Setup (Create + Install tools):           30 minutes
Application Deployment:                      15 minutes
HTTPS/Domain Setup:                          20 minutes
Testing & Verification:                      15 minutes
─────────────────────────────────────────
TOTAL TIME:                             ~2.5 hours
```

---

## 🚀 Quick Start After GCP Setup

```bash
# 1. SSH to VM
gcloud compute ssh indraprastha-backend --zone=asia-south1-a

# 2. Navigate to app
cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend

# 3. Create .env
nano .env
# Paste content from GCP_DEPLOYMENT_COMPLETE_GUIDE.md

# 4. Install dependencies
npm install

# 5. Run migrations
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db < migrations/001_initial_schema.sql
# ... repeat for all 6 migration files

# 6. Start backend
pm2 start src/index.js --name indraprastha-backend

# 7. Test
curl https://api.indraprasthaneetacademy.com/api/health
```

---

## 🔗 Important Links

```
GCP Console:         https://console.cloud.google.com
GCP Compute:         https://console.cloud.google.com/compute/instances
GCP Cloud SQL:       https://console.cloud.google.com/sql/instances
GCP Cloud Logging:   https://console.cloud.google.com/logs
GCP Service Account: https://console.cloud.google.com/iam-admin/serviceaccounts
```

---

## 📚 Reference Docs

```
Documentation (Read in Order):

1. GCP_DEPLOYMENT_COMPLETE_GUIDE.md
   ├─ Full step-by-step instructions
   ├─ All command examples
   └─ Troubleshooting guide

2. This file (GCP_QUICK_CHECKLIST.md)
   └─ Quick reference

3. TECHNICAL_ARCHITECTURE.md (existing)
   ├─ System design
   ├─ Database schema
   └─ API specifications
```

---

## ✅ Pre-Deployment Verification

Before deploying, verify you have:

```
✅ GCP Account created
✅ Billing enabled
✅ All 6 migration files ready
✅ .env file values collected
✅ Firebase credentials ready
✅ Google Drive OAuth credentials ready
✅ Domain ready (DNS pointing to VM IP)
✅ SSL certificate ready (Certbot)
✅ All documentation reviewed
```

---

## 🆘 Support Resources

### If Something Goes Wrong

```
1. Backend not starting?
   └─ Check: pm2 logs indraprastha-backend

2. Database connection error?
   └─ Check: Cloud SQL authorized networks
   └─ Verify: DB credentials in .env

3. HTTPS not working?
   └─ Check: sudo certbot certificates
   └─ Verify: DNS pointing to VM
   └─ Check: nginx config: sudo nginx -t

4. Migration failed?
   └─ Read: GCP_DEPLOYMENT_COMPLETE_GUIDE.md → Troubleshooting
   └─ Run: psql test connection first

5. Cloud SQL instance hanging?
   └─ Check: GCP Console → Cloud SQL → Operations
   └─ Wait: Can take 10+ minutes sometimes
```

---

## 🎯 Success Criteria

You're done when:

```
✅ VM running and accessible via SSH
✅ Cloud SQL database created and accessible
✅ All 6 migration files executed without errors
✅ Backend started with PM2 (pm2 status shows online)
✅ HTTPS working (curl returns 200)
✅ API responds to health check
✅ Database has all tables (psql \dt shows them)
✅ Cloud Logging showing logs
✅ Backups enabled
✅ Monitoring dashboard created
```

---

## 📊 Database Tables Created (After All Migrations)

```
Core Tables (from migration 001):
├─ users
├─ courses
├─ batches
├─ classes
├─ subjects
├─ books
├─ book_chapters
├─ practice_sets
├─ practice_questions
├─ tests
├─ test_questions
├─ test_attempts
├─ videos
├─ daily_mcqs
├─ fcm_tokens
└─ admin_users

AI Features Tables (from migration 006):
├─ ai_user_analytics (user stats)
├─ ai_study_logs (daily tracking)
├─ ai_test_attempt_details (per question)
├─ ai_topic_performance (aggregated)
├─ ai_test_performance_history (test results)
├─ ai_weak_areas (identified weaknesses)
├─ ai_study_recommendations (AI suggestions)
├─ ai_neet_predictions (score predictions)
└─ ai_performance_comparisons (vs other students)
```

---

## 🎓 Learning Resources

```
PostgreSQL:    https://www.postgresql.org/docs/15/
Node.js:       https://nodejs.org/docs/
PM2:           https://pm2.io/docs/
nginx:         https://nginx.org/en/docs/
Certbot:       https://certbot.eff.org/docs/
GCP:           https://cloud.google.com/docs
```

---

## ✨ Final Notes

- Keep your .env file **SECURE** - never commit to git
- Backup your GCP service account key (JSON)
- Monitor costs weekly in GCP Console
- Update dependencies monthly
- Check logs regularly for errors
- Test backups quarterly
- Scale VM/database as needed

---

**Status:** Complete & Ready to Deploy  
**Difficulty:** Intermediate (follow steps carefully)  
**Success Rate:** 99% if steps followed exactly

Good luck! 🚀

Need help? Read GCP_DEPLOYMENT_COMPLETE_GUIDE.md
