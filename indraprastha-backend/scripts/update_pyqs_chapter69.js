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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const p1 = require('./ch69_part1.js');
const p2 = require('./ch69_part2.js');
const p3 = require('./ch69_part3.js');
const pyqsData = [...p1, ...p2, ...p3];

async function loginWithRetry(retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    console.log(`Logging in to live API (attempt ${attempt}/${retries})...`);
    try {
      const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, {
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      });

      if (loginRes.data && loginRes.data.token) {
        return loginRes.data.token;
      }
      console.log(`Login status ${loginRes.status}, waiting to retry...`);
    } catch (err) {
      console.log(`Login error: ${err.message}, waiting to retry...`);
    }
    await sleep(3000);
  }
  throw new Error('Failed to login after multiple retries.');
}

async function run() {
  const token = await loginWithRetry();
  console.log(`Login successful! Updating ${pyqsData.length} PYQs in Chapter 69 (Motion in a Plane)...`);

  for (let i = 0; i < pyqsData.length; i++) {
    const item = pyqsData[i];
    console.log(`[${i+1}/${pyqsData.length}] Updating PYQ ID ${item.id}...`);

    const updatePayload = {
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctOption: item.correctOption,
      explanation: item.explanation,
      similarQuestion: item.similarQuestion
    };

    let updated = false;
    for (let retry = 1; retry <= 3; retry++) {
      try {
        const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }, updatePayload);

        if (res.data && res.data.success) {
          console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
          updated = true;
          break;
        } else {
          console.warn(`  -> Retry ${retry}: Failed status ${res.status}`);
          await sleep(2000);
        }
      } catch (e) {
        console.warn(`  -> Retry ${retry}: Error ${e.message}`);
        await sleep(2000);
      }
    }

    if (!updated) {
      console.error(`Failed to update PYQ ${item.id} after retries.`);
      process.exit(1);
    }
  }

  console.log(`\n🎉 COMPLETED: ${pyqsData.length}/${pyqsData.length} PYQs in Chapter 69 (Motion in a Plane) updated live!`);
}

run().catch(console.error);
