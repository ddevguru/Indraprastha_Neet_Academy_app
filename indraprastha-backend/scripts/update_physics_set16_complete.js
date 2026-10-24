const set16Updates = [
  {
    id: 3293, // Q1
    similar_question: {
      question: "A transverse progressive wave traveling on a stretched string is represented by the wave function y(x, t) = A cos(k x − ω t). What is the maximum transverse velocity of any particle of the string?",
      option_a: "A ω",
      option_b: "ω / k",
      option_c: "A k",
      option_d: "A ω / k",
      correct_option: "A",
      explanation: "Step 1: The instantaneous transverse particle velocity is the partial derivative of displacement with respect to time:\nv_p(x, t) = ∂y/∂t = ∂/∂t [ A cos(k x − ω t) ] = A ω sin(k x − ω t).\n\nStep 2: The sine function has a maximum value of 1.\n\nStep 3: Therefore, the maximum transverse particle speed is:\nv_p,max = A ω.\n(Note: This differs from the wave propagation speed, which is v_wave = ω / k).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3294, // Q2
    similar_question: {
      question: "The fundamental frequency of an open organ pipe of length L_open is equal to the third harmonic (first overtone) of a closed organ pipe of length L_closed = 1.5 m. What is the length of the open organ pipe?",
      option_a: "1.0 m",
      option_b: "2.0 m",
      option_c: "3.0 m",
      option_d: "0.5 m",
      correct_option: "A",
      explanation: "Step 1: The fundamental frequency of an open organ pipe of length L_open is:\nf_open = v / (2 L_open).\n\nStep 2: For a pipe closed at one end, only odd harmonics exist. Its first overtone is the 3rd harmonic:\nf_closed = 3 v / (4 L_closed).\n\nStep 3: Equating the two frequencies:\nv / (2 L_open) = 3 v / (4 L_closed)  →  1 / (2 L_open) = 3 / (4 L_closed).\n\nStep 4: Solve for L_open with L_closed = 1.5 m:\n2 L_open = 4 L_closed / 3 = 4(1.5) / 3 = 6.0 / 3 = 2.0 m  →  L_open = 1.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3295, // Q3
    similar_question: {
      question: "A sinusoidal sound wave of wavelength λ propagates through air with speed v. If the maximum particle velocity in the medium is equal to half the wave propagation speed (v_p,max = v / 2), what is the amplitude A of the wave?",
      option_a: "λ / (4π)",
      option_b: "λ / (2π)",
      option_c: "λ / π",
      option_d: "2λ / π",
      correct_option: "A",
      explanation: "Step 1: The wave speed is given by v = ω / k = (2π f) / (2π / λ) = f λ.\n\nStep 2: The maximum particle speed is v_p,max = A ω = A (2π f).\n\nStep 3: Setting v_p,max = v / 2:\nA (2π f) = (f λ) / 2.\n\nStep 4: Cancel frequency f on both sides and solve for amplitude A:\n2π A = λ / 2  →  A = λ / (4π).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3296, // Q4
    similar_question: {
      question: "The displacement of an oscillating particle is given by the superposition y(t) = 8 sin(10π t) + 6 cos(10π t) meters. What is the amplitude of the resulting harmonic motion?",
      option_a: "10 meters",
      option_b: "14 meters",
      option_c: "2 meters",
      option_d: "48 meters",
      correct_option: "A",
      explanation: "Step 1: The superposition of two perpendicular harmonic oscillations of the same angular frequency ω is given by:\ny(t) = a sin(ω t) + b cos(ω t).\n\nStep 2: The resultant amplitude is:\nA_net = √(a² + b²).\n\nStep 3: Substitute a = 8 m and b = 6 m:\nA_net = √(8² + 6²) = √(64 + 36) = √100 = 10 meters.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3297, // Q5
    similar_question: {
      question: "According to Laplace's formula, how does the speed of sound in an ideal gas depend on temperature and pressure under isothermal pressure changes?",
      option_a: "It is directly proportional to the square root of the absolute temperature (v ∝ √T) and is independent of gas pressure at constant temperature",
      option_b: "It increases linearly with pressure and is independent of temperature",
      option_c: "It decreases with increasing temperature and increases with pressure",
      option_d: "It depends only on pressure and volume",
      correct_option: "A",
      explanation: "Step 1: Laplace's formula for the speed of sound in an ideal gas is:\nv = √(γ P / ρ) = √(γ R T / M).\n\nStep 2: At a constant temperature T, if pressure P is increased, the density ρ increases in the exact same proportion (by Boyle's law, P / ρ = constant), so the ratio P / ρ remains unchanged. Thus, speed of sound is independent of pressure.\n\nStep 3: From v = √(γ R T / M), the speed of sound is directly proportional to the square root of absolute temperature T (v ∝ √T).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3298, // Q6
    similar_question: {
      question: "A transverse wave traveling along a wire of linear mass density μ = 0.02 kg/m is described by the equation y(x, t) = 0.01 sin[ 2π (x / 0.2 − t / 0.01) ], where x and y are in meters and t is in seconds. What is the tension in the wire?",
      option_a: "8.0 N",
      option_b: "4.0 N",
      option_c: "16.0 N",
      option_d: "2.0 N",
      correct_option: "A",
      explanation: "Step 1: Compare with standard wave form y = A sin(k x − ω t):\nk = 2π / 0.2 = 10π rad/m  →  λ = 0.2 m\nω = 2π / 0.01 = 200π rad/s  →  f = 100 Hz.\n\nStep 2: The wave propagation speed is:\nv = ω / k = (200π) / (10π) = 20 m/s.\n\nStep 3: For a stretched wire, wave speed is related to tension T and linear density μ by:\nv = √(T / μ)  →  v² = T / μ  →  T = μ v².\n\nStep 4: Substitute μ = 0.02 kg/m and v = 20 m/s:\nT = 0.02 × (20)² = 0.02 × 400 = 8.0 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3299, // Q7
    similar_question: {
      question: "Which of the following types of waves is strictly a LONGITUDINAL wave and cannot be polarized?",
      option_a: "Sound waves propagating through gaseous air",
      option_b: "Visible light waves",
      option_c: "X-rays",
      option_d: "Transverse waves on a stretched guitar string",
      correct_option: "A",
      explanation: "Step 1: In a transverse wave, particle oscillations are perpendicular to the wave propagation direction (e.g., electromagnetic waves such as light and X-rays, or waves on a string).\n\nStep 2: In a longitudinal wave, particles oscillate parallel to the direction of wave propagation (forming alternating compressions and rarefactions).\n\nStep 3: Sound waves traveling in gases require volume elasticity (bulk modulus) and propagate purely as longitudinal waves, meaning they cannot undergo polarization.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3300, // Q8
    similar_question: {
      question: "Three sound waves of equal amplitude have frequencies (f₀ − 2), f₀, and (f₀ + 2) Hz. When they superpose simultaneously in air, what is the beat frequency heard by a listener?",
      option_a: "2 beats per second",
      option_b: "4 beats per second",
      option_c: "1 beat per second",
      option_d: "Zero beats",
      correct_option: "A",
      explanation: "Step 1: Superposition of the three waves yields:\ny(t) = A [ sin 2π(f₀ − 2)t + sin 2π(f₀ + 2)t + sin 2π f₀ t ].\n\nStep 2: Combine the first and second terms using prosthaphaeresis:\nsin 2π(f₀ − 2)t + sin 2π(f₀ + 2)t = 2 cos(2π × 2 t) sin(2π f₀ t).\n\nStep 3: Factoring gives:\ny(t) = A [ 1 + 2 cos(4π t) ] sin(2π f₀ t).\n\nStep 4: The amplitude envelope varies as |1 + 2 cos(4π t)|, which exhibits intensity maxima with a period of Δt = 1/2 s, corresponding to a beat frequency of 2 Hz (2 beats per second).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3301, // Q9
    similar_question: {
      question: "A standing wave is set up in a wire of length L fixed firmly at both ends, oscillating in its fifth harmonic (n = 5). How many nodes (including the ends) and antinodes are formed along the wire?",
      option_a: "6 nodes and 5 antinodes",
      option_b: "5 nodes and 5 antinodes",
      option_c: "6 nodes and 6 antinodes",
      option_d: "5 nodes and 4 antinodes",
      correct_option: "A",
      explanation: "Step 1: For a string fixed at both ends, the n-th harmonic forms n vibrating loops (segments).\n\nStep 2: Each vibrating loop contains exactly one antinode at its center, so the number of antinodes equals the harmonic number:\nNumber of antinodes = n = 5.\n\nStep 3: Nodes occur at both fixed ends and between adjacent loops. The total number of nodes is:\nNumber of nodes = n + 1 = 5 + 1 = 6.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3302, // Q10
    similar_question: {
      question: "A pipe closed at one end has a fundamental resonance frequency of 60 Hz. Which of the following frequencies CANNOT possibly be emitted by this organ pipe?",
      option_a: "120 Hz",
      option_b: "180 Hz",
      option_c: "300 Hz",
      option_d: "420 Hz",
      correct_option: "A",
      explanation: "Step 1: An organ pipe closed at one end supports only odd harmonics of its fundamental frequency f₀:\nf_n = (2n − 1) f₀, where n = 1, 2, 3, ...\n\nStep 2: For f₀ = 60 Hz, the possible natural frequencies are:\n- 1st harmonic (fundamental): 60 Hz\n- 3rd harmonic (1st overtone): 3 × 60 = 180 Hz\n- 5th harmonic (2nd overtone): 5 × 60 = 300 Hz\n- 7th harmonic (3rd overtone): 7 × 60 = 420 Hz.\n\nStep 3: Even harmonics (such as 2 f₀ = 120 Hz) cannot exist because a closed pipe must have a node at the closed end and an antinode at the open end.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3303, // Q11
    similar_question: {
      question: "A standing wave is described by the wave equation y(x, t) = 0.20 sin(2.5 x) cos(400 t), where x and y are in meters and t in seconds. What is the wavelength of the component traveling waves that form this stationary wave?",
      option_a: "2.513 meters",
      option_b: "1.256 meters",
      option_c: "0.800 meters",
      option_d: "5.026 meters",
      correct_option: "A",
      explanation: "Step 1: Compare with the standard standing wave equation: y(x, t) = 2A sin(k x) cos(ω t).\nHere, propagation wave number k = 2.5 m⁻¹.\n\nStep 2: The wavelength λ is related to the wave number k by:\nλ = 2π / k.\n\nStep 3: Substitute k = 2.5:\nλ = (2 × 3.1416) / 2.5 = 6.2832 / 2.5 ≈ 2.513 meters.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3304, // Q12
    similar_question: {
      question: "Two tuning forks A and B sounded together produce 5 beats per second. The frequency of fork A is known to be 320 Hz. When the prongs of fork A are loaded with a small amount of wax, the beat frequency decreases to 2 beats per second. What is the frequency of fork B?",
      option_a: "315 Hz",
      option_b: "325 Hz",
      option_c: "320 Hz",
      option_d: "310 Hz",
      correct_option: "A",
      explanation: "Step 1: Initially, the beat frequency is 5 Hz, so the possible frequencies for fork B are:\nf_B = f_A ± 5 = 320 ± 5  →  f_B = 325 Hz or f_B = 315 Hz.\n\nStep 2: Loading fork A with wax increases its inertia and decreases its frequency: f_A' < 320 Hz.\n\nStep 3: The beat frequency decreases from 5 to 2 Hz. If f_B were 325 Hz, lowering f_A would widen the frequency gap (325 − f_A' > 5), increasing beats.\n\nStep 4: If f_B = 315 Hz, lowering f_A brings it closer to 315 Hz (f_A' − 315 < 5), decreasing the beat frequency as observed.\nThus, f_B = 315 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3305, // Q13
    similar_question: {
      question: "A tuning fork of frequency 300 Hz produces 4 beats/s with a vibrating piano string. When the tension in the piano string is slightly increased, the beat frequency decreases to 1 beat/s. What was the initial frequency of the piano string before the tension was increased?",
      option_a: "296 Hz",
      option_b: "304 Hz",
      option_c: "301 Hz",
      option_d: "299 Hz",
      correct_option: "A",
      explanation: "Step 1: Initially, the beat frequency is 4 Hz, so the string frequency is either:\nf_string = 300 + 4 = 304 Hz  or  f_string = 300 − 4 = 296 Hz.\n\nStep 2: When tension T is increased, the string frequency increases because f ∝ √T.\n\nStep 3: If the string was initially at 304 Hz, increasing tension would raise its frequency further above 300 Hz, increasing the beat frequency.\n\nStep 4: If the string was at 296 Hz, increasing tension raises its frequency toward 300 Hz, reducing the difference from 4 Hz to 1 Hz, which matches the observation.\nThus, initial frequency was 296 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3306, // Q14
    similar_question: {
      question: "An open organ pipe has a fundamental frequency of f₀. If one of its open ends is completely closed, the fundamental frequency of the resulting closed pipe is:",
      option_a: "f₀ / 2",
      option_b: "2 f₀",
      option_c: "f₀",
      option_d: "4 f₀",
      correct_option: "A",
      explanation: "Step 1: The fundamental frequency of an open organ pipe of length L is:\nf_open = v / (2L) = f₀.\n\nStep 2: When one end is closed, the pipe becomes a closed organ pipe of the same length L, whose fundamental frequency is:\nf_closed = v / (4L).\n\nStep 3: Comparing the two expressions:\nf_closed = (1/2) [ v / (2L) ] = f₀ / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3307, // Q15
    similar_question: {
      question: "What is the physical nature of mechanical waves propagating across the free surface of deep liquid water?",
      option_a: "Both longitudinal and transverse simultaneously (water particles execute circular or elliptical orbital trajectories)",
      option_b: "Purely transverse only",
      option_c: "Purely longitudinal only",
      option_d: "Electromagnetic in nature",
      correct_option: "A",
      explanation: "Step 1: On the surface of water, waves are created by a combination of gravity and surface tension restoring forces.\n\nStep 2: Individual water molecules move both up and down (transverse component) and back and forth in the direction of propagation (longitudinal component).\n\nStep 3: The superposition of these two perpendicular motions causes water particles to execute closed circular (in deep water) or elliptical (in shallow water) orbital paths.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3308, // Q16
    similar_question: {
      question: "At the same temperature and pressure, two ideal diatomic gases have densities ρ₁ and ρ₂ respectively. What is the ratio of the speeds of sound in these two gases (v₁ / v₂)?",
      option_a: "√(ρ₂ / ρ₁)",
      option_b: "√(ρ₁ / ρ₂)",
      option_c: "ρ₁ / ρ₂",
      option_d: "ρ₂ / ρ₁",
      correct_option: "A",
      explanation: "Step 1: The speed of sound in a gas is given by Laplace's formula:\nv = √(γ P / ρ).\n\nStep 2: Since both gases are diatomic, their adiabatic index γ = 7/5 is identical.\n\nStep 3: At the same pressure P and temperature, the speed of sound is inversely proportional to the square root of density:\nv ∝ 1 / √ρ.\n\nStep 4: Therefore, the ratio of speeds is:\nv₁ / v₂ = √(ρ₂ / ρ₁).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3309, // Q17
    similar_question: {
      question: "If the fundamental frequency of an organ pipe closed at one end is 80 Hz, what is the frequency of its third overtone?",
      option_a: "560 Hz (the 7th harmonic)",
      option_b: "240 Hz",
      option_c: "400 Hz",
      option_d: "320 Hz",
      correct_option: "A",
      explanation: "Step 1: A pipe closed at one end produces only odd harmonics: f_n = (2n + 1) f₀, where n is the overtone number.\n\nStep 2: For overtones:\n- Fundamental (n = 0): f₀ = 80 Hz (1st harmonic)\n- 1st overtone (n = 1): 3 f₀ = 240 Hz (3rd harmonic)\n- 2nd overtone (n = 2): 5 f₀ = 400 Hz (5th harmonic)\n- 3rd overtone (n = 3): 7 f₀ = 7 × 80 = 560 Hz (7th harmonic).\n\nStep 3: Therefore, the frequency of the 3rd overtone is 560 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3310, // Q18
    similar_question: {
      question: "When a transverse mechanical wave traveling on a light string is reflected from a fixed, rigid boundary, what is the phase shift introduced upon reflection?",
      option_a: "π radians (180° phase reversal)",
      option_b: "Zero radians (in-phase reflection)",
      option_c: "π / 2 radians (90° shift)",
      option_d: "π / 4 radians",
      correct_option: "A",
      explanation: "Step 1: At a fixed rigid support, the boundary condition requires the displacement to be strictly zero at all times (y_total = y_incident + y_reflected = 0).\n\nStep 2: By Newton's third law, the rigid support exerts an equal and opposite reaction force on the string, inverting the reflected pulse.\n\nStep 3: This inversion corresponds mathematically to an abrupt phase change of π radians (180°).\n(Note: Reflection from a free or open end produces zero phase change).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3311, // Q19
    similar_question: {
      question: "A progressive wave traveling along the positive x-axis is given in SI units by y(x, t) = 0.02 sin(800 t − 4 x + π/3). What is the propagation speed of the wave?",
      option_a: "200 m/s",
      option_b: "400 m/s",
      option_c: "800 m/s",
      option_d: "3200 m/s",
      correct_option: "A",
      explanation: "Step 1: Compare with standard wave form y = A sin(ω t − k x + φ):\nAngular frequency ω = 800 rad/s\nWave number k = 4 m⁻¹.\n\nStep 2: The wave propagation speed is given by:\nv = ω / k.\n\nStep 3: Substitute ω and k:\nv = 800 / 4 = 200 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3312, // Q20
    similar_question: {
      question: "A violin string sounded with a 512 Hz tuning fork produces 6 beats per second. When sounded with a 515 Hz tuning fork, it produces 3 beats per second. What is the fundamental frequency of the violin string?",
      option_a: "518 Hz",
      option_b: "506 Hz",
      option_c: "512 Hz",
      option_d: "509 Hz",
      correct_option: "A",
      explanation: "Step 1: With the 512 Hz tuning fork, beat frequency is 6 Hz:\nf_string = 512 + 6 = 518 Hz  or  f_string = 512 − 6 = 506 Hz.\n\nStep 2: With the 515 Hz tuning fork, beat frequency is 3 Hz:\nIf f_string = 518 Hz: |518 − 515| = 3 Hz (matches observation!).\nIf f_string = 506 Hz: |506 − 515| = 9 Hz (contradicts observation!).\n\nStep 3: Therefore, the string frequency is uniquely 518 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3313, // Q21
    similar_question: {
      question: "A sinusoidal wave of frequency f = 250 Hz propagates with a speed of v = 50 m/s. What is the phase difference between two points along the wave separated by a path difference of Δx = 5.0 cm (0.05 m)?",
      option_a: "π / 2 radians",
      option_b: "π radians",
      option_c: "π / 4 radians",
      option_d: "2π radians",
      correct_option: "A",
      explanation: "Step 1: Calculate the wavelength λ from wave speed and frequency:\nλ = v / f = 50 m/s / 250 Hz = 0.20 m.\n\nStep 2: The phase difference Δφ corresponding to a spatial separation Δx is given by:\nΔφ = (2π / λ) × Δx.\n\nStep 3: Substitute λ = 0.20 m and Δx = 0.05 m:\nΔφ = (2π / 0.20) × 0.05 = 2π × (1/4) = π / 2 radians.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3314, // Q22
    similar_question: {
      question: "A progressive transverse wave is represented by y = 0.05 sin[ π (100 t − 2 x) ], where x and y are in meters and t in seconds. What is the velocity of the wave?",
      option_a: "50 m/s in the positive x-direction",
      option_b: "100 m/s in the positive x-direction",
      option_c: "200 m/s in the positive x-direction",
      option_d: "25 m/s in the negative x-direction",
      correct_option: "A",
      explanation: "Step 1: Expand the argument of the sine function:\ny = 0.05 sin(100π t − 2π x).\n\nStep 2: Identify the angular parameters:\nω = 100π rad/s\nk = 2π m⁻¹.\n\nStep 3: The wave velocity is:\nv = ω / k = (100π) / (2π) = 50 m/s.\nSince the form is (ω t − k x), the wave propagates in the positive x-direction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3315, // Q23
    similar_question: {
      question: "A standing wave is formed on a string by the reflection of an incident wave of frequency 200 Hz from a fixed end. If the distance between two consecutive nodes in the standing wave pattern is measured to be 15 cm (0.15 m), what is the speed of the wave on the string?",
      option_a: "60 m/s",
      option_b: "30 m/s",
      option_c: "120 m/s",
      option_d: "15 m/s",
      correct_option: "A",
      explanation: "Step 1: In any standing wave, the spatial separation between two consecutive nodes is equal to half the wavelength:\nDistance between nodes = λ / 2 = 0.15 m  →  λ = 2 × 0.15 = 0.30 m.\n\nStep 2: The speed of the wave is given by:\nv = f × λ.\n\nStep 3: Substitute frequency f = 200 Hz and wavelength λ = 0.30 m:\nv = 200 Hz × 0.30 m = 60 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3316, // Q24
    similar_question: {
      question: "Beats are produced by the superposition of two sound waves given by y₁ = A sin(1200π t) and y₂ = A sin(1212π t). How many beats are heard per second?",
      option_a: "6 beats per second",
      option_b: "12 beats per second",
      option_c: "3 beats per second",
      option_d: "24 beats per second",
      correct_option: "A",
      explanation: "Step 1: Find the linear frequency of each wave:\nω₁ = 2π f₁ = 1200π  →  f₁ = 1200 / 2 = 600 Hz\nω₂ = 2π f₂ = 1212π  →  f₂ = 1212 / 2 = 606 Hz.\n\nStep 2: The number of beats heard per second (beat frequency) is the absolute difference between the two frequencies:\nf_beat = |f₂ − f₁| = |606 − 600| = 6 beats/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3317, // Q25
    similar_question: {
      question: "Why are standing (stationary) waves termed 'stationary' in physics?",
      option_a: "There is no net propagation of energy through the medium across any nodal plane, and the waveform remains spatially fixed",
      option_b: "The particles of the medium remain permanently at rest without moving",
      option_c: "The speed of the constituent waves is zero",
      option_d: "They can only be produced in solid media",
      correct_option: "A",
      explanation: "Step 1: In a progressive (traveling) wave, energy and momentum are continuously transmitted forward through the medium.\n\nStep 2: In a stationary wave, two identical waves of equal amplitude and frequency travel in opposite directions, trapping energy within localized regions between adjacent nodes.\n\nStep 3: Because the nodes remain permanently at rest with zero velocity at all times, energy cannot cross through any nodal plane.\n\nStep 4: Consequently, the wave pattern does not advance through space, which is why it is called a stationary (standing) wave.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updateSet16() {
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

    console.log(`Starting update of Set 16 (${set16Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set16Updates) {
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
        console.log(`[${successCount}/${set16Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 16 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updateSet16();
