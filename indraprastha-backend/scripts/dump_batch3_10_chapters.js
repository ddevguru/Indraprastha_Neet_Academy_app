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

const chapters = [
  { id: 114, name: "Magnetism", subject: "Physics", count: 79 },
  { id: 76, name: "Thermal Properties of Matter", subject: "Physics", count: 81 },
  { id: 103, name: "D & F Block Elements", subject: "Chemistry", count: 82 },
  { id: 55, name: "Thermodynamics", subject: "Chemistry", count: 85 },
  { id: 121, name: "Dual Nature of Radiation & Matter", subject: "Physics", count: 87 },
  { id: 72, name: "System of Particles & Rotational Motion", subject: "Physics", count: 90 },
  { id: 77, name: "Thermodynamics", subject: "Physics", count: 92 },
  { id: 61, name: "P-Block Elements", subject: "Chemistry", count: 95 },
  { id: 62, name: "Organic Chemistry Basic Principles", subject: "Chemistry", count: 100 },
  { id: 104, name: "Co-ordination Compounds", subject: "Chemistry", count: 106 }
];

async function run() {
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  const token = loginRes.data.token;
  console.log('Logged in successfully!');

  if (!fs.existsSync('indraprastha-backend/scripts/dumps')) {
    fs.mkdirSync('indraprastha-backend/scripts/dumps', { recursive: true });
  }

  for (const ch of chapters) {
    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${ch.id}/pyqs`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const pyqs = res.data.pyqs || res.data;
    console.log(`Chapter ${ch.id} (${ch.name}): fetched ${pyqs.length} PYQs`);
    fs.writeFileSync(`indraprastha-backend/scripts/dumps/ch${ch.id}.json`, JSON.stringify(pyqs, null, 2));
  }

  console.log('Batch 3 (10 chapters) dumped successfully!');
}

run().catch(console.error);

