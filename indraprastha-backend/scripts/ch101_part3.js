module.exports = [
  {
    id: 1947,
    originalQuestion: {
      question: "An increase in the concentration of the reactants of a reaction leads to a change in: [NEET 2020 Phase 1]",
      option_a: "Heat of reaction",
      option_b: "Threshold energy",
      option_c: "Collision frequency",
      option_d: "Activation energy",
      correct_option: "C",
      explanation: "According to collision theory, the rate of a chemical reaction is given by:\nRate = Z_AB · e^(−Eₐ / RT)\nwhere Z_AB is the collision frequency (the total number of collisions between reactant molecules per second per unit volume of the reaction mixture).\nWhen the concentration of reactants increases, the number of reactant particles per unit volume increases, leading to a direct increase in the collision frequency (Z_AB).\nActivation energy, threshold energy, and heat of reaction (ΔH) are intrinsic molecular and thermodynamic properties that do not change with reactant concentration.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following reaction parameters increases when the number of reacting molecules per unit volume is doubled?",
      option_a: "Activation energy",
      option_b: "Collision frequency",
      option_c: "Specific rate constant",
      option_d: "Equilibrium constant",
      correct_option: "B",
      explanation: "Collision frequency represents the number of binary collisions occurring per unit time per unit volume.\nIncreasing the number density of reactant molecules increases the frequency of collisions proportionally without changing the activation energy, rate constant, or equilibrium constant.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1946,
    originalQuestion: {
      question: "The slope of the Arrhenius plot (ln k versus 1/T) of a first-order reaction is −5 × 10³ K. The value of Ea for the reaction is (Given: R = 8.314 J K⁻¹ mol⁻¹): [NEET 2021]",
      option_a: "−83 kJ mol⁻¹",
      option_b: "41.5 kJ mol⁻¹",
      option_c: "83.0 kJ mol⁻¹",
      option_d: "166 kJ mol⁻¹",
      correct_option: "B",
      explanation: "From the linear form of the Arrhenius equation:\nln k = ln A − (Eₐ / R) · (1/T)\nThe slope of the plot of ln k versus 1/T is:\nSlope = −Eₐ / R\nGiven:\nSlope = −5 × 10³ K\nR = 8.314 J K⁻¹ mol⁻¹\nEquating and solving for Eₐ:\n−Eₐ / R = −5 × 10³\nEₐ = (5 × 10³) × 8.314 J mol⁻¹ = 41570 J mol⁻¹ = 41.57 kJ mol⁻¹ ≈ 41.5 kJ mol⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the slope of the plot of ln k versus 1/T is found to be −1.0 × 10⁴ K, what is the activation energy of the reaction? (R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "83.14 kJ mol⁻¹",
      option_b: "41.57 kJ mol⁻¹",
      option_c: "166.28 kJ mol⁻¹",
      option_d: "8.314 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Slope = −Eₐ / R = −1.0 × 10⁴ K\nEₐ = (1.0 × 10⁴) · 8.314 = 83140 J mol⁻¹ = 83.14 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1945,
    originalQuestion: {
      question: "For a reaction A → B, the enthalpy of reaction is −4.2 kJ mol⁻¹ and the enthalpy of activation is 9.6 kJ mol⁻¹. The correct potential energy profile for the reaction is shown in which option? [NEET 2021]",
      option_a: "Diagram showing endothermic profile where products have higher potential energy than reactants",
      option_b: "Diagram showing exothermic profile where products have lower potential energy than reactants by 4.2 kJ mol⁻¹ and activation barrier is 9.6 kJ mol⁻¹",
      option_c: "Diagram showing no activation barrier",
      option_d: "Diagram showing products and reactants at identical energy levels",
      correct_option: "B",
      explanation: "Let us examine the thermodynamic and kinetic parameters:\n1. Enthalpy of reaction: ΔH = −4.2 kJ mol⁻¹ (negative value), which indicates that the reaction is exothermic.\nIn an exothermic potential energy diagram, the potential energy of the products (B) must lie below the potential energy of the reactants (A) by an amount equal to |ΔH| = 4.2 kJ mol⁻¹.\n2. Activation energy (enthalpy of activation): Eₐ = 9.6 kJ mol⁻¹ (positive value), which represents the energy barrier from the reactant level up to the transition state (activated complex).\nTherefore, the potential energy profile must show an upward peak of 9.6 kJ mol⁻¹ from reactants to transition state, followed by a descent to products lying 4.2 kJ mol⁻¹ below the reactants.\nThis corresponds to Option (B).\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For an endothermic reaction with forward activation energy E_af = 60 kJ mol⁻¹ and enthalpy change ΔH = +25 kJ mol⁻¹, what is the activation energy for the backward reaction?",
      option_a: "35 kJ mol⁻¹",
      option_b: "85 kJ mol⁻¹",
      option_c: "60 kJ mol⁻¹",
      option_d: "25 kJ mol⁻¹",
      correct_option: "A",
      explanation: "For any reaction:\nΔH = E_af − E_ab\nE_ab = E_af − ΔH = 60 − 25 = 35 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1944,
    originalQuestion: {
      question: "For a first-order reaction A → Products, the initial concentration of A is 0.1 M, which becomes 0.001 M after 5 minutes. The rate constant for the reaction in min⁻¹ is: [NEET 2022 Phase 1]",
      option_a: "1.3818",
      option_b: "0.9212",
      option_c: "0.4606",
      option_d: "0.2303",
      correct_option: "B",
      explanation: "Using the first-order integrated rate law:\nk = (2.303 / t) · log₁₀([A]₀ / [A])\nGiven:\n[A]₀ = 0.1 M\n[A] = 0.001 M\nt = 5 minutes\nCalculate the ratio:\n[A]₀ / [A] = 0.1 / 0.001 = 100 = 10²\nlog₁₀(100) = 2\nSubstituting into the rate law:\nk = (2.303 / 5) · 2 = 4.606 / 5 = 0.9212 min⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In a first-order reaction, the concentration of reactant drops from 0.8 M to 0.08 M in 10 minutes. What is the rate constant in min⁻¹?",
      option_a: "0.2303 min⁻¹",
      option_b: "0.4606 min⁻¹",
      option_c: "0.1151 min⁻¹",
      option_d: "2.303 min⁻¹",
      correct_option: "A",
      explanation: "k = (2.303 / 10) · log₁₀(0.8 / 0.08) = (2.303 / 10) · log₁₀(10) = 0.2303 · 1 = 0.2303 min⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1943,
    originalQuestion: {
      question: "The y- and x-axes for zero- and first-order reactions, respectively, are: [NEET 2022 Phase 1]",
      option_a: "Zero order: y = concentration, x = time; First order: y = t₁/₂, x = concentration",
      option_b: "Zero order: y = concentration, x = time; First order: y = rate constant, x = concentration",
      option_c: "Zero order: y = rate, x = concentration; First order: y = t₁/₂, x = concentration",
      option_d: "Zero order: y = rate, x = concentration; First order: y = rate, x = t₁/₂",
      correct_option: "C",
      explanation: "In the graphical representations given in standard NCERT textbook questions:\n- For a zero-order reaction, the rate is independent of concentration (Rate = k · [A]⁰ = k). A plot of y = rate versus x = concentration is a horizontal straight line parallel to the concentration axis.\n- For a first-order reaction, the half-life is independent of the initial concentration (t₁/₂ = 0.693 / k). A plot of y = t₁/₂ versus x = concentration is a horizontal straight line parallel to the concentration axis.\nTherefore, the correct pair of axes is: Zero order: y = rate, x = concentration; First order: y = t₁/₂, x = concentration.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For a first-order reaction, which of the following plots will be a straight line with a negative slope equal to −k / 2.303?",
      option_a: "log₁₀[R] versus time (t)",
      option_b: "[R] versus time (t)",
      option_c: "1/[R] versus time (t)",
      option_d: "Rate versus time (t)",
      correct_option: "A",
      explanation: "The integrated rate equation for a first-order reaction is:\nlog₁₀[R] = log₁₀[R]₀ − (k / 2.303) · t\nA plot of log₁₀[R] on the y-axis against time t on the x-axis yields a straight line with slope = −k / 2.303 and y-intercept = log₁₀[R]₀.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1942,
    originalQuestion: {
      question: "For a chemical reaction 4A + 3B → 6C + 9D, the rate of formation of C is 6 × 10⁻² mol L⁻¹ s⁻¹ and the rate of disappearance of A is 4 × 10⁻² mol L⁻¹ s⁻¹. The rate of reaction and amount of B consumed in an interval of 10 seconds, respectively, will be: [NEET 2022 Phase 2]",
      option_a: "10 × 10⁻² mol L⁻¹ s⁻¹ and 30 × 10⁻² mol L⁻¹",
      option_b: "1 × 10⁻² mol L⁻¹ s⁻¹ and 30 × 10⁻² mol L⁻¹",
      option_c: "10 × 10⁻² mol L⁻¹ s⁻¹ and 10 × 10⁻² mol L⁻¹",
      option_d: "1 × 10⁻² mol L⁻¹ s⁻¹ and 10 × 10⁻² mol L⁻¹",
      correct_option: "B",
      explanation: "1. Calculate the rate of reaction:\nRate = (1/4) · (−d[A]/dt) = (1/6) · (d[C]/dt)\nUsing the given rate of formation of C (d[C]/dt = 6 × 10⁻² mol L⁻¹ s⁻¹):\nRate = (1/6) · (6 × 10⁻²) = 1 × 10⁻² mol L⁻¹ s⁻¹\n(Similarly, (1/4) · (4 × 10⁻²) = 1 × 10⁻² mol L⁻¹ s⁻¹).\n2. Calculate the rate of consumption of B:\nRate = (1/3) · (−d[B]/dt) ⇒ −d[B]/dt = 3 · Rate = 3 · (1 × 10⁻²) = 3 × 10⁻² mol L⁻¹ s⁻¹\n3. Calculate the amount of B consumed in Δt = 10 seconds:\nΔ[B] = (−d[B]/dt) · Δt = (3 × 10⁻² mol L⁻¹ s⁻¹) · 10 s = 30 × 10⁻² mol L⁻¹\nTherefore, Rate = 1 × 10⁻² mol L⁻¹ s⁻¹ and amount of B consumed = 30 × 10⁻² mol L⁻¹.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 2A + 3B → 5C, if the rate of reaction is 2.0 × 10⁻² mol L⁻¹ s⁻¹, what amount of reactant A is consumed in 15 seconds?",
      option_a: "0.60 mol L⁻¹",
      option_b: "0.30 mol L⁻¹",
      option_c: "0.45 mol L⁻¹",
      option_d: "0.15 mol L⁻¹",
      correct_option: "A",
      explanation: "Rate of consumption of A = −d[A]/dt = 2 · Rate = 2 · (2.0 × 10⁻²) = 4.0 × 10⁻² mol L⁻¹ s⁻¹.\nAmount of A consumed in 15 s = (4.0 × 10⁻²) · 15 = 0.60 mol L⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1941,
    originalQuestion: {
      question: "Given below are two statements: one is labelled as Assertion A and the other as Reason R. Assertion A: A reaction can have zero activation energy. Reason R: The minimum extra amount of energy absorbed by reactant molecules so that their energy becomes equal to the threshold value is called activation energy. [NEET 2023]",
      option_a: "Both A and R are true, but R is NOT the correct explanation of A.",
      option_b: "A is true, but R is false.",
      option_c: "A is false, but R is true.",
      option_d: "Both A and R are true, and R is the correct explanation of A.",
      correct_option: "A",
      explanation: "Let us evaluate both statements:\n1. Assertion A: Ultra-fast barrierless radical combination reactions (such as •CH₃ + •CH₃ → C₂H₆) involve free radicals with unpaired electrons combining directly without any bond breaking. For such reactions, the activation energy can be zero (Eₐ = 0). Thus, Assertion A is true.\n2. Reason R: By standard definition, activation energy is the minimum extra amount of energy required by reactant molecules to reach the threshold energy level (E_threshold = E_reactants + Eₐ). Thus, Reason R is a true statement.\n3. However, Reason R merely defines activation energy; it does not explain why certain radical-recombination reactions possess zero activation energy (which is due to the absence of a chemical bond that must be broken).\nHence, both A and R are true, but R is not the correct explanation of A.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following types of chemical reactions can have an activation energy approaching zero?",
      option_a: "Combination of two free radicals to form a stable covalent molecule",
      option_b: "Decomposition of calcium carbonate at high temperature",
      option_c: "Combustion of methane gas",
      option_d: "Esterification between carboxylic acids and alcohols",
      correct_option: "A",
      explanation: "Free radicals are already high-energy reactive species with open shells.\nWhen two free radicals combine, only bond formation occurs (no bonds need to be broken), requiring no activation energy barrier (Eₐ ≈ 0).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1940,
    originalQuestion: {
      question: "For a certain reaction, Rate = k[A]²[B]. When the initial concentration of A is tripled, keeping the concentration of B constant, the initial rate would: [NEET 2023]",
      option_a: "Increase by a factor of six",
      option_b: "Increase by a factor of nine",
      option_c: "Increase by a factor of three",
      option_d: "Decrease by a factor of nine",
      correct_option: "B",
      explanation: "The rate law is given as:\nRate₁ = k · [A]² · [B]\nWhen [A] is tripled, [A]′ = 3[A], while [B] is held constant:\nRate₂ = k · (3[A])² · [B] = k · 9[A]² · [B] = 9 · (k · [A]² · [B]) = 9 · Rate₁\nThus, the initial rate increases by a factor of nine.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction with rate law Rate = k[X][Y]², by what factor does the rate change if the concentration of X is doubled and that of Y is tripled?",
      option_a: "6",
      option_b: "12",
      option_c: "18",
      option_d: "36",
      correct_option: "C",
      explanation: "New Rate = k · (2[X]) · (3[Y])² = k · 2[X] · 9[Y]² = 18 · (k[X][Y]²) = 18 · Initial Rate.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1939,
    originalQuestion: {
      question: "The correct option for the rate law that corresponds to an overall first-order reaction is: [NEET 2023 Manipur]",
      option_a: "Rate = k[A]⁰[B]²",
      option_b: "Rate = k[A][B]",
      option_c: "Rate = k[A]¹ᐟ²[B]²",
      option_d: "Rate = k[A]⁻¹ᐟ²[B]³ᐟ²",
      correct_option: "D",
      explanation: "The overall order of a reaction is the sum of the exponents of the concentration terms in the rate law:\n- Option (A): Overall order = 0 + 2 = 2 (second order).\n- Option (B): Overall order = 1 + 1 = 2 (second order).\n- Option (C): Overall order = 1/2 + 2 = 2.5.\n- Option (D): Overall order = (−1/2) + (3/2) = 2/2 = 1 (first order).\nTherefore, Option (D) corresponds to an overall first-order reaction.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following rate laws represents a reaction with an overall order of 1.5?",
      option_a: "Rate = k[A]¹[B]¹ᐟ²",
      option_b: "Rate = k[A]²[B]⁻¹",
      option_c: "Rate = k[A]¹ᐟ²[B]¹ᐟ²",
      option_d: "Rate = k[A]²[B]¹ᐟ²",
      correct_option: "A",
      explanation: "The sum of the powers in Rate = k[A]¹[B]¹ᐟ² is 1 + 0.5 = 1.5.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1938,
    originalQuestion: {
      question: "For a reaction 3A → 2B, the average rate of appearance of B is given by Δ[B]/Δt. The correct relation between the average rate of appearance of B and the average rate of disappearance of A is: [NEET 2023 Manipur]",
      option_a: "−Δ[A]/Δt",
      option_b: "−3Δ[A]/(2Δt)",
      option_c: "−2Δ[A]/(3Δt)",
      option_d: "Δ[A]/Δt",
      correct_option: "C",
      explanation: "For the reaction 3A → 2B, the average rate of reaction is defined as:\nRate = −(1/3) · (Δ[A] / Δt) = +(1/2) · (Δ[B] / Δt)\nTo find the relation for Δ[B] / Δt, multiply both sides by 2:\nΔ[B] / Δt = −(2/3) · (Δ[A] / Δt)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 4A → 3B, what is the average rate of formation of B (Δ[B]/Δt) in terms of the rate of disappearance of A (−Δ[A]/Δt)?",
      option_a: "Δ[B]/Δt = (3/4) · (−Δ[A]/Δt)",
      option_b: "Δ[B]/Δt = (4/3) · (−Δ[A]/Δt)",
      option_c: "Δ[B]/Δt = (1/4) · (−Δ[A]/Δt)",
      option_d: "Δ[B]/Δt = −(3/4) · (−Δ[A]/Δt)",
      correct_option: "A",
      explanation: "Rate = −(1/4) · (Δ[A]/Δt) = +(1/3) · (Δ[B]/Δt)\nΔ[B]/Δt = (3/4) · (−Δ[A]/Δt)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1937,
    originalQuestion: {
      question: "The rate of a reaction quadruples when temperature changes from 27°C to 57°C. Calculate the energy of activation (Given: R = 8.314 J K⁻¹ mol⁻¹, log 4 = 0.6021). [NEET 2024]",
      option_a: "38.04 kJ mol⁻¹",
      option_b: "380.4 kJ mol⁻¹",
      option_c: "3.80 kJ mol⁻¹",
      option_d: "3804 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Using the Arrhenius formula relating two temperatures:\nlog₁₀(k₂ / k₁) = (Eₐ / (2.303 · R)) · ((T₂ − T₁) / (T₁ · T₂))\nGiven:\nT₁ = 27 °C = 300 K\nT₂ = 57 °C = 330 K\nk₂ / k₁ = 4, so log₁₀(4) = 0.6021\nR = 8.314 J K⁻¹ mol⁻¹\nSubstituting the values:\n0.6021 = (Eₐ / (2.303 · 8.314)) · ((330 − 300) / (300 · 330))\n0.6021 = (Eₐ / 19.147) · (30 / 99000)\n0.6021 = (Eₐ / 19.147) · (1 / 3300)\nEₐ = 0.6021 · 19.147 · 3300 = 38044 J mol⁻¹ = 38.04 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If a reaction's rate quadruples when temperature is raised from 290 K to 310 K, what is its activation energy? (Given: log 4 = 0.6021, R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "51.8 kJ mol⁻¹",
      option_b: "25.9 kJ mol⁻¹",
      option_c: "103.6 kJ mol⁻¹",
      option_d: "12.9 kJ mol⁻¹",
      correct_option: "A",
      explanation: "log₁₀(4) = (Eₐ / (2.303 · 8.314)) · ((310 − 290) / (290 · 310))\n0.6021 = (Eₐ / 19.147) · (20 / 89900)\nEₐ = (0.6021 · 19.147 · 89900) / 20 ≈ 51820 J mol⁻¹ = 51.8 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1936,
    originalQuestion: {
      question: "Which plot of ln k versus 1/T is consistent with the Arrhenius equation? [NEET 2024]",
      option_a: "A straight line with a negative slope and positive intercept",
      option_b: "A curve passing through the origin",
      option_c: "A straight line with a positive slope",
      option_d: "A parabolic curve opening upwards",
      correct_option: "A",
      explanation: "The Arrhenius equation is:\nk = A · e^(−Eₐ / RT)\nTaking the natural logarithm on both sides:\nln k = ln A − (Eₐ / R) · (1/T)\nComparing this with the slope-intercept equation of a straight line, y = mx + c:\n- y = ln k\n- x = 1/T\n- Slope (m) = −Eₐ / R (which is negative because Eₐ > 0 and R > 0)\n- y-intercept (c) = ln A (positive constant)\nTherefore, the correct plot is a straight line with a negative slope.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "According to the Arrhenius equation, what is obtained when ln k is plotted against 1/T?",
      option_a: "A straight line with negative slope whose magnitude is Eₐ / R",
      option_b: "An exponential curve",
      option_c: "A hyperbola",
      option_d: "A horizontal line parallel to the 1/T axis",
      correct_option: "A",
      explanation: "Because ln k = ln A − (Eₐ/R)(1/T), plotting ln k versus 1/T yields a linear graph with slope = −Eₐ/R.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1935,
    originalQuestion: {
      question: "Activation energy of any chemical reaction can be calculated if one knows the value of: [NEET 2024]",
      option_a: "Rate constant at standard temperature",
      option_b: "Probability of collision",
      option_c: "Orientation of reactant molecules during collision",
      option_d: "Rate constant at two different temperatures",
      correct_option: "D",
      explanation: "The integrated form of the Arrhenius equation is:\nlog₁₀(k₂ / k₁) = (Eₐ / (2.303 · R)) · ((T₂ − T₁) / (T₁ · T₂))\nBy measuring the rate constant at two different temperatures (k₁ at T₁ and k₂ at T₂), all terms in the equation are known except the activation energy Eₐ, which can then be calculated directly.\nKnowing the rate constant at only a single temperature is insufficient because the pre-exponential frequency factor A is also unknown.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which equation is used to calculate the activation energy of a reaction using rate constants measured at two temperatures T₁ and T₂?",
      option_a: "log(k₂/k₁) = (Eₐ / 2.303R) · [(T₂ − T₁) / (T₁ · T₂)]",
      option_b: "log(k₂/k₁) = (ΔH / 2.303R) · [(T₂ − T₁) / (T₁ · T₂)]",
      option_c: "k = A · e^(Eₐ / RT)",
      option_d: "ln(k₂/k₁) = −(Eₐ / R) · (T₂ − T₁)",
      correct_option: "A",
      explanation: "The two-point form of the Arrhenius equation is log(k₂/k₁) = (Eₐ / 2.303R) · [(T₂ − T₁) / (T₁ · T₂)].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1934,
    originalQuestion: {
      question: "Rate constants of a reaction at 500 K and 700 K are 0.04 s⁻¹ and 0.14 s⁻¹, respectively. The activation energy of the reaction is (Given: log 3.5 = 0.5441, R = 8.31 J K⁻¹ mol⁻¹): [NEET 2024 Re-Examination]",
      option_a: "182310 J",
      option_b: "18500 J",
      option_c: "18219 J",
      option_d: "18030 J",
      correct_option: "C",
      explanation: "Using the Arrhenius equation:\nlog₁₀(k₂ / k₁) = (Eₐ / (2.303 · R)) · ((T₂ − T₁) / (T₁ · T₂))\nGiven:\nT₁ = 500 K, k₁ = 0.04 s⁻¹\nT₂ = 700 K, k₂ = 0.14 s⁻¹\nk₂ / k₁ = 0.14 / 0.04 = 14 / 4 = 3.5\nlog₁₀(3.5) = 0.5441\nR = 8.31 J K⁻¹ mol⁻¹\nSubstituting the values:\n0.5441 = (Eₐ / (2.303 · 8.31)) · ((700 − 500) / (500 · 700))\n0.5441 = (Eₐ / 19.1379) · (200 / 350000) = (Eₐ / 19.1379) · (2 / 3500)\nEₐ = (0.5441 · 19.1379 · 3500) / 2 = (36446.4) / 2 = 18223 J ≈ 18219 J\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The rate constants of a reaction are 0.02 s⁻¹ at 400 K and 0.08 s⁻¹ at 600 K. What is the activation energy? (Given: log 4 = 0.6021, R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "13.84 kJ mol⁻¹",
      option_b: "27.68 kJ mol⁻¹",
      option_c: "6.92 kJ mol⁻¹",
      option_d: "55.36 kJ mol⁻¹",
      correct_option: "A",
      explanation: "log(0.08 / 0.02) = log 4 = 0.6021\n0.6021 = (Eₐ / 19.147) · (200 / 240000) = (Eₐ / 19.147) · (1 / 1200)\nEₐ = 0.6021 · 19.147 · 1200 = 13835 J = 13.84 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1933,
    originalQuestion: {
      question: "Which of the following plots represents the variation of ln k versus 1/T in accordance with the Arrhenius equation? [NEET 2024 Re-Examination]",
      option_a: "A linear plot with negative slope",
      option_b: "A linear plot with positive slope",
      option_c: "A non-linear decreasing curve",
      option_d: "A non-linear increasing curve",
      correct_option: "A",
      explanation: "According to the Arrhenius equation:\nln k = ln A − (Eₐ / R) · (1/T)\nThis equation is linear in 1/T (form y = mx + c with slope m = −Eₐ / R).\nBecause activation energy Eₐ and gas constant R are positive physical quantities, the slope (−Eₐ / R) is strictly negative.\nTherefore, the variation of ln k versus 1/T is represented by a straight line with a negative slope.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In the Arrhenius plot of log₁₀ k versus 1/T, what is the value of the y-intercept?",
      option_a: "log₁₀ A",
      option_b: "ln A",
      option_c: "−Eₐ / R",
      option_d: "A",
      correct_option: "A",
      explanation: "log₁₀ k = log₁₀ A − (Eₐ / (2.303 · R · T)).\nExtrapolating to 1/T = 0, the y-intercept equals log₁₀ A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1932,
    originalQuestion: {
      question: "The following data is for a reaction between reactants A and B: Run 1: [A] = 0.1 M, [B] = 0.1 M, Rate = 2 × 10⁻³ mol L⁻¹ s⁻¹ Run 2: [A] = 0.2 M, [B] = 0.1 M, Rate = 4 × 10⁻³ mol L⁻¹ s⁻¹ Run 3: [A] = 0.2 M, [B] = 0.2 M, Rate = 1.6 × 10⁻² mol L⁻¹ s⁻¹ The orders of the reaction with respect to A and B, respectively, are: [NEET 2024 Re-Examination]",
      option_a: "1, 0",
      option_b: "0, 1",
      option_c: "1, 2",
      option_d: "2, 1",
      correct_option: "C",
      explanation: "Let the rate equation be Rate = k · [A]ˣ · [B]ʸ.\n1. Comparing Run 1 and Run 2 (where [B] = 0.1 M is constant):\nRate₂ / Rate₁ = (0.2 / 0.1)ˣ\n(4 × 10⁻³) / (2 × 10⁻³) = 2 = 2ˣ ⇒ x = 1\nThus, the order with respect to A is 1.\n2. Comparing Run 2 and Run 3 (where [A] = 0.2 M is constant):\nRate₃ / Rate₂ = (0.2 / 0.1)ʸ\n(1.6 × 10⁻²) / (4 × 10⁻³) = 4 = 2ʸ ⇒ y = 2\nThus, the order with respect to B is 2.\nTherefore, the orders with respect to A and B are 1 and 2, respectively.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction between X and Y: Doubling [X] at constant [Y] doubles the rate. Doubling [Y] at constant [X] quadruples the rate. What are the orders of reaction with respect to X and Y?",
      option_a: "1 and 2",
      option_b: "2 and 1",
      option_c: "1 and 1",
      option_d: "2 and 2",
      correct_option: "A",
      explanation: "2ᵃ = 2 ⇒ a = 1 (order with respect to X is 1).\n2ᵇ = 4 ⇒ b = 2 (order with respect to Y is 2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1931,
    originalQuestion: {
      question: "If the half-life (t₁/₂) for a first-order reaction is 1 minute, then the time required for 99.9% completion of the reaction is closest to: [NEET 2025]",
      option_a: "5 minutes",
      option_b: "10 minutes",
      option_c: "2 minutes",
      option_d: "4 minutes",
      correct_option: "B",
      explanation: "For a first-order reaction:\nk = 0.693 / t₁/₂ = 0.693 / 1 = 0.693 min⁻¹\nFor 99.9% completion:\n[A]₀ = 100\n[A] = 100 − 99.9 = 0.1\n[A]₀ / [A] = 100 / 0.1 = 1000 = 10³\nUsing the integrated rate equation:\nt₉₉.₉% = (2.303 / k) · log₁₀(10³)\nt₉₉.₉% = (2.303 / 0.693) · 3 = (3.32) · 3 ≈ 10 · t₁/₂\nSince t₁/₂ = 1 minute:\nt₉₉.₉% = 10 × 1 minute = 10 minutes\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a first-order reaction, what is the exact mathematical relationship between the time required for 99.9% completion (t₉₉.₉%) and its half-life (t₁/₂)?",
      option_a: "t₉₉.₉% ≈ 10 · t₁/₂",
      option_b: "t₉₉.₉% ≈ 5 · t₁/₂",
      option_c: "t₉₉.₉% ≈ 2 · t₁/₂",
      option_d: "t₉₉.₉% ≈ 20 · t₁/₂",
      correct_option: "A",
      explanation: "t₉₉.₉% = (2.303 / k) · log(10³) = 6.909 / k.\nSince t₁/₂ = 0.693 / k:\nt₉₉.₉% / t₁/₂ = 6.909 / 0.693 ≈ 9.97 ≈ 10.\nTherefore, t₉₉.₉% ≈ 10 · t₁/₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1930,
    originalQuestion: {
      question: "If the rate constant of a reaction is 0.03 s⁻¹, how much time does it take for 7.2 mol L⁻¹ concentration of the reactant to get reduced to 0.9 mol L⁻¹? (Given: log 2 = 0.301) [NEET 2025]",
      option_a: "210 s",
      option_b: "21.0 s",
      option_c: "69.3 s",
      option_d: "23.1 s",
      correct_option: "C",
      explanation: "1. The units of k are s⁻¹, indicating first-order kinetics.\n2. Calculate the ratio of initial to final concentration:\n[A]₀ / [A] = 7.2 / 0.9 = 8 = 2³\nThis corresponds to exactly 3 half-lives (n = 3):\n7.2 M → 3.6 M (1st half-life) → 1.8 M (2nd half-life) → 0.9 M (3rd half-life)\n3. Calculate the half-life t₁/₂:\nt₁/₂ = 0.693 / k = 0.693 / 0.03 = 23.1 s\n4. Calculate total time t:\nt = 3 · t₁/₂ = 3 · 23.1 s = 69.3 s\n(Or using t = (2.303 / 0.03) · log₁₀(8) = (2.303 / 0.03) · (3 × 0.301) = 69.3 s).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A first-order reaction has a rate constant k = 0.02 s⁻¹. How much time is needed for the concentration of reactant to decrease from 4.0 M to 0.5 M?",
      option_a: "103.95 s",
      option_b: "34.65 s",
      option_c: "69.3 s",
      option_d: "138.6 s",
      correct_option: "A",
      explanation: "The ratio is 4.0 / 0.5 = 8 = 2³ (3 half-lives).\nt₁/₂ = 0.693 / 0.02 = 34.65 s.\nTotal time = 3 · 34.65 s = 103.95 s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1929,
    originalQuestion: {
      question: "Given below is an expression for the rate constant of a first-order reaction occurring at a certain temperature T (K): ln k = 14.34 − (1.25 × 10⁴)/T The energy of activation in kcal mol⁻¹ for the reaction is (Given: R = 1.987 cal mol⁻¹ K⁻¹): [NEET 2026]",
      option_a: "24.84",
      option_b: "14.34",
      option_c: "18.63",
      option_d: "12.42",
      correct_option: "A",
      explanation: "Comparing the given equation with the Arrhenius relation:\nln k = ln A − (Eₐ / R) · (1/T)\nGiven:\nln k = 14.34 − (1.25 × 10⁴) / T\nEquating coefficients of 1/T:\nEₐ / R = 1.25 × 10⁴ K\nEₐ = (1.25 × 10⁴) · R\nGiven R = 1.987 cal mol⁻¹ K⁻¹:\nEₐ = (1.25 × 10⁴) · 1.987 cal mol⁻¹ = 24837.5 cal mol⁻¹\nConverting calories to kilocalories (1 kcal = 1000 cal):\nEₐ = 24837.5 / 1000 = 24.8375 kcal mol⁻¹ ≈ 24.84 kcal mol⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction, log₁₀ k = 14 − 2000 / T. What is the activation energy of the reaction in cal mol⁻¹? (R = 2 cal mol⁻¹ K⁻¹)",
      option_a: "9212 cal mol⁻¹",
      option_b: "4000 cal mol⁻¹",
      option_c: "2000 cal mol⁻¹",
      option_d: "18424 cal mol⁻¹",
      correct_option: "A",
      explanation: "Comparing with log₁₀ k = log₁₀ A − Eₐ / (2.303 · R · T):\nEₐ / (2.303 · R) = 2000\nEₐ = 2000 · 2.303 · 2 = 9212 cal mol⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1928,
    originalQuestion: {
      question: "For a certain reaction R → Product, the plot of concentration [R] versus time has a negative slope as shown (k = −slope). The order of reaction is: [NEET 2026]",
      option_a: "0",
      option_b: "1",
      option_c: "2",
      option_d: "2.5",
      correct_option: "A",
      explanation: "For a zero-order reaction, the differential rate law is:\n−d[R]/dt = k\nIntegrating both sides gives:\n[R] = [R]₀ − k · t\nComparing this with the equation of a straight line, y = mx + c:\n- y = [R]\n- x = t\n- Slope (m) = −k (so k = −slope)\n- Intercept (c) = [R]₀\nBecause the plot of [R] versus time is a straight line with slope equal to −k, the reaction is of zero order.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A plot of 1/[A] versus time (t) yields a straight line with a positive slope equal to +k. What is the order of the reaction?",
      option_a: "Zero order",
      option_b: "First order",
      option_c: "Second order",
      option_d: "Half order",
      correct_option: "C",
      explanation: "For a second-order reaction, 1/[A] = 1/[A]₀ + kt.\nA plot of 1/[A] on the y-axis against time t on the x-axis gives a straight line with positive slope = k.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1927,
    originalQuestion: {
      question: "Match List I with List II. List I (Order of reaction): A. Zero order B. First order C. Second order D. Third order List II (Unit of rate constant): I. mol⁻¹ L s⁻¹ II. mol⁻² L² s⁻¹ III. s⁻¹ IV. mol L⁻¹ s⁻¹ [NEET 2026]",
      option_a: "A-IV, B-II, C-I, D-III",
      option_b: "A-IV, B-III, C-I, D-II",
      option_c: "A-IV, B-III, C-II, D-I",
      option_d: "A-I, B-II, C-III, D-IV",
      correct_option: "B",
      explanation: "The general formula for the units of rate constant for an n-th order reaction is:\nUnits of k = (mol L⁻¹)¹⁻ⁿ · s⁻¹\n- For zero order (n = 0): (mol L⁻¹)¹⁻⁰ · s⁻¹ = mol L⁻¹ s⁻¹ (Match with IV)\n- For first order (n = 1): (mol L⁻¹)¹⁻¹ · s⁻¹ = s⁻¹ (Match with III)\n- For second order (n = 2): (mol L⁻¹)¹⁻² · s⁻¹ = mol⁻¹ L s⁻¹ (Match with I)\n- For third order (n = 3): (mol L⁻¹)¹⁻³ · s⁻¹ = mol⁻² L² s⁻¹ (Match with II)\nThus, the correct matching is: A-IV, B-III, C-I, D-II.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the order of a reaction whose rate constant has units of L · mol⁻¹ · min⁻¹?",
      option_a: "Zero order",
      option_b: "First order",
      option_c: "Second order",
      option_d: "Third order",
      correct_option: "C",
      explanation: "Using (mol L⁻¹)¹⁻ⁿ = mol⁻¹ L gives 1 − n = −1 ⇒ n = 2.\nHence, it is a second-order reaction.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1926,
    originalQuestion: {
      question: "2A → B is a zero-order reaction, where k = 1.0 mol L⁻¹ min⁻¹. If the initial concentration of A is 2 M, then the time taken to complete 75% of the reaction will be: [RE-NEET 2026]",
      option_a: "2.0 min",
      option_b: "1.5 min",
      option_c: "0.75 min",
      option_d: "1.0 min",
      correct_option: "B",
      explanation: "For a zero-order reaction:\nRate of consumption of A = −d[A]/dt = k_obs = 1.0 mol L⁻¹ min⁻¹\nInitial concentration [A]₀ = 2 M.\nFor 75% completion of the reaction, the amount of A consumed is:\nΔ[A] = 0.75 × [A]₀ = 0.75 × 2 M = 1.5 M\nThe time required is:\nt = Δ[A] / k = 1.5 M / (1.0 mol L⁻¹ min⁻¹) = 1.5 min\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a zero-order reaction with rate constant k = 0.5 mol L⁻¹ min⁻¹, how much time will it take for the reactant concentration to fall from 4.0 M to 1.0 M?",
      option_a: "6 min",
      option_b: "3 min",
      option_c: "8 min",
      option_d: "2 min",
      correct_option: "A",
      explanation: "Amount of reactant reacted = Δ[A] = 4.0 − 1.0 = 3.0 M.\nFor zero order, t = Δ[A] / k = 3.0 / 0.5 = 6 min.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1925,
    originalQuestion: {
      question: "For an elementary chemical reaction, the Arrhenius plot is given below. If the energy of activation is 6.64 kJ mol⁻¹ and R = 8.3 J K⁻¹ mol⁻¹, the temperature at which the rate constant becomes e² min⁻¹ is: [RE-NEET 2026]",
      option_a: "250 K",
      option_b: "125 K",
      option_c: "150 K",
      option_d: "200 K",
      correct_option: "D",
      explanation: "From the Arrhenius equation:\nln k = ln A − Eₐ / (RT)\nGiven that at k = e², ln k = ln(e²) = 2.\nFrom the given graph parameters (where ln A = 6):\n2 = 6 − Eₐ / (RT)\nEₐ / (RT) = 6 − 2 = 4\nGiven:\nEₐ = 6.64 kJ mol⁻¹ = 6640 J mol⁻¹\nR = 8.3 J K⁻¹ mol⁻¹\nSolving for T:\nT = Eₐ / (4 · R) = 6640 / (4 · 8.3) = 6640 / 33.2 = 200 K\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction with ln A = 10 and Eₐ = 16.6 kJ mol⁻¹, at what temperature will ln k be equal to 6? (R = 8.3 J K⁻¹ mol⁻¹)",
      option_a: "500 K",
      option_b: "250 K",
      option_c: "1000 K",
      option_d: "400 K",
      correct_option: "A",
      explanation: "ln k = ln A − Eₐ / (RT)\n6 = 10 − 16600 / (8.3 · T)\n16600 / (8.3 · T) = 4\n2000 / T = 4 ⇒ T = 2000 / 4 = 500 K.\nTherefore, Option (A) is the correct answer."
    }
  }
];

