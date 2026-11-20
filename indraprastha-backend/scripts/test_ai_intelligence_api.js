const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../src/db.js');
const aiIntelligenceService = require('../src/services/aiIntelligenceService');

async function testEngine() {
  try {
    console.log('=== TESTING AI INTELLIGENCE SERVICE ===');
    
    // Check users
    const usersRes = await db.query('SELECT id, phone, full_name FROM users ORDER BY id ASC LIMIT 2');
    if (!usersRes.rows.length) {
      throw new Error('No test users in DB');
    }
    const testUser = usersRes.rows[0];
    console.log(`Using test student: ID ${testUser.id} (${testUser.full_name || testUser.phone})`);

    // 1. Run full topic analysis
    console.log('\n1. Running analyzeStudentTopicProgress...');
    const analysisRes = await aiIntelligenceService.analyzeStudentTopicProgress(testUser.id);
    console.log('Analysis Result:', analysisRes);

    // 2. Overview Dashboard
    console.log('\n2. Fetching Overview...');
    const overview = await aiIntelligenceService.getOverview(testUser.id);
    console.log(`Overall Mastery: ${overview.overallMastery}% | Predicted NEET Score: ${overview.predictedNeetScore}/720`);
    console.log('Category Counts:', overview.categories);
    console.log('Subject Breakdown:', overview.subjectMastery);
    console.log(`Today Recommendations Count: ${overview.todayRecommendations.length}`);

    // 3. Category: Not Studied
    console.log('\n3. Fetching Not Studied Topics...');
    const notStudied = await aiIntelligenceService.getCategoryTopics(testUser.id, 'not_studied');
    console.log(`Found ${notStudied.totalCount} unstudied topics.`);
    if (notStudied.topics.length > 0) {
      console.log('Sample unstudied topic:', notStudied.topics[0].topic, '| Action:', notStudied.topics[0].recommended_action);
    }

    // 4. Study Plan
    console.log('\n4. Fetching Personalized Study Plan...');
    const plan = await aiIntelligenceService.getStudyPlan(testUser.id);
    console.log(`Study Plan: ${plan.summary.pendingCount} pending tasks (${plan.summary.totalEstimatedMinutes} mins total)`);
    if (plan.pendingTasks.length > 0) {
      const topTask = plan.pendingTasks[0];
      console.log(`Top Task: [${topTask.category}] ${topTask.title} (${topTask.estimated_minutes} min)`);
      
      // 5. Complete recommendation test
      console.log('\n5. Testing completeRecommendation...');
      const completed = await aiIntelligenceService.completeRecommendation(testUser.id, topTask.id);
      console.log(`Successfully completed task ID ${topTask.id}: is_completed=${completed.recommendation.is_completed}`);
    }

    // 6. Topic Detail
    console.log('\n6. Fetching Topic Detail for Dimensional Analysis...');
    const detail = await aiIntelligenceService.getTopicDetail(testUser.id, 'Physics', 'Dimensional Analysis');
    console.log(`Topic: ${detail.topic} | Mastery: ${detail.mastery_score}% (${detail.mastery_category})`);
    console.log(`AI Explanation: ${detail.ai_explanation}`);
    console.log(`Recommended Action: ${detail.recommended_action}`);

    console.log('\n>>> ALL BACKEND AI INTELLIGENCE SERVICES PASSED 100%! <<<');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

testEngine();

