module.exports = [
  {
    id: 187,
    question: "Particle moves so that position vector given by r=cos(ωt) x̂ + sin(ωt) ŷ where ω constant. Which true? [NEET 2016 Phase 1]",
    optionA: "Velocity is perpendicular to r and acceleration is directed towards origin",
    optionB: "Velocity is perpendicular to r and acceleration is directed away from origin",
    optionC: "Velocity and acceleration both are perpendicular to r",
    optionD: "Velocity and acceleration both are parallel to r",
    correctOption: "A",
    explanation: "Step 1: Given position vector: r = cos(ωt) x̂ + sin(ωt) ŷ.\nStep 2: Differentiating r with respect to time gives velocity vector v:\nv = dr/dt = −ω sin(ωt) x̂ + ω cos(ωt) ŷ.\nStep 3: Check dot product between r and v:\nr · v = [cos(ωt)](−ω sin(ωt)) + [sin(ωt)](ω cos(ωt))\nr · v = −ω sin(ωt) cos(ωt) + ω sin(ωt) cos(ωt) = 0.\nSince r · v = 0, the velocity vector v is perpendicular to the position vector r (tangential motion).\nStep 4: Differentiating v with respect to time gives acceleration vector a:\na = dv/dt = −ω² cos(ωt) x̂ − ω² sin(ωt) ŷ = −ω² [cos(ωt) x̂ + sin(ωt) ŷ] = −ω² r.\nStep 5: The negative sign (−ω² r) demonstrates that the acceleration vector is directed opposite to the position vector r, which means it is directed radially inwards towards the origin (centripetal acceleration).\nStep 6: Therefore, velocity is perpendicular to r and acceleration is directed towards the origin.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For a particle moving in the xy-plane with r = R cos(ωt) î + R sin(ωt) ĵ, what is the nature of its motion?",
      option_a: "Uniform circular motion with constant speed and centripetal acceleration",
      option_b: "Linear simple harmonic motion along the x-axis",
      option_c: "Parabolic projectile motion",
      option_d: "Uniformly accelerated straight-line motion",
      correct_option: "A",
      explanation: "Step 1: |r| = R (constant radius).\nStep 2: |v| = ωR (constant speed).\nStep 3: a = −ω² r (acceleration directed toward centre).\nStep 4: This defines uniform circular motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 186,
    question: "If magnitude sum two vectors equal to magnitude difference two vectors angle between these vectors? [NEET 2016 Phase 1]",
    optionA: "45°",
    optionB: "180°",
    optionC: "0°",
    optionD: "90°",
    correctOption: "D",
    explanation: "Step 1: Let the two vectors be A and B with an angle θ between them.\nStep 2: The given condition is:\n|A + B| = |A − B|.\nStep 3: Squaring both sides of the equation:\n|A + B|² = |A − B|².\nStep 4: Using the vector dot product definitions:\nA² + B² + 2AB cos θ = A² + B² − 2AB cos θ.\nStep 5: Subtract (A² + B²) from both sides:\n2AB cos θ = −2AB cos θ\n4AB cos θ = 0.\nStep 6: For two non-zero vectors A ≠ 0 and B ≠ 0:\ncos θ = 0 → θ = 90°.\nStep 7: Therefore, the angle between the two vectors is 90°.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If the sum and difference of two unit vectors û and v̂ have the same magnitude, |û + v̂| = |û − v̂|, what is the value of |û + v̂|?",
      option_a: "√2",
      option_b: "1",
      option_c: "2",
      option_d: "0",
      correct_option: "A",
      explanation: "Step 1: |û + v̂| = |û − v̂| means û ⊥ v̂ (θ = 90°).\nStep 2: |û + v̂| = √(1² + 1² + 2(1)(1) cos 90°) = √(1 + 1) = √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 185,
    question: "In given figure a=15 m/s² represents total acceleration particle moving clockwise direction in circle radius R=2.5m at given instant time. Speed of particle? [NEET 2016 Phase 2]",
    optionA: "4.5 m/s",
    optionB: "5.0 m/s",
    optionC: "5.7 m/s",
    optionD: "6.2 m/s",
    correctOption: "C",
    explanation: "Step 1: In non-uniform circular motion, the total acceleration vector (a) is the vector sum of centripetal acceleration (a_c) and tangential acceleration (a_t):\na = a_c + a_t.\nStep 2: In the NEET 2016 Phase 2 figure, the total acceleration vector a = 15 m s⁻² makes an angle of 30° with the radial vector pointing towards the centre.\nStep 3: The centripetal component of acceleration (directed towards the centre) is:\na_c = a cos 30° = 15 × (√3 / 2) = 15 × 0.866 ≈ 12.99 m s⁻².\nStep 4: The centripetal acceleration is related to speed v and radius R by:\na_c = v² / R.\nStep 5: Solve for speed v:\nv² = a_c × R = 12.99 × 2.5 ≈ 32.475 m² s⁻²\nv = √(32.475) ≈ 5.698 m s⁻¹ ≈ 5.7 m s⁻¹.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A particle moves in a circle of radius R = 2 m. Its total acceleration has magnitude 20 m s⁻² and makes an angle of 60° with the radius towards the centre. What is the speed of the particle?",
      option_a: "4.47 m s⁻¹",
      option_b: "5.00 m s⁻¹",
      option_c: "6.32 m s⁻¹",
      option_d: "3.16 m s⁻¹",
      correct_option: "A",
      explanation: "Step 1: a_c = a cos 60° = 20 × 0.5 = 10 m s⁻².\nStep 2: v² = a_c × R = 10 × 2 = 20 → v = √20 ≈ 4.47 m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 184,
    question: "x and y coordinates particle at any time are x=5t-2t² and y=10t respectively where x and y metres and t seconds. Acceleration particle at t=2s is? [NEET 2017]",
    optionA: "5 m/s²",
    optionB: "-4 m/s²",
    optionC: "-8 m/s²",
    optionD: "0",
    correctOption: "B",
    explanation: "Step 1: The position coordinates of the particle are given as:\nx(t) = 5t − 2t²\ny(t) = 10t.\nStep 2: Find the components of velocity by taking first time derivatives:\nv_x = dx/dt = d(5t − 2t²)/dt = 5 − 4t\nv_y = dy/dt = d(10t)/dt = 10.\nStep 3: Find the components of acceleration by taking second time derivatives:\na_x = dv_x/dt = d(5 − 4t)/dt = −4 m s⁻²\na_y = dv_y/dt = d(10)/dt = 0 m s⁻².\nStep 4: Notice that a_x = −4 m s⁻² is constant for all time t, and a_y = 0.\nStep 5: The total acceleration vector is a = a_x î + a_y ĵ = −4 î m s⁻².\n- At t = 2 s, the acceleration of the particle is −4 m s⁻².\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The position coordinates of a particle at time t are x = 4t² − 3t and y = 5t + 2. What is the acceleration of the particle?",
      option_a: "8 m s⁻² along x-axis",
      option_b: "4 m s⁻² along x-axis",
      option_c: "10 m s⁻² along y-axis",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: v_x = dx/dt = 8t − 3 → a_x = d²x/dt² = 8 m s⁻².\nStep 2: v_y = dy/dt = 5 → a_y = d²y/dt² = 0.\nStep 3: Total acceleration = 8 î m s⁻² (8 m s⁻² along x-axis).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 183,
    question: "Particle moving with velocity v is acted by three forces shown by vector triangle PQR. Velocity of particle will? [NEET 2019]",
    optionA: "Remain constant",
    optionB: "Increase",
    optionC: "Decrease",
    optionD: "Change according to smallest force QR",
    correctOption: "A",
    explanation: "Step 1: According to Newton's second law of motion, the net acceleration of a particle is directly proportional to the net external resultant force acting on it:\nF_net = m a.\nStep 2: The three forces acting on the particle are represented in magnitude and direction by the sides of triangle PQR taken in cyclic order (head-to-tail: PQ + QR + RP).\nStep 3: According to the polygon law of vector addition, if a set of vectors forms a closed polygon in cyclic order, their vector sum is zero:\nF_net = F_PQ + F_QR + F_RP = 0.\nStep 4: Since the net external force acting on the particle is zero (F_net = 0), its acceleration is zero:\na = F_net / m = 0.\nStep 5: With zero acceleration, by Newton's first law, the velocity vector v of the particle will remain constant in both magnitude and direction.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A particle of mass m is moving with velocity v. If it is acted upon by three concurrent coplanar forces of magnitudes 3 N, 4 N, and 5 N such that they form a closed right-angled triangle, the speed of the particle will:",
      option_a: "Remain unchanged",
      option_b: "Increase continuously",
      option_c: "Decrease continuously",
      option_d: "Become zero immediately",
      correct_option: "A",
      explanation: "Step 1: The forces form a closed vector triangle in cyclic order, so F_net = 0.\nStep 2: Net force = 0 implies acceleration = 0, so velocity and speed remain constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 182,
    question: "When object shot from bottom long smooth inclined plane kept at angle 60° with horizontal it can travel distance x1 along plane. But when inclination decreased to 30° and same object shot with same velocity it can travel x2 distance. Then x1:x2 will be? [NEET 2019]",
    optionA: "1:√2",
    optionB: "√2:1",
    optionC: "1:√3",
    optionD: "1:2√3",
    correctOption: "C",
    explanation: "Step 1: When an object is projected up a smooth (frictionless) inclined plane of angle θ with initial speed u:\n- The component of gravitational acceleration retarding the motion along the incline is:\na = −g sin θ.\nStep 2: At the maximum distance x traveled along the incline, the final velocity is v = 0.\nStep 3: Using the third equation of motion along the incline (v² = u² + 2as):\n0 = u² − 2(g sin θ) x\nx = u² / (2g sin θ).\nStep 4: Since the initial speed u and g are identical for both cases:\nx ∝ 1 / sin θ.\nStep 5: Calculate the ratio x₁ : x₂ for angles θ₁ = 60° and θ₂ = 30°:\nx₁ / x₂ = sin θ₂ / sin θ₁ = sin 30° / sin 60°\nx₁ / x₂ = (1/2) / (√3 / 2) = 1 / √3.\nStep 6: Therefore, the ratio x₁ : x₂ is 1 : √3.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An object shot up a smooth incline of angle 45° travels a distance s₁ before stopping. When shot with the same speed up an incline of angle 30°, it travels s₂. The ratio s₁ : s₂ is:",
      option_a: "1 : √2",
      option_b: "√2 : 1",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: s ∝ 1 / sin θ.\nStep 2: s₁ / s₂ = sin 30° / sin 45° = (1/2) / (1/√2) = 1 / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 181,
    question: "Speed of swimmer in still water 20 m/s. Speed river water 10 m/s flowing due east. If he standing south bank wishes cross river along shortest path angle at which he should make strokes w.r.t north is given by? [NEET 2019]",
    optionA: "0°",
    optionB: "60°",
    optionC: "45° west",
    optionD: "30° west",
    correctOption: "D",
    explanation: "Step 1: Set up the vectors:\n- River flows due East: v_r = 10 m s⁻¹ East.\n- South bank is along the East-West axis; straight across the river to the North bank is due North.\nStep 2: Shortest path means the resultant velocity of the swimmer (v_res) must point straight North across the river.\nStep 3: For the resultant to have zero East-West component, the swimmer must swim upstream at an angle θ West of North.\n- The eastward river velocity must be exactly cancelled by the westward component of the swimmer's velocity:\nv_s sin θ = v_r.\nStep 4: Given v_s = 20 m s⁻¹ and v_r = 10 m s⁻¹:\n20 sin θ = 10\nsin θ = 10 / 20 = 1/2.\nStep 5: Find the angle θ:\nθ = sin⁻¹(1/2) = 30° West of North.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A swimmer wants to cross a river flowing at 3 km h⁻¹ along the shortest path. If his swimming speed in still water is 6 km h⁻¹, at what angle with the river flow direction should he head?",
      option_a: "120°",
      option_b: "150°",
      option_c: "90°",
      option_d: "60°",
      correct_option: "A",
      explanation: "Step 1: For shortest path, sin θ = v_r / v_s = 3 / 6 = 1/2 → θ = 30° upstream from the perpendicular (north).\nStep 2: The angle with the river flow direction is 90° + θ = 90° + 30° = 120°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 180,
    question: "A car starts from rest and accelerates at 5 m/s². At t=4s ball dropped out of window by person sitting in car. What is velocity and acceleration of ball at t=6s Take g=10 m/s²? [NEET 2021]",
    optionA: "20√2 m/s, 10 m/s²",
    optionB: "20 m/s, 5 m/s²",
    optionC: "20 m/s, 0",
    optionD: "20√2 m/s, 0",
    correctOption: "A",
    explanation: "Step 1: Car starts from rest (u = 0) with horizontal acceleration a_car = 5 m s⁻².\n- At t = 4 s, horizontal velocity of the car is:\nv_x = u + a_car t = 0 + 5 × 4 = 20 m s⁻¹.\nStep 2: When the ball is dropped at t = 4 s, by inertia it retains the horizontal velocity of the car:\nv_x = 20 m s⁻¹ (remains constant throughout flight because a_x = 0).\nStep 3: From t = 4 s to t = 6 s (time elapsed in air Δt = 6 − 4 = 2 s):\n- Initial vertical velocity u_y = 0.\n- Vertical acceleration under gravity: a_y = g = 10 m s⁻² downwards.\n- Vertical velocity at t = 6 s:\nv_y = u_y + g Δt = 0 + 10 × 2 = 20 m s⁻¹ downwards.\nStep 4: Resultant speed of the ball at t = 6 s:\nv = √(v_x² + v_y²) = √(20² + 20²) = √(400 + 400) = √(800) = 20√2 m s⁻¹.\nStep 5: The moment the ball is released, the only force acting on it is gravity.\n- Therefore, its acceleration at t = 6 s is purely acceleration due to gravity: a = g = 10 m s⁻² downwards.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A train moves horizontally at 15 m s⁻¹. A stone is dropped from a window. What is the speed of the stone after 2 seconds? (Take g = 10 m s⁻²)",
      option_a: "25 m s⁻¹",
      option_b: "20 m s⁻¹",
      option_c: "35 m s⁻¹",
      option_d: "15 m s⁻¹",
      correct_option: "A",
      explanation: "Step 1: Horizontal velocity v_x = 15 m s⁻¹.\nStep 2: Vertical velocity v_y = g t = 10 × 2 = 20 m s⁻¹.\nStep 3: Resultant speed v = √(15² + 20²) = √(225 + 400) = √625 = 25 m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 179,
    question: "A particle moving in circle radius R with uniform speed takes time T to complete one revolution. If particle were projected with same speed at angle θ to horizontal maximum height attained equals 4R. Angle of projection θ is then given by? [NEET 2021]",
    optionA: "θ = sin⁻¹[(2gT²/π²R)¹/²]",
    optionB: "θ = cos⁻¹[(gT²/π²R)¹/²]",
    optionC: "θ = cos⁻¹[(π²R/gT²)¹/²]",
    optionD: "θ = sin⁻¹[(π²R/gT²)¹/²]",
    correctOption: "A",
    explanation: "Step 1: The speed of the particle in uniform circular motion of radius R and time period T is:\nv = (2π R) / T.\nStep 2: When projected with speed v at angle θ to the horizontal, maximum height attained is:\nH = (v² sin² θ) / (2g).\nStep 3: Given that maximum height H = 4R:\n(v² sin² θ) / (2g) = 4R\nv² sin² θ = 8 g R.\nStep 4: Substitute v = (2π R) / T into the equation:\n[(2π R) / T]² sin² θ = 8 g R\n(4π² R² / T²) sin² θ = 8 g R.\nStep 5: Solve for sin² θ:\nsin² θ = (8 g R × T²) / (4π² R²)\nsin² θ = (2 g T²) / (π² R).\nStep 6: Taking the square root and inverse sine:\nsin θ = [(2 g T²) / (π² R)]¹/²\nθ = sin⁻¹[(2 g T² / π² R)¹/²].\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A particle moves in a circle of radius R with speed v = 2πR / T. If it is projected with speed v at angle θ such that its maximum height is 2R, what is sin θ?",
      option_a: "[(g T²) / (π² R)]¹/²",
      option_b: "[(2 g T²) / (π² R)]¹/²",
      option_c: "[π² R / (g T²)]¹/²",
      option_d: "[(4 g T²) / (π² R)]¹/²",
      correct_option: "A",
      explanation: "Step 1: H = (v² sin² θ) / (2g) = 2R → v² sin² θ = 4 g R.\nStep 2: (4π² R² / T²) sin² θ = 4 g R → sin² θ = (g T²) / (π² R).\nStep 3: sin θ = [(g T²) / (π² R)]¹/².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 178,
    question: "A ball is projected with velocity 10 m/s at angle 60° with vertical direction. Its speed at highest point of its trajectory will be? [NEET 2022 Phase 1]",
    optionA: "Zero",
    optionB: "5√3 m/s",
    optionC: "5 m/s",
    optionD: "10 m/s",
    correctOption: "B",
    explanation: "Step 1: Read the angle of projection carefully: the angle is given as 60° with the VERTICAL direction.\n- Angle with the horizontal (θ) = 90° − 60° = 30°.\nStep 2: In projectile motion, the horizontal component of velocity remains constant throughout the entire motion:\nu_x = u cos θ = u sin(60°) = 10 × sin 60° = 10 × (√3 / 2) = 5√3 m s⁻¹.\nStep 3: At the highest point of the trajectory, the vertical component of velocity becomes zero (v_y = 0).\nStep 4: Therefore, the speed at the highest point is purely the horizontal velocity:\nv_top = u_x = 5√3 m s⁻¹.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A body is projected with an initial velocity of 20 m s⁻¹ at an angle of 30° with the vertical. What is its speed at the highest point of its trajectory?",
      option_a: "10 m s⁻¹",
      option_b: "10√3 m s⁻¹",
      option_c: "20 m s⁻¹",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Angle with vertical = 30° → angle with horizontal = 60°.\nStep 2: v_top = u cos 60° = 20 × (1/2) = 10 m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 177,
    question: "A cricket ball is thrown by player at speed 20 m/s in direction 30° above horizontal. Maximum height attained by ball during its motion is g=10 m/s²? [NEET 2022 Phase 2]",
    optionA: "25 m",
    optionB: "5 m",
    optionC: "10 m",
    optionD: "20 m",
    correctOption: "B",
    explanation: "Step 1: Write down the given values:\n- Initial speed of projection: u = 20 m s⁻¹\n- Angle of projection with horizontal: θ = 30°\n- Acceleration due to gravity: g = 10 m s⁻²\nStep 2: The formula for maximum height H attained by a projectile is:\nH = (u² sin² θ) / (2g).\nStep 3: Compute sin θ:\nsin 30° = 1/2 → sin² 30° = (1/2)² = 1/4 = 0.25.\nStep 4: Substitute the values into the formula:\nH = [20² × (1/4)] / [2 × 10]\nH = [400 × 0.25] / 20 = 100 / 20 = 5 m.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A projectile is thrown with speed 40 m s⁻¹ at an angle of 30° with the horizontal. What is the maximum height reached? (Take g = 10 m s⁻²)",
      option_a: "20 m",
      option_b: "40 m",
      option_c: "10 m",
      option_d: "80 m",
      correct_option: "A",
      explanation: "Step 1: H = (u² sin² θ) / (2g).\nStep 2: H = [40² × (1/2)²] / [2 × 10] = [1600 × (1/4)] / 20 = 400 / 20 = 20 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 176,
    question: "A horizontal bridge built across river. Student standing on bridge throws small ball vertically upwards with velocity 4 m/s. Ball strikes water surface after 4 s. Height of bridge above water surface is Take g=10 m/s²? [NEET 2023]",
    optionA: "60 m",
    optionB: "64 m",
    optionC: "68 m",
    optionD: "56 m",
    correctOption: "B",
    explanation: "Step 1: Set up the coordinate system with origin at the bridge point of projection:\n- Take the vertically upward direction as positive (+y) and downward as negative (−y).\n- Initial velocity: u = +4 m s⁻¹.\n- Acceleration: a = −g = −10 m s⁻².\n- Time taken to strike water: t = 4 s.\nStep 2: Apply the second equation of motion for displacement s:\ns = u t + (1/2) a t².\nStep 3: Substitute the known values:\ns = (4 × 4) + (1/2)(−10)(4)²\ns = 16 − 5 × 16 = 16 − 80 = −64 m.\nStep 4: The negative sign indicates that the water surface is 64 m below the bridge.\nStep 5: Therefore, the height of the bridge above the water surface is 64 m.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A stone is thrown vertically upwards from the top of a tower with a speed of 5 m s⁻¹. It reaches the ground after 3 seconds. What is the height of the tower? (Take g = 10 m s⁻²)",
      option_a: "30 m",
      option_b: "45 m",
      option_c: "15 m",
      option_d: "60 m",
      correct_option: "A",
      explanation: "Step 1: s = u t − (1/2) g t² = (5 × 3) − 0.5 × 10 × 3² = 15 − 45 = −30 m.\nStep 2: The height of the tower is 30 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 175,
    question: "A bullet is fired from gun at speed 280 m/s in direction 30° above horizontal. Maximum height attained by bullet is g=9.8 m/s² sin30=0.5? [NEET 2023]",
    optionA: "2000 m",
    optionB: "1000 m",
    optionC: "3000 m",
    optionD: "2800 m",
    correctOption: "B",
    explanation: "Step 1: Given initial speed u = 280 m s⁻¹, angle θ = 30°, sin 30° = 0.5, and g = 9.8 m s⁻².\nStep 2: The maximum height formula for a projectile is:\nH = (u² sin² θ) / (2g).\nStep 3: Calculate the vertical velocity component:\nu_y = u sin θ = 280 × 0.5 = 140 m s⁻¹.\nStep 4: Substitute u_y into the formula:\nH = u_y² / (2g) = (140)² / (2 × 9.8)\nH = 19600 / 19.6 = 1000 m.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A shell is fired with an initial velocity of 196 m s⁻¹ at an angle of 30° to the horizontal. What is the maximum height attained? (Take g = 9.8 m s⁻²)",
      option_a: "490 m",
      option_b: "980 m",
      option_c: "245 m",
      option_d: "196 m",
      correct_option: "A",
      explanation: "Step 1: u_y = 196 × sin 30° = 98 m s⁻¹.\nStep 2: H = u_y² / (2g) = 98² / (2 × 9.8) = (98 × 98) / 19.6 = 98 × 5 = 490 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 174,
    question: "A particle is executing uniform circular motion with velocity v and acceleration a. Which of following is true? [NEET 2023 Manipur]",
    optionA: "v is constant a is not constant",
    optionB: "v is not constant a is not constant",
    optionC: "v is constant a is constant",
    optionD: "v is not constant a is constant",
    correctOption: "B",
    explanation: "Step 1: Understand the definition of vectors in circular motion:\n- Velocity (v) is a vector quantity having both magnitude (speed) and direction.\n- In uniform circular motion, speed (|v|) is constant, but the direction of velocity is continuously changing (always tangential to the circle at every point).\n- Because its direction continuously changes, the velocity vector v is NOT constant.\nStep 2: Acceleration (a) in uniform circular motion is purely centripetal acceleration:\n- Its magnitude (|a| = v² / R) is constant.\n- However, its direction is always directed radially toward the centre of the circle, continuously changing orientation as the particle rotates.\n- Because its direction continuously changes, the acceleration vector a is also NOT constant.\nStep 3: Therefore, neither velocity v nor acceleration a is constant as vectors.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In uniform circular motion, which of the following physical quantities remains strictly constant throughout the motion?",
      option_a: "Kinetic energy",
      option_b: "Linear momentum vector",
      option_c: "Centripetal acceleration vector",
      option_d: "Velocity vector",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy is a scalar quantity: KE = (1/2) m v².\nStep 2: Since the speed v is constant, kinetic energy remains strictly constant.\nStep 3: Momentum, acceleration, and velocity are all vectors whose directions continuously change.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 173,
    question: "A ball is projected from point A with velocity 20 m/s at angle 60° to horizontal direction. At highest point B of path velocity v of ball will be? [NEET 2023 Manipur]",
    optionA: "20",
    optionB: "10√3",
    optionC: "Zero",
    optionD: "10",
    correctOption: "D",
    explanation: "Step 1: Initial launch speed u = 20 m s⁻¹ at angle θ = 60° with the horizontal.\nStep 2: In projectile motion under gravity, no horizontal forces act on the ball (neglecting air resistance), so the horizontal component of velocity is conserved throughout the entire trajectory:\nv_x = u cos θ = 20 × cos 60° = 20 × (1/2) = 10 m s⁻¹.\nStep 3: At the highest point B of the path, the vertical component of velocity becomes zero (v_y = 0).\nStep 4: Therefore, the total velocity of the ball at the highest point B is purely horizontal:\nv_B = v_x = 10 m s⁻¹.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A ball is projected with speed 40 m s⁻¹ at an angle of 60° with the horizontal. What is its velocity at the highest point?",
      option_a: "20 m s⁻¹",
      option_b: "40 m s⁻¹",
      option_c: "20√3 m s⁻¹",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: At maximum height, v = u cos θ.\nStep 2: v = 40 × cos 60° = 40 × 0.5 = 20 m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 172,
    question: "Let ω1 ω2 and ω3 be angular speed of second hand minute hand and hour hand of smoothly running analog clock respectively. If x1 x2 and x3 are their respective angular distances in 1 minute then factor which remains constant k is? [NEET 2024 Re-Examination]",
    optionA: "ω1/x1 = ω2/x2 = ω3/x3 = k",
    optionB: "ω1 x1 = ω2 x2 = ω3 x3 = k",
    optionC: "ω1 x1² = ω2 x2² = ω3 x3² = k",
    optionD: "ω1² x1 = ω2² x2 = ω3² x3 = k",
    correctOption: "A",
    explanation: "Step 1: The angular distance (angular displacement) θ rotated by any clock hand moving with constant angular speed ω in time t is given by the definition:\nθ = ω × t.\nStep 2: Here, the angular distances covered in a fixed time interval of t = 1 minute are denoted by x₁, x₂, and x₃ for the three hands:\n- x₁ = ω₁ × t\n- x₂ = ω₂ × t\n- x₃ = ω₃ × t.\nStep 3: Rearranging each relation to isolate time t:\nω₁ / x₁ = 1 / t\nω₂ / x₂ = 1 / t\nω₃ / x₃ = 1 / t.\nStep 4: Since the time interval t = 1 minute is identical for all three hands, the ratio of angular speed to angular distance covered in that time is constant:\nω₁ / x₁ = ω₂ / x₂ = ω₃ / x₃ = 1 / t = k.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the ratio of the angular speed of the second hand to that of the minute hand of a clock?",
      option_a: "60 : 1",
      option_b: "1 : 60",
      option_c: "12 : 1",
      option_d: "720 : 1",
      correct_option: "A",
      explanation: "Step 1: The second hand completes 2π radians in 60 s (ω_sec = 2π / 60 rad s⁻¹).\nStep 2: The minute hand completes 2π radians in 3600 s (ω_min = 2π / 3600 rad s⁻¹).\nStep 3: Ratio = ω_sec / ω_min = 3600 / 60 = 60 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 171,
    question: "A bob is whirled in a horizontal circle by means of a string at an initial speed of 10 rpm. If the tension in the string is quadrupled while keeping radius constant new speed is? [NEET 2024 Re-Examination]",
    optionA: "20 rpm",
    optionB: "40 rpm",
    optionC: "5 rpm",
    optionD: "10 rpm",
    correctOption: "A",
    explanation: "Step 1: When a bob of mass m is whirled in a horizontal circle of radius r on a frictionless table, the tension T in the string provides the required centripetal force:\nT = m ω² r = m (2π N)² r = 4π² m r N²,\nwhere N is the rotational speed in revolutions per minute (rpm).\nStep 2: Since the mass m and radius r are held constant:\nT ∝ N² → N ∝ √T.\nStep 3: Let T₁ be the initial tension and T₂ = 4 T₁ be the new tension:\nN₂ / N₁ = √(T₂ / T₁) = √(4 T₁ / T₁) = √4 = 2.\nStep 4: Calculate the new rotational speed N₂:\nN₂ = 2 × N₁ = 2 × 10 rpm = 20 rpm.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A stone tied to a string is rotated in a horizontal circle of fixed radius at 15 rpm. If the tension in the string is increased by 9 times, what will be the new rotational speed?",
      option_a: "45 rpm",
      option_b: "135 rpm",
      option_c: "30 rpm",
      option_d: "5 rpm",
      correct_option: "A",
      explanation: "Step 1: N ∝ √T.\nStep 2: When tension increases 9-fold, speed increases by √9 = 3 times.\nStep 3: N_new = 3 × 15 = 45 rpm.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

