const fs = require('fs');

const chemEqBatch5Updates = [
  {
    id: 4546, // Q25
    similar_question: {
      question: "The dissolution of a gas in a liquid solvent is generally an exothermic process:\nGas(g) + Solvent(l) ⇌ Dissolved Gas(aq) + Heat\nAccording to Le Chatelier's principle and Henry's law, how does increasing the temperature affect the solubility of the gas in the liquid?",
      option_a: "The solubility of the gas decreases",
      option_b: "The solubility of the gas increases",
      option_c: "The solubility of the gas remains unchanged",
      option_d: "The gas reacts irreversibly with the solvent",
      correct_option: "A",
      explanation: "Step 1: Thermodynamic nature of gas dissolution:\nWhen gas molecules dissolve in a liquid, they lose kinetic energy and entropy decreases (ΔS < 0). Attractive intermolecular interactions form, making the dissolution exothermic:\nGas(g) + Solvent(l) ⇌ Solution(aq)   (ΔH_solution < 0)\n\nStep 2: Effect of temperature (Le Chatelier's principle):\nSupplying heat (raising temperature) favors the endothermic reverse process.\nConsequently, dissolved gas molecules acquire kinetic energy and escape from the liquid phase back into the gas phase, decreasing the solubility of the gas.\n\nStep 3: Henry's law perspective:\nAccording to Henry's law: p = K_H × x (where x is solubility).\nHenry's law constant (K_H) increases with rising temperature, which dictates that mole fraction solubility (x) must decrease at any given gas pressure.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4547, // Q26
    similar_question: {
      question: "Liquid water is in dynamic equilibrium with its vapor in a closed vessel at 50 °C:\nH₂O(l) ⇌ H₂O(g)\nIf the saturated vapor pressure of water at this temperature is 92.5 mm of Hg, what is the equilibrium constant K_p for this phase transformation in units of mm of Hg?",
      option_a: "92.5 mm of Hg",
      option_b: "185.0 mm of Hg",
      option_c: "46.25 mm of Hg",
      option_d: "1.0 mm of Hg",
      correct_option: "A",
      explanation: "Step 1: Write the equilibrium constant expression:\nFor the heterogeneous phase equilibrium:\nH₂O(l) ⇌ H₂O(g)\nThe thermodynamic activity of pure liquid water is defined as unity:\nactivity of H₂O(l) = 1.\n\nStep 2: Relate K_p to partial pressure:\nK_p = p_H₂O(g) / [activity of H₂O(l)] = p_H₂O(g).\n\nStep 3: Relate to vapor pressure:\nAt dynamic equilibrium inside a closed vessel, the partial pressure exerted by the gas equals the saturated vapor pressure (aqueous tension) of water at that specific temperature.\nGiven: saturated vapor pressure = 92.5 mm of Hg.\nTherefore:\nK_p = p_H₂O(g) = 92.5 mm of Hg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4548, // Q27
    similar_question: {
      question: "At 500 K, the equilibrium constant K_p for the gaseous reaction:\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g)\nis 4.0 × 10⁴ atm⁻¹. If the total pressure of the equilibrium mixture is increased threefold by reducing the volume at constant temperature, what will be the value of K_p?",
      option_a: "4.0 × 10⁴ atm⁻¹",
      option_b: "1.2 × 10⁵ atm⁻¹",
      option_c: "1.33 × 10⁴ atm⁻¹",
      option_d: "3.6 × 10⁵ atm⁻¹",
      correct_option: "A",
      explanation: "Step 1: Thermodynamic basis of equilibrium constant:\nFor a given balanced chemical equation, the equilibrium constant K_p is defined by the standard Gibbs free energy change:\nΔG° = −R T ln K_p\nThis means K_p depends strictly on temperature (T) and is completely independent of pressure, volume, or concentrations.\n\nStep 2: Effect of pressure change:\nIncreasing the total pressure causes the equilibrium to shift forward (toward fewer moles of gas) by Le Chatelier's principle until the partial pressures readjust such that their ratio equals the original K_p.\nBecause the temperature remains constant at 500 K, the numerical value of K_p does not change.\n\nTherefore, K_p remains 4.0 × 10⁴ atm⁻¹. Option (A) is the correct answer."
    }
  },
  {
    id: 4549, // Q28
    similar_question: {
      question: "In the gaseous dissociation reaction:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\ninitially 4.0 moles of PCl₅ are placed in a closed reaction vessel. At equilibrium, 1.2 moles of Cl₂ are found to be present. What is the degree of dissociation (α) of PCl₅?",
      option_a: "0.30",
      option_b: "0.24",
      option_c: "0.48",
      option_d: "0.60",
      correct_option: "A",
      explanation: "Step 1: Stoichiometry of the dissociation:\nPCl₅(g) ⇌ PCl₃(g) + Cl₂(g)\nInitial moles:\n- PCl₅ = 4.0 mol\n- PCl₃ = 0 mol\n- Cl₂ = 0 mol\n\nStep 2: Determine moles dissociated at equilibrium:\nFrom the balanced equation, each mole of PCl₅ that dissociates yields 1 mole of PCl₃ and 1 mole of Cl₂.\nLet x be the moles of PCl₅ dissociated.\nMoles of Cl₂ formed at equilibrium = x = 1.2 mol.\n\nStep 3: Calculate the degree of dissociation (α):\nDegree of dissociation (α) is defined as the fraction of initial substance that has dissociated:\nα = (moles of PCl₅ dissociated) / (initial moles of PCl₅ taken)\n  = 1.2 mol / 4.0 mol\n  = 0.30 (or 30%).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4550, // Q29
    similar_question: {
      question: "Consider the hypothetical equilibrium:\nReactant(g) ⇌ Product(g)\nFor which of the following values of the equilibrium constant K_c at 298 K is the Reactant thermodynamically the most stable?",
      option_a: "K_c = 1.0 × 10⁻¹⁶",
      option_b: "K_c = 4.5 × 10⁻⁴",
      option_c: "K_c = 1.0",
      option_d: "K_c = 2.0 × 10¹²",
      correct_option: "A",
      explanation: "Step 1: Relationship between K_c and thermodynamic stability:\nFor the equilibrium Reactant ⇌ Product:\nK_c = [Product] / [Reactant]\nThe standard Gibbs free energy difference is ΔG° = −R T ln K_c.\n\nStep 2: Significance of a very small K_c:\n- An extremely small value of K_c (K_c ≪ 1) signifies that [Product] ≪ [Reactant] at equilibrium, meaning the reaction has virtually no tendency to proceed forward.\n- ΔG° is large and positive (G°_product ≫ G°_reactant), meaning the reactant occupies a much deeper energy well.\n- The smaller the numerical value of K_c, the greater the thermodynamic stability of the Reactant.\n\nStep 3: Compare given values:\n1.0 × 10⁻¹⁶ is the smallest value among all options.\nTherefore, the reactant is most stable when K_c = 1.0 × 10⁻¹⁶.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4551, // Q30
    similar_question: {
      question: "For the gaseous reaction:\nN₂O₄(g) ⇌ 2NO₂(g)\nthe equilibrium constant K_c is 0.20 at a certain temperature. At a particular instant, the reaction mixture in a vessel contains [N₂O₄] = 0.50 M and [NO₂] = 0.40 M. In which direction will the reaction proceed to achieve equilibrium?",
      option_a: "In the backward direction (from right to left)",
      option_b: "In the forward direction (from left to right)",
      option_c: "The system is already at equilibrium",
      option_d: "The reaction stops completely",
      correct_option: "A",
      explanation: "Step 1: Write the reaction quotient expression (Q_c):\nFor the equilibrium:\nN₂O₄(g) ⇌ 2NO₂(g)\nQ_c = [NO₂]² / [N₂O₄]\n\nStep 2: Substitute instantaneous concentrations:\nGiven: [N₂O₄] = 0.50 M, [NO₂] = 0.40 M\nQ_c = (0.40)² / 0.50\n    = 0.16 / 0.50\n    = 0.32.\n\nStep 3: Compare Q_c with K_c:\nGiven K_c = 0.20.\nHere, Q_c (0.32) > K_c (0.20).\nSince the reaction quotient is greater than the equilibrium constant, there is an excess of product NO₂ relative to reactant N₂O₄.\nTo reduce Q_c to K_c, the system must consume NO₂ and generate N₂O₄, shifting in the backward (reverse) direction, from right to left.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING CHEMICAL EQUILIBRIUM BATCH 5 (Q25 to Q30) ---');
    for (const item of chemEqBatch5Updates) {
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

    console.log('\n--- DUMPING CHEMICAL EQUILIBRIUM BATCH 6 (Q31 to Q37) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_95_details.json'));
    const batch6 = allData.questions.slice(30, 37);
    batch6.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${31 + idx} [ID: ${q.id}]`);
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
