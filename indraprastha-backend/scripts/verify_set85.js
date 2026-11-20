const fs = require('fs');

const p1 = require('./set85_part1.js');
const p2 = require('./set85_part2.js');
const p3 = require('./set85_part3.js');
const p4 = require('./set85_part4.js');

const all = [...p1, ...p2, ...p3, ...p4];
console.log('Total merged questions for Set 85:', all.length);

const rawData = JSON.parse(fs.readFileSync('c:/indraprastha/indraprastha-backend/scripts/practice_set_85_details.json', 'utf8'));
const rawQs = Array.isArray(rawData) ? rawData : (rawData.questions || rawData.data?.questions || []);
console.log('Original questions in set 85:', rawQs.length);

if (all.length !== rawQs.length) {
  console.error(`Mismatch in length: all=${all.length}, raw=${rawQs.length}`);
  process.exit(1);
}

const seenIds = new Set();
let errors = 0;

all.forEach((item, index) => {
  if (!item.id) {
    console.error(`Item at index ${index} missing id`);
    errors++;
  }
  if (seenIds.has(item.id)) {
    console.error(`Duplicate ID found: ${item.id} at index ${index}`);
    errors++;
  }
  seenIds.add(item.id);

  if (item.id !== rawQs[index].id) {
    console.error(`ID mismatch at index ${index}: got ${item.id}, expected ${rawQs[index].id}`);
    errors++;
  }

  const sq = item.similarQuestion;
  if (!sq) {
    console.error(`Missing similarQuestion at ID ${item.id}`);
    errors++;
    return;
  }

  const fields = ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'explanation'];
  for (const f of fields) {
    if (!sq[f] || typeof sq[f] !== 'string' || sq[f].trim() === '') {
      console.error(`Empty or invalid field '${f}' at ID ${item.id}`);
      errors++;
    }
  }

  if (!['A', 'B', 'C', 'D'].includes(sq.correct_option)) {
    console.error(`Invalid correct_option '${sq.correct_option}' at ID ${item.id}`);
    errors++;
  }

  // Check unique options
  const opts = [sq.option_a.trim(), sq.option_b.trim(), sq.option_c.trim(), sq.option_d.trim()];
  const uniqueOpts = new Set(opts);
  if (uniqueOpts.size !== 4) {
    console.error(`Duplicate options at ID ${item.id}:`, opts);
    errors++;
  }

  // Check LaTeX
  const allText = `${sq.question} ${sq.option_a} ${sq.option_b} ${sq.option_c} ${sq.option_d} ${sq.explanation}`;
  if (allText.includes('$') || allText.includes('\\frac') || allText.includes('\\text')) {
    console.error(`LaTeX detected at ID ${item.id}`);
    errors++;
  }

  // Check ending
  const expectedEnding = `Therefore, Option (${sq.correct_option}) is the correct answer.`;
  if (!sq.explanation.trim().endsWith(expectedEnding)) {
    console.error(`Invalid explanation ending at ID ${item.id}. Expected: "${expectedEnding}", Got ending: "${sq.explanation.slice(-60)}"`);
    errors++;
  }
});

if (errors === 0) {
  console.log('✅ ALL 149 QUESTIONS FOR SET 85 PASSED VERIFICATION PERFECTLY!');
} else {
  console.error(`❌ Found ${errors} verification errors.`);
  process.exit(1);
}

