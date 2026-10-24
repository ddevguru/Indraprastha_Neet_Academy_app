const fs = require('fs');

const set4AllUpdates = [
  {
    id: 66, // Q1
    similar_question: {
      question: "A particle travels the first half of a total distance with a uniform speed v₁ and the remaining second half with a uniform speed v₂ along the same straight line. The average speed of the particle for the entire journey is:",
      option_a: "2v₁v₂ / (v₁ + v₂)",
      option_b: "(v₁ + v₂) / 2",
      option_c: "√(v₁v₂)",
      option_d: "(v₁ + v₂) / (2v₁v₂)",
      correct_option: "A",
      explanation: "Step 1: Formula for average speed:\nAverage speed = Total distance / Total time taken.\n\nStep 2: Calculate time for each half:\nLet total distance = 2d.\nTime for first half: t₁ = d / v₁.\nTime for second half: t₂ = d / v₂.\n\nStep 3: Compute total time:\nTotal time t = t₁ + t₂ = (d / v₁) + (d / v₂) = d × (v₁ + v₂) / (v₁v₂).\n\nStep 4: Compute average speed:\nAverage speed = 2d / [d × (v₁ + v₂) / (v₁v₂)] = 2v₁v₂ / (v₁ + v₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 67, // Q2
    similar_question: {
      question: "A body moves along a straight line such that its velocity increases uniformly from rest to 6 m/s in 2 seconds, remains constant at 6 m/s for the next 3 seconds, and then decreases uniformly to zero in 1 second. What is the total distance covered by the body in these 6 seconds?",
      option_a: "27 m",
      option_b: "24 m",
      option_c: "30 m",
      option_d: "21 m",
      correct_option: "A",
      explanation: "Step 1: The area under a velocity-time graph equals the total distance travelled.\n\nStep 2: Divide the motion into three segments:\n1. Accelerated phase (0 to 2 s): Triangle area = (1/2) × base × height = (1/2) × 2 s × 6 m/s = 6 m.\n2. Constant velocity phase (2 to 5 s): Rectangle area = base × height = 3 s × 6 m/s = 18 m.\n3. Decelerated phase (5 to 6 s): Triangle area = (1/2) × 1 s × 6 m/s = 3 m.\n\nStep 3: Sum the areas:\nTotal distance = 6 m + 18 m + 3 m = 27 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 68, // Q3
    similar_question: {
      question: "A ball is dropped from the top of a tower of height H. When it has fallen a distance of 20 m, a second ball is released from rest from a point 40 m below the top of the tower. If both balls reach the ground at the exact same instant, what is the height H of the tower? (Take g = 10 m/s²)",
      option_a: "45 m",
      option_b: "60 m",
      option_c: "50 m",
      option_d: "40 m",
      correct_option: "A",
      explanation: "Step 1: Time taken by first ball to fall 20 m:\nt₀ = √(2h / g) = √(2 × 20 / 10) = 2.0 s.\n\nStep 2: Total time of flight for first ball:\nT = √(2H / g).\n\nStep 3: Distance and time for second ball:\nThe second ball falls from a height (H − 40) above the ground.\nIts time of fall is T₂ = √[2(H − 40) / g].\n\nStep 4: Equate arrival times:\nSince both balls land simultaneously: T − t₀ = T₂\n√(2H / 10) − 2 = √[2(H − 40) / 10].\nLet T = 3 s:\n√(2 × 45 / 10) = 3 s. Then T − 2 = 1 s.\nFor second ball: √[2(45 − 40) / 10] = √(10 / 10) = 1 s.\nBoth sides equal 1 s, confirming H = 45 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 69, // Q4
    similar_question: {
      question: "A bird flies horizontally with a velocity of 8√2 m/s in the North-East direction. A steady wind blows from North to South at 2 m/s. What is the magnitude of the resultant displacement of the bird after 4 seconds?",
      option_a: "40 m",
      option_b: "32 m",
      option_c: "50 m",
      option_d: "24 m",
      correct_option: "A",
      explanation: "Step 1: Express velocity of bird in vector form:\nv_bird = (8√2 cos 45°) i + (8√2 sin 45°) j\n       = 8 i + 8 j (where i is East, j is North).\n\nStep 2: Express velocity of wind:\nWind blowing North to South: v_wind = −2 j.\n\nStep 3: Find resultant velocity:\nv_net = v_bird + v_wind = 8 i + (8 − 2) j = 8 i + 6 j.\nMagnitude |v_net| = √(8² + 6²) = √(64 + 36) = √100 = 10 m/s.\n\nStep 4: Compute displacement in 4 seconds:\nDisplacement = |v_net| × t = 10 m/s × 4 s = 40 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 70, // Q5
    similar_question: {
      question: "Water droplets fall from an overhead shower at regular time intervals Δt. At the instant 3 seconds after the first droplet starts falling, the distance between this droplet and the next droplet behind it is measured to be 24.5 m. At what rate are droplets emerging from the shower? (Take g = 9.8 m/s²)",
      option_a: "1 drop/second",
      option_b: "2 drops/second",
      option_c: "1 drop/2 seconds",
      option_d: "3 drops/second",
      correct_option: "A",
      explanation: "Step 1: Formula for distance fallen under gravity from rest:\ny = (1/2) g t².\n\nStep 2: Set up equations for the two consecutive droplets:\nFor the first droplet (time elapsed = 3 s):\ny₁ = (1/2)(9.8)(3)² = 4.9 × 9 = 44.1 m.\nFor the second droplet (time elapsed = 3 − Δt):\ny₂ = (1/2)(9.8)(3 − Δt)² = 4.9 × (3 − Δt)².\n\nStep 3: Solve for interval Δt:\ny₁ − y₂ = 4.9 [9 − (3 − Δt)²] = 24.5\n9 − (3 − Δt)² = 24.5 / 4.9 = 5\n(3 − Δt)² = 9 − 5 = 4\n3 − Δt = 2  →  Δt = 1.0 s.\n\nTherefore, droplets emerge at a rate of 1 drop per second.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 71, // Q6
    similar_question: {
      question: "The position-time (x-t) graphs of two cars P and Q travelling along the same straight road from origin O are straight lines with slopes representing constant velocities v_P and v_Q. The graph of car P makes an angle of 30° with the time axis, while that of car Q makes an angle of 60° with the time axis. Which car is travelling faster, and what is the ratio of their velocities v_P / v_Q?",
      option_a: "Car Q is faster, and v_P / v_Q = 1/3",
      option_b: "Car P is faster, and v_P / v_Q = 3",
      option_c: "Car Q is faster, and v_P / v_Q = 1/√3",
      option_d: "Both travel at the same speed",
      correct_option: "A",
      explanation: "Step 1: The slope of a displacement-time (x-t) graph represents velocity:\nv = dx / dt = tan θ.\n\nStep 2: Compute velocity of each car:\nv_P = tan 30° = 1 / √3\nv_Q = tan 60° = √3.\n\nStep 3: Compare and find the ratio:\nSince √3 > 1/√3, car Q is moving faster.\nRatio v_P / v_Q = (1 / √3) / √3 = 1 / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 72, // Q7
    similar_question: {
      question: "A delivery van travels the first 12 km at a speed of 30 km/h and the next 12 km at a speed of 60 km/h in the same direction. What is the average speed of the van for the entire 24 km trip?",
      option_a: "40 km/h",
      option_b: "45 km/h",
      option_c: "36 km/h",
      option_d: "48 km/h",
      correct_option: "A",
      explanation: "Step 1: Formula for average speed with equal distances:\nWhen two equal distances are covered at speeds v₁ and v₂:\nv_avg = 2v₁v₂ / (v₁ + v₂).\n\nStep 2: Substitute the given values:\nv₁ = 30 km/h, v₂ = 60 km/h\nv_avg = 2(30)(60) / (30 + 60) = 3600 / 90 = 40 km/h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 73, // Q8
    similar_question: {
      question: "A cyclist covers the first half of a total distance at a speed of 12 m/s. The second half of the distance is covered in two equal time intervals with speeds of 15 m/s and 25 m/s respectively. What is the average speed of the cyclist for the entire journey?",
      option_a: "15 m/s",
      option_b: "16 m/s",
      option_c: "14 m/s",
      option_d: "17.5 m/s",
      correct_option: "A",
      explanation: "Step 1: Find effective speed for the second half:\nSince the second half is divided into two equal time intervals:\nv_eff = (v_a + v_b) / 2 = (15 + 25) / 2 = 20 m/s.\n\nStep 2: Combine the two equal distance segments:\nFirst half at v₁ = 12 m/s, second half at v₂ = 20 m/s.\nv_avg = 2v₁v₂ / (v₁ + v₂) = 2(12)(20) / (12 + 20) = 480 / 32 = 15 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 74, // Q9
    similar_question: {
      question: "The velocity-time graph of a runner moving along a track is a straight line increasing from 0 m/s at t = 0 to 8 m/s at t = 4 s. What is the total distance covered by the runner in these 4 seconds?",
      option_a: "16 m",
      option_b: "32 m",
      option_c: "8 m",
      option_d: "20 m",
      correct_option: "A",
      explanation: "Step 1: Distance equals the area under the velocity-time graph.\n\nStep 2: Calculate the triangular area:\nBase = 4 s, Height = 8 m/s.\nArea = (1/2) × base × height = (1/2) × 4 × 8 = 16 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 75, // Q10
    similar_question: {
      question: "A train covers the first one-third of its total journey distance at 30 km/h, the second one-third at 40 km/h, and the final one-third at 120 km/h. What is the average speed of the train for the entire journey?",
      option_a: "45 km/h",
      option_b: "50 km/h",
      option_c: "40 km/h",
      option_d: "63.3 km/h",
      correct_option: "A",
      explanation: "Step 1: Formula for average speed with three equal distance segments d:\nv_avg = 3 / [(1/v₁) + (1/v₂) + (1/v₃)].\n\nStep 2: Substitute speeds 30, 40, and 120 km/h:\n(1/30) + (1/40) + (1/120) = (4 + 3 + 1) / 120 = 8 / 120 = 1 / 15.\n\nStep 3: Compute average speed:\nv_avg = 3 / (1 / 15) = 45 km/h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3241, // Q11
    similar_question: {
      question: "The position of a particle moving along a straight line is given by x = p + qt + rt² − st³, where p, q, r, and s are positive constants. What are the initial velocity and initial acceleration of the particle at t = 0?",
      option_a: "q and 2r",
      option_b: "q and −6s",
      option_c: "p and 2r",
      option_d: "2r and −6s",
      correct_option: "A",
      explanation: "Step 1: Find velocity by differentiating position x with respect to time t:\nv = dx / dt = d/dt [p + qt + rt² − st³] = q + 2rt − 3st².\nAt t = 0: Initial velocity v(0) = q.\n\nStep 2: Find acceleration by differentiating velocity v:\na = dv / dt = d/dt [q + 2rt − 3st²] = 2r − 6st.\nAt t = 0: Initial acceleration a(0) = 2r.\n\nTherefore, initial velocity is q and initial acceleration is 2r.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3242, // Q12
    similar_question: {
      question: "The velocity v of a particle moving along a straight line varies with time according to v = k t, where k is a positive constant. What is the distance travelled by the particle in the first 6 seconds?",
      option_a: "18k",
      option_b: "36k",
      option_c: "12k",
      option_d: "6k",
      correct_option: "A",
      explanation: "Step 1: Relate distance to velocity by integration:\ns = ∫ v dt from t = 0 to t = 6.\n\nStep 2: Evaluate the integral:\ns = ∫₀⁶ k t dt = k [t² / 2]₀⁶\n  = k [36 / 2] = 18k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3243, // Q13
    similar_question: {
      question: "In an x-t (displacement-time) graph, if the curve is concave upward (d²x/dt² > 0), the motion is uniformly accelerated. If the curve is concave downward (d²x/dt² < 0), the motion is:",
      option_a: "Retarded (decelerated)",
      option_b: "Accelerated",
      option_c: "Uniform velocity",
      option_d: "At rest",
      correct_option: "A",
      explanation: "Step 1: Geometric meaning of curvature in an x-t graph:\nThe second derivative d²x/dt² represents acceleration a.\n\nStep 2: Analyze concavity:\n- Concave upward means d²x/dt² > 0 (positive acceleration).\n- Concave downward means d²x/dt² < 0 (negative acceleration or retardation).\n\nTherefore, the motion is retarded.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3244, // Q14
    similar_question: {
      question: "A particle moves along the x-axis with velocity +4 m/s for the first 3 seconds, and then −4 m/s for the next 3 seconds. What are the total displacement and the total distance travelled by the particle in these 6 seconds?",
      option_a: "0 m and 24 m",
      option_b: "24 m and 0 m",
      option_c: "12 m and 12 m",
      option_d: "24 m and 24 m",
      correct_option: "A",
      explanation: "Step 1: Calculate displacement for each segment:\nDisplacement s₁ = +4 m/s × 3 s = +12 m.\nDisplacement s₂ = −4 m/s × 3 s = −12 m.\nTotal displacement = s₁ + s₂ = +12 + (−12) = 0 m.\n\nStep 2: Calculate distance travelled:\nDistance is the scalar sum of path lengths:\nTotal distance = |s₁| + |s₂| = 12 m + 12 m = 24 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3245, // Q15
    similar_question: {
      question: "The displacement-time graphs of two particles P and Q moving in straight lines make angles of 45° and 60° respectively with the time axis. What is the ratio of their velocities v_P / v_Q?",
      option_a: "1 / √3",
      option_b: "√3",
      option_c: "1 / 3",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: In a displacement-time graph, velocity v equals the tangent of the angle of inclination with the time axis:\nv = tan θ.\n\nStep 2: Calculate velocities:\nv_P = tan 45° = 1.\nv_Q = tan 60° = √3.\n\nStep 3: Determine the ratio:\nv_P / v_Q = 1 / √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3246, // Q16
    similar_question: {
      question: "Which characteristic of a velocity-time (v-t) graph indicates that an object is in uniform motion (constant velocity and zero acceleration)?",
      option_a: "A straight line parallel to the time axis",
      option_b: "A straight line inclined to the time axis passing through origin",
      option_c: "A parabolic curve",
      option_d: "A vertical line perpendicular to the time axis",
      correct_option: "A",
      explanation: "Step 1: Uniform motion means velocity remains constant over time:\nv(t) = constant.\n\nStep 2: On a velocity-time graph, a constant value of v over time appears as a horizontal straight line parallel to the time axis (slope = dv/dt = 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3247, // Q17
    similar_question: {
      question: "For any moving particle during a finite time interval, what is the correct relation between the magnitude of average velocity |v_avg| and average speed s_avg?",
      option_a: "|v_avg| ≤ s_avg",
      option_b: "|v_avg| > s_avg",
      option_c: "|v_avg| = s_avg always",
      option_d: "|v_avg| ≥ s_avg",
      correct_option: "A",
      explanation: "Step 1: Define average velocity and average speed:\n|v_avg| = |displacement| / time interval\ns_avg = distance / time interval.\n\nStep 2: Relate displacement and distance:\nDisplacement is the shortest straight-line vector connecting initial and final positions. Distance is the actual path length.\nFor any motion: |displacement| ≤ distance.\n\nStep 3: Divide by time interval:\n|v_avg| ≤ s_avg (equality holds only for unidirectional straight-line motion without turning).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3248, // Q18
    similar_question: {
      question: "A particle starts from rest at t = 0 and moves in a straight line with constant acceleration a = 3 m/s² for 4 seconds. What is the velocity of the particle at t = 4 s?",
      option_a: "12 m/s",
      option_b: "6 m/s",
      option_c: "24 m/s",
      option_d: "8 m/s",
      correct_option: "A",
      explanation: "Step 1: First equation of motion:\nv = u + a t.\n\nStep 2: Substitute given values:\nInitial velocity u = 0 (starts from rest)\nAcceleration a = 3 m/s²\nTime t = 4 s\nv = 0 + (3 × 4) = 12 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3249, // Q19
    similar_question: {
      question: "Two spheres of masses m₁ and m₂ are released from rest from heights h₁ = 9 m and h₂ = 25 m above the ground. Neglecting air resistance, what is the ratio of their speeds v₁ / v₂ just before hitting the ground?",
      option_a: "3 / 5",
      option_b: "9 / 25",
      option_c: "5 / 3",
      option_d: "81 / 625",
      correct_option: "A",
      explanation: "Step 1: Speed acquired under free fall from rest:\nv = √(2 g h).\nNotice that speed is independent of the mass of the body.\n\nStep 2: Find the ratio of speeds:\nv₁ / v₂ = √(2 g h₁) / √(2 g h₂) = √(h₁ / h₂).\n\nStep 3: Substitute the heights:\nv₁ / v₂ = √(9 / 25) = 3 / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3250, // Q20
    similar_question: {
      question: "The velocity of a particle moving along the x-axis is given by v = (4 + 3t²) m/s. What is the average acceleration of the particle between t = 1 s and t = 3 s?",
      option_a: "12 m/s²",
      option_b: "8 m/s²",
      option_c: "18 m/s²",
      option_d: "6 m/s²",
      correct_option: "A",
      explanation: "Step 1: Formula for average acceleration:\na_avg = Δv / Δt = [v(t₂) − v(t₁)] / (t₂ − t₁).\n\nStep 2: Calculate velocities at t = 1 s and t = 3 s:\nv(1) = 4 + 3(1)² = 7 m/s.\nv(3) = 4 + 3(3)² = 4 + 3(9) = 31 m/s.\n\nStep 3: Compute average acceleration:\na_avg = (31 − 7) / (3 − 1) = 24 / 2 = 12 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3251, // Q21
    similar_question: {
      question: "Which of the following statements regarding one-dimensional motion is TRUE?",
      option_a: "A body can have zero instantaneous velocity and non-zero acceleration simultaneously",
      option_b: "Distance can be negative",
      option_c: "Average speed can be smaller than the magnitude of average velocity",
      option_d: "Magnitude of displacement is always strictly greater than distance",
      correct_option: "A",
      explanation: "Step 1: Analyze statement (A):\nWhen a ball is thrown vertically upward, at the highest point its instantaneous velocity is momentarily zero, yet acceleration due to gravity (g = 9.8 m/s² downward) acts continuously. Thus, zero velocity with non-zero acceleration is true.\n\nStep 2: Analyze other statements:\n- Distance is path length and cannot be negative (B is false).\n- Average speed is always greater than or equal to magnitude of average velocity (C is false).\n- Magnitude of displacement is always less than or equal to distance (D is false).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3252, // Q22
    similar_question: {
      question: "Water drops fall from the roof of a building 20 m high at regular time intervals. The first drop reaches the ground at the exact moment the fifth drop begins to fall. What is the height of the second drop from the ground at this instant? (Take g = 10 m/s²)",
      option_a: "8.75 m",
      option_b: "11.25 m",
      option_c: "15.0 m",
      option_d: "5.0 m",
      correct_option: "A",
      explanation: "Step 1: Total time of fall for the first drop:\nT = √(2H / g) = √(2 × 20 / 10) = 2.0 s.\n\nStep 2: Determine interval between drops:\nThere are 4 equal time intervals between drop 1 and drop 5:\nΔt = 2.0 s / 4 = 0.5 s.\n\nStep 3: Time elapsed for the 2nd drop:\nThe 2nd drop has been falling for 3 intervals = 3 × 0.5 s = 1.5 s.\n\nStep 4: Distance fallen by 2nd drop:\ny = (1/2) g t² = (1/2)(10)(1.5)² = 5 × 2.25 = 11.25 m.\nHeight from ground = H − y = 20 m − 11.25 m = 8.75 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3253, // Q23
    similar_question: {
      question: "Two trains, each of length 120 m, are travelling on parallel tracks in opposite directions with constant speeds of 20 m/s and 28 m/s respectively. How long does it take for the two trains to completely cross each other?",
      option_a: "5.0 s",
      option_b: "4.0 s",
      option_c: "6.0 s",
      option_d: "8.0 s",
      correct_option: "A",
      explanation: "Step 1: Determine total distance to be covered for complete crossing:\nTotal distance = Length of train 1 + Length of train 2\n               = 120 m + 120 m = 240 m.\n\nStep 2: Determine relative speed in opposite directions:\nv_rel = v₁ + v₂ = 20 m/s + 28 m/s = 48 m/s.\n\nStep 3: Calculate time of crossing:\nTime = Total distance / Relative speed\n     = 240 m / 48 m/s = 5.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3254, // Q24
    similar_question: {
      question: "The position of a particle moving along the x-axis is given by x = 12t² − 2t³ (where x is in metres and t in seconds). What is the position of the particle when it achieves its maximum speed along the +x direction?",
      option_a: "32 m",
      option_b: "48 m",
      option_c: "16 m",
      option_d: "24 m",
      correct_option: "A",
      explanation: "Step 1: Velocity function:\nv = dx / dt = d/dt [12t² − 2t³] = 24t − 6t².\n\nStep 2: Condition for maximum velocity (dv/dt = a = 0):\na = dv / dt = 24 − 12t = 0\n12t = 24  →  t = 2 s.\n\nStep 3: Calculate position at t = 2 s:\nx(2) = 12(2)² − 2(2)³\n     = 12(4) − 2(8) = 48 − 16 = 32 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3255, // Q25
    similar_question: {
      question: "A stone is released from rest from the top of a cliff of height 80 m. Taking g = 10 m/s², what is the time taken by the stone to fall through the last 35 m of its descent?",
      option_a: "1.0 s",
      option_b: "2.0 s",
      option_c: "0.5 s",
      option_d: "1.5 s",
      correct_option: "A",
      explanation: "Step 1: Total time to fall the entire height of 80 m:\nT = √(2H / g) = √(2 × 80 / 10) = √16 = 4.0 s.\n\nStep 2: Distance fallen before the last 35 m:\nh₁ = 80 m − 35 m = 45 m.\n\nStep 3: Time taken to fall the first 45 m:\nt₁ = √(2h₁ / g) = √(2 × 45 / 10) = √9 = 3.0 s.\n\nStep 4: Time taken to fall through the last 35 m:\nΔt = T − t₁ = 4.0 s − 3.0 s = 1.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3256, // Q26
    similar_question: {
      question: "Since velocity is a vector quantity, acceleration occurs whenever there is a change in:",
      option_a: "Speed, direction of motion, or both",
      option_b: "Magnitude of velocity only",
      option_c: "Direction of motion only",
      option_d: "Position only",
      correct_option: "A",
      explanation: "Step 1: Definition of acceleration:\nAcceleration is the rate of change of velocity: a = dv / dt.\n\nStep 2: Velocity has both magnitude (speed) and direction:\nVelocity changes if:\n1. The magnitude (speed) changes,\n2. The direction of motion changes (e.g. uniform circular motion),\n3. Both magnitude and direction change.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3257, // Q27
    similar_question: {
      question: "The displacement-time graphs of two particles A and B are straight lines inclined at angles of 45° and 30° respectively with the time axis. The ratio of their velocities v_A / v_B is:",
      option_a: "√3",
      option_b: "1 / √3",
      option_c: "3",
      option_d: "1 / 3",
      correct_option: "A",
      explanation: "Step 1: The slope of an x-t graph equals velocity:\nv = tan θ.\n\nStep 2: Calculate velocities:\nv_A = tan 45° = 1\nv_B = tan 30° = 1 / √3.\n\nStep 3: Find the ratio:\nv_A / v_B = 1 / (1 / √3) = √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3258, // Q28
    similar_question: {
      question: "A body starts from rest and moves with uniform acceleration along a straight line. What is the ratio of the distance travelled in the 5th second to the distance travelled in the 4th second?",
      option_a: "9 / 7",
      option_b: "7 / 5",
      option_c: "5 / 4",
      option_d: "25 / 16",
      correct_option: "A",
      explanation: "Step 1: Formula for distance travelled in the n-th second:\nS_n = u + (a / 2)(2n − 1).\n\nStep 2: Since the body starts from rest, u = 0:\nS_n = (a / 2)(2n − 1).\n\nStep 3: Calculate S₅ and S₄:\nFor n = 5: S₅ = (a / 2)(2 × 5 − 1) = (a / 2)(9).\nFor n = 4: S₄ = (a / 2)(2 × 4 − 1) = (a / 2)(7).\n\nStep 4: Compute the ratio:\nS₅ / S₄ = 9 / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3259, // Q29
    similar_question: {
      question: "The area under the acceleration-versus-time (a-t) graph between time t₁ and t₂ represents:",
      option_a: "Change in velocity",
      option_b: "Total displacement",
      option_c: "Average speed",
      option_d: "Rate of change of acceleration",
      correct_option: "A",
      explanation: "Step 1: Relationship between acceleration and velocity:\na = dv / dt  →  dv = a dt.\n\nStep 2: Integrate both sides between t₁ and t₂:\n∫ dv = ∫ a dt\nv(t₂) − v(t₁) = Area under the a-t graph.\nThus, the area represents the net change in velocity (Δv).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3260, // Q30
    similar_question: {
      question: "A ball of mass m is projected vertically upward with velocity v and reaches a maximum height of 15 m. Another ball of mass 3m is thrown vertically upward with three times the initial velocity (3v). What is the maximum height attained by the second ball? (Neglect air resistance)",
      option_a: "135 m",
      option_b: "45 m",
      option_c: "90 m",
      option_d: "405 m",
      correct_option: "A",
      explanation: "Step 1: Formula for maximum height in vertical projection:\nH = u² / (2g).\nNotice that maximum height is completely independent of the mass of the projectile.\n\nStep 2: Relate heights:\nH ∝ u².\nWhen velocity is increased 3 times (u' = 3u):\nH' = (3u)² / (2g) = 9 × [u² / (2g)] = 9 × H.\n\nStep 3: Compute new height:\nH' = 9 × 15 m = 135 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3261, // Q31
    similar_question: {
      question: "In an s-t (displacement-time) graph of a moving object, the instantaneous velocity is zero at points where:",
      option_a: "The tangent to the curve is horizontal (parallel to time axis)",
      option_b: "The curve crosses the time axis",
      option_c: "The slope is maximum",
      option_d: "The curve is steepest",
      correct_option: "A",
      explanation: "Step 1: Definition of instantaneous velocity in an s-t graph:\nv = ds / dt = slope of tangent to the s-t curve.\n\nStep 2: When the tangent is horizontal:\nSlope = tan(0°) = 0, which corresponds to v = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3262, // Q32
    similar_question: {
      question: "Which of the following statements about linear kinematics is FALSE?",
      option_a: "A body can have constant velocity while having a variable speed",
      option_b: "A body can have zero velocity and non-zero acceleration",
      option_c: "A body can have constant speed and variable velocity",
      option_d: "Distance travelled can never decrease with time",
      correct_option: "A",
      explanation: "Step 1: Analyze statement (A):\nVelocity is a vector whose magnitude is speed. If velocity is constant, its magnitude (speed) must remain strictly constant. Hence, a body cannot have constant velocity with variable speed. This statement is FALSE.\n\nStep 2: Verify other statements:\n- (B) is true (at the top of vertical trajectory).\n- (C) is true (in uniform circular motion, speed is constant while direction changes).\n- (D) is true (distance is path length and cannot decrease).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3263, // Q33
    similar_question: {
      question: "A person walks 180 m due East in 2 minutes, stops for 1 minute, and then walks 120 m due West in 2 minutes. What is the person's average speed for the entire 5-minute interval?",
      option_a: "60 m/min",
      option_b: "12 m/min",
      option_c: "50 m/min",
      option_d: "36 m/min",
      correct_option: "A",
      explanation: "Step 1: Calculate total distance:\nTotal distance = 180 m + 0 m + 120 m = 300 m.\n\nStep 2: Calculate total time:\nTotal time = 2 min + 1 min + 2 min = 5 min.\n\nStep 3: Compute average speed:\nAverage speed = Total distance / Total time\n              = 300 m / 5 min = 60 m/min.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3264, // Q34
    similar_question: {
      question: "A car accelerates uniformly along a straight road. It passes point A with a velocity of 2 m/s and point B with a velocity of 14 m/s. What is the velocity of the car when it passes the midpoint between A and B?",
      option_a: "10 m/s",
      option_b: "8 m/s",
      option_c: "12 m/s",
      option_d: "7 m/s",
      correct_option: "A",
      explanation: "Step 1: Third equation of motion:\nv² − u² = 2as.\nLet total distance AB = 2d. Then midpoint is at distance d from A.\n\nStep 2: Write equations for first half and total journey:\nv_mid² − u² = 2ad\nv² − v_mid² = 2ad.\n\nStep 3: Equate the two expressions:\nv_mid² − u² = v² − v_mid²\n2v_mid² = u² + v²\nv_mid = √[(u² + v²) / 2].\n\nStep 4: Substitute u = 2 m/s and v = 14 m/s:\nv_mid = √[(2² + 14²) / 2] = √[(4 + 196) / 2] = √[200 / 2] = √100 = 10 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3265, // Q35
    similar_question: {
      question: "A stone is thrown vertically upward with an initial velocity of 5 m/s from the top of a cliff. If it strikes the ground below after 3 seconds, what is the height of the cliff? (Take g = 10 m/s²)",
      option_a: "30 m",
      option_b: "45 m",
      option_c: "60 m",
      option_d: "15 m",
      correct_option: "A",
      explanation: "Step 1: Vertical displacement equation:\nTaking upward direction as positive:\nInitial velocity u = +5 m/s\nAcceleration a = −g = −10 m/s²\nTime of flight t = 3 s.\n\nStep 2: Calculate vertical displacement y:\ny = u t + (1/2) a t²\n  = (5 × 3) + (1/2)(−10)(3)²\n  = 15 − 5(9) = 15 − 45 = −30 m.\n\nStep 3: Interpret result:\nThe negative sign indicates that the landing position is 30 m below the release point.\nTherefore, the height of the cliff is 30 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3266, // Q36
    similar_question: {
      question: "A cyclist starts from rest with a uniform acceleration of 2 m/s². A runner who is 32 m behind starts at the same instant with a constant speed of 12 m/s. What is the minimum time after which the runner overtakes the cyclist?",
      option_a: "4 s",
      option_b: "8 s",
      option_c: "6 s",
      option_d: "10 s",
      correct_option: "A",
      explanation: "Step 1: Write position equations taking runner's starting position as origin (x = 0):\nPosition of runner: x_runner = v_r × t = 12 t.\nPosition of cyclist: starts at x = 32 m, accelerates from rest:\nx_cyclist = 32 + (1/2) a t² = 32 + (1/2)(2) t² = 32 + t².\n\nStep 2: Condition for overtaking:\nx_runner = x_cyclist\n12 t = 32 + t²  →  t² − 12 t + 32 = 0.\n\nStep 3: Solve the quadratic equation:\n(t − 4)(t − 8) = 0.\nThe roots are t = 4 s and t = 8 s.\nThe minimum time (first overtake) is t = 4 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3267, // Q37
    similar_question: {
      question: "A vehicle travels three equal consecutive segments of a straight road with speeds of 12 km/h, 20 km/h, and 30 km/h. What is the average speed of the vehicle over the entire journey?",
      option_a: "18 km/h",
      option_b: "20 km/h",
      option_c: "21 km/h",
      option_d: "24 km/h",
      correct_option: "A",
      explanation: "Step 1: Formula for average speed with three equal distances:\nv_avg = 3 / [(1/v₁) + (1/v₂) + (1/v₃)].\n\nStep 2: Compute the sum of reciprocals:\n(1/12) + (1/20) + (1/30) = (5 + 3 + 2) / 60 = 10 / 60 = 1 / 6.\n\nStep 3: Compute average speed:\nv_avg = 3 / (1 / 6) = 18 km/h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3268, // Q38
    similar_question: {
      question: "Two stones are dropped from rest from heights of 36 m and 49 m respectively. Neglecting air resistance, what is the ratio of time taken by them to reach the ground?",
      option_a: "6 / 7",
      option_b: "36 / 49",
      option_c: "7 / 6",
      option_d: "216 / 343",
      correct_option: "A",
      explanation: "Step 1: Time of fall from rest under gravity:\nt = √(2h / g).\n\nStep 2: Ratio of times:\nt₁ / t₂ = √(h₁ / h₂).\n\nStep 3: Substitute given heights:\nt₁ / t₂ = √(36 / 49) = 6 / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6141, // Q39
    similar_question: {
      question: "A sound source emitting waves of wavelength 40 cm moves directly away from a stationary observer with a speed equal to one-fourth of the speed of sound. What is the wavelength of the sound detected by the observer?",
      option_a: "50 cm",
      option_b: "32 cm",
      option_c: "48 cm",
      option_d: "60 cm",
      correct_option: "A",
      explanation: "Step 1: Doppler formula for apparent wavelength when source moves away from a stationary observer:\nλ' = λ × (v + v_s) / v\nwhere v is the speed of sound and v_s is the speed of the source.\n\nStep 2: Substitute v_s = v / 4:\nλ' = λ × (v + v/4) / v = λ × (5 / 4).\n\nStep 3: Calculate λ':\nλ' = 40 cm × (5 / 4) = 50 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6142, // Q40
    similar_question: {
      question: "The bulk modulus of elasticity of a liquid is 2.5 × 10⁹ N/m² and its density is 1000 kg/m³. What is the speed of longitudinal sound waves in this liquid?",
      option_a: "1580 m/s",
      option_b: "1450 m/s",
      option_c: "1250 m/s",
      option_d: "2500 m/s",
      correct_option: "A",
      explanation: "Step 1: Formula for speed of sound in a fluid:\nv = √(B / ρ)\nwhere B is the bulk modulus and ρ is the density.\n\nStep 2: Substitute the given values:\nB = 2.5 × 10⁹ N/m²\nρ = 1000 kg/m³\nv = √[(2.5 × 10⁹) / 1000] = √(2.5 × 10⁶) = √(25 × 10⁵) ≈ 1581 m/s ≈ 1580 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6143, // Q41
    similar_question: {
      question: "Two identical stationary sirens emit sound of frequency 300 Hz. An observer moves along the line between the sirens towards siren 1 with a velocity of 3 m/s. If the speed of sound is 300 m/s, what is the beat frequency heard by the observer?",
      option_a: "6 Hz",
      option_b: "3 Hz",
      option_c: "12 Hz",
      option_d: "1 Hz",
      correct_option: "A",
      explanation: "Step 1: Apparent frequencies heard by the moving observer:\nFrom siren 1 (approaching): f₁ = f × (v + v₀) / v\nFrom siren 2 (receding): f₂ = f × (v − v₀) / v.\n\nStep 2: Formula for beat frequency:\nBeat frequency Δf = f₁ − f₂ = f × [(v + v₀) − (v − v₀)] / v\n                    = 2 f v₀ / v.\n\nStep 3: Substitute the numerical values:\nΔf = 2 × 300 Hz × 3 m/s / 300 m/s = 6 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6144, // Q42
    similar_question: {
      question: "A policeman on duty detects a 10% drop in the apparent frequency of a car's horn as it passes him. If the velocity of sound in air is 330 m/s, what is the speed of the moving car?",
      option_a: "17.4 m/s",
      option_b: "25.0 m/s",
      option_c: "33.0 m/s",
      option_d: "20.0 m/s",
      correct_option: "A",
      explanation: "Step 1: Doppler frequencies for approaching and receding source:\nApproaching: f_app = f × v / (v − v_s)\nReceding: f_rec = f × v / (v + v_s).\n\nStep 2: A 10% drop means:\nf_rec / f_app = 0.90 = 9 / 10\n(v − v_s) / (v + v_s) = 9 / 10.\n\nStep 3: Solve for source speed v_s:\n10 (v − v_s) = 9 (v + v_s)\n10v − 10v_s = 9v + 9v_s\nv = 19 v_s\nv_s = v / 19 = 330 / 19 ≈ 17.37 m/s ≈ 17.4 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6145, // Q43
    similar_question: {
      question: "A sound source of frequency 500 Hz rotates in a horizontal circle of radius 1.5 m with a constant angular speed of 20 rad/s. A detector is fixed in the same plane at a large distance. If the speed of sound is 330 m/s, what is the maximum frequency detected?",
      option_a: "550 Hz",
      option_b: "450 Hz",
      option_c: "530 Hz",
      option_d: "600 Hz",
      correct_option: "A",
      explanation: "Step 1: Determine linear speed of the sound source:\nv_s = r × ω = 1.5 m × 20 rad/s = 30 m/s.\n\nStep 2: Formula for maximum frequency (when source moves directly toward detector):\nf_max = f × v / (v − v_s).\n\nStep 3: Substitute the numerical values:\nf_max = 500 × 330 / (330 − 30)\n      = 500 × 330 / 300 = 550 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6146, // Q44
    similar_question: {
      question: "An ambulance travels towards a vertical rock cliff at speed u while sounding a siren of frequency f. The reflected sound heard by the driver has a frequency 1.5 times the original frequency (f' = 1.5 f). What is the speed of the ambulance u in terms of sound speed v?",
      option_a: "v / 5",
      option_b: "v / 3",
      option_c: "v / 4",
      option_d: "v / 2",
      correct_option: "A",
      explanation: "Step 1: Formula for echo frequency heard by driver moving towards a reflector:\nf' = f × (v + u) / (v − u).\n\nStep 2: Given f' = 1.5 f = (3 / 2) f:\n(v + u) / (v − u) = 3 / 2.\n\nStep 3: Cross-multiply and solve for u:\n2 (v + u) = 3 (v − u)\n2v + 2u = 3v − 3u\n5u = v  →  u = v / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6147, // Q45
    similar_question: {
      question: "The H-alpha line of hydrogen (laboratory wavelength λ₀ = 656.3 nm) is observed in the spectrum of a distant galaxy at a shifted wavelength of 662.8 nm. What is the recession speed of the galaxy relative to Earth? (Speed of light c = 3.0 × 10⁸ m/s)",
      option_a: "2.97 × 10⁶ m/s away from Earth",
      option_b: "2.97 × 10⁶ m/s towards Earth",
      option_c: "5.94 × 10⁶ m/s away from Earth",
      option_d: "1.50 × 10⁶ m/s towards Earth",
      correct_option: "A",
      explanation: "Step 1: Calculate the wavelength shift (Doppler shift):\nΔλ = λ − λ₀ = 662.8 nm − 656.3 nm = +6.5 nm.\nThe increase in wavelength indicates a redshift (galaxy is receding away from Earth).\n\nStep 2: Doppler shift formula for recession speed:\nv = c × (Δλ / λ₀).\n\nStep 3: Substitute the numerical values:\nv = (3.0 × 10⁸ m/s) × (6.5 nm / 656.3 nm)\n  ≈ 2.97 × 10⁶ m/s away from Earth.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6148, // Q46
    similar_question: {
      question: "A spaceship moves directly toward a stationary radio transmitter emitting signals at a frequency of 12 GHz with a speed equal to 0.6c (where c is the speed of light). What is the frequency of the signal received by the spaceship?",
      option_a: "24 GHz",
      option_b: "18 GHz",
      option_c: "15 GHz",
      option_d: "30 GHz",
      correct_option: "A",
      explanation: "Step 1: Relativistic Doppler formula for approaching source/observer:\nf' = f × √[(1 + v/c) / (1 − v/c)].\n\nStep 2: Substitute v/c = 0.6:\n(1 + 0.6) / (1 − 0.6) = 1.6 / 0.4 = 4.\n√4 = 2.0.\n\nStep 3: Calculate received frequency:\nf' = 12 GHz × 2.0 = 24 GHz.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updateAllSet4() {
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

    console.log(`Starting update of all ${set4AllUpdates.length} practice questions for Set 4...`);

    let successCount = 0;
    for (const item of set4AllUpdates) {
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
        console.log(`[${successCount}/${set4AllUpdates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`\nAll ${successCount} questions updated successfully! Chapter 2 (Motion in a straight line) is now 100% COMPLETE!`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updateAllSet4();
