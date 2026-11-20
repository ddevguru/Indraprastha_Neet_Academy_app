// ch55_part2.js - Questions 30 to 59 (IDs 1821 down to 1792)
module.exports = [
  {
    id: 1821,
    originalQuestion: {
      question: "Consider the following reactions: (i) H⁺(aq) + OH⁻(aq) → H₂O(l); ΔH = -X₁ kJ mol⁻¹ (ii) H₂(g) + 1/2 O₂(g) → H₂O(l); ΔH = -X₂ kJ mol⁻¹ (iii) CO₂(g) + H₂(g) → CO(g) + H₂O(l); ΔH = -X₃ kJ mol⁻¹ (iv) C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(l); ΔH = +X₄ kJ mol⁻¹ The enthalpy of formation of H₂O(l) is: [AIPMT 2007]",
      option_a: "+X₃ kJ mol⁻¹",
      option_b: "-X₄ kJ mol⁻¹",
      option_c: "+X₁ kJ mol⁻¹",
      option_d: "-X₂ kJ mol⁻¹",
      correct_option: "D",
      explanation: "1. The standard enthalpy of formation (ΔH_f°) of a compound is defined as the enthalpy change accompanying the formation of one mole of the substance from its constituent elements in their most stable reference states at 298 K and 1 bar.\n2. For liquid water, H₂O(l), the constituent elements in their standard reference states are hydrogen gas, H₂(g), and oxygen gas, O₂(g).\n3. Reaction (ii) represents exactly this process:\nH₂(g) + 1/2 O₂(g) → H₂O(l); ΔH = -X₂ kJ mol⁻¹.\n4. Therefore, the standard enthalpy of formation of H₂O(l) is equal to the enthalpy change of reaction (ii), which is -X₂ kJ mol⁻¹.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following thermochemical equations represents the standard enthalpy of formation of liquid methanol (CH₃OH(l))?",
      option_a: "CO(g) + 2H₂(g) → CH₃OH(l)",
      option_b: "C(graphite) + 2H₂(g) + 1/2 O₂(g) → CH₃OH(l)",
      option_c: "CH₄(g) + 1/2 O₂(g) → CH₃OH(l)",
      option_d: "C(diamond) + 2H₂(g) + 1/2 O₂(g) → CH₃OH(l)",
      correct_option: "B",
      explanation: "1. Standard enthalpy of formation requires forming 1 mole of product from its elements in their standard states.\n2. The standard reference states are: carbon as graphite, hydrogen as H₂(g), and oxygen as O₂(g).\n3. Equation C(graphite) + 2H₂(g) + 1/2 O₂(g) → CH₃OH(l) satisfies all criteria.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1820,
    originalQuestion: {
      question: "Which of the following are not state functions? (I) q + w (II) q (III) w (IV) H - TS [AIPMT 2008]",
      option_a: "(I), (II) and (III)",
      option_b: "(II) and (III)",
      option_c: "(I) and (IV)",
      option_d: "(II), (III) and (IV)",
      correct_option: "B",
      explanation: "Let us classify each quantity:\n1. (I) q + w: According to the First Law of Thermodynamics, q + w = ΔU (change in internal energy). Since internal energy (U) is a state function, its change ΔU depends only on initial and final states, not on the path. Hence, q + w is a state function.\n2. (II) q (heat) and (III) w (work): Both heat and work depend on the specific path taken between states; they are path functions, not state functions.\n3. (IV) H - TS: This defines the Gibbs free energy function, G = H - TS. Since H, T, and S are all state variables, G is a state function.\n\nTherefore, only (II) and (III) are not state functions.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following thermodynamic quantities is a path function rather than a state function?",
      option_a: "Enthalpy (H)",
      option_b: "Internal energy (U)",
      option_c: "Work done (w)",
      option_d: "Entropy (S)",
      correct_option: "C",
      explanation: "1. State functions depend only on the state of the system (initial and final), not on how that state was achieved (e.g., U, H, S, G, P, V, T).\n2. Work done (w) and heat transferred (q) depend on the thermodynamic path taken during the transformation and are path functions.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1819,
    originalQuestion: {
      question: "For the gas-phase reaction, PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), which of the following conditions are correct? [AIPMT 2008]",
      option_a: "ΔH < 0 and ΔS < 0",
      option_b: "ΔH > 0 and ΔS < 0",
      option_c: "ΔH = 0 and ΔS < 0",
      option_d: "ΔH > 0 and ΔS > 0",
      correct_option: "D",
      explanation: "Let us evaluate ΔH and ΔS for the thermal dissociation of PCl₅:\n1. Enthalpy change (ΔH): Dissociation of one mole of PCl₅ into PCl₃ and Cl₂ requires the cleavage of two axial P-Cl bonds, which absorbs energy. Hence, the decomposition is endothermic: ΔH > 0.\n2. Entropy change (ΔS): The reaction produces two moles of gaseous products (PCl₃ + Cl₂) from one mole of gaseous reactant (PCl₅). The increase in the number of gaseous molecules increases the randomness and translational degrees of freedom of the system. Hence, the entropy change is positive: ΔS > 0.\n\nTherefore, ΔH > 0 and ΔS > 0.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction N₂O₄(g) ⇌ 2NO₂(g), what are the signs of ΔH and ΔS respectively?",
      option_a: "ΔH > 0 and ΔS > 0",
      option_b: "ΔH < 0 and ΔS > 0",
      option_c: "ΔH > 0 and ΔS < 0",
      option_d: "ΔH < 0 and ΔS < 0",
      correct_option: "A",
      explanation: "1. The dissociation of the N-N bond in N₂O₄ requires heat input, making the process endothermic: ΔH > 0.\n2. One mole of gas dissociates into two moles of gas, increasing molecular randomness: ΔS > 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1818,
    originalQuestion: {
      question: "The bond dissociation enthalpies of H₂, Cl₂ and HCl are 434, 242 and 431 kJ mol⁻¹, respectively. The enthalpy of formation of HCl is: [AIPMT 2008]",
      option_a: "-93 kJ mol⁻¹",
      option_b: "245 kJ mol⁻¹",
      option_c: "93 kJ mol⁻¹",
      option_d: "-245 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. The formation reaction for one mole of HCl(g) is:\n1/2 H₂(g) + 1/2 Cl₂(g) → HCl(g)\n\n2. The standard enthalpy of formation in terms of bond dissociation enthalpies is:\nΔH_f°(HCl) = [1/2 BE(H₂) + 1/2 BE(Cl₂)] - BE(HCl)\n\n3. Given:\n- BE(H₂) = 434 kJ mol⁻¹\n- BE(Cl₂) = 242 kJ mol⁻¹\n- BE(HCl) = 431 kJ mol⁻¹\n\n4. Substituting values:\nΔH_f°(HCl) = [1/2(434) + 1/2(242)] - 431\n= [217 + 121] - 431\n= 338 - 431 = -93 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Given bond dissociation energies: BE(H-H) = 436 kJ mol⁻¹, BE(F-F) = 158 kJ mol⁻¹, and BE(H-F) = 568 kJ mol⁻¹. Calculate the enthalpy of formation of HF(g).",
      option_a: "-271 kJ mol⁻¹",
      option_b: "-542 kJ mol⁻¹",
      option_c: "+271 kJ mol⁻¹",
      option_d: "-135.5 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Reaction: 1/2 H₂(g) + 1/2 F₂(g) → HF(g).\n2. ΔH_f° = [1/2 BE(H₂) + 1/2 BE(F₂)] - BE(HF)\n= [1/2(436) + 1/2(158)] - 568 = [218 + 79] - 568 = 297 - 568 = -271 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1817,
    originalQuestion: {
      question: "The following bond energies are given: H-H bond energy = 431.37 kJ mol⁻¹ C=C bond energy = 606.10 kJ mol⁻¹ C-C bond energy = 336.49 kJ mol⁻¹ C-H bond energy = 410.50 kJ mol⁻¹ The enthalpy change for the reaction CH₂=CH₂ + H₂ → CH₃-CH₃ will be: [AIPMT 2009]",
      option_a: "-243.6 kJ mol⁻¹",
      option_b: "-120.0 kJ mol⁻¹",
      option_c: "553.0 kJ mol⁻¹",
      option_d: "1523.6 kJ mol⁻¹",
      correct_option: "B",
      explanation: "For the hydrogenation reaction:\nCH₂=CH₂(g) + H₂(g) → CH₃-CH₃(g)\n\n1. Net bonds broken (reactants):\n- One C=C double bond: 606.10 kJ mol⁻¹\n- One H-H single bond: 431.37 kJ mol⁻¹\n(The four C-H bonds in ethene remain in ethane, so they cancel out).\nTotal energy absorbed = 606.10 + 431.37 = 1037.47 kJ mol⁻¹\n\n2. Net bonds formed (products):\n- One C-C single bond: 336.49 kJ mol⁻¹\n- Two new C-H single bonds: 2 × 410.50 = 821.00 kJ mol⁻¹\nTotal energy released = 336.49 + 821.00 = 1157.49 kJ mol⁻¹\n\n3. Enthalpy change:\nΔH = Energy absorbed - Energy released\nΔH = 1037.47 - 1157.49 = -120.02 kJ mol⁻¹ ≈ -120.0 kJ mol⁻¹.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Using bond energies: BE(C=C) = 612 kJ mol⁻¹, BE(H-H) = 436 kJ mol⁻¹, BE(C-C) = 348 kJ mol⁻¹, and BE(C-H) = 414 kJ mol⁻¹, calculate the enthalpy change for the hydrogenation of ethene to ethane.",
      option_a: "-128 kJ mol⁻¹",
      option_b: "-256 kJ mol⁻¹",
      option_c: "+128 kJ mol⁻¹",
      option_d: "-64 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Bonds broken: BE(C=C) + BE(H-H) = 612 + 436 = 1048 kJ mol⁻¹.\n2. Bonds formed: BE(C-C) + 2 × BE(C-H) = 348 + 2(414) = 348 + 828 = 1176 kJ mol⁻¹.\n3. ΔH = 1048 - 1176 = -128 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1816,
    originalQuestion: {
      question: "The values of ΔH and ΔS for the reaction C(graphite) + CO₂(g) → 2CO(g) are 170 kJ and 170 J K⁻¹, respectively. This reaction will be spontaneous at: [AIPMT 2009]",
      option_a: "910 K",
      option_b: "1110 K",
      option_c: "510 K",
      option_d: "710 K",
      correct_option: "B",
      explanation: "1. For a reaction to be spontaneous at constant temperature and pressure, the Gibbs free energy change must be negative:\nΔG = ΔH - T ΔS < 0\n\n2. When both ΔH > 0 and ΔS > 0:\nΔH - T ΔS < 0 ⇒ T ΔS > ΔH ⇒ T > ΔH / ΔS\n\n3. Given:\n- ΔH = 170 kJ = 170,000 J\n- ΔS = 170 J K⁻¹\n\n4. Equilibrium temperature:\nT_eq = 170,000 J / 170 J K⁻¹ = 1000 K.\n\n5. The reaction is spontaneous only at temperatures strictly above 1000 K (T > 1000 K).\nAmong the given choices (910 K, 1110 K, 510 K, 710 K), only 1110 K exceeds 1000 K.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction, ΔH = 200 kJ mol⁻¹ and ΔS = 250 J K⁻¹ mol⁻¹. Above which temperature will the reaction become thermodynamically spontaneous?",
      option_a: "800 K",
      option_b: "500 K",
      option_c: "1000 K",
      option_d: "250 K",
      correct_option: "A",
      explanation: "1. Spontaneity condition: T > ΔH / ΔS.\n2. T > (200 × 10³ J mol⁻¹) / (250 J K⁻¹ mol⁻¹) = 800 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1815,
    originalQuestion: {
      question: "The standard entropies of X₂, Y₂ and XY₃ are 60, 40 and 50 J K⁻¹ mol⁻¹, respectively. For the reaction 1/2 X₂ + 3/2 Y₂ ⇌ XY₃; ΔH = -30 kJ, to be at equilibrium, the temperature should be: [AIPMT 2010 Prelims]",
      option_a: "750 K",
      option_b: "1000 K",
      option_c: "1250 K",
      option_d: "500 K",
      correct_option: "A",
      explanation: "1. The standard entropy change of the reaction is:\nΔS° = S°(XY₃) - [1/2 S°(X₂) + 3/2 S°(Y₂)]\n\n2. Given standard entropies:\n- S°(X₂) = 60 J K⁻¹ mol⁻¹\n- S°(Y₂) = 40 J K⁻¹ mol⁻¹\n- S°(XY₃) = 50 J K⁻¹ mol⁻¹\n\n3. Calculating ΔS°:\nΔS° = 50 - [1/2(60) + 3/2(40)] = 50 - [30 + 60] = 50 - 90 = -40 J K⁻¹ mol⁻¹.\n\n4. At equilibrium, ΔG° = 0:\nΔH° - T ΔS° = 0 ⇒ T = ΔH° / ΔS°\nGiven ΔH° = -30 kJ = -30,000 J:\nT = -30,000 J / (-40 J K⁻¹) = 750 K.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For the equilibrium A₂(g) + B₂(g) ⇌ 2AB(g), standard entropies are S°(A₂) = 120, S°(B₂) = 100, and S°(AB) = 80 J K⁻¹ mol⁻¹. If ΔH° = -40 kJ, at what temperature is the reaction at equilibrium?",
      option_a: "667 K",
      option_b: "400 K",
      option_c: "1000 K",
      option_d: "800 K",
      correct_option: "A",
      explanation: "1. ΔS° = 2(80) - (120 + 100) = 160 - 220 = -60 J K⁻¹.\n2. T = ΔH° / ΔS° = -40,000 / -60 ≈ 666.67 K ≈ 667 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1814,
    originalQuestion: {
      question: "For an endothermic reaction, the energy of activation is Eₐ and the enthalpy of reaction is ΔH (both in kJ/mol). The minimum value of Eₐ will be: [AIPMT 2010 Prelims]",
      option_a: "Less than ΔH",
      option_b: "Equal to ΔH",
      option_c: "More than ΔH",
      option_d: "Equal to zero",
      correct_option: "C",
      explanation: "1. The enthalpy change of a chemical reaction is related to the activation energies of forward and reverse reactions by:\nΔH = E_a(forward) - E_a(backward)\n\n2. For an endothermic reaction, products have higher energy than reactants, so ΔH > 0.\nRearranging for forward activation energy E_a(forward):\nE_a(forward) = ΔH + E_a(backward)\n\n3. Since every chemical reaction involves an activated complex with an activation barrier for the reverse step, E_a(backward) must be strictly greater than zero (E_a(backward) > 0).\n4. Therefore:\nE_a(forward) > ΔH.\n5. Hence, the minimum value of E_a must be more than ΔH.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For an exothermic reaction with enthalpy of reaction ΔH = -50 kJ mol⁻¹ and forward activation energy E_a(forward) = 70 kJ mol⁻¹, the activation energy for the reverse reaction is:",
      option_a: "120 kJ mol⁻¹",
      option_b: "20 kJ mol⁻¹",
      option_c: "70 kJ mol⁻¹",
      option_d: "50 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Formula: ΔH = E_a(forward) - E_a(reverse).\n2. -50 = 70 - E_a(reverse) ⇒ E_a(reverse) = 70 - (-50) = 120 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1813,
    originalQuestion: {
      question: "The following two reactions are known: Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g); ΔH = -26.8 kJ FeO(s) + CO(g) → Fe(s) + CO₂(g); ΔH = -16.5 kJ The value of ΔH for the following reaction, Fe₂O₃(s) + CO(g) → 2FeO(s) + CO₂(g), is: [AIPMT 2010 Mains]",
      option_a: "+10.3 kJ",
      option_b: "-43.3 kJ",
      option_c: "-10.3 kJ",
      option_d: "+6.2 kJ",
      correct_option: "D",
      explanation: "Given thermochemical equations:\n(1) Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g); ΔH₁ = -26.8 kJ\n(2) FeO(s) + CO(g) → Fe(s) + CO₂(g); ΔH₂ = -16.5 kJ\n\nTarget reaction:\nFe₂O₃(s) + CO(g) → 2FeO(s) + CO₂(g)\n\nUsing Hess's Law:\n1. Keep equation (1) as is:\nFe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g); ΔH = -26.8 kJ\n2. Multiply equation (2) by 2 and reverse it:\n2Fe(s) + 2CO₂(g) → 2FeO(s) + 2CO(g); ΔH = -2 × (-16.5 kJ) = +33.0 kJ\n3. Add both equations:\nFe₂O₃(s) + 3CO(g) + 2Fe(s) + 2CO₂(g) → 2Fe(s) + 3CO₂(g) + 2FeO(s) + 2CO(g)\nSimplifying cancels 2Fe(s), 2CO(g), and 2CO₂(g):\nFe₂O₃(s) + CO(g) → 2FeO(s) + CO₂(g)\n\n4. Net enthalpy change:\nΔH = -26.8 + 33.0 = +6.2 kJ.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Given: (1) C(s) + O₂(g) → CO₂(g); ΔH = -393 kJ and (2) 2CO(g) + O₂(g) → 2CO₂(g); ΔH = -566 kJ. Calculate ΔH for C(s) + CO₂(g) → 2CO(g).",
      option_a: "+173 kJ",
      option_b: "-173 kJ",
      option_c: "+959 kJ",
      option_d: "-959 kJ",
      correct_option: "A",
      explanation: "1. Reverse reaction (2): 2CO₂(g) → 2CO(g) + O₂(g); ΔH = +566 kJ.\n2. Add reaction (1): C(s) + O₂(g) → CO₂(g); ΔH = -393 kJ.\n3. Net reaction: C(s) + CO₂(g) → 2CO(g); ΔH = +566 - 393 = +173 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1812,
    originalQuestion: {
      question: "For vaporisation of water at 1 atmospheric pressure, the values of ΔH and ΔS are 40.63 kJ mol⁻¹ and 108.8 J K⁻¹ mol⁻¹, respectively. The temperature at which the Gibbs energy change (ΔG) for this transformation will be zero is: [AIPMT 2010 Mains]",
      option_a: "273.4 K",
      option_b: "393.4 K",
      option_c: "373.4 K",
      option_d: "293.4 K",
      correct_option: "C",
      explanation: "1. The condition for the Gibbs energy change to be zero (ΔG = 0) corresponds to thermodynamic equilibrium between the liquid and vapour phases (normal boiling point):\nΔG = ΔH - T ΔS = 0\n\n2. Solving for temperature T:\nT = ΔH / ΔS\n\n3. Given:\n- ΔH = 40.63 kJ mol⁻¹ = 40,630 J mol⁻¹\n- ΔS = 108.8 J K⁻¹ mol⁻¹\n\n4. Calculating T:\nT = 40,630 J mol⁻¹ / 108.8 J K⁻¹ mol⁻¹ ≈ 373.437 K ≈ 373.4 K.\n(This corresponds closely to 100 °C = 373.15 K).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The enthalpy of vaporisation and entropy of vaporisation of benzene are 30.8 kJ mol⁻¹ and 87.2 J K⁻¹ mol⁻¹ respectively. The normal boiling point of benzene is:",
      option_a: "353.2 K",
      option_b: "373.0 K",
      option_c: "323.5 K",
      option_d: "400.0 K",
      correct_option: "A",
      explanation: "1. At the boiling point, liquid and vapour are in equilibrium (ΔG = 0):\nT_b = ΔH_vap / ΔS_vap.\n2. T_b = 30,800 J mol⁻¹ / 87.2 J K⁻¹ mol⁻¹ ≈ 353.2 K (approx. 80.2 °C).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1811,
    originalQuestion: {
      question: "Three moles of an ideal gas expand spontaneously into a vacuum. The work done will be: [AIPMT 2010 Mains]",
      option_a: "Infinite",
      option_b: "3 Joules",
      option_c: "9 Joules",
      option_d: "Zero",
      correct_option: "D",
      explanation: "1. Expansion of a gas into an evacuated space (vacuum) is called free expansion.\n2. In free expansion, the external opposing pressure against which the gas expands is zero:\nP_ext = 0.\n\n3. The work done by the gas is given by:\nw = -P_ext ΔV\nSince P_ext = 0, we have:\nw = -0 × ΔV = 0.\n\n4. Regardless of the number of moles or volume change, no work is done against a vacuum.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Five moles of an ideal gas undergo isothermal free expansion from 5 L to 50 L. The work done (w) and heat absorbed (q) are:",
      option_a: "w = 0, q = 0",
      option_b: "w = -50 J, q = +50 J",
      option_c: "w = 0, q = 50 J",
      option_d: "w = -50 J, q = 0",
      correct_option: "A",
      explanation: "1. In free expansion, P_ext = 0, so work done w = 0.\n2. In an isothermal process for an ideal gas, temperature is constant, so ΔU = 0.\n3. By the First Law of Thermodynamics, ΔU = q + w ⇒ 0 = q + 0 ⇒ q = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1810,
    originalQuestion: {
      question: "Match List I (Equations) with List II (Type of processes) and select the correct option. List I: A. Kₚ > Q B. ΔG° < RT ln Q C. Kₚ = Q D. T > ΔH/ΔS List II: (i) Non-spontaneous (ii) Equilibrium (iii) Spontaneous and endothermic (iv) Spontaneous [AIPMT 2010 Mains]",
      option_a: "A-(i), B-(ii), C-(iii), D-(iv)",
      option_b: "A-(iii), B-(iv), C-(ii), D-(i)",
      option_c: "A-(iv), B-(i), C-(ii), D-(iii)",
      option_d: "A-(ii), B-(i), C-(iv), D-(iii)",
      correct_option: "C",
      explanation: "Let us match each equation with its thermodynamic process:\n1. A. Kₚ > Q: When the equilibrium constant exceeds the reaction quotient, the reaction proceeds forward spontaneously to achieve equilibrium. (Matches iv - Spontaneous)\n2. B. ΔG° < RT ln Q: The Gibbs free energy is ΔG = ΔG° + RT ln Q. If ΔG° > 0 or Q is such that ΔG > 0, the reaction in forward direction is non-spontaneous. (Matches i - Non-spontaneous)\n3. C. Kₚ = Q: When the reaction quotient equals the equilibrium constant, the forward and reverse rates are equal and the system is at dynamic equilibrium. (Matches ii - Equilibrium)\n4. D. T > ΔH/ΔS: For an endothermic reaction (ΔH > 0) with increase in entropy (ΔS > 0), when T > ΔH/ΔS, TΔS > ΔH, making ΔG = ΔH - TΔS < 0 (spontaneous). (Matches iii - Spontaneous and endothermic)\n\nThus, the correct matching code is A-(iv), B-(i), C-(ii), D-(iii).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "When the reaction quotient Q is less than the equilibrium constant K (Q < K), the chemical system will:",
      option_a: "Shift towards products spontaneously",
      option_b: "Shift towards reactants spontaneously",
      option_c: "Remain unchanged at equilibrium",
      option_d: "Cease all forward and reverse reaction activity",
      correct_option: "A",
      explanation: "1. The relation ΔG = RT ln(Q/K) governs the direction of reaction.\n2. When Q < K, Q/K < 1, so ln(Q/K) is negative, making ΔG < 0.\n3. The negative ΔG indicates that the forward reaction is spontaneous, shifting the system towards products.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1809,
    originalQuestion: {
      question: "Which of the following is the correct option for free expansion of an ideal gas under adiabatic conditions? [AIPMT 2011 Prelims]",
      option_a: "q = 0, ΔT ≠ 0, w = 0",
      option_b: "q ≠ 0, ΔT = 0, w = 0",
      option_c: "q = 0, ΔT = 0, w = 0",
      option_d: "q = 0, ΔT < 0, w ≠ 0",
      correct_option: "C",
      explanation: "Let us analyze the conditions:\n1. Adiabatic condition: By definition, no heat enters or leaves the system across its boundary, so q = 0.\n2. Free expansion: The gas expands into a vacuum where external pressure P_ext = 0. Therefore, work done w = -P_ext ΔV = 0.\n3. According to the First Law of Thermodynamics:\nΔU = q + w\nSubstituting q = 0 and w = 0 gives:\nΔU = 0.\n4. For an ideal gas, internal energy is a function of temperature only: ΔU = n C_v ΔT.\nSince ΔU = 0, ΔT = 0 (temperature does not change during adiabatic free expansion of an ideal gas).\n\nTherefore, q = 0, ΔT = 0, w = 0.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "During Joule-Thomson free expansion of an ideal gas into a vacuum under insulated conditions, which of the following is zero?",
      option_a: "q, w, and ΔU only",
      option_b: "q, w, ΔU, and ΔT",
      option_c: "w and ΔT only",
      option_d: "q and w only",
      correct_option: "B",
      explanation: "1. For an ideal gas in adiabatic free expansion: insulated means q = 0; expansion into vacuum means w = 0.\n2. First law: ΔU = q + w = 0.\n3. For an ideal gas, (∂U/∂V)_T = 0 (Joule's law), meaning internal energy depends strictly on temperature.\n4. Since ΔU = 0, ΔT = 0 as well.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1808,
    originalQuestion: {
      question: "The enthalpy change for the reaction 4H(g) → 2H₂(g) is -869.6 kJ. The dissociation energy of the H-H bond is: [AIPMT 2011 Prelims]",
      option_a: "434.8 kJ",
      option_b: "869.6 kJ",
      option_c: "+434.8 kJ",
      option_d: "+217.4 kJ",
      correct_option: "A",
      explanation: "1. The given reaction is:\n4H(g) → 2H₂(g); ΔH = -869.6 kJ\n2. In this reaction, 4 moles of isolated hydrogen atoms combine to form 2 moles of H-H covalent bonds in H₂ molecules.\n3. Heat released during the formation of 2 moles of H-H bonds = 869.6 kJ.\n4. Therefore, heat released per mole of H-H bonds formed = 869.6 / 2 = 434.8 kJ.\n5. Bond dissociation energy is defined as the energy required to break one mole of bonds in gaseous state into isolated gaseous atoms:\nH₂(g) → 2H(g); ΔH = +434.8 kJ mol⁻¹ (or 434.8 kJ).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The enthalpy change for the process 2Cl(g) → Cl₂(g) is -242 kJ. The bond dissociation enthalpy of Cl₂ is:",
      option_a: "242 kJ mol⁻¹",
      option_b: "121 kJ mol⁻¹",
      option_c: "-242 kJ mol⁻¹",
      option_d: "484 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Bond formation releases 242 kJ per mole of Cl-Cl bonds formed.\n2. Bond dissociation is the reverse process requiring input of energy: Cl₂(g) → 2Cl(g).\n3. Thus, bond dissociation enthalpy = +242 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1807,
    originalQuestion: {
      question: "If the enthalpy change for the transition of liquid water to steam is 30 kJ mol⁻¹ at 27°C, the entropy change for the process would be: [AIPMT 2011 Prelims]",
      option_a: "10 J mol⁻¹ K⁻¹",
      option_b: "1.0 J mol⁻¹ K⁻¹",
      option_c: "0.1 J mol⁻¹ K⁻¹",
      option_d: "100 J mol⁻¹ K⁻¹",
      correct_option: "D",
      explanation: "1. The entropy change of vaporisation (ΔS_vap) is given by:\nΔS_vap = ΔH_vap / T\n\n2. Given:\n- ΔH_vap = 30 kJ mol⁻¹ = 30,000 J mol⁻¹\n- T = 27 °C = 27 + 273 = 300 K\n\n3. Calculating ΔS_vap:\nΔS_vap = 30,000 J mol⁻¹ / 300 K = 100 J mol⁻¹ K⁻¹.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If the enthalpy of vaporisation of a liquid is 45 kJ mol⁻¹ and its boiling point is 127 °C, the entropy of vaporisation is:",
      option_a: "112.5 J mol⁻¹ K⁻¹",
      option_b: "354.3 J mol⁻¹ K⁻¹",
      option_c: "450 J mol⁻¹ K⁻¹",
      option_d: "100 J mol⁻¹ K⁻¹",
      correct_option: "A",
      explanation: "1. Absolute temperature T = 127 + 273 = 400 K.\n2. ΔH_vap = 45,000 J mol⁻¹.\n3. ΔS_vap = 45,000 / 400 = 112.5 J mol⁻¹ K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1806,
    originalQuestion: {
      question: "Consider the following processes: 1/2 A → B; ΔH = +150 kJ/mol 3B → 2C + D; ΔH = -125 kJ/mol E + A → 2D; ΔH = +350 kJ/mol For B + D → E + 2C, ΔH will be: [AIPMT 2011 Mains]",
      option_a: "525 kJ/mol",
      option_b: "-175 kJ/mol",
      option_c: "-325 kJ/mol",
      option_d: "325 kJ/mol",
      correct_option: "B",
      explanation: "Let the given reactions be:\n(1) 1/2 A → B; ΔH₁ = +150 kJ/mol  ⇒  A → 2B; ΔH = 2(+150) = +300 kJ/mol\n(2) 3B → 2C + D; ΔH₂ = -125 kJ/mol\n(3) E + A → 2D; ΔH₃ = +350 kJ/mol\n\nTarget reaction:\nB + D → E + 2C\n\nTo construct the target reaction:\n1. Keep equation (2) as is:\n3B → 2C + D; ΔH = -125 kJ/mol\n2. Reverse equation (3):\n2D → E + A; ΔH = -350 kJ/mol\n3. Multiply equation (1) by 2:\nA → 2B; ΔH = +300 kJ/mol\n\nAdding these three equations:\n(3B) + (2D) + (A) → (2C + D) + (E + A) + (2B)\nCancelling common terms (A from both sides, 2B from both sides, and 1D from both sides):\nB + D → E + 2C\n\nCalculating total ΔH:\nΔH = (-125) + (-350) + (+300) = -475 + 300 = -175 kJ/mol.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Given: (1) A + B → C; ΔH = -100 kJ and (2) C + D → E; ΔH = +40 kJ. Calculate ΔH for the reaction A + B + D → E.",
      option_a: "-60 kJ",
      option_b: "-140 kJ",
      option_c: "+60 kJ",
      option_d: "+140 kJ",
      correct_option: "A",
      explanation: "1. Adding reaction (1) and reaction (2):\n(A + B) + (C + D) → C + E\nCancelling intermediate C gives: A + B + D → E.\n2. ΔH = (-100) + (+40) = -60 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1805,
    originalQuestion: {
      question: "The standard enthalpy of vaporisation Δ_vapH° for water at 100°C is 40.66 kJ mol⁻¹. The internal energy of vaporisation of water at 100°C, in kJ mol⁻¹, is: [AIPMT 2012 Prelims]",
      option_a: "+37.56",
      option_b: "-43.76",
      option_c: "+43.76",
      option_d: "+40.66",
      correct_option: "A",
      explanation: "1. The phase transition is:\nH₂O(l) → H₂O(g) at T = 100 °C = 373.15 K.\n\n2. The relation between enthalpy and internal energy of vaporisation is:\nΔ_vapH° = Δ_vapU° + Δn_g RT\nRearranging for internal energy:\nΔ_vapU° = Δ_vapH° - Δn_g RT\n\n3. Change in gaseous moles:\nΔn_g = 1 - 0 = 1 mol.\n\n4. Calculating Δn_g RT:\nΔn_g RT = 1 × 8.314 J K⁻¹ mol⁻¹ × 373.15 K = 3102.37 J mol⁻¹ = 3.102 kJ mol⁻¹.\n\n5. Calculating Δ_vapU°:\nΔ_vapU° = 40.66 kJ mol⁻¹ - 3.102 kJ mol⁻¹ = +37.558 kJ mol⁻¹ ≈ +37.56 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the enthalpy of vaporisation of ethanol at its normal boiling point (78.3 °C) is 38.56 kJ mol⁻¹, its internal energy of vaporisation Δ_vapU is: (R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "+35.64 kJ mol⁻¹",
      option_b: "+41.48 kJ mol⁻¹",
      option_c: "+38.56 kJ mol⁻¹",
      option_d: "-35.64 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. T = 78.3 + 273.15 = 351.45 K.\n2. Δn_g RT = 1 × 8.314 × 351.45 / 1000 ≈ 2.922 kJ mol⁻¹.\n3. Δ_vapU = Δ_vapH - Δn_g RT = 38.56 - 2.922 = +35.638 ≈ +35.64 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1804,
    originalQuestion: {
      question: "The enthalpy of fusion of water is 1.435 kcal/mol. The molar entropy change for the melting of ice at 0°C is: [AIPMT 2012 Prelims]",
      option_a: "10.52 cal/(mol K)",
      option_b: "21.04 cal/(mol K)",
      option_c: "5.260 cal/(mol K)",
      option_d: "0.526 cal/(mol K)",
      correct_option: "C",
      explanation: "1. The molar entropy change of fusion is:\nΔS_fus = ΔH_fus / T_f\n\n2. Given:\n- ΔH_fus = 1.435 kcal mol⁻¹ = 1435 cal mol⁻¹\n- Melting point of ice, T_f = 0 °C = 273.15 K (or 273 K)\n\n3. Calculating ΔS_fus:\nΔS_fus = 1435 cal mol⁻¹ / 273 K ≈ 5.2564 cal/(mol K) ≈ 5.260 cal/(mol K).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The molar enthalpy of fusion of an organic solid is 2.87 kcal mol⁻¹ and it melts at 127 °C. What is its molar entropy of fusion?",
      option_a: "7.175 cal mol⁻¹ K⁻¹",
      option_b: "14.35 cal mol⁻¹ K⁻¹",
      option_c: "3.588 cal mol⁻¹ K⁻¹",
      option_d: "22.60 cal mol⁻¹ K⁻¹",
      correct_option: "A",
      explanation: "1. T_f = 127 + 273 = 400 K.\n2. ΔH_fus = 2.87 kcal mol⁻¹ = 2870 cal mol⁻¹.\n3. ΔS_fus = 2870 / 400 = 7.175 cal mol⁻¹ K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1803,
    originalQuestion: {
      question: "In which of the following reactions is the standard reaction entropy change (ΔS°) positive and the standard Gibbs energy change (ΔG°) decreases sharply with increasing temperature? [AIPMT 2012 Prelims]",
      option_a: "C(graphite) + 1/2 O₂(g) → CO(g)",
      option_b: "CO(g) + 1/2 O₂(g) → CO₂(g)",
      option_c: "Mg(s) + 1/2 O₂(g) → MgO(s)",
      option_d: "1/2 C(graphite) + 1/2 O₂(g) → 1/2 CO₂(g)",
      correct_option: "A",
      explanation: "1. According to the Gibbs-Helmholtz equation:\nΔG° = ΔH° - T ΔS°\nThe slope of ΔG° with respect to temperature T is given by:\n(dΔG° / dT) = -ΔS°\n\n2. For ΔG° to decrease sharply as temperature increases (a negative slope), the reaction entropy change ΔS° must be positive:\n-ΔS° < 0.\n\n3. A positive entropy change (ΔS° > 0) occurs when the number of moles of gaseous products exceeds the number of moles of gaseous reactants (Δn_g > 0):\n- Option A: C(graphite) + 1/2 O₂(g) → CO(g) ⇒ Δn_g = 1 - 0.5 = +0.5 > 0. Hence ΔS° is positive.\n- Option B: CO(g) + 1/2 O₂(g) → CO₂(g) ⇒ Δn_g = 1 - 1.5 = -0.5 < 0.\n- Option C: Mg(s) + 1/2 O₂(g) → MgO(s) ⇒ Δn_g = 0 - 0.5 = -0.5 < 0.\n- Option D: 1/2 C(graphite) + 1/2 O₂(g) → 1/2 CO₂(g) ⇒ Δn_g = 0.5 - 0.5 = 0.\n\n4. In an Ellingham diagram, the line for C + 1/2 O₂ → CO has a distinct negative slope, showing that CO becomes increasingly thermodynamically stable at high temperatures.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In an Ellingham diagram, why does the line representing the reaction 2C(s) + O₂(g) → 2CO(g) slope downward with increasing temperature?",
      option_a: "Because the number of gaseous moles increases, resulting in a positive ΔS°",
      option_b: "Because the reaction is highly endothermic at low temperatures",
      option_c: "Because carbon undergoes a phase change to liquid carbon",
      option_d: "Because the enthalpy of formation of CO increases with temperature",
      correct_option: "A",
      explanation: "1. In 2C(s) + O₂(g) → 2CO(g), 1 mole of gas forms 2 moles of gas, making ΔS° positive.\n2. Since ΔG° = ΔH° - TΔS°, as T increases, the -TΔS° term becomes more negative, causing ΔG° to decrease.\n3. In the Ellingham diagram (plot of ΔG° vs T), this produces a line with a negative slope (-ΔS°).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1802,
    originalQuestion: {
      question: "A reaction having equal energies of activation for forward and reverse reactions has: [NEET 2013]",
      option_a: "ΔH = 0",
      option_b: "ΔH = ΔG = ΔS = 0",
      option_c: "ΔS = 0",
      option_d: "ΔG = 0",
      correct_option: "A",
      explanation: "1. The enthalpy change of a reaction (ΔH) is related to the activation energies of the forward (E_a(f)) and backward (E_a(b)) reactions by:\nΔH = E_a(f) - E_a(b)\n\n2. Given that the energies of activation for forward and reverse reactions are equal:\nE_a(f) = E_a(b)\n\n3. Substituting this into the enthalpy equation:\nΔH = E_a(f) - E_a(f) = 0.\n\n4. Notice that ΔG and ΔS do not necessarily equal zero, because entropy changes can occur regardless of activation energies.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the activation energy for the forward reaction is 50 kJ mol⁻¹ and the enthalpy change of the reaction is ΔH = -20 kJ mol⁻¹, the activation energy for the reverse reaction is:",
      option_a: "70 kJ mol⁻¹",
      option_b: "30 kJ mol⁻¹",
      option_c: "50 kJ mol⁻¹",
      option_d: "20 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Formula: ΔH = E_a(f) - E_a(b).\n2. -20 = 50 - E_a(b) ⇒ E_a(b) = 50 - (-20) = 70 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1801,
    originalQuestion: {
      question: "Three thermochemical equations are given below: (i) C(graphite) + O₂(g) → CO₂(g); ΔᵣH° = x kJ mol⁻¹ (ii) C(graphite) + 1/2 O₂(g) → CO(g); ΔᵣH° = y kJ mol⁻¹ (iii) CO(g) + 1/2 O₂(g) → CO₂(g); ΔᵣH° = z kJ mol⁻¹ Based on the above equations, find out which of the following relationships is correct. [NEET 2013 Karnataka]",
      option_a: "z = x + y",
      option_b: "x = y + z",
      option_c: "y = 2z - x",
      option_d: "x = y - z",
      correct_option: "B",
      explanation: "Let us apply Hess's Law of constant heat summation:\n1. Equation (ii): C(graphite) + 1/2 O₂(g) → CO(g); ΔH = y kJ mol⁻¹\n2. Equation (iii): CO(g) + 1/2 O₂(g) → CO₂(g); ΔH = z kJ mol⁻¹\n\nAdding equations (ii) and (iii):\nC(graphite) + 1/2 O₂(g) + CO(g) + 1/2 O₂(g) → CO(g) + CO₂(g)\n\nCancelling CO(g) from both sides and combining 1/2 O₂ + 1/2 O₂ = O₂:\nC(graphite) + O₂(g) → CO₂(g)\n\nThis sum yields equation (i), for which ΔᵣH° = x kJ mol⁻¹.\nTherefore, by Hess's law:\nx = y + z.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If S(s) + O₂(g) → SO₂(g) has ΔH = a kJ mol⁻¹ and SO₂(g) + 1/2 O₂(g) → SO₃(g) has ΔH = b kJ mol⁻¹, the enthalpy of formation of SO₃(s) from S(s) and O₂(g) is:",
      option_a: "a + b",
      option_b: "a - b",
      option_c: "b - a",
      option_d: "2a + b",
      correct_option: "A",
      explanation: "1. Target reaction: S(s) + 3/2 O₂(g) → SO₃(g).\n2. Adding the two intermediate reactions yields the target reaction directly.\n3. By Hess's law, ΔH = a + b.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1800,
    originalQuestion: {
      question: "When 5 litres of a gas mixture of methane and propane is completely combusted at 0°C and 1 atmosphere, 16 litres of oxygen at the same temperature and pressure is consumed. The amount of heat released from this combustion in kJ is (ΔH_comb(CH₄) = 890 kJ mol⁻¹, ΔH_comb(C₃H₈) = 2220 kJ mol⁻¹): [NEET 2013 Karnataka]",
      option_a: "38",
      option_b: "317",
      option_c: "477",
      option_d: "32",
      correct_option: "B",
      explanation: "Let the volume of methane (CH₄) in the mixture be V litres.\nThen the volume of propane (C₃H₈) is (5 - V) litres.\n\n1. Combustion reactions and oxygen requirements:\n- CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)\nVolume of O₂ consumed by CH₄ = 2V litres.\n- C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)\nVolume of O₂ consumed by C₃H₈ = 5(5 - V) = (25 - 5V) litres.\n\n2. Total oxygen consumed:\n2V + 25 - 5V = 16 L\n25 - 3V = 16 ⇒ 3V = 9 ⇒ V = 3 L.\nSo, the mixture contains 3 L of CH₄ and 2 L of C₃H₈.\n\n3. Converting volumes to moles at STP (0 °C, 1 atm, molar volume = 22.4 L mol⁻¹):\n- Moles of CH₄ = 3 / 22.4 = 0.1339 mol\n- Moles of C₃H₈ = 2 / 22.4 = 0.0893 mol\n\n4. Heat released upon complete combustion:\nq = (0.1339 mol × 890 kJ mol⁻¹) + (0.0893 mol × 2220 kJ mol⁻¹)\nq = 119.2 kJ + 198.2 kJ = 317.4 kJ ≈ 317 kJ.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A mixture of 2.24 L of CH₄ and 2.24 L of C₂H₆ at STP is completely burned in excess oxygen. If heats of combustion are 890 kJ mol⁻¹ and 1560 kJ mol⁻¹ respectively, calculate the total heat released.",
      option_a: "245 kJ",
      option_b: "490 kJ",
      option_c: "122.5 kJ",
      option_d: "350 kJ",
      correct_option: "A",
      explanation: "1. At STP, 2.24 L corresponds to n = 2.24 / 22.4 = 0.10 mol.\n2. Heat from CH₄ = 0.10 × 890 = 89 kJ.\n3. Heat from C₂H₆ = 0.10 × 1560 = 156 kJ.\n4. Total heat released = 89 + 156 = 245 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1799,
    originalQuestion: {
      question: "For the reaction: X₂O₄(l) → 2XO₂(g) ΔU = 2.1 kcal and ΔS = 20 cal K⁻¹ at 300 K. Hence, ΔG is: [AIPMT 2014]",
      option_a: "2.7 kcal",
      option_b: "-2.7 kcal",
      option_c: "9.3 kcal",
      option_d: "-9.3 kcal",
      correct_option: "B",
      explanation: "1. For the reaction X₂O₄(l) → 2XO₂(g):\n- Change in gaseous moles, Δn_g = 2 - 0 = 2 mol.\n\n2. Enthalpy change (ΔH):\nΔH = ΔU + Δn_g RT\nGiven:\n- ΔU = 2.1 kcal\n- R = 2 × 10⁻³ kcal K⁻¹ mol⁻¹\n- T = 300 K\nΔn_g RT = 2 × (2 × 10⁻³ kcal K⁻¹ mol⁻¹) × 300 K = 1.2 kcal.\nTherefore:\nΔH = 2.1 + 1.2 = 3.3 kcal.\n\n3. Gibbs free energy change (ΔG):\nΔG = ΔH - T ΔS\nGiven ΔS = 20 cal K⁻¹ = 20 × 10⁻³ kcal K⁻¹ = 0.02 kcal K⁻¹:\nT ΔS = 300 K × 0.02 kcal K⁻¹ = 6.0 kcal.\n\n4. Calculating ΔG:\nΔG = 3.3 - 6.0 = -2.7 kcal.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction A(s) → 2B(g), ΔU = 3.0 kcal and ΔS = 25 cal K⁻¹ at 400 K. The value of ΔG in kcal is: (R = 2 cal K⁻¹ mol⁻¹)",
      option_a: "-5.4 kcal",
      option_b: "+5.4 kcal",
      option_c: "-2.6 kcal",
      option_d: "+4.6 kcal",
      correct_option: "A",
      explanation: "1. Δn_g = 2 - 0 = 2.\n2. Δn_g RT = 2 × (2 × 10⁻³) × 400 = 1.6 kcal.\n3. ΔH = ΔU + Δn_g RT = 3.0 + 1.6 = 4.6 kcal.\n4. T ΔS = 400 × (25 × 10⁻³) = 10.0 kcal.\n5. ΔG = 4.6 - 10.0 = -5.4 kcal.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1798,
    originalQuestion: {
      question: "Which of the following statements is correct for the spontaneous adsorption of a gas? [AIPMT 2014]",
      option_a: "ΔS is negative and, therefore, ΔH should be highly positive.",
      option_b: "ΔS is negative and, therefore, ΔH should be highly negative.",
      option_c: "ΔS is positive and, therefore, ΔH should be negative.",
      option_d: "ΔS is positive and, therefore, ΔH should also be highly positive.",
      correct_option: "B",
      explanation: "1. In the adsorption of gas molecules on a solid surface, free gas molecules lose their three-dimensional translational degrees of freedom and become confined to a two-dimensional surface.\n2. Consequently, the randomness of the gas decreases, meaning the entropy change of adsorption is always negative: ΔS < 0.\n3. For adsorption to be spontaneous at constant temperature and pressure, the Gibbs free energy change must be negative:\nΔG = ΔH - T ΔS < 0\n4. Since ΔS is negative, the term (-T ΔS) is positive. For ΔG to be negative, the enthalpy change ΔH must be negative (exothermic) and its magnitude must be larger than |T ΔS|.\n5. Therefore, ΔS is negative and ΔH should be highly negative.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the adsorption of a gas on a solid adsorbent always accompanied by an exothermic heat change (ΔH < 0)?",
      option_a: "Because residual attractive forces on the surface are satisfied, lowering surface energy",
      option_b: "Because entropy increases during adsorption",
      option_c: "Because gas molecules undergo dissociation during physical adsorption",
      option_d: "Because work is done by the gas against surface tension",
      correct_option: "A",
      explanation: "1. Unbalanced residual electrostatic forces exist on the surface of an adsorbent.\n2. When gas molecules are adsorbed, these surface forces are satisfied, releasing energy and lowering the surface energy of the solid.\n3. Hence, adsorption is always an exothermic process (ΔH < 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1797,
    originalQuestion: {
      question: "The heat of combustion of carbon to CO₂ is -393.5 kJ/mol. The heat released upon formation of 35.2 g of CO₂ from carbon and oxygen gas is: [AIPMT 2015]",
      option_a: "+315 kJ",
      option_b: "-630 kJ",
      option_c: "-3.15 kJ",
      option_d: "315 kJ",
      correct_option: "A",
      explanation: "1. The thermochemical equation for the combustion of carbon is:\nC(s) + O₂(g) → CO₂(g); ΔH = -393.5 kJ mol⁻¹\n\n2. Molar mass of CO₂:\nM = 12.01 + 2(16.00) = 44.01 g mol⁻¹ ≈ 44 g mol⁻¹.\n\n3. Number of moles of CO₂ formed from 35.2 g:\nn = 35.2 g / 44 g mol⁻¹ = 0.80 mol.\n\n4. The enthalpy change for forming 0.80 mol of CO₂ is:\nΔH = 0.80 mol × (-393.5 kJ mol⁻¹) = -314.8 kJ.\n\n5. The term 'heat released' refers to the positive magnitude of heat evolved: q_released = +314.8 kJ ≈ +315 kJ.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The heat of formation of water is -286 kJ mol⁻¹. What is the heat released upon the formation of 9.0 g of water from H₂ and O₂?",
      option_a: "143 kJ",
      option_b: "286 kJ",
      option_c: "71.5 kJ",
      option_d: "572 kJ",
      correct_option: "A",
      explanation: "1. Molar mass of water H₂O = 18 g mol⁻¹.\n2. Moles of water = 9.0 / 18 = 0.5 mol.\n3. Heat released = 0.5 × 286 kJ = 143 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1796,
    originalQuestion: {
      question: "For a sample of perfect gas, when its pressure is changed isothermally from pᵢ to pᶠ, the entropy change is given by: [NEET 2016 Phase 2]",
      option_a: "ΔS = nR ln(pᶠ/pᵢ)",
      option_b: "ΔS = nR ln(pᵢ/pᶠ)",
      option_c: "ΔS = nRT ln(pᶠ/pᵢ)",
      option_d: "ΔS = RT ln(pᵢ/pᶠ)",
      correct_option: "B",
      explanation: "1. For an isothermal process involving an ideal gas, the entropy change is given in terms of volume by:\nΔS = nR ln(Vᶠ / Vᵢ)\n\n2. For an ideal gas at constant temperature (Boyle's Law):\npᵢ Vᵢ = pᶠ Vᶠ  ⇒  Vᶠ / Vᵢ = pᵢ / pᶠ\n\n3. Substituting this ratio into the entropy equation:\nΔS = nR ln(pᵢ / pᶠ)\n\n4. (Alternatively, ΔS = -nR ln(pᶠ / pᵢ) = nR ln(pᵢ / pᶠ)).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When the volume of n moles of an ideal gas changes from V₁ to V₂ and temperature changes from T₁ to T₂, the general entropy change ΔS is:",
      option_a: "n C_v ln(T₂/T₁) + n R ln(V₂/V₁)",
      option_b: "n C_p ln(T₂/T₁) + n R ln(V₂/V₁)",
      option_c: "n C_v ln(T₂/T₁) - n R ln(V₂/V₁)",
      option_d: "n R ln(T₂/T₁) + n C_v ln(V₂/V₁)",
      correct_option: "A",
      explanation: "1. From dS = dq_rev / T = (dU + P dV) / T = (n C_v dT + nRT/V dV) / T.\n2. Integrating from initial to final state gives:\nΔS = n C_v ln(T₂/T₁) + n R ln(V₂/V₁).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1795,
    originalQuestion: {
      question: "A gas is allowed to expand in a well-insulated container against a constant external pressure of 2.5 atm from an initial volume of 2.50 L to a final volume of 4.50 L. The change in internal energy ΔU of the gas in joules will be: [NEET 2017]",
      option_a: "-500 J",
      option_b: "-505 J",
      option_c: "+505 J",
      option_d: "-1136.25 J",
      correct_option: "B",
      explanation: "1. Since the container is well-insulated, no heat is exchanged with the surroundings (adiabatic process):\nq = 0.\n\n2. Work done by the expanding gas against constant external pressure is:\nw = -P_ext ΔV = -P_ext (V₂ - V₁)\nGiven:\n- P_ext = 2.5 atm\n- V₁ = 2.50 L\n- V₂ = 4.50 L\n- ΔV = 4.50 - 2.50 = 2.00 L\n\nw = -2.5 atm × 2.00 L = -5.00 L atm.\n\n3. Converting work to Joules (1 L atm = 101.325 J):\nw = -5.00 × 101.325 J = -506.6 J ≈ -505 J.\n\n4. According to the First Law of Thermodynamics:\nΔU = q + w = 0 + (-505 J) = -505 J.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas expands adiabatically in an insulated vessel against a constant external pressure of 1.5 atm from 1.0 L to 5.0 L. What is the internal energy change of the gas? (1 L atm = 101.3 J)",
      option_a: "-608 J",
      option_b: "+608 J",
      option_c: "0 J",
      option_d: "-304 J",
      correct_option: "A",
      explanation: "1. Adiabatic implies q = 0.\n2. w = -P_ext ΔV = -1.5 atm × (5.0 - 1.0) L = -6.0 L atm.\n3. w = -6.0 × 101.3 J = -607.8 J ≈ -608 J.\n4. ΔU = q + w = -608 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1794,
    originalQuestion: {
      question: "For a given reaction, ΔH = 35.5 kJ mol⁻¹ and ΔS = 83.6 J K⁻¹ mol⁻¹. The reaction is spontaneous at (Assume that ΔH and ΔS do not vary with temperature): [NEET 2017]",
      option_a: "T > 425 K",
      option_b: "All temperatures",
      option_c: "T > 298 K",
      option_d: "T < 425 K",
      correct_option: "A",
      explanation: "1. The condition for spontaneity at constant temperature and pressure is:\nΔG = ΔH - T ΔS < 0\n\n2. When both ΔH and ΔS are positive:\nΔH - T ΔS < 0 ⇒ T ΔS > ΔH ⇒ T > ΔH / ΔS\n\n3. Given:\n- ΔH = 35.5 kJ mol⁻¹ = 35,500 J mol⁻¹\n- ΔS = 83.6 J K⁻¹ mol⁻¹\n\n4. Calculating threshold temperature:\nT > 35,500 J mol⁻¹ / 83.6 J K⁻¹ mol⁻¹ ≈ 424.64 K ≈ 425 K.\n\n5. Thus, the reaction becomes spontaneous only at temperatures strictly above 425 K (T > 425 K).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a process with ΔH = +60 kJ mol⁻¹ and ΔS = +150 J K⁻¹ mol⁻¹, at what temperatures is the process spontaneous?",
      option_a: "T > 400 K",
      option_b: "T < 400 K",
      option_c: "At all temperatures",
      option_d: "T > 250 K",
      correct_option: "A",
      explanation: "1. Spontaneity condition: T > ΔH / ΔS.\n2. T > (60 × 10³ J mol⁻¹) / (150 J K⁻¹ mol⁻¹) = 400 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1793,
    originalQuestion: {
      question: "The bond dissociation energies of X₂, Y₂ and XY are in the ratio 1 : 0.5 : 1. ΔH for the formation of XY is -200 kJ mol⁻¹. The bond dissociation energy of X₂ will be: [NEET 2018]",
      option_a: "800 kJ mol⁻¹",
      option_b: "200 kJ mol⁻¹",
      option_c: "400 kJ mol⁻¹",
      option_d: "100 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Let the bond dissociation energy of X₂ be x kJ mol⁻¹.\nAccording to the given ratio 1 : 0.5 : 1:\n- BE(X₂) = x kJ mol⁻¹\n- BE(Y₂) = 0.5x kJ mol⁻¹\n- BE(XY) = x kJ mol⁻¹\n\n2. The thermochemical equation for the formation of 1 mole of XY from its elements is:\n1/2 X₂ + 1/2 Y₂ → XY; ΔH_f = -200 kJ mol⁻¹\n\n3. In terms of bond energies:\nΔH_f = [1/2 BE(X₂) + 1/2 BE(Y₂)] - BE(XY)\n-200 = [1/2(x) + 1/2(0.5x)] - x\n-200 = [0.5x + 0.25x] - x\n-200 = 0.75x - x = -0.25x\n\n4. Solving for x:\n0.25x = 200 ⇒ x = 200 / 0.25 = 800 kJ mol⁻¹.\n\nTherefore, the bond dissociation energy of X₂ is 800 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Bond dissociation energies of A₂, B₂, and AB are in the ratio 2 : 1 : 2. If the enthalpy of formation of AB is -100 kJ mol⁻¹, what is the bond dissociation energy of A₂?",
      option_a: "400 kJ mol⁻¹",
      option_b: "200 kJ mol⁻¹",
      option_c: "800 kJ mol⁻¹",
      option_d: "100 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Let BE(A₂) = 2x, BE(B₂) = x, BE(AB) = 2x.\n2. Formation reaction: 1/2 A₂ + 1/2 B₂ → AB; ΔH = -100 kJ mol⁻¹.\n3. ΔH = [1/2(2x) + 1/2(x)] - 2x = [x + 0.5x] - 2x = -0.5x.\n4. -0.5x = -100 ⇒ x = 200 kJ mol⁻¹.\n5. Therefore, BE(A₂) = 2x = 2 × 200 = 400 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1792,
    originalQuestion: {
      question: "Under isothermal conditions, a gas at 300 K expands from 0.1 L to 0.25 L against a constant external pressure of 2 bar. The work done by the gas is (Given: 1 L bar = 100 J): [NEET 2019]",
      option_a: "25 J",
      option_b: "30 J",
      option_c: "-30 J",
      option_d: "5 kJ",
      correct_option: "C",
      explanation: "1. The work done in an irreversible expansion against a constant external pressure is given by:\nw = -P_ext ΔV = -P_ext (V₂ - V₁)\n\n2. Given:\n- P_ext = 2 bar\n- V₁ = 0.1 L\n- V₂ = 0.25 L\n- ΔV = 0.25 - 0.1 = 0.15 L\n\n3. Calculating work in L bar:\nw = -2 bar × 0.15 L = -0.30 L bar\n\n4. Converting to Joules (using 1 L bar = 100 J):\nw = -0.30 × 100 J = -30 J.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas expands from 1.0 L to 3.0 L against a constant external pressure of 3.0 bar. The work done is: (1 L bar = 100 J)",
      option_a: "-600 J",
      option_b: "+600 J",
      option_c: "-200 J",
      option_d: "-300 J",
      correct_option: "A",
      explanation: "1. w = -P_ext ΔV = -3.0 bar × (3.0 - 1.0) L = -6.0 L bar.\n2. In Joules: w = -6.0 × 100 J = -600 J.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

