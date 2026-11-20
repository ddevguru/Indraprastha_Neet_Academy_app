const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/bio_tests_dump.json', 'utf8'));

function printTest(testId, name) {
  const qs = dump[testId].questions;
  console.log(`\n==================== TEST ${testId}: ${name} (${qs.length} Qs) ====================`);
  qs.forEach((q, idx) => {
    console.log(`\n--- [Q${idx + 1}] ID: ${q.id} | Ans: ${q.correct_option} ---`);
    console.log(`Q: ${q.question}`);
    console.log(`A: ${q.option_a}`);
    console.log(`B: ${q.option_b}`);
    console.log(`C: ${q.option_c}`);
    console.log(`D: ${q.option_d}`);
    if (q.explanation) console.log(`Exp: ${q.explanation.substring(0, 100)}...`);
  });
}

printTest('92', 'Biodiversity and Conservation');
printTest('154', 'Environmental Issues');
