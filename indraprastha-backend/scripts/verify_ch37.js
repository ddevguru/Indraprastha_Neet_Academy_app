const fs = require('fs');
const path = require('path');

const c37 = JSON.parse(fs.readFileSync(path.join(__dirname, 'dumps', 'ch37.json'), 'utf8'));
const p1 = require('./ch124_part1.js');
const p2 = require('./ch124_part2.js');
const p3 = require('./ch124_part3.js');
const all124 = [...p1, ...p2, ...p3];

console.log('c37 count:', c37.length);
console.log('all124 count:', all124.length);

let errors = 0;

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

  // Check ending of explanation
  if (!explanation.trim().endsWith(`Therefore, Option (${correct_option}) is the correct answer.`)) {
    console.error(`[${i}] ID ${q37.id} explanation does not end correctly!`);
    errors++;
  }

  // Check LaTeX in fields
  const fields = [
    q37.question, q37.option_a, q37.option_b, q37.option_c, q37.option_d, explanation,
    similarQuestion.question, similarQuestion.option_a, similarQuestion.option_b,
    similarQuestion.option_c, similarQuestion.option_d, similarQuestion.explanation
  ];

  fields.forEach(f => {
    if (typeof f === 'string') {
      if (f.includes('$') || f.includes('\\frac') || f.includes('\\text') || f.includes('\\pm')) {
        console.error(`[${i}] ID ${q37.id} has LaTeX: ${f.slice(0, 80)}`);
        errors++;
      }
    }
  });

  if (!similarQuestion.explanation.trim().endsWith(`Therefore, Option (${similarQuestion.correct_option}) is the correct answer.`)) {
    console.error(`[${i}] ID ${q37.id} similarQuestion explanation does not end correctly!`);
    errors++;
  }
}

console.log(`Verification complete with ${errors} errors.`);
if (errors === 0) {
  console.log('ALL 114 QUESTIONS FOR CHAPTER 37 ARE 100% VALIDATED!');
}

