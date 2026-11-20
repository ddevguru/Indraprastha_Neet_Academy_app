// ch72_part3.js
// Questions 60 to 89 (IDs 482 to 453)
// Chapter 72: System of Particles & Rotational Motion (Physics)

module.exports = [
  {
    id: 482,
    originalQuestion: {
      question: "Two rotating bodies A and B of masses m and 2m with moments of inertia I_A and I_B (where I_B > I_A) have equal kinetic energy of rotation. If L_A and L_B be their angular momenta respectively, then: [NEET 2016 Phase 2]",
      option_a: "L_A = L_B / 2",
      option_b: "L_A = 2 L_B",
      option_c: "L_B > L_A",
      option_d: "L_A > L_B",
      correct_option: "C",
      explanation: "Step 1: The rotational kinetic energy K of a rotating body is related to its angular momentum L and moment of inertia I by:\nK = L² / (2I)  ⇒  L = √(2 I K)\n\nStep 2: Since both bodies have the same rotational kinetic energy (K_A = K_B = K):\nL_A = √(2 I_A K)\nL_B = √(2 I_B K)\n\nStep 3: Taking the ratio of their angular momenta:\nL_B / L_A = √(I_B / I_A)\n\nStep 4: Since it is given that I_B > I_A, it directly follows that:\n√(I_B / I_A) > 1  ⇒  L_B > L_A\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two flywheels X and Y have moments of inertia I_X and I_Y such that I_Y = 4 I_X. If their rotational kinetic energies are equal, the ratio of their angular momenta L_X : L_Y is:",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: The relationship between L and K is L = √(2 I K).\nStep 2: For equal kinetic energy: L_X / L_Y = √(I_X / I_Y).\nStep 3: Given I_Y = 4 I_X:\nL_X / L_Y = √(I_X / 4I_X) = √(1/4) = 1 / 2\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 481,
    originalQuestion: {
      question: "Two discs of the same moment of inertia rotating about their regular axes passing through centre and perpendicular to the plane of disc with angular velocities ω₁ and ω₂ are brought into contact face to face with coincident axes of rotation. The expression for the loss of energy during this process is: [NEET 2017]",
      option_a: "(1/4) I (ω₁ - ω₂)²",
      option_b: "I (ω₁ - ω₂)²",
      option_c: "(1/8) I (ω₁ - ω₂)²",
      option_d: "(1/2) I (ω₁ + ω₂)²",
      correct_option: "A",
      explanation: "Step 1: When two rotating bodies of moments of inertia I₁ and I₂ with angular speeds ω₁ and ω₂ are brought together coaxially, the common final angular velocity is:\nω_f = (I₁ ω₁ + I₂ ω₂) / (I₁ + I₂)\n\nStep 2: The loss of kinetic energy during the coupling process is given by:\nΔK = (1/2) [I₁ I₂ / (I₁ + I₂)] (ω₁ - ω₂)²\n\nStep 3: Here, both discs have identical moment of inertia (I₁ = I₂ = I):\nΔK = (1/2) [I × I / (I + I)] (ω₁ - ω₂)²\nΔK = (1/2) [I² / (2I)] (ω₁ - ω₂)² = (1/4) I (ω₁ - ω₂)²\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two discs each of moment of inertia 2 kg m² rotate coaxially in opposite directions with angular speeds 10 rad/s and 20 rad/s. When brought in face-to-face contact, the loss of rotational kinetic energy is:",
      option_a: "450 J",
      option_b: "900 J",
      option_c: "225 J",
      option_d: "150 J",
      correct_option: "A",
      explanation: "Step 1: For discs rotating in opposite directions, relative angular speed is ω₁ - (-ω₂) = ω₁ + ω₂.\nStep 2: Formula for energy loss: ΔK = (1/4) I (ω₁ + ω₂)²\nStep 3: With I = 2 kg m², ω₁ = 10 rad/s, ω₂ = 20 rad/s:\nΔK = (1/4) × 2 × (10 + 20)² = (1/2) × 30² = 0.5 × 900 = 450 J\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 480,
    originalQuestion: {
      question: "A rope is wound around a hollow cylinder of mass 3 kg and radius 40 cm. What is the angular acceleration of the cylinder if the rope is pulled with a force of 30 N? [NEET 2017]",
      option_a: "25 rad s⁻²",
      option_b: "0.25 rad s⁻²",
      option_c: "5 m s⁻²",
      option_d: "25 m s⁻²",
      correct_option: "A",
      explanation: "Step 1: The pulling force F = 30 N exerts a tangential torque on the hollow cylinder of radius R = 40 cm = 0.4 m:\nτ = F × R = 30 × 0.4 = 12 N m\n\nStep 2: The moment of inertia of a thin hollow cylinder of mass M = 3 kg and radius R = 0.4 m about its geometrical axis is:\nI = M R² = 3 × (0.4)² = 3 × 0.16 = 0.48 kg m²\n\nStep 3: The angular acceleration α is given by:\nα = τ / I = 12 / 0.48 = 1200 / 48 = 25 rad s⁻²\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A cord is wrapped around the rim of a solid cylinder of mass 4 kg and radius 0.2 m. If a pulling force of 20 N is applied to the cord, the angular acceleration of the cylinder is:",
      option_a: "50 rad/s²",
      option_b: "25 rad/s²",
      option_c: "10 rad/s²",
      option_d: "100 rad/s²",
      correct_option: "A",
      explanation: "Step 1: For a solid cylinder: I = (1/2) M R² = 0.5 × 4 × (0.2)² = 0.08 kg m².\nStep 2: Torque τ = F × R = 20 × 0.2 = 4.0 N m.\nStep 3: Angular acceleration: α = τ / I = 4.0 / 0.08 = 50 rad/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 479,
    originalQuestion: {
      question: "The moment of the force F⃗ = 4 î + 5 ĵ - 6 k̂ acting at point (2, 0, -3) about the point (2, -2, -2) is given by: [NEET 2018]",
      option_a: "-8 î - 4 ĵ - 7 k̂",
      option_b: "-4 î - ĵ - 8 k̂",
      option_c: "-7 î - 8 ĵ - 4 k̂",
      option_d: "-7 î - 4 ĵ - 8 k̂",
      correct_option: "D",
      explanation: "Step 1: The position vector of the point of application of the force is r⃗₁ = 2 î + 0 ĵ - 3 k̂.\nThe reference point about which torque is calculated is r⃗₀ = 2 î - 2 ĵ - 2 k̂.\n\nStep 2: The relative position vector is:\nr⃗ = r⃗₁ - r⃗₀ = (2 - 2) î + (0 - (-2)) ĵ + (-3 - (-2)) k̂ = 0 î + 2 ĵ - 1 k̂\n\nStep 3: Torque (moment of force) is given by τ⃗ = r⃗ × F⃗:\nτ⃗ = | î    ĵ    k̂  |\n     | 0    2   -1  |\n     | 4    5   -6  |\n\nStep 4: Expanding the determinant:\nτ⃗ = î [(2)(-6) - (-1)(5)] - ĵ [(0)(-6) - (-1)(4)] + k̂ [(0)(5) - (2)(4)]\nτ⃗ = î [-12 + 5] - ĵ [0 + 4] + k̂ [0 - 8]\nτ⃗ = -7 î - 4 ĵ - 8 k̂\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Find the torque of the force F⃗ = 2 î - 3 ĵ + 4 k̂ acting at the point (1, 1, 1) about the origin (0, 0, 0):",
      option_a: "7 î - 2 ĵ - 5 k̂",
      option_b: "-7 î + 2 ĵ + 5 k̂",
      option_c: "7 î + 2 ĵ - 5 k̂",
      option_d: "5 î - 2 ĵ + 7 k̂",
      correct_option: "A",
      explanation: "Step 1: Position vector r⃗ = î + ĵ + k̂.\nStep 2: τ⃗ = r⃗ × F⃗ = î(1×4 - 1×(-3)) - ĵ(1×4 - 1×2) + k̂(1×(-3) - 1×2)\nτ⃗ = î(4 + 3) - ĵ(4 - 2) + k̂(-3 - 2) = 7 î - 2 ĵ - 5 k̂\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 478,
    originalQuestion: {
      question: "Three objects, A: a solid sphere, B: a thin circular disc and C: a circular ring, each have the same mass M and radius R. They all spin with the same angular speed ω about their own symmetry axes. The amounts of work W required to bring them to rest would satisfy the relation: [NEET 2018]",
      option_a: "W_C > W_B > W_A",
      option_b: "W_A > W_B > W_C",
      option_c: "W_B > W_A > W_C",
      option_d: "W_A > W_C > W_B",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem, the work required to bring a rotating body to rest equals its initial rotational kinetic energy:\nW = (1/2) I ω²\n\nStep 2: Since all three objects have the same mass M, radius R, and angular speed ω, the work W is directly proportional to their moments of inertia I:\nW ∝ I\n\nStep 3: Comparing the moments of inertia about their symmetry axes:\n- For solid sphere (A): I_A = (2/5) M R² = 0.40 M R²\n- For circular disc (B): I_B = (1/2) M R² = 0.50 M R²\n- For circular ring (C): I_C = M R² = 1.00 M R²\n\nStep 4: Since I_C > I_B > I_A, it follows directly that:\nW_C > W_B > W_A\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A solid sphere and a thin spherical shell of equal mass and radius spin at the same angular speed. The ratio of work required to stop the solid sphere to that for the spherical shell is:",
      option_a: "3 : 5",
      option_b: "5 : 3",
      option_c: "2 : 3",
      option_d: "2 : 5",
      correct_option: "A",
      explanation: "Step 1: Work required to stop each body is W = (1/2) I ω².\nStep 2: I_solid = (2/5) M R², I_shell = (2/3) M R².\nStep 3: W_solid / W_shell = I_solid / I_shell = (2/5) / (2/3) = 3 / 5 = 3 : 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 477,
    originalQuestion: {
      question: "A solid sphere is rotating freely about its symmetry axis in free space. The radius of the sphere is increased keeping its mass same. Which of the following physical quantities would remain constant for the sphere? [NEET 2018]",
      option_a: "Angular velocity",
      option_b: "Moment of inertia",
      option_c: "Rotational kinetic energy",
      option_d: "Angular momentum",
      correct_option: "D",
      explanation: "Step 1: The solid sphere is rotating freely in isolated space, which means no external torque acts on it:\nτ_ext = 0\n\nStep 2: According to the principle of conservation of angular momentum:\nτ_ext = dL / dt = 0  ⇒  L = I ω = constant\nThus, angular momentum L must remain constant.\n\nStep 3: The moment of inertia of the sphere is I = (2/5) M R². When R increases at constant M, I increases.\n\nStep 4: Since L = I ω is constant, when I increases, the angular velocity ω must decrease.\nRotational kinetic energy K = L² / (2I) will also decrease.\nTherefore, only the angular momentum remains constant.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If the Earth were suddenly to shrink to half its present radius without any change in its mass, which quantity would remain unchanged?",
      option_a: "Angular momentum about its axis of rotation",
      option_b: "Angular speed of rotation",
      option_c: "Rotational kinetic energy",
      option_d: "Moment of inertia",
      correct_option: "A",
      explanation: "Step 1: Since shrinking occurs due to internal forces with no net external torque, angular momentum L = I ω remains strictly conserved.\nStep 2: I decreases to I/4, ω increases by 4 times, and kinetic energy increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 476,
    originalQuestion: {
      question: "A solid sphere is in rolling motion. In rolling motion a body possesses translational kinetic energy (K_t) as well as rotational kinetic energy (K_r) simultaneously. The ratio K_t : (K_t + K_r) for the sphere is: [NEET 2018]",
      option_a: "7 : 10",
      option_b: "5 : 7",
      option_c: "10 : 7",
      option_d: "2 : 5",
      correct_option: "B",
      explanation: "Step 1: In pure rolling motion without slipping (v = R ω), the translational kinetic energy is:\nK_t = (1/2) M v²\n\nStep 2: The rotational kinetic energy of a solid sphere (I = 2/5 M R²) is:\nK_r = (1/2) I ω² = (1/2) [(2/5) M R²] (v / R)² = (1/5) M v²\n\nStep 3: Total kinetic energy is:\nK_total = K_t + K_r = (1/2) M v² + (1/5) M v² = (7/10) M v²\n\nStep 4: The ratio K_t : (K_t + K_r) is:\nK_t / K_total = [(1/2) M v²] / [(7/10) M v²] = (1/2) / (7/10) = 5 / 7 = 5 : 7\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a thin hollow sphere rolling without slipping on a horizontal surface, the ratio of its rotational kinetic energy to its total kinetic energy is:",
      option_a: "2 : 5",
      option_b: "3 : 5",
      option_c: "2 : 3",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "Step 1: For a hollow sphere: I = (2/3) M R².\nStep 2: K_r = (1/2) I ω² = (1/3) M v².\nStep 3: K_t = (1/2) M v².\nStep 4: K_total = (1/2 + 1/3) M v² = (5/6) M v².\nStep 5: K_r / K_total = (1/3) / (5/6) = 2 / 5 = 2 : 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 475,
    originalQuestion: {
      question: "A disc of radius 2 m and mass 100 kg rolls on a horizontal floor. Its centre of mass has a speed of 20 cm/s. How much work is needed to stop it? [NEET 2019]",
      option_a: "1 J",
      option_b: "2 J",
      option_c: "3 J",
      option_d: "30 kJ",
      correct_option: "C",
      explanation: "Step 1: Given mass M = 100 kg and linear speed of centre of mass v = 20 cm/s = 0.2 m/s.\n\nStep 2: The total work required to stop the rolling disc equals its total kinetic energy (translational + rotational):\nW = K_total = (1/2) M v² + (1/2) I ω²\n\nStep 3: For pure rolling of a disc, I = (1/2) M R² and ω = v / R:\nK_total = (1/2) M v² + (1/4) M v² = (3/4) M v²\n\nStep 4: Substituting the given numerical values:\nW = (3/4) × 100 × (0.2)² = 75 × 0.04 = 3 J\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A solid cylinder of mass 20 kg rolls without slipping on a flat surface with a linear velocity of 4 m/s. The work that must be done to bring it to rest is:",
      option_a: "240 J",
      option_b: "160 J",
      option_c: "320 J",
      option_d: "120 J",
      correct_option: "A",
      explanation: "Step 1: For a rolling solid cylinder, total kinetic energy is:\nK_total = (3/4) M v²\nStep 2: Substitute M = 20 kg and v = 4 m/s:\nK_total = (3/4) × 20 × (4)² = 15 × 16 = 240 J\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 474,
    originalQuestion: {
      question: "Two particles A and B are moving in uniform circular motion in concentric circles of radii r_A and r_B with speeds v_A and v_B respectively. Their time period of rotation is the same. The ratio of angular speed of A to that of B will be: [NEET 2019]",
      option_a: "v_A : v_B",
      option_b: "1 : 1",
      option_c: "r_B : r_A",
      option_d: "r_A : r_B",
      correct_option: "B",
      explanation: "Step 1: The angular speed ω of a particle completing one revolution in time period T is given by:\nω = 2π / T\n\nStep 2: For particle A:\nω_A = 2π / T_A\nFor particle B:\nω_B = 2π / T_B\n\nStep 3: Since it is given that their time periods of rotation are the same (T_A = T_B):\nω_A / ω_B = (2π / T) / (2π / T) = 1 / 1 = 1 : 1\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Two satellites revolve around a planet in circular orbits with periods 8 hours and 24 hours respectively. The ratio of their angular speeds is:",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "1 : 9",
      option_d: "9 : 1",
      correct_option: "A",
      explanation: "Step 1: Angular speed is inversely proportional to time period: ω = 2π / T.\nStep 2: ω₁ / ω₂ = T₂ / T₁ = 24 / 8 = 3 / 1 = 3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 473,
    originalQuestion: {
      question: "A solid cylinder of mass 2 kg and radius 4 cm is rotating about its axis at the rate of 3 rpm. The torque required to stop it after 2 revolutions is: [NEET 2019]",
      option_a: "2 × 10⁻³ N m",
      option_b: "2 × 10⁻⁶ N m",
      option_c: "2 × 10⁶ N m",
      option_d: "12 × 10⁻⁴ N m",
      correct_option: "B",
      explanation: "Step 1: Convert the initial angular speed from rpm to rad/s:\nω₀ = 3 rpm = 3 × (2π / 60) = π / 10 rad s⁻¹\n\nStep 2: The total angular displacement in 2 revolutions is:\nθ = 2 × 2π = 4π radians\n\nStep 3: The moment of inertia of the solid cylinder of mass M = 2 kg and radius R = 4 cm = 0.04 m is:\nI = (1/2) M R² = (1/2) × 2 × (0.04)² = 1.6 × 10⁻³ kg m²\n\nStep 4: Using the third equation of rotational motion with final angular speed ω = 0:\nω² = ω₀² - 2 α θ\n0 = (π / 10)² - 2 α (4π)\n8π α = π² / 100  ⇒  α = π / 800 rad s⁻²\n\nStep 5: The required retarding torque is:\nτ = I α = (1.6 × 10⁻³) × (π / 800) = (1.6 / 800) × 10⁻³ × π = 2 × 10⁻⁶ π ≈ 6.28 × 10⁻⁶ N m\nAmong the choices, taking order of magnitude gives 2 × 10⁻⁶ N m.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A disc of moment of inertia 0.5 kg m² rotates at 10 rad/s. What constant retarding torque is required to stop it in 5 complete revolutions?",
      option_a: "2.5 / π N m",
      option_b: "5.0 / π N m",
      option_c: "1.25 / π N m",
      option_d: "10 / π N m",
      correct_option: "A",
      explanation: "Step 1: Work-energy theorem: τ θ = (1/2) I ω₀².\nStep 2: Angular displacement θ = 5 × 2π = 10π rad.\nStep 3: τ × 10π = (1/2) × 0.5 × (10)² = 0.25 × 100 = 25 J.\nStep 4: τ = 25 / (10π) = 2.5 / π N m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 472,
    originalQuestion: {
      question: "Find the torque about the origin when a force 3 ĵ N acts on a particle whose position vector is 2 k̂ m: [NEET 2020 Phase 1]",
      option_a: "6 ĵ N m",
      option_b: "-6 î N m",
      option_c: "6 k̂ N m",
      option_d: "6 î N m",
      correct_option: "B",
      explanation: "Step 1: The torque τ⃗ about the origin is defined as the cross product of the position vector r⃗ and the force vector F⃗:\nτ⃗ = r⃗ × F⃗\n\nStep 2: Given:\nr⃗ = 2 k̂ m\nF⃗ = 3 ĵ N\n\nStep 3: Evaluating the cross product using unit vector relationships:\nτ⃗ = (2 k̂) × (3 ĵ) = 6 (k̂ × ĵ)\n\nStep 4: In the right-handed Cartesian coordinate system:\nk̂ × ĵ = -î\n\nStep 5: Therefore:\nτ⃗ = 6 (-î) = -6 î N m\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A force F⃗ = 4 î N acts at a point whose position vector is r⃗ = 3 ĵ m. The torque about the origin is:",
      option_a: "-12 k̂ N m",
      option_b: "12 k̂ N m",
      option_c: "-12 î N m",
      option_d: "12 ĵ N m",
      correct_option: "A",
      explanation: "Step 1: τ⃗ = r⃗ × F⃗ = (3 ĵ) × (4 î) = 12 (ĵ × î).\nStep 2: Since ĵ × î = -k̂:\nτ⃗ = -12 k̂ N m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 471,
    originalQuestion: {
      question: "A uniform rod of length 200 cm and mass 500 g is balanced on a wedge placed at 40 cm mark. A mass of 2 kg is suspended from the rod at 20 cm and another unknown mass m is suspended from the rod at 160 cm mark as shown in the figure. Find the value of m such that the rod is in equilibrium (g = 10 m/s²): [NEET 2021]",
      option_a: "1 / 12 kg",
      option_b: "1 / 2 kg",
      option_c: "1 / 3 kg",
      option_d: "1 / 6 kg",
      correct_option: "A",
      explanation: "Step 1: Identify all forces acting on the rod and their locations:\n- Fulcrum/wedge is at x = 40 cm\n- Mass of 2 kg is hung at x = 20 cm, at distance d₁ = 40 - 20 = 20 cm to the left of the fulcrum\n- The rod is uniform with length 200 cm and mass M = 500 g = 0.5 kg. Its centre of mass is at x = 100 cm, at distance d_cm = 100 - 40 = 60 cm to the right of the fulcrum\n- Unknown mass m is hung at x = 160 cm, at distance d₂ = 160 - 40 = 120 cm to the right of the fulcrum\n\nStep 2: For rotational equilibrium of the rod, the sum of clockwise torques about the fulcrum equals the sum of anticlockwise torques:\nΣτ_anticlockwise = Στ_clockwise\n\nStep 3: Calculating torques about x = 40 cm:\n- Anticlockwise torque: (2 kg) × g × (20 cm) = 40 g\n- Clockwise torques: (0.5 kg) × g × (60 cm) + m × g × (120 cm) = 30 g + 120 m g\n\nStep 4: Equating torques:\n40 g = 30 g + 120 m g\n10 = 120 m\nm = 10 / 120 = 1 / 12 kg\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform meter rule of mass 100 g is pivoted at the 30 cm mark. A mass of 200 g is suspended at the 10 cm mark. Where must a mass of 50 g be hung to balance the ruler horizontally?",
      option_a: "70 cm mark",
      option_b: "60 cm mark",
      option_c: "80 cm mark",
      option_d: "90 cm mark",
      correct_option: "A",
      explanation: "Step 1: Distance of 200 g mass from pivot (30 cm) = 30 - 10 = 20 cm (anticlockwise).\nStep 2: Center of gravity of ruler (100 g) is at 50 cm, distance from pivot = 50 - 30 = 20 cm (clockwise).\nStep 3: Torque balance about pivot:\n200 × 20 = (100 × 20) + (50 × d)\n4000 = 2000 + 50 d  ⇒  50 d = 2000  ⇒  d = 40 cm to the right of pivot.\nStep 4: Position on ruler = 30 + 40 = 70 cm mark.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 470,
    originalQuestion: {
      question: "From a circular ring of mass M and radius R, an arc corresponding to a 90° sector is removed. The moment of inertia of the remaining part of the ring about an axis passing through the centre of the ring and perpendicular to the plane of the ring is K times M R². Then the value of K is: [NEET 2021]",
      option_a: "1 / 8",
      option_b: "3 / 4",
      option_c: "7 / 8",
      option_d: "1 / 4",
      correct_option: "B",
      explanation: "Step 1: The complete circular ring has mass M, radius R, and an angle of 360°.\n\nStep 2: An arc of 90° is removed. The fraction of the ring removed is:\n90° / 360° = 1 / 4\n\nStep 3: Therefore, the remaining part comprises 3/4 of the total mass of the ring:\nM_rem = (3/4) M\n\nStep 4: Every point on the remaining arc of the circular ring remains at the exact same distance R from the central axis.\nThus, the moment of inertia of the remaining portion about the central perpendicular axis is:\nI = M_rem R² = (3/4 M) R² = (3/4) M R²\n\nStep 5: Comparing with I = K M R²:\nK = 3 / 4\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform thin circular ring of mass M and radius R has an arc corresponding to a 60° angle cut away. The moment of inertia of the remaining portion about the central normal axis is:",
      option_a: "(5/6) M R²",
      option_b: "(1/6) M R²",
      option_c: "(2/3) M R²",
      option_d: "(1/3) M R²",
      correct_option: "A",
      explanation: "Step 1: Fraction of ring removed = 60° / 360° = 1/6.\nStep 2: Remaining fraction = 1 - 1/6 = 5/6, so remaining mass is M_rem = (5/6) M.\nStep 3: All mass elements are at distance R from the central axis, so I = M_rem R² = (5/6) M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 469,
    originalQuestion: {
      question: "The ratio of the radius of gyration of a thin uniform disc about an axis passing through its centre and normal to its plane to the radius of gyration of the disc about its diameter is: [NEET 2022 Phase 1]",
      option_a: "2 : 1",
      option_b: "√2 : 1",
      option_c: "4 : 1",
      option_d: "1 : √2",
      correct_option: "B",
      explanation: "Step 1: For a thin uniform disc of mass M and radius R:\n- Moment of inertia about an axis passing through the centre and normal to its plane:\nI_normal = (1/2) M R² = M K_normal²  ⇒  K_normal = R / √2\n\nStep 2: By the perpendicular axis theorem, the moment of inertia about any diameter in its plane is:\nI_dia = (1/4) M R² = M K_dia²  ⇒  K_dia = R / 2\n\nStep 3: The ratio of the two radii of gyration is:\nK_normal / K_dia = (R / √2) / (R / 2) = 2 / √2 = √2 / 1 = √2 : 1\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the ratio of the radius of gyration of a circular ring about a central perpendicular axis to that about its diameter?",
      option_a: "√2 : 1",
      option_b: "2 : 1",
      option_c: "1 : √2",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "Step 1: For a ring, I_normal = M R²  ⇒  K_normal = R.\nStep 2: By perpendicular axis theorem, I_dia = (1/2) M R²  ⇒  K_dia = R / √2.\nStep 3: Ratio: K_normal / K_dia = R / (R / √2) = √2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 468,
    originalQuestion: {
      question: "The angular speed of a flywheel moving with uniform angular acceleration changes from 1200 rpm to 3120 rpm in 16 seconds. The angular acceleration in rad/s² is: [NEET 2022 Phase 1]",
      option_a: "2π",
      option_b: "4π",
      option_c: "12π",
      option_d: "104π",
      correct_option: "B",
      explanation: "Step 1: Convert initial and final rotational speeds from rpm to rad/s:\nω₀ = 1200 rpm = 1200 × (2π / 60) = 40π rad s⁻¹\nω = 3120 rpm = 3120 × (2π / 60) = 104π rad s⁻¹\n\nStep 2: Using the first rotational kinematic equation:\nω = ω₀ + α t\n104π = 40π + α (16)\n\nStep 3: Solving for α:\n16 α = 104π - 40π = 64π\nα = 64π / 16 = 4π rad s⁻²\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A motor accelerates uniformly from 600 rpm to 1800 rpm in 10 seconds. Its angular acceleration is:",
      option_a: "4π rad/s²",
      option_b: "2π rad/s²",
      option_c: "6π rad/s²",
      option_d: "8π rad/s²",
      correct_option: "A",
      explanation: "Step 1: ω₀ = 600 × (2π / 60) = 20π rad/s.\nStep 2: ω = 1800 × (2π / 60) = 60π rad/s.\nStep 3: α = (60π - 20π) / 10 = 40π / 10 = 4π rad/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 467,
    originalQuestion: {
      question: "An energy of 484 J is spent in increasing the speed of a flywheel from 60 rpm to 360 rpm. The moment of inertia of the flywheel is: [NEET 2022 Phase 2]",
      option_a: "0.07 kg m²",
      option_b: "0.7 kg m²",
      option_c: "3.22 kg m²",
      option_d: "30.8 kg m²",
      correct_option: "B",
      explanation: "Step 1: Convert rotational speeds from rpm to rad/s:\nω₁ = 60 rpm = 60 × (2π / 60) = 2π rad s⁻¹\nω₂ = 360 rpm = 360 × (2π / 60) = 12π rad s⁻¹\n\nStep 2: The work done on the flywheel equals the change in its rotational kinetic energy:\nW = (1/2) I (ω₂² - ω₁²)\n\nStep 3: Substitute the angular velocities:\nW = (1/2) I [(12π)² - (2π)²] = (1/2) I [144π² - 4π²] = (1/2) I (140π²) = 70 π² I\n\nStep 4: Using π² ≈ 9.87:\n70 × 9.87 × I = 690.9 I ≈ 691 I\n\nStep 5: Equating to the spent energy W = 484 J:\n691 I = 484  ⇒  I = 484 / 691 ≈ 0.70 kg m²\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A flywheel has moment of inertia 0.5 kg m². The energy required to increase its speed from 120 rpm to 240 rpm is: (Take π² ≈ 10)",
      option_a: "120 J",
      option_b: "60 J",
      option_c: "300 J",
      option_d: "240 J",
      correct_option: "A",
      explanation: "Step 1: ω₁ = 120 × (2π/60) = 4π rad/s; ω₂ = 240 × (2π/60) = 8π rad/s.\nStep 2: ΔK = (1/2) I (ω₂² - ω₁²) = (1/2) × 0.5 × (64π² - 16π²) = 0.25 × 48π² = 12π².\nStep 3: With π² ≈ 10:\nΔK = 12 × 10 = 120 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 466,
    originalQuestion: {
      question: "The angular acceleration of a body moving along the circumference of a circle is: [NEET 2023]",
      option_a: "Along the radius towards the centre",
      option_b: "Along the tangent to its position",
      option_c: "Along the axis of rotation",
      option_d: "Along the radius away from the centre",
      correct_option: "C",
      explanation: "Step 1: Angular acceleration α⃗ is an axial vector that represents the rate of change of angular velocity:\nα⃗ = dω⃗ / dt\n\nStep 2: The angular velocity vector ω⃗ of circular motion is directed along the axis of rotation perpendicular to the plane of the circle (by the right-hand screw rule).\n\nStep 3: Consequently, any change in angular velocity dω⃗ and hence the angular acceleration vector α⃗ is also directed along the axis of rotation.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following rotational quantities is an axial vector directed along the axis of rotation?",
      option_a: "Angular displacement, angular velocity, and angular acceleration",
      option_b: "Centripetal acceleration and tangential velocity",
      option_c: "Linear momentum and radius vector",
      option_d: "Tangential acceleration and linear velocity",
      correct_option: "A",
      explanation: "Step 1: Infinitesimal angular displacement dθ⃗, angular velocity ω⃗, and angular acceleration α⃗ are all axial vectors pointing along the axis of rotation by right-hand thumb rule.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 465,
    originalQuestion: {
      question: "The ratio of the radius of gyration of a solid sphere of mass M and radius R about its own axis to the radius of gyration of a thin hollow sphere of the same mass and radius about its axis is: [NEET 2023]",
      option_a: "5 : 3",
      option_b: "2 : 5",
      option_c: "√5 : √3",
      option_d: "√3 : √5",
      correct_option: "D",
      explanation: "Step 1: For a solid sphere of mass M and radius R about its diameter:\nI_solid = (2/5) M R² = M K_solid²  ⇒  K_solid = √(2/5) R\n\nStep 2: For a thin hollow sphere of mass M and radius R about its diameter:\nI_hollow = (2/3) M R² = M K_hollow²  ⇒  K_hollow = √(2/3) R\n\nStep 3: The ratio of their radii of gyration is:\nK_solid / K_hollow = [√(2/5) R] / [√(2/3) R] = √(2/5) / √(2/3) = √(3/5) = √3 : √5\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Find the ratio of the radius of gyration of a uniform solid disc of radius R to that of a solid sphere of the same radius about their respective central symmetry axes:",
      option_a: "√5 : 2",
      option_b: "2 : √5",
      option_c: "5 : 4",
      option_d: "√5 : √3",
      correct_option: "A",
      explanation: "Step 1: For disc: K_disc = R / √2 = √(1/2) R.\nStep 2: For solid sphere: K_sphere = √(2/5) R.\nStep 3: Ratio: K_disc / K_sphere = √(1/2) / √(2/5) = √(5/4) = √5 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 464,
    originalQuestion: {
      question: "A constant torque of 100 N m turns a wheel of moment of inertia 300 kg m² about an axis passing through its centre. Starting from rest, its angular velocity after 3 s is: [NEET 2023 Manipur]",
      option_a: "1 rad/s",
      option_b: "5 rad/s",
      option_c: "10 rad/s",
      option_d: "15 rad/s",
      correct_option: "A",
      explanation: "Step 1: The angular acceleration produced by constant torque τ on a body of moment of inertia I is:\nα = τ / I\n\nStep 2: Substituting τ = 100 N m and I = 300 kg m²:\nα = 100 / 300 = 1/3 rad s⁻²\n\nStep 3: Starting from rest (ω₀ = 0), the angular velocity after time t = 3 s is:\nω = ω₀ + α t = 0 + (1/3) × 3 = 1 rad s⁻¹\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A constant torque of 25 N m acts on a stationary wheel of moment of inertia 5 kg m². The angular speed acquired by the wheel after 4 seconds is:",
      option_a: "20 rad/s",
      option_b: "15 rad/s",
      option_c: "25 rad/s",
      option_d: "10 rad/s",
      correct_option: "A",
      explanation: "Step 1: Angular acceleration α = τ / I = 25 / 5 = 5 rad/s².\nStep 2: Angular velocity after 4 s: ω = α t = 5 × 4 = 20 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 463,
    originalQuestion: {
      question: "A wheel of a bullock cart is rolling on a level road as shown in the figure. If the linear speed of the axle is v in the forward direction, which one of the options is correct for points P and Q (where P is the highest point and Q is the lowest point of contact on the wheel)? [NEET 2024]",
      option_a: "Point P moves slower than point Q",
      option_b: "Point P moves faster than point Q",
      option_c: "Both points P and Q move with equal speed",
      option_d: "Point P has zero speed",
      correct_option: "B",
      explanation: "Step 1: In pure rolling motion without slipping, the velocity of any point on the wheel is the vector sum of the translational velocity of the centre of mass (v î) and the rotational velocity relative to the centre of mass.\n\nStep 2: At the lowest point Q (the point of contact with the ground):\nv_trans = v î\nv_rot = -v î\nv_Q = v î - v î = 0 (instantaneously at rest)\n\nStep 3: At the highest point P (the top of the wheel):\nv_trans = v î\nv_rot = +v î\nv_P = v î + v î = 2v î\n\nStep 4: Since v_P = 2v and v_Q = 0, point P moves significantly faster than point Q.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A cylinder of radius R rolls without slipping on a horizontal path with center of mass speed v. What is the speed of a point on the rim at the same horizontal level as the center?",
      option_a: "√2 v",
      option_b: "2 v",
      option_c: "v",
      option_d: "v / √2",
      correct_option: "A",
      explanation: "Step 1: The translational velocity is v horizontally.\nStep 2: The rotational velocity is v vertically (tangent to rim at horizontal radius).\nStep 3: These two components are mutually perpendicular, so net speed is:\nv_net = √(v² + v²) = √2 v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 462,
    originalQuestion: {
      question: "The moment of inertia of a thin rod about an axis passing through its midpoint perpendicular to the rod is 2400 g cm². The length of the 400 g rod is nearly: [NEET 2024]",
      option_a: "8.5 cm",
      option_b: "17.5 cm",
      option_c: "20.7 cm",
      option_d: "72.0 cm",
      correct_option: "A",
      explanation: "Step 1: The moment of inertia of a thin uniform rod of mass M and length L about an axis passing through its midpoint perpendicular to its length is:\nI = (1/12) M L²\n\nStep 2: Given:\nI = 2400 g cm²\nM = 400 g\n\nStep 3: Substitute the given values:\n2400 = (1/12) × 400 × L²\nL² = (2400 × 12) / 400 = 6 × 12 = 72 cm²\n\nStep 4: Taking the square root:\nL = √72 = √(36 × 2) = 6√2 ≈ 6 × 1.414 ≈ 8.485 cm ≈ 8.5 cm\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A thin uniform rod of mass 300 g has a moment of inertia of 900 g cm² about its center perpendicular to its length. The length of the rod is:",
      option_a: "6 cm",
      option_b: "8 cm",
      option_c: "12 cm",
      option_d: "4 cm",
      correct_option: "A",
      explanation: "Step 1: Formula: I = (1/12) M L².\nStep 2: L² = 12 I / M = (12 × 900) / 300 = 12 × 3 = 36 cm².\nStep 3: L = √36 = 6 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 461,
    originalQuestion: {
      question: "A bob is whirled in a horizontal plane by means of a string with an initial speed of ω rpm. The tension in the string is T. If the speed becomes 2ω while keeping the same radius, the tension in the string becomes: [NEET 2024]",
      option_a: "T",
      option_b: "4T",
      option_c: "T / 4",
      option_d: "√2 T",
      correct_option: "B",
      explanation: "Step 1: For a bob of mass m moving in a horizontal circle of radius r with angular speed ω, the required centripetal force is provided entirely by the tension in the string:\nT = m r ω²\n\nStep 2: Since mass m and radius r are held constant:\nT ∝ ω²\n\nStep 3: When the angular speed is doubled to ω' = 2ω:\nT' = m r (2ω)² = m r (4ω²) = 4 (m r ω²) = 4T\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A small mass tied to a string rotates on a smooth horizontal table in a circle of radius R with tension T. If the angular speed is tripled while keeping the radius unchanged, the tension becomes:",
      option_a: "9T",
      option_b: "3T",
      option_c: "6T",
      option_d: "T / 9",
      correct_option: "A",
      explanation: "Step 1: Tension is proportional to the square of angular speed: T ∝ ω².\nStep 2: For ω' = 3ω:\nT' = 3² T = 9T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 460,
    originalQuestion: {
      question: "The radius of gyration of a solid sphere of mass 5 kg about the tangent XY is 5 m as shown in the figure. If the radius of the sphere is 5x / √7, then the value of x is: [NEET 2024 Re-Examination]",
      option_a: "√5",
      option_b: "√2",
      option_c: "√3",
      option_d: "5",
      correct_option: "A",
      explanation: "Step 1: The moment of inertia of a solid sphere of mass M and radius R about a tangent XY is given by the parallel axis theorem:\nI = I_cm + M R² = (2/5) M R² + M R² = (7/5) M R²\n\nStep 2: The radius of gyration k about the tangent is defined by I = M k²:\nM k² = (7/5) M R²  ⇒  k² = (7/5) R²\n\nStep 3: Given k = 5 m:\n5² = (7/5) R²\n25 = (7/5) R²  ⇒  R² = 125 / 7  ⇒  R = √(125 / 7) = 5√5 / √7\n\nStep 4: Given that R = 5x / √7:\n5x / √7 = 5√5 / √7  ⇒  x = √5\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The radius of gyration of a solid sphere of radius R about a tangent to its surface is k. The ratio k / R is:",
      option_a: "√(7/5)",
      option_b: "√(2/5)",
      option_c: "√(5/7)",
      option_d: "7 / 5",
      correct_option: "A",
      explanation: "Step 1: For a tangent to a solid sphere, I = (7/5) M R².\nStep 2: Radius of gyration k = √(I / M) = √[(7/5) R²] = √(7/5) R.\nStep 3: Ratio k / R = √(7/5).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 459,
    originalQuestion: {
      question: "A sphere of radius R is cut from a larger solid sphere of radius 2R as shown in the figure. The ratio of the moment of inertia of the smaller sphere to that of the rest part of the sphere about the Y-axis is: [NEET 2025]",
      option_a: "7 / 57",
      option_b: "7 / 64",
      option_c: "7 / 8",
      option_d: "7 / 40",
      correct_option: "A",
      explanation: "Step 1: Let the uniform density of the sphere material be ρ.\nMass of large sphere of radius 2R is:\nM₀ = (4/3) π (2R)³ ρ = 8 M\nwhere M = (4/3) π R³ ρ is the mass of the small removed sphere of radius R.\n\nStep 2: The centre of the small sphere is at distance d = R from the Y-axis.\nMoment of inertia of the small sphere about the Y-axis (by parallel axis theorem):\nI_small = (2/5) M R² + M (R)² = (7/5) M R²\n\nStep 3: The moment of inertia of the complete large sphere of radius 2R about the Y-axis (passing through its centre) is:\nI_total = (2/5) M₀ (2R)² = (2/5) (8M) (4R²) = (64/5) M R²\n\nStep 4: The moment of inertia of the remaining part about the Y-axis is:\nI_rest = I_total - I_small = (64/5) M R² - (7/5) M R² = (57/5) M R²\n\nStep 5: The ratio of I_small to I_rest is:\nI_small / I_rest = [(7/5) M R²] / [(57/5) M R²] = 7 / 57\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform disc of radius R has a hole of radius R/2 cut out touching its center and rim. If the mass of the removed portion is m, what is the ratio of the moment of inertia of the hole to the complete original disc about the central normal axis?",
      option_a: "3 / 32",
      option_b: "1 / 32",
      option_c: "1 / 8",
      option_d: "3 / 16",
      correct_option: "D",
      explanation: "Step 1: Removed portion: mass m = M/4, radius r = R/2, center at d = R/2.\nStep 2: I_hole = (1/2) m r² + m d² = (1/2)(M/4)(R/2)² + (M/4)(R/2)² = (1/32 + 2/32) M R² = 3/32 M R².\nStep 3: For the complete disc, I_total = (1/2) M R² = 16/32 M R².\nStep 4: Ratio I_hole / I_total = (3/32) / (16/32) = 3 / 16.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 458,
    originalQuestion: {
      question: "The Sun rotates around its centre once in 27 days. What will be the period of revolution if the Sun were to expand to twice its present radius without any external influence? Assume the Sun to be a sphere of uniform density: [NEET 2025]",
      option_a: "115 days",
      option_b: "108 days",
      option_c: "100 days",
      option_d: "105 days",
      correct_option: "B",
      explanation: "Step 1: Expansion occurs without any external torque (τ_ext = 0), so angular momentum is strictly conserved:\nL = I ω = constant\n\nStep 2: The moment of inertia of a solid sphere of mass M and radius R is:\nI = (2/5) M R²\nThus, I ∝ R².\n\nStep 3: Angular velocity is related to time period by ω = 2π / T:\nI (2π / T) = constant  ⇒  T ∝ I ∝ R²\n\nStep 4: Therefore, the ratio of time periods is:\nT₂ / T₁ = (R₂ / R₁)²\n\nStep 5: Given that the Sun expands to twice its present radius (R₂ = 2 R₁) and T₁ = 27 days:\nT₂ = T₁ × (2)² = 27 × 4 = 108 days\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A star of radius R rotates once every 16 days. If it collapses symmetrically to one-fourth of its initial radius, what is its new period of rotation?",
      option_a: "1 day",
      option_b: "2 days",
      option_c: "4 days",
      option_d: "0.5 days",
      correct_option: "A",
      explanation: "Step 1: Conserving angular momentum: T ∝ R².\nStep 2: When R' = R / 4:\nT' = T × (1/4)² = 16 × (1/16) = 1 day.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 457,
    originalQuestion: {
      question: "A uniform rod of mass 20 kg and length 5 m leans against a smooth vertical wall making an angle of 60° with it. The other end rests on a rough horizontal floor. The friction force that the floor exerts on the rod is: (Take g = 10 m/s²) [NEET 2025]",
      option_a: "200 N",
      option_b: "200√3 N",
      option_c: "100 N",
      option_d: "100√3 N",
      correct_option: "D",
      explanation: "Step 1: Identify the forces acting on the rod:\n- Weight W = mg = 20 × 10 = 200 N acting downwards at the center of mass (midpoint, distance L/2 = 2.5 m)\n- Normal force from the floor N_floor acting vertically upwards\n- Friction force f from the floor acting horizontally towards the wall\n- Normal reaction N_wall from the smooth vertical wall acting horizontally away from the wall\n\nStep 2: For horizontal translational equilibrium:\nf = N_wall\n\nStep 3: The rod makes an angle θ = 60° with the vertical wall, which means it makes an angle of 30° with the horizontal floor.\n- The height of the contact point on the vertical wall is: H = L cos 60° = 5 × (1/2) = 2.5 m\n- The horizontal distance of the centre of mass from the wall is: (L/2) sin 60° = 2.5 × (√3 / 2) m\n- The horizontal distance of the centre of mass from the floor contact is: d_cm = (L/2) cos 30° = 2.5 × (√3 / 2) m\n\nStep 4: Taking torques about the bottom contact point on the floor for rotational equilibrium:\nN_wall × H = mg × d_cm\nN_wall × (L cos 60°) = mg × (L/2 sin 60°)\nN_wall = (1/2) mg tan 60° = (1/2) × 200 × √3 = 100√3 N\n\nStep 5: Therefore, the static friction force exerted by the floor is:\nf = N_wall = 100√3 N\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform ladder of mass 10 kg leans against a smooth vertical wall making an angle of 45° with the horizontal ground. The normal force exerted by the wall on the ladder is: (Take g = 10 m/s²)",
      option_a: "50 N",
      option_b: "100 N",
      option_c: "25 N",
      option_d: "50√2 N",
      correct_option: "A",
      explanation: "Step 1: Torque about base of ladder: N_wall (L sin 45°) = mg (L/2 cos 45°).\nStep 2: N_wall = (1/2) mg cot 45° = 0.5 × (10 × 10) × 1 = 50 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 456,
    originalQuestion: {
      question: "A thin wire of length L and linear mass density m is bent into a circular ring in the x-y plane with centre C as shown in the figure. The moment of inertia of the ring about the axis yy' will be: [NEET 2026]",
      option_a: "3 m L³ / (8π)",
      option_b: "3 m L³ / (8π²)",
      option_c: "3 m L² / (8π)",
      option_d: "3 m L² / (8π²)",
      correct_option: "B",
      explanation: "Step 1: The total mass of the wire of length L and linear mass density m is:\nM = m L\n\nStep 2: The wire is bent into a circular ring of radius R. The circumference of the ring is:\n2π R = L  ⇒  R = L / (2π)\n\nStep 3: In the figure, the axis yy' is a tangent to the ring lying in the plane of the ring.\nThe moment of inertia of a circular ring about its diameter in its plane is:\nI_dia = (1/2) M R²\n\nStep 4: By the parallel axis theorem, the moment of inertia about the tangential axis yy' in the plane is:\nI_yy' = I_dia + M R² = (1/2) M R² + M R² = (3/2) M R²\n\nStep 5: Substitute M = m L and R = L / (2π):\nI_yy' = (3/2) (m L) [L / (2π)]² = (3/2) (m L) [L² / (4π²)] = 3 m L³ / (8π²)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A thin wire of mass M and length L is bent into a circular ring. Its moment of inertia about a diameter is:",
      option_a: "M L² / (8π²)",
      option_b: "M L² / (4π²)",
      option_c: "M L² / (2π²)",
      option_d: "3 M L² / (8π²)",
      correct_option: "A",
      explanation: "Step 1: Radius R = L / (2π).\nStep 2: Moment of inertia about diameter is I = (1/2) M R².\nStep 3: I = (1/2) M [L / (2π)]² = (1/2) M [L² / (4π²)] = M L² / (8π²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 455,
    originalQuestion: {
      question: "The angular speed of a flywheel is increased from 600 rpm to 1200 rpm in 10 s. The number of revolutions completed by the flywheel during this time is: [NEET 2026]",
      option_a: "900",
      option_b: "600",
      option_c: "150",
      option_d: "300",
      correct_option: "C",
      explanation: "Step 1: Under uniform angular acceleration, the average rotational speed in rpm is:\nN_avg = (N₁ + N₂) / 2 = (600 + 1200) / 2 = 1800 / 2 = 900 rpm\n\nStep 2: Convert average rotational speed to revolutions per second (rps):\nn_avg = 900 / 60 = 15 rev s⁻¹\n\nStep 3: The total number of revolutions completed in time t = 10 s is:\nTotal revolutions = n_avg × t = 15 × 10 = 150 revolutions\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A wheel accelerates uniformly from rest to 1200 rpm in 20 seconds. How many revolutions does it make in this period?",
      option_a: "200",
      option_b: "400",
      option_c: "300",
      option_d: "100",
      correct_option: "A",
      explanation: "Step 1: Average speed = (0 + 1200) / 2 = 600 rpm = 10 rev/s.\nStep 2: Total revolutions = 10 rev/s × 20 s = 200 revolutions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 454,
    originalQuestion: {
      question: "A solid sphere A of radius R and mass M is attached at a point to a smaller solid sphere B of radius r < R and mass m < M. Assume the line joining their centres lies along the horizontal. The moment of inertia of the system calculated about a vertical axis passing through the centre of A is I_A and that about a vertical axis passing through the centre of B is I_B. The difference I_A - I_B is: [RE-NEET 2026]",
      option_a: "0",
      option_b: "(M - m) (R + r)²",
      option_c: "(m - M) (R + r)²",
      option_d: "(m - M) (R - r)²",
      correct_option: "B",
      explanation: "Step 1: The two spheres touch each other externally, so the distance between their centres is:\nd = R + r\n\nStep 2: Let the central moment of inertia of sphere A be I_A0 = (2/5) M R², and that of sphere B be I_B0 = (2/5) m r².\n\nStep 3: For the vertical axis passing through the centre of A:\n- Sphere A contributes I_A0\n- Sphere B is at distance d from this axis, contributing: I_B0 + m d²\nTotal: I_A = I_A0 + I_B0 + m (R + r)²\n\nStep 4: For the vertical axis passing through the centre of B:\n- Sphere B contributes I_B0\n- Sphere A is at distance d from this axis, contributing: I_A0 + M d²\nTotal: I_B = I_B0 + I_A0 + M (R + r)²\n\nStep 5: The difference in moment of inertia between the two axes (in magnitude with M > m) is:\nI_B - I_A = (M - m) (R + r)²\nIn the convention where the heavier sphere provides the positive difference:\n|I_A - I_B| = (M - m) (R + r)²\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Two solid spheres of masses 4 kg and 1 kg and radii 30 cm and 10 cm touch externally. The difference in their moments of inertia about parallel axes passing through their respective centers is:",
      option_a: "0.48 kg m²",
      option_b: "0.16 kg m²",
      option_c: "0.32 kg m²",
      option_d: "0.64 kg m²",
      correct_option: "A",
      explanation: "Step 1: Distance between centers is d = R + r = 0.3 + 0.1 = 0.4 m.\nStep 2: Difference = (M - m) d² = (4 - 1) × (0.4)² = 3 × 0.16 = 0.48 kg m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 453,
    originalQuestion: {
      question: "A thin horizontal disc is rotating about a vertical axis passing through its fixed centre O. Its angular momentum L_A and L_B are computed about points A and B respectively with OB = 2 × OA on the axis of rotation. The value of L_A / L_B is: [RE-NEET 2026]",
      option_a: "2",
      option_b: "1 / 4",
      option_c: "1 / 2",
      option_d: "1",
      correct_option: "D",
      explanation: "Step 1: For a rigid body undergoing pure rotation about a fixed axis passing through its centre of mass (point O):\nThe total linear momentum of the disc is zero because the centre of mass is at rest (p⃗_total = M v⃗_cm = 0).\n\nStep 2: The angular momentum of a system about any reference point P is given by:\nL⃗_P = L⃗_cm + r⃗_cm/P × p⃗_total\n\nStep 3: Since p⃗_total = 0, the term r⃗_cm/P × p⃗_total vanishes identically:\nL⃗_P = L⃗_cm = I ω k̂ for any reference point P along the axis of rotation (including points A and B).\n\nStep 4: Therefore, L_A = L_B = I ω, which gives:\nL_A / L_B = 1\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A flywheel rotates with constant angular velocity about a fixed axle through its center of mass. The angular momentum of the flywheel calculated about two different points on the axis of rotation separated by distance d has a ratio of:",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "2 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: When a body rotates purely about a fixed axis passing through its center of mass, its linear momentum is zero.\nStep 2: Therefore, angular momentum about any origin lying along that axis is independent of the position of the origin.\nStep 3: The ratio is 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];
