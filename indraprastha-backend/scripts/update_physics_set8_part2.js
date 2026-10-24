const fs = require('fs');

const set8Part2Updates = [
  {
    id: 2372, // Q53
    similar_question: {
      question: "A light horizontal lever of length 1.2 m is pivoted at a distance of 0.4 m from its left end. A load of mass 6 kg is suspended from the left end. What mass M must be suspended from the right end to maintain the lever in horizontal equilibrium?",
      option_a: "3.0 kg",
      option_b: "6.0 kg",
      option_c: "1.5 kg",
      option_d: "4.5 kg",
      correct_option: "A",
      explanation: "Step 1: Distance from pivot to left load: d₁ = 0.4 m.\nDistance from pivot to right end: d₂ = 1.2 m − 0.4 m = 0.8 m.\n\nStep 2: Balance torques about the pivot:\nm₁ g d₁ = M g d₂  →  6 kg × 0.4 m = M × 0.8 m.\n\nStep 3: Solve for M:\n2.4 = 0.8 M  →  M = 2.4 / 0.8 = 3.0 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2373, // Q54
    similar_question: {
      question: "A uniform horizontal plank of mass 10 kg and length 4 m is supported at its centre. A child of mass 30 kg sits at a distance of 1.5 m to the left of the pivot. At what distance to the right of the pivot must another child of mass 45 kg sit to balance the plank?",
      option_a: "1.0 m",
      option_b: "1.5 m",
      option_c: "2.0 m",
      option_d: "0.5 m",
      correct_option: "A",
      explanation: "Step 1: Since the pivot is at the centre of the uniform plank, the plank's own weight produces zero torque about the pivot.\n\nStep 2: Torque equilibrium about the pivot:\nm₁ g d₁ = m₂ g d₂  →  30 kg × 1.5 m = 45 kg × d₂.\n\nStep 3: Solve for d₂:\n45 = 45 d₂  →  d₂ = 1.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2374, // Q55
    similar_question: {
      question: "A couple consists of two equal, opposite, and non-collinear parallel forces acting on a rigid body. The net effect of an ideal couple on the body is:",
      option_a: "Purely rotational motion with zero translational acceleration",
      option_b: "Both translational and rotational motion",
      option_c: "Purely translational motion with zero rotation",
      option_d: "No motion of any kind",
      correct_option: "A",
      explanation: "Step 1: The net resultant force of a couple is F_net = F − F = 0, so the centre of mass experiences zero linear acceleration (a_cm = 0).\n\nStep 2: Because the lines of action do not coincide, the couple produces a non-zero net torque τ = F × d about every point in space.\n\nStep 3: Hence, a couple generates pure rotational acceleration with zero translation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2375, // Q56
    similar_question: {
      question: "Two parallel forces of magnitudes 15 N and 45 N act in the same direction at the ends P and Q of a light rod of length 2.0 m. At what distance from end P does the resultant force act?",
      option_a: "1.5 m from P",
      option_b: "1.0 m from P",
      option_c: "0.5 m from P",
      option_d: "0.75 m from P",
      correct_option: "A",
      explanation: "Step 1: Resultant force magnitude: R = 15 N + 45 N = 60 N.\n\nStep 2: Let x be the distance of the line of action of R from end P. Taking moments about P:\nR × x = F_Q × L  →  60 N × x = 45 N × 2.0 m.\n\nStep 3: Solve for x:\n60 x = 90  →  x = 1.5 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2376, // Q57
    similar_question: {
      question: "A rod of weight W rests horizontally on two knife-edge supports A and B separated by a distance d. If the centre of gravity of the rod is at a distance x from support A, what is the normal reaction force N_A exerted by support A?",
      option_a: "W (d − x) / d",
      option_b: "W x / d",
      option_c: "W d / x",
      option_d: "W (d + x) / d",
      correct_option: "A",
      explanation: "Step 1: Set up torque equilibrium about support B:\nN_A × d − W × (d − x) = 0.\n\nStep 2: Solve for N_A:\nN_A × d = W (d − x)  →  N_A = W (d − x) / d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2377, // Q58
    similar_question: {
      question: "A circular turntable starts from rest and accelerates with constant angular acceleration, reaching an angular speed of 50 revolutions/s in 6 seconds. What is the total angle (in radians) through which the turntable rotates during these 6 seconds?",
      option_a: "300π rad",
      option_b: "150π rad",
      option_c: "600π rad",
      option_d: "100π rad",
      correct_option: "A",
      explanation: "Step 1: Final angular velocity in rad/s: ω = 50 rev/s × 2π rad/rev = 100π rad/s.\n\nStep 2: For uniform angular acceleration, average angular speed is ω_avg = (ω₀ + ω) / 2 = (0 + 100π) / 2 = 50π rad/s.\n\nStep 3: Total angular displacement: θ = ω_avg × t = 50π rad/s × 6 s = 300π rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2378, // Q59
    similar_question: {
      question: "A wheel rotates with an initial angular speed of 4 rad/s and experiences a constant angular acceleration of 2.5 rad/s². What is the angular displacement (in radians) of the wheel after 4 seconds?",
      option_a: "36 rad",
      option_b: "24 rad",
      option_c: "48 rad",
      option_d: "18 rad",
      correct_option: "A",
      explanation: "Step 1: Rotational kinematic equation for angular displacement:\nθ = ω₀ t + (1/2) α t².\n\nStep 2: Substitute given values:\nθ = (4 rad/s × 4 s) + (1/2)(2.5 rad/s²)(4 s)² = 16 + 0.5 × 2.5 × 16 = 16 + 20 = 36 rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2379, // Q60
    similar_question: {
      question: "The angular position of a rotating disc about a fixed axle varies with time according to θ(t) = t³ − 9t² + 4 (where θ is in radians and t is in seconds). At what time t does the net torque acting on the disc vanish?",
      option_a: "t = 3 s",
      option_b: "t = 1.5 s",
      option_c: "t = 6 s",
      option_d: "t = 2 s",
      correct_option: "A",
      explanation: "Step 1: Differentiate position to get angular speed: ω(t) = dθ/dt = 3t² − 18t.\n\nStep 2: Differentiate again to get angular acceleration: α(t) = dω/dt = 6t − 18.\n\nStep 3: Torque τ = I α = 0 requires α(t) = 0:\n6t − 18 = 0  →  t = 3 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2380, // Q61
    similar_question: {
      question: "A wheel starting from rest accelerates uniformly and rotates through an angle of 72 rad during the first 6 seconds. What is its instantaneous angular speed at the end of these 6 seconds?",
      option_a: "24 rad/s",
      option_b: "12 rad/s",
      option_c: "18 rad/s",
      option_d: "36 rad/s",
      correct_option: "A",
      explanation: "Step 1: Find angular acceleration α:\nθ = (1/2) α t²  →  72 = (1/2) α (6)²  →  72 = 18 α  →  α = 4 rad/s².\n\nStep 2: Compute angular speed at t = 6 s:\nω = α t = 4 rad/s² × 6 s = 24 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2381, // Q62
    similar_question: {
      question: "A rotating shaft starting from rest accelerates uniformly at 3 rad/s² for 10 s, then maintains a constant angular speed for 15 s, and finally decelerates uniformly to rest in 10 s. What is the total angle turned through by the shaft?",
      option_a: "750 rad",
      option_b: "600 rad",
      option_c: "900 rad",
      option_d: "450 rad",
      correct_option: "A",
      explanation: "Step 1: Maximum speed reached: ω_max = α t₁ = 3 × 10 = 30 rad/s.\n\nStep 2: Angular displacements in each stage:\nStage 1: θ₁ = (1/2) α t₁² = (1/2) × 3 × 100 = 150 rad.\nStage 2: θ₂ = ω_max × t₂ = 30 × 15 = 450 rad.\nStage 3: θ₃ = (1/2) ω_max × t₃ = (1/2) × 30 × 10 = 150 rad.\n\nStep 3: Total angle: θ = 150 + 450 + 150 = 750 rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2382, // Q63
    similar_question: {
      question: "A motor rotor has a constant angular acceleration of 4 rad/s². Through what angle (in radians) does it turn while its angular speed increases from 12 rad/s to 20 rad/s?",
      option_a: "32 rad",
      option_b: "64 rad",
      option_c: "16 rad",
      option_d: "48 rad",
      correct_option: "A",
      explanation: "Step 1: Rotational kinematic relation: ω² = ω₀² + 2 α θ.\n\nStep 2: Substitute values:\n(20)² = (12)² + 2(4) θ  →  400 = 144 + 8 θ.\n\nStep 3: Solve for θ:\n8 θ = 400 − 144 = 256  →  θ = 32 rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2383, // Q64
    similar_question: {
      question: "A light rigid rod of length 4L is pivoted horizontally at a point distance L from its left end. A mass 2m is attached at the left end (distance L from pivot) and a mass m is attached at the right end (distance 3L from pivot). When released from rest in the horizontal position, what is the initial angular acceleration of the rod?",
      option_a: "g / (11 L)",
      option_b: "g / (5 L)",
      option_c: "2g / (11 L)",
      option_d: "g / (7 L)",
      correct_option: "A",
      explanation: "Step 1: Net torque about pivot (taking clockwise as positive):\nτ_net = (m g)(3L) − (2m g)(L) = 3 m g L − 2 m g L = m g L.\n\nStep 2: Moment of inertia about pivot:\nI = (2m)(L)² + (m)(3L)² = 2 m L² + 9 m L² = 11 m L².\n\nStep 3: Initial angular acceleration:\nα = τ_net / I = (m g L) / (11 m L²) = g / (11 L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2384, // Q65
    similar_question: {
      question: "Two equal tangential forces F are applied in opposite senses at the opposite ends of a diameter of a uniform solid disc of mass M and radius R. The disc is free to rotate about its central perpendicular axis. What is the resulting angular acceleration of the disc?",
      option_a: "4 F / (M R)",
      option_b: "2 F / (M R)",
      option_c: "F / (M R)",
      option_d: "8 F / (M R)",
      correct_option: "A",
      explanation: "Step 1: Both forces exert torques in the same sense of rotation: τ_net = F R + F R = 2 F R.\n\nStep 2: Moment of inertia of a solid disc: I = (1/2) M R².\n\nStep 3: Angular acceleration:\nα = τ_net / I = (2 F R) / [(1/2) M R²] = 4 F / (M R).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2385, // Q66
    similar_question: {
      question: "A heavy wheel of moment of inertia 3 kg·m² rotates about its axle at 120 rpm. What constant braking torque is required to bring it to rest in 30 seconds?",
      option_a: "2π / 5 N·m",
      option_b: "4π / 5 N·m",
      option_c: "π / 5 N·m",
      option_d: "3π / 5 N·m",
      correct_option: "A",
      explanation: "Step 1: Convert angular speed to rad/s: ω₀ = 120 rpm = 120 × (2π / 60) = 4π rad/s.\n\nStep 2: Angular deceleration: α = ω₀ / t = 4π / 30 = 2π / 15 rad/s².\n\nStep 3: Braking torque: τ = I α = 3 kg·m² × (2π / 15 rad/s²) = 2π / 5 N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2386, // Q67
    similar_question: {
      question: "A balance wheel has a moment of inertia of 4 × 10⁻³ kg·m² and is rotating at 25 rev/s. What constant retarding torque is needed to stop the wheel in 5 seconds?",
      option_a: "4π × 10⁻² N·m",
      option_b: "2π × 10⁻² N·m",
      option_c: "8π × 10⁻² N·m",
      option_d: "π × 10⁻² N·m",
      correct_option: "A",
      explanation: "Step 1: Initial angular speed: ω₀ = 25 rev/s × 2π = 50π rad/s.\n\nStep 2: Angular deceleration: α = ω₀ / t = 50π / 5 = 10π rad/s².\n\nStep 3: Retarding torque: τ = I α = (4 × 10⁻³ kg·m²) × (10π rad/s²) = 4π × 10⁻² N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2387, // Q68
    similar_question: {
      question: "A solid cylindrical drum of mass 20 kg and radius 0.25 m is mounted on horizontal bearings. A string wrapped around its circumference is pulled with a constant tension T. If the desired angular acceleration is 4 revolutions/s², what is the required tension T? (Take π ≈ 3.1416)",
      option_a: "62.8 N",
      option_b: "31.4 N",
      option_c: "125.7 N",
      option_d: "50.0 N",
      correct_option: "A",
      explanation: "Step 1: Convert angular acceleration: α = 4 rev/s² = 4 × 2π = 8π rad/s².\n\nStep 2: Moment of inertia: I = (1/2) M R² = (1/2) × 20 × (0.25)² = 0.625 kg·m².\n\nStep 3: Torque τ = I α = 0.625 × 8π = 5π N·m.\nTension T = τ / R = 5π / 0.25 = 20π ≈ 62.83 N ≈ 62.8 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2388, // Q69
    similar_question: {
      question: "A light rope is wrapped around a thin hollow cylindrical shell of mass 2 kg and radius 0.5 m. If the rope is pulled with a constant force of 20 N, what is the resulting angular acceleration of the cylinder?",
      option_a: "20 rad/s²",
      option_b: "10 rad/s²",
      option_c: "40 rad/s²",
      option_d: "5 rad/s²",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of thin hollow cylinder: I = M R² = 2 kg × (0.5 m)² = 0.5 kg·m².\n\nStep 2: Applied torque: τ = F × R = 20 N × 0.5 m = 10 N·m.\n\nStep 3: Angular acceleration: α = τ / I = 10 / 0.5 = 20 rad/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2389, // Q70
    similar_question: {
      question: "A point on the rim of a uniform circular disc of radius 0.25 m accelerates from rest with a constant angular acceleration α = 4.0 rad/s². What is the magnitude of the net linear acceleration of this point at t = 1.0 s?",
      option_a: "4.12 m/s²",
      option_b: "5.00 m/s²",
      option_c: "3.50 m/s²",
      option_d: "4.00 m/s²",
      correct_option: "A",
      explanation: "Step 1: Tangential acceleration: a_t = α R = 4.0 rad/s² × 0.25 m = 1.0 m/s².\n\nStep 2: Angular velocity at t = 1.0 s: ω = α t = 4.0 × 1.0 = 4.0 rad/s.\nCentripetal acceleration: a_c = ω² R = (4.0)² × 0.25 = 4.0 m/s².\n\nStep 3: Net acceleration magnitude:\na_net = √[a_t² + a_c²] = √[1.0² + 4.0²] = √17 ≈ 4.12 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2390, // Q71
    similar_question: {
      question: "A flywheel has an initial angular velocity of 5 rad/s and accelerates uniformly at 2 rad/s². What is the angle (in radians) through which it rotates during the first 3 seconds?",
      option_a: "24 rad",
      option_b: "18 rad",
      option_c: "30 rad",
      option_d: "15 rad",
      correct_option: "A",
      explanation: "Step 1: Angular kinematic formula: θ = ω₀ t + (1/2) α t².\n\nStep 2: Substitute values:\nθ = 5(3) + (1/2)(2)(3)² = 15 + 9 = 24 rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2391, // Q72
    similar_question: {
      question: "A body rotates about a fixed axis with its angular velocity varying with angular displacement as ω = c θ^(−1/2), where c is a positive constant. If θ = 0 at t = 0, how does the angular displacement θ depend on time t?",
      option_a: "[(3/2) c t]^(2/3)",
      option_b: "(2 c t)^(1/2)",
      option_c: "c t^(3/2)",
      option_d: "(3 c t)^(1/3)",
      correct_option: "A",
      explanation: "Step 1: Express angular velocity as rate of change: dθ/dt = c θ^(−1/2)  →  θ^(1/2) dθ = c dt.\n\nStep 2: Integrate both sides:\n∫₀^θ θ^(1/2) dθ = c ∫₀ᵗ dt  →  (2/3) θ^(3/2) = c t.\n\nStep 3: Solve for θ:\nθ^(3/2) = (3/2) c t  →  θ = [(3/2) c t]^(2/3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2392, // Q73
    similar_question: {
      question: "A flywheel with a moment of inertia of 5 kg·m² rotates at an initial angular speed of 180 rpm. What constant torque is required to bring it to rest in 45 seconds?",
      option_a: "2π / 3 N·m",
      option_b: "4π / 3 N·m",
      option_c: "π / 3 N·m",
      option_d: "5π / 6 N·m",
      correct_option: "A",
      explanation: "Step 1: Initial angular velocity: ω₀ = 180 rpm = 180 × (2π / 60) = 6π rad/s.\n\nStep 2: Angular deceleration: α = ω₀ / t = 6π / 45 = 2π / 15 rad/s².\n\nStep 3: Required torque: τ = I α = 5 kg·m² × (2π / 15 rad/s²) = 2π / 3 N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2393, // Q74
    similar_question: {
      question: "A uniform thin rod of mass M and length L is pivoted horizontally at one end. It is held in a horizontal position and then released from rest. What is the initial angular acceleration of the rod immediately after release?",
      option_a: "3 g / (2 L)",
      option_b: "g / (2 L)",
      option_c: "2 g / L",
      option_d: "3 g / L",
      correct_option: "A",
      explanation: "Step 1: Torque of gravity about the pivot acting at centre of mass (distance L / 2):\nτ = M g (L / 2).\n\nStep 2: Moment of inertia of rod about its end pivot: I = (1/3) M L².\n\nStep 3: Angular acceleration: α = τ / I = [M g L / 2] / [(1/3) M L²] = 3 g / (2 L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2394, // Q75
    similar_question: {
      question: "A solid uniform cylinder of mass M and radius R has a light cord wrapped around its circumference. The upper end of the cord is anchored to a rigid ceiling. When the cylinder is released from rest, it unwinds the cord and falls vertically. What are the downward linear acceleration of the cylinder and the tension in the cord?",
      option_a: "a = 2g / 3 and T = M g / 3",
      option_b: "a = g / 2 and T = M g / 2",
      option_c: "a = 3g / 4 and T = M g / 4",
      option_d: "a = g and T = 0",
      correct_option: "A",
      explanation: "Step 1: Vertical force balance: M g − T = M a.\n\nStep 2: Torque about center of mass: T R = I α = [(1/2) M R²] (a / R)  →  T = (1/2) M a.\n\nStep 3: Solve system of equations:\nM g − (1/2) M a = M a  →  (3/2) M a = M g  →  a = 2g / 3.\nTension: T = (1/2) M (2g / 3) = M g / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2395, // Q76
    similar_question: {
      question: "A light cord is wound around the rim of a thin cylindrical hoop of mass 4 kg and radius 0.25 m. If the cord is pulled with a constant tangential force of 50 N, what is the angular acceleration of the hoop?",
      option_a: "50 rad/s²",
      option_b: "25 rad/s²",
      option_c: "100 rad/s²",
      option_d: "12.5 rad/s²",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of thin hoop: I = M R² = 4 kg × (0.25 m)² = 0.25 kg·m².\n\nStep 2: Torque: τ = F × R = 50 N × 0.25 m = 12.5 N·m.\n\nStep 3: Angular acceleration: α = τ / I = 12.5 / 0.25 = 50 rad/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2396, // Q77
    similar_question: {
      question: "Consider the following statements regarding mechanics of rigid bodies:\n(1) The centre of mass of a body is the point about which the sum of the gravitational torques of all its constituent particles is zero in a uniform field.\n(2) A machine with a mechanical advantage greater than 1 allows a smaller effort force to overcome a larger load force.\nWhich of the statements given above is/are correct?",
      option_a: "Both (1) and (2)",
      option_b: "(1) only",
      option_c: "(2) only",
      option_d: "Neither (1) nor (2)",
      correct_option: "A",
      explanation: "Step 1: In a uniform gravitational field, the centre of mass coincides with the centre of gravity, so total gravitational torque about CM is zero  →  (1) is correct.\n\nStep 2: Mechanical advantage is MA = Load / Effort. If MA > 1, Load > Effort, so smaller effort lifts larger load  →  (2) is correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2397, // Q78
    similar_question: {
      question: "A uniform thin rod of length L and mass m is pivoted at one end and held horizontally. When released from rest, it swings downward in a vertical plane. What is the linear speed of the free tip of the rod as it passes through the vertically downward position?",
      option_a: "√(3 g L)",
      option_b: "√(2 g L)",
      option_c: "√(g L)",
      option_d: "2√(g L)",
      correct_option: "A",
      explanation: "Step 1: Vertical descent of centre of mass: h_cm = L / 2.\nLoss in gravitational PE = m g (L / 2).\n\nStep 2: Rotational KE about end pivot: K = (1/2) I ω² = (1/2) [(1/3) m L²] ω² = (1/6) m L² ω².\n\nStep 3: Conservation of energy: (1/6) m L² ω² = (1/2) m g L  →  ω = √(3 g / L).\nTip speed v = ω L = √(3 g L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2398, // Q79
    similar_question: {
      question: "An energy input of 400 J increases the angular speed of a flywheel from an initial value of 10 rad/s to a final value of 30 rad/s. What is the moment of inertia of the flywheel?",
      option_a: "1.0 kg·m²",
      option_b: "0.5 kg·m²",
      option_c: "2.0 kg·m²",
      option_d: "1.5 kg·m²",
      correct_option: "A",
      explanation: "Step 1: Work done equals change in rotational kinetic energy:\nW = (1/2) I (ω₂² − ω₁²).\n\nStep 2: Substitute values:\n400 = (1/2) I (30² − 10²) = (1/2) I (900 − 100) = 400 I.\n\nStep 3: Solve for I: I = 1.0 kg·m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2399, // Q80
    similar_question: {
      question: "If every constituent particle of an extended rigid body undergoes identical displacement in a given time interval, the body is said to be in pure translational motion. Is this statement true or false?",
      option_a: "True",
      option_b: "False",
      option_c: "Indeterminate",
      option_d: "Valid only in 1D",
      correct_option: "A",
      explanation: "Step 1: By definition of translational motion, every line segment within the body remains parallel to its original direction throughout the motion.\n\nStep 2: Consequently, every particle of the body undergoes identical linear displacements, velocities, and accelerations at all times.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2400, // Q81
    similar_question: {
      question: "In pure rotational motion of a rigid body about a fixed axis, which of the following is true for all particles of the body?",
      option_a: "All particles have the same angular velocity, but their linear speeds depend on their radial distance from the axis",
      option_b: "All particles have the same linear speed and same angular velocity",
      option_c: "All particles have different angular velocities and different linear speeds",
      option_d: "Particles on the axis of rotation move with the highest linear speed",
      correct_option: "A",
      explanation: "Step 1: In a rigid body rotating about a fixed axis, all particles complete one rotation in the same time period, sharing identical angular velocity ω.\n\nStep 2: The linear speed of any particle is given by v = r ω, which is directly proportional to its perpendicular distance r from the axis of rotation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2401, // Q82
    similar_question: {
      question: "For bodies of identical mass and radius rolling without slipping on a horizontal surface, which object has the highest fraction of its total kinetic energy in rotational form?",
      option_a: "Thin circular ring (hoop)",
      option_b: "Solid circular disc",
      option_c: "Solid uniform sphere",
      option_d: "Thin spherical shell",
      correct_option: "A",
      explanation: "Step 1: Fraction of total kinetic energy in rotational form: f_rot = (k² / R²) / (1 + k² / R²).\n\nStep 2: Values of k² / R²:\nThin ring: 1.0  →  f_rot = 1 / 2 = 50%.\nThin spherical shell: 2/3  →  f_rot = 2 / 5 = 40%.\nSolid disc: 1/2  →  f_rot = 1 / 3 = 33.3%.\nSolid sphere: 2/5  →  f_rot = 2 / 7 = 28.6%.\n\nStep 3: The thin circular ring has the highest percentage (50%).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2402, // Q83
    similar_question: {
      question: "A thin hollow spherical shell rolls along a horizontal floor without slipping. What percentage of its total kinetic energy consists of rotational kinetic energy?",
      option_a: "40%",
      option_b: "60%",
      option_c: "28.6%",
      option_d: "50%",
      correct_option: "A",
      explanation: "Step 1: K_trans = (1/2) M v².\n\nStep 2: K_rot = (1/2) I ω² = (1/2) [(2/3) M R²] (v / R)² = (1/3) M v².\n\nStep 3: K_total = (1/2 + 1/3) M v² = (5/6) M v².\nFraction rotational = (1/3) / (5/6) = 2 / 5 = 40%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2403, // Q84
    similar_question: {
      question: "A solid uniform sphere rolls without slipping on a flat surface. What percentage of its total kinetic energy is rotational kinetic energy?",
      option_a: "28.6%",
      option_b: "71.4%",
      option_c: "40.0%",
      option_d: "50.0%",
      correct_option: "A",
      explanation: "Step 1: For a solid sphere: I = (2/5) M R².\nK_rot = (1/5) M v²,  K_trans = (1/2) M v².\n\nStep 2: Total kinetic energy: K_total = (1/5 + 1/2) M v² = (7/10) M v².\n\nStep 3: Percentage rotational: (2/7) × 100% ≈ 28.57% ≈ 28.6%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2404, // Q85
    similar_question: {
      question: "A uniform solid disc rolls down an incline without slipping. What is the ratio of its rotational kinetic energy to its total kinetic energy?",
      option_a: "1 : 3",
      option_b: "1 : 2",
      option_c: "2 : 5",
      option_d: "2 : 7",
      correct_option: "A",
      explanation: "Step 1: For a solid disc: I = (1/2) M R².\nK_rot = (1/4) M v²,  K_trans = (1/2) M v².\n\nStep 2: Total energy: K_total = (1/4 + 1/2) M v² = (3/4) M v².\n\nStep 3: Ratio: K_rot / K_total = (1/4) / (3/4) = 1 / 3 = 1 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2405, // Q86
    similar_question: {
      question: "A symmetric body rolls smoothly without slipping along a floor. If its rotational kinetic energy is exactly equal to its translational kinetic energy (each accounting for 50% of the total kinetic energy), what is the shape of the body?",
      option_a: "Thin circular ring or hollow cylinder",
      option_b: "Solid cylinder or disc",
      option_c: "Solid sphere",
      option_d: "Spherical shell",
      correct_option: "A",
      explanation: "Step 1: Condition: K_rot = K_trans.\n(1/2) I ω² = (1/2) M v².\n\nStep 2: For pure rolling v = R ω:\nI (v / R)² = M v²  →  I = M R².\n\nStep 3: A moment of inertia of M R² corresponds to a thin circular ring or thin hollow cylinder.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2406, // Q87
    similar_question: {
      question: "A uniform circular disc of mass 40 kg and radius 0.5 m rolls without slipping on a horizontal surface with a linear speed of 0.5 m/s. How much work is required to bring it to a complete stop?",
      option_a: "7.5 J",
      option_b: "5.0 J",
      option_c: "10.0 J",
      option_d: "2.5 J",
      correct_option: "A",
      explanation: "Step 1: Total kinetic energy of rolling disc: K_total = (3/4) M v².\n\nStep 2: Substitute M = 40 kg and v = 0.5 m/s:\nK_total = (3/4) × 40 kg × (0.5 m/s)² = 30 × 0.25 = 7.5 J.\n\nStep 3: Work required to stop equals total kinetic energy: W = 7.5 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2407, // Q88
    similar_question: {
      question: "A solid uniform sphere rolls without slipping on a horizontal track. What is the ratio of its translational kinetic energy to its total kinetic energy?",
      option_a: "5 : 7",
      option_b: "2 : 7",
      option_c: "7 : 5",
      option_d: "5 : 2",
      correct_option: "A",
      explanation: "Step 1: Translational kinetic energy: K_t = (1/2) M v².\n\nStep 2: Total kinetic energy: K_total = (1/2) M v² + (1/5) M v² = (7/10) M v².\n\nStep 3: Ratio K_t / K_total = (1/2) / (7/10) = 5 / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2408, // Q89
    similar_question: {
      question: "An object of radius R and radius of gyration k about its centre of mass rolls along a surface without slipping. What fraction of its total mechanical energy is stored as rotational kinetic energy?",
      option_a: "k² / (k² + R²)",
      option_b: "R² / (k² + R²)",
      option_c: "k² / R²",
      option_d: "R² / k²",
      correct_option: "A",
      explanation: "Step 1: Rotational energy: K_rot = (1/2) M k² ω² = (1/2) M (k² / R²) v².\n\nStep 2: Total energy: K_total = (1/2) M v² [1 + k² / R²] = (1/2) M v² [(k² + R²) / R²].\n\nStep 3: Ratio K_rot / K_total = [k² / R²] / [(k² + R²) / R²] = k² / (k² + R²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2409, // Q90
    similar_question: {
      question: "For a solid uniform sphere rolling purely without sliding, what is the ratio of its rotational kinetic energy to its total kinetic energy?",
      option_a: "2 / 7",
      option_b: "5 / 7",
      option_c: "2 / 5",
      option_d: "1 / 3",
      correct_option: "A",
      explanation: "Step 1: K_rot = (1/5) M v².\n\nStep 2: K_total = (7/10) M v².\n\nStep 3: Ratio: K_rot / K_total = (1/5) / (7/10) = 2 / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2410, // Q91
    similar_question: {
      question: "Four objects of the same mass and radius roll without slipping down a gentle incline. Which object possesses the largest ratio of rotational kinetic energy to translational kinetic energy?",
      option_a: "Circular ring",
      option_b: "Solid sphere",
      option_c: "Solid cylinder",
      option_d: "Spherical shell",
      correct_option: "A",
      explanation: "Step 1: The ratio of rotational to translational kinetic energy is K_rot / K_trans = I / (M R²) = k² / R².\n\nStep 2: For ring: k² / R² = 1.0; for spherical shell: 0.67; for disc: 0.50; for solid sphere: 0.40.\n\nStep 3: The circular ring has the highest ratio.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2411, // Q92
    similar_question: {
      question: "A solid billiard ball rolls down a rough inclined plane without slipping. What fraction of the gravitational potential energy lost during descent is transformed into rotational kinetic energy?",
      option_a: "2 / 7",
      option_b: "5 / 7",
      option_c: "2 / 5",
      option_d: "3 / 7",
      correct_option: "A",
      explanation: "Step 1: Potential energy lost equals total kinetic energy gained: ΔU = K_total = (7/10) M v².\n\nStep 2: Rotational kinetic energy gained: K_rot = (1/5) M v².\n\nStep 3: Fraction: K_rot / ΔU = (1/5) / (7/10) = 2 / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2412, // Q93
    similar_question: {
      question: "A body rolls without slipping on a flat surface such that its rotational kinetic energy is 40% (two-fifths) of its translational kinetic energy. What is the body?",
      option_a: "Solid sphere",
      option_b: "Spherical shell",
      option_c: "Disc",
      option_d: "Ring",
      correct_option: "A",
      explanation: "Step 1: Given: K_rot / K_trans = 2 / 5.\n\nStep 2: In pure rolling: (1/2 I ω²) / (1/2 M v²) = I / (M R²) = 2 / 5.\n\nStep 3: I = (2/5) M R², which uniquely identifies a uniform solid sphere.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2413, // Q94
    similar_question: {
      question: "A wheel of radius R rolls without slipping on top of a flat horizontal plank that is moving forward with velocity v_p. If the centre of mass of the wheel moves forward with velocity v_c and the wheel rotates with clockwise angular velocity ω, what is the condition for pure rolling at the contact point?",
      option_a: "v_c − v_p = R ω",
      option_b: "v_c + v_p = R ω",
      option_c: "v_c = R ω",
      option_d: "v_p = R ω",
      correct_option: "A",
      explanation: "Step 1: Velocity of the bottom contact point of the rolling wheel: v_contact = v_c − R ω.\n\nStep 2: For pure rolling without slip, the contact point must have zero relative velocity to the plank: v_contact = v_p.\n\nStep 3: Thus: v_c − R ω = v_p  →  v_c − v_p = R ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2414, // Q95
    similar_question: {
      question: "A horizontal force F is applied at the top edge of a thin hollow cylinder of mass M and radius R (at height 2R above the ground). What is the magnitude and direction of the friction force required for pure rolling?",
      option_a: "Zero",
      option_b: "Directed forward",
      option_c: "Directed backward",
      option_d: "Equal to F",
      correct_option: "A",
      explanation: "Step 1: General formula for friction during pure rolling with force F at height h above the centre: f = F [ (I_cm − M R h) / (I_cm + M R²) ].\n\nStep 2: For a thin hollow cylinder, I_cm = M R². Here the force is applied at the top edge (h = R).\n\nStep 3: Substitute values: f = F [ (M R² − M R(R)) / (2 M R²) ] = 0.\nFriction is zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2415, // Q96
    similar_question: {
      question: "A horizontal force F is applied at the highest point (top rim) of a uniform solid disc of mass M and radius R resting on a rough horizontal floor. What is the direction of the friction force exerted by the floor on the disc during pure rolling?",
      option_a: "In the forward direction",
      option_b: "In the backward direction",
      option_c: "Friction is zero",
      option_d: "Perpendicular to the surface",
      correct_option: "A",
      explanation: "Step 1: Torque about centre due to top force F produces forward angular acceleration α = F R / I_cm.\nFor a disc, I_cm = (1/2) M R², so α R = 2 F / M.\n\nStep 2: Linear acceleration produced by F is a = F / M.\nSince α R = 2 F / M > a, the bottom contact point tends to slip backward.\n\nStep 3: Static friction opposes backward slipping and acts in the forward direction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2416, // Q97
    similar_question: {
      question: "A solid uniform sphere of mass M is released on a rough incline of angle θ. What is the minimum coefficient of static friction μ_min required to prevent slipping and ensure pure rolling motion?",
      option_a: "(2/7) tan θ",
      option_b: "(1/3) tan θ",
      option_c: "(2/5) tan θ",
      option_d: "(1/2) tan θ",
      correct_option: "A",
      explanation: "Step 1: Linear acceleration in pure rolling down an incline: a = g sin θ / (1 + I / M R²) = g sin θ / (1 + 2/5) = (5/7) g sin θ.\n\nStep 2: Friction force required: f = M g sin θ − M a = M g sin θ [1 − 5/7] = (2/7) M g sin θ.\n\nStep 3: For no slipping, f ≤ μ N = μ M g cos θ  →  (2/7) M g sin θ ≤ μ M g cos θ  →  μ ≥ (2/7) tan θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2417, // Q98
    similar_question: {
      question: "Consider the statement: 'A body released from rest on a perfectly frictionless (smooth) inclined plane can never begin pure rolling motion.' Is this statement true or false?",
      option_a: "True",
      option_b: "False",
      option_c: "True only for spheres",
      option_d: "False for rings",
      correct_option: "A",
      explanation: "Step 1: To initiate rotational motion from rest, an external torque about the centre of mass must act on the body (τ = I α).\n\nStep 2: On a smooth incline, the normal force and gravity both pass through the centre of mass, exerting zero torque.\n\nStep 3: Without friction to provide torque, the body only translates and slides without rotating. Thus, the statement is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2418, // Q99
    similar_question: {
      question: "When an extended rigid body is released from rest on an inclined plane, which force provides the essential torque about its centre of mass to initiate rolling?",
      option_a: "Static friction force exerted by the incline",
      option_b: "Normal contact force from the incline",
      option_c: "Component of gravitational force parallel to the incline",
      option_d: "Component of gravitational force perpendicular to the incline",
      correct_option: "A",
      explanation: "Step 1: The gravitational force acts through the centre of mass (lever arm = 0), producing zero torque about it.\n\nStep 2: The normal force acts perpendicular to the surface along a line passing through the centre of mass, producing zero torque.\n\nStep 3: Only the tangential friction force acting at the contact surface has a non-zero lever arm (R) about the centre of mass, producing the torque τ = f R necessary for angular acceleration.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2419, // Q100
    similar_question: {
      question: "A uniform solid cylinder of mass M and radius R rolls down from rest from the top of an inclined plane of vertical height h without slipping. What is the speed of its centre of mass when it reaches the bottom?",
      option_a: "√(4 g h / 3)",
      option_b: "√(2 g h)",
      option_c: "√(3 g h / 4)",
      option_d: "√(g h)",
      correct_option: "A",
      explanation: "Step 1: Conservation of mechanical energy for pure rolling: M g h = (1/2) M v² (1 + k² / R²).\n\nStep 2: For a solid cylinder, k² / R² = 1 / 2.\n\nStep 3: Substitute and solve for v:\nM g h = (1/2) M v² (3/2) = (3/4) M v²  →  v = √(4 g h / 3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2420, // Q101
    similar_question: {
      question: "Two uniform solid discs A and B, having masses in the ratio 1 : 3 and radii in the ratio 1 : 4, roll down without slipping from rest from the top of the same inclined plane of height h. What is the ratio of their linear speeds v_A / v_B at the bottom?",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "1 : 4",
      option_d: "3 : 4",
      correct_option: "A",
      explanation: "Step 1: The speed at the bottom of an incline of height h for any rolling body is v = √[2 g h / (1 + k² / R²)].\n\nStep 2: For any uniform solid disc, k² / R² = 1 / 2, regardless of its mass or radius.\n\nStep 3: Hence both discs attain the exact same speed v = √(4 g h / 3), giving a ratio of 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2421, // Q102
    similar_question: {
      question: "A solid cylinder of mass M and radius R rolls without slipping down an incline from a vertical height h starting from rest. What is its angular velocity ω upon reaching the bottom?",
      option_a: "(1 / R) √(4 g h / 3)",
      option_b: "(1 / R) √(2 g h)",
      option_c: "(1 / R) √(g h)",
      option_d: "(2 / R) √(g h / 3)",
      correct_option: "A",
      explanation: "Step 1: Linear speed of the cylinder at the bottom: v = √(4 g h / 3).\n\nStep 2: Under the condition of rolling without slipping: v = R ω.\n\nStep 3: Solve for angular velocity:\nω = v / R = (1 / R) √(4 g h / 3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2422, // Q103
    similar_question: {
      question: "A solid uniform sphere rolls down an inclined plane of vertical height H without slipping, starting from rest. What is the speed of its centre of mass at the base of the incline?",
      option_a: "√(10 g H / 7)",
      option_b: "√(4 g H / 3)",
      option_c: "√(2 g H)",
      option_d: "√(5 g H / 7)",
      correct_option: "A",
      explanation: "Step 1: Total mechanical energy at top: E = M g H.\n\nStep 2: Total kinetic energy at bottom for pure rolling of a solid sphere (k² / R² = 2 / 5):\nK = (1/2) M v² (1 + 2 / 5) = (7/10) M v².\n\nStep 3: Equate: M g H = (7/10) M v²  →  v = √(10 g H / 7).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2423, // Q104
    similar_question: {
      question: "A thin uniform circular ring rolls down an inclined plane of inclination angle 30° without slipping. What is the magnitude of its linear acceleration along the incline?",
      option_a: "g / 4",
      option_b: "g / 2",
      option_c: "g / 3",
      option_d: "g",
      correct_option: "A",
      explanation: "Step 1: Formula for linear acceleration in pure rolling: a = g sin θ / (1 + k² / R²).\n\nStep 2: For a thin circular ring, k² / R² = 1.\n\nStep 3: Given θ = 30° (sin 30° = 1 / 2):\na = g (1 / 2) / (1 + 1) = (g / 2) / 2 = g / 4.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 8 Part 2 (${set8Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set8Part2Updates) {
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
        console.log(`[${successCount}/${set8Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 8 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
