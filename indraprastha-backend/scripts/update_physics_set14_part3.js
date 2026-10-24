const set14Part3Updates = [
  {
    id: 6323, // Q71
    similar_question: {
      question: "The parametric coordinates of a particle moving in the x-y plane are given by x = 3 t² and y = 4 t² (where x and y are in meters and t is in seconds). What is the speed of the particle at t = 2 seconds?",
      option_a: "20 m/s",
      option_b: "10 m/s",
      option_c: "14 m/s",
      option_d: "25 m/s",
      correct_option: "A",
      explanation: "Step 1: Compute the velocity components by differentiating position with respect to time:\nv_x = dx/dt = d/dt (3 t²) = 6 t\nv_y = dy/dt = d/dt (4 t²) = 8 t.\n\nStep 2: Evaluate velocity components at t = 2 s:\nv_x = 6(2) = 12 m/s\nv_y = 8(2) = 16 m/s.\n\nStep 3: The speed is the magnitude of the velocity vector:\nv = √(v_x² + v_y²) = √(12² + 16²) = √(144 + 256) = √400 = 20 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6324, // Q72
    similar_question: {
      question: "The position of a particle moving along a straight line is given by x(t) = 3 + 4 t + 2 t² (where x is in meters and t in seconds). What is the average velocity of the particle between t = 1.0 s and t = 3.0 s?",
      option_a: "12 m/s",
      option_b: "10 m/s",
      option_c: "16 m/s",
      option_d: "14 m/s",
      correct_option: "A",
      explanation: "Step 1: Compute position at t = 1.0 s:\nx(1) = 3 + 4(1) + 2(1)² = 3 + 4 + 2 = 9 m.\n\nStep 2: Compute position at t = 3.0 s:\nx(3) = 3 + 4(3) + 2(3)² = 3 + 12 + 18 = 33 m.\n\nStep 3: Average velocity is total displacement divided by elapsed time:\nv_avg = [x(3) − x(1)] / (3 − 1) = (33 − 9) / 2 = 24 / 2 = 12 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6325, // Q73
    similar_question: {
      question: "The position vector of a particle is given by r(t) = (6 t − 3 t²) i + 4 t j. At what time t is the velocity vector perpendicular to the acceleration vector?",
      option_a: "1.0 second",
      option_b: "0.5 seconds",
      option_c: "2.0 seconds",
      option_d: "1.5 seconds",
      correct_option: "A",
      explanation: "Step 1: Velocity vector: v(t) = dr/dt = (6 − 6 t) i + 4 j.\n\nStep 2: Acceleration vector: a(t) = dv/dt = −6 i + 0 j = −6 i.\n\nStep 3: For v and a to be perpendicular, their dot product must vanish:\nv · a = 0  →  (6 − 6 t)(−6) + 4(0) = 0  →  −36 + 36 t = 0  →  36 t = 36  →  t = 1.0 second.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6326, // Q74
    similar_question: {
      question: "Two smooth, frictionless inclined planes of the same vertical height h have angles of inclination θ₁ = 30° and θ₂ = 60°. Two identical blocks are released from rest from the top of each incline. Which block reaches the bottom with greater speed, and which reaches earlier?",
      option_a: "Both reach the bottom with the exact same speed, but the block on the steeper incline (60°) reaches earlier",
      option_b: "The block on the steeper incline reaches with greater speed and reaches earlier",
      option_c: "The block on the gradual incline reaches earlier because the distance is smaller",
      option_d: "Both reach at the exact same time with the same speed",
      correct_option: "A",
      explanation: "Step 1: By conservation of mechanical energy: m g h = (1/2) m v²  →  v = √(2gh).\nSince both planes have the exact same vertical height h, both blocks reach the bottom with the identical final speed v = √(2gh).\n\nStep 2: The acceleration along an incline is a = g sin θ, and distance along the incline is s = h / sin θ.\n\nStep 3: The time of descent is t = √(2s / a) = √[ 2(h / sin θ) / (g sin θ) ] = [ 1 / sin θ ] √(2h / g).\n\nStep 4: Since sin 60° > sin 30°, the steeper incline requires less time (t₂ < t₁).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6327, // Q75
    similar_question: {
      question: "A ball dropped from the roof of a building of height H takes time T to reach the ground. What was the position of the ball at time t = T / 2 after being released?",
      option_a: "At a distance of H / 4 below the roof (or 3H / 4 above the ground)",
      option_b: "At a distance of H / 2 below the roof",
      option_c: "At a distance of 3H / 4 below the roof",
      option_d: "At a distance of H / 8 below the roof",
      correct_option: "A",
      explanation: "Step 1: The total distance fallen in time T starting from rest is: H = (1/2) g T².\n\nStep 2: The distance fallen in time t = T / 2 is:\ny = (1/2) g (T / 2)² = (1/2) g (T² / 4) = (1/4) [ (1/2) g T² ] = H / 4.\n\nStep 3: Therefore, the ball has fallen a distance of H / 4 from the top, which means it is at height (H − H/4) = 3H / 4 above the ground.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6328, // Q76
    similar_question: {
      question: "A person standing on an open railroad flatcar moving forward throws a small stone vertically upward with speed u relative to the flatcar. Under what condition will the stone land directly back into the person's hands?",
      option_a: "Only if the flatcar moves with a constant horizontal velocity",
      option_b: "If the flatcar is accelerating forward at a constant rate",
      option_c: "If the flatcar is decelerating (braking) uniformly",
      option_d: "The stone can never return to the thrower's hands",
      correct_option: "A",
      explanation: "Step 1: When thrown vertically relative to the flatcar, the stone retains the horizontal velocity of the flatcar at the moment of release: v_x,stone = v_cart.\n\nStep 2: If the flatcar moves with constant velocity, both the person and the stone cover the exact same horizontal displacement during the flight time t: x_stone = x_person = v_cart × t.\n\nStep 3: Hence, the stone falls right back into the person's hands.\n(If the cart accelerates forward, the cart gains extra displacement and the ball lands behind the person).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6329, // Q77
    similar_question: {
      question: "A juggler maintains a continuous rhythm by throwing balls vertically upward at regular intervals of 0.8 seconds. Each ball is launched exactly at the moment when the preceding ball reaches its maximum height. To what maximum height do the balls rise? (Take g = 10 m/s²)",
      option_a: "3.2 m",
      option_b: "4.0 m",
      option_c: "2.4 m",
      option_d: "5.0 m",
      correct_option: "A",
      explanation: "Step 1: The time of ascent to reach the highest point (where v = 0) equals the launch interval: t_ascent = 0.8 s.\n\nStep 2: Using v = u − g t: 0 = u − 10(0.8)  →  u = 8.0 m/s.\n\nStep 3: The maximum height reached is:\nH = u² / (2g) = (8.0)² / (2 × 10) = 64 / 20 = 3.2 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6330, // Q78
    similar_question: {
      question: "A stone projected vertically upward from the ground travels a distance of 4.9 m during the very last second of its upward journey before coming momentarily to rest at its peak. If the stone is instead projected with three times the initial speed, what distance will it travel during the last second of its upward journey? (Take g = 9.8 m/s²)",
      option_a: "4.9 m",
      option_b: "14.7 m",
      option_c: "44.1 m",
      option_d: "9.8 m",
      correct_option: "A",
      explanation: "Step 1: By time symmetry of vertical motion under gravity, the distance traveled in the last 1 second of ascent is identical to the distance fallen from rest in the first 1 second of descent.\n\nStep 2: Starting from rest at the highest point (u = 0), the distance fallen in t = 1.0 s is:\nh = (1/2) g t² = (1/2) × 9.8 × (1.0)² = 4.9 m.\n\nStep 3: This distance depends strictly on g and the time interval (1 second); it is completely independent of the initial launch speed or peak height.\n\nStep 4: Therefore, the distance traveled in the last second remains exactly 4.9 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6331, // Q79
    similar_question: {
      question: "A body is thrown vertically upward with speed u from ground level. At what fraction of its maximum height is the speed of the body equal to u / 2?",
      option_a: "3 / 4 of the maximum height",
      option_b: "1 / 2 of the maximum height",
      option_c: "1 / 4 of the maximum height",
      option_d: "2 / 3 of the maximum height",
      correct_option: "A",
      explanation: "Step 1: The maximum height reached is H_max = u² / (2g).\n\nStep 2: Let h be the height where the speed is v = u / 2.\nUsing the third kinematic equation: v² = u² − 2gh:\n(u / 2)² = u² − 2gh  →  u² / 4 = u² − 2gh  →  2gh = (3/4) u².\n\nStep 3: Solve for h:\nh = (3/4) [ u² / (2g) ] = (3/4) H_max.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6332, // Q80
    similar_question: {
      question: "A projectile is launched vertically upward from the ground. Throughout its motion, air resistance provides a constant resistive acceleration of magnitude a_r = 2.0 m/s². What is the ratio of its time of ascent (t_up) to its time of descent (t_down)? (Take g = 10 m/s²)",
      option_a: "√(2 / 3)",
      option_b: "√(3 / 2)",
      option_c: "2 / 3",
      option_d: "1 / 2",
      correct_option: "A",
      explanation: "Step 1: During upward motion, both gravity and air resistance act downward, so the net upward deceleration is:\na_up = g + a_r = 10 + 2 = 12 m/s².\n\nStep 2: During downward motion, gravity acts downward while air resistance acts upward, so the net downward acceleration is:\na_down = g − a_r = 10 − 2 = 8 m/s².\n\nStep 3: Both ascent and descent cover the same vertical height H:\nH = (1/2) a_up t_up² = (1/2) a_down t_down².\n\nStep 4: The ratio of times is:\nt_up / t_down = √(a_down / a_up) = √(8 / 12) = √(2 / 3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6333, // Q81
    similar_question: {
      question: "From the edge of a cliff of height h, two stones of masses m and 2m are projected: stone 1 vertically upward with speed u, and stone 2 vertically downward with the same speed u. Neglecting air resistance, what is the ratio of their impact speeds when they hit the ground?",
      option_a: "1 : 1 (both strike with the exact same speed)",
      option_b: "1 : 2",
      option_c: "2 : 1",
      option_d: "1 : √2",
      correct_option: "A",
      explanation: "Step 1: By conservation of mechanical energy for a projectile of mass M:\nE_total = (1/2) M u² + M g h = (1/2) M v_ground².\n\nStep 2: Dividing through by M shows that mass cancels completely:\nv_ground = √(u² + 2gh).\n\nStep 3: Both stones start with speed u at height h, so both strike the ground with the identical final speed v = √(u² + 2gh).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6334, // Q82
    similar_question: {
      question: "Water drops fall at regular, equal time intervals from a roof tap located 20 m above the ground. The fifth drop is just leaving the tap at the exact instant the first drop hits the ground. What is the height of the third drop above the ground at this instant? (Take g = 10 m/s²)",
      option_a: "15 m",
      option_b: "11.25 m",
      option_c: "8.75 m",
      option_d: "10 m",
      correct_option: "A",
      explanation: "Step 1: Let Δt be the constant time interval between successive drops.\nWhen the 5th drop leaves, the 1st drop has been falling for total time t₁ = 4 Δt.\n\nStep 2: Total height fallen by 1st drop is:\nH = (1/2) g (4 Δt)² = (1/2) g (16 Δt²) = 8 g Δt² = 20 m  →  g Δt² = 20 / 8 = 2.5 m.\n\nStep 3: The 3rd drop has been falling for time t₃ = 2 Δt.\nDistance fallen by 3rd drop from the tap is:\ny₃ = (1/2) g (2 Δt)² = (1/2) g (4 Δt²) = 2 (g Δt²) = 2 (2.5) = 5 m.\n\nStep 4: Height of the 3rd drop above the ground is:\nh₃ = 20 m − 5 m = 15 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6335, // Q83
    similar_question: {
      question: "Two small lead balls are dropped simultaneously from rest from the same height in a tall evacuated vertical tube. Neglecting air resistance, what happens to the vertical separation distance between the two balls as they fall?",
      option_a: "The separation remains exactly zero (or constant if held with an initial vertical gap)",
      option_b: "The separation increases linearly with time",
      option_c: "The separation decreases continuously",
      option_d: "The separation increases quadratically with time",
      correct_option: "A",
      explanation: "Step 1: Both balls experience the exact same acceleration due to gravity (a₁ = a₂ = g downward).\n\nStep 2: The relative acceleration is a_rel = a₁ − a₂ = g − g = 0.\n\nStep 3: Since both are released simultaneously from rest, their initial relative velocity is u_rel = 0.\n\nStep 4: By kinematics, relative displacement is Δy(t) = u_rel t + (1/2) a_rel t² = 0. Thus, any initial vertical separation remains strictly constant throughout the fall.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6336, // Q84
    similar_question: {
      question: "A particle is thrown vertically upward with initial speed u and returns to the projection point after completing its flight under gravity. What is the average speed of the particle for the entire round trip?",
      option_a: "u / 2",
      option_b: "u",
      option_c: "0",
      option_d: "2 u",
      correct_option: "A",
      explanation: "Step 1: Maximum height reached during ascent is H = u² / (2g).\nTotal distance covered for the round trip (up and down) is: D_total = 2 H = 2 [ u² / (2g) ] = u² / g.\n\nStep 2: Total time of flight is: T_total = 2u / g.\n\nStep 3: By definition, average speed is total distance divided by total time:\nv_avg = D_total / T_total = (u² / g) / (2u / g) = u / 2.\n(Note: Average velocity is zero, but average speed is u / 2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6337, // Q85
    similar_question: {
      question: "A passenger in an elevator moving upward with a uniform velocity of 5.0 m/s throws a coin vertically upward with a speed of 14.7 m/s relative to the elevator. After what time will the coin return to the passenger's hand? (Take g = 9.8 m/s²)",
      option_a: "3.0 seconds",
      option_b: "1.5 seconds",
      option_c: "4.0 seconds",
      option_d: "2.0 seconds",
      correct_option: "A",
      explanation: "Step 1: Since the elevator moves with constant velocity, it is an inertial reference frame.\n\nStep 2: In the reference frame of the passenger, the initial velocity of the coin is u_rel = 14.7 m/s upward, and its downward acceleration is g = 9.8 m/s².\n\nStep 3: The time of flight to return to the hand is:\nT = 2 u_rel / g = 2(14.7) / 9.8 = 29.4 / 9.8 = 3.0 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6338, // Q86
    similar_question: {
      question: "A ball thrown vertically upward from ground level returns to the thrower's hand after a total flight time of 12.0 seconds. What was the maximum height reached by the ball? (Take g = 9.8 m/s²)",
      option_a: "176.4 m",
      option_b: "144.0 m",
      option_c: "352.8 m",
      option_d: "88.2 m",
      correct_option: "A",
      explanation: "Step 1: Due to the time symmetry of vertical projectile motion, the time of ascent is half the total flight time:\nt_up = T / 2 = 12.0 / 2 = 6.0 seconds.\n\nStep 2: At maximum height, the vertical velocity is zero. The distance fallen from rest in 6.0 seconds equals the maximum height:\nH_max = (1/2) g t_up² = (1/2) × 9.8 × (6.0)² = 4.9 × 36 = 176.4 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6339, // Q87
    similar_question: {
      question: "A body moving along a straight line covers the first half of the total distance with a speed of 30 km/h and the second half of the total distance with a speed of 60 km/h. What is the average speed of the body for the entire journey?",
      option_a: "40 km/h",
      option_b: "45 km/h",
      option_c: "50 km/h",
      option_d: "35 km/h",
      correct_option: "A",
      explanation: "Step 1: Let the total distance be 2d. The time taken for the first half is t₁ = d / 30, and for the second half is t₂ = d / 60.\n\nStep 2: Total time is: t_total = t₁ + t₂ = d/30 + d/60 = (2d + d) / 60 = 3d / 60 = d / 20.\n\nStep 3: Average speed is total distance divided by total time:\nv_avg = (2d) / (d / 20) = 2 × 20 = 40 km/h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6340, // Q88
    similar_question: {
      question: "The velocity-time graph of a moving particle is a straight line sloping downward from v = +10 m/s at t = 0 to v = −10 m/s at t = 4 s. What is the total displacement and total distance covered by the particle in these 4 seconds?",
      option_a: "Displacement = 0 m, Distance = 20 m",
      option_b: "Displacement = 20 m, Distance = 20 m",
      option_c: "Displacement = 10 m, Distance = 0 m",
      option_d: "Displacement = 0 m, Distance = 10 m",
      correct_option: "A",
      explanation: "Step 1: The line crosses the time axis (v = 0) at t = 2 s.\n\nStep 2: Area of upper triangle (t = 0 to 2 s): A₁ = (1/2) × 2 × 10 = +10 m (forward displacement).\nArea of lower triangle (t = 2 to 4 s): A₂ = (1/2) × 2 × (−10) = −10 m (backward displacement).\n\nStep 3: Total displacement is algebraic sum of areas: s = A₁ + A₂ = 10 − 10 = 0 m.\nTotal distance is sum of magnitudes of areas: d = |A₁| + |A₂| = 10 + 10 = 20 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6341, // Q89
    similar_question: {
      question: "A particle starts from rest at x = 0 and moves along the x-axis under an acceleration that decreases linearly with displacement from a₀ = 8 m/s² at x = 0 to a = 0 at x = 4 m. What is the maximum velocity acquired by the particle?",
      option_a: "5.66 m/s (which is 4√2 m/s)",
      option_b: "8.00 m/s",
      option_c: "4.00 m/s",
      option_d: "2.83 m/s",
      correct_option: "A",
      explanation: "Step 1: In an acceleration versus displacement (a-x) graph, the area under the curve represents ∫ a dx = (v_max² − v_initial²) / 2.\n\nStep 2: Here v_initial = 0, so v_max² / 2 = Area of triangle.\n\nStep 3: The triangular area from x = 0 to x = 4 m is:\nArea = (1/2) × Base × Height = (1/2) × 4 × 8 = 16 m²/s².\n\nStep 4: Equating: v_max² / 2 = 16  →  v_max² = 32  →  v_max = √32 = 4√2 ≈ 5.66 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6342, // Q90
    similar_question: {
      question: "Under which of the following physical conditions is the speed of a particle moving along a straight line definitely increasing?",
      option_a: "Both velocity and acceleration have the same algebraic sign (both positive or both negative)",
      option_b: "Velocity is positive while acceleration is negative",
      option_c: "Velocity is negative while acceleration is positive",
      option_d: "Acceleration is zero while velocity is non-zero",
      correct_option: "A",
      explanation: "Step 1: Speed is the magnitude of velocity: v_speed = |v|.\n\nStep 2: The rate of change of speed is d/dt (|v|) = (v / |v|) (dv/dt) = (v · a) / |v|.\n\nStep 3: If v and a have the same sign (v · a > 0), the acceleration acts in the same direction as motion, causing speed to increase.\n\nStep 4: If v and a have opposite signs, the acceleration opposes motion, causing the particle to slow down.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6343, // Q91
    similar_question: {
      question: "A particle moves along a line such that it moves forward 60 m in the first 10 seconds, remains stationary for 5 seconds, and then returns 30 m toward the origin in the next 5 seconds. What is the average speed of the particle over the total 20-second interval?",
      option_a: "4.5 m/s",
      option_b: "1.5 m/s",
      option_c: "3.0 m/s",
      option_d: "6.0 m/s",
      correct_option: "A",
      explanation: "Step 1: Total distance covered is the sum of path lengths traveled in all segments:\nTotal distance = 60 m + 0 m + 30 m = 90 m.\n\nStep 2: Total time elapsed is:\nTotal time = 10 s + 5 s + 5 s = 20 seconds.\n\nStep 3: Average speed is:\nv_avg = Total distance / Total time = 90 m / 20 s = 4.5 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6344, // Q92
    similar_question: {
      question: "Which of the following pairs of kinematic graphs represents the motion of a body dropped from rest under uniform gravity (neglecting air resistance)?",
      option_a: "A linear velocity-time graph passing through origin with constant slope g, and a parabolic position-time curve opening upward (y ∝ t²)",
      option_b: "A horizontal velocity-time graph and a linear position-time graph",
      option_c: "A parabolic velocity-time curve and a cubic position-time curve",
      option_d: "An exponential velocity-time curve and a logarithmic position-time graph",
      correct_option: "A",
      explanation: "Step 1: For a body released from rest under constant acceleration g:\nv(t) = g t, which is a straight line passing through the origin with slope g.\n\nStep 2: The position varies as y(t) = (1/2) g t², which is a parabola opening upward.\n\nStep 3: Both graphs consistently describe the exact same motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6345, // Q93
    similar_question: {
      question: "In a displacement-time (x-t) graph, how can one determine whether a particle is speeding up (accelerating in the direction of motion)?",
      option_a: "The magnitude of the slope of the x-t graph (|dx/dt|) is increasing with time (the curve is getting steeper)",
      option_b: "The slope of the x-t graph is strictly zero",
      option_c: "The graph is a straight line with constant non-zero slope",
      option_d: "The curve is becoming flatter and more horizontal",
      correct_option: "A",
      explanation: "Step 1: The slope of the position-time curve at any instant represents the instantaneous velocity: v = dx/dt.\n\nStep 2: Speed is the absolute magnitude of velocity: speed = |slope|.\n\nStep 3: When a particle is speeding up, the magnitude of its slope increases with time, meaning the graph curves upwards or downwards becoming increasingly steep.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6346, // Q94
    similar_question: {
      question: "If the velocity-time graph of a particle is a straight horizontal line parallel to the time axis (v = constant ≠ 0), what are the corresponding acceleration-time and displacement-time graphs?",
      option_a: "Acceleration is zero (a = 0) at all times, and displacement is a straight line with constant non-zero slope",
      option_b: "Acceleration is constant non-zero, and displacement is parabolic",
      option_c: "Acceleration is linear, and displacement is cubic",
      option_d: "Acceleration is infinite, and displacement is zero",
      correct_option: "A",
      explanation: "Step 1: Since velocity is constant (v = v₀), acceleration is its derivative: a = dv/dt = 0.\n\nStep 2: Displacement is obtained by integration: s = ∫ v dt = v₀ t + s₀, which is a linear graph with constant slope v₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6347, // Q95
    similar_question: {
      question: "A car moves along a straight road such that its velocity is negative (v < 0, moving to the left) while its acceleration is positive (a > 0, directed to the right). Which statement correctly describes the car's motion?",
      option_a: "The car is moving to the left and slowing down",
      option_b: "The car is moving to the right and speeding up",
      option_c: "The car is moving to the left and speeding up",
      option_d: "The car is moving to the right and slowing down",
      correct_option: "A",
      explanation: "Step 1: The sign of velocity indicates the direction of motion: v < 0 means the car is moving in the negative direction (to the left).\n\nStep 2: The acceleration is positive (to the right), which opposes the direction of motion.\n\nStep 3: Because velocity and acceleration have opposite signs (v · a < 0), the car is decelerating (slowing down).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6348, // Q96
    similar_question: {
      question: "A particle initially moving with positive velocity v₀ > 0 along the x-axis is subjected to a constant negative acceleration a = −a₀. Will the particle definitely return to its initial starting point?",
      option_a: "Yes, because the constant deceleration will bring it to rest and then accelerate it back to the origin",
      option_b: "No, it will continue moving forward indefinitely",
      option_c: "No, it will stop at its turning point and remain stationary forever",
      option_d: "It depends on the initial mass of the particle",
      correct_option: "A",
      explanation: "Step 1: With constant negative acceleration, velocity at time t is v(t) = v₀ − a₀ t.\n\nStep 2: The particle comes momentarily to rest at turning time t₁ = v₀ / a₀.\n\nStep 3: Since the negative acceleration continues to act, the particle reverses direction and accelerates backwards.\n\nStep 4: Displacement is x(t) = v₀ t − (1/2) a₀ t². Setting x(t) = 0 gives t = 2 v₀ / a₀, proving that the particle definitely returns to its initial starting point.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6349, // Q97
    similar_question: {
      question: "The motion of an object in the x-y plane is defined by x(t) = A cos(ωt) and y(t) = B sin(ωt), where A ≠ B and both are positive constants. What is the nature of the trajectory and the direction of acceleration?",
      option_a: "The trajectory is an ellipse, and the acceleration is always directed toward the origin",
      option_b: "The trajectory is a circle, and acceleration is tangential",
      option_c: "The trajectory is a straight line, and acceleration is zero",
      option_d: "The trajectory is a parabola, and acceleration is along the y-axis",
      correct_option: "A",
      explanation: "Step 1: From the parametric equations: cos(ωt) = x / A, and sin(ωt) = y / B.\n\nStep 2: Using the identity cos²(ωt) + sin²(ωt) = 1:\n(x / A)² + (y / B)² = 1, which represents an ellipse centered at the origin.\n\nStep 3: The acceleration components are:\na_x = d²x/dt² = −ω² A cos(ωt) = −ω² x\na_y = d²y/dt² = −ω² B sin(ωt) = −ω² y.\n\nStep 4: The total acceleration vector is a = −ω² (x i + y j) = −ω² r, which is always directed toward the origin (central force).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6350, // Q98
    similar_question: {
      question: "For a particle moving along a straight line, the square of its velocity (v²) is plotted against displacement x, yielding a straight line with slope m = 6.0 m/s² and intercept c = 16 m²/s². What is the acceleration of the particle?",
      option_a: "3.0 m/s² (constant acceleration)",
      option_b: "6.0 m/s²",
      option_c: "12.0 m/s²",
      option_d: "1.5 m/s²",
      correct_option: "A",
      explanation: "Step 1: The third kinematic equation for motion with constant acceleration a is:\nv² = u² + 2 a x.\n\nStep 2: Comparing this with the straight-line equation y = m x + c (where y = v²):\nSlope m = 2 a.\n\nStep 3: Given slope m = 6.0 m/s²:\n2 a = 6.0  →  a = 3.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6351, // Q99
    similar_question: {
      question: "The position of a particle moving along the x-axis is given by x(t) = 10 − 4 t + 2 t² (where x is in meters and t in seconds). What is the slope and vertical intercept of the corresponding velocity-time (v-t) graph?",
      option_a: "Slope = 4 m/s² and intercept = −4 m/s",
      option_b: "Slope = 2 m/s² and intercept = 10 m/s",
      option_c: "Slope = 4 m/s² and intercept = 10 m/s",
      option_d: "Slope = −4 m/s² and intercept = 4 m/s",
      correct_option: "A",
      explanation: "Step 1: Velocity is the time derivative of position:\nv(t) = dx/dt = d/dt (10 − 4 t + 2 t²) = −4 + 4 t.\n\nStep 2: Rearranging into standard linear form v(t) = m t + c:\nv(t) = 4 t − 4.\n\nStep 3: The slope of the v-t graph represents acceleration: Slope = 4 m/s².\nThe vertical intercept at t = 0 is: Intercept = −4 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6352, // Q100
    similar_question: {
      question: "An acceleration versus velocity (a-v) graph of a particle moving along a straight line is a straight line passing through the points (v = 0, a = 10 m/s²) and (v = 5 m/s, a = 0). What is the maximum velocity that the particle can attain?",
      option_a: "5 m/s",
      option_b: "10 m/s",
      option_c: "2.5 m/s",
      option_d: "25 m/s",
      correct_option: "A",
      explanation: "Step 1: Acceleration is the rate of change of velocity with time (a = dv/dt).\n\nStep 2: As long as acceleration a > 0, velocity continues to increase.\n\nStep 3: The velocity reaches its maximum possible value at the exact point where acceleration drops to zero (a = 0).\n\nStep 4: From the graph, a = 0 occurs at v = 5 m/s. Beyond this, a becomes negative and the particle slows down. Thus, v_max = 5 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6353, // Q101
    similar_question: {
      question: "A displacement versus time graph of a body is horizontal at t = 0, curves upward parabolically, and then asymptotically levels off horizontally at large time t. What physical conclusions can be drawn about this motion?",
      option_a: "The body starts from rest, accelerates initially, and eventually comes to rest as time t → ∞",
      option_b: "The body moves with uniform non-zero velocity throughout",
      option_c: "The body is perpetually accelerating at an increasing rate",
      option_d: "The body undergoes uniform circular motion",
      correct_option: "A",
      explanation: "Step 1: The slope of the displacement-time graph (dx/dt) represents velocity.\n\nStep 2: At t = 0, slope is zero, meaning the body starts from rest.\n\nStep 3: In the intermediate region, the slope increases, meaning the body accelerates.\n\nStep 4: At large times, the graph levels off to a horizontal asymptote (slope dx/dt → 0), which means the velocity drops to zero and the body comes to rest.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6354, // Q102
    similar_question: {
      question: "A particle moves along a straight line with uniform acceleration. If it covers distances s₁ and s₂ in two successive equal time intervals of duration T, what is the acceleration of the particle?",
      option_a: "a = (s₂ − s₁) / T²",
      option_b: "a = (s₂ − s₁) / (2 T²)",
      option_c: "a = (s₁ + s₂) / T²",
      option_d: "a = 2 (s₂ − s₁) / T²",
      correct_option: "A",
      explanation: "Step 1: Let u be the initial velocity at the start of the first interval.\nIn the first interval of duration T: s₁ = u T + (1/2) a T².\n\nStep 2: The velocity at the end of the first interval is u' = u + a T.\nIn the second interval of duration T: s₂ = u' T + (1/2) a T² = (u + a T) T + (1/2) a T² = u T + (3/2) a T².\n\nStep 3: Subtracting s₁ from s₂:\ns₂ − s₁ = [ u T + (3/2) a T² ] − [ u T + (1/2) a T² ] = a T².\n\nStep 4: Solving for acceleration:\na = (s₂ − s₁) / T².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6355, // Q103
    similar_question: {
      question: "A particle starts from rest and moves with constant acceleration for time t₁ = 4 s, and then decelerates uniformly to rest in time t₂ = 2 s. What is the ratio of the distance covered during acceleration to that during deceleration?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: In both phases, motion is under uniform acceleration between 0 and maximum velocity v_max.\n\nStep 2: Distance covered in the accelerating phase is:\ns₁ = (1/2) v_max t₁.\n\nStep 3: Distance covered in the decelerating phase is:\ns₂ = (1/2) v_max t₂.\n\nStep 4: The ratio of distances is:\ns₁ / s₂ = [(1/2) v_max t₁] / [(1/2) v_max t₂] = t₁ / t₂ = 4 / 2 = 2 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6356, // Q104
    similar_question: {
      question: "A velocity-time graph of a body consists of a triangular profile: it accelerates uniformly from 0 to v_max in interval OC (duration t₁) and then decelerates uniformly from v_max to 0 in interval CB (duration t₂ = 2 t₁). What is the ratio of the distance covered during OC to that during CB?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: Distance covered in any interval of a v-t graph equals the area under the curve.\n\nStep 2: Area for interval OC is a triangle of base t₁ and height v_max:\ns_OC = (1/2) v_max t₁.\n\nStep 3: Area for interval CB is a triangle of base t₂ = 2 t₁ and height v_max:\ns_CB = (1/2) v_max (2 t₁) = v_max t₁.\n\nStep 4: The ratio of distances is:\ns_OC / s_CB = [(1/2) v_max t₁] / [v_max t₁] = 1 / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6357, // Q105
    similar_question: {
      question: "At time t = 0, two cars A and B are side-by-side at the same starting point. On a v-t graph, car A maintains a constant high speed v_A, while car B accelerates from rest such that its velocity v_B reaches v_A at time t = t₁. At time t = t₁, which car is ahead, and what is the distance between them?",
      option_a: "Car A is ahead of car B by distance (1/2) v_A t₁",
      option_b: "Car B is ahead of car A",
      option_c: "Both cars are at the exact same location (B overtakes A)",
      option_d: "Car A is ahead of car B by distance v_A t₁",
      correct_option: "A",
      explanation: "Step 1: Distance covered by car A in time t₁ at constant speed v_A is:\ns_A = v_A t₁.\n\nStep 2: Distance covered by car B accelerating uniformly from 0 to v_A in time t₁ is the triangular area:\ns_B = (1/2) v_A t₁.\n\nStep 3: At t = t₁, the speeds become equal, but car A has traveled twice the distance of car B:\ns_A − s_B = v_A t₁ − (1/2) v_A t₁ = (1/2) v_A t₁ > 0.\n\nStep 4: Therefore, car A is ahead of car B by distance (1/2) v_A t₁.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 14 Part 3 (${set14Part3Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set14Part3Updates) {
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
        console.log(`[${successCount}/${set14Part3Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 14 Part 3 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart3();
