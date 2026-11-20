module.exports = [
  {
    id: 790,
    question: "The radius of a circle, the period of revolution, initial position, and sense of revolution are indicated in the figure (radius R = 3 m, period T = 4 s, rotates clockwise, starting at the top y-axis at t = 0). The y-projection of the radius vector of rotating particle P is: [NEET 2019]",
    optionA: "y(t) = 4 sin(πt / 2)",
    optionB: "y(t) = 3 cos(3πt / 2)",
    optionC: "y(t) = 3 cos(πt / 2)",
    optionD: "y(t) = -3 cos(2πt)",
    correctOption: "C",
    explanation: "Step 1: Calculate angular frequency ω:\nPeriod T = 4 s\nω = 2π / T = 2π / 4 = π / 2 rad/s.\n\nStep 2: Determine initial position and angle at time t:\nAt t = 0, the particle is on the positive y-axis at (0, 3).\nAs it rotates clockwise with angular speed ω, the angle θ made with the positive y-axis at time t is θ = ω t = (π / 2) t.\n\nStep 3: The projection of the radius vector on the y-axis is:\ny(t) = R cos θ = 3 cos(π t / 2).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A particle rotates in a circle of radius 2 m with period 2 s starting from the +x axis at t = 0 counterclockwise. What is its x-projection? [Same Concept Q]",
      option_a: "x(t) = 2 cos(π t)",
      option_b: "x(t) = 2 sin(π t)",
      option_c: "x(t) = 4 cos(2π t)",
      option_d: "x(t) = 2 cos(2π t)",
      correct_option: "A",
      explanation: "Step 1: ω = 2π / 2 = π rad/s.\n\nStep 2: Projection on x-axis = R cos(ω t) = 2 cos(π t).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 789,
    question: "The phase difference between displacement and acceleration of a particle in simple harmonic motion is: [NEET 2020 Phase 1]",
    optionA: "3π / 2 rad",
    optionB: "π / 2 rad",
    optionC: "Zero",
    optionD: "π rad",
    correctOption: "D",
    explanation: "Step 1: Equations of displacement and acceleration in SHM:\nx(t) = A sin(ω t)\na(t) = -ω² A sin(ω t) = ω² A sin(ω t + π).\n\nStep 2: Compare the phase of acceleration with displacement:\nPhase of displacement = ω t\nPhase of acceleration = ω t + π\nPhase difference Δφ = (ω t + π) - ω t = π radians (180°).\n\nStep 3: Acceleration and displacement are always in opposite phase (180° out of phase).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "When the displacement of an SHM particle is +A, what is the direction of its acceleration? [Same Concept Q]",
      option_a: "Towards the mean position (negative direction)",
      option_b: "Away from the mean position",
      option_c: "Perpendicular to the motion",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: a = -ω² x. When x = +A, a = -ω² A, pointing back toward the equilibrium position.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 788,
    question: "A spring is stretched by 5 cm by a force of 10 N. The time period of the oscillations when a mass of 2 kg is suspended by it is: [NEET 2021]",
    optionA: "0.628 s",
    optionB: "0.0628 s",
    optionC: "6.28 s",
    optionD: "3.14 s",
    correctOption: "A",
    explanation: "Step 1: Calculate the spring constant k using Hooke's law (F = k x):\nk = F / x = 10 N / (5 × 10⁻² m) = 10 / 0.05 = 200 N/m.\n\nStep 2: Calculate the time period T for a suspended mass m = 2 kg:\nT = 2π √(m / k)\nT = 2π √(2 / 200) = 2π √(1 / 100) = 2π / 10 = π / 5.\n\nStep 3: Substitute π ≈ 3.14:\nT = 3.14 / 5 = 0.628 s.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A force of 20 N stretches a spring by 0.1 m. What is the time period when a 0.5 kg body is attached to it? [Same Concept Q]",
      option_a: "0.314 s",
      option_b: "0.628 s",
      option_c: "1.57 s",
      option_d: "3.14 s",
      correct_option: "A",
      explanation: "Step 1: k = 20 / 0.1 = 200 N/m.\n\nStep 2: T = 2π √(0.5 / 200) = 2π √(1 / 400) = 2π / 20 = π / 10 = 0.314 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 787,
    question: "A body is executing simple harmonic motion with frequency n. The frequency of its potential energy is: [NEET 2021]",
    optionA: "4n",
    optionB: "n",
    optionC: "2n",
    optionD: "3n",
    correctOption: "C",
    explanation: "Step 1: Expression for potential energy in SHM:\nDisplacement: x(t) = A sin(2π n t).\nPotential energy: U(t) = (1/2) k x² = (1/2) k A² sin²(2π n t).\n\nStep 2: Use identity sin²(θ) = (1 - cos 2θ) / 2:\nU(t) = (1/4) k A² [1 - cos(4π n t)].\n\nStep 3: Analyze the frequency of the potential energy term:\nThe cosine oscillation term has angular frequency ω' = 4π n = 2π (2n).\nTherefore, the frequency of potential energy is 2n.\n(In one complete cycle of motion, the particle passes through the extreme position twice, so potential energy attains its maximum twice per cycle).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If an oscillator has a time period T, what is the time period of its kinetic energy oscillation? [Same Concept Q]",
      option_a: "T / 2",
      option_b: "T",
      option_c: "2 T",
      option_d: "T / 4",
      correct_option: "A",
      explanation: "Step 1: Frequency doubles (f' = 2f), so period halves: T' = T / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 786,
    question: "Two pendulums of lengths 121 cm and 100 cm start vibrating in phase. At some instant, the two are at their mean positions in the same phase. The minimum number of vibrations of the shorter pendulum after which the two are again in phase at the mean position is: [NEET 2022 Phase 1]",
    optionA: "11",
    optionB: "9",
    optionC: "10",
    optionD: "8",
    correctOption: "A",
    explanation: "Step 1: Formula for time period of a simple pendulum:\nT = 2π √(L / g) → T ∝ √L.\n\nStep 2: Ratio of time periods:\nT₁ / T₂ = √(L₁ / L₂) = √(121 / 100) = 11 / 10.\n\nStep 3: Let the shorter pendulum (length 100 cm, period T₂) complete n vibrations while the longer pendulum (length 121 cm, period T₁) completes (n - 1) vibrations in the same total time t:\nt = n × T₂ = (n - 1) × T₁.\n\nStep 4: Solve for n:\nn / (n - 1) = T₁ / T₂ = 11 / 10\n10n = 11(n - 1)\n10n = 11n - 11\nn = 11.\n\nStep 5: Therefore, the shorter pendulum completes a minimum of 11 vibrations.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two pendulums of lengths 144 cm and 100 cm start together in phase. What is the minimum number of oscillations of the longer pendulum when they are next in phase? [Same Concept Q]",
      option_a: "5",
      option_b: "6",
      option_c: "10",
      option_d: "12",
      correct_option: "A",
      explanation: "Step 1: T₁ / T₂ = √(144 / 100) = 12 / 10 = 6 / 5.\n\nStep 2: N × T₁ = (N + 1) × T₂ → N / (N + 1) = 5 / 6 → N = 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 785,
    question: "Identify the function which represents a non-periodic motion. [NEET 2022 Phase 2]",
    optionA: "sin(ωt + π/4)",
    optionB: "e⁻ωᵗ",
    optionC: "sin(ωt)",
    optionD: "sin(ωt) + cos(ωt)",
    correctOption: "B",
    explanation: "Step 1: A periodic function satisfies f(t + T) = f(t) for all t, repeating its values after a constant interval T.\n\nStep 2: Evaluate each option:\n- sin(ωt + π/4) repeats every period T = 2π / ω (Periodic).\n- sin(ωt) repeats every period T = 2π / ω (Periodic).\n- sin(ωt) + cos(ωt) = √2 sin(ωt + π/4) repeats every period T = 2π / ω (Periodic).\n- e⁻ωᵗ decreases monotonically towards zero as t → ∞ and never repeats its value. Hence, it is strictly non-periodic.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following functions is non-periodic? [Same Concept Q]",
      option_a: "ln(1 + ωt)",
      option_b: "cos²(ωt)",
      option_c: "tan(ωt)",
      option_d: "sin(2ωt)",
      correct_option: "A",
      explanation: "Step 1: Logarithmic function ln(1 + ωt) grows monotonically and never repeats, representing non-periodic motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 784,
    question: "Match List-I with List-II:\nList-I (Graphs):\n(a) Damped oscillation curve\n(b) Straight line passing through the origin with negative slope\n(c) Sine wave with constant amplitude\n(d) Curves of potential energy and kinetic energy\nList-II (Physical Situations):\n(i) Total mechanical energy is conserved\n(ii) Bob of a pendulum oscillating under negligible air friction\n(iii) Restoring force of a spring (F vs x)\n(iv) Bob of a pendulum oscillating with air friction\nChoose the correct option: [NEET 2022 Phase 2]",
    optionA: "(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)",
    optionB: "(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)",
    optionC: "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)",
    optionD: "(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)",
    correctOption: "C",
    explanation: "Step 1: Match each graph in List-I with its physical phenomenon in List-II:\n- (a) Damped oscillation curve corresponds to a pendulum oscillating in the presence of resistive air friction (iv).\n- (b) Straight line passing through the origin with negative slope represents Hooke's restoring force of a spring F = -k x (iii).\n- (c) Sine wave with constant amplitude corresponds to undamped simple harmonic oscillation under negligible air friction (ii).\n- (d) Parabolic curves of potential energy and kinetic energy whose sum remains constant represent total mechanical energy conservation (i).\n\nStep 2: Correct mapping: (a)-(iv), (b)-(iii), (c)-(ii), (d)-(i).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What does the slope of the force versus displacement graph (F vs x) for an ideal spring represent? [Same Concept Q]",
      option_a: "Negative of spring constant (-k)",
      option_b: "Mass of the oscillator",
      option_c: "Total energy",
      option_d: "Time period",
      correct_option: "A",
      explanation: "Step 1: F = -k x → dF/dx = -k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 783,
    question: "The x-t graph of a particle performing simple harmonic motion is shown in the figure, where amplitude is 1 m and time period T = 8 s. The acceleration of the particle at t = 2 s is: [NEET 2023]",
    optionA: "-π² / 8 m s⁻²",
    optionB: "π² / 16 m s⁻²",
    optionC: "-π² / 16 m s⁻²",
    optionD: "π² / 8 m s⁻²",
    correctOption: "C",
    explanation: "Step 1: Determine the equation of motion from the x-t graph:\nThe particle starts at the origin at t = 0 (x = 0) and moves towards positive displacement:\nx(t) = A sin(ω t).\nGiven amplitude A = 1 m and time period T = 8 s.\n\nStep 2: Calculate angular frequency ω:\nω = 2π / T = 2π / 8 = π / 4 rad/s.\n\nStep 3: Evaluate displacement at t = 2 s:\nx(2) = 1 × sin[(π / 4) × 2] = sin(π / 2) = 1 m.\n\nStep 4: Calculate acceleration using a = -ω² x:\na(2) = -ω² × x(2) = -(π / 4)² × (1) = -π² / 16 m s⁻².\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An SHM oscillator has amplitude 2 m and period 4 s. What is its acceleration at maximum positive displacement? [Same Concept Q]",
      option_a: "-π² / 2 m/s²",
      option_b: "π² / 4 m/s²",
      option_c: "-π² m/s²",
      option_d: "-2π² m/s²",
      correct_option: "A",
      explanation: "Step 1: ω = 2π / 4 = π / 2 rad/s.\n\nStep 2: a = -ω² A = -(π / 2)² × 2 = -(π² / 4) × 2 = -π² / 2 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 782,
    question: "A simple pendulum oscillating in air has a period of √3 s. If it is completely immersed in a non-viscous liquid having density one-fourth of the material of the bob, the new period will be: [NEET 2023 Manipur]",
    optionA: "2√3 s",
    optionB: "2 / √3 s",
    optionC: "2 s",
    optionD: "√3 / 2 s",
    correctOption: "C",
    explanation: "Step 1: Formula for time period of simple pendulum: T = 2π √(l / g_eff).\n\nStep 2: In liquid, the effective gravitational acceleration is reduced due to buoyant upthrust:\ng_eff = g [1 - (ρ_liquid / ρ_bob)].\n\nStep 3: Given ρ_liquid / ρ_bob = 1 / 4:\ng_eff = g [1 - 1/4] = 3g / 4.\n\nStep 4: Ratio of time periods:\nT' / T = √(g / g_eff) = √[g / (3g / 4)] = √(4 / 3) = 2 / √3.\n\nStep 5: Calculate new period T':\nT' = T × (2 / √3) = √3 × (2 / √3) = 2 s.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A pendulum has period T in air. If immersed in a liquid of density half that of the bob, its new period is: [Same Concept Q]",
      option_a: "√2 T",
      option_b: "T / √2",
      option_c: "2 T",
      option_d: "T / 2",
      correct_option: "A",
      explanation: "Step 1: g_eff = g(1 - 1/2) = g / 2.\n\nStep 2: T' = T √(g / g_eff) = T √(2) = √2 T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 781,
    question: "If the mass of the bob in a simple pendulum is increased to thrice its original mass and its length is made half its original length, then the new time period of oscillation is x/2 times its original time period. The value of x is: [NEET 2024]",
    optionA: "√3",
    optionB: "√2",
    optionC: "2√3",
    optionD: "4",
    correctOption: "B",
    explanation: "Step 1: Formula for period of a simple pendulum:\nT = 2π √(L / g).\nThe time period is completely independent of the mass of the bob.\n\nStep 2: When length L is halved (L' = L / 2):\nT' = 2π √(L' / g) = 2π √[(L / 2) / g] = (1 / √2) × [2π √(L / g)] = T / √2.\n\nStep 3: Rationalize the expression:\nT' = (√2 / 2) T.\n\nStep 4: Given T' = (x / 2) T:\nComparing gives x = √2.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the length of a simple pendulum is doubled and bob mass halved, its time period changes by a factor of: [Same Concept Q]",
      option_a: "√2",
      option_b: "2",
      option_c: "1 / √2",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: T ∝ √L (mass has no effect) → T' / T = √(2) = √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 780,
    question: "If x = 5 sin(πt + π/3) m represents the motion of a particle executing simple harmonic motion, the amplitude and time period of motion, respectively, are: [NEET 2024]",
    optionA: "5 cm, 2 s",
    optionB: "5 m, 2 s",
    optionC: "5 cm, 1 s",
    optionD: "5 m, 1 s",
    correctOption: "B",
    explanation: "Step 1: Compare the given equation with the standard SHM equation:\nx(t) = A sin(ω t + φ).\n\nStep 2: Extract amplitude A:\nAmplitude A = 5 m.\n\nStep 3: Extract angular frequency ω:\nω = π rad/s.\n\nStep 4: Calculate time period T:\nT = 2π / ω = 2π / π = 2 s.\n\nStep 5: Thus, amplitude and time period are 5 m and 2 s respectively.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For an oscillation x = 0.4 cos(4π t) m, what are its amplitude and frequency? [Same Concept Q]",
      option_a: "0.4 m, 2 Hz",
      option_b: "0.4 m, 4 Hz",
      option_c: "0.2 m, 2 Hz",
      option_d: "0.4 m, 0.5 Hz",
      correct_option: "A",
      explanation: "Step 1: A = 0.4 m; ω = 4π rad/s → f = ω / 2π = 4π / 2π = 2 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 779,
    question: "The two-dimensional motion of a particle described by r⃗ = (î + 2ĵ) A cos(ωt) is: A. Parabolic path B. Elliptical path C. Periodic motion D. Simple harmonic motion. Choose the correct answer: [NEET 2024 Re-Examination]",
    optionA: "B, C, and D only",
    optionB: "A, B, and C only",
    optionC: "A, C, and D only",
    optionD: "C and D only",
    correctOption: "D",
    explanation: "Step 1: Analyze the position vector r⃗(t):\nr⃗(t) = (î + 2ĵ) A cos(ωt).\nNotice that the directional vector (î + 2ĵ) is constant in time.\n\nStep 2: Path of the motion:\nLet s(t) = A cos(ωt) be the scalar coordinate along the line parallel to (î + 2ĵ).\nThe particle moves back and forth strictly along the fixed straight line y = 2x.\nIt is neither a parabola nor an ellipse.\n\nStep 3: Type of motion:\n- The motion repeats itself every period T = 2π / ω, so it is a Periodic motion (C).\n- The restoring acceleration is a⃗ = d²r⃗/dt² = -ω² r⃗, which is directly proportional to displacement and directed towards the origin, so it is Simple Harmonic Motion (D).\n\nStep 4: Therefore, statements C and D only are correct.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A particle's motion is given by r⃗ = (2 î + 3 ĵ) sin(ωt). The path of the particle is: [Same Concept Q]",
      option_a: "A straight line",
      option_b: "A circle",
      option_c: "An ellipse",
      option_d: "A parabola",
      correct_option: "A",
      explanation: "Step 1: x = 2 sin(ωt) and y = 3 sin(ωt) → y = (3/2) x, which is a straight line through the origin.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 778,
    question: "A particle executing simple harmonic motion with amplitude A has equal potential and kinetic energies at the displacement: [NEET 2024 Re-Examination]",
    optionA: "2√A",
    optionB: "A / 2",
    optionC: "A / √2",
    optionD: "A √2",
    correctOption: "C",
    explanation: "Step 1: Formulas for energies in SHM at displacement x:\nKinetic energy: K = (1/2) k (A² - x²)\nPotential energy: U = (1/2) k x²\n\nStep 2: Equate kinetic and potential energies (K = U):\n(1/2) k (A² - x²) = (1/2) k x²\nA² - x² = x²\n2x² = A²\nx² = A² / 2\nx = ± A / √2.\n\nStep 3: Therefore, kinetic and potential energies are equal at displacement A / √2.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "At what displacement from the mean position is the kinetic energy three times the potential energy? [Same Concept Q]",
      option_a: "A / 2",
      option_b: "A / √3",
      option_c: "A √3 / 2",
      option_d: "A / 4",
      correct_option: "A",
      explanation: "Step 1: K = 3U → (1/2) k (A² - x²) = 3 [(1/2) k x²] → A² - x² = 3x² → 4x² = A² → x = A / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 777,
    question: "Two identical point masses P and Q, suspended from two separate massless springs of spring constants k₁ and k₂ respectively, oscillate vertically. If their maximum speeds are the same, the ratio A_Q / A_P of the amplitude A_Q of mass Q to the amplitude A_P of mass P is: [NEET 2025]",
    optionA: "√(k₂ / k₁)",
    optionB: "√(k₁ / k₂)",
    optionC: "k₂ / k₁",
    optionD: "k₁ / k₂",
    correctOption: "B",
    explanation: "Step 1: Maximum speed formula in SHM:\nv_max = A × ω = A × √(k / m).\n\nStep 2: For mass P and mass Q (both have identical mass m):\nv_max,P = A_P × √(k₁ / m)\nv_max,Q = A_Q × √(k₂ / m)\n\nStep 3: Given v_max,P = v_max,Q:\nA_P × √(k₁ / m) = A_Q × √(k₂ / m)\nA_P √k₁ = A_Q √k₂\n\nStep 4: Calculate ratio A_Q / A_P:\nA_Q / A_P = √(k₁ / k₂).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If two identical masses on springs k_A and k_B have equal total mechanical energies, what is the ratio of their amplitudes A_A / A_B? [Same Concept Q]",
      option_a: "√(k_B / k_A)",
      option_b: "√(k_A / k_B)",
      option_c: "k_B / k_A",
      option_d: "k_A / k_B",
      correct_option: "A",
      explanation: "Step 1: E = (1/2) k A² → k_A A_A² = k_B A_B² → A_A / A_B = √(k_B / k_A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 776,
    question: "In an oscillating spring-mass system, a spring is connected to a box filled with sand. As the box oscillates, sand leaks slowly out of the box vertically so that the average frequency ω(t) and average amplitude A(t) of the system change with time t. Which of the following depicts these changes correctly? [NEET 2025]",
    optionA: "ω increases, A remains constant",
    optionB: "ω decreases, A increases",
    optionC: "ω increases, A decreases",
    optionD: "ω remains constant, A decreases",
    correctOption: "A",
    explanation: "Step 1: Analyze angular frequency ω(t):\nω(t) = √[k / m(t)].\nAs sand leaks out vertically, the mass m(t) of the box decreases.\nSince mass m(t) decreases, the angular frequency ω(t) increases.\n\nStep 2: Analyze amplitude A(t):\nWhen sand grains leak vertically downwards through a small hole in the floor of the box, they carry away momentum in the vertical direction without exerting any horizontal force or impulse on the box.\nThe velocity of the box at any position is unaltered by the vertical dropping of sand.\nTherefore, the amplitude of oscillation A(t) remains constant.\n\nStep 3: Hence, ω increases while A remains constant.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A trolley loaded with sand oscillates horizontally on a spring. If sand leaks out vertically from the bottom, its time period of oscillation: [Same Concept Q]",
      option_a: "Decreases",
      option_b: "Increases",
      option_c: "Remains constant",
      option_d: "First increases then decreases",
      correct_option: "A",
      explanation: "Step 1: T = 2π √(m / k). As mass m decreases, time period T decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 775,
    question: "Savitha, a Class XI student, while conducting an experiment to determine the effective length of a simple pendulum L, notes down the time taken to complete 30 oscillations as 60 s and hence calculates the length. Taking π² = 9.8 and g = 9.8 m/s², the calculated length of the pendulum is: [NEET 2026]",
    optionA: "0.75 m",
    optionB: "1.5 m",
    optionC: "2 m",
    optionD: "1 m",
    correctOption: "D",
    explanation: "Step 1: Calculate the time period T of one oscillation:\nT = Total time / Number of oscillations = 60 s / 30 = 2.0 s.\n\nStep 2: Formula for the time period of a simple pendulum:\nT = 2π √(L / g)\nT² = 4π² (L / g).\n\nStep 3: Solve for length L:\nL = (g T²) / (4π²).\n\nStep 4: Substitute T = 2 s, g = 9.8 m/s², and π² = 9.8:\nL = [9.8 × (2)²] / [4 × 9.8] = [9.8 × 4] / [4 × 9.8] = 1.0 m.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the length of a seconds pendulum (T = 2 s) where g = 9.8 m/s² and π² = 9.8? [Same Concept Q]",
      option_a: "1.0 m",
      option_b: "0.5 m",
      option_c: "2.0 m",
      option_d: "0.25 m",
      correct_option: "A",
      explanation: "Step 1: L = g T² / (4π²) = 9.8 × 4 / (4 × 9.8) = 1.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 774,
    question: "The sum of kinetic energy and potential energy of a simple pendulum bob is 0.02 joule. The speed of the simple pendulum bob at the equilibrium position is approximately: (Consider mass of the bob = 20 g) [NEET 2026]",
    optionA: "0.2 m/s",
    optionB: "1.41 m/s",
    optionC: "14.1 m/s",
    optionD: "2.0 m/s",
    correctOption: "B",
    explanation: "Step 1: The sum of kinetic and potential energy is the total mechanical energy E:\nE = K + U = 0.02 J.\n\nStep 2: At the equilibrium (mean) position, potential energy is zero (U = 0), and all mechanical energy is in the form of kinetic energy:\nK_max = (1/2) m v_max² = E.\n\nStep 3: Convert mass to SI units:\nm = 20 g = 0.02 kg.\n\nStep 4: Solve for maximum speed v_max:\n(1/2) × 0.02 kg × v_max² = 0.02 J\n(1/2) × v_max² = 1\nv_max² = 2\nv_max = √2 ≈ 1.414 m/s ≈ 1.41 m/s.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A simple harmonic oscillator of mass 0.1 kg has total energy 0.05 J. What is its speed at the equilibrium point? [Same Concept Q]",
      option_a: "1.0 m/s",
      option_b: "0.5 m/s",
      option_c: "2.0 m/s",
      option_d: "1.41 m/s",
      correct_option: "A",
      explanation: "Step 1: (1/2) (0.1) v² = 0.05 → 0.05 v² = 0.05 → v² = 1 → v = 1.0 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 773,
    question: "For a simple pendulum having time period T, the variation of kinetic energy (K.E.) with time (t) is represented by: [NEET 2026]",
    optionA: "Sine-squared curve strictly non-negative with period T / 2",
    optionB: "Cosine curve alternating between positive and negative",
    optionC: "A horizontal straight line",
    optionD: "Parabolic curve",
    correctOption: "A",
    explanation: "Step 1: Expression for velocity in SHM starting from mean position:\nv(t) = v_max cos(ω t).\n\nStep 2: Kinetic energy as a function of time:\nK.E.(t) = (1/2) m v(t)² = (1/2) m v_max² cos²(ω t).\n\nStep 3: Key properties of the K.E. vs t graph:\n- Kinetic energy is always non-negative: K.E. ≥ 0 (it never drops below the time axis).\n- Using cos²(ω t) = [1 + cos(2ω t)] / 2, the frequency of K.E. oscillations is 2ω, which means its time period is T / 2.\n- The curve oscillates sinusoidally between 0 and K_max with time period T / 2.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the time period of the potential energy of a simple pendulum having oscillation period T? [Same Concept Q]",
      option_a: "T / 2",
      option_b: "T",
      option_c: "2 T",
      option_d: "T / 4",
      correct_option: "A",
      explanation: "Step 1: Potential energy U = (1/2) k x² = (1/2) k A² sin²(ω t) oscillates with twice the frequency, hence period is T / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 772,
    question: "Consider a spring-mass simple harmonic oscillator in one dimension. The mass of the particle is m kg and the spring constant is k N m⁻¹. At a given instant, the extension of the spring is x meter and the speed of the particle is v m s⁻¹. On the x-v plane, if the graph of v as a function of x is a circle, then the correct relation is: [RE-NEET 2026]",
    optionA: "k = √m",
    optionB: "k = 1 / m",
    optionC: "k = m",
    optionD: "k = m²",
    correctOption: "C",
    explanation: "Step 1: Write the conservation of mechanical energy equation:\n(1/2) m v² + (1/2) k x² = E\nm v² + k x² = 2E.\n\nStep 2: Express in standard conic form:\n[v² / (2E / m)] + [x² / (2E / k)] = 1.\n\nStep 3: Condition for a circle in the (x, v) coordinate plane:\nFor an ellipse (x² / a²) + (v² / b²) = 1 to become a circle, the semi-axes must be equal: a² = b².\n2E / k = 2E / m\nk = m.\n\nStep 4: Therefore, the condition for a circular trajectory on the x-v plane is k = m.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For an SHM oscillator x = A sin(ω t), what must be the value of angular frequency ω so that the plot of velocity v vs displacement x is a circle? [Same Concept Q]",
      option_a: "1 rad/s",
      option_b: "2π rad/s",
      option_c: "0.5 rad/s",
      option_d: "π rad/s",
      correct_option: "A",
      explanation: "Step 1: v² / (ω A)² + x² / A² = 1. For a circle, ω A = A → ω = 1 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 771,
    question: "A cylindrical cork of uniform density floats in a liquid of density ρ₁. If the cork is depressed slightly and released, it oscillates harmonically with time period T. If the same cork floats in another liquid of density ρ₂, the oscillation has time period 2T. The ratio ρ₂ / ρ₁ is: [RE-NEET 2026]",
    optionA: "1 / 4",
    optionB: "4",
    optionC: "2",
    optionD: "1 / 2",
    correctOption: "A",
    explanation: "Step 1: Formula for time period of vertical oscillations of a floating cylinder:\nT = 2π √[m / (A ρ g)] → T ∝ 1 / √ρ.\n\nStep 2: Write the ratio of time periods in the two liquids:\nT₂ / T₁ = √(ρ₁ / ρ₂).\n\nStep 3: Given T₁ = T and T₂ = 2T:\n2T / T = √(ρ₁ / ρ₂)\n2 = √(ρ₁ / ρ₂)\n4 = ρ₁ / ρ₂.\n\nStep 4: Invert to find the ratio ρ₂ / ρ₁:\nρ₂ / ρ₁ = 1 / 4.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If a floating block has time period T in water (density 1 g/cm³), what is its period in a liquid of density 4 g/cm³? [Same Concept Q]",
      option_a: "T / 2",
      option_b: "2 T",
      option_c: "4 T",
      option_d: "T / 4",
      correct_option: "A",
      explanation: "Step 1: T' = T √(ρ_water / ρ_liquid) = T √(1 / 4) = T / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

