const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3921,
    similarQuestion: {
      question: "What volume of CO₂ gas at STP is produced when 10.6 g of anhydrous sodium carbonate (Na₂CO₃) is heated strongly in a crucible?",
      option_a: "0.0 L",
      option_b: "1.12 L",
      option_c: "2.24 L",
      option_d: "4.48 L",
      correct_option: "A",
      explanation: "Alkali metal carbonates (except Li₂CO₃) have high thermal stability due to strong electropositive character and large cation size; they do not decompose into CO₂ upon heating. Thus, no CO₂ gas is liberated (volume = 0.0 L). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3922,
    similarQuestion: {
      question: "If 44.8 L of hydrogen gas (H₂) and 11.2 L of chlorine gas (Cl₂) are mixed and sparked at STP (H₂ + Cl₂ → 2 HCl), what is the number of moles of HCl gas produced?",
      option_a: "0.5 mol",
      option_b: "1.0 mol",
      option_c: "2.0 mol",
      option_d: "4.0 mol",
      correct_option: "B",
      explanation: "At STP, moles of H₂ = 44.8 / 22.4 = 2.0 mol, and moles of Cl₂ = 11.2 / 22.4 = 0.50 mol. According to the equation H₂ + Cl₂ → 2 HCl, 1 mole of Cl₂ reacts with 1 mole of H₂ to produce 2 moles of HCl. Cl₂ is the limiting reactant. Therefore, moles of HCl formed = 2 × 0.50 mol = 1.0 mol. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3923,
    similarQuestion: {
      question: "If 10.6 g of anhydrous Na₂CO₃ is dissolved in distilled water to prepare 200 mL of solution, the molar concentrations of Na⁺ and CO₃²⁻ ions in the solution are respectively: (Molar mass of Na₂CO₃ = 106 g/mol)",
      option_a: "0.50 M and 0.50 M",
      option_b: "1.00 M and 0.50 M",
      option_c: "0.50 M and 1.00 M",
      option_d: "0.25 M and 0.50 M",
      correct_option: "B",
      explanation: "Moles of Na₂CO₃ = 10.6 g / 106 g/mol = 0.10 mol. Volume of solution = 200 mL = 0.200 L. Molarity of Na₂CO₃ = 0.10 mol / 0.200 L = 0.50 M. In solution, Na₂CO₃ completely dissociates into 2 Na⁺ + CO₃²⁻. Hence, [Na⁺] = 2 × 0.50 M = 1.00 M, and [CO₃²⁻] = 0.50 M. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3924,
    similarQuestion: {
      question: "What is the molar concentration of OH⁻ ions in a solution obtained by mixing 50 mL of 0.10 M HCl with 50 mL of 0.20 M Ba(OH)₂?",
      option_a: "0.05 M",
      option_b: "0.15 M",
      option_c: "0.20 M",
      option_d: "0.35 M",
      correct_option: "B",
      explanation: "Millimoles of H⁺ from HCl = 50 mL × 0.10 M = 5.0 mmol. Millimoles of OH⁻ from Ba(OH)₂ = 50 mL × (2 × 0.20 M) = 20.0 mmol. Millimoles of excess OH⁻ remaining = 20.0 - 5.0 = 15.0 mmol. Total volume of mixture = 50 mL + 50 mL = 100 mL. [OH⁻] = 15.0 mmol / 100 mL = 0.15 M. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3925,
    similarQuestion: {
      question: "The number of electrons present in 1.8 g of water (H₂O) compared to 2.0 g of heavy water (D₂O) is: (Atomic masses: ¹H = 1, ²D = 2, ¹⁶O = 16)",
      option_a: "Equal",
      option_b: "Half",
      option_c: "Double",
      option_d: "Four times",
      correct_option: "A",
      explanation: "Moles of H₂O = 1.8 g / 18 g/mol = 0.10 mol. Each molecule of H₂O has 2(1) + 8 = 10 electrons. Total electrons in H₂O = 0.10 × 10 N_A = 1.0 N_A. Moles of D₂O = 2.0 g / 20 g/mol = 0.10 mol. Each D atom has 1 electron, so D₂O also has 2(1) + 8 = 10 electrons per molecule. Total electrons in D₂O = 0.10 × 10 N_A = 1.0 N_A. Hence, both samples contain equal numbers of electrons. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3926,
    similarQuestion: {
      question: "When 8.0 g of hydrogen gas and 64.0 g of oxygen gas are ignited in a closed steel bomb, how many moles of water are formed? (2 H₂ + O₂ → 2 H₂O)",
      option_a: "1.0 mol",
      option_b: "2.0 mol",
      option_c: "4.0 mol",
      option_d: "8.0 mol",
      correct_option: "C",
      explanation: "Moles of H₂ = 8.0 g / 2.0 g/mol = 4.0 mol. Moles of O₂ = 64.0 g / 32.0 g/mol = 2.0 mol. By stoichiometry, 2 moles of H₂ react with 1 mole of O₂ to produce 2 moles of H₂O. 4.0 moles of H₂ react with 2.0 moles of O₂ in exact stoichiometric proportion to produce 4.0 moles of H₂O. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3927,
    similarQuestion: {
      question: "What is the total number of atoms contained in 0.20 mole of a triatomic gas (such as ozone, O₃)? (N_A = 6.022 × 10²³ mol⁻¹)",
      option_a: "1.20 × 10²³",
      option_b: "1.81 × 10²³",
      option_c: "3.61 × 10²³",
      option_d: "6.02 × 10²³",
      correct_option: "C",
      explanation: "Each molecule of a triatomic gas contains 3 atoms. Therefore, 1 mole of triatomic gas contains 3 moles of atoms. In 0.20 mole of triatomic gas, total moles of atoms = 0.20 × 3 = 0.60 mol. Total number of atoms = 0.60 × 6.022 × 10²³ = 3.613 × 10²³ ≈ 3.61 × 10²³ atoms. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3928,
    similarQuestion: {
      question: "Which of the following gas samples contains the greatest number of molecules?",
      option_a: "32 g CH₄",
      option_b: "64 g SO₂",
      option_c: "28 g N₂",
      option_d: "32 g O₂",
      correct_option: "A",
      explanation: "Moles of 32 g CH₄ = 32 / 16 = 2.0 mol. Moles of 64 g SO₂ = 64 / 64 = 1.0 mol. Moles of 28 g N₂ = 28 / 28 = 1.0 mol. Moles of 32 g O₂ = 32 / 32 = 1.0 mol. 32 g of CH₄ contains 2.0 moles, representing the greatest number of molecules (2 N_A). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3929,
    similarQuestion: {
      question: "If 10.0 L of H₂ and 5.0 L of Cl₂ are reacted at identical temperature and pressure, what volume of HCl gas is produced?",
      option_a: "5.0 L",
      option_b: "10.0 L",
      option_c: "15.0 L",
      option_d: "20.0 L",
      correct_option: "B",
      explanation: "By Gay-Lussac's law of combining volumes: 1 volume H₂ + 1 volume Cl₂ → 2 volumes HCl. Chlorine (5.0 L) is the limiting reactant and requires 5.0 L of H₂. The volume of HCl produced is 2 × 5.0 L = 10.0 L. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3930,
    similarQuestion: {
      question: "If 2.4 g of magnesium is burnt in a closed vessel containing 1.2 g of oxygen gas (2 Mg + O₂ → 2 MgO), which reactant remains in excess and by what mass? (Atomic masses: Mg = 24, O = 16)",
      option_a: "Mg, 0.60 g",
      option_b: "O₂, 0.60 g",
      option_c: "Mg, 0.40 g",
      option_d: "O₂, 0.40 g",
      correct_option: "A",
      explanation: "Moles of Mg = 2.4 g / 24 g/mol = 0.10 mol. Moles of O₂ = 1.2 g / 32 g/mol = 0.0375 mol. The equation requires 2 moles of Mg per mole of O₂. Moles of Mg needed = 2 × 0.0375 = 0.075 mol. Excess moles of Mg = 0.10 - 0.075 = 0.025 mol. Excess mass of Mg = 0.025 mol × 24 g/mol = 0.60 g. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3931,
    similarQuestion: {
      question: "A gaseous mixture contains methane (CH₄) and helium (He) in a mass ratio of 2 : 1. What is the molar ratio of CH₄ to He in the mixture? (Molar masses: CH₄ = 16 g/mol, He = 4 g/mol)",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Let the masses be 2 g CH₄ and 1 g He. Moles of CH₄ = 2 / 16 = 1/8 mol. Moles of He = 1 / 4 = 2/8 mol. Molar ratio n(CH₄) : n(He) = (1/8) : (2/8) = 1 : 2. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3932,
    similarQuestion: {
      question: "In which of the following quantities is the number of water molecules greatest?",
      option_a: "18 g of water",
      option_b: "100 mL of liquid water",
      option_c: "10 moles of water",
      option_d: "10²⁴ molecules of water",
      correct_option: "C",
      explanation: "Moles in 18 g water = 18 / 18 = 1.0 mol. Moles in 100 mL water = 100 g / 18 g/mol ≈ 5.56 mol. 10 moles of water contains 10 N_A ≈ 6.02 × 10²⁴ molecules. 10²⁴ molecules is approx 1.66 mol. The 10 moles sample contains the greatest number of molecules. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3933,
    similarQuestion: {
      question: "A 50.0 g sample of impure calcium carbonate (CaCO₃) is heated until complete decomposition, yielding 22.4 g of calcium oxide (CaO) residue. What is the percentage purity of the limestone sample? (CaCO₃ → CaO + CO₂, molar masses: CaCO₃ = 100 g/mol, CaO = 56 g/mol)",
      option_a: "70%",
      option_b: "80%",
      option_c: "85%",
      option_d: "90%",
      correct_option: "B",
      explanation: "Moles of CaO produced = 22.4 g / 56 g/mol = 0.40 mol. According to the reaction, 1 mole of CaCO₃ produces 1 mole of CaO. Therefore, moles of pure CaCO₃ = 0.40 mol. Mass of pure CaCO₃ = 0.40 mol × 100 g/mol = 40.0 g. Percentage purity = (40.0 / 50.0) × 100 = 80.0%. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3934,
    similarQuestion: {
      question: "A mixture of 4.6 g of formic acid (HCOOH) and 9.0 g of oxalic acid (H₂C₂O₄) is treated with concentrated H₂SO₄. The evolved gases are passed through a concentrated KOH solution to absorb CO₂. What is the mass of the remaining gas (CO)? (Molar masses: HCOOH = 46 g/mol, H₂C₂O₄ = 90 g/mol, CO = 28 g/mol)",
      option_a: "2.8 g",
      option_b: "4.2 g",
      option_c: "5.6 g",
      option_d: "8.4 g",
      correct_option: "C",
      explanation: "1. HCOOH → CO + H₂O: 4.6 g / 46 g/mol = 0.10 mol HCOOH yields 0.10 mol CO. 2. H₂C₂O₄ → CO + CO₂ + H₂O: 9.0 g / 90 g/mol = 0.10 mol oxalic acid yields 0.10 mol CO and 0.10 mol CO₂. 3. KOH absorbs all 0.10 mol of CO₂. Remaining CO = 0.10 + 0.10 = 0.20 mol. Mass of CO = 0.20 mol × 28 g/mol = 5.6 g. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3935,
    similarQuestion: {
      question: "According to Haber's process for the synthesis of ammonia (N₂ + 3 H₂ → 2 NH₃), how many moles of hydrogen gas (H₂) are required to produce 15.0 moles of ammonia?",
      option_a: "15.0 mol",
      option_b: "22.5 mol",
      option_c: "30.0 mol",
      option_d: "45.0 mol",
      correct_option: "B",
      explanation: "The stoichiometric ratio is 3 moles of H₂ for every 2 moles of NH₃ produced. For 15.0 moles of NH₃, moles of H₂ required = (3 / 2) × 15.0 mol = 22.5 mol. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3936,
    similarQuestion: {
      question: "What volume is occupied by 3.6 g of steam (water vapor) at a temperature of 227°C and a pressure of 1.0 bar? (Take R = 0.0831 L·bar·K⁻¹·mol⁻¹, molar mass of H₂O = 18 g/mol)",
      option_a: "4.16 L",
      option_b: "6.24 L",
      option_c: "8.31 L",
      option_d: "10.4 L",
      correct_option: "C",
      explanation: "Moles of steam n = 3.6 g / 18 g/mol = 0.20 mol. Temperature T = 227 + 273.15 ≈ 500 K. Pressure P = 1.0 bar. From the ideal gas law: V = n R T / P = (0.20 mol × 0.0831 L·bar·K⁻¹·mol⁻¹ × 500 K) / 1.0 bar = 8.31 L. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3937,
    similarQuestion: {
      question: "A non-stoichiometric iron oxide has the formula Fe₀.₉₃O₁.₀₀. What fraction of the total iron ions exists in the Fe³⁺ (iron(III)) oxidation state?",
      option_a: "0.07",
      option_b: "0.15",
      option_c: "0.85",
      option_d: "0.25",
      correct_option: "B",
      explanation: "Let the amount of Fe³⁺ be y, and Fe²⁺ be (0.93 - y). For electrical neutrality with 1 oxide ion (-2 charge): 2(0.93 - y) + 3y = 2 ⇒ 1.86 + y = 2 ⇒ y = 0.14. Fraction of iron in Fe³⁺ state = y / 0.93 = 0.14 / 0.93 ≈ 0.15 (or 15%). Therefore, Option (B) is the correct answer."
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
  console.log(`Set 17 Part 3 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
