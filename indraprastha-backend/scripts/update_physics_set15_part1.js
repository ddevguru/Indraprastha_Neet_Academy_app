const set15Part1Updates = [
  {
    id: 4797, // Q1
    similar_question: {
      question: "A mass m suspended vertically from a light helical spring oscillates with natural frequency f. What will be the new frequency of oscillation if a mass of 9m is suspended from the same spring?",
      option_a: "f / 3",
      option_b: "3 f",
      option_c: "f / 9",
      option_d: "9 f",
      correct_option: "A",
      explanation: "Step 1: The natural frequency of a spring-mass oscillator of spring constant k and mass m is given by:\nf = (1 / 2π) √(k / m).\n\nStep 2: Therefore, the oscillation frequency is inversely proportional to the square root of the suspended mass:\nf ∝ 1 / √m.\n\nStep 3: When the mass becomes m' = 9m:\nf' = (1 / 2π) √[ k / (9m) ] = (1/3) [ (1 / 2π) √(k / m) ] = f / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4798, // Q2
    similar_question: {
      question: "Two particles 1 and 2 execute simple harmonic motion along the x-axis starting simultaneously from the mean position (x = 0) in the positive direction with the same amplitude A. Their time periods are T₁ = 4.0 s and T₂ = 8.0 s. What is the ratio of their velocities (v₁ : v₂) when they meet for the first time?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: The displacement equations are x₁ = A sin(ω₁ t) and x₂ = A sin(ω₂ t), with ω₁ = 2π / 4 = π / 2 rad/s and ω₂ = 2π / 8 = π / 4 rad/s.\n\nStep 2: They meet when x₁ = x₂: A sin(πt / 2) = A sin(πt / 4).\nThe first non-trivial meeting occurs when the angles satisfy (πt / 2) + (πt / 4) = π  →  3πt / 4 = π  →  t = 4/3 s.\n\nStep 3: At t = 4/3 s: angle₁ = (π/2)(4/3) = 2π/3 (cos = −1/2), and angle₂ = (π/4)(4/3) = π/3 (cos = 1/2).\n\nStep 4: The magnitude of velocity is v = A ω |cos(ωt)|:\nv₁ / v₂ = (A ω₁ |cos(2π/3)|) / (A ω₂ |cos(π/3)|) = [ (π/2) (1/2) ] / [ (π/4) (1/2) ] = (π/2) / (π/4) = 2 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4799, // Q3
    similar_question: {
      question: "For a body performing simple harmonic motion about its equilibrium position with amplitude A, which of the following statements regarding its mechanical energy is CORRECT?",
      option_a: "At the mean (equilibrium) position, the potential energy is minimum (zero) and the kinetic energy is maximum, equal to the total mechanical energy",
      option_b: "At the extreme positions, the total mechanical energy drops to zero",
      option_c: "At the equilibrium position, the kinetic energy is zero",
      option_d: "The total mechanical energy continuously decreases over time in undamped SHM",
      correct_option: "A",
      explanation: "Step 1: The total mechanical energy in undamped SHM is constant: E_total = (1/2) k A².\n\nStep 2: At the mean position (x = 0), potential energy U = (1/2) k x² = 0.\n\nStep 3: By conservation of energy, the kinetic energy at x = 0 is maximal: K_max = (1/2) m v_max² = (1/2) k A² = E_total.\n\nStep 4: At the extreme positions (x = ±A), speed is zero so kinetic energy is zero, and all energy is stored as potential energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4800, // Q4
    similar_question: {
      question: "A simple pendulum of bob mass m and time period T is placed in an electric field. The bob is given a positive charge +q, and a uniform vertical electric field E is directed vertically downwards. What happens to the time period of oscillation?",
      option_a: "The time period decreases (becomes less than T)",
      option_b: "The time period increases (becomes greater than T)",
      option_c: "The time period remains unchanged",
      option_d: "The time period becomes infinite",
      correct_option: "A",
      explanation: "Step 1: The time period of a simple pendulum of length L is given by T = 2π √(L / g_eff).\n\nStep 2: The downward electrostatic force on the charge +q is F_e = q E.\n\nStep 3: The effective downward acceleration is increased: g_eff = g + (q E / m) > g.\n\nStep 4: Since g_eff increases, the time period T' = 2π √(L / g_eff) decreases (T' < T).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4801, // Q5
    similar_question: {
      question: "A block of mass 0.50 kg attached to a horizontal spring of spring constant k = 200 N/m executes simple harmonic motion on a frictionless surface. What is the time period of oscillation? (Take π ≈ 3.14)",
      option_a: "0.314 seconds",
      option_b: "0.628 seconds",
      option_c: "0.157 seconds",
      option_d: "1.256 seconds",
      correct_option: "A",
      explanation: "Step 1: The formula for the time period of a spring-mass oscillator is:\nT = 2π √(m / k).\n\nStep 2: Substitute mass m = 0.50 kg and spring constant k = 200 N/m:\nm / k = 0.50 / 200 = 1 / 400.\n\nStep 3: Compute the square root:\n√(m / k) = √(1 / 400) = 1 / 20 = 0.05.\n\nStep 4: Multiply by 2π:\nT = 2 × 3.1416 × 0.05 = 0.314 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4802, // Q6
    similar_question: {
      question: "What is the time period of oscillation of a simple pendulum of length L inside an elevator that is falling freely under gravity (downward acceleration a = g)?",
      option_a: "Infinite (it ceases to oscillate and stays wherever placed)",
      option_b: "Zero",
      option_c: "2π √(L / g)",
      option_d: "2π √(L / 2g)",
      correct_option: "A",
      explanation: "Step 1: In a freely falling reference frame, the downward acceleration of the frame is a = g.\n\nStep 2: The effective gravitational acceleration inside the elevator is:\ng_eff = g − a = g − g = 0.\n\nStep 3: The time period is:\nT = 2π √(L / g_eff) = 2π √(L / 0) → ∞.\n\nStep 4: With no restoring gravitational torque, the pendulum bob experiences weightlessness and does not oscillate.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4803, // Q7
    similar_question: {
      question: "A mass m connected between two parallel springs of force constants k₁ and k₂ oscillates with frequency f. If both springs are replaced by identical new springs whose force constants are 9 times the original values (9k₁ and 9k₂), what will be the new oscillation frequency?",
      option_a: "3 f",
      option_b: "9 f",
      option_c: "f / 3",
      option_d: "f / 9",
      correct_option: "A",
      explanation: "Step 1: In a parallel spring combination, the effective spring constant is k_eff = k₁ + k₂.\n\nStep 2: Frequency is given by: f = (1 / 2π) √(k_eff / m).\n\nStep 3: When each spring constant is multiplied by 9:\nk_eff' = 9k₁ + 9k₂ = 9 (k₁ + k₂) = 9 k_eff.\n\nStep 4: The new frequency is:\nf' = (1 / 2π) √(9 k_eff / m) = 3 × [ (1 / 2π) √(k_eff / m) ] = 3 f.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4804, // Q8
    similar_question: {
      question: "The displacement of a particle executing simple harmonic motion is given in SI units by x(t) = 0.05 sin(50π t + π/6). What is the time period of oscillation?",
      option_a: "0.04 seconds",
      option_b: "0.02 seconds",
      option_c: "0.05 seconds",
      option_d: "0.10 seconds",
      correct_option: "A",
      explanation: "Step 1: Compare the given equation with the standard SHM form x(t) = A sin(ω t + φ):\nAngular frequency ω = 50π rad/s.\n\nStep 2: The relationship between time period T and angular frequency ω is:\nT = 2π / ω.\n\nStep 3: Substitute ω = 50π:\nT = 2π / (50π) = 2 / 50 = 1 / 25 = 0.04 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4805, // Q9
    similar_question: {
      question: "A uniform helical spring of spring constant k is cut into two pieces with lengths in the ratio 1 : 3. What is the ratio of the spring constant of the shorter piece to that of the longer piece (k_short : k_long)?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "9 : 1",
      option_d: "1 : 9",
      correct_option: "A",
      explanation: "Step 1: For a uniform spring of natural length L, the spring constant k is inversely proportional to length: k ∝ 1 / L  →  k × L = constant.\n\nStep 2: Given the lengths of the two pieces are L₁ = L / 4 and L₂ = 3L / 4:\nk₁ = k (L / L₁) = k [ L / (L/4) ] = 4k\nk₂ = k (L / L₂) = k [ L / (3L/4) ] = (4/3) k.\n\nStep 3: The ratio of the force constant of the shorter piece to the longer piece is:\nk₁ / k₂ = (4k) / [(4/3)k] = 3 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4806, // Q10
    similar_question: {
      question: "A particle performs simple harmonic motion according to the relation x(t) = 0.02 cos(4π t + π/3), where x is in meters and t in seconds. What is the linear frequency of the oscillation?",
      option_a: "2.0 Hz",
      option_b: "4.0 Hz",
      option_c: "0.5 Hz",
      option_d: "1.0 Hz",
      correct_option: "A",
      explanation: "Step 1: Compare with standard cosine SHM form: x(t) = A cos(ω t + φ).\nHere, angular frequency is ω = 4π rad/s.\n\nStep 2: The linear frequency f is related to angular frequency by:\nf = ω / (2π).\n\nStep 3: Substitute ω = 4π:\nf = (4π) / (2π) = 2.0 Hz (cycles per second).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4807, // Q11
    similar_question: {
      question: "Two simple harmonic motions are described by y₁(t) = 6 sin(ωt) + 8 cos(ωt) and y₂(t) = 5 sin(ωt + π/4). What is the ratio of their amplitudes (A₁ : A₂)?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "1 : 1",
      option_d: "√2 : 1",
      correct_option: "A",
      explanation: "Step 1: The amplitude of a superposition of orthogonal harmonic oscillations y = a sin(ωt) + b cos(ωt) is:\nA₁ = √(a² + b²).\n\nStep 2: For y₁(t): a = 6 and b = 8:\nA₁ = √(6² + 8²) = √(36 + 64) = √100 = 10.\n\nStep 3: For y₂(t) = 5 sin(ωt + π/4), the amplitude is directly A₂ = 5.\n\nStep 4: The ratio of amplitudes is:\nA₁ / A₂ = 10 / 5 = 2 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4808, // Q12
    similar_question: {
      question: "Two springs of force constants k₁ = 300 N/m and k₂ = 600 N/m are connected in series end-to-end to support a mass. What is the equivalent force constant k_eff of the combination?",
      option_a: "200 N/m",
      option_b: "900 N/m",
      option_c: "450 N/m",
      option_d: "150 N/m",
      correct_option: "A",
      explanation: "Step 1: For springs connected in series, the reciprocal of the equivalent spring constant is the sum of the reciprocals:\n1 / k_eff = 1 / k₁ + 1 / k₂.\n\nStep 2: Rearranging gives:\nk_eff = (k₁ × k₂) / (k₁ + k₂).\n\nStep 3: Substitute k₁ = 300 N/m and k₂ = 600 N/m:\nk_eff = (300 × 600) / (300 + 600) = 180000 / 900 = 200 N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4809, // Q13
    similar_question: {
      question: "For a particle executing simple harmonic motion with amplitude A and angular frequency ω, which of the following describes the variation of kinetic energy with time t (assuming x = A sin ωt)?",
      option_a: "K(t) oscillates between 0 and (1/2) m ω² A² with double the frequency (2ω), remaining strictly non-negative at all times",
      option_b: "K(t) oscillates sinusoidally between −(1/2) m ω² A² and +(1/2) m ω² A²",
      option_c: "K(t) remains completely constant throughout the oscillation",
      option_d: "K(t) decays exponentially to zero",
      correct_option: "A",
      explanation: "Step 1: With displacement x = A sin(ωt), velocity is v = dx/dt = A ω cos(ωt).\n\nStep 2: Kinetic energy is:\nK(t) = (1/2) m v² = (1/2) m ω² A² cos²(ωt).\n\nStep 3: Using the identity cos² θ = (1 + cos 2θ) / 2:\nK(t) = (1/4) m ω² A² [ 1 + cos(2ωt) ].\n\nStep 4: This is a strictly non-negative function oscillating between 0 and K_max = (1/2) m ω² A² at angular frequency 2ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4810, // Q14
    similar_question: {
      question: "A body executing simple harmonic motion has an angular frequency of ω = 4.0 rad/s and a maximum acceleration of a_max = 8.0 m/s². What is the amplitude of its oscillation?",
      option_a: "0.50 m",
      option_b: "2.00 m",
      option_c: "0.25 m",
      option_d: "1.00 m",
      correct_option: "A",
      explanation: "Step 1: In simple harmonic motion, the acceleration at displacement x is a = −ω² x.\n\nStep 2: The maximum magnitude of acceleration occurs at the extreme displacement (x = A):\na_max = ω² A.\n\nStep 3: Solving for the amplitude A:\nA = a_max / ω².\n\nStep 4: Substitute a_max = 8.0 m/s² and ω = 4.0 rad/s:\nA = 8.0 / (4.0)² = 8.0 / 16.0 = 0.50 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4811, // Q15
    similar_question: {
      question: "A particle executing simple harmonic motion has a total mechanical energy of 100 J. When the particle is at a displacement of x = 0.8 A from its equilibrium position (where A is amplitude), what is its potential energy?",
      option_a: "64 J",
      option_b: "36 J",
      option_c: "80 J",
      option_d: "50 J",
      correct_option: "A",
      explanation: "Step 1: The total mechanical energy in SHM is E = (1/2) k A² = 100 J.\n\nStep 2: The potential energy at any displacement x is:\nU = (1/2) k x² = (1/2) k A² (x / A)² = E × (x / A)².\n\nStep 3: Substitute x / A = 0.8 and E = 100 J:\nU = 100 J × (0.8)² = 100 × 0.64 = 64 J.\n(The remaining 36 J is kinetic energy).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4812, // Q16
    similar_question: {
      question: "Which of the following statements concerning periodic and simple harmonic motions is INCORRECT?",
      option_a: "Every periodic motion is necessarily a simple harmonic motion",
      option_b: "Every simple harmonic motion is a periodic motion",
      option_c: "In simple harmonic motion, the restoring force is directly proportional to displacement and directed toward the equilibrium point",
      option_d: "The total mechanical energy in undamped simple harmonic motion is proportional to the square of the amplitude",
      correct_option: "A",
      explanation: "Step 1: A periodic motion is any motion that repeats itself at regular intervals of time (such as uniform circular motion, planetary orbits, or a bouncing ball).\n\nStep 2: Simple harmonic motion is a very specific type of periodic motion where the restoring force is linear: F = −k x.\n\nStep 3: Thus, all simple harmonic motions are periodic, but NOT all periodic motions are simple harmonic. Statement A is false.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4813, // Q17
    similar_question: {
      question: "For an undamped simple harmonic oscillator of fixed mass and spring constant, which of the following physical quantities remains strictly constant throughout the motion?",
      option_a: "Time period (T) and total mechanical energy (E)",
      option_b: "Velocity (v) and acceleration (a)",
      option_c: "Kinetic energy (K) and potential energy (U)",
      option_d: "Restoring force (F) and momentum (p)",
      correct_option: "A",
      explanation: "Step 1: Velocity, acceleration, restoring force, kinetic energy, and potential energy all oscillate continuously with position and time.\n\nStep 2: The time period T = 2π √(m/k) depends solely on intrinsic system parameters and remains constant.\n\nStep 3: The total mechanical energy E = K + U = (1/2) k A² is also conserved and stays constant at all instants.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4814, // Q18
    similar_question: {
      question: "A mechanical wrist watch operated by a wound helical balance spring is taken from Earth to the surface of the Moon (where gravity is g / 6). How will the timekeeping of the spring watch be affected?",
      option_a: "It keeps accurate time with no change in rate, because its balance wheel frequency depends on spring elasticity, not gravity",
      option_b: "It runs √6 times slower",
      option_c: "It runs √6 times faster",
      option_d: "It stops working completely",
      correct_option: "A",
      explanation: "Step 1: A balance-wheel spring watch has a period determined by the rotational inertia I of the balance wheel and torsional spring constant κ:\nT = 2π √(I / κ).\n\nStep 2: Neither I nor κ depends on local gravitational acceleration g.\n\nStep 3: Therefore, the spring watch runs at the exact same rate on the Moon as on Earth.\n(In contrast, a pendulum clock depends on g and would run √6 times slower).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4815, // Q19
    similar_question: {
      question: "A particle executes simple harmonic motion with amplitude A = 10 cm and angular frequency ω = 5 rad/s. What is the speed of the particle when its displacement from the mean position is x = 6 cm?",
      option_a: "40 cm/s (0.40 m/s)",
      option_b: "50 cm/s",
      option_c: "30 cm/s",
      option_d: "25 cm/s",
      correct_option: "A",
      explanation: "Step 1: In simple harmonic motion, the speed at displacement x is given by:\nv = ω √(A² − x²).\n\nStep 2: Substitute amplitude A = 10 cm, x = 6 cm, and ω = 5 rad/s:\n√(A² − x²) = √(10² − 6²) = √(100 − 36) = √64 = 8 cm.\n\nStep 3: Compute speed:\nv = 5 rad/s × 8 cm = 40 cm/s = 0.40 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4816, // Q20
    similar_question: {
      question: "The bob of a simple pendulum of time period T = 2.0 s is replaced by another bob of the same radius but made of lead, having four times the mass (m' = 4m). What is the new time period of the pendulum?",
      option_a: "2.0 seconds (unchanged)",
      option_b: "4.0 seconds",
      option_c: "1.0 second",
      option_d: "8.0 seconds",
      correct_option: "A",
      explanation: "Step 1: The time period of a simple pendulum for small oscillations is given by:\nT = 2π √(L / g).\n\nStep 2: The formula depends only on the effective length L and the local acceleration due to gravity g.\n\nStep 3: The mass m of the bob cancels out in the equation of motion (restoring torque τ = −m g L sin θ = I α = (m L²) α  →  α = −(g/L) θ).\n\nStep 4: Therefore, multiplying the mass by 4 has zero effect on the time period; it remains exactly 2.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4817, // Q21
    similar_question: {
      question: "Two simple harmonic motions of the same frequency ω are given by x₁(t) = A sin(ωt + π/6) and x₂(t) = A cos(ωt). What is the phase difference between the velocity of particle 1 and the velocity of particle 2?",
      option_a: "π / 3",
      option_b: "π / 6",
      option_c: "π / 2",
      option_d: "2π / 3",
      correct_option: "A",
      explanation: "Step 1: Express both displacements as sine functions:\nx₁(t) = A sin(ωt + π/6)\nx₂(t) = A cos(ωt) = A sin(ωt + π/2).\n\nStep 2: In SHM, velocity leads displacement by a constant phase of π/2:\nPhase of v₁ = (ωt + π/6) + π/2 = ωt + 2π/3\nPhase of v₂ = (ωt + π/2) + π/2 = ωt + π.\n\nStep 3: The phase difference between the two velocities is:\nΔφ = (ωt + π) − (ωt + 2π/3) = π − 2π/3 = π / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4818, // Q22
    similar_question: {
      question: "A mass of 2.5 kg hangs in static equilibrium from a vertical spring. If the static extension produced in the spring is measured to be 10 cm (0.10 m), what will be the time period of vertical oscillations when the mass is slightly displaced and released? (Take g = 9.8 m/s²)",
      option_a: "0.635 seconds (approximately 0.63 s)",
      option_b: "0.314 seconds",
      option_c: "1.000 second",
      option_d: "1.256 seconds",
      correct_option: "A",
      explanation: "Step 1: At static equilibrium, the spring force balances weight: k x₀ = m g  →  m / k = x₀ / g.\n\nStep 2: The time period of vertical oscillations is:\nT = 2π √(m / k) = 2π √(x₀ / g).\n\nStep 3: Substitute static extension x₀ = 0.10 m and g = 9.8 m/s²:\nT = 2π √(0.10 / 9.8) = 2 × 3.1416 × √(0.010204) = 6.283 × 0.1010 ≈ 0.635 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4819, // Q23
    similar_question: {
      question: "A particle executes simple harmonic motion with time period T = 12 seconds starting from the mean position. What is the minimum time taken by the particle to travel from the mean position (x = 0) to half its maximum displacement (x = A / 2)?",
      option_a: "1.0 second",
      option_b: "2.0 seconds",
      option_c: "1.5 seconds",
      option_d: "3.0 seconds",
      correct_option: "A",
      explanation: "Step 1: The displacement from the mean position is given by x(t) = A sin(ω t).\n\nStep 2: When x = A / 2:\nA / 2 = A sin(ω t)  →  sin(ω t) = 1/2.\n\nStep 3: The smallest positive angle is ω t = π / 6.\nSince ω = 2π / T:\n(2π / T) t = π / 6  →  t = T / 12.\n\nStep 4: Substitute T = 12 seconds:\nt = 12 / 12 = 1.0 second.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4820, // Q24
    similar_question: {
      question: "The equation of motion of a simple harmonic oscillator is given by x = 0.04 sin(200π t + π/4), where x is in meters and t in seconds. What is the time period of this oscillation?",
      option_a: "0.01 seconds",
      option_b: "0.02 seconds",
      option_c: "0.04 seconds",
      option_d: "0.005 seconds",
      correct_option: "A",
      explanation: "Step 1: Identify the angular frequency from the standard SHM form x = A sin(ω t + φ):\nω = 200π rad/s.\n\nStep 2: The time period is given by:\nT = 2π / ω.\n\nStep 3: Substitute ω = 200π:\nT = 2π / (200π) = 1 / 100 = 0.01 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4821, // Q25
    similar_question: {
      question: "A particle performs simple harmonic motion with a time period of T = 8.0 seconds. If its speed while passing through the equilibrium position is v_max = 2.0 m/s, what is the amplitude of oscillation?",
      option_a: "8 / π meters (approximately 2.55 m)",
      option_b: "16 / π meters",
      option_c: "4 / π meters",
      option_d: "2 / π meters",
      correct_option: "A",
      explanation: "Step 1: Angular frequency is ω = 2π / T = 2π / 8.0 = π / 4 rad/s.\n\nStep 2: The maximum velocity (at the equilibrium position) is given by:\nv_max = ω A.\n\nStep 3: Solve for amplitude A:\nA = v_max / ω = 2.0 / (π / 4) = 8 / π meters ≈ 2.55 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4822, // Q26
    similar_question: {
      question: "A particle executing SHM has an acceleration of magnitude 16 cm/s² when it is at a displacement of 4 cm from the mean position. What is the time period of oscillation?",
      option_a: "π seconds (approximately 3.14 s)",
      option_b: "2π seconds",
      option_c: "1.0 second",
      option_d: "2.0 seconds",
      correct_option: "A",
      explanation: "Step 1: In SHM, the magnitude of acceleration is related to displacement x by:\na = ω² x.\n\nStep 2: Substitute a = 16 cm/s² and x = 4 cm:\n16 = ω² (4)  →  ω² = 4  →  ω = 2 rad/s.\n\nStep 3: The time period is:\nT = 2π / ω = 2π / 2 = π seconds ≈ 3.14 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4823, // Q27
    similar_question: {
      question: "A body of mass 0.10 kg attached to a spring oscillates with a natural frequency of f = 5 / π Hz. What is the force constant k of the spring?",
      option_a: "10 N/m",
      option_b: "5 N/m",
      option_c: "20 N/m",
      option_d: "1 N/m",
      correct_option: "A",
      explanation: "Step 1: Angular frequency is ω = 2π f = 2π × (5 / π) = 10 rad/s.\n\nStep 2: The relation between spring constant k, mass m, and angular frequency ω is:\nω² = k / m  →  k = m ω².\n\nStep 3: Substitute mass m = 0.10 kg and ω = 10 rad/s:\nk = 0.10 × (10)² = 0.10 × 100 = 10 N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4824, // Q28
    similar_question: {
      question: "A simple pendulum consists of a hollow spherical metal bob filled completely with water, oscillating with time period T₀. If a small pinhole at the bottom allows water to drain out slowly drop by drop until it is completely empty, how does the time period T change throughout this process?",
      option_a: "It first increases to a maximum, then decreases back to the original value T₀",
      option_b: "It continuously increases",
      option_c: "It continuously decreases",
      option_d: "It remains completely unchanged throughout",
      correct_option: "A",
      explanation: "Step 1: The time period of a simple pendulum is T = 2π √(L / g), where L is the distance from the pivot point to the center of mass (CM) of the bob.\n\nStep 2: When the sphere is full of water, the CM is at the geometric center of the sphere.\n\nStep 3: As water drains out, the center of mass of the remaining water-metal system shifts downward, increasing the effective length L, which increases the time period T.\n\nStep 4: When the sphere becomes completely empty, the center of mass shifts back up to the geometric center of the hollow sphere, returning the effective length and time period to the initial value T₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4825, // Q29
    similar_question: {
      question: "A particle moves in a circle with constant speed v. How is this motion classified with respect to periodicity and simple harmonic motion?",
      option_a: "It is periodic but not simple harmonic",
      option_b: "It is both periodic and simple harmonic",
      option_c: "It is simple harmonic but not periodic",
      option_d: "It is neither periodic nor oscillatory",
      correct_option: "A",
      explanation: "Step 1: The particle repeats its path and state of motion at regular, equal time intervals T = 2π R / v, satisfying the definition of periodic motion.\n\nStep 2: In SHM, motion must be rectilinear and bounded about an equilibrium position with a restoring force proportional to displacement (F = −k x).\n\nStep 3: Circular motion is two-dimensional with a constant-magnitude centripetal force directed toward the center, not a linear restoring force.\n(However, the projection of uniform circular motion onto any diameter is simple harmonic).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4826, // Q30
    similar_question: {
      question: "A particle executes simple harmonic motion with a linear frequency f. With what frequency does its kinetic energy oscillate between zero and maximum?",
      option_a: "2 f",
      option_b: "f",
      option_c: "f / 2",
      option_d: "4 f",
      correct_option: "A",
      explanation: "Step 1: In one complete cycle of SHM (time period T), the particle passes through the equilibrium position twice (maximum KE) and reaches extreme positions twice (zero KE).\n\nStep 2: Mathematically, kinetic energy varies as:\nK(t) = (1/2) m v² = (1/2) m ω² A² cos²(ω t) = (1/4) m ω² A² [ 1 + cos(2ω t) ].\n\nStep 3: The angular frequency of kinetic energy is 2ω, which corresponds to a linear frequency of:\nf_KE = 2 f.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart1() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Admin login failed');

    console.log(`Starting update of Set 15 Part 1 (${set15Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set15Part1Updates) {
      const updateRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          similarQuestion: item.similar_question
        })
      });
      const data = await updateRes.json();
      if (data.success) {
        successCount++;
        console.log(`[${successCount}/${set15Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 15 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
