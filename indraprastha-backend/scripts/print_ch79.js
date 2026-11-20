const fs = require('fs');
const ch79 = JSON.parse(fs.readFileSync('indraprastha-backend/scripts/dumps/ch79.json', 'utf8'));

const start = parseInt(process.argv[2] || '0', 10);
const count = parseInt(process.argv[3] || '10', 10);

console.log(`Total questions in ch79: ${ch79.length}`);
ch79.slice(start, start + count).forEach((q, idx) => {
  const i = start + idx + 1;
  console.log(`\n=== [${i}] ID ${q.id} ===`);
  console.log(`Q: ${q.question}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  console.log(`Ans: ${q.correct_option}`);
  console.log(`Expl: ${q.explanation?.slice(0, 100)}`);
});

