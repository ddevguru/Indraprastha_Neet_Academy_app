// verify_ch72.js
const p1 = require('./ch72_part1');
const p2 = require('./ch72_part2');
const p3 = require('./ch72_part3');

const all = [...p1, ...p2, ...p3];
console.log(`Total questions loaded: ${all.length}`);

if (all.length !== 90) {
  console.error(`ERROR: Expected 90 questions, got ${all.length}`);
  process.exit(1);
}

const seenIds = new Set();
let hasError = false;

all.forEach((item, idx) => {
  if (seenIds.has(item.id)) {
    console.error(`[Q ${idx}] Duplicate ID: ${item.id}`);
    hasError = true;
  }
  seenIds.add(item.id);

  ['originalQuestion', 'similarQuestion'].forEach(key => {
    const q = item[key];
    if (!q) {
      console.error(`[Q ${idx} ID ${item.id}] Missing ${key}`);
      hasError = true;
      return;
    }

    ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'].forEach(field => {
      if (!q[field] || typeof q[field] !== 'string' || q[field].trim() === '') {
        console.error(`[Q ${idx} ID ${item.id}] ${key}.${field} is empty or missing`);
        hasError = true;
      }
    });

    if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
      console.error(`[Q ${idx} ID ${item.id}] ${key}.correct_option invalid: ${q.correct_option}`);
      hasError = true;
    }

    // Check ending
    const expectedEnd = `Therefore, Option (${q.correct_option}) is the correct answer.`;
    if (!q.explanation.trim().endsWith(expectedEnd)) {
      console.error(`[Q ${idx} ID ${item.id}] ${key}.explanation does not end with '${expectedEnd}'\nGot: ${q.explanation.slice(-70)}`);
      hasError = true;
    }

    // Check LaTeX
    ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'explanation'].forEach(field => {
      const text = q[field];
      if (text.includes('$') || text.includes('\\frac') || text.includes('\\text{')) {
        console.error(`[Q ${idx} ID ${item.id}] ${key}.${field} contains LaTeX markup!`);
        hasError = true;
      }
    });
  });
});

if (hasError) {
  console.error("Verification FAILED!");
  process.exit(1);
} else {
  console.log("Verification PASSED! All 90 questions 100% valid with 0 LaTeX and perfect ending format.");
}

