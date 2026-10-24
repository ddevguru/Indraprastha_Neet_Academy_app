const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart4 = [
  {
    id: 3789,
    similarQuestion: {
      question: "The increase in the molar conductivity of a strong electrolyte upon dilution is predominantly attributed to:",
      option_a: "Weakening of interionic attractive forces, leading to higher ionic mobility",
      option_b: "Significant increase in the degree of ionization",
      option_c: "Dissociation of solvent water molecules",
      option_d: "Decrease in the kinetic energy of ions",
      correct_option: "A",
      explanation: "Step 1: Strong electrolytes are already completely dissociated into ions even at moderate concentrations.\nStep 2: Dilution increases the average distance separating ions, which significantly diminishes electrostatic interionic attractions (retardation effects).\nStep 3: This allows ions to migrate more rapidly in an electric field, increasing molar conductivity predominantly through enhanced ionic mobility.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3790,
    similarQuestion: {
      question: "Given the standard reduction potentials: E°(MnO₄⁻/Mn²⁺) = +1.51 V and E°(Cl₂/Cl⁻) = +1.36 V. Can permanganate ions (MnO₄⁻) spontaneously oxidise chloride ions (Cl⁻) to chlorine gas in acidic solution under standard conditions?",
      option_a: "Yes, because E°_cell = +0.15 V > 0",
      option_b: "No, because E°_cell = −0.15 V < 0",
      option_c: "No, because E°_cell = −2.87 V < 0",
      option_d: "Yes, because E°_cell = +2.87 V > 0",
      correct_option: "A",
      explanation: "Step 1: Write the half-reactions:\nCathode (reduction): MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O, E° = +1.51 V\nAnode (oxidation): 2Cl⁻ → Cl₂ + 2e⁻, E° = +1.36 V\n\nStep 2: Calculate standard cell potential:\nE°_cell = E°_cathode − E°_anode = +1.51 V − (+1.36 V) = +0.15 V.\n\nStep 3: Since E°_cell > 0, the reaction is thermodynamically spontaneous.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3791,
    similarQuestion: {
      question: "Will acidic dichromate (Cr₂O₇²⁻) spontaneously oxidise bromide ions (Br⁻) to liquid bromine (Br₂) at 298 K? (Given: E°(Cr₂O₇²⁻/Cr³⁺) = +1.33 V and E°(Br₂/Br⁻) = +1.09 V)",
      option_a: "Yes, because E°_cell = +0.24 V",
      option_b: "No, because E°_cell = −0.24 V",
      option_c: "No, because E°_cell = −2.42 V",
      option_d: "Yes, because E°_cell = +2.42 V",
      correct_option: "A",
      explanation: "Step 1: Identify cathode and anode half-reactions:\nCathode: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O, E° = +1.33 V\nAnode: 2Br⁻ → Br₂ + 2e⁻, E° = +1.09 V\n\nStep 2: Calculate standard EMF:\nE°_cell = E°(cathode) − E°(anode) = +1.33 V − (+1.09 V) = +0.24 V.\n\nStep 3: Because E°_cell is positive, the reaction proceeds spontaneously.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3792,
    similarQuestion: {
      question: "Given standard potentials in basic medium: ClO⁻ → Cl₂ (E° = +0.40 V) and ClO₂⁻ → ClO⁻ (E° = +0.68 V). For the disproportionation reaction 2ClO⁻ → ClO₂⁻ + Cl⁻, the reaction will be spontaneous if:",
      option_a: "E°(reduction) > E°(oxidation), giving E°_cell > 0",
      option_b: "E°(reduction) < E°(oxidation)",
      option_c: "ΔG° > 0",
      option_d: "The medium is acidic",
      correct_option: "A",
      explanation: "Step 1: Disproportionation involves simultaneous reduction and oxidation of the same oxidation state.\nStep 2: The cell potential is E°_cell = E°(reduction) − E°(oxidation).\nStep 3: Thermodynamic feasibility requires E°_cell > 0, which means the standard potential for reduction of the intermediate must exceed that for its oxidation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3793,
    similarQuestion: {
      question: "In a button cell, the half-cell reactions are:\nAnode: Zn(s) + 2OH⁻(aq) → ZnO(s) + H₂O(l) + 2e⁻, E°_ox = +1.25 V\nCathode: Ag₂O(s) + H₂O(l) + 2e⁻ → 2Ag(s) + 2OH⁻(aq), E°_red = +0.34 V\nWhat is the standard cell potential (E°_cell)?",
      option_a: "1.59 V",
      option_b: "0.91 V",
      option_c: "1.25 V",
      option_d: "0.34 V",
      correct_option: "A",
      explanation: "Step 1: Standard cell potential is the sum of standard oxidation potential of anode and standard reduction potential of cathode:\nE°_cell = E°_ox(anode) + E°_red(cathode)\n\nStep 2: Substitute the given values:\nE°_cell = +1.25 V + (+0.34 V) = 1.59 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3794,
    similarQuestion: {
      question: "At 298 K, standard reduction potentials are: E°(Al³⁺/Al) = −1.66 V, E°(Zn²⁺/Zn) = −0.76 V, E°(Fe²⁺/Fe) = −0.44 V, and E°(Cu²⁺/Cu) = +0.34 V. Which of the following displacement reactions CANNOT take place spontaneously?",
      option_a: "FeSO₄(aq) + Cu(s) → CuSO₄(aq) + Fe(s)",
      option_b: "FeSO₄(aq) + Zn(s) → ZnSO₄(aq) + Fe(s)",
      option_c: "CuSO₄(aq) + Fe(s) → FeSO₄(aq) + Cu(s)",
      option_d: "3ZnSO₄(aq) + 2Al(s) → Al₂(SO₄)₃(aq) + 3Zn(s)",
      correct_option: "A",
      explanation: "Step 1: A metal can displace another metal from its salt solution only if it has a more negative standard reduction potential.\nStep 2: E°(Cu²⁺/Cu) = +0.34 V is more positive than E°(Fe²⁺/Fe) = −0.44 V.\nStep 3: For Fe²⁺ + Cu → Fe + Cu²⁺, E°_cell = −0.44 − (+0.34) = −0.78 V < 0.\nStep 4: Because E°_cell is negative, copper cannot reduce Fe²⁺ spontaneously.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3795,
    similarQuestion: {
      question: "For the galvanic cell reaction Cd(s) + 2Ag⁺(0.002 M) → Cd²⁺(0.02 M) + 2Ag(s) with E°_cell = 1.200 V at 298 K, what is the EMF (E_cell) of the cell? (Take 2.303 RT/F = 0.0591 V)",
      option_a: "1.091 V",
      option_b: "1.200 V",
      option_c: "1.309 V",
      option_d: "1.141 V",
      correct_option: "A",
      explanation: "Step 1: In the cell reaction, n = 2 electrons are transferred.\nStep 2: Calculate the reaction quotient Q:\nQ = [Cd²⁺] / [Ag⁺]² = (0.02) / (0.002)² = 0.02 / (4 × 10⁻⁶) = 5000.\nlog(5000) = log(5 × 10³) = 0.699 + 3 = 3.699.\n\nStep 3: Apply the Nernst equation:\nE_cell = E°_cell − (0.0591 / 2) log Q\nE_cell = 1.200 − (0.02955 × 3.699) = 1.200 − 0.1093 ≈ 1.091 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3796,
    similarQuestion: {
      question: "Among the following half-reactions, which one has the most positive standard reduction potential (top position in the reduction potential series) at 298 K?",
      option_a: "Co³⁺(aq) + e⁻ → Co²⁺(aq) (E° = +1.81 V)",
      option_b: "Ag⁺(aq) + e⁻ → Ag(s) (E° = +0.80 V)",
      option_c: "Cu²⁺(aq) + 2e⁻ → Cu(s) (E° = +0.34 V)",
      option_d: "Ni²⁺(aq) + 2e⁻ → Ni(s) (E° = −0.25 V)",
      correct_option: "A",
      explanation: "Step 1: The standard reduction potentials are:\n- Co³⁺/Co²⁺: +1.81 V\n- Ag⁺/Ag: +0.80 V\n- Cu²⁺/Cu: +0.34 V\n- Ni²⁺/Ni: −0.25 V\nStep 2: Co³⁺/Co²⁺ has the most positive reduction potential, making Co³⁺ an exceptionally powerful oxidising agent occupying the highest position among the choices.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3797,
    similarQuestion: {
      question: "For a single-electron transfer cell reaction (n = 1) at 298 K, the standard cell potential is E°_cell = 0.4728 V. What is the equilibrium constant (K_c) of the reaction? (Take 2.303 RT/F = 0.0591 V)",
      option_a: "1.0 × 10⁸",
      option_b: "1.0 × 10⁴",
      option_c: "1.0 × 10¹⁶",
      option_d: "1.0 × 10²",
      correct_option: "A",
      explanation: "Step 1: Relate E°_cell and equilibrium constant K_c:\nE°_cell = (0.0591 / n) log K_c\n\nStep 2: Substitute n = 1 and E°_cell = 0.4728 V:\n0.4728 = 0.0591 log K_c\n\nStep 3: Solve for log K_c:\nlog K_c = 0.4728 / 0.0591 = 8  =>  K_c = 10⁸ = 1.0 × 10⁸.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3798,
    similarQuestion: {
      question: "For the cell reaction Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g), the standard cell potential is E°_cell = +0.763 V at 298 K. The standard Gibbs free energy change (ΔG°) for this reaction is: (F = 96,500 C mol⁻¹)",
      option_a: "−147.26 kJ mol⁻¹",
      option_b: "−73.63 kJ mol⁻¹",
      option_c: "+147.26 kJ mol⁻¹",
      option_d: "−294.52 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Determine the number of transferred electrons (n):\nZn → Zn²⁺ + 2e⁻, so n = 2.\n\nStep 2: Apply the formula ΔG° = −nFE°_cell:\nΔG° = −2 × (96,500 C mol⁻¹) × (0.763 V)\n\nStep 3: Calculate numerical value:\nΔG° = −147,259 J mol⁻¹ ≈ −147.26 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3799,
    similarQuestion: {
      question: "If a redox reaction has a positive standard cell potential (E°_cell > 0), what are the corresponding thermodynamic values for ΔG° and the equilibrium constant K_eq at 298 K?",
      option_a: "ΔG° < 0 and K_eq > 1",
      option_b: "ΔG° > 0 and K_eq < 1",
      option_c: "ΔG° < 0 and K_eq < 1",
      option_d: "ΔG° = 0 and K_eq = 1",
      correct_option: "A",
      explanation: "Step 1: By ΔG° = −nFE°_cell, whenever E°_cell is positive, ΔG° must be negative (spontaneous forward reaction).\nStep 2: By ΔG° = −RT ln K_eq, a negative ΔG° requires ln K_eq > 0, which means K_eq > 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3800,
    similarQuestion: {
      question: "At what partial pressure of H₂(g) will the reduction potential of a hydrogen electrode be equal to zero in a neutral aqueous solution at 298 K (pH = 7.0)?",
      option_a: "1.0 × 10⁻¹⁴ atm",
      option_b: "1.0 × 10⁻⁷ atm",
      option_c: "1.0 × 10⁻⁴ atm",
      option_d: "1.0 atm",
      correct_option: "A",
      explanation: "Step 1: The reduction potential of hydrogen electrode is given by:\nE = −0.0591 × pH − (0.0591 / 2) log P(H₂)\n\nStep 2: Set E = 0 at pH = 7.0:\n0 = −0.0591(7) − 0.02955 log P(H₂)\n\nStep 3: Solve for log P(H₂):\n0.02955 log P(H₂) = −0.4137\nlog P(H₂) = −14  =>  P(H₂) = 10⁻¹⁴ atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3801,
    similarQuestion: {
      question: "Which of the following pairs of chemical reagents can remain in mixed solution without participating in a spontaneous redox reaction?",
      option_a: "FeSO₄ and SnSO₄",
      option_b: "KMnO₄ and FeSO₄",
      option_c: "FeCl₃ and KI",
      option_d: "Cu and AgNO₃",
      correct_option: "A",
      explanation: "Step 1: Fe²⁺ and Sn²⁺ are both reducing species in lower oxidation states; neither can oxidise the other.\nStep 2: KMnO₄ strongly oxidises Fe²⁺ to Fe³⁺, FeCl₃ oxidises I⁻ to I₂, and metallic Cu spontaneously displaces Ag⁺ to metallic silver.\nStep 3: Therefore, FeSO₄ and SnSO₄ can coexist stably in aqueous solution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3802,
    similarQuestion: {
      question: "A platinum hydrogen electrode is immersed in an alkaline solution of pH = 12 with H₂ gas bubbling at 1.0 atm and 298 K. The oxidation potential of this electrode is approximately: (Take 2.303 RT/F = 0.0591 V)",
      option_a: "+0.709 V",
      option_b: "−0.709 V",
      option_c: "+0.355 V",
      option_d: "−0.355 V",
      correct_option: "A",
      explanation: "Step 1: The reduction potential of the hydrogen electrode is:\nE_red = −0.0591 × pH = −0.0591 × 12 = −0.7092 V.\n\nStep 2: Oxidation potential is the negative of the reduction potential:\nE_ox = −E_red = −(−0.7092 V) ≈ +0.709 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3803,
    similarQuestion: {
      question: "The limiting molar conductivities of Ba(OH)₂, BaCl₂, and NH₄Cl at 298 K are 523.28, 280.0, and 149.74 S cm² mol⁻¹, respectively. According to Kohlrausch's law, the limiting molar conductivity of NH₄OH is:",
      option_a: "271.38 S cm² mol⁻¹",
      option_b: "542.76 S cm² mol⁻¹",
      option_c: "196.51 S cm² mol⁻¹",
      option_d: "393.02 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Apply Kohlrausch's law:\nΛ°(NH₄OH) = λ°(NH₄⁺) + λ°(OH⁻)\n\nStep 2: Express using strong electrolytes:\nΛ°(NH₄OH) = Λ°(NH₄Cl) + (1/2) Λ°(Ba(OH)₂) − (1/2) Λ°(BaCl₂)\n\nStep 3: Substitute the numerical values:\nΛ°(NH₄OH) = 149.74 + (1/2)(523.28 − 280.0) = 149.74 + (1/2)(243.28) = 149.74 + 121.64 = 271.38 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3804,
    similarQuestion: {
      question: "The molar conductivity of a 0.0050 M aqueous solution of a weak acid HX is 25 S cm² mol⁻¹, and its limiting molar conductivity at infinite dilution is 500 S cm² mol⁻¹. What is the acid dissociation constant (K_a) of HX?",
      option_a: "1.32 × 10⁻⁵ mol L⁻¹",
      option_b: "2.63 × 10⁻⁵ mol L⁻¹",
      option_c: "5.00 × 10⁻⁴ mol L⁻¹",
      option_d: "6.25 × 10⁻⁶ mol L⁻¹",
      correct_option: "A",
      explanation: "Step 1: Calculate degree of dissociation (α):\nα = Λ_m / Λ°_m = 25 / 500 = 0.05.\n\nStep 2: Calculate dissociation constant K_a:\nK_a = (C × α²) / (1 − α) = [0.0050 × (0.05)²] / (1 − 0.05) = (0.0050 × 0.0025) / 0.95 = 1.25 × 10⁻⁵ / 0.95 ≈ 1.316 × 10⁻⁵ mol L⁻¹ ≈ 1.32 × 10⁻⁵ mol L⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3805,
    similarQuestion: {
      question: "The conductivity of a 0.040 M copper sulphate (CuSO₄) solution at 298 K is 4.40 × 10⁻³ S cm⁻¹. What is the molar conductivity (Λ_m) of this solution?",
      option_a: "110 S cm² mol⁻¹",
      option_b: "55 S cm² mol⁻¹",
      option_c: "176 S cm² mol⁻¹",
      option_d: "88 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Formula for molar conductivity:\nΛ_m = (κ × 1000) / C\n\nStep 2: Substitute κ = 4.40 × 10⁻³ S cm⁻¹ and C = 0.040 mol L⁻¹:\nΛ_m = (4.40 × 10⁻³ × 1000) / 0.040 = 4.40 / 0.040 = 110 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3806,
    similarQuestion: {
      question: "At 298 K, the molar conductivity of a 0.05 M solution of weak base BOH is 8.0 S cm² mol⁻¹, and its limiting molar conductivity at infinite dilution is 250 S cm² mol⁻¹. The percentage degree of ionization of the base is:",
      option_a: "3.20%",
      option_b: "1.60%",
      option_c: "6.40%",
      option_d: "0.80%",
      correct_option: "A",
      explanation: "Step 1: Calculate the degree of ionization α:\nα = Λ_m / Λ°_m = 8.0 / 250 = 0.032.\n\nStep 2: Express as percentage:\nPercentage degree of ionization = 0.032 × 100% = 3.20%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3807,
    similarQuestion: {
      question: "During the electrolytic decomposition of an aqueous solution of sodium hydroxide using platinum electrodes, which gas is evolved at the anode?",
      option_a: "Oxygen gas (O₂)",
      option_b: "Hydrogen gas (H₂)",
      option_c: "Ozone gas (O₃)",
      option_d: "Steam only",
      correct_option: "A",
      explanation: "Step 1: In aqueous NaOH, the anode reaction is the oxidation of hydroxide ions:\n4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e⁻\nStep 2: Hence, oxygen gas is discharged at the anode (while hydrogen gas is evolved at the cathode).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3808,
    similarQuestion: {
      question: "How many Faradays of electricity are required to produce 13.5 g of aluminum metal from molten Al₂O₃? (Atomic mass of Al = 27 g mol⁻¹)",
      option_a: "1.5 F",
      option_b: "3.0 F",
      option_c: "0.5 F",
      option_d: "2.0 F",
      correct_option: "A",
      explanation: "Step 1: Calculate moles of aluminum:\nMoles of Al = mass / atomic mass = 13.5 g / 27 g mol⁻¹ = 0.50 mol.\n\nStep 2: Cathode reduction reaction:\nAl³⁺ + 3e⁻ → Al\n1 mole of Al requires 3 Faradays of charge.\n\nStep 3: Total Faradays required = 0.50 mol × 3 F/mol = 1.5 F.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3809,
    similarQuestion: {
      question: "How much time is required to produce 0.20 mole of H₂(g) at the cathode during electrolysis of water using a steady electric current of 5.0 amperes? (1 F = 96,500 C)",
      option_a: "128.7 minutes",
      option_b: "64.3 minutes",
      option_c: "257.3 minutes",
      option_d: "32.2 minutes",
      correct_option: "A",
      explanation: "Step 1: Cathode reduction of water:\n2H⁺ + 2e⁻ → H₂(g)\n1 mole of H₂ requires 2 Faradays of electricity.\n\nStep 2: Calculate total charge Q:\nQ = 0.20 mol × 2 F/mol × 96,500 C/F = 38,600 C.\n\nStep 3: Calculate time in seconds:\nt = Q / I = 38,600 C / 5.0 A = 7720 seconds.\n\nStep 4: Convert to minutes:\nt = 7720 / 60 ≈ 128.7 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3810,
    similarQuestion: {
      question: "What is the total number of electrons delivered at the cathode when a constant current of 0.80 A is passed through an electrolytic cell for 100 seconds? (e = 1.6 × 10⁻¹⁹ C)",
      option_a: "5.0 × 10²⁰",
      option_b: "2.5 × 10²⁰",
      option_c: "8.0 × 10²¹",
      option_d: "1.0 × 10²¹",
      correct_option: "A",
      explanation: "Step 1: Calculate total charge Q passed:\nQ = I × t = 0.80 A × 100 s = 80 C.\n\nStep 2: Calculate number of electrons n:\nn = Q / e = 80 C / (1.6 × 10⁻¹⁹ C) = 5.0 × 10²⁰ electrons.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3811,
    similarQuestion: {
      question: "What electrical charge in coulombs is consumed in completely oxidising 0.040 mole of Fe²⁺ to Fe³⁺ during electrolysis? (1 F = 96,500 C)",
      option_a: "3860 C",
      option_b: "7720 C",
      option_c: "1930 C",
      option_d: "9650 C",
      correct_option: "A",
      explanation: "Step 1: Oxidation reaction:\nFe²⁺ → Fe³⁺ + e⁻\n1 mole of Fe²⁺ requires 1 mole of electrons (1 F).\n\nStep 2: Charge required for 0.040 mole:\nQ = 0.040 mol × 96,500 C/mol = 3860 C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3812,
    similarQuestion: {
      question: "What mass of silver (atomic mass = 108 g mol⁻¹) is deposited at the cathode by a quantity of electricity that produces 1120 mL of hydrogen gas (H₂) at STP during water electrolysis? (1 mole of gas at STP = 22,400 mL)",
      option_a: "10.8 g",
      option_b: "5.4 g",
      option_c: "21.6 g",
      option_d: "1.08 g",
      correct_option: "A",
      explanation: "Step 1: Moles of H₂ produced at STP:\nMoles of H₂ = 1120 mL / 22,400 mL = 0.050 mol.\n\nStep 2: Electric charge required for H₂:\n2H⁺ + 2e⁻ → H₂ => 2 Faradays per mole of H₂.\nCharge = 0.050 mol × 2 F/mol = 0.10 F.\n\nStep 3: Deposition of silver:\nAg⁺ + e⁻ → Ag\n1 Faraday deposits 1 mole (108 g) of Ag.\nMass of Ag = 0.10 F × 108 g/F = 10.8 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3813,
    similarQuestion: {
      question: "In a methane-oxygen fuel cell, what are the primary reactants supplied and the chemical products generated?",
      option_a: "Reactants: CH₄(g) and O₂(g); Products: CO₂(g) and H₂O(l)",
      option_b: "Reactants: CH₄(g) and H₂(g); Products: C(s) and H₂O(l)",
      option_c: "Reactants: CO(g) and H₂(g); Products: CH₃OH(l)",
      option_d: "Reactants: CH₄(g) and N₂(g); Products: HCN(g)",
      correct_option: "A",
      explanation: "Step 1: In a hydrocarbon fuel cell, methane is fed to the anode and oxygen to the cathode.\nStep 2: The overall cell reaction is the electrochemical combustion of methane:\nCH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)\nStep 3: Electrical energy is produced directly without thermal combustion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3814,
    similarQuestion: {
      question: "Zinc is preferred over tin for coating iron food containers exposed to weathering because:",
      option_a: "Zinc has a more negative reduction potential than iron, continuing to provide cathodic sacrificial protection even if scratched",
      option_b: "Tin is toxic to human tissue",
      option_c: "Zinc is noble compared to iron",
      option_d: "Tin oxidises much faster than zinc",
      correct_option: "A",
      explanation: "Step 1: Zinc has E°(Zn²⁺/Zn) = −0.76 V, more negative than iron (E° = −0.44 V). Even when the coating is broken, zinc corrodes preferentially, sacrificing itself to protect iron.\nStep 2: Tin has E°(Sn²⁺/Sn) = −0.14 V, less negative than iron. Once a tin coating is breached, iron has lower reduction potential and rusts even faster.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3815,
    similarQuestion: {
      question: "Which electrochemical power source continuously converts the chemical energy derived from the combustion of a fuel directly into electricity without burning the fuel in a heat engine?",
      option_a: "Fuel cell",
      option_b: "Dry battery",
      option_c: "Thermal generator",
      option_d: "Lead-acid accumulator",
      correct_option: "A",
      explanation: "Step 1: A fuel cell is an electrochemical device where reactants are continuously supplied to electrodes from external tanks.\nStep 2: The chemical energy of fuel oxidation (e.g., H₂ or CH₄) is converted directly into electricity with zero Carnot cycle thermal limitations.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 67 Part 4.');

    for (let i = 0; i < questionsPart4.length; i++) {
      const q = questionsPart4[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart4.length} (ID: ${q.id})`);
    }
    console.log('Set 67 Part 4 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 67 Part 4:', err.message);
  }
}

run();
