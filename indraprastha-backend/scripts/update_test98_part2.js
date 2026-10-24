const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 4522,
    similarQuestion: {
      question: "Calculate the molar entropy change of fusion (Δ_fus S) when 1 mole of water ice melts to liquid water at its normal melting point of 0°C (273.15 K). (Given: Molar enthalpy of fusion of ice, Δ_fus H = 6.00 kJ mol⁻¹)",
      option_a: "2.20 J K⁻¹ mol⁻¹",
      option_b: "0.022 J K⁻¹ mol⁻¹",
      option_c: "43.5 J K⁻¹ mol⁻¹",
      option_d: "21.96 J K⁻¹ mol⁻¹",
      correct_option: "D",
      explanation: "1. Melting of ice at its normal melting point (0°C = 273.15 K) is a reversible isothermal phase transition. 2. The entropy change of fusion is given by: Δ_fus S = Δ_fus H / T_m. 3. Substitute values: Δ_fus S = 6000 J mol⁻¹ / 273.15 K = 21.96 J K⁻¹ mol⁻¹. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4523,
    similarQuestion: {
      question: "For the endothermic gas-phase dissociation reaction:\nN₂O₄(g) ⇌ 2NO₂(g)\nThe standard Gibbs free energy change at 298 K is ΔG° = +4.78 kJ mol⁻¹. Calculate the value of the standard equilibrium constant (K_p) for this reaction at 298 K. (Given: R = 8.314 J K⁻¹ mol⁻¹, e^(−1.93) = 0.145)",
      option_a: "0.145",
      option_b: "1.45",
      option_c: "6.90",
      option_d: "0.0145",
      correct_option: "A",
      explanation: "1. The relationship between standard Gibbs free energy change and the thermodynamic equilibrium constant is: ΔG° = −RT ln(K_p) => ln(K_p) = −ΔG° / (RT). 2. Substitute: ΔG° = +4780 J mol⁻¹, R = 8.314 J K⁻¹ mol⁻¹, T = 298 K => ln(K_p) = −4780 / (8.314 × 298) = −4780 / 2477.6 = −1.929 ≈ −1.93. 3. K_p = e^(−1.93) = 0.145. Because ΔG° > 0, K_p < 1. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4524,
    similarQuestion: {
      question: "The dissolution of ammonium chloride in water is an endothermic process:\nNH₄Cl(s) + aq → NH₄⁺(aq) + Cl⁻(aq)\nThe standard enthalpy change of solution is ΔH° = +15.0 kJ mol⁻¹ and the standard entropy change of solution is ΔS° = +75.0 J K⁻¹ mol⁻¹. What is the standard Gibbs free energy change, ΔG°, for the dissolution at 298 K, and is the process thermodynamically spontaneous?",
      option_a: "+7.35 kJ mol⁻¹, non-spontaneous",
      option_b: "−7.35 kJ mol⁻¹, spontaneous",
      option_c: "−15.0 kJ mol⁻¹, spontaneous",
      option_d: "+15.0 kJ mol⁻¹, non-spontaneous",
      correct_option: "B",
      explanation: "1. The change in Gibbs free energy for dissolution is: ΔG° = ΔH° − TΔS°. 2. Convert ΔS° to kJ K⁻¹ mol⁻¹: ΔS° = +75.0 J K⁻¹ mol⁻¹ = +0.075 kJ K⁻¹ mol⁻¹. 3. Substitute at T = 298 K: ΔG° = +15.0 kJ mol⁻¹ − [298 K × 0.075 kJ K⁻¹ mol⁻¹] = +15.0 − 22.35 = −7.35 kJ mol⁻¹. Since ΔG° is negative, dissolution of ammonium chloride is thermodynamically spontaneous at 298 K. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4525,
    similarQuestion: {
      question: "Calculate the standard entropy change of reaction (ΔS°_rxn) for the Haber synthesis of ammonia at 298 K:\nN₂(g) + 3H₂(g) → 2NH₃(g)\nGiven standard absolute molar entropies (S°):\nS°(N₂(g)) = 191.5 J K⁻¹ mol⁻¹\nS°(H₂(g)) = 130.6 J K⁻¹ mol⁻¹\nS°(NH₃(g)) = 192.5 J K⁻¹ mol⁻¹",
      option_a: "−99.3 J K⁻¹ mol⁻¹",
      option_b: "−198.3 J K⁻¹ mol⁻¹",
      option_c: "+198.3 J K⁻¹ mol⁻¹",
      option_d: "−298.5 J K⁻¹ mol⁻¹",
      correct_option: "B",
      explanation: "1. The standard entropy change for a reaction is: ΔS°_rxn = Σ n_p S°(products) − Σ n_r S°(reactants). 2. For N₂(g) + 3H₂(g) → 2NH₃(g): ΔS°_rxn = [2 × S°(NH₃(g))] − [S°(N₂(g)) + 3 × S°(H₂(g))]. 3. Substitute: ΔS°_rxn = [2 × 192.5] − [191.5 + 3 × 130.6] = 385.0 − 583.3 = −198.3 J K⁻¹ mol⁻¹. The negative sign reflects a decrease in gaseous moles from 4 to 2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4526,
    similarQuestion: {
      question: "Among the following thermodynamic variables:\n(1) Internal energy (U)\n(2) Heat exchanged (q)\n(3) Enthalpy (H)\n(4) Work done (w)\n(5) Entropy (S)\n(6) Gibbs free energy (G)\nWhich group consists exclusively of state functions?",
      option_a: "(1), (2), and (4)",
      option_b: "(2), (4), and (5)",
      option_c: "(1), (3), (5), and (6)",
      option_d: "All (1), (2), (3), (4), (5), and (6)",
      correct_option: "C",
      explanation: "A state function is a property whose value depends solely on the thermodynamic state of the system, independent of the path taken. Internal energy (U), Enthalpy (H), Entropy (S), and Gibbs free energy (G) are all state functions. In contrast, heat (q) and work (w) depend on the specific path followed between the states and are path functions. Thus, (1), (3), (5), and (6) are exclusively state functions. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4527,
    similarQuestion: {
      question: "Calculate the average C–H bond dissociation enthalpy in methane (CH₄) given the following thermochemical data:\n(1) Enthalpy of formation of CH₄(g), ΔH°_f = −74.8 kJ mol⁻¹\n(2) Enthalpy of atomization of carbon, C(graphite) → C(g), ΔH°_a = +718.4 kJ mol⁻¹\n(3) Bond dissociation enthalpy of H–H bond in H₂(g), ΔH° = +436.0 kJ mol⁻¹",
      option_a: "1665.2 kJ mol⁻¹",
      option_b: "416.3 kJ mol⁻¹",
      option_c: "520.4 kJ mol⁻¹",
      option_d: "832.6 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. Formation of methane: C(graphite) + 2H₂(g) → CH₄(g); ΔH°_f = −74.8 kJ mol⁻¹. 2. Atomization of elements into gaseous atoms: C(graphite) → C(g): +718.4 kJ mol⁻¹, 2H₂(g) → 4H(g): 2 × 436.0 = +872.0 kJ mol⁻¹. Total energy to form gaseous atoms = 718.4 + 872.0 = 1590.4 kJ mol⁻¹. 3. Total energy to break 4 C–H bonds in CH₄(g): ΔH_atom(CH₄) = 1590.4 − (−74.8) = 1665.2 kJ mol⁻¹. 4. Average C–H bond energy = 1665.2 kJ mol⁻¹ / 4 = 416.3 kJ mol⁻¹. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4528,
    similarQuestion: {
      question: "Calculate the quantity of heat required to raise the temperature of a 25.0 g piece of copper metal from 20°C to 220°C. (Given: Specific heat capacity of copper = 0.385 J g⁻¹ °C⁻¹)",
      option_a: "962.5 J",
      option_b: "1925 J",
      option_c: "3850 J",
      option_d: "770 J",
      correct_option: "B",
      explanation: "1. The relationship between heat absorbed, mass, specific heat capacity, and temperature rise is: q = m × c × ΔT. 2. Given: m = 25.0 g, c = 0.385 J g⁻¹ °C⁻¹, ΔT = 220°C − 20°C = 200°C. 3. Substitute: q = 25.0 g × 0.385 J g⁻¹ °C⁻¹ × 200°C = 1925 J. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4529,
    similarQuestion: {
      question: "Calculate the standard Gibbs free energy change (ΔG°_sol) for the dissolution of 1 mole of an ionic salt MX in water at 25°C (298 K), given the following thermodynamic parameters:\n- Lattice enthalpy of MX(s) = +750.0 kJ mol⁻¹\n- Hydration enthalpy of MX(s) = −745.0 kJ mol⁻¹\n- Entropy of dissolution, ΔS°_sol = +40.0 J K⁻¹ mol⁻¹",
      option_a: "−6.92 kJ mol⁻¹",
      option_b: "+6.92 kJ mol⁻¹",
      option_c: "−16.92 kJ mol⁻¹",
      option_d: "−11.92 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. The enthalpy of solution is: ΔH°_solution = ΔH_lattice + ΔH_hydration = (+750.0 kJ mol⁻¹) + (−745.0 kJ mol⁻¹) = +5.0 kJ mol⁻¹. 2. Convert ΔS°: ΔS°_solution = +40.0 J K⁻¹ mol⁻¹ = +0.040 kJ K⁻¹ mol⁻¹. 3. Substitute into Gibbs-Helmholtz equation at 298 K: ΔG°_solution = +5.0 kJ mol⁻¹ − [298 K × 0.040 kJ K⁻¹ mol⁻¹] = +5.0 − 11.92 = −6.92 kJ mol⁻¹. Because ΔG°_solution < 0, dissolution is spontaneous. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4530,
    similarQuestion: {
      question: "Entropy (S) represents the degree of microscopic randomness or molecular disorder. In which of the following physical or chemical processes is the entropy change positive (ΔS > 0)?",
      option_a: "Condensation of water vapor into liquid: H₂O(g) → H₂O(l)",
      option_b: "Synthesis of ammonia: N₂(g) + 3H₂(g) → 2NH₃(g)",
      option_c: "Sublimation of solid iodine: I₂(s) → I₂(g)",
      option_d: "Freezing of liquid benzene into solid: C₆H₆(l) → C₆H₆(s)",
      correct_option: "C",
      explanation: "In the sublimation of solid iodine: I₂(s) → I₂(g), tightly ordered, crystalline solid iodine molecules break away into randomly moving gaseous molecules, resulting in an enormous increase in positional disorder and degrees of freedom. Hence, ΔS > 0 (positive). In options (A), (B), and (D), gases condense, gaseous moles decrease, or liquids freeze, which correspond to negative ΔS. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4531,
    similarQuestion: {
      question: "For a given biochemical reaction at 298 K, the enthalpy change is ΔH = −12.0 kJ mol⁻¹ and the entropy change is ΔS = +45.0 J K⁻¹ mol⁻¹. What can be predicted about the spontaneity of this reaction at 298 K?",
      option_a: "Spontaneous, because both enthalpy and entropy drive the process (ΔG < 0)",
      option_b: "Non-spontaneous under all circumstances",
      option_c: "In a state of dynamic equilibrium (ΔG = 0)",
      option_d: "Spontaneous only at temperatures above 1000 K",
      correct_option: "A",
      explanation: "The change in Gibbs free energy is given by ΔG = ΔH − TΔS. Here, the process is exothermic (ΔH < 0, favorable) and accompanied by an increase in randomness (ΔS > 0, favorable): ΔG = −12,000 J mol⁻¹ − [298 K × (+45.0 J K⁻¹ mol⁻¹)] = −12,000 − 13,410 = −25,410 J mol⁻¹ = −25.41 kJ mol⁻¹. Since ΔG is negative, the reaction is spontaneous at 298 K. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4532,
    similarQuestion: {
      question: "When an ideal gas undergoes an isothermal expansion at constant temperature (T = constant), how does its total internal energy (U) change?",
      option_a: "Internal energy continuously increases because volume increases",
      option_b: "Internal energy remains constant (ΔU = 0) because internal energy of an ideal gas depends solely on temperature",
      option_c: "Internal energy decreases because work is done by the gas",
      option_d: "Internal energy fluctuates sinusoidally",
      correct_option: "B",
      explanation: "According to Joule's law of thermodynamics, for an ideal gas, intermolecular forces are negligible. Consequently, internal energy (U) depends strictly on temperature alone: U = f(T). Therefore, in any isothermal process (where T is constant, ΔT = 0), the change in internal energy is identically zero (ΔU = 0), regardless of changes in pressure or volume. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4533,
    similarQuestion: {
      question: "A 1.80 g sample of glucose (C₆H₁₂O₆, molar mass = 180 g mol⁻¹) is completely burned in a bomb calorimeter with excess oxygen. The temperature of the calorimeter system rises from 295.00 K to 297.80 K. If the heat capacity of the calorimeter system is 10.0 kJ K⁻¹, calculate the molar enthalpy of combustion of glucose at constant volume (ΔU_comb).",
      option_a: "−1400 kJ mol⁻¹",
      option_b: "−2800 kJ mol⁻¹",
      option_c: "+2800 kJ mol⁻¹",
      option_d: "−5600 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. Heat absorbed by the calorimeter: q_cal = C_cal × ΔT = 10.0 kJ K⁻¹ × (297.80 − 295.00) K = 10.0 × 2.80 = 28.0 kJ. 2. Moles of glucose burned = mass / molar mass = 1.80 g / 180 g mol⁻¹ = 0.010 mol. 3. Heat of combustion at constant volume corresponds to internal energy change: ΔU_comb = −(q_cal / n) = −(28.0 kJ / 0.010 mol) = −2800 kJ mol⁻¹. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4534,
    similarQuestion: {
      question: "At the same temperature (T) and for an equal number of moles (1 mole each), which of the following gaseous species possesses the highest total molar internal energy (U)?",
      option_a: "Triatomic ozone gas, O₃(g)",
      option_b: "Diatomic oxygen gas, O₂(g)",
      option_c: "Monoatomic helium gas, He(g)",
      option_d: "Both O₂(g) and He(g) have equal internal energy",
      correct_option: "A",
      explanation: "The internal energy of an ideal gas is given by the equipartition theorem as U = (f/2) RT, where 'f' represents active degrees of freedom: Monoatomic He: f = 3, U = (3/2)RT; Diatomic O₂: f = 5, U = (5/2)RT; Non-linear triatomic O₃: f = 6, U = (6/2)RT = 3RT. Since ozone has the highest degrees of freedom, 1 mole of O₃ gas has maximum internal energy at a given temperature. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4535,
    similarQuestion: {
      question: "Which of the following statements regarding Gibbs free energy (G) is incorrect?",
      option_a: "A process occurring at constant temperature and pressure is spontaneous when ΔG > 0",
      option_b: "Gibbs free energy (G) is an extensive property and a state function",
      option_c: "The decrease in Gibbs free energy (−ΔG) at constant temperature and pressure equals the maximum non-expansion (useful) work obtainable from the system",
      option_d: "At thermodynamic equilibrium, the change in Gibbs free energy is zero (ΔG = 0)",
      correct_option: "A",
      explanation: "According to the second law of thermodynamics, for any spontaneous (feasible) process occurring at constant temperature and pressure, the Gibbs free energy must decrease, i.e., ΔG < 0 (negative). If ΔG > 0, the forward reaction is non-spontaneous and requires external work to proceed. Statements (B), (C), and (D) are all scientifically true. Therefore, statement (A) is incorrect. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4536,
    similarQuestion: {
      question: "For the halogen displacement reaction:\nCl₂(g) + 2HBr(g) → 2HCl(g) + Br₂(l); ΔH° = −81.2 kJ mol⁻¹\nIf the standard enthalpy of formation of gaseous HCl is ΔH°_f(HCl(g)) = −92.3 kJ mol⁻¹, calculate the standard enthalpy of formation of gaseous hydrogen bromide, ΔH°_f(HBr(g)).",
      option_a: "+51.7 kJ mol⁻¹",
      option_b: "−103.4 kJ mol⁻¹",
      option_c: "+103.4 kJ mol⁻¹",
      option_d: "−51.7 kJ mol⁻¹",
      correct_option: "D",
      explanation: "1. The standard enthalpy change is: ΔH° = [2 × ΔH°_f(HCl(g)) + ΔH°_f(Br₂(l))] − [ΔH°_f(Cl₂(g)) + 2 × ΔH°_f(HBr(g))]. 2. Pure elements in reference states have ΔH°_f = 0: ΔH° = 2 × ΔH°_f(HCl(g)) − 2 × ΔH°_f(HBr(g)). 3. Substitute values: −81.2 kJ = 2(−92.3 kJ mol⁻¹) − 2 × ΔH°_f(HBr(g)) => −81.2 = −184.6 − 2 × ΔH°_f(HBr(g)) => 2 × ΔH°_f(HBr(g)) = −184.6 + 81.2 = −103.4 kJ => ΔH°_f(HBr(g)) = −103.4 / 2 = −51.7 kJ mol⁻¹. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4537,
    similarQuestion: {
      question: "For the endothermic phase transition of metallic magnesium:\nMg(s) → Mg(g)\nThe enthalpy change associated with converting one mole of solid metallic magnesium directly into separate, individual gaseous magnesium atoms can be correctly designated as:",
      option_a: "Enthalpy of fusion",
      option_b: "Enthalpy of atomisation",
      option_c: "Enthalpy of sublimation",
      option_d: "Both Enthalpy of atomisation and Enthalpy of sublimation",
      correct_option: "D",
      explanation: "For an elemental metal in its standard solid state: (1) Converting solid directly into gas (solid → gas) without passing through liquid state is defined as sublimation (Δ_sub H); (2) Breaking all metallic bonds in 1 mole of solid metal to obtain 1 mole of free, isolated gaseous atoms is defined as the enthalpy of atomisation (Δ_a H). Since magnesium is monoatomic in the gas phase, Mg(s) → Mg(g) represents both enthalpy of sublimation and enthalpy of atomisation. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4538,
    similarQuestion: {
      question: "White phosphorus burns in excess chlorine gas in an exothermic reaction:\nP₄(s) + 6Cl₂(g) → 4PCl₃(l); ΔH° = −1272 kJ\nWhat is the enthalpy change when 3.10 g of white phosphorus (P₄, molar mass = 124.0 g mol⁻¹) reacts completely with an excess of chlorine?",
      option_a: "−63.6 kJ",
      option_b: "−31.8 kJ",
      option_c: "−15.9 kJ",
      option_d: "−127.2 kJ",
      correct_option: "B",
      explanation: "1. Moles of P₄ reacting = mass / molar mass = 3.10 g / 124.0 g mol⁻¹ = 0.025 mol. 2. Combustion of 1.0 mol of P₄ releases 1272 kJ of heat according to P₄(s) + 6Cl₂(g) → 4PCl₃(l); ΔH° = −1272 kJ. 3. For 0.025 mol of P₄: ΔH = 0.025 mol × (−1272 kJ mol⁻¹) = −31.8 kJ. Therefore, Option (B) is the correct answer."
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
      console.log(`[SUCCESS] Updated Test 98 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Test 98 Part 2 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
