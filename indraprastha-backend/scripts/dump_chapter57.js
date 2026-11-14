const https = require('https');
const fs = require('fs');

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

  const pyqRes = await request('https://api.indraprasthaneetacademy.com/api/admin/chapters/57/pyqs', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const pyqs = pyqRes.data.pyqs || pyqRes.data;
  console.log(`Fetched ${pyqs.length} PYQs for Chapter 57 (Chemical Equilibrium)`);
  fs.writeFileSync('indraprastha-backend/scripts/dump_ch57.json', JSON.stringify(pyqs, null, 2));
  console.log('Dumped to indraprastha-backend/scripts/dump_ch57.json');
}

run().catch(console.error);
