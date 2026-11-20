module.exports = [
  {
    id: 335,
    question: "Mass 1kg thrown up velocity 100 m/s. After 5 seconds it explodes into two parts. One part mass 400g comes down velocity 25 m/s. Velocity other part? Take g=10 m/s²? [AIPMT 2000]",
    optionA: "40 m/s",
    optionB: "50 m/s",
    optionC: "100 m/s",
    optionD: "60 m/s",
    correctOption: "C",
    explanation: "Step 1: Calculate the velocity of the 1 kg mass just before explosion at t = 5 s:\nUsing the equation of motion under gravity:\nv = u − gt\nGiven u = 100 m/s, g = 10 m/s², and t = 5 s:\nv = 100 − (10 × 5) = 100 − 50 = +50 m/s (upward direction).\n\nStep 2: Calculate the total momentum just before explosion:\nTaking the upward direction as positive (+):\nTotal mass M = 1 kg\nP_initial = M × v = 1 kg × (+50 m/s) = +50 kg m/s.\n\nStep 3: Analyze the fragments after explosion:\n- First fragment: m₁ = 400 g = 0.4 kg, moving downwards with speed 25 m/s:\nv₁ = −25 m/s\nP₁ = m₁ × v₁ = 0.4 kg × (−25 m/s) = −10 kg m/s.\n- Second fragment: m₂ = 1 kg − 0.4 kg = 0.6 kg, with unknown velocity v₂.\n\nStep 4: Apply the law of conservation of linear momentum during internal explosion:\nP_initial = P₁ + P₂\n+50 = −10 + (0.6 × v₂)\n0.6 × v₂ = 50 + 10 = 60\nv₂ = 60 / 0.6 = +100 m/s (upwards).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A bomb of mass 3 kg at rest explodes into two pieces of masses 1 kg and 2 kg. If the 1 kg piece flies off with a velocity of 16 m/s, what is the speed of the 2 kg piece?",
      option_a: "8 m/s",
      option_b: "16 m/s",
      option_c: "4 m/s",
      option_d: "32 m/s",
      correct_option: "A",
      explanation: "Step 1: Initial momentum before explosion is zero since the bomb is at rest:\nP_initial = 0.\n\nStep 2: By conservation of linear momentum:\nm₁v₁ + m₂v₂ = 0 ⇒ |v₂| = (m₁ / m₂) × |v₁|.\n\nStep 3: Substitute given values:\n|v₂| = (1 kg / 2 kg) × 16 m/s = 8 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 334,
    question: "If F=60î+15ĵ-3k̂ N and v=2î-4ĵ+5k̂ m/s then instantaneous power? [AIPMT 2000]",
    optionA: "195 watt",
    optionB: "45 watt",
    optionC: "75 watt",
    optionD: "100 watt",
    correctOption: "B",
    explanation: "Step 1: State the formula for instantaneous mechanical power:\nInstantaneous power P is the scalar (dot) product of the force vector F and velocity vector v:\nP = F · v\n\nStep 2: Express the scalar product in Cartesian components:\nF = F_x î + F_y ĵ + F_z k̂ = 60î + 15ĵ − 3k̂ N\nv = v_x î + v_y ĵ + v_z k̂ = 2î − 4ĵ + 5k̂ m/s\nP = (F_x × v_x) + (F_y × v_y) + (F_z × v_z)\n\nStep 3: Calculate the numerical value:\nP = (60 × 2) + (15 × (−4)) + ((−3) × 5)\nP = 120 − 60 − 15 = 45 W.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A constant force F = (2î + 3ĵ + 4k̂) N produces a displacement of a body moving with a velocity v = (3î − 2ĵ + 2k̂) m/s. The power delivered by the force is:",
      option_a: "8 W",
      option_b: "12 W",
      option_c: "16 W",
      option_d: "4 W",
      correct_option: "A",
      explanation: "Step 1: Power P is given by the dot product:\nP = F · v\n\nStep 2: Compute components:\nP = (2 × 3) + (3 × (−2)) + (4 × 2) = 6 − 6 + 8 = 8 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 333,
    question: "Particle projected making angle 45° with horizontal having kinetic energy K. Kinetic energy at highest point will be? [AIPMT 2001]",
    optionA: "K/√2",
    optionB: "K/2",
    optionC: "2K",
    optionD: "K",
    correctOption: "B",
    explanation: "Step 1: Express initial kinetic energy in terms of projection speed u:\nK = (1/2) m u²\n\nStep 2: Determine the velocity at the highest point of projectile trajectory:\nAt the highest point, the vertical velocity component becomes zero (v_y = 0).\nThe horizontal velocity component remains constant throughout the motion because there is no horizontal acceleration:\nv_highest = u_x = u cos θ\nFor θ = 45°:\nv_highest = u cos 45° = u / √2\n\nStep 3: Calculate kinetic energy at the highest point:\nK_highest = (1/2) m (v_highest)² = (1/2) m (u / √2)²\nK_highest = (1/2) m u² × (1/2) = K / 2.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A projectile is launched with kinetic energy E at an angle of 60° to the horizontal. Its kinetic energy at the highest point of its trajectory is:",
      option_a: "E / 4",
      option_b: "E / 2",
      option_c: "3E / 4",
      option_d: "E",
      correct_option: "A",
      explanation: "Step 1: Horizontal velocity component at the peak is v_top = u cos 60° = u / 2.\n\nStep 2: Kinetic energy at highest point is:\nE_top = (1/2) m (u / 2)² = (1/4) × [(1/2) m u²] = E / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 332,
    question: "Two springs A and B having spring constants KA and KB KA=2KB stretched by applying forces equal magnitude. If energy stored in spring A is EA then energy stored in B will be? [AIPMT 2001]",
    optionA: "2EA",
    optionB: "EA/4",
    optionC: "EA/2",
    optionD: "4EA",
    correctOption: "A",
    explanation: "Step 1: Relate potential energy of a stretched spring to applied force and spring constant:\nElastic potential energy is given by:\nU = (1/2) k x²\nSince restoring force is F = kx ⇒ x = F / k:\nU = (1/2) k (F / k)² = F² / (2k)\n\nStep 2: Compare energies when stretched by equal force F:\nFor equal stretching force F:\nU ∝ 1 / k\nE_A / E_B = K_B / K_A\n\nStep 3: Substitute K_A = 2 K_B:\nE_A / E_B = K_B / (2 K_B) = 1 / 2\nE_B = 2 E_A.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two springs of spring constants k₁ and k₂ (where k₁ = 3k₂) are stretched by the same elongation x. If the energy stored in the first spring is U₁, the energy stored in the second spring is:",
      option_a: "U₁ / 3",
      option_b: "3U₁",
      option_c: "9U₁",
      option_d: "U₁ / 9",
      correct_option: "A",
      explanation: "Step 1: When both springs undergo the same elongation x, potential energy is given by U = (1/2) k x².\n\nStep 2: For constant elongation, U ∝ k:\nU₂ / U₁ = k₂ / k₁ = k₂ / (3k₂) = 1 / 3 ⇒ U₂ = U₁ / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 331,
    question: "Child sitting on swing. Its minimum and maximum heights from ground 0.75m and 2m respectively. Its maximum speed will be? [AIPMT 2001]",
    optionA: "10 m/s",
    optionB: "5 m/s",
    optionC: "8 m/s",
    optionD: "15 m/s",
    correctOption: "B",
    explanation: "Step 1: Calculate the change in vertical height (Δh) during the swing:\nMaximum height = h_max = 2.0 m\nMinimum height (lowest point) = h_min = 0.75 m\nΔh = h_max − h_min = 2.0 − 0.75 = 1.25 m.\n\nStep 2: Apply the Principle of Conservation of Mechanical Energy:\nAt the highest point, speed is momentarily zero, and mechanical energy is purely potential energy.\nAt the lowest point, height is minimum and kinetic energy is maximum:\nLoss in gravitational PE = Gain in kinetic energy\nm g Δh = (1/2) m v_max²\nv_max = √(2 g Δh)\n\nStep 3: Substitute g = 10 m/s² and Δh = 1.25 m:\nv_max = √(2 × 10 × 1.25) = √25 = 5 m/s.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A simple pendulum of bob mass m is displaced until the string makes an angle with vertical such that its height increases by 0.8 m. The speed of the bob as it passes through the lowest point is (g = 10 m/s²):",
      option_a: "4 m/s",
      option_b: "2 m/s",
      option_c: "8 m/s",
      option_d: "5 m/s",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy, loss in potential energy equals gain in kinetic energy:\nv = √(2 g h)\n\nStep 2: Substitute g = 10 m/s² and h = 0.8 m:\nv = √(2 × 10 × 0.8) = √16 = 4 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 330,
    question: "When long spring stretched by 2cm its potential energy U. If spring stretched by 10cm potential energy stored will be? [AIPMT 2003]",
    optionA: "U/5",
    optionB: "5U",
    optionC: "10U",
    optionD: "25U",
    correctOption: "D",
    explanation: "Step 1: State the formula for elastic potential energy of a spring:\nU = (1/2) k x²\nwhere k is the spring force constant and x is the elongation.\nTherefore, U ∝ x².\n\nStep 2: Form the ratio of potential energies for two different extensions:\nU₂ / U₁ = (x₂ / x₁)²\n\nStep 3: Substitute x₁ = 2 cm and x₂ = 10 cm:\nU₂ / U = (10 / 2)² = 5² = 25\nU₂ = 25 U.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A spring of force constant k stores energy E when stretched by an amount x. What is the additional work required to stretch the spring from extension x to 2x?",
      option_a: "3E",
      option_b: "E",
      option_c: "2E",
      option_d: "4E",
      correct_option: "A",
      explanation: "Step 1: Energy stored at extension x is E = (1/2) k x².\n\nStep 2: Total energy stored at extension 2x is E_total = (1/2) k (2x)² = 4 × [(1/2) k x²] = 4E.\n\nStep 3: Additional work needed is W = E_total − E = 4E − E = 3E.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 329,
    question: "Particle moves along circle radius 20/π m with constant tangential acceleration. If velocity particle 80 m/s at end second revolution after motion begun tangential acceleration? [AIPMT 2003]",
    optionA: "40 m/s²",
    optionB: "640π m/s²",
    optionC: "160π m/s²",
    optionD: "40π m/s²",
    correctOption: "A",
    explanation: "Step 1: Calculate the total linear distance s traversed along the circular path in two complete revolutions:\nCircumference of one revolution = 2πr\nFor 2 revolutions: s = 2 × (2πr) = 4πr\nGiven radius r = (20 / π) m:\ns = 4π × (20 / π) = 80 m.\n\nStep 2: Use the third equation of motion along the circular path with constant tangential acceleration a_t:\nv² = u² + 2 a_t s\nGiven initial velocity u = 0 (motion begun from rest), final velocity v = 80 m/s, and distance s = 80 m:\n80² = 0 + 2 × a_t × 80\n6400 = 160 × a_t\na_t = 6400 / 160 = 40 m/s².\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A particle starts from rest on a circular track of radius 5 m with constant tangential acceleration 2 m/s². What is its speed after completing one full revolution?",
      option_a: "2√(10π) m/s",
      option_b: "10π m/s",
      option_c: "4π m/s",
      option_d: "20 m/s",
      correct_option: "A",
      explanation: "Step 1: Distance for one revolution is s = 2πr = 2π(5) = 10π m.\n\nStep 2: Using v² = u² + 2 a_t s:\nv² = 0 + 2(2)(10π) = 40π\nv = √40π = 2√(10π) m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 328,
    question: "Mass 0.5kg moving speed 1.5 m/s on smooth horizontal surface collides with nearly weightless spring force constant k=50 N/m. Maximum compression spring would be? [AIPMT 2004]",
    optionA: "0.15 m",
    optionB: "0.12 m",
    optionC: "1.5 m",
    optionD: "0.5 m",
    correctOption: "A",
    explanation: "Step 1: Apply the Principle of Conservation of Mechanical Energy:\nAt maximum compression (x_max), the entire initial kinetic energy of the moving block is converted into elastic potential energy of the spring:\n(1/2) m v² = (1/2) k (x_max)²\n\nStep 2: Express maximum compression in terms of known parameters:\nx_max = v × √(m / k)\n\nStep 3: Substitute the given values:\n- m = 0.5 kg\n- v = 1.5 m/s\n- k = 50 N/m\n\nx_max = 1.5 × √(0.5 / 50) = 1.5 × √(1 / 100) = 1.5 × 0.1 = 0.15 m.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A 1 kg mass moving at 4 m/s hits a spring of force constant 100 N/m on a frictionless surface. What is the maximum compression of the spring?",
      option_a: "0.4 m",
      option_b: "0.2 m",
      option_c: "0.8 m",
      option_d: "0.16 m",
      correct_option: "A",
      explanation: "Step 1: Using conservation of energy:\n(1/2) m v² = (1/2) k x²\n\nStep 2: Substitute values:\nx = v √(m / k) = 4 × √(1 / 100) = 4 × 0.1 = 0.4 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 327,
    question: "Ball mass 2kg and another mass 4kg dropped together from 60-foot-tall building. After falling 30 feet each respective kinetic energies will be ratio? [AIPMT 2004]",
    optionA: "√2:1",
    optionB: "1:4",
    optionC: "1:2",
    optionD: "1:√2",
    correctOption: "C",
    explanation: "Step 1: Determine the velocity after falling through height h = 30 feet:\nUnder free fall from rest in vacuum/air with negligible resistance, acceleration due to gravity g is independent of mass:\nv² = u² + 2gh = 0 + 2gh = 2gh\nv = √(2gh)\nBoth the 2 kg ball and 4 kg ball fall the exact same distance (30 feet), so they attain identical velocities v.\n\nStep 2: Compare their kinetic energies:\nKE = (1/2) m v²\nSince velocity v is identical for both balls:\nKE₁ / KE₂ = m₁ / m₂\n\nStep 3: Substitute m₁ = 2 kg and m₂ = 4 kg:\nKE₁ / KE₂ = 2 / 4 = 1 / 2 = 1 : 2.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two bodies of masses 1 kg and 3 kg are dropped simultaneously from the same height. After falling through a distance of 10 m, what is the ratio of their kinetic energies?",
      option_a: "1 : 3",
      option_b: "1 : 9",
      option_c: "1 : 1",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "Step 1: The velocity acquired by any freely falling body after falling a distance h from rest is v = √(2gh), which is independent of its mass.\n\nStep 2: Kinetic energy KE = (1/2) m v² is directly proportional to mass for equal velocities:\nKE₁ / KE₂ = m₁ / m₂ = 1 / 3 = 1 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 326,
    question: "Particle mass m1 moves velocity v1 and another particle mass m2 moves velocity v2. Both have same momentum but kinetic energies E1 and E2 respectively. If m1>m2 then? [AIPMT 2004]",
    optionA: "E1<E2",
    optionB: "E1/E2=m1/m2",
    optionC: "E1>E2",
    optionD: "E1=E2",
    correctOption: "A",
    explanation: "Step 1: Express kinetic energy in terms of linear momentum p:\nLinear momentum p = m v ⇒ v = p / m\nKinetic energy E = (1/2) m v² = (1/2) m (p / m)² = p² / (2m)\n\nStep 2: Compare kinetic energies for equal linear momentum (p₁ = p₂ = p):\nFor constant momentum p:\nE ∝ 1 / m\nE₁ / E₂ = m₂ / m₁\n\nStep 3: Evaluate for m₁ > m₂:\nSince m₁ > m₂, the denominator is greater than the numerator:\nm₂ / m₁ < 1 ⇒ E₁ / E₂ < 1\nE₁ < E₂.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A light body and a heavy body possess equal kinetic energies. Which body has greater linear momentum?",
      option_a: "The heavy body",
      option_b: "The light body",
      option_c: "Both have equal momentum",
      option_d: "Cannot be determined without knowing their velocities",
      correct_option: "A",
      explanation: "Step 1: From the relationship p = √(2mE):\nFor constant kinetic energy E, momentum p is directly proportional to √m (p ∝ √m).\n\nStep 2: The body with greater mass m (the heavy body) has greater linear momentum.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 325,
    question: "Force F acting object varies with distance x as shown figure. Force N and x m. Work done by force moving object from x=0 to x=6m? [AIPMT 2005]",
    optionA: "18.0 J",
    optionB: "13.5 J",
    optionC: "9.0 J",
    optionD: "4.5 J",
    correctOption: "B",
    explanation: "Step 1: Recall the graphical method to find work done by a variable force:\nWork done by a force F(x) is equal to the area under the Force-versus-displacement (F-x) curve:\nW = ∫ F dx = Area under F-x curve from x = 0 to x = 6 m\n\nStep 2: Break down the area into geometric sections:\n1. From x = 0 to x = 3 m, the curve forms a triangle with base = 3 m and height = 3 N:\nArea₁ = (1/2) × base × height = (1/2) × 3 × 3 = 4.5 J\n2. From x = 3 to x = 6 m, the curve forms a rectangle with base = (6 − 3) = 3 m and constant force height = 3 N:\nArea₂ = base × height = 3 × 3 = 9.0 J\n\nStep 3: Sum the total area:\nW_total = Area₁ + Area₂ = 4.5 + 9.0 = 13.5 J.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A force F = 2x (in N) acts on a particle moving along the x-axis. The work done by this force in moving the particle from x = 1 m to x = 4 m is:",
      option_a: "15 J",
      option_b: "16 J",
      option_c: "8 J",
      option_d: "30 J",
      correct_option: "A",
      explanation: "Step 1: Calculate work by integrating F dx:\nW = ∫₁⁴ (2x) dx = [x²]₁⁴\n\nStep 2: Evaluate the limits:\nW = 4² − 1² = 16 − 1 = 15 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 324,
    question: "Body mass 3kg under constant force which causes displacement s=(1/3)t² metres where t seconds. Work done by force in 2 seconds? [AIPMT 2006]",
    optionA: "19/5 J",
    optionB: "5/19 J",
    optionC: "3/8 J",
    optionD: "8/3 J",
    correctOption: "D",
    explanation: "Step 1: Express displacement and differentiate to find velocity as a function of time:\ns = (1/3) t²\nv = ds / dt = (d/dt) [(1/3) t²] = (2/3) t\n\nStep 2: Find the initial velocity (at t = 0) and final velocity (at t = 2 s):\nAt t = 0: v_initial = (2/3) × 0 = 0 m/s\nAt t = 2 s: v_final = (2/3) × 2 = 4/3 m/s\n\nStep 3: Apply the Work-Energy Theorem:\nWork done by the force equals the change in kinetic energy:\nW = ΔKE = (1/2) m (v_final)² − (1/2) m (v_initial)²\n\nStep 4: Substitute mass m = 3 kg:\nW = (1/2) × 3 × (4/3)² − 0\nW = (3/2) × (16 / 9) = 48 / 18 = 8/3 J.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A force acts on a 2 kg body so that its position is given as x = 3t² + 5 (in m). The work done by the force in the first 2 seconds is:",
      option_a: "144 J",
      option_b: "72 J",
      option_c: "36 J",
      option_d: "288 J",
      correct_option: "A",
      explanation: "Step 1: Velocity is v = dx/dt = 6t.\n\nStep 2: At t = 0, v = 0. At t = 2 s, v = 6(2) = 12 m/s.\n\nStep 3: Work done W = ΔKE = (1/2) m v² = (1/2) × 2 × 12² = 144 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 323,
    question: "Potential energy long spring when stretched by 2cm is U. If spring stretched by 8cm potential energy stored? [AIPMT 2006]",
    optionA: "U/4",
    optionB: "4U",
    optionC: "8U",
    optionD: "16U",
    correctOption: "D",
    explanation: "Step 1: Potential energy of a spring is proportional to the square of elongation:\nU = (1/2) k x²\nTherefore, U ∝ x².\n\nStep 2: Set up the ratio for the two extensions:\nU' / U = (x' / x)²\n\nStep 3: Substitute x = 2 cm and x' = 8 cm:\nU' / U = (8 / 2)² = 4² = 16\nU' = 16 U.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "When a spring is stretched by 3 cm, its potential energy is 9 J. What is its potential energy when stretched by 6 cm?",
      option_a: "36 J",
      option_b: "18 J",
      option_c: "27 J",
      option_d: "81 J",
      correct_option: "A",
      explanation: "Step 1: Since U ∝ x²:\nU₂ / U₁ = (x₂ / x₁)² = (6 / 3)² = 2² = 4.\n\nStep 2: Calculate U₂:\nU₂ = 4 × 9 J = 36 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 322,
    question: "300J work done sliding 2kg block up inclined plane height 10m. Work done against friction g=10 m/s²? [AIPMT 2006]",
    optionA: "1000 J",
    optionB: "200 J",
    optionC: "100 J",
    optionD: "Zero",
    correctOption: "C",
    explanation: "Step 1: Calculate the work done against gravity:\nWhen a block of mass m is raised through a vertical height h, the increase in gravitational potential energy is:\nW_gravity = mgh\nGiven m = 2 kg, g = 10 m/s², and h = 10 m:\nW_gravity = 2 × 10 × 10 = 200 J.\n\nStep 2: Relate total work done to work against gravity and friction:\nThe total external work done on the block goes into overcoming gravity and doing work against frictional forces:\nW_total = W_gravity + W_friction\n\nStep 3: Solve for work done against friction:\n300 J = 200 J + W_friction\nW_friction = 300 − 200 = 100 J.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A total of 500 J of work is done in moving a 5 kg block up an inclined plane to a height of 8 m. The work done against friction is (g = 10 m/s²):",
      option_a: "100 J",
      option_b: "400 J",
      option_c: "200 J",
      option_d: "50 J",
      correct_option: "A",
      explanation: "Step 1: Work against gravity is W_g = mgh = 5 × 10 × 8 = 400 J.\n\nStep 2: Work against friction W_f = W_total − W_g = 500 − 400 = 100 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 321,
    question: "Vertical spring force constant k fixed on table. Ball mass m at height h above free upper end spring falls vertically onto spring so that spring compressed distance d. Net work done in process? [AIPMT 2007]",
    optionA: "mg(h+d)−(1/2)kd²",
    optionB: "mg(h-d)−(1/2)kd²",
    optionC: "mg(h-d)+(1/2)kd²",
    optionD: "mg(h+d)+(1/2)kd²",
    correctOption: "A",
    explanation: "Step 1: Calculate work done by gravity:\nThe ball drops from an initial height h above the uncompressed spring down to maximum compression d. The total vertical downward displacement of the ball is (h + d).\nSince gravity acts vertically downwards in the direction of displacement:\nW_gravity = +mg(h + d)\n\nStep 2: Calculate work done by the spring force:\nAs the spring is compressed by distance d, the restoring force of the spring opposes the compression (directed upwards while displacement is downwards):\nW_spring = −(1/2) k d²\n\nStep 3: Find the net total work done on the ball:\nW_net = W_gravity + W_spring = mg(h + d) − (1/2) kd².\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A block of mass m falls from height h onto a vertical spring of constant k. If the maximum compression is x, what does the Work-Energy Theorem state regarding the net work done on the block between release and momentary rest?",
      option_a: "Net work done = 0",
      option_b: "Net work done = mgh",
      option_c: "Net work done = (1/2) k x²",
      option_d: "Net work done = mg(h + x)",
      correct_option: "A",
      explanation: "Step 1: According to the Work-Energy Theorem, W_net = ΔKE.\n\nStep 2: The block starts from rest (initial KE = 0) and comes momentarily to rest at maximum compression (final KE = 0).\n\nStep 3: Thus, ΔKE = 0 − 0 = 0, so the net work done on the block over the entire process is zero: W_gravity + W_spring = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 320,
    question: "Water falls from height 60m at rate 15 kg/s to operate turbine. Losses due friction 10% energy. How much power generated by turbine? g=10 m/s²? [AIPMT 2008]",
    optionA: "12.3 kW",
    optionB: "7.0 kW",
    optionC: "8.1 kW",
    optionD: "10.2 kW",
    correctOption: "C",
    explanation: "Step 1: Calculate total input potential energy rate (input power) of the falling water:\nP_input = (dm / dt) × g × h\nGiven:\n- Rate of mass flow dm/dt = 15 kg/s\n- Acceleration due to gravity g = 10 m/s²\n- Height h = 60 m\nP_input = 15 × 10 × 60 = 9,000 W = 9.0 kW\n\nStep 2: Account for frictional losses:\nFrictional losses = 10% of input power.\nTurbine efficiency η = 100% − 10% = 90% = 0.90.\n\nStep 3: Calculate power generated by the turbine:\nP_generated = η × P_input = 0.90 × 9.0 kW = 8.1 kW.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Water falls from a dam of height 40 m at a rate of 20 kg/s to drive a generator. If 20% of the energy is lost, the useful power output is (g = 10 m/s²):",
      option_a: "6.4 kW",
      option_b: "8.0 kW",
      option_c: "1.6 kW",
      option_d: "4.8 kW",
      correct_option: "A",
      explanation: "Step 1: Total input power is P_in = (dm/dt) g h = 20 × 10 × 40 = 8000 W = 8 kW.\n\nStep 2: Useful power with 20% loss (80% efficiency) is:\nP_out = 0.8 × 8 kW = 6.4 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 319,
    question: "Engine pumps water continuously through hose. Water leaves hose velocity v and m is mass per unit length water jet. What rate at which kinetic energy imparted to water? [AIPMT 2009]",
    optionA: "mv³",
    optionB: "(1/2)mv²",
    optionC: "(1/2)m²v²",
    optionD: "(1/2)mv³",
    correctOption: "D",
    explanation: "Step 1: Find the mass of water emerging from the hose per unit time (dm/dt):\nIn time dt, the length of the water jet ejected is dx = v dt.\nThe mass of water in this length is dm = m × dx = m × (v dt),\nwhere m is the mass per unit length.\nTherefore, the mass flow rate is:\ndm / dt = m × v\n\nStep 2: Calculate the rate at which kinetic energy is imparted:\nThe kinetic energy of mass dm moving with velocity v is dK = (1/2) dm v².\nThe rate of change of kinetic energy (power imparted) is:\ndK / dt = (1/2) × (dm / dt) × v²\n\nStep 3: Substitute dm/dt = m v:\ndK / dt = (1/2) × (m v) × v² = (1/2) m v³.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the force exerted by an engine on a water jet of linear mass density μ emerging with constant speed v?",
      option_a: "μv²",
      option_b: "(1/2) μv²",
      option_c: "μv",
      option_d: "(1/2) μv³",
      correct_option: "A",
      explanation: "Step 1: According to Newton's second law for variable mass flow:\nF = d(mv) / dt = v (dm / dt).\n\nStep 2: Here dm/dt = μ v.\n\nStep 3: Therefore, F = v × (μ v) = μ v².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 318,
    question: "Body mass 1kg thrown upwards velocity 20 m/s. It momentarily comes to rest after attaining height 18m. How much energy lost due air friction? g=10 m/s²? [AIPMT 2009]",
    optionA: "30 J",
    optionB: "40 J",
    optionC: "10 J",
    optionD: "20 J",
    correctOption: "D",
    explanation: "Step 1: Calculate initial mechanical energy at the point of projection (ground level h = 0):\nInitial kinetic energy K_initial = (1/2) m u²\nGiven m = 1 kg and u = 20 m/s:\nK_initial = (1/2) × 1 × (20)² = 200 J\nInitial potential energy U_initial = 0\nE_initial = 200 J\n\nStep 2: Calculate final mechanical energy at maximum height h = 18 m:\nAt the highest point, speed is momentarily zero, so K_final = 0.\nFinal potential energy U_final = mgh\nGiven g = 10 m/s² and h = 18 m:\nU_final = 1 × 10 × 18 = 180 J\nE_final = 180 J\n\nStep 3: Compute the energy dissipated against air resistance:\nEnergy lost = E_initial − E_final = 200 J − 180 J = 20 J.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A ball of mass 0.5 kg is dropped from a height of 20 m and rebounds to a height of 15 m. How much mechanical energy is lost during the impact? (g = 10 m/s²)",
      option_a: "25 J",
      option_b: "50 J",
      option_c: "75 J",
      option_d: "100 J",
      correct_option: "A",
      explanation: "Step 1: Initial energy E₁ = mgh₁ = 0.5 × 10 × 20 = 100 J.\n\nStep 2: Final rebound energy E₂ = mgh₂ = 0.5 × 10 × 15 = 75 J.\n\nStep 3: Energy lost = E₁ − E₂ = 100 − 75 = 25 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 317,
    question: "Block mass M attached lower end vertical spring hanging ceiling. Spring force constant k. Mass released from rest spring initially unstretched. Maximum extension produced in spring will be? [AIPMT 2009]",
    optionA: "2Mg/k",
    optionB: "4Mg/k",
    optionC: "Mg/2k",
    optionD: "Mg/k",
    correctOption: "A",
    explanation: "Step 1: Set up the mechanical energy balance:\nLet x_max be the maximum elongation of the spring.\nAs the mass M drops by distance x_max from rest, it loses gravitational potential energy:\nLoss in gravitational PE = M g x_max\n\nStep 2: Relate to elastic potential energy of the spring:\nThe mass starts from rest (v = 0) and comes momentarily to rest at maximum extension (v = 0), so change in kinetic energy is zero (ΔKE = 0).\nTherefore, loss in gravitational PE equals gain in elastic potential energy of the spring:\nM g x_max = (1/2) k (x_max)²\n\nStep 3: Solve for x_max (excluding x_max = 0):\nM g = (1/2) k x_max\nx_max = 2 M g / k.\n(Note: Equilibrium extension is x_eq = Mg/k; the mass oscillates about x_eq with amplitude Mg/k, reaching maximum extension 2Mg/k).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the equilibrium elongation of a vertical spring of force constant k when supporting a suspended mass M at rest?",
      option_a: "Mg / k",
      option_b: "2Mg / k",
      option_c: "Mg / 2k",
      option_d: "4Mg / k",
      correct_option: "A",
      explanation: "Step 1: At static equilibrium, the downward gravitational force equals the upward restoring spring force:\nk x_eq = Mg\n\nStep 2: Solving gives x_eq = Mg / k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 316,
    question: "Engine pumps water through hose pipe. Water leaves pipe velocity 2 m/s. Mass per unit length water in pipe 100 kg/m. What power engine? [AIPMT 2010 Prelims]",
    optionA: "400 W",
    optionB: "200 W",
    optionC: "100 W",
    optionD: "800 W",
    correctOption: "A",
    explanation: "Step 1: Calculate the mass flow rate of water (dm/dt):\nMass flow rate = (mass per unit length) × (velocity)\ndm / dt = 100 kg/m × 2 m/s = 200 kg/s\n\nStep 2: State the formula for the rate of kinetic energy imparted to the liquid stream:\nP = (1/2) × (dm / dt) × v²\n\nStep 3: Substitute the known values:\nP = (1/2) × 200 kg/s × (2 m/s)²\nP = 100 × 4 = 400 W.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Water leaves a pipe of linear mass density 50 kg/m at a speed of 4 m/s. The power required to maintain this flow is:",
      option_a: "1600 W",
      option_b: "800 W",
      option_c: "400 W",
      option_d: "3200 W",
      correct_option: "A",
      explanation: "Step 1: Mass flow rate is dm/dt = (mass/length) × v = 50 × 4 = 200 kg/s.\n\nStep 2: Power is P = (1/2) (dm/dt) v² = (1/2) × 200 × 4² = 100 × 16 = 1600 W.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

