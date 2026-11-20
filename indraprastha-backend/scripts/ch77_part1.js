// ch77_part1.js
// Questions 0 to 29 (IDs 770 to 741)
// Chapter 77: Thermodynamics (Physics)

module.exports = [
  {
    id: 770,
    originalQuestion: {
      question: "To find the degree of freedom (f), the expression is: [AIPMT 2000]",
      option_a: "f = 2 / (γ - 1)",
      option_b: "f = (γ + 1) / 2",
      option_c: "f = 2 / (γ + 1)",
      option_d: "f = 1 / (γ + 1)",
      correct_option: "A",
      explanation: "Step 1: The ratio of specific heats of an ideal gas (γ) is related to its degrees of freedom (f) by the relation:\nγ = C_p / C_v = 1 + (2 / f)\n\nStep 2: Rearranging to express f in terms of γ:\nγ - 1 = 2 / f\n\nStep 3: Inverting both sides:\nf = 2 / (γ - 1)\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For an ideal gas with ratio of specific heats γ = 1.4, the total number of degrees of freedom f of each molecule is:",
      option_a: "5",
      option_b: "3",
      option_c: "6",
      option_d: "7",
      correct_option: "A",
      explanation: "Step 1: Using the relation f = 2 / (γ - 1):\nStep 2: For γ = 1.4 = 7/5:\nf = 2 / (1.4 - 1) = 2 / 0.4 = 5\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 769,
    originalQuestion: {
      question: "The efficiency (W / Q) of a Carnot engine is 1/6. If the temperature of the sink is reduced by 62°C, this ratio becomes twice its original value. The initial temperatures of the sink and source, respectively, are: [AIPMT 2000]",
      option_a: "33°C, 67°C",
      option_b: "37°C, 99°C",
      option_c: "67°C, 33°C",
      option_d: "97 K, 37 K",
      correct_option: "B",
      explanation: "Step 1: The efficiency of a Carnot engine is given by:\nη = 1 - (T_sink / T_source)\n\nStep 2: In the initial state:\n1/6 = 1 - (T₂ / T₁)  ⇒  T₂ / T₁ = 5/6  ⇒  T₂ = (5/6) T₁\n\nStep 3: When the sink temperature is reduced by 62°C (or 62 K), the efficiency doubles:\nη' = 2 × (1/6) = 1/3\n1/3 = 1 - [(T₂ - 62) / T₁]\n(T₂ - 62) / T₁ = 2/3\n\nStep 4: Substitute T₂ = (5/6) T₁:\n[(5/6) T₁ - 62] / T₁ = 2/3\n5/6 - (62 / T₁) = 2/3\n62 / T₁ = 5/6 - 2/3 = 1/6  ⇒  T₁ = 62 × 6 = 372 K\n\nStep 5: Calculate T₂:\nT₂ = (5/6) × 372 = 310 K\n\nStep 6: Convert temperatures to Celsius:\nT_source = 372 - 273 = 99°C\nT_sink = 310 - 273 = 37°C\nThus, initial temperatures of sink and source are 37°C and 99°C respectively.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine has an efficiency of 1/4. When the sink temperature is lowered by 50 K, its efficiency becomes 1/2. What is the source temperature?",
      option_a: "200 K",
      option_b: "300 K",
      option_c: "400 K",
      option_d: "250 K",
      correct_option: "A",
      explanation: "Step 1: Initial: 1 - T₂/T₁ = 1/4  ⇒  T₂/T₁ = 3/4.\nStep 2: New: 1 - (T₂ - 50)/T₁ = 1/2  ⇒  (T₂ - 50)/T₁ = 1/2.\nStep 3: Subtracting the two: 50 / T₁ = 3/4 - 1/2 = 1/4  ⇒  T₁ = 200 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 768,
    originalQuestion: {
      question: "A scientist says that the efficiency of his heat engine working at source temperature 127°C and sink temperature 27°C is 26%. Then: [AIPMT 2001]",
      option_a: "It is impossible.",
      option_b: "It is possible but less probable.",
      option_c: "It is quite probable.",
      option_d: "Data are incomplete.",
      correct_option: "A",
      explanation: "Step 1: Convert temperatures to Kelvin:\nT_source = 127 + 273 = 400 K\nT_sink = 27 + 273 = 300 K\n\nStep 2: According to Carnot's theorem, no engine working between two given heat reservoirs can have an efficiency greater than a reversible Carnot engine:\nη_max = 1 - (T_sink / T_source) = 1 - (300 / 400) = 100 / 400 = 0.25 = 25%\n\nStep 3: Since the claimed efficiency (26%) exceeds the maximum theoretical Carnot efficiency (25%), it violates the Second Law of Thermodynamics.\n\nStep 4: Therefore, such an engine is impossible.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "An inventor claims to have constructed an engine that consumes 1000 J of heat from a hot reservoir at 500 K and rejects 600 J to a cold sink at 300 K. According to the Second Law of Thermodynamics, this engine is:",
      option_a: "Reversible (Carnot engine)",
      option_b: "Impossible",
      option_c: "Irreversible (Real engine)",
      option_d: "Perpetual motion machine of the first kind",
      correct_option: "A",
      explanation: "Step 1: Actual efficiency: η = W / Q_h = (1000 - 600) / 1000 = 400 / 1000 = 0.40 = 40%.\nStep 2: Carnot efficiency: η_Carnot = 1 - (300 / 500) = 200 / 500 = 0.40 = 40%.\nStep 3: Since actual efficiency equals Carnot efficiency, the engine is ideal and reversible.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 767,
    originalQuestion: {
      question: "The efficiency of a Carnot engine is 50% and the temperature of the sink is 500 K. If the temperature of the source is kept constant and its efficiency is raised to 60%, the required temperature of the sink will be: [AIPMT 2002]",
      option_a: "100 K",
      option_b: "600 K",
      option_c: "400 K",
      option_d: "500 K",
      correct_option: "C",
      explanation: "Step 1: In the first condition, η = 50% = 0.5 and T_sink = 500 K:\nη = 1 - (T_sink / T_source)\n0.5 = 1 - (500 / T_source)\n500 / T_source = 0.5  ⇒  T_source = 500 / 0.5 = 1000 K\n\nStep 2: In the second condition, efficiency is raised to η' = 60% = 0.6 while T_source remains 1000 K:\nη' = 1 - (T'_sink / T_source)\n0.6 = 1 - (T'_sink / 1000)\nT'_sink / 1000 = 0.4  ⇒  T'_sink = 0.4 × 1000 = 400 K\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine has an efficiency of 40% when its sink is at 300 K. To increase its efficiency to 50% keeping the source temperature constant, the sink temperature should be changed to:",
      option_a: "250 K",
      option_b: "200 K",
      option_c: "275 K",
      option_d: "225 K",
      correct_option: "A",
      explanation: "Step 1: Source temperature: 0.4 = 1 - 300 / T_h  ⇒  300 / T_h = 0.6  ⇒  T_h = 500 K.\nStep 2: New sink temperature for 50% efficiency:\n0.5 = 1 - T'_c / 500  ⇒  T'_c / 500 = 0.5  ⇒  T'_c = 250 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 766,
    originalQuestion: {
      question: "An ideal gas heat engine operates in a Carnot cycle between 227°C and 127°C. It absorbs 6 kcal at the higher temperature. The amount of heat converted into work, in kcal, is: [AIPMT 2003]",
      option_a: "4.8",
      option_b: "3.5",
      option_c: "1.6",
      option_d: "1.2",
      correct_option: "D",
      explanation: "Step 1: Convert temperatures to Kelvin:\nT_source = 227 + 273 = 500 K\nT_sink = 127 + 273 = 400 K\n\nStep 2: The efficiency of the Carnot engine is:\nη = 1 - (T_sink / T_source) = 1 - (400 / 500) = 100 / 500 = 0.2\n\nStep 3: The heat absorbed at the higher temperature is Q₁ = 6 kcal.\nThe work done (heat converted into work) is:\nW = η × Q₁ = 0.2 × 6 kcal = 1.2 kcal\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine operating between 600 K and 300 K absorbs 800 J of heat from the reservoir. How much work is performed by the engine per cycle?",
      option_a: "400 J",
      option_b: "600 J",
      option_c: "200 J",
      option_d: "500 J",
      correct_option: "A",
      explanation: "Step 1: Efficiency η = 1 - (300 / 600) = 1 - 0.5 = 0.50.\nStep 2: Work done W = η × Q_h = 0.50 × 800 J = 400 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 765,
    originalQuestion: {
      question: "One mole of an ideal gas at an initial temperature of T K does 6R joule of work adiabatically. If the ratio of specific heats C_p / C_v is 5/3, the final temperature of the gas will be: [AIPMT 2004]",
      option_a: "(T + 2.4) K",
      option_b: "(T - 2.4) K",
      option_c: "(T + 4) K",
      option_d: "(T - 4) K",
      correct_option: "D",
      explanation: "Step 1: For an adiabatic process, heat exchange Q = 0. From the First Law of Thermodynamics:\nΔU = -W\n\nStep 2: The change in internal energy of n moles of an ideal gas is:\nΔU = n C_v (T_f - T_i)\nGiven n = 1 mole and C_p / C_v = γ = 5/3:\nC_v = R / (γ - 1) = R / (5/3 - 1) = R / (2/3) = (3/2) R\n\nStep 3: The work done by the gas is W = 6R J:\nΔU = 1 × (3/2) R (T_f - T) = -6R\n(3/2) (T_f - T) = -6\nT_f - T = -6 × (2/3) = -4\nT_f = (T - 4) K\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "One mole of a diatomic gas (γ = 7/5) initially at 300 K does 5R joules of work during an adiabatic expansion. What is its final temperature?",
      option_a: "298 K",
      option_b: "295 K",
      option_c: "290 K",
      option_d: "302 K",
      correct_option: "A",
      explanation: "Step 1: C_v = R / (γ - 1) = R / (7/5 - 1) = (5/2) R.\nStep 2: W = -ΔU = -n C_v (T_f - T_i) = -(5/2) R (T_f - 300) = 5R.\nStep 3: -(5/2) (T_f - 300) = 5  ⇒  T_f - 300 = -2  ⇒  T_f = 298 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 764,
    originalQuestion: {
      question: "The equation of state for 5 g of oxygen at pressure P and temperature T, when occupying a volume V, will be (where R is the gas constant): [AIPMT 2004]",
      option_a: "PV = (5/32) RT",
      option_b: "PV = 5 RT",
      option_c: "PV = (5/2) RT",
      option_d: "PV = (5/16) RT",
      correct_option: "A",
      explanation: "Step 1: The ideal gas equation of state is:\nPV = n RT\nwhere n is the number of moles of the gas.\n\nStep 2: Number of moles n is given by:\nn = Mass (m) / Molar mass (M)\n\nStep 3: For oxygen gas (O₂), the molecular molar mass is M = 32 g/mol.\nGiven mass m = 5 g:\nn = 5 / 32 moles\n\nStep 4: Substituting into the ideal gas equation:\nPV = (5/32) RT\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the equation of state for 11 g of carbon dioxide (CO₂) gas occupying a volume V at pressure P and temperature T?",
      option_a: "PV = (1/4) RT",
      option_b: "PV = (1/2) RT",
      option_c: "PV = 11 RT",
      option_d: "PV = (1/8) RT",
      correct_option: "A",
      explanation: "Step 1: Molecular mass of CO₂ = 12 + 2(16) = 44 g/mol.\nStep 2: Number of moles n = 11 / 44 = 1/4 mole.\nStep 3: Equation of state: PV = n RT = (1/4) RT.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 763,
    originalQuestion: {
      question: "Which of the following processes is reversible? [AIPMT 2005]",
      option_a: "Transfer of heat by conduction",
      option_b: "Transfer of heat by radiation",
      option_c: "Isothermal compression",
      option_d: "Electrical heating of a nichrome wire",
      correct_option: "C",
      explanation: "Step 1: A thermodynamic process is reversible if it can be retraced in the reverse order without leaving any net change in the system or surroundings.\n\nStep 2: Heat conduction and radiation involve heat transfer across finite temperature differences, making them inherently irreversible according to the Second Law of Thermodynamics.\n\nStep 3: Electrical heating of a wire involves Joule dissipation (I²Rt), which is a non-equilibrium, dissipative irreversible process (heat cannot spontaneously convert back into electric current).\n\nStep 4: Quasi-static, frictionless isothermal compression carried out infinitely slowly in perfect thermal contact with a heat reservoir is a classic example of a reversible process.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following thermodynamic processes is an irreversible process?",
      option_a: "Free expansion of an ideal gas into vacuum",
      option_b: "Quasi-static adiabatic expansion",
      option_c: "Quasi-static isothermal expansion",
      option_d: "Slow reversible melting of ice at 0°C",
      correct_option: "A",
      explanation: "Step 1: Free expansion is an uncontrolled expansion against zero opposing pressure.\nStep 2: It is spontaneous, non-equilibrium, and generates entropy (ΔS_univ > 0), making it completely irreversible.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 762,
    originalQuestion: {
      question: "An ideal gas heat engine operates in a Carnot cycle between 227°C and 127°C. It absorbs 6 × 10⁴ cal of heat at the higher temperature. The amount of heat converted to work is: [AIPMT 2005]",
      option_a: "4.8 × 10⁴ cal",
      option_b: "6 × 10⁴ cal",
      option_c: "2.4 × 10⁴ cal",
      option_d: "1.2 × 10⁴ cal",
      correct_option: "D",
      explanation: "Step 1: Convert reservoir temperatures to absolute scale:\nT_source = 227 + 273 = 500 K\nT_sink = 127 + 273 = 400 K\n\nStep 2: Efficiency of the Carnot engine is:\nη = 1 - (T_sink / T_source) = 1 - (400 / 500) = 100 / 500 = 0.20\n\nStep 3: Heat converted to work:\nW = η × Q_absorbed = 0.20 × (6 × 10⁴ cal) = 1.2 × 10⁴ cal\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine takes in 4 × 10⁴ J of heat at 500 K and rejects heat to a sink at 300 K. The mechanical work output per cycle is:",
      option_a: "1.6 × 10⁴ J",
      option_b: "2.4 × 10⁴ J",
      option_c: "0.8 × 10⁴ J",
      option_d: "2.0 × 10⁴ J",
      correct_option: "A",
      explanation: "Step 1: Carnot efficiency: η = 1 - 300 / 500 = 200 / 500 = 0.40.\nStep 2: Work done: W = 0.40 × (4 × 10⁴ J) = 1.6 × 10⁴ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 761,
    originalQuestion: {
      question: "The molar specific heat at constant pressure of an ideal gas is (7/2) R. The ratio of specific heat at constant pressure to that at constant volume is: [AIPMT 2006]",
      option_a: "9 / 7",
      option_b: "7 / 5",
      option_c: "8 / 7",
      option_d: "5 / 7",
      correct_option: "B",
      explanation: "Step 1: Mayer's formula for an ideal gas states:\nC_p - C_v = R\n\nStep 2: Given C_p = (7/2) R, we can solve for C_v:\nC_v = C_p - R = (7/2) R - R = (5/2) R\n\nStep 3: The ratio of specific heats (γ) is:\nγ = C_p / C_v = [(7/2) R] / [(5/2) R] = 7 / 5\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the molar heat capacity of an ideal gas at constant volume is C_v = (3/2) R, the ratio of its specific heats γ = C_p / C_v is:",
      option_a: "5 / 3",
      option_b: "7 / 5",
      option_c: "4 / 3",
      option_d: "3 / 2",
      correct_option: "A",
      explanation: "Step 1: C_p = C_v + R = (3/2) R + R = (5/2) R.\nStep 2: γ = C_p / C_v = [(5/2) R] / [(3/2) R] = 5 / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 760,
    originalQuestion: {
      question: "A Carnot engine whose sink is at 300 K has an efficiency of 40%. By how much should the temperature of the source be increased to increase its efficiency by 50% of the original efficiency? [AIPMT 2006]",
      option_a: "380 K",
      option_b: "275 K",
      option_c: "325 K",
      option_d: "250 K",
      correct_option: "D",
      explanation: "Step 1: Initial efficiency is η₁ = 40% = 0.4 and T_sink = 300 K:\nη₁ = 1 - (T_sink / T₁)  ⇒  0.4 = 1 - (300 / T₁)\n300 / T₁ = 0.6  ⇒  T₁ = 300 / 0.6 = 500 K\n\nStep 2: The efficiency is increased by 50% of the original efficiency:\nIncrease in efficiency = 50% of 40% = 0.50 × 0.40 = 0.20 (20%)\nNew efficiency: η₂ = 40% + 20% = 60% = 0.6\n\nStep 3: For new source temperature T₂ with same sink (300 K):\n0.6 = 1 - (300 / T₂)\n300 / T₂ = 0.4  ⇒  T₂ = 300 / 0.4 = 750 K\n\nStep 4: The required increase in the temperature of the source is:\nΔT = T₂ - T₁ = 750 K - 500 K = 250 K\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine with sink at 280 K has an efficiency of 30%. How much must the source temperature be raised to increase the efficiency to 50%?",
      option_a: "160 K",
      option_b: "200 K",
      option_c: "120 K",
      option_d: "140 K",
      correct_option: "A",
      explanation: "Step 1: Initial: 0.3 = 1 - 280 / T₁  ⇒  280 / T₁ = 0.7  ⇒  T₁ = 400 K.\nStep 2: Final: 0.5 = 1 - 280 / T₂  ⇒  280 / T₂ = 0.5  ⇒  T₂ = 560 K.\nStep 3: Increase: ΔT = 560 - 400 = 160 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 759,
    originalQuestion: {
      question: "An engine has an efficiency of 1/6. When the temperature of the sink is reduced by 62°C, its efficiency is doubled. The temperature of the source is: [AIPMT 2007]",
      option_a: "37°C",
      option_b: "62°C",
      option_c: "99°C",
      option_d: "124°C",
      correct_option: "C",
      explanation: "Step 1: Initial efficiency of the engine:\nη = 1 - (T₂ / T₁) = 1/6  ⇒  T₂ / T₁ = 5/6\n\nStep 2: When sink temperature is reduced by 62 K, efficiency doubles to 1/3:\n1 - [(T₂ - 62) / T₁] = 1/3  ⇒  (T₂ - 62) / T₁ = 2/3\n\nStep 3: Subtracting the second equation from the first:\n(T₂ / T₁) - [(T₂ - 62) / T₁] = 5/6 - 2/3\n62 / T₁ = 1/6  ⇒  T₁ = 62 × 6 = 372 K\n\nStep 4: Convert source temperature T₁ to Celsius:\nT₁ = 372 - 273 = 99°C\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine has efficiency 20%. When the sink temperature is decreased by 50°C, its efficiency becomes 40%. The temperature of the source is:",
      option_a: "250 K",
      option_b: "300 K",
      option_c: "350 K",
      option_d: "200 K",
      correct_option: "A",
      explanation: "Step 1: T₂/T₁ = 1 - 0.2 = 0.8.\nStep 2: (T₂ - 50)/T₁ = 1 - 0.4 = 0.6.\nStep 3: 50 / T₁ = 0.8 - 0.6 = 0.2  ⇒  T₁ = 50 / 0.2 = 250 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 758,
    originalQuestion: {
      question: "If Q, E and W denote respectively the heat added, change in internal energy and work done in a closed cyclic process, then: [AIPMT 2008]",
      option_a: "E = 0",
      option_b: "Q = 0",
      option_c: "W = 0",
      option_d: "Q = W = 0",
      correct_option: "A",
      explanation: "Step 1: Internal energy (E) is a state function that depends solely on the thermodynamic state (P, V, T) of the system.\n\nStep 2: In any closed cyclic process, the system returns to its original initial state at the end of the cycle.\n\nStep 3: Therefore, the net change in internal energy over a complete cycle is identically zero:\nΔE = E_final - E_initial = 0\n\nStep 4: By the First Law of Thermodynamics (Q = ΔE + W), for a cycle Q = W, which in general is not zero.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For an ideal gas undergoing a cyclic thermodynamic process, which of the following properties must have a net change of zero?",
      option_a: "Internal energy and entropy",
      option_b: "Work done and heat absorbed",
      option_c: "Work done only",
      option_d: "Heat absorbed only",
      correct_option: "A",
      explanation: "Step 1: Both internal energy (U) and entropy (S) are state functions.\nStep 2: For any cyclic process returning to the initial state, the cyclic integral of any state function is zero (∮ dU = 0 and ∮ dS = 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 757,
    originalQuestion: {
      question: "At 10°C, the value of the density of a fixed mass of an ideal gas divided by its pressure is x. At 110°C, this ratio is: [AIPMT 2008]",
      option_a: "(10 / 110) x",
      option_b: "(283 / 383) x",
      option_c: "(383 / 283) x",
      option_d: "x",
      correct_option: "B",
      explanation: "Step 1: The ideal gas equation in terms of density ρ is:\nPM = ρ R T  ⇒  ρ / P = M / (R T)\nwhere M is the molar mass of the gas and R is the universal gas constant.\n\nStep 2: For a given gas, M and R are constants. Therefore:\n(ρ / P) ∝ 1 / T (where T is absolute temperature in Kelvin)\n\nStep 3: At T₁ = 10°C = 10 + 273 = 283 K:\n(ρ / P)₁ = x\n\nStep 4: At T₂ = 110°C = 110 + 273 = 383 K:\n(ρ / P)₂ / (ρ / P)₁ = T₁ / T₂ = 283 / 383\n(ρ / P)₂ = (283 / 383) x\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The ratio of density to pressure for an ideal gas at 27°C is y. What is this ratio at 127°C?",
      option_a: "(3 / 4) y",
      option_b: "(4 / 3) y",
      option_c: "(27 / 127) y",
      option_d: "y",
      correct_option: "A",
      explanation: "Step 1: ρ / P ∝ 1 / T.\nStep 2: T₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K.\nStep 3: Ratio = T₁ / T₂ = 300 / 400 = 3 / 4, so the new ratio is (3/4) y.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 756,
    originalQuestion: {
      question: "In thermodynamic processes, which of the following statements is not true? [AIPMT 2009]",
      option_a: "In an isochoric process, pressure remains constant.",
      option_b: "In an isothermal process, temperature remains constant.",
      option_c: "In an adiabatic process, PV^γ = constant.",
      option_d: "In an adiabatic process, the system is insulated from the surroundings.",
      correct_option: "A",
      explanation: "Step 1: An isochoric (or isometric) process is defined as a thermodynamic process in which the volume of the system remains constant (V = constant, dV = 0).\n\nStep 2: A process in which pressure remains constant (P = constant) is called an isobaric process.\n\nStep 3: Therefore, the statement \"In an isochoric process, pressure remains constant\" is false (not true).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following statements correctly identifies the thermodynamic process?",
      option_a: "In an isobaric process, pressure remains constant throughout",
      option_b: "In an isochoric process, work done is non-zero",
      option_c: "In an isothermal process, internal energy always changes",
      option_d: "In an adiabatic process, heat exchange Q is non-zero",
      correct_option: "A",
      explanation: "Step 1: An isobaric process is by definition a constant pressure process (P = constant).\nStep 2: In an isochoric process, W = ∫ P dV = 0.\nStep 3: In an isothermal process for an ideal gas, ΔU = 0.\nStep 4: In an adiabatic process, Q = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 755,
    originalQuestion: {
      question: "The internal energy change in a system that has absorbed 2 kcal of heat and done 500 J of work is: [AIPMT 2009]",
      option_a: "6400 J",
      option_b: "5400 J",
      option_c: "7900 J",
      option_d: "8900 J",
      correct_option: "C",
      explanation: "Step 1: Convert heat absorbed into Joules:\nQ = 2 kcal = 2000 cal\nTaking 1 cal = 4.2 J:\nQ = 2000 × 4.2 = 8400 J\n\nStep 2: Work done by the system is:\nW = 500 J\n\nStep 3: Using the First Law of Thermodynamics:\nΔU = Q - W\nΔU = 8400 J - 500 J = 7900 J\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A system absorbs 1 kcal of heat and performs 700 J of work on the surroundings. The change in internal energy of the system is: (Take 1 cal = 4.2 J)",
      option_a: "3500 J",
      option_b: "4900 J",
      option_c: "4200 J",
      option_d: "3000 J",
      correct_option: "A",
      explanation: "Step 1: Q = 1000 × 4.2 = 4200 J.\nStep 2: ΔU = Q - W = 4200 - 700 = 3500 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 754,
    originalQuestion: {
      question: "If ΔU and ΔW represent the increase in internal energy and work done by the system, respectively, in a thermodynamic process, which of the following is true? [AIPMT 2010 Prelims]",
      option_a: "ΔU = -ΔW, in an adiabatic process",
      option_b: "ΔU = ΔW, in an isothermal process",
      option_c: "ΔU = ΔW, in an adiabatic process",
      option_d: "ΔU = -ΔW, in an isothermal process",
      correct_option: "A",
      explanation: "Step 1: The First Law of Thermodynamics is stated as:\nΔQ = ΔU + ΔW\n\nStep 2: For an adiabatic process, there is no heat transfer between the system and its surroundings:\nΔQ = 0\n\nStep 3: Substituting ΔQ = 0 into the first law equation:\n0 = ΔU + ΔW  ⇒  ΔU = -ΔW\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In an adiabatic expansion of an ideal gas, the work done by the gas is 100 J. The change in internal energy ΔU of the gas is:",
      option_a: "-100 J",
      option_b: "+100 J",
      option_c: "0 J",
      option_d: "+50 J",
      correct_option: "A",
      explanation: "Step 1: In an adiabatic process, ΔQ = 0.\nStep 2: ΔU = -W = -100 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 753,
    originalQuestion: {
      question: "A monatomic gas at pressure P₁ and volume V₁ is compressed adiabatically to 1/8 of its original volume. What is the final pressure of the gas? [AIPMT 2010 Mains]",
      option_a: "64 P₁",
      option_b: "P₁",
      option_c: "16 P₁",
      option_d: "32 P₁",
      correct_option: "D",
      explanation: "Step 1: For an adiabatic process of an ideal gas:\nP V^γ = constant  ⇒  P₁ V₁^γ = P₂ V₂^γ\n\nStep 2: For a monatomic ideal gas:\nγ = 5/3\n\nStep 3: The volume is compressed to V₂ = V₁ / 8:\nP₂ = P₁ × (V₁ / V₂)^γ = P₁ × (8)^(5/3)\n\nStep 4: Evaluating (8)^(5/3):\n8^(5/3) = (2³)^(5/3) = 2⁵ = 32\n\nStep 5: Therefore:\nP₂ = 32 P₁\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A monatomic gas (γ = 5/3) at an initial volume V and pressure P is adiabatically compressed to V / 27. The final pressure is:",
      option_a: "243 P",
      option_b: "81 P",
      option_c: "27 P",
      option_d: "729 P",
      correct_option: "A",
      explanation: "Step 1: P₂ = P₁ (V₁ / V₂)^γ = P (27)^(5/3).\nStep 2: 27^(5/3) = (3³)^(5/3) = 3⁵ = 243.\nStep 3: P₂ = 243 P.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 752,
    originalQuestion: {
      question: "If c_p and c_v denote the specific heats per unit mass of an ideal gas of molecular weight M, then: [AIPMT 2010 Mains]",
      option_a: "c_p - c_v = R / M²",
      option_b: "c_p - c_v = R",
      option_c: "c_p - c_v = R / M",
      option_d: "c_p - c_v = M R",
      correct_option: "C",
      explanation: "Step 1: Mayer's relation for molar specific heat capacities C_p and C_v is:\nC_p - C_v = R\nwhere R is the universal gas constant.\n\nStep 2: The molar specific heat capacity is related to the specific heat per unit mass (principal specific heat) by:\nC_p = M c_p  and  C_v = M c_v\n\nStep 3: Substituting these into Mayer's relation:\nM c_p - M c_v = R\nM (c_p - c_v) = R\nc_p - c_v = R / M\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For oxygen gas of molar mass 32 g/mol, the difference between principal specific heats c_p - c_v in terms of the universal gas constant R is:",
      option_a: "R / 32",
      option_b: "32 R",
      option_c: "R / 16",
      option_d: "R",
      correct_option: "A",
      explanation: "Step 1: Formula: c_p - c_v = R / M.\nStep 2: For oxygen gas, M = 32 g/mol:\nc_p - c_v = R / 32.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 751,
    originalQuestion: {
      question: "When 1 kg of ice at 0°C melts to water at 0°C, the resulting change in its entropy, taking the latent heat of ice to be 80 cal/g, is: [AIPMT 2011 Prelims]",
      option_a: "273 cal/K",
      option_b: "8 × 10⁴ cal/K",
      option_c: "80 cal/K",
      option_d: "293 cal/K",
      correct_option: "D",
      explanation: "Step 1: The change in entropy for a phase transition at constant absolute temperature T is:\nΔS = Q / T\n\nStep 2: Total heat required to melt 1 kg = 1000 g of ice is:\nQ = m L_f = 1000 g × 80 cal/g = 8 × 10⁴ cal = 80000 cal\n\nStep 3: The melting takes place at 0°C:\nT = 0 + 273 = 273 K\n\nStep 4: Evaluating the entropy change:\nΔS = 80000 cal / 273 K ≈ 293.04 cal/K ≈ 293 cal/K\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the change in entropy when 540 g of water at 100°C turns to steam at 100°C? (Latent heat of steam = 540 cal/g)",
      option_a: "781.8 cal/K",
      option_b: "291.6 cal/K",
      option_c: "540 cal/K",
      option_d: "1000 cal/K",
      correct_option: "A",
      explanation: "Step 1: Q = m L_v = 540 × 540 = 291600 cal.\nStep 2: T = 100 + 273 = 373 K.\nStep 3: ΔS = 291600 / 373 ≈ 781.8 cal/K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 750,
    originalQuestion: {
      question: "During an isothermal expansion, a confined ideal gas does 150 J of work against its surroundings. This implies that: [AIPMT 2011 Prelims]",
      option_a: "150 J of heat has been removed from the gas.",
      option_b: "300 J of heat has been added to the gas.",
      option_c: "No heat is transferred because the process is isothermal.",
      option_d: "150 J of heat has been added to the gas.",
      correct_option: "D",
      explanation: "Step 1: In an isothermal process of an ideal gas, the temperature remains constant (ΔT = 0).\n\nStep 2: Since the internal energy of an ideal gas depends only on temperature, the change in internal energy is zero:\nΔU = 0\n\nStep 3: Applying the First Law of Thermodynamics:\nQ = ΔU + W\nQ = 0 + 150 J = +150 J\n\nStep 4: A positive value of Q indicates that 150 J of heat has been absorbed by (added to) the gas from the surroundings.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas undergoes an isothermal compression during which 250 J of work is done on the gas. Which statement is correct?",
      option_a: "250 J of heat is released by the gas to the surroundings",
      option_b: "250 J of heat is absorbed by the gas",
      option_c: "The internal energy of the gas increases by 250 J",
      option_d: "No heat exchange takes place",
      correct_option: "A",
      explanation: "Step 1: In isothermal process, ΔU = 0.\nStep 2: Work done by gas is W = -250 J.\nStep 3: Q = ΔU + W = -250 J, which means 250 J of heat is rejected/released to the surroundings.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 749,
    originalQuestion: {
      question: "A mass of diatomic gas (γ = 1.4) at a pressure of 2 atmospheres is compressed adiabatically so that its temperature rises from 27°C to 927°C. The pressure of the gas in the final state is: [AIPMT 2011 Mains]",
      option_a: "8 atm",
      option_b: "28 atm",
      option_c: "68.7 atm",
      option_d: "256 atm",
      correct_option: "D",
      explanation: "Step 1: The relation between pressure and temperature in an adiabatic process is:\nP^(1 - γ) T^γ = constant  ⇒  P₂ / P₁ = (T₂ / T₁)^[γ / (γ - 1)]\n\nStep 2: Convert temperatures to Kelvin:\nT₁ = 27 + 273 = 300 K\nT₂ = 927 + 273 = 1200 K\nT₂ / T₁ = 1200 / 300 = 4\n\nStep 3: Calculate the exponent for γ = 1.4 = 7/5:\nγ / (γ - 1) = 1.4 / (1.4 - 1) = 1.4 / 0.4 = 7/2 = 3.5\n\nStep 4: Calculate the final pressure P₂:\nP₂ = P₁ × (4)^(3.5) = P₁ × (4)^(7/2) = P₁ × (2⁷) = P₁ × 128\n\nStep 5: Given P₁ = 2 atm:\nP₂ = 2 × 128 = 256 atm\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas with γ = 1.5 at pressure 1 atm is adiabatically compressed until its absolute temperature is tripled. The final pressure of the gas is:",
      option_a: "27 atm",
      option_b: "9 atm",
      option_c: "81 atm",
      option_d: "18 atm",
      correct_option: "A",
      explanation: "Step 1: Exponent: γ / (γ - 1) = 1.5 / 0.5 = 3.\nStep 2: P₂ = P₁ (T₂ / T₁)³ = 1 × (3)³ = 27 atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 748,
    originalQuestion: {
      question: "A thermodynamic system is taken through the cycle ABCD as shown in the figure. Heat rejected by the gas during the cycle is: (The cycle is a rectangle ABCD in the anticlockwise direction, where P ranges from P to 2P and V ranges from V to 3V) [AIPMT 2012 Prelims]",
      option_a: "2PV",
      option_b: "4PV",
      option_c: "PV",
      option_d: "-PV",
      correct_option: "A",
      explanation: "Step 1: For a cyclic process, the net change in internal energy over the complete cycle is zero:\nΔU_cycle = 0\n\nStep 2: By the First Law of Thermodynamics:\nQ_net = W_net\n\nStep 3: The magnitude of work done in a rectangular cycle on a P-V diagram is the area enclosed by the rectangle:\nArea = (P_max - P_min) × (V_max - V_min)\nArea = (2P - P) × (3V - V) = P × (2V) = 2PV\n\nStep 4: Since the cycle is traced in the anticlockwise direction, the net work done is negative:\nW_net = -2PV\nConsequently, Q_net = -2PV, which means heat is rejected by the gas.\nThe magnitude of heat rejected by the gas is 2PV.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A closed cyclic process traced in a clockwise direction on a P-V indicator diagram encloses an elliptical area of 500 J. What is the net heat absorbed by the system per cycle?",
      option_a: "500 J",
      option_b: "-500 J",
      option_c: "0 J",
      option_d: "1000 J",
      correct_option: "A",
      explanation: "Step 1: In a cyclic process, ΔU = 0  ⇒  Q_net = W_net.\nStep 2: For a clockwise cycle, work done is positive: W_net = +500 J.\nStep 3: Hence, net heat absorbed Q_net = +500 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 747,
    originalQuestion: {
      question: "An ideal gas goes from state A to state B via three different processes as indicated in the P-V diagram. If Q₁, Q₂, Q₃ indicate the heat absorbed by the gas along the three processes and ΔU₁, ΔU₂, ΔU₃ indicate the change in internal energy along the three processes, respectively, then: [AIPMT 2012 Mains]",
      option_a: "Q₁ > Q₂ > Q₃ and ΔU₁ = ΔU₂ = ΔU₃",
      option_b: "Q₃ > Q₂ > Q₁ and ΔU₁ = ΔU₂ = ΔU₃",
      option_c: "Q₁ = Q₂ = Q₃ and ΔU₁ > ΔU₂ > ΔU₃",
      option_d: "Q₃ = Q₂ = Q₁ and ΔU₁ > ΔU₂ > ΔU₃",
      correct_option: "A",
      explanation: "Step 1: Internal energy U is a state function that depends solely on the initial and final states of the gas.\nBecause all three processes start at state A and terminate at state B:\nΔU₁ = ΔU₂ = ΔU₃\n\nStep 2: The work done W in each process equals the area under the corresponding curve on the P-V indicator diagram.\nFrom the diagram, the path of process 1 lies highest, followed by process 2, and process 3 lies lowest:\nW₁ > W₂ > W₃\n\nStep 3: According to the First Law of Thermodynamics, Q = ΔU + W.\nSince ΔU is identical for all three processes:\nQ₁ > Q₂ > Q₃\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas is taken from state X to state Y along two different paths 1 and 2. The heat absorbed along path 1 is Q₁ and along path 2 is Q₂. If the work done satisfies W₁ > W₂, what is the relation between Q₁ and Q₂?",
      option_a: "Q₁ > Q₂",
      option_b: "Q₁ < Q₂",
      option_c: "Q₁ = Q₂",
      option_d: "Cannot be determined",
      correct_option: "A",
      explanation: "Step 1: Since states X and Y are fixed, ΔU₁ = ΔU₂ = ΔU.\nStep 2: Q₁ = ΔU + W₁ and Q₂ = ΔU + W₂.\nStep 3: Since W₁ > W₂, Q₁ must be greater than Q₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 746,
    originalQuestion: {
      question: "The amount of heat energy required to raise the temperature of 1 g of helium at NTP from T₁ K to T₂ K is: [NEET 2013]",
      option_a: "(3/4) N_a k_B (T₂ - T₁)",
      option_b: "(3/4) N_a k_B (T₂ / T₁)",
      option_c: "(3/8) N_a k_B (T₂ - T₁)",
      option_d: "(3/2) N_a k_B (T₂ - T₁)",
      correct_option: "C",
      explanation: "Step 1: Helium is a monatomic gas with molar mass M = 4 g/mol.\nThe number of moles in 1 g of helium is:\nn = 1 / 4 mole\n\nStep 2: For a monatomic gas, the molar heat capacity at constant volume is:\nC_v = (3/2) R\nwhere R = N_a k_B.\n\nStep 3: The heat energy required to change the temperature from T₁ to T₂ at constant volume is:\nQ = n C_v (T₂ - T₁) = (1/4) × [(3/2) R] (T₂ - T₁)\nQ = (3/8) R (T₂ - T₁) = (3/8) N_a k_B (T₂ - T₁)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The heat energy required to raise the temperature of 2 g of Neon (monatomic, M = 20 g/mol) by ΔT at constant volume is:",
      option_a: "(3/20) N_a k_B ΔT",
      option_b: "(3/10) N_a k_B ΔT",
      option_c: "(3/40) N_a k_B ΔT",
      option_d: "(3/2) N_a k_B ΔT",
      correct_option: "A",
      explanation: "Step 1: Moles of Neon: n = 2 / 20 = 1/10 mol.\nStep 2: C_v = (3/2) R = (3/2) N_a k_B.\nStep 3: Q = n C_v ΔT = (1/10) × (3/2) N_a k_B ΔT = (3/20) N_a k_B ΔT.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 745,
    originalQuestion: {
      question: "During an adiabatic process, the pressure of a gas is found to be proportional to the cube of its temperature. The ratio C_p / C_v for the gas is: [NEET 2013]",
      option_a: "5 / 3",
      option_b: "3 / 2",
      option_c: "4 / 3",
      option_d: "2",
      correct_option: "B",
      explanation: "Step 1: For an adiabatic process, the standard relationship between pressure P and temperature T is:\nP^(1 - γ) T^γ = constant  ⇒  P ∝ T^[γ / (γ - 1)]\n\nStep 2: Given in the problem that P ∝ T³:\nγ / (γ - 1) = 3\n\nStep 3: Solve for γ:\nγ = 3(γ - 1)\nγ = 3γ - 3\n2γ = 3  ⇒  γ = 3 / 2\n\nStep 4: Therefore, the ratio of specific heats C_p / C_v is 3/2.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In an adiabatic process, the pressure of an ideal gas is found to be proportional to T⁴. What is the value of γ = C_p / C_v for this gas?",
      option_a: "4 / 3",
      option_b: "5 / 3",
      option_c: "7 / 5",
      option_d: "3 / 2",
      correct_option: "A",
      explanation: "Step 1: P ∝ T^[γ / (γ - 1)].\nStep 2: γ / (γ - 1) = 4  ⇒  γ = 4γ - 4  ⇒  3γ = 4  ⇒  γ = 4 / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 744,
    originalQuestion: {
      question: "A gas is taken through the cycle A → B → C → A, as shown. What is the net work done by the gas? (Right-angled triangle in the P-V graph with base along V of 5 × 10⁻³ m³ and height along P of 4 × 10⁵ Pa, traced in clockwise direction) [NEET 2013]",
      option_a: "Zero",
      option_b: "2000 J",
      option_c: "-2000 J",
      option_d: "1000 J",
      correct_option: "D",
      explanation: "Step 1: The net work done during a cyclic process shown on a P-V indicator diagram is equal to the area enclosed by the cycle.\n\nStep 2: The cycle forms a right-angled triangle with:\nBase = ΔV = (7 - 2) × 10⁻³ m³ = 5 × 10⁻³ m³\nHeight = ΔP = (6 - 2) × 10⁵ N/m² = 4 × 10⁵ N/m²\n\nStep 3: Calculating the area of the triangle:\nArea = (1/2) × Base × Height\nArea = (1/2) × (5 × 10⁻³ m³) × (4 × 10⁵ N/m²)\nArea = (1/2) × 20 × 10² = 10 × 100 = 1000 J\n\nStep 4: Since the cycle is traversed in the clockwise direction, the net work done by the gas is positive:\nW = +1000 J\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A triangular cycle ABC on a P-V diagram traced clockwise has vertices at (1 L, 100 kPa), (4 L, 100 kPa), and (1 L, 300 kPa). The work done by the gas per cycle is:",
      option_a: "300 J",
      option_b: "600 J",
      option_c: "150 J",
      option_d: "450 J",
      correct_option: "A",
      explanation: "Step 1: Base = 4 L - 1 L = 3 L = 3 × 10⁻³ m³.\nStep 2: Height = 300 kPa - 100 kPa = 200 kPa = 2 × 10⁵ Pa.\nStep 3: Work = (1/2) × (3 × 10⁻³) × (2 × 10⁵) = 300 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 743,
    originalQuestion: {
      question: "In the given V-T diagram, what is the relation between pressures P₁ and P₂? (Two isobars passing through the origin with isobar P₁ having a smaller slope dV/dT than isobar P₂) [NEET 2013]",
      option_a: "P₂ < P₁",
      option_b: "Cannot be predicted",
      option_c: "P₂ = P₁",
      option_d: "P₂ > P₁",
      correct_option: "A",
      explanation: "Step 1: According to the ideal gas law:\nPV = nRT  ⇒  V = (nR / P) T\n\nStep 2: On a V-T diagram, an isobar (process at constant pressure) is a straight line passing through the origin with slope:\nSlope = dV / dT = nR / P\n\nStep 3: This shows that the slope is inversely proportional to pressure:\nSlope ∝ 1 / P\n\nStep 4: Looking at the given graph, line 2 has a steeper slope than line 1:\nSlope₂ > Slope₁  ⇒  (nR / P₂) > (nR / P₁)  ⇒  P₂ < P₁\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In a P-T graph, two isochores corresponding to constant volumes V₁ and V₂ are straight lines passing through the origin. If line 1 has a greater slope than line 2, then:",
      option_a: "V₁ < V₂",
      option_b: "V₁ > V₂",
      option_c: "V₁ = V₂",
      option_d: "V₁ = 2 V₂",
      correct_option: "A",
      explanation: "Step 1: For an ideal gas: P = (nR / V) T.\nStep 2: Slope of P-T line = nR / V ∝ 1 / V.\nStep 3: Since Slope₁ > Slope₂, we have (1 / V₁) > (1 / V₂)  ⇒  V₁ < V₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 742,
    originalQuestion: {
      question: "In a vessel, the gas is at pressure P. If the mass of all the molecules is halved and their speed is doubled, then the resultant pressure will be: [NEET 2013 Karnataka]",
      option_a: "2P",
      option_b: "P",
      option_c: "P / 2",
      option_d: "4P",
      correct_option: "A",
      explanation: "Step 1: According to the kinetic theory of gases, the pressure exerted by an ideal gas is given by:\nP = (1/3) (N / V) m v_rms²\nwhere N is the number of molecules, V is the volume, m is the mass of each molecule, and v_rms is the root-mean-square speed.\n\nStep 2: Thus, pressure is directly proportional to m and the square of speed:\nP ∝ m v²\n\nStep 3: In the new state:\nm' = m / 2\nv' = 2v\n\nStep 4: The new pressure P' is:\nP' ∝ m' (v')² = (m / 2) (2v)² = (m / 2) (4v²) = 2 (m v²)\nP' = 2P\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the mass of each molecule of a gas is doubled and their rms speed is reduced to half, the new pressure of the gas at constant volume is:",
      option_a: "P / 2",
      option_b: "P",
      option_c: "2P",
      option_d: "P / 4",
      correct_option: "A",
      explanation: "Step 1: P ∝ m v².\nStep 2: P' ∝ (2m) (v / 2)² = (2m) (v² / 4) = (1/2) m v².\nStep 3: P' = P / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 741,
    originalQuestion: {
      question: "Two Carnot engines A and B are operated in series. Engine A receives heat from a source at temperature T₁ and rejects heat to a sink at temperature T. Engine B receives heat at temperature T and rejects heat to its sink at temperature T₂. For what value of T will the efficiencies of the two engines be equal? [NEET 2013 Karnataka]",
      option_a: "(T₁ - T₂) / 2",
      option_b: "T₁ T₂",
      option_c: "√(T₁ T₂)",
      option_d: "(T₁ + T₂) / 2",
      correct_option: "C",
      explanation: "Step 1: The efficiency of engine A working between T₁ and T is:\nη_A = 1 - (T / T₁)\n\nStep 2: The efficiency of engine B working between T and T₂ is:\nη_B = 1 - (T₂ / T)\n\nStep 3: Given that their efficiencies are equal (η_A = η_B):\n1 - (T / T₁) = 1 - (T₂ / T)\nT / T₁ = T₂ / T\n\nStep 4: Cross-multiplying:\nT² = T₁ T₂\nT = √(T₁ T₂)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two Carnot engines are operated in series such that the work outputs of both engines are equal. Engine 1 works between T₁ and T, while engine 2 works between T and T₂. The intermediate temperature T is:",
      option_a: "(T₁ + T₂) / 2",
      option_b: "√(T₁ T₂)",
      option_c: "(T₁ - T₂) / 2",
      option_d: "2 T₁ T₂ / (T₁ + T₂)",
      correct_option: "A",
      explanation: "Step 1: For equal work output W₁ = W₂:\nQ₁ (1 - T/T₁) = Q₂ (1 - T₂/T).\nStep 2: Since heat rejected by engine 1 equals heat received by engine 2, Q₁ (T/T₁) = Q₂.\nStep 3: This simplifies to: T₁ - T = T - T₂  ⇒  2T = T₁ + T₂  ⇒  T = (T₁ + T₂) / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

