const p1 = require('./ch53_part1.js');
const p2 = require('./ch53_part2.js');
const p3 = require('./ch53_part3.js');
const all = [...p1, ...p2, ...p3];

let errors = 0;
all.forEach((item, idx) => {
  const qNum = idx + 1;
  const str = JSON.stringify(item);
  if (str.includes('$') || str.includes('\\frac') || str.includes('\\text')) {
    console.error(`Item ${qNum} (ID ${item.id}) contains LaTeX markup!`);
    errors++;
  }
  if (!item.explanation.trim().endsWith('is the correct answer.')) {
    console.error(`Item ${qNum} explanation does not end with standard conclusion!`);
    errors++;
  }
  if (!item.similarQuestion) {
    console.error(`Item ${qNum} missing similarQuestion!`);
    errors++;
  } else {
    const sq = item.similarQuestion;
    if (!sq.question || !sq.option_a || !sq.option_b || !sq.option_c || !sq.option_d || !sq.correct_option || !sq.explanation) {
      console.error(`Item ${qNum} similarQuestion missing fields!`);
      errors++;
    }
    if (!sq.explanation.trim().endsWith('is the correct answer.')) {
      console.error(`Item ${qNum} similarQuestion explanation does not end with standard conclusion!`);
      errors++;
    }
  }
});

console.log('Quality validation complete. Total errors:', errors);

