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

  let allChapters = [];
  for (const book of books) {
    const chRes = await request(`https://api.indraprasthaneetacademy.com/api/admin/books/${book.id}/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const chapters = chRes.data.chapters || chRes.data || [];
    for (const ch of chapters) {
      allChapters.push({
        id: ch.id,
        name: ch.title || ch.name,
        bookTitle: book.title || book.name,
        classLevel: book.class_level || book.classLevel,
        subject: book.subject,
        pyqCount: ch.linked_pyq_count || ch.pyqs_count || 0
      });
    }
  }

  // Filter only chapters with pyqs > 0
  const chaptersWithPyqs = allChapters.filter(c => c.pyqCount > 0);
  console.log(`Chapters with PYQs > 0: ${chaptersWithPyqs.length}`);

  // For each chapter, check how many have similar_question
  let summary = [];
  for (const ch of chaptersWithPyqs) {
    const pyqsRes = await request(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${ch.id}/pyqs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const pyqs = pyqsRes.data.pyqs || pyqsRes.data || [];
    const completed = pyqs.filter(q => q.similar_question && (typeof q.similar_question === 'object' ? Object.keys(q.similar_question).length > 0 : q.similar_question.length > 5)).length;
    summary.push({
      id: ch.id,
      name: ch.name,
      subject: ch.subject,
      classLevel: ch.classLevel,
      total: pyqs.length,
      completed,
      pending: pyqs.length - completed
    });
  }

  summary.sort((a, b) => a.pending - b.pending);
  console.log('\n=== PYQ CHAPTERS AUDIT ===');
  console.table(summary);

  const pendingChapters = summary.filter(s => s.pending > 0);
  console.log(`\nRemaining chapters with pending PYQs: ${pendingChapters.length}`);
  console.table(pendingChapters);
}

run().catch(console.error);

