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

    const res = await fetch('https://api.indraprasthaneetacademy.com/api/admin/tests', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    const tests = Array.isArray(data) ? data : (data.tests || []);
    
    console.log(`Total tests in system: ${tests.length}`);
    const chemTests = tests.filter(t => 
      (t.subject && t.subject.toLowerCase().includes('chem')) ||
      (t.name && (t.name.toLowerCase().includes('chemistry') || t.name.toLowerCase().includes('chem')))
    );
    
    console.log(`\n--- CHEMISTRY TESTS (${chemTests.length}) ---`);
    chemTests.forEach(t => {
      console.log(`ID: ${t.id} | Title: ${t.title || t.name} | Subject: ${t.subject} | Qs: ${t.total_questions || t.question_count || 'N/A'}`);
    });

    // Save full list to file for easy reference
    fs.writeFileSync('./scripts/all_tests_summary.json', JSON.stringify(tests.map(t => ({
      id: t.id,
      title: t.title || t.name,
      subject: t.subject
    })), null, 2));

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
