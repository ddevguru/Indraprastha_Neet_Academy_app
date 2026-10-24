const fs = require('fs');

async function main() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Login failed');

    const qRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/tests/94/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const questions = qData.questions || [];
    console.log(`Total questions in Test 94 (Atomic structure): ${questions.length}`);
    fs.writeFileSync('./scripts/test_94_details.json', JSON.stringify(qData, null, 2));

    const slice = questions.slice(0, 6);
    slice.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${idx + 1} [ID: ${q.id}]`);
      console.log(`Question: ${q.question}`);
      console.log(`Options:`);
      console.log(`  (A) ${q.option_a}`);
      console.log(`  (B) ${q.option_b}`);
      console.log(`  (C) ${q.option_c}`);
      console.log(`  (D) ${q.option_d}`);
      console.log(`Correct: ${q.correct_option}`);
      if (q.question_image_link) console.log(`Question Image: ${q.question_image_link}`);
      if (q.explanation_image_link) console.log(`Explanation Image: ${q.explanation_image_link}`);
      if (q.explanation) console.log(`Explanation Text: ${q.explanation}`);
      if (q.similar_question) console.log(`Existing Similar Q:`, JSON.stringify(q.similar_question));
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
