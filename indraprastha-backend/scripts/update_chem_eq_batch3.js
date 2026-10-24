const fs = require('fs');

const chemEqBatch3Updates = [
  {
    id: 3213, // Q13
    similar_question: {
      question: "Consider the complex ion equilibrium in aqueous solution:\nAgCl(s) + 2NH₃(aq) ⇌ [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq)\nWhich of the following changes will decrease the equilibrium concentration of the complex ion [Ag(NH₃)₂]⁺(aq)?\n(A) Addition of solid NaCl to the solution\n(B) Addition of concentrated HNO₃(aq) to the solution\n(C) Addition of more solid AgCl to the system\n(D) Addition of excess concentrated NH₃(aq)",
      option_a: "A and B only",
      option_b: "B and D only",
      option_c: "A, B, and C",
      option_d: "C and D only",
      correct_option: "A",
      explanation: "Step 1: Analyze the equilibrium:\nAgCl(s) + 2NH₃(aq) ⇌ [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq)\n\nStep 2: Evaluate change (A) (Adding solid NaCl):\nNaCl completely dissociates into Na⁺ and Cl⁻ ions.\nIncreasing [Cl⁻] (a common product ion) increases the reaction quotient Q, driving the equilibrium backward (to the left) to consume excess chloride. This reduces the concentration of [Ag(NH₃)₂]⁺.\n\nStep 3: Evaluate change (B) (Adding HNO₃):\nHNO₃ is a strong acid providing H⁺ ions, which react with basic NH₃ to form ammonium ions (NH₃ + H⁺ → NH₄⁺).\nThis depletes the free NH₃ reactant, driving the equilibrium backward and decreasing [[Ag(NH₃)₂]⁺].\n\nStep 4: Evaluate change (C) (Adding solid AgCl):\nAgCl is a pure solid with constant activity (activity = 1). Adding more solid does not change the equilibrium state.\n\nStep 5: Evaluate change (D) (Adding NH₃):\nAdding reactant NH₃ drives the reaction forward, increasing [[Ag(NH₃)₂]⁺].\n\nStep 6: Conclusion:\nChanges A and B decrease the equilibrium concentration of [Ag(NH₃)₂]⁺.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3214, // Q14
    similar_question: {
      question: "For the phase equilibrium of water:\nIce (solid) ⇌ Water (liquid)\nSince the density of ice is less than the density of liquid water (Volume of ice > Volume of water), what will happen if the external pressure on this system is INCREASED at constant temperature?\n(A) More ice will melt into liquid water\n(B) More liquid water will freeze into ice\n(C) The melting point of ice will decrease\n(D) The melting point of ice will increase",
      option_a: "A and C only",
      option_b: "B and D only",
      option_c: "A and D only",
      option_d: "B and C only",
      correct_option: "A",
      explanation: "Step 1: Density and volume relationship for the ice-water system:\nDensity of ice (≈ 0.92 g cm⁻³) is lower than that of liquid water (≈ 1.00 g cm⁻³).\nFor a given mass: Volume of ice (V_solid) > Volume of liquid water (V_liquid).\n\nStep 2: Effect of increasing pressure (Le Chatelier's principle):\nIce (larger volume) ⇌ Liquid water (smaller volume)\nApplying pressure stresses the system toward reducing volume.\nThus, increasing pressure shifts the equilibrium forward toward the smaller volume phase (liquid water), causing more ice to melt (Statement A is correct).\n\nStep 3: Effect on melting point (Clausius-Clapeyron equation):\ndP / dT = ΔH_fusion / [T (V_liquid − V_solid)]\nSince (V_liquid − V_solid) is negative, the slope dP / dT is negative.\nThis means as external pressure increases, the melting temperature decreases below 0 °C (Statement C is correct).\n\nStep 4: Conclusion:\nStatements A and C are correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3215, // Q15
    similar_question: {
      question: "Consider the reduction of zinc oxide by carbon in a closed container at high temperature:\nZnO(s) + C(s) ⇌ Zn(g) + CO(g)\nWhich of the following alterations will NOT cause any shift in the equilibrium state of the system?\n(A) Adding more solid carbon (C) into the vessel\n(B) Removing zinc vapor Zn(g) from the vessel\n(C) Increasing the volume of the reaction container\n(D) Adding carbon monoxide CO(g) into the vessel",
      option_a: "Adding more solid carbon (C) into the vessel",
      option_b: "Removing zinc vapor Zn(g) from the vessel",
      option_c: "Increasing the volume of the reaction container",
      option_d: "Adding carbon monoxide CO(g) into the vessel",
      correct_option: "A",
      explanation: "Step 1: Thermodynamic activity of pure solids:\nIn a heterogeneous equilibrium:\nZnO(s) + C(s) ⇌ Zn(g) + CO(g)\nThe pure solid phases ZnO(s) and C(s) have constant thermodynamic activity (activity = 1) regardless of their quantity.\n\nStep 2: Equilibrium expression:\nK_p = (p_Zn) × (p_CO)\nBecause the solids do not appear in the equilibrium expression, adding or removing solid carbon or solid zinc oxide produces no change in partial pressures or reaction quotient, leaving the equilibrium completely undisturbed.\n\nStep 3: Other options:\n- Removing Zn(g) lowers p_Zn, shifting equilibrium forward.\n- Increasing volume lowers total pressure, shifting equilibrium forward (toward 2 moles of gas).\n- Adding CO(g) raises p_CO, shifting equilibrium backward.\n\nTherefore, adding solid carbon does not disturb the equilibrium. Option (A) is the correct answer."
    }
  },
  {
    id: 3216, // Q16
    similar_question: {
      question: "Given below are two statements regarding dynamic chemical equilibrium:\nStatement 1: If a small amount of reactant A(g) is removed from an equilibrium mixture of A(g) ⇌ B(g), the concentration of A at the newly established equilibrium will be less than its concentration at the initial equilibrium.\nStatement 2: According to Le Chatelier's principle, the equilibrium shifts to oppose the change, but the response of the system only partially compensates for the imposed disturbance.\nWhich of the following is correct?",
      option_a: "Both Statement 1 and Statement 2 are true, and Statement 2 is the correct explanation of Statement 1",
      option_b: "Both Statement 1 and Statement 2 are true, but Statement 2 is NOT the correct explanation of Statement 1",
      option_c: "Statement 1 is true, but Statement 2 is false",
      option_d: "Statement 1 is false, but Statement 2 is true",
      correct_option: "A",
      explanation: "Step 1: Analyze Statement 2 (Partial compensation):\nWhen a stress is applied to an equilibrium mixture (such as removing a quantity of reactant A), the system shifts backward (to the left) to produce more A.\nHowever, according to Le Chatelier's principle, the shift only partially offsets the loss; it can never restore the concentration of A back to its original value, because if it did, the thermodynamic driving force for the shift would vanish. Thus, Statement 2 is true.\n\nStep 2: Analyze Statement 1 (Net concentration of A):\nBecause the restorative backward shift is strictly partial, the final concentration of A at the new equilibrium remains strictly lower than the concentration before the removal occurred. Thus, Statement 1 is true.\n\nStep 3: Explanation link:\nStatement 1 is a direct outcome of the partial compensation principle stated in Statement 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3217, // Q17
    similar_question: {
      question: "Given below are two statements:\nStatement 1: Solid ammonium hydrogen sulfide decomposes according to:\nNH₄HS(s) ⇌ NH₃(g) + H₂S(g)    (K_p = 100 atm² at 300 K)\nIf NH₃(g) at 8 atm and H₂S(g) at 12 atm are introduced into an evacuated rigid container containing excess NH₄HS(s) at 300 K, the total pressure at equilibrium will be greater than 20 atm.\nStatement 2: A reversible reaction at a given temperature always proceeds in the forward direction when the reaction quotient Q_p is less than the equilibrium constant K_p.\nWhich of the following is correct?",
      option_a: "Both Statement 1 and Statement 2 are true, and Statement 2 is the correct explanation of Statement 1",
      option_b: "Both Statement 1 and Statement 2 are true, but Statement 2 is NOT the correct explanation of Statement 1",
      option_c: "Statement 1 is true, but Statement 2 is false",
      option_d: "Statement 1 is false, but Statement 2 is true",
      correct_option: "A",
      explanation: "Step 1: Calculate the initial reaction quotient (Q_p):\nFor the reaction: NH₄HS(s) ⇌ NH₃(g) + H₂S(g)\nQ_p = (p_NH₃) × (p_H₂S)\nGiven initial partial pressures: p_NH₃ = 8 atm, p_H₂S = 12 atm.\nQ_p = 8 × 12 = 96 atm².\n\nStep 2: Compare Q_p with K_p:\nGiven K_p = 100 atm².\nSince Q_p (96 atm²) < K_p (100 atm²), the system must proceed in the forward direction to generate more gases and establish equilibrium (Statement 2 is true).\n\nStep 3: Evaluate total pressure at equilibrium:\nLet x be the increase in partial pressure due to the forward reaction:\nAt equilibrium: p_NH₃ = 8 + x, p_H₂S = 12 + x.\nTotal pressure, P_total = (8 + x) + (12 + x) = 20 + 2x atm.\nSince the reaction proceeds forward, x > 0, so P_total > 20 atm (Statement 1 is true).\n\nStep 4: Conclusion:\nBoth Statement 1 and Statement 2 are true, and Statement 2 correctly explains Statement 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4539, // Q18
    similar_question: {
      question: "Dynamic equilibrium can be established in a closed system for:\n(A) Only physical state changes (e.g., evaporation of liquid water)\n(B) Only chemical reactions (e.g., synthesis of ammonia)\n(C) Both physical processes and chemical reactions\n(D) Neither physical processes nor chemical reactions",
      option_a: "Both physical processes and chemical reactions",
      option_b: "Only physical state changes",
      option_c: "Only chemical reactions",
      option_d: "Neither physical processes nor chemical reactions",
      correct_option: "A",
      explanation: "Step 1: Definition of dynamic equilibrium:\nDynamic equilibrium refers to a state of a closed system where two opposing processes proceed at exactly equal rates, keeping all macroscopic properties (concentration, pressure, density) constant over time.\n\nStep 2: Types of dynamic equilibria:\n1. Physical equilibria: Involve reversible transformations of physical state or phase without altering chemical bonds (e.g., Solid ⇌ Liquid, Liquid ⇌ Vapor, Solid ⇌ Solution, Gas ⇌ Solution).\n2. Chemical equilibria: Involve reversible chemical transformations where reactants form products and products reform reactants (e.g., N₂(g) + 3H₂(g) ⇌ 2NH₃(g), 2NO₂(g) ⇌ N₂O₄(g)).\n\nStep 3: Conclusion:\nDynamic equilibrium applies equally to both physical processes and chemical reactions.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM BATCH 3 (Q13 to Q18) ---');
    for (const item of chemEqBatch3Updates) {
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

    console.log('\n--- DUMPING CHEMICAL EQUILIBRIUM BATCH 4 (Q19 to Q24) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_95_details.json'));
    const batch4 = allData.questions.slice(18, 24);
    batch4.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${19 + idx} [ID: ${q.id}]`);
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
