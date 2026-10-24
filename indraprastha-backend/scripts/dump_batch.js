const fs = require('fs');
const testFile = process.argv[2] || './scripts/test_95_details.json';
const start = parseInt(process.argv[3] || '0', 10);
const end = parseInt(process.argv[4] || '6', 10);

const data = JSON.parse(fs.readFileSync(testFile));
const batch = data.questions.slice(start, end);

batch.forEach((q, idx) => {
  console.log('----------------------------------------');
  console.log(`Q#${start + idx + 1} [ID: ${q.id}]`);
  console.log(`Question: ${q.question}`);
  console.log('Options:');
  console.log(`  (A) ${q.option_a}`);
  console.log(`  (B) ${q.option_b}`);
  console.log(`  (C) ${q.option_c}`);
  console.log(`  (D) ${q.option_d}`);
  console.log(`Correct: ${q.correct_option}`);
  if (q.question_image_link) console.log(`Question Image: ${q.question_image_link}`);
  if (q.explanation_image_link) console.log(`Explanation Image: ${q.explanation_image_link}`);
  if (q.explanation) console.log(`Explanation Text: ${q.explanation}`);
});
