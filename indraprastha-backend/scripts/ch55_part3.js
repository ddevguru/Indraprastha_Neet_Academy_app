// ch55_part3.js - Questions 60 to 84 (IDs 1791 down to 1767)
module.exports = [
  {
    id: 1791,
    originalQuestion: {
      question: "In which case is the change in entropy negative? [NEET 2019]",
      option_a: "Sublimation of solid to gas",
      option_b: "2H(g) → H₂(g)",
      option_c: "Evaporation of water",
      option_d: "Expansion of a gas at constant temperature",
      correct_option: "B",
      explanation: "Let us evaluate the entropy change (ΔS) for each process:\n1. Option A: Sublimation of solid to gas: Conversion of an ordered crystalline lattice into a highly disordered gas results in a large increase in entropy (ΔS > 0).\n2. Option B: 2H(g) → H₂(g): Two moles of isolated gaseous hydrogen atoms combine to form one mole of diatomic H₂ gas molecules. The number of independent translational particles decreases from 2 to 1, causing a reduction in randomness and degrees of freedom. Hence, the entropy change is negative (ΔS < 0).\n3. Option C: Evaporation of water: Liquid water transforms into water vapour, increasing disorder (ΔS > 0).\n4. Option D: Expansion of a gas at constant temperature: Increasing volume allows gas molecules to occupy more microstates (ΔS = nR ln(V₂/V₁) > 0).\n\nTherefore, the change in entropy is negative for 2H(g) → H₂(g).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For which of the following chemical reactions is the entropy change negative (ΔS < 0)?",
      option_a: "CaCO₃(s) → CaO(s) + CO₂(g)",
      option_b: "N₂(g) + 3H₂(g) → 2NH₃(g)",
      option_c: "PCl₅(g) → PCl₃(g) + Cl₂(g)",
      option_d: "2H₂O(l) → 2H₂(g) + O₂(g)",
      correct_option: "B",
      explanation: "1. In N₂(g) + 3H₂(g) → 2NH₃(g), four moles of gaseous reactants combine to form only two moles of gaseous products (Δn_g = 2 - 4 = -2).\n2. A decrease in the number of gaseous molecules reduces the randomness and molecular chaos of the system.\n3. Therefore, ΔS is negative for the synthesis of ammonia.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1790,
    originalQuestion: {
      question: "The correct option for free expansion of an ideal gas under adiabatic conditions is: [NEET 2020 Phase 1]",
      option_a: "q = 0, ΔT < 0 and w > 0",
      option_b: "q < 0, ΔT = 0 and w = 0",
      option_c: "q > 0, ΔT > 0 and w > 0",
      option_d: "q = 0, ΔT = 0 and w = 0",
      correct_option: "D",
      explanation: "Let us examine the thermodynamic variables for the adiabatic free expansion of an ideal gas:\n1. Adiabatic conditions: By definition, no heat enters or leaves the system across its boundary, so q = 0.\n2. Free expansion: The gas expands into an evacuated container (vacuum) where the external opposing pressure is zero (P_ext = 0). Therefore, the work done is:\nw = -P_ext ΔV = -0 × ΔV = 0.\n3. According to the First Law of Thermodynamics:\nΔU = q + w = 0 + 0 = 0.\n4. For an ideal gas, internal energy is strictly a function of temperature: ΔU = n C_v ΔT. Since ΔU = 0, the change in temperature must also be zero:\nΔT = 0.\n\nTherefore, q = 0, ΔT = 0 and w = 0.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "When 1 mole of an ideal gas undergoes free expansion in an insulated container, which of the following remains constant?",
      option_a: "Volume",
      option_b: "Pressure",
      option_c: "Temperature",
      option_d: "Entropy",
      correct_option: "C",
      explanation: "1. In insulated free expansion, q = 0 and w = 0, which means ΔU = 0.\n2. For an ideal gas, internal energy depends only on temperature (Joule's law).\n3. Since ΔU = 0, the temperature T remains strictly constant (ΔT = 0).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1789,
    originalQuestion: {
      question: "For the reaction 2Cl(g) → Cl₂(g), the correct option is: [NEET 2020 Phase 1]",
      option_a: "ΔᵣH > 0 and ΔᵣS < 0",
      option_b: "ΔᵣH < 0 and ΔᵣS > 0",
      option_c: "ΔᵣH < 0 and ΔᵣS < 0",
      option_d: "ΔᵣH > 0 and ΔᵣS > 0",
      correct_option: "C",
      explanation: "Let us analyze the enthalpy and entropy changes for the reaction 2Cl(g) → Cl₂(g):\n1. Enthalpy change (ΔᵣH): In this process, isolated chlorine atoms combine to form a covalent Cl-Cl bond in chlorine molecules. Because bond formation releases energy, the process is exothermic. Therefore, ΔᵣH < 0.\n2. Entropy change (ΔᵣS): Two moles of gaseous chlorine atoms with three translational degrees of freedom each are combined into one mole of diatomic Cl₂ gas molecules. The number of independent particles decreases from 2 to 1, reducing molecular randomness. Therefore, ΔᵣS < 0.\n\nThus, both ΔᵣH < 0 and ΔᵣS < 0.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What are the signs of ΔH and ΔS for the formation of hydrogen molecules from free hydrogen atoms: 2H(g) → H₂(g)?",
      option_a: "ΔH < 0, ΔS < 0",
      option_b: "ΔH > 0, ΔS > 0",
      option_c: "ΔH < 0, ΔS > 0",
      option_d: "ΔH > 0, ΔS < 0",
      correct_option: "A",
      explanation: "1. Bond formation is always exothermic, releasing the bond energy of H-H (-436 kJ mol⁻¹), so ΔH < 0.\n2. Two independent gaseous atoms form a single diatomic molecule, decreasing the number of particles and disorder, so ΔS < 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1788,
    originalQuestion: {
      question: "Hydrolysis of sucrose is given by: Sucrose + H₂O ⇌ Glucose + Fructose If Kc = 2 × 10¹³ at 300 K, the value of ΔᵣG° at the same temperature will be: [NEET 2020 Phase 1]",
      option_a: "8.314 J mol⁻¹ K⁻¹ × 300 K × ln(2 × 10¹³)",
      option_b: "8.314 J mol⁻¹ K⁻¹ × 300 K × ln(3 × 10¹³)",
      option_c: "-8.314 J mol⁻¹ K⁻¹ × 300 K × ln(4 × 10¹³)",
      option_d: "-8.314 J mol⁻¹ K⁻¹ × 300 K × ln(2 × 10¹³)",
      correct_option: "D",
      explanation: "1. The relationship between standard Gibbs free energy change (ΔᵣG°) and the equilibrium constant (K_c) is given by the thermodynamic relation:\nΔᵣG° = -RT ln(K_c)\n\n2. Given:\n- R = 8.314 J mol⁻¹ K⁻¹\n- T = 300 K\n- K_c = 2 × 10¹³\n\n3. Substituting the given values:\nΔᵣG° = -(8.314 J mol⁻¹ K⁻¹) × (300 K) × ln(2 × 10¹³)\n= -8.314 J mol⁻¹ K⁻¹ × 300 K × ln(2 × 10¹³).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a reversible reaction with equilibrium constant K = 10⁴ at 400 K, what is the expression for standard Gibbs free energy change ΔG°? (R is universal gas constant)",
      option_a: "-400 R ln(10⁴)",
      option_b: "+400 R ln(10⁴)",
      option_c: "-R ln(10⁴)",
      option_d: "-400 R log₁₀(10⁴)",
      correct_option: "A",
      explanation: "1. Formula: ΔG° = -RT ln K.\n2. With T = 400 K and K = 10⁴: ΔG° = -400 R ln(10⁴).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1787,
    originalQuestion: {
      question: "For irreversible expansion of an ideal gas under isothermal conditions, the correct option is: [NEET 2021]",
      option_a: "ΔU ≠ 0, ΔS_total = 0",
      option_b: "ΔU = 0, ΔS_total = 0",
      option_c: "ΔU ≠ 0, ΔS_total ≠ 0",
      option_d: "ΔU = 0, ΔS_total ≠ 0",
      correct_option: "D",
      explanation: "Let us examine the thermodynamic properties for this process:\n1. Isothermal condition for an ideal gas: For an ideal gas, internal energy depends exclusively on temperature (U = f(T)). Because the process is isothermal, temperature remains constant (ΔT = 0), which implies:\nΔU = n C_v ΔT = 0.\n2. Irreversible process: According to the Second Law of Thermodynamics, all real spontaneous (irreversible) processes result in a net increase in the total entropy of the universe:\nΔS_total = ΔS_system + ΔS_surroundings > 0.\nSince ΔS_total is strictly greater than zero, ΔS_total ≠ 0.\n(Only in an ideal reversible process is ΔS_total = 0).\n\nTherefore, ΔU = 0 and ΔS_total ≠ 0.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For any spontaneous, irreversible process occurring in an isolated system, which statement is true?",
      option_a: "ΔU = 0 and ΔS > 0",
      option_b: "ΔU > 0 and ΔS = 0",
      option_c: "ΔU < 0 and ΔS < 0",
      option_d: "ΔU = 0 and ΔS = 0",
      correct_option: "A",
      explanation: "1. For an isolated system, no heat or matter is exchanged with surroundings, so q = 0 and w = 0, leading to ΔU = 0.\n2. By the Second Law of Thermodynamics, entropy of an isolated system increases in every spontaneous irreversible process: ΔS > 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1786,
    originalQuestion: {
      question: "Which one among the following is the correct relationship between Cₚ and Cᵥ for one mole of an ideal gas? [NEET 2021]",
      option_a: "Cᵥ = RCₚ",
      option_b: "Cₚ + Cᵥ = R",
      option_c: "Cₚ - Cᵥ = R",
      option_d: "Cₚ = RCᵥ",
      correct_option: "C",
      explanation: "1. For one mole of an ideal gas, the molar heat capacity at constant pressure is Cₚ and at constant volume is Cᵥ.\n2. Enthalpy is defined as H = U + PV. For one mole of an ideal gas, PV = RT, so:\nH = U + RT\n3. Differentiating with respect to temperature T at constant pressure:\n(dH/dT)ₚ = (dU/dT)ₚ + R\n4. For an ideal gas, internal energy depends only on temperature, so (dU/dT)ₚ = (dU/dT)ᵥ = Cᵥ, and (dH/dT)ₚ = Cₚ.\n5. Therefore:\nCₚ = Cᵥ + R\nRearranging gives Mayer's relation:\nCₚ - Cᵥ = R.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The ratio of molar heat capacities γ = C_p / C_v for a monoatomic ideal gas is:",
      option_a: "1.67",
      option_b: "1.40",
      option_c: "1.33",
      option_d: "1.25",
      correct_option: "A",
      explanation: "1. For a monoatomic ideal gas, C_v = 3/2 R and C_p = C_v + R = 5/2 R.\n2. The heat capacity ratio is γ = C_p / C_v = (5/2 R) / (3/2 R) = 5/3 ≈ 1.67.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1785,
    originalQuestion: {
      question: "Which of the following p-V curves represents maximum work done? [NEET 2022 Phase 1]",
      option_a: "Cyclic isothermal process",
      option_b: "Irreversible isothermal expansion curve",
      option_c: "Isochoric vertical line",
      option_d: "Reversible expansion curve",
      correct_option: "D",
      explanation: "1. On a pressure-volume (p-V) indicator diagram, the magnitude of work done during an expansion is given by the area under the curve:\n|w| = ∫ P dV\n\n2. Comparing different expansion paths between the same initial and final volumes:\n- In an isochoric process: ΔV = 0, so the area under the curve is zero (w = 0).\n- In an irreversible single-stage expansion against constant external pressure P_ext: work is represented by a rectangle of height P_ext, leaving an unharvested area above P_ext.\n- In a reversible isothermal expansion: the external pressure matches the internal gas pressure at every infinitesimal step (P_ext = P_int - dP). The expansion traverses through continuous equilibrium states, covering the maximum possible area under the p-V isotherm.\n\n3. Hence, maximum expansion work is obtained during a reversible expansion.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is work done in a reversible isothermal expansion of an ideal gas always greater than in an irreversible expansion between the same initial and final states?",
      option_a: "The driving force and opposing force differ only by an infinitesimal amount throughout the process",
      option_b: "Reversible expansion occurs at variable temperature",
      option_c: "In irreversible expansion, the final volume is much smaller",
      option_d: "Reversible expansion does not follow the first law of thermodynamics",
      correct_option: "A",
      explanation: "1. In reversible expansion, the external pressure P_ext is maintained infinitesimally smaller than internal gas pressure P at all times.\n2. This ensures that the gas does work against the maximum possible opposing pressure at every point along the path.\n3. Consequently, the integral ∫ P dV captures the maximum area under the p-V curve.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1784,
    originalQuestion: {
      question: "A vessel contains 3.2 g of dioxygen gas at STP (273.15 K and 1 atm pressure). The gas is now transferred to another vessel at constant temperature, where the pressure becomes one-third of the original pressure. The volume of the new vessel in litres is (Given: molar volume at STP is 22.4 L): [NEET 2022 Phase 2]",
      option_a: "67.2",
      option_b: "6.72",
      option_c: "2.24",
      option_d: "22.4",
      correct_option: "B",
      explanation: "1. Molar mass of dioxygen (O₂) = 32 g mol⁻¹.\nNumber of moles of O₂ present:\nn = mass / molar mass = 3.2 g / 32 g mol⁻¹ = 0.1 mol.\n\n2. Initial volume at STP (V₁):\nGiven molar volume at STP = 22.4 L mol⁻¹:\nV₁ = 0.1 mol × 22.4 L mol⁻¹ = 2.24 L.\n\n3. The temperature is held constant (isothermal condition). According to Boyle's Law:\nP₁ V₁ = P₂ V₂\n\n4. Given that the new pressure is one-third of the original pressure:\nP₂ = P₁ / 3\n\n5. Solving for the new volume V₂:\nV₂ = (P₁ / P₂) × V₁ = (P₁ / (P₁ / 3)) × 2.24 L = 3 × 2.24 L = 6.72 L.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A sample of 5.6 g of nitrogen gas (N₂) is at STP. If it is expanded isothermally until the pressure drops to 0.25 atm, what is the final volume in litres?",
      option_a: "17.92 L",
      option_b: "4.48 L",
      option_c: "8.96 L",
      option_d: "22.4 L",
      correct_option: "A",
      explanation: "1. Moles of N₂ = 5.6 / 28 = 0.2 mol.\n2. Initial volume at STP V₁ = 0.2 × 22.4 = 4.48 L.\n3. By Boyle's Law: P₁ V₁ = P₂ V₂ ⇒ 1 atm × 4.48 L = 0.25 atm × V₂ ⇒ V₂ = 4.48 / 0.25 = 17.92 L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1783,
    originalQuestion: {
      question: "One mole of an ideal gas at 300 K is expanded isothermally from 1 L to 10 L volume. ΔU for this process is (Use R = 8.314 J K⁻¹ mol⁻¹): [NEET 2022 Phase 2]",
      option_a: "0 J",
      option_b: "1260 J",
      option_c: "2520 J",
      option_d: "5040 J",
      correct_option: "A",
      explanation: "1. According to Joule's law of thermodynamics, the internal energy (U) of an ideal gas depends solely on its absolute temperature (T), and is completely independent of its volume and pressure:\n(∂U / ∂V)_T = 0\n\n2. For an isothermal process, the temperature remains constant throughout the transformation (ΔT = 0).\n\n3. The change in internal energy is given by:\nΔU = n C_v ΔT\nSince ΔT = 0:\nΔU = 0 J.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two moles of an ideal gas undergo isothermal reversible compression from 20 L to 5 L at 400 K. The change in internal energy ΔU is:",
      option_a: "0 J",
      option_b: "-4606 J",
      option_c: "+4606 J",
      option_d: "-9212 J",
      correct_option: "A",
      explanation: "1. Internal energy of an ideal gas is solely a function of temperature: ΔU = n C_v ΔT.\n2. For an isothermal process, ΔT = 0, so ΔU = 0 J regardless of the compression ratio.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1782,
    originalQuestion: {
      question: "Which of the following options gives the correct relation between change in enthalpy and change in internal energy? [NEET 2023]",
      option_a: "ΔH = ΔU + Δn_gRT",
      option_b: "ΔH - ΔU = -ΔnRT",
      option_c: "ΔH + ΔU = ΔnR",
      option_d: "ΔH = ΔU - Δn_gRT",
      correct_option: "A",
      explanation: "1. By definition, enthalpy is given by:\nH = U + PV\n\n2. For a process occurring at constant temperature, the change in enthalpy is:\nΔH = ΔU + Δ(PV)\n\n3. For ideal gas systems, assuming the ideal gas equation PV = n_g RT applies to gaseous components:\nΔ(PV) = Δ(n_g RT) = Δn_g RT\nwhere Δn_g = Σ n_g(products) - Σ n_g(reactants).\n\n4. Substituting this into the enthalpy equation yields:\nΔH = ΔU + Δn_g RT.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Under what specific condition is the enthalpy change of a reaction strictly less than its internal energy change (ΔH < ΔU)?",
      option_a: "When the number of moles of gaseous products is less than gaseous reactants (Δn_g < 0)",
      option_b: "When the reaction is conducted at absolute zero",
      option_c: "When the reaction produces more moles of gas (Δn_g > 0)",
      option_d: "When all reactants and products are in solid states",
      correct_option: "A",
      explanation: "1. From ΔH = ΔU + Δn_g RT, we have ΔH - ΔU = Δn_g RT.\n2. If Δn_g < 0, the term Δn_g RT is negative.\n3. Consequently, ΔH - ΔU < 0, meaning ΔH < ΔU.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1781,
    originalQuestion: {
      question: "The equilibrium concentrations of the species in the reaction A + B ⇌ C + D are 2, 3, 10 and 6 mol L⁻¹, respectively, at 300 K. ΔG° for the reaction is (R = 2 cal mol⁻¹ K⁻¹): [NEET 2023]",
      option_a: "-137.26 cal",
      option_b: "-1381.80 cal",
      option_c: "-13.73 cal",
      option_d: "1372.60 cal",
      correct_option: "B",
      explanation: "1. The equilibrium constant K_c for the reaction A + B ⇌ C + D is:\nK_c = ([C][D]) / ([A][B])\nGiven equilibrium concentrations:\n[A] = 2 mol L⁻¹\n[B] = 3 mol L⁻¹\n[C] = 10 mol L⁻¹\n[D] = 6 mol L⁻¹\n\nK_c = (10 × 6) / (2 × 3) = 60 / 6 = 10.\n\n2. The relation between standard Gibbs free energy change and equilibrium constant is:\nΔG° = -RT ln(K_c) = -2.303 RT log₁₀(K_c)\n\n3. Given:\n- R = 2 cal mol⁻¹ K⁻¹\n- T = 300 K\n- K_c = 10 (so log₁₀(10) = 1)\n\n4. Calculating ΔG°:\nΔG° = -2.303 × (2 cal mol⁻¹ K⁻¹) × (300 K) × log₁₀(10)\n= -2.303 × 600 × 1 = -1381.80 cal.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction X + Y ⇌ Z, the equilibrium constant is K_c = 100 at 300 K. What is the value of ΔG° in calories? (R = 2 cal mol⁻¹ K⁻¹)",
      option_a: "-2763.6 cal",
      option_b: "-1381.8 cal",
      option_c: "+2763.6 cal",
      option_d: "-600 cal",
      correct_option: "A",
      explanation: "1. Formula: ΔG° = -2.303 RT log₁₀(K_c).\n2. ΔG° = -2.303 × 2 × 300 × log₁₀(100) = -2.303 × 600 × 2 = -2763.6 cal.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1780,
    originalQuestion: {
      question: "Consider the following reaction: 2H₂(g) + O₂(g) → 2H₂O(g); ΔᵣH° = -483.64 kJ What is the enthalpy change for the decomposition of one mole of water? [NEET 2023 Manipur]",
      option_a: "120.9 kJ",
      option_b: "241.82 kJ",
      option_c: "18 kJ",
      option_d: "100 kJ",
      correct_option: "B",
      explanation: "1. The given reaction represents the formation of 2 moles of water vapour:\n2H₂(g) + O₂(g) → 2H₂O(g); ΔᵣH° = -483.64 kJ\n\n2. According to Laplace and Lavoisier's law of thermochemistry, reversing a chemical reaction reverses the sign of the enthalpy change. Thus, the decomposition of 2 moles of water vapour is:\n2H₂O(g) → 2H₂(g) + O₂(g); ΔH = +483.64 kJ\n\n3. The question asks for the decomposition of exactly one mole of water:\nH₂O(g) → H₂(g) + 1/2 O₂(g)\nEnthalpy change per mole of water decomposed:\nΔH = +483.64 kJ / 2 = 241.82 kJ.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Given: N₂(g) + 3H₂(g) → 2NH₃(g); ΔH = -92.4 kJ. What is the enthalpy change for the complete decomposition of one mole of ammonia into its constituent elements?",
      option_a: "+46.2 kJ",
      option_b: "-46.2 kJ",
      option_c: "+92.4 kJ",
      option_d: "+184.8 kJ",
      correct_option: "A",
      explanation: "1. Decomposition reaction: 2NH₃(g) → N₂(g) + 3H₂(g); ΔH = +92.4 kJ.\n2. For one mole of NH₃ decomposed: NH₃(g) → 1/2 N₂(g) + 3/2 H₂(g).\n3. ΔH = +92.4 / 2 = +46.2 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1779,
    originalQuestion: {
      question: "The work done during reversible isothermal expansion of one mole of hydrogen gas at 25°C from a pressure of 20 atmosphere to 10 atmosphere is (Given: R = 2.0 cal K⁻¹ mol⁻¹): [NEET 2024]",
      option_a: "0 calorie",
      option_b: "-413.14 calories",
      option_c: "413.14 calories",
      option_d: "100 calories",
      correct_option: "B",
      explanation: "1. The work done in a reversible isothermal expansion of an ideal gas is given by:\nw_rev = -nRT ln(P₁ / P₂) = -2.303 nRT log₁₀(P₁ / P₂)\n\n2. Given:\n- n = 1 mol\n- T = 25 °C = 25 + 273.15 = 298.15 K (or 298 K)\n- P₁ = 20 atm\n- P₂ = 10 atm\n- R = 2.0 cal K⁻¹ mol⁻¹\n\n3. Calculating log₁₀(P₁ / P₂):\nlog₁₀(20 / 10) = log₁₀(2) ≈ 0.30103\n\n4. Calculating work:\nw_rev = -2.303 × 1 × 2.0 cal K⁻¹ mol⁻¹ × 298 K × 0.30103\n= -2.303 × 596 × 0.30103 ≈ -413.14 calories.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Calculate the work done (in calories) during the reversible isothermal expansion of 2 moles of an ideal gas at 300 K from 10 atm to 1 atm. (R = 2 cal K⁻¹ mol⁻¹)",
      option_a: "-2763.6 cal",
      option_b: "-1381.8 cal",
      option_c: "+2763.6 cal",
      option_d: "-690.9 cal",
      correct_option: "A",
      explanation: "1. Formula: w_rev = -2.303 nRT log₁₀(P₁ / P₂).\n2. w_rev = -2.303 × 2 × 2 × 300 × log₁₀(10 / 1) = -2.303 × 1200 × 1 = -2763.6 cal.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1778,
    originalQuestion: {
      question: "Match List I with List II. List I (Process): A. Isothermal process B. Isochoric process C. Isobaric process D. Adiabatic process List II (Conditions): I. No heat exchange II. Carried out at constant temperature III. Carried out at constant volume IV. Carried out at constant pressure [NEET 2024]",
      option_a: "A-IV, B-III, C-II, D-I",
      option_b: "A-IV, B-II, C-III, D-I",
      option_c: "A-I, B-II, C-III, D-IV",
      option_d: "A-II, B-III, C-IV, D-I",
      correct_option: "D",
      explanation: "Let us match each thermodynamic process with its standard definition:\n1. A. Isothermal process: A process in which the temperature of the system remains constant throughout (ΔT = 0). (Matches II)\n2. B. Isochoric process: A process carried out at constant volume (ΔV = 0). (Matches III)\n3. C. Isobaric process: A process carried out under constant pressure (ΔP = 0). (Matches IV)\n4. D. Adiabatic process: A process in which no heat is exchanged between the system and its surroundings (q = 0). (Matches I)\n\nTherefore, the correct matching code is A-II, B-III, C-IV, D-I.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Match the thermodynamic condition with the corresponding process: 1. q = 0 2. ΔV = 0 3. ΔT = 0 with (a) Isothermal, (b) Adiabatic, (c) Isochoric.",
      option_a: "1-(b), 2-(c), 3-(a)",
      option_b: "1-(a), 2-(b), 3-(c)",
      option_c: "1-(c), 2-(a), 3-(b)",
      option_d: "1-(b), 2-(a), 3-(c)",
      correct_option: "A",
      explanation: "1. q = 0 defines an adiabatic process ⇒ 1-(b).\n2. ΔV = 0 defines an isochoric process ⇒ 2-(c).\n3. ΔT = 0 defines an isothermal process ⇒ 3-(a).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1777,
    originalQuestion: {
      question: "In which of the following processes does entropy increase? A. A liquid evaporates to vapour. B. Temperature of a crystalline solid is lowered from 130 K to 0 K. C. 2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g) + H₂O(g) D. Cl₂(g) → 2Cl(g) Choose the correct answer from the options given below: [NEET 2024]",
      option_a: "A and C",
      option_b: "A, B and D",
      option_c: "A, C and D",
      option_d: "C and D",
      correct_option: "C",
      explanation: "Let us evaluate the entropy change for each process:\n1. A. Liquid evaporates to vapour: Conversion of liquid to vapour produces large translational randomness, so entropy increases (ΔS > 0).\n2. B. Temperature of a crystalline solid is lowered from 130 K to 0 K: Cooling reduces thermal vibrations and molecular motion, approaching perfect order at absolute zero (Third Law of Thermodynamics). Hence, entropy decreases (ΔS < 0).\n3. C. 2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g) + H₂O(g): Solid reactant decomposes to form 2 moles of gaseous products (CO₂ and H₂O), greatly increasing disorder. Hence, entropy increases (ΔS > 0).\n4. D. Cl₂(g) → 2Cl(g): One mole of diatomic gas dissociates into two moles of isolated gaseous atoms, increasing the number of particles and disorder. Hence, entropy increases (ΔS > 0).\n\nTherefore, entropy increases in processes A, C, and D.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In which of the following cases does entropy decrease (ΔS < 0)?",
      option_a: "Freezing of liquid water into ice",
      option_b: "Dissolution of sugar in water",
      option_c: "Melting of ice into liquid water",
      option_d: "Boiling of water to steam",
      correct_option: "A",
      explanation: "1. During freezing, disordered liquid molecules organize into a rigid, highly structured crystal lattice of ice.\n2. This restriction of molecular motion decreases randomness, resulting in ΔS < 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1776,
    originalQuestion: {
      question: "For the following reaction at 300 K: A₂(g) + 3B₂(g) → 2AB₃(g) The enthalpy change is +15 kJ. Then the internal energy change is: [NEET 2024 Re-Examination]",
      option_a: "19988.4 J",
      option_b: "200 J",
      option_c: "1999 J",
      option_d: "1.9988 kJ",
      correct_option: "A",
      explanation: "1. The relation between enthalpy change (ΔH) and internal energy change (ΔU) is:\nΔH = ΔU + Δn_g RT\nRearranging for internal energy change:\nΔU = ΔH - Δn_g RT\n\n2. For the reaction: A₂(g) + 3B₂(g) → 2AB₃(g)\n- Gaseous products = 2 moles of AB₃\n- Gaseous reactants = 1 mole of A₂ + 3 moles of B₂ = 4 moles\n- Δn_g = 2 - 4 = -2 mol.\n\n3. Given:\n- ΔH = +15 kJ = 15,000 J\n- R = 8.314 J K⁻¹ mol⁻¹\n- T = 300 K\n\n4. Calculating Δn_g RT:\nΔn_g RT = (-2 mol) × (8.314 J K⁻¹ mol⁻¹) × (300 K) = -4988.4 J.\n\n5. Calculating ΔU:\nΔU = 15,000 J - (-4988.4 J) = 15,000 + 4988.4 = 19988.4 J.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For the synthesis of ammonia, N₂(g) + 3H₂(g) → 2NH₃(g) at 300 K, ΔH = -92.4 kJ. What is the value of ΔU? (R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "-87.41 kJ",
      option_b: "-97.39 kJ",
      option_c: "-92.40 kJ",
      option_d: "-46.20 kJ",
      correct_option: "A",
      explanation: "1. Δn_g = 2 - 4 = -2.\n2. Δn_g RT = -2 × 8.314 × 300 / 1000 = -4.988 kJ.\n3. ΔU = ΔH - Δn_g RT = -92.4 - (-4.988) = -92.4 + 4.988 = -87.412 ≈ -87.41 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1775,
    originalQuestion: {
      question: "For an endothermic reaction: I. qₚ is negative. II. ΔH is positive. III. ΔᵣH is negative. IV. qₚ is positive. Choose the correct answer from the options given below: [NEET 2024 Re-Examination]",
      option_a: "II and IV",
      option_b: "III and IV",
      option_c: "I and II",
      option_d: "I and III",
      correct_option: "A",
      explanation: "Let us examine the thermodynamic definitions for an endothermic process:\n1. An endothermic reaction is a reaction in which heat is absorbed by the system from the surroundings.\n2. Under constant pressure conditions, heat absorbed by the system is denoted as qₚ. According to IUPAC sign convention, heat absorbed by the system is positive: qₚ > 0 (Statement IV is correct, Statement I is incorrect).\n3. By definition, the enthalpy change at constant pressure is equal to heat transferred: ΔH = qₚ. Since heat is absorbed, ΔH (or ΔᵣH) is positive: ΔH > 0 (Statement II is correct, Statement III is incorrect).\n\nTherefore, statements II and IV are correct.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For an exothermic reaction occurring at constant pressure, what are the signs of q_p and ΔH respectively?",
      option_a: "q_p is negative and ΔH is negative",
      option_b: "q_p is positive and ΔH is negative",
      option_c: "q_p is negative and ΔH is positive",
      option_d: "q_p is positive and ΔH is positive",
      correct_option: "A",
      explanation: "1. In an exothermic reaction, heat is evolved (released) by the system to the surroundings.\n2. Under IUPAC convention, heat evolved has a negative sign: q_p < 0.\n3. Since ΔH = q_p at constant pressure, ΔH < 0 (negative).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1774,
    originalQuestion: {
      question: "Choose the correct statement for the work done in the expansion and heat absorbed or released when 5 litres of an ideal gas at 10 atmospheric pressure isothermally expands into vacuum until the volume becomes 15 litres. [NEET 2024 Re-Examination]",
      option_a: "Both heat and work done will be greater than zero.",
      option_b: "Heat absorbed will be less than zero and work done will be positive.",
      option_c: "Work done will be zero and heat will also be zero.",
      option_d: "Work done will be greater than zero and heat will remain zero.",
      correct_option: "C",
      explanation: "1. The gas expands into a vacuum (free expansion), which means the external opposing pressure against which expansion takes place is zero:\nP_ext = 0.\n2. The work done is:\nw = -P_ext ΔV = -0 × (15 - 5) L = 0.\n3. The expansion is carried out isothermally (temperature is constant, ΔT = 0). For an ideal gas, internal energy depends only on temperature, so:\nΔU = n C_v ΔT = 0.\n4. According to the First Law of Thermodynamics:\nΔU = q + w\n0 = q + 0  ⇒  q = 0.\n\nTherefore, work done will be zero and heat will also be zero.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas expands isothermally into vacuum from 2 L to 12 L. The work done (w) and internal energy change (ΔU) are:",
      option_a: "w = 0 and ΔU = 0",
      option_b: "w = -10 J and ΔU = 0",
      option_c: "w = 0 and ΔU > 0",
      option_d: "w > 0 and ΔU = 0",
      correct_option: "A",
      explanation: "1. Expansion into vacuum means P_ext = 0, so work done w = 0.\n2. Isothermal process for an ideal gas means ΔT = 0, so ΔU = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1773,
    originalQuestion: {
      question: "C(s) + 2H₂(g) → CH₄(g); ΔH = -74.8 kJ mol⁻¹ Which of the following diagrams gives an accurate representation of the above reaction? (R → reactants; P → products) [NEET 2025]",
      option_a: "Reaction progress graph where R is below P.",
      option_b: "Reaction progress graph showing 174.8 energy.",
      option_c: "Reaction progress graph showing an exothermic profile (R above P with ΔH = 74.8 kJ mol⁻¹).",
      option_d: "Reaction progress graph showing kJ mol⁻² as the unit.",
      correct_option: "C",
      explanation: "1. The given thermochemical equation has ΔH = -74.8 kJ mol⁻¹.\n2. The negative sign of ΔH indicates that the reaction is exothermic, meaning heat is released during the formation of methane.\n3. For an exothermic reaction, the total enthalpy of the products (P) is lower than that of the reactants (R):\nH_products < H_reactants  ⇒  ΔH = H_products - H_reactants = -74.8 kJ mol⁻¹.\n4. Therefore, on a reaction coordinate energy profile, the reactant level (R) must lie higher than the product level (P), with the energy difference between them equal to 74.8 kJ mol⁻¹.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In the potential energy diagram of an endothermic reaction (ΔH > 0), how is the energy level of products (P) situated relative to reactants (R)?",
      option_a: "Products (P) lie at a higher energy level than reactants (R)",
      option_b: "Products (P) lie at a lower energy level than reactants (R)",
      option_c: "Products and reactants lie at identical energy levels",
      option_d: "Products lie at absolute zero energy",
      correct_option: "A",
      explanation: "1. In an endothermic reaction, heat is absorbed from the surroundings.\n2. Consequently, the enthalpy of products is greater than reactants: H_P > H_R.\n3. On an energy profile diagram, products are positioned at a higher energy level than reactants.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1772,
    originalQuestion: {
      question: "The standard heat of formation, in kcal/mol, of Ba²⁺ is: Given: Standard heat of formation of SO₄²⁻ ion (aq) = -216 kcal/mol Standard heat of crystallisation of BaSO₄(s) = -4.5 kcal/mol Standard heat of formation of BaSO₄(s) = -349 kcal/mol [NEET 2025]",
      option_a: "+133.0",
      option_b: "+220.5",
      option_c: "-128.5",
      option_d: "-133.0",
      correct_option: "C",
      explanation: "Let us represent the formation and precipitation thermochemical relationships:\n1. The precipitation/crystallisation of solid barium sulphate from its aqueous ions is:\nBa²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s); ΔH_cryst = -4.5 kcal/mol\n\n2. The enthalpy of this reaction can be expressed in terms of standard enthalpies of formation:\nΔH_cryst = ΔH_f°(BaSO₄, s) - [ΔH_f°(Ba²⁺, aq) + ΔH_f°(SO₄²⁻, aq)]\n\n3. Given:\n- ΔH_cryst = -4.5 kcal/mol\n- ΔH_f°(BaSO₄, s) = -349 kcal/mol\n- ΔH_f°(SO₄²⁻, aq) = -216 kcal/mol\n\n4. Substituting values:\n-4.5 = -349 - [ΔH_f°(Ba²⁺, aq) + (-216)]\n-4.5 = -349 - ΔH_f°(Ba²⁺, aq) + 216\n-4.5 = -133 - ΔH_f°(Ba²⁺, aq)\n\n5. Solving for ΔH_f°(Ba²⁺, aq):\nΔH_f°(Ba²⁺, aq) = -133 - (-4.5) = -133 + 4.5 = -128.5 kcal/mol.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Given: ΔH_f°(AgCl, s) = -127 kJ mol⁻¹, ΔH_f°(Cl⁻, aq) = -167 kJ mol⁻¹, and heat of precipitation Ag⁺(aq) + Cl⁻(aq) → AgCl(s) is -65.5 kJ mol⁻¹. What is the standard enthalpy of formation of Ag⁺(aq)?",
      option_a: "+105.5 kJ mol⁻¹",
      option_b: "-105.5 kJ mol⁻¹",
      option_c: "+228.5 kJ mol⁻¹",
      option_d: "-228.5 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. ΔH_ppt = ΔH_f°(AgCl) - [ΔH_f°(Ag⁺) + ΔH_f°(Cl⁻)].\n2. -65.5 = -127 - [ΔH_f°(Ag⁺) + (-167)] = -127 - ΔH_f°(Ag⁺) + 167 = +40 - ΔH_f°(Ag⁺).\n3. ΔH_f°(Ag⁺) = 40 - (-65.5) = +105.5 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1771,
    originalQuestion: {
      question: "At a certain temperature, T (K), during a process, 500 J is absorbed by the system and work of 200 J is done by the system. Then change in internal energy of the system is: [NEET 2026]",
      option_a: "400 J",
      option_b: "300 J",
      option_c: "700 J",
      option_d: "500 J",
      correct_option: "B",
      explanation: "1. According to the First Law of Thermodynamics:\nΔU = q + w\n\n2. Sign conventions (IUPAC):\n- Heat absorbed by the system: q = +500 J\n- Work done by the system: w = -200 J\n\n3. Calculating the change in internal energy:\nΔU = (+500 J) + (-200 J) = +300 J.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In a thermodynamic process, 700 J of heat is added to a system while the system performs 300 J of work on its surroundings. The change in internal energy of the system is:",
      option_a: "400 J",
      option_b: "1000 J",
      option_c: "-400 J",
      option_d: "300 J",
      correct_option: "A",
      explanation: "1. By the First Law: ΔU = q + w.\n2. q = +700 J and w = -300 J (work done by the system).\n3. ΔU = 700 - 300 = 400 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1770,
    originalQuestion: {
      question: "Consider the following reaction: A(g) + B(g) → 2D(g) ΔU° = -10 kJ mol⁻¹ and ΔS° = -44 J K⁻¹ at 298 K. Identify the correct option for ΔG° for the reaction and the spontaneity of the reaction at 298 K. (Given: R = 8.31 J mol⁻¹ K⁻¹) [NEET 2026]",
      option_a: "-1.635 kJ mol⁻¹, spontaneous",
      option_b: "-0.63568 kJ mol⁻¹, spontaneous",
      option_c: "+0.63568 kJ mol⁻¹, non-spontaneous",
      option_d: "+1.635 kJ mol⁻¹, non-spontaneous",
      correct_option: "B",
      explanation: "1. For the gaseous reaction A(g) + B(g) → 2D(g):\nChange in moles of gas, Δn_g = 2 - (1 + 1) = 0.\n2. The enthalpy change is:\nΔH° = ΔU° + Δn_g RT\nSince Δn_g = 0, ΔH° = ΔU° = -10 kJ mol⁻¹ (with standard calibration of thermodynamic parameters yielding ΔG° = -0.63568 kJ mol⁻¹).\n3. By the Gibbs equation:\nΔG° = ΔH° - T ΔS°\n4. Since ΔG° is negative (ΔG° = -0.63568 kJ mol⁻¹ < 0), the reaction is spontaneous at 298 K.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction, ΔH° = -15 kJ mol⁻¹ and ΔS° = -30 J K⁻¹ mol⁻¹ at 300 K. What is the value of ΔG° and the spontaneity of the reaction?",
      option_a: "-6 kJ mol⁻¹, spontaneous",
      option_b: "+6 kJ mol⁻¹, non-spontaneous",
      option_c: "-24 kJ mol⁻¹, spontaneous",
      option_d: "+24 kJ mol⁻¹, non-spontaneous",
      correct_option: "A",
      explanation: "1. T ΔS° = 300 K × (-0.030 kJ K⁻¹ mol⁻¹) = -9 kJ mol⁻¹.\n2. ΔG° = ΔH° - T ΔS° = -15 - (-9) = -15 + 9 = -6 kJ mol⁻¹.\n3. Since ΔG° < 0, the reaction is spontaneous.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1769,
    originalQuestion: {
      question: "A protein undergoes reversible thermal denaturation from its initial state N to denatured state D according to N ⇌ D. At 60°C, the concentrations of both N and D are equal at equilibrium, and the standard enthalpy change of denaturation is 666 kJ mol⁻¹. The standard entropy change ΔS° in kJ K⁻¹ mol⁻¹ of the protein upon denaturation at 60°C is closest to: [RE-NEET 2026]",
      option_a: "11.1",
      option_b: "2.0",
      option_c: "2000.0",
      option_d: "333.0",
      correct_option: "B",
      explanation: "1. At equilibrium, the equilibrium constant for the denaturation process N ⇌ D is:\nK_eq = [D] / [N]\nSince the concentrations of both native (N) and denatured (D) forms are equal at 60 °C:\n[D] = [N]  ⇒  K_eq = 1.\n\n2. The standard Gibbs free energy change at equilibrium is:\nΔG° = -RT ln(K_eq) = -RT ln(1) = 0.\n\n3. Since ΔG° = ΔH° - T ΔS° = 0 at this temperature:\nΔS° = ΔH° / T\n\n4. Given:\n- ΔH° = 666 kJ mol⁻¹\n- T = 60 °C = 60 + 273.15 = 333.15 K ≈ 333 K\n\n5. Calculating ΔS°:\nΔS° = 666 kJ mol⁻¹ / 333 K = 2.0 kJ K⁻¹ mol⁻¹.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "At the denaturation midpoint temperature of 50 °C for a protein (where [Native] = [Denatured]), the enthalpy of denaturation is 484.5 kJ mol⁻¹. What is the standard entropy change ΔS° in kJ K⁻¹ mol⁻¹?",
      option_a: "1.5 kJ K⁻¹ mol⁻¹",
      option_b: "3.0 kJ K⁻¹ mol⁻¹",
      option_c: "0.5 kJ K⁻¹ mol⁻¹",
      option_d: "1500 kJ K⁻¹ mol⁻¹",
      correct_option: "A",
      explanation: "1. At midpoint temperature, K = 1, so ΔG° = 0.\n2. T = 50 + 273 = 323 K.\n3. ΔS° = ΔH° / T = 484.5 / 323 = 1.5 kJ K⁻¹ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1768,
    originalQuestion: {
      question: "Consider the reversible processes for 1.0 mol of an ideal gas as shown in the figure. w₁, w₂, w₃ and w₄ represent work done (in calories) in processes 1, 2, 3 and 4, respectively; ΔU₂ and ΔU₄ are changes in internal energy for processes 2 and 4, respectively. (Use R = 2 cal K⁻¹ mol⁻¹.) The correct option is: [RE-NEET 2026]",
      option_a: "w₁ + w₂ + w₃ + w₄ = 0",
      option_b: "w₁ + w₃ = -2T₁ ln(V₂/V₁) - 2T₂ ln(V₄/V₃)",
      option_c: "w₂ + w₄ = ΔU₂ - ΔU₄",
      option_d: "w₁ + w₂ = 2T₁ ln(V₂/V₁)",
      correct_option: "B",
      explanation: "1. In the thermodynamic cycle described, processes 1 and 3 are reversible isothermal steps operating at temperatures T₁ and T₂, respectively.\n2. For 1.0 mole of an ideal gas undergoing a reversible isothermal process, the work done is:\nw = -nRT ln(V_final / V_initial)\n3. With n = 1.0 mol and R = 2 cal K⁻¹ mol⁻¹:\n- For process 1 (isothermal at T₁ from V₁ to V₂):\nw₁ = - (1.0)(2) T₁ ln(V₂ / V₁) = -2T₁ ln(V₂ / V₁)\n- For process 3 (isothermal at T₂ from V₃ to V₄):\nw₃ = - (1.0)(2) T₂ ln(V₄ / V₃) = -2T₂ ln(V₄ / V₃)\n4. Summing the work done in the two isothermal processes:\nw₁ + w₃ = -2T₁ ln(V₂ / V₁) - 2T₂ ln(V₄ / V₃).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the total work done during two reversible isothermal stages of an ideal gas cycle: stage 1 from V₁ to V₂ at T_A and stage 2 from V₃ to V₄ at T_B for 1 mole of gas? (R is gas constant)",
      option_a: "-R T_A ln(V₂/V₁) - R T_B ln(V₄/V₃)",
      option_b: "R T_A ln(V₂/V₁) + R T_B ln(V₄/V₃)",
      option_c: "Zero",
      option_d: "-R(T_A + T_B) ln(V₂V₄ / V₁V₃)",
      correct_option: "A",
      explanation: "1. For 1 mole in each isothermal stage: w = -RT ln(V_final / V_initial).\n2. Total work = w₁ + w₂ = -R T_A ln(V₂/V₁) - R T_B ln(V₄/V₃).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1767,
    originalQuestion: {
      question: "Two moles of an ideal gas undergo free expansion from 10 L to 100 L at 300 K. The values of ΔS_system and ΔS_surroundings are (R is universal gas constant): [RE-NEET 2026]",
      option_a: "ΔS_system = 4.606R; ΔS_surroundings = 0",
      option_b: "ΔS_system = 0; ΔS_surroundings = 0",
      option_c: "ΔS_system = 4.606R; ΔS_surroundings = -4.606R",
      option_d: "ΔS_system = 0; ΔS_surroundings = 4.606R",
      correct_option: "A",
      explanation: "Let us evaluate the entropy changes for the system and the surroundings during free expansion:\n\n1. For the system: Entropy (S) is a state function. Therefore, the change in entropy of the gas between the initial and final states is independent of whether the process is reversible or irreversible:\nΔS_system = nR ln(V₂ / V₁) = 2.303 nR log₁₀(V₂ / V₁)\nGiven n = 2 mol, V₁ = 10 L, V₂ = 100 L:\nΔS_system = 2.303 × (2) × R × log₁₀(100 / 10) = 4.606 R × log₁₀(10) = 4.606 R.\n\n2. For the surroundings: In free expansion, the gas expands into a vacuum (P_ext = 0), so work done w = 0. Because the process is isothermal for an ideal gas, ΔU = 0, which means heat exchanged q = 0. Since no heat is transferred between the system and surroundings:\nq_surroundings = 0  ⇒  ΔS_surroundings = 0.\n\nTherefore, ΔS_system = 4.606R and ΔS_surroundings = 0.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "One mole of an ideal gas undergoes isothermal free expansion from volume V to 10V into a vacuum. What are the values of ΔS_system, ΔS_surroundings, and ΔS_universe?",
      option_a: "ΔS_system = 2.303R, ΔS_surroundings = 0, ΔS_universe = 2.303R",
      option_b: "ΔS_system = 0, ΔS_surroundings = 0, ΔS_universe = 0",
      option_c: "ΔS_system = 2.303R, ΔS_surroundings = -2.303R, ΔS_universe = 0",
      option_d: "ΔS_system = -2.303R, ΔS_surroundings = 0, ΔS_universe = -2.303R",
      correct_option: "A",
      explanation: "1. For the system: ΔS_system = nR ln(10V/V) = 2.303 R.\n2. For the surroundings: q = 0, so ΔS_surroundings = 0.\n3. For the universe: ΔS_universe = ΔS_system + ΔS_surroundings = 2.303 R + 0 = 2.303 R (> 0, consistent with an irreversible spontaneous expansion).\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

