const https = require('https');

function post(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyStr),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers,
    }, res => {
      let b = '';
      res.on('data', chunk => b += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(b));
        } catch (_) {
          resolve(b);
        }
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

function get(url, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'GET',
      headers,
    }, res => {
      let b = '';
      res.on('data', chunk => b += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(b));
        } catch (_) {
          resolve(b);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const login = await post('https://api.indraprasthaneetacademy.com/api/admin/login', {
    username: 'indraprasthaadmin',
    password: 'indraprastha@123',
  });
  if (!login.token) {
    console.error('Login failed:', login);
    return;
  }
  const token = login.token;
  console.log('Logged in successfully!');

  // Fetch all books
  const booksRes = await get('https://api.indraprasthaneetacademy.com/api/admin/books', token);
  const books = Array.isArray(booksRes) ? booksRes : (booksRes.books || []);
  console.log(`Fetched ${books.length} books.`);

  let totalChapters = 0;
  let totalPyqs = 0;
  let totalWithSimilar = 0;
  let totalWithoutSimilar = 0;

  const chaptersWithPyqs = [];

  for (const b of books) {
    const chRes = await get(`https://api.indraprasthaneetacademy.com/api/admin/books/${b.id}/chapters`, token);
    const chapters = Array.isArray(chRes) ? chRes : (chRes.chapters || []);
    for (const ch of chapters) {
      totalChapters++;
      const pyqsRes = await get(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${ch.id}/pyqs`, token);
      const pyqs = Array.isArray(pyqsRes) ? pyqsRes : (pyqsRes.pyqs || []);
      if (pyqs.length > 0) {
        let withSim = 0;
        let withoutSim = 0;
        for (const p of pyqs) {
          if (p.similar_question && (typeof p.similar_question === 'object' || p.similar_question.length > 10)) {
            withSim++;
          } else {
            withoutSim++;
          }
        }
        totalPyqs += pyqs.length;
        totalWithSimilar += withSim;
        totalWithoutSimilar += withoutSim;

        chaptersWithPyqs.push({
          bookId: b.id,
          bookTitle: b.title,
          classLabel: b.class_label,
          subject: b.subject,
          chapterId: ch.id,
          chapterTitle: ch.title,
          totalPyqs: pyqs.length,
          withSim,
          withoutSim,
        });
      }
    }
  }

  console.log('\n--- SUMMARY ---');
  console.log(`Total Books: ${books.length}`);
  console.log(`Total Chapters: ${totalChapters}`);
  console.log(`Chapters with PYQs: ${chaptersWithPyqs.length}`);
  console.log(`Total PYQs: ${totalPyqs}`);
  console.log(`Total with Similar Questions: ${totalWithSimilar}`);
  console.log(`Total WITHOUT Similar Questions: ${totalWithoutSimilar}`);
  console.log('\nDetailed Breakdown:');
  console.table(chaptersWithPyqs);
}

run().catch(console.error);
