const setId = process.argv[2] || '33';
const API_URL = 'https://api.indraprasthaneetacademy.com/api';

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
  const qs = data.questions || (Array.isArray(data) ? data : []);
  console.log(`Set ${setId}: Fetched ${qs.length} questions from live server`);
  let hasSim = 0;
  let missingSim = 0;
  qs.forEach(q => {
    if (q.similar_question && Object.keys(q.similar_question).length > 0) {
      hasSim++;
    } else {
      missingSim++;
    }
  });
  console.log(`Set ${setId} Live Audit Result: ${hasSim} with similar question, ${missingSim} missing`);
}

main().catch(console.error);

