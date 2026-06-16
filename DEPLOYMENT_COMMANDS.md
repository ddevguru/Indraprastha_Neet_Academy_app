# Deployment Commands - Copy & Paste

## 🚀 Step-by-Step Deployment

### Step 1: SSH to Server
```bash
ssh drrahulkumar8@indraprastha-server
cd ~/Indraprastha_Neet_Academy_app
```

### Step 2: Pull Latest Changes
```bash
git pull origin main
```

### Step 3: Go to Backend Directory
```bash
cd indraprastha-backend
```

### Step 4: Install Dependencies (if needed)
```bash
npm install
```

### Step 5: Stop Current Backend
```bash
# Kill existing Node process
pkill -f "node src/index.js"

# Wait 2 seconds
sleep 2

# Verify it's killed
ps aux | grep node
```

### Step 6: Start Backend
```bash
npm start

# Or if using PM2:
# pm2 start src/index.js --name indraprastha-backend
# pm2 save
```

### Step 7: Verify It's Running
```bash
# In another terminal
curl http://localhost:3000/health

# Should return: {"ok":true}
```

---

## 🧪 Test the Changes

### Test 1: Check Logs Folder Created
```bash
ls -la indraprastha-backend/logs/
```

**Expected Output:** Folder exists with today's date logs

### Test 2: View Today's Logs
```bash
cat indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq '.'
```

**Expected Output:** JSON logs appear

### Test 3: Test Practice Question Upload
Using admin panel (or cURL):

```bash
curl -X POST http://localhost:3000/api/admin/practice-sets/1/questions \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Test question?",
    "optionA": "Option A",
    "optionB": "Option B",
    "optionC": "Option C",
    "optionD": "Option D",
    "correctOption": "A",
    "explanation": "This is the explanation"
  }'
```

**Expected Output:** Success response + log created

### Test 4: Check Error Log for Addition
```bash
cat indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | \
  jq 'select(.operation=="ADD_PRACTICE_QUESTION")'
```

**Expected Output:** Logging entry visible

### Test 5: Test Submission (From Student App)
- Submit a test
- Check response includes:
  - `questionsWithExplanations`
  - `explanation_images_list`
  - `aiAnalytics`

---

## 📥 Download Logs from Server

```bash
# From your LOCAL machine (not SSH)

# Option 1: Download entire logs folder
scp -r drrahulkumar8@indraprastha-server:~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs ./server-logs/

# Option 2: Download specific date
scp "drrahulkumar8@indraprastha-server:~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/indraprastha-errors-2024-06-16.json" ./error-logs/

# Option 3: Download and compress
ssh drrahulkumar8@indraprastha-server "tar -czf ~/error-logs.tar.gz ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/"
scp drrahulkumar8@indraprastha-server:~/error-logs.tar.gz ./error-logs.tar.gz
```

---

## 📊 Analyze Logs Locally

```bash
# After downloading logs

# View all errors
cat error-logs/indraprastha-errors-*.json | jq '.'

# Count errors by type
cat error-logs/indraprastha-errors-*.json | \
  jq -s 'group_by(.errorType) | map({type: .[0].errorType, count: length}) | sort_by(.count) | reverse'

# Find practice question errors
cat error-logs/indraprastha-errors-*.json | \
  jq 'select(.operation=="ADD_PRACTICE_QUESTION")'

# Export to CSV
cat error-logs/indraprastha-errors-*.json | \
  jq -r '[.timestamp, .errorType, .operation, .message, .statusCode] | @csv' \
  > error-analysis.csv
```

---

## 🔍 Monitor Logs in Real-Time (SSH)

```bash
# SSH to server first
ssh drrahulkumar8@indraprastha-server
cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend

# Watch logs as they come in
tail -f logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq '.'

# Or filter for errors only
tail -f logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq 'select(.logLevel=="ERROR")'
```

---

## 🌐 Setup GCP Cloud Logging (Optional)

### Install Package
```bash
cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend
npm install @google-cloud/logging
```

### Add to .env
```bash
# Edit .env and add:
GCP_PROJECT_ID=your-project-id
```

### Test GCP Connection
```bash
# Still in backend directory
node -e "
require('dotenv').config();
const projectId = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON).project_id;
console.log('GCP Project ID:', projectId);
"
```

### View in GCP Console
1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to: Logging → Logs Explorer
4. Logs will appear automatically

---

## ⚠️ Troubleshooting

### Backend Won't Start?
```bash
# Check for port conflicts
lsof -i :3000

# Check Node version
node --version

# Check npm
npm --version

# Check dependencies
npm list | grep missing
```

### Logs Not Creating?
```bash
# Check logs folder exists
mkdir -p indraprastha-backend/logs

# Check permissions
chmod 755 indraprastha-backend/logs

# Check logger is imported
grep "const logger" indraprastha-backend/src/routes/admin.js
```

### Practice Questions Still Failing?
```bash
# Check latest error
tail -5 indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq '.'

# Make sure all required fields are provided:
# - question
# - optionA
# - optionB
# - optionC
# - optionD
# - correctOption
```

---

## ✅ Final Verification Checklist

```bash
# SSH to server
ssh drrahulkumar8@indraprastha-server
cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend

# 1. Backend is running?
curl http://localhost:3000/health
# Expected: {"ok":true}

# 2. Logs folder exists?
ls -la logs/
# Expected: Directory exists

# 3. Logs are being created?
ls -la logs/indraprastha-errors-$(date +%Y-%m-%d).json
# Expected: File exists with today's date

# 4. Database is connected?
# Try adding a practice question through admin panel
# Then check:
cat logs/indraprastha-errors-$(date +%Y-%m-%d).json | \
  jq 'select(.operation=="ADD_PRACTICE_QUESTION") | {timestamp, statusCode, message}'
# Expected: Success entries visible

# 5. Test submission works?
# Submit a test from student app
# Response should have: questionsWithExplanations, aiAnalytics

echo "✅ All checks passed!"
```

---

## 📱 Update Student App (If Needed)

The test submit response now includes:

```javascript
{
  "questionsWithExplanations": [
    {
      "id": 1,
      "question": "...",
      "explanation": "...",
      "explanation_images_list": [
        {
          "id": 1,
          "image_url": "https://...",
          "caption": "Diagram 1",
          "order_index": 0
        }
      ]
    }
  ],
  "aiAnalytics": {
    "insights": [...]
  }
}
```

**Update your Flutter/mobile code to:**
```dart
// Access explanation images
response['questionsWithExplanations'].forEach((q) {
  List explanationImages = q['explanation_images_list'] ?? [];
  // Display images with captions
  explanationImages.forEach((img) {
    print('${img['caption']}: ${img['image_url']}');
  });
});

// Access AI insights
List insights = response['aiAnalytics']['insights'] ?? [];
insights.forEach((insight) {
  print('${insight['insight_title']}: ${insight['insight_body']}');
});
```

---

## 🎯 Summary of Commands

| Action | Command |
|--------|---------|
| **Deploy** | `npm start` |
| **Check Logs** | `cat logs/indraprastha-errors-*.json \| jq` |
| **Monitor Live** | `tail -f logs/indraprastha-errors-$(date +%Y-%m-%d).json \| jq` |
| **Download Logs** | `scp -r ... logs ./server-logs/` |
| **Count Errors** | `cat logs/*.json \| jq -s 'group_by(.errorType) \| map(...)'` |
| **View GCP** | https://console.cloud.google.com |
| **Test Health** | `curl http://localhost:3000/health` |

---

**Status:** ✅ Ready for Deployment
**Last Updated:** June 16, 2024

