# Error Log Commands - Quick Reference

## 🚀 Quick Commands

### View Today's Errors
```bash
cd ~/Indraprastha_Neet_Academy_app
cat indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq '.'
```

### View Last 10 Errors
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | jq -s '.[-10:]'
```

### Count Errors by Type
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq -s 'group_by(.errorType) | map({type: .[0].errorType, count: length}) | sort_by(.count) | reverse'
```

### Find All Practice Question Errors
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq 'select(.operation=="ADD_PRACTICE_QUESTION")'
```

### Get Errors from Specific Admin
```bash
# Replace 1 with admin ID
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq 'select(.adminId==1)'
```

### Real-time Log Monitoring
```bash
# Watch logs as they come in
tail -f indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq '.'
```

### Export Errors to CSV
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq -r '[.timestamp, .errorType, .operation, .message, .statusCode] | @csv' \
  > error-report.csv
```

### Find Errors in Last Hour
```bash
cat indraprastha-backend/logs/indraprastha-errors-*.json | \
  jq 'select(.timestamp > now - 3600 | todate)'
```

### Download Logs to Local Machine
```bash
# From your local machine
scp -r drrahulkumar8@indraprastha-server:~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs ./server-logs/

# Or compress first
ssh drrahulkumar8@indraprastha-server "tar -czf ~/error-logs.tar.gz ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/"
scp drrahulkumar8@indraprastha-server:~/error-logs.tar.gz ./error-logs.tar.gz
```

---

## 📊 Log Statistics

### Total Errors by Date
```bash
for file in indraprastha-backend/logs/*.json; do
  date=$(basename $file | sed 's/indraprastha-errors-//;s/.json//');
  count=$(wc -l < "$file");
  echo "$date: $count errors"
done
```

### Most Common Error Types
```bash
cat indraprastha-backend/logs/*.json | \
  jq '.errorType' | sort | uniq -c | sort -rn
```

### Errors by HTTP Status Code
```bash
cat indraprastha-backend/logs/*.json | \
  jq -s 'group_by(.statusCode) | map({code: .[0].statusCode, count: length}) | sort_by(.code)'
```

---

## 🔍 Detailed Searches

### Find Validation Errors
```bash
cat indraprastha-backend/logs/*.json | jq 'select(.errorType=="VALIDATION_ERROR")'
```

### Find Database Errors
```bash
cat indraprastha-backend/logs/*.json | jq 'select(.message | contains("database") or contains("query"))'
```

### Find Timeout Errors
```bash
cat indraprastha-backend/logs/*.json | jq 'select(.message | contains("timeout"))'
```

### Find All 500 Errors
```bash
cat indraprastha-backend/logs/*.json | jq 'select(.statusCode==500)'
```

### Find All 400 Errors (Bad Requests)
```bash
cat indraprastha-backend/logs/*.json | jq 'select(.statusCode==400)'
```

---

## 📈 GCP Cloud Logging Commands

### List Recent Errors (gcloud CLI)
```bash
gcloud logging read "severity=ERROR" \
  --limit=50 \
  --format=json \
  --project=your-project-id
```

### Filter by Operation
```bash
gcloud logging read 'jsonPayload.operation="ADD_PRACTICE_QUESTION"' \
  --limit=20 \
  --format=json \
  --project=your-project-id
```

### Filter by Admin
```bash
gcloud logging read 'jsonPayload.adminId="1"' \
  --limit=20 \
  --format=json \
  --project=your-project-id
```

### Export to File
```bash
gcloud logging read "severity=ERROR" \
  --limit=1000 \
  --format=json \
  --project=your-project-id > all-errors.json
```

---

## 💾 Backup & Archive Logs

### Compress Old Logs
```bash
# Archive logs older than 7 days
find indraprastha-backend/logs -name "*.json" -mtime +7 | \
  tar -czf indraprastha-backend/logs/archive-$(date +%Y-%m-%d).tar.gz -T -

# Delete after archiving
find indraprastha-backend/logs -name "*.json" -mtime +7 -delete
```

### Check Log Size
```bash
du -sh indraprastha-backend/logs/
du -lh indraprastha-backend/logs/* | sort -hr
```

---

## 🔗 Access Logs Programmatically

### Node.js
```javascript
const logger = require('./src/services/logger');

// Get recent logs
const logs = logger.getRecentLogs(7); // Last 7 days
console.log(logs);

// Get log files list
const files = logger.getLogFiles();
console.log(files);
```

### Python
```python
import json

# Read log file
with open('indraprastha-backend/logs/indraprastha-errors-2024-06-16.json') as f:
    for line in f:
        log = json.loads(line)
        print(log['errorType'], log['message'])
```

---

## 📋 Useful Aliases

Add to `.bashrc` or `.zshrc`:
```bash
alias logs='cat ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq'
alias logs-tail='tail -f ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | jq'
alias logs-errors='cat ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/*.json | jq -s "group_by(.errorType) | map({type: .[0].errorType, count: length})"'
alias logs-size='du -sh ~/Indraprastha_Neet_Academy_app/indraprastha-backend/logs/'
```

Usage:
```bash
logs                    # View today's logs
logs-tail              # Watch logs in real-time
logs-errors            # See error summary
logs-size              # Check log directory size
```

---

## 🎯 Common Workflows

### Debug a User's Actions
```bash
USER_ID=123
cat indraprastha-backend/logs/*.json | jq "select(.userId==$USER_ID)"
```

### Debug an Admin's Actions
```bash
ADMIN_ID=1
cat indraprastha-backend/logs/*.json | jq "select(.adminId==$ADMIN_ID)"
```

### Find All Failed Uploads
```bash
cat indraprastha-backend/logs/*.json | jq 'select(.statusCode >= 400)'
```

### Track a Specific Operation
```bash
OPERATION="ADD_PRACTICE_QUESTION"
cat indraprastha-backend/logs/*.json | \
  jq "select(.operation==\"$OPERATION\")" | \
  jq '[.timestamp, .statusCode, .message]'
```

---

## 🚨 Alert on Errors

### Get notified of 500 errors
```bash
# Run this in a loop
while true; do
  errors=$(cat indraprastha-backend/logs/indraprastha-errors-$(date +%Y-%m-%d).json | \
    jq 'select(.statusCode==500)' | wc -l)
  if [ $errors -gt 0 ]; then
    echo "⚠️ Found $errors server errors!"
    # Send alert (email, Slack, etc.)
  fi
  sleep 60
done
```

---

## 📞 Support

For more details, see: [ERROR_LOGGING_GUIDE.md](ERROR_LOGGING_GUIDE.md)

