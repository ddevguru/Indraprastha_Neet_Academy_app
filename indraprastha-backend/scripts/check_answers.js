const https = require('https');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) };
    const req = https.request({ hostname: u.hostname, port: 443, path: u.pathname, method: 'POST', headers }, res => {
      let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject); req.write(data); req.end();
  });
}

function get(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = { 'Authorization': 'Bearer ' + token };
    const req = https.request({ hostname: u.hostname, port: 443, path: u.pathname, method: 'GET', headers }, res => {
      let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject); req.end();
  });
}

const pdfKeys = {
  1: 'A', // (1)
  2: 'B', // (2)
  3: 'D', // (4)
  4: 'A', // (1)
  5: 'A', // (1)
  6: 'B', // (2)
  7: 'D', // (4)
  8: 'D', // (4)
  9: 'C', // (3)
  10: 'D', // (4)
  11: 'D', // (4)
  12: 'B', // (2)
  13: 'A', // (1)
  14: 'C', // (3)
  15: 'D', // (4)
  16: 'C', // (3)
  17: 'D', // (4)
  18: 'B', // (2)
  19: 'B', // (2)
  20: 'C', // (3)
  21: 'B', // (2)
  22: 'D', // (4)
  23: 'A', // (1)
  24: 'C', // (3)
  25: 'D', // (4)
  26: 'A', // (1)
  27: 'B', // (2)
  28: 'B', // (2)
  29: 'C', // (3)
  30: 'D', // (4)
  31: 'D', // (4)
  32: 'A', // (1)
  33: 'D', // (4)
  34: 'B', // (2)
  35: 'A', // (1)
  36: 'D', // (4)
  37: 'B', // (2)
  38: 'C', // (3)
  39: 'C', // (3)
  40: 'D', // (4)
  41: 'D', // (4)
  42: 'A'  // (1)
};

async function main() {
  const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', JSON.stringify({
    username: 'indraprasthaadmin', password: 'indraprastha@123'
  }));
  const token = loginRes.token;
  const res = await get('https://api.indraprasthaneetacademy.com/api/admin/chapters/87/pyqs', token);
  const pyqs = res.pyqs || [];
  pyqs.sort((a,b) => a.id - b.id);
  
  let pdfQNums = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
  
  pyqs.forEach((q, idx) => {
    const qNum = pdfQNums[idx];
    const keyForQ = pdfKeys[qNum];
    const keyForIndex = pdfKeys[idx + 1];
    console.log(`Item #${idx+1} (PDF Q${qNum}): DB_Ans=${q.correct_option} | PDF_Q${qNum}_Key=${keyForQ} | PDF_Key#${idx+1}=${keyForIndex}`);
  });
}
main();

