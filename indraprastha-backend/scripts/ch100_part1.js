module.exports = [
  {
    id: 1924,
    originalQuestion: {
      question: "For the disproportionation of copper: 2Cu⁺ → Cu²⁺ + Cu E° is to be calculated. Given: E° for Cu²⁺/Cu = 0.34 V and E° for Cu²⁺/Cu⁺ = 0.15 V [AIPMT 2000]",
      option_a: "0.49 V",
      option_b: "−0.19 V",
      option_c: "0.38 V",
      option_d: "−0.38 V",
      correct_option: "C",
      explanation: "Let us write the half-reactions and relate their standard Gibbs free energies (ΔG° = −nFE°):\n1. Cu²⁺ + 2e⁻ → Cu, ΔG₁° = −2 · F · (0.34 V) = −0.68 F\n2. Cu²⁺ + e⁻ → Cu⁺, ΔG₂° = −1 · F · (0.15 V) = −0.15 F\nSubtracting reaction (2) from reaction (1) gives:\nCu⁺ + e⁻ → Cu, ΔG₃° = ΔG₁° − ΔG₂° = −0.68 F − (−0.15 F) = −0.53 F\nTherefore, E°(Cu⁺/Cu) = −ΔG₃° / (1 · F) = 0.53 V (or using standard experimental value ~0.52 V).\n3. For the disproportionation reaction 2Cu⁺ → Cu²⁺ + Cu:\n- Oxidation at anode: Cu⁺ → Cu²⁺ + e⁻, E°_ox = −E°(Cu²⁺/Cu⁺) = −0.15 V\n- Reduction at cathode: Cu⁺ + e⁻ → Cu, E°_red = E°(Cu⁺/Cu) = 0.53 V\nE°_cell = E°_cathode − E°_anode = 0.53 V − 0.15 V = 0.38 V\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Given that E°(Cu²⁺/Cu) = +0.34 V and E°(Cu²⁺/Cu⁺) = +0.15 V, what is the standard reduction potential E° for Cu⁺/Cu?",
      option_a: "+0.53 V",
      option_b: "+0.19 V",
      option_c: "+0.49 V",
      option_d: "−0.19 V",
      correct_option: "A",
      explanation: "Using the relation ΔG₁° = ΔG₂° + ΔG₃°:\n−2 · F · E°(Cu²⁺/Cu) = −1 · F · E°(Cu²⁺/Cu⁺) − 1 · F · E°(Cu⁺/Cu)\n2 · (0.34) = 0.15 + E°(Cu⁺/Cu)\n0.68 = 0.15 + E°(Cu⁺/Cu)\nE°(Cu⁺/Cu) = 0.68 − 0.15 = +0.53 V\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1923,
    originalQuestion: {
      question: "Equivalent conductances of Ba²⁺ and Cl⁻ ions are 127 and 76 ohm⁻¹ cm² eq⁻¹, respectively. The equivalent conductance of BaCl₂ at infinite dilution is: [AIPMT 2000]",
      option_a: "139.5",
      option_b: "101.5",
      option_c: "203",
      option_d: "279",
      correct_option: "C",
      explanation: "According to Kohlrausch's law of independent migration of ions, the equivalent conductance of an electrolyte at infinite dilution (Λ_eq°) is simply the sum of the equivalent conductances of its constituent cation and anion:\nΛ_eq°(BaCl₂) = λ_eq°(Ba²⁺) + λ_eq°(Cl⁻)\nGiven:\nλ_eq°(Ba²⁺) = 127 ohm⁻¹ cm² eq⁻¹\nλ_eq°(Cl⁻) = 76 ohm⁻¹ cm² eq⁻¹\nSubstituting the values:\nΛ_eq°(BaCl₂) = 127 + 76 = 203 ohm⁻¹ cm² eq⁻¹\n(Note: unlike molar conductance, equivalent conductance does not multiply by stoichiometric coefficients).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The equivalent conductances at infinite dilution of Al³⁺ and SO₄²⁻ are 189 and 160 ohm⁻¹ cm² eq⁻¹, respectively. What is the equivalent conductance of Al₂(SO₄)₃ at infinite dilution?",
      option_a: "349 ohm⁻¹ cm² eq⁻¹",
      option_b: "698 ohm⁻¹ cm² eq⁻¹",
      option_c: "858 ohm⁻¹ cm² eq⁻¹",
      option_d: "174.5 ohm⁻¹ cm² eq⁻¹",
      correct_option: "A",
      explanation: "By Kohlrausch's law for equivalent conductance:\nΛ_eq°(Al₂(SO₄)₃) = λ_eq°(Al³⁺) + λ_eq°(SO₄²⁻) = 189 + 160 = 349 ohm⁻¹ cm² eq⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1922,
    originalQuestion: {
      question: "A cell reaction is spontaneous when: [AIPMT 2000]",
      option_a: "ΔG° is negative",
      option_b: "ΔG° is positive",
      option_c: "ΔE°red is positive",
      option_d: "ΔE°red is negative",
      correct_option: "A",
      explanation: "From fundamental chemical thermodynamics, the criterion for the spontaneity of a reaction at constant temperature and pressure is that the change in Gibbs free energy must be negative:\nΔG < 0 (and under standard states, ΔG° < 0)\nFurthermore, the relation between Gibbs energy change and cell potential is:\nΔG° = −nFE°_cell\nFor ΔG° to be negative, the standard cell EMF (E°_cell) must be positive.\nTherefore, a cell reaction is spontaneous when ΔG° is negative.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a redox reaction occurring in a galvanic cell to be thermodynamically feasible and spontaneous under standard conditions, which condition must hold true?",
      option_a: "E°_cell > 0 and ΔG° < 0",
      option_b: "E°_cell < 0 and ΔG° > 0",
      option_c: "E°_cell = 0 and ΔG° = 0",
      option_d: "E°_cell > 0 and ΔG° > 0",
      correct_option: "A",
      explanation: "Because ΔG° = −nFE°_cell, a positive E°_cell automatically yields a negative ΔG°, which is the definitive thermodynamic requirement for spontaneity.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1921,
    originalQuestion: {
      question: "Standard electrode potentials are: Fe²⁺/Fe [E° = −0.44 V] Fe³⁺/Fe²⁺ [E° = +0.77 V] If Fe²⁺, Fe³⁺ and Fe blocks are kept together, then: [AIPMT 2001]",
      option_a: "Fe³⁺ increases",
      option_b: "Fe³⁺ decreases",
      option_c: "Fe²⁺/Fe³⁺ remains unchanged",
      option_d: "Fe²⁺ decreases",
      correct_option: "B",
      explanation: "Let us evaluate the feasibility of the synproportionation reaction between Fe and Fe³⁺:\nAnode (oxidation): Fe → Fe²⁺ + 2e⁻, E°_ox = −(−0.44 V) = +0.44 V\nCathode (reduction): 2Fe³⁺ + 2e⁻ → 2Fe²⁺, E°_red = +0.77 V\nOverall reaction: Fe(s) + 2Fe³⁺(aq) → 3Fe²⁺(aq)\nE°_cell = E°_cathode + E°_ox = 0.77 V + 0.44 V = +1.21 V\nBecause E°_cell is positive (+1.21 V > 0), the forward reaction is highly spontaneous.\nAs the reaction proceeds spontaneously, metallic Fe and Fe³⁺ are consumed while Fe²⁺ is produced.\nConsequently, the concentration of Fe³⁺ decreases.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When metallic zinc is added to an aqueous solution containing Cu²⁺ and Zn²⁺ ions (E°_Zn²⁺/Zn = −0.76 V, E°_Cu²⁺/Cu = +0.34 V), what change occurs in the solution?",
      option_a: "The concentration of Cu²⁺ increases",
      option_b: "The concentration of Cu²⁺ decreases while Zn²⁺ increases",
      option_c: "No chemical change occurs",
      option_d: "Metallic copper dissolves into solution",
      correct_option: "B",
      explanation: "E°_cell = E°_Cu²⁺/Cu − E°_Zn²⁺/Zn = 0.34 − (−0.76) = +1.10 V > 0.\nThe spontaneous displacement reaction is Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).\nHence, Cu²⁺ ions are consumed (concentration decreases) while Zn²⁺ ions enter the solution (concentration increases).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1920,
    originalQuestion: {
      question: "In electrolysis of NaCl, when a Pt electrode is used, H₂ is liberated at the cathode, while with a Hg cathode it forms sodium amalgam. This is because: [AIPMT 2002]",
      option_a: "Hg is more inert than Pt.",
      option_b: "More voltage is required to reduce H⁺ at Hg than at Pt.",
      option_c: "Na dissolves in Hg while it does not dissolve in Pt.",
      option_d: "Concentration of H⁺ ions is larger when a Pt electrode is used.",
      correct_option: "B",
      explanation: "In aqueous NaCl, both Na⁺ and H⁺ ions migrate to the cathode:\n- At a Pt cathode, the reduction potential of H⁺ (0.00 V at standard state) is far higher than that of Na⁺ (−2.71 V), and hydrogen discharge has virtually zero overpotential on platinum. Hence, H₂ gas is preferentially discharged.\n- At a mercury (Hg) cathode, hydrogen gas has an exceptionally high overpotential (overvoltage) of about 1.5 V, which drastically shifts the actual discharge potential of H⁺ to a much more negative value.\n- Simultaneously, sodium dissolves readily in mercury to form sodium amalgam (Na/Hg), which significantly lowers the discharge potential of Na⁺.\nDue to this enormous overvoltage required to reduce H⁺ at a mercury surface, discharge of Na⁺ becomes kinetically favoured, forming sodium amalgam.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the primary phenomenon responsible for the preferential discharge of Na⁺ rather than H⁺ at a mercury cathode during the chlor-alkali process?",
      option_a: "High overvoltage (overpotential) of hydrogen discharge on mercury",
      option_b: "Low solubility of chlorine gas in brine",
      option_c: "Precipitation of sodium hydroxide at the anode",
      option_d: "Extreme volatility of mercury",
      correct_option: "A",
      explanation: "Hydrogen has an unusually large activation overpotential on liquid mercury, making the reduction of H⁺ to H₂ gas kinetically very slow.\nAs a result, Na⁺ ions are reduced at a less negative potential than the overpotential-shifted H⁺ ions, forming sodium amalgam.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1919,
    originalQuestion: {
      question: "On the basis of the information available from the reaction (3/4)Al + O₂ → (3/2)Al₂O₃, ΔG = −827 kJ mol⁻¹ of O₂ the minimum EMF required to carry out electrolysis of Al₂O₃ is: F = 96500 C mol⁻¹ [AIPMT 2003]",
      option_a: "2.14 V",
      option_b: "4.28 V",
      option_c: "6.42",
      option_d: "8.56 V",
      correct_option: "A",
      explanation: "In the reaction involving 1 mole of O₂:\nO₂ + 4e⁻ → 2O²⁻\nThe number of electrons transferred per mole of O₂ consumed or produced is n = 4.\nThe minimum electrical potential (EMF) required to drive the non-spontaneous reverse decomposition reaction is given by:\nΔG = −nFE_min ⇒ E_min = |ΔG| / (n · F)\nGiven:\n|ΔG| = 827 kJ = 827 × 10³ J\nn = 4\nF = 96500 C mol⁻¹\nSubstituting the values:\nE_min = (827 × 10³) / (4 × 96500) = 827000 / 386000 ≈ 2.142 V ≈ 2.14 V\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The standard Gibbs free energy change for the decomposition of a metal oxide MO₂ → M + O₂ is +482.5 kJ mol⁻¹. What is the minimum potential required for electrolytic decomposition? (F = 96500 C mol⁻¹)",
      option_a: "1.25 V",
      option_b: "2.50 V",
      option_c: "5.00 V",
      option_d: "0.625 V",
      correct_option: "A",
      explanation: "For the generation of 1 mole of O₂ from 2 O²⁻, 4 electrons are transferred (n = 4):\nE = ΔG / (n · F) = 482500 / (4 · 96500) = 482500 / 386000 = 1.25 V.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1918,
    originalQuestion: {
      question: "The EMF of a Daniell cell at 298 K is E₁: Zn | ZnSO₄(0.01 M) || CuSO₄(1.0 M) | Cu When the concentration of ZnSO₄ is 1.0 M and that of CuSO₄ is 0.01 M, the EMF changes to E₂. What is the relationship between E₁ and E₂? [AIPMT 2003]",
      option_a: "E₁ > E₂",
      option_b: "E₁ < E₂",
      option_c: "E₁ = E₂",
      option_d: "E₂ = 0 ≠ E₁",
      correct_option: "A",
      explanation: "The Nernst equation for the Daniell cell (Zn + Cu²⁺ → Zn²⁺ + Cu) with n = 2 at 298 K is:\nE = E°_cell − (0.059 / 2) · log₁₀([Zn²⁺] / [Cu²⁺])\n1. For cell 1: [Zn²⁺] = 0.01 M, [Cu²⁺] = 1.0 M\n[Zn²⁺] / [Cu²⁺] = 0.01 / 1.0 = 10⁻²\nE₁ = E°_cell − (0.059 / 2) · log₁₀(10⁻²) = E°_cell − (0.059 / 2) · (−2) = E°_cell + 0.059 V\n2. For cell 2: [Zn²⁺] = 1.0 M, [Cu²⁺] = 0.01 M\n[Zn²⁺] / [Cu²⁺] = 1.0 / 0.01 = 10²\nE₂ = E°_cell − (0.059 / 2) · log₁₀(10²) = E°_cell − (0.059 / 2) · (2) = E°_cell − 0.059 V\nComparing the two expressions:\nE₁ = E°_cell + 0.059 V > E°_cell − 0.059 V = E₂\nTherefore, E₁ > E₂.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In a Daniell cell, how does the cell potential E_cell change if the concentration of Cu²⁺ ions in the cathode compartment is increased while keeping [Zn²⁺] constant?",
      option_a: "E_cell increases",
      option_b: "E_cell decreases",
      option_c: "E_cell remains constant",
      option_d: "E_cell drops to zero",
      correct_option: "A",
      explanation: "From the Nernst equation, E_cell = E°_cell − (0.059/2) · log([Zn²⁺]/[Cu²⁺]) = E°_cell + (0.059/2) · log([Cu²⁺]/[Zn²⁺]).\nIncreasing [Cu²⁺] increases the logarithmic term, thereby increasing the cell EMF.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1917,
    originalQuestion: {
      question: "The standard EMF of a galvanic cell involving a cell reaction with n = 2 is found to be 0.295 V at 25°C. The equilibrium constant of the reaction would be: [AIPMT 2004]",
      option_a: "2.0 × 10¹¹",
      option_b: "4.0 × 10¹²",
      option_c: "1.0 × 10²",
      option_d: "1.0 × 10¹⁰",
      correct_option: "D",
      explanation: "The relationship between standard EMF (E°_cell) and the equilibrium constant (K) at 25 °C (298 K) is:\nE°_cell = (0.059 / n) · log₁₀ K\nGiven:\nE°_cell = 0.295 V\nn = 2\nSubstituting the values:\n0.295 = (0.059 / 2) · log₁₀ K = 0.0295 · log₁₀ K\nlog₁₀ K = 0.295 / 0.0295 = 10\nTaking antilogarithms on both sides:\nK = 10¹⁰ = 1.0 × 10¹⁰\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a cell reaction with n = 1 at 298 K, E°_cell is found to be 0.177 V. What is the equilibrium constant of the reaction?",
      option_a: "1.0 × 10³",
      option_b: "1.0 × 10⁶",
      option_c: "1.0 × 10²",
      option_d: "3.0 × 10³",
      correct_option: "A",
      explanation: "log₁₀ K = (n · E°_cell) / 0.059 = (1 · 0.177) / 0.059 = 3.\nK = 10³ = 1.0 × 10³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1916,
    originalQuestion: {
      question: "The mass of carbon anode consumed, giving only carbon dioxide, in the production of 270 kg of aluminium metal from bauxite by the Hall process is: Atomic mass of Al = 27 [AIPMT 2005]",
      option_a: "270 kg",
      option_b: "540 kg",
      option_c: "90 kg",
      option_d: "180 kg",
      correct_option: "C",
      explanation: "In the Hall-Héroult electrolytic process, the overall cell reaction when carbon dioxide is produced at the carbon anode is:\n2 Al₂O₃ + 3 C → 4 Al + 3 CO₂\nFrom the stoichiometry of this reaction:\n- 4 moles of Al (4 × 27 g = 108 g) require 3 moles of carbon (3 × 12 g = 36 g).\nTherefore, the mass ratio of carbon consumed to aluminium produced is:\nMass of C / Mass of Al = 36 / 108 = 1 / 3\nFor 270 kg of aluminium produced:\nMass of carbon anode consumed = (1/3) × 270 kg = 90 kg\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In the Hall-Héroult process, what mass of carbon anode is consumed to produce 540 kg of aluminium metal if only CO₂ is liberated?",
      option_a: "90 kg",
      option_b: "180 kg",
      option_c: "270 kg",
      option_d: "360 kg",
      correct_option: "B",
      explanation: "From 4 Al produced per 3 C consumed:\nMass of C = (3 · 12 / (4 · 27)) · Mass of Al = (36 / 108) · 540 kg = (1/3) · 540 kg = 180 kg.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1915,
    originalQuestion: {
      question: "4.5 g of aluminium (atomic mass = 27 amu) is deposited at the cathode from an Al³⁺ solution by a certain quantity of electric charge. The volume of hydrogen produced at STP from H⁺ ions in solution by the same quantity of electric charge will be: [AIPMT 2005]",
      option_a: "44.8 L",
      option_b: "22.4 L",
      option_c: "11.2 L",
      option_d: "5.6 L",
      correct_option: "D",
      explanation: "According to Faraday's second law of electrolysis, when the same quantity of electricity is passed through different solutions, the number of gram equivalents deposited is identical:\nNumber of equivalents of Al = Number of equivalents of H₂\n1. Gram equivalents of Al deposited:\nEquivalent weight of Al = Atomic mass / Valency = 27 / 3 = 9 g eq⁻¹\nNumber of equivalents of Al = Mass / Equivalent weight = 4.5 / 9 = 0.5 eq\n2. Gram equivalents of H₂ produced:\nNumber of equivalents of H₂ = 0.5 eq\nSince the reduction of H⁺ is: 2H⁺ + 2e⁻ → H₂\n1 mole of H₂ gas (22.4 L at STP) corresponds to 2 equivalents.\nTherefore, the volume of 1 equivalent of H₂ at STP is 22.4 / 2 = 11.2 L.\nFor 0.5 equivalents of H₂:\nVolume of H₂ at STP = 0.5 × 11.2 L = 5.6 L\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What volume of oxygen gas (O₂) at STP is liberated by the same quantity of electricity that deposits 108 g of silver (Ag)? (Atomic mass: Ag = 108, O = 16)",
      option_a: "5.6 L",
      option_b: "11.2 L",
      option_c: "22.4 L",
      option_d: "2.8 L",
      correct_option: "A",
      explanation: "108 g of Ag = 1 mole = 1 equivalent = 1 Faraday of charge.\nLiberation of O₂: 2 H₂O → O₂ + 4 H⁺ + 4 e⁻.\n1 mole of O₂ (22.4 L at STP) requires 4 Faradays (4 equivalents).\nTherefore, 1 Faraday produces 22.4 / 4 = 5.6 L of O₂ gas at STP.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1914,
    originalQuestion: {
      question: "E°Fe²⁺/Fe = −0.441 V and E°Fe³⁺/Fe²⁺ = +0.771 V. The standard EMF of the reaction Fe + 2Fe³⁺ → 3Fe²⁺ will be: [AIPMT 2006]",
      option_a: "0.111 V",
      option_b: "0.330 V",
      option_c: "1.653 V",
      option_d: "1.212 V",
      correct_option: "D",
      explanation: "Let us separate the overall reaction Fe + 2Fe³⁺ → 3Fe²⁺ into its oxidation and reduction half-reactions:\n- Anode (oxidation): Fe → Fe²⁺ + 2e⁻\nStandard oxidation potential = −E°(Fe²⁺/Fe) = −(−0.441 V) = +0.441 V\n- Cathode (reduction): 2Fe³⁺ + 2e⁻ → 2Fe²⁺\nStandard reduction potential = E°(Fe³⁺/Fe²⁺) = +0.771 V\nThe standard EMF of the cell is:\nE°_cell = E°_cathode − E°_anode = E°(Fe³⁺/Fe²⁺) − E°(Fe²⁺/Fe)\nE°_cell = +0.771 V − (−0.441 V) = 0.771 + 0.441 = 1.212 V\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Given that E°(Zn²⁺/Zn) = −0.76 V and E°(Ag⁺/Ag) = +0.80 V, what is the standard EMF of the cell reaction Zn(s) + 2Ag⁺(aq) → Zn²⁺(aq) + 2Ag(s)?",
      option_a: "+1.56 V",
      option_b: "+0.04 V",
      option_c: "−1.56 V",
      option_d: "+2.36 V",
      correct_option: "A",
      explanation: "E°_cell = E°_cathode − E°_anode = E°(Ag⁺/Ag) − E°(Zn²⁺/Zn) = 0.80 − (−0.76) = +1.56 V.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1913,
    originalQuestion: {
      question: "A hypothetical electrochemical cell is shown below: A | A⁺(x M) || B⁺(y M) | B The emf measured is +0.20 V. The cell reaction is: [AIPMT 2006]",
      option_a: "A + B⁺ → A⁺ + B",
      option_b: "A⁺ + B → A + B⁺",
      option_c: "A⁺ + e⁻ → A; B⁺ + e⁻ → B",
      option_d: "The cell reaction cannot be predicted.",
      correct_option: "A",
      explanation: "According to IUPAC cell notation conventions:\n- The left-hand electrode represents the anode where oxidation occurs: A → A⁺ + e⁻\n- The right-hand electrode represents the cathode where reduction occurs: B⁺ + e⁻ → B\nBecause the measured EMF is positive (+0.20 V), the cell reaction proceeds spontaneously in the direction written:\nAdding the two half-reactions:\nA(s) + B⁺(aq) → A⁺(aq) + B(s)\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For the cell representation Cr | Cr³⁺ || Fe²⁺ | Fe with positive EMF, what is the spontaneous overall cell reaction?",
      option_a: "2Cr + 3Fe²⁺ → 2Cr³⁺ + 3Fe",
      option_b: "2Cr³⁺ + 3Fe → 2Cr + 3Fe²⁺",
      option_c: "Cr + Fe²⁺ → Cr³⁺ + Fe",
      option_d: "Cr³⁺ + Fe²⁺ → Cr + Fe",
      correct_option: "A",
      explanation: "Left is anode oxidation: Cr → Cr³⁺ + 3e⁻ (multiplied by 2: 2Cr → 2Cr³⁺ + 6e⁻).\nRight is cathode reduction: Fe²⁺ + 2e⁻ → Fe (multiplied by 3: 3Fe²⁺ + 6e⁻ → 3Fe).\nOverall reaction: 2Cr + 3Fe²⁺ → 2Cr³⁺ + 3Fe.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1912,
    originalQuestion: {
      question: "The efficiency of a fuel cell is given by: [AIPMT 2007]",
      option_a: "ΔG/ΔS",
      option_b: "ΔG/ΔH",
      option_c: "ΔS/ΔG",
      option_d: "ΔH/ΔG",
      correct_option: "B",
      explanation: "A fuel cell converts the chemical energy of a fuel directly into electrical energy.\nThe theoretical maximum electrical work obtainable at constant temperature and pressure is given by the change in Gibbs free energy (ΔG = −W_elec).\nThe total heat energy released during combustion of the fuel is given by the enthalpy of reaction (ΔH).\nTherefore, the thermodynamic thermodynamic efficiency (η) of a fuel cell is defined as:\nη = (Electrical energy produced / Heat of combustion) = ΔG / ΔH\n(Often expressed as percentage: η = (ΔG / ΔH) × 100).\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If for a hydrogen-oxygen fuel cell, ΔG° = −237.2 kJ mol⁻¹ and ΔH° = −285.8 kJ mol⁻¹, what is the theoretical thermodynamic efficiency of the cell?",
      option_a: "83.0%",
      option_b: "100%",
      option_c: "41.5%",
      option_d: "70.5%",
      correct_option: "A",
      explanation: "Efficiency η = (ΔG° / ΔH°) × 100 = (−237.2 / −285.8) × 100 = 82.99% ≈ 83.0%.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1911,
    originalQuestion: {
      question: "The equilibrium constant of the reaction Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s) at 298 K, E° = 0.46 V, is: [AIPMT 2007]",
      option_a: "2.0 × 10¹⁰",
      option_b: "4.0 × 10¹⁰",
      option_c: "4.0 × 10¹⁵",
      option_d: "2.4 × 10¹⁰",
      correct_option: "C",
      explanation: "For the cell reaction Cu + 2Ag⁺ → Cu²⁺ + 2Ag, the number of electrons transferred is n = 2.\nThe relation between standard cell potential and equilibrium constant K at 298 K is:\nE°_cell = (0.0591 / n) · log₁₀ K\nGiven:\nE°_cell = 0.46 V\nn = 2\nSubstituting the values:\n0.46 = (0.0591 / 2) · log₁₀ K\nlog₁₀ K = (2 × 0.46) / 0.0591 = 0.92 / 0.0591 ≈ 15.567\nTaking antilogarithms:\nK = 10¹⁵·⁵⁶⁷ = 10⁰·⁵⁶⁷ × 10¹⁵ ≈ 3.69 × 10¹⁵ ≈ 4.0 × 10¹⁵\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Calculate the equilibrium constant for a reaction with n = 2 and E°_cell = 0.591 V at 298 K.",
      option_a: "1.0 × 10²⁰",
      option_b: "1.0 × 10¹⁰",
      option_c: "2.0 × 10²⁰",
      option_d: "1.0 × 10³⁰",
      correct_option: "A",
      explanation: "log₁₀ K = (n · E°_cell) / 0.0591 = (2 · 0.591) / 0.0591 = 20.\nK = 10²⁰ = 1.0 × 10²⁰.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1910,
    originalQuestion: {
      question: "Standard free energies of formation at 298 K are −237.2, −394.4 and −8.2 kJ/mol for H₂O(l), CO₂(g) and pentane(g), respectively. The value of E°cell for the pentane-oxygen fuel cell is: [AIPMT 2008]",
      option_a: "1.0968 V",
      option_b: "0.0968 V",
      option_c: "1.968 V",
      option_d: "2.0968 V",
      correct_option: "A",
      explanation: "1. Write the balanced equation for the combustion of pentane in the fuel cell:\nC₅H₁₂(g) + 8 O₂(g) → 5 CO₂(g) + 6 H₂O(l)\n2. Determine the number of electrons transferred (n):\nIn pentane (C₅H₁₂), each carbon has an average oxidation state of −12/5 = −2.4. In CO₂, carbon is +4.\nChange per carbon = +4 − (−2.4) = +6.4.\nTotal electrons for 5 carbon atoms: n = 5 × 6.4 = 32 electrons.\n(Alternatively, 8 O₂ atoms: 16 oxygen atoms change from 0 to −2, so n = 16 × 2 = 32 electrons).\n3. Calculate standard Gibbs free energy of the reaction (ΔrG°):\nΔrG° = [5 · ΔfG°(CO₂) + 6 · ΔfG°(H₂O)] − [ΔfG°(pentane) + 8 · ΔfG°(O₂)]\nΔrG° = [5(−394.4) + 6(−237.2)] − [(−8.2) + 0]\nΔrG° = [−1972.0 − 1423.2] + 8.2 = −3395.2 + 8.2 = −3387.0 kJ mol⁻¹ = −3.387 × 10⁶ J mol⁻¹\n4. Calculate E°_cell:\nΔrG° = −nFE°_cell\nE°_cell = −ΔrG° / (n · F) = (3.387 × 10⁶) / (32 × 96500) = 3387000 / 3088000 ≈ 1.0968 V\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a methane-oxygen fuel cell: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), what is the number of moles of electrons (n) transferred per mole of methane consumed?",
      option_a: "8",
      option_b: "4",
      option_c: "2",
      option_d: "16",
      correct_option: "A",
      explanation: "In CH₄, carbon is in the −4 oxidation state, and in CO₂, carbon is in the +4 oxidation state.\nThe change in oxidation number of carbon is from −4 to +4, which corresponds to the loss of 8 electrons (n = 8).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1909,
    originalQuestion: {
      question: "Kohlrausch's law states that at: [AIPMT 2008]",
      option_a: "Infinite dilution, each ion makes a definite contribution to the conductance of an electrolyte, whatever be the nature of the other ion of the electrolyte.",
      option_b: "Infinite dilution, each ion makes a definite contribution to the equivalent conductance of an electrolyte, whatever be the nature of the other ion of the electrolyte.",
      option_c: "Finite dilution, each ion makes a definite contribution to the equivalent conductance of an electrolyte, whatever be the nature of the other ion of the electrolyte.",
      option_d: "Infinite dilution, each ion makes a definite contribution to the equivalent conductance of an electrolyte depending on the nature of the other ion of the electrolyte.",
      correct_option: "B",
      explanation: "Kohlrausch's law of independent migration of ions states that:\nAt infinite dilution, when interionic attractions become completely negligible, each constituent ion of an electrolyte migrates independently and makes a definite, fixed contribution to the total equivalent (or molar) conductance of the electrolyte, completely independent of the nature of the co-ion with which it is associated.\nTherefore, Option (B) accurately reflects the law.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following is an important practical application of Kohlrausch's law of independent migration of ions?",
      option_a: "Determination of the limiting molar conductivity of weak electrolytes",
      option_b: "Calculating the threshold energy of gas-phase collisions",
      option_c: "Determining the order of a complex reaction",
      option_d: "Measuring the mechanical efficiency of steam turbines",
      correct_option: "A",
      explanation: "Because weak electrolytes do not dissociate completely even at high dilutions, their limiting molar conductivity (Λ_m°) cannot be obtained by direct graphical extrapolation.\nKohlrausch's law allows Λ_m° of weak electrolytes (such as CH₃COOH) to be calculated by adding and subtracting the limiting conductivities of suitable strong electrolytes (e.g., CH₃COONa, HCl, and NaCl).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1908,
    originalQuestion: {
      question: "On the basis of the following E° values, the strongest oxidising agent is: [Fe(CN)₆]⁴⁻ → [Fe(CN)₆]³⁻ + e⁻; E° = −0.35 V Fe²⁺ → Fe³⁺ + e⁻; E° = −0.77 V [AIPMT 2008]",
      option_a: "Fe³⁺",
      option_b: "[Fe(CN)₆]³⁻",
      option_c: "[Fe(CN)₆]⁴⁻",
      option_d: "Fe²⁺",
      correct_option: "A",
      explanation: "Let us write both electrode processes as standard reduction potentials (E°_red = −E°_ox):\n1. [Fe(CN)₆]³⁻ + e⁻ → [Fe(CN)₆]⁴⁻, E°_red = −(−0.35 V) = +0.35 V\n2. Fe³⁺ + e⁻ → Fe²⁺, E°_red = −(−0.77 V) = +0.77 V\nA stronger oxidising agent has a greater tendency to gain electrons and is characterized by a higher (more positive) standard reduction potential.\nComparing the reduction potentials:\nE°_red(Fe³⁺/Fe²⁺) = +0.77 V is significantly higher than E°_red([Fe(CN)₆]³⁻/[Fe(CN)₆]⁴⁻) = +0.35 V.\nTherefore, Fe³⁺ has the greatest tendency to accept electrons and is the strongest oxidising agent.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Given standard reduction potentials: E°(Cl₂/Cl⁻) = +1.36 V, E°(Cr³⁺/Cr) = −0.74 V, E°(MnO₄⁻/Mn²⁺) = +1.51 V. Which species is the strongest oxidising agent?",
      option_a: "MnO₄⁻",
      option_b: "Cl₂",
      option_c: "Cr³⁺",
      option_d: "Cl⁻",
      correct_option: "A",
      explanation: "The strongest oxidising agent corresponds to the highest positive standard reduction potential.\nMnO₄⁻ has the highest value (+1.51 V), making it the strongest oxidising agent among the given species.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1907,
    originalQuestion: {
      question: "The equivalent conductance of an M/32 solution of a weak monobasic acid is 8.0 mho cm², and at infinite dilution it is 400 mho cm². The dissociation constant of this acid is: [AIPMT 2009]",
      option_a: "1.25 × 10⁻⁶",
      option_b: "6.25 × 10⁻⁴",
      option_c: "1.25 × 10⁻⁴",
      option_d: "1.25 × 10⁻⁵",
      correct_option: "D",
      explanation: "1. Calculate the degree of dissociation (α):\nα = Λ_eq / Λ_eq° = 8.0 / 400 = 0.02\n2. The dissociation constant (K_a) for a weak monobasic acid is given by Ostwald's dilution law:\nK_a = (C · α²) / (1 − α)\nGiven concentration C = M/32 = 1/32 mol L⁻¹.\nSince α = 0.02 << 1, (1 − α) ≈ 1:\nK_a ≈ C · α² = (1 / 32) × (0.02)² = (1 / 32) × (4 × 10⁻⁴) = (4 / 32) × 10⁻⁴ = (1 / 8) × 10⁻⁴ = 0.125 × 10⁻⁴ = 1.25 × 10⁻⁵\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The molar conductivity of a 0.01 M weak monobasic acid HA is 20 S cm² mol⁻¹. If its limiting molar conductivity is 400 S cm² mol⁻¹, what is the acid dissociation constant K_a?",
      option_a: "2.5 × 10⁻⁵ mol L⁻¹",
      option_b: "2.63 × 10⁻⁵ mol L⁻¹",
      option_c: "5.0 × 10⁻⁴ mol L⁻¹",
      option_d: "1.0 × 10⁻⁵ mol L⁻¹",
      correct_option: "A",
      explanation: "Degree of dissociation α = Λ_m / Λ_m° = 20 / 400 = 0.05.\nK_a = C · α² / (1 − α) ≈ (0.01) · (0.05)² = 0.01 · 0.0025 = 2.5 × 10⁻⁵ mol L⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1906,
    originalQuestion: {
      question: "Al₂O₃ is reduced by electrolysis at low potentials and high currents. If 4.0 × 10⁴ amperes of current is passed through molten Al₂O₃ for 6 hours, what mass of aluminium is produced? Assume 100% current efficiency; atomic mass of Al = 27 g mol⁻¹. [AIPMT 2009]",
      option_a: "8.1 × 10⁴ g",
      option_b: "2.4 × 10⁵ g",
      option_c: "1.3 × 10⁴ g",
      option_d: "9.0 × 10³ g",
      correct_option: "A",
      explanation: "1. Reduction reaction of aluminium:\nAl³⁺ + 3e⁻ → Al (n = 3 electrons per atom)\nEquivalent weight of Al = Atomic mass / 3 = 27 / 3 = 9 g eq⁻¹\n2. Calculate total electric charge passed (Q = I · t):\nI = 4.0 × 10⁴ A\nt = 6 hours = 6 × 3600 s = 21600 s\nQ = (4.0 × 10⁴) × 21600 = 8.64 × 10⁸ C\n3. Calculate mass deposited using Faraday's first law (m = (Equivalent weight × Q) / F):\nm = (9 × 8.64 × 10⁸) / 96500 = (7.776 × 10⁹) / 96500 ≈ 80580 g ≈ 8.1 × 10⁴ g\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "How much aluminium is deposited when a constant current of 9.65 A is passed through molten AlCl₃ for 1000 seconds? (Atomic mass of Al = 27 g mol⁻¹, 1 F = 96500 C)",
      option_a: "0.90 g",
      option_b: "2.70 g",
      option_c: "0.30 g",
      option_d: "1.80 g",
      correct_option: "A",
      explanation: "Q = I · t = 9.65 · 1000 = 9650 C = 0.1 Faraday.\nSince 3 Faradays deposit 27 g of Al (1 mole):\nMass of Al = (0.1 / 3) · 27 = 0.90 g.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1905,
    originalQuestion: {
      question: "Given: (i) Cu²⁺ + 2e⁻ → Cu, E° = 0.337 V (ii) Cu²⁺ + e⁻ → Cu⁺, E° = 0.153 V The electrode potential E° for the reaction Cu⁺ + e⁻ → Cu will be: [AIPMT 2009]",
      option_a: "0.90 V",
      option_b: "0.30 V",
      option_c: "0.38 V",
      option_d: "0.52 V",
      correct_option: "D",
      explanation: "Standard electrode potentials are intensive properties and cannot be added directly; standard Gibbs free energies (ΔG° = −nFE°) must be used:\n1. Cu²⁺ + 2e⁻ → Cu, n₁ = 2, E₁° = 0.337 V\nΔG₁° = −2 · F · (0.337) = −0.674 F\n2. Cu²⁺ + e⁻ → Cu⁺, n₂ = 1, E₂° = 0.153 V\nΔG₂° = −1 · F · (0.153) = −0.153 F\n3. The target reaction is: Cu⁺ + e⁻ → Cu (Reaction 3 = Reaction 1 − Reaction 2):\nΔG₃° = ΔG₁° − ΔG₂° = −0.674 F − (−0.153 F) = −0.521 F\nSince ΔG₃° = −1 · F · E₃°:\n−1 · F · E₃° = −0.521 F\nE₃° = +0.521 V ≈ 0.52 V\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Given that E°(Fe³⁺/Fe) = −0.036 V and E°(Fe²⁺/Fe) = −0.439 V, calculate the standard electrode potential for Fe³⁺ + e⁻ → Fe²⁺.",
      option_a: "+0.770 V",
      option_b: "+0.403 V",
      option_c: "−0.475 V",
      option_d: "+0.367 V",
      correct_option: "A",
      explanation: "ΔG°(Fe³⁺/Fe²⁺) = ΔG°(Fe³⁺/Fe) − ΔG°(Fe²⁺/Fe)\n−1 · F · E° = −3 · F · (−0.036) − [−2 · F · (−0.439)]\n−E° = +0.108 − 0.878 = −0.770 V\nE° = +0.770 V.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1904,
    originalQuestion: {
      question: "An increase in equivalent conductance of a strong electrolyte with dilution is mainly due to: [AIPMT 2010 Prelims]",
      option_a: "Increase in ionic mobility of ions",
      option_b: "100% ionisation of electrolyte at normal dilution",
      option_c: "Increase in both the number of ions and ionic mobility of ions",
      option_d: "Increase in number of ions",
      correct_option: "A",
      explanation: "A strong electrolyte is already completely (100%) ionized into its constituent ions at all normal concentrations; hence, dilution does NOT increase the total number of ions in solution.\nHowever, at higher concentrations, strong interionic electrostatic attractions (Debye-Hückel-Onsager effects: relaxation effect and electrophoretic effect) retard the movement of ions.\nUpon dilution, the ions become further separated in space, weakening interionic forces and allowing the ions to move more freely.\nThus, the ionic mobility of the ions increases, which is the sole factor responsible for the increase in equivalent (or molar) conductance.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why does the molar conductivity of a weak electrolyte (like acetic acid) increase steeply upon dilution?",
      option_a: "Primarily due to a dramatic increase in the degree of dissociation (number of ions) upon dilution",
      option_b: "Exclusively due to increased solvent viscosity",
      option_c: "Because the electrolyte stops dissociating at high dilution",
      option_d: "Due to complete evaporation of the solvent",
      correct_option: "A",
      explanation: "According to Ostwald's dilution law, for weak electrolytes, dilution causes a sharp increase in the degree of ionization (α), vastly increasing the number of ions present in solution per mole of solute.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1903,
    originalQuestion: {
      question: "For the reduction of silver ions with copper metal, the standard cell potential was found to be +0.46 V at 25°C. The value of standard Gibbs energy, ΔG°, will be: F = 96500 C mol⁻¹ [AIPMT 2010 Prelims]",
      option_a: "−89.0 kJ",
      option_b: "−89.0 J",
      option_c: "−44.5 kJ",
      option_d: "−98.0 kJ",
      correct_option: "A",
      explanation: "The balanced redox reaction is:\nCu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s)\nThe number of moles of electrons transferred in this balanced equation is n = 2.\nThe relation between standard Gibbs energy and cell potential is:\nΔG° = −nFE°_cell\nGiven:\nn = 2\nF = 96500 C mol⁻¹\nE°_cell = +0.46 V\nSubstituting the values:\nΔG° = −2 × 96500 × 0.46 = −88780 J = −88.78 kJ ≈ −89.0 kJ\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Calculate the standard Gibbs energy change (ΔG°) for a cell reaction with n = 2 and E°_cell = 1.10 V. (F = 96500 C mol⁻¹)",
      option_a: "−212.3 kJ",
      option_b: "−106.15 kJ",
      option_c: "+212.3 kJ",
      option_d: "−424.6 kJ",
      correct_option: "A",
      explanation: "ΔG° = −nFE° = −2 · 96500 · 1.10 = −212300 J = −212.3 kJ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1902,
    originalQuestion: {
      question: "Consider the following relations for the emf of an electrochemical cell: (i) EMF of cell = oxidation potential of anode − reduction potential of cathode (ii) EMF of cell = oxidation potential of anode + reduction potential of cathode (iii) EMF of cell = reduction potential of anode + reduction potential of cathode (iv) EMF of cell = oxidation potential of anode − oxidation potential of cathode Which of the above relations are correct? [AIPMT 2010 Mains]",
      option_a: "(iii) and (i)",
      option_b: "(i) and (ii)",
      option_c: "(iii) and (iv)",
      option_d: "(ii) and (iv)",
      correct_option: "D",
      explanation: "The EMF of a galvanic cell represents the net driving potential between the two electrodes:\n1. In terms of both half-reaction potentials as they actually occur (oxidation at anode and reduction at cathode):\nEMF = Oxidation potential of anode + Reduction potential of cathode. (Relation ii is correct).\n2. Since reduction potential = −(oxidation potential):\nReduction potential of cathode = −(Oxidation potential of cathode)\nSubstituting this into relation (ii):\nEMF = Oxidation potential of anode − Oxidation potential of cathode. (Relation iv is correct).\n(Alternatively, using IUPAC standard reduction potentials: EMF = Reduction potential of cathode − Reduction potential of anode).\nThus, relations (ii) and (iv) are correct.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In terms of standard reduction potentials, what is the standard EMF of an electrochemical cell?",
      option_a: "E°_cathode − E°_anode",
      option_b: "E°_anode − E°_cathode",
      option_c: "E°_cathode + E°_anode",
      option_d: "−(E°_cathode + E°_anode)",
      correct_option: "A",
      explanation: "By standard IUPAC convention, electrode potentials are defined as reduction potentials:\nE°_cell = E°_reduction(cathode) − E°_reduction(anode).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1901,
    originalQuestion: {
      question: "Which of the following expressions correctly represents the equivalent conductance at infinite dilution of Al₂(SO₄)₃? Given that ΛAl³⁺ and ΛSO₄²⁻ are the equivalent conductances at infinite dilution of the respective ions. [AIPMT 2010 Mains]",
      option_a: "2ΛAl³⁺ + 3ΛSO₄²⁻",
      option_b: "ΛAl³⁺ + ΛSO₄²⁻",
      option_c: "(ΛAl³⁺ + ΛSO₄²⁻) × 6",
      option_d: "(1/3)ΛAl³⁺ + (1/2)ΛSO₄²⁻",
      correct_option: "B",
      explanation: "According to Kohlrausch's law:\n- When dealing with equivalent conductance (Λ_eq°), each equivalent of the electrolyte produces exactly one equivalent of cation and one equivalent of anion.\nTherefore, the equivalent conductance of any electrolyte at infinite dilution is simply the unweighted sum of the equivalent conductances of its constituent ions, regardless of charge or stoichiometry:\nΛ_eq°(Al₂(SO₄)₃) = λ_eq°(Al³⁺) + λ_eq°(SO₄²⁻)\n(Note: Molar conductance would be Λ_m° = 2λ_m°(Al³⁺) + 3λ_m°(SO₄²⁻), but for equivalent conductance it is strictly ΛAl³⁺ + ΛSO₄²⁻).\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the equivalent conductance at infinite dilution of magnesium chloride, MgCl₂, in terms of ionic equivalent conductances λ°_eq(Mg²⁺) and λ°_eq(Cl⁻)?",
      option_a: "λ°_eq(Mg²⁺) + λ°_eq(Cl⁻)",
      option_b: "λ°_eq(Mg²⁺) + 2 · λ°_eq(Cl⁻)",
      option_c: "(1/2) · λ°_eq(Mg²⁺) + λ°_eq(Cl⁻)",
      option_d: "2 · λ°_eq(Mg²⁺) + λ°_eq(Cl⁻)",
      correct_option: "A",
      explanation: "For equivalent conductance, stoichiometric multipliers are not used because equivalent conductances are already normalized on a per-equivalent basis:\nΛ°_eq(MgCl₂) = λ°_eq(Mg²⁺) + λ°_eq(Cl⁻).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1900,
    originalQuestion: {
      question: "The standard electrode potential for the Sn⁴⁺/Sn²⁺ couple is +0.15 V and that for the Cr³⁺/Cr couple is −0.74 V. These two couples in their standard states are connected to make a cell. The cell potential will be: [AIPMT 2011 Prelims]",
      option_a: "+1.19 V",
      option_b: "+0.89 V",
      option_c: "+0.18 V",
      option_d: "+1.83 V",
      correct_option: "B",
      explanation: "For a spontaneous galvanic cell, the half-cell with the more positive reduction potential acts as the cathode (reduction), while the half-cell with the more negative reduction potential acts as the anode (oxidation):\n- Cathode: Sn⁴⁺ + 2e⁻ → Sn²⁺, E°_cathode = +0.15 V\n- Anode: Cr → Cr³⁺ + 3e⁻, E°_anode = −0.74 V\nThe standard cell potential is:\nE°_cell = E°_cathode − E°_anode\nE°_cell = +0.15 V − (−0.74 V) = 0.15 + 0.74 = +0.89 V\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the standard cell potential of a galvanic cell made by connecting a Ni²⁺/Ni half-cell (E° = −0.25 V) and an Ag⁺/Ag half-cell (E° = +0.80 V)?",
      option_a: "+1.05 V",
      option_b: "+0.55 V",
      option_c: "−1.05 V",
      option_d: "+1.35 V",
      correct_option: "A",
      explanation: "Cathode is Ag⁺/Ag (+0.80 V) and anode is Ni²⁺/Ni (−0.25 V).\nE°_cell = E°_cathode − E°_anode = 0.80 − (−0.25) = +1.05 V.\nTherefore, Option (A) is the correct answer."
    }
  }
];

