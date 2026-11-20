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

const p1 = require('./ch77_part1.js');
const p2 = require('./ch77_part2.js');
const p3 = require('./ch77_part3.js');

const allQuestions = [...p1, ...p2, ...p3];

async function updateChapter77() {
  console.log(`Starting update for Chapter 77: ${allQuestions.length} questions...`);
  const token = await login();
  console.log('Logged in successfully, token received.');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const item = allQuestions[i];
    const payload = {
      question: item.originalQuestion.question,
      option_a: item.originalQuestion.option_a,
      option_b: item.originalQuestion.option_b,
      option_c: item.originalQuestion.option_c,
      option_d: item.originalQuestion.option_d,
      correct_option: item.originalQuestion.correct_option,
      explanation: item.originalQuestion.explanation,
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

      if (res.status === 200 || res.status === 201) {
        successCount++;
        if (successCount % 10 === 0 || successCount === allQuestions.length) {
          console.log(`[${successCount}/${allQuestions.length}] Updated Q ID ${item.id} successfully`);
        }
      } else {
        console.error(`Failed Q ID ${item.id}: status ${res.status}`, res.data);
        failCount++;
      }
    } catch (err) {
      console.error(`Error on Q ID ${item.id}:`, err.message);
      failCount++;
    }
  }

  console.log(`\n=== Update Completed ===`);
  console.log(`Total: ${allQuestions.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

updateChapter77();

