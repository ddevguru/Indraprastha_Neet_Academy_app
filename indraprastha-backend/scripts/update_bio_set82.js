const p1 = require('./set82_part1.js');
const p2 = require('./set82_part2.js');
const p3 = require('./set82_part3.js');
const p4 = require('./set82_part4.js');

const questions = [...p1, ...p2, ...p3, ...p4];
const API_URL = 'https://api.indraprasthaneetacademy.com/api';

async function main() {
  console.log(`Starting update for Set 82: Sexual Reproduction in Flowering Plants (${questions.length} questions)...`);
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Logged in successfully, token received.');

  let success = 0;
  let failed = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    try {
      const res = await fetch(`${API_URL}/admin/practice-questions/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ similarQuestion: q.similarQuestion })
      });
      if (res.ok) {
        success++;
        if (success % 20 === 0 || success === questions.length) {
          console.log(`Progress: ${success}/${questions.length} updated successfully.`);
        }
      } else {
        const err = await res.text();
        console.error(`Failed to update question ID ${q.id}:`, res.status, err);
        failed++;
      }
    } catch (e) {
      console.error(`Exception updating question ID ${q.id}:`, e.message);
      failed++;
    }
  }

  console.log(`\nCompleted Set 82. Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);

