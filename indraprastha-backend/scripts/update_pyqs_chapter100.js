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

const p1 = require('./ch100_part1.js');
const p2 = require('./ch100_part2.js');
const p3 = require('./ch100_part3.js');
const questions = [...p1, ...p2, ...p3];

async function updateChapter100() {
  console.log(`Starting update for Chapter 100 (Electrochemistry) - Total ${questions.length} questions...`);
  const token = await login();
  console.log('Logged in successfully, token received.');

  let successCount = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const payload = {
      question: q.originalQuestion ? q.originalQuestion.question : q.question,
      optionA: q.originalQuestion ? q.originalQuestion.option_a : q.optionA,
      optionB: q.originalQuestion ? q.originalQuestion.option_b : q.optionB,
      optionC: q.originalQuestion ? q.originalQuestion.option_c : q.optionC,
      optionD: q.originalQuestion ? q.originalQuestion.option_d : q.optionD,
      correctOption: q.originalQuestion ? q.originalQuestion.correct_option : q.correctOption,
      explanation: q.originalQuestion ? q.originalQuestion.explanation : q.explanation,
      similarQuestion: q.similarQuestion
    };

    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, payload);

    if (res.status === 200 || res.status === 201) {
      successCount++;
      if ((i + 1) % 10 === 0 || i + 1 === questions.length) {
        console.log(`Progress: ${i + 1}/${questions.length} updated successfully.`);
      }
    } else {
      console.error(`Failed to update ID ${q.id}:`, res.status, res.data);
    }
  }

  console.log(`\nCOMPLETED: ${successCount}/${questions.length} questions updated live in Chapter 100 (Electrochemistry).`);
}

updateChapter100().catch(err => {
  console.error('Fatal error in updateChapter100:', err);
  process.exit(1);
});

