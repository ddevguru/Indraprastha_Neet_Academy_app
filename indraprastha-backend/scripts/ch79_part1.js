module.exports = [
  {
    id: 826,
    question: "The bob of a simple pendulum of length l is displaced from its mean position to an angular position θ with respect to the vertical. If it is released from rest, the velocity of the bob at the equilibrium position is: [AIPMT 2000]",
    optionA: "√[2 g l (1 - cos θ)]",
    optionB: "√[2 g l (1 + cos θ)]",
    optionC: "√[2 g l cos θ]",
    optionD: "√(2 g l)",
    correctOption: "A",
    explanation: "Step 1: Calculate the vertical height h through which the bob is raised when displaced by an angle θ:\nh = l - l cos θ = l (1 - cos θ).\n\nStep 2: Apply the law of conservation of mechanical energy:\nPotential energy lost = Kinetic energy gained\nm g h = (1/2) m v²\nv² = 2 g h\nv = √(2 g h).\n\nStep 3: Substitute h = l (1 - cos θ):\nv = √[2 g l (1 - cos θ)].\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A simple pendulum of length 1 m is released from an angle of 60° with the vertical. What is the speed of the bob at the lowest point? (g = 10 m/s²) [Same Concept Q]",
      option_a: "√10 m/s",
      option_b: "2√5 m/s",
      option_c: "5 m/s",
      option_d: "10 m/s",
      correct_option: "A",
      explanation: "Step 1: h = l (1 - cos 60°) = 1 × (1 - 0.5) = 0.5 m.\n\nStep 2: v = √(2 g h) = √(2 × 10 × 0.5) = √10 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 825,
    question: "Two masses M_A and M_B are hung from two strings of lengths l_A and l_B, respectively. They execute simple harmonic motion with frequency relation f_A = 2 f_B. Which of the following relations is correct? [AIPMT 2000]",
    optionA: "l_A = l_B / 4; does not depend on mass",
    optionB: "l_A = 4 l_B; does not depend on mass",
    optionC: "l_A = 2 l_B and M_A = 2 M_B",
    optionD: "l_A = l_B / 2 and M_A = M_B / 2",
    correctOption: "A",
    explanation: "Step 1: Formula for the frequency of a simple pendulum:\nf = (1 / 2π) √(g / l).\nNotice that the frequency depends only on length l and acceleration due to gravity g, and is completely independent of the mass of the bob.\n\nStep 2: Set up the ratio of frequencies:\nf_A / f_B = √(l_B / l_A).\n\nStep 3: Given f_A = 2 f_B:\n2 = √(l_B / l_A)\n4 = l_B / l_A\nl_A = l_B / 4.\n\nStep 4: Thus, l_A = l_B / 4 and the motion does not depend on mass.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If the frequency of pendulum P is three times that of pendulum Q, the ratio of their lengths (l_P / l_Q) is: [Same Concept Q]",
      option_a: "1 / 9",
      option_b: "9 / 1",
      option_c: "1 / 3",
      option_d: "3 / 1",
      correct_option: "A",
      explanation: "Step 1: f ∝ 1 / √l → f_P / f_Q = √(l_Q / l_P) = 3 → l_Q / l_P = 9 → l_P / l_Q = 1 / 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 824,
    question: "The total energy of a particle executing simple harmonic motion depends on: [AIPMT 2001]",
    optionA: "k, a, m",
    optionB: "k, a",
    optionC: "k, a, x",
    optionD: "k, x",
    correctOption: "B",
    explanation: "Step 1: The total mechanical energy E of a simple harmonic oscillator is given by:\nE = (1/2) k a² (or (1/2) m ω² a² where k = m ω²).\n\nStep 2: Here k is the spring force constant and a is the amplitude of oscillation.\n\nStep 3: The total energy is constant throughout the motion, being independent of instantaneous displacement x and fully specified by k and a.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the amplitude of a simple harmonic oscillator is doubled while its force constant remains unchanged, its total mechanical energy: [Same Concept Q]",
      option_a: "Doubles",
      option_b: "Quadruples",
      option_c: "Remains unchanged",
      option_d: "Halves",
      correct_option: "B",
      explanation: "Step 1: E = (1/2) k a² ∝ a².\n\nStep 2: Doubling amplitude a multiplies energy by 2² = 4.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 823,
    question: "A mass is suspended separately by two different springs in succession, giving time periods t₁ and t₂, respectively. If it is connected to both springs in parallel, the time period is t₀. The correct relation is: [AIPMT 2002]",
    optionA: "t₀² = t₁² + t₂²",
    optionB: "t₀⁻² = t₁⁻² + t₂⁻²",
    optionC: "t₀⁻¹ = t₁⁻¹ + t₂⁻¹",
    optionD: "t₀ = t₁ + t₂",
    correctOption: "B",
    explanation: "Step 1: Time period of a mass m on a spring of constant k:\nt = 2π √(m / k) → k = 4π² m / t² → k ∝ 1 / t².\n\nStep 2: For individual springs:\nk₁ = 4π² m / t₁²\nk₂ = 4π² m / t₂²\n\nStep 3: In parallel combination, equivalent spring constant is k_p = k₁ + k₂:\n4π² m / t₀² = (4π² m / t₁²) + (4π² m / t₂²)\n1 / t₀² = (1 / t₁²) + (1 / t₂²)\nt₀⁻² = t₁⁻² + t₂⁻².\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If two identical springs each of period T when loaded with mass m are connected in parallel, what is the new time period? [Same Concept Q]",
      option_a: "T / √2",
      option_b: "√2 T",
      option_c: "T / 2",
      option_d: "2 T",
      correct_option: "A",
      explanation: "Step 1: In parallel, k_eff = 2k.\n\nStep 2: T' = 2π √(m / 2k) = T / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 822,
    question: "When an oscillator completes 100 oscillations, its amplitude is reduced to 1/3 of its initial value. What will be its amplitude when it completes 200 oscillations? [AIPMT 2002]",
    optionA: "1/8",
    optionB: "2/3",
    optionC: "1/6",
    optionD: "1/9",
    correctOption: "D",
    explanation: "Step 1: In a damped harmonic oscillator, amplitude decays exponentially with time (or number of oscillations n):\nA(n) = A₀ e⁻ᵇⁿ.\n\nStep 2: After 100 oscillations:\nA(100) = A₀ e⁻¹⁰⁰ᵇ = (1 / 3) A₀ → e⁻¹⁰⁰ᵇ = 1 / 3.\n\nStep 3: After 200 oscillations:\nA(200) = A₀ e⁻²⁰⁰ᵇ = A₀ (e⁻¹⁰⁰ᵇ)² = A₀ (1 / 3)² = (1 / 9) A₀.\n\nStep 4: Thus, the amplitude is reduced to 1/9 of its initial value.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The amplitude of a damped oscillator drops to half after 50 oscillations. What fraction of the initial amplitude remains after 150 oscillations? [Same Concept Q]",
      option_a: "1 / 4",
      option_b: "1 / 8",
      option_c: "1 / 6",
      option_d: "1 / 16",
      correct_option: "B",
      explanation: "Step 1: A(150) = A₀ (1/2)³ = A₀ / 8.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 821,
    question: "The displacement between the maximum potential energy position and maximum kinetic energy position for a particle executing simple harmonic motion of amplitude a is: [AIPMT 2002]",
    optionA: "±a/2",
    optionB: "+a",
    optionC: "±a",
    optionD: "-a",
    correctOption: "C",
    explanation: "Step 1: Identify positions of maximum energy in simple harmonic motion:\n- Kinetic energy is maximum at the mean equilibrium position: x = 0.\n- Potential energy is maximum at the extreme positions: x = +a and x = -a.\n\nStep 2: Calculate the displacement between these positions:\nDisplacement = x_extreme - x_mean = (±a) - 0 = ±a.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "At what displacement from the mean position is the potential energy of an SHM oscillator equal to half its maximum value? [Same Concept Q]",
      option_a: "a / 2",
      option_b: "a / √2",
      option_c: "a / 4",
      option_d: "a √3 / 2",
      correct_option: "B",
      explanation: "Step 1: PE = (1/2) k x² = (1/2) [(1/2) k a²] → x² = a² / 2 → x = a / √2.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 820,
    question: "In the case of forced vibration, the resonance peak becomes very sharp when the: [AIPMT 2003]",
    optionA: "Damping force is small",
    optionB: "Restoring force is small",
    optionC: "Applied periodic force is small",
    optionD: "Quality factor is small",
    correctOption: "A",
    explanation: "Step 1: The amplitude of forced oscillations near resonance is governed by the damping coefficient b:\nA = F₀ / √[m² (ω² - ω₀²)² + b² ω²].\n\nStep 2: At resonance (driving frequency ω ≈ natural frequency ω₀):\nResonant amplitude A_max ≈ F₀ / (b ω₀).\n\nStep 3: When damping is small (b → 0), the resonance amplitude becomes very large and the curve narrows sharply around ω₀ (sharp resonance and high Quality factor Q).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which parameter characterizes the sharpness of resonance in forced oscillations? [Same Concept Q]",
      option_a: "Quality factor (Q-factor)",
      option_b: "Frequency ratio",
      option_c: "Time period",
      option_d: "Phase constant",
      correct_option: "A",
      explanation: "Step 1: The Q-factor Q = ω₀ / (2γ) directly measures the sharpness of resonance.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 819,
    question: "The time period of a mass suspended from a spring is T. If the spring is cut into four equal parts and the same mass is suspended from one of the parts, then the new time period will be: [AIPMT 2003]",
    optionA: "T / 4",
    optionB: "T",
    optionC: "T / 2",
    optionD: "2 T",
    correctOption: "C",
    explanation: "Step 1: Spring constant k is inversely proportional to the length of the spring: k ∝ 1 / l.\n\nStep 2: When the spring is cut into 4 equal parts, the length of each piece is l' = l / 4.\nTherefore, the spring constant of one piece becomes:\nk' = 4k.\n\nStep 3: Formula for time period of spring-mass oscillator:\nT = 2π √(m / k).\n\nStep 4: For the new system:\nT' = 2π √(m / k') = 2π √(m / 4k) = (1 / 2) × [2π √(m / k)] = T / 2.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A spring of constant k has period T when loaded with mass m. If cut into two equal halves and mass m is hung from one half, the new period is: [Same Concept Q]",
      option_a: "T / √2",
      option_b: "T / 2",
      option_c: "√2 T",
      option_d: "2 T",
      correct_option: "A",
      explanation: "Step 1: New spring constant k' = 2k.\n\nStep 2: T' = 2π √(m / 2k) = T / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 818,
    question: "The potential energy of a simple harmonic oscillator when the particle is halfway to its endpoint from the mean position is: (where E is total energy) [AIPMT 2003]",
    optionA: "2E / 3",
    optionB: "E / 8",
    optionC: "E / 4",
    optionD: "E / 2",
    correctOption: "C",
    explanation: "Step 1: The total mechanical energy of a simple harmonic oscillator of amplitude a is:\nE = (1/2) k a².\n\nStep 2: Halfway to its endpoint means displacement x = a / 2.\n\nStep 3: Potential energy at displacement x:\nU = (1/2) k x² = (1/2) k (a / 2)² = (1/2) k (a² / 4) = (1/4) × [(1/2) k a²] = E / 4.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What fraction of the total energy is kinetic when an oscillator is halfway to its amplitude? [Same Concept Q]",
      option_a: "3 / 4",
      option_b: "1 / 4",
      option_c: "1 / 2",
      option_d: "2 / 3",
      correct_option: "A",
      explanation: "Step 1: K = E - U = E - E/4 = 3E / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 817,
    question: "Which one of the following statements is true for the speed v and acceleration a of a particle executing simple harmonic motion? [AIPMT 2003]",
    optionA: "When v is maximum, a is maximum",
    optionB: "The value of a is zero, whatever may be the value of v",
    optionC: "When v is zero, a is zero",
    optionD: "When v is maximum, a is zero",
    correctOption: "D",
    explanation: "Step 1: Recall the expressions for velocity and acceleration in SHM:\n- Velocity: v = ω √(a² - x²)\n- Acceleration: a = -ω² x\n\nStep 2: At the mean position (x = 0):\n- Speed is maximum: v_max = ω a.\n- Acceleration is zero: a = 0.\n\nStep 3: At the extreme positions (x = ±a):\n- Speed is zero: v = 0.\n- Acceleration is maximum: |a_max| = ω² a.\n\nStep 4: Therefore, when v is maximum, a is zero.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In simple harmonic motion, at which position is the acceleration maximum? [Same Concept Q]",
      option_a: "At the extreme positions",
      option_b: "At the mean position",
      option_c: "At half the amplitude",
      option_d: "Acceleration is constant everywhere",
      correct_option: "A",
      explanation: "Step 1: Magnitude of acceleration is |a| = ω² |x|, which is greatest at x = ±A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 816,
    question: "Two springs of spring constants k₁ and k₂ are joined in series. The effective spring constant of the combination is given by: [AIPMT 2004]",
    optionA: "√(k₁ k₂)",
    optionB: "(k₁ + k₂) / 2",
    optionC: "k₁ + k₂",
    optionD: "(k₁ k₂) / (k₁ + k₂)",
    correctOption: "D",
    explanation: "Step 1: When springs are connected in series, the same restoring force F acts on both springs:\nTotal extension x = x₁ + x₂.\n\nStep 2: Substitute Hooke's law (x = F / k):\nF / k_eff = (F / k₁) + (F / k₂)\n1 / k_eff = (1 / k₁) + (1 / k₂).\n\nStep 3: Simplify to find k_eff:\n1 / k_eff = (k₁ + k₂) / (k₁ k₂)\nk_eff = (k₁ k₂) / (k₁ + k₂).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two springs of constants 300 N/m and 600 N/m are connected in series. What is the equivalent spring constant? [Same Concept Q]",
      option_a: "200 N/m",
      option_b: "900 N/m",
      option_c: "450 N/m",
      option_d: "150 N/m",
      correct_option: "A",
      explanation: "Step 1: k_eff = (300 × 600) / (300 + 600) = 180,000 / 900 = 200 N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 815,
    question: "A particle executing simple harmonic motion of amplitude 5 cm has a maximum speed of 31.4 cm/s. The frequency of its oscillation is: [AIPMT 2004]",
    optionA: "4 Hz",
    optionB: "3 Hz",
    optionC: "2 Hz",
    optionD: "1 Hz",
    correctOption: "D",
    explanation: "Step 1: Formula for maximum speed in SHM:\nv_max = ω A = 2π f A.\n\nStep 2: Given parameters:\nAmplitude A = 5 cm\nMaximum speed v_max = 31.4 cm/s\n\nStep 3: Solve for frequency f:\nf = v_max / (2π A)\nf = 31.4 / (2 × 3.14 × 5) = 31.4 / 31.4 = 1 Hz.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An object in SHM has amplitude 0.2 m and maximum velocity 2 m/s. What is its angular frequency? [Same Concept Q]",
      option_a: "10 rad/s",
      option_b: "5 rad/s",
      option_c: "20 rad/s",
      option_d: "1 rad/s",
      correct_option: "A",
      explanation: "Step 1: ω = v_max / A = 2 / 0.2 = 10 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 814,
    question: "The circular motion of a particle with constant speed is: [AIPMT 2005]",
    optionA: "Periodic but not simple harmonic",
    optionB: "Simple harmonic but not periodic",
    optionC: "Periodic and simple harmonic",
    optionD: "Neither periodic nor simple harmonic",
    correctOption: "A",
    explanation: "Step 1: Uniform circular motion repeats itself at regular intervals of time, so it is strictly periodic.\n\nStep 2: For simple harmonic motion (SHM), the motion must be to-and-fro along a straight line path with restoring force directly proportional to displacement (a = -ω² x).\n\nStep 3: Circular motion is a two-dimensional planar motion, not a straight-line to-and-fro motion (only its 1D projections along diameter axes are SHM).\n\nStep 4: Therefore, circular motion with constant speed is periodic but not simple harmonic.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following motions is periodic but NOT simple harmonic? [Same Concept Q]",
      option_a: "Rotation of the Earth on its axis",
      option_b: "Motion of a simple pendulum with small amplitude",
      option_c: "Oscillations of a mass on a spring",
      option_d: "Vibrations of a tuning fork",
      correct_option: "A",
      explanation: "Step 1: Earth's rotation repeats every 24 hours (periodic), but it is not a back-and-forth linear restoring motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 813,
    question: "A rectangular block of mass m and area of cross-section A floats in a liquid of density ρ. If it is given a small vertical displacement from equilibrium, it undergoes SHM with time period T. Then: [AIPMT 2006]",
    optionA: "T ∝ 1 / √m",
    optionB: "T ∝ √ρ",
    optionC: "T ∝ 1 / √A",
    optionD: "T ∝ 1 / ρ",
    correctOption: "C",
    explanation: "Step 1: When depressed vertically by distance y, the additional buoyant upthrust restoring force is:\nF = - (Additional displaced volume × density × g) = - (A y × ρ × g) = - (A ρ g) y.\n\nStep 2: This represents SHM with effective spring constant k = A ρ g.\n\nStep 3: Time period formula:\nT = 2π √(m / k) = 2π √[m / (A ρ g)].\n\nStep 4: Looking at dependencies:\nT ∝ √m, T ∝ 1 / √ρ, and T ∝ 1 / √A.\n\nStep 5: Thus, Option C correctly states T ∝ 1 / √A.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A cylindrical body floats vertically in a liquid. If liquid density is doubled, its oscillation time period changes by a factor of: [Same Concept Q]",
      option_a: "1 / √2",
      option_b: "√2",
      option_c: "1 / 2",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: T ∝ 1 / √ρ.\n\nStep 2: When ρ' = 2ρ, T' = T / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 812,
    question: "The phase difference between the instantaneous velocity and acceleration of a particle executing simple harmonic motion is: [AIPMT 2007]",
    optionA: "π rad",
    optionB: "0.707π rad",
    optionC: "Zero",
    optionD: "0.5π rad",
    correctOption: "D",
    explanation: "Step 1: Write equations for displacement, velocity, and acceleration:\n- Displacement: x = a sin(ω t)\n- Velocity: v = dx/dt = a ω cos(ω t) = a ω sin(ω t + π/2)\n- Acceleration: a_acc = dv/dt = -a ω² sin(ω t) = a ω² sin(ω t + π)\n\nStep 2: Find phase difference between velocity and acceleration:\nPhase of acceleration = ω t + π\nPhase of velocity = ω t + π/2\nΔφ = (ω t + π) - (ω t + π/2) = π/2 rad = 0.5π rad.\n\nStep 3: Acceleration leads velocity by a phase angle of π/2 rad (0.5π rad).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the phase difference between displacement and velocity in SHM? [Same Concept Q]",
      option_a: "π / 2",
      option_b: "π",
      option_c: "Zero",
      option_d: "3π / 2",
      correct_option: "A",
      explanation: "Step 1: Velocity leads displacement by π/2 radians (90°).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 811,
    question: "A particle executing simple harmonic motion has kinetic energy K₀ cos²(ωt). The maximum values of potential energy and total energy are, respectively: [AIPMT 2007]",
    optionA: "K₀ / 2 and K₀",
    optionB: "K₀ and 2 K₀",
    optionC: "K₀ and K₀",
    optionD: "0 and 2 K₀",
    correctOption: "C",
    explanation: "Step 1: Given kinetic energy as a function of time:\nK(t) = K₀ cos²(ωt).\nMaximum kinetic energy K_max occurs when cos²(ωt) = 1, giving K_max = K₀.\n\nStep 2: In conservative SHM without loss of energy:\nTotal mechanical energy E = K_max = K₀.\n\nStep 3: At the extreme positions, kinetic energy is zero and potential energy reaches its maximum:\nU_max = E = K₀.\n\nStep 4: Therefore, both maximum potential energy and total energy are equal to K₀.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If the total energy of a particle in SHM is 40 J, what is its maximum kinetic energy? [Same Concept Q]",
      option_a: "40 J",
      option_b: "20 J",
      option_c: "80 J",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: At the mean position, all total energy converts into kinetic energy: K_max = E = 40 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 810,
    question: "A mass of 2.0 kg is put on a flat pan attached to a vertical spring fixed on the ground. The mass of the spring and pan is negligible. When pressed slightly and released, the mass executes simple harmonic motion. The spring constant is 200 N/m. What should be the minimum amplitude of motion so that the mass gets detached from the pan? (Take g = 10 m/s²) [AIPMT 2007]",
    optionA: "10.0 cm",
    optionB: "Any value less than 12.0 cm",
    optionC: "4.0 cm",
    optionD: "8.0 cm",
    correctOption: "A",
    explanation: "Step 1: Condition for detachment of the mass from the pan:\nThe mass detaches at the highest point of oscillation when the downward acceleration of the pan equals or exceeds g (so normal reaction N becomes zero):\na_max ≥ g.\n\nStep 2: Formula for maximum acceleration in vertical SHM:\na_max = ω² A.\n\nStep 3: Calculate angular frequency ω:\nω² = k / m = 200 N/m / 2.0 kg = 100 rad²/s².\n\nStep 4: Set a_max = g for minimum amplitude A_min:\nω² A_min = g\n100 × A_min = 10\nA_min = 10 / 100 = 0.1 m = 10.0 cm.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A mass of 1 kg sits on a platform oscillating vertically at frequency 2 Hz. What minimum amplitude causes the mass to leave the platform? (g = 10 m/s²) [Same Concept Q]",
      option_a: "6.3 cm",
      option_b: "10 cm",
      option_c: "12.5 cm",
      option_d: "5 cm",
      correct_option: "A",
      explanation: "Step 1: ω = 2π f = 4π rad/s → ω² = 16π² ≈ 158.\n\nStep 2: A_min = g / ω² = 10 / 158 ≈ 0.063 m = 6.3 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 809,
    question: "A particle executes simple harmonic oscillation with an amplitude a and period T. The minimum time taken by the particle to travel half of the amplitude from the equilibrium position is: [AIPMT 2007]",
    optionA: "T / 8",
    optionB: "T / 12",
    optionC: "T / 2",
    optionD: "T / 4",
    correctOption: "B",
    explanation: "Step 1: Write the displacement equation starting from the equilibrium (mean) position:\nx(t) = a sin(ω t).\n\nStep 2: Set displacement equal to half amplitude (x = a / 2):\na / 2 = a sin(ω t)\nsin(ω t) = 1 / 2.\n\nStep 3: Solve for ω t:\nω t = π / 6.\n\nStep 4: Substitute ω = 2π / T:\n(2π / T) t = π / 6\nt = (π / 6) × (T / 2π) = T / 12.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "How long does a particle take to move from x = a/2 to the extreme position x = a in SHM of period T? [Same Concept Q]",
      option_a: "T / 6",
      option_b: "T / 12",
      option_c: "T / 4",
      option_d: "T / 8",
      correct_option: "A",
      explanation: "Step 1: Time from 0 to a is T/4.\nTime from 0 to a/2 is T/12.\n\nStep 2: Time from a/2 to a = T/4 - T/12 = (3T - T) / 12 = 2T / 12 = T / 6.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

