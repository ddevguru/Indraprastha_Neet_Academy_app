const fs = require('fs');
const qs = require('./practice_set_4_details.json');

console.log('Total questions in Set 4:', qs.length);
qs.forEach((q, idx) => {
  console.log(`Q#${idx + 1} [ID: ${q.id}]`);
  console.log(`Question: ${q.question.replace(/\r?\n/g, ' ')}`);
  console.log(`Options: (A) ${q.option_a} | (B) ${q.option_b} | (C) ${q.option_c} | (D) ${q.option_d}`);
  console.log(`Correct: ${q.correct_option}`);
  console.log('----------------------------------------');
});
