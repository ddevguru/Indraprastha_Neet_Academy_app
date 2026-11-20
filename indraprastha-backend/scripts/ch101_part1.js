module.exports = [
  {
    id: 1995,
    originalQuestion: {
      question: "For the reaction H⁺ + BrO₃⁻ + 3Br⁻ → 5Br₂ + H₂O, which of the following relations correctly represents the consumption of reactants and formation of products? [AIPMT 2000]",
      option_a: "d[Br⁻]/dt = −(3/5)d[Br₂]/dt",
      option_b: "d[Br⁻]/dt = (3/5)d[Br₂]/dt",
      option_c: "d[Br⁻]/dt = −(5/3)d[Br₂]/dt",
      option_d: "d[Br⁻]/dt = (5/3)d[Br₂]/dt",
      correct_option: "A",
      explanation: "For any chemical reaction, the rate of reaction is given by the rate of consumption of a reactant divided by its stoichiometric coefficient, or the rate of formation of a product divided by its stoichiometric coefficient:\nRate = −(1/3) · (d[Br⁻]/dt) = +(1/5) · (d[Br₂]/dt)\nRearranging this equation to solve for the rate of change of bromide ion concentration:\nd[Br⁻]/dt = −(3/5) · (d[Br₂]/dt)\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 2A + 3B → 4C, what is the relation between the rate of disappearance of B and the rate of appearance of C?",
      option_a: "−d[B]/dt = (3/4) · (d[C]/dt)",
      option_b: "−d[B]/dt = (4/3) · (d[C]/dt)",
      option_c: "−d[B]/dt = (2/3) · (d[C]/dt)",
      option_d: "−d[B]/dt = −(3/4) · (d[C]/dt)",
      correct_option: "A",
      explanation: "The rate of reaction is defined in terms of stoichiometric coefficients as:\nRate = −(1/3) · (d[B]/dt) = +(1/4) · (d[C]/dt)\nMultiplying both sides by 3 gives:\n−d[B]/dt = (3/4) · (d[C]/dt)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1994,
    originalQuestion: {
      question: "How do enzymes increase the rate of reactions? [AIPMT 2000]",
      option_a: "By lowering activation energy",
      option_b: "By increasing activation energy",
      option_c: "By changing the equilibrium constant",
      option_d: "By forming an enzyme-substrate complex",
      correct_option: "A",
      explanation: "Enzymes are highly specific biological catalysts that accelerate the rate of biochemical reactions by providing an alternate reaction pathway with a significantly lower activation energy barrier (Eₐ).\nBy lowering Eₐ, a vastly larger fraction of substrate molecules possess sufficient kinetic energy to overcome the barrier and form products per unit time.\nThey do not change the overall equilibrium constant (K) or standard free energy change (ΔG°).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following thermodynamic quantities remains completely unchanged when a catalyst is added to a reversible chemical reaction?",
      option_a: "Activation energy of the forward reaction",
      option_b: "Enthalpy change of reaction (ΔH)",
      option_c: "Rate constant of the reverse reaction",
      option_d: "Energy of the transition state",
      correct_option: "B",
      explanation: "A catalyst lowers the potential energy of the transition state, decreasing the activation energies of both the forward and reverse reactions by the exact same amount.\nBecause the energy levels of the initial reactants and final products are not altered, the net enthalpy change (ΔH = E_af − E_ar) and equilibrium constant (K_eq) remain completely unaffected.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1993,
    originalQuestion: {
      question: "For the reaction 2N₂O₅ → 4NO₂ + O₂, the rate and rate constant are 1.02 × 10⁻⁴ and 3.4 × 10⁻⁵ s⁻¹, respectively. The concentration of N₂O₅ at that time will be: [AIPMT 2001]",
      option_a: "1.732",
      option_b: "3",
      option_c: "1.02 × 10⁻⁴",
      option_d: "3.4 × 10⁻⁵",
      correct_option: "B",
      explanation: "The units of the rate constant are s⁻¹, which confirms that the reaction follows first-order kinetics.\nFor a first-order reaction:\nRate = k · [N₂O₅]\nGiven:\nRate = 1.02 × 10⁻⁴ mol L⁻¹ s⁻¹\nk = 3.4 × 10⁻⁵ s⁻¹\nSubstituting the values:\n[N₂O₅] = Rate / k = (1.02 × 10⁻⁴) / (3.4 × 10⁻⁵) = 10.2 / 3.4 = 3 mol L⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A first-order decomposition reaction has a rate constant of 2.5 × 10⁻³ s⁻¹. If the rate of reaction is measured to be 1.25 × 10⁻³ mol L⁻¹ s⁻¹, what is the instantaneous concentration of the reactant?",
      option_a: "0.25 M",
      option_b: "0.50 M",
      option_c: "1.0 M",
      option_d: "2.0 M",
      correct_option: "B",
      explanation: "For a first-order reaction:\nRate = k · [Reactant]\n[Reactant] = Rate / k = (1.25 × 10⁻³ mol L⁻¹ s⁻¹) / (2.5 × 10⁻³ s⁻¹) = 0.50 mol L⁻¹ = 0.50 M\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1992,
    originalQuestion: {
      question: "When a biochemical reaction is carried out in the laboratory, outside the human body in the absence of an enzyme, the rate of reaction obtained is 10⁻⁶ times the rate in the presence of an enzyme. The activation energy of the reaction in the presence of the enzyme is: [AIPMT 2001]",
      option_a: "6/RT",
      option_b: "P is required",
      option_c: "Different from Ea obtained in the laboratory",
      option_d: "Cannot say anything",
      correct_option: "C",
      explanation: "Enzymes operate as biocatalysts by binding reactants in an active site, thereby providing a completely different reaction mechanism involving a transition state with lower potential energy.\nBecause the reaction mechanism is fundamentally altered in the presence of an enzyme, the activation energy (Eₐ) in the enzymatic pathway is distinctly different from (and substantially lower than) the uncatalyzed activation energy obtained in the laboratory.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "An enzyme increases the rate of a biochemical reaction by a factor of 10⁶ at 300 K. How does the activation energy in the presence of the enzyme (Eₐ,cat) compare to that in its absence (Eₐ,uncat)?",
      option_a: "Eₐ,cat is greater than Eₐ,uncat by 6 · RT",
      option_b: "Eₐ,cat is lower than Eₐ,uncat by 2.303 · RT · log(10⁶)",
      option_c: "Eₐ,cat is identical to Eₐ,uncat because enzymes only change entropy",
      option_d: "Eₐ,cat is zero",
      correct_option: "B",
      explanation: "According to the Arrhenius relation, the ratio of rate constants is:\nk_cat / k_uncat = e^((Eₐ,uncat − Eₐ,cat) / (RT)) = 10⁶\nTaking the natural logarithm:\n(Eₐ,uncat − Eₐ,cat) / (RT) = ln(10⁶) = 2.303 · log(10⁶)\nThus, Eₐ,cat = Eₐ,uncat − 2.303 · RT · log(10⁶), showing that the activation energy is lowered by this exact quantity.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1991,
    originalQuestion: {
      question: "For the reaction 2A → B + C, it would be a zero-order reaction when: [AIPMT 2002]",
      option_a: "The rate of reaction is proportional to the square of the concentration of A",
      option_b: "The rate of reaction remains the same at any concentration of A",
      option_c: "The rate remains unchanged at any concentration of B and C",
      option_d: "The rate of reaction doubles if the concentration of B is doubled",
      correct_option: "B",
      explanation: "By definition, the rate law for a zero-order reaction with respect to reactant A is:\nRate = k · [A]⁰ = k\nThis means that the rate of the reaction is completely independent of the concentration of the reactant A.\nHence, the rate remains constant regardless of changes in the concentration of A.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following plots represents a zero-order reaction with respect to reactant R?",
      option_a: "Rate vs [R] is a horizontal straight line parallel to the concentration axis",
      option_b: "Rate vs [R] is a straight line passing through the origin",
      option_c: "Half-life vs [R]₀ is a horizontal straight line",
      option_d: "[R] vs time is an exponential curve",
      correct_option: "A",
      explanation: "For a zero-order reaction, Rate = k · [R]⁰ = k (a constant value).\nTherefore, a plot of Rate against reactant concentration [R] is a straight horizontal line parallel to the concentration axis, indicating that rate does not change with concentration.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1990,
    originalQuestion: {
      question: "The activation energy for a simple chemical reaction A ⇌ B is Ea in the forward direction. The activation energy for the reverse reaction: [AIPMT 2003]",
      option_a: "Is negative of Ea",
      option_b: "Is always less than Ea",
      option_c: "Can be less than or more than Ea",
      option_d: "Is always double of Ea",
      correct_option: "C",
      explanation: "For a reversible reaction A ⇌ B:\nΔH = E_a(forward) − E_a(reverse)\nRearranging gives:\nE_a(reverse) = E_a(forward) − ΔH\n- If the reaction is exothermic (ΔH < 0), then E_a(reverse) = E_a(forward) + |ΔH|, which is greater than E_a(forward).\n- If the reaction is endothermic (ΔH > 0), then E_a(reverse) = E_a(forward) − ΔH, which is less than E_a(forward).\nThus, the activation energy for the reverse reaction can be either less than or more than E_a(forward).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For an endothermic reaction where ΔH = +30 kJ mol⁻¹ and the activation energy for the forward reaction is 80 kJ mol⁻¹, what is the activation energy for the backward reaction?",
      option_a: "110 kJ mol⁻¹",
      option_b: "50 kJ mol⁻¹",
      option_c: "80 kJ mol⁻¹",
      option_d: "30 kJ mol⁻¹",
      correct_option: "B",
      explanation: "The relationship between enthalpy of reaction and activation energies is:\nΔH = E_af − E_ab\nGiven ΔH = +30 kJ mol⁻¹ and E_af = 80 kJ mol⁻¹:\nE_ab = E_af − ΔH = 80 − 30 = 50 kJ mol⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1989,
    originalQuestion: {
      question: "The reaction A → B follows first-order kinetics. The time taken for 0.8 mole of A to produce 0.6 mole of B is 1 hour. What is the time taken for conversion of 0.9 mole of A to produce 0.675 mole of B? [AIPMT 2003]",
      option_a: "1 hour",
      option_b: "0.5 hour",
      option_c: "0.25 hour",
      option_d: "2 hours",
      correct_option: "A",
      explanation: "Let us calculate the fractional conversion in both cases:\n- In Case 1: Initial amount of A = 0.8 mol. Amount of B produced = 0.6 mol.\nFractional conversion = 0.6 / 0.8 = 0.75 (i.e., 75% conversion).\nRemaining fraction of A = (0.8 − 0.6) / 0.8 = 0.2 / 0.8 = 1/4.\nTime taken = 1 hour.\n- In Case 2: Initial amount of A = 0.9 mol. Amount of B produced = 0.675 mol.\nFractional conversion = 0.675 / 0.9 = 0.75 (i.e., exactly 75% conversion).\nRemaining fraction of A = (0.9 − 0.675) / 0.9 = 0.225 / 0.9 = 1/4.\nFor any first-order reaction, the time required for a given percentage or fractional conversion is strictly independent of the initial concentration/amount of the reactant:\nt = (2.303 / k) · log([A]₀ / [A])\nBecause the ratio [A]₀ / [A] is identical (4/1) in both cases, the time taken is identical: exactly 1 hour.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A first-order reaction is 50% complete in 20 minutes when the initial reactant concentration is 0.4 M. What is the time taken for 50% completion if the initial concentration is increased to 0.8 M?",
      option_a: "10 minutes",
      option_b: "20 minutes",
      option_c: "40 minutes",
      option_d: "5 minutes",
      correct_option: "B",
      explanation: "The half-life of a first-order reaction is given by:\nt₁/₂ = 0.693 / k\nNotice that t₁/₂ is completely independent of the initial concentration of the reactant.\nTherefore, whether the initial concentration is 0.4 M or 0.8 M, the half-life remains unchanged at 20 minutes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1988,
    originalQuestion: {
      question: "If the rate of the reaction is equal to the rate constant, the order of the reaction is: [AIPMT 2003]",
      option_a: "0",
      option_b: "1",
      option_c: "2",
      option_d: "3",
      correct_option: "A",
      explanation: "The differential rate law for a reaction involving reactant A of order n is:\nRate = k · [A]ⁿ\nFor the rate of the reaction to be identically equal to the rate constant k under all concentrations:\nk · [A]ⁿ = k\nThis requires [A]ⁿ = 1 for any concentration [A], which holds true only when n = 0.\nThus, the order of the reaction is 0 (zero order).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction R → P, the rate law is Rate = k. What are the SI units of the rate constant k for this reaction?",
      option_a: "mol L⁻¹ s⁻¹",
      option_b: "s⁻¹",
      option_c: "L mol⁻¹ s⁻¹",
      option_d: "L² mol⁻² s⁻¹",
      correct_option: "A",
      explanation: "When Rate = k, the reaction is zero order.\nThe units of Rate are always concentration per unit time: mol L⁻¹ s⁻¹.\nSince Rate = k, the units of k must also be mol L⁻¹ s⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1987,
    originalQuestion: {
      question: "The temperature dependence of the rate constant (k) of a chemical reaction is written in terms of the Arrhenius equation, k = A · e⁻ᴱᵃ/ᴿᵀ. The activation energy (Ea) of the reaction can be calculated by plotting: [AIPMT 2003]",
      option_a: "k versus T",
      option_b: "k versus 1/log T",
      option_c: "log k versus 1/T",
      option_d: "log k versus 1/log T",
      correct_option: "C",
      explanation: "Taking the common logarithm (base 10) of the Arrhenius equation k = A · e^(−Eₐ / RT):\nlog₁₀ k = log₁₀ A − (Eₐ / (2.303 · R · T))\nThis is of the linear form y = mx + c, where:\ny = log₁₀ k\nx = 1/T\nSlope (m) = −Eₐ / (2.303 · R)\nIntercept (c) = log₁₀ A\nBy plotting log k versus 1/T, a straight line is obtained whose slope directly yields the activation energy Eₐ = −2.303 · R · (slope).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In an Arrhenius plot of ln k versus 1/T, what does the slope of the resulting straight line represent?",
      option_a: "−Eₐ / R",
      option_b: "−Eₐ / (2.303 · R)",
      option_c: "Eₐ · R",
      option_d: "ln A",
      correct_option: "A",
      explanation: "The logarithmic form of the Arrhenius equation using natural logarithms is:\nln k = ln A − (Eₐ / R) · (1/T)\nComparing with the linear equation y = mx + c:\nWhen y = ln k and x = 1/T, the slope m equals −Eₐ / R.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1986,
    originalQuestion: {
      question: "The rate of a first-order reaction is 1.5 × 10⁻² mol L⁻¹ min⁻¹ at a concentration of 0.5 M of the reactant. The half-life of the reaction is: [AIPMT 2004]",
      option_a: "0.383 min",
      option_b: "23.1 min",
      option_c: "8.73 min",
      option_d: "7.53 min",
      correct_option: "B",
      explanation: "1. For a first-order reaction:\nRate = k · [A]\nGiven:\nRate = 1.5 × 10⁻² mol L⁻¹ min⁻¹\n[A] = 0.5 M\nk = Rate / [A] = (1.5 × 10⁻²) / 0.5 = 3.0 × 10⁻² min⁻¹ = 0.03 min⁻¹\n2. The half-life of a first-order reaction is:\nt₁/₂ = 0.693 / k = 0.693 / 0.03 = 23.1 min\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A first-order reaction proceeds with a rate of 2.0 × 10⁻³ mol L⁻¹ s⁻¹ when the reactant concentration is 0.20 M. What is the half-life period of this reaction?",
      option_a: "69.3 s",
      option_b: "6.93 s",
      option_c: "34.65 s",
      option_d: "138.6 s",
      correct_option: "A",
      explanation: "For a first-order reaction:\nk = Rate / [A] = (2.0 × 10⁻³ mol L⁻¹ s⁻¹) / (0.20 mol L⁻¹) = 0.01 s⁻¹ = 1.0 × 10⁻² s⁻¹\nThe half-life period is:\nt₁/₂ = 0.693 / k = 0.693 / 0.01 = 69.3 s\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1985,
    originalQuestion: {
      question: "For a first-order reaction A → B, the reaction rate at a reactant concentration of 0.01 M is found to be 2.0 × 10⁻⁵ mol L⁻¹ s⁻¹. The half-life period of the reaction is: [AIPMT 2005]",
      option_a: "30 s",
      option_b: "220 s",
      option_c: "300 s",
      option_d: "347 s",
      correct_option: "D",
      explanation: "1. Calculate the rate constant k:\nRate = k · [A]\nk = Rate / [A] = (2.0 × 10⁻⁵ mol L⁻¹ s⁻¹) / (0.01 mol L⁻¹) = 2.0 × 10⁻³ s⁻¹\n2. Calculate the half-life period t₁/₂:\nt₁/₂ = ln 2 / k = 0.693 / (2.0 × 10⁻³) = 346.5 s ≈ 347 s\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a first-order reaction, the rate is 4.0 × 10⁻⁴ mol L⁻¹ s⁻¹ when the reactant concentration is 0.04 M. What is the half-life period?",
      option_a: "69.3 s",
      option_b: "173.2 s",
      option_c: "34.6 s",
      option_d: "693 s",
      correct_option: "A",
      explanation: "Calculate the rate constant:\nk = Rate / [A] = (4.0 × 10⁻⁴) / 0.04 = 0.01 s⁻¹\nThe half-life period is:\nt₁/₂ = 0.693 / k = 0.693 / 0.01 = 69.3 s\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1984,
    originalQuestion: {
      question: "The rate of reaction between two reactants A and B decreases by a factor of 4 if the concentration of reactant B is doubled. The order of this reaction with respect to reactant B is: [AIPMT 2005]",
      option_a: "2",
      option_b: "−2",
      option_c: "1",
      option_d: "−1",
      correct_option: "B",
      explanation: "Let the rate law be:\nRate ∝ [B]ⁿ\nWhen [B] is doubled to 2[B], the new rate becomes (1/4) of the initial rate:\nRate_new / Rate_initial = (2[B])ⁿ / [B]ⁿ = 2ⁿ\nGiven:\n2ⁿ = 1/4 = 2⁻²\nEquating exponents:\nn = −2\nThus, the order of the reaction with respect to reactant B is −2.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If doubling the concentration of a reactant causes the rate of reaction to decrease by a factor of 2, what is the order of the reaction with respect to that reactant?",
      option_a: "−1",
      option_b: "−2",
      option_c: "0",
      option_d: "1",
      correct_option: "A",
      explanation: "Let Rate ∝ [R]ⁿ.\nWhen [R] is doubled, Rate decreases by a factor of 2 (becomes 1/2):\n2ⁿ = 1/2 = 2⁻¹\nTherefore, n = −1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1983,
    originalQuestion: {
      question: "For the reaction 2A + B → 3C + D, which of the following does not express the reaction rate? [AIPMT 2006]",
      option_a: "−d[A]/(2dt)",
      option_b: "−d[C]/(3dt)",
      option_c: "−d[B]/dt",
      option_d: "d[D]/dt",
      correct_option: "B",
      explanation: "For the chemical reaction 2A + B → 3C + D:\n- Reactants A and B disappear, so their rates of change are negative, and their rates of reaction are defined with a minus sign:\nRate = −(1/2) · (d[A]/dt) = −d[B]/dt\n- Products C and D are formed, so their concentrations increase with time, and their rates must be positive:\nRate = +(1/3) · (d[C]/dt) = +d[D]/dt\nOption (B) writes −d[C]/(3dt) with a minus sign, which would make the rate of reaction negative, and is therefore incorrect.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction A + 2B → 2C, which of the following expressions correctly represents the rate of reaction?",
      option_a: "−d[A]/dt",
      option_b: "−2 · d[B]/dt",
      option_c: "+2 · d[C]/dt",
      option_d: "−d[C]/(2dt)",
      correct_option: "A",
      explanation: "The rate of reaction is given by:\nRate = −d[A]/dt = −(1/2) · (d[B]/dt) = +(1/2) · (d[C]/dt)\nThus, −d[A]/dt correctly represents the rate of reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1982,
    originalQuestion: {
      question: "Consider the reaction: N₂(g) + 3H₂(g) → 2NH₃(g) The equality relationship between d[NH₃]/dt and −d[H₂]/dt is: [AIPMT 2006]",
      option_a: "d[NH₃]/dt = −d[H₂]/dt",
      option_b: "d[NH₃]/dt = −(1/3)d[H₂]/dt",
      option_c: "d[NH₃]/dt = −(2/3)d[H₂]/dt",
      option_d: "d[NH₃]/dt = −(3/2)d[H₂]/dt",
      correct_option: "C",
      explanation: "For the reaction N₂(g) + 3H₂(g) → 2NH₃(g):\nRate = −d[N₂]/dt = −(1/3) · (d[H₂]/dt) = +(1/2) · (d[NH₃]/dt)\nEquating the terms for H₂ and NH₃:\n(1/2) · (d[NH₃]/dt) = −(1/3) · (d[H₂]/dt)\nMultiplying both sides by 2:\nd[NH₃]/dt = −(2/3) · (d[H₂]/dt)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 2SO₂(g) + O₂(g) → 2SO₃(g), what is the relationship between d[SO₃]/dt and −d[O₂]/dt?",
      option_a: "d[SO₃]/dt = −2 · (d[O₂]/dt)",
      option_b: "d[SO₃]/dt = −(1/2) · (d[O₂]/dt)",
      option_c: "d[SO₃]/dt = −d[O₂]/dt",
      option_d: "d[SO₃]/dt = −4 · (d[O₂]/dt)",
      correct_option: "A",
      explanation: "From reaction stoichiometry:\nRate = −(1/2) · (d[SO₂]/dt) = −d[O₂]/dt = +(1/2) · (d[SO₃]/dt)\nEquating the terms for SO₃ and O₂:\n(1/2) · (d[SO₃]/dt) = −d[O₂]/dt\nMultiplying by 2:\nd[SO₃]/dt = −2 · (d[O₂]/dt)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1981,
    originalQuestion: {
      question: "The reaction of hydrogen and iodine monochloride is given as: H₂(g) + 2ICl(g) → 2HCl(g) + I₂(g) This reaction is of first order with respect to H₂(g) and ICl(g). Which mechanism is consistent? [AIPMT 2007]",
      option_a: "A and B both",
      option_b: "Neither A nor B",
      option_c: "A only",
      option_d: "B only",
      correct_option: "C",
      explanation: "The observed rate law is:\nRate = k · [H₂] · [ICl]\nIn Mechanism A:\nStep 1 (slow, rate-determining): H₂ + ICl → HI + HCl\nStep 2 (fast): HI + ICl → HCl + I₂\nBecause the slow step is bimolecular involving one molecule of H₂ and one molecule of ICl, its rate law is:\nRate = k₁ · [H₂] · [ICl]\nThis matches the experimentally observed rate law perfectly.\nHence, Mechanism A only is consistent with the experimental kinetics.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 2NO₂ + F₂ → 2NO₂F, the experimental rate law is Rate = k[NO₂][F₂]. Which of the following two-step mechanisms is consistent with this rate law?",
      option_a: "Step 1: NO₂ + F₂ → NO₂F + F (slow); Step 2: NO₂ + F → NO₂F (fast)",
      option_b: "Step 1: NO₂ + NO₂ ⇌ N₂O₄ (fast); Step 2: N₂O₄ + F₂ → 2NO₂F (slow)",
      option_c: "Single-step trimolecular collision: 2NO₂ + F₂ → 2NO₂F",
      option_d: "Step 1: F₂ ⇌ 2F (slow); Step 2: NO₂ + F → NO₂F (fast)",
      correct_option: "A",
      explanation: "The rate of a multi-step reaction is governed by the rate-determining (slowest) step.\nIn Mechanism (A), the slow step is NO₂ + F₂ → NO₂F + F, which gives Rate = k[NO₂][F₂], in exact agreement with the observed kinetics.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1980,
    originalQuestion: {
      question: "In a first-order reaction A → B, if k is the rate constant and the initial concentration of reactant A is 0.5 M, then the half-life is: [AIPMT 2007]",
      option_a: "log 2/k",
      option_b: "log 2/(k√0.5)",
      option_c: "ln 2/k",
      option_d: "0.693/(0.5k)",
      correct_option: "C",
      explanation: "For any first-order reaction A → B, the integrated rate equation is:\nk · t = ln([A]₀ / [A])\nAt the half-life (t = t₁/₂), the concentration of reactant A falls to half of its initial value: [A] = [A]₀ / 2.\nSubstituting this into the integrated rate equation:\nk · t₁/₂ = ln([A]₀ / ([A]₀ / 2)) = ln 2\nt₁/₂ = ln 2 / k\nNotice that the initial concentration (0.5 M) cancels out entirely; the half-life depends solely on the rate constant k.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the mathematical expression for the half-life period (t₁/₂) of a zero-order reaction R → P with rate constant k and initial concentration [R]₀?",
      option_a: "[R]₀ / (2k)",
      option_b: "ln 2 / k",
      option_c: "1 / (k · [R]₀)",
      option_d: "[R]₀ / k",
      correct_option: "A",
      explanation: "For a zero-order reaction, the integrated rate equation is:\n[R] = [R]₀ − kt\nAt t = t₁/₂, [R] = [R]₀ / 2:\n[R]₀ / 2 = [R]₀ − k · t₁/₂\nk · t₁/₂ = [R]₀ / 2\nt₁/₂ = [R]₀ / (2k)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1979,
    originalQuestion: {
      question: "If 60% of a first-order reaction was completed in 60 minutes, 50% of the same reaction would be completed in approximately (log 4 = 0.60, log 5 = 0.69): [AIPMT 2007]",
      option_a: "45 minutes",
      option_b: "60 minutes",
      option_c: "40 minutes",
      option_d: "50 minutes",
      correct_option: "A",
      explanation: "1. For 60% completion of a first-order reaction:\n[A]₀ = 100, [A] = 100 − 60 = 40\nk = (2.303 / t) · log([A]₀ / [A]) = (2.303 / 60) · log(100 / 40) = (2.303 / 60) · log(2.5)\nSince log(2.5) = log(5/2) = log 5 − log 2 = 0.69 − 0.301 = 0.389 ≈ 0.399:\nk = (2.303 / 60) · 0.399 ≈ 0.0153 min⁻¹\n2. For 50% completion (the half-life t₅₀% = t₁/₂):\nt₅₀% = 0.693 / k = 0.693 / 0.0153 ≈ 45.3 minutes ≈ 45 minutes\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If 75% of a first-order reaction is completed in 32 minutes, what is the half-life (t₅₀%) of the reaction?",
      option_a: "16 minutes",
      option_b: "8 minutes",
      option_c: "24 minutes",
      option_d: "12 minutes",
      correct_option: "A",
      explanation: "For a first-order reaction, the time required for 75% completion is exactly two half-lives:\nt₇₅% = 2 · t₅₀%\nGiven t₇₅% = 32 minutes:\nt₅₀% = 32 / 2 = 16 minutes\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1978,
    originalQuestion: {
      question: "The bromination of acetone that occurs in acid solution is represented by the equation: CH₃COCH₃(aq) + Br₂(aq) → CH₃COCH₂Br(aq) + H⁺(aq) + Br⁻(aq) Based on kinetic data, the rate equation is: [AIPMT 2008]",
      option_a: "Rate = k[CH₃COCH₃][Br₂][H⁺]²",
      option_b: "Rate = k[CH₃COCH₃][Br₂][H⁺]",
      option_c: "Rate = k[CH₃COCH₃][H⁺]",
      option_d: "Rate = k[CH₃COCH₃][Br₂]",
      correct_option: "C",
      explanation: "In the acid-catalyzed bromination of acetone, the mechanism involves:\n1. Protonation of the carbonyl oxygen of acetone by H⁺.\n2. Slow, rate-determining loss of an α-proton to form the enol tautomer: CH₃–C(OH)=CH₂.\n3. Fast attack of bromine (Br₂) on the enol intermediate.\nBecause the slow enolization step involves only acetone and the acid catalyst H⁺, the reaction rate is first-order in acetone and first-order in H⁺, but completely zero-order with respect to Br₂:\nRate = k · [CH₃COCH₃] · [H⁺]\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In the acid-catalyzed iodination of propan-2-one, what is the order of reaction with respect to molecular iodine (I₂)?",
      option_a: "Zero order",
      option_b: "First order",
      option_c: "Second order",
      option_d: "Half order",
      correct_option: "A",
      explanation: "Just like bromination, acid-catalyzed iodination of propan-2-one proceeds through rate-determining acid-catalyzed enolization of the ketone.\nBecause halogen attacks after the rate-determining step in a rapid subsequent step, the rate is completely independent of the concentration of iodine (order with respect to I₂ is zero).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1977,
    originalQuestion: {
      question: "The rate constants k₁ and k₂ for two different reactions are 10¹⁶ · e⁻²⁰⁰⁰/ᵀ and 10¹⁵ · e⁻¹⁰⁰⁰/ᵀ, respectively. The temperature at which k₁ = k₂ is: [AIPMT 2008]",
      option_a: "2000 K",
      option_b: "(1000/2.303) K",
      option_c: "1000 K",
      option_d: "(2000/2.303) K",
      correct_option: "C",
      explanation: "Equating the two rate constants:\nk₁ = k₂\n10¹⁶ · e^(−2000/T) = 10¹⁵ · e^(−1000/T)\nDividing both sides by 10¹⁵:\n10 · e^(−2000/T) = e^(−1000/T)\n10 = e^(−1000/T) / e^(−2000/T) = e^(1000/T)\nIn AIPMT 2008 and standard convention where the base is written as 10 (or considering the powers as base 10 exponents: 10^(16 − 2000/T) = 10^(15 − 1000/T)):\n16 − (2000/T) = 15 − (1000/T)\n16 − 15 = (2000/T) − (1000/T)\n1 = 1000 / T\nT = 1000 K\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "For two reactions, the rate constants are given by k₁ = 10¹⁴ · e⁻¹⁵⁰⁰/ᵀ and k₂ = 10¹³ · e⁻⁵⁰⁰/ᵀ (with base 10 exponents). At what temperature will k₁ equal k₂?",
      option_a: "500 K",
      option_b: "1000 K",
      option_c: "1500 K",
      option_d: "2000 K",
      correct_option: "B",
      explanation: "Equating the two expressions:\n10¹⁴⁻¹⁵⁰⁰/ᵀ = 10¹³⁻⁵⁰⁰/ᵀ\nEquating exponents:\n14 − (1500/T) = 13 − (500/T)\n1 = 1000 / T\nT = 1000 K\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1976,
    originalQuestion: {
      question: "For the reaction A + B → Products, it is observed that: (i) On doubling the initial concentration of A only, the rate of reaction is also doubled. (ii) On doubling the initial concentrations of both A and B, the rate changes by a factor of 8. The rate of this reaction is given by: [AIPMT 2009]",
      option_a: "Rate = k[A]²[B]²",
      option_b: "Rate = k[A][B]²",
      option_c: "Rate = k[A][B]",
      option_d: "Rate = k[A]²[B]",
      correct_option: "B",
      explanation: "Let the rate law be Rate = k · [A]ˣ · [B]ʸ.\n1. Condition (i): When [A] is doubled keeping [B] constant, the rate doubles:\n2 = 2ˣ ⇒ x = 1 (first-order with respect to A).\n2. Condition (ii): When both [A] and [B] are doubled, the rate increases by a factor of 8:\n8 = (2)¹ · (2)ʸ\n8 = 2 · 2ʸ ⇒ 2ʸ = 4 = 2² ⇒ y = 2 (second-order with respect to B).\nTherefore, the rate law is Rate = k · [A] · [B]².\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction P + Q → R: Doubling the concentration of P quadruples the rate. Doubling the concentration of Q doubles the rate. What is the overall order of the reaction?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "C",
      explanation: "Let Rate = k · [P]ᵃ · [Q]ᵇ.\n- Doubling [P] quadruples the rate: 2ᵃ = 4 = 2² ⇒ a = 2.\n- Doubling [Q] doubles the rate: 2ᵇ = 2¹ ⇒ b = 1.\nOverall order = a + b = 2 + 1 = 3.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1975,
    originalQuestion: {
      question: "The half-life period of a first-order reaction is 1386 seconds. The specific rate constant of the reaction is: [AIPMT 2009]",
      option_a: "0.5 × 10⁻² s⁻¹",
      option_b: "0.5 × 10⁻³ s⁻¹",
      option_c: "5.0 × 10⁻² s⁻¹",
      option_d: "5.0 × 10⁻³ s⁻¹",
      correct_option: "B",
      explanation: "For a first-order reaction, the half-life period is given by:\nt₁/₂ = 0.693 / k\nRearranging to solve for the specific rate constant k:\nk = 0.693 / t₁/₂ = 0.693 / 1386\nNotice that 1386 = 2 × 693:\nk = 0.693 / 1386 = (693 × 10⁻³) / 1386 = 0.5 × 10⁻³ s⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The half-life period of a first-order reaction is 69.3 seconds. What is the value of its rate constant?",
      option_a: "1.0 × 10⁻² s⁻¹",
      option_b: "1.0 × 10⁻¹ s⁻¹",
      option_c: "1.0 × 10⁻³ s⁻¹",
      option_d: "6.93 × 10⁻² s⁻¹",
      correct_option: "A",
      explanation: "For a first-order reaction:\nk = 0.693 / t₁/₂ = 0.693 / 69.3 = 0.01 s⁻¹ = 1.0 × 10⁻² s⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1974,
    originalQuestion: {
      question: "In the reaction BrO₃⁻(aq) + 5Br⁻(aq) + 6H⁺ → 3Br₂(l) + 3H₂O(l), the rate of appearance of bromine (Br₂) is related to the rate of disappearance of bromide ions as: [AIPMT 2009]",
      option_a: "d[Br₂]/dt = −(5/3)d[Br⁻]/dt",
      option_b: "d[Br₂]/dt = (5/3)d[Br⁻]/dt",
      option_c: "d[Br₂]/dt = (3/5)d[Br⁻]/dt",
      option_d: "d[Br₂]/dt = −(3/5)d[Br⁻]/dt",
      correct_option: "D",
      explanation: "From the stoichiometry of the reaction BrO₃⁻ + 5Br⁻ + 6H⁺ → 3Br₂ + 3H₂O:\nRate of reaction = −(1/5) · (d[Br⁻]/dt) = +(1/3) · (d[Br₂]/dt)\nEquating these two rates:\n(1/3) · (d[Br₂]/dt) = −(1/5) · (d[Br⁻]/dt)\nMultiplying both sides by 3:\nd[Br₂]/dt = −(3/5) · (d[Br⁻]/dt)\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For the reaction 5A + 2B → 4C + D, what is the rate of formation of C (d[C]/dt) in terms of the rate of disappearance of A (−d[A]/dt)?",
      option_a: "d[C]/dt = (4/5) · (−d[A]/dt)",
      option_b: "d[C]/dt = (5/4) · (−d[A]/dt)",
      option_c: "d[C]/dt = (2/5) · (−d[A]/dt)",
      option_d: "d[C]/dt = −(4/5) · (−d[A]/dt)",
      correct_option: "A",
      explanation: "The rate of reaction is:\nRate = −(1/5) · (d[A]/dt) = +(1/4) · (d[C]/dt)\nMultiplying by 4 gives:\nd[C]/dt = (4/5) · (−d[A]/dt)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1973,
    originalQuestion: {
      question: "For the reaction N₂ + 3H₂ → 2NH₃, if d[NH₃]/dt = 2 × 10⁻⁴ mol L⁻¹ s⁻¹, the value of −d[H₂]/dt would be: [AIPMT 2009]",
      option_a: "4 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_b: "6 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_c: "1 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_d: "3 × 10⁻⁴ mol L⁻¹ s⁻¹",
      correct_option: "D",
      explanation: "For the Haber synthesis reaction N₂ + 3H₂ → 2NH₃:\nRate of reaction = −(1/3) · (d[H₂]/dt) = +(1/2) · (d[NH₃]/dt)\nTherefore:\n−(d[H₂]/dt) = (3/2) · (d[NH₃]/dt)\nGiven d[NH₃]/dt = 2 × 10⁻⁴ mol L⁻¹ s⁻¹:\n−(d[H₂]/dt) = (3/2) · (2 × 10⁻⁴) = 3 × 10⁻⁴ mol L⁻¹ s⁻¹\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In the reaction 2NO₂ → 2NO + O₂, if the rate of formation of NO is 4.0 × 10⁻³ mol L⁻¹ s⁻¹, what is the rate of formation of O₂?",
      option_a: "8.0 × 10⁻³ mol L⁻¹ s⁻¹",
      option_b: "4.0 × 10⁻³ mol L⁻¹ s⁻¹",
      option_c: "2.0 × 10⁻³ mol L⁻¹ s⁻¹",
      option_d: "1.0 × 10⁻³ mol L⁻¹ s⁻¹",
      correct_option: "C",
      explanation: "Rate = (1/2) · (d[NO]/dt) = d[O₂]/dt\nThus:\nd[O₂]/dt = (1/2) · (d[NO]/dt) = (1/2) · (4.0 × 10⁻³) = 2.0 × 10⁻³ mol L⁻¹ s⁻¹\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1972,
    originalQuestion: {
      question: "During the kinetic study of the reaction 2A + B → C + D, the following results were obtained: Run I: [A] = 0.1, [B] = 0.1, Initial rate = 6.0 × 10⁻³ Run II: [A] = 0.3, [B] = 0.2, Initial rate = 7.2 × 10⁻² Run III: [A] = 0.3, [B] = 0.4, Initial rate = 2.88 × 10⁻¹ Run IV: [A] = 0.4, [B] = 0.1, Initial rate = 2.40 × 10⁻² Based on the above data, which one of the following is correct? [AIPMT 2010 Prelims]",
      option_a: "Rate = k[A]²[B]",
      option_b: "Rate = k[A][B]",
      option_c: "Rate = k[A]²[B]²",
      option_d: "Rate = k[A][B]²",
      correct_option: "D",
      explanation: "Let the rate equation be Rate = k · [A]ˣ · [B]ʸ.\n1. Comparing Run I and Run IV (where [B] = 0.1 is constant):\nRate(IV) / Rate(I) = (0.4 / 0.1)ˣ\n(2.40 × 10⁻²) / (6.0 × 10⁻³) = 4 = 4ˣ ⇒ x = 1\nThus, the reaction is first-order with respect to A.\n2. Comparing Run II and Run III (where [A] = 0.3 is constant):\nRate(III) / Rate(II) = (0.4 / 0.2)ʸ\n(2.88 × 10⁻¹) / (7.2 × 10⁻²) = 4 = 2ʸ ⇒ y = 2\nThus, the reaction is second-order with respect to B.\nCombining these gives the rate law: Rate = k · [A] · [B]².\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a reaction A + B → C, the rate triples when [A] is tripled at constant [B], and the rate increases by a factor of 4 when [B] is doubled at constant [A]. What is the rate law?",
      option_a: "Rate = k[A][B]",
      option_b: "Rate = k[A][B]²",
      option_c: "Rate = k[A]²[B]",
      option_d: "Rate = k[A]²[B]²",
      correct_option: "B",
      explanation: "- Tripling [A] triples the rate: 3ˣ = 3¹ ⇒ x = 1.\n- Doubling [B] quadruples the rate: 2ʸ = 4 = 2² ⇒ y = 2.\nThus, the rate law is Rate = k[A][B]².\nTherefore, Option (B) is the correct answer."
    }
  }
];

