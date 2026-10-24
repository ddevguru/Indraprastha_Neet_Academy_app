const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  const jsonFile = process.argv[2] || 'test_109_questions.json';
  const prefix = process.argv[3] || 'test109';
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const questions = data.questions || [];

  for (const q of questions) {
    if (q.question_image_link) {
      const dest = path.join(__dirname, `${prefix}_q${q.id}.jpg`);
      try {
        await download(q.question_image_link, dest);
        console.log(`Downloaded ${prefix}_q${q.id}.jpg (${fs.statSync(dest).size} bytes)`);
      } catch (err) {
        console.error(`Failed ${prefix}_q${q.id}:`, err.message);
      }
    }
  }
}

run();
