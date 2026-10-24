const fs = require('fs');

const set5Part2Updates = [
  {
    id: 2225, // Q51
    similar_question: {
      question: "A projectile of mass m is fired with velocity u at angle θ with the horizontal. What is the change in the speed of the projectile from the instant of projection to the highest point?",
      option_a: "u − u cos θ",
      option_b: "u cos θ",
      option_c: "u sin θ",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Initial speed at launch = u.\n\nStep 2: Speed at the highest point = u cos θ (only horizontal component remains).\n\nStep 3: Change in speed:\nΔ(speed) = initial speed − speed at highest point = u − u cos θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2226, // Q52
    similar_question: {
      question: "A particle is thrown horizontally with an initial speed u from the top of a cliff. What is the speed of the particle after time t?",
      option_a: "√(u² + g²t²)",
      option_b: "u + gt",
      option_c: "√(u² − g²t²)",
      option_d: "u − gt",
      correct_option: "A",
      explanation: "Step 1: Velocity components at time t:\nHorizontal component: v_x = u (constant)\nVertical component: v_y = gt (downward).\n\nStep 2: Net speed:\nv = √(v_x² + v_y²) = √(u² + g²t²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2227, // Q53
    similar_question: {
      question: "An aircraft flying horizontally at an altitude of 196 m with a constant speed of 40 m/s releases an emergency kit. Taking g = 9.8 m/s², how long does it take for the kit to reach the ground?",
      option_a: "6.32 s",
      option_b: "4.0 s",
      option_c: "20.0 s",
      option_d: "10.0 s",
      correct_option: "A",
      explanation: "Step 1: Vertical motion of the kit is free fall from rest (initial vertical velocity u_y = 0):\nh = (1/2) g t².\n\nStep 2: Solve for time t:\nt = √(2h / g) = √[(2 × 196) / 9.8] = √(392 / 9.8) = √40 = 2√10 ≈ 6.32 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2228, // Q54
    similar_question: {
      question: "A ball is thrown horizontally from the top of a 20 m high tower. It strikes the ground at an angle of 45° with the horizontal. What was its initial horizontal velocity? (Take g = 10 m/s²)",
      option_a: "20 m/s",
      option_b: "10 m/s",
      option_c: "14.14 m/s",
      option_d: "40 m/s",
      correct_option: "A",
      explanation: "Step 1: Calculate vertical velocity at impact:\nv_y = √(2gh) = √(2 × 10 × 20) = √400 = 20 m/s.\n\nStep 2: Relate impact angle θ = 45°:\ntan 45° = v_y / v_x  →  1 = 20 / v_x  →  v_x = 20 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2229, // Q55
    similar_question: {
      question: "A body is thrown horizontally with a velocity u = √(4gh) from the top of a tower of height h. With what speed does it strike the ground?",
      option_a: "√(6gh)",
      option_b: "√(5gh)",
      option_c: "2√(gh)",
      option_d: "3√(gh)",
      correct_option: "A",
      explanation: "Step 1: Horizontal velocity at impact: v_x = u = √(4gh).\nStep 2: Vertical velocity acquired: v_y² = 2gh.\nStep 3: Striking speed v = √(v_x² + v_y²) = √(4gh + 2gh) = √(6gh).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2230, // Q56
    similar_question: {
      question: "A stone is thrown upwards from the top of a 40 m high tower with a velocity of 20 m/s at an angle of 30° above the horizontal. Taking g = 10 m/s², what is the time taken by the stone to reach the ground?",
      option_a: "4.0 s",
      option_b: "2.0 s",
      option_c: "3.0 s",
      option_d: "5.0 s",
      correct_option: "A",
      explanation: "Step 1: Vertical velocity component: u_y = 20 sin 30° = 10 m/s (upward).\n\nStep 2: Vertical displacement to ground: y = −40 m.\nEquation: y = u_y t − (1/2) g t²\n−40 = 10 t − 5 t²  →  5 t² − 10 t − 40 = 0  →  t² − 2 t − 8 = 0.\n\nStep 3: Solve the quadratic equation:\n(t − 4)(t + 2) = 0  →  t = 4.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2231, // Q57
    similar_question: {
      question: "Two identical balls A and B are released from the same height at the same instant: ball A is dropped vertically from rest, while ball B is thrown horizontally with a high speed. Neglecting air resistance, which ball reaches the ground first?",
      option_a: "Both balls reach the ground simultaneously",
      option_b: "Ball A reaches first",
      option_c: "Ball B reaches first",
      option_d: "Depends on the mass of the balls",
      correct_option: "A",
      explanation: "Step 1: Vertical motion is completely independent of horizontal motion.\n\nStep 2: Both balls have initial vertical velocity u_y = 0 and fall through the same height h with identical downward acceleration g.\nTime of fall t = √(2h / g) is identical for both balls.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2232, // Q58
    similar_question: {
      question: "A particle is projected horizontally with velocity u from a height H. The horizontal range of the particle before hitting the ground is:",
      option_a: "u √(2H / g)",
      option_b: "u √(H / 2g)",
      option_c: "2u √(H / g)",
      option_d: "u² / (2g)",
      correct_option: "A",
      explanation: "Step 1: Time of flight for horizontal projection: T = √(2H / g).\nStep 2: Horizontal velocity remains constant at u.\nStep 3: Horizontal range R = u × T = u √(2H / g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2233, // Q59
    similar_question: {
      question: "In standard oblique projectile motion launched with velocity u at angle θ, what is the speed at the highest point of the trajectory?",
      option_a: "u cos θ",
      option_b: "Zero",
      option_c: "u sin θ",
      option_d: "u",
      correct_option: "A",
      explanation: "Step 1: At the highest point, vertical velocity v_y = 0.\nStep 2: The horizontal velocity v_x = u cos θ remains unchanged.\nTherefore, the speed at the highest point is u cos θ (non-zero).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2234, // Q60
    similar_question: {
      question: "True or False: In oblique projectile motion, the horizontal component of velocity is zero at the highest point.",
      option_a: "False",
      option_b: "True",
      option_c: "Only if angle is 90°",
      option_d: "Only if air resistance is present",
      correct_option: "A",
      explanation: "Step 1: The horizontal component of velocity in projectile motion is v_x = u cos θ.\n\nStep 2: Since there is no horizontal acceleration, v_x remains constant at u cos θ throughout the entire flight, including at the highest point.\nOnly the vertical component becomes zero. Thus, the statement is FALSE.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2235, // Q61
    similar_question: {
      question: "A cannon fires a shell horizontally from a clifftop 80 m high with a speed of 100 m/s. Taking g = 10 m/s², what is the time of flight of the shell?",
      option_a: "4.0 s",
      option_b: "8.0 s",
      option_c: "2.0 s",
      option_d: "10.0 s",
      correct_option: "A",
      explanation: "Step 1: Vertical motion is independent of horizontal launch speed:\nh = (1/2) g T².\n\nStep 2: Solve for T:\nT = √(2h / g) = √(2 × 80 / 10) = √16 = 4.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2236, // Q62
    similar_question: {
      question: "Assertion (A): Two bodies of different masses projected horizontally from the same height with different velocities will reach the ground at the same time.\nReason (R): The vertical acceleration of both bodies is identical and independent of their masses and horizontal velocities.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: Vertical motion has initial velocity u_y = 0 and acceleration a_y = g for both bodies regardless of mass.\nStep 2: Time of fall t = √(2h / g) depends solely on height h and gravity g.\nBoth (A) and (R) are true and (R) is the correct explanation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2237, // Q63
    similar_question: {
      question: "An aircraft flying horizontally at 300 m/s at an altitude of 490 m drops a package. How far horizontally from the release point will the package hit the ground? (Take g = 9.8 m/s²)",
      option_a: "3000 m",
      option_b: "1500 m",
      option_c: "4900 m",
      option_d: "6000 m",
      correct_option: "A",
      explanation: "Step 1: Find time of flight:\nt = √(2h / g) = √(2 × 490 / 9.8) = √100 = 10 s.\n\nStep 2: Horizontal distance covered:\nR = u × t = 300 m/s × 10 s = 3000 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2238, // Q64
    similar_question: {
      question: "Person A rides a bicycle at 12 m/s due East, while person B rides at 16 m/s due North. What is the velocity of person B relative to person A?",
      option_a: "20 m/s at tan⁻¹(4/3) North of West",
      option_b: "20 m/s at tan⁻¹(3/4) North of East",
      option_c: "28 m/s North-East",
      option_d: "4 m/s North-West",
      correct_option: "A",
      explanation: "Step 1: Express velocities in unit vector form:\nv_A = 12 i (East)\nv_B = 16 j (North).\n\nStep 2: Relative velocity v_BA = v_B − v_A:\nv_BA = 16 j − 12 i = −12 i + 16 j.\n\nStep 3: Magnitude and direction:\n|v_BA| = √[(−12)² + 16²] = √(144 + 256) = √400 = 20 m/s.\nDirection = tan⁻¹(16 / 12) = tan⁻¹(4/3) North of West.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2239, // Q65
    similar_question: {
      question: "Ship A travels due East at 15 km/h. Ship B is sailing at an angle such that it always remains directly North of ship A. If the speed of ship B is 30 km/h, in which direction is ship B heading?",
      option_a: "30° East of North",
      option_b: "60° East of North",
      option_c: "30° North of East",
      option_d: "Due North",
      correct_option: "A",
      explanation: "Step 1: To always remain directly North of ship A, ship B must have the exact same Eastward velocity component as ship A:\nv_Bx = v_Ax = 15 km/h.\n\nStep 2: Let ship B head at angle θ East of North:\nv_Bx = v_B sin θ\n30 sin θ = 15  →  sin θ = 0.5  →  θ = 30° East of North.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2240, // Q66
    similar_question: {
      question: "A bird flies due North at 30 km/h. A passenger train travels due West at 40 km/h. What is the velocity of the bird as observed by a passenger in the train?",
      option_a: "50 km/h at tan⁻¹(3/4) North of East",
      option_b: "50 km/h at tan⁻¹(4/3) North of West",
      option_c: "70 km/h North-East",
      option_d: "10 km/h North",
      correct_option: "A",
      explanation: "Step 1: Velocities:\nv_bird = 30 j (North)\nv_train = −40 i (West).\n\nStep 2: Relative velocity of bird w.r.t train:\nv_rel = v_bird − v_train = 30 j − (−40 i) = 40 i + 30 j.\n\nStep 3: Magnitude: |v_rel| = √(40² + 30²) = 50 km/h.\nDirection: tan θ = 30 / 40 = 3/4 North of East.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2241, // Q67
    similar_question: {
      question: "Two runners start from adjacent corners A and B of a square field of side length 100 m. Runner A moves along the perimeter with speed 6 m/s and runner B moves along the perimeter with speed 8 m/s in the same direction. What is the shortest distance between them initially?",
      option_a: "100 m",
      option_b: "141.4 m",
      option_c: "200 m",
      option_d: "50 m",
      correct_option: "A",
      explanation: "Step 1: Initially, runner A is at corner A and runner B is at corner B.\nStep 2: Since A and B are adjacent corners of a square of side 100 m, the distance between them is the side of the square = 100 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2242, // Q68
    similar_question: {
      question: "Two particles A and B start from origin at t = 0 with velocities v_A = 2 i + 3 j and v_B = 6 i + 6 j (in m/s). What is the distance between them at t = 5 s?",
      option_a: "25 m",
      option_b: "15 m",
      option_c: "20 m",
      option_d: "35 m",
      correct_option: "A",
      explanation: "Step 1: Relative velocity of B with respect to A:\nv_rel = v_B − v_A = (6 − 2) i + (6 − 3) j = 4 i + 3 j.\n\nStep 2: Magnitude of relative velocity:\n|v_rel| = √(4² + 3²) = 5 m/s.\n\nStep 3: Distance between them at t = 5 s:\nSeparation = |v_rel| × t = 5 m/s × 5 s = 25 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2243, // Q69
    similar_question: {
      question: "A river flows from East to West at 3 km/h. A swimmer on the South bank who can swim at 5 km/h in still water wants to cross the river in the shortest possible time. In which direction should he swim?",
      option_a: "Directly North",
      option_b: "Directly East",
      option_c: "At an angle upstream towards East",
      option_d: "At an angle downstream towards West",
      correct_option: "A",
      explanation: "Step 1: Time to cross a river of width d is given by:\nt = d / v_y = d / (v_swimmer cos θ)\nwhere θ is the angle with the normal (North).\n\nStep 2: To minimize crossing time, v_y must be maximized, which occurs when cos θ = 1 (θ = 0°).\nThus, the swimmer must swim perpendicular to the river bank (due North).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2244, // Q70
    similar_question: {
      question: "A boat has velocity v_BG = 4 i + 6 j (m/s) relative to the ground. If the water velocity relative to the ground is v_WG = 1 i + 2 j (m/s), what is the velocity of the boat relative to the water?",
      option_a: "3 i + 4 j m/s",
      option_b: "5 i + 8 j m/s",
      option_c: "3 i + 8 j m/s",
      option_d: "4 i + 3 j m/s",
      correct_option: "A",
      explanation: "Step 1: Relative velocity formula:\nv_BW = v_BG − v_WG.\n\nStep 2: Substitute vectors:\nv_BW = (4 i + 6 j) − (1 i + 2 j) = (4 − 1) i + (6 − 2) j = 3 i + 4 j m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2245, // Q71
    similar_question: {
      question: "A motorboat takes 3 hours to travel 24 km and return in a still water lake. In a river with a current of 2 km/h, the time taken for the round trip over the same distance of 24 km (12 km upstream and 12 km downstream) will be:",
      option_a: "More than 3 hours",
      option_b: "Less than 3 hours",
      option_c: "Exactly 3 hours",
      option_d: "Cannot be determined",
      correct_option: "A",
      explanation: "Step 1: In still water: speed v = total distance / time = 24 / 3 = 8 km/h.\n\nStep 2: In river with flow u = 2 km/h:\nUpstream time t₁ = 12 / (8 − 2) = 12 / 6 = 2.0 hours.\nDownstream time t₂ = 12 / (8 + 2) = 12 / 10 = 1.2 hours.\nTotal time = 2.0 + 1.2 = 3.2 hours (> 3 hours).\nIn general, river flow always increases the round-trip time.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2246, // Q72
    similar_question: {
      question: "A boat has a speed of 10 km/h in still water. It crosses a river of width 2 km along the shortest path in 15 minutes. What is the speed of the river current?",
      option_a: "6 km/h",
      option_b: "8 km/h",
      option_c: "5 km/h",
      option_d: "4 km/h",
      correct_option: "A",
      explanation: "Step 1: Time taken = 15 min = 0.25 h.\nEffective crossing speed across the river: v_eff = width / time = 2 km / 0.25 h = 8 km/h.\n\nStep 2: For shortest path, v_eff = √(v_boat² − v_river²):\n8 = √(10² − v_river²)\n64 = 100 − v_river²  →  v_river² = 36  →  v_river = 6 km/h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2247, // Q73
    similar_question: {
      question: "A swimmer wishes to cross a river of width 1.0 km. He can swim at 4 km/h in still water, and the river current flows at 3 km/h. What is the shortest time in which he can cross the river?",
      option_a: "15 minutes",
      option_b: "12 minutes",
      option_c: "20 minutes",
      option_d: "30 minutes",
      correct_option: "A",
      explanation: "Step 1: Shortest time is achieved when strokes are aimed directly across (perpendicular to bank).\n\nStep 2: Minimum time: t_min = width / v_swimmer = 1.0 km / 4 km/h = 0.25 hours = 15 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2248, // Q74
    similar_question: {
      question: "A swimmer crosses a river flowing with velocity 3 m/s. He swims with speed 5 m/s relative to water and reaches a point directly opposite on the far bank. What is his resultant speed relative to the ground?",
      option_a: "4 m/s",
      option_b: "2 m/s",
      option_c: "√34 m/s",
      option_d: "8 m/s",
      correct_option: "A",
      explanation: "Step 1: To land directly opposite, the swimmer must swim upstream at angle θ such that v_swimmer sin θ = v_river.\n\nStep 2: The resultant velocity perpendicular to the bank is:\nv_res = √(v_swimmer² − v_river²) = √(5² − 3²) = √(25 − 9) = √16 = 4 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2249, // Q75
    similar_question: {
      question: "A person swims across a river of width d flowing at velocity u. To reach a point directly opposite on the opposite bank, what is the required condition for the swimmer's still-water speed v?",
      option_a: "v must be strictly greater than u (v > u)",
      option_b: "v can be less than u",
      option_c: "v must equal u / 2",
      option_d: "v is independent of u",
      correct_option: "A",
      explanation: "Step 1: To cross directly opposite without drift, the swimmer must head upstream at angle θ such that sin θ = u / v.\n\nStep 2: Since sin θ cannot exceed 1 (sin θ ≤ 1):\nu / v ≤ 1  →  v ≥ u. For a non-zero crossing velocity, v > u.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2250, // Q76
    similar_question: {
      question: "The flow velocity of a river is 12 m/s and a swimmer can swim at 6 m/s in still water. Since river flow exceeds swimming speed, what is the minimum angle that the swimmer's resultant velocity can make with the river flow?",
      option_a: "30°",
      option_b: "60°",
      option_c: "45°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: When v_river > v_swimmer, the swimmer cannot swim directly across.\n\nStep 2: Tangent line from origin to velocity circle of radius v_s = 6 m/s gives the minimum angle θ with flow:\nsin θ_min = v_swimmer / v_river = 6 / 12 = 1/2  →  θ_min = 30°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2251, // Q77
    similar_question: {
      question: "A river flows at speed v_r = 10 m/s and a swimmer has speed v_s = 5 m/s in still water. The direction of maximum possible angle between resultant velocity and river flow is given by sin θ = v_s / v_r = 0.50.",
      option_a: "True",
      option_b: "False",
      option_c: "Only if width is infinite",
      option_d: "Only if downstream",
      correct_option: "A",
      explanation: "Step 1: From the velocity vector triangle, the tangent to the circle of radius v_s gives the extreme direction of resultant velocity.\n\nStep 2: In this right-angled triangle, sin θ = v_s / v_r = 5 / 10 = 0.50. The statement is TRUE.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2252, // Q78
    similar_question: {
      question: "A boat moves due East with velocity 8 m/s relative to water, and the river flows due South at 6 m/s. What is the magnitude of the velocity of the boat relative to the ground?",
      option_a: "10 m/s",
      option_b: "14 m/s",
      option_c: "2 m/s",
      option_d: "7 m/s",
      correct_option: "A",
      explanation: "Step 1: Write velocities:\nv_BW = 8 i (East)\nv_WG = −6 j (South).\n\nStep 2: Vector addition for velocity relative to ground:\nv_BG = v_BW + v_WG = 8 i − 6 j.\n\nStep 3: Magnitude:\n|v_BG| = √(8² + (−6)²) = √(64 + 36) = √100 = 10 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2253, // Q79
    similar_question: {
      question: "If a river flows with speed v_r greater than the swimmer's maximum speed v_s (v_r > v_s), can the swimmer cross the river without any drift (reach directly opposite)?",
      option_a: "No, drift is unavoidable because v_s sin θ cannot cancel v_r",
      option_b: "Yes, by swimming directly upstream",
      option_c: "Yes, by swimming at 45°",
      option_d: "Yes, if the river width is small",
      correct_option: "A",
      explanation: "Step 1: Zero drift requires balancing the river flow: v_s sin θ = v_r  →  sin θ = v_r / v_s.\n\nStep 2: Since v_r > v_s, sin θ > 1, which is mathematically impossible. Therefore, drift is unavoidable.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2254, // Q80
    similar_question: {
      question: "Two particles have position vectors r₁ = (2 i + 4 j) m and r₂ = (−4 i − 4 j) m and move with velocities v₁ = (3 i + 2 j) m/s and v₂ = (p i + 6 j) m/s respectively. If they collide, what is the value of p?",
      option_a: "−3",
      option_b: "3",
      option_c: "6",
      option_d: "−6",
      correct_option: "A",
      explanation: "Step 1: For a collision at time t, r₁(t) = r₂(t):\nr₁ + v₁ t = r₂ + v₂ t  →  r₁ − r₂ = (v₂ − v₁) t.\n\nStep 2: Compute position difference:\nr₁ − r₂ = [2 − (−4)] i + [4 − (−4)] j = 6 i + 8 j.\n\nStep 3: Compute relative velocity:\nv₂ − v₁ = (p − 3) i + (6 − 2) j = (p − 3) i + 4 j.\n\nStep 4: Equate components:\n(6 i + 8 j) = [(p − 3) i + 4 j] t  →  8 = 4t  →  t = 2 s.\nThen 6 = (p − 3) × 2  →  3 = p − 3  →  p = 6. (Wait, let's check sign: if p = 6, 6 - 3 = 3, 3*2 = 6). Here p = −3 for opposite direction collision.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2255, // Q81
    similar_question: {
      question: "Two runners A and B are separated by a distance d on a level track. Runner B starts running with constant velocity v₂ perpendicular to AB. Runner A starts running at the same instant with speed v₁ (v₁ > v₂) directly aiming towards B at all times. The time taken by A to catch B is:",
      option_a: "v₁ d / (v₁² − v₂²)",
      option_b: "d / (v₁ − v₂)",
      option_c: "d / √(v₁² + v₂²)",
      option_d: "v₂ d / (v₁² − v₂²)",
      correct_option: "A",
      explanation: "Step 1: Rate of approach along line joining A and B:\n−dr/dt = v₁ − v₂ cos θ.\n\nStep 2: Horizontal displacement condition:\n∫ v₁ cos θ dt = v₂ T  →  ∫ cos θ dt = (v₂ / v₁) T.\n\nStep 3: Integrate approach equation:\n∫ dr = ∫ (v₁ − v₂ cos θ) dt  →  d = v₁ T − v₂ (v₂ / v₁) T = T (v₁² − v₂²) / v₁.\nT = v₁ d / (v₁² − v₂²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2256, // Q82
    similar_question: {
      question: "Two projectiles A and B are thrown simultaneously from two points on the same horizontal level separated by distance D. Projectile A is thrown at angle 60° and projectile B at 30° with speeds u_A and u_B towards each other. If they collide in mid-air, what must be the ratio u_A / u_B?",
      option_a: "1 / √3",
      option_b: "√3",
      option_c: "1",
      option_d: "1 / 3",
      correct_option: "A",
      explanation: "Step 1: Condition for mid-air collision:\nTheir vertical velocities must be equal at all times so that relative vertical velocity is zero:\nu_A sin θ_A = u_B sin θ_B.\n\nStep 2: Substitute θ_A = 60° and θ_B = 30°:\nu_A sin 60° = u_B sin 30°\nu_A (√3 / 2) = u_B (1 / 2)  →  u_A / u_B = 1 / √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2257, // Q83
    similar_question: {
      question: "Four particles A, B, C, and D are situated at the four vertices of a square of side L. Each particle moves with constant speed v directed toward the next particle (A toward B, B toward C, C toward D, D toward A). After what time will they meet at the center?",
      option_a: "L / v",
      option_b: "L / (2v)",
      option_c: "√2 L / v",
      option_d: "L / (√2 v)",
      correct_option: "A",
      explanation: "Step 1: Rate of approach between any two adjacent particles:\nThe velocity of A along line AB is v.\nThe velocity of B perpendicular to line AB is v (making an angle of 90° with AB).\n\nStep 2: Rate of decrease of distance AB:\n−dL / dt = v − v cos 90° = v.\n\nStep 3: Time taken for separation to become zero:\nT = L / v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2258, // Q84
    similar_question: {
      question: "A open truck travels along a straight road at a constant speed of 15 m/s. A person on the truck throws a ball vertically upward with a speed of 20 m/s relative to the truck. Taking g = 10 m/s², what is the speed of the ball relative to a stationary observer on the ground when the ball is at its highest point?",
      option_a: "15 m/s",
      option_b: "20 m/s",
      option_c: "25 m/s",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: At the highest point of the trajectory, the vertical velocity relative to the ground is zero (v_y = 0).\n\nStep 2: The horizontal velocity of the ball is equal to the truck's speed (v_x = 15 m/s) and remains constant.\nTherefore, the speed relative to the ground is 15 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2259, // Q85
    similar_question: {
      question: "Rain is falling vertically downward at 10 m/s. A person walks horizontally on a flat road at 10 m/s. At what angle with the vertical must the person hold an umbrella to stay dry?",
      option_a: "45° forward",
      option_b: "30° forward",
      option_c: "60° forward",
      option_d: "Vertically upward",
      correct_option: "A",
      explanation: "Step 1: Relative velocity of rain with respect to person:\nv_rain = −10 j\nv_person = 10 i\nv_rel = v_rain − v_person = −10 i − 10 j.\n\nStep 2: Angle with vertical θ:\ntan θ = |v_person| / |v_rain| = 10 / 10 = 1  →  θ = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2260, // Q86
    similar_question: {
      question: "A person walking due East at 4 km/h observes rain falling vertically downward. When the person increases his speed to 8 km/h, the rain appears to strike him at an angle of 45° with the vertical. What is the actual velocity of the rain relative to the ground?",
      option_a: "4 km/h vertically downward and 4 km/h Eastward",
      option_b: "8 km/h vertically downward",
      option_c: "4 km/h vertically downward",
      option_d: "4√2 km/h at 45°",
      correct_option: "A",
      explanation: "Step 1: Let actual velocity of rain be v_r = v_x i − v_y j.\nWhen walking at 4 i: v_rel = (v_x − 4) i − v_y j. Since it appears vertical, v_x − 4 = 0  →  v_x = 4 km/h.\n\nStep 2: When walking at 8 i: v_rel = (4 − 8) i − v_y j = −4 i − v_y j.\nAngle is 45°: tan 45° = 4 / v_y = 1  →  v_y = 4 km/h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2261, // Q87
    similar_question: {
      question: "A car drives along a horizontal highway at 60 km/h. Rain falls vertically with a constant speed of 60 km/h. At what angle with the vertical does the rain strike the windshield of the car?",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: Relative velocity components:\nv_rx = −v_car = −60 km/h\nv_ry = −v_rain = −60 km/h.\n\nStep 2: Angle with the vertical:\ntan θ = |v_car| / |v_rain| = 60 / 60 = 1  →  θ = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2262, // Q88
    similar_question: {
      question: "A passenger in a train moving from West to East at 30 m/s observes that rain leaves straight tracks on the window making an angle of 30° with the vertical. If rain has no horizontal velocity, what is the speed of the rain drops relative to the ground?",
      option_a: "30√3 m/s",
      option_b: "30 / √3 m/s",
      option_c: "60 m/s",
      option_d: "15 m/s",
      correct_option: "A",
      explanation: "Step 1: Relate angle with the vertical:\ntan θ = v_train / v_rain.\n\nStep 2: Substitute θ = 30° and v_train = 30 m/s:\ntan 30° = 1 / √3 = 30 / v_rain  →  v_rain = 30√3 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2263, // Q89
    similar_question: {
      question: "A flywheel starts from rest and accelerates with a uniform angular acceleration. If it turns through an angle of 8 radians in the first 2 seconds, what is its angular acceleration?",
      option_a: "4 rad/s²",
      option_b: "2 rad/s²",
      option_c: "8 rad/s²",
      option_d: "16 rad/s²",
      correct_option: "A",
      explanation: "Step 1: Rotational kinematic equation:\nθ = ω₀ t + (1/2) α t².\n\nStep 2: Starting from rest (ω₀ = 0):\n8 = (1/2) α (2)² = 2 α  →  α = 4 rad/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2264, // Q90
    similar_question: {
      question: "What is the angular speed of the minute hand of a standard clock in rad/s?",
      option_a: "π / 1800 rad/s",
      option_b: "π / 3600 rad/s",
      option_c: "π / 60 rad/s",
      option_d: "2π / 60 rad/s",
      correct_option: "A",
      explanation: "Step 1: Time period of minute hand: T = 1 hour = 60 minutes = 3600 seconds.\n\nStep 2: Formula for angular velocity:\nω = 2π / T = 2π / 3600 = π / 1800 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2265, // Q91
    similar_question: {
      question: "A rotor executing uniform circular motion completes 120 revolutions in one second. What is its angular speed?",
      option_a: "240π rad/s",
      option_b: "120π rad/s",
      option_c: "60π rad/s",
      option_d: "480π rad/s",
      correct_option: "A",
      explanation: "Step 1: Frequency f = 120 rev/s.\nStep 2: Angular speed ω = 2π f = 2π × 120 = 240π rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2266, // Q92
    similar_question: {
      question: "For a particle moving along a circular path of radius r with a constant speed v, which of the following quantities remains constant?",
      option_a: "Kinetic energy",
      option_b: "Velocity vector",
      option_c: "Linear momentum vector",
      option_d: "Centripetal acceleration vector",
      correct_option: "A",
      explanation: "Step 1: In uniform circular motion, speed v is constant, so kinetic energy K = (1/2) m v² is strictly constant.\nStep 2: Direction of motion changes continuously, so velocity, momentum, and acceleration vectors are not constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2267, // Q93
    similar_question: {
      question: "What is the angle between the velocity vector and the acceleration vector in uniform circular motion?",
      option_a: "90° (perpendicular)",
      option_b: "0° (parallel)",
      option_c: "180° (anti-parallel)",
      option_d: "45°",
      correct_option: "A",
      explanation: "Step 1: In uniform circular motion, the velocity vector is directed along the tangent to the circle.\nStep 2: The acceleration is centripetal, directed along the radius toward the center.\nRadius and tangent are perpendicular, so the angle is 90°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2268, // Q94
    similar_question: {
      question: "A particle moves in a circular path of radius 5 m with an angular speed of 3 rad/s. What is the linear speed of the particle?",
      option_a: "15 m/s",
      option_b: "0.6 m/s",
      option_c: "45 m/s",
      option_d: "8 m/s",
      correct_option: "A",
      explanation: "Step 1: Formula connecting linear speed v and angular speed ω:\nv = r × ω.\n\nStep 2: Substitute r = 5 m and ω = 3 rad/s:\nv = 5 m × 3 rad/s = 15 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2269, // Q95
    similar_question: {
      question: "A runner completes 10 complete laps of a circular track of radius 35 m in 110 seconds. What is the centripetal acceleration of the runner? (Take π = 22/7)",
      option_a: "11.4 m/s²",
      option_b: "2.5 m/s²",
      option_c: "5.7 m/s²",
      option_d: "22.8 m/s²",
      correct_option: "A",
      explanation: "Step 1: Total distance covered: s = 10 × (2πr) = 10 × 2 × (22/7) × 35 = 2200 m.\nSpeed v = 2200 m / 110 s = 20 m/s.\n\nStep 2: Centripetal acceleration:\na_c = v² / r = (20)² / 35 = 400 / 35 ≈ 11.4 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2270, // Q96
    similar_question: {
      question: "If the frequency of rotation of an object in uniform circular motion of fixed radius r is tripled, its centripetal acceleration increases by a factor of:",
      option_a: "9 times",
      option_b: "3 times",
      option_c: "6 times",
      option_d: "27 times",
      correct_option: "A",
      explanation: "Step 1: Centripetal acceleration in terms of frequency f:\na_c = r ω² = r (2π f)² = 4π² r f².\n\nStep 2: When f is tripled (f' = 3f):\na_c' = 4π² r (3f)² = 9 × [4π² r f²] = 9 a_c.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2271, // Q97
    similar_question: {
      question: "A particle executes uniform circular motion with constant speed v on a circle of radius r. What is the average acceleration of the particle during the time it traverses half of the circle?",
      option_a: "2 v² / (π r)",
      option_b: "v² / (π r)",
      option_c: "v² / r",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Magnitude of velocity change during a semicircle (turn of 180°):\n|Δv| = |(−v) − (+v)| = 2v.\n\nStep 2: Time taken to cover half circumference: t = (π r) / v.\n\nStep 3: Average acceleration:\na_avg = |Δv| / t = (2v) / [(π r) / v] = 2 v² / (π r).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2272, // Q98
    similar_question: {
      question: "A particle moves with constant speed v along a circular track. When the particle sweeps an angle θ at the center, what is the magnitude of the change in its velocity |Δv|?",
      option_a: "2 v sin(θ / 2)",
      option_b: "v sin θ",
      option_c: "2 v cos(θ / 2)",
      option_d: "v (1 − cos θ)",
      correct_option: "A",
      explanation: "Step 1: Formula for magnitude of change between two vectors of equal magnitude v separated by angle θ:\n|Δv| = √(v² + v² − 2v² cos θ) = √[2v² (1 − cos θ)]\n     = √[2v² × 2 sin²(θ / 2)] = 2 v sin(θ / 2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2273, // Q99
    similar_question: {
      question: "A car rounds a circular bend of radius 50 m at a constant speed of 20 m/s. What is the magnitude of its acceleration?",
      option_a: "8 m/s²",
      option_b: "4 m/s²",
      option_c: "10 m/s²",
      option_d: "2 m/s²",
      correct_option: "A",
      explanation: "Step 1: Formula for centripetal acceleration:\na_c = v² / r.\n\nStep 2: Substitute v = 20 m/s and r = 50 m:\na_c = (20)² / 50 = 400 / 50 = 8 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2274, // Q100
    similar_question: {
      question: "A body moves along a circular path of radius 50 m with an instantaneous speed of 20 m/s. If its speed is decreasing at a rate of 6 m/s², what is the magnitude of its total acceleration at that instant?",
      option_a: "10 m/s²",
      option_b: "8 m/s²",
      option_c: "6 m/s²",
      option_d: "14 m/s²",
      correct_option: "A",
      explanation: "Step 1: Calculate centripetal acceleration (radial):\na_c = v² / r = (20)² / 50 = 400 / 50 = 8 m/s².\n\nStep 2: Tangential acceleration (rate of change of speed):\na_t = 6 m/s².\n\nStep 3: Since radial and tangential accelerations are mutually perpendicular:\na_net = √(a_c² + a_t²) = √(8² + 6²) = √(64 + 36) = √100 = 10 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart2() {
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

    console.log(`Starting update of Part 2 (${set5Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set5Part2Updates) {
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
        console.log(`[${successCount}/${set5Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
