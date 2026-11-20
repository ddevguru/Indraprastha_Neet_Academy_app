const https = require('https');
const fs = require('fs');
const path = require('path');

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

async function dumpFinal4() {
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  const token = loginRes.data.token;
  console.log('Logged in successfully!');

  const targets = [
    { id: 124, name: 'ch124.json' },
    { id: 37, name: 'ch37.json' },
    { id: 112, name: 'ch112.json' },
    { id: 54, name: 'ch54.json' }
  ];

  const dumpsDir = path.join(__dirname, 'dumps');
  if (!fs.existsSync(dumpsDir)) fs.mkdirSync(dumpsDir);

  for (const t of targets) {
    console.log(`Fetching chapter ${t.id}...`);
    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${t.id}/pyqs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const pyqs = res.data.pyqs || res.data || [];
    fs.writeFileSync(path.join(dumpsDir, t.name), JSON.stringify(pyqs, null, 2));
    console.log(`Saved ${pyqs.length} Qs to ${t.name}`);
  }
}

dumpFinal4().catch(console.error);

