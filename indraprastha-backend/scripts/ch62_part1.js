// ch62_part1.js
// Questions 0 to 33 (IDs 2422 down to 2389)
// Chapter 62: Organic Chemistry - Some Basic Principles and Techniques (Chemistry)

module.exports = [
  {
    id: 2422,
    originalQuestion: {
      question: "A compound of molecular formula C7H16 shows optical isomerism. The compound will be: [AIPMT 2001]",
      option_a: "2,3-Dimethylpentane",
      option_b: "2,2-Dimethylbutane",
      option_c: "2-Methylhexane",
      option_d: "None of these",
      correct_option: "A",
      explanation: "Step 1: For an alkane to show optical isomerism, it must possess at least one chiral (asymmetric) carbon atom bonded to four different groups.\n\nStep 2: Check the given isomers with formula C₇H₁₆:\n- 2,3-Dimethylpentane has the structure:\n  CH₃-CH(CH₃)-C*H(CH₃)-CH₂-CH₃\n  Carbon-3 is bonded to:\n  1. -H\n  2. -CH₃ (methyl)\n  3. -CH(CH₃)₂ (isopropyl)\n  4. -CH₂CH₃ (ethyl)\n  Since all four attached groups are different, C-3 is an asymmetric chiral center, and 2,3-dimethylpentane exhibits optical isomerism.\n- 2,2-Dimethylbutane has formula C₆H₁₄ (only 6 carbons, not C₇H₁₆).\n- 2-Methylhexane has structure (CH₃)₂CH-CH₂-CH₂-CH₂-CH₃ and contains zero chiral carbons.\n\nStep 3: Therefore, the compound is 2,3-dimethylpentane.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following alkanes of molecular formula C₇H₁₆ contains an asymmetric (chiral) carbon atom?",
      option_a: "3-Methylhexane",
      option_b: "n-Heptane",
      option_c: "2,2-Dimethylpentane",
      option_d: "2,4-Dimethylpentane",
      correct_option: "A",
      explanation: "Step 1: In 3-methylhexane, CH₃-CH₂-C*H(CH₃)-CH₂-CH₂-CH₃, carbon-3 is bonded to -H, -CH₃, -CH₂CH₃, and -CH₂CH₂CH₃.\nStep 2: Having four different groups, C-3 is a chiral carbon atom, making 3-methylhexane optically active.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2421,
    originalQuestion: {
      question: "The correct acidic order of the given compounds (I. Phenol, II. p-Cresol, III. p-Nitrophenol) is: [AIPMT 2001]",
      option_a: "I > II > III",
      option_b: "III > I > II",
      option_c: "II > III > I",
      option_d: "I > III > II",
      correct_option: "B",
      explanation: "Step 1: The acidity of phenols depends directly on the stability of the phenoxide ion formed after losing a proton:\n- Electron-withdrawing groups (-NO₂) disperse the negative charge through -M and -I effects, stabilizing the phenoxide ion and increasing acidity.\n- Electron-releasing groups (-CH₃) intensify the negative charge through +I and hyperconjugation, destabilizing the phenoxide ion and decreasing acidity.\n\nStep 2: Comparing the three compounds:\n- In p-nitrophenol (III), the strongly electron-withdrawing -NO₂ group at the para position provides powerful -M and -I stabilization, making it the most acidic.\n- In phenol (I), there is no substituent.\n- In p-cresol (II), the electron-donating methyl group (-CH₃) destabilizes the phenoxide ion, making it less acidic than phenol.\n\nStep 3: Therefore, the correct acidic order is:\np-Nitrophenol (III) > Phenol (I) > p-Cresol (II)\nOrder: III > I > II\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Arrange the following in decreasing order of acidic strength: (I) p-Nitrophenol, (II) m-Nitrophenol, (III) Phenol.",
      option_a: "I > II > III",
      option_b: "III > II > I",
      option_c: "II > I > III",
      option_d: "I > III > II",
      correct_option: "A",
      explanation: "Step 1: At the para position, -NO₂ exerts both strong -M and -I effects, giving maximum stabilization.\nStep 2: At the meta position, -NO₂ cannot exert a -M effect and acts only via -I effect.\nStep 3: Phenol lacks electron-withdrawing groups and is the weakest among the three: I > II > III.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2420,
    originalQuestion: {
      question: "In steam distillation of toluene, the pressure of toluene in vapour is: [AIPMT 2001]",
      option_a: "Equal to the pressure of the barometer",
      option_b: "Less than the pressure of the barometer",
      option_c: "Equal to the vapour pressure of toluene in simple distillation",
      option_d: "More than the vapour pressure of toluene in simple distillation",
      correct_option: "B",
      explanation: "Step 1: Steam distillation is applied to separate substances that are steam-volatile and immiscible with water.\n\nStep 2: According to Dalton's law of partial pressures, the total vapour pressure (P_total) above an immiscible two-phase liquid mixture is equal to the sum of the individual saturation vapour pressures:\nP_total = p_water + p_toluene\n\nStep 3: The mixture boils when the total vapour pressure reaches atmospheric (barometric) pressure:\nP_total = P_barometer  ⇒  p_water + p_toluene = P_barometer\n\nStep 4: Since water contributes a significant positive vapour pressure (p_water > 0), the partial pressure of toluene must be less than the barometric pressure:\np_toluene = P_barometer - p_water < P_barometer\n\nStep 5: Therefore, the pressure of toluene in the vapour is less than the pressure of the barometer.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In steam distillation of an organic liquid immiscible with water, boiling occurs when:",
      option_a: "p_water + p_organic = P_atmospheric",
      option_b: "p_organic = P_atmospheric",
      option_c: "p_water = P_atmospheric",
      option_d: "p_organic > P_atmospheric",
      correct_option: "A",
      explanation: "Step 1: Two immiscible liquids exert their individual vapour pressures independently.\nStep 2: Boiling occurs at the temperature where the sum of their individual vapour pressures equals the ambient atmospheric pressure.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2419,
    originalQuestion: {
      question: "The incorrect IUPAC name is: [AIPMT 2001]",
      option_a: "CH3-CO-CH(CH3)-CH3 (2-methyl-3-butanone)",
      option_b: "CH3-CH(CH3)-CH(CH2CH3)-CH3 (2,3-dimethylpentane)",
      option_c: "CH3-C≡C-CH(CH3)2 (4-methyl-2-pentyne)",
      option_d: "CH3-CH(Cl)-CH(Br)-CH3 (3-bromo-2-chlorobutane)",
      correct_option: "A",
      explanation: "Step 1: Analyze each IUPAC name:\n- In CH₃-CO-CH(CH₃)-CH₃, the principal functional group is a ketone (>C=O). The 4-carbon chain must be numbered from the end that gives the ketone carbon the lowest possible locant: C1H₃-C2(=O)-C3H(CH₃)-C4H₃. The carbonyl group is at C-2 and the methyl group is at C-3. Thus, the correct IUPAC name is 3-methylbutan-2-one (or 3-methyl-2-butanone), not 2-methyl-3-butanone. Hence, name A is incorrect.\n- In CH₃-CH(CH₃)-CH(CH₂CH₃)-CH₃, the longest continuous carbon chain has 5 carbons (pentane) with methyl groups at C-2 and C-3, giving 2,3-dimethylpentane (correct).\n- In CH₃-C≡C-CH(CH₃)₂, numbering from the triple bond gives 4-methylpent-2-yne (4-methyl-2-pentyne) (correct).\n- In CH₃-CH(Cl)-CH(Br)-CH₃, numbering from either side gives locants (2, 3); alphabetical preference gives Br the lower locant 2 in 2-bromo-3-chlorobutane (often named 3-bromo-2-chlorobutane in older conventions).\n\nStep 2: Therefore, name A is clearly incorrect because the principal ketone functional group was assigned an incorrectly high locant 3 instead of 2.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the correct IUPAC name of (CH₃)₂CH-CO-CH₃?",
      option_a: "3-Methylbutan-2-one",
      option_b: "2-Methylbutan-3-one",
      option_c: "Isopropyl methyl ketone",
      option_d: "2-Methylbutanone",
      correct_option: "A",
      explanation: "Step 1: The parent chain contains 4 carbons (butane).\nStep 2: Numbering from the right gives the carbonyl group locant 2 and the methyl substituent locant 3: 3-methylbutan-2-one.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2418,
    originalQuestion: {
      question: "Geometrical isomers differ in: [AIPMT 2002]",
      option_a: "Position of functional group",
      option_b: "Position of atoms",
      option_c: "Spatial arrangement of atoms",
      option_d: "Length of carbon chain",
      correct_option: "C",
      explanation: "Step 1: Geometrical isomerism (cis-trans or E-Z isomerism) is a form of stereoisomerism.\n\nStep 2: Geometrical isomers have identical molecular formulas and identical connectivity (bonding sequence of atoms), but they differ in the three-dimensional spatial arrangement of atoms or groups around a rigid framework that prevents free rotation (such as a carbon-carbon double bond or a ring structure).\n\nStep 3: Differences in the position of functional groups or chain lengths correspond to structural (constitutional) isomerism, not stereoisomerism.\n\nStep 4: Therefore, geometrical isomers differ in the spatial arrangement of atoms.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following conditions is necessary for an alkene to exhibit geometrical isomerism?",
      option_a: "Presence of a chiral carbon atom",
      option_b: "Restricted rotation about the double bond and two different groups attached to each sp² carbon",
      option_c: "Presence of a plane of symmetry",
      option_d: "A terminal alkyne group",
      correct_option: "B",
      explanation: "Step 1: Geometrical isomerism requires hindered rotation about the double bond.\nStep 2: In addition, each doubly bonded carbon atom must be attached to two non-identical groups (abC=Cde).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2417,
    originalQuestion: {
      question: "The IUPAC name of CH2=CH-CH2-CH2-C≡CH is: [AIPMT 2002]",
      option_a: "1-Hexyne-5-ene",
      option_b: "1,5-Hexenyne",
      option_c: "1-Hexene-5-yne",
      option_d: "1,5-Hexynene",
      correct_option: "C",
      explanation: "Step 1: The compound contains 6 carbon atoms with both a double bond and a triple bond.\n\nStep 2: Both unsaturated bonds are located at terminal positions (C-1 from either end).\n\nStep 3: According to IUPAC rules, when a double bond and a triple bond are equidistant from the two ends of the principal chain, the double bond is given the lower numbering priority:\nC1H₂=C2H-C3H₂-C4H₂-C5≡C6H\n\nStep 4: The root word is hex, the primary suffix for the double bond is -1-en, and the suffix for the triple bond is -5-yne. Combining gives hex-1-en-5-yne (or 1-hexene-5-yne).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the correct IUPAC name of CH≡C-CH₂-CH=CH₂?",
      option_a: "Pent-1-en-4-yne",
      option_b: "Pent-4-en-1-yne",
      option_c: "1-Pentyne-4-ene",
      option_d: "Pent-1-yne-4-ene",
      correct_option: "A",
      explanation: "Step 1: When double and triple bonds are located at terminal positions, the double bond receives the lower locant 1.\nStep 2: The name is pent-1-en-4-yne.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2416,
    originalQuestion: {
      question: "Which of the following pairs of compounds are enantiomers? [AIPMT 2003]",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_option: "A",
      explanation: "Step 1: Enantiomers are stereoisomers that are related to each other as non-superimposable mirror images.\n\nStep 2: A pair of enantiomers must have opposite absolute configurations (R and S) at every corresponding chiral centre.\n\nStep 3: In the given question figures, pair A displays two stereoisomers that are non-superimposable mirror images of each other, satisfying the definition of enantiomers.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the relationship between a pair of stereoisomers that are non-superimposable mirror images of each other?",
      option_a: "Diastereomers",
      option_b: "Enantiomers",
      option_c: "Conformers",
      option_d: "Constitutional isomers",
      correct_option: "B",
      explanation: "Step 1: By definition, optical isomers that are non-superimposable mirror images are enantiomers.\nStep 2: They rotate plane-polarised light by equal amounts in opposite directions.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2415,
    originalQuestion: {
      question: "Which one of the following orders of acid strength is correct? [AIPMT 2003]",
      option_a: "RCOOH > ROH > H2O > HC≡CH",
      option_b: "RCOOH > H2O > ROH > HC≡CH",
      option_c: "RCOOH > H2O > HC≡CH > ROH",
      option_d: "RCOOH > HC≡CH > H2O > ROH",
      correct_option: "B",
      explanation: "Step 1: Evaluate the acidic strength of each functional class based on the stability of their conjugate bases:\n- Carboxylic acids (RCOOH): pKa ≈ 4 to 5. The carboxylate anion (RCOO⁻) is exceptionally stable due to resonance between two equivalent electronegative oxygen atoms. Thus, RCOOH is the strongest acid in the series.\n- Water (H₂O): pKa = 14.0. The hydroxide ion (OH⁻) is more stable than an alkoxide ion (RO⁻).\n- Alcohols (ROH): pKa ≈ 16 to 18. The electron-donating alkyl (+I) group intensifies negative charge on oxygen, destabilizing the alkoxide ion (RO⁻), making alcohols weaker acids than water.\n- Terminal alkynes (HC≡CH): pKa ≈ 25. The sp hybridized carbon has 50% s-character, making its conjugate base acetylide stable relative to other hydrocarbons, but far weaker than oxygen acids.\n\nStep 2: Arranging in decreasing order of acid strength:\nRCOOH > H₂O > ROH > HC≡CH\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following hydroxy compounds is more acidic than water (H₂O)?",
      option_a: "Ethanol",
      option_b: "Methanol",
      option_c: "Phenol",
      option_d: "Acetylene",
      correct_option: "C",
      explanation: "Step 1: Phenol (pKa ≈ 10) is much more acidic than water (pKa = 14).\nStep 2: The phenoxide ion is stabilized by delocalization of the negative charge over the aromatic ring.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2414,
    originalQuestion: {
      question: "The name of the compound given is: [AIPMT 2003]",
      option_a: "4-Ethyl-3-methyloctane",
      option_b: "3-Methyl-4-ethyloctane",
      option_c: "2,3-Diethylheptane",
      option_d: "5-Ethyl-6-methyloctane",
      correct_option: "A",
      explanation: "Step 1: Find the longest continuous carbon chain in the molecule:\nThe longest continuous chain contains 8 carbon atoms, establishing the parent alkane as octane.\n\nStep 2: Number the carbon chain from the end that provides the lowest set of locants for the substituents:\n- Numbering from left to right yields substituents at positions C-3 and C-4.\n- Numbering from right to left would yield substituents at C-5 and C-6.\nThus, the correct numbering gives locants 3 and 4.\n\nStep 3: Identify substituents:\n- At C-3: methyl group (-CH₃)\n- At C-4: ethyl group (-CH₂CH₃)\n\nStep 4: Arrange substituents alphabetically in the IUPAC name:\n'ethyl' precedes 'methyl' alphabetically. Therefore, the IUPAC name is 4-ethyl-3-methyloctane.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In IUPAC nomenclature of branched alkanes, how are multiple different substituents cited in the prefix?",
      option_a: "Alphabetically regardless of their locant numbers",
      option_b: "In increasing order of carbon atoms",
      option_c: "In increasing numerical order of locants",
      option_d: "In decreasing order of substituent molecular mass",
      correct_option: "A",
      explanation: "Step 1: According to IUPAC rules, substituents are always cited in alphabetical order (e.g., ethyl before methyl) regardless of their position on the parent chain.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2413,
    originalQuestion: {
      question: "The molecular formula of diphenylmethane is C13H12. How many structural isomers are possible when one of the hydrogens is replaced by a chlorine atom? [AIPMT 2004]",
      option_a: "6",
      option_b: "4",
      option_c: "8",
      option_d: "7",
      correct_option: "B",
      explanation: "Step 1: Examine the chemical structure of diphenylmethane:\nDiphenylmethane has formula (C₆H₅)₂CH₂, consisting of a central bridging methylene carbon (-CH₂-) bonded to two identical phenyl rings.\n\nStep 2: Identify all chemically non-equivalent types of hydrogen atoms available for substitution:\n1. Aliphatic methylene hydrogen: One type of hydrogen at the -CH₂- bridge, yielding (C₆H₅)₂CHCl (1 isomer).\n2. Ortho hydrogens on the phenyl rings: Position adjacent to the bridge, yielding (o-chlorophenyl)phenylmethane (1 isomer).\n3. Meta hydrogens on the phenyl rings: Yielding (m-chlorophenyl)phenylmethane (1 isomer).\n4. Para hydrogens on the phenyl rings: Position opposite to the bridge, yielding (p-chlorophenyl)phenylmethane (1 isomer).\n\nStep 3: Total number of non-equivalent hydrogen positions = 1 (aliphatic) + 3 (aromatic) = 4.\n\nStep 4: Therefore, exactly 4 monochloro structural isomers are possible.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "How many monochloro structural isomers are possible for toluene (C₇H₈)?",
      option_a: "3",
      option_b: "4",
      option_c: "5",
      option_d: "6",
      correct_option: "B",
      explanation: "Step 1: Toluene (C₆H₅CH₃) contains 4 non-equivalent sets of hydrogen atoms: benzyl (-CH₂Cl), ortho, meta, and para on the ring.\nStep 2: Replacement of one hydrogen yields 4 distinct structural isomers.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2412,
    originalQuestion: {
      question: "The best method for the separation of naphthalene and benzoic acid from their mixture is: [AIPMT 2005]",
      option_a: "Distillation",
      option_b: "Sublimation",
      option_c: "Chromatography",
      option_d: "Crystallisation",
      correct_option: "B",
      explanation: "Step 1: Analyze the physical properties of the components in the mixture:\n- Naphthalene (C₁₀H₈) is a non-polar aromatic hydrocarbon with high vapour pressure that readily undergoes sublimation (passes directly from the solid state to vapour upon mild heating without melting).\n- Benzoic acid (C₆H₅COOH) has strong intermolecular hydrogen bonding, a higher melting point, and does not sublime at that temperature.\n\nStep 2: When the solid mixture is gently heated, naphthalene sublimes directly into vapour and condenses as pure crystals on a cooled surface (such as an inverted funnel), leaving behind solid benzoic acid.\n\nStep 3: Therefore, sublimation is the best and most convenient method for separating naphthalene from benzoic acid.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following organic compounds can be purified by sublimation from non-volatile impurities?",
      option_a: "Camphor",
      option_b: "Sucrose",
      option_c: "Urea",
      option_d: "Glycerol",
      correct_option: "A",
      explanation: "Step 1: Camphor sublimes readily upon heating without melting.\nStep 2: This property allows its clean separation from non-sublimable substances by sublimation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2411,
    originalQuestion: {
      question: "Which one of the following pairs represents stereoisomerism? [AIPMT 2005]",
      option_a: "Structural isomerism and geometrical isomerism",
      option_b: "Optical isomerism and geometrical isomerism",
      option_c: "Chain isomerism and rotational isomerism",
      option_d: "Linkage isomerism and geometrical isomerism",
      correct_option: "B",
      explanation: "Step 1: Isomerism is classified into two main divisions:\n1. Structural (constitutional) isomerism: Isomers differ in the connectivity of atoms (includes chain, position, functional, metamerism, and tautomerism).\n2. Stereoisomerism: Isomers have the same atomic connectivity but differ in the three-dimensional orientation of atoms in space.\n\nStep 2: Stereoisomerism is subdivided into:\n- Geometrical isomerism (cis-trans / E-Z)\n- Optical isomerism (enantiomerism / diastereomerism)\n- Conformational isomerism (rotational isomers)\n\nStep 3: Therefore, the pair representing stereoisomerism is optical isomerism and geometrical isomerism.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Stereoisomers that are not mirror images of each other are called:",
      option_a: "Enantiomers",
      option_b: "Diastereomers",
      option_c: "Tautomers",
      option_d: "Metamers",
      correct_option: "B",
      explanation: "Step 1: By definition, diastereomers are stereoisomers that are not non-superimposable mirror images of each other.\nStep 2: Geometrical isomers and non-mirror image optical isomers are diastereomers.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2410,
    originalQuestion: {
      question: "Which amongst the following is the most stable carbocation? [AIPMT 2005]",
      option_a: "CH3+",
      option_b: "CH3-CH2+",
      option_c: "(CH3)2CH+",
      option_d: "(CH3)3C+",
      correct_option: "D",
      explanation: "Step 1: Carbocation stability is governed by hyperconjugation and inductive (+I) effects of attached alkyl groups.\n\nStep 2: Evaluate the number of hyperconjugative α-hydrogens and +I groups for each carbocation:\n- CH₃⁺ (methyl cation): 0 α-hydrogens, 0 +I groups  ⇒  least stable\n- CH₃-CH₂⁺ (ethyl cation, 1°): 3 α-hydrogens, one +I group  ⇒  moderately stable\n- (CH₃)₂CH⁺ (isopropyl cation, 2°): 6 α-hydrogens, two +I groups  ⇒  stable\n- (CH₃)₃C⁺ (tert-butyl cation, 3°): 9 α-hydrogens, three +I groups  ⇒  most stable\n\nStep 3: The 9 α-hydrogens in (CH₃)₃C⁺ provide 9 hyperconjugative resonance structures, effectively delocalizing the positive charge over the entire molecule.\n\nStep 4: Therefore, the tert-butyl carbocation (CH₃)₃C⁺ is the most stable.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "How many hyperconjugative structures (alpha-hydrogens) stabilize the tert-butyl cation, (CH₃)₃C⁺?",
      option_a: "3",
      option_b: "6",
      option_c: "9",
      option_d: "12",
      correct_option: "C",
      explanation: "Step 1: The tert-butyl cation has three methyl groups bonded directly to the positively charged carbon.\nStep 2: Each methyl group contributes 3 alpha-hydrogens, giving a total of 3 × 3 = 9 alpha-hydrogens.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2409,
    originalQuestion: {
      question: "The chirality of the given compound is: [AIPMT 2005]",
      option_a: "R",
      option_b: "S",
      option_c: "E",
      option_d: "Z",
      correct_option: "A",
      explanation: "Step 1: Determine the absolute configuration at the chiral center using Cahn-Ingold-Prelog (CIP) priority rules:\n1. Assign priorities 1 to 4 to the four atoms/groups directly attached to the asymmetric carbon based on atomic number (highest atomic number gets priority 1).\n2. View the molecule with the lowest priority group (priority 4) pointing away from the observer.\n\nStep 2: Trace the path from priority 1 → priority 2 → priority 3:\n- If the sequence 1 → 2 → 3 runs clockwise, the configuration is R (Rectus).\n- If the sequence runs counter-clockwise, the configuration is S (Sinister).\n\nStep 3: For the given compound, following the CIP assignment, the sequence 1 → 2 → 3 traces a clockwise circle with group 4 pointing away, corresponding to the R configuration.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the lowest priority group (4) is directed away from the observer and the path 1 → 2 → 3 is counter-clockwise, the absolute configuration is:",
      option_a: "R",
      option_b: "S",
      option_c: "D",
      option_d: "L",
      correct_option: "B",
      explanation: "Step 1: Under CIP nomenclature, a counter-clockwise trajectory from priority 1 to 2 to 3 with priority 4 in the rear denotes the S configuration (Sinister).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2408,
    originalQuestion: {
      question: "Names of some compounds are given. Which one is not in the IUPAC system? [AIPMT 2005]",
      option_a: "CH3-CH2-CH2-CH(CH2CH3)-CH(CH3)-CH2CH3 (3-methyl-4-ethylheptane)",
      option_b: "3-Methyl-2-butanol",
      option_c: "2-Ethyl-3-methylbut-1-ene",
      option_d: "4-Methyl-2-pentyne",
      correct_option: "A",
      explanation: "Step 1: Analyze compound A:\nStructure: CH₃-CH₂-CH₂-CH(CH₂CH₃)-CH(CH₃)-CH₂CH₃\n- The longest continuous carbon chain has 7 carbons (heptane).\n- Numbering from right to left gives substituents at positions 3 (methyl) and 4 (ethyl).\n- According to IUPAC nomenclature rules, substituents must be listed in alphabetical order regardless of their locants: 'ethyl' (e) precedes 'methyl' (m).\n- Therefore, the correct IUPAC name is 4-ethyl-3-methylheptane, NOT 3-methyl-4-ethylheptane.\n\nStep 2: The name given in option A (\"3-methyl-4-ethylheptane\") violates the alphabetical priority rule of the IUPAC system.\n\nStep 3: Therefore, name A is not in the IUPAC system.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the name '2-ethyl-3-methylpentane' incorrect according to IUPAC nomenclature?",
      option_a: "The longest continuous carbon chain has 6 carbons (hexane), not 5",
      option_b: "Alphabetical priority is violated",
      option_c: "Lowest locant rule is not satisfied",
      option_d: "The suffix of the alkane is incorrect",
      correct_option: "A",
      explanation: "Step 1: Drawing 2-ethyl-3-methylpentane reveals that selecting the ethyl group at C-2 extends the parent chain to 6 carbons.\nStep 2: The correct IUPAC name is 3,4-dimethylhexane.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2407,
    originalQuestion: {
      question: "The IUPAC name of CH3-CH2-CH(CH3)-CH(CH3)-COCl is: [AIPMT 2006]",
      option_a: "1-Chloro-1-oxo-2,3-dimethylpentane",
      option_b: "2-Ethyl-3-methylbutanoyl chloride",
      option_c: "2,3-Dimethylpentanoyl chloride",
      option_d: "3,4-Dimethylpentanoyl chloride",
      correct_option: "C",
      explanation: "Step 1: Identify the principal functional group:\nThe principal functional group is an acyl chloride (-COCl), which takes the suffix '-oyl chloride'.\n\nStep 2: Determine the longest carbon chain containing the functional carbon:\nThe acyl carbon is designated as C-1: C1OCl-C2H(CH₃)-C3H(CH₃)-C4H₂-C5H₃.\nThe parent chain contains 5 carbons, establishing the base name as pentanoyl chloride.\n\nStep 3: Identify substituents and their locants:\nThere are two methyl groups located at carbons C-2 and C-3, prefix: 2,3-dimethyl.\n\nStep 4: Combining the prefix and parent name gives 2,3-dimethylpentanoyl chloride.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the correct IUPAC name of CH₃-CH(CH₃)-CH₂-COCl?",
      option_a: "3-Methylbutanoyl chloride",
      option_b: "2-Methylbutanoyl chloride",
      option_c: "Isovaleryl chloride",
      option_d: "1-Chloropentan-1-one",
      correct_option: "A",
      explanation: "Step 1: The acyl carbon is C-1. The longest chain has 4 carbons (butanoyl chloride).\nStep 2: A methyl group is attached at carbon-3: 3-methylbutanoyl chloride.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2406,
    originalQuestion: {
      question: "If there is no rotation of plane-polarised light by a compound in a specific solvent, though thought to be chiral, it may mean that: [AIPMT 2007]",
      option_a: "The compound is certainly meso",
      option_b: "There is no compound in the solvent",
      option_c: "The compound may be a racemic mixture",
      option_d: "The compound is certainly achiral",
      correct_option: "C",
      explanation: "Step 1: A compound containing chiral molecules can exhibit zero net optical rotation under specific circumstances:\n1. If it exists as an equimolar (1:1) mixture of two enantiomers (dextrorotatory (+) and laevorotatory (-) forms).\n2. The optical rotation caused by the molecules of one enantiomer is exactly balanced and cancelled by the equal and opposite rotation caused by the molecules of the other enantiomer.\n\nStep 2: This phenomenon is known as external compensation, and the resulting mixture is an optically inactive racemic mixture (or (±)-form).\n\nStep 3: (Note: A meso compound also has zero rotation due to internal compensation, but it is not the only explanation; the question states \"it may mean that\", which correctly matches \"the compound may be a racemic mixture\").\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the reason for the optical inactivity of a racemic modification?",
      option_a: "Internal compensation within the molecule",
      option_b: "External compensation between equal amounts of enantiomers",
      option_c: "Presence of a plane of symmetry",
      option_d: "Complete absence of chiral centers",
      correct_option: "B",
      explanation: "Step 1: A racemic mixture contains equal moles of d- and l-enantiomers.\nStep 2: Equal and opposite optical rotations cancel each other out externally, producing net zero optical rotation.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2405,
    originalQuestion: {
      question: "The order of decreasing reactivity towards an electrophilic reagent for the following would be: (i) Benzene (ii) Toluene (iii) Chlorobenzene (iv) Phenol [AIPMT 2007]",
      option_a: "(ii) > (iv) > (i) > (iii)",
      option_b: "(ii) > (iv) > (i) > (iii)",
      option_c: "(iv) > (ii) > (i) > (iii)",
      option_d: "(i) > (ii) > (iii) > (iv)",
      correct_option: "C",
      explanation: "Step 1: Electrophilic aromatic substitution is accelerated by electron-donating substituents that increase electron density in the benzene ring and stabilize the arenium carbocation intermediate:\n- Phenol (iv): The -OH group has lone pairs on oxygen and donates electron density strongly via +M resonance, making phenol exceptionally reactive.\n- Toluene (ii): The -CH₃ group releases electrons via hyperconjugation and +I effect, moderately activating the ring relative to benzene.\n- Benzene (i): Unsubstituted reference aromatic ring.\n- Chlorobenzene (iii): Chlorine possesses a strong electron-withdrawing inductive (-I) effect that outweighs its weak +M resonance effect, net deactivating the benzene ring towards electrophiles.\n\nStep 2: Arranging in decreasing order of reactivity towards electrophiles:\nPhenol (iv) > Toluene (ii) > Benzene (i) > Chlorobenzene (iii)\nOrder: (iv) > (ii) > (i) > (iii)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following substituents strongly activates the benzene ring towards electrophilic aromatic substitution?",
      option_a: "-NO₂",
      option_b: "-NH₂",
      option_c: "-Cl",
      option_d: "-CHO",
      correct_option: "B",
      explanation: "Step 1: The amino group (-NH₂) donates its lone pair of electrons through powerful +M resonance.\nStep 2: This substantially enriches the electron density at ortho and para positions, making aniline exceptionally reactive toward electrophiles.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2404,
    originalQuestion: {
      question: "For (i) I-, (ii) Cl- and (iii) Br-, the increasing order of nucleophilicity would be: [AIPMT 2007]",
      option_a: "Cl- < Br- < I-",
      option_b: "I- < Cl- < Br-",
      option_c: "Br- < Cl- < I-",
      option_d: "I- < Br- < Cl-",
      correct_option: "A",
      explanation: "Step 1: In polar protic solvents (such as water or alcohols), nucleophilicity depends heavily on solvation and ionic polarizability.\n\nStep 2: Smaller halide ions with high charge density (like Cl⁻) form very strong hydrogen bonds with protic solvent molecules, encasing them in a tight solvent shell that hinders their ability to attack an electrophilic carbon.\n\nStep 3: In contrast, the larger iodide ion (I⁻) has a low charge density, is weakly solvated, and has a highly polarizable electron cloud that readily deforms to form a covalent bond with the electrophile.\n\nStep 4: Therefore, in polar protic media, nucleophilicity increases with increasing size down the group:\nCl⁻ < Br⁻ < I⁻\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In a polar aprotic solvent like DMSO, what is the order of nucleophilicity of halide ions?",
      option_a: "I⁻ < Br⁻ < Cl⁻ < F⁻",
      option_b: "F⁻ < Cl⁻ < Br⁻ < I⁻",
      option_c: "Cl⁻ < Br⁻ < I⁻ < F⁻",
      option_d: "I⁻ < Cl⁻ < Br⁻ < F⁻",
      correct_option: "A",
      explanation: "Step 1: Polar aprotic solvents do not form hydrogen bonds with anions, leaving anions bare (unsolvated).\nStep 2: Under these conditions, nucleophilicity parallels basicity: F⁻ > Cl⁻ > Br⁻ > I⁻ (increasing order: I⁻ < Br⁻ < Cl⁻ < F⁻).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2403,
    originalQuestion: {
      question: "How many stereoisomers does this molecule have? CH3CH=CHCH2CHBrCH3 [AIPMT 2008]",
      option_a: "8",
      option_b: "2",
      option_c: "4",
      option_d: "6",
      correct_option: "C",
      explanation: "Step 1: Analyze the stereocenters present in CH₃-CH=CH-CH₂-CH(Br)-CH₃:\n1. The carbon-carbon double bond (-CH=CH-) has two different groups on each sp² carbon (H and CH₃ on one side, H and -CH₂CHBrCH₃ on the other). Thus, it shows geometrical isomerism and can exist in 2 forms: cis (Z) and trans (E).\n2. Carbon-5 (-CH(Br)-CH₃) is bonded to four different groups (-H, -Br, -CH₃, and -CH₂CH=CHCH₃). Thus, it is an asymmetric chiral carbon and can exist in 2 optical forms: R and S.\n\nStep 2: The two ends of the molecule are completely different (unsymmetrical molecule).\n\nStep 3: Calculate the total number of stereoisomers using the formula for unsymmetrical molecules:\nNumber of stereoisomers = 2ⁿ, where n = (number of geometrical double bonds + number of chiral centers) = 1 + 1 = 2.\nNumber of stereoisomers = 2² = 4 (specifically: cis-R, cis-S, trans-R, and trans-S).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "How many stereoisomers are possible for 2,3-dichlorobutane, CH₃-CH(Cl)-CH(Cl)-CH₃?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "8",
      correct_option: "B",
      explanation: "Step 1: 2,3-Dichlorobutane has two identical chiral carbons with a symmetrical molecular structure.\nStep 2: It forms one pair of enantiomers (d and l forms) and one optically inactive meso form.\nStep 3: Total stereoisomers = 2 + 1 = 3.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2402,
    originalQuestion: {
      question: "The stability of carbanions (i) R-C≡C-, (ii) C6H5-, (iii) R2C=CH- and (iv) R3C-CH2- is in the order of: [AIPMT 2008]",
      option_a: "(iv) > (ii) > (iii) > (i)",
      option_b: "(i) > (iii) > (ii) > (iv)",
      option_c: "(i) > (ii) > (iii) > (iv)",
      option_d: "(ii) > (iii) > (iv) > (i)",
      correct_option: "C",
      explanation: "Step 1: The stability of a carbanion depends primarily on the electronegativity (s-character) of the carbon bearing the negative charge:\n- sp hybrid carbon has 50% s-character  ⇒  highest electronegativity, stabilizes carbanion most\n- sp² hybrid carbon has 33.3% s-character  ⇒  intermediate electronegativity\n- sp³ hybrid carbon has 25% s-character  ⇒  lowest electronegativity, least stable\n\nStep 2: Compare each species:\n- (i) R-C≡C⁻: Carbanionic carbon is sp hybridized (50% s-character), by far the most stable.\n- (ii) C₆H₅⁻: Carbanionic carbon is sp² hybridized on an aromatic ring, stabilized by the powerful electron-withdrawing inductive effect of the phenyl ring.\n- (iii) R₂C=CH⁻: Alkenyl carbanion is sp² hybridized, but destabilized by electron-donating alkyl (+I) groups compared to phenyl.\n- (iv) R₃C-CH₂⁻: Carbanionic carbon is sp³ hybridized, further destabilized by the electron-donating +I effect of the bulky alkyl group, least stable.\n\nStep 3: Therefore, the stability order is:\n(i) > (ii) > (iii) > (iv)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following carbanions is the most stable?",
      option_a: "HC≡C⁻",
      option_b: "CH₂=CH⁻",
      option_c: "CH₃-CH₂⁻",
      option_d: "(CH₃)₃C⁻",
      correct_option: "A",
      explanation: "Step 1: In the acetylide carbanion (HC≡C⁻), the negative charge is held in an sp hybrid orbital with 50% s-character.\nStep 2: High s-character places the electron pair closest to the positive nucleus, providing maximum stability.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2401,
    originalQuestion: {
      question: "Which one of the following is most reactive towards electrophilic attack? [AIPMT 2008]",
      option_a: "Phenol (C6H5OH)",
      option_b: "Chlorobenzene (C6H5Cl)",
      option_c: "Nitrobenzene (C6H5NO2)",
      option_d: "Benzyl alcohol (C6H5CH2OH)",
      correct_option: "A",
      explanation: "Step 1: Reactivity in electrophilic aromatic substitution is governed by the electron density in the aromatic ring:\n- Phenol (C₆H₅OH): The -OH group donates an unshared electron pair into the aromatic ring via strong +M resonance, markedly enriching ring electron density and strongly activating it towards electrophiles.\n- Chlorobenzene (C₆H₅Cl): Chlorine's strong -I inductive effect dominates its weak +M resonance effect, net deactivating the benzene ring.\n- Nitrobenzene (C₆H₅NO₂): The -NO₂ group withdraws electron density through powerful -M and -I effects, strongly deactivating the ring.\n- Benzyl alcohol (C₆H₅CH₂OH): The -CH₂OH group is separated by an sp³ carbon and acts only via a weak inductive effect, offering very little activation compared to phenol.\n\nStep 2: Therefore, Phenol (C₆H₅OH) is the most reactive towards electrophilic attack.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which position on the aromatic ring is predominantly activated towards electrophilic substitution in phenol?",
      option_a: "Meta positions only",
      option_b: "Ortho and para positions",
      option_c: "Ortho positions only",
      option_d: "Para position only",
      correct_option: "B",
      explanation: "Step 1: Resonance structures of phenol show increased negative charge density specifically at the ortho and para carbons.\nStep 2: Hence, the -OH group is an ortho/para-directing activating group.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2400,
    originalQuestion: {
      question: "The base strength of (i) H3C-CH2-, (ii) H2C=CH- and (iii) H-C≡C- is in the order of: [AIPMT 2008]",
      option_a: "(i) > (iii) > (ii)",
      option_b: "(i) > (ii) > (iii)",
      option_c: "(ii) > (i) > (iii)",
      option_d: "(iii) > (ii) > (i)",
      correct_option: "B",
      explanation: "Step 1: Base strength is inversely proportional to the stability of the carbanion (weaker conjugate base = more stable carbanion, derived from a stronger acid):\n- Hydrocarbon acid strength follows: H-C≡C-H > H₂C=CH₂ > H₃C-CH₃ (due to sp > sp² > sp³ electronegativity of carbon).\n\nStep 2: Since ethyne is the strongest acid, its conjugate base HC≡C⁻ is the most stable and therefore the WEAKEST base.\n\nStep 3: Conversely, ethane is the weakest acid, so its conjugate base H₃C-CH₂⁻ is the least stable and therefore the STRONGEST base.\n\nStep 4: Arranging in decreasing order of base strength:\n(i) H₃C-CH₂⁻ > (ii) H₂C=CH⁻ > (iii) H-C≡C⁻\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following conjugate bases is the strongest Bronsted base?",
      option_a: "CH₃⁻",
      option_b: "NH₂⁻",
      option_c: "OH⁻",
      option_d: "F⁻",
      correct_option: "A",
      explanation: "Step 1: Along period 2, acidity increases: CH₄ < NH₃ < H₂O < HF.\nStep 2: The conjugate base of the weakest acid is the strongest base. Hence, CH₃⁻ is the strongest Bronsted base.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2399,
    originalQuestion: {
      question: "The IUPAC name of the compound having the formula CH≡C-CH=CH2 is: [AIPMT 2009]",
      option_a: "1-Butyne-3-ene",
      option_b: "But-1-yne-3-ene",
      option_c: "1-Butene-3-yne",
      option_d: "3-Butene-1-yne",
      correct_option: "C",
      explanation: "Step 1: The compound possesses 4 carbon atoms with one double bond and one triple bond: CH≡C-CH=CH₂.\n\nStep 2: When a double bond and a triple bond are positioned at equivalent terminal positions (C-1 and C-3 from either end), IUPAC rules give the double bond lower locant preference.\n\nStep 3: Numbering from the double bond end:\nC1H₂=C2H-C3≡C4H\n- Locant for double bond = 1 (suffix '-en')\n- Locant for triple bond = 3 (suffix '-yne')\n\nStep 4: The name is constructed as but-1-en-3-yne (or 1-butene-3-yne).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the IUPAC name of CH₂=CH-C≡C-CH₃?",
      option_a: "Pent-1-en-3-yne",
      option_b: "Pent-3-yn-1-ene",
      option_c: "Pent-4-en-2-yne",
      option_d: "1-Pentene-3-yne",
      correct_option: "A",
      explanation: "Step 1: Numbering from the left gives the double bond locant 1 and the triple bond locant 3: pent-1-en-3-yne.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2398,
    originalQuestion: {
      question: "In the following, the most stable conformation of n-butane is: [AIPMT 2010 Prelims]",
      option_a: "Gauche conformation",
      option_b: "Anti conformation",
      option_c: "Eclipsed conformation",
      option_d: "Fully eclipsed conformation",
      correct_option: "B",
      explanation: "Step 1: Conformations of n-butane arise from rotation about the central C2-C3 carbon-carbon single bond.\n\nStep 2: Evaluate the torsional and steric strain in each conformer:\n- Fully eclipsed: The two bulky methyl (-CH₃) groups eclipse each other at a dihedral angle of 0°  ⇒  maximum steric and torsional repulsion, highest energy, least stable.\n- Eclipsed: Methyl groups eclipse hydrogen atoms  ⇒  high torsional strain.\n- Gauche (staggered): Methyl groups are at a dihedral angle of 60°  ⇒  experience some steric repulsion (van der Waals strain).\n- Anti (staggered): The two methyl groups lie directly opposite each other at a dihedral angle of 180°  ⇒  steric repulsion and torsional strain are completely minimized.\n\nStep 3: Because both steric hindrance and torsional strain are at their absolute minimum, the anti conformation is the most thermodynamically stable.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the dihedral angle between the two bulky methyl groups in the anti conformation of n-butane?",
      option_a: "60°",
      option_b: "120°",
      option_c: "180°",
      option_d: "0°",
      correct_option: "C",
      explanation: "Step 1: In the anti conformation, the two methyl groups are positioned as far apart as possible, subtending a dihedral angle of 180°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2397,
    originalQuestion: {
      question: "Which one of the following is most reactive towards an electrophilic reagent? [AIPMT 2010 Prelims]",
      option_a: "o-Methylanisole",
      option_b: "o-Cresol",
      option_c: "Acetanilide derivative",
      option_d: "Benzyl alcohol derivative",
      correct_option: "A",
      explanation: "Step 1: The rate of electrophilic aromatic substitution depends on the electron density supplied to the benzene ring by its substituents.\n\nStep 2: In o-methylanisole (1-methoxy-2-methylbenzene):\n- The methoxy group (-OCH₃) is a strong activating group via +M resonance electron donation.\n- The methyl group (-CH₃) is an activating group via +I inductive and hyperconjugative effects.\n- Both substituents act synergistically to strongly increase electron density on the ring.\n\nStep 3: In o-cresol, -OH is activating, but in anisole derivatives, the ether oxygen provides massive +M activation that makes o-methylanisole the most reactive among the given derivatives.\n\nStep 4: Therefore, o-methylanisole is the most reactive towards an electrophilic reagent.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following monosubstituted benzenes is the most activated towards electrophilic bromination?",
      option_a: "Anisole (C₆H₅OCH₃)",
      option_b: "Toluene (C₆H₅CH₃)",
      option_c: "Nitrobenzene (C₆H₅NO₂)",
      option_d: "Chlorobenzene (C₆H₅Cl)",
      correct_option: "A",
      explanation: "Step 1: In anisole, the methoxy group (-OCH₃) donates lone pair electron density via powerful +M resonance.\nStep 2: This makes anisole far more reactive towards bromination than toluene, chlorobenzene, or nitrobenzene.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2396,
    originalQuestion: {
      question: "Which of the following conformers for ethylene glycol is most stable? [AIPMT 2010 Mains]",
      option_a: "Anti conformation",
      option_b: "Eclipsed conformation",
      option_c: "Partially eclipsed conformation",
      option_d: "Gauche conformation",
      correct_option: "D",
      explanation: "Step 1: For simple alkanes like n-butane, the anti conformation is the most stable because it minimizes steric repulsion between large terminal groups.\n\nStep 2: However, in ethylene glycol (ethane-1,2-diol, HO-CH₂-CH₂-OH), the gauche conformation places the two hydroxyl (-OH) groups at a dihedral angle of approximately 60°.\n\nStep 3: In this gauche orientation, an intramolecular hydrogen bond (O-H···O) readily forms between the hydrogen atom of one -OH group and the oxygen atom of the adjacent -OH group, forming a stable 5-membered quasi-ring.\n\nStep 4: The energetic stabilization gained from this intramolecular hydrogen bonding completely overcomes the small steric and torsional strains, making the gauche conformer more stable than the anti conformer.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the gauche conformation of 2-fluoroethanol more stable than its anti conformation?",
      option_a: "Steric hindrance is minimized",
      option_b: "Intramolecular hydrogen bonding between the -OH group and fluorine stabilizes the gauche form",
      option_c: "Dipole moment is zero",
      option_d: "Torsional strain is absent",
      correct_option: "B",
      explanation: "Step 1: In 2-fluoroethanol (F-CH₂-CH₂-OH), an intramolecular O-H···F hydrogen bond forms in the gauche conformation.\nStep 2: This hydrogen bond provides thermodynamic stabilization, rendering the gauche form more stable than the anti form.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2395,
    originalQuestion: {
      question: "The IUPAC name of the compound CH3CH=CHC≡CH is: [AIPMT 2010 Mains]",
      option_a: "Pent-4-yn-2-ene",
      option_b: "Pent-3-en-1-yne",
      option_c: "Pent-2-en-4-yne",
      option_d: "Pent-1-yn-3-ene",
      correct_option: "B",
      explanation: "Step 1: The compound CH₃-CH=CH-C≡CH contains a 5-carbon parent chain with one double bond and one triple bond.\n\nStep 2: Determine numbering by the lowest locant rule for unsaturated bonds:\n- Numbering from right to left: C1≡C2-C3=C4-C5H₃ gives locant set (1, 3).\n- Numbering from left to right: C1H₃-C2=C3-C4≡C5 gives locant set (2, 4).\n\nStep 3: Comparing the locant sets, (1, 3) is lower than (2, 4). Therefore, numbering begins from the right:\nC1 is the terminal alkyne carbon, C3 is the alkene carbon.\n\nStep 4: The name is constructed as pent-3-en-1-yne (or pent-3-ene-1-yne).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the IUPAC name of CH₃-C≡C-CH=CH₂?",
      option_a: "Pent-1-en-3-yne",
      option_b: "Pent-3-yn-1-ene",
      option_c: "Pent-4-yn-2-ene",
      option_d: "1-Pentene-3-yne",
      correct_option: "A",
      explanation: "Step 1: Numbering from the right gives unsaturated locants (1, 3): double bond at C-1 and triple bond at C-3.\nStep 2: The IUPAC name is pent-1-en-3-yne.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2394,
    originalQuestion: {
      question: "Which of the following species is not electrophilic in nature? [AIPMT 2010 Mains]",
      option_a: "Cl+",
      option_b: "BH3",
      option_c: "H3O+",
      option_d: "NO2+",
      correct_option: "C",
      explanation: "Step 1: An electrophile is an electron-deficient species (Lewis acid) capable of accepting an electron pair.\n\nStep 2: Analyze each species:\n- Cl⁺ (chloronium ion): Has an incomplete octet (6 valence electrons) and accepts electrons  ⇒  electrophile.\n- BH₃ (borane): Boron has only 6 valence electrons (electron-deficient sextet) and accepts electron pairs  ⇒  electrophile.\n- NO₂⁺ (nitronium ion): Has a positive formal charge on nitrogen with available electron capacity  ⇒  active electrophile in nitration.\n- H₃O⁺ (hydronium ion): The central oxygen atom is bonded to 3 hydrogens and holds one lone pair, completing its octet (8 valence electrons). Oxygen cannot accept another electron pair. It acts as a Bronsted proton donor (acid), not as an electrophile.\n\nStep 3: Therefore, H₃O⁺ is not electrophilic in nature.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following positively charged species does NOT act as an electrophile?",
      option_a: "NH₄⁺",
      option_b: "NO₂⁺",
      option_c: "CH₃⁺",
      option_d: "Cl⁺",
      correct_option: "A",
      explanation: "Step 1: In the ammonium ion (NH₄⁺), nitrogen already has a complete octet of 8 valence electrons.\nStep 2: Because nitrogen belongs to period 2 and lacks vacant d-orbitals, it cannot expand its valence shell to accept electrons.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2393,
    originalQuestion: {
      question: "The correct IUPAC name for the compound is: [AIPMT 2011 Prelims]",
      option_a: "4-Ethyl-3-propylhex-1-ene",
      option_b: "3-Ethyl-4-ethenylheptane",
      option_c: "3-Ethyl-4-propylhex-5-ene",
      option_d: "3-(1-Ethylpropyl)hex-1-ene",
      correct_option: "A",
      explanation: "Step 1: Identify the principal functional group:\nThe principal functional group is the carbon-carbon double bond, which must be part of the parent carbon chain and given the lowest possible locant (C-1).\n\nStep 2: Find the longest continuous carbon chain containing the double bond:\nThe longest chain containing C=C has 6 carbons, establishing the base name as hex-1-ene.\n\nStep 3: Identify substituents on this 6-carbon chain:\n- At carbon-3: a propyl group (-CH₂CH₂CH₃)\n- At carbon-4: an ethyl group (-CH₂CH₃)\n\nStep 4: Assemble substituents in alphabetical order:\n'ethyl' precedes 'propyl' alphabetically. Thus, the IUPAC name is 4-ethyl-3-propylhex-1-ene.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the IUPAC name of CH₂=CH-CH(C₂H₅)-CH₂-CH₃?",
      option_a: "3-Ethylpent-1-ene",
      option_b: "1-Ethylpent-2-ene",
      option_c: "3-Ethenylpentane",
      option_d: "3-Propylbut-1-ene",
      correct_option: "A",
      explanation: "Step 1: The parent chain containing the double bond has 5 carbons (pent-1-ene).\nStep 2: At C-3, there is an ethyl group substituent: 3-ethylpent-1-ene.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2392,
    originalQuestion: {
      question: "Which one of the following is most reactive towards an electrophilic reagent? [AIPMT 2011 Prelims]",
      option_a: "o-Methylanisole",
      option_b: "o-Cresol",
      option_c: "Acetanilide derivative",
      option_d: "Benzyl alcohol derivative",
      correct_option: "A",
      explanation: "Step 1: In electrophilic aromatic substitution, reactivity is governed by electron donation to the aromatic ring:\n- In o-methylanisole (1-methoxy-2-methylbenzene), the methoxy group (-OCH₃) strongly enriches the ring electron density via +M resonance effect, while the methyl group (-CH₃) donates via hyperconjugation and +I effect.\n- The synergistic activation of both electron-donating groups makes o-methylanisole exceptionally electron-rich and by far the most reactive towards an attacking electrophile.\n\nStep 2: Therefore, o-methylanisole is the most reactive towards an electrophilic reagent.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following groups exerts the strongest activating (+M) effect on a benzene ring?",
      option_a: "-OH",
      option_b: "-OCH₃",
      option_c: "-NHCOCH₃",
      option_d: "-CH₃",
      correct_option: "A",
      explanation: "Step 1: The -OH group has an unhindered oxygen atom that strongly donates its lone pair through +M resonance without steric hindrance, providing stronger activation than -OCH₃ or -NHCOCH₃.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2391,
    originalQuestion: {
      question: "Considering the state of hybridization of carbon atoms, find out the molecule among the following which is linear: [AIPMT 2011 Prelims]",
      option_a: "CH3-CH=CH-CH3",
      option_b: "CH3-C≡C-CH3",
      option_c: "CH2=CH-CH2-C≡CH",
      option_d: "CH3-CH2-CH2-CH3",
      correct_option: "B",
      explanation: "Step 1: Determine the hybridization and bond geometry of each carbon atom in the given molecules:\n- In CH₃-CH=CH-CH₃ (2-butene): The two central alkene carbons are sp² hybridized with ~120° bond angles, giving a planar bent/zigzag geometry.\n- In CH₃-CH₂-CH₂-CH₃ (butane): All carbons are sp³ hybridized with ~109.5° bond angles, forming a tetrahedral zigzag chain.\n- In CH₂=CH-CH₂-C≡CH: Contains sp³, sp², and sp carbons; the sp³ and sp² carbons prevent the entire molecule from being linear.\n- In CH₃-C≡C-CH₃ (2-butyne): The two internal triple-bonded carbons (C-2 and C-3) are sp hybridized. The bond angle around each sp carbon is strictly 180°. Therefore, the C1-C2-C3 and C2-C3-C4 bond angles are both 180°, which makes the four-carbon backbone strictly linear.\n\nStep 2: Therefore, CH₃-C≡C-CH₃ is a linear molecule.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following hydrocarbon molecules has a strictly linear geometry of all its carbon atoms?",
      option_a: "But-1-yne",
      option_b: "Propyne",
      option_c: "Ethyne (Acetylene)",
      option_d: "Allene",
      correct_option: "C",
      explanation: "Step 1: In ethyne (H-C≡C-H), both carbon atoms are sp hybridized with 180° bond angles.\nStep 2: All atoms (both carbons and both hydrogens) lie along a single straight line.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2390,
    originalQuestion: {
      question: "The IUPAC name of the given compound is: [AIPMT 2011 Mains]",
      option_a: "trans-2-chloro-3-iodopent-2-ene",
      option_b: "cis-3-iodo-4-chloropent-3-ene",
      option_c: "trans-3-iodo-4-chloropent-3-ene",
      option_d: "cis-2-chloro-3-iodopent-2-ene",
      correct_option: "A",
      explanation: "Step 1: Number the parent chain:\nThe longest continuous chain containing the double bond has 5 carbons (pent-2-ene). Numbering from the left gives the substituents lower locants: C1H₃-C2(Cl)=C3(I)-C4H₂-C5H₃ (locants 2 and 3).\n\nStep 2: Determine CIP priority at each sp² carbon:\n- At C-2: -Cl (atomic number 17) has higher priority than -CH₃ (atomic number 6).\n- At C-3: -I (atomic number 53) has higher priority than -CH₂CH₃ (atomic number 6).\n\nStep 3: Determine configuration:\nThe two higher priority groups (-Cl and -I) are located on opposite sides of the double bond axis (trans or E configuration).\n\nStep 4: Assemble the name:\ntrans-2-chloro-3-iodopent-2-ene.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In the E-Z system of stereochemical nomenclature, an alkene is designated as 'E' when:",
      option_a: "The two higher-priority groups are on opposite sides of the double bond",
      option_b: "The two higher-priority groups are on the same side of the double bond",
      option_c: "All four attached groups are identical",
      option_d: "The molecule possesses a chiral carbon",
      correct_option: "A",
      explanation: "Step 1: 'E' comes from the German 'entgegen' (opposite).\nStep 2: It signifies that the two groups of highest CIP priority on each doubly bonded carbon are on opposite sides of the double bond.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2389,
    originalQuestion: {
      question: "Which of the following acids does not exhibit optical isomerism? [AIPMT 2012 Prelims]",
      option_a: "Maleic acid",
      option_b: "α-Amino acids",
      option_c: "Lactic acid",
      option_d: "Tartaric acid",
      correct_option: "A",
      explanation: "Step 1: Optical isomerism requires the molecule to be chiral (lacking an alternating axis of symmetry, plane of symmetry, or inversion center), which usually arises from an asymmetric carbon atom.\n\nStep 2: Analyze the given acids:\n- Lactic acid: CH₃-C*H(OH)-COOH has one chiral carbon (optically active).\n- Tartaric acid: HOOC-C*H(OH)-C*H(OH)-COOH has two chiral carbons (exhibits optical isomerism with d, l, and meso forms).\n- α-Amino acids: R-C*H(NH₂)-COOH have an asymmetric α-carbon (except glycine) and exhibit optical isomerism.\n- Maleic acid: cis-HOOC-CH=CH-COOH is an achiral planar alkene with a plane of symmetry and no chiral carbon atom. It exhibits geometrical isomerism (cis-isomer of butenedioic acid), NOT optical isomerism.\n\nStep 3: Therefore, Maleic acid does not exhibit optical isomerism.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following amino acids is optically inactive due to the absence of a chiral carbon?",
      option_a: "Alanine",
      option_b: "Glycine",
      option_c: "Valine",
      option_d: "Leucine",
      correct_option: "B",
      explanation: "Step 1: Glycine has the chemical formula H₂N-CH₂-COOH.\nStep 2: Its alpha carbon is bonded to two identical hydrogen atoms, making it achiral and optically inactive.\n\nTherefore, Option (B) is the correct answer."
    }
  }
];

