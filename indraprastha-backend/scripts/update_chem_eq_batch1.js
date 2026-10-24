const fs = require('fs');

const chemEqBatch1Updates = [
  {
    id: 2748, // Q1
    similar_question: {
      question: "For the endothermic gaseous equilibrium:\nN₂O₄(g) + Heat ⇌ 2NO₂(g)\nWhich of the following changes will shift the equilibrium in the forward direction and result in a smooth, continuous increase in the concentration of NO₂(g) without any instantaneous vertical spike on a concentration-time graph?",
      option_a: "Increasing the temperature of the system at constant volume",
      option_b: "Adding more N₂O₄(g) into the reaction vessel",
      option_c: "Decreasing the volume of the container at constant temperature",
      option_d: "Adding a suitable catalyst to the mixture",
      correct_option: "A",
      explanation: "Step 1: Effect of temperature on endothermic equilibrium:\nAccording to Le Chatelier's principle, for an endothermic reaction (ΔH > 0), heat acts like a reactant:\nN₂O₄(g) + Heat ⇌ 2NO₂(g)\nAn increase in temperature shifts the equilibrium in the forward direction to absorb the supplied heat, increasing [NO₂] and decreasing [N₂O₄].\n\nStep 2: Profile on a concentration-time graph:\n- When temperature changes, the equilibrium constant (K_c) changes. The concentrations of reactants and products adjust continuously and smoothly over time to reach the new equilibrium, without any sharp vertical jump.\n- In contrast, adding N₂O₄ causes an instantaneous sharp vertical spike in [N₂O₄] at the instant of addition.\n- Decreasing container volume instantly increases the molar concentrations of all gases simultaneously.\n- A catalyst only increases the reaction rates equally and does not alter equilibrium concentrations.\n\nTherefore, increasing temperature causes a forward shift with smooth continuous concentration changes. Option (A) is the correct answer."
    }
  },
  {
    id: 2749, // Q2
    similar_question: {
      question: "Helium gas (an inert gas) is introduced into a rigid, closed container of constant volume containing an equilibrium mixture of:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nat a constant temperature of 500 K. What will be the effect on the equilibrium position and the degree of dissociation of PCl₅?",
      option_a: "Equilibrium position remains unchanged and degree of dissociation remains unchanged",
      option_b: "Equilibrium shifts forward and degree of dissociation increases",
      option_c: "Equilibrium shifts backward and degree of dissociation decreases",
      option_d: "Equilibrium shifts forward while equilibrium constant K_p increases",
      correct_option: "A",
      explanation: "Step 1: Effect of adding an inert gas at constant volume:\nWhen an inert gas (such as Helium) is added to an equilibrium system maintained inside a rigid container of constant volume (V = constant):\n- The total pressure inside the vessel increases due to the added partial pressure of helium.\n- However, the container volume (V) and absolute temperature (T) remain constant.\n\nStep 2: Analysis of molar concentrations and partial pressures:\nThe molar concentration of any reacting species i is given by [i] = n_i / V.\nSince both the moles n_i and volume V are unchanged, the molar concentrations of PCl₅, PCl₃, and Cl₂ remain completely unchanged.\nSimilarly, their individual partial pressures p_i = (n_i / V) R T remain unaltered.\n\nStep 3: Conclusion:\nBecause the reaction quotient Q_c remains exactly equal to K_c (and Q_p = K_p), the addition of an inert gas at constant volume has no effect on the equilibrium state or the degree of dissociation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3198, // Q3
    similar_question: {
      question: "For a gaseous reaction, the equilibrium constant K_p is 2.5 × 10⁻² atm⁻¹ at 400 K. What is the value of K_c for this reaction in L mol⁻¹?\n(Take gas constant R = 0.08 L atm mol⁻¹ K⁻¹)",
      option_a: "0.80",
      option_b: "0.025",
      option_c: "1.25",
      option_d: "12.8",
      correct_option: "A",
      explanation: "Step 1: Relation between K_p and K_c:\nK_p = K_c × (R T)^(Δn_g)\nwhere:\n- Δn_g = (moles of gaseous products) − (moles of gaseous reactants)\n- R = 0.08 L atm mol⁻¹ K⁻¹\n- T = 400 K\n\nStep 2: Determine Δn_g from units of K_p:\nThe unit of K_p is given as atm⁻¹, which corresponds to (atm)^(Δn_g) = atm⁻¹.\nTherefore, Δn_g = −1.\n\nStep 3: Calculate the product (R T):\nR T = 0.08 × 400 = 32 L atm mol⁻¹\n\nStep 4: Calculate K_c:\nK_p = K_c × (R T)⁻¹ = K_c / (R T)\nK_c = K_p × (R T)\n    = (2.5 × 10⁻² atm⁻¹) × (32 L atm mol⁻¹)\n    = 0.80 L mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3204, // Q4
    similar_question: {
      question: "Two moles of A and two moles of B are mixed in a 2 L sealed container at a certain temperature. They react according to the equation:\nA(g) + 2B(g) ⇌ C(g)\nAt equilibrium, the concentration of C is found to be 0.4 mol L⁻¹. What is the equilibrium constant K_c for this reaction in L² mol⁻²?",
      option_a: "16.67",
      option_b: "8.33",
      option_c: "33.33",
      option_d: "4.17",
      correct_option: "A",
      explanation: "Step 1: Calculate initial concentrations:\nVolume of container, V = 2 L\n- [A]₀ = 2 mol / 2 L = 1.0 M\n- [B]₀ = 2 mol / 2 L = 1.0 M\n- [C]₀ = 0 M\n\nStep 2: Determine equilibrium concentrations:\nReaction: A(g) + 2B(g) ⇌ C(g)\nLet x be the concentration of C formed at equilibrium:\n[C] = x = 0.4 M\n- Amount of A consumed = x = 0.4 M\n  [A] = 1.0 − 0.4 = 0.6 M\n- Amount of B consumed = 2x = 2 × 0.4 = 0.8 M\n  [B] = 1.0 − 0.8 = 0.2 M\n\nStep 3: Calculate equilibrium constant K_c:\nK_c = [C] / ([A] × [B]²)\n    = 0.4 / [0.6 × (0.2)²]\n    = 0.4 / (0.6 × 0.04)\n    = 0.4 / 0.024\n    = 50 / 3\n    ≈ 16.67 L² mol⁻².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3205, // Q5
    similar_question: {
      question: "For the following three gaseous equilibria, if the equilibrium concentration of every reactant and product species is exactly 0.1 M:\n(I) N₂O₄(g) ⇌ 2NO₂(g)\n(II) H₂(g) + I₂(g) ⇌ 2HI(g)\n(III) 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)\nWhich of the following represents the correct increasing order of the equilibrium constant (K_c) and hence the extent of reaction?",
      option_a: "I < II < III",
      option_b: "III < II < I",
      option_c: "II < I < III",
      option_d: "I = II = III",
      correct_option: "A",
      explanation: "Step 1: Calculate K_c for reaction (I):\nN₂O₄(g) ⇌ 2NO₂(g)\nK_c(I) = [NO₂]² / [N₂O₄] = (0.1)² / 0.1 = 0.01 / 0.1 = 0.1 = 10⁻¹\n\nStep 2: Calculate K_c for reaction (II):\nH₂(g) + I₂(g) ⇌ 2HI(g)\nK_c(II) = [HI]² / ([H₂] × [I₂]) = (0.1)² / [(0.1) × (0.1)] = 0.01 / 0.01 = 1\n\nStep 3: Calculate K_c for reaction (III):\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g)\nK_c(III) = [SO₃]² / ([SO₂]² × [O₂]) = (0.1)² / [(0.1)² × 0.1] = 1 / 0.1 = 10\n\nStep 4: Compare K_c values:\nK_c(I) = 0.1\nK_c(II) = 1.0\nK_c(III) = 10.0\nSince the extent of reaction is directly proportional to the magnitude of K_c:\nExtent of reaction: I < II < III.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3206, // Q6
    similar_question: {
      question: "According to the van 't Hoff equation, the variation of the equilibrium constant K with temperature T is given by:\nln K = −(ΔH° / R) × (1/T) + constant\nFor an exothermic reaction (ΔH° < 0):\n(A) The plot of ln K versus (1/T) has a positive slope (+|ΔH°| / R).\n(B) The value of equilibrium constant K decreases as temperature increases.\n(C) The forward reaction is favored by lowering the temperature.\nWhich of the above statements is/are correct?",
      option_a: "A, B, and C",
      option_b: "A and B only",
      option_c: "B and C only",
      option_d: "A and C only",
      correct_option: "A",
      explanation: "Step 1: Analyze statement (A) (Plot of ln K versus 1/T):\nThe van 't Hoff equation is:\nln K = (−ΔH° / R) × (1/T) + C\nThe slope of the linear plot of ln K versus 1/T is:\nSlope = −ΔH° / R\nFor an exothermic reaction, ΔH° < 0 (negative quantity).\nTherefore, Slope = −(−|ΔH°|) / R = +|ΔH°| / R (positive slope).\nThus, statement (A) is correct.\n\nStep 2: Analyze statement (B) (Effect of temperature on K):\nSince the slope is positive, as 1/T decreases (which corresponds to an increase in temperature T), ln K decreases, so the value of K decreases.\nThus, statement (B) is correct.\n\nStep 3: Analyze statement (C) (Le Chatelier's principle):\nAn exothermic reaction releases heat. Lowering the temperature removes heat, which shifts the equilibrium in the forward direction to produce more heat.\nThus, statement (C) is correct.\n\nStep 4: Conclusion:\nAll three statements A, B, and C are correct.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM BATCH 1 (Q1 to Q6) ---');
    for (const item of chemEqBatch1Updates) {
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

    console.log('\n--- DUMPING CHEMICAL EQUILIBRIUM BATCH 2 (Q7 to Q12) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_95_details.json'));
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
