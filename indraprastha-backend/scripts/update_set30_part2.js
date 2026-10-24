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
    id: 4556,
    payload: {
      question: "The hydrolysis constant (Kh) of a salt of a weak acid and a weak base is 4.0 × 10⁻⁶. The percentage degree of hydrolysis (h) of the salt in aqueous solution is:",
      option_a: "0.20%",
      option_b: "2.0%",
      option_c: "0.02%",
      option_d: "4.0%",
      correct_option: "A",
      explanation: "For a salt of a weak acid and a weak base, the degree of hydrolysis (h) is independent of concentration and is given by:\nh = √Kh = √(4.0 × 10⁻⁶) = 2.0 × 10⁻³\nPercentage hydrolysis = h × 100% = 2.0 × 10⁻³ × 100% = 0.20%.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4557,
    payload: {
      question: "The pH of a 0.1 M aqueous solution of sodium acetate (CH₃COONa) at 25 °C (Ka of CH₃COOH = 1.8 × 10⁻⁵) is approximately:",
      option_a: "7.00",
      option_b: "8.87",
      option_c: "5.13",
      option_d: "9.25",
      correct_option: "B",
      explanation: "For a salt of a weak acid and a strong base:\npH = 7 + 1/2 pKa + 1/2 log₁₀ C\npKa = −log₁₀(1.8 × 10⁻⁵) = 4.74\nlog₁₀ C = log₁₀(0.1) = −1\npH = 7 + 1/2(4.74) + 1/2(−1) = 7 + 2.37 − 0.50 = 8.87\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4558,
    payload: {
      question: "Which of the following mixtures CANNOT function as a buffer solution?",
      option_a: "CH₃COOH and CH₃COONa",
      option_b: "NH₄OH and NH₄Cl",
      option_c: "HCN and NaCN",
      option_d: "HCl and NaCl",
      correct_option: "D",
      explanation: "A buffer solution consists of a weak acid and its conjugate base, or a weak base and its conjugate acid.\nHCl is a strong acid and NaCl is the salt of a strong acid and strong base.\nBecause strong acids and their conjugate bases (Cl⁻) do not establish a reversible conjugate equilibrium in water, a mixture of HCl and NaCl cannot resist changes in pH upon addition of small amounts of acid or base.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4559,
    payload: {
      question: "Which of the following combinations, when mixed in water, will produce an acidic buffer solution?",
      option_a: "100 mL of 0.1 M HCl + 100 mL of 0.1 M NaOH",
      option_b: "100 mL of 0.1 M CH₃COOH + 50 mL of 0.1 M NaOH",
      option_c: "100 mL of 0.1 M CH₃COOH + 100 mL of 0.1 M NaOH",
      option_d: "100 mL of 0.1 M HCl + 50 mL of 0.1 M NH₄OH",
      correct_option: "B",
      explanation: "In mixture (B):\nMillimoles of CH₃COOH = 100 × 0.1 = 10 mmol\nMillimoles of NaOH added = 50 × 0.1 = 5 mmol\nReaction: CH₃COOH + NaOH → CH₃COONa + H₂O\nAfter reaction: 5 mmol of CH₃COONa is formed and (10 − 5) = 5 mmol of unreacted CH₃COOH remains.\nThis mixture contains a weak acid (CH₃COOH) and its salt (CH₃COONa) in equimolar amounts, forming an ideal acidic buffer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4560,
    payload: {
      question: "What is the pH of a buffer solution prepared by mixing 200 mL of 0.10 M CH₃COONa with 200 mL of 0.10 M CH₃COOH at 25 °C (pKa of CH₃COOH = 4.74)?",
      option_a: "4.74",
      option_b: "5.04",
      option_c: "4.44",
      option_d: "7.00",
      correct_option: "A",
      explanation: "Using the Henderson-Hasselbalch equation for an acidic buffer:\npH = pKa + log₁₀([Salt] / [Acid])\nSince equal volumes of solutions of equal concentrations are mixed:\n[CH₃COONa] = [CH₃COOH] = (200 × 0.10) / 400 = 0.05 M\n[Salt] / [Acid] = 1\nlog₁₀(1) = 0\npH = pKa + 0 = 4.74\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4561,
    payload: {
      question: "In an acidic buffer consisting of acetic acid and sodium acetate, if the molar ratio of salt to acid is increased by a factor of 10, the pH of the buffer will:",
      option_a: "Increase by 1 unit",
      option_b: "Decrease by 1 unit",
      option_c: "Increase by 10 units",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "According to the Henderson-Hasselbalch equation:\npH = pKa + log₁₀([Salt] / [Acid])\nIf the ratio [Salt] / [Acid] becomes 10 times larger:\npH_new = pKa + log₁₀(10 × [Salt] / [Acid]) = pKa + log₁₀([Salt] / [Acid]) + log₁₀(10)\npH_new = pH_initial + 1\nHence, the pH increases by exactly 1 unit.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4562,
    payload: {
      question: "For the sparingly soluble salt silver phosphate, Ag₃PO₄, the correct mathematical expression for the solubility product constant (Ksp) in terms of ionic concentrations is:",
      option_a: "Ksp = [Ag⁺]³ [PO₄³⁻]",
      option_b: "Ksp = [Ag⁺] [PO₄³⁻]³",
      option_c: "Ksp = 3[Ag⁺] [PO₄³⁻]",
      option_d: "Ksp = [Ag⁺]³ + [PO₄³⁻]",
      correct_option: "A",
      explanation: "The dissolution equilibrium of Ag₃PO₄ is:\nAg₃PO₄(s) ⇌ 3 Ag⁺(aq) + PO₄³⁻(aq)\nBy the law of mass action, the solubility product expression is the product of the molar concentrations of the constituent ions raised to their stoichiometric coefficients:\nKsp = [Ag⁺]³ [PO₄³⁻]\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4563,
    payload: {
      question: "If the solubility product constant of a sparingly soluble salt of type AB₂ (such as Ca(OH)₂) is Ksp, its molar solubility (s) in pure water is given by:",
      option_a: "s = √(Ksp)",
      option_b: "s = (Ksp / 4)^(1/3)",
      option_c: "s = (Ksp / 2)^(1/3)",
      option_d: "s = (Ksp / 27)^(1/4)",
      correct_option: "B",
      explanation: "Dissolution of AB₂:\nAB₂(s) ⇌ A²⁺(aq) + 2 B⁻(aq)\nIf solubility is s mol/L:\n[A²⁺] = s, and [B⁻] = 2s\nKsp = [A²⁺][B⁻]² = (s)(2s)² = 4s³\ns³ = Ksp / 4\ns = (Ksp / 4)^(1/3)\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4564,
    payload: {
      question: "At 25 °C, the solubility product constants (Ksp) of four metal sulfides are:\nFeS: 6.3 × 10⁻¹⁸\nZnS: 1.6 × 10⁻²⁴\nPbS: 8.0 × 10⁻²⁸\nCuS: 6.3 × 10⁻³⁶\nIn a saturated aqueous solution of which sulfide is the equilibrium sulfide ion concentration [S²⁻] the highest?",
      option_a: "FeS",
      option_b: "ZnS",
      option_c: "PbS",
      option_d: "CuS",
      correct_option: "A",
      explanation: "All four salts are of the 1:1 electrolyte type (MS ⇌ M²⁺ + S²⁻).\nFor 1:1 salts: Ksp = s², so [S²⁻] = s = √(Ksp).\nThe salt with the largest Ksp will have the highest molar solubility and therefore the highest concentration of S²⁻ ions in its saturated solution.\nFeS has the largest Ksp (6.3 × 10⁻¹⁸), so it produces the maximum [S²⁻].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4565,
    payload: {
      question: "The solubility product of Ag₂CrO₄ is 4.0 × 10⁻¹². What is the molar concentration of Ag⁺ ions in its saturated aqueous solution?",
      option_a: "1.0 × 10⁻⁴ M",
      option_b: "2.0 × 10⁻⁴ M",
      option_c: "1.0 × 10⁻⁶ M",
      option_d: "4.0 × 10⁻⁴ M",
      correct_option: "B",
      explanation: "Ag₂CrO₄(s) ⇌ 2 Ag⁺ + CrO₄²⁻\nIf the solubility of Ag₂CrO₄ is s:\n[Ag⁺] = 2s, [CrO₄²⁻] = s\nKsp = [Ag⁺]² [CrO₄²⁻] = (2s)²(s) = 4s³\n4s³ = 4.0 × 10⁻¹²\ns³ = 1.0 × 10⁻¹² → s = 1.0 × 10⁻⁴ M\nConcentration of Ag⁺ ions = 2s = 2 × (1.0 × 10⁻⁴ M) = 2.0 × 10⁻⁴ M.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4566,
    payload: {
      question: "The solubility of AgCl (Ksp = 1.8 × 10⁻¹⁰) is MINIMUM in which of the following aqueous media?",
      option_a: "Pure water",
      option_b: "0.01 M AgNO₃",
      option_c: "0.01 M CaCl₂",
      option_d: "0.01 M NaCl",
      correct_option: "C",
      explanation: "According to the common ion effect, the solubility of AgCl is suppressed by the presence of a common ion (Ag⁺ or Cl⁻), and decreases as the concentration of the common ion increases:\n- In pure water: [common ion] = 0\n- In 0.01 M AgNO₃: [Ag⁺] = 0.01 M\n- In 0.01 M NaCl: [Cl⁻] = 0.01 M\n- In 0.01 M CaCl₂: [Cl⁻] = 2 × 0.01 M = 0.02 M\nSince 0.01 M CaCl₂ provides the highest concentration of the common ion (0.02 M Cl⁻), the solubility of AgCl is minimum in it.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4567,
    payload: {
      question: "Three sparingly soluble salts AB, AB₂, and AB₃ have the same numerical value of solubility product, Ksp = 1.0 × 10⁻¹². Which salt is the LEAST soluble in pure water?",
      option_a: "AB",
      option_b: "AB₂",
      option_c: "AB₃",
      option_d: "All have the same solubility",
      correct_option: "A",
      explanation: "Let us calculate the molar solubility (s) for each salt:\n1. For AB: Ksp = s₁² → s₁ = √(10⁻¹²) = 1.0 × 10⁻⁶ M\n2. For AB₂: Ksp = 4s₂³ → s₂ = (10⁻¹² / 4)^(1/3) ≈ 6.3 × 10⁻⁵ M\n3. For AB₃: Ksp = 27s₃⁴ → s₃ = (10⁻¹² / 27)^(1/4) ≈ 4.4 × 10⁻⁴ M\nComparing solubilities: s₁ (1.0 × 10⁻⁶ M) < s₂ (6.3 × 10⁻⁵ M) < s₃ (4.4 × 10⁻⁴ M).\nTherefore, the 1:1 salt AB is the least soluble.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4568,
    payload: {
      question: "When a 1.0 × 10⁻⁶ M aqueous HCl solution is diluted 100 times with pure water at 25 °C, the pH of the resulting solution will be:",
      option_a: "8.00",
      option_b: "6.00",
      option_c: "Approximately 6.96",
      option_d: "7.50",
      correct_option: "C",
      explanation: "Diluting 1.0 × 10⁻⁶ M HCl by a factor of 100 gives an acid concentration of 1.0 × 10⁻⁸ M.\nBecause an acid cannot produce an alkaline pH (> 7), the autoionization of water must be taken into account:\n[H⁺]_total = [H⁺]_acid + [H⁺]_water\nKw = [H⁺]([H⁺] − 10⁻⁸) = 1.0 × 10⁻¹⁴\nSolving the quadratic equation gives [H⁺] ≈ 1.05 × 10⁻⁷ M.\npH = −log₁₀(1.05 × 10⁻⁷) ≈ 6.96 (slightly less than 7).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4569,
    payload: {
      question: "Which of the following compounds, when dissolved in pure water at 25 °C, produces an acidic solution (pH < 7)?",
      option_a: "Na₂CO₃",
      option_b: "CH₃COONa",
      option_c: "FeCl₃",
      option_d: "K₂SO₄",
      correct_option: "C",
      explanation: "FeCl₃ is the salt of a weak base (Fe(OH)₃) and a strong acid (HCl).\nIn aqueous solution, the small, highly charged Fe³⁺ cation undergoes cationic hydrolysis:\nFe³⁺ + 3 H₂O ⇌ Fe(OH)₃ + 3 H⁺\nThis releases excess H⁺ ions into solution, lowering the pH below 7 (acidic solution).\nNa₂CO₃ and CH₃COONa are basic, while K₂SO₄ is neutral.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4570,
    payload: {
      question: "Which of the following pairs cannot function as an effective buffer solution?",
      option_a: "HNO₃ and NaNO₃",
      option_b: "HCOOH and HCOONa",
      option_c: "H₂CO₃ and NaHCO₃",
      option_d: "NH₃ and NH₄Cl",
      correct_option: "A",
      explanation: "A buffer requires a conjugate pair containing a weak acid or weak base.\nHNO₃ is a strong acid, which dissociates completely into H⁺ and NO₃⁻.\nThe nitrate ion (NO₃⁻) is an extremely weak conjugate base and cannot combine with added H⁺ ions.\nConsequently, a mixture of HNO₃ and NaNO₃ has no buffering capacity.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4571,
    payload: {
      question: "The solubility product of PbCl₂ is 1.6 × 10⁻⁵. What is its molar solubility in a 0.10 M NaCl solution?",
      option_a: "1.6 × 10⁻³ M",
      option_b: "1.6 × 10⁻⁵ M",
      option_c: "4.0 × 10⁻³ M",
      option_d: "1.6 × 10⁻⁴ M",
      correct_option: "A",
      explanation: "In 0.10 M NaCl, [Cl⁻] is predominantly from NaCl, so [Cl⁻] ≈ 0.10 M.\nFor PbCl₂(s) ⇌ Pb²⁺ + 2 Cl⁻:\nKsp = [Pb²⁺] [Cl⁻]²\n1.6 × 10⁻⁵ = [Pb²⁺] × (0.10)²\n1.6 × 10⁻⁵ = [Pb²⁺] × 0.01\n[Pb²⁺] = 1.6 × 10⁻⁵ / 10⁻² = 1.6 × 10⁻³ M.\nSince one mole of dissolved PbCl₂ produces one mole of Pb²⁺, the molar solubility is 1.6 × 10⁻³ M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4572,
    payload: {
      question: "The molar solubility of an A₂B type salt in pure water is 2.0 × 10⁻⁵ mol/L. Its solubility product constant (Ksp) is:",
      option_a: "3.2 × 10⁻¹⁴",
      option_b: "1.6 × 10⁻¹⁴",
      option_c: "4.0 × 10⁻¹⁰",
      option_d: "8.0 × 10⁻¹⁵",
      correct_option: "A",
      explanation: "Dissociation of A₂B:\nA₂B(s) ⇌ 2 A⁺ + B²⁻\n[A⁺] = 2s = 2 × (2.0 × 10⁻⁵) = 4.0 × 10⁻⁵ M\n[B²⁻] = s = 2.0 × 10⁻⁵ M\nKsp = [A⁺]² [B²⁻] = 4s³ = 4 × (2.0 × 10⁻⁵)³ = 4 × 8.0 × 10⁻¹⁵ = 3.2 × 10⁻¹⁴.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4573,
    payload: {
      question: "Which of the following 0.1 M aqueous salt solutions has the HIGHEST pH?",
      option_a: "NaCl",
      option_b: "Na₂CO₃",
      option_c: "NH₄Cl",
      option_d: "NaHSO₄",
      correct_option: "B",
      explanation: "Let us examine the nature of each salt:\n- NaCl: Neutral salt of strong acid and strong base (pH ≈ 7).\n- NH₄Cl: Acidic salt of weak base and strong acid (pH < 7).\n- NaHSO₄: Acidic salt containing the ionizable HSO₄⁻ proton (pH < 7).\n- Na₂CO₃: Salt of a very weak diprotic acid (H₂CO₃, Ka₂ ≈ 4.7 × 10⁻¹¹) and a strong base (NaOH). The carbonate ion (CO₃²⁻) undergoes extensive hydrolysis to generate large concentrations of OH⁻, giving pH ≈ 11.6.\nThus, Na₂CO₃ has the highest pH.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4574,
    payload: {
      question: "Calculate the pOH of an aqueous solution at 25 °C that contains 1.0 × 10⁻⁹ M hydronium ions (H₃O⁺):",
      option_a: "9.00",
      option_b: "5.00",
      option_c: "7.00",
      option_d: "4.00",
      correct_option: "B",
      explanation: "Given [H₃O⁺] = 1.0 × 10⁻⁹ M at 25 °C:\npH = −log₁₀[H₃O⁺] = −log₁₀(1.0 × 10⁻⁹) = 9.00\nSince pH + pOH = 14.00 at 25 °C:\npOH = 14.00 − pH = 14.00 − 9.00 = 5.00\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4575,
    payload: {
      question: "Equal volumes of three strong acid solutions of pH 2.0, 3.0, and 4.0 are mixed together. The concentration of H⁺ ions in the resulting mixture is:",
      option_a: "3.7 × 10⁻³ M",
      option_b: "1.11 × 10⁻² M",
      option_c: "1.0 × 10⁻³ M",
      option_d: "3.0 × 10⁻³ M",
      correct_option: "A",
      explanation: "For the three solutions:\n- pH 2.0: [H⁺]₁ = 10⁻² M = 0.01 M\n- pH 3.0: [H⁺]₂ = 10⁻³ M = 0.001 M\n- pH 4.0: [H⁺]₃ = 10⁻⁴ M = 0.0001 M\nWhen equal volumes V are mixed, the total volume is 3V:\n[H⁺]_mixture = ([H⁺]₁ + [H⁺]₂ + [H⁺]₃) / 3\n[H⁺]_mixture = (0.01 + 0.001 + 0.0001) / 3 = 0.0111 / 3 = 3.7 × 10⁻³ M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4576,
    payload: {
      question: "A buffer solution contains equal molar concentrations of a weak acid HA and its conjugate base A⁻. If Ka for HA is 2.0 × 10⁻⁵, the pH of the buffer solution is:",
      option_a: "4.70",
      option_b: "5.00",
      option_c: "9.30",
      option_d: "7.00",
      correct_option: "A",
      explanation: "According to the Henderson-Hasselbalch equation:\npH = pKa + log₁₀([A⁻] / [HA])\nSince [A⁻] = [HA], the ratio is 1 and log₁₀(1) = 0:\npH = pKa = −log₁₀(Ka) = −log₁₀(2.0 × 10⁻⁵) = 5 − log₁₀(2.0) = 5 − 0.301 = 4.699 ≈ 4.70.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4577,
    payload: {
      question: "Two sparingly soluble salts MX and NX₃ have the identical value of Ksp = 2.7 × 10⁻¹⁵ at 25 °C. The correct statement regarding their molar solubilities in pure water is:",
      option_a: "MX and NX₃ have identical molar solubilities",
      option_b: "The molar solubility of MX is greater than that of NX₃",
      option_c: "The molar solubility of MX is less than that of NX₃",
      option_d: "Addition of common ions increases the solubility of both salts",
      correct_option: "C",
      explanation: "Let us calculate the molar solubility for each salt:\n1. For MX (1:1 salt): Ksp = s₁²\ns₁ = √(2.7 × 10⁻¹⁵) ≈ 5.2 × 10⁻⁸ M\n2. For NX₃ (1:3 salt): Ksp = [N³⁺][X⁻]³ = (s₂)(3s₂)³ = 27s₂⁴\n27s₂⁴ = 2.7 × 10⁻¹⁵ → s₂⁴ = 1.0 × 10⁻¹⁶\ns₂ = (1.0 × 10⁻¹⁶)^(1/4) = 1.0 × 10⁻⁴ M\nComparing solubilities: s₁ (5.2 × 10⁻⁸ M) < s₂ (1.0 × 10⁻⁴ M).\nTherefore, the molar solubility of MX is significantly less than that of NX₃.\nTherefore, Option (C) is the correct answer."
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
    console.log(`Set 30 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
