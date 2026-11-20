// Chapter 54: Chemical Bonding - Part 2 (Q39 to Q77, IDs 413 to 375)
module.exports = [
  {
    id: 413,
    question: "Which two ions from the given list have their geometry explained by the same hybridisation of orbitals: NO₂⁻, NO₃⁻, NH₂⁻, NH₄⁺, SCN⁻? [AIPMT 2011 Prelims]",
    option_a: "NO₂⁻ and NO₃⁻",
    option_b: "NH₄⁺ and NO₃⁻",
    option_c: "SCN⁻ and NH₂⁻",
    option_d: "NO₂⁻ and NH₂⁻",
    correct_option: "A",
    explanation: "Let us determine the hybridization of the central atom in each species:\n1. NO₂⁻: Nitrogen has 5 valence electrons + 1 (charge) = 6 electrons. It forms 2 sigma bonds with oxygen and retains 1 lone pair. Steric number = 2 + 1 = 3 => sp² hybridization.\n2. NO₃⁻: Nitrogen forms 3 sigma bonds with oxygen atoms and has 0 lone pairs. Steric number = 3 + 0 = 3 => sp² hybridization.\n3. NH₂⁻: Nitrogen has 2 sigma bonds and 2 lone pairs. Steric number = 2 + 2 = 4 => sp³ hybridization.\n4. NH₄⁺: Nitrogen has 4 sigma bonds and 0 lone pairs. Steric number = 4 + 0 = 4 => sp³ hybridization.\n5. SCN⁻: Central carbon forms 2 sigma bonds and has 0 lone pairs. Steric number = 2 => sp hybridization.\nThus, NO₂⁻ and NO₃⁻ both have an sp² hybridized central nitrogen atom.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs of species have central atoms with the same sp² hybridization?",
      option_a: "SO₂ and SO₃",
      option_b: "NH₃ and BF₃",
      option_c: "CH₄ and C₂H₄",
      option_d: "H₂O and BeCl₂",
      correct_option: "A",
      explanation: "Both SO₂ (2 sigma bonds + 1 lone pair) and SO₃ (3 sigma bonds + 0 lone pairs) have steric number 3 and sp² hybridization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 412,
    question: "Which of the following oxygen species has the minimum bond length? [AIPMT 2011 Prelims]",
    option_a: "O₂⁺",
    option_b: "O₂⁻",
    option_c: "O₂²⁻",
    option_d: "O₂",
    correct_option: "A",
    explanation: "Bond length is inversely proportional to bond order (Bond length ∝ 1 / Bond order).\nLet us calculate the bond order for each oxygen species using Molecular Orbital Theory:\n1. O₂⁺ (15 electrons): Configuration has N_b = 10, N_a = 5.\nBond order = (10 - 5) / 2 = 2.5\n2. O₂ (16 electrons): N_b = 10, N_a = 6.\nBond order = (10 - 6) / 2 = 2.0\n3. O₂⁻ (17 electrons): N_b = 10, N_a = 7.\nBond order = (10 - 7) / 2 = 1.5\n4. O₂²⁻ (18 electrons): N_b = 10, N_a = 8.\nBond order = (10 - 8) / 2 = 1.0\nSince O₂⁺ has the highest bond order (2.5), its atoms are held together by the strongest attractive forces, giving it the minimum bond length (~112 pm).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following nitrogen species has the shortest bond length?",
      option_a: "N₂",
      option_b: "N₂⁺",
      option_c: "N₂⁻",
      option_d: "N₂²⁻",
      correct_option: "A",
      explanation: "N₂ has the maximum bond order of 3.0, which corresponds to the shortest bond length among all nitrogen species. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 411,
    question: "Pairs of oxygen species and their magnetic behaviours are given below. Which of the following is correct? [AIPMT 2011 Mains]",
    option_a: "O₂⁻, O₂²⁻ - both are diamagnetic",
    option_b: "O₂⁺, O₂ - both are paramagnetic",
    option_c: "O₂, O₂²⁻ - both are paramagnetic",
    option_d: "O₂⁺, O₂²⁻ - both are paramagnetic",
    correct_option: "B",
    explanation: "According to Molecular Orbital Theory:\n1. O₂ (16 electrons) has the valence configuration: σ2p_z² π2p_x² = π2p_y² π*2p_x¹ = π*2p_y¹.\nBecause it possesses two unpaired electrons in degenerate antibonding π* orbitals, O₂ is paramagnetic.\n2. O₂⁺ (15 electrons) is formed by removing one electron from a π* orbital, leaving one unpaired electron: π*2p_x¹ = π*2p_y⁰.\nHaving one unpaired electron, O₂⁺ is paramagnetic.\n3. O₂²⁻ (18 electrons) has all orbitals fully paired up to π*2p_x² = π*2p_y², making it diamagnetic.\nThus, both O₂⁺ and O₂ are paramagnetic.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species has exactly two unpaired electrons in its molecular orbitals?",
      option_a: "O₂",
      option_b: "N₂",
      option_c: "CO",
      option_d: "O₂²⁻",
      correct_option: "A",
      explanation: "Ground state O₂ has two unpaired electrons in degenerate π*2p antibonding orbitals according to Hund's rule. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 410,
    question: "The structure that is most preferred and hence possesses the lowest energy for SO₃ is one in which: [AIPMT 2011 Mains]",
    option_a: "Sulfur forms three double bonds with oxygen atoms with zero formal charges",
    option_b: "Sulfur forms one double bond and two single coordinate bonds",
    option_c: "Sulfur carries a positive charge of +2 and two oxygens carry negative charges",
    option_d: "Sulfur is bonded to three oxygens through single bonds only",
    correct_option: "A",
    explanation: "Sulfur belongs to the third period and has vacant 3d orbitals, allowing it to expand its octet beyond 8 electrons.\nIn SO₃, sulfur has 6 valence electrons and forms 3 double bonds (S=O) with three oxygen atoms, utilizing both pπ-pπ and dπ-pπ bonding.\nIn this structure:\n- Formal charge on sulfur = 6 - 0 - (1/2)(12) = 0\n- Formal charge on each oxygen = 6 - 4 - (1/2)(4) = 0\nSince all atoms achieve a formal charge of zero, this Lewis structure minimizes formal charges and electrostatic instability, making it the most preferred, stable structure with the lowest energy.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In the most stable Lewis resonance structure of the sulfate ion (SO₄²⁻), how many double bonds are formed between sulfur and oxygen?",
      option_a: "Two",
      option_b: "Four",
      option_c: "One",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Sulfur forms two S=O double bonds and two S-O single bonds (carrying -1 charges) to minimize the formal charge on the central sulfur atom to zero. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 409,
    question: "A pair of species with the same bond order is: [AIPMT 2012 Prelims]",
    option_a: "O₂²⁻, B₂",
    option_b: "O₂⁺, NO⁺",
    option_c: "NO, CO",
    option_d: "N₂, O₂",
    correct_option: "A",
    explanation: "Let us calculate the bond orders for each pair:\n1. O₂²⁻ (18 electrons):\n10 bonding electrons and 8 antibonding electrons.\nBond order = (10 - 8) / 2 = 1.0\n2. B₂ (10 electrons):\nConfiguration: σ1s² σ*1s² σ2s² σ*2s² π2p_x¹ = π2p_y¹\n6 bonding electrons and 4 antibonding electrons.\nBond order = (6 - 4) / 2 = 1.0\nBoth O₂²⁻ and B₂ have the same bond order of 1.0.\nLet us verify the others:\n- O₂⁺ (BO = 2.5), NO⁺ (BO = 3.0)\n- NO (BO = 2.5), CO (BO = 3.0)\n- N₂ (BO = 3.0), O₂ (BO = 2.0)\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs has a bond order of 3.0?",
      option_a: "N₂ and CO",
      option_b: "O₂ and N₂",
      option_c: "NO and CO",
      option_d: "B₂ and C₂",
      correct_option: "A",
      explanation: "Both N₂ and CO have 14 electrons and a bond order of 3.0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 408,
    question: "Which of the following species contains three bond pairs and one lone pair around the central atom? [AIPMT 2012 Prelims]",
    option_a: "H₂O",
    option_b: "BF₃",
    option_c: "NH₂⁻",
    option_d: "PCl₃",
    correct_option: "D",
    explanation: "Let us find the number of bond pairs and lone pairs around the central atom for each species:\n1. PCl₃: Phosphorus has 5 valence electrons. It shares 3 electrons with three chlorine atoms to form 3 single covalent bond pairs, leaving 2 non-bonding electrons as 1 lone pair (AX₃E type, steric number 4, sp³ hybridization, trigonal pyramidal shape).\n2. H₂O: Oxygen has 2 bond pairs and 2 lone pairs.\n3. BF₃: Boron has 3 bond pairs and 0 lone pairs.\n4. NH₂⁻: Nitrogen has 2 bond pairs and 2 lone pairs.\nThus, PCl₃ is the only species containing three bond pairs and one lone pair.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules has three bond pairs and one lone pair on its central atom?",
      option_a: "NH₃",
      option_b: "CH₄",
      option_c: "H₂O",
      option_d: "BeCl₂",
      correct_option: "A",
      explanation: "Ammonia (NH₃) has 3 N-H bond pairs and 1 lone pair on nitrogen (sp³ hybridization). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 407,
    question: "A bond order of 1.5 is shown by which of the following species? [AIPMT 2012 Prelims]",
    option_a: "O₂⁺",
    option_b: "O₂⁻",
    option_c: "O₂²⁻",
    option_d: "O₂",
    correct_option: "B",
    explanation: "According to Molecular Orbital Theory for oxygen species:\n1. O₂⁻ (superoxide ion, 17 electrons):\nElectronic configuration:\nσ1s² σ*1s² σ2s² σ*2s² σ2p_z² π2p_x² = π2p_y² π*2p_x² = π*2p_y¹\nNumber of bonding electrons N_b = 10\nNumber of antibonding electrons N_a = 7\nBond order = (N_b - N_a) / 2 = (10 - 7) / 2 = 3 / 2 = 1.5\nFor comparison:\n- O₂⁺: Bond order = (10 - 5) / 2 = 2.5\n- O₂: Bond order = (10 - 6) / 2 = 2.0\n- O₂²⁻: Bond order = (10 - 8) / 2 = 1.0\nThus, a bond order of 1.5 is exhibited by O₂⁻.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following diatomic species has a fractional bond order of 2.5?",
      option_a: "NO",
      option_b: "N₂",
      option_c: "O₂",
      option_d: "CO",
      correct_option: "A",
      explanation: "NO has 15 electrons: N_b = 10, N_a = 5. Bond order = (10 - 5) / 2 = 2.5. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 406,
    question: "Which one of the following pairs is isostructural, i.e., has the same shape and hybridisation? [AIPMT 2012 Prelims]",
    option_a: "BCl₃ and BrCl₃",
    option_b: "NH₃ and NO₃⁻",
    option_c: "NF₃ and BF₃",
    option_d: "BF₄⁻ and NH₄⁺",
    correct_option: "D",
    explanation: "Let us analyze the shape and hybridization of the pair in Option (D):\n1. BF₄⁻: Central boron has 3 valence electrons + 1 (negative charge) = 4 electrons. It forms 4 sigma bonds with fluorine atoms and retains 0 lone pairs.\nSteric number = 4 + 0 = 4 => sp³ hybridization. Geometry = Regular tetrahedral.\n2. NH₄⁺: Central nitrogen has 5 valence electrons - 1 (positive charge) = 4 electrons. It forms 4 sigma bonds with hydrogen atoms and retains 0 lone pairs.\nSteric number = 4 + 0 = 4 => sp³ hybridization. Geometry = Regular tetrahedral.\nThus, both BF₄⁻ and NH₄⁺ have sp³ hybridization and regular tetrahedral geometry, making them isostructural.\nFor comparison, BCl₃ is planar while BrCl₃ is T-shaped; NH₃ is pyramidal while NO₃⁻ is planar; NF₃ is pyramidal while BF₃ is planar.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which pair of species is isoelectronic and isostructural with tetrahedral geometry?",
      option_a: "CH₄ and NH₄⁺",
      option_b: "CO₂ and SO₂",
      option_c: "BF₃ and NH₃",
      option_d: "XeF₄ and CCl₄",
      correct_option: "A",
      explanation: "Both CH₄ and NH₄⁺ have 10 electrons and 4 bond pairs with 0 lone pairs (sp³ tetrahedral). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 405,
    question: "Four diatomic species are listed below. Identify the correct order in which their bond orders increase: [AIPMT 2012 Mains]",
    option_a: "NO < O₂⁻ < C₂²⁻ < He₂⁺",
    option_b: "O₂⁻ < NO < C₂²⁻ < He₂⁺",
    option_c: "C₂²⁻ < He₂⁺ < O₂⁻ < NO",
    option_d: "He₂⁺ < O₂⁻ < NO < C₂²⁻",
    correct_option: "D",
    explanation: "Using Molecular Orbital Theory, calculate the bond orders:\n1. He₂⁺ (3 electrons): σ1s² σ*1s¹ => Bond order = (2 - 1) / 2 = 0.5\n2. O₂⁻ (17 electrons): 10 bonding, 7 antibonding => Bond order = (10 - 7) / 2 = 1.5\n3. NO (15 electrons): 10 bonding, 5 antibonding => Bond order = (10 - 5) / 2 = 2.5\n4. C₂²⁻ (14 electrons): 10 bonding, 4 antibonding => Bond order = (10 - 4) / 2 = 3.0\nThus, the increasing order of bond orders is:\nHe₂⁺ (0.5) < O₂⁻ (1.5) < NO (2.5) < C₂²⁻ (3.0).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Rank the species H₂⁺, H₂, and He₂ in order of increasing bond order:",
      option_a: "He₂ < H₂⁺ < H₂",
      option_b: "H₂⁺ < He₂ < H₂",
      option_c: "He₂ < H₂ < H₂⁺",
      option_d: "H₂ < H₂⁺ < He₂",
      correct_option: "A",
      explanation: "He₂ (BO = 0) < H₂⁺ (BO = 0.5) < H₂ (BO = 1.0). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 404,
    question: "During the conversion of O₂ to O₂⁻ ion, the incoming electron is added to which of the following molecular orbitals? [AIPMT 2012 Mains]",
    option_a: "π* orbital",
    option_b: "π orbital",
    option_c: "σ* orbital",
    option_d: "σ orbital",
    correct_option: "A",
    explanation: "The ground state electronic configuration of the neutral O₂ molecule (16 electrons) in MO theory is:\nσ1s² σ*1s² σ2s² σ*2s² σ2p_z² π2p_x² = π2p_y² π*2p_x¹ = π*2p_y¹\nThe highest occupied molecular orbitals (HOMO) are the degenerate antibonding π*2p_x and π*2p_y orbitals, each containing one unpaired electron.\nWhen an additional electron is accepted by O₂ to form the superoxide ion O₂⁻ (17 electrons), it enters the lowest available energy orbital, which is one of the half-filled degenerate antibonding π* orbitals (yielding π*2p_x² = π*2p_y¹).\nTherefore, the electron is added to a π* orbital.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "When N₂ is converted into N₂⁻, the additional electron enters which molecular orbital?",
      option_a: "π* orbital",
      option_b: "σ orbital",
      option_c: "σ* orbital",
      option_d: "π orbital",
      correct_option: "A",
      explanation: "In N₂, all bonding orbitals up to σ2p_z are fully occupied. The next available orbital (LUMO) is the antibonding π*2p orbital. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 403,
    question: "Identify the correct order of solubility in aqueous medium among Na₂S, ZnS, and CuS: [NEET 2013]",
    option_a: "Na₂S > CuS > ZnS",
    option_b: "Na₂S > ZnS > CuS",
    option_c: "CuS > ZnS > Na₂S",
    option_d: "ZnS > Na₂S > CuS",
    correct_option: "B",
    explanation: "Solubility in water depends on lattice energy versus hydration energy, and for sparingly soluble salts, on their solubility product constants (K_sp):\n1. Sodium sulfide (Na₂S) is an ionic salt of an alkali metal. Alkali metal salts have very high water solubility and dissociate completely in aqueous solution. Hence, Na₂S is the most soluble.\n2. Zinc sulfide (ZnS) and copper(II) sulfide (CuS) are heavy metal sulfides that are sparingly soluble precipitates:\n- For ZnS, K_sp ≈ 1.6 × 10⁻²⁴ (precipitates only in basic medium with H₂S in Group IV).\n- For CuS, K_sp ≈ 6.3 × 10⁻³⁶ (extremely small K_sp, precipitates readily even in dilute acidic medium with H₂S in Group II).\nSince K_sp(ZnS) >> K_sp(CuS), ZnS is more soluble than CuS in aqueous medium.\nTherefore, the decreasing order of solubility is: Na₂S > ZnS > CuS.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following sulfides is most soluble in water?",
      option_a: "K₂S",
      option_b: "PbS",
      option_c: "CdS",
      option_d: "HgS",
      correct_option: "A",
      explanation: "K₂S is an alkali metal sulfide with highly ionic character, making it completely and freely soluble in water. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 402,
    question: "Dipole-induced dipole interactions are present in which of the following pairs? [NEET 2013]",
    option_a: "HCl and He atoms",
    option_b: "SiF₄ and He atoms",
    option_c: "H₂O and alcohol",
    option_d: "Cl₂ and CCl₄",
    correct_option: "A",
    explanation: "Dipole-induced dipole interactions (Debye forces) occur between a polar molecule (which has a permanent dipole moment) and a non-polar molecule or atom (which has no permanent dipole, but whose electron cloud can be polarized by the adjacent dipole):\n1. In the pair HCl and He:\n- HCl is a polar molecule with a permanent dipole moment (due to the large electronegativity difference between H and Cl).\n- He is a noble gas atom with a symmetric, non-polar electron cloud.\nWhen HCl approaches a He atom, the permanent dipole of HCl distorts the electron cloud of He, inducing a temporary dipole. The resulting attraction is a dipole-induced dipole interaction.\n2. In comparison:\n- SiF₄ and He: Both are non-polar (dispersion forces only).\n- H₂O and alcohol: Both are polar (dipole-dipole and hydrogen bonding).\n- Cl₂ and CCl₄: Both are non-polar (dispersion forces only).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which type of intermolecular force operates between a polar H₂O molecule and a non-polar O₂ molecule dissolved in water?",
      option_a: "Dipole-induced dipole forces",
      option_b: "Dipole-dipole forces",
      option_c: "Ion-dipole forces",
      option_d: "Hydrogen bonding",
      correct_option: "A",
      explanation: "The permanent dipole of H₂O induces a dipole in the non-polar O₂ molecule, creating dipole-induced dipole interactions. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 401,
    question: "Which of the following species is paramagnetic? [NEET 2013]",
    option_a: "CN⁻",
    option_b: "NO⁺",
    option_c: "CO",
    option_d: "O₂⁻",
    correct_option: "D",
    explanation: "A species is paramagnetic if it possesses one or more unpaired electrons in its molecular orbitals:\n1. CN⁻: 6 (C) + 7 (N) + 1 = 14 electrons. Isoelectronic with N₂, all electrons are paired (diamagnetic).\n2. NO⁺: 7 (N) + 8 (O) - 1 = 14 electrons. Isoelectronic with N₂, all electrons are paired (diamagnetic).\n3. CO: 6 (C) + 8 (O) = 14 electrons. Isoelectronic with N₂, all electrons are paired (diamagnetic).\n4. O₂⁻ (superoxide ion): 8 + 8 + 1 = 17 electrons. Its MO configuration has an odd number of electrons, leaving one unpaired electron in the antibonding π*2p orbital:\nπ*2p_x² = π*2p_y¹\nBecause of this unpaired electron, O₂⁻ is paramagnetic.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species has 1 unpaired electron and is paramagnetic?",
      option_a: "NO",
      option_b: "N₂",
      option_c: "CO",
      option_d: "CN⁻",
      correct_option: "A",
      explanation: "NO has 15 valence electrons (an odd-electron molecule) with 1 unpaired electron in its π*2p orbital, making it paramagnetic. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 400,
    question: "Which of the following is a polar molecule? [NEET 2013]",
    option_a: "SiF₄",
    option_b: "XeF₄",
    option_c: "BF₃",
    option_d: "SF₄",
    correct_option: "D",
    explanation: "A molecule is polar if its individual bond dipoles do not cancel each other out due to asymmetry in its molecular geometry:\n1. SF₄: Sulfur has 6 valence electrons and forms 4 bonds with fluorine while retaining 1 lone pair (steric number = 5, sp³d hybridization). According to VSEPR theory, it adopts a see-saw geometry with the lone pair in an equatorial position. The asymmetric arrangement prevents the S-F bond dipoles from canceling, giving SF₄ a net permanent dipole moment (μ ≠ 0, polar).\n2. SiF₄: Regular tetrahedral (sp³), perfectly symmetrical (μ = 0, non-polar).\n3. XeF₄: Square planar (sp³d²), the four equatorial bonds and two axial lone pairs cancel symmetrically (μ = 0, non-polar).\n4. BF₃: Trigonal planar (sp²), three B-F bonds at 120° cancel symmetrically (μ = 0, non-polar).\nTherefore, SF₄ is the only polar molecule.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following interhalogen molecules is polar?",
      option_a: "ClF₃",
      option_b: "CCl₄",
      option_c: "CO₂",
      option_d: "BeF₂",
      correct_option: "A",
      explanation: "ClF₃ has a T-shaped geometry with 2 lone pairs in equatorial positions, resulting in a net non-zero dipole moment. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 399,
    question: "XeF₂ is isostructural with: [NEET 2013]",
    option_a: "SbCl₃",
    option_b: "BaCl₂",
    option_c: "TeF₂",
    option_d: "ICl₂⁻",
    correct_option: "D",
    explanation: "Two species are isostructural if they have the same shape and geometry:\n1. XeF₂: Xenon has 8 valence electrons + 2 from fluorines = 10 electrons (5 pairs).\nSteric number = 2 (bond pairs) + 3 (lone pairs) = 5 (sp³d hybridization).\nThe 3 lone pairs occupy equatorial positions at 120° to minimize repulsion, while the two fluorine atoms occupy axial positions, producing a linear geometry (F-Xe-F angle = 180°).\n2. ICl₂⁻ (dichloroiodate(I) ion): Central iodine has 7 valence electrons + 1 (negative charge) + 2 from chlorines = 10 electrons (5 pairs).\nSteric number = 2 (bond pairs) + 3 (lone pairs) = 5 (sp³d hybridization).\nThe 3 lone pairs occupy equatorial positions, producing a linear geometry (Cl-I-Cl angle = 180°).\nThus, both XeF₂ and ICl₂⁻ have sp³d hybridization with 2 bond pairs and 3 lone pairs, making them linear and isostructural.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following ions is linear and isostructural with XeF₂?",
      option_a: "I₃⁻",
      option_b: "SO₂",
      option_c: "NO₂⁻",
      option_d: "ClO₂⁻",
      correct_option: "A",
      explanation: "I₃⁻ has 2 bond pairs and 3 equatorial lone pairs (sp³d hybridization), giving a linear geometry identical to XeF₂. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 398,
    question: "Which of the following is an electron-deficient compound? [NEET 2013]",
    option_a: "(BH₃)₂",
    option_b: "PH₃",
    option_c: "(CH₃)₂",
    option_d: "(SiH₃)₂",
    correct_option: "A",
    explanation: "An electron-deficient compound is one in which the central atoms lack sufficient valence electrons to complete their octets through conventional two-centre two-electron (2c-2e) covalent bonds.\nIn diborane, B₂H₆ or (BH₃)₂:\n- Each boron atom has 3 valence electrons, and each hydrogen has 1 electron, giving a total of 12 valence electrons for the entire molecule.\n- To form conventional single bonds between 2 boron and 6 hydrogen atoms, 7 bonds requiring 14 electrons would be needed.\n- Since only 12 electrons are available, diborane forms four terminal B-H (2c-2e) bonds and two three-centre two-electron (3c-2e) bridging B-H-B bonds (banana bonds).\nBecause the boron atoms do not have enough valence electrons to complete standard octets, diborane is classified as an electron-deficient molecule.\nIn contrast, PH₃, (CH₃)₂ (ethane moiety), and (SiH₃)₂ have complete octets.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following boron hydrides contains three-centre two-electron (3c-2e) banana bonds?",
      option_a: "B₂H₆",
      option_b: "BF₃",
      option_c: "BCl₃",
      option_d: "H₃BO₃",
      correct_option: "A",
      explanation: "B₂H₆ (diborane) contains two bridging B-H-B 3c-2e bonds due to its electron-deficient nature. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 397,
    question: "In which of the following ionisation processes does the bond energy increase and the magnetic behaviour change from paramagnetic to diamagnetic? [NEET 2013 Karnataka]",
    option_a: "O₂ → O₂⁺",
    option_b: "C₂ → C₂⁺",
    option_c: "NO → NO⁺",
    option_d: "N₂ → N₂⁺",
    correct_option: "C",
    explanation: "Let us examine the change in bond order and magnetic behavior for each process:\n1. For NO → NO⁺:\n- Neutral NO (15 electrons) has MO configuration ending in π*2p_x¹.\nBond order = (10 - 5) / 2 = 2.5. It has 1 unpaired electron, so it is paramagnetic.\n- Upon ionization, the single electron in the antibonding π* orbital is removed to form NO⁺ (14 electrons, isoelectronic with N₂):\nBond order = (10 - 4) / 2 = 3.0. All electrons are now paired, so NO⁺ is diamagnetic.\nSince bond order increases from 2.5 to 3.0, the bond energy increases, and the magnetic property changes from paramagnetic to diamagnetic.\n2. In O₂ → O₂⁺, O₂ (paramagnetic, BO = 2.0) becomes O₂⁺ (paramagnetic, BO = 2.5).\n3. In N₂ → N₂⁺, N₂ (diamagnetic, BO = 3.0) becomes N₂⁺ (paramagnetic, BO = 2.5).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "When an electron is removed from NO to form NO⁺, what happens to its bond order?",
      option_a: "Increases from 2.5 to 3.0",
      option_b: "Decreases from 2.5 to 2.0",
      option_c: "Remains constant at 2.5",
      option_d: "Decreases from 3.0 to 2.5",
      correct_option: "A",
      explanation: "Removing an antibonding electron increases the bond order by 0.5, so NO (BO = 2.5) becomes NO⁺ (BO = 3.0). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 396,
    question: "In which of the following pairs do both species have sp³ hybridisation? [NEET 2013 Karnataka]",
    option_a: "SiF₄, BeH₂",
    option_b: "NF₃, H₂O",
    option_c: "NF₃, BF₃",
    option_d: "H₂S, BF₃",
    correct_option: "B",
    explanation: "Let us determine the hybridization of the central atom in each species:\n1. NF₃: Nitrogen has 5 valence electrons. It forms 3 sigma bonds with fluorine and retains 1 lone pair.\nSteric number = 3 + 1 = 4 => sp³ hybridization (trigonal pyramidal).\n2. H₂O: Oxygen has 6 valence electrons. It forms 2 sigma bonds with hydrogen and retains 2 lone pairs.\nSteric number = 2 + 2 = 4 => sp³ hybridization (angular/bent).\nThus, in the pair (NF₃, H₂O), both central atoms are sp³ hybridized.\nFor comparison, BeH₂ has sp hybridization; BF₃ has sp² hybridization.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs of hydrides has sp³ hybridization on the central atom?",
      option_a: "NH₃ and H₂O",
      option_b: "BeH₂ and H₂O",
      option_c: "BH₃ and NH₃",
      option_d: "CH₄ and BeH₂",
      correct_option: "A",
      explanation: "NH₃ (3 bp + 1 lp) and H₂O (2 bp + 2 lp) both have steric number 4 and sp³ hybridization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 395,
    question: "The outer orbitals of C in an ethene molecule are considered to be hybridised to give three equivalent sp² orbitals. The total number of sigma (σ) and pi (π) bonds in an ethene molecule is: [NEET 2013 Karnataka]",
    option_a: "3 sigma and 2 pi",
    option_b: "4 sigma and 1 pi",
    option_c: "5 sigma and 1 pi",
    option_d: "1 sigma and 2 pi",
    correct_option: "C",
    explanation: "The molecular formula of ethene is C₂H₄, with structural formula H₂C=CH₂.\nLet us count the covalent bonds:\n1. Sigma (σ) bonds:\n- Four C-H sigma bonds formed by the overlap of sp² hybrid orbitals of carbon with 1s orbitals of hydrogen.\n- One C-C sigma bond formed by the axial overlap of sp² hybrid orbitals from each carbon atom.\nTotal sigma bonds = 4 + 1 = 5 sigma bonds.\n2. Pi (π) bonds:\n- One C-C pi bond formed by the lateral (sideways) overlap of unhybridized 2p_z orbitals of the two carbon atoms.\nTotal pi bonds = 1 pi bond.\nTherefore, ethene has 5 sigma and 1 pi bonds.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "How many sigma and pi bonds are present in an ethyne (acetylene, C₂H₂) molecule?",
      option_a: "3 sigma and 2 pi",
      option_b: "2 sigma and 3 pi",
      option_c: "4 sigma and 1 pi",
      option_d: "5 sigma and 1 pi",
      correct_option: "A",
      explanation: "Ethyne (H-C≡C-H) has two C-H sigma bonds, one C-C sigma bond (total 3 sigma), and two C-C pi bonds (total 2 pi). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 394,
    question: "A pair of species that has the same bond order is: [NEET 2013 Karnataka]",
    option_a: "CO, NO⁺",
    option_b: "NO, CN⁻",
    option_c: "O₂, N₂",
    option_d: "O₂, B₂",
    correct_option: "A",
    explanation: "Isoelectronic species (species containing the same total number of electrons) generally possess the same molecular orbital configuration and identical bond orders:\n1. CO: 6 (C) + 8 (O) = 14 electrons.\nBond order = (10 - 4) / 2 = 3.0\n2. NO⁺: 7 (N) + 8 (O) - 1 = 14 electrons.\nBond order = (10 - 4) / 2 = 3.0\nBoth CO and NO⁺ are isoelectronic with N₂ (14 electrons) and share an identical bond order of 3.0.\nFor comparison, NO has 15 electrons (BO = 2.5), CN⁻ has 14 electrons (BO = 3.0), O₂ has 16 electrons (BO = 2.0), and N₂ has 14 electrons (BO = 3.0).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following isoelectronic pairs has a bond order of 3.0?",
      option_a: "CN⁻ and NO⁺",
      option_b: "O₂⁺ and NO",
      option_c: "O₂⁻ and F₂",
      option_d: "N₂ and O₂",
      correct_option: "A",
      explanation: "Both CN⁻ and NO⁺ have 14 electrons and a bond order of 3.0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 393,
    question: "Which one of the following species has a plane triangular (trigonal planar) shape? [AIPMT 2014]",
    option_a: "N₃⁻",
    option_b: "NO₃⁻",
    option_c: "NO₂⁻",
    option_d: "CO₂",
    correct_option: "B",
    explanation: "Let us examine the hybridization and shape of each species:\n1. NO₃⁻ (nitrate ion): Nitrogen has 5 valence electrons + 1 (charge) = 6 electrons participating in bonding. It forms 3 sigma bonds with three oxygen atoms and has 0 lone pairs.\nSteric number = 3 (bond pairs) + 0 (lone pairs) = 3 => sp² hybridization.\nThe three oxygen atoms lie at 120° angles in the same plane around nitrogen, producing a plane triangular (trigonal planar) shape.\n2. N₃⁻ (azide ion): Central nitrogen has 2 sigma bonds and 0 lone pairs (sp hybridized), giving a linear shape.\n3. NO₂⁻ (nitrite ion): Central nitrogen has 2 sigma bonds and 1 lone pair (sp² hybridized), giving a bent/angular shape.\n4. CO₂: Central carbon has 2 sigma bonds and 0 lone pairs (sp hybridized), giving a linear shape.\nTherefore, NO₃⁻ has a plane triangular shape.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species possesses a trigonal planar shape?",
      option_a: "CO₃²⁻",
      option_b: "SO₃²⁻",
      option_c: "ClO₃⁻",
      option_d: "NH₃",
      correct_option: "A",
      explanation: "CO₃²⁻ has 3 sigma bonds and 0 lone pairs on carbon (sp² hybridization), giving a trigonal planar geometry. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 392,
    question: "Which of the following molecules has the maximum dipole moment? [AIPMT 2014]",
    option_a: "CO₂",
    option_b: "CH₄",
    option_c: "NH₃",
    option_d: "NF₃",
    correct_option: "C",
    explanation: "Let us compare the dipole moments of the molecules:\n1. CO₂: Linear geometry (O=C=O). The two equal and opposite C=O bond dipoles cancel out completely (μ = 0 D).\n2. CH₄: Regular tetrahedral geometry. All four C-H bond dipoles cancel out completely (μ = 0 D).\n3. NF₃: Trigonal pyramidal geometry with 1 lone pair on nitrogen. The three highly polar N-F bond dipoles point downward away from nitrogen toward fluorine, which opposes the upward-pointing lone-pair dipole. The resultant dipole moment is very small (μ ≈ 0.24 D).\n4. NH₃: Trigonal pyramidal geometry with 1 lone pair on nitrogen. Nitrogen is more electronegative than hydrogen, so the three N-H bond dipoles point upward toward nitrogen, in the same direction as the lone-pair orbital dipole. The dipoles reinforce each other, producing a large net dipole moment (μ ≈ 1.47 D).\nTherefore, NH₃ has the maximum dipole moment among the choices.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Between NH₃ and NF₃, which molecule has a larger dipole moment and why?",
      option_a: "NH₃, because bond dipoles and lone-pair dipole reinforce each other",
      option_b: "NF₃, because fluorine is more electronegative than hydrogen",
      option_c: "NF₃, because it has a planar geometry",
      option_d: "Both have identical dipole moments",
      correct_option: "A",
      explanation: "In NH₃, the bond dipoles point in the same direction as the lone-pair dipole, reinforcing each other to give μ = 1.47 D. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 391,
    question: "Which of the following species contains an equal number of σ- and π-bonds? [AIPMT 2015 Cancelled]",
    option_a: "(CN)₂",
    option_b: "CH₂(CN)₂",
    option_c: "HCO₃⁻",
    option_d: "XeO₄",
    correct_option: "D",
    explanation: "Let us count the number of σ- and π-bonds in each species:\n1. XeO₄ (xenon tetroxide): Xenon has 8 valence electrons and forms 4 double bonds (Xe=O) with four oxygen atoms in a tetrahedral geometry.\nEach double bond consists of 1 σ-bond and 1 π-bond.\nTotal σ-bonds = 4\nTotal π-bonds = 4\nThus, XeO₄ contains an equal number of σ- and π-bonds (4 σ and 4 π).\n2. (CN)₂ (cyanogen, N≡C-C≡N): 3 σ-bonds (two C-N and one C-C) and 4 π-bonds (two in each triple bond).\n3. CH₂(CN)₂ (malononitrile): 6 σ-bonds and 4 π-bonds.\n4. HCO₃⁻: 4 σ-bonds and 1 π-bond.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules has an equal number of sigma and pi bonds?",
      option_a: "XeO₄",
      option_b: "C₂H₄",
      option_c: "C₂H₂",
      option_d: "CO₂",
      correct_option: "A",
      explanation: "XeO₄ has 4 Xe=O double bonds, giving exactly 4 sigma bonds and 4 pi bonds. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 390,
    question: "The maximum bond angle at nitrogen is present in which of the following? [AIPMT 2015 Cancelled]",
    option_a: "NO₂⁺",
    option_b: "NO₃⁻",
    option_c: "NO₂",
    option_d: "NO₂⁻",
    correct_option: "A",
    explanation: "Let us determine the hybridization and bond angles of the nitrogen species:\n1. NO₂⁺ (nitronium ion): Central nitrogen has 2 sigma bonds and 0 lone pairs. It is sp hybridized and has a linear shape with an O-N-O bond angle of 180°.\n2. NO₃⁻ (nitrate ion): Central nitrogen has 3 sigma bonds and 0 lone pairs. It is sp² hybridized with a trigonal planar shape and an O-N-O bond angle of 120°.\n3. NO₂: Central nitrogen has 2 sigma bonds and 1 single unpaired electron (odd-electron species). The bond angle is approximately 134°.\n4. NO₂⁻ (nitrite ion): Central nitrogen has 2 sigma bonds and 1 lone pair. Lone pair-bond pair repulsion compresses the O-N-O angle to approximately 115°.\nComparing all angles:\nNO₂⁺ (180°) > NO₂ (134°) > NO₃⁻ (120°) > NO₂⁻ (115°).\nTherefore, NO₂⁺ has the maximum bond angle at nitrogen.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the bond angle in the linear nitronium ion (NO₂⁺)?",
      option_a: "180°",
      option_b: "120°",
      option_c: "109.5°",
      option_d: "104.5°",
      correct_option: "A",
      explanation: "NO₂⁺ is sp hybridized with no lone pairs on nitrogen, yielding a linear geometry with a 180° bond angle. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 389,
    question: "Which of the following options represents the correct order of bond orders? [AIPMT 2015 Cancelled]",
    option_a: "O₂⁻ > O₂ < O₂⁺",
    option_b: "O₂⁻ < O₂ > O₂⁺",
    option_c: "O₂⁻ > O₂ > O₂⁺",
    option_d: "O₂⁻ < O₂ < O₂⁺",
    correct_option: "D",
    explanation: "Using Molecular Orbital Theory for the oxygen species:\n1. O₂⁻ (17 electrons): 10 bonding, 7 antibonding electrons.\nBond order = (10 - 7) / 2 = 1.5\n2. O₂ (16 electrons): 10 bonding, 6 antibonding electrons.\nBond order = (10 - 6) / 2 = 2.0\n3. O₂⁺ (15 electrons): 10 bonding, 5 antibonding electrons.\nBond order = (10 - 5) / 2 = 2.5\nArranging these in increasing order:\nO₂⁻ (1.5) < O₂ (2.0) < O₂⁺ (2.5).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Arrange O₂, O₂⁻, and O₂²⁻ in order of increasing bond order:",
      option_a: "O₂²⁻ < O₂⁻ < O₂",
      option_b: "O₂ < O₂⁻ < O₂²⁻",
      option_c: "O₂⁻ < O₂²⁻ < O₂",
      option_d: "O₂²⁻ < O₂ < O₂⁻",
      correct_option: "A",
      explanation: "O₂²⁻ (1.0) < O₂⁻ (1.5) < O₂ (2.0). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 388,
    question: "The correct order of bond order for the following species is: [AIPMT 2015 Cancelled]",
    option_a: "O₂⁺ < O₂⁻ < O₂²⁺",
    option_b: "O₂⁻ < O₂⁺ < O₂²⁺",
    option_c: "O₂²⁺ < O₂⁺ < O₂⁻",
    option_d: "O₂²⁺ < O₂⁻ < O₂⁺",
    correct_option: "B",
    explanation: "Let us calculate the bond orders using Molecular Orbital Theory:\n1. O₂⁻ (17 electrons): N_b = 10, N_a = 7.\nBond order = (10 - 7) / 2 = 1.5\n2. O₂⁺ (15 electrons): N_b = 10, N_a = 5.\nBond order = (10 - 5) / 2 = 2.5\n3. O₂²⁺ (14 electrons, isoelectronic with N₂): N_b = 10, N_a = 4.\nBond order = (10 - 4) / 2 = 3.0\nArranging in increasing order of bond order:\nO₂⁻ (1.5) < O₂⁺ (2.5) < O₂²⁺ (3.0).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the bond order of O₂²⁺ (14 electrons)?",
      option_a: "3.0",
      option_b: "2.5",
      option_c: "2.0",
      option_d: "1.5",
      correct_option: "A",
      explanation: "O₂²⁺ has 14 electrons and is isoelectronic with N₂, giving a bond order of (10 - 4)/2 = 3.0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 387,
    question: "Which of the following pairs of ions are isoelectronic and isostructural? [AIPMT 2015 Cancelled]",
    option_a: "SO₃²⁻, NO₃⁻",
    option_b: "ClO₃⁻, SO₃²⁻",
    option_c: "CO₃²⁻, SO₃²⁻",
    option_d: "ClO₃⁻, CO₃²⁻",
    correct_option: "B",
    explanation: "Let us evaluate both electron counts and structures:\n1. ClO₃⁻ (chlorate ion):\n- Total valence electrons = 7 (Cl) + 3×6 (O) + 1 (charge) = 26 valence electrons.\n- Central Cl forms 3 sigma bonds with oxygen and retains 1 lone pair (along with dπ-pπ bonds).\n- Steric number = 3 + 1 = 4 => sp³ hybridization. Shape = Trigonal pyramidal.\n2. SO₃²⁻ (sulfite ion):\n- Total valence electrons = 6 (S) + 3×6 (O) + 2 (charge) = 26 valence electrons.\n- Central S forms 3 sigma bonds with oxygen and retains 1 lone pair.\n- Steric number = 3 + 1 = 4 => sp³ hybridization. Shape = Trigonal pyramidal.\nBoth ClO₃⁻ and SO₃²⁻ have 26 valence electrons (isoelectronic) and an sp³ hybridized central atom with 3 bond pairs and 1 lone pair, giving a trigonal pyramidal shape (isostructural).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs of ions are isoelectronic with 26 valence electrons and have a pyramidal shape?",
      option_a: "SO₃²⁻ and ClO₃⁻",
      option_b: "NO₃⁻ and CO₃²⁻",
      option_c: "BF₄⁻ and NH₄⁺",
      option_d: "CO₃²⁻ and SO₃²⁻",
      correct_option: "A",
      explanation: "Both SO₃²⁻ and ClO₃⁻ have 26 valence electrons and adopt a trigonal pyramidal shape (sp³ with 1 lone pair). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 386,
    question: "The decreasing order of stability of O₂, O₂⁻, O₂⁺, and O₂²⁻ is: [AIPMT 2015]",
    option_a: "O₂²⁻ > O₂⁻ > O₂ > O₂⁺",
    option_b: "O₂ > O₂⁺ > O₂²⁻ > O₂⁻",
    option_c: "O₂⁻ > O₂²⁻ > O₂⁺ > O₂",
    option_d: "O₂⁺ > O₂ > O₂⁻ > O₂²⁻",
    correct_option: "D",
    explanation: "The thermodynamic stability of a diatomic species is directly proportional to its bond order:\nHigher bond order corresponds to a stronger bond and greater molecular stability.\nLet us determine the bond orders:\n1. O₂⁺: Bond order = (10 - 5) / 2 = 2.5\n2. O₂: Bond order = (10 - 6) / 2 = 2.0\n3. O₂⁻: Bond order = (10 - 7) / 2 = 1.5\n4. O₂²⁻: Bond order = (10 - 8) / 2 = 1.0\nArranging in decreasing order of stability (following bond order):\nO₂⁺ (2.5) > O₂ (2.0) > O₂⁻ (1.5) > O₂²⁻ (1.0).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following oxygen species is the least stable with the lowest bond order?",
      option_a: "O₂²⁻",
      option_b: "O₂⁻",
      option_c: "O₂",
      option_d: "O₂⁺",
      correct_option: "A",
      explanation: "O₂²⁻ has a bond order of 1.0, making it the least stable among the oxygen species. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 385,
    question: "In which of the following pairs are both species not isostructural? [AIPMT 2015]",
    option_a: "Diamond, silicon carbide",
    option_b: "NH₃, PH₃",
    option_c: "XeF₄, XeO₄",
    option_d: "SiCl₄, PCl₄⁺",
    correct_option: "C",
    explanation: "Let us inspect the structures of each pair:\n1. Option (C):\n- XeF₄: Central Xe has 4 bond pairs and 2 lone pairs. Steric number = 6 (sp³d² hybridization), producing a square planar geometry.\n- XeO₄: Central Xe has 4 double bonds with oxygen atoms and 0 lone pairs. Steric number = 4 (sp³ hybridization), producing a tetrahedral geometry.\nSince square planar and tetrahedral are completely different geometries, XeF₄ and XeO₄ are not isostructural.\n2. In Option (A): Diamond and silicon carbide both have 3D giant tetrahedral covalent network lattices (isostructural).\n3. In Option (B): Both NH₃ and PH₃ are trigonal pyramidal (sp³ with 1 lone pair, isostructural).\n4. In Option (D): Both SiCl₄ and PCl₄⁺ are regular tetrahedral (sp³ with 0 lone pairs, isostructural).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following xenon compounds is not tetrahedral?",
      option_a: "XeF₄",
      option_b: "XeO₄",
      option_c: "XeO₃F₂",
      option_d: "None of these",
      correct_option: "A",
      explanation: "XeF₄ is square planar due to its two axial lone pairs (sp³d²), unlike XeO₄ which is tetrahedral. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 384,
    question: "Predict the correct order of electron pair repulsions according to VSEPR theory among the following: [NEET 2016 Phase 1]",
    option_a: "Bond pair-bond pair > lone pair-bond pair > lone pair-lone pair",
    option_b: "Lone pair-bond pair > bond pair-bond pair > lone pair-lone pair",
    option_c: "Lone pair-lone pair > lone pair-bond pair > bond pair-bond pair",
    option_d: "Lone pair-lone pair > bond pair-bond pair > lone pair-bond pair",
    correct_option: "C",
    explanation: "According to the Valence Shell Electron Pair Repulsion (VSEPR) theory formulated by Gillespie and Nyholm:\n- A lone pair of electrons is localized on the central nucleus alone, so its electron cloud is broader, occupies more spatial volume, and exerts greater electrostatic repulsion on adjacent electron pairs.\n- A bond pair of electrons is shared between two nuclei, so its electron cloud is drawn out and held more tightly between the bonded atoms, occupying less space around the central atom.\nConsequently, the repulsive interactions between electron pairs decrease in the order:\nLone pair - Lone pair (lp - lp) > Lone pair - Bond pair (lp - bp) > Bond pair - Bond pair (bp - bp).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "According to VSEPR theory, why is the H-O-H bond angle in water (104.5°) smaller than the ideal tetrahedral angle (109.5°)?",
      option_a: "Due to strong lone pair-lone pair and lone pair-bond pair repulsions",
      option_b: "Due to high electronegativity of hydrogen",
      option_c: "Because oxygen has an incomplete octet",
      option_d: "Due to resonance stabilization",
      correct_option: "A",
      explanation: "The two lone pairs on oxygen repel each other strongly and compress the two O-H bond pairs together, reducing the angle to 104.5°. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 383,
    question: "Consider the molecules CH₄, NH₃, and H₂O. Which of the given statements is false? [NEET 2016 Phase 1]",
    option_a: "The H-O-H bond angle in H₂O is smaller than the H-N-H bond angle in NH₃",
    option_b: "The H-C-H bond angle in CH₄ is larger than the H-N-H bond angle in NH₃",
    option_c: "The H-C-H bond angle in CH₄, H-N-H bond angle in NH₃, and H-O-H bond angle in H₂O are all greater than 90°",
    option_d: "The H-O-H bond angle in H₂O is larger than the H-C-H bond angle in CH₄",
    correct_option: "D",
    explanation: "All three molecules have central atoms with sp³ hybridization and steric number 4:\n1. CH₄ has 4 bond pairs and 0 lone pairs. With no lone pair distortion, its bond angle is the ideal tetrahedral angle of 109.5°.\n2. NH₃ has 3 bond pairs and 1 lone pair. The lp - bp repulsion compresses the H-N-H bond angle to approximately 107°.\n3. H₂O has 2 bond pairs and 2 lone pairs. The stronger lp - lp and lp - bp repulsions compress the H-O-H bond angle even further to 104.5°.\nComparing bond angles:\nCH₄ (109.5°) > NH₃ (107°) > H₂O (104.5°).\nNotice that the H-O-H bond angle in H₂O (104.5°) is strictly smaller than the H-C-H bond angle in CH₄ (109.5°).\nTherefore, the statement claiming that the H-O-H bond angle in H₂O is larger than that in CH₄ is false.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following is the correct decreasing order of bond angles in CH₄, NH₃, and H₂O?",
      option_a: "CH₄ > NH₃ > H₂O",
      option_b: "H₂O > NH₃ > CH₄",
      option_c: "NH₃ > CH₄ > H₂O",
      option_d: "CH₄ > H₂O > NH₃",
      correct_option: "A",
      explanation: "CH₄ (109.5°) > NH₃ (107°) > H₂O (104.5°). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 382,
    question: "Among the following, which one is a wrong statement? [NEET 2016 Phase 2]",
    option_a: "PH₅ and BiCl₅ do not exist",
    option_b: "pπ-dπ bonds are present in SO₂",
    option_c: "SeF₄ and CH₄ have the same shape",
    option_d: "I₃⁺ has a bent geometry",
    correct_option: "C",
    explanation: "Let us evaluate each statement:\n1. Option (A): PH₅ does not exist because hydrogen is not sufficiently electronegative to contract the 3d orbitals of phosphorus. BiCl₅ does not exist because the inert pair effect makes bismuth in the +5 oxidation state an extremely strong oxidizing agent that is unstable. This statement is correct.\n2. Option (B): In SO₂, sulfur is from the third period and has vacant 3d orbitals that overlap with oxygen 2p orbitals to form pπ-dπ bonds. This statement is correct.\n3. Option (C): CH₄ has 4 bond pairs and 0 lone pairs (sp³ hybridization), resulting in a regular tetrahedral geometry. SeF₄ has 4 bond pairs and 1 lone pair on selenium (sp³d hybridization), resulting in a see-saw geometry. Because see-saw and tetrahedral are completely different shapes, the statement that they have the same shape is wrong.\n4. Option (D): I₃⁺ has central I with 2 bond pairs and 2 lone pairs (sp³ hybridization), giving a bent/angular geometry. This statement is correct.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the molecular geometry of SeF₄?",
      option_a: "See-saw",
      option_b: "Tetrahedral",
      option_c: "Square planar",
      option_d: "Trigonal bipyramidal",
      correct_option: "A",
      explanation: "SeF₄ has 4 bond pairs and 1 lone pair on selenium (sp³d hybridization), giving a see-saw shape. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 381,
    question: "The correct geometry and hybridisation for XeF₄ are: [NEET 2016 Phase 2]",
    option_a: "Octahedral, sp³d²",
    option_b: "Trigonal bipyramidal, sp³d",
    option_c: "Planar triangle, sp³d³",
    option_d: "Square planar, sp³d²",
    correct_option: "D",
    explanation: "In xenon tetrafluoride (XeF₄):\n1. Central xenon atom has 8 valence electrons. It forms 4 single covalent bonds with fluorine atoms, using 4 electrons, leaving 4 non-bonding electrons that form 2 lone pairs.\n2. The steric number is:\nSteric number = 4 (bond pairs) + 2 (lone pairs) = 6\nThis corresponds to sp³d² hybridization with an octahedral electron-pair geometry.\n3. According to VSEPR theory, the 2 lone pairs occupy axial positions opposite to each other (at 180°) to minimize lone pair-lone pair repulsion.\n4. The four fluorine atoms occupy the equatorial positions, resulting in a square planar molecular geometry.\nTherefore, the hybridization is sp³d² and the molecular geometry is square planar.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the hybridization and shape of the BrF₄⁻ ion?",
      option_a: "sp³d², Square planar",
      option_b: "sp³d, See-saw",
      option_c: "sp³d², Octahedral",
      option_d: "sp³, Tetrahedral",
      correct_option: "A",
      explanation: "BrF₄⁻ has 4 bond pairs and 2 lone pairs on bromine, giving steric number 6, sp³d² hybridization, and a square planar geometry. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 380,
    question: "The hybridisations of atomic orbitals of nitrogen in NO₂⁺, NO₃⁻, and NH₄⁺ respectively are: [NEET 2016 Phase 2]",
    option_a: "sp, sp³ and sp²",
    option_b: "sp², sp³ and sp³",
    option_c: "sp, sp² and sp³",
    option_d: "sp², sp and sp³",
    correct_option: "C",
    explanation: "Let us calculate the steric number and hybridization for nitrogen in each ion:\n1. In NO₂⁺ (nitronium ion):\nNitrogen has 5 - 1 = 4 valence electrons. It forms 2 double bonds with two oxygen atoms (O=N⁺=O) and has 0 lone pairs.\nSteric number = 2 (sigma bonds) + 0 (lone pairs) = 2 => sp hybridization (linear).\n2. In NO₃⁻ (nitrate ion):\nNitrogen forms 3 sigma bonds with oxygen atoms and has 0 lone pairs.\nSteric number = 3 (sigma bonds) + 0 (lone pairs) = 3 => sp² hybridization (trigonal planar).\n3. In NH₄⁺ (ammonium ion):\nNitrogen has 5 - 1 = 4 valence electrons. It forms 4 sigma bonds with four hydrogen atoms and has 0 lone pairs.\nSteric number = 4 (sigma bonds) + 0 (lone pairs) = 4 => sp³ hybridization (tetrahedral).\nTherefore, the hybridizations are sp, sp², and sp³ respectively.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the hybridization of carbon in CO₂, CO₃²⁻, and CH₄ respectively?",
      option_a: "sp, sp², sp³",
      option_b: "sp², sp, sp³",
      option_c: "sp³, sp², sp",
      option_d: "sp, sp³, sp²",
      correct_option: "A",
      explanation: "CO₂ is sp (linear), CO₃²⁻ is sp² (trigonal planar), and CH₄ is sp³ (tetrahedral). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 379,
    question: "Which one of the following compounds shows the presence of intramolecular hydrogen bonding? [NEET 2016 Phase 2]",
    option_a: "H₂O₂",
    option_b: "HCN",
    option_c: "Cellulose",
    option_d: "Concentrated acetic acid",
    correct_option: "C",
    explanation: "Intramolecular hydrogen bonding occurs within the same single molecule between a hydrogen atom attached to an electronegative atom and another nearby electronegative atom in the same molecule:\n1. Cellulose is a linear polymer of β-D-glucose units. Extensive intramolecular hydrogen bonds form between the C3-OH group of one glucose unit and the ring oxygen (O5) or C6-OH group of the adjacent unit within the same polysaccharide chain. These intramolecular hydrogen bonds hold the cellulose chains in a stiff, rigid conformation.\n2. In contrast, H₂O₂, HCN, and acetic acid (which forms intermolecular cyclic dimers) exhibit intermolecular hydrogen bonding between different molecules.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following organic compounds exhibits strong intramolecular hydrogen bonding?",
      option_a: "o-Nitrophenol",
      option_b: "p-Nitrophenol",
      option_c: "m-Nitrophenol",
      option_d: "Phenol",
      correct_option: "A",
      explanation: "In o-nitrophenol, the -OH group and the -NO₂ group are ortho to each other, allowing the formation of a 6-membered chelate ring via intramolecular hydrogen bonding. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 378,
    question: "Which one of the following pairs of species has the same bond order? [NEET 2017]",
    option_a: "O₂, NO⁺",
    option_b: "CN⁻, CO",
    option_c: "N₂, O₂⁻",
    option_d: "CO, NO",
    correct_option: "B",
    explanation: "Isoelectronic species have the same total number of electrons and identical bond orders:\n1. CN⁻ has 6 (C) + 7 (N) + 1 (charge) = 14 electrons.\n2. CO has 6 (C) + 8 (O) = 14 electrons.\nBoth CN⁻ and CO possess 14 electrons, which gives the molecular orbital electronic configuration identical to N₂:\nσ1s² σ*1s² σ2s² σ*2s² π2p_x² = π2p_y² σ2p_z²\nNumber of bonding electrons N_b = 10, antibonding electrons N_a = 4.\nBond order = (N_b - N_a) / 2 = (10 - 4) / 2 = 3.0\nBoth CN⁻ and CO share the same bond order of 3.0.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species has the same bond order as N₂ (bond order = 3.0)?",
      option_a: "NO⁺",
      option_b: "O₂",
      option_c: "NO",
      option_d: "O₂⁺",
      correct_option: "A",
      explanation: "NO⁺ has 14 electrons (isoelectronic with N₂), giving a bond order of 3.0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 377,
    question: "The species having bond angles of 120° is: [NEET 2017]",
    option_a: "ClF₃",
    option_b: "NCl₃",
    option_c: "BCl₃",
    option_d: "PH₃",
    correct_option: "C",
    explanation: "Let us examine the geometry and bond angles of each species:\n1. BCl₃: Boron has 3 valence electrons and forms 3 single sigma bonds with chlorine atoms, with 0 lone pairs.\nSteric number = 3 + 0 = 3 => sp² hybridization.\nThe three B-Cl bonds lie in a single plane directed towards the corners of an equilateral triangle, producing a symmetrical trigonal planar geometry where all Cl-B-Cl bond angles are exactly 120°.\n2. ClF₃: T-shaped (sp³d, 3 bond pairs + 2 lone pairs) with angles close to 87.5°.\n3. NCl₃: Trigonal pyramidal (sp³, 3 bond pairs + 1 lone pair) with angles around 107°.\n4. PH₃: Trigonal pyramidal (sp³, bond angle around 93.5° due to Drago's rule).\nTherefore, BCl₃ is the species having bond angles of 120°.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules has a symmetrical trigonal planar shape with 120° bond angles?",
      option_a: "BF₃",
      option_b: "NH₃",
      option_c: "H₂O",
      option_d: "PCl₃",
      correct_option: "A",
      explanation: "BF₃ has sp² hybridization and zero lone pairs on boron, giving a trigonal planar shape with 120° bond angles. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 376,
    question: "In the structure of ClF₃, the number of lone pairs of electrons on the central chlorine atom is: [NEET 2018]",
    option_a: "One",
    option_b: "Two",
    option_c: "Four",
    option_d: "Three",
    correct_option: "B",
    explanation: "In chlorine trifluoride (ClF₃):\n- The central chlorine atom belongs to Group 17 and has 7 valence electrons.\n- It forms 3 single covalent bonds with three fluorine atoms, using 3 of its valence electrons.\n- The remaining valence electrons on chlorine = 7 - 3 = 4 non-bonding electrons.\n- These 4 non-bonding electrons form 4 / 2 = 2 lone pairs.\nThe steric number of chlorine is:\nSteric number = 3 (bond pairs) + 2 (lone pairs) = 5\nThis corresponds to sp³d hybridization.\nAccording to VSEPR theory, the 2 lone pairs occupy the equatorial positions to minimize repulsions, producing a T-shaped molecular geometry.\nThus, there are exactly two lone pairs of electrons on the central chlorine atom.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "How many lone pairs of electrons are present on the central iodine atom in IF₃?",
      option_a: "Two",
      option_b: "One",
      option_c: "Three",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Iodine in IF₃ shares 3 electrons with fluorine, leaving 4 non-bonding electrons that form 2 lone pairs (sp³d, T-shaped). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 375,
    question: "Consider the species CN⁺, CN⁻, NO, and CN. Which one of these will have the highest bond order? [NEET 2018]",
    option_a: "NO",
    option_b: "CN⁻",
    option_c: "CN⁺",
    option_d: "CN",
    correct_option: "B",
    explanation: "Let us determine the total number of electrons and calculate the bond order for each species using Molecular Orbital Theory:\n1. CN⁺: 6 (C) + 7 (N) - 1 = 12 electrons.\nMO configuration: σ1s² σ*1s² σ2s² σ*2s² π2p_x² = π2p_y²\nN_b = 8, N_a = 4 => Bond order = (8 - 4) / 2 = 2.0\n2. CN (radical): 6 + 7 = 13 electrons.\nN_b = 9, N_a = 4 => Bond order = (9 - 4) / 2 = 2.5\n3. NO: 7 + 8 = 15 electrons.\nN_b = 10, N_a = 5 => Bond order = (10 - 5) / 2 = 2.5\n4. CN⁻: 6 + 7 + 1 = 14 electrons.\nIsoelectronic with N₂ and CO. N_b = 10, N_a = 4.\nBond order = (10 - 4) / 2 = 3.0\nComparing all bond orders:\nCN⁻ (3.0) > NO (2.5) = CN (2.5) > CN⁺ (2.0).\nTherefore, CN⁻ has the highest bond order.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following diatomic species has a bond order of 3.0?",
      option_a: "CN⁻",
      option_b: "CN",
      option_c: "CN⁺",
      option_d: "O₂",
      correct_option: "A",
      explanation: "CN⁻ has 14 electrons and a bond order of 3.0. Therefore, Option (A) is the correct answer."
    }
  }
];

