const fs = require('fs');
const path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch72.json'), 'utf8'));
[480, 460, 457, 456, 454].forEach(id => {
  const q = d.find(x => x.id === id);
  console.log(`\n=== ID ${q.id} | Correct: ${q.correct_option} ===`);
  console.log('Q:', q.question);
  console.log('A:', q.option_a);
  console.log('B:', q.option_b);
  console.log('C:', q.option_c);
  console.log('D:', q.option_d);
  console.log('Exp:', q.explanation);
});

