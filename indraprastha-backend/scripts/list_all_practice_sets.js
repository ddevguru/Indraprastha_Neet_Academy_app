const API_URL = 'https://api.indraprasthaneetacademy.com/api';

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in.');

  const res = await fetch(`${API_URL}/admin/practice-sets`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('Total sets:', Array.isArray(data) ? data.length : typeof data);
  
  if (Array.isArray(data)) {
    // Print all sets with id, title/name, subject, class
    console.log(JSON.stringify(data.map(s => ({
      id: s.id,
      title: s.title || s.name,
      subject: s.subject || s.subject_name,
      class_level: s.class_level || s.class || s.standard,
      total_questions: s.total_questions || s.question_count
    })), null, 2));
  } else {
    console.log(data);
  }
}

main().catch(console.error);
