module.exports = [
  {
    id: 1697,
    question: "Which of the following molecules acts as a Lewis acid? [AIPMT 2009]",
    optionA: "(CH₃)₂O",
    optionB: "(CH₃)₃P",
    optionC: "(CH₃)₃N",
    optionD: "(CH₃)₃B",
    correctOption: "D",
    explanation: "Step 1: Define a Lewis acid:\nA Lewis acid is an electron-pair acceptor. Molecules containing an atom with an incomplete valence octet (electron-deficient central atom) act as Lewis acids.\n\nStep 2: Examine electron configurations of central atoms:\n- (CH₃)₂O: Central oxygen has 2 bond pairs and 2 lone pairs (complete octet, Lewis base).\n- (CH₃)₃P: Central phosphorus has 3 bond pairs and 1 lone pair (complete octet, Lewis base).\n- (CH₃)₃N: Central nitrogen has 3 bond pairs and 1 lone pair (complete octet, Lewis base).\n- (CH₃)₃B: Central boron has only 3 bond pairs (6 valence electrons), leaving an empty 2p orbital. Because boron has an incomplete octet, trimethylborane readily accepts an electron pair to complete its octet.\n\nTherefore, (CH₃)₃B acts as a Lewis acid.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following species behaves as a Lewis acid due to an incomplete octet?",
      option_a: "BF₃",
      option_b: "NH₃",
      option_c: "H₂O",
      option_d: "CH₄",
      correct_option: "A",
      explanation: "Step 1: Boron trifluoride (BF₃) has only 6 valence electrons around boron, acting as an electron-pair acceptor (Lewis acid).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1696,
    question: "In a buffer solution containing equal concentrations of B⁻ and HB, the Kb for B⁻ is 10⁻¹⁰. The pH of the buffer solution is: [AIPMT 2010 Prelims]",
    optionA: "10",
    optionB: "7",
    optionC: "6",
    optionD: "4",
    correctOption: "D",
    explanation: "Step 1: Find Ka of the conjugate acid HB from Kb of base B⁻:\nAt 25°C, Ka × Kb = Kw = 10⁻¹⁴\nKa = Kw / Kb = 10⁻¹⁴ / 10⁻¹⁰ = 10⁻⁴.\npKa = −log(Ka) = −log(10⁻⁴) = 4.\n\nStep 2: Apply Henderson-Hasselbalch equation for the buffer:\npH = pKa + log([Conjugate base] / [Acid]) = pKa + log([B⁻] / [HB]).\nSince [B⁻] = [HB]:\n[B⁻] / [HB] = 1 ⇒ log(1) = 0.\npH = pKa + 0 = 4.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An equimolar buffer of HA and A⁻ has pKa = 5. The pH of the buffer is:",
      option_a: "5",
      option_b: "9",
      option_c: "7",
      option_d: "10",
      correct_option: "A",
      explanation: "Step 1: When [salt] = [acid], pH = pKa = 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1695,
    question: "What is [H⁺] in mol/L of a solution that is 0.20 M in CH₃COONa and 0.10 M in CH₃COOH? Ka for CH₃COOH = 1.8 × 10⁻⁵ [AIPMT 2010 Prelims]",
    optionA: "3.5 × 10⁻⁴",
    optionB: "1.1 × 10⁻⁵",
    optionC: "1.8 × 10⁻⁵",
    optionD: "9.0 × 10⁻⁶",
    correctOption: "D",
    explanation: "Step 1: Write the expression for Ka of the weak acid CH₃COOH:\nCH₃COOH ⇌ CH₃COO⁻ + H⁺\nKa = ([CH₃COO⁻] [H⁺]) / [CH₃COOH].\n\nStep 2: Rearrange to solve for [H⁺]:\n[H⁺] = Ka × ([CH₃COOH] / [CH₃COO⁻]).\n\nStep 3: Substitute the given concentrations:\n[CH₃COOH] = 0.10 M\n[CH₃COO⁻] = [CH₃COONa] = 0.20 M\nKa = 1.8 × 10⁻⁵\n[H⁺] = (1.8 × 10⁻⁵) × (0.10 / 0.20) = (1.8 × 10⁻⁵) × (1/2) = 0.9 × 10⁻⁵ = 9.0 × 10⁻⁶ mol/L.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A buffer solution contains 0.1 M HCN (Ka = 4.0 × 10⁻¹⁰) and 0.2 M NaCN. The [H⁺] is:",
      option_a: "2.0 × 10⁻¹⁰ M",
      option_b: "4.0 × 10⁻¹⁰ M",
      option_c: "8.0 × 10⁻¹⁰ M",
      option_d: "1.0 × 10⁻¹⁰ M",
      correct_option: "A",
      explanation: "Step 1: [H⁺] = Ka × ([Acid] / [Salt]) = (4.0 × 10⁻¹⁰) × (0.1 / 0.2) = 2.0 × 10⁻¹⁰ M.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1694,
    question: "If the pH of a saturated solution of Ba(OH)₂ is 12, the value of its Ksp is: [AIPMT 2010 Prelims]",
    optionA: "4.00 × 10⁻⁶ M³",
    optionB: "4.00 × 10⁻⁷ M³",
    optionC: "5.00 × 10⁻⁶ M³",
    optionD: "5.00 × 10⁻⁷ M³",
    correctOption: "D",
    explanation: "Step 1: Find [OH⁻] from the given pH:\npH = 12 ⇒ pOH = 14 − pH = 14 − 12 = 2\n[OH⁻] = 10^(−pOH) = 10⁻² M = 0.01 M.\n\nStep 2: Relate [Ba²⁺] to [OH⁻]:\nBa(OH)₂ dissociates as:\nBa(OH)₂(s) ⇌ Ba²⁺(aq) + 2 OH⁻(aq)\nFrom stoichiometry, for each Ba²⁺ ion, two OH⁻ ions are produced:\n[Ba²⁺] = [OH⁻] / 2 = 10⁻² / 2 = 0.5 × 10⁻² M = 5.0 × 10⁻³ M.\n\nStep 3: Calculate the solubility product Ksp:\nKsp = [Ba²⁺] [OH⁻]² = (0.5 × 10⁻²) × (10⁻²)²\nKsp = 0.5 × 10⁻² × 10⁻⁴ = 0.5 × 10⁻⁶ = 5.00 × 10⁻⁷ M³.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If the pH of a saturated solution of Ca(OH)₂ is 11, its Ksp value is:",
      option_a: "5.0 × 10⁻¹⁰ M³",
      option_b: "1.0 × 10⁻⁹ M³",
      option_c: "4.0 × 10⁻⁹ M³",
      option_d: "2.5 × 10⁻¹⁰ M³",
      correct_option: "A",
      explanation: "Step 1: pOH = 14 − 11 = 3 ⇒ [OH⁻] = 10⁻³ M. [Ca²⁺] = 0.5 × 10⁻³ M.\n\nStep 2: Ksp = [Ca²⁺][OH⁻]² = (0.5 × 10⁻³) × (10⁻³)² = 5.0 × 10⁻¹⁰ M³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1693,
    question: "Which of the following is least likely to behave as a Lewis base? [AIPMT 2011 Prelims]",
    optionA: "H₂O",
    optionB: "NH₃",
    optionC: "BF₃",
    optionD: "OH⁻",
    correctOption: "C",
    explanation: "Step 1: Define a Lewis base:\nA Lewis base is a chemical species that donates an electron pair. To act as a Lewis base, a molecule or ion must possess at least one non-bonding lone pair of electrons.\n\nStep 2: Analyze electron configuration of each species:\n- H₂O: Oxygen has two lone pairs; acts as a Lewis base.\n- NH₃: Nitrogen has one lone pair; acts as a Lewis base.\n- OH⁻: Hydroxide ion possesses three lone pairs with negative charge; strong Lewis base.\n- BF₃: Boron has only six valence electrons (incomplete octet) and an empty 2p orbital. It acts as an electron pair acceptor (a strong Lewis acid), not a Lewis base.\n\nTherefore, BF₃ is least likely to behave as a Lewis base.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following acts as a Lewis acid rather than a Lewis base?",
      option_a: "AlCl₃",
      option_b: "CH₃OH",
      option_c: "CH₃NH₂",
      option_d: "Cl⁻",
      correct_option: "A",
      explanation: "Step 1: AlCl₃ has an incomplete octet around aluminium (6 valence electrons), acting as a Lewis acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1692,
    question: "A buffer solution is prepared in which the concentration of NH₃ is 0.30 M and the concentration of NH₄⁺ is 0.20 M. If the equilibrium constant, Kb, for NH₃ equals 1.8 × 10⁻⁵, what is the pH of this solution? (log 2.7 = 0.43) [AIPMT 2011 Prelims]",
    optionA: "9.08",
    optionB: "9.43",
    optionC: "11.72",
    optionD: "8.73",
    correctOption: "B",
    explanation: "Step 1: Calculate pKb of NH₃:\nKb = 1.8 × 10⁻⁵\npKb = −log(1.8 × 10⁻⁵) = 5 − log(1.8) = 5 − 0.255 = 4.745.\n\nStep 2: Apply Henderson-Hasselbalch equation for basic buffer:\npOH = pKb + log([Salt] / [Base])\n[Salt] = [NH₄⁺] = 0.20 M\n[Base] = [NH₃] = 0.30 M\npOH = 4.745 + log(0.20 / 0.30) = 4.745 + log(2/3) = 4.745 + (log 2 − log 3)\nOr: [Base] / [Salt] = 0.30 / 0.20 = 1.5 ⇒ log(2/3) = −log(1.5) ≈ −0.176\npOH = 4.745 − 0.176 = 4.569 ≈ 4.57.\n\nStep 3: Calculate pH:\npH = 14 − pOH = 14 − 4.57 = 9.43.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For a basic buffer with [NH₄⁺] = 0.1 M, [NH₃] = 0.1 M, and pKb = 4.75, the pH of the buffer is:",
      option_a: "9.25",
      option_b: "4.75",
      option_c: "7.00",
      option_d: "10.00",
      correct_option: "A",
      explanation: "Step 1: pOH = pKb = 4.75 ⇒ pH = 14 − 4.75 = 9.25.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1691,
    question: "In qualitative analysis, the metals of group I can be separated from other ions by precipitating them as chloride salts. A solution initially contains Ag⁺ and Pb²⁺ at a concentration of 0.10 M. Aqueous HCl is added to this solution until the Cl⁻ concentration is 0.10 M. What will the concentrations of Ag⁺ and Pb²⁺ be at equilibrium? Ksp for AgCl = 1.8 × 10⁻¹⁰ Ksp for PbCl₂ = 1.7 × 10⁻⁵ [AIPMT 2011 Mains]",
    optionA: "[Ag⁺] = 1.8 × 10⁻⁷ M, [Pb²⁺] = 1.7 × 10⁻⁶ M",
    optionB: "[Ag⁺] = 1.8 × 10⁻¹¹ M, [Pb²⁺] = 8.5 × 10⁻⁵ M",
    optionC: "[Ag⁺] = 1.8 × 10⁻⁹ M, [Pb²⁺] = 1.7 × 10⁻³ M",
    optionD: "[Ag⁺] = 1.8 × 10⁻¹¹ M, [Pb²⁺] = 1.7 × 10⁻⁴ M",
    correctOption: "C",
    explanation: "Step 1: Calculate equilibrium [Ag⁺] in the presence of [Cl⁻] = 0.10 M:\nFor AgCl:\nKsp(AgCl) = [Ag⁺] [Cl⁻]\n1.8 × 10⁻¹⁰ = [Ag⁺] × (0.10)\n[Ag⁺] = (1.8 × 10⁻¹⁰) / 0.10 = 1.8 × 10⁻⁹ M.\n\nStep 2: Calculate equilibrium [Pb²⁺] in the presence of [Cl⁻] = 0.10 M:\nFor PbCl₂:\nKsp(PbCl₂) = [Pb²⁺] [Cl⁻]²\n1.7 × 10⁻⁵ = [Pb²⁺] × (0.10)²\n1.7 × 10⁻⁵ = [Pb²⁺] × 10⁻²\n[Pb²⁺] = (1.7 × 10⁻⁵) / 10⁻² = 1.7 × 10⁻³ M.\n\nStep 3: Combine results:\n[Ag⁺] = 1.8 × 10⁻⁹ M and [Pb²⁺] = 1.7 × 10⁻³ M.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If [Cl⁻] = 0.01 M in a saturated solution of AgCl (Ksp = 1.8 × 10⁻¹⁰), the concentration of Ag⁺ ions is:",
      option_a: "1.8 × 10⁻⁸ M",
      option_b: "1.8 × 10⁻⁹ M",
      option_c: "1.34 × 10⁻⁵ M",
      option_d: "1.8 × 10⁻¹² M",
      correct_option: "A",
      explanation: "Step 1: [Ag⁺] = Ksp / [Cl⁻] = 1.8 × 10⁻¹⁰ / 0.01 = 1.8 × 10⁻⁸ M.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1690,
    question: "Buffer solutions have constant acidity and alkalinity because: [AIPMT 2012 Prelims]",
    optionA: "These give unionised acid or base on reaction with added acid or alkali.",
    optionB: "Acids and alkalies in these solutions are shielded from attack by other ions.",
    optionC: "They have a large excess of H⁺ or OH⁻ ions.",
    optionD: "They have a fixed value of pH.",
    correctOption: "A",
    explanation: "Step 1: Understand mechanism of buffer action:\nA buffer solution resists changes in pH upon the addition of small amounts of strong acid or base.\n\nStep 2: How buffer components neutralize added ions:\n- When a strong acid (H⁺) is added, it reacts with the conjugate base present in the buffer to form weakly dissociated, unionised weak acid:\nH⁺ + A⁻ → HA (unionised acid).\n- When a strong base (OH⁻) is added, it reacts with the weak acid present in the buffer to form unionised water and conjugate base:\nOH⁻ + HA → H₂O + A⁻.\nBecause the added H⁺ or OH⁻ ions are converted into weakly ionised or unionised species, the free concentrations of H⁺ and OH⁻ remain nearly constant.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The reserve acidity of an acetate buffer (CH₃COOH + CH₃COONa) is provided by:",
      option_a: "Un-ionized CH₃COOH molecules",
      option_b: "Acetate ions (CH₃COO⁻)",
      option_c: "Sodium ions (Na⁺)",
      option_d: "Water molecules",
      correct_option: "A",
      explanation: "Step 1: Un-ionized CH₃COOH reacts with added base (OH⁻) to neutralize it, providing reserve acidity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1689,
    question: "Equimolar solutions of the following substances were prepared separately. Which one of these will record the highest pH value? [AIPMT 2012 Prelims]",
    optionA: "BaCl₂",
    optionB: "AlCl₃",
    optionC: "LiCl",
    optionD: "BeCl₂",
    correctOption: "A",
    explanation: "Step 1: Analyze nature of each cation towards hydrolysis in water:\n- BeCl₂: Be²⁺ has very small ionic radius and high charge density. It undergoes strong cationic hydrolysis to form acidic species [Be(OH)]⁺ + H⁺ (pH < 7).\n- AlCl₃: Al³⁺ has high charge density, forming [Al(H₂O)₆]³⁺ which undergoes significant hydrolysis yielding H₃O⁺ (pH ≈ 3, distinctly acidic).\n- LiCl: Salt of moderate base LiOH and strong acid HCl; Li⁺ has slight polarizing power, solution is very close to neutral (pH ≈ 7).\n- BaCl₂: Barium hydroxide Ba(OH)₂ is a strong, completely ionized alkaline earth metal base. Ba²⁺ has large ionic radius and low charge density, so it undergoes virtually zero hydrolysis. Its aqueous solution is neutral with pH ≈ 7.0.\n\nStep 2: Compare pH values:\nAmong the acidic chlorides of Be and Al, and neutral chlorides of Li and Ba, BaCl₂ has the highest pH value (pH ≈ 7.0).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following 0.1 M aqueous solutions is the most acidic (lowest pH)?",
      option_a: "FeCl₃",
      option_b: "NaCl",
      option_c: "CaCl₂",
      option_d: "KCl",
      correct_option: "A",
      explanation: "Step 1: Fe³⁺ has high charge density and undergoes extensive cationic hydrolysis, releasing H⁺ ions and creating the lowest pH.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1688,
    question: "The pH of a saturated solution of Ba(OH)₂ is 12. The value of the solubility product (Ksp) of Ba(OH)₂ is: [AIPMT 2012 Prelims]",
    optionA: "3.3 × 10⁻⁷",
    optionB: "5.0 × 10⁻⁷",
    optionC: "4.0 × 10⁻⁶",
    optionD: "5.0 × 10⁻⁶",
    correctOption: "B",
    explanation: "Step 1: Calculate [OH⁻] from the given pH:\npH = 12 ⇒ pOH = 14 − 12 = 2\n[OH⁻] = 10^(−pOH) = 10⁻² M = 0.01 M.\n\nStep 2: Relate [Ba²⁺] to [OH⁻] from stoichiometry:\nBa(OH)₂(s) ⇌ Ba²⁺(aq) + 2 OH⁻(aq)\n[Ba²⁺] = [OH⁻] / 2 = (10⁻²) / 2 = 0.5 × 10⁻² M = 5.0 × 10⁻³ M.\n\nStep 3: Compute solubility product Ksp:\nKsp = [Ba²⁺] [OH⁻]² = (0.5 × 10⁻²) × (10⁻²)²\nKsp = 0.5 × 10⁻² × 10⁻⁴ = 0.5 × 10⁻⁶ = 5.0 × 10⁻⁷.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The pH of a saturated solution of a divalent metal hydroxide M(OH)₂ is 10. Its Ksp value is:",
      option_a: "5.0 × 10⁻¹³",
      option_b: "1.0 × 10⁻¹²",
      option_c: "4.0 × 10⁻¹²",
      option_d: "2.5 × 10⁻¹³",
      correct_option: "A",
      explanation: "Step 1: pOH = 14 − 10 = 4 ⇒ [OH⁻] = 10⁻⁴ M. [M²⁺] = 0.5 × 10⁻⁴ M.\n\nStep 2: Ksp = [M²⁺][OH⁻]² = (0.5 × 10⁻⁴) × (10⁻⁴)² = 5.0 × 10⁻¹³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1687,
    question: "Which of these is least likely to act as a Lewis base? [NEET 2013]",
    optionA: "BF₃",
    optionB: "PF₃",
    optionC: "CO",
    optionD: "F⁻",
    correctOption: "A",
    explanation: "Step 1: Define a Lewis base:\nA Lewis base is an electron-pair donor containing one or more unshared pairs of electrons.\n\nStep 2: Analyze each given species:\n- PF₃: Phosphorus has 3 bonding pairs and 1 non-bonding lone pair; behaves as a Lewis base.\n- CO: Carbon monoxide has a lone pair on carbon that it donates to form metal carbonyls; behaves as a Lewis base.\n- F⁻: Fluoride ion possesses 4 lone pairs with negative charge; acts as a Lewis base.\n- BF₃: Boron has only 6 valence electrons around it, leaving a vacant 2p orbital. BF₃ is electron-deficient and acts as an electron-pair acceptor (Lewis acid), not a Lewis base.\n\nTherefore, BF₃ is least likely to act as a Lewis base.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following compounds is a Lewis acid?",
      option_a: "BCl₃",
      option_b: "NCl₃",
      option_c: "PCl₃",
      option_d: "AsCl₃",
      correct_option: "A",
      explanation: "Step 1: BCl₃ is electron-deficient with an incomplete valence octet (6 electrons), acting as a Lewis acid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1686,
    question: "KMnO₄ can be prepared from K₂MnO₄ as per the reaction: 3MnO₄²⁻ + 2H₂O ⇌ 2MnO₄⁻ + MnO₂ + 4OH⁻ The reaction can go to completion by removing OH⁻ ions by adding: [NEET 2013]",
    optionA: "CO₂",
    optionB: "SO₂",
    optionC: "HCl",
    optionD: "KOH",
    correctOption: "A",
    explanation: "Step 1: Apply Le Chatelier's principle to the disproportionation equilibrium:\n3 MnO₄²⁻ + 2 H₂O ⇌ 2 MnO₄⁻ + MnO₂ + 4 OH⁻.\nTo drive this equilibrium forward to completion, OH⁻ ions must be continuously removed.\n\nStep 2: Evaluate chemical reagents to consume OH⁻ without side reactions:\n- KOH would increase [OH⁻], driving the reaction backwards.\n- HCl is a reducing agent; Cl⁻ would be oxidized by MnO₄⁻ to Cl₂ gas.\n- SO₂ is a strong reducing agent; it reduces MnO₄⁻ to Mn²⁺.\n- CO₂ is an acidic oxide that dissolves in water to form carbonic acid (H₂CO₃):\nCO₂ + 2 OH⁻ → CO₃²⁻ + H₂O.\nThis selectively consumes OH⁻ ions without reducing the permanganate product, shifting the equilibrium completely to the right.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Why is CO₂ preferred over HCl to neutralize alkali during disproportionation of manganate to permanganate?",
      option_a: "Because HCl reduces permanganate to manganese(II) while CO₂ does not",
      option_b: "Because CO₂ acts as an oxidizing agent",
      option_c: "Because HCl is insoluble in water",
      option_d: "Because CO₂ forms an insoluble complex with permanganate",
      correct_option: "A",
      explanation: "Step 1: HCl contains chloride ions which would be oxidized by the strongly oxidizing permanganate, destroying the desired product.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1685,
    question: "The dissociation constant of a weak acid is 1 × 10⁻⁴. In order to prepare a buffer solution with a pH = 5, the [Salt]/[Acid] ratio should be: [NEET 2013 Karnataka]",
    optionA: "4 : 5",
    optionB: "10 : 1",
    optionC: "5 : 4",
    optionD: "1 : 10",
    correctOption: "B",
    explanation: "Step 1: Calculate pKa of the weak acid:\nKa = 1 × 10⁻⁴\npKa = −log(Ka) = −log(1 × 10⁻⁴) = 4.\n\nStep 2: Apply the Henderson-Hasselbalch equation for an acidic buffer:\npH = pKa + log([Salt] / [Acid]).\n\nStep 3: Substitute the target pH:\n5 = 4 + log([Salt] / [Acid])\nlog([Salt] / [Acid]) = 5 − 4 = 1.\n\nStep 4: Take antilogarithm:\n[Salt] / [Acid] = 10¹ = 10 / 1 = 10 : 1.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "To prepare a buffer of pH = 4 using an acid with Ka = 10⁻⁵, the ratio of [Salt]/[Acid] must be:",
      option_a: "1 : 10",
      option_b: "10 : 1",
      option_c: "1 : 1",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: pKa = 5. pH = pKa + log([Salt]/[Acid]) ⇒ 4 = 5 + log(ratio) ⇒ log(ratio) = −1 ⇒ ratio = 1 : 10.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1684,
    question: "The values of Ksp of CaCO₃ and CaC₂O₄ are 4.7 × 10⁻⁹ and 1.3 × 10⁻⁹, respectively, at 25°C. If a mixture of these two is washed with water, what is the concentration of Ca²⁺ ions in water? [NEET 2013 Karnataka]",
    optionA: "5.831 × 10⁻⁵ M",
    optionB: "6.856 × 10⁻⁵ M",
    optionC: "3.606 × 10⁻⁵ M",
    optionD: "7.746 × 10⁻⁵ M",
    correctOption: "D",
    explanation: "Step 1: Set up simultaneous solubility equilibria in the common solution:\nLet the molar solubilities of CaCO₃ and CaC₂O₄ in the mixture be x and y mol/L, respectively.\nCaCO₃(s) ⇌ Ca²⁺ + CO₃²⁻ (Ksp1 = 4.7 × 10⁻⁹)\nCaC₂O₄(s) ⇌ Ca²⁺ + C₂O₄²⁻ (Ksp2 = 1.3 × 10⁻⁹)\nTotal [Ca²⁺] = x + y\n[CO₃²⁻] = x\n[C₂O₄²⁻] = y.\n\nStep 2: Express Ksp equations:\nKsp1 = [Ca²⁺] [CO₃²⁻] = (x + y) x\nKsp2 = [Ca²⁺] [C₂O₄²⁻] = (x + y) y.\n\nStep 3: Add the two solubility product expressions:\nKsp1 + Ksp2 = (x + y) x + (x + y) y = (x + y)(x + y) = (x + y)².\nSince [Ca²⁺] = x + y:\n[Ca²⁺]² = Ksp1 + Ksp2\n[Ca²⁺] = √(Ksp1 + Ksp2).\n\nStep 4: Substitute the values:\nKsp1 + Ksp2 = (4.7 × 10⁻⁹) + (1.3 × 10⁻⁹) = 6.0 × 10⁻⁹ = 60 × 10⁻¹⁰ M²\n[Ca²⁺] = √(60 × 10⁻¹⁰) ≈ 7.74596 × 10⁻⁵ M ≈ 7.746 × 10⁻⁵ M.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two sparingly soluble salts AB and AC have Ksp values of 3.0 × 10⁻¹⁰ and 1.0 × 10⁻¹⁰. In a saturated solution containing both salts, [A⁺] is:",
      option_a: "2.0 × 10⁻⁵ M",
      option_b: "1.0 × 10⁻⁵ M",
      option_c: "4.0 × 10⁻⁵ M",
      option_d: "1.73 × 10⁻⁵ M",
      correct_option: "A",
      explanation: "Step 1: [A⁺] = √(Ksp1 + Ksp2) = √(3.0 × 10⁻¹⁰ + 1.0 × 10⁻¹⁰) = √(4.0 × 10⁻¹⁰) = 2.0 × 10⁻⁵ M.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1683,
    question: "At 100°C, the Kw of water is 55 times its value at 25°C. What will be the pH of a neutral solution? (log 55 = 1.74) [NEET 2013 Karnataka]",
    optionA: "7.00",
    optionB: "7.87",
    optionC: "5.13",
    optionD: "6.13",
    correctOption: "D",
    explanation: "Step 1: Determine Kw at 100°C:\nAt 25°C, Kw = 10⁻¹⁴.\nAt 100°C, Kw = 55 × 10⁻¹⁴.\n\nStep 2: Condition for neutrality in pure water:\nIn any neutral aqueous solution, [H⁺] = [OH⁻].\nKw = [H⁺] [OH⁻] = [H⁺]²\n[H⁺] = √(Kw) = √(55 × 10⁻¹⁴) = (√55) × 10⁻⁷ M.\n\nStep 3: Calculate pH:\npH = −log[H⁺] = −log[(55)¹ᐟ² × 10⁻⁷] = 7 − (1/2) log 55.\nGiven: log 55 = 1.74\npH = 7 − (1/2) × 1.74 = 7 − 0.87 = 6.13.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If Kw of water at 350 K is 10⁻¹³, the pH of pure neutral water at this temperature is:",
      option_a: "6.5",
      option_b: "7.0",
      option_c: "6.0",
      option_d: "7.5",
      correct_option: "A",
      explanation: "Step 1: [H⁺] = √Kw = √(10⁻¹³) = 10⁻⁶·⁵ M ⇒ pH = 6.5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1682,
    question: "Accumulation of lactic acid (HC₃H₅O₃), a monobasic acid, in tissues leads to pain and a feeling of fatigue. In a 0.10 M aqueous solution, lactic acid is 3.7% dissociated. The value of the dissociation constant, Ka, for this acid will be: [NEET 2013 Karnataka]",
    optionA: "1.4 × 10⁻⁵",
    optionB: "1.4 × 10⁻⁴",
    optionC: "3.7 × 10⁻⁴",
    optionD: "2.8 × 10⁻⁴",
    correctOption: "B",
    explanation: "Step 1: Convert percentage dissociation to degree of dissociation α:\nα = 3.7% = 3.7 / 100 = 0.037 = 3.7 × 10⁻².\n\nStep 2: Apply Ostwald's dilution law for Ka of a weak monoprotic acid:\nKa = (C α²) / (1 − α).\nSince α = 0.037 << 1, we can approximate 1 − α ≈ 1:\nKa ≈ C α².\n\nStep 3: Substitute the numerical values:\nC = 0.10 M\nα = 0.037\nKa = 0.10 × (0.037)² = 0.10 × 0.001369 = 0.0001369 = 1.369 × 10⁻⁴ ≈ 1.4 × 10⁻⁴.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A 0.05 M solution of a weak acid is 2% dissociated. Its dissociation constant Ka is:",
      option_a: "2.0 × 10⁻⁵",
      option_b: "1.0 × 10⁻⁵",
      option_c: "4.0 × 10⁻⁵",
      option_d: "2.0 × 10⁻⁴",
      correct_option: "A",
      explanation: "Step 1: α = 0.02. Ka = C α² = 0.05 × (0.02)² = 0.05 × 4 × 10⁻⁴ = 2.0 × 10⁻⁵.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1681,
    question: "Which of the following salts will give the highest pH in water? [AIPMT 2014]",
    optionA: "KCl",
    optionB: "NaCl",
    optionC: "Na₂CO₃",
    optionD: "CuSO₄",
    correctOption: "C",
    explanation: "Step 1: Determine the acid-base origin and hydrolysis behavior of each salt:\n- KCl and NaCl: Salts of strong acid (HCl) and strong bases (KOH, NaOH). Neither cation nor anion hydrolyzes significantly. Solutions are neutral with pH ≈ 7.\n- CuSO₄: Salt of weak base Cu(OH)₂ and strong acid H₂SO₄. Cu²⁺ undergoes cationic hydrolysis releasing H⁺ ions, making the solution acidic (pH < 7).\n- Na₂CO₃: Salt of strong base (NaOH) and very weak diprotic acid (H₂CO₃, Ka₂ ≈ 4.7 × 10⁻¹¹). The carbonate ion (CO₃²⁻) undergoes strong anionic hydrolysis:\nCO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻\nThis generates a significant concentration of OH⁻ ions, making the solution distinctly basic (pH ≈ 11.5).\n\nStep 2: Compare pH:\nNa₂CO₃ gives the highest pH in water.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following salts produces an alkaline solution (pH > 7) when dissolved in water?",
      option_a: "CH₃COONa",
      option_b: "NH₄Cl",
      option_c: "FeCl₃",
      option_d: "KNO₃",
      correct_option: "A",
      explanation: "Step 1: Acetate ion undergoes anionic hydrolysis to release OH⁻, making the solution basic (pH > 7).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1680,
    question: "The Ksp values of Ag₂CrO₄, AgCl, AgBr and AgI are respectively 1.1 × 10⁻¹², 1.8 × 10⁻¹⁰, 5.0 × 10⁻¹³ and 8.3 × 10⁻¹⁷. Which one of the following salts will precipitate last if AgNO₃ solution is added to a solution containing equal moles of NaCl, NaBr, NaI and Na₂CrO₄? [AIPMT 2015 Cancelled]",
    optionA: "AgBr",
    optionB: "Ag₂CrO₄",
    optionC: "AgI",
    optionD: "AgCl",
    correctOption: "B",
    explanation: "Step 1: Condition for precipitation:\nA salt precipitates when its ionic product exceeds its solubility product Ksp. The salt that requires the HIGHEST [Ag⁺] to initiate precipitation will precipitate LAST.\n\nStep 2: Calculate minimum [Ag⁺] required for each salt (assuming anion concentration = 1 M for comparison):\n- For AgI: [Ag⁺] = Ksp / [I⁻] = 8.3 × 10⁻¹⁷ M (precipitates first).\n- For AgBr: [Ag⁺] = Ksp / [Br⁻] = 5.0 × 10⁻¹³ M.\n- For AgCl: [Ag⁺] = Ksp / [Cl⁻] = 1.8 × 10⁻¹⁰ M.\n- For Ag₂CrO₄ (an A₂B salt): Ksp = [Ag⁺]² [CrO₄²⁻] ⇒ [Ag⁺] = √(Ksp / [CrO₄²⁻]) = √(1.1 × 10⁻¹²) ≈ 1.05 × 10⁻⁶ M.\n\nStep 3: Compare required [Ag⁺]:\n1.05 × 10⁻⁶ M (for Ag₂CrO₄) is by far the highest concentration of Ag⁺ needed among all four salts.\nTherefore, Ag₂CrO₄ precipitates last.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When Ag⁺ is slowly added to a mixture of equal concentrations of Cl⁻, Br⁻, and I⁻, which salt precipitates first?",
      option_a: "AgI",
      option_b: "AgBr",
      option_c: "AgCl",
      option_d: "All precipitate simultaneously",
      correct_option: "A",
      explanation: "Step 1: AgI has the lowest Ksp (8.3 × 10⁻¹⁷) and requires the lowest [Ag⁺] to precipitate, so it precipitates first.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1679,
    question: "Which one of the following pairs of solutions is not an acidic buffer? [AIPMT 2015]",
    optionA: "CH₃COOH and CH₃COONa",
    optionB: "H₂CO₃ and Na₂CO₃",
    optionC: "H₃PO₄ and Na₃PO₄",
    optionD: "HClO₄ and NaClO₄",
    correctOption: "D",
    explanation: "Step 1: Define an acidic buffer:\nAn acidic buffer requires a WEAK acid and its conjugate base / salt with a strong base.\n\nStep 2: Evaluate the acid strength in each pair:\n- (A) CH₃COOH is a weak acid; forms an acidic buffer with CH₃COONa.\n- (B) H₂CO₃ is a weak acid; forms an acidic buffer with its salt.\n- (C) H₃PO₄ is a weak polyprotic acid; forms an acidic buffer with its phosphate salt.\n- (D) HClO₄ (perchloric acid) is one of the strongest known mineral acids. Strong acids dissociate 100% and cannot set up an equilibrium reserve to resist changes in pH. Therefore, HClO₄ and NaClO₄ cannot act as a buffer.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following mixtures CANNOT function as a buffer?",
      option_a: "HNO₃ and NaNO₃",
      option_b: "HCN and NaCN",
      option_c: "HCOOH and HCOONa",
      option_d: "NH₄OH and NH₄Cl",
      correct_option: "A",
      explanation: "Step 1: Nitric acid (HNO₃) is a strong acid and cannot form a buffer with its salt.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1678,
    question: "What is the pH of the resulting solution when equal volumes of 0.1 M NaOH and 0.01 M HCl are mixed? [AIPMT 2015]",
    optionA: "2.0",
    optionB: "7.0",
    optionC: "1.04",
    optionD: "12.65",
    correctOption: "D",
    explanation: "Step 1: Calculate moles of reactants in equal volume V litres of each:\nMoles of OH⁻ from NaOH = 0.1 × V mol\nMoles of H⁺ from HCl = 0.01 × V mol.\n\nStep 2: Neutralisation reaction:\nH⁺ + OH⁻ → H₂O\nUnreacted excess moles of OH⁻ = (0.1 − 0.01) V = 0.09 V mol.\n\nStep 3: Calculate concentration of OH⁻ in the mixed solution:\nTotal volume = V + V = 2V litres.\n[OH⁻] = (0.09 V) / (2V) = 0.045 M = 4.5 × 10⁻² M.\n\nStep 4: Calculate pOH and pH:\npOH = −log[OH⁻] = −log(4.5 × 10⁻²) = 2 − log(4.5) = 2 − 0.653 = 1.347 ≈ 1.35.\npH = 14 − pOH = 14 − 1.35 = 12.65.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Equal volumes of 0.2 M NaOH and 0.1 M HCl are mixed. The pH of the resulting solution is approximately:",
      option_a: "12.7",
      option_b: "13.0",
      option_c: "1.3",
      option_d: "7.0",
      correct_option: "A",
      explanation: "Step 1: Excess OH⁻ = (0.2 − 0.1) / 2 = 0.05 M. pOH = −log(0.05) ≈ 1.30 ⇒ pH = 14 − 1.30 = 12.7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1677,
    question: "MY and NY₃, two nearly insoluble salts, have the same Ksp values of 6.2 × 10⁻¹³ at room temperature. Which statement would be true in regard to MY and NY₃? [NEET 2016 Phase 1]",
    optionA: "The salts MY and NY₃ are more soluble in 0.5 M KY than in pure water.",
    optionB: "The addition of the salt KY to a solution of MY and NY₃ will have no effect on their solubilities.",
    optionC: "The molar solubilities of MY and NY₃ in water are identical.",
    optionD: "The molar solubility of MY in water is less than that of NY₃.",
    correctOption: "D",
    explanation: "Step 1: Calculate molar solubility s₁ of the AB salt MY:\nMY(s) ⇌ M⁺ + Y⁻\nKsp = s₁² = 6.2 × 10⁻¹³\ns₁ = √(6.2 × 10⁻¹³) = √(62 × 10⁻¹⁴) ≈ 7.87 × 10⁻⁷ mol L⁻¹.\n\nStep 2: Calculate molar solubility s₂ of the AB₃ salt NY₃:\nNY₃(s) ⇌ N³⁺ + 3 Y⁻\nKsp = [N³⁺] [Y⁻]³ = (s₂) (3s₂)³ = 27 s₂⁴\n27 s₂⁴ = 6.2 × 10⁻¹³\ns₂⁴ = (6.2 × 10⁻¹³) / 27 ≈ 0.2296 × 10⁻¹³ = 2.296 × 10⁻¹⁴\ns₂ = (2.296 × 10⁻¹⁴)¹ᐟ⁴ ≈ 3.89 × 10⁻⁴ mol L⁻¹.\n\nStep 3: Compare molar solubilities:\ns₁ (7.87 × 10⁻⁷ mol L⁻¹) < s₂ (3.89 × 10⁻⁴ mol L⁻¹).\nTherefore, the molar solubility of MY in water is less than that of NY₃.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two salts AB and AB₂ have the same numerical Ksp of 4 × 10⁻¹². Which salt is more soluble in water?",
      option_a: "AB₂ is more soluble than AB",
      option_b: "AB is more soluble than AB₂",
      option_c: "Both have identical solubility",
      option_d: "Cannot be determined without temperature",
      correct_option: "A",
      explanation: "Step 1: For AB, s = √Ksp = 2 × 10⁻⁶ M. For AB₂, 4s³ = 4 × 10⁻¹² ⇒ s = 10⁻⁴ M. Thus AB₂ is more soluble.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

