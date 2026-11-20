module.exports = [
  {
    id: 1971,
    originalQuestion: {
      question: "For the reaction N₂O₅(g) → 2NO₂(g) + 1/2 O₂(g), the rate of disappearance of N₂O₅ is 6.25 × 10⁻³ mol L⁻¹ s⁻¹. The rates of formation of NO₂ and O₂, respectively, are: [AIPMT 2010 Prelims]",
      option_a: "6.25 × 10⁻³ mol L⁻¹ s⁻¹ and 6.25 × 10⁻³ mol L⁻¹ s⁻¹",
      option_b: "1.25 × 10⁻² mol L⁻¹ s⁻¹ and 3.125 × 10⁻³ mol L⁻¹ s⁻¹",
      option_c: "6.25 × 10⁻³ mol L⁻¹ s⁻¹ and 3.125 × 10⁻³ mol L⁻¹ s⁻¹",
      option_d: "1.25 × 10⁻² mol L⁻¹ s⁻¹ and 6.25 × 10⁻³ mol L⁻¹ s⁻¹",
      correct_option: "B",
      explanation: "From reaction stoichiometry:\nRate = −d[N₂O₅]/dt = (1/2) · (d[NO₂]/dt) = 2 · (d[O₂]/dt)\nGiven the rate of disappearance of N₂O₅ is −d[N₂O₅]/dt = 6.25 × 10⁻³ mol L⁻¹ s⁻¹:\n1. Rate of formation of NO₂:\nd[NO₂]/dt = 2 · (−d[N₂O₅]/dt) = 2 · (6.25 × 10⁻³) = 1.25 × 10⁻² mol L⁻¹ s⁻¹\n2. Rate of formation of O₂:\nd[O₂]/dt = (1/2) · (−d[N₂O₅]/dt) = (1/2) · (6.25 × 10⁻³) = 3.125 × 10⁻³ mol L⁻¹ s⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In the decomposition 2N₂O₅ → 4NO₂ + O₂, if the rate of formation of NO₂ is 4.8 × 10⁻³ mol L⁻¹ s⁻¹, what is the rate of disappearance of N₂O₅?",
      option_a: "2.4 × 10⁻³ mol L⁻¹ s⁻¹",
      option_b: "4.8 × 10⁻³ mol L⁻¹ s⁻¹",
      option_c: "9.6 × 10⁻³ mol L⁻¹ s⁻¹",
      option_d: "1.2 × 10⁻³ mol L⁻¹ s⁻¹",
      correct_option: "A",
      explanation: "From stoichiometry:\nRate = (1/2) · (−d[N₂O₅]/dt) = (1/4) · (d[NO₂]/dt)\n−d[N₂O₅]/dt = (2/4) · (d[NO₂]/dt) = (1/2) · (4.8 × 10⁻³) = 2.4 × 10⁻³ mol L⁻¹ s⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1970,
    originalQuestion: {
      question: "The rate of the reaction 2NO + Cl₂ → 2NOCl is given by the rate equation Rate = k[NO]²[Cl₂]. The value of the rate constant can be increased by: [AIPMT 2010 Mains]",
      option_a: "Increasing the temperature",
      option_b: "Increasing the concentration of NO",
      option_c: "Increasing the concentration of Cl₂",
      option_d: "Doing all of these",
      correct_option: "A",
      explanation: "The rate constant (k) of a chemical reaction is independent of the concentrations of reactants and products.\nAccording to the Arrhenius equation, k = A · e^(−Eₐ / RT), the magnitude of the rate constant depends only on temperature and the presence of a catalyst (which alters Eₐ).\nAn increase in temperature increases the thermal energy of the molecules, exponentially increasing the value of k.\nChanging the concentration of NO or Cl₂ alters the overall reaction rate, but leaves the rate constant k unchanged.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following factors will alter the numerical value of the specific rate constant k of a reaction?",
      option_a: "Changing the volume of the reaction vessel",
      option_b: "Changing the temperature",
      option_c: "Doubling the initial concentration of reactants",
      option_d: "Allowing the reaction to proceed for a longer time",
      correct_option: "B",
      explanation: "The rate constant k is a characteristic property of a reaction at a given temperature.\nIt is completely independent of reactant concentrations, container volume, or elapsed time, and changes only when temperature changes or a catalyst is added.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1969,
    originalQuestion: {
      question: "Which one of the following statements about the order of a reaction is incorrect? [AIPMT 2011 Prelims]",
      option_a: "Order can be determined only experimentally.",
      option_b: "Order is not influenced by the stoichiometric coefficient of the reactants.",
      option_c: "Order of a reaction is the sum of the powers of the concentration terms of reactants in the rate expression.",
      option_d: "Order of reaction is always a whole number.",
      correct_option: "D",
      explanation: "Let us examine the key properties of reaction order:\n- Order is an experimentally determined quantity; it cannot be inferred directly from a balanced chemical equation.\n- The order of a reaction can be zero, positive, negative, an integer, or fractional (e.g., the decomposition of acetaldehyde has an order of 1.5, and the formation of phosgene has an order of 2.5).\n- Hence, the statement that 'Order of reaction is always a whole number' is incorrect.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following statements regarding molecularity and order of a reaction is true?",
      option_a: "Molecularity can be zero, fractional, or negative",
      option_b: "Order can be zero, fractional, or negative, but molecularity must be a non-zero positive integer",
      option_c: "Both order and molecularity can be determined by balancing the overall chemical equation",
      option_d: "Order of a reaction can never be zero",
      correct_option: "B",
      explanation: "Molecularity represents the number of reacting species colliding simultaneously in an elementary step and must be a positive integer (1, 2, or 3).\nIn contrast, order is an empirical kinetic exponent that can be zero, fractional, integer, or negative.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1968,
    originalQuestion: {
      question: "The half-life of a substance in a certain enzyme-catalysed reaction is 138 s. The time required for the concentration of the substance to fall from 1.28 mg L⁻¹ to 0.04 mg L⁻¹ is: [AIPMT 2011 Mains]",
      option_a: "414 s",
      option_b: "552 s",
      option_c: "690 s",
      option_d: "276 s",
      correct_option: "C",
      explanation: "1. Calculate the fraction of substance remaining:\n[A] / [A]₀ = 0.04 / 1.28 = 4 / 128 = 1 / 32\n2. Express this fraction as powers of 1/2:\n1 / 32 = (1/2)⁵\nThis means that exactly 5 half-lives (n = 5) have elapsed.\n3. Calculate the total time required:\nt = n · t₁/₂ = 5 · 138 s = 690 s\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A first-order reaction has a half-life of 25 seconds. How long will it take for the concentration of the reactant to drop from 0.80 M to 0.05 M?",
      option_a: "75 s",
      option_b: "100 s",
      option_c: "125 s",
      option_d: "50 s",
      correct_option: "B",
      explanation: "The remaining fraction is:\n0.05 / 0.80 = 5 / 80 = 1 / 16 = (1/2)⁴\nThis corresponds to n = 4 half-lives.\nTotal time = 4 · 25 s = 100 s.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1967,
    originalQuestion: {
      question: "The unit of the rate constant for a zero-order reaction is: [AIPMT 2011 Mains]",
      option_a: "mol L⁻¹ s⁻¹",
      option_b: "L mol⁻¹ s⁻¹",
      option_c: "L² mol⁻² s⁻¹",
      option_d: "s⁻¹",
      correct_option: "A",
      explanation: "The general expression for the units of a rate constant for a reaction of order n is:\nUnits of k = (mol L⁻¹)¹⁻ⁿ · s⁻¹\nFor a zero-order reaction (n = 0):\nUnits of k = (mol L⁻¹)¹⁻⁰ · s⁻¹ = mol L⁻¹ s⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What are the units of the rate constant for a second-order reaction?",
      option_a: "mol L⁻¹ s⁻¹",
      option_b: "L mol⁻¹ s⁻¹",
      option_c: "s⁻¹",
      option_d: "L² mol⁻² s⁻¹",
      correct_option: "B",
      explanation: "Using the general formula Units of k = (mol L⁻¹)¹⁻ⁿ · s⁻¹ with n = 2:\nUnits = (mol L⁻¹)¹⁻² · s⁻¹ = (mol L⁻¹)⁻¹ · s⁻¹ = L mol⁻¹ s⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1966,
    originalQuestion: {
      question: "The rate of the reaction 2N₂O₅ → 4NO₂ + O₂ can be written in three ways: −d[N₂O₅]/dt = k[N₂O₅] d[NO₂]/dt = k′[N₂O₅] d[O₂]/dt = k″[N₂O₅] The relationship between k and k′, and between k and k″, is: [AIPMT 2011 Mains]",
      option_a: "k′ = 2k; k″ = k",
      option_b: "k′ = 2k; k″ = k/2",
      option_c: "k′ = 2k; k″ = 2k",
      option_d: "k′ = k; k″ = k",
      correct_option: "B",
      explanation: "From reaction stoichiometry, the rate of reaction is defined as:\nRate = −(1/2) · (d[N₂O₅]/dt) = (1/4) · (d[NO₂]/dt) = d[O₂]/dt\nSubstituting the given rate constant definitions:\nRate = (1/2) · k[N₂O₅] = (1/4) · k′[N₂O₅] = k″[N₂O₅]\nDividing throughout by [N₂O₅]:\nk/2 = k′/4 = k″\nFrom k/2 = k′/4:\nk′ = (4/2) · k = 2k\nFrom k/2 = k″:\nk″ = k/2\nThus, k′ = 2k and k″ = k/2.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 2A → 3B, if −d[A]/dt = k₁[A] and d[B]/dt = k₂[A], what is the relationship between k₁ and k₂?",
      option_a: "k₂ = 1.5 k₁",
      option_b: "k₂ = (2/3) k₁",
      option_c: "k₂ = k₁",
      option_d: "k₂ = 3 k₁",
      correct_option: "A",
      explanation: "Rate = (1/2) · (−d[A]/dt) = (1/3) · (d[B]/dt)\n(1/2) · k₁[A] = (1/3) · k₂[A]\nk₂ = (3/2) · k₁ = 1.5 k₁\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1965,
    originalQuestion: {
      question: "In a zero-order reaction, for every 10°C rise in temperature, the rate is doubled. If the temperature is increased from 10°C to 100°C, the rate of the reaction will become: [AIPMT 2012 Prelims]",
      option_a: "256 times",
      option_b: "512 times",
      option_c: "64 times",
      option_d: "128 times",
      correct_option: "B",
      explanation: "When temperature increases from T₁ = 10 °C to T₂ = 100 °C, the total rise in temperature is:\nΔT = 100 − 10 = 90 °C\nThe number of 10 °C increments is:\nn = ΔT / 10 = 90 / 10 = 9\nSince the rate doubles (temperature coefficient = 2) for every 10 °C rise:\nRate_final / Rate_initial = 2ⁿ = 2⁹ = 512 times\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If a reaction rate triples for every 10 °C rise in temperature, by what factor will the reaction rate increase when the temperature is raised from 20 °C to 50 °C?",
      option_a: "9 times",
      option_b: "27 times",
      option_c: "81 times",
      option_d: "18 times",
      correct_option: "B",
      explanation: "The temperature rise is ΔT = 50 − 20 = 30 °C, corresponding to n = 30 / 10 = 3 intervals.\nWith a temperature coefficient of 3, the rate increases by 3ⁿ = 3³ = 27 times.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1964,
    originalQuestion: {
      question: "In a reaction A + B → Product, the rate is doubled when the concentration of B is doubled, and the rate increases by a factor of 8 when the concentrations of both reactants A and B are doubled. The rate law for the reaction can be written as: [AIPMT 2012 Prelims]",
      option_a: "Rate = k[A][B]²",
      option_b: "Rate = k[A]²[B]²",
      option_c: "Rate = k[A][B]",
      option_d: "Rate = k[A]²[B]",
      correct_option: "D",
      explanation: "Let the rate law be Rate = k · [A]ˣ · [B]ʸ.\n1. When [B] is doubled keeping [A] constant, the rate doubles:\n2 = 2ʸ ⇒ y = 1 (first-order in B).\n2. When both [A] and [B] are doubled, the rate increases by a factor of 8:\n8 = (2)ˣ · (2)ʸ = 2ˣ · 2¹ = 2ˣ · 2\n2ˣ = 8 / 2 = 4 = 2² ⇒ x = 2 (second-order in A).\nCombining these gives Rate = k · [A]² · [B].\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction X + Y → Z, the rate quadruples when [X] is doubled at constant [Y], and the rate remains unchanged when [Y] is tripled at constant [X]. What is the rate law?",
      option_a: "Rate = k[X]²",
      option_b: "Rate = k[X][Y]",
      option_c: "Rate = k[X]²[Y]",
      option_d: "Rate = k[X]",
      correct_option: "A",
      explanation: "- Doubling [X] quadruples rate: 2ᵃ = 4 ⇒ a = 2.\n- Tripling [Y] does not change rate: 3ᵇ = 1 ⇒ b = 0.\nThus, the rate law is Rate = k[X]²[Y]⁰ = k[X]².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1963,
    originalQuestion: {
      question: "What is the activation energy for a reaction if its rate doubles when the temperature is raised from 20°C to 35°C? (R = 8.314 J mol⁻¹ K⁻¹) [NEET 2013]",
      option_a: "34.7 kJ mol⁻¹",
      option_b: "15.1 kJ mol⁻¹",
      option_c: "342 kJ mol⁻¹",
      option_d: "269 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Using the two-temperature Arrhenius equation:\nlog₁₀(k₂ / k₁) = (Eₐ / (2.303 · R)) · ((T₂ − T₁) / (T₁ · T₂))\nGiven:\nT₁ = 20 °C = 293 K\nT₂ = 35 °C = 308 K\nk₂ / k₁ = 2, so log₁₀(2) = 0.3010\nR = 8.314 J mol⁻¹ K⁻¹\nSubstituting the values:\n0.3010 = (Eₐ / (2.303 · 8.314)) · ((308 − 293) / (293 · 308))\n0.3010 = (Eₐ / 19.147) · (15 / 90244)\nEₐ = (0.3010 · 19.147 · 90244) / 15 ≈ 34705 J mol⁻¹ = 34.7 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If a reaction's rate constant doubles when the temperature is raised from 300 K to 310 K, what is its activation energy? (Given: log 2 = 0.3010, R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "53.6 kJ mol⁻¹",
      option_b: "107.2 kJ mol⁻¹",
      option_c: "26.8 kJ mol⁻¹",
      option_d: "43.2 kJ mol⁻¹",
      correct_option: "A",
      explanation: "log₁₀(k₂ / k₁) = (Eₐ / (2.303 · R)) · (ΔT / (T₁ · T₂))\n0.3010 = (Eₐ / (19.147)) · (10 / (300 · 310))\n0.3010 = (Eₐ / 19.147) · (10 / 93000)\nEₐ = (0.3010 · 19.147 · 93000) / 10 = 53600 J mol⁻¹ = 53.6 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1962,
    originalQuestion: {
      question: "A reaction is 50% complete in 2 hours and 75% complete in 4 hours. The order of reaction is: [NEET 2013 Karnataka]",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "0",
      correct_option: "A",
      explanation: "Let us examine the time relation:\n- 50% completion represents 1 half-life: t₅₀% = t₁/₂ = 2 hours.\n- 75% completion means the reactant concentration has fallen from [A]₀ to [A]₀/4, which corresponds to two successive half-lives (100% → 50% → 25% remaining).\nFor a first-order reaction:\nt₇₅% = 2 · t₅₀% = 2 · (2 hours) = 4 hours\nSince the given data shows that t₇₅% is exactly twice t₅₀% (4 hours = 2 × 2 hours), the half-life is constant and independent of concentration.\nThis is the hallmark of a first-order reaction.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a certain reaction, 50% reaction is completed in 30 minutes, and 87.5% reaction is completed in 90 minutes. What is the order of this reaction?",
      option_a: "First order",
      option_b: "Zero order",
      option_c: "Second order",
      option_d: "Third order",
      correct_option: "A",
      explanation: "87.5% completion leaves 12.5% (1/8 = (1/2)³) of the reactant, which corresponds to exactly 3 half-lives.\n3 · t₁/₂ = 3 · 30 min = 90 min, matching the given time.\nBecause the half-life is constant, the reaction is first order.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1961,
    originalQuestion: {
      question: "For a reaction between A and B, the order with respect to A is 2 and the order with respect to B is 3. If the concentrations of both A and B are doubled, the rate will increase by a factor of: [NEET 2013 Karnataka]",
      option_a: "12",
      option_b: "16",
      option_c: "32",
      option_d: "10",
      correct_option: "C",
      explanation: "The rate law is:\nRate₁ = k · [A]² · [B]³\nWhen the concentrations of both A and B are doubled:\n[A]′ = 2[A]\n[B]′ = 2[B]\nRate₂ = k · (2[A])² · (2[B])³ = k · 4[A]² · 8[B]³ = 32 · (k · [A]² · [B]³) = 32 · Rate₁\nThus, the rate increases by a factor of 32.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction Rate = k[A]³[B]¹, what factor does the rate increase by if the concentration of A is doubled and the concentration of B is halved?",
      option_a: "4",
      option_b: "8",
      option_c: "2",
      option_d: "16",
      correct_option: "A",
      explanation: "New Rate = k · (2[A])³ · ([B]/2) = k · 8[A]³ · (1/2)[B] = 4 · (k[A]³[B]) = 4 · Rate.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1960,
    originalQuestion: {
      question: "When the initial concentration of a reactant is doubled in a reaction, its half-life period is not affected. The order of the reaction is: [AIPMT 2015 Cancelled]",
      option_a: "Second order",
      option_b: "More than zero but less than first order",
      option_c: "Zero order",
      option_d: "First order",
      correct_option: "D",
      explanation: "The general relationship between the half-life (t₁/₂) and the initial concentration ([A]₀) for a reaction of order n is:\nt₁/₂ ∝ 1 / [A]₀ⁿ⁻¹\n- For zero order (n = 0): t₁/₂ ∝ [A]₀ (half-life doubles when concentration doubles).\n- For second order (n = 2): t₁/₂ ∝ 1 / [A]₀ (half-life is halved when concentration doubles).\n- For first order (n = 1): t₁/₂ ∝ 1 / [A]₀⁰ = [A]₀⁰ (half-life is completely independent of initial concentration).\nTherefore, the order of the reaction is first order.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If doubling the initial concentration of a reactant causes its half-life to be halved, what is the order of the reaction?",
      option_a: "Zero order",
      option_b: "First order",
      option_c: "Second order",
      option_d: "Third order",
      correct_option: "C",
      explanation: "For an n-th order reaction, t₁/₂ ∝ [A]₀¹⁻ⁿ.\nIf doubling [A]₀ halves t₁/₂, then 2¹⁻ⁿ = 1/2 = 2⁻¹.\n1 − n = −1 ⇒ n = 2 (second order).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1959,
    originalQuestion: {
      question: "The activation energy of a reaction can be determined from the slope of which of the following graphs? [AIPMT 2015 Cancelled]",
      option_a: "ln k versus 1/T",
      option_b: "T/ln k versus 1/T",
      option_c: "ln k versus T",
      option_d: "(ln k)/T versus T",
      correct_option: "A",
      explanation: "The Arrhenius equation in logarithmic form is:\nln k = ln A − (Eₐ / R) · (1/T)\nComparing this with the linear equation y = mx + c:\n- y = ln k\n- x = 1/T\n- Slope (m) = −Eₐ / R\n- Intercept (c) = ln A\nThus, a plot of ln k versus 1/T produces a straight line whose slope is −Eₐ / R, allowing direct determination of the activation energy as Eₐ = −R · (slope).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If a plot of ln k versus 1/T yields a straight line with a slope of −6000 K, what is the activation energy of the reaction? (R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "49.88 kJ mol⁻¹",
      option_b: "24.94 kJ mol⁻¹",
      option_c: "721 kJ mol⁻¹",
      option_d: "12.47 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Slope = −Eₐ / R = −6000 K\nEₐ = 6000 · R = 6000 · 8.314 = 49884 J mol⁻¹ = 49.88 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1958,
    originalQuestion: {
      question: "The rate constant of the reaction A → B is 0.6 × 10⁻³ mol L⁻¹ s⁻¹. If the concentration of A is 5 M, then the concentration of B after 20 minutes is: [AIPMT 2015]",
      option_a: "3.60 M",
      option_b: "0.36 M",
      option_c: "0.72 M",
      option_d: "1.08 M",
      correct_option: "C",
      explanation: "1. Identify the reaction order:\nThe units of the rate constant are mol L⁻¹ s⁻¹, which confirms that this is a zero-order reaction.\n2. For a zero-order reaction A → B:\n[B] = k · t\n3. Convert time to seconds:\nt = 20 minutes = 20 × 60 = 1200 s\n4. Calculate [B]:\n[B] = (0.6 × 10⁻³ mol L⁻¹ s⁻¹) × 1200 s = 0.72 mol L⁻¹ = 0.72 M\n(Since initial [A] = 5 M > 0.72 M, the reactant is not fully consumed).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For a zero-order reaction A → Product with k = 2.0 × 10⁻³ mol L⁻¹ s⁻¹, what concentration of product is formed after 5 minutes, starting with 2.0 M of A?",
      option_a: "0.60 M",
      option_b: "1.20 M",
      option_c: "0.30 M",
      option_d: "0.10 M",
      correct_option: "A",
      explanation: "For a zero-order reaction:\n[Product] = k · t = (2.0 × 10⁻³ mol L⁻¹ s⁻¹) · (5 × 60 s) = (2.0 × 10⁻³) · 300 = 0.60 M\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1957,
    originalQuestion: {
      question: "The addition of a catalyst during a chemical reaction alters which of the following quantities? [NEET 2016 Phase 1]",
      option_a: "Enthalpy",
      option_b: "Activation energy",
      option_c: "Entropy",
      option_d: "Internal energy",
      correct_option: "B",
      explanation: "A catalyst provides an alternative reaction pathway involving a different transition state with lower potential energy, thereby lowering the activation energy (Eₐ) of the reaction.\nBecause the initial state of the reactants and the final state of the products are unaffected by the catalyst, thermodynamic state functions such as enthalpy of reaction (ΔH), Gibbs free energy change (ΔG), entropy change (ΔS), and internal energy change (ΔU) remain completely unchanged.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following parameters of a chemical equilibrium is changed by the introduction of a positive catalyst?",
      option_a: "Equilibrium constant (K_eq)",
      option_b: "Equilibrium concentrations of reactants and products",
      option_c: "Time required to attain chemical equilibrium",
      option_d: "Standard free energy change (ΔG°)",
      correct_option: "C",
      explanation: "A catalyst speeds up both the forward and backward reactions equally without shifting the equilibrium position or altering K_eq or ΔG°.\nIt merely shortens the time required to reach the equilibrium state.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1956,
    originalQuestion: {
      question: "The rate of a first-order reaction is 0.04 mol L⁻¹ s⁻¹ at 10 seconds and 0.03 mol L⁻¹ s⁻¹ at 20 seconds after initiation of the reaction. The half-life period of the reaction is: [NEET 2016 Phase 1]",
      option_a: "44.1 s",
      option_b: "54.1 s",
      option_c: "24.1 s",
      option_d: "34.1 s",
      correct_option: "C",
      explanation: "For a first-order reaction, the reaction rate is directly proportional to reactant concentration:\nRate₁ = k · [A]₁ at t₁ = 10 s\nRate₂ = k · [A]₂ at t₂ = 20 s\nTherefore:\nRate₁ / Rate₂ = [A]₁ / [A]₂\nUsing the first-order integrated rate law between t₁ and t₂ (Δt = 20 − 10 = 10 s):\nk = (2.303 / Δt) · log₁₀(Rate₁ / Rate₂) = (2.303 / 10) · log₁₀(0.04 / 0.03) = 0.2303 · log₁₀(1.333)\nSince log₁₀(1.333) ≈ 0.1249:\nk = 0.2303 × 0.1249 ≈ 0.02877 s⁻¹\nNow, calculate the half-life period:\nt₁/₂ = 0.693 / k = 0.693 / 0.02877 ≈ 24.1 s\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In a first-order reaction, the rate is 0.08 mol L⁻¹ s⁻¹ at 15 s and 0.04 mol L⁻¹ s⁻¹ at 35 s. What is the half-life period of the reaction?",
      option_a: "20 s",
      option_b: "10 s",
      option_c: "40 s",
      option_d: "15 s",
      correct_option: "A",
      explanation: "The rate halves from 0.08 to 0.04 mol L⁻¹ s⁻¹ in an elapsed time of Δt = 35 − 15 = 20 s.\nBecause rate is directly proportional to concentration in a first-order reaction, the time taken for the rate to halve is identically equal to the half-life (t₁/₂ = 20 s).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1955,
    originalQuestion: {
      question: "The decomposition of phosphine (PH₃) on tungsten at low pressure is a first-order reaction. It is because the: [NEET 2016 Phase 2]",
      option_a: "Rate is proportional to the surface coverage",
      option_b: "Rate is inversely proportional to the surface coverage",
      option_c: "Rate is independent of the surface coverage",
      option_d: "Rate of decomposition is very slow",
      correct_option: "A",
      explanation: "Heterogeneous catalytic decomposition on a solid metal surface follows Langmuir adsorption kinetics:\nRate = (k · b · P) / (1 + b · P) = k · θ, where θ is the fractional surface coverage.\n- At very low pressures (P << 1), the term b · P in the denominator is much smaller than 1, so θ ≈ b · P (surface coverage is directly proportional to pressure/concentration of phosphine).\nConsequently, Rate = k · b · P (first order with respect to surface coverage and pressure).\n- At high pressures, the surface becomes completely saturated (θ ≈ 1), making the reaction zero order.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Why does the decomposition of ammonia gas on a heated platinum or tungsten surface become zero order at high gas pressures?",
      option_a: "The metal catalyst melts at high pressure",
      option_b: "The catalyst surface becomes completely saturated with ammonia molecules (surface coverage θ ≈ 1)",
      option_c: "Ammonia decomposes faster in the gas phase than on the metal surface",
      option_d: "Activation energy becomes negative",
      correct_option: "B",
      explanation: "At high pressures, all catalytic active sites on the metal surface are fully occupied by adsorbed ammonia molecules (complete surface coverage, θ = 1).\nFurther increasing the gas pressure cannot increase the amount of adsorbed reactant on the surface, making the rate independent of pressure (zero order).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1954,
    originalQuestion: {
      question: "A first-order reaction has a specific reaction rate of 10⁻² s⁻¹. How much time will it take for 20 g of the reactant to reduce to 5 g? [NEET 2017]",
      option_a: "138.6 s",
      option_b: "346.5 s",
      option_c: "693.0 s",
      option_d: "238.6 s",
      correct_option: "A",
      explanation: "1. For a first-order reaction, the half-life is:\nt₁/₂ = 0.693 / k = 0.693 / 10⁻² = 69.3 s\n2. The reduction of reactant mass from 20 g to 5 g proceeds as:\n20 g → 10 g (after 1 half-life)\n10 g → 5 g (after 2 half-lives)\nThus, exactly 2 half-lives are required:\nt = 2 · t₁/₂ = 2 · 69.3 s = 138.6 s\n(Or using t = (2.303 / 10⁻²) · log₁₀(20 / 5) = 230.3 · log₁₀(4) = 230.3 · 0.6020 = 138.6 s).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A first-order reaction has a rate constant of 2.0 × 10⁻² s⁻¹. How much time will it take for the concentration of reactant to decrease from 80 g to 10 g?",
      option_a: "103.95 s",
      option_b: "69.3 s",
      option_c: "138.6 s",
      option_d: "34.65 s",
      correct_option: "A",
      explanation: "Reducing 80 g to 10 g involves:\n80 g → 40 g → 20 g → 10 g (3 half-lives).\nt₁/₂ = 0.693 / (2.0 × 10⁻²) = 34.65 s.\nTotal time = 3 · 34.65 s = 103.95 s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1953,
    originalQuestion: {
      question: "The mechanism of a hypothetical reaction X₂ + Y₂ → 2XY is given below: (i) X₂ ⇌ X + X (fast) (ii) X + Y₂ → XY + Y (slow) (iii) X + Y → XY (fast) The overall order of the reaction will be: [NEET 2017]",
      option_a: "2",
      option_b: "0",
      option_c: "1.5",
      option_d: "1",
      correct_option: "C",
      explanation: "1. The rate of the overall reaction is determined by the slowest step (Step ii):\nRate = k₂ · [X] · [Y₂]\n2. Step (i) is a fast pre-equilibrium:\nK_eq = [X]² / [X₂] ⇒ [X] = (K_eq)¹/² · [X₂]¹/²\n3. Substitute [X] into the rate law of the slow step:\nRate = k₂ · (K_eq)¹/² · [X₂]¹/² · [Y₂] = k_eff · [X₂]⁰·⁵ · [Y₂]¹\n4. Calculate the overall order:\nOverall order = 0.5 + 1 = 1.5\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction A₂ + B₂ → 2AB, the mechanism is:\n1. A₂ ⇌ 2A (fast equilibrium, K_eq)\n2. A + B₂ → AB + B (slow, k)\n3. A + B → AB (fast)\nWhat is the order with respect to A₂?",
      option_a: "0.5",
      option_b: "1",
      option_c: "2",
      option_d: "0",
      correct_option: "A",
      explanation: "Rate = k[A][B₂].\nFrom the fast pre-equilibrium, [A] = (K_eq · [A₂])¹/² = K_eq¹/² · [A₂]⁰·⁵.\nSubstituting gives Rate = k′ · [A₂]⁰·⁵ · [B₂]¹.\nThus, the order with respect to A₂ is 0.5 (or 1/2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1952,
    originalQuestion: {
      question: "When the initial concentration of the reactant is doubled, the half-life period of a zero-order reaction: [NEET 2018]",
      option_a: "Is halved",
      option_b: "Is doubled",
      option_c: "Is tripled",
      option_d: "Remains unchanged",
      correct_option: "B",
      explanation: "For a zero-order reaction, the half-life period is given by:\nt₁/₂ = [A]₀ / (2k)\nThis formula shows that t₁/₂ is directly proportional to the initial reactant concentration [A]₀:\nt₁/₂ ∝ [A]₀\nTherefore, when the initial concentration of the reactant is doubled, its half-life period is also doubled.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the initial concentration of a reactant in a zero-order reaction is reduced to one-third of its initial value, its half-life period will:",
      option_a: "Become one-third",
      option_b: "Become three times",
      option_c: "Remain unchanged",
      option_d: "Become nine times",
      correct_option: "A",
      explanation: "Since t₁/₂ = [A]₀ / (2k) for a zero-order reaction, half-life is directly proportional to [A]₀.\nReducing [A]₀ to one-third will reduce t₁/₂ to one-third of its initial value.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1951,
    originalQuestion: {
      question: "The correct difference between first- and second-order reactions is that: [NEET 2018]",
      option_a: "The rate of a first-order reaction does not depend on reactant concentrations; the rate of a second-order reaction does depend on reactant concentrations.",
      option_b: "The half-life of a first-order reaction does not depend on [A]₀; the half-life of a second-order reaction does depend on [A]₀.",
      option_c: "A first-order reaction can be catalysed; a second-order reaction cannot be catalysed.",
      option_d: "The rate of a first-order reaction depends on reactant concentrations; the rate of a second-order reaction does not depend on reactant concentrations.",
      correct_option: "B",
      explanation: "Let us examine the half-life expressions:\n- For a first-order reaction: t₁/₂ = 0.693 / k. The half-life is completely independent of the initial reactant concentration [A]₀.\n- For a second-order reaction: t₁/₂ = 1 / (k · [A]₀). The half-life is inversely proportional to the initial concentration [A]₀ and therefore depends strongly on [A]₀.\nHence, statement (B) correctly distinguishes between first- and second-order kinetics.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "How does the half-life of a second-order reaction change when the initial concentration of the reactant is quadrupled?",
      option_a: "It is reduced to one-fourth",
      option_b: "It is quadrupled",
      option_c: "It remains unchanged",
      option_d: "It is halved",
      correct_option: "A",
      explanation: "For a second-order reaction, t₁/₂ = 1 / (k · [A]₀).\nSince t₁/₂ is inversely proportional to [A]₀, quadrupling [A]₀ reduces the half-life to 1/4 of its original value.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1950,
    originalQuestion: {
      question: "For the chemical reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), the correct option is: [NEET 2019]",
      option_a: "−d[N₂]/dt = 2d[NH₃]/dt",
      option_b: "−d[N₂]/dt = (1/2)d[NH₃]/dt",
      option_c: "3d[H₂]/dt = 2d[NH₃]/dt",
      option_d: "−(1/3)d[H₂]/dt = −(1/2)d[NH₃]/dt",
      correct_option: "B",
      explanation: "For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), the rate of reaction in terms of each participating species is:\nRate = −d[N₂]/dt = −(1/3) · (d[H₂]/dt) = +(1/2) · (d[NH₃]/dt)\nEquating the rate terms for N₂ and NH₃:\n−d[N₂]/dt = (1/2) · (d[NH₃]/dt)\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 2NO(g) + O₂(g) → 2NO₂(g), which relation correctly relates the rate of disappearance of oxygen to the rate of formation of nitrogen dioxide?",
      option_a: "−d[O₂]/dt = (1/2) · (d[NO₂]/dt)",
      option_b: "−d[O₂]/dt = 2 · (d[NO₂]/dt)",
      option_c: "−d[O₂]/dt = d[NO₂]/dt",
      option_d: "−d[O₂]/dt = −(1/2) · (d[NO₂]/dt)",
      correct_option: "A",
      explanation: "From reaction stoichiometry:\nRate = −(1/2) · (d[NO]/dt) = −d[O₂]/dt = +(1/2) · (d[NO₂]/dt)\nThus, −d[O₂]/dt = (1/2) · (d[NO₂]/dt).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1949,
    originalQuestion: {
      question: "If the rate constant for a first-order reaction is k, the time (t) required for the completion of 99% of the reaction is given by: [NEET 2019]",
      option_a: "t = 4.606/k",
      option_b: "t = 2.303/k",
      option_c: "t = 0.693/k",
      option_d: "t = 6.909/k",
      correct_option: "A",
      explanation: "For a first-order reaction, the integrated rate equation is:\nt = (2.303 / k) · log₁₀([A]₀ / [A])\nFor 99% completion of the reaction:\n[A]₀ = 100\n[A] = 100 − 99 = 1\nSubstituting these values:\nt₉₉% = (2.303 / k) · log₁₀(100 / 1) = (2.303 / k) · log₁₀(10²)\nSince log₁₀(10²) = 2:\nt₉₉% = (2.303 / k) · 2 = 4.606 / k\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a first-order reaction with rate constant k, what is the time required for 90% completion of the reaction?",
      option_a: "2.303 / k",
      option_b: "4.606 / k",
      option_c: "0.693 / k",
      option_d: "1.151 / k",
      correct_option: "A",
      explanation: "For 90% completion, [A]₀ = 100 and [A] = 100 − 90 = 10.\nt₉₀% = (2.303 / k) · log₁₀(100 / 10) = (2.303 / k) · log₁₀(10) = 2.303 / k.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1948,
    originalQuestion: {
      question: "The rate constant for a first-order reaction is 4.606 × 10⁻³ s⁻¹. The time required to reduce 2.0 g of the reactant to 0.2 g is: [NEET 2020 Phase 1]",
      option_a: "200 s",
      option_b: "500 s",
      option_c: "1000 s",
      option_d: "100 s",
      correct_option: "B",
      explanation: "Using the first-order integrated rate law:\nt = (2.303 / k) · log₁₀([A]₀ / [A])\nGiven:\nk = 4.606 × 10⁻³ s⁻¹\n[A]₀ = 2.0 g\n[A] = 0.2 g\nRatio [A]₀ / [A] = 2.0 / 0.2 = 10\nSubstituting the values:\nt = (2.303 / (4.606 × 10⁻³)) · log₁₀(10)\nSince log₁₀(10) = 1 and 2.303 / 4.606 = 1/2 = 0.5:\nt = (0.5) / (10⁻³) = 500 s\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The rate constant for a first-order reaction is 2.303 × 10⁻² s⁻¹. How much time is needed to reduce 10.0 g of reactant to 1.0 g?",
      option_a: "100 s",
      option_b: "200 s",
      option_c: "50 s",
      option_d: "10 s",
      correct_option: "A",
      explanation: "t = (2.303 / k) · log₁₀(10.0 / 1.0) = (2.303 / (2.303 × 10⁻²)) · log₁₀(10) = 1 / 10⁻² = 100 s.\nTherefore, Option (A) is the correct answer."
    }
  }
];

