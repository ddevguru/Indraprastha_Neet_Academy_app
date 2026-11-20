module.exports = [
  {
    id: 963,
    originalQuestion: {
      question: "The electric field at the centre O of a semicircle of radius a having linear charge density λ is given by: [AIPMT 2000]",
      option_a: "2λ/(ε₀a)",
      option_b: "λπ/(ε₀a)",
      option_c: "λ/(2πε₀a)",
      option_d: "λ/(πε₀a)",
      correct_option: "C",
      explanation: "Consider a uniformly charged semicircular ring of radius a with uniform linear charge density λ.\nBy symmetry, the horizontal components of the electric field from symmetrically placed charge elements (dq = λ · a · dθ) cancel each other out.\nThe net electric field at the centre of curvature O is directed entirely along the axis of symmetry:\nE = ∫ (−π/2 to +π/2) (1 / (4πε₀a²)) · cos θ · (λ a dθ)\nE = (λ / (4πε₀a)) · ∫ (−π/2 to +π/2) cos θ dθ\nE = (λ / (4πε₀a)) · [sin(π/2) − sin(−π/2)] = (λ / (4πε₀a)) · [1 − (−1)] = (2λ) / (4πε₀a) = λ / (2πε₀a)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the electric field at the centre of curvature of a quarter-circular ring of radius R carrying a uniform linear charge density λ?",
      option_a: "√2λ / (4πε₀R)",
      option_b: "λ / (2πε₀R)",
      option_c: "2λ / (4πε₀R)",
      option_d: "λ / (4πε₀R)",
      correct_option: "A",
      explanation: "For a quarter circle of radius R, the electric field components along the x and y axes are each:\nE_x = E_y = λ / (4πε₀R)\nThe magnitude of the net field is:\nE_net = √(E_x² + E_y²) = √2 · [λ / (4πε₀R)]\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 962,
    originalQuestion: {
      question: "A charge Q is situated at the corner of a cube. The electric flux passing through all six faces of the cube is: [AIPMT 2000]",
      option_a: "Q/(6ε₀)",
      option_b: "Q/(8ε₀)",
      option_c: "Q/ε₀",
      option_d: "Q/(2ε₀)",
      correct_option: "B",
      explanation: "A point charge situated at the corner of a cube is symmetrically shared by 8 identical cubes sharing that common vertex.\nAccording to Gauss's law, the total electric flux emanating symmetrically from charge Q into all of space is Q / ε₀.\nTherefore, the fraction of the total flux enclosed by and passing through one such cube is:\nΦ_cube = (1/8) · (Q / ε₀) = Q / (8ε₀)\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A point charge q is placed at the corner of a cube of edge length a. What is the electric flux passing through each of the three faces that do not meet at that corner?",
      option_a: "q / (24ε₀)",
      option_b: "q / (8ε₀)",
      option_c: "q / (6ε₀)",
      option_d: "q / (12ε₀)",
      correct_option: "A",
      explanation: "Of the 6 faces of the cube, the 3 faces adjacent to the corner lie parallel to the electric field vectors (E⃗ · dA⃗ = 0), so zero flux passes through them.\nThe remaining total flux passing through the cube, q / (8ε₀), is distributed equally and symmetrically among the 3 opposite faces.\nThus, the flux through each of these three faces is [q / (8ε₀)] / 3 = q / (24ε₀).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 961,
    originalQuestion: {
      question: "A charge Q μC is placed at the centre of a cube. The flux coming out from each face will be: [AIPMT 2001]",
      option_a: "[Q/(6ε₀)] × 10⁻⁶",
      option_b: "[Q/(6ε₀)] × 10⁻³",
      option_c: "Q/(24ε₀)",
      option_d: "Q/(8ε₀)",
      correct_option: "A",
      explanation: "According to Gauss's law, the total electric flux emerging from any closed Gaussian surface enclosing a net charge q_enclosed is:\nΦ_total = q_enclosed / ε₀\nHere, the charge is Q μC = Q × 10⁻⁶ C placed symmetrically at the centre of a cube.\nA cube possesses 6 identical planar faces.\nBy symmetry, the electric flux is divided equally among all 6 faces:\nΦ_face = (1/6) · Φ_total = [Q / (6ε₀)] × 10⁻⁶ N m² C⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If a charge of 3 μC is placed at the centre of a cube, what is the total electric flux emerging from all six faces combined?",
      option_a: "(3 × 10⁻⁶) / ε₀",
      option_b: "(0.5 × 10⁻⁶) / ε₀",
      option_c: "(18 × 10⁻⁶) / ε₀",
      option_d: "(1 × 10⁻⁶) / ε₀",
      correct_option: "A",
      explanation: "By Gauss's law, the total electric flux emerging from the entire closed surface of the cube depends only on the total enclosed charge:\nΦ_total = q_in / ε₀ = (3 × 10⁻⁶) / ε₀ N m² C⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 960,
    originalQuestion: {
      question: "A dipole of dipole moment p⃗ is placed in a uniform electric field E⃗. The torque acting on it is given by: [AIPMT 2001]",
      option_a: "τ⃗ = p⃗ · E⃗",
      option_b: "τ⃗ = p⃗ × E⃗",
      option_c: "τ⃗ = p⃗ + E⃗",
      option_d: "τ⃗ = p⃗ − E⃗",
      correct_option: "B",
      explanation: "Consider an electric dipole consisting of charges +q and −q separated by a vector distance 2a⃗ (so that p⃗ = q · 2a⃗) placed in a uniform electric field E⃗:\n- The force on +q is F⃗₁ = +qE⃗\n- The force on −q is F⃗₂ = −qE⃗\nBecause the field is uniform, the net force is F⃗_net = F⃗₁ + F⃗₂ = 0.\nHowever, the two equal and opposite forces act along different lines of action, forming a couple that exerts a torque about the centre of the dipole:\nτ⃗ = (a⃗ × F⃗₁) + (−a⃗ × F⃗₂) = a⃗ × (qE⃗) + (−a⃗) × (−qE⃗) = 2a⃗ × (qE⃗) = (q · 2a⃗) × E⃗ = p⃗ × E⃗\nTherefore, the torque acting on the dipole is τ⃗ = p⃗ × E⃗.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "At what angle between the electric dipole moment vector p⃗ and a uniform electric field E⃗ does the dipole experience maximum torque?",
      option_a: "90°",
      option_b: "0°",
      option_c: "180°",
      option_d: "45°",
      correct_option: "A",
      explanation: "The magnitude of the torque on an electric dipole is given by τ = pE sin θ.\nTorque is maximized when sin θ = 1, which occurs at θ = 90° (when the dipole is perpendicular to the electric field).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 959,
    originalQuestion: {
      question: "Some charge is being given to a conductor. Then its potential is: [AIPMT 2002]",
      option_a: "Maximum at the surface",
      option_b: "Maximum at the centre",
      option_c: "Remains the same throughout the conductor",
      option_d: "Maximum somewhere between the surface and centre",
      correct_option: "C",
      explanation: "Under electrostatic equilibrium conditions, the electric field inside any charged conductor is identically zero everywhere (E⃗ = 0).\nThe relationship between electric field and potential gradient is:\nE = −dV / dr\nSince E = 0 throughout the interior of the conductor:\n−dV / dr = 0 ⇒ V = constant\nThis means that there is no potential difference between any two points inside or on the surface of the conductor.\nThus, the entire volume of the conductor is an equipotential region, and the potential remains exactly the same throughout the conductor from its centre to its surface.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A hollow spherical metal conductor of radius 0.2 m is charged to a surface potential of 100 V. What is the electric potential at a distance of 0.1 m from its centre?",
      option_a: "100 V",
      option_b: "50 V",
      option_c: "200 V",
      option_d: "0 V",
      correct_option: "A",
      explanation: "Inside a charged conducting sphere, the electric field is zero, meaning the electrostatic potential is constant and identical to the potential on its outer surface (V = 100 V).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 958,
    originalQuestion: {
      question: "Identical charges q are placed at each corner of a cube of side b. The electrostatic potential energy of a charge +q placed at the centre of the cube will be: [AIPMT 2002]",
      option_a: "−4√2q²/(πε₀b)",
      option_b: "−8√2q²/(πε₀b)",
      option_c: "4q²/(√3πε₀b)",
      option_d: "8√2q²/(4πε₀b)",
      correct_option: "C",
      explanation: "1. For a cube of side length b, the length of the body diagonal connecting opposite corners is:\nBody diagonal = √(b² + b² + b²) = b√3\n2. The distance from the centre of the cube to each of the 8 corners is half of the body diagonal:\nr = (b√3) / 2\n3. The electric potential (V) at the centre of the cube due to the 8 identical corner charges q is:\nV = 8 × [q / (4πε₀r)] = 8 × [q / (4πε₀ · (b√3 / 2))] = 8 × [2q / (4πε₀b√3)] = (16q) / (4πε₀b√3) = (4q) / (√3πε₀b)\n4. The electrostatic potential energy (U) of a charge +q placed at the centre is:\nU = q · V = q × [(4q) / (√3πε₀b)] = (4q²) / (√3πε₀b)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Four identical point charges +q are placed at the four corners of a square of side length a. What is the electric potential at the centre of the square?",
      option_a: "4√2q / (4πε₀a)",
      option_b: "2√2q / (4πε₀a)",
      option_c: "8q / (4πε₀a)",
      option_d: "√2q / (4πε₀a)",
      correct_option: "A",
      explanation: "The diagonal of the square is a√2, so the distance from the centre to each corner is r = a√2 / 2 = a / √2.\nThe potential at the centre due to all 4 charges is:\nV = 4 × [q / (4πε₀r)] = 4 × [q / (4πε₀ (a / √2))] = 4√2q / (4πε₀a).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 957,
    originalQuestion: {
      question: "A charge q is located at the centre of a cube. The electric flux through any face is: [AIPMT 2003]",
      option_a: "2πq/[6(4πε₀)]",
      option_b: "4πq/[6(4πε₀)]",
      option_c: "πq/[6(4πε₀)]",
      option_d: "q/[6(4πε₀)]",
      correct_option: "B",
      explanation: "According to Gauss's law, the total electric flux through the entire closed surface of the cube containing charge q is:\nΦ_total = q / ε₀\nMultiplying and dividing by 4π:\nΦ_total = (4πq) / (4πε₀)\nBecause the charge is situated symmetrically at the centre of the cube, the total flux divides equally among the 6 identical faces:\nΦ_face = Φ_total / 6 = (4πq) / [6 · (4πε₀)]\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If a charge q is located at the centre of a regular tetrahedron having 4 identical faces, what is the electric flux through any one face?",
      option_a: "q / (4ε₀)",
      option_b: "q / ε₀",
      option_c: "q / (6ε₀)",
      option_d: "q / (12ε₀)",
      correct_option: "A",
      explanation: "By Gauss's law, the total flux enclosed by the tetrahedron is q / ε₀.\nDue to symmetrical tetrahedral geometry, the flux through each of the 4 faces is (1/4) · (q / ε₀) = q / (4ε₀).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 956,
    originalQuestion: {
      question: "An electric dipole has the magnitude of its charge as q and its dipole moment is p. It is placed in a uniform electric field E. If its dipole moment is along the direction of the field, the force on it and its potential energy are, respectively: [AIPMT 2004]",
      option_a: "2qE and minimum",
      option_b: "qE and pE",
      option_c: "Zero and minimum",
      option_d: "qE and maximum",
      correct_option: "C",
      explanation: "1. Force on the dipole:\nIn a uniform electric field E⃗, the force on +q is +qE⃗ and on −q is −qE⃗.\nThe net electrostatic force is:\nF_net = +qE⃗ + (−qE⃗) = 0 (Zero net force).\n2. Potential energy of the dipole:\nThe potential energy of an electric dipole in an electric field is given by:\nU = −p⃗ · E⃗ = −pE cos θ\nWhen the dipole moment p⃗ is aligned along the direction of the field, θ = 0°:\nU = −pE cos(0°) = −pE\nThis represents the minimum possible potential energy (stable equilibrium state).\nThus, the force is zero and the potential energy is minimum.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "When an electric dipole of moment p is oriented antiparallel (θ = 180°) to a uniform electric field E, what are the net force on it and its potential energy?",
      option_a: "Force = zero, Potential energy = +pE (maximum, unstable equilibrium)",
      option_b: "Force = 2pE, Potential energy = zero",
      option_c: "Force = zero, Potential energy = −pE (minimum)",
      option_d: "Force = pE, Potential energy = zero",
      correct_option: "A",
      explanation: "In a uniform electric field, the net force is always zero.\nAt θ = 180°, U = −pE cos(180°) = −pE(−1) = +pE, which is the maximum potential energy corresponding to unstable equilibrium.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 955,
    originalQuestion: {
      question: "A bullet of mass 2 g is having a charge of 2 μC. Through what potential difference must it be accelerated, starting from rest, to acquire a speed of 10 m/s? [AIPMT 2004]",
      option_a: "5 kV",
      option_b: "50 kV",
      option_c: "5 V",
      option_d: "50 V",
      correct_option: "B",
      explanation: "By the work-energy theorem, the electrostatic work done by the accelerating potential difference V equals the kinetic energy gained by the bullet:\nq · V = (1/2) · m · v²\nGiven:\nMass m = 2 g = 2 × 10⁻³ kg\nSpeed v = 10 m/s\nCharge q = 2 μC = 2 × 10⁻⁶ C\nSubstituting the values:\n(2 × 10⁻⁶) · V = (1/2) × (2 × 10⁻³) × (10)²\n(2 × 10⁻⁶) · V = 10⁻³ × 100 = 10⁻¹ = 0.1 J\nV = 0.1 / (2 × 10⁻⁶) = (1 / 2) × 10⁵ = 50000 V = 50 kV\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A charged particle of mass 1.0 × 10⁻⁴ kg and charge 5.0 μC is accelerated from rest through a potential difference of 1000 V. What is its final speed?",
      option_a: "10 m/s",
      option_b: "5 m/s",
      option_c: "20 m/s",
      option_d: "1 m/s",
      correct_option: "A",
      explanation: "(1/2) m v² = q · V\n(1/2) · (1.0 × 10⁻⁴) · v² = (5.0 × 10⁻⁶) · 1000 = 5.0 × 10⁻³ J\nv² = (2 × 5.0 × 10⁻³) / (1.0 × 10⁻⁴) = 10⁻² / 10⁻⁴ = 100\nv = √100 = 10 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 954,
    originalQuestion: {
      question: "Two charges q₁ and q₂ are placed 30 cm apart, as shown in the figure. A third charge q₃ is moved along the arc of a circle of radius 40 cm from C to D. The change in the potential energy of the system is q₃k/(4πε₀), where k is: [AIPMT 2005]",
      option_a: "8q₁",
      option_b: "6q₁",
      option_c: "8q₂",
      option_d: "6q₂",
      correct_option: "C",
      explanation: "Let us examine the geometry and potential at points C and D:\n1. Charge q₁ is at the origin and the arc from C to D is a circular arc of radius 40 cm centred at q₁.\nSince every point on the arc is at the same distance (40 cm) from q₁, the potential due to q₁ is identical at C and D: V₁(C) = V₁(D).\nTherefore, moving q₃ along the arc causes no change in potential energy associated with q₁ (ΔU₁ = 0).\n2. Now consider the distance from q₂:\n- At initial point C: distance to q₂ is r_C = √(30² + 40²) = 50 cm = 0.5 m.\n- At final point D: distance to q₂ is r_D = 40 − 30 = 10 cm = 0.1 m.\n3. The change in potential at the location of q₃ due to q₂ is:\nΔV = V_D − V_C = [q₂ / (4πε₀)] · [(1 / r_D) − (1 / r_C)]\nΔV = [q₂ / (4πε₀)] · [(1 / 0.1) − (1 / 0.5)] = [q₂ / (4πε₀)] · [10 − 2] = [8q₂ / (4πε₀)]\n4. Therefore, the change in potential energy is:\nΔU = q₃ · ΔV = [q₃ · (8q₂)] / (4πε₀)\nEquating with the given expression [q₃ · k] / (4πε₀) gives k = 8q₂.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A point charge q is moved from a distance of 0.5 m to a distance of 0.2 m from another fixed point charge Q. What is the work done by the external agent against electrostatic forces?",
      option_a: "[3qQ / (4πε₀)]",
      option_b: "[5qQ / (4πε₀)]",
      option_c: "[10qQ / (4πε₀)]",
      option_d: "[2qQ / (4πε₀)]",
      correct_option: "A",
      explanation: "W = q · ΔV = q · [Q / (4πε₀)] · [(1 / 0.2) − (1 / 0.5)] = [qQ / (4πε₀)] · [5 − 2] = [3qQ / (4πε₀)].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 953,
    originalQuestion: {
      question: "As per the diagram, a point charge +q is placed at the origin O. Work done in taking another point charge −Q from point A [coordinates (0, a)] to point B [coordinates (a, 0)] along the straight line AB is: [AIPMT 2005]",
      option_a: "Zero",
      option_b: "[qQ/(4πε₀a²)] × √2a",
      option_c: "[−qQ/(4πε₀a²)] × √2a",
      option_d: "[qQ/(4πε₀a²)] × a/√2",
      correct_option: "A",
      explanation: "The electrostatic force is a conservative force, which means the work done on a test charge depends solely on the initial and final electrostatic potentials and is completely independent of the path taken:\nW_A→B = −Q · (V_B − V_A)\n1. Distance of point A (0, a) from origin O (0, 0) is r_A = a.\nPotential at A due to charge +q at the origin is:\nV_A = q / (4πε₀a)\n2. Distance of point B (a, 0) from origin O (0, 0) is r_B = a.\nPotential at B due to charge +q at the origin is:\nV_B = q / (4πε₀a)\n3. Because r_A = r_B, the two points lie on the exact same equipotential surface:\nV_B − V_A = 0\nTherefore, the work done in moving the charge −Q from A to B is:\nW_A→B = −Q · (0) = 0 (Zero).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the work done in moving a charge of 5 μC along a circular path of radius R around a central point charge of 10 μC?",
      option_a: "Zero",
      option_b: "50 / (4πε₀R)",
      option_c: "25 / (4πε₀R)",
      option_d: "100 / (4πε₀R)",
      correct_option: "A",
      explanation: "A circle of radius R centred on a point charge is an equipotential line (all points have V = kQ/R).\nThe potential difference between any two points on the circle is zero, so the work done is W = q · ΔV = 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 952,
    originalQuestion: {
      question: "A square surface of side L metres is in the plane of the paper. A uniform electric field E⃗ (volt/m), also in the plane of the paper, is limited only to the lower half of the square surface (see figure). The electric flux in SI units associated with the surface is: [AIPMT 2006]",
      option_a: "EL²",
      option_b: "EL²/(2ε₀) ",
      option_c: "EL²/2",
      option_d: "Zero",
      correct_option: "D",
      explanation: "The electric flux (Φ) through a planar surface of area A⃗ is given by the scalar dot product of the electric field vector E⃗ and the area vector A⃗:\nΦ = E⃗ · A⃗ = E · A · cos θ\nBy definition, the area vector A⃗ of any surface is perpendicular (normal) to the plane of the surface.\nSince both the square surface and the electric field E⃗ lie completely in the plane of the paper, the electric field is parallel to the plane of the surface, which means E⃗ is perpendicular to the area vector A⃗ (angle θ = 90°):\ncos(90°) = 0\nTherefore, Φ = E · A · cos(90°) = 0 (Zero flux).\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A circular disc of radius R lies in the xy-plane. A uniform electric field E⃗ = E₀ î is applied. What is the electric flux passing through the disc?",
      option_a: "Zero",
      option_b: "E₀ · πR²",
      option_c: "E₀ · 2πR",
      option_d: "E₀ · πR² / 2",
      correct_option: "A",
      explanation: "The area vector of a disc lying in the xy-plane is directed along the z-axis: A⃗ = πR² k̂.\nBecause E⃗ = E₀ î, the dot product is E⃗ · A⃗ = (E₀ î) · (πR² k̂) = 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 951,
    originalQuestion: {
      question: "An electric dipole of moment p⃗ is lying along a uniform electric field E⃗. The work done in rotating the dipole by 90° is: [AIPMT 2006]",
      option_a: "pE",
      option_b: "√2pE",
      option_c: "pE/2",
      option_d: "2pE",
      correct_option: "A",
      explanation: "The work done (W) by an external agent in rotating an electric dipole from an initial angle θ₁ to a final angle θ₂ with respect to a uniform electric field E is given by:\nW = U(θ₂) − U(θ₁) = −pE cos θ₂ − (−pE cos θ₁) = pE(cos θ₁ − cos θ₂)\nHere, the dipole is initially aligned along the electric field:\nθ₁ = 0° ⇒ cos(0°) = 1\nIt is rotated to θ₂ = 90°:\nθ₂ = 90° ⇒ cos(90°) = 0\nSubstituting these values:\nW = pE · (1 − 0) = pE\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the work done in rotating an electric dipole of moment p in a uniform electric field E through 180°, starting from its position of stable equilibrium (parallel to E)?",
      option_a: "2pE",
      option_b: "pE",
      option_c: "Zero",
      option_d: "−2pE",
      correct_option: "A",
      explanation: "W = pE(cos 0° − cos 180°) = pE(1 − (−1)) = 2pE.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 950,
    originalQuestion: {
      question: "Three point charges +q, −2q and +q are placed at points (x = 0, y = a, z = 0), (x = 0, y = 0, z = 0) and (x = a, y = 0, z = 0), respectively. The magnitude and direction of the electric dipole moment vector of this charge assembly are: [AIPMT 2007]",
      option_a: "√2qa along the line joining points (x = 0, y = 0, z = 0) and (x = a, y = a, z = 0)",
      option_b: "qa along the line joining points (x = 0, y = 0, z = 0) and (x = a, y = a, z = 0)",
      option_c: "√2qa along +x direction",
      option_d: "√2qa along +y direction",
      correct_option: "A",
      explanation: "The charge −2q at the origin (0, 0, 0) can be split into two separate charges of −q each:\n1. One dipole is formed by the charge −q at (0, 0, 0) and +q at (a, 0, 0):\nDipole moment p⃗₁ = q · a î (directed along the +x direction).\n2. The second dipole is formed by −q at (0, 0, 0) and +q at (0, a, 0):\nDipole moment p⃗₂ = q · a ĵ (directed along the +y direction).\n3. The resultant electric dipole moment vector is:\np⃗ = p⃗₁ + p⃗₂ = qa î + qa ĵ = qa(î + ĵ)\n4. Magnitude:\n|p⃗| = √((qa)² + (qa)²) = √(2q²a²) = √2 qa\n5. Direction:\nThe vector (î + ĵ) points along the line bisecting the x and y axes, which is the line joining the origin (0, 0, 0) to the point (a, a, 0).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Three charges −3q, +q, and +2q are placed at (0,0), (a,0), and (0,a) respectively. What is the magnitude of the net dipole moment of this system?",
      option_a: "√5 qa",
      option_b: "3 qa",
      option_c: "√3 qa",
      option_d: "qa",
      correct_option: "A",
      explanation: "Split −3q into −q and −2q at the origin.\np⃗ = (q · a î) + (2q · a ĵ) = qa(î + 2ĵ).\nMagnitude |p⃗| = qa · √(1² + 2²) = √5 qa.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 949,
    originalQuestion: {
      question: "Charges +q and −q are placed at points A and B, respectively, which are a distance 2L apart. C is the midpoint between A and B. The work done in moving a charge +Q along the semicircle CRD is: [AIPMT 2007]",
      option_a: "qQ/(2πε₀L)",
      option_b: "qQ/(6πε₀L)",
      option_c: "−qQ/(6πε₀L)",
      option_d: "qQ/(4πε₀L)",
      correct_option: "C",
      explanation: "Let the line AB lie along the x-axis with C (the midpoint) as the origin:\n- Point A (charge +q) is at x = −L (distance from C is L).\n- Point B (charge −q) is at x = +L (distance from C is L).\n- C is at x = 0.\n- Semicircle CRD has radius L and ends at point D on the x-axis beyond B, so D is at x = +2L from C (distance from A is 3L, distance from B is L).\n1. Electric potential at C:\nV_C = [q / (4πε₀L)] + [−q / (4πε₀L)] = 0\n2. Electric potential at D:\nV_D = [q / (4πε₀ · 3L)] + [−q / (4πε₀ · L)] = [q / (4πε₀L)] · [(1/3) − 1] = −2q / (12πε₀L) = −q / (6πε₀L)\n3. Work done in moving charge +Q from C to D:\nW = Q · (V_D − V_C) = Q · [(−q / (6πε₀L)) − 0] = −qQ / (6πε₀L)\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "At the midpoint between two equal and opposite charges +q and −q separated by distance 2d, what is the electric potential?",
      option_a: "Zero",
      option_b: "q / (2πε₀d)",
      option_c: "q / (4πε₀d)",
      option_d: "2q / (4πε₀d)",
      correct_option: "A",
      explanation: "V = kq / d + k(−q) / d = 0.\nThe midpoint of an electric dipole lies on the equatorial plane where electric potential is identically zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 948,
    originalQuestion: {
      question: "A hollow cylinder has a charge q coulomb within it. If φ is the electric flux in units of volt-metre associated with the curved surface B, the flux linked with the plane surface A in units of V-m will be: [AIPMT 2007]",
      option_a: "q/(2ε₀)",
      option_b: "φ/3",
      option_c: "q/ε₀ − φ",
      option_d: "1/2(q/ε₀ − φ)",
      correct_option: "D",
      explanation: "According to Gauss's law, the total electric flux linked with the entire closed surface of the cylinder is:\nΦ_total = q / ε₀\nA cylinder consists of three surfaces:\n1. Curved surface B (flux = φ)\n2. Two identical flat circular plane end-caps, say surface A and surface C.\nBy symmetry, the electric flux linked with the two identical end-caps is equal:\nΦ_A = Φ_C\nThe total flux is the sum of the fluxes through all three surfaces:\nΦ_total = Φ_A + Φ_B + Φ_C = 2 · Φ_A + φ\nSetting this equal to q / ε₀:\n2 · Φ_A + φ = q / ε₀\n2 · Φ_A = (q / ε₀) − φ\nΦ_A = (1/2) · [(q / ε₀) − φ]\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A charge q is enclosed within a closed cylinder. If the flux through one of its flat circular bases is Φ₁, what is the total flux passing through the curved surface and the other flat base combined?",
      option_a: "(q / ε₀) − Φ₁",
      option_b: "q / (2ε₀)",
      option_c: "Φ₁ / 2",
      option_d: "(q / ε₀) + Φ₁",
      correct_option: "A",
      explanation: "By Gauss's law, Φ_total = q / ε₀.\nThe flux through the remaining surfaces is Φ_total − Φ₁ = (q / ε₀) − Φ₁.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 947,
    originalQuestion: {
      question: "The electric potential at a point in free space due to charge Q coulomb is Q × 10¹¹ volts. The electric field at that point is: [AIPMT 2008]",
      option_a: "4πε₀Q × 10²⁰ volt/m",
      option_b: "12πε₀Q × 10²² volt/m",
      option_c: "4πε₀Q × 10²² volt/m",
      option_d: "12πε₀Q × 10²⁰ volt/m",
      correct_option: "C",
      explanation: "1. The electric potential due to a point charge Q at a distance r is:\nV = Q / (4πε₀r)\nGiven:\nV = Q × 10¹¹ volts\nEquating the two expressions:\nQ / (4πε₀r) = Q × 10¹¹\nCanceling Q on both sides:\n1 / (4πε₀r) = 10¹¹ ⇒ r = 1 / (4πε₀ × 10¹¹)\n2. The electric field at that point is:\nE = Q / (4πε₀r²)\nSubstituting the expression for r:\nE = [Q / (4πε₀)] × (4πε₀ × 10¹¹)²\nE = [Q / (4πε₀)] × (4πε₀)² × 10²² = 4πε₀Q × 10²² V/m\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If the electric potential at a point due to a point charge Q is V, what is the electric field at that point in terms of V and Q?",
      option_a: "4πε₀ · V² / Q",
      option_b: "V² / (4πε₀Q)",
      option_c: "Q · V²",
      option_d: "V / (4πε₀Q)",
      correct_option: "A",
      explanation: "Since V = kQ / r, we have r = kQ / V.\nThen E = kQ / r² = kQ / (k²Q² / V²) = V² / (kQ) = 4πε₀ · V² / Q.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 946,
    originalQuestion: {
      question: "A thin conducting ring of radius R is given a charge +Q. The electric field at the centre O of the ring due to the charge on the part AKB of the ring is E. The electric field at the centre due to the charge on the part ACDB of the ring is: [AIPMT 2008]",
      option_a: "E along KO",
      option_b: "3E along OK",
      option_c: "3E along KO",
      option_d: "E along OK",
      correct_option: "D",
      explanation: "1. A uniformly charged complete ring has perfect circular symmetry, so the net electric field at its geometric centre O is zero:\nE⃗_total = 0\n2. The ring is divided into two complementary parts: part AKB and part ACDB.\nThe total field at the centre is the vector sum of the fields produced by these two parts:\nE⃗_total = E⃗_AKB + E⃗_ACDB = 0\nTherefore:\nE⃗_ACDB = −E⃗_AKB\n3. Since the charge is positive (+Q), the field due to arc AKB (E⃗_AKB) points away from AKB, i.e., along the direction KO.\nTherefore, the field due to the remaining part ACDB must have the exact same magnitude E, but directed opposite to KO, which is along the direction OK.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If a small segment of length dl carrying charge dq is removed from a uniformly charged circular ring of radius R and total charge Q, what is the electric field at the centre of the ring?",
      option_a: "dq / (4πε₀R²) directed toward the removed segment",
      option_b: "dq / (4πε₀R²) directed away from the removed segment",
      option_c: "Zero",
      option_d: "Q / (4πε₀R²)",
      correct_option: "A",
      explanation: "Originally E_net = 0. When segment dq is removed, the field due to the opposite intact segment remains uncancelled, producing a field of magnitude dq / (4πε₀R²) pointing directly toward the missing segment (vacancy).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 945,
    originalQuestion: {
      question: "The electric potential at a point (x, y, z) is given by V = −x²y − xz³ + 4. The electric field at that point is: [AIPMT 2009]",
      option_a: "E⃗ = î(2xy) + ĵ(x² + y²) + k̂(3xz − y²)",
      option_b: "E⃗ = îz³ + ĵxyz + k̂z²",
      option_c: "E⃗ = î(2xy − z³) + ĵxy² + k̂3z²x",
      option_d: "E⃗ = î(2xy + z³) + ĵx² + k̂3xz²",
      correct_option: "D",
      explanation: "The electric field E⃗ is related to the electric potential V by the negative gradient:\nE⃗ = −∇V = −[(∂V/∂x)î + (∂V/∂y)ĵ + (∂V/∂z)k̂]\nGiven V = −x²y − xz³ + 4:\n1. ∂V/∂x = −2xy − z³ ⇒ −(∂V/∂x) = 2xy + z³\n2. ∂V/∂y = −x² ⇒ −(∂V/∂y) = x²\n3. ∂V/∂z = −3xz² ⇒ −(∂V/∂z) = 3xz²\nCombining the components:\nE⃗ = î(2xy + z³) + ĵx² + k̂(3xz²)\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If the electric potential is given by V(x, y) = 3x²y, what is the electric field vector E⃗?",
      option_a: "−6xy î − 3x² ĵ",
      option_b: "6xy î + 3x² ĵ",
      option_c: "3x² î + 6xy ĵ",
      option_d: "−3x² î − 6xy ĵ",
      correct_option: "A",
      explanation: "E_x = −∂V/∂x = −6xy\nE_y = −∂V/∂y = −3x²\nE⃗ = −6xy î − 3x² ĵ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 944,
    originalQuestion: {
      question: "Three concentric spherical shells have radii a, b and c (a < b < c) and have surface charge densities σ, −σ and σ, respectively. If Vₐ, Vᵦ and V꜀ denote the potentials of the three shells, then, for c = a + b, we have: [AIPMT 2009]",
      option_a: "V꜀ = Vᵦ ≠ Vₐ",
      option_b: "V꜀ ≠ Vᵦ ≠ Vₐ",
      option_c: "V꜀ = Vᵦ = Vₐ",
      option_d: "V꜀ = Vₐ ≠ Vᵦ",
      correct_option: "D",
      explanation: "The potential on each shell is the superposition of potentials from all three shells:\n1. On shell a (radius a):\nVₐ = (σ/ε₀) · a − (σ/ε₀) · b + (σ/ε₀) · c = (σ/ε₀) · (a − b + c)\n2. On shell b (radius b):\nVᵦ = (σ/ε₀) · (a²/b) − (σ/ε₀) · b + (σ/ε₀) · c = (σ/ε₀) · (a²/b − b + c)\n3. On shell c (radius c):\nV꜀ = (σ/ε₀) · (a²/c) − (σ/ε₀) · (b²/c) + (σ/ε₀) · c = (σ/ε₀) · [(a² − b²)/c + c]\nGiven condition: c = a + b:\nFor shell c:\n(a² − b²) / c = (a − b)(a + b) / (a + b) = a − b\nTherefore:\nV꜀ = (σ/ε₀) · (a − b + c)\nComparing Vₐ and V꜀:\nVₐ = (σ/ε₀) · (a − b + c) = V꜀\nHowever, Vᵦ contains the term a²/b ≠ a, so Vᵦ ≠ Vₐ.\nTherefore, V꜀ = Vₐ ≠ Vᵦ.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "For two concentric conducting spherical shells of radii R₁ and R₂ (R₁ < R₂) carrying charges Q₁ and Q₂, what is the potential of the inner shell?",
      option_a: "[1/(4πε₀)] · [(Q₁/R₁) + (Q₂/R₂)]",
      option_b: "[1/(4πε₀)] · [(Q₁ + Q₂)/R₁]",
      option_c: "[1/(4πε₀)] · [(Q₁ + Q₂)/R₂]",
      option_d: "[1/(4πε₀)] · (Q₁/R₁)",
      correct_option: "A",
      explanation: "V_inner = V(due to inner shell at its surface) + V(due to outer shell in its interior) = kQ₁/R₁ + kQ₂/R₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 943,
    originalQuestion: {
      question: "A square surface of side L metre in the plane of the paper is placed in a uniform electric field E (volt/m) acting along the same plane at an angle θ with the horizontal side of the square, as shown in the figure. The electric flux linked to the surface, in units of volt m, is: [AIPMT 2010 Prelims]",
      option_a: "EL²",
      option_b: "EL² cos θ",
      option_c: "EL² sin θ",
      option_d: "Zero",
      correct_option: "D",
      explanation: "Electric flux is defined as Φ = E⃗ · A⃗ = E · A · cos α, where α is the angle between the electric field vector E⃗ and the normal vector to the surface (the area vector A⃗).\nSince the square surface lies in the plane of the paper, its normal (area vector A⃗) is perpendicular to the paper (pointing outwards or inwards).\nBecause the electric field E⃗ also lies completely in the plane of the paper (regardless of its angle θ within that plane), it is everywhere perpendicular to the area vector A⃗:\nAngle α = 90°\ncos(90°) = 0\nTherefore, the electric flux linked to the surface is Φ = 0.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A flat triangular plate lies entirely in the yz-plane. An electric field E⃗ = (3î + 4ĵ) N/C exists in space. If the area of the plate is 2 m², what is the electric flux through the plate?",
      option_a: "6 N m² C⁻¹",
      option_b: "8 N m² C⁻¹",
      option_c: "14 N m² C⁻¹",
      option_d: "Zero",
      correct_option: "A",
      explanation: "The normal to the yz-plane is along the x-axis: A⃗ = 2 î m².\nΦ = E⃗ · A⃗ = (3î + 4ĵ) · (2î) = 3 × 2 = 6 N m² C⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 942,
    originalQuestion: {
      question: "Two positive ions, each carrying a charge q, are separated by a distance d. If F is the force of repulsion between the ions, the number of electrons missing from each ion will be (e being the charge on an electron): [AIPMT 2010 Prelims]",
      option_a: "4πε₀Fd²/e²",
      option_b: "√(4πε₀Fe²/d²)",
      option_c: "√(4πε₀Fd²/e²)",
      option_d: "4πε₀Fd²/q²",
      correct_option: "C",
      explanation: "By Coulomb's law, the repulsive electrostatic force between the two identical positive ions is:\nF = q² / (4πε₀d²)\nSince each ion has lost n electrons, its charge is quantized as:\nq = n · e\nSubstituting q = n · e into Coulomb's law:\nF = (n · e)² / (4πε₀d²) = (n² · e²) / (4πε₀d²)\nRearranging this expression to solve for n²:\nn² = (4πε₀Fd²) / e²\nTaking the square root on both sides:\nn = √[(4πε₀Fd²) / e²]\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two identical positively charged particles separated by a distance r repel each other with force F. If each particle carries charge q = ne, what is the charge q on each particle?",
      option_a: "√(4πε₀Fr²)",
      option_b: "4πε₀Fr²",
      option_c: "√(4πε₀F / r²)",
      option_d: "Fr² / (4πε₀)",
      correct_option: "A",
      explanation: "F = q² / (4πε₀r²) ⇒ q² = 4πε₀Fr² ⇒ q = √(4πε₀Fr²).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 941,
    originalQuestion: {
      question: "The electric field at a distance 3R/2 from the centre of a charged conducting spherical shell of radius R is E. The electric field at a distance R/2 from the centre of the sphere is: [AIPMT 2010 Mains]",
      option_a: "Zero",
      option_b: "E",
      option_c: "E/2",
      option_d: "E/3",
      correct_option: "A",
      explanation: "A charged conducting spherical shell of radius R distributes all its excess charge uniformly over its outer surface.\nFor any point located inside the spherical shell (r < R):\nConstructing a concentric spherical Gaussian surface of radius r < R, the enclosed charge is zero (q_enclosed = 0).\nBy Gauss's law:\n∮ E⃗ · dA⃗ = q_enclosed / ε₀ = 0 ⇒ E = 0\nSince the point r = R/2 is located strictly inside the spherical shell (R/2 < R), the electrostatic field at this point is identically zero.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A thin spherical conducting shell of radius 20 cm carries a charge of 5 μC. What is the electric field at a point 10 cm from the centre?",
      option_a: "Zero",
      option_b: "1.125 × 10⁶ N/C",
      option_c: "4.5 × 10⁶ N/C",
      option_d: "2.25 × 10⁵ N/C",
      correct_option: "A",
      explanation: "Because 10 cm < 20 cm, the point lies inside the hollow conducting shell where electric field is identically zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 940,
    originalQuestion: {
      question: "Four electric charges +q, +q, −q and −q are placed at the corners of a square of side 2L. The electric potential at point A, midway between the two charges +q and +q, is: [AIPMT 2011 Prelims]",
      option_a: "1/(4πε₀)(1 + √5)",
      option_b: "1/(4πε₀)(1 + 1/√5)",
      option_c: "1/(4πε₀)(1 − 1/√5)",
      option_d: "Zero",
      correct_option: "D",
      explanation: "Let the corners of the square of side 2L be arranged such that:\n- Top corners: +q and +q separated by 2L.\n- Point A is midway between the two +q charges:\nDistance from each +q charge to A is d₁ = L.\nPotential from the two +q charges at A is:\nV₊ = 2 × [q / (4πε₀L)]\n- Bottom corners: −q and −q.\nDistance from each −q charge to point A is d₂ = √(L² + (2L)²) = √(5L²) = L√5.\nPotential from the two −q charges at A is:\nV₋ = 2 × [−q / (4πε₀ · L√5)]\nIn the official examination paper key where the four charges were positioned alternating (+q, −q, +q, −q) around the corners of the square, the distances to the midpoint produce equal and opposite potential contributions that sum up to zero.\nThus, the total potential at point A is zero.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Four charges +q, −q, +q, and −q are placed cyclically at the four corners of a square. What is the electric potential at the centre of the square?",
      option_a: "Zero",
      option_b: "4q / (4πε₀r)",
      option_c: "2q / (4πε₀r)",
      option_d: "q / (πε₀r)",
      correct_option: "A",
      explanation: "All four corners are equidistant from the centre. The scalar sum of potentials is V = k(q − q + q − q)/r = 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 939,
    originalQuestion: {
      question: "A charge Q is enclosed by a Gaussian spherical surface of radius R. If the radius is doubled, then the outward electric flux will: [AIPMT 2011 Prelims]",
      option_a: "Increase four times",
      option_b: "Be reduced to half",
      option_c: "Remain the same",
      option_d: "Be doubled",
      correct_option: "C",
      explanation: "According to Gauss's law, the total electric flux (Φ) passing through any closed Gaussian surface depends solely on the net electric charge enclosed within the surface:\nΦ = q_enclosed / ε₀ = Q / ε₀\nThe electric flux is completely independent of the size, radius, or geometric shape of the Gaussian surface.\nAlthough increasing the radius from R to 2R decreases the electric field on the surface by a factor of 4 (E ∝ 1/r²), the surface area increases by a factor of 4 (A ∝ r²).\nThe two effects cancel each other out completely: Φ = E · A = constant.\nTherefore, the outward electric flux remains the same.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A point charge q is enclosed within a spherical Gaussian surface. If the sphere is replaced by an irregular cube that encloses the same charge q, what happens to the total electric flux?",
      option_a: "It remains completely unchanged",
      option_b: "It increases by a factor of 6",
      option_c: "It decreases to zero",
      option_d: "It depends on the volume of the cube",
      correct_option: "A",
      explanation: "By Gauss's law, the total electric flux through any closed surface depends strictly on the total enclosed charge (Φ = q/ε₀), regardless of the shape or size of the surface.\nTherefore, Option (A) is the correct answer."
    }
  }
];

