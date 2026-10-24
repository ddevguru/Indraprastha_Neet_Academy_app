const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 3398,
    similarQuestion: {
      question: "The current flowing through an inductor of self-inductance L = 4 H varies with time as i(t) = 3 sin(ωt) A. The maximum magnetic energy stored in the inductor during any cycle is:",
      option_a: "18 J",
      option_b: "36 J",
      option_c: "9 J",
      option_d: "12 J",
      correct_option: "A",
      explanation: "Step 1: The magnetic potential energy stored in an inductor carrying instantaneous current i is:\nU = (1/2) × L × i²\n\nStep 2: The peak current is the maximum value of i(t) = 3 sin(ωt), which is I_max = 3 A.\n\nStep 3: The maximum stored magnetic energy is:\nU_max = (1/2) × L × (I_max)²\nU_max = (1/2) × 4 H × (3 A)² = 2 × 9 = 18 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3399,
    similarQuestion: {
      question: "An ideal inductor of self-inductance L is connected across a real battery of emf E having non-zero internal resistance r. As time t progresses after closing the circuit, the rate of increase of current (di/dt):",
      option_a: "Increases linearly with time",
      option_b: "Decreases exponentially with time",
      option_c: "Remains strictly constant",
      option_d: "Is initially zero and then increases",
      correct_option: "B",
      explanation: "Step 1: Applying Kirchhoff's loop rule to the circuit at any instant t:\nE - i × r - L × (di/dt) = 0\n\nStep 2: Solve for the rate of change of current (di/dt):\ndi/dt = (E - i × r) / L\n\nStep 3: During growth of current, i(t) = (E/r) × [1 - e^(-r t / L)]. Differentiating with respect to t gives:\ndi/dt = (E / L) × e^(-r t / L)\nThus, di/dt is maximum at t = 0 and decreases exponentially towards zero as steady state is approached.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3400,
    similarQuestion: {
      question: "While an electrostatic capacitor stores potential energy in its electric field, an electrical inductor stores energy in:",
      option_a: "Its electric field",
      option_b: "Its resistance",
      option_c: "Its magnetic field",
      option_d: "Both electric and gravitational fields",
      correct_option: "C",
      explanation: "Step 1: When a steady current flows through an inductor coil, it establishes a magnetic flux through its turns.\n\nStep 2: Work done by the external source against the self-induced back emf during the establishment of this current is stored in the surrounding space.\n\nStep 3: This stored energy resides entirely in the magnetic field of the inductor, with energy density u_B = B² / (2μ₀).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3401,
    similarQuestion: {
      question: "An inductor coil of self-inductance 80 mH carries a steady direct current of 5 A. The magnetic energy stored in the inductor is:",
      option_a: "0.5 J",
      option_b: "1.0 J",
      option_c: "2.0 J",
      option_d: "0.2 J",
      correct_option: "B",
      explanation: "Step 1: The magnetic potential energy stored in an inductor is given by:\nU = (1/2) × L × I²\n\nStep 2: Substitute the given parameters:\nL = 80 mH = 80 × 10⁻³ H = 0.08 H\nI = 5 A\n\nStep 3: Calculate U:\nU = (1/2) × (0.08 H) × (5 A)² = 0.04 × 25 = 1.0 J.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3402,
    similarQuestion: {
      question: "If the electric current flowing through an inductor is tripled, the magnetic energy stored in the inductor becomes how many times its initial value?",
      option_a: "3 times",
      option_b: "9 times",
      option_c: "6 times",
      option_d: "27 times",
      correct_option: "B",
      explanation: "Step 1: The magnetic energy stored in an inductor of self-inductance L is:\nU = (1/2) × L × I²\n\nStep 2: Since L is a geometric and material property of the coil, U is directly proportional to the square of current:\nU ∝ I²\n\nStep 3: When current becomes I' = 3 I:\nU' = (1/2) × L × (3I)² = 9 × [(1/2) × L × I²] = 9 U.\nTherefore, the energy increases by a factor of 9.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3403,
    similarQuestion: {
      question: "The magnetic energy density (potential energy stored per unit volume) in a magnetic field of induction B in vacuum is:",
      option_a: "(1/2) × μ₀ × B²",
      option_b: "B² / (2 μ₀)",
      option_c: "B / (2 μ₀)",
      option_d: "(1/2) × μ₀ × B",
      correct_option: "B",
      explanation: "Step 1: Consider a long solenoid of cross-sectional area A and length l carrying current I, with volume V = A × l.\n\nStep 2: The total energy stored is U = (1/2) × L × I², where L = μ₀ × n² × A × l and B = μ₀ × n × I => I = B / (μ₀ n).\n\nStep 3: Substitute L and I into U:\nU = (1/2) × (μ₀ n² A l) × [B / (μ₀ n)]² = (1/2) × (B² / μ₀) × (A l)\n\nStep 4: Energy per unit volume u_B = U / (A l) is:\nu_B = B² / (2 μ₀).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3404,
    similarQuestion: {
      question: "An emf of 200 mV is induced in a secondary coil when the electric current in a nearby primary coil changes uniformly from 0 to 5 A in 0.05 s. The coefficient of mutual inductance between the two coils is:",
      option_a: "2.0 mH",
      option_b: "4.0 mH",
      option_c: "10 mH",
      option_d: "1.0 mH",
      correct_option: "A",
      explanation: "Step 1: The magnitude of mutually induced emf in a secondary coil is given by Faraday's law of induction:\ne = M × |dI / dt|\n\nStep 2: Calculate the rate of change of primary current:\n|dI / dt| = (5 A - 0 A) / (0.05 s) = 100 A/s\n\nStep 3: Solve for mutual inductance M:\nM = e / |dI / dt|\nGiven e = 200 mV = 200 × 10⁻³ V = 0.2 V:\nM = 0.2 V / 100 A/s = 2 × 10⁻³ H = 2.0 mH.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3405,
    similarQuestion: {
      question: "An ideal inductor of self-inductance L = 2 H and a resistor of resistance R = 10 Ω are connected in series across a steady 20 V DC battery. Under long-term steady-state conditions, the magnetic energy stored in the inductor is:",
      option_a: "4 J",
      option_b: "8 J",
      option_c: "2 J",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Under long-term steady-state conditions (t → ∞), the rate of change of current is zero (di/dt = 0).\nTherefore, the inductor acts as an ideal short circuit offering zero back emf.\n\nStep 2: The steady-state saturation current is determined entirely by Ohm's law:\nI₀ = V / R = 20 V / 10 Ω = 2 A.\n\nStep 3: The magnetic energy stored in the inductor is:\nU = (1/2) × L × I₀² = (1/2) × 2 H × (2 A)² = 4 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3406,
    similarQuestion: {
      question: "A coil of wire and an electric light bulb are connected in series across a steady direct-current (DC) battery. If a soft iron core is slowly inserted inside the coil, after a new steady state is reached, the brightness of the bulb:",
      option_a: "Remains unchanged",
      option_b: "Decreases permanently",
      option_c: "Increases permanently",
      option_d: "Drops to zero permanently",
      correct_option: "A",
      explanation: "Step 1: The brightness of the bulb depends on the electrical power dissipated in its filament, P = I² R_bulb.\n\nStep 2: For a steady DC circuit in steady state, frequency is zero (f = 0), and inductive reactance is zero (X_L = 2π f L = 0).\n\nStep 3: Inserting an iron rod increases the self-inductance L of the coil, but this has no effect on its DC ohmic resistance.\nTherefore, the final steady-state current I = V / R_total remains unchanged, and the steady brightness remains the same.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3407,
    similarQuestion: {
      question: "An inductor of 6 H is connected in series with a resistor of 3 Ω and a 12 V DC battery at t = 0. The current flowing through the circuit at time t = 2 s is:",
      option_a: "4 × (1 - e⁻²) A",
      option_b: "4 × (1 - e⁻¹) A",
      option_c: "4 × e⁻¹ A",
      option_d: "2 × (1 - e⁻¹) A",
      correct_option: "B",
      explanation: "Step 1: The growth of current in an LR series circuit is governed by:\ni(t) = I₀ × [1 - e^(-t / τ)]\n\nStep 2: Compute the steady-state current I₀ and inductive time constant τ:\nI₀ = V / R = 12 V / 3 Ω = 4 A\nτ = L / R = 6 H / 3 Ω = 2 s\n\nStep 3: At t = 2 s:\ni(2) = 4 × [1 - e^(-2 / 2)] = 4 × (1 - e⁻¹) A.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3408,
    similarQuestion: {
      question: "In an LR series circuit where a steady initial current I₀ is allowed to decay through the closed loop after disconnecting the battery, the current drops to (1/e) times (approximately 36.8%) of its initial value in time:",
      option_a: "R / L seconds",
      option_b: "1 / (R L) seconds",
      option_c: "L / R seconds",
      option_d: "R × L seconds",
      correct_option: "C",
      explanation: "Step 1: The equation for current decay in a discharging LR circuit is:\ni(t) = I₀ × e^(-t / τ)\nwhere τ = L / R is the inductive time constant.\n\nStep 2: Set i(t) = I₀ / e = I₀ × e⁻¹:\nI₀ × e^(-t / τ) = I₀ × e⁻¹\n-t / τ = -1 => t = τ = L / R.\n\nStep 3: Hence, the current drops to 36.8% of its initial value in exactly L / R seconds.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3409,
    similarQuestion: {
      question: "In an inductive LR DC circuit, the inductive time constant τ = L/R is the time required for the current during growth to reach approximately what fraction of its maximum steady-state value I₀?",
      option_a: "0.632 I₀",
      option_b: "0.500 I₀",
      option_c: "0.368 I₀",
      option_d: "0.865 I₀",
      correct_option: "A",
      explanation: "Step 1: The current growth formula is:\ni(t) = I₀ × [1 - e^(-t / τ)]\n\nStep 2: At t = τ:\ni(τ) = I₀ × [1 - e⁻¹] = I₀ × [1 - 1 / 2.7183] ≈ I₀ × [1 - 0.3679] = 0.6321 I₀.\n\nStep 3: Thus, the current reaches approximately 63.2% of its final saturation value.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3410,
    similarQuestion: {
      question: "The current in an LR circuit builds up to half (50%) of its maximum steady-state value in 3 seconds. The time constant τ of the circuit is:",
      option_a: "(1 / ln 2) s",
      option_b: "(3 / ln 2) s",
      option_c: "(2 / ln 2) s",
      option_d: "(6 / ln 2) s",
      correct_option: "B",
      explanation: "Step 1: Use the growth equation for an LR circuit:\ni(t) = I₀ × [1 - e^(-t / τ)]\n\nStep 2: Set i(t) = 0.5 I₀ at t = 3 s:\n0.5 I₀ = I₀ × [1 - e^(-3 / τ)]\ne^(-3 / τ) = 0.5 = 1 / 2\n\nStep 3: Take natural logarithms on both sides:\n-3 / τ = ln(1/2) = -ln 2\nτ = 3 / ln 2 seconds.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3411,
    similarQuestion: {
      question: "When a circuit containing an inductance L and resistance R is connected to a constant DC voltage source, the time elapsed before the current reaches (1 - 1/e) of its steady-state current is equal to:",
      option_a: "L / R",
      option_b: "R / L",
      option_c: "2 L / R",
      option_d: "L / (2R)",
      correct_option: "A",
      explanation: "Step 1: The current at time t during growth is given by:\ni(t) = I₀ × [1 - e^(-t / (L/R))]\n\nStep 2: We are given that i(t) = I₀ × [1 - 1/e] = I₀ × [1 - e⁻¹].\n\nStep 3: Equating the exponential factors:\ne^(-t / (L/R)) = e⁻¹ => t / (L/R) = 1 => t = L / R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3412,
    similarQuestion: {
      question: "What are the dimensions and SI units of the time constant (L / R) of an inductive circuit?",
      option_a: "[M⁰ L⁰ T¹] and seconds (s)",
      option_b: "[M¹ L² T⁻²] and joules (J)",
      option_c: "[M⁰ L⁰ T⁻¹] and hertz (Hz)",
      option_d: "[M¹ L⁰ T⁻²] and tesla (T)",
      correct_option: "A",
      explanation: "Step 1: Dimension of self-inductance L:\nFrom e = L (dI/dt) => L = e dt / dI => [L] = [W/q] [T] / [A] = [M L² T⁻³ A⁻¹] [T] [A⁻¹] = [M L² T⁻² A⁻²].\n\nStep 2: Dimension of electrical resistance R:\nFrom V = I R => R = V / I => [R] = [M L² T⁻³ A⁻¹] / [A] = [M L² T⁻³ A⁻²].\n\nStep 3: Divide the two dimensions:\n[L / R] = [M L² T⁻² A⁻²] / [M L² T⁻³ A⁻²] = [T¹].\nThe SI unit of L / R is seconds (s).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3413,
    similarQuestion: {
      question: "A coil of self-inductance 25 H and resistance 5 Ω is connected in series with a 10 V battery. The time constant of this circuit is:",
      option_a: "2.5 seconds",
      option_b: "125 seconds",
      option_c: "0.2 seconds",
      option_d: "5.0 seconds",
      correct_option: "D",
      explanation: "Step 1: The time constant τ of an LR circuit depends solely on the inductance L and the total circuit resistance R:\nτ = L / R\n\nStep 2: Substitute L = 25 H and R = 5 Ω:\nτ = 25 H / 5 Ω = 5.0 seconds.\nNote that the battery emf does not alter the time constant.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3414,
    similarQuestion: {
      question: "In an LR DC growth circuit, the inductive time constant specifically represents the time interval in which the current:",
      option_a: "Reaches approximately 50% of its final steady-state value",
      option_b: "Reaches approximately 63% of its final steady-state value",
      option_c: "Reaches 100% of its final steady-state value",
      option_d: "Drops to zero",
      correct_option: "B",
      explanation: "Step 1: The current growth formula in an LR circuit is:\ni(t) = I_max × [1 - e^(-t / τ)]\n\nStep 2: At t = τ:\ni(τ) = I_max × (1 - 1/e) ≈ I_max × (1 - 0.368) = 0.632 × I_max ≈ 63% of I_max.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3415,
    similarQuestion: {
      question: "When a series circuit consisting of a battery of constant emf E, an inductor L, and a resistor R is switched on, current grows towards a steady-state value I₀. If a circuit modification results in a higher steady-state current and a longer time constant, which parameter was altered?",
      option_a: "Inductance L was increased",
      option_b: "Inductance L was decreased",
      option_c: "Resistance R was increased",
      option_d: "Resistance R was decreased",
      correct_option: "D",
      explanation: "Step 1: The final steady-state current is I₀ = E / R.\nIf I₀ increases (for constant E), the resistance R must have been decreased.\n\nStep 2: The time constant is τ = L / R.\nWhen R decreases, the ratio L / R increases, which means the time constant τ also increases.\n\nStep 3: Hence, decreasing the resistance R causes both an increase in steady-state current and an increase in time constant.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3416,
    similarQuestion: {
      question: "An inductor coil carries a current I. It stores magnetic energy U and dissipates power P in its internal resistance due to Joule heating. The time constant of the coil is given by:",
      option_a: "U / P",
      option_b: "4U / P",
      option_c: "2U / P",
      option_d: "U / (2P)",
      correct_option: "C",
      explanation: "Step 1: The stored magnetic energy is:\nU = (1/2) × L × I² => L = 2U / I²\n\nStep 2: The power dissipated by Joule heating in its resistance R is:\nP = I² × R => R = P / I²\n\nStep 3: The inductive time constant is τ = L / R:\nτ = (2U / I²) / (P / I²) = 2U / P.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3417,
    similarQuestion: {
      question: "Which of the following functions accurately represents the growth of electric current i(t) with time t when an inductor L and resistance R are connected across a DC voltage V at t = 0?",
      option_a: "i(t) = (V / R) × [1 - e^(-R t / L)]",
      option_b: "i(t) = (V / R) × e^(-R t / L)",
      option_c: "i(t) = (V / R) × [1 + e^(-R t / L)]",
      option_d: "i(t) = (V / R) × [1 - e^(-L t / R)]",
      correct_option: "A",
      explanation: "Step 1: From Kirchhoff's voltage rule for a series LR circuit:\nV - L × (di/dt) - i × R = 0\n\nStep 2: Rearranging and integrating with initial condition i(0) = 0:\n∫ di / (V - i R) = (1/L) ∫ dt\n-(1/R) ln(V - i R) = t/L + C\n\nStep 3: Applying i(0) = 0 gives:\ni(t) = (V / R) × [1 - e^(-R t / L)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3418,
    similarQuestion: {
      question: "In an LR circuit connected across a constant DC source of emf E, what is the relation between the magnitude of the self-induced back emf (e_ind) across the inductor and the instantaneous current i flowing through it?",
      option_a: "e_ind = E - i × R",
      option_b: "e_ind = E + i × R",
      option_c: "e_ind = i × R - E",
      option_d: "e_ind = E / (i × R)",
      correct_option: "A",
      explanation: "Step 1: Applying Kirchhoff's loop rule to the closed LR loop at any instant:\nE - e_ind - i × R = 0\nwhere e_ind = L (di/dt) is the magnitude of the induced back emf.\n\nStep 2: Solve for e_ind:\ne_ind = E - i × R\n\nStep 3: This reveals a linear relationship where e_ind is maximum (equal to E) at i = 0 and decreases to 0 when i reaches its maximum steady-state value E / R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3419,
    similarQuestion: {
      question: "A coil of self-inductance L and resistance R is connected to a battery of emf E. A graph plotted between the magnitude of the self-induced emf (e) on the y-axis and the instantaneous current (i) on the x-axis is:",
      option_a: "A straight line passing through the origin with positive slope",
      option_b: "A straight line with negative slope -R and y-intercept E",
      option_c: "A parabola opening upwards",
      option_d: "An exponentially increasing curve",
      correct_option: "B",
      explanation: "Step 1: Kirchhoff's loop law gives:\nE - e - i × R = 0 => e = E - i × R\n\nStep 2: Compare this with the linear equation y = m x + c:\ny = e, x = i, slope m = -R, and intercept c = E.\n\nStep 3: Therefore, the graph is a straight line having a negative slope of magnitude R and vertical intercept E.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3420,
    similarQuestion: {
      question: "A circuit contains two parallel branches across a DC battery: Branch 1 consists of a resistor R and bulb B₁, while Branch 2 consists of an inductor L and bulb B₂. When the power switch is suddenly turned off, which of the following occurs?",
      option_a: "Both bulbs extinguish immediately with zero delay",
      option_b: "Both bulbs extinguish after identical delays",
      option_c: "Bulb B₁ extinguishes promptly, while bulb B₂ dims out with some delay",
      option_d: "Bulb B₂ extinguishes promptly, while bulb B₁ dims out with some delay",
      correct_option: "C",
      explanation: "Step 1: In the inductive branch, self-inductance opposes any sudden change in magnetic flux and current (Lenz's Law).\n\nStep 2: When the circuit switch is opened, the inductor acts as a temporary current source through its local closed loop path.\n\nStep 3: Consequently, the bulb connected in the purely resistive branch without inductive support extinguishes immediately, whereas the bulb in the inductive circuit dims out gradually as the magnetic energy (1/2 L I²) is dissipated.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3421,
    similarQuestion: {
      question: "In an LR series circuit connected to a constant DC battery, the rate at which magnetic energy is stored in the inductor [P_stored = d(1/2 L i²)/dt]:",
      option_a: "Decreases monotonically from t = 0 to steady state",
      option_b: "Increases monotonically from t = 0 to steady state",
      option_c: "Remains constant throughout the charging process",
      option_d: "Is zero at t = 0, rises to a maximum, and then falls back to zero",
      correct_option: "D",
      explanation: "Step 1: The rate of energy storage in an inductor is:\nP_stored = dU/dt = d(1/2 L i²)/dt = L × i × (di/dt)\n\nStep 2: Evaluate at the boundaries:\n- At t = 0: current i = 0, so P_stored = 0.\n- At t → ∞: current reaches steady state so di/dt = 0, which means P_stored = 0.\n\nStep 3: In between t = 0 and t → ∞, both i > 0 and di/dt > 0, so P_stored is positive and passes through a distinct maximum.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3422,
    similarQuestion: {
      question: "An electrical circuit consists of a 15 V DC source connected to a network with an ideal inductor L = 1.5 H in series with a resistor R₂ = 1 Ω, placed in parallel with a resistor R₃ = 2 Ω, all in series with R₁ = 1 Ω. Immediately after the switch is closed (at t = 0⁺), the current through the inductor is:",
      option_a: "5 A",
      option_b: "7.5 A",
      option_c: "0 A",
      option_d: "15 A",
      correct_option: "C",
      explanation: "Step 1: The fundamental boundary condition for an ideal inductor states that the current through it cannot change discontinuously because that would require infinite voltage (v_L = L di/dt).\n\nStep 2: Since the initial current through the inductor just before closing the switch was zero [i_L(0⁻) = 0]:\ni_L(0⁺) = i_L(0⁻) = 0 A.\n\nStep 3: Hence, immediately after switching on, the inductor behaves as an open circuit carrying exactly 0 A.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3423,
    similarQuestion: {
      question: "A circuit contains a 12 V battery connected in series with a resistor R₁ = 4 Ω and a parallel combination of a resistor R₂ = 6 Ω and an ideal inductor L. What is the difference between the maximum current (as t → ∞) and the minimum current (at t = 0⁺) drawn from the battery?",
      option_a: "1.2 A",
      option_b: "3.0 A",
      option_c: "1.8 A",
      option_d: "2.4 A",
      correct_option: "C",
      explanation: "Step 1: At t = 0⁺, the inductor behaves as an open circuit (zero current through L). The entire current flows through R₁ and R₂ in series:\nR_eq(0⁺) = R₁ + R₂ = 4 Ω + 6 Ω = 10 Ω\nI_min = V / R_eq(0⁺) = 12 V / 10 Ω = 1.2 A.\n\nStep 2: At t → ∞ (steady state), the inductor acts as an ideal short circuit across R₂, bypassing R₂ completely:\nR_eq(∞) = R₁ = 4 Ω\nI_max = V / R_eq(∞) = 12 V / 4 Ω = 3.0 A.\n\nStep 3: The difference between maximum and minimum current is:\nΔI = I_max - I_min = 3.0 A - 1.2 A = 1.8 A.\n\nTherefore, Option (C) is the correct answer."
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
    console.log('Login successful for Set 56 Part 1.');

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
    console.log('Set 56 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 56 Part 1:', err.message);
  }
}

run();
