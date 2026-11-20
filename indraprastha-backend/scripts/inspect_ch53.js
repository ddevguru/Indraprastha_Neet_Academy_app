const fs = require('fs');
const ch = JSON.parse(fs.readFileSync('indraprastha-backend/scripts/dumps/ch53.json', 'utf8'));
ch.forEach((q, i) => {
  console.log(`${i+1}. ID ${q.id}: ${q.question.replace(/\n/g, ' ').slice(0, 75)} | Ans: ${q.correct_option}`);
});

