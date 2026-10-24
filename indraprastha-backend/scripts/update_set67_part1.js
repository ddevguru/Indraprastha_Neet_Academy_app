const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 3708,
    similarQuestion: {
      question: "Calculate the EMF (E_cell) of the galvanic cell Zn(s) | Zn²⁺(0.01 M) || Ag⁺(0.1 M) | Ag(s) at 298 K. (Given: E°(Zn²⁺/Zn) = −0.76 V, E°(Ag⁺/Ag) = +0.80 V, and 2.303 RT/F = 0.0591 V)",
      option_a: "1.560 V",
      option_b: "1.530 V",
      option_c: "1.590 V",
      option_d: "1.480 V",
      correct_option: "A",
      explanation: "Step 1: Write the overall cell reaction:\nAnode: Zn(s) → Zn²⁺(aq) + 2e⁻\nCathode: 2Ag⁺(aq) + 2e⁻ → 2Ag(s)\nOverall: Zn(s) + 2Ag⁺(aq) → Zn²⁺(aq) + 2Ag(s) with n = 2 electrons.\n\nStep 2: Calculate standard EMF:\nE°_cell = E°(cathode) − E°(anode) = +0.80 V − (−0.76 V) = +1.560 V.\n\nStep 3: Evaluate reaction quotient Q:\nQ = [Zn²⁺] / [Ag⁺]² = (0.01) / (0.1)² = 0.01 / 0.01 = 1.\n\nStep 4: Apply Nernst equation:\nE_cell = E°_cell − (0.0591 / 2) log Q = 1.560 V − (0.02955) log(1) = 1.560 V − 0 = 1.560 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3709,
    similarQuestion: {
      question: "A hydrogen gas electrode (P(H₂) = 1 atm) is dipped into a solution of pH = 3 at 298 K. The reduction potential of this hydrogen electrode is:",
      option_a: "−0.177 V",
      option_b: "+0.177 V",
      option_c: "−0.059 V",
      option_d: "−0.118 V",
      correct_option: "A",
      explanation: "Step 1: The reduction half-reaction for the hydrogen electrode is:\n2H⁺(aq) + 2e⁻ → H₂(g)\n\nStep 2: Apply the Nernst equation at 298 K:\nE(H⁺/H₂) = E°(H⁺/H₂) − (0.0591 / 1) log (1 / [H⁺])\nSince E°(H⁺/H₂) = 0 V and pH = −log [H⁺]:\nE(H⁺/H₂) = −0.0591 × pH.\n\nStep 3: Substitute pH = 3:\nE = −0.0591 × 3 = −0.1773 V ≈ −0.177 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3710,
    similarQuestion: {
      question: "For the cell reaction A(s) + 2B⁺(aq) → A²⁺(aq) + 2B(s), the equilibrium constant Kc is 1.0 × 10¹⁴ at 298 K. The standard cell potential E°_cell is approximately: (Take 2.303 RT/F = 0.0591 V)",
      option_a: "0.414 V",
      option_b: "0.828 V",
      option_c: "0.207 V",
      option_d: "0.591 V",
      correct_option: "A",
      explanation: "Step 1: The relation between standard cell potential E°_cell and equilibrium constant Kc is:\nE°_cell = (0.0591 / n) × log Kc\n\nStep 2: Here, n = 2 electrons are transferred during the redox reaction.\n\nStep 3: Substitute the values:\nE°_cell = (0.0591 / 2) × log(1.0 × 10¹⁴) = 0.02955 × 14 = 0.4137 V ≈ 0.414 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3711,
    similarQuestion: {
      question: "Given the standard reduction potentials: Fe³⁺(aq) + e⁻ → Fe²⁺(aq), E°₁ = +0.77 V and Fe²⁺(aq) + 2e⁻ → Fe(s), E°₂ = −0.44 V. What is the standard reduction potential for Fe³⁺(aq) + 3e⁻ → Fe(s)?",
      option_a: "−0.037 V",
      option_b: "+0.330 V",
      option_c: "−0.110 V",
      option_d: "+0.110 V",
      correct_option: "A",
      explanation: "Step 1: Use standard Gibbs free energy changes which are additive:\nΔG° = −nFE°\nFor Reaction 1 (n₁ = 1): ΔG°₁ = −1 × F × (0.77)\nFor Reaction 2 (n₂ = 2): ΔG°₂ = −2 × F × (−0.44)\n\nStep 2: For the overall reaction Fe³⁺ + 3e⁻ → Fe (n₃ = 3):\nΔG°₃ = ΔG°₁ + ΔG°₂\n−3 F E°₃ = −1 F (0.77) + (−2 F (−0.44))\n\nStep 3: Solve for E°₃:\n3 E°₃ = 0.77 + 2(−0.44) = 0.77 − 0.88 = −0.11 V\nE°₃ = −0.11 / 3 ≈ −0.0367 V ≈ −0.037 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3712,
    similarQuestion: {
      question: "Consider the standard reduction potentials of four metal cations:\nE°(Zn²⁺/Zn) = −0.76 V, E°(Fe²⁺/Fe) = −0.44 V, E°(Cu²⁺/Cu) = +0.34 V, and E°(Ag⁺/Ag) = +0.80 V.\nWhich species is the strongest oxidising agent?",
      option_a: "Ag⁺",
      option_b: "Zn²⁺",
      option_c: "Cu",
      option_d: "Fe²⁺",
      correct_option: "A",
      explanation: "Step 1: The oxidising power of a chemical species corresponds to its tendency to gain electrons (undergo reduction).\nStep 2: A species with a more positive standard reduction potential (E°) has a greater tendency to be reduced and therefore acts as a stronger oxidising agent.\nStep 3: Comparing the reduction potentials, Ag⁺ has the highest positive reduction potential (+0.80 V), making it the strongest oxidising agent among the given species.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3713,
    similarQuestion: {
      question: "Match the chemical species in Column-I with their characteristic electrochemical role in Column-II:\nColumn-I:\n(i) Li(s)\n(ii) F₂(g)\n(iii) Pt(s)\nColumn-II:\n(a) Strongest oxidising non-metal\n(b) Inert electrode material\n(c) Strongest reducing metallic element",
      option_a: "(i)-(c), (ii)-(a), (iii)-(b)",
      option_b: "(i)-(a), (ii)-(c), (iii)-(b)",
      option_c: "(i)-(c), (ii)-(b), (iii)-(a)",
      option_d: "(i)-(b), (ii)-(a), (iii)-(c)",
      correct_option: "A",
      explanation: "Step 1: Lithium (Li) has the most negative standard reduction potential (−3.05 V) in the electrochemical series due to its very high hydration enthalpy, making it the strongest reducing metallic element: (i)-(c).\nStep 2: Fluorine gas (F₂) has the highest positive reduction potential (+2.87 V), making it the strongest oxidising non-metal: (ii)-(a).\nStep 3: Platinum (Pt) is chemically unreactive and provides a conducting surface for electron transfer in gas electrodes, acting as an inert electrode material: (iii)-(b).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3714,
    similarQuestion: {
      question: "Assertion (A): Copper sulphate (CuSO₄) solution cannot be stored in a zinc container.\nReason (R): Zinc has a more negative standard reduction potential than copper and spontaneously reduces Cu²⁺ ions to metallic copper.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: The standard electrode potentials are E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V.\nStep 2: Because zinc has a lower (more negative) reduction potential than copper, zinc readily undergoes oxidation: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) with E°_cell = +1.10 V > 0.\nStep 3: This spontaneous reaction dissolves the zinc container. Hence, CuSO₄ cannot be stored in a zinc vessel, and Reason (R) correctly explains Assertion (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3715,
    similarQuestion: {
      question: "A steady current of 2.0 A flows through an electrolytic wire for 1 second. How many electrons pass across any cross-section of the wire per second? (Charge of an electron = 1.6 × 10⁻¹⁹ C)",
      option_a: "1.25 × 10¹⁹",
      option_b: "6.25 × 10¹⁸",
      option_c: "3.125 × 10¹⁹",
      option_d: "2.50 × 10¹⁸",
      correct_option: "A",
      explanation: "Step 1: The total charge passed in time t is:\nQ = I × t = 2.0 A × 1 s = 2.0 C.\n\nStep 2: The number of electrons n is given by:\nn = Q / e\n\nStep 3: Substitute e = 1.6 × 10⁻¹⁹ C:\nn = 2.0 / (1.6 × 10⁻¹⁹) = 1.25 × 10¹⁹ electrons.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3716,
    similarQuestion: {
      question: "A conductivity cell contains a 0.20 M electrolyte solution between two parallel electrodes of cross-sectional area 2.0 cm² separated by a distance of 1.5 cm. If the measured resistance is 75 Ω, what is the molar conductivity (Λ_m) of the solution?",
      option_a: "50 S cm² mol⁻¹",
      option_b: "25 S cm² mol⁻¹",
      option_c: "100 S cm² mol⁻¹",
      option_d: "10 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Calculate the cell constant G*:\nG* = l / A = 1.5 cm / 2.0 cm² = 0.75 cm⁻¹.\n\nStep 2: Calculate specific conductivity κ:\nκ = G* / R = 0.75 cm⁻¹ / 75 Ω = 0.010 S cm⁻¹.\n\nStep 3: Calculate molar conductivity Λ_m:\nΛ_m = (κ × 1000) / C = (0.010 × 1000) / 0.20 = 10 / 0.20 = 50 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3717,
    similarQuestion: {
      question: "The limiting molar conductivities at 298 K for NaCl, KNO₃, and NaNO₃ are 126.4, 145.0, and 121.6 S cm² mol⁻¹, respectively. According to Kohlrausch's law, the limiting molar conductivity of KCl is:",
      option_a: "149.8 S cm² mol⁻¹",
      option_b: "150.2 S cm² mol⁻¹",
      option_c: "140.0 S cm² mol⁻¹",
      option_d: "129.8 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Apply Kohlrausch's law of independent migration of ions:\nΛ°(KCl) = λ°(K⁺) + λ°(Cl⁻)\n\nStep 2: Express in terms of known salt conductivities:\nΛ°(KCl) = Λ°(KNO₃) + Λ°(NaCl) − Λ°(NaNO₃)\n\nStep 3: Substitute the numerical values:\nΛ°(KCl) = 145.0 + 126.4 − 121.6 = 271.4 − 121.6 = 149.8 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3718,
    similarQuestion: {
      question: "The molar conductivity of a 0.05 M monobasic weak acid HA is 10 S cm² mol⁻¹, and its limiting molar conductivity at infinite dilution is 200 S cm² mol⁻¹. What is the acid dissociation constant (K_a) of HA?",
      option_a: "1.32 × 10⁻⁴ mol L⁻¹",
      option_b: "2.50 × 10⁻⁴ mol L⁻¹",
      option_c: "5.00 × 10⁻⁵ mol L⁻¹",
      option_d: "1.25 × 10⁻³ mol L⁻¹",
      correct_option: "A",
      explanation: "Step 1: Calculate the degree of dissociation (α):\nα = Λ_m / Λ°_m = 10 / 200 = 0.05.\n\nStep 2: Use Ostwald's dilution law for weak acid HA:\nK_a = (C × α²) / (1 − α)\n\nStep 3: Substitute C = 0.05 M and α = 0.05:\nK_a = [0.05 × (0.05)²] / (1 − 0.05) = (0.05 × 0.0025) / 0.95 = 0.000125 / 0.95 ≈ 1.316 × 10⁻⁴ mol L⁻¹ ≈ 1.32 × 10⁻⁴ mol L⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3719,
    similarQuestion: {
      question: "When an aqueous solution of sodium sulphate (Na₂SO₄) is electrolysed between inert platinum electrodes, what products are discharged at the cathode and anode, respectively?",
      option_a: "H₂(g) at cathode and O₂(g) at anode",
      option_b: "Na(s) at cathode and SO₂(g) at anode",
      option_c: "O₂(g) at cathode and H₂(g) at anode",
      option_d: "Na(s) at cathode and O₂(g) at anode",
      correct_option: "A",
      explanation: "Step 1: At the cathode, water (E° = −0.83 V) has a higher reduction potential than Na⁺ (E° = −2.71 V):\n2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq)\nThus, H₂(g) is evolved at the cathode.\n\nStep 2: At the anode, water is oxidised in preference to SO₄²⁻ ions:\n2H₂O(l) → O₂(g) + 4H⁺(aq) + 4e⁻\nThus, O₂(g) is liberated at the anode.\n\nStep 3: Overall, electrolysis of aqueous Na₂SO₄ amounts to the electrolysis of water, yielding H₂ at cathode and O₂ at anode.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3720,
    similarQuestion: {
      question: "Which of the following statements correctly describes the effect of dilution on electrolytic conductivity (κ) and molar conductivity (Λ_m)?",
      option_a: "κ decreases while Λ_m increases upon dilution",
      option_b: "Both κ and Λ_m increase upon dilution",
      option_c: "Both κ and Λ_m decrease upon dilution",
      option_d: "κ increases while Λ_m decreases upon dilution",
      correct_option: "A",
      explanation: "Step 1: Conductivity (κ) is the conductance of 1 cm³ of solution. Upon dilution, the number of current-carrying ions per unit volume decreases, so κ decreases.\nStep 2: Molar conductivity (Λ_m = κ × V) increases with dilution because the increase in volume containing 1 mole of electrolyte more than compensates for the decrease in κ, and ionic mobility increases due to decreased interionic attractions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3721,
    similarQuestion: {
      question: "What is the total electric charge required in coulombs for the complete reduction of 0.20 mole of IO₃⁻ into I₂ in acidic medium? (1 F = 96500 C)",
      option_a: "96,500 C",
      option_b: "48,250 C",
      option_c: "193,000 C",
      option_d: "19,300 C",
      correct_option: "A",
      explanation: "Step 1: Write the balanced reduction half-reaction:\n2IO₃⁻ + 12H⁺ + 10e⁻ → I₂ + 6H₂O\n\nStep 2: Determine moles of electrons per mole of IO₃⁻:\n2 moles of IO₃⁻ require 10 moles of electrons (10 F).\nTherefore, 1 mole of IO₃⁻ requires 5 moles of electrons (5 F).\n\nStep 3: Calculate charge for 0.20 mole of IO₃⁻:\nCharge = 0.20 mol × 5 F/mol = 1.0 F = 96,500 C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3722,
    similarQuestion: {
      question: "A constant electric current of 1.93 A is passed through dilute aqueous H₂SO₄ for 500 seconds using inert platinum electrodes. What volume of O₂(g) is liberated at the anode at STP? (1 mole of gas at STP occupies 22.4 L)",
      option_a: "56 mL",
      option_b: "112 mL",
      option_c: "28 mL",
      option_d: "224 mL",
      correct_option: "A",
      explanation: "Step 1: Calculate total charge Q:\nQ = I × t = 1.93 A × 500 s = 965 C.\n\nStep 2: Convert charge to Faradays:\nNumber of Faradays = 965 / 96500 = 0.010 F (moles of electrons).\n\nStep 3: Oxidation of water to O₂ is:\n2H₂O → O₂(g) + 4H⁺ + 4e⁻\n4 moles of electrons produce 1 mole of O₂ (22,400 mL at STP).\n\nStep 4: Calculate liberated volume of O₂:\nVolume = (0.010 F / 4) × 22,400 mL = 0.0025 × 22,400 mL = 56 mL.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3723,
    similarQuestion: {
      question: "Arrange the following chlorine-containing species in order of increasing oxidation state of chlorine: Cl₂, ClO⁻, ClO₃⁻, ClO₄⁻",
      option_a: "Cl₂ < ClO⁻ < ClO₃⁻ < ClO₄⁻",
      option_b: "ClO⁻ < Cl₂ < ClO₃⁻ < ClO₄⁻",
      option_c: "Cl₂ < ClO₃⁻ < ClO⁻ < ClO₄⁻",
      option_d: "ClO₄⁻ < ClO₃⁻ < ClO⁻ < Cl₂",
      correct_option: "A",
      explanation: "Step 1: Calculate the oxidation state of Cl in each species:\n- Cl₂: 0 (elemental form)\n- ClO⁻: x + (−2) = −1 => x = +1\n- ClO₃⁻: x + 3(−2) = −1 => x = +5\n- ClO₄⁻: x + 4(−2) = −1 => x = +7\n\nStep 2: Arranging in increasing order of oxidation state:\nCl₂ (0) < ClO⁻ (+1) < ClO₃⁻ (+5) < ClO₄⁻ (+7).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3724,
    similarQuestion: {
      question: "In the balanced chemical equation for the oxidation of oxalate by permanganate in acidic medium:\na MnO₄⁻ + b C₂O₄²⁻ + c H⁺ → d Mn²⁺ + e CO₂ + f H₂O\nWhat are the stoichiometric coefficients a, b, and e respectively?",
      option_a: "a = 2, b = 5, e = 10",
      option_b: "a = 1, b = 2, e = 4",
      option_c: "a = 5, b = 2, e = 10",
      option_d: "a = 2, b = 5, e = 5",
      correct_option: "A",
      explanation: "Step 1: Balance reduction half-reaction:\nMnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O  (multiply by 2)\n2MnO₄⁻ + 16H⁺ + 10e⁻ → 2Mn²⁺ + 8H₂O\n\nStep 2: Balance oxidation half-reaction:\nC₂O₄²⁻ → 2CO₂ + 2e⁻  (multiply by 5)\n5C₂O₄²⁻ → 10CO₂ + 10e⁻\n\nStep 3: Add both half-reactions to obtain overall equation:\n2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O\nThus, a = 2, b = 5, and e = 10.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3725,
    similarQuestion: {
      question: "How many moles of Fe²⁺ ions can be completely oxidised by 1 mole of Cr₂O₇²⁻ in an acidic aqueous medium?",
      option_a: "6 moles",
      option_b: "3 moles",
      option_c: "2 moles",
      option_d: "1 mole",
      correct_option: "A",
      explanation: "Step 1: Write the balanced reduction half-reaction for dichromate in acid:\nCr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O\n1 mole of Cr₂O₇²⁻ consumes 6 moles of electrons.\n\nStep 2: Write the oxidation half-reaction for Fe²⁺:\nFe²⁺ → Fe³⁺ + e⁻\nEach mole of Fe²⁺ releases 1 mole of electrons.\n\nStep 3: Equate electrons transferred:\n1 mole of Cr₂O₇²⁻ oxidises exactly 6 moles of Fe²⁺.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3726,
    similarQuestion: {
      question: "Which of the following redox reactions is an example of a disproportionation reaction?",
      option_a: "3Cl₂(g) + 6OH⁻(aq) → 5Cl⁻(aq) + ClO₃⁻(aq) + 3H₂O(l)",
      option_b: "2KClO₃(s) → 2KCl(s) + 3O₂(g)",
      option_c: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)",
      option_d: "NH₄NO₂(s) → N₂(g) + 2H₂O(l)",
      correct_option: "A",
      explanation: "Step 1: A disproportionation reaction is a redox reaction in which atoms of the same element in a single oxidation state are simultaneously oxidised and reduced.\nStep 2: In the reaction 3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O:\n- Cl₂ has an oxidation state of 0.\n- It is reduced to Cl⁻ (−1).\n- It is oxidised to ClO₃⁻ (+5).\nStep 3: Thus, chlorine undergoes disproportionation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3727,
    similarQuestion: {
      question: "In which of the following reactions does concentrated sulphuric acid (H₂SO₄) act purely as a non-volatile acid rather than as an oxidising agent?",
      option_a: "2NaCl(s) + H₂SO₄(conc) → Na₂SO₄ + 2HCl(g)",
      option_b: "C(s) + 2H₂SO₄(conc) → CO₂ + 2SO₂ + 2H₂O",
      option_c: "Cu(s) + 2H₂SO₄(conc) → CuSO₄ + SO₂ + 2H₂O",
      option_d: "2HBr + H₂SO₄(conc) → Br₂ + SO₂ + 2H₂O",
      correct_option: "A",
      explanation: "Step 1: Check the oxidation state changes in each reaction:\n- In 2NaCl + H₂SO₄ → Na₂SO₄ + 2HCl, Na is +1, Cl is −1, H is +1, and S is +6 throughout. No species undergoes redox; H₂SO₄ acts purely as a non-volatile acid displacing volatile HCl.\n- In B, C, and D, sulfur in H₂SO₄ (+6) is reduced to SO₂ (+4), functioning as an oxidising agent.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3728,
    similarQuestion: {
      question: "Standard reduction potentials are: E°(Ce⁴⁺/Ce³⁺) = +1.74 V and E°(Fe³⁺/Fe²⁺) = +0.77 V. Which of the following statements is INCORRECT?",
      option_a: "Ce³⁺ is a stronger oxidising agent than Fe³⁺",
      option_b: "Ce⁴⁺ is a stronger oxidising agent than Fe³⁺",
      option_c: "Fe²⁺ can be spontaneously oxidised to Fe³⁺ by Ce⁴⁺",
      option_d: "Ce⁴⁺ has a higher tendency to undergo reduction than Fe³⁺",
      correct_option: "A",
      explanation: "Step 1: E°(Ce⁴⁺/Ce³⁺) = +1.74 V indicates that Ce⁴⁺ is easily reduced to Ce³⁺, making Ce⁴⁺ a very strong oxidising agent (stronger than Fe³⁺ with E° = +0.77 V).\nStep 2: Ce³⁺ is the reduced form (conjugate reducing agent), not an oxidising agent at all. It cannot oxidise anything with lower reduction potential.\nStep 3: Hence, the assertion that Ce³⁺ is a stronger oxidising agent than Fe³⁺ is entirely incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3729,
    similarQuestion: {
      question: "Which equation represents the Debye-Hückel-Onsager relationship for molar conductivity of a strong electrolyte as a function of concentration C?",
      option_a: "Λ_m = Λ°_m − A√C",
      option_b: "Λ_m = Λ°_m + A√C",
      option_c: "Λ_m = Λ°_m − A C²",
      option_d: "Λ_m = Λ°_m / (1 + A√C)",
      correct_option: "A",
      explanation: "Step 1: For strong electrolytes in dilute solutions, the variation of molar conductivity Λ_m with concentration C follows the Debye-Hückel-Onsager equation:\nΛ_m = Λ°_m − A√C\nStep 2: Here, Λ°_m is the limiting molar conductivity at infinite dilution and A is an empirical constant accounting for electrophoretic and relaxation effects.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3730,
    similarQuestion: {
      question: "In the Debye-Hückel-Onsager equation Λ_m = Λ°_m − A√C, the constant 'A' for a given solvent and temperature depends primarily on:",
      option_a: "The type of electrolyte (charges on the cation and anion)",
      option_b: "The molecular weight of the solute",
      option_c: "The initial volume of the solution",
      option_d: "The atmospheric pressure",
      correct_option: "A",
      explanation: "Step 1: The constant A in the Debye-Hückel-Onsager relation incorporates relaxation and electrophoretic retardations.\nStep 2: It depends on the viscosity and dielectric constant of the solvent, the absolute temperature, and the ionic charges (the stoichiometry type of the electrolyte, e.g., 1-1, 1-2, or 2-2 electrolytes).\nStep 3: All electrolytes of a given valence type (e.g., NaCl and KCl as 1-1) exhibit the same value of A under identical conditions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3731,
    similarQuestion: {
      question: "Given the standard electrode potentials: E°(Sn⁴⁺/Sn²⁺) = +0.15 V and E°(MnO₄⁻/Mn²⁺) = +1.51 V in acidic solution. The standard cell potential (E°_cell) for the spontaneous reaction is:",
      option_a: "+1.36 V",
      option_b: "+1.66 V",
      option_c: "−1.36 V",
      option_d: "+0.83 V",
      correct_option: "A",
      explanation: "Step 1: Identify cathode and anode for a spontaneous cell (E°_cell > 0):\n- MnO₄⁻ has higher reduction potential (+1.51 V), so it undergoes reduction at the cathode.\n- Sn²⁺ has lower reduction potential (+0.15 V), so it undergoes oxidation at the anode.\n\nStep 2: Calculate standard EMF:\nE°_cell = E°(cathode) − E°(anode) = +1.51 V − (+0.15 V) = +1.36 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3732,
    similarQuestion: {
      question: "The electrical resistance of a conductivity cell filled with 0.01 M KCl solution is 150 Ω. If the specific conductivity (κ) of the solution is 1.40 × 10⁻³ S cm⁻¹, what is the cell constant (G*)?",
      option_a: "0.210 cm⁻¹",
      option_b: "0.105 cm⁻¹",
      option_c: "1.07 cm⁻¹",
      option_d: "0.420 cm⁻¹",
      correct_option: "A",
      explanation: "Step 1: The relationship between conductivity (κ), conductance (G = 1/R), and cell constant (G*) is:\nκ = G × G* = (1 / R) × G*\n\nStep 2: Rearrange to solve for cell constant G*:\nG* = κ × R\n\nStep 3: Substitute the given values:\nG* = (1.40 × 10⁻³ S cm⁻¹) × 150 Ω = 0.210 cm⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3733,
    similarQuestion: {
      question: "Assertion (A): Multiplying a half-cell reaction by a stoichiometric factor of 2 does not change the value of its standard electrode potential E°.\nReason (R): Standard electrode potential E° is an intensive property, whereas standard Gibbs free energy change ΔG° is an extensive property.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: The relation between free energy and cell potential is ΔG° = −nFE°.\nStep 2: When stoichiometric coefficients are multiplied by 2, both the amount of substance and n double, so ΔG° doubles because free energy is an extensive property.\nStep 3: However, E° = −ΔG° / (nF) remains constant because the factor of 2 cancels out. Electrode potential is an intensive property independent of sample size. Thus, Reason (R) correctly explains Assertion (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3734,
    similarQuestion: {
      question: "Given the standard reduction potentials: E°(Ce⁴⁺/Ce³⁺) = +1.61 V and E°(Mg²⁺/Mg) = −2.37 V. What is the standard EMF of the galvanic cell constructed from these two half-cells under standard conditions?",
      option_a: "+3.98 V",
      option_b: "−0.76 V",
      option_c: "+0.76 V",
      option_d: "−3.98 V",
      correct_option: "A",
      explanation: "Step 1: For a galvanic cell under standard conditions, reduction occurs at the electrode with higher reduction potential (cathode) and oxidation at the electrode with lower reduction potential (anode):\nCathode: Ce⁴⁺ + e⁻ → Ce³⁺, E°_cat = +1.61 V\nAnode: Mg → Mg²⁺ + 2e⁻, E°_an = −2.37 V\n\nStep 2: Calculate standard cell EMF:\nE°_cell = E°_cathode − E°_anode = +1.61 V − (−2.37 V) = +1.61 V + 2.37 V = +3.98 V.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Login successful for Set 67 Part 1.');

    for (let i = 0; i < questionsPart1.length; i++) {
      const q = questionsPart1[i];
      const res = await fetch(`${BASE_URL}/admin/practice-questions/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ similarQuestion: q.similarQuestion })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed on ID ${q.id} [${res.status}]: ${text}`);
      }
      console.log(`Updated question ${i + 1}/${questionsPart1.length} (ID: ${q.id})`);
    }
    console.log('Set 67 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 67 Part 1:', err.message);
  }
}

run();
