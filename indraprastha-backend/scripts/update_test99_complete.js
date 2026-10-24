const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3666,
    similarQuestion: {
      question: "The solubility of anhydrous copper sulfate (CuSO₄) in water is 20.0 g per 100.0 g of water at 25°C. Three separate systems (A, B, and C) are prepared at 25°C by adding 15.0 g, 10.0 g, and 6.0 g of CuSO₄ respectively to 50.0 g of water in each beaker. What is the correct relative order of vapor pressure of water above these three solutions?",
      option_a: "A < B < C",
      option_b: "A > B > C",
      option_c: "A = B > C",
      option_d: "A = B < C",
      correct_option: "D",
      explanation: "At 25°C, 50.0 g of water can dissolve a maximum of (20.0 / 100.0) × 50.0 = 10.0 g of CuSO₄ to form a saturated solution. System A (15.0 g added to 50.0 g water) and System B (10.0 g added to 50.0 g water) both result in saturated solutions with exactly 10.0 g dissolved solute; hence their solvent mole fractions and vapor pressures are identical: V.P.(A) = V.P.(B). System C (6.0 g dissolved in 50.0 g water) is unsaturated and has a higher solvent mole fraction, resulting in less vapor pressure lowering and higher vapor pressure. Thus, V.P.(A) = V.P.(B) < V.P.(C). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3667,
    similarQuestion: {
      question: "A volatile liquid has a normal boiling point of 27°C (300 K) under an external atmospheric pressure of 1.0 atm. If its molar enthalpy of vaporization is ΔH_vap = 2400 cal mol⁻¹, calculate its boiling point at an external pressure of 2.0 atm. (Given: R = 2.0 cal K⁻¹ mol⁻¹, ln 2 = 0.693)",
      option_a: "27°C",
      option_b: "54°C",
      option_c: "89.7°C",
      option_d: "120°C",
      correct_option: "C",
      explanation: "1. According to the Clausius-Clapeyron equation: ln(P₂ / P₁) = (ΔH_vap / R) × [(1 / T₁) − (1 / T₂)]. 2. Given: P₁ = 1.0 atm, T₁ = 300 K, P₂ = 2.0 atm, ΔH_vap = 2400 cal mol⁻¹, R = 2.0 cal K⁻¹ mol⁻¹, ln 2 = 0.693. 3. Substitute: 0.693 = (2400 / 2.0) × [(1 / 300) − (1 / T₂)] => 0.693 = 1200 × [0.003333 − (1 / T₂)] => 0.0005775 = 0.003333 − (1 / T₂) => 1 / T₂ = 0.0027558 => T₂ = 362.87 K. 4. In Celsius: T₂ = 362.87 − 273.15 = 89.72°C ≈ 89.7°C. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3668,
    similarQuestion: {
      question: "When ethanol (C₂H₅OH) and cyclohexane (C₆H₁₂) are mixed together, the non-polar cyclohexane molecules insert between ethanol molecules, breaking many of the intermolecular hydrogen bonds. What thermodynamic behavior and azeotropic property will this binary liquid mixture exhibit?",
      option_a: "Positive deviation from Raoult's law and forms a minimum-boiling azeotrope at a specific composition",
      option_b: "Positive deviation from Raoult's law and forms a maximum-boiling azeotrope at a specific composition",
      option_c: "Negative deviation from Raoult's law and forms a minimum-boiling azeotrope at a specific composition",
      option_d: "Ideal solution behavior with zero deviation from Raoult's law",
      correct_option: "A",
      explanation: "When cyclohexane is added to ethanol, it gets into the spaces between ethanol molecules and disrupts the intermolecular hydrogen bonding network. As a result, the solute-solvent attractive forces (A–B) are weaker than the original solvent-solvent forces (A–A), enabling molecules to escape more easily into the vapor phase. Consequently: (1) Total vapor pressure is greater than predicted by Raoult's law (positive deviation, ΔH_mix > 0, ΔV_mix > 0); (2) Solutions showing large positive deviations from Raoult's law form a minimum-boiling azeotrope at a specific intermediate composition. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3669,
    similarQuestion: {
      question: "An aqueous solution of sodium hydroxide (NaOH) has a concentration of 1.0 × 10⁻⁴ M (assume solution density = 1.00 g mL⁻¹). Which of the following concentration expressions for this solution is/are correct?\n(1) The concentration of NaOH in parts per million (ppm) is 4.0 ppm.\n(2) The molality of the solution is approximately 1.0 × 10⁻⁴ m.\n(3) The mass/volume percentage (% w/v) of NaOH is 4.0 × 10⁻³ %.\n(Molar mass of NaOH = 40.0 g mol⁻¹)",
      option_a: "(1), (2), and (3) are all correct",
      option_b: "(1) and (2) only",
      option_c: "(2) and (3) only",
      option_d: "(1) only",
      correct_option: "A",
      explanation: "1. Mass of NaOH per liter = (1.0 × 10⁻⁴ mol L⁻¹) × (40.0 g mol⁻¹) = 4.0 × 10⁻³ g L⁻¹ = 4.0 mg L⁻¹. 2. Since density = 1.00 g mL⁻¹, 1 L has a mass of 1000 g = 1.0 kg: concentration in ppm = 4.0 mg / 1.0 kg = 4.0 ppm. Thus, (1) is correct. 3. In dilute solution, molality ≈ molarity = 1.0 × 10⁻⁴ m. Thus, (2) is correct. 4. % w/v = (4.0 × 10⁻³ g / 1000 mL) × 100 = 4.0 × 10⁻³ %. Thus, (3) is correct. Therefore, all three statements are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3670,
    similarQuestion: {
      question: "Which of the following aqueous solution preparations contains exactly 20.0 g of pure sodium hydroxide (NaOH, molar mass = 40.0 g mol⁻¹)?\n(P) 50.0 g of a 40.0% (w/w) NaOH solution\n(Q) 500 mL of a 1.0 M NaOH solution\n(R) 25.0 g of an 80.0% (w/w) NaOH solution",
      option_a: "(P) only",
      option_b: "(P), (Q), and (R) all contain exactly 20.0 g of NaOH",
      option_c: "(P) and (R) only",
      option_d: "(Q) only",
      correct_option: "B",
      explanation: "1. For (P): 50.0 g × (40.0 / 100) = 20.0 g NaOH. 2. For (Q): 0.500 L × 1.0 mol L⁻¹ = 0.50 mol NaOH; mass = 0.50 mol × 40.0 g mol⁻¹ = 20.0 g NaOH. 3. For (R): 25.0 g × (80.0 / 100) = 20.0 g NaOH. Therefore, all three preparations (P), (Q), and (R) contain exactly 20.0 g of NaOH. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3671,
    similarQuestion: {
      question: "For a 1.0 M aqueous solution of magnesium chloride (MgCl₂, molar mass = 95.2 g mol⁻¹) having a density of 1.08 g mL⁻¹, what is the molality of chloride ions (Cl⁻) in the solution?",
      option_a: "0.98 m",
      option_b: "1.00 m",
      option_c: "2.03 m",
      option_d: "4.06 m",
      correct_option: "C",
      explanation: "1. In 1.0 L of 1.0 M MgCl₂ solution: Moles of MgCl₂ = 1.0 mol, moles of Cl⁻ = 2 × 1.0 = 2.0 mol. 2. Mass of 1000 mL solution = 1000 mL × 1.08 g mL⁻¹ = 1080 g. 3. Mass of solute (MgCl₂) = 1.0 mol × 95.2 g mol⁻¹ = 95.2 g. 4. Mass of water = 1080 g − 95.2 g = 984.8 g = 0.9848 kg. 5. Molality of Cl⁻ = 2.0 mol / 0.9848 kg = 2.03 m. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3672,
    similarQuestion: {
      question: "A commercial bottle of hydrogen peroxide (H₂O₂) solution is labelled as '22.4 volume H₂O₂'. What is the molarity (M) and percentage strength (% w/v) of this solution? (Molar mass of H₂O₂ = 34 g mol⁻¹)",
      option_a: "Molarity = 2.0 M, and % w/v = 6.8%",
      option_b: "Molarity = 1.0 M, and % w/v = 3.4%",
      option_c: "Molarity = 4.0 M, and % w/v = 13.6%",
      option_d: "Molarity = 0.5 M, and % w/v = 1.7%",
      correct_option: "A",
      explanation: "1. Volume Strength = 11.2 × Molarity (M). 2. For '22.4 volume H₂O₂': Molarity = 22.4 / 11.2 = 2.0 M. 3. In 1000 mL of solution: Mass of H₂O₂ = 2.0 mol × 34 g mol⁻¹ = 68 g. 4. % w/v = (68 g / 1000 mL) × 100 = 6.8% w/v. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3673,
    similarQuestion: {
      question: "When 100 mL of 0.10 M BaCl₂ solution is mixed with 100 mL of 0.05 M Na₂SO₄ solution, a white precipitate of BaSO₄ is formed:\nBa²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)\nWhich of the following statements is correct regarding the stoichiometric reaction?",
      option_a: "BaCl₂ is the limiting reagent, and all Ba²⁺ ions are consumed",
      option_b: "Na₂SO₄ is the limiting reagent, 0.005 moles of BaSO₄ precipitate, and 0.025 M excess Ba²⁺ remains in the final solution",
      option_c: "0.010 moles of BaSO₄ precipitate",
      option_d: "Both reagents are consumed completely with zero excess ions",
      correct_option: "B",
      explanation: "1. Initial moles: Ba²⁺ = 0.100 L × 0.10 M = 0.010 mol; SO₄²⁻ = 0.100 L × 0.05 M = 0.005 mol. 2. Stoichiometry is 1:1, so Na₂SO₄ is the limiting reagent. 3. BaSO₄ precipitated = 0.005 mol. 4. Unreacted Ba²⁺ = 0.010 − 0.005 = 0.005 mol in total volume 200 mL (0.200 L) => [Ba²⁺]_excess = 0.005 mol / 0.200 L = 0.025 M. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3674,
    similarQuestion: {
      question: "A coordination compound has the empirical formula C₁₀H₈Fe (empirical formula mass = 184 g mol⁻¹). When 0.52 g of this compound is dissolved in 22.4 g of benzene, the boiling point of the solution is found to increase by 0.16°C. Given the molal boiling point elevation constant of benzene is K_b = 2.53 K kg mol⁻¹, determine the molecular formula of the compound.",
      option_a: "C₁₀H₈Fe",
      option_b: "C₃₀H₂₄Fe₃",
      option_c: "C₅H₄Fe",
      option_d: "C₂₀H₁₆Fe₂",
      correct_option: "D",
      explanation: "1. M_B = (K_b × w_B × 1000) / (ΔT_b × w_A) = (2.53 × 0.52 × 1000) / (0.16 × 22.4) = 1315.6 / 3.584 = 367.08 g mol⁻¹. 2. Empirical formula mass of C₁₀H₈Fe = 184 g mol⁻¹. 3. n = 367 / 184 ≈ 2. Molecular formula = (C₁₀H₈Fe)₂ = C₂₀H₁₆Fe₂. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3675,
    similarQuestion: {
      question: "An aqueous solution contains 5.85% NaCl (molar mass = 58.5 g mol⁻¹) and 11.1% CaCl₂ (molar mass = 111.0 g mol⁻¹) by mass. Assuming both electrolytes undergo 100% complete ionization in water and K_b(H₂O) = 0.52 K kg mol⁻¹, calculate the boiling point of this solution at 1 atm pressure.",
      option_a: "100.52°C",
      option_b: "101.56°C",
      option_c: "103.12°C",
      option_d: "105.20°C",
      correct_option: "C",
      explanation: "1. In 100 g of solution: mass of water = 100 − (5.85 + 11.1) = 83.05 g = 0.08305 kg. 2. Effective moles of ions: NaCl (i = 2): 2 × (5.85 / 58.5) = 0.20 mol; CaCl₂ (i = 3): 3 × (11.1 / 111.0) = 0.30 mol. Total effective moles = 0.20 + 0.30 = 0.50 mol. 3. Effective molality = 0.50 mol / 0.08305 kg = 6.020 mol kg⁻¹. 4. ΔT_b = 0.52 × 6.020 = 3.13°C => Boiling point = 100.00 + 3.13 = 103.13°C ≈ 103.12°C. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4623,
    similarQuestion: {
      question: "According to the physical state of solute and solvent, a homogeneous mixture of camphor vapor in nitrogen gas or humidity (water vapor in air) is classified as which type of solution?",
      option_a: "Gas dissolved in liquid",
      option_b: "Solid or liquid dispersed/dissolved in a gaseous solvent",
      option_c: "Solid dissolved in solid",
      option_d: "Gas dissolved in gas",
      correct_option: "B",
      explanation: "In NCERT classification of solutions: Chloroform mixed with nitrogen gas, or water vapor in air, represents a liquid solute dissolved in a gas solvent. Camphor in nitrogen gas represents a solid solute in a gas solvent. In both, the solvent is a gas and the solute is liquid or solid. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4624,
    similarQuestion: {
      question: "When a solute is present in extremely small (trace) quantities in a solvent, such as the concentration of toxic heavy metals in drinking water or harmful particulate matter in atmospheric air, which concentration unit is most conveniently and conventionally employed?",
      option_a: "Molarity (M)",
      option_b: "Molality (m)",
      option_c: "Volume percent (% v/v)",
      option_d: "Parts per million (ppm) or parts per billion (ppb)",
      correct_option: "D",
      explanation: "When a solute is present in trace quantities, expressing concentration in molarity or molality results in cumbersome decimal values. Hence, concentration is expressed in parts per million (ppm): ppm = (mass of component / total mass of solution) × 10⁶. Environmental pollutant concentrations in water and the atmosphere are routinely reported in ppm or ppb. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4625,
    similarQuestion: {
      question: "To avoid the dangerous medical condition known as 'the bends' (decompression sickness) caused by painful nitrogen bubbling in blood capillaries during rapid ascent, deep-sea scuba divers breathe from compressed gas cylinders containing air diluted with which noble gas?",
      option_a: "Argon",
      option_b: "Neon",
      option_c: "Helium (11.7% He, 56.2% N₂, 32.1% O₂)",
      option_d: "Krypton",
      correct_option: "C",
      explanation: "Under high underwater pressure, nitrogen dissolves in blood at increased concentrations. During rapid ascent, external pressure decreases and dissolved nitrogen rapidly forms bubbles in blood vessels that block circulation, causing 'the bends'. To prevent this, divers use breathing gas diluted with helium (11.7% He, 56.2% N₂, 32.1% O₂) because helium has extremely low solubility in blood. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4626,
    similarQuestion: {
      question: "According to Henry's law, the partial pressure of a volatile solute in vapor phase is p = K_H × x. According to Raoult's law, the partial vapor pressure of a volatile component is p = p° × x. Comparing both laws, Raoult's law can be regarded as a special case of Henry's law when Henry's law constant (K_H) becomes equal to:",
      option_a: "The mole fraction of the solute in solution",
      option_b: "The total atmospheric pressure",
      option_c: "The vapor pressure of the pure volatile component (p°)",
      option_d: "The universal gas constant (R)",
      correct_option: "C",
      explanation: "Both Raoult's law and Henry's law state that partial vapor pressure is directly proportional to mole fraction: Henry's law: p_i = K_H × x_i; Raoult's law: p_i = p°_i × x_i. When K_H becomes equal to the vapor pressure of the pure component (p°_i), Henry's law becomes identical to Raoult's law. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4627,
    similarQuestion: {
      question: "Among the colligative properties, measurement of osmotic pressure (Π = CRT) is widely preferred over elevation in boiling point or depression in freezing point for determining the molar masses of biomolecules (proteins, DNA) and synthetic polymers because:",
      option_a: "Polymers are insoluble in all organic solvents",
      option_b: "Boiling point elevation cannot be measured in water",
      option_c: "Osmotic pressure can be measured at room temperature, produces measurable magnitudes even for extremely dilute macromolecular solutions, and biomolecules remain stable without thermal denaturation",
      option_d: "All of the above statements",
      correct_option: "C",
      explanation: "Osmotic pressure is preferred for macromolecules because: (1) Measurements are carried out at ambient room temperature, preserving heat-labile biomolecules; (2) Because polymers have large molar masses, molal concentrations are tiny, making ΔT_b or ΔT_f negligibly small; however, osmotic pressure (Π = CRT) produces substantial, precisely measurable heights; (3) It uses molarity. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4628,
    similarQuestion: {
      question: "Normal intravenous saline solution, which is safely infused into patients because it is strictly isotonic with human red blood cell (RBC) intracellular fluid, has a concentration of:",
      option_a: "0.45% (mass/volume) NaCl solution",
      option_b: "0.9% (mass/volume) NaCl aqueous solution",
      option_c: "5.0% (mass/volume) NaCl solution",
      option_d: "1.0 M NaCl solution",
      correct_option: "B",
      explanation: "An aqueous solution of 0.9% (w/v) sodium chloride is physiological/normal saline. It has an osmotic pressure equal to human blood plasma and erythrocytes (~7.7 atm). In 0.9% NaCl, there is no net movement of water across the cell membrane, preventing crenation (shrinkage in hypertonic >0.9%) and hemolysis (swelling and bursting in hypotonic <0.9%). Therefore, Option (B) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in successfully.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/test-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated Test 99 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Test 99 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
