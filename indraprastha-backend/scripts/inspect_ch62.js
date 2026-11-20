const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch62.json'), 'utf8'));

console.log('Total questions in Ch 62:', data.length);

const start = parseInt(process.argv[2] || '0');
const end = parseInt(process.argv[3] || '34');

data.slice(start, end).forEach((q, idx) => {
  const i = start + idx;
  console.log(`=== [${i}] ID: ${q.id} | Correct: ${q.correct_option} ===`);
  console.log(`Q: ${q.question}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  console.log(`Exp: ${(q.explanation || '').slice(0, 150)}`);
});

