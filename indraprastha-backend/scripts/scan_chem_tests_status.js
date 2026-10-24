const API_URL = 'https://api.indraprasthaneetacademy.com/api';

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in successfully.');

  const res = await fetch(`${API_URL}/admin/tests`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const tests = Array.isArray(data) ? data : (data.tests || []);

  const chemTests = tests.filter(t => 
    (t.subject && t.subject.toLowerCase().includes('chem')) ||
    (t.name && (t.name.toLowerCase().includes('chemistry') || t.name.toLowerCase().includes('chem'))) ||
    (t.title && (t.title.toLowerCase().includes('chemistry') || t.title.toLowerCase().includes('chem')))
  ).sort((a, b) => a.id - b.id);

  console.log(`Found ${chemTests.length} Chemistry tests.`);

  const summary = [];

  for (const t of chemTests) {
    try {
      const qRes = await fetch(`${API_URL}/admin/tests/${t.id}/questions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const qData = await qRes.json();
      const questions = Array.isArray(qData) ? qData : (qData.questions || []);
      const total = questions.length;
      const completed = questions.filter(q => q.similar_question && (typeof q.similar_question === 'object' ? Object.keys(q.similar_question).length > 0 : !!q.similar_question)).length;
      
      summary.push({
        id: t.id,
        title: t.title || t.name,
        total,
        completed,
        remaining: total - completed,
        status: total === 0 ? 'Empty' : (completed === total ? '100% COMPLETE' : `${completed}/${total}`)
      });
      console.log(`Test ${t.id} (${t.title || t.name}): ${completed}/${total} completed.`);
    } catch (err) {
      console.error(`Error for test ${t.id}:`, err.message);
    }
  }

  console.log('\n=== CHEMISTRY TESTS STATUS ===\n');
  console.table(summary);
}

main().catch(console.error);
