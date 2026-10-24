const fs = require('fs');

const set7Part2Updates = [
  {
    id: 4903, // Q53
    similar_question: {
      question: "A variable force of magnitude F(x) = C x² acts at a constant angle of 60° to the x-axis. What is the work done by this force in displacing a particle along the x-axis from x = 0 to x = L?",
      option_a: "C L³ / 6",
      option_b: "C L³ / 3",
      option_c: "C L² / 2",
      option_d: "C L³ / 4",
      correct_option: "A",
      explanation: "Step 1: The component of force along the direction of displacement (x-axis) is:\nF_x = F cos 60° = (C x²) × (1 / 2) = (1 / 2) C x².\n\nStep 2: Calculate work done by integrating F_x dx from 0 to L:\nW = ∫₀ᴸ F_x dx = (1 / 2) C ∫₀ᴸ x² dx = (1 / 2) C [x³ / 3]₀ᴸ = C L³ / 6.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4904, // Q54
    similar_question: {
      question: "A particle moves along the x-axis under the action of a force whose magnitude is 6 N from x = 0 to x = 4 m, decreases linearly to zero at x = 8 m, and remains zero up to x = 12 m. What is the total work done by this force from x = 0 to x = 12 m?",
      option_a: "36 J",
      option_b: "24 J",
      option_c: "48 J",
      option_d: "18 J",
      correct_option: "A",
      explanation: "Step 1: Work done is equal to the total area under the F-x curve from x = 0 to x = 12 m.\n\nStep 2: Segment from x = 0 to x = 4 m (rectangle):\nArea₁ = 6 N × 4 m = 24 J.\n\nStep 3: Segment from x = 4 to x = 8 m (triangle):\nArea₂ = (1 / 2) × (8 − 4) m × 6 N = (1 / 2) × 4 × 6 = 12 J.\n\nStep 4: Segment from x = 8 to x = 12 m has F = 0, so Area₃ = 0 J.\nTotal work W = 24 + 12 + 0 = 36 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4905, // Q55
    similar_question: {
      question: "A constant force F⃗ = (5î + 2ĵ) N acts on a body and moves it from position r⃗₁ = (î − 3ĵ) m to position r⃗₂ = (4î + ĵ + 2k̂) m. What is the work done by the force?",
      option_a: "23 J",
      option_b: "15 J",
      option_c: "8 J",
      option_d: "31 J",
      correct_option: "A",
      explanation: "Step 1: Find the displacement vector Δr⃗:\nΔr⃗ = r⃗₂ − r⃗₁ = (4 − 1)î + [1 − (−3)]ĵ + (2 − 0)k̂ = (3î + 4ĵ + 2k̂) m.\n\nStep 2: Calculate work done using dot product W = F⃗ · Δr⃗:\nW = (5)(3) + (2)(4) + (0)(2) = 15 + 8 + 0 = 23 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4906, // Q56
    similar_question: {
      question: "A force F⃗ = (2î + 4ĵ) N acts on a particle of mass 3 kg as it moves from r⃗₁ = (3î + k̂) m to r⃗₂ = (5î + 2ĵ − 2k̂) m. What is the total work done by the force?",
      option_a: "12 J",
      option_b: "8 J",
      option_c: "16 J",
      option_d: "4 J",
      correct_option: "A",
      explanation: "Step 1: Displacement vector:\nΔr⃗ = r⃗₂ − r⃗₁ = (5 − 3)î + (2 − 0)ĵ + (−2 − 1)k̂ = (2î + 2ĵ − 3k̂) m.\n\nStep 2: Work done W = F⃗ · Δr⃗:\nW = (2)(2) + (4)(2) + (0)(−3) = 4 + 8 + 0 = 12 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4907, // Q57
    similar_question: {
      question: "A position-dependent force F(x) increases linearly from 0 N at x = 0 to 10 N at x = 2 m, and then remains constant at 10 N from x = 2 m to x = 5 m. What is the total work done by the force between x = 0 and x = 5 m?",
      option_a: "40 J",
      option_b: "50 J",
      option_c: "30 J",
      option_d: "25 J",
      correct_option: "A",
      explanation: "Step 1: Area from x = 0 to x = 2 m (triangular region):\nArea₁ = (1 / 2) × base × height = (1 / 2) × 2 × 10 = 10 J.\n\nStep 2: Area from x = 2 to x = 5 m (rectangular region):\nArea₂ = width × height = (5 − 2) × 10 = 3 × 10 = 30 J.\n\nStep 3: Total work done:\nW = Area₁ + Area₂ = 10 + 30 = 40 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4908, // Q58
    similar_question: {
      question: "A particle of mass 1 kg initially at rest at x = 0 is acted upon by a net force that decreases linearly from F = 8 N at x = 0 to F = 2 N at x = 3 m. What is the kinetic energy of the particle at x = 3 m?",
      option_a: "15 J",
      option_b: "10 J",
      option_c: "20 J",
      option_d: "7.5 J",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem, K_final − K_initial = W_net.\nSince the particle starts from rest, K_initial = 0, so K_final = W_net.\n\nStep 2: Work done equals area under the trapezoidal F-x curve:\nW = (1 / 2) × (F_initial + F_final) × Δx = (1 / 2) × (8 + 2) × 3 = (1 / 2) × 10 × 3 = 15 J.\n\nStep 3: Kinetic energy K_final = 15 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4909, // Q59
    similar_question: {
      question: "A light cable is used to pull a crate of mass m vertically upwards through a height h with a constant upward acceleration of g / 4. What is the work done by the tension force in the cable on the crate?",
      option_a: "(5/4) m g h",
      option_b: "(3/4) m g h",
      option_c: "m g h",
      option_d: "(1/4) m g h",
      correct_option: "A",
      explanation: "Step 1: Upward equation of motion:\nT − m g = m a = m (g / 4)  →  T = m g + m g / 4 = (5/4) m g.\n\nStep 2: Tension acts upward and displacement is upward (θ = 0°):\nW = T × h × cos 0° = (5/4) m g h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4910, // Q60
    similar_question: {
      question: "A small block is pulled along a quarter-circular frictionless vertical track of radius R from the lowest point A to the highest point B by a force of constant magnitude F that is directed horizontally at all times. What is the work done by this horizontal force?",
      option_a: "F R",
      option_b: "F R / 2",
      option_c: "π F R / 2",
      option_d: "2 F R",
      correct_option: "A",
      explanation: "Step 1: Since the force is purely horizontal with constant magnitude F, work done is:\nW = ∫ F⃗ · dr⃗ = ∫ F_x dx + ∫ F_y dy = F ∫ dx + 0 = F Δx.\n\nStep 2: For a quarter-circular track of radius R from the lowest to highest point, the horizontal displacement is Δx = R.\n\nStep 3: Therefore, work done W = F R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4911, // Q61
    similar_question: {
      question: "Which of the following statements is correct regarding the work done by the force of friction on a body?",
      option_a: "It can be positive, negative, or zero depending on the frame of reference and the direction of displacement",
      option_b: "It is strictly always negative",
      option_c: "It is strictly always positive",
      option_d: "It is always zero for static friction",
      correct_option: "A",
      explanation: "Step 1: When friction opposes relative sliding motion, it does negative work on that body.\n\nStep 2: When static friction accelerates a body forward (such as a box in an accelerating truck), the force and displacement are in the same direction, doing positive work.\n\nStep 3: When there is no displacement of the contact surface (such as pure rolling without slip), static friction does zero work. Thus, work done by friction can be positive, negative, or zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4912, // Q62
    similar_question: {
      question: "A particle moves along the x-axis from x = 0 to x = 2 m under the action of a force F(x) = (6x² − 4x + 3) N. What is the total work done by this force?",
      option_a: "14 J",
      option_b: "20 J",
      option_c: "8 J",
      option_d: "28 J",
      correct_option: "A",
      explanation: "Step 1: Calculate work by integrating F(x) dx:\nW = ∫₀² (6x² − 4x + 3) dx.\n\nStep 2: Find antiderivative:\n∫ (6x² − 4x + 3) dx = 2x³ − 2x² + 3x.\n\nStep 3: Evaluate limits:\nW = [2(2)³ − 2(2)² + 3(2)] − 0 = [2(8) − 2(4) + 6] = 16 − 8 + 6 = 14 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4913, // Q63
    similar_question: {
      question: "A force F(x) = (5 − 4x + 3x²) N acts on a particle moving along the x-axis. What is the work done by this force in displacing the particle from x = 0 to x = 3 m?",
      option_a: "24 J",
      option_b: "36 J",
      option_c: "18 J",
      option_d: "42 J",
      correct_option: "A",
      explanation: "Step 1: Integrate force over displacement:\nW = ∫₀³ (5 − 4x + 3x²) dx.\n\nStep 2: Find antiderivative:\n[5x − 2x² + x³]₀³.\n\nStep 3: Evaluate from 0 to 3:\nW = 5(3) − 2(3)² + (3)³ = 15 − 18 + 27 = 24 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4914, // Q64
    similar_question: {
      question: "A body of mass 1 kg moves along the x-axis such that its velocity varies with position according to v(x) = 2 x² (in SI units). What is the work done by the net force acting on the body as it moves from x = 1 m to x = 2 m?",
      option_a: "30 J",
      option_b: "60 J",
      option_c: "15 J",
      option_d: "45 J",
      correct_option: "A",
      explanation: "Step 1: Find velocity at x = 1 m:\nv₁ = 2(1)² = 2 m/s.\n\nStep 2: Find velocity at x = 2 m:\nv₂ = 2(2)² = 8 m/s.\n\nStep 3: By work-energy theorem, W = ΔK:\nW = (1/2) m (v₂² − v₁²) = (1/2) × 1 × (8² − 2²) = (1/2) × (64 − 4) = 30 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4915, // Q65
    similar_question: {
      question: "Consider the following statements regarding work done by various forces:\n(1) Work done by gravity on a bucket being lifted vertically upwards is negative.\n(2) Work done by air resistance on an oscillating pendulum bob is always negative.\n(3) Work done by the normal contact force on a block sliding down a fixed incline is zero.\nWhich of the statements given above are correct?",
      option_a: "(1), (2), and (3)",
      option_b: "(1) and (2) only",
      option_c: "(2) and (3) only",
      option_d: "(1) only",
      correct_option: "A",
      explanation: "Step 1: Gravity acts vertically downwards while displacement is upward (θ = 180°), so W_g = −m g h < 0  →  (1) is correct.\n\nStep 2: Air resistance always opposes the instantaneous velocity vector (θ = 180°), so dW = −F_air ds < 0 at all times  →  (2) is correct.\n\nStep 3: On a stationary inclined plane, the normal reaction is perpendicular to the sliding surface (θ = 90°), so W_N = 0  →  (3) is correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4916, // Q66
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The work done by the normal reaction force exerted by the steps on the feet of a person climbing a staircase is zero.\nReason (R): The point of application of the normal reaction force does not undergo any displacement while that normal force is acting.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: When a person climbs stairs, a foot in contact with a step remains stationary on the step while supporting the body's weight.\n\nStep 2: Because the point of contact does not move while bearing the normal force, the displacement of the point of application is zero (ds = 0).\n\nStep 3: When the foot is lifted and displaced, the normal force on it is zero. Hence, total work done by the normal reaction force is zero. Both Assertion and Reason are true, and Reason correctly explains Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4917, // Q67
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): When a pedestrian walks forward on a rough horizontal pavement, the work done by the static friction force exerted by the ground on the pedestrian's feet is zero.\nReason (R): The foot in contact with the ground does not slip, so the displacement of the point of application of static friction during contact is zero.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: In normal walking without slipping, static friction provides the necessary horizontal reaction force directed forward on the rear foot.\n\nStep 2: The point of application of this static friction force is the bottom of the shoe, which remains instantaneously at rest relative to the ground while in contact.\n\nStep 3: Since displacement of the point of application is zero during contact (d = 0), work done by static friction is W = F × 0 = 0. Thus, Assertion and Reason are both true, and Reason is the correct explanation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4918, // Q68
    similar_question: {
      question: "Consider the following two statements:\nStatement-I: A heavy truck and a light car having equal kinetic energies are brought to rest by applying equal retarding braking forces. Both vehicles will travel equal stopping distances before coming to rest.\nStatement-II: When a car rounds a circular bend at constant speed, its acceleration is zero because its speed does not change.",
      option_a: "Statement-I is correct but Statement-II is incorrect",
      option_b: "Statement-I is incorrect but Statement-II is correct",
      option_c: "Both Statement-I and Statement-II are correct",
      option_d: "Both Statement-I and Statement-II are incorrect",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem, W_retarding = ΔK  →  F_brake × s = K. Since both vehicles have identical K and experience identical retarding force F_brake, stopping distance s = K / F_brake is identical. Statement-I is correct.\n\nStep 2: When a car moves along a curved path, the direction of velocity continuously changes, producing a non-zero centripetal acceleration a_c = v² / R. Thus acceleration is not zero. Statement-II is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4919, // Q69
    similar_question: {
      question: "A block of mass m rests on the floor of an elevator that accelerates vertically upwards from rest with a constant acceleration of g / 3. What is the work done by the normal contact force on the block in time t?",
      option_a: "(2/9) m g² t²",
      option_b: "(1/6) m g² t²",
      option_c: "(4/9) m g² t²",
      option_d: "(1/3) m g² t²",
      correct_option: "A",
      explanation: "Step 1: Normal reaction force on the block:\nN − m g = m a = m (g / 3)  →  N = (4/3) m g.\n\nStep 2: Vertical displacement in time t starting from rest:\ns = (1/2) a t² = (1/2) (g / 3) t² = g t² / 6.\n\nStep 3: Work done by normal force:\nW = N × s = [(4/3) m g] × [g t² / 6] = (4/18) m g² t² = (2/9) m g² t².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4920, // Q70
    similar_question: {
      question: "A block of mass 10 kg is pulled along a rough horizontal floor (coefficient of friction μ = 0.4) through a distance of 4 m by a horizontal force of 60 N. Taking g = 10 m/s², what is the net work done on the block?",
      option_a: "80 J",
      option_b: "240 J",
      option_c: "160 J",
      option_d: "40 J",
      correct_option: "A",
      explanation: "Step 1: Work done by applied horizontal force:\nW_F = F × s = 60 N × 4 m = 240 J.\n\nStep 2: Frictional force opposing motion:\nf_k = μ m g = 0.4 × 10 kg × 10 m/s² = 40 N.\nWork done by friction:\nW_f = −f_k × s = −40 N × 4 m = −160 J.\n\nStep 3: Net work done on the block:\nW_net = W_F + W_f = 240 − 160 = 80 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4921, // Q71
    similar_question: {
      question: "A constant force F⃗ = (2î + 3ĵ − 4k̂) N acts on a particle as it moves along path 1 from point P(0,0,0) to Q(2,1,3) m, and then along path 2 back to P(0,0,0). Which of the following statements is INCORRECT?",
      option_a: "The work done by this force along a closed path is non-zero",
      option_b: "The force F⃗ is a conservative force",
      option_c: "The work done by F⃗ depends only on initial and final positions",
      option_d: "The work done along the closed path P → Q → P is exactly zero",
      correct_option: "A",
      explanation: "Step 1: Any spatially constant force vector has zero curl: ∇ × F⃗ = 0, meaning it is strictly conservative.\n\nStep 2: For any conservative force field, the work done along any arbitrary closed loop is identically zero: ∮ F⃗ · dr⃗ = 0.\n\nStep 3: Therefore, the statement claiming the work along a closed path is non-zero is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4922, // Q72
    similar_question: {
      question: "A block of mass m is pushed up an inclined plane through a distance s along the incline, thereby gaining a vertical height h. What is the work done by the gravitational force on the block during this displacement?",
      option_a: "−m g h",
      option_b: "+m g h",
      option_c: "−m g s",
      option_d: "+m g s sin θ",
      correct_option: "A",
      explanation: "Step 1: Gravity is a conservative force directed vertically downward with magnitude m g.\n\nStep 2: The vertical component of displacement is directed vertically upward with magnitude h.\n\nStep 3: Work done by gravity:\nW_g = F_g × h × cos 180° = −m g h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4923, // Q73
    similar_question: {
      question: "A stylus is pressed against a flat horizontal surface with a constant normal pressing force N and moved to draw a circle of radius R. If the kinetic friction coefficient between the stylus tip and the surface is μ_k, what is the work done by the frictional force during one complete circular trace?",
      option_a: "−2π R μ_k N",
      option_b: "Zero",
      option_c: "−π R² μ_k N",
      option_d: "+2π R μ_k N",
      correct_option: "A",
      explanation: "Step 1: The kinetic friction force always opposes the instantaneous tangential motion: f_k = μ_k N, with angle θ = 180° to ds.\n\nStep 2: Total distance travelled along the circular circumference is s = 2π R.\n\nStep 3: Work done by kinetic friction:\nW = −f_k × s = −(μ_k N)(2π R) = −2π R μ_k N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4924, // Q74
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The work done by static friction on an object can be positive.\nReason (R): When a block placed on a flatbed accelerating truck moves forward with the truck without slipping, static friction provides the forward accelerating force and does positive work on the block.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Friction opposes relative motion between surfaces, not necessarily absolute motion.\n\nStep 2: In an accelerating vehicle, static friction acts on a resting cargo box in the forward direction of motion.\n\nStep 3: Since force and displacement vectors are in the same direction, work done by static friction is W = f_s × d > 0. Hence both Assertion and Reason are true, and Reason is the correct explanation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4925, // Q75
    similar_question: {
      question: "A block of mass m is dragged over a horizontal rough floor (kinetic friction coefficient μ_k) through a displacement d by a force F applied at an angle θ above the horizontal. What is the work done by the friction force on the block?",
      option_a: "−μ_k (m g − F sin θ) d",
      option_b: "−μ_k (m g + F sin θ) d",
      option_c: "+μ_k (m g − F sin θ) d",
      option_d: "−μ_k m g d",
      correct_option: "A",
      explanation: "Step 1: Vertical force balance for the block:\nN + F sin θ = m g  →  N = m g − F sin θ.\n\nStep 2: Kinetic friction force opposing horizontal displacement:\nf_k = μ_k N = μ_k (m g − F sin θ).\n\nStep 3: Work done by friction:\nW_f = −f_k × d = −μ_k (m g − F sin θ) d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4926, // Q76
    similar_question: {
      question: "A block of mass m rests on a rough incline of angle θ fixed inside an elevator. The elevator moves vertically downward with a constant speed v. If the block remains stationary relative to the incline, what is the work done by the friction force on the block in time t?",
      option_a: "−m g v t sin²θ",
      option_b: "+m g v t sin²θ",
      option_c: "−m g v t cos²θ",
      option_d: "−m g v t",
      correct_option: "A",
      explanation: "Step 1: Since the block does not slide, static friction acts up the inclined plane: f = m g sin θ.\n\nStep 2: The elevator moves vertically downward through distance s = v t.\nThe angle between the upward incline vector and the downward vertical is (90° + θ).\n\nStep 3: Work done by friction:\nW = f × s × cos(90° + θ) = (m g sin θ) × (v t) × (−sin θ) = −m g v t sin²θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4927, // Q77
    similar_question: {
      question: "In a system of two blocks connected by a light inextensible string passing over a fixed frictionless pulley, block A descends while block B ascends. What is the net work done by the tension force on the combined two-block system?",
      option_a: "Zero",
      option_b: "Positive",
      option_c: "Negative",
      option_d: "Depends on the mass ratio",
      correct_option: "A",
      explanation: "Step 1: The tension T in an ideal inextensible string has uniform magnitude throughout.\n\nStep 2: When block A moves downward by distance s, tension opposes motion, doing work W_A = −T s.\n\nStep 3: Simultaneously, block B moves upward by the same distance s, with tension along motion, doing work W_B = +T s.\n\nStep 4: Net work done on the system by tension: W_net = −T s + T s = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4928, // Q78
    similar_question: {
      question: "The work done in stretching an ideal spring by an initial distance x₀ from its unstretched length is W₀. What is the additional work required to stretch it by another distance x₀ (from x₀ to 2x₀)?",
      option_a: "3 W₀",
      option_b: "W₀",
      option_c: "2 W₀",
      option_d: "4 W₀",
      correct_option: "A",
      explanation: "Step 1: Work done to stretch from 0 to x₀:\nW₀ = (1 / 2) k x₀².\n\nStep 2: Total work done to stretch from 0 to 2x₀:\nW_total = (1 / 2) k (2x₀)² = (1 / 2) k (4 x₀²) = 4 W₀.\n\nStep 3: Additional work required:\nΔW = W_total − W₀ = 4 W₀ − W₀ = 3 W₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4929, // Q79
    similar_question: {
      question: "Consider the following two statements:\nStatement-I: The work done by a particular force on a body depends solely on that force and the displacement of its point of application, irrespective of other forces simultaneously acting on the body.\nStatement-II: Two particles of identical mass and identical kinetic energy must have identical linear momentum vectors.",
      option_a: "Statement-I is correct but Statement-II is incorrect",
      option_b: "Statement-I is incorrect but Statement-II is correct",
      option_c: "Both Statement-I and Statement-II are correct",
      option_d: "Both Statement-I and Statement-II are incorrect",
      correct_option: "A",
      explanation: "Step 1: Work done by an individual force is defined as W = ∫ F⃗ · dr⃗, which depends strictly on that specific force and displacement, making Statement-I correct.\n\nStep 2: Kinetic energy depends only on the speed: K = (1/2) m v². Linear momentum is a vector: p⃗ = m v⃗. Two particles with the same speed can move in different directions, so their momentum vectors need not be identical. Statement-II is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4930, // Q80
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): Two particles having equal masses and equal kinetic energies necessarily have identical momentum vectors.\nReason (R): Kinetic energy is a scalar quantity depending only on speed, whereas linear momentum is a vector quantity that depends on both magnitude and direction of velocity.",
      option_a: "Assertion is false but Reason is true",
      option_b: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_c: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_d: "Assertion is true but Reason is false",
      correct_option: "A",
      explanation: "Step 1: Equal kinetic energies and equal masses guarantee equal speeds: v₁ = v₂, so magnitudes of momentum are equal (|p⃗₁| = |p⃗₂|).\n\nStep 2: However, since linear momentum is a vector, particles moving in different directions have different momentum vectors. Thus Assertion is false.\n\nStep 3: Reason accurately states the definitions and nature of kinetic energy and momentum, so Reason is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4931, // Q81
    similar_question: {
      question: "Two moving bodies A and B have equal magnitudes of linear momentum. If the ratio of their kinetic energies is K_A / K_B = 9 : 1, what is the ratio of their masses m_A / m_B?",
      option_a: "1 : 9",
      option_b: "9 : 1",
      option_c: "1 : 3",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "Step 1: Relation between kinetic energy, momentum, and mass:\nK = p² / (2m)  →  m = p² / (2K).\n\nStep 2: Since momentum p is identical for both bodies:\nm_A / m_B = (p² / 2K_A) / (p² / 2K_B) = K_B / K_A.\n\nStep 3: Substitute K_A / K_B = 9 / 1:\nm_A / m_B = 1 / 9 = 1 : 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4932, // Q82
    similar_question: {
      question: "A stationary nucleus of mass M decays into two fragments of masses m₁ and m₂ that fly off in opposite directions. What is the ratio of their kinetic energies K₁ / K₂?",
      option_a: "m₂ / m₁",
      option_b: "m₁ / m₂",
      option_c: "√(m₂ / m₁)",
      option_d: "(m₂ / m₁)²",
      correct_option: "A",
      explanation: "Step 1: Since the parent nucleus was at rest, linear momentum is conserved:\np⃗₁ + p⃗₂ = 0  →  |p₁| = |p₂| = p.\n\nStep 2: Kinetic energy in terms of momentum:\nK₁ = p² / (2m₁),  K₂ = p² / (2m₂).\n\nStep 3: Ratio of kinetic energies:\nK₁ / K₂ = (p² / 2m₁) / (p² / 2m₂) = m₂ / m₁.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4933, // Q83
    similar_question: {
      question: "Two bodies of masses m₁ and m₂ possess identical kinetic energy. If p₁ and p₂ denote their respective linear momenta, what is the ratio p₁ / p₂?",
      option_a: "√(m₁ / m₂)",
      option_b: "m₁ / m₂",
      option_c: "m₂ / m₁",
      option_d: "(m₁ / m₂)²",
      correct_option: "A",
      explanation: "Step 1: Express momentum in terms of kinetic energy K:\np = √(2 m K).\n\nStep 2: For equal kinetic energy K₁ = K₂ = K:\np₁ = √(2 m₁ K),  p₂ = √(2 m₂ K).\n\nStep 3: Ratio:\np₁ / p₂ = √(2 m₁ K) / √(2 m₂ K) = √(m₁ / m₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4934, // Q84
    similar_question: {
      question: "A particle moves with a speed v such that its kinetic energy and magnitude of linear momentum are numerically equal in SI units. What is the value of v?",
      option_a: "2 m/s",
      option_b: "1 m/s",
      option_c: "4 m/s",
      option_d: "0.5 m/s",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy K = (1/2) m v².\nMomentum p = m v.\n\nStep 2: Equate numerically:\n(1/2) m v² = m v.\n\nStep 3: Assuming m ≠ 0 and v ≠ 0:\n(1/2) v = 1  →  v = 2 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4935, // Q85
    similar_question: {
      question: "A jogger increases their running speed by 3 m/s, causing their kinetic energy to double. What was the initial speed of the jogger?",
      option_a: "(3 + 3√2) m/s",
      option_b: "(2 + 2√2) m/s",
      option_c: "3√2 m/s",
      option_d: "6 m/s",
      correct_option: "A",
      explanation: "Step 1: Express the condition mathematically:\nK₂ = 2 K₁  →  (1/2) m (v + 3)² = 2 × [(1/2) m v²].\n\nStep 2: Simplify equation:\n(v + 3)² = 2 v²  →  v + 3 = √2 v.\n\nStep 3: Solve for v:\n√2 v − v = 3  →  (√2 − 1) v = 3\nv = 3 / (√2 − 1) = 3 (√2 + 1) / (2 − 1) = (3 + 3√2) m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4936, // Q86
    similar_question: {
      question: "If the kinetic energy of a moving particle increases by 69%, what is the percentage increase in its linear momentum?",
      option_a: "30%",
      option_b: "20%",
      option_c: "34.5%",
      option_d: "69%",
      correct_option: "A",
      explanation: "Step 1: Relate new kinetic energy to initial kinetic energy:\nK₂ = K₁ + 0.69 K₁ = 1.69 K₁.\n\nStep 2: Relate momentum to kinetic energy (p ∝ √K):\np₂ / p₁ = √(K₂ / K₁) = √1.69 = 1.30.\n\nStep 3: Compute percentage increase in momentum:\nPercentage increase = [(p₂ − p₁) / p₁] × 100% = (1.30 − 1) × 100% = 30%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4937, // Q87
    similar_question: {
      question: "When the linear momentum of a body is increased by 100%, what is the percentage increase in its kinetic energy?",
      option_a: "300%",
      option_b: "100%",
      option_c: "200%",
      option_d: "400%",
      correct_option: "A",
      explanation: "Step 1: New momentum:\np₂ = p₁ + 1.00 p₁ = 2 p₁.\n\nStep 2: Kinetic energy varies as the square of momentum (K ∝ p²):\nK₂ / K₁ = (p₂ / p₁)² = (2)² = 4  →  K₂ = 4 K₁.\n\nStep 3: Percentage increase in kinetic energy:\nPercentage increase = [(K₂ − K₁) / K₁] × 100% = [(4 K₁ − K₁) / K₁] × 100% = 300%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4938, // Q88
    similar_question: {
      question: "A body of mass m, initially at rest, is acted upon by a constant net force F over a displacement s. The kinetic energy gained by the body is:",
      option_a: "Directly proportional to displacement s and independent of m",
      option_b: "Inversely proportional to m",
      option_c: "Directly proportional to m²",
      option_d: "Independent of displacement s",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem:\nΔK = W_net = F × s.\n\nStep 2: Since the body starts from rest (K_initial = 0):\nK_final = F × s.\n\nStep 3: For a given constant force F, the kinetic energy is directly proportional to displacement s and completely independent of the mass m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4939, // Q89
    similar_question: {
      question: "A body of mass 3 kg moves along the x-axis such that its position is given by x(t) = t² / 4 (in metres). What is the work done by the net force during the first 4 seconds?",
      option_a: "6 J",
      option_b: "12 J",
      option_c: "3 J",
      option_d: "24 J",
      correct_option: "A",
      explanation: "Step 1: Differentiate position to find velocity:\nv(t) = dx/dt = (2t) / 4 = t / 2 m/s.\n\nStep 2: Evaluate velocities at initial and final times:\nAt t = 0: v(0) = 0 m/s.\nAt t = 4 s: v(4) = 4 / 2 = 2 m/s.\n\nStep 3: Work done by net force equals change in kinetic energy:\nW = (1/2) m [v(4)² − v(0)²] = (1/2) × 3 × [2² − 0] = (1/2) × 3 × 4 = 6 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4940, // Q90
    similar_question: {
      question: "A particle of mass 2 kg moves along the x-axis with its position given by x(t) = (3t² + 2) m. What is the work done by all forces on the particle between t = 0 and t = 2 s?",
      option_a: "144 J",
      option_b: "72 J",
      option_c: "288 J",
      option_d: "36 J",
      correct_option: "A",
      explanation: "Step 1: Find velocity by differentiating position:\nv(t) = dx/dt = 6t m/s.\n\nStep 2: Evaluate velocity at the limits:\nAt t = 0: v₁ = 0 m/s.\nAt t = 2 s: v₂ = 6(2) = 12 m/s.\n\nStep 3: Apply the work-energy theorem:\nW = ΔK = (1/2) m (v₂² − v₁²) = (1/2) × 2 × (12² − 0) = 144 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4941, // Q91
    similar_question: {
      question: "A particle of mass 4 kg moves along a straight line with velocity varying with position as v = b √x, where b is a constant. What is the work done by the net force as the particle moves from x = 0 to x = 9 m?",
      option_a: "18 b²",
      option_b: "9 b²",
      option_c: "36 b²",
      option_d: "6 b²",
      correct_option: "A",
      explanation: "Step 1: Find initial and final velocities:\nAt x = 0: v₁ = b √0 = 0.\nAt x = 9 m: v₂ = b √9 = 3b.\n\nStep 2: Apply the work-energy theorem (W = ΔK):\nW = (1/2) m (v₂² − v₁²) = (1/2) × 4 × [(3b)² − 0] = 2 × 9 b² = 18 b².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4942, // Q92
    similar_question: {
      question: "A particle of mass m starts from rest at the origin and moves along the x-axis with velocity related to position by v = c √x, where c is a constant. What is the work done by the net force during the first t seconds?",
      option_a: "m c⁴ t² / 8",
      option_b: "m c² t² / 4",
      option_c: "m c⁴ t² / 4",
      option_d: "m c² t⁴ / 8",
      correct_option: "A",
      explanation: "Step 1: Solve differential equation for displacement:\nv = dx/dt = c √x  →  x^(−1/2) dx = c dt.\nIntegrating with x = 0 at t = 0:\n2 √x = c t  →  x = c² t² / 4.\n\nStep 2: Find velocity at time t:\nv = dx/dt = 2 c² t / 4 = c² t / 2.\n\nStep 3: Work done equals kinetic energy at time t:\nW = (1/2) m v² = (1/2) m (c² t / 2)² = m c⁴ t² / 8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4943, // Q93
    similar_question: {
      question: "A bullet loses 1/10th of its velocity on penetrating a wooden plank of thickness d. Assuming the wood exerts a constant resistive force, what is the minimum number of identical planks placed in a row that will completely stop the bullet?",
      option_a: "6",
      option_b: "5",
      option_c: "10",
      option_d: "8",
      correct_option: "A",
      explanation: "Step 1: Let initial speed be u. Speed after penetrating one plank:\nv₁ = u − (1/10) u = 0.9 u.\n\nStep 2: Kinetic energy lost in one plank:\nΔK₁ = (1/2) m u² − (1/2) m (0.9 u)² = (1/2) m u² [1 − 0.81] = 0.19 K₀.\n\nStep 3: Total planks n required to absorb entire initial energy K₀:\nn = K₀ / ΔK₁ = K₀ / (0.19 K₀) = 100 / 19 ≈ 5.26.\nSince planks are discrete, a minimum of 6 planks are required to stop the bullet.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4944, // Q94
    similar_question: {
      question: "A projectile of mass m is launched with initial speed u at an angle θ with the horizontal. What is the work done by gravity on the projectile from the instant of launch until it reaches the highest point of its trajectory?",
      option_a: "−(1/2) m u² sin²θ",
      option_b: "+(1/2) m u² sin²θ",
      option_c: "−(1/2) m u² cos²θ",
      option_d: "−m u² sin θ",
      correct_option: "A",
      explanation: "Step 1: Maximum vertical height reached by the projectile:\nH = u² sin²θ / (2g).\n\nStep 2: Gravity acts downward while vertical displacement H is upward:\nW_gravity = −m g H.\n\nStep 3: Substitute H:\nW_gravity = −m g [u² sin²θ / (2g)] = −(1/2) m u² sin²θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4945, // Q95
    similar_question: {
      question: "Consider the following two statements:\nStatement-I: Three identical balls are projected from the top of a cliff of height H with equal speeds v₀ in three different directions (one vertically upward, one horizontally, one vertically downward). Neglecting air resistance, all three balls strike the ground with identical speeds.\nStatement-II: In all three cases, the work done by gravity on each ball during the flight is identical and equal to m g H.",
      option_a: "Both Statement-I and Statement-II are correct, and Statement-II is the correct explanation of Statement-I",
      option_b: "Both Statement-I and Statement-II are correct, but Statement-II is NOT the correct explanation of Statement-I",
      option_c: "Statement-I is correct but Statement-II is incorrect",
      option_d: "Both Statement-I and Statement-II are incorrect",
      correct_option: "A",
      explanation: "Step 1: Gravity is a conservative force, so the work done depends only on the vertical displacement H: W_g = m g H in all cases, regardless of trajectory.\n\nStep 2: By the work-energy theorem, (1/2) m v² − (1/2) m v₀² = W_g = m g H  →  v = √(v₀² + 2 g H).\n\nStep 3: Since v₀ and H are identical for all three balls, they strike the ground with identical speeds. Thus, Statement-I and Statement-II are both true, and Statement-II correctly explains Statement-I.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4946, // Q96
    similar_question: {
      question: "A stone of mass m is dropped from rest from a height h and strikes the ground with a speed of 0.6 √(2 g h). What is the work done by air resistance during the fall?",
      option_a: "−0.64 m g h",
      option_b: "+0.64 m g h",
      option_c: "−0.36 m g h",
      option_d: "−m g h",
      correct_option: "A",
      explanation: "Step 1: Initial mechanical energy at release: E₁ = m g h.\nFinal kinetic energy on impact: K₂ = (1/2) m v².\n\nStep 2: Substitute v = 0.6 √(2 g h):\nK₂ = (1/2) m [0.36 × (2 g h)] = 0.36 m g h.\n\nStep 3: By work-energy theorem:\nW_g + W_air = ΔK  →  m g h + W_air = 0.36 m g h\nW_air = 0.36 m g h − m g h = −0.64 m g h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4947, // Q97
    similar_question: {
      question: "A block of mass 2 kg is released from rest at a height of 5 m on a smooth curved ramp. At the bottom of the ramp, it enters a rough horizontal track having a coefficient of kinetic friction μ_k = 0.2. What distance does the block travel along the rough horizontal track before coming to a stop? (Take g = 10 m/s²)",
      option_a: "25 m",
      option_b: "50 m",
      option_c: "12.5 m",
      option_d: "10 m",
      correct_option: "A",
      explanation: "Step 1: Total mechanical energy at top of ramp:\nE = m g h = 2 kg × 10 m/s² × 5 m = 100 J.\n\nStep 2: Kinetic friction on the horizontal surface:\nf_k = μ_k m g = 0.2 × 2 kg × 10 m/s² = 4 N.\n\nStep 3: Work done by friction brings the block to rest:\nf_k × d = E  →  4 × d = 100  →  d = 25 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4948, // Q98
    similar_question: {
      question: "A hailstone of mass 0.5 g falls from a height of 800 m and reaches the ground with a speed of 40 m/s. Taking g = 10 m/s², what are the work done by the gravitational force and by the air resistive force, respectively?",
      option_a: "+4.0 J and −3.60 J",
      option_b: "+4.0 J and −4.0 J",
      option_c: "+3.60 J and −0.40 J",
      option_d: "−4.0 J and +3.60 J",
      correct_option: "A",
      explanation: "Step 1: Mass m = 0.5 g = 0.5 × 10⁻³ kg.\nWork done by gravity:\nW_g = m g h = (0.5 × 10⁻³ kg) × 10 m/s² × 800 m = +4.0 J.\n\nStep 2: Change in kinetic energy:\nΔK = (1/2) m v² − 0 = (1/2) × (0.5 × 10⁻³ kg) × (40 m/s)² = 0.25 × 10⁻³ × 1600 = +0.40 J.\n\nStep 3: Work done by air resistance:\nW_g + W_air = ΔK  →  4.0 + W_air = 0.40  →  W_air = 0.40 − 4.0 = −3.60 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4949, // Q99
    similar_question: {
      question: "A simple pendulum of length L has a bob released from rest at an angle θ₁ with the vertical. In a second experiment, it is released from rest at an angle θ₂ with the vertical. What is the ratio of the speeds v₁ / v₂ of the bob as it passes through the lowest equilibrium position?",
      option_a: "√[(1 − cos θ₁) / (1 − cos θ₂)]",
      option_b: "(1 − cos θ₁) / (1 − cos θ₂)",
      option_c: "√[(cos θ₁) / (cos θ₂)]",
      option_d: "(sin θ₁) / (sin θ₂)",
      correct_option: "A",
      explanation: "Step 1: Vertical height descended from angular release θ:\nh = L − L cos θ = L (1 − cos θ).\n\nStep 2: By conservation of mechanical energy:\n(1/2) m v² = m g h  →  v = √(2 g h) = √[2 g L (1 − cos θ)].\n\nStep 3: Compute speed ratio:\nv₁ / v₂ = √[2 g L (1 − cos θ₁)] / √[2 g L (1 − cos θ₂)] = √[(1 − cos θ₁) / (1 − cos θ₂)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4950, // Q100
    similar_question: {
      question: "The bob of a simple pendulum is pulled aside until it rises to a vertical height H above its lowest equilibrium position and is then released from rest. Neglecting air resistance, what is the speed of the bob as it passes through its lowest equilibrium position?",
      option_a: "√(2 g H)",
      option_b: "2 g H",
      option_c: "√(g H)",
      option_d: "2 √(g H)",
      correct_option: "A",
      explanation: "Step 1: Potential energy at release position (taking lowest position as reference PE = 0):\nU_initial = m g H,  K_initial = 0.\n\nStep 2: Mechanical energy at lowest position:\nU_final = 0,  K_final = (1/2) m v².\n\nStep 3: Apply conservation of mechanical energy:\n(1/2) m v² = m g H  →  v = √(2 g H).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4951, // Q101
    similar_question: {
      question: "A body of mass m is released from the top of a rough hill of height h and slides down along a curved path to come to rest on a horizontal stretch. If the minimum work required by an external tangential force to haul the body slowly back up the hill along the same trajectory is W_ext, what is W_ext in terms of m g h?",
      option_a: "2 m g h",
      option_b: "m g h",
      option_c: "3 m g h",
      option_d: "4 m g h",
      correct_option: "A",
      explanation: "Step 1: For the downward descent starting from rest and ending at rest (ΔK = 0):\nW_g + W_f = 0  →  m g h + W_f = 0  →  W_f = −m g h.\nThus, work done against friction on the path is m g h.\n\nStep 2: For hauling the body slowly back up along the same path (ΔK = 0):\nW_ext + W_g + W_f = 0.\nHere W_g = −m g h (against gravity) and W_f = −m g h (against friction).\n\nStep 3: Solve for W_ext:\nW_ext − m g h − m g h = 0  →  W_ext = 2 m g h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4952, // Q102
    similar_question: {
      question: "A small block is released from rest at the top of a smooth incline of length L inclined at an angle θ to the horizontal. At the bottom, it transitions smoothly onto a rough horizontal surface and slides a distance s before coming to rest. What is the coefficient of kinetic friction μ_k of the horizontal surface?",
      option_a: "(L sin θ) / s",
      option_b: "(L cos θ) / s",
      option_c: "(L sin θ) / (2s)",
      option_d: "(L tan θ) / s",
      correct_option: "A",
      explanation: "Step 1: Height descended on the incline: h = L sin θ.\nTotal initial potential energy: E_initial = m g h = m g L sin θ.\n\nStep 2: On the horizontal track, kinetic friction opposes motion with force f_k = μ_k m g.\nWork done by friction over distance s is W_f = −μ_k m g s.\n\nStep 3: By the work-energy theorem (net ΔK = 0):\nm g L sin θ − μ_k m g s = 0  →  μ_k = (L sin θ) / s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4953, // Q103
    similar_question: {
      question: "A particle moving in the xy-plane experiences a conservative force F⃗ = (6x î + 4y ĵ) N. What is the change in the particle's kinetic energy as it moves from (1, 1) m to (3, 2) m?",
      option_a: "30.0 J",
      option_b: "15.0 J",
      option_c: "45.0 J",
      option_d: "20.0 J",
      correct_option: "A",
      explanation: "Step 1: Calculate work done by integrating force along the path:\nW = ∫ F⃗ · dr⃗ = ∫₁³ 6x dx + ∫₁² 4y dy.\n\nStep 2: Evaluate integrals:\n∫₁³ 6x dx = [3x²]₁³ = 3(9 − 1) = 24 J.\n∫₁² 4y dy = [2y²]₁² = 2(4 − 1) = 6 J.\n\nStep 3: Total work and change in kinetic energy:\nΔK = W = 24 + 6 = 30.0 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4954, // Q104
    similar_question: {
      question: "Which of the following statements correctly characterizes potential energy in classical mechanics?\n(1) Potential energy can only be meaningfully defined for conservative force fields.\n(2) Change in potential energy is defined as the negative of the work done by internal conservative forces (ΔU = −W_c).\n(3) When kinetic energy remains unchanged, change in potential energy equals work done by external forces against conservative forces (ΔU = W_ext).",
      option_a: "All (1), (2), and (3) are correct",
      option_b: "Only (1) and (2) are correct",
      option_c: "Only (2) is correct",
      option_d: "Only (1) is correct",
      correct_option: "A",
      explanation: "Step 1: Potential energy requires that the work done be independent of path, which is only true for conservative forces  →  (1) is correct.\n\nStep 2: By definition, ΔU = −W_c = −∫ F_c · dr  →  (2) is correct.\n\nStep 3: When ΔK = 0, W_ext + W_c = 0  →  W_ext = −W_c = ΔU  →  (3) is correct.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 7 Part 2 (${set7Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set7Part2Updates) {
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
        console.log(`[${successCount}/${set7Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 7 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
