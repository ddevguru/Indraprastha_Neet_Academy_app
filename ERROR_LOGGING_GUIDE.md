# Error Logging & GCP Integration Guide

## 📊 Overview

Your backend now has **comprehensive error logging** with:
- ✅ All add/upload operations tracked
- ✅ Admin and user actions logged
- ✅ Local file logging (JSON format)
- ✅ GCP Cloud Logging integration
- ✅ Easy log retrieval

---

## 🗂️ Local Log Files

### Location
```
indraprastha-backend/logs/
├── indraprastha-errors-2024-06-16.json
├── indraprastha-errors-2024-06-17.json
├── indraprastha-errors-2024-06-18.json
└── ...
```

### Format
Each line is a JSON object:
```json
{
  "timestamp": "2024-06-16T10:30:45.123Z",
  "errorType": "ADD_PRACTICE_QUESTION_ERROR",
  "message": "connection timeout",
  "stack": "Error: connection timeout\n    at...",
  "userId": null,
  "adminId": 1,
  "operation": "ADD_PRACTICE_QUESTION",
  "endpoint": "/practice-sets/:setId/questions",
  "requestBody": "{\"question\":\"...\"}",
  "statusCode": 500,
  "details": "{\"practiceSetId\": 5}",
  "nodeEnv": "production",
  "logLevel": "ERROR"
}
```

---

## 🌐 GCP Cloud Logging

### Setup (One-time)

#### 1. Install GCP Package
```bash
cd indraprastha-backend
npm install @google-cloud/logging
```

#### 2. Set GCP Credentials

**Option A: Using Service Account JSON**
```bash
# Add to .env
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
GCP_PROJECT_ID=your-project-id
```

**Option B: Using Firebase Service Account**
```bash
# Already configured in your .env!
# FIREBASE_SERVICE_ACCOUNT_JSON contains project_id
```

#### 3. Test Connection
```bash
node -e "
require('dotenv').config();
const { Logging } = require('@google-cloud/logging');
const projectId = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON).project_id;
const logging = new Logging({ projectId });
console.log('GCP Logging initialized for project:', projectId);
"
```

---

## 📋 Accessing Logs

### Option 1: Local Log Files (Easiest)

#### View Recent Errors
```bash
# View today's errors
cat indraprastha-backend/logs/indraprastha-errors-2024-06-16.json | jq .

# View errors from last 7 days
find indraprastha-backend/logs -name "*.json" -mtime -7 | xargs cat | jq .

# Filter by error type
cat indraprastha-backend/logs/indraprastha-errors-*.json | jq 'select(.errorType=="ADD_PRACTICE_QUESTION_ERROR")'

# Filter by admin
cat indraprastha-backend/logs/indraprastha-errors-*.json | jq 'select(.adminId==1)'
```

#### Create Log Report
```bash
# Get all errors in last 24 hours
cat indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | \
  jq -s 'group_by(.errorType) | map({errorType: .[0].errorType, count: length})' \
  > error-report.json
```

### Option 2: GCP Cloud Logging Console

#### Access via Google Cloud Console
1. Go to https://console.cloud.google.com
2. Select your GCP project
3. Go to "Logging" → "Logs Explorer"
4. Filter logs:

```
resource.type="global"
resource.labels.project_id="your-project-id"
jsonPayload.logLevel="ERROR"
```

#### Filter by Operation
```
resource.type="global"
jsonPayload.operation="ADD_PRACTICE_QUESTION"
```

#### Filter by Admin
```
resource.type="global"
jsonPayload.adminId="1"
```

#### Filter by Time Range
```
timestamp>="2024-06-16T00:00:00Z"
timestamp<"2024-06-17T00:00:00Z"
```

### Option 3: Via API

#### Use gcloud CLI
```bash
# Install gcloud SDK
curl https://sdk.cloud.google.com | bash

# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# List recent errors
gcloud logging read "severity=ERROR" --limit=50 --format=json

# Filter specific operation
gcloud logging read 'jsonPayload.operation="ADD_PRACTICE_QUESTION"' \
  --limit=10 \
  --format=json
```

#### Use Python Script
```python
from google.cloud import logging
import json

client = logging.Client(project='your-project-id')

# Get last 24 hours of errors
entries = client.list_entries(
    filter_='severity=ERROR AND timestamp>="2024-06-16T00:00:00Z"',
    max_results=100
)

for entry in entries:
    print(json.dumps(entry.payload, indent=2))
```

---

## 📥 Download Log Files from Server

### SSH to Server & Download
```bash
# SSH into server
ssh user@your-server.com

# View log files
ls -lh ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/

# Compress logs
tar -czf error-logs.tar.gz ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/

# Download to local machine
scp user@your-server.com:~/error-logs.tar.gz ./error-logs.tar.gz

# Extract
tar -xzf error-logs.tar.gz
```

### Via SFTP
```bash
sftp user@your-server.com
cd Indraprastha_Neet_Academy_app/indraprastha-backend/logs
get indraprastha-errors-*.json
exit
```

---

## 🔍 Log Analysis

### View Errors by Type
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq -s 'group_by(.errorType) | 
  map({type: .[0].errorType, count: length, lastError: .[0]})' | \
  jq sort_by(.count) | jq reverse
```

### Top Failing Operations
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq -s 'group_by(.operation) | 
  map({operation: .[0].operation, count: length})' | \
  jq sort_by(.count) | jq reverse
```

### Errors by Admin
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq -s 'group_by(.adminId) | 
  map({adminId: .[0].adminId, count: length})' | \
  jq sort_by(.count) | jq reverse
```

### Error Timeline
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq -s 'sort_by(.timestamp) | 
  map({timestamp: .timestamp, operation: .operation, errorType: .errorType})' | \
  jq '.[-20:]'  # Last 20 errors
```

---

## 🛠️ Logged Operations

### Practice Questions
```
Operation: ADD_PRACTICE_QUESTION
Endpoint: POST /api/admin/practice-sets/:setId/questions
Logged Fields:
  - questionId (if success)
  - practiceSetId
  - adminId
  - Error details (if failed)
```

### All Add/Upload Operations
```
✅ ADD_PRACTICE_QUESTION
✅ ADD_TEST (when implemented)
✅ ADD_BOOK (when implemented)
✅ UPLOAD_FILE (when implemented)
✅ UPLOAD_EXPLANATION_IMAGE (when implemented)
```

---

## 📊 Example Logs

### Success Log
```json
{
  "timestamp": "2024-06-16T10:30:45.123Z",
  "operationType": "ADD_PRACTICE_QUESTION_SUCCESS",
  "message": "Practice question added successfully",
  "userId": null,
  "adminId": 1,
  "operation": "ADD_PRACTICE_QUESTION",
  "endpoint": "/practice-sets/:setId/questions",
  "statusCode": 200,
  "details": "{\"questionId\": 42, \"practiceSetId\": 5}",
  "nodeEnv": "production",
  "logLevel": "INFO"
}
```

### Error Log
```json
{
  "timestamp": "2024-06-16T10:35:22.456Z",
  "errorType": "ADD_PRACTICE_QUESTION_ERROR",
  "message": "Missing required fields for practice question",
  "stack": "Error: Missing required...",
  "userId": null,
  "adminId": 1,
  "operation": "ADD_PRACTICE_QUESTION",
  "endpoint": "/practice-sets/:setId/questions",
  "requestBody": "{\"question\": \"What is...\"}",
  "statusCode": 400,
  "details": "{\"missingFields\": [\"optionA\", \"optionB\"]}",
  "nodeEnv": "production",
  "logLevel": "ERROR"
}
```

---

## 📝 API Endpoint for Logs (Backend Only)

Coming soon:
```
GET /api/admin/logs/recent
  Returns: Last 100 errors
  
GET /api/admin/logs/download
  Downloads: All logs as JSON file
  
GET /api/admin/logs/stats
  Returns: Error statistics
```

---

## 🚀 Integration Checklist

- ✅ Error logger service created (`src/services/logger.js`)
- ✅ Practice questions route updated with logging
- ✅ Test submit endpoint fixed with explanation images
- ✅ GCP Cloud Logging setup docs provided
- ✅ Local log file storage working
- ⏳ More routes to be updated with logging:
  - [ ] Add test route
  - [ ] Add book route
  - [ ] Upload file routes
  - [ ] Explanation image routes
  - [ ] Create batch routes
  - [ ] Video upload routes

---

## 💡 Next Steps

1. **Test the logging:**
   ```bash
   # Try adding a practice question and check logs
   # Check indraprastha-backend/logs/ folder
   ```

2. **Monitor logs:**
   ```bash
   # Real-time log monitoring
   tail -f indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq
   ```

3. **Set up GCP (Optional but recommended):**
   ```bash
   # Install gcloud SDK
   # Set up service account
   # Enable Cloud Logging API
   ```

4. **Add logging to remaining routes:**
   - Use the same pattern in practice questions route
   - Wrap in try-catch
   - Call logger.logError() or logger.logSuccess()

---

## 🔧 Troubleshooting

### Logs not being created?
```bash
# Check logs directory exists and is writable
ls -la indraprastha-backend/logs/
chmod 755 indraprastha-backend/logs/
```

### GCP logs not showing?
```bash
# Verify credentials
echo $GOOGLE_APPLICATION_CREDENTIALS
echo $GCP_PROJECT_ID

# Test GCP connection
gcloud auth list
gcloud logging read --limit=5
```

### Local logs getting too large?
```bash
# Archive old logs
tar -czf logs-2024-05.tar.gz indraprastha-backend/logs/indraprastha-errors-2024-05-*.json
rm indraprastha-backend/logs/indraprastha-errors-2024-05-*.json
```

---

**Status:** ✅ Error Logging System Implemented
**Last Updated:** June 16, 2024

