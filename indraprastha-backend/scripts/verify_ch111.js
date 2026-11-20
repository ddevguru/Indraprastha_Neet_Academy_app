const fs = require('fs');

const dump = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/dumps/ch111.json', 'utf8'));
const p1 = require('./ch111_part1.js');
const p2 = require('./ch111_part2.js');
const p3 = require('./ch111_part3.js');

const all = [...p1, ...p2, ...p3];

console.log(`Total questions loaded: ${all.length} (Dump has: ${dump.length})`);

let errors = 0;
const dumpIds = new Set(dump.map(q => q.id));
const loadedIds = new Set(all.map(q => q.id));

if (all.length !== dump.length) {
  console.error(`Count mismatch: Loaded ${all.length} vs Dump ${dump.length}`);
  errors++;
}

// Check missing or extra IDs
for (const id of dumpIds) {
  if (!loadedIds.has(id)) {
    console.error(`Missing ID from dump: ${id}`);
    errors++;
  }
}

const latexPattern = /[$]|\\frac|\\text|\\sqrt|\\alpha|\\beta|\\times|\\approx/;

all.forEach((item, idx) => {
  const orig = item.originalQuestion;
  const sim = item.similarQuestion;

  if (!orig) {
    console.error(`Item ${idx} (ID: ${item.id}) missing originalQuestion`);
    errors++;
  } else {
    ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'].forEach(field => {
      if (!orig[field]) {
        console.error(`Item ${idx} (ID: ${item.id}) originalQuestion missing ${field}`);
        errors++;
      }
    });
    if (!['A', 'B', 'C', 'D'].includes(orig.correct_option)) {
      console.error(`Item ${idx} (ID: ${item.id}) originalQuestion invalid correct_option: ${orig.correct_option}`);
      errors++;
    }
    if (!orig.explanation.trim().endsWith(`Therefore, Option (${orig.correct_option}) is the correct answer.`)) {
      console.error(`Item ${idx} (ID: ${item.id}) originalQuestion explanation ending mismatch: "${orig.explanation.slice(-60)}"`);
      errors++;
    }
    if (latexPattern.test(orig.explanation) || latexPattern.test(orig.question)) {
      console.error(`Item ${idx} (ID: ${item.id}) originalQuestion contains LaTeX markup!`);
      errors++;
    }
  }

  if (!sim) {
    console.error(`Item ${idx} (ID: ${item.id}) missing similarQuestion`);
    errors++;
  } else {
    ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'].forEach(field => {
      if (!sim[field]) {
        console.error(`Item ${idx} (ID: ${item.id}) similarQuestion missing ${field}`);
        errors++;
      }
    });
    if (!['A', 'B', 'C', 'D'].includes(sim.correct_option)) {
      console.error(`Item ${idx} (ID: ${item.id}) similarQuestion invalid correct_option: ${sim.correct_option}`);
      errors++;
    }
    if (!sim.explanation.trim().endsWith(`Therefore, Option (${sim.correct_option}) is the correct answer.`)) {
      console.error(`Item ${idx} (ID: ${item.id}) similarQuestion explanation ending mismatch: "${sim.explanation.slice(-60)}"`);
      errors++;
    }
    if (latexPattern.test(sim.explanation) || latexPattern.test(sim.question)) {
      console.error(`Item ${idx} (ID: ${item.id}) similarQuestion contains LaTeX markup!`);
      errors++;
    }
  }
});

if (errors === 0) {
  console.log('ALL 74 QUESTIONS IN CHAPTER 111 ARE 100% VALID AND COMPLIANT!');
} else {
  console.error(`Found ${errors} validation errors.`);
  process.exit(1);
}

