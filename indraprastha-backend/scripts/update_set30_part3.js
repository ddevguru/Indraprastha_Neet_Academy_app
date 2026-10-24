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
    id: 4578,
    payload: {
      question: "What is the pH of a solution prepared by mixing 60 mL of 0.1 M NaOH with 40 mL of 0.1 M HCl at 25 °C?",
      option_a: "1.70",
      option_b: "12.30",
      option_c: "7.00",
      option_d: "11.00",
      correct_option: "B",
      explanation: "Millimoles of OH⁻ from NaOH = 60 mL × 0.1 M = 6.0 mmol\nMillimoles of H⁺ from HCl = 40 mL × 0.1 M = 4.0 mmol\nExcess OH⁻ = 6.0 − 4.0 = 2.0 mmol\nTotal volume = 60 + 40 = 100 mL\n[OH⁻] = 2.0 mmol / 100 mL = 0.02 M = 2.0 × 10⁻² M\npOH = −log₁₀(2.0 × 10⁻²) = 2 − log₁₀(2.0) = 2 − 0.301 = 1.699 ≈ 1.70\npH = 14 − pOH = 14 − 1.70 = 12.30\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4579,
    payload: {
      question: "For a reversible reaction, the equilibrium constant increases as the temperature is raised. What can be concluded about the activation energies of the forward (Ea_f) and backward (Ea_b) reactions?",
      option_a: "Ea_f > Ea_b (reaction is endothermic)",
      option_b: "Ea_f < Ea_b (reaction is exothermic)",
      option_c: "Ea_f = Ea_b",
      option_d: "No relation between activation energies and temperature dependence of K",
      correct_option: "A",
      explanation: "According to the van 't Hoff equation, d(ln K)/dT = ΔH° / (RT²).\nIf K increases with an increase in temperature, ΔH° must be positive (the forward reaction is endothermic).\nSince ΔH° = Ea_forward − Ea_backward, ΔH° > 0 implies that Ea_forward > Ea_backward.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4580,
    payload: {
      question: "For the gas-phase reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), the relationship between Kp and Kc is given by:",
      option_a: "Kp = Kc (RT)⁻²",
      option_b: "Kp = Kc (RT)²",
      option_c: "Kp = Kc (RT)",
      option_d: "Kp = Kc",
      correct_option: "A",
      explanation: "The relation between Kp and Kc is: Kp = Kc (RT)^(Δn_g)\nwhere Δn_g is the change in the number of moles of gas:\nΔn_g = moles of gaseous products − moles of gaseous reactants\nΔn_g = 2 − (1 + 3) = 2 − 4 = −2\nTherefore, Kp = Kc (RT)⁻².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4581,
    payload: {
      question: "For the equilibrium aA(g) ⇌ bB(g) + cC(g), if Kp = Kc (RT)³, what is the relationship between the stoichiometric coefficients?",
      option_a: "b + c − a = 3",
      option_b: "b + c − a = −3",
      option_c: "a − (b + c) = 3",
      option_d: "b + c = 3a",
      correct_option: "A",
      explanation: "The general relationship between Kp and Kc is:\nKp = Kc (RT)^(Δn_g)\nGiven Kp = Kc (RT)³, it follows directly that:\nΔn_g = 3\nFor the reaction aA(g) ⇌ bB(g) + cC(g):\nΔn_g = (b + c) − a = 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4582,
    payload: {
      question: "For the gas-phase dissociation PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), if the degree of dissociation is α and the total equilibrium pressure is P, the equilibrium constant Kp is expressed as:",
      option_a: "Kp = α²P / (1 − α²)",
      option_b: "Kp = αP / (1 − α)",
      option_c: "Kp = α²P / (1 + α)",
      option_d: "Kp = (1 − α²)P / α²",
      correct_option: "A",
      explanation: "Let initial moles of PCl₅ = 1.\nAt equilibrium: moles of PCl₅ = 1 − α, moles of PCl₃ = α, moles of Cl₂ = α.\nTotal moles = (1 − α) + α + α = 1 + α.\nPartial pressures:\np_PCl₅ = [(1 − α)/(1 + α)] P\np_PCl₃ = [α/(1 + α)] P\np_Cl₂ = [α/(1 + α)] P\nKp = (p_PCl₃ × p_Cl₂) / p_PCl₅ = {[α/(1 + α)]P × [α/(1 + α)]P} / {[(1 − α)/(1 + α)]P}\nKp = [α² / ((1 + α)(1 − α))] P = α²P / (1 − α²).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4583,
    payload: {
      question: "For the heterogeneous equilibrium: CaCO₃(s) ⇌ CaO(s) + CO₂(g) with ΔH > 0, which of the following actions will INCREASE the equilibrium pressure of CO₂?",
      option_a: "Increasing the temperature",
      option_b: "Adding more solid CaCO₃",
      option_c: "Adding more solid CaO",
      option_d: "Decreasing the volume of the reaction container",
      correct_option: "A",
      explanation: "For this equilibrium, Kp = p_CO₂.\nPure solids (CaCO₃ and CaO) have constant activity (= 1), so changing their masses does not affect the equilibrium position.\nBecause the forward decomposition is endothermic (ΔH > 0), raising the temperature increases the equilibrium constant Kp, thereby increasing the equilibrium pressure of CO₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4584,
    payload: {
      question: "For the dissociation N₂O₄(g) ⇌ 2NO₂(g), an initial pressure of 100 mm Hg of pure N₂O₄ is allowed to reach equilibrium. At equilibrium, the partial pressure of NO₂ is found to be 50 mm Hg. The value of Kp is:",
      option_a: "33.3 mm Hg",
      option_b: "25.0 mm Hg",
      option_c: "50.0 mm Hg",
      option_d: "12.5 mm Hg",
      correct_option: "A",
      explanation: "N₂O₄(g) ⇌ 2NO₂(g)\nLet p_N₂O₄ that dissociates be x.\np_NO₂ formed = 2x = 50 mm Hg → x = 25 mm Hg.\nAt equilibrium: p_N₂O₄ = 100 − x = 100 − 25 = 75 mm Hg.\nKp = (p_NO₂)² / p_N₂O₄ = (50)² / 75 = 2500 / 75 = 33.3 mm Hg.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4585,
    payload: {
      question: "For the gas-phase equilibrium PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) in a rigid closed container at constant temperature, if an inert gas (such as argon) is added at constant volume, what happens to the equilibrium?",
      option_a: "The equilibrium shifts forward",
      option_b: "The equilibrium shifts backward",
      option_c: "The equilibrium state and concentrations remain completely unchanged",
      option_d: "The value of Kp increases",
      correct_option: "C",
      explanation: "Addition of an inert gas at constant volume increases the total pressure, but does NOT change the volume of the container or the partial pressures / molar concentrations of the reacting gases.\nSince partial pressures remain unchanged, the reaction quotient Qp remains equal to Kp, so the equilibrium position remains completely undisturbed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4586,
    payload: {
      question: "Consider the decomposition of two oxides at 1000 K:\n(1) 2 A₂O(g) ⇌ 2 A₂(g) + O₂(g) with K₁ = 1.0 × 10¹⁵\n(2) 2 B₂O(g) ⇌ 2 B₂(g) + O₂(g) with K₂ = 1.0 × 10⁻⁵\nWhich oxide is thermodynamically more stable towards decomposition at this temperature?",
      option_a: "A₂O is more stable",
      option_b: "B₂O is more stable",
      option_c: "Both are equally stable",
      option_d: "Neither can decompose",
      correct_option: "B",
      explanation: "A larger equilibrium constant for a decomposition reaction indicates that the reaction proceeds more completely towards products (elements), meaning the oxide decomposes readily and is less stable.\nConversely, a very small equilibrium constant (K₂ = 1.0 × 10⁻⁵) indicates that the oxide decomposes to a negligible extent, meaning B₂O is thermodynamically much more stable than A₂O.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4587,
    payload: {
      question: "For the decomposition of solid ammonium hydrogen sulfide: NH₄HS(s) ⇌ NH₃(g) + H₂S(g), if the total equilibrium pressure is P, the standard Gibbs free energy change (ΔG°) is given by:",
      option_a: "−RT ln P",
      option_b: "−2RT ln P",
      option_c: "−2RT (ln P − ln 2)",
      option_d: "−RT (ln P − 2 ln 2)",
      correct_option: "C",
      explanation: "Solid NH₄HS decomposes to produce equimolar amounts of NH₃ and H₂S:\nPartial pressures: p_NH₃ = p_H₂S = P / 2.\nKp = p_NH₃ × p_H₂S = (P / 2) × (P / 2) = P² / 4 = (P / 2)².\nStandard Gibbs free energy change:\nΔG° = −RT ln Kp = −RT ln(P / 2)² = −2RT ln(P / 2) = −2RT (ln P − ln 2).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4588,
    payload: {
      question: "Statement-I: A catalyst increases the rates of both forward and reverse reactions equally, leaving the equilibrium constant unchanged.\nStatement-II: At chemical equilibrium, the standard Gibbs free energy change (ΔG°) of the reaction is always zero.",
      option_a: "Both Statement-I and Statement-II are correct.",
      option_b: "Statement-I is correct but Statement-II is incorrect.",
      option_c: "Statement-I is incorrect but Statement-II is correct.",
      option_d: "Both Statement-I and Statement-II are incorrect.",
      correct_option: "B",
      explanation: "Statement-I is correct: A catalyst lowers the activation energy of both the forward and reverse reactions by the exact same amount, so it speeds up both directions equally without altering the equilibrium composition or the equilibrium constant K.\nStatement-II is incorrect: At equilibrium, the actual Gibbs free energy change (ΔG) is zero (ΔG = 0). The standard Gibbs free energy change is given by ΔG° = −RT ln K, which is zero ONLY if K = 1.\nThus, Statement-I is correct and Statement-II is incorrect.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4589,
    payload: {
      question: "For a sparingly soluble salt of type A₃B₂ (such as Ca₃(PO₄)₂), if its molar solubility in pure water is s mol/L, its solubility product constant Ksp is:",
      option_a: "108 s⁵",
      option_b: "72 s⁵",
      option_c: "36 s⁴",
      option_d: "6 s⁵",
      correct_option: "A",
      explanation: "Dissociation equilibrium of A₃B₂:\nA₃B₂(s) ⇌ 3 A²⁺ + 2 B³⁻\n[A²⁺] = 3s, [B³⁻] = 2s\nKsp = [A²⁺]³ [B³⁻]² = (3s)³ (2s)² = (27 s³) (4 s²) = 108 s⁵.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4590,
    payload: {
      question: "The ionization constant of a weak acid HA is 1.0 × 10⁻⁵. What is the degree of hydrolysis (h) in a 0.1 M aqueous solution of its sodium salt, NaA, at 25 °C (Kw = 1.0 × 10⁻¹⁴)?",
      option_a: "1.0 × 10⁻⁴ (0.01%)",
      option_b: "1.0 × 10⁻³ (0.1%)",
      option_c: "1.0 × 10⁻⁵",
      option_d: "1.0 × 10⁻² (1%)",
      correct_option: "A",
      explanation: "Hydrolysis constant, Kh = Kw / Ka = (1.0 × 10⁻¹⁴) / (1.0 × 10⁻⁵) = 1.0 × 10⁻⁹.\nDegree of hydrolysis for a salt of a weak acid and strong base:\nh = √(Kh / C) = √(1.0 × 10⁻⁹ / 0.1) = √(1.0 × 10⁻⁸) = 1.0 × 10⁻⁴\nPercentage degree of hydrolysis = 1.0 × 10⁻⁴ × 100% = 0.01%.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4591,
    payload: {
      question: "When 50 mL of 0.2 M NH₄OH is mixed with 25 mL of 0.2 M HCl, the pH of the resulting buffer solution at 25 °C (pKb of NH₄OH = 4.74) is:",
      option_a: "4.74",
      option_b: "9.26",
      option_c: "7.00",
      option_d: "8.50",
      correct_option: "B",
      explanation: "Millimoles of NH₄OH = 50 × 0.2 = 10 mmol\nMillimoles of HCl = 25 × 0.2 = 5 mmol\nReaction: NH₄OH + HCl → NH₄Cl + H₂O\nAfter reaction: 5 mmol of NH₄Cl is formed, and (10 − 5) = 5 mmol of NH₄OH remains.\nThis is a basic buffer with [Salt] = [Base].\npOH = pKb + log₁₀([Salt] / [Base]) = 4.74 + log₁₀(1) = 4.74\npH = 14 − pOH = 14 − 4.74 = 9.26\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4592,
    payload: {
      question: "To what volume must 250 mL of a 0.1 M weak monobasic acid solution be diluted with water so that its degree of dissociation is doubled?",
      option_a: "500 mL",
      option_b: "750 mL",
      option_c: "1000 mL",
      option_d: "1250 mL",
      correct_option: "C",
      explanation: "According to Ostwald's dilution law:\nα = √(Ka / C) = √(Ka × V)\nTherefore, α ∝ √V\nTo double the degree of dissociation (α_final = 2 × α_initial):\nα_final / α_initial = √(V_final / V_initial) = 2\nV_final / V_initial = 2² = 4\nV_final = 4 × V_initial = 4 × 250 mL = 1000 mL.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4593,
    payload: {
      question: "When 100 mL of 0.05 M NaOH is added to 100 mL of 0.03 M HNO₃ at 25 °C, what is the pH of the final mixture?",
      option_a: "2.00",
      option_b: "12.00",
      option_c: "11.30",
      option_d: "12.30",
      correct_option: "B",
      explanation: "Millimoles of OH⁻ = 100 mL × 0.05 M = 5.0 mmol\nMillimoles of H⁺ = 100 mL × 0.03 M = 3.0 mmol\nExcess OH⁻ = 5.0 − 3.0 = 2.0 mmol\nTotal volume = 100 + 100 = 200 mL\n[OH⁻] = 2.0 mmol / 200 mL = 0.01 M = 10⁻² M\npOH = −log₁₀(10⁻²) = 2.00\npH = 14 − pOH = 14 − 2.00 = 12.00\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4594,
    payload: {
      question: "The degrees of hydrolysis of four sodium salts of weak acids HA, HB, HC, and HD in 0.1 M solutions follow the order: NaA < NaB < NaC < NaD. Which of the parent weak acids has the LARGEST pKa value?",
      option_a: "HA",
      option_b: "HB",
      option_c: "HC",
      option_d: "HD",
      correct_option: "D",
      explanation: "The degree of hydrolysis of the salt of a weak acid and strong base is given by h = √(Kw / (Ka × C)).\nA higher degree of hydrolysis (h) indicates a smaller Ka (a weaker acid).\nSince NaD has the highest degree of hydrolysis, HD has the smallest acid dissociation constant Ka.\nSince pKa = −log₁₀(Ka), the smallest Ka corresponds to the largest pKa value.\nTherefore, HD has the maximum pKa.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4595,
    payload: {
      question: "If the equilibrium constant for the neutralization reaction of a weak base BOH with a strong acid (HCl) at 25 °C is 1.0 × 10⁸, the base dissociation constant (Kb) of BOH is:",
      option_a: "1.0 × 10⁻⁶",
      option_b: "1.0 × 10⁻⁸",
      option_c: "1.0 × 10⁻¹⁴",
      option_d: "1.0 × 10⁶",
      correct_option: "A",
      explanation: "Neutralization reaction: BOH + H⁺ ⇌ B⁺ + H₂O\nThis reaction is the reverse of the cationic hydrolysis of B⁺:\nK_neut = 1 / Kh\nSince Kh = Kw / Kb, we have:\nK_neut = Kb / Kw\nKb = K_neut × Kw = (1.0 × 10⁸) × (1.0 × 10⁻¹⁴) = 1.0 × 10⁻⁶.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4596,
    payload: {
      question: "In a saturated aqueous solution of a sparingly soluble metal hydroxide M(OH)₃, the equilibrium concentration of OH⁻ is 3.0 × 10⁻⁴ M. What is the value of Ksp / [M³⁺] in this solution?",
      option_a: "3.0 × 10⁻⁴",
      option_b: "2.7 × 10⁻¹¹",
      option_c: "2.7 × 10⁻¹²",
      option_d: "9.0 × 10⁻⁸",
      correct_option: "B",
      explanation: "For M(OH)₃(s) ⇌ M³⁺ + 3 OH⁻:\nKsp = [M³⁺] [OH⁻]³\nDividing both sides by [M³⁺]:\nKsp / [M³⁺] = [OH⁻]³\nGiven [OH⁻] = 3.0 × 10⁻⁴ M:\n[OH⁻]³ = (3.0 × 10⁻⁴)³ = 27 × 10⁻¹² = 2.7 × 10⁻¹¹.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4597,
    payload: {
      question: "The solubility product of Mg(OH)₂ is 1.2 × 10⁻¹¹. At what minimum pH will Mg(OH)₂ begin to precipitate from a 0.12 M Mg(NO₃)₂ solution?",
      option_a: "9.0",
      option_b: "10.0",
      option_c: "8.5",
      option_d: "11.0",
      correct_option: "A",
      explanation: "Precipitation begins when the ionic product equals Ksp:\n[Mg²⁺] [OH⁻]² = Ksp\nGiven [Mg²⁺] = 0.12 M:\n0.12 × [OH⁻]² = 1.2 × 10⁻¹¹\n[OH⁻]² = (1.2 × 10⁻¹¹) / 0.12 = 1.0 × 10⁻¹⁰\n[OH⁻] = 1.0 × 10⁻⁵ M\npOH = −log₁₀(1.0 × 10⁻⁵) = 5.0\npH = 14 − pOH = 14 − 5.0 = 9.0\nTherefore, precipitation begins at a minimum pH of 9.0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4598,
    payload: {
      question: "To prepare a phosphate buffer of pH = 7.40 using H₂PO₄⁻ and HPO₄²⁻ (pKa of H₂PO₄⁻ = 7.20), the required molar ratio of [HPO₄²⁻] to [H₂PO₄⁻] is approximately:",
      option_a: "1.58 : 1",
      option_b: "1 : 1.58",
      option_c: "2.0 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "According to the Henderson-Hasselbalch equation:\npH = pKa + log₁₀([Base] / [Acid])\n7.40 = 7.20 + log₁₀([HPO₄²⁻] / [H₂PO₄⁻])\nlog₁₀([HPO₄²⁻] / [H₂PO₄⁻]) = 7.40 − 7.20 = 0.20\n[HPO₄²⁻] / [H₂PO₄⁻] = 10^0.20 ≈ 1.58.\nTherefore, the ratio of base to acid is approximately 1.58 : 1.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 30 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
