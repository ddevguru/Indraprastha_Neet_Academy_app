const fs = require('fs');

async function main() {
  const setId = process.argv[2] || 2;
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

    const qRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-sets/${setId}/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const qs = Array.isArray(qData) ? qData : (qData.questions || []);
    
    const path = require('path');
    const outPath = path.join(__dirname, `practice_set_${setId}_details.json`);
    fs.writeFileSync(outPath, JSON.stringify(qs, null, 2));
    console.log(`Saved ${qs.length} questions for Practice Set ${setId} to ${outPath}`);
    
    qs.forEach((q, idx) => {
      console.log(`Q#${idx + 1} [ID: ${q.id}]`);
      console.log(`Question: ${q.question.replace(/\r?\n/g, ' ')}`);
      console.log(`Options: (A) ${q.option_a} | (B) ${q.option_b} | (C) ${q.option_c} | (D) ${q.option_d}`);
      console.log(`Correct: ${q.correct_option}`);
      console.log('----------------------------------------');
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
