const API_URL = 'https://api.indraprasthaneetacademy.com/api';
const fs = require('fs');

const setId = process.argv[2];
if (!setId) {
  console.error('Please specify set ID');
  process.exit(1);
}

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  const res = await fetch(`${API_URL}/admin/practice-sets/${setId}/questions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const qs = data.questions || data;
  fs.writeFileSync(`practice_set_${setId}_details.json`, JSON.stringify(data, null, 2));
  console.log(`Saved practice_set_${setId}_details.json. Total questions: ${qs.length}`);
  const missing = qs.filter(q => !q.similar_question && !q.similarQuestion);
  console.log(`Missing similar questions: ${missing.length}`);
}

main().catch(console.error);
