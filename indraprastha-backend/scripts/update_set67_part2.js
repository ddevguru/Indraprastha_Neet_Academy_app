const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart2 = [
  {
    id: 3735,
    similarQuestion: {
      question: "For the cell reaction Mg(s) + 2Ag⁺(aq) → Mg²⁺(aq) + 2Ag(s), the standard cell EMF is E°_cell = 3.17 V at 298 K. What is the standard Gibbs free energy change (ΔG°) for the reaction? (1 F = 96,487 C mol⁻¹)",
      option_a: "−611.7 kJ mol⁻¹",
      option_b: "−305.9 kJ mol⁻¹",
      option_c: "+611.7 kJ mol⁻¹",
      option_d: "−153.0 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Identify the number of electrons transferred (n):\nMg(s) → Mg²⁺(aq) + 2e⁻ (n = 2).\n\nStep 2: Apply the relationship:\nΔG° = −nFE°_cell\n\nStep 3: Substitute the given parameters:\nΔG° = −2 × (96,487 C mol⁻¹) × (3.17 V) = −611,727 J mol⁻¹ ≈ −611.7 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3736,
    similarQuestion: {
      question: "Based on standard electrode potentials: E°(Mg²⁺/Mg) = −2.37 V, E°(Fe²⁺/Fe) = −0.44 V, and E°(Ag⁺/Ag) = +0.80 V, which of the following reactions is NOT feasible spontaneously?",
      option_a: "FeSO₄(aq) + 2Ag(s) → Fe(s) + Ag₂SO₄(aq)",
      option_b: "FeSO₄(aq) + Mg(s) → MgSO₄(aq) + Fe(s)",
      option_c: "2AgNO₃(aq) + Fe(s) → Fe(NO₃)₂(aq) + 2Ag(s)",
      option_d: "2AgNO₃(aq) + Mg(s) → Mg(NO₃)₂(aq) + 2Ag(s)",
      correct_option: "A",
      explanation: "Step 1: A redox reaction is spontaneous only if E°_cell = E°(cathode) − E°(anode) > 0.\nStep 2: For Fe²⁺ + 2Ag → Fe + 2Ag⁺:\nE°_cell = E°(Fe²⁺/Fe) − E°(Ag⁺/Ag) = −0.44 V − (+0.80 V) = −1.24 V < 0.\nStep 3: Since E°_cell is negative, silver cannot spontaneously displace iron from FeSO₄ solution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3737,
    similarQuestion: {
      question: "Can Ce⁴⁺ ions spontaneously liberate O₂(g) from liquid water in an acidic medium at 298 K? (Given: E°(Ce⁴⁺/Ce³⁺) = +1.74 V and E°(O₂/H₂O) = +1.23 V in acid)",
      option_a: "Yes, because E°_cell = +0.51 V",
      option_b: "No, because E°_cell = −0.51 V",
      option_c: "No, because E°_cell = −2.97 V",
      option_d: "Yes, because E°_cell = +2.97 V",
      correct_option: "A",
      explanation: "Step 1: Write the half-reactions:\nReduction (cathode): 4Ce⁴⁺ + 4e⁻ → 4Ce³⁺, E° = +1.74 V\nOxidation (anode): 2H₂O → O₂ + 4H⁺ + 4e⁻, E° = +1.23 V\n\nStep 2: Calculate standard cell EMF:\nE°_cell = E°(cathode) − E°(anode) = +1.74 V − (+1.23 V) = +0.51 V.\n\nStep 3: Because E°_cell > 0, the reaction is thermodynamically spontaneous.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3738,
    similarQuestion: {
      question: "For the cell reaction Zn(s) + 2Ag⁺(0.01 M) → Zn²⁺(0.10 M) + 2Ag(s) with E°_cell = 1.560 V at 298 K, calculate the cell potential E_cell: (Take 2.303 RT/F = 0.0591 V)",
      option_a: "1.471 V",
      option_b: "1.560 V",
      option_c: "1.649 V",
      option_d: "1.501 V",
      correct_option: "A",
      explanation: "Step 1: Number of transferred electrons n = 2.\nStep 2: Calculate the reaction quotient Q:\nQ = [Zn²⁺] / [Ag⁺]² = (0.10) / (0.01)² = 0.10 / 10⁻⁴ = 1000 = 10³.\nStep 3: Apply the Nernst equation:\nE_cell = E°_cell − (0.0591 / 2) log Q\nE_cell = 1.560 − (0.02955 × 3) = 1.560 − 0.08865 ≈ 1.471 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3739,
    similarQuestion: {
      question: "The limiting molar conductivities at 298 K for potassium propanoate (C₂H₅COOK), hydrochloric acid (HCl), and potassium chloride (KCl) are 88.5, 426.0, and 149.8 S cm² mol⁻¹, respectively. What is the limiting molar conductivity of propanoic acid (C₂H₅COOH)?",
      option_a: "364.7 S cm² mol⁻¹",
      option_b: "487.3 S cm² mol⁻¹",
      option_c: "212.3 S cm² mol⁻¹",
      option_d: "335.5 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Use Kohlrausch's law of independent ionic migration:\nΛ°(C₂H₅COOH) = λ°(C₂H₅COO⁻) + λ°(H⁺)\n\nStep 2: Combine the known electrolyte conductivities:\nΛ°(C₂H₅COOH) = Λ°(C₂H₅COOK) + Λ°(HCl) − Λ°(KCl)\n\nStep 3: Substitute the numerical values:\nΛ°(C₂H₅COOH) = 88.5 + 426.0 − 149.8 = 514.5 − 149.8 = 364.7 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3740,
    similarQuestion: {
      question: "The molar conductivity of a 0.01 M aqueous solution of benzoic acid (C₆H₅COOH) is 16 S cm² mol⁻¹, and its limiting molar conductivity is 400 S cm² mol⁻¹. What is the dissociation constant (K_a) of benzoic acid?",
      option_a: "1.67 × 10⁻⁵ mol L⁻¹",
      option_b: "3.33 × 10⁻⁵ mol L⁻¹",
      option_c: "6.40 × 10⁻⁶ mol L⁻¹",
      option_d: "4.00 × 10⁻⁴ mol L⁻¹",
      correct_option: "A",
      explanation: "Step 1: Calculate the degree of dissociation (α):\nα = Λ_m / Λ°_m = 16 / 400 = 0.04.\n\nStep 2: Use Ostwald's dilution law:\nK_a = (C × α²) / (1 − α)\n\nStep 3: Substitute C = 0.01 M and α = 0.04:\nK_a = [0.01 × (0.04)²] / (1 − 0.04) = (0.01 × 0.0016) / 0.96 = 0.000016 / 0.96 ≈ 1.67 × 10⁻⁵ mol L⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3741,
    similarQuestion: {
      question: "During the electrolysis of aqueous sodium hydroxide (NaOH) using platinum electrodes, which gas is liberated at the anode?",
      option_a: "Oxygen gas (O₂)",
      option_b: "Hydrogen gas (H₂)",
      option_c: "Sodium vapor (Na)",
      option_d: "Ozone gas (O₃)",
      correct_option: "A",
      explanation: "Step 1: At the cathode, water reduction occurs preferentially to produce hydrogen:\n2H₂O + 2e⁻ → H₂(g) + 2OH⁻\n\nStep 2: At the anode, hydroxide ions undergo oxidation:\n4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e⁻\n\nStep 3: Thus, oxygen gas (O₂) is discharged at the anode.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3742,
    similarQuestion: {
      question: "Which of the following reduction half-reactions occupies the highest position (most positive standard reduction potential) in the electrochemical series at 298 K?",
      option_a: "F₂(g) + 2e⁻ → 2F⁻(aq)",
      option_b: "Cl₂(g) + 2e⁻ → 2Cl⁻(aq)",
      option_c: "Ag⁺(aq) + e⁻ → Ag(s)",
      option_d: "Cu²⁺(aq) + 2e⁻ → Cu(s)",
      correct_option: "A",
      explanation: "Step 1: The electrochemical series arranges half-reactions in order of standard reduction potentials (E°).\nStep 2: Fluorine gas has the highest standard reduction potential: E°(F₂/F⁻) = +2.87 V.\nStep 3: By comparison: Cl₂/Cl⁻ is +1.36 V, Ag⁺/Ag is +0.80 V, and Cu²⁺/Cu is +0.34 V.\nStep 4: Hence, F₂/F⁻ occupies the topmost position in the reduction potential series.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3743,
    similarQuestion: {
      question: "In an alkaline hydrogen-oxygen fuel cell used in spacecraft, what are the primary reactants supplied to the electrodes and the sole product produced?",
      option_a: "Reactants: H₂(g) and O₂(g); Product: H₂O(l)",
      option_b: "Reactants: H₂(g) and N₂(g); Product: NH₃(aq)",
      option_c: "Reactants: CH₄(g) and O₂(g); Product: CO₂(g)",
      option_d: "Reactants: H₂(g) and Cl₂(g); Product: HCl(aq)",
      correct_option: "A",
      explanation: "Step 1: In a typical H₂-O₂ fuel cell, hydrogen gas is fed to the anode and oxygen gas is fed to the cathode through porous carbon electrodes containing catalysts.\nStep 2: The overall cell reaction is:\n2H₂(g) + O₂(g) → 2H₂O(l)\nStep 3: The only reaction product is liquid water, making it non-polluting and a vital source of drinking water for astronauts.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3744,
    similarQuestion: {
      question: "For an electrochemical cell involving the transfer of 2 electrons, the standard EMF is E°_cell = 0.2955 V at 298 K. What is the value of the equilibrium constant (K_eq)? (Take 2.303 RT/F = 0.0591 V)",
      option_a: "1.0 × 10¹⁰",
      option_b: "1.0 × 10⁵",
      option_c: "1.0 × 10²⁰",
      option_d: "1.0 × 10²",
      correct_option: "A",
      explanation: "Step 1: Use the relation between E°_cell and equilibrium constant K_eq:\nE°_cell = (0.0591 / n) log K_eq\n\nStep 2: Substitute n = 2 and E°_cell = 0.2955 V:\n0.2955 = (0.0591 / 2) log K_eq = 0.02955 log K_eq\n\nStep 3: Solve for log K_eq:\nlog K_eq = 0.2955 / 0.02955 = 10  =>  K_eq = 10¹⁰ = 1.0 × 10¹⁰.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3745,
    similarQuestion: {
      question: "For the galvanic cell reaction Cd(s) + Pb²⁺(aq) → Cd²⁺(aq) + Pb(s), the standard cell potential is E°_cell = +0.277 V at 298 K. What is the standard Gibbs free energy change (ΔG°) for this reaction? (Take F = 96,500 C mol⁻¹)",
      option_a: "−53.46 kJ mol⁻¹",
      option_b: "−26.73 kJ mol⁻¹",
      option_c: "+53.46 kJ mol⁻¹",
      option_d: "−106.9 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Number of transferred electrons n = 2 (Cd → Cd²⁺ + 2e⁻).\nStep 2: Use ΔG° = −nFE°_cell:\nΔG° = −2 × (96,500 C mol⁻¹) × (0.277 V)\nStep 3: Compute the value:\nΔG° = −53,461 J mol⁻¹ = −53.46 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3746,
    similarQuestion: {
      question: "In a Latimer potential diagram, an intermediate species M^(n+) with adjacent reduction potentials E°_right (reduction to lower state) and E°_left (reduction to it from higher state) will spontaneously undergo disproportionation if:",
      option_a: "E°_right > E°_left",
      option_b: "E°_right < E°_left",
      option_c: "E°_right = E°_left",
      option_d: "E°_right = 0",
      correct_option: "A",
      explanation: "Step 1: In a Latimer diagram, the disproportionation of intermediate M involves reduction (governed by E°_right) and oxidation (the reverse of E°_left).\nStep 2: The EMF for the disproportionation reaction is:\nE°_disp = E°_right − E°_left\nStep 3: For spontaneous disproportionation, E°_disp must be positive, which requires:\nE°_right > E°_left.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3747,
    similarQuestion: {
      question: "During the electrolysis of molten magnesium chloride (MgCl₂), how much time is required to produce 0.050 mole of chlorine gas (Cl₂) at the anode using a steady current of 2.0 A? (1 F = 96,500 C)",
      option_a: "80.4 minutes",
      option_b: "40.2 minutes",
      option_c: "160.8 minutes",
      option_d: "20.1 minutes",
      correct_option: "A",
      explanation: "Step 1: Anode oxidation reaction:\n2Cl⁻ → Cl₂(g) + 2e⁻\n1 mole of Cl₂ requires 2 moles of electrons (2 F).\n\nStep 2: Total charge required for 0.050 mol Cl₂:\nQ = 0.050 mol × 2 F/mol × 96,500 C/F = 9650 C.\n\nStep 3: Calculate time in seconds:\nt = Q / I = 9650 C / 2.0 A = 4825 seconds.\n\nStep 4: Convert to minutes:\nt = 4825 / 60 ≈ 80.4 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3748,
    similarQuestion: {
      question: "Galvanized iron sheets are protected from rusting by a thin coating of zinc. Even if scratches expose the underlying iron, rusting is prevented because:",
      option_a: "Zinc has a more negative standard reduction potential than iron and oxidises preferentially (sacrificial protection)",
      option_b: "Iron has a lower reduction potential and undergoes preferential cathodic protection",
      option_c: "Zinc forms a soluble basic salt that dissolves the iron oxide",
      option_d: "Zinc is completely unreactive towards oxygen and moisture",
      correct_option: "A",
      explanation: "Step 1: Standard reduction potentials are E°(Zn²⁺/Zn) = −0.76 V and E°(Fe²⁺/Fe) = −0.44 V.\nStep 2: Zinc has a more negative reduction potential and is more electropositive than iron, making it far more easily oxidised.\nStep 3: In the presence of moisture and oxygen, zinc acts as the sacrificial anode, supplying electrons to prevent iron from oxidising.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3749,
    similarQuestion: {
      question: "How many electrons are transferred through an electrolyte when a steady current of 3.2 amperes flows for 50 seconds? (e = 1.6 × 10⁻¹⁹ C)",
      option_a: "1.0 × 10²¹",
      option_b: "5.0 × 10²⁰",
      option_c: "2.0 × 10²¹",
      option_d: "3.2 × 10²⁰",
      correct_option: "A",
      explanation: "Step 1: Calculate total charge passed:\nQ = I × t = 3.2 A × 50 s = 160 C.\n\nStep 2: Calculate number of electrons n:\nn = Q / e = 160 / (1.6 × 10⁻¹⁹) = 1.0 × 10²¹ electrons.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3750,
    similarQuestion: {
      question: "If the standard electromotive force (E°_cell) of a chemical reaction is positive at 298 K, which of the following gives the correct signs for the standard Gibbs free energy change (ΔG°) and equilibrium constant (K_eq)?",
      option_a: "ΔG° < 0 and K_eq > 1",
      option_b: "ΔG° > 0 and K_eq < 1",
      option_c: "ΔG° < 0 and K_eq < 1",
      option_d: "ΔG° > 0 and K_eq > 1",
      correct_option: "A",
      explanation: "Step 1: The standard Gibbs free energy change is related to E°_cell by:\nΔG° = −nFE°_cell.\nIf E°_cell > 0, then ΔG° < 0 (the reaction is exergonic and spontaneous).\n\nStep 2: The relation between ΔG° and K_eq is:\nΔG° = −RT ln K_eq.\nFor ΔG° < 0, ln K_eq must be positive, which means K_eq > 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3751,
    similarQuestion: {
      question: "The specific conductivity (κ) of a 0.25 M solution of KCl at 298 K is 2.75 × 10⁻² S cm⁻¹. What is its molar conductivity (Λ_m)?",
      option_a: "110 S cm² mol⁻¹",
      option_b: "55 S cm² mol⁻¹",
      option_c: "220 S cm² mol⁻¹",
      option_d: "68.75 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Formula for molar conductivity is:\nΛ_m = (κ × 1000) / C\n\nStep 2: Substitute κ = 2.75 × 10⁻² S cm⁻¹ and C = 0.25 M:\nΛ_m = (2.75 × 10⁻² × 1000) / 0.25 = 27.5 / 0.25 = 110 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3752,
    similarQuestion: {
      question: "What pressure of hydrogen gas P(H₂) is required to make the reduction potential of a hydrogen electrode equal to zero in a solution of pH = 4 at 298 K?",
      option_a: "10⁻⁸ atm",
      option_b: "10⁻⁴ atm",
      option_c: "10⁻¹⁴ atm",
      option_d: "10⁻² atm",
      correct_option: "A",
      explanation: "Step 1: The potential of the hydrogen electrode is given by:\nE = −0.0591 × pH − (0.0591 / 2) log P(H₂)\n\nStep 2: Set E = 0:\n0 = −0.0591(4) − 0.02955 log P(H₂)\n\nStep 3: Solve for log P(H₂):\n0.02955 log P(H₂) = −0.2364\nlog P(H₂) = −0.2364 / 0.02955 = −8  =>  P(H₂) = 10⁻⁸ atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3753,
    similarQuestion: {
      question: "Galvanic cells that are specifically designed to convert the chemical energy from the combustion of fuels (such as H₂, CO, or CH₄) directly into electrical energy without an intermediate thermal cycle are called:",
      option_a: "Fuel cells",
      option_b: "Secondary storage batteries",
      option_c: "Concentration cells",
      option_d: "Photovoltaic cells",
      correct_option: "A",
      explanation: "Step 1: Fuel cells are galvanic cells in which the chemical energy of a continuously supplied fuel (such as hydrogen, methane, or methanol) is converted directly into electricity.\nStep 2: Unlike conventional power plants, they do not rely on thermal combustion or turbines, achieving thermodynamic efficiencies up to 70%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3754,
    similarQuestion: {
      question: "Which of the following pairs of aqueous solutions can coexist without undergoing an oxidation-reduction reaction?",
      option_a: "FeSO₄ and SnCl₂",
      option_b: "FeCl₃ and SnCl₂",
      option_c: "FeCl₃ and KI",
      option_d: "KMnO₄ and FeSO₄",
      correct_option: "A",
      explanation: "Step 1: Fe²⁺ and Sn²⁺ are both cations in lower oxidation states acting as reducing agents; neither can oxidise the other.\nStep 2: In contrast, FeCl₃ oxidises SnCl₂ (to Sn⁴⁺) and KI (to I₂), while KMnO₄ oxidises Fe²⁺ to Fe³⁺.\nStep 3: Therefore, FeSO₄ and SnCl₂ can stably coexist in aqueous solution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3755,
    similarQuestion: {
      question: "The standard Gibbs free energy change (ΔG°) for the dissolution process PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq) at 298 K is +27.2 kJ mol⁻¹. What is the solubility product (K_sp) of PbCl₂ at this temperature? (Take 2.303 RT = 5.706 kJ mol⁻¹)",
      option_a: "1.7 × 10⁻⁵",
      option_b: "3.4 × 10⁻⁴",
      option_c: "1.2 × 10⁻⁶",
      option_d: "8.5 × 10⁻³",
      correct_option: "A",
      explanation: "Step 1: Relate standard Gibbs free energy change to equilibrium constant K_sp:\nΔG° = −2.303 RT log K_sp\n\nStep 2: Substitute ΔG° = 27.2 kJ mol⁻¹ and 2.303 RT = 5.706 kJ mol⁻¹:\n27.2 = −5.706 log K_sp\n\nStep 3: Solve for log K_sp:\nlog K_sp = −27.2 / 5.706 ≈ −4.767\nK_sp = 10^(−4.767) ≈ 1.71 × 10⁻⁵ ≈ 1.7 × 10⁻⁵.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3756,
    similarQuestion: {
      question: "What quantity of electric charge in coulombs is required to completely oxidise 0.05 mole of Cr³⁺ to Cr₂O₇²⁻ in acidic solution? (1 F = 96,500 C)",
      option_a: "14,475 C",
      option_b: "28,950 C",
      option_c: "9,650 C",
      option_d: "48,250 C",
      correct_option: "A",
      explanation: "Step 1: Oxidation half-reaction:\n2Cr³⁺ + 7H₂O → Cr₂O₇²⁻ + 14H⁺ + 6e⁻\n2 moles of Cr³⁺ lose 6 moles of electrons, meaning 1 mole of Cr³⁺ loses 3 moles of electrons.\n\nStep 2: For 0.05 mole of Cr³⁺, electrons transferred = 0.05 × 3 = 0.15 mol of electrons (0.15 F).\n\nStep 3: Charge Q = 0.15 F × 96,500 C/F = 14,475 C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3757,
    similarQuestion: {
      question: "What mass of copper (atomic mass = 63.5 g mol⁻¹) will be deposited at the cathode by a quantity of electricity that liberates 2800 mL of O₂(g) at STP during electrolysis? (1 mole of gas at STP = 22.4 L)",
      option_a: "15.88 g",
      option_b: "31.75 g",
      option_c: "7.94 g",
      option_d: "63.50 g",
      correct_option: "A",
      explanation: "Step 1: Find moles of O₂ liberated at STP:\nMoles of O₂ = 2800 mL / 22,400 mL = 0.125 mol.\n\nStep 2: Liberation of 1 mole of O₂ requires 4 moles of electrons (4 F):\nTotal charge passed = 0.125 mol × 4 F/mol = 0.50 F.\n\nStep 3: Cathode deposition of copper:\nCu²⁺ + 2e⁻ → Cu\n2 Faradays deposit 1 mole (63.5 g) of Cu.\nMass of Cu = (0.50 F / 2) × 63.5 g = 0.25 × 63.5 g = 15.875 g ≈ 15.88 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3758,
    similarQuestion: {
      question: "At 298 K, the molar conductivity of a 0.02 M aqueous acetic acid solution is 10.4 S cm² mol⁻¹, while its limiting molar conductivity at infinite dilution is 390 S cm² mol⁻¹. The percentage degree of dissociation of acetic acid in this solution is approximately:",
      option_a: "2.67%",
      option_b: "4.12%",
      option_c: "1.33%",
      option_d: "5.34%",
      correct_option: "A",
      explanation: "Step 1: Degree of dissociation α for weak electrolyte:\nα = Λ_m / Λ°_m\n\nStep 2: Substitute Λ_m = 10.4 S cm² mol⁻¹ and Λ°_m = 390 S cm² mol⁻¹:\nα = 10.4 / 390 ≈ 0.02667.\n\nStep 3: Convert to percentage:\nPercentage dissociation = 0.02667 × 100% ≈ 2.67%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3759,
    similarQuestion: {
      question: "A hydrogen electrode is immersed in a solution of pH = 5 with H₂ gas bubbling at 1.0 atm pressure at 298 K. The oxidation potential of this electrode is: (Take 2.303 RT/F = 0.0591 V)",
      option_a: "+0.296 V",
      option_b: "−0.296 V",
      option_c: "+0.591 V",
      option_d: "−0.148 V",
      correct_option: "A",
      explanation: "Step 1: Reduction potential for the hydrogen electrode:\nE_red = −0.0591 × pH = −0.0591 × 5 = −0.2955 V.\n\nStep 2: Oxidation potential is the negative of the reduction potential:\nE_ox = −E_red = −(−0.2955 V) = +0.2955 V ≈ +0.296 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3760,
    similarQuestion: {
      question: "An electrochemical device designed to transform the chemical free energy released during a spontaneous redox reaction into electrical energy is termed a:",
      option_a: "Galvanic (or voltaic) cell",
      option_b: "Electrolytic cell",
      option_c: "Concentration cell without transference",
      option_d: "Resistance polarimeter",
      correct_option: "A",
      explanation: "Step 1: In a galvanic (or voltaic) cell, a spontaneous redox reaction (ΔG < 0) generates electric current through an external circuit.\nStep 2: In contrast, an electrolytic cell consumes electrical energy from an external power supply to drive a non-spontaneous chemical change (ΔG > 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3761,
    similarQuestion: {
      question: "In a standard Daniell cell operating under spontaneous discharge conditions:",
      option_a: "The Zn electrode serves as the anode (negative terminal) and the Cu electrode serves as the cathode (positive terminal)",
      option_b: "The Zn electrode serves as the cathode (positive terminal) and the Cu electrode serves as the anode (negative terminal)",
      option_c: "Both electrodes are positively charged",
      option_d: "Both electrodes are negatively charged",
      correct_option: "A",
      explanation: "Step 1: In a Daniell cell, zinc undergoes oxidation:\nZn(s) → Zn²⁺(aq) + 2e⁻ (at the anode, which acts as the source of electrons, hence negative).\n\nStep 2: Copper ions undergo reduction:\nCu²⁺(aq) + 2e⁻ → Cu(s) (at the cathode, where electrons are consumed, hence positive).\n\nStep 3: Electrons flow externally from the zinc anode to the copper cathode.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 67 Part 2.');

    for (let i = 0; i < questionsPart2.length; i++) {
      const q = questionsPart2[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart2.length} (ID: ${q.id})`);
    }
    console.log('Set 67 Part 2 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 67 Part 2:', err.message);
  }
}

run();
