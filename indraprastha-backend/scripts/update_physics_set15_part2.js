const set15Part2Updates = [
  {
    id: 4827, // Q31
    similar_question: {
      question: "What is the vector average acceleration of a particle executing simple harmonic motion over one complete time period T?",
      option_a: "Zero",
      option_b: "ω² A",
      option_c: "ω² A / 2",
      option_d: "ω² A / √2",
      correct_option: "A",
      explanation: "Step 1: The instantaneous acceleration in SHM is a(t) = −ω² x(t) = −ω² A sin(ω t).\n\nStep 2: The average acceleration over one full period T is:\na_avg = (1 / T) ∫₀ᵀ a(t) dt = −(ω² / T) ∫₀ᵀ x(t) dt.\n\nStep 3: The integral of a pure sine or cosine function over its fundamental period is identically zero:\n∫₀ᵀ sin(ω t) dt = 0.\n\nStep 4: Therefore, the average acceleration over one complete oscillation cycle is exactly zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4828, // Q32
    similar_question: {
      question: "Two identical ideal springs have the same spring constant k₁ = k₂ = k. What is the ratio of the work required to stretch spring 1 by an extension x to the work required to stretch spring 2 by the same extension x?",
      option_a: "1 : 1 (equal work for both)",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: The work done in stretching an ideal spring of force constant k by an extension x from its relaxed state is:\nW = (1/2) k x².\n\nStep 2: For spring 1: W₁ = (1/2) k₁ x².\nFor spring 2: W₂ = (1/2) k₂ x².\n\nStep 3: Since k₁ = k₂ and the extension x is identical:\nW₁ / W₂ = [(1/2) k x²] / [(1/2) k x²] = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4829, // Q33
    similar_question: {
      question: "A student applies a variable restoring force of the form F = −k x^(1/3) on a particle, causing the particle to execute simple harmonic motion about the origin (x > 0). How must the parameter k depend on the displacement x for the motion to be simple harmonic?",
      option_a: "k must increase with displacement as k ∝ x^(2/3)",
      option_b: "k must remain strictly constant",
      option_c: "k must decrease with displacement as k ∝ x^(−1/3)",
      option_d: "The motion can never be simple harmonic for any functional form of k(x)",
      correct_option: "A",
      explanation: "Step 1: In simple harmonic motion, the net restoring force must be strictly linear with displacement:\nF = −C x, where C is a positive constant.\n\nStep 2: Equating this to the given expression F = −k x^(1/3):\n−k x^(1/3) = −C x  →  k = C x / x^(1/3) = C x^(2/3).\n\nStep 3: Therefore, as displacement x increases, the parameter k must increase proportionally to x^(2/3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4830, // Q34
    similar_question: {
      question: "For a particle executing simple harmonic motion, at which of the following positions is the time elapsed between two consecutive visits of the particle to that exact point equal to the full time period T?",
      option_a: "At either of the extreme positions (x = +A or x = −A)",
      option_b: "At the mean equilibrium position (x = 0)",
      option_c: "At x = +A / 2",
      option_d: "At x = −A / 2",
      correct_option: "A",
      explanation: "Step 1: At the mean position (or any intermediate point), the particle visits the location twice per period (once moving forward and once moving backward, separated by T / 2).\n\nStep 2: At an extreme position (such as x = +A), the particle reaches the point with zero velocity, immediately reverses direction, and will not return to this exact extreme position until it completes a full round-trip through the negative extreme and back.\n\nStep 3: Therefore, the time interval between consecutive visits to an extreme position equals exactly one full time period T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4831, // Q35
    similar_question: {
      question: "In simple harmonic motion, the smallest time interval between the particle acquiring a particular velocity v is equal to the full time period T when the value of that velocity v is:",
      option_a: "v = 0 (at the extreme positions)",
      option_b: "v = v_max (at the mean position)",
      option_c: "v = v_max / 2",
      option_d: "v = −v_max / 2",
      correct_option: "A",
      explanation: "Step 1: Velocity is a directed vector quantity with both magnitude and sign: v(t) = v_max cos(ω t).\n\nStep 2: For any intermediate velocity magnitude (0 < |v| < v_max), the particle acquires the same vector velocity v once per period T.\n\nStep 3: However, at the extreme positions, the instantaneous velocity is strictly zero (v = 0).\n\nStep 4: The particle has zero velocity only at x = +A (at t = T/4) and x = −A (at t = 3T/4), but visiting the specific extreme with zero velocity and reversing occurs with period T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4832, // Q36
    similar_question: {
      question: "A particle executes simple harmonic motion with amplitude A. What is the net displacement of the particle over one complete time period T?",
      option_a: "Zero",
      option_b: "A",
      option_c: "2 A",
      option_d: "4 A",
      correct_option: "A",
      explanation: "Step 1: Displacement is defined as the change in position vector: Δx = x_final − x_initial.\n\nStep 2: In one complete time period T, a particle undergoing simple harmonic motion returns precisely to its initial spatial position with the initial velocity.\n\nStep 3: Since x(t + T) = x(t), we have Δx = x(T) − x(0) = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4833, // Q37
    similar_question: {
      question: "What is the total path distance traveled by a particle executing simple harmonic motion of amplitude A during one complete oscillation cycle?",
      option_a: "4 A",
      option_b: "2 A",
      option_c: "A",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Starting from the mean position (x = 0), in one complete cycle the particle:\n- Moves from mean to positive extreme: distance = A\n- Returns from positive extreme to mean: distance = A\n- Moves from mean to negative extreme: distance = A\n- Returns from negative extreme to mean: distance = A.\n\nStep 2: The total path length (distance) covered is:\nDistance = A + A + A + A = 4 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4834, // Q38
    similar_question: {
      question: "A body undergoes simple harmonic motion with amplitude A and angular frequency ω. What is the time-averaged acceleration of the body over one complete period?",
      option_a: "Zero",
      option_b: "A ω²",
      option_c: "A ω² / 2",
      option_d: "A ω² / √2",
      correct_option: "A",
      explanation: "Step 1: The acceleration at any time t is a(t) = −ω² x(t).\n\nStep 2: By definition of the time average over period T:\n⟨a⟩ = (1 / T) ∫₀ᵀ a(t) dt = −(ω² / T) ∫₀ᵀ x(t) dt.\n\nStep 3: Because the displacement x(t) is symmetric about the equilibrium point (x = 0), its integral over any integer number of complete periods is identically zero.\n\nStep 4: Therefore, ⟨a⟩ = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4835, // Q39
    similar_question: {
      question: "The motion of a particle is given by the superposition equation x(t) = 5 sin(ωt) + 12 cos(ωt). What is the nature of this motion and its amplitude?",
      option_a: "Simple harmonic motion with amplitude 13",
      option_b: "Simple harmonic motion with amplitude 17",
      option_c: "Non-harmonic periodic motion",
      option_d: "Simple harmonic motion with amplitude 7",
      correct_option: "A",
      explanation: "Step 1: Any superposition of the form x(t) = a sin(ωt) + b cos(ωt) can be rewritten as a single harmonic term:\nx(t) = A_net sin(ωt + φ), where A_net = √(a² + b²).\n\nStep 2: Substitute a = 5 and b = 12:\nA_net = √(5² + 12²) = √(25 + 144) = √169 = 13.\n\nStep 3: Since it can be expressed as a single sine wave with angular frequency ω, it is a pure simple harmonic motion with amplitude 13.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4836, // Q40
    similar_question: {
      question: "The position vector of a particle is given in plane polar coordinates by r(t) = R [ cos(ωt) i + sin(ωt) j ]. What type of motion does the particle execute?",
      option_a: "Uniform circular motion on a circle of radius R with constant speed v = ω R",
      option_b: "Simple harmonic motion along a straight line",
      option_c: "Parabolic projectile motion",
      option_d: "Rectilinear motion with constant acceleration",
      correct_option: "A",
      explanation: "Step 1: The coordinates are x(t) = R cos(ωt) and y(t) = R sin(ωt).\n\nStep 2: Squaring and adding gives:\nx² + y² = R² cos²(ωt) + R² sin²(ωt) = R².\nThis is the equation of a circle of radius R centered at the origin.\n\nStep 3: The magnitude of position is constant (|r| = R), and speed is |v| = |dr/dt| = |−R ω sin(ωt) i + R ω cos(ωt) j| = ω R = constant.\n\nStep 4: Therefore, the particle executes uniform circular motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4837, // Q41
    similar_question: {
      question: "A particle oscillates along the x-axis according to the equation x(t) = 4 + 3 sin(ωt). What is the mean (equilibrium) position and the amplitude of this simple harmonic motion?",
      option_a: "Mean position at x = 4, and amplitude = 3",
      option_b: "Mean position at x = 0, and amplitude = 7",
      option_c: "Mean position at x = 3, and amplitude = 4",
      option_d: "Mean position at x = 4, and amplitude = 5",
      correct_option: "A",
      explanation: "Step 1: The standard equation for SHM shifted to equilibrium position x₀ is:\nx(t) = x₀ + A sin(ωt).\n\nStep 2: Comparing with x(t) = 4 + 3 sin(ωt):\nx₀ = 4 (the center about which oscillation occurs).\n\nStep 3: The maximum displacement from this center is:\n|x(t) − 4| = |3 sin(ωt)| ≤ 3, so amplitude A = 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4838, // Q42
    similar_question: {
      question: "Two simple harmonic motions are plotted on the same displacement-time axes. Both curves have the exact same peak height A and start from the origin at t = 0, but curve 1 completes two full waves in the same time that curve 2 completes one wave. Which parameter differs between the two motions?",
      option_a: "Frequency (and time period)",
      option_b: "Amplitude",
      option_c: "Initial phase constant",
      option_d: "Equilibrium position",
      correct_option: "A",
      explanation: "Step 1: Both curves have the same maximum vertical displacement, so their amplitudes are equal (A₁ = A₂).\n\nStep 2: Both start from x = 0 in the positive direction at t = 0, so their initial phase constants are identical (φ₁ = φ₂ = 0).\n\nStep 3: However, curve 1 completes twice as many cycles per unit time as curve 2 (f₁ = 2 f₂ and T₁ = T₂ / 2).\n\nStep 4: Therefore, the parameter that differs between the two motions is frequency.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4839, // Q43
    similar_question: {
      question: "The total mechanical energy of a horizontal spring-mass system in SHM is E = (1/2) k A². If the oscillating block of mass m is replaced by another block of mass 3m while the spring constant k and the amplitude A remain unchanged, what is the new total mechanical energy?",
      option_a: "E (remains unchanged)",
      option_b: "3 E",
      option_c: "E / 3",
      option_d: "√3 E",
      correct_option: "A",
      explanation: "Step 1: The total mechanical energy of a spring-mass oscillator is given by:\nE = (1/2) k A².\n\nStep 2: This total energy depends exclusively on the spring stiffness constant k and the amplitude of oscillation A.\n\nStep 3: It is completely independent of the attached mass m (although the frequency decreases as ω = √(k/m), the maximum velocity adjusts such that (1/2) m v_max² remains equal to (1/2) k A²).\n\nStep 4: Therefore, the total mechanical energy remains E.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4840, // Q44
    similar_question: {
      question: "For a particle of mass m executing simple harmonic motion with amplitude A and angular frequency ω, what is the time-averaged kinetic energy and time-averaged potential energy over one complete period?",
      option_a: "⟨K⟩ = ⟨U⟩ = (1/4) m ω² A²",
      option_b: "⟨K⟩ = (1/2) m ω² A² and ⟨U⟩ = 0",
      option_c: "⟨K⟩ = ⟨U⟩ = (1/2) m ω² A²",
      option_d: "⟨K⟩ = 0 and ⟨U⟩ = (1/2) m ω² A²",
      correct_option: "A",
      explanation: "Step 1: The total mechanical energy is constant: E = (1/2) m ω² A².\n\nStep 2: By the virial theorem and time-averaging properties of sinusoidal functions:\n⟨cos²(ωt)⟩ = 1/2 and ⟨sin²(ωt)⟩ = 1/2.\n\nStep 3: The time average of kinetic energy is:\n⟨K⟩ = (1/2) m ω² A² ⟨cos²(ωt)⟩ = (1/4) m ω² A² = E / 2.\n\nStep 4: The time average of potential energy is:\n⟨U⟩ = (1/2) m ω² A² ⟨sin²(ωt)⟩ = (1/4) m ω² A² = E / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4841, // Q45
    similar_question: {
      question: "If the displacement of a particle executing simple harmonic motion oscillates with a frequency of 50 Hz, with what frequency does its potential energy oscillate?",
      option_a: "100 Hz",
      option_b: "50 Hz",
      option_c: "25 Hz",
      option_d: "200 Hz",
      correct_option: "A",
      explanation: "Step 1: The displacement varies as x(t) = A sin(2π f t).\n\nStep 2: The potential energy is:\nU(t) = (1/2) k x² = (1/2) k A² sin²(2π f t) = (1/4) k A² [ 1 − cos(4π f t) ].\n\nStep 3: The term cos(4π f t) has an oscillation frequency equal to:\nf_PE = 2 f.\n\nStep 4: Substitute f = 50 Hz:\nf_PE = 2 × 50 Hz = 100 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4842, // Q46
    similar_question: {
      question: "A block attached to an ideal spring oscillates with time period T. If the spring is cut into two equal halves and the same block is attached to one of the half-springs, what will be the new time period of oscillation?",
      option_a: "T / √2",
      option_b: "T / 2",
      option_c: "√2 T",
      option_d: "T",
      correct_option: "A",
      explanation: "Step 1: The original time period is T = 2π √(m / k).\n\nStep 2: The spring constant is inversely proportional to spring length: k ∝ 1 / L.\nWhen cut into two equal halves, the length is L / 2, so the spring constant of each half doubles: k' = 2k.\n\nStep 3: The new time period with the same mass m is:\nT' = 2π √(m / k') = 2π √(m / 2k) = (1 / √2) [ 2π √(m / k) ] = T / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4843, // Q47
    similar_question: {
      question: "Two bodies A and B of equal mass are suspended from two separate vertical springs of spring constants k₁ and k₂ respectively. If both systems oscillate vertically such that their maximum speeds are equal (v_max,A = v_max,B), what is the ratio of their amplitudes A₁ / A₂?",
      option_a: "√(k₂ / k₁)",
      option_b: "√(k₁ / k₂)",
      option_c: "k₂ / k₁",
      option_d: "k₁ / k₂",
      correct_option: "A",
      explanation: "Step 1: Maximum speed in SHM is given by v_max = ω A.\n\nStep 2: Angular frequency for a spring-mass oscillator is ω = √(k / m).\nThus: v_max = A √(k / m).\n\nStep 3: Since both bodies have equal mass and equal maximum speed:\nA₁ √(k₁ / m) = A₂ √(k₂ / m)  →  A₁ √k₁ = A₂ √k₂.\n\nStep 4: The ratio of amplitudes is:\nA₁ / A₂ = √(k₂ / k₁).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4844, // Q48
    similar_question: {
      question: "A spring-mass system oscillates with natural frequency f₀ in a laboratory. If the entire apparatus is placed inside an elevator that is accelerating vertically upward with constant acceleration a, what will be the frequency of oscillation?",
      option_a: "f₀ (remains exactly unchanged)",
      option_b: "Increases to f₀ √(1 + a/g)",
      option_c: "Decreases to f₀ √(1 − a/g)",
      option_d: "Becomes zero",
      correct_option: "A",
      explanation: "Step 1: The frequency of a spring-mass system is determined strictly by the spring constant k and the oscillating mass m:\nf = (1 / 2π) √(k / m).\n\nStep 2: An upward acceleration changes the effective gravity (g_eff = g + a), which shifts the static equilibrium position downward by Δx = m a / k.\n\nStep 3: However, the restoring force for oscillations about the new equilibrium position remains F_restoring = −k x, which is completely independent of g.\n\nStep 4: Therefore, the oscillation frequency is completely unaffected and remains f₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4845, // Q49
    similar_question: {
      question: "A horizontal spring-mass system is mounted on a table inside a car. When the car accelerates horizontally along a straight highway with constant acceleration a, how does the oscillation frequency of the block change?",
      option_a: "It remains completely unchanged",
      option_b: "It increases",
      option_c: "It decreases",
      option_d: "It drops to zero",
      correct_option: "A",
      explanation: "Step 1: In the accelerating frame of the car, a constant fictitious pseudo-force F_pseudo = −m a acts on the mass.\n\nStep 2: This constant force shifts the equilibrium position by x₀ = m a / k.\n\nStep 3: The differential equation of motion for displacement x' about this new equilibrium is:\nm (d²x'/dt²) + k x' = 0  →  ω = √(k / m).\n\nStep 4: The frequency depends only on m and k, so it remains completely unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4846, // Q50
    similar_question: {
      question: "A pendulum clock that keeps accurate time on Earth (where g = 9.8 m/s²) is taken to the surface of the Moon, where acceleration due to gravity is g / 6. How does the clock behave on the Moon?",
      option_a: "It runs √6 times slower",
      option_b: "It runs √6 times faster",
      option_c: "It runs 6 times slower",
      option_d: "It continues to keep accurate time",
      correct_option: "A",
      explanation: "Step 1: The time period of a pendulum clock is T = 2π √(L / g).\n\nStep 2: On the Moon, g_moon = g / 6, so the time period becomes:\nT_moon = 2π √[ L / (g/6) ] = √6 [ 2π √(L / g) ] = √6 T_earth.\n\nStep 3: Since each tick (period) takes √6 times longer to complete, the clock records fewer seconds per hour and runs √6 times slower.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4847, // Q51
    similar_question: {
      question: "A clock whose timekeeping mechanism is driven by a vertical spring-mass oscillator keeps precise time at the Earth's equator. If this clock is transported to the North Pole (where g is slightly larger due to Earth's oblateness), how will the clock run?",
      option_a: "It continues to keep correct time, because the frequency of a spring-mass oscillator is independent of g",
      option_b: "It runs significantly faster",
      option_c: "It runs significantly slower",
      option_d: "It stops functioning completely",
      correct_option: "A",
      explanation: "Step 1: The period of a spring-mass oscillator is given by T = 2π √(m / k).\n\nStep 2: This period is purely a function of mass m and spring stiffness k, neither of which depends on local gravitational acceleration g.\n\nStep 3: Unlike a pendulum clock whose period T ∝ 1 / √g, the spring-mass clock remains unaffected by variations in g between the equator and the poles and keeps correct time.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4848, // Q52
    similar_question: {
      question: "A pendulum clock that keeps correct time at sea level is moved to a high-altitude mountain observatory where the acceleration due to gravity g is reduced. What adjustment must be made to the pendulum to restore accurate timekeeping?",
      option_a: "Its length L must be decreased",
      option_b: "Its length L must be increased",
      option_c: "The mass of the bob must be increased",
      option_d: "The amplitude of swing must be increased",
      correct_option: "A",
      explanation: "Step 1: The time period of a simple pendulum is T = 2π √(L / g).\n\nStep 2: At higher altitude, g decreases. As a result, T increases, meaning the pendulum swings too slowly and the clock loses time.\n\nStep 3: To restore T to its exact reference value, the ratio L / g must remain constant.\n\nStep 4: Since g has decreased, the pendulum length L must be decreased proportionally.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4849, // Q53
    similar_question: {
      question: "A simple pendulum is suspended from the ceiling of an elevator. While the pendulum is oscillating and the bob is at its lowest point moving with speed v₀, the elevator cable suddenly snaps and the elevator enters free fall. As observed by an occupant inside the elevator, what will the bob do?",
      option_a: "It moves in a vertical circle with constant speed v₀ about the pivot",
      option_b: "It comes to an abrupt halt and hangs motionless",
      option_c: "It continues simple harmonic motion with the same period",
      option_d: "It flies outward in a parabolic path",
      correct_option: "A",
      explanation: "Step 1: During free fall, the elevator and everything inside accelerate downward at g.\n\nStep 2: In the reference frame of the elevator, effective gravity becomes zero: g_eff = g − g = 0.\n\nStep 3: At the moment free fall begins, the bob at its lowest point possesses horizontal speed v₀.\n\nStep 4: With no gravitational force to decelerate it, the string tension provides centripetal acceleration T = m v₀² / L, causing the bob to execute complete circular motion with constant speed v₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6149, // Q54
    similar_question: {
      question: "In the case of driven damped harmonic oscillations under a periodic driving force F(t) = F₀ sin(ω_d t) with damping coefficient b, what is the maximum possible amplitude of oscillation at resonance (when driving frequency ω_d equals natural frequency ω₀)?",
      option_a: "A_max = F₀ / (b ω_d)",
      option_b: "A_max = F₀ / (m ω_d²)",
      option_c: "A_max = F₀ / (m [ω₀² − ω_d²])",
      option_d: "A_max = F₀ / b²",
      correct_option: "A",
      explanation: "Step 1: The steady-state amplitude of a forced damped oscillator is given by:\nA = F₀ / √[ m² (ω₀² − ω_d²)² + b² ω_d² ].\n\nStep 2: At resonance, ω_d ≈ ω₀, so the term m² (ω₀² − ω_d²)² vanishes (or is minimized).\n\nStep 3: The expression simplifies to:\nA_max = F₀ / √(b² ω_d²) = F₀ / (b ω_d).\n\nStep 4: At resonance, the amplitude is strictly limited by the damping coefficient b.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6150, // Q55
    similar_question: {
      question: "An external periodic driving force of angular frequency ω_d acts on a damped mechanical oscillator whose natural unforced angular frequency is ω₀. After initial transient motions have decayed away, with what angular frequency does the system oscillate in steady state?",
      option_a: "With the driving angular frequency ω_d",
      option_b: "With the natural angular frequency ω₀",
      option_c: "With the average angular frequency (ω₀ + ω_d) / 2",
      option_d: "With the beat frequency |ω₀ − ω_d|",
      correct_option: "A",
      explanation: "Step 1: The general solution to the forced oscillation equation consists of a complementary (transient) solution at damped natural frequency and a particular (steady-state) solution.\n\nStep 2: Damping dissipates the transient oscillations exponentially over time.\n\nStep 3: In steady state, the system is driven entirely by the external periodic force and responds at the exact frequency of the driving force (ω_d).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6151, // Q56
    similar_question: {
      question: "In Barton's pendulum experiment, several simple pendulums of different lengths are suspended from a common taut horizontal cord. When one driving pendulum of length L is set into oscillation, which of the other pendulums oscillates with the largest steady-state amplitude?",
      option_a: "The pendulum having the exact same length L as the driver, because its natural frequency matches the driving frequency (resonance)",
      option_b: "The longest pendulum",
      option_c: "The shortest pendulum",
      option_d: "The heaviest pendulum",
      correct_option: "A",
      explanation: "Step 1: The driving pendulum oscillating at natural frequency f_d transmits periodic impulses through the common suspension cord to all other pendulums.\n\nStep 2: Each pendulum has a natural frequency f = (1 / 2π) √(g / l) determined by its length l.\n\nStep 3: For the pendulum with length equal to the driver (l = L), its natural frequency coincides precisely with the driving frequency (f = f_d).\n\nStep 4: This produces the condition of acoustic/mechanical resonance, causing that pendulum to absorb energy maximally and swing with the largest amplitude.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6152, // Q57
    similar_question: {
      question: "A uniform circular disc of moment of inertia I₁ = 0.20 kg·m² is suspended as a torsional pendulum, oscillating with time period T₁ = 2.0 seconds. When a second coaxial disc is placed on top of the first disc, the time period of the composite system increases to T₂ = 4.0 seconds. What is the moment of inertia I₂ of the second disc?",
      option_a: "0.60 kg·m²",
      option_b: "0.80 kg·m²",
      option_c: "0.40 kg·m²",
      option_d: "0.20 kg·m²",
      correct_option: "A",
      explanation: "Step 1: The time period of a torsional pendulum of rotational inertia I and torsional wire constant C is:\nT = 2π √(I / C).\n\nStep 2: Taking the ratio of periods for the initial and combined systems:\nT₂ / T₁ = √(I_total / I₁).\n\nStep 3: Substitute T₁ = 2.0 s, T₂ = 4.0 s, and I₁ = 0.20 kg·m²:\n4.0 / 2.0 = √(I_total / 0.20)  →  2 = √(I_total / 0.20).\n\nStep 4: Square both sides:\n4 = I_total / 0.20  →  I_total = 4 × 0.20 = 0.80 kg·m².\n\nStep 5: The total moment of inertia is I_total = I₁ + I₂:\n0.80 = 0.20 + I₂  →  I₂ = 0.80 − 0.20 = 0.60 kg·m².\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart2() {
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

    console.log(`Starting update of Set 15 Part 2 (${set15Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set15Part2Updates) {
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
        console.log(`[${successCount}/${set15Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 15 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
