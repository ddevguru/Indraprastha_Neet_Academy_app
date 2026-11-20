const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/bio_tests_dump.json', 'utf8'));
const qs = dump['153'].questions;

const start = parseInt(process.argv[2] || '0', 10);
const end = parseInt(process.argv[3] || '10', 10);

console.log(`Showing questions ${start + 1} to ${Math.min(end, qs.length)} of ${qs.length}`);
for (let i = start; i < Math.min(end, qs.length); i++) {
  const q = qs[i];
  console.log(`\n================ Q${i+1} [ID: ${q.id}] Ans: ${q.correct_option} ================`);
  console.log(`Q: ${q.question}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  if (q.explanation) console.log(`Exp: ${q.explanation.substring(0, 150)}`);
}
