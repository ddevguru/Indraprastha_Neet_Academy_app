const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3901,
    similarQuestion: {
      question: "If 15.0 g of ethane (C₂H₆) is completely combusted in excess oxygen gas according to the equation 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O, how many moles of water (H₂O) are produced? (Molar mass of C₂H₆ = 30.0 g/mol)",
      option_a: "0.50 mol",
      option_b: "1.00 mol",
      option_c: "1.50 mol",
      option_d: "3.00 mol",
      correct_option: "C",
      explanation: "Moles of C₂H₆ = 15.0 g / 30.0 g/mol = 0.50 mol. From the stoichiometry of the reaction, 2 moles of C₂H₆ produce 6 moles of H₂O (a ratio of 1 : 3). Therefore, 0.50 mol of C₂H₆ produces 3 × 0.50 = 1.50 moles of H₂O. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3902,
    similarQuestion: {
      question: "What is the molality of a 20% (w/w) aqueous solution of sodium hydroxide (NaOH)? (Molar mass of NaOH = 40 g/mol)",
      option_a: "5.00 m",
      option_b: "6.25 m",
      option_c: "4.50 m",
      option_d: "2.50 m",
      correct_option: "B",
      explanation: "In 100 g of 20% (w/w) solution, mass of NaOH = 20 g and mass of water = 100 g - 20 g = 80 g = 0.080 kg. Moles of NaOH = 20 g / 40 g/mol = 0.50 mol. Molality m = Moles of solute / Mass of solvent (kg) = 0.50 mol / 0.080 kg = 6.25 m. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3903,
    similarQuestion: {
      question: "What volume of oxygen gas at STP is liberated by the complete thermal decomposition of 24.5 g of potassium chlorate (KClO₃)? (Molar mass of KClO₃ = 122.5 g/mol, 2 KClO₃ → 2 KCl + 3 O₂)",
      option_a: "2.24 L",
      option_b: "4.48 L",
      option_c: "6.72 L",
      option_d: "8.96 L",
      correct_option: "C",
      explanation: "Moles of KClO₃ = 24.5 g / 122.5 g/mol = 0.20 mol. According to the equation: 2 moles KClO₃ yield 3 moles O₂. Moles of O₂ formed = (3/2) × 0.20 mol = 0.30 mol. Volume of O₂ at STP = 0.30 mol × 22.4 L/mol = 6.72 L. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3904,
    similarQuestion: {
      question: "A 4.92 g sample of hydrated magnesium sulfate (MgSO₄·xH₂O) is heated strongly to drive off all water of crystallization, leaving 2.40 g of anhydrous MgSO₄. What is the value of x? (Molar mass of MgSO₄ = 120 g/mol, H₂O = 18 g/mol)",
      option_a: "4",
      option_b: "5",
      option_c: "7",
      option_d: "9",
      correct_option: "C",
      explanation: "Mass of anhydrous MgSO₄ = 2.40 g ⇒ Moles of MgSO₄ = 2.40 g / 120 g/mol = 0.020 mol. Mass of water lost = 4.92 g - 2.40 g = 2.52 g ⇒ Moles of water = 2.52 g / 18 g/mol = 0.140 mol. Mole ratio of water to MgSO₄: x = 0.140 / 0.020 = 7. Thus, the formula is MgSO₄·7H₂O. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3905,
    similarQuestion: {
      question: "How many total atoms are present in 0.034 g of ammonia gas (NH₃)? (N_A = Avogadro's number, molar mass of NH₃ = 17 g/mol)",
      option_a: "0.002 N_A",
      option_b: "0.004 N_A",
      option_c: "0.008 N_A",
      option_d: "0.016 N_A",
      correct_option: "C",
      explanation: "Moles of NH₃ = 0.034 g / 17 g/mol = 0.002 mol. Each molecule of NH₃ contains 4 atoms (1 N + 3 H). Total atoms = 0.002 mol × 4 atoms/molecule × N_A = 0.008 N_A atoms. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3906,
    similarQuestion: {
      question: "Which of the following statements is correct for a 20.0 g sample of pure calcium carbonate (CaCO₃)? (Molar mass of CaCO₃ = 100 g/mol)",
      option_a: "It contains 0.20 g-atoms of carbon",
      option_b: "It contains 0.60 g-atoms of oxygen",
      option_c: "It contains 0.20 g-atoms of calcium",
      option_d: "All of the above are correct",
      correct_option: "D",
      explanation: "Moles of CaCO₃ = 20.0 g / 100 g/mol = 0.20 mol. 1 mole of CaCO₃ contains 1 g-atom of Ca, 1 g-atom of C, and 3 g-atoms of O. Therefore, in 0.20 mol: Ca = 0.20 g-atom, C = 0.20 g-atom, and O = 3 × 0.20 = 0.60 g-atoms. All statements are correct. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3907,
    similarQuestion: {
      question: "What is the total number of potassium ions present in 3.0 moles of potassium hexacyanoferrate(III), K₃[Fe(CN)₆]? (N_A = 6.02 × 10²³ mol⁻¹)",
      option_a: "3 × N_A",
      option_b: "6 × N_A",
      option_c: "9 × N_A",
      option_d: "12 × N_A",
      correct_option: "C",
      explanation: "Each formula unit of K₃[Fe(CN)₆] contains 3 potassium (K⁺) ions. In 3.0 moles of the compound, moles of K⁺ ions = 3.0 × 3 = 9.0 moles. Therefore, total number of K⁺ ions = 9 × N_A. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3908,
    similarQuestion: {
      question: "When 0.6 mol of BaCl₂ solution is mixed with 0.4 mol of Na₂SO₄ solution, what is the maximum amount of BaSO₄ precipitate that can be formed?",
      option_a: "0.2 mol",
      option_b: "0.4 mol",
      option_c: "0.6 mol",
      option_d: "1.0 mol",
      correct_option: "B",
      explanation: "The precipitation reaction is BaCl₂ + Na₂SO₄ → BaSO₄(s) + 2 NaCl. The stoichiometric ratio is 1 : 1. Since Na₂SO₄ has fewer moles (0.4 mol) than BaCl₂ (0.6 mol), Na₂SO₄ is the limiting reactant. Hence, a maximum of 0.4 mol of BaSO₄ precipitate is formed. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3909,
    similarQuestion: {
      question: "A sample of pure ammonium phosphate, (NH₄)₃PO₄, contains 6.0 moles of hydrogen atoms. How many moles of oxygen atoms are present in this sample?",
      option_a: "1.5 mol",
      option_b: "2.0 mol",
      option_c: "3.0 mol",
      option_d: "4.0 mol",
      correct_option: "B",
      explanation: "In one formula unit of (NH₄)₃PO₄, there are 12 hydrogen atoms and 4 oxygen atoms. The ratio of oxygen atoms to hydrogen atoms is 4 / 12 = 1 / 3. For 6.0 moles of hydrogen atoms, moles of oxygen atoms = 6.0 × (1 / 3) = 2.0 mol. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3910,
    similarQuestion: {
      question: "What volume of hydrogen gas at STP is liberated when 4.8 g of magnesium ribbon is dissolved in excess dilute hydrochloric acid? (Mg + 2 HCl → MgCl₂ + H₂, atomic mass of Mg = 24 g/mol)",
      option_a: "2.24 L",
      option_b: "4.48 L",
      option_c: "11.2 L",
      option_d: "22.4 L",
      correct_option: "B",
      explanation: "Moles of Mg = 4.8 g / 24 g/mol = 0.20 mol. According to the equation, 1 mole of Mg produces 1 mole of H₂ gas. Moles of H₂ produced = 0.20 mol. Volume of H₂ at STP = 0.20 mol × 22.4 L/mol = 4.48 L. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3911,
    similarQuestion: {
      question: "Elements A (atomic mass = 28 g/mol) and B (atomic mass = 16 g/mol) react according to the equation A + B → AB. If 28 g of A and 16 g of B are mixed and allowed to react completely, which of the following is true?",
      option_a: "A is the limiting reactant",
      option_b: "B is the limiting reactant",
      option_c: "Both reactants are completely consumed with no excess reactant remaining",
      option_d: "28 g of product AB is formed",
      correct_option: "C",
      explanation: "Moles of A = 28 / 28 = 1.0 mol. Moles of B = 16 / 16 = 1.0 mol. Since the stoichiometric ratio is exactly 1 : 1, both reactants are completely consumed without any excess left over, producing 44 g of AB. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3912,
    similarQuestion: {
      question: "What volume of CO₂ gas at STP is obtained by the complete thermal decomposition of 25.0 g of a sample of limestone containing 80% pure CaCO₃? (CaCO₃ → CaO + CO₂, molar mass of CaCO₃ = 100 g/mol)",
      option_a: "2.24 L",
      option_b: "4.48 L",
      option_c: "5.60 L",
      option_d: "8.96 L",
      correct_option: "B",
      explanation: "Mass of pure CaCO₃ = 80% of 25.0 g = 0.80 × 25.0 = 20.0 g. Moles of pure CaCO₃ = 20.0 g / 100 g/mol = 0.20 mol. 1 mole of CaCO₃ yields 1 mole of CO₂ gas. Moles of CO₂ = 0.20 mol. Volume of CO₂ at STP = 0.20 mol × 22.4 L/mol = 4.48 L. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3913,
    similarQuestion: {
      question: "Assuming the density of pure water is 1.00 g/mL at 4°C, what is the molarity (molar concentration) of pure liquid water?",
      option_a: "1.00 M",
      option_b: "18.0 M",
      option_c: "50.0 M",
      option_d: "55.56 M",
      correct_option: "D",
      explanation: "In 1.00 L (1000 mL) of water, the mass is 1000 g. Molar mass of H₂O ≈ 18.0 g/mol. Moles of H₂O in 1 L = 1000 g / 18.0 g/mol = 55.56 mol. Hence, Molarity = 55.56 mol / 1 L = 55.56 M. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3914,
    similarQuestion: {
      question: "An aqueous solution of sodium hydroxide (NaOH) is 10% (w/v) and has a density of 1.08 g/mL. What is the molality of this solution? (Molar mass of NaOH = 40 g/mol)",
      option_a: "1.55 m",
      option_b: "2.55 m",
      option_c: "3.10 m",
      option_d: "0.98 m",
      correct_option: "B",
      explanation: "In 100 mL of solution, mass of NaOH = 10 g. Mass of 100 mL solution = 100 mL × 1.08 g/mL = 108 g. Mass of water = 108 g - 10 g = 98 g = 0.098 kg. Moles of NaOH = 10 g / 40 g/mol = 0.25 mol. Molality m = 0.25 mol / 0.098 kg = 2.55 m. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3915,
    similarQuestion: {
      question: "If 100 mL of 0.20 M BaCl₂ solution is mixed with 100 mL of 0.10 M Na₂SO₄ solution, what is the concentration of Na⁺ ions in the resulting mixture?",
      option_a: "0.05 M",
      option_b: "0.10 M",
      option_c: "0.20 M",
      option_d: "0.40 M",
      correct_option: "B",
      explanation: "Na⁺ ions are spectator ions and do not participate in precipitation. In 100 mL of 0.10 M Na₂SO₄, moles of Na⁺ = 2 × (0.10 M × 0.100 L) = 0.020 mol. Total volume of mixture = 100 mL + 100 mL = 200 mL = 0.200 L. Concentration of Na⁺ = 0.020 mol / 0.200 L = 0.10 M. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3916,
    similarQuestion: {
      question: "If the mole fraction of a non-volatile solute in an aqueous solution is 0.10, what is the molality of the solution?",
      option_a: "5.56 m",
      option_b: "6.17 m",
      option_c: "10.0 m",
      option_d: "11.1 m",
      correct_option: "B",
      explanation: "With mole fraction of solute X_solute = 0.10, mole fraction of water X_water = 1 - 0.10 = 0.90. The relationship between molality and mole fraction is: m = (X_solute / X_water) × (1000 / M_solvent) = (0.10 / 0.90) × (1000 / 18) = (1 / 9) × 55.56 = 6.17 m. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3917,
    similarQuestion: {
      question: "What is the mass percentage (w/w) of sucrose in a solution prepared by dissolving 25.0 g of sucrose in 225.0 g of water?",
      option_a: "9.0%",
      option_b: "10.0%",
      option_c: "11.1%",
      option_d: "12.5%",
      correct_option: "B",
      explanation: "Total mass of solution = mass of solute + mass of solvent = 25.0 g + 225.0 g = 250.0 g. Mass percentage = (Mass of solute / Total mass of solution) × 100 = (25.0 / 250.0) × 100 = 10.0%. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3918,
    similarQuestion: {
      question: "A solution contains 0.10 mol of Na⁺, 0.05 mol of Ca²⁺, and 0.20 mol of Cl⁻ in a volume of 500 mL. What is the ratio of total positive charge concentration to total negative charge concentration?",
      option_a: "1 : 2",
      option_b: "1 : 1",
      option_c: "2 : 1",
      option_d: "1.5 : 1",
      correct_option: "B",
      explanation: "By the principle of electroneutrality of electrolyte solutions, the total positive ionic charge equals the total negative ionic charge: Total positive charge = 0.10 × (+1) + 0.05 × (+2) = +0.20 eq. Total negative charge = 0.20 × (-1) = -0.20 eq. The ratio is 1 : 1. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3919,
    similarQuestion: {
      question: "What volume of distilled water must be added to 25 mL of a 2.0 M HCl solution to dilute it to a concentration of 0.50 M?",
      option_a: "50 mL",
      option_b: "75 mL",
      option_c: "100 mL",
      option_d: "125 mL",
      correct_option: "B",
      explanation: "Using the dilution equation M₁ V₁ = M₂ V₂: 2.0 M × 25 mL = 0.50 M × V₂ ⇒ V₂ = 50 / 0.50 = 100 mL. The total final volume required is 100 mL. Therefore, the volume of water to be added is V_added = V₂ - V₁ = 100 mL - 25 mL = 75 mL. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3920,
    similarQuestion: {
      question: "A 1.0 L mixture of CO and CO₂ is passed through a tube containing red-hot charcoal, converting all unreacted CO₂ into CO according to CO₂(g) + C(s) → 2 CO(g). If the final volume of pure CO gas collected at the same conditions is 1.6 L, what was the initial volume of CO₂ in the original mixture?",
      option_a: "0.4 L",
      option_b: "0.6 L",
      option_c: "0.8 L",
      option_d: "0.5 L",
      correct_option: "B",
      explanation: "Let V be the initial volume of CO₂ in the 1.0 L mixture; then the initial volume of CO is (1.0 - V). When V litres of CO₂ reacts with charcoal, it yields 2V litres of CO. Total final volume of CO = (1.0 - V) + 2V = 1.0 + V = 1.6 L ⇒ V = 1.6 - 1.0 = 0.6 L. Therefore, Option (B) is the correct answer."
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
  console.log(`Set 17 Part 2 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
