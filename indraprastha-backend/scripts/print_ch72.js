const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch72.json'), 'utf8'));
console.log('Total questions in Ch 72:', data.length);
data.slice(0, 5).forEach((q, i) => {
  console.log(`\n=== [${i}] ID: ${q.id} | Correct: ${q.correct_option} ===`);
  console.log('Q:', q.question);
  console.log('A:', q.option_a);
  console.log('B:', q.option_b);
  console.log('C:', q.option_c);
  console.log('D:', q.option_d);
  console.log('Exp:', (q.explanation || '').slice(0, 100));
});
