const API_URL = 'https://api.indraprasthaneetacademy.com/api';

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${API_URL}/admin/practice-sets`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const sets = data.practiceSets || [];
  
  const chem11 = sets.filter(s => (s.subject === 'CHEMISTRY' || s.subject === 'Chemistry') && (s.class_label === 'Class 11' || s.class_label === '11th' || s.class_level === '11'));
  
  console.log(`Found ${chem11.length} Chemistry Class 11 sets:`);
  for (const s of chem11.sort((a,b) => a.id - b.id)) {
    const qRes = await fetch(`${API_URL}/admin/practice-sets/${s.id}/questions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const questions = qData.questions || (Array.isArray(qData) ? qData : []);
    const done = questions.filter(q => q.similar_question != null).length;
    console.log(`Set ${s.id}: "${s.title}" - Total Qs: ${questions.length}, Done: ${done}`);
  }
}

main().catch(console.error);
