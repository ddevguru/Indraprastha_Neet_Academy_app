# Complete GCP Deployment Guide
## Indraprastha NEET Academy Backend

**Version:** 1.0  
**Date:** June 15, 2026  
**Status:** Production Ready

---

## 🎯 What You Need on GCP

### Services to Enable
```
1. ✅ Compute Engine (VM for backend)
2. ✅ Cloud SQL (PostgreSQL database)
3. ✅ Cloud Storage (file storage)
4. ✅ Firestore (optional, for analytics cache)
5. ✅ Cloud Functions (optional, for serverless)
6. ✅ Cloud Logging (monitoring)
7. ✅ Cloud Load Balancing (optional, for scaling)
8. ✅ Secret Manager (for credentials)
```

---

## 📋 Step-by-Step Setup

### STEP 1: Create GCP Project & Enable Services (30 minutes)

#### 1.1 Create Project
```bash
# Go to: https://console.cloud.google.com
# Click "Select a Project" → "New Project"
# Name: "indraprastha-neet"
# Organization: Your organization (or skip)
# Click "Create"
```

#### 1.2 Enable Required APIs
```bash
# Go to: APIs & Services → Enable APIs and services
# Search and enable each:

1. Compute Engine API
   - Search: "compute engine"
   - Click Enable

2. Cloud SQL Admin API
   - Search: "cloud sql"
   - Click Enable

3. Cloud Storage API
   - Search: "cloud storage"
   - Click Enable

4. Secret Manager API
   - Search: "secret manager"
   - Click Enable

5. Cloud Logging API (auto-enabled)

6. Cloud Monitoring API (auto-enabled)
```

#### 1.3 Create Service Account
```bash
# Go to: APIs & Services → Credentials
# Click "Create Credentials" → "Service Account"
# Service Account Name: "indraprastha-backend"
# Description: "Backend application service account"
# Click "Create and Continue"
# Grant Role: "Editor" (for full access)
# Click "Continue" → "Done"
```

#### 1.4 Create Service Account Key
```bash
# Go back to Service Accounts
# Click the account you just created
# Click "Keys" tab
# "Add Key" → "Create new key"
# Type: "JSON"
# Click "Create"
# Save file as: ~/.gcp/indraprastha-key.json
```

---

### STEP 2: Create PostgreSQL Database (45 minutes)

#### 2.1 Create Cloud SQL Instance
```bash
# Go to: Cloud SQL Instances
# Click "Create Instance" → "Choose PostgreSQL"
# Configuration:
#   Instance ID: "indraprastha-postgres"
#   Password: [Strong password - save it!]
#   Database version: PostgreSQL 15
#   Region: asia-south1 (India)
#   Zone: asia-south1-a
#   Machine type: db-custom-2-7680 (2 vCPU, 7.5GB RAM)
#   Storage: 50 GB (SSD)
#   Backup: Daily automated
# Click "Create Instance"
# Wait 5-10 minutes for creation...
```

#### 2.2 Get Connection Details
```bash
# Go to Cloud SQL Instance page
# Look for "Public IP address": 34.xxx.xxx.xxx (save this)
# Connection name: "project-id:asia-south1:indraprastha-postgres" (save this)
```

#### 2.3 Create Database & User
```bash
# In Cloud SQL instance → "Databases"
# Click "Create Database"
# Name: "indraprastha_db"
# Character set: utf8
# Click "Create"

# Go to "Users" tab
# Click "Create Account"
# Username: "neetadmin" (or your choice)
# Password: [Strong password]
# Click "Create"
```

#### 2.4 Allow VM to Connect
```bash
# In Cloud SQL instance → "Connections"
# Under "Authorized networks"
# Click "Add Network"
# Name: "backend-vm"
# Network: 34.xxx.xxx.xxx/32 (your VM's static IP)
# Click "Add"
```

---

### STEP 3: Create & Configure Compute Engine VM (45 minutes)

#### 3.1 Create VM Instance
```bash
# Go to: Compute Engine → Instances
# Click "Create Instance"
# Name: "indraprastha-backend"
# Region: asia-south1
# Zone: asia-south1-a
# Machine type: e2-standard-2 (2 vCPU, 8 GB RAM) - ~$80/month
# Boot disk: Ubuntu 22.04 LTS, 50GB SSD
# Network settings:
#   Network: default
#   Subnet: default
# Click "Management, security, disks, networking, sole-tenancy"
#   Network interfaces:
#     External IP: "Reserve a new static IP" (name: "backend-ip")
# Click "Create"
# Wait 2-3 minutes...
```

#### 3.2 SSH into VM
```bash
# Wait for VM to start
# Click VM name → "SSH"
# OR use gcloud:
gcloud compute ssh indraprastha-backend --zone=asia-south1-a
```

#### 3.3 Install Node.js
```bash
# In SSH terminal:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

#### 3.4 Install PostgreSQL Client
```bash
# For database access
sudo apt-get update
sudo apt-get install -y postgresql-client
```

#### 3.5 Install PM2
```bash
# Process manager for Node.js
sudo npm install -g pm2
sudo pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup -u $USER --hp $(eval echo ~$USER)
```

#### 3.6 Install nginx
```bash
# Reverse proxy & SSL
sudo apt-get install -y nginx

# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 3.7 Install Certbot (Let's Encrypt)
```bash
# For HTTPS/SSL certificates
sudo apt-get install -y certbot python3-certbot-nginx
```

---

### STEP 4: Setup Environment Variables (15 minutes)

#### 4.1 Create .env File
```bash
# SSH into VM, create .env file
cat > ~/Indraprastha_Neet_Academy_app/indraprastha-backend/.env << 'EOF'
# Server
NODE_ENV=production
PORT=3000

# Database (Cloud SQL)
DB_HOST=34.xxx.xxx.xxx        # Your Cloud SQL public IP
DB_PORT=5432
DB_NAME=indraprastha_db
DB_USER=neetadmin
DB_PASSWORD=[Your DB password]

# JWT
JWT_SECRET=xqf2l0Wj9DGJoaGmiXcw+3+V6s6MQyvqZ23rNpnczas=

# Admin Credentials
ADMIN_USERNAME=indraprasthaadmin
ADMIN_PASSWORD=indraprastha@123

# Firebase (Keep existing)
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Google Drive (Keep existing)
GDRIVE_OAUTH_CLIENT_ID=...
GDRIVE_OAUTH_CLIENT_SECRET=...
GDRIVE_OAUTH_REDIRECT_URI=https://api.indraprasthaneetacademy.com/api/admin/drive/oauth/callback
GDRIVE_FOLDER_ID=...

# Analytics (New)
ANALYTICS_ENABLED=true
PREDICTION_MODEL=statistical  # or 'vertex-ai' later
EOF
```

#### 4.2 Verify .env
```bash
cat ~/Indraprastha_Neet_Academy_app/indraprastha-backend/.env
# Should show all variables
```

---

### STEP 5: Deploy Backend (30 minutes)

#### 5.1 Clone Repository
```bash
# SSH into VM
cd ~
git clone https://github.com/YOUR_USERNAME/Indraprastha_Neet_Academy_app.git
cd Indraprastha_Neet_Academy_app/indraprastha-backend
```

#### 5.2 Install Dependencies
```bash
npm install
# Wait 2-3 minutes for npm to install all packages
```

#### 5.3 Run Database Migrations
```bash
# Connect to Cloud SQL and run migrations
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -f migrations/001_initial_schema.sql
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -f migrations/002_add_indexes.sql
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -f migrations/003_add_columns.sql
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -f migrations/004_add_analytics_tables.sql
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -f migrations/005_add_test_attempt_details.sql
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -f migrations/006_create_ai_features_tables.sql
```

#### 5.4 Start Backend with PM2
```bash
# Start app
pm2 start src/index.js --name indraprastha-backend --env production

# Monitor
pm2 status

# Save for auto-restart
pm2 save

# View logs
pm2 logs indraprastha-backend
```

#### 5.5 Test Backend
```bash
curl http://localhost:3000/api/health
# Should return: {"ok": true}
```

---

### STEP 6: Setup HTTPS with Let's Encrypt (20 minutes)

#### 6.1 Point Domain to VM
```bash
# Go to your domain registrar (GoDaddy)
# Update DNS A record:
#   Host: api
#   Value: [Your VM's static IP - 34.xxx.xxx.xxx]
# Wait 15-30 minutes for DNS to propagate
```

#### 6.2 Create SSL Certificate
```bash
# SSH into VM
sudo certbot certonly --standalone \
  -d api.indraprasthaneetacademy.com \
  --agree-tos \
  -n \
  -m admin@indraprasthaneetacademy.com

# Certificate saved at:
# /etc/letsencrypt/live/api.indraprasthaneetacademy.com/fullchain.pem
# /etc/letsencrypt/live/api.indraprasthaneetacademy.com/privkey.pem
```

#### 6.3 Configure nginx
```bash
# Create nginx config
sudo cat > /etc/nginx/sites-available/indraprastha << 'EOF'
server {
    listen 80;
    server_name api.indraprasthaneetacademy.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.indraprasthaneetacademy.com;
    
    ssl_certificate /etc/letsencrypt/live/api.indraprasthaneetacademy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.indraprasthaneetacademy.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    client_max_body_size 50M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/indraprastha /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload
sudo systemctl reload nginx
```

#### 6.4 Auto-Renew SSL
```bash
# Create renewal script
sudo cat > /etc/cron.d/ssl-renewal << 'EOF'
0 3 * * * /usr/bin/certbot renew --quiet
EOF

# Verify
sudo cat /etc/cron.d/ssl-renewal
```

---

### STEP 7: Setup Monitoring & Logging (15 minutes)

#### 7.1 Enable Cloud Logging
```bash
# SSH into VM
# Install logging agent
curl https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh | sudo bash

# Start agent
sudo systemctl start google-cloud-ops-agent
```

#### 7.2 View Logs
```bash
# Go to Cloud Logging in GCP Console
# Filter by resource type: Compute Engine instance
# View real-time logs
```

#### 7.3 Setup Monitoring Dashboard
```bash
# Go to Cloud Monitoring
# Create dashboard
# Add metrics:
#   - CPU usage
#   - Memory usage
#   - Network traffic
#   - Custom application metrics
```

---

### STEP 8: Backup & Disaster Recovery (10 minutes)

#### 8.1 Enable Cloud SQL Backups
```bash
# Go to Cloud SQL Instance
# Edit instance
# Backup:
#   Automated backups: ON
#   Backup location: asia-south1
#   Transaction log retention: 7 days
# Click "Save"
```

#### 8.2 Backup VM Disks
```bash
# Go to Compute Engine → Snapshots
# Create snapshot schedule:
#   Name: "daily-backup"
#   VM: indraprastha-backend
#   Schedule: Daily at 2:00 AM
#   Retention: 30 days
```

---

## 💰 Cost Estimation

### Monthly Costs

| Service | Type | Cost | Notes |
|---------|------|------|-------|
| **Compute Engine** | e2-standard-2 | ~$80 | 2 vCPU, 8GB RAM |
| **Cloud SQL** | db-custom-2-7680 | ~$150 | 2 vCPU, 7.5GB RAM, PostgreSQL 15 |
| **Storage** | Cloud Storage | ~$5 | File uploads for PDFs, images |
| **Logging** | Cloud Logging | ~$10 | 50 GB logs/month |
| **Data Transfer** | Egress | ~$20 | 100 GB outbound/month |
| **IP Address** | Static IP | ~$3 | Reserved external IP |
| **DNS** | Cloud DNS | ~$0.50 | Domain management |
| **Monitoring** | Cloud Monitoring | Free | Up to 50 MB/month |
| **TOTAL** | | **~$268/month** | All services combined |

### Cost Optimization Tips
- Use committed use discounts (save ~30%)
- Enable auto-scaling during off-peak hours
- Use Cloud Storage lifecycle policies
- Monitor unused resources weekly

---

## 🔒 Security Configuration

### 4.1 Firewall Rules
```bash
# Go to VPC Network → Firewall
# Create rules:

# Allow HTTPS (443)
Name: allow-https
Direction: Ingress
Source IPs: 0.0.0.0/0
Protocol/port: tcp:443

# Allow HTTP (80) for redirect
Name: allow-http
Direction: Ingress
Source IPs: 0.0.0.0/0
Protocol/port: tcp:80

# Allow SSH (22) - restrict to your IP
Name: allow-ssh
Direction: Ingress
Source IPs: [YOUR_IP]/32
Protocol/port: tcp:22

# Allow database from VM only
Name: allow-postgres
Direction: Ingress (Cloud SQL)
Source IPs: [VM_IP]/32
Protocol/port: tcp:5432
```

### 4.2 Service Account Permissions
```bash
# Grant specific roles (not Editor - less secure)
# Go to IAM & Admin → IAM

# Add roles to service account:
# 1. Compute Instance Admin v1
# 2. Cloud SQL Client
# 3. Storage Object User
# 4. Logging Log Writer
# 5. Monitoring Metric Writer
```

---

## 📊 Database Files Needed

### Migration Files to Run (In Order)
```
1. migrations/001_initial_schema.sql (existing)
2. migrations/002_add_indexes.sql (existing)
3. migrations/003_add_columns.sql (existing)
4. migrations/004_add_analytics_tables.sql (existing)
5. migrations/005_add_test_attempt_details.sql (existing)
6. migrations/006_create_ai_features_tables.sql (NEW - provided above)
```

### Run All Migrations
```bash
# SSH into VM
for f in indraprastha-backend/migrations/*.sql; do
  echo "Running $f..."
  psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f "$f"
done
```

---

## ✅ Verification Checklist

- [ ] GCP Project created and APIs enabled
- [ ] Cloud SQL instance running with database/user created
- [ ] Compute Engine VM deployed with Node.js
- [ ] PM2 started backend successfully
- [ ] nginx configured and running
- [ ] SSL certificate installed (HTTPS working)
- [ ] All 6 migration files executed
- [ ] .env file configured with correct values
- [ ] Domain DNS pointing to VM IP
- [ ] Backups enabled for VM and database
- [ ] Firewall rules configured
- [ ] Cloud Logging showing logs
- [ ] Backend accessible at https://api.indraprasthaneetacademy.com/api/health

---

## 🚀 Quick Start Commands (After GCP Setup)

```bash
# SSH to VM
gcloud compute ssh indraprastha-backend --zone=asia-south1-a

# Update app
cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend
git pull origin main
npm install

# Run migrations (if any new ones)
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f migrations/006_create_ai_features_tables.sql

# Restart backend
pm2 restart indraprastha-backend

# View logs
pm2 logs indraprastha-backend

# Monitor
pm2 status
```

---

## 📞 Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql -h 34.xxx.xxx.xxx -U neetadmin -d indraprastha_db -c "SELECT 1;"

# Common issues:
# 1. IP not whitelisted → Add to Cloud SQL authorized networks
# 2. Wrong password → Reset in Cloud SQL console
# 3. Database doesn't exist → Create in Cloud SQL console
```

### Backend Not Starting
```bash
# Check logs
pm2 logs indraprastha-backend

# Check port 3000 is free
netstat -tulpn | grep 3000

# Check .env file
cat .env

# Restart PM2
pm2 restart all
pm2 save
```

### HTTPS Not Working
```bash
# Check certificate
sudo certbot certificates

# Check nginx
sudo nginx -t
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

---

## 📈 Scaling Later

### When You Need More Power
```
Current: e2-standard-2 (~10k concurrent)
Next: e2-standard-4 (~20k concurrent)
Then: e2-standard-8 (~50k concurrent)
```

### For Database
```
Current: db-custom-2-7680 (~1000 requests/sec)
Next: db-custom-4-15360 (~2000 requests/sec)
```

### Add Load Balancer
```bash
# When traffic > VM capacity
# Go to Network Services → Load Balancing
# Create HTTP(S) load balancer
# Add multiple backend instances
# Enable auto-scaling
```

---

**Status:** Complete Setup Guide Ready  
**Time to Deploy:** 4-5 hours total  
**Cost:** ~$268/month  
**Maintenance:** 1-2 hours/week

Good luck! 🚀
