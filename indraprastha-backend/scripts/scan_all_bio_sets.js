const API_URL = 'https://api.indraprasthaneetacademy.com/api';

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in successfully.');

  const setsRes = await fetch(`${API_URL}/admin/practice-sets`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const setsData = await setsRes.json();
  const allSets = setsData.practiceSets || setsData;

  const bioSets = allSets.filter(s => (s.subject || '').toUpperCase() === 'BIOLOGY')
    .sort((a, b) => a.id - b.id);

  console.log(`Found ${bioSets.length} Biology practice sets.`);

  const results = [];

  for (const s of bioSets) {
    try {
      const qRes = await fetch(`${API_URL}/admin/practice-sets/${s.id}/questions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const qData = await qRes.json();
      const questions = qData.questions || [];
      const total = questions.length;
      const completed = questions.filter(q => q.similar_question && (typeof q.similar_question === 'object' ? Object.keys(q.similar_question).length > 0 : !!q.similar_question)).length;
      results.push({
        id: s.id,
        class_label: s.class_label,
        title: s.title,
        total,
        completed,
        remaining: total - completed,
        status: total === 0 ? 'Empty' : (completed === total ? '100% COMPLETE' : `${completed}/${total}`)
      });
      console.log(`Set ${s.id} (${s.class_label} - ${s.title}): ${completed}/${total} completed.`);
    } catch (err) {
      console.error(`Error fetching set ${s.id}:`, err.message);
    }
  }

  console.log('\n=== BIOLOGY PRACTICE SETS SUMMARY ===\n');
  console.table(results);
}

main().catch(console.error);
