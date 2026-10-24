const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3657,
    similarQuestion: {
      question: "Which of the following statements correctly identifies the thermodynamic classification of a system?",
      option_a: "Boiling water in an open, unlidded beaker represents an isolated system",
      option_b: "A perfectly sealed, double-walled vacuum thermos flask containing hot coffee is an example of an open system",
      option_c: "A tightly sealed stainless steel container containing liquid water and its vapor represents a closed system",
      option_d: "A closed system can freely exchange both thermal energy and matter with its surroundings",
      correct_option: "C",
      explanation: "In thermodynamics: (1) An open system exchanges both matter and energy with the surroundings (e.g., an open beaker); (2) A closed system can exchange energy (heat and work) across its diathermic boundaries but cannot exchange matter with the surroundings (e.g., a tightly sealed metallic or glass container); (3) An isolated system cannot exchange either matter or energy with the surroundings (e.g., an ideal insulated thermos flask). Therefore, a sealed stainless steel vessel represents a closed system. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3658,
    similarQuestion: {
      question: "In thermodynamics, a physical property is classified as a 'state function' (or state variable) if its value:",
      option_a: "Depends on the specific path and mechanism by which the change is carried out",
      option_b: "Can only be defined for irreversible cyclic processes",
      option_c: "Depends exclusively on the initial and final states of the system, independent of the path taken",
      option_d: "Is strictly equal to zero for all open systems",
      correct_option: "C",
      explanation: "A state function (such as internal energy U, enthalpy H, entropy S, and Gibbs free energy G) depends solely on the current macroscopic thermodynamic state (specified by variables like P, V, T, n) of the system and not on the pathway or history through which that state was reached. Consequently, the change in a state function around any complete cyclic process is identically zero (∮dX = 0). Quantities like heat (q) and work (w) depend on the path and are path functions. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3659,
    similarQuestion: {
      question: "For any thermodynamic process occurring under strictly adiabatic conditions (q = 0), which of the following statements is always valid?",
      option_a: "The entropy change of the system (ΔS_system) is always equal to zero, regardless of reversibility",
      option_b: "The entropy change of the system (ΔS_system) is always negative for an irreversible adiabatic expansion",
      option_c: "The entropy change of the surroundings (ΔS_surroundings) is always zero because no heat is exchanged across the boundary",
      option_d: "The total entropy change of the universe (ΔS_total) is always negative",
      correct_option: "C",
      explanation: "By definition, an adiabatic boundary prevents any heat exchange between the system and its surroundings (q_surroundings = −q_system = 0). Since the entropy change of the surroundings is defined as ΔS_surroundings = q_rev,surr / T_surr, and heat exchanged is zero, ΔS_surroundings is identically zero for all adiabatic processes. For reversible adiabatic processes, ΔS_system = 0, while for irreversible adiabatic processes, ΔS_system > 0 (due to internal entropy generation). Therefore, ΔS_surroundings = 0 is always true. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3660,
    similarQuestion: {
      question: "One mole of an ideal gas expands isothermally and irreversibly at 27°C (300 K) until its volume triples (V₂ = 3V₁). During this expansion, 2.45 kJ of heat is absorbed by the gas from the thermal reservoir. Calculate the total entropy change of the universe, ΔS_total (ΔS_system + ΔS_surroundings). (Given: R = 8.314 J K⁻¹ mol⁻¹, ln 3 = 1.0986)",
      option_a: "−1.03 J K⁻¹",
      option_b: "+0.97 J K⁻¹",
      option_c: "+9.13 J K⁻¹",
      option_d: "0 J K⁻¹",
      correct_option: "B",
      explanation: "1. For an isothermal expansion of an ideal gas, entropy is a state function: ΔS_system = nR ln(V₂ / V₁) = (1 mol) × (8.314 J K⁻¹ mol⁻¹) × ln(3) = 8.314 × 1.0986 = +9.134 J K⁻¹. 2. For the surroundings, heat exchanged is q_surroundings = −q_absorbed = −2450 J at T = 300 K: ΔS_surroundings = q_surroundings / T = −2450 J / 300 K = −8.167 J K⁻¹. 3. Total entropy change: ΔS_total = ΔS_system + ΔS_surroundings = 9.134 J K⁻¹ − 8.167 J K⁻¹ = +0.967 J K⁻¹ ≈ +0.97 J K⁻¹. Since ΔS_total > 0, the irreversible expansion is spontaneous. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3661,
    similarQuestion: {
      question: "Calculate the standard enthalpy of formation of methanol, CH₃OH(l), given the following thermochemical equations:\n(1) CH₃OH(l) + ³/₂ O₂(g) → CO₂(g) + 2H₂O(l); ΔH° = −726.4 kJ mol⁻¹\n(2) C(graphite) + O₂(g) → CO₂(g); ΔH° = −393.5 kJ mol⁻¹\n(3) H₂(g) + ¹/₂ O₂(g) → H₂O(l); ΔH° = −285.8 kJ mol⁻¹",
      option_a: "−195.0 kJ mol⁻¹",
      option_b: "−214.8 kJ mol⁻¹",
      option_c: "−200.3 kJ mol⁻¹",
      option_d: "−238.7 kJ mol⁻¹",
      correct_option: "D",
      explanation: "The target equation for the formation of methanol is: C(graphite) + 2H₂(g) + ¹/₂ O₂(g) → CH₃OH(l). Applying Hess's law of constant heat summation: ΔH°_f = ΔH°(eq 2) + 2 × ΔH°(eq 3) − ΔH°(eq 1) = (−393.5 kJ) + 2 × (−285.8 kJ) − (−726.4 kJ) = −393.5 − 571.6 + 726.4 = −965.1 + 726.4 = −238.7 kJ mol⁻¹. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3662,
    similarQuestion: {
      question: "The enthalpy of neutralization of a 1 M solution of a weak monobasic acid (HA) by a strong base (NaOH) is observed to be −56.10 kJ mol⁻¹. The enthalpy of neutralization of a strong acid by a strong base is −57.30 kJ mol⁻¹, and the heat of complete ionization of unionized HA is +1.50 kJ mol⁻¹. What is the percentage ionization of HA in this 1 M solution?",
      option_a: "10.0%",
      option_b: "20.0%",
      option_c: "5.0%",
      option_d: "2.5%",
      correct_option: "B",
      explanation: "1. Neutralization of a weak acid HA by strong base involves: complete ionization of unionized molecules: (1 − α) × ΔH_ionization, and neutralization of H⁺ with OH⁻: −57.30 kJ mol⁻¹. 2. The observed enthalpy of neutralization is: ΔH_neut = −57.30 + (1 − α) × ΔH_ionization => −56.10 = −57.30 + (1 − α) × 1.50 => 1.20 = (1 − α) × 1.50 => 1 − α = 0.80 => α = 0.20. 3. Percentage ionization = α × 100% = 0.20 × 100% = 20.0%. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3663,
    similarQuestion: {
      question: "Calculate the heat evolved (in kJ) when 112 g of quicklime (CaO, molar mass = 56 g mol⁻¹) reacts completely with carbon dioxide to form solid CaCO₃ in a closed vessel of constant volume at 27°C (300 K):\nCaO(s) + CO₂(g) → CaCO₃(s)\nGiven: ΔH° of the reaction = −178.3 kJ mol⁻¹ of CaO, and R = 8.314 J K⁻¹ mol⁻¹.",
      option_a: "351.6 kJ",
      option_b: "356.6 kJ",
      option_c: "178.3 kJ",
      option_d: "346.6 kJ",
      correct_option: "A",
      explanation: "1. Moles of CaO = mass / molar mass = 112 g / 56 g mol⁻¹ = 2.0 mol. 2. In a container of fixed volume (constant volume), the heat evolved corresponds to the internal energy change (q_v = ΔU): ΔH = ΔU + Δn_g RT => ΔU = ΔH − Δn_g RT. For CaO(s) + CO₂(g) → CaCO₃(s), Δn_g = 0 − 1 = −1. 3. For 1 mole: ΔU = −178.3 kJ − (−1) × (8.314 × 10⁻³ kJ K⁻¹ × 300 K) = −178.3 + 2.4942 = −175.806 kJ mol⁻¹. 4. For 2.0 moles of CaO: Total heat evolved = 2.0 mol × 175.806 kJ mol⁻¹ = 351.61 kJ ≈ 351.6 kJ. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3664,
    similarQuestion: {
      question: "For the hydrogenation of ethene:\nC₂H₄(g) + H₂(g) → C₂H₆(g)\nCalculate the standard enthalpy of reaction, ΔH°_rxn, using the following bond energy data:\nB.E.(C=C) = 612 kJ mol⁻¹\nB.E.(C–C) = 348 kJ mol⁻¹\nB.E.(C–H) = 412.5 kJ mol⁻¹\nB.E.(H–H) = 436 kJ mol⁻¹",
      option_a: "−238 kJ mol⁻¹",
      option_b: "−357 kJ mol⁻¹",
      option_c: "+125 kJ mol⁻¹",
      option_d: "−125 kJ mol⁻¹",
      correct_option: "D",
      explanation: "1. In the reaction C₂H₄(g) + H₂(g) → C₂H₆(g): Bonds broken: 1 × C=C double bond = 612 kJ mol⁻¹, 1 × H–H single bond = 436 kJ mol⁻¹. Total energy of bonds broken = 612 + 436 = 1048 kJ mol⁻¹. 2. Bonds formed: 1 × C–C single bond = 348 kJ mol⁻¹, 2 × C–H single bonds = 2 × 412.5 = 825 kJ mol⁻¹. Total energy of bonds formed = 348 + 825 = 1173 kJ mol⁻¹. 3. Enthalpy of reaction: ΔH° = Σ(B.E. of bonds broken) − Σ(B.E. of bonds formed) = 1048 − 1173 = −125 kJ mol⁻¹. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3665,
    similarQuestion: {
      question: "The enthalpy of neutralization of a strong acid by a strong base is −57.3 kJ mol⁻¹. However, the neutralization of hydrofluoric acid (HF) by sodium hydroxide (NaOH) is anomalously higher, with ΔH_neut ≈ −68.6 kJ mol⁻¹. What is the primary chemical reason for this unusually large exothermic value?",
      option_a: "HF is a very strong diprotic acid with high degree of dissociation",
      option_b: "Fluorine forms covalent network polymers with sodium ions",
      option_c: "The exceptionally high hydration enthalpy of the small fluoride ion (F⁻) releases more energy than consumed in ionizing HF",
      option_d: "The reaction produces flammable hydrogen gas which burns exothermically",
      correct_option: "C",
      explanation: "HF is a weak acid and requires energy for dissociation of the strong H–F bond. However, when HF is neutralized, fluoride ions (F⁻) are formed. Because the F⁻ ion has an extremely small ionic radius and high charge density, its hydration enthalpy (ΔH_hyd = −515 kJ mol⁻¹) is exceptionally large and exothermic. This released hydration energy significantly exceeds the energy absorbed during the ionization of HF, making the overall enthalpy of neutralization of HF (−68.6 kJ mol⁻¹) greater than the normal strong acid–strong base value of −57.3 kJ mol⁻¹. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4514,
    similarQuestion: {
      question: "For a chemical reaction: X(g) + Y(g) → Z(s), the enthalpy change is ΔH = −15.0 kJ mol⁻¹ and the entropy change is ΔS = −50.0 J K⁻¹ mol⁻¹. In what temperature range will this reaction be spontaneous under standard conditions?",
      option_a: "At all temperatures above 300 K",
      option_b: "Only at T = 300 K",
      option_c: "At all temperatures below 300 K (T < 300 K)",
      option_d: "The reaction can never be spontaneous at any temperature",
      correct_option: "C",
      explanation: "For spontaneity, the change in Gibbs free energy must be negative (ΔG < 0): ΔG = ΔH − TΔS < 0. Substitute ΔH = −15,000 J mol⁻¹ and ΔS = −50.0 J K⁻¹ mol⁻¹: −15,000 − T(−50.0) < 0 => −15,000 + 50.0 T < 0 => 50.0 T < 15,000 => T < 15,000 / 50.0 = 300 K. Hence, the reaction is spontaneous only at temperatures below 300 K. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4515,
    similarQuestion: {
      question: "For the addition reaction:\nCH₂=CH₂(g) + Br₂(l) → CH₂Br–CH₂Br(l)\nThe standard enthalpy change is ΔH° = −220.0 kJ mol⁻¹ and the standard entropy change is ΔS° = −160.0 J K⁻¹ mol⁻¹. What is the value of the standard Gibbs free energy change, ΔG°, at T = 300 K?",
      option_a: "−268.0 kJ mol⁻¹",
      option_b: "−172.0 kJ mol⁻¹",
      option_c: "−190.0 kJ mol⁻¹",
      option_d: "+172.0 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. The relationship between Gibbs free energy, enthalpy, and entropy is: ΔG° = ΔH° − TΔS°. 2. Convert ΔS° to kJ K⁻¹ mol⁻¹: ΔS° = −160.0 J K⁻¹ mol⁻¹ = −0.160 kJ K⁻¹ mol⁻¹. 3. Substitute values at T = 300 K: ΔG° = −220.0 kJ mol⁻¹ − [300 K × (−0.160 kJ K⁻¹ mol⁻¹)] = −220.0 + 48.0 = −172.0 kJ mol⁻¹. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4516,
    similarQuestion: {
      question: "A 0.32 g sample of methane gas (CH₄, molar mass = 16 g mol⁻¹) is completely combusted in a constant-volume bomb calorimeter at 298 K. The temperature of the calorimeter system rises by 1.0°C. If the total heat capacity of the calorimeter assembly is 17.8 kJ K⁻¹, calculate the standard molar enthalpy of combustion of methane at constant pressure (ΔH_comb). (Given: R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "−895 kJ mol⁻¹",
      option_b: "−890 kJ mol⁻¹",
      option_c: "+895 kJ mol⁻¹",
      option_d: "−178 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Heat evolved at constant volume: q_v = C_calorimeter × ΔT = 17.8 kJ K⁻¹ × 1.0 K = 17.8 kJ. 2. Moles of CH₄ = 0.32 g / 16 g mol⁻¹ = 0.02 mol. Molar heat of combustion at constant volume: ΔU_comb = −(17.8 kJ / 0.02 mol) = −890 kJ mol⁻¹. 3. For combustion of methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), Δn_g = 1 − (1 + 2) = −2 mol. 4. Enthalpy of combustion at constant pressure (ΔH): ΔH = ΔU + Δn_g RT = −890 kJ mol⁻¹ + (−2 mol × 8.314 × 10⁻³ kJ K⁻¹ mol⁻¹ × 298 K) = −890 − 4.95 = −894.95 kJ mol⁻¹ ≈ −895 kJ mol⁻¹. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4517,
    similarQuestion: {
      question: "The standard enthalpies of formation of propane (C₃H₈(g)), CO₂(g), and H₂O(l) are −103.8 kJ mol⁻¹, −393.5 kJ mol⁻¹, and −285.8 kJ mol⁻¹ respectively. Calculate the total heat evolved when 1.0 m³ of propane gas measured at STP (where 1 mole occupies 22.4 L) is completely combusted in excess oxygen.",
      option_a: "−2220 kJ",
      option_b: "−99,107 kJ",
      option_c: "−44,200 kJ",
      option_d: "−120,500 kJ",
      correct_option: "B",
      explanation: "1. For the combustion of propane: C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l). ΔH°_comb = [3 × ΔH°_f(CO₂) + 4 × ΔH°_f(H₂O)] − [ΔH°_f(C₃H₈)] = [3(−393.5) + 4(−285.8)] − (−103.8) = [−1180.5 − 1143.2] + 103.8 = −2323.7 + 103.8 = −2219.9 kJ mol⁻¹. 2. 1.0 m³ = 1000 L. At STP, molar volume of an ideal gas is 22.4 L: Moles of C₃H₈ = 1000 L / 22.4 L mol⁻¹ = 44.643 mol. 3. Total heat evolved = 44.643 mol × (−2219.9 kJ mol⁻¹) = −99,103 kJ ≈ −99,107 kJ. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4518,
    similarQuestion: {
      question: "5 moles of an ideal gas undergo an isothermal reversible expansion at 300 K from an initial pressure of 10 atm to a final pressure of 1 atm. Calculate the work done by the gas during this process. (Given: R = 8.314 J K⁻¹ mol⁻¹, ln 10 = 2.303)",
      option_a: "−28.72 × 10³ J",
      option_b: "+28.72 × 10³ J",
      option_c: "−14.36 × 10³ J",
      option_d: "−57.44 × 10³ J",
      correct_option: "A",
      explanation: "1. For an isothermal reversible expansion of an ideal gas, the work done is: w = −nRT ln(P₁ / P₂). 2. Given: n = 5 mol, R = 8.314 J K⁻¹ mol⁻¹, T = 300 K, P₁ = 10 atm, P₂ = 1 atm. w = −(5) × (8.314) × (300) × ln(10) = −12,471 × 2.303 = −28,720.7 J = −28.72 × 10³ J. The negative sign indicates work is done by the system on the surroundings during expansion. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4519,
    similarQuestion: {
      question: "The standard enthalpy of formation of liquid water, H₂O(l), is −285.8 kJ mol⁻¹. Given that the enthalpy of neutralization of a strong acid by a strong base is −57.3 kJ mol⁻¹ according to the ionic equation:\nH⁺(aq) + OH⁻(aq) → H₂O(l); ΔH° = −57.3 kJ mol⁻¹\nAnd taking standard enthalpy of formation of H⁺(aq) as 0 kJ mol⁻¹, calculate the standard enthalpy of formation of hydroxide ions, OH⁻(aq).",
      option_a: "−57.3 kJ mol⁻¹",
      option_b: "−228.5 kJ mol⁻¹",
      option_c: "−343.1 kJ mol⁻¹",
      option_d: "+228.5 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. The neutralization reaction is represented in net ionic form as: H⁺(aq) + OH⁻(aq) → H₂O(l); ΔH°_neut = −57.3 kJ mol⁻¹. 2. In terms of enthalpies of formation: ΔH°_neut = ΔH°_f(H₂O(l)) − [ΔH°_f(H⁺(aq)) + ΔH°_f(OH⁻(aq))]. 3. By convention, ΔH°_f(H⁺(aq)) = 0 kJ mol⁻¹. Substituting the given values: −57.3 kJ mol⁻¹ = −285.8 kJ mol⁻¹ − [0 + ΔH°_f(OH⁻(aq))] => ΔH°_f(OH⁻(aq)) = −285.8 + 57.3 = −228.5 kJ mol⁻¹. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4520,
    similarQuestion: {
      question: "When 3.0 g of graphite carbon (C(s), atomic mass = 12 g mol⁻¹) is completely burned in oxygen to form CO₂(g), 'q' kJ of heat is liberated. What is the standard enthalpy of formation of carbon dioxide, ΔH°_f(CO₂)? (Note: heat liberated means exothermic)",
      option_a: "−4q kJ mol⁻¹",
      option_b: "+4q kJ mol⁻¹",
      option_c: "−q / 4 kJ mol⁻¹",
      option_d: "−12q kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Moles of carbon burned = mass / atomic mass = 3.0 g / 12 g mol⁻¹ = 0.25 mol = ¹/₄ mol. 2. The reaction for the formation of CO₂ from its elements is: C(graphite) + O₂(g) → CO₂(g). 3. Burning 0.25 mol of carbon releases 'q' kJ of heat. Therefore, combustion of 1 full mole of carbon releases: q_molar = q / 0.25 = 4q kJ. 4. Since heat is released (exothermic process), the enthalpy change is negative: ΔH°_f(CO₂) = −4q kJ mol⁻¹. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4521,
    similarQuestion: {
      question: "After emerging from a shower, a person's skin is covered with a uniform thin film of water having a total mass of 36.0 g. How much thermal energy must be absorbed to completely evaporate this film of water at 37°C? (Given: Standard molar enthalpy of vaporization of water, Δ_vap H° = 43.5 kJ mol⁻¹, molar mass of H₂O = 18.0 g mol⁻¹)",
      option_a: "87.0 kJ",
      option_b: "174.0 kJ",
      option_c: "43.5 kJ",
      option_d: "21.75 kJ",
      correct_option: "A",
      explanation: "1. Moles of water to be evaporated = mass / molar mass = 36.0 g / 18.0 g mol⁻¹ = 2.0 mol. 2. The energy required for vaporization of water at constant temperature and pressure is given by: q = n × Δ_vap H° = 2.0 mol × 43.5 kJ mol⁻¹ = 87.0 kJ. Therefore, Option (A) is the correct answer."
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
  console.log(`Test 98 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
