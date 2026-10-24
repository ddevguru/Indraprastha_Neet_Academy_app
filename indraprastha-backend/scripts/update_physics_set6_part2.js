const fs = require('fs');

const set6Part2Updates = [
  {
    id: 2797, // Q51
    similar_question: {
      question: "Two identical blocks A and B, each of mass 2 kg, are placed on a frictionless horizontal floor. A horizontal force F = 16 N is applied to block A pushing block B. What is the contact force between blocks A and B?",
      option_a: "8 N",
      option_b: "16 N",
      option_c: "4 N",
      option_d: "12 N",
      correct_option: "A",
      explanation: "Step 1: Total mass = 2 kg + 2 kg = 4 kg.\nAcceleration a = F / M_total = 16 N / 4 kg = 4 m/s².\n\nStep 2: Contact force accelerates block B:\nN = m_B × a = 2 kg × 4 m/s² = 8 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2798, // Q52
    similar_question: {
      question: "A crane lowers a crate of mass 500 kg vertically downward with a uniform downward acceleration of 2 m/s². Taking g = 10 m/s², what is the tension in the supporting cable?",
      option_a: "4000 N",
      option_b: "5000 N",
      option_c: "6000 N",
      option_d: "1000 N",
      correct_option: "A",
      explanation: "Step 1: Downward equation of motion: m g − T = m a  →  T = m (g − a).\nStep 2: Substitute m = 500 kg, g = 10 m/s², a = 2 m/s²:\nT = 500 × (10 − 2) = 500 × 8 = 4000 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2799, // Q53
    similar_question: {
      question: "A series of n identical blocks of mass m each are connected by light strings and pulled along a smooth horizontal surface by a force F applied to the first block. What is the tension in the string connecting the (k)th block and (k+1)th block?",
      option_a: "F (n − k) / n",
      option_b: "F k / n",
      option_c: "F / n",
      option_d: "F (n − 1) / n",
      correct_option: "A",
      explanation: "Step 1: Common acceleration: a = F / (n m).\nStep 2: The string between the k-th and (k+1)-th block pulls the remaining (n − k) blocks:\nT = (n − k) m × a = (n − k) m × [F / (n m)] = F (n − k) / n.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2800, // Q54
    similar_question: {
      question: "Two blocks A (mass 3 kg) and B (mass 2 kg) are in contact on a frictionless slope inclined at 30° to the horizontal. What is the contact force between the blocks as they slide down freely under gravity?",
      option_a: "Zero",
      option_b: "10 N",
      option_c: "15 N",
      option_d: "25 N",
      correct_option: "A",
      explanation: "Step 1: Both blocks experience the same acceleration down the smooth incline: a = g sin 30° = 5 m/s².\nStep 2: Since both blocks accelerate at the same rate independently, neither pushes against the other: contact force N = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2801, // Q55
    similar_question: {
      question: "In an Atwood machine with masses 7 kg and 3 kg, taking g = 10 m/s², what is the tension in the supporting clamp holding the pulley to the ceiling?",
      option_a: "84 N",
      option_b: "42 N",
      option_c: "100 N",
      option_d: "70 N",
      correct_option: "A",
      explanation: "Step 1: Tension in string: T = [2 m₁ m₂ / (m₁ + m₂)] g = [2 × 7 × 3 / 10] × 10 = 42 N.\nStep 2: The ceiling clamp supports both downward segments of the string: F_clamp = 2 T = 2 × 42 N = 84 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2802, // Q56
    similar_question: {
      question: "A light spring of spring constant k = 100 N/m is compressed by 0.1 m between two blocks of masses 1 kg and 4 kg on a smooth horizontal floor. When released, what is the initial acceleration of the 1 kg block?",
      option_a: "10 m/s²",
      option_b: "2.5 m/s²",
      option_c: "5 m/s²",
      option_d: "20 m/s²",
      correct_option: "A",
      explanation: "Step 1: Spring restoring force: F = k x = 100 N/m × 0.1 m = 10 N.\nStep 2: Acceleration of 1 kg block: a₁ = F / m₁ = 10 N / 1 kg = 10 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2803, // Q57
    similar_question: {
      question: "A heavy rope of mass 2 kg and length 4 m is pulled horizontally with a force of 12 N on a smooth floor. What is the tension in the rope at a distance of 1 m from the pulled end?",
      option_a: "9 N",
      option_b: "3 N",
      option_c: "6 N",
      option_d: "12 N",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = F / M = 12 N / 2 kg = 6 m/s².\nStep 2: Mass of the 3 m trailing segment: m' = (3 / 4) × 2 kg = 1.5 kg.\nStep 3: Tension T = m' a = 1.5 kg × 6 m/s² = 9 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2804, // Q58
    similar_question: {
      question: "An elevator is moving upward with an acceleration of 4 m/s². What is the apparent weight of a 50 kg passenger inside the elevator? (Take g = 10 m/s²)",
      option_a: "700 N",
      option_b: "500 N",
      option_c: "300 N",
      option_d: "200 N",
      correct_option: "A",
      explanation: "Step 1: Formula for apparent weight during upward acceleration:\nN = m (g + a).\nStep 2: Substitute m = 50 kg, g = 10 m/s², a = 4 m/s²:\nN = 50 × (10 + 4) = 50 × 14 = 700 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2805, // Q59
    similar_question: {
      question: "Three blocks of masses m, 2m, and 3m are suspended in series by identical light cords. When the system is accelerated vertically upward with acceleration a = g, what is the tension in the topmost cord?",
      option_a: "12 m g",
      option_b: "6 m g",
      option_c: "3 m g",
      option_d: "18 m g",
      correct_option: "A",
      explanation: "Step 1: Total mass supported by the topmost cord: M_total = m + 2m + 3m = 6m.\nStep 2: Upward acceleration equation: T − M_total g = M_total a  →  T = M_total (g + a).\nStep 3: For a = g: T = 6m (g + g) = 12 m g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2806, // Q60
    similar_question: {
      question: "A moving pulley has two vertical rope segments supporting a load of mass 10 kg. What downward pulling force F on the rope is required to lift the load with an acceleration of 2 m/s²? (Take g = 10 m/s²)",
      option_a: "60 N",
      option_b: "120 N",
      option_c: "50 N",
      option_d: "100 N",
      correct_option: "A",
      explanation: "Step 1: Net upward force on the load: 2 T − m g = m a  →  2 T = m (g + a).\nStep 2: 2 T = 10 × (10 + 2) = 120 N  →  T = 60 N.\nApplied force F = T = 60 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2807, // Q61
    similar_question: {
      question: "A stream of n identical elastic balls, each of mass m, strike a wall normally with speed v each second and bounce back with the same speed v. What is the average force exerted on the wall?",
      option_a: "2 n m v",
      option_b: "n m v",
      option_c: "n m v / 2",
      option_d: "4 n m v",
      correct_option: "A",
      explanation: "Step 1: Momentum change per ball: Δp = m v − (−m v) = 2 m v.\nStep 2: Number of balls striking per second = n.\nAverage force F = n × Δp = 2 n m v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2808, // Q62
    similar_question: {
      question: "A box containing a block of mass M falls vertically with a downward acceleration a = g. What is the normal reaction force between the block and the floor of the box?",
      option_a: "Zero (weightlessness)",
      option_b: "M g",
      option_c: "2 M g",
      option_d: "0.5 M g",
      correct_option: "A",
      explanation: "Step 1: In free fall (a = g downward), the apparent weight is N = M (g − a) = M (g − g) = 0.\nThis represents the condition of state of weightlessness.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2809, // Q63
    similar_question: {
      question: "A block of mass 10 kg is placed on a smooth horizontal table and pulled by a hanging mass of 15 kg via a light cord passing over a frictionless corner pulley. Taking g = 10 m/s², what is the acceleration of the system?",
      option_a: "6.0 m/s²",
      option_b: "10.0 m/s²",
      option_c: "4.0 m/s²",
      option_d: "7.5 m/s²",
      correct_option: "A",
      explanation: "Step 1: Driving force = weight of hanging mass = 15 × 10 = 150 N.\nStep 2: Total inertia = 10 kg + 15 kg = 25 kg.\nStep 3: Acceleration a = 150 N / 25 kg = 6.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2810, // Q64
    similar_question: {
      question: "In a movable pulley arrangement where one end of the string is fixed and a movable pulley carries block B while block A is pulled directly by the other end, the velocity of block A is v. What is the velocity of block B?",
      option_a: "v / 2",
      option_b: "2 v",
      option_c: "v",
      option_d: "v / 4",
      correct_option: "A",
      explanation: "Step 1: String length constraint: x_A + 2 x_B = constant.\nStep 2: Differentiating: v_A + 2 v_B = 0  →  v_B = v_A / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2811, // Q65
    similar_question: {
      question: "A block of mass 2 kg rests on a smooth table and is connected to a suspended mass of 3 kg. Taking g = 10 m/s², what is the tension in the connecting cord?",
      option_a: "12 N",
      option_b: "30 N",
      option_c: "18 N",
      option_d: "24 N",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = m₂ g / (m₁ + m₂) = (3 × 10) / (2 + 3) = 30 / 5 = 6 m/s².\nStep 2: Tension T = m₁ a = 2 kg × 6 m/s² = 12 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2812, // Q66
    similar_question: {
      question: "A smooth inclined plane of angle θ is placed inside an elevator accelerating upward with acceleration a. What is the acceleration of a particle sliding down the incline relative to the incline?",
      option_a: "(g + a) sin θ",
      option_b: "(g − a) sin θ",
      option_c: "g sin θ",
      option_d: "(g + a) cos θ",
      correct_option: "A",
      explanation: "Step 1: In the frame of the elevator, effective gravity is g_eff = g + a downward.\nStep 2: Acceleration down the incline: a_rel = g_eff sin θ = (g + a) sin θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2813, // Q67
    similar_question: {
      question: "A block slides down a smooth incline of length L and angle θ starting from rest. The time taken to reach the bottom is:",
      option_a: "√[2L / (g sin θ)]",
      option_b: "√[2L / (g cos θ)]",
      option_c: "√[L / (2g sin θ)]",
      option_d: "2L / (g sin θ)",
      correct_option: "A",
      explanation: "Step 1: Acceleration down the incline: a = g sin θ.\nStep 2: Using s = (1/2) a t²: L = (1/2)(g sin θ) t²  →  t = √[2L / (g sin θ)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2814, // Q68
    similar_question: {
      question: "If an elevator moves upward with a constant velocity, how does the time taken by a block to slide down a smooth inclined plane inside the elevator compare with that when the elevator is stationary?",
      option_a: "It remains exactly the same",
      option_b: "It is shorter",
      option_c: "It is longer",
      option_d: "Depends on the velocity of the elevator",
      correct_option: "A",
      explanation: "Step 1: A frame moving with constant velocity is an inertial frame (acceleration a = 0).\nStep 2: Effective gravity g_eff = g, so the acceleration down the incline and time of descent are identical.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2815, // Q69
    similar_question: {
      question: "Two blocks, each of mass 2 kg, are connected by an ideal spring of stiffness k = 100 N/m on a smooth horizontal table. If block B is pulled with a constant force F = 20 N, what is the extension in the spring at maximum elongation?",
      option_a: "0.20 m",
      option_b: "0.10 m",
      option_c: "0.40 m",
      option_d: "0.05 m",
      correct_option: "A",
      explanation: "Step 1: Equilibrium extension x₀ = F / (2k) when both accelerate together.\nStep 2: Maximum elongation in work-energy balance from rest is twice the equilibrium elongation:\nx_max = 2 x₀ = 2 × [F / (2k)] = F / k = 20 N / 100 N/m = 0.20 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2816, // Q70
    similar_question: {
      question: "A spring of stiffness k connects two blocks of masses m₁ and m₂ on a smooth surface. At the instant block 1 has an acceleration a₁, the force exerted by the spring on block 2 has magnitude:",
      option_a: "m₁ a₁",
      option_b: "m₂ a₁",
      option_c: "(m₁ + m₂) a₁",
      option_d: "k a₁",
      correct_option: "A",
      explanation: "Step 1: The only horizontal force acting on block 1 is the spring force F_s: F_s = m₁ a₁.\nStep 2: By Newton's third law, the spring exerts an equal magnitude force on block 2: F_s = m₁ a₁.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2817, // Q71
    similar_question: {
      question: "Two blocks of masses 2 kg and 3 kg are in contact on a frictionless table. A force of 15 N pushes the 2 kg block against the 3 kg block. What is the contact force between them?",
      option_a: "9 N",
      option_b: "6 N",
      option_c: "15 N",
      option_d: "3 N",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = F / (m₁ + m₂) = 15 / (2 + 3) = 3 m/s².\nStep 2: Contact force N = m₂ a = 3 kg × 3 m/s² = 9 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2818, // Q72
    similar_question: {
      question: "Three blocks of masses 2 kg, 4 kg, and 6 kg are tied in a line with light cords and pulled horizontally with a force of 36 N on a frictionless surface. What is the tension in the cord between the 4 kg and 6 kg blocks?",
      option_a: "18 N",
      option_b: "12 N",
      option_c: "24 N",
      option_d: "6 N",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = 36 N / (2 + 4 + 6) kg = 36 / 12 = 3 m/s².\nStep 2: The rear cord pulls only the 6 kg block: T = 6 kg × 3 m/s² = 18 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2819, // Q73
    similar_question: {
      question: "Two blocks of masses 4 kg and 2 kg on a frictionless surface are pushed from opposite sides by opposing forces of 20 N (to the right) and 8 N (to the left). What is the acceleration of the system?",
      option_a: "2.0 m/s² to the right",
      option_b: "4.0 m/s² to the right",
      option_c: "1.0 m/s² to the right",
      option_d: "3.0 m/s² to the right",
      correct_option: "A",
      explanation: "Step 1: Net force F_net = 20 N − 8 N = 12 N to the right.\nStep 2: Total mass = 4 + 2 = 6 kg.\nStep 3: Acceleration a = 12 / 6 = 2.0 m/s² to the right.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2820, // Q74
    similar_question: {
      question: "A block slides down an inclined plane of angle 45° with an acceleration of g / (2√2). What is the coefficient of kinetic friction μ_k between the block and the incline?",
      option_a: "0.50",
      option_b: "0.25",
      option_c: "0.75",
      option_d: "0.10",
      correct_option: "A",
      explanation: "Step 1: Acceleration on rough incline: a = g (sin 45° − μ_k cos 45°) = (g / √2) (1 − μ_k).\n\nStep 2: Given a = g / (2√2):\n(g / √2) (1 − μ_k) = g / (2√2)  →  1 − μ_k = 1/2  →  μ_k = 0.50.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2821, // Q75
    similar_question: {
      question: "A block begins to slide down an inclined plane when the angle of inclination reaches 45°. What is the coefficient of static friction μ_s between the block and the incline?",
      option_a: "1.0",
      option_b: "0.50",
      option_c: "0.71",
      option_d: "1.41",
      correct_option: "A",
      explanation: "Step 1: Angle of repose θ_r is related to static friction by:\nμ_s = tan θ_r.\n\nStep 2: For θ_r = 45°: μ_s = tan 45° = 1.0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2822, // Q76
    similar_question: {
      question: "A box of mass 40 kg is pushed along a horizontal floor. If the coefficient of kinetic friction is μ_k = 0.25, what horizontal force is required to keep it moving at constant velocity? (Take g = 10 m/s²)",
      option_a: "100 N",
      option_b: "400 N",
      option_c: "50 N",
      option_d: "250 N",
      correct_option: "A",
      explanation: "Step 1: Normal reaction N = m g = 40 × 10 = 400 N.\nStep 2: Kinetic friction force f_k = μ_k N = 0.25 × 400 N = 100 N.\nFor constant velocity, applied force F = f_k = 100 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2823, // Q77
    similar_question: {
      question: "A trolley of mass 20 kg on a horizontal table with coefficient of kinetic friction μ_k = 0.1 is connected by a light string over an ideal pulley to a hanging mass of 4 kg. What is the acceleration of the system? (Take g = 10 m/s²)",
      option_a: "0.83 m/s²",
      option_b: "1.67 m/s²",
      option_c: "2.0 m/s²",
      option_d: "0.50 m/s²",
      correct_option: "A",
      explanation: "Step 1: Driving force = m_hang × g = 4 × 10 = 40 N.\nFriction force on trolley = μ_k m_trolley g = 0.1 × 20 × 10 = 20 N.\n\nStep 2: Net accelerating force = 40 − 20 = 20 N.\nTotal mass = 20 + 4 = 24 kg.\n\nStep 3: Acceleration a = 20 / 24 = 5 / 6 ≈ 0.83 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2824, // Q78
    similar_question: {
      question: "An object takes 2 times as long to slide down a 45° rough inclined plane as it takes to slide down an identical smooth inclined plane. What is the coefficient of kinetic friction μ_k?",
      option_a: "0.75",
      option_b: "0.50",
      option_c: "0.25",
      option_d: "0.33",
      correct_option: "A",
      explanation: "Step 1: Formula for time ratio n on an incline of angle θ:\nμ_k = tan θ [1 − (1 / n²)].\n\nStep 2: Substitute θ = 45° (tan 45° = 1) and n = 2:\nμ_k = 1 × [1 − (1 / 4)] = 3 / 4 = 0.75.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2825, // Q79
    similar_question: {
      question: "Two blocks of masses M and m are on the opposite slopes of a smooth double wedge of angles 30° and 45° connected by a light cord. If the system is in static equilibrium, what is the ratio M / m?",
      option_a: "√2",
      option_b: "1 / √2",
      option_c: "2",
      option_d: "1 / 2",
      correct_option: "A",
      explanation: "Step 1: T = M g sin 30° and T = m g sin 45°.\nStep 2: M sin 30° = m sin 45°  →  M (1/2) = m (1/√2)  →  M / m = 2 / √2 = √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2826, // Q80
    similar_question: {
      question: "A block of mass 4 kg is placed on an incline of 30°. The coefficient of static friction is μ_s = 0.8. Taking g = 10 m/s², what is the frictional force on the block?",
      option_a: "20 N",
      option_b: "27.7 N",
      option_c: "32 N",
      option_d: "40 N",
      correct_option: "A",
      explanation: "Step 1: Maximum static friction:\nf_max = μ_s m g cos 30° = 0.8 × 4 × 10 × (√3 / 2) ≈ 27.7 N.\n\nStep 2: Downward gravitational pull along incline:\nF_down = m g sin 30° = 4 × 10 × 0.5 = 20 N.\n\nStep 3: Since F_down (20 N) < f_max (27.7 N), the block remains at rest and static friction equals 20 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2827, // Q81
    similar_question: {
      question: "A block of mass m is placed on a rough curved surface whose profile is y = x² / 4. If the coefficient of friction is μ = 0.5, what is the maximum horizontal coordinate x at which the block can rest without sliding?",
      option_a: "1.0 m",
      option_b: "0.5 m",
      option_c: "2.0 m",
      option_d: "0.25 m",
      correct_option: "A",
      explanation: "Step 1: Condition for no sliding on a curved surface: tan θ ≤ μ.\nStep 2: The slope of the curve is dy / dx = d/dx [x² / 4] = x / 2.\nStep 3: Set slope equal to μ:\nx / 2 = 0.5  →  x = 1.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2828, // Q82
    similar_question: {
      question: "Statement I: The limiting force of static friction is independent of the apparent area of contact.\nStatement II: Limiting friction is directly proportional to the normal reaction between the contact surfaces.",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Statement I is true but Statement II is false",
      option_c: "Statement I is false but Statement II is true",
      option_d: "Both Statement I and Statement II are false",
      correct_option: "A",
      explanation: "Step 1: By the laws of friction, limiting friction f_s(max) = μ_s N, which is directly proportional to the normal reaction N (Statement II is true).\nStep 2: Limiting friction depends only on the nature of materials and normal reaction, independent of contact area (Statement I is true).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2829, // Q83
    similar_question: {
      question: "A bullet of mass 0.05 kg moving horizontally at 200 m/s strikes a wooden block and penetrates a distance of 0.20 m before coming to rest. What is the average retarding force exerted on the bullet?",
      option_a: "5000 N",
      option_b: "2500 N",
      option_c: "1000 N",
      option_d: "10000 N",
      correct_option: "A",
      explanation: "Step 1: Initial kinetic energy: K = (1/2) m v² = 0.5 × 0.05 × (200)² = 0.025 × 40000 = 1000 J.\nStep 2: Work done by retarding force: W = F × d = 1000 J  →  F × 0.20 = 1000  →  F = 5000 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2830, // Q84
    similar_question: {
      question: "A block of mass 10 kg rests on a rough horizontal floor with μ_s = 0.4. A horizontal force of 25 N is applied to the block. Taking g = 10 m/s², what is the frictional force exerted by the floor on the block?",
      option_a: "25 N",
      option_b: "40 N",
      option_c: "15 N",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Limiting friction f_max = μ_s N = 0.4 × 100 = 40 N.\nStep 2: Applied force (25 N) is less than f_max (40 N).\nStatic friction self-adjusts to equal the applied force: f = 25 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2831, // Q85
    similar_question: {
      question: "A block of mass 8 kg on a horizontal table (μ_k = 0.2) is pulled by a force F = 20 N inclined at 30° above the horizontal. Taking g = 10 m/s², what is the normal reaction force?",
      option_a: "70 N",
      option_b: "80 N",
      option_c: "90 N",
      option_d: "60 N",
      correct_option: "A",
      explanation: "Step 1: Vertical force equilibrium: N + F sin 30° = m g.\nStep 2: N = m g − F sin 30° = (8 × 10) − (20 × 0.5) = 80 − 10 = 70 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2832, // Q86
    similar_question: {
      question: "A body of mass 5 kg moving on a rough horizontal surface with initial speed 10 m/s skids to a stop in a distance of 25 m. Taking g = 10 m/s², what is the coefficient of kinetic friction μ_k?",
      option_a: "0.20",
      option_b: "0.40",
      option_c: "0.10",
      option_d: "0.25",
      correct_option: "A",
      explanation: "Step 1: Retardation on horizontal surface: a = μ_k g.\nStep 2: Using v² = u² − 2as: 0 = (10)² − 2 (μ_k × 10) (25) = 100 − 500 μ_k.\nμ_k = 100 / 500 = 0.20.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2833, // Q87
    similar_question: {
      question: "A block slides down an inclined plane of angle 30° with an acceleration of g / 4. What is the coefficient of kinetic friction?",
      option_a: "1 / (2√3)",
      option_b: "1 / √3",
      option_c: "√3 / 2",
      option_d: "1 / 4",
      correct_option: "A",
      explanation: "Step 1: Acceleration equation: a = g (sin 30° − μ_k cos 30°).\nStep 2: g / 4 = g (1/2 − μ_k √3 / 2)  →  1/4 = 1/2 − μ_k √3 / 2.\nμ_k √3 / 2 = 1/4  →  μ_k = 1 / (2√3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2834, // Q88
    similar_question: {
      question: "An object slides down a 45° rough inclined plane taking 3 times as long as it takes to slide down a frictionless 45° plane of the same length. The coefficient of friction is:",
      option_a: "8 / 9 ≈ 0.89",
      option_b: "2 / 3",
      option_c: "1 / 9",
      option_d: "3 / 4",
      correct_option: "A",
      explanation: "Step 1: Formula: μ_k = tan θ [1 − (1 / n²)].\nStep 2: For θ = 45° and n = 3: μ_k = 1 × [1 − (1 / 9)] = 8 / 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2835, // Q89
    similar_question: {
      question: "A block of mass 2 kg is placed on an incline of 45° where μ_s = 0.5 and μ_k = 0.4. Taking g = 10 m/s², what is the acceleration of the block down the incline?",
      option_a: "4.24 m/s²",
      option_b: "7.07 m/s²",
      option_c: "2.50 m/s²",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = g (sin 45° − μ_k cos 45°) = (10 / √2) (1 − 0.4) = (10 / 1.414) × 0.6 = 4.24 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2836, // Q90
    similar_question: {
      question: "A suitcase is gently placed on a horizontal conveyor belt moving at a constant speed of 3 m/s. If the coefficient of kinetic friction between suitcase and belt is μ_k = 0.3, how far does the suitcase slide relative to the floor before moving with the belt? (Take g = 10 m/s²)",
      option_a: "1.5 m",
      option_b: "3.0 m",
      option_c: "0.75 m",
      option_d: "4.5 m",
      correct_option: "A",
      explanation: "Step 1: Acceleration of the suitcase: a = μ_k g = 0.3 × 10 = 3 m/s².\nStep 2: Using v² = 2as: (3)² = 2 × 3 × s  →  9 = 6s  →  s = 1.5 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2837, // Q91
    similar_question: {
      question: "A wooden block slides down an inclined plane at a constant speed. If the inclination of the plane is 30°, what is the coefficient of kinetic friction between block and incline?",
      option_a: "1 / √3 ≈ 0.58",
      option_b: "√3 ≈ 1.73",
      option_c: "0.50",
      option_d: "0.866",
      correct_option: "A",
      explanation: "Step 1: For motion with constant velocity, net acceleration a = 0:\nm g sin θ = μ_k m g cos θ  →  μ_k = tan θ.\nStep 2: For θ = 30°: μ_k = tan 30° = 1 / √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2838, // Q92
    similar_question: {
      question: "A 3 kg block is held against a vertical wall by a horizontal force of 80 N. If μ_s = 0.5 between block and wall, what is the maximum vertical downward force that can be added without causing the block to slide? (Take g = 10 m/s²)",
      option_a: "10 N",
      option_b: "40 N",
      option_c: "30 N",
      option_d: "20 N",
      correct_option: "A",
      explanation: "Step 1: Maximum static friction upward: f_max = μ_s N = 0.5 × 80 N = 40 N.\nStep 2: Weight of block: W = m g = 3 × 10 = 30 N.\nStep 3: Downward force balance: W + F_add ≤ f_max  →  30 + F_add = 40  →  F_add = 10 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2839, // Q93
    similar_question: {
      question: "A block of mass 20 kg on a rough table begins to slide when a mass of 5 kg is suspended from a light cord over a pulley. What is the coefficient of static friction?",
      option_a: "0.25",
      option_b: "0.20",
      option_c: "0.50",
      option_d: "0.40",
      correct_option: "A",
      explanation: "Step 1: At impending motion, tension T equals limiting friction: T = f_max  →  m_hang g = μ_s M_table g.\nStep 2: μ_s = m_hang / M_table = 5 kg / 20 kg = 0.25.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2840, // Q94
    similar_question: {
      question: "Block A (mass 2 kg) rests on top of block B (mass 6 kg) on a frictionless floor. The coefficient of static friction between A and B is μ_s = 0.3. What is the maximum horizontal force that can be applied to block B without block A slipping? (Take g = 10 m/s²)",
      option_a: "24 N",
      option_b: "6 N",
      option_c: "18 N",
      option_d: "30 N",
      correct_option: "A",
      explanation: "Step 1: Maximum acceleration of block A without slipping:\na_max = μ_s g = 0.3 × 10 = 3 m/s².\n\nStep 2: Force applied to block B to produce a_max for the entire system:\nF_max = (m_A + m_B) a_max = (2 + 6) × 3 = 8 × 3 = 24 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2841, // Q95
    similar_question: {
      question: "A block of mass 5 kg slides on a rough horizontal floor with an initial speed of 14 m/s and comes to rest after 7 seconds. Taking g = 9.8 m/s², what is the coefficient of kinetic friction?",
      option_a: "0.204",
      option_b: "0.150",
      option_c: "0.300",
      option_d: "0.250",
      correct_option: "A",
      explanation: "Step 1: Retardation a = u / t = 14 m/s / 7 s = 2 m/s².\nStep 2: a = μ_k g  →  μ_k = a / g = 2 / 9.8 ≈ 0.204.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2842, // Q96
    similar_question: {
      question: "A body slides down a smooth incline of 30° from height h in time t₁. When the same body slides down a 60° smooth incline from the same height h, the time taken is t₂. What is the ratio t₁ / t₂?",
      option_a: "√3",
      option_b: "1 / √3",
      option_c: "3",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: Length of incline: L = h / sin θ.\nAcceleration a = g sin θ.\nTime t = √(2L / a) = √[2h / (g sin² θ)] = [1 / sin θ] √(2h / g).\n\nStep 2: Ratio t₁ / t₂ = sin 60° / sin 30° = (√3 / 2) / (1 / 2) = √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2843, // Q97
    similar_question: {
      question: "An insect crawls up the inside of a rough hemispherical bowl of radius R. If the coefficient of static friction is μ = 0.75, what is the maximum height h above the bottom of the bowl that the insect can reach without slipping?",
      option_a: "0.20 R",
      option_b: "0.40 R",
      option_c: "0.25 R",
      option_d: "0.50 R",
      correct_option: "A",
      explanation: "Step 1: Slipping condition at angle θ from the vertical: tan θ = μ = 0.75 = 3/4.\nStep 2: For tan θ = 3/4, cos θ = 4/5 = 0.80.\nStep 3: Height above the bottom h = R (1 − cos θ) = R (1 − 0.80) = 0.20 R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2844, // Q98
    similar_question: {
      question: "Why is it easier to pull a heavy lawnmower than to push it across a rough lawn?",
      option_a: "Pulling has an upward force component that decreases the normal reaction and friction",
      option_b: "Pulling increases the mass of the mower",
      option_c: "Pushing reduces the normal contact force",
      option_d: "Friction is absent during pulling",
      correct_option: "A",
      explanation: "Step 1: When pulling with force F at angle θ above horizontal, N = m g − F sin θ, which reduces normal force and kinetic friction f_k = μ N.\nStep 2: When pushing, N = m g + F sin θ, which increases normal force and friction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2845, // Q99
    similar_question: {
      question: "Two blocks A (mass 2 kg) and B (mass 4 kg) rest on a rough table with coefficient of friction μ = 0.2 for both blocks. If a force of 24 N pulls both blocks via a connecting string, what is the acceleration of the system? (Take g = 10 m/s²)",
      option_a: "2.0 m/s²",
      option_b: "4.0 m/s²",
      option_c: "1.5 m/s²",
      option_d: "3.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Total friction: f_total = μ (m_A + m_B) g = 0.2 × (2 + 4) × 10 = 12 N.\nStep 2: Net accelerating force = 24 N − 12 N = 12 N.\nStep 3: Acceleration a = 12 N / 6 kg = 2.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2846, // Q100
    similar_question: {
      question: "A block placed on an incline remains at rest for angles up to 37°, but begins to slide when the angle exceeds 37°. What is the coefficient of static friction? (Take tan 37° = 0.75)",
      option_a: "0.75",
      option_b: "0.60",
      option_c: "0.80",
      option_d: "0.50",
      correct_option: "A",
      explanation: "Step 1: Angle of repose θ_r is the maximum angle of an incline at which a body remains at rest under friction alone.\nStep 2: Relation: μ_s = tan θ_r = tan 37° = 0.75.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Part 2 (${set6Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set6Part2Updates) {
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
        console.log(`[${successCount}/${set6Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
