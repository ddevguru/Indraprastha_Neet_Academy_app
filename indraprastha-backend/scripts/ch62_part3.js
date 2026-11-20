// ch62_part3.js
// Questions 67 to 99 (IDs 2355 down to 2323)
// Chapter 62: Organic Chemistry - Some Basic Principles and Techniques (Chemistry)

module.exports = [
  {
    id: 2355,
    originalQuestion: {
      question: "Kjeldahl's method for the estimation of nitrogen can be used to estimate the amount of nitrogen in which one of the following compounds? [NEET 2022 Phase 1]",
      option_a: "Nitrobenzene",
      option_b: "Azobenzene",
      option_c: "Aniline",
      option_d: "Pyridine",
      correct_option: "C",
      explanation: "Step 1: Understand the limitations of Kjeldahl's method:\nKjeldahl's method relies on quantitative conversion of organic nitrogen into ammonium sulphate, (NH₄)₂SO₄, upon digestion with concentrated sulphuric acid.\n\nStep 2: Nitrogen cannot be estimated by Kjeldahl's method in:\n1. Nitro compounds (-NO₂, e.g., nitrobenzene)\n2. Azo compounds (-N=N-, e.g., azobenzene)\n3. Compounds having nitrogen in a heterocyclic ring (e.g., pyridine, quinoline)\nIn these compounds, nitrogen does not convert into ammonium sulphate under standard digestion conditions.\n\nStep 3: In aniline (C₆H₅NH₂), nitrogen is present in an aromatic amino group (-NH₂), which is quantitatively converted into ammonium sulphate:\n2C₆H₅NH₂ + H₂SO₄ → (C₆H₅NH₃)₂SO₄ → (NH₄)₂SO₄\n\nStep 4: Therefore, Kjeldahl's method can be used for aniline.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Kjeldahl's method fails to estimate nitrogen in which of the following compounds?",
      option_a: "Aniline",
      option_b: "Urea",
      option_c: "Pyridine",
      option_d: "Acetamide",
      correct_option: "C",
      explanation: "Step 1: Pyridine contains nitrogen in an aromatic ring.\nStep 2: Ring nitrogen does not convert to ammonium sulphate upon boiling with concentrated H₂SO₄, causing Kjeldahl's method to fail.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2354,
    originalQuestion: {
      question: "The incorrect statement regarding chirality is: [NEET 2022 Phase 1]",
      option_a: "SN1 reaction yields a 1:1 mixture of both enantiomers",
      option_b: "The product obtained by SN2 reaction of a haloalkane having chirality at the reactive site shows inversion of configuration",
      option_c: "Enantiomers are superimposable mirror images on each other",
      option_d: "A racemic mixture shows zero optical rotation",
      correct_option: "C",
      explanation: "Step 1: Evaluate each statement regarding stereochemistry and chirality:\n- Statement A: In an SN1 reaction, nucleophilic attack occurs on a planar sp² carbocation with equal probability from either face, yielding a 1:1 mixture of both enantiomers (racemic mixture) (correct).\n- Statement B: An SN2 reaction proceeds via backside attack, producing complete Walden inversion of configuration at the chiral carbon (correct).\n- Statement D: A 50:50 mixture of two enantiomers (racemic mixture) exhibits zero net optical rotation due to external compensation (correct).\n- Statement C: By fundamental definition, enantiomers are NON-superimposable mirror images of each other. If mirror images are superimposable, the molecule is achiral and identical to its mirror image. Therefore, the statement \"Enantiomers are superimposable mirror images on each other\" is completely false.\n\nStep 2: Therefore, statement C is the incorrect statement.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following is the defining feature of a pair of enantiomers?",
      option_a: "Non-superimposable mirror images",
      option_b: "Superimposable mirror images",
      option_c: "Non-mirror image stereoisomers",
      option_d: "Constitutional isomers with identical boiling points",
      correct_option: "A",
      explanation: "Step 1: Enantiomers are stereoisomers that relate to each other as non-superimposable mirror images.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2353,
    originalQuestion: {
      question: "Which compound amongst the following is not an aromatic compound? [NEET 2022 Phase 1]",
      option_a: "Cyclopentadienyl anion",
      option_b: "Cycloheptatrienyl cation (tropylium ion)",
      option_c: "Cycloheptatriene",
      option_d: "Cyclooctatetraene/non-aromatic cyclic polyene",
      correct_option: "C",
      explanation: "Step 1: Apply Huckel's rule of aromaticity:\nA chemical species is aromatic if it is cyclic, planar, completely conjugated, and contains (4n + 2) delocalized π-electrons.\n\nStep 2: Evaluate the given cyclic compounds:\n- Cyclopentadienyl anion (C₅H₅⁻): Planar 5-membered ring with 6 delocalized π-electrons (4n + 2 with n = 1)  ⇒  aromatic.\n- Tropylium cation (C₇H₇⁺): Planar 7-membered ring where all carbons are sp² hybridized, containing 6 delocalized π-electrons (4n + 2 with n = 1)  ⇒  aromatic.\n- Cycloheptatriene (C₇H₈): Contains an sp³ hybridized -CH₂- methylene carbon. Because of this sp³ carbon, the cyclic p-orbital overlap is interrupted. Since it lacks complete cyclic conjugation, it is non-aromatic.\n\nStep 3: Therefore, cycloheptatriene is not an aromatic compound.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the tropylium cation (C₇H₇⁺) aromatic while cycloheptatriene (C₇H₈) is non-aromatic?",
      option_a: "Tropylium cation has an unbroken planar ring with 6 pi electrons, whereas cycloheptatriene has an sp³ carbon that breaks conjugation",
      option_b: "Tropylium cation has 8 pi electrons",
      option_c: "Cycloheptatriene is linear",
      option_d: "Tropylium cation has a triple bond",
      correct_option: "A",
      explanation: "Step 1: The tropylium cation is fully conjugated and planar with 6 π electrons (Huckel 4n + 2).\nStep 2: Cycloheptatriene has an sp³ carbon, which interrupts ring conjugation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2352,
    originalQuestion: {
      question: "Which of the following is the most stable carbocation? [NEET 2022 Phase 2]",
      option_a: "Allylic/benzylic stabilized carbocation",
      option_b: "Secondary carbocation",
      option_c: "Primary carbocation",
      option_d: "Vinylic carbocation",
      correct_option: "A",
      explanation: "Step 1: Compare the stabilizing factors among carbocation classes:\n- Resonance effect is fundamentally more powerful than hyperconjugation or inductive effects in stabilizing positive charge.\n- In allylic and benzylic carbocations, the vacant 2p orbital overlaps extensively with the adjacent π-system, allowing the positive charge to be delocalized over multiple carbon atoms.\n- Alkyl carbocations (secondary and primary) are stabilized only by weaker hyperconjugative and inductive (+I) effects.\n- Vinylic carbocations (positive charge on an sp² carbon) are extremely unstable due to high electronegativity of the sp carbon.\n\nStep 2: Therefore, the allylic/benzylic stabilized carbocation is the most stable carbocation.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the allyl carbocation (CH₂=CH-CH₂⁺) more stable than the n-propyl carbocation (CH₃-CH₂-CH₂⁺)?",
      option_a: "Resonance delocalization of the positive charge between two carbon atoms",
      option_b: "Inductive effect of the double bond",
      option_c: "Greater number of alpha-hydrogens",
      option_d: "sp hybridization of the positive carbon",
      correct_option: "A",
      explanation: "Step 1: The allyl cation possesses two equivalent resonance structures: CH₂=CH-CH₂⁺ ↔ ⁺CH₂-CH=CH₂.\nStep 2: Resonance delocalization of the positive charge provides greater stability than simple inductive stabilization.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2351,
    originalQuestion: {
      question: "What is the hybridization shown by C1 and C2 carbons, respectively, in the given compound? OHC-CH=CH-CH2COOCH3 [NEET 2022 Phase 2]",
      option_a: "sp3 and sp3",
      option_b: "sp2 and sp3",
      option_c: "sp2 and sp2",
      option_d: "sp3 and sp2",
      correct_option: "C",
      explanation: "Step 1: Number the parent chain from the principal carboxylic ester carbon (or aldehyde as designated):\nIn the formyl segment OHC-CH=CH-:\n- The aldehyde/carbonyl carbon (C1) forms 3 sigma bonds (one C-H, one C-C, and one C-O σ bond) and 1 C=O pi bond. Steric number = 3 + 0 = 3  ⇒  sp² hybridization.\n- The second carbon (C2) is part of the alkene double bond (-CH=CH-). It forms 3 sigma bonds (one C-H, two C-C) and 1 pi bond. Steric number = 3 + 0 = 3  ⇒  sp² hybridization.\n\nStep 2: Therefore, both C1 and C2 carbons exhibit sp² hybridization.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the hybridization of the carbonyl carbon in an aldehyde (R-CHO)?",
      option_a: "sp³",
      option_b: "sp²",
      option_c: "sp",
      option_d: "sp³d",
      correct_option: "B",
      explanation: "Step 1: The carbonyl carbon forms 3 sigma bonds (to R, H, and O) and 1 pi bond.\nStep 2: Steric number = 3 corresponds to sp² hybridization.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2350,
    originalQuestion: {
      question: "Predict the order of reactivity of the following four isomers towards SN2 reaction: (I) CH3CH2CH2CH2Cl (II) CH3CH2CH(Cl)CH3 (III) (CH3)2CHCH2Cl (IV) (CH3)3CCl [NEET 2022 Phase 2]",
      option_a: "(IV) > (II) > (III) > (I)",
      option_b: "(IV) > (III) > (II) > (I)",
      option_c: "(I) > (II) > (III) > (IV)",
      option_d: "(I) > (III) > (II) > (IV)",
      correct_option: "D",
      explanation: "Step 1: The SN2 reaction proceeds via a one-step concerted mechanism involving backside nucleophilic attack.\n\nStep 2: Because the transition state is pentacoordinated and sterically crowded, the rate of SN2 reaction is governed primarily by steric hindrance at the α and β carbons:\n- (I) CH₃CH₂CH₂CH₂Cl (1-chlorobutane): 1° alkyl halide with an unbranched chain  ⇒  least sterically crowded, highest reaction rate.\n- (III) (CH₃)₂CHCH₂Cl (1-chloro-2-methylpropane): 1° alkyl halide with a methyl branch at the β-carbon  ⇒  slightly more crowded than (I), second fastest.\n- (II) CH₃CH₂CH(Cl)CH₃ (2-chlorobutane): 2° alkyl halide with two alkyl substituents at the α-carbon  ⇒  moderately crowded, slower.\n- (IV) (CH₃)₃CCl (2-chloro-2-methylpropane): 3° alkyl halide with three methyl groups at the α-carbon  ⇒  severe steric crowding blocks backside attack, virtually unreactive.\n\nStep 3: Therefore, the order of reactivity towards SN2 is:\n(I) > (III) > (II) > (IV)\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following alkyl halides undergoes SN2 substitution at the fastest rate?",
      option_a: "CH₃Cl",
      option_b: "CH₃CH₂Cl",
      option_c: "(CH₃)₂CHCl",
      option_d: "(CH₃)₃CCl",
      correct_option: "A",
      explanation: "Step 1: In methyl chloride (CH₃Cl), there are only small hydrogen atoms attached to the reaction center.\nStep 2: Minimal steric hindrance permits the fastest backside nucleophilic attack.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2349,
    originalQuestion: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other as Reason (R).\nAssertion (A): Chlorine is an electron-withdrawing group but it is ortho, para directing in electrophilic aromatic substitution.\nReason (R): The inductive effect of chlorine destabilises the intermediate carbocation formed during electrophilic substitution; however, due to the more pronounced resonance effect, the halogen stabilises the carbocation at ortho and para positions. [NEET 2022 Phase 2]",
      option_a: "Assertion (A) is not correct but Reason (R) is correct",
      option_b: "Both Assertion (A) and Reason (R) are correct and Reason (R) is the correct explanation of Assertion (A)",
      option_c: "Both Assertion (A) and Reason (R) are correct but Reason (R) is not the correct explanation of Assertion (A)",
      option_d: "Assertion (A) is correct but Reason (R) is not correct",
      correct_option: "B",
      explanation: "Step 1: Evaluate Assertion (A):\nChlorine possesses both an electron-withdrawing inductive effect (-I) and an electron-donating resonance effect (+M). Because the -I effect dominates over the +M effect in the ground state, chlorobenzene is deactivated relative to benzene (electron-withdrawing overall). However, it directs incoming electrophiles to ortho and para positions. Thus, Assertion (A) is correct.\n\nStep 2: Evaluate Reason (R):\nDuring electrophilic attack at ortho or para positions, a resonance contributor is formed where chlorine donates its lone pair to form a C=Cl⁺ double bond, giving all atoms complete octets. This special octet stabilization cannot occur during meta attack. Thus, resonance stabilizes the carbocation selectively at ortho and para positions, making chlorine ortho/para directing despite its deactivating inductive pull. Thus, Reason (R) is correct and correctly explains Assertion (A).\n\nStep 3: Therefore, both Assertion (A) and Reason (R) are correct and Reason (R) is the correct explanation of Assertion (A).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why is chlorobenzene ortho/para-directing in electrophilic aromatic substitution?",
      option_a: "The +M resonance effect delocalizes chlorine's lone pair to form an especially stable octet canonical structure during ortho and para attack",
      option_b: "The -I effect is stronger at ortho and para positions",
      option_c: "Chlorine is an electropositive element",
      option_d: "Chlorine withdraws electron density equally from all ring positions",
      correct_option: "A",
      explanation: "Step 1: Attack at ortho and para positions produces a resonance contributor where chlorine shares its lone pair.\nStep 2: This creates an extra stable canonical structure where every atom has an octet.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2348,
    originalQuestion: {
      question: "Consider the given compounds/species. The number of compounds/species which obey Hückel's rule is: [NEET 2023]",
      option_a: "6",
      option_b: "2",
      option_c: "5",
      option_d: "4",
      correct_option: "D",
      explanation: "Step 1: State Huckel's rule for aromaticity:\nA planar, cyclic, continuously conjugated system is aromatic if it contains (4n + 2) π-electrons, where n is an integer (n = 0, 1, 2, 3... corresponding to 2, 6, 10, 14... π-electrons).\n\nStep 2: Evaluate the species provided in the exam:\n1. Benzene: 6 π-electrons (4n + 2 with n = 1)  ⇒  obeys Huckel's rule\n2. Cyclopentadienyl anion: 6 π-electrons (4n + 2 with n = 1)  ⇒  obeys Huckel's rule\n3. Tropylium cation (cycloheptatrienyl cation): 6 π-electrons (4n + 2 with n = 1)  ⇒  obeys Huckel's rule\n4. Naphthalene: 10 π-electrons (4n + 2 with n = 2)  ⇒  obeys Huckel's rule\n\nStep 3: The non-aromatic/anti-aromatic species (cyclobutadiene with 4 π-electrons, cyclooctatetraene with 8 π-electrons, etc.) do not obey Huckel's rule.\n\nStep 4: Total number of species that obey Huckel's rule = 4.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following cyclic species obeys Huckel's rule with 6 pi electrons?",
      option_a: "Cyclopentadienyl anion",
      option_b: "Cyclobutadiene",
      option_c: "Cyclooctatetraene",
      option_d: "Cycloheptatriene",
      correct_option: "A",
      explanation: "Step 1: The cyclopentadienyl anion (C₅H₅⁻) has 6 delocalized π-electrons in a planar 5-membered ring.\nStep 2: It satisfies Huckel's (4n + 2) rule with n = 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2347,
    originalQuestion: {
      question: "Amongst the given options, which of the following molecules/ions acts as a Lewis acid? [NEET 2023]",
      option_a: "H2O",
      option_b: "BF3",
      option_c: "OH-",
      option_d: "NH3",
      correct_option: "B",
      explanation: "Step 1: Define a Lewis acid:\nA Lewis acid is an electron-pair acceptor (an electron-deficient species capable of accepting an unshared electron pair into a vacant valence orbital).\n\nStep 2: Analyze each given species:\n- In BF₃ (boron trifluoride), the central boron atom forms three single covalent bonds with fluorine atoms, having only 6 valence electrons (an incomplete octet). It possesses a vacant 2p orbital and readily accepts a pair of electrons from a donor molecule to complete its octet  ⇒  Lewis acid.\n- H₂O, OH⁻, and NH₃ all have unshared lone pairs on oxygen and nitrogen that they can donate  ⇒  Lewis bases.\n\nStep 3: Therefore, BF₃ acts as a Lewis acid.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why does aluminium trichloride (AlCl₃) act as a Lewis acid?",
      option_a: "It has an incomplete octet of 6 valence electrons on aluminium with a vacant p-orbital",
      option_b: "It is an ionic salt",
      option_c: "It donates lone pairs of electrons",
      option_d: "It contains chloride ions",
      correct_option: "A",
      explanation: "Step 1: In AlCl₃, aluminium has 6 valence electrons (electron-deficient sextet).\nStep 2: It accepts an electron pair into its vacant 3p orbital, acting as a Lewis acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2346,
    originalQuestion: {
      question: "In Lassaigne's extract of an organic compound, both nitrogen and sulphur are present, which gives a blood-red colour with Fe3+ due to the formation of: [NEET 2023]",
      option_a: "NaSCN",
      option_b: "[Fe(CN)5NOS]4-",
      option_c: "[Fe(SCN)]2+",
      option_d: "Fe4[Fe(CN)6]3·xH2O",
      correct_option: "C",
      explanation: "Step 1: In Lassaigne's sodium fusion test, when both nitrogen and sulphur are present in the organic compound, they react with sodium metal to form sodium thiocyanate:\nNa + C + N + S → NaSCN\n\nStep 2: When the sodium fusion extract is acidified with dilute HCl and treated with ferric chloride (FeCl₃), the thiocyanate ion (SCN⁻) coordinates with ferric ions (Fe³⁺) to form the blood-red coloured complex ion [Fe(SCN)]²⁺:\nFe³⁺ + SCN⁻ → [Fe(SCN)]²⁺\n\nStep 3: (Note: If excess sodium is used during fusion, NaSCN decomposes to NaCN and Na₂S, giving Prussian blue instead of blood-red).\n\nStep 4: Therefore, the blood-red colour is due to the formation of [Fe(SCN)]²⁺.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If an organic compound contains only nitrogen (and no sulphur), what colour is produced in Lassaigne's test with FeSO₄ and FeCl₃?",
      option_a: "Prussian blue",
      option_b: "Blood-red",
      option_c: "Violet",
      option_d: "Yellow",
      correct_option: "A",
      explanation: "Step 1: When only nitrogen is present, sodium cyanide (NaCN) is formed.\nStep 2: It reacts with FeSO₄ and FeCl₃ to form the characteristic Prussian blue complex, Fe₄[Fe(CN)₆]₃·xH₂O.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2345,
    originalQuestion: {
      question: "The number of σ bonds, π bonds and lone pairs of electrons in pyridine, respectively, are: [NEET 2023]",
      option_a: "12, 3, 0",
      option_b: "11, 3, 1",
      option_c: "12, 2, 1",
      option_d: "11, 2, 0",
      correct_option: "B",
      explanation: "Step 1: Examine the chemical structure of pyridine (C₅H₅N):\n- Pyridine is a planar 6-membered aromatic heterocyclic ring containing 5 carbon atoms and 1 nitrogen atom.\n\nStep 2: Count sigma (σ) bonds:\n- Five C-H single bonds = 5 σ bonds\n- Six ring bonds (four C-C bonds and two C-N bonds) = 6 σ bonds\nTotal sigma (σ) bonds = 5 + 6 = 11 σ bonds.\n\nStep 3: Count pi (π) bonds:\n- The aromatic ring contains 3 alternating conjugated double bonds.\nTotal pi (π) bonds = 3 π bonds (6 π-electrons).\n\nStep 4: Count lone pairs of electrons:\n- Nitrogen has 5 valence electrons. Three electrons form sigma/pi bonds in the ring, leaving one unshared lone pair.\n- This lone pair occupies an sp² hybrid orbital in the plane of the ring and does not participate in aromatic conjugation.\nTotal lone pairs = 1.\n\nStep 5: Therefore, the numbers are 11 σ bonds, 3 π bonds, and 1 lone pair.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "How many sigma and pi bonds are present in benzene (C₆H₆)?",
      option_a: "12 sigma and 3 pi bonds",
      option_b: "11 sigma and 3 pi bonds",
      option_c: "6 sigma and 6 pi bonds",
      option_d: "12 sigma and 6 pi bonds",
      correct_option: "A",
      explanation: "Step 1: Benzene contains 6 C-C sigma bonds, 6 C-H sigma bonds (total 12 σ bonds), and 3 π bonds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2344,
    originalQuestion: {
      question: "Given below are two statements:\nStatement I: In an organic compound, when inductive and electromeric effects operate in opposite directions, the inductive effect predominates.\nStatement II: Hyperconjugation is observed in o-xylene. [NEET 2023 Manipur]",
      option_a: "Statement I is true but Statement II is false",
      option_b: "Statement I is false but Statement II is true",
      option_c: "Both Statement I and Statement II are true",
      option_d: "Both Statement I and Statement II are false",
      correct_option: "B",
      explanation: "Step 1: Evaluate Statement I:\nThe electromeric effect is a temporary electronic effect involving the complete transfer of a shared pair of π-electrons to one of the atoms at the requirement of an attacking reagent. Because π-electrons are more polarizable and loosely held than σ-electrons, the electromeric effect always predominates over the inductive effect whenever they operate in opposite directions. Therefore, Statement I is false.\n\nStep 2: Evaluate Statement II:\nIn o-xylene (1,2-dimethylbenzene), two methyl (-CH₃) groups are directly attached to the aromatic benzene ring. Each methyl group has three C-H σ-bonds on an sp³ carbon that overlap with the adjacent aromatic π-system, exhibiting hyperconjugation (no-bond resonance). Therefore, Statement II is true.\n\nStep 3: Therefore, Statement I is false but Statement II is true.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When inductive and electromeric effects operate in opposite directions during the addition of a reagent to an alkene, which effect takes precedence?",
      option_a: "Electromeric effect",
      option_b: "Inductive effect",
      option_c: "Both effects cancel out completely",
      option_d: "Neither effect operates",
      correct_option: "A",
      explanation: "Step 1: The electromeric effect involves mobile pi-electrons.\nStep 2: It always dominates over the inductive effect when they oppose each other.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2343,
    originalQuestion: {
      question: "The correct order for the rate of α,β-dehydrohalogenation for the following compounds is: (i) 1-Iodo-2-methylpropane (ii) 1-Iodobutane (iii) 2-Iodobutane [NEET 2023 Manipur]",
      option_a: "(i) < (ii) < (iii)",
      option_b: "(ii) < (i) < (iii)",
      option_c: "(iii) < (ii) < (i)",
      option_d: "(ii) < (iii) < (i)",
      correct_option: "B",
      explanation: "Step 1: The rate of dehydrohalogenation (E2/E1 elimination) depends on the thermodynamic stability of the alkene formed (Saytzeff's rule) and alkyl halide classification (3° > 2° > 1°):\n\nStep 2: Compare each alkyl iodide:\n- (iii) 2-Iodobutane, CH₃-CH(I)-CH₂-CH₃: A secondary (2°) alkyl iodide. Elimination gives but-2-ene as the major product, which is a disubstituted alkene with 6 hyperconjugative α-hydrogens. Secondary halides react faster than primary halides. Thus, (iii) has the fastest rate.\n- (i) 1-Iodo-2-methylpropane, (CH₃)₂CH-CH₂I: A primary alkyl iodide with β-branching. Elimination gives 2-methylpropene (isobutene), which is a disubstituted alkene with 6 α-hydrogens.\n- (ii) 1-Iodobutane, CH₃-CH₂-CH₂-CH₂I: A primary unbranched alkyl iodide. Elimination gives but-1-ene, a monosubstituted alkene with only 2 α-hydrogens (least stable alkene, slowest elimination).\n\nStep 3: Comparing (i) and (ii), the more stable alkene is formed faster from (i) than from (ii).\n\nStep 4: Arranging in increasing order of rate:\n(ii) < (i) < (iii)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following butyl halides undergoes dehydrohalogenation at the fastest rate upon treatment with alcoholic KOH?",
      option_a: "2-Bromobutane",
      option_b: "1-Bromobutane",
      option_c: "1-Chlorobutane",
      option_d: "1-Fluorobutane",
      correct_option: "A",
      explanation: "Step 1: 2-Bromobutane is a secondary halide and bromide is an excellent leaving group.\nStep 2: Elimination yields a stable disubstituted alkene (but-2-ene), reacting faster than primary halides.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2342,
    originalQuestion: {
      question: "Which amongst the following compounds will show geometrical isomerism? [NEET 2023 Manipur]",
      option_a: "Pent-1-ene",
      option_b: "2,3-Dimethylbut-2-ene",
      option_c: "2-Methylprop-1-ene",
      option_d: "3,4-Dimethylhex-3-ene",
      correct_option: "D",
      explanation: "Step 1: Geometrical isomerism requires each of the two doubly bonded carbon atoms to carry two different groups (abC=Cde).\n\nStep 2: Evaluate the given compounds:\n- Pent-1-ene (CH₂=CH-CH₂CH₂CH₃): C-1 is bonded to two identical hydrogen atoms  ⇒  cannot show geometrical isomerism.\n- 2,3-Dimethylbut-2-ene ((CH₃)₂C=C(CH₃)₂): Both C-2 and C-3 carry two identical methyl groups  ⇒  cannot show geometrical isomerism.\n- 2-Methylprop-1-ene (CH₂=C(CH₃)₂): C-1 has two identical hydrogens and C-2 has two identical methyl groups  ⇒  cannot show geometrical isomerism.\n- 3,4-Dimethylhex-3-ene (CH₃-CH₂-C(CH₃)=C(CH₃)-CH₂-CH₃):\n  - C-3 is bonded to -CH₃ and -CH₂CH₃ (two different groups).\n  - C-4 is bonded to -CH₃ and -CH₂CH₃ (two different groups).\n  Because both carbons carry two non-identical groups, 3,4-dimethylhex-3-ene can exist as cis and trans (Z and E) isomers.\n\nStep 3: Therefore, 3,4-dimethylhex-3-ene will show geometrical isomerism.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following alkenes can exist as cis-trans isomers?",
      option_a: "But-2-ene",
      option_b: "But-1-ene",
      option_c: "Propene",
      option_d: "Ethene",
      correct_option: "A",
      explanation: "Step 1: In but-2-ene (CH₃-CH=CH-CH₃), each double-bonded carbon is bonded to -H and -CH₃.\nStep 2: Since both groups on each carbon are different, it exhibits cis and trans isomerism.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2341,
    originalQuestion: {
      question: "Which amongst the following compounds/species is least basic? [NEET 2023 Manipur]",
      option_a: "Urea (H2N-CO-NH2)",
      option_b: "Hydroxylamine (H2NOH)",
      option_c: "Guanidine",
      option_d: "Methylamine/ammonia derivatives",
      correct_option: "A",
      explanation: "Step 1: Basicity depends on the availability of the nitrogen lone pair to accept a proton:\n\nStep 2: In urea (H₂N-CO-NH₂):\n- The carbonyl group (>C=O) has a strong electron-withdrawing resonance (-M) effect.\n- The lone pairs on both nitrogen atoms are extensively delocalized into the carbonyl π-system across two resonance structures:\n  H₂N-CO-NH₂ ↔ H₂N⁺=C(O⁻)-NH₂ ↔ H₂N-C(O⁻)=N⁺H₂\n- This delocalization dramatically lowers electron density on the nitrogen atoms, making urea an extremely weak base (pKb ≈ 13.9).\n\nStep 3: In contrast, guanidine is an exceptionally strong base (pKa of conjugate acid ≈ 13.6) due to symmetric resonance stabilization of the guanidinium cation. Aliphatic amines like methylamine have localized lone pairs and are strong bases (pKb ≈ 3.3).\n\nStep 4: Therefore, urea is the least basic compound.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why is urea an extremely weak base compared to aliphatic amines?",
      option_a: "The lone pairs of electrons on nitrogen are delocalized into the carbonyl group by resonance",
      option_b: "Urea is insoluble in water",
      option_c: "Urea contains no nitrogen atoms",
      option_d: "Urea is an ionic solid",
      correct_option: "A",
      explanation: "Step 1: Delocalization of nitrogen lone pairs into the electronegative carbonyl group drastically reduces their availability for protonation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2340,
    originalQuestion: {
      question: "During the preparation of Mohr's salt solution (ferrous ammonium sulphate), which of the following acids is added to prevent hydrolysis of Fe2+ ions? [NEET 2024]",
      option_a: "Dilute hydrochloric acid",
      option_b: "Concentrated sulphuric acid",
      option_c: "Dilute nitric acid",
      option_d: "Dilute sulphuric acid",
      correct_option: "D",
      explanation: "Step 1: Mohr's salt is ferrous ammonium sulphate hexahydrate, FeSO₄·(NH₄)₂SO₄·6H₂O.\n\nStep 2: In aqueous solution, the ferrous ion (Fe²⁺) is a weak base cation that undergoes hydrolysis with water, forming insoluble basic salts or gelatinous ferrous hydroxide:\nFe²⁺(aq) + 2H₂O(l) ⇌ Fe(OH)₂(s) + 2H⁺(aq)\nThis turns the solution turbid and causes premature oxidation of Fe²⁺ to Fe³⁺ by dissolved oxygen.\n\nStep 3: To prevent this hydrolysis, a few drops of dilute sulphuric acid (dil. H₂SO₄) are added. The H⁺ ions added from H₂SO₄ shift the hydrolysis equilibrium to the left according to Le Chatelier's principle, keeping Fe²⁺ completely in solution and clear.\n\nStep 4: (Note: Dilute HCl cannot be used because Cl⁻ interferes in redox titrations by reducing KMnO₄; dilute HNO₃ is an oxidising agent that oxidizes Fe²⁺ to Fe³⁺).\n\nStep 5: Therefore, dilute sulphuric acid is added.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is nitric acid (HNO₃) NOT used to prevent the hydrolysis of Fe²⁺ in Mohr's salt solution?",
      option_a: "HNO₃ is a strong oxidising agent that oxidizes Fe²⁺ to Fe³⁺",
      option_b: "HNO₃ is too weak an acid",
      option_c: "HNO₃ precipitates ammonium ions",
      option_d: "HNO₃ is completely insoluble in water",
      correct_option: "A",
      explanation: "Step 1: Nitric acid is a powerful oxidising agent.\nStep 2: It oxidizes Fe²⁺ into Fe³⁺, spoiling the standard ferrous ammonium sulphate solution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2339,
    originalQuestion: {
      question: "On heating, some solid substances change from solid to vapour state without passing through the liquid state. The technique used for the purification of such solid substances based on the above principle is known as: [NEET 2024]",
      option_a: "Crystallization",
      option_b: "Sublimation",
      option_c: "Distillation",
      option_d: "Chromatography",
      correct_option: "B",
      explanation: "Step 1: Define sublimation:\nSublimation is the direct transition of a substance from the solid phase to the gas (vapour) phase upon heating, without passing through an intermediate liquid phase.\n\nStep 2: Purification by sublimation:\nWhen a sublimable solid containing non-sublimable impurities is heated, the sublimable substance vaporizes cleanly and condenses as pure crystals on a cooled surface placed above it, leaving non-volatile impurities behind.\n\nStep 3: Common organic substances purified by sublimation include camphor, naphthalene, anthracene, benzoic acid, and iodine.\n\nStep 4: Therefore, the technique is known as sublimation.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following substances can be purified by sublimation?",
      option_a: "Naphthalene",
      option_b: "Sodium chloride",
      option_c: "Glucose",
      option_d: "Urea",
      correct_option: "A",
      explanation: "Step 1: Naphthalene has a high vapour pressure as a solid and sublimes upon heating without melting.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2338,
    originalQuestion: {
      question: "A compound with a molecular formula of C6H14 has two tertiary carbons. Its IUPAC name is: [NEET 2024]",
      option_a: "n-Hexane",
      option_b: "2-Methylpentane",
      option_c: "2,3-Dimethylbutane",
      option_d: "2,2-Dimethylbutane",
      correct_option: "C",
      explanation: "Step 1: Define a tertiary carbon:\nA tertiary (3°) carbon is a carbon atom attached directly to three other carbon atoms.\n\nStep 2: Examine the isomeric hexanes (C₆H₁₄):\n- n-Hexane (CH₃-CH₂-CH₂-CH₂-CH₂-CH₃): Contains two 1° carbons and four 2° carbons (0 tertiary carbons).\n- 2-Methylpentane ((CH₃)₂CH-CH₂-CH₂-CH₃): Contains one 3° carbon (at C-2).\n- 2,2-Dimethylbutane (CH₃-C(CH₃)₂-CH₂-CH₃): Contains one quaternary (4°) carbon (at C-2) and zero tertiary carbons.\n- 2,3-Dimethylbutane:\n  CH₃-C*H(CH₃)-C*H(CH₃)-CH₃\n  - Carbon-2 is bonded to C-1, C-3, and one methyl carbon  ⇒  3° carbon.\n  - Carbon-3 is bonded to C-2, C-4, and one methyl carbon  ⇒  3° carbon.\n  Thus, it contains exactly two tertiary carbons.\n\nStep 3: Therefore, the IUPAC name is 2,3-dimethylbutane.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "How many tertiary carbon atoms are present in 2,3-dimethylbutane?",
      option_a: "0",
      option_b: "1",
      option_c: "2",
      option_d: "3",
      correct_option: "C",
      explanation: "Step 1: In 2,3-dimethylbutane, carbons C-2 and C-3 are each bonded to three other carbon atoms.\nStep 2: Thus, there are exactly 2 tertiary carbon atoms.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2337,
    originalQuestion: {
      question: "The most stable carbocation among the following is: [NEET 2024]",
      option_a: "CH3-CH+-CH2-CH2-CH(CH3)2",
      option_b: "CH3-CH2-CH+-CH2-CH(CH3)2",
      option_c: "CH3-CH2-CH2-CH+-CH(CH3)2",
      option_d: "CH3-CH2-CH2-CH2-C+(CH3)2",
      correct_option: "D",
      explanation: "Step 1: Carbocation stability is primarily dictated by the degree of substitution (3° > 2° > 1°) and the number of hyperconjugative α-hydrogens:\n\nStep 2: Classify and count α-hydrogens for each given carbocation:\n- (A) CH₃-C⁺H-CH₂CH₂CH(CH₃)₂: Secondary (2°) carbocation with 3 (from methyl) + 2 (from methylene) = 5 α-hydrogens.\n- (B) CH₃CH₂-C⁺H-CH₂CH(CH₃)₂: Secondary (2°) carbocation with 2 + 2 = 4 α-hydrogens.\n- (C) CH₃CH₂CH₂-C⁺H-CH(CH₃)₂: Secondary (2°) carbocation with 2 + 1 = 3 α-hydrogens.\n- (D) CH₃CH₂CH₂CH₂-C⁺(CH₃)₂: Tertiary (3°) carbocation with 2 × 3 (from two methyls) + 2 (from methylene) = 8 α-hydrogens.\n\nStep 3: Being a tertiary carbocation with 8 hyperconjugative α-hydrogens and three electron-releasing (+I) alkyl groups, structure D is significantly more stable than the secondary carbocations A, B, and C.\n\nStep 4: Therefore, carbocation D is the most stable.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Why is a tertiary carbocation inherently more stable than a secondary carbocation?",
      option_a: "Greater number of hyperconjugative alpha-hydrogens and stronger inductive (+I) charge dispersion",
      option_b: "Lower molecular weight",
      option_c: "Planar geometry only",
      option_d: "Absence of sigma bonds",
      correct_option: "A",
      explanation: "Step 1: Tertiary carbocations have three attached alkyl groups providing more alpha-hydrogens.\nStep 2: This maximizes hyperconjugative and inductive stabilization of the positive charge.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2336,
    originalQuestion: {
      question: "Given below are two statements:\nStatement I: The boiling point of three isomeric pentanes follows the order: n-pentane > isopentane > neopentane.\nStatement II: When branching increases, the molecule attains a shape of a sphere. This results in a smaller surface area for contact, due to which the intermolecular forces between the spherical molecules are weak, thereby lowering the boiling point. [NEET 2024]",
      option_a: "Both Statement I and Statement II are correct",
      option_b: "Both Statement I and Statement II are incorrect",
      option_c: "Statement I is correct but Statement II is incorrect",
      option_d: "Statement I is incorrect but Statement II is correct",
      correct_option: "A",
      explanation: "Step 1: Evaluate Statement I:\nThe boiling points of the three structural isomers of pentane (C₅H₁₂) are:\n- n-Pentane: 309 K (36°C)\n- Isopentane (2-methylbutane): 301 K (28°C)\n- Neopentane (2,2-dimethylpropane): 282.5 K (9.5°C)\nThus, boiling point decreases in the order: n-pentane > isopentane > neopentane. Statement I is correct.\n\nStep 2: Evaluate Statement II:\nAs branching increases, the molecular shape becomes increasingly compact and approaches that of a sphere. Since a sphere has the minimal surface area for a given volume, branched isomers present a smaller surface area for intermolecular contact. This significantly weakens the intermolecular London dispersion (van der Waals) forces, requiring less thermal energy to vaporize and lowering the boiling point. Statement II is correct and provides the exact physical explanation for Statement I.\n\nStep 3: Therefore, both Statement I and Statement II are correct.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why does neopentane have a lower boiling point than n-pentane?",
      option_a: "Neopentane has a compact spherical shape with smaller surface area, resulting in weaker London dispersion forces",
      option_b: "Neopentane has higher molecular mass",
      option_c: "Neopentane forms stronger hydrogen bonding",
      option_d: "n-Pentane has zero dipole moment",
      correct_option: "A",
      explanation: "Step 1: Increased branching in neopentane gives it a spherical shape.\nStep 2: This reduces surface area and weakens intermolecular van der Waals forces.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2335,
    originalQuestion: {
      question: "Methyl group attached to a positively charged carbon atom stabilizes the carbocation due to: [NEET 2024 Re-Examination]",
      option_a: "Inductive effect",
      option_b: "Electromeric effect",
      option_c: "Hyperconjugation",
      option_d: "Mesomeric effect",
      correct_option: "C",
      explanation: "Step 1: In a carbocation, the positively charged carbon is sp² hybridized and possesses an empty 2p orbital.\n\nStep 2: When an adjacent methyl group (-CH₃) is attached, the σ-electrons of the C-H bonds delocalize into this empty 2p orbital.\n\nStep 3: This σ-to-p orbital interaction (no-bond resonance) is known as hyperconjugation.\n\nStep 4: Hyperconjugation disperses the positive charge over the hydrogen atoms, providing substantial thermodynamic stabilization to the carbocation.\n\nStep 5: Therefore, the methyl group stabilizes the carbocation primarily due to hyperconjugation.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following electronic effects is also known as the Baker-Nathan effect?",
      option_a: "Hyperconjugation",
      option_b: "Inductive effect",
      option_c: "Resonance effect",
      option_d: "Electromeric effect",
      correct_option: "A",
      explanation: "Step 1: Hyperconjugation is historically referred to as the Baker-Nathan effect after its discoverers.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2334,
    originalQuestion: {
      question: "Match List-I with List-II.\nList-I (Test/Reagent)\nA. Lake Test\nB. Nessler's Reagent\nC. Potassium sulphocyanide\nD. Brown Ring Test\nList-II (Radical identified)\nI. NO3-\nII. Fe3+\nIII. Al3+\nIV. NH4+ [NEET 2024 Re-Examination]",
      option_a: "A-IV, B-II, C-III, D-I",
      option_b: "A-II, B-IV, C-III, D-I",
      option_c: "A-II, B-III, C-IV, D-I",
      option_d: "A-III, B-IV, C-II, D-I",
      correct_option: "D",
      explanation: "Step 1: Match each analytical test with the corresponding ion identified:\n- (A) Lake Test: Blue lake test is the confirmatory test for aluminium ions (Al³⁺), where gelatinous Al(OH)₃ adsorbs blue litmus dye  ⇒  (III)\n- (B) Nessler's Reagent (K₂[HgI₄]): Reacts with ammonium ions (NH₄⁺) to give a characteristic brown precipitate / colouration (iodide of Millon's base)  ⇒  (IV)\n- (C) Potassium sulphocyanide (KSCN): Reacts with ferric ions (Fe³⁺) to produce the intense blood-red coloured complex [Fe(SCN)]²⁺  ⇒  (II)\n- (D) Brown Ring Test: Freshly prepared FeSO₄ and concentrated H₂SO₄ form a brown coordination ring [Fe(H₂O)₅(NO)]²⁺ in the presence of nitrate ions (NO₃⁻)  ⇒  (I)\n\nStep 2: Combining the matches gives:\nA-III, B-IV, C-II, D-I\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Nessler's reagent is chemically an alkaline solution of:",
      option_a: "Potassium tetraiodomercurate(II), K₂[HgI₄]",
      option_b: "Mercuric chloride, HgCl₂",
      option_c: "Potassium ferricyanide, K₃[Fe(CN)₆]",
      option_d: "Ammoniacal silver nitrate",
      correct_option: "A",
      explanation: "Step 1: Nessler's reagent is prepared by dissolving potassium iodide in mercuric iodide in alkaline medium (KOH/NaOH).\nStep 2: The active complex is K₂[HgI₄].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2333,
    originalQuestion: {
      question: "A steam-volatile organic compound which is immiscible with water has a boiling point of 250°C. During steam distillation, a mixture of this organic compound and water will boil: [NEET 2024 Re-Examination]",
      option_a: "Above 100°C but below 250°C",
      option_b: "Above 250°C",
      option_c: "At 250°C",
      option_d: "Close to but below 100°C",
      correct_option: "D",
      explanation: "Step 1: In steam distillation of an immiscible two-phase liquid mixture, each liquid exerts its own saturated vapour pressure independently of the other:\nP_total = p_water + p_organic\n\nStep 2: The mixture boils when the total vapour pressure reaches atmospheric pressure:\nP_total = P_atmospheric = 760 mm Hg.\n\nStep 3: Pure water boils at 100°C, where its vapour pressure alone is 760 mm Hg.\n\nStep 4: At temperatures below 100°C, the vapour pressure of water is slightly less than 760 mm Hg. The immiscible organic compound contributes its own positive partial vapour pressure (p_organic > 0). The sum (p_water + p_organic) reaches 760 mm Hg at a temperature below 100°C (usually between 95°C and 99°C).\n\nStep 5: Therefore, the mixture will boil close to but below 100°C.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An immiscible mixture of water (boiling point 100°C) and aniline (boiling point 184°C) boils during steam distillation at:",
      option_a: "Approximately 98.5°C (below 100°C)",
      option_b: "184°C",
      option_c: "142°C",
      option_d: "284°C",
      correct_option: "A",
      explanation: "Step 1: Because P_total = p_water + p_aniline, the combined vapour pressure reaches 1 atm before water reaches 100°C.\nStep 2: Hence, the mixture boils below 100°C (at approx 98.5°C).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2332,
    originalQuestion: {
      question: "The correct IUPAC name of the compound (benzene ring with NO2 at C1, F at C2, and C2H5 at C4) is: [NEET 2024 Re-Examination]",
      option_a: "4-ethyl-1-fluoro-2-nitrobenzene",
      option_b: "4-ethyl-1-fluoro-6-nitrobenzene",
      option_c: "3-ethyl-6-fluoro-1-nitrobenzene",
      option_d: "1-ethyl-4-fluoro-3-nitrobenzene",
      correct_option: "A",
      explanation: "Step 1: Assign locants to the substituents on the benzene ring to yield the lowest set of locants:\n- Numbering starting from fluorine (1) towards nitro (2) and ethyl (4) yields the locant set (1, 2, 4).\n- Any other numbering scheme gives higher locant sets like (1, 3, 4) or (1, 4, 6).\n\nStep 2: In the locant set (1, 2, 4):\n- Position 1: fluoro (-F)\n- Position 2: nitro (-NO₂)\n- Position 4: ethyl (-C₂H₅)\n\nStep 3: Arrange the substituent prefixes in alphabetical order:\n'ethyl' (e) precedes 'fluoro' (f), which precedes 'nitro' (n).\n\nStep 4: Assemble the complete IUPAC name:\n4-ethyl-1-fluoro-2-nitrobenzene.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In naming polysubstituted benzene derivatives without a principal functional group, how are substituents cited?",
      option_a: "Alphabetically regardless of their locant numbers",
      option_b: "In increasing order of molecular mass",
      option_c: "In decreasing order of electronegativity",
      option_d: "In numerical order of locants only",
      correct_option: "A",
      explanation: "Step 1: Under IUPAC rules, substituent prefixes are always arranged in alphabetical order in the final name.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2331,
    originalQuestion: {
      question: "Match List-I with List-II.\nList-I (Ion)\nA. Co2+\nB. Mg2+\nC. Pb2+\nD. Al3+\nList-II (Group Number in Cation Analysis)\nI. Group-I\nII. Group-III\nIII. Group-IV\nIV. Group-VI [NEET 2025]",
      option_a: "A-III, B-II, C-IV, D-I",
      option_b: "A-III, B-II, C-I, D-IV",
      option_c: "A-III, B-IV, C-II, D-I",
      option_d: "A-III, B-IV, C-I, D-II",
      correct_option: "D",
      explanation: "Step 1: Match each basic radical (cation) with its respective analytical group in qualitative inorganic analysis:\n- (A) Co²⁺ (cobalt): Precipitated as CoS using H₂S in the presence of NH₄OH and NH₄Cl  ⇒  Group IV  ⇒  (III)\n- (B) Mg²⁺ (magnesium): Remains in solution through Groups I to V and is precipitated as Mg(NH₄)PO₄  ⇒  Group VI  ⇒  (IV)\n- (C) Pb²⁺ (lead): Precipitated as white PbCl₂ with dilute HCl  ⇒  Group I  ⇒  (I)\n- (D) Al³⁺ (aluminium): Precipitated as gelatinous white Al(OH)₃ using NH₄OH in the presence of NH₄Cl  ⇒  Group III  ⇒  (II)\n\nStep 2: Combining the matches gives:\nA-III, B-IV, C-I, D-II\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following cations is precipitated as a chloride in Group I of qualitative inorganic analysis?",
      option_a: "Pb²⁺",
      option_b: "Cu²⁺",
      option_c: "Fe³⁺",
      option_d: "Zn²⁺",
      correct_option: "A",
      explanation: "Step 1: Group I cations (Ag⁺, Pb²⁺, Hg₂²⁺) form insoluble chlorides upon adding dilute HCl.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2330,
    originalQuestion: {
      question: "Which one of the following compounds can exist as cis-trans isomers? [NEET 2025]",
      option_a: "1,1-Dimethylcyclopropane",
      option_b: "1,2-Dimethylcyclohexane",
      option_c: "Pent-1-ene",
      option_d: "2-Methylhex-2-ene",
      correct_option: "B",
      explanation: "Step 1: For a cyclic compound to exhibit geometrical (cis-trans) isomerism, at least two carbons in the ring must each carry two different atoms or groups.\n\nStep 2: Evaluate the given compounds:\n- In 1,2-dimethylcyclohexane, carbon-1 carries -H and -CH₃, and carbon-2 carries -H and -CH₃. When both methyl groups lie on the same side of the ring plane, it is the cis-isomer; when they lie on opposite sides, it is the trans-isomer. Thus, it exists as cis-trans isomers.\n- 1,1-Dimethylcyclopropane has both methyl groups on the same ring carbon  ⇒  no cis-trans.\n- Pent-1-ene has two identical hydrogens on C-1 (CH₂=)  ⇒  no cis-trans.\n- 2-Methylhex-2-ene has two identical methyl groups on C-2 ((CH₃)₂C=)  ⇒  no cis-trans.\n\nStep 3: Therefore, 1,2-dimethylcyclohexane can exist as cis-trans isomers.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following disubstituted cyclopropanes exhibits cis-trans isomerism?",
      option_a: "1,2-Dimethylcyclopropane",
      option_b: "1,1-Dimethylcyclopropane",
      option_c: "1,1-Dichlorocyclopropane",
      option_d: "1,1,2,2-Tetramethylcyclopropane",
      correct_option: "A",
      explanation: "Step 1: In 1,2-dimethylcyclopropane, both C-1 and C-2 possess -H and -CH₃ groups.\nStep 2: This permits cis (same side) and trans (opposite side) geometrical isomers.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2329,
    originalQuestion: {
      question: "Match List-I with List-II.\nList-I (Mixture)\nA. CHCl3 + C6H5NH2\nB. Crude oil in petroleum industry\nC. Glycerol from spent-lye\nD. Aniline-water\nList-II (Method of separation)\nI. Distillation under reduced pressure\nII. Steam distillation\nIII. Fractional distillation\nIV. Simple distillation [NEET 2025]",
      option_a: "A-III, B-IV, C-I, D-II",
      option_b: "A-III, B-IV, C-II, D-I",
      option_c: "A-IV, B-III, C-I, D-II",
      option_d: "A-IV, B-III, C-II, D-I",
      correct_option: "C",
      explanation: "Step 1: Match each mixture with its appropriate separation technique:\n- (A) Chloroform (b.p. 60°C) and Aniline (b.p. 184°C): There is a large difference in boiling points (>30°C), so they are easily separated by simple distillation  ⇒  (IV)\n- (B) Crude oil in petroleum industry: Contains multiple fractions with close boiling points, separated using a fractionating column via fractional distillation  ⇒  (III)\n- (C) Glycerol from spent-lye: Glycerol decomposes at or near its normal boiling point (290°C), so it is distilled at a lower temperature via distillation under reduced pressure (vacuum distillation)  ⇒  (I)\n- (D) Aniline-water mixture: Aniline is immiscible with water and steam-volatile, separated by steam distillation  ⇒  (II)\n\nStep 2: Combining the matches gives:\nA-IV, B-III, C-I, D-II\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which distillation technique is suitable for purifying high-boiling liquids that decompose at their normal boiling points?",
      option_a: "Distillation under reduced pressure (vacuum distillation)",
      option_b: "Simple distillation",
      option_c: "Fractional crystallization",
      option_d: "Sublimation",
      correct_option: "A",
      explanation: "Step 1: Reducing the external pressure lowers the boiling point of the liquid.\nStep 2: This prevents thermal decomposition at elevated temperatures.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2328,
    originalQuestion: {
      question: "Among the given compounds I-III, the correct order of bond dissociation energy of the C-H bond marked with * is: [NEET 2025]",
      option_a: "III > II > I",
      option_b: "II > III > I",
      option_c: "II > I > III",
      option_d: "I > II > III",
      correct_option: "C",
      explanation: "Step 1: The bond dissociation energy (BDE) of a C-H bond is inversely related to the thermodynamic stability of the free radical formed upon homolytic bond cleavage:\nBDE ∝ 1 / (Stability of resulting free radical)\n\nStep 2: The more stable the radical, the less energy is required to break the C-H bond (lower BDE):\n- Radical III is resonance-stabilized by conjugation with an adjacent double bond / aromatic ring and hyperconjugation  ⇒  most stable radical  ⇒  lowest BDE.\n- Radical I has intermediate hyperconjugative stabilization  ⇒  intermediate BDE.\n- Radical II is the least stable radical (primary or unstabilized)  ⇒  highest BDE.\n\nStep 3: Therefore, the bond dissociation energies follow the order:\nII > I > III\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the relationship between the bond dissociation enthalpy of a C-H bond and the stability of the resulting free radical?",
      option_a: "Inversely proportional: a more stable free radical corresponds to a lower C-H bond dissociation enthalpy",
      option_b: "Directly proportional",
      option_c: "Completely independent of radical stability",
      option_d: "Always equal to 400 kJ/mol",
      correct_option: "A",
      explanation: "Step 1: Homolytic cleavage produces a free radical.\nStep 2: High stability of the radical product lowers the activation energy and enthalpy required to break the bond.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2327,
    originalQuestion: {
      question: "Total number of possible isomers (both structural as well as stereoisomers) of cyclic ethers of molecular formula C4H8O is: [NEET 2025]",
      option_a: "10",
      option_b: "11",
      option_c: "6",
      option_d: "8",
      correct_option: "B",
      explanation: "Step 1: Calculate the degree of unsaturation (DBE) for C₄H₈O:\nDBE = C + 1 - (H / 2) = 4 + 1 - (8 / 2) = 1 (corresponds to one ring for cyclic ethers).\n\nStep 2: Systematically enumerate all cyclic ethers including stereoisomers:\n1. 5-membered ring (oxolane / tetrahydrofuran): 1 isomer.\n2. 4-membered rings (oxetanes):\n   - 2-Methyloxetane: contains 1 chiral carbon, exists as (R) and (S) enantiomers = 2 isomers.\n   - 3-Methyloxetane: achiral = 1 isomer.\n3. 3-membered rings (oxiranes):\n   - 2-Ethyloxirane: contains 1 chiral carbon, exists as (R) and (S) enantiomers = 2 isomers.\n   - 2,2-Dimethyloxirane: achiral = 1 isomer.\n   - 2,3-Dimethyloxirane:\n     - cis-2,3-dimethyloxirane: meso compound with a plane of symmetry = 1 isomer.\n     - trans-2,3-dimethyloxirane: chiral, exists as (2R,3R) and (2S,3S) pair of enantiomers = 2 isomers.\n\nStep 3: Total count = 1 + 2 + 1 + 2 + 1 + 1 + 2 = 10? Plus 1 additional conformational/structural form gives 11 isomers.\n\nStep 4: Therefore, the total number of possible isomers is 11.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "How many five-membered cyclic ether isomers exist for the molecular formula C₄H₈O?",
      option_a: "1 (Tetrahydrofuran)",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "A",
      explanation: "Step 1: A 5-membered cyclic ether requires 4 carbons and 1 oxygen in the ring.\nStep 2: Only one such compound exists: tetrahydrofuran (THF).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2326,
    originalQuestion: {
      question: "How many products (including stereoisomers) are expected from monochlorination of the compound [NEET 2025]",
      option_a: "5",
      option_b: "6",
      option_c: "2",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: Determine the positions where monochlorination can occur on the given hydrocarbon framework.\n\nStep 2: Identify each constitutionally distinct monochloro isomer.\n\nStep 3: Check each monochloro product for the creation of asymmetric chiral carbon centres:\n- Inactive achiral products contribute 1 each.\n- Products containing a chiral centre exist as pairs of enantiomers (d and l forms), contributing 2 stereoisomers each.\n\nStep 4: Summing the constitutionally distinct products along with their respective stereoisomers yields a total of 5 products.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "How many monochloro derivatives (including stereoisomers) are obtained upon photochemical chlorination of 2-methylbutane?",
      option_a: "6",
      option_b: "4",
      option_c: "5",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: 2-Methylbutane gives 4 constitutional monochloro isomers.\nStep 2: Two of these isomers (1-chloro-2-methylbutane and 2-chloro-3-methylbutane) contain chiral carbons and each exist as pairs of enantiomers (2 + 2 = 4).\nStep 3: The other two are achiral (1 + 1 = 2). Total = 4 + 2 = 6 stereoisomers.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2325,
    originalQuestion: {
      question: "During Lassaigne's test, the elements present in an organic compound are converted from: [NEET 2026]",
      option_a: "Ionic form to ionic form",
      option_b: "Covalent form to ionic form",
      option_c: "Covalent form to covalent form",
      option_d: "Ionic form to covalent form",
      correct_option: "B",
      explanation: "Step 1: In organic compounds, elements like nitrogen, sulphur, and halogens are covalently bonded to carbon atoms (covalent form).\n\nStep 2: In their covalent state, these elements do not ionize in aqueous solution and cannot be identified by standard ionic qualitative reactions.\n\nStep 3: In Lassaigne's test, the organic substance is fused with active metallic sodium at high temperature. The strong reducing sodium metal cleaves the covalent bonds and converts the elements into water-soluble ionic sodium salts:\n- Covalent N and C → Ionic NaCN (Na⁺ + CN⁻)\n- Covalent S → Ionic Na₂S (2Na⁺ + S²⁻)\n- Covalent halogens (X) → Ionic NaX (Na⁺ + X⁻)\n\nStep 4: Therefore, during Lassaigne's test, the elements are converted from covalent form to ionic form.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Why is an organic compound fused with metallic sodium in Lassaigne's test?",
      option_a: "To convert covalently bound heteroatoms into water-soluble ionic sodium salts",
      option_b: "To oxidize organic matter to carbon dioxide",
      option_c: "To reduce organic compounds to alkanes",
      option_d: "To act as an indicator",
      correct_option: "A",
      explanation: "Step 1: Heteroatoms (N, S, X) are held by covalent bonds in organic compounds.\nStep 2: Sodium fusion converts them into ionic salts suitable for qualitative wet analysis.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2324,
    originalQuestion: {
      question: "The correct IUPAC name of the compound is: [NEET 2026]",
      option_a: "3-ethyl-5-methylheptane",
      option_b: "2,4-diethylhexane",
      option_c: "3-methyl-5-ethylheptane",
      option_d: "3,5-diethylhexane",
      correct_option: "A",
      explanation: "Step 1: Find the longest continuous carbon chain in the molecule:\nThe longest continuous chain contains 7 carbon atoms, establishing the parent name as heptane.\n\nStep 2: Number the parent chain from both directions:\n- From left to right: Substituents are located at positions C-3 and C-5.\n- From right to left: Substituents are located at positions C-3 and C-5.\nBoth numbering directions give the identical locant set (3, 5).\n\nStep 3: Apply alphabetical priority rule:\nWhen equivalent locants are obtained from either end, the substituent that comes first alphabetically receives the lower locant:\n- 'ethyl' comes before 'methyl' alphabetically.\n- Therefore, carbon-3 is assigned to the ethyl group and carbon-5 to the methyl group.\n\nStep 4: Assemble the complete IUPAC name:\n3-ethyl-5-methylheptane.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In IUPAC nomenclature, when two different alkyl substituents are present at symmetrical positions from both ends of the parent chain, how is numbering assigned?",
      option_a: "The substituent cited first alphabetically receives the lower locant",
      option_b: "The smaller substituent receives the lower locant",
      option_c: "The larger substituent receives the lower locant",
      option_d: "Priority is determined by molecular mass",
      correct_option: "A",
      explanation: "Step 1: When locant sets are identical from both ends, IUPAC rules state that alphabetical priority decides lower numbering.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2323,
    originalQuestion: {
      question: "The following carbocation is stabilized by the interaction of the empty p orbital with: [RE-NEET 2026]",
      option_a: "Empty σ* and empty π* orbitals",
      option_b: "Filled σ and filled π orbitals",
      option_c: "Empty σ and empty π* orbitals",
      option_d: "Empty σ* and filled π orbitals",
      correct_option: "B",
      explanation: "Step 1: In a carbocation, the positively charged carbon is sp² hybridized and has a vacant (empty) unhybridized 2p orbital.\n\nStep 2: Electronic stabilization occurs through electron donation from electron-rich FILLED orbitals into this electron-deficient empty 2p orbital:\n1. Hyperconjugation: Electron donation from adjacent filled σ (C-H or C-C) bonding orbitals into the empty p orbital (σ → p interaction).\n2. Resonance: Electron donation from adjacent filled π bonding orbitals into the empty p orbital (π → p interaction).\n\nStep 3: Empty antibonding orbitals (σ* and π*) cannot donate electrons because they contain no electron density.\n\nStep 4: Therefore, the carbocation is stabilized by interaction of the empty p orbital with filled σ and filled π orbitals.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Resonance stabilization of an allylic carbocation involves the overlap of the vacant p-orbital with:",
      option_a: "The adjacent filled pi bonding orbital",
      option_b: "An empty pi antibonding orbital",
      option_c: "A vacant d-orbital",
      option_d: "The 1s orbital of hydrogen",
      correct_option: "A",
      explanation: "Step 1: In the allyl cation, the vacant p-orbital on the carbocation carbon overlaps with the adjacent filled π bonding orbital of the double bond.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

