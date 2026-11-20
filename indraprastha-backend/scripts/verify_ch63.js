const fs = require('fs');

const p1 = require('./ch63_part1.js');
const p2 = require('./ch63_part2.js');
const p3 = require('./ch63_part3.js');

const all = [...p1, ...p2, ...p3];
console.log('Total combined questions:', all.length);

const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/dumps/ch63.json', 'utf8'));
console.log('Total dump questions:', dump.length);

let errors = 0;
const dumpIds = new Set(dump.map(q => q.id));
const seenIds = new Set();

all.forEach((item, idx) => {
  if (!dumpIds.has(item.id)) {
    console.error(`[Error] ID ${item.id} at index ${idx} not in dump!`);
    errors++;
  }
  if (seenIds.has(item.id)) {
    console.error(`[Error] Duplicate ID ${item.id} at index ${idx}!`);
    errors++;
  }
  seenIds.add(item.id);

  ['originalQuestion', 'similarQuestion'].forEach(key => {
    const q = item[key];
    if (!q) {
      console.error(`[Error] Missing ${key} in ID ${item.id}`);
      errors++;
      return;
    }

    ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'].forEach(f => {
      if (!q[f] || typeof q[f] !== 'string' || q[f].trim() === '') {
        console.error(`[Error] Missing or empty field ${f} in ${key} for ID ${item.id}`);
        errors++;
      }
    });

    const fullText = `${q.question} ${q.option_a} ${q.option_b} ${q.option_c} ${q.option_d} ${q.explanation}`;
    if (fullText.includes('$') || fullText.includes('\\frac') || fullText.includes('\\text')) {
      console.error(`[Error] LaTeX detected in ${key} for ID ${item.id}!`);
      errors++;
    }

    const expectedEnding = `Therefore, Option (${q.correct_option}) is the correct answer.`;
    if (!q.explanation.trim().endsWith(expectedEnding)) {
      console.error(`[Error] Explanation does not end with '${expectedEnding}' in ${key} for ID ${item.id}`);
      console.error(`Actual ending: ${q.explanation.slice(-60)}`);
      errors++;
    }
  });
});

if (seenIds.size !== dump.length) {
  console.error(`[Error] Mismatch in count: seen ${seenIds.size} vs dump ${dump.length}`);
  errors++;
}

if (errors === 0) {
  console.log('SUCCESS: All 70 questions verified cleanly with 0 errors!');
} else {
  console.error(`FAILED with ${errors} errors.`);
  process.exit(1);
}

