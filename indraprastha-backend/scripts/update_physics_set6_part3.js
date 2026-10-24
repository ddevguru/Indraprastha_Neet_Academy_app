const fs = require('fs');

const set6Part3Updates = [
  {
    id: 2847, // Q101
    similar_question: {
      question: "A mass m₁ = 4 kg hangs vertically and is connected via a light string over a frictionless pulley to a mass m₂ = 8 kg resting on a rough horizontal table with coefficient of static friction μₛ = 0.25. What minimum additional mass M must be placed on top of m₂ so that the system remains at rest? (Take g = 10 m/s²)",
      option_a: "8 kg",
      option_b: "12 kg",
      option_c: "4 kg",
      option_d: "16 kg",
      correct_option: "A",
      explanation: "Step 1: For the system to be at rest, the maximum static friction must balance the downward gravitational pull of the hanging mass: f_max ≥ m₁ g.\nStep 2: Here f_max = μₛ N = μₛ (m₂ + M) g. Setting μₛ (m₂ + M) g = m₁ g gives:\n0.25 × (8 + M) = 4  →  8 + M = 16  →  M = 8 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2848, // Q102
    similar_question: {
      question: "An elevator accelerates vertically upward with an acceleration a = g. Inside the elevator, an incline is fixed at an angle θ with the horizontal. What is the minimum coefficient of static friction μₛ between a block of mass m and the incline so that the block does not slide down?",
      option_a: "tan θ",
      option_b: "2 tan θ",
      option_c: "0.5 tan θ",
      option_d: "cot θ",
      correct_option: "A",
      explanation: "Step 1: The effective gravitational acceleration inside the upward accelerating frame is g_eff = g + a = 2g.\nStep 2: Downhill component of effective gravity is m g_eff sin θ and normal force is N = m g_eff cos θ.\nStep 3: To prevent slipping: μₛ N ≥ m g_eff sin θ  →  μₛ (m g_eff cos θ) ≥ m g_eff sin θ  →  μₛ ≥ tan θ. (Effective gravity cancels out).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2849, // Q103
    similar_question: {
      question: "A block A of mass 2 kg rests on a block B of mass 3 kg, which lies on a smooth horizontal floor. The coefficient of static friction between blocks A and B is μₛ = 0.4. What is the maximum horizontal force F that can be applied to block B so that both blocks accelerate together without slipping? (Take g = 10 m/s²)",
      option_a: "20 N",
      option_b: "8 N",
      option_c: "12 N",
      option_d: "15 N",
      correct_option: "A",
      explanation: "Step 1: Block A is accelerated exclusively by static friction between A and B.\nMaximum friction on block A: f_max = μₛ m_A g = 0.4 × 2 × 10 = 8 N.\nStep 2: Maximum common acceleration without slipping: a_max = f_max / m_A = 8 / 2 = 4 m/s².\nStep 3: Maximum force on combined system: F_max = (m_A + m_B) a_max = (2 + 3) × 4 = 20 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2850, // Q104
    similar_question: {
      question: "A block of mass m rests on a rough horizontal surface with coefficient of static and kinetic friction μ. A horizontal force F = c t (where c is a positive constant and t is time) is applied to the block starting at t = 0. Which of the following best describes the acceleration-time (a-t) behavior of the block?",
      option_a: "Acceleration remains zero until t = μmg / c, after which it increases linearly with time",
      option_b: "Acceleration starts from a non-zero value and increases quadratically with time",
      option_c: "Acceleration increases linearly starting immediately from t = 0",
      option_d: "Acceleration remains constant throughout",
      correct_option: "A",
      explanation: "Step 1: The block remains stationary as long as F ≤ f_s(max) = μ m g. Hence, for t ≤ μ m g / c, acceleration a = 0.\nStep 2: For t > μ m g / c, the block accelerates with net force F_net = c t − μ m g.\nAcceleration a = (c / m) t − μ g, which is a straight line with positive slope starting at t₀ = μ m g / c.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2851, // Q105
    similar_question: {
      question: "A block slides down a 45° inclined plane starting from rest. The coefficient of friction between the block and the plane increases with distance x down the incline as μ(x) = 0.2 x. At what distance x will the speed of the block be maximum? (Take tan 45° = 1)",
      option_a: "5 m",
      option_b: "2.5 m",
      option_c: "10 m",
      option_d: "1 m",
      correct_option: "A",
      explanation: "Step 1: Speed is maximum when net acceleration down the incline is zero (driving force = friction force).\nStep 2: Driving force = m g sin 45°; Friction force = μ(x) m g cos 45° = 0.2 x m g cos 45°.\nStep 3: Equating the two: m g sin 45° = 0.2 x m g cos 45°  →  0.2 x = 1  →  x = 5 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2852, // Q106
    similar_question: {
      question: "A crate of mass 25 kg rests on the flat bed of a truck. The coefficient of static friction between the crate and the truck bed is μₛ = 0.35. What is the maximum horizontal acceleration the truck can have without the crate slipping backward? (Take g = 10 m/s²)",
      option_a: "3.5 m/s²",
      option_b: "5.0 m/s²",
      option_c: "2.5 m/s²",
      option_d: "7.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: In the non-inertial frame of the truck, the crate experiences a backward pseudo force F_pseudo = m a.\nStep 2: Maximum available static friction: f_max = μₛ m g.\nStep 3: To prevent slipping: m a ≤ μₛ m g  →  a_max = μₛ g = 0.35 × 10 = 3.5 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2853, // Q107
    similar_question: {
      question: "A block of mass 4 kg is placed on an incline of angle 30° with the horizontal. If the coefficient of static friction is μₛ = 0.8, what is the magnitude of the frictional force acting on the block? (Take g = 10 m/s², sin 30° = 0.5, cos 30° = 0.866)",
      option_a: "20 N",
      option_b: "27.7 N",
      option_c: "34.6 N",
      option_d: "40 N",
      correct_option: "A",
      explanation: "Step 1: Driving gravitational force down the incline: F_pull = m g sin 30° = 4 × 10 × 0.5 = 20 N.\nStep 2: Maximum available static friction: f_max = μₛ m g cos 30° = 0.8 × 4 × 10 × 0.866 ≈ 27.7 N.\nStep 3: Since F_pull (20 N) < f_max (27.7 N), the block does not slide and static friction self-adjusts to exactly balance F_pull: f_s = 20 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2854, // Q108
    similar_question: {
      question: "A trolley of mass M = 18 kg on a horizontal table is connected by a light string over a frictionless pulley to a hanging block of mass m = 2 kg. The coefficient of kinetic friction between the trolley and table is μₖ = 0.05. What is the acceleration of the system? (Take g = 10 m/s²)",
      option_a: "0.55 m/s²",
      option_b: "0.95 m/s²",
      option_c: "1.25 m/s²",
      option_d: "0.45 m/s²",
      correct_option: "A",
      explanation: "Step 1: Pulling force = m g = 2 × 10 = 20 N.\nStep 2: Opposing kinetic friction on trolley: f_k = μₖ M g = 0.05 × 18 × 10 = 9 N.\nStep 3: Net accelerating force = 20 − 9 = 11 N.\nTotal mass = 18 + 2 = 20 kg. Acceleration a = 11 / 20 = 0.55 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2855, // Q109
    similar_question: {
      question: "Which of the following statements regarding friction is INCORRECT?",
      option_a: "The coefficient of kinetic friction has dimensions of [M L T⁻²]",
      option_b: "Friction always opposes the relative motion between two contact surfaces",
      option_c: "The limiting value of static friction is directly proportional to the normal reaction",
      option_d: "Rolling friction is significantly smaller than sliding friction for the same normal force",
      correct_option: "A",
      explanation: "Step 1: Friction force is given by f = μ N.\nStep 2: Since both friction force f and normal reaction N have the dimensions of force [M L T⁻²], the coefficient of friction μ = f / N is dimensionless [M⁰ L⁰ T⁰].\nStep 3: Therefore, the statement claiming it has dimensions is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2856, // Q110
    similar_question: {
      question: "A block A of mass m₁ on a horizontal table with coefficient of kinetic friction μₖ is connected by a light inextensible cord passing over a smooth pulley to a hanging block B of mass m₂. What is the tension T in the cord when the system accelerates?",
      option_a: "m₁ m₂ g (1 + μₖ) / (m₁ + m₂)",
      option_b: "m₁ m₂ g (1 − μₖ) / (m₁ + m₂)",
      option_c: "(m₁ + μₖ m₂) g / (m₁ + m₂)",
      option_d: "m₂ g (1 + μₖ)",
      correct_option: "A",
      explanation: "Step 1: Equations of motion: m₂ g − T = m₂ a and T − μₖ m₁ g = m₁ a.\nStep 2: Solving for acceleration: a = (m₂ − μₖ m₁) g / (m₁ + m₂).\nStep 3: Substitute a into T = μₖ m₁ g + m₁ a: T = [μₖ m₁ (m₁ + m₂) g + m₁ (m₂ − μₖ m₁) g] / (m₁ + m₂) = m₁ m₂ g (1 + μₖ) / (m₁ + m₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2857, // Q111
    similar_question: {
      question: "A box on an incline begins to slip when the inclination reaches 37°. Once slipping starts, it slides 6.0 m down the incline in 2.0 s from rest. What are the coefficients of static friction μₛ and kinetic friction μₖ? (Take g = 10 m/s², sin 37° = 0.6, cos 37° = 0.8)",
      option_a: "μₛ = 0.75, μₖ = 0.375",
      option_b: "μₛ = 0.60, μₖ = 0.45",
      option_c: "μₛ = 0.75, μₖ = 0.50",
      option_d: "μₛ = 0.80, μₖ = 0.25",
      correct_option: "A",
      explanation: "Step 1: Static coefficient equals tangent of angle of repose: μₛ = tan 37° = 0.6 / 0.8 = 0.75.\nStep 2: From s = (1/2) a t²: 6.0 = (1/2) a (2.0)²  →  a = 3.0 m/s².\nStep 3: Acceleration down incline: a = g (sin 37° − μₖ cos 37°)  →  3.0 = 10 (0.6 − 0.8 μₖ)  →  0.8 μₖ = 0.3  →  μₖ = 0.375.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2858, // Q112
    similar_question: {
      question: "A block on an adjustable incline starts sliding when the inclination is 45°. It is observed to slide a distance of 8.0 m down the incline in 2.0 s. What are the values of μₛ and μₖ? (Take g = 10 m/s², sin 45° = cos 45° = 1/√2 ≈ 0.707)",
      option_a: "μₛ = 1.00, μₖ = 0.434",
      option_b: "μₛ = 0.75, μₖ = 0.500",
      option_c: "μₛ = 1.00, μₖ = 0.600",
      option_d: "μₛ = 0.85, μₖ = 0.350",
      correct_option: "A",
      explanation: "Step 1: Angle of repose is 45°, so μₛ = tan 45° = 1.00.\nStep 2: Using s = (1/2) a t²: 8.0 = (1/2) a (2.0)²  →  a = 4.0 m/s².\nStep 3: a = g sin 45° (1 − μₖ)  →  4.0 = 10 × 0.707 (1 − μₖ)  →  1 − μₖ = 0.566  →  μₖ ≈ 0.434.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2859, // Q113
    similar_question: {
      question: "An inclined plane of angle θ has its upper two-thirds completely smooth and its lower one-third rough. A block released from rest at the top of the incline comes to rest precisely at the bottom. What is the coefficient of friction μ of the lower rough part?",
      option_a: "3 tan θ",
      option_b: "2 tan θ",
      option_c: "1.5 tan θ",
      option_d: "tan θ / 3",
      correct_option: "A",
      explanation: "Step 1: By work-energy theorem, net work W_net = ΔK = 0.\nStep 2: Work done by gravity over full length L: W_g = m g L sin θ.\nWork done by friction over rough length L/3: W_f = − μ m g cos θ (L / 3).\nStep 3: Setting W_g + W_f = 0: m g L sin θ = μ m g cos θ (L / 3)  →  μ = 3 tan θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2860, // Q114
    similar_question: {
      question: "A conveyor belt travels horizontally at a constant speed of 4 m/s. A small package is gently placed onto the belt with zero initial velocity. The coefficient of kinetic friction between the package and the belt is μₖ = 0.4. What distance does the package slip relative to the belt before stopping relative to the belt? (Take g = 10 m/s²)",
      option_a: "2.0 m",
      option_b: "4.0 m",
      option_c: "1.0 m",
      option_d: "0.5 m",
      correct_option: "A",
      explanation: "Step 1: Acceleration of package: a = μₖ g = 0.4 × 10 = 4 m/s².\nStep 2: Time to reach belt speed: t = v / a = 4 / 4 = 1.0 s.\nStep 3: Distance moved by belt = v t = 4 × 1 = 4 m. Distance moved by package = (1/2) a t² = (1/2) × 4 × (1)² = 2 m.\nRelative slipping distance = 4 − 2 = 2.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2861, // Q115
    similar_question: {
      question: "A flat turntable rotates in a horizontal plane with angular velocity ω. A coin of mass m is placed at a distance r from the central axis. The coefficient of static friction is μ. For the coin not to slip off the turntable, which condition must be satisfied?",
      option_a: "r ≤ μ g / ω²",
      option_b: "r ≥ μ g / ω²",
      option_c: "r ≤ μ ω² / g",
      option_d: "r ≥ g / (μ ω²)",
      correct_option: "A",
      explanation: "Step 1: Centripetal force required to stay in circular motion is provided by static friction: F_c = m ω² r.\nStep 2: The maximum static friction available is f_max = μ m g.\nStep 3: For no slipping: m ω² r ≤ μ m g  →  r ≤ μ g / ω².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2862, // Q116
    similar_question: {
      question: "A block of mass m is pressed against the vertical front face of an accelerating cart. If the coefficient of static friction between the block and the front face is μₛ, what is the minimum forward acceleration 'a' of the cart so that the block does not slide down under gravity?",
      option_a: "a ≥ g / μₛ",
      option_b: "a ≤ g / μₛ",
      option_c: "a ≥ μₛ g",
      option_d: "a ≥ g / (2 μₛ)",
      correct_option: "A",
      explanation: "Step 1: In the accelerating frame of the cart, the normal reaction is N = m a.\nStep 2: Maximum upward static friction is f_max = μₛ N = μₛ m a.\nStep 3: To prevent downward sliding under gravity: f_max ≥ m g  →  μₛ m a ≥ m g  →  a ≥ g / μₛ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2863, // Q117
    similar_question: {
      question: "A puck is given an initial horizontal velocity v₀ along a rough surface where the coefficient of kinetic friction is μ. How much time elapses before the puck comes to a complete stop?",
      option_a: "v₀ / (μ g)",
      option_b: "μ g / v₀",
      option_c: "v₀² / (2 μ g)",
      option_d: "2 v₀ / (μ g)",
      correct_option: "A",
      explanation: "Step 1: The frictional deceleration on a horizontal surface is a = f_k / m = μ g.\nStep 2: Using the first equation of motion: v = v₀ − a t.\nStep 3: At rest, v = 0: 0 = v₀ − (μ g) t  →  t = v₀ / (μ g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2864, // Q118
    similar_question: {
      question: "A block A of mass 5 kg rests on a rough horizontal surface with coefficient of static friction μₛ = 0.3. It is connected by a light string over a frictionless pulley to a hanging block B of mass m_B. What is the maximum value of m_B for which the blocks remain stationary? (Take g = 10 m/s²)",
      option_a: "1.5 kg",
      option_b: "2.5 kg",
      option_c: "0.6 kg",
      option_d: "3.0 kg",
      correct_option: "A",
      explanation: "Step 1: Maximum static friction holding block A: f_max = μₛ m_A g = 0.3 × 5 × 10 = 15 N.\nStep 2: Tension at equilibrium equals hanging weight: T = m_B g.\nStep 3: For equilibrium without sliding: T ≤ f_max  →  m_B × 10 ≤ 15  →  m_B ≤ 1.5 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2865, // Q119
    similar_question: {
      question: "A block of mass 8 kg rests on a rough horizontal floor with coefficient of friction μ = 0.25. If a horizontal pulling force of 60 N is applied, what is the acceleration of the block? (Take g = 10 m/s²)",
      option_a: "5.0 m/s²",
      option_b: "7.5 m/s²",
      option_c: "2.5 m/s²",
      option_d: "4.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Normal reaction N = m g = 8 × 10 = 80 N.\nStep 2: Friction force f = μ N = 0.25 × 80 = 20 N.\nStep 3: Net force F_net = 60 − 20 = 40 N.\nAcceleration a = F_net / m = 40 / 8 = 5.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2866, // Q120
    similar_question: {
      question: "A block of mass 2 kg rests on the bed of a truck with coefficient of static friction μₛ = 0.5. If the truck accelerates horizontally at 3 m/s², what is the frictional force exerted by the truck bed on the block? (Take g = 10 m/s²)",
      option_a: "6 N",
      option_b: "10 N",
      option_c: "15 N",
      option_d: "3 N",
      correct_option: "A",
      explanation: "Step 1: Maximum available static friction: f_max = μₛ m g = 0.5 × 2 × 10 = 10 N.\nStep 2: Force needed to accelerate the block with the truck: F_req = m a = 2 × 3 = 6 N.\nStep 3: Since F_req (6 N) < f_max (10 N), no slipping occurs, and static friction self-adjusts to exactly 6 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2867, // Q121
    similar_question: {
      question: "A block of mass m = 4 kg rests on top of a slab of mass M = 6 kg, which lies on a frictionless horizontal floor. The coefficient of friction between the block and the slab is μ = 0.3. A horizontal force F = 30 N is applied to the upper block. What is the resulting acceleration of the slab? (Take g = 10 m/s²)",
      option_a: "2.0 m/s²",
      option_b: "1.2 m/s²",
      option_c: "3.0 m/s²",
      option_d: "0.5 m/s²",
      correct_option: "A",
      explanation: "Step 1: Maximum friction between block and slab: f_max = μ m g = 0.3 × 4 × 10 = 12 N.\nStep 2: The only horizontal force accelerating the slab is this friction force: f = 12 N.\nStep 3: Acceleration of slab a_slab = f / M = 12 N / 6 kg = 2.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2868, // Q122
    similar_question: {
      question: "An automobile travels at a speed of 90 km/h on a horizontal road. If the coefficient of static friction between the tires and the asphalt is μₛ = 0.5, what is the minimum stopping distance without skidding? (Take g = 10 m/s²)",
      option_a: "62.5 m",
      option_b: "50.0 m",
      option_c: "45.0 m",
      option_d: "75.0 m",
      correct_option: "A",
      explanation: "Step 1: Initial velocity v₀ = 90 × (5/18) = 25 m/s.\nStep 2: Maximum braking deceleration without skidding: a_max = μₛ g = 0.5 × 10 = 5 m/s².\nStep 3: From v² = v₀² − 2 a s: 0 = (25)² − 2(5)s  →  10 s = 625  →  s = 62.5 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2869, // Q123
    similar_question: {
      question: "A uniform heavy chain rests on a horizontal table. The coefficient of static friction between the chain and the tabletop is μ = 1/3. What is the maximum percentage of the chain's total length that can hang over the edge of the table without slipping?",
      option_a: "25%",
      option_b: "33.3%",
      option_c: "20%",
      option_d: "15%",
      correct_option: "A",
      explanation: "Step 1: Let total length be L and hanging length be y. Fraction on table is (L − y) / L and hanging fraction is y / L.\nStep 2: At threshold of slipping: (y / L) M g = μ [(L − y) / L] M g  →  y = μ (L − y)  →  y / L = μ / (1 + μ).\nStep 3: Substitute μ = 1/3: y / L = (1/3) / (4/3) = 1/4 = 25%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2870, // Q124
    similar_question: {
      question: "A body starting from rest takes three times as much time to slide down a 45° rough inclined plane as it takes to slide down an identical smooth inclined plane. What is the coefficient of kinetic friction μ between the body and the incline?",
      option_a: "8/9",
      option_b: "3/4",
      option_c: "1/3",
      option_d: "2/3",
      correct_option: "A",
      explanation: "Step 1: From s = (1/2) a t², acceleration is inversely proportional to t²: a_rough / a_smooth = (t_smooth / t_rough)² = (1/3)² = 1/9.\nStep 2: For 45° incline: a_smooth = g sin 45° and a_rough = g (sin 45° − μ cos 45°) = g sin 45° (1 − μ).\nStep 3: 1 − μ = 1/9  →  μ = 8/9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2871, // Q125
    similar_question: {
      question: "A hot-air balloon of total mass M descends vertically with a constant downward acceleration a (where a < g). What mass Δm should be dumped from the balloon so that it ascends with the same acceleration a, assuming upward buoyant force remains constant?",
      option_a: "2 M a / (g + a)",
      option_b: "M a / (g + a)",
      option_c: "2 M a / (g − a)",
      option_d: "M a / (g − a)",
      correct_option: "A",
      explanation: "Step 1: While descending: M g − B = M a  →  B = M (g − a).\nStep 2: While ascending with mass (M − Δm): B − (M − Δm) g = (M − Δm) a  →  B = (M − Δm)(g + a).\nStep 3: Equating B: M (g − a) = (M − Δm)(g + a)  →  Δm (g + a) = 2 M a  →  Δm = 2 M a / (g + a).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2872, // Q126
    similar_question: {
      question: "A fighter jet performs a horizontal circular turn at a constant speed of 720 km/h with its wings banked at an angle of 45° to the horizontal. What is the radius of the turn? (Take g = 10 m/s², tan 45° = 1)",
      option_a: "4.0 × 10³ m",
      option_b: "2.0 × 10³ m",
      option_c: "5.5 × 10³ m",
      option_d: "8.0 × 10³ m",
      correct_option: "A",
      explanation: "Step 1: Convert speed: v = 720 × (5/18) = 200 m/s.\nStep 2: Banking condition in horizontal circle: tan θ = v² / (r g).\nStep 3: Substitute θ = 45°, v = 200 m/s, g = 10 m/s²: 1 = (200)² / (10 r)  →  10 r = 40000  →  r = 4000 m = 4.0 × 10³ m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2873, // Q127
    similar_question: {
      question: "A small insect crawls up a hemispherical bowl of radius R. The coefficient of static friction between the insect's legs and the bowl is μ = 0.5. If α is the angle that the radius vector to the insect makes with the vertical, what is the maximum value of α before the insect slips?",
      option_a: "tan α = 0.5",
      option_b: "cot α = 0.5",
      option_c: "sin α = 0.5",
      option_d: "cos α = 0.5",
      correct_option: "A",
      explanation: "Step 1: At angle α from the vertical, the local tangent makes an angle α with the horizontal.\nStep 2: Downhill component of weight is m g sin α, and normal reaction is N = m g cos α.\nStep 3: At the verge of slipping: m g sin α = μ N = μ m g cos α  →  tan α = μ = 0.5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2874, // Q128
    similar_question: {
      question: "A smooth hemispherical bowl of radius R rotates about its vertical axis of symmetry with a constant angular speed ω. A small marble rests on the inner surface at an angle θ with the vertical. What is the value of ω required for the marble to remain at this position?",
      option_a: "√( g / (R cos θ) )",
      option_b: "√( g / (R sin θ) )",
      option_c: "√( 2g / (R cos θ) )",
      option_d: "√( g cos θ / R )",
      correct_option: "A",
      explanation: "Step 1: Normal reaction resolves as N cos θ = m g vertically, and N sin θ = m ω² r horizontally.\nStep 2: Radius of horizontal circle is r = R sin θ, so N sin θ = m ω² (R sin θ)  →  N = m ω² R.\nStep 3: Substitute N into vertical equation: (m ω² R) cos θ = m g  →  ω = √( g / (R cos θ) ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2875, // Q129
    similar_question: {
      question: "Two identical small beads of mass m each are attached along a light string at distances L and 2L from a fixed pivot on a smooth horizontal table. The system rotates about the pivot with angular velocity ω. What is the ratio of tension in the inner section (0 to L) to the tension in the outer section (L to 2L)?",
      option_a: "3 : 2",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "5 : 3",
      correct_option: "A",
      explanation: "Step 1: Outer section tension T₂ accelerates only outer bead: T₂ = m ω² (2L) = 2 m ω² L.\nStep 2: Inner section tension T₁ accelerates both beads: T₁ − T₂ = m ω² L  →  T₁ = 2 m ω² L + m ω² L = 3 m ω² L.\nStep 3: Ratio T₁ : T₂ = 3 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2876, // Q130
    similar_question: {
      question: "A simple pendulum consisting of a bob of mass m suspended by a string of length L oscillates in a vertical plane. When the string makes an angle θ with the vertical and the speed of the bob is v, what is the net centripetal force directed toward the suspension point?",
      option_a: "T − m g cos θ = m v² / L",
      option_b: "T + m g cos θ",
      option_c: "m g sin θ",
      option_d: "T − m g sin θ",
      correct_option: "A",
      explanation: "Step 1: Along the radial direction towards the center of circular motion, string tension T acts inward and component of gravity m g cos θ acts outward.\nStep 2: The net inward radial force is F_net = T − m g cos θ.\nStep 3: This net force provides the centripetal acceleration: F_c = m v² / L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2877, // Q131
    similar_question: {
      question: "A horizontal turntable of radius R has a light vertical rod fixed at its rim. A simple pendulum of length L is attached to the top of the rod. When the turntable rotates with angular speed ω, the pendulum string deflects outwards at an angle θ with the vertical. What is the equation relating ω and θ?",
      option_a: "tan θ = ω² (R + L sin θ) / g",
      option_b: "tan θ = ω² R / g",
      option_c: "sin θ = ω² (R + L cos θ) / g",
      option_d: "cos θ = g / (ω² R)",
      correct_option: "A",
      explanation: "Step 1: The radius of horizontal circular motion for the pendulum bob is r = R + L sin θ.\nStep 2: String tension resolves vertically as T cos θ = m g and horizontally as T sin θ = m ω² r.\nStep 3: Dividing the horizontal by the vertical equation gives: tan θ = ω² r / g = ω² (R + L sin θ) / g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2878, // Q132
    similar_question: {
      question: "A particle of mass m is suspended by a string of length L forming a conical pendulum. The particle moves in a horizontal circle of radius r = L / 2. What is the orbital speed of the particle? (Take g as acceleration due to gravity)",
      option_a: "√( g L / (2√3) )",
      option_b: "√( g L / 2 )",
      option_c: "√( 3 g L / 2 )",
      option_d: "√( g L / 4 )",
      correct_option: "A",
      explanation: "Step 1: Here sin θ = r / L = (L / 2) / L = 1/2, so θ = 30°.\nStep 2: For a conical pendulum: tan θ = v² / (r g)  →  v = √( r g tan θ ).\nStep 3: Substitute r = L / 2 and tan 30° = 1/√3: v = √( (L / 2) × g × (1/√3) ) = √( g L / (2√3) ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2879, // Q133
    similar_question: {
      question: "A small slider of mass 100 g moves with constant speed in a horizontal circular groove of radius 50 cm. If the slider completes one full revolution every 2.0 s, what is the horizontal normal force exerted by the groove wall on the slider? (Take π² ≈ 10)",
      option_a: "0.5 N",
      option_b: "1.0 N",
      option_c: "0.25 N",
      option_d: "2.0 N",
      correct_option: "A",
      explanation: "Step 1: Mass m = 0.1 kg, radius r = 0.5 m, period T = 2.0 s.\nAngular velocity ω = 2π / T = π rad/s.\nStep 2: Centripetal force exerted by groove wall: N = m ω² r.\nStep 3: N = 0.1 × (π)² × 0.5 = 0.1 × 10 × 0.5 = 0.5 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2880, // Q134
    similar_question: {
      question: "A flat phonograph disc rotates at a frequency of 2 revolutions per second. A small coin placed at a distance of 5 cm from the axis of rotation just begins to slip. What is the coefficient of static friction between the coin and the disc? (Take g = 10 m/s² and π² ≈ 10)",
      option_a: "0.8",
      option_b: "0.4",
      option_c: "0.6",
      option_d: "0.2",
      correct_option: "A",
      explanation: "Step 1: Angular velocity ω = 2π f = 2π (2) = 4π rad/s. Radius r = 0.05 m.\nStep 2: Centripetal acceleration a_c = ω² r = (4π)² × 0.05 = 16 π² × 0.05 = 16 × 10 × 0.05 = 8 m/s².\nStep 3: At the verge of slipping: μₛ g = a_c  →  μₛ × 10 = 8  →  μₛ = 0.8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2881, // Q135
    similar_question: {
      question: "A body of mass m is tied to one end of a spring of natural length L₀ and whirled in a horizontal circle at angular speed ω. The elongation in the spring is 1 cm. If the angular speed is doubled to 2ω, the elongation becomes 5 cm. What is the original length L₀ of the spring?",
      option_a: "15 cm",
      option_b: "12 cm",
      option_c: "16 cm",
      option_d: "10 cm",
      correct_option: "A",
      explanation: "Step 1: Spring restoring force provides centripetal force: k x = m ω² (L₀ + x).\nStep 2: Case 1: k (1) = m ω² (L₀ + 1). Case 2: k (5) = m (2ω)² (L₀ + 5) = 4 m ω² (L₀ + 5).\nStep 3: Dividing Case 2 by Case 1: 5 / 1 = 4 (L₀ + 5) / (L₀ + 1)  →  5 (L₀ + 1) = 4 (L₀ + 5)  →  5 L₀ + 5 = 4 L₀ + 20  →  L₀ = 15 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6248, // Q136
    similar_question: {
      question: "A particle starts from rest at x = 0 and moves along the x-axis. Its acceleration varies with position x as a triangular graph starting at a = 0 at x = 0, peaking at a = 4 m/s² at x = 3 m, and returning to a = 0 at x = 6 m. What is the maximum speed attained by the particle?",
      option_a: "√(24) m/s ≈ 4.9 m/s",
      option_b: "6.0 m/s",
      option_c: "3.5 m/s",
      option_d: "12.0 m/s",
      correct_option: "A",
      explanation: "Step 1: From calculus, v dv = a dx  →  (v_max² − 0) / 2 = Area under the a-x curve.\nStep 2: Area of triangle = (1/2) × base × height = (1/2) × 6 m × 4 m/s² = 12 m²/s².\nStep 3: v_max² / 2 = 12  →  v_max² = 24  →  v_max = √24 ≈ 4.9 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6249, // Q137
    similar_question: {
      question: "Three concurrent forces F₁, F₂, and F₃ acting on a body keep it in translational equilibrium. Which of the following conditions must ALWAYS be satisfied?",
      option_a: "F₁ + F₂ + F₃ = 0 (vector sum is zero)",
      option_b: "|F₁| + |F₂| = |F₃|",
      option_c: "All three forces must have equal magnitudes",
      option_d: "The angle between any two forces must be 90°",
      correct_option: "A",
      explanation: "Step 1: For translational equilibrium of any body, the net external force acting on it must be zero: Σ F = 0.\nStep 2: For three concurrent forces, their vector sum must identically vanish: F₁ + F₂ + F₃ = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6250, // Q138
    similar_question: {
      question: "A mass of 2 kg is suspended by a light cord. Find the ratio of the tension when the mass is lifted upward with an acceleration of g/2 to the tension when it is lowered downward with the same acceleration g/2.",
      option_a: "3 : 1",
      option_b: "2 : 1",
      option_c: "1 : 3",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: When accelerating upward: T_up = m (g + a) = m (g + g/2) = 1.5 m g.\nStep 2: When accelerating downward: T_down = m (g − a) = m (g − g/2) = 0.5 m g.\nStep 3: Ratio T_up / T_down = (1.5 m g) / (0.5 m g) = 3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6251, // Q139
    similar_question: {
      question: "A uniform rod of mass M and length L lies on a frictionless horizontal plane. Forces F and 3F are applied simultaneously at opposite ends pulling along its length in opposite directions (3F > F). What is the tension in the rod at a cross-section located at distance L/3 from the end where force 3F is applied?",
      option_a: "7F / 3",
      option_b: "5F / 3",
      option_c: "2F",
      option_d: "8F / 3",
      correct_option: "A",
      explanation: "Step 1: Net force on rod = 3F − F = 2F. Acceleration a = 2F / M.\nStep 2: Mass of the segment of length L/3 is m₁ = M / 3.\nStep 3: Equation of motion for this end segment: 3F − T = m₁ a = (M / 3)(2F / M) = 2F / 3  →  T = 3F − 2F/3 = 7F / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6252, // Q140
    similar_question: {
      question: "In an equilibrium knot connecting two weights W₁ and W₂, the cord supporting W₁ makes an angle of 45° with the horizontal while the cord supporting W₂ makes an angle of 45° with the horizontal. If W₁ = 250 N, what is the weight W₂?",
      option_a: "250 N",
      option_b: "500 N",
      option_c: "125 N",
      option_d: "350 N",
      correct_option: "A",
      explanation: "Step 1: By horizontal equilibrium of the junction: T₁ cos 45° = T₂ cos 45°  →  T₁ = T₂.\nStep 2: Since both angles with the horizontal are equal (45°), the vertical components are also equal: T₁ sin 45° = T₂ sin 45°.\nStep 3: Therefore, the supported weights must be equal: W₂ = W₁ = 250 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6253, // Q141
    similar_question: {
      question: "A block of mass 10 kg hangs in equilibrium supported by two light strings attached to a horizontal ceiling. If each string makes an angle of 30° with the vertical, what is the tension in each string? (Take g = 10 m/s², cos 30° = √3/2)",
      option_a: "100 / √3 N ≈ 57.7 N",
      option_b: "50 N",
      option_c: "100 N",
      option_d: "200 / √3 N",
      correct_option: "A",
      explanation: "Step 1: Downward load = m g = 10 × 10 = 100 N.\nStep 2: Vertical equilibrium: 2 T cos 30° = 100 N.\nStep 3: T = 100 / (2 cos 30°) = 50 / (√3 / 2) = 100 / √3 ≈ 57.7 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6254, // Q142
    similar_question: {
      question: "A block of mass m is pushed against a rough vertical wall with a horizontal force F. If the coefficient of static friction is μ, what is the minimum force F required to prevent the block from slipping down?",
      option_a: "m g / μ",
      option_b: "μ m g",
      option_c: "m g / (2 μ)",
      option_d: "2 m g / μ",
      correct_option: "A",
      explanation: "Step 1: Normal reaction from wall N = F.\nStep 2: Static friction must balance gravity: f_s = m g.\nStep 3: For equilibrium, f_s ≤ μ N  →  m g ≤ μ F  →  F ≥ m g / μ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6255, // Q143
    similar_question: {
      question: "A painter of mass m stands on a platform of mass M suspended by a rope running over a fixed overhead pulley. The painter pulls the free end of the rope downward to lift himself and the platform at a steady speed. What tension T must he exert on the rope?",
      option_a: "(M + m) g / 2",
      option_b: "(M + m) g",
      option_c: "2 (M + m) g",
      option_d: "(M − m) g / 2",
      correct_option: "A",
      explanation: "Step 1: Consider the system consisting of the painter and platform of total mass (M + m).\nStep 2: Two upward tensions support this combined system (one from the platform connection, one held by the painter): total upward force = 2 T.\nStep 3: For constant velocity (zero acceleration): 2 T = (M + m) g  →  T = (M + m) g / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6256, // Q144
    similar_question: {
      question: "A picture frame of weight W is suspended symmetrically from a nail using a light wire of length L. As the length of the wire is shortened (so the angle θ between the two wire halves becomes wider), how does the tension T in the wire change?",
      option_a: "Tension increases as the angle widens",
      option_b: "Tension decreases as the angle widens",
      option_c: "Tension remains unchanged",
      option_d: "Tension first decreases then increases",
      correct_option: "A",
      explanation: "Step 1: Let each wire half make angle α with vertical. Vertical equilibrium gives 2 T cos α = W  →  T = W / (2 cos α).\nStep 2: As the wire is shortened, α increases towards 90°, so cos α decreases towards 0.\nStep 3: Therefore, T increases significantly as the wire is made shorter.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6257, // Q145
    similar_question: {
      question: "A lantern of weight 50 N is suspended at a junction supported by two perpendicular strings making angles of 37° and 53° with the vertical respectively. What are the tensions T₁ and T₂ in the two strings? (sin 37° = cos 53° = 0.6, cos 37° = sin 53° = 0.8)",
      option_a: "T₁ = 40 N, T₂ = 30 N",
      option_b: "T₁ = 30 N, T₂ = 40 N",
      option_c: "T₁ = 25 N, T₂ = 25 N",
      option_d: "T₁ = 50 N, T₂ = 50 N",
      correct_option: "A",
      explanation: "Step 1: Since 37° + 53° = 90°, the two strings are mutually perpendicular.\nStep 2: Resolving along string 1 gives: T₁ = W cos 37° = 50 × 0.8 = 40 N.\nStep 3: Resolving along string 2 gives: T₂ = W cos 53° = 50 × 0.6 = 30 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6258, // Q146
    similar_question: {
      question: "Three blocks of masses 1 kg, 2 kg, and 3 kg are connected in series by light strings on a frictionless horizontal plane. A horizontal force F = 18 N pulls the 3 kg block. What is the tension in the string connecting the 1 kg and 2 kg blocks?",
      option_a: "3 N",
      option_b: "6 N",
      option_c: "9 N",
      option_d: "12 N",
      correct_option: "A",
      explanation: "Step 1: Total mass = 1 + 2 + 3 = 6 kg.\nAcceleration a = F / M_total = 18 / 6 = 3 m/s².\nStep 2: The string connecting the 1 kg block pulls only that 1 kg block.\nStep 3: Tension T₁ = m₁ a = 1 kg × 3 m/s² = 3 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6259, // Q147
    similar_question: {
      question: "A person standing on a weighing scale suddenly squats down. What happens to the scale reading during this downward movement?",
      option_a: "First decreases below normal weight, then increases above normal weight before settling to normal weight",
      option_b: "First increases above normal weight, then decreases below normal weight",
      option_c: "Remains constant and equal to normal weight throughout",
      option_d: "Continuously increases throughout the motion",
      correct_option: "A",
      explanation: "Step 1: To initiate downward motion, the center of mass accelerates downward (a downward). Here m g − N = m a  →  N = m(g − a) < m g (scale reading decreases).\nStep 2: To decelerate to rest at the bottom of the squat, acceleration is directed upward (a upward). Here N − m g = m a  →  N = m(g + a) > m g (scale reading increases).\nStep 3: When stationary, a = 0 and N = m g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6260, // Q148
    similar_question: {
      question: "A chimpanzee of mass 40 kg climbs a vertical vine that has a breaking tension of 600 N. What is the maximum upward acceleration the chimpanzee can have without snapping the vine? (Take g = 10 m/s²)",
      option_a: "5.0 m/s²",
      option_b: "2.5 m/s²",
      option_c: "10.0 m/s²",
      option_d: "7.5 m/s²",
      correct_option: "A",
      explanation: "Step 1: When accelerating upward, tension is T = m (g + a).\nStep 2: Set T equal to the maximum breaking tension: 40 (10 + a) = 600.\nStep 3: 10 + a = 15  →  a = 5.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6261, // Q149
    similar_question: {
      question: "A worker of mass 70 kg stands on a horizontal floor and raises a 30 kg crate at a constant speed by pulling downward on a rope looped over a fixed ceiling pulley. What is the normal contact force exerted by the floor on the worker's feet? (Take g = 10 m/s²)",
      option_a: "400 N",
      option_b: "700 N",
      option_c: "1000 N",
      option_d: "300 N",
      correct_option: "A",
      explanation: "Step 1: Since the crate rises at constant speed, rope tension equals the crate's weight: T = 30 × 10 = 300 N.\nStep 2: The rope pulls upward on the worker with tension T = 300 N.\nStep 3: Vertical equilibrium for the worker: N + T = M_worker g  →  N + 300 = 70 × 10 = 700  →  N = 400 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6262, // Q150
    similar_question: {
      question: "Two masses of 6 kg and 4 kg are connected by a light cord passing over a frictionless, massless pulley (Atwood machine). What is the acceleration of the masses when released from rest? (Take g = 10 m/s²)",
      option_a: "2.0 m/s²",
      option_b: "1.0 m/s²",
      option_c: "5.0 m/s²",
      option_d: "4.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: In an ideal Atwood machine: a = [(m₁ − m₂) / (m₁ + m₂)] g.\nStep 2: Substitute m₁ = 6 kg and m₂ = 4 kg: a = [(6 − 4) / (6 + 4)] × 10 = (2 / 10) × 10 = 2.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart3() {
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

    console.log(`Starting update of Part 3 (${set6Part3Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set6Part3Updates) {
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
        console.log(`[${successCount}/${set6Part3Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Part 3 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart3();
