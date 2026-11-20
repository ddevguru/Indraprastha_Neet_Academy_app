const fs = require('fs');

const part1 = require('./batch1_part1.js');
const part2 = require('./batch1_part2.js');
const part3 = require('./batch1_part3.js');

const allQuestions = [...part1, ...part2, ...part3];
console.log('Total questions in Batch 1:', allQuestions.length);

const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/bio_tests_dump.json', 'utf8'));
const targetTestIds = ['59', '60', '61', '62', '65', '66', '67', '68'];
let expectedIds = [];
targetTestIds.forEach(tid => {
  expectedIds = expectedIds.concat(dump[tid].questions.map(q => q.id));
});
console.log('Expected question IDs count:', expectedIds.length);

let errors = 0;
const seenIds = new Set();

allQuestions.forEach((item, idx) => {
  const id = item.id;
  const sq = item.similarQuestion;
  if (!sq) {
    console.error(`Error at index ${idx}: Missing similarQuestion for ID ${id}`);
    errors++;
    return;
  }

  if (seenIds.has(id)) {
    console.error(`Duplicate ID found: ${id}`);
    errors++;
  }
  seenIds.add(id);

  if (!expectedIds.includes(id)) {
    console.error(`ID ${id} not found in expected tests!`);
    errors++;
  }

  const fields = ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'];
  fields.forEach(f => {
    if (!sq[f] || typeof sq[f] !== 'string' || sq[f].trim() === '') {
      console.error(`ID ${id}: Field ${f} is empty or missing!`);
      errors++;
    }
  });

  if (!['A', 'B', 'C', 'D'].includes(sq.correct_option)) {
    console.error(`ID ${id}: Invalid correct_option '${sq.correct_option}'`);
    errors++;
  }

  const opts = [sq.option_a, sq.option_b, sq.option_c, sq.option_d];
  const uniqueOpts = new Set(opts.map(o => o.trim().toLowerCase()));
  if (uniqueOpts.size < 4) {
    console.error(`ID ${id}: Duplicate options detected!`);
    errors++;
  }

  const fullText = `${sq.question} ${sq.option_a} ${sq.option_b} ${sq.option_c} ${sq.option_d} ${sq.explanation}`;
  if (fullText.includes('$') || fullText.includes('\\frac') || fullText.includes('\\text')) {
    console.error(`ID ${id}: LaTeX syntax detected!`);
    errors++;
  }

  const exp = sq.explanation.trim();
  const expectedEnd = `Therefore, Option (${sq.correct_option}) is the correct answer.`;
  if (!exp.endsWith(expectedEnd)) {
    console.error(`ID ${id}: Explanation does not end with '${expectedEnd}'! Ends with: '${exp.slice(-50)}'`);
    errors++;
  }
});

expectedIds.forEach(id => {
  if (!seenIds.has(id)) {
    console.error(`Missing expected question ID: ${id}`);
    errors++;
  }
});

console.log(`Verification completed with ${errors} errors.`);
if (errors === 0) {
  console.log('BATCH 1 VERIFICATION 100% PASSED PERFECTLY!');
} else {
  process.exit(1);
}
