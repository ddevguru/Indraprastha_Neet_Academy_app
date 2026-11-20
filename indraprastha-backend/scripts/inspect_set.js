const fs = require('fs');

function inspect(file, start, end) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const qs = Array.isArray(data) ? data : (data.questions || data.data?.questions || []);
  console.log('Total questions in ' + file + ': ' + qs.length);
  for (let i = start; i < Math.min(end, qs.length); i++) {
    console.log(`[${i}] ID: ${qs[i].id} | Q: ${qs[i].question.replace(/\s+/g, ' ').substring(0, 100)}`);
    console.log(`    A: ${qs[i].option_a} | B: ${qs[i].option_b} | C: ${qs[i].option_c} | D: ${qs[i].option_d}`);
    console.log(`    Ans: ${qs[i].correct_option}`);
  }
}

const args = process.argv.slice(2);
const file = args[0] || 'practice_set_33_details.json';
const start = parseInt(args[1] || '0', 10);
const end = parseInt(args[2] || '35', 10);

inspect(file, start, end);
