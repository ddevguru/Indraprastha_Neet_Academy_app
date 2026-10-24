const fs = require('fs');

const set6Part4Updates = [
  {
    id: 6263, // Q151
    similar_question: {
      question: "A bullet of mass 0.02 kg is fired horizontally with a muzzle speed of 300 m/s from a rifle of mass 4 kg resting on a smooth surface. What is the recoil speed of the rifle?",
      option_a: "1.5 m/s",
      option_b: "3.0 m/s",
      option_c: "0.75 m/s",
      option_d: "2.0 m/s",
      correct_option: "A",
      explanation: "Step 1: By conservation of linear momentum: m_bullet × v_bullet + M_rifle × v_recoil = 0.\nStep 2: v_recoil = (m_bullet × v_bullet) / M_rifle = (0.02 kg × 300 m/s) / 4 kg = 6 / 4 = 1.5 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6264, // Q152
    similar_question: {
      question: "A heavy uniform cylinder of weight W = 60 N rests in equilibrium in a symmetric V-shaped trough whose sides make angles of 30° and 60° with the horizontal respectively. What is the normal reaction force exerted on the cylinder by the side inclined at 30° to the horizontal?",
      option_a: "30 N",
      option_b: "30√3 N ≈ 52 N",
      option_c: "60 N",
      option_d: "15 N",
      correct_option: "A",
      explanation: "Step 1: The two planes are mutually perpendicular because 30° + 60° = 90°.\nStep 2: The normal to the 30° incline makes 30° with vertical, and the normal to the 60° incline makes 60° with vertical.\nStep 3: Resolving forces perpendicular to the 60° incline gives: N₁ = W sin 30° = 60 × 0.5 = 30 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6265, // Q153
    similar_question: {
      question: "A block of mass m is attached between two collinear horizontal springs of stiffnesses k₁ and k₂ anchored to fixed walls. If the block is displaced by a distance x from its equilibrium position, what is the net restoring force magnitude acting on the block?",
      option_a: "(k₁ + k₂) x",
      option_b: "(k₁ − k₂) x",
      option_c: "(k₁ k₂ / (k₁ + k₂)) x",
      option_d: "k₁ x",
      correct_option: "A",
      explanation: "Step 1: Displacing the mass by x compresses one spring by x (force k₁ x) and extends the other by x (force k₂ x).\nStep 2: Both forces act in the same direction, opposing the displacement.\nStep 3: Net restoring force = k₁ x + k₂ x = (k₁ + k₂) x.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6266, // Q154
    similar_question: {
      question: "A uniform flexible rope of mass M and length L hangs partially over the smooth edge of a horizontal table. If released from rest, the acceleration of the rope as a function of the hanging length y is:",
      option_a: "(y / L) g",
      option_b: "g",
      option_c: "(y / 2L) g",
      option_d: "(1 − y/L) g",
      correct_option: "A",
      explanation: "Step 1: The hanging mass is m_hang = (y / L) M.\nStep 2: Pulling downward force = m_hang g = (y / L) M g.\nStep 3: Total mass being accelerated is M. Acceleration a = [(y / L) M g] / M = (y / L) g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6267, // Q155
    similar_question: {
      question: "In an ideal pulley system, which of the following properties holds true for a massless, inextensible string passing over a frictionless, massless pulley?",
      option_a: "The tension is uniform throughout the entire length of the continuous string segment",
      option_b: "The tension on one side is always greater than the other side",
      option_c: "The tension depends on the linear mass density of the string",
      option_d: "The acceleration of the string changes instantaneously along its length",
      correct_option: "A",
      explanation: "Step 1: For a massless string (m = 0), net force on any element F = m a = 0, so tension is constant along any segment.\nStep 2: Since the pulley has zero friction and zero inertia, no torque is required to rotate it, meaning tension remains identical across the pulley.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6268, // Q156
    similar_question: {
      question: "Two identical smooth spheres, each of weight W and radius r = 5 cm, are placed inside a smooth vertical cylinder of radius R = 8 cm. What is the magnitude of the horizontal reaction force exerted by the vertical cylinder wall on each sphere?",
      option_a: "0.75 W",
      option_b: "1.25 W",
      option_c: "0.50 W",
      option_d: "1.00 W",
      correct_option: "A",
      explanation: "Step 1: Distance between centers = 2r = 10 cm. Horizontal separation between centers = 2R − 2r = 16 − 10 = 6 cm.\nStep 2: Let θ be the angle with horizontal: cos θ = 6 / 10 = 0.6  →  sin θ = 0.8.\nStep 3: Vertical equilibrium of top sphere: N_contact sin θ = W  →  N_contact = W / 0.8 = 1.25 W.\nWall reaction N_wall = N_contact cos θ = 1.25 W × 0.6 = 0.75 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6269, // Q157
    similar_question: {
      question: "A weight W is suspended by two symmetrical cables attached to a ceiling. The tension in either cable is minimized when the angle θ that each cable makes with the vertical is:",
      option_a: "0° (vertical)",
      option_b: "45°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: Vertical equilibrium: 2 T cos θ = W  →  T = W / (2 cos θ).\nStep 2: T is minimized when cos θ is maximized.\nStep 3: The maximum value of cos θ is 1, which occurs at θ = 0° (cables hang straight down vertically).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6270, // Q158
    similar_question: {
      question: "Two blocks A and B, each of mass 2 kg, are pushed along a smooth horizontal surface. In which of the following arrangements is the contact force between blocks A and B the greatest?",
      option_a: "A force of 40 N pushes block A which pushes block B",
      option_b: "A force of 40 N pushes block B which pulls block A",
      option_c: "A force of 20 N pushes block A which pushes block B",
      option_d: "Both blocks move at a constant velocity of 10 m/s",
      correct_option: "A",
      explanation: "Step 1: In Option A: Acceleration a = 40 / (2 + 2) = 10 m/s². Contact force on block B: N = m_B × a = 2 × 10 = 20 N.\nStep 2: In Option C: a = 20 / 4 = 5 m/s², N = 10 N.\nStep 3: In Option D: a = 0, so contact force is zero. Option A yields the maximum contact force of 20 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6271, // Q159
    similar_question: {
      question: "A heavy uniform rope has one end fastened to a vertical ceiling. The lower end is pulled horizontally by a force F = 30 N until the upper end makes an angle of 45° with the vertical. What is the total mass of the rope? (Take g = 10 m/s²)",
      option_a: "3.0 kg",
      option_b: "1.5 kg",
      option_c: "4.5 kg",
      option_d: "6.0 kg",
      correct_option: "A",
      explanation: "Step 1: At the top support, the tangent to the rope makes angle θ = 45° with the vertical.\nStep 2: Equilibrium of rope as a whole: tan θ = F_horizontal / (M g) = F / (M g).\nStep 3: tan 45° = 1  →  1 = 30 / (10 M)  →  M = 3.0 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6272, // Q160
    similar_question: {
      question: "A uniform chain of total length 2L and total mass M is draped symmetrically over a small, smooth peg so that both ends hang at length L. If the chain is displaced vertically by a small distance x so one side has length L + x and the other L − x, what is the initial acceleration of the chain?",
      option_a: "(x / L) g",
      option_b: "(2x / L) g",
      option_c: "(x / 2L) g",
      option_d: "g",
      correct_option: "A",
      explanation: "Step 1: Unbalanced length = (L + x) − (L − x) = 2x.\nStep 2: Net accelerating downward force = (2x / 2L) M g = (x / L) M g.\nStep 3: Total mass = M. Acceleration a = [(x / L) M g] / M = (x / L) g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6273, // Q161
    similar_question: {
      question: "A block of mass m is suspended in equilibrium between two vertical springs: an upper spring under tension and a lower spring under compression. When the upper spring is suddenly cut, the block accelerates downwards at 7 m/s². What will be the magnitude and direction of the block's acceleration if instead the lower spring is suddenly cut? (Take g = 10 m/s²)",
      option_a: "7 m/s² upwards",
      option_b: "3 m/s² upwards",
      option_c: "7 m/s² downwards",
      option_d: "3 m/s² downwards",
      correct_option: "A",
      explanation: "Step 1: Initial equilibrium: T_upper − T_lower − m g = 0.\nStep 2: Cutting upper spring leaves downward force: T_lower + m g = m a₁ = 7 m.\nStep 3: If lower spring is cut instead, upward force is T_upper − m g. From equilibrium, T_upper − m g = T_lower + m g = 7 m. Thus acceleration is 7 m/s² directed upwards.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6274, // Q162
    similar_question: {
      question: "In setup A, a block of mass m is suspended from a ceiling by a single light vertical cord. In setup B, the same block is supported by two symmetrical cords each making an angle of 60° with the vertical. What is the ratio of tension in the cord of setup A to the tension in each cord of setup B?",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "√3 : 1",
      correct_option: "A",
      explanation: "Step 1: In setup A: T_A = m g.\nStep 2: In setup B: 2 T_B cos 60° = m g  →  2 T_B (0.5) = m g  →  T_B = m g.\nStep 3: Ratio T_A / T_B = m g / m g = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6275, // Q163
    similar_question: {
      question: "In a pulley system on a frictionless horizontal table, a force F = 24 N accelerates three connected blocks of masses 2 kg, 4 kg, and 6 kg. What is the acceleration of the 6 kg block?",
      option_a: "2.0 m/s²",
      option_b: "4.0 m/s²",
      option_c: "1.5 m/s²",
      option_d: "3.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Total mass = 2 + 4 + 6 = 12 kg.\nStep 2: Because the blocks are tied together, they share the same common acceleration: a = F / M_total = 24 / 12 = 2.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6276, // Q164
    similar_question: {
      question: "A load of 5 kg hangs in static equilibrium from a junction of three light cables. If cable 3 is vertical and directly holds the 5 kg mass, what is the tension T₃? (Take g = 9.8 m/s²)",
      option_a: "49.0 N",
      option_b: "50.0 N",
      option_c: "39.2 N",
      option_d: "98.0 N",
      correct_option: "A",
      explanation: "Step 1: For the hanging mass in static equilibrium, upward tension balances gravity: T₃ = m g.\nStep 2: T₃ = 5 kg × 9.8 m/s² = 49.0 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6277, // Q165
    similar_question: {
      question: "Two cords support a junction carrying a vertical load of 100 N. If the tensions in the two cords are found to be T₁ = 60 N and T₂ = 80 N, what is the sum (T₁ + T₂)?",
      option_a: "140 N",
      option_b: "100 N",
      option_c: "120 N",
      option_d: "160 N",
      correct_option: "A",
      explanation: "Step 1: The scalar arithmetic sum of tensions is T₁ + T₂ = 60 N + 80 N = 140 N.\nStep 2: Notice that because the strings are perpendicular, their vector resultant √(60² + 80²) = 100 N balances the 100 N load.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6278, // Q166
    similar_question: {
      question: "In an Atwood machine, block A of mass 3 kg and block B of mass 5 kg are suspended by a light string over a frictionless pulley. If released from rest from a height of 2.5 m above the ground, what is the acceleration of the blocks? (Take g = 10 m/s²)",
      option_a: "2.5 m/s²",
      option_b: "5.0 m/s²",
      option_c: "1.25 m/s²",
      option_d: "2.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Atwood machine acceleration: a = [(m_B − m_A) / (m_A + m_B)] g.\nStep 2: Substitute m_A = 3 kg, m_B = 5 kg, g = 10 m/s²: a = [(5 − 3) / (5 + 3)] × 10 = (2 / 8) × 10 = 2.5 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6279, // Q167
    similar_question: {
      question: "A light string passes over an ideal massless pulley. One end is tied to a 10 kg mass resting on a smooth horizontal table, and the other end hangs vertically supporting a 10 kg mass. What is the acceleration of the system? (Take g = 10 m/s²)",
      option_a: "5.0 m/s²",
      option_b: "10.0 m/s²",
      option_c: "2.5 m/s²",
      option_d: "0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Pulling force is the weight of the hanging block: F = 10 × 10 = 100 N.\nStep 2: Total mass accelerating = 10 + 10 = 20 kg.\nStep 3: Acceleration a = 100 N / 20 kg = 5.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6280, // Q168
    similar_question: {
      question: "Three blocks of equal mass m are connected in series by strings 1, 2, and 3, and accelerated horizontally by pulling string 3 with a force F. If string 1 connects the rearmost block to the middle block, string 2 connects middle to front, and string 3 pulls the front block, what is the correct relation among tensions T₁, T₂, and T₃?",
      option_a: "T₃ > T₂ > T₁",
      option_b: "T₁ > T₂ > T₃",
      option_c: "T₁ = T₂ = T₃",
      option_d: "T₂ > T₁ > T₃",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = F / (3m).\nStep 2: T₁ accelerates 1 block: T₁ = m a. T₂ accelerates 2 blocks: T₂ = 2 m a. T₃ accelerates 3 blocks: T₃ = 3 m a = F.\nStep 3: Therefore, T₃ > T₂ > T₁.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6281, // Q169
    similar_question: {
      question: "A 4 kg block rests on a smooth 30° incline and is connected by a light string over a frictionless pulley to a 6 kg hanging mass. When the 6 kg mass is released from rest, what is the tension in the string? (Take g = 10 m/s², sin 30° = 0.5)",
      option_a: "36 N",
      option_b: "40 N",
      option_c: "24 N",
      option_d: "60 N",
      correct_option: "A",
      explanation: "Step 1: Net accelerating force = m_hang g − m_incline g sin 30° = (6 × 10) − (4 × 10 × 0.5) = 60 − 20 = 40 N.\nStep 2: Common acceleration a = 40 / (4 + 6) = 4 m/s².\nStep 3: Tension T = m_hang (g − a) = 6 × (10 − 4) = 36 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6282, // Q170
    similar_question: {
      question: "In an ideal Atwood machine with two unequal masses m₁ and m₂ (m₁ > m₂ > 0), the acceleration of the system is ALWAYS:",
      option_a: "Strictly between 0 and g",
      option_b: "Equal to g",
      option_c: "Greater than g",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The Atwood acceleration formula is a = [(m₁ − m₂) / (m₁ + m₂)] g.\nStep 2: For positive and distinct masses m₁ > m₂ > 0, the ratio (m₁ − m₂) / (m₁ + m₂) lies strictly in the open interval (0, 1).\nStep 3: Multiplying by g gives 0 < a < g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6283, // Q171
    similar_question: {
      question: "Two blocks of masses 2 kg and 4 kg are placed on a smooth incline of angle 30° and connected by a light taut cord. When released from rest, what is the tension in the cord?",
      option_a: "0 N",
      option_b: "10 N",
      option_c: "20 N",
      option_d: "30 N",
      correct_option: "A",
      explanation: "Step 1: On a frictionless incline, every mass accelerates down at the same rate: a = g sin 30° = 5 m/s².\nStep 2: Since both blocks accelerate identically without needing any external constraint, the cord remains unstrained.\nStep 3: Hence, the tension in the cord is 0 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6284, // Q172
    similar_question: {
      question: "A ring A slides along a horizontal rod and is connected to a light cord passing through a fixed small ring at height h above the rod. If the other end of the cord is pulled with a constant speed v, what is the speed of ring A when the cord makes an angle θ with the horizontal?",
      option_a: "v / cos θ",
      option_b: "v cos θ",
      option_c: "v / sin θ",
      option_d: "v sin θ",
      correct_option: "A",
      explanation: "Step 1: Let x be the position of the ring and L be cord length: x² + h² = L².\nStep 2: Differentiating: 2 x dx/dt = 2 L dL/dt  →  x v_A = L v.\nStep 3: Since x / L = cos θ, we get v_A cos θ = v  →  v_A = v / cos θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6285, // Q173
    similar_question: {
      question: "A block of mass 3 kg hanging vertically accelerates a 2 kg block resting on a smooth horizontal table via a cord passing over a pulley. If the 2 kg block starts from rest at a distance of 3 m from the pulley, how long does it take to reach the pulley? (Take g = 10 m/s²)",
      option_a: "1.0 s",
      option_b: "2.0 s",
      option_c: "1.5 s",
      option_d: "0.5 s",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = (m_hang g) / (m_table + m_hang) = (3 × 10) / (2 + 3) = 6 m/s².\nStep 2: Kinematics from rest: s = (1/2) a t²  →  3 = (1/2) × 6 × t² = 3 t².\nStep 3: t² = 1  →  t = 1.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6286, // Q174
    similar_question: {
      question: "Two masses m₁ and m₂ are connected by a light string over a frictionless apex pulley resting on a double incline with angles 30° and 60° to the horizontal respectively. If the system is in static equilibrium on frictionless surfaces, what is the ratio m₁ / m₂?",
      option_a: "√3 : 1",
      option_b: "1 : √3",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: For equilibrium without friction: m₁ g sin 30° = m₂ g sin 60°.\nStep 2: m₁ (1/2) = m₂ (√3 / 2)  →  m₁ = √3 m₂.\nStep 3: Ratio m₁ / m₂ = √3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6287, // Q175
    similar_question: {
      question: "In a system of three blocks connected by light strings over frictionless pulleys, if block B rests on a horizontal table between two identical hanging blocks A and C of equal mass m each, what is the net acceleration of the system?",
      option_a: "0 m/s²",
      option_b: "g / 3",
      option_c: "g / 2",
      option_d: "g",
      correct_option: "A",
      explanation: "Step 1: Hanging block A pulls left with force m g, while hanging block C pulls right with equal force m g.\nStep 2: Net driving force = m g − m g = 0.\nStep 3: Since net external driving force is zero, the acceleration of the system is 0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6288, // Q176
    similar_question: {
      question: "An observer is inside a car accelerating east at 4 m/s². As observed from this non-inertial frame, what is the pseudo force acting on a passenger of mass 70 kg sitting in another car?",
      option_a: "280 N directed West",
      option_b: "280 N directed East",
      option_c: "700 N directed Downward",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The pseudo force in a non-inertial frame with acceleration 'a' is F_pseudo = − m a.\nStep 2: Magnitude = 70 kg × 4 m/s² = 280 N.\nStep 3: Direction is strictly opposite to the frame's acceleration (West).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6289, // Q177
    similar_question: {
      question: "A chain composed of geometric links of masses M, M/2, M/4, M/8, ... is pulled with total force F on a frictionless surface. What is the net accelerating force on the second link?",
      option_a: "F / 4",
      option_b: "F / 2",
      option_c: "F / 8",
      option_d: "F",
      correct_option: "A",
      explanation: "Step 1: Total mass M_total = M + M/2 + M/4 + ... = M / (1 − 1/2) = 2M.\nStep 2: Acceleration a = F / (2M).\nStep 3: Net force on second link of mass (M/2): F₂ = m₂ a = (M/2) × [F / (2M)] = F / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6290, // Q178
    similar_question: {
      question: "A helicopter flies horizontally at constant velocity. It experiences gravity (downward), aerodynamic drag (backward), and rotor lift. What must be the direction of the rotor lift force?",
      option_a: "Tilted forward and upward to balance both gravity and drag",
      option_b: "Strictly vertically upward",
      option_c: "Tilted backward and upward",
      option_d: "Strictly horizontal",
      correct_option: "A",
      explanation: "Step 1: At constant velocity, net force is zero: F_lift + F_drag + F_gravity = 0.\nStep 2: Gravity acts downward and drag acts backward.\nStep 3: Hence, rotor lift must tilt forward (to oppose drag) and upward (to oppose gravity).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6291, // Q179
    similar_question: {
      question: "A monkey of mass 20 kg climbs up a light rope passing over a frictionless ceiling pulley, with a 30 kg counterweight resting on the ground at the other end. What minimum upward acceleration must the monkey climb with so that the counterweight is lifted off the ground? (Take g = 10 m/s²)",
      option_a: "5.0 m/s²",
      option_b: "2.5 m/s²",
      option_c: "10.0 m/s²",
      option_d: "7.5 m/s²",
      correct_option: "A",
      explanation: "Step 1: To lift the 30 kg weight, rope tension must satisfy T ≥ 30 × 10 = 300 N.\nStep 2: For the climbing monkey, tension is T = m (g + a) = 20 (10 + a).\nStep 3: 20 (10 + a) ≥ 300  →  10 + a ≥ 15  →  a ≥ 5.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6292, // Q180
    similar_question: {
      question: "An elevator descends with downward acceleration 'a'. A passenger of mass M stands on a scale inside and notices that the apparent weight displayed is only 0.2 M g. What is the downward acceleration of the elevator?",
      option_a: "0.8 g",
      option_b: "0.2 g",
      option_c: "0.5 g",
      option_d: "g",
      correct_option: "A",
      explanation: "Step 1: In a descending elevator, apparent weight is N = M (g − a).\nStep 2: Given N = 0.2 M g, we have 0.2 M g = M (g − a).\nStep 3: g − a = 0.2 g  →  a = 0.8 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6293, // Q181
    similar_question: {
      question: "When a walking person pushes backward against the ground with their shoes, what is the direction and nature of the force exerted by the ground on the shoes that propels the person forward?",
      option_a: "Static friction directed forward",
      option_b: "Kinetic friction directed backward",
      option_c: "Normal reaction directed forward",
      option_d: "Gravitational force directed forward",
      correct_option: "A",
      explanation: "Step 1: The foot pushes backward against the ground.\nStep 2: By Newton's third law, the ground exerts an equal and opposite reaction force pushing forward on the foot.\nStep 3: Since there is no relative slipping between shoe sole and ground during normal stride, this propelling force is static friction directed forward.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6294, // Q182
    similar_question: {
      question: "A crate rests on the flat bed of a truck. If the coefficient of static friction between the crate and the bed is μₛ = 0.3, what is the maximum acceleration the truck can undergo without the crate slipping? (Take g = 10 m/s²)",
      option_a: "3.0 m/s²",
      option_b: "2.0 m/s²",
      option_c: "4.5 m/s²",
      option_d: "1.5 m/s²",
      correct_option: "A",
      explanation: "Step 1: Maximum static friction is f_max = μₛ m g.\nStep 2: To prevent backward slipping: m a_max ≤ μₛ m g  →  a_max = μₛ g.\nStep 3: a_max = 0.3 × 10 = 3.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6295, // Q183
    similar_question: {
      question: "A block of mass 5 kg rests on a floor. An upward-pulling force F = 8 t (in Newtons, where t is in seconds) is applied vertically to the block. At what time t will the block lose contact with the floor? (Take g = 10 m/s²)",
      option_a: "6.25 s",
      option_b: "5.00 s",
      option_c: "8.00 s",
      option_d: "10.00 s",
      correct_option: "A",
      explanation: "Step 1: Normal force N = m g − F. The block loses contact when N = 0.\nStep 2: F = m g  →  8 t = 5 × 10 = 50 N.\nStep 3: t = 50 / 8 = 6.25 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6296, // Q184
    similar_question: {
      question: "A block of mass 6 kg is placed on an incline of angle 30° with the horizontal. The coefficient of static friction is μₛ = 0.7. What is the frictional force acting on the block? (Take g = 10 m/s², sin 30° = 0.5, cos 30° = 0.866)",
      option_a: "30 N",
      option_b: "36.4 N",
      option_c: "42 N",
      option_d: "60 N",
      correct_option: "A",
      explanation: "Step 1: Driving component down the incline: F_pull = m g sin 30° = 6 × 10 × 0.5 = 30 N.\nStep 2: Maximum limiting static friction: f_max = μₛ m g cos 30° = 0.7 × 6 × 10 × 0.866 ≈ 36.4 N.\nStep 3: Since F_pull (30 N) < f_max (36.4 N), the block is at rest and static friction exactly balances the driving force: f_s = 30 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6297, // Q185
    similar_question: {
      question: "A block of mass 4 kg slides down a rough incline of angle 37° at a constant speed of 2 m/s. What is the frictional force exerted by the incline on the block? (Take g = 10 m/s², sin 37° = 0.6)",
      option_a: "24 N",
      option_b: "32 N",
      option_c: "40 N",
      option_d: "16 N",
      correct_option: "A",
      explanation: "Step 1: Because the speed is constant, acceleration a = 0.\nStep 2: Along the incline, kinetic friction must balance the downhill component of gravity: f_k = m g sin 37°.\nStep 3: f_k = 4 × 10 × 0.6 = 24 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6298, // Q186
    similar_question: {
      question: "A block of mass 10 kg is placed on a rough wedge inclined at 30° to the horizontal. If the coefficient of static friction is μₛ = 0.8, what is the magnitude of the frictional force acting on the block? (Take g = 10 m/s², sin 30° = 0.5, cos 30° = 0.866)",
      option_a: "50 N",
      option_b: "69.3 N",
      option_c: "80 N",
      option_d: "100 N",
      correct_option: "A",
      explanation: "Step 1: Gravitational pull down the incline: F_pull = m g sin 30° = 10 × 10 × 0.5 = 50 N.\nStep 2: Maximum static friction: f_max = μₛ m g cos 30° = 0.8 × 10 × 10 × 0.866 = 69.3 N.\nStep 3: Since F_pull < f_max, the block remains stationary and static friction equals 50 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6299, // Q187
    similar_question: {
      question: "A rectangular brick of mass m is placed on an inclined plane first resting on its largest face, and then on its smallest face. How does the maximum limiting friction force compare between the two orientations?",
      option_a: "The limiting friction is identical in both orientations because friction is independent of apparent contact area",
      option_b: "The limiting friction is greater on the larger face",
      option_c: "The limiting friction is greater on the smaller face",
      option_d: "Friction depends inversely on surface area",
      correct_option: "A",
      explanation: "Step 1: By Amontons' laws of friction, limiting friction f_max = μ N depends only on the nature of materials (μ) and normal force (N).\nStep 2: For both orientations, N = m g cos θ is identical.\nStep 3: Hence, limiting friction is completely independent of the nominal contact area.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6300, // Q188
    similar_question: {
      question: "A block of mass 5 kg rests on a rough 30° incline (μₛ = 0.4) and is connected over a frictionless pulley to a hanging mass of 1 kg. What is the magnitude of the static friction force acting on the 5 kg block? (Take g = 10 m/s², sin 30° = 0.5, cos 30° = 0.866)",
      option_a: "15 N acting up the incline",
      option_b: "25 N acting up the incline",
      option_c: "17.3 N acting down the incline",
      option_d: "10 N acting down the incline",
      correct_option: "A",
      explanation: "Step 1: Downward component of 5 kg weight: 5 × 10 × sin 30° = 25 N.\nStep 2: Upward cord tension: T = 1 × 10 = 10 N.\nStep 3: Unbalanced downhill tendency: 25 − 10 = 15 N.\nMaximum static friction: f_max = 0.4 × 5 × 10 × 0.866 ≈ 17.3 N. Since 15 N < 17.3 N, static friction balances the tendency with 15 N acting up the incline.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6301, // Q189
    similar_question: {
      question: "A block sliding down a 45° rough inclined plane takes twice as much time to cover the same distance as it does on an identical frictionless inclined plane. What is the coefficient of kinetic friction μₖ between the block and the rough incline?",
      option_a: "0.75",
      option_b: "0.50",
      option_c: "0.25",
      option_d: "0.33",
      correct_option: "A",
      explanation: "Step 1: Distance s = (1/2) a t²  →  t ∝ 1 / √a.\nStep 2: Given t_rough = 2 t_smooth, we have a_rough / a_smooth = (1 / 2)² = 1 / 4.\nStep 3: On a 45° incline, a_smooth = g sin 45° and a_rough = g (sin 45° − μₖ cos 45°) = g sin 45° (1 − μₖ).\nTherefore, 1 − μₖ = 1 / 4  →  μₖ = 1 − 0.25 = 0.75.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart4() {
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

    console.log(`Starting update of Part 4 (${set6Part4Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set6Part4Updates) {
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
        console.log(`[${successCount}/${set6Part4Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Part 4 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart4();
