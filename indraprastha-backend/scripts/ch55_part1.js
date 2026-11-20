// ch55_part1.js - Questions 0 to 29 (IDs 1851 down to 1822)
module.exports = [
  {
    id: 1851,
    originalQuestion: {
      question: "For the reaction, C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l), which one is true? [AIPMT 2000]",
      option_a: "ΔH = ΔE - RT",
      option_b: "ΔH = ΔE + RT",
      option_c: "ΔH = ΔE + 2RT",
      option_d: "ΔH = ΔE - 2RT",
      correct_option: "A",
      explanation: "The relation between enthalpy change (ΔH) and internal energy change (ΔE) for a chemical reaction is given by:\nΔH = ΔE + Δn_g RT\n\nwhere Δn_g is the change in the number of moles of gaseous species:\nΔn_g = Σ n_g(products) - Σ n_g(reactants)\n\nIn the given balanced chemical equation:\nC₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l)\n1. Gaseous products: 2 moles of CO₂(g).\n2. Gaseous reactants: 3 moles of O₂(g) (ethanol and water are in liquid state).\n3. Δn_g = 2 - 3 = -1.\n\nSubstituting Δn_g = -1 into the thermodynamic relation:\nΔH = ΔE + (-1)RT = ΔE - RT.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For the combustion of gaseous methane, CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) at temperature T, what is the relation between ΔH and ΔU?",
      option_a: "ΔH = ΔU - 2RT",
      option_b: "ΔH = ΔU + 2RT",
      option_c: "ΔH = ΔU - RT",
      option_d: "ΔH = ΔU + RT",
      correct_option: "A",
      explanation: "1. The relation between ΔH and ΔU is ΔH = ΔU + Δn_g RT.\n2. For the reaction CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l):\n- Gaseous products = 1 mole of CO₂(g).\n- Gaseous reactants = 1 mole of CH₄(g) + 2 moles of O₂(g) = 3 moles.\n- Δn_g = 1 - 3 = -2.\n3. Substituting Δn_g = -2 gives ΔH = ΔU - 2RT.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1850,
    originalQuestion: {
      question: "The entropy change in the fusion of one mole of a solid melting at 27°C (latent heat of fusion is 2930 J mol⁻¹) is: [AIPMT 2000]",
      option_a: "9.77 J mol⁻¹ K⁻¹",
      option_b: "10.77 J mol⁻¹ K⁻¹",
      option_c: "9.07 J mol⁻¹ K⁻¹",
      option_d: "0.977 J mol⁻¹ K⁻¹",
      correct_option: "A",
      explanation: "1. The entropy of fusion (ΔS_fus) at the melting point is given by:\nΔS_fus = ΔH_fus / T_f\n\n2. Given:\n- Enthalpy of fusion, ΔH_fus = 2930 J mol⁻¹\n- Melting point, T_f = 27 °C = 27 + 273 = 300 K\n\n3. Calculating ΔS_fus:\nΔS_fus = 2930 / 300 = 9.7667 J mol⁻¹ K⁻¹ ≈ 9.77 J mol⁻¹ K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the entropy change (in J mol⁻¹ K⁻¹) during the melting of 1 mole of ice at 0 °C, given that the latent heat of fusion of ice is 6.00 kJ mol⁻¹?",
      option_a: "21.98 J mol⁻¹ K⁻¹",
      option_b: "22.50 J mol⁻¹ K⁻¹",
      option_c: "18.25 J mol⁻¹ K⁻¹",
      option_d: "6.00 J mol⁻¹ K⁻¹",
      correct_option: "A",
      explanation: "1. Melting occurs at constant temperature T_f = 0 °C = 273.15 K.\n2. Latent heat of fusion, ΔH_fus = 6.00 kJ mol⁻¹ = 6000 J mol⁻¹.\n3. Entropy of fusion:\nΔS_fus = ΔH_fus / T_f = 6000 / 273.15 ≈ 21.98 J mol⁻¹ K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1849,
    originalQuestion: {
      question: "Given the following reactions: 2Zn + O₂ → 2ZnO; ΔG° = -616 J 2Zn + S₂ → 2ZnS; ΔG° = -293 J S₂ + 2O₂ → 2SO₂; ΔG° = -408 J ΔG° for the following reaction 2ZnS + 3O₂ → 2ZnO + 2SO₂ is: [AIPMT 2000]",
      option_a: "-731 J",
      option_b: "1317 J",
      option_c: "-501 J",
      option_d: "+731 J",
      correct_option: "A",
      explanation: "Let the given thermochemical equations be:\n(1) 2Zn + O₂ → 2ZnO; ΔG₁° = -616 J\n(2) 2Zn + S₂ → 2ZnS; ΔG₂° = -293 J\n(3) S₂ + 2O₂ → 2SO₂; ΔG₃° = -408 J\n\nTarget reaction:\n2ZnS + 3O₂ → 2ZnO + 2SO₂\n\nTo obtain the target reaction:\n- Reverse equation (2): 2ZnS → 2Zn + S₂; ΔG° = -ΔG₂° = -(-293) = +293 J\n- Add equation (1): 2Zn + O₂ → 2ZnO; ΔG₁° = -616 J\n- Add equation (3): S₂ + 2O₂ → 2SO₂; ΔG₃° = -408 J\n\nSum of the reactions:\n(2ZnS) + (2Zn + O₂) + (S₂ + 2O₂) → (2Zn + S₂) + (2ZnO) + (2SO₂)\n2ZnS + 3O₂ → 2ZnO + 2SO₂\n\nTotal ΔG°:\nΔG° = (+293) + (-616) + (-408) = 293 - 1024 = -731 J.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Given: C(s) + O₂(g) → CO₂(g); ΔG₁° = -394 kJ and 2CO(g) + O₂(g) → 2CO₂(g); ΔG₂° = -566 kJ. The standard free energy change ΔG° for C(s) + 1/2 O₂(g) → CO(g) is:",
      option_a: "-111 kJ",
      option_b: "-677 kJ",
      option_c: "+172 kJ",
      option_d: "-283 kJ",
      correct_option: "A",
      explanation: "1. Reaction (1): C(s) + O₂(g) → CO₂(g); ΔG₁° = -394 kJ.\n2. Reverse reaction (2) and divide by 2:\nCO₂(g) → CO(g) + 1/2 O₂(g); ΔG° = -1/2 (-566) = +283 kJ.\n3. Adding these two reactions gives:\nC(s) + 1/2 O₂(g) → CO(g)\nΔG° = -394 + 283 = -111 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1848,
    originalQuestion: {
      question: "PbO₂ → PbO; ΔG₂₉₈ < 0 SnO₂ → SnO; ΔG₂₉₈ > 0 The most probable oxidation states of Pb and Sn will be: [AIPMT 2001]",
      option_a: "Pb⁴⁺, Sn⁴⁺",
      option_b: "Pb⁴⁺, Sn²⁺",
      option_c: "Pb²⁺, Sn²⁺",
      option_d: "Pb²⁺, Sn⁴⁺",
      correct_option: "D",
      explanation: "Let us evaluate the thermodynamic feasibility of the given reactions:\n1. PbO₂ → PbO: ΔG₂₉₈ < 0 means the conversion of Pb(IV) into Pb(II) is spontaneous. Thus, PbO is thermodynamically more stable than PbO₂, so the +2 oxidation state (Pb²⁺) is the preferred and more stable state for lead. This stability is due to the strong inert pair effect in the heavy 6s² element.\n2. SnO₂ → SnO: ΔG₂₉₈ > 0 means the reduction of Sn(IV) to Sn(II) is non-spontaneous. The reverse reaction (SnO → SnO₂) has ΔG < 0, meaning SnO readily oxidises to SnO₂. Thus, Sn(IV) (Sn⁴⁺) is thermodynamically more stable than Sn(II).\n\nHence, the most probable and stable oxidation states are Pb²⁺ and Sn⁴⁺.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Due to the inert pair effect, which of the following statements correctly describes the relative stability of +2 and +4 oxidation states of Group 14 elements?",
      option_a: "Stability of +2 state decreases down the group while +4 state increases",
      option_b: "Stability of +2 state increases down the group while +4 state decreases",
      option_c: "Both +2 and +4 states remain equally stable down the group",
      option_d: "The +2 state is stable for carbon and silicon only",
      correct_option: "B",
      explanation: "1. Moving down Group 14 (C → Si → Ge → Sn → Pb), the intervening d- and f-electrons shield the valence ns² electrons poorly.\n2. The outer ns² electrons become tightly bound to the nucleus and participate reluctantly in bonding (inert pair effect).\n3. Consequently, the stability of the lower oxidation state (+2) increases down the group, while the higher oxidation state (+4) becomes less stable.\n4. Therefore, Sn⁴⁺ is more stable than Sn²⁺, but Pb²⁺ is far more stable than Pb⁴⁺.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1847,
    originalQuestion: {
      question: "The enthalpy of the reaction CH₄ + 1/2 O₂ → CH₃OH is negative. If the enthalpies of combustion of CH₄ and CH₃OH are x and y, respectively, then which relation is correct? [AIPMT 2001]",
      option_a: "x > y",
      option_b: "x < y",
      option_c: "x = y",
      option_d: "x ≥ y",
      correct_option: "A",
      explanation: "1. The enthalpy of reaction can be calculated from the enthalpies of combustion of reactants and products:\nΔH_rxn = Σ ΔH_c(reactants) - Σ ΔH_c(products)\n\n2. For the reaction CH₄(g) + 1/2 O₂(g) → CH₃OH(l):\nΔH_rxn = ΔH_c(CH₄) - ΔH_c(CH₃OH)\n(since O₂ does not undergo combustion, ΔH_c(O₂) = 0).\n\n3. Let the heats of combustion released (magnitudes) be x and y (where ΔH_c(CH₄) = -x and ΔH_c(CH₃OH) = -y, with x, y > 0):\nΔH_rxn = (-x) - (-y) = y - x.\n\n4. Given that the enthalpy of reaction is negative (ΔH_rxn < 0):\ny - x < 0 ⇒ x > y.\n\nTherefore, the enthalpy of combustion of methane is greater than that of methanol (x > y).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The enthalpy of formation of liquid water from H₂(g) and O₂(g) is negative (-286 kJ mol⁻¹). If the heats of combustion of C₂H₄ and C₂H₆ are a and b (both positive magnitudes) respectively, what relates a, b, and the heat of hydrogenation?",
      option_a: "Hydrogenation enthalpy is negative and equals b - a - 286 kJ mol⁻¹",
      option_b: "Combustion enthalpy always satisfies a > b for saturated vs unsaturated hydrocarbons of same carbon count",
      option_c: "Heat of combustion of C₂H₆ is greater than C₂H₄ because it contains more hydrogen atoms (b > a)",
      option_d: "Combustion of C₂H₄ releases less total energy per mole than C₂H₂",
      correct_option: "C",
      explanation: "1. Combustion of C₂H₆: C₂H₆ + 7/2 O₂ → 2CO₂ + 3H₂O (produces 3 moles of H₂O).\n2. Combustion of C₂H₄: C₂H₄ + 3O₂ → 2CO₂ + 2H₂O (produces 2 moles of H₂O).\n3. Because ethane has two more hydrogen atoms, its combustion involves the formation of one additional mole of water, releasing significantly more heat (b > a).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1846,
    originalQuestion: {
      question: "When 1 mol of gas is heated at constant volume, the temperature is raised from 298 K to 308 K. Heat supplied to the gas is 500 J. Then which statement is correct? [AIPMT 2001]",
      option_a: "q = w = 500 J, ΔE = 0",
      option_b: "q = ΔE = 500 J, w = 0",
      option_c: "q = -w = 500 J, ΔE = 0",
      option_d: "ΔE = 0, q = w = -500 J",
      correct_option: "B",
      explanation: "1. The process is conducted at constant volume (isochoric process), so dV = 0.\n2. Work done by or on the gas is given by:\nw = -P_ext ΔV = 0.\n\n3. According to the First Law of Thermodynamics:\nΔE = q + w\nSince w = 0, we have:\nΔE = q.\n\n4. Given that heat supplied to the gas is q = +500 J:\nΔE = 500 J and w = 0.\n\nTherefore, q = ΔE = 500 J, w = 0.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In an isochoric heating process, 400 J of heat is added to 2 moles of an ideal gas. The work done (w) and change in internal energy (ΔU) are:",
      option_a: "w = 400 J, ΔU = 0",
      option_b: "w = 0, ΔU = 400 J",
      option_c: "w = -400 J, ΔU = 400 J",
      option_d: "w = 0, ΔU = 0",
      correct_option: "B",
      explanation: "1. In an isochoric process, volume remains strictly constant (ΔV = 0).\n2. Work done w = -P ΔV = 0.\n3. By the First Law of Thermodynamics, ΔU = q + w = 400 J + 0 = 400 J.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1845,
    originalQuestion: {
      question: "The change in enthalpy for the reaction 2H₂O₂(l) → 2H₂O(l) + O₂(g) if the heats of formation of H₂O₂(l) and H₂O(l) are -188 and -286 kJ/mol, respectively, is: [AIPMT 2001]",
      option_a: "-196 kJ/mol",
      option_b: "+196 kJ/mol",
      option_c: "+948 kJ/mol",
      option_d: "-948 kJ/mol",
      correct_option: "A",
      explanation: "The enthalpy of reaction (ΔH°) is calculated from standard enthalpies of formation as:\nΔH°_rxn = Σ ΔH_f°(products) - Σ ΔH_f°(reactants)\n\nFor the reaction:\n2H₂O₂(l) → 2H₂O(l) + O₂(g)\n\n1. Products:\n- 2 moles of H₂O(l): 2 × (-286 kJ/mol) = -572 kJ\n- 1 mole of O₂(g): ΔH_f° = 0 kJ/mol (standard state element)\nTotal ΔH_f°(products) = -572 kJ\n\n2. Reactants:\n- 2 moles of H₂O₂(l): 2 × (-188 kJ/mol) = -376 kJ\nTotal ΔH_f°(reactants) = -376 kJ\n\n3. Enthalpy change:\nΔH° = -572 - (-376) = -572 + 376 = -196 kJ (for the reaction as written, i.e., -196 kJ per 2 moles of H₂O₂ or -196 kJ/mol of reaction).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Given standard heats of formation: ΔH_f°(CO₂) = -393.5 kJ mol⁻¹ and ΔH_f°(CO) = -110.5 kJ mol⁻¹. What is ΔH° for the reaction: 2CO(g) + O₂(g) → 2CO₂(g)?",
      option_a: "-566.0 kJ",
      option_b: "-283.0 kJ",
      option_c: "+566.0 kJ",
      option_d: "-504.0 kJ",
      correct_option: "A",
      explanation: "1. ΔH° = 2 × ΔH_f°(CO₂) - [2 × ΔH_f°(CO) + ΔH_f°(O₂)].\n2. ΔH° = 2(-393.5) - [2(-110.5) + 0] = -787.0 - (-221.0) = -566.0 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1844,
    originalQuestion: {
      question: "Two moles of an ideal gas at 27°C are expanded reversibly from 2 L to 20 L. Find the entropy change. (R = 2 cal mol⁻¹ K⁻¹) [AIPMT 2002]",
      option_a: "92.1",
      option_b: "0",
      option_c: "4",
      option_d: "9.2",
      correct_option: "D",
      explanation: "1. For an isothermal reversible expansion of an ideal gas, the temperature remains constant, so ΔT = 0.\n2. The entropy change is given by:\nΔS = n R ln(V₂ / V₁) = 2.303 n R log₁₀(V₂ / V₁)\n\n3. Given:\n- n = 2 mol\n- R = 2 cal mol⁻¹ K⁻¹\n- V₁ = 2 L\n- V₂ = 20 L\n\n4. Substituting values:\nΔS = 2 × 2 × ln(20 / 2) = 4 × ln(10) = 4 × 2.3026 ≈ 9.21 cal K⁻¹ ≈ 9.2 cal K⁻¹.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "One mole of an ideal gas expands isothermally and reversibly from 10 dm³ to 100 dm³ at 300 K. The entropy change of the gas is: (R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "19.14 J K⁻¹",
      option_b: "38.28 J K⁻¹",
      option_c: "8.314 J K⁻¹",
      option_d: "2.303 J K⁻¹",
      correct_option: "A",
      explanation: "1. Formula: ΔS = n R ln(V₂ / V₁) = 2.303 n R log₁₀(V₂ / V₁).\n2. With n = 1, V₂ / V₁ = 100 / 10 = 10:\nΔS = 2.303 × 1 × 8.314 × log₁₀(10) = 2.303 × 8.314 × 1 ≈ 19.14 J K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1843,
    originalQuestion: {
      question: "Which reaction is not feasible? [AIPMT 2002]",
      option_a: "2KI + Br₂ → 2KBr + I₂",
      option_b: "2KBr + I₂ → 2KI + Br₂",
      option_c: "2KBr + Cl₂ → 2KCl + Br₂",
      option_d: "2H₂O + 2F₂ → 4HF + O₂",
      correct_option: "B",
      explanation: "The feasibility of a halogen displacement reaction is determined by the standard reduction potentials of the halogens:\nE°(F₂/F⁻) = +2.87 V\nE°(Cl₂/Cl⁻) = +1.36 V\nE°(Br₂/Br⁻) = +1.08 V\nE°(I₂/I⁻) = +0.54 V\n\n1. A halogen with a higher reduction potential acts as a stronger oxidising agent and can displace a halide ion derived from a halogen with a lower reduction potential.\n2. In Option B: 2KBr + I₂ → 2KI + Br₂.\nHere, iodine (I₂) is required to oxidise bromide (Br⁻) to bromine (Br₂).\nE°_cell = E°(I₂/I⁻) - E°(Br₂/Br⁻) = +0.54 - (+1.08) = -0.54 V.\nSince E°_cell is negative, ΔG° = -nFE°_cell > 0, meaning the reaction is thermodynamically not feasible.\n3. In Option A, Br₂ displaces I⁻ (feasible, E° > 0); in Option C, Cl₂ displaces Br⁻ (feasible); in Option D, F₂ oxidises water to O₂ (feasible).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Based on standard electrode potentials, which of the following redox reactions will not occur spontaneously under standard conditions?",
      option_a: "Cl₂(g) + 2I⁻(aq) → 2Cl⁻(aq) + I₂(s)",
      option_b: "Br₂(l) + 2Cl⁻(aq) → 2Br⁻(aq) + Cl₂(g)",
      option_c: "F₂(g) + 2Cl⁻(aq) → 2F⁻(aq) + Cl₂(g)",
      option_d: "Br₂(l) + 2I⁻(aq) → 2Br⁻(aq) + I₂(s)",
      correct_option: "B",
      explanation: "1. For Br₂(l) + 2Cl⁻(aq) → 2Br⁻(aq) + Cl₂(g):\nE°_cell = E°(Br₂/Br⁻) - E°(Cl₂/Cl⁻) = +1.08 V - (+1.36 V) = -0.28 V.\n2. Since E°_cell is negative, ΔG° is positive, and the reaction cannot occur spontaneously.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1842,
    originalQuestion: {
      question: "The heats of combustion ΔH° for C(s), H₂(g) and CH₄(g) are -94, -68 and -213 kcal/mol, respectively. Then ΔH° for the reaction C(s) + 2H₂(g) → CH₄(g) is: [AIPMT 2002]",
      option_a: "-17 kcal",
      option_b: "-111 kcal",
      option_c: "-170 kcal",
      option_d: "-85 kcal",
      correct_option: "A",
      explanation: "Let the combustion reactions be:\n(1) C(s) + O₂(g) → CO₂(g); ΔH₁° = -94 kcal/mol\n(2) H₂(g) + 1/2 O₂(g) → H₂O(l); ΔH₂° = -68 kcal/mol\n(3) CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l); ΔH₃° = -213 kcal/mol\n\nTarget reaction:\nC(s) + 2H₂(g) → CH₄(g)\n\nUsing Hess's Law:\nΔH° = ΔH₁° + 2(ΔH₂°) - ΔH₃°\nΔH° = (-94) + 2(-68) - (-213)\nΔH° = -94 - 136 + 213\nΔH° = -230 + 213 = -17 kcal/mol.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Given heats of combustion: ΔH_c°(C, graphite) = -393.5 kJ mol⁻¹, ΔH_c°(H₂) = -285.8 kJ mol⁻¹, and ΔH_c°(C₂H₆) = -1560.0 kJ mol⁻¹. Calculate the heat of formation of ethane (C₂H₆).",
      option_a: "-84.4 kJ mol⁻¹",
      option_b: "-168.8 kJ mol⁻¹",
      option_c: "+84.4 kJ mol⁻¹",
      option_d: "-42.2 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Target reaction: 2C(s) + 3H₂(g) → C₂H₆(g).\n2. ΔH_f°(C₂H₆) = 2ΔH_c°(C) + 3ΔH_c°(H₂) - ΔH_c°(C₂H₆)\n3. ΔH_f° = 2(-393.5) + 3(-285.8) - (-1560.0) = -787.0 - 857.4 + 1560.0 = -1644.4 + 1560.0 = -84.4 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1841,
    originalQuestion: {
      question: "In a closed insulated container, a liquid is stirred with a paddle to increase its temperature. Which of the following is true? [AIPMT 2002]",
      option_a: "ΔE = W ≠ 0, q = 0",
      option_b: "ΔE = w = q ≠ 0",
      option_c: "ΔE = 0, W = q ≠ 0",
      option_d: "W = 0, ΔE = q ≠ 0",
      correct_option: "A",
      explanation: "1. The container is completely insulated from the surroundings, which means no heat can enter or leave the system. Therefore, q = 0 (adiabatic process).\n2. The liquid is stirred mechanically with a paddle, meaning mechanical work is performed on the liquid (work is done on the system), so W ≠ 0 (W > 0).\n3. According to the First Law of Thermodynamics:\nΔE = q + W\nSubstituting q = 0:\nΔE = W ≠ 0.\n4. Since W > 0, the internal energy increases (ΔE > 0), which manifests as a rise in the liquid's temperature.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "An insulated rigid vessel contains a gas that is heated by passing an electric current through a resistor inside the vessel. For this process:",
      option_a: "q = 0, w ≠ 0, ΔU ≠ 0",
      option_b: "q ≠ 0, w = 0, ΔU = 0",
      option_c: "q = 0, w = 0, ΔU = 0",
      option_d: "q ≠ 0, w ≠ 0, ΔU = 0",
      correct_option: "A",
      explanation: "1. Because the vessel is thermally insulated, no heat crosses the system boundary: q = 0.\n2. Electrical energy is supplied to the system, representing work done on the system: w ≠ 0.\n3. By the First Law of Thermodynamics, ΔU = q + w = w ≠ 0, resulting in an increase in internal energy and temperature.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1840,
    originalQuestion: {
      question: "The unit of entropy is: [AIPMT 2002]",
      option_a: "J K⁻¹ mol⁻¹",
      option_b: "J mol⁻¹",
      option_c: "J⁻¹ K⁻¹ mol⁻¹",
      option_d: "J K mol⁻¹",
      correct_option: "A",
      explanation: "1. Entropy (S) is defined by the thermodynamic relation:\nΔS = q_rev / T\nwhere q_rev is the reversible heat exchanged and T is the absolute temperature in Kelvin.\n2. The SI unit of heat (energy) is Joules (J) and that of temperature is Kelvin (K).\n3. Hence, the unit of entropy is J K⁻¹.\n4. When expressed per mole of a substance (molar entropy), the unit is J K⁻¹ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the SI unit of molar heat capacity at constant pressure (C_p)?",
      option_a: "J K⁻¹ mol⁻¹",
      option_b: "J mol⁻¹",
      option_c: "J K mol⁻¹",
      option_d: "kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Heat capacity is defined as C = q / (n ΔT).\n2. Heat q is in Joules (J), amount of substance n is in moles (mol), and temperature change ΔT is in Kelvin (K).\n3. Therefore, the SI unit of molar heat capacity is J K⁻¹ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1839,
    originalQuestion: {
      question: "The molar heat capacity of water at constant pressure, Cₚ, is 75 J K⁻¹ mol⁻¹. When 1.0 kJ of heat is supplied to 100 g of water, which is free to expand, the increase in temperature of water is: [AIPMT 2003]",
      option_a: "1.2 K",
      option_b: "2.4 K",
      option_c: "4.8 K",
      option_d: "6.6 K",
      correct_option: "B",
      explanation: "1. Number of moles of water (H₂O, molar mass M = 18 g mol⁻¹):\nn = mass / molar mass = 100 g / 18 g mol⁻¹ = 5.556 mol.\n\n2. The heat supplied at constant pressure is related to temperature change by:\nq = n Cₚ ΔT\n\n3. Given:\n- q = 1.0 kJ = 1000 J\n- Cₚ = 75 J K⁻¹ mol⁻¹\n\n4. Solving for ΔT:\nΔT = q / (n Cₚ) = 1000 / (5.556 × 75) = 1000 / 416.67 ≈ 2.4 K.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "How much heat is required to raise the temperature of 90 g of water from 300 K to 310 K at constant pressure? (Given C_p of water = 75.3 J K⁻¹ mol⁻¹)",
      option_a: "3765 J",
      option_b: "7530 J",
      option_c: "1882 J",
      option_d: "5420 J",
      correct_option: "A",
      explanation: "1. Moles of water: n = 90 / 18 = 5 mol.\n2. Temperature change: ΔT = 310 - 300 = 10 K.\n3. Heat required: q = n C_p ΔT = 5 × 75.3 × 10 = 3765 J = 3.765 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1838,
    originalQuestion: {
      question: "For which one of the following equations is ΔH°_react equal to ΔH°_f for the product? [AIPMT 2003]",
      option_a: "Xe(g) + 2F₂(g) → XeF₄(g)",
      option_b: "2CO(g) + O₂(g) → 2CO₂(g)",
      option_c: "N₂(g) + O₃(g) → N₂O₃(g)",
      option_d: "CH₄(g) + 2Cl₂(g) → CH₂Cl₂(l) + 2HCl(g)",
      correct_option: "A",
      explanation: "By IUPAC definition, the standard enthalpy of formation (ΔH_f°) is the enthalpy change accompanying the formation of exactly one mole of a compound from its constituent elements in their most stable reference states at 298 K and 1 bar.\n\nLet us analyze each reaction:\n1. Option A: Xe(g) + 2F₂(g) → XeF₄(g).\nHere, exactly 1 mole of XeF₄(g) is formed directly from its constituent elements, Xenon (Xe(g)) and Fluorine (F₂(g)), in their standard elemental states. Hence, ΔH°_rxn = ΔH_f°(XeF₄).\n2. Option B: 2CO(g) + O₂(g) → 2CO₂(g). Forms 2 moles of product and uses CO (a compound, not an element).\n3. Option C: N₂(g) + O₃(g) → N₂O₃(g). Ozone (O₃) is not the standard reference state of oxygen (which is O₂(g)).\n4. Option D: Uses compounds (CH₄) and forms multiple products.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For which of the following reactions does the enthalpy of reaction represent the standard enthalpy of formation of the product?",
      option_a: "C(diamond) + O₂(g) → CO₂(g)",
      option_b: "H₂(g) + Br₂(l) → 2HBr(g)",
      option_c: "C(graphite) + O₂(g) → CO₂(g)",
      option_d: "CaO(s) + CO₂(g) → CaCO₃(s)",
      correct_option: "C",
      explanation: "1. The standard reference state for carbon is graphite, not diamond.\n2. Formation requires exactly 1 mole of product formed exclusively from constituent elements in their standard reference states.\n3. Reaction C(graphite) + O₂(g) → CO₂(g) forms 1 mole of CO₂ from graphite and O₂(g), so ΔH°_rxn = ΔH_f°(CO₂).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1837,
    originalQuestion: {
      question: "Formation of a solution from two components can be considered as: (i) Pure solvent → separated solvent molecules, ΔH₁ (ii) Pure solute → separated solute molecules, ΔH₂ (iii) Separated solvent and solute molecules → solution, ΔH₃ The solution so formed will be ideal if: [AIPMT 2003]",
      option_a: "ΔH_soln = ΔH₁ + ΔH₂ + ΔH₃",
      option_b: "ΔH_soln = ΔH₁ + ΔH₂ - ΔH₃",
      option_c: "ΔH_soln = ΔH₁ - ΔH₂ - ΔH₃",
      option_d: "ΔH_soln = ΔH₃ - ΔH₁ - ΔH₂",
      correct_option: "A",
      explanation: "1. The overall dissolution process can be represented via a Hess's law thermochemical cycle in three steps:\n- Step 1: Breaking solvent-solvent attractive intermolecular forces to separate solvent molecules: absorbs energy, ΔH₁ > 0.\n- Step 2: Breaking solute-solute attractive intermolecular forces to separate solute molecules: absorbs energy, ΔH₂ > 0.\n- Step 3: Bringing separated solvent and solute molecules together to establish new solute-solvent interactions: releases energy, ΔH₃ < 0.\n\n2. According to Hess's Law of constant heat summation, the net enthalpy of solution is the algebraic sum of the enthalpy changes of all steps:\nΔH_soln = ΔH₁ + ΔH₂ + ΔH₃.\n\n(For an ideal solution, the attractive interactions between solute and solvent are identical in magnitude to those within pure components, making ΔH₁ + ΔH₂ = -ΔH₃, so ΔH_soln = 0).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A non-ideal solution with positive deviation from Raoult's law is formed when solute and solvent are mixed. Which condition holds true?",
      option_a: "ΔH_mix > 0 and ΔV_mix > 0",
      option_b: "ΔH_mix < 0 and ΔV_mix < 0",
      option_c: "ΔH_mix = 0 and ΔV_mix = 0",
      option_d: "ΔH_mix < 0 and ΔV_mix > 0",
      correct_option: "A",
      explanation: "1. In positive deviations, solute-solvent attractive forces (A-B) are weaker than solute-solute (A-A) and solvent-solvent (B-B) forces.\n2. More energy is required to break pure component interactions than is released during new interaction formation, making dissolution endothermic: ΔH_mix > 0.\n3. Molecules escape more easily and occupy a slightly greater volume: ΔV_mix > 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1836,
    originalQuestion: {
      question: "What is the entropy change (in J K⁻¹ mol⁻¹) when one mole of ice is converted into water at 0°C? The enthalpy change for the conversion of ice to liquid water is 6.0 kJ mol⁻¹ at 0°C. [AIPMT 2003]",
      option_a: "20.13",
      option_b: "2.013",
      option_c: "2.198",
      option_d: "21.98",
      correct_option: "D",
      explanation: "1. The conversion of ice into water at 0 °C is a phase transition (fusion) that occurs at equilibrium at the normal melting point.\n2. The entropy of fusion is given by:\nΔS_fus = ΔH_fus / T_f\n\n3. Given:\n- ΔH_fus = 6.0 kJ mol⁻¹ = 6000 J mol⁻¹\n- T_f = 0 °C = 0 + 273 = 273 K (or 273.15 K)\n\n4. Calculating ΔS_fus:\nΔS_fus = 6000 J mol⁻¹ / 273 K ≈ 21.978 J K⁻¹ mol⁻¹ ≈ 21.98 J K⁻¹ mol⁻¹.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The enthalpy of vaporisation of water at 100 °C is 40.7 kJ mol⁻¹. What is the entropy of vaporisation of water (in J K⁻¹ mol⁻¹)?",
      option_a: "109.1 J K⁻¹ mol⁻¹",
      option_b: "407.0 J K⁻¹ mol⁻¹",
      option_c: "88.0 J K⁻¹ mol⁻¹",
      option_d: "40.7 J K⁻¹ mol⁻¹",
      correct_option: "A",
      explanation: "1. Boiling point of water: T_b = 100 °C = 373.15 K.\n2. Enthalpy of vaporisation: ΔH_vap = 40.7 kJ mol⁻¹ = 40,700 J mol⁻¹.\n3. Entropy of vaporisation:\nΔS_vap = ΔH_vap / T_b = 40,700 / 373.15 ≈ 109.07 ≈ 109.1 J K⁻¹ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1835,
    originalQuestion: {
      question: "The densities of graphite and diamond at 298 K are 2.25 and 3.31 g cm⁻³, respectively. If the standard free energy difference (ΔG°) is equal to 1895 J mol⁻¹, the pressure at which graphite will be transformed into diamond at 298 K is: [AIPMT 2003]",
      option_a: "11.14 × 10⁸ Pa",
      option_b: "11.14 × 10⁷ Pa",
      option_c: "11.14 × 10⁶ Pa",
      option_d: "11.14 × 10⁵ Pa",
      correct_option: "A",
      explanation: "1. For the phase transformation C(graphite) → C(diamond), the pressure dependence of Gibbs free energy at constant temperature is given by:\n(∂ΔG / ∂P)_T = ΔV\nIntegrating from standard pressure P° ≈ 0 to equilibrium pressure P:\nΔG_P = ΔG° + P ΔV\nAt equilibrium, ΔG_P = 0, so:\nP = -ΔG° / ΔV\n\n2. Given molar mass of carbon = 12 g mol⁻¹:\n- Molar volume of graphite, V_graphite = 12 / 2.25 = 5.333 cm³ mol⁻¹ = 5.333 × 10⁻⁶ m³ mol⁻¹\n- Molar volume of diamond, V_diamond = 12 / 3.31 = 3.625 cm³ mol⁻¹ = 3.625 × 10⁻⁶ m³ mol⁻¹\n- ΔV = V_diamond - V_graphite = (3.625 - 5.333) × 10⁻⁶ = -1.708 × 10⁻⁶ m³ mol⁻¹\n\n3. Calculating equilibrium pressure P:\nP = -1895 J mol⁻¹ / (-1.708 × 10⁻⁶ m³ mol⁻¹) ≈ 1.109 × 10⁹ Pa ≈ 11.14 × 10⁸ Pa.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "According to Le Chatelier's principle, applying very high pressure to the carbon phase equilibrium C(graphite) ⇌ C(diamond) favours:",
      option_a: "Diamond, because diamond has a higher density and smaller molar volume",
      option_b: "Graphite, because graphite has a higher entropy",
      option_c: "Neither, because pressure has no effect on solid-solid equilibria",
      option_d: "Graphite, because graphite has lower density",
      correct_option: "A",
      explanation: "1. The density of diamond (3.51 g cm⁻³) is greater than that of graphite (2.26 g cm⁻³).\n2. Consequently, diamond occupies a smaller volume per mole than graphite (ΔV < 0 for graphite → diamond).\n3. By Le Chatelier's principle, increasing pressure shifts the equilibrium in the direction of smaller volume, thereby favouring the formation of diamond.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1834,
    originalQuestion: {
      question: "For the reaction, C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l), at constant temperature, ΔH - ΔE is: [AIPMT 2003]",
      option_a: "+RT",
      option_b: "-3RT",
      option_c: "+3RT",
      option_d: "-RT",
      correct_option: "B",
      explanation: "1. The relationship between enthalpy change (ΔH) and internal energy change (ΔE) is:\nΔH = ΔE + Δn_g RT\nRearranging gives:\nΔH - ΔE = Δn_g RT\n\n2. For the reaction:\nC₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)\n- Gaseous products: 3 moles of CO₂(g) (H₂O is in liquid state).\n- Gaseous reactants: 1 mole of C₃H₈(g) + 5 moles of O₂(g) = 6 moles.\n- Change in gaseous moles, Δn_g = 3 - 6 = -3.\n\n3. Substituting Δn_g = -3:\nΔH - ΔE = (-3)RT = -3RT.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For the complete combustion of liquid benzene, C₆H₆(l) + 15/2 O₂(g) → 6CO₂(g) + 3H₂O(l) at 298 K, what is the value of (ΔH - ΔU)?",
      option_a: "-1.5 RT",
      option_b: "+1.5 RT",
      option_c: "-0.5 RT",
      option_d: "+0.5 RT",
      correct_option: "A",
      explanation: "1. Formula: ΔH - ΔU = Δn_g RT.\n2. In the equation: C₆H₆(l) + 15/2 O₂(g) → 6CO₂(g) + 3H₂O(l):\n- Gaseous products = 6 moles of CO₂(g).\n- Gaseous reactants = 15/2 = 7.5 moles of O₂(g).\n- Δn_g = 6 - 7.5 = -1.5.\n3. Therefore, ΔH - ΔU = -1.5 RT.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1833,
    originalQuestion: {
      question: "The work done during the expansion of a gas from a volume of 4 dm³ to 6 dm³ against a constant external pressure of 3 atm is (1 L atm = 101.32 J): [AIPMT 2004]",
      option_a: "-6 J",
      option_b: "-608 J",
      option_c: "+304 J",
      option_d: "-304 J",
      correct_option: "B",
      explanation: "1. In thermodynamics (IUPAC convention), work done during irreversible expansion against constant external pressure is given by:\nw = -P_ext ΔV = -P_ext (V₂ - V₁)\n\n2. Given:\n- P_ext = 3 atm\n- V₁ = 4 dm³ = 4 L\n- V₂ = 6 dm³ = 6 L\n- ΔV = 6 - 4 = 2 L\n\n3. Calculating work in L atm:\nw = -3 atm × 2 L = -6 L atm\n\n4. Converting to Joules (using 1 L atm = 101.32 J):\nw = -6 × 101.32 J = -607.92 J ≈ -608 J.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Calculate the work done when an ideal gas expands from 2 L to 7 L against a constant external pressure of 2 atm. (1 L atm = 101.3 J)",
      option_a: "-1013 J",
      option_b: "-506.5 J",
      option_c: "+1013 J",
      option_d: "-2026 J",
      correct_option: "A",
      explanation: "1. Expansion work: w = -P_ext ΔV = -2 atm × (7 - 2) L = -10 L atm.\n2. In Joules: w = -10 × 101.3 J = -1013 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1832,
    originalQuestion: {
      question: "Considering entropy (S) as a thermodynamic parameter, the criterion for the spontaneity of any process is: [AIPMT 2004]",
      option_a: "ΔS_system + ΔS_surroundings > 0",
      option_b: "ΔS_system - ΔS_surroundings > 0",
      option_c: "ΔS_system > 0 only",
      option_d: "ΔS_surroundings > 0 only",
      correct_option: "A",
      explanation: "1. According to the Second Law of Thermodynamics, any spontaneous (irreversible) process that occurs in the universe leads to an increase in the total entropy of the universe:\nΔS_total = ΔS_univ = ΔS_system + ΔS_surroundings > 0.\n\n2. A process may have ΔS_system < 0 and still be spontaneous, provided ΔS_surroundings is sufficiently positive such that their sum exceeds zero (e.g., freezing of water below 0 °C).\n3. Hence, neither ΔS_system > 0 nor ΔS_surroundings > 0 alone is a necessary or sufficient criterion; only the combined entropy change of system and surroundings being positive guarantees spontaneity.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Under what condition is a chemical reaction at dynamic equilibrium in terms of total entropy of the universe?",
      option_a: "ΔS_system + ΔS_surroundings = 0",
      option_b: "ΔS_system + ΔS_surroundings > 0",
      option_c: "ΔS_system = 0 only",
      option_d: "ΔS_surroundings = 0 only",
      correct_option: "A",
      explanation: "1. For a reversible process at thermodynamic equilibrium, the total entropy of the universe remains constant:\nΔS_total = ΔS_system + ΔS_surroundings = 0.\n2. (Spontaneous processes have ΔS_total > 0, while impossible/non-spontaneous processes would have ΔS_total < 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1831,
    originalQuestion: {
      question: "The standard enthalpy and standard entropy changes for the oxidation of ammonia at 298 K are -382.64 kJ mol⁻¹ and -145.6 J K⁻¹ mol⁻¹, respectively. The standard Gibbs energy change for the same reaction at 298 K is: [AIPMT 2004]",
      option_a: "-221.1 kJ mol⁻¹",
      option_b: "-339.3 kJ mol⁻¹",
      option_c: "-439.3 kJ mol⁻¹",
      option_d: "-523.2 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. The standard Gibbs energy change is given by the Gibbs-Helmholtz equation:\nΔG° = ΔH° - T ΔS°\n\n2. Given:\n- ΔH° = -382.64 kJ mol⁻¹\n- ΔS° = -145.6 J K⁻¹ mol⁻¹ = -0.1456 kJ K⁻¹ mol⁻¹\n- T = 298 K\n\n3. Calculating T ΔS°:\nT ΔS° = 298 K × (-0.1456 kJ K⁻¹ mol⁻¹) = -43.3888 kJ mol⁻¹\n\n4. Calculating ΔG°:\nΔG° = -382.64 - (-43.3888) = -382.64 + 43.3888 = -339.2512 kJ mol⁻¹ ≈ -339.3 kJ mol⁻¹.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction at 300 K, ΔH° = -120 kJ mol⁻¹ and ΔS° = -100 J K⁻¹ mol⁻¹. The value of ΔG° for the reaction is:",
      option_a: "-90 kJ mol⁻¹",
      option_b: "-150 kJ mol⁻¹",
      option_c: "+90 kJ mol⁻¹",
      option_d: "-60 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Formula: ΔG° = ΔH° - T ΔS°.\n2. T ΔS° = 300 K × (-0.100 kJ K⁻¹ mol⁻¹) = -30 kJ mol⁻¹.\n3. ΔG° = -120 - (-30) = -120 + 30 = -90 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1830,
    originalQuestion: {
      question: "If the bond energies of H-H, Br-Br and H-Br are 433, 192 and 364 kJ mol⁻¹, respectively, the ΔH° for the reaction H₂(g) + Br₂(g) → 2HBr(g) is: [AIPMT 2004]",
      option_a: "-261 kJ",
      option_b: "+103 kJ",
      option_c: "+261 kJ",
      option_d: "-103 kJ",
      correct_option: "D",
      explanation: "The enthalpy change of a reaction in terms of bond dissociation energies is given by:\nΔH° = Σ BE(bonds broken in reactants) - Σ BE(bonds formed in products)\n\nFor the reaction:\nH₂(g) + Br₂(g) → 2HBr(g)\n\n1. Bonds broken in reactants:\n- 1 mole of H-H bonds: 433 kJ mol⁻¹\n- 1 mole of Br-Br bonds: 192 kJ mol⁻¹\nTotal energy required to break bonds = 433 + 192 = 625 kJ\n\n2. Bonds formed in products:\n- 2 moles of H-Br bonds: 2 × 364 = 728 kJ\nTotal energy released upon bond formation = 728 kJ\n\n3. Enthalpy change:\nΔH° = 625 - 728 = -103 kJ.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Using bond energies: BE(H-H) = 436 kJ mol⁻¹, BE(Cl-Cl) = 242 kJ mol⁻¹, and BE(H-Cl) = 431 kJ mol⁻¹, the standard enthalpy change for H₂(g) + Cl₂(g) → 2HCl(g) is:",
      option_a: "-184 kJ",
      option_b: "-92 kJ",
      option_c: "+184 kJ",
      option_d: "-247 kJ",
      correct_option: "A",
      explanation: "1. Bonds broken: BE(H-H) + BE(Cl-Cl) = 436 + 242 = 678 kJ.\n2. Bonds formed: 2 × BE(H-Cl) = 2 × 431 = 862 kJ.\n3. ΔH° = 678 - 862 = -184 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1829,
    originalQuestion: {
      question: "The absolute enthalpy of neutralisation of the reaction MgO(s) + 2HCl(aq) → MgCl₂(aq) + H₂O(l) will be: [AIPMT 2005]",
      option_a: "-57.33 kJ mol⁻¹",
      option_b: "Greater than -57.33 kJ mol⁻¹",
      option_c: "Less than -57.33 kJ mol⁻¹",
      option_d: "57.33 kJ mol⁻¹",
      correct_option: "C",
      explanation: "1. The standard enthalpy of neutralisation of a strong acid by a strong base in dilute aqueous solution (H⁺(aq) + OH⁻(aq) → H₂O(l)) is constant and equals -57.33 kJ mol⁻¹.\n2. In the given reaction, magnesium oxide is a solid basic oxide:\nMgO(s) + 2HCl(aq) → MgCl₂(aq) + H₂O(l)\n3. This overall process involves two steps:\n- Step 1: Dissolution/reaction of solid MgO to form aqueous Mg²⁺ and O²⁻ / 2OH⁻ ions, which has a significantly negative enthalpy of hydration.\n- Step 2: Neutralisation of base by acid (H⁺ + OH⁻ → H₂O).\n4. The additional exothermic contribution from the hydration of Mg²⁺ ions and the dissolution of MgO makes the overall reaction more exothermic than -57.33 kJ mol⁻¹ (i.e. more negative, so algebraically less than -57.33 kJ mol⁻¹).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The enthalpy of neutralisation of HCN(aq) by NaOH(aq) is -12.1 kJ mol⁻¹. Why is the magnitude of heat released significantly less than 57.33 kJ mol⁻¹?",
      option_a: "A portion of heat is absorbed in the complete dissociation of the weak acid HCN",
      option_b: "HCN forms an insoluble complex with sodium ions",
      option_c: "NaOH undergoes incomplete dissociation in the presence of cyanide ions",
      option_d: "Neutralisation of HCN is an endothermic process",
      correct_option: "A",
      explanation: "1. Hydrocyanic acid (HCN) is a weak acid and exists predominantly in unionized form.\n2. Energy (enthalpy of dissociation, ΔH_diss = 57.33 - 12.1 = 45.23 kJ mol⁻¹) is absorbed from the system to ionize HCN into H⁺ and CN⁻.\n3. Consequently, the net heat released is reduced to -12.1 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1828,
    originalQuestion: {
      question: "A reaction occurs spontaneously if: [AIPMT 2005]",
      option_a: "TΔS < ΔH and both ΔH and ΔS are positive",
      option_b: "TΔS > ΔH and ΔH is positive and ΔS is negative",
      option_c: "TΔS > ΔH and both ΔH and ΔS are positive",
      option_d: "TΔS = ΔH and both ΔH and ΔS are positive",
      correct_option: "C",
      explanation: "1. According to the Gibbs equation, the criterion for spontaneity at constant temperature and pressure is:\nΔG = ΔH - TΔS < 0\n\n2. Let us analyze the case when both ΔH > 0 (endothermic) and ΔS > 0 (entropy increases):\nΔG = ΔH - TΔS\nFor ΔG to be negative (spontaneous):\nΔH - TΔS < 0 ⇒ TΔS > ΔH.\n\n3. In Option A, if TΔS < ΔH, then ΔG > 0 (non-spontaneous).\n4. In Option B, if ΔH > 0 and ΔS < 0, then -TΔS > 0, so ΔG is always positive (never spontaneous).\n5. In Option D, if TΔS = ΔH, then ΔG = 0 (equilibrium).\n\nTherefore, the reaction is spontaneous when TΔS > ΔH and both ΔH and ΔS are positive.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Under what conditions will an endothermic reaction (ΔH > 0) with a decrease in entropy (ΔS < 0) become spontaneous?",
      option_a: "At extremely high temperatures",
      option_b: "At extremely low temperatures",
      option_c: "It can never be spontaneous at any temperature",
      option_d: "At its standard equilibrium temperature",
      correct_option: "C",
      explanation: "1. The Gibbs equation is ΔG = ΔH - TΔS.\n2. When ΔH > 0 (positive) and ΔS < 0 (negative), the term -TΔS is positive at all absolute temperatures (T > 0 K).\n3. Because ΔG is the sum of two strictly positive terms, ΔG > 0 at all temperatures.\n4. Therefore, such a reaction is non-spontaneous at all temperatures.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1827,
    originalQuestion: {
      question: "Which of the following pairs of conditions is certain to result in a spontaneous reaction? [AIPMT 2005]",
      option_a: "Exothermic and increasing disorder",
      option_b: "Exothermic and decreasing disorder",
      option_c: "Endothermic and increasing disorder",
      option_d: "Endothermic and decreasing disorder",
      correct_option: "A",
      explanation: "1. The condition for spontaneity is ΔG = ΔH - TΔS < 0.\n2. For an exothermic reaction: ΔH < 0 (negative).\n3. For increasing disorder (randomness): ΔS > 0 (positive).\n4. When ΔS > 0, the term -TΔS is negative at all absolute temperatures (T > 0 K).\n5. Thus, ΔG = (negative) + (negative) = negative at all temperatures, guaranteeing spontaneity regardless of the temperature.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which set of thermodynamic parameters will always produce a non-spontaneous process at all temperatures?",
      option_a: "ΔH < 0, ΔS > 0",
      option_b: "ΔH > 0, ΔS < 0",
      option_c: "ΔH > 0, ΔS > 0",
      option_d: "ΔH < 0, ΔS < 0",
      correct_option: "B",
      explanation: "1. When ΔH > 0 (endothermic) and ΔS < 0 (entropy decreases), -TΔS is positive.\n2. Hence, ΔG = ΔH - TΔS is always positive (ΔG > 0) at all positive temperatures.\n3. The reaction is non-spontaneous at every temperature.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1826,
    originalQuestion: {
      question: "The enthalpy of hydrogenation of cyclohexene is -119.5 kJ mol⁻¹. If the resonance energy of benzene is -150.4 kJ mol⁻¹, its enthalpy of hydrogenation would be: [AIPMT 2006]",
      option_a: "-358.5 kJ mol⁻¹",
      option_b: "-508.9 kJ mol⁻¹",
      option_c: "-208.1 kJ mol⁻¹",
      option_d: "-269.9 kJ mol⁻¹",
      correct_option: "C",
      explanation: "1. Cyclohexene contains one C=C double bond, and its hydrogenation enthalpy is -119.5 kJ mol⁻¹.\n2. A hypothetical non-resonating 1,3,5-cyclohexatriene molecule contains three isolated C=C double bonds. Its theoretical enthalpy of hydrogenation is:\nΔH_theoretical = 3 × (-119.5 kJ mol⁻¹) = -358.5 kJ mol⁻¹.\n\n3. Benzene is stabilized by delocalization of π-electrons. The resonance energy is given by:\nResonance Energy = ΔH_actual - ΔH_theoretical\n-150.4 kJ mol⁻¹ = ΔH_actual - (-358.5 kJ mol⁻¹)\n\n4. Solving for the actual enthalpy of hydrogenation of benzene:\nΔH_actual = -358.5 - (-150.4) = -358.5 + 150.4 = -208.1 kJ mol⁻¹.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If the actual enthalpy of hydrogenation of benzene is -208.5 kJ mol⁻¹ and that of cyclohexene is -119.5 kJ mol⁻¹, the resonance energy of benzene is:",
      option_a: "-150.0 kJ mol⁻¹",
      option_b: "-567.0 kJ mol⁻¹",
      option_c: "+150.0 kJ mol⁻¹",
      option_d: "-89.0 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Theoretical hydrogenation enthalpy for 3 double bonds = 3 × (-119.5) = -358.5 kJ mol⁻¹.\n2. Resonance energy = ΔH_actual - ΔH_theoretical = -208.5 - (-358.5) = +150.0 kJ mol⁻¹ stabilization energy (or -150.0 kJ mol⁻¹ relative to cyclohexatriene).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1825,
    originalQuestion: {
      question: "The enthalpy and entropy changes for the reaction Br₂(l) + Cl₂(g) → 2BrCl(g) are 30 kJ mol⁻¹ and 105 J K⁻¹ mol⁻¹, respectively. The temperature at which the reaction will be in equilibrium is: [AIPMT 2006]",
      option_a: "300 K",
      option_b: "285.7 K",
      option_c: "273 K",
      option_d: "450 K",
      correct_option: "B",
      explanation: "1. At chemical equilibrium, the change in Gibbs free energy is zero:\nΔG = ΔH - T ΔS = 0\n\n2. Rearranging gives the equilibrium temperature:\nT = ΔH / ΔS\n\n3. Given:\n- ΔH = 30 kJ mol⁻¹ = 30,000 J mol⁻¹\n- ΔS = 105 J K⁻¹ mol⁻¹\n\n4. Calculating T:\nT = 30,000 / 105 = 285.71 K ≈ 285.7 K.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a given reaction, ΔH = 35.5 kJ mol⁻¹ and ΔS = 83.6 J K⁻¹ mol⁻¹. At what temperature will the reaction achieve equilibrium?",
      option_a: "424.6 K",
      option_b: "298.0 K",
      option_c: "512.4 K",
      option_d: "355.0 K",
      correct_option: "A",
      explanation: "1. At equilibrium, ΔG = 0 ⇒ T = ΔH / ΔS.\n2. T = 35,500 J mol⁻¹ / 83.6 J K⁻¹ mol⁻¹ ≈ 424.64 K ≈ 424.6 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1824,
    originalQuestion: {
      question: "Assume each reaction is carried out in an open container. For which reaction will ΔH = ΔE? [AIPMT 2006]",
      option_a: "2CO(g) + O₂(g) → 2CO₂(g)",
      option_b: "H₂(g) + Br₂(g) → 2HBr(g)",
      option_c: "C(s) + 2H₂O(g) → 2H₂(g) + CO₂(g)",
      option_d: "PCl₅(g) → PCl₃(g) + Cl₂(g)",
      correct_option: "B",
      explanation: "The relation between enthalpy change (ΔH) and internal energy change (ΔE) is:\nΔH = ΔE + Δn_g RT\n\nFor ΔH to equal ΔE, the term Δn_g RT must be zero, which requires:\nΔn_g = n_g(products) - n_g(reactants) = 0.\n\nLet us calculate Δn_g for each reaction:\n1. Option A: 2CO(g) + O₂(g) → 2CO₂(g) ⇒ Δn_g = 2 - (2 + 1) = -1 ≠ 0.\n2. Option B: H₂(g) + Br₂(g) → 2HBr(g) ⇒ Δn_g = 2 - (1 + 1) = 2 - 2 = 0. Here ΔH = ΔE.\n3. Option C: C(s) + 2H₂O(g) → 2H₂(g) + CO₂(g) ⇒ Δn_g = (2 + 1) - 2 = 3 - 2 = +1 ≠ 0.\n4. Option D: PCl₅(g) → PCl₃(g) + Cl₂(g) ⇒ Δn_g = (1 + 1) - 1 = +1 ≠ 0.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For which of the following gaseous reactions is the enthalpy change strictly equal to the change in internal energy (ΔH = ΔU)?",
      option_a: "N₂(g) + O₂(g) → 2NO(g)",
      option_b: "N₂(g) + 3H₂(g) → 2NH₃(g)",
      option_c: "2SO₂(g) + O₂(g) → 2SO₃(g)",
      option_d: "2NO₂(g) → N₂O₄(g)",
      correct_option: "A",
      explanation: "1. For N₂(g) + O₂(g) → 2NO(g), Δn_g = 2 - (1 + 1) = 0.\n2. Since ΔH = ΔU + Δn_g RT, when Δn_g = 0, ΔH = ΔU.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1823,
    originalQuestion: {
      question: "Identify the correct statement for the change of Gibbs energy for a system (ΔG_system) at constant temperature and pressure. [AIPMT 2006]",
      option_a: "If ΔG_system < 0, the process is not spontaneous.",
      option_b: "If ΔG_system > 0, the process is spontaneous.",
      option_c: "If ΔG_system = 0, the system has attained equilibrium.",
      option_d: "If ΔG_system = 0, the system is still moving in a particular direction.",
      correct_option: "C",
      explanation: "At constant temperature and pressure, the Gibbs free energy change (ΔG_system) provides the fundamental thermodynamic criteria:\n1. If ΔG_system < 0: The process is thermodynamically spontaneous (feasible) in the forward direction.\n2. If ΔG_system > 0: The process is non-spontaneous in the forward direction (its reverse is spontaneous).\n3. If ΔG_system = 0: The system has reached a state of dynamic thermodynamic equilibrium, with no net driving force in either direction.\n\nTherefore, the statement 'If ΔG_system = 0, the system has attained equilibrium' is correct.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following conditions correctly defines a state of chemical equilibrium at constant temperature and pressure?",
      option_a: "ΔG = 0",
      option_b: "ΔH = 0",
      option_c: "ΔS_system = 0",
      option_d: "ΔU = 0",
      correct_option: "A",
      explanation: "1. At constant temperature and pressure, the criterion for chemical equilibrium is that the Gibbs free energy of the system is at a minimum.\n2. At this minimum, the rate of change of Gibbs free energy with extent of reaction is zero, meaning ΔG = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1822,
    originalQuestion: {
      question: "Given that the bond energies of H-H and Cl-Cl are 430 kJ mol⁻¹ and 240 kJ mol⁻¹, respectively, and ΔH_f for HCl is -90 kJ mol⁻¹, the bond enthalpy of HCl is: [AIPMT 2007]",
      option_a: "380 kJ mol⁻¹",
      option_b: "425 kJ mol⁻¹",
      option_c: "245 kJ mol⁻¹",
      option_d: "290 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. The formation reaction for 1 mole of HCl from its elements is:\n1/2 H₂(g) + 1/2 Cl₂(g) → HCl(g)\n\n2. The enthalpy of formation in terms of bond energies is:\nΔH_f°(HCl) = [1/2 BE(H-H) + 1/2 BE(Cl-Cl)] - BE(H-Cl)\n\n3. Given:\n- BE(H-H) = 430 kJ mol⁻¹\n- BE(Cl-Cl) = 240 kJ mol⁻¹\n- ΔH_f°(HCl) = -90 kJ mol⁻¹\n\n4. Substituting values:\n-90 = [1/2(430) + 1/2(240)] - BE(H-Cl)\n-90 = [215 + 120] - BE(H-Cl)\n-90 = 335 - BE(H-Cl)\nBE(H-Cl) = 335 - (-90) = 335 + 90 = 425 kJ mol⁻¹.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Given bond enthalpies: BE(H-H) = 435 kJ mol⁻¹ and BE(I-I) = 151 kJ mol⁻¹. If the enthalpy of formation of HI(g) is +26.5 kJ mol⁻¹, what is the bond enthalpy of H-I?",
      option_a: "266.5 kJ mol⁻¹",
      option_b: "293.0 kJ mol⁻¹",
      option_c: "319.5 kJ mol⁻¹",
      option_d: "240.0 kJ mol⁻¹",
      correct_option: "A",
      explanation: "1. Reaction: 1/2 H₂(g) + 1/2 I₂(g) → HI(g).\n2. ΔH_f = 1/2 BE(H-H) + 1/2 BE(I-I) - BE(H-I).\n3. +26.5 = 1/2(435) + 1/2(151) - BE(H-I) = 217.5 + 75.5 - BE(H-I) = 293 - BE(H-I).\n4. BE(H-I) = 293 - 26.5 = 266.5 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

