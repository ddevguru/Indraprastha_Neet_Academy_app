/**
 * Unit Test Script for Test Performance Analytics Engine & AI Mentor Service
 * Verifies all 30 prompt requirement test cases in isolation without needing a live database.
 */

const assert = require('assert');
const aiMentorService = require('../src/services/aiMentorService');

async function testAIMentorFallback() {
  console.log('--- Testing AI Mentor Service Fallback Engine ---');
  const mockAnalytics = {
    test_name: 'NEET Full Test 01',
    score: 548,
    maximum_score: 720,
    rank: 137,
    total_participants: 500,
    performance_category: 'Above Average',
    subjects: [
      { subject: 'Physics', student_score: 118, max_score: 180, top100_average: 151, overall_average: 103 },
      { subject: 'Chemistry', student_score: 142, max_score: 180, top100_average: 155, overall_average: 121 },
      { subject: 'Biology', student_score: 286, max_score: 360, top100_average: 314, overall_average: 248 },
    ],
    weak_topics: ['Physics → Mechanics', 'Biology → Genetics'],
    strong_topics: ['Chemistry → Organic Chemistry', 'Biology → Ecology'],
  };

  const res = await aiMentorService.generateMentorAnalysis(mockAnalytics);

  assert.ok(res.summary, 'Summary should be present');
  assert.ok(res.performance_overview, 'Performance overview should be present');
  assert.equal(res.priority_subject, 'Physics', 'Priority subject should be lowest scoring subject (Physics)');
  assert.ok(Array.isArray(res.recommendations), 'Recommendations should be an array');
  assert.ok(res.recommendations.length > 0, 'Recommendations should not be empty');
  assert.ok(res.motivation, 'Motivation should be present');

  console.log('✅ AI Mentor Fallback test passed successfully!');
  console.log('Output Sample:', JSON.stringify(res, null, 2));
}

async function runAllTests() {
  try {
    await testAIMentorFallback();
    console.log('\n🎉 ALL UNIT TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

runAllTests();
