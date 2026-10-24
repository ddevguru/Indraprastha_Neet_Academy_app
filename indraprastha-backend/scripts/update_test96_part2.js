const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function login() {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.token) resolve(parsed.token);
          else reject(new Error('Login failed: ' + body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(loginData);
    req.end();
  });
}

function updateTestQuestion(token, id, similarQuestion) {
  const data = JSON.stringify({ similarQuestion });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/test-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const test96Part2Updates = [
  {
    id: 3592,
    similar: {
      question: "What is the concentration of H⁺ ions (in mol/L) contributed exclusively by the autoionization of water in a 1.0 × 10⁻⁷ M HCl aqueous solution at 25 °C? (Given: K_w = 1.0 × 10⁻¹⁴)",
      option_a: "(A) 1.0 × 10⁻⁷ M",
      option_b: "(B) 6.18 × 10⁻⁸ M",
      option_c: "(C) 3.82 × 10⁻⁸ M",
      option_d: "(D) 1.62 × 10⁻⁷ M",
      correct_option: "B",
      explanation: "Step 1: In a 1.0 × 10⁻⁷ M HCl solution, let the concentration of H⁺ contributed by the autoionization of water be x mol/L.\nStep 2: Total [H⁺] = [H⁺]_acid + [H⁺]_water = (1.0 × 10⁻⁷ + x) M.\nStep 3: Concentration of OH⁻ comes entirely from water autoionization: [OH⁻] = x M.\nStep 4: At 25 °C, the ionic product of water is:\nK_w = [H⁺]_total × [OH⁻] = (1.0 × 10⁻⁷ + x)(x) = 1.0 × 10⁻¹⁴\nx² + 1.0 × 10⁻⁷ x - 1.0 × 10⁻¹⁴ = 0\nStep 5: Solving the quadratic equation:\nx = [-1.0 × 10⁻⁷ + √((1.0 × 10⁻⁷)² - 4(1)(-1.0 × 10⁻¹⁴))] / 2\nx = [-1.0 × 10⁻⁷ + √(1.0 × 10⁻¹⁴ + 4.0 × 10⁻¹⁴)] / 2\nx = [-1.0 × 10⁻⁷ + √(5.0 × 10⁻¹⁴)] / 2 = [-1.0 × 10⁻⁷ + 2.236 × 10⁻⁷] / 2\nx = (1.236 × 10⁻⁷) / 2 = 6.18 × 10⁻⁸ M.\nStep 6: Thus, the H⁺ concentration contributed by water is 6.18 × 10⁻⁸ M.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3648,
    similar: {
      question: "In the acid-base titration of a strong acid (such as HCl) with a weak base (such as aqueous NH₄OH), which of the following indicators is UNSUITABLE for detecting the equivalence point?",
      option_a: "(A) Methyl orange (pH range 3.1 - 4.4)",
      option_b: "(B) Methyl red (pH range 4.2 - 6.3)",
      option_c: "(C) Phenolphthalein (pH range 8.3 - 10.0)",
      option_d: "(D) Bromocresol green (pH range 3.8 - 5.4)",
      correct_option: "C",
      explanation: "Step 1: Titration of a strong acid (HCl) with a weak base (NH₄OH) produces an acidic salt (NH₄Cl), which undergoes cationic hydrolysis:\nNH₄⁺ + H₂O ⇌ NH₄OH + H⁺.\nStep 2: Consequently, the pH at the equivalence point lies in the distinctly acidic region (pH ≈ 4.5 - 5.5).\nStep 3: An indicator changes color accurately only when its transition range spans the equivalence point pH.\nStep 4: Phenolphthalein changes color in the alkaline region (pH 8.3 - 10.0) and would change color long after the actual stoichiometric equivalence point has been crossed.\nStep 5: Thus, phenolphthalein is completely unsuitable for a strong acid - weak base titration.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4567,
    similar: {
      question: "At 25 °C in an aqueous solution, which of the following conditions strictly defines an acidic solution?",
      option_a: "(A) [H₃O⁺] = [OH⁻] = 10⁻⁷ M",
      option_b: "(B) [H₃O⁺] < [OH⁻]",
      option_c: "(C) [H₃O⁺] > [OH⁻]",
      option_d: "(D) pH + pOH > 14",
      correct_option: "C",
      explanation: "Step 1: In pure neutral water at any temperature, self-ionization produces equal concentrations of hydronium and hydroxide ions: [H₃O⁺] = [OH⁻].\nStep 2: When an acid dissolves, it contributes additional hydronium ions, shifting the water self-ionization equilibrium to decrease [OH⁻].\nStep 3: Consequently, an aqueous solution is acidic whenever [H₃O⁺] > [OH⁻] (or [H₃O⁺] > 10⁻⁷ M at 25 °C).\nStep 4: If [H₃O⁺] < [OH⁻], the solution is basic. If [H₃O⁺] = [OH⁻], it is neutral.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4568,
    similar: {
      question: "The pH of a 0.10 M solution of a weak monobasic acid (HA) is 3.00 at 25 °C. The ionization constant (K_a) of this acid is:",
      option_a: "(A) 1.0 × 10⁻⁵",
      option_b: "(B) 1.0 × 10⁻⁴",
      option_c: "(C) 1.0 × 10⁻⁶",
      option_d: "(D) 1.0 × 10⁻³",
      correct_option: "A",
      explanation: "Step 1: From pH = 3.00, calculate the equilibrium hydronium ion concentration:\n[H⁺] = 10^(-pH) = 10^(-3.00) = 1.0 × 10⁻³ M.\nStep 2: For a weak monobasic acid HA ⇌ H⁺ + A⁻:\n[H⁺] = Cα = 1.0 × 10⁻³ M.\nGiven initial concentration C = 0.10 M:\nDegree of dissociation α = [H⁺] / C = (1.0 × 10⁻³) / 0.10 = 1.0 × 10⁻² = 0.01 (or 1%).\nStep 3: Since α << 0.05 (1% << 5%), the approximation (1 - α) ≈ 1 is valid.\nStep 4: Ionization constant K_a = Cα² = 0.10 × (1.0 × 10⁻²)² = 0.10 × 1.0 × 10⁻⁴ = 1.0 × 10⁻⁵.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4569,
    similar: {
      question: "The pH of a 0.010 M solution of a weak monoacidic organic base (B) is 10.30 at 25 °C. What is the value of pK_b for this base?",
      option_a: "(A) 5.40",
      option_b: "(B) 4.70",
      option_c: "(C) 6.20",
      option_d: "(D) 3.70",
      correct_option: "A",
      explanation: "Step 1: Calculate pOH of the solution at 25 °C:\npOH = 14.00 - pH = 14.00 - 10.30 = 3.70.\nStep 2: Calculate the hydroxide ion concentration [OH⁻]:\n[OH⁻] = 10^(-pOH) = 10^(-3.70) = 10^(0.30 - 4) = 2.0 × 10⁻⁴ M.\nStep 3: For the weak base equilibrium B + H₂O ⇌ BH⁺ + OH⁻:\n[OH⁻] = √(K_b × C)   (since degree of dissociation is very small)\n[OH⁻]² = K_b × C\nK_b = [OH⁻]² / C = (2.0 × 10⁻⁴)² / 0.010 = (4.0 × 10⁻⁸) / 0.010 = 4.0 × 10⁻⁶.\nStep 4: Calculate pK_b:\npK_b = -log(K_b) = -log(4.0 × 10⁻⁶) = 6 - log(4.0) = 6 - 0.60 = 5.40.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4570,
    similar: {
      question: "For a diprotic acid H₂A with dissociation constants K_a1 and K_a2 (where K_a1 >> K_a2), which of the following species represents the STRONGEST Bronsted-Lowry base?",
      option_a: "(A) H₂A",
      option_b: "(B) HA⁻",
      option_c: "(C) A²⁻",
      option_d: "(D) H₃A⁺",
      correct_option: "C",
      explanation: "Step 1: According to Bronsted-Lowry acid-base theory, the conjugate base of a weaker acid is always a stronger base.\nStep 2: The ionization steps are:\n(1) H₂A ⇌ H⁺ + HA⁻   (K_a1)\n(2) HA⁻ ⇌ H⁺ + A²⁻   (K_a2)\nStep 3: Since it is far harder to remove a positively charged proton from a negatively charged species (HA⁻) than from a neutral molecule (H₂A), K_a1 >> K_a2.\nStep 4: HA⁻ is a much weaker acid than H₂A (K_a2 << K_a1). Therefore, the conjugate base of HA⁻, which is A²⁻, has a much larger base dissociation constant (K_b1 = K_w / K_a2) than the conjugate base of H₂A (which is HA⁻, K_b2 = K_w / K_a1).\nStep 5: Thus, A²⁻ is the strongest base among the given species.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4571,
    similar: {
      question: "Which of the following represents the correct increasing order of acidic strength of the hydrides of the second period elements: CH₄, NH₃, H₂O, and HF?",
      option_a: "(A) HF < H₂O < NH₃ < CH₄",
      option_b: "(B) CH₄ < H₂O < NH₃ < HF",
      option_c: "(C) CH₄ < NH₃ < H₂O < HF",
      option_d: "(D) NH₃ < CH₄ < H₂O < HF",
      correct_option: "C",
      explanation: "Step 1: Moving from left to right across a period in the periodic table (C to N to O to F), the electronegativity of the central atom increases significantly: C (2.5) < N (3.0) < O (3.5) < F (4.0).\nStep 2: As electronegativity increases, the E-H bond becomes progressively more polarized, pulling bonding electron density toward the central atom and facilitating the release of H⁺.\nStep 3: Furthermore, the stability of the conjugate base increases with increasing electronegativity: CH₃⁻ < NH₂⁻ < OH⁻ < F⁻.\nStep 4: Consequently, the acidic strength strictly follows the order: CH₄ < NH₃ < H₂O < HF.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4572,
    similar: {
      question: "What is the correct decreasing order of basic strength among the conjugate bases of Group 16 hydrides: OH⁻, HS⁻, HSe⁻, and HTe⁻?",
      option_a: "(A) HTe⁻ > HSe⁻ > HS⁻ > OH⁻",
      option_b: "(B) OH⁻ > HS⁻ > HSe⁻ > HTe⁻",
      option_c: "(C) OH⁻ > HTe⁻ > HS⁻ > HSe⁻",
      option_d: "(D) HS⁻ > OH⁻ > HSe⁻ > HTe⁻",
      correct_option: "B",
      explanation: "Step 1: Down Group 16 (O to S to Se to Te), the atomic size of the central atom increases substantially.\nStep 2: The H-E bond length increases and the bond dissociation enthalpy decreases: H-O > H-S > H-Se > H-Te. Consequently, the acidic strength of hydrides increases down the group:\nH₂O < H₂S < H₂Se < H₂Te.\nStep 3: According to acid-base principles, the stronger the acid, the weaker is its conjugate base.\nStep 4: Since H₂O is the weakest acid, its conjugate base (OH⁻) is the strongest base. Conversely, H₂Te is the strongest acid, making HTe⁻ the weakest conjugate base.\nStep 5: Thus, the decreasing order of basic strength is: OH⁻ > HS⁻ > HSe⁻ > HTe⁻.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4573,
    similar: {
      question: "Which of the following pairs of substances in aqueous solution exhibits the common ion effect?",
      option_a: "(A) HCl and NaCl",
      option_b: "(B) NaOH and KOH",
      option_c: "(C) CH₃COOH and CH₃COONa",
      option_d: "(D) BaCl₂ and Na₂SO₄",
      correct_option: "C",
      explanation: "Step 1: The common ion effect refers specifically to the suppression of the degree of dissociation of a weak electrolyte by the addition of a strong electrolyte that provides an ion in common with the weak electrolyte.\nStep 2: Acetic acid (CH₃COOH) is a weak electrolyte: CH₃COOH ⇌ CH₃COO⁻ + H⁺.\nStep 3: Sodium acetate (CH₃COONa) is a strong electrolyte that dissociates completely: CH₃COONa → CH₃COO⁻ + Na⁺.\nStep 4: The high concentration of common acetate ions (CH₃COO⁻) from CH₃COONa drives the dissociation equilibrium of CH₃COOH backward (to the left), markedly decreasing [H⁺].\nStep 5: Pairs of two strong electrolytes (like HCl + NaCl) do not exhibit suppression of weak electrolyte ionization.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4574,
    similar: {
      question: "What is the pH of a solution prepared by mixing 50 mL of 0.10 M aqueous NH₃ with 50 mL of 0.05 M HCl solution at 25 °C? (Given: pK_b of NH₃ = 4.74)",
      option_a: "(A) 4.74",
      option_b: "(B) 9.26",
      option_c: "(C) 8.26",
      option_d: "(D) 7.00",
      correct_option: "B",
      explanation: "Step 1: Calculate the initial millimoles of each reactant:\nMillimoles of NH₃ = 50 mL × 0.10 M = 5.0 mmol.\nMillimoles of HCl = 50 mL × 0.05 M = 2.5 mmol.\nStep 2: The strong acid HCl reacts completely with the weak base NH₃:\nNH₃ + HCl → NH₄Cl\nMillimoles of NH₄⁺ formed = 2.5 mmol.\nMillimoles of NH₃ remaining = 5.0 - 2.5 = 2.5 mmol.\nStep 3: Total volume = 50 + 50 = 100 mL.\nConcentration of base [NH₃] = 2.5 / 100 = 0.025 M.\nConcentration of conjugate acid salt [NH₄⁺] = 2.5 / 100 = 0.025 M.\nStep 4: This is a basic buffer solution. Applying the Henderson-Hasselbalch equation:\npOH = pK_b + log([salt] / [base]) = 4.74 + log(0.025 / 0.025) = 4.74 + log(1) = 4.74.\nStep 5: At 25 °C, pH = 14.00 - pOH = 14.00 - 4.74 = 9.26.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4575,
    similar: {
      question: "For an aqueous solution of a salt formed from a weak acid and a weak base (WA-WB), the pH is given by: pH = 7 + (1/2)(pK_a - pK_b). The solution will be distinctly alkaline (pH > 7 at 25 °C) under which condition?",
      option_a: "(A) When (pK_a - pK_b) is positive (i.e., pK_a > pK_b, meaning K_b > K_a)",
      option_b: "(B) When (pK_a - pK_b) is negative (i.e., pK_a < pK_b, meaning K_a > K_b)",
      option_c: "(C) When pK_a = pK_b",
      option_d: "(D) It is impossible for a WA-WB salt solution to have pH > 7",
      correct_option: "A",
      explanation: "Step 1: From the formula for the hydrolysis of a weak acid - weak base salt: pH = 7 + (1/2)(pK_a - pK_b).\nStep 2: For pH to be greater than 7, the term (1/2)(pK_a - pK_b) must be positive: (pK_a - pK_b) > 0, which means pK_a > pK_b.\nStep 3: Since pK = -log(K), pK_a > pK_b implies that K_a < K_b (the base is stronger than the acid).\nStep 4: When the parent weak base is stronger than the parent weak acid, the solution hydrolyzes to produce an excess of OH⁻ ions, rendering the solution alkaline with pH > 7.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4576,
    similar: {
      question: "The solubility of a solid ionic salt in water depends fundamentally upon which of the following physical factors?\n(i) Lattice enthalpy of the salt\n(ii) Solvation (hydration) enthalpy of the participating ions\n(iii) Temperature of the solution",
      option_a: "(A) (i) only",
      option_b: "(B) (ii) only",
      option_c: "(C) (i) and (ii) only",
      option_d: "(D) All (i), (ii), and (iii)",
      correct_option: "D",
      explanation: "Step 1: For an ionic salt to dissolve in water, the attractive forces holding the crystal lattice together (lattice enthalpy, Δ_lattice H) must be overcome by the attractive interactions between the separated ions and water molecules (hydration enthalpy, Δ_hyd H).\nStep 2: Dissolution is favorable when hydration enthalpy is comparable to or greater in magnitude than the lattice enthalpy.\nStep 3: Furthermore, solubility equilibrium is temperature-dependent according to Le Chatelier's principle (solubility increases with temperature if dissolution is endothermic, and decreases if exothermic).\nStep 4: Therefore, solubility depends on lattice enthalpy, solvation enthalpy, and temperature.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4577,
    similar: {
      question: "If the molar solubility of zirconium phosphate, Zr₃(PO₄)₄, in pure water is S mol/L, what is the expression for its solubility product (K_sp)?",
      option_a: "(A) 108 S⁵",
      option_b: "(B) 729 S⁶",
      option_c: "(C) 6912 S⁷",
      option_d: "(D) 576 S⁷",
      correct_option: "C",
      explanation: "Step 1: Write the solubility equilibrium for zirconium phosphate:\nZr₃(PO₄)₄ (s) ⇌ 3 Zr⁴⁺ (aq) + 4 PO₄³⁻ (aq)\nStep 2: If the molar solubility of the salt is S mol/L, then at equilibrium:\n[Zr⁴⁺] = 3S\n[PO₄³⁻] = 4S\nStep 3: Write the expression for the solubility product (K_sp):\nK_sp = [Zr⁴⁺]³ × [PO₄³⁻]⁴\nK_sp = (3S)³ × (4S)⁴\nStep 4: Calculate the numerical coefficient:\n3³ = 27\n4⁴ = 256\n27 × 256 = 6912\nS³ × S⁴ = S⁷\nStep 5: Thus, K_sp = 6912 S⁷.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4578,
    similar: {
      question: "Compare the molar solubilities in pure water at 25 °C for the following sparingly soluble salts:\nI. AgCl (K_sp = 1.8 × 10⁻¹⁰)\nII. CaF₂ (K_sp = 3.2 × 10⁻¹¹)\nWhich salt has the higher molar solubility (S)?",
      option_a: "(A) AgCl has higher solubility than CaF₂",
      option_b: "(B) CaF₂ has higher solubility than AgCl",
      option_c: "(C) Both have identical molar solubility",
      option_d: "(D) Solubility cannot be determined from K_sp",
      correct_option: "B",
      explanation: "Step 1: Calculate molar solubility S for AgCl (AB type salt):\nAgCl (s) ⇌ Ag⁺ + Cl⁻\nK_sp = S²\nS(AgCl) = √(1.8 × 10⁻¹⁰) = 1.34 × 10⁻⁵ mol/L.\nStep 2: Calculate molar solubility S for CaF₂ (AB₂ type salt):\nCaF₂ (s) ⇌ Ca²⁺ + 2F⁻\nK_sp = (S)(2S)² = 4S³\nS³ = K_sp / 4 = (3.2 × 10⁻¹¹) / 4 = 8.0 × 10⁻¹²\nS(CaF₂) = (8.0 × 10⁻¹²)^(1/3) = 2.0 × 10⁻⁴ mol/L.\nStep 3: Comparing the two values:\n2.0 × 10⁻⁴ mol/L (CaF₂) > 1.34 × 10⁻⁵ mol/L (AgCl).\nStep 4: Therefore, CaF₂ is more soluble than AgCl in pure water.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4579,
    similar: {
      question: "The solubility of a sparingly soluble salt of a weak acid (such as calcium fluoride, CaF₂, or calcium carbonate, CaCO₃) increases substantially when the pH of the solution is:",
      option_a: "(A) Increased (higher pH)",
      option_b: "(B) Decreased (lower pH / acidic medium)",
      option_c: "(C) Kept constant at neutral pH 7",
      option_d: "(D) Independent of pH",
      correct_option: "B",
      explanation: "Step 1: Consider the dissolution equilibrium of a salt of a weak acid, e.g., CaF₂ (s) ⇌ Ca²⁺ + 2F⁻.\nStep 2: Fluoride ion (F⁻) is the conjugate base of the weak acid HF (hydrofluoric acid).\nStep 3: When the pH is decreased (i.e., [H⁺] is increased in acidic solution), the added H⁺ ions react with F⁻ ions to form undissociated HF molecules: F⁻ + H⁺ ⇌ HF.\nStep 4: This removes F⁻ ions from the solution, shifting the solubility equilibrium of CaF₂ to the right according to Le Chatelier's principle.\nStep 5: Hence, the solubility of salts of weak acids increases at lower pH.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4580,
    similar: {
      question: "According to the Lewis definition of acids and bases, which of the following chemical species acts as a Lewis acid?",
      option_a: "(A) H₂O",
      option_b: "(B) NH₃",
      option_c: "(C) BF₃",
      option_d: "(D) OH⁻",
      correct_option: "C",
      explanation: "Step 1: A Lewis acid is defined as any chemical species (molecule or ion) capable of accepting an electron pair.\nStep 2: In boron trifluoride (BF₃), the central boron atom is surrounded by only six valence electrons (three bonding pairs), possessing an incomplete octet and a vacant 2p orbital.\nStep 3: Because of this electron deficiency, BF₃ readily accepts a pair of non-bonding electrons from Lewis bases (like NH₃ or ethers) to form coordinate covalent adducts.\nStep 4: H₂O, NH₃, and OH⁻ possess unshared lone pairs and act as Lewis bases.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4581,
    similar: {
      question: "The solubility product (K_sp) of cadmium hydroxide, Cd(OH)₂, is 2.5 × 10⁻¹⁴ at 25 °C. What is its molar solubility in a 0.10 M aqueous KOH solution?",
      option_a: "(A) 2.5 × 10⁻¹² M",
      option_b: "(B) 5.0 × 10⁻⁷ M",
      option_c: "(C) 2.5 × 10⁻¹³ M",
      option_d: "(D) 5.0 × 10⁻⁸ M",
      correct_option: "A",
      explanation: "Step 1: KOH is a strong electrolyte that completely dissociates: KOH → K⁺ + OH⁻.\nTherefore, [OH⁻] from KOH = 0.10 M.\nStep 2: In the presence of 0.10 M KOH, let S be the molar solubility of Cd(OH)₂:\nCd(OH)₂ (s) ⇌ Cd²⁺ (aq) + 2 OH⁻ (aq)\n[Cd²⁺] = S\n[OH⁻] = 0.10 + 2S ≈ 0.10 M (since K_sp is very small, 2S << 0.10 M).\nStep 3: Substitute into the K_sp expression:\nK_sp = [Cd²⁺] × [OH⁻]²\n2.5 × 10⁻¹⁴ = S × (0.10)²\n2.5 × 10⁻¹⁴ = S × 1.0 × 10⁻²\nS = (2.5 × 10⁻¹⁴) / (1.0 × 10⁻²) = 2.5 × 10⁻¹² M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4582,
    similar: {
      question: "The solubility product of Ca(OH)₂ is 5.5 × 10⁻⁶ at 25 °C. What is the molar solubility of Ca(OH)₂ in a buffer solution maintained at pH = 12.00?",
      option_a: "(A) 5.5 × 10⁻² M",
      option_b: "(B) 5.5 × 10⁻⁴ M",
      option_c: "(C) 5.5 × 10⁻⁶ M",
      option_d: "(D) 1.1 × 10⁻³ M",
      correct_option: "A",
      explanation: "Step 1: Calculate pOH of the buffered solution at 25 °C:\npOH = 14.00 - pH = 14.00 - 12.00 = 2.00.\nStep 2: Determine hydroxide ion concentration:\n[OH⁻] = 10^(-pOH) = 10^(-2.00) = 1.0 × 10⁻² M.\nStep 3: For the dissolution of calcium hydroxide:\nCa(OH)₂ (s) ⇌ Ca²⁺ (aq) + 2 OH⁻ (aq)\nLet the molar solubility of Ca(OH)₂ be S mol/L, then [Ca²⁺] = S.\nStep 4: Substitute into the K_sp expression:\nK_sp = [Ca²⁺] × [OH⁻]²\n5.5 × 10⁻⁶ = S × (1.0 × 10⁻²)²\n5.5 × 10⁻⁶ = S × 1.0 × 10⁻⁴\nS = (5.5 × 10⁻⁶) / (1.0 × 10⁻⁴) = 5.5 × 10⁻² M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4583,
    similar: {
      question: "For which of the following categories of salts is the degree of hydrolysis (h) completely independent of the initial concentration of the salt solution?\nI. Ammonium acetate (CH₃COONH₄)\nII. Ammonium cyanide (NH₄CN)\nIII. Ammonium carbonate ((NH₄)₂CO₃)\nIV. Sodium acetate (CH₃COONa)",
      option_a: "(A) I, II, and III only",
      option_b: "(B) I and IV only",
      option_c: "(C) IV only",
      option_d: "(D) All I, II, III, and IV",
      correct_option: "A",
      explanation: "Step 1: For salts of weak acids and strong bases (e.g., CH₃COONa), the degree of hydrolysis is given by: h = √(K_w / (K_a × C)), which depends inversely on the square root of concentration (C).\nStep 2: For salts of strong acids and weak bases (e.g., NH₄Cl), h = √(K_w / (K_b × C)), which also depends on concentration.\nStep 3: For salts derived from both a weak acid and a weak base (WA-WB), both the cation and anion undergo simultaneous mutual hydrolysis:\nh = √(K_w / (K_a × K_b))\nStep 4: This expression contains no concentration term (C), meaning the degree of hydrolysis is completely independent of the concentration of the salt.\nStep 5: Salts I (CH₃COONH₄), II (NH₄CN), and III ((NH₄)₂CO₃) are all WA-WB salts, so their degree of hydrolysis is independent of concentration.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Test 96 Part 2 questions (19 questions)...');
    
    for (const item of test96Part2Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateTestQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Test 96 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error in Test 96 Part 2 update:', err);
  }
}

run();
