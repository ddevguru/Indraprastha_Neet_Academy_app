const fs = require('fs');

const p1 = require('./set43_part1.js');
const p2 = require('./set43_part2.js');
const p3 = require('./set43_part3.js');

const allQuestions = [...p1, ...p2, ...p3];
console.log(`Total questions loaded for Set 43: ${allQuestions.length}`);

const originalQs = JSON.parse(fs.readFileSync('indraprastha-backend/scripts/practice_set_43_details.json', 'utf8'));
console.log(`Original questions in Set 43: ${originalQs.length}`);

let errors = 0;

if (allQuestions.length !== originalQs.length) {
  console.error(`Count mismatch: expected ${originalQs.length}, got ${allQuestions.length}`);
  errors++;
}

allQuestions.forEach((q, idx) => {
  const orig = originalQs[idx];
  if (!orig || q.id !== orig.id) {
    console.error(`ID mismatch at idx ${idx}: expected ${orig ? orig.id : 'undefined'}, got ${q.id}`);
    errors++;
  }
  const sim = q.similarQuestion;
  if (!sim) {
    console.error(`Missing similarQuestion at idx ${idx} (id: ${q.id})`);
    errors++;
    return;
  }
  ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'].forEach(f => {
    if (!sim[f] || typeof sim[f] !== 'string' || !sim[f].trim()) {
      console.error(`Missing or empty field '${f}' at idx ${idx} (id: ${q.id})`);
      errors++;
    }
  });

  if (!['A', 'B', 'C', 'D'].includes(sim.correct_option)) {
    console.error(`Invalid correct_option '${sim.correct_option}' at idx ${idx} (id: ${q.id})`);
    errors++;
  }

  const expectedEnding = `Therefore, Option (${sim.correct_option}) is the correct answer.`;
  if (!sim.explanation.endsWith(expectedEnding)) {
    console.error(`Invalid explanation ending at idx ${idx} (id: ${q.id}):`);
    console.error(`Got: "${sim.explanation.slice(-60)}"`);
    console.error(`Expected: "${expectedEnding}"`);
    errors++;
  }

  // Check LaTeX / forbidden characters
  const forbidden = ['$', '\\frac', '\\text', '\\begin', '\\end', '\\times', '\\rightarrow'];
  const fullText = `${sim.question} ${sim.option_a} ${sim.option_b} ${sim.option_c} ${sim.option_d} ${sim.explanation}`;
  forbidden.forEach(pat => {
    if (fullText.includes(pat)) {
      console.error(`Forbidden pattern '${pat}' found at idx ${idx} (id: ${q.id})`);
      errors++;
    }
  });

  // Check distinct options
  const opts = [sim.option_a, sim.option_b, sim.option_c, sim.option_d];
  const uniqueOpts = new Set(opts);
  if (uniqueOpts.size !== 4) {
    console.error(`Duplicate options at idx ${idx} (id: ${q.id}): ${opts}`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`✅ VERIFICATION PASSED: All ${allQuestions.length} questions for Set 43 are 100% compliant and ready to commit!`);
} else {
  console.error(`❌ VERIFICATION FAILED: ${errors} errors found.`);
  process.exit(1);
}

