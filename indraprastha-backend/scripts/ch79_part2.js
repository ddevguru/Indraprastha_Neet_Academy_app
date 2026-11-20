module.exports = [
  {
    id: 808,
    question: "Two simple harmonic motions of angular frequencies 100 and 1000 rad s⁻¹ have the same displacement amplitude. The ratio of their maximum accelerations is: [AIPMT 2008]",
    optionA: "1 : 10³",
    optionB: "1 : 10⁴",
    optionC: "1 : 10",
    optionD: "1 : 10²",
    correctOption: "D",
    explanation: "Step 1: Formula for maximum acceleration in simple harmonic motion:\na_max = ω² A.\n\nStep 2: Since both oscillators have the same displacement amplitude A:\na_max₁ / a_max₂ = (ω₁ / ω₂)².\n\nStep 3: Substitute the given angular frequencies (ω₁ = 100 rad/s, ω₂ = 1000 rad/s):\na_max₁ / a_max₂ = (100 / 1000)² = (1 / 10)² = 1 / 100 = 1 : 10².\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two particles executing SHM with equal amplitudes have frequencies 2 Hz and 6 Hz. What is the ratio of their maximum accelerations? [Same Concept Q]",
      option_a: "1 : 9",
      option_b: "1 : 3",
      option_c: "1 : 27",
      option_d: "1 : 6",
      correct_option: "A",
      explanation: "Step 1: a_max ∝ f².\n\nStep 2: Ratio = (2 / 6)² = (1 / 3)² = 1 / 9 = 1 : 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 807,
    question: "Which one of the following equations of motion represents simple harmonic motion? Here k, k₀, k₁, and a are all positive constants. [AIPMT 2009]",
    optionA: "Acceleration = -k (x + a)",
    optionB: "Acceleration = k (x + a)",
    optionC: "Acceleration = -ω² x²",
    optionD: "Acceleration = -k₀ x + k₁ x²",
    correctOption: "A",
    explanation: "Step 1: The defining condition for simple harmonic motion is that acceleration is directly proportional to displacement from an equilibrium position and directed towards it:\nAcceleration = -C (x - x_mean).\n\nStep 2: For Option A: Acceleration = -k(x + a) = -k[x - (-a)].\nThis describes linear simple harmonic motion centered about the shifted equilibrium position x_mean = -a with ω² = k.\n\nStep 3: Other options either have positive restoring force (repulsive), quadratic terms, or power violations.\n\nStep 4: Therefore, Acceleration = -k(x + a) represents SHM.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following differential equations represents a simple harmonic oscillator? [Same Concept Q]",
      option_a: "d²x/dt² + 4x = 0",
      option_b: "d²x/dt² - 4x = 0",
      option_c: "d²x/dt² + 4x² = 0",
      option_d: "dx/dt + 4x = 0",
      correct_option: "A",
      explanation: "Step 1: Standard SHM equation: d²x/dt² + ω² x = 0.\nHere ω² = 4 > 0, which represents simple harmonic motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 806,
    question: "A simple pendulum performs simple harmonic motion about x = 0 with amplitude a and time period T. The speed of the pendulum at x = a/2 will be: [AIPMT 2009]",
    optionA: "π a / T",
    optionB: "3π² a / T",
    optionC: "π a √3 / T",
    optionD: "π a √3 / (2T)",
    correctOption: "C",
    explanation: "Step 1: Formula for speed as a function of displacement in SHM:\nv = ω √(a² - x²).\n\nStep 2: Substitute displacement x = a / 2:\nv = ω √[a² - (a/2)²] = ω √[a² - a²/4] = ω √(3a²/4) = (√3 / 2) a ω.\n\nStep 3: Express angular frequency ω in terms of time period T (ω = 2π / T):\nv = (√3 / 2) a × (2π / T) = (π a √3) / T.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the speed of an oscillating particle of amplitude A and period T when it is at distance x = A / √2 from the equilibrium position? [Same Concept Q]",
      option_a: "√2 π A / T",
      option_b: "2π A / T",
      option_c: "π A / T",
      option_d: "π A / (√2 T)",
      correct_option: "A",
      explanation: "Step 1: v = ω √(A² - x²) = (2π / T) √(A² - A²/2) = (2π / T) (A / √2) = √2 π A / T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 805,
    question: "The period of oscillation of a mass M suspended from a spring of negligible mass is T. If another mass M is also suspended along with it, the period of oscillation will now be: [AIPMT 2010 Prelims]",
    optionA: "T",
    optionB: "T / √2",
    optionC: "2 T",
    optionD: "√2 T",
    correctOption: "D",
    explanation: "Step 1: Formula for the time period of a spring-mass oscillator:\nT = 2π √(m / k) → T ∝ √m.\n\nStep 2: Initially, mass = M, so T = 2π √(M / k).\n\nStep 3: When another mass M is added, total suspended mass becomes M' = M + M = 2M:\nT' = 2π √(2M / k) = √2 × [2π √(M / k)] = √2 T.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If the suspended mass on a spring is quadrupled (4m), the period of oscillation becomes: [Same Concept Q]",
      option_a: "2 T",
      option_b: "4 T",
      option_c: "T / 2",
      option_d: "T / 4",
      correct_option: "A",
      explanation: "Step 1: T ∝ √m → T' = √(4) T = 2 T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 804,
    question: "The displacement of a particle along the x-axis is given by x = a sin²(ωt). The motion of the particle corresponds to: [AIPMT 2010 Prelims]",
    optionA: "Simple harmonic motion of frequency ω / π",
    optionB: "Simple harmonic motion of frequency 3ω / (2π)",
    optionC: "Non-simple harmonic motion",
    optionD: "Simple harmonic motion of frequency ω / (2π)",
    correctOption: "A",
    explanation: "Step 1: Use trigonometric identity sin²(θ) = (1 - cos 2θ) / 2 to rewrite x(t):\nx = a [1 - cos(2ωt)] / 2 = (a / 2) - (a / 2) cos(2ωt).\n\nStep 2: Rearrange about shifted origin:\n[x - (a / 2)] = -(a / 2) cos(2ωt).\nThis represents simple harmonic motion with amplitude a / 2 about the mean position x = a / 2.\n\nStep 3: Determine angular frequency and linear frequency:\nAngular frequency of oscillation ω' = 2ω.\nLinear frequency f = ω' / 2π = 2ω / 2π = ω / π.\n\nStep 4: Therefore, the motion is SHM with frequency ω / π.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the frequency of oscillation of a particle whose displacement is given by y = A cos²(ωt)? [Same Concept Q]",
      option_a: "ω / π",
      option_b: "ω / 2π",
      option_c: "2ω / π",
      option_d: "4ω / π",
      correct_option: "A",
      explanation: "Step 1: y = A (1 + cos 2ωt) / 2 = A/2 + (A/2) cos(2ωt).\n\nStep 2: Angular frequency = 2ω → f = 2ω / 2π = ω / π.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 803,
    question: "Out of the following functions representing the motion of a particle, which represent SHM?\n(1) y = sin(ωt) - cos(ωt)\n(2) y = sin³(ωt)\n(3) y = 5 cos(3π/4 - 3ωt)\n(4) y = 1 + ωt + ω²t² [AIPMT 2011 Prelims]",
    optionA: "Only (1)",
    optionB: "Only (4) does not represent SHM",
    optionC: "Only (1) and (3)",
    optionD: "Only (1) and (2)",
    correctOption: "C",
    explanation: "Step 1: Check function (1): y = sin(ωt) - cos(ωt) = √2 sin(ωt - π/4). This is a single sinusoidal harmonic function, which represents SHM.\n\nStep 2: Check function (2): y = sin³(ωt) = (3 sin ωt - sin 3ωt) / 4. This is a superposition of two different frequencies (ω and 3ω), which is periodic but not SHM.\n\nStep 3: Check function (3): y = 5 cos(3π/4 - 3ωt) = 5 cos(3ωt - 3π/4). This is a single cosine harmonic function of frequency 3ω, which represents SHM.\n\nStep 4: Check function (4): y = 1 + ωt + ω²t². This is a non-periodic polynomial function.\n\nStep 5: Thus, only (1) and (3) represent simple harmonic motion.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following functions does NOT represent simple harmonic motion? [Same Concept Q]",
      option_a: "y = cos³(ωt)",
      option_b: "y = 3 sin(2ωt)",
      option_c: "y = 2 cos(ωt + π/6)",
      option_d: "y = sin(ωt) + cos(ωt)",
      correct_option: "A",
      explanation: "Step 1: cos³(ωt) = (cos 3ωt + 3 cos ωt) / 4 involves multiple frequencies, so it is not SHM.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 802,
    question: "Two particles are oscillating along two close parallel straight lines side by side with the same frequency and amplitude. They pass each other moving in opposite directions when their displacement is half of the amplitude. The phase difference between them is: [AIPMT 2011 Mains]",
    optionA: "π / 6 rad",
    optionB: "0 rad",
    optionC: "2π / 3 rad",
    optionD: "π rad",
    correctOption: "C",
    explanation: "Step 1: Let the SHM equations for both particles be:\nx₁ = A sin(φ₁) and x₂ = A sin(φ₂).\n\nStep 2: Both have displacement equal to half amplitude: x₁ = x₂ = A / 2:\nsin(φ₁) = 1 / 2\nsin(φ₂) = 1 / 2.\n\nStep 3: Since they are moving in opposite directions:\nParticle 1 is moving in the positive direction (v₁ > 0 → cos φ₁ > 0): φ₁ = π / 6 (30°).\nParticle 2 is moving in the negative direction (v₂ < 0 → cos φ₂ < 0): φ₂ = π - π/6 = 5π / 6 (150°).\n\nStep 4: Calculate the phase difference Δφ:\nΔφ = φ₂ - φ₁ = (5π / 6) - (π / 6) = 4π / 6 = 2π / 3 radians (120°).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two particles in SHM of equal amplitude pass each other in opposite directions at x = 0. What is their phase difference? [Same Concept Q]",
      option_a: "π rad",
      option_b: "π / 2 rad",
      option_c: "2π rad",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: At x = 0, one moves forward (φ = 0), the other backward (φ = π). Phase difference = π.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 801,
    question: "A particle of mass m oscillates along the x-axis according to the equation x = a sin(ωt). The nature of the graph between momentum p and displacement x of the particle is: [NEET 2013 Karnataka]",
    optionA: "Circle",
    optionB: "Hyperbola",
    optionC: "Ellipse",
    optionD: "Straight line passing through the origin",
    correctOption: "C",
    explanation: "Step 1: Displacement equation:\nx = a sin(ωt) → sin(ωt) = x / a.\n\nStep 2: Linear momentum equation:\nVelocity v = dx/dt = a ω cos(ωt).\nMomentum p = m v = m a ω cos(ωt) → cos(ωt) = p / (m a ω).\n\nStep 3: Use the identity sin²(ωt) + cos²(ωt) = 1:\n(x / a)² + [p / (m a ω)]² = 1.\n\nStep 4: This is the standard equation of an ellipse centered at the origin: (x² / a²) + (y² / b²) = 1 with semi-axes a and b = m a ω.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the shape of the phase-space trajectory (momentum p vs position x) for a 1D harmonic oscillator? [Same Concept Q]",
      option_a: "Ellipse",
      option_b: "Parabola",
      option_c: "Hyperbola",
      option_d: "Circle always",
      correct_option: "A",
      explanation: "Step 1: From energy conservation: E = p² / (2m) + (1/2) k x², which is the equation of an ellipse.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 800,
    question: "The oscillation of a body on a smooth horizontal surface is represented by X = A cos(ωt). Which one of the following graphs correctly shows the variation of acceleration a with time t? [AIPMT 2014]",
    optionA: "Inverted cosine curve starting at -Aω²",
    optionB: "Standard sine curve starting at 0",
    optionC: "Standard cosine curve starting at +Aω²",
    optionD: "Inverted sine curve",
    correctOption: "A",
    explanation: "Step 1: Displacement is given by X = A cos(ωt).\n\nStep 2: Differentiate with respect to time to get velocity:\nv = dX/dt = -A ω sin(ωt).\n\nStep 3: Differentiate again to get acceleration:\na = dv/dt = -A ω² cos(ωt).\n\nStep 4: Graph characteristics:\n- At t = 0, a = -A ω² (starts at a negative peak value).\n- At t = T/4 (ωt = π/2), a = 0.\n- At t = T/2 (ωt = π), a = +A ω².\nThis represents an inverted cosine wave of amplitude A ω².\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If displacement is x = A sin(ωt), what is the shape of the acceleration-time graph? [Same Concept Q]",
      option_a: "Inverted sine curve starting at 0 with initial negative slope",
      option_b: "Standard cosine curve",
      option_c: "Inverted cosine curve",
      option_d: "Positive sine curve",
      correct_option: "A",
      explanation: "Step 1: a = -ω² x = -A ω² sin(ωt), which is an inverted sine curve.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 799,
    question: "When two displacements represented by y₁ = a sin(ωt) and y₂ = b cos(ωt) are superimposed, the resultant motion is: [AIPMT 2015 Cancelled]",
    optionA: "Simple harmonic with amplitude √(a² + b²)",
    optionB: "Simple harmonic with amplitude (a + b) / 2",
    optionC: "Not simple harmonic",
    optionD: "Simple harmonic with amplitude a / b",
    correctOption: "A",
    explanation: "Step 1: Write the superposition of the two perpendicular harmonic oscillations:\ny = y₁ + y₂ = a sin(ωt) + b cos(ωt).\n\nStep 2: Convert to a single sinusoidal function:\nLet a = R cos φ and b = R sin φ.\nThen R² = a² + b² → R = √(a² + b²).\ny = R [sin(ωt) cos φ + cos(ωt) sin φ] = R sin(ωt + φ).\n\nStep 3: This is the equation of simple harmonic motion with resultant amplitude R = √(a² + b²).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the resultant amplitude when y₁ = 3 sin(ωt) and y₂ = 4 cos(ωt) are combined? [Same Concept Q]",
      option_a: "5",
      option_b: "7",
      option_c: "1",
      option_d: "12",
      correct_option: "A",
      explanation: "Step 1: R = √(3² + 4²) = √(9 + 16) = √25 = 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 798,
    question: "A particle is executing SHM along a straight line. Its velocities at distances x₁ and x₂ from the mean position are V₁ and V₂, respectively. Its time period is: [AIPMT 2015 Cancelled]",
    optionA: "2π √[(V₁² + V₂²) / (x₁² + x₂²)]",
    optionB: "2π √[(V₁² - V₂²) / (x₁² - x₂²)]",
    optionC: "2π √[(x₁² + x₂²) / (V₁² + V₂²)]",
    optionD: "2π √[(x₂² - x₁²) / (V₁² - V₂²)]",
    correctOption: "D",
    explanation: "Step 1: Velocity relation in SHM: V² = ω²(A² - x²).\n\nStep 2: Write for both given points:\nV₁² = ω²(A² - x₁²)  --- (Equation 1)\nV₂² = ω²(A² - x₂²)  --- (Equation 2)\n\nStep 3: Subtract Equation 2 from Equation 1:\nV₁² - V₂² = ω² [(A² - x₁²) - (A² - x₂²)]\nV₁² - V₂² = ω² (x₂² - x₁²).\n\nStep 4: Solve for angular frequency ω:\nω² = (V₁² - V₂²) / (x₂² - x₁²)\nω = √[(V₁² - V₂²) / (x₂² - x₁²)].\n\nStep 5: Calculate time period T = 2π / ω:\nT = 2π √[(x₂² - x₁²) / (V₁² - V₂²)].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A particle in SHM has velocities 4 m/s and 3 m/s at displacements 3 m and 4 m from mean position. What is its time period? [Same Concept Q]",
      option_a: "2π s",
      option_b: "π s",
      option_c: "4π s",
      option_d: "1 s",
      correct_option: "A",
      explanation: "Step 1: ω = √[(4² - 3²) / (4² - 3²)] = √[7 / 7] = 1 rad/s.\n\nStep 2: T = 2π / ω = 2π s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 797,
    question: "A particle is executing simple harmonic motion. Its maximum acceleration is α and maximum velocity is β. Then its time period of vibration will be: [AIPMT 2015]",
    optionA: "β² / α",
    optionB: "2π β / α",
    optionC: "β² / α²",
    optionD: "α / β",
    correctOption: "B",
    explanation: "Step 1: Maximum acceleration in SHM: α = ω² A.\n\nStep 2: Maximum velocity in SHM: β = ω A.\n\nStep 3: Divide maximum acceleration by maximum velocity:\nα / β = (ω² A) / (ω A) = ω.\n\nStep 4: Time period T is related to angular frequency ω by:\nT = 2π / ω.\nSubstitute ω = α / β:\nT = 2π / (α / β) = 2π β / α.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the amplitude of an oscillator whose maximum speed is v_m and maximum acceleration is a_m? [Same Concept Q]",
      option_a: "v_m² / a_m",
      option_b: "a_m / v_m",
      option_c: "v_m / a_m",
      option_d: "a_m² / v_m",
      correct_option: "A",
      explanation: "Step 1: v_m = ω A, a_m = ω² A.\n\nStep 2: v_m² / a_m = (ω² A²) / (ω² A) = A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 796,
    question: "A body of mass m is attached to the lower end of a spring whose upper end is fixed. When the mass m is pulled down and released, it oscillates with a time period of 3 s. When the mass is increased by 1 kg, the time period of oscillation becomes 5 s. The value of m in kg is: [NEET 2016 Phase 2]",
    optionA: "3 / 4",
    optionB: "4 / 3",
    optionC: "16 / 9",
    optionD: "9 / 16",
    correctOption: "D",
    explanation: "Step 1: Time period formula for spring-mass system:\nT = 2π √(m / k) → T ∝ √m.\n\nStep 2: Ratio of the two periods:\nT₁ / T₂ = √[m / (m + 1)].\n\nStep 3: Substitute T₁ = 3 s and T₂ = 5 s:\n3 / 5 = √[m / (m + 1)].\n\nStep 4: Square both sides:\n9 / 25 = m / (m + 1)\n9(m + 1) = 25m\n9m + 9 = 25m\n16m = 9\nm = 9 / 16 kg.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A spring loaded with mass M has period 2 s. Adding 3 kg makes the period 4 s. What is M? [Same Concept Q]",
      option_a: "1 kg",
      option_b: "2 kg",
      option_c: "3 kg",
      option_d: "0.5 kg",
      correct_option: "A",
      explanation: "Step 1: (2 / 4)² = M / (M + 3) → 1 / 4 = M / (M + 3) → M + 3 = 4M → 3M = 3 → M = 1 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 795,
    question: "A particle executes linear simple harmonic motion with an amplitude of 3 cm. When the particle is at 2 cm from the mean position, the magnitude of its velocity is equal to that of its acceleration. Its time period in seconds is: [NEET 2017]",
    optionA: "√5 / (2π)",
    optionB: "4π / √5",
    optionC: "2π / √3",
    optionD: "√5 / π",
    correctOption: "B",
    explanation: "Step 1: Write expressions for magnitude of velocity and acceleration at displacement x:\n|v| = ω √(A² - x²)\n|a| = ω² x.\n\nStep 2: Given |v| = |a| at x = 2 cm and A = 3 cm:\nω √(3² - 2²) = ω² (2)\n√(9 - 4) = 2 ω\n√5 = 2 ω\nω = √5 / 2 rad/s.\n\nStep 3: Calculate time period T:\nT = 2π / ω = 2π / (√5 / 2) = 4π / √5 seconds.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "At displacement x = 1 m, an oscillator with amplitude 2 m has equal numerical values of velocity and acceleration. What is its angular frequency? [Same Concept Q]",
      option_a: "√3 rad/s",
      option_b: "1 / √3 rad/s",
      option_c: "3 rad/s",
      option_d: "√2 rad/s",
      correct_option: "A",
      explanation: "Step 1: ω √(2² - 1²) = ω² (1) → √3 = ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 794,
    question: "A spring of force constant k is cut into lengths in the ratio 1 : 2 : 3. They are connected in series and the new force constant is k′. Then they are connected in parallel and the force constant is k″. Then the ratio k′ : k″ is: [NEET 2017]",
    optionA: "1 : 9",
    optionB: "1 : 11",
    optionC: "1 : 14",
    optionD: "1 : 6",
    correctOption: "B",
    explanation: "Step 1: Spring constant is inversely proportional to length (k ∝ 1 / l):\nLet total length be L. Ratio is 1 : 2 : 3, so pieces have lengths:\nl₁ = L / 6, l₂ = 2L / 6 = L / 3, l₃ = 3L / 6 = L / 2.\nSpring constants of the three parts:\nk₁ = 6k, k₂ = 3k, k₃ = 2k.\n\nStep 2: When connected in series:\n1 / k' = (1 / k₁) + (1 / k₂) + (1 / k₃) = (1 / 6k) + (1 / 3k) + (1 / 2k)\n1 / k' = (1 + 2 + 3) / 6k = 6 / 6k = 1 / k → k' = k.\n\nStep 3: When connected in parallel:\nk\" = k₁ + k₂ + k₃ = 6k + 3k + 2k = 11k.\n\nStep 4: Find ratio k' : k\":\nk' / k\" = k / 11k = 1 / 11 = 1 : 11.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A spring of constant k is cut into two equal halves. When connected in parallel, the equivalent spring constant is: [Same Concept Q]",
      option_a: "4k",
      option_b: "2k",
      option_c: "k",
      option_d: "k / 2",
      correct_option: "A",
      explanation: "Step 1: Each half has k₁ = k₂ = 2k.\nIn parallel: k_p = 2k + 2k = 4k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 793,
    question: "A pendulum is hung from the roof of a sufficiently high building and is moving freely to and fro like a simple harmonic oscillator. The acceleration of the bob of the pendulum is 20 m s⁻² at a distance of 5 m from the mean position. The time period of oscillation is: [NEET 2018]",
    optionA: "2π s",
    optionB: "π s",
    optionC: "2 s",
    optionD: "1 s",
    correctOption: "B",
    explanation: "Step 1: Magnitude of acceleration in SHM:\n|a| = ω² x.\n\nStep 2: Given |a| = 20 m/s² at displacement x = 5 m:\n20 = ω² × 5\nω² = 20 / 5 = 4\nω = 2 rad/s.\n\nStep 3: Calculate time period T:\nT = 2π / ω = 2π / 2 = π seconds.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An oscillating body has acceleration 16 m/s² at distance 4 m from mean position. What is its time period? [Same Concept Q]",
      option_a: "π s",
      option_b: "2π s",
      option_c: "0.5π s",
      option_d: "4 s",
      correct_option: "A",
      explanation: "Step 1: ω² = 16 / 4 = 4 → ω = 2 rad/s.\n\nStep 2: T = 2π / 2 = π s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 792,
    question: "The displacement of a particle executing simple harmonic motion is given by y = A₀ + A sin(ωt) + B cos(ωt). The amplitude of its oscillation is given by: [NEET 2019]",
    optionA: "√(A² + B²)",
    optionB: "A + B",
    optionC: "A + √(A² + B²)",
    optionD: "√[A₀² + (A + B)²]",
    correctOption: "A",
    explanation: "Step 1: Analyze the given equation:\ny = A₀ + [A sin(ωt) + B cos(ωt)].\n\nStep 2: The term A₀ is a constant time-independent displacement, which represents a shift in the mean equilibrium position (equilibrium is at y = A₀).\n\nStep 3: Superposition of the time-dependent harmonic terms:\nA sin(ωt) + B cos(ωt) = R sin(ωt + φ)\nwhere the amplitude R is given by:\nR = √(A² + B²).\n\nStep 4: Therefore, the amplitude of oscillation about the equilibrium position is √(A² + B²).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the amplitude of the motion described by y = 5 + 6 sin(ωt) + 8 cos(ωt)? [Same Concept Q]",
      option_a: "10",
      option_b: "14",
      option_c: "19",
      option_d: "5",
      correct_option: "A",
      explanation: "Step 1: Amplitude R = √(6² + 8²) = √(36 + 64) = √100 = 10.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 791,
    question: "The average velocity of a particle executing simple harmonic motion in one complete vibration is: [NEET 2019]",
    optionA: "A ω",
    optionB: "A ω² / 2",
    optionC: "A ω / 2",
    optionD: "Zero",
    correctOption: "D",
    explanation: "Step 1: Definition of average velocity:\nAverage velocity = Total displacement / Total time.\n\nStep 2: In one complete oscillation (one full time period T):\nThe particle starts from a given point, travels through its path, and returns exactly to the same initial position in the same direction.\nHence, net displacement Δx = 0.\n\nStep 3: Calculate average velocity:\nv_avg = 0 / T = Zero.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the average acceleration of an SHM oscillator over one full period T? [Same Concept Q]",
      option_a: "Zero",
      option_b: "ω² A / 2",
      option_c: "ω² A",
      option_d: "2 ω² A / π",
      correct_option: "A",
      explanation: "Step 1: Over one full period, the change in velocity is zero (Δv = 0), so average acceleration is Zero.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

