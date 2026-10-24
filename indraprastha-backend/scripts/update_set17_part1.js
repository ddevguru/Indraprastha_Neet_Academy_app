const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3881,
    similarQuestion: {
      question: "Which of the following gas samples contains the greatest number of molecules?",
      option_a: "16 g CH₄",
      option_b: "64 g O₂",
      option_c: "12 g H₂",
      option_d: "44 g CO₂",
      correct_option: "C",
      explanation: "Number of molecules = moles × N_A. Moles of 16 g CH₄ = 16 / 16 = 1.0 mol. Moles of 64 g O₂ = 64 / 32 = 2.0 mol. Moles of 12 g H₂ = 12 / 2 = 6.0 mol. Moles of 44 g CO₂ = 44 / 44 = 1.0 mol. Since 12 g of H₂ corresponds to 6.0 moles (6 N_A molecules), it has the greatest number of molecules. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3882,
    similarQuestion: {
      question: "Which of the following samples contains the maximum number of molecules?",
      option_a: "10 g H₂",
      option_b: "28 g N₂",
      option_c: "32 g O₂",
      option_d: "44 g CO₂",
      correct_option: "A",
      explanation: "Moles of 10 g H₂ = 10 / 2 = 5.0 mol. Moles of 28 g N₂ = 28 / 28 = 1.0 mol. Moles of 32 g O₂ = 32 / 32 = 1.0 mol. Moles of 44 g CO₂ = 44 / 44 = 1.0 mol. 10 g H₂ contains 5.0 moles, which is the highest number of molecules (5 N_A). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3883,
    similarQuestion: {
      question: "What is the approximate number of molecules present in 8.5 g of ammonia gas (NH₃)? (Molar mass of NH₃ = 17 g/mol, N_A = 6.022 × 10²³ mol⁻¹)",
      option_a: "1.5 × 10²³",
      option_b: "3.01 × 10²³",
      option_c: "6.02 × 10²³",
      option_d: "1.20 × 10²⁴",
      correct_option: "B",
      explanation: "Number of moles n = Mass / Molar mass = 8.5 g / 17 g/mol = 0.50 mol. Number of molecules = n × N_A = 0.50 × 6.022 × 10²³ = 3.011 × 10²³ molecules ≈ 3.01 × 10²³. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3884,
    similarQuestion: {
      question: "Among the following options, the maximum number of molecules is present in:",
      option_a: "22.4 L of CO₂ gas at STP",
      option_b: "11.2 L of O₂ gas at STP",
      option_c: "4.0 g of H₂ gas",
      option_d: "18 g of liquid H₂O",
      correct_option: "C",
      explanation: "22.4 L of CO₂ at STP = 22.4 / 22.4 = 1.0 mol. 11.2 L of O₂ at STP = 11.2 / 22.4 = 0.50 mol. 4.0 g of H₂ gas = 4.0 / 2.0 = 2.0 mol. 18 g of liquid H₂O = 18 / 18 = 1.0 mol. The 4.0 g H₂ sample has 2.0 moles, representing the greatest number of molecules (2 N_A). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3885,
    similarQuestion: {
      question: "A naturally occurring element M consists of three isotopes: ⁵⁴M (5.0%), ⁵⁶M (90.0%), and ⁵⁷M (5.0%). The relative average atomic mass of element M is:",
      option_a: "55.0 u",
      option_b: "55.95 u",
      option_c: "56.5 u",
      option_d: "56.95 u",
      correct_option: "B",
      explanation: "Average atomic mass = Σ (Isotopic mass × Percentage abundance) / 100 = (54 × 5.0 + 56 × 90.0 + 57 × 5.0) / 100 = (270 + 5040 + 285) / 100 = 5595 / 100 = 55.95 u. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3886,
    similarQuestion: {
      question: "A metal M forms an oxide M₂O₃ containing 30.0% oxygen by mass. If another oxide of the same metal contains 27.6% oxygen by mass, its formula is:",
      option_a: "MO",
      option_b: "MO₂",
      option_c: "M₃O₄",
      option_d: "M₂O",
      correct_option: "C",
      explanation: "In M₂O₃: % O = (3 × 16) / (2 M + 48) × 100 = 30 ⇒ 48 / (2 M + 48) = 0.30 ⇒ 48 = 0.6 M + 14.4 ⇒ 0.6 M = 33.6 ⇒ M = 56 (Iron, Fe). In the second oxide: % O = 27.6% and % M = 72.4%. Moles of M = 72.4 / 56 = 1.293; Moles of O = 27.6 / 16 = 1.725. Ratio M : O = 1.293 / 1.293 : 1.725 / 1.293 = 1 : 1.334 = 3 : 4. Thus the formula is M₃O₄. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3887,
    similarQuestion: {
      question: "A biomolecule contains 0.25% iron by mass. If the molar mass of the compound is 89,600 g/mol, the number of iron atoms present per molecule of the substance is: (Atomic mass of Fe = 56 g/mol)",
      option_a: "2",
      option_b: "4",
      option_c: "6",
      option_d: "8",
      correct_option: "B",
      explanation: "Mass of iron in 1 mole of the biomolecule = 0.25% of 89,600 g = (0.25 / 100) × 89,600 = 224 g. Number of iron atoms per molecule = (Total mass of Fe) / (Atomic mass of Fe) = 224 / 56 = 4 atoms. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3888,
    similarQuestion: {
      question: "If 6.0 g of hydrogen gas reacts with 32.0 g of oxygen gas to form water (2 H₂ + O₂ → 2 H₂O), what is the maximum mass of water produced?",
      option_a: "18.0 g",
      option_b: "36.0 g",
      option_c: "38.0 g",
      option_d: "40.0 g",
      correct_option: "B",
      explanation: "Moles of H₂ = 6.0 g / 2.0 g/mol = 3.0 mol. Moles of O₂ = 32.0 g / 32.0 g/mol = 1.0 mol. According to the balanced equation: 2 H₂ + O₂ → 2 H₂O. 1.0 mol of O₂ requires 2.0 mol of H₂ and produces 2.0 mol of H₂O. Since 3.0 mol of H₂ is available, O₂ is the limiting reagent. Moles of H₂O formed = 2.0 mol. Mass of H₂O = 2.0 mol × 18.0 g/mol = 36.0 g. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3889,
    similarQuestion: {
      question: "Two elements X and Y combine to form compounds XY₂ and X₃Y₂. If 0.1 mole of XY₂ weighs 10 g and 0.05 mole of X₃Y₂ weighs 9 g, the atomic masses of X and Y are respectively:",
      option_a: "40 and 30",
      option_b: "30 and 40",
      option_c: "20 and 40",
      option_d: "35 and 25",
      correct_option: "A",
      explanation: "Molar mass of XY₂ = 10 g / 0.1 mol = 100 g/mol ⇒ M_X + 2 M_Y = 100. Molar mass of X₃Y₂ = 9 g / 0.05 mol = 180 g/mol ⇒ 3 M_X + 2 M_Y = 180. Subtracting the first equation from the second gives: 2 M_X = 80 ⇒ M_X = 40 g/mol. Substituting into the first equation: 40 + 2 M_Y = 100 ⇒ 2 M_Y = 60 ⇒ M_Y = 30 g/mol. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3890,
    similarQuestion: {
      question: "What is the number of moles of oxygen gas present in 2.0 L of dry air containing 21% oxygen by volume at STP?",
      option_a: "0.0188 mol",
      option_b: "0.0210 mol",
      option_c: "0.0420 mol",
      option_d: "0.0893 mol",
      correct_option: "A",
      explanation: "Volume of O₂ at STP = 21% of 2.0 L = 0.21 × 2.0 L = 0.42 L. Since 1 mole of any ideal gas occupies 22.4 L at STP: Moles of O₂ = V / 22.4 = 0.42 / 22.4 = 0.01875 mol ≈ 0.0188 mol. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3891,
    similarQuestion: {
      question: "If 2.0 moles of potassium chlorate (KClO₃) are completely decomposed to yield oxygen gas (2 KClO₃ → 2 KCl + 3 O₂), and the evolved oxygen is completely reacted with excess aluminum according to 4 Al + 3 O₂ → 2 Al₂O₃, how many moles of aluminum oxide (Al₂O₃) are produced?",
      option_a: "1.0 mol",
      option_b: "2.0 mol",
      option_c: "3.0 mol",
      option_d: "4.0 mol",
      correct_option: "B",
      explanation: "From the decomposition: 2 mol KClO₃ yields 3.0 mol O₂. From the formation reaction: 3.0 mol O₂ reacts with excess Al to produce 2.0 mol Al₂O₃. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3892,
    similarQuestion: {
      question: "A 500 mL sample of CO₂ gas is passed over red-hot carbon in a tube. The reaction occurring is CO₂(g) + C(s) → 2 CO(g). If the total volume of the resulting gas mixture at the same temperature and pressure is 700 mL, what are the volumes of CO₂ and CO in the final mixture?",
      option_a: "200 mL CO₂ and 500 mL CO",
      option_b: "300 mL CO₂ and 400 mL CO",
      option_c: "100 mL CO₂ and 600 mL CO",
      option_d: "250 mL CO₂ and 450 mL CO",
      correct_option: "B",
      explanation: "Let x mL of CO₂ react. Remaining CO₂ = 500 - x. Formed CO = 2x. Total volume = (500 - x) + 2x = 500 + x = 700 mL ⇒ x = 200 mL. Therefore, volume of CO₂ left = 500 - 200 = 300 mL, and volume of CO produced = 2 × 200 = 400 mL. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3893,
    similarQuestion: {
      question: "In a 2.0 molal (m) aqueous solution of glucose, what is the mole fraction of the solvent (water)?",
      option_a: "0.035",
      option_b: "0.965",
      option_c: "0.900",
      option_d: "0.850",
      correct_option: "B",
      explanation: "A 2.0 molal solution contains 2.0 moles of solute in 1000 g of water. Moles of water = 1000 g / 18 g/mol = 55.56 mol. Total moles = 2.0 + 55.56 = 57.56 mol. Mole fraction of water X_water = 55.56 / 57.56 ≈ 0.965. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3894,
    similarQuestion: {
      question: "Concentrated nitric acid (HNO₃) is 70% by mass and has a density of 1.42 g/mL. What volume of this concentrated acid is required to prepare 500 mL of 0.20 M HNO₃ solution? (Molar mass of HNO₃ = 63 g/mol)",
      option_a: "4.5 mL",
      option_b: "6.3 mL",
      option_c: "9.0 mL",
      option_d: "12.6 mL",
      correct_option: "B",
      explanation: "1. Molarity of concentrated acid: M₁ = (% × d × 10) / Molar mass = (70 × 1.42 × 10) / 63 = 994 / 63 ≈ 15.78 M. 2. Using dilution formula M₁ V₁ = M₂ V₂: 15.78 × V₁ = 0.20 × 500 mL = 100 ⇒ V₁ = 100 / 15.78 ≈ 6.34 mL ≈ 6.3 mL. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3895,
    similarQuestion: {
      question: "If 3.01 × 10²¹ molecules of urea are dissolved in water to make 250 mL of solution, the molarity of the solution is: (N_A = 6.02 × 10²³ mol⁻¹)",
      option_a: "0.01 M",
      option_b: "0.02 M",
      option_c: "0.05 M",
      option_d: "0.20 M",
      correct_option: "B",
      explanation: "Moles of urea = (3.01 × 10²¹) / (6.02 × 10²³) = 0.005 mol. Volume of solution = 250 mL = 0.250 L. Molarity M = Moles / Volume (L) = 0.005 mol / 0.250 L = 0.020 M. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3896,
    similarQuestion: {
      question: "An organic biomolecule contains 3.2% sulfur by mass. What is the minimum molecular weight of the compound? (Atomic mass of S = 32 g/mol)",
      option_a: "500 g/mol",
      option_b: "1,000 g/mol",
      option_c: "2,000 g/mol",
      option_d: "3,200 g/mol",
      correct_option: "B",
      explanation: "For minimum molecular weight, each molecule must contain at least one sulfur atom (mass = 32 u). % S = (32 / M_min) × 100 = 3.2% ⇒ M_min = (32 × 100) / 3.2 = 1,000 g/mol. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3897,
    similarQuestion: {
      question: "When 2.76 g of silver carbonate (Ag₂CO₃) is heated strongly, it completely decomposes to leave metallic silver as the residue according to: Ag₂CO₃(s) → 2 Ag(s) + CO₂(g) + (1/2) O₂(g). The mass of the silver residue obtained is: (Molar mass of Ag₂CO₃ = 276 g/mol, Ag = 108 g/mol)",
      option_a: "1.08 g",
      option_b: "2.16 g",
      option_c: "2.32 g",
      option_d: "0.54 g",
      correct_option: "B",
      explanation: "Moles of Ag₂CO₃ = 2.76 g / 276 g/mol = 0.010 mol. According to the reaction stoichiometry, 1 mole of Ag₂CO₃ yields 2 moles of Ag residue. Moles of Ag formed = 2 × 0.010 mol = 0.020 mol. Mass of Ag residue = 0.020 mol × 108 g/mol = 2.16 g. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3898,
    similarQuestion: {
      question: "In the reaction 4 NH₃(g) + 5 O₂(g) → 4 NO(g) + 6 H₂O(g), if 2.0 moles of NH₃ and 2.0 moles of O₂ are mixed and allowed to react completely, which of the following statements is strictly correct?",
      option_a: "NH₃ is the limiting reagent",
      option_b: "All 2.0 moles of O₂ are consumed",
      option_c: "2.0 moles of NO are produced",
      option_d: "3.0 moles of H₂O are produced",
      correct_option: "B",
      explanation: "Stoichiometric ratio: 1 mole of NH₃ requires 5/4 = 1.25 moles of O₂. For 2.0 moles of NH₃, 2.5 moles of O₂ are required. Since only 2.0 moles of O₂ are available, O₂ is the limiting reagent and will be completely consumed (2.0 moles of O₂ consumed). The amount of NO produced is (4/5) × 2.0 = 1.6 moles, and H₂O is (6/5) × 2.0 = 2.4 moles. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3899,
    similarQuestion: {
      question: "An element X (atomic mass = 32 g/mol) forms an oxide containing 50% oxygen by mass. The empirical formula of the oxide is:",
      option_a: "XO",
      option_b: "XO₂",
      option_c: "XO₃",
      option_d: "X₂O₃",
      correct_option: "B",
      explanation: "% of X = 50% and % of O = 50%. Moles of X = 50 / 32 = 1.5625. Moles of O = 50 / 16 = 3.125. Mole ratio X : O = 1.5625 / 1.5625 : 3.125 / 1.5625 = 1 : 2. Therefore, the empirical formula is XO₂. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3900,
    similarQuestion: {
      question: "An organic compound contains 40.0% carbon, 6.7% hydrogen, and 53.3% oxygen by mass. What is its empirical formula? (Atomic masses: C = 12, H = 1, O = 16)",
      option_a: "CH₂O",
      option_b: "C₂H₄O₂",
      option_c: "C₃H₆O",
      option_d: "CH₄O",
      correct_option: "A",
      explanation: "Relative number of moles: Moles of C = 40.0 / 12 = 3.33. Moles of H = 6.7 / 1 = 6.70. Moles of O = 53.3 / 16 = 3.33. Dividing by smallest value (3.33): C = 3.33 / 3.33 = 1, H = 6.70 / 3.33 = 2, O = 3.33 / 3.33 = 1. Thus, the simplest whole number ratio is C : H : O = 1 : 2 : 1, giving the empirical formula CH₂O. Therefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Logged in successfully, token received.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/practice-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}: ${err}`);
    }
  }
  console.log(`Set 17 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
