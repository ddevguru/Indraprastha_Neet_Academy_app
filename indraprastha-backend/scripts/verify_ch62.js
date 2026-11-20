const fs = require('fs');
const path = require('path');

const dump = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch62.json'), 'utf8'));
const p1 = require('./ch62_part1.js');
const p2 = require('./ch62_part2.js');
const p3 = require('./ch62_part3.js');

const all = [...p1, ...p2, ...p3];
console.log(`Total questions in dump: ${dump.length}`);
console.log(`Total questions generated: ${all.length}`);

if (dump.length !== all.length) {
  console.error(`Mismatch in question count! Expected ${dump.length}, got ${all.length}`);
  process.exit(1);
}

let errors = 0;
const latexPattern = /\\\(|\\\[|\$|\\frac|\\text|\\sqrt/;

all.forEach((item, index) => {
  const orig = item.originalQuestion;
  const sim = item.similarQuestion;
  const dumpQ = dump[index];

  if (item.id !== dumpQ.id) {
    console.error(`[Q${index}] ID mismatch: generated ${item.id} vs dump ${dumpQ.id}`);
    errors++;
  }

  // Check LaTeX in original and similar
  ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'explanation'].forEach(field => {
    if (orig[field] && latexPattern.test(orig[field])) {
      console.error(`[Q${index} ID:${item.id}] LaTeX found in original.${field}: ${orig[field].slice(0, 80)}`);
      errors++;
    }
    if (sim[field] && latexPattern.test(sim[field])) {
      console.error(`[Q${index} ID:${item.id}] LaTeX found in similar.${field}: ${sim[field].slice(0, 80)}`);
      errors++;
    }
  });

  // Check ending of original explanation
  const expectedEndOrig = `Therefore, Option (${orig.correct_option}) is the correct answer.`;
  if (!orig.explanation.trim().endsWith(expectedEndOrig)) {
    console.error(`[Q${index} ID:${item.id}] Original explanation does not end with '${expectedEndOrig}'`);
    errors++;
  }

  // Check ending of similar explanation
  const expectedEndSim = `Therefore, Option (${sim.correct_option}) is the correct answer.`;
  if (!sim.explanation.trim().endsWith(expectedEndSim)) {
    console.error(`[Q${index} ID:${item.id}] Similar explanation does not end with '${expectedEndSim}'`);
    errors++;
  }

  // Check options existence in similarQuestion
  ['option_a', 'option_b', 'option_c', 'option_d'].forEach(opt => {
    if (!sim[opt] || sim[opt].trim() === '') {
      console.error(`[Q${index} ID:${item.id}] Similar missing ${opt}`);
      errors++;
    }
  });
});

if (errors === 0) {
  console.log(`\n>>> SUCCESS: All ${all.length} questions in Chapter 62 passed verification with ZERO errors! <<<`);
} else {
  console.error(`\n>>> FAILURE: ${errors} errors found! <<<`);
  process.exit(1);
}

