const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/bio_tests_dump.json', 'utf8'));
const qs = dump['153'].questions;
console.log(`Total questions in Test 153: ${qs.length}`);
qs.forEach((q, i) => {
  console.log(`Q${i+1} ID:${q.id} Ans:${q.correct_option} | ${q.question ? q.question.replace(/\n/g, ' ').substring(0, 85) : ''}`);
});
