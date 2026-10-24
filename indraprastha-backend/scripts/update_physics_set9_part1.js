const fs = require('fs');

const set9Part1Updates = [
  {
    id: 148, // Q1
    similar_question: {
      question: "A point mass m is placed at a distance 3R from the centre O of a uniform solid sphere of mass M and radius R. The initial gravitational force on m is F₁. A spherical cavity of radius R / 2 centered at distance R / 2 from O along the line joining O and m is carved out. If the gravitational force on m due to the remaining part is F₂, what is the ratio F₁ : F₂?",
      option_a: "50 : 41",
      option_b: "25 : 18",
      option_c: "9 : 8",
      option_d: "36 : 25",
      correct_option: "A",
      explanation: "Step 1: Force due to the complete sphere of mass M at distance 3R from its centre:\nF₁ = G M m / (3R)² = G M m / (9 R²).\n\nStep 2: The carved-out sphere has radius R / 2, so its volume and mass are (1/2)³ = 1/8 of the original: M_cavity = M / 8.\nThe centre of this cavity is at distance R / 2 from O toward m. Therefore, the distance from the cavity's centre to mass m is:\nd = 3R − R / 2 = (5/2) R.\n\nStep 3: Force exerted by the removed mass on m:\nF_cavity = G (M / 8) m / [(5/2) R]² = (G M m / 8) / (25 R² / 4) = G M m / (50 R²).\n\nStep 4: Force exerted by the remaining mass:\nF₂ = F₁ − F_cavity = (G M m / R²) [ 1/9 − 1/50 ] = (G M m / R²) [ 41 / 450 ].\n\nStep 5: Compute the ratio F₁ : F₂:\nF₁ / F₂ = (1/9) / (41/450) = 450 / (9 × 41) = 50 / 41 = 50 : 41.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 149, // Q2
    similar_question: {
      question: "A uniform thin wire of total mass M and length L is bent into a quadrant of a circle (quarter-circle arc). A point particle of mass m is placed at the centre of curvature of the arc. What is the magnitude of the net gravitational force exerted by the wire on the particle?",
      option_a: "2√2 G M m π / L²",
      option_b: "2 G M m π / L²",
      option_c: "√2 G M m π / (2 L²)",
      option_d: "4 G M m π / L²",
      correct_option: "A",
      explanation: "Step 1: For a quarter-circle arc of length L, the radius of curvature R satisfies:\nL = (π / 2) R  →  R = 2L / π.\n\nStep 2: Linear mass density is λ = M / L. Consider an infinitesimal element dm = λ R dθ. Its gravitational force on m is dF = G m dm / R² = (G m λ / R) dθ.\n\nStep 3: By symmetry, the components along the bisector integrate to:\nF_net = ∫_{-π/4}^{π/4} (G m λ / R) cos θ dθ = (G m λ / R) [ 2 sin(π/4) ] = √2 G m λ / R.\n\nStep 4: Substitute λ = M / L and R = 2L / π:\nF_net = √2 G m (M / L) / (2L / π) = (√2 π / 2) (G M m / L²) × 2? Let's evaluate carefully:\n√2 × (π / 2L) × (G M m / L) = (√2 π / 2) G M m / L² = (π / √2) G M m / L².\nLet's write option_a: (π / √2) G M m / L², option_b: π G M m / L², option_c: 2π G M m / L², option_d: (√2 / π) G M m / L².\n\nTherefore, Option (A) is the correct answer.",
      option_a: "(π / √2) G M m / L²",
      option_b: "π G M m / L²",
      option_c: "2π G M m / L²",
      option_d: "(√2 / π) G M m / L²",
      correct_option: "A",
      explanation: "Step 1: For a quarter-circle arc of length L, L = (π / 2) R, which gives R = 2L / π.\n\nStep 2: Linear mass density is λ = M / L. The net force on m at the centre of curvature lies along the line of symmetry:\nF_net = ∫_{-π/4}^{π/4} (G m λ / R) cos θ dθ = (G m λ / R) [ sin(π/4) − sin(−π/4) ] = √2 G m λ / R.\n\nStep 3: Substitute λ = M / L and R = 2L / π:\nF_net = √2 G m (M / L) / (2L / π) = (√2 π / 2) (G M m / L²) = (π / √2) G M m / L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 150, // Q3
    similar_question: {
      question: "Two identical stars, each of mass M, revolve in circular orbits about their common centre of mass under their mutual gravitational attraction. If the separation between the stars is 2R, what is the orbital angular speed ω of each star?",
      option_a: "√[ G M / (4 R³) ]",
      option_b: "√[ G M / R³ ]",
      option_c: "√[ G M / (2 R³) ]",
      option_d: "√[ 2 G M / R³ ]",
      correct_option: "A",
      explanation: "Step 1: The two stars orbit their common centre of mass, which lies midway between them. Thus, each star moves in a circle of radius R.\n\nStep 2: The mutual gravitational attractive force between them (separated by distance 2R) is:\nF_g = G M² / (2R)² = G M² / (4 R²).\n\nStep 3: This gravitational force provides the necessary centripetal force for each star:\nM ω² R = G M² / (4 R²).\n\nStep 4: Solve for ω:\nω² = G M / (4 R³)  →  ω = √[ G M / (4 R³) ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 151, // Q4
    similar_question: {
      question: "Three point masses A, B, and C, each of mass m = 50 kg, lie along the x-axis with AB = BC = 5 m. A fourth identical particle P of mass 50 kg is placed on the y-axis at y = 5 m (on the perpendicular bisector of AC passing through B). What is the magnitude of the net gravitational force on particle P?",
      option_a: "(1 + 1 / √2) × 100 G",
      option_b: "100 G",
      option_c: "50 G",
      option_d: "200 G",
      correct_option: "A",
      explanation: "Step 1: Force on P due to mass B located at origin (distance 5 m along y-axis):\nF_B = G m² / (5)² = G (2500) / 25 = 100 G (directed downwards along −ĵ).\n\nStep 2: Distances from A (−5, 0) and C (+5, 0) to P (0, 5) are:\nr = √(5² + 5²) = 5√2 m.\nMagnitude of force from each is F_A = F_C = G (2500) / (5√2)² = 2500 G / 50 = 50 G.\n\nStep 3: The horizontal components of F_A and F_C cancel by symmetry. Their downward components add:\nF_y(A + C) = 2 × 50 G × cos 45° = 100 G × (1 / √2) = 100 G / √2.\n\nStep 4: Total downward force on P:\nF_net = F_B + F_y(A + C) = 100 G + 100 G / √2 = (1 + 1 / √2) × 100 G.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 152, // Q5
    similar_question: {
      question: "From a uniform solid sphere of mass M and radius R, a smaller sphere of radius R / 2 is scooped out such that it touches the surface of the original sphere. If this extracted sphere is placed at distance 4R from the centre of the original sphere, what is the gravitational force between the original sphere and the extracted sphere?",
      option_a: "49 G M² / (3528 R²)",
      option_b: "G M² / (64 R²)",
      option_c: "7 G M² / (128 R²)",
      option_d: "G M² / (16 R²)",
      correct_option: "A",
      explanation: "Step 1: The extracted small sphere has radius R / 2, so its mass is m = M × (1/2)³ = M / 8.\n\nStep 2: By the shell theorem and superposition, a spherical cavity or solid sphere outside another solid sphere acts as a point mass at its geometric centre.\n\nStep 3: The original full sphere has mass M with centre at origin O. The extracted sphere of mass M / 8 is placed at distance 4R from O.\n\nStep 4: Gravitational force between the full sphere of mass M and the small sphere of mass M / 8 is:\nF = G M (M / 8) / (4R)² = G M² / (8 × 16 R²) = G M² / (128 R²).\nWait, 49 / 3528 = 1 / 72. Let's make sure the options are simple and unambiguous:\nOption A: G M² / (128 R²), Option B: G M² / (64 R²), Option C: G M² / (256 R²), Option D: G M² / (32 R²).\n\nTherefore, Option (A) is the correct answer.",
      option_a: "G M² / (128 R²)",
      option_b: "G M² / (64 R²)",
      option_c: "G M² / (256 R²)",
      option_d: "G M² / (32 R²)",
      correct_option: "A",
      explanation: "Step 1: Mass of the extracted sphere of radius R / 2 is:\nm = M × (R / 2)³ / R³ = M / 8.\n\nStep 2: Both the complete sphere and the extracted sphere act as point masses located at their respective centres for external points.\n\nStep 3: With the centres separated by distance 4R, the gravitational attraction between them is:\nF = G M (M / 8) / (4R)² = G M² / (8 × 16 R²) = G M² / (128 R²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 153, // Q6
    similar_question: {
      question: "A solid sphere of mass M and radius R is enclosed concentrically by a uniform spherical shell of thickness R and mass 3M (extending from radius R to 2R). What is the gravitational field strength at a distance 4R from the common centre?",
      option_a: "G M / (4 R²)",
      option_b: "G M / (8 R²)",
      option_c: "G M / (2 R²)",
      option_d: "G M / (16 R²)",
      correct_option: "A",
      explanation: "Step 1: The point at distance r = 4R lies completely outside both the inner solid sphere and the outer spherical shell.\n\nStep 2: By Gauss's law for gravitation (or the shell theorem), all spherically symmetric mass distributions act as though their entire mass is concentrated at the common centre for any exterior point.\n\nStep 3: Total enclosed mass is M_total = M + 3M = 4M.\n\nStep 4: The gravitational field at r = 4R is:\nE = G M_total / r² = G (4M) / (4R)² = 4 G M / (16 R²) = G M / (4 R²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3168, // Q7
    similar_question: {
      question: "Kepler's second law, which asserts that the areal velocity of a planet revolving around the Sun is constant, is a direct physical consequence of:",
      option_a: "Conservation of angular momentum",
      option_b: "Conservation of linear momentum",
      option_c: "Conservation of kinetic energy",
      option_d: "Conservation of mechanical energy",
      correct_option: "A",
      explanation: "Step 1: The gravitational force exerted by the Sun on a planet is directed radially toward the Sun.\n\nStep 2: Because the line of action passes through the centre of attraction, the torque τ⃗ = r⃗ × F⃗ = 0.\n\nStep 3: With zero external torque, the planet's angular momentum L = 2 m (dA / dt) remains strictly conserved, proving dA / dt = constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3169, // Q8
    similar_question: {
      question: "At what height h above the Earth's surface will the acceleration due to gravity be the same as at a depth d = h below the surface? (R is the radius of the Earth)",
      option_a: "(√5 − 1) R / 2",
      option_b: "(√5 + 1) R / 2",
      option_c: "(√3 − 1) R / 2",
      option_d: "R / 2",
      correct_option: "A",
      explanation: "Step 1: Acceleration due to gravity at height h: g_h = g / (1 + h / R)².\nAcceleration due to gravity at depth d = h: g_d = g (1 − h / R).\n\nStep 2: Equate g_h = g_d:\ng / (1 + h / R)² = g (1 − h / R)  →  1 = (1 − h / R)(1 + h / R)².\nLet x = h / R:\n(1 − x)(1 + 2x + x²) = 1  →  1 + 2x + x² − x − 2x² − x³ = 1\nx − x² − x³ = 0  →  x(1 − x − x²) = 0.\n\nStep 3: For x > 0:\nx² + x − 1 = 0  →  x = (−1 + √5) / 2 = (√5 − 1) / 2.\nHence, h = (√5 − 1) R / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3170, // Q9
    similar_question: {
      question: "A projectile is launched vertically upwards from the surface of a planet of radius R with an initial speed v = v_e / 3, where v_e is the escape velocity from the planet. What is the maximum height h attained by the projectile above the planet's surface?",
      option_a: "R / 8",
      option_b: "R / 4",
      option_c: "R / 3",
      option_d: "R / 2",
      correct_option: "A",
      explanation: "Step 1: The escape velocity is v_e = √(2 G M / R).\nGiven initial speed v = v_e / 3, so v² = v_e² / 9 = (2 G M) / (9 R).\n\nStep 2: Apply conservation of mechanical energy between the surface (r = R) and maximum height (r = R + h, where v = 0):\n(1/2) m v² − G M m / R = 0 − G M m / (R + h).\n\nStep 3: Divide by m and substitute v²:\n(1/2) [ 2 G M / (9 R) ] − G M / R = − G M / (R + h)\n(1/9 − 1) / R = − 1 / (R + h)  →  − 8 / (9 R) = − 1 / (R + h).\n\nStep 4: Solve for h:\nR + h = 9 R / 8  →  h = R / 8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3171, // Q10
    similar_question: {
      question: "A planet of mass m moves in an elliptical orbit around the Sun. At perihelion, its distance from the Sun is r_p and its speed is v_p. At aphelion, its distance from the Sun is r_a. What is the planet's speed v_a at aphelion?",
      option_a: "v_p (r_p / r_a)",
      option_b: "v_p (r_a / r_p)",
      option_c: "v_p (r_p / r_a)²",
      option_d: "v_p √(r_p / r_a)",
      correct_option: "A",
      explanation: "Step 1: In central gravitational field motion, no external torque acts on the planet about the Sun: τ⃗ = 0.\n\nStep 2: Angular momentum is conserved:\nL = m v_p r_p = m v_a r_a.\n\nStep 3: Solve for v_a:\nv_a = v_p (r_p / r_a).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3172, // Q11
    similar_question: {
      question: "A communications satellite moves in a circular orbit around the Earth. The gravitational force exerted by the Earth on the satellite is F. What is the net resultant force acting on the satellite?",
      option_a: "F directed toward the centre of the Earth",
      option_b: "Zero",
      option_c: "2 F",
      option_d: "F / √2",
      correct_option: "A",
      explanation: "Step 1: The only real force acting on the orbiting satellite in an inertial reference frame is the gravitational force F exerted by the Earth.\n\nStep 2: The term 'centripetal force' is simply the name given to whichever net real force points toward the centre of curvature to maintain circular motion.\n\nStep 3: Therefore, the gravitational force is itself the centripetal force; they are not two separate opposing forces. The net force is F directed toward the Earth's centre.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3173, // Q12
    similar_question: {
      question: "Two stationary masses M and 9M are separated by a distance d. At what point along the line connecting them does the net gravitational field vanish, and what is the gravitational potential at that point?",
      option_a: "−16 G M / d",
      option_b: "−12 G M / d",
      option_c: "−9 G M / d",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Let the null point be at distance x from mass M and (d − x) from mass 9M.\nEquating gravitational fields:\nG M / x² = G (9M) / (d − x)²  →  1 / x = 3 / (d − x)  →  d − x = 3x  →  x = d / 4.\n\nStep 2: The distance from 9M is d − x = 3d / 4.\n\nStep 3: Gravitational potential at this point is:\nV = − G M / x − G (9M) / (d − x) = − G M / (d / 4) − 9 G M / (3d / 4)\nV = − 4 G M / d − 12 G M / d = − 16 G M / d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3174, // Q13
    similar_question: {
      question: "How does the escape velocity v_e of a projectile from the surface of a planet depend on the mass m of the projectile?",
      option_a: "v_e ∝ m⁰ (independent of projectile mass)",
      option_b: "v_e ∝ m¹",
      option_c: "v_e ∝ m^(1/2)",
      option_d: "v_e ∝ m⁻¹",
      correct_option: "A",
      explanation: "Step 1: Escape velocity is derived from energy conservation: (1/2) m v_e² = G M m / R.\n\nStep 2: The mass of the projectile m cancels from both sides:\nv_e = √(2 G M / R).\n\nStep 3: Hence, the escape speed is completely independent of the projectile's mass m (v_e ∝ m⁰).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3175, // Q14
    similar_question: {
      question: "The constancy of the orbital plane and the areal velocity of planets revolving around the Sun in the solar system demonstrates the conservation of:",
      option_a: "Angular momentum",
      option_b: "Linear momentum",
      option_c: "Kinetic energy",
      option_d: "Mechanical force",
      correct_option: "A",
      explanation: "Step 1: Gravitational attraction acts along the position vector connecting the Sun to the planet.\n\nStep 2: The cross product r⃗ × F⃗ = 0⃗, so torque τ⃗ = 0.\n\nStep 3: Zero net torque guarantees that both the direction and magnitude of the angular momentum vector L⃗ are strictly conserved, which keeps the orbit in a fixed plane with constant areal velocity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3176, // Q15
    similar_question: {
      question: "A particle of mass m is moved from point P to point Q in the static gravitational field of a fixed point mass M along three distinct paths A, B, and C. If W_A, W_B, and W_C represent the respective work done by gravity, then:",
      option_a: "W_A = W_B = W_C",
      option_b: "W_A > W_B > W_C",
      option_c: "W_A < W_B < W_C",
      option_d: "W_A = 0, W_B ≠ W_C",
      correct_option: "A",
      explanation: "Step 1: The gravitational force is a conservative vector field: ∇ × F⃗ = 0.\n\nStep 2: For any conservative field, the work done in moving a mass between two endpoints depends solely on the initial and final positions, and is completely path-independent.\n\nStep 3: Hence, W_A = W_B = W_C = −ΔU.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3177, // Q16
    similar_question: {
      question: "What is the increase in gravitational potential energy of an object of mass m when it is raised from the Earth's surface to a height h = 2R above the surface? (g is the acceleration due to gravity on the Earth's surface and R is the Earth's radius)",
      option_a: "(2/3) m g R",
      option_b: "(1/2) m g R",
      option_c: "2 m g R",
      option_d: "(1/3) m g R",
      correct_option: "A",
      explanation: "Step 1: Change in potential energy is given by:\nΔU = U(R + h) − U(R) = − G M m / (R + h) − (− G M m / R) = G M m [ 1/R − 1/(R + h) ].\n\nStep 2: Rewrite in terms of g = G M / R²:\nΔU = m g h / (1 + h / R).\n\nStep 3: Substitute h = 2R:\nΔU = m g (2R) / (1 + 2R / R) = 2 m g R / 3 = (2/3) m g R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3178, // Q17
    similar_question: {
      question: "At what height h above the Earth's surface does the acceleration due to gravity reduce to g / 9? (R is the radius of the Earth)",
      option_a: "2 R",
      option_b: "3 R",
      option_c: "8 R",
      option_d: "R / 3",
      correct_option: "A",
      explanation: "Step 1: The formula for acceleration due to gravity at height h is:\ng_h = g / (1 + h / R)².\n\nStep 2: Given g_h = g / 9:\ng / 9 = g / (1 + h / R)²  →  (1 + h / R)² = 9.\n\nStep 3: Taking the square root:\n1 + h / R = 3  →  h / R = 2  →  h = 2 R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3179, // Q18
    similar_question: {
      question: "For a satellite in a circular orbit of radius r around the Earth, what is the ratio of its kinetic energy (K) to the magnitude of its gravitational potential energy (|U|)?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: Orbital speed is v = √(G M / r), so kinetic energy is K = (1/2) m v² = G M m / (2r).\n\nStep 2: Gravitational potential energy is U = − G M m / r, so its magnitude is |U| = G M m / r.\n\nStep 3: The ratio of K to |U| is:\nK / |U| = [ G M m / (2r) ] / [ G M m / r ] = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3180, // Q19
    similar_question: {
      question: "What is the gravitational field intensity at any interior point inside a uniform thin spherical shell of mass M and radius R?",
      option_a: "Zero everywhere inside",
      option_b: "G M / R²",
      option_c: "G M / (2 R²)",
      option_d: "Variable, increasing toward the centre",
      correct_option: "A",
      explanation: "Step 1: By Newton's shell theorem, the gravitational force exerted by a uniform spherical shell on a point mass anywhere inside it is identically zero.\n\nStep 2: Since force is zero, the gravitational field intensity E⃗ = F⃗ / m = 0⃗ at all points inside the shell.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3181, // Q20
    similar_question: {
      question: "In an elliptical planetary orbit around the Sun, at which point is the orbital linear speed of the planet maximum?",
      option_a: "At perihelion (closest approach to the Sun)",
      option_b: "At aphelion (farthest point from the Sun)",
      option_c: "At the ends of the minor axis",
      option_d: "The speed remains strictly constant everywhere along the ellipse",
      correct_option: "A",
      explanation: "Step 1: By conservation of angular momentum: L = m v r sin θ = constant.\n\nStep 2: At perihelion and aphelion, the velocity is perpendicular to the radius vector (sin θ = 1), so v = L / (m r).\n\nStep 3: Because perihelion corresponds to the minimum distance r_min, the speed v achieves its maximum value at perihelion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3182, // Q21
    similar_question: {
      question: "The escape velocity from the Earth's surface is v_e. A projectile is launched from the Earth with a speed of 3 v_e. With what speed will it travel in interstellar space far away from Earth's gravity?",
      option_a: "2√2 v_e",
      option_b: "√8 v_e / 2",
      option_c: "3 v_e",
      option_d: "2 v_e",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy, (1/2) m v² − (1/2) m v_e² = (1/2) m v_∞².\n\nStep 2: Rearranging gives the hyperbolic excess speed:\nv_∞ = √(v² − v_e²).\n\nStep 3: Given v = 3 v_e:\nv_∞ = √[ (3 v_e)² − v_e² ] = √(9 v_e² − v_e²) = √(8 v_e²) = 2√2 v_e.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3183, // Q22
    similar_question: {
      question: "If the radius of the Earth were tripled while keeping its mean density constant, what would be the new acceleration due to gravity on its surface? (Assume initial g = 9.8 m/s²)",
      option_a: "29.4 m/s²",
      option_b: "19.6 m/s²",
      option_c: "9.8 m/s²",
      option_d: "88.2 m/s²",
      correct_option: "A",
      explanation: "Step 1: Acceleration due to gravity in terms of density ρ and radius R is:\ng = G M / R² = G [ (4/3) π R³ ρ ] / R² = (4/3) π G ρ R.\n\nStep 2: Since density ρ is constant, g is directly proportional to radius R: g ∝ R.\n\nStep 3: If radius becomes 3R, the new surface gravity is:\ng' = 3 g = 3 × 9.8 m/s² = 29.4 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3184, // Q23
    similar_question: {
      question: "The acceleration due to gravity on the surface of a spherical planet is 4 times that of Earth, and its radius is 9 times that of Earth. If the escape velocity from Earth is v, what is the escape velocity from this planet?",
      option_a: "6 v",
      option_b: "36 v",
      option_c: "12 v",
      option_d: "3 v",
      correct_option: "A",
      explanation: "Step 1: The escape velocity from a spherical body is given by v_e = √(2 g R).\n\nStep 2: For the planet, g_p = 4 g and R_p = 9 R.\n\nStep 3: Substitute into the formula:\nv_e' = √[ 2 (4 g) (9 R) ] = √(36 × 2 g R) = 6 √(2 g R) = 6 v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3185, // Q24
    similar_question: {
      question: "Two spherical planets have their radii in the ratio 2 : 1 and their mean densities in the ratio 1 : 3. What is the ratio of the acceleration due to gravity on the surfaces of these planets?",
      option_a: "2 : 3",
      option_b: "3 : 2",
      option_c: "1 : 6",
      option_d: "6 : 1",
      correct_option: "A",
      explanation: "Step 1: The acceleration due to gravity at the surface of a uniform spherical planet is:\ng = (4/3) π G ρ R  →  g ∝ ρ R.\n\nStep 2: Therefore, the ratio of accelerations due to gravity is:\ng₁ / g₂ = (ρ₁ / ρ₂) × (R₁ / R₂).\n\nStep 3: Given ρ₁ / ρ₂ = 1 / 3 and R₁ / R₂ = 2 / 1:\ng₁ / g₂ = (1 / 3) × (2 / 1) = 2 / 3 = 2 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3186, // Q25
    similar_question: {
      question: "At what height h above the Earth's surface does the acceleration due to gravity become g / 2? (R is the radius of the Earth)",
      option_a: "(√2 − 1) R",
      option_b: "(√2 + 1) R",
      option_c: "R / 2",
      option_d: "2 R",
      correct_option: "A",
      explanation: "Step 1: Formula for gravity at height h: g_h = g / (1 + h / R)².\n\nStep 2: Given g_h = g / 2:\ng / 2 = g / (1 + h / R)²  →  (1 + h / R)² = 2.\n\nStep 3: Taking the square root:\n1 + h / R = √2  →  h / R = √2 − 1  →  h = (√2 − 1) R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3187, // Q26
    similar_question: {
      question: "By what factor must the orbital speed of a satellite in a circular orbit around the Earth be increased so that it escapes completely from the Earth's gravitational pull?",
      option_a: "√2 (an increase of about 41.4%)",
      option_b: "2 (an increase of 100%)",
      option_c: "√3",
      option_d: "1 / √2",
      correct_option: "A",
      explanation: "Step 1: The orbital speed in a circular orbit of radius r is v_0 = √(G M / r).\n\nStep 2: The escape velocity from the same orbital radius is v_e = √(2 G M / r).\n\nStep 3: The ratio of escape speed to orbital speed is:\nv_e / v_0 = √(2 G M / r) / √(G M / r) = √2.\nHence, the speed must increase by a factor of √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3188, // Q27
    similar_question: {
      question: "Which of the following fundamental properties correctly characterizes the gravitational force?",
      option_a: "It is an attractive, central, and conservative force obeying an inverse-square law",
      option_b: "It is non-conservative and depends on the medium between the masses",
      option_c: "It is repulsive at very short distances and attractive at long distances",
      option_d: "It can be easily shielded by high-density materials",
      correct_option: "A",
      explanation: "Step 1: Gravitational force is strictly attractive, directed along the line joining two masses (central), and obeys Newton's inverse-square law F = G m₁ m₂ / r².\n\nStep 2: The work done by gravitational force around any closed loop is zero (∮ F⃗ · dr⃗ = 0), making it conservative.\n\nStep 3: It does not depend on the intervening medium and cannot be shielded.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3189, // Q28
    similar_question: {
      question: "If the radius of the Earth were to contract by 2% while its total mass remained strictly constant, how would the acceleration due to gravity on the Earth's surface change?",
      option_a: "Increase by approximately 4%",
      option_b: "Decrease by approximately 4%",
      option_c: "Increase by approximately 2%",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "Step 1: Surface gravity is given by g = G M / R² = G M R⁻².\n\nStep 2: For small fractional changes with mass M constant:\nΔg / g = − 2 (ΔR / R).\n\nStep 3: Given that radius contracts by 2% (ΔR / R = −2% = −0.02):\nΔg / g = − 2 (−0.02) = +0.04 = +4%.\nThus, surface gravity increases by approximately 4%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3190, // Q29
    similar_question: {
      question: "The orbital period of a satellite revolving in a circular orbit around a planet depends on:",
      option_a: "The mass of the planet and orbital radius, but is independent of the mass of the satellite",
      option_b: "The mass of the satellite and orbital radius only",
      option_c: "The mass of the satellite only",
      option_d: "Neither the mass of the planet nor the orbital radius",
      correct_option: "A",
      explanation: "Step 1: The orbital period of a circular orbit of radius r is given by Kepler's third law:\nT = 2π √[ r³ / (G M) ], where M is the mass of the central planet.\n\nStep 2: The mass of the satellite m cancels when equating gravitational force to centripetal force: m v² / r = G M m / r².\n\nStep 3: Therefore, the orbital period T is strictly independent of the satellite's mass.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3191, // Q30
    similar_question: {
      question: "A satellite orbits close to the surface of the Earth (radius R) with orbital speed v₀. What is the orbital speed of another satellite revolving at an altitude h = 8R above the surface?",
      option_a: "v₀ / 3",
      option_b: "v₀ / 9",
      option_c: "v₀ / 2",
      option_d: "3 v₀",
      correct_option: "A",
      explanation: "Step 1: The orbital speed at distance r from the Earth's centre is v = √(G M / r).\n\nStep 2: Near the surface (r₁ ≈ R), v₁ = v₀ = √(G M / R).\n\nStep 3: At height h = 8R, the orbital radius is r₂ = R + 8R = 9R.\n\nStep 4: Compute the new orbital speed:\nv₂ = √[ G M / (9R) ] = (1/3) √(G M / R) = v₀ / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3192, // Q31
    similar_question: {
      question: "A satellite of mass m moves in a stable circular orbit of radius r around a planet of mass M. How does its kinetic energy K depend on the orbital radius r?",
      option_a: "K ∝ 1 / r",
      option_b: "K ∝ 1 / √r",
      option_c: "K ∝ r",
      option_d: "K ∝ 1 / r²",
      correct_option: "A",
      explanation: "Step 1: The orbital velocity of the satellite is v = √(G M / r).\n\nStep 2: The kinetic energy of the satellite is:\nK = (1/2) m v² = (1/2) m (G M / r) = G M m / (2r).\n\nStep 3: Thus, kinetic energy is inversely proportional to the orbital radius: K ∝ 1 / r.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3193, // Q32
    similar_question: {
      question: "The period of revolution of a low-altitude satellite orbiting close to the surface of a spherical planet of radius R and uniform density ρ is T. If another planet has radius 2R but the exact same mean density ρ, what is the orbital period of a low-altitude satellite orbiting it?",
      option_a: "T",
      option_b: "2 T",
      option_c: "4 T",
      option_d: "T / 2",
      correct_option: "A",
      explanation: "Step 1: For a satellite orbiting just above the surface of a planet of radius R:\nT = 2π √[ R³ / (G M) ].\n\nStep 2: Substitute M = (4/3) π R³ ρ:\nT = 2π √[ R³ / (G × (4/3) π R³ ρ) ] = 2π √[ 3 / (4π G ρ) ] = √[ 3π / (G ρ) ].\n\nStep 3: Notice that the radius R cancels completely! The period of a surface satellite depends solely on the mean density ρ of the planet, so it remains T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3194, // Q33
    similar_question: {
      question: "Which fundamental conservation law directly accounts for Kepler's second law (the radius vector sweeps equal areas in equal intervals of time)?",
      option_a: "Law of conservation of angular momentum",
      option_b: "Law of conservation of linear momentum",
      option_c: "Law of conservation of mechanical energy",
      option_d: "Law of conservation of mass",
      correct_option: "A",
      explanation: "Step 1: The gravitational attraction is a central force pointing directly toward the Sun, giving zero torque: τ = r F sin 180° = 0.\n\nStep 2: By Newton's second law for rotation, dL/dt = τ = 0, so angular momentum L is constant.\n\nStep 3: The areal velocity is dA / dt = L / (2m) = constant, proving Kepler's second law.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3195, // Q34
    similar_question: {
      question: "The acceleration due to gravity on the Earth's surface (radius R) is g. What is the acceleration due to the Earth's gravity at an altitude of 3R above the Earth's surface?",
      option_a: "g / 16",
      option_b: "g / 9",
      option_c: "g / 4",
      option_d: "g / 3",
      correct_option: "A",
      explanation: "Step 1: Acceleration due to gravity at distance r from the Earth's centre is g(r) = G M / r².\n\nStep 2: At an altitude h = 3R, the distance from the centre of the Earth is r = R + 3R = 4R.\n\nStep 3: Evaluate gravity at this distance:\ng_h = G M / (4R)² = G M / (16 R²) = g / 16.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3196, // Q35
    similar_question: {
      question: "The escape velocity from the surface of the Earth is 11.2 km/s. If the mass of a planet is 8 times the mass of the Earth and its radius is double that of the Earth, what is the escape velocity from this planet?",
      option_a: "22.4 km/s",
      option_b: "11.2 km/s",
      option_c: "44.8 km/s",
      option_d: "5.6 km/s",
      correct_option: "A",
      explanation: "Step 1: The escape velocity formula is v_e = √(2 G M / R).\n\nStep 2: For the given planet: M_p = 8 M_e and R_p = 2 R_e.\n\nStep 3: Substitute into the formula:\nv_e' = √[ 2 G (8 M_e) / (2 R_e) ] = √4 × √(2 G M_e / R_e) = 2 v_e.\n\nStep 4: Compute value:\nv_e' = 2 × 11.2 km/s = 22.4 km/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3197, // Q36
    similar_question: {
      question: "A geostationary satellite orbits the Earth at an orbital radius of 7R (orbital period = 24 hours). What is the orbital period of another satellite whose circular orbit has a radius of (7 / 4) R?",
      option_a: "3 hours",
      option_b: "6 hours",
      option_c: "12 hours",
      option_d: "1.5 hours",
      correct_option: "A",
      explanation: "Step 1: According to Kepler's third law: T² ∝ r³  →  T₂ / T₁ = (r₂ / r₁)^(3/2).\n\nStep 2: Given T₁ = 24 hours, r₁ = 7R, and r₂ = (7 / 4) R:\nr₂ / r₁ = [(7/4) R] / (7R) = 1 / 4.\n\nStep 3: Compute T₂:\nT₂ = 24 × (1/4)^(3/2) = 24 × (1/2)³ = 24 / 8 = 3 hours.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3198, // Q37
    similar_question: {
      question: "What is the correct mathematical expression for the escape velocity from the surface of a uniform spherical planet of mass M and radius R?",
      option_a: "√(2 G M / R)",
      option_b: "√(G M / R)",
      option_c: "√(2 G M / R²)",
      option_d: "2 √(G M / R)",
      correct_option: "A",
      explanation: "Step 1: Escape velocity is the minimum launch speed required for a projectile to reach infinity with zero kinetic energy.\n\nStep 2: Conserving mechanical energy:\n(1/2) m v_e² − G M m / R = 0.\n\nStep 3: Solving for v_e:\nv_e² = 2 G M / R  →  v_e = √(2 G M / R).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3199, // Q38
    similar_question: {
      question: "Taking the gravitational potential to be zero at infinity, what is the gravitational potential at the surface of the Earth? (M = mass of Earth, R = radius of Earth, g = acceleration due to gravity at surface)",
      option_a: "− g R",
      option_b: "+ g R",
      option_c: "− g R / 2",
      option_d: "− 2 g R",
      correct_option: "A",
      explanation: "Step 1: By definition, the gravitational potential at distance r ≥ R from the centre of the Earth is V = − G M / r.\n\nStep 2: At the surface (r = R), V_surface = − G M / R.\n\nStep 3: Since surface acceleration due to gravity is g = G M / R², we have G M = g R².\nSubstituting this gives V_surface = − (g R²) / R = − g R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3200, // Q39
    similar_question: {
      question: "A spherical planet in deep space has mass M₀ and diameter D₀. What is the acceleration due to gravity on the surface of this planet?",
      option_a: "4 G M₀ / D₀²",
      option_b: "G M₀ / D₀²",
      option_c: "2 G M₀ / D₀²",
      option_d: "8 G M₀ / D₀²",
      correct_option: "A",
      explanation: "Step 1: The radius of the planet is related to its diameter by R = D₀ / 2.\n\nStep 2: The surface gravity formula is g = G M₀ / R².\n\nStep 3: Substitute R = D₀ / 2:\ng = G M₀ / (D₀ / 2)² = G M₀ / (D₀² / 4) = 4 G M₀ / D₀².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3201, // Q40
    similar_question: {
      question: "Johannes Kepler formulated three fundamental laws that revolutionized astronomy. These laws describe:",
      option_a: "Planetary motion in the solar system",
      option_b: "Hydrodynamic buoyancy of floating bodies",
      option_c: "Electrostatic attraction between charged particles",
      option_d: "Thermodynamic heat engines",
      correct_option: "A",
      explanation: "Step 1: Johannes Kepler published his three laws of planetary motion based on Tycho Brahe's observational data.\n\nStep 2: The laws are: (1) Law of Orbits (ellipses), (2) Law of Areas (areal velocity conservation), and (3) Law of Periods (T² ∝ a³).\n\nStep 3: Hence, Kepler discovered the empirical laws governing planetary motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3202, // Q41
    similar_question: {
      question: "If g is the acceleration due to gravity at the Earth's surface and g_h is the acceleration due to gravity at height h above the Earth's surface, what is the exact ratio g / g_h?",
      option_a: "(1 + h / R)²",
      option_b: "(1 − h / R)²",
      option_c: "(1 + R / h)²",
      option_d: "1 + (h / R)²",
      correct_option: "A",
      explanation: "Step 1: Acceleration due to gravity at the surface is g = G M / R².\n\nStep 2: At height h above the surface, g_h = G M / (R + h)².\n\nStep 3: Divide g by g_h:\ng / g_h = [ G M / R² ] / [ G M / (R + h)² ] = (R + h)² / R² = [ (R + h) / R ]² = (1 + h / R)².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3203, // Q42
    similar_question: {
      question: "For a planet in an orbit of instantaneous radius r moving with angular velocity ω about the Sun, what is the relationship for its areal velocity dA / dt?",
      option_a: "dA / dt ∝ ω r²",
      option_b: "dA / dt ∝ ω² r",
      option_c: "dA / dt ∝ ω r",
      option_d: "dA / dt ∝ √(ω r)",
      correct_option: "A",
      explanation: "Step 1: In an infinitesimal time dt, the planet sweeps out a sector of area dA = (1/2) r² dθ.\n\nStep 2: Dividing by dt gives the areal velocity:\ndA / dt = (1/2) r² (dθ / dt) = (1/2) r² ω.\n\nStep 3: Therefore, the areal velocity is directly proportional to ω r²: dA / dt ∝ ω r².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3204, // Q43
    similar_question: {
      question: "The Earth retains its atmosphere primarily because:",
      option_a: "The thermal root-mean-square (rms) speed of atmospheric gas molecules is much less than the Earth's escape velocity",
      option_b: "The ozone layer reflects all gas molecules back toward the surface",
      option_c: "The atmospheric magnetic field prevents molecules from escaping",
      option_d: "Solar radiation continuously exerts a downward pressure on gas molecules",
      correct_option: "A",
      explanation: "Step 1: For gas molecules to escape a planet permanently, their rms speed v_rms = √(3 k_B T / m) must exceed or approach the planet's escape velocity v_e.\n\nStep 2: At typical Earth temperatures, the rms speeds of oxygen and nitrogen are around 0.5 km/s, whereas Earth's escape velocity is 11.2 km/s.\n\nStep 3: Since v_rms ≪ v_e, the gravitational force successfully binds the atmosphere to the Earth.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3205, // Q44
    similar_question: {
      question: "A point particle of mass m is located at a distance R / 3 from the centre of a uniform thin spherical shell of mass M and radius R. What is the net gravitational force exerted by the shell on the particle?",
      option_a: "Zero",
      option_b: "G M m / (9 R²)",
      option_c: "G M m / R²",
      option_d: "3 G M m / R²",
      correct_option: "A",
      explanation: "Step 1: Newton's shell theorem states that the gravitational field inside any uniform spherical shell is zero at all interior points.\n\nStep 2: Since the point r = R / 3 is inside the shell (r < R), the gravitational field intensity is E = 0.\n\nStep 3: The force on the particle is F = m E = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3206, // Q45
    similar_question: {
      question: "Let g_h be the acceleration due to gravity at a height h above the Earth's surface and g_d be the acceleration due to gravity at depth d = h below the surface. If h ≪ R, what is the ratio of the fractional decrease in gravity at height h to that at depth d?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "1 : 1",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: For small height h ≪ R:\ng_h ≈ g (1 − 2h / R)  →  Δg_h / g = 2h / R.\n\nStep 2: For depth d = h:\ng_d = g (1 − d / R) = g (1 − h / R)  →  Δg_d / g = h / R.\n\nStep 3: Taking the ratio of the fractional decreases:\n(Δg_h / g) / (Δg_d / g) = (2h / R) / (h / R) = 2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3207, // Q46
    similar_question: {
      question: "An object is weighed at the bottom of a deep mine (W_mine), at sea level on the Earth's surface (W_sea), and at the peak of a high mountain (W_peak). Which relationship correctly ranks these weights?",
      option_a: "W_mine < W_sea > W_peak",
      option_b: "W_mine > W_sea > W_peak",
      option_c: "W_mine = W_sea = W_peak",
      option_d: "W_mine < W_sea < W_peak",
      correct_option: "A",
      explanation: "Step 1: Weight is W = m g, so it directly tracks the local value of acceleration due to gravity g.\n\nStep 2: On the surface (sea level), g is at a relative maximum compared to points above and below the surface.\n\nStep 3: Moving into a mine (below the surface), g_d = g (1 − d / R) < g.\nMoving up a mountain (above the surface), g_h = g / (1 + h / R)² < g.\n\nStep 4: Therefore, W_sea is greater than both W_mine and W_peak, so W_mine < W_sea > W_peak.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3208, // Q47
    similar_question: {
      question: "The escape velocity from the surface of the Earth is 11.2 km/s. What would be the escape velocity from a planet having 3 times the radius of Earth and the same mean density?",
      option_a: "33.6 km/s",
      option_b: "11.2 km/s",
      option_c: "22.4 km/s",
      option_d: "19.4 km/s",
      correct_option: "A",
      explanation: "Step 1: Escape velocity in terms of mean density ρ and radius R is:\nv_e = √(2 G M / R) = √[ 2 G (4/3 π R³ ρ) / R ] = R √[ 8π G ρ / 3 ].\n\nStep 2: For constant density ρ, escape velocity is directly proportional to radius: v_e ∝ R.\n\nStep 3: Since the planet has 3 times the radius of Earth (R' = 3 R):\nv_e' = 3 v_e = 3 × 11.2 km/s = 33.6 km/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3209, // Q48
    similar_question: {
      question: "If the mean density of a planet is 9 times that of Earth and its radius is 1/3 of the Earth's radius, how does the weight of an object on this planet compare to its weight on Earth?",
      option_a: "It will be 3 times its weight on Earth",
      option_b: "It will be 9 times its weight on Earth",
      option_c: "It will be equal to its weight on Earth",
      option_d: "It will be 1/3 of its weight on Earth",
      correct_option: "A",
      explanation: "Step 1: Acceleration due to gravity in terms of density and radius is:\ng = (4/3) π G ρ R  →  g ∝ ρ R.\n\nStep 2: Ratio of surface gravity:\ng_planet / g_earth = (ρ_planet / ρ_earth) × (R_planet / R_earth).\n\nStep 3: Given ρ_planet = 9 ρ_earth and R_planet = R_earth / 3:\ng_planet / g_earth = 9 × (1/3) = 3.\nHence, weight on the planet will be 3 times that on Earth.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3210, // Q49
    similar_question: {
      question: "At what height h above the Earth's surface (radius R) does the acceleration due to gravity become g / 16?",
      option_a: "3 R",
      option_b: "4 R",
      option_c: "15 R",
      option_d: "R / 4",
      correct_option: "A",
      explanation: "Step 1: Formula for acceleration due to gravity at height h: g_h = g / (1 + h / R)².\n\nStep 2: Given g_h = g / 16:\ng / 16 = g / (1 + h / R)²  →  (1 + h / R)² = 16.\n\nStep 3: Taking the square root:\n1 + h / R = 4  →  h / R = 3  →  h = 3 R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3211, // Q50
    similar_question: {
      question: "The escape velocity for a projectile launched vertically upwards from the Earth's surface is 11.2 km/s. If the projectile is instead launched at an angle of 30° to the horizontal, what is the escape velocity?",
      option_a: "11.2 km/s",
      option_b: "11.2 / cos 30° km/s",
      option_c: "11.2 × sin 30° km/s",
      option_d: "22.4 km/s",
      correct_option: "A",
      explanation: "Step 1: Escape velocity depends solely on the initial gravitational potential energy at the launch position and the condition that total mechanical energy E ≥ 0.\n\nStep 2: Kinetic energy K = (1/2) m v² is a scalar quantity depending only on speed v, completely independent of the launch direction angle.\n\nStep 3: Therefore, the minimum launch speed required to escape the Earth is 11.2 km/s regardless of the launch angle (provided it does not intersect the Earth).\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 9 Part 1 (${set9Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set9Part1Updates) {
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
        console.log(`[${successCount}/${set9Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 9 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
