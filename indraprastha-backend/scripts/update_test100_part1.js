const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3676,
    similarQuestion: {
      question: "For a reaction A → Products, which of the following mathematical expressions can be used to determine the reaction order 'n' with respect to reactant A?\n(1) n = [log(r₁) − log(r₂)] / [log[A]₁ − log[A]₂], where r₁ and r₂ are initial rates at concentrations [A]₁ and [A]₂.\n(2) n = 1 + [log(t_1/2(1) / t_1/2(2))] / [log([A]₂(0) / [A]₁(0))], using half-life dependency on initial concentration.\n(3) For a zero-order reaction: [A]_t = [A]₀ − kt.",
      option_a: "(1) only",
      option_b: "(2) and (3) only",
      option_c: "(1), (2), and (3) are all valid methods",
      option_d: "None of the above expressions can give the reaction order",
      correct_option: "C",
      explanation: "1. From differential rate law: r₁ = k[A]₁ⁿ and r₂ = k[A]₂ⁿ => r₁/r₂ = ([A]₁/[A]₂)ⁿ => n = [log(r₁) − log(r₂)] / [log[A]₁ − log[A]₂]. 2. From half-life relation: t_1/2 ∝ 1 / [A]₀ⁿ⁻¹ => t_1/2(1) / t_1/2(2) = ([A]₂(0) / [A]₁(0))ⁿ⁻¹ => n = 1 + [log(t_1/2(1)/t_1/2(2))] / [log([A]₂(0)/[A]₁(0))]. 3. For zero-order (n = 0), integration yields [A]_t = [A]₀ − kt. All three are valid. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3677,
    similarQuestion: {
      question: "According to the Maxwell-Boltzmann distribution of molecular speeds for ideal gases, which of the following statements is/are correct?\n(1) At a constant temperature, a heavier gas (greater molar mass M) exhibits a narrower distribution curve shifted toward lower speeds.\n(2) For a given gas, increasing the absolute temperature shifts the peak (most probable speed) toward higher speeds and broadens the distribution curve.\n(3) The total area under the distribution curve represents the total fraction of molecules and remains constant (equal to unity) regardless of temperature.",
      option_a: "(1), (2), and (3) are all correct",
      option_b: "(1) and (2) only",
      option_c: "(2) and (3) only",
      option_d: "(1) only",
      correct_option: "A",
      explanation: "In Maxwell-Boltzmann distribution: (1) v_mp = √(2RT/M); heavier gas has lower speeds, shifting peak left with narrower profile; (2) Increasing T increases v_mp and broadens the distribution curve; (3) The area under the curve is normalized to 1 and remains constant at all temperatures. Thus, all three statements are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3678,
    similarQuestion: {
      question: "The general SI unit of the rate constant (k) for an n-th order chemical reaction expressed in terms of molar concentration (mol L⁻¹) and time (s) is:",
      option_a: "mol^(1−n) L^(n−1) s⁻¹",
      option_b: "mol^n L^(−n) s⁻¹",
      option_c: "mol^(n−1) L^(1−n) s⁻¹",
      option_d: "L^n mol^(−n) s⁻¹",
      correct_option: "A",
      explanation: "Rate = k × [Concentration]ⁿ => k = Rate / [Concentration]ⁿ = (mol L⁻¹ s⁻¹) / (mol L⁻¹)ⁿ = (mol L⁻¹)^(1−n) s⁻¹ = mol^(1−n) L^(n−1) s⁻¹. For n = 0, mol L⁻¹ s⁻¹; for n = 1, s⁻¹; for n = 2, mol⁻¹ L s⁻¹. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3679,
    similarQuestion: {
      question: "Which of the following statements regarding the molecularity and order of complex (multi-step) chemical reactions is correct?\n(1) Molecularity is defined only for individual elementary steps and has no physical meaning for the overall complex reaction.\n(2) The molecularity of an elementary step is always a non-zero positive integer (1, 2, or rarely 3) and can never be zero, negative, or fractional.\n(3) If the slowest (rate-determining) step involves no prior equilibria or reaction intermediates, the order of the overall reaction equals the molecularity of the slowest step.",
      option_a: "(1), (2), and (3) are all correct",
      option_b: "(1) and (2) only",
      option_c: "(2) and (3) only",
      option_d: "(1) and (3) only",
      correct_option: "A",
      explanation: "1. Molecularity is the number of reactant particles colliding simultaneously in an elementary step; for an overall complex reaction it has no meaning. 2. Molecularity is always a whole number (1, 2, 3) and can never be 0 or fractional. 3. When the slowest step contains only initial reactants, its molecularity equals the overall reaction order. All three are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3753,
    similarQuestion: {
      question: "For a gaseous reaction 2A(g) → B(g) occurring at temperature T (in Kelvin), the rate of reaction can be expressed either in terms of partial pressures (p_A in atm) or molar concentrations (C_A in mol L⁻¹):\nRate (in atm s⁻¹) = k_p × (p_A)²\nRate (in mol L⁻¹ s⁻¹) = k_c × (C_A)²\nAssuming ideal gas behavior (p_A = C_A RT), what is the relationship between the rate constants k_c and k_p?",
      option_a: "k_c = k_p",
      option_b: "k_c = k_p × RT",
      option_c: "k_c = k_p / RT",
      option_d: "k_c = k_p × (RT)²",
      correct_option: "B",
      explanation: "1. p_A = C_A RT. 2. Rate (in mol L⁻¹ s⁻¹) = (1 / RT) × Rate (in atm s⁻¹). 3. k_c (C_A)² = (1 / RT) × [k_p (C_A RT)²] = (1 / RT) × [k_p (C_A)² (RT)²] = k_p RT (C_A)². 4. Hence, k_c = k_p × RT. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3754,
    similarQuestion: {
      question: "According to the Arrhenius equation, k = A e^(−E_a / RT), which of the following statements correctly describe the dependence of the rate constant (k) on temperature and activation energy?\n(1) The rate constant increases exponentially with an increase in absolute temperature (T).\n(2) The rate constant increases exponentially with a decrease in activation energy (E_a).\n(3) A plot of ln(k) versus (1/T) yields a straight line with a slope equal to (−E_a / R).",
      option_a: "(1) only",
      option_b: "(1) and (2) only",
      option_c: "(1), (2), and (3) are all correct",
      option_d: "(3) only",
      correct_option: "C",
      explanation: "From k = A e^(−E_a / RT): (1) As T increases, −E_a/RT becomes less negative, so k increases exponentially; (2) Decreasing E_a increases the fraction of molecules with E >= E_a, increasing k exponentially; (3) ln(k) = ln(A) − (E_a/R)(1/T), plotting ln(k) vs 1/T yields a straight line with slope = −E_a/R. All three are correct. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3755,
    similarQuestion: {
      question: "For a zero-order chemical reaction A(g) → 2B(g) with rate constant k = 0.05 mol L⁻¹ min⁻¹, if the initial concentration of reactant A is [A]₀ = 0.50 M, calculate the time required for complete consumption of A (t_completion) and its half-life (t_1/2).",
      option_a: "t_completion = 5 min, t_1/2 = 2.5 min",
      option_b: "t_completion = 20 min, t_1/2 = 10 min",
      option_c: "t_completion = 10 min, t_1/2 = 5 min",
      option_d: "t_completion = 15 min, t_1/2 = 7.5 min",
      correct_option: "C",
      explanation: "1. For zero-order reaction, [A]_t = [A]₀ − kt. 2. For complete consumption ([A]_t = 0): t_completion = [A]₀ / k = 0.50 M / 0.05 M min⁻¹ = 10 min. 3. Half-life: t_1/2 = [A]₀ / 2k = 0.50 / (2 × 0.05) = 5 min. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3756,
    similarQuestion: {
      question: "For a first-order gaseous decomposition reaction A(g) → B(g) + C(g), the initial pressure of A is P₀ = 100 mm Hg. After 20 minutes, the total pressure of the gas mixture is 150 mm Hg. What will be the total pressure in the vessel after 40 minutes?",
      option_a: "200 mm Hg",
      option_b: "150 mm Hg",
      option_c: "180 mm Hg",
      option_d: "175 mm Hg",
      correct_option: "D",
      explanation: "1. Total pressure = (P₀ − x) + x + x = P₀ + x. At t = 20 min: 150 = 100 + x => x = 50 mm Hg. Remaining A = 100 − 50 = 50 mm Hg = P₀/2, so t_1/2 = 20 min. 2. At t = 40 min (2 half-lives): P_A = P₀/4 = 25 mm Hg => x' = 100 − 25 = 75 mm Hg. 3. Total pressure = 100 + 75 = 175 mm Hg. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3757,
    similarQuestion: {
      question: "The acid-catalyzed hydrolysis of an organic ester follows the rate law: Rate = k [ester] [H⁺], where the second-order rate constant is k = 0.02 M⁻¹ hr⁻¹. If the reaction is carried out in an aqueous buffer maintaining a constant [H⁺] = 0.05 M with an initial ester concentration of 0.01 M, what is the half-life (t_1/2) of the ester?",
      option_a: "346.5 hours",
      option_b: "500 hours",
      option_c: "693 hours",
      option_d: "1386 hours",
      correct_option: "C",
      explanation: "1. H⁺ is a catalyst so its concentration is constant ([H⁺] = 0.05 M). 2. Rate = k' [ester], where k' = k [H⁺] = 0.02 × 0.05 = 0.001 hr⁻¹ = 1.0 × 10⁻³ hr⁻¹ (pseudo-first order). 3. t_1/2 = ln(2) / k' = 0.693 / 0.001 hr⁻¹ = 693 hours. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3758,
    similarQuestion: {
      question: "For a complex multi-step chemical reaction:\nStep 1: A ⇌ 2B (fast, with forward rate constant k₁ and reverse rate constant k₋₁)\nStep 2: B + C → D (slow rate-determining step, with rate constant k₂)\nThe overall rate constant is k_overall = k₂ (k₁ / k₋₁)^(1/2). If the activation energies for step 1 forward, step 1 reverse, and step 2 are E_a1 = 60 kJ mol⁻¹, E_a,-1 = 20 kJ mol⁻¹, and E_a2 = 40 kJ mol⁻¹ respectively, what is the overall activation energy (E_a,overall) of the reaction?",
      option_a: "80 kJ mol⁻¹",
      option_b: "60 kJ mol⁻¹",
      option_c: "40 kJ mol⁻¹",
      option_d: "120 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. k_overall = k₂ (k₁/k₋₁)^(1/2) => ln(k_overall) = ln(k₂) + 1/2 ln(k₁) − 1/2 ln(k₋₁). 2. Differentiating with respect to T gives: E_a,overall = E_a2 + 1/2 (E_a1 − E_a,-1). 3. Substitute values: E_a,overall = 40 + 1/2(60 − 20) = 40 + 20 = 60 kJ mol⁻¹. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3759,
    similarQuestion: {
      question: "For the first-order thermal decomposition of a gaseous compound A(g) → B(g) + C(g), a linear plot of ln[A]_t versus time t (in seconds) gives a straight line with a slope of −2.31 × 10⁻³ s⁻¹. What is the rate constant (k) and half-life (t_1/2) of this reaction?",
      option_a: "k = 1.0 × 10⁻³ s⁻¹, t_1/2 = 693 s",
      option_b: "k = 4.62 × 10⁻³ s⁻¹, t_1/2 = 150 s",
      option_c: "k = 2.31 × 10⁻³ s⁻¹, t_1/2 = 300 s",
      option_d: "k = 2.31 × 10⁻³ s⁻¹, t_1/2 = 600 s",
      correct_option: "C",
      explanation: "1. Integrated rate law for first-order reaction: ln[A]_t = ln[A]₀ − kt. Plotting ln[A]_t vs t yields slope = −k. 2. k = −slope = 2.31 × 10⁻³ s⁻¹. 3. t_1/2 = 0.693 / k = 0.693 / (2.31 × 10⁻³ s⁻¹) = 300 s. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3760,
    similarQuestion: {
      question: "For the reaction A + B → Products, the following initial rate data were obtained at 300 K:\nExperiment 1: [A] = 0.10 M, [B] = 0.10 M, Initial Rate = 2.0 × 10⁻⁴ M s⁻¹\nExperiment 2: [A] = 0.20 M, [B] = 0.10 M, Initial Rate = 4.0 × 10⁻⁴ M s⁻¹\nExperiment 3: [A] = 0.20 M, [B] = 0.20 M, Initial Rate = 8.0 × 10⁻⁴ M s⁻¹\nWhat is the value and unit of the rate constant (k)?",
      option_a: "2.0 × 10⁻² s⁻¹",
      option_b: "4.0 × 10⁻² M⁻¹ s⁻¹",
      option_c: "2.0 × 10⁻² M⁻¹ s⁻¹",
      option_d: "1.0 × 10⁻³ M⁻² s⁻¹",
      correct_option: "C",
      explanation: "1. Comparing Exp 1 & 2: doubling [A] doubles rate => order w.r.t A = 1. Comparing Exp 2 & 3: doubling [B] doubles rate => order w.r.t B = 1. Rate = k[A][B]. 2. k = Rate / ([A][B]) = (2.0 × 10⁻⁴ M s⁻¹) / (0.10 M × 0.10 M) = 2.0 × 10⁻² M⁻¹ s⁻¹. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3761,
    similarQuestion: {
      question: "For a radioactive decay process following first-order kinetics with decay constant λ, what is the numerical value of the product of the decay constant and its half-life (λ × t_1/2)?",
      option_a: "2.303",
      option_b: "1.000",
      option_c: "0.301",
      option_d: "0.693 (ln 2)",
      correct_option: "D",
      explanation: "Radioactive decay obeys first-order kinetics: N_t = N₀ e^(−λt). When t = t_1/2, N_t = N₀/2 => e^(λ t_1/2) = 2 => λ × t_1/2 = ln(2) ≈ 0.693. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3762,
    similarQuestion: {
      question: "Consider the elementary bimolecular reaction: 2NO₂(g) → 2NO(g) + O₂(g). Which of the following statements is/are correct?\n(1) The differential rate of reaction can be written as: Rate = −¹/₂ d[NO₂]/dt = +¹/₂ d[NO]/dt = +d[O₂]/dt.\n(2) The rate of disappearance of NO₂ is twice the rate of appearance of O₂.\n(3) The overall order of an elementary reaction is equal to its molecularity.",
      option_a: "(1), (2), and (3) are all correct",
      option_b: "(1) and (2) only",
      option_c: "(2) and (3) only",
      option_d: "(1) only",
      correct_option: "A",
      explanation: "1. Rate divided by stoichiometry: Rate = −¹/₂ d[NO₂]/dt = +¹/₂ d[NO]/dt = +d[O₂]/dt. 2. −d[NO₂]/dt = 2 × (d[O₂]/dt). 3. For an elementary reaction, molecularity equals order. All three are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3763,
    similarQuestion: {
      question: "Which of the following statements regarding chemical kinetics is incorrect?",
      option_a: "The Arrhenius pre-exponential frequency factor (A) has the universal unit of s⁻¹ for all reaction orders",
      option_b: "The rate constant (k) of a chemical reaction is independent of the initial concentrations of reactants",
      option_c: "A zero-order reaction cannot be an elementary single-step reaction and must be a complex reaction",
      option_d: "The unit of the pre-exponential factor (A) is identical to the unit of the rate constant (k) for that specific reaction order",
      correct_option: "A",
      explanation: "In Arrhenius equation k = A e^(−E_a / RT), the exponential factor is dimensionless, so A has the exact same unit as k. For a second-order reaction, the unit of k and A is L mol⁻¹ s⁻¹, not s⁻¹. Therefore, statement (A) is incorrect. Therefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in successfully.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/test-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated Test 100 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Test 100 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
