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

async function run() {
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  const token = loginRes.data.token;
  console.log('Logged in successfully!');

  // Get books
  const booksRes = await request('https://api.indraprasthaneetacademy.com/api/admin/books', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const books = booksRes.data.books || booksRes.data || [];
  console.log(`Total books: ${books.length}`);

  let totalQuestions = 0;
  let totalWithSimilar = 0;
  let chapterStats = [];

  for (const book of books) {
    const chRes = await request(`https://api.indraprasthaneetacademy.com/api/admin/books/${book.id}/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const chapters = chRes.data.chapters || chRes.data || [];
    for (const ch of chapters) {
      const qRes = await request(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${ch.id}/pyqs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const qList = qRes.data.pyqs || qRes.data || [];
      if (qList.length > 0) {
        let withSim = 0;
        for (const q of qList) {
          if (q.similar_question && (typeof q.similar_question === 'object' || q.similar_question.length > 10)) {
            withSim++;
          }
        }
        totalQuestions += qList.length;
        totalWithSimilar += withSim;
        chapterStats.push({
          book: book.title || book.name,
          chapterId: ch.id,
          title: ch.title,
          total: qList.length,
          withSim,
          percent: ((withSim / qList.length) * 100).toFixed(1) + '%'
        });
      }
    }
  }

  console.log('\n================ FULL PYQS AUDIT REPORT ================');
  console.table(chapterStats);
  console.log(`\nOVERALL GRAND TOTAL:`);
  console.log(`Total PYQs in Database: ${totalQuestions}`);
  console.log(`Total Completed with Similar Question: ${totalWithSimilar}`);
  console.log(`Completion Rate: ${((totalWithSimilar / totalQuestions) * 100).toFixed(2)}%`);
}

run().catch(console.error);

