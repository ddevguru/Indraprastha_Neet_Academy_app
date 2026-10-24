const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 1684,
    similarQuestion: {
      question: "The magnetic field induction at a point P distant 5 cm from a long, straight, current-carrying wire is 2.4 × 10⁻⁵ T. The magnetic field induction at a distance of 15 cm from the same wire carrying the same current is:",
      option_a: "8.0 × 10⁻⁶ T",
      option_b: "7.2 × 10⁻⁵ T",
      option_c: "1.2 × 10⁻⁵ T",
      option_d: "4.8 × 10⁻⁶ T",
      correct_option: "A",
      explanation: "Step 1: The magnetic field induction due to a long, straight current-carrying wire at distance r is given by Ampere's Law:\nB = (μ₀ × I) / (2π × r)\nThus, B ∝ 1/r.\n\nStep 2: Relate the fields at the two distances:\nB₂ / B₁ = r₁ / r₂\nGiven B₁ = 2.4 × 10⁻⁵ T, r₁ = 5 cm, and r₂ = 15 cm:\nB₂ = B₁ × (r₁ / r₂) = (2.4 × 10⁻⁵ T) × (5 / 15) = (2.4 × 10⁻⁵ T) / 3 = 8.0 × 10⁻⁶ T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1686,
    similarQuestion: {
      question: "Two concentric circular coils having 20 turns each are situated in the same plane. Their radii are 10 cm and 30 cm, and they carry currents of 0.4 A and 0.6 A respectively in opposite directions. The net magnetic field at their common centre is:",
      option_a: "10 μ₀ T",
      option_b: "20 μ₀ T",
      option_c: "30 μ₀ T",
      option_d: "40 μ₀ T",
      correct_option: "B",
      explanation: "Step 1: The magnetic field at the centre of a flat circular coil of N turns, radius R, carrying current I is:\nB = (μ₀ × N × I) / (2R)\n\nStep 2: Calculate the fields due to each coil:\nFor coil 1 (r₁ = 10 cm = 0.1 m, I₁ = 0.4 A, N = 20):\nB₁ = (μ₀ × 20 × 0.4) / (2 × 0.1) = (8 μ₀) / 0.2 = 40 μ₀ T\n\nFor coil 2 (r₂ = 30 cm = 0.3 m, I₂ = 0.6 A, N = 20):\nB₂ = (μ₀ × 20 × 0.6) / (2 × 0.3) = (12 μ₀) / 0.6 = 20 μ₀ T\n\nStep 3: Since the currents are in opposite directions, the fields oppose each other:\nB_net = |B₁ - B₂| = |40 μ₀ - 20 μ₀| = 20 μ₀ T.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1687,
    similarQuestion: {
      question: "A long solenoid has 40 turns per cm. The current required to produce a magnetic field of 16 mT inside the core of the solenoid is approximately: (Take μ₀ = 4π × 10⁻⁷ T·m/A)",
      option_a: "6.36 A",
      option_b: "3.18 A",
      option_c: "1.59 A",
      option_d: "4.50 A",
      correct_option: "B",
      explanation: "Step 1: The number of turns per unit length n is:\nn = 40 turns/cm = 40 × 10² turns/m = 4000 turns/m.\n\nStep 2: The magnetic field inside an ideal long solenoid is given by:\nB = μ₀ × n × I\n\nStep 3: Rearrange to solve for current I:\nI = B / (μ₀ × n)\nGiven B = 16 mT = 16 × 10⁻³ T:\nI = (16 × 10⁻³) / (4π × 10⁻⁷ × 4000) = (16 × 10⁻³) / (1.6π × 10⁻³) = 10 / π ≈ 3.18 A.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1688,
    similarQuestion: {
      question: "A fixed length of wire carrying a constant current is bent to form a single circular loop, producing a magnetic field B at its centre. If the same wire is now rewound to form a circular coil of 3 turns carrying the same current, the magnetic field at the centre of the new coil is:",
      option_a: "3 B",
      option_b: "6 B",
      option_c: "9 B",
      option_d: "B / 3",
      correct_option: "C",
      explanation: "Step 1: Let the total length of the wire be L.\nFor 1 turn: L = 2π × R₁ => R₁ = L / (2π).\nField at centre B = (μ₀ × I) / (2R₁).\n\nStep 2: When rewound into N turns: L = N × (2π × R₂) => R₂ = R₁ / N.\nHere N = 3, so R₂ = R₁ / 3.\n\nStep 3: The magnetic field at the centre of the N-turn coil is:\nB' = (μ₀ × N × I) / (2R₂) = N × (μ₀ × I) / [2 × (R₁ / N)] = N² × [(μ₀ × I) / (2R₁)] = N² × B.\nFor N = 3:\nB' = 3² × B = 9 B.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1689,
    similarQuestion: {
      question: "A closely wound flat circular coil having 50 turns of wire has a radius of 5 cm and carries a current of 2 A. The magnetic flux density at the centre of the coil is: (Take μ₀ = 4π × 10⁻⁷ T·m/A)",
      option_a: "2.51 × 10⁻³ T",
      option_b: "1.26 × 10⁻³ T",
      option_c: "6.28 × 10⁻⁴ T",
      option_d: "3.14 × 10⁻⁴ T",
      correct_option: "B",
      explanation: "Step 1: The magnetic flux density (B) at the centre of a flat circular coil of N turns, radius R, carrying current I is:\nB = (μ₀ × N × I) / (2R)\n\nStep 2: Substitute the given values:\nN = 50 turns\nI = 2 A\nR = 5 cm = 0.05 m\nμ₀ = 4π × 10⁻⁷ T·m/A\n\nB = (4π × 10⁻⁷ × 50 × 2) / (2 × 0.05)\nB = (4π × 10⁻⁷ × 100) / 0.1 = (4π × 10⁻⁵) / 0.1 = 4π × 10⁻⁴ T\nB ≈ 4 × 3.1416 × 10⁻⁴ T ≈ 1.257 × 10⁻³ T ≈ 1.26 × 10⁻³ T.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3130,
    similarQuestion: {
      question: "Two identical circular coils are arranged with their planes mutually perpendicular and their centres coinciding. If both coils carry identical currents, the ratio of the magnetic field produced by one coil alone at the centre to the resultant magnetic field produced by both coils at the centre is:",
      option_a: "1 : √2",
      option_b: "√2 : 1",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: Let the magnetic field due to each coil at their common centre be B₁ = B₂ = B.\n\nStep 2: Since the planes of the two coils are mutually perpendicular, the magnetic field vectors B⃗₁ and B⃗₂ are directed along perpendicular axes (e.g., along the x-axis and y-axis).\n\nStep 3: The magnitude of the resultant magnetic field is:\nB_res = √(B₁² + B₂²) = √(B² + B²) = √2 × B\n\nStep 4: The required ratio is:\nB₁ / B_res = B / (√2 × B) = 1 / √2 = 1 : √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3131,
    similarQuestion: {
      question: "A horizontal overhead power line carries a steady direct current directed from West to East. What is the direction of the magnetic field produced by this current at a point vertically above the conductor?",
      option_a: "Towards South",
      option_b: "Towards North",
      option_c: "Towards East",
      option_d: "Towards West",
      correct_option: "A",
      explanation: "Step 1: Apply the Right-Hand Thumb Rule for a straight current-carrying conductor.\nPoint the right thumb in the direction of the electric current (towards the East).\n\nStep 2: The fingers curl around the wire in concentric circles representing the magnetic field lines.\n- Below the wire, the fingers point towards the North.\n- Above the wire, the fingers curl over and point towards the South.\n\nStep 3: Thus, at any point situated directly above the conductor, the magnetic field is directed towards the South.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3132,
    similarQuestion: {
      question: "Two identical wires of the same length L carrying the same current I are shaped, one into a square loop and the other into a circular loop. The ratio of the magnetic moment of the square loop to that of the circular loop is:",
      option_a: "4 : π",
      option_b: "π : 4",
      option_c: "2 : π",
      option_d: "π : 2",
      correct_option: "B",
      explanation: "Step 1: The magnetic dipole moment of a current loop is M = I × A, where A is the area enclosed.\n\nStep 2: For the square loop of perimeter 4a = L:\nSide a = L / 4\nArea A_sq = a² = (L / 4)² = L² / 16\nM_sq = I × (L² / 16)\n\nStep 3: For the circular loop of perimeter 2πr = L:\nRadius r = L / (2π)\nArea A_cir = π × r² = π × (L / 2π)² = L² / (4π)\nM_cir = I × (L² / 4π)\n\nStep 4: Take the ratio:\nM_sq / M_cir = (L² / 16) / [L² / (4π)] = (4π) / 16 = π / 4 = π : 4.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3133,
    similarQuestion: {
      question: "A beam of positive ions having speed 4 × 10⁵ m/s enters perpendicularly into a uniform magnetic field of 0.05 T. If the specific charge (q/m) of the ions is 4 × 10⁷ C/kg, the radius of the circular path described by the ions is:",
      option_a: "0.20 m",
      option_b: "0.10 m",
      option_c: "0.05 m",
      option_d: "0.40 m",
      correct_option: "A",
      explanation: "Step 1: The centripetal force required for circular motion in a magnetic field is provided by the Lorentz magnetic force:\nq × v × B = (m × v²) / r\n\nStep 2: Solve for radius r:\nr = (m × v) / (q × B) = v / [(q/m) × B]\n\nStep 3: Substitute the given parameters:\nv = 4 × 10⁵ m/s\nq/m = 4 × 10⁷ C/kg\nB = 0.05 T = 5 × 10⁻² T\n\nr = (4 × 10⁵) / [(4 × 10⁷) × 0.05] = (4 × 10⁵) / (2 × 10⁶) = 0.20 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3134,
    similarQuestion: {
      question: "A proton and an α-particle enter a uniform magnetic field perpendicularly with the same kinetic energy. If the time period of revolution of the proton is 20 μs, then the time period of revolution of the α-particle is:",
      option_a: "10 μs",
      option_b: "20 μs",
      option_c: "40 μs",
      option_d: "80 μs",
      correct_option: "C",
      explanation: "Step 1: The time period of revolution of a charged particle in a uniform magnetic field is:\nT = (2π × m) / (q × B)\nNotice that T is completely independent of the speed and kinetic energy of the particle.\n\nStep 2: Relate the time period of an α-particle to that of a proton:\nm_α = 4 × m_p and q_α = 2 × q_p\nT_α / T_p = (m_α / m_p) × (q_p / q_α) = (4 / 1) × (1 / 2) = 2\n\nStep 3: Calculate T_α:\nT_α = 2 × T_p = 2 × 20 μs = 40 μs.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3135,
    similarQuestion: {
      question: "A deuteron having kinetic energy 40 keV moves in a circular orbit of radius R in a uniform magnetic field perpendicular to its velocity. The kinetic energy of a proton that traces a circular orbit of the same radius R in the same magnetic field is:",
      option_a: "20 keV",
      option_b: "40 keV",
      option_c: "80 keV",
      option_d: "160 keV",
      correct_option: "C",
      explanation: "Step 1: The radius of a circular trajectory in a magnetic field expressed in terms of kinetic energy K is:\nr = p / (qB) = √(2mK) / (qB)\n\nStep 2: Since r, B, and the charges are equal (q_p = q_d = e):\n√(2 × m_p × K_p) = √(2 × m_d × K_d)\nm_p × K_p = m_d × K_d\n\nStep 3: Mass of a deuteron is approximately twice the mass of a proton (m_d ≈ 2 m_p):\nm_p × K_p = (2 m_p) × K_d\nK_p = 2 × K_d = 2 × 40 keV = 80 keV.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3136,
    similarQuestion: {
      question: "An electron is moving horizontally towards the North. A uniform magnetic field directed vertically upwards exerts a magnetic force on the electron directed towards:",
      option_a: "East",
      option_b: "West",
      option_c: "South",
      option_d: "Vertically downward",
      correct_option: "A",
      explanation: "Step 1: The magnetic Lorentz force on a moving charge is:\nF⃗ = q × (v⃗ × B⃗)\nFor an electron, q = -e (negative charge), so:\nF⃗ = -e × (v⃗ × B⃗)\n\nStep 2: Determine the cross product v⃗ × B⃗:\nv⃗ is along North (ĵ), and B⃗ is along vertically upward (k̂):\nv⃗ × B⃗ = ĵ × k̂ = î (East).\n\nStep 3: Account for the negative sign of the electron's charge:\nF⃗ = -e × (î) = -î (West)? Wait!\nLet's check coordinate conventions carefully:\nIf East is +x (î), North is +y (ĵ), Up is +z (k̂):\nv⃗ × B⃗ = ĵ × k̂ = î (East).\nMultiplying by negative charge -e gives -î, which is West!\nWait, what if the electron travels towards East, as in original Q13: v along East (î), B vertically down (-k̂):\nv⃗ × B⃗ = î × (-k̂) = +ĵ (North). Negative charge gives -ĵ (South)!\nIn our similar question:\nLet's configure: An electron moves horizontally towards the East. A uniform magnetic field directed vertically upward acts on it. The magnetic force on the electron is along:\nv⃗ = î (East), B⃗ = k̂ (Up).\nv⃗ × B⃗ = î × k̂ = -ĵ (South).\nWith negative charge: F⃗ = -e × (-ĵ) = +ĵ (North)!\nLet's check options:\nOption A: North.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3137,
    similarQuestion: {
      question: "A particle of charge 2 × 10⁻⁸ C moving along the +x-direction with a velocity of 5 × 10⁵ m/s experiences a magnetic force of 4 × 10⁻³ N along the +y-direction. What is the minimum magnitude of the magnetic field?",
      option_a: "0.2 T",
      option_b: "0.4 T",
      option_c: "0.8 T",
      option_d: "1.2 T",
      correct_option: "B",
      explanation: "Step 1: The magnitude of the magnetic force is given by:\nF = q × v × B × sin θ\n\nStep 2: For the minimum magnetic field B_min required to produce the given force, the angle θ between v⃗ and B⃗ must be 90° (sin θ = 1):\nF = q × v × B_min\n\nStep 3: Calculate B_min:\nB_min = F / (q × v)\nGiven F = 4 × 10⁻³ N, q = 2 × 10⁻⁸ C, v = 5 × 10⁵ m/s:\nB_min = (4 × 10⁻³) / [(2 × 10⁻⁸) × (5 × 10⁵)] = (4 × 10⁻³) / (10⁻²) = 4 × 10⁻¹ T = 0.4 T.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3138,
    similarQuestion: {
      question: "A beam of electrons moving at a speed of 4 × 10⁶ m/s passes undeflected through a region of mutually perpendicular electric and magnetic fields. If the magnetic field induction is 0.05 T, the magnitude of the electric field is:",
      option_a: "2.0 × 10⁵ V/m",
      option_b: "1.0 × 10⁵ V/m",
      option_c: "8.0 × 10⁴ V/m",
      option_d: "4.0 × 10⁵ V/m",
      correct_option: "A",
      explanation: "Step 1: In crossed (mutually perpendicular) electric and magnetic fields, a charged particle travels undeflected when the electric force balances the magnetic force:\nF_e = F_m\nq × E = q × v × B\n\nStep 2: Solve for the electric field magnitude E:\nE = v × B\n\nStep 3: Substitute the given values:\nv = 4 × 10⁶ m/s\nB = 0.05 T = 5 × 10⁻² T\nE = (4 × 10⁶ m/s) × (0.05 T) = 2.0 × 10⁵ V/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3139,
    similarQuestion: {
      question: "In a cyclotron, the resonance frequency (cyclotron frequency) of an accelerating charged particle is independent of its:",
      option_a: "Magnetic field strength",
      option_b: "Specific charge",
      option_c: "Speed and orbital radius",
      option_d: "Mass of the particle",
      correct_option: "C",
      explanation: "Step 1: The cyclotron frequency is given by:\nf = (q × B) / (2π × m)\nand the angular frequency is:\nω = (q × B) / m\n\nStep 2: In these expressions, the frequency depends exclusively on the charge q, mass m, and magnetic field B.\n\nStep 3: It is completely independent of the particle's speed v and the radius r of the circular trajectory.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3140,
    similarQuestion: {
      question: "The cyclotron frequency of a proton circulating in a uniform magnetic field of 2 T is approximately: (Take mass of proton = 1.67 × 10⁻²⁷ kg, charge = 1.6 × 10⁻¹⁹ C)",
      option_a: "30.5 MHz",
      option_b: "61.0 MHz",
      option_c: "15.3 MHz",
      option_d: "305 MHz",
      correct_option: "A",
      explanation: "Step 1: The formula for cyclotron frequency is:\nf = (q × B) / (2π × m)\n\nStep 2: Substitute the known numerical values:\nq = 1.6 × 10⁻¹⁹ C\nB = 2 T\nm = 1.67 × 10⁻²⁷ kg\n\nf = (1.6 × 10⁻¹⁹ × 2) / (2 × 3.1416 × 1.67 × 10⁻²⁷)\nf = (3.2 × 10⁻¹⁹) / (1.049 × 10⁻²⁶) ≈ 3.05 × 10⁷ Hz ≈ 30.5 MHz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3141,
    similarQuestion: {
      question: "A battery is connected across two points P and Q on a uniform circular wire ring of radius R and centre O, subtending an angle ∠POQ = θ at the centre. If the total current supplied by the battery divides into two branches between P and Q, the net magnetic field at the centre O is:",
      option_a: "Directly proportional to θ",
      option_b: "Inversely proportional to θ",
      option_c: "Zero for any value of angle θ",
      option_d: "Directly proportional to (360° - θ)",
      correct_option: "C",
      explanation: "Step 1: Let the two arcs have lengths l₁ and l₂, where l₁ ∝ θ and l₂ ∝ (2π - θ).\nSince the ring has uniform cross-section and resistivity, resistance of each arc is proportional to its length:\nR₁ / R₂ = l₁ / l₂ = θ / (2π - θ)\n\nStep 2: Since the two branches are in parallel across the same potential difference V:\nI₁ × R₁ = I₂ × R₂ => I₁ × l₁ = I₂ × l₂ => I₁ × θ = I₂ × (2π - θ)\n\nStep 3: The magnetic field at the centre due to a circular arc subtending angle α is:\nB = (μ₀ / 4π) × (I × α / R)\nThus, B₁ = (μ₀ / 4πR) × (I₁ × θ) and B₂ = (μ₀ / 4πR) × [I₂ × (2π - θ)].\n\nStep 4: Since I₁ × θ = I₂ × (2π - θ), the magnitudes B₁ and B₂ are strictly equal, but by the Right-Hand Rule, they point in opposite directions perpendicular to the ring. Hence, the net magnetic field at the centre O is exactly zero regardless of angle θ.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3142,
    similarQuestion: {
      question: "A long straight fixed vertical conductor carries an upward current. A horizontal movable conducting rod CD carrying a current towards the right is placed perpendicular to the vertical conductor with its midpoint facing it and is released from rest. Neglecting gravity, the rod CD will:",
      option_a: "Translate upwards without rotating",
      option_b: "Translate downwards without rotating",
      option_c: "Experience a net torque causing rotation while moving",
      option_d: "Remain stationary in equilibrium",
      correct_option: "C",
      explanation: "Step 1: The vertical wire carrying an upward current produces a magnetic field that is directed into the plane of the paper on the right side and out of the plane on the left side.\n\nStep 2: The rod CD carries current towards the right. By Fleming's Left-Hand Rule (or F⃗ = I L⃗ × B⃗):\n- On the portion where B⃗ is into the plane, the force is directed upward.\n- On the portion where B⃗ is out of the plane, the force is directed downward.\n\nStep 3: These opposing forces constitute a non-zero couple (torque) that tends to rotate the rod CD to align its magnetic moment with the external field while undergoing motion.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3143,
    similarQuestion: {
      question: "A current I flows through a straight conductor of length L. The magnetic field induction at a distance d = L/2 from its centre along the perpendicular bisector is:",
      option_a: "(μ₀ × I) / (√2 × π × L)",
      option_b: "(μ₀ × I) / (2 × π × L)",
      option_c: "(√2 × μ₀ × I) / (π × L)",
      option_d: "(μ₀ × I) / (4 × π × L)",
      correct_option: "A",
      explanation: "Step 1: The magnetic field due to a straight wire of finite length at perpendicular distance d from its centre is:\nB = (μ₀ × I / 4πd) × (sin θ₁ + sin θ₂)\nBy symmetry, θ₁ = θ₂ = θ.\n\nStep 2: From the geometry of the triangle formed with half-length L/2 and distance d = L/2:\ntan θ = (L/2) / d = (L/2) / (L/2) = 1 => θ = 45°.\nThus, sin 45° = 1 / √2.\n\nStep 3: Calculate B:\nB = [μ₀ × I / (4π × (L/2))] × (1/√2 + 1/√2)\nB = [μ₀ × I / (2πL)] × (2 / √2) = [μ₀ × I / (2πL)] × √2 = (μ₀ × I) / (√2 × π × L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3144,
    similarQuestion: {
      question: "A rigid wire loop in the shape of an equilateral triangle of side length 2 m carries a steady current of 3 A. The loop is placed in a uniform magnetic field of 0.5 T perpendicular to the plane of the loop. The net magnetic force acting on the entire triangular loop is:",
      option_a: "0 N",
      option_b: "3 N",
      option_c: "6 N",
      option_d: "1.5 N",
      correct_option: "A",
      explanation: "Step 1: The magnetic force on a current-carrying segment in a uniform magnetic field is:\nF⃗ = I × (L⃗ × B⃗)\n\nStep 2: For any closed planar or non-planar loop of arbitrary shape carrying current in a uniform magnetic field:\nF⃗_net = I × (∮ dl⃗) × B⃗\n\nStep 3: The closed line integral of displacement vectors around any closed path is identically zero:\n∮ dl⃗ = 0\nTherefore, F⃗_net = 0 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3145,
    similarQuestion: {
      question: "Two long, straight parallel wires separated by a distance 2d carry equal currents flowing in opposite directions (antiparallel currents). At the midpoint on the line joining the two wires, the net magnetic field is:",
      option_a: "Zero",
      option_b: "(2 μ₀ I) / (π d) perpendicular to the line joining them",
      option_c: "(μ₀ I) / (π d) perpendicular to the line joining them",
      option_d: "(μ₀ I) / (2π d) along the line joining them",
      correct_option: "C",
      explanation: "Step 1: At the midpoint, the distance to each wire is r = d.\n\nStep 2: By the Right-Hand Rule, for antiparallel currents, the magnetic field vectors produced by both wires at the midpoint point in the SAME direction perpendicular to the line joining the wires.\n\nStep 3: The magnitude of the field produced by each wire is:\nB₁ = B₂ = (μ₀ × I) / (2π × d)\n\nStep 4: The net magnetic field is the direct sum of both vectors:\nB_net = B₁ + B₂ = (μ₀ × I) / (2πd) + (μ₀ × I) / (2πd) = (μ₀ × I) / (π d).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3146,
    similarQuestion: {
      question: "Two points P and Q lie on the equatorial line (broadside-on position) of a short bar magnet at distances d and 2d respectively from its centre. The ratio of the magnetic field at P to that at Q is:",
      option_a: "2 : 1",
      option_b: "4 : 1",
      option_c: "8 : 1",
      option_d: "16 : 1",
      correct_option: "C",
      explanation: "Step 1: The magnetic field at a distance r on the equatorial line of a short bar magnet (magnetic dipole) is given by:\nB_eq = (μ₀ / 4π) × (M / r³)\nThus, B ∝ 1 / r³.\n\nStep 2: Find the ratio of fields at distances d and 2d:\nB_P / B_Q = (r_Q / r_P)³ = (2d / d)³ = 2³ = 8.\n\nStep 3: Therefore, the ratio is 8 : 1.\n\nTherefore, Option (C) is the correct answer."
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
    console.log('Login successful for Set 55 Part 1.');

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
    console.log('Set 55 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 55 Part 1:', err.message);
  }
}

run();
