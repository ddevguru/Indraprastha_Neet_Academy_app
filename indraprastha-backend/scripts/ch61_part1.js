// ch61_part1.js
// Questions 0 to 29 (IDs 2134 to 2105)
// Chapter 61: P-Block Elements (Chemistry)

module.exports = [
  {
    id: 2134,
    originalQuestion: {
      question: "Which compound is electron deficient? [AIPMT 2000]",
      option_a: "BeCl₂",
      option_b: "BCl₃",
      option_c: "CCl₄",
      option_d: "PCl₅",
      correct_option: "B",
      explanation: "Step 1: An electron-deficient molecule is one in which the central atom does not possess an octet of electrons (fewer than 8 valence electrons) in its valence shell after sharing.\n\nStep 2: In BCl₃, Boron belongs to Group 13 with 3 valence electrons. It forms three covalent bonds with three chlorine atoms:\nValence electrons around B = 3 + 3 = 6 electrons (an incomplete octet / electron sextet).\n\nStep 3: In CCl₄, carbon has 8 electrons (complete octet). In PCl₅, phosphorus has 10 valence electrons (expanded octet / hypervalent). In solid BeCl₂, beryllium forms polymeric chains to achieve coordination number 4.\n\nStep 4: Therefore, BCl₃ is a classic monomeric electron-deficient Lewis acid.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following Group 13 halides behaves as an electron-deficient Lewis acid?",
      option_a: "BF₃",
      option_b: "CF₄",
      option_c: "NF₃",
      option_d: "OF₂",
      correct_option: "A",
      explanation: "Step 1: In BF₃, the central boron atom is surrounded by only 6 valence electrons.\nStep 2: Having an incomplete octet, it readily accepts an electron pair to act as a Lewis acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2133,
    originalQuestion: {
      question: "Which of the following statements is true? [AIPMT 2002]",
      option_a: "Silicon exhibits a coordination number of 4 in its compounds.",
      option_b: "Bond energy of F₂ is less than that of Cl₂.",
      option_c: "Mn(III) oxidation state is more stable than Mn(II) in the aqueous state.",
      option_d: "Elements of Group 15 show only +3 and +5 oxidation states.",
      correct_option: "B",
      explanation: "Step 1: The bond dissociation enthalpy of F₂ (158.8 kJ/mol) is significantly lower than that of Cl₂ (242.6 kJ/mol) and Br₂ (192.8 kJ/mol).\nThis anomalous weakness of the F-F single bond is due to the extremely small size of fluorine atoms, which causes exceptionally high interelectronic repulsions between the non-bonding lone pairs on adjacent fluorine atoms.\nThus, statement B is true.\n\nStep 2: Silicon can expand its octet using vacant 3d orbitals to show a coordination number of 6 (e.g., [SiF₆]²⁻), so statement A is false.\n\nStep 3: Mn(II) has a half-filled 3d⁵ configuration and is more stable than Mn(III) (3d⁴), so statement C is false.\n\nStep 4: Group 15 elements show oxidation states from -3 to +5 (e.g., nitrogen shows all states from -3 to +5), so statement D is false.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The bond dissociation enthalpy of halogen molecules follows the order:",
      option_a: "Cl₂ > Br₂ > F₂ > I₂",
      option_b: "F₂ > Cl₂ > Br₂ > I₂",
      option_c: "Cl₂ > F₂ > Br₂ > I₂",
      option_d: "I₂ > Br₂ > Cl₂ > F₂",
      correct_option: "A",
      explanation: "Step 1: Cl₂ has the highest bond dissociation enthalpy (242.6 kJ/mol), followed by Br₂ (192.8 kJ/mol).\nStep 2: Due to large lone pair-lone pair repulsions in the compact F₂ molecule, F₂ (158.8 kJ/mol) is weaker than Br₂ but stronger than I₂ (151.1 kJ/mol).\nStep 3: The correct order is Cl₂ > Br₂ > F₂ > I₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2132,
    originalQuestion: {
      question: "Which one of the following compounds is not a protonic acid? [AIPMT 2003]",
      option_a: "B(OH)₃",
      option_b: "PO(OH)₃",
      option_c: "SO(OH)₂",
      option_d: "SO₂(OH)₂",
      correct_option: "A",
      explanation: "Step 1: A protonic acid is a substance that donates its own H⁺ (proton) when dissolved in water (Arrhenius/Brønsted acid).\n\nStep 2: B(OH)₃ (orthoboric acid, H₃BO₃) is not a protonic acid because it does not ionize by giving its own proton.\n\nStep 3: Instead, B(OH)₃ acts as a monobasic Lewis acid by accepting an OH⁻ ion from a water molecule:\nB(OH)₃ + 2H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺\n\nStep 4: The other compounds (PO(OH)₃ = H₃PO₄, SO(OH)₂ = H₂SO₃, SO₂(OH)₂ = H₂SO₄) are all polybasic protonic acids that donate their own protons.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Orthoboric acid H₃BO₃ acts as an acid in aqueous solution because it:",
      option_a: "Accepts OH⁻ from water and releases H⁺",
      option_b: "Donates its own proton directly",
      option_c: "Dissociates into BO₃³⁻ and 3H⁺",
      option_d: "Accepts a proton from water",
      correct_option: "A",
      explanation: "Step 1: Boron has an incomplete octet (6 valence electrons in B(OH)₃).\nStep 2: It accepts an electron pair from the oxygen of OH⁻ from water: B(OH)₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺.\nStep 3: Thus, it is a monobasic Lewis acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2131,
    originalQuestion: {
      question: "Which one of the following statements is not true? [AIPMT 2003]",
      option_a: "Among halide ions, iodide is the most powerful reducing agent.",
      option_b: "Fluorine is the only halogen that does not show a variable oxidation state.",
      option_c: "HOCl is a stronger acid than HOBr.",
      option_d: "HF is a stronger acid than HCl.",
      correct_option: "D",
      explanation: "Step 1: The acidic strength of hydrogen halides in aqueous solution follows the order:\nHF < HCl < HBr < HI\n\nStep 2: This trend is governed by H-X bond dissociation enthalpy, which decreases down the group from H-F to H-I as the halogen size increases (H-F bond is extremely strong, Δ_dissH = 574 kJ/mol, while H-Cl is 432 kJ/mol).\n\nStep 3: Because of the exceptionally high bond dissociation energy of H-F, HF is a weak acid and significantly weaker than HCl. Hence, statement D (\"HF is a stronger acid than HCl\") is not true.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The correct increasing order of acidic strength among the halogen acids is:",
      option_a: "HF < HCl < HBr < HI",
      option_b: "HI < HBr < HCl < HF",
      option_c: "HCl < HBr < HI < HF",
      option_d: "HF < HBr < HCl < HI",
      correct_option: "A",
      explanation: "Step 1: As halogen size increases down Group 17, H-X bond length increases and bond dissociation enthalpy decreases.\nStep 2: Proton release becomes easier from HF to HI, so acidic strength increases in the order HF < HCl < HBr < HI.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2130,
    originalQuestion: {
      question: "Among K, Ca, Fe and Zn, the element which can form more than one binary compound with chlorine is: [AIPMT 2004]",
      option_a: "Fe",
      option_b: "Zn",
      option_c: "K",
      option_d: "Ca",
      correct_option: "A",
      explanation: "Step 1: Potassium (K, Group 1) exhibits only the +1 oxidation state and forms only KCl.\nCalcium (Ca, Group 2) exhibits only the +2 oxidation state and forms only CaCl₂.\nZinc (Zn, d¹⁰ configuration) exhibits only the +2 oxidation state and forms only ZnCl₂.\n\nStep 2: Iron (Fe) is a transition element with valence shell configuration 3d⁶ 4s². It exhibits variable oxidation states of +2 and +3.\n\nStep 3: Therefore, iron forms two distinct stable binary chlorides:\nIron(II) chloride (FeCl₂) and Iron(III) chloride (FeCl₃).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following elements forms two stable binary oxides corresponding to +2 and +3 oxidation states?",
      option_a: "Fe",
      option_b: "Al",
      option_c: "Mg",
      option_d: "Na",
      correct_option: "A",
      explanation: "Step 1: Iron forms FeO (+2 state) and Fe₂O₃ (+3 state).\nStep 2: Al forms only Al₂O₃ (+3), Mg forms MgO (+2), and Na forms Na₂O (+1).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2129,
    originalQuestion: {
      question: "Which one of the following statements about zeolites is false? [AIPMT 2004]",
      option_a: "They are used as cation exchangers.",
      option_b: "They have an open structure that enables them to take up small molecules.",
      option_c: "Zeolites are aluminosilicates having a three-dimensional network.",
      option_d: "Some of the SiO₄⁴⁻ units are replaced by AlO₄⁵⁻ and AlO₆⁹⁻ ions in zeolites.",
      correct_option: "D",
      explanation: "Step 1: Zeolites are microporous, crystalline aluminosilicates with a rigid 3D framework formed by corner-sharing tetrahedral units.\n\nStep 2: In zeolites, some Si⁴⁺ atoms in the SiO₄⁴⁻ tetrahedra are isomorphously replaced by Al³⁺ atoms to form AlO₄⁵⁻ tetrahedral units.\n\nStep 3: Aluminium in the zeolite framework adopts strictly tetrahedral 4-coordination (AlO₄⁵⁻). It does not adopt 6-coordination (AlO₆⁹⁻) in the framework structure.\n\nStep 4: Therefore, the statement claiming the presence of AlO₆⁹⁻ ions is false.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In the framework of zeolites, the substitution of Al³⁺ for Si⁴⁺ imparts:",
      option_a: "A net negative framework charge balanced by cations",
      option_b: "A net positive framework charge",
      option_c: "Complete electrical neutrality without extra cations",
      option_d: "Basic character by producing free OH⁻ ions",
      correct_option: "A",
      explanation: "Step 1: Replacement of tetravalent Si⁴⁺ by trivalent Al³⁺ creates a deficiency of positive charge (net negative charge on framework).\nStep 2: This negative charge is balanced by exchangeable extra-framework cations such as Na⁺, K⁺, or Ca²⁺.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2128,
    originalQuestion: {
      question: "Which one of the following orders correctly represents the increasing acid strengths of the given oxoacids of chlorine? [AIPMT 2005]",
      option_a: "HOClO < HOCl < HOClO₃ < HOClO₂",
      option_b: "HOClO₃ < HOClO₂ < HOClO < HOCl",
      option_c: "HOClO₂ < HOClO₃ < HOClO < HOCl",
      option_d: "HOCl < HOClO < HOClO₂ < HOClO₃",
      correct_option: "D",
      explanation: "Step 1: The oxoacids of chlorine are:\n- Hypochlorous acid: HOCl (oxidation state of Cl = +1)\n- Chlorous acid: HOClO or HClO₂ (oxidation state of Cl = +3)\n- Chloric acid: HOClO₂ or HClO₃ (oxidation state of Cl = +5)\n- Perchloric acid: HOClO₃ or HClO₄ (oxidation state of Cl = +7)\n\nStep 2: As the oxidation state of the central chlorine atom increases, its electronegativity and ability to withdraw electron density from the O-H bond increase.\n\nStep 3: Additionally, as the number of terminal oxygen atoms increases, the conjugate base anion (ClO⁻, ClO₂⁻, ClO₃⁻, ClO₄⁻) achieves greater resonance stabilization due to effective delocalization of the negative charge over more oxygen atoms.\n\nStep 4: Therefore, the acid strength increases in the order:\nHOCl < HOClO < HOClO₂ < HOClO₃\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following oxoacids of chlorine is the strongest Brønsted acid in aqueous solution?",
      option_a: "HClO₄",
      option_b: "HClO₃",
      option_c: "HClO₂",
      option_d: "HClO",
      correct_option: "A",
      explanation: "Step 1: Perchloric acid (HClO₄) has chlorine in its highest oxidation state (+7).\nStep 2: The perchlorate ion (ClO₄⁻) has its negative charge symmetrically delocalized across four equivalent oxygen atoms, making it the most stable conjugate base.\nStep 3: Hence, HClO₄ is the strongest acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2127,
    originalQuestion: {
      question: "What is the correct relationship between the pH of isomolar solutions of sodium oxide, Na₂O (pH₁), sodium sulphide, Na₂S (pH₂), sodium selenide, Na₂Se (pH₃), and sodium telluride, Na₂Te (pH₄)? [AIPMT 2005]",
      option_a: "pH₁ > pH₂ > pH₃ > pH₄",
      option_b: "pH₁ > pH₂ ≈ pH₃ > pH₄",
      option_c: "pH₁ < pH₂ < pH₃ < pH₄",
      option_d: "pH₁ < pH₂ < pH₃ ≈ pH₄",
      correct_option: "A",
      explanation: "Step 1: The anions present in these salts are O²⁻, S²⁻, Se²⁻, and Te²⁻ from Group 16.\n\nStep 2: As we move down Group 16 from O to Te, the ionic size increases:\nO²⁻ < S²⁻ < Se²⁻ < Te²⁻\n\nStep 3: The charge density of the anion decreases down the group. High charge density on O²⁻ makes it the strongest Brønsted base (highest proton affinity), reacting completely with water to generate OH⁻ ions:\nO²⁻ + H₂O → 2 OH⁻\n\nStep 4: The basic strength of the conjugate bases follows the order:\nO²⁻ > S²⁻ > Se²⁻ > Te²⁻\n\nStep 5: Higher basic strength in isomolar solutions results in a higher concentration of OH⁻ and therefore a higher pH:\npH₁ > pH₂ > pH₃ > pH₄\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The correct order of increasing basic strength of the Group 16 hydrides is:",
      option_a: "H₂Te < H₂Se < H₂S < H₂O",
      option_b: "H₂O < H₂S < H₂Se < H₂Te",
      option_c: "H₂S < H₂Se < H₂Te < H₂O",
      option_d: "H₂Te < H₂S < H₂Se < H₂O",
      correct_option: "A",
      explanation: "Step 1: Acidic strength increases down Group 16 (H₂O < H₂S < H₂Se < H₂Te) due to decreasing H-E bond dissociation energy.\nStep 2: Consequently, basic strength follows the exact reverse order: H₂Te < H₂Se < H₂S < H₂O.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2126,
    originalQuestion: {
      question: "Which one of the following oxides is expected to exhibit paramagnetic behaviour? [AIPMT 2005]",
      option_a: "CO₂",
      option_b: "SiO₂",
      option_c: "SO₂",
      option_d: "ClO₂",
      correct_option: "D",
      explanation: "Step 1: Paramagnetic substances contain one or more unpaired electrons in their molecular or valence orbitals.\n\nStep 2: Counting the total number of valence electrons for each molecule:\n- CO₂: C (4) + 2 × O (6) = 16 valence electrons (even number, all paired, diamagnetic)\n- SiO₂: Si (4) + 2 × O (6) = 16 valence electrons (even number, diamagnetic)\n- SO₂: S (6) + 2 × O (6) = 18 valence electrons (even number, all paired, diamagnetic)\n- ClO₂: Cl (7) + 2 × O (6) = 7 + 12 = 19 valence electrons (odd electron molecule)\n\nStep 3: Since ClO₂ contains an odd number of electrons (19), it must have an unpaired electron.\n\nStep 4: Therefore, ClO₂ exhibits paramagnetic behaviour.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following nitrogen oxides is an odd-electron molecule and paramagnetic in the gas phase?",
      option_a: "NO₂",
      option_b: "N₂O",
      option_c: "N₂O₄",
      option_d: "N₂O₅",
      correct_option: "A",
      explanation: "Step 1: In NO₂, total valence electrons = 5 (from N) + 2 × 6 (from O) = 17 electrons.\nStep 2: Having an odd number of valence electrons, NO₂ has an unpaired electron and is paramagnetic.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2125,
    originalQuestion: {
      question: "In which of the following molecules are all the bonds not equal? [AIPMT 2006]",
      option_a: "NF₃",
      option_b: "ClF₃",
      option_c: "BF₃",
      option_d: "AlF₃",
      correct_option: "B",
      explanation: "Step 1: Determine the geometry of each molecule using VSEPR theory:\n- NF₃: sp³ hybridized with 3 bond pairs and 1 lone pair (trigonal pyramidal, all three N-F bonds are identical).\n- BF₃: sp² hybridized with 3 bond pairs and 0 lone pairs (trigonal planar, all three B-F bonds are identical).\n- AlF₃: symmetrical coordination, all bonds equivalent.\n\nStep 2: In ClF₃, Chlorine has 7 valence electrons. It forms 3 Cl-F sigma bonds and has 2 lone pairs:\nSteric number = 3 + 2 = 5 (sp³d hybridization, trigonal bipyramidal electron geometry).\n\nStep 3: To minimize repulsions, the 2 lone pairs occupy equatorial positions, giving a bent T-shaped geometry.\n\nStep 4: In this geometry, there are two axial Cl-F bonds and one equatorial Cl-F bond.\nThe axial bonds experience greater repulsion from the two equatorial lone pairs, making the axial Cl-F bonds significantly longer (170 pm) than the equatorial Cl-F bond (160 pm).\n\nStep 5: Hence, all the Cl-F bonds in ClF₃ are not equal.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In PCl₅, the axial P-Cl bonds are longer than the equatorial P-Cl bonds because:",
      option_a: "Axial bond pairs suffer greater electron pair repulsion from equatorial bond pairs",
      option_b: "Axial bonds are pure p-orbitals without hybridization",
      option_c: "Equatorial bonds have greater d-character",
      option_d: "Phosphorus has a lone pair on the axial axis",
      correct_option: "A",
      explanation: "Step 1: In trigonal bipyramidal PCl₅, each axial bond pair lies at 90° to three equatorial bond pairs.\nStep 2: Equatorial bond pairs lie at 90° to only two axial bond pairs and 120° to two equatorial pairs.\nStep 3: The greater repulsion on axial bonds lengthens and weakens them.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2124,
    originalQuestion: {
      question: "The correct order regarding the electronegativity of hybrid orbitals of carbon is: [AIPMT 2006]",
      option_a: "sp < sp² < sp³",
      option_b: "sp > sp² < sp³",
      option_c: "sp > sp² > sp³",
      option_d: "sp < sp² > sp³",
      correct_option: "C",
      explanation: "Step 1: The percentage of s-character in the hybrid orbitals of carbon is:\n- sp hybrid orbital: 50% s-character\n- sp² hybrid orbital: 33.3% s-character\n- sp³ hybrid orbital: 25% s-character\n\nStep 2: s-electrons are spherical and penetrate closer to the positively charged nucleus than p-electrons.\n\nStep 3: Greater s-character in a hybrid orbital means the hybrid electrons are held more tightly by the nucleus, thereby increasing the effective electronegativity of that hybrid orbital.\n\nStep 4: Therefore, electronegativity decreases with decreasing s-character in the sequence:\nsp > sp² > sp³\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The acidity of hydrocarbons follows the order ethyne > ethene > ethane because:",
      option_a: "The conjugate base of ethyne has carbon with the highest percentage of s-character (sp)",
      option_b: "Ethyne has fewer hydrogen atoms",
      option_c: "Ethyne has a triple bond with low bond energy",
      option_d: "Ethane has sp hybridization",
      correct_option: "A",
      explanation: "Step 1: The acetylenic carbon is sp-hybridized with 50% s-character.\nStep 2: High s-character stabilizes the conjugate base carbanion (HC≡C⁻) by keeping the negative charge close to the nucleus.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2123,
    originalQuestion: {
      question: "Which of the following is the most basic oxide? [AIPMT 2006]",
      option_a: "SeO₂",
      option_b: "Al₂O₃",
      option_c: "Sb₂O₃",
      option_d: "Bi₂O₃",
      correct_option: "D",
      explanation: "Step 1: In the periodic table, metallic character increases down a group and from right to left across a period.\nOxides of metals are basic, oxides of metalloids are amphoteric, and oxides of non-metals are acidic.\n\nStep 2: Analyzing the given elements:\n- Se (Selenium): non-metal in Group 16; SeO₂ is an acidic oxide.\n- Al (Aluminium): Group 13 metal; Al₂O₃ is an amphoteric oxide.\n- Sb (Antimony): Group 15 metalloid; Sb₂O₃ is an amphoteric oxide.\n- Bi (Bismuth): heavy element in Group 15 with pronounced metallic character; Bi₂O₃ is a distinctly basic oxide.\n\nStep 3: Therefore, Bi₂O₃ is the most basic oxide among the choices.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Among the Group 15 oxides N₂O₃, P₂O₃, As₂O₃, Sb₂O₃ and Bi₂O₃, the one which is predominantly basic is:",
      option_a: "Bi₂O₃",
      option_b: "N₂O₃",
      option_c: "P₂O₃",
      option_d: "As₂O₃",
      correct_option: "A",
      explanation: "Step 1: Down Group 15, the nature of the trioxides changes from acidic (N₂O₃, P₂O₃) to amphoteric (As₂O₃, Sb₂O₃) to purely basic (Bi₂O₃).\nStep 2: Bi₂O₃ is predominantly basic due to the strong metallic nature of bismuth.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2122,
    originalQuestion: {
      question: "Which one of the following orders correctly represents the increasing acid strengths of the given acids? [AIPMT 2007]",
      option_a: "HOClO < HOCl < HOClO₃ < HOClO₂",
      option_b: "HOClO₂ < HOClO₃ < HOClO < HOCl",
      option_c: "HOClO₃ < HOClO₂ < HOClO < HOCl",
      option_d: "HOCl < HOClO < HOClO₂ < HOClO₃",
      correct_option: "D",
      explanation: "Step 1: In the series of oxoacids of chlorine, the oxidation number of chlorine increases from +1 in HOCl to +7 in HOClO₃:\n- HOCl: Cl in +1 state\n- HOClO (HClO₂): Cl in +3 state\n- HOClO₂ (HClO₃): Cl in +5 state\n- HOClO₃ (HClO₄): Cl in +7 state\n\nStep 2: A higher oxidation state on the central halogen pulls electron density away from the oxygen atom of the O-H bond, weakening the O-H bond and facilitating proton release.\n\nStep 3: In addition, more oxygen atoms allow greater resonance delocalization of the negative charge in the conjugate base:\nClO₄⁻ > ClO₃⁻ > ClO₂⁻ > ClO⁻\n\nStep 4: Thus, the acid strength increases in the order:\nHOCl < HOClO < HOClO₂ < HOClO₃\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following oxoacids of chlorine has the lowest pKa value (is the strongest acid)?",
      option_a: "HClO₄",
      option_b: "HClO₃",
      option_c: "HClO₂",
      option_d: "HClO",
      correct_option: "A",
      explanation: "Step 1: The strongest acid has the lowest pKa value.\nStep 2: HClO₄ is the strongest acid among all oxoacids of chlorine, having pKa ≈ -10.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2121,
    originalQuestion: {
      question: "Which of the following anions is present in the chain structure of silicates? [AIPMT 2007]",
      option_a: "(Si₂O₅²⁻)ₙ",
      option_b: "(SiO₃²⁻)ₙ",
      option_c: "SiO₄⁴⁻",
      option_d: "Si₂O₇⁶⁻",
      correct_option: "B",
      explanation: "Step 1: Silicates are classified based on the number of oxygen atoms shared between adjacent [SiO₄]⁴⁻ tetrahedra:\n- Orthosilicates (nesosilicates): zero oxygen atoms shared, discrete SiO₄⁴⁻ units.\n- Pyrosilicates (sorosilicates): one oxygen atom shared between two tetrahedra, giving Si₂O₇⁶⁻.\n- Chain silicates (inosilicates / pyroxenes): two oxygen atoms per tetrahedron are shared to form a continuous linear single chain.\n\nStep 2: For single chain silicates, sharing 2 oxygen atoms per tetrahedron gives the repeating formula unit:\n[SiO₄ - 2(1/2 O)] = [SiO₃]²⁻\nRepeating anion formula: (SiO₃²⁻)ₙ\n\nStep 3: (Si₂O₅²⁻)ₙ represents sheet silicates where 3 oxygen atoms per tetrahedron are shared.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In sheet silicates (phyllosilicates), how many oxygen atoms per SiO₄ tetrahedron are shared with adjacent tetrahedra?",
      option_a: "3",
      option_b: "2",
      option_c: "1",
      option_d: "4",
      correct_option: "A",
      explanation: "Step 1: In sheet silicates, three oxygen atoms of each SiO₄ tetrahedron are shared with neighbouring tetrahedra.\nStep 2: This gives a two-dimensional sheet with the general formula (Si₂O₅²⁻)ₙ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2120,
    originalQuestion: {
      question: "Which of the following oxidation states are the most characteristic for lead and tin, respectively? [AIPMT 2007]",
      option_a: "+2, +4",
      option_b: "+4, +4",
      option_c: "+2, +2",
      option_d: "+4, +2",
      correct_option: "A",
      explanation: "Step 1: Lead (Pb) and tin (Sn) belong to Group 14, having the valence shell electronic configuration ns² np².\n\nStep 2: Due to the inert pair effect (the reluctance of the valence 6s² electrons to participate in bonding caused by poor shielding by intervening 4f and 5d subshells), the lower oxidation state becomes progressively more stable down the group:\nStability of +2 state: C < Si < Ge < Sn < Pb\nStability of +4 state: C > Si > Ge > Sn > Pb\n\nStep 3: For tin (Sn), the +4 oxidation state is more stable than +2, so Sn²⁺ is a reducing agent (tends to become Sn⁴⁺).\n\nStep 4: For lead (Pb), the +2 oxidation state is much more stable than +4, so Pb⁴⁺ acts as a powerful oxidising agent (tends to become Pb²⁺).\n\nStep 5: Therefore, the most characteristic oxidation states for Pb and Sn are +2 and +4, respectively.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why is PbCl₂ much more stable and predominantly ionic than PbCl₄?",
      option_a: "Due to the inert pair effect stabilizing the +2 oxidation state in lead",
      option_b: "Because lead has high electronegativity",
      option_c: "Because Pb⁴⁺ has a smaller radius than Pb²⁺",
      option_d: "Due to the absence of d-orbitals in lead",
      correct_option: "A",
      explanation: "Step 1: The 6s² pair of electrons in lead is tightly bound due to ineffective shielding by 4f¹⁴ and 5d¹⁰ electrons (inert pair effect).\nStep 2: This makes the +2 oxidation state highly stable for lead compared to the +4 state.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2119,
    originalQuestion: {
      question: "The angular shape of the ozone molecule (O₃) consists of: [AIPMT 2008]",
      option_a: "1 sigma and 1 pi bond",
      option_b: "2 sigma and 1 pi bond",
      option_c: "1 sigma and 2 pi bonds",
      option_d: "2 sigma and 2 pi bonds",
      correct_option: "B",
      explanation: "Step 1: The ozone molecule (O₃) consists of three oxygen atoms arranged in an angular (bent) structure with a bond angle of approximately 117°.\n\nStep 2: The central oxygen atom is sp² hybridized, with one lone pair and bonds to two terminal oxygen atoms.\n\nStep 3: The resonance hybrid involves:\n- A single coordinate/covalent bond to one terminal oxygen (1 sigma bond)\n- A double bond to the other terminal oxygen (1 sigma bond and 1 pi bond)\n\nStep 4: Counting the total number of localized bonds in any canonical Lewis resonance structure:\nTotal sigma bonds = 2\nTotal pi bonds = 1\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The number of sigma and pi bonds in the sulphur dioxide (SO₂) molecule in its major Lewis structure is:",
      option_a: "2 sigma and 2 pi bonds",
      option_b: "2 sigma and 1 pi bond",
      option_c: "1 sigma and 2 pi bonds",
      option_d: "3 sigma and 0 pi bonds",
      correct_option: "A",
      explanation: "Step 1: In the stable Lewis structure of SO₂, sulphur forms two double bonds (O=S=O) with an expanded octet.\nStep 2: Each double bond consists of 1 sigma and 1 pi bond, giving a total of 2 sigma and 2 pi bonds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2118,
    originalQuestion: {
      question: "Among the following, which is the strongest oxidising agent? [AIPMT 2009]",
      option_a: "Br₂",
      option_b: "I₂",
      option_c: "Cl₂",
      option_d: "F₂",
      correct_option: "D",
      explanation: "Step 1: The standard reduction electrode potential (E°) measures the oxidising power of a species in aqueous medium:\n- F₂ + 2e⁻ → 2F⁻ : E° = +2.87 V\n- Cl₂ + 2e⁻ → 2Cl⁻ : E° = +1.36 V\n- Br₂ + 2e⁻ → 2Br⁻ : E° = +1.09 V\n- I₂ + 2e⁻ → 2I⁻ : E° = +0.54 V\n\nStep 2: Fluorine (F₂) has the most positive standard reduction potential (+2.87 V) among all known chemical elements.\n\nStep 3: This exceptional oxidising power is due to:\n1. Exceptionally low bond dissociation enthalpy of the F-F bond.\n2. Exceptionally high hydration enthalpy of the small fluoride ion (F⁻).\n\nStep 4: Therefore, F₂ is the strongest oxidising agent.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following halide ions is the strongest reducing agent in aqueous solution?",
      option_a: "I⁻",
      option_b: "Br⁻",
      option_c: "Cl⁻",
      option_d: "F⁻",
      correct_option: "A",
      explanation: "Step 1: The ability of halide ions to lose electrons (act as reducing agents) increases down the group as ionic size increases.\nStep 2: I⁻ has the largest size and lowest ionization/hydration restraint, making it the strongest reducing agent among halides.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2117,
    originalQuestion: {
      question: "The straight-chain (linear) silicone polymer is formed by: [AIPMT 2009]",
      option_a: "Hydrolysis of CH₃SiCl₃ followed by condensation polymerisation.",
      option_b: "Hydrolysis of (CH₃)₄Si by addition polymerisation.",
      option_c: "Hydrolysis of (CH₃)₂SiCl₂ followed by condensation polymerisation.",
      option_d: "Hydrolysis of (CH₃)₃SiCl followed by condensation polymerisation.",
      correct_option: "C",
      explanation: "Step 1: Silicones are organosilicon polymers containing repeating -Si-O-Si- linkages.\n\nStep 2: Hydrolysis of dichlorodialkylsilane, (CH₃)₂SiCl₂:\n(CH₃)₂SiCl₂ + 2 H₂O → (CH₃)₂Si(OH)₂ + 2 HCl\n\nStep 3: The diol (CH₃)₂Si(OH)₂ possesses two reactive hydroxyl groups. Intermolecular condensation polymerisation (elimination of water molecules) yields a linear, straight-chain silicone polymer:\nn (CH₃)₂Si(OH)₂ → [-O-Si(CH₃)₂-]ₙ + n H₂O\n\nStep 4: (CH₃)₃SiCl has only one reactive Cl and acts as a chain stopper. CH₃SiCl₃ has three Cl atoms and yields a 3D cross-linked silicone.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which organosilicon compound is used to terminate the growth of a linear silicone chain?",
      option_a: "(CH₃)₃SiCl",
      option_b: "(CH₃)₂SiCl₂",
      option_c: "CH₃SiCl₃",
      option_d: "SiCl₄",
      correct_option: "A",
      explanation: "Step 1: (CH₃)₃SiCl on hydrolysis forms trimethylsilanol, (CH₃)₃SiOH, which has only one -OH group.\nStep 2: Since it cannot continue condensation at both ends, it acts as a chain terminator.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2116,
    originalQuestion: {
      question: "The stability of the +1 oxidation state among Al, Ga, In and Tl increases in the sequence: [AIPMT 2009]",
      option_a: "Al < Ga < In < Tl",
      option_b: "Tl < In < Ga < Al",
      option_c: "In < Tl < Ga < Al",
      option_d: "Ga < In < Al < Tl",
      correct_option: "A",
      explanation: "Step 1: Group 13 elements have the valence electron configuration ns² np¹.\nThey exhibit oxidation states of +3 (group state) and +1.\n\nStep 2: As we move down Group 13 from Al to Tl, the intervening d and f subshells poorly shield the outer valence s-electrons from nuclear charge.\nConsequently, the valence ns² electrons remain tightly held by the nucleus and are reluctant to participate in chemical bonding (the inert pair effect).\n\nStep 3: Due to the inert pair effect, the stability of the lower (+1) oxidation state increases systematically down the group:\nAl < Ga < In < Tl\n\nStep 4: In fact, Tl⁺ is the most stable ion of thallium, whereas Tl³⁺ acts as a strong oxidising agent.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following compounds is the strongest oxidising agent due to the inert pair effect?",
      option_a: "TlCl₃",
      option_b: "TlCl",
      option_c: "AlCl₃",
      option_d: "GaCl₃",
      correct_option: "A",
      explanation: "Step 1: In TlCl₃, thallium is in the +3 oxidation state.\nStep 2: Because the +1 state is much more stable than +3 for thallium due to the inert pair effect, Tl³⁺ readily gains 2 electrons to form Tl⁺, behaving as a strong oxidising agent.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2115,
    originalQuestion: {
      question: "The correct order of increasing bond angles in the following species is: [AIPMT 2010 Prelims]",
      option_a: "Cl₂O < ClO₂ < ClO₂⁻",
      option_b: "ClO₂ < Cl₂O < ClO₂⁻",
      option_c: "Cl₂O < ClO₂⁻ < ClO₂",
      option_d: "ClO₂⁻ < Cl₂O < ClO₂",
      correct_option: "C",
      explanation: "Step 1: In Cl₂O (dichlorine monoxide), the central oxygen atom is sp³ hybridized with 2 bond pairs and 2 lone pairs. Strong steric repulsion between the two large chlorine atoms widens the bond angle to approximately 110.9°.\n\nStep 2: In ClO₂⁻ (chlorite ion), the central chlorine atom is sp³ hybridized with 2 bond pairs and 2 lone pairs. Lone pair-lone pair repulsions compress the O-Cl-O angle to approximately 111° (around 110.5° - 111°).\n\nStep 3: In ClO₂ (chlorine dioxide), the central chlorine atom is an odd-electron molecule with 2 bond pairs, 1 lone pair, and 1 single unpaired electron (steric number around 3). The single unpaired electron exerts significantly less repulsion than a full lone pair, opening up the O-Cl-O bond angle to approximately 117.6°.\n\nStep 4: Therefore, the bond angle is largest in ClO₂ (~118°), with Cl₂O < ClO₂⁻ < ClO₂ being the accepted order.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In which of the following species is the bond angle closest to 120°?",
      option_a: "ClO₂",
      option_b: "H₂O",
      option_c: "NH₃",
      option_d: "H₂S",
      correct_option: "A",
      explanation: "Step 1: ClO₂ has a bond angle of 117.6° (close to 120°) due to its odd electron and double-bond character.\nStep 2: H₂O (104.5°), NH₃ (107°), and H₂S (92°) have much smaller bond angles.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2114,
    originalQuestion: {
      question: "The oxidation states of P in H₄P₂O₅, H₄P₂O₆ and H₄P₂O₇ are, respectively: [AIPMT 2010 Prelims]",
      option_a: "+3, +5, +4",
      option_b: "+5, +3, +4",
      option_c: "+5, +4, +3",
      option_d: "+3, +4, +5",
      correct_option: "D",
      explanation: "Step 1: For H₄P₂O₅ (pyrophosphorous acid):\n4(+1) + 2(x) + 5(-2) = 0\n4 + 2x - 10 = 0  ⇒  2x = +6  ⇒  x = +3\n\nStep 2: For H₄P₂O₆ (hypophosphoric acid):\n4(+1) + 2(y) + 6(-2) = 0\n4 + 2y - 12 = 0  ⇒  2y = +8  ⇒  y = +4\n\nStep 3: For H₄P₂O₇ (pyrophosphoric acid):\n4(+1) + 2(z) + 7(-2) = 0\n4 + 2z - 14 = 0  ⇒  2z = +10  ⇒  z = +5\n\nStep 4: Therefore, the oxidation states of phosphorus are +3, +4, and +5 respectively.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The oxidation states of phosphorus in H₃PO₂, H₃PO₃ and H₃PO₄ are respectively:",
      option_a: "+1, +3, +5",
      option_b: "+1, +5, +3",
      option_c: "+3, +4, +5",
      option_d: "+5, +3, +1",
      correct_option: "A",
      explanation: "Step 1: In H₃PO₂: 3(+1) + x + 2(-2) = 0  ⇒  x = +1.\nStep 2: In H₃PO₃: 3(+1) + x + 3(-2) = 0  ⇒  x = +3.\nStep 3: In H₃PO₄: 3(+1) + x + 4(-2) = 0  ⇒  x = +5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2113,
    originalQuestion: {
      question: "The tendency of BF₃, BCl₃ and BBr₃ to behave as Lewis acids decreases in the sequence: [AIPMT 2010 Prelims]",
      option_a: "BCl₃ > BF₃ > BBr₃",
      option_b: "BBr₃ > BCl₃ > BF₃",
      option_c: "BBr₃ > BF₃ > BCl₃",
      option_d: "BF₃ > BCl₃ > BBr₃",
      correct_option: "B",
      explanation: "Step 1: In boron trihalides (BX₃), boron has a vacant 2p orbital and an incomplete octet.\n\nStep 2: In BF₃, effective pπ-pπ back bonding occurs between the fully filled 2p orbital of fluorine and the empty 2p orbital of boron because of their identical size and excellent orbital overlap.\nThis back bonding significantly reduces the electron deficiency of boron in BF₃.\n\nStep 3: As halogen size increases from F to Cl to Br, the filled 3p (Cl) and 4p (Br) orbitals cannot effectively overlap with the small 2p orbital of boron. Thus, back donation becomes very weak in BCl₃ and negligible in BBr₃.\n\nStep 4: Consequently, boron remains most electron-deficient in BBr₃ and least electron-deficient in BF₃.\n\nStep 5: The Lewis acid strength decreases in the sequence:\nBBr₃ > BCl₃ > BF₃\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following boron trihalides is the strongest Lewis acid?",
      option_a: "BI₃",
      option_b: "BBr₃",
      option_c: "BCl₃",
      option_d: "BF₃",
      correct_option: "A",
      explanation: "Step 1: The 5p orbital of iodine has the poorest overlap with the small 2p orbital of boron.\nStep 2: Back bonding is weakest in BI₃, leaving boron most electron deficient and making BI₃ the strongest Lewis acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2112,
    originalQuestion: {
      question: "Which one of the following molecular hydrides acts as a Lewis acid? [AIPMT 2010 Prelims]",
      option_a: "NH₃",
      option_b: "H₂O",
      option_c: "B₂H₆",
      option_d: "CH₄",
      correct_option: "C",
      explanation: "Step 1: Molecular hydrides are classified into three types based on valence electrons:\n- Electron-rich hydrides (possess lone pairs, act as Lewis bases): NH₃ (1 lone pair), H₂O (2 lone pairs).\n- Electron-precise hydrides (exact octet, neither donor nor acceptor): CH₄.\n- Electron-deficient hydrides (fewer electrons than required for octet, act as Lewis acids): Diborane (B₂H₆).\n\nStep 2: In B₂H₆, there are 12 valence electrons forming four terminal 2c-2e B-H bonds and two bridging 3c-2e B-H-B banana bonds.\n\nStep 3: Each boron atom still has an incomplete octet and readily accepts electron pairs from Lewis bases (e.g., reacting with NH₃ or CO) to act as a Lewis acid.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The bridging B-H-B bonds in diborane (B₂H₆) are best described as:",
      option_a: "Three-centre two-electron (3c-2e) bonds",
      option_b: "Two-centre two-electron (2c-2e) bonds",
      option_c: "Three-centre four-electron (3c-4e) bonds",
      option_d: "Four-centre two-electron (4c-2e) bonds",
      correct_option: "A",
      explanation: "Step 1: Each bridging hydrogen in B₂H₆ is shared between two boron atoms via an electron-delocalized banana bond.\nStep 2: Two electrons are delocalized over three nuclei (B-H-B), forming a 3-centre 2-electron (3c-2e) bond.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2111,
    originalQuestion: {
      question: "How many bridging oxygen atoms are present in P₄O₁₀? [AIPMT 2010 Mains]",
      option_a: "6",
      option_b: "4",
      option_c: "2",
      option_d: "5",
      correct_option: "A",
      explanation: "Step 1: In the molecular structure of phosphorus pentoxide (P₄O₁₀), four phosphorus atoms occupy the vertices of a regular tetrahedron.\n\nStep 2: Each edge of the tetrahedron has a bridging oxygen atom linking two phosphorus atoms via a P-O-P linkage.\nSince a tetrahedron has 6 edges, there are exactly 6 bridging oxygen atoms (P-O-P bridges).\n\nStep 3: In addition, each of the four phosphorus atoms is bonded to one terminal oxygen atom by a P=O double bond, giving 4 terminal oxygen atoms.\n\nStep 4: Total oxygen atoms = 6 bridging + 4 terminal = 10.\n\nStep 5: Thus, the number of bridging oxygen atoms is 6.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "How many P-O-P bridging linkages are present in a molecule of P₄O₆?",
      option_a: "6",
      option_b: "4",
      option_c: "3",
      option_d: "8",
      correct_option: "A",
      explanation: "Step 1: In P₄O₆, all 6 oxygen atoms act as bridges along the 6 edges of the P₄ tetrahedron.\nStep 2: Hence, there are exactly 6 P-O-P linkages.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2110,
    originalQuestion: {
      question: "Name the type of structure of silicates in which one oxygen atom of [SiO₄]⁴⁻ is shared: [AIPMT 2011 Prelims]",
      option_a: "Linear chain silicate",
      option_b: "Sheet silicate",
      option_c: "Pyrosilicate",
      option_d: "Three-dimensional silicate",
      correct_option: "C",
      explanation: "Step 1: Pyrosilicates (also known as sorosilicates) are formed when two tetrahedral [SiO₄]⁴⁻ units join together by sharing a single oxygen atom at one corner.\n\nStep 2: Sharing one oxygen atom yields the dimeric anion:\n2 [SiO₄]⁴⁻ - O²⁻ = [Si₂O₇]⁶⁻\n\nStep 3: In chain silicates, 2 oxygen atoms per tetrahedron are shared.\nIn sheet silicates, 3 oxygen atoms per tetrahedron are shared.\nIn 3D framework silicates, all 4 oxygen atoms are shared.\n\nStep 4: Therefore, sharing one oxygen atom results in a pyrosilicate.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following silicate minerals contains discrete [Si₂O₇]⁶⁻ pyrosilicate units?",
      option_a: "Thortveitite",
      option_b: "Zircon",
      option_c: "Beryl",
      option_d: "Talc",
      correct_option: "A",
      explanation: "Step 1: Thortveitite, Sc₂[Si₂O₇], contains discrete pyrosilicate units with one shared oxygen.\nStep 2: Zircon is an orthosilicate, Beryl is a cyclic silicate, and Talc is a sheet silicate.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2109,
    originalQuestion: {
      question: "The Lassaigne's extract is boiled with concentrated HNO₃ while testing for halogens. By doing so, it: [AIPMT 2011 Prelims]",
      option_a: "Decomposes Na₂S and NaCN formed.",
      option_b: "Helps in the precipitation of AgCl.",
      option_c: "Increases the solubility product of AgCl.",
      option_d: "Increases the concentration of NO₃⁻ ions.",
      correct_option: "A",
      explanation: "Step 1: If nitrogen and/or sulphur are present in the organic compound, sodium fusion converts them into NaCN and Na₂S in the sodium fusion (Lassaigne's) extract.\n\nStep 2: During the test for halogens, silver nitrate (AgNO₃) is added. If NaCN and Na₂S are present, they react with AgNO₃ to form white AgCN and black Ag₂S precipitates:\nNaCN + AgNO₃ → AgCN↓ (white) + NaNO₃\nNa₂S + 2 AgNO₃ → Ag₂S↓ (black) + 2 NaNO₃\nThese precipitates interfere with the identification of silver halides (AgCl, AgBr, AgI).\n\nStep 3: Boiling the extract with concentrated HNO₃ decomposes NaCN and Na₂S, expelling them as volatile HCN and H₂S gases:\nNaCN + HNO₃ → NaNO₃ + HCN↑\nNa₂S + 2 HNO₃ → 2 NaNO₃ + H₂S↑\n\nStep 4: This prevents false positives and ensures accurate testing for halogens.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "During halogen detection in Lassaigne's test, which gases are expelled on boiling the sodium extract with concentrated nitric acid?",
      option_a: "HCN and H₂S",
      option_b: "CO₂ and NH₃",
      option_c: "NO₂ and SO₂",
      option_d: "Cl₂ and Br₂",
      correct_option: "A",
      explanation: "Step 1: Boiling with concentrated HNO₃ decomposes NaCN into volatile HCN gas and Na₂S into volatile H₂S gas.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2108,
    originalQuestion: {
      question: "Which of the following oxides is amphoteric? [AIPMT 2011 Mains]",
      option_a: "SnO₂",
      option_b: "CaO",
      option_c: "SiO₂",
      option_d: "CO₂",
      correct_option: "A",
      explanation: "Step 1: An amphoteric oxide is an oxide that reacts with both acids and bases to form salts and water.\n\nStep 2: Evaluating the given oxides:\n- CaO: Calcium is an electropositive alkaline earth metal; CaO is a strongly basic oxide.\n- CO₂ and SiO₂: Carbon and silicon are non-metals; CO₂ and SiO₂ are acidic oxides.\n- SnO₂: Tin(IV) oxide reacts with acids (e.g., HCl) to form SnCl₄, and with bases (e.g., NaOH) to form sodium stannate Na₂[Sn(OH)₆]:\nSnO₂ + 4 HCl → SnCl₄ + 2 H₂O\nSnO₂ + 2 NaOH + 2 H₂O → Na₂[Sn(OH)₆]\n\nStep 3: Therefore, SnO₂ is an amphoteric oxide.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following Group 14 oxides exhibits amphoteric character?",
      option_a: "PbO₂",
      option_b: "CO₂",
      option_c: "SiO₂",
      option_d: "CO",
      correct_option: "A",
      explanation: "Step 1: PbO₂ and SnO₂ are amphoteric oxides that dissolve in both strong acids and strong alkalis.\nStep 2: CO₂ and SiO₂ are acidic, and CO is neutral.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2107,
    originalQuestion: {
      question: "Which of the following statements is incorrect? [AIPMT 2011 Mains]",
      option_a: "Pure sodium metal dissolves in liquid ammonia to give a blue solution.",
      option_b: "NaOH reacts with glass to give sodium silicate.",
      option_c: "Aluminium reacts with excess NaOH to give Al(OH)₃.",
      option_d: "NaHCO₃ on heating gives Na₂CO₃.",
      correct_option: "C",
      explanation: "Step 1: When aluminium reacts with excess aqueous sodium hydroxide, it dissolves completely forming soluble sodium aluminate (or sodium tetrahydroxoaluminate) with evolution of hydrogen gas:\n2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂↑\nIt does not precipitate as insoluble Al(OH)₃ because Al(OH)₃ is amphoteric and dissolves in excess alkali.\nThus, statement C is incorrect.\n\nStep 2: Sodium dissolves in liquid ammonia giving ammoniated electrons which impart a deep blue colour (statement A is correct).\n\nStep 3: Hot concentrated NaOH attacks the silica in glass forming sodium silicate (statement B is correct).\n\nStep 4: Thermal decomposition of NaHCO₃ yields Na₂CO₃, CO₂, and H₂O (statement D is correct).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Aluminium metal dissolves in aqueous sodium hydroxide solution to produce:",
      option_a: "[Al(OH)₄]⁻ and H₂ gas",
      option_b: "Al(OH)₃ precipitate and O₂ gas",
      option_c: "Al₂O₃ and NaH",
      option_d: "AlCl₃ and H₂O",
      correct_option: "A",
      explanation: "Step 1: 2 Al + 2 OH⁻ + 6 H₂O → 2 [Al(OH)₄]⁻ + 3 H₂↑.\nStep 2: Aluminium dissolves to form the tetrahydroxoaluminate complex and releases hydrogen gas.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2106,
    originalQuestion: {
      question: "Sulphur trioxide can be obtained by which of the following reactions? [AIPMT 2012 Prelims]",
      option_a: "CaSO₄ + C → [product not provided]",
      option_b: "Fe₂(SO₄)₃ → Fe₂O₃ + 3 SO₃",
      option_c: "S + H₂SO₄ → [products not provided]",
      option_d: "H₂SO₄ + PCl₅ → [products not provided]",
      correct_option: "B",
      explanation: "Step 1: Ferric sulphate, Fe₂(SO₄)₃, on strong thermal decomposition breaks down into ferric oxide and sulphur trioxide gas:\nFe₂(SO₄)₃ (s) → Fe₂O₃ (s) + 3 SO₃ (g)\n\nStep 2: In contrast, reaction of S with concentrated H₂SO₄ produces SO₂:\nS + 2 H₂SO₄ → 3 SO₂ + 2 H₂O\nReaction of H₂SO₄ with PCl₅ produces chlorosulphonic acid (HSO₃Cl) or thionyl chloride.\n\nStep 3: Therefore, SO₃ is produced by the thermal decomposition of Fe₂(SO₄)₃.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following sulphates yields SO₃ gas upon strong thermal decomposition?",
      option_a: "Fe₂(SO₄)₃",
      option_b: "Na₂SO₄",
      option_c: "K₂SO₄",
      option_d: "BaSO₄",
      correct_option: "A",
      explanation: "Step 1: Alkali and heavy alkaline earth sulphates (Na₂SO₄, K₂SO₄, BaSO₄) are thermally very stable.\nStep 2: Fe₂(SO₄)₃ readily decomposes on heating to give Fe₂O₃ and SO₃ gas.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2105,
    originalQuestion: {
      question: "Which of the following statements is not valid for oxoacids of phosphorus? [AIPMT 2012 Prelims]",
      option_a: "Orthophosphoric acid is used in the manufacture of triple superphosphate.",
      option_b: "Hypophosphorous acid is a diprotic acid.",
      option_c: "All oxoacids contain tetrahedral, four-coordinated phosphorus.",
      option_d: "All oxoacids contain at least one P=O unit and one P-OH group.",
      correct_option: "B",
      explanation: "Step 1: Hypophosphorous acid (phosphinic acid) has the molecular formula H₃PO₂.\n\nStep 2: In H₃PO₂, the phosphorus atom is bonded to:\n- One terminal oxygen via a P=O double bond\n- One hydroxyl group via a P-OH bond\n- Two hydrogen atoms directly bonded to phosphorus via P-H bonds\n\nStep 3: Only the hydrogen atom attached to oxygen in the P-OH group is ionizable in aqueous solution.\nThe two hydrogen atoms directly bonded to phosphorus (P-H) do not ionize.\n\nStep 4: Therefore, hypophosphorous acid is a monoprotic (monobasic) acid, not a diprotic acid.\nHence, statement B is not valid.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the basicity of hypophosphorous acid (H₃PO₂)?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "0",
      correct_option: "A",
      explanation: "Step 1: Basicity of an oxoacid of phosphorus is equal to the number of ionizable P-OH groups.\nStep 2: H₃PO₂ contains only one P-OH group (and two non-ionizable P-H bonds), making it monobasic (basicity = 1).\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

