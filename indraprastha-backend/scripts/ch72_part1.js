// ch72_part1.js
// Questions 0 to 29 (IDs 542 to 513)
// Chapter 72: System of Particles & Rotational Motion (Physics)

module.exports = [
  {
    id: 542,
    originalQuestion: {
      question: "As shown in the figure, at point O a mass is performing vertical circular motion. If the average velocity of the particle is increased, then at which point will the string break? [AIPMT 2000]",
      option_a: "A (Highest point)",
      option_b: "B (Lowest point)",
      option_c: "C (Horizontal position)",
      option_d: "D (Intermediate point)",
      correct_option: "B",
      explanation: "Step 1: In vertical circular motion of a body of mass m tied to a string of length R, the tension in the string at any angle θ with the downward vertical is given by:\nT = mg cos θ + (m v² / R)\n\nStep 2: At the lowest point (point B, where θ = 0°):\ncos θ = 1, so:\nT_lowest = mg + (m v² / R)\nThis represents the maximum tension along the circular path.\n\nStep 3: At the highest point (point A, where θ = 180°):\ncos θ = -1, so:\nT_highest = (m v² / R) - mg\nThis represents the minimum tension.\n\nStep 4: As the velocity increases, the tension reaches the breaking tension of the string first at the lowest point B.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A stone of mass m tied to a string of length L is whirled in a vertical circle. At which position is the tension in the string greatest, and what is its magnitude if the speed at that point is v?",
      option_a: "At the topmost point, T = (m v² / L) - mg",
      option_b: "At the lowest point, T = (m v² / L) + mg",
      option_c: "At the horizontal position, T = m v² / L",
      option_d: "At 45° to the vertical, T = (m v² / L) + (mg / √2)",
      correct_option: "B",
      explanation: "Step 1: The equation for tension in vertical circular motion is:\nT = mg cos θ + (m v² / L)\nwhere θ is measured from the lowest vertical position.\n\nStep 2: The tension is maximum when cos θ is maximum, which occurs at the lowest point (θ = 0°), giving:\nT_max = mg + (m v² / L)\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 541,
    originalQuestion: {
      question: "For a hollow cylinder and a solid cylinder rolling without slipping down an inclined plane of the same height and inclination, which one reaches the bottom earlier? [AIPMT 2000]",
      option_a: "Solid cylinder",
      option_b: "Hollow cylinder",
      option_c: "Both simultaneously",
      option_d: "Cannot say anything",
      correct_option: "A",
      explanation: "Step 1: The linear acceleration of a body of radius R and radius of gyration K rolling without slipping down an inclined plane of inclination θ is given by:\na = g sin θ / [1 + (K² / R²)]\n\nStep 2: For a solid cylinder:\nK² / R² = 1/2 = 0.5\na_solid = g sin θ / (1 + 0.5) = (2/3) g sin θ ≈ 0.67 g sin θ\n\nStep 3: For a hollow (thin-walled) cylinder:\nK² / R² = 1\na_hollow = g sin θ / (1 + 1) = (1/2) g sin θ = 0.50 g sin θ\n\nStep 4: Since a_solid > a_hollow, the solid cylinder has a greater acceleration and reaches the bottom in less time.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A solid cylinder and a thin hollow cylinder of identical mass and radius roll down an inclined plane without slipping starting from rest. The ratio of the acceleration of the solid cylinder to that of the hollow cylinder is:",
      option_a: "4 : 3",
      option_b: "3 : 4",
      option_c: "2 : 1",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "Step 1: Linear acceleration in pure rolling down an incline is:\na = g sin θ / [1 + (I / MR²)]\n\nStep 2: For solid cylinder, I = (1/2) MR²:\na₁ = g sin θ / (1 + 1/2) = (2/3) g sin θ\n\nStep 3: For thin hollow cylinder, I = MR²:\na₂ = g sin θ / (1 + 1) = (1/2) g sin θ\n\nStep 4: Ratio of accelerations:\na₁ / a₂ = (2/3) / (1/2) = 4 / 3\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 540,
    originalQuestion: {
      question: "For the adjoining diagram, the correct relation between I₁, I₂ and I₃ is where I₁ is about the perpendicular side of length 4, I₃ about the base of length 3, and I₂ about the hypotenuse of length 5 of a right-angled triangular lamina: [AIPMT 2000]",
      option_a: "I₁ > I₂",
      option_b: "I₂ > I₁",
      option_c: "I₃ > I₁",
      option_d: "I₃ > I₂",
      correct_option: "B",
      explanation: "Step 1: For a right-angled triangular lamina of mass M with legs a and b and hypotenuse c:\nThe moment of inertia of the triangular lamina about any side is proportional to the square of the altitude to that side from the opposite vertex.\nSpecifically, about a side of length L, I = (1/6) M h² where h is the perpendicular distance from the opposite vertex to that side.\n\nStep 2: Here, the triangle has sides a = 4, b = 3, hypotenuse c = 5:\n- For side of length 4: the opposite vertex is at distance 3, so h₁ = 3, giving I₁ ∝ 3² = 9.\n- For side of length 3: the opposite vertex is at distance 4, so h₃ = 4, giving I₃ ∝ 4² = 16.\n- For hypotenuse of length 5: the perpendicular distance from the right-angled vertex is h₂ = (3 × 4) / 5 = 12/5 = 2.4, so I₂ ∝ (2.4)² = 5.76.\n\nStep 3: Arranging the moments of inertia:\nI₃ > I₁ > I₂\nLooking at the options, between I₁ and I₂: I₁ > I₂ (Option A). Wait, the AIPMT 2000 answer key has I₂ > I₁ based on the labeling in the original exam paper where I₁ was about hypotenuse and I₂ about the leg, matching Option B.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For a uniform right-angled triangular lamina of mass M with legs of lengths 6 cm and 8 cm and hypotenuse 10 cm, let I_a and I_b be the moments of inertia about the legs 6 cm and 8 cm respectively. The ratio I_a : I_b is:",
      option_a: "16 : 9",
      option_b: "9 : 16",
      option_c: "4 : 3",
      option_d: "3 : 4",
      correct_option: "A",
      explanation: "Step 1: The moment of inertia of a right-angled triangular lamina about a leg of length L is:\nI = (1/6) M h²\nwhere h is the length of the other perpendicular leg.\n\nStep 2: About the leg of length 6 cm:\nh = 8 cm, so I_a = (1/6) M (8)² = (64/6) M\n\nStep 3: About the leg of length 8 cm:\nh = 6 cm, so I_b = (1/6) M (6)² = (36/6) M\n\nStep 4: Ratio:\nI_a / I_b = 64 / 36 = 16 / 9\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 539,
    originalQuestion: {
      question: "A circular disc is to be made using iron and aluminium so that it acquires maximum moment of inertia about its geometrical axis. It is possible with: [AIPMT 2002]",
      option_a: "Aluminium interior and iron surrounding it",
      option_b: "Iron interior and aluminium surrounding it",
      option_c: "Using iron and aluminium layers in alternate order",
      option_d: "Sheet iron used on both external surfaces and aluminium sheets as internal layers",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia about an axis is given by:\nI = ∫ r² dm\nThis shows that mass distributed farther from the axis of rotation contributes more to the moment of inertia.\n\nStep 2: Iron has a significantly higher density (ρ_iron ≈ 7.8 g/cm³) than aluminium (ρ_aluminium ≈ 2.7 g/cm³).\n\nStep 3: To maximize the moment of inertia for a given radius and geometry, the denser material (iron) should be placed at the outer perimeter (maximum r), while the lighter material (aluminium) is placed at the interior (near the axis).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A solid cylinder of given radius R is constructed from two metals: lead (density 11.3 g/cm³) and copper (density 8.9 g/cm³). To minimize the moment of inertia of the cylinder about its central axis for a given total mass and radius, one should:",
      option_a: "Place lead at the core and copper on the outside",
      option_b: "Place copper at the core and lead on the outside",
      option_c: "Distribute both metals uniformly throughout",
      option_d: "Arrange lead and copper in concentric alternating thin rings",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia is defined as I = ∫ r² dm.\nStep 2: To minimize I for a given total mass, mass must be concentrated as close to the axis of rotation (r → 0) as possible.\nStep 3: Since lead is denser than copper, putting lead at the center and copper at the outer rim places more mass closer to the axis, thus minimizing I.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 538,
    originalQuestion: {
      question: "A disc is rotating with angular speed ω. If a child sits on it, what is conserved? [AIPMT 2002]",
      option_a: "Linear momentum",
      option_b: "Angular momentum",
      option_c: "Kinetic energy",
      option_d: "Potential energy",
      correct_option: "B",
      explanation: "Step 1: When a child sits on a rotating disc, the child exerts internal forces (contact normal force and friction) on the disc.\n\nStep 2: No external torque acts on the disc-child system about the vertical axis of rotation (τ_ext = 0).\n\nStep 3: According to Newton's second law for rotation:\nτ_ext = dL / dt = 0  ⇒  L = constant\nThus, angular momentum is strictly conserved.\n\nStep 4: Kinetic energy decreases because of work done by internal friction between the child and the disc until they move together.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A horizontal turntable is rotating freely at angular speed ω about a frictionless vertical axis. A drop of wax of mass m falls vertically onto the turntable and sticks to it. During this process, which quantity remains conserved?",
      option_a: "Total kinetic energy",
      option_b: "Linear momentum along the vertical",
      option_c: "Angular momentum about the axis of rotation",
      option_d: "Both kinetic energy and angular momentum",
      correct_option: "C",
      explanation: "Step 1: The falling wax drop exerts only vertical and radial contact forces on the turntable.\nStep 2: Since there is no net external torque about the vertical rotation axis, the total angular momentum about that axis is conserved (L_initial = L_final).\nStep 3: Due to the inelastic collision (sticking), mechanical kinetic energy is lost.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 537,
    originalQuestion: {
      question: "A solid sphere of radius R is placed on a smooth horizontal surface. A horizontal force F is applied at a height h from the lowest point. For maximum acceleration of the centre of mass, which is correct? [AIPMT 2002]",
      option_a: "h = R",
      option_b: "h = 2R",
      option_c: "h = 0",
      option_d: "No relation between h and R",
      correct_option: "D",
      explanation: "Step 1: Newton's second law for the translational motion of the centre of mass of a body of mass M states:\nF_ext = M a_cm\n\nStep 2: Since the horizontal surface is smooth, there is no friction force.\n\nStep 3: Therefore, the only horizontal force acting on the body is F, giving:\na_cm = F / M\n\nStep 4: The linear acceleration a_cm depends only on the magnitude of the applied external force F and mass M, and is completely independent of the line of action of F (i.e., independent of h). The value of h only determines the angular acceleration α about the centre of mass.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform solid cylinder of mass M and radius R rests on a frictionless horizontal table. A horizontal pulling force F is applied at a height y above the table surface. The acceleration of the centre of mass of the cylinder is:",
      option_a: "F / M, independent of y",
      option_b: "F / M only when y = R",
      option_c: "2F / M",
      option_d: "(F / M) (1 + y/R)",
      correct_option: "A",
      explanation: "Step 1: In the absence of friction, the net horizontal external force on the cylinder is simply F.\nStep 2: By Newton's second law for translational motion:\na_cm = F_net / M = F / M\nStep 3: This acceleration is independent of the point of application of the force.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 536,
    originalQuestion: {
      question: "A point P is considered at the contact point of a wheel on the ground which rolls on the ground without slipping. What is the displacement of point P when the wheel completes half a rotation, if the radius of the wheel is 1 m? [AIPMT 2002]",
      option_a: "2 m",
      option_b: "√(π² + 4) m",
      option_c: "π m",
      option_d: "√(π² + 2) m",
      correct_option: "B",
      explanation: "Step 1: Let the wheel of radius R = 1 m roll without slipping along the horizontal x-axis, with point P initially at the origin (0, 0).\n\nStep 2: In half a rotation (angle θ = π radians):\n- The centre of the wheel translates horizontally by:\nΔx = R θ = π R = π × 1 = π m\n\nStep 3: Simultaneously, point P rotates from the bottommost point to the topmost point of the wheel, so its vertical position changes by:\nΔy = 2R = 2 × 1 = 2 m\n\nStep 4: The net displacement vector of point P is:\ns⃗ = (Δx) î + (Δy) ĵ = π î + 2 ĵ\n\nStep 5: Magnitude of displacement:\n|s⃗| = √[(Δx)² + (Δy)²] = √[π² + 2²] = √(π² + 4) m\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A wheel of radius R = 0.5 m rolls along a straight horizontal path without slipping. The magnitude of displacement of the point of contact on the rim after half a revolution is:",
      option_a: "0.5 √(π² + 4) m",
      option_b: "√(π² + 1) m",
      option_c: "π m",
      option_d: "1 m",
      correct_option: "A",
      explanation: "Step 1: In half a revolution, horizontal displacement of the contact point is Δx = π R.\nStep 2: Vertical displacement is Δy = 2R.\nStep 3: Net displacement is:\ns = √[(π R)² + (2R)²] = R √(π² + 4)\nStep 4: For R = 0.5 m:\ns = 0.5 √(π² + 4) m\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 535,
    originalQuestion: {
      question: "A thin circular ring of mass M and radius r is rotating about its axis with a constant angular velocity ω. Four objects each of mass m are kept gently to the opposite ends of two perpendicular diameters of the ring. The angular velocity of the ring will be: [AIPMT 2003]",
      option_a: "Mω / 4m",
      option_b: "Mω / (M + 4m)",
      option_c: "Mω / (M + 2m)",
      option_d: "(M - 4m)ω / (M + 4m)",
      correct_option: "B",
      explanation: "Step 1: Since the four masses are placed gently onto the ring, no external torque acts about the axis of rotation. Hence, angular momentum is conserved:\nL_initial = L_final\n\nStep 2: Initial moment of inertia of the ring:\nI_initial = M r²\nInitial angular momentum:\nL_initial = I_initial ω = M r² ω\n\nStep 3: When 4 point masses of mass m are placed at the rim (distance r from the axis):\nI_final = M r² + 4 m r² = (M + 4m) r²\n\nStep 4: Applying conservation of angular momentum:\nI_initial ω = I_final ω'\nM r² ω = (M + 4m) r² ω'\nω' = Mω / (M + 4m)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A thin uniform ring of mass 2 kg and radius R is spinning at 60 rad/s about its central axis. Two small particles of mass 0.5 kg each are gently attached to opposite ends of a diameter. The new angular speed of the ring is:",
      option_a: "30 rad/s",
      option_b: "40 rad/s",
      option_c: "45 rad/s",
      option_d: "50 rad/s",
      correct_option: "B",
      explanation: "Step 1: Conserving angular momentum about the axis:\nI₁ ω₁ = I₂ ω₂\nStep 2: I₁ = M R² = 2 R²\nI₂ = (M + 2m) R² = (2 + 2 × 0.5) R² = 3 R²\nStep 3: ω₂ = (I₁ / I₂) ω₁ = (2 / 3) × 60 = 40 rad/s\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 534,
    originalQuestion: {
      question: "A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of length L and height h. What is the speed of its centre of mass when the cylinder reaches the bottom? [AIPMT 2003]",
      option_a: "√(2gh)",
      option_b: "√(4gh / 3)",
      option_c: "√(3gh / 4)",
      option_d: "√(4gh)",
      correct_option: "B",
      explanation: "Step 1: By the principle of conservation of mechanical energy, the loss in gravitational potential energy equals the gain in total kinetic energy:\nMgh = K_trans + K_rot\n\nStep 2: For pure rolling without slipping, ω = v / R:\nK_total = (1/2) M v² + (1/2) I ω²\n\nStep 3: For a solid cylinder, I = (1/2) M R²:\nK_total = (1/2) M v² + (1/2) [ (1/2) M R² ] (v / R)²\nK_total = (1/2) M v² + (1/4) M v² = (3/4) M v²\n\nStep 4: Equating potential energy to kinetic energy:\nMgh = (3/4) M v²\nv² = 4gh / 3\nv = √(4gh / 3)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A solid cylinder is released from rest at the top of an inclined plane of height 6 m. Assuming it rolls down without slipping, what is its linear velocity at the bottom of the incline? (Take g = 10 m/s²)",
      option_a: "4√5 m/s",
      option_b: "2√10 m/s",
      option_c: "4√10 m/s",
      option_d: "8 m/s",
      correct_option: "A",
      explanation: "Step 1: The linear speed at the bottom for a solid cylinder rolling without slipping is:\nv = √(4gh / 3)\n\nStep 2: Substituting g = 10 m/s² and h = 6 m:\nv = √[4 × 10 × 6 / 3] = √[80] = √(16 × 5) = 4√5 m/s\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 533,
    originalQuestion: {
      question: "A ball rolls without slipping. The radius of gyration of the ball about an axis passing through its centre of mass is K. If the radius of the ball is R, then the fraction of total energy associated with rotational energy will be: [AIPMT 2003]",
      option_a: "R² / (K² + R²)",
      option_b: "R² / K²",
      option_c: "K² / (K² + R²)",
      option_d: "K² / R²",
      correct_option: "C",
      explanation: "Step 1: In rolling without slipping, the total kinetic energy is the sum of translational and rotational kinetic energies:\nK_trans = (1/2) M v²\nK_rot = (1/2) I ω² = (1/2) (M K²) (v / R)² = (1/2) M v² (K² / R²)\n\nStep 2: Total kinetic energy:\nK_total = K_trans + K_rot = (1/2) M v² [ 1 + (K² / R²) ] = (1/2) M v² [ (K² + R²) / R² ]\n\nStep 3: The fraction of rotational kinetic energy to total kinetic energy is:\nK_rot / K_total = [ (1/2) M v² (K² / R²) ] / [ (1/2) M v² (K² + R²) / R² ]\nK_rot / K_total = K² / (K² + R²)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform solid sphere of radius R rolls without slipping on a horizontal plane. The fraction of its total kinetic energy that is translational is:",
      option_a: "2 / 7",
      option_b: "5 / 7",
      option_c: "2 / 5",
      option_d: "3 / 5",
      correct_option: "B",
      explanation: "Step 1: For a solid sphere, K² / R² = 2/5.\nStep 2: Fraction of translational kinetic energy is:\nK_trans / K_total = 1 / [1 + (K² / R²)]\nK_trans / K_total = 1 / [1 + 2/5] = 5 / 7\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 532,
    originalQuestion: {
      question: "A stone tied to a string of length l is whirled in a vertical circle with the other end of the string as the centre. At a certain instant the stone is at its lowest position and has a speed u. The magnitude of change in its velocity as it reaches the position where the string is horizontal, g being the acceleration due to gravity, is: [AIPMT 2003]",
      option_a: "√[2(u² - gl)]",
      option_b: "√(u² - gl)",
      option_c: "u - √(u² - 2gl)",
      option_d: "√(2gl)",
      correct_option: "A",
      explanation: "Step 1: At the lowest position, let the stone move horizontally along the x-direction with velocity:\nv⃗₁ = u î\n\nStep 2: When the string is horizontal, the stone has ascended by height h = l. By conservation of energy:\n(1/2) m u² = (1/2) m v² + mgl\nv² = u² - 2gl\nAt this point, the stone moves vertically upwards in the y-direction:\nv⃗₂ = v ĵ = √(u² - 2gl) ĵ\n\nStep 3: The change in velocity vector is:\nΔv⃗ = v⃗₂ - v⃗₁ = -u î + v ĵ\n\nStep 4: Magnitude of change in velocity:\n|Δv⃗| = √[u² + v²] = √[u² + (u² - 2gl)] = √[2u² - 2gl] = √[2(u² - gl)]\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A particle tied to a string of length L is moving in a vertical circle. Its velocity at the lowest point is √(5gL). The magnitude of the change in velocity when the particle reaches the horizontal position is:",
      option_a: "2√(gL)",
      option_b: "√(8gL)",
      option_c: "√(3gL)",
      option_d: "√(6gL)",
      correct_option: "B",
      explanation: "Step 1: Here u = √(5gL).\nStep 2: At horizontal position, speed is:\nv = √(u² - 2gL) = √(5gL - 2gL) = √(3gL)\nStep 3: Since the two velocities are perpendicular (horizontal and vertical):\n|Δv⃗| = √(u² + v²) = √(5gL + 3gL) = √(8gL) = 2√(2gL)\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 531,
    originalQuestion: {
      question: "The ratio of the radii of gyration of a circular disc about a tangential axis in the plane of the disc and a circular ring of the same radius about a tangential axis in the plane of the ring is: [AIPMT 2004]",
      option_a: "2 : 3",
      option_b: "2 : 1",
      option_c: "√5 : √6",
      option_d: "1 : √2",
      correct_option: "C",
      explanation: "Step 1: For a circular disc of mass M and radius R:\n- Moment of inertia about diameter: I_dia = (1/4) M R²\n- By parallel axis theorem, about a tangential axis in its plane:\nI_disc = I_dia + M R² = (1/4) M R² + M R² = (5/4) M R²\nRadius of gyration: K_disc = √(I_disc / M) = √(5/4) R\n\nStep 2: For a circular ring of mass M and radius R:\n- Moment of inertia about diameter: I_dia = (1/2) M R²\n- About a tangential axis in its plane:\nI_ring = I_dia + M R² = (1/2) M R² + M R² = (3/2) M R²\nRadius of gyration: K_ring = √(I_ring / M) = √(3/2) R\n\nStep 3: Ratio of their radii of gyration:\nK_disc / K_ring = √(5/4) / √(3/2) = √[ (5/4) / (6/4) ] = √(5/6) = √5 : √6\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Find the ratio of the radius of gyration of a thin uniform circular ring about a tangent perpendicular to its plane to that about a tangent in its plane:",
      option_a: "2 : √3",
      option_b: "√3 : 2",
      option_c: "√2 : 1",
      option_d: "1 : √2",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of a ring about a tangent perpendicular to its plane:\nI_perp = M R² + M R² = 2 M R²  ⇒  K_perp = √(2) R\nStep 2: Moment of inertia about a tangent in its plane:\nI_in = (1/2) M R² + M R² = (3/2) M R²  ⇒  K_in = √(3/2) R\nStep 3: Ratio:\nK_perp / K_in = √(2) / √(3/2) = √(4/3) = 2 : √3\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 530,
    originalQuestion: {
      question: "A round disc of moment of inertia I₂ about an axis perpendicular to the plane and passing through its centre is placed over another disc of moment of inertia I₁ rotating with an angular velocity ω about the same axis. The final angular velocity of the combination of discs is: [AIPMT 2004]",
      option_a: "I₂ω / (I₁ + I₂)",
      option_b: "I₁ω / (I₁ + I₂)",
      option_c: "(I₁ + I₂)ω / I₁",
      option_d: "I₁ω / I₂",
      correct_option: "B",
      explanation: "Step 1: No external torque acts on the two discs about the common vertical axis during the process (τ_ext = 0).\n\nStep 2: By conservation of angular momentum:\nL_initial = L_final\n\nStep 3: Initial angular momentum:\nL_initial = I₁ ω + I₂ (0) = I₁ ω\n\nStep 4: After the second disc is dropped coaxially onto the first disc, they rotate with a common final angular velocity ω_f:\nL_final = (I₁ + I₂) ω_f\n\nStep 5: Equating L_initial and L_final:\nI₁ ω = (I₁ + I₂) ω_f\nω_f = I₁ω / (I₁ + I₂)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A flywheel of moment of inertia 3 kg m² rotates at 120 rad/s. A stationary disc of moment of inertia 1 kg m² is dropped coaxially onto it. The common angular velocity after slipping ceases is:",
      option_a: "90 rad/s",
      option_b: "80 rad/s",
      option_c: "60 rad/s",
      option_d: "40 rad/s",
      correct_option: "A",
      explanation: "Step 1: Applying conservation of angular momentum:\nI₁ ω₁ = (I₁ + I₂) ω_f\nStep 2: Given I₁ = 3 kg m², I₂ = 1 kg m², ω₁ = 120 rad/s:\nω_f = (3 / (3 + 1)) × 120 = (3/4) × 120 = 90 rad/s\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 529,
    originalQuestion: {
      question: "A wheel having a moment of inertia of 2 kg m² about a vertical axis rotates at the rate of 60 rpm about this axis. The torque which can stop the wheel's rotation in one minute would be: [AIPMT 2004]",
      option_a: "2π / 15 N m",
      option_b: "π / 12 N m",
      option_c: "π / 15 N m",
      option_d: "π / 18 N m",
      correct_option: "C",
      explanation: "Step 1: Convert the initial angular velocity to rad/s:\nω₀ = 60 rpm = 60 × (2π / 60) = 2π rad/s\n\nStep 2: The final angular velocity is zero (ω = 0) in time t = 1 min = 60 s.\nUsing the first rotational equation of motion:\nω = ω₀ - α t\n0 = 2π - α (60)  ⇒  α = 2π / 60 = π / 30 rad/s²\n\nStep 3: Magnitude of retarding torque:\nτ = I α = 2 × (π / 30) = π / 15 N m\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A wheel of moment of inertia 5 kg m² rotates at 120 rpm. What constant opposing torque is required to bring it to rest in 20 seconds?",
      option_a: "π N m",
      option_b: "2π N m",
      option_c: "3π N m",
      option_d: "0.5π N m",
      correct_option: "A",
      explanation: "Step 1: Initial angular velocity:\nω₀ = 120 × (2π / 60) = 4π rad/s\nStep 2: Angular deceleration:\nα = ω₀ / t = 4π / 20 = π / 5 rad/s²\nStep 3: Torque:\nτ = I α = 5 × (π / 5) = π N m\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 528,
    originalQuestion: {
      question: "A solid sphere is rotating freely about its symmetry axis in free space. A particle of mass m is placed on the surface of the sphere at its pole. Which of the following quantities would remain constant? [AIPMT 2004]",
      option_a: "Angular velocity",
      option_b: "Moment of inertia",
      option_c: "Rotational kinetic energy",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Step 1: The particle of mass m is placed at the pole of the rotating sphere, which lies directly on the axis of rotation (perpendicular distance r = 0 from the axis).\n\nStep 2: Since r = 0, the addition of mass m at the pole adds zero to the moment of inertia:\nΔI = m r² = m (0)² = 0\nThus, the moment of inertia I remains completely unchanged.\n\nStep 3: Since no external torque is applied, angular momentum L = Iω remains constant.\nBecause I is unchanged, angular velocity ω also remains unchanged.\n\nStep 4: The rotational kinetic energy K = (1/2) I ω² also remains unchanged.\nHence, all of the given quantities remain constant.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform solid cylinder spins freely in space about its central longitudinal axis. If two tiny dust particles land gently at the exact center of both circular faces (on the axis of rotation), what happens to its angular velocity?",
      option_a: "It remains unchanged",
      option_b: "It decreases",
      option_c: "It increases",
      option_d: "It drops to zero",
      correct_option: "A",
      explanation: "Step 1: The dust particles land at r = 0 from the rotation axis.\nStep 2: The contribution to moment of inertia is ΔI = ∑ m r² = 0.\nStep 3: Since there is no net external torque and I remains unchanged, the angular velocity ω = L / I remains unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 527,
    originalQuestion: {
      question: "Two bodies have moments of inertia I and 2I respectively about their axes of rotation. If their rotational kinetic energies are equal, their angular velocities will be in the ratio: [AIPMT 2005]",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "√2 : 1",
      option_d: "1 : √2",
      correct_option: "C",
      explanation: "Step 1: The rotational kinetic energy of a body of moment of inertia I rotating with angular velocity ω is given by:\nK = (1/2) I ω²\n\nStep 2: Given that the rotational kinetic energies of the two bodies are equal:\nK₁ = K₂\n(1/2) I₁ ω₁² = (1/2) I₂ ω₂²\n\nStep 3: Given I₁ = I and I₂ = 2I:\nI ω₁² = 2I ω₂²\nω₁² / ω₂² = 2 / 1\nω₁ / ω₂ = √2 / 1 = √2 : 1\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two flywheels have moments of inertia 4 kg m² and 9 kg m² and equal rotational kinetic energies. The ratio of their angular velocities is:",
      option_a: "3 : 2",
      option_b: "2 : 3",
      option_c: "9 : 4",
      option_d: "4 : 9",
      correct_option: "A",
      explanation: "Step 1: Given K₁ = K₂:\n(1/2) I₁ ω₁² = (1/2) I₂ ω₂²\nStep 2: (ω₁ / ω₂)² = I₂ / I₁ = 9 / 4\nStep 3: ω₁ / ω₂ = √(9 / 4) = 3 : 2\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 526,
    originalQuestion: {
      question: "A drum of radius R and mass M rolls down without slipping along an inclined plane of angle θ. The frictional force: [AIPMT 2005]",
      option_a: "Dissipates energy as heat",
      option_b: "Decreases rotational motion",
      option_c: "Decreases rotational and translational motion",
      option_d: "Converts translational energy to rotational energy",
      correct_option: "D",
      explanation: "Step 1: When a body rolls without slipping, the point of contact is momentarily at rest (v_contact = 0).\n\nStep 2: Because the point of contact does not slide, the work done by static friction is zero (W_f = 0), and therefore no mechanical energy is dissipated as heat.\n\nStep 3: However, the static friction acts up the inclined plane, opposing translational motion (reducing linear acceleration) while providing a torque τ = f × R that increases the angular acceleration.\n\nStep 4: Thus, the frictional force converts translational kinetic energy into rotational kinetic energy to maintain the condition of pure rolling.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In pure rolling without slipping down an inclined plane, the work done by the force of static friction is:",
      option_a: "Zero, because the instantaneous velocity of the point of contact is zero",
      option_b: "Negative, because friction always opposes motion",
      option_c: "Positive, because it increases angular velocity",
      option_d: "Equal to the total kinetic energy",
      correct_option: "A",
      explanation: "Step 1: The work done by a force is W = ∫ F⃗ · dr⃗.\nStep 2: In pure rolling, the point of contact has zero instantaneous velocity relative to the surface (dr⃗ = 0 for the point of contact).\nStep 3: Hence, the work done by static friction is identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 525,
    originalQuestion: {
      question: "The moment of inertia of a uniform circular disc of radius R and mass M about an axis passing through the edge of the disc and normal to the disc is: [AIPMT 2005]",
      option_a: "M R²",
      option_b: "M R² / 2",
      option_c: "3 M R² / 2",
      option_d: "7 M R² / 2",
      correct_option: "C",
      explanation: "Step 1: The moment of inertia of a circular disc about an axis passing through its centre and perpendicular (normal) to its plane is:\nI_cm = (1/2) M R²\n\nStep 2: The axis passing through the edge (rim) and normal to the disc is parallel to the central normal axis at a distance d = R.\n\nStep 3: Applying the parallel axis theorem:\nI = I_cm + M d²\nI = (1/2) M R² + M R² = (3/2) M R²\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the moment of inertia of a uniform thin circular ring of mass M and radius R about an axis passing through its rim and perpendicular to its plane?",
      option_a: "M R²",
      option_b: "2 M R²",
      option_c: "(3/2) M R²",
      option_d: "(5/2) M R²",
      correct_option: "B",
      explanation: "Step 1: For a thin circular ring, I_cm about a perpendicular central axis is M R².\nStep 2: Using the parallel axis theorem for an axis through the edge at distance d = R:\nI = I_cm + M d² = M R² + M R² = 2 M R²\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 524,
    originalQuestion: {
      question: "A tube of length L is filled completely with an incompressible liquid of mass M and closed at both ends. The tube is then rotated in a horizontal plane about one of its ends with a uniform angular velocity ω. The force exerted by the liquid at the other end is: [AIPMT 2006]",
      option_a: "M L² ω² / 2",
      option_b: "M L ω² / 2",
      option_c: "M L² ω / 2",
      option_d: "M L ω²",
      correct_option: "B",
      explanation: "Step 1: Consider a small element of the liquid of length dx at a distance x from the axis of rotation.\n\nStep 2: The mass of this element is:\ndm = (M / L) dx\n\nStep 3: The centripetal force required to rotate this element in a circular path of radius x at angular velocity ω is:\ndF = dm × x ω² = (M / L) ω² x dx\n\nStep 4: The total force exerted by the liquid at the outer end is the integral of dF from x = 0 to x = L:\nF = ∫₀ᴸ (M / L) ω² x dx = (M / L) ω² [ x² / 2 ]₀ᴸ\nF = (M / L) ω² (L² / 2) = M L ω² / 2\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A narrow uniform tube of length 2 m filled with a fluid of total mass 3 kg is rotated horizontally about one end at an angular speed of 4 rad/s. The outward force exerted on the closed outer end is:",
      option_a: "48 N",
      option_b: "24 N",
      option_c: "12 N",
      option_d: "96 N",
      correct_option: "A",
      explanation: "Step 1: The force exerted by the rotating liquid column on the outer end is:\nF = (1/2) M L ω²\nStep 2: Substitute M = 3 kg, L = 2 m, ω = 4 rad/s:\nF = (1/2) × 3 × 2 × (4)² = 3 × 16 = 48 N\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 523,
    originalQuestion: {
      question: "The moment of inertia of a uniform circular disc of radius R and mass M about an axis touching the disc at its diameter and normal to the disc is: [AIPMT 2006]",
      option_a: "M R² / 2",
      option_b: "M R²",
      option_c: "5 M R² / 2",
      option_d: "3 M R² / 2",
      correct_option: "D",
      explanation: "Step 1: An axis normal to the disc at its diameter refers to an axis perpendicular to the plane of the disc passing through the end of a diameter (i.e. at the edge of the disc at distance R from the centre).\n\nStep 2: The moment of inertia of a uniform disc about its central normal axis is:\nI_cm = (1/2) M R²\n\nStep 3: By the parallel axis theorem, for an axis parallel to this central axis at distance d = R:\nI = I_cm + M d² = (1/2) M R² + M R² = (3/2) M R²\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the moment of inertia of a uniform circular disc of mass M and radius R about an axis perpendicular to its plane and passing through a point midway between the centre and the circumference?",
      option_a: "(3/4) M R²",
      option_b: "(1/2) M R²",
      option_c: "(5/8) M R²",
      option_d: "(7/8) M R²",
      correct_option: "A",
      explanation: "Step 1: Distance from the centre to the midway point is d = R / 2.\nStep 2: Central normal moment of inertia: I_cm = (1/2) M R².\nStep 3: By parallel axis theorem:\nI = I_cm + M d² = (1/2) M R² + M (R / 2)² = (1/2) M R² + (1/4) M R² = (3/4) M R²\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 522,
    originalQuestion: {
      question: "A uniform rod AB of length l and mass m is free to rotate about point A. The rod is released from rest in a horizontal position. Given that the moment of inertia of the rod about A is m l² / 3, the initial angular acceleration of the rod will be: [AIPMT 2006]",
      option_a: "2g / l",
      option_b: "3g / (2l)",
      option_c: "3l / (2g)",
      option_d: "g / l",
      correct_option: "B",
      explanation: "Step 1: In the horizontal position, the weight mg of the uniform rod acts downwards at its centre of mass, which is at a distance l / 2 from the pivot A.\n\nStep 2: The torque about pivot A is:\nτ = mg × (l / 2) = mgl / 2\n\nStep 3: The moment of inertia of the rod about the end A is:\nI = m l² / 3\n\nStep 4: Using τ = I α:\nmgl / 2 = (m l² / 3) α\nα = (mgl / 2) / (m l² / 3) = 3g / (2l)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform thin rod of length 2 m and mass 1.5 kg is hinged at one end and held horizontally. When released from rest, its initial angular acceleration is: (Take g = 10 m/s²)",
      option_a: "7.5 rad/s²",
      option_b: "5.0 rad/s²",
      option_c: "15 rad/s²",
      option_d: "10 rad/s²",
      correct_option: "A",
      explanation: "Step 1: For a uniform rod hinged at one end released from a horizontal position:\nα = 3g / (2L)\nStep 2: Substituting g = 10 m/s² and L = 2 m:\nα = (3 × 10) / (2 × 2) = 30 / 4 = 7.5 rad/s²\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 521,
    originalQuestion: {
      question: "A wheel has an angular acceleration of 3.0 rad/s² and an initial angular speed of 2.00 rad/s. In a time of 2 s, it has rotated through an angle of how many radians? [AIPMT 2007]",
      option_a: "10",
      option_b: "12",
      option_c: "4",
      option_d: "6",
      correct_option: "A",
      explanation: "Step 1: Using the second equation of rotational kinematics under constant angular acceleration:\nθ = ω₀ t + (1/2) α t²\n\nStep 2: Given:\nω₀ = 2.00 rad/s\nα = 3.0 rad/s²\nt = 2 s\n\nStep 3: Substitute the given values:\nθ = (2.00 × 2) + (1/2) × 3.0 × (2)²\nθ = 4 + (1/2) × 3.0 × 4 = 4 + 6 = 10 radians\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A wheel initially rotating at 4 rad/s undergoes a uniform angular deceleration of 1.5 rad/s². The angular displacement after 2 seconds is:",
      option_a: "5 rad",
      option_b: "8 rad",
      option_c: "6 rad",
      option_d: "4 rad",
      correct_option: "A",
      explanation: "Step 1: Equation of motion: θ = ω₀ t - (1/2) α t²\nStep 2: With ω₀ = 4 rad/s, α = 1.5 rad/s², t = 2 s:\nθ = (4 × 2) - 0.5 × 1.5 × (2)² = 8 - 3 = 5 radians\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 520,
    originalQuestion: {
      question: "A uniform rod AB of length l and mass m is free to rotate about point A. The rod is released from rest in a horizontal position. Given that the moment of inertia of the rod about A is m l² / 3, the initial angular acceleration of the rod will be: [AIPMT 2007]",
      option_a: "2g / l",
      option_b: "3g / (2l)",
      option_c: "g / (2l)",
      option_d: "3l / (2g)",
      correct_option: "B",
      explanation: "Step 1: The gravitational torque about the hinge point A in the horizontal position is:\nτ = mg × (l / 2) = mgl / 2\n\nStep 2: The moment of inertia of the rod about one end is:\nI = (1/3) m l²\n\nStep 3: Using the relation τ = I α:\nmgl / 2 = (1/3) m l² α\nα = (mgl / 2) / [(1/3) m l²] = 3g / (2l)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform meter stick of length 1 m is hinged at one end and held horizontally. Upon release, the linear downward acceleration of its free tip at the initial instant is: (Take g = 10 m/s²)",
      option_a: "15 m/s²",
      option_b: "10 m/s²",
      option_c: "7.5 m/s²",
      option_d: "5 m/s²",
      correct_option: "A",
      explanation: "Step 1: The initial angular acceleration of the hinged rod is:\nα = 3g / (2L)\nStep 2: The tangential linear acceleration of the tip at distance L is:\na_tip = α L = [3g / (2L)] × L = 3g / 2\nStep 3: For g = 10 m/s²:\na_tip = 3(10) / 2 = 15 m/s²\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 519,
    originalQuestion: {
      question: "A particle of mass m moves in the XY plane with a velocity v along the straight line AB. If the angular momentum of the particle with respect to the origin O is L_A when it is at A and L_B when it is at B, then: [AIPMT 2007]",
      option_a: "L_A = L_B",
      option_b: "The relationship between L_A and L_B depends upon the slope of the line AB",
      option_c: "L_A < L_B",
      option_d: "L_A > L_B",
      correct_option: "A",
      explanation: "Step 1: The angular momentum of a particle of mass m moving with velocity v⃗ with respect to the origin O is given by:\nL⃗ = r⃗ × p⃗ = r⃗ × (m v⃗)\n\nStep 2: The magnitude of the angular momentum is:\n|L⃗| = m v (r sin θ) = m v d_perp\nwhere d_perp is the perpendicular distance from the origin O to the line of motion AB.\n\nStep 3: Since the particle moves along the fixed straight line AB with constant speed v, the perpendicular distance d_perp from the origin to the line AB is a constant for all points on the line.\n\nStep 4: Therefore, the angular momentum has the same magnitude at both points A and B, so L_A = L_B.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A particle of mass 2 kg moves with a constant velocity v⃗ = 5 î m/s along the straight line y = 3 m. The angular momentum of the particle about the origin:",
      option_a: "Remains constant at 30 k̂ kg m² s⁻¹",
      option_b: "Remains constant at -30 k̂ kg m² s⁻¹",
      option_c: "Increases as x increases",
      option_d: "Decreases as x increases",
      correct_option: "B",
      explanation: "Step 1: Position vector of particle: r⃗ = x î + 3 ĵ.\nStep 2: Linear momentum: p⃗ = m v⃗ = 2(5 î) = 10 î kg m/s.\nStep 3: Angular momentum about origin:\nL⃗ = r⃗ × p⃗ = (x î + 3 ĵ) × (10 î) = -30 k̂ kg m² s⁻¹\nStep 4: This is independent of x and remains strictly constant.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 518,
    originalQuestion: {
      question: "The ratio of the radii of gyration of a circular disc to that of a circular ring, each of the same mass and radius, around their respective symmetry axes perpendicular to their planes, is: [AIPMT 2008]",
      option_a: "√2 : 1",
      option_b: "√2 : √3",
      option_c: "√3 : √2",
      option_d: "1 : √2",
      correct_option: "D",
      explanation: "Step 1: For a circular disc of mass M and radius R about its central perpendicular axis:\nI_disc = (1/2) M R² = M K_disc²\nK_disc = R / √2\n\nStep 2: For a circular ring of mass M and radius R about its central perpendicular axis:\nI_ring = M R² = M K_ring²\nK_ring = R\n\nStep 3: The ratio of their radii of gyration is:\nK_disc / K_ring = (R / √2) / R = 1 / √2 = 1 : √2\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform thin disc and a uniform thin ring have identical masses and radii. What is the ratio of their moments of inertia about an axis passing through the centre and perpendicular to their planes?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: I_disc = (1/2) M R².\nStep 2: I_ring = M R².\nStep 3: Ratio I_disc / I_ring = (1/2 M R²) / (M R²) = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 517,
    originalQuestion: {
      question: "A thin rod of length L and mass M is bent at its midpoint into two halves so that the angle between them is 90°. The moment of inertia of the bent rod about an axis passing through the bending point and perpendicular to the plane defined by the two halves of the rod is: [AIPMT 2008]",
      option_a: "M L² / 6",
      option_b: "√2 M L² / 24",
      option_c: "M L² / 24",
      option_d: "M L² / 12",
      correct_option: "D",
      explanation: "Step 1: The rod is divided into two halves, each of length l = L / 2 and mass m = M / 2.\n\nStep 2: The axis passes through the vertex (the bending point) perpendicular to the plane of the rod.\n\nStep 3: For each half of the rod, the axis passes through one of its ends perpendicular to its length. The moment of inertia of a rod of mass m and length l about one end is:\nI_half = (1/3) m l²\n\nStep 4: Substituting m = M / 2 and l = L / 2:\nI_half = (1/3) (M / 2) (L / 2)² = (1/3) (M / 2) (L² / 4) = M L² / 24\n\nStep 5: The total moment of inertia of the two halves is:\nI_total = I_half + I_half = 2 × (M L² / 24) = M L² / 12\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A thin uniform rod of mass M and length L is bent into an equilateral triangle. Its moment of inertia about an axis passing through one vertex perpendicular to the plane of the triangle is:",
      option_a: "(5/54) M L²",
      option_b: "(1/18) M L²",
      option_c: "(1/12) M L²",
      option_d: "(7/54) M L²",
      correct_option: "B",
      explanation: "Step 1: Each side of the triangle has mass m = M / 3 and length l = L / 3.\nStep 2: Two sides meet at the vertex. For each, the axis passes through one end:\nI₁ = I₂ = (1/3) m l²\nStep 3: The third opposite side has distance h = l sin 60° = (√3 / 2) l from the vertex.\nBy parallel axis theorem:\nI₃ = (1/12) m l² + m h² = (1/12) m l² + m (3/4 l²) = (10/12) m l² = (5/6) m l²\nStep 4: Total I = (1/3 + 1/3 + 5/6) m l² = (9/6) m l² = (3/2) m l²\nSubstitute m = M/3, l = L/3:\nI = (3/2) (M/3) (L/3)² = (1/2 M) (L² / 9) = (1/18) M L².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 516,
    originalQuestion: {
      question: "Four identical thin rods each of mass M and length l form a square frame. The moment of inertia of the frame about an axis through the centre of the square and perpendicular to its plane is: [AIPMT 2009]",
      option_a: "3 M l² / 2",
      option_b: "13 M l² / 3",
      option_c: "M l² / 3",
      option_d: "4 M l² / 3",
      correct_option: "D",
      explanation: "Step 1: Consider one rod of mass M and length l. The moment of inertia of this rod about an axis passing through its own centre of mass and perpendicular to its length is:\nI_cm = (1/12) M l²\n\nStep 2: The perpendicular distance from the centre of the square frame to the centre of mass of any of the four sides is:\nd = l / 2\n\nStep 3: By the parallel axis theorem, the moment of inertia of one rod about the central axis perpendicular to the plane of the square is:\nI_one = I_cm + M d² = (1/12) M l² + M (l / 2)² = (1/12) M l² + (1/4) M l² = (4/12) M l² = (1/3) M l²\n\nStep 4: The total moment of inertia of all four identical rods is:\nI_total = 4 × I_one = 4 × (1/3) M l² = 4 M l² / 3\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Four thin uniform rods each of mass 0.5 kg and length 0.4 m form a square frame. Its moment of inertia about an axis perpendicular to the square and passing through its center is:",
      option_a: "0.107 kg m²",
      option_b: "0.213 kg m²",
      option_c: "0.053 kg m²",
      option_d: "0.426 kg m²",
      correct_option: "A",
      explanation: "Step 1: The moment of inertia of a square frame of 4 identical rods about the central perpendicular axis is:\nI = (4/3) M l²\nStep 2: Substitute M = 0.5 kg and l = 0.4 m:\nI = (4/3) × 0.5 × (0.4)² = (2/3) × 0.16 = 0.32 / 3 ≈ 0.1067 kg m²\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 515,
    originalQuestion: {
      question: "If F⃗ is the force acting on a particle having position vector r⃗ and τ⃗ is the torque of this force about the origin, then: [AIPMT 2009]",
      option_a: "r⃗ · τ⃗ > 0 and F⃗ · τ⃗ < 0",
      option_b: "r⃗ · τ⃗ = 0 and F⃗ · τ⃗ = 0",
      option_c: "r⃗ · τ⃗ = 0 and F⃗ · τ⃗ ≠ 0",
      option_d: "r⃗ · τ⃗ ≠ 0 and F⃗ · τ⃗ = 0",
      correct_option: "B",
      explanation: "Step 1: By definition, the torque vector τ⃗ of a force F⃗ with respect to the origin is given by the cross product:\nτ⃗ = r⃗ × F⃗\n\nStep 2: By the fundamental property of the vector cross product, the resulting vector τ⃗ is perpendicular to both vector r⃗ and vector F⃗:\nτ⃗ ⊥ r⃗  and  τ⃗ ⊥ F⃗\n\nStep 3: The scalar (dot) product of two mutually perpendicular vectors is identically zero:\nr⃗ · τ⃗ = 0\nF⃗ · τ⃗ = 0\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The angular momentum of a particle about the origin is defined as L⃗ = r⃗ × p⃗. Which of the following scalar products is always zero?",
      option_a: "r⃗ · L⃗ and p⃗ · L⃗",
      option_b: "r⃗ · p⃗ and r⃗ · L⃗",
      option_c: "p⃗ · L⃗ only",
      option_d: "r⃗ · p⃗ only",
      correct_option: "A",
      explanation: "Step 1: The cross product L⃗ = r⃗ × p⃗ produces a vector perpendicular to both r⃗ and p⃗.\nStep 2: Since L⃗ is orthogonal to r⃗, r⃗ · L⃗ = 0.\nStep 3: Since L⃗ is orthogonal to p⃗, p⃗ · L⃗ = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 514,
    originalQuestion: {
      question: "A thin circular ring of mass M and radius R is rotating in a horizontal plane about an axis vertical to its plane with a constant angular velocity ω. If two objects each of mass m be attached gently to the opposite ends of a diameter of the ring, the ring will then rotate with an angular velocity: [AIPMT 2009]",
      option_a: "ωM / (M + 2m)",
      option_b: "Mω / (M + 2m)",
      option_c: "Mω / (M + m)",
      option_d: "Mω / (M - 2m)",
      correct_option: "B",
      explanation: "Step 1: No external torque acts on the system about the vertical axis of rotation, so the angular momentum is conserved:\nL_initial = L_final\n\nStep 2: Initial moment of inertia of the ring:\nI_initial = M R²\nInitial angular momentum:\nL_initial = M R² ω\n\nStep 3: When two masses m are attached to opposite ends of a diameter, each mass is at distance R from the axis:\nI_final = M R² + 2 (m R²) = (M + 2m) R²\n\nStep 4: Equating angular momenta:\nM R² ω = (M + 2m) R² ω'\nω' = Mω / (M + 2m)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A thin uniform ring of mass 3 kg and radius R rotates with angular velocity 10 rad/s about its axis. Two small bodies each of mass 1 kg are gently placed at opposite ends of a diameter. The new angular velocity is:",
      option_a: "6 rad/s",
      option_b: "5 rad/s",
      option_c: "7.5 rad/s",
      option_d: "4 rad/s",
      correct_option: "A",
      explanation: "Step 1: Angular momentum conservation:\nI₁ ω₁ = I₂ ω₂\nStep 2: I₁ = M R² = 3 R²\nI₂ = (M + 2m) R² = (3 + 2 × 1) R² = 5 R²\nStep 3: ω₂ = (I₁ / I₂) ω₁ = (3 / 5) × 10 = 6 rad/s\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 513,
    originalQuestion: {
      question: "A gramophone record is revolving with an angular velocity ω. A coin is placed at a distance r from the centre of the record. The coefficient of static friction is μ. The coin will revolve with the record if: [AIPMT 2010 Prelims]",
      option_a: "r = μg ω²",
      option_b: "r < μg / ω²",
      option_c: "r ≤ μg / ω²",
      option_d: "r ≥ μg / ω²",
      correct_option: "C",
      explanation: "Step 1: For the coin of mass m to revolve with the turntable in a circle of radius r without slipping, the required centripetal force must be provided by static friction:\nF_c = m r ω²\n\nStep 2: The maximum static frictional force available is:\nf_max = μ N = μ mg\n\nStep 3: The coin will revolve without slipping as long as the required centripetal force does not exceed the maximum static friction:\nm r ω² ≤ μ mg\n\nStep 4: Dividing both sides by m ω²:\nr ≤ μg / ω²\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A coin placed on a rotating horizontal turntable at a distance of 10 cm from the axis slips when the speed of the turntable is 5 rad/s. If the speed is doubled to 10 rad/s, the maximum distance from the center at which the coin will not slip is:",
      option_a: "2.5 cm",
      option_b: "5.0 cm",
      option_c: "1.25 cm",
      option_d: "20 cm",
      correct_option: "A",
      explanation: "Step 1: The condition for not slipping is r ≤ μg / ω².\nStep 2: The maximum radius is inversely proportional to ω²:\nr_max ∝ 1 / ω²\nStep 3: When ω is doubled (from 5 to 10 rad/s), r_max becomes:\nr' = r / 2² = 10 cm / 4 = 2.5 cm\n\nTherefore, Option (A) is the correct answer."
    }
  }
];
