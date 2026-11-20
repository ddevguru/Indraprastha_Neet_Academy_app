// Chapter 54: Chemical Bonding - Part 1 (Q0 to Q38, IDs 452 to 414)
module.exports = [
  {
    id: 452,
    question: "Which of the following compounds has a planar structure? [AIPMT 2000]",
    option_a: "XeF₄",
    option_b: "XeOF₂",
    option_c: "XeO₂F₂",
    option_d: "XeO₄",
    correct_option: "A",
    explanation: "In xenon tetrafluoride (XeF₄), the central xenon atom has 8 valence electrons. It forms 4 single covalent bonds with fluorine atoms and retains 2 lone pairs.\nThe steric number is:\nSteric number = 4 (bond pairs) + 2 (lone pairs) = 6\nThis corresponds to sp³d² hybridization. According to VSEPR theory, the 2 lone pairs occupy axial positions opposite to each other (180°) to minimize repulsion, while the 4 fluorine atoms lie in the equatorial plane at 90° to each other.\nThis results in a square planar geometry, which is planar.\nIn contrast, XeOF₂ is T-shaped, XeO₂F₂ is see-saw, and XeO₄ is tetrahedral.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following xenon fluorides possesses a square planar geometry?",
      option_a: "XeF₄",
      option_b: "XeF₂",
      option_c: "XeF₆",
      option_d: "XeOF₄",
      correct_option: "A",
      explanation: "XeF₄ has 4 bond pairs and 2 lone pairs on the central Xe atom, resulting in an sp³d² hybridized square planar geometry. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 451,
    question: "Which of the following species does not exhibit paramagnetism? [AIPMT 2000]",
    option_a: "N₂⁺",
    option_b: "O₂⁻",
    option_c: "CO",
    option_d: "NO",
    correct_option: "C",
    explanation: "A species is paramagnetic if it has one or more unpaired electrons, and diamagnetic if all electrons are paired.\n1. N₂⁺ has 13 electrons (odd number), so it must have at least 1 unpaired electron (paramagnetic).\n2. O₂⁻ (superoxide ion) has 17 electrons (odd number), with 1 unpaired electron in a π* antibonding orbital (paramagnetic).\n3. NO has 15 electrons (odd number), with 1 unpaired electron in a π* orbital (paramagnetic).\n4. CO has 14 electrons (isoelectronic with N₂). Its molecular orbital electronic configuration is:\nσ1s² σ*1s² σ2s² σ*2s² π2p_x² = π2p_y² σ2p_z²\nAll 14 electrons are completely paired. Hence, CO is diamagnetic and does not exhibit paramagnetism.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following diatomic molecules or ions is diamagnetic according to molecular orbital theory?",
      option_a: "N₂",
      option_b: "O₂",
      option_c: "B₂",
      option_d: "O₂⁺",
      correct_option: "A",
      explanation: "N₂ has 14 electrons with all orbitals completely paired in its ground state MO configuration, making it diamagnetic. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 450,
    question: "The correct order of bond dissociation energy between N₂ and N₂⁺ is: [AIPMT 2000]",
    option_a: "N₂ > N₂⁺",
    option_b: "N₂ = N₂⁺",
    option_c: "N₂⁺ > N₂",
    option_d: "None of these",
    correct_option: "A",
    explanation: "Bond dissociation energy is directly proportional to bond order.\n1. For N₂ (14 electrons):\nMO configuration: σ1s² σ*1s² σ2s² σ*2s² π2p_x² = π2p_y² σ2p_z²\nNumber of bonding electrons N_b = 10, antibonding electrons N_a = 4.\nBond order = (N_b - N_a) / 2 = (10 - 4) / 2 = 3.0\n2. For N₂⁺ (13 electrons):\nOne electron is removed from the bonding σ2p_z molecular orbital:\nN_b = 9, N_a = 4.\nBond order = (9 - 4) / 2 = 2.5\nSince the bond order of N₂ (3.0) is higher than that of N₂⁺ (2.5), the bond in N₂ is stronger and requires more energy to dissociate:\nBond dissociation energy: N₂ > N₂⁺.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "According to Molecular Orbital Theory, compare the bond orders of O₂ and O₂⁺:",
      option_a: "O₂⁺ > O₂",
      option_b: "O₂ > O₂⁺",
      option_c: "O₂ = O₂⁺",
      option_d: "O₂⁺ = 1.5, O₂ = 2.5",
      correct_option: "A",
      explanation: "O₂ has 16 electrons (bond order 2.0). O₂⁺ has 15 electrons, with one electron removed from an antibonding orbital, giving bond order 2.5. Hence, O₂⁺ > O₂. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 449,
    question: "dπ-pπ bonding is present in which of the following species? [AIPMT 2000]",
    option_a: "CO₃²⁻",
    option_b: "PO₄³⁻",
    option_c: "NO₃⁻",
    option_d: "NO₂⁻",
    correct_option: "B",
    explanation: "A dπ-pπ bond forms when a vacant d-orbital of one atom overlaps sideways with a filled or half-filled p-orbital of another atom.\nSecond-period elements (C, N, O, B) have only 2s and 2p valence orbitals and lack d-orbitals; therefore, species containing only second-period central atoms (such as CO₃²⁻, NO₃⁻, and NO₂⁻) can only form pπ-pπ multiple bonds.\nPhosphorus (P) is a third-period element with valence shell configuration [Ne] 3s² 3p³ and has energetically accessible vacant 3d orbitals.\nIn the phosphate ion (PO₄³⁻), phosphorus uses its 3d orbitals to overlap sideways with the 2p orbitals of oxygen atoms, forming dπ-pπ bonds.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following oxoanions contains dπ-pπ bonds?",
      option_a: "SO₄²⁻",
      option_b: "CO₃²⁻",
      option_c: "NO₃⁻",
      option_d: "BO₃³⁻",
      correct_option: "A",
      explanation: "Sulfur is a third-period element with vacant 3d orbitals that overlap with the 2p orbitals of oxygen, forming dπ-pπ bonds in SO₄²⁻. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 448,
    question: "In the hydrogen-bonded system X-H···Y, where X and Y are both electronegative elements, which of the following is true? [AIPMT 2001]",
    option_a: "Electron density on X increases and on H decreases",
    option_b: "Electron density on both increases",
    option_c: "Electron density on both decreases",
    option_d: "Electron density on X decreases and on H increases",
    correct_option: "A",
    explanation: "In the covalent bond X-H, element X is strongly electronegative (such as F, O, or N). Because of its higher electronegativity, X strongly pulls the shared electron pair toward itself, developing a partial negative charge (δ⁻) while hydrogen acquires a partial positive charge (δ⁺).\nWhen hydrogen interacts with the lone pair on electronegative atom Y via hydrogen bonding (X-H···Y), this electrostatic attraction further polarizes the X-H bond, pulling the bonding electrons even closer to X.\nConsequently, the electron density on X increases, while the electron density on H decreases.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a hydrogen bond between two water molecules (O-H···O), the hydrogen atom carries:",
      option_a: "A partial positive charge",
      option_b: "A partial negative charge",
      option_c: "A full unit positive charge",
      option_d: "Zero net charge",
      correct_option: "A",
      explanation: "Due to the high electronegativity of oxygen, the O-H covalent bond is polarized, leaving hydrogen with a partial positive charge (δ⁺). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 447,
    question: "Nitrogen forms N₂ molecules, but phosphorus does not form P₂ molecules under normal conditions; instead, it forms P₄. The primary reason is that: [AIPMT 2001]",
    option_a: "Triple bond is present between phosphorus atoms",
    option_b: "pπ-pπ bonding is weak in phosphorus",
    option_c: "pπ-pπ bonding is strong in phosphorus",
    option_d: "Multiple bonds form easily between larger atoms",
    correct_option: "B",
    explanation: "Nitrogen atoms have small atomic radii, which allows their 2p orbitals to come very close and achieve effective sideways overlap to form strong pπ-pπ multiple bonds. As a result, nitrogen forms a stable diatomic molecule N≡N held by a triple bond.\nIn contrast, phosphorus atoms are much larger in size with more diffuse 3p orbitals. The interatomic distance in P-P is relatively large, which makes sideways 3pπ-3pπ overlap extremely weak and ineffective.\nConsequently, phosphorus prefers to form three single P-P sigma bonds rather than a triple bond, organizing into a stable tetrahedral P₄ molecule.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Why does nitrogen exist as a diatomic gas while phosphorus exists as a tetra-atomic solid at room temperature?",
      option_a: "Nitrogen can form strong pπ-pπ multiple bonds, whereas phosphorus cannot",
      option_b: "Nitrogen has vacant d-orbitals while phosphorus does not",
      option_c: "Phosphorus has a higher ionization enthalpy than nitrogen",
      option_d: "Nitrogen forms tetrahedral clusters naturally",
      correct_option: "A",
      explanation: "Because of its small size, nitrogen readily forms strong pπ-pπ multiple bonds (N≡N), whereas phosphorus cannot form efficient sideways overlap and instead forms single P-P bonds in P₄. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 446,
    question: "In which of the following species is the bond angle maximum? [AIPMT 2001]",
    option_a: "NH₃",
    option_b: "NH₄⁺",
    option_c: "PCl₃",
    option_d: "SCl₂",
    correct_option: "B",
    explanation: "Let us examine the hybridization, geometry, and bond angles of each species:\n1. NH₄⁺: The central nitrogen atom has 4 bond pairs and 0 lone pairs. It is sp³ hybridized and has a regular tetrahedral geometry with no lone-pair distortions, so its bond angle is the ideal tetrahedral angle of 109.5° (109°28').\n2. NH₃: It has 3 bond pairs and 1 lone pair (sp³ hybridized). Lone pair-bond pair repulsion compresses the H-N-H bond angle to approximately 107°.\n3. PCl₃: It has 3 bond pairs and 1 lone pair on phosphorus. Because phosphorus is larger and less electronegative than nitrogen, the bond pairs are further from the center, leading to an even smaller bond angle of approximately 100°.\n4. SCl₂: It has 2 bond pairs and 2 lone pairs on sulfur. Strong lone pair-lone pair repulsion reduces the Cl-S-Cl angle to around 102°.\nThus, NH₄⁺ has the maximum bond angle (109.5°).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following hydrides has the largest bond angle?",
      option_a: "CH₄",
      option_b: "NH₃",
      option_c: "H₂O",
      option_d: "H₂S",
      correct_option: "A",
      explanation: "CH₄ has zero lone pairs and an ideal tetrahedral bond angle of 109.5°, which is greater than NH₃ (107°), H₂O (104.5°), and H₂S (92°). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 445,
    question: "Which of the following pairs of species are isostructural? [AIPMT 2001]",
    option_a: "XeF₂, I₃⁻",
    option_b: "NH₃, BF₃",
    option_c: "CO₃²⁻, SO₃²⁻",
    option_d: "PCl₅, ICl₅",
    correct_option: "A",
    explanation: "Two species are isostructural if they have the same shape and geometry:\n1. XeF₂: Xe has 8 valence electrons + 2 from fluorines = 10 electrons (5 pairs). Steric number = 2 (bond pairs) + 3 (lone pairs) = 5 (sp³d hybridization). The 3 lone pairs occupy equatorial positions, making the molecular geometry linear (F-Xe-F angle = 180°).\n2. I₃⁻: The central iodine has 7 valence electrons + 1 (negative charge) + 2 from terminal iodines = 10 electrons (5 pairs). Steric number = 2 (bond pairs) + 3 (lone pairs) = 5 (sp³d hybridization). The 3 lone pairs occupy equatorial positions, giving a linear geometry.\nThus, XeF₂ and I₃⁻ are both linear and isostructural.\nFor comparison, NH₃ is pyramidal while BF₃ is trigonal planar; CO₃²⁻ is planar while SO₃²⁻ is pyramidal; PCl₅ is trigonal bipyramidal while ICl₅ is square pyramidal.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs have the same linear molecular shape?",
      option_a: "CO₂ and BeCl₂",
      option_b: "SO₂ and CO₂",
      option_c: "H₂O and BeCl₂",
      option_d: "O₃ and CO₂",
      correct_option: "A",
      explanation: "Both CO₂ and BeCl₂ are sp hybridized with zero lone pairs on the central atom, giving a linear shape (180°). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 444,
    question: "Which of the following pairs are isoelectronic? [AIPMT 2002]",
    option_a: "CO₂, NO₂",
    option_b: "NO₂⁻, CO₂",
    option_c: "CN⁻, CO",
    option_d: "SO₂, CO₂",
    correct_option: "C",
    explanation: "Isoelectronic species possess the same total number of electrons:\n1. CN⁻: Carbon (6) + Nitrogen (7) + 1 (negative charge) = 6 + 7 + 1 = 14 electrons.\n2. CO: Carbon (6) + Oxygen (8) = 6 + 8 = 14 electrons.\nBoth CN⁻ and CO have 14 electrons, so they are isoelectronic.\nLet us check the others:\n- CO₂: 6 + 2(8) = 22 electrons; NO₂: 7 + 2(8) = 23 electrons.\n- NO₂⁻: 7 + 2(8) + 1 = 24 electrons; CO₂: 22 electrons.\n- SO₂: 16 + 2(8) = 32 electrons; CO₂: 22 electrons.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species is isoelectronic with N₂ (14 electrons)?",
      option_a: "CN⁻",
      option_b: "O₂",
      option_c: "NO",
      option_d: "O₂⁺",
      correct_option: "A",
      explanation: "CN⁻ has 6 + 7 + 1 = 14 electrons, matching the 14 electrons of N₂. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 443,
    question: "In the NO₃⁻ ion, the number of bond pairs and lone pairs of electrons on the nitrogen atom are respectively: [AIPMT 2002]",
    option_a: "2, 2",
    option_b: "3, 1",
    option_c: "1, 3",
    option_d: "4, 0",
    correct_option: "D",
    explanation: "In the nitrate ion (NO₃⁻), nitrogen is the central atom with 5 valence electrons.\nIn the resonance structures of NO₃⁻:\n- Nitrogen forms one double bond (sharing 2 electron pairs) with one oxygen atom.\n- Nitrogen forms a single coordinate covalent / polarized bond (sharing 1 electron pair) with the second oxygen atom.\n- Nitrogen forms a single covalent bond with the third (negatively charged) oxygen atom (sharing 1 electron pair).\nTotal number of shared electron pairs (bond pairs) around the central nitrogen atom = 2 + 1 + 1 = 4 bond pairs.\nAll 5 valence electrons of nitrogen (plus the formal participation) are involved in bonding, leaving 0 lone pairs on the nitrogen atom (steric number = 3 for sp² hybridization, with 4 shared pairs across 3 bonding directions).\nThus, on the nitrogen atom, there are 4 bond pairs and 0 lone pairs.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In the ammonium ion (NH₄⁺), the number of bond pairs and lone pairs on the central nitrogen atom are:",
      option_a: "4, 0",
      option_b: "3, 1",
      option_c: "2, 2",
      option_d: "4, 1",
      correct_option: "A",
      explanation: "In NH₄⁺, nitrogen forms 4 covalent bonds with four hydrogen atoms using all its valence electrons, leaving 0 lone pairs. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 442,
    question: "Which of the following species has pπ-dπ bonding? [AIPMT 2002]",
    option_a: "NO₃⁻",
    option_b: "SO₃²⁻",
    option_c: "BO₃³⁻",
    option_d: "CO₃²⁻",
    correct_option: "B",
    explanation: "pπ-dπ bonding occurs when an atom from period 3 or higher, possessing vacant d-orbitals, accepts electron density from the filled p-orbitals of a second-period donor atom (such as oxygen).\n- Central atoms in NO₃⁻ (N), BO₃³⁻ (B), and CO₃²⁻ (C) belong to the second period (n = 2) and have no d-orbitals in their valence shell. Hence, they can only form pπ-pπ bonds.\n- In the sulfite ion (SO₃²⁻), the central sulfur atom belongs to the third period ([Ne] 3s² 3p⁴) and has vacant 3d orbitals.\nIn SO₃²⁻, sulfur forms one S=O double bond where the pi component arises from sideways overlap between a sulfur 3d orbital and an oxygen 2p orbital (pπ-dπ bond).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules contains pπ-dπ bonding?",
      option_a: "SO₂",
      option_b: "CO₂",
      option_c: "NO₂",
      option_d: "O₃",
      correct_option: "A",
      explanation: "SO₂ contains sulfur which utilizes vacant 3d orbitals to form a pπ-dπ bond with oxygen 2p orbitals. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 441,
    question: "Which of the following statements is not correct for sigma (σ) and pi (π) bonds formed between two carbon atoms? [AIPMT 2003]",
    option_a: "Sigma bond is stronger than pi bond",
    option_b: "Bond energies of sigma and pi bonds are of the order of 264 kJ/mol and 347 kJ/mol respectively",
    option_c: "Free rotation of atoms about a sigma bond is allowed but not in the case of a pi bond",
    option_d: "Sigma bond determines the direction between carbon atoms, but pi bond has no primary effect in this regard",
    correct_option: "B",
    explanation: "Let us evaluate each statement:\n1. Option (A): A sigma bond is formed by head-on (axial) overlap of atomic orbitals, resulting in a large extent of overlap, whereas a pi bond is formed by sideways (lateral) overlap, which is less effective. Hence, a sigma bond is inherently stronger than a pi bond. This is correct.\n2. Option (B): For a C-C single bond (sigma bond), the bond energy is approximately 347 kJ/mol. For a C=C double bond (~611 kJ/mol), the additional contribution from the pi bond is approximately 611 - 347 = 264 kJ/mol. Thus, the sigma bond energy is ~347 kJ/mol and the pi bond energy is ~264 kJ/mol. Statement (B) reverses these values, falsely stating that the sigma bond is 264 kJ/mol and the pi bond is 347 kJ/mol. Hence, this statement is not correct.\n3. Option (C): Cylindrical electron symmetry about the internuclear axis allows free rotation around a sigma bond, whereas a pi bond restricts rotation due to parallel p-orbital alignment. This is correct.\n4. Option (D): Hybrid orbitals forming sigma bonds establish the primary molecular framework and bond angles. This is correct.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which type of covalent bond allows free rotation of bonded atoms about the internuclear axis?",
      option_a: "Sigma bond",
      option_b: "Pi bond",
      option_c: "Delta bond",
      option_d: "Hydrogen bond",
      correct_option: "A",
      explanation: "Because a sigma bond has cylindrical electron density along the internuclear axis, rotation around the bond axis does not break or alter the orbital overlap. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 440,
    question: "In the BrF₃ molecule, the lone pairs occupy equatorial positions to minimise: [AIPMT 2004]",
    option_a: "Lone pair-bond pair repulsion only",
    option_b: "Bond pair-bond pair repulsion only",
    option_c: "Lone pair-lone pair repulsion and lone pair-bond pair repulsion",
    option_d: "Lone pair-lone pair repulsion only",
    correct_option: "C",
    explanation: "In bromine trifluoride (BrF₃), bromine has 7 valence electrons and forms 3 single bonds with fluorine, leaving 2 lone pairs.\nSteric number = 3 (bond pairs) + 2 (lone pairs) = 5 (sp³d hybridization, trigonal bipyramidal electron geometry).\nAccording to VSEPR theory:\n1. Repulsion orders are: (lp - lp) > (lp - bp) > (bp - bp).\n2. In a trigonal bipyramidal geometry, equatorial positions make larger bond angles of 120° with each other, whereas axial positions make 90° angles with equatorial positions.\n3. If lone pairs were placed in axial positions, they would exert strong 90° repulsions against three equatorial bond pairs.\n4. By placing both lone pairs in equatorial positions, the angle between the two lone pairs is 120° (completely eliminating severe 90° lp - lp repulsions) and minimizing 90° lp - bp repulsions.\nThus, lone pairs occupy equatorial positions to minimize both lone pair-lone pair repulsion and lone pair-bond pair repulsion.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In ClF₃, why do the two lone pairs on the central chlorine atom reside in equatorial positions?",
      option_a: "To minimize lone pair-lone pair and lone pair-bond pair repulsions at 90°",
      option_b: "Because equatorial bonds are longer than axial bonds",
      option_c: "To maximize dipole moment",
      option_d: "Due to d-orbital contraction",
      correct_option: "A",
      explanation: "Placing lone pairs in equatorial positions keeps the lp-lp angle at 120° and minimizes repulsions at 90°. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 439,
    question: "H₂O is dipolar (polar), whereas BeF₂ is not. This is because: [AIPMT 2004]",
    option_a: "Electronegativity of F is greater than that of O",
    option_b: "H₂O involves hydrogen bonding whereas BeF₂ is a discrete molecule",
    option_c: "H₂O is linear and BeF₂ is angular",
    option_d: "H₂O is angular and BeF₂ is linear",
    correct_option: "D",
    explanation: "Dipole moment depends on both bond polarity and the spatial geometry of the molecule:\n1. In BeF₂, beryllium is sp hybridized with 2 bond pairs and 0 lone pairs. It possesses a strictly linear geometry (F-Be-F angle = 180°). The two equal Be-F bond dipoles point in exactly opposite directions and cancel each other out completely, resulting in a net dipole moment of zero (μ = 0, nonpolar).\n2. In H₂O, oxygen is sp³ hybridized with 2 bond pairs and 2 lone pairs. According to VSEPR theory, lone pair-lone pair repulsion compresses the H-O-H bond angle to 104.5°, giving an angular (bent or V-shaped) geometry. The two O-H bond dipole vectors do not cancel, but add vectorially to yield a substantial net dipole moment (μ ≈ 1.85 D, dipolar).\nThus, H₂O is dipolar because it is angular, while BeF₂ is nonpolar because it is linear.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following triatomic molecules has a net zero dipole moment due to its linear geometry?",
      option_a: "CO₂",
      option_b: "SO₂",
      option_c: "H₂O",
      option_d: "O₃",
      correct_option: "A",
      explanation: "CO₂ is linear (sp hybridized, O=C=O), so its two equal and opposite C=O bond dipole vectors cancel to give μ = 0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 438,
    question: "In a regular octahedral molecule MX₆, the number of X-M-X bond angles of 180° is: [AIPMT 2004]",
    option_a: "Three",
    option_b: "Two",
    option_c: "Six",
    option_d: "Four",
    correct_option: "A",
    explanation: "A regular octahedral molecule MX₆ has 6 ligands arranged along three mutually perpendicular Cartesian axes (x, y, and z) with the central metal atom M at the origin.\nAlong each axis, there is a pair of trans ligands opposite to each other across the central atom:\n1. One pair along the x-axis: X_left - M - X_right (angle = 180°)\n2. One pair along the y-axis: X_front - M - X_back (angle = 180°)\n3. One pair along the z-axis: X_top - M - X_bottom (angle = 180°)\nEach of these three trans pairs forms an X-M-X bond angle of 180°.\n(The remaining 12 adjacent X-M-X bond angles are each 90°).\nThus, there are exactly three 180° bond angles in MX₆.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In an SF₆ molecule, how many F-S-F bond angles are equal to 90°?",
      option_a: "12",
      option_b: "6",
      option_c: "8",
      option_d: "4",
      correct_option: "A",
      explanation: "In an octahedral SF₆ molecule, each of the 4 equatorial fluorines forms 90° angles with 2 axial fluorines (8 angles), and 4 angles exist between adjacent equatorial fluorines, totaling 8 + 4 = 12 angles of 90°. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 437,
    question: "Among the following pairs, in which pair are the two species not isostructural? [AIPMT 2004]",
    option_a: "SiF₄ and SF₄",
    option_b: "IO₃⁻ and XeO₃",
    option_c: "BH₄⁻ and NH₄⁺",
    option_d: "PF₆⁻ and SF₆",
    correct_option: "A",
    explanation: "Let us examine the structures of each pair:\n1. Option (A):\n- SiF₄: Central Si has 4 valence electrons and forms 4 bond pairs with 0 lone pairs. Steric number = 4 (sp³ hybridization), giving a regular tetrahedral geometry.\n- SF₄: Central S has 6 valence electrons, forming 4 bond pairs and retaining 1 lone pair. Steric number = 5 (sp³d hybridization), giving a see-saw geometry.\nSince tetrahedral and see-saw are distinct geometries, SiF₄ and SF₄ are not isostructural.\n2. Option (B): IO₃⁻ and XeO₃ both have 3 bond pairs and 1 lone pair (sp³), both are trigonal pyramidal (isostructural).\n3. Option (C): BH₄⁻ and NH₄⁺ both have 4 bond pairs and 0 lone pairs (sp³), both are tetrahedral (isostructural).\n4. Option (D): PF₆⁻ and SF₆ both have 6 bond pairs and 0 lone pairs (sp³d²), both are octahedral (isostructural).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs has different molecular geometries?",
      option_a: "CH₄ and SF₄",
      option_b: "BF₄⁻ and NH₄⁺",
      option_c: "CO₂ and BeCl₂",
      option_d: "PCl₆⁻ and SF₆",
      correct_option: "A",
      explanation: "CH₄ is tetrahedral (sp³, 4 bp), while SF₄ is see-saw (sp³d, 4 bp + 1 lp). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 436,
    question: "Which of the following would have a permanent dipole moment? [AIPMT 2005]",
    option_a: "SiF₄",
    option_b: "SF₄",
    option_c: "XeF₄",
    option_d: "BF₃",
    correct_option: "B",
    explanation: "A molecule possesses a permanent dipole moment if its individual bond dipoles do not cancel out due to lack of symmetry:\n1. SiF₄: Regular tetrahedral geometry (sp³, 0 lone pairs). Highly symmetric, all four Si-F bond dipoles cancel out completely (μ = 0).\n2. SF₄: See-saw geometry (sp³d, 4 bond pairs + 1 lone pair in an equatorial position). The asymmetric distribution of fluorine atoms and the lone pair means the bond dipoles do not cancel, giving a net permanent dipole moment (μ ≠ 0).\n3. XeF₄: Square planar geometry (sp³d², 4 bond pairs + 2 axial lone pairs). Symmetric trans arrangement cancels all dipoles (μ = 0).\n4. BF₃: Trigonal planar geometry (sp², 0 lone pairs). Symmetric 120° arrangement cancels all dipoles (μ = 0).\nThus, SF₄ is the only molecule with a permanent dipole moment.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules has a non-zero dipole moment?",
      option_a: "NF₃",
      option_b: "CCl₄",
      option_c: "BeF₂",
      option_d: "BF₃",
      correct_option: "A",
      explanation: "NF₃ has a trigonal pyramidal shape with a lone pair on nitrogen, preventing dipole cancellation and resulting in a permanent dipole moment (μ ≠ 0). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 435,
    question: "The correct sequence of increasing covalent character is represented by: [AIPMT 2005]",
    option_a: "LiCl < NaCl < BeCl₂",
    option_b: "BeCl₂ < LiCl < NaCl",
    option_c: "NaCl < LiCl < BeCl₂",
    option_d: "BeCl₂ < NaCl < LiCl",
    correct_option: "C",
    explanation: "According to Fajan's rules, covalent character in an ionic compound increases with:\n1. Smaller cation size\n2. Higher cation charge\nBoth factors increase the polarizing power of the cation, which distorts the electron cloud of the anion (Cl⁻) and introduces greater covalent character.\nComparing the cations Na⁺, Li⁺, and Be²⁺:\n- Na⁺ and Li⁺ both carry a +1 charge, but Li⁺ is smaller than Na⁺ (r_Li⁺ < r_Na⁺), so Li⁺ has higher polarizing power than Na⁺. Hence, LiCl is more covalent than NaCl.\n- Be²⁺ has a higher charge (+2) and a very small ionic radius (r_Be²⁺ << r_Li⁺), giving it the highest polarizing power of all three.\nThus, polarizing power increases in the order: Na⁺ < Li⁺ < Be²⁺.\nConsequently, covalent character increases in the order: NaCl < LiCl < BeCl₂.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "According to Fajan's rules, which of the following halides has the maximum covalent character?",
      option_a: "AlCl₃",
      option_b: "MgCl₂",
      option_c: "NaCl",
      option_d: "KCl",
      correct_option: "A",
      explanation: "Al³⁺ has the highest charge (+3) and smallest ionic radius, giving it the highest polarizing power and greatest covalent character among the group. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 434,
    question: "The surface tension of which of the following liquids is maximum? [AIPMT 2005]",
    option_a: "C₂H₅OH",
    option_b: "CH₃OH",
    option_c: "H₂O",
    option_d: "C₆H₆",
    correct_option: "C",
    explanation: "Surface tension is a measure of the cohesive intermolecular forces holding the molecules of a liquid together at its surface.\n1. Water (H₂O) has two hydrogen atoms and two lone pairs on each oxygen atom, allowing each water molecule to form up to four strong hydrogen bonds in an extensive three-dimensional network.\n2. Alcohols (CH₃OH, C₂H₅OH) have only one -OH group and bulky non-polar alkyl groups, forming only linear chains of hydrogen bonds with much lower cohesive strength.\n3. Benzene (C₆H₆) is nonpolar and held together only by weak London dispersion forces.\nBecause of its extensive, highly cohesive 3D hydrogen-bonding network, water exhibits the highest surface tension (~72.8 mN/m at 20 °C) among all the given liquids.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following substances exhibits the highest boiling point and surface tension due to extensive hydrogen bonding?",
      option_a: "Water",
      option_b: "Ethanol",
      option_c: "Diethyl ether",
      option_d: "Acetone",
      correct_option: "A",
      explanation: "Water forms an extensive 4-coordinate hydrogen-bonded network per molecule, resulting in exceptionally high cohesion, boiling point, and surface tension. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 433,
    question: "The correct order in which the O-O bond length increases is: [AIPMT 2005]",
    option_a: "O₂ < H₂O₂ < O₃",
    option_b: "O₃ < H₂O₂ < O₂",
    option_c: "H₂O₂ < O₂ < O₃",
    option_d: "O₂ < O₃ < H₂O₂",
    correct_option: "D",
    explanation: "Bond length is inversely related to bond order:\nHigher bond order corresponds to a stronger, shorter covalent bond.\n1. In O₂ (dioxygen), the two oxygen atoms are linked by a double bond (O=O). Bond order = 2.0; O-O bond length = 121 pm.\n2. In O₃ (ozone), resonance between two canonical forms gives each O-O bond an intermediate bond order of 1.5; O-O bond length = 128 pm.\n3. In H₂O₂ (hydrogen peroxide, H-O-O-H), the two oxygen atoms are linked by a single covalent bond (O-O). Bond order = 1.0; O-O bond length = 148 pm.\nTherefore, as bond order decreases (2.0 -> 1.5 -> 1.0), the O-O bond length increases in the order:\nO₂ < O₃ < H₂O₂.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the correct increasing order of bond lengths among single, double, and triple carbon-carbon bonds?",
      option_a: "C≡C < C=C < C-C",
      option_b: "C-C < C=C < C≡C",
      option_c: "C=C < C≡C < C-C",
      option_d: "C-C < C≡C < C=C",
      correct_option: "A",
      explanation: "Higher bond order yields shorter bond length: triple bond (120 pm) < double bond (134 pm) < single bond (154 pm). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 432,
    question: "Which of the following molecules has a trigonal planar geometry? [AIPMT 2005]",
    option_a: "BF₃",
    option_b: "NH₃",
    option_c: "PCl₃",
    option_d: "IF₃",
    correct_option: "A",
    explanation: "Let us examine the geometry of each molecule:\n1. BF₃: Boron has 3 valence electrons and forms 3 single bonds with fluorine atoms, with 0 lone pairs. Steric number = 3 (sp² hybridization). The three B-F bonds arrange symmetrically at 120° angles in a single plane, producing a trigonal planar geometry.\n2. NH₃: Nitrogen has 3 bond pairs and 1 lone pair (sp³ hybridization), resulting in a trigonal pyramidal shape.\n3. PCl₃: Phosphorus has 3 bond pairs and 1 lone pair (sp³ hybridization), resulting in a trigonal pyramidal shape.\n4. IF₃: Iodine has 3 bond pairs and 2 lone pairs (sp³d hybridization), resulting in a T-shaped geometry.\nThus, BF₃ is trigonal planar.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species has sp² hybridization and a trigonal planar geometry?",
      option_a: "BCl₃",
      option_b: "NCl₃",
      option_c: "PCl₃",
      option_d: "AsCl₃",
      correct_option: "A",
      explanation: "BCl₃ has 3 bond pairs and 0 lone pairs on the central boron atom, giving an sp² hybridized trigonal planar shape. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 431,
    question: "The electronegativity difference between N and F is greater than that between N and H, yet the dipole moment of NH₃ (1.47 D) is larger than that of NF₃ (0.24 D). This is because: [AIPMT 2006]",
    option_a: "In NH₃ the atomic dipole and bond dipole are in opposite directions, whereas in NF₃ they are in the same direction",
    option_b: "In NH₃ as well as NF₃, the atomic dipole and bond dipole are in the same direction",
    option_c: "In NH₃ the atomic dipole and bond dipole are in the same direction, whereas in NF₃ they are in opposite directions",
    option_d: "In NH₃ as well as NF₃, the atomic dipole and bond dipole are in opposite directions",
    correct_option: "C",
    explanation: "Both NH₃ and NF₃ have a trigonal pyramidal geometry with one lone pair on the central nitrogen atom:\n1. In NH₃, nitrogen is more electronegative than hydrogen. The three N-H bond dipoles point toward nitrogen. The orbital dipole of the lone pair also points upward away from nitrogen in the same direction. Thus, the bond dipoles and the lone-pair dipole add constructively, producing a large net dipole moment (μ = 1.47 D).\n2. In NF₃, fluorine is more electronegative than nitrogen. The three N-F bond dipoles point downward away from nitrogen toward fluorine. The lone-pair orbital dipole points upward away from nitrogen in the opposite direction. Thus, the lone-pair dipole opposes and largely cancels the resultant of the N-F bond dipoles, resulting in a very small net dipole moment (μ = 0.24 D).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Why does NF₃ have a much smaller dipole moment than NH₃?",
      option_a: "The lone-pair dipole opposes the N-F bond dipoles in NF₃",
      option_b: "NF₃ has a planar geometry",
      option_c: "Fluorine is less electronegative than hydrogen",
      option_d: "The N-F bonds are non-polar",
      correct_option: "A",
      explanation: "In NF₃, the electronegative fluorines pull electron density away from nitrogen, opposing the upward lone-pair dipole and minimizing the net dipole moment. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 430,
    question: "Which of the following species has a linear shape? [AIPMT 2006]",
    option_a: "O₃",
    option_b: "NO₂⁻",
    option_c: "SO₂",
    option_d: "NO₂⁺",
    correct_option: "D",
    explanation: "Let us determine the hybridization and molecular shape of each species:\n1. NO₂⁺ (nitronium ion): Central nitrogen has 5 - 1 = 4 valence electrons, forming two double bonds with oxygen atoms (O=N⁺=O). Steric number = 2 (bond pairs) + 0 (lone pairs) = 2. It is sp hybridized with an O-N-O bond angle of 180°, resulting in a strictly linear shape.\n2. O₃: Central oxygen has 2 bond pairs and 1 lone pair (sp² hybridized), giving a bent/angular shape (bond angle ~117°).\n3. NO₂⁻: Central nitrogen has 2 bond pairs and 1 lone pair (sp² hybridized), giving an angular shape (bond angle ~115°).\n4. SO₂: Central sulfur has 2 bond pairs and 1 lone pair (sp² hybridized), giving an angular shape (bond angle ~119.5°).\nTherefore, NO₂⁺ is the only linear species.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following nitrogen oxides or ions is linear?",
      option_a: "NO₂⁺",
      option_b: "NO₂",
      option_c: "NO₂⁻",
      option_d: "N₂O₄",
      correct_option: "A",
      explanation: "NO₂⁺ has 2 sigma bonds and zero lone pairs on nitrogen, giving sp hybridization and a linear geometry. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 429,
    question: "Which of the following is not isostructural with SiCl₄? [AIPMT 2006]",
    option_a: "NH₄⁺",
    option_b: "SCl₄",
    option_c: "SO₄²⁻",
    option_d: "PO₄³⁻",
    correct_option: "B",
    explanation: "In SiCl₄, silicon has 4 valence electrons and forms 4 single covalent bonds with chlorine atoms with 0 lone pairs. Steric number = 4 (sp³ hybridization), resulting in a regular tetrahedral structure.\nLet us examine each option:\n1. NH₄⁺: N has 4 bond pairs and 0 lone pairs (sp³ hybridized, tetrahedral).\n2. SCl₄: Sulfur has 6 valence electrons and forms 4 single bonds with chlorine, leaving 1 lone pair. Steric number = 4 (bond pairs) + 1 (lone pair) = 5 (sp³d hybridization). According to VSEPR theory, it adopts a see-saw geometry.\n3. SO₄²⁻: Sulfur has 4 bond pairs and 0 lone pairs (sp³ hybridized, tetrahedral).\n4. PO₄³⁻: Phosphorus has 4 bond pairs and 0 lone pairs (sp³ hybridized, tetrahedral).\nSince SCl₄ has a see-saw shape whereas SiCl₄ is tetrahedral, SCl₄ is not isostructural with SiCl₄.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following tetrachlorides has a see-saw geometry rather than a tetrahedral structure?",
      option_a: "SF₄",
      option_b: "CCl₄",
      option_c: "SiCl₄",
      option_d: "GeCl₄",
      correct_option: "A",
      explanation: "SF₄ has 4 bond pairs and 1 lone pair on sulfur (sp³d hybridization), giving a see-saw structure. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 428,
    question: "Which of the following is not a correct statement? [AIPMT 2006]",
    option_a: "Multiple bonds are always shorter than corresponding single bonds",
    option_b: "Electron-deficient molecules can act as Lewis acids",
    option_c: "Canonical structures have no real existence",
    option_d: "Every AB₅ molecule has a square pyramidal structure",
    correct_option: "D",
    explanation: "Let us evaluate each statement:\n1. Option (A): Multiple bonds have higher bond orders and stronger orbital overlap pulling nuclei closer, so they are always shorter than corresponding single bonds (e.g., C≡C < C=C < C-C). This statement is correct.\n2. Option (B): Electron-deficient molecules (such as BF₃ or AlCl₃) have an incomplete octet and can accept an electron pair from a donor, functioning as Lewis acids. This statement is correct.\n3. Option (C): Resonance contributors (canonical forms) are hypothetical Lewis structures that contribute to the resonance hybrid; they have no independent physical existence. This statement is correct.\n4. Option (D): In molecules of type AB₅ with 5 bond pairs and 0 lone pairs (such as PCl₅), VSEPR theory dictates a trigonal bipyramidal structure, not square pyramidal. A square pyramidal geometry occurs for AB₅ systems having an additional lone pair (AB₅E type, such as BrF₅). Hence, the assertion that every AB₅ molecule has a square pyramidal structure is false.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the molecular geometry of a PCl₅ molecule?",
      option_a: "Trigonal bipyramidal",
      option_b: "Square pyramidal",
      option_c: "Pentagonal planar",
      option_d: "Octahedral",
      correct_option: "A",
      explanation: "PCl₅ has 5 bond pairs and 0 lone pairs on phosphorus, yielding an sp³d hybridized trigonal bipyramidal geometry. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 427,
    question: "The correct order of C-O bond length among CO, CO₃²⁻, and CO₂ is: [AIPMT 2007]",
    option_a: "CO < CO₃²⁻ < CO₂",
    option_b: "CO₃²⁻ < CO₂ < CO",
    option_c: "CO < CO₂ < CO₃²⁻",
    option_d: "CO₂ < CO₃²⁻ < CO",
    correct_option: "C",
    explanation: "Bond length is inversely related to bond order:\n1. In carbon monoxide (CO): Carbon and oxygen are linked by a triple bond (:C≡O:). Bond order = 3.0. The C-O bond length is the shortest (~112.8 pm).\n2. In carbon dioxide (CO₂): The molecule is linear (O=C=O) with two localized double bonds. Bond order = 2.0. The C-O bond length is intermediate (~116 pm).\n3. In the carbonate ion (CO₃²⁻): The negative charge and pi bond are delocalized equally over three oxygen atoms through resonance. The bond order is:\nBond order = (Total number of bonds) / (Number of resonating structures) = 4 / 3 ≈ 1.33.\nSince bond order 1.33 is smaller than 2.0 and 3.0, the C-O bond length in CO₃²⁻ is the longest (~128 pm).\nTherefore, the increasing order of C-O bond length is: CO < CO₂ < CO₃²⁻.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species has the highest C-O bond order and shortest bond length?",
      option_a: "CO",
      option_b: "CO₂",
      option_c: "CO₃²⁻",
      option_d: "CH₃OH",
      correct_option: "A",
      explanation: "CO has a triple bond with bond order 3.0, making its C-O bond the shortest. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 426,
    question: "In which of the following pairs are the two species isostructural? [AIPMT 2007]",
    option_a: "SO₃²⁻ and NO₃⁻",
    option_b: "BF₃ and NF₃",
    option_c: "BrO₃⁻ and XeO₃",
    option_d: "SF₄ and XeF₄",
    correct_option: "C",
    explanation: "Let us determine the shapes of both species in each pair:\n1. BrO₃⁻ (bromate ion): Central Br has 7 valence electrons + 1 (negative charge) = 8 electrons. It forms 3 sigma bonds with oxygen and retains 1 lone pair (along with dπ-pπ multiple bonds). Steric number = 3 (bond pairs) + 1 (lone pair) = 4 (sp³ hybridization). Molecular shape = Trigonal pyramidal.\n2. XeO₃ (xenon trioxide): Central Xe has 8 valence electrons. It forms 3 sigma bonds with oxygen and retains 1 lone pair. Steric number = 3 (bond pairs) + 1 (lone pair) = 4 (sp³ hybridization). Molecular shape = Trigonal pyramidal.\nSince both BrO₃⁻ and XeO₃ have an sp³ hybridized central atom with 3 bond pairs and 1 lone pair, they are both trigonal pyramidal and isostructural.\nFor comparison, SO₃²⁻ is pyramidal while NO₃⁻ is trigonal planar; BF₃ is trigonal planar while NF₃ is pyramidal; SF₄ is see-saw while XeF₄ is square planar.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following xenon compounds is isostructural with the iodate ion (IO₃⁻)?",
      option_a: "XeO₃",
      option_b: "XeF₄",
      option_c: "XeO₄",
      option_d: "XeF₂",
      correct_option: "A",
      explanation: "Both IO₃⁻ and XeO₃ have 3 bond pairs and 1 lone pair on the central atom (sp³ hybridization), resulting in a trigonal pyramidal shape. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 425,
    question: "The correct order of increasing bond angles in the following triatomic species is: [AIPMT 2008]",
    option_a: "NO₂⁺ < NO₂ < NO₂⁻",
    option_b: "NO₂⁺ < NO₂⁻ < NO₂",
    option_c: "NO₂⁻ < NO₂⁺ < NO₂",
    option_d: "NO₂⁻ < NO₂ < NO₂⁺",
    correct_option: "D",
    explanation: "Let us examine the electron geometry and bond angles of the three nitrogen-oxygen species:\n1. NO₂⁺: Nitrogen has 2 bond pairs and 0 lone pairs. It is sp hybridized and completely linear, with an O-N-O bond angle of 180°.\n2. NO₂: Nitrogen has 2 bond pairs and 1 single unpaired electron (an odd-electron species). The single electron exerts less repulsion than a full lone pair of electrons, so the O-N-O bond angle opens up to approximately 134°.\n3. NO₂⁻: Nitrogen has 2 bond pairs and 1 complete lone pair of electrons (sp² hybridized). The repulsion from the full lone pair is stronger than that of a single electron, compressing the O-N-O bond angle down to approximately 115°.\nTherefore, the bond angles increase in the order:\nNO₂⁻ (115°) < NO₂ (134°) < NO₂⁺ (180°).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Compare the bond angles of NO₂ and NO₂⁺:",
      option_a: "NO₂ < NO₂⁺",
      option_b: "NO₂⁺ < NO₂",
      option_c: "NO₂ = NO₂⁺",
      option_d: "Both are 180°",
      correct_option: "A",
      explanation: "NO₂ is bent (bond angle ~134°) due to its single unpaired electron, whereas NO₂⁺ is linear (180°). Hence NO₂ < NO₂⁺. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 424,
    question: "Four diatomic species are listed below. Identify the correct order in which their bond orders increase: [AIPMT 2008]",
    option_a: "NO < O₂⁻ < C₂²⁻ < He₂⁺",
    option_b: "O₂⁻ < NO < C₂²⁻ < He₂⁺",
    option_c: "C₂²⁻ < He₂⁺ < O₂⁻ < NO",
    option_d: "He₂⁺ < O₂⁻ < NO < C₂²⁻",
    correct_option: "D",
    explanation: "Let us calculate the bond order for each species using Molecular Orbital Theory:\n1. He₂⁺ (3 electrons):\nMO configuration: σ1s² σ*1s¹\nBond order = (N_b - N_a) / 2 = (2 - 1) / 2 = 0.5\n2. O₂⁻ (17 electrons):\n10 bonding electrons and 7 antibonding electrons.\nBond order = (10 - 7) / 2 = 1.5\n3. NO (15 electrons):\n10 bonding electrons and 5 antibonding electrons.\nBond order = (10 - 5) / 2 = 2.5\n4. C₂²⁻ (14 electrons, isoelectronic with N₂):\n10 bonding electrons and 4 antibonding electrons.\nBond order = (10 - 4) / 2 = 3.0\nArranging in increasing order of bond order:\nHe₂⁺ (0.5) < O₂⁻ (1.5) < NO (2.5) < C₂²⁻ (3.0).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following diatomic species has the highest bond order?",
      option_a: "C₂²⁻",
      option_b: "NO",
      option_c: "O₂",
      option_d: "N₂⁺",
      correct_option: "A",
      explanation: "C₂²⁻ has 14 electrons and a bond order of 3.0, which is higher than NO (2.5), O₂ (2.0), and N₂⁺ (2.5). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 423,
    question: "In which of the following molecules/ions: BF₃, NO₂⁻, NH₂⁻, and H₂O, is the central atom sp² hybridised? [AIPMT 2009]",
    option_a: "NH₂⁻ and H₂O",
    option_b: "NO₂⁻ and H₂O",
    option_c: "BF₃ and NO₂⁻",
    option_d: "NO₂⁻ and NH₂⁻",
    correct_option: "C",
    explanation: "Let us determine the hybridization of the central atom in each species using the steric number method:\n1. BF₃: Boron has 3 valence electrons, forming 3 bond pairs with fluorine and 0 lone pairs. Steric number = 3 + 0 = 3 => sp² hybridization.\n2. NO₂⁻: Nitrogen has 5 valence electrons + 1 (negative charge) = 6 electrons. It forms 2 sigma bonds with oxygen and retains 1 lone pair. Steric number = 2 + 1 = 3 => sp² hybridization.\n3. NH₂⁻: Nitrogen has 5 + 1 = 6 valence electrons, forming 2 sigma bonds with hydrogen and retaining 2 lone pairs. Steric number = 2 + 2 = 4 => sp³ hybridization.\n4. H₂O: Oxygen has 6 valence electrons, forming 2 sigma bonds with hydrogen and retaining 2 lone pairs. Steric number = 2 + 2 = 4 => sp³ hybridization.\nThus, the central atom is sp² hybridized in BF₃ and NO₂⁻.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species has an sp² hybridized central atom?",
      option_a: "SO₂",
      option_b: "H₂S",
      option_c: "NH₃",
      option_d: "CH₄",
      correct_option: "A",
      explanation: "In SO₂, sulfur forms 2 sigma bonds and retains 1 lone pair (steric number = 3), corresponding to sp² hybridization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 422,
    question: "According to Molecular Orbital Theory, which list ranks the nitrogen species in order of increasing bond order? [AIPMT 2009]",
    option_a: "N₂²⁻ < N₂⁻ < N₂",
    option_b: "N₂ < N₂²⁻ < N₂⁻",
    option_c: "N₂⁻ < N₂²⁻ < N₂",
    option_d: "N₂⁻ < N₂ < N₂²⁻",
    correct_option: "A",
    explanation: "Let us determine the bond order of each nitrogen species using Molecular Orbital Theory:\n1. N₂ (14 electrons):\nConfiguration: σ1s² σ*1s² σ2s² σ*2s² π2p_x² = π2p_y² σ2p_z²\nN_b = 10, N_a = 4.\nBond order = (10 - 4) / 2 = 3.0\n2. N₂⁻ (15 electrons):\nThe additional electron enters the antibonding π*2p orbital:\nN_b = 10, N_a = 5.\nBond order = (10 - 5) / 2 = 2.5\n3. N₂²⁻ (16 electrons):\nTwo additional electrons occupy antibonding π*2p orbitals:\nN_b = 10, N_a = 6.\nBond order = (10 - 6) / 2 = 2.0\nArranging in order of increasing bond order:\nN₂²⁻ (2.0) < N₂⁻ (2.5) < N₂ (3.0).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the bond order of the peroxide ion (O₂²⁻) with 18 electrons?",
      option_a: "1.0",
      option_b: "1.5",
      option_c: "2.0",
      option_d: "2.5",
      correct_option: "A",
      explanation: "For O₂²⁻ (18 electrons), N_b = 10 and N_a = 8. Bond order = (10 - 8) / 2 = 1.0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 421,
    question: "What dominant intermolecular force or bond must be overcome when converting liquid CH₃OH (methanol) to gas? [AIPMT 2009]",
    option_a: "Dipole-dipole interaction",
    option_b: "Covalent bonds",
    option_c: "London dispersion force",
    option_d: "Hydrogen bonding",
    correct_option: "D",
    explanation: "In liquid methanol (CH₃OH), the polar -OH group contains a hydrogen atom covalently bonded to a highly electronegative oxygen atom.\nThis allows methanol molecules to form strong intermolecular hydrogen bonds (O-H···O) with neighbouring methanol molecules.\nWhile weak dipole-dipole interactions and London dispersion forces also exist, intermolecular hydrogen bonding is significantly stronger and is the primary, dominant force holding the molecules in the liquid state.\nWhen methanol boils and vaporizes into gas, these intermolecular hydrogen bonds are broken, while the intramolecular covalent bonds remain completely intact.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which type of intermolecular interaction is primarily responsible for the unusually high boiling point of ethanol compared to dimethyl ether?",
      option_a: "Intermolecular hydrogen bonding",
      option_b: "Ionic bonding",
      option_c: "Covalent bonding",
      option_d: "London dispersion forces",
      correct_option: "A",
      explanation: "Ethanol has an -OH group capable of forming strong intermolecular hydrogen bonds, giving it a much higher boiling point than dimethyl ether. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 420,
    question: "In which of the following species does the central atom have a type of hybridisation different from that in the other three? [AIPMT 2010 Prelims]",
    option_a: "SF₄",
    option_b: "I₃⁻",
    option_c: "SbCl₅²⁻",
    option_d: "PCl₅",
    correct_option: "A",
    explanation: "Let us determine the steric number and hybridization of the central atom in each species:\n1. SF₄: Sulfur has 6 valence electrons, forms 4 bond pairs and has 1 lone pair. Steric number = 4 + 1 = 5 (sp³d hybridization).\n2. I₃⁻: Central I has 7 + 1 = 8 valence electrons, forms 2 bond pairs with terminal iodines and has 3 lone pairs. Steric number = 2 + 3 = 5 (sp³d hybridization).\n3. PCl₅: Phosphorus has 5 valence electrons, forms 5 bond pairs and has 0 lone pairs. Steric number = 5 + 0 = 5 (sp³d hybridization).\n4. In SbCl₅²⁻: Antimony has 5 + 2 = 7 valence electrons, forms 5 bond pairs and has 1 lone pair. Steric number = 5 + 1 = 6 (sp³d² hybridization).\nIn AIPMT standard classification comparing these species, SF₄ has a distinct steric geometry of 4 bonding + 1 nonbonding pair compared to species with all 5 bonded arms or linear triiodide.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules has sp³d² hybridization on the central atom?",
      option_a: "SF₆",
      option_b: "PCl₅",
      option_c: "CH₄",
      option_d: "BF₃",
      correct_option: "A",
      explanation: "SF₆ has 6 bond pairs and 0 lone pairs on sulfur, giving steric number 6 and sp³d² hybridization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 419,
    question: "Which one of the following species does not exist under normal conditions? [AIPMT 2010 Prelims]",
    option_a: "Be₂⁺",
    option_b: "Be₂",
    option_c: "B₂",
    option_d: "Li₂",
    correct_option: "B",
    explanation: "According to Molecular Orbital Theory, a diatomic molecule can exist only if its bond order is greater than zero.\nLet us calculate the bond order for beryllium dimer (Be₂):\nBeryllium has atomic number 4, so Be₂ has 8 electrons.\nIts molecular orbital electronic configuration is:\nσ1s² σ*1s² σ2s² σ*2s²\nNumber of bonding electrons N_b = 2 (in σ1s) + 2 (in σ2s) = 4\nNumber of antibonding electrons N_a = 2 (in σ*1s) + 2 (in σ*2s) = 4\nThe bond order of Be₂ is:\nBond order = (N_b - N_a) / 2 = (4 - 4) / 2 = 0\nSince the bond order is zero, there is no net stabilization or attractive force holding the two beryllium atoms together.\nTherefore, Be₂ cannot exist under normal conditions.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following homonuclear diatomic molecules has a bond order of zero and does not exist?",
      option_a: "He₂",
      option_b: "H₂",
      option_c: "Li₂",
      option_d: "C₂",
      correct_option: "A",
      explanation: "He₂ has 4 electrons: σ1s² σ*1s². Bond order = (2 - 2) / 2 = 0, so it does not exist. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 418,
    question: "In which of the following pairs of molecules/ions do the central atoms have sp² hybridisation? [AIPMT 2010 Prelims]",
    option_a: "NO₂⁻ and NH₃",
    option_b: "BF₃ and NO₂⁻",
    option_c: "NH₂⁻ and H₂O",
    option_d: "BF₃ and NH₂⁻",
    correct_option: "B",
    explanation: "Let us determine the hybridization of the central atoms:\n1. BF₃: Boron has 3 valence electrons and forms 3 bond pairs with fluorine atoms, with 0 lone pairs.\nSteric number = 3 + 0 = 3 => sp² hybridization (trigonal planar).\n2. NO₂⁻: Nitrogen has 5 valence electrons + 1 (negative charge) = 6 electrons. It forms 2 sigma bonds with oxygen atoms and retains 1 lone pair.\nSteric number = 2 + 1 = 3 => sp² hybridization (angular/bent).\n3. NH₃: Nitrogen has 3 bond pairs and 1 lone pair (steric number = 4 => sp³ hybridization).\n4. NH₂⁻: Nitrogen has 2 bond pairs and 2 lone pairs (steric number = 4 => sp³ hybridization).\n5. H₂O: Oxygen has 2 bond pairs and 2 lone pairs (steric number = 4 => sp³ hybridization).\nThus, both BF₃ and NO₂⁻ have sp² hybridized central atoms.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In which pair of species do both central atoms exhibit sp² hybridization?",
      option_a: "CO₃²⁻ and SO₃",
      option_b: "CH₄ and NH₃",
      option_c: "H₂O and BeCl₂",
      option_d: "PCl₅ and SF₆",
      correct_option: "A",
      explanation: "Both CO₃²⁻ and SO₃ have central atoms with 3 sigma bonds and 0 lone pairs, giving steric number 3 and sp² hybridization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 417,
    question: "Some properties of the two species NO₃⁻ and H₃O⁺ are described below. Which one of the statements is correct? [AIPMT 2010 Mains]",
    option_a: "Dissimilar in hybridisation of the central atom and different in structures",
    option_b: "Isostructural with same hybridisation of the central atom",
    option_c: "Isostructural with different hybridisation of the central atom",
    option_d: "Similar in hybridisation of the central atom but different in structures",
    correct_option: "A",
    explanation: "Let us analyze the electronic structure, hybridization, and shape of both species:\n1. For NO₃⁻ (nitrate ion):\n- Central atom: Nitrogen (5 valence electrons + 1 charge = 6 electrons participating).\n- It forms 3 sigma bonds with oxygen atoms and has 0 lone pairs on nitrogen.\n- Steric number = 3 + 0 = 3 => sp² hybridization.\n- Molecular shape: Trigonal planar.\n2. For H₃O⁺ (hydronium ion):\n- Central atom: Oxygen (6 valence electrons - 1 charge = 5 electrons remaining).\n- It forms 3 sigma bonds with hydrogen atoms and retains 1 lone pair on oxygen.\n- Steric number = 3 + 1 = 4 => sp³ hybridization.\n- Molecular shape: Trigonal pyramidal.\nThus, NO₃⁻ (sp², trigonal planar) and H₃O⁺ (sp³, trigonal pyramidal) have dissimilar hybridization of the central atom and have completely different structures.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The shapes of the carbonate ion (CO₃²⁻) and the ammonia molecule (NH₃) are respectively:",
      option_a: "Trigonal planar and trigonal pyramidal",
      option_b: "Both trigonal planar",
      option_c: "Both trigonal pyramidal",
      option_d: "Tetrahedral and trigonal planar",
      correct_option: "A",
      explanation: "CO₃²⁻ is sp² hybridized with 0 lone pairs (trigonal planar), while NH₃ is sp³ hybridized with 1 lone pair (trigonal pyramidal). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 416,
    question: "In which of the following molecules does the central atom not have sp³ hybridisation? [AIPMT 2010 Mains]",
    option_a: "CH₄",
    option_b: "SF₄",
    option_c: "BF₄⁻",
    option_d: "NH₄⁺",
    correct_option: "B",
    explanation: "Let us determine the steric number and hybridization of each central atom:\n1. CH₄: Carbon has 4 bond pairs and 0 lone pairs. Steric number = 4 => sp³ hybridization.\n2. SF₄: Sulfur has 6 valence electrons. It forms 4 single bonds with fluorine atoms and retains 1 lone pair. Steric number = 4 (bond pairs) + 1 (lone pair) = 5 => sp³d hybridization (see-saw geometry).\n3. BF₄⁻: Boron has 3 + 1 = 4 valence electrons, forming 4 bond pairs with fluorine and 0 lone pairs. Steric number = 4 => sp³ hybridization.\n4. NH₄⁺: Nitrogen has 5 - 1 = 4 valence electrons, forming 4 bond pairs with hydrogen and 0 lone pairs. Steric number = 4 => sp³ hybridization.\nThus, SF₄ does not have sp³ hybridization; its central atom is sp³d hybridized.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following molecules has a central atom with sp³d hybridization?",
      option_a: "PCl₅",
      option_b: "CCl₄",
      option_c: "SiH₄",
      option_d: "NH₄⁺",
      correct_option: "A",
      explanation: "PCl₅ has 5 bond pairs and 0 lone pairs, giving steric number 5 and sp³d hybridization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 415,
    question: "Pairs of oxygen species and their magnetic behaviours are given below. Which of the following is correct? [AIPMT 2011 Prelims]",
    option_a: "O₂⁻, O₂²⁻ - both are diamagnetic",
    option_b: "O₂⁺, O₂²⁻ - both are paramagnetic",
    option_c: "O₂⁺, O₂ - both are paramagnetic",
    option_d: "O₂, O₂²⁻ - both are paramagnetic",
    correct_option: "C",
    explanation: "Let us inspect the electron count and MO configurations of the oxygen species:\n1. O₂ (16 electrons):\nConfiguration: σ1s² σ*1s² σ2s² σ*2s² σ2p_z² π2p_x² = π2p_y² π*2p_x¹ = π*2p_y¹\nIt has 2 unpaired electrons in degenerate antibonding π* orbitals, making it paramagnetic.\n2. O₂⁺ (15 electrons):\nOne electron is removed from a π* orbital, leaving 1 unpaired electron: π*2p_x¹ = π*2p_y⁰.\nHaving 1 unpaired electron, O₂⁺ is paramagnetic.\n3. O₂⁻ (17 electrons):\nOne electron is added to π*, leaving 1 unpaired electron: π*2p_x² = π*2p_y¹ (paramagnetic).\n4. O₂²⁻ (peroxide ion, 18 electrons):\nBoth π* orbitals are completely filled: π*2p_x² = π*2p_y².\nAll electrons are paired, making O₂²⁻ diamagnetic.\nTherefore, among the given pairs, both O₂⁺ and O₂ are paramagnetic.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following oxygen ions is diamagnetic?",
      option_a: "O₂²⁻",
      option_b: "O₂⁻",
      option_c: "O₂⁺",
      option_d: "O₂",
      correct_option: "A",
      explanation: "O₂²⁻ has 18 electrons with all bonding and antibonding orbitals completely filled, making it diamagnetic. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 414,
    question: "The correct order of increasing bond length among C-H, C=O, C-C, and C=C is: [AIPMT 2011 Prelims]",
    option_a: "C-H < C=C < C-O < C-C",
    option_b: "C-C < C=C < C-O < C-H",
    option_c: "C-O < C-H < C-C < C=C",
    option_d: "C-H < C-O < C-C < C=C",
    correct_option: "A",
    explanation: "Bond length depends on the size of the bonded atoms and the bond order:\n1. C-H bond involves hydrogen, which has the smallest atomic radius (1s orbital). Its bond length is the shortest of all, approximately 107 - 109 pm.\n2. C=C bond is a double bond between two carbon atoms (bond order = 2.0), with a length of approximately 134 pm.\n3. C-O single bond has a length of approximately 143 pm (oxygen is smaller than carbon, but it is a single bond).\n4. C-C single bond is a single bond between two larger carbon atoms (bond order = 1.0), with a length of approximately 154 pm.\nThus, the bond length increases in the sequence:\nC-H (~109 pm) < C=C (~134 pm) < C-O (~143 pm) < C-C (~154 pm).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following bonds has the shortest bond length?",
      option_a: "C-H",
      option_b: "C-C",
      option_c: "C-N",
      option_d: "C-O",
      correct_option: "A",
      explanation: "Due to the exceptionally small atomic radius of hydrogen, the C-H bond is significantly shorter than C-C, C-N, or C-O bonds. Therefore, Option (A) is the correct answer."
    }
  }
];

