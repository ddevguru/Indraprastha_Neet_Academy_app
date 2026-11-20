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
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function login() {
  const res = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    username: 'indraprasthaadmin',
    password: 'indraprastha@123'
  });
  return res.data.token;
}

const p1 = require('./ch104_part1.js');
const p2 = require('./ch104_part2.js');
const p3 = require('./ch104_part3.js');

const allQuestions = [...p1, ...p2, ...p3];

async function updateChapter104() {
  console.log(`Starting update for Chapter 104: ${allQuestions.length} questions...`);
  const token = await login();
  console.log('Logged in successfully, token received.');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const item = allQuestions[i];
    const payload = {
      question: item.question,
      option_a: item.option_a,
      option_b: item.option_b,
      option_c: item.option_c,
      option_d: item.option_d,
      correct_option: item.correct_option,
      explanation: item.explanation,
      similarQuestion: item.similarQuestion
    };

    try {
      const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }, payload);

      if (res.status === 200) {
        successCount++;
        process.stdout.write(`\r[${i + 1}/${allQuestions.length}] Updated ID: ${item.id} - SUCCESS`);
      } else {
        failCount++;
        console.error(`\n[${i + 1}/${allQuestions.length}] Failed ID: ${item.id} | Status: ${res.status}`, res.data);
      }
    } catch (err) {
      failCount++;
      console.error(`\n[${i + 1}/${allQuestions.length}] Error ID: ${item.id} | ${err.message}`);
    }
  }

  console.log(`\n\nChapter 104 Update Summary:`);
  console.log(`Total: ${allQuestions.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

updateChapter104().catch(console.error);

