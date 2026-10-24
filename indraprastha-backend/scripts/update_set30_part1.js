const https = require('https');

function login() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      username: 'indraprasthaadmin',
      password: 'indraprastha@123'
    });
    const req = https.request('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.token) resolve(parsed.token);
          else reject(new Error('No token: ' + data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function updateQuestion(token, id, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ similarQuestion: payload });
    const req = https.request(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
        else reject(new Error(`Failed ${res.statusCode}: ${data}`));
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const updates = [
  {
    id: 4534,
    payload: {
      question: "In the equilibrium: H₂SO₄ + HNO₃ ⇌ H₂NO₃⁺ + HSO₄⁻, which species acts as a Brønsted-Lowry base?",
      option_a: "H₂SO₄",
      option_b: "HNO₃",
      option_c: "HSO₄⁻",
      option_d: "Both H₂SO₄ and HSO₄⁻",
      correct_option: "B",
      explanation: "According to the Brønsted-Lowry definition, a base is a proton (H⁺) acceptor.\nIn concentrated sulfuric acid solvent, H₂SO₄ is a stronger acid and protonates HNO₃:\nH₂SO₄ + HNO₃ ⇌ H₂NO₃⁺ + HSO₄⁻\nHere, HNO₃ accepts a proton from H₂SO₄ to form H₂NO₃⁺, acting as a Brønsted-Lowry base.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4535,
    payload: {
      question: "For the equilibrium reaction in liquid ammonia: NH₄⁺ + S²⁻ ⇌ NH₃ + HS⁻, the conjugate acid-base pairs are:",
      option_a: "NH₄⁺ / NH₃ and HS⁻ / S²⁻",
      option_b: "NH₄⁺ / S²⁻ and NH₃ / HS⁻",
      option_c: "NH₄⁺ / HS⁻ and S²⁻ / NH₃",
      option_d: "NH₃ / S²⁻ and NH₄⁺ / HS⁻",
      correct_option: "A",
      explanation: "A conjugate acid-base pair differs by exactly one proton (H⁺):\n1. NH₄⁺ loses a proton to become NH₃, so NH₄⁺ (acid) and NH₃ (conjugate base) form one pair.\n2. S²⁻ accepts a proton to become HS⁻, so HS⁻ (conjugate acid) and S²⁻ (base) form the other pair.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4536,
    payload: {
      question: "Which of the following species is amphiprotic (can act as both a Brønsted acid and a Brønsted base) in aqueous solution?",
      option_a: "CO₃²⁻",
      option_b: "HCO₃⁻",
      option_c: "SO₄²⁻",
      option_d: "H₃O⁺",
      correct_option: "B",
      explanation: "An amphiprotic species can both donate a proton (act as an acid) and accept a proton (act as a base):\n- Acting as an acid: HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺\n- Acting as a base: HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻\nTherefore, HCO₃⁻ (bicarbonate ion) is amphiprotic.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4537,
    payload: {
      question: "According to Ostwald's dilution law (α = √(Ka / C)), the degree of dissociation (α) of a weak monobasic acid increases when:",
      option_a: "The solution is diluted with water",
      option_b: "The concentration of the acid is increased",
      option_c: "A strong acid is added to the solution",
      option_d: "The temperature is decreased for an endothermic dissociation",
      correct_option: "A",
      explanation: "According to Ostwald's dilution law for a weak electrolyte, α = √(Ka / C) = √(Ka × V).\nAs the solution is diluted (volume V increases, concentration C decreases), the degree of dissociation (α) increases progressively.\nAt infinite dilution (C → 0), α approaches 1 (100% dissociation).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4538,
    payload: {
      question: "At infinite dilution, the percentage ionization of any weak electrolyte in aqueous solution approaches:",
      option_a: "0%",
      option_b: "50%",
      option_c: "75%",
      option_d: "100%",
      correct_option: "D",
      explanation: "As the dilution of a weak electrolyte approaches infinity (concentration C → 0), the ions become infinitely separated and cannot recombine.\nUnder these conditions, the degree of dissociation reaches unity (α = 1), meaning the percentage ionization approaches 100%.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4539,
    payload: {
      question: "Ostwald's dilution law is strictly valid only for solutions of which of the following electrolytes?",
      option_a: "Strong electrolytes like NaCl",
      option_b: "Strong acids like HCl",
      option_c: "Weak electrolytes like CH₃COOH",
      option_d: "Strong bases like KOH",
      correct_option: "C",
      explanation: "Ostwald's dilution law is derived using the law of chemical equilibrium (Ka = Cα² / (1 − α)), assuming a dynamic equilibrium between unionized molecules and dissociated ions.\nStrong electrolytes are completely ionized at all practical concentrations (α ≈ 1), meaning no equilibrium between unionized molecules and ions exists, so Ostwald's law fails for them.\nIt holds accurately only for weak electrolytes (like acetic acid, NH₄OH).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4540,
    payload: {
      question: "In pure water at a certain temperature, the concentration of H₃O⁺ is measured to be 2.0 × 10⁻⁷ mol/L. What is the concentration of OH⁻ in the water at this temperature?",
      option_a: "1.0 × 10⁻⁷ mol/L",
      option_b: "2.0 × 10⁻⁷ mol/L",
      option_c: "5.0 × 10⁻⁸ mol/L",
      option_d: "1.0 × 10⁻¹⁴ mol/L",
      correct_option: "B",
      explanation: "Pure water dissociates symmetrically according to the self-ionization equation:\n2 H₂O ⇌ H₃O⁺ + OH⁻\nEvery molecule of H₂O that self-ionizes produces exactly one H₃O⁺ ion and one OH⁻ ion.\nTherefore, in pure water, [H₃O⁺] must always be equal to [OH⁻].\nHence, [OH⁻] = 2.0 × 10⁻⁷ mol/L.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4541,
    payload: {
      question: "The autoionization of water, 2H₂O ⇌ H₃O⁺ + OH⁻, is an endothermic process (ΔH > 0). If Kw at 25 °C is 1.0 × 10⁻¹⁴, the value of Kw at 60 °C will be:",
      option_a: "1.0 × 10⁻¹⁴",
      option_b: "Less than 1.0 × 10⁻¹⁴",
      option_c: "Greater than 1.0 × 10⁻¹⁴ (approximately 1.0 × 10⁻¹³)",
      option_d: "Zero",
      correct_option: "C",
      explanation: "According to Le Chatelier's principle, for an endothermic process (ΔH > 0), increasing the temperature shifts the equilibrium in the forward direction.\nAs temperature increases from 25 °C to 60 °C, more water dissociates into H⁺ and OH⁻, causing the equilibrium constant (ionic product of water, Kw) to increase.\nAt 60 °C, Kw ≈ 9.6 × 10⁻¹⁴ ≈ 1.0 × 10⁻¹³, which is greater than 1.0 × 10⁻¹⁴.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4542,
    payload: {
      question: "For two monoprotic acids X and Y, the pKa values are 3.5 and 4.8 respectively. Which of the following statements is correct?",
      option_a: "Acid Y is stronger than Acid X",
      option_b: "Acid X is stronger than Acid Y",
      option_c: "Both acids are of equal strength",
      option_d: "Acid Y has a higher Ka than Acid X",
      correct_option: "B",
      explanation: "Acid dissociation constant (Ka) and pKa are related by:\npKa = −log₁₀(Ka) → Ka = 10^(−pKa)\nA lower pKa value indicates a larger Ka and hence a greater degree of dissociation, corresponding to a stronger acid.\nSince pKa(X) = 3.5 < pKa(Y) = 4.8, Acid X is a stronger acid than Acid Y.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4543,
    payload: {
      question: "What is the pH of a solution prepared by mixing 500 mL of 0.05 M H₂SO₄ with 500 mL of 0.10 M HCl?",
      option_a: "1.0",
      option_b: "1.3",
      option_c: "2.0",
      option_d: "0.7",
      correct_option: "A",
      explanation: "Calculate the millimoles of H⁺ supplied by each strong acid:\n1. From H₂SO₄ (dibasic, 2 H⁺ per mole):\nMillimoles of H⁺ = 500 mL × 0.05 M × 2 = 50 mmol\n2. From HCl (monobasic, 1 H⁺ per mole):\nMillimoles of H⁺ = 500 mL × 0.10 M × 1 = 50 mmol\nTotal millimoles of H⁺ = 50 + 50 = 100 mmol\nTotal volume = 500 + 500 = 1000 mL\n[H⁺] = 100 mmol / 1000 mL = 0.10 M = 10⁻¹ M\npH = −log₁₀[H⁺] = −log₁₀(10⁻¹) = 1.0\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4544,
    payload: {
      question: "Which of the following aqueous solutions has a pH equal to 12.0 at 25 °C?",
      option_a: "0.01 M NaOH",
      option_b: "0.10 M NaOH",
      option_c: "0.01 M HCl",
      option_d: "0.001 M Ba(OH)₂",
      correct_option: "A",
      explanation: "For 0.01 M NaOH (a strong base):\n[OH⁻] = 0.01 M = 10⁻² M\npOH = −log₁₀[OH⁻] = −log₁₀(10⁻²) = 2.0\npH = 14 − pOH = 14 − 2.0 = 12.0\nTherefore, 0.01 M NaOH has a pH of 12.0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4545,
    payload: {
      question: "The pH of a 1.0 × 10⁻⁸ M aqueous HCl solution at 25 °C is slightly less than 7 (approx. 6.96) because:",
      option_a: "HCl undergoes incomplete dissociation at low concentration",
      option_b: "Hydrochloric acid is a weak acid",
      option_c: "The H⁺ ions contributed by the autoionization of water cannot be neglected at such low acid concentrations",
      option_d: "Chlorine gas escapes from the solution",
      correct_option: "C",
      explanation: "In extremely dilute solutions of strong acids (concentration ≤ 10⁻⁶ M), the concentration of H⁺ from the autoionization of water (~10⁻⁷ M) is comparable to that from the acid.\nTotal [H⁺] = [H⁺]_acid + [H⁺]_water = 10⁻⁸ + 10⁻⁷ = 1.05 × 10⁻⁷ M (solving Kw = [H⁺]([H⁺] − 10⁻⁸)).\npH = −log₁₀(1.05 × 10⁻⁷) ≈ 6.96.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4546,
    payload: {
      question: "What is the pH of a 1.0 × 10⁻⁷ M aqueous NaOH solution at 25 °C?",
      option_a: "7.00",
      option_b: "7.21",
      option_c: "8.00",
      option_d: "6.79",
      correct_option: "B",
      explanation: "In 1.0 × 10⁻⁷ M NaOH, the autoionization of water contributes significantly to [OH⁻]:\nLet [OH⁻] from water be x.\nTotal [OH⁻] = 10⁻⁷ + x, and [H⁺] = x.\nKw = [H⁺][OH⁻] = x(10⁻⁷ + x) = 1.0 × 10⁻¹⁴\nx² + 10⁻⁷ x − 10⁻¹⁴ = 0\nSolving the quadratic equation gives x ≈ 0.618 × 10⁻⁷ M.\nTotal [OH⁻] = 1.618 × 10⁻⁷ M\npOH = −log₁₀(1.618 × 10⁻⁷) = 6.79\npH = 14 − pOH = 14 − 6.79 = 7.21\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4547,
    payload: {
      question: "The pH of a 0.1 M aqueous solution of NH₄OH (Kb = 1.8 × 10⁻⁵) at 25 °C is approximately:",
      option_a: "2.87",
      option_b: "5.13",
      option_c: "8.87",
      option_d: "11.13",
      correct_option: "D",
      explanation: "For a weak base:\n[OH⁻] = √(Kb × C) = √(1.8 × 10⁻⁵ × 0.1) = √(1.8 × 10⁻⁶) = 1.34 × 10⁻³ M\npOH = −log₁₀(1.34 × 10⁻³) = 3 − log₁₀(1.34) = 3 − 0.127 = 2.87\npH = 14 − pOH = 14 − 2.87 = 11.13\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4548,
    payload: {
      question: "A 0.05 M solution of a weak monobasic acid is 1.0% dissociated at 25 °C. The pH of the solution is:",
      option_a: "2.3",
      option_b: "3.3",
      option_c: "4.3",
      option_d: "1.3",
      correct_option: "B",
      explanation: "Degree of dissociation, α = 1.0% = 0.01.\nConcentration of hydrogen ions, [H⁺] = C × α = 0.05 M × 0.01 = 5.0 × 10⁻⁴ M.\npH = −log₁₀[H⁺] = −log₁₀(5.0 × 10⁻⁴) = 4 − log₁₀(5) = 4 − 0.699 = 3.301 ≈ 3.3.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4549,
    payload: {
      question: "The acid dissociation constants for three weak acids at 25 °C are:\nHCN (Ka = 4.9 × 10⁻¹⁰), HNO₂ (Ka = 4.5 × 10⁻⁴), and CH₃COOH (Ka = 1.8 × 10⁻⁵).\nThe correct decreasing order of their acidic strengths is:",
      option_a: "HNO₂ > CH₃COOH > HCN",
      option_b: "HCN > CH₃COOH > HNO₂",
      option_c: "CH₃COOH > HNO₂ > HCN",
      option_d: "HNO₂ > HCN > CH₃COOH",
      correct_option: "A",
      explanation: "Acid strength is directly proportional to the magnitude of the acid dissociation constant (Ka):\n- HNO₂: Ka = 4.5 × 10⁻⁴ (highest Ka → strongest acid)\n- CH₃COOH: Ka = 1.8 × 10⁻⁵\n- HCN: Ka = 4.9 × 10⁻¹⁰ (lowest Ka → weakest acid)\nThus, the decreasing order of acidic strength is: HNO₂ > CH₃COOH > HCN.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4550,
    payload: {
      question: "For a diprotic acid like carbonic acid (H₂CO₃), the two successive dissociation constants are Ka₁ and Ka₂. Which relation is universally true?",
      option_a: "Ka₁ < Ka₂",
      option_b: "Ka₁ > Ka₂",
      option_c: "Ka₁ = Ka₂",
      option_d: "Ka₁ × Ka₂ = 1",
      correct_option: "B",
      explanation: "In a diprotic acid H₂A:\n1. First dissociation: H₂A ⇌ H⁺ + HA⁻ (constant Ka₁)\n2. Second dissociation: HA⁻ ⇌ H⁺ + A²⁻ (constant Ka₂)\nIt is much harder to remove a positively charged proton (H⁺) from a negatively charged anion (HA⁻) due to strong electrostatic attraction than from a neutral molecule (H₂A).\nTherefore, Ka₁ is always much greater than Ka₂ (Ka₁ >> Ka₂).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4551,
    payload: {
      question: "For orthophosphoric acid (H₃PO₄), the stepwise dissociation constants are Ka₁, Ka₂, and Ka₃. The overall dissociation constant (Ka) for the complete ionization H₃PO₄ ⇌ 3H⁺ + PO₄³⁻ is given by:",
      option_a: "Ka = Ka₁ + Ka₂ + Ka₃",
      option_b: "Ka = Ka₁ × Ka₂ × Ka₃",
      option_c: "Ka = Ka₁ / (Ka₂ × Ka₃)",
      option_d: "Ka = (Ka₁ × Ka₂) / Ka₃",
      correct_option: "B",
      explanation: "The overall equilibrium reaction is the sum of the three stepwise dissociation equilibria:\n1. H₃PO₄ ⇌ H⁺ + H₂PO₄⁻ (Ka₁)\n2. H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻ (Ka₂)\n3. HPO₄²⁻ ⇌ H⁺ + PO₄³⁻ (Ka₃)\nWhen chemical equations are added, their equilibrium constants multiply:\nKa = Ka₁ × Ka₂ × Ka₃.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4552,
    payload: {
      question: "An aqueous solution of sodium acetate (CH₃COONa) is basic (pH > 7) because of:",
      option_a: "Cationic hydrolysis",
      option_b: "Anionic hydrolysis",
      option_c: "Ionization of sodium ions",
      option_d: "Complete dissociation of acetic acid",
      correct_option: "B",
      explanation: "Sodium acetate dissociates completely into Na⁺ and CH₃COO⁻.\nNa⁺ is the conjugate cation of a strong base (NaOH) and does not hydrolyze.\nCH₃COO⁻ is the conjugate base of a weak acid (CH₃COOH) and undergoes anionic hydrolysis:\nCH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻\nThis generates excess OH⁻ ions in solution, making the pH greater than 7 (alkaline).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4553,
    payload: {
      question: "Which of the following salts, when dissolved in pure water at 25 °C, forms a neutral solution with a pH of 7.0?",
      option_a: "NH₄Cl",
      option_b: "Na₂CO₃",
      option_c: "KNO₃",
      option_d: "CH₃COONa",
      correct_option: "C",
      explanation: "KNO₃ is formed by the neutralization of a strong base (KOH) and a strong acid (HNO₃).\nNeither K⁺ nor NO₃⁻ undergoes hydrolysis in water:\nK⁺ + H₂O → no reaction\nNO₃⁻ + H₂O → no reaction\nConsequently, the concentrations of H⁺ and OH⁻ remain equal to 10⁻⁷ M, leaving the pH neutral at 7.0.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4554,
    payload: {
      question: "The pH of an aqueous solution of ammonium acetate (a salt of weak acid and weak base) is given by pH = 7 + 1/2(pKa − pKb). This pH depends on:",
      option_a: "Concentration of the salt",
      option_b: "Temperature (which alters pKa and pKb)",
      option_c: "Volume of the solution",
      option_d: "Pressure of the surroundings",
      correct_option: "B",
      explanation: "The formula pH = 7 + 1/2(pKa − pKb) shows that the pH of a salt of a weak acid and a weak base is independent of the salt concentration.\nHowever, both pKa and pKb vary with temperature, meaning the pH of the solution changes with temperature.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4555,
    payload: {
      question: "What is the pH of an aqueous solution of ammonium acetate at 25 °C if Ka for CH₃COOH is 1.8 × 10⁻⁵ and Kb for NH₄OH is 1.8 × 10⁻⁵?",
      option_a: "5.0",
      option_b: "7.0",
      option_c: "9.0",
      option_d: "8.5",
      correct_option: "B",
      explanation: "The pH of a salt of a weak acid and weak base is calculated as:\npH = 7 + 1/2(pKa − pKb)\nSince Ka = Kb = 1.8 × 10⁻⁵, we have:\npKa = −log₁₀(1.8 × 10⁻⁵) = 4.74\npKb = −log₁₀(1.8 × 10⁻⁵) = 4.74\npH = 7 + 1/2(4.74 − 4.74) = 7 + 0 = 7.0 (neutral).\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    const token = await login();
    console.log('Logged in successfully, token received.');

    let count = 0;
    for (const item of updates) {
      await updateQuestion(token, item.id, item.payload);
      count++;
      console.log(`[SUCCESS] Updated question ${item.id} (${count}/${updates.length})`);
    }
    console.log(`Set 30 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
