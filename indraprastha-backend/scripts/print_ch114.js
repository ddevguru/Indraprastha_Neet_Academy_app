const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/dumps/ch114.json', 'utf8'));

const start = parseInt(process.argv[2] || '0');
const end = parseInt(process.argv[3] || '20');

dump.slice(start, end).forEach((q, idx) => {
  console.log(`=== [${start + idx}] ID: ${q.id} | Correct: ${q.correct_option} ===`);
  console.log(`Q: ${q.question}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  console.log(`Exp: ${q.explanation}\n`);
});

