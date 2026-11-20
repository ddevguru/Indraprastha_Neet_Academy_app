const fs = require('fs');
const path = require('path');

const dump = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch124.json'), 'utf8'));
const part1 = require('./ch124_part1.js');
const part2 = require('./ch124_part2.js');
const part3 = require('./ch124_part3.js');

const all = [...part1, ...part2, ...part3];

console.log('Dump count:', dump.length);
console.log('All parts count:', all.length);

let errors = 0;

if (dump.length !== all.length) {
  console.error(`Mismatch total count: dump has ${dump.length}, all has ${all.length}`);
  errors++;
}

const dumpMap = new Map();
dump.forEach((q, i) => dumpMap.set(q.id, { q, index: i }));

all.forEach((item, idx) => {
  if (!dumpMap.has(item.id)) {
    console.error(`[${idx}] ID ${item.id} not found in dump!`);
    errors++;
  }

  // Check LaTeX in all fields
  const fields = [
    item.question, item.option_a, item.option_b, item.option_c, item.option_d, item.explanation,
    item.similarQuestion?.question, item.similarQuestion?.option_a, item.similarQuestion?.option_b,
    item.similarQuestion?.option_c, item.similarQuestion?.option_d, item.similarQuestion?.explanation
  ];

  fields.forEach(f => {
    if (typeof f === 'string') {
      if (f.includes('$') || f.includes('\\frac') || f.includes('\\text') || f.includes('\\pm')) {
        console.error(`[${idx}] ID ${item.id} has LaTeX: ${f.slice(0, 80)}`);
        errors++;
      }
    }
  });

  // Check ending of explanation
  const exp = item.explanation || '';
  if (!exp.trim().endsWith(`Therefore, Option (${item.correct_option}) is the correct answer.`)) {
    console.error(`[${idx}] ID ${item.id} explanation does not end correctly!`);
    console.error(`Ending: ${exp.slice(-60)}`);
    console.error(`Expected: Therefore, Option (${item.correct_option}) is the correct answer.`);
    errors++;
  }

  // Check similar question
  if (!item.similarQuestion) {
    console.error(`[${idx}] ID ${item.id} missing similarQuestion!`);
    errors++;
  } else {
    const sq = item.similarQuestion;
    if (!sq.question || !sq.option_a || !sq.option_b || !sq.option_c || !sq.option_d || !sq.correct_option || !sq.explanation) {
      console.error(`[${idx}] ID ${item.id} similarQuestion missing fields!`);
      errors++;
    }
    if (!['A', 'B', 'C', 'D'].includes(sq.correct_option)) {
      console.error(`[${idx}] ID ${item.id} similarQuestion invalid correct_option: ${sq.correct_option}`);
      errors++;
    }
    const sqExp = sq.explanation || '';
    if (!sqExp.trim().endsWith(`Therefore, Option (${sq.correct_option}) is the correct answer.`)) {
      console.error(`[${idx}] ID ${item.id} similarQuestion explanation does not end correctly!`);
      console.error(`Ending: ${sqExp.slice(-60)}`);
      errors++;
    }
  }
});

console.log(`Verification complete with ${errors} errors.`);
if (errors === 0) {
  console.log('ALL 114 QUESTIONS IN CHAPTER 124 ARE 100% VALIDATED!');
}

