const fs = require('fs');

const set8Part3Updates = [
  {
    id: 2424, // Q105
    similar_question: {
      question: "An inclined plane makes an angle of 45° with the horizontal. A solid sphere of mass M and radius R rolls down this incline from rest without slipping. What is the magnitude of its linear acceleration?",
      option_a: "5g / (7√2)",
      option_b: "g / (2√2)",
      option_c: "5g / 7",
      option_d: "2g / (7√2)",
      correct_option: "A",
      explanation: "Step 1: The linear acceleration of a body rolling without slipping down an incline of angle θ is given by:\na = g sin θ / (1 + k² / R²).\n\nStep 2: For a uniform solid sphere, the moment of inertia about the central axis is I = (2/5) M R², so k² / R² = 2/5.\n\nStep 3: Substitute θ = 45° (sin 45° = 1 / √2):\na = g (1 / √2) / (1 + 2/5) = g / (√2 × 7/5) = 5g / (7√2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2425, // Q106
    similar_question: {
      question: "A thin hollow cylinder (pipe) and a uniform solid sphere of equal radii start rolling down from rest without slipping along the same inclined plane. Which object reaches the bottom of the incline first?",
      option_a: "Solid sphere",
      option_b: "Hollow cylinder",
      option_c: "Both reach simultaneously",
      option_d: "Depends on their respective masses",
      correct_option: "A",
      explanation: "Step 1: Linear acceleration during rolling without slipping is a = g sin θ / (1 + k² / R²).\n\nStep 2: For a solid sphere, k² / R² = 2/5 = 0.40, giving a_sphere = g sin θ / 1.40 ≈ 0.714 g sin θ.\nFor a hollow cylinder, k² / R² = 1.0, giving a_cylinder = g sin θ / 2.0 = 0.50 g sin θ.\n\nStep 3: Since a_sphere > a_cylinder, the sphere has greater acceleration and takes less time (t = √(2s/a)) to reach the bottom.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2426, // Q107
    similar_question: {
      question: "A thin spherical shell and a uniform solid cylinder roll down the same inclined plane from rest without slipping. What is the ratio of the linear acceleration of the spherical shell to that of the solid cylinder?",
      option_a: "9 : 10",
      option_b: "10 : 9",
      option_c: "14 : 15",
      option_d: "15 : 14",
      correct_option: "A",
      explanation: "Step 1: Linear acceleration is a = g sin θ / (1 + k² / R²).\n\nStep 2: For a thin spherical shell, k² / R² = 2/3, so:\na_shell = g sin θ / (1 + 2/3) = (3/5) g sin θ.\n\nStep 3: For a solid cylinder, k² / R² = 1/2, so:\na_cylinder = g sin θ / (1 + 1/2) = (2/3) g sin θ.\n\nStep 4: Compute the ratio:\na_shell / a_cylinder = (3/5) / (2/3) = (3 × 3) / (5 × 2) = 9 / 10 = 9 : 10.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2427, // Q108
    similar_question: {
      question: "A uniform rigid body of mass m rolls without slipping up a rough curved surface with an initial translational speed v. If it reaches a maximum vertical height h = 7 v² / (10 g) above the ground, identify the shape of the body.",
      option_a: "Solid sphere",
      option_b: "Solid cylinder",
      option_c: "Spherical shell",
      option_d: "Thin circular ring",
      correct_option: "A",
      explanation: "Step 1: By conservation of mechanical energy:\nTotal K.E. = P.E. at maximum height\n(1/2) m v² (1 + k² / R²) = m g h.\n\nStep 2: Given h = 7 v² / (10 g):\n(1/2) v² (1 + k² / R²) = g [7 v² / (10 g)] = (7/10) v².\n\nStep 3: Solve for k² / R²:\n1 + k² / R² = 2 × (7/10) = 7/5  →  k² / R² = 7/5 − 1 = 2/5.\n\nStep 4: A value of k² / R² = 2/5 corresponds to a solid sphere.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2428, // Q109
    similar_question: {
      question: "Two solid spheres with mass ratio 1 : 4 and radius ratio 1 : 2 roll down without slipping from rest from the top of the same inclined plane of vertical height h. What is the ratio of their translational speeds upon reaching the bottom?",
      option_a: "1 : 1",
      option_b: "1 : 2",
      option_c: "1 : 4",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: The speed of a rolling body reaching the bottom of an incline of height h is given by:\nv = √[ 2gh / (1 + k² / R²) ].\n\nStep 2: For any uniform solid sphere, k² / R² = 2/5, regardless of its mass M or radius R.\n\nStep 3: Because both spheres are solid spheres rolling down through the same vertical drop h, their speeds are identical: v₁ / v₂ = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2429, // Q110
    similar_question: {
      question: "A solid sphere of mass m and radius R rolls without slipping on a horizontal track with speed v, and then transitions onto a rough inclined plane of inclination θ. What is the minimum initial speed v required for the sphere to reach a vertical height h on the incline?",
      option_a: "√(10gh / 7)",
      option_b: "√(7gh / 10)",
      option_c: "√(2gh)",
      option_d: "√(4gh / 3)",
      correct_option: "A",
      explanation: "Step 1: Total kinetic energy of rolling without slipping:\nK = (1/2) m v² + (1/2) I ω² = (1/2) m v² [1 + k² / R²].\n\nStep 2: For a solid sphere, k² / R² = 2/5, so K = (1/2) m v² (7/5) = (7/10) m v².\n\nStep 3: To reach height h, initial kinetic energy must equal potential energy m g h:\n(7/10) m v² = m g h  →  v² = 10gh / 7  →  v = √(10gh / 7).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2430, // Q111
    similar_question: {
      question: "A solid sphere is projected up a rough inclined plane such that it rolls without slipping upwards, comes to instantaneous rest, and then rolls without slipping back down. What are the directions of the friction force acting on the sphere during the upward and downward motions respectively?",
      option_a: "Up the incline, up the incline",
      option_b: "Down the incline, up the incline",
      option_c: "Up the incline, down the incline",
      option_d: "Down the incline, down the incline",
      correct_option: "A",
      explanation: "Step 1: In pure rolling down an incline, the component of gravity down the incline (mg sin θ) tends to accelerate the centre of mass forward faster than rotation, causing the contact point to tend to slide downwards. Static friction acts up the incline to provide the required rotational torque.\n\nStep 2: During upward motion, the sphere is decelerating. The angular deceleration requires a clockwise torque, which is provided by static friction directed up the incline.\n\nStep 3: Thus, in both upward and downward pure rolling on an incline under gravity alone, the static friction force acts upwards along the incline.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2431, // Q112
    similar_question: {
      question: "Two uniform solid cylinders of different masses, lengths, and densities roll down from rest along the same rough inclined plane without slipping. The time taken to reach the bottom depends on:",
      option_a: "Neither mass, length, radius, nor density",
      option_b: "Mass and radius only",
      option_c: "Density and radius only",
      option_d: "Mass only",
      correct_option: "A",
      explanation: "Step 1: Acceleration in pure rolling is a = g sin θ / (1 + k² / R²).\n\nStep 2: For any solid cylinder, k² / R² = 1/2, so a = (2/3) g sin θ, which is purely a function of g and incline angle θ.\n\nStep 3: The time taken to travel distance s is t = √(2s / a), which is independent of the mass, radius, length, and density of the cylinder.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2432, // Q113
    similar_question: {
      question: "A uniform solid cylinder first slides without friction down a smooth inclined plane of length L, and then rolls without slipping down an identical rough inclined plane from the same height. What is the ratio of the time taken in the smooth case to the time taken in the rough rolling case?",
      option_a: "√(2/3)",
      option_b: "√(3/2)",
      option_c: "2/3",
      option_d: "1/2",
      correct_option: "A",
      explanation: "Step 1: On a smooth incline (pure sliding, no friction):\na_smooth = g sin θ,  so t_smooth = √(2L / a_smooth) = √(2L / (g sin θ)).\n\nStep 2: On a rough incline (pure rolling):\na_rough = g sin θ / (1 + k² / R²) = g sin θ / (1 + 1/2) = (2/3) g sin θ.\nt_rough = √(2L / a_rough) = √[2L / ((2/3) g sin θ)].\n\nStep 3: Taking the ratio:\nt_smooth / t_rough = √(a_rough / a_smooth) = √((2/3) g sin θ / (g sin θ)) = √(2/3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2433, // Q114
    similar_question: {
      question: "A uniform wheel rolls without slipping on a horizontal rough surface with a constant linear velocity. The work done by the static friction on the wheel over any non-zero time interval is:",
      option_a: "Zero",
      option_b: "Positive",
      option_c: "Negative",
      option_d: "Dependent on the coefficient of static friction",
      correct_option: "A",
      explanation: "Step 1: In pure rolling motion on a flat horizontal surface at constant velocity, there is no relative tendency to slip, so static friction is zero.\n\nStep 2: Even if static friction acts (such as during rolling with acceleration), the point of contact is instantaneously at rest (v_contact = 0).\n\nStep 3: Since instantaneous velocity of the contact point is zero, the instantaneous power F_friction · v_contact = 0, so work done by static friction in pure rolling is zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2434, // Q115
    similar_question: {
      question: "What is the minimum coefficient of static friction (μ_s) required for a thin spherical shell of radius R to roll down an incline of angle θ without slipping?",
      option_a: "(2/5) tan θ",
      option_b: "(2/7) tan θ",
      option_c: "(1/3) tan θ",
      option_d: "(1/2) tan θ",
      correct_option: "A",
      explanation: "Step 1: The condition for pure rolling without slipping down an inclined plane is:\nμ_s ≥ tan θ / [1 + R² / k²].\n\nStep 2: For a thin spherical shell, I = (2/3) M R², so k² / R² = 2/3, which means R² / k² = 3/2.\n\nStep 3: Substitute R² / k² = 3/2:\nμ_min = tan θ / (1 + 3/2) = tan θ / (5/2) = (2/5) tan θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2435, // Q116
    similar_question: {
      question: "A solid sphere rolls down an inclined plane of inclination θ without slipping. The primary role of the static friction force between the sphere and the incline is to:",
      option_a: "Convert a portion of translational kinetic energy into rotational kinetic energy without dissipating mechanical energy",
      option_b: "Dissipate total mechanical energy continuously into thermal heat",
      option_c: "Increase the linear acceleration above g sin θ",
      option_d: "Completely stop both translational and rotational motion",
      correct_option: "A",
      explanation: "Step 1: Static friction exerts a torque τ = f × R about the centre of mass, causing angular acceleration α = τ / I.\n\nStep 2: At the same time, static friction opposes linear acceleration down the incline: m g sin θ − f = m a.\n\nStep 3: Because the instantaneous point of contact does not slip, static friction does zero net work and does not dissipate mechanical energy as heat; it merely transfers energy from translational into rotational mode.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2436, // Q117
    similar_question: {
      question: "A uniform solid sphere of radius R rolls without slipping down an inclined plane of angle θ. If the coefficient of static friction between the sphere and the plane is μ, what is the maximum angle of inclination θ_max for which the sphere will roll without slipping?",
      option_a: "tan⁻¹(3.5 μ)",
      option_b: "tan⁻¹(2.5 μ)",
      option_c: "tan⁻¹(3 μ)",
      option_d: "tan⁻¹(2 μ)",
      correct_option: "A",
      explanation: "Step 1: For a solid sphere, the minimum coefficient of static friction to prevent slipping is:\nμ ≥ (2/7) tan θ.\n\nStep 2: To find the maximum inclination θ_max for a given μ:\ntan θ_max = (7/2) μ = 3.5 μ.\n\nStep 3: Thus:\nθ_max = tan⁻¹(3.5 μ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2437, // Q118
    similar_question: {
      question: "A thin circular ring of mass M and radius R rolls without slipping along a horizontal track with speed v₀ and then moves up a rough inclined plane. What is the maximum vertical height h attained by the ring before coming to rest?",
      option_a: "v₀² / g",
      option_b: "v₀² / (2g)",
      option_c: "3 v₀² / (4g)",
      option_d: "7 v₀² / (10g)",
      correct_option: "A",
      explanation: "Step 1: Total kinetic energy of a ring rolling without slipping at speed v₀ is:\nK = (1/2) M v₀² + (1/2) I ω₀².\nFor a ring, I = M R² and ω₀ = v₀ / R:\nK = (1/2) M v₀² + (1/2) M v₀² = M v₀².\n\nStep 2: At maximum vertical height h, all kinetic energy is converted into gravitational potential energy:\nM g h = M v₀².\n\nStep 3: Solve for h:\nh = v₀² / g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2438, // Q119
    similar_question: {
      question: "A uniform solid cylinder of mass M is given an initial speed v₀ = 6 m/s at the bottom of a rough inclined plane and rolls up without slipping. Taking g = 10 m/s², what is the maximum vertical height h reached by the cylinder?",
      option_a: "2.7 m",
      option_b: "1.8 m",
      option_c: "3.6 m",
      option_d: "4.5 m",
      correct_option: "A",
      explanation: "Step 1: Total initial kinetic energy of the rolling solid cylinder:\nK = (1/2) M v₀² (1 + k² / R²) = (1/2) M v₀² (1 + 1/2) = (3/4) M v₀².\n\nStep 2: Equate kinetic energy to potential energy at the highest point:\nM g h = (3/4) M v₀²  →  h = 3 v₀² / (4g).\n\nStep 3: Substitute v₀ = 6 m/s and g = 10 m/s²:\nh = 3 × 36 / (4 × 10) = 108 / 40 = 2.7 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2439, // Q120
    similar_question: {
      question: "A thin circular ring of mass M and radius R rolls down an inclined plane of angle θ. If μ_s is the coefficient of static friction, what is the condition to guarantee rolling without slipping?",
      option_a: "tan θ ≤ 2 μ_s",
      option_b: "tan θ ≤ μ_s",
      option_c: "tan θ ≤ 3 μ_s",
      option_d: "tan θ ≤ 3.5 μ_s",
      correct_option: "A",
      explanation: "Step 1: Condition for pure rolling on an incline: μ_s ≥ tan θ / (1 + R² / k²).\n\nStep 2: For a thin circular ring, k² = R², so R² / k² = 1.\n\nStep 3: Therefore:\nμ_s ≥ tan θ / (1 + 1) = (1/2) tan θ  →  tan θ ≤ 2 μ_s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2440, // Q121
    similar_question: {
      question: "A uniform solid sphere, a uniform solid cylinder, and a thin circular ring, all with equal radii, roll down the same inclined plane from rest without slipping. Which of the following statements correctly describes their linear speeds v_cm at the bottom?",
      option_a: "v_sphere > v_cylinder > v_ring",
      option_b: "v_ring > v_cylinder > v_sphere",
      option_c: "v_cylinder > v_sphere > v_ring",
      option_d: "v_sphere = v_cylinder = v_ring",
      correct_option: "A",
      explanation: "Step 1: Speed at the bottom of an incline of height h is v = √[ 2gh / (1 + k² / R²) ].\n\nStep 2: For a solid sphere: k² / R² = 0.40  →  1 + k² / R² = 1.40.\nFor a solid cylinder: k² / R² = 0.50  →  1 + k² / R² = 1.50.\nFor a ring: k² / R² = 1.00  →  1 + k² / R² = 2.00.\n\nStep 3: A smaller value of (1 + k² / R²) results in a larger linear speed. Hence, v_sphere > v_cylinder > v_ring.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2441, // Q122
    similar_question: {
      question: "A body of mass M and radius R rolls without slipping down an incline of angle θ. The magnitude of the friction force acting on a thin spherical shell is:",
      option_a: "(2/5) M g sin θ",
      option_b: "(2/7) M g sin θ",
      option_c: "(1/3) M g sin θ",
      option_d: "(1/2) M g sin θ",
      correct_option: "A",
      explanation: "Step 1: The friction force in pure rolling down an incline is:\nf = M g sin θ / (1 + R² / k²).\n\nStep 2: For a thin spherical shell, k² = (2/3) R², so R² / k² = 3/2.\n\nStep 3: Substitute R² / k² = 3/2 into the friction equation:\nf = M g sin θ / (1 + 3/2) = M g sin θ / (5/2) = (2/5) M g sin θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2442, // Q123
    similar_question: {
      question: "The position vector of a particle is r⃗ = 3î + 2ĵ − k̂ and its linear momentum is p⃗ = 2î − 3ĵ + 4k̂. Which Cartesian coordinate axis is perpendicular to the angular momentum vector L⃗ about the origin?",
      option_a: "None; L⃗ has non-zero components along x, y, and z axes",
      option_b: "x-axis",
      option_c: "y-axis",
      option_d: "z-axis",
      correct_option: "A",
      explanation: "Step 1: Angular momentum L⃗ = r⃗ × p⃗.\nCompute the cross product:\nL_x = y p_z − z p_y = (2)(4) − (−1)(−3) = 8 − 3 = 5.\nL_y = z p_x − x p_z = (−1)(2) − (3)(4) = −2 − 12 = −14.\nL_z = x p_y − y p_x = (3)(−3) − (2)(2) = −9 − 4 = −13.\n\nStep 2: L⃗ = 5î − 14ĵ − 13k̂.\nSince all three components (L_x, L_y, L_z) are non-zero, L⃗ is not perpendicular to any of the coordinate axes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2443, // Q124
    similar_question: {
      question: "A force F⃗ = 2b î + 4 ĵ + 2 k̂ acts on a particle located at position vector r⃗ = 4 î − 8 ĵ − 4 k̂. If the angular momentum of the particle about the origin is conserved, what must be the numerical value of b?",
      option_a: "−2",
      option_b: "2",
      option_c: "0",
      option_d: "−1",
      correct_option: "A",
      explanation: "Step 1: Angular momentum about the origin is conserved if and only if the net torque about the origin is zero:\nτ⃗ = r⃗ × F⃗ = 0⃗.\n\nStep 2: For two non-zero vectors to have zero cross product, they must be collinear (proportional):\nr_x / F_x = r_y / F_y = r_z / F_z.\n\nStep 3: Equate the ratios:\nr_y / F_y = (−8) / 4 = −2, and r_z / F_z = (−4) / 2 = −2.\nThen: r_x / F_x = 4 / (2b) = −2  →  2 / b = −2  →  b = −1 / 1 = −2 (since 4 / 2b = -2 => 2b = -2 => b = -1, wait: 4 / (2b) = 2/b = -2 => b = -1).\nLet's check: If b = -1, F = -2î + 4ĵ + 2k̂, r = 4î - 8ĵ - 4k̂ = -2 F⃗. Yes, b = -1.\nLet's set option_a: \"−1\", option_b: \"1\", option_c: \"−2\", option_d: \"2\".",
      option_a: "−1",
      option_b: "1",
      option_c: "−2",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: Angular momentum is conserved when the torque τ⃗ = r⃗ × F⃗ = 0⃗.\n\nStep 2: Torque vanishes when r⃗ and F⃗ are parallel, meaning their components are proportional:\nr_x / F_x = r_y / F_y = r_z / F_z.\n\nStep 3: Compute the ratio using y and z components:\nr_y / F_y = −8 / 4 = −2,  and  r_z / F_z = −4 / 2 = −2.\n\nStep 4: Equate for the x-component:\n4 / (2b) = −2  →  2 / b = −2  →  b = −1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2444, // Q125
    similar_question: {
      question: "A particle of mass m moves along a circular path of radius R with constant speed. If its angular momentum about the centre of the circle is L, what is the magnitude of the centripetal force acting on the particle?",
      option_a: "L² / (m R³)",
      option_b: "L² / (m² R)",
      option_c: "L / (m R²)",
      option_d: "m L² / R³",
      correct_option: "A",
      explanation: "Step 1: Angular momentum of a particle in circular motion of radius R is L = m v R, which gives v = L / (m R).\n\nStep 2: The centripetal force is given by F_c = m v² / R.\n\nStep 3: Substitute v into the force expression:\nF_c = m [L / (m R)]² / R = m [L² / (m² R²)] / R = L² / (m R³).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2445, // Q126
    similar_question: {
      question: "A point particle is revolving in a horizontal plane in a circle about a fixed vertical axis. The direction of its angular momentum vector is:",
      option_a: "Along the axis of rotation perpendicular to the plane of orbit",
      option_b: "Along the instantaneous radius toward the centre",
      option_c: "Tangential to the circular trajectory",
      option_d: "At 45° to the plane of the circular orbit",
      correct_option: "A",
      explanation: "Step 1: The angular momentum of a particle about the centre is defined by L⃗ = r⃗ × p⃗.\n\nStep 2: The position vector r⃗ lies radially in the orbital plane, and the linear momentum p⃗ is tangential to the circular path.\n\nStep 3: By the right-hand rule, the vector cross product r⃗ × p⃗ is strictly perpendicular to both r⃗ and p⃗, pointing along the axis of rotation perpendicular to the orbital plane.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2446, // Q127
    similar_question: {
      question: "A uniform solid sphere of mass M and radius R rolls without slipping on a horizontal surface with angular speed ω. What is the magnitude of its total angular momentum about the instantaneous point of contact with the ground?",
      option_a: "(7/5) M R² ω",
      option_b: "(2/5) M R² ω",
      option_c: "(5/3) M R² ω",
      option_d: "M R² ω",
      correct_option: "A",
      explanation: "Step 1: In pure rolling, the instantaneous axis of rotation passes through the contact point with the ground.\n\nStep 2: By the parallel-axis theorem, the moment of inertia about the contact point is:\nI_contact = I_cm + M R² = (2/5) M R² + M R² = (7/5) M R².\n\nStep 3: Total angular momentum about the contact point is:\nL = I_contact ω = (7/5) M R² ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2447, // Q128
    similar_question: {
      question: "Two rotating bodies A and B have moments of inertia I_A and I_B with I_A > I_B. If their rotational kinetic energies are equal, what is the relation between their angular momenta L_A and L_B?",
      option_a: "L_A > L_B",
      option_b: "L_A < L_B",
      option_c: "L_A = L_B",
      option_d: "L_A L_B = 1",
      correct_option: "A",
      explanation: "Step 1: Rotational kinetic energy is related to angular momentum by:\nK = L² / (2I)  →  L = √(2 I K).\n\nStep 2: Since both bodies have the same kinetic energy (K_A = K_B = K):\nL_A / L_B = √(I_A / I_B).\n\nStep 3: Because I_A > I_B, it follows that √(I_A / I_B) > 1, so L_A > L_B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2448, // Q129
    similar_question: {
      question: "A particle of mass m moves along a circular path of radius R with a constant linear speed v. With respect to the centre of the circle, the particle's angular momentum vector:",
      option_a: "Remains constant in both magnitude and direction",
      option_b: "Changes in magnitude but has a constant direction",
      option_c: "Has a constant magnitude but changes direction continuously",
      option_d: "Is identically zero at all times",
      correct_option: "A",
      explanation: "Step 1: Magnitude of angular momentum: |L⃗| = |r⃗ × p⃗| = m v R sin 90° = m v R. Since m, v, and R are constant, the magnitude is strictly constant.\n\nStep 2: Direction: Since the motion remains in a fixed plane, the right-hand rule gives a direction perpendicular to that plane which never tilts or flips.\n\nStep 3: Hence, the angular momentum vector L⃗ remains completely constant in both magnitude and direction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2449, // Q130
    similar_question: {
      question: "A diver leaping from a high board pulls her arms and legs tightly inward toward her body. This action enables her to rotate faster primarily because:",
      option_a: "Her moment of inertia decreases, causing her angular speed to increase by conservation of angular momentum",
      option_b: "An external gravitational torque accelerates her rotation",
      option_c: "Her linear momentum increases proportionally",
      option_d: "Her total mechanical energy increases due to internal work",
      correct_option: "A",
      explanation: "Step 1: In the absence of external torque about her centre of mass, the diver's angular momentum is conserved: L = I ω = constant.\n\nStep 2: By folding her arms and legs inward, she distributes her mass closer to the axis of rotation, which significantly reduces her moment of inertia (I).\n\nStep 3: Since L is constant, a decrease in I requires a corresponding increase in angular velocity ω (ω = L / I).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2450, // Q131
    similar_question: {
      question: "A circular turntable rotates freely about a vertical axle through its centre at 120 rpm. A lump of clay of mass m falls vertically and sticks to the turntable at a distance r from the axle. The rotational speed subsequently drops to 80 rpm. What is the moment of inertia I of the turntable?",
      option_a: "2 m r²",
      option_b: "m r²",
      option_c: "(1/2) m r²",
      option_d: "(3/2) m r²",
      correct_option: "A",
      explanation: "Step 1: Since external torque about the axle is zero, angular momentum is conserved:\nI ω₁ = (I + m r²) ω₂.\n\nStep 2: Given ω₁ = 120 rpm and ω₂ = 80 rpm:\nI (120) = (I + m r²) (80).\n\nStep 3: Simplify and solve for I:\n120 I = 80 I + 80 m r²  →  40 I = 80 m r²  →  I = 2 m r².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2451, // Q132
    similar_question: {
      question: "A uniform circular ring of mass M and radius R rotates about its central perpendicular axis with angular speed ω₀. Two point masses, each of mass m, are gently attached to diametrically opposite points on the ring. What is the new angular speed of the system?",
      option_a: "[ M / (M + 2m) ] ω₀",
      option_b: "[ (M + 2m) / M ] ω₀",
      option_c: "[ M / (M + m) ] ω₀",
      option_d: "[ (M + m) / M ] ω₀",
      correct_option: "A",
      explanation: "Step 1: Initial moment of inertia of the ring is I₁ = M R², and initial angular momentum is L = M R² ω₀.\n\nStep 2: When two masses each of mass m are placed at distance R from the axis, the new total moment of inertia becomes:\nI₂ = M R² + 2 (m R²) = (M + 2m) R².\n\nStep 3: Conserving angular momentum (I₁ ω₀ = I₂ ω):\nM R² ω₀ = (M + 2m) R² ω  →  ω = [ M / (M + 2m) ] ω₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2452, // Q133
    similar_question: {
      question: "Two coaxial discs having moments of inertia I₁ and I₂ rotate about the same axis in opposite directions with angular speeds ω₁ and ω₂ (with I₁ ω₁ > I₂ ω₂). When brought into contact, they couple and rotate together. What is the common final angular speed?",
      option_a: "(I₁ ω₁ − I₂ ω₂) / (I₁ + I₂)",
      option_b: "(I₁ ω₁ + I₂ ω₂) / (I₁ + I₂)",
      option_c: "(I₁ ω₁ − I₂ ω₂) / (ω₁ + ω₂)",
      option_d: "(I₁ + I₂) / (I₁ ω₁ + I₂ ω₂)",
      correct_option: "A",
      explanation: "Step 1: Taking one rotational direction as positive, the initial total angular momentum is:\nL_initial = I₁ ω₁ − I₂ ω₂.\n\nStep 2: After coupling, the combined moment of inertia is I_total = I₁ + I₂.\n\nStep 3: By conservation of angular momentum:\n(I₁ + I₂) ω_f = I₁ ω₁ − I₂ ω₂  →  ω_f = (I₁ ω₁ − I₂ ω₂) / (I₁ + I₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2453, // Q134
    similar_question: {
      question: "A small mass m attached to a light string moves in a circle of radius R₀ with speed v₀ on a frictionless horizontal table. The string passes through a small hole in the centre and is pulled from below until the radius becomes R₀ / 2. What is the new kinetic energy of the mass?",
      option_a: "2 m v₀²",
      option_b: "m v₀²",
      option_c: "(1/2) m v₀²",
      option_d: "4 m v₀²",
      correct_option: "A",
      explanation: "Step 1: Because the tension force is purely radial, it exerts zero torque about the central hole. Angular momentum is conserved:\nL = m v₀ R₀ = m v₁ (R₀ / 2)  →  v₁ = 2 v₀.\n\nStep 2: The new kinetic energy is:\nK₁ = (1/2) m v₁² = (1/2) m (2 v₀)² = (1/2) m (4 v₀²) = 2 m v₀².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2454, // Q135
    similar_question: {
      question: "A solid cylinder of mass M and radius R is projected with an initial linear velocity v₀ without initial rotation on a rough horizontal surface. What is the speed of the cylinder when it achieves pure rolling motion?",
      option_a: "(2/3) v₀",
      option_b: "(3/5) v₀",
      option_c: "(5/7) v₀",
      option_d: "(1/2) v₀",
      correct_option: "A",
      explanation: "Step 1: The friction force acts at the bottom surface. Taking angular momentum about any point on the horizontal surface, the torque due to friction and normal reaction is zero. Therefore, angular momentum about this point is conserved.\n\nStep 2: Initial angular momentum about a point on the surface is L_i = M v₀ R.\n\nStep 3: In pure rolling with final velocity v_f and angular velocity ω = v_f / R:\nL_f = I_cm ω + M v_f R = (1/2 M R²) (v_f / R) + M v_f R = (3/2) M v_f R.\n\nStep 4: Equate L_i and L_f:\nM v₀ R = (3/2) M v_f R  →  v_f = (2/3) v₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2455, // Q136
    similar_question: {
      question: "A solid sphere is released from rest at the top of a smooth inclined plane. During its downward slide, its angular momentum is conserved about:",
      option_a: "Any fixed point lying on a line that is parallel to the inclined plane and passes through the sphere's centre",
      option_b: "The instantaneous point of contact with the plane only",
      option_c: "Every arbitrary point in the universe",
      option_d: "No point whatsoever",
      correct_option: "A",
      explanation: "Step 1: On a smooth incline, friction is zero. The only forces acting on the sphere are gravity (M g vertically downwards) and normal force N perpendicular to the incline.\n\nStep 2: The normal force line of action passes through the centre of the sphere, and the component of gravity perpendicular to the incline also passes through the centre.\n\nStep 3: About any point lying on a line passing through the centre and parallel to the incline, the torque of all acting forces is identically zero, so angular momentum about such a line remains conserved.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2456, // Q137
    similar_question: {
      question: "An insect crawls steadily from one edge of a horizontally rotating circular turntable to the opposite edge along a diameter. The turntable is mounted on a frictionless vertical axle. How does the angular speed of the turntable change during the insect's crawl?",
      option_a: "First increases until the insect reaches the centre, then decreases",
      option_b: "First decreases until the insect reaches the centre, then increases",
      option_c: "Increases monotonically throughout",
      option_d: "Remains constant throughout",
      correct_option: "A",
      explanation: "Step 1: External torque about the axle is zero, so total angular momentum L = I(r) ω is conserved.\n\nStep 2: As the insect crawls from the edge toward the centre, its distance r from the axle decreases, reducing the system's moment of inertia I(r) = I_table + m r² to a minimum at the centre (r = 0).\n\nStep 3: As I decreases, ω must increase to keep L constant. As the insect moves past the centre toward the opposite edge, r increases again, so I increases and ω decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2457, // Q138
    similar_question: {
      question: "A spherical cloud of interstellar gas of mass M is rotating freely in outer space with angular velocity ω. If the cloud slowly contracts under self-gravity to half of its initial radius without losing mass, which quantity remains strictly conserved?",
      option_a: "Angular momentum",
      option_b: "Rotational kinetic energy",
      option_c: "Angular velocity",
      option_d: "Moment of inertia",
      correct_option: "A",
      explanation: "Step 1: Gravitational forces between particles of the cloud are internal central forces, generating zero net external torque (τ_ext = 0).\n\nStep 2: By the principle of conservation of angular momentum, when τ_ext = 0, the total angular momentum L = I ω must remain strictly constant.\n\nStep 3: As the radius shrinks, I decreases, causing ω to increase and rotational kinetic energy (K = L² / 2I) to increase, but L remains unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2458, // Q139
    similar_question: {
      question: "A horizontal circular platform of radius R = 1.0 m and moment of inertia I = 50 kg·m² is initially at rest on a frictionless vertical axle. A person of mass m = 50 kg stands at the rim and walks around the perimeter at a speed of 1.0 m/s relative to the ground. What is the time taken by the person to complete one full revolution relative to the ground?",
      option_a: "2π s",
      option_b: "π s",
      option_c: "4π s",
      option_d: "π / 2 s",
      correct_option: "A",
      explanation: "Step 1: The circumference of the circular path of radius R = 1.0 m is C = 2π R = 2π (1.0) = 2π m.\n\nStep 2: The person's speed relative to the ground is given directly as v = 1.0 m/s.\n\nStep 3: The time taken to complete one full revolution relative to the ground is:\nT = C / v = 2π / 1.0 = 2π s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2459, // Q140
    similar_question: {
      question: "A stationary circular disc of moment of inertia I_A is dropped coaxially onto a second circular disc of moment of inertia I_B rotating at angular speed ω₀. If the two discs stick and rotate together, what is their final angular velocity?",
      option_a: "I_B ω₀ / (I_A + I_B)",
      option_b: "I_A ω₀ / (I_A + I_B)",
      option_c: "(I_A + I_B) ω₀ / I_B",
      option_d: "ω₀ / 2",
      correct_option: "A",
      explanation: "Step 1: The net external torque acting on the two-disc system along the axis of rotation is zero.\n\nStep 2: Conserve angular momentum:\nL_initial = L_final  →  I_B ω₀ = (I_A + I_B) ω_final.\n\nStep 3: Solve for ω_final:\nω_final = I_B ω₀ / (I_A + I_B).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2460, // Q141
    similar_question: {
      question: "A spinning figure skater has initial angular speed ω and moment of inertia I. When she pulls her arms in, her moment of inertia decreases by 60%. What is her new angular speed?",
      option_a: "2.5 ω",
      option_b: "1.5 ω",
      option_c: "0.4 ω",
      option_d: "3.0 ω",
      correct_option: "A",
      explanation: "Step 1: If moment of inertia decreases by 60%, the new moment of inertia is:\nI_new = I − 0.60 I = 0.40 I = (2/5) I.\n\nStep 2: By conservation of angular momentum:\nI ω = I_new ω_new  →  I ω = 0.40 I ω_new.\n\nStep 3: Solve for ω_new:\nω_new = ω / 0.40 = 2.5 ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2461, // Q142
    similar_question: {
      question: "A solid sphere is released from rest on a smooth inclined plane. Which of the following statements about its angular momentum L⃗ is correct?",
      option_a: "L⃗ is conserved about any point on a line passing through the centre of mass parallel to the inclined plane",
      option_b: "L⃗ is conserved about the point of contact only",
      option_c: "L⃗ is conserved about every point in space",
      option_d: "L⃗ is not conserved about any point",
      correct_option: "A",
      explanation: "Step 1: On a smooth incline, there is no friction. The normal force passes through the centre of the sphere, and gravity acts at the centre.\n\nStep 2: Consequently, about any point along a line parallel to the inclined plane passing through the sphere's centre, the net external torque is zero.\n\nStep 3: Therefore, angular momentum is conserved about any point on this line.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2462, // Q143
    similar_question: {
      question: "A disc of moment of inertia I₁ rotates with angular speed ω₁. Another stationary disc of moment of inertia I₂ is dropped coaxially onto it. If they rotate together with final speed ω_f, the loss in rotational kinetic energy of the system is:",
      option_a: "(1/2) [ I₁ I₂ / (I₁ + I₂) ] ω₁²",
      option_b: "(1/2) (I₁ + I₂) ω₁²",
      option_c: "[ I₁ I₂ / (I₁ + I₂) ] ω₁²",
      option_d: "(1/4) [ I₁ I₂ / (I₁ + I₂) ] ω₁²",
      correct_option: "A",
      explanation: "Step 1: By conservation of angular momentum: ω_f = I₁ ω₁ / (I₁ + I₂).\n\nStep 2: Initial kinetic energy: K_i = (1/2) I₁ ω₁².\nFinal kinetic energy: K_f = (1/2) (I₁ + I₂) ω_f² = (1/2) [ I₁² ω₁² / (I₁ + I₂) ].\n\nStep 3: Kinetic energy loss: ΔK = K_i − K_f\nΔK = (1/2) I₁ ω₁² [1 − I₁ / (I₁ + I₂)] = (1/2) [ I₁ I₂ / (I₁ + I₂) ] ω₁².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2463, // Q144
    similar_question: {
      question: "Two identical circular discs, each of moment of inertia I, rotate coaxially with angular velocities ω₁ and ω₂ in the same direction. When brought into contact, they adhere and rotate with a common angular speed. The loss of rotational kinetic energy is:",
      option_a: "(1/4) I (ω₁ − ω₂)²",
      option_b: "(1/2) I (ω₁ − ω₂)²",
      option_c: "(1/4) I (ω₁ + ω₂)²",
      option_d: "I (ω₁ − ω₂)²",
      correct_option: "A",
      explanation: "Step 1: Formula for loss in kinetic energy upon coupling two coaxial rotating bodies:\nΔK = (1/2) [ (I₁ I₂) / (I₁ + I₂) ] (ω₁ − ω₂)².\n\nStep 2: Here I₁ = I₂ = I, so:\n(I₁ I₂) / (I₁ + I₂) = (I × I) / (2I) = I / 2.\n\nStep 3: Substitute into the loss expression:\nΔK = (1/2) (I / 2) (ω₁ − ω₂)² = (1/4) I (ω₁ − ω₂)².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2464, // Q145
    similar_question: {
      question: "A uniform cube of mass m and edge length a rests on a rough horizontal surface with sufficiently high friction so that it does not slide. What is the minimum horizontal force F applied at the top edge of the cube required to topple it?",
      option_a: "m g / 2",
      option_b: "m g",
      option_c: "m g / 4",
      option_d: "2 m g",
      correct_option: "A",
      explanation: "Step 1: To topple the cube about the front bottom edge, the torque of the applied force about that edge must overcome the restoring torque of gravity.\n\nStep 2: Torque of gravity about the edge: τ_g = m g × (a / 2).\nTorque of the horizontal force applied at the top edge (height a): τ_F = F × a.\n\nStep 3: Setting τ_F ≥ τ_g for impending toppling:\nF a ≥ m g (a / 2)  →  F ≥ m g / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2465, // Q146
    similar_question: {
      question: "A rectangular block of height h and base width b rests on the flat bed of a truck. The friction between the block and the truck bed is large enough to prevent sliding. What is the maximum forward acceleration a_max of the truck such that the block does not topple backwards?",
      option_a: "g b / h",
      option_b: "g h / b",
      option_c: "g b / (2h)",
      option_d: "2 g b / h",
      correct_option: "A",
      explanation: "Step 1: In the reference frame of the truck accelerating at a, a pseudo force m a acts horizontally through the centre of mass (at height h / 2).\n\nStep 2: The pseudo force exerts a toppling torque about the rear edge: τ_topple = m a × (h / 2).\nGravity exerts a restoring torque about the rear edge: τ_restore = m g × (b / 2).\n\nStep 3: The block does not topple if τ_topple ≤ τ_restore:\nm a (h / 2) ≤ m g (b / 2)  →  a h ≤ g b  →  a_max = g b / h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2466, // Q147
    similar_question: {
      question: "A uniform ladder rests with its upper end against a smooth vertical wall and its lower end on a rough horizontal floor. If the coefficient of static friction with the floor is μ, the ladder is prevented from sliding by:",
      option_a: "Static friction on the floor directed horizontally toward the wall",
      option_b: "Static friction on the wall directed vertically upward",
      option_c: "Friction acting along the length of the ladder",
      option_d: "Air resistance only",
      correct_option: "A",
      explanation: "Step 1: The normal force from the smooth vertical wall pushes the ladder horizontally outward away from the wall (N_wall).\n\nStep 2: For horizontal translational equilibrium (Σ F_x = 0), a balancing horizontal force must act on the ladder: f_floor = N_wall.\n\nStep 3: This balancing force is static friction at the base of the ladder, directed horizontally toward the vertical wall.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2467, // Q148
    similar_question: {
      question: "Statement I: For a rigid body undergoing pure rotation about a fixed axis, the angular velocity vector ω⃗ is parallel to the axis of rotation, while the acceleration of any point not on the axis has components directed perpendicular to the axis.\nStatement II: For a particle moving along a straight line at constant velocity, its angular momentum with respect to a fixed origin on that line is zero.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Statement I: In pure rotation, ω⃗ lies along the axis of rotation. The acceleration of any particle has a centripetal component pointing radially inward toward the axis, perpendicular to the axis. Thus, Statement I is true.\n\nStep 2: Statement II: For a particle moving along a straight line containing the origin, the position vector r⃗ is parallel to the velocity vector v⃗, so L⃗ = r⃗ × p⃗ = 0⃗. Thus, Statement II is true.\n\nStep 3: Since both statements are true, Option (A) is correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2468, // Q149
    similar_question: {
      question: "Statement I: In a rigid body in pure rotation, all particles rotate with the same angular velocity regardless of their distance from the axis of rotation.\nStatement II: Particles situated further from the axis of rotation move with higher linear speeds according to v = ω r.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: In a rigid body undergoing pure rotation about an axis, every particle turns through the exact same angular displacement in any given time interval, so all particles share the identical angular velocity ω. Statement I is true.\n\nStep 2: The linear speed is v = ω r. Since ω is constant for all particles, linear speed v is directly proportional to the perpendicular distance r from the axis of rotation. Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2469, // Q150
    similar_question: {
      question: "Statement I: When a rigid body rotates uniformly about a fixed vertical axis, the net force on every particle not located on the axis is purely horizontal and directed toward the axis.\nStatement II: When a rigid body rotates with non-zero angular acceleration about a fixed vertical axis, the net acceleration of any particle not on the axis has both radial and tangential components.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: For uniform rotation (α = 0), a_tangential = 0, so the only acceleration is centripetal acceleration a_c = ω² r, which is horizontal and points toward the axis. Statement I is true.\n\nStep 2: For non-uniform rotation (α ≠ 0), each particle has both centripetal acceleration (a_c = ω² r radially inward) and tangential acceleration (a_t = α r perpendicular to the radius). Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2470, // Q151
    similar_question: {
      question: "Statement I: A uniform rod of mass m and length L is whirled in a horizontal plane about one fixed end at constant angular velocity ω. The tension in the rod at its fixed clamped end is m ω² L / 2.\nStatement II: Two identical circular discs of same material have radii R and 2R. The ratio of their moments of inertia about their central perpendicular axes is 1 : 16.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Statement I: Tension at the pivot equals the total centripetal force required by the rod: T = m ω² r_cm = m ω² (L / 2) = m ω² L / 2. Statement I is true.\n\nStep 2: Statement II: For a uniform disc of radius R, mass m ∝ R², so m = k R². Moment of inertia is I = (1/2) m R² = (1/2) k R⁴. Thus, I ∝ R⁴. For radii R and 2R, I₁ / I₂ = (R / 2R)⁴ = 1 / 16. Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2471, // Q152
    similar_question: {
      question: "Statement I: A closed cylindrical tube partially filled with liquid is rotated about a perpendicular bisector of its length. As the rotation speed increases, the liquid moves toward the ends, increasing the system's moment of inertia.\nStatement II: The moment of inertia of a body about a given axis depends only on its total mass and not on how the mass is distributed relative to the axis.\nWhich of the following is correct?",
      option_a: "Statement I is true, Statement II is false",
      option_b: "Both Statement I and Statement II are true",
      option_c: "Both Statement I and Statement II are false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: As rotation occurs, liquid is forced outward toward the two ends away from the central axis. Because more mass is located further from the axis, I = ∫ r² dm increases. Statement I is true.\n\nStep 2: Moment of inertia fundamentally depends on mass distribution relative to the axis (I = Σ m_i r_i²), not merely total mass. Statement II is false.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2472, // Q153
    similar_question: {
      question: "Statement I: When an ice skater pulls her outstretched arms inward, her moment of inertia decreases, and her angular speed increases by conservation of angular momentum.\nStatement II: During this arm-pulling maneuver, the skater does positive internal work, causing her rotational kinetic energy to increase.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Since external torque is zero, L = I ω is conserved. Pulling arms inward decreases I, so ω must increase. Statement I is true.\n\nStep 2: The skater must pull inward against centrifugal effects, performing positive work with her muscles. This internal work increases the rotational kinetic energy K = L² / (2I) (since I decreases while L is constant). Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2473, // Q154
    similar_question: {
      question: "A wheel of radius R rolls without slipping on a horizontal plane such that its centre of mass moves with speed v₀. What is the instantaneous speed of a point on the rim situated at the same horizontal height as the centre of mass?",
      option_a: "√2 v₀",
      option_b: "v₀",
      option_c: "2 v₀",
      option_d: "v₀ / √2",
      correct_option: "A",
      explanation: "Step 1: The velocity of any point on the rolling wheel is the vector sum of translational velocity v_cm î and rotational velocity v_rot.\n\nStep 2: At a point on the rim at the same horizontal level as the centre of mass, the rotational velocity is purely vertical: v_rot = ω R = v₀ (pointing upwards or downwards).\n\nStep 3: Since translational velocity v₀ is horizontal and rotational velocity v₀ is vertical (mutually perpendicular):\nv_net = √(v_cm² + v_rot²) = √(v₀² + v₀²) = √2 v₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2474, // Q155
    similar_question: {
      question: "Statement I: A uniform solid sphere and a hollow sphere of equal mass and radius are released from rest at the top of a smooth inclined plane. Both take the exact same time to reach the bottom.\nStatement II: On a perfectly smooth inclined plane, bodies purely slide without rolling because friction is zero.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: On a smooth incline, friction f = 0, so no torque can be produced about the centre of mass (τ = 0). As a result, neither sphere rotates; both purely slide down with linear acceleration a = g sin θ. Statement II is true.\n\nStep 2: Since both bodies slide down with identical acceleration a = g sin θ, they cover the same distance in the same time: t = √(2L / (g sin θ)). Statement I is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2475, // Q156
    similar_question: {
      question: "Statement I: A point mass moves along a straight line at constant speed. Its angular momentum about any reference point lying on that straight line is zero.\nStatement II: The angular momentum of this particle about any fixed point not on the line of motion remains constant in time.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Angular momentum is L⃗ = r⃗ × p⃗. If the reference point lies on the line of motion, r⃗ and p⃗ are collinear, so r⃗ × p⃗ = 0⃗. Statement I is true.\n\nStep 2: If the reference point is at a perpendicular distance d from the line of motion, |L⃗| = |r⃗ × p⃗| = p (r sin θ) = m v d. Since m, v, and d are constant, L remains constant in both magnitude and direction. Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2476, // Q157
    similar_question: {
      question: "Statement I: If the net external torque acting on a deformable system of particles is zero, its total angular momentum is strictly conserved.\nStatement II: Even if no external forces act on a non-rigid body, internal forces can alter the configuration of the body and thereby change its moment of inertia.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true, Statement II is false",
      option_d: "Statement I is false, Statement II is true",
      correct_option: "A",
      explanation: "Step 1: According to Newton's second law for rotation, dL⃗/dt = τ⃗_ext. If τ⃗_ext = 0, then L⃗ = constant regardless of whether the body is rigid or deformable. Statement I is true.\n\nStep 2: Internal forces can cause parts of a non-rigid body to move closer to or further from the rotation axis, altering the mass distribution and changing its moment of inertia I (as seen when an ice skater pulls her arms in). Statement II is true.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 8 Part 3 (${set8Part3Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set8Part3Updates) {
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
        console.log(`[${successCount}/${set8Part3Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 8 Part 3 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart3();
