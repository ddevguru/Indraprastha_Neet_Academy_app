const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/bio_tests_dump.json', 'utf8'));
const qs = dump['153'].questions;

qs.forEach((q, i) => {
  console.log(`\n================ Q${i+1} [ID: ${q.id}] Ans: ${q.correct_option} ================`);
  console.log(`Question: ${q.question}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  if (q.explanation) console.log(`Exp: ${q.explanation}`);
});
