const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart3 = [
  {
    id: 3762,
    similarQuestion: {
      question: "The difference between the electrode potentials of the cathode and anode under open-circuit conditions (when no electric current is drawn from the cell) is referred to as:",
      option_a: "Electromotive force (EMF) of the cell",
      option_b: "Overvoltage",
      option_c: "Diffusion junction potential",
      option_d: "Polarisation voltage",
      correct_option: "A",
      explanation: "Step 1: Cell potential is the difference between the reduction potentials of the cathode and anode: E_cell = E_cathode − E_anode.\nStep 2: When no electric current is flowing through the external circuit, this maximum potential difference is termed the electromotive force (EMF) of the cell.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3763,
    similarQuestion: {
      question: "Consider two standard half-cells with reduction potentials E°(X²⁺/X) = −0.44 V and E°(Y²⁺/Y) = +0.34 V. To construct a spontaneous galvanic cell under standard conditions:",
      option_a: "Electrode X acts as the anode and electrode Y acts as the cathode",
      option_b: "Electrode Y acts as the anode and electrode X acts as the cathode",
      option_c: "Both electrodes function as cathodes",
      option_d: "Neither electrode can undergo redox",
      correct_option: "A",
      explanation: "Step 1: A spontaneous cell requires E°_cell = E°_cathode − E°_anode > 0.\nStep 2: The electrode with the higher (more positive) reduction potential serves as the cathode (+0.34 V for Y²⁺/Y).\nStep 3: The electrode with the lower (more negative) reduction potential undergoes oxidation and serves as the anode (−0.44 V for X²⁺/X).\nStep 4: This yields E°_cell = +0.34 − (−0.44) = +0.78 V > 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3764,
    similarQuestion: {
      question: "For an electrochemical cell represented as M(s) | M²⁺(aq) || N³⁺(aq) | N(s), what is the overall balanced spontaneous cell reaction?",
      option_a: "3M(s) + 2N³⁺(aq) → 3M²⁺(aq) + 2N(s)",
      option_b: "2M(s) + 3N³⁺(aq) → 2M²⁺(aq) + 3N(s)",
      option_c: "M(s) + N³⁺(aq) → M²⁺(aq) + N(s)",
      option_d: "3M²⁺(aq) + 2N(s) → 3M(s) + 2N³⁺(aq)",
      correct_option: "A",
      explanation: "Step 1: In cell shorthand notation, the left side represents the anode (oxidation):\nM(s) → M²⁺(aq) + 2e⁻  (multiply by 3)\n3M(s) → 3M²⁺(aq) + 6e⁻\n\nStep 2: The right side represents the cathode (reduction):\nN³⁺(aq) + 3e⁻ → N(s)  (multiply by 2)\n2N³⁺(aq) + 6e⁻ → 2N(s)\n\nStep 3: Sum the balanced half-reactions:\n3M(s) + 2N³⁺(aq) → 3M²⁺(aq) + 2N(s).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3765,
    similarQuestion: {
      question: "For the galvanic cell Ni(s) | Ni²⁺(aq) || Sn²⁺(aq) | Sn(s), how is the cell potential (E_cell) affected if the concentrations of both Ni²⁺ and Sn²⁺ are simultaneously increased tenfold at constant temperature?",
      option_a: "E_cell remains unchanged",
      option_b: "E_cell increases by 0.0591 V",
      option_c: "E_cell decreases by 0.0591 V",
      option_d: "E_cell becomes zero",
      correct_option: "A",
      explanation: "Step 1: Write the overall cell reaction:\nNi(s) + Sn²⁺(aq) → Ni²⁺(aq) + Sn(s) with n = 2.\n\nStep 2: The reaction quotient is Q = [Ni²⁺] / [Sn²⁺].\nStep 3: If both [Ni²⁺] and [Sn²⁺] increase by a factor of 10, the ratio Q = (10 [Ni²⁺]) / (10 [Sn²⁺]) = [Ni²⁺] / [Sn²⁺] remains identical.\nStep 4: According to the Nernst equation, since Q does not change, E_cell remains completely unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3766,
    similarQuestion: {
      question: "Four silver electrodes Ag⁺ | Ag(s) have silver ion concentrations: W = 0.001 M, X = 0.01 M, Y = 0.1 M, and Z = 1.0 M at 298 K. The correct order of their reduction potentials is:",
      option_a: "Z > Y > X > W",
      option_b: "W > X > Y > Z",
      option_c: "Y > Z > X > W",
      option_d: "Z > W > X > Y",
      correct_option: "A",
      explanation: "Step 1: The reduction half-reaction is Ag⁺ + e⁻ → Ag(s).\nStep 2: According to the Nernst equation:\nE(Ag⁺/Ag) = E°(Ag⁺/Ag) + 0.0591 log [Ag⁺]\nStep 3: The reduction potential increases logarithmically with increasing [Ag⁺].\nStep 4: Since [Ag⁺] order is Z (1.0 M) > Y (0.1 M) > X (0.01 M) > W (0.001 M), the reduction potentials follow the order Z > Y > X > W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3767,
    similarQuestion: {
      question: "Which of the following statements regarding the electrochemical series is INCORRECT?",
      option_a: "Metals with highly positive standard reduction potentials readily displace hydrogen from dilute mineral acids",
      option_b: "Metals with negative reduction potentials are more electropositive than hydrogen",
      option_c: "Fluorine has the highest reduction potential and is the strongest oxidising agent",
      option_d: "Standard reduction potential of the standard hydrogen electrode (SHE) is arbitrarily taken as 0.00 V",
      correct_option: "A",
      explanation: "Step 1: Only metals with negative standard reduction potentials (situated above hydrogen in the series, e.g., Zn, Fe, Mg) can reduce H⁺ to H₂ and displace hydrogen from dilute acids.\nStep 2: Metals with positive standard reduction potentials (such as Cu, Ag, Au) cannot displace hydrogen gas from non-oxidising dilute acids.\nStep 3: Hence, statement A is false.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3768,
    similarQuestion: {
      question: "Given: Fe³⁺(aq) + 3e⁻ → Fe(s), E° = −0.036 V and Fe²⁺(aq) + 2e⁻ → Fe(s), E° = −0.440 V. What is the standard electrode potential for Fe³⁺(aq) + e⁻ → Fe²⁺(aq)?",
      option_a: "+0.772 V",
      option_b: "−0.476 V",
      option_c: "+0.404 V",
      option_d: "−0.772 V",
      correct_option: "A",
      explanation: "Step 1: Use standard free energy changes (ΔG° = −nFE°):\nReaction 1: Fe³⁺ + 3e⁻ → Fe, ΔG°₁ = −3 F (−0.036) = +0.108 F\nReaction 2: Fe²⁺ + 2e⁻ → Fe, ΔG°₂ = −2 F (−0.440) = +0.880 F\n\nStep 2: Target reaction: Fe³⁺ + e⁻ → Fe²⁺ is obtained by (Reaction 1) − (Reaction 2):\nΔG°₃ = ΔG°₁ − ΔG°₂ = +0.108 F − (+0.880 F) = −0.772 F\n\nStep 3: Relate ΔG°₃ to E°₃ (with n = 1):\n−1 F E°₃ = −0.772 F  =>  E°₃ = +0.772 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3769,
    similarQuestion: {
      question: "A solid crystal of potassium chloride (KCl) does not conduct electricity, but it becomes an excellent electrical conductor upon melting. This conductivity is attributed to the presence of:",
      option_a: "Mobile K⁺ and Cl⁻ ions",
      option_b: "Free delocalized electrons",
      option_c: "Neutral KCl molecules",
      option_d: "Dissolved water dipoles",
      correct_option: "A",
      explanation: "Step 1: In the solid state, K⁺ and Cl⁻ ions are held firmly in fixed lattice sites by strong electrostatic forces and cannot move, making solid KCl an insulator.\nStep 2: In the molten state, the crystal lattice breaks down, freeing K⁺ and Cl⁻ ions to migrate toward oppositely charged electrodes when an electric potential is applied.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3770,
    similarQuestion: {
      question: "Pure deionized water exhibits very low electrical conductivity at room temperature because:",
      option_a: "It has an extremely low degree of self-ionization yielding very few ions",
      option_b: "It contains non-polar covalent bonds that repel current",
      option_c: "The ionic mobilities of H⁺ and OH⁻ are zero",
      option_d: "It is an acidic substance",
      correct_option: "A",
      explanation: "Step 1: Pure water undergoes autoionization: 2H₂O ⇌ H₃O⁺ + OH⁻ with Kw = 1.0 × 10⁻¹⁴ at 298 K.\nStep 2: The equilibrium concentrations of H⁺ and OH⁻ ions are merely 10⁻⁷ mol L⁻¹ each.\nStep 3: Because water is almost entirely non-ionized, the number of charge carriers per unit volume is negligible, resulting in extremely poor electrical conductivity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3771,
    similarQuestion: {
      question: "Which statement best defines a strong electrolyte in aqueous solution?",
      option_a: "A substance that dissociates almost completely into ions at all moderate concentrations",
      option_b: "A substance that ionizes only at infinite dilution",
      option_c: "A substance that has very high molar mass",
      option_d: "A substance that produces only hydroxide ions",
      correct_option: "A",
      explanation: "Step 1: Strong electrolytes (e.g., strong acids like HCl, strong bases like NaOH, and soluble salts like NaCl) undergo practically 100% dissociation into free ions in aqueous solution.\nStep 2: Unlike weak electrolytes, their degree of dissociation (α) is close to 1 regardless of moderate dilution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3772,
    similarQuestion: {
      question: "In both galvanic and electrolytic cells, oxidation and reduction half-reactions invariably take place at which electrodes, respectively?",
      option_a: "Oxidation at anode; reduction at cathode",
      option_b: "Oxidation at cathode; reduction at anode",
      option_c: "Oxidation at both electrodes",
      option_d: "Reduction at both electrodes",
      correct_option: "A",
      explanation: "Step 1: By international convention, the anode is defined as the electrode where oxidation (loss of electrons) occurs.\nStep 2: The cathode is defined as the electrode where reduction (gain of electrons) occurs.\nStep 3: This fundamental definition holds true across all electrochemical cells (both galvanic and electrolytic).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3773,
    similarQuestion: {
      question: "What is the SI unit of electrolytic conductivity (specific conductance, κ)?",
      option_a: "S m⁻¹ (or Ω⁻¹ m⁻¹)",
      option_b: "S m² mol⁻¹",
      option_c: "S cm² eq⁻¹",
      option_d: "Ω m",
      correct_option: "A",
      explanation: "Step 1: Conductivity κ is the reciprocal of resistivity ρ:\nκ = 1 / ρ = l / (R × A)\nStep 2: In SI units, length is measured in meters (m), area in square meters (m²), and resistance in ohms (Ω).\nStep 3: Thus, the unit of κ is Ω⁻¹ m⁻¹ or Siemens per meter (S m⁻¹).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3774,
    similarQuestion: {
      question: "Identify the correct statement regarding electrical conductance and conductivity of electrolytic solutions:",
      option_a: "Specific conductivity decreases on dilution because the number of current-carrying ions per unit volume decreases",
      option_b: "Specific conductivity increases on dilution due to increased volume",
      option_c: "Molar conductivity decreases on dilution for strong electrolytes",
      option_d: "Electrochemical equivalent of a metal is measured in coulombs",
      correct_option: "A",
      explanation: "Step 1: Specific conductivity (κ) is the conductance of 1 cm³ (unit volume) of electrolytic solution.\nStep 2: When a solution is diluted, the total number of ions increases marginally or stays constant while the volume increases, meaning the number of ions per unit volume decreases.\nStep 3: Hence, specific conductivity (κ) always decreases with dilution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3775,
    similarQuestion: {
      question: "A 0.05 M solution of a strong monobasic acid has a conductivity of 0.021 S cm⁻¹ at 298 K. What is its molar conductivity?",
      option_a: "420 S cm² mol⁻¹",
      option_b: "210 S cm² mol⁻¹",
      option_c: "105 S cm² mol⁻¹",
      option_d: "840 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Use the formula for molar conductivity:\nΛ_m = (κ × 1000) / C\n\nStep 2: Substitute κ = 0.021 S cm⁻¹ and C = 0.05 mol L⁻¹:\nΛ_m = (0.021 × 1000) / 0.05 = 21 / 0.05 = 420 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3776,
    similarQuestion: {
      question: "Which mathematical formula correctly relates specific conductivity (κ), electrical conductance (G), and cell constant (G* = l/A)?",
      option_a: "κ = G × G*",
      option_b: "κ = G / G*",
      option_c: "κ = G* / G",
      option_d: "κ = G + G*",
      correct_option: "A",
      explanation: "Step 1: Resistance is given by R = ρ × (l / A).\nStep 2: Specific conductivity κ = 1 / ρ and conductance G = 1 / R.\nStep 3: Rearranging gives:\nκ = (1 / R) × (l / A) = G × G* where G* = l / A is the cell constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3777,
    similarQuestion: {
      question: "If the measured electrolytic conductance (G) of a salt solution is numerically equal to its specific conductivity (κ), what is the value of the cell constant (l/A) of the conductivity cell?",
      option_a: "1.0 cm⁻¹",
      option_b: "0.0 cm⁻¹",
      option_c: "0.5 cm⁻¹",
      option_d: "2.0 cm⁻¹",
      correct_option: "A",
      explanation: "Step 1: The relationship between conductivity and conductance is:\nκ = G × (l / A)\n\nStep 2: Given that κ = G:\n(l / A) = κ / G = 1.0 cm⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3778,
    similarQuestion: {
      question: "Why does the molar conductivity of a strong electrolyte like KCl increase upon dilution?",
      option_a: "Interionic attractive forces decrease, enabling greater ionic mobility",
      option_b: "The number of ions increases dramatically through additional ionization",
      option_c: "The solvent molecules dissociate into ions",
      option_d: "The temperature of the solution increases",
      correct_option: "A",
      explanation: "Step 1: Strong electrolytes are already completely ionized even in concentrated solutions.\nStep 2: In concentrated solutions, oppositely charged ions exert significant interionic attractions, retarding each other's movement.\nStep 3: Dilution increases the average distance between ions, decreasing interionic drag and increasing ionic speed (mobility), which increases molar conductivity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3779,
    similarQuestion: {
      question: "According to Kohlrausch's law of independent migration of ions, what is the limiting molar conductivity (Λ°_m) of aluminum sulphate, Al₂(SO₄)₃?",
      option_a: "2 λ°(Al³⁺) + 3 λ°(SO₄²⁻)",
      option_b: "3 λ°(Al³⁺) + 2 λ°(SO₄²⁻)",
      option_c: "λ°(Al³⁺) + λ°(SO₄²⁻)",
      option_d: "[2 λ°(Al³⁺) + 3 λ°(SO₄²⁻)] / 6",
      correct_option: "A",
      explanation: "Step 1: Dissociation of aluminum sulphate is:\nAl₂(SO₄)₃(aq) → 2Al³⁺(aq) + 3SO₄²⁻(aq)\n\nStep 2: According to Kohlrausch's law, each ion makes a definite individual contribution to the total limiting molar conductivity:\nΛ°_m[Al₂(SO₄)₃] = 2 λ°(Al³⁺) + 3 λ°(SO₄²⁻).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3780,
    similarQuestion: {
      question: "At 298 K, the limiting molar conductivity of aqueous HCl (426 S cm² mol⁻¹) is substantially higher than that of NaCl (126 S cm² mol⁻¹). This dramatic difference is primarily because:",
      option_a: "H⁺ ions possess exceptionally high mobility in water via the Grotthuss proton-jumping mechanism",
      option_b: "HCl has a much lower molecular weight than NaCl",
      option_c: "NaCl is incompletely ionized compared to HCl",
      option_d: "Chloride ions move faster in acid solutions",
      correct_option: "A",
      explanation: "Step 1: In both solutions, the anion is Cl⁻, so the difference arises solely between H⁺ and Na⁺.\nStep 2: H⁺ ions (hydronium H₃O⁺) transfer rapidly through hydrogen-bonded water networks via the Grotthuss proton-hopping mechanism rather than physical hydrodynamic migration.\nStep 3: This gives H⁺ an extraordinarily high ionic mobility compared to simple metal cations like Na⁺.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3781,
    similarQuestion: {
      question: "Given the limiting molar conductivities at 298 K: Λ°(NH₄Cl) = 149.7 S cm² mol⁻¹, Λ°(NaOH) = 248.1 S cm² mol⁻¹, and Λ°(NaCl) = 126.5 S cm² mol⁻¹. The limiting molar conductivity of ammonium hydroxide (NH₄OH) is:",
      option_a: "271.3 S cm² mol⁻¹",
      option_b: "524.3 S cm² mol⁻¹",
      option_c: "224.9 S cm² mol⁻¹",
      option_d: "374.6 S cm² mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Apply Kohlrausch's law:\nΛ°(NH₄OH) = λ°(NH₄⁺) + λ°(OH⁻)\n\nStep 2: Express in terms of known strong electrolytes:\nΛ°(NH₄OH) = Λ°(NH₄Cl) + Λ°(NaOH) − Λ°(NaCl)\n\nStep 3: Substitute the numerical values:\nΛ°(NH₄OH) = 149.7 + 248.1 − 126.5 = 397.8 − 126.5 = 271.3 S cm² mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3782,
    similarQuestion: {
      question: "In a plot of molar conductivity (Λ_m) versus the square root of concentration (√C), what distinguishes a strong electrolyte (such as KCl) from a weak electrolyte (such as CH₃COOH)?",
      option_a: "KCl yields a linear plot that can be extrapolated to zero concentration, whereas CH₃COOH curves steeply upward at high dilution",
      option_b: "Both yield identical linear slopes",
      option_c: "CH₃COOH yields a straight horizontal line",
      option_d: "KCl cannot be extrapolated to zero concentration",
      correct_option: "A",
      explanation: "Step 1: Strong electrolytes follow the Debye-Hückel-Onsager equation Λ_m = Λ°_m − A√C, giving a nearly straight line with a small slope that can be extrapolated to C = 0 to determine Λ°_m.\nStep 2: Weak electrolytes are poorly ionized at moderate concentrations but ionize rapidly upon extreme dilution, causing Λ_m to increase steeply near C = 0 as an asymptotic curve that cannot be extrapolated linearly.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3783,
    similarQuestion: {
      question: "The conductivity of a 0.0020 M aqueous solution of a weak monobasic acid HA is 4.0 × 10⁻⁵ S cm⁻¹. If its limiting molar conductivity is 400 S cm² mol⁻¹, what is the dissociation constant (K_a) of the acid?",
      option_a: "5.26 × 10⁻⁶ mol L⁻¹",
      option_b: "2.50 × 10⁻⁵ mol L⁻¹",
      option_c: "1.05 × 10⁻⁵ mol L⁻¹",
      option_d: "5.26 × 10⁻⁵ mol L⁻¹",
      correct_option: "A",
      explanation: "Step 1: Calculate molar conductivity Λ_m:\nΛ_m = (κ × 1000) / C = (4.0 × 10⁻⁵ × 1000) / 0.0020 = 20 S cm² mol⁻¹.\n\nStep 2: Calculate degree of dissociation α:\nα = Λ_m / Λ°_m = 20 / 400 = 0.05.\n\nStep 3: Calculate dissociation constant K_a:\nK_a = (C × α²) / (1 − α) = [0.0020 × (0.05)²] / (1 − 0.05) = (0.0020 × 0.0025) / 0.95 = 5.0 × 10⁻⁶ / 0.95 ≈ 5.26 × 10⁻⁶ mol L⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3784,
    similarQuestion: {
      question: "When 3.5 Faradays of electricity are passed through an aqueous solution of silver nitrate (AgNO₃), what is the number of gram-equivalents of silver metal deposited at the cathode?",
      option_a: "3.5 gram-equivalents",
      option_b: "1.75 gram-equivalents",
      option_c: "7.0 gram-equivalents",
      option_d: "0.875 gram-equivalents",
      correct_option: "A",
      explanation: "Step 1: According to Faraday's second law of electrolysis, 1 Faraday (96,500 C) of electricity deposits exactly 1 gram-equivalent of any substance at an electrode.\nStep 2: Therefore, passage of 3.5 Faradays of electric charge deposits:\n3.5 × 1 = 3.5 gram-equivalents of silver.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3785,
    similarQuestion: {
      question: "According to Faraday's First Law of Electrolysis, the mass of a substance deposited or liberated at an electrode during electrolysis is directly proportional to:",
      option_a: "The quantity of electrical charge passed through the electrolyte",
      option_b: "The resistance of the electrolyte solution",
      option_c: "The atmospheric pressure above the cell",
      option_d: "The square root of the applied voltage",
      correct_option: "A",
      explanation: "Step 1: Faraday's First Law states that m ∝ Q, where m is the mass of substance deposited and Q is the total electrical charge passed.\nStep 2: Since Q = I × t, m = Z × I × t, where Z is the electrochemical equivalent of the substance.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3786,
    similarQuestion: {
      question: "During the electrolysis of acidified water, passing exactly 2 Faradays of electric charge through the cell will liberate:",
      option_a: "1.0 mole of H₂(g) and 0.5 mole of O₂(g)",
      option_b: "2.0 moles of H₂(g) and 1.0 mole of O₂(g)",
      option_c: "0.5 mole of H₂(g) and 0.25 mole of O₂(g)",
      option_d: "1.0 mole of H₂(g) and 1.0 mole of O₂(g)",
      correct_option: "A",
      explanation: "Step 1: Cathode reduction:\n2H⁺ + 2e⁻ → H₂(g)\n2 Faradays produce 1.0 mole of H₂(g).\n\nStep 2: Anode oxidation:\n2H₂O → O₂(g) + 4H⁺ + 4e⁻\n4 Faradays produce 1.0 mole of O₂(g); therefore, 2 Faradays produce 0.5 mole of O₂(g).\n\nStep 3: Hence, 1.0 mole of H₂ and 0.5 mole of O₂ are liberated.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3787,
    similarQuestion: {
      question: "Which of the following electrochemical cells is classified as a secondary (rechargeable) battery?",
      option_a: "Nickel-cadmium (Ni-Cd) cell",
      option_b: "Dry cell (Leclanché cell)",
      option_c: "Mercury button cell",
      option_d: "Alkaline zinc-MnO₂ dry battery",
      correct_option: "A",
      explanation: "Step 1: Primary cells (like the Leclanché dry cell and mercury button cell) become dead after reaction completion and cannot be recharged.\nStep 2: Secondary cells (like the lead storage battery and nickel-cadmium cell) can be recharged by passing direct current in the opposite direction, restoring original active materials.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3788,
    similarQuestion: {
      question: "Which of the following is the most widely utilized and established operational fuel cell?",
      option_a: "Hydrogen-oxygen (H₂–O₂) fuel cell",
      option_b: "Zinc-air primary battery",
      option_c: "Lead-acid accumulator",
      option_d: "Lithium-ion pouch cell",
      correct_option: "A",
      explanation: "Step 1: The hydrogen-oxygen fuel cell was famously utilized in the Apollo space programme to supply electrical energy and drinking water.\nStep 2: It directly converts the energy of combustion of hydrogen fuel into electrical energy with high thermodynamic efficiency and water as the sole byproduct.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 67 Part 3.');

    for (let i = 0; i < questionsPart3.length; i++) {
      const q = questionsPart3[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart3.length} (ID: ${q.id})`);
    }
    console.log('Set 67 Part 3 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 67 Part 3:', err.message);
  }
}

run();
