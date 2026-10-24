const fs = require('fs');

const chemEqBatch2Updates = [
  {
    id: 3207, // Q7
    similar_question: {
      question: "Consider the industrial production of quicklime by thermal decomposition of limestone in a closed system:\nCaCO₃(s) ⇌ CaO(s) + CO₂(g), ΔH = +178 kJ mol⁻¹\nThe yield of CO₂(g) at equilibrium can be increased by:\n(A) Increasing the temperature of the kiln\n(B) Adding more solid calcium carbonate (CaCO₃)\n(C) Continuously removing CO₂(g) from the reaction chamber\n(D) Increasing the total pressure by reducing the volume\nWhich of the above actions will favor the forward reaction?",
      option_a: "A and C only",
      option_b: "A and B only",
      option_c: "B and D only",
      option_d: "A, B, and C",
      correct_option: "A",
      explanation: "Step 1: Analyze reaction characteristics:\nCaCO₃(s) ⇌ CaO(s) + CO₂(g), ΔH = +178 kJ mol⁻¹\n- The forward reaction is endothermic (ΔH > 0).\n- Pure solids (CaCO₃ and CaO) have constant activity (activity = 1) and their amounts do not alter equilibrium concentrations.\n- The equilibrium constant expression in terms of partial pressure is K_p = p_CO₂.\n\nStep 2: Evaluate each action:\n- Action (A) Increasing temperature: For an endothermic reaction, increasing temperature increases the equilibrium constant K_p, shifting the equilibrium in the forward direction and increasing CO₂ yield (Correct).\n- Action (B) Adding solid CaCO₃: Pure solids do not appear in the equilibrium expression; adding more solid has zero effect on the equilibrium position (Incorrect).\n- Action (C) Removing CO₂(g): According to Le Chatelier's principle, removing a gaseous product drives the equilibrium forward to replace it, increasing production (Correct).\n- Action (D) Reducing volume: Increases total pressure, which drives the equilibrium backward toward fewer moles of gas (Incorrect).\n\nStep 3: Conclusion:\nActions A and C will increase the yield of CO₂(g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3208, // Q8
    similar_question: {
      question: "The following two gaseous equilibria are simultaneously established in a rigid container:\nEquilibrium 1: A(g) ⇌ B(g) + C(g)\nEquilibrium 2: C(g) + D(g) ⇌ E(g)\nIf a chemical substance that selectively reacts with and removes gas D is introduced into the container, what will happen to the equilibrium concentration of B(g) at the new equilibrium state?",
      option_a: "Concentration of B will decrease",
      option_b: "Concentration of B will increase",
      option_c: "Concentration of B will remain unchanged",
      option_d: "Concentration of B will become zero",
      correct_option: "A",
      explanation: "Step 1: Effect of removing gas D on Equilibrium 2:\nC(g) + D(g) ⇌ E(g)\nRemoving reactant D reduces [D].\nAccording to Le Chatelier's principle, Equilibrium 2 shifts backward (to the left) to replenish D, decomposing E(g) and releasing additional C(g).\nTherefore, the concentration of C(g) in the container increases.\n\nStep 2: Effect of increased [C] on Equilibrium 1:\nEquilibrium 1: A(g) ⇌ B(g) + C(g)\nSince C(g) is a product of Equilibrium 1, an increase in [C] drives Equilibrium 1 backward (to the left) to consume the excess C.\n\nStep 3: Effect on B(g):\nShifting Equilibrium 1 backward consumes B(g).\nTherefore, at the new equilibrium state, the concentration of B(g) will decrease.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3209, // Q9
    similar_question: {
      question: "For the dissociation equilibrium:\nN₂O₄(g) ⇌ 2NO₂(g)   (Δn_g = +1)\nWhich of the following changes carried out at constant temperature will shift the equilibrium in the forward direction?\n(A) Adding argon gas at constant pressure\n(B) Adding argon gas at constant volume\n(C) Adding NO₂(g) at constant volume\n(D) Adding N₂O₄(g) at constant volume",
      option_a: "A and D only",
      option_b: "A and B only",
      option_c: "C and D only",
      option_d: "A, B, and D",
      correct_option: "A",
      explanation: "Step 1: Stoichiometry of the reaction:\nN₂O₄(g) ⇌ 2NO₂(g)\nNumber of gaseous moles: Reactants = 1, Products = 2 (Δn_g = 2 − 1 = +1).\n\nStep 2: Evaluate statement (A) (Inert gas at constant pressure):\nAdding an inert gas (Argon) at constant pressure forces the volume of the container to increase.\nAn increase in volume reduces the partial pressures of all gaseous species.\nAccording to Le Chatelier's principle, the equilibrium shifts toward the side with more moles of gas (forward direction). Thus, statement (A) favors the forward reaction.\n\nStep 3: Evaluate statement (B) (Inert gas at constant volume):\nAt constant volume, the partial pressures and molar concentrations of N₂O₄ and NO₂ remain unchanged; hence the equilibrium does not shift.\n\nStep 4: Evaluate statement (C) (Adding NO₂):\nAdding product NO₂ increases [NO₂], which shifts the equilibrium backward (to the left).\n\nStep 5: Evaluate statement (D) (Adding N₂O₄):\nAdding reactant N₂O₄ increases [N₂O₄], which shifts the equilibrium forward (to the right).\n\nStep 6: Conclusion:\nChanges (A) and (D) favor the forward reaction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3210, // Q10
    similar_question: {
      question: "Consider the synthesis of sulfur trioxide in a closed vessel:\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + Heat    (ΔH = −198 kJ mol⁻¹)\nWhich of the following actions will cause the equilibrium to shift in the backward direction, thereby increasing the equilibrium concentration of SO₂(g)?\n(A) Increasing the temperature of the reaction mixture\n(B) Increasing the volume of the reaction container (decreasing total pressure)\n(C) Removing O₂(g) from the equilibrium vessel\n(D) Injecting additional SO₃(g) into the vessel",
      option_a: "A, B, C, and D",
      option_b: "A and B only",
      option_c: "C and D only",
      option_d: "A, C, and D only",
      correct_option: "A",
      explanation: "Step 1: Analyze thermodynamics and stoichiometry:\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + Heat\n- The reaction is exothermic (ΔH = −198 kJ mol⁻¹ < 0).\n- Gaseous moles: Reactants = 2 + 1 = 3 moles, Products = 2 moles (Δn_g = 2 − 3 = −1).\n\nStep 2: Evaluate actions shifting the equilibrium backward (left):\n- (A) Increasing temperature: By Le Chatelier's principle, supplying heat to an exothermic system shifts the equilibrium in the endothermic direction (backward), increasing [SO₂].\n- (B) Increasing volume (decreasing pressure): A decrease in pressure shifts the equilibrium toward the side having more moles of gas (reactants side with 3 moles vs products side with 2 moles), thus shifting backward and increasing [SO₂].\n- (C) Removing O₂(g): Removing a reactant causes the system to shift backward to replace it, increasing [SO₂].\n- (D) Adding SO₃(g): Adding a product drives the reaction backward to consume it, increasing [SO₂].\n\nStep 3: Conclusion:\nAll four actions (A, B, C, and D) shift the equilibrium backward and increase the concentration of SO₂(g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3211, // Q11
    similar_question: {
      question: "Regarding the phase diagram of carbon dioxide (CO₂), which of the following statements is/are correct?\n(A) The triple point of CO₂ occurs at a pressure above 1 atm (at approximately 5.11 atm and 216.6 K).\n(B) Liquid CO₂ cannot exist in open equilibrium at standard atmospheric pressure (1 atm).\n(C) Solid CO₂ (dry ice) sublimes directly into gaseous CO₂ when heated above 195 K (−78.5 °C) at 1 atm.\n(D) At 1 atm pressure, water ice and dry ice both exhibit identical sublimation behavior at room temperature.",
      option_a: "A, B, and C only",
      option_b: "A and B only",
      option_c: "B and C only",
      option_d: "A, B, C, and D",
      correct_option: "A",
      explanation: "Step 1: Triple point of CO₂:\nThe triple point of CO₂ is at 5.11 atm and 216.6 K (−56.6 °C). Since this pressure is significantly higher than standard atmospheric pressure (1 atm), statement (A) is correct.\n\nStep 2: Existence of liquid phase at 1 atm:\nBecause 1 atm lies well below the triple point pressure (5.11 atm), the liquid phase cannot exist at 1 atm. Any phase transition at 1 atm proceeds directly between solid and vapor. Therefore, statement (B) is correct.\n\nStep 3: Sublimation of dry ice:\nAt 1 atm, solid CO₂ (dry ice) sublimes directly into gaseous CO₂ at 195 K (−78.5 °C). Above this temperature at 1 atm, it exists solely as gas. Therefore, statement (C) is correct.\n\nStep 4: Comparison with water ice:\nThe triple point of water is at 0.006 atm (well below 1 atm), so at 1 atm ice melts into liquid water at 0 °C (273 K), whereas dry ice sublimes. Thus, statement (D) is incorrect.\n\nStep 5: Conclusion:\nStatements A, B, and C are correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3212, // Q12
    similar_question: {
      question: "Three gaseous structural isomers X, Y, and Z exist in mutual dynamic equilibrium within a 1 L sealed vessel:\nX(g) ⇌ Y(g)    (Equilibrium constant = K₁)\nY(g) ⇌ Z(g)    (Equilibrium constant = K₂)\nX(g) ⇌ Z(g)    (Equilibrium constant = K₃)\nIf 1 mole of pure isomer X is placed initially in the vessel, which of the following statements is/are correct?\n(A) At any instant throughout the reaction, [X] + [Y] + [Z] = 1.0 M by mass conservation.\n(B) The equilibrium constants satisfy the thermodynamic relationship: K₃ = K₁ × K₂.\n(C) If at equilibrium [Z] > [Y] > [X], then isomer Z is thermodynamically the most stable isomer.",
      option_a: "A, B, and C",
      option_b: "A and B only",
      option_c: "B and C only",
      option_d: "A and C only",
      correct_option: "A",
      explanation: "Step 1: Conservation of mass (Statement A):\nSince X, Y, and Z are isomers, they share identical molecular formulas and molecular weights.\nStarting with 1 mole in a 1 L vessel, the total molar concentration of all isomers at any time (initial, intermediate, or equilibrium) must equal the initial concentration:\n[X] + [Y] + [Z] = 1.0 mol / 1.0 L = 1.0 M.\nTherefore, statement (A) is correct.\n\nStep 2: Relation among equilibrium constants (Statement B):\nBy definition:\nK₁ = [Y] / [X]\nK₂ = [Z] / [Y]\nMultiplying K₁ and K₂:\nK₁ × K₂ = ([Y] / [X]) × ([Z] / [Y]) = [Z] / [X] = K₃.\nTherefore, statement (B) is correct.\n\nStep 3: Thermodynamic stability (Statement C):\nThe equilibrium constant relates directly to standard Gibbs free energy change (ΔG° = −R T ln K).\nThe isomer present in the greatest concentration at equilibrium has the lowest standard chemical potential (free energy), making it thermodynamically the most stable.\nSince [Z] > [Y] > [X], isomer Z is the most stable and X is the least stable.\nTherefore, statement (C) is correct.\n\nStep 4: Conclusion:\nAll three statements A, B, and C are correct.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM BATCH 2 (Q7 to Q12) ---');
    for (const item of chemEqBatch2Updates) {
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

    console.log('\n--- DUMPING CHEMICAL EQUILIBRIUM BATCH 3 (Q13 to Q18) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_95_details.json'));
    const batch3 = allData.questions.slice(12, 18);
    batch3.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${13 + idx} [ID: ${q.id}]`);
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
