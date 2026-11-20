// ch103_part2.js - Questions 30 to 59 (IDs 2186 down to 2157)
module.exports = [
  {
    id: 2186,
    originalQuestion: {
      question: "For the four successive transition elements Cr, Mn, Fe and Co, the stability of the +2 oxidation state follows which order? (Atomic numbers: Cr = 24, Mn = 25, Fe = 26, Co = 27) [AIPMT 2011 Prelims]",
      option_a: "Mn > Fe > Cr > Co",
      option_b: "Fe > Mn > Co > Cr",
      option_c: "Co > Mn > Fe > Cr",
      option_d: "Cr > Mn > Co > Fe",
      correct_option: "A",
      explanation: "Let us examine the electronic configurations of the dipositive ions (M²⁺):\n1. Mn²⁺ (Z = 25): [Ar] 3d⁵ (half-filled d-subshell with extra exchange energy and symmetric charge distribution, providing exceptional thermodynamic stability).\n2. Fe²⁺ (Z = 26): [Ar] 3d⁶\n3. Cr²⁺ (Z = 24): [Ar] 3d⁴ (easily oxidised to Cr³⁺ which has stable t₂g³ configuration in aqueous medium, so +2 is reducing).\n4. Co²⁺ (Z = 27): [Ar] 3d⁷\n\nThe standard reduction potential E°(M³⁺/M²⁺) values are:\nE°(Mn³⁺/Mn²⁺) = +1.57 V (Mn²⁺ is most stable against oxidation).\nE°(Fe³⁺/Fe²⁺) = +0.77 V\nE°(Co³⁺/Co²⁺) = +1.97 V\nE°(Cr³⁺/Cr²⁺) = -0.41 V (Cr²⁺ readily oxidises to Cr³⁺).\n\nAmong these, Mn²⁺ is by far the most stable due to its half-filled d⁵ configuration. The relative stability of +2 state decreases as: Mn > Fe > Cr > Co.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following 3d-transition series divalent ions has the maximum stability in aqueous solution due to a half-filled d-subshell configuration?",
      option_a: "Fe²⁺",
      option_b: "Mn²⁺",
      option_c: "Cr²⁺",
      option_d: "Co²⁺",
      correct_option: "B",
      explanation: "1. The electronic configuration of Mn²⁺ (Z = 25) is [Ar] 3d⁵.\n2. A half-filled 3d⁵ subshell has five unpaired electrons with parallel spins, maximizing exchange energy and resulting in high thermodynamic stability.\n3. In contrast, Fe²⁺ is 3d⁶, Cr²⁺ is 3d⁴, and Co²⁺ is 3d⁷, none of which possesses a half-filled or completely filled d-subshell.\n4. Therefore, Mn²⁺ exhibits maximum stability in the +2 oxidation state among first-row transition elements.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2185,
    originalQuestion: {
      question: "Which of the following statements is not true? [AIPMT 2012 Prelims]",
      option_a: "On passing H₂S through acidified K₂Cr₂O₇ solution, a milky colour is observed.",
      option_b: "Na₂Cr₂O₇ is preferred over K₂Cr₂O₇ in volumetric analysis.",
      option_c: "K₂Cr₂O₇ solution in acidic medium is orange.",
      option_d: "K₂Cr₂O₇ solution becomes yellow when the pH increases beyond 7.",
      correct_option: "B",
      explanation: "Let us evaluate the statements:\n1. Option A: K₂Cr₂O₇ oxidises H₂S to elemental colloidal sulphur (S), which makes the solution milky. This is correct.\n2. Option B: Sodium dichromate (Na₂Cr₂O₇) is hygroscopic and deliquescent (readily absorbs moisture from the air), making it unsuitable as a primary standard. Potassium dichromate (K₂Cr₂O₇) is non-hygroscopic and can be weighed accurately, so K₂Cr₂O₇ is preferred over Na₂Cr₂O₇ in volumetric titrations. Hence, statement B is false.\n3. Option C: In acidic medium, dichromate exists as Cr₂O₇²⁻ which is orange. This is correct.\n4. Option D: In basic medium (pH > 7), Cr₂O₇²⁻ converts to yellow chromate CrO₄²⁻ (Cr₂O₇²⁻ + 2OH⁻ ⇌ 2CrO₄²⁻ + H₂O). This is correct.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why is potassium dichromate (K₂Cr₂O₇) preferred over sodium dichromate (Na₂Cr₂O₇) as a primary standard in volumetric analysis?",
      option_a: "K₂Cr₂O₇ is a much stronger oxidizing agent than Na₂Cr₂O₇",
      option_b: "K₂Cr₂O₇ is non-hygroscopic whereas Na₂Cr₂O₇ is hygroscopic and deliquescent",
      option_c: "K₂Cr₂O₇ has a higher molecular mass which reduces reading errors",
      option_d: "Na₂Cr₂O₇ undergoes decomposition at room temperature",
      correct_option: "B",
      explanation: "1. A primary standard in volumetric analysis must be obtained in high purity and its composition must not change upon exposure to air.\n2. Sodium dichromate (Na₂Cr₂O₇) is deliquescent and absorbs atmospheric moisture readily, making precise weighing impossible.\n3. Potassium dichromate (K₂Cr₂O₇) is crystalline, stable, and completely non-hygroscopic, allowing preparation of standard solutions of exact molarity.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2184,
    originalQuestion: {
      question: "Identify the alloy containing a non-metal as a constituent. [AIPMT 2012 Prelims]",
      option_a: "Invar",
      option_b: "Steel",
      option_c: "Bell metal",
      option_d: "Bronze",
      correct_option: "B",
      explanation: "Let us analyze the composition of each alloy:\n1. Invar: Fe (approx. 64%) and Ni (approx. 36%) — both are transition metals.\n2. Steel: An interstitial alloy consisting of Iron (Fe) and Carbon (C, approx. 0.1% to 1.5%). Carbon is a non-metal.\n3. Bell metal: Copper (Cu, ~78%) and Tin (Sn, ~22%) — both are metals.\n4. Bronze: Copper (Cu, ~88%) and Tin (Sn, ~12%) — both are metals.\n\nThus, steel contains the non-metal carbon as an essential interstitial constituent.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Cast iron contains approximately what percentage of the non-metal carbon?",
      option_a: "0.1% to 0.2%",
      option_b: "3% to 4%",
      option_c: "0.01% to 0.05%",
      option_d: "10% to 12%",
      correct_option: "B",
      explanation: "1. Pig iron obtained from the blast furnace contains about 4% carbon along with impurities like S, P, Si, Mn.\n2. Cast iron is made by melting pig iron with scrap iron and coke, and typically contains about 3% carbon.\n3. Wrought iron is the purest commercial form of iron containing 0.1% to 0.25% carbon.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2183,
    originalQuestion: {
      question: "Four successive members of the first series of transition metals are listed below. For which one of them is the standard potential (E°M²⁺/M) positive? [AIPMT 2012 Mains]",
      option_a: "Co (Z = 27)",
      option_b: "Ni (Z = 28)",
      option_c: "Cu (Z = 29)",
      option_d: "Fe (Z = 26)",
      correct_option: "C",
      explanation: "The standard electrode reduction potential E°(M²⁺/M) depends on three thermodynamic terms according to the Born-Haber cycle:\nΔH = Δ_subH° + IE₁ + IE₂ + Δ_hydH°\n\n1. For copper (Cu): E°(Cu²⁺/Cu) = +0.34 V.\n2. Copper has a uniquely high enthalpy of atomisation (sublimation) and high ionization enthalpies (IE₁ + IE₂) required to transform Cu to Cu²⁺.\n3. The hydration enthalpy released by Cu²⁺ (-2121 kJ/mol) is insufficient to balance the high energy required for atomization and ionization.\n4. For all other 3d transition elements listed, E° is negative: Fe (-0.44 V), Co (-0.28 V), Ni (-0.25 V).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the standard electrode potential E°(Cu²⁺/Cu) positive (+0.34 V) unlike the rest of the 3d transition metals?",
      option_a: "High negative hydration enthalpy of Cu²⁺ balances its sublimation energy",
      option_b: "High enthalpy of atomization and high ionization enthalpy are not balanced by hydration enthalpy",
      option_c: "Copper has exceptionally low first and second ionization enthalpies",
      option_d: "Copper does not form hydrated complexes in aqueous solution",
      correct_option: "B",
      explanation: "1. The positive E°(Cu²⁺/Cu) value means that Cu does not easily liberate H₂ from dilute acids.\n2. Converting Cu(s) into Cu²⁺(aq) requires substantial energy for sublimation (Δ_subH = +339 kJ/mol) and ionization (IE₁ + IE₂ = +2703 kJ/mol).\n3. This total energy absorbed (+3042 kJ/mol) is greater in magnitude than the hydration enthalpy released (Δ_hydH = -2121 kJ/mol).\n4. Hence, the overall process is endothermic, yielding a positive standard reduction potential (+0.34 V).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2182,
    originalQuestion: {
      question: "Which one of the following does not correctly represent the order of the property indicated against it? [AIPMT 2012 Mains]",
      option_a: "Ti < V < Cr < Mn; increasing number of oxidation states",
      option_b: "Ti³⁺ < V³⁺ < Cr³⁺ < Mn³⁺; increasing magnetic moment",
      option_c: "Ti < V < Cr < Mn; increasing melting points",
      option_d: "Ti < V < Mn < Cr; increasing second ionisation enthalpy",
      correct_option: "C",
      explanation: "Let us inspect each option:\n1. Option A: Ti (+2, +3, +4; 3 states) < V (+2, +3, +4, +5; 4 states) < Cr (+2 to +6; 5 states) < Mn (+2 to +7; 6 states). Order is correct.\n2. Option B: Ti³⁺ (3d¹, n = 1) < V³⁺ (3d², n = 2) < Cr³⁺ (3d³, n = 3) < Mn³⁺ (3d⁴, n = 4). Magnetic moments increase with unpaired electrons. Order is correct.\n3. Option C: Manganese (Mn) has an anomalously low melting point (1519 K) compared to Chromium (Cr, 2180 K) and Vanadium (V, 2183 K) because its stable half-filled 3d⁵ configuration holds electrons tightly to the nucleus, reducing delocalization in metallic bonding. Thus the order Ti < V < Cr < Mn is incorrect.\n4. Option D: Second ionization enthalpy order: Ti (1309 kJ/mol) < V (1414 kJ/mol) < Mn (1509 kJ/mol) < Cr (1592 kJ/mol, removal from stable 3d⁵). Order is correct.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Manganese exhibits an anomalously low melting point compared to its neighbouring 3d elements because:",
      option_a: "It has completely filled 3d and 4s orbitals",
      option_b: "The half-filled 3d⁵ electrons are held tightly, resulting in weaker interatomic metallic bonding",
      option_c: "Manganese exists in a non-metallic allotropic form at room temperature",
      option_d: "It has the lowest density among 3d transition elements",
      correct_option: "B",
      explanation: "1. Transition metal melting points depend on the strength of metallic bonding, which involves both ns and (n-1)d electrons.\n2. Manganese has a 3d⁵ 4s² configuration; the d⁵ subshell is symmetrically half-filled and electrons are held tightly by the nucleus.\n3. Consequently, fewer d-electrons participate in interatomic metallic bonding, resulting in a noticeably lower melting point (1246 °C) than Cr (1907 °C).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2181,
    originalQuestion: {
      question: "Which of the following actinoids shows only +3 oxidation state? [AIPMT 2012 Mains]",
      option_a: "Th (Z = 90)",
      option_b: "U (Z = 92)",
      option_c: "Ac (Z = 89)",
      option_d: "Np (Z = 93)",
      correct_option: "C",
      explanation: "1. Actinium (Ac, Z = 89) has the electronic configuration [Rn] 6d¹ 7s².\n2. By losing its three valence electrons (one 6d and two 7s), it achieves the extremely stable noble gas configuration of radon ([Rn]).\n3. Because the inner 5f orbitals are completely empty, actinium does not exhibit variable oxidation states and exclusively forms the +3 oxidation state.\n4. In contrast, Th shows +4, U shows +3, +4, +5, +6, and Np shows +3 to +7.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following actinoid elements exhibits the maximum oxidation state of +7?",
      option_a: "Thorium (Th)",
      option_b: "Americium (Am)",
      option_c: "Neptunium (Np)",
      option_d: "Uranium (U)",
      correct_option: "C",
      explanation: "1. The oxidation states of actinoids increase from +3 in Actinium up to +7 in Neptunium (Np) and Plutonium (Pu).\n2. Both Np and Pu exhibit oxidation states of +3, +4, +5, +6, and +7.\n3. Uranium exhibits a maximum oxidation state of +6 (e.g., UO₂²⁺).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2180,
    originalQuestion: {
      question: "The catalytic activity of transition metals is attributed to their ability to: [AIPMT 2012 Mains]",
      option_a: "Form interstitial compounds",
      option_b: "Exhibit high melting points",
      option_c: "Adopt multiple oxidation states and form complexes",
      option_d: "Act as diamagnetic species",
      correct_option: "C",
      explanation: "The high catalytic activity of transition metals and their compounds is due to two primary factors:\n1. Variable oxidation states: Transition metals can easily change oxidation states (e.g., Fe²⁺/Fe³⁺, V⁴⁺/V⁵⁺), enabling them to participate in redox reaction pathways with lower activation energies.\n2. Formation of complexes and intermediate compounds: They have vacant d-orbitals that can interact with reactant molecules, adsorbing them onto their surface and facilitating bond weakening.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In the Contact process for the manufacture of H₂SO₄, the conversion of SO₂ to SO₃ is catalyzed by V₂O₅. The role of vanadium involves:",
      option_a: "V(V) being reduced to V(IV) by SO₂ and then re-oxidized to V(V) by O₂",
      option_b: "Vanadium forming an irreversible covalent adduct with SO₂",
      option_c: "Vanadium acting purely as a solid heat-absorbing inert matrix",
      option_d: "Vanadium reducing SO₃ back to SO₂ to maintain equilibrium",
      correct_option: "A",
      explanation: "1. V₂O₅ acts as a catalyst by virtue of vanadium's variable oxidation states.\n2. First step: V₂O₅ + SO₂ → 2VO₂ + SO₃ (V is reduced from +5 to +4).\n3. Second step: 4VO₂ + O₂ → 2V₂O₅ (V(IV) is re-oxidised back to V(V) by atmospheric oxygen).\n4. This cyclic redox mechanism provides an alternative low-activation-energy pathway.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2179,
    originalQuestion: {
      question: "Which of the following lanthanoid ions is diamagnetic? (Atomic numbers: Ce = 58, Sm = 62, Eu = 63, Yb = 70) [NEET 2013]",
      option_a: "Ce²⁺",
      option_b: "Yb²⁺",
      option_c: "Sm²⁺",
      option_d: "Eu²⁺",
      correct_option: "B",
      explanation: "Let us write the electronic configurations of the given divalent ions:\n1. Yb (Z = 70): [Xe] 4f¹⁴ 6s² ⇒ Yb²⁺: [Xe] 4f¹⁴ (completely filled 4f subshell, 0 unpaired electrons). It is diamagnetic.\n2. Ce (Z = 58): [Xe] 4f¹ 5d¹ 6s² ⇒ Ce²⁺: [Xe] 4f² (2 unpaired electrons, paramagnetic).\n3. Sm (Z = 62): [Xe] 4f⁶ 6s² ⇒ Sm²⁺: [Xe] 4f⁶ (6 unpaired electrons, paramagnetic).\n4. Eu (Z = 63): [Xe] 4f⁷ 6s² ⇒ Eu²⁺: [Xe] 4f⁷ (7 unpaired electrons, paramagnetic).\n\nThus, only Yb²⁺ has zero unpaired electrons and is diamagnetic.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following trivalent lanthanoid ions is diamagnetic due to having completely filled 4f-orbitals?",
      option_a: "La³⁺",
      option_b: "Lu³⁺",
      option_c: "Gd³⁺",
      option_d: "Ce³⁺",
      correct_option: "B",
      explanation: "1. Lutetium (Lu, Z = 71) has the ground state configuration [Xe] 4f¹⁴ 5d¹ 6s².\n2. Upon losing three electrons to form Lu³⁺, its configuration is [Xe] 4f¹⁴.\n3. The 4f subshell is completely filled, containing zero unpaired electrons.\n4. Therefore, Lu³⁺ is diamagnetic (La³⁺ is also diamagnetic, but its 4f subshell is completely empty [Xe] 4f⁰).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2178,
    originalQuestion: {
      question: "Which of the following statements about interstitial compounds is incorrect? [NEET 2013]",
      option_a: "They have high melting points, higher than those of pure metals.",
      option_b: "They are very hard.",
      option_c: "They retain metallic conductivity.",
      option_d: "They are chemically very reactive.",
      correct_option: "D",
      explanation: "Properties of interstitial compounds (formed when small non-metal atoms like H, C, B, N are trapped inside the crystal lattices of transition metals):\n1. High melting points, higher than those of the corresponding pure metals.\n2. Extreme hardness; some borides approach diamond in hardness.\n3. They retain metallic electrical and thermal conductivity.\n4. They are chemically inert (unreactive towards acids and alkalis).\n\nTherefore, the statement that they are chemically very reactive is incorrect.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following characteristics is true regarding interstitial compounds formed by transition metals?",
      option_a: "They are stoichiometric compounds with simple integer chemical formulas",
      option_b: "They retain metallic electrical conductivity and are chemically inert",
      option_c: "They have significantly lower melting points than the parent metals",
      option_d: "They are soft and highly malleable materials",
      correct_option: "B",
      explanation: "1. Interstitial compounds are non-stoichiometric (e.g., TiH₁.₇, VH₀.₅₆).\n2. They retain metallic conductivity because the electron band structure remains intact.\n3. They are extremely hard, possess very high melting points, and exhibit strong chemical inertness.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2177,
    originalQuestion: {
      question: "Sc (Z = 21) is a transition element but Zn (Z = 30) is not because: [NEET 2013 Karnataka]",
      option_a: "Both Sc³⁺ and Zn²⁺ ions are colourless and form white compounds.",
      option_b: "In the case of Sc, 3d orbitals are partially filled but in Zn these are filled.",
      option_c: "The last electron is assumed to be added to the 4s level in the case of Zn.",
      option_d: "Both Sc and Zn do not exhibit variable oxidation states.",
      correct_option: "B",
      explanation: "1. According to IUPAC definition, a transition element is defined as an element having a partially filled d-subshell in its ground state or in any of its common oxidation states.\n2. Scandium (Sc, Z = 21) has the electronic configuration [Ar] 3d¹ 4s². The 3d-subshell is partially filled in its ground state, so it is a transition metal.\n3. Zinc (Zn, Z = 30) has configuration [Ar] 3d¹⁰ 4s² in the neutral atom and [Ar] 3d¹⁰ in its Zn²⁺ ion. Because the 3d-subshell remains completely filled in both states, zinc is not considered a transition element.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following elements is classified as a non-transition element despite being placed in the d-block?",
      option_a: "Iron (Fe)",
      option_b: "Cadmium (Cd)",
      option_c: "Nickel (Ni)",
      option_d: "Titanium (Ti)",
      correct_option: "B",
      explanation: "1. Group 12 elements (Zn, Cd, Hg) have completely filled d-subshells (d¹⁰) in both their ground atomic states and their common oxidation states (+2).\n2. Cadmium (Cd, Z = 48) has configuration [Kr] 4d¹⁰ 5s² and Cd²⁺ has [Kr] 4d¹⁰.\n3. Consequently, they do not exhibit typical transition element properties like colored ions, paramagnetism, and variable oxidation states, and are not classified as true transition elements.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2176,
    originalQuestion: {
      question: "Reason for lanthanoid contraction is: [AIPMT 2014]",
      option_a: "Negligible screening effect of f-orbitals",
      option_b: "Increasing nuclear charge",
      option_c: "Decreasing nuclear charge",
      option_d: "Decreasing screening effect",
      correct_option: "A",
      explanation: "1. As we move across the lanthanoid series from La (57) to Lu (71), each additional electron enters the inner 4f subshell while the nuclear charge increases by one unit at each step.\n2. The 4f orbitals are diffuse and have poor spatial shielding ability compared to s, p, and d orbitals.\n3. Because of this poor/negligible screening by 4f electrons, the effective nuclear charge (Z_eff) experienced by the outermost 6s electrons increases steadily.\n4. This causes a progressive and cumulative shrinkage of atomic and ionic radii along the series, known as lanthanoid contraction.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The poor shielding effect of which subshell electrons is primarily responsible for actinoid contraction being greater than lanthanoid contraction?",
      option_a: "4f electrons",
      option_b: "5f electrons",
      option_c: "5d electrons",
      option_d: "6p electrons",
      correct_option: "B",
      explanation: "1. Actinoid contraction is greater from element to element than lanthanoid contraction.\n2. This is because 5f orbitals are more diffuse and extend further into space than 4f orbitals.\n3. Consequently, 5f electrons provide even poorer shielding of the nuclear charge than 4f electrons, leading to a steeper increase in Z_eff along the actinoid series.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2175,
    originalQuestion: {
      question: "Magnetic moment 2.83 BM is given by which of the following ions? (Atomic numbers: Ti = 22, Cr = 24, Mn = 25, Ni = 28) [AIPMT 2014]",
      option_a: "Ti³⁺",
      option_b: "Ni²⁺",
      option_c: "Cr³⁺",
      option_d: "Mn²⁺",
      correct_option: "B",
      explanation: "The spin-only magnetic moment is given by:\nμ = √(n(n + 2)) BM, where n is the number of unpaired electrons.\n\nGiven μ = 2.83 BM:\n√(n(n + 2)) = 2.83 ⇒ n(n + 2) ≈ 8 ⇒ n = 2.\n\nLet us determine the number of unpaired electrons (n) in each ion:\n1. Ti³⁺ (Z = 22): [Ar] 3d¹ ⇒ n = 1, μ = √3 = 1.73 BM.\n2. Ni²⁺ (Z = 28): [Ar] 3d⁸ ⇒ 8 electrons in five d-orbitals gives 3 pairs and 2 unpaired electrons ⇒ n = 2, μ = √8 = 2.83 BM.\n3. Cr³⁺ (Z = 24): [Ar] 3d³ ⇒ n = 3, μ = √15 = 3.87 BM.\n4. Mn²⁺ (Z = 25): [Ar] 3d⁵ ⇒ n = 5, μ = √35 = 5.92 BM.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A transition metal complex has a spin-only magnetic moment of 4.90 BM. The number of unpaired electrons present in the central metal ion is:",
      option_a: "2",
      option_b: "4",
      option_c: "3",
      option_d: "5",
      correct_option: "B",
      explanation: "1. Spin-only magnetic moment formula: μ = √(n(n + 2)) BM.\n2. For n = 4: μ = √(4(4 + 2)) = √24 ≈ 4.899 ≈ 4.90 BM.\n3. (For n = 3, μ = √15 ≈ 3.87 BM; for n = 5, μ = √35 ≈ 5.92 BM).\n4. Hence, the metal ion contains 4 unpaired electrons (e.g., Fe²⁺ or Cr²⁺).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2174,
    originalQuestion: {
      question: "The reaction of aqueous KMnO₄ with H₂O₂ in acidic conditions gives: [AIPMT 2014]",
      option_a: "Mn⁴⁺ and O₂",
      option_b: "Mn²⁺ and O₂",
      option_c: "Mn²⁺ and O₃",
      option_d: "Mn⁴⁺ and MnO₂",
      correct_option: "B",
      explanation: "In acidic medium, potassium permanganate (KMnO₄) acts as a powerful oxidising agent, while hydrogen peroxide (H₂O₂) acts as a reducing agent:\n\nReduction half-reaction: 2MnO₄⁻ + 16H⁺ + 10e⁻ → 2Mn²⁺ + 8H₂O\nOxidation half-reaction: 5H₂O₂ → 5O₂ + 10H⁺ + 10e⁻\n\nOverall balanced reaction:\n2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O\n\nThus, permanganate is reduced to colourless Mn²⁺ and hydrogen peroxide is oxidised to oxygen gas (O₂).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When acidified potassium permanganate is treated with oxalic acid (H₂C₂O₄) at 60 °C, the products obtained are:",
      option_a: "Mn²⁺ and CO₂",
      option_b: "MnO₂ and CO",
      option_c: "Mn⁴⁺ and CO₂",
      option_d: "Mn²⁺ and HCOOH",
      correct_option: "A",
      explanation: "1. Acidified KMnO₄ oxidises oxalic acid into carbon dioxide:\n2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O.\n2. The oxidation state of Mn changes from +7 to +2, and carbon changes from +3 to +4.\n3. The reaction is autocatalyzed by the Mn²⁺ ions formed.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2173,
    originalQuestion: {
      question: "Because of lanthanoid contraction, which of the following pairs of elements have nearly the same atomic radii? (Numbers in parentheses are atomic numbers.) [AIPMT 2015 Cancelled]",
      option_a: "Zr (40) and Hf (72)",
      option_b: "Zr (40) and Ta (73)",
      option_c: "Ti (22) and Zr (40)",
      option_d: "Zr (40) and Nb (41)",
      correct_option: "A",
      explanation: "1. Zirconium (Zr, 4d series, atomic radius = 160 pm) belongs to Group 4.\n2. Hafnium (Hf, 5d series, atomic radius = 159 pm) lies directly below Zr in Group 4.\n3. Normally, moving down a group results in an increase in atomic radius due to the addition of an extra electronic shell.\n4. However, between Zr and Hf lie the fourteen 4f elements (lanthanoids). The filling of 4f orbitals results in lanthanoid contraction, which cancels out the expected size increase.\n5. As a result, Zr and Hf possess virtually identical atomic and ionic radii and remarkably similar chemical properties.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following pairs of transition elements exhibit almost identical chemical and physical properties due to lanthanoid contraction?",
      option_a: "V and Nb",
      option_b: "Nb and Ta",
      option_c: "Cr and Mo",
      option_d: "Fe and Ru",
      correct_option: "B",
      explanation: "1. Niobium (Nb, 4d series, Group 5) and Tantalum (Ta, 5d series, Group 5) have almost identical atomic radii (146 pm) and ionic radii (M⁵⁺ = 64 pm).\n2. This similarity is an immediate consequence of the intervening lanthanoid contraction in the 5d series.\n3. They occur together in nature and their chemical separation is exceptionally difficult.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2172,
    originalQuestion: {
      question: "Which of the following processes does not involve oxidation of iron? [AIPMT 2015 Cancelled]",
      option_a: "Formation of Fe(CO)₅ from Fe.",
      option_b: "Liberation of H₂ from steam by iron at high temperature.",
      option_c: "Rusting of iron sheets.",
      option_d: "Decolourisation of blue CuSO₄ solution by iron.",
      correct_option: "A",
      explanation: "Let us check the oxidation state of Fe in each reaction:\n1. Option A: Fe + 5CO → Fe(CO)₅. Carbon monoxide is a neutral ligand, so the oxidation state of Fe in Fe(CO)₅ is 0. Iron remains in the zero oxidation state (no oxidation occurs).\n2. Option B: 3Fe + 4H₂O(steam) → Fe₃O₄ + 4H₂. Fe changes from 0 to +8/3 (oxidation).\n3. Option C: Rusting: 4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O. Fe changes from 0 to +3 (oxidation).\n4. Option D: Fe + CuSO₄ → FeSO₄ + Cu. Fe changes from 0 to +2 (oxidation).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the oxidation state of nickel in the tetracarbonyl complex Ni(CO)₄?",
      option_a: "+2",
      option_b: "0",
      option_c: "+4",
      option_d: "-2",
      correct_option: "B",
      explanation: "1. In metal carbonyls, the carbonyl ligand (CO) is neutral and carries zero formal charge.\n2. Let the oxidation state of Ni be x: x + 4(0) = 0 ⇒ x = 0.\n3. Therefore, nickel is in the zero oxidation state in Ni(CO)₄, meaning formation of Ni(CO)₄ from elemental Ni involves no change in oxidation state.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2171,
    originalQuestion: {
      question: "Magnetic moment 2.84 BM is given by (atomic numbers: Ni = 28, Ti = 22, Cr = 24, Co = 27): [AIPMT 2015 Cancelled]",
      option_a: "Cr²⁺",
      option_b: "Co²⁺",
      option_c: "Ni²⁺",
      option_d: "Ti³⁺",
      correct_option: "C",
      explanation: "The spin-only magnetic moment formula is:\nμ = √(n(n + 2)) BM\n\nFor μ = 2.84 BM:\n√(n(n + 2)) = 2.84 ⇒ n(n + 2) ≈ 8 ⇒ n = 2 unpaired electrons.\n\nConfigurations:\n1. Ni²⁺ (Z = 28): [Ar] 3d⁸ (two unpaired electrons in eg orbitals) ⇒ n = 2, μ = √8 ≈ 2.83–2.84 BM.\n2. Cr²⁺ (Z = 24): [Ar] 3d⁴ ⇒ n = 4, μ = √24 ≈ 4.90 BM.\n3. Co²⁺ (Z = 27): [Ar] 3d⁷ ⇒ n = 3, μ = √15 ≈ 3.87 BM.\n4. Ti³⁺ (Z = 22): [Ar] 3d¹ ⇒ n = 1, μ = √3 ≈ 1.73 BM.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following divalent ions has a spin-only magnetic moment of 3.87 BM?",
      option_a: "Ni²⁺",
      option_b: "Co²⁺",
      option_c: "Mn²⁺",
      option_d: "Fe²⁺",
      correct_option: "B",
      explanation: "1. For μ = 3.87 BM: √(n(n + 2)) = 3.87 ⇒ n(n + 2) = 15 ⇒ n = 3 unpaired electrons.\n2. Co²⁺ (Z = 27) has electronic configuration [Ar] 3d⁷.\n3. In a d⁷ configuration, 3 unpaired electrons remain (t₂g⁵ eg² in high spin).\n4. Hence, its spin-only magnetic moment is √15 = 3.87 BM.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2170,
    originalQuestion: {
      question: "Assuming complete ionisation, the same moles of which of the following compounds will require the least amount of acidified KMnO₄ for complete oxidation? [AIPMT 2015]",
      option_a: "FeSO₃",
      option_b: "FeC₂O₄",
      option_c: "Fe(NO₂)₂",
      option_d: "FeSO₄",
      correct_option: "D",
      explanation: "Let us calculate the total moles of electrons lost per mole of each substance upon complete oxidation by KMnO₄:\n\n1. In FeSO₄: Fe²⁺ oxidises to Fe³⁺ (loses 1 e⁻), while SO₄²⁻ is already in its highest oxidation state (+6) and cannot be oxidised further. Total electrons lost = 1.\n2. In FeSO₃: Fe²⁺ → Fe³⁺ (1 e⁻) and SO₃²⁻ (S = +4) → SO₄²⁻ (S = +6) (2 e⁻). Total electrons lost = 1 + 2 = 3.\n3. In FeC₂O₄: Fe²⁺ → Fe³⁺ (1 e⁻) and C₂O₄²⁻ → 2CO₂ (2 e⁻). Total electrons lost = 1 + 2 = 3.\n4. In Fe(NO₂)₂: Fe²⁺ → Fe³⁺ (1 e⁻) and 2NO₂⁻ (N = +3) → 2NO₃⁻ (N = +5) (4 e⁻). Total electrons lost = 1 + 4 = 5.\n\nSince FeSO₄ loses only 1 mole of electrons per mole of substance, it requires the minimum amount of acidified KMnO₄ (which consumes 5 e⁻ per MnO₄⁻).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "How many moles of acidified KMnO₄ are required to completely oxidise 1 mole of ferrous oxalate (FeC₂O₄)?",
      option_a: "0.2 mole",
      option_b: "0.6 mole",
      option_c: "1.0 mole",
      option_d: "1.5 moles",
      correct_option: "B",
      explanation: "1. Oxidation of FeC₂O₄:\nFe²⁺ → Fe³⁺ + e⁻ (1 e⁻ lost)\nC₂O₄²⁻ → 2CO₂ + 2e⁻ (2 e⁻ lost)\nTotal electrons lost per mole of FeC₂O₄ = 1 + 2 = 3 electrons (n-factor = 3).\n2. Reduction of KMnO₄ in acidic medium:\nMnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (n-factor = 5).\n3. By law of equivalence:\nMoles of KMnO₄ × 5 = Moles of FeC₂O₄ × 3\nMoles of KMnO₄ = 3/5 = 0.6 mole.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2169,
    originalQuestion: {
      question: "Gadolinium belongs to the 4f series. Its atomic number is 64. Which of the following is the correct electronic configuration of gadolinium? [AIPMT 2015]",
      option_a: "[Xe] 4f⁹ 5s¹",
      option_b: "[Xe] 4f⁷ 5d¹ 6s²",
      option_c: "[Xe] 4f⁶ 5d² 6s²",
      option_d: "[Xe] 4f⁸ 6d²",
      correct_option: "B",
      explanation: "1. Gadolinium (Gd, Z = 64) has a noble gas core of Xenon ([Xe], Z = 54), leaving 10 valence electrons.\n2. In the 4f subshell, there are 7 orbitals. A half-filled 4f subshell (4f⁷) confers extra thermodynamic stability due to symmetrical distribution and large exchange energy.\n3. Therefore, rather than adopting a 4f⁸ 6s² configuration, one electron enters the 5d orbital to preserve the stable half-filled 4f⁷ subshell.\n4. Hence, the ground state electronic configuration of Gd is [Xe] 4f⁷ 5d¹ 6s².\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the ground state electronic configuration of the trivalent ion of Gadolinium (Gd³⁺, Z = 64)?",
      option_a: "[Xe] 4f⁷",
      option_b: "[Xe] 4f⁵ 5d²",
      option_c: "[Xe] 4f⁶ 5d¹",
      option_d: "[Xe] 4f⁸",
      correct_option: "A",
      explanation: "1. The neutral Gadolinium atom has configuration [Xe] 4f⁷ 5d¹ 6s².\n2. To form Gd³⁺, three electrons are removed: two from 6s and one from 5d.\n3. The resulting configuration of Gd³⁺ is [Xe] 4f⁷.\n4. This half-filled 4f⁷ subshell gives Gd³⁺ high thermodynamic stability and a large spin magnetic moment (7 unpaired electrons, μ ≈ 7.94 BM).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2168,
    originalQuestion: {
      question: "The electronic configurations of Eu (atomic number 63), Gd (atomic number 64) and Tb (atomic number 65) are: [NEET 2016 Phase 1]",
      option_a: "[Xe] 4f⁶ 5d¹ 6s², [Xe] 4f⁷ 5d¹ 6s² and [Xe] 4f⁸ 5d¹ 6s²",
      option_b: "[Xe] 4f⁷ 6s², [Xe] 4f⁷ 5d¹ 6s² and [Xe] 4f⁹ 6s²",
      option_c: "[Xe] 4f⁷ 6s², [Xe] 4f⁸ 6s² and [Xe] 4f⁸ 5d¹ 6s²",
      option_d: "[Xe] 4f⁶ 5d¹ 6s², [Xe] 4f⁷ 5d¹ 6s² and [Xe] 4f⁹ 6s²",
      correct_option: "B",
      explanation: "Let us examine each element's ground-state electron configuration:\n1. Europium (Eu, Z = 63): [Xe] 4f⁷ 6s² (the 4f subshell is exactly half-filled, offering maximum stability without placing an electron in 5d).\n2. Gadolinium (Gd, Z = 64): [Xe] 4f⁷ 5d¹ 6s² (maintains the half-filled 4f⁷ subshell by placing the next electron in the 5d orbital).\n3. Terbium (Tb, Z = 65): [Xe] 4f⁹ 6s² (the 5d electron shifts back to 4f, giving 4f⁹ 6s²).\n\nTherefore, the sequence is [Xe] 4f⁷ 6s², [Xe] 4f⁷ 5d¹ 6s² and [Xe] 4f⁹ 6s².\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following lanthanoid elements possesses an electronic configuration with an electron in the 5d subshell in its neutral ground state?",
      option_a: "Europium (Eu, Z = 63)",
      option_b: "Gadolinium (Gd, Z = 64)",
      option_c: "Samarium (Sm, Z = 62)",
      option_d: "Neodymium (Nd, Z = 60)",
      correct_option: "B",
      explanation: "1. Among the lanthanoids, only La (57), Ce (58), Gd (64), and Lu (71) have one electron in the 5d orbital in their neutral ground states:\n- La: [Xe] 5d¹ 6s²\n- Ce: [Xe] 4f¹ 5d¹ 6s²\n- Gd: [Xe] 4f⁷ 5d¹ 6s² (due to half-filled 4f stability)\n- Lu: [Xe] 4f¹⁴ 5d¹ 6s² (due to fully filled 4f stability)\n2. Europium, Samarium, and Neodymium have 5d⁰.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2167,
    originalQuestion: {
      question: "Which one of the following statements is correct when SO₂ is passed through acidified K₂Cr₂O₇ solution? [NEET 2016 Phase 1]",
      option_a: "SO₂ is reduced.",
      option_b: "Green Cr₂(SO₄)₃ is formed.",
      option_c: "The solution turns blue.",
      option_d: "The solution is decolourised.",
      correct_option: "B",
      explanation: "When sulphur dioxide (SO₂) gas is passed through an acidified solution of potassium dichromate (K₂Cr₂O₇):\n\nK₂Cr₂O₇ + H₂SO₄ + 3SO₂ → K₂SO₄ + Cr₂(SO₄)₃ + H₂O\n\n1. Dichromate (Cr₂O₇²⁻, where Cr has oxidation state +6 and is orange) acts as an oxidising agent and is reduced to chromium(III) sulphate, Cr₂(SO₄)₃, where Cr is +3.\n2. The hydrated Cr³⁺ ion imparts an intense green colour to the solution.\n3. SO₂ acts as a reducing agent and is oxidised to sulphate (SO₄²⁻).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What chemical change causes the orange colour of acidified potassium dichromate paper to turn green when exposed to SO₂ gas?",
      option_a: "Oxidation of Cr(VI) to Cr(VII)",
      option_b: "Reduction of Cr(VI) to green Cr(III)",
      option_c: "Precipitation of yellow lead chromate",
      option_d: "Formation of blue perchromic acid CrO₅",
      correct_option: "B",
      explanation: "1. Dichromate ion Cr₂O₇²⁻ contains Cr in the +6 oxidation state, giving an orange colour.\n2. SO₂ is a reducing agent that reduces Cr(VI) to Cr³⁺:\nCr₂O₇²⁻ + 3SO₂ + 2H⁺ → 2Cr³⁺ + 3SO₄²⁻ + H₂O.\n3. The formation of Cr³⁺ ions gives the characteristic green colour, which serves as a confirmatory test for SO₂ gas.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2166,
    originalQuestion: {
      question: "Which one of the following statements related to lanthanoids is incorrect? [NEET 2016 Phase 2]",
      option_a: "Europium shows +2 oxidation state.",
      option_b: "The basicity decreases as the ionic radius decreases from Pr to Lu.",
      option_c: "All the lanthanoids are much more reactive than aluminium.",
      option_d: "Ce(+4) solutions are widely used as oxidising agents in volumetric analysis.",
      correct_option: "C",
      explanation: "Let us analyze the statements regarding lanthanoids:\n1. Option A: Europium exhibits a stable +2 oxidation state due to its stable half-filled [Xe] 4f⁷ configuration. This is correct.\n2. Option B: As ionic radius decreases from Pr³⁺ to Lu³⁺ (lanthanoid contraction), the covalent character of the Ln-OH bond increases, making the hydroxides Ln(OH)₃ less basic. Hence, basicity decreases from La(OH)₃ to Lu(OH)₃. This is correct.\n3. Option C: Many lanthanoids react with acids to liberate H₂; their reactivity is comparable to calcium for the early members and with increasing atomic number they behave similar to aluminium, rather than all being much more reactive than aluminium. Hence, statement C is incorrect.\n4. Option D: Cerium(IV) is a powerful oxidising agent because Ce⁴⁺ readily reduces to the stable Ce³⁺ state (E° = +1.74 V); aqueous Ce⁴⁺ is widely used as an analytical oxidimetric reagent. This is correct.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Why does the basic nature of lanthanoid hydroxides Ln(OH)₃ decrease from La(OH)₃ to Lu(OH)₃?",
      option_a: "Increase in ionic radius and decrease in lattice energy",
      option_b: "Decrease in ionic radius leading to increased covalent character of Ln-OH bond",
      option_c: "Decrease in electronegativity across the series",
      option_d: "Transition from paramagnetism to diamagnetism",
      correct_option: "B",
      explanation: "1. Due to lanthanoid contraction, the ionic size of Ln³⁺ decreases steadily from La³⁺ (103 pm) to Lu³⁺ (86 pm).\n2. According to Fajan's rules, a smaller cation polarizes the hydroxide anion more strongly, increasing the covalent character of the Ln-OH bond.\n3. As covalent character increases, the release of OH⁻ ions in solution becomes more difficult, causing basicity to decrease from La(OH)₃ (most basic) to Lu(OH)₃ (least basic).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2165,
    originalQuestion: {
      question: "The reason for the greater range of oxidation states in actinoids is attributed to: [NEET 2017]",
      option_a: "Actinoid contraction",
      option_b: "5f, 6d and 7s levels having comparable energies",
      option_c: "4f and 5d levels being close in energy",
      option_d: "The radioactive nature of actinoids",
      correct_option: "B",
      explanation: "1. In actinoids, the energy gap between the 5f, 6d, and 7s subshells is very small (they have comparable energies).\n2. Because of this small energy difference, electrons from 5f, 6d, and 7s orbitals can all participate in chemical bonding and compound formation.\n3. Consequently, actinoids exhibit a wider variety of oxidation states (from +2 up to +7) compared to lanthanoids, where 4f electrons are held more deeply and have much lower energies than 5d and 6s orbitals.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why do lanthanoids exhibit a predominant +3 oxidation state whereas actinoids show a much larger variety of oxidation states (+3 to +7)?",
      option_a: "4f electrons are shielded more effectively than 5f electrons",
      option_b: "The energy difference between 5f, 6d and 7s orbitals is much smaller than that between 4f and 5d orbitals",
      option_c: "Actinoids have higher ionization enthalpies than lanthanoids",
      option_d: "Lanthanoids have smaller ionic radii than actinoids",
      correct_option: "B",
      explanation: "1. In lanthanoids, the 4f subshell is deeply buried and well-shielded, making removal of 4f electrons beyond +3 energetically unfavourable.\n2. In actinoids, 5f orbitals extend further into space and their energy is very close to 6d and 7s orbitals.\n3. This allows seamless involvement of 5f, 6d, and 7s electrons in bonding, yielding a wide range of oxidation states up to +7 (in Np and Pu).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2164,
    originalQuestion: {
      question: "HgCl₂ and I₂, both when dissolved in water containing I⁻ ions, form which pair of species? [NEET 2017]",
      option_a: "HgI₂, I⁻",
      option_b: "HgI₄²⁻, I₃⁻",
      option_c: "Hg₂I₂, I⁻",
      option_d: "HgI₂, I₃⁻",
      correct_option: "B",
      explanation: "Let us examine the reactions of HgCl₂ and I₂ in the presence of excess iodide (I⁻) ions:\n\n1. Reaction of mercuric chloride (HgCl₂) with iodide:\nHgCl₂ + 2I⁻ → HgI₂ (scarlet red ppt) + 2Cl⁻\nHgI₂ + 2I⁻ → [HgI₄]²⁻ (soluble tetraiodomercurate(II) complex ion, the anion of Nessler's reagent).\n\n2. Reaction of iodine (I₂) with iodide:\nI₂ is sparingly soluble in pure water, but readily dissolves in aqueous iodide solution due to complexation:\nI₂ + I⁻ → I₃⁻ (triiodide ion).\n\nThus, the species formed in solution are [HgI₄]²⁻ and I₃⁻.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Nessler's reagent used for the detection of ammonia contains which complex anion?",
      option_a: "[HgI₂]⁻",
      option_b: "[HgI₄]²⁻",
      option_c: "[HgCl₄]²⁻",
      option_d: "[Hg(NH₃)₄]²⁺",
      correct_option: "B",
      explanation: "1. Nessler's reagent is an alkaline solution of potassium tetraiodomercurate(II), K₂[HgI₄].\n2. It is prepared by adding KI solution to HgCl₂ until the red precipitate of HgI₂ redissolves:\nHgCl₂ + 4KI → K₂[HgI₄] + 2KCl.\n3. The active complex ion present is [HgI₄]²⁻.\n4. When reacted with ammonia, it gives a brown precipitate of iodide of Millon's base (H₂N-Hg-O-Hg-I).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2163,
    originalQuestion: {
      question: "Name the gas that can readily decolourise acidified KMnO₄ solution. [NEET 2017]",
      option_a: "SO₂",
      option_b: "NO₂",
      option_c: "P₂O₅",
      option_d: "CO₂",
      correct_option: "A",
      explanation: "1. Sulphur dioxide (SO₂) is a strong reducing agent in aqueous medium.\n2. When SO₂ is bubbled through acidified potassium permanganate (KMnO₄, purple), the permanganate ion (MnO₄⁻) is reduced to colourless manganese(II) ion (Mn²⁺):\n2MnO₄⁻ + 5SO₂ + 2H₂O → 2Mn²⁺ + 5SO₄²⁻ + 4H⁺\n3. Consequently, the purple colour of the solution disappears rapidly (decolourised).\n4. Carbon dioxide (CO₂) and P₂O₅ are in their highest oxidation states and cannot act as reducing agents; NO₂ does not readily decolourise acidified KMnO₄.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following gases turns an acidified solution of potassium dichromate green?",
      option_a: "CO₂",
      option_b: "SO₂",
      option_c: "CH₄",
      option_d: "O₂",
      correct_option: "B",
      explanation: "1. SO₂ gas reduces orange dichromate (Cr₂O₇²⁻, Cr = +6) to green chromium(III) (Cr³⁺):\nK₂Cr₂O₇ + 3SO₂ + H₂SO₄ → K₂SO₄ + Cr₂(SO₄)₃ + H₂O.\n2. The formation of Cr₂(SO₄)₃ turns the solution green, which is a characteristic test distinguishing SO₂ from CO₂.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2162,
    originalQuestion: {
      question: "Match the metal ions given in Column I with the spin magnetic moments of the ions given in Column II and assign the correct code. Column I A. Co³⁺ B. Cr³⁺ C. Fe³⁺ D. Ni²⁺ Column II (i) √8 BM (ii) √35 BM (iii) √3 BM (iv) √24 BM (v) √15 BM [NEET 2018]",
      option_a: "A-(iv), B-(v), C-(ii), D-(i)",
      option_b: "A-(i), B-(ii), C-(iii), D-(iv)",
      option_c: "A-(iv), B-(i), C-(ii), D-(iii)",
      option_d: "A-(iii), B-(v), C-(i), D-(ii)",
      correct_option: "A",
      explanation: "The spin-only magnetic moment is μ = √(n(n + 2)) BM, where n is the number of unpaired electrons:\n\n1. A. Co³⁺ (Z = 27): [Ar] 3d⁶. As a free gaseous ion, it has 4 unpaired electrons (n = 4) ⇒ μ = √(4 × 6) = √24 BM. (Matches iv)\n2. B. Cr³⁺ (Z = 24): [Ar] 3d³. It has 3 unpaired electrons (n = 3) ⇒ μ = √(3 × 5) = √15 BM. (Matches v)\n3. C. Fe³⁺ (Z = 26): [Ar] 3d⁵. It has 5 unpaired electrons (n = 5) ⇒ μ = √(5 × 7) = √35 BM. (Matches ii)\n4. D. Ni²⁺ (Z = 28): [Ar] 3d⁸. It has 2 unpaired electrons (n = 2) ⇒ μ = √(2 × 4) = √8 BM. (Matches i)\n\nThus, the correct matching code is A-(iv), B-(v), C-(ii), D-(i).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Match the following transition metal ions with their corresponding spin-only magnetic moment values: 1. Mn²⁺ 2. V³⁺ 3. Cu²⁺ with (a) √3 BM, (b) √8 BM, (c) √35 BM.",
      option_a: "1-(c), 2-(b), 3-(a)",
      option_b: "1-(a), 2-(c), 3-(b)",
      option_c: "1-(b), 2-(a), 3-(c)",
      option_d: "1-(c), 2-(a), 3-(b)",
      correct_option: "A",
      explanation: "1. Mn²⁺ (3d⁵): n = 5 ⇒ μ = √(5×7) = √35 BM ⇒ 1-(c).\n2. V³⁺ (3d²): n = 2 ⇒ μ = √(2×4) = √8 BM ⇒ 2-(b).\n3. Cu²⁺ (3d⁹): n = 1 ⇒ μ = √(1×3) = √3 BM ⇒ 3-(a).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2161,
    originalQuestion: {
      question: "Which one of the following ions exhibits d-d transition and paramagnetism as well? [NEET 2018]",
      option_a: "CrO₄²⁻",
      option_b: "Cr₂O₇²⁻",
      option_c: "MnO₄⁻",
      option_d: "MnO₄²⁻",
      correct_option: "D",
      explanation: "Let us examine the oxidation state, d-electron count, and origin of colour for each ion:\n\n1. CrO₄²⁻ (chromate): Cr is in +6 oxidation state ([Ar] 3d⁰). With no d-electrons, d-d transitions cannot occur; it is diamagnetic (colour is due to Ligand to Metal Charge Transfer, LMCT).\n2. Cr₂O₇²⁻ (dichromate): Cr is in +6 oxidation state ([Ar] 3d⁰); diamagnetic, colour is due to LMCT.\n3. MnO₄⁻ (permanganate): Mn is in +7 oxidation state ([Ar] 3d⁰); diamagnetic, intense purple colour is due to LMCT.\n4. MnO₄²⁻ (manganate): Mn is in +6 oxidation state ([Ar] 3d¹). Because it possesses one unpaired d-electron, it is paramagnetic (μ = √3 ≈ 1.73 BM) and can undergo a d-d transition.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the deep purple colour of the permanganate ion (MnO₄⁻) not attributable to d-d electronic transitions?",
      option_a: "Permanganate is a low-spin octahedral complex",
      option_b: "Manganese is in the +7 oxidation state with an empty 3d⁰ subshell",
      option_c: "Permanganate ion is completely colourless in aqueous solution",
      option_d: "The d-d transitions are spin forbidden due to high unpaired electron count",
      correct_option: "B",
      explanation: "1. In MnO₄⁻, the manganese atom has lost all its 3d and 4s valence electrons, leaving it in the +7 oxidation state with a 3d⁰ configuration.\n2. Because there are no d-electrons, d-d transitions are physically impossible.\n3. The intense purple colour arises entirely from charge transfer from oxygen (2p ligand orbitals) to the empty d-orbitals of manganese(VII) (LMCT).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2160,
    originalQuestion: {
      question: "Identify the incorrect statement. [NEET 2020 Phase 1]",
      option_a: "The transition metals and their compounds are known for their catalytic activity due to their ability to adopt multiple oxidation states and to form complexes.",
      option_b: "Interstitial compounds are those that are formed when small atoms like H, C or N are trapped inside the crystal lattices of metals.",
      option_c: "The oxidation states of chromium in CrO₄²⁻ and Cr₂O₇²⁻ are not the same.",
      option_d: "Cr²⁺ (d⁴) is a stronger reducing agent than Fe²⁺ (d⁶) in water.",
      correct_option: "C",
      explanation: "Let us inspect each statement:\n1. Option A: True. Variable oxidation states and the availability of d-orbitals to form complexes are well-known reasons for the catalytic activity of transition metals.\n2. Option B: True. Small non-metallic atoms like H, C, and N occupy interstitial voids in the metal crystal lattice, forming interstitial compounds.\n3. Option C: In chromate ion (CrO₄²⁻): x + 4(-2) = -2 ⇒ x = +6. In dichromate ion (Cr₂O₇²⁻): 2x + 7(-2) = -2 ⇒ 2x = 12 ⇒ x = +6. In both ions, chromium exists in the same (+6) oxidation state. Hence, the statement that they are not the same is incorrect.\n4. Option D: True. E°(Cr³⁺/Cr²⁺) = -0.41 V while E°(Fe³⁺/Fe²⁺) = +0.77 V. Cr²⁺ is readily oxidised to Cr³⁺ (stable t₂g³ half-filled configuration), making Cr²⁺ a stronger reducing agent than Fe²⁺.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the oxidation state of chromium in potassium chromate (K₂CrO₄) and potassium dichromate (K₂Cr₂O₇) respectively?",
      option_a: "+3 and +6",
      option_b: "+6 and +6",
      option_c: "+6 and +3",
      option_d: "+4 and +6",
      correct_option: "B",
      explanation: "1. For K₂CrO₄: 2(+1) + Cr + 4(-2) = 0 ⇒ Cr = +6.\n2. For K₂Cr₂O₇: 2(+1) + 2Cr + 7(-2) = 0 ⇒ 2Cr = 12 ⇒ Cr = +6.\n3. In both compounds, chromium is in its maximum group oxidation state of +6.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2159,
    originalQuestion: {
      question: "Zr (Z = 40) and Hf (Z = 72) have similar atomic and ionic radii because of: [NEET 2021]",
      option_a: "Having similar chemical properties",
      option_b: "Belonging to the same group",
      option_c: "Diagonal relationship",
      option_d: "Lanthanoid contraction",
      correct_option: "D",
      explanation: "1. Zirconium (Zr) belongs to the 4d series (Group 4) and Hafnium (Hf) belongs to the 5d series (Group 4).\n2. Between the 4d and 5d elements of Group 4 lie the 14 lanthanoid elements (58Ce to 71Lu), in which the 4f subshell is progressively filled.\n3. The poor shielding effect of 4f electrons causes an unexpected steady decrease in atomic size known as lanthanoid contraction.\n4. This contraction compensates for the expected increase in size due to the addition of an extra electronic shell in moving from 4d to 5d.\n5. Consequently, Zr (atomic radius ~160 pm) and Hf (atomic radius ~159 pm) have virtually identical atomic and ionic radii.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following pairs of elements have almost identical covalent radii due to the intervention of the 4f subshell?",
      option_a: "Sc and Y",
      option_b: "Mo and W",
      option_c: "Ti and Zr",
      option_d: "Cr and Mn",
      correct_option: "B",
      explanation: "1. Molybdenum (Mo, 4d series, Group 6) has a covalent radius of 145 pm.\n2. Tungsten (W, 5d series, Group 6) has a covalent radius of 146 pm.\n3. Because of the lanthanoid contraction between La and Hf, the radii of 4d and 5d members of Group 6 (Mo and W) are almost identical.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2158,
    originalQuestion: {
      question: "Which of the following reactions is the metal displacement reaction? Choose the right option. [NEET 2021]",
      option_a: "2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂",
      option_b: "2KClO₃ → 2KCl + 3O₂",
      option_c: "Cr₂O₃ + 2Al → Al₂O₃ + 2Cr",
      option_d: "Fe + 2HCl → FeCl₂ + H₂",
      correct_option: "C",
      explanation: "A metal displacement reaction is a redox reaction where one metal in elemental state displaces another metal from its compound (solution or molten oxide):\n\n1. Option A: Thermal decomposition of lead nitrate; not a displacement reaction.\n2. Option B: Thermal decomposition of potassium chlorate; not a displacement reaction.\n3. Option C: Cr₂O₃ + 2Al → Al₂O₃ + 2Cr. Aluminium (a more electropositive metal) displaces chromium (a less electropositive metal) from its oxide. This is a classic metal displacement reaction (aluminothermic process).\n4. Option D: Fe + 2HCl → FeCl₂ + H₂. Iron displaces hydrogen (a non-metal) from acid; this is a hydrogen displacement (non-metal displacement) reaction.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following represents a metal displacement redox reaction?",
      option_a: "CuSO₄ + Zn → ZnSO₄ + Cu",
      option_b: "2Na + 2H₂O → 2NaOH + H₂",
      option_c: "CaCO₃ → CaO + CO₂",
      option_d: "2Mg + O₂ → 2MgO",
      correct_option: "A",
      explanation: "1. In CuSO₄ + Zn → ZnSO₄ + Cu, metallic zinc (Zn) displaces copper (Cu) from its aqueous sulphate salt solution.\n2. Zn is oxidised (0 to +2) and Cu²⁺ is reduced (+2 to 0).\n3. Since one metal displaces another metal, it is classified as a metal displacement reaction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2157,
    originalQuestion: {
      question: "The incorrect statement among the following is: [NEET 2021]",
      option_a: "Actinoids are highly reactive metals, especially when finely divided.",
      option_b: "Actinoid contraction is greater for element to element than lanthanoid contraction.",
      option_c: "Most of the trivalent lanthanoid ions are colorless in the solid state.",
      option_d: "Lanthanoids are good conductors of heat and electricity.",
      correct_option: "C",
      explanation: "Let us assess each statement:\n1. Option A: True. Actinoids are highly electropositive and reactive metals, especially when finely divided, reacting readily with boiling water, oxygen, and halogens.\n2. Option B: True. Actinoid contraction is greater from element to element than lanthanoid contraction because 5f electrons have a poorer shielding effect than 4f electrons.\n3. Option C: False. Most trivalent lanthanoid (Ln³⁺) ions are coloured in both solid state and aqueous solutions due to f-f electronic transitions (e.g., Pr³⁺ is green, Nd³⁺ is pink, Sm³⁺ is yellow). Only ions with 4f⁰ (La³⁺), 4f⁷ (Gd³⁺), and 4f¹⁴ (Lu³⁺) are colourless.\n4. Option D: True. Lanthanoids are typical metals; they are silvery-white and good conductors of heat and electricity.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following pairs of trivalent lanthanoid ions are completely colourless in aqueous solution?",
      option_a: "Pr³⁺ and Nd³⁺",
      option_b: "La³⁺ and Lu³⁺",
      option_c: "Sm³⁺ and Eu³⁺",
      option_d: "Tb³⁺ and Dy³⁺",
      correct_option: "B",
      explanation: "1. The colour of lanthanoid ions arises from f-f electronic absorption transitions within the 4f subshell.\n2. La³⁺ has an empty 4f subshell ([Xe] 4f⁰) and Lu³⁺ has a completely filled 4f subshell ([Xe] 4f¹⁴).\n3. Because no f-f transitions can take place in either 4f⁰ or 4f¹⁴ configurations, both La³⁺ and Lu³⁺ are colourless.\n\nTherefore, Option (B) is the correct answer."
    }
  }
];

