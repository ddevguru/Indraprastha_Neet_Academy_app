const fs = require('fs');

const set8Part4Updates = [
  {
    id: 2477, // Q158
    similar_question: {
      question: "Statement I: If I_A and I_B are moments of inertia of a rigid body about axes A and B, where A passes through the centre of mass and B does not, and I_A < I_B, then the two axes must necessarily be parallel.\nStatement II: According to the parallel axis theorem, if axis A passes through the centre of mass and axis B is parallel to A at distance d, then I_B = I_A + M d², which implies I_B > I_A.\nWhich of the following is correct?",
      option_a: "Statement I is false, Statement II is true",
      option_b: "Both Statement I and Statement II are true",
      option_c: "Both Statement I and Statement II are false",
      option_d: "Statement I is true, Statement II is false",
      correct_option: "A",
      explanation: "Step 1: Statement I: Two axes do not need to be parallel for I_B to be greater than I_A. Even if B is not parallel to A, its moment of inertia can still be larger than I_A depending on orientation and distance from CM. Statement I is false.\n\nStep 2: Statement II: The parallel axis theorem states I_parallel = I_cm + M d². Since M d² > 0 for any non-zero separation d, I_B is always strictly greater than I_A. Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2478, // Q159
    similar_question: {
      question: "Statement I: When a solid sphere rotates about a diameter, every point on the outer surface of the sphere moves with the same linear speed.\nStatement II: Two solid spheres of different masses and different radii roll down from rest from the same height on the same rough inclined plane without slipping. Both spheres reach the bottom at the same time.\nWhich of the following is correct?",
      option_a: "Statement I is false, Statement II is true",
      option_b: "Both Statement I and Statement II are true",
      option_c: "Both Statement I and Statement II are false",
      option_d: "Statement I is true, Statement II is false",
      correct_option: "A",
      explanation: "Step 1: Statement I: For a rotating sphere, linear speed of a surface particle is v = ω r_perp, where r_perp is the perpendicular distance from the rotation axis. Particles at the poles (on the axis) have speed 0, while particles at the equator have speed ω R. Thus, surface particles do not all have the same linear speed. Statement I is false.\n\nStep 2: Statement II: Linear acceleration in pure rolling down an incline is a = g sin θ / (1 + k² / R²). For any solid sphere, k² / R² = 2/5, giving a = (5/7) g sin θ, which is completely independent of mass and radius. Hence, both spheres have identical acceleration and arrive simultaneously. Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2479, // Q160
    similar_question: {
      question: "Statement I: A solid sphere released from rest on a perfectly smooth horizontal surface can undergo pure rolling motion.\nStatement II: For a solid sphere to roll without slipping down an incline of angle θ, the minimum coefficient of static friction required is μ_min = (2/7) tan θ.\nWhich of the following is correct?",
      option_a: "Statement I is false, Statement II is true",
      option_b: "Both Statement I and Statement II are true",
      option_c: "Both Statement I and Statement II are false",
      option_d: "Statement I is true, Statement II is false",
      correct_option: "A",
      explanation: "Step 1: Statement I: On a smooth horizontal surface, if a sphere is released from rest, no torque can be applied to rotate it, so it cannot initiate rolling motion. (Even if pushed horizontally, friction is zero so torque is zero and it purely slides). Statement I is false.\n\nStep 2: Statement II: For pure rolling down an incline, the condition is μ ≥ tan θ / (1 + R² / k²). For a solid sphere, k² / R² = 2/5, so R² / k² = 5/2, yielding μ_min = tan θ / (1 + 5/2) = (2/7) tan θ. Statement II is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2480, // Q161
    similar_question: {
      question: "A uniform rod of length L and mass M is pivoted smoothly at one end and held horizontally. When released from rest, what is its initial angular acceleration α about the pivot?",
      option_a: "3g / (2L)",
      option_b: "2g / (3L)",
      option_c: "g / (2L)",
      option_d: "3g / L",
      correct_option: "A",
      explanation: "Step 1: The centre of mass of the rod is at distance L / 2 from the pivot. The torque due to gravity about the pivot is:\nτ = M g (L / 2).\n\nStep 2: The moment of inertia of the rod about an axis through one end is:\nI = (1/3) M L².\n\nStep 3: Angular acceleration is given by α = τ / I:\nα = [ M g (L / 2) ] / [ (1/3) M L² ] = (1/2) / (1/3) × (g / L) = 3g / (2L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2481, // Q162
    similar_question: {
      question: "When a ceiling fan rotating with initial angular velocity ω₀ is switched off, its angular velocity drops to ω₀ / 2 while completing 45 revolutions under constant angular retardation. How many additional revolutions will it make before coming to a complete stop?",
      option_a: "15 revolutions",
      option_b: "20 revolutions",
      option_c: "30 revolutions",
      option_d: "45 revolutions",
      correct_option: "A",
      explanation: "Step 1: Use rotational kinematics: ω² = ω₀² − 2 α θ.\nIn the first phase: (ω₀ / 2)² = ω₀² − 2 α θ₁\n(1/4) ω₀² = ω₀² − 2 α θ₁  →  2 α θ₁ = (3/4) ω₀²  →  2 α (45) = (3/4) ω₀².\n\nStep 2: In the second phase from ω₀ / 2 to 0:\n0² = (ω₀ / 2)² − 2 α θ₂  →  2 α θ₂ = (1/4) ω₀².\n\nStep 3: Compare θ₂ and θ₁:\nθ₂ / θ₁ = [ (1/4) ω₀² ] / [ (3/4) ω₀² ] = 1 / 3.\nTherefore, θ₂ = θ₁ / 3 = 45 / 3 = 15 revolutions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2482, // Q163
    similar_question: {
      question: "A couple acting on a rigid body consists of two equal, opposite, and non-collinear forces. The resultant effect of a couple on the body is:",
      option_a: "Pure rotational motion with zero translational acceleration",
      option_b: "Both translational and rotational acceleration",
      option_c: "Pure translational motion with zero rotation",
      option_d: "Zero motion under all conditions",
      correct_option: "A",
      explanation: "Step 1: The net external force produced by a couple is F_net = F − F = 0.\n\nStep 2: By Newton's second law for translation, F_net = M a_cm = 0, meaning the centre of mass experiences zero linear acceleration.\n\nStep 3: However, the couple exerts a non-zero torque τ = F × d about any point, producing angular acceleration. Hence, it produces pure rotational motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2483, // Q164
    similar_question: {
      question: "A rigid body lying on a frictionless horizontal floor will undergo pure translational motion without any rotation when an external force F is applied along a line passing through its:",
      option_a: "Centre of mass",
      option_b: "Geometric boundary",
      option_c: "Point of greatest density",
      option_d: "Instantaneous axis of rotation",
      correct_option: "A",
      explanation: "Step 1: A force applied along a line passing through the centre of mass produces zero torque about the centre of mass: τ_cm = r_cm × F = 0.\n\nStep 2: Since τ_cm = 0, there is zero angular acceleration (α = 0).\n\nStep 3: The body therefore undergoes pure translational motion with acceleration a_cm = F / M without rotating.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2484, // Q165
    similar_question: {
      question: "A uniform horizontal rod of mass M and length L is suspended horizontally at rest by two vertical light strings attached at its ends. Immediately after one of the strings is cut, the tension in the remaining string becomes:",
      option_a: "M g / 4",
      option_b: "M g / 2",
      option_c: "M g",
      option_d: "3 M g / 4",
      correct_option: "A",
      explanation: "Step 1: Immediately after one string is cut, let T be the tension in the remaining string at the pivot end. The rod rotates about the uncut end.\n\nStep 2: Torque about the uncut end: τ = M g (L / 2).\nWith I_end = (1/3) M L², the initial angular acceleration is:\nα = τ / I = [ M g L / 2 ] / [ (1/3) M L² ] = 3g / (2L).\n\nStep 3: The downward acceleration of the centre of mass is:\na_cm = α (L / 2) = [ 3g / (2L) ] (L / 2) = 3g / 4.\n\nStep 4: Apply Newton's second law vertically:\nM g − T = M a_cm = M (3g / 4)  →  T = M g − 3 M g / 4 = M g / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2485, // Q166
    similar_question: {
      question: "A mass of 5 kg hangs in static equilibrium from a light rope wrapped around a cylindrical pulley of radius 0.2 m. Taking g = 9.8 m/s², what is the magnitude of the torque exerted by the tension on the pulley about its axle?",
      option_a: "9.8 N·m",
      option_b: "19.6 N·m",
      option_c: "4.9 N·m",
      option_d: "49 N·m",
      correct_option: "A",
      explanation: "Step 1: Tension in the rope supporting the hanging mass in equilibrium is:\nT = m g = 5 kg × 9.8 m/s² = 49 N.\n\nStep 2: The line of action of the tension is tangent to the cylindrical pulley of radius R = 0.2 m.\n\nStep 3: Torque exerted about the horizontal axle is:\nτ = T × R = 49 N × 0.2 m = 9.8 N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2486, // Q167
    similar_question: {
      question: "Two rotating bodies 1 and 2 have moments of inertia I₁ and I₂ such that I₁ > I₂. If their angular momenta are equal (L₁ = L₂), how do their rotational kinetic energies E₁ and E₂ compare?",
      option_a: "E₁ < E₂",
      option_b: "E₁ > E₂",
      option_c: "E₁ = E₂",
      option_d: "E₁ E₂ = 1",
      correct_option: "A",
      explanation: "Step 1: Rotational kinetic energy expressed in terms of angular momentum L is:\nE = L² / (2I).\n\nStep 2: Since L₁ = L₂ = L, the kinetic energy is inversely proportional to moment of inertia: E ∝ 1 / I.\n\nStep 3: Given I₁ > I₂, it follows that:\n1 / (2I₁) < 1 / (2I₂)  →  E₁ < E₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2487, // Q168
    similar_question: {
      question: "Two isolated point masses M and 3M are initially at rest in deep space separated by a distance d. Due to mutual gravitational attraction, they accelerate toward each other. How far does the lighter mass M travel before they collide?",
      option_a: "(3/4) d",
      option_b: "(1/4) d",
      option_c: "(2/3) d",
      option_d: "(1/2) d",
      correct_option: "A",
      explanation: "Step 1: Because no external forces act on the two-body system, the centre of mass remains stationary.\n\nStep 2: The position of the centre of mass measured from the mass M is:\nx_cm = (3M × d) / (M + 3M) = (3/4) d.\n\nStep 3: When the two point masses collide, they meet at the stationary centre of mass. Thus, the mass M travels distance x_cm = (3/4) d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2488, // Q169
    similar_question: {
      question: "A uniform thin wire is bent into a semicircle of mass M and radius R. What is its moment of inertia about an axis passing through the geometric centre of the full circle and perpendicular to the plane of the semicircle?",
      option_a: "M R²",
      option_b: "(1/2) M R²",
      option_c: "2 M R²",
      option_d: "(1/4) M R²",
      correct_option: "A",
      explanation: "Step 1: Every point on the semicircular arc is at the exact same radial distance R from the centre of curvature.\n\nStep 2: The moment of inertia is evaluated as:\nI = ∫ r² dm = R² ∫ dm = M R².\n\nStep 3: Hence, the moment of inertia about the central perpendicular axis is M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2489, // Q170
    similar_question: {
      question: "A circular disc of moment of inertia I is rotating with angular velocity ω₀ about its central vertical axle. A small bug of mass m initially at rest relative to the disc sits at the outer edge at radius R. If the bug begins to crawl along the rim with relative angular velocity ω_rel in the same direction, what happens to the angular velocity of the disc?",
      option_a: "It decreases to conserve total angular momentum",
      option_b: "It increases to conserve total angular momentum",
      option_c: "It remains completely unchanged",
      option_d: "It immediately drops to zero",
      correct_option: "A",
      explanation: "Step 1: In the absence of external torque about the axle, total angular momentum is conserved:\nL_total = constant.\n\nStep 2: If the bug gains forward angular momentum in the direction of rotation, the turntable must lose angular momentum to keep the sum constant.\n\nStep 3: Consequently, the angular velocity of the disc decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2490, // Q171
    similar_question: {
      question: "A child stands at the centre of a freely rotating turntable with arms folded. The initial kinetic energy of the rotating system is K. If the child stretches his arms outward such that the total moment of inertia of the system increases to 3 times its initial value, what is the new kinetic energy?",
      option_a: "K / 3",
      option_b: "3 K",
      option_c: "K / 9",
      option_d: "9 K",
      correct_option: "A",
      explanation: "Step 1: Since external torque is zero, angular momentum L is conserved.\n\nStep 2: Kinetic energy is related to angular momentum by K = L² / (2I).\n\nStep 3: When moment of inertia becomes I' = 3I:\nK' = L² / (2 × 3I) = (1/3) [ L² / (2I) ] = K / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2491, // Q172
    similar_question: {
      question: "A uniform rod of mass m and length L has one end pivoted on the horizontal ground. If the rod is inclined at an angle of 30° to the horizontal ground, what is its gravitational potential energy relative to the ground?",
      option_a: "(1/4) m g L",
      option_b: "(1/2) m g L",
      option_c: "(√3 / 4) m g L",
      option_d: "m g L",
      correct_option: "A",
      explanation: "Step 1: The centre of mass of a uniform rod of length L is located at its geometric midpoint, at distance L / 2 along the rod from the pivoted end.\n\nStep 2: For an angle of inclination θ = 30° to the horizontal, the vertical height of the centre of mass above the ground is:\nh_cm = (L / 2) sin 30° = (L / 2) × (1/2) = L / 4.\n\nStep 3: The gravitational potential energy is:\nU = m g h_cm = m g (L / 4) = (1/4) m g L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2492, // Q173
    similar_question: {
      question: "A light cord is wound around the rim of a flywheel of radius R and moment of inertia I mounted on a frictionless axle. A mass m is attached to the free end and released from rest. After the mass falls through a vertical distance h, what is the angular speed ω of the flywheel?",
      option_a: "√[ 2 m g h / (I + m R²) ]",
      option_b: "√[ 2 g h / R² ]",
      option_c: "√[ m g h / I ]",
      option_d: "√[ 2 m g h / (I − m R²) ]",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy, loss of potential energy of mass m equals the total kinetic energy gained by the system:\nm g h = (1/2) m v² + (1/2) I ω².\n\nStep 2: Since the cord unwinds without slipping, linear speed v = ω R:\nm g h = (1/2) m (ω R)² + (1/2) I ω² = (1/2) (I + m R²) ω².\n\nStep 3: Solve for ω:\nω² = 2 m g h / (I + m R²)  →  ω = √[ 2 m g h / (I + m R²) ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2493, // Q174
    similar_question: {
      question: "Two people of masses 40 kg and 60 kg stand at opposite ends of a stationary boat of length 4.0 m and mass 100 kg floating on calm, frictionless water. If both people walk to the centre of the boat and meet, what is the displacement of the centre of mass of the entire system relative to the water?",
      option_a: "Zero",
      option_b: "0.2 m",
      option_c: "0.4 m",
      option_d: "1.0 m",
      correct_option: "A",
      explanation: "Step 1: The system consists of the two people and the boat. The water provides negligible horizontal resistance, so the net external horizontal force is zero (F_ext,x = 0).\n\nStep 2: According to Newton's first law for a system of particles, when F_ext = 0, the centre of mass of the system cannot accelerate or shift.\n\nStep 3: Therefore, the shift of the centre of mass of the entire three-body system relative to the water is identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2494, // Q175
    similar_question: {
      question: "A uniform circular disc rolls without slipping along a horizontal track with centre-of-mass speed v_cm. Consider the highest point on the rim (point T) and the lowest point in contact with the ground (point B). What are their respective instantaneous speeds?",
      option_a: "v_T = 2 v_cm, v_B = 0",
      option_b: "v_T = v_cm, v_B = 0",
      option_c: "v_T = 2 v_cm, v_B = v_cm",
      option_d: "v_T = √2 v_cm, v_B = 0",
      correct_option: "A",
      explanation: "Step 1: In rolling without slipping, the velocity of any point is v⃗ = v⃗_cm + ω⃗ × r⃗.\n\nStep 2: For the bottom contact point B: v_B = v_cm − ω R = v_cm − v_cm = 0.\n\nStep 3: For the top point T: translational and rotational velocities are parallel and in the same forward direction:\nv_T = v_cm + ω R = v_cm + v_cm = 2 v_cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2495, // Q176
    similar_question: {
      question: "A diatomic molecule consists of two atoms of masses m₁ and m₂ separated by a fixed bond distance r. What is the moment of inertia of the molecule about an axis passing through its centre of mass perpendicular to the line joining the atoms?",
      option_a: "[ (m₁ m₂) / (m₁ + m₂) ] r²",
      option_b: "(m₁ + m₂) r²",
      option_c: "[ (m₁ + m₂) / (m₁ m₂) ] r²",
      option_d: "(1/2) (m₁ + m₂) r²",
      correct_option: "A",
      explanation: "Step 1: The distances of masses m₁ and m₂ from the centre of mass are:\nr₁ = [ m₂ / (m₁ + m₂) ] r,  and  r₂ = [ m₁ / (m₁ + m₂) ] r.\n\nStep 2: Total moment of inertia about the CM axis is:\nI = m₁ r₁² + m₂ r₂² = m₁ [ m₂ / (m₁ + m₂) ]² r² + m₂ [ m₁ / (m₁ + m₂) ]² r².\n\nStep 3: Factoring terms:\nI = [ (m₁ m₂² + m₂ m₁²) / (m₁ + m₂)² ] r² = [ m₁ m₂ (m₁ + m₂) / (m₁ + m₂)² ] r² = [ (m₁ m₂) / (m₁ + m₂) ] r² = μ r².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2496, // Q177
    similar_question: {
      question: "A person of mass M stands at one end of a uniform plank of length L and mass 3M resting on a frictionless ice surface. If the person walks to the other end of the plank, what is the distance moved by the person relative to the ice?",
      option_a: "(3/4) L",
      option_b: "(1/4) L",
      option_c: "(2/3) L",
      option_d: "L",
      correct_option: "A",
      explanation: "Step 1: Since external horizontal force is zero, the centre of mass of (person + plank) does not move:\nΔx_cm = 0  →  M Δx_person + M_plank Δx_plank = 0.\n\nStep 2: Relative displacement: Δx_person − Δx_plank = L  →  Δx_plank = Δx_person − L.\n\nStep 3: Substitute with M_plank = 3M:\nM Δx_person + 3M (Δx_person − L) = 0  →  4M Δx_person = 3M L  →  Δx_person = (3/4) L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2497, // Q178
    similar_question: {
      question: "A projectile of mass 2m is fired with initial velocity u at an angle θ with the horizontal. At the highest point of its trajectory, it explodes into two equal fragments of mass m each. If one fragment falls vertically downward from rest immediately after the explosion, what is the velocity of the other fragment just after the explosion?",
      option_a: "2 u cos θ horizontally forward",
      option_b: "u cos θ horizontally forward",
      option_c: "3 u cos θ horizontally forward",
      option_d: "1.5 u cos θ horizontally forward",
      correct_option: "A",
      explanation: "Step 1: At the highest point before explosion, the velocity of the projectile is purely horizontal: v_top = u cos θ î.\nTotal horizontal momentum before explosion: P_initial = (2m) u cos θ î.\n\nStep 2: After explosion, one piece of mass m has zero horizontal velocity (falls vertically from rest): P₁ = 0.\nLet v₂ be the horizontal velocity of the second piece of mass m.\n\nStep 3: Conserve horizontal momentum:\n(2m) u cos θ î = m (0) + m v₂  →  v₂ = 2 u cos θ î.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2498, // Q179
    similar_question: {
      question: "If the net external torque acting on a rotating system about a given axis is zero, which physical quantity must remain constant?",
      option_a: "Angular momentum vector about that axis",
      option_b: "Angular velocity only",
      option_c: "Rotational kinetic energy",
      option_d: "Linear acceleration",
      correct_option: "A",
      explanation: "Step 1: Newton's second law for rotation states: τ⃗_ext = dL⃗ / dt.\n\nStep 2: When τ⃗_ext = 0, dL⃗ / dt = 0, meaning the angular momentum vector L⃗ is strictly constant in both magnitude and direction.\n\nStep 3: Angular velocity or kinetic energy may change if internal forces alter the moment of inertia, but angular momentum remains strictly conserved.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2499, // Q180
    similar_question: {
      question: "A baseball bat is cut into two pieces along a plane passing through its centre of mass perpendicular to its length. Which piece has the greater mass?",
      option_a: "The thicker bottom piece",
      option_b: "The thinner handle piece",
      option_c: "Both pieces have exactly equal mass",
      option_d: "Cannot be determined without knowing the exact wood density",
      correct_option: "A",
      explanation: "Step 1: By definition of the centre of mass, the first moment of mass about the CM is zero: ∫ x dm = 0.\n\nStep 2: For the two pieces: M_bottom × x_bottom = M_handle × x_handle.\n\nStep 3: Because the bottom piece is thicker and wider, its mass is distributed closer to the cut (smaller average distance x_bottom). The handle piece is long and slender, so its mass is distributed further away (larger average distance x_handle).\nSince x_bottom < x_handle, it follows that M_bottom > M_handle.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2500, // Q181
    similar_question: {
      question: "A uniform metre stick of length L = 1.0 m is held vertically with one end on a rough floor. When released, it falls rotating about the pivoted end without slipping. Taking g = 9.8 m/s², what is the linear speed of the top end when it strikes the floor?",
      option_a: "5.42 m/s",
      option_b: "4.43 m/s",
      option_c: "3.13 m/s",
      option_d: "7.67 m/s",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy, loss of potential energy of the centre of mass equals the rotational kinetic energy:\nM g (L / 2) = (1/2) I ω².\n\nStep 2: For a rod pivoted at one end, I = (1/3) M L²:\nM g (L / 2) = (1/2) [ (1/3) M L² ] ω²  →  M g L / 2 = (1/6) M L² ω²  →  ω² = 3g / L.\n\nStep 3: Linear speed of the top tip is v = ω L:\nv = √(3g / L) × L = √(3 g L).\nSubstitute g = 9.8 m/s² and L = 1.0 m:\nv = √(3 × 9.8 × 1.0) = √29.4 ≈ 5.42 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2501, // Q182
    similar_question: {
      question: "Two particles of masses m₁ and m₂ are located on a line. If the mass m₁ is shifted toward the centre of mass by a distance d, by what distance must the mass m₂ be shifted so that the position of the centre of mass remains unchanged?",
      option_a: "(m₁ / m₂) d",
      option_b: "(m₂ / m₁) d",
      option_c: "d",
      option_d: "[ m₁ / (m₁ + m₂) ] d",
      correct_option: "A",
      explanation: "Step 1: The condition for the centre of mass to remain stationary is:\nΔx_cm = (m₁ Δx₁ + m₂ Δx₂) / (m₁ + m₂) = 0.\n\nStep 2: Thus:\nm₁ Δx₁ + m₂ Δx₂ = 0.\n\nStep 3: Given that m₁ moves through distance d toward the CM (Δx₁ = d), the distance x moved by m₂ toward the CM must satisfy:\nm₁ d − m₂ x = 0  →  x = (m₁ / m₂) d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2502, // Q183
    similar_question: {
      question: "A particle is moving in a circular path in the plane of the paper with increasing speed. The angular acceleration vector α⃗ is directed:",
      option_a: "Perpendicular to the plane of the paper along the axis of rotation",
      option_b: "Radially inward toward the centre",
      option_c: "Tangential to the circular trajectory",
      option_d: "Radially outward away from the centre",
      correct_option: "A",
      explanation: "Step 1: Angular acceleration is defined as α⃗ = dω⃗ / dt.\n\nStep 2: Angular velocity ω⃗ is an axial vector pointing perpendicular to the plane of rotation (right-hand screw rule).\n\nStep 3: Since the particle is moving in a plane circle, any change in angular velocity dω⃗ must lie along the same perpendicular axis. Thus, α⃗ is perpendicular to the plane of the paper.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2503, // Q184
    similar_question: {
      question: "Three identical solid spheres, each of mass M and radius R, are placed on a horizontal table touching each other so that their centres form an equilateral triangle. The centre of mass of the three-sphere system is located at:",
      option_a: "The centroid (point of intersection of medians) of the equilateral triangle",
      option_b: "The centre of any one of the spheres",
      option_c: "The midpoint of any side of the triangle",
      option_d: "The outer circumference of the spheres",
      correct_option: "A",
      explanation: "Step 1: Each uniform sphere can be treated as a point mass M concentrated at its geometric centre.\n\nStep 2: For three equal point masses M located at vertices of an equilateral triangle, the centre of mass is:\nr_cm = (r₁ + r₂ + r₃) / 3.\n\nStep 3: This geometric point is precisely the centroid (intersection of medians) of the equilateral triangle.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2504, // Q185
    similar_question: {
      question: "Under which of the following physical conditions is the total angular momentum of a system of particles NOT conserved?",
      option_a: "When a net external torque acts on the system",
      option_b: "When internal conservative forces act within the system",
      option_c: "When internal dissipative friction acts between particles",
      option_d: "When the system undergoes changes in shape due to internal forces",
      correct_option: "A",
      explanation: "Step 1: Newton's rotational law states: dL⃗ / dt = τ⃗_ext.\n\nStep 2: Internal forces between particles always obey Newton's third law and act along the line connecting them, so internal torques sum to zero.\n\nStep 3: Hence, the total angular momentum changes if and only if a non-zero net external torque acts on the system.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2505, // Q186
    similar_question: {
      question: "A uniform circular body rolls without slipping down an inclined plane. If its rotational kinetic energy equals its translational kinetic energy, identify the body.",
      option_a: "Thin circular ring (or thin hollow cylinder)",
      option_b: "Solid cylinder",
      option_c: "Solid sphere",
      option_d: "Spherical shell",
      correct_option: "A",
      explanation: "Step 1: Translational kinetic energy is K_trans = (1/2) M v².\nRotational kinetic energy in pure rolling is K_rot = (1/2) I ω² = (1/2) (M k²) (v / R)² = (1/2) M v² (k² / R²).\n\nStep 2: Given K_rot = K_trans:\n(1/2) M v² (k² / R²) = (1/2) M v²  →  k² / R² = 1.\n\nStep 3: A value of k² / R² = 1 corresponds to a thin circular ring or thin-walled hollow cylinder.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2506, // Q187
    similar_question: {
      question: "A solid sphere, a uniform solid disc, and a thin circular ring of equal masses and radii are released simultaneously from rest at the top of a rough inclined plane and roll down without slipping. In what order do they reach the bottom?",
      option_a: "Sphere first, disc second, ring last",
      option_b: "Ring first, disc second, sphere last",
      option_c: "Disc first, sphere second, ring last",
      option_d: "All three reach simultaneously",
      correct_option: "A",
      explanation: "Step 1: Linear acceleration in pure rolling is a = g sin θ / (1 + k² / R²).\n\nStep 2: Values of k² / R²:\nFor solid sphere: 2/5 = 0.40  →  a = 0.714 g sin θ.\nFor disc: 1/2 = 0.50  →  a = 0.667 g sin θ.\nFor ring: 1.00  →  a = 0.500 g sin θ.\n\nStep 3: Since a_sphere > a_disc > a_ring, the sphere arrives first, followed by the disc, and the ring arrives last.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2507, // Q188
    similar_question: {
      question: "When the net external torque acting on an isolated physical system is zero, which of the following quantities must be conserved?",
      option_a: "Total angular momentum",
      option_b: "Total linear momentum",
      option_c: "Total kinetic energy",
      option_d: "Total moment of inertia",
      correct_option: "A",
      explanation: "Step 1: The rate of change of angular momentum equals the net external torque: dL⃗ / dt = τ⃗_ext.\n\nStep 2: If τ⃗_ext = 0, then dL⃗ / dt = 0, which means L⃗ = constant.\n\nStep 3: Thus, total angular momentum is the strictly conserved quantity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2508, // Q189
    similar_question: {
      question: "A thin circular ring rolls down an inclined plane of vertical height h from rest without slipping. What is its linear speed upon reaching the bottom?",
      option_a: "√(g h)",
      option_b: "√(2 g h)",
      option_c: "√(4 g h / 3)",
      option_d: "√(10 g h / 7)",
      correct_option: "A",
      explanation: "Step 1: Linear speed at the bottom of an incline of height h in pure rolling is:\nv = √[ 2gh / (1 + k² / R²) ].\n\nStep 2: For a thin circular ring, k² / R² = 1.\n\nStep 3: Substitute k² / R² = 1:\nv = √[ 2gh / (1 + 1) ] = √(2gh / 2) = √(gh).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2509, // Q190
    similar_question: {
      question: "A particle rotates in a circle with initial angular momentum L and rotational kinetic energy K. If its rotational kinetic energy is halved (K' = K / 2) while its rotational frequency is doubled (ω' = 2ω), what is the new angular momentum?",
      option_a: "L / 4",
      option_b: "L / 2",
      option_c: "2 L",
      option_d: "4 L",
      correct_option: "A",
      explanation: "Step 1: Rotational kinetic energy can be expressed as K = (1/2) L ω, which gives L = 2K / ω.\n\nStep 2: With new values K' = K / 2 and ω' = 2ω:\nL' = 2 K' / ω' = 2 (K / 2) / (2ω) = K / (2ω) = (1/4) [ 2K / ω ] = L / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2510, // Q191
    similar_question: {
      question: "Kepler's second law of planetary motion, which states that a line segment joining a planet and the Sun sweeps out equal areas in equal intervals of time, is a direct consequence of the conservation of:",
      option_a: "Angular momentum",
      option_b: "Linear momentum",
      option_c: "Mechanical energy",
      option_d: "Gravitational force",
      correct_option: "A",
      explanation: "Step 1: The gravitational attraction of the Sun is a central force directed along the radial line toward the Sun.\n\nStep 2: Because the force is radial, its torque about the Sun is τ⃗ = r⃗ × F⃗ = 0.\n\nStep 3: Consequently, the planet's angular momentum L = 2 m (dA / dt) is constant, meaning the areal velocity dA / dt is constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2511, // Q192
    similar_question: {
      question: "What is the moment of inertia of a uniform thin rod of mass M and length L about an axis perpendicular to the rod passing through a point at distance L / 4 from its centre?",
      option_a: "(7/48) M L²",
      option_b: "(1/12) M L²",
      option_c: "(1/3) M L²",
      option_d: "(5/48) M L²",
      correct_option: "A",
      explanation: "Step 1: By the parallel-axis theorem: I = I_cm + M d².\n\nStep 2: For a uniform thin rod about an axis through its centre perpendicular to length: I_cm = (1/12) M L².\n\nStep 3: Here, distance d = L / 4, so d² = L² / 16:\nI = (1/12) M L² + M (L / 4)² = (1/12) M L² + (1/16) M L².\n\nStep 4: Common denominator 48:\nI = (4/48 + 3/48) M L² = (7/48) M L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2512, // Q193
    similar_question: {
      question: "Two identical uniform thin circular rings, each of mass M and radius R, lie in mutually perpendicular planes with their centres coinciding. What is the moment of inertia of the system about the line of intersection of their planes?",
      option_a: "M R²",
      option_b: "(1/2) M R²",
      option_c: "2 M R²",
      option_d: "(3/2) M R²",
      correct_option: "A",
      explanation: "Step 1: The line of intersection of the two planes passes through the centre of both rings and lies in the plane of both rings. Therefore, it is a diameter axis for both rings.\n\nStep 2: For a thin circular ring of mass M and radius R, the moment of inertia about any diameter is:\nI_diameter = (1/2) M R².\n\nStep 3: The total moment of inertia of the two-ring system about this common diameter is:\nI_total = I₁ + I₂ = (1/2) M R² + (1/2) M R² = M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2513, // Q194
    similar_question: {
      question: "Two point masses of 2.0 kg and 3.0 kg are separated by a distance of 20 cm. At what distance from the 2.0 kg mass is the centre of mass of the system located?",
      option_a: "12 cm",
      option_b: "8 cm",
      option_c: "10 cm",
      option_d: "15 cm",
      correct_option: "A",
      explanation: "Step 1: Taking the 2.0 kg mass as the origin (x₁ = 0), the 3.0 kg mass is located at x₂ = 20 cm.\n\nStep 2: The position of the centre of mass is:\nx_cm = (m₁ x₁ + m₂ x₂) / (m₁ + m₂).\n\nStep 3: Substitute the given values:\nx_cm = [ 2.0 × 0 + 3.0 × 20 ] / [ 2.0 + 3.0 ] = 60 / 5.0 = 12 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2514, // Q195
    similar_question: {
      question: "A non-uniform thin rod of length L lies along the x-axis from x = 0 to x = L. Its linear mass density varies as λ(x) = c x², where c is a positive constant. What is the x-coordinate of its centre of mass?",
      option_a: "(3/4) L",
      option_b: "(2/3) L",
      option_c: "(1/2) L",
      option_d: "(4/5) L",
      correct_option: "A",
      explanation: "Step 1: Total mass M is:\nM = ∫₀^L λ(x) dx = c ∫₀^L x² dx = c [ x³ / 3 ]₀^L = c L³ / 3.\n\nStep 2: The first moment of mass is:\n∫₀^L x λ(x) dx = c ∫₀^L x³ dx = c [ x⁴ / 4 ]₀^L = c L⁴ / 4.\n\nStep 3: Compute x_cm:\nx_cm = (c L⁴ / 4) / (c L³ / 3) = (3/4) L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2515, // Q196
    similar_question: {
      question: "For a rigid body undergoing pure rotation about a fixed axis, which of the following statements is true for all particles of the body?",
      option_a: "All particles have the same angular velocity, but particles at different distances from the axis have different linear speeds",
      option_b: "All particles have the same linear speed and same angular velocity",
      option_c: "All particles have different angular velocities and same linear speed",
      option_d: "All particles have the same linear acceleration",
      correct_option: "A",
      explanation: "Step 1: Because the body is rigid, the relative positions of particles are fixed, so every particle turns through the same angle in any given time interval. Hence, all particles share the exact same angular velocity ω.\n\nStep 2: Linear speed is given by v = ω r_perp, where r_perp is the perpendicular distance from the axis of rotation.\n\nStep 3: Since r_perp varies from particle to particle, particles at different distances have different linear speeds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2516, // Q197
    similar_question: {
      question: "The angular position of a rotating flywheel varies with time according to θ(t) = a + b t + c t², where a, b, and c are positive constants. What is the angular acceleration of the flywheel?",
      option_a: "2 c",
      option_b: "c",
      option_c: "b + 2 c t",
      option_d: "2 b",
      correct_option: "A",
      explanation: "Step 1: Angular velocity is the first time derivative of angular position:\nω(t) = dθ / dt = d/dt (a + b t + c t²) = b + 2 c t.\n\nStep 2: Angular acceleration is the derivative of angular velocity:\nα(t) = dω / dt = d/dt (b + 2 c t) = 2 c.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2517, // Q198
    similar_question: {
      question: "A solid sphere, a spherical shell, and a thin circular ring are released from rest from the top of a frictionless inclined plane. Which object reaches the bottom with the greatest acceleration?",
      option_a: "All three have the same acceleration equal to g sin θ",
      option_b: "Solid sphere",
      option_c: "Spherical shell",
      option_d: "Circular ring",
      correct_option: "A",
      explanation: "Step 1: On a frictionless incline, the friction force is zero (f = 0).\n\nStep 2: Without friction, no torque can be exerted about the centre of mass, so none of the objects rotate; all of them purely slide.\n\nStep 3: The only force along the incline is the component of gravity M g sin θ. By Newton's second law, M a = M g sin θ  →  a = g sin θ, which is identical for all three objects.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2518, // Q199
    similar_question: {
      question: "According to the parallel-axis theorem, the moment of inertia I of a body of mass M about any axis is related to its moment of inertia I_cm about a parallel axis passing through its centre of mass by (where d is the perpendicular separation between the axes):",
      option_a: "I = I_cm + M d²",
      option_b: "I = I_cm − M d²",
      option_c: "I_cm = I + M d²",
      option_d: "I = I_cm + 2 M d²",
      correct_option: "A",
      explanation: "Step 1: The parallel-axis theorem states that the moment of inertia about any arbitrary axis is the sum of the moment of inertia about a parallel axis passing through the centre of mass and the product of total mass and the square of the distance between the two axes.\n\nStep 2: Mathematically: I = I_cm + M d².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2520, // Q201
    similar_question: {
      question: "A particle of mass m moves with constant velocity v⃗ along a straight line in the xy-plane. If L_A and L_B are the angular momenta of the particle with respect to the origin when the particle is at points A and B respectively on this line, then:",
      option_a: "L_A = L_B",
      option_b: "L_A > L_B",
      option_c: "L_A < L_B",
      option_d: "L_A = −L_B",
      correct_option: "A",
      explanation: "Step 1: Angular momentum of a particle about the origin is given by L⃗ = r⃗ × p⃗.\n\nStep 2: The magnitude of L⃗ is |L⃗| = p (r sin θ) = m v d_perp, where d_perp is the perpendicular distance from the origin to the line of motion.\n\nStep 3: Since the line of motion is straight and the velocity v is constant, d_perp is constant everywhere along the trajectory. Hence, L_A = L_B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2519, // Q200
    similar_question: {
      question: "A small mass m attached to a string revolves in a circle on a frictionless horizontal table. The string is pulled through a hole at the centre, decreasing the radius from R to R / 3. By what factor does the kinetic energy of the mass increase?",
      option_a: "9",
      option_b: "3",
      option_c: "6",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: The tension force is directed toward the central hole, exerting zero torque about the centre. Hence, angular momentum L is conserved.\n\nStep 2: Kinetic energy expressed in terms of angular momentum is K = L² / (2 m R²).\n\nStep 3: When R becomes R' = R / 3:\nK' = L² / [ 2 m (R / 3)² ] = 9 [ L² / (2 m R²) ] = 9 K.\nThus, the kinetic energy increases by a factor of 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2521, // Q202
    similar_question: {
      question: "A constant torque of 600 N·m is applied to a flywheel of moment of inertia 150 kg·m² initially at rest about its central axis. What is the angular velocity of the flywheel after 4 seconds?",
      option_a: "16 rad/s",
      option_b: "12 rad/s",
      option_c: "8 rad/s",
      option_d: "24 rad/s",
      correct_option: "A",
      explanation: "Step 1: Angular acceleration is α = τ / I.\nα = 600 N·m / 150 kg·m² = 4 rad/s².\n\nStep 2: Using rotational kinematics starting from rest (ω₀ = 0):\nω = ω₀ + α t = 0 + (4 rad/s²)(4 s) = 16 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2522, // Q203
    similar_question: {
      question: "A uniform solid sphere of mass M and radius R rolls without slipping on a horizontal surface with linear speed v. If it rolls smoothly onto a vertical upward loop without slipping, what is the maximum vertical height h it can reach?",
      option_a: "7 v² / (10 g)",
      option_b: "v² / (2 g)",
      option_c: "3 v² / (4 g)",
      option_d: "5 v² / (7 g)",
      correct_option: "A",
      explanation: "Step 1: Total initial kinetic energy of the rolling solid sphere:\nK = (1/2) M v² (1 + k² / R²) = (1/2) M v² (1 + 2/5) = (7/10) M v².\n\nStep 2: In the absence of slipping and non-conservative forces, mechanical energy is conserved:\nM g h = (7/10) M v².\n\nStep 3: Solve for h:\nh = 7 v² / (10 g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2523, // Q204
    similar_question: {
      question: "Two circular discs of moments of inertia I₁ and I₂ rotating with angular speeds ω₁ and ω₂ about a common vertical frictionless axle are brought into contact and stick together. What is the total rotational kinetic energy of the combined system?",
      option_a: "(I₁ ω₁ + I₂ ω₂)² / [ 2 (I₁ + I₂) ]",
      option_b: "(1/2) (I₁ + I₂) (ω₁ + ω₂)²",
      option_c: "[ I₁ ω₁² + I₂ ω₂² ] / 2",
      option_d: "(I₁ ω₁ − I₂ ω₂)² / [ 2 (I₁ + I₂) ]",
      correct_option: "A",
      explanation: "Step 1: Conserve angular momentum along the common axis:\nL_total = I₁ ω₁ + I₂ ω₂ = (I₁ + I₂) ω_f  →  ω_f = (I₁ ω₁ + I₂ ω₂) / (I₁ + I₂).\n\nStep 2: Total final kinetic energy is:\nK_f = (1/2) I_total ω_f² = (1/2) (I₁ + I₂) [ (I₁ ω₁ + I₂ ω₂) / (I₁ + I₂) ]²\nK_f = (I₁ ω₁ + I₂ ω₂)² / [ 2 (I₁ + I₂) ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2524, // Q205
    similar_question: {
      question: "A circular hole of radius 2 cm is cut out of a uniform thin circular disc of radius 8 cm. The centre of the hole is at a distance of 4 cm from the centre of the original disc. What is the distance of the centre of mass of the remaining portion from the centre of the original disc?",
      option_a: "4/15 cm",
      option_b: "2/15 cm",
      option_c: "8/15 cm",
      option_d: "1/5 cm",
      correct_option: "A",
      explanation: "Step 1: Let the origin be at the centre of the original disc.\nArea of original disc: A₁ = π (8)² = 64π, with centre at x₁ = 0.\nArea of removed hole: A₂ = π (2)² = 4π, with centre at x₂ = 4 cm.\n\nStep 2: The centre of mass of the remaining body is given by:\nx_cm = (A₁ x₁ − A₂ x₂) / (A₁ − A₂).\n\nStep 3: Substitute the values:\nx_cm = (0 − 4π × 4) / (64π − 4π) = −16π / 60π = −4/15 cm.\nThe distance from the centre is 4/15 cm (on the side opposite to the hole).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2525, // Q206
    similar_question: {
      question: "The moment of inertia of a uniform thin rod of mass M and length L about an axis through its centre of mass perpendicular to its length is I₀. What is its moment of inertia about a parallel axis passing through one of its ends?",
      option_a: "I₀ + (1/4) M L²",
      option_b: "I₀ + (1/2) M L²",
      option_c: "I₀ + M L²",
      option_d: "I₀ + (1/12) M L²",
      correct_option: "A",
      explanation: "Step 1: The distance between the centre of mass and one end of the rod is d = L / 2.\n\nStep 2: Applying the parallel-axis theorem:\nI_end = I_cm + M d² = I₀ + M (L / 2)² = I₀ + (1/4) M L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2526, // Q207
    similar_question: {
      question: "A thin hollow cylinder open at both ends moves with linear speed v in two cases: (i) Pure sliding without rolling, and (ii) Pure rolling without slipping. What is the ratio of its total kinetic energy in case (i) to case (ii)?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: Case (i): Pure sliding (no rotation):\nK₁ = (1/2) M v².\n\nStep 2: Case (ii): Pure rolling without slipping (I = M R², ω = v / R):\nK₂ = (1/2) M v² + (1/2) I ω² = (1/2) M v² + (1/2) M R² (v / R)² = (1/2) M v² + (1/2) M v² = M v².\n\nStep 3: Compute the ratio:\nK₁ / K₂ = [ (1/2) M v² ] / [ M v² ] = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2527, // Q208
    similar_question: {
      question: "A solid sphere of mass M and radius R rotates about a diameter at 300 rpm. What is its rotational kinetic energy?",
      option_a: "20 π² M R²",
      option_b: "10 π² M R²",
      option_c: "40 π² M R²",
      option_d: "5 π² M R²",
      correct_option: "A",
      explanation: "Step 1: Convert rotational speed to rad/s:\nω = 300 rpm = (300 × 2π) / 60 = 10π rad/s.\n\nStep 2: Moment of inertia of a solid sphere about a diameter:\nI = (2/5) M R².\n\nStep 3: Rotational kinetic energy:\nK = (1/2) I ω² = (1/2) × (2/5) M R² × (10π)² = (1/5) M R² × 100π² = 20 π² M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2528, // Q209
    similar_question: {
      question: "Keeping the moment of inertia of a rotating rigid body constant, if its time period of rotation is halved, what happens to its angular momentum?",
      option_a: "It doubles",
      option_b: "It is halved",
      option_c: "It quadruples",
      option_d: "It remains constant",
      correct_option: "A",
      explanation: "Step 1: Angular velocity is related to time period T by ω = 2π / T.\n\nStep 2: Angular momentum is L = I ω = I (2π / T).\n\nStep 3: If T becomes T' = T / 2 while I is held constant:\nL' = I [ 2π / (T / 2) ] = 2 × [ I (2π / T) ] = 2 L.\nThus, the angular momentum doubles.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2529, // Q210
    similar_question: {
      question: "Two freely rotating bodies A and B have moments of inertia I_A and I_B with I_A > I_B. If their angular momenta are equal (L_A = L_B), which body has greater rotational kinetic energy?",
      option_a: "Body B",
      option_b: "Body A",
      option_c: "Both have equal kinetic energy",
      option_d: "Cannot be determined without knowing their angular velocities",
      correct_option: "A",
      explanation: "Step 1: Rotational kinetic energy in terms of angular momentum is K = L² / (2I).\n\nStep 2: Since L_A = L_B, the kinetic energy is inversely proportional to moment of inertia: K ∝ 1 / I.\n\nStep 3: Because I_A > I_B, we have K_A < K_B, which means Body B has greater rotational kinetic energy.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart4() {
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

    console.log(`Starting update of Set 8 Part 4 (${set8Part4Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set8Part4Updates) {
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
        console.log(`[${successCount}/${set8Part4Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 8 Part 4 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart4();
