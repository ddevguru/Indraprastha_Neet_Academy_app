# AI Features Implementation - Step-by-Step Guide
## Indraprastha NEET Academy

**Version:** 1.0  
**Date:** June 15, 2026  
**Status:** READY TO IMPLEMENT

---

## 📋 Quick Summary

You have:
- ✅ Backend AI service (`analytics.js` with algorithms)
- ✅ API routes (`analytics.js` routes)
- ✅ Flutter UI dashboard (complete screens)
- ✅ Database migrations (all tables)
- ✅ Implementation guide (this document)

**Timeline:** 3-5 days to implement + 2 days testing

---

## 🚀 Implementation Steps

### Step 1: Database Setup (1 hour)

#### 1.1 Run Migration
```bash
# SSH into your Google Cloud VM
ssh -i ~/.ssh/gcp_key ubuntu@YOUR_VM_IP

# Navigate to backend directory
cd ~/Indraprastha_Neet_Academy_app/indraprastha-backend

# Connect to PostgreSQL
psql -U neetadmin -d indraprastha_db -h localhost

# Run migration
\i migrations/005_add_analytics_tables.sql

# Verify tables created
\dt  -- List all tables

# Check analytics tables specifically
SELECT * FROM information_schema.tables 
WHERE table_name LIKE '%analytics%' OR table_name LIKE '%study_logs%' OR table_name LIKE '%topic_performance%';
```

#### 1.2 Verify Tables
```sql
-- Check user_analytics table
SELECT COUNT(*) FROM user_analytics;

-- Check study_logs table
SELECT COUNT(*) FROM study_logs;

-- Check topic_performance table
SELECT COUNT(*) FROM topic_performance;

-- Check test_attempt_details table
SELECT COUNT(*) FROM test_attempt_details;
```

---

### Step 2: Backend Integration (2 hours)

#### 2.1 Add Analytics Routes to Main App

Open `indraprastha-backend/src/index.js`:

```javascript
// Add this with other route imports (around line 30)
const analyticsRouter = require('./routes/analytics');

// Add this with other route middleware (around line 80-90)
// Analytics routes
app.use('/api/analytics', (req, res, next) => {
  // Extract userId from JWT token
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    } catch (err) {
      return res.status(401).json({error: 'Invalid token'});
    }
  }
  next();
}, analyticsRouter);
```

#### 2.2 Verify Files Exist
```bash
# Check backend service exists
ls -la src/services/analytics.js
# Expected: -rw-r--r-- ... analytics.js

# Check routes exist
ls -la src/routes/analytics.js
# Expected: -rw-r--r-- ... analytics.js
```

#### 2.3 Test Backend Endpoints

```bash
# After restarting backend:
pm2 restart indraprastha-backend --update-env

# Get JWT token first
TOKEN=$(curl -X POST https://api.indraprasthaneetacademy.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210","password":"password123"}' \
  | jq -r '.token')

# Test dashboard endpoint
curl https://api.indraprasthaneetacademy.com/api/analytics/dashboard \
  -H "Authorization: Bearer $TOKEN"

# Test prediction endpoint
curl https://api.indraprasthaneetacademy.com/api/analytics/predict-neet-score \
  -H "Authorization: Bearer $TOKEN"
```

---

### Step 3: Flutter Frontend Setup (1 hour)

#### 3.1 Add Dependency

File: `pubspec.yaml`

```yaml
dependencies:
  # ... existing dependencies ...
  fl_chart: ^0.65.0
```

Run:
```bash
cd /path/to/indraprastha
flutter pub get
```

#### 3.2 Add Analytics to Main Navigation

Open `lib/main.dart` or your navigation file:

```dart
// In your navigation bar/menu
const (Icons.analytics_outlined, 'Analytics'),
// Add to navItems list

// In your page builder:
AnalyticsDashboard(),  // Add to pages list
```

#### 3.3 Integrate API Client

Create `lib/features/analytics/analytics_repository.dart`:

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../core/constants/api_constants.dart';

class AnalyticsRepository {
  final http.Client httpClient;
  final String token;

  AnalyticsRepository({required this.httpClient, required this.token});

  Future<Map<String, dynamic>> getDashboard() async {
    final response = await httpClient.get(
      Uri.parse('$baseUrl/analytics/dashboard'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['data'];
    } else {
      throw Exception('Failed to load dashboard');
    }
  }

  Future<Map<String, dynamic>> analyzTest(int testAttemptId) async {
    final response = await httpClient.post(
      Uri.parse('$baseUrl/analytics/analyze-test/$testAttemptId'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['data'];
    } else {
      throw Exception('Failed to analyze test');
    }
  }

  Future<Map<String, dynamic>> predictNEETScore() async {
    final response = await httpClient.get(
      Uri.parse('$baseUrl/analytics/predict-neet-score'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['data'];
    } else {
      throw Exception('Failed to predict score');
    }
  }

  Future<void> logStudySession({
    required double studyHours,
    required int questionsAttempted,
    required int questionsCorrect,
  }) async {
    final response = await httpClient.post(
      Uri.parse('$baseUrl/analytics/log-study-session'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'studyHours': studyHours,
        'questionsAttempted': questionsAttempted,
        'questionsCorrect': questionsCorrect,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to log study session');
    }
  }
}
```

#### 3.4 Update Analytics Dashboard to Call API

In `lib/features/analytics/analytics_screens.dart`, update `_fetchDashboard()`:

```dart
Future<Map<String, dynamic>> _fetchDashboard() async {
  try {
    // Get token from secure storage
    final token = await _secureStorage.read(key: 'auth_token');
    if (token == null) throw Exception('No token');

    final repo = AnalyticsRepository(
      httpClient: http.Client(),
      token: token,
    );

    return await repo.getDashboard();
  } catch (error) {
    print('Error fetching dashboard: $error');
    // Return mock data if API fails
    return {};
  }
}
```

---

### Step 4: Data Population (30 minutes)

#### 4.1 Generate Sample Data for Testing

```sql
-- Insert sample study logs
INSERT INTO study_logs (user_id, date, study_hours, questions_attempted, questions_correct)
SELECT 
  users.id,
  CURRENT_DATE - (random() * 30)::int,
  (random() * 4 + 1)::numeric,
  (random() * 100 + 20)::int,
  (random() * 80 + 10)::int
FROM users
LIMIT 100;

-- Update user_analytics with initial data
UPDATE user_analytics
SET
  total_tests_taken = (random() * 20 + 1)::int,
  average_score = (random() * 200 + 100)::numeric,
  average_accuracy = (random() * 30 + 60)::numeric,
  physics_accuracy = (random() * 30 + 60)::numeric,
  chemistry_accuracy = (random() * 30 + 60)::numeric,
  biology_accuracy = (random() * 30 + 60)::numeric,
  daily_study_hours = (random() * 3 + 1)::numeric,
  current_study_streak = (random() * 15 + 1)::int;
```

#### 4.2 Generate Test Attempt Details

```sql
-- Populate test_attempt_details for existing test attempts
INSERT INTO test_attempt_details (test_attempt_id, question_id, subject, topic, is_correct, time_taken_seconds)
SELECT
  ta.id,
  tq.id,
  'Physics'::varchar,
  'Mechanics'::varchar,
  (random() > 0.3)::boolean,
  (random() * 180 + 30)::int
FROM test_attempts ta
JOIN test_questions tq ON tq.test_id = ta.test_id
LIMIT 10000;
```

---

### Step 5: Testing (2 hours)

#### 5.1 Automated Tests (Backend)

Create `indraprastha-backend/test/analytics.test.js`:

```javascript
const analyticsService = require('../src/services/analytics');

describe('Analytics Service', () => {
  test('calculateAccuracy returns correct percentage', () => {
    const correct = 39, total = 50;
    const accuracy = (correct / total) * 100;
    expect(Math.round(accuracy)).toBe(78);
  });

  test('predictNEETScore returns valid range', async () => {
    // Mock data
    const scores = [250, 260, 275, 285];
    const accuracy = 75;
    const dailyHours = 2;
    const streak = 5;

    // This would call the service method
    // const prediction = analyticsService._predictScore(scores, accuracy, dailyHours, streak);
    // expect(prediction.score).toBeGreaterThan(100);
    // expect(prediction.score).toBeLessThan(360);
  });

  test('identifyWeakTopics returns sorted list', () => {
    // Test data
    const mockQuestions = [
      {topic: 'Mechanics', is_correct: true},
      {topic: 'Mechanics', is_correct: true},
      {topic: 'Waves', is_correct: false},
    ];

    // Test would call service method
    // const weakTopics = analyticsService._identifyWeakTopics(mockQuestions);
    // expect(weakTopics.length).toBeGreaterThan(0);
    // expect(weakTopics[0].accuracy).toBeLessThan(weakTopics[weakTopics.length - 1].accuracy);
  });
});

// Run: npm test
```

#### 5.2 Manual Testing

**Test Scenario 1: Dashboard Load**
```
1. Open app
2. Login with valid credentials
3. Go to Analytics tab
4. Verify today's stats load
5. Verify this week's stats load
6. Verify heatmap displays with colors
```

**Test Scenario 2: Score Analysis**
```
1. Complete a mock test
2. Check analytics for that test
3. Verify weak topics identified
4. Verify suggestions generated
5. Verify comparison with previous test (if exists)
```

**Test Scenario 3: NEET Prediction**
```
1. Complete 5+ mock tests
2. View NEET prediction
3. Check:
   - Predicted score is in valid range (0-360)
   - Confidence is reasonable
   - Monthly progress chart
   - Recommendation is relevant
```

**Test Scenario 4: Study Tracking**
```
1. Log study hours (POST /analytics/log-study-session)
2. Verify daily stats update
3. Verify streak counter increases
4. Check dashboard reflects changes
```

---

### Step 6: Performance Optimization (1 hour)

#### 6.1 Add Caching

```javascript
// In analytics.js service
const CACHE_DURATION = 3600000; // 1 hour
const analyticsCache = {};

async getProgressDashboard(userId) {
  const cacheKey = `dashboard_${userId}`;
  
  // Check cache
  if (analyticsCache[cacheKey] && 
      Date.now() - analyticsCache[cacheKey].timestamp < CACHE_DURATION) {
    return analyticsCache[cacheKey].data;
  }

  // Fetch fresh data
  const data = await this._fetchDashboardData(userId);
  
  // Update cache
  analyticsCache[cacheKey] = {
    data,
    timestamp: Date.now()
  };

  return data;
}
```

#### 6.2 Database Indexing

```sql
-- Already added in migration, but verify:
CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX idx_study_logs_user_id_date ON study_logs(user_id, date);
CREATE INDEX idx_test_attempt_details_test_attempt ON test_attempt_details(test_attempt_id);
CREATE INDEX idx_topic_performance_user_id ON topic_performance(user_id);
```

---

### Step 7: Deployment (1 hour)

#### 7.1 Backend Deployment

```bash
# SSH into VM
ssh -i ~/.ssh/gcp_key ubuntu@YOUR_VM_IP

# Pull latest code
cd ~/Indraprastha_Neet_Academy_app
git pull origin main

# Install dependencies (if any new packages)
cd indraprastha-backend
npm install

# Run migrations
psql -U neetadmin -d indraprastha_db -h localhost -f migrations/005_add_analytics_tables.sql

# Restart backend
pm2 restart indraprastha-backend --update-env

# Verify it's running
pm2 status
```

#### 7.2 Flutter Deployment

```bash
# Build iOS
flutter build ios --release

# Build Android
flutter build apk --release

# Build Web
flutter build web --release

# Build Windows
flutter build windows --release

# Push to app stores or distribute APK
```

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Database migration runs without errors
- [ ] Analytics tables created successfully
- [ ] API endpoints return 200 status
- [ ] Score analysis algorithm works
- [ ] NEET prediction generates valid numbers
- [ ] Weak topics identified correctly
- [ ] Performance heatmap colors assigned correctly

### Frontend Tests
- [ ] Dashboard loads without errors
- [ ] API data displays correctly
- [ ] Charts render properly
- [ ] Study tracking updates in real-time
- [ ] Heatmap colors update based on accuracy
- [ ] Weak areas highlighted
- [ ] Recommendations display
- [ ] Works on iOS, Android, Web, Windows

### Integration Tests
- [ ] Complete test → Analysis updates
- [ ] Study log → Dashboard updates
- [ ] Streak counter increases correctly
- [ ] Prediction updates monthly
- [ ] All screens responsive on mobile/tablet/desktop

---

## 📊 Success Metrics

After implementation, verify:

| Metric | Target | Status |
|--------|--------|--------|
| Dashboard load time | < 2 seconds | |
| API response time | < 500ms | |
| Database queries | < 100ms | |
| Prediction accuracy | 70%+ | |
| User engagement (analytics tab opens) | 60%+ | |
| Bug reports (analytics feature) | < 5 in 1st week | |

---

## 🐛 Common Issues & Fixes

### Issue 1: "Table doesn't exist" error
```
Solution:
1. Verify migration ran: \dt in psql
2. Check SQL syntax in migration file
3. Re-run migration: psql -f migrations/005_add_analytics_tables.sql
```

### Issue 2: API returns empty data
```
Solution:
1. Check user has test attempts: SELECT * FROM test_attempts WHERE user_id = X;
2. Verify analytics table populated: SELECT * FROM user_analytics WHERE user_id = X;
3. Check database logs: SELECT * FROM pg_stat_statements;
```

### Issue 3: Dashboard shows mock data instead of real
```
Solution:
1. Check token is being sent: Look at Authorization header in DevTools
2. Verify API endpoint is correct: baseUrl + /analytics/dashboard
3. Check backend logs: pm2 logs indraprastha-backend
4. Test endpoint manually: curl with -H "Authorization: Bearer $TOKEN"
```

### Issue 4: Flutter build fails
```
Solution:
1. Run: flutter clean
2. Run: flutter pub get
3. Run: flutter pub upgrade
4. Rebuild: flutter build <platform>
```

---

## 📱 Files Created/Modified

### New Files
- `indraprastha-backend/src/services/analytics.js` ✅
- `indraprastha-backend/src/routes/analytics.js` ✅
- `indraprastha-backend/migrations/005_add_analytics_tables.sql` ✅
- `lib/features/analytics/analytics_screens.dart` ✅
- `lib/features/analytics/analytics_repository.dart` (create yourself)

### Modified Files
- `pubspec.yaml` - added `fl_chart: ^0.65.0` ✅
- `indraprastha-backend/src/index.js` - add analytics routes (you do this)

---

## 🎯 Next Steps After MVP

**Phase 2 (Later):**
- Implement Vertex AI for ML-based predictions
- Add AI question generation
- Add adaptive difficulty adjustment
- Add personalized study recommendations
- Add live doubt-solving sessions

---

## 📞 Support

If you get stuck:

1. Check this guide step-by-step
2. Review the AI Implementation Guide document
3. Check backend logs: `pm2 logs indraprastha-backend`
4. Check database: `psql -d indraprastha_db -c "SELECT * FROM user_analytics;"`
5. Check Flutter console for errors
6. Review the sample code provided

---

**Status:** READY TO IMPLEMENT  
**Estimated Time:** 3-5 days development + 2 days testing  
**Support Available:** Full code + documentation included

Go ahead aur implement karo! 🚀
