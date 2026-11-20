const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/bio_tests_dump.json', 'utf8'));

const p1 = require('./batch4_part1.js');
const p2 = require('./batch4_part2.js');
const p3 = require('./batch4_part3.js');
const p4 = require('./batch4_part4.js');

function normalizePart(part) {
  const result = {};
  if (Array.isArray(part)) {
    part.forEach(item => {
      result[item.id] = item.similarQuestion || item;
    });
  } else {
    Object.entries(part).forEach(([id, item]) => {
      result[id] = item.similarQuestion || item;
    });
  }
  return result;
}

const map1 = normalizePart(p1);
const map2 = normalizePart(p2);
const map3 = normalizePart(p3);
const map4 = normalizePart(p4);

const allBatch4 = { ...map1, ...map2, ...map3, ...map4 };
console.log(`P1 count: ${Object.keys(map1).length}`);
console.log(`P2 count: ${Object.keys(map2).length}`);
console.log(`P3 count: ${Object.keys(map3).length}`);
console.log(`P4 count: ${Object.keys(map4).length}`);
console.log(`Total questions in combined Batch 4: ${Object.keys(allBatch4).length}`);

const batch4Tests = ['86', '87', '88', '89', '90', '91', '92', '154', '153'];
let expectedIds = [];
batch4Tests.forEach(tId => {
  const qs = dump[tId].questions;
  qs.forEach(q => expectedIds.push(q.id));
});

console.log(`Expected questions from dump across 9 tests: ${expectedIds.length}`);

let missing = 0;
let errors = 0;

expectedIds.forEach(id => {
  const q = allBatch4[id];
  if (!q) {
    console.error(`MISSING: ID ${id}`);
    missing++;
    return;
  }

  // Check required fields
  const fields = ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'];
  for (const f of fields) {
    if (!q[f] || typeof q[f] !== 'string' || q[f].trim() === '') {
      console.error(`ERROR: ID ${id} missing field ${f}`);
      errors++;
    }
  }

  // Check correct_option
  if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
    console.error(`ERROR: ID ${id} invalid correct_option: ${q.correct_option}`);
    errors++;
  }

  // Check distinct options
  const opts = [q.option_a, q.option_b, q.option_c, q.option_d];
  const uniqueOpts = new Set(opts.map(o => o.trim()));
  if (uniqueOpts.size !== 4) {
    console.error(`ERROR: ID ${id} has duplicate options:`, opts);
    errors++;
  }

  // Check explanation ending
  const expectedEnding = `Therefore, Option (${q.correct_option}) is the correct answer.`;
  if (!q.explanation.trim().endsWith(expectedEnding)) {
    console.error(`ERROR: ID ${id} explanation ending mismatch. Expected "${expectedEnding}", got: "${q.explanation.slice(-50)}"`);
    errors++;
  }

  // Check LaTeX / forbidden characters
  const forbidden = ['$', '\\frac', '\\text', '\\begin', '\\pm', '\\times', '\\circ'];
  for (const forb of forbidden) {
    for (const f of fields) {
      if (q[f] && q[f].includes(forb)) {
        console.error(`ERROR: ID ${id} field ${f} contains forbidden LaTeX '${forb}': ${q[f]}`);
        errors++;
      }
    }
  }
});

console.log(`\nVerification Summary:`);
console.log(`Missing questions: ${missing}`);
console.log(`Formatting errors: ${errors}`);

if (missing === 0 && errors === 0) {
  console.log(`\n>>> SUCCESS: ALL 200 QUESTIONS IN BATCH 4 ARE 100% VALIDATED AND READY TO PUSH! <<<`);
} else {
  process.exit(1);
}
