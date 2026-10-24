const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart2 = [
  {
    id: 3838,
    similarQuestion: {
      question: "For the rate law Rate = k [A] [B]², if the initial concentration of B is doubled while that of A is kept constant, the initial reaction rate will:",
      option_a: "Increase by a factor of 4",
      option_b: "Increase by a factor of 2",
      option_c: "Increase by a factor of 8",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "Step 1: Write the initial rate expression: Rate₁ = k [A] [B]².\nStep 2: When [B] is doubled to 2[B] at constant [A]:\nRate₂ = k [A] (2[B])² = 4 k [A] [B]² = 4 × Rate₁.\nStep 3: Hence, the reaction rate increases by a factor of 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3839,
    similarQuestion: {
      question: "Assertion (A): Some radical recombination reactions proceed with zero activation energy.\nReason (R): Activation energy is the minimum additional energy required by reactant molecules to reach the activated complex threshold.",
      option_a: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_b: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: Radical combinations (such as 2CH₃· → C₂H₆ or 2Cl· → Cl₂) involve pairing of unpaired electrons with no bonds to break; hence, they have zero activation energy (Assertion A is true).\nStep 2: Activation energy by definition is the additional energy that reactants must acquire to cross the threshold energy barrier (Reason R is true).\nStep 3: However, Reason R merely defines activation energy and does not explain why radicals specifically combine without an energy barrier. Thus, R is not the explanation of A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3840,
    similarQuestion: {
      question: "For the reaction 2A + 4B → 3C + 5D, the rate of formation of C is 0.060 mol L⁻¹ s⁻¹. What is the overall rate of reaction and the total concentration of B consumed in 20 seconds?",
      option_a: "Rate = 0.020 mol L⁻¹ s⁻¹ and [B] consumed = 1.60 mol L⁻¹",
      option_b: "Rate = 0.060 mol L⁻¹ s⁻¹ and [B] consumed = 0.80 mol L⁻¹",
      option_c: "Rate = 0.030 mol L⁻¹ s⁻¹ and [B] consumed = 2.40 mol L⁻¹",
      option_d: "Rate = 0.015 mol L⁻¹ s⁻¹ and [B] consumed = 1.20 mol L⁻¹",
      correct_option: "A",
      explanation: "Step 1: Overall rate of reaction:\nRate = +(1/3) d[C]/dt = (1/3) × 0.060 = 0.020 mol L⁻¹ s⁻¹.\n\nStep 2: Rate of consumption of B:\n−d[B]/dt = 4 × Rate = 4 × 0.020 = 0.080 mol L⁻¹ s⁻¹.\n\nStep 3: Concentration of B consumed in 20 seconds:\nΔ[B] = 0.080 mol L⁻¹ s⁻¹ × 20 s = 1.60 mol L⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3841,
    similarQuestion: {
      question: "Which pair of kinetic plots correctly illustrates a zero-order and a first-order reaction, respectively?",
      option_a: "For zero order: [A] versus time is a straight line with negative slope; for first order: t₁/₂ versus initial concentration [A]₀ is a horizontal line",
      option_b: "For zero order: ln [A] versus time is linear; for first order: [A] versus time is linear",
      option_c: "For zero order: t₁/₂ is independent of [A]₀; for first order: t₁/₂ is proportional to [A]₀",
      option_d: "For zero order: rate versus [A] is a straight line through origin; for first order: rate is independent of [A]",
      correct_option: "A",
      explanation: "Step 1: For a zero-order reaction, [A] = [A]₀ − kt. Plotting [A] versus t gives a straight line with slope = −k.\nStep 2: For a first-order reaction, t₁/₂ = 0.693 / k. Because t₁/₂ is independent of initial concentration [A]₀, plotting t₁/₂ versus [A]₀ yields a horizontal straight line.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3842,
    similarQuestion: {
      question: "A first-order reaction A → Products has an initial reactant concentration of 0.20 M, which drops to 0.0020 M after 10 minutes. What is the rate constant (k) of the reaction?",
      option_a: "0.4606 min⁻¹",
      option_b: "0.2303 min⁻¹",
      option_c: "0.9212 min⁻¹",
      option_d: "0.0461 min⁻¹",
      correct_option: "A",
      explanation: "Step 1: Integrated rate equation for a first-order reaction:\nk = (2.303 / t) log([A]₀ / [A])\n\nStep 2: Substitute t = 10 min, [A]₀ = 0.20 M, and [A] = 0.0020 M:\nk = (2.303 / 10) log(0.20 / 0.0020) = 0.2303 log(100)\n\nStep 3: Since log(100) = 2:\nk = 0.2303 × 2 = 0.4606 min⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3843,
    similarQuestion: {
      question: "For the exothermic reaction X → Y, the activation energy of the forward reaction is 50 kJ mol⁻¹ and the enthalpy change (ΔH) is −30 kJ mol⁻¹. What is the activation energy of the reverse reaction (Y → X)?",
      option_a: "80 kJ mol⁻¹",
      option_b: "20 kJ mol⁻¹",
      option_c: "50 kJ mol⁻¹",
      option_d: "30 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Enthalpy change is related to forward and reverse activation energies by:\nΔH = E_a(forward) − E_a(reverse)\n\nStep 2: Rearrange to solve for E_a(reverse):\nE_a(reverse) = E_a(forward) − ΔH\n\nStep 3: Substitute E_a(forward) = 50 kJ mol⁻¹ and ΔH = −30 kJ mol⁻¹:\nE_a(reverse) = 50 − (−30) = 50 + 30 = 80 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3844,
    similarQuestion: {
      question: "The slope of an Arrhenius plot (ln k versus 1/T) for a gas-phase decomposition is −8.0 × 10³ K. What is the activation energy of the reaction? (R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "66.5 kJ mol⁻¹",
      option_b: "96.2 kJ mol⁻¹",
      option_c: "41.5 kJ mol⁻¹",
      option_d: "133.0 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: According to the Arrhenius equation: ln k = ln A − (E_a / R) × (1 / T).\nStep 2: The slope of the plot ln k versus 1/T is:\nSlope = −E_a / R\n\nStep 3: Calculate activation energy:\nE_a = −(Slope) × R = −(−8.0 × 10³ K) × (8.314 J K⁻¹ mol⁻¹) = 66,512 J mol⁻¹ ≈ 66.5 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3845,
    similarQuestion: {
      question: "Increasing the concentration of reacting molecules at a fixed temperature leads to an increase in the reaction rate primarily because it increases the:",
      option_a: "Collision frequency per unit volume",
      option_b: "Activation energy of the reaction",
      option_c: "Threshold energy of the molecules",
      option_d: "Standard enthalpy change of reaction",
      correct_option: "A",
      explanation: "Step 1: At constant temperature, the fraction of molecules possessing energy greater than or equal to E_a (e^(−E_a/RT)) remains constant.\nStep 2: Increasing reactant concentration packs more molecules into unit volume, which increases the total number of collisions occurring per unit volume per second (collision frequency, Z).\nStep 3: This directly increases the effective collision rate without changing E_a or ΔH.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3846,
    similarQuestion: {
      question: "The rate constant for a first-order reaction is 2.303 × 10⁻³ s⁻¹. How much time is required for the reactant concentration to fall from 1.0 M to 0.10 M?",
      option_a: "1000 seconds",
      option_b: "500 seconds",
      option_c: "2000 seconds",
      option_d: "230 seconds",
      correct_option: "A",
      explanation: "Step 1: Use first-order integrated rate law:\nt = (2.303 / k) log([A]₀ / [A])\n\nStep 2: Substitute [A]₀ = 1.0 M, [A] = 0.10 M, and k = 2.303 × 10⁻³ s⁻¹:\nt = [2.303 / (2.303 × 10⁻³ s⁻¹)] × log(1.0 / 0.10)\n\nStep 3: Since log(10) = 1:\nt = 1000 × 1 = 1000 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3847,
    similarQuestion: {
      question: "In the Arrhenius collision theory rate equation Rate = Z_AB × e^(−E_a/RT), the term Z_AB represents:",
      option_a: "The collision frequency of reacting molecules A and B per unit volume per second",
      option_b: "The steric orientation factor",
      option_c: "The fraction of molecules having energy greater than E_a",
      option_d: "The average kinetic energy of the molecules",
      correct_option: "A",
      explanation: "Step 1: In collision theory of bimolecular gas reactions, Z_AB denotes the collision frequency, which is the number of collisions between reactant molecules A and B per second per unit volume of the reaction mixture.\nStep 2: The exponential term e^(−E_a/RT) represents the Boltzmann fraction of collisions possessing kinetic energy equal to or greater than activation energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3848,
    similarQuestion: {
      question: "A zero-order reaction has an initial reactant concentration of 0.080 M and a half-life of 400 seconds. What is the rate constant (k)?",
      option_a: "1.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_b: "2.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_c: "5.0 × 10⁻⁵ mol L⁻¹ s⁻¹",
      option_d: "4.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      correct_option: "A",
      explanation: "Step 1: For a zero-order reaction, t₁/₂ = [A]₀ / (2k).\nStep 2: Rearrange for k:\nk = [A]₀ / (2 × t₁/₂)\n\nStep 3: Substitute [A]₀ = 0.080 M and t₁/₂ = 400 s:\nk = 0.080 / (2 × 400) = 0.080 / 800 = 1.0 × 10⁻⁴ mol L⁻¹ s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3849,
    similarQuestion: {
      question: "For a first-order chemical reaction with rate constant k, the time required for 90% completion of the reaction is expressed as:",
      option_a: "t = 2.303 / k",
      option_b: "t = 4.606 / k",
      option_c: "t = 0.693 / k",
      option_d: "t = 6.909 / k",
      correct_option: "A",
      explanation: "Step 1: For 90% completion, initial amount is 100 and remaining amount is 100 − 90 = 10.\nStep 2: Integrated first-order equation:\nt = (2.303 / k) log(100 / 10) = (2.303 / k) log(10)\nStep 3: Since log(10) = 1:\nt = 2.303 / k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3850,
    similarQuestion: {
      question: "For the gas-phase synthesis of sulfur trioxide: 2SO₂(g) + O₂(g) → 2SO₃(g), which relation correctly equates the rate of reaction in terms of different species?",
      option_a: "−(1/2) d[SO₂]/dt = −d[O₂]/dt = +(1/2) d[SO₃]/dt",
      option_b: "−2 d[SO₂]/dt = −d[O₂]/dt = +2 d[SO₃]/dt",
      option_c: "−d[SO₂]/dt = −(1/2) d[O₂]/dt = +d[SO₃]/dt",
      option_d: "+d[SO₂]/dt = +d[O₂]/dt = −d[SO₃]/dt",
      correct_option: "A",
      explanation: "Step 1: By chemical kinetics convention, reaction rate is the rate of change of concentration divided by stoichiometric coefficient, with negative signs for reactants and positive signs for products.\nStep 2: For 2SO₂ + O₂ → 2SO₃:\nRate = −(1/2) d[SO₂]/dt = −(1/1) d[O₂]/dt = +(1/2) d[SO₃]/dt.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3851,
    similarQuestion: {
      question: "If the initial concentration of a reactant is increased by a factor of 3 in a zero-order reaction, how does its half-life period (t₁/₂) change?",
      option_a: "It increases by a factor of 3",
      option_b: "It decreases to 1/3 of its initial value",
      option_c: "It remains unchanged",
      option_d: "It increases by a factor of 9",
      correct_option: "A",
      explanation: "Step 1: The half-life of a zero-order reaction is given by:\nt₁/₂ = [A]₀ / (2k)\nStep 2: Notice that t₁/₂ is directly proportional to initial concentration [A]₀ (t₁/₂ ∝ [A]₀).\nStep 3: Therefore, tripling [A]₀ will triple the half-life period.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3852,
    similarQuestion: {
      question: "Which of the following statements correctly distinguishes a first-order reaction from a second-order reaction?",
      option_a: "The half-life of a first-order reaction is independent of initial concentration, whereas that of a second-order reaction is inversely proportional to initial concentration",
      option_b: "A first-order reaction has units of mol L⁻¹ s⁻¹, whereas a second-order reaction has units of s⁻¹",
      option_c: "The rate of a first-order reaction is constant, whereas a second-order reaction rate decreases",
      option_d: "First-order reactions require a catalyst, whereas second-order reactions do not",
      correct_option: "A",
      explanation: "Step 1: For a first-order reaction, t₁/₂ = 0.693 / k, which is strictly independent of [A]₀.\nStep 2: For a second-order reaction (with single reactant), t₁/₂ = 1 / (k [A]₀), which is inversely proportional to [A]₀.\nStep 3: This concentration dependence of half-life is a fundamental distinguishing hallmark.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3853,
    similarQuestion: {
      question: "For the reaction A₂ + B → products, the proposed mechanism is:\nA₂ ⇌ 2A (fast equilibrium, K_eq)\nA + B → products (slow, k₂)\nThe overall order of the reaction is:",
      option_a: "1.5",
      option_b: "2",
      option_c: "1",
      option_d: "2.5",
      correct_option: "A",
      explanation: "Step 1: The rate-determining step gives:\nRate = k₂ [A] [B].\n\nStep 2: From the fast equilibrium:\nK_eq = [A]² / [A₂]  =>  [A] = K_eq^(1/2) [A₂]^(1/2).\n\nStep 3: Substitute [A] into the rate law:\nRate = k₂ K_eq^(1/2) [A₂]^(1/2) [B] = k [A₂]^(0.5) [B]¹.\n\nStep 4: Overall order = 0.5 + 1.0 = 1.5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3854,
    similarQuestion: {
      question: "A first-order reaction has a rate constant k = 2.0 × 10⁻² s⁻¹. How much time is required for the reactant amount to decrease from 40 g to 10 g?",
      option_a: "69.3 seconds",
      option_b: "138.6 seconds",
      option_c: "34.65 seconds",
      option_d: "230.3 seconds",
      correct_option: "A",
      explanation: "Step 1: Calculate the half-life t₁/₂:\nt₁/₂ = 0.693 / k = 0.693 / (2.0 × 10⁻² s⁻¹) = 34.65 seconds.\n\nStep 2: The decay from 40 g to 10 g corresponds to:\n40 g → 20 g (1 half-life) → 10 g (2 half-lives).\n\nStep 3: Total time t = 2 × t₁/₂ = 2 × 34.65 s = 69.3 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3855,
    similarQuestion: {
      question: "For the reaction 2A + B → C, doubling the concentrations of both A and B increases the initial reaction rate by a factor of 4. When the concentration of B is doubled while keeping [A] constant, the rate doubles. What is the order of the reaction with respect to reactant A?",
      option_a: "1",
      option_b: "2",
      option_c: "0",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: Let Rate = k [A]^x [B]^y.\nStep 2: When [B] doubles at constant [A], rate doubles: (2)^y = 2  =>  y = 1.\nStep 3: When both [A] and [B] double, rate increases by 4: (2)^x × (2)^y = 4  =>  (2)^x × 2 = 4  =>  (2)^x = 2  =>  x = 1.\nStep 4: Hence, the order with respect to A is 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3856,
    similarQuestion: {
      question: "For the reaction aA + bB → cC, the relationship between rates of concentration change is: −d[A]/dt = −2 {d[B]/dt} = +(1/3) {d[C]/dt}. What is the stoichiometric ratio a : b : c in simplest whole numbers?",
      option_a: "2 : 1 : 6",
      option_b: "1 : 2 : 3",
      option_c: "6 : 3 : 1",
      option_d: "2 : 4 : 3",
      correct_option: "A",
      explanation: "Step 1: Let the general reaction rate be r. Then:\n−d[A]/dt = a × r, −d[B]/dt = b × r, and d[C]/dt = c × r.\n\nStep 2: Substitute these into the given equality:\na × r = 2 (b × r) = (1/3) (c × r)\n\nStep 3: Equating coefficients:\na = 2b and c = 3a = 6b.\nTaking b = 1 gives a = 2 and c = 6.\nThus, the stoichiometric ratio a : b : c = 2 : 1 : 6.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3857,
    similarQuestion: {
      question: "The catalytic decomposition of phosphine (PH₃) on a tungsten surface is first order at low pressure but shifts to zero order at high pressure. At low pressure, the reaction is first order because:",
      option_a: "The surface coverage by adsorbed phosphine molecules is fractional and directly proportional to the gas pressure",
      option_b: "The metal surface becomes completely saturated with phosphine",
      option_c: "The rate constant changes with pressure",
      option_d: "Phosphine undergoes bimolecular collision in the gas phase",
      correct_option: "A",
      explanation: "Step 1: According to the Langmuir adsorption isotherm, surface fraction covered (θ) at low pressure is θ = k × P (directly proportional to pressure).\nStep 2: Because the reaction rate on the catalyst is proportional to surface coverage (Rate ∝ θ), at low pressure Rate ∝ P¹ (first order).\nStep 3: At high pressure, θ reaches maximum saturation (θ ≈ 1), rendering the rate independent of pressure (zero order).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3858,
    similarQuestion: {
      question: "For a first-order reaction, the rate is 0.10 mol L⁻¹ s⁻¹ at 10 seconds and 0.050 mol L⁻¹ s⁻¹ at 30 seconds after starting. What is the rate constant (k) of the reaction?",
      option_a: "0.0347 s⁻¹",
      option_b: "0.0693 s⁻¹",
      option_c: "0.0173 s⁻¹",
      option_d: "0.0500 s⁻¹",
      correct_option: "A",
      explanation: "Step 1: For a first-order reaction, Rate = k [A].\nStep 2: The rate decreases by half (from 0.10 to 0.050) over a time span of Δt = 30 s − 10 s = 20 s.\nStep 3: Thus, the half-life t₁/₂ = 20 seconds.\nStep 4: Calculate rate constant k:\nk = 0.693 / t₁/₂ = 0.693 / 20 s = 0.03465 s⁻¹ ≈ 0.0347 s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3859,
    similarQuestion: {
      question: "Which of the following kinetic parameters is altered by the addition of a positive catalyst to a reacting system?",
      option_a: "Activation energy of the reaction",
      option_b: "Standard Gibbs free energy change (ΔG°)",
      option_c: "Equilibrium constant (K_eq)",
      option_d: "Standard enthalpy change (ΔH°)",
      correct_option: "A",
      explanation: "Step 1: A positive catalyst provides an alternate transition state of lower energy, thereby reducing the activation energy (E_a) of both the forward and reverse reactions.\nStep 2: Thermodynamic state functions (such as ΔG°, ΔH°, and equilibrium constant K_eq) depend only on initial and final states and remain completely unaltered by a catalyst.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 68 Part 2.');

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
    console.log('Set 68 Part 2 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 68 Part 2:', err.message);
  }
}

run();
