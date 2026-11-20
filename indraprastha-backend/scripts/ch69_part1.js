module.exports = [
  {
    id: 221,
    question: "Stone tied end string 1m long whirled horizontal circle constant speed. If stone makes 22 revolutions in 44 seconds what is magnitude and direction acceleration stone? [AIPMT 2005]",
    optionA: "π² m/s² and direction along radius towards centre",
    optionB: "π² m/s² and direction along radius away from centre",
    optionC: "π² m/s² and direction along tangent to circle",
    optionD: "π²/4 m/s² and direction along radius towards centre",
    correctOption: "A",
    explanation: "Step 1: Calculate the frequency of revolution (ν):\nν = (Total number of revolutions) / (Total time taken) = 22 / 44 = 0.5 rev s⁻¹ (Hz).\nStep 2: Calculate the angular speed (ω):\nω = 2πν = 2 × π × 0.5 = π rad s⁻¹.\nStep 3: In uniform circular motion, speed is constant, so tangential acceleration is zero (a_t = 0). The only acceleration acting on the stone is the centripetal (radial) acceleration (a_c):\na_c = ω² R = (π)² × 1 m = π² m s⁻².\nStep 4: Centripetal acceleration is always directed radially inward along the radius towards the centre of the circular path.\nStep 5: Therefore, the acceleration of the stone is π² m s⁻² directed along the radius towards the centre.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A body tied to a string of length 0.5 m is whirled in a horizontal circle at a constant speed of 10 m s⁻¹. What is the magnitude and direction of the acceleration of the body?",
      option_a: "200 m s⁻² directed along the radius towards the centre",
      option_b: "200 m s⁻² directed tangentially",
      option_c: "100 m s⁻² directed along the radius away from the centre",
      option_d: "50 m s⁻² directed vertically downwards",
      correct_option: "A",
      explanation: "Step 1: For uniform circular motion, the acceleration is purely centripetal: a_c = v² / R.\nStep 2: Substitute v = 10 m s⁻¹ and R = 0.5 m: a_c = 10² / 0.5 = 100 / 0.5 = 200 m s⁻².\nStep 3: Centripetal acceleration is directed radially inward towards the centre of the circle.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 220,
    question: "Man slipping on frictionless inclined plane and bag falls down from same height. Then velocities both are related as? [AIPMT 2000]",
    optionA: "vB > vm",
    optionB: "vB < vm",
    optionC: "vB = vm",
    optionD: "vB and vm cannot be related",
    correctOption: "C",
    explanation: "Step 1: Let h be the initial vertical height from which both the man and the bag descend.\nStep 2: For the freely falling bag (mass m_B):\n- The only force acting is gravity (a conservative force).\n- Applying the law of conservation of mechanical energy:\nPotential energy lost = Kinetic energy gained\nm_B g h = (1/2) m_B v_B² → v_B = √(2gh).\nStep 3: For the man (mass m_M) sliding down the frictionless inclined plane:\n- The normal reaction acts perpendicular to the incline and does zero work (W_N = 0).\n- Gravity is the only force doing work on the man.\n- Applying conservation of mechanical energy:\nm_M g h = (1/2) m_M v_M² → v_M = √(2gh).\nStep 4: Since the final speed depends only on the vertical drop height h and acceleration due to gravity g, independent of the mass or path taken:\nv_B = v_M = √(2gh).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two blocks of masses m₁ and m₂ (m₁ > m₂) slide down from the top of two different frictionless inclined planes of angles 30° and 60° respectively, both starting from rest at the same height h. The ratio of their final speeds at the bottom is:",
      option_a: "1 : 1",
      option_b: "m₁ : m₂",
      option_c: "1 : √3",
      option_d: "√3 : 1",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy, final speed at the bottom of any frictionless incline of vertical height h is v = √(2gh).\nStep 2: The final speed is completely independent of the mass and angle of inclination.\nStep 3: Since both start from the same vertical height h, v₁ = v₂ = √(2gh), giving a ratio of 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 219,
    question: "Two projectiles same mass and same velocity thrown at angles 60° and 30° with horizontal. Which will remain same? [AIPMT 2000]",
    optionA: "Time of flight",
    optionB: "Range of projectile",
    optionC: "Maximum height acquired",
    optionD: "All of them",
    correctOption: "B",
    explanation: "Step 1: The horizontal range of a projectile fired with initial speed u at angle θ to the horizontal is given by:\nR = (u² sin 2θ) / g.\nStep 2: For two angles θ₁ = 30° and θ₂ = 60°:\n- Notice that θ₁ + θ₂ = 30° + 60° = 90° (complementary angles of projection).\n- For θ₁ = 30°: R₁ = (u² sin(2 × 30°)) / g = (u² sin 60°) / g = (√3 u²) / (2g).\n- For θ₂ = 60°: R₂ = (u² sin(2 × 60°)) / g = (u² sin 120°) / g = (u² sin(180° − 60°)) / g = (√3 u²) / (2g).\n- Hence, R₁ = R₂ (horizontal range is identical for complementary angles).\nStep 3: Time of flight T = (2u sin θ) / g depends on sin θ (sin 60° ≠ sin 30°), so T is different.\nStep 4: Maximum height H = (u² sin² θ) / (2g) depends on sin² θ, so H is different.\nStep 5: Therefore, only the horizontal range remains the same.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two projectiles are launched with the same speed at complementary angles θ and (90° − θ). What is the ratio of their maximum heights H₁ / H₂?",
      option_a: "tan² θ",
      option_b: "tan θ",
      option_c: "cot θ",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: H₁ = (u² sin² θ) / (2g) and H₂ = (u² sin²(90° − θ)) / (2g) = (u² cos² θ) / (2g).\nStep 2: H₁ / H₂ = sin² θ / cos² θ = tan² θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 218,
    question: "Width river 1km velocity boat 5 km/h boat covers width river along shortest path in 15 min then velocity river stream? [AIPMT 2000]",
    optionA: "3 km/h",
    optionB: "4 km/h",
    optionC: "√29 km/h",
    optionD: "√41 km/h",
    correctOption: "A",
    explanation: "Step 1: Shortest path across a river means the boat moves perpendicularly straight across the river from one bank to the opposite bank.\nStep 2: The resultant velocity of the boat (v_res) must be directed straight across the river.\n- Distance across = width of river (d) = 1 km.\n- Time taken (t) = 15 min = 15/60 h = 0.25 h = 1/4 h.\n- Resultant velocity: v_res = d / t = 1 km / 0.25 h = 4 km h⁻¹.\nStep 3: In vector notation for crossing along the shortest path:\n(v_boat)² = (v_res)² + (v_river)².\nStep 4: Substitute the given velocity of the boat in still water (v_boat = 5 km h⁻¹):\n5² = 4² + (v_river)²\n25 = 16 + (v_river)²\n(v_river)² = 25 − 16 = 9\nv_river = √9 = 3 km h⁻¹.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A swimmer can swim at 10 km h⁻¹ in still water. He crosses a 500 m wide river along the shortest path in 3.75 minutes. What is the speed of the river current?",
      option_a: "6 km h⁻¹",
      option_b: "8 km h⁻¹",
      option_c: "5 km h⁻¹",
      option_d: "4 km h⁻¹",
      correct_option: "A",
      explanation: "Step 1: Time = 3.75 min = 3.75 / 60 h = 1/16 h; width = 0.5 km.\nStep 2: Resultant speed v_res = 0.5 / (1/16) = 8 km h⁻¹.\nStep 3: v_river = √(v_swimmer² − v_res²) = √(10² − 8²) = √(100 − 64) = √36 = 6 km h⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 217,
    question: "Two particles having masses M and m moving circular paths radii R and r. If time periods same then ratio angular velocities? [AIPMT 2001]",
    optionA: "r/R",
    optionB: "R/r",
    optionC: "1",
    optionD: "√(R/r)",
    correctOption: "C",
    explanation: "Step 1: The angular velocity (ω) of a particle moving in a circular path is related to its time period (T) by the formula:\nω = 2π / T.\nStep 2: Let T₁ and T₂ be the time periods of the particles of mass M and m, respectively.\n- Given: T₁ = T₂ = T.\nStep 3: Calculate the angular velocities:\n- For mass M: ω₁ = 2π / T₁ = 2π / T.\n- For mass m: ω₂ = 2π / T₂ = 2π / T.\nStep 4: The ratio of their angular velocities is:\nω₁ / ω₂ = (2π / T) / (2π / T) = 1.\nStep 5: Note that angular velocity depends solely on the time period and is independent of both the mass of the particles and the radii of their paths.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two racing cars of masses m₁ and m₂ move in concentric circles of radii r₁ and r₂ respectively. If both complete one full lap in the same time, what is the ratio of their linear speeds v₁ / v₂?",
      option_a: "r₁ / r₂",
      option_b: "r₂ / r₁",
      option_c: "1",
      option_d: "√(r₁ / r₂)",
      correct_option: "A",
      explanation: "Step 1: Linear speed v = ω r = (2π / T) r.\nStep 2: Since time periods are equal, their angular speeds ω are identical.\nStep 3: Therefore, the ratio of linear speeds is: v₁ / v₂ = (ω r₁) / (ω r₂) = r₁ / r₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 216,
    question: "If |A+B|=|A|+|B| then angle between A and B will be? [AIPMT 2001]",
    optionA: "90°",
    optionB: "120°",
    optionC: "0°",
    optionD: "60°",
    correctOption: "C",
    explanation: "Step 1: The magnitude of the vector sum of two vectors A and B is given by:\n|A + B| = √(A² + B² + 2AB cos θ),\nwhere θ is the angle between vectors A and B.\nStep 2: We are given that:\n|A + B| = |A| + |B| = A + B.\nStep 3: Squaring both sides:\n|A + B|² = (A + B)²\nA² + B² + 2AB cos θ = A² + B² + 2AB.\nStep 4: Subtracting (A² + B²) from both sides:\n2AB cos θ = 2AB.\nAssuming non-zero vectors (A ≠ 0, B ≠ 0):\ncos θ = 1.\nStep 5: The angle whose cosine is 1 is:\nθ = cos⁻¹(1) = 0°.\nStep 6: This signifies that vectors A and B are collinear, parallel, and acting in the exact same direction.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If |A + B| = |A| − |B| (where |A| > |B|), what is the angle between vectors A and B?",
      option_a: "180°",
      option_b: "0°",
      option_c: "90°",
      option_d: "120°",
      correct_option: "A",
      explanation: "Step 1: Squaring both sides: A² + B² + 2AB cos θ = (A − B)² = A² + B² − 2AB.\nStep 2: 2AB cos θ = −2AB → cos θ = −1.\nStep 3: θ = 180° (vectors are antiparallel).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 215,
    question: "Particle A dropped from height and another particle B projected horizontal direction speed 5 m/s from same height. Then correct statement? [AIPMT 2002]",
    optionA: "Particle A will reach ground first with respect to particle B",
    optionB: "Particle B will reach ground first with respect to particle A",
    optionC: "Both particles will reach ground simultaneously",
    optionD: "Both particles will reach ground with same speed",
    correctOption: "C",
    explanation: "Step 1: Motion in a plane can be resolved into two mutually perpendicular and independent one-dimensional motions (horizontal and vertical).\nStep 2: Analyze the vertical motion for both particles:\n- For particle A (dropped from rest): Initial vertical velocity u_yA = 0, vertical acceleration a_y = g, vertical displacement = h.\n- Using h = u_y t + (1/2) g t²:\nh = 0 + (1/2) g t_A² → t_A = √(2h / g).\nStep 3: For particle B (projected horizontally with speed u = 5 m s⁻¹):\n- The horizontal velocity u_x = 5 m s⁻¹ affects only horizontal displacement.\n- Its initial vertical velocity is also zero: u_yB = 0.\n- Its vertical acceleration is identical: a_y = g.\n- Using h = 0 + (1/2) g t_B² → t_B = √(2h / g).\nStep 4: Since t_A = t_B = √(2h / g), both particles take the exact same time to descend and strike the ground simultaneously.\nStep 5: Note that their striking speeds are different: v_A = √(2gh), whereas v_B = √(u_x² + 2gh).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A stone is dropped from a cliff of height H, while another stone is thrown horizontally from the same height with a velocity of 20 m s⁻¹. If the time taken by the dropped stone to reach the ground is t₁, and by the thrown stone is t₂, then:",
      option_a: "t₁ = t₂",
      option_b: "t₁ < t₂",
      option_c: "t₁ > t₂",
      option_d: "t₂ depends on the launch angle only",
      correct_option: "A",
      explanation: "Step 1: Both stones have zero initial vertical velocity (u_y = 0).\nStep 2: Both stones fall through the same vertical distance H under identical vertical gravitational acceleration g.\nStep 3: Therefore, the time of flight t = √(2H / g) is identical: t₁ = t₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 214,
    question: "Vector sum two forces perpendicular to their vector differences. In that case forces? [AIPMT 2003]",
    optionA: "Are equal to each other",
    optionB: "Are equal to each other in magnitude",
    optionC: "Are not equal to each other in magnitude",
    optionD: "Cannot be predicted",
    correctOption: "B",
    explanation: "Step 1: Let the two forces be represented by vectors F₁ and F₂.\n- Their vector sum is (F₁ + F₂).\n- Their vector difference is (F₁ − F₂).\nStep 2: Two vectors are mutually perpendicular if and only if their scalar (dot) product is zero:\n(F₁ + F₂) · (F₁ − F₂) = 0.\nStep 3: Expand the dot product using the distributive property:\nF₁ · F₁ − F₁ · F₂ + F₂ · F₁ − F₂ · F₂ = 0.\nStep 4: Since the dot product is commutative (F₁ · F₂ = F₂ · F₁):\n|F₁|² − |F₂|² = 0\n|F₁|² = |F₂|² → |F₁| = |F₂|.\nStep 5: This proves that the two forces must be equal to each other in magnitude (they do not need to have the same direction).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the diagonals of a parallelogram formed by two vectors A and B are mutually perpendicular, what is the geometric relationship between vectors A and B?",
      option_a: "Vectors A and B have equal magnitudes",
      option_b: "Vectors A and B are perpendicular",
      option_c: "Vector A is twice vector B",
      option_d: "Vectors A and B are parallel",
      correct_option: "A",
      explanation: "Step 1: The diagonals of the parallelogram are (A + B) and (A − B).\nStep 2: If diagonals are perpendicular: (A + B) · (A − B) = 0 → A² − B² = 0 → |A| = |B|.\nStep 3: A parallelogram with equal adjacent sides is a rhombus.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 213,
    question: "If |A×B|=√3(A·B) then value |A+B|? [AIPMT 2004]",
    optionA: "√(A²+B²+AB)",
    optionB: "√(A²+B²+AB/√3)",
    optionC: "A+B",
    optionD: "√(A²+B²+√3AB)",
    correctOption: "A",
    explanation: "Step 1: Express the cross product magnitude and dot product in terms of angle θ between vectors A and B:\n- |A × B| = A B sin θ\n- A · B = A B cos θ\nStep 2: Substitute into the given relation:\nA B sin θ = √3 A B cos θ.\nAssuming A ≠ 0 and B ≠ 0:\nsin θ / cos θ = √3 → tan θ = √3.\nStep 3: Determine the angle θ:\nθ = 60° (since tan 60° = √3).\nStep 4: Find the magnitude of the vector sum |A + B|:\n|A + B| = √(A² + B² + 2AB cos θ)\nSubstitute θ = 60° (where cos 60° = 1/2):\n|A + B| = √(A² + B² + 2AB(1/2)) = √(A² + B² + AB).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If |A × B| = (A · B), what is the magnitude of |A − B|?",
      option_a: "√(A² + B² − √2 AB)",
      option_b: "√(A² + B²)",
      option_c: "A − B",
      option_d: "√(A² + B² + √2 AB)",
      correct_option: "A",
      explanation: "Step 1: A B sin θ = A B cos θ → tan θ = 1 → θ = 45°.\nStep 2: |A − B| = √(A² + B² − 2AB cos 45°) = √(A² + B² − 2AB(1/√2)) = √(A² + B² − √2 AB).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 212,
    question: "If vector 2î+3ĵ+8k̂ is perpendicular to vector 4ĵ-4î+αk̂ then value α is? [AIPMT 2005]",
    optionA: "1/2",
    optionB: "-1/2",
    optionC: "1",
    optionD: "-1",
    correctOption: "B",
    explanation: "Step 1: Write both vectors clearly in terms of unit vectors (î, ĵ, k̂):\n- Vector A = 2 î + 3 ĵ + 8 k̂\n- Vector B = −4 î + 4 ĵ + α k̂ (rearranging 4ĵ − 4î to standard î, ĵ order).\nStep 2: Two non-zero vectors are perpendicular if and only if their scalar (dot) product is zero:\nA · B = 0.\nStep 3: Calculate the dot product:\nA · B = (A_x × B_x) + (A_y × B_y) + (A_z × B_z)\nA · B = (2 × (−4)) + (3 × 4) + (8 × α)\nA · B = −8 + 12 + 8α = 4 + 8α.\nStep 4: Set the dot product equal to zero:\n4 + 8α = 0\n8α = −4\nα = −4 / 8 = −1/2.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For what value of p are the vectors A = 3 î + 2 ĵ − k̂ and B = 2 î + p ĵ + 4 k̂ perpendicular to each other?",
      option_a: "−1",
      option_b: "1",
      option_c: "2",
      option_d: "−2",
      correct_option: "A",
      explanation: "Step 1: A · B = 0 → (3)(2) + (2)(p) + (−1)(4) = 0.\nStep 2: 6 + 2p − 4 = 0 → 2 + 2p = 0 → 2p = −2 → p = −1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 211,
    question: "If angle between vectors A and B is θ value product (B×A)·A equal to? [AIPMT 2005]",
    optionA: "BA² sinθ",
    optionB: "BA² cosθ",
    optionC: "BA² sinθ cosθ",
    optionD: "Zero",
    correctOption: "D",
    explanation: "Step 1: The cross product of two vectors, C = B × A, results in a vector C that is, by definition, perpendicular to both vector B and vector A.\nStep 2: Therefore, the angle between the vector (B × A) and the vector A is 90°:\n(B × A) ⊥ A.\nStep 3: The scalar (dot) product of any two mutually perpendicular vectors is zero, because cos 90° = 0:\n(B × A) · A = |B × A| |A| cos 90° = 0.\nStep 4: Alternatively, this represents the scalar triple product [B A A], which is identically zero because two vectors in the triple product are identical.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the value of the vector expression (A × B) · B for any two arbitrary 3D vectors A and B?",
      option_a: "0",
      option_b: "AB sin θ",
      option_c: "AB cos θ",
      option_d: "A B²",
      correct_option: "A",
      explanation: "Step 1: The vector (A × B) is perpendicular to the plane containing A and B, and thus perpendicular to B itself.\nStep 2: The dot product of two perpendicular vectors is zero: (A × B) · B = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 210,
    question: "Two boys standing at ends A and B of ground where AB=a. Boy at B starts running direction perpendicular to AB with velocity v1. Boy at A starts running simultaneously with velocity v and catches other in time t where t is? [AIPMT 2005]",
    optionA: "a/√(v²+v1²)",
    optionB: "a/(v+v1)",
    optionC: "a/(v-v1)",
    optionD: "√[a²/(v²-v1²)]",
    correctOption: "D",
    explanation: "Step 1: Let the line AB be along the x-axis with length a, so boy A starts at origin (0, 0) and boy B starts at (a, 0).\nStep 2: Boy at B runs along the y-axis (perpendicular to AB) with constant velocity v₁.\n- In time t, boy B reaches position: (x_B, y_B) = (a, v₁ t).\nStep 3: Boy at A runs with constant speed v directly toward the interception point.\n- In time t, the distance covered by boy A is: d_A = v t.\nStep 4: For boy A to catch boy B, boy A must reach (a, v₁ t) at time t.\n- Using the Pythagorean distance formula from origin (0, 0) to (a, v₁ t):\nd_A² = a² + (v₁ t)²\n(v t)² = a² + v₁² t².\nStep 5: Rearrange and solve for time t:\nv² t² − v₁² t² = a²\nt² (v² − v₁²) = a²\nt² = a² / (v² − v₁²)\nt = √[a² / (v² − v₁²)].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A target is moving perpendicular to line AB with uniform speed 3 m s⁻¹. An arrow is shot from A towards the target with speed 5 m s⁻¹. If AB = 40 m, in what time will the arrow hit the target?",
      option_a: "10 s",
      option_b: "8 s",
      option_c: "5 s",
      option_d: "20 s",
      correct_option: "A",
      explanation: "Step 1: t = √[a² / (v² − v₁²)].\nStep 2: Substitute a = 40 m, v = 5 m s⁻¹, v₁ = 3 m s⁻¹:\nt = √[40² / (5² − 3²)] = √[1600 / (25 − 9)] = √[1600 / 16] = √100 = 10 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 209,
    question: "Vectors A and B are such that |A+B|=|A-B|. Angle between two vectors? [AIPMT 2006]",
    optionA: "45°",
    optionB: "90°",
    optionC: "60°",
    optionD: "75°",
    correctOption: "B",
    explanation: "Step 1: Write down the magnitudes of the vector sum and vector difference:\n- |A + B| = √(A² + B² + 2AB cos θ)\n- |A − B| = √(A² + B² − 2AB cos θ)\nStep 2: Equating both magnitudes:\n√(A² + B² + 2AB cos θ) = √(A² + B² − 2AB cos θ).\nStep 3: Squaring both sides:\nA² + B² + 2AB cos θ = A² + B² − 2AB cos θ.\nStep 4: Simplifying the equation:\n2AB cos θ = −2AB cos θ\n4AB cos θ = 0.\nStep 5: Assuming non-zero vectors A and B (A ≠ 0, B ≠ 0):\ncos θ = 0 → θ = 90° (π/2 radians).\nStep 6: Hence, vectors A and B are mutually perpendicular.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If two non-zero vectors A and B satisfy (A + B) · (A − B) = 0 and |A + B| = |A − B|, which of the following is true?",
      option_a: "Vectors A and B are orthogonal and equal in magnitude",
      option_b: "Vectors A and B are parallel",
      option_c: "Vector A is zero",
      option_d: "Vectors A and B are antiparallel",
      correct_option: "A",
      explanation: "Step 1: (A + B) · (A − B) = 0 gives |A| = |B| (equal magnitudes).\nStep 2: |A + B| = |A − B| gives θ = 90° (orthogonal).\nStep 3: Therefore, both vectors are orthogonal and equal in magnitude.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 208,
    question: "For angles projection projectile at angles 45°-θ and 45°+θ horizontal ranges described by projectile are in ratio? [AIPMT 2006]",
    optionA: "2:1",
    optionB: "1:1",
    optionC: "2:3",
    optionD: "1:2",
    correctOption: "B",
    explanation: "Step 1: The horizontal range of a projectile fired with speed u at angle α is:\nR = (u² sin 2α) / g.\nStep 2: For the first angle of projection α₁ = 45° − θ:\nR₁ = (u² sin[2(45° − θ)]) / g = (u² sin(90° − 2θ)) / g = (u² cos 2θ) / g.\nStep 3: For the second angle of projection α₂ = 45° + θ:\nR₂ = (u² sin[2(45° + θ)]) / g = (u² sin(90° + 2θ)) / g = (u² cos 2θ) / g.\nStep 4: Comparing the two horizontal ranges:\nR₁ = R₂ = (u² cos 2θ) / g.\nStep 5: Therefore, the ratio of their horizontal ranges is:\nR₁ : R₂ = 1 : 1.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A projectile has a range R when fired at an angle of 15° with the horizontal. At what other angle of projection with the same launch speed will its range be R?",
      option_a: "75°",
      option_b: "60°",
      option_c: "45°",
      option_d: "30°",
      correct_option: "A",
      explanation: "Step 1: Horizontal range is identical for complementary angles of projection: θ and (90° − θ).\nStep 2: For θ = 15°, the complementary angle is 90° − 15° = 75°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 207,
    question: "Particle starting origin (0,0) moves straight line in x,y plane. Its coordinates later time are √3,3. Path particle makes with x-axis angle? [AIPMT 2007]",
    optionA: "45°",
    optionB: "60°",
    optionC: "0°",
    optionD: "30°",
    correctOption: "B",
    explanation: "Step 1: The particle moves in a straight line starting from origin (0, 0) to point P(x, y) = (√3, 3).\nStep 2: The angle θ that this straight-line path makes with the positive x-axis satisfies:\ntan θ = (Δy / Δx) = (y − 0) / (x − 0) = y / x.\nStep 3: Substitute the coordinates x = √3 and y = 3:\ntan θ = 3 / √3 = √3.\nStep 4: Find the angle θ whose tangent is √3:\nθ = tan⁻¹(√3) = 60°.\nStep 5: Therefore, the path of the particle makes an angle of 60° with the x-axis.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A particle starts from the origin and moves along a straight line in the x-y plane. At a later time, its coordinates are (3, √3). What angle does its trajectory make with the positive x-axis?",
      option_a: "30°",
      option_b: "60°",
      option_c: "45°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: tan θ = y / x = √3 / 3 = 1 / √3.\nStep 2: θ = tan⁻¹(1 / √3) = 30°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 206,
    question: "A and B are two vectors and θ angle between them. If |A×B|=√3(A·B) value θ? [AIPMT 2007]",
    optionA: "45°",
    optionB: "30°",
    optionC: "90°",
    optionD: "60°",
    correctOption: "D",
    explanation: "Step 1: Use the standard definitions of cross and dot products for two vectors A and B with angle θ between them:\n- |A × B| = A B sin θ\n- A · B = A B cos θ\nStep 2: Substitute these into the given relation:\nA B sin θ = √3 (A B cos θ).\nStep 3: Divide both sides by A B cos θ (assuming A, B ≠ 0 and cos θ ≠ 0):\nsin θ / cos θ = √3\ntan θ = √3.\nStep 4: The value of θ in the range [0, 180°] where tan θ = √3 is:\nθ = 60°.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If for two non-zero vectors A and B, √3 |A × B| = A · B, what is the angle between them?",
      option_a: "30°",
      option_b: "60°",
      option_c: "45°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: √3 (A B sin θ) = A B cos θ.\nStep 2: sin θ / cos θ = 1 / √3 → tan θ = 1 / √3 → θ = 30°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 205,
    question: "Particle shows distance-time curve as given figure. Maximum instantaneous velocity particle around point? [AIPMT 2008]",
    optionA: "D",
    optionB: "A",
    optionC: "B",
    optionD: "C",
    correctOption: "D",
    explanation: "Step 1: On a distance-time (s–t) graph, the instantaneous velocity at any point is given by the slope of the tangent to the curve at that point:\nv = ds / dt = tan θ,\nwhere θ is the angle the tangent makes with the horizontal time axis.\nStep 2: A steeper tangent corresponds to a larger value of tan θ and thus a higher instantaneous velocity.\nStep 3: Observing the curvature of the standard AIPMT 2008 distance-time plot:\n- At point A: The curve has a low, gentle slope.\n- At point B: The slope is moderate.\n- At point C: The curve is steepest (inflection point with maximum slope).\n- At point D: The curve flattens out, so the slope approaches zero.\nStep 4: Since the tangent at point C has the maximum inclination θ, the instantaneous velocity is maximum around point C.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "On a displacement-time graph, a particle has zero instantaneous velocity at the point where:",
      option_a: "The tangent to the curve is parallel to the time axis",
      option_b: "The tangent to the curve is perpendicular to the time axis",
      option_c: "The curve intersects the displacement axis",
      option_d: "The slope of the curve is maximum",
      correct_option: "A",
      explanation: "Step 1: Instantaneous velocity is the derivative v = ds / dt = slope of tangent.\nStep 2: A horizontal tangent parallel to the time axis has slope = 0, representing v = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

