const https = require('https');
const fs = require('fs');
const path = require('path');

const data = require('./test_109_questions.json');

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const q of data.questions) {
    if (q.question_image_url) {
      const dest = path.join(__dirname, `test109_q${q.id}.jpg`);
      await download(q.question_image_url, dest);
      console.log(`Downloaded test109_q${q.id}.jpg`);
    }
  }
  console.log('All images for Test 109 downloaded!');
}

run();
