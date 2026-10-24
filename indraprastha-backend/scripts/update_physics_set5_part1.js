const fs = require('fs');

const set5Part1Updates = [
  {
    id: 76, // Q1
    similar_question: {
      question: "A vehicle moves with a velocity of 20 m/s towards East. After 5 seconds, it turns and moves with a velocity of 20 m/s towards North. What is the magnitude of the average acceleration of the vehicle?",
      option_a: "4√2 m/s²",
      option_b: "4 m/s²",
      option_c: "8 m/s²",
      option_d: "2√2 m/s²",
      correct_option: "A",
      explanation: "Step 1: Write initial and final velocities in vector form:\nv₁ = 20 i (East)\nv₂ = 20 j (North).\n\nStep 2: Calculate change in velocity vector:\nΔv = v₂ − v₁ = 20 j − 20 i.\nMagnitude |Δv| = √[(−20)² + (20)²] = √(400 + 400) = 20√2 m/s.\n\nStep 3: Calculate average acceleration:\na_avg = |Δv| / Δt = (20√2 m/s) / 5 s = 4√2 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 77, // Q2
    similar_question: {
      question: "The speed of a motorboat in still water is 25 m/s. A river flows due East at 15 m/s. If the boat wishes to cross the river straight across along the shortest path (directly North), at what angle with respect to North must the boat be steered?",
      option_a: "sin⁻¹(0.60) West of North",
      option_b: "sin⁻¹(0.60) East of North",
      option_c: "cos⁻¹(0.60) West of North",
      option_d: "tan⁻¹(0.60) West of North",
      correct_option: "A",
      explanation: "Step 1: For the boat to travel directly North (shortest path), its resultant horizontal velocity must be zero:\nv_resultant_x = 0.\n\nStep 2: Resolve boat's velocity when steered at angle θ West of North:\nv_bx = −v_b sin θ (West)\nv_by = v_b cos θ (North).\n\nStep 3: Balance the river's flow:\nv_b sin θ = v_river\n25 sin θ = 15  →  sin θ = 15 / 25 = 0.60\nθ = sin⁻¹(0.60) West of North.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 78, // Q3
    similar_question: {
      question: "The coordinates of a particle moving in the x-y plane vary with time t as x = 8t − 3t² and y = 12t (where x, y are in metres and t is in seconds). What is the acceleration of the particle at t = 3 s?",
      option_a: "−6 m/s² along the x-axis",
      option_b: "6 m/s² along the y-axis",
      option_c: "−10 m/s² along the x-axis",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Differentiate x(t) to find acceleration a_x:\nv_x = dx / dt = 8 − 6t\na_x = dv_x / dt = −6 m/s² (constant for all t).\n\nStep 2: Differentiate y(t) to find acceleration a_y:\nv_y = dy / dt = 12\na_y = dv_y / dt = 0.\n\nStep 3: Net acceleration:\na = a_x i + a_y j = −6 i m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 79, // Q4
    similar_question: {
      question: "If the horizontal range R of a projectile is equal to three times its maximum height H (R = 3H), what is the angle of projection with the horizontal?",
      option_a: "tan⁻¹(4/3)",
      option_b: "tan⁻¹(3/4)",
      option_c: "tan⁻¹(1/3)",
      option_d: "tan⁻¹(4)",
      correct_option: "A",
      explanation: "Step 1: Formulas for range R and maximum height H:\nR = (u² sin 2θ) / g = (2u² sin θ cos θ) / g\nH = (u² sin² θ) / (2g).\n\nStep 2: Relate R and H:\nR / H = 4 / tan θ  →  tan θ = 4 / (R / H).\n\nStep 3: Given R / H = 3:\ntan θ = 4 / 3  →  θ = tan⁻¹(4/3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 84, // Q5
    similar_question: {
      question: "A stone is thrown with an initial speed of 30 m/s at an angle that produces the maximum possible horizontal range. Taking g = 10 m/s², what is this maximum range?",
      option_a: "90 m",
      option_b: "45 m",
      option_c: "60 m",
      option_d: "180 m",
      correct_option: "A",
      explanation: "Step 1: Maximum horizontal range condition:\nRange is maximum when launch angle θ = 45°.\nR_max = u² / g.\n\nStep 2: Substitute given values:\nR_max = (30 m/s)² / (10 m/s²) = 900 / 10 = 90 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 86, // Q6
    similar_question: {
      question: "The speed of a projectile at its highest point is found to be (1/√2) times its initial speed of projection. What is the angle of projection above the horizontal?",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "75°",
      correct_option: "A",
      explanation: "Step 1: Velocity at maximum height:\nAt the highest point, vertical velocity v_y = 0. The speed is entirely horizontal:\nv_top = u cos θ.\n\nStep 2: Equate with the given condition:\nu cos θ = u / √2  →  cos θ = 1 / √2  →  θ = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 88, // Q7
    similar_question: {
      question: "Two projectiles are launched with identical initial speeds at complementary angles (30° − α) and (60° + α) respectively. What is the ratio of their horizontal ranges?",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "2 : 1",
      option_d: "1 : 3",
      correct_option: "A",
      explanation: "Step 1: Sum of the two angles:\nθ₁ + θ₂ = (30° − α) + (60° + α) = 90° (complementary angles).\n\nStep 2: Property of projectile ranges for complementary angles:\nHorizontal range for angle θ and (90° − θ) are identical for the same projection speed:\nR(θ) = R(90° − θ).\n\nStep 3: Ratio:\nR₁ / R₂ = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 89, // Q8
    similar_question: {
      question: "A particle moves in the x-y plane with coordinates x = 3 + 5t and y = 4t + 6t². What type of motion does the particle execute?",
      option_a: "Uniformly accelerated motion along a parabolic path",
      option_b: "Uniform motion along a straight line",
      option_c: "Non-uniformly accelerated motion",
      option_d: "Uniform circular motion",
      correct_option: "A",
      explanation: "Step 1: Horizontal acceleration:\nx = 3 + 5t  →  v_x = 5 m/s, a_x = 0.\n\nStep 2: Vertical acceleration:\ny = 4t + 6t²  →  v_y = 4 + 12t, a_y = 12 m/s² (constant).\n\nStep 3: Trajectory:\nSince t = (x − 3)/5, substituting into y gives a quadratic equation in x (parabola) with constant net acceleration a = 12 j m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 92, // Q9
    similar_question: {
      question: "A projectile projected with speed u at an angle of 15° with the horizontal has a horizontal range of 40 m. What will be its horizontal range if it is projected with the same speed at an angle of 45°?",
      option_a: "80 m",
      option_b: "60 m",
      option_c: "120 m",
      option_d: "40 m",
      correct_option: "A",
      explanation: "Step 1: Formula for horizontal range:\nR = (u² sin 2θ) / g.\n\nStep 2: For θ₁ = 15°:\nR₁ = [u² sin(30°)] / g = (u² / g) × (1/2) = 40 m  →  u² / g = 80 m.\n\nStep 3: For θ₂ = 45°:\nR₂ = [u² sin(90°)] / g = u² / g = 80 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2184, // Q10
    similar_question: {
      question: "A truck accelerates from rest with a uniform acceleration of 2.5 m/s² along a horizontal road. At t = 4 s, a passenger drops a ball from a window 5 m above the road. What is the horizontal speed of the ball just before it hits the ground? (Take g = 10 m/s²)",
      option_a: "10 m/s",
      option_b: "0 m/s",
      option_c: "5 m/s",
      option_d: "15 m/s",
      correct_option: "A",
      explanation: "Step 1: Speed of the truck at the instant of release (t = 4 s):\nv_x = u + a t = 0 + (2.5 m/s² × 4 s) = 10 m/s.\n\nStep 2: In the absence of horizontal forces, horizontal velocity remains constant throughout the free fall:\nv_horizontal = 10 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2185, // Q11
    similar_question: {
      question: "A particle moves in the x-y plane such that its position coordinates at any time t are x = 4t and y = 2t³ (in metres). What is the magnitude of the acceleration of the particle at t = 2 s?",
      option_a: "24 m/s²",
      option_b: "12 m/s²",
      option_c: "48 m/s²",
      option_d: "16 m/s²",
      correct_option: "A",
      explanation: "Step 1: Differentiate x(t):\nv_x = 4 m/s  →  a_x = 0.\n\nStep 2: Differentiate y(t):\nv_y = d/dt [2t³] = 6t²\na_y = d/dt [6t²] = 12t.\n\nStep 3: At t = 2 s:\na_y = 12 × 2 = 24 m/s².\nNet acceleration = √(0² + 24²) = 24 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2186, // Q12
    similar_question: {
      question: "Assertion (A): In uniform circular motion, acceleration is present but the speed of the body remains constant.\nReason (R): The acceleration is directed radially perpendicular to the velocity vector, doing no work on the body.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: In uniform circular motion, the direction of velocity changes continuously, requiring centripetal acceleration a_c = v² / r.\n\nStep 2: Because the acceleration is strictly perpendicular to velocity (a · v = 0), the rate of work done (power P = F · v) is zero. Thus, kinetic energy and speed remain constant.\nBoth (A) and (R) are true and (R) correctly explains (A).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2187, // Q13
    similar_question: {
      question: "For an initial velocity v₁ = 6 i − 8 j and a subsequent velocity v₂ = 6 i + 8 j (in m/s), what is the magnitude of the change in velocity |Δv|?",
      option_a: "16 m/s",
      option_b: "12 m/s",
      option_c: "0 m/s",
      option_d: "20 m/s",
      correct_option: "A",
      explanation: "Step 1: Calculate the change in velocity vector Δv:\nΔv = v₂ − v₁ = (6 i + 8 j) − (6 i − 8 j)\n   = (6 − 6) i + (8 − (−8)) j = 16 j m/s.\n\nStep 2: Compute the magnitude:\n|Δv| = √(0² + 16²) = 16 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2188, // Q14
    similar_question: {
      question: "The position vector of a particle is given by r(t) = 3 cos(ωt) i + 4 cos(ωt) j. What is the trajectory followed by the particle?",
      option_a: "A straight line passing through the origin",
      option_b: "An ellipse",
      option_c: "A circle",
      option_d: "A parabola",
      correct_option: "A",
      explanation: "Step 1: Express x and y coordinates:\nx = 3 cos(ωt)\ny = 4 cos(ωt).\n\nStep 2: Eliminate the parameter cos(ωt):\ny / x = [4 cos(ωt)] / [3 cos(ωt)] = 4 / 3\ny = (4/3) x.\nThis is the equation of a straight line y = mx passing through the origin.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2189, // Q15
    similar_question: {
      question: "A cannonball is launched with a speed of 200 m/s at an angle of 30° above the horizontal. Taking g = 10 m/s², what is the maximum height attained by the cannonball?",
      option_a: "500 m",
      option_b: "1000 m",
      option_c: "250 m",
      option_d: "2000 m",
      correct_option: "A",
      explanation: "Step 1: Formula for maximum height:\nH = (u² sin² θ) / (2g).\n\nStep 2: Substitute u = 200 m/s, θ = 30°, g = 10 m/s²:\nsin 30° = 0.5\nH = [(200)² × (0.5)²] / (2 × 10) = [40000 × 0.25] / 20 = 10000 / 20 = 500 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2190, // Q16
    similar_question: {
      question: "For a projectile launched from level ground, at what angle of projection θ is the horizontal range equal to its maximum height (R = H)?",
      option_a: "tan⁻¹(4)",
      option_b: "tan⁻¹(1/4)",
      option_c: "45°",
      option_d: "tan⁻¹(2)",
      correct_option: "A",
      explanation: "Step 1: Formula relating range R and maximum height H:\nR / H = 4 / tan θ  →  tan θ = 4(H / R).\n\nStep 2: For R = H:\ntan θ = 4(1) = 4  →  θ = tan⁻¹(4) ≈ 76°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2191, // Q17
    similar_question: {
      question: "Two projectiles A and B are fired from level ground with the same speed. Projectile A reaches a maximum height H_A and projectile B reaches H_B, where H_A > H_B. How do their times of flight T_A and T_B compare?",
      option_a: "T_A > T_B",
      option_b: "T_A < T_B",
      option_c: "T_A = T_B",
      option_d: "Cannot be determined without projection angles",
      correct_option: "A",
      explanation: "Step 1: Formulas for maximum height and time of flight:\nH = u_y² / (2g)  →  u_y = √(2gH)\nT = 2 u_y / g = 2 √(2H / g).\n\nStep 2: Since T is directly proportional to √H:\nH_A > H_B  implies  T_A > T_B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2192, // Q18
    similar_question: {
      question: "The range of a shell fired at 15° to the horizontal is 1.2 km. If the same shell is fired with the same initial velocity at 45° to the horizontal, what will be its range?",
      option_a: "2.4 km",
      option_b: "1.2 km",
      option_c: "3.6 km",
      option_d: "4.8 km",
      correct_option: "A",
      explanation: "Step 1: Range formula:\nR = (u² sin 2θ) / g.\n\nStep 2: At θ = 15°:\nR(15°) = (u² / g) sin 30° = (u² / g) × 0.5 = 1.2 km  →  u² / g = 2.4 km.\n\nStep 3: At θ = 45°:\nR(45°) = (u² / g) sin 90° = u² / g = 2.4 km.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2193, // Q19
    similar_question: {
      question: "A projectile has a horizontal range of 320 m and a time of flight of 8 s. Taking g = 10 m/s², what is the horizontal component of its velocity?",
      option_a: "40 m/s",
      option_b: "80 m/s",
      option_c: "20 m/s",
      option_d: "50 m/s",
      correct_option: "A",
      explanation: "Step 1: Horizontal motion in projectile motion is uniform:\nRange R = v_x × T.\n\nStep 2: Solve for horizontal velocity component v_x:\nv_x = R / T = 320 m / 8 s = 40 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2194, // Q20
    similar_question: {
      question: "Two projectiles of the same mass are thrown with the same speed at angles of 25° and 65° with the horizontal. Which of the following quantities is the SAME for both projectiles?",
      option_a: "Horizontal range",
      option_b: "Maximum height",
      option_c: "Time of flight",
      option_d: "Speed at highest point",
      correct_option: "A",
      explanation: "Step 1: Angles 25° and 65° are complementary (25° + 65° = 90°).\n\nStep 2: For complementary angles with identical initial speeds:\n- Horizontal ranges are equal: R(θ) = R(90° − θ).\n- Maximum heights, times of flight, and top speeds all differ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2195, // Q21
    similar_question: {
      question: "For angles of projection (45° − β) and (45° + β), the ratio of the horizontal ranges achieved with identical initial speed is:",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "2 : 1",
      option_d: "cos 2β : sin 2β",
      correct_option: "A",
      explanation: "Step 1: Check sum of angles:\nθ₁ + θ₂ = (45° − β) + (45° + β) = 90° (complementary).\n\nStep 2: For complementary angles, sin 2(45° − β) = sin(90° − 2β) = cos 2β.\nsin 2(45° + β) = sin(90° + 2β) = cos 2β.\nThe ranges are identical, giving a ratio of 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2196, // Q22
    similar_question: {
      question: "A projectile is launched from ground level so as to have a maximum possible horizontal range of 800 m. What are the coordinates (x, y) of its highest point?",
      option_a: "(400 m, 200 m)",
      option_b: "(800 m, 200 m)",
      option_c: "(400 m, 400 m)",
      option_d: "(200 m, 100 m)",
      correct_option: "A",
      explanation: "Step 1: For maximum range, projection angle θ = 45°.\nR_max = u² / g = 800 m.\n\nStep 2: Highest point occurs at the midpoint of horizontal range:\nx_top = R_max / 2 = 800 / 2 = 400 m.\n\nStep 3: Maximum height at θ = 45°:\nH = (u² sin² 45°) / (2g) = (u² / 2g) × (1/2) = R_max / 4 = 800 / 4 = 200 m.\nCoordinates: (400 m, 200 m).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2197, // Q23
    similar_question: {
      question: "Two stones are projected with identical speeds at complementary angles θ and (90° − θ). If the maximum heights reached are H₁ and H₂ respectively, the product of their heights (H₁ × H₂) is directly proportional to:",
      option_a: "R² (where R is the horizontal range)",
      option_b: "R",
      option_c: "R³",
      option_d: "1 / R²",
      correct_option: "A",
      explanation: "Step 1: Formulas for H₁, H₂, and R:\nH₁ = (u² sin² θ) / (2g)\nH₂ = [u² sin²(90° − θ)] / (2g) = (u² cos² θ) / (2g)\nR = (2u² sin θ cos θ) / g.\n\nStep 2: Compute product H₁ × H₂:\nH₁ H₂ = (u⁴ sin² θ cos² θ) / (4g²) = [ (u² sin θ cos θ) / g ]² / 4\n       = [ R / 2 ]² / 4 = R² / 16.\nThus, H₁ H₂ ∝ R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2198, // Q24
    similar_question: {
      question: "The horizontal range of a projectile is equal to 4√3 times its maximum height (R = 4√3 H). What is its angle of projection with the horizontal?",
      option_a: "30°",
      option_b: "60°",
      option_c: "45°",
      option_d: "15°",
      correct_option: "A",
      explanation: "Step 1: Use relation R = 4H cot θ:\nR / H = 4 cot θ = 4 / tan θ.\n\nStep 2: Substitute R / H = 4√3:\n4√3 = 4 / tan θ  →  tan θ = 1 / √3  →  θ = 30°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2199, // Q25
    similar_question: {
      question: "Two projectiles A and B are thrown at angles of 30° and 60° respectively with the horizontal. If both attain the same maximum height, what is the ratio of their initial speeds u_A / u_B?",
      option_a: "√3",
      option_b: "1 / √3",
      option_c: "3",
      option_d: "1 / 3",
      correct_option: "A",
      explanation: "Step 1: Maximum height formula: H = (u² sin² θ) / (2g).\n\nStep 2: Since H_A = H_B:\nu_A² sin² 30° = u_B² sin² 60°\nu_A sin 30° = u_B sin 60°.\n\nStep 3: Compute speed ratio:\nu_A / u_B = sin 60° / sin 30° = (√3 / 2) / (1 / 2) = √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2200, // Q26
    similar_question: {
      question: "A projectile launched with speed u at angle θ on Earth (g = 9.8 m/s²) has a range of 100 m. What would be its horizontal range on the Moon where acceleration due to gravity is g/6, assuming identical launch speed and angle?",
      option_a: "600 m",
      option_b: "100 m",
      option_c: "16.7 m",
      option_d: "3600 m",
      correct_option: "A",
      explanation: "Step 1: Range formula: R = (u² sin 2θ) / g.\nRange is inversely proportional to acceleration due to gravity g: R ∝ 1 / g.\n\nStep 2: Ratio of ranges:\nR_moon / R_earth = g_earth / g_moon = g / (g/6) = 6.\n\nStep 3: Compute range on the Moon:\nR_moon = 6 × 100 m = 600 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2201, // Q27
    similar_question: {
      question: "The trajectory of a projectile is given by y = x − (g x²) / (2 u²). What is the angle of projection θ with the horizontal?",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: Compare with standard equation of trajectory:\ny = x tan θ − (g x²) / (2 u² cos² θ).\n\nStep 2: Equate the coefficient of x:\ntan θ = 1  →  θ = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2202, // Q28
    similar_question: {
      question: "The equation of trajectory of a projectile is y = 12x − (3/4) x² (where x and y are in metres). What is the horizontal range of the projectile?",
      option_a: "16 m",
      option_b: "12 m",
      option_c: "24 m",
      option_d: "8 m",
      correct_option: "A",
      explanation: "Step 1: At the landing point, the vertical coordinate y = 0:\n12x − (3/4) x² = 0\nx [12 − (3/4) x] = 0.\n\nStep 2: Non-zero root gives the horizontal range:\n(3/4) x = 12  →  x = 12 × (4/3) = 16 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2203, // Q29
    similar_question: {
      question: "Which of the following expressions correctly represents the equation of trajectory of a projectile launched with speed u at angle θ with the horizontal?",
      option_a: "y = x tan θ [1 − (x / R)]",
      option_b: "y = x tan θ [1 + (x / R)]",
      option_c: "y = x cot θ [1 − (x / R)]",
      option_d: "y = x² tan θ [1 − (x / R)]",
      correct_option: "A",
      explanation: "Step 1: Standard trajectory equation: y = x tan θ − (g x²) / (2 u² cos² θ).\n\nStep 2: Range R = (2 u² sin θ cos θ) / g.\nDivide the second term by R:\n(g x²) / (2 u² cos² θ) = x tan θ × (x / R).\n\nStep 3: Factor out x tan θ:\ny = x tan θ [1 − (x / R)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2204, // Q30
    similar_question: {
      question: "A ball is projected vertically upward from the edge of a cliff. Taking the starting point as the origin and upward as positive, which set of signs for position (y), velocity (v), and acceleration (a) applies when the ball is falling past the cliff level towards the ground?",
      option_a: "y < 0, v < 0, a < 0",
      option_b: "y > 0, v < 0, a < 0",
      option_c: "y < 0, v > 0, a < 0",
      option_d: "y > 0, v > 0, a < 0",
      correct_option: "A",
      explanation: "Step 1: Position y: Below the release point (cliff level), position is negative (y < 0).\nStep 2: Velocity v: Moving downward means velocity is negative (v < 0).\nStep 3: Acceleration a: Acceleration due to gravity acts downward, so a = −g < 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2205, // Q31
    similar_question: {
      question: "The trajectory of a projectile is represented by y = αx − βx². The horizontal range R and maximum height H are given respectively by:",
      option_a: "R = α / β and H = α² / (4β)",
      option_b: "R = β / α and H = α² / (2β)",
      option_c: "R = 2α / β and H = α² / β",
      option_d: "R = α / (2β) and H = α / (4β)",
      correct_option: "A",
      explanation: "Step 1: Find range R by setting y = 0:\nαx − βx² = 0  →  x(α − βx) = 0  →  R = α / β.\n\nStep 2: Maximum height occurs at x = R/2 = α / (2β):\nH = y(α / 2β) = α(α / 2β) − β(α / 2β)²\n  = α² / (2β) − α² / (4β) = α² / (4β).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2206, // Q32
    similar_question: {
      question: "At the highest point of a standard projectile's parabolic path:\nStatement 1: The speed is minimum and equal to u cos θ.\nStatement 2: The velocity vector is strictly perpendicular to the acceleration vector.",
      option_a: "Both Statement 1 and Statement 2 are true",
      option_b: "Statement 1 is true but Statement 2 is false",
      option_c: "Statement 1 is false but Statement 2 is true",
      option_d: "Both Statement 1 and Statement 2 are false",
      correct_option: "A",
      explanation: "Step 1: At maximum height, vertical velocity v_y = 0. Only the horizontal velocity u cos θ remains, which is the minimum speed during the flight (Statement 1 is true).\n\nStep 2: The velocity is completely horizontal while acceleration g is strictly downward (vertical). Therefore, the angle between them is 90° (Statement 2 is true).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2207, // Q33
    similar_question: {
      question: "In standard projectile motion under gravity without air resistance, how does the tangential acceleration a_t vary during the flight?",
      option_a: "It decreases during ascent, becomes zero at the highest point, and increases during descent",
      option_b: "It remains constant throughout the flight",
      option_c: "It increases continuously throughout the flight",
      option_d: "It is zero at all points along the trajectory",
      correct_option: "A",
      explanation: "Step 1: Tangential acceleration is the component of g along the tangent to the path: a_t = g sin φ (where φ is the angle between velocity and horizontal).\n\nStep 2: During ascent, φ decreases from θ to 0°, so a_t decreases to 0 at the highest point.\nDuring descent, the velocity tilts downward, so a_t increases back to g sin θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2208, // Q34
    similar_question: {
      question: "In ideal projectile motion, which of the following quantities remains strictly constant throughout the entire motion?",
      option_a: "Rate of change of velocity (acceleration vector)",
      option_b: "Speed of the projectile",
      option_c: "Direction of velocity vector",
      option_d: "Linear momentum vector",
      correct_option: "A",
      explanation: "Step 1: In the absence of air resistance, the only force acting is gravity (downward constant weight W = mg).\n\nStep 2: Acceleration a = dv / dt = −g j = constant vector.\nSpeed, direction of motion, and momentum all change with time.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2209, // Q35
    similar_question: {
      question: "Regarding projectile motion under gravity, which statement is FALSE?",
      option_a: "Acceleration varies with time",
      option_b: "Speed varies with time",
      option_c: "Velocity vector varies with time",
      option_d: "Vertical component of velocity varies with time",
      correct_option: "A",
      explanation: "Step 1: Acceleration is constant: a = g = 9.8 m/s² downward throughout the entire trajectory. Therefore, the statement 'Acceleration varies with time' is FALSE.\n\nStep 2: Speed, velocity vector, and vertical velocity all vary with time.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2210, // Q36
    similar_question: {
      question: "When air resistance is taken into account in projectile motion, how does the angle of landing θ_impact compare with the angle of projection θ_launch?",
      option_a: "θ_impact > θ_launch (the trajectory becomes steeper at the end)",
      option_b: "θ_impact < θ_launch",
      option_c: "θ_impact = θ_launch",
      option_d: "θ_impact is always 90°",
      correct_option: "A",
      explanation: "Step 1: Air resistance continuously dissipates horizontal momentum, so horizontal velocity v_x decreases throughout the flight.\n\nStep 2: At landing, v_x is smaller than its initial value, making the tangent tan θ_impact = |v_y| / v_x larger than tan θ_launch.\nTherefore, θ_impact > θ_launch.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2211, // Q37
    similar_question: {
      question: "A projectile is launched from flat ground with velocity u at angle θ with the horizontal. What is the total change in velocity vector Δv between launch and landing?",
      option_a: "2 u sin θ directed vertically downward",
      option_b: "2 u cos θ directed horizontally",
      option_c: "Zero",
      option_d: "u sin θ directed vertically downward",
      correct_option: "A",
      explanation: "Step 1: Initial and final velocity vectors:\nv_initial = u cos θ i + u sin θ j\nv_final = u cos θ i − u sin θ j.\n\nStep 2: Calculate change in velocity:\nΔv = v_final − v_initial = −2 u sin θ j.\nMagnitude = 2 u sin θ directed downward.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2212, // Q38
    similar_question: {
      question: "Projectile motion near Earth's surface (ignoring air resistance) is categorized as:",
      option_a: "Two-dimensional motion with uniform acceleration",
      option_b: "Two-dimensional motion with non-uniform acceleration",
      option_c: "One-dimensional motion with uniform acceleration",
      option_d: "Uniform circular motion",
      correct_option: "A",
      explanation: "Step 1: The particle moves in a vertical plane (two dimensions).\nStep 2: The only force acting is gravity, producing a constant downward acceleration a = g = 9.8 m/s².\nThus, it is uniformly accelerated motion in two dimensions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2213, // Q39
    similar_question: {
      question: "At any point along a projectile trajectory where the velocity vector makes an angle θ with the horizontal, what is the normal (centripetal) acceleration of the projectile?",
      option_a: "g cos θ",
      option_b: "g sin θ",
      option_c: "g tan θ",
      option_d: "g / cos θ",
      correct_option: "A",
      explanation: "Step 1: Resolve the acceleration due to gravity g along and perpendicular to the velocity vector:\n- Component parallel to velocity (tangential acceleration): a_t = g sin θ\n- Component perpendicular to velocity (normal/centripetal acceleration): a_n = g cos θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2214, // Q40
    similar_question: {
      question: "A projectile of mass m is thrown with speed u at angle θ to the horizontal. What is the magnitude of change in linear momentum of the projectile between launch and the highest point of its trajectory?",
      option_a: "m u sin θ",
      option_b: "2 m u sin θ",
      option_c: "m u cos θ",
      option_d: "m u",
      correct_option: "A",
      explanation: "Step 1: Initial momentum: p_i = m u cos θ i + m u sin θ j.\nStep 2: Momentum at highest point: p_top = m u cos θ i + 0 j.\nStep 3: Change in momentum: Δp = p_top − p_i = −m u sin θ j.\nMagnitude |Δp| = m u sin θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2215, // Q41
    similar_question: {
      question: "What is the average velocity of a projectile between its launch point on flat ground and its landing point?",
      option_a: "u cos θ horizontal",
      option_b: "u sin θ vertical",
      option_c: "u",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Total displacement between launch and landing: Δr = Range R i + 0 j.\nStep 2: Time of flight T = 2 u sin θ / g.\nStep 3: Average velocity v_avg = Δr / T = (R / T) i.\nSince R = u cos θ × T, v_avg = u cos θ i (constant horizontal velocity).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2216, // Q42
    similar_question: {
      question: "In two-dimensional projectile motion without air resistance:\nStatement A: The horizontal motion is uniform (constant velocity).\nStatement B: The vertical motion is uniformly accelerated by gravity.",
      option_a: "Both Statement A and Statement B are true",
      option_b: "Statement A is true but Statement B is false",
      option_c: "Statement A is false but Statement B is true",
      option_d: "Both Statement A and Statement B are false",
      correct_option: "A",
      explanation: "Step 1: No horizontal forces act on the projectile, so a_x = 0 and horizontal velocity v_x = u cos θ remains constant (uniform motion).\n\nStep 2: Gravity acts continuously in the negative y-direction, so a_y = −g = constant (uniformly accelerated motion).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2217, // Q43
    similar_question: {
      question: "Two projectiles 1 and 2 are launched simultaneously from different points with different initial velocities. What is the nature of the trajectory of projectile 1 as observed from projectile 2?",
      option_a: "A straight line",
      option_b: "A parabola",
      option_c: "A circle",
      option_d: "An ellipse",
      correct_option: "A",
      explanation: "Step 1: Both projectiles experience identical acceleration due to gravity: a₁ = −g j and a₂ = −g j.\n\nStep 2: Relative acceleration: a_rel = a₁ − a₂ = 0.\n\nStep 3: Since relative acceleration is zero, the relative velocity v_rel is constant, and the relative path r_rel(t) = r_rel(0) + v_rel t is a straight line.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2218, // Q44
    similar_question: {
      question: "The maximum vertical height to which an athlete can throw a ball is 60 m. What is the maximum horizontal distance to which the athlete can throw the same ball with the same initial speed?",
      option_a: "120 m",
      option_b: "60 m",
      option_c: "240 m",
      option_d: "90 m",
      correct_option: "A",
      explanation: "Step 1: Maximum vertical height when thrown straight up (θ = 90°):\nH_max = u² / (2g) = 60 m  →  u² / g = 120 m.\n\nStep 2: Maximum horizontal range (achieved at θ = 45°):\nR_max = u² / g = 2 × H_max = 2 × 60 m = 120 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2219, // Q45
    similar_question: {
      question: "A projectile is launched with an initial velocity of 50 m/s at an angle of 60° with the vertical. What is the speed of the projectile at its highest point?",
      option_a: "25√3 m/s",
      option_b: "25 m/s",
      option_c: "50 m/s",
      option_d: "50√3 m/s",
      correct_option: "A",
      explanation: "Step 1: Find the angle with the horizontal:\nAngle with horizontal θ = 90° − 60° = 30°.\n\nStep 2: Speed at the highest point is entirely horizontal:\nv_top = u cos θ = 50 × cos 30° = 50 × (√3 / 2) = 25√3 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2220, // Q46
    similar_question: {
      question: "A projectile is launched such that its horizontal range R is four times its maximum height H (R = 4H). What is the value of sin θ (where θ is the angle of projection)?",
      option_a: "1 / √2",
      option_b: "1 / 2",
      option_c: "√3 / 2",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: Relation between range and height: R / H = 4 cot θ.\n\nStep 2: Given R = 4H:\n4 = 4 cot θ  →  cot θ = 1  →  tan θ = 1  →  θ = 45°.\n\nStep 3: Calculate sin θ:\nsin 45° = 1 / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2221, // Q47
    similar_question: {
      question: "A projectile is launched with initial velocity u at angle θ. What is the vertical component of velocity v_y at time t during flight?",
      option_a: "u sin θ − g t",
      option_b: "u cos θ − g t",
      option_c: "u sin θ + g t",
      option_d: "u cos θ",
      correct_option: "A",
      explanation: "Step 1: First equation of motion in the vertical direction:\nv_y = u_y + a_y t.\n\nStep 2: Substitute u_y = u sin θ and a_y = −g:\nv_y = u sin θ − g t.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2222, // Q48
    similar_question: {
      question: "Two projectiles are launched with identical speeds at angles of 35° and 55° with the horizontal. How do their horizontal ranges R₁, R₂ and maximum heights H₁, H₂ compare?",
      option_a: "R₁ = R₂ and H₁ < H₂",
      option_b: "R₁ > R₂ and H₁ = H₂",
      option_c: "R₁ < R₂ and H₁ < H₂",
      option_d: "R₁ = R₂ and H₁ > H₂",
      correct_option: "A",
      explanation: "Step 1: 35° + 55° = 90° (complementary angles).\nTherefore, the horizontal ranges are equal: R₁ = R₂.\n\nStep 2: Maximum height formula: H = (u² sin² θ) / (2g).\nSince sin 55° > sin 35°, H₂ > H₁ (or H₁ < H₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2223, // Q49
    similar_question: {
      question: "For a projectile launched with speed u at angle θ with horizontal, what is the magnitude of average velocity from the launch point to the highest point?",
      option_a: "(u / 2) √(1 + 3 cos² θ)",
      option_b: "(u / 2) √(1 + 2 cos² θ)",
      option_c: "(u / 2) √(1 − cos² θ)",
      option_d: "u cos θ",
      correct_option: "A",
      explanation: "Step 1: Displacement to highest point: Δr = (R / 2) i + H j.\nR / 2 = (u² sin θ cos θ) / g\nH = (u² sin² θ) / (2g).\n\nStep 2: Time to highest point: t = (u sin θ) / g.\n\nStep 3: Average velocity vector:\nv_avg = Δr / t = (u cos θ) i + (u sin θ / 2) j.\nMagnitude |v_avg| = √[u² cos² θ + (u² sin² θ / 4)]\n                  = (u / 2) √[4 cos² θ + sin² θ] = (u / 2) √[3 cos² θ + (cos² θ + sin² θ)]\n                  = (u / 2) √(1 + 3 cos² θ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2224, // Q50
    similar_question: {
      question: "A ball thrown vertically upward passes a height h at times t₁ and t₂ during its flight. What is the initial velocity u of the projection?",
      option_a: "g (t₁ + t₂) / 2",
      option_b: "g (t₁ + t₂)",
      option_c: "2 g (t₁ + t₂)",
      option_d: "√(g h / 2)",
      correct_option: "A",
      explanation: "Step 1: Vertical displacement equation: h = u t − (1/2) g t²  →  g t² − 2 u t + 2 h = 0.\n\nStep 2: The roots of this quadratic equation are t₁ and t₂.\nSum of roots: t₁ + t₂ = 2u / g.\n\nStep 3: Solve for initial speed u:\nu = g (t₁ + t₂) / 2.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Part 1 (${set5Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set5Part1Updates) {
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
        console.log(`[${successCount}/${set5Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
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
