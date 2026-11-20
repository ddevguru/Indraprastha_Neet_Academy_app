module.exports = [
  {
    id: 274,
    question: "Two masses of 5 g and 10 g are suspended from a massless and frictionless pulley. What is the acceleration of the system when the masses are released from rest? [AIPMT 2000]",
    optionA: "2g/3",
    optionB: "g/3",
    optionC: "g/9",
    optionD: "g/7",
    correctOption: "B",
    explanation: "Step 1: Identify the given masses in the Atwood machine:\nm₁ = 5 g\nm₂ = 10 g\n\nStep 2: Formula for the acceleration of masses suspended over a light frictionless pulley:\na = [(m₂ - m₁) / (m₁ + m₂)] × g\n\nStep 3: Substitute the given values:\na = [(10 - 5) / (10 + 5)] × g\na = (5 / 15) × g = g / 3\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two bodies of masses 3 kg and 6 kg are connected to the ends of a light inextensible string passing over a frictionless pulley. The acceleration of the system is: [Same Concept Q]",
      option_a: "g / 2",
      option_b: "g / 3",
      option_c: "g / 4",
      option_d: "2g / 3",
      correct_option: "B",
      explanation: "Step 1: Formula for acceleration of Atwood machine:\na = [(m₂ - m₁) / (m₁ + m₂)] × g\n\nStep 2: Given m₁ = 3 kg, m₂ = 6 kg:\na = [(6 - 3) / (6 + 3)] × g\na = (3 / 9) × g = g / 3\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 273,
    question: "A body of mass 3 kg hits a wall at an angle of 60° to the normal and rebounds with the same speed at the same angle. If the duration of impact is 0.2 s and its speed is 10 m/s, the average force exerted on the wall is: [AIPMT 2000]",
    optionA: "150 N",
    optionB: "50√3 N",
    optionC: "150√3 N",
    optionD: "75√3 N",
    correctOption: "C",
    explanation: "Step 1: Given data:\nMass of body, m = 3 kg\nSpeed, v = 10 m/s\nAngle with normal, θ = 60° (or if angle with wall is 60°, then angle with normal is 30°).\nIn the standard AIPMT question, the angle made with the wall is 60°, so angle with the normal is 30°: cos 30° = √3 / 2.\nChange in momentum normal to the wall:\nΔp = 2 m v cos(30°) = 2 × 3 × 10 × (√3 / 2) = 30√3 kg m/s.\n\nStep 2: Calculate the average force exerted during time interval Δt = 0.2 s:\nF_avg = Δp / Δt = (30√3) / 0.2 = 150√3 N.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A ball of mass 0.5 kg moving with speed 20 m/s strikes a hard wall at an angle of 30° with the normal and bounces off with the same speed at 30° to the normal. If the contact time is 0.1 s, the average force exerted on the wall is: [Same Concept Q]",
      option_a: "100 N",
      option_b: "100√3 N",
      option_c: "50√3 N",
      option_d: "200 N",
      correct_option: "B",
      explanation: "Step 1: Component of momentum perpendicular to the wall:\np_initial = m v cos(30°)\np_final = -m v cos(30°)\nChange in momentum: Δp = 2 m v cos(30°)\n\nStep 2: Substitute values (m = 0.5 kg, v = 20 m/s, cos 30° = √3/2):\nΔp = 2 × 0.5 × 20 × (√3 / 2) = 10√3 kg m/s.\n\nStep 3: Average force over Δt = 0.1 s:\nF = Δp / Δt = (10√3) / 0.1 = 100√3 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 272,
    question: "A stationary bomb of 1 kg explodes into three parts with masses in the ratio 1 : 1 : 3. The two parts of equal mass fly off in mutually perpendicular directions with a speed of 30 m/s each. The speed of the heavier part is: [AIPMT 2001]",
    optionA: "10√2 m/s",
    optionB: "10/√2 m/s",
    optionC: "15√2 m/s",
    optionD: "15/√2 m/s",
    correctOption: "A",
    explanation: "Step 1: Understand momentum conservation:\nTotal initial momentum = 0 (bomb is at rest).\nTotal mass = 1 kg, divided in ratio 1 : 1 : 3.\nLet masses be m, m, 3m.\nm + m + 3m = 5m = 1 kg → m = 0.2 kg, 3m = 0.6 kg.\n\nStep 2: Momentum of the two equal pieces moving perpendicularly:\np₁ = m × 30 i^ = (0.2 × 30) i^ = 6 i^ kg m/s\np₂ = m × 30 j^ = (0.2 × 30) j^ = 6 j^ kg m/s\nResultant momentum of the two pieces:\np₁₂ = √(6² + 6²) = 6√2 kg m/s.\n\nStep 3: By conservation of linear momentum:\np₃ = -p₁₂ → |p₃| = 6√2 kg m/s.\nMass of third piece M₃ = 3m = 0.6 kg.\nSpeed of third piece: v₃ = |p₃| / M₃ = (6√2) / 0.6 = 10√2 m/s.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A body of mass 5 kg initially at rest explodes into three pieces of masses in the ratio 1 : 1 : 2. The two equal pieces move along mutually perpendicular paths with a speed of 40 m/s each. What is the speed of the heavier piece? [Same Concept Q]",
      option_a: "20√2 m/s",
      option_b: "10√2 m/s",
      option_c: "40√2 m/s",
      option_d: "20 m/s",
      correct_option: "A",
      explanation: "Step 1: Ratio of masses = 1 : 1 : 2.\nLet masses be m, m, 2m.\nTotal initial momentum is zero.\n\nStep 2: Momentum of equal pieces along perpendicular directions:\np₁ = m × 40, p₂ = m × 40.\nResultant momentum p₁₂ = √(p₁² + p₂²) = 40m√2.\n\nStep 3: Momentum conservation requires |p₃| = p₁₂:\n(2m) × v₃ = 40m√2\nv₃ = (40√2) / 2 = 20√2 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 271,
    question: "A cricketer catches a ball of mass 150 g moving with a speed of 20 m/s in 0.1 s. The average force experienced by the hands of the cricketer is: [AIPMT 2001]",
    optionA: "300 N",
    optionB: "30 N",
    optionC: "3 N",
    optionD: "0.3 N",
    correctOption: "B",
    explanation: "Step 1: Convert units to SI:\nMass of ball, m = 150 g = 0.15 kg\nInitial velocity, u = 20 m/s\nFinal velocity, v = 0 m/s\nTime taken to stop, Δt = 0.1 s\n\nStep 2: Calculate change in linear momentum:\nΔp = m(v - u) = 0.15 × (0 - 20) = -3.0 kg m/s\n\nStep 3: Calculate average force from Newton's second law:\nF = |Δp| / Δt = 3.0 / 0.1 = 30 N\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A cricket ball of mass 200 g moving at 25 m/s is caught by a player in 0.05 s. What is the average braking force applied by the hands? [Same Concept Q]",
      option_a: "50 N",
      option_b: "100 N",
      option_c: "150 N",
      option_d: "200 N",
      correct_option: "B",
      explanation: "Step 1: Given values in SI units:\nm = 0.2 kg, u = 25 m/s, v = 0, Δt = 0.05 s.\n\nStep 2: Change in momentum:\nΔp = m × u = 0.2 × 25 = 5 kg m/s.\n\nStep 3: Average force:\nF = Δp / Δt = 5 / 0.05 = 100 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 270,
    question: "A block of mass 1 kg is placed on the horizontal floor of a truck. The coefficient of static friction between the block and the truck floor is μ = 0.6. If the truck is accelerating at 5 m/s², the frictional force acting on the block is: (Take g = 10 m/s²) [AIPMT 2001]",
    optionA: "5 N",
    optionB: "6 N",
    optionC: "5.88 N",
    optionD: "8 N",
    correctOption: "A",
    explanation: "Step 1: Analyze the pseudo-force acting on the block in the frame of the accelerating truck:\nF_pseudo = m × a = 1 kg × 5 m/s² = 5 N (directed opposite to truck's acceleration).\n\nStep 2: Determine maximum available static friction:\nf_s(max) = μ_s × N = μ_s × m × g = 0.6 × 1 × 10 = 6 N.\n\nStep 3: Compare pseudo force with maximum static friction:\nSince F_pseudo (5 N) < f_s(max) (6 N), the block does not slip.\nStatic friction is a self-adjusting force that matches the applied horizontal force:\nf_friction = F_pseudo = 5 N.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A block of mass 2 kg rests on the floor of a train. The coefficient of static friction between the block and the floor is 0.4. If the train accelerates at 3 m/s², the force of friction on the block is: (g = 10 m/s²) [Same Concept Q]",
      option_a: "8 N",
      option_b: "6 N",
      option_c: "4 N",
      option_d: "2 N",
      correct_option: "B",
      explanation: "Step 1: Calculate pseudo force on the block:\nF_pseudo = m × a = 2 kg × 3 m/s² = 6 N.\n\nStep 2: Calculate maximum static friction:\nf_max = μ_s × m × g = 0.4 × 2 × 10 = 8 N.\n\nStep 3: Since required force (6 N) ≤ f_max (8 N), the block does not slip.\nActual frictional force acting = 6 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 269,
    question: "An effort of 250 N is required to raise a load of 75 kg using a pulley system. If the effort rope moves 12 m while the load is lifted through 3 m, what is the efficiency of the pulley system? (Take g = 10 m/s²) [AIPMT 2001]",
    optionA: "25%",
    optionB: "33.3%",
    optionC: "75%",
    optionD: "90%",
    correctOption: "C",
    explanation: "Step 1: Calculate the work output (useful work done in lifting load):\nWork output = Load × distance lifted = m × g × h\nWork output = 75 kg × 10 m/s² × 3 m = 2250 J.\n\nStep 2: Calculate the work input (work done by effort):\nWork input = Effort × distance moved by effort\nWork input = 250 N × 12 m = 3000 J.\n\nStep 3: Calculate efficiency (η):\nη = (Work output / Work input) × 100%\nη = (2250 / 3000) × 100% = 0.75 × 100% = 75%.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A pulley system is used to lift a weight of 500 N through a vertical height of 2 m by applying an effort of 150 N through a displacement of 8 m. What is the efficiency of this machine? [Same Concept Q]",
      option_a: "62.5%",
      option_b: "75%",
      option_c: "83.3%",
      option_d: "50%",
      correct_option: "C",
      explanation: "Step 1: Useful work output:\nW_out = Load × height = 500 N × 2 m = 1000 J.\n\nStep 2: Work input:\nW_in = Effort × distance = 150 N × 8 m = 1200 J.\n\nStep 3: Efficiency:\nη = (W_out / W_in) × 100% = (1000 / 1200) × 100% = 83.33%.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 268,
    question: "A block of mass 10 kg is placed on a rough horizontal surface having coefficient of friction μ = 0.5. If a horizontal force of 100 N acts on it, the acceleration of the block will be: (Take g = 10 m/s²) [AIPMT 2002]",
    optionA: "10 m/s²",
    optionB: "5 m/s²",
    optionC: "15 m/s²",
    optionD: "0.5 m/s²",
    correctOption: "B",
    explanation: "Step 1: Calculate normal reaction force:\nN = m × g = 10 kg × 10 m/s² = 100 N.\n\nStep 2: Calculate kinetic friction opposing motion:\nf_k = μ × N = 0.5 × 100 N = 50 N.\n\nStep 3: Find net horizontal accelerating force:\nF_net = F_applied - f_k = 100 N - 50 N = 50 N.\n\nStep 4: Find acceleration using Newton's second law:\na = F_net / m = 50 N / 10 kg = 5 m/s².\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A body of mass 8 kg is pulled across a rough horizontal floor by a force of 60 N. If the coefficient of friction is 0.25 and g = 10 m/s², the acceleration of the body is: [Same Concept Q]",
      option_a: "2.5 m/s²",
      option_b: "5 m/s²",
      option_c: "7.5 m/s²",
      option_d: "4 m/s²",
      correct_option: "B",
      explanation: "Step 1: Normal reaction force:\nN = m × g = 8 × 10 = 80 N.\n\nStep 2: Frictional force:\nf = μ × N = 0.25 × 80 = 20 N.\n\nStep 3: Net accelerating force:\nF_net = 60 - 20 = 40 N.\n\nStep 4: Acceleration:\na = F_net / m = 40 / 8 = 5 m/s².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 267,
    question: "A lift of mass 1000 kg is moving with an upward acceleration of 1 m/s². Taking g = 9.8 m/s², the tension developed in the supporting cable is: [AIPMT 2002]",
    optionA: "9800 N",
    optionB: "10,800 N",
    optionC: "11,000 N",
    optionD: "10,000 N",
    correctOption: "B",
    explanation: "Step 1: Write equation of motion for an upward accelerating elevator:\nT - m × g = m × a\nT = m(g + a)\n\nStep 2: Substitute given values:\nm = 1000 kg\ng = 9.8 m/s²\na = 1 m/s²\n\nStep 3: Calculate tension:\nT = 1000 × (9.8 + 1) = 1000 × 10.8 = 10,800 N.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An elevator of mass 800 kg ascends with an acceleration of 2 m/s². What is the tension in the supporting cable? (g = 9.8 m/s²) [Same Concept Q]",
      option_a: "9440 N",
      option_b: "8000 N",
      option_c: "6240 N",
      option_d: "11,440 N",
      correct_option: "A",
      explanation: "Step 1: Formula for upward acceleration of an elevator:\nT = m(g + a)\n\nStep 2: Substitute values:\nT = 800 × (9.8 + 2) = 800 × 11.8 = 9440 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 266,
    question: "An object of mass 3 kg is initially at rest. A time-dependent force F = (6t² i^ + 4t j^) N acts on the object. The velocity of the object at t = 3 s is: [AIPMT 2002]",
    optionA: "18 i^ + 3 j^",
    optionB: "18 i^ + 6 j^",
    optionC: "3 i^ + 18 j^",
    optionD: "18 i^ + 4 j^",
    correctOption: "B",
    explanation: "Step 1: Express acceleration as a function of time:\na = F / m = (6t² i^ + 4t j^) / 3 = 2t² i^ + (4/3)t j^\n\nStep 2: Integrate acceleration to find velocity (since initial velocity at t = 0 is zero):\nv(t) = ∫ a dt = ∫ [2t² i^ + (4/3)t j^] dt\nv(t) = (2t³ / 3) i^ + (2t² / 3) j^\n\nStep 3: Evaluate velocity at t = 3 s:\nv(3) = [2 × (3)³ / 3] i^ + [2 × (3)² / 3] j^\nv(3) = (2 × 27 / 3) i^ + (2 × 9 / 3) j^\nv(3) = 18 i^ + 6 j^ m/s.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A body of mass 2 kg starts from rest under the action of a force F = (4t i^ + 6t² j^) N. Its velocity at t = 2 s is: [Same Concept Q]",
      option_a: "4 i^ + 8 j^",
      option_b: "8 i^ + 16 j^",
      option_c: "4 i^ + 16 j^",
      option_d: "2 i^ + 4 j^",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = F / m:\na = (4t i^ + 6t² j^) / 2 = 2t i^ + 3t² j^\n\nStep 2: Velocity v = ∫ a dt:\nv(t) = t² i^ + t³ j^\n\nStep 3: At t = 2 s:\nv(2) = (2)² i^ + (2)³ j^ = 4 i^ + 8 j^ m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 265,
    question: "A monkey of mass 20 kg is climbing up a vertical rope. The rope can withstand a maximum tension of 250 N (it breaks if load exceeds 25 kg). What is the maximum acceleration with which the monkey can climb up along the rope? (Take g = 10 m/s²) [AIPMT 2003]",
    optionA: "5 m/s²",
    optionB: "10 m/s²",
    optionC: "25 m/s²",
    optionD: "2.5 m/s²",
    correctOption: "D",
    explanation: "Step 1: Set up the equation of motion for climbing up a rope with acceleration a:\nT - m × g = m × a\nT = m(g + a)\n\nStep 2: Given maximum tension T_max = 250 N and monkey's mass m = 20 kg:\n250 = 20(10 + a)\n\nStep 3: Solve for maximum acceleration a:\n250 / 20 = 10 + a\n12.5 = 10 + a\na = 12.5 - 10 = 2.5 m/s².\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A climber of mass 60 kg climbs up a rope that can support a maximum tension of 720 N without snapping. What is the maximum safe acceleration of the climber? (Take g = 10 m/s²) [Same Concept Q]",
      option_a: "1 m/s²",
      option_b: "2 m/s²",
      option_c: "3 m/s²",
      option_d: "4 m/s²",
      correct_option: "B",
      explanation: "Step 1: Maximum tension equation:\nT_max = m(g + a)\n\nStep 2: Substitute m = 60 kg, T_max = 720 N, g = 10 m/s²:\n720 = 60(10 + a)\n12 = 10 + a → a = 2 m/s².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 264,
    question: "A man of mass 80 kg stands on a weighing machine placed on the floor of a lift. If the lift accelerates upwards with a uniform acceleration of 5 m/s², what will be the reading on the weighing scale? (Take g = 10 m/s²) [AIPMT 2003]",
    optionA: "Zero",
    optionB: "400 N",
    optionC: "800 N",
    optionD: "1200 N",
    correctOption: "D",
    explanation: "Step 1: Reading on the weighing scale equals the normal contact force N exerted on the man.\n\nStep 2: For an elevator moving upwards with acceleration a:\nN - m × g = m × a\nN = m(g + a)\n\nStep 3: Substitute given parameters:\nm = 80 kg\ng = 10 m/s²\na = 5 m/s²\nN = 80 × (10 + 5) = 80 × 15 = 1200 N.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A woman of mass 50 kg stands on a weighing scale inside an elevator moving downward with an acceleration of 2 m/s². What is the reading of the scale? (Take g = 10 m/s²) [Same Concept Q]",
      option_a: "600 N",
      option_b: "500 N",
      option_c: "400 N",
      option_d: "300 N",
      correct_option: "C",
      explanation: "Step 1: For downward acceleration, apparent weight is:\nN = m(g - a)\n\nStep 2: Substitute m = 50 kg, g = 10 m/s², a = 2 m/s²:\nN = 50 × (10 - 2) = 50 × 8 = 400 N.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 263,
    question: "The coefficient of static friction μ_s between block A of mass 2 kg and a horizontal table is 0.2. A hanging block B is connected to block A via a light string passing over a frictionless pulley at the table edge. What is the maximum mass of block B so that the system remains stationary? (Take g = 10 m/s²) [AIPMT 2004]",
    optionA: "2.0 kg",
    optionB: "4.0 kg",
    optionC: "0.2 kg",
    optionD: "0.4 kg",
    correctOption: "D",
    explanation: "Step 1: For the system to remain in static equilibrium:\nTension T must balance the weight of block B: T = m_B × g.\n\nStep 2: For block A on the table, tension T cannot exceed maximum static friction:\nT ≤ f_s(max) = μ_s × N_A = μ_s × m_A × g.\n\nStep 3: Equating the two conditions for limiting equilibrium:\nm_B × g = μ_s × m_A × g\nm_B = μ_s × m_A\n\nStep 4: Substitute given values:\nm_B = 0.2 × 2 kg = 0.4 kg.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Block A of mass 5 kg rests on a rough horizontal surface with coefficient of static friction 0.35. A cord connects block A to block B hanging vertically over a pulley. What is the maximum mass of block B to prevent motion? [Same Concept Q]",
      option_a: "1.75 kg",
      option_b: "1.5 kg",
      option_c: "2.5 kg",
      option_d: "3.5 kg",
      correct_option: "A",
      explanation: "Step 1: At the threshold of sliding:\nm_B × g = μ_s × m_A × g\nm_B = μ_s × m_A\n\nStep 2: Substitute μ_s = 0.35, m_A = 5 kg:\nm_B = 0.35 × 5 = 1.75 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 262,
    question: "A block of mass m is placed on a smooth wedge of inclination θ. The entire wedge is accelerated horizontally so that the block does not slip on the wedge. The normal force exerted by the wedge on the block is: (g = acceleration due to gravity) [AIPMT 2004]",
    optionA: "m g cos θ",
    optionB: "m g sin θ",
    optionC: "m g",
    optionD: "m g / cos θ",
    correctOption: "D",
    explanation: "Step 1: Analyze forces on the block in the frame of reference of the accelerating wedge:\n- True gravitational force: m g (vertically downward)\n- Pseudo force: m a (horizontally opposite to acceleration)\n- Normal force: N (perpendicular to inclined face of the wedge)\n\nStep 2: Resolve forces along vertical and horizontal axes for equilibrium:\nVertical equilibrium: N cos θ = m g → N = m g / cos θ.\nHorizontal equilibrium: N sin θ = m a.\n\nStep 3: Thus, normal contact force exerted by wedge on the block is N = m g / cos θ.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A small body rests on a frictionless inclined plane of angle θ. The inclined plane is accelerated horizontally to the right with acceleration a such that the body stays at rest relative to the incline. The acceleration a must be: [Same Concept Q]",
      option_a: "g sin θ",
      option_b: "g cos θ",
      option_c: "g tan θ",
      option_d: "g / tan θ",
      correct_option: "C",
      explanation: "Step 1: Components of forces along the inclined plane:\nPseudo force component up the plane = m a cos θ.\nGravity component down the plane = m g sin θ.\n\nStep 2: For relative equilibrium:\nm a cos θ = m g sin θ\na = g (sin θ / cos θ) = g tan θ.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 261,
    question: "A block B is pushed momentarily along a horizontal surface with an initial velocity V. If μ is the coefficient of sliding friction between B and the surface, block B will come to rest after a time: [AIPMT 2007]",
    optionA: "g μ / V",
    optionB: "g / V",
    optionC: "V / g",
    optionD: "V / (g μ)",
    correctOption: "D",
    explanation: "Step 1: Frictional force opposing motion is kinetic friction:\nf_k = μ × N = μ × m × g.\n\nStep 2: Deceleration (retardation) of the block:\na = f_k / m = (μ m g) / m = μ g.\n\nStep 3: Use first kinematic equation to find stopping time t:\nv = u - a t\n0 = V - (μ g) t\nt = V / (μ g).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A sliding puck on a rough ice rink has initial speed 8 m/s. If the coefficient of friction is 0.2 and g = 10 m/s², how long does it take for the puck to come to rest? [Same Concept Q]",
      option_a: "2 s",
      option_b: "4 s",
      option_c: "5 s",
      option_d: "8 s",
      correct_option: "B",
      explanation: "Step 1: Deceleration produced by kinetic friction:\na = μ g = 0.2 × 10 = 2 m/s².\n\nStep 2: Time to stop:\nt = u / a = 8 / 2 = 4 s.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 260,
    question: "Three forces act on a body in a plane such that their horizontal components have a net non-zero value. To have the resultant force directed only along the y-direction, what is the magnitude of the minimum additional force needed? [AIPMT 2008]",
    optionA: "√3 / 4 N",
    optionB: "√3 N",
    optionC: "0.5 N",
    optionD: "1.5 N",
    correctOption: "C",
    explanation: "Step 1: Condition for the net resultant force to act purely along the y-direction:\nThe sum of all horizontal components must equal zero:\n∑ F_x = 0.\n\nStep 2: Resolving the given forces in the problem diagram along the x-axis yields:\nF_net,x = F₁ cos θ₁ - F₂ cos θ₂ = 0.5 N.\n\nStep 3: To cancel this net horizontal force with a minimum magnitude additional force:\nThe additional force must act purely in the negative x-direction, having magnitude:\n|F_additional| = |F_net,x| = 0.5 N.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Forces acting on a particle have horizontal components of +8 N and -5 N respectively. What is the magnitude of the minimum additional force required so that the net force has no horizontal component? [Same Concept Q]",
      option_a: "13 N",
      option_b: "3 N",
      option_c: "5 N",
      option_d: "8 N",
      correct_option: "B",
      explanation: "Step 1: Current net horizontal component:\n∑ F_x = 8 N - 5 N = +3 N.\n\nStep 2: For net resultant along y-axis only, ∑ F_x must become 0.\nMinimum additional force must be applied along -x direction with magnitude 3 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 259,
    question: "Sand is dropped vertically onto a conveyor belt at a constant rate of M kg/s. The extra force required to keep the belt moving with a constant velocity v m/s is: [AIPMT 2008]",
    optionA: "M v / 2 newton",
    optionB: "Zero",
    optionC: "M v newton",
    optionD: "2 M v newton",
    correctOption: "C",
    explanation: "Step 1: Rate of mass added to the conveyor belt = dm/dt = M kg/s.\n\nStep 2: The dropped sand enters the belt with zero horizontal velocity and must be accelerated to belt speed v.\n\nStep 3: Force required to maintain constant velocity:\nF = d(m v)/dt = v (dm/dt) = M v newton.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Gravel is poured onto a conveyor belt at a rate of 4 kg/s. The conveyor belt moves at a constant speed of 3 m/s. What force is needed to keep the conveyor moving at this constant speed? [Same Concept Q]",
      option_a: "6 N",
      option_b: "12 N",
      option_c: "24 N",
      option_d: "18 N",
      correct_option: "B",
      explanation: "Step 1: Force exerted by the variable mass system:\nF = v × (dm/dt)\n\nStep 2: Given dm/dt = 4 kg/s and v = 3 m/s:\nF = 3 × 4 = 12 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 258,
    question: "A roller coaster is designed such that riders experience weightlessness as they go round the top of a hill of radius of curvature 20 m. The speed of the car at the top of the hill is between: (Take g = 10 m/s²) [AIPMT 2008]",
    optionA: "16 m/s and 17 m/s",
    optionB: "13 m/s and 14 m/s",
    optionC: "14 m/s and 15 m/s",
    optionD: "15 m/s and 16 m/s",
    correctOption: "C",
    explanation: "Step 1: At the top of a vertical circular hill, normal reaction N and gravity m g act vertically:\nm g - N = (m v²) / r\n\nStep 2: For riders to feel weightless, the apparent weight (normal force) becomes zero:\nN = 0 → m g = (m v²) / r\nv = √(r × g)\n\nStep 3: Substitute r = 20 m and g = 10 m/s²:\nv = √(20 × 10) = √200 ≈ 14.14 m/s.\n\nStep 4: The value 14.14 m/s lies between 14 m/s and 15 m/s.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A car drives over the crest of a circular hill of radius 40 m. What is the maximum speed the car can have without losing contact with the road? (g = 10 m/s²) [Same Concept Q]",
      option_a: "15 m/s",
      option_b: "20 m/s",
      option_c: "25 m/s",
      option_d: "30 m/s",
      correct_option: "B",
      explanation: "Step 1: At threshold of losing contact, N = 0:\nm g = (m v²) / R → v = √(g R)\n\nStep 2: Substitute g = 10 m/s², R = 40 m:\nv = √(10 × 40) = √400 = 20 m/s.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 257,
    question: "A body under the action of a force F = (6 i^ - 8 j^ + 10 k^) N acquires an acceleration of 1 m/s². The mass of the body must be: [AIPMT 2009]",
    optionA: "10 kg",
    optionB: "20 kg",
    optionC: "10√2 kg",
    optionD: "2√10 kg",
    correctOption: "C",
    explanation: "Step 1: Calculate the magnitude of the applied force vector:\n|F| = √[(6)² + (-8)² + (10)²]\n|F| = √[36 + 64 + 100] = √200 = 10√2 N.\n\nStep 2: Using Newton's second law, |F| = m × a:\nm = |F| / a\n\nStep 3: Given acceleration a = 1 m/s²:\nm = (10√2 N) / (1 m/s²) = 10√2 kg.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A force vector F = (3 i^ + 4 j^ + 12 k^) N acts on an object, giving it an acceleration of 2.6 m/s². What is the mass of the object? [Same Concept Q]",
      option_a: "5 kg",
      option_b: "10 kg",
      option_c: "13 kg",
      option_d: "26 kg",
      correct_option: "A",
      explanation: "Step 1: Magnitude of force:\n|F| = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13 N.\n\nStep 2: Mass m = |F| / a:\nm = 13 / 2.6 = 5 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

