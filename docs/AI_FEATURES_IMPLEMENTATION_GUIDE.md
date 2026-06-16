# AI Features Implementation Guide
## Indraprastha NEET Academy

**Version:** 1.0  
**Created:** June 15, 2026  
**Status:** Implementation Ready

---

## 1. Overview: AI Features to Implement

### 1.1 Features Breakdown

```
Student App AI Features:
├── 1. AI Score Analyzer
│   ├── Test score analysis
│   ├── Weak subject identification
│   ├── Topic-wise performance breakdown
│   └── Improvement suggestions
├── 2. Predicted NEET Rank & Score
│   ├── Score prediction algorithm
│   ├── Rank estimation
│   ├── Monthly progress tracking
│   └── Trend analysis
├── 3. Smart Progress Dashboard
│   ├── Daily study hours tracking
│   ├── Mock test performance charts
│   ├── Accuracy % visualization
│   └── Question attempt tracking
├── 4. AI Performance Heatmap
│   ├── Topic-wise color coding (Red/Yellow/Green)
│   ├── Subject-wise breakdown
│   ├── Interactive drill-down
│   └── Trend visualization
└── 5. AI Question Generation (Future)
    ├── Custom practice questions based on weak areas
    ├── Difficulty adjustment
    └── Spaced repetition
```

---

## 2. Technology Choices

### 2.1 Option Analysis

| Approach | Pros | Cons | Cost | Timeline |
|----------|------|------|------|----------|
| **Option A: Vertex AI (Full ML)** | Enterprise-grade, scalable, production-ready | Complex, expensive, steep learning curve | $500-2000/month | 4-6 weeks |
| **Option B: BigQuery ML (SQL)** | Simple, serverless, works with existing DB | Limited algorithm options, SQL expertise needed | $100-300/month | 2-3 weeks |
| **Option C: Statistical Algorithms (MVP)** | Simple, fast, cheap, can implement today | Limited accuracy, not "true AI", manual tuning | Free | 1-2 weeks |
| **Option D: Hybrid (Recommended)** | Start simple, upgrade to ML later | Requires refactoring | Free → $100/mo | 2 weeks (MVP) |

### 2.2 Recommended Strategy: Hybrid Approach

**Phase 1 (Weeks 1-2): MVP with Statistical Algorithms**
- Simple math-based predictions
- No external ML services
- Low cost, high speed
- Test user behavior

**Phase 2 (Weeks 3-4): Integrate Vertex AI**
- Replace algorithms with ML models
- Auto-scaling, better accuracy
- Production-ready

---

## 3. Google Cloud Setup

### 3.1 Required GCP Services

```
Google Cloud Console
├── Vertex AI (ML Platform)
│   ├── AutoML (train custom models)
│   ├── BigQuery ML (SQL-based)
│   └── Notebooks (Jupyter for experimentation)
├── BigQuery (Data warehouse)
├── Cloud Storage (Model storage)
├── Cloud Functions (Serverless API)
└── Cloud Logging (Analytics)
```

### 3.2 Enable Services in GCP Console

```bash
# Step 1: Go to Google Cloud Console
# https://console.cloud.google.com

# Step 2: Select your project "indraprastha-app"

# Step 3: Enable APIs:
# Search and enable:
# - Vertex AI API
# - BigQuery API
# - Cloud Functions API
# - Cloud Storage API

# Or use gcloud CLI:
gcloud services enable aiplatform.googleapis.com
gcloud services enable bigquery.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable storage-api.googleapis.com
```

### 3.3 Create Service Account for AI

```bash
# Create service account
gcloud iam service-accounts create indraprastha-ai \
  --display-name="Indraprastha AI Service"

# Grant roles
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:indraprastha-ai@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:indraprastha-ai@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/bigquery.dataEditor"

# Create and download key
gcloud iam service-accounts keys create ~/indraprastha-ai-key.json \
  --iam-account=indraprastha-ai@PROJECT_ID.iam.gserviceaccount.com
```

---

## 4. Implementation: Phase 1 (MVP - Statistical Algorithms)

### 4.1 Database Schema for Analytics

```sql
-- Enhanced analytics table
CREATE TABLE user_analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  
  -- Test performance
  total_tests_taken INTEGER DEFAULT 0,
  average_score NUMERIC(5,2) DEFAULT 0,
  average_accuracy NUMERIC(5,2) DEFAULT 0,
  
  -- Subject-wise
  physics_accuracy NUMERIC(5,2) DEFAULT 0,
  chemistry_accuracy NUMERIC(5,2) DEFAULT 0,
  biology_accuracy NUMERIC(5,2) DEFAULT 0,
  
  -- Topic-wise (JSON for flexibility)
  topic_accuracy JSONB DEFAULT '{}',  -- {physics: {mechanics: 85, waves: 70}, ...}
  weak_topics TEXT[] DEFAULT '{}',    -- Array of weak topics
  strong_topics TEXT[] DEFAULT '{}',  -- Array of strong topics
  
  -- Speed metrics
  average_time_per_question NUMERIC(5,2) DEFAULT 0,  -- seconds
  speed_trend JSONB DEFAULT '{}',     -- {date: seconds, ...}
  
  -- Study tracking
  daily_study_hours NUMERIC(5,2) DEFAULT 0,
  study_hours_history JSONB DEFAULT '{}',  -- {date: hours, ...}
  
  -- Predictions
  predicted_neet_score INTEGER DEFAULT 0,
  predicted_neet_rank INTEGER DEFAULT 0,
  prediction_confidence NUMERIC(5,2) DEFAULT 0,  -- 0-100%
  
  -- Streaks
  current_study_streak INTEGER DEFAULT 0,
  longest_study_streak INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test attempt details (for analysis)
CREATE TABLE test_attempt_details (
  id SERIAL PRIMARY KEY,
  test_attempt_id INTEGER REFERENCES test_attempts(id),
  question_id INTEGER,
  subject VARCHAR(50),  -- Physics, Chemistry, Biology
  topic VARCHAR(100),   -- Mechanics, Organic, etc.
  is_correct BOOLEAN,
  time_taken_seconds INTEGER,
  created_at TIMESTAMP
);

-- Daily study log
CREATE TABLE study_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE,
  study_hours NUMERIC(5,2),
  questions_attempted INTEGER,
  questions_correct INTEGER,
  tests_taken INTEGER,
  created_at TIMESTAMP,
  UNIQUE(user_id, date)
);
```

### 4.2 Backend APIs for AI Features

**Endpoint 1: Analyze Test Score**

```
POST /api/analytics/analyze-test/:testAttemptId
Returns: {
  score: 285,
  percentage: 79,
  accuracy: {
    physics: 82,
    chemistry: 78,
    biology: 72
  },
  weak_topics: [
    {name: "Organic Chemistry", accuracy: 65, questions: 10},
    {name: "Trigonometry", accuracy: 70, questions: 8}
  ],
  strong_topics: [
    {name: "Mechanics", accuracy: 90, questions: 15}
  ],
  suggestions: [
    "Focus on Organic Chemistry - you scored only 65%",
    "Speed up - you took 3.5 min/question",
    "Your Biology is improving - 72% this time vs 68% last time"
  ],
  comparison: {
    previous_score: 280,
    improvement: +5,
    trend: "improving"
  }
}
```

**Endpoint 2: Predict NEET Score**

```
GET /api/analytics/predict-neet-score
Returns: {
  predicted_score: 310,
  score_range: {min: 290, max: 330},
  confidence_percent: 85,
  predicted_rank: 5000,
  rank_range: {min: 3000, max: 7000},
  monthly_progress: [
    {month: "May", score: 270},
    {month: "June", score: 285},
    {month: "projected_july", score: 310}
  ],
  recommendation: "On track to score 310+. Maintain focus on Biology to improve further."
}
```

**Endpoint 3: Get Dashboard Analytics**

```
GET /api/analytics/dashboard
Returns: {
  today: {
    study_hours: 2.5,
    questions_attempted: 45,
    accuracy_percent: 80
  },
  this_week: {
    total_study_hours: 14,
    tests_completed: 2,
    average_accuracy: 78,
    streak_days: 5
  },
  performance_heatmap: {
    physics: {
      mechanics: {accuracy: 90, color: "green"},
      waves: {accuracy: 70, color: "yellow"},
      optics: {accuracy: 65, color: "red"}
    },
    chemistry: {...},
    biology: {...}
  },
  weak_areas: [
    {subject: "Chemistry", topic: "Organic", accuracy: 60},
    {subject: "Biology", topic: "Ecology", accuracy: 65}
  ]
}
```

---

## 5. Implementation: Phase 2 (Vertex AI Integration)

### 5.1 Vertex AI Setup

```bash
# Create BigQuery dataset for training data
bq mk \
  --dataset \
  --location=asia-south1 \
  indraprastha_ml_data

# Create training table with student performance history
bq load \
  --autodetect \
  indraprastha_ml_data.neet_performance \
  gs://your-bucket/training_data.csv
```

### 5.2 BigQuery ML: Score Prediction Model

```sql
-- Create linear regression model for score prediction
CREATE OR REPLACE MODEL `indraprastha_ml_data.score_predictor`
OPTIONS(
  model_type='linear_reg',
  input_label_cols=['predicted_score']
) AS
SELECT
  user_id,
  total_tests_taken,
  average_accuracy,
  physics_accuracy,
  chemistry_accuracy,
  biology_accuracy,
  average_time_per_question,
  daily_study_hours,
  current_study_streak,
  
  -- Target: actual NEET score
  predicted_score
FROM `indraprastha_ml_data.student_performance`
WHERE predicted_score IS NOT NULL;

-- Use model for prediction
SELECT
  *
FROM ML.PREDICT(
  MODEL `indraprastha_ml_data.score_predictor`,
  (SELECT * FROM `indraprastha_ml_data.test_students`)
);
```

### 5.3 Vertex AI AutoML: Weakness Classification

```python
# Using Vertex AI Python SDK
from google.cloud import aiplatform

def train_weakness_classifier():
    aiplatform.init(project='indraprastha-app', location='asia-south1')
    
    job = aiplatform.AutoMLTabularTrainingJob(
        display_name='weakness-classifier',
        objective='classification',
        budget_milli_node_hours=1000,
    )
    
    model = job.run(
        dataset=aiplatform.TabularDataset(
            'projects/PROJECT_ID/locations/asia-south1/datasets/DATASET_ID'
        ),
        target_column='weak_topic',
        training_fraction_split=0.8,
        validation_fraction_split=0.1,
        test_fraction_split=0.1,
    )
    
    return model
```

---

## 6. Implementation: MVP Code

### 6.1 Backend: AI Analytics Service (Node.js)

I'll provide this in the next section with full code.

### 6.2 Flutter: AI Dashboard Screens

I'll provide this in the next section with full UI code.

---

## 7. Data Collection Strategy

### 7.1 What Data to Collect

```
Per Test Attempt:
├── Questions answered (correct/incorrect)
├── Time per question
├── Subject & topic of each question
├── Confidence level (optional: 1-5 scale)
├── Device info (battery, network)
└── Timestamp

Daily Tracking:
├── Hours studied
├── Number of questions attempted
├── Devices used
└── Session timestamps

Monthly Aggregation:
├── Average accuracy per topic
├── Speed improvements
├── Test score trends
└── Study consistency
```

### 7.2 Data Privacy Considerations

```
✅ Collect:
- Questions answered
- Time taken
- Accuracy metrics
- Study hours
- Test scores

❌ DO NOT Collect:
- Personally identifiable info beyond phone
- Location data
- Camera/microphone access
- Browsing history outside app
- Health data
```

---

## 8. Algorithm Details (MVP Phase)

### 8.1 Score Prediction Algorithm

```
Formula:
Predicted_NEET_Score = Base_Score + Improvement_Factor + Momentum

Where:
Base_Score = Current_Average_Score

Improvement_Factor = (Recent_Avg - Previous_Avg) * Weight
  - Weight increases if consistent improvement
  - Weight decreases if score declining

Momentum = (Weeks_Studied * Daily_Hours * Accuracy) / 100
  - Captures consistency and dedication
```

### 8.2 Weak Topic Identification

```
Algorithm: Statistical Z-Score
Weak_Topic_Threshold = Mean_Accuracy - (1.5 * Standard_Deviation)

For each topic:
  1. Collect all questions in topic
  2. Calculate accuracy percentage
  3. Compare to overall accuracy
  4. If accuracy < threshold → mark as weak
  5. Sort by severity (lowest accuracy first)
```

### 8.3 Performance Heatmap Colors

```
Accuracy Range   Color    Rating
80-100%          🟢 Green  Excellent
60-79%           🟡 Yellow Good
40-59%           🟠 Orange Need Improvement
0-39%            🔴 Red    Critical
```

---

## 9. Implementation Timeline

```
Week 1: Backend Development
├── Day 1-2: Database schema + migration
├── Day 3-4: Analytics calculation algorithms
└── Day 5: API endpoints testing

Week 2: Frontend Development
├── Day 1-2: Dashboard UI components
├── Day 3-4: Heatmap visualization
└── Day 5: Integration + testing

Week 3: Refinement & Deployment
├── Day 1-2: Performance optimization
├── Day 3-4: Bug fixes + user feedback
└── Day 5: Production deployment

Week 4+: Vertex AI Integration (Phase 2)
├── Train ML models
├── A/B test predictions
└── Gradual rollout
```

---

## 10. Cost Estimation

### 10.1 Phase 1 (MVP - Statistical Algorithms)

| Component | Cost | Notes |
|-----------|------|-------|
| Development Time | Free | Your time |
| Google Cloud | $10-50/month | Minimal (logging, storage) |
| Database | $0-50/month | Already have PostgreSQL |
| **Total** | **$10-50/month** | Very affordable |

### 10.2 Phase 2 (Vertex AI)

| Component | Cost | Notes |
|-----------|------|-------|
| Vertex AI Training | $2-10 per model | One-time per model |
| Vertex AI Predictions | $0.05-0.25 per 1000 | Per prediction |
| BigQuery Storage | $6.25 per TB/month | Pay-as-you-go |
| BigQuery Queries | $6.25 per TB scanned | Query execution |
| **Total** | **$50-200/month** | Production-grade |

---

## 11. Testing Strategy

### 11.1 Unit Tests (Backend)

```javascript
describe('Analytics Service', () => {
  test('calculateAccuracy returns correct %', () => {
    const correct = 39, total = 50;
    const accuracy = calculateAccuracy(correct, total);
    expect(accuracy).toBe(78);
  });
  
  test('predictNEETScore returns reasonable number', () => {
    const prediction = predictNEETScore(userData);
    expect(prediction).toBeGreaterThan(100);
    expect(prediction).toBeLessThan(360);
  });
  
  test('identifyWeakTopics returns correct topics', () => {
    const weakTopics = identifyWeakTopics(performanceData);
    expect(weakTopics.length).toBeGreaterThan(0);
    expect(weakTopics[0].accuracy).toBeLessThan(60);
  });
});
```

### 11.2 Integration Tests (API)

```bash
# Test score analyzer
curl -X POST https://api.indraprasthaneetacademy.com/api/analytics/analyze-test/1 \
  -H "Authorization: Bearer $TOKEN"

# Test NEET prediction
curl https://api.indraprasthaneetacademy.com/api/analytics/predict-neet-score \
  -H "Authorization: Bearer $TOKEN"

# Test dashboard
curl https://api.indraprasthaneetacademy.com/api/analytics/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

### 11.3 User Testing

```
Test Scenarios:
1. Student takes first test → analytics should show
2. Student takes 5 tests → prediction should improve
3. Check heatmap colors match accuracy ranges
4. Verify suggestions are relevant to weak topics
5. Test with different user profiles (fast, slow, struggling, excelling)
```

---

## 12. Monitoring & Analytics

### 12.1 What to Monitor

```
Performance:
├── API response time (target: < 500ms)
├── Prediction accuracy vs actual scores
├── Database query times
└── Model training time

User Engagement:
├── % users viewing analytics
├── % users following suggestions
├── Feature usage frequency
└── User satisfaction (ratings)

Cost:
├── Google Cloud spend
├── Storage usage
├── Query costs
└── Model training costs
```

### 12.2 Alerts to Set Up

```
Alert if:
- Prediction accuracy < 70%
- API response time > 1000ms
- GCP billing > $100/day
- Heatmap update delay > 1 hour
- Database errors > 5/minute
```

---

## 13. Next Steps: Immediate Actions

### 13.1 Today
- [ ] Review this document
- [ ] Decide: Start with Phase 1 (MVP) or wait for ML?
- [ ] Create Google Cloud service account (Step 3.3)

### 13.2 This Week
- [ ] Migrate database schema (add analytics tables)
- [ ] Implement score analyzer algorithm
- [ ] Build dashboard APIs
- [ ] Create Flutter dashboard UI

### 13.3 Next Week
- [ ] Implement heatmap visualization
- [ ] Add prediction algorithm
- [ ] User testing
- [ ] Deploy to production

### 13.4 Phase 2 (Later)
- [ ] Set up Vertex AI
- [ ] Train ML models
- [ ] A/B test predictions
- [ ] Migrate to ML-based algorithms

---

## 14. Troubleshooting

### Common Issues

**Problem:** "Predictions are not accurate"
**Solution:** 
- Need more historical data (minimum 100 tests per user)
- Increase ML model training data
- Adjust algorithm weights based on validation results

**Problem:** "API too slow"
**Solution:**
- Cache results for 1 hour
- Use BigQuery for batch processing
- Add database indexes on user_id, date

**Problem:** "Out of GCP budget"
**Solution:**
- Use statistical algorithms (Phase 1) instead of ML
- Limit BigQuery queries
- Cache predictions

---

## 15. Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial AI implementation guide |

---

**Status:** READY FOR IMPLEMENTATION ✅  
**Next:** Review + Approval from tech lead
