const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch72.json'), 'utf8'));
console.log('ID 501 Full:', JSON.stringify(data[41], null, 2));

