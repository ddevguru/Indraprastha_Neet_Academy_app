const https = require('https');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function run() {
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  const token = loginRes.data.token;
  console.log('Logged in successfully!');

  // 1. Audit Practice Sets (Topic-wise MCQs)
  console.log('\n================ AUDITING ALL PRACTICE SETS ================');
  const setsRes = await request('https://api.indraprasthaneetacademy.com/api/admin/practice-sets', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const sets = setsRes.data.practiceSets || setsRes.data.sets || [];
  console.log(`Total practice sets found: ${sets.length}`);

  let pendingPracticeSets = [];
  let completedPracticeSets = [];
  let emptyPracticeSets = [];

  let practiceTotals = { totalQ: 0, withSim: 0, pendingQ: 0 };

  for (const s of sets) {
    const qRes = await request(`https://api.indraprasthaneetacademy.com/api/admin/practice-sets/${s.id}/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const questions = qRes.data.questions || qRes.data || [];
    if (questions.length === 0) {
      emptyPracticeSets.push({ id: s.id, title: s.title, subject: s.subject || s.topic });
      continue;
    }

    let withSim = 0;
    for (const q of questions) {
      if (q.similar_question && (typeof q.similar_question === 'object' || (typeof q.similar_question === 'string' && q.similar_question.length > 10))) {
        withSim++;
      }
    }
    const pending = questions.length - withSim;

    practiceTotals.totalQ += questions.length;
    practiceTotals.withSim += withSim;
    practiceTotals.pendingQ += pending;

    const info = {
      id: s.id,
      title: s.title,
      subject: s.subject || s.batch_name || '',
      class: s.class_label || '',
      total: questions.length,
      withSim,
      pending
    };

    if (pending > 0) {
      pendingPracticeSets.push(info);
    } else {
      completedPracticeSets.push(info);
    }
  }

  console.log(`\nPractice Sets Overview:`);
  console.log(`Total Questions: ${practiceTotals.totalQ}`);
  console.log(`Completed with Similar Question: ${practiceTotals.withSim} (${((practiceTotals.withSim / practiceTotals.totalQ) * 100).toFixed(1)}%)`);
  console.log(`Pending Questions: ${practiceTotals.pendingQ}`);
  console.log(`Sets 100% Done: ${completedPracticeSets.length}`);
  console.log(`Sets with Pending Qs: ${pendingPracticeSets.length}`);
  console.log(`Empty Sets (0 Qs): ${emptyPracticeSets.length}`);

  if (pendingPracticeSets.length > 0) {
    console.log(`\nPENDING PRACTICE SETS DETAIL:`);
    console.table(pendingPracticeSets);
  }

  // 2. Audit Tests (Test Series)
  console.log('\n================ AUDITING ALL TEST SERIES ================');
  const testsRes = await request('https://api.indraprasthaneetacademy.com/api/admin/tests', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const tests = testsRes.data.tests || [];
  console.log(`Total tests found: ${tests.length}`);

  let pendingTests = [];
  let completedTests = [];
  let emptyTests = [];

  let testTotals = { totalQ: 0, withSim: 0, pendingQ: 0 };

  for (const t of tests) {
    const qRes = await request(`https://api.indraprasthaneetacademy.com/api/admin/tests/${t.id}/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const questions = qRes.data.questions || qRes.data || [];
    if (questions.length === 0) {
      emptyTests.push({ id: t.id, title: t.title });
      continue;
    }

    let withSim = 0;
    for (const q of questions) {
      if (q.similar_question && (typeof q.similar_question === 'object' || (typeof q.similar_question === 'string' && q.similar_question.length > 10))) {
        withSim++;
      }
    }
    const pending = questions.length - withSim;

    testTotals.totalQ += questions.length;
    testTotals.withSim += withSim;
    testTotals.pendingQ += pending;

    const info = {
      id: t.id,
      title: t.title,
      total: questions.length,
      withSim,
      pending
    };

    if (pending > 0) {
      pendingTests.push(info);
    } else {
      completedTests.push(info);
    }
  }

  console.log(`\nTest Series Overview:`);
  console.log(`Total Questions: ${testTotals.totalQ}`);
  console.log(`Completed with Similar Question: ${testTotals.withSim} (${((testTotals.withSim / testTotals.totalQ) * 100).toFixed(1)}%)`);
  console.log(`Pending Questions: ${testTotals.pendingQ}`);
  console.log(`Tests 100% Done: ${completedTests.length}`);
  console.log(`Tests with Pending Qs: ${pendingTests.length}`);
  console.log(`Empty Tests (0 Qs): ${emptyTests.length}`);

  if (pendingTests.length > 0) {
    console.log(`\nPENDING TESTS DETAIL:`);
    console.table(pendingTests);
  }
}

run().catch(console.error);
