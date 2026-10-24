const fs = require('fs');

const set6Part1Updates = [
  {
    id: 2747, // Q1
    similar_question: {
      question: "A uniform sphere weighing 20 N rests in a symmetrical V-shaped smooth groove whose walls make an angle of 60° with each other. What is the normal reaction force exerted by each wall on the sphere?",
      option_a: "20 N",
      option_b: "10 N",
      option_c: "20 / √3 N",
      option_d: "10√3 N",
      correct_option: "A",
      explanation: "Step 1: Symmetry of the groove:\nThe V-groove angle is 60°, so each wall is inclined at 30° to the vertical.\nThe normal reaction from each wall is directed perpendicular to the wall, making an angle of 30° with the horizontal (or 60° with the downward vertical).\n\nStep 2: Vertical equilibrium:\n2 N sin 30° = W\n2 N (1/2) = 20 N  →  N = 20 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2748, // Q2
    similar_question: {
      question: "A man of mass 50 kg stands on a platform of mass 20 kg. He pulls on a light rope passing over a frictionless pulley attached to the ceiling. What pulling force F must he exert on the rope to keep the platform stationary?",
      option_a: "350 N",
      option_b: "700 N",
      option_c: "500 N",
      option_d: "250 N",
      correct_option: "A",
      explanation: "Step 1: Total mass of the system (man + platform):\nM_total = 50 kg + 20 kg = 70 kg.\nWeight W = M_total × g = 70 × 10 = 700 N.\n\nStep 2: Upward tension forces:\nThe two vertical segments of the rope support the system:\n2 T = W  →  2 T = 700 N  →  T = 350 N.\n\nStep 3: The pulling force exerted by the man equals the rope tension:\nF = T = 350 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2749, // Q3
    similar_question: {
      question: "In an ideal block-and-tackle pulley system with two supporting rope segments, what force F must be applied to hold a suspended load of mass 24 kg in static equilibrium? (Take g = 10 m/s²)",
      option_a: "120 N",
      option_b: "240 N",
      option_c: "60 N",
      option_d: "480 N",
      correct_option: "A",
      explanation: "Step 1: Weight of suspended load: W = m g = 24 × 10 = 240 N.\n\nStep 2: Two supporting strands share the load in static equilibrium:\n2 T = W  →  2 T = 240 N  →  T = 120 N.\n\nStep 3: The applied force F equals tension T = 120 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2750, // Q4
    similar_question: {
      question: "A wedge of mass M rests on a smooth horizontal floor. A block of mass m is placed on its smooth incline of angle θ. What horizontal acceleration 'a' must be imparted to the wedge so that the block remains stationary relative to the wedge?",
      option_a: "g tan θ",
      option_b: "g sin θ",
      option_c: "g cos θ",
      option_d: "g cot θ",
      correct_option: "A",
      explanation: "Step 1: In the non-inertial frame of the wedge (accelerating with 'a' horizontally), a pseudo force m a acts horizontally backward on the block.\n\nStep 2: Balance forces along the inclined plane:\nm a cos θ = m g sin θ.\n\nStep 3: Solve for 'a':\na = g (sin θ / cos θ) = g tan θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2751, // Q5
    similar_question: {
      question: "Two blocks of masses 3 kg and 5 kg are connected by a light inextensible string passing over a frictionless, massless pulley. Taking g = 10 m/s², what is the acceleration of the system?",
      option_a: "2.5 m/s²",
      option_b: "1.25 m/s²",
      option_c: "5.0 m/s²",
      option_d: "10.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Formula for acceleration in a standard Atwood machine:\na = [(m₂ − m₁) / (m₁ + m₂)] × g.\n\nStep 2: Substitute m₁ = 3 kg, m₂ = 5 kg, g = 10 m/s²:\na = [(5 − 3) / (5 + 3)] × 10 = (2 / 8) × 10 = 2.5 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2752, // Q6
    similar_question: {
      question: "In an ideal Atwood machine with masses m₁ and m₂ (where m₂ > m₁), what is the tension T in the connecting string? (Take acceleration due to gravity as g)",
      option_a: "2 m₁ m₂ g / (m₁ + m₂)",
      option_b: "m₁ m₂ g / (m₁ + m₂)",
      option_c: "(m₂ − m₁) g / (m₁ + m₂)",
      option_d: "4 m₁ m₂ g / (m₁ + m₂)",
      correct_option: "A",
      explanation: "Step 1: Equations of motion:\nm₂ g − T = m₂ a\nT − m₁ g = m₁ a.\n\nStep 2: Eliminate acceleration a:\nT = [2 m₁ m₂ / (m₁ + m₂)] g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2753, // Q7
    similar_question: {
      question: "A heavy flexible cable of total weight W is suspended symmetrically between two fixed points at the same horizontal height. If the cable makes an angle θ with the horizontal at each support point, what is the tension in the cable at each support?",
      option_a: "W / (2 sin θ)",
      option_b: "W / (2 cos θ)",
      option_c: "W sin θ",
      option_d: "W / (4 sin θ)",
      correct_option: "A",
      explanation: "Step 1: Consider vertical equilibrium of the entire cable:\nThe vertical components of tension at both supports balance the total weight W:\n2 T sin θ = W.\n\nStep 2: Solve for T:\nT = W / (2 sin θ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2754, // Q8
    similar_question: {
      question: "A cylinder of weight W rests in equilibrium between two frictionless inclined planes inclined at 30° and 60° to the horizontal. If N₁ and N₂ are the normal reactions from the 30° and 60° planes respectively, what is the ratio N₁ / N₂?",
      option_a: "√3",
      option_b: "1 / √3",
      option_c: "1",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: The normal reactions are perpendicular to the planes, making angles 60° and 30° with the horizontal respectively.\nStep 2: Balance horizontal force components:\nN₁ cos 60° = N₂ cos 30°  →  N₁ (1/2) = N₂ (√3/2)  →  N₁ / N₂ = √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2755, // Q9
    similar_question: {
      question: "A block of mass 2 kg is held in equilibrium against a smooth vertical wall by applying a horizontal force F. If a light string supports the block at an angle of 45° to the wall, what is the tension in the string? (Take g = 10 m/s²)",
      option_a: "20√2 N",
      option_b: "20 N",
      option_c: "10√2 N",
      option_d: "40 N",
      correct_option: "A",
      explanation: "Step 1: Vertical equilibrium:\nT cos 45° = m g\nT (1 / √2) = 2 × 10 = 20 N.\n\nStep 2: Solve for T:\nT = 20√2 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2756, // Q10
    similar_question: {
      question: "Three concurrent coplanar forces act on a body in static equilibrium. If two forces are 12 N (along +x) and 16 N (along +y), what must be the magnitude of the third force?",
      option_a: "20 N",
      option_b: "28 N",
      option_c: "4 N",
      option_d: "14 N",
      correct_option: "A",
      explanation: "Step 1: Resultant of the first two perpendicular forces:\nR = √(12² + 16²) = √(144 + 256) = √400 = 20 N.\n\nStep 2: For equilibrium, the third force must be equal in magnitude and opposite in direction to R:\nF₃ = R = 20 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2757, // Q11
    similar_question: {
      question: "A solid sphere of weight 30 N rests in a symmetrical smooth trough with perpendicular sides (angle = 90°). What is the normal reaction force exerted by each side on the sphere?",
      option_a: "15√2 N",
      option_b: "30 N",
      option_c: "15 N",
      option_d: "30√2 N",
      correct_option: "A",
      explanation: "Step 1: Each side is inclined at 45° to the horizontal.\nThe normal reactions N make an angle of 45° with the vertical.\n\nStep 2: Vertical equilibrium:\n2 N cos 45° = W\n2 N (1 / √2) = 30  →  √2 N = 30  →  N = 30 / √2 = 15√2 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2758, // Q12
    similar_question: {
      question: "A cylinder of mass M and radius R rests between two steps of equal height. In static equilibrium, the sum of all external forces acting on the cylinder must be:",
      option_a: "Zero vector (ΣF = 0)",
      option_b: "Mg upward",
      option_c: "Mg downward",
      option_d: "Depends on radius R",
      correct_option: "A",
      explanation: "Step 1: Newton's first law of motion for static equilibrium states that the vector sum of all external forces acting on a body must be zero:\nΣ F = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2759, // Q13
    similar_question: {
      question: "A load of weight W is suspended using a string. In which case is the tension in the string maximum?",
      option_a: "When the string segments make the smallest angle with the horizontal (nearly horizontal)",
      option_b: "When the string segments are completely vertical",
      option_c: "When the string segments make an angle of 60° with the horizontal",
      option_d: "Tension is independent of the suspension angle",
      correct_option: "A",
      explanation: "Step 1: Vertical equilibrium: 2 T sin θ = W  →  T = W / (2 sin θ),\nwhere θ is the angle with the horizontal.\n\nStep 2: As θ approaches 0° (string nearly horizontal), sin θ → 0, so T → ∞.\nThus, tension is greatest when the string is pulled nearly horizontal.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2760, // Q14
    similar_question: {
      question: "A cylinder of mass m is supported in equilibrium on two smooth planes inclined at angles α and β with the horizontal. According to Lami's theorem, the normal reactions N_α and N_β satisfy:",
      option_a: "N_α / sin(90° + β) = N_β / sin(90° + α) = mg / sin(α + β)",
      option_b: "N_α sin α = N_β sin β",
      option_c: "N_α cos α = N_β cos β",
      option_d: "N_α + N_β = mg",
      correct_option: "A",
      explanation: "Step 1: Lami's theorem states that for three coplanar forces in equilibrium, each force is proportional to the sine of the angle between the other two forces:\nF₁ / sin θ₁ = F₂ / sin θ₂ = F₃ / sin θ₃.\n\nStep 2: The angles between the normal reactions and gravity yield Option (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2761, // Q15
    similar_question: {
      question: "Two masses m₁ and m₂ are placed on two smooth inclined planes of angles 30° and 60° respectively and connected by a light string passing over a frictionless apex pulley. For static equilibrium, what is the ratio m₁ / m₂?",
      option_a: "√3",
      option_b: "1 / √3",
      option_c: "3",
      option_d: "1 / 3",
      correct_option: "A",
      explanation: "Step 1: In equilibrium, tension T along the string balances the component of gravity along each plane:\nT = m₁ g sin 30°\nT = m₂ g sin 60°.\n\nStep 2: Equate the two tensions:\nm₁ sin 30° = m₂ sin 60°\nm₁ (1/2) = m₂ (√3/2)  →  m₁ / m₂ = √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2762, // Q16
    similar_question: {
      question: "A block of mass 1 kg is pressed against a vertical wall by a horizontal force of 20 N. If the coefficient of static friction between block and wall is μ_s = 0.6, what is the magnitude of the frictional force acting on the block? (Take g = 10 m/s²)",
      option_a: "10 N",
      option_b: "12 N",
      option_c: "20 N",
      option_d: "6 N",
      correct_option: "A",
      explanation: "Step 1: Weight of the block: W = m g = 1 × 10 = 10 N downward.\n\nStep 2: Maximum available static friction:\nf_max = μ_s N = μ_s F = 0.6 × 20 N = 12 N.\n\nStep 3: Since the required force to prevent sliding (10 N) is less than f_max (12 N), static friction self-adjusts to balance the weight exactly:\nf_friction = 10 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2763, // Q17
    similar_question: {
      question: "A particle of mass m is in static equilibrium under the action of three coplanar forces F₁, F₂, and F₃. If F₁ = 5 N directed East and F₂ = 12 N directed North, what are the magnitude and direction of F₃?",
      option_a: "13 N directed South-West at tan⁻¹(12/5) South of West",
      option_b: "13 N directed North-East",
      option_c: "17 N directed South-West",
      option_d: "7 N directed South",
      correct_option: "A",
      explanation: "Step 1: Resultant of F₁ and F₂:\nR = 5 i + 12 j.\nMagnitude |R| = √(5² + 12²) = 13 N.\n\nStep 2: For equilibrium: F₃ = −R = −5 i − 12 j.\nMagnitude = 13 N directed South of West at tan⁻¹(12/5).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2764, // Q18
    similar_question: {
      question: "Two blocks of masses m₁ = 2 kg and m₂ = 3 kg are connected by a light string over a frictionless pulley. If the system is released from rest, what is the tension in the string? (Take g = 10 m/s²)",
      option_a: "24 N",
      option_b: "20 N",
      option_c: "30 N",
      option_d: "12 N",
      correct_option: "A",
      explanation: "Step 1: Formula for tension in an Atwood machine:\nT = [2 m₁ m₂ / (m₁ + m₂)] g.\n\nStep 2: Substitute m₁ = 2 kg, m₂ = 3 kg, g = 10 m/s²:\nT = [2 × 2 × 3 / (2 + 3)] × 10 = (12 / 5) × 10 = 24 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2765, // Q19
    similar_question: {
      question: "A drone moves horizontally with constant velocity v. The forces acting on it are weight W (downward), air drag D (opposite to motion), and rotor lift L. What is the direction of the rotor lift force L?",
      option_a: "Tilted forward at an angle with the vertical",
      option_b: "Strictly vertically upward",
      option_c: "Strictly horizontal",
      option_d: "Tilted backward",
      correct_option: "A",
      explanation: "Step 1: For constant velocity, the net force must be zero: L + W + D = 0.\nStep 2: The vertical component of lift balances weight: L_y = W.\nThe horizontal component of lift must balance backward drag: L_x = D (forward).\nTherefore, the lift vector L must tilt forward.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2766, // Q20
    similar_question: {
      question: "A string passing over a frictionless pulley supports two masses m each hanging vertically at the ends, and a central mass M hanging from the middle. For equilibrium, what is the required condition on M?",
      option_a: "M < 2m",
      option_b: "M > 2m",
      option_c: "M = 2m",
      option_d: "M is independent of m",
      correct_option: "A",
      explanation: "Step 1: In equilibrium, the tension in the string T = mg.\nStep 2: At the central knot: 2 T sin θ = M g  →  2 m g sin θ = M g  →  sin θ = M / (2m).\nStep 3: Since sin θ < 1 for a non-vertical sag, M / (2m) < 1  →  M < 2m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2767, // Q21
    similar_question: {
      question: "Three blocks of masses 1 kg, 2 kg, and 3 kg are placed in contact on a frictionless horizontal table. A horizontal force of 12 N is applied to the 1 kg block. What is the contact force between the 2 kg and 3 kg blocks?",
      option_a: "6 N",
      option_b: "10 N",
      option_c: "4 N",
      option_d: "2 N",
      correct_option: "A",
      explanation: "Step 1: Total mass = 1 + 2 + 3 = 6 kg.\nAcceleration a = F / m_total = 12 N / 6 kg = 2 m/s².\n\nStep 2: Contact force between 2 kg and 3 kg pushes only the 3 kg block:\nN₂₃ = m₃ × a = 3 kg × 2 m/s² = 6 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2768, // Q22
    similar_question: {
      question: "A body of mass 3 kg moves along the x-axis with a position-time relation x(t) = 4t + 5t² (in metres). What is the net horizontal force acting on the body?",
      option_a: "30 N",
      option_b: "15 N",
      option_c: "10 N",
      option_d: "60 N",
      correct_option: "A",
      explanation: "Step 1: Find acceleration:\nv = dx / dt = 4 + 10t\na = dv / dt = 10 m/s².\n\nStep 2: Newton's second law:\nF = m a = 3 kg × 10 m/s² = 30 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2769, // Q23
    similar_question: {
      question: "A rope passes over an ideal pulley. A monkey of mass 20 kg climbs up the rope with an acceleration of 2 m/s². Taking g = 10 m/s², what is the tension in the rope?",
      option_a: "240 N",
      option_b: "200 N",
      option_c: "160 N",
      option_d: "40 N",
      correct_option: "A",
      explanation: "Step 1: Equation of motion for monkey climbing up with acceleration a:\nT − m g = m a  →  T = m (g + a).\n\nStep 2: Substitute m = 20 kg, g = 10 m/s², a = 2 m/s²:\nT = 20 × (10 + 2) = 20 × 12 = 240 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2770, // Q24
    similar_question: {
      question: "Three forces F₁, F₂, and F₃ act on a body of mass m such that F₂ and F₃ are mutually perpendicular and the body remains in equilibrium. If force F₁ is suddenly removed, what is the magnitude of acceleration of the body?",
      option_a: "√(F₂² + F₃²) / m",
      option_b: "(F₂ + F₃) / m",
      option_c: "|F₂ − F₃| / m",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Equilibrium condition: F₁ + F₂ + F₃ = 0  →  F₂ + F₃ = −F₁.\nStep 2: When F₁ is removed, the net force is F_net = F₂ + F₃ = −F₁.\nMagnitude |F_net| = |F₁| = √(F₂² + F₃²).\nStep 3: Acceleration a = |F_net| / m = √(F₂² + F₃²) / m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2771, // Q25
    similar_question: {
      question: "A block of mass 4 kg rests on a frictionless horizontal table and is pulled by a light string with tension T = 12 N. What is the acceleration of the block?",
      option_a: "3 m/s²",
      option_b: "4 m/s²",
      option_c: "0.33 m/s²",
      option_d: "48 m/s²",
      correct_option: "A",
      explanation: "Step 1: Horizontal equation of motion on frictionless table: F_net = m a  →  T = m a.\nStep 2: Solve for a: a = T / m = 12 N / 4 kg = 3 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2772, // Q26
    similar_question: {
      question: "A firefighter of mass M slides down a vertical pole with a uniform downward acceleration of a = g / 3. What is the friction force exerted by the pole on the firefighter?",
      option_a: "2 M g / 3",
      option_b: "M g / 3",
      option_c: "4 M g / 3",
      option_d: "M g",
      correct_option: "A",
      explanation: "Step 1: Equation of downward motion:\nM g − f_friction = M a.\n\nStep 2: Substitute a = g / 3:\nf_friction = M g − M (g / 3) = 2 M g / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2773, // Q27
    similar_question: {
      question: "Two blocks of masses 6 kg and 4 kg are connected by a light string on a frictionless horizontal table. A horizontal pulling force of 30 N is applied to the 6 kg block away from the 4 kg block. What is the tension in the connecting string?",
      option_a: "12 N",
      option_b: "18 N",
      option_c: "15 N",
      option_d: "30 N",
      correct_option: "A",
      explanation: "Step 1: Common acceleration: a = F / (m₁ + m₂) = 30 / (6 + 4) = 3 m/s².\nStep 2: Tension accelerates the rear 4 kg block: T = m₂ × a = 4 kg × 3 m/s² = 12 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2774, // Q28
    similar_question: {
      question: "A block of mass m is supported by a string on a frictionless incline of angle 30°. What is the tension in the string in static equilibrium?",
      option_a: "m g / 2",
      option_b: "m g √3 / 2",
      option_c: "m g",
      option_d: "2 m g",
      correct_option: "A",
      explanation: "Step 1: Along the incline, the component of gravity acting downward is m g sin 30°.\nStep 2: In static equilibrium, tension T balances this component: T = m g sin 30° = m g / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2775, // Q29
    similar_question: {
      question: "Three blocks of masses 2 kg, 3 kg, and 5 kg are suspended in series by light strings. Taking g = 10 m/s², what is the tension in the string supporting the entire system from the ceiling?",
      option_a: "100 N",
      option_b: "50 N",
      option_c: "80 N",
      option_d: "30 N",
      correct_option: "A",
      explanation: "Step 1: The top string supports the total mass of all three blocks:\nM_total = 2 + 3 + 5 = 10 kg.\nStep 2: Tension T = M_total × g = 10 kg × 10 m/s² = 100 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2776, // Q30
    similar_question: {
      question: "A rubber ball of mass 0.2 kg moving horizontally at 15 m/s strikes a vertical wall normally and rebounds with the same speed in 0.1 s. What is the average force exerted by the wall on the ball?",
      option_a: "60 N",
      option_b: "30 N",
      option_c: "15 N",
      option_d: "120 N",
      correct_option: "A",
      explanation: "Step 1: Change in momentum:\nΔp = m v_f − m v_i = m (−15) − m (+15) = −2 m v = −2 × 0.2 × 15 = −6.0 kg m/s.\nMagnitude |Δp| = 6.0 N s.\n\nStep 2: Average force:\nF_avg = |Δp| / Δt = 6.0 / 0.1 = 60 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2777, // Q31
    similar_question: {
      question: "A spring of spring constant k = 200 N/m is compressed by 0.05 m between a wall and a block in equilibrium on a frictionless table. What is the force exerted by the spring on the block?",
      option_a: "10 N",
      option_b: "5 N",
      option_c: "20 N",
      option_d: "4 N",
      correct_option: "A",
      explanation: "Step 1: Hooke's Law: F = k x.\nStep 2: Substitute k = 200 N/m, x = 0.05 m:\nF = 200 × 0.05 = 10 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2778, // Q32
    similar_question: {
      question: "Two blocks A and B connected by a uniform heavy rope of mass m_r are pulled vertically upward with a force F. The tension at the midpoint of the rope is:",
      option_a: "Less than the tension at the top of the rope",
      option_b: "Greater than the tension at the top of the rope",
      option_c: "Equal to the tension at the top of the rope",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Any cross-section of a heavy vertical rope must support all the mass beneath it.\nStep 2: The top of the rope supports the entire rope plus the lower block, whereas the midpoint supports only half the rope plus the lower block.\nTherefore, tension decreases down the rope.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2779, // Q33
    similar_question: {
      question: "A passenger of mass 60 kg stands on a weighing scale in an elevator accelerating upward at 2 m/s². What reading does the scale show? (Take g = 10 m/s²)",
      option_a: "720 N (or 72 kg-wt)",
      option_b: "600 N (or 60 kg-wt)",
      option_c: "480 N (or 48 kg-wt)",
      option_d: "120 N (or 12 kg-wt)",
      correct_option: "A",
      explanation: "Step 1: Equation for apparent weight during upward acceleration:\nN = m (g + a).\n\nStep 2: Substitute m = 60 kg, g = 10 m/s², a = 2 m/s²:\nN = 60 × (10 + 2) = 60 × 12 = 720 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2780, // Q34
    similar_question: {
      question: "A particle of mass m moves along the x-axis with velocity v(x) = k √x, where k is a positive constant. What is the net force acting on the particle?",
      option_a: "m k² / 2 (constant)",
      option_b: "m k² x",
      option_c: "m k / √x",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Acceleration in terms of position: a = v (dv / dx).\nStep 2: Differentiate v = k x^(1/2): dv / dx = (k / 2) x^(−1/2).\nStep 3: a = (k x^(1/2)) × [(k / 2) x^(−1/2)] = k² / 2.\nNet force F = m a = m k² / 2 (constant).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2781, // Q35
    similar_question: {
      question: "In a system with three blocks suspended over frictionless pulleys, which principle ensures that the tension in any continuous massless string remains uniform throughout?",
      option_a: "The mass of the string is zero (m = 0 implies net force m a = 0)",
      option_b: "Newton's third law only",
      option_c: "Conservation of energy",
      option_d: "Conservation of mass",
      correct_option: "A",
      explanation: "Step 1: For any segment of string of mass Δm: T₂ − T₁ = Δm × a.\nStep 2: For an ideal massless string, Δm = 0, so T₂ − T₁ = 0  →  T₁ = T₂.\nTherefore, tension is uniform across frictionless pulleys.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2782, // Q36
    similar_question: {
      question: "In an Atwood machine with masses 3 kg and 1 kg released from rest, taking g = 10 m/s², what is the acceleration of the 1 kg mass?",
      option_a: "5.0 m/s² upward",
      option_b: "5.0 m/s² downward",
      option_c: "10.0 m/s² upward",
      option_d: "2.5 m/s² upward",
      correct_option: "A",
      explanation: "Step 1: a = [(3 − 1) / (3 + 1)] × 10 = (2 / 4) × 10 = 5.0 m/s².\nStep 2: The lighter 1 kg mass accelerates upward.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2783, // Q37
    similar_question: {
      question: "A particle of mass 2 kg moves such that its position vector is r(t) = 3 t² i + 4 t j (in metres). What is the net force acting on the particle at t = 3 s?",
      option_a: "12 i N",
      option_b: "6 i N",
      option_c: "12 i + 4 j N",
      option_d: "24 i N",
      correct_option: "A",
      explanation: "Step 1: Velocity: v = dr / dt = 6t i + 4 j.\nStep 2: Acceleration: a = dv / dt = 6 i m/s² (constant).\nStep 3: Net force: F = m a = 2 kg × 6 i m/s² = 12 i N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2784, // Q38
    similar_question: {
      question: "Two blocks A (mass m) and B (mass 2m) are pushed together along a frictionless floor by a constant horizontal force F applied to block A. What is the acceleration of block B?",
      option_a: "F / (3m)",
      option_b: "F / (2m)",
      option_c: "F / m",
      option_d: "2F / (3m)",
      correct_option: "A",
      explanation: "Step 1: Both blocks move together with a common acceleration:\na = F_net / M_total = F / (m + 2m) = F / (3m).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2785, // Q39
    similar_question: {
      question: "A light spring balance is attached between two identical 5 kg blocks hanging symmetrically over two ideal pulleys. What is the reading shown by the spring balance? (Take g = 10 m/s²)",
      option_a: "50 N (or 5 kg-wt)",
      option_b: "100 N (or 10 kg-wt)",
      option_c: "Zero",
      option_d: "25 N (or 2.5 kg-wt)",
      correct_option: "A",
      explanation: "Step 1: A spring balance measures the tension T in the string attached to it.\nStep 2: Each 5 kg block exerts a tension T = m g = 5 × 10 = 50 N.\nStep 3: The reading of the spring balance equals the tension T = 50 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2786, // Q40
    similar_question: {
      question: "A block of mass 4 kg is supported on a 30° smooth incline by an ideal string passing over an apex pulley with a hanging mass M. For the system to remain in equilibrium, what must be the value of M?",
      option_a: "2 kg",
      option_b: "4 kg",
      option_c: "2√3 kg",
      option_d: "8 kg",
      correct_option: "A",
      explanation: "Step 1: Tension for inclined block: T = m g sin 30° = 4 × g × 0.5 = 2g.\nStep 2: Tension for hanging mass: T = M g.\nStep 3: Equating: M g = 2g  →  M = 2 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2787, // Q41
    similar_question: {
      question: "Two blocks A (mass 1 kg) and B (mass 4 kg) are placed in contact on a frictionless table. In which scenario is the mutual contact force between them larger?",
      option_a: "When a horizontal force F is applied directly on block A",
      option_b: "When the same horizontal force F is applied directly on block B",
      option_c: "The contact force is identical in both cases",
      option_d: "Contact force is always zero on a frictionless surface",
      correct_option: "A",
      explanation: "Step 1: Acceleration in both cases: a = F / (1 + 4) = F / 5.\nStep 2: When F is applied to A, contact force pushes B: N₁ = m_B × a = 4 × (F / 5) = 0.8 F.\nStep 3: When F is applied to B, contact force pushes A: N₂ = m_A × a = 1 × (F / 5) = 0.2 F.\nTherefore, N₁ > N₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2788, // Q42
    similar_question: {
      question: "A block of mass m₁ on a smooth horizontal table is pulled by a hanging mass m₂ via a light string over an ideal corner pulley. What is the acceleration of the system?",
      option_a: "m₂ g / (m₁ + m₂)",
      option_b: "m₁ g / (m₁ + m₂)",
      option_c: "(m₂ − m₁) g / (m₁ + m₂)",
      option_d: "g",
      correct_option: "A",
      explanation: "Step 1: Driving force = weight of hanging mass = m₂ g.\nStep 2: Total inertia = m₁ + m₂.\nStep 3: Acceleration a = driving force / total mass = m₂ g / (m₁ + m₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2789, // Q43
    similar_question: {
      question: "An elevator descends with an acceleration 'a'. A block of mass M on a weighing scale inside the elevator reads 0.20 Mg. What is the downward acceleration 'a' of the elevator?",
      option_a: "0.80 g",
      option_b: "0.20 g",
      option_c: "g",
      option_d: "1.20 g",
      correct_option: "A",
      explanation: "Step 1: Apparent weight during downward acceleration: N = M (g − a).\nStep 2: Given N = 0.20 M g:\n0.20 M g = M (g − a)  →  g − a = 0.20 g  →  a = 0.80 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2790, // Q44
    similar_question: {
      question: "A monkey of mass 15 kg climbs up a light rope passing over a frictionless ceiling pulley attached to a counterweight of 20 kg. What minimum upward acceleration must the monkey have to lift the 20 kg counterweight off the ground? (Take g = 10 m/s²)",
      option_a: "3.33 m/s² (g / 3)",
      option_b: "2.5 m/s²",
      option_c: "5.0 m/s²",
      option_d: "10.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: To lift the 20 kg mass, tension must equal its weight:\nT ≥ M g = 20 × 10 = 200 N.\n\nStep 2: Tension generated by monkey climbing with acceleration a:\nT = m (g + a) = 15 (10 + a).\n\nStep 3: Solve for a:\n15 (10 + a) ≥ 200  →  150 + 15a ≥ 200  →  15a ≥ 50  →  a ≥ 50 / 15 = 10 / 3 m/s² (g / 3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2791, // Q45
    similar_question: {
      question: "A uniform rod of mass M and length L lies flat on a smooth horizontal table. A constant horizontal force F is applied at one end along its length. What is the tension in the rod at a distance x from the pulled end?",
      option_a: "F [1 − (x / L)]",
      option_b: "F (x / L)",
      option_c: "F / 2",
      option_d: "F [1 + (x / L)]",
      correct_option: "A",
      explanation: "Step 1: Acceleration of the entire rod: a = F / M.\nStep 2: The cross-section at distance x from the pulled end pulls the remaining segment of length (L − x) and mass M' = M (L − x) / L.\nStep 3: Tension T = M' a = [M (L − x) / L] × (F / M) = F [1 − (x / L)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2792, // Q46
    similar_question: {
      question: "A block of mass 10 kg is suspended from the ceiling by a uniform rope of mass 2 kg. What is the tension in the rope at its midpoint? (Take g = 10 m/s²)",
      option_a: "110 N",
      option_b: "120 N",
      option_c: "100 N",
      option_d: "105 N",
      correct_option: "A",
      explanation: "Step 1: Mass supported below the midpoint:\nM_supported = Mass of block + Half mass of rope = 10 kg + 1 kg = 11 kg.\n\nStep 2: Tension T = M_supported × g = 11 kg × 10 m/s² = 110 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2793, // Q47
    similar_question: {
      question: "A chain consisting of an infinite series of links has link masses M, M/2, M/4, M/8, ... If a horizontal pulling force F is applied to the first link on a frictionless surface, what is the total mass of the chain?",
      option_a: "2M",
      option_b: "M",
      option_c: "4M",
      option_d: "1.5M",
      correct_option: "A",
      explanation: "Step 1: Sum of an infinite geometric progression: S = a / (1 − r).\nFirst term a = M, common ratio r = 1/2.\n\nStep 2: Total mass M_total = M / (1 − 1/2) = M / 0.5 = 2M.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2794, // Q48
    similar_question: {
      question: "Two blocks of masses 2 kg and 8 kg are connected by a light string over an ideal pulley. Taking g = 10 m/s², what is the acceleration of the system?",
      option_a: "6.0 m/s²",
      option_b: "8.0 m/s²",
      option_c: "3.0 m/s²",
      option_d: "10.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: a = [(m₂ − m₁) / (m₁ + m₂)] × g.\nStep 2: Substitute m₁ = 2 kg, m₂ = 8 kg, g = 10 m/s²:\na = [(8 − 2) / (8 + 2)] × 10 = (6 / 10) × 10 = 6.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2795, // Q49
    similar_question: {
      question: "A uniform rope of length 8 m and mass 4 kg lies along a smooth horizontal surface. A horizontal force of 24 N is applied at one end. What is the tension in the rope at a distance of 2 m from the pulled end?",
      option_a: "18 N",
      option_b: "6 N",
      option_c: "12 N",
      option_d: "20 N",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = F / M = 24 N / 4 kg = 6 m/s².\nStep 2: Linear density λ = 4 kg / 8 m = 0.5 kg/m.\nStep 3: Mass of trailing segment of length (8 − 2) = 6 m is m' = 6 × 0.5 = 3 kg.\nStep 4: Tension T = m' × a = 3 kg × 6 m/s² = 18 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2796, // Q50
    similar_question: {
      question: "A chain of 4 identical links, each of mass 0.25 kg, is lifted vertically upward with a uniform acceleration of 2 m/s². Taking g = 10 m/s², what is the force exerted by the second link on the third link?",
      option_a: "6.0 N",
      option_b: "12.0 N",
      option_c: "3.0 N",
      option_d: "9.0 N",
      correct_option: "A",
      explanation: "Step 1: The force between link 2 and link 3 must accelerate the remaining 2 links below it (links 3 and 4).\nMass supported M' = 2 × 0.25 kg = 0.50 kg.\n\nStep 2: Upward equation of motion:\nF − M' g = M' a  →  F = M' (g + a).\n\nStep 3: Substitute values:\nF = 0.50 × (10 + 2) = 0.50 × 12 = 6.0 N.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Part 1 (${set6Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set6Part1Updates) {
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
        console.log(`[${successCount}/${set6Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
