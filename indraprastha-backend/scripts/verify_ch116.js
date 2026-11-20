const fs = require('fs');

const p1 = require('./ch116_part1.js');
const p2 = require('./ch116_part2.js');
const p3 = require('./ch116_part3.js');

const all = [...p1, ...p2, ...p3];
console.log('Total items in all parts:', all.length);

const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/dumps/ch116.json', 'utf8'));
console.log('Total items in dump:', dump.length);

if (all.length !== dump.length) {
  console.error(`Mismatch in lengths: all=${all.length}, dump=${dump.length}`);
}

const dumpIds = new Set(dump.map(d => d.id));
const allIds = new Set(all.map(a => a.id));

for (const id of dumpIds) {
  if (!allIds.has(id)) {
    console.error(`Missing ID from dump: ${id}`);
  }
}

let errors = 0;
all.forEach((q, idx) => {
  // Check options
  if (!q.optionA || !q.optionB || !q.optionC || !q.optionD) {
    console.error(`[${idx}] Missing option in question ID ${q.id}`);
    errors++;
  }
  if (!['A', 'B', 'C', 'D'].includes(q.correctOption)) {
    console.error(`[${idx}] Invalid correctOption in question ID ${q.id}: ${q.correctOption}`);
    errors++;
  }
  // Check LaTeX
  const fields = [q.question, q.optionA, q.optionB, q.optionC, q.optionD, q.explanation];
  if (q.similarQuestion) {
    fields.push(
      q.similarQuestion.question,
      q.similarQuestion.option_a,
      q.similarQuestion.option_b,
      q.similarQuestion.option_c,
      q.similarQuestion.option_d,
      q.similarQuestion.explanation
    );
    if (!['A', 'B', 'C', 'D'].includes(q.similarQuestion.correct_option)) {
      console.error(`[${idx}] Invalid similarQuestion.correct_option in ID ${q.id}: ${q.similarQuestion.correct_option}`);
      errors++;
    }
  } else {
    console.error(`[${idx}] Missing similarQuestion in question ID ${q.id}`);
    errors++;
  }

  for (const f of fields) {
    if (typeof f !== 'string') {
      console.error(`[${idx}] Field not a string in ID ${q.id}`);
      errors++;
      continue;
    }
    if (f.includes('$') || f.includes('\\frac') || f.includes('\\text') || f.includes('\\times')) {
      console.error(`[${idx}] LaTeX detected in ID ${q.id}: ${f.slice(0, 50)}`);
      errors++;
    }
  }

  if (!q.explanation.trim().endsWith(`Therefore, Option (${q.correctOption}) is the correct answer.`)) {
    console.error(`[${idx}] Explanation does not end with required sentence in ID ${q.id}`);
    console.error(`Actual end: "${q.explanation.slice(-60)}"`);
    errors++;
  }
  if (q.similarQuestion && !q.similarQuestion.explanation.trim().endsWith(`Therefore, Option (${q.similarQuestion.correct_option}) is the correct answer.`)) {
    console.error(`[${idx}] SimilarQuestion explanation does not end with required sentence in ID ${q.id}`);
    console.error(`Actual end: "${q.similarQuestion.explanation.slice(-60)}"`);
    errors++;
  }
});

console.log(`Verification completed with ${errors} errors.`);

