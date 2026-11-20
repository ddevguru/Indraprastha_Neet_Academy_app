const https = require('https');

const part1 = require('./batch2_part1.js');
const part2 = require('./batch2_part2.js');
const part3 = require('./batch2_part3.js');
const part4 = require('./batch2_part4.js');
const allQuestions = [...part1, ...part2, ...part3, ...part4];

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function login() {
  const payload = JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' });
  const res = await request({
    hostname: 'api.indraprasthaneetacademy.com',
    port: 443,
    path: '/api/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, payload);

  if (res.status === 200 && res.data.token) {
    console.log('Login successful.');
    return res.data.token;
  }
  throw new Error('Login failed: ' + JSON.stringify(res));
}

async function updateQuestion(id, similarQuestion, token) {
  const payload = JSON.stringify({ similarQuestion });
  const res = await request({
    hostname: 'api.indraprasthaneetacademy.com',
    port: 443,
    path: `/api/admin/test-questions/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'Authorization': `Bearer ${token}`
    }
  }, payload);

  if (res.status !== 200) {
    throw new Error(`Failed to update question ${id}: status ${res.status} - ${JSON.stringify(res.data)}`);
  }
  return res.data;
}

async function main() {
  console.log(`Starting Batch 2 Live Update for ${allQuestions.length} questions...`);
  const token = await login();

  let successCount = 0;
  for (let i = 0; i < allQuestions.length; i++) {
    const item = allQuestions[i];
    try {
      await updateQuestion(item.id, item.similarQuestion, token);
      successCount++;
      if (successCount % 20 === 0 || successCount === allQuestions.length) {
        console.log(`Progress: ${successCount} / ${allQuestions.length} updated successfully.`);
      }
    } catch (err) {
      console.error(`Error updating ID ${item.id}:`, err.message);
      // Wait and retry once
      await new Promise(r => setTimeout(r, 1000));
      await updateQuestion(item.id, item.similarQuestion, token);
      successCount++;
    }
    // Small delay to be gentle on server
    await new Promise(r => setTimeout(r, 60));
  }
  console.log(`\nBATCH 2 COMPLETE: Successfully updated ${successCount} / ${allQuestions.length} questions live!`);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
