// ch61_part2.js
// Questions 30 to 59 (IDs 2104 down to 2075)
// Chapter 61: P-Block Elements (Chemistry)

module.exports = [
  {
    id: 2104,
    originalQuestion: {
      question: "In which of the following compounds does nitrogen exhibit the highest oxidation state? [AIPMT 2012 Prelims]",
      option_a: "N₂H₄",
      option_b: "NH₃",
      option_c: "N₃H",
      option_d: "NH₂OH",
      correct_option: "C",
      explanation: "Step 1: Calculate the oxidation state of nitrogen (x) in each given compound:\n- In hydrazine (N₂H₄):\n  2x + 4(+1) = 0  ⇒  2x = -4  ⇒  x = -2\n- In ammonia (NH₃):\n  x + 3(+1) = 0  ⇒  x = -3\n- In hydrazoic acid (N₃H):\n  3x + 1(+1) = 0  ⇒  3x = -1  ⇒  x = -1/3\n- In hydroxylamine (NH₂OH):\n  x + 3(+1) + 1(-2) = 0  ⇒  x + 1 = 0  ⇒  x = -1\n\nStep 2: Comparing the oxidation numbers:\n-1/3 > -1 > -2 > -3\n\nStep 3: Therefore, nitrogen exhibits its highest oxidation state (-1/3) in hydrazoic acid (N₃H).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In which of the following oxides of nitrogen does nitrogen exhibit the lowest positive oxidation state?",
      option_a: "N₂O",
      option_b: "NO",
      option_c: "NO₂",
      option_d: "N₂O₅",
      correct_option: "A",
      explanation: "Step 1: In N₂O: 2x - 2 = 0  ⇒  x = +1.\nStep 2: In NO: x = +2; in NO₂: x = +4; in N₂O₅: x = +5.\nStep 3: Lowest positive oxidation state is +1 in N₂O (nitrous oxide).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2103,
    originalQuestion: {
      question: "In which of the following arrangements is the given sequence not strictly according to the property indicated against it? [AIPMT 2012 Mains]",
      option_a: "HF < HCl < HBr < HI: Increasing acidic strength",
      option_b: "H₂O < H₂S < H₂Se < H₂Te: Increasing pKa values",
      option_c: "NH₃ < PH₃ < AsH₃ < SbH₃: Increasing acidic character",
      option_d: "CO₂ < SiO₂ < SnO₂ < PbO₂: Increasing oxidising power",
      correct_option: "B",
      explanation: "Step 1: Analyze each property trend:\n- Option A: Down Group 17, H-X bond length increases and bond dissociation enthalpy decreases, so acid dissociation constant (Ka) increases: HF < HCl < HBr < HI (strictly correct).\n- Option B: Down Group 16, H-E bond length increases and bond energy decreases, making proton donation easier. Thus, acidic strength (Ka) increases: H₂O < H₂S < H₂Se < H₂Te. Since pKa = -log Ka, a stronger acid has a LOWER pKa value. Therefore, the pKa values decrease down the group: H₂O > H₂S > H₂Se > H₂Te. The given sequence indicates increasing pKa values, which is incorrect.\n- Option C: Down Group 15 hydrides, E-H bond strength decreases, so acidic character increases: NH₃ < PH₃ < AsH₃ < SbH₃ (strictly correct).\n- Option D: Due to the inert pair effect, the stability of the +4 oxidation state decreases down Group 14 while +2 increases. Hence, oxidising power of EO₂ increases: CO₂ < SiO₂ < SnO₂ < PbO₂ (strictly correct).\n\nStep 2: Therefore, sequence B is not strictly according to the property indicated.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following properties of Group 15 hydrides follows the order NH₃ < PH₃ < AsH₃ < SbH₃ < BiH₃?",
      option_a: "Basic strength",
      option_b: "Thermal stability",
      option_c: "Reducing character",
      option_d: "Bond angle",
      correct_option: "C",
      explanation: "Step 1: Down Group 15, the M-H bond strength decreases due to increasing central atom size.\nStep 2: Ease of releasing hydrogen atoms increases, so reducing character increases from NH₃ to BiH₃.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2102,
    originalQuestion: {
      question: "Which of the following does not give oxygen on heating? [NEET 2013]",
      option_a: "K₂Cr₂O₇",
      option_b: "(NH₄)₂Cr₂O₇",
      option_c: "KClO₃",
      option_d: "Zn(ClO₃)₂",
      correct_option: "B",
      explanation: "Step 1: Write the thermal decomposition reactions for each salt:\n- K₂Cr₂O₇: 4K₂Cr₂O₇ → 4K₂CrO₄ + 2Cr₂O₃ + 3O₂↑ (liberates O₂)\n- (NH₄)₂Cr₂O₇: (NH₄)₂Cr₂O₇ → N₂↑ + Cr₂O₃ + 4H₂O (liberates nitrogen gas, N₂, NOT oxygen)\n- KClO₃: 2KClO₃ → 2KCl + 3O₂↑ (liberates O₂)\n- Zn(ClO₃)₂: Zn(ClO₃)₂ → ZnCl₂ + 3O₂↑ (liberates O₂)\n\nStep 2: Therefore, ammonium dichromate decomposes to give dinitrogen (N₂), chromium(III) oxide, and water vapour, without releasing oxygen gas.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following nitrates liberates nitrogen dioxide (brown gas) and oxygen on thermal decomposition?",
      option_a: "NaNO₃",
      option_b: "KNO₃",
      option_c: "Pb(NO₃)₂",
      option_d: "NH₄NO₃",
      correct_option: "C",
      explanation: "Step 1: 2Pb(NO₃)₂ → 2PbO + 4NO₂↑ + O₂↑ (liberates brown NO₂ and O₂).\nStep 2: Alkali metal nitrates like NaNO₃ decompose to give nitrite and O₂ (2NaNO₃ → 2NaNO₂ + O₂).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2101,
    originalQuestion: {
      question: "Which one of the following molecules contains no π bond? [NEET 2013]",
      option_a: "SO₂",
      option_b: "NO₂",
      option_c: "CO₂",
      option_d: "H₂O",
      correct_option: "D",
      explanation: "Step 1: Examine the chemical bonding in each molecule:\n- SO₂: Central sulphur forms two sigma bonds, one pπ-pπ bond, and one pπ-dπ bond with oxygen atoms (contains π bonds).\n- NO₂: Contains one N-O sigma bond, one N=O double bond (σ + π), and a delocalized π system (contains π bonds).\n- CO₂: Linear O=C=O molecule with two C-O sigma bonds and two C-O π bonds (contains two π bonds).\n- H₂O: Bent H-O-H molecule where oxygen forms two single O-H sigma (σ) bonds and possesses two lone pairs. It contains zero π bonds.\n\nStep 2: Therefore, H₂O contains no π bond.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following species has zero pi bonds and a regular tetrahedral geometry?",
      option_a: "SO₄²⁻",
      option_b: "ClO₄⁻",
      option_c: "NH₄⁺",
      option_d: "XeO₄",
      correct_option: "C",
      explanation: "Step 1: In ammonium ion (NH₄⁺), nitrogen forms 4 equivalent N-H sigma bonds (sp³ hybridized, no lone pairs, zero pi bonds).\nStep 2: SO₄²⁻, ClO₄⁻, and XeO₄ all contain multiple dπ-pπ double bonds.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2100,
    originalQuestion: {
      question: "Which is the strongest acid in the following? [NEET 2013]",
      option_a: "HClO₄",
      option_b: "H₂SO₃",
      option_c: "H₂SO₄",
      option_d: "HClO₃",
      correct_option: "A",
      explanation: "Step 1: The acidic strength of an oxoacid depends on the electronegativity and oxidation state of the central atom, as well as the resonance stabilization of its conjugate base:\n- In HClO₄ (perchloric acid), chlorine has its maximum oxidation state (+7).\n- The conjugate base is the perchlorate anion (ClO₄⁻), which has a symmetric tetrahedral geometry where the single negative charge is completely delocalized across four highly electronegative oxygen atoms over four equivalent resonance contributors.\n\nStep 2: This extraordinary delocalization makes ClO₄⁻ an exceptionally stable and weak conjugate base, rendering HClO₄ the strongest acid among all the given oxoacids (stronger than sulphuric acid, H₂SO₄).\n\nStep 3: Therefore, HClO₄ is the strongest acid.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which among the following oxoacids of chlorine is the weakest acid?",
      option_a: "HClO",
      option_b: "HClO₂",
      option_c: "HClO₃",
      option_d: "HClO₄",
      correct_option: "A",
      explanation: "Step 1: The acidic strength of oxoacids of the same halogen increases with increasing oxidation state: HClO (+1) < HClO₂ (+3) < HClO₃ (+5) < HClO₄ (+7).\nStep 2: In HClO, chlorine has the lowest oxidation state (+1), making it the weakest acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2099,
    originalQuestion: {
      question: "The basic structural unit of silicates is: [NEET 2013]",
      option_a: "SiO₃²⁻",
      option_b: "SiO₄²⁻",
      option_c: "SiO⁻",
      option_d: "SiO₄⁴⁻",
      correct_option: "D",
      explanation: "Step 1: In silicates, silicon has coordination number 4 and is surrounded by four oxygen atoms.\n\nStep 2: Silicon undergoes sp³ hybridization, forming four covalent Si-O single bonds directed toward the corners of a regular tetrahedron.\n\nStep 3: Since silicon has an oxidation state of +4 and four oxygens contribute 4 × (-2) = -8, the overall charge on the isolated tetrahedron is (+4 - 8) = -4.\n\nStep 4: Therefore, the fundamental structural unit of all silicates is the tetrahedral SiO₄⁴⁻ anion.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In pyrosilicates, how many oxygen atoms per SiO₄⁴⁻ tetrahedron are shared between two adjacent units?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "A",
      explanation: "Step 1: Pyrosilicates (island silicates such as thortveitite) contain Si₂O₇⁶⁻ units.\nStep 2: They are formed by sharing exactly one oxygen atom at one corner between two SiO₄⁴⁻ tetrahedra.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2098,
    originalQuestion: {
      question: "Which of these is not a monomer for a high-molecular-mass silicone polymer? [NEET 2013]",
      option_a: "Me₃SiCl",
      option_b: "PhSiCl₃",
      option_c: "MeSiCl₃",
      option_d: "Me₂SiCl₂",
      correct_option: "A",
      explanation: "Step 1: Silicone polymers are synthesized by the hydrolysis of alkyl- or aryl-substituted chlorosilanes followed by condensation polymerization:\n- Me₂SiCl₂ (difunctional): Hydrolysis gives Me₂Si(OH)₂, which polymerizes into straight-chain linear silicones of high molecular mass.\n- MeSiCl₃ and PhSiCl₃ (trifunctional): Hydrolysis gives RSi(OH)₃, which undergoes cross-linking polymerization to form high-molecular-mass complex 3D network silicones.\n- Me₃SiCl (monofunctional): Possesses only one chlorine atom. Upon hydrolysis, it forms trimethylsilanol, Me₃SiOH:\n  2Me₃SiOH → Me₃Si-O-SiMe₃ + H₂O\n\nStep 2: Since hexamethyldisiloxane has no further -OH groups for condensation, the polymerization stops immediately. Thus, Me₃SiCl acts as a chain terminator (chain stopper) and cannot form a high-molecular-mass polymer.\n\nStep 3: Therefore, Me₃SiCl is not a monomer for high-molecular-mass silicone polymers.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which chlorosilane on hydrolysis followed by condensation produces linear straight-chain silicone polymers?",
      option_a: "Me₃SiCl",
      option_b: "Me₂SiCl₂",
      option_c: "MeSiCl₃",
      option_d: "SiCl₄",
      correct_option: "B",
      explanation: "Step 1: Dimethyldichlorosilane (Me₂SiCl₂) is difunctional.\nStep 2: Hydrolysis produces dimethylsilanediol, Me₂Si(OH)₂, which condenses into linear chain polymers.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2097,
    originalQuestion: {
      question: "Which of the following structures is similar to graphite? [NEET 2013]",
      option_a: "B₄C",
      option_b: "B₂H₆",
      option_c: "BN",
      option_d: "B",
      correct_option: "C",
      explanation: "Step 1: Hexagonal boron nitride (h-BN) consists of planar sheets of alternating boron and nitrogen atoms arranged in six-membered hexagonal rings, very similar to the carbon sheets in graphite.\n\nStep 2: In h-BN, both boron and nitrogen are sp² hybridized. The adjacent planar layers are held together by weak van der Waals forces, which allows the layers to slip past each other, providing excellent lubricating properties similar to graphite.\n\nStep 3: Because of these identical physical and structural characteristics, hexagonal boron nitride is widely referred to as \"inorganic graphite\".\n\nStep 4: Therefore, BN has a structure similar to graphite.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Borazole (B₃N₃H₆) is known as 'inorganic benzene' because:",
      option_a: "It is an isomer of benzene",
      option_b: "It possesses a cyclic planar hexagonal ring with alternating B and N atoms and delocalized pi electrons",
      option_c: "It is manufactured directly from benzene",
      option_d: "It has the identical molar mass as benzene",
      correct_option: "B",
      explanation: "Step 1: Borazole (B₃N₃H₆) has a 6-membered planar ring with alternating boron and nitrogen atoms, each sp² hybridized.\nStep 2: It is isoelectronic and isostructural with benzene, earning it the title 'inorganic benzene'.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2096,
    originalQuestion: {
      question: "Identify the incorrect statement regarding the molecule XeO₄. [NEET 2013 Karnataka]",
      option_a: "XeO₄ molecule is square planar.",
      option_b: "There are four pπ-dπ bonds.",
      option_c: "There are four sp³-p sigma bonds.",
      option_d: "XeO₄ molecule is tetrahedral.",
      correct_option: "A",
      explanation: "Step 1: Determine the bonding and structure of xenon tetroxide (XeO₄):\n- Xenon (Xe) has 8 valence electrons.\n- Each of the four oxygen atoms forms a double bond (one σ bond + one π bond) with xenon.\n- Total bonds: 4 sigma (σ) bonds and 4 pi (π) bonds, with zero non-bonding lone pairs on xenon.\n\nStep 2: Hybridization of xenon:\nSteric number = 4 (σ bonds) + 0 (lone pairs) = 4  ⇒  sp³ hybridization.\nWith sp³ hybridization and no lone pairs, the geometry of XeO₄ is regular tetrahedral (statements C and D are correct).\n\nStep 3: Bonding nature:\n- The four σ bonds are formed by overlap of sp³ hybrid orbitals of Xe with 2p orbitals of O (sp³-p sigma bonds).\n- The four π bonds are formed by sideways overlap of 2p orbitals of O with vacant 5d orbitals of Xe (four pπ-dπ bonds) (statement B is correct).\n\nStep 4: Statement A claims that \"XeO₄ molecule is square planar\", which is completely false (XeF₄ is square planar, but XeO₄ is tetrahedral).\n\nTherefore, statement A is the incorrect statement.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the molecular geometry and hybridization of the central atom in XeF₄?",
      option_a: "Tetrahedral, sp³",
      option_b: "Square planar, sp³d²",
      option_c: "See-saw, sp³d",
      option_d: "Octahedral, sp³d²",
      correct_option: "B",
      explanation: "Step 1: XeF₄ has 4 bond pairs and 2 lone pairs on xenon (steric number = 6, sp³d² hybridization).\nStep 2: The two lone pairs occupy trans axial positions to minimize repulsion, yielding a square planar geometry.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2095,
    originalQuestion: {
      question: "Which statement is wrong? [NEET 2013 Karnataka]",
      option_a: "Beryl is an example of cyclic silicate.",
      option_b: "Mg₂SiO₄ is orthosilicate.",
      option_c: "The basic structural unit in silicates is the SiO₄ tetrahedron.",
      option_d: "Feldspars are not aluminosilicates.",
      correct_option: "D",
      explanation: "Step 1: Evaluate each statement regarding silicates:\n- Statement A: Beryl has formula Be₃Al₂(Si₆O₁₈), which contains a 6-membered cyclic silicate ring [Si₆O₁₈]¹²⁻ where two oxygen atoms per tetrahedron are shared (correct).\n- Statement B: Mg₂SiO₄ (forsterite) contains discrete, isolated SiO₄⁴⁻ tetrahedra, which defines an orthosilicate (correct).\n- Statement C: The tetrahedral SiO₄⁴⁻ unit is the fundamental building block of all silicates (correct).\n- Statement D: Feldspars (such as orthoclase, KAlSi₃O₈) are three-dimensional framework aluminosilicates where Al³⁺ replaces some Si⁴⁺ in the silica network. Therefore, the statement \"Feldspars are not aluminosilicates\" is false.\n\nStep 2: Therefore, statement D is the incorrect (wrong) statement.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following minerals is a chain silicate (pyroxene)?",
      option_a: "Beryl",
      option_b: "Diopside (CaMg(SiO₃)₂)",
      option_c: "Zircon (ZrSiO₄)",
      option_d: "Talc",
      correct_option: "B",
      explanation: "Step 1: Diopside, CaMg(SiO₃)₂, contains continuous single chains of (SiO₃²⁻)ₙ formed by sharing two oxygen atoms per tetrahedron.\nStep 2: Single chain silicates are known as pyroxenes.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2094,
    originalQuestion: {
      question: "The acidity of diprotic acids in aqueous solutions increases in the order: [AIPMT 2014]",
      option_a: "H₂S < H₂Se < H₂Te",
      option_b: "H₂Se < H₂S < H₂Te",
      option_c: "H₂Te < H₂S < H₂Se",
      option_d: "H₂Se < H₂Te < H₂S",
      correct_option: "A",
      explanation: "Step 1: The Group 16 hydrides (H₂S, H₂Se, H₂Te) act as diprotic acids in aqueous solution by dissociating in two steps:\nH₂E ⇌ H⁺ + HE⁻\nHE⁻ ⇌ H⁺ + E²⁻\n\nStep 2: The acidic strength depends primarily on the H-E bond dissociation enthalpy.\n\nStep 3: Down the group from S to Te, the atomic radius increases significantly (S < Se < Te). Consequently, the H-E bond length increases and the H-E bond dissociation energy decreases:\nH-S (363 kJ mol⁻¹) > H-Se (276 kJ mol⁻¹) > H-Te (238 kJ mol⁻¹)\n\nStep 4: Because the H-Te bond is the weakest and easiest to cleave heterolytically, H₂Te releases protons most readily in aqueous solution.\n\nStep 5: Therefore, the acidity increases in the order:\nH₂S < H₂Se < H₂Te\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following hydrides of Group 16 has the highest boiling point?",
      option_a: "H₂S",
      option_b: "H₂Se",
      option_c: "H₂Te",
      option_d: "H₂O",
      correct_option: "D",
      explanation: "Step 1: Due to the high electronegativity and small size of oxygen, H₂O exhibits extensive intermolecular hydrogen bonding.\nStep 2: This creates large molecular association, giving H₂O an anomalously high boiling point (373 K) compared to H₂S, H₂Se, and H₂Te.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 2093,
    originalQuestion: {
      question: "Nitrogen dioxide and sulphur dioxide have some properties in common. Which property is shown by one of these compounds but not by the other? [AIPMT 2015 Cancelled]",
      option_a: "Is soluble in water.",
      option_b: "Is used as a food preservative.",
      option_c: "Forms acid rain.",
      option_d: "Is a reducing agent.",
      correct_option: "B",
      explanation: "Step 1: Compare the properties of SO₂ and NO₂:\n- Both gases are soluble in water (SO₂ forms H₂SO₃; NO₂ forms HNO₂ + HNO₃) (property A is common).\n- Both contribute significantly to acid rain as atmospheric pollutants forming sulphurous/sulphuric and nitric acids (property C is common).\n- Both can act as reducing agents (in intermediate +4 oxidation states) and oxidising agents (property D is common).\n- Sulphur dioxide (SO₂) is widely used as a food preservative (anti-microbial agent and antioxidant in dried fruits, fruit juices, and winemaking) because of its harmless sulphite oxidation products at regulated low levels.\n- In sharp contrast, nitrogen dioxide (NO₂) is highly poisonous and corrosive; it is never used as a food preservative.\n\nStep 2: Therefore, being used as a food preservative is shown by SO₂ but not by NO₂.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following gases can act as both an oxidising and a reducing agent?",
      option_a: "SO₂",
      option_b: "SO₃",
      option_c: "H₂S",
      option_d: "CO₂",
      correct_option: "A",
      explanation: "Step 1: In SO₂, sulphur has an intermediate oxidation state of +4 (the oxidation range for sulphur is -2 to +6).\nStep 2: It can be oxidized to +6 (reducing agent) or reduced to 0 or -2 (oxidising agent).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2092,
    originalQuestion: {
      question: "The formation of the oxide ion O²⁻(g) from an oxygen atom requires first an exothermic and then an endothermic step: O(g) + e⁻ → O⁻(g); ΔfH° = −141 kJ mol⁻¹ O⁻(g) + e⁻ → O²⁻(g); ΔfH° = +780 kJ mol⁻¹ Thus, formation of O²⁻ in the gas phase is unfavourable even though O²⁻ is isoelectronic with neon. It is due to the fact that: [AIPMT 2015]",
      option_a: "O⁻ ion has comparatively smaller size than an oxygen atom.",
      option_b: "Oxygen is more electronegative.",
      option_c: "Addition of an electron to oxygen results in a larger ion.",
      option_d: "Electron repulsion outweighs the stability gained by achieving noble gas configuration.",
      correct_option: "D",
      explanation: "Step 1: When a neutral oxygen atom gains an electron to form the monovalent anion O⁻, the first electron gain enthalpy is exothermic (ΔegH₁ = -141 kJ mol⁻¹).\n\nStep 2: However, when a second electron is introduced into the O⁻ ion to achieve the neon configuration (O²⁻), the incoming negative electron experiences severe electrostatic repulsion from the existing electron cloud of the negative O⁻ ion.\n\nStep 3: Overcoming this strong inter-electronic electrostatic repulsion requires a substantial input of energy (ΔegH₂ = +780 kJ mol⁻¹).\n\nStep 4: This intense electron repulsion in the isolated gaseous state outweighs the thermodynamic stability gained by achieving a noble gas configuration.\n\nStep 5: Therefore, the net formation of O²⁻ in the gas phase is energetically unfavourable.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the oxide ion (O²⁻) common and stable in ionic solids despite the positive second electron gain enthalpy in gas phase?",
      option_a: "Small radius of oxygen",
      option_b: "The high lattice enthalpy of crystal lattice formation compensates for the endothermic second electron gain enthalpy",
      option_c: "Low ionization energy of non-metals",
      option_d: "High electronegativity of metals",
      correct_option: "B",
      explanation: "Step 1: In the solid state, cations and O²⁻ ions pack into an ionic lattice with high electrostatic attraction.\nStep 2: The very large lattice enthalpy released completely overcomes the energy absorbed during the formation of gaseous O²⁻ ions.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2091,
    originalQuestion: {
      question: "Which of the statements given below is incorrect? [AIPMT 2015]",
      option_a: "O₃ molecule is bent.",
      option_b: "ONF is isoelectronic with O₂N⁻.",
      option_c: "OF₂ is an oxide of fluorine.",
      option_d: "Cl₂O₇ is an anhydride of perchloric acid.",
      correct_option: "C",
      explanation: "Step 1: Analyze each statement:\n- Statement A: Ozone (O₃) has sp² hybridization on the central oxygen with one lone pair and two bond pairs, giving a bent angular shape (correct).\n- Statement B: Count total electrons:\n  In ONF: 8 (O) + 7 (N) + 9 (F) = 24 electrons.\n  In NO₂⁻: 7 (N) + 2×8 (O) + 1 (charge) = 24 electrons.\n  Both species have 24 electrons, so they are isoelectronic (correct).\n- Statement D: Perchloric acid (HClO₄) upon dehydration yields dichlorine heptoxide:\n  2HClO₄ - H₂O → Cl₂O₇.\n  Thus, Cl₂O₇ is the anhydride of perchloric acid (correct).\n- Statement C: In binary compounds of oxygen and fluorine, fluorine is more electronegative than oxygen (electronegativity: F = 4.0, O = 3.5). Therefore, oxygen has a positive oxidation state (+2 in OF₂), and the compound is named oxygen difluoride. It is a fluoride of oxygen, NOT an oxide of fluorine. Hence, statement C is incorrect.\n\nStep 2: Therefore, statement C is the incorrect statement.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the oxidation state of oxygen in OF₂ and O₂F₂ respectively?",
      option_a: "-2 and -1",
      option_b: "+2 and +1",
      option_c: "+1 and +2",
      option_d: "-1 and -2",
      correct_option: "B",
      explanation: "Step 1: Fluorine is always -1 in its compounds.\nStep 2: In OF₂: x + 2(-1) = 0  ⇒  x = +2.\nStep 3: In O₂F₂: 2x + 2(-1) = 0  ⇒  2x = +2  ⇒  x = +1.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2090,
    originalQuestion: {
      question: "The variation of the boiling points of the hydrogen halides is in the order HF > HI > HBr > HCl. What explains the higher boiling point of hydrogen fluoride? [AIPMT 2015]",
      option_a: "There is strong hydrogen bonding between HF molecules.",
      option_b: "The bond energy of HF molecules is greater than in other hydrogen halides.",
      option_c: "The effect of nuclear shielding is much reduced in fluorine, which polarises the HF molecule.",
      option_d: "The electronegativity of fluorine is much higher than that of other elements in the group.",
      correct_option: "A",
      explanation: "Step 1: The boiling points of hydrogen halides generally increase from HCl to HI (HCl < HBr < HI) due to increasing molecular size, polarizability, and London dispersion forces.\n\nStep 2: However, hydrogen fluoride (HF) has an abnormally high boiling point (293 K) that exceeds even HI.\n\nStep 3: This anomaly occurs because fluorine is the most electronegative element with a very small atomic radius, causing the H-F bond to be exceptionally polar.\n\nStep 4: This high polarity allows HF molecules to form very strong intermolecular hydrogen bonds (H-F···H-F), creating zigzag associated polymeric chains in liquid and solid phases.\n\nStep 5: Substantial thermal energy is required to break these intermolecular hydrogen bonds during vaporization, leading to the anomalously high boiling point of HF.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why does liquid HF exist as a zigzag chain in the solid and liquid states?",
      option_a: "Covalent cross-linking",
      option_b: "Intermolecular hydrogen bonding",
      option_c: "London dispersion forces",
      option_d: "Coordinate bonding",
      correct_option: "B",
      explanation: "Step 1: Strong electrostatic H···F hydrogen bonds connect neighboring HF molecules into zigzag chains (F-H···F angle is approx 120°).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2089,
    originalQuestion: {
      question: "The strong reducing behaviour of H₃PO₂ is due to: [AIPMT 2015]",
      option_a: "High electron gain enthalpy of phosphorus.",
      option_b: "High oxidation state of phosphorus.",
      option_c: "Presence of two -OH groups and one P-H bond.",
      option_d: "Presence of one -OH group and two P-H bonds.",
      correct_option: "D",
      explanation: "Step 1: Examine the chemical structure of hypophosphorous acid (phosphinic acid, H₃PO₂):\n- The central phosphorus atom is sp³ hybridized and bonded to:\n  - One double-bonded oxygen atom (P=O)\n  - One hydroxyl group (P-OH)\n  - Two directly bonded hydrogen atoms (two P-H bonds)\n\nStep 2: In oxoacids of phosphorus, hydrogen atoms directly bonded to phosphorus (P-H bonds) are readily oxidizable (they reduce other species, such as reducing AgNO₃ to metallic Ag).\n\nStep 3: Because H₃PO₂ contains two P-H bonds and one -OH group, it displays very strong reducing behaviour.\n\nStep 4: Therefore, the strong reducing behaviour is due to the presence of one -OH group and two P-H bonds.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the basicity (proticity) of hypophosphorous acid (H₃PO₂)?",
      option_a: "Monobasic (1)",
      option_b: "Dibasic (2)",
      option_c: "Tribasic (3)",
      option_d: "Neutral (0)",
      correct_option: "A",
      explanation: "Step 1: Basicity of an oxoacid of phosphorus is equal to the number of ionizable P-OH groups.\nStep 2: H₃PO₂ has only one P-OH group, so it ionizes to release only one H⁺ ion, making it a monobasic acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2088,
    originalQuestion: {
      question: "The stability of the +1 oxidation state among Al, Ga, In and Tl increases in the sequence: [AIPMT 2015]",
      option_a: "Al < Ga < In < Tl",
      option_b: "Tl < In < Ga < Al",
      option_c: "In < Tl < Ga < Al",
      option_d: "Ga < In < Al < Tl",
      correct_option: "A",
      explanation: "Step 1: In Group 13 elements (B, Al, Ga, In, Tl), the valence shell configuration is ns² np¹.\n\nStep 2: The elements exhibit two primary oxidation states: +3 (involving both s and p electrons) and +1 (involving only the p electron).\n\nStep 3: Down the group, intervening d and f orbitals (3d¹⁰ in Ga, 4d¹⁰ in In, and 4f¹⁴ 5d¹⁰ in Tl) have poor shielding effects on outer electrons. Consequently, the effective nuclear charge increases and tightly holds the valence s-electrons (ns² pair).\n\nStep 4: This reluctance of the valence s-electrons to participate in chemical bonding is called the \"inert pair effect\".\n\nStep 5: Due to the inert pair effect, the stability of the lower +1 oxidation state increases progressively down the group:\nAl < Ga < In < Tl\nFor thallium (Tl), the +1 oxidation state is predominantly stable (Tl⁺ is more stable than Tl³⁺).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why is thallium(I) chloride (TlCl) more stable than thallium(III) chloride (TlCl₃)?",
      option_a: "High electronegativity of thallium",
      option_b: "Inert pair effect stabilizes the +1 oxidation state over the +3 state in thallium",
      option_c: "TlCl is a covalent molecule",
      option_d: "High ionization enthalpy of chlorine",
      correct_option: "B",
      explanation: "Step 1: In thallium, the 6s² electrons are strongly held due to poor shielding by 4f¹⁴ electrons (inert pair effect).\nStep 2: Consequently, Tl(I) is thermodynamically far more stable than Tl(III), so TlCl is much more stable than TlCl₃.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2087,
    originalQuestion: {
      question: "Among the following, the correct order of acidity is: [NEET 2016 Phase 1]",
      option_a: "HClO₂ < HClO < HClO₃ < HClO₄",
      option_b: "HClO₄ < HClO₂ < HClO < HClO₃",
      option_c: "HClO₃ < HClO₄ < HClO₂ < HClO",
      option_d: "HClO < HClO₂ < HClO₃ < HClO₄",
      correct_option: "D",
      explanation: "Step 1: Examine the series of chlorine oxoacids:\n- HClO (hypochlorous acid, Cl in +1 state)\n- HClO₂ (chlorous acid, Cl in +3 state)\n- HClO₃ (chloric acid, Cl in +5 state)\n- HClO₄ (perchloric acid, Cl in +7 state)\n\nStep 2: As the oxidation state of chlorine increases from +1 to +7, the electronegativity and electron-withdrawing inductive effect of the central chlorine atom increase dramatically.\n\nStep 3: This stronger pull withdraws electron density from the O-H bond, weakening it and facilitating the release of a proton (H⁺).\n\nStep 4: Furthermore, the stability of the resulting conjugate base increases with the number of terminal oxygen atoms due to resonance delocalization:\n- ClO⁻ (1 oxygen, no resonance)\n- ClO₂⁻ (2 equivalent resonance structures)\n- ClO₃⁻ (3 equivalent resonance structures)\n- ClO₄⁻ (4 equivalent resonance structures)\n\nStep 5: Therefore, acidic strength increases in the order:\nHClO < HClO₂ < HClO₃ < HClO₄\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following conjugate bases of chlorine oxoacids is the most stable due to resonance?",
      option_a: "ClO⁻",
      option_b: "ClO₂⁻",
      option_c: "ClO₃⁻",
      option_d: "ClO₄⁻",
      correct_option: "D",
      explanation: "Step 1: The perchlorate ion (ClO₄⁻) has a symmetric tetrahedral structure with four equivalent Cl-O bonds.\nStep 2: The negative charge is delocalized over 4 resonance structures across all four oxygen atoms, providing the greatest resonance stabilization.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 2086,
    originalQuestion: {
      question: "When copper is heated with concentrated HNO₃, it produces: [NEET 2016 Phase 1]",
      option_a: "Cu(NO₃)₂, NO and NO₂",
      option_b: "Cu(NO₃)₂ and N₂O",
      option_c: "Cu(NO₃)₂ and NO₂",
      option_d: "Cu(NO₃)₂ and NO",
      correct_option: "C",
      explanation: "Step 1: Concentrated nitric acid is a powerful oxidising agent.\n\nStep 2: When copper metal is heated with concentrated HNO₃, it is oxidised to cupric nitrate [Cu(NO₃)₂], while the concentrated nitric acid is reduced to nitrogen dioxide gas (NO₂, reddish brown fumes):\nCu + 4HNO₃(conc.) → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O\n\nStep 3: (Note: When copper reacts with dilute HNO₃, nitric oxide (NO) is produced: 3Cu + 8HNO₃(dil.) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O).\n\nStep 4: Therefore, with concentrated HNO₃, the reaction produces Cu(NO₃)₂ and NO₂.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which gas is evolved when copper reacts with dilute nitric acid?",
      option_a: "NO₂",
      option_b: "NO",
      option_c: "N₂O",
      option_d: "N₂",
      correct_option: "B",
      explanation: "Step 1: 3Cu + 8HNO₃(dilute) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O.\nStep 2: Colourless nitric oxide (NO) gas is evolved with dilute HNO₃.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2085,
    originalQuestion: {
      question: "Which one of the following orders is correct for the bond dissociation enthalpy of halogen molecules? [NEET 2016 Phase 1]",
      option_a: "Br₂ > I₂ > F₂ > Cl₂",
      option_b: "F₂ > Cl₂ > Br₂ > I₂",
      option_c: "I₂ > Br₂ > Cl₂ > F₂",
      option_d: "Cl₂ > Br₂ > F₂ > I₂",
      correct_option: "D",
      explanation: "Step 1: Generally, bond dissociation enthalpy decreases as atomic size and bond length increase down a group.\n\nStep 2: However, in the fluorine molecule (F₂), the two fluorine atoms are extremely small (inter-nuclear distance is only 142 pm). The three non-bonding lone pairs on each fluorine atom are confined in a very small volume, resulting in severe electrostatic lone pair-lone pair repulsions.\n\nStep 3: These strong inter-electronic repulsions weaken the F-F covalent bond, causing its bond dissociation enthalpy to drop significantly below those of Cl₂ and Br₂.\n\nStep 4: Experimental bond dissociation enthalpies:\n- Cl₂: 242.6 kJ mol⁻¹\n- Br₂: 192.8 kJ mol⁻¹\n- F₂: 158.8 kJ mol⁻¹\n- I₂: 151.1 kJ mol⁻¹\n\nStep 5: Therefore, the correct order is:\nCl₂ > Br₂ > F₂ > I₂\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the bond dissociation energy of F₂ lower than that of Cl₂?",
      option_a: "Fluorine has larger atomic radius",
      option_b: "High inter-electronic repulsions among non-bonding lone pairs in the small F₂ molecule",
      option_c: "Presence of empty d-orbitals in fluorine",
      option_d: "Fluorine is less electronegative than chlorine",
      correct_option: "B",
      explanation: "Step 1: In F₂, the short bond length causes the compact lone pairs on the two fluorine atoms to repel each other strongly.\nStep 2: This lone pair repulsion weakens the F-F single bond relative to Cl₂.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2084,
    originalQuestion: {
      question: "Which is the correct statement for the given acids? [NEET 2016 Phase 1]",
      option_a: "Phosphinic acid is a monoprotic acid while phosphonic acid is a diprotic acid.",
      option_b: "Phosphinic acid is a diprotic acid while phosphonic acid is a monoprotic acid.",
      option_c: "Both are diprotic acids.",
      option_d: "Both are triprotic acids.",
      correct_option: "A",
      explanation: "Step 1: Determine the structures of phosphinic acid and phosphonic acid:\n- Phosphinic acid (hypophosphorous acid, H₃PO₂):\n  Has one P=O bond, one P-OH bond, and two P-H bonds.\n  Since only hydrogens attached directly to electronegative oxygen (P-OH) are ionizable, it releases only one proton (H⁺). Hence, phosphinic acid is a monoprotic (monobasic) acid.\n- Phosphonic acid (orthophosphorous acid, H₃PO₃):\n  Has one P=O bond, two P-OH bonds, and one P-H bond.\n  It contains two ionizable P-OH protons, releasing two H⁺ ions. Hence, phosphonic acid is a diprotic (dibasic) acid.\n\nStep 2: Therefore, statement A correctly describes the proticity of both acids.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the oxidation state of phosphorus in phosphinic acid and phosphonic acid, respectively?",
      option_a: "+1 and +3",
      option_b: "+3 and +5",
      option_c: "+1 and +5",
      option_d: "+3 and +1",
      correct_option: "A",
      explanation: "Step 1: In phosphinic acid (H₃PO₂): 3(+1) + x + 2(-2) = 0  ⇒  x = +1.\nStep 2: In phosphonic acid (H₃PO₃): 3(+1) + x + 3(-2) = 0  ⇒  x = +3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2083,
    originalQuestion: {
      question: "Match the compounds in Column I with the hybridisation and shape given in Column II and mark the correct option. Column I: (A) XeF₆ (B) XeO₃ (C) XeOF₄ (D) XeF₄ Column II: (i) Distorted octahedral (ii) Square planar (iii) Pyramidal (iv) Square pyramidal [NEET 2016 Phase 1]",
      option_a: "(A)-(iv), (B)-(iii), (C)-(i), (D)-(ii)",
      option_b: "(A)-(iv), (B)-(i), (C)-(ii), (D)-(iii)",
      option_c: "(A)-(i), (B)-(iii), (C)-(iv), (D)-(ii)",
      option_d: "(A)-(i), (B)-(ii), (C)-(iv), (D)-(iii)",
      correct_option: "C",
      explanation: "Step 1: Apply VSEPR theory to find the hybridization and shape of each xenon compound:\n- (A) XeF₆: Xenon has 8 valence electrons; forms 6 Xe-F bonds and has 1 lone pair. Steric number = 6 + 1 = 7  ⇒  sp³d³ hybridization, distorted octahedral shape  ⇒  (i)\n- (B) XeO₃: Forms 3 Xe=O double bonds and has 1 lone pair. Steric number = 3 + 1 = 4  ⇒  sp³ hybridization, pyramidal shape  ⇒  (iii)\n- (C) XeOF₄: Forms 1 Xe=O double bond, 4 Xe-F bonds, and has 1 lone pair. Steric number = 5 + 1 = 6  ⇒  sp³d² hybridization, square pyramidal shape  ⇒  (iv)\n- (D) XeF₄: Forms 4 Xe-F bonds and has 2 lone pairs. Steric number = 4 + 2 = 6  ⇒  sp³d² hybridization, square planar shape  ⇒  (ii)\n\nStep 2: Combining the matches gives:\n(A)-(i), (B)-(iii), (C)-(iv), (D)-(ii)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the molecular geometry and hybridization of xenon difluoride (XeF₂)?",
      option_a: "Bent, sp³",
      option_b: "Linear, sp³d",
      option_c: "T-shaped, sp³d",
      option_d: "Linear, sp³",
      correct_option: "B",
      explanation: "Step 1: In XeF₂, xenon has 2 bond pairs and 3 lone pairs (steric number = 5, sp³d hybridization).\nStep 2: The three lone pairs occupy equatorial positions, giving a linear geometry.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2082,
    originalQuestion: {
      question: "AlF₃ is soluble in HF only in the presence of KF. This is due to the formation of: [NEET 2016 Phase 2]",
      option_a: "K₃[AlF₃H₃]",
      option_b: "K₃[AlF₆]",
      option_c: "AlH₃",
      option_d: "K[AlF₃H]",
      correct_option: "B",
      explanation: "Step 1: Aluminium trifluoride (AlF₃) is an ionic solid with a very high crystal lattice energy. Liquid HF is a non-polarising, poor coordinating solvent, so AlF₃ is virtually insoluble in pure anhydrous HF.\n\nStep 2: When potassium fluoride (KF) is added, it dissociates completely into K⁺ and F⁻ ions in the solution.\n\nStep 3: The fluoride ions (F⁻) act as strong Lewis bases and coordinate with aluminium (which possesses vacant 3d orbitals to expand its octet), forming the soluble complex potassium hexafluoroaluminate:\nAlF₃ + 3KF → K₃[AlF₆]\n\nStep 4: Therefore, the solubility of AlF₃ in HF in the presence of KF is due to the formation of K₃[AlF₆].\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When BF₃ is treated with KF, which soluble complex is formed?",
      option_a: "K[BF₄]",
      option_b: "K₃[BF₆]",
      option_c: "K₂[BF₅]",
      option_d: "K[BF₃]",
      correct_option: "A",
      explanation: "Step 1: Boron belongs to the second period and lacks d-orbitals, restricting its maximum covalency to 4.\nStep 2: BF₃ + KF → K[BF₄] (potassium tetrafluoroborate).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2081,
    originalQuestion: {
      question: "Boric acid is an acid because its molecule: [NEET 2016 Phase 2]",
      option_a: "Contains a replaceable H⁺ ion.",
      option_b: "Gives up a proton.",
      option_c: "Accepts OH⁻ from water, releasing a proton.",
      option_d: "Combines with a proton from a water molecule.",
      correct_option: "C",
      explanation: "Step 1: Boric acid, B(OH)₃ or H₃BO₃, is not a protic acid (it does not donate a proton from its own molecule).\n\nStep 2: The central boron atom in B(OH)₃ has only 6 valence electrons (an electron sextet), making it an electron-deficient Lewis acid.\n\nStep 3: In aqueous solution, it accepts a pair of electrons from the hydroxyl ion (OH⁻) of a water molecule to complete its octet, forming the tetrahedral tetrahydroxoborate anion [B(OH)₄]⁻ and releasing a proton (hydronium ion, H₃O⁺):\nB(OH)₃ + 2H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺\n\nStep 4: Therefore, boric acid acts as an acid because it accepts an OH⁻ ion from water, thereby releasing a proton.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Why does the addition of cis-diols (like glycerol or mannitol) make boric acid behave as a strong monobasic acid?",
      option_a: "It donates protons directly to boric acid",
      option_b: "It forms a stable cyclic chelate complex with [B(OH)₄]⁻, shifting the dissociation equilibrium forward",
      option_c: "It dehydrates boric acid to boron trioxide",
      option_d: "It oxidises boric acid",
      correct_option: "B",
      explanation: "Step 1: Cis-diols react with the [B(OH)₄]⁻ ion to form very stable, strain-free bicyclic chelate complexes.\nStep 2: This removes [B(OH)₄]⁻ from the equilibrium, driving the dissociation to completion.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2080,
    originalQuestion: {
      question: "In which pair of ions do both species contain an S-S bond? [NEET 2017]",
      option_a: "S₄O₆²⁻, S₂O₃²⁻",
      option_b: "S₂O₇²⁻, S₂O₈²⁻",
      option_c: "S₄O₆²⁻, S₂O₇²⁻",
      option_d: "S₂O₇²⁻, S₂O₃²⁻",
      correct_option: "A",
      explanation: "Step 1: Examine the chemical structures of each sulphur oxoanion:\n- Tetrathionate ion (S₄O₆²⁻): Has the structure ⁻O₃S-S-S-SO₃⁻, containing a chain of direct sulphur-sulphur (S-S) bonds.\n- Thiosulphate ion (S₂O₃²⁻): Has a central sulphur atom bonded to three oxygen atoms and one terminal sulphur atom via an S=S coordinate/double bond, containing an S-S bond.\n- Pyrosulphate ion (S₂O₇²⁻): Has the structure ⁻O₃S-O-SO₃⁻, containing an oxygen-bridged (S-O-S) linkage with no S-S bond.\n- Peroxodisulphate ion (S₂O₈²⁻): Has the structure ⁻O₃S-O-O-SO₃⁻, containing a peroxo (-O-O-) bridge with no S-S bond.\n\nStep 2: Therefore, both species in the pair S₄O₆²⁻ and S₂O₃²⁻ contain an S-S bond.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following oxoacids of sulphur contains an -S-O-S- bridging bond?",
      option_a: "H₂S₂O₇ (Pyrosulphuric acid)",
      option_b: "H₂S₂O₈ (Peroxodisulphuric acid)",
      option_c: "H₂S₄O₆ (Tetrathionic acid)",
      option_d: "H₂SO₄ (Sulphuric acid)",
      correct_option: "A",
      explanation: "Step 1: Pyrosulphuric acid (oleum, H₂S₂O₇) consists of two SO₃ units joined through a bridging oxygen atom (HO-SO₂-O-SO₂-OH).\nStep 2: Thus, it contains an S-O-S bridge.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2079,
    originalQuestion: {
      question: "Match the interhalogen compounds of Column I with the geometry in Column II and assign the correct code. Column I: (A) XX′ (B) XX₃′ (C) XX₅′ (D) XX₇ Column II: (i) T-shape (ii) Pentagonal bipyramidal (iii) Linear (iv) Square pyramidal (v) Tetrahedral [NEET 2017]",
      option_a: "(A)-(iii), (B)-(i), (C)-(iv), (D)-(ii)",
      option_b: "(A)-(v), (B)-(iv), (C)-(iii), (D)-(ii)",
      option_c: "(A)-(iv), (B)-(iii), (C)-(ii), (D)-(i)",
      option_d: "(A)-(iii), (B)-(iv), (C)-(i), (D)-(ii)",
      correct_option: "A",
      explanation: "Step 1: Determine the geometry of each interhalogen class using VSEPR theory:\n- (A) XX′ (e.g., ClF, BrF): Diatomic molecule with 1 bond pair and 3 lone pairs on the central halogen  ⇒  linear geometry  ⇒  (iii)\n- (B) XX₃′ (e.g., ClF₃, BrF₃): Central halogen has 3 bond pairs and 2 lone pairs in equatorial positions. Steric number = 5, sp³d hybridization  ⇒  bent T-shape  ⇒  (i)\n- (C) XX₅′ (e.g., BrF₅, IF₅): Central halogen has 5 bond pairs and 1 lone pair. Steric number = 6, sp³d² hybridization  ⇒  square pyramidal  ⇒  (iv)\n- (D) XX₇ (e.g., IF₇): Central halogen has 7 bond pairs and 0 lone pairs. Steric number = 7, sp³d³ hybridization  ⇒  pentagonal bipyramidal  ⇒  (ii)\n\nStep 2: Combining the matches gives:\n(A)-(iii), (B)-(i), (C)-(iv), (D)-(ii)\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the molecular geometry and hybridization of the central atom in ClF₃?",
      option_a: "Trigonal planar, sp²",
      option_b: "T-shaped, sp³d",
      option_c: "Trigonal bipyramidal, sp³d",
      option_d: "See-saw, sp³d",
      correct_option: "B",
      explanation: "Step 1: In ClF₃, chlorine has 7 valence electrons, forms 3 single bonds with fluorine, leaving 2 lone pairs.\nStep 2: Steric number = 3 + 2 = 5 (sp³d hybridization). The two lone pairs occupy equatorial positions, producing a T-shaped geometry.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2078,
    originalQuestion: {
      question: "It is because of the inability of ns² electrons of the valence shell to participate in bonding that: [NEET 2017]",
      option_a: "Sn²⁺ is oxidising while Pb⁴⁺ is reducing.",
      option_b: "Sn²⁺ and Pb²⁺ are both oxidising and reducing.",
      option_c: "Sn⁴⁺ is reducing while Pb⁴⁺ is oxidising.",
      option_d: "Sn²⁺ is reducing while Pb⁴⁺ is oxidising.",
      correct_option: "D",
      explanation: "Step 1: Group 14 elements (C, Si, Ge, Sn, Pb) exhibit oxidation states of +4 and +2.\n\nStep 2: Due to the inert pair effect, the stability of the lower +2 oxidation state increases down the group, while the stability of the higher +4 oxidation state decreases:\n- For tin (Sn): The +4 oxidation state is more stable than +2. Therefore, Sn²⁺ readily loses two electrons to become Sn⁴⁺, acting as a powerful reducing agent.\n- For lead (Pb): The intervening 4f¹⁴ and 5d¹⁰ electrons cause very poor shielding, so the 6s² electron pair is held extremely tightly by the high effective nuclear charge. Thus, Pb²⁺ is far more stable than Pb⁴⁺. Consequently, Pb⁴⁺ readily gains two electrons to reduce to Pb²⁺, acting as a powerful oxidising agent.\n\nStep 3: Therefore, Sn²⁺ is reducing while Pb⁴⁺ is oxidising.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following compounds of lead acts as a strong oxidising agent?",
      option_a: "PbO",
      option_b: "PbCl₂",
      option_c: "PbO₂",
      option_d: "PbSO₄",
      correct_option: "C",
      explanation: "Step 1: In PbO₂, lead is in the +4 oxidation state.\nStep 2: Because Pb²⁺ is much more stable than Pb⁴⁺ due to the inert pair effect, PbO₂ readily gains electrons, acting as a strong oxidising agent.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2077,
    originalQuestion: {
      question: "Which of the following statements is not true for halogens? [NEET 2018]",
      option_a: "All are oxidising agents.",
      option_b: "All form monobasic oxyacids.",
      option_c: "All except fluorine show positive oxidation states.",
      option_d: "Chlorine has the highest electron-gain enthalpy.",
      correct_option: "B",
      explanation: "Step 1: Evaluate each statement regarding halogens:\n- Statement A: All halogens have high electron affinities and readily accept electrons to achieve a noble gas configuration, acting as oxidising agents (F₂ > Cl₂ > Br₂ > I₂) (true).\n- Statement C: Fluorine is the most electronegative element and has no d-orbitals, so it never shows positive oxidation states. Other halogens (Cl, Br, I) possess vacant d-orbitals and exhibit +1, +3, +5, and +7 oxidation states (true).\n- Statement D: Chlorine has the highest negative electron gain enthalpy (-349 kJ mol⁻¹) in the periodic table, higher than fluorine (-328 kJ mol⁻¹) due to lower inter-electronic repulsion in chlorine's larger 3p subshell (true).\n- Statement B: Fluorine forms only one unstable oxoacid, HOF (hypofluorous acid), in which fluorine formally has an oxidation state of −1 (oxygen is +). Chlorine, bromine, and iodine form a variety of stable oxoacids (HOX, HXO₂, HXO₃, HXO₄). Because fluorine does not form the characteristic series of halogen oxyacids, statement B is not true in the context of halogen chemistry.\n\nStep 2: Therefore, statement B is the statement that is not true.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why does fluorine form only one oxoacid (HOF) while other halogens form multiple oxoacids?",
      option_a: "Fluorine is a gas",
      option_b: "High electronegativity and absence of d-orbitals in the valence shell of fluorine",
      option_c: "Fluorine has high electron gain enthalpy",
      option_d: "F-F bond dissociation energy is very high",
      correct_option: "B",
      explanation: "Step 1: Fluorine belongs to period 2 and lacks d-orbitals, preventing it from expanding its octet to form higher oxoacids (like HFO₂, HFO₃, HFO₄).\nStep 2: Its extreme electronegativity also prevents positive oxidation states.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2076,
    originalQuestion: {
      question: "Which one of the following elements is unable to form an MF₆³⁻ ion? [NEET 2018]",
      option_a: "Ga",
      option_b: "Al",
      option_c: "B",
      option_d: "In",
      correct_option: "C",
      explanation: "Step 1: Boron belongs to the second period of the periodic table with atomic number 5 (valence electronic configuration 2s² 2p¹).\n\nStep 2: In the n = 2 quantum shell, there are only four atomic orbitals available: one 2s orbital and three 2p orbitals. There are no 2d orbitals.\n\nStep 3: Consequently, boron can accommodate a maximum of four electron pairs (8 electrons) in its valence shell, strictly limiting its maximum covalency to four (as seen in [BF₄]⁻).\n\nStep 4: It cannot expand its coordination sphere to 6 to form the octahedral [BF₆]³⁻ complex ion.\n\nStep 5: In contrast, Al, Ga, and In belong to period 3 and higher, possessing vacant d-orbitals that allow them to expand their covalency to 6 and readily form octahedral MF₆³⁻ ions (e.g., [AlF₆]³⁻, [GaF₆]³⁻, [InF₆]³⁻).\n\nStep 6: Therefore, Boron (B) is unable to form an MF₆³⁻ ion.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the maximum covalency of boron in its compounds?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "6",
      correct_option: "C",
      explanation: "Step 1: Boron has only four valence orbitals (one 2s and three 2p) in its second shell.\nStep 2: Because it lacks d-orbitals, its maximum covalency is restricted to 4.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2075,
    originalQuestion: {
      question: "Match the xenon compounds in Column I with their structures in Column II and assign the correct code. Column I: (a) XeF₄ (b) XeF₆ (c) XeOF₄ (d) XeO₃ Column II: (i) Pyramidal (ii) Square planar (iii) Distorted octahedral (iv) Square pyramidal [NEET 2019]",
      option_a: "(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)",
      option_b: "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)",
      option_c: "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      option_d: "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      correct_option: "D",
      explanation: "Step 1: Determine the geometry of each xenon compound:\n- (a) XeF₄: 4 Xe-F bond pairs and 2 lone pairs on Xe. Steric number = 6  ⇒  sp³d² hybridization, square planar shape  ⇒  (ii)\n- (b) XeF₆: 6 Xe-F bond pairs and 1 lone pair on Xe. Steric number = 7  ⇒  sp³d³ hybridization, distorted octahedral shape  ⇒  (iii)\n- (c) XeOF₄: 1 Xe=O double bond, 4 Xe-F bonds, and 1 lone pair on Xe. Steric number = 6  ⇒  sp³d² hybridization, square pyramidal shape  ⇒  (iv)\n- (d) XeO₃: 3 Xe=O double bonds and 1 lone pair on Xe. Steric number = 4  ⇒  sp³ hybridization, pyramidal shape  ⇒  (i)\n\nStep 2: Combining the matches gives:\n(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following xenon compounds has a trigonal pyramidal shape?",
      option_a: "XeO₃",
      option_b: "XeO₄",
      option_c: "XeF₄",
      option_d: "XeF₂",
      correct_option: "A",
      explanation: "Step 1: XeO₃ has 3 bonding pairs and 1 lone pair on xenon (sp³ hybridization).\nStep 2: Its molecular geometry is trigonal pyramidal.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];
