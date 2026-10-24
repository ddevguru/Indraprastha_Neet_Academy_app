const fs = require('fs');

const ionicEqBatch1Updates = [
  {
    id: 3228, // Q1
    similar_question: {
      question: "What volume (in mL) of 0.50 M NaOH solution is required to completely neutralize 200 mL of 0.50 M orthophosphoric acid (H₃PO₄) solution?",
      option_a: "600 mL",
      option_b: "200 mL",
      option_c: "400 mL",
      option_d: "800 mL",
      correct_option: "A",
      explanation: "Step 1: Determine the basicity and n-factor of the acid:\nOrthophosphoric acid (H₃PO₄) contains three ionizable P−OH protons, making it a tribasic acid:\nn-factor of H₃PO₄ = 3.\nNormality of H₃PO₄ solution = Molarity × n-factor\n                           = 0.50 M × 3 = 1.50 N.\n\nStep 2: Determine n-factor of base:\nSodium hydroxide (NaOH) is a monoacidic base (furnishes 1 OH⁻ ion):\nn-factor of NaOH = 1.\nNormality of NaOH solution = 0.50 M × 1 = 0.50 N.\n\nStep 3: Apply the law of chemical equivalence:\nMilliequivalents of acid = Milliequivalents of base\nN_acid × V_acid = N_base × V_base\n1.50 N × 200 mL = 0.50 N × V_base\n300 = 0.50 × V_base\nV_base = 300 / 0.50 = 600 mL.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3232, // Q2
    similar_question: {
      question: "The following acid-base equilibria have their equilibrium positions lying predominantly to the right (K_eq > 1):\nReaction 1: HX + Y⁻ ⇌ X⁻ + HY      (K_eq = 10⁵)\nReaction 2: HZ + X⁻ ⇌ Z⁻ + HX      (K_eq = 10²)\nReaction 3: HZ + Y⁻ ⇌ Z⁻ + HY      (K_eq = 10⁷)\nBased on this information, what is the correct decreasing order of acid strength among HX, HY, and HZ?",
      option_a: "HZ > HX > HY",
      option_b: "HY > HX > HZ",
      option_c: "HX > HZ > HY",
      option_d: "HZ > HY > HX",
      correct_option: "A",
      explanation: "Step 1: Principle of acid-base equilibrium:\nA Brønsted-Lowry acid-base reaction always proceeds spontaneously (K_eq > 1) in the direction that forms the weaker acid and weaker base:\nStronger Acid + Stronger Base ⇌ Weaker Acid + Weaker Base.\n\nStep 2: Analyze Reaction 1:\nHX + Y⁻ ⇌ X⁻ + HY  (K_eq = 10⁵ > 1)\nBecause equilibrium lies to the right, reactant acid HX is stronger than product acid HY:\nAcid strength: HX > HY.\n\nStep 3: Analyze Reaction 2:\nHZ + X⁻ ⇌ Z⁻ + HX  (K_eq = 10² > 1)\nBecause equilibrium lies to the right, reactant acid HZ is stronger than product acid HX:\nAcid strength: HZ > HX.\n\nStep 4: Combine the inequalities:\nHZ > HX and HX > HY  →  HZ > HX > HY.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3236, // Q3
    similar_question: {
      question: "A dilute solution of AgNO₃ is added dropwise to an aqueous solution containing 0.01 M each of Cl⁻, Br⁻, I⁻, and CrO₄²⁻. Given the solubility product constants:\nK_sp(AgCl) = 1.8 × 10⁻¹⁰\nK_sp(AgBr) = 5.0 × 10⁻¹³\nK_sp(AgI) = 8.3 × 10⁻¹⁷\nK_sp(Ag₂CrO₄) = 1.1 × 10⁻¹²\nWhich silver salt will precipitate first?",
      option_a: "AgI",
      option_b: "AgBr",
      option_c: "AgCl",
      option_d: "Ag₂CrO₄",
      correct_option: "A",
      explanation: "Step 1: Criterion for selective precipitation:\nPrecipitation begins as soon as the ionic product exceeds K_sp. The salt that requires the lowest concentration of Ag⁺ to exceed its K_sp will precipitate first.\n\nStep 2: Calculate minimum [Ag⁺] required for each anion ([Anion] = 0.01 M = 10⁻² M):\n1. For AgCl: [Ag⁺] = K_sp / [Cl⁻] = (1.8 × 10⁻¹⁰) / 10⁻² = 1.8 × 10⁻⁸ M.\n2. For AgBr: [Ag⁺] = K_sp / [Br⁻] = (5.0 × 10⁻¹³) / 10⁻² = 5.0 × 10⁻¹¹ M.\n3. For AgI: [Ag⁺] = K_sp / [I⁻] = (8.3 × 10⁻¹⁷) / 10⁻² = 8.3 × 10⁻¹⁵ M.\n4. For Ag₂CrO₄: [Ag⁺]² [CrO₄²⁻] = K_sp\n   [Ag⁺] = √(K_sp / [CrO₄²⁻]) = √[(1.1 × 10⁻¹²) / 10⁻²] = √(1.1 × 10⁻¹⁰) ≈ 1.05 × 10⁻⁵ M.\n\nStep 3: Compare required [Ag⁺] values:\n8.3 × 10⁻¹⁵ M (for AgI) is the smallest value of [Ag⁺] among all salts.\nTherefore, AgI will precipitate first.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3251, // Q4
    similar_question: {
      question: "A solution is prepared by mixing equal volumes of 0.20 M weak acid HA (K_a1 = 1.6 × 10⁻⁴) and 0.20 M weak acid HB (K_a2 = 9.0 × 10⁻⁵) at 25 °C. What is the hydrogen ion concentration [H⁺] in the resulting mixture?",
      option_a: "5.0 × 10⁻³ M",
      option_b: "2.5 × 10⁻³ M",
      option_c: "1.0 × 10⁻² M",
      option_d: "7.5 × 10⁻³ M",
      correct_option: "A",
      explanation: "Step 1: Calculate initial concentrations after dilution:\nWhen equal volumes of two solutions are mixed, the total volume doubles, halving the concentration of each component:\nC_HA = 0.20 M / 2 = 0.10 M\nC_HB = 0.20 M / 2 = 0.10 M\n\nStep 2: Formula for [H⁺] in a mixture of two weak monoprotic acids:\nBoth acids dissociate into the same solution and contribute to [H⁺]:\n[H⁺] = √(C_HA × K_a1 + C_HB × K_a2)\n\nStep 3: Substitute the values:\nC_HA × K_a1 = 0.10 × (1.6 × 10⁻⁴) = 1.6 × 10⁻⁵\nC_HB × K_a2 = 0.10 × (9.0 × 10⁻⁵) = 0.9 × 10⁻⁵\n[H⁺] = √(1.6 × 10⁻⁵ + 0.9 × 10⁻⁵)\n     = √(2.5 × 10⁻⁵)\n     = √(25 × 10⁻⁶)\n     = 5.0 × 10⁻³ M.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3258, // Q5
    similar_question: {
      question: "Which of the following species can act as an amphiprotic substance (capable of acting as both a Brønsted-Lowry acid and a Brønsted-Lowry base) in aqueous solution?\n(I) HSO₄⁻\n(II) HPO₄²⁻\n(III) PO₄³⁻\n(IV) H₂PO₂⁻",
      option_a: "I and II only",
      option_b: "II and IV only",
      option_c: "I, II, and IV",
      option_d: "II, III, and IV",
      correct_option: "A",
      explanation: "Step 1: Definition of amphiprotic species:\nAn amphiprotic species is a chemical entity that can both donate a proton (act as a Brønsted-Lowry acid) and accept a proton (act as a Brønsted-Lowry base).\n\nStep 2: Evaluate each species:\n- (I) HSO₄⁻:\n  Acid action: HSO₄⁻ ⇌ SO₄²⁻ + H⁺\n  Base action: HSO₄⁻ + H⁺ ⇌ H₂SO₄\n  (Amphiprotic).\n- (II) HPO₄²⁻:\n  Acid action: HPO₄²⁻ ⇌ PO₄³⁻ + H⁺\n  Base action: HPO₄²⁻ + H⁺ ⇌ H₂PO₄⁻\n  (Amphiprotic).\n- (III) PO₄³⁻:\n  Lacks any protons; can only accept H⁺ to form HPO₄²⁻ (acts only as a base).\n- (IV) H₂PO₂⁻ (hypophosphite ion):\n  Formed from monobasic hypophosphorous acid (H₃PO₂). The two hydrogen atoms are bonded directly to phosphorus (P−H) and are non-ionizable. It cannot donate a proton in aqueous solution (acts only as a base).\n\nStep 3: Conclusion:\nOnly HSO₄⁻ and HPO₄²⁻ (I and II) are amphiprotic.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3287, // Q6
    similar_question: {
      question: "Pure liquid water undergoes autoionization at 25 °C:\n2H₂O(l) ⇌ H₃O⁺(aq) + OH⁻(aq)    (K_w = 1.0 × 10⁻¹⁴)\nWhat is the total number of hydronium ions (H₃O⁺) present in 1.0 mL (1.0 cm³) of pure water at 25 °C?\n(Given: Avogadro's number, N_A = 6.022 × 10²³ mol⁻¹)",
      option_a: "6.022 × 10¹³",
      option_b: "6.022 × 10¹⁶",
      option_c: "1.0 × 10⁻¹⁰",
      option_d: "6.022 × 10²⁰",
      correct_option: "A",
      explanation: "Step 1: Determine the concentration of H₃O⁺ ions in pure water:\nAutoionization of water:\n2H₂O(l) ⇌ H₃O⁺(aq) + OH⁻(aq)\nK_w = [H₃O⁺] × [OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C.\nIn pure water, [H₃O⁺] = [OH⁻]:\n[H₃O⁺] = √(K_w) = √(1.0 × 10⁻¹⁴) = 1.0 × 10⁻⁷ mol L⁻¹ (M).\n\nStep 2: Calculate moles of H₃O⁺ in 1.0 mL:\nVolume, V = 1.0 mL = 1.0 × 10⁻³ L.\nMoles of H₃O⁺ = Molarity × Volume\n              = (1.0 × 10⁻⁷ mol L⁻¹) × (1.0 × 10⁻³ L)\n              = 1.0 × 10⁻¹⁰ mol.\n\nStep 3: Calculate the number of H₃O⁺ ions:\nNumber of ions = Moles × Avogadro's number (N_A)\n               = (1.0 × 10⁻¹⁰ mol) × (6.022 × 10²³ ions mol⁻¹)\n               = 6.022 × 10¹³ ions.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Login failed');

    console.log('--- UPDATING IONIC EQUILIBRIUM BATCH 1 (Q1 to Q6) ---');
    for (const item of ionicEqBatch1Updates) {
      const res = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          similarQuestion: item.similar_question
        })
      });
      const data = await res.json();
      console.log(`Updated Question ID ${item.id}:`, data.success ? 'SUCCESS' : data);
    }

    console.log('\n--- DUMPING IONIC EQUILIBRIUM BATCH 2 (Q7 to Q12) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_96_details.json'));
    const batch2 = allData.questions.slice(6, 12);
    batch2.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${7 + idx} [ID: ${q.id}]`);
      console.log(`Question: ${q.question}`);
      console.log(`Options:`);
      console.log(`  (A) ${q.option_a}`);
      console.log(`  (B) ${q.option_b}`);
      console.log(`  (C) ${q.option_c}`);
      console.log(`  (D) ${q.option_d}`);
      console.log(`Correct: ${q.correct_option}`);
      if (q.question_image_link) console.log(`Question Image: ${q.question_image_link}`);
      if (q.explanation_image_link) console.log(`Explanation Image: ${q.explanation_image_link}`);
      if (q.explanation) console.log(`Explanation Text: ${q.explanation}`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

if (process.argv[2] === '--commit') {
  main();
} else {
  console.log('Script ready for execution with --commit');
}
