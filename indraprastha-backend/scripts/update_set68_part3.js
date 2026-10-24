const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart3 = [
  {
    id: 3860,
    similarQuestion: {
      question: "For a zero-order reaction P → Q, the rate constant is 1.5 × 10⁻³ mol L⁻¹ s⁻¹. If the initial concentration of P is 4.0 M, what is the concentration of product Q formed after 10 minutes?",
      option_a: "0.90 M",
      option_b: "0.45 M",
      option_c: "1.80 M",
      option_d: "3.10 M",
      correct_option: "A",
      explanation: "Step 1: For a zero-order reaction, the amount of product formed in time t is:\n[Q] = k × t\n\nStep 2: Convert time to seconds:\nt = 10 minutes = 10 × 60 s = 600 seconds.\n\nStep 3: Calculate product concentration:\n[Q] = (1.5 × 10⁻³ mol L⁻¹ s⁻¹) × 600 s = 0.90 M.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3861,
    similarQuestion: {
      question: "When the initial concentration of a reactant is quadrupled, the half-life period of the reaction remains completely unchanged. The order of the reaction is:",
      option_a: "First order",
      option_b: "Zero order",
      option_c: "Second order",
      option_d: "Fractional order",
      correct_option: "A",
      explanation: "Step 1: The general dependence of half-life on initial concentration [A]₀ is:\nt₁/₂ ∝ 1 / [A]₀^(n − 1)\n\nStep 2: When n = 1 (first-order reaction):\nt₁/₂ ∝ [A]₀⁰ = constant (independent of [A]₀).\n\nStep 3: Hence, any reaction whose half-life is invariant with initial concentration is of first order.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3862,
    similarQuestion: {
      question: "The activation energy (E_a) of a chemical reaction can be determined experimentally from the slope of which graphical plot?",
      option_a: "ln k versus 1/T",
      option_b: "ln k versus T",
      option_c: "k versus 1/T",
      option_d: "log k versus T",
      correct_option: "A",
      explanation: "Step 1: The Arrhenius equation in logarithmic form is:\nln k = ln A − (E_a / R) × (1 / T)\n\nStep 2: A plot of ln k on the y-axis against (1/T) on the x-axis gives a straight line.\nStep 3: The slope of this line is Slope = −E_a / R, from which E_a = −(Slope) × R is directly calculated.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3863,
    similarQuestion: {
      question: "For an exothermic reversible reaction at equilibrium, let K_p1 and K_p2 be the equilibrium constants at temperatures T₁ and T₂, respectively. If T₂ > T₁, which relation is correct?",
      option_a: "K_p1 > K_p2",
      option_b: "K_p1 < K_p2",
      option_c: "K_p1 = K_p2",
      option_d: "K_p1 × K_p2 = 1",
      correct_option: "A",
      explanation: "Step 1: The van 't Hoff isochore is given by:\nln(K_p2 / K_p1) = (ΔH° / R) × (1/T₁ − 1/T₂)\n\nStep 2: For an exothermic reaction, ΔH° < 0.\nStep 3: Since T₂ > T₁, (1/T₁ − 1/T₂) > 0. Multiplying by negative ΔH° makes ln(K_p2 / K_p1) < 0, which means K_p2 < K_p1 (or K_p1 > K_p2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3864,
    similarQuestion: {
      question: "If the activation energy for the forward reaction (E_a,fwd) is strictly equal to the activation energy for the backward reaction (E_a,rev), the enthalpy change (ΔH) of the reaction is:",
      option_a: "ΔH = 0",
      option_b: "ΔH > 0",
      option_c: "ΔH < 0",
      option_d: "ΔH = E_a,fwd",
      correct_option: "A",
      explanation: "Step 1: The enthalpy change of a reaction equals the difference between forward and reverse activation energies:\nΔH = E_a(fwd) − E_a(rev)\n\nStep 2: If E_a(fwd) = E_a(rev):\nΔH = E_a(fwd) − E_a(fwd) = 0.\n\nStep 3: The reaction is athermic (neither exothermic nor endothermic).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3865,
    similarQuestion: {
      question: "The rate constant of a reaction doubles when the temperature increases from 300 K to 310 K. What is the activation energy (E_a) of the reaction? (Take R = 8.314 J K⁻¹ mol⁻¹ and log 2 = 0.3010)",
      option_a: "53.6 kJ mol⁻¹",
      option_b: "26.8 kJ mol⁻¹",
      option_c: "107.2 kJ mol⁻¹",
      option_d: "34.7 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Use the integrated Arrhenius equation:\nlog(k₂ / k₁) = [E_a / (2.303 R)] × [(T₂ − T₁) / (T₁ × T₂)]\n\nStep 2: Substitute k₂/k₁ = 2, T₁ = 300 K, T₂ = 310 K:\n0.3010 = [E_a / (2.303 × 8.314)] × [10 / (300 × 310)]\n0.3010 = [E_a / 19.147] × [10 / 93000]\n\nStep 3: Solve for E_a:\nE_a = (0.3010 × 19.147 × 93000) / 10 ≈ 53,598 J mol⁻¹ ≈ 53.6 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3866,
    similarQuestion: {
      question: "Statement I: The rate of a zero-order reaction is completely independent of temperature.\nStatement II: The half-life of a zero-order reaction is independent of the initial concentration of the reactant.",
      option_a: "Both Statement I and Statement II are incorrect",
      option_b: "Both Statement I and Statement II are correct",
      option_c: "Statement I is correct but Statement II is incorrect",
      option_d: "Statement I is incorrect but Statement II is correct",
      correct_option: "A",
      explanation: "Step 1: For a zero-order reaction, Rate = k. The rate constant k increases with temperature according to Arrhenius equation k = A e^(−E_a/RT). Hence, the rate does depend on temperature (Statement I is false).\nStep 2: For zero order, t₁/₂ = [A]₀ / (2k), which is directly proportional to initial concentration [A]₀ (Statement II is false).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3867,
    similarQuestion: {
      question: "Match the order of reaction in Column-I with the corresponding units of its rate constant in Column-II:\nColumn-I:\n(i) Zero order\n(ii) First order\n(iii) Second order\nColumn-II:\n(a) s⁻¹\n(b) L mol⁻¹ s⁻¹\n(c) mol L⁻¹ s⁻¹",
      option_a: "(i)-(c), (ii)-(a), (iii)-(b)",
      option_b: "(i)-(a), (ii)-(b), (iii)-(c)",
      option_c: "(i)-(b), (ii)-(a), (iii)-(c)",
      option_d: "(i)-(c), (ii)-(b), (iii)-(a)",
      correct_option: "A",
      explanation: "Step 1: General formula for units of rate constant is (mol L⁻¹)^(1 − n) s⁻¹.\nStep 2: For n = 0 (zero order): mol L⁻¹ s⁻¹ => (i)-(c).\nStep 3: For n = 1 (first order): s⁻¹ => (ii)-(a).\nStep 4: For n = 2 (second order): L mol⁻¹ s⁻¹ => (iii)-(b).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3868,
    similarQuestion: {
      question: "For a first-order reaction with rate constant k, which of the following statements is INCORRECT?",
      option_a: "The half-life period decreases when the initial reactant concentration is decreased",
      option_b: "The time required for 75% completion is equal to twice the half-life period (t_75% = 2 × t_50%)",
      option_c: "The concentration of reactant decreases exponentially with time",
      option_d: "A plot of log [A] versus time is linear with slope = −k / 2.303",
      correct_option: "A",
      explanation: "Step 1: For a first-order reaction, t₁/₂ = 0.693 / k.\nStep 2: The half-life is strictly independent of the initial concentration of the reactant.\nStep 3: Thus, stating that t₁/₂ decreases with lower initial concentration is entirely incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3869,
    similarQuestion: {
      question: "Assertion (A): For a first-order reaction A → Products, the reaction rate is numerically equal to the rate constant when [A] = 1.0 mol L⁻¹.\nReason (R): The rate constant of a chemical reaction is defined as the specific reaction rate when the concentration of each reactant is unity.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: The rate law is Rate = k [A]^n.\nStep 2: By definition, the rate constant (k) is called the specific reaction rate because when all reactant concentrations are set to 1.0 mol L⁻¹, Rate = k(1)^n = k.\nStep 3: Hence, for a first-order reaction at [A] = 1.0 M, Rate = k, and Reason (R) provides the exact scientific definition and explanation for Assertion (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3870,
    similarQuestion: {
      question: "Statement I: A catalyst does not alter the equilibrium constant (K_eq) of a reversible chemical reaction.\nStatement II: A catalyst accelerates both forward and backward reactions by lowering the activation energy barrier by the same magnitude.",
      option_a: "Both Statement I and Statement II are correct, and Statement II explains Statement I",
      option_b: "Both Statement I and Statement II are correct, but Statement II does not explain Statement I",
      option_c: "Statement I is correct but Statement II is incorrect",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "A",
      explanation: "Step 1: K_eq is the ratio of rate constants: K_eq = k_fwd / k_rev.\nStep 2: A catalyst lowers the activation energy of forward and backward reactions by the identical amount (ΔE_a).\nStep 3: Consequently, both k_fwd and k_rev increase by the exact same factor, leaving the ratio K_eq = k_fwd / k_rev unchanged while accelerating the attainment of equilibrium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3871,
    similarQuestion: {
      question: "For an endothermic reversible reaction with activation energies E_a(fwd) and E_a(rev), which relationship is correct?",
      option_a: "E_a(fwd) > E_a(rev)",
      option_b: "E_a(fwd) < E_a(rev)",
      option_c: "E_a(fwd) = E_a(rev)",
      option_d: "E_a(rev) = 0",
      correct_option: "A",
      explanation: "Step 1: The enthalpy change of a reaction is given by:\nΔH = E_a(fwd) − E_a(rev)\n\nStep 2: For an endothermic reaction, heat is absorbed, so ΔH > 0.\nStep 3: Therefore:\nE_a(fwd) − E_a(rev) > 0  =>  E_a(fwd) > E_a(rev).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3872,
    similarQuestion: {
      question: "Which of the following statements about the molecularity and order of a reaction are correct?\n(a) Order is an experimentally determined quantity that can be fractional or zero.\n(b) Molecularity can never be zero or a non-integer fraction.\n(c) Molecularity is meaningful for complex multistep reactions.\n(d) Order of an elementary reaction is equal to its molecularity.",
      option_a: "(a), (b), and (d) are correct",
      option_b: "(a) and (c) are correct",
      option_c: "(b) and (c) are correct",
      option_d: "(c) and (d) are correct",
      correct_option: "A",
      explanation: "Step 1: Order is experimentally found from rate data and can be 0, integer, or fraction (Statement a is correct).\nStep 2: Molecularity is the number of reactant particles colliding simultaneously in an elementary step; it must be an integer (1, 2, 3) and cannot be 0 or fractional (Statement b is correct).\nStep 3: Molecularity has no meaning for complex reactions, only for elementary steps (Statement c is false).\nStep 4: For single-step elementary reactions, stoichiometric coefficients match the reaction orders (Statement d is correct).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3873,
    similarQuestion: {
      question: "Assertion (A): For a zero-order reaction, the time required for 60% completion is exactly three times the time required for 20% completion (t_60% = 3 × t_20%).\nReason (R): A zero-order reaction proceeds at a constant rate that is independent of the reactant concentration.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: For a zero-order reaction, x = k × t, where x is the amount of reactant converted.\nStep 2: Thus, t_x% = (x% × [A]₀) / k, meaning time is strictly proportional to the percentage of reaction completed (t ∝ % completion).\nStep 3: Hence, t_60% / t_20% = 60 / 20 = 3.\nStep 4: This linear relationship exists precisely because the rate is uniform and constant throughout the reaction. Thus, Reason (R) correctly explains Assertion (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3874,
    similarQuestion: {
      question: "Which of the following graphical representations corresponds to a first-order chemical reaction?",
      option_a: "A linear plot of ln [A] versus time with a negative slope",
      option_b: "A linear plot of 1/[A] versus time with a positive slope",
      option_c: "A linear plot of [A] versus time with a negative slope",
      option_d: "A horizontal line for rate versus [A]",
      correct_option: "A",
      explanation: "Step 1: Integrated rate law for first-order reaction:\nln [A] = ln [A]₀ − kt\n\nStep 2: Comparing with y = mx + c, a plot of ln [A] against t gives a straight line with slope = −k and y-intercept = ln [A]₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3875,
    similarQuestion: {
      question: "According to the Arrhenius equation k = A × e^(−E_a/RT), which of the following modifications will increase the value of the rate constant k?",
      option_a: "Increasing the temperature (T) or decreasing the activation energy (E_a)",
      option_b: "Decreasing the temperature (T) or increasing the activation energy (E_a)",
      option_c: "Decreasing the temperature while keeping E_a constant",
      option_d: "Increasing both E_a and T such that E_a/T remains constant",
      correct_option: "A",
      explanation: "Step 1: In k = A e^(−E_a/RT), the exponent is negative: −E_a / (RT).\nStep 2: Increasing T decreases the magnitude of E_a / (RT), making the negative exponent less negative, which increases e^(−E_a/RT) and k.\nStep 3: Decreasing E_a (e.g., via a catalyst) also makes −E_a / (RT) less negative, increasing k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3876,
    similarQuestion: {
      question: "A first-order reaction has a half-life of 30 minutes. What is the time required for the reactant concentration to fall to 25% of its initial value?",
      option_a: "60 minutes",
      option_b: "90 minutes",
      option_c: "45 minutes",
      option_d: "120 minutes",
      correct_option: "A",
      explanation: "Step 1: In a first-order reaction, each successive half-life reduces the remaining reactant concentration by 50%.\nStep 2: From 100% to 50% requires 1 half-life (30 min).\nStep 3: From 50% to 25% requires a second half-life (30 min).\nStep 4: Total time = 2 × 30 min = 60 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3877,
    similarQuestion: {
      question: "A radioactive isotope has a half-life of 8 hours. Starting with an initial sample of 80 g, what mass of the isotope decays during the second 8-hour period (from t = 8 h to t = 16 h)?",
      option_a: "20 g",
      option_b: "40 g",
      option_c: "10 g",
      option_d: "60 g",
      correct_option: "A",
      explanation: "Step 1: At t = 0, initial mass = 80 g.\nStep 2: At t = 8 h (1 half-life), remaining mass = 80 / 2 = 40 g.\nStep 3: At t = 16 h (2 half-lives), remaining mass = 40 / 2 = 20 g.\nStep 4: Mass decayed specifically between t = 8 h and t = 16 h is 40 g − 20 g = 20 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3878,
    similarQuestion: {
      question: "For a reaction A + B → C, the rate equation is Rate = k [A]² [B]. By what factor does the reaction rate increase if the volume of the reaction vessel is reduced to one-third of its initial volume?",
      option_a: "27 times",
      option_b: "9 times",
      option_c: "3 times",
      option_d: "81 times",
      correct_option: "A",
      explanation: "Step 1: Concentration is inversely proportional to volume: C = n / V.\nStep 2: When volume is compressed to V / 3, the concentrations of both gaseous reactants triple: [A]' = 3[A] and [B]' = 3[B].\nStep 3: Substitute into rate law:\nRate' = k (3[A])² (3[B]) = k (9 [A]²) (3 [B]) = 27 × k [A]² [B] = 27 × Rate.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3879,
    similarQuestion: {
      question: "In the Maxwell-Boltzmann distribution of molecular speeds/energies, what happens when the temperature of a gas is raised?",
      option_a: "The peak shifts to higher energy and the fraction of molecules with the most probable energy decreases as the curve broadens",
      option_b: "The peak shifts to lower energy and becomes sharper",
      option_c: "The peak stays at the same energy while area under the curve increases",
      option_d: "The fraction of molecules with the most probable energy increases",
      correct_option: "A",
      explanation: "Step 1: As temperature increases, the average molecular kinetic energy increases, shifting the distribution peak (most probable kinetic energy) to the right (higher energy).\nStep 2: Because the total area under the curve (representing total fraction of molecules = 1) must remain constant, the peak flattens and broadens.\nStep 3: Hence, the fraction of molecules possessing the most probable energy decreases while the high-energy tail dramatically increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3880,
    similarQuestion: {
      question: "In the presence of a positive catalyst, which of the following is true for both the forward and reverse directions of a reversible reaction?",
      option_a: "Activation energy decreases by the same amount in both directions, and the reaction rate increases in both directions",
      option_b: "Activation energy decreases only for the forward reaction",
      option_c: "Activation energy decreases only for the reverse reaction",
      option_d: "Enthalpy change ΔH increases",
      correct_option: "A",
      explanation: "Step 1: A catalyst lowers the transition-state energy barrier equally relative to reactants and products.\nStep 2: Consequently, activation energy is reduced by the exact same amount in both forward and reverse directions (ΔE_a,fwd = ΔE_a,rev).\nStep 3: The rates of both forward and reverse reactions increase by the identical factor, leaving equilibrium position unaltered.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 68 Part 3.');

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
    console.log('Set 68 Part 3 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 68 Part 3:', err.message);
  }
}

run();
