const fs = require('fs');
const path = require('path');

const dump = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch54.json'), 'utf8'));

const start = parseInt(process.argv[2] || '0', 10);
const end = parseInt(process.argv[3] || '39', 10);

for (let i = start; i < Math.min(end, dump.length); i++) {
  const item = dump[i];
  console.log(`--- [${i}] ID: ${item.id} (Ans: ${item.correct_option}) ---`);
  console.log(`Q: ${item.question}`);
  console.log(`A: ${item.option_a}`);
  console.log(`B: ${item.option_b}`);
  console.log(`C: ${item.option_c}`);
  console.log(`D: ${item.option_d}`);
  console.log(`Exp: ${item.explanation}`);
}

