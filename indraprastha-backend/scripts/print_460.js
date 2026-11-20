const fs = require('fs');
const path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch72.json'), 'utf8'));
const q = d.find(x => x.id === 460);
console.log(JSON.stringify(q, null, 2));

