module.exports = [
  {
    id: 256,
    question: "The mass of a lift is 2000 kg. When the tension in the supporting cable is 28,000 N, its acceleration is: (Take g = 10 m/s²) [AIPMT 2009]",
    optionA: "4 m/s² upwards",
    optionB: "4 m/s² downwards",
    optionC: "14 m/s² upwards",
    optionD: "30 m/s² downwards",
    correctOption: "A",
    explanation: "Step 1: Compare cable tension with weight of the lift:\nWeight of lift W = m × g = 2000 kg × 10 m/s² = 20,000 N.\nGiven tension T = 28,000 N.\nSince T > W, the net force is directed upwards, so acceleration is upwards.\n\nStep 2: Apply Newton's second law:\nT - m × g = m × a\n28,000 - 20,000 = 2000 × a\n8000 = 2000 × a\na = 4 m/s² upwards.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An elevator of mass 1500 kg has a cable tension of 12,000 N. Taking g = 10 m/s², what is the acceleration of the elevator? [Same Concept Q]",
      option_a: "2 m/s² upwards",
      option_b: "2 m/s² downwards",
      option_c: "4 m/s² downwards",
      option_d: "8 m/s² downwards",
      correct_option: "B",
      explanation: "Step 1: Weight of the elevator:\nW = m × g = 1500 × 10 = 15,000 N.\n\nStep 2: Since T (12,000 N) < W (15,000 N), the net force is downwards:\nW - T = m × a\n15,000 - 12,000 = 1500 × a\n3000 = 1500 × a → a = 2 m/s² downwards.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 255,
    question: "A block of mass m is in contact with the front vertical wall of a cart C. The coefficient of static friction between the block and the wall is μ. The acceleration α of the cart that will prevent the block from falling satisfies: [AIPMT 2010 Prelims]",
    optionA: "α > m g / μ",
    optionB: "α > g / (μ m)",
    optionC: "α ≥ g / μ",
    optionD: "α < g / μ",
    correctOption: "C",
    explanation: "Step 1: Consider forces in the frame of reference of the cart accelerating horizontally with acceleration α:\n- Normal reaction on block by cart: N = m × α (balancing pseudo force)\n- Downward gravity force: m × g\n- Upward static friction: f_s\n\nStep 2: Condition to prevent the block from slipping down:\nf_s ≤ μ × N\nSince f_s = m × g to balance weight:\nm × g ≤ μ × (m × α)\n\nStep 3: Solve for acceleration α:\ng ≤ μ × α\nα ≥ g / μ.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A block is held against a vertical wall of a accelerating carriage. If the coefficient of static friction between the block and the wall is 0.25 and g = 10 m/s², the minimum acceleration of the carriage to keep the block from falling is: [Same Concept Q]",
      option_a: "2.5 m/s²",
      option_b: "25 m/s²",
      option_c: "40 m/s²",
      option_d: "50 m/s²",
      correct_option: "C",
      explanation: "Step 1: Minimum horizontal acceleration required:\nα_min = g / μ\n\nStep 2: Substitute g = 10 m/s² and μ = 0.25:\nα_min = 10 / 0.25 = 40 m/s².\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 254,
    question: "A body of mass M hits a rigid vertical wall normally with velocity V and bounces back with the same velocity. The magnitude of the impulse experienced by the body is: [AIPMT 2011 Prelims]",
    optionA: "M V",
    optionB: "1.5 M V",
    optionC: "2 M V",
    optionD: "Zero",
    correctOption: "C",
    explanation: "Step 1: Define initial and final linear momentum vectors:\nTaking the initial direction of motion as positive (+x):\nInitial momentum: p_initial = M V i^\nFinal momentum (rebounding opposite): p_final = -M V i^\n\nStep 2: Calculate change in momentum (impulse):\nImpulse J = Δp = p_final - p_initial = -M V i^ - M V i^ = -2 M V i^\n\nStep 3: Magnitude of impulse:\n|J| = 2 M V.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A rubber ball of mass 0.2 kg moving at 15 m/s strikes a wall normally and rebounds with the same speed. What is the magnitude of the impulse imparted to the ball? [Same Concept Q]",
      option_a: "3 N s",
      option_b: "6 N s",
      option_c: "1.5 N s",
      option_d: "Zero",
      correct_option: "B",
      explanation: "Step 1: Impulse magnitude for normal elastic rebound:\n|J| = 2 m v\n\nStep 2: Substitute m = 0.2 kg and v = 15 m/s:\n|J| = 2 × 0.2 × 15 = 6 N s (or kg m/s).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 253,
    question: "A person of mass 60 kg is inside a lift of mass 940 kg and presses the button on the control panel. The lift starts moving upwards with an acceleration of 1.0 m/s². If g = 10 m/s², the tension in the supporting cable is: [AIPMT 2011 Prelims]",
    optionA: "8600 N",
    optionB: "9680 N",
    optionC: "11000 N",
    optionD: "1200 N",
    correctOption: "C",
    explanation: "Step 1: Find total mass of the accelerating system:\nM_total = mass of lift + mass of person = 940 kg + 60 kg = 1000 kg.\n\nStep 2: Equation of motion for the system accelerating upward:\nT - M_total × g = M_total × a\nT = M_total × (g + a)\n\nStep 3: Substitute given numerical values:\nT = 1000 × (10 + 1.0) = 1000 × 11 = 11,000 N.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A freight elevator of mass 1800 kg carries a payload of 200 kg. If it accelerates upward at 2 m/s² and g = 10 m/s², what is the tension in the elevator cable? [Same Concept Q]",
      option_a: "20,000 N",
      option_b: "24,000 N",
      option_c: "16,000 N",
      option_d: "22,000 N",
      correct_option: "B",
      explanation: "Step 1: Total mass:\nM = 1800 + 200 = 2000 kg.\n\nStep 2: Tension with upward acceleration:\nT = M(g + a) = 2000 × (10 + 2) = 2000 × 12 = 24,000 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 252,
    question: "A conveyor belt is moving at a constant speed of 2 m/s. A box is gently dropped on it. The coefficient of friction between the box and belt is μ = 0.5. The distance the box will move relative to the belt before coming to rest on it is: (Take g = 10 m/s²) [AIPMT 2011 Mains]",
    optionA: "0.4 m",
    optionB: "1.2 m",
    optionC: "0.6 m",
    optionD: "Zero",
    correctOption: "A",
    explanation: "Step 1: In the frame of reference of the conveyor belt:\nInitial relative velocity of box: u_rel = 0 - 2 = -2 m/s (or speed = 2 m/s).\nFinal relative velocity when box rests on belt: v_rel = 0.\n\nStep 2: Deceleration of box relative to belt caused by kinetic friction:\na_rel = μ × g = 0.5 × 10 = 5 m/s².\n\nStep 3: Apply kinematic formula: (v_rel)² = (u_rel)² - 2 × a_rel × s_rel:\n0 = 2² - 2 × 5 × s_rel\n10 × s_rel = 4\ns_rel = 0.4 m.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A luggage box is placed on a horizontal conveyor belt traveling at 4 m/s. If the coefficient of friction is 0.4 and g = 10 m/s², what relative displacement does the box undergo before stopping relative to the belt? [Same Concept Q]",
      option_a: "1.0 m",
      option_b: "2.0 m",
      option_c: "3.2 m",
      option_d: "0.8 m",
      correct_option: "B",
      explanation: "Step 1: Acceleration a = μ g = 0.4 × 10 = 4 m/s².\n\nStep 2: Using v² = u² - 2 a s in the belt's reference frame:\n0 = 4² - 2(4)s → 8s = 16 → s = 2.0 m.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 251,
    question: "A stone is dropped from a height h and strikes the ground with a certain momentum P. If the same stone is dropped from a height 100% more than the previous height, its momentum when it strikes the ground will change by: [AIPMT 2012 Mains]",
    optionA: "68%",
    optionB: "41%",
    optionC: "200%",
    optionD: "100%",
    correctOption: "B",
    explanation: "Step 1: Speed on reaching ground from height h:\nv = √(2 g h)\nLinear momentum P = m × v = m × √(2 g h).\nThus, P ∝ √h.\n\nStep 2: A height 100% more means the new height is:\nh' = h + 100% of h = 2h.\n\nStep 3: New momentum P':\nP' = m × √(2 g × 2h) = √2 × P ≈ 1.414 P.\n\nStep 4: Percentage increase in momentum:\n% increase = [(P' - P) / P] × 100% = (1.414 - 1) × 100% = 41.4% ≈ 41%.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A freely falling body released from height H hits the surface with velocity v. If the height of release is increased by 300% (to 4H), the velocity upon impact increases by: [Same Concept Q]",
      option_a: "100%",
      option_b: "200%",
      option_c: "300%",
      option_d: "400%",
      correct_option: "A",
      explanation: "Step 1: Impact velocity v = √(2 g H).\n\nStep 2: New height H' = H + 3H = 4H.\nNew velocity v' = √(2 g × 4H) = 2√(2 g H) = 2v.\n\nStep 3: Percentage increase:\n[(2v - v) / v] × 100% = 100%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 250,
    question: "Three blocks of masses m, 2m, and 3m are connected by light strings in series vertically. An upward force F is applied to mass m such that the system moves upwards at a constant speed v. What is the net force acting on the block of mass 2m? (g is acceleration due to gravity) [NEET 2013]",
    optionA: "3 m g",
    optionB: "6 m g",
    optionC: "Zero",
    optionD: "2 m g",
    correctOption: "C",
    explanation: "Step 1: Identify the state of motion of the system:\nThe masses are moving upward with a constant speed v.\n\nStep 2: Determine acceleration:\nSince velocity is constant (magnitude and direction do not change):\nAcceleration a = dv/dt = 0.\n\nStep 3: Apply Newton's second law to the block of mass 2m:\nF_net = (mass) × (acceleration) = 2m × 0 = Zero.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A crate of mass 50 kg is pulled vertically upward by a crane with a constant speed of 5 m/s. The net force acting on the crate during this motion is: [Same Concept Q]",
      option_a: "500 N",
      option_b: "250 N",
      option_c: "Zero",
      option_d: "50 N",
      correct_option: "C",
      explanation: "Step 1: Constant velocity means acceleration is zero (a = 0).\n\nStep 2: From Newton's second law, net force F_net = m × a = 50 × 0 = Zero.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 249,
    question: "The upper half of an inclined plane of inclination θ is perfectly smooth while the lower half is rough. A block starting from rest at the top of the incline comes to rest at the bottom. The coefficient of friction μ between the block and the lower half is: [NEET 2013]",
    optionA: "μ = 2 tan θ",
    optionB: "μ = tan θ",
    optionC: "μ = 1 / tan θ",
    optionD: "μ = 2 / tan θ",
    correctOption: "A",
    explanation: "Step 1: Let the total length of the inclined plane be L.\nUpper smooth half has length L / 2.\nLower rough half has length L / 2.\n\nStep 2: Apply the Work-Energy Theorem for the entire trip:\nWork done by all forces = Change in kinetic energy (ΔK = 0 - 0 = 0).\nForces doing work:\n- Gravity does positive work over the whole length L: W_g = (m g sin θ) × L.\n- Friction acts only along the lower half of length L / 2: W_f = -(μ m g cos θ) × (L / 2).\n\nStep 3: Set W_net = 0:\nm g sin θ × L - μ m g cos θ × (L / 2) = 0\nsin θ = μ cos θ / 2\nμ = 2 (sin θ / cos θ) = 2 tan θ.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A body slides down an incline of angle 45°. If the first one-third of the incline is smooth and the remaining two-thirds is rough, and the body stops just at the bottom, the coefficient of friction on the rough section is: [Same Concept Q]",
      option_a: "1.5",
      option_b: "0.75",
      option_c: "2.0",
      option_d: "1.0",
      correct_option: "A",
      explanation: "Step 1: Work by gravity: W_g = m g sin(45°) × L.\nWork by friction: W_f = -μ m g cos(45°) × (2L / 3).\n\nStep 2: W_g + W_f = 0:\nm g sin(45°) L = μ m g cos(45°) (2L / 3)\nSince sin(45°) = cos(45°): 1 = 2μ / 3 → μ = 3 / 2 = 1.5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 248,
    question: "A car is moving on a circular horizontal track of radius 10 m with a constant speed of 10 m/s. A plumb bob is suspended from the roof of the car by a light wire of length 1.0 m. The angle made by the wire with the vertical is: (Take g = 10 m/s²) [NEET 2013 Karnataka]",
    optionA: "π / 3",
    optionB: "π / 6",
    optionC: "π / 4",
    optionD: "0°",
    correctOption: "C",
    explanation: "Step 1: In the accelerating frame of the car moving in a circle:\nThe bob experiences a real downward gravitational force (m g) and a fictitious radially outward centrifugal force (m v² / R).\n\nStep 2: For equilibrium of the bob suspended at an angle θ with the vertical:\nT cos θ = m g\nT sin θ = m v² / R\n\nStep 3: Divide the two equations:\ntan θ = (m v² / R) / (m g) = v² / (R g)\n\nStep 4: Substitute v = 10 m/s, R = 10 m, and g = 10 m/s²:\ntan θ = (10)² / (10 × 10) = 100 / 100 = 1\nθ = tan⁻¹(1) = 45° = π / 4 radians.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A pendulum hangs from the ceiling of a train rounding a curve of radius 20 m at speed 14.14 m/s. What angle does the pendulum string make with the vertical? (g = 10 m/s²) [Same Concept Q]",
      option_a: "30°",
      option_b: "45°",
      option_c: "60°",
      option_d: "0°",
      correct_option: "B",
      explanation: "Step 1: tan θ = v² / (R g)\n\nStep 2: Substitute v² = (14.14)² ≈ 200, R = 20 m, g = 10 m/s²:\ntan θ = 200 / (20 × 10) = 200 / 200 = 1 → θ = 45°.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 247,
    question: "A system consists of three masses m₁, m₂, and m₃ connected by a string passing over a frictionless pulley. Mass m₁ hangs freely while m₂ and m₃ are placed on a rough horizontal table with coefficient of friction μ. Assuming m₁ = m₂ = m₃ = m, the downward acceleration of mass m₁ is: [AIPMT 2014]",
    optionA: "g (1 - 2μ) / 9",
    optionB: "2 g μ / 3",
    optionC: "g (1 - 2μ) / 3",
    optionD: "g (1 - 2μ) / 2",
    correctOption: "C",
    explanation: "Step 1: Determine total mass being accelerated by the system:\nM_total = m₁ + m₂ + m₃ = m + m + m = 3m.\n\nStep 2: Determine net driving pulling force:\nDownward force of gravity on hanging mass: F_pull = m₁ g = m g.\nOpposing frictional force on the two blocks on the table:\nf_k = μ (m₂ + m₃) g = μ (m + m) g = 2 μ m g.\n\nStep 3: Net accelerating force:\nF_net = F_pull - f_k = m g - 2 μ m g = m g (1 - 2μ).\n\nStep 4: System acceleration:\na = F_net / M_total = [m g (1 - 2μ)] / (3m) = g (1 - 2μ) / 3.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A mass m hangs over a pulley and pulls a mass 3m placed on a rough horizontal surface with friction coefficient μ. The acceleration of the system is: [Same Concept Q]",
      option_a: "g (1 - 3μ) / 4",
      option_b: "g (1 - μ) / 4",
      option_c: "g (1 - 3μ) / 2",
      option_d: "g (3 - μ) / 4",
      correct_option: "A",
      explanation: "Step 1: Net pulling force:\nF_net = m g - μ (3m) g = m g (1 - 3μ).\n\nStep 2: Total mass accelerated = m + 3m = 4m.\n\nStep 3: Acceleration a = F_net / M_total = g (1 - 3μ) / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 246,
    question: "A balloon of total mass m is descending down with an acceleration a (where a < g). How much mass should be removed from it so that it starts moving upwards with the same acceleration a? [AIPMT 2014]",
    optionA: "2 m a / (g + a)",
    optionB: "2 m a / (g - a)",
    optionC: "m a / (g + a)",
    optionD: "m a / (g - a)",
    correctOption: "A",
    explanation: "Step 1: Write equation for descending balloon with mass m under buoyant upthrust F_b:\nm g - F_b = m a\nF_b = m(g - a)  --- (Equation 1)\n\nStep 2: Let mass removed be Δm. New mass becomes (m - Δm).\nThe balloon now ascends with acceleration a under the same buoyant force F_b:\nF_b - (m - Δm) g = (m - Δm) a  --- (Equation 2)\n\nStep 3: Substitute F_b from Equation 1 into Equation 2:\nm(g - a) - (m - Δm) g = (m - Δm) a\nm g - m a - m g + Δm g = m a - Δm a\nΔm g + Δm a = 2 m a\nΔm (g + a) = 2 m a\nΔm = (2 m a) / (g + a).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A hot air balloon of mass 500 kg descends with an acceleration of g/4. What mass of ballast must be discharged so that the balloon ascends with an acceleration of g/4? [Same Concept Q]",
      option_a: "100 kg",
      option_b: "200 kg",
      option_c: "250 kg",
      option_d: "150 kg",
      correct_option: "B",
      explanation: "Step 1: Formula for mass to be removed:\nΔm = 2 m a / (g + a)\n\nStep 2: Substitute m = 500 kg and a = g / 4:\nΔm = [2 × 500 × (g / 4)] / [g + g / 4] = [250 g] / [1.25 g] = 200 kg.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 245,
    question: "Three blocks A, B, and C of masses 4 kg, 2 kg, and 1 kg respectively are placed in contact on a frictionless horizontal surface. If a horizontal force of 14 N is applied on the 4 kg block, the contact force between block A and block B is: [AIPMT 2015 Cancelled]",
    optionA: "8 N",
    optionB: "18 N",
    optionC: "2 N",
    optionD: "6 N",
    correctOption: "D",
    explanation: "Step 1: Calculate the common acceleration of the combined three-block system:\nTotal mass M = m_A + m_B + m_C = 4 kg + 2 kg + 1 kg = 7 kg.\nApplied external force F = 14 N.\nAcceleration a = F / M = 14 N / 7 kg = 2 m/s².\n\nStep 2: Analyze the contact force F_AB between block A and block B:\nThe contact force F_AB accelerates the remaining blocks (B and C) together:\nF_AB = (m_B + m_C) × a\n\nStep 3: Substitute the mass values and acceleration:\nF_AB = (2 kg + 1 kg) × 2 m/s² = 3 kg × 2 m/s² = 6 N.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two blocks of masses 6 kg and 4 kg are in contact on a smooth horizontal floor. A push of 30 N is applied horizontally on the 6 kg block towards the 4 kg block. The contact force between the blocks is: [Same Concept Q]",
      option_a: "12 N",
      option_b: "18 N",
      option_c: "15 N",
      option_d: "10 N",
      correct_option: "A",
      explanation: "Step 1: Common acceleration a = F / (m₁ + m₂) = 30 / (6 + 4) = 3 m/s².\n\nStep 2: Contact force accelerates the 4 kg block:\nF_contact = 4 kg × 3 m/s² = 12 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 244,
    question: "A block A of mass m₁ rests on a horizontal table. A light string connected to it passes over a frictionless pulley at the edge of the table and suspends another block B of mass m₂. If μ_k is the coefficient of kinetic friction between block A and the table, the tension in the string when block A slides is: [AIPMT 2015 Cancelled]",
    optionA: "[m₁ m₂ (1 + μ_k) g] / (m₁ + m₂)",
    optionB: "[m₁ m₂ (1 - μ_k) g] / (m₁ + m₂)",
    optionC: "[(m₂ + μ_k m₁) g] / (m₁ + m₂)",
    optionD: "[(m₂ - μ_k m₁) g] / (m₁ + m₂)",
    correctOption: "A",
    explanation: "Step 1: Write the equations of motion for the sliding system with acceleration a:\nFor block B (descending vertically): m₂ g - T = m₂ a  --- (1)\nFor block A (sliding horizontally): T - μ_k m₁ g = m₁ a  --- (2)\n\nStep 2: Multiply equation (1) by m₁ and equation (2) by m₂:\nm₁ m₂ g - m₁ T = m₁ m₂ a\nm₂ T - μ_k m₁ m₂ g = m₁ m₂ a\n\nStep 3: Equate the two left-hand sides:\nm₁ m₂ g - m₁ T = m₂ T - μ_k m₁ m₂ g\nm₁ m₂ g (1 + μ_k) = (m₁ + m₂) T\nT = [m₁ m₂ (1 + μ_k) g] / (m₁ + m₂).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A hanging block of 2 kg pulls a 3 kg block across a table where μ_k = 0.25. If g = 10 m/s², what is the tension in the connecting cord during acceleration? [Same Concept Q]",
      option_a: "12 N",
      option_b: "15 N",
      option_c: "10 N",
      option_d: "18 N",
      correct_option: "B",
      explanation: "Step 1: Use the standard formula:\nT = [m₁ m₂ (1 + μ_k) g] / (m₁ + m₂)\n\nStep 2: Substitute m₁ = 3 kg, m₂ = 2 kg, μ_k = 0.25, g = 10 m/s²:\nT = [3 × 2 × (1 + 0.25) × 10] / (3 + 2) = [6 × 1.25 × 10] / 5 = 75 / 5 = 15 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 243,
    question: "A plank with a box on it at one end is gradually raised about the other end. As the angle of inclination with the horizontal reaches 30°, the box starts to slip and slides 4.0 m down the plank in 4.0 s. The coefficients of static and kinetic friction between the box and the plank are respectively: (Take g = 10 m/s²) [AIPMT 2015]",
    optionA: "0.5 and 0.6",
    optionB: "0.4 and 0.3",
    optionC: "0.6 and 0.6",
    optionD: "0.6 and 0.5",
    correctOption: "D",
    explanation: "Step 1: Calculate the coefficient of static friction from angle of repose (θ = 30°):\nμ_s = tan θ = tan(30°) = 1 / √3 ≈ 0.577 ≈ 0.6.\n\nStep 2: Determine acceleration a during the sliding phase:\nInitial speed u = 0, distance s = 4.0 m, time t = 4.0 s.\ns = u t + (1/2) a t²\n4.0 = 0 + (1/2) × a × (4.0)²\n4.0 = 8 a → a = 0.5 m/s².\n\nStep 3: Acceleration on an inclined plane with kinetic friction:\na = g(sin θ - μ_k cos θ)\n0.5 = 10(sin 30° - μ_k cos 30°)\n0.5 = 10(0.5 - 0.866 μ_k)\n0.05 = 0.5 - 0.866 μ_k\n0.866 μ_k = 0.45\nμ_k = 0.45 / 0.866 ≈ 0.519 ≈ 0.5.\n\nStep 4: Thus, μ_s ≈ 0.6 and μ_k ≈ 0.5.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An object placed on an adjustable ramp begins to slide when the incline angle is 37°. If the coefficient of static friction is tan(37°) ≈ 0.75, what is its expected value? [Same Concept Q]",
      option_a: "0.60",
      option_b: "0.75",
      option_c: "0.80",
      option_d: "0.50",
      correct_option: "B",
      explanation: "Step 1: The coefficient of static friction equals the tangent of the angle of repose:\nμ_s = tan(θ_repose)\n\nStep 2: Given θ = 37°:\nμ_s = tan(37°) = 3 / 4 = 0.75.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 242,
    question: "Two stones of masses m and 2m are whirled in horizontal circles, the heavier one along a circle of radius r/2 and the lighter one along a circle of radius r. The tangential speed of the lighter stone is n times that of the heavier stone when they experience the same centripetal force. The value of n is: [AIPMT 2015]",
    optionA: "4",
    optionB: "1",
    optionC: "2",
    optionD: "3",
    correctOption: "C",
    explanation: "Step 1: Centripetal force formula:\nF_c = (m v²) / r.\n\nStep 2: For the lighter stone (mass m, radius r, speed v₁):\nF_c₁ = (m v₁²) / r.\n\nStep 3: For the heavier stone (mass 2m, radius r/2, speed v₂):\nF_c₂ = [2m × v₂²] / (r / 2) = (4m v₂²) / r.\n\nStep 4: Equating the two centripetal forces (F_c₁ = F_c₂):\n(m v₁²) / r = (4m v₂²) / r\nv₁² = 4 v₂²\nv₁ = 2 v₂.\n\nStep 5: Given v₁ = n v₂, we find n = 2.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two bodies of masses M and 4M revolve in circular tracks of radii R and R/4 respectively under equal centripetal forces. The ratio of the speed of the lighter body to that of the heavier body is: [Same Concept Q]",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "4 : 1",
      option_d: "1 : 2",
      correct_option: "C",
      explanation: "Step 1: For the lighter body: F₁ = M v₁² / R.\nFor the heavier body: F₂ = 4M v₂² / (R/4) = 16 M v₂² / R.\n\nStep 2: Given F₁ = F₂:\nM v₁² / R = 16 M v₂² / R → v₁² = 16 v₂² → v₁ / v₂ = 4.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 241,
    question: "A car is negotiating a curved road of radius R. The road is banked at an angle θ. If the coefficient of friction between the tyres of the car and the road is μ_s, the maximum safe velocity on this road is: [NEET 2016 Phase 1]",
    optionA: "√[(g / R) (μ_s + tan θ) / (1 - μ_s tan θ)]",
    optionB: "√[(g / R²) (μ_s + tan θ) / (1 - μ_s tan θ)]",
    optionC: "√[g R² (μ_s + tan θ) / (1 - μ_s tan θ)]",
    optionD: "√[g R (μ_s + tan θ) / (1 - μ_s tan θ)]",
    correctOption: "D",
    explanation: "Step 1: Set up equilibrium along vertical and horizontal axes for maximum speed v_max without skidding outward:\nAt v_max, limiting friction f_s = μ_s N acts down the inclined banking.\n\nStep 2: Resolving forces:\nVertical equilibrium: N cos θ - f_s sin θ = m g → N (cos θ - μ_s sin θ) = m g\nRadial centripetal force: N sin θ + f_s cos θ = (m v_max²) / R → N (sin θ + μ_s cos θ) = (m v_max²) / R\n\nStep 3: Divide the horizontal equation by the vertical equation:\n(sin θ + μ_s cos θ) / (cos θ - μ_s sin θ) = v_max² / (R g)\nDivide numerator and denominator of LHS by cos θ:\n(tan θ + μ_s) / (1 - μ_s tan θ) = v_max² / (R g)\n\nStep 4: Solve for v_max:\nv_max = √[g R (μ_s + tan θ) / (1 - μ_s tan θ)].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "On a frictionless banked turn of radius R inclined at angle θ, the optimum design speed v₀ is given by: [Same Concept Q]",
      option_a: "√(g R tan θ)",
      option_b: "√(g R sin θ)",
      option_c: "g R tan θ",
      option_d: "√(g R / tan θ)",
      correct_option: "A",
      explanation: "Step 1: For a frictionless turn (μ_s = 0):\nN sin θ = m v₀² / R\nN cos θ = m g\n\nStep 2: Divide the two equations:\ntan θ = v₀² / (R g) → v₀ = √(g R tan θ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 240,
    question: "Two blocks A and B of masses 3m and m respectively are connected by a massless and inextensible string. The whole system is suspended by a massless spring. The magnitudes of acceleration of A and B immediately after the string is cut are respectively: [NEET 2017]",
    optionA: "g / 3, g",
    optionB: "g, g",
    optionC: "g / 3, g / 3",
    optionD: "g, g / 3",
    correctOption: "A",
    explanation: "Step 1: Initial state of equilibrium before the string is cut:\n- Tension in string connecting A and B: T = m_B × g = m g.\n- Upward force exerted by the spring: F_spring = (m_A + m_B) g = (3m + m) g = 4m g.\n\nStep 2: Immediately after the string is cut:\n- The tension in the string drops instantly to zero (T = 0).\n- The spring force cannot change instantaneously, so F_spring remains 4m g upwards.\n\nStep 3: Calculate acceleration of block B:\nOnly gravity acts on block B:\nF_net,B = m g downwards\na_B = (m g) / m = g (downwards).\n\nStep 4: Calculate acceleration of block A:\nNet force on block A: F_net,A = F_spring - m_A g = 4m g - 3m g = m g upwards.\na_A = (m g) / (3m) = g / 3 (upwards).\n\nStep 5: The magnitudes are g / 3 and g respectively.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two masses 2m and m are connected by a cord and hung from a spring in static equilibrium. When the cord between them is severed, the instantaneous acceleration of mass 2m is: [Same Concept Q]",
      option_a: "g",
      option_b: "g / 2",
      option_c: "2g",
      option_d: "g / 3",
      correct_option: "B",
      explanation: "Step 1: Spring force initially = (2m + m)g = 3mg.\n\nStep 2: Immediately after cut, net force on mass 2m:\nF_net = F_spring - (2m)g = 3mg - 2mg = mg (upward).\n\nStep 3: Acceleration of 2m:\na = mg / (2m) = g / 2.\n\nTherefore, Option (B) is the correct answer."
    }
  }
];

