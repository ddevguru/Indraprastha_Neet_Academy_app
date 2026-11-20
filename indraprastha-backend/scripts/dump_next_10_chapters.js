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
  { id: 52, name: "Structure of Atom", subject: "Chemistry", count: 60 },
  { id: 71, name: "Work Power Energy", subject: "Physics", count: 61 },
  { id: 80, name: "Waves", subject: "Physics", count: 62 },
  { id: 109, name: "Biomolecules", subject: "Chemistry", count: 63 },
  { id: 116, name: "Alternating Current", subject: "Physics", count: 64 },
  { id: 64, name: "Ionic Equilibrium", subject: "Chemistry", count: 64 },
  { id: 63, name: "Hydrocarbons", subject: "Chemistry", count: 70 },
  { id: 101, name: "Chemical Kinetics", subject: "Chemistry", count: 71 },
  { id: 100, name: "Electrochemistry", subject: "Chemistry", count: 73 },
  { id: 111, name: "Electrostatics Potential & Capacitance", subject: "Physics", count: 74 }
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

  console.log('Next 10 chapters dumped successfully!');
}

run().catch(console.error);

