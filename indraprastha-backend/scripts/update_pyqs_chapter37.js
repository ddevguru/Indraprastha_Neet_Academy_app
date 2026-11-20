const https = require('https');
const fs = require('fs');
const path = require('path');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function login() {
  const res = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    username: 'indraprasthaadmin',
    password: 'indraprastha@123'
  });
  return res.data.token;
}

const c37 = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch37.json'), 'utf8'));
const p1 = require('./ch124_part1.js');
const p2 = require('./ch124_part2.js');
const p3 = require('./ch124_part3.js');
const all124 = [...p1, ...p2, ...p3];

async function updateChapter37() {
  console.log(`Starting update for Chapter 37: ${c37.length} questions...`);
  const token = await login();
  console.log('Logged in successfully, token received.');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < c37.length; i++) {
    const q37 = c37[i];
    const q124 = all124[113 - i];

    let explanation = q124.explanation;
    let correct_option = q124.correct_option;
    let similarQuestion = { ...q124.similarQuestion };

    if (q37.id === 2901) {
      correct_option = 'B';
      explanation = "Classification of materials by electrical resistivity (ρ) at room temperature:\n1. Conductors: Metals like Silver (Ag) have an extremely low electrical resistivity (ρ ≈ 1.6 × 10⁻⁸ Ω·m) and highest electrical conductivity.\n2. Semiconductors: Silicon (Si, ρ ≈ 10² to 10³ Ω·m) and Germanium (Ge, ρ ≈ 0.46 Ω·m) have intermediate electrical resistivity.\n3. Insulators: Glass has a very wide energy bandgap and exceptionally high electrical resistivity (ρ ≈ 10¹⁰ to 10¹⁴ Ω·m).\n4. Therefore, on the basis of electrical conductivity, Silver has the smallest resistivity.\nTherefore, Option (B) is the correct answer.";
      similarQuestion = {
        question: "Which of the following substances has the lowest electrical resistivity at room temperature?",
        option_a: "Germanium",
        option_b: "Copper",
        option_c: "Glass",
        option_d: "Silicon",
        correct_option: "B",
        explanation: "Copper is a metallic conductor with resistivity ρ ≈ 1.7 × 10⁻⁸ Ω·m, which is lower than that of semiconductors (Si, Ge) and insulators (glass).\nTherefore, Option (B) is the correct answer."
      };
    }

    const payload = {
      question: q37.question,
      option_a: q37.option_a,
      option_b: q37.option_b,
      option_c: q37.option_c,
      option_d: q37.option_d,
      correct_option: correct_option,
      explanation: explanation,
      similarQuestion: similarQuestion
    };

    try {
      const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${q37.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }, payload);

      if (res.status === 200) {
        successCount++;
        process.stdout.write(`\r[${i + 1}/${c37.length}] Updated ID: ${q37.id} - SUCCESS`);
      } else {
        failCount++;
        console.error(`\n[${i + 1}/${c37.length}] Failed ID: ${q37.id} | Status: ${res.status}`, res.data);
      }
    } catch (err) {
      failCount++;
      console.error(`\n[${i + 1}/${c37.length}] Error ID: ${q37.id} | ${err.message}`);
    }
  }

  console.log(`\n\nChapter 37 Update Summary:`);
  console.log(`Total: ${c37.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

updateChapter37().catch(console.error);

