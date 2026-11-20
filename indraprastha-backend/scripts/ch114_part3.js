module.exports = [
  {
    id: 993,
    originalQuestion: {
      question: "An arrangement of three parallel straight wires placed perpendicular to the plane of paper carrying the same current I along the same direction as shown in the figure. Magnitude of force per unit length on the middle wire B is given by: [NEET 2017]",
      option_a: "2μ₀I²/(πd)",
      option_b: "√2 μ₀I²/(πd)",
      option_c: "μ₀I²/(√2 πd)",
      option_d: "μ₀I²/(2πd)",
      correct_option: "C",
      explanation: "In the right-angled isosceles triangle arrangement of the three parallel wires A, B, and C with equal separation d from the middle wire B:\nWire B is subjected to forces per unit length from wire A and wire C.\n1) Since all wires carry equal currents I in the same direction, the forces are attractive.\n2) The force per unit length exerted by wire A on wire B at distance d is:\nF₁ = μ₀ I² / (2π d)\n3) The force per unit length exerted by wire C on wire B at distance d is:\nF₂ = μ₀ I² / (2π d)\nBecause the lines AB and CB are perpendicular (at 90° to each other), the two attractive forces F⃗₁ and F⃗₂ act at right angles to each other.\nThe magnitude of the resultant net force per unit length on wire B is:\nF_net = √(F₁² + F₂²) = √[(μ₀ I² / 2π d)² + (μ₀ I² / 2π d)²] = √2 · [μ₀ I² / (2π d)] = μ₀ I² / (√2 π d)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Three infinitely long parallel wires carrying equal current I in the same direction are placed at the vertices of an equilateral triangle of side a. What is the magnitude of the net magnetic force per unit length on any one wire?",
      option_a: "√3 μ₀I² / (2πa)",
      option_b: "μ₀I² / (2πa)",
      option_c: "2μ₀I² / (πa)",
      option_d: "√3 μ₀I² / (πa)",
      correct_option: "A",
      explanation: "Each of the two other wires exerts an attractive force per unit length F = μ₀I² / (2πa) at an angle of 60° between them.\nThe resultant force is:\nF_net = √(F² + F² + 2F² cos 60°) = √(3F²) = √3 F = √3 · [μ₀I² / (2πa)]\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 992,
    originalQuestion: {
      question: "Current sensitivity of a moving coil galvanometer is 5 div/mA and its voltage sensitivity (angular deflection per unit voltage applied) is 20 div/V. The resistance of the galvanometer is: [NEET 2018]",
      option_a: "40 Ω",
      option_b: "25 Ω",
      option_c: "250 Ω",
      option_d: "500 Ω",
      correct_option: "C",
      explanation: "Current sensitivity of the galvanometer is defined as:\nI_s = θ / I = 5 div/mA = 5 div / (10⁻³ A) = 5000 div/A\nVoltage sensitivity is defined as:\nV_s = θ / V = 20 div/V\nSince V = I · G (where G is the resistance of the galvanometer coil):\nV_s = θ / (I · G) = (1 / G) · (θ / I) = I_s / G\nRearranging to find the coil resistance G:\nG = I_s / V_s = (5000 div/A) / (20 div/V) = 250 Ω\nAlternatively, G = (5 div / 10⁻³ A) / (20 div/V) = 5 / (20 × 10⁻³) = 5000 / 20 = 250 Ω\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The current sensitivity of a galvanometer is 10 divisions/mA and its voltage sensitivity is 2 divisions/V. What is the resistance of the galvanometer?",
      option_a: "5000 Ω",
      option_b: "500 Ω",
      option_c: "200 Ω",
      option_d: "20 Ω",
      correct_option: "A",
      explanation: "I_s = 10 div / 10⁻³ A = 10000 div/A.\nV_s = 2 div/V.\nG = I_s / V_s = 10000 / 2 = 5000 Ω.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 991,
    originalQuestion: {
      question: "A metallic rod of mass per unit length 0.5 kg m⁻¹ is lying horizontally on a smooth inclined plane which makes an angle of 30° with the horizontal. The rod is not allowed to slide down by flowing a current through it when a magnetic field of induction 0.25 T is acting in the vertical direction. The current flowing in the rod to keep it stationary is: [NEET 2018]",
      option_a: "7.14 A",
      option_b: "5.98 A",
      option_c: "14.76 A",
      option_d: "11.32 A",
      correct_option: "D",
      explanation: "Let the rod have length L and mass per unit length m' = m / L = 0.5 kg m⁻¹.\nAngle of inclination θ = 30°.\nMagnetic field B = 0.25 T, acting vertically upward.\n1) Downward gravitational force along the inclined plane is:\nF_g = m g sin θ\n2) When current I flows through the rod horizontally in the vertical field B:\nMagnetic force F_m = I L B acts horizontally.\nThe component of this horizontal magnetic force acting up the inclined plane is:\nF_m, parallel = F_m cos θ = I L B cos θ\n3) For the rod to remain stationary (in static equilibrium):\nI L B cos θ = m g sin θ\nI = (m / L) · [g sin θ / (B cos θ)] = m' · (g / B) · tan θ\nGiven m' = 0.5 kg m⁻¹, g = 9.8 m s⁻², B = 0.25 T, θ = 30° (tan 30° = 1 / √3 ≈ 0.5774):\nI = 0.5 × (9.8 / 0.25) × (1 / √3) = 0.5 × 39.2 × 0.57735 = 19.6 × 0.57735 ≈ 11.32 A\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A horizontal wire of mass per unit length 0.2 kg/m rests on a smooth incline of 45°. A vertical uniform magnetic field of 0.5 T keeps the wire in equilibrium. What current must pass through the wire? (Take g = 9.8 m/s²)",
      option_a: "3.92 A",
      option_b: "7.84 A",
      option_c: "1.96 A",
      option_d: "4.50 A",
      correct_option: "A",
      explanation: "Equilibrium condition: I L B cos θ = m g sin θ ⇒ I = (m/L) · (g/B) · tan θ.\nWith θ = 45° (tan 45° = 1), m/L = 0.2 kg/m, B = 0.5 T, g = 9.8 m/s²:\nI = 0.2 × (9.8 / 0.5) × 1 = 0.2 × 19.6 = 3.92 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 990,
    originalQuestion: {
      question: "Ionized hydrogen atoms and alpha-particles with the same momenta enter perpendicular to a constant magnetic field B. The ratio of their radii of their paths rH : rα will be: [NEET 2019]",
      option_a: "1 : 2",
      option_b: "4 : 1",
      option_c: "1 : 4",
      option_d: "2 : 1",
      correct_option: "D",
      explanation: "The radius r of the circular path traced by a charged particle of momentum p and charge q in a perpendicular magnetic field B is:\nr = p / (q B)\nGiven that both the ionized hydrogen atom (proton) and the alpha-particle have the same momentum (p_H = p_α = p) and enter the same magnetic field B:\nr ∝ 1 / q\nThe ratio of their radii is:\nr_H / r_α = q_α / q_H\nFor an ionized hydrogen atom (proton): q_H = +e\nFor an alpha-particle: q_α = +2e\nSubstituting these charges:\nr_H / r_α = 2e / e = 2 / 1 = 2 : 1\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A proton and a deuteron with equal linear momentum enter perpendicularly into a uniform magnetic field. What is the ratio of their orbital radii r_p : r_d?",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "2 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Radius in magnetic field is r = p / (q B).\nSince both have equal momentum p and equal charge q = e:\nr_p / r_d = q_d / q_p = e / e = 1 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 989,
    originalQuestion: {
      question: "A cylindrical conductor of radius R is carrying a constant current. The plot of the magnitude of the magnetic field B with distance d from the centre of the conductor is correctly represented by the figure: [NEET 2019]",
      option_a: "Constant field inside R, then decreasing",
      option_b: "Zero field inside R, then decreasing",
      option_c: "Linearly increasing inside R up to maximum at R, then decreasing as 1/d",
      option_d: "Linearly increasing inside R, then constant outside",
      correct_option: "C",
      explanation: "Applying Ampere's circuital law to a long solid cylindrical conductor of radius R carrying uniformly distributed total current I:\n1) Inside the conductor at distance d ≤ R:\nB_inside = (μ₀ I d) / (2π R²) ∝ d\nThe magnetic field increases linearly with distance d from zero at the axis (d = 0) to a maximum value B_max = μ₀ I / (2π R) at the surface (d = R).\n2) Outside the conductor at distance d ≥ R:\nB_outside = (μ₀ I) / (2π d) ∝ 1 / d\nThe magnetic field decreases inversely with distance d.\nTherefore, the correct plot is linearly increasing inside R up to a maximum at R, and then decreasing as 1/d outside.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Where is the magnetic field intensity maximum for a solid copper cylindrical wire carrying a uniform steady current?",
      option_a: "At the outer surface of the wire",
      option_b: "At the central axis of the wire",
      option_c: "At a distance of half the radius inside the wire",
      option_d: "At infinity",
      correct_option: "A",
      explanation: "Inside the wire B ∝ r and outside B ∝ 1/r.\nThe magnetic field reaches its global maximum precisely at the outer surface r = R, where B_max = μ₀ I / (2π R).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 988,
    originalQuestion: {
      question: "A long solenoid of 50 cm length having 100 turns carries a current of 2.5 A. The magnetic field at the centre of the solenoid is (μ₀ = 4π × 10⁻⁷ T m A⁻¹): [NEET 2020 Phase 1]",
      option_a: "3.14 × 10⁻⁴ T",
      option_b: "6.28 × 10⁻⁵ T",
      option_c: "3.14 × 10⁻⁵ T",
      option_d: "6.28 × 10⁻⁴ T",
      correct_option: "D",
      explanation: "Given parameters:\nTotal length of solenoid L = 50 cm = 0.5 m\nTotal number of turns N = 100\nNumber of turns per unit length n is:\nn = N / L = 100 / 0.5 m = 200 turns/m\nCurrent I = 2.5 A\nPermeability of free space μ₀ = 4π × 10⁻⁷ T m A⁻¹\nThe magnetic field at the centre of an ideal long solenoid is:\nB = μ₀ · n · I\nB = (4π × 10⁻⁷ T m A⁻¹) × (200 m⁻¹) × (2.5 A)\nB = 4π × 10⁻⁷ × 500 = 2000π × 10⁻⁷ = 2π × 10⁻⁴ T\nTaking π ≈ 3.1416:\nB = 2 × 3.1416 × 10⁻⁴ T = 6.2832 × 10⁻⁴ T ≈ 6.28 × 10⁻⁴ T\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A solenoid of length 1.0 m has 500 turns and carries a current of 4 A. What is the magnetic field near its centre? (Take μ₀ = 4π × 10⁻⁷ T m A⁻¹)",
      option_a: "2.51 × 10⁻³ T",
      option_b: "1.26 × 10⁻³ T",
      option_c: "5.02 × 10⁻³ T",
      option_d: "6.28 × 10⁻⁴ T",
      correct_option: "A",
      explanation: "n = N / L = 500 / 1.0 = 500 m⁻¹.\nB = μ₀ n I = (4π × 10⁻⁷) × 500 × 4 = 8000π × 10⁻⁷ = 8π × 10⁻⁴ T ≈ 25.13 × 10⁻⁴ T = 2.51 × 10⁻³ T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 987,
    originalQuestion: {
      question: "An infinitely long straight conductor carries a current of 5 A as shown. An electron is moving with a speed of 10⁵ m/s parallel to the conductor. The perpendicular distance between the electron and the conductor is 20 cm at an instant. Calculate the magnitude of the force experienced by the electron at that instant. [NEET 2021]",
      option_a: "8 × 10⁻²⁰ N",
      option_b: "4 × 10⁻²⁰ N",
      option_c: "8π × 10⁻²⁰ N",
      option_d: "4π × 10⁻²⁰ N",
      correct_option: "A",
      explanation: "Given parameters:\nCurrent in the straight conductor I = 5 A\nDistance from conductor r = 20 cm = 0.2 m\nSpeed of electron v = 10⁵ m/s\nCharge on electron e = 1.6 × 10⁻¹⁹ C\n1) The magnetic field B produced by the long straight current-carrying wire at distance r is:\nB = (μ₀ I) / (2π r) = (4π × 10⁻⁷ × 5) / (2π × 0.2) = (2 × 10⁻⁷ × 5) / 0.2 = 10⁻⁶ / 0.2 = 5 × 10⁻⁶ T\n2) By the right-hand thumb rule, the magnetic field lines form concentric circles around the wire, so at the position of the electron, B⃗ is perpendicular to the plane containing the wire and the electron.\nSince the electron moves parallel to the wire, its velocity vector v⃗ is strictly perpendicular to the magnetic field B⃗ (θ = 90°):\nF = e · v · B · sin 90°\nF = (1.6 × 10⁻¹⁹ C) × (10⁵ m/s) × (5 × 10⁻⁶ T)\nF = 8.0 × 10⁻²⁰ N\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A proton moves parallel to a long straight wire carrying a current of 10 A at a distance of 10 cm with a speed of 2 × 10⁵ m/s. What is the magnetic force experienced by the proton? (e = 1.6 × 10⁻¹⁹ C)",
      option_a: "6.4 × 10⁻¹⁹ N",
      option_b: "3.2 × 10⁻¹⁹ N",
      option_c: "1.6 × 10⁻¹⁹ N",
      option_d: "1.28 × 10⁻¹⁸ N",
      correct_option: "A",
      explanation: "B = μ₀ I / (2π r) = (2 × 10⁻⁷ × 10) / 0.1 = 2 × 10⁻⁵ T.\nF = q v B = (1.6 × 10⁻¹⁹ C) × (2 × 10⁵ m/s) × (2 × 10⁻⁵ T) = 6.4 × 10⁻¹⁹ N.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 986,
    originalQuestion: {
      question: "A thick current-carrying cable of radius R carries current I uniformly distributed across its cross-section. The variation of magnetic field B(r) due to the cable with distance r from the axis of the cable is represented by: [NEET 2021]",
      option_a: "B = 0 for r < R, and B ∝ 1/r for r ≥ R",
      option_b: "B is constant for r < R, and B ∝ 1/r for r ≥ R",
      option_c: "B ∝ 1/r for all r",
      option_d: "B ∝ r for r ≤ R (linearly increasing to maximum at r = R), and B ∝ 1/r for r ≥ R",
      correct_option: "D",
      explanation: "Using Ampere's circuital law:\n1) Inside the cylindrical cable (r ≤ R):\nThe current enclosed by a circular loop of radius r is:\nI_enc = I · (π r² / π R²) = I · (r² / R²)\n∮ B⃗ · dl⃗ = B · (2π r) = μ₀ I_enc = μ₀ I (r² / R²)\nB(r) = (μ₀ I / 2π R²) · r ∝ r\nThus, the magnetic field increases linearly with r from 0 at the central axis to a maximum value at r = R.\n2) Outside the cable (r ≥ R):\nThe entire current I is enclosed:\nB · (2π r) = μ₀ I\nB(r) = μ₀ I / (2π r) ∝ 1 / r\nThus, outside the cable, the field falls off inversely with distance r.\nTherefore, the correct variation has B ∝ r inside (r ≤ R) and B ∝ 1/r outside (r ≥ R).\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For a uniform current-carrying cylinder of radius R, at what radial distance inside the cylinder is the magnetic field equal to half of its value at the surface?",
      option_a: "R / 2",
      option_b: "R / 4",
      option_c: "R / √2",
      option_d: "3R / 4",
      correct_option: "A",
      explanation: "Inside the cylinder, B(r) = (r / R) B_surface.\nSetting B(r) = (1/2) B_surface gives:\nr / R = 1/2 ⇒ r = R / 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 985,
    originalQuestion: {
      question: "From Ampere's circuital law for a long straight wire of circular cross-section carrying a steady current, the variation of magnetic field in the inside and outside regions of the wire is: [NEET 2022 Phase 1]",
      option_a: "Uniform and remains constant for both the regions",
      option_b: "A linearly increasing function of distance up to the boundary of the wire and then linearly decreasing for the outside region",
      option_c: "A linearly increasing function of distance r up to the boundary of the wire and then decreasing with 1/r dependence for the outside region",
      option_d: "A linearly decreasing function of distance up to the boundary of the wire and then a linearly increasing one in the outside region",
      correct_option: "C",
      explanation: "Applying Ampere's circuital law to a solid circular wire of radius R carrying a uniformly distributed steady current I:\n1) Inside the wire (r ≤ R):\nB(r) = (μ₀ I / (2π R²)) · r\nSince μ₀, I, and R are constants, B is a linearly increasing function of distance r from the axis up to the outer boundary (r = R).\n2) Outside the wire (r ≥ R):\nB(r) = μ₀ I / (2π r)\nHere, the magnetic field decreases inversely with distance, following a 1/r dependence.\nTherefore, the variation is a linearly increasing function of distance r up to the boundary of the wire, and then decreasing with 1/r dependence for the outside region.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "How does the magnetic field depend on distance r from the axis of an infinitely long, hollow thin-walled cylindrical pipe carrying a uniform axial current?",
      option_a: "B = 0 inside, and B ∝ 1/r outside",
      option_b: "B ∝ r inside, and B ∝ 1/r outside",
      option_c: "B is constant inside, and B = 0 outside",
      option_d: "B ∝ 1/r inside and outside",
      correct_option: "A",
      explanation: "For an open hollow pipe carrying current on its surface:\nInside the hollow cavity, any Amperean loop encloses zero current (I_enc = 0), so B = 0.\nOutside the pipe, the entire current is enclosed, so B = μ₀ I / (2π r) ∝ 1/r.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 984,
    originalQuestion: {
      question: "Given below are two statements: Statement I: Biot-Savart's law gives us the expression for the magnetic field strength of an infinitesimal current element (I dl) of a current-carrying conductor only. Statement II: Biot-Savart's law is analogous to Coulomb's inverse square law of charge q, with the former being related to the field produced by a scalar source, I dl, while the latter being produced by a vector source, q. In light of the above statements, choose the most appropriate answer from the options given below: [NEET 2022 Phase 1]",
      option_a: "Both Statement I and Statement II are correct",
      option_b: "Both Statement I and Statement II are incorrect",
      option_c: "Statement I is correct and Statement II is incorrect",
      option_d: "Statement I is incorrect and Statement II is correct",
      correct_option: "C",
      explanation: "1) Analysis of Statement I:\nBiot-Savart's law mathematically defines the magnetic field dB⃗ produced by an infinitesimal current element I dl⃗ as:\ndB⃗ = (μ₀ / 4π) · (I dl⃗ × r̂) / r²\nIt applies directly to infinitesimal current elements and is the fundamental differential law of magnetostatics. Hence, Statement I is correct.\n2) Analysis of Statement II:\nIn electromagnetism, electric charge q is a scalar quantity, so Coulomb's law relates an electrostatic field to a scalar source q.\nConversely, a current element I dl⃗ is inherently a vector quantity, so Biot-Savart's law relates a magnetic field to a vector source I dl⃗.\nStatement II erroneously asserts that I dl is a scalar source and q is a vector source (reversing their fundamental nature).\nHence, Statement II is incorrect.\nTherefore, Statement I is correct and Statement II is incorrect.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following comparisons between Coulomb's law and Biot-Savart's law is correct?",
      option_a: "Coulomb's law is produced by a scalar source (charge q), whereas Biot-Savart's law is produced by a vector source (current element I dl⃗)",
      option_b: "Both laws are produced by scalar sources",
      option_c: "Coulomb's law depends on angle θ, while Biot-Savart's law does not",
      option_d: "Biot-Savart's law does not follow the inverse square law",
      correct_option: "A",
      explanation: "Charge q is a scalar source, and electric field E⃗ acts along the line joining the charges.\nA current element I dl⃗ is a vector source, and magnetic field dB⃗ is perpendicular to both dl⃗ and r̂.\nBoth follow an inverse square dependence on distance (1/r²).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 983,
    originalQuestion: {
      question: "A long solenoid of radius 1 mm has 100 turns per mm. If 1 A current flows in the solenoid, the magnetic field strength at the centre of the solenoid is: [NEET 2022 Phase 1]",
      option_a: "6.28 × 10⁻² T",
      option_b: "12.56 × 10⁻² T",
      option_c: "12.56 × 10⁻⁴ T",
      option_d: "6.28 × 10⁻⁴ T",
      correct_option: "B",
      explanation: "Given parameters:\nNumber of turns per mm = 100 turns / mm\nConverting to turns per metre:\nn = 100 turns / (10⁻³ m) = 10⁵ turns/m\nCurrent I = 1 A\nPermeability of free space μ₀ = 4π × 10⁻⁷ T m A⁻¹\nThe magnetic field strength at the centre of a long solenoid is given by:\nB = μ₀ · n · I\nB = (4π × 10⁻⁷ T m A⁻¹) × (10⁵ m⁻¹) × (1 A)\nB = 4π × 10⁻² T\nUsing π ≈ 3.1416:\nB = 4 × 3.1416 × 10⁻² T = 12.566 × 10⁻² T ≈ 12.56 × 10⁻² T\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A long solenoid has 50 turns per cm and carries a current of 2 A. What is the magnetic field intensity inside the solenoid? (Take π = 3.14)",
      option_a: "1.26 × 10⁻² T",
      option_b: "6.28 × 10⁻² T",
      option_c: "1.26 × 10⁻³ T",
      option_d: "2.51 × 10⁻² T",
      correct_option: "A",
      explanation: "n = 50 turns / 10⁻² m = 5000 turns/m.\nB = μ₀ n I = (4π × 10⁻⁷) × 5000 × 2 = 4π × 10⁻³ T ≈ 1.256 × 10⁻² T ≈ 1.26 × 10⁻² T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 982,
    originalQuestion: {
      question: "The magnetic field on the axis of a circular loop of radius 100 cm carrying current I = √2 A at a point 1 m away from the centre of the loop is given by: [NEET 2022 Phase 2]",
      option_a: "6.28 × 10⁻⁴ T",
      option_b: "3.14 × 10⁻⁷ T",
      option_c: "6.28 × 10⁻⁷ T",
      option_d: "3.14 × 10⁻⁴ T",
      correct_option: "B",
      explanation: "The magnetic field on the axis of a circular loop of radius R at a distance x from its centre is:\nB = (μ₀ I R²) / [2 (R² + x²)^(3/2)]\nGiven:\nRadius R = 100 cm = 1 m\nAxial distance x = 1 m\nCurrent I = √2 A\nPermeability μ₀ = 4π × 10⁻⁷ T m A⁻¹\nCalculate the denominator term:\nR² + x² = 1² + 1² = 2 m²\n(R² + x²)^(3/2) = (2)^(3/2) = 2√2\nSubstitute into the magnetic field formula:\nB = (μ₀ · √2 · 1²) / [2 · (2√2)] = (μ₀ · √2) / (4√2) = μ₀ / 4\nB = (4π × 10⁻⁷) / 4 = π × 10⁻⁷ T\nUsing π ≈ 3.1416:\nB = 3.14 × 10⁻⁷ T\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A circular coil of radius R carrying current I produces a magnetic field at an axial point at distance x = R from the centre. What fraction of the field at the centre is this axial field?",
      option_a: "1 / (2√2)",
      option_b: "1 / √2",
      option_c: "1 / 4",
      option_d: "1 / 2",
      correct_option: "A",
      explanation: "Field at centre: B_centre = μ₀ I / (2R).\nField on axis at x = R: B_axis = μ₀ I R² / [2(R² + R²)^(3/2)] = μ₀ I R² / [2(2R²)^(3/2)] = μ₀ I / [2(2√2) R] = B_centre / (2√2).\nFraction B_axis / B_centre = 1 / (2√2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 981,
    originalQuestion: {
      question: "Two very long, straight, parallel conductors A and B carry currents of 5 A and 10 A, respectively, and are at a distance of 10 cm from each other. The direction of current in the two conductors is the same. The force acting per unit length between two conductors is (μ₀ = 4π × 10⁻⁷ SI units): [NEET 2022 Phase 2]",
      option_a: "1 × 10⁻⁴ N m⁻¹ and is repulsive",
      option_b: "2 × 10⁻⁴ N m⁻¹ and is attractive",
      option_c: "2 × 10⁻⁴ N m⁻¹ and is repulsive",
      option_d: "1 × 10⁻⁴ N m⁻¹ and is attractive",
      correct_option: "D",
      explanation: "Given parameters:\nCurrent in wire A: I₁ = 5 A\nCurrent in wire B: I₂ = 10 A\nDistance between conductors d = 10 cm = 0.1 m\nThe magnetic force per unit length between two long parallel current-carrying wires is given by:\nF / L = (μ₀ I₁ I₂) / (2π d)\nSubstituting the numerical values:\nF / L = [(4π × 10⁻⁷) × 5 × 10] / [2π × 0.1]\nF / L = [2 × 10⁻⁷ × 50] / 0.1 = (100 × 10⁻⁷) / 0.1 = 10⁻⁵ / 0.1 = 1 × 10⁻⁴ N m⁻¹\nSince the currents flow in the same direction (parallel currents), the nature of the magnetic force between them is mutually attractive.\nTherefore, the force acting per unit length is 1 × 10⁻⁴ N m⁻¹ and is attractive.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two parallel straight wires separated by 5 cm carry currents of 4 A and 2 A in opposite directions. What is the magnitude and nature of the force per unit length between them?",
      option_a: "3.2 × 10⁻⁵ N/m, repulsive",
      option_b: "3.2 × 10⁻⁵ N/m, attractive",
      option_c: "1.6 × 10⁻⁵ N/m, repulsive",
      option_d: "6.4 × 10⁻⁵ N/m, attractive",
      correct_option: "A",
      explanation: "F/L = (μ₀ I₁ I₂) / (2π d) = (2 × 10⁻⁷ × 4 × 2) / 0.05 = (1.6 × 10⁻⁶) / 0.05 = 3.2 × 10⁻⁵ N/m.\nBecause the currents are in opposite directions (antiparallel), the force is repulsive.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 980,
    originalQuestion: {
      question: "The shape of the magnetic field lines due to an infinitely long, straight current-carrying conductor is: [NEET 2022 Phase 2]",
      option_a: "A plane",
      option_b: "A straight line",
      option_c: "Circular",
      option_d: "Elliptical",
      correct_option: "C",
      explanation: "According to Biot-Savart's law and Ampere's circuital law, the magnetic field produced by an infinitely long straight wire carrying a steady current I exhibits cylindrical symmetry.\nAt any distance r from the wire, the magnetic field vector B⃗ is directed tangentially along circles centered on the wire and lying in planes perpendicular to the wire:\nB⃗ = (μ₀ I / (2π r)) θ̂\nConsequently, the magnetic field lines form continuous concentric closed circles around the straight conductor.\nThe direction of these circular lines is given by the Right-Hand Thumb Rule (with the thumb pointing along the current, the curled fingers indicate the direction of the circular field lines).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following rules is used to determine the circular direction of magnetic field lines around a straight current-carrying wire?",
      option_a: "Right-Hand Thumb Rule",
      option_b: "Fleming's Left-Hand Rule",
      option_c: "Lenz's Law",
      option_d: "Faraday's Law",
      correct_option: "A",
      explanation: "The Right-Hand Thumb Rule states that if the right thumb points in the direction of conventional current, the curled fingers encircle the wire in the direction of the circular magnetic field lines.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 979,
    originalQuestion: {
      question: "A closely packed coil having 1000 turns has an average radius of 62.8 cm. If current carried by the wire of the coil is 1 A, the value of magnetic field produced at the centre of the coil will be (permeability of free space = 4π × 10⁻⁷ H/m) nearly: [NEET 2022 Phase 2]",
      option_a: "10⁻³ T",
      option_b: "10⁻¹ T",
      option_c: "10⁻² T",
      option_d: "10² T",
      correct_option: "A",
      explanation: "Given parameters:\nNumber of turns N = 1000\nAverage radius R = 62.8 cm = 0.628 m\nCurrent I = 1 A\nPermeability μ₀ = 4π × 10⁻⁷ H/m\nThe magnetic field at the centre of a circular coil of N turns is given by:\nB = (μ₀ N I) / (2R)\nSubstitute the numerical values:\nB = (4π × 10⁻⁷ × 1000 × 1) / (2 × 0.628)\nNotice that 2 × 0.628 = 1.256 m.\nAlso, 4π = 4 × 3.1416 = 12.566 ≈ 1.2566 × 10:\nB = (12.566 × 10⁻⁴) / 1.256 ≈ 1.0 × 10⁻³ T\nThus, the magnetic field produced at the centre of the coil is nearly 10⁻³ T.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A circular coil of 500 turns and radius 31.4 cm carries a current of 2 A. What is the magnetic field at the centre of the coil? (Take π = 3.14)",
      option_a: "2.0 × 10⁻³ T",
      option_b: "1.0 × 10⁻³ T",
      option_c: "4.0 × 10⁻³ T",
      option_d: "0.5 × 10⁻³ T",
      correct_option: "A",
      explanation: "B = μ₀ N I / (2R) = (4 × 3.14 × 10⁻⁷ × 500 × 2) / (2 × 0.314) = (4000 × 3.14 × 10⁻⁷) / 0.628 = (1.256 × 10⁻³) / 0.628 = 2.0 × 10⁻³ T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 978,
    originalQuestion: {
      question: "A very long conducting wire is bent in a semi-circular shape from A to B as shown in the figure. The magnetic field at point P for steady current configuration is given by: [NEET 2023]",
      option_a: "μ₀i/(4R), pointed away from the page",
      option_b: "[μ₀i/(4R)] [1 − 2/π], pointed away from the page",
      option_c: "[μ₀i/(4R)] [1 − 2/π], pointed into the page",
      option_d: "μ₀i/(4R), pointed into the page",
      correct_option: "B",
      explanation: "The configuration consists of:\n1) A semicircular arc of radius R carrying current i:\nThe magnetic field produced at the centre P by the semicircular arc is:\nB_semi = (1/2) · [μ₀ i / (2R)] = μ₀ i / (4R) (directed out of the page, i.e., away from the page by the right-hand rule).\n2) Two semi-infinite straight collinear/parallel wires:\nEach straight segment contributes a magnetic field directed oppositely (into the page):\nB_straight = 2 × [μ₀ i / (4π R)] = μ₀ i / (2π R) = [μ₀ i / (4R)] · (2 / π) (directed into the page).\n3) The net magnetic field at point P is the vector sum:\nB_net = B_semi − B_straight = [μ₀ i / (4R)] − [μ₀ i / (4R)] · (2 / π)\nB_net = [μ₀ i / (4R)] · [1 − 2/π]\nSince 2/π ≈ 2 / 3.14 ≈ 0.637 < 1, the semicircular contribution dominates.\nThus, the net field points away from the page (out of the page).\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A wire bent into a semicircular arc of radius R and two straight collinear segments produces magnetic field B at the centre. What is the ratio of the straight wire contribution to the semicircular arc contribution?",
      option_a: "2 / π",
      option_b: "π / 2",
      option_c: "1 / π",
      option_d: "4 / π",
      correct_option: "A",
      explanation: "B_straight = μ₀ I / (2π R) and B_semi = μ₀ I / (4R).\nRatio = [μ₀ I / (2π R)] / [μ₀ I / (4R)] = 4 / (2π) = 2 / π.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 977,
    originalQuestion: {
      question: "A wire carrying a current I along the positive x-axis has length L. It is kept in a magnetic field B = (2î + 3ĵ − 4k̂) T. The magnitude of the magnetic force acting on the wire is: [NEET 2023]",
      option_a: "√5 IL",
      option_b: "5 IL",
      option_c: "√3 IL",
      option_d: "3 IL",
      correct_option: "B",
      explanation: "The magnetic force on a straight current-carrying conductor of length vector L⃗ in a uniform magnetic field B⃗ is:\nF⃗ = I (L⃗ × B⃗)\nGiven:\nCurrent I flows along the positive x-axis, so the length vector is L⃗ = L î.\nMagnetic field B⃗ = (2 î + 3 ĵ − 4 k̂) T.\nCompute the cross product L⃗ × B⃗:\nL⃗ × B⃗ = (L î) × (2 î + 3 ĵ − 4 k̂)\nL⃗ × B⃗ = L [2 (î × î) + 3 (î × ĵ) − 4 (î × k̂)]\nUsing unit vector relations:\nî × î = 0\nî × ĵ = k̂\nî × k̂ = −ĵ ⇒ −4 (î × k̂) = −4 (−ĵ) = +4 ĵ\nTherefore:\nL⃗ × B⃗ = L (3 k̂ + 4 ĵ) = L (4 ĵ + 3 k̂)\nThe force vector is:\nF⃗ = I L (4 ĵ + 3 k̂)\nThe magnitude of the magnetic force is:\n|F⃗| = I L √(4² + 3²) = I L √(16 + 9) = I L √25 = 5 I L\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A straight wire of length 2 m carrying a current of 3 A along the positive y-axis is placed in a magnetic field B⃗ = (3 î + 4 k̂) T. What is the magnitude of the magnetic force on the wire?",
      option_a: "30 N",
      option_b: "15 N",
      option_c: "25 N",
      option_d: "42 N",
      correct_option: "A",
      explanation: "L⃗ = 2 ĵ m.\nF⃗ = I (L⃗ × B⃗) = 3 [2 ĵ × (3 î + 4 k̂)] = 6 [3 (ĵ × î) + 4 (ĵ × k̂)] = 6 [−3 k̂ + 4 î] = 6 (4 î − 3 k̂).\n|F⃗| = 6 × √(4² + (−3)²) = 6 × 5 = 30 N.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 976,
    originalQuestion: {
      question: "A uniform electric field and a uniform magnetic field are acting along the same direction in a certain region. If an electron is projected in the region such that its velocity is pointed along the direction of fields, then the electron: [NEET 2023 Manipur]",
      option_a: "Will turn towards right of direction of motion",
      option_b: "Will turn towards left of direction of motion",
      option_c: "Speed will decrease",
      option_d: "Speed will increase",
      correct_option: "C",
      explanation: "Let both electric field E⃗ and magnetic field B⃗ act along the +x direction (+î).\nThe electron (charge −e) is projected with velocity v⃗ = v î along the same +x direction.\n1) Magnetic force:\nF⃗_m = −e (v⃗ × B⃗) = −e (v î × B î) = 0\nBecause the angle between velocity and magnetic field is θ = 0°, the magnetic force is strictly zero.\n2) Electric force:\nF⃗_e = −e E⃗ = −e E î\nSince the electron carries a negative charge, the electric force acts in the −x direction, directly opposing its motion.\nThis opposing force produces a negative acceleration (deceleration) of magnitude a = eE / m.\nConsequently, the electron continues to move along a straight line with its speed continuously decreasing.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "An alpha-particle is projected parallel to uniform parallel electric and magnetic fields. How will its motion be affected?",
      option_a: "Its path remains straight and its speed increases",
      option_b: "Its path remains straight and its speed decreases",
      option_c: "It undergoes circular motion",
      option_d: "It deflects perpendicular to the fields",
      correct_option: "A",
      explanation: "For an alpha particle (charge +2e), magnetic force is zero since v⃗ ∥ B⃗.\nThe electric force F⃗ = +2e E⃗ acts in the direction of velocity, accelerating the particle with increasing speed along a straight line.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 975,
    originalQuestion: {
      question: "A long straight wire of length 2 m and mass 250 g is suspended horizontally in a uniform horizontal magnetic field of 0.7 T. The amount of current flowing through the wire will be (g = 9.8 m s⁻²): [NEET 2023 Manipur]",
      option_a: "2.45 A",
      option_b: "2.25 A",
      option_c: "2.75 A",
      option_d: "1.75 A",
      correct_option: "D",
      explanation: "Given parameters:\nLength of wire L = 2 m\nMass of wire m = 250 g = 0.25 kg\nMagnetic field B = 0.7 T (horizontal and perpendicular to the wire)\nAcceleration due to gravity g = 9.8 m s⁻²\nFor the horizontal wire to be suspended in equilibrium without falling:\nThe upward magnetic Lorentz force must balance the downward gravitational force (weight):\nF_magnetic = F_gravity\nI · L · B = m · g\nSolving for the current I:\nI = (m · g) / (L · B)\nSubstitute the numerical values:\nI = (0.25 kg × 9.8 m s⁻²) / (2 m × 0.7 T)\nI = 2.45 / 1.4 = 1.75 A\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A horizontal copper wire of length 1.5 m and mass 150 g carries current in a transverse horizontal magnetic field of 0.49 T. What current is required to levitate the wire against gravity? (g = 9.8 m/s²)",
      option_a: "2.0 A",
      option_b: "1.0 A",
      option_c: "3.0 A",
      option_d: "4.0 A",
      correct_option: "A",
      explanation: "I = m g / (L B) = (0.15 × 9.8) / (1.5 × 0.49) = 1.47 / 0.735 = 2.0 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 974,
    originalQuestion: {
      question: "A parallel plate capacitor is charged by connecting it to a battery through a resistor. If I is the current in the circuit, then in the gap between the plates: [NEET 2024]",
      option_a: "There is no current",
      option_b: "Displacement current of magnitude equal to I flows in the same direction as I",
      option_c: "Displacement current of magnitude equal to I flows in a direction opposite to that of I",
      option_d: "Displacement current of magnitude greater than I flows but can be in any direction",
      correct_option: "B",
      explanation: "During charging of a parallel plate capacitor, conduction current I flows through the connecting wires.\nAccording to Maxwell's formulation of Ampere's law, continuity of current demands that across the dielectric gap between the capacitor plates, a displacement current I_d exists:\nI_d = ε₀ (dΦ_E / dt)\nAt any instant, the electric flux between plates of area A is Φ_E = E A = (q / ε₀ A) A = q / ε₀.\nThe rate of change of electric flux is:\ndΦ_E / dt = (1 / ε₀) (dq / dt) = I / ε₀\nSubstituting into the displacement current expression:\nI_d = ε₀ · (I / ε₀) = I\nTo maintain continuity of current in the circuit loop, this displacement current flows across the gap in the same direction as the conduction current I.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the relationship between conduction current I_c in the leads and displacement current I_d between the plates of a discharging capacitor?",
      option_a: "I_d = I_c at every instant",
      option_b: "I_d = 0 during discharge",
      option_c: "I_d > I_c always",
      option_d: "I_d = I_c / 2",
      correct_option: "A",
      explanation: "By generalized Ampere-Maxwell law, total current is conserved along any closed path, ensuring I_d = I_c at every instant.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 973,
    originalQuestion: {
      question: "A tightly wound 100 turns coil of radius 10 cm carries a current of 7 A. The magnitude of the magnetic field at the centre of the coil is (take permeability of free space as 4π × 10⁻⁷ SI units): [NEET 2024]",
      option_a: "44 mT",
      option_b: "4.4 T",
      option_c: "4.4 mT",
      option_d: "44 T",
      correct_option: "C",
      explanation: "Given parameters:\nNumber of turns N = 100\nRadius of coil R = 10 cm = 0.1 m\nCurrent I = 7 A\nPermeability μ₀ = 4π × 10⁻⁷ T m A⁻¹ ≈ 4 × (22/7) × 10⁻⁷ T m A⁻¹\nThe magnetic field at the centre of a circular coil of N turns is:\nB = (μ₀ N I) / (2R)\nSubstitute the values:\nB = [4 × (22/7) × 10⁻⁷ × 100 × 7] / [2 × 0.1]\nThe factor of 7 in the numerator cancels with the 7 in the denominator of π:\nB = [4 × 22 × 10⁻⁷ × 100] / 0.2\nB = [88 × 10⁻⁵] / 0.2 = 440 × 10⁻⁵ T = 4.4 × 10⁻³ T = 4.4 mT\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A circular coil of 50 turns and radius 7 cm carries a current of 14 A. What is the magnetic field at its centre? (Take π = 22/7)",
      option_a: "6.28 mT",
      option_b: "3.14 mT",
      option_c: "1.26 mT",
      option_d: "12.56 mT",
      correct_option: "A",
      explanation: "B = μ₀ N I / (2R) = [4 × (22/7) × 10⁻⁷ × 50 × 14] / (2 × 0.07) = [4 × 22 × 10⁻⁷ × 50 × 2] / 0.14 = (8800 × 10⁻⁷) / 0.14 = 6.28 × 10⁻³ T = 6.28 mT.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 972,
    originalQuestion: {
      question: "A 2 amp current is flowing through two different small circular copper coils having radii ratio 1 : 2. The ratio of their respective magnetic moments will be: [NEET 2025]",
      option_a: "2 : 1",
      option_b: "4 : 1",
      option_c: "1 : 4",
      option_d: "1 : 2",
      correct_option: "C",
      explanation: "The magnetic dipole moment M of a circular coil of radius r carrying current I is:\nM = I · A = I · (π r²)\nGiven that both coils carry the same current I = 2 A, the magnetic moment is directly proportional to the square of their radii:\nM ∝ r²\nThe ratio of their radii is given as:\nr₁ / r₂ = 1 / 2\nTherefore, the ratio of their respective magnetic moments is:\nM₁ / M₂ = (r₁ / r₂)² = (1 / 2)² = 1 / 4 = 1 : 4\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two circular loops of wire carry the same current I. If the ratio of their radii is 1 : 3, what is the ratio of their magnetic dipole moments?",
      option_a: "1 : 9",
      option_b: "1 : 3",
      option_c: "3 : 1",
      option_d: "9 : 1",
      correct_option: "A",
      explanation: "M ∝ r². Thus, M₁ / M₂ = (r₁ / r₂)² = (1/3)² = 1 : 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 971,
    originalQuestion: {
      question: "An electron (mass 9 × 10⁻³¹ kg and charge 1.6 × 10⁻¹⁹ C) moving with speed c/100 (c = speed of light) is injected into a magnetic field B of magnitude 9 × 10⁻⁴ T perpendicular to its direction of motion. We wish to apply a uniform electric field E together with the magnetic field so that the electron does not deflect from its path. (Speed of light c = 3 × 10⁸ m s⁻¹.) [NEET 2025]",
      option_a: "E is parallel to B and its magnitude is 27 × 10² V m⁻¹",
      option_b: "E is parallel to B and its magnitude is 27 × 10⁴ V m⁻¹",
      option_c: "E is perpendicular to B and its magnitude is 27 × 10⁴ V m⁻¹",
      option_d: "E is perpendicular to B and its magnitude is 27 × 10² V m⁻¹",
      correct_option: "D",
      explanation: "For the electron to pass undeflected through simultaneous electric and magnetic fields:\nThe electric Lorentz force must be equal in magnitude and opposite in direction to the magnetic Lorentz force:\nq E = q v B ⇒ E = v · B\n1) Speed of the electron:\nv = c / 100 = (3 × 10⁸ m s⁻¹) / 100 = 3 × 10⁶ m s⁻¹\n2) Given magnetic field B = 9 × 10⁻⁴ T:\nE = (3 × 10⁶ m s⁻¹) × (9 × 10⁻⁴ T) = 27 × 10² V m⁻¹\n3) Direction analysis:\nSince the magnetic force F⃗_m = −e (v⃗ × B⃗) is perpendicular to both v⃗ and B⃗, the electric force F⃗_e = −e E⃗ must act along the line of F⃗_m.\nTherefore, the electric field E⃗ must be perpendicular to both the velocity v⃗ and the magnetic field B⃗ (mutually perpendicular crossed fields condition).\nThus, E is perpendicular to B and its magnitude is 27 × 10² V m⁻¹.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A proton moving at 2 × 10⁶ m/s travels undeflected through crossed electric and magnetic fields. If B = 0.5 T, what is the magnitude and orientation of the electric field relative to B?",
      option_a: "1.0 × 10⁶ V/m, perpendicular to B",
      option_b: "1.0 × 10⁶ V/m, parallel to B",
      option_c: "4.0 × 10⁶ V/m, perpendicular to B",
      option_d: "2.5 × 10⁵ V/m, parallel to B",
      correct_option: "A",
      explanation: "E = v B = (2 × 10⁶ m/s) × 0.5 T = 1.0 × 10⁶ V/m.\nIn a velocity selector, E must be perpendicular to B and v.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 970,
    originalQuestion: {
      question: "A model for quantized motion of an electron in a uniform magnetic field B states that the flux passing through the orbit of the electron is n(h/e), where n is an integer, h is Planck's constant and e is the magnitude of electron's charge. According to the model, the magnetic moment of an electron in its lowest energy state will be (m is the mass of the electron): [NEET 2025]",
      option_a: "heB/(πm)",
      option_b: "heB/(2πm)",
      option_c: "he/(πm)",
      option_d: "he/(2πm)",
      correct_option: "D",
      explanation: "According to the given quantization condition, the magnetic flux through the circular orbit of radius r is:\nΦ = B · (π r²) = n · (h / e)\nFor the lowest energy state, n = 1:\nB · π r² = h / e ⇒ r² = h / (π e B)\nThe electron of mass m moving with speed v in magnetic field B satisfies the centripetal force equation:\nm v² / r = e v B ⇒ v = e B r / m\nThe magnetic moment M of the orbiting electron is:\nM = I · A = [e / (2π r / v)] · (π r²) = (1/2) e v r\nSubstitute v = e B r / m:\nM = (1/2) e [e B r / m] r = [e² B / (2m)] · r²\nSubstitute r² = h / (π e B):\nM = [e² B / (2m)] · [h / (π e B)] = (e h) / (2π m) = he / (2πm)\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "According to the Bohr model, what is the magnetic dipole moment of an electron in the first orbit (ground state) of a hydrogen atom?",
      option_a: "e h / (4π m)",
      option_b: "e h / (2π m)",
      option_c: "2 e h / (π m)",
      option_d: "e h / m",
      correct_option: "A",
      explanation: "In the Bohr atom, orbital angular momentum is L = h / (2π).\nThe gyromagnetic ratio is M / L = e / (2m).\nThus, M = (e / 2m) L = (e / 2m) · [h / (2π)] = e h / (4π m) (known as the Bohr magneton μ_B).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 969,
    originalQuestion: {
      question: "A parallel plate capacitor made of circular plates is being charged such that the surface charge density on its plates is increasing at a constant rate with time. The magnetic field arising due to displacement current is: [NEET 2025]",
      option_a: "Non-zero everywhere with maximum at the imaginary cylindrical surface connecting peripheries of the plates",
      option_b: "Zero between the plates and non-zero outside",
      option_c: "Zero at all places",
      option_d: "Constant between the plates and zero outside the plates",
      correct_option: "A",
      explanation: "Let the circular plates have radius R.\nDuring charging, a time-varying electric field E(t) exists between the plates, giving rise to a displacement current density:\nJ_d = ε₀ (dE/dt)\nApplying Maxwell-Ampere's law ∮ B⃗ · dl⃗ = μ₀ I_d, enc to a circular loop of radius r concentric with the plates:\n1) Inside the plates (r ≤ R):\nB(r) · (2π r) = μ₀ J_d · (π r²) ⇒ B(r) = (μ₀ J_d / 2) · r ∝ r\nThe magnetic field increases linearly with distance r from 0 at the central axis to a peak value at the boundary r = R.\n2) Outside the plates (r ≥ R):\nB(r) · (2π r) = μ₀ I_d, total ⇒ B(r) = (μ₀ I_d, total) / (2π r) ∝ 1 / r\nThe magnetic field decreases inversely with distance r.\nTherefore, the magnetic field is non-zero everywhere, attaining its maximum value precisely at the periphery (the imaginary cylindrical surface connecting the circular boundaries of the plates at r = R).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "During charging of circular capacitor plates of radius R, at what radial distance r from the central axis is the induced magnetic field maximum?",
      option_a: "r = R (at the plate boundary)",
      option_b: "r = 0 (at the central axis)",
      option_c: "r = R / 2",
      option_d: "r = 2R",
      correct_option: "A",
      explanation: "Inside the plates B ∝ r, and outside B ∝ 1/r.\nThe continuous field reaches its maximum at the interface r = R.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 968,
    originalQuestion: {
      question: "The figure given below shows a long straight solid wire of circular cross-section of radius a carrying steady current I. The current I is uniformly distributed across its cross-section. The plot which correctly represents the variation of magnetic field (B) with distance (r) from the axis of the conductor is: [NEET 2026]",
      option_a: "B increases linearly with r inside the wire (r ≤ a) to a maximum at r = a, then decreases as 1/r outside (r ≥ a)",
      option_b: "B is constant inside the wire (r ≤ a) and decreases linearly outside (r ≥ a)",
      option_c: "B is zero inside the wire (r ≤ a) and decreases as 1/r outside (r ≥ a)",
      option_d: "B increases parabolically inside the wire (r ≤ a) and is constant outside (r ≥ a)",
      correct_option: "A",
      explanation: "According to Ampere's circuital law for a solid cylindrical conductor of radius a carrying uniformly distributed current I:\n1) Inside the wire at distance r ≤ a from the axis:\nThe current enclosed by an Amperean loop of radius r is I_enc = I (r² / a²).\n∮ B⃗ · dl⃗ = B (2π r) = μ₀ I (r² / a²)\nB(r) = (μ₀ I / (2π a²)) · r ∝ r\nThus, B is directly proportional to r, starting from zero at the center and increasing linearly to a peak value B_max = μ₀ I / (2π a) at the surface r = a.\n2) Outside the wire at distance r ≥ a:\nB(r) · (2π r) = μ₀ I ⇒ B(r) = μ₀ I / (2π r) ∝ 1 / r\nThus, B decreases inversely with distance r.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the ratio of the magnetic field at distance r = a/4 from the axis of a solid wire of radius a to the field at distance r = 4a from the axis?",
      option_a: "1 : 1",
      option_b: "1 : 4",
      option_c: "4 : 1",
      option_d: "1 : 16",
      correct_option: "A",
      explanation: "Inside at r = a/4: B_in = [μ₀ I / (2π a²)] · (a/4) = μ₀ I / (8π a).\nOutside at r = 4a: B_out = μ₀ I / [2π (4a)] = μ₀ I / (8π a).\nRatio B_in / B_out = 1 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 967,
    originalQuestion: {
      question: "A 100-turn closely wound circular coil of radius 5 cm has a magnetic field of 3.14 × 10⁻³ T at its centre. The current flowing through the coil, and the magnitude of the magnetic moment of this coil are, respectively. (Take μ₀ = 4π × 10⁻⁷ T m/A.) [NEET 2026]",
      option_a: "2 A, 10 A m²",
      option_b: "2.5 A, 20 A m²",
      option_c: "2 A, 4 A m²",
      option_d: "2.5 A, 2 A m²",
      correct_option: "D",
      explanation: "Given parameters:\nNumber of turns N = 100\nRadius R = 5 cm = 0.05 m\nMagnetic field at centre B = 3.14 × 10⁻³ T\n1) The magnetic field at the centre of a circular coil is:\nB = (μ₀ N I) / (2R)\nSolving for current I:\nI = (2 R B) / (μ₀ N)\nI = [2 × 0.05 × (3.14 × 10⁻³)] / [(4π × 10⁻⁷) × 100]\nWith π ≈ 3.14:\nI = [0.1 × (3.14 × 10⁻³)] / [4 × 3.14 × 10⁻⁵] = (0.1 × 10⁻³) / (4 × 10⁻⁵) = 10⁻⁴ / (4 × 10⁻⁵) = 10 / 4 = 2.5 A\n2) The magnetic dipole moment M of the coil is:\nM = N · I · A = N · I · (π R²)\nM = 100 × 2.5 × 3.1416 × (0.05)² = 250 × 3.1416 × 0.0025 = 1.9635 A m² ≈ 2 A m²\nTherefore, the current is 2.5 A and the magnetic moment is 2 A m².\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A circular coil of 200 turns and radius 10 cm has a magnetic field of 6.28 × 10⁻³ T at its centre. What is the current flowing through the coil? (Take π = 3.14)",
      option_a: "5 A",
      option_b: "2.5 A",
      option_c: "10 A",
      option_d: "1 A",
      correct_option: "A",
      explanation: "B = μ₀ N I / (2R) ⇒ I = 2 R B / (μ₀ N) = [2 × 0.1 × 6.28 × 10⁻³] / [4 × 3.14 × 10⁻⁷ × 200] = [1.256 × 10⁻³] / [2.512 × 10⁻⁴] = 5 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 966,
    originalQuestion: {
      question: "A current I₀ flows through a metallic circular loop of radius r as shown in the figure. Resistance of the segment ABC is half that of ADC. Magnitude of magnetic field at the centre O of the loop is: [RE-NEET 2026]",
      option_a: "μ₀I₀/(2πr)",
      option_b: "μ₀I₀/(12r)",
      option_c: "μ₀I₀/(4r)",
      option_d: "μ₀I₀/(2r)",
      correct_option: "B",
      explanation: "Let the resistance of segment ABC be R₁ = R.\nThen the resistance of segment ADC is R₂ = 2R.\nSince the two segments are connected in parallel across the input and output terminals, the total current I₀ divides inversely with their resistances:\nI₁ = [R₂ / (R₁ + R₂)] I₀ = [2R / (R + 2R)] I₀ = (2/3) I₀ (through segment ABC)\nI₂ = [R₁ / (R₁ + R₂)] I₀ = [R / (R + 2R)] I₀ = (1/3) I₀ (through segment ADC)\nBoth ABC and ADC are semicircular arcs of radius r (subtending angle π each).\n1) Magnetic field produced by segment ABC:\nB₁ = (1/2) · [μ₀ I₁ / (2r)] = μ₀ (2/3 I₀) / (4r) = μ₀ I₀ / (6r) (pointing out of page)\n2) Magnetic field produced by segment ADC:\nB₂ = (1/2) · [μ₀ I₂ / (2r)] = μ₀ (1/3 I₀) / (4r) = μ₀ I₀ / (12r) (pointing into page)\nSince B₁ and B₂ point in opposite directions, the magnitude of the net magnetic field at the centre O is:\nB_net = B₁ − B₂ = [μ₀ I₀ / (6r)] − [μ₀ I₀ / (12r)] = μ₀ I₀ / (12r)\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Current I enters a circular loop of radius a and branches into two semicircles with resistances in ratio 1 : 3. What is the net magnetic field at the centre?",
      option_a: "μ₀ I / (8a)",
      option_b: "μ₀ I / (4a)",
      option_c: "μ₀ I / (16a)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Currents in semicircles are I₁ = (3/4) I and I₂ = (1/4) I.\nFields are B₁ = μ₀ (3/4 I) / (4a) = 3μ₀I / (16a) and B₂ = μ₀ (1/4 I) / (4a) = μ₀I / (16a).\nOpposing directions give B_net = B₁ − B₂ = 2μ₀I / (16a) = μ₀ I / (8a).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 965,
    originalQuestion: {
      question: "Two infinitely long parallel conducting wires A and B carry currents I and 2I, respectively, in the same direction. The wire A has uniform mass per unit length λ and lies on an insulated floor. The wire B is kept fixed at a height h above the floor. The minimum magnitude of h so that the wire A does not rise from the floor is: (g is the acceleration due to gravity and μ₀ is the permeability of free space.) [RE-NEET 2026]",
      option_a: "4μ₀I²/(πλg)",
      option_b: "μ₀I²/(2πλg)",
      option_c: "μ₀I²/(πλg)",
      option_d: "2μ₀I²/(πλg)",
      correct_option: "C",
      explanation: "Wire A lies on the floor and wire B is fixed at height h directly above wire A.\nSince both wires carry currents in the same direction (I and 2I), the magnetic force between them is mutually attractive.\nWire B exerts an upward attractive magnetic force on wire A.\nThe magnetic force per unit length exerted by wire B on wire A is:\nF_m / L = (μ₀ · I_A · I_B) / (2π h) = (μ₀ · I · 2I) / (2π h) = (μ₀ I²) / (π h)\nThe downward gravitational force (weight) per unit length acting on wire A is:\nF_g / L = λ · g\nFor wire A not to rise from the floor, the downward weight must be at least equal to the upward attractive magnetic force:\nF_g / L ≥ F_m / L\nλ · g ≥ (μ₀ I²) / (π h)\nSolving for h:\nh ≥ (μ₀ I²) / (π λ g)\nThus, the minimum magnitude of height h is:\nh_min = μ₀ I² / (π λ g)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A wire of mass per unit length m' carrying current I₁ is placed on a horizontal table. A parallel wire carrying current I₂ in the same direction is fixed at distance d vertically above it. What is the condition for the lower wire to remain resting on the table?",
      option_a: "d ≥ μ₀ I₁ I₂ / (2π m' g)",
      option_b: "d ≤ μ₀ I₁ I₂ / (2π m' g)",
      option_c: "d ≥ μ₀ I₁ I₂ / (π m' g)",
      option_d: "d ≤ μ₀ I₁ I₂ / (4π m' g)",
      correct_option: "A",
      explanation: "Attractive upward force per unit length is F_m = μ₀ I₁ I₂ / (2π d).\nFor the wire to not be lifted: F_m ≤ m' g ⇒ d ≥ μ₀ I₁ I₂ / (2π m' g).\nTherefore, Option (A) is the correct answer."
    }
  }
];

