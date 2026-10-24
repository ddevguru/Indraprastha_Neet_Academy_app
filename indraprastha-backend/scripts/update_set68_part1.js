const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 3816,
    similarQuestion: {
      question: "For the reaction 2NO₂(g) + F₂(g) → 2NO₂F(g), how is the rate of formation of NO₂F related to the rate of disappearance of F₂?",
      option_a: "d[NO₂F]/dt = −2 {d[F₂]/dt}",
      option_b: "d[NO₂F]/dt = −0.5 {d[F₂]/dt}",
      option_c: "d[NO₂F]/dt = −{d[F₂]/dt}",
      option_d: "d[NO₂F]/dt = −4 {d[F₂]/dt}",
      correct_option: "A",
      explanation: "Step 1: Express the general reaction rate using stoichiometry:\nRate = −(1/2) d[NO₂]/dt = −d[F₂]/dt = +(1/2) d[NO₂F]/dt.\n\nStep 2: Equate the rate of consumption of F₂ to the rate of formation of NO₂F:\n−d[F₂]/dt = (1/2) d[NO₂F]/dt\n\nStep 3: Solve for d[NO₂F]/dt:\nd[NO₂F]/dt = 2 × (−d[F₂]/dt) = −2 {d[F₂]/dt}.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3817,
    similarQuestion: {
      question: "For a hypothetical reaction 2X + Y → Z, doubling the concentration of X increases the reaction rate by a factor of 8, while tripling the concentration of Y has no effect on the rate. The differential rate law is:",
      option_a: "Rate = k [X]³",
      option_b: "Rate = k [X]² [Y]",
      option_c: "Rate = k [X] [Y]³",
      option_d: "Rate = k [X]³ [Y]",
      correct_option: "A",
      explanation: "Step 1: Let the general rate law be Rate = k [X]^x [Y]^y.\nStep 2: When [X] is doubled, the rate increases by 8 times: (2)^x = 8 = 2³  =>  x = 3.\nStep 3: When [Y] is tripled, the rate is unaffected: (3)^y = 1 = 3⁰  =>  y = 0.\nStep 4: Combining both exponents gives Rate = k [X]³ [Y]⁰ = k [X]³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3818,
    similarQuestion: {
      question: "Consider the thermal decomposition of ozone: 2O₃(g) → 3O₂(g) with the proposed mechanism:\nStep 1: O₃ ⇌ O₂ + O (fast equilibrium, K_eq)\nStep 2: O + O₃ → 2O₂ (slow, rate-determining, k₂)\nWhat is the overall order of the reaction?",
      option_a: "1",
      option_b: "2",
      option_c: "0",
      option_d: "1.5",
      correct_option: "A",
      explanation: "Step 1: The rate is governed by the slow rate-determining step:\nRate = k₂ [O] [O₃].\n\nStep 2: From the fast equilibrium in Step 1:\nK_eq = ([O₂] [O]) / [O₃]  =>  [O] = K_eq [O₃] / [O₂].\n\nStep 3: Substitute [O] into the rate expression:\nRate = k₂ K_eq [O₃]² [O₂]⁻¹ = k [O₃]² [O₂]⁻¹.\n\nStep 4: The overall order is the algebraic sum of the exponents:\nOverall order = 2 + (−1) = 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3819,
    similarQuestion: {
      question: "The half-life of a zero-order reaction is 200 seconds when the initial reactant concentration is 0.050 mol L⁻¹. What is the rate constant (k) of this reaction?",
      option_a: "1.25 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_b: "2.50 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_c: "5.00 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_d: "6.25 × 10⁻⁵ mol L⁻¹ s⁻¹",
      correct_option: "A",
      explanation: "Step 1: For a zero-order reaction, the half-life is given by:\nt₁/₂ = [A]₀ / (2k)\n\nStep 2: Rearrange to solve for the rate constant k:\nk = [A]₀ / (2 × t₁/₂)\n\nStep 3: Substitute [A]₀ = 0.050 mol L⁻¹ and t₁/₂ = 200 s:\nk = 0.050 / (2 × 200) = 0.050 / 400 = 1.25 × 10⁻⁴ mol L⁻¹ s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3820,
    similarQuestion: {
      question: "A first-order reaction takes 40 minutes for 99% completion. What is the time required for 99.9% of the reaction to be completed?",
      option_a: "60 minutes",
      option_b: "80 minutes",
      option_c: "50 minutes",
      option_d: "120 minutes",
      correct_option: "A",
      explanation: "Step 1: Express t(99%) using the integrated first-order rate law:\nt(99%) = (2.303 / k) log(100 / 1) = (2.303 / k) × 2.\n\nStep 2: Express t(99.9%):\nt(99.9%) = (2.303 / k) log(1000 / 1) = (2.303 / k) × 3.\n\nStep 3: Take the ratio:\nt(99.9%) / t(99%) = 3 / 2 = 1.5.\n\nStep 4: Calculate t(99.9%):\nt(99.9%) = 1.5 × 40 min = 60 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3821,
    similarQuestion: {
      question: "The rate of a first-order reaction is 0.080 mol L⁻¹ s⁻¹ at 15 seconds after initiation and drops to 0.040 mol L⁻¹ s⁻¹ at 35 seconds. What is the half-life period (t₁/₂) of this reaction?",
      option_a: "20 seconds",
      option_b: "10 seconds",
      option_c: "40 seconds",
      option_d: "13.86 seconds",
      correct_option: "A",
      explanation: "Step 1: In a first-order reaction, Rate = k [A]. Thus, Rate is directly proportional to concentration.\nStep 2: When the reaction rate falls from 0.080 to 0.040 mol L⁻¹ s⁻¹, it has dropped to half of its value.\nStep 3: Consequently, the concentration of the reactant has also halved in the time interval from 15 s to 35 s.\nStep 4: Therefore, the half-life period is t₁/₂ = 35 s − 15 s = 20 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3822,
    similarQuestion: {
      question: "For the gaseous first-order decomposition reaction: A(g) → 2B(g) + C(g), the initial pressure of A is P₀ and the total pressure of the gas mixture at time t is P_t. Which expression gives the rate constant k?",
      option_a: "k = (2.303 / t) log [2P₀ / (3P₀ − P_t)]",
      option_b: "k = (2.303 / t) log [P₀ / (2P₀ − P_t)]",
      option_c: "k = (2.303 / t) log [P₀ / (P_t − P₀)]",
      option_d: "k = (2.303 / t) log [3P₀ / (P_t + P₀)]",
      correct_option: "A",
      explanation: "Step 1: Set up partial pressures at time t:\nA(g) → 2B(g) + C(g)\nInitial: P₀, 0, 0\nAt time t: P₀ − x, 2x, x\n\nStep 2: Relate total pressure P_t:\nP_t = (P₀ − x) + 2x + x = P₀ + 2x  =>  x = (P_t − P₀) / 2.\n\nStep 3: Partial pressure of A remaining:\nP_A = P₀ − x = P₀ − (P_t − P₀) / 2 = (3P₀ − P_t) / 2.\n\nStep 4: Substitute into first-order integrated equation:\nk = (2.303 / t) log (P₀ / P_A) = (2.303 / t) log [2P₀ / (3P₀ − P_t)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3823,
    similarQuestion: {
      question: "Assertion (A): The standard enthalpy change (ΔH°) of a chemical reaction is unaffected by the presence of a catalyst.\nReason (R): A catalyst provides an alternate reaction pathway with lower activation energy without altering the potential energy of either reactants or products.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: Enthalpy of reaction is a state function defined as ΔH = H_products − H_reactants.\nStep 2: A catalyst acts kinetically by providing a reaction path with a lower activation energy barrier, lowering both forward and reverse activation energies by the exact same amount.\nStep 3: Because the energies of initial reactants and final products remain unchanged, ΔH° is completely unchanged by a catalyst. Thus, Reason (R) correctly explains Assertion (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3824,
    similarQuestion: {
      question: "A plot of ln k versus 1/T for a chemical reaction yields a straight line with a slope of −1.20 × 10⁴ K. What is the activation energy (E_a) of the reaction? (Take R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "99.8 kJ mol⁻¹",
      option_b: "144.3 kJ mol⁻¹",
      option_c: "49.9 kJ mol⁻¹",
      option_d: "83.1 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: The logarithmic Arrhenius equation is:\nln k = ln A − (E_a / R) × (1 / T)\n\nStep 2: Comparing with y = mx + c, the slope is:\nSlope = −E_a / R\n\nStep 3: Solve for E_a:\nE_a = −(Slope) × R = −(−1.20 × 10⁴ K) × 8.314 J K⁻¹ mol⁻¹ = 99,768 J mol⁻¹ ≈ 99.8 kJ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3825,
    similarQuestion: {
      question: "Statement I: Effective collisions in collision theory require reacting molecules to possess kinetic energy equal to or greater than the threshold energy as well as proper steric orientation.\nStatement II: Threshold energy equals activation energy plus the average energy already possessed by reactant molecules.",
      option_a: "Both Statement I and Statement II are correct",
      option_b: "Statement I is correct but Statement II is incorrect",
      option_c: "Statement I is incorrect but Statement II is correct",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "A",
      explanation: "Step 1: According to collision theory, for a collision to be fruitful, reacting species must overcome an energy barrier (threshold energy) and collide with suitable orientation to allow bond rearrangements (Statement I is correct).\nStep 2: Threshold energy is defined as the minimum energy necessary for reactants to transform into products, which equals the initial average energy of the reactants plus the activation energy (E_threshold = E_reactants + E_a) (Statement II is correct).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3826,
    similarQuestion: {
      question: "An aqueous solution of sodium chloride (NaCl, molar mass = 58.5 g mol⁻¹) has a molarity of 2.0 M and a density of 1.08 g mL⁻¹. What is the molality of the solution?",
      option_a: "2.08 m",
      option_b: "1.85 m",
      option_c: "2.50 m",
      option_d: "2.22 m",
      correct_option: "A",
      explanation: "Step 1: Take 1 L (1000 mL) of solution:\nMass of solution = 1000 mL × 1.08 g mL⁻¹ = 1080 g.\n\nStep 2: Calculate mass of NaCl solute in 1 L:\nMass of NaCl = 2.0 mol × 58.5 g mol⁻¹ = 117 g.\n\nStep 3: Calculate mass of solvent (water):\nMass of water = 1080 g − 117 g = 963 g = 0.963 kg.\n\nStep 4: Calculate molality:\nMolality m = (moles of solute) / (mass of solvent in kg) = 2.0 / 0.963 ≈ 2.08 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3827,
    similarQuestion: {
      question: "An ideal solution is prepared by mixing liquid A and liquid B in a 1 : 4 molar ratio. At 300 K, the pure vapour pressures of A and B are 200 mmHg and 400 mmHg, respectively. What is the total vapour pressure of the solution?",
      option_a: "360 mmHg",
      option_b: "320 mmHg",
      option_c: "250 mmHg",
      option_d: "380 mmHg",
      correct_option: "A",
      explanation: "Step 1: Calculate the mole fractions:\nx_A = 1 / (1 + 4) = 0.20\nx_B = 4 / (1 + 4) = 0.80\n\nStep 2: Apply Raoult's law for total vapour pressure:\nP_total = x_A P°_A + x_B P°_B\n\nStep 3: Substitute given vapour pressures:\nP_total = (0.20 × 200 mmHg) + (0.80 × 400 mmHg) = 40 + 320 = 360 mmHg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3828,
    similarQuestion: {
      question: "When chloroform and acetone are mixed, the resulting non-ideal solution displays a negative deviation from Raoult's law. This behavior occurs because:",
      option_a: "Intermolecular attractive forces between chloroform and acetone (A–B) are stronger than those between pure components (A–A and B–B) due to hydrogen bonding",
      option_b: "Chloroform and acetone repel each other",
      option_c: "The mixing process is endothermic with ΔH_mix > 0",
      option_d: "The total volume increases upon mixing (ΔV_mix > 0)",
      correct_option: "A",
      explanation: "Step 1: Negative deviation from Raoult's law arises when solute-solvent (A–B) interactions are stronger than solute-solute (A–A) and solvent-solvent (B–B) interactions.\nStep 2: When chloroform (CHCl₃) is mixed with acetone (CH₃COCH₃), a strong hydrogen bond forms between the acidic proton of chloroform and the carbonyl oxygen of acetone.\nStep 3: This lowers escaping tendency and vapor pressure, leading to ΔH_mix < 0 and ΔV_mix < 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3829,
    similarQuestion: {
      question: "Statement I: The lowering of vapour pressure upon adding a non-volatile solute to a liquid solvent is a colligative property that depends solely on the number of solute particles.\nStatement II: According to Raoult's law, the relative lowering of vapour pressure (ΔP / P°) is equal to the mole fraction of the non-volatile solute (x_solute).",
      option_a: "Both Statement I and Statement II are correct",
      option_b: "Statement I is correct but Statement II is incorrect",
      option_c: "Statement I is incorrect but Statement II is correct",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "A",
      explanation: "Step 1: Colligative properties depend only on the number ratio of solute to solvent particles, not on chemical identity. Lowering of vapour pressure is one such fundamental property (Statement I is correct).\nStep 2: By Raoult's law, P_solvent = x_solvent × P° = (1 − x_solute) × P°  =>  (P° − P_solvent) / P° = x_solute (Statement II is correct).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3830,
    similarQuestion: {
      question: "What mass of a non-volatile solute (molar mass = 60 g mol⁻¹) must be dissolved in 180 g of water (molar mass = 18 g mol⁻¹) to reduce its vapour pressure by 10%?",
      option_a: "66.7 g",
      option_b: "33.3 g",
      option_c: "18.0 g",
      option_d: "54.0 g",
      correct_option: "A",
      explanation: "Step 1: A 10% reduction in vapour pressure means relative lowering is:\nΔP / P° = 0.10 = n₂ / (n₁ + n₂)\n\nStep 2: Calculate moles of solvent water n₁:\nn₁ = 180 g / 18 g mol⁻¹ = 10 mol.\n\nStep 3: Solve for moles of solute n₂:\n0.10 = n₂ / (10 + n₂)  =>  1.0 + 0.10 n₂ = n₂  =>  0.90 n₂ = 1.0  =>  n₂ = 1 / 0.90 = 1.111 mol.\n\nStep 4: Calculate mass of solute:\nMass = 1.111 mol × 60 g mol⁻¹ ≈ 66.7 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3831,
    similarQuestion: {
      question: "When 1.80 g of a non-volatile organic compound is dissolved in 90.0 g of benzene (K_b = 2.53 K kg mol⁻¹), the boiling point increases by 0.506 K. What is the molar mass of the compound?",
      option_a: "100 g mol⁻¹",
      option_b: "150 g mol⁻¹",
      option_c: "75 g mol⁻¹",
      option_d: "125 g mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Formula for elevation in boiling point:\nΔT_b = K_b × (w₂ / M₂) × (1000 / w₁)\n\nStep 2: Rearrange to solve for molar mass M₂:\nM₂ = [K_b × w₂ × 1000] / [ΔT_b × w₁]\n\nStep 3: Substitute the given values:\nM₂ = (2.53 × 1.80 × 1000) / (0.506 × 90.0) = 4554 / 45.54 = 100 g mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3832,
    similarQuestion: {
      question: "Which of the following salts produces the same theoretical van 't Hoff factor (i) upon complete dissociation as potassium ferrocyanide, K₄[Fe(CN)₆]?",
      option_a: "Al₂(SO₄)₃",
      option_b: "BaCl₂",
      option_c: "FeCl₃",
      option_d: "Al(NO₃)₃",
      correct_option: "A",
      explanation: "Step 1: Dissociation of potassium ferrocyanide:\nK₄[Fe(CN)₆] → 4K⁺ + [Fe(CN)₆]⁴⁻, which yields 4 + 1 = 5 ions (i = 5).\n\nStep 2: Dissociation of aluminum sulphate:\nAl₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻, which yields 2 + 3 = 5 ions (i = 5).\n\nStep 3: Since both electrolytes produce 5 ions per formula unit, they share the same theoretical van 't Hoff factor i = 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3833,
    similarQuestion: {
      question: "Among the following 0.10 m aqueous solutions, which one will exhibit the highest elevation in boiling point (or greatest depression in freezing point), assuming complete ionization?",
      option_a: "0.10 m Al₂(SO₄)₃",
      option_b: "0.10 m BaCl₂",
      option_c: "0.10 m NaCl",
      option_d: "0.10 m Glucose",
      correct_option: "A",
      explanation: "Step 1: Colligative properties depend on the effective molality of solute particles: m_eff = i × m.\nStep 2: Evaluate m_eff for each solution:\n- Al₂(SO₄)₃: i = 5, m_eff = 5 × 0.10 = 0.50 m\n- BaCl₂: i = 3, m_eff = 3 × 0.10 = 0.30 m\n- NaCl: i = 2, m_eff = 2 × 0.10 = 0.20 m\n- Glucose: i = 1, m_eff = 1 × 0.10 = 0.10 m\nStep 3: Al₂(SO₄)₃ has the highest effective particle concentration and therefore exhibits the largest boiling point elevation / freezing point depression.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3834,
    similarQuestion: {
      question: "What is the osmotic pressure (in atm) of an aqueous solution prepared by dissolving 5.85 mg of NaCl (molar mass = 58.5 g mol⁻¹) in 1.0 L of water at 298 K, assuming complete dissociation? (R = 0.0821 L atm K⁻¹ mol⁻¹)",
      option_a: "4.89 × 10⁻³ atm",
      option_b: "2.45 × 10⁻³ atm",
      option_c: "9.78 × 10⁻³ atm",
      option_d: "1.22 × 10⁻³ atm",
      correct_option: "A",
      explanation: "Step 1: Calculate moles of NaCl:\nMoles = (5.85 × 10⁻³ g) / 58.5 g mol⁻¹ = 1.0 × 10⁻⁴ mol.\n\nStep 2: Concentration C = 1.0 × 10⁻⁴ mol L⁻¹.\nStep 3: For NaCl, complete dissociation gives i = 2 (Na⁺ and Cl⁻).\n\nStep 4: Calculate osmotic pressure:\nπ = i C R T = 2 × (1.0 × 10⁻⁴ mol L⁻¹) × (0.0821 L atm K⁻¹ mol⁻¹) × 298 K ≈ 4.89 × 10⁻³ atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3835,
    similarQuestion: {
      question: "The Henry's law constants (K_H) in water at 298 K for four gases A, B, C, and D are 40.3 kbar, 0.41 kbar, 1.67 kbar, and 69.2 kbar, respectively. What is the correct order of increasing solubility in water at constant pressure?",
      option_a: "D < A < C < B",
      option_b: "B < C < A < D",
      option_c: "A < D < C < B",
      option_d: "D < C < A < B",
      correct_option: "A",
      explanation: "Step 1: According to Henry's law (P = K_H × x), solubility (x) is inversely proportional to the Henry's law constant: x ∝ 1 / K_H.\nStep 2: A higher K_H value indicates lower gas solubility in water.\nStep 3: Ranking the gases in order of increasing solubility corresponds to decreasing K_H:\nD (69.2 kbar) < A (40.3 kbar) < C (1.67 kbar) < B (0.41 kbar).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3836,
    similarQuestion: {
      question: "For the elementary reaction 2A + 3B → 4C, the rate of formation of C (d[C]/dt) is related to the rate of disappearance of A (−d[A]/dt) by the expression:",
      option_a: "d[C]/dt = 2 {−d[A]/dt}",
      option_b: "d[C]/dt = 0.5 {−d[A]/dt}",
      option_c: "d[C]/dt = 4 {−d[A]/dt}",
      option_d: "d[C]/dt = {−d[A]/dt}",
      correct_option: "A",
      explanation: "Step 1: The rate of reaction is defined as:\nRate = −(1/2) d[A]/dt = +(1/4) d[C]/dt.\n\nStep 2: Solve directly for d[C]/dt:\nd[C]/dt = (4/2) × (−d[A]/dt) = 2 {−d[A]/dt}.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3837,
    similarQuestion: {
      question: "Which of the following rate equations represents an overall second-order chemical reaction?",
      option_a: "Rate = k [A]^(1/2) [B]^(3/2)",
      option_b: "Rate = k [A]² [B]",
      option_c: "Rate = k [A] [B]²",
      option_d: "Rate = k [A]³ [B]",
      correct_option: "A",
      explanation: "Step 1: The overall order of a reaction is the algebraic sum of the exponents of all concentration terms appearing in the rate law.\nStep 2: For Rate = k [A]^(1/2) [B]^(3/2), overall order = 1/2 + 3/2 = 4/2 = 2.\nStep 3: Thus, this equation corresponds to an overall second-order reaction.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 68 Part 1.');

    for (let i = 0; i < questionsPart1.length; i++) {
      const q = questionsPart1[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart1.length} (ID: ${q.id})`);
    }
    console.log('Set 68 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 68 Part 1:', err.message);
  }
}

run();
