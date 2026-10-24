const fs = require('fs');

const chemEqBatch4Updates = [
  {
    id: 4540, // Q19
    similar_question: {
      question: "Which of the following statements correctly characterizes a chemical reaction that has attained a state of dynamic equilibrium in a closed vessel?",
      option_a: "The concentrations of reactants and products remain constant with time, but are not necessarily equal",
      option_b: "The forward and reverse reactions have completely ceased to occur",
      option_c: "The molar concentration of the reactants must always be exactly equal to the molar concentration of the products",
      option_d: "The reaction quotient Q is strictly equal to zero",
      correct_option: "A",
      explanation: "Step 1: Characteristics of dynamic chemical equilibrium:\nAt dynamic chemical equilibrium:\n1. The rate of the forward reaction equals the rate of the reverse reaction (r_forward = r_reverse ≠ 0). The opposing reactions continue at the microscopic level with equal speed.\n2. Because products are consumed as quickly as they are formed, the molar concentrations of all reactants and products remain invariant (constant) with time.\n\nStep 2: Are reactant and product concentrations equal?\nThe equilibrium concentrations depends on the magnitude of the equilibrium constant K. They do not have to be equal. Equality ([Reactants] = [Products]) is merely a special case when K = 1 for symmetric stoichiometry.\n\nStep 3: Other options:\n- The reaction does not stop (it is dynamic, not static).\n- At equilibrium, Q = K, not zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4541, // Q20
    similar_question: {
      question: "For the gaseous dissociation reaction:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nWhich of the following changes will shift the equilibrium in the backward direction, thereby increasing the number of moles of PCl₅(g) at equilibrium?",
      option_a: "Increasing the external pressure on the system at constant temperature",
      option_b: "Increasing the volume of the reaction container",
      option_c: "Decreasing the external pressure on the system",
      option_d: "Introducing an inert gas at constant volume",
      correct_option: "A",
      explanation: "Step 1: Determine change in moles of gas (Δn_g):\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nMoles of gaseous reactants = 1\nMoles of gaseous products = 1 + 1 = 2\nΔn_g = 2 − 1 = +1.\n\nStep 2: Apply Le Chatelier's principle for pressure change:\nAn increase in external pressure stresses the system toward a state of lower volume (fewer moles of gas).\nHere, the reactant side has 1 mole while the product side has 2 moles.\nTherefore, increasing pressure drives the equilibrium in the backward direction (to the left), increasing the moles and concentration of PCl₅(g).\n\nStep 3: Other options:\n- Increasing volume (decreasing pressure) shifts equilibrium forward toward 2 moles of gas.\n- Adding an inert gas at constant volume produces no change in partial pressures and does not shift the equilibrium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4542, // Q21
    similar_question: {
      question: "Which of the following statements regarding a chemical equilibrium is correct?",
      option_a: "A dynamic equilibrium state can be attained starting from either the reactants side or the products side",
      option_b: "A catalyst shifts the equilibrium position toward products and increases the equilibrium constant K",
      option_c: "At equilibrium, the rate of the forward reaction is significantly greater than the rate of the reverse reaction",
      option_d: "Equilibrium can only be established in an open container",
      correct_option: "A",
      explanation: "Step 1: Reversibility of equilibrium (Statement A):\nIn a closed system, a reversible reaction reaches the identical thermodynamic equilibrium state regardless of whether one starts with pure reactants, pure products, or an arbitrary mixture of both. Statement (A) is correct.\n\nStep 2: Role of a catalyst (Statement B):\nA catalyst accelerates both the forward and reverse reaction rates equally by providing an alternate reaction pathway with lower activation energy. It decreases the time required to attain equilibrium, but does NOT shift the equilibrium position or change the equilibrium constant K. Statement (B) is incorrect.\n\nStep 3: Rate equality (Statement C):\nAt dynamic equilibrium, the forward rate is strictly equal to the reverse rate (r_forward = r_reverse). Statement (C) is incorrect.\n\nStep 4: Boundary conditions (Statement D):\nChemical equilibrium involving gases can only be established in a closed container to prevent loss of material. Statement (D) is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4543, // Q22
    similar_question: {
      question: "For a gaseous reaction where an alteration in the volume of the reaction container has no effect on the equilibrium composition at constant temperature, what is the relation between K_p and K_c?",
      option_a: "K_p = K_c",
      option_b: "K_p > K_c",
      option_c: "K_p < K_c",
      option_d: "K_p × K_c = 1",
      correct_option: "A",
      explanation: "Step 1: Condition for volume change having no effect:\nAccording to Le Chatelier's principle, changing the volume of the reaction vessel changes the total pressure and molar concentrations of all gases.\nThis has no effect on the position of equilibrium if and only if the number of moles of gaseous products equals the number of moles of gaseous reactants:\nΔn_g = n_products(g) − n_reactants(g) = 0.\n\nStep 2: Relation between K_p and K_c:\nThe mathematical relation is:\nK_p = K_c × (R T)^(Δn_g)\nWhen Δn_g = 0:\n(R T)⁰ = 1\nK_p = K_c × 1 = K_c.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4544, // Q23
    similar_question: {
      question: "For which of the following reversible reactions is the equilibrium constant K_p dimensionless (unitless)?",
      option_a: "H₂(g) + I₂(g) ⇌ 2HI(g)",
      option_b: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      option_c: "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)",
      option_d: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
      correct_option: "A",
      explanation: "Step 1: Formula for unit of K_p:\nUnit of K_p = (atm)^(Δn_g)\nwhere Δn_g = (moles of gaseous products) − (moles of gaseous reactants).\nFor K_p to be dimensionless (unitless), Δn_g must be equal to 0:\n(atm)⁰ = dimensionless.\n\nStep 2: Calculate Δn_g for each reaction:\n- Option (A) H₂(g) + I₂(g) ⇌ 2HI(g):\n  Δn_g = 2 − (1 + 1) = 0  →  Unit = (atm)⁰ = unitless.\n- Option (B) N₂(g) + 3H₂(g) ⇌ 2NH₃(g):\n  Δn_g = 2 − (1 + 3) = −2  →  Unit = atm⁻².\n- Option (C) 2SO₂(g) + O₂(g) ⇌ 2SO₃(g):\n  Δn_g = 2 − (2 + 1) = −1  →  Unit = atm⁻¹.\n- Option (D) PCl₅(g) ⇌ PCl₃(g) + Cl₂(g):\n  Δn_g = (1 + 1) − 1 = +1  →  Unit = atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4545, // Q24
    similar_question: {
      question: "When the reaction quotient (Q_c) for a reversible reaction is found to be greater than the equilibrium constant (K_c) at a given temperature (Q_c > K_c), how will the reaction proceed to establish dynamic equilibrium?",
      option_a: "In the reverse direction (from right to left)",
      option_b: "In the forward direction (from left to right)",
      option_c: "The reaction is already at equilibrium and will not shift",
      option_d: "The reaction will stop completely",
      correct_option: "A",
      explanation: "Step 1: Significance of reaction quotient (Q_c) and equilibrium constant (K_c):\nBoth Q_c and K_c have the same mathematical form ([Products] / [Reactants] raised to stoichiometric powers). Q_c represents instantaneous non-equilibrium concentrations, while K_c is the value at dynamic equilibrium.\n\nStep 2: Condition Q_c > K_c:\n- When Q_c > K_c, the instantaneous ratio of products to reactants is larger than that at equilibrium (excess products or deficient reactants).\n- To restore equilibrium and bring Q_c down to K_c, the system must consume products and form reactants.\n- Therefore, the net reaction proceeds in the backward (reverse) direction, from right to left.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM BATCH 4 (Q19 to Q24) ---');
    for (const item of chemEqBatch4Updates) {
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

    console.log('\n--- DUMPING CHEMICAL EQUILIBRIUM BATCH 5 (Q25 to Q30) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_95_details.json'));
    const batch5 = allData.questions.slice(24, 30);
    batch5.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${25 + idx} [ID: ${q.id}]`);
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
