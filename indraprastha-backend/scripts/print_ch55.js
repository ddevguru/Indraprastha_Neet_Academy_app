// print_ch55.js
const fs = require('fs');
const d = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/dumps/ch55.json', 'utf8'));

const start = parseInt(process.argv[2] || '0', 10);
const end = parseInt(process.argv[3] || '30', 10);

for (let i = start; i < Math.min(end, d.length); i++) {
  const q = d[i];
  console.log(`=== [${i}] ID: ${q.id} | Correct: ${q.correct_option} ===`);
  console.log(`Q: ${q.question}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  console.log(`Exp: ${q.explanation}\n`);
}

