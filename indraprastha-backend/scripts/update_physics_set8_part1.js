const fs = require('fs');

const set8Part1Updates = [
  {
    id: 2320, // Q1
    similar_question: {
      question: "A flywheel rotates about a fixed axis with an instantaneous angular velocity given by ω(t) = ω₀ − k t, where ω₀ and k are positive constants. What is the total angle (in radians) through which the flywheel rotates before coming to a complete stop?",
      option_a: "ω₀² / (2k)",
      option_b: "ω₀² / k",
      option_c: "2ω₀² / k",
      option_d: "ω₀ / (2k)",
      correct_option: "A",
      explanation: "Step 1: The flywheel comes to a stop when its angular velocity becomes zero:\nω(t) = 0  →  ω₀ − k t = 0  →  t_stop = ω₀ / k.\n\nStep 2: Angular displacement is obtained by integrating angular velocity over time:\nθ = ∫₀^(ω₀/k) (ω₀ − k t) dt = [ω₀ t − (1/2) k t²]₀^(ω₀/k).\n\nStep 3: Evaluate limits:\nθ = ω₀ (ω₀ / k) − (1/2) k (ω₀ / k)² = ω₀² / k − (1/2) ω₀² / k = ω₀² / (2k).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2321, // Q2
    similar_question: {
      question: "Three point masses, each of mass m, are fixed at the vertices of a right-angled isosceles triangle ABC with legs AB = BC = a. Which of the following correctly compares the moments of inertia of the system about axes lying in the plane of the triangle along the sides AB, BC, and AC?",
      option_a: "I_AB = I_BC > I_AC",
      option_b: "I_AC > I_AB = I_BC",
      option_c: "I_AB > I_BC > I_AC",
      option_d: "I_AB = I_BC = I_AC",
      correct_option: "A",
      explanation: "Step 1: About side AB: masses at A and B lie directly on the axis (distance 0), while mass at C is at perpendicular distance a:\nI_AB = m (a)² = m a².\n\nStep 2: About side BC: masses at B and C lie on the axis, while mass at A is at perpendicular distance a:\nI_BC = m (a)² = m a².\n\nStep 3: About hypotenuse AC: masses at A and C lie on the axis. The perpendicular distance from B to hypotenuse AC is h = a / √2:\nI_AC = m (a / √2)² = (1/2) m a².\nHence, I_AB = I_BC > I_AC.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2322, // Q3
    similar_question: {
      question: "Three identical point particles, each of mass m, are situated at the vertices of an equilateral triangle of side length a. What is the moment of inertia of this three-particle system about an axis passing through one vertex and perpendicular to the plane of the triangle?",
      option_a: "2 m a²",
      option_b: "(3/2) m a²",
      option_c: "3 m a²",
      option_d: "m a²",
      correct_option: "A",
      explanation: "Step 1: The particle located at the selected vertex lies directly on the axis of rotation, so its perpendicular distance is r₁ = 0.\n\nStep 2: In an equilateral triangle of side a, the other two particles are each at a distance r₂ = r₃ = a from the selected vertex.\n\nStep 3: Compute the total moment of inertia:\nI = m(0)² + m(a)² + m(a)² = 2 m a².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2323, // Q4
    similar_question: {
      question: "A uniform thin wire of total mass M and total length 2L is bent at its midpoint into an L-shape with a 90° angle between the two arms (each arm of mass M / 2 and length L). What is the moment of inertia of this bent wire about an axis passing through the corner vertex and perpendicular to the plane of the wire?",
      option_a: "(1/3) M L²",
      option_b: "(1/6) M L²",
      option_c: "(2/3) M L²",
      option_d: "(1/12) M L²",
      correct_option: "A",
      explanation: "Step 1: The system consists of two identical straight wire segments, each of mass m' = M / 2 and length L, meeting at the corner.\n\nStep 2: The moment of inertia of a uniform rod about an axis through one of its ends perpendicular to its length is I_rod = (1/3) m' L².\n\nStep 3: Sum the moments of inertia of both arms about the corner:\nI_total = 2 × [(1/3) (M / 2) L²] = (1/3) M L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2324, // Q5
    similar_question: {
      question: "The moment of inertia of a uniform circular disc of mass M and radius R about any of its diameter axes is I_d. What is its moment of inertia about an axis tangent to the disc and perpendicular to its plane?",
      option_a: "6 I_d",
      option_b: "5 I_d",
      option_c: "4 I_d",
      option_d: "3 I_d",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of a disc about any diameter is I_d = (1/4) M R²  →  M R² = 4 I_d.\n\nStep 2: Moment of inertia about central axis perpendicular to the plane: I_cm = (1/2) M R² = 2 I_d.\n\nStep 3: By parallel axis theorem, the tangential perpendicular axis is at distance d = R from the centre:\nI_tangent = I_cm + M R² = (1/2) M R² + M R² = (3/2) M R².\nSubstitute M R² = 4 I_d:\nI_tangent = (3/2)(4 I_d) = 6 I_d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2325, // Q6
    similar_question: {
      question: "A thin uniform wire of mass M and length L is bent into a complete circular loop of radius R. What is the moment of inertia of the loop about an axis passing through a point on its circumference and perpendicular to the plane of the loop?",
      option_a: "M L² / (2 π²)",
      option_b: "M L² / (4 π²)",
      option_c: "2 M L² / π²",
      option_d: "M L² / π²",
      correct_option: "A",
      explanation: "Step 1: Circumference of the loop equals the wire length: 2 π R = L  →  R = L / (2π).\n\nStep 2: Moment of inertia of the circular ring about central perpendicular axis: I_cm = M R².\n\nStep 3: By the parallel axis theorem, about a point on the circumference (distance d = R):\nI = I_cm + M R² = 2 M R² = 2 M [L / (2π)]² = 2 M L² / (4 π²) = M L² / (2 π²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2326, // Q7
    similar_question: {
      question: "A thin uniform wire of mass m and length L is bent into a semicircle of radius R. What is its moment of inertia about the straight axis joining its two free ends (the diameter of the semicircle)?",
      option_a: "m L² / (2 π²)",
      option_b: "m L² / π²",
      option_c: "m L² / (4 π²)",
      option_d: "2 m L² / π²",
      correct_option: "A",
      explanation: "Step 1: Length of the semicircle: π R = L  →  R = L / π.\n\nStep 2: Every element of a circular ring or semicircle has moment of inertia about its diameter given by (1/2) m R² by symmetry.\n\nStep 3: Substitute R = L / π:\nI = (1/2) m (L / π)² = m L² / (2 π²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2327, // Q8
    similar_question: {
      question: "What is the moment of inertia of a uniform solid circular disc of mass M and radius R about an axis perpendicular to its plane and passing through a point on its outer rim?",
      option_a: "(3/2) M R²",
      option_b: "(1/2) M R²",
      option_c: "2 M R²",
      option_d: "(5/4) M R²",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of the disc about an axis through its centre of mass perpendicular to the plane:\nI_cm = (1/2) M R².\n\nStep 2: Distance from centre of mass to the outer rim is d = R.\n\nStep 3: By the parallel axis theorem:\nI_rim = I_cm + M d² = (1/2) M R² + M R² = (3/2) M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2328, // Q9
    similar_question: {
      question: "For a uniform circular disc of radius R, the moment of inertia about an axis perpendicular to the plane of the disc is greatest when the axis passes through which of the following points?",
      option_a: "A point on the outer circumference of the disc",
      option_b: "The geometric centre of the disc",
      option_c: "A point midway between the centre and the rim (at R / 2)",
      option_d: "It is identical for all perpendicular axes",
      correct_option: "A",
      explanation: "Step 1: According to the parallel axis theorem, I = I_cm + M d², where d is the perpendicular distance between the given axis and the parallel axis passing through the centre of mass.\n\nStep 2: Since I_cm = (1/2) M R² is constant, the moment of inertia increases monotonically with distance d.\n\nStep 3: The maximum possible distance within or on the boundary of the disc is d = R on the outer circumference.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2329, // Q10
    similar_question: {
      question: "Two uniform circular discs A and B have identical mass and identical thickness, but are made of materials having densities ρ_A = 2.5 g/cm³ and ρ_B = 10.0 g/cm³ respectively. What is the ratio of their moments of inertia I_A / I_B about their central perpendicular axes?",
      option_a: "4 : 1",
      option_b: "1 : 4",
      option_c: "2 : 1",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "Step 1: Mass of a disc of radius R, thickness t, and density ρ:\nM = ρ (π R² t)  →  R² = M / (π t ρ) ∝ 1 / ρ.\n\nStep 2: Moment of inertia about the central perpendicular axis is I = (1/2) M R².\nSince both discs have identical mass M, I ∝ R² ∝ 1 / ρ.\n\nStep 3: Ratio of moments of inertia:\nI_A / I_B = ρ_B / ρ_A = 10.0 / 2.5 = 4 / 1 = 4 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2330, // Q11
    similar_question: {
      question: "Two identical thin circular rings, each of mass M and radius R, are placed coplanar and tangent to each other at a single point. What is the moment of inertia of this two-ring system about the common tangent line passing through the point of contact in their plane?",
      option_a: "3 M R²",
      option_b: "4 M R²",
      option_c: "2 M R²",
      option_d: "(5/2) M R²",
      correct_option: "A",
      explanation: "Step 1: For each ring, the axis of rotation is a tangent in its own plane.\n\nStep 2: By the parallel axis theorem, moment of inertia of a ring about an in-plane tangent is:\nI_tangent = I_diameter + M R² = (1/2) M R² + M R² = (3/2) M R².\n\nStep 3: For the system of two identical tangent rings:\nI_total = 2 × [(3/2) M R²] = 3 M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2331, // Q12
    similar_question: {
      question: "Four thin uniform rods, each of mass m and length L, are welded together to form a planar square frame. What is the moment of inertia of the frame about an axis along one of its diagonals?",
      option_a: "(2/3) m L²",
      option_b: "(4/3) m L²",
      option_c: "(1/3) m L²",
      option_d: "(1/6) m L²",
      correct_option: "A",
      explanation: "Step 1: Total moment of inertia of the square frame about the central perpendicular axis (z-axis):\nFor each rod, I_z,rod = (1/12) m L² + m(L / 2)² = (1/3) m L².\nFor 4 rods: I_z = 4 × (1/3) m L² = (4/3) m L².\n\nStep 2: By symmetry, the moment of inertia about both diagonals in the plane are identical: I_diag1 = I_diag2.\n\nStep 3: Apply the perpendicular axis theorem: I_diag1 + I_diag2 = I_z  →  2 I_diag = (4/3) m L²  →  I_diag = (2/3) m L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2332, // Q13
    similar_question: {
      question: "Three identical thin spherical shells, each of mass m and radius R, are arranged in a line with their centers along a straight line such that the middle shell touches both outer shells. What is the moment of inertia of the three-shell system about the central axis passing through the centers of all three shells?",
      option_a: "2 m R²",
      option_b: "(4/3) m R²",
      option_c: "3 m R²",
      option_d: "(8/3) m R²",
      correct_option: "A",
      explanation: "Step 1: The rotation axis passes directly through the centre of each of the three spherical shells.\n\nStep 2: For any spherical shell, the moment of inertia about any axis passing through its centre is I_diameter = (2/3) m R².\n\nStep 3: Total moment of inertia of the three shells:\nI_total = 3 × [(2/3) m R²] = 2 m R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2333, // Q14
    similar_question: {
      question: "Four solid spheres, each of mass M and radius r, have their centres located at the four corners of a square of side L. What is the moment of inertia of this system about an axis passing along one side of the square?",
      option_a: "2 M L² + (8/5) M r²",
      option_b: "2 M L² + (4/5) M r²",
      option_c: "4 M L² + (8/5) M r²",
      option_d: "2 M L²",
      correct_option: "A",
      explanation: "Step 1: Two spheres have their centres lying directly on the rotation axis. For each, I₁ = (2/5) M r².\n\nStep 2: The other two spheres have their centres at perpendicular distance L from the axis. By the parallel axis theorem, for each:\nI₂ = (2/5) M r² + M L².\n\nStep 3: Total moment of inertia:\nI_total = 2 I₁ + 2 I₂ = 2[(2/5) M r²] + 2[(2/5) M r² + M L²] = 2 M L² + (8/5) M r².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2334, // Q15
    similar_question: {
      question: "Match the rigid bodies in List-I with their respective moments of inertia in List-II (each body has mass M and radius R):\nList-I:\n(A) Solid sphere about any tangent\n(B) Thin spherical shell about any tangent\n(C) Circular ring about any diameter\n(D) Circular disc about any diameter\nList-II:\n(1) (1/4) M R²\n(2) (1/2) M R²\n(3) (5/3) M R²\n(4) (7/5) M R²",
      option_a: "A-4, B-3, C-2, D-1",
      option_b: "A-3, B-4, C-1, D-2",
      option_c: "A-4, B-3, C-1, D-2",
      option_d: "A-3, B-4, C-2, D-1",
      correct_option: "A",
      explanation: "Step 1: Solid sphere tangent: I = (2/5) M R² + M R² = (7/5) M R²  →  (A) matches (4).\n\nStep 2: Spherical shell tangent: I = (2/3) M R² + M R² = (5/3) M R²  →  (B) matches (3).\n\nStep 3: Circular ring diameter: I = (1/2) M R²  →  (C) matches (2).\n\nStep 4: Circular disc diameter: I = (1/4) M R²  →  (D) matches (1).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2335, // Q16
    similar_question: {
      question: "A cart wheel consists of a thin circular rim of mass M and radius R, and four radial spokes each of mass m and length R extending from the hub to the rim. What is the moment of inertia of the wheel about its central rotational axis perpendicular to the plane of the wheel?",
      option_a: "[M + (4/3) m] R²",
      option_b: "(M + 4m) R²",
      option_c: "[M + (2/3) m] R²",
      option_d: "(M + m) R²",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of the circular rim about the central axis: I_rim = M R².\n\nStep 2: Each spoke is a uniform thin rod of mass m and length R rotating about one of its ends: I_spoke = (1/3) m R².\n\nStep 3: Total moment of inertia for the rim and four spokes:\nI_total = I_rim + 4 × I_spoke = M R² + 4 × [(1/3) m R²] = [M + (4/3) m] R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2336, // Q17
    similar_question: {
      question: "The moment of inertia of a uniform thin rod of mass M and length L about an axis through its centre of mass perpendicular to the rod is I₀ = (1/12) M L². Using the parallel axis theorem, what is its moment of inertia about a parallel axis passing through one of its ends?",
      option_a: "I₀ + (1/4) M L²",
      option_b: "I₀ + (1/2) M L²",
      option_c: "I₀ + M L²",
      option_d: "I₀ + 2 M L²",
      correct_option: "A",
      explanation: "Step 1: The centre of mass of a uniform rod of length L is at its midpoint.\n\nStep 2: The distance from the midpoint to either end of the rod is d = L / 2.\n\nStep 3: Apply the parallel axis theorem:\nI_end = I₀ + M d² = I₀ + M (L / 2)² = I₀ + (1/4) M L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2337, // Q18
    similar_question: {
      question: "Match the uniform rods in List-I with their moment of inertia about the specified axis in List-II:\nList-I:\n(A) Rod of mass M and length L about perpendicular bisector\n(B) Rod of mass M and length L about perpendicular axis at one end\n(C) Rod of mass 2M and length L about perpendicular bisector\n(D) Rod of mass M and length 2L about perpendicular axis at one end\nList-II:\n(1) (1/6) M L²\n(2) (1/3) M L²\n(3) (4/3) M L²\n(4) (1/12) M L²",
      option_a: "A-4, B-2, C-1, D-3",
      option_b: "A-2, B-4, C-1, D-3",
      option_c: "A-4, B-1, C-2, D-3",
      option_d: "A-1, B-2, C-3, D-4",
      correct_option: "A",
      explanation: "Step 1: (A) I = (1/12) M L²  →  matches (4).\n\nStep 2: (B) I = (1/3) M L²  →  matches (2).\n\nStep 3: (C) I = (1/12)(2M) L² = (1/6) M L²  →  matches (1).\n\nStep 4: (D) I = (1/3) M (2L)² = (4/3) M L²  →  matches (3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2338, // Q19
    similar_question: {
      question: "A point mass of 2 kg is located at coordinates (3 m, 4 m, 5 m). What is the moment of inertia of this particle about the z-axis?",
      option_a: "50 kg·m²",
      option_b: "25 kg·m²",
      option_c: "100 kg·m²",
      option_d: "75 kg·m²",
      correct_option: "A",
      explanation: "Step 1: The perpendicular distance r_z of any point (x, y, z) from the z-axis is:\nr_z = √(x² + y²).\n\nStep 2: Substitute x = 3 m and y = 4 m:\nr_z = √(3² + 4²) = √(9 + 16) = √25 = 5 m.\n\nStep 3: Calculate moment of inertia:\nI_z = m (r_z)² = 2 kg × (5 m)² = 2 × 25 = 50 kg·m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2339, // Q20
    similar_question: {
      question: "A uniform circular wire ring of mass M and radius R has a 60° arc section cut away. What is the moment of inertia of the remaining portion of the ring about an axis passing through the centre of the circle and perpendicular to its plane?",
      option_a: "(5/6) M R²",
      option_b: "(1/6) M R²",
      option_c: "(2/3) M R²",
      option_d: "(3/4) M R²",
      correct_option: "A",
      explanation: "Step 1: In a circular ring, all mass elements lie at the exact same radial distance R from the central perpendicular axis.\n\nStep 2: Fraction of the ring remaining:\nFraction = (360° − 60°) / 360° = 300° / 360° = 5 / 6.\nMass of remaining piece: M' = (5/6) M.\n\nStep 3: Moment of inertia: I = M' R² = (5/6) M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2340, // Q21
    similar_question: {
      question: "Two identical uniform thin rods 1 and 2, each of mass m and length L, are rigidly joined together to form a 'T' shape in the xy-plane (the end of rod 1 meets the midpoint of rod 2 perpendicularly). What is the moment of inertia of the system about an axis perpendicular to the plane passing through the joint?",
      option_a: "(5/12) m L²",
      option_b: "(2/3) m L²",
      option_c: "(1/4) m L²",
      option_d: "(1/6) m L²",
      correct_option: "A",
      explanation: "Step 1: For rod 1, the rotation axis passes through one of its ends: I₁ = (1/3) m L².\n\nStep 2: For rod 2, the rotation axis passes through its midpoint (centre of mass): I₂ = (1/12) m L².\n\nStep 3: Total moment of inertia about the joint:\nI_total = I₁ + I₂ = (1/3 + 1/12) m L² = (4/12 + 1/12) m L² = (5/12) m L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2341, // Q22
    similar_question: {
      question: "Four thin uniform rods, each of mass m and length d, are joined to form a planar square frame. What is the moment of inertia of this frame about an axis passing through the geometric centre of the square and perpendicular to its plane?",
      option_a: "(4/3) m d²",
      option_b: "(2/3) m d²",
      option_c: "(1/3) m d²",
      option_d: "2 m d²",
      correct_option: "A",
      explanation: "Step 1: For each rod, the moment of inertia about its own centre of mass perpendicular to the plane is I_cm = (1/12) m d².\n\nStep 2: The perpendicular distance from the centre of the square to the midpoint of each rod is r = d / 2.\n\nStep 3: By parallel axis theorem, for one rod: I_rod = (1/12) m d² + m (d / 2)² = (1/12 + 1/4) m d² = (1/3) m d².\nFor four rods: I_total = 4 × [(1/3) m d²] = (4/3) m d².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2342, // Q23
    similar_question: {
      question: "Three identical uniform thin rods, each of mass m and length L, are welded together to form an equilateral triangular frame. What is the moment of inertia of this frame about an axis passing through the centroid of the triangle and perpendicular to its plane?",
      option_a: "(1/2) m L²",
      option_b: "(1/3) m L²",
      option_c: "(2/3) m L²",
      option_d: "m L²",
      correct_option: "A",
      explanation: "Step 1: The distance from the centroid of an equilateral triangle of side L to the midpoint of each side is r = (L / 2) tan 30° = L / (2√3).\n\nStep 2: By parallel axis theorem, the moment of inertia of one rod about the centroid axis is:\nI_rod = (1/12) m L² + m r² = (1/12) m L² + m [L / (2√3)]² = (1/12) m L² + (1/12) m L² = (1/6) m L².\n\nStep 3: Total moment of inertia for all three rods:\nI_total = 3 × [(1/6) m L²] = (1/2) m L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2343, // Q24
    similar_question: {
      question: "A uniform thin rectangular plate has length a and width b with a = 2b. Let I_x and I_y be the moments of inertia about the axes in the plane of the plate passing through its centre parallel to the length and width, respectively. What is the ratio I_x / I_y?",
      option_a: "1 : 4",
      option_b: "4 : 1",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: For a rectangular lamina of mass M, length a, and width b:\nAxis parallel to length a: I_x = (1/12) M b².\nAxis parallel to width b: I_y = (1/12) M a².\n\nStep 2: Substitute a = 2b:\nI_y = (1/12) M (2b)² = (4/12) M b².\n\nStep 3: Ratio:\nI_x / I_y = [(1/12) M b²] / [(4/12) M b²] = 1 / 4 = 1 : 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2344, // Q25
    similar_question: {
      question: "The perpendicular axis theorem (I_z = I_x + I_y) is strictly applicable to which of the following categories of bodies?",
      option_a: "Planar (two-dimensional) thin laminas only",
      option_b: "Three-dimensional solid bodies of arbitrary shape",
      option_c: "Solid spheres and cylinders only",
      option_d: "Any rigid body with rotational symmetry",
      correct_option: "A",
      explanation: "Step 1: In the derivation of the perpendicular axis theorem, the distance squared of each mass element is r² = x² + y² + z².\n\nStep 2: For I_z = I_x + I_y to hold identically, z must be zero for all mass elements (z = 0).\n\nStep 3: This condition is met exclusively by two-dimensional planar laminar bodies.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2345, // Q26
    similar_question: {
      question: "A uniform rectangular slab of mass M has edge lengths a, b, and c. What is its moment of inertia about an axis passing through its centre of mass and perpendicular to the face with dimensions a × b?",
      option_a: "(1/12) M (a² + b²)",
      option_b: "(1/3) M (a² + b²)",
      option_c: "(1/6) M (a² + b²)",
      option_d: "(1/4) M (a² + b²)",
      correct_option: "A",
      explanation: "Step 1: The axis passes through the centre of mass perpendicular to the rectangular face of dimensions a and b.\n\nStep 2: By integration across the volume:\nI = ∫ (x² + y²) dm = (1/12) M a² + (1/12) M b² = (1/12) M (a² + b²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2346, // Q27
    similar_question: {
      question: "A uniform semicircular thin wire of mass m and radius R lies in the xy-plane. Its centre of mass is located at a distance y_cm = 2R / π from the centre of curvature. What is the moment of inertia of the wire about an axis passing through its centre of mass and perpendicular to its plane?",
      option_a: "m R² [1 − 4 / π²]",
      option_b: "m R² [1 + 4 / π²]",
      option_c: "(1/2) m R²",
      option_d: "m R² [1 − 2 / π²]",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia about the central perpendicular axis through the centre of curvature O is I_O = m R².\n\nStep 2: By the parallel axis theorem: I_O = I_cm + m (y_cm)².\n\nStep 3: Solve for I_cm:\nI_cm = I_O − m (y_cm)² = m R² − m (2R / π)² = m R² [1 − 4 / π²].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2347, // Q28
    similar_question: {
      question: "A solid sphere of mass M and radius R_s has the same moment of inertia about its diameter as a thin spherical shell of the same mass M and radius R_h. What is the ratio of their radii R_s / R_h?",
      option_a: "√(5 / 3)",
      option_b: "√(3 / 5)",
      option_c: "5 / 3",
      option_d: "3 / 5",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of solid sphere about diameter: I_s = (2/5) M R_s².\n\nStep 2: Moment of inertia of spherical shell about diameter: I_h = (2/3) M R_h².\n\nStep 3: Equate the two:\n(2/5) M R_s² = (2/3) M R_h²  →  R_s² / R_h² = (2/3) / (2/5) = 5 / 3  →  R_s / R_h = √(5 / 3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2348, // Q29
    similar_question: {
      question: "Three bodies—a thin hoop (A), a uniform solid disc (B), and a solid sphere (C)—all have identical mass M and outer radius R, and rotate about their respective symmetry axes with the same angular velocity ω. What is the correct order of the work required to bring them to rest?",
      option_a: "W_A > W_B > W_C",
      option_b: "W_C > W_B > W_A",
      option_c: "W_B > W_A > W_C",
      option_d: "W_A = W_B = W_C",
      correct_option: "A",
      explanation: "Step 1: Work required to stop a rotating body equals its initial rotational kinetic energy: W = (1/2) I ω².\n\nStep 2: For equal mass M, radius R, and angular velocity ω, work is directly proportional to moment of inertia I.\n\nStep 3: Compare moments of inertia:\nHoop (A): I_A = M R² = 1.0 M R².\nDisc (B): I_B = (1/2) M R² = 0.5 M R².\nSolid sphere (C): I_C = (2/5) M R² = 0.4 M R².\nThus, W_A > W_B > W_C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2349, // Q30
    similar_question: {
      question: "A solid cylinder of fixed mass M and radius R has length L. Its moment of inertia about an axis passing through its centre of mass and perpendicular to its longitudinal symmetry axis is I = M (R² / 4 + L² / 12). If the volume V = π R² L is constant, for what ratio of L / R is this moment of inertia minimized?",
      option_a: "√(3 / 2)",
      option_b: "√(2 / 3)",
      option_c: "√3 / 2",
      option_d: "3 / 2",
      correct_option: "A",
      explanation: "Step 1: Express R² in terms of volume: R² = V / (π L).\nSubstitute into moment of inertia: I = M [V / (4 π L) + L² / 12].\n\nStep 2: Differentiate with respect to L and equate to zero for minimum:\ndI/dL = M [−V / (4 π L²) + 2L / 12] = 0.\n\nStep 3: Solve for L / R:\nL / 6 = (π R² L) / (4 π L²) = R² / (4 L)  →  4 L² = 6 R²  →  L² / R² = 3 / 2  →  L / R = √(3 / 2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2350, // Q31
    similar_question: {
      question: "A uniform thin square sheet of mass M and side length L is rolled into a seamless hollow open cylindrical shell such that opposite edges just touch. What is the moment of inertia of this hollow cylinder about its central longitudinal axis?",
      option_a: "M L² / (4 π²)",
      option_b: "M L² / (2 π²)",
      option_c: "M L² / (8 π²)",
      option_d: "M L² / π²",
      correct_option: "A",
      explanation: "Step 1: Circumference of the cylinder formed: 2 π R = L  →  R = L / (2π).\n\nStep 2: For a thin hollow cylinder, all of its mass M is situated at the constant radius R from the central axis.\n\nStep 3: Moment of inertia: I = M R² = M [L / (2π)]² = M L² / (4 π²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2351, // Q32
    similar_question: {
      question: "For any planar laminar body lying in the xy-plane, which of the following relations correctly expresses the Perpendicular Axis Theorem?",
      option_a: "I_z = I_x + I_y",
      option_b: "I_x = I_y + I_z",
      option_c: "I_y = I_x + I_z",
      option_d: "I_z² = I_x² + I_y²",
      correct_option: "A",
      explanation: "Step 1: For a point mass dm situated at coordinates (x, y, 0) in the xy-plane, distance squared from z-axis is r² = x² + y².\n\nStep 2: Moment of inertia about z-axis is I_z = ∫ (x² + y²) dm = ∫ y² dm + ∫ x² dm.\n\nStep 3: By definition, I_x = ∫ y² dm and I_y = ∫ x² dm. Thus, I_z = I_x + I_y.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2352, // Q33
    similar_question: {
      question: "Four thin rods, each of mass m and length L, form a square frame in the xy-plane with centre at the origin. What is the moment of inertia of the frame about the z-axis passing through its centre?",
      option_a: "(4/3) m L²",
      option_b: "(2/3) m L²",
      option_c: "(5/3) m L²",
      option_d: "(10/3) m L²",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of each rod about its own centre of mass perpendicular to the plane: I_cm = (1/12) m L².\n\nStep 2: Distance from centre of square to the midpoint of each rod is d = L / 2.\n\nStep 3: By parallel axis theorem, for each rod: I_rod = (1/12) m L² + m (L / 2)² = (1/3) m L².\nFor four rods: I_total = 4 × (1/3) m L² = (4/3) m L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2353, // Q34
    similar_question: {
      question: "Two uniform identical thin rods, each of mass m and length L, are welded end-to-end at a right angle (90°) to form an L-shaped rigid body. What is the moment of inertia of this body about an axis perpendicular to the plane of the rods passing through the junction?",
      option_a: "(2/3) m L²",
      option_b: "(1/3) m L²",
      option_c: "(4/3) m L²",
      option_d: "(1/6) m L²",
      correct_option: "A",
      explanation: "Step 1: Each rod rotates about an axis passing through one of its ends perpendicular to its length.\n\nStep 2: For a single rod of mass m and length L pivoted at an end, I = (1/3) m L².\n\nStep 3: Add the contributions of both rods: I_total = (1/3) m L² + (1/3) m L² = (2/3) m L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2354, // Q35
    similar_question: {
      question: "A uniform circular disc has radius R and mass 9M. A concentric circular hole of radius R / 3 (mass M) is cut out from its centre. What is the moment of inertia of the remaining annular disc about an axis passing through its centre and perpendicular to its plane?",
      option_a: "(40/9) M R²",
      option_b: "4 M R²",
      option_c: "(9/2) M R²",
      option_d: "(35/9) M R²",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia of full disc of mass 9M and radius R:\nI_full = (1/2) (9M) R² = (9/2) M R².\n\nStep 2: Moment of inertia of concentric removed disc of mass M and radius R / 3:\nI_hole = (1/2) M (R / 3)² = (1/18) M R².\n\nStep 3: Moment of inertia of remaining portion:\nI_rem = I_full − I_hole = (9/2 − 1/18) M R² = (81/18 − 1/18) M R² = (80/18) M R² = (40/9) M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2355, // Q36
    similar_question: {
      question: "A uniform circular disc has mass M and radius R. A circular hole of radius R / 2 is drilled out such that the hole touches the center and the outer edge of the disc. What is the moment of inertia of the remaining portion about an axis passing through the centre of the original disc and perpendicular to its plane?",
      option_a: "(13/32) M R²",
      option_b: "(11/32) M R²",
      option_c: "(15/32) M R²",
      option_d: "(9/32) M R²",
      correct_option: "A",
      explanation: "Step 1: Mass of the removed circular hole of radius R / 2 is m_hole = M × [π (R / 2)² / (π R²)] = M / 4.\n\nStep 2: Moment of inertia of original disc: I_orig = (1/2) M R² = (16/32) M R².\n\nStep 3: Moment of inertia of the hole about its own centre is (1/2) m_hole (R / 2)² = (1/32) M R².\nBy parallel axis theorem, about the disc centre (d = R / 2):\nI_hole = (1/32) M R² + (M / 4)(R / 2)² = (1/32 + 2/32) M R² = (3/32) M R².\n\nStep 4: Moment of inertia of remaining disc:\nI_rem = I_orig − I_hole = (16/32) M R² − (3/32) M R² = (13/32) M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2356, // Q37
    similar_question: {
      question: "A flat circular disc of radius 2R has a concentric circular cutout of radius R removed. If the remaining annular plate has mass M, what is its moment of inertia about an axis perpendicular to the plate through its centre?",
      option_a: "(5/2) M R²",
      option_b: "(3/2) M R²",
      option_c: "2 M R²",
      option_d: "3 M R²",
      correct_option: "A",
      explanation: "Step 1: Formula for moment of inertia of a uniform annular disc of mass M with inner radius R₁ and outer radius R₂:\nI = (1/2) M (R₁² + R₂²).\n\nStep 2: Substitute R₁ = R and R₂ = 2R:\nI = (1/2) M [R² + (2R)²] = (1/2) M [R² + 4R²] = (5/2) M R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2357, // Q38
    similar_question: {
      question: "An annular ring is bounded by inner radius R_in and outer radius R_out. If the total mass of the ring is M, what is its moment of inertia about the perpendicular axis passing through its centre?",
      option_a: "(1/2) M (R_in² + R_out²)",
      option_b: "(1/2) M (R_out² − R_in²)",
      option_c: "M (R_out² + R_in²)",
      option_d: "(1/4) M (R_in² + R_out²)",
      correct_option: "A",
      explanation: "Step 1: Mass surface density σ = M / [π (R_out² − R_in²)].\n\nStep 2: Integrate over elemental concentric rings of radius r and width dr:\nI = ∫_(R_in)^(R_out) r² (2 π r σ dr) = 2 π σ ∫_(R_in)^(R_out) r³ dr = (1/2) π σ (R_out⁴ − R_in⁴).\n\nStep 3: Factorize (R_out⁴ − R_in⁴) = (R_out² − R_in²)(R_out² + R_in²):\nI = (1/2) M (R_in² + R_out²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2358, // Q39
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): An electric ceiling fan continues to spin for a noticeable duration after the power supply is switched off.\nReason (R): Due to rotational inertia (moment of inertia), a rotating body resists changes to its state of rotational motion.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: By Newton's first law applied to rotational motion, a body possessing moment of inertia tends to maintain its angular velocity unless an external torque acts on it.\n\nStep 2: When the power is switched off, only small frictional torques from air and bearings oppose rotation, so the fan gradually decelerates over time.\n\nStep 3: Hence, both Assertion and Reason are true, and Reason is the direct physical explanation of Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2359, // Q40
    similar_question: {
      question: "Two identical thin rings, each of mass M and radius R, are welded together such that their planes are mutually perpendicular and they share a common centre. What is the radius of gyration k of this composite system about an axis passing through the centre and perpendicular to the plane of one ring?",
      option_a: "(√3 / 2) R",
      option_b: "√(3 / 2) R",
      option_c: "R / √2",
      option_d: "√3 R",
      correct_option: "A",
      explanation: "Step 1: Total mass of the system is M_total = 2M.\n\nStep 2: For the first ring, the axis is perpendicular to its plane: I₁ = M R².\nFor the second ring, the axis lies along its diameter: I₂ = (1/2) M R².\nTotal moment of inertia: I = I₁ + I₂ = M R² + (1/2) M R² = (3/2) M R².\n\nStep 3: Radius of gyration k is defined by I = M_total k²:\n(3/2) M R² = (2M) k²  →  k² = (3/4) R²  →  k = (√3 / 2) R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2360, // Q41
    similar_question: {
      question: "Four identical point masses, each of mass m, are situated at the four vertices of a square of side length a. What is the radius of gyration of the system about an axis perpendicular to the plane of the square passing through its centre?",
      option_a: "a / √2",
      option_b: "a / 2",
      option_c: "a",
      option_d: "a √2",
      correct_option: "A",
      explanation: "Step 1: Total mass of the system: M_total = 4m.\n\nStep 2: Distance from centre of square to each corner: r = a / √2.\n\nStep 3: Total moment of inertia:\nI = 4 × (m r²) = 4 m (a / √2)² = 2 m a².\n\nStep 4: Radius of gyration k:\nM_total k² = I  →  (4m) k² = 2 m a²  →  k² = a² / 2  →  k = a / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2361, // Q42
    similar_question: {
      question: "What is the ratio of the radius of gyration of a solid circular disc to that of a thin circular ring of the same radius R, each taken about a tangent axis lying in the plane of the body?",
      option_a: "√5 : √6",
      option_b: "5 : 6",
      option_c: "√3 : √5",
      option_d: "3 : 5",
      correct_option: "A",
      explanation: "Step 1: For the disc, moment of inertia about an in-plane tangent is:\nI_disc = (1/4) M R² + M R² = (5/4) M R²  →  k_disc = √(5/4) R.\n\nStep 2: For the ring, moment of inertia about an in-plane tangent is:\nI_ring = (1/2) M R² + M R² = (3/2) M R²  →  k_ring = √(3/2) R.\n\nStep 3: Ratio of radii of gyration:\nk_disc / k_ring = √(5/4) / √(3/2) = √(5/6) = √5 : √6.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2362, // Q43
    similar_question: {
      question: "Which of the following statements correctly distinguishes the Centre of Mass (CM) from the Centre of Gravity (CG) of an extended body?",
      option_a: "Centre of mass depends purely on mass distribution, whereas centre of gravity is the point where the net gravitational force acts and coincides with CM only in a uniform gravitational field",
      option_b: "Centre of mass and centre of gravity always coincide in every gravitational field",
      option_c: "Centre of gravity depends purely on mass distribution and is independent of gravity",
      option_d: "Centre of mass cannot be defined for irregular bodies",
      correct_option: "A",
      explanation: "Step 1: The Centre of Mass is an intrinsic geometric property of the mass distribution, independent of external fields: r_cm = (∫ r dm) / M.\n\nStep 2: The Centre of Gravity is the point through which the resultant gravitational force acts: r_cg = (∫ r g dm) / (∫ g dm).\n\nStep 3: When the gravitational field g is strictly uniform, g cancels out and CG coincides identically with CM. In non-uniform fields, they generally differ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2363, // Q44
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): For a uniform planar circular disc lying in the xy-plane, the radii of gyration about the in-plane x-axis and the perpendicular z-axis are equal.\nReason (R): For a flat planar disc, the perpendicular axis theorem requires I_z = I_x + I_y = 2 I_x, meaning I_z is twice I_x.",
      option_a: "Assertion is false but Reason is true",
      option_b: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_c: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_d: "Assertion is true but Reason is false",
      correct_option: "A",
      explanation: "Step 1: By the perpendicular axis theorem, for a circular disc I_z = I_x + I_y = 2 I_x (Reason is true).\n\nStep 2: Since I = M k², it follows that k_z² = 2 k_x²  →  k_z = √2 k_x.\n\nStep 3: Because k_z ≠ k_x, the radius of gyration about the perpendicular axis is not equal to that about the in-plane axis. Thus Assertion is false.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2364, // Q45
    similar_question: {
      question: "Consider the statement: 'If a rigid body is not undergoing rotational acceleration (or remains at rest), the net external torque calculated about ANY arbitrary reference point must be zero.' Is this statement generally true or false?",
      option_a: "True, provided the body is also in complete translational equilibrium (net force F_net = 0)",
      option_b: "False under all circumstances",
      option_c: "True only for point particles",
      option_d: "True only if the reference point is the centre of mass",
      correct_option: "A",
      explanation: "Step 1: The torque about any point P is related to torque about centre of mass by τ_P = τ_cm + r_P × F_net.\n\nStep 2: If the body is in full static equilibrium, both τ_cm = 0 and F_net = 0.\n\nStep 3: When F_net = 0, the torque τ_P is identical and zero about all reference points in space.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2365, // Q46
    similar_question: {
      question: "A solid cylinder of mass 40 kg and radius 0.4 m is mounted on a frictionless horizontal axle. A light cord wound around its outer surface is pulled with tension T. What tension T is required to produce an angular acceleration of 2.5 revolutions/s²? (Take π ≈ 3.1416)",
      option_a: "125.7 N",
      option_b: "62.8 N",
      option_c: "251.3 N",
      option_d: "80.0 N",
      correct_option: "A",
      explanation: "Step 1: Convert angular acceleration to rad/s²:\nα = 2.5 rev/s² = 2.5 × 2π rad/s² = 5π rad/s².\n\nStep 2: Moment of inertia of solid cylinder:\nI = (1/2) M R² = (1/2) × 40 kg × (0.4 m)² = 20 × 0.16 = 3.2 kg·m².\n\nStep 3: Torque τ = I α = 3.2 × 5π = 16π N·m.\nTorque by cord tension: τ = T × R  →  T × 0.4 = 16π  →  T = 40π ≈ 125.7 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2366, // Q47
    similar_question: {
      question: "A solid disk of mass 2 kg and radius 0.05 m rotates about its central axis at 60 rpm. What constant braking torque is required to bring it to a complete stop in 10 revolutions?",
      option_a: "7.85 × 10⁻⁴ N·m",
      option_b: "1.57 × 10⁻³ N·m",
      option_c: "3.93 × 10⁻⁴ N·m",
      option_d: "5.20 × 10⁻³ N·m",
      correct_option: "A",
      explanation: "Step 1: Convert initial angular velocity:\nω₀ = 60 rpm = 60 × (2π / 60) = 2π rad/s.\n\nStep 2: Total angular displacement:\nθ = 10 revolutions = 10 × 2π = 20π rad.\n\nStep 3: Using rotational kinematic equation ω² = ω₀² − 2 α θ:\n0 = (2π)² − 2 α (20π)  →  4π² = 40π α  →  α = 0.1π rad/s².\n\nStep 4: Moment of inertia: I = (1/2) M R² = (1/2) × 2 × (0.05)² = 0.0025 kg·m².\nTorque: τ = I α = 0.0025 × 0.1π = 0.00025π ≈ 7.85 × 10⁻⁴ N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2367, // Q48
    similar_question: {
      question: "A heavy industrial flywheel of mass 4000 kg and radius of gyration 1.2 m accelerates uniformly from rest to an angular speed of 30 rad/s in 1.5 minutes (90 seconds). What is the constant torque exerted on the flywheel?",
      option_a: "1920 N·m",
      option_b: "960 N·m",
      option_c: "2880 N·m",
      option_d: "1440 N·m",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia: I = M k² = 4000 kg × (1.2 m)² = 4000 × 1.44 = 5760 kg·m².\n\nStep 2: Angular acceleration: α = (ω − 0) / t = 30 rad/s / 90 s = 1/3 rad/s².\n\nStep 3: Required torque: τ = I α = 5760 kg·m² × (1/3 rad/s²) = 1920 N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2368, // Q49
    similar_question: {
      question: "A circular grinding wheel in a workshop rotates at a steady angular speed of 400 rad/s driven by an electric motor consuming 2.4 kW of mechanical power. What is the effective torque delivered to the wheel?",
      option_a: "6 N·m",
      option_b: "3 N·m",
      option_c: "12 N·m",
      option_d: "9.6 N·m",
      correct_option: "A",
      explanation: "Step 1: Mechanical power formula in rotational motion:\nP = τ × ω.\n\nStep 2: Substitute P = 2.4 kW = 2400 W and ω = 400 rad/s:\n2400 = τ × 400.\n\nStep 3: Solve for torque:\nτ = 2400 / 400 = 6 N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2369, // Q50
    similar_question: {
      question: "A light rigid meter rod lies along the x-axis. A downward force of 10 N acts at x = 0.2 m, an upward force of 30 N acts at x = 0.5 m, and a downward force of 20 N acts at x = 0.65 m. What is the state of motion of the rod?",
      option_a: "It remains at rest in complete equilibrium",
      option_b: "It undergoes translational motion only",
      option_c: "It undergoes rotational motion only",
      option_d: "It undergoes both translation and rotation",
      correct_option: "A",
      explanation: "Step 1: Check translational equilibrium:\nF_net = −10 N + 30 N − 20 N = 0 N.\n\nStep 2: Check rotational equilibrium about the origin (x = 0):\nτ_net = (−10)(0.2) + (+30)(0.5) + (−20)(0.65) = −2.0 + 15.0 − 13.0 = 0 N·m.\n\nStep 3: Since both net force and net torque are zero, the rod remains in complete equilibrium at rest.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2370, // Q51
    similar_question: {
      question: "A projectile of mass m is launched from origin O with initial velocity v₀ at an angle θ with the horizontal. During its flight in the vertical xy-plane:\n(1) The torque of gravity about the projection point O increases linearly with time.\n(2) The angular momentum of the projectile about O increases with time.\n(3) The torque about the x-axis (along the horizontal line of projection) is zero.",
      option_a: "All (1), (2), and (3) are correct",
      option_b: "Only (1) and (2) are correct",
      option_c: "Only (2) is correct",
      option_d: "Only (3) is correct",
      correct_option: "A",
      explanation: "Step 1: Torque about O: τ⃗_O = r⃗ × (m g⃗) = x (m g) (−k̂) = (v₀ cos θ t)(m g)(−k̂), which is directly proportional to time t  →  (1) is correct.\n\nStep 2: Angular momentum L_O = ∫ τ_O dt ∝ t², so its magnitude increases continuously during flight  →  (2) is correct.\n\nStep 3: Because the gravitational force and displacement lie entirely in the vertical xy-plane, the cross product has no x-component: τ_x = 0  →  (3) is correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2371, // Q52
    similar_question: {
      question: "A force F⃗ = (3î + 4ĵ) N acts at position r⃗ = (2î + 5ĵ) m. What is the torque of this force about the origin?",
      option_a: "−7 k̂ N·m",
      option_b: "+7 k̂ N·m",
      option_c: "−23 k̂ N·m",
      option_d: "+23 k̂ N·m",
      correct_option: "A",
      explanation: "Step 1: Torque formula: τ⃗ = r⃗ × F⃗.\n\nStep 2: Compute the cross product in components:\nτ⃗ = (2î + 5ĵ) × (3î + 4ĵ) = (2 × 4 − 5 × 3) k̂.\n\nStep 3: Evaluate:\nτ⃗ = (8 − 15) k̂ = −7 k̂ N·m.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart1() {
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

    console.log(`Starting update of Set 8 Part 1 (${set8Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set8Part1Updates) {
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
        console.log(`[${successCount}/${set8Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 8 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
