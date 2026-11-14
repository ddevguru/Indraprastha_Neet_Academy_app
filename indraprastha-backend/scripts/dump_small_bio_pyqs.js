const https = require('https');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

function get(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function dump(chapterIds) {
  const login = await post('https://api.indraprasthaneetacademy.com/api/admin/login', {
    username: 'indraprasthaadmin',
    password: 'indraprastha@123'
  });
  const token = login.token;

  for (const id of chapterIds) {
    const res = await get(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${id}/pyqs`, token);
    const pyqs = res.pyqs || res || [];
    console.log(`\n================ CHAPTER ${id} (${pyqs.length} PYQs) ================`);
    for (const q of pyqs) {
      console.log(`\nID: ${q.id} | Year: ${q.year_label}`);
      console.log(`Q: ${q.question}`);
      console.log(`A: ${q.option_a}`);
      console.log(`B: ${q.option_b}`);
      console.log(`C: ${q.option_c}`);
      console.log(`D: ${q.option_d}`);
      console.log(`Correct: ${q.correct_option}`);
      console.log(`Exp: ${q.explanation ? q.explanation.substring(0, 120) + '...' : 'None'}`);
    }
  }
}

dump([32, 33, 34]).catch(console.error);

