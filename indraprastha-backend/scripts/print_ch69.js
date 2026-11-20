const fs = require('fs');
const ch = JSON.parse(fs.readFileSync('indraprastha-backend/scripts/dumps/ch69.json', 'utf8'));
const start = parseInt(process.argv[2] || '0', 10);
const end = parseInt(process.argv[3] || '17', 10);

for (let i = start; i < Math.min(end, ch.length); i++) {
  const q = ch[i];
  console.log(`=== [${i+1}] ID ${q.id} ===`);
  console.log(`Q: ${q.question.replace(/\n/g, ' ')}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  console.log(`Ans: ${q.correct_option}`);
  console.log(`Expl: ${q.explanation}`);
  console.log('');
}

