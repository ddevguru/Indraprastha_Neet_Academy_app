const fs = require('fs');

const chemEqBatch6Updates = [
  {
    id: 4552, // Q31
    similar_question: {
      question: "According to the magnitude of the equilibrium constant (K_c), what can be concluded about a reversible reaction if its equilibrium constant at 298 K is K_c = 1.0 × 10⁻⁴ (i.e., K_c < 10⁻³)?",
      option_a: "Reactants predominate over products, and the reaction proceeds to a very small extent",
      option_b: "Products predominate over reactants, and the reaction proceeds nearly to completion",
      option_c: "Appreciable concentrations of both reactants and products are present at equilibrium",
      option_d: "The rate of the forward reaction is infinitely greater than the reverse reaction",
      correct_option: "A",
      explanation: "Step 1: Standard classification of reaction extent based on K_c:\n1. If K_c > 10³: Products predominate heavily over reactants; the forward reaction proceeds nearly to completion.\n2. If K_c < 10⁻³: Reactants predominate heavily over products; the forward reaction occurs only to a very slight extent (barely proceeds).\n3. If 10⁻³ ≤ K_c ≤ 10³: Appreciable and comparable concentrations of both reactants and products coexist at equilibrium.\n\nStep 2: Evaluate K_c = 1.0 × 10⁻⁴:\nSince 1.0 × 10⁻⁴ < 10⁻³, the numerator ([Products]) is tiny compared to the denominator ([Reactants]). The equilibrium mixture consists almost entirely of unreacted starting materials.\n\nTherefore, reactants predominate and the extent of the reaction is very low. Option (A) is the correct answer."
    }
  },
  {
    id: 4553, // Q32
    similar_question: {
      question: "For the formation of water vapor from its elements at 500 K:\n2H₂(g) + O₂(g) ⇌ 2H₂O(g)    (K_c = 2.4 × 10⁴⁷)\nBased on the magnitude of the equilibrium constant, which of the following is the most appropriate conclusion?",
      option_a: "The reaction proceeds nearly to completion, with products predominating heavily",
      option_b: "The reaction proceeds to a negligible extent, with reactants remaining mostly unreacted",
      option_c: "Appreciable and comparable amounts of both reactants and products exist at equilibrium",
      option_d: "The reaction has not yet attained dynamic equilibrium",
      correct_option: "A",
      explanation: "Step 1: Thermodynamic interpretation of huge K_c values:\nThe equilibrium constant is expressed as:\nK_c = [H₂O]² / ([H₂]² × [O₂]) = 2.4 × 10⁴⁷.\n\nStep 2: Comparison with established benchmarks:\nWhen K_c ≫ 10³ (here, 2.4 × 10⁴⁷), the concentration of products in the numerator is astronomically higher than the concentration of unreacted reactants in the denominator.\nThis indicates that virtually all reactants have been converted into products before dynamic equilibrium is reached.\n\nStep 3: Conclusion:\nThe reaction proceeds essentially to completion, and products predominate heavily.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4554, // Q33
    similar_question: {
      question: "Which of the following important chemical predictions can be made using the equilibrium constant (K_c or K_p) of a reversible reaction?\n(A) Predicting the extent of a reaction based on the numerical magnitude of K\n(B) Predicting the direction in which a net reaction will proceed by comparing Q with K\n(C) Calculating equilibrium concentrations of reactants and products from initial amounts\n(D) All of the above",
      option_a: "All of the above",
      option_b: "Predicting the extent of a reaction based on the numerical magnitude of K",
      option_c: "Predicting the direction in which a net reaction will proceed by comparing Q with K",
      option_d: "Calculating equilibrium concentrations of reactants and products from initial amounts",
      correct_option: "A",
      explanation: "Step 1: Applications of the equilibrium constant:\n1. Extent of reaction: The magnitude of K indicates how far the reaction proceeds before reaching equilibrium (large K means high product yield; small K means very little product).\n2. Direction of reaction: Comparing the instantaneous reaction quotient Q with K predicts the spontaneous direction: forward if Q < K, backward if Q > K, and at equilibrium if Q = K.\n3. Equilibrium concentrations: Combining K with stoichiometry and initial concentrations enables exact calculation of equilibrium concentrations and degrees of dissociation.\n\nStep 2: Conclusion:\nAll three listed capabilities are fundamental applications of the equilibrium constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4555, // Q34
    similar_question: {
      question: "Liquid X has a significantly higher vapor pressure than Liquid Y at the same temperature (25 °C). Which of the following statements comparing Liquid X and Liquid Y is correct?",
      option_a: "Liquid X is more volatile and has a lower normal boiling point than Liquid Y",
      option_b: "Liquid X is less volatile and has a higher normal boiling point than Liquid Y",
      option_c: "Intermolecular attractive forces are stronger in Liquid X than in Liquid Y",
      option_d: "Liquid X and Liquid Y must have the exact same normal boiling point",
      correct_option: "A",
      explanation: "Step 1: Volatility and intermolecular forces:\nA liquid with a higher vapor pressure (Liquid X) has weaker intermolecular attractive forces holding its molecules in the liquid state. Consequently, its molecules escape into the vapor phase more easily, making it more volatile.\n\nStep 2: Normal boiling point:\nThe normal boiling point is the temperature at which a liquid's vapor pressure equals standard atmospheric pressure (1 atm or 760 mm Hg).\nBecause Liquid X already has a higher vapor pressure at room temperature, it requires less heating to reach 1 atm than Liquid Y.\nTherefore, Liquid X boils at a lower temperature (lower boiling point) than Liquid Y.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4556, // Q35
    similar_question: {
      question: "At high altitudes, such as on the top of Mount Everest, water boils at a temperature significantly lower than 100 °C. What is the fundamental physical reason for this observation?",
      option_a: "The external atmospheric pressure is lower than 1 atm at high altitudes",
      option_b: "The acceleration due to gravity is lower at high altitudes",
      option_c: "The density of liquid water increases at high altitudes",
      option_d: "The chemical bonds within water molecules become weaker at high altitudes",
      correct_option: "A",
      explanation: "Step 1: Condition for boiling:\nA liquid boils when its saturated vapor pressure equals the external atmospheric pressure exerted on its surface.\n\nStep 2: Effect of altitude on atmospheric pressure:\nAs altitude increases, the column of air above decreases, resulting in lower atmospheric pressure (at the summit of Mount Everest, atmospheric pressure is only about 0.33 atm).\n\nStep 3: Effect on boiling point:\nBecause the opposing atmospheric pressure is much lower, water's vapor pressure reaches the external pressure at a much lower temperature (around 70 °C instead of the standard 100 °C).\nTherefore, the boiling point of a liquid depends directly on external atmospheric pressure.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4557, // Q36
    similar_question: {
      question: "A change in temperature of a reversible chemical system in a closed container affects which of the following parameters?\n(A) The numerical value of the equilibrium constant (K)\n(B) The rates and rate constants of both the forward and reverse reactions\n(C) The equilibrium concentrations of reactants and products\n(D) All of the above",
      option_a: "All of the above",
      option_b: "The numerical value of the equilibrium constant (K)",
      option_c: "The rates and rate constants of both the forward and reverse reactions",
      option_d: "The equilibrium concentrations of reactants and products",
      correct_option: "A",
      explanation: "Step 1: Effect on rate constants (Arrhenius equation):\nk = A × e^(−E_a / R T)\nIncreasing temperature provides more kinetic energy, increasing the rate constants and rates of both forward and reverse reactions.\n\nStep 2: Effect on equilibrium constant (van 't Hoff equation):\nln(K₂ / K₁) = (ΔH° / R) × (1/T₁ − 1/T₂)\nTemperature is the only factor that alters the equilibrium constant K of a reaction.\n\nStep 3: Effect on equilibrium composition (Le Chatelier's principle):\nBecause the value of K changes with temperature, the concentrations of reactants and products must shift to satisfy the new equilibrium constant.\n\nStep 4: Conclusion:\nTemperature alters reaction rates, the equilibrium constant, and the equilibrium composition.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4558, // Q37
    similar_question: {
      question: "Camphor solid sublimes according to the phase equilibrium:\nCamphor(s) ⇌ Camphor(g)\nAt 27 °C (300 K), the sublimation vapor pressure of camphor in a sealed container is 0.38 mm of Hg. What are the values of K_p (in atm) and K_c (in mol L⁻¹) for this equilibrium?\n(Given: 1 atm = 760 mm of Hg, R = 0.0821 L atm mol⁻¹ K⁻¹)",
      option_a: "K_p = 5.0 × 10⁻⁴ atm and K_c = 2.03 × 10⁻⁵ mol L⁻¹",
      option_b: "K_p = 0.38 atm and K_c = 1.54 × 10⁻² mol L⁻¹",
      option_c: "K_p = 2.03 × 10⁻⁵ atm and K_c = 5.0 × 10⁻⁴ mol L⁻¹",
      option_d: "K_p = 5.0 × 10⁻⁴ atm and K_c = 5.0 × 10⁻⁴ mol L⁻¹",
      correct_option: "A",
      explanation: "Step 1: Write the expression for K_p:\nFor the sublimation equilibrium:\nCamphor(s) ⇌ Camphor(g)\nBecause the activity of pure solid camphor is unity (activity = 1):\nK_p = p_camphor(g)\n\nStep 2: Convert vapor pressure to atmospheres:\np_camphor(g) = 0.38 mm Hg / 760 mm Hg atm⁻¹\n              = 5.0 × 10⁻⁴ atm.\nTherefore, K_p = 5.0 × 10⁻⁴ atm.\n\nStep 3: Relate K_p to K_c:\nK_p = K_c × (R T)^(Δn_g)\nFor Camphor(s) ⇌ Camphor(g), Δn_g = 1 − 0 = 1.\nK_c = K_p / (R T)\nGiven: T = 300 K, R = 0.0821 L atm mol⁻¹ K⁻¹\nR T = 0.0821 × 300 = 24.63 L atm mol⁻¹\nK_c = (5.0 × 10⁻⁴ atm) / (24.63 L atm mol⁻¹)\n    ≈ 2.03 × 10⁻⁵ mol L⁻¹.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM BATCH 6 (Q31 to Q37) ---');
    for (const item of chemEqBatch6Updates) {
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

    console.log('\n--- DUMPING CHEMICAL EQUILIBRIUM FINAL BATCH 7 (Q38 to Q45) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_95_details.json'));
    const batch7 = allData.questions.slice(37, 45);
    batch7.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${38 + idx} [ID: ${q.id}]`);
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
