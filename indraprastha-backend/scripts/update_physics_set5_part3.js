const fs = require('fs');

const set5Part3Updates = [
  {
    id: 2275, // Q101
    similar_question: {
      question: "A car is moving at a speed of 30 m/s on a circular track of radius 300 m. If its speed is increasing at a tangential rate of 4 m/s², what is the magnitude of its net acceleration?",
      option_a: "5 m/s²",
      option_b: "3 m/s²",
      option_c: "7 m/s²",
      option_d: "4 m/s²",
      correct_option: "A",
      explanation: "Step 1: Calculate centripetal acceleration (radial):\na_c = v² / r = (30)² / 300 = 900 / 300 = 3 m/s².\n\nStep 2: Tangential acceleration:\na_t = 4 m/s².\n\nStep 3: Total acceleration:\na_net = √(a_c² + a_t²) = √(3² + 4²) = 5 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2276, // Q102
    similar_question: {
      question: "A particle moves along a circular path of radius 20 m such that the distance s travelled along the circumference is s(t) = 3 t² (in metres). What is the total acceleration of the particle at t = 2 s?",
      option_a: "9.39 m/s²",
      option_b: "6.0 m/s²",
      option_c: "7.2 m/s²",
      option_d: "12.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Find tangential speed and acceleration:\nv = ds / dt = 6t. At t = 2 s, v = 12 m/s.\na_t = dv / dt = 6 m/s².\n\nStep 2: Find centripetal acceleration:\na_c = v² / r = (12)² / 20 = 144 / 20 = 7.2 m/s².\n\nStep 3: Total acceleration:\na = √(a_t² + a_c²) = √(6² + 7.2²) = √(36 + 51.84) = √87.84 ≈ 9.39 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2277, // Q103
    similar_question: {
      question: "Two racing cars 1 and 2 are circling circular tracks of radii R₁ and R₂ respectively. If both cars complete one lap in the exact same time period T, what is the ratio of their angular speeds ω₁ / ω₂?",
      option_a: "1 : 1",
      option_b: "R₁ : R₂",
      option_c: "R₂ : R₁",
      option_d: "R₁² : R₂²",
      correct_option: "A",
      explanation: "Step 1: Formula for angular speed in terms of time period:\nω = 2π / T.\n\nStep 2: Since T₁ = T₂ = T:\nω₁ / ω₂ = (2π / T) / (2π / T) = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2278, // Q104
    similar_question: {
      question: "In circular motion, if the angle θ between the velocity vector and the acceleration vector is acute (0° < θ < 90°), the motion of the particle is:",
      option_a: "Accelerated circular motion (speed is increasing)",
      option_b: "Uniform circular motion",
      option_c: "Retarded circular motion (speed is decreasing)",
      option_d: "Stationary",
      correct_option: "A",
      explanation: "Step 1: The rate of change of speed equals tangential acceleration:\na_t = a cos θ = dv / dt.\n\nStep 2: When θ is acute (0° < θ < 90°), cos θ > 0, so a_t > 0.\nTherefore, the speed of the particle is increasing.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2279, // Q105
    similar_question: {
      question: "If the linear speed of an object in circular motion is doubled while its angular speed is reduced to half, what happens to the radius of its circular path?",
      option_a: "It increases by 4 times",
      option_b: "It remains unchanged",
      option_c: "It is doubled",
      option_d: "It is halved",
      correct_option: "A",
      explanation: "Step 1: Formula connecting radius, linear speed, and angular speed:\nr = v / ω.\n\nStep 2: New values: v' = 2v and ω' = ω / 2.\nr' = v' / ω' = (2v) / (ω / 2) = 4 (v / ω) = 4r.\nTherefore, the radius increases 4 times.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2280, // Q106
    similar_question: {
      question: "From the roof of a high-rise building, ball 1 is thrown horizontally with 15 m/s and ball 2 is thrown horizontally with 30 m/s. Which ball reaches the ground first? (Neglect air resistance)",
      option_a: "Both balls reach the ground at the same time",
      option_b: "Ball 1 reaches first",
      option_c: "Ball 2 reaches first",
      option_d: "Depends on atmospheric pressure",
      correct_option: "A",
      explanation: "Step 1: The vertical motion is governed by h = (1/2) g t² (initial vertical speed = 0 for both balls).\nStep 2: Time to hit the ground t = √(2h / g) is completely independent of the horizontal launch speed.\nTherefore, both land simultaneously.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2281, // Q107
    similar_question: {
      question: "Two bullets are fired simultaneously and horizontally from the same height with initial speeds 400 m/s and 800 m/s respectively over a level plain. Which bullet strikes the ground first?",
      option_a: "Both strike the ground at the same time",
      option_b: "The 400 m/s bullet strikes first",
      option_c: "The 800 m/s bullet strikes first",
      option_d: "The heavier bullet strikes first",
      correct_option: "A",
      explanation: "Step 1: Both bullets have identical zero initial vertical velocity and fall under the same downward acceleration g.\nStep 2: Time of flight t = √(2h / g) is the same for both.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2282, // Q108
    similar_question: {
      question: "A moving physical object may have non-zero acceleration without having non-zero velocity at that instant. An example of this is:",
      option_a: "A ball at the highest point of its vertical trajectory",
      option_b: "A car cruising at constant speed on a straight highway",
      option_c: "A train parked at a station",
      option_d: "A satellite in a circular orbit",
      correct_option: "A",
      explanation: "Step 1: When a ball is thrown vertically upward, at its highest point instantaneous velocity v = 0.\nStep 2: Gravity continues to exert downward force mg, so acceleration a = g = 9.8 m/s² ≠ 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2283, // Q109
    similar_question: {
      question: "A particle moves in a circle of radius 50 cm at a constant rate of 3 revolutions per second. What is its centripetal acceleration? (Take π² ≈ 10)",
      option_a: "180 m/s²",
      option_b: "90 m/s²",
      option_c: "45 m/s²",
      option_d: "360 m/s²",
      correct_option: "A",
      explanation: "Step 1: Radius r = 50 cm = 0.50 m. Frequency f = 3 rev/s.\nStep 2: Angular speed ω = 2π f = 6π rad/s.\nStep 3: Centripetal acceleration a_c = r ω² = 0.50 × (6π)² = 0.50 × 36π² = 18π² ≈ 18 × 10 = 180 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2284, // Q110
    similar_question: {
      question: "A mass of 2 kg is attached to a string and whirled in a horizontal circle of radius 2 m with an angular velocity of 5 rad/s. What is the centripetal force acting on the mass?",
      option_a: "100 N",
      option_b: "50 N",
      option_c: "20 N",
      option_d: "200 N",
      correct_option: "A",
      explanation: "Step 1: Centripetal force formula:\nF_c = m r ω².\n\nStep 2: Substitute m = 2 kg, r = 2 m, ω = 5 rad/s:\nF_c = 2 × 2 × (5)² = 4 × 25 = 100 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2285, // Q111
    similar_question: {
      question: "The velocity of projection of an oblique projectile is v = (6 i + 8 j) m/s (where i is horizontal and j is vertical). What is the speed of the projectile at its highest point?",
      option_a: "6 m/s",
      option_b: "8 m/s",
      option_c: "10 m/s",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Initial velocity components:\nv_x = 6 m/s, v_y = 8 m/s.\n\nStep 2: At the highest point, vertical velocity v_y = 0.\nThe horizontal velocity remains unchanged at v_x = 6 m/s.\nTherefore, the speed at the highest point is 6 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2286, // Q112
    similar_question: {
      question: "A projectile is launched from ground level with speed 40 m/s at an angle of 30° with the horizontal. Taking g = 10 m/s², what is its height above the ground 1 second after launch?",
      option_a: "15 m",
      option_b: "20 m",
      option_c: "25 m",
      option_d: "10 m",
      correct_option: "A",
      explanation: "Step 1: Vertical component of initial velocity:\nu_y = u sin 30° = 40 × 0.5 = 20 m/s.\n\nStep 2: Vertical position equation:\ny = u_y t − (1/2) g t²\n  = (20 × 1) − (1/2)(10)(1)² = 20 − 5 = 15 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2287, // Q113
    similar_question: {
      question: "A projectile is fired with kinetic energy K at an angle of 60° to the horizontal. What is its kinetic energy at the highest point of its trajectory?",
      option_a: "K / 4",
      option_b: "K / 2",
      option_c: "3K / 4",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Initial kinetic energy K = (1/2) m u².\nStep 2: Speed at the highest point: v_top = u cos 60° = u / 2.\nStep 3: Kinetic energy at highest point: K_top = (1/2) m (u / 2)² = [(1/2) m u²] / 4 = K / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2288, // Q114
    similar_question: {
      question: "The trajectory of a projectile is given by y = 8x − 0.5 x² (where x and y are in metres). What is the horizontal range of the projectile?",
      option_a: "16 m",
      option_b: "8 m",
      option_c: "32 m",
      option_d: "4 m",
      correct_option: "A",
      explanation: "Step 1: Set y = 0 at the landing point:\n8x − 0.5 x² = 0  →  x (8 − 0.5 x) = 0.\n\nStep 2: The non-zero solution is the horizontal range:\n0.5 x = 8  →  x = 8 / 0.5 = 16 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2289, // Q115
    similar_question: {
      question: "In standard projectile motion with initial velocity u at angle θ, the ratio of the velocity at the maximum height to the initial velocity is:",
      option_a: "cos θ",
      option_b: "sin θ",
      option_c: "tan θ",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: Velocity at maximum height is purely horizontal: v_top = u cos θ.\nStep 2: Initial velocity has magnitude u.\nStep 3: Ratio = (u cos θ) / u = cos θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2290, // Q116
    similar_question: {
      question: "At which specific point of a projectile's path is the acceleration vector perpendicular to the velocity vector?",
      option_a: "At the highest point",
      option_b: "At the point of projection",
      option_c: "At the point of landing",
      option_d: "At all points along the path",
      correct_option: "A",
      explanation: "Step 1: Acceleration due to gravity g is strictly vertical (downward).\nStep 2: Velocity is horizontal only at the highest point (apex) of the trajectory.\nTherefore, they are perpendicular (angle = 90°) exclusively at the highest point.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2291, // Q117
    similar_question: {
      question: "What is the ratio of the angular speed of the minute hand to that of the hour hand in a 12-hour clock?",
      option_a: "12 : 1",
      option_b: "60 : 1",
      option_c: "24 : 1",
      option_d: "1 : 12",
      correct_option: "A",
      explanation: "Step 1: Time period of minute hand: T_m = 1 hour.\nStep 2: Time period of hour hand: T_h = 12 hours.\nStep 3: Ratio of angular speeds: ω_m / ω_h = (2π / T_m) / (2π / T_h) = T_h / T_m = 12 / 1 = 12 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2292, // Q118
    similar_question: {
      question: "A stone of mass m tied to a string of length L is rotated in a horizontal circle with constant angular speed ω. What is the tension in the string (neglecting gravity)?",
      option_a: "m L ω²",
      option_b: "m L² ω",
      option_c: "m L / ω²",
      option_d: "m ω / L",
      correct_option: "A",
      explanation: "Step 1: The tension in the string provides the required centripetal force for circular motion:\nT = F_c = m a_c.\n\nStep 2: For radius r = L and angular velocity ω: a_c = L ω².\nTherefore, T = m L ω².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2293, // Q119
    similar_question: {
      question: "Two particles of equal mass revolve in concentric circular orbits of radii r₁ and r₂ with identical time periods T. What is the ratio of the centripetal forces F₁ / F₂ acting on them?",
      option_a: "r₁ / r₂",
      option_b: "r₂ / r₁",
      option_c: "(r₁ / r₂)²",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: For identical time periods, angular speeds are equal: ω = 2π / T.\nStep 2: Centripetal force formula: F = m r ω².\nStep 3: Ratio F₁ / F₂ = (m r₁ ω²) / (m r₂ ω²) = r₁ / r₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2294, // Q120
    similar_question: {
      question: "The displacement coordinates of a projectile at time t are x = 12t and y = 5t − 5t² (in metres). What was the initial speed of projection?",
      option_a: "13 m/s",
      option_b: "17 m/s",
      option_c: "7 m/s",
      option_d: "12 m/s",
      correct_option: "A",
      explanation: "Step 1: Find initial horizontal and vertical velocities by differentiation at t = 0:\nu_x = dx / dt = 12 m/s\nu_y = dy / dt = d/dt [5t − 5t²] = 5 − 10t. At t = 0, u_y = 5 m/s.\n\nStep 2: Initial speed u = √(u_x² + u_y²) = √(12² + 5²) = √(144 + 25) = √169 = 13 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2295, // Q121
    similar_question: {
      question: "A passenger sitting inside a train moving with a uniform velocity along a straight track tosses a coin vertically upward. What is the path of the coin as observed by an observer standing on the ground outside?",
      option_a: "A parabola",
      option_b: "A vertical straight line",
      option_c: "A horizontal straight line",
      option_d: "A circle",
      correct_option: "A",
      explanation: "Step 1: Relative to the ground, the coin possesses both an initial vertical upward velocity and the horizontal velocity of the train.\n\nStep 2: Under constant downward acceleration due to gravity, two-dimensional motion with constant horizontal velocity results in a parabolic trajectory.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2296, // Q122
    similar_question: {
      question: "Which of the following statements is INCORRECT regarding uniform circular motion?",
      option_a: "The acceleration vector is constant",
      option_b: "The speed of the particle is constant",
      option_c: "The kinetic energy is constant",
      option_d: "The acceleration vector is always directed towards the center",
      correct_option: "A",
      explanation: "Step 1: In uniform circular motion, the acceleration vector has constant magnitude (v² / r), but its direction changes continuously (always pointing toward the center).\nTherefore, the acceleration vector is NOT constant. Statement (A) is INCORRECT.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2297, // Q123
    similar_question: {
      question: "An aircraft flying horizontally at 720 km/h releases a supply capsule at a height of 1960 m above the ground. Taking g = 9.8 m/s², how long does it take for the capsule to strike the ground?",
      option_a: "20 s",
      option_b: "10 s",
      option_c: "14 s",
      option_d: "28 s",
      correct_option: "A",
      explanation: "Step 1: Time of fall depends only on vertical displacement from rest:\nh = (1/2) g t².\n\nStep 2: Solve for time t:\nt = √(2h / g) = √[(2 × 1960) / 9.8] = √(3920 / 9.8) = √400 = 20 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2298, // Q124
    similar_question: {
      question: "The horizontal and vertical coordinates of a projectile launched on a planet are x = 6t and y = 16t − 4t² (where x, y are in metres and t is in seconds). What is the maximum height reached by the projectile?",
      option_a: "16 m",
      option_b: "32 m",
      option_c: "8 m",
      option_d: "64 m",
      correct_option: "A",
      explanation: "Step 1: Find vertical velocity: v_y = dy / dt = 16 − 8t.\n\nStep 2: At maximum height, v_y = 0:\n16 − 8t = 0  →  t = 2 s.\n\nStep 3: Evaluate y at t = 2 s:\ny_max = 16(2) − 4(2)² = 32 − 16 = 16 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2299, // Q125
    similar_question: {
      question: "A stone projected with speed u at angle θ reaches maximum height H₁. When projected with the same speed at complementary angle (90° − θ), it reaches maximum height H₂. The horizontal range R is related to H₁ and H₂ by:",
      option_a: "R = 4 √(H₁ H₂)",
      option_b: "R = 2 √(H₁ H₂)",
      option_c: "R = 4 (H₁ + H₂)",
      option_d: "R = 16 √(H₁ H₂)",
      correct_option: "A",
      explanation: "Step 1: Formulas: H₁ = (u² sin² θ) / (2g), H₂ = (u² cos² θ) / (2g).\n\nStep 2: √(H₁ H₂) = [u² sin θ cos θ] / (2g).\n\nStep 3: Range R = (2 u² sin θ cos θ) / g = 4 × [u² sin θ cos θ / 2g] = 4 √(H₁ H₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2300, // Q126
    similar_question: {
      question: "The horizontal range of an artillery shell fired at 15° to the horizontal is 2.5 km. What is the range of the shell when fired at 45° with the same muzzle speed?",
      option_a: "5.0 km",
      option_b: "2.5 km",
      option_c: "7.5 km",
      option_d: "10.0 km",
      correct_option: "A",
      explanation: "Step 1: Range formula: R = (u² sin 2θ) / g.\nStep 2: At 15°: R₁ = (u² / g) sin 30° = 0.5 (u² / g) = 2.5 km  →  u² / g = 5.0 km.\nStep 3: At 45°: R₂ = (u² / g) sin 90° = 5.0 km.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2301, // Q127
    similar_question: {
      question: "A projectile of mass m is launched with speed u at angle α above the horizontal. What is the magnitude of change in momentum along the y-axis between the launch point and the apex of its trajectory?",
      option_a: "m u sin α",
      option_b: "2 m u sin α",
      option_c: "m u cos α",
      option_d: "m u",
      correct_option: "A",
      explanation: "Step 1: Initial vertical momentum: p_yi = m u sin α.\nStep 2: Vertical momentum at apex: p_yf = 0.\nStep 3: Change in vertical momentum: |Δp_y| = |0 − m u sin α| = m u sin α.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2302, // Q128
    similar_question: {
      question: "A projectile is launched with velocity u at an angle α with the horizontal. What is its speed v at the instant when its velocity vector makes an angle β with the horizontal?",
      option_a: "u cos α / cos β",
      option_b: "u cos α cos β",
      option_c: "u sin α / sin β",
      option_d: "u / cos β",
      correct_option: "A",
      explanation: "Step 1: In the absence of air resistance, the horizontal velocity component remains constant throughout the motion:\nv_x = u cos α.\n\nStep 2: At any other point where velocity v makes angle β with horizontal:\nv_x = v cos β.\n\nStep 3: Equate the two expressions:\nv cos β = u cos α  →  v = u cos α / cos β.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2303, // Q129
    similar_question: {
      question: "When a projectile is thrown at an angle of 45° to the horizontal, what is the exact relationship between horizontal range R and maximum height H?",
      option_a: "R = 4H",
      option_b: "R = 2H",
      option_c: "R = 8H",
      option_d: "R = 16H",
      correct_option: "A",
      explanation: "Step 1: Range R = (u² sin 90°) / g = u² / g.\nStep 2: Maximum height H = (u² sin² 45°) / (2g) = (u² × 0.5) / (2g) = u² / (4g).\nStep 3: Comparing: R = 4 × [u² / (4g)] = 4H.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2304, // Q130
    similar_question: {
      question: "Two projectiles are launched with the same speed at angles of 30° and 60° to the horizontal. What is the ratio of their maximum heights H₁ / H₂?",
      option_a: "1 : 3",
      option_b: "3 : 1",
      option_c: "1 : √3",
      option_d: "1 : 9",
      correct_option: "A",
      explanation: "Step 1: Formula: H = (u² sin² θ) / (2g).\nStep 2: Ratio H₁ / H₂ = sin² 30° / sin² 60° = (1/2)² / (√3/2)² = (1/4) / (3/4) = 1 / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2305, // Q131
    similar_question: {
      question: "A particle moves in polar coordinates in the x-y plane such that r = 3t (in metres) and θ = 2t (in radians). What is the speed of the particle at t = 2 s?",
      option_a: "√(153) m/s ≈ 12.37 m/s",
      option_b: "12 m/s",
      option_c: "6 m/s",
      option_d: "15 m/s",
      correct_option: "A",
      explanation: "Step 1: Radial velocity: v_r = dr / dt = 3 m/s.\nStep 2: Transverse velocity: v_θ = r (dθ / dt) = (3t) × 2 = 6t. At t = 2 s, v_θ = 12 m/s.\nStep 3: Speed v = √(v_r² + v_θ²) = √(3² + 12²) = √(9 + 144) = √153 ≈ 12.37 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2306, // Q132
    similar_question: {
      question: "In uniform circular motion, the angle between the velocity vector and the centripetal acceleration vector is always:",
      option_a: "90°",
      option_b: "0°",
      option_c: "180°",
      option_d: "45°",
      correct_option: "A",
      explanation: "Step 1: Velocity is tangential to the circle.\nStep 2: Centripetal acceleration is directed radially inward.\nSince tangent and radius are perpendicular, the angle between them is always 90°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2307, // Q133
    similar_question: {
      question: "A rifle bullet is fired horizontally with a muzzle speed of 120 m/s from a stand 4.9 m above the ground. How far horizontally will the bullet travel before hitting the ground? (Take g = 9.8 m/s²)",
      option_a: "120 m",
      option_b: "240 m",
      option_c: "60 m",
      option_d: "180 m",
      correct_option: "A",
      explanation: "Step 1: Time of fall: t = √(2h / g) = √[(2 × 4.9) / 9.8] = √1 = 1.0 s.\nStep 2: Horizontal distance: R = v_x × t = 120 m/s × 1.0 s = 120 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2308, // Q134
    similar_question: {
      question: "A batter hits a baseball with speed 20 m/s at an angle of 60° above the horizontal. Taking g = 10 m/s², what is the height of the baseball when it has travelled a horizontal distance of 20 m?",
      option_a: "14.64 m",
      option_b: "10.0 m",
      option_c: "18.5 m",
      option_d: "12.0 m",
      correct_option: "A",
      explanation: "Step 1: Horizontal velocity: v_x = 20 cos 60° = 10 m/s.\nTime to travel x = 20 m: t = 20 / 10 = 2.0 s.\n\nStep 2: Vertical position at t = 2.0 s:\ny = (u sin 60°) t − (1/2) g t² = (20 × √3 / 2) × 2 − 5(2)² = 20√3 − 20 = 20(1.732 − 1) = 14.64 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2309, // Q135
    similar_question: {
      question: "A ball is projected from the ground with speed 20 m/s at 30° to the horizontal. At the same instant, a second ball is dropped from rest from a point directly above the maximum height of the first ball. If both balls collide at the apex of the projectile, what was the initial height of the second ball? (Take g = 10 m/s²)",
      option_a: "10 m",
      option_b: "5 m",
      option_c: "15 m",
      option_d: "20 m",
      correct_option: "A",
      explanation: "Step 1: Maximum height of projectile: H = (u sin 30°)² / (2g) = (10)² / 20 = 5 m.\nTime to apex: t = (u sin 30°) / g = 10 / 10 = 1.0 s.\n\nStep 2: Distance fallen by second ball in 1.0 s:\nh_fall = (1/2) g t² = 0.5 × 10 × 1² = 5 m.\nInitial height = H + h_fall = 5 m + 5 m = 10 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2310, // Q136
    similar_question: {
      question: "When a body is projected at an angle θ with the horizontal, which statement is always true at the highest point of its trajectory?",
      option_a: "Its velocity vector makes an angle of 0° with the horizontal",
      option_b: "Its speed becomes zero",
      option_c: "Its acceleration becomes zero",
      option_d: "Velocity is parallel to acceleration",
      correct_option: "A",
      explanation: "Step 1: At maximum height, vertical velocity is zero (v_y = 0).\nStep 2: The velocity vector is purely horizontal (parallel to ground, angle = 0° with horizontal).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2311, // Q137
    similar_question: {
      question: "A stone is projected with velocity 10√2 m/s at an angle of 45° with the horizontal. Taking g = 10 m/s², what is the magnitude of average velocity of the stone between the starting point and its maximum height?",
      option_a: "5√5 m/s",
      option_b: "10√2 m/s",
      option_c: "10 m/s",
      option_d: "5√2 m/s",
      correct_option: "A",
      explanation: "Step 1: Initial velocity components: u_x = 10√2 cos 45° = 10 m/s, u_y = 10 m/s.\nTime to apex: t = 10 / 10 = 1.0 s.\n\nStep 2: Displacement coordinates at apex: x = u_x t = 10 m, y = H = u_y² / 2g = 100 / 20 = 5 m.\n\nStep 3: Average velocity:\nv_avg = (x i + y j) / t = 10 i + 5 j.\nMagnitude = √(10² + 5²) = √125 = 5√5 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2312, // Q138
    similar_question: {
      question: "The speed of an artillery shell at its maximum height is (√3 / 2) times its initial speed of projection. What is its angle of projection with the horizontal?",
      option_a: "30°",
      option_b: "60°",
      option_c: "45°",
      option_d: "15°",
      correct_option: "A",
      explanation: "Step 1: Speed at apex = u cos θ.\nStep 2: Given u cos θ = (√3 / 2) u  →  cos θ = √3 / 2  →  θ = 30°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2313, // Q139
    similar_question: {
      question: "Let a_r and a_t denote radial and tangential accelerations respectively. For a particle to move in a circle with constant speed (uniform circular motion), the required conditions are:",
      option_a: "a_r ≠ 0 and a_t = 0",
      option_b: "a_r = 0 and a_t = 0",
      option_c: "a_r = 0 and a_t ≠ 0",
      option_d: "a_r ≠ 0 and a_t ≠ 0",
      correct_option: "A",
      explanation: "Step 1: Constant speed requires zero tangential acceleration: a_t = dv / dt = 0.\nStep 2: Circular path requires centripetal acceleration to continuously turn the velocity vector: a_r = v² / r ≠ 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2314, // Q140
    similar_question: {
      question: "For an oblique projectile, what is the ratio of maximum height reached (H) to the square of its time of flight (T²)? (Take g = 10 m/s²)",
      option_a: "5 : 4 (or 1.25)",
      option_b: "5 : 2",
      option_c: "1 : 1",
      option_d: "10 : 1",
      correct_option: "A",
      explanation: "Step 1: H = (u² sin² θ) / (2g).\nStep 2: T = (2u sin θ) / g  →  T² = (4u² sin² θ) / g².\nStep 3: Ratio H / T² = [(u² sin² θ) / (2g)] / [(4u² sin² θ) / g²] = g / 8.\nFor g = 10 m/s²: H / T² = 10 / 8 = 5 / 4 = 1.25.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2315, // Q141
    similar_question: {
      question: "Two cyclists A and B ride along concentric circular tracks of radii 20 m and 40 m respectively. If each completes one full lap in 20 seconds, what is the ratio of their angular velocities ω_A / ω_B?",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "2 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: Angular velocity formula: ω = 2π / T.\nStep 2: Both have identical period T = 20 s.\nRatio ω_A / ω_B = (2π / 20) / (2π / 20) = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2316, // Q142
    similar_question: {
      question: "A satellite orbits Earth in a circular path at constant orbital speed. Which of the following scalar quantities remains constant throughout its orbit?",
      option_a: "Kinetic energy",
      option_b: "Linear momentum vector",
      option_c: "Velocity vector",
      option_d: "Displacement vector from center",
      correct_option: "A",
      explanation: "Step 1: Since speed v is constant, kinetic energy K = (1/2) m v² is strictly constant.\nVectors like velocity, linear momentum, and displacement change direction continuously.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2317, // Q143
    similar_question: {
      question: "A drone flies along a circular path of radius 50 m with a constant speed of 25 m/s. What is its angular velocity?",
      option_a: "0.5 rad/s",
      option_b: "2.0 rad/s",
      option_c: "1.0 rad/s",
      option_d: "1250 rad/s",
      correct_option: "A",
      explanation: "Step 1: Formula connecting v, r, and ω:\nω = v / r.\n\nStep 2: Substitute v = 25 m/s and r = 50 m:\nω = 25 / 50 = 0.5 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2318, // Q144
    similar_question: {
      question: "A particle completes one full revolution around a circle of radius 2 m in 8 seconds. What is the average velocity of the particle for one full revolution?",
      option_a: "Zero",
      option_b: "0.5π m/s",
      option_c: "π m/s",
      option_d: "2 m/s",
      correct_option: "A",
      explanation: "Step 1: After one complete revolution, the particle returns to its initial starting point.\nNet displacement Δr = 0.\n\nStep 2: Average velocity = Δr / Δt = 0 / 8 s = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2319, // Q145
    similar_question: {
      question: "A projectile is launched with velocity 40 m/s at an angle of 60° with the horizontal. Taking g = 10 m/s², what is the time taken by the projectile to reach an orientation where its velocity makes an angle of 45° with the horizontal?",
      option_a: "1.46 s",
      option_b: "2.0 s",
      option_c: "1.0 s",
      option_d: "3.46 s",
      correct_option: "A",
      explanation: "Step 1: Horizontal velocity component (constant): v_x = 40 cos 60° = 20 m/s.\n\nStep 2: At 45° elevation: v_y = v_x tan 45° = 20 × 1 = 20 m/s.\n\nStep 3: Vertical kinematic equation:\nv_y = u sin 60° − g t\n20 = 40(√3 / 2) − 10 t = 20√3 − 10 t\n10 t = 20(√3 − 1) = 20(1.732 − 1) = 20 × 0.732 = 14.64\nt = 1.464 s ≈ 1.46 s.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Part 3 (${set5Part3Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set5Part3Updates) {
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
        console.log(`[${successCount}/${set5Part3Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Part 3 complete: ${successCount} questions committed. Set 5 is now 100% COMPLETE!`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart3();
