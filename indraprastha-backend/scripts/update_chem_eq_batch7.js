const fs = require('fs');

const chemEqBatch7Updates = [
  {
    id: 4559, // Q38
    similar_question: {
      question: "For the dissociation equilibrium:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nat what absolute temperature (T) will the numerical value of K_p be equal to the numerical value of K_c?\n(Given: R = 0.0821 L atm mol⁻¹ K⁻¹)",
      option_a: "12.18 K",
      option_b: "273.15 K",
      option_c: "1.0 K",
      option_d: "298 K",
      correct_option: "A",
      explanation: "Step 1: Relation between K_p and K_c:\nK_p = K_c × (R T)^(Δn_g)\nFor the reaction: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nΔn_g = (moles of gaseous products) − (moles of gaseous reactants)\n     = (1 + 1) − 1 = +1.\n\nStep 2: Condition for K_p = K_c:\nK_p = K_c × (R T)¹ = K_c\nDividing both sides by K_c:\nR T = 1\nT = 1 / R\n\nStep 3: Calculate numerical value of T:\nT = 1 / (0.0821 L atm mol⁻¹ K⁻¹)\n  ≈ 12.18 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4560, // Q39
    similar_question: {
      question: "For the gaseous reaction:\nA(g) + B(g) ⇌ C(g) + D(g)\nat a certain temperature, equilibrium is achieved when 50% of each reactant is converted into products starting from 1 mole of A and 1 mole of B.\nIf the experiment is repeated starting with 1 mole of A and 2 moles of B in the same container, what percentage of reactant A is converted into products at equilibrium?",
      option_a: "66.67%",
      option_b: "33.33%",
      option_c: "50.00%",
      option_d: "75.00%",
      correct_option: "A",
      explanation: "Step 1: Calculate the equilibrium constant K_c from first experiment:\nInitial moles: A = 1, B = 1.\n50% of each reactant is converted, so 0.5 mol reacts:\nAt equilibrium: [A] = 0.5, [B] = 0.5, [C] = 0.5, [D] = 0.5.\nK_c = ([C] × [D]) / ([A] × [B]) = (0.5 × 0.5) / (0.5 × 0.5) = 1.0.\n\nStep 2: Second experiment with 1 mole A and 2 moles B:\nLet x moles of A react at new equilibrium:\nAt equilibrium: [A] = 1 − x, [B] = 2 − x, [C] = x, [D] = x.\nK_c = (x × x) / [(1 − x)(2 − x)] = 1.0\nx² = (1 − x)(2 − x)\nx² = 2 − 3x + x²\n3x = 2\nx = 2/3 ≈ 0.667 mol.\n\nStep 3: Calculate percentage of A converted:\nPercentage converted = (x / initial moles of A) × 100%\n                     = (0.667 / 1.0) × 100%\n                     = 66.67%.\n\n(Note: The percentage of B converted is 0.667 / 2.0 × 100% = 33.33%).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4561, // Q40
    similar_question: {
      question: "For a gaseous reaction at 298 K having an equilibrium constant K_c = 2.5 × 10⁻¹², the position of equilibrium lies predominantly to the ________, and the concentration of products at equilibrium is relatively ________.",
      option_a: "left, very small",
      option_b: "right, very large",
      option_c: "left, very large",
      option_d: "right, very small",
      correct_option: "A",
      explanation: "Step 1: Significance of the numerical magnitude of K_c:\nK_c = [Products] / [Reactants]\n\nStep 2: Evaluate K_c = 2.5 × 10⁻¹²:\nBecause K_c is extremely small (K_c ≪ 10⁻³):\n- The concentration of products in the numerator is negligible compared to the concentration of reactants in the denominator.\n- The reaction has almost no tendency to proceed in the forward direction.\n- The position of equilibrium lies overwhelmingly to the left (favors reactants).\n- The equilibrium concentration of products is relatively very small.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4562, // Q41
    similar_question: {
      question: "Given the following gaseous equilibrium reactions at temperature T:\nReaction 1: 2A + B ⇌ C      (Equilibrium constant = K₁)\nReaction 2: C + 2D ⇌ 4A    (Equilibrium constant = K₂)\nReaction 3: 2B + 2D ⇌ C    (Equilibrium constant = K₃)\nWhat is the correct mathematical relationship between K₁, K₂, and K₃?",
      option_a: "K₃ = K₁² × K₂",
      option_b: "K₃ = 2 K₁ × K₂",
      option_c: "K₃ = K₁ × K₂²",
      option_d: "K₃ = K₁² / K₂",
      correct_option: "A",
      explanation: "Step 1: Examine the target reaction (Reaction 3):\n2B + 2D ⇌ C   (Equilibrium constant = K₃)\n\nStep 2: Manipulate Reaction 1 and Reaction 2 to obtain Reaction 3:\n- Multiply Reaction 1 by 2:\n  2 × (2A + B ⇌ C)  →  4A + 2B ⇌ 2C\n  When a reaction is multiplied by a factor n, its equilibrium constant is raised to the nth power:\n  K₁' = K₁².\n- Keep Reaction 2 unchanged:\n  C + 2D ⇌ 4A   (Equilibrium constant = K₂).\n\nStep 3: Add the two reactions:\n(4A + 2B) + (C + 2D) ⇌ 2C + 4A\nCanceling 4A and one C on both sides:\n2B + 2D ⇌ C   (Reaction 3)\n\nStep 4: Relate equilibrium constants:\nWhen two chemical equations are added, their equilibrium constants multiply:\nK₃ = K₁' × K₂ = K₁² × K₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4563, // Q42
    similar_question: {
      question: "For the reversible gaseous reaction:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)    (K_c = 0.50 at temperature T)\nConsider the following statements regarding the reaction mixture:\n(I) At a state where [PCl₅] = 0.20 M, [PCl₃] = 0.10 M, and [Cl₂] = 0.20 M, the net reaction proceeds from left to right (forward direction).\n(II) When dynamic equilibrium is attained, the reaction quotient Q_c equals the equilibrium constant K_c.\n(III) If [PCl₃] = 1.0 M, [Cl₂] = 1.0 M, and [PCl₅] = 0.50 M, the reaction proceeds in the forward direction.\nWhich of the statements is/are correct?",
      option_a: "I and II only",
      option_b: "II and III only",
      option_c: "I and III only",
      option_d: "I, II, and III",
      correct_option: "A",
      explanation: "Step 1: Evaluate Statement (I):\nAt [PCl₅] = 0.20 M, [PCl₃] = 0.10 M, [Cl₂] = 0.20 M:\nQ_c = ([PCl₃] × [Cl₂]) / [PCl₅] = (0.10 × 0.20) / 0.20 = 0.10.\nGiven K_c = 0.50.\nSince Q_c (0.10) < K_c (0.50), the system must produce more products to reach equilibrium; hence, the net reaction proceeds from left to right (forward). Statement (I) is correct.\n\nStep 2: Evaluate Statement (II):\nBy definition, at dynamic equilibrium the rates of forward and reverse reactions are equal, and the reaction quotient Q_c strictly equals K_c. Statement (II) is correct.\n\nStep 3: Evaluate Statement (III):\nAt [PCl₅] = 0.50 M, [PCl₃] = 1.0 M, [Cl₂] = 1.0 M:\nQ_c = (1.0 × 1.0) / 0.50 = 2.0.\nSince Q_c (2.0) > K_c (0.50), the reaction proceeds in the reverse (backward) direction, from right to left. Statement (III) is incorrect.\n\nStep 4: Conclusion:\nStatements I and II are correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4564, // Q43
    similar_question: {
      question: "For the thermal dissociation of phosphorus pentachloride:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nlet D be the theoretical vapor density of pure PCl₅ and d be the observed (experimental) vapor density of the equilibrium mixture. Which of the following expressions correctly relates the degree of dissociation (α) to D and d?",
      option_a: "α = (D − d) / d",
      option_b: "α = (d − D) / d",
      option_c: "α = (D − d) / D",
      option_d: "α = d / (D − d)",
      correct_option: "A",
      explanation: "Step 1: Derivation of degree of dissociation from vapor density:\nFor a general dissociation: A(g) ⇌ n B(g)\nInitial moles: 1 mole of A.\nAt equilibrium:\n- Moles of A remaining = 1 − α\n- Moles of B produced = n α\nTotal moles at equilibrium, n_total = (1 − α) + n α = 1 + (n − 1) α.\n\nStep 2: Relate total moles to vapor density:\nSince vapor density is inversely proportional to the number of moles for a fixed mass of gas:\nn_total / n_initial = D / d\n1 + (n − 1) α = D / d\n(n − 1) α = (D / d) − 1 = (D − d) / d\nα = (D − d) / [(n − 1) d].\n\nStep 3: Apply to PCl₅(g) ⇌ PCl₃(g) + Cl₂(g):\nHere, 1 molecule of PCl₅ yields 2 molecules of products (n = 2):\nn − 1 = 2 − 1 = 1.\nTherefore:\nα = (D − d) / d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4565, // Q44
    similar_question: {
      question: "For which of the following gaseous equilibria will the observed (experimental) vapor density of the equilibrium mixture be GREATER than the theoretical vapor density of the initial reactant?",
      option_a: "2NO₂(g) ⇌ N₂O₄(g)",
      option_b: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
      option_c: "N₂O₄(g) ⇌ 2NO₂(g)",
      option_d: "2NH₃(g) ⇌ N₂(g) + 3H₂(g)",
      correct_option: "A",
      explanation: "Step 1: Relation between vapor density and average molar mass:\nVapor density (d) is directly proportional to average molar mass: d = M_average / 2.\nTheoretical vapor density (D) is based on the unreacted reactant: D = M_reactant / 2.\n\nStep 2: Association versus dissociation:\n- In dissociation reactions (such as PCl₅ ⇌ PCl₃ + Cl₂, N₂O₄ ⇌ 2NO₂, and 2NH₃ ⇌ N₂ + 3H₂):\n  The number of particles increases, so the average molar mass decreases (M_average < M_reactant). Consequently, observed vapor density is less than theoretical (d < D).\n- In association (dimerization) reactions (such as 2NO₂(g) ⇌ N₂O₄(g)):\n  Molecules combine to form larger species, reducing total moles. This increases the average molar mass (M_average > M_NO₂). Consequently, observed vapor density is greater than theoretical (d > D).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4566, // Q45
    similar_question: {
      question: "The equilibrium constant for the formation of a coordination complex in aqueous solution:\nM²⁺(aq) + L(aq) ⇌ [ML]²⁺(aq)\nis K_c = 2.0 L mol⁻¹. If the initial concentration of metal ion M²⁺ is 0.20 M, what equilibrium concentration of free ligand L is required to convert 80% of M²⁺ into the complex [ML]²⁺?",
      option_a: "2.0 M",
      option_b: "0.50 M",
      option_c: "1.0 M",
      option_d: "4.0 M",
      correct_option: "A",
      explanation: "Step 1: Write the equilibrium constant expression:\nM²⁺(aq) + L(aq) ⇌ [ML]²⁺(aq)\nK_c = [[ML]²⁺] / ([M²⁺] × [L])\nGiven K_c = 2.0 L mol⁻¹.\n\nStep 2: Determine concentrations of metal ion and complex:\nInitial [M²⁺] = 0.20 M.\nFraction of M²⁺ converted to complex = 80% = 0.80.\n- Concentration of complex formed:\n  [[ML]²⁺] = 0.80 × 0.20 M = 0.16 M.\n- Concentration of unreacted M²⁺ at equilibrium:\n  [M²⁺] = 0.20 M − 0.16 M = 0.04 M.\n\nStep 3: Calculate required equilibrium concentration of free ligand [L]:\nK_c = 0.16 / (0.04 × [L]) = 2.0\n4.0 / [L] = 2.0\n[L] = 4.0 / 2.0 = 2.0 M.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM FINAL BATCH 7 (Q38 to Q45) ---');
    for (const item of chemEqBatch7Updates) {
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
    console.log('\n--- ALL 45 QUESTIONS OF TEST 95 (CHEMICAL EQUILIBRIUM) UPDATED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('Error:', err);
  }
}

if (process.argv[2] === '--commit') {
  main();
} else {
  console.log('Script ready for execution with --commit');
}
