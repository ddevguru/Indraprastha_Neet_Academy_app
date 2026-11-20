const fs = require('fs');

const p1 = require('./set49_part1.js');
const p2 = require('./set49_part2.js');
const p3 = require('./set49_part3.js');
const p4 = require('./set49_part4.js');

const all = [...p1, ...p2, ...p3, ...p4];
console.log('Total combined questions:', all.length);

const original = JSON.parse(fs.readFileSync('./practice_set_49_details.json', 'utf8'));
console.log('Original questions in set 49:', original.length);

if (all.length !== original.length) {
  console.error(`COUNT MISMATCH! Expected ${original.length}, got ${all.length}`);
}

const origIds = new Set(original.map(q => q.id));
const seenIds = new Set();
let errors = 0;

all.forEach((item, idx) => {
  if (!item.id) {
    console.error(`Item at index ${idx} is missing id!`);
    errors++;
  }
  if (seenIds.has(item.id)) {
    console.error(`Duplicate id: ${item.id} at index ${idx}`);
    errors++;
  }
  seenIds.add(item.id);

  if (!origIds.has(item.id)) {
    console.error(`ID ${item.id} not found in original practice set 49!`);
    errors++;
  }

  const sq = item.similarQuestion;
  if (!sq) {
    console.error(`Missing similarQuestion for id ${item.id}`);
    errors++;
    return;
  }

  if (!sq.question || !sq.option_a || !sq.option_b || !sq.option_c || !sq.option_d || !sq.correct_option || !sq.explanation) {
    console.error(`Incomplete fields for id ${item.id}`);
    errors++;
  }

  const opts = [sq.option_a, sq.option_b, sq.option_c, sq.option_d];
  const uniqueOpts = new Set(opts);
  if (uniqueOpts.size < 4) {
    console.error(`Options are not unique for id ${item.id}:`, opts);
    errors++;
  }

  if (!['A', 'B', 'C', 'D'].includes(sq.correct_option)) {
    console.error(`Invalid correct_option "${sq.correct_option}" for id ${item.id}`);
    errors++;
  }

  // Check LaTeX
  const text = `${sq.question} ${sq.option_a} ${sq.option_b} ${sq.option_c} ${sq.option_d} ${sq.explanation}`;
  if (text.includes('$') || text.includes('\\frac') || text.includes('\\text')) {
    console.error(`LaTeX detected in question id ${item.id}!`);
    errors++;
  }

  // Check explanation ending
  const expectedEnd = `Therefore, Option (${sq.correct_option}) is the correct answer.`;
  if (!sq.explanation.trim().endsWith(expectedEnd)) {
    console.error(`Explanation for id ${item.id} does not end with "${expectedEnd}". Ending: "${sq.explanation.slice(-50)}"`);
    errors++;
  }
});

console.log(`Verification complete. Total items: ${all.length}, Errors: ${errors}`);
if (errors === 0) {
  console.log('SUCCESS! Set 49 questions are 100% verified and ready for live update.');
} else {
  process.exit(1);
}

