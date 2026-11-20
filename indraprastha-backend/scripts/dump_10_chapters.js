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
  { id: 68, name: "Motion in a Straight Line", subject: "Physics", count: 42 },
  { id: 53, name: "Classification of Elements & Periodicity", subject: "Chemistry", count: 44 },
  { id: 99, name: "Solutions", subject: "Chemistry", count: 48 },
  { id: 69, name: "Motion in a Plane", subject: "Physics", count: 51 },
  { id: 106, name: "Alcohol Phenol & Ethers", subject: "Chemistry", count: 52 },
  { id: 70, name: "Laws Of Motion", subject: "Physics", count: 53 },
  { id: 66, name: "Unit & Dimension", subject: "Physics", count: 55 },
  { id: 51, name: "Some Basic Concepts of Chemistry", subject: "Chemistry", count: 55 },
  { id: 79, name: "Oscillations", subject: "Physics", count: 56 },
  { id: 108, name: "Organic Compounds Containing Nitrogen", subject: "Chemistry", count: 58 }
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

  console.log('All 10 chapters dumped successfully!');
}

run().catch(console.error);

