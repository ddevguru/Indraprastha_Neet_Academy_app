module.exports = [
  {
    id: 938,
    originalQuestion: {
      question: "The electric potential V at any point (x, y, z), all in metres in space, is given by V = 4x² volt. The electric field at point (1, 0, 2), in volt/metre, is: [AIPMT 2011 Mains]",
      option_a: "8 along negative X-axis",
      option_b: "8 along positive X-axis",
      option_c: "16 along negative X-axis",
      option_d: "16 along positive X-axis",
      correct_option: "A",
      explanation: "The relationship between electric field vector E⃗ and electric potential V is:\nE⃗ = −[(∂V/∂x)î + (∂V/∂y)ĵ + (∂V/∂z)k̂]\nGiven V = 4x²:\n1. ∂V/∂x = 8x\n2. ∂V/∂y = 0\n3. ∂V/∂z = 0\nTherefore, the electric field vector is:\nE⃗ = −(8x) î\nAt the point (1, 0, 2), substitute x = 1:\nE⃗ = −(8 × 1) î = −8 î V/m\nThe negative sign indicates that the electric field has a magnitude of 8 V/m directed along the negative X-axis.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the electric potential in space is given by V = 5x² − 3y² volts, what is the electric field vector at the point (2, 1, 0)?",
      option_a: "−20 î + 6 ĵ V/m",
      option_b: "20 î − 6 ĵ V/m",
      option_c: "−10 î + 3 ĵ V/m",
      option_d: "−20 î − 6 ĵ V/m",
      correct_option: "A",
      explanation: "E_x = −∂V/∂x = −10x = −10(2) = −20\nE_y = −∂V/∂y = −(−6y) = +6(1) = +6\nE_z = 0\nE⃗ = −20 î + 6 ĵ V/m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 937,
    originalQuestion: {
      question: "Three charges, each +q, are placed at the corners of an isosceles triangle ABC of sides BC and AC, each 2a. D and E are the midpoints of BC and CA. The work done in taking a charge Q from D to E is: [AIPMT 2011 Mains]",
      option_a: "3qQ/(4πε₀a)",
      option_b: "3qQ/(8πε₀a)",
      option_c: "qQ/(4πε₀a)",
      option_d: "Zero",
      correct_option: "D",
      explanation: "In the isosceles triangle ABC:\n- Side BC = 2a with midpoint D, so BD = DC = a.\n- Side AC = 2a with midpoint E, so AE = EC = a.\n- All three corners A, B, and C carry identical charges +q.\nLet us evaluate the electric potential at points D and E:\n1. Due to the equilateral/isosceles bilateral symmetry about the altitude through C:\n- Point D is located at distance a from B, distance a from C, and some distance d from A.\n- Point E is located at distance a from A, distance a from C, and the exact same distance d from B.\nTherefore, the total electric potential at D and E is identical:\nV_D = [q / (4πε₀)] · [(1/a) + (1/a) + (1/d)]\nV_E = [q / (4πε₀)] · [(1/a) + (1/a) + (1/d)]\n2. The potential difference between D and E is:\nV_E − V_D = 0\n3. The work done in moving charge Q from D to E is:\nW = Q · (V_E − V_D) = Q · (0) = 0 (Zero).\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two identical charges +q are placed at (a, 0) and (−a, 0). What is the work done in moving a test charge Q from (0, b) to (0, −b) along the y-axis?",
      option_a: "Zero",
      option_b: "2qQ / (4πε₀b)",
      option_c: "qQ / (4πε₀a)",
      option_d: "4qQ / (4πε₀b)",
      correct_option: "A",
      explanation: "The distances from both charges to (0, b) and (0, −b) are identical: r = √(a² + b²).\nHence V(0, b) = V(0, −b), giving ΔV = 0 and W = Q · ΔV = 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 936,
    originalQuestion: {
      question: "What is the flux through a cube of side a if a point charge q is at one of its corners? [AIPMT 2012 Prelims]",
      option_a: "2q/ε₀",
      option_b: "q/(8ε₀)",
      option_c: "q/ε₀",
      option_d: "q/(2ε₀ 6a²)",
      correct_option: "B",
      explanation: "A point charge q placed at the corner of a cube is shared equally and symmetrically by 8 identical adjacent cubes meeting at that vertex.\nAccording to Gauss's law, a closed Gaussian surface enclosing the total charge q would have a total electric flux of q / ε₀.\nTo completely enclose the corner charge, 8 such cubes are required.\nTherefore, by symmetry, the total electric flux passing through the entire surface of any single cube is:\nΦ_cube = (1/8) · (q / ε₀) = q / (8ε₀)\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A charge q is placed at the centre of one of the faces of a cube. What is the total electric flux passing through the cube?",
      option_a: "q / (2ε₀)",
      option_b: "q / (8ε₀)",
      option_c: "q / (6ε₀)",
      option_d: "q / ε₀",
      correct_option: "A",
      explanation: "A point charge placed on a face is shared symmetrically between 2 identical cubes.\nHence, the flux passing through one cube is (1/2) · (q / ε₀) = q / (2ε₀).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 935,
    originalQuestion: {
      question: "Four point charges −Q, −q, 2q and 2Q are placed, one at each corner of the square. The relation between Q and q for which the potential at the centre of the square is zero is: [AIPMT 2012 Prelims]",
      option_a: "Q = −q",
      option_b: "Q = −1/q",
      option_c: "Q = q",
      option_d: "Q = 1/q",
      correct_option: "A",
      explanation: "Let the side of the square be a. The distance from each of the four corners to the centre of the square is equal:\nr = (a√2) / 2 = a / √2\nThe total electric potential V at the centre of the square is the scalar sum of potentials due to each corner charge:\nV = [1 / (4πε₀r)] · [(−Q) + (−q) + 2q + 2Q]\nSetting the potential at the centre to zero (V = 0):\n(−Q) + (−q) + 2q + 2Q = 0\n(−Q + 2Q) + (−q + 2q) = 0\nQ + q = 0\nQ = −q\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Four charges +2Q, −Q, +3q, and −q are placed at the four corners of a square. If the net electric potential at the centre of the square is zero, what is the relation between Q and q?",
      option_a: "Q = −2q",
      option_b: "Q = 2q",
      option_c: "Q = −q",
      option_d: "Q = q",
      correct_option: "A",
      explanation: "At the centre, all charges are equidistant.\nV_total = 0 ⇒ 2Q − Q + 3q − q = 0 ⇒ Q + 2q = 0 ⇒ Q = −2q.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 934,
    originalQuestion: {
      question: "An electric dipole of moment p is placed in an electric field of intensity E. The dipole acquires a position such that its axis makes an angle θ with the direction of the field. Assuming that the potential energy of the dipole is zero when θ = 90°, the torque and potential energy of the dipole will respectively be: [AIPMT 2012 Prelims]",
      option_a: "pE sin θ, −pE cos θ",
      option_b: "pE sin θ, 2pE cos θ",
      option_c: "pE sin θ, 2pE cos θ",
      option_d: "pE cos θ, −pE sin θ",
      correct_option: "A",
      explanation: "1. The torque τ⃗ on an electric dipole of moment p⃗ in an electric field E⃗ is:\nτ⃗ = p⃗ × E⃗\nIts magnitude is:\nτ = pE sin θ\n2. The electrostatic potential energy U(θ) of the dipole, taking the reference zero of potential energy at θ = 90° (U(90°) = 0), is:\nU(θ) = −∫ (90° to θ) τ_ext dθ = −pE ∫ (90° to θ) sin θ dθ = −pE [−cos θ] (from 90° to θ)\nU(θ) = −pE cos θ\nTherefore, the torque and potential energy are pE sin θ and −pE cos θ, respectively.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the potential energy of an electric dipole of moment p when its axis is oriented at an angle of 60° to a uniform electric field E? (Assume U = 0 at 90°)",
      option_a: "−0.5 pE",
      option_b: "+0.5 pE",
      option_c: "−pE",
      option_d: "−(√3/2) pE",
      correct_option: "A",
      explanation: "U = −pE cos(60°) = −pE · (1/2) = −0.5 pE.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 933,
    originalQuestion: {
      question: "Two metallic spheres of radii 1 cm and 3 cm are given charges of −1 × 10⁻² C and 5 × 10⁻² C, respectively. If these are connected by a conducting wire, the final charge on the bigger sphere is: [AIPMT 2012 Mains]",
      option_a: "2 × 10⁻² C",
      option_b: "3 × 10⁻² C",
      option_c: "4 × 10⁻² C",
      option_d: "1 × 10⁻² C",
      correct_option: "B",
      explanation: "1. Total charge of the two spheres is conserved:\nQ_total = Q₁ + Q₂ = (−1 × 10⁻² C) + (5 × 10⁻² C) = +4 × 10⁻² C\n2. When connected by a conducting wire, charge flows between them until they reach a common electric potential V:\nV = Q_total / (C₁ + C₂)\nFor an isolated spherical conductor, capacitance is directly proportional to its radius (C = 4πε₀R):\nC₁ / C₂ = R₁ / R₂ = 1 / 3\n3. The final charge on each sphere is proportional to its capacitance (radius):\nQ₂′ = [C₂ / (C₁ + C₂)] · Q_total = [R₂ / (R₁ + R₂)] · Q_total\nGiven R₁ = 1 cm and R₂ = 3 cm:\nQ₂′ = [3 / (1 + 3)] × (4 × 10⁻² C) = (3/4) × (4 × 10⁻² C) = 3 × 10⁻² C\nTherefore, the final charge on the bigger sphere is 3 × 10⁻² C.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Two conducting spheres of radii 2 cm and 4 cm carry charges of 10 μC and 20 μC, respectively. After being connected by a thin wire, what is the charge on the smaller sphere?",
      option_a: "10 μC",
      option_b: "15 μC",
      option_c: "5 μC",
      option_d: "20 μC",
      correct_option: "A",
      explanation: "Total charge Q = 10 + 20 = 30 μC.\nCharge on smaller sphere Q₁ = [R₁ / (R₁ + R₂)] · Q = [2 / (2 + 4)] · 30 = (2/6) · 30 = 10 μC.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 932,
    originalQuestion: {
      question: "Two pith balls carrying equal charges are suspended from a common point by strings of equal length. The equilibrium separation between them is r. Now the strings are rigidly clamped at half the height. The equilibrium separation between the balls now becomes: [NEET 2013]",
      option_a: "2r/√3",
      option_b: "2r/3",
      option_c: "(1/√2)²",
      option_d: "r/∛2",
      correct_option: "D",
      explanation: "Let each ball have mass m and charge q, suspended by strings of length L at vertical height y:\nIn equilibrium, the angle θ made by each string with the vertical satisfies:\ntan θ = F_e / (mg) = [q² / (4πε₀r²)] / (mg)\nFor small angles (θ << 1):\ntan θ ≈ sin θ = (r / 2) / y\nEquating the two expressions:\nr / (2y) = q² / (4πε₀mg · r²)\nRearranging:\nr³ = [2q² · y] / (4πε₀mg)\nThis proves that the equilibrium separation r is related to the vertical suspension height y by:\nr³ ∝ y ⇒ r ∝ y¹/³\nWhen the strings are clamped at half the original height (y′ = y / 2):\nr′ / r = (y′ / y)¹/³ = (1/2)¹/³ = 1 / ∛2\nr′ = r / ∛2\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In a pith-ball suspension experiment where r³ ∝ y, if the clamping height is reduced to one-eighth of its original height, what does the new equilibrium separation become?",
      option_a: "r / 2",
      option_b: "r / 4",
      option_c: "r / 8",
      option_d: "r / √2",
      correct_option: "A",
      explanation: "r′ / r = (y′ / y)¹/³ = (1/8)¹/³ = 1/2 ⇒ r′ = r / 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 931,
    originalQuestion: {
      question: "A, B and C are three points in a uniform electric field. The electric potential is: [NEET 2013]",
      option_a: "Maximum at C",
      option_b: "Same at all three points A, B and C",
      option_c: "Maximum at A",
      option_d: "Maximum at B",
      correct_option: "D",
      explanation: "The electric field E⃗ is related to the electric potential V by the fundamental relationship:\nE = −dV / dr\nThis equation dictates that the electric potential strictly decreases in the direction of the electric field lines.\nTherefore, the point situated furthest upstream (against the direction of the electric field lines) has the highest electric potential.\nIn the standard NEET diagram accompanying this question, point B lies furthest to the left (upstream against the electric field lines).\nConsequently, the electric potential is maximum at point B.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform electric field is directed along the positive x-axis. Arrange the points X(1, 0), Y(3, 0), and Z(5, 0) in decreasing order of electric potential.",
      option_a: "V_X > V_Y > V_Z",
      option_b: "V_Z > V_Y > V_X",
      option_c: "V_X = V_Y = V_Z",
      option_d: "V_Y > V_X > V_Z",
      correct_option: "A",
      explanation: "Because electric field points along +x, potential decreases as x increases.\nSince x_X < x_Y < x_Z, the potential order is V_X > V_Y > V_Z.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 930,
    originalQuestion: {
      question: "A charge q is placed at the centre of the line joining two equal charges Q. The system of the three charges will be in equilibrium if q is equal to: [NEET 2013 Karnataka]",
      option_a: "−Q/4",
      option_b: "Q/4",
      option_c: "−Q/2",
      option_d: "Q/2",
      correct_option: "A",
      explanation: "Let the two equal charges Q be placed at x = 0 and x = 2r.\nThe charge q is placed at the midpoint x = r.\nBy symmetry, the middle charge q experiences equal and opposite forces from both Q charges, so it is in equilibrium for any value of q.\nFor the entire three-charge system to be in equilibrium, the net force on either of the outer charges Q (say, the charge at x = 2r) must also be zero:\nF_net = F_due_to_other_Q + F_due_to_q = 0\n[Q² / (4πε₀ · (2r)²)] + [Q · q / (4πε₀ · r²)] = 0\nQ² / (4r²) + Q · q / r² = 0\nDividing throughout by Q / r² (since Q ≠ 0):\nQ / 4 + q = 0\nq = −Q / 4\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two identical charges +4 μC are placed at a distance d apart. What charge must be placed midway between them so that the entire system remains in electrostatic equilibrium?",
      option_a: "−1 μC",
      option_b: "+1 μC",
      option_c: "−2 μC",
      option_d: "+2 μC",
      correct_option: "A",
      explanation: "q = −Q / 4 = −(4 μC) / 4 = −1 μC.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 929,
    originalQuestion: {
      question: "An electric dipole of dipole moment p is aligned parallel to a uniform electric field E. The energy required to rotate the dipole by 90° is: [NEET 2013 Karnataka]",
      option_a: "p²E",
      option_b: "pE",
      option_c: "Infinity",
      option_d: "pE²",
      correct_option: "B",
      explanation: "The work required (or energy required) to rotate an electric dipole from an initial angle θ₁ to a final angle θ₂ in a uniform electric field is given by:\nW = pE(cos θ₁ − cos θ₂)\nGiven:\n- The dipole is initially parallel to the field: θ₁ = 0° ⇒ cos(0°) = 1\n- It is rotated by 90°: θ₂ = 90° ⇒ cos(90°) = 0\nSubstituting these values:\nW = pE · (1 − 0) = pE\nTherefore, the energy required to rotate the dipole by 90° is pE.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "An electric dipole of moment p is oriented at 60° to a uniform electric field E. What is the work done to align it parallel to the field (0°)?",
      option_a: "−0.5 pE",
      option_b: "+0.5 pE",
      option_c: "+pE",
      option_d: "Zero",
      correct_option: "A",
      explanation: "W = pE(cos 60° − cos 0°) = pE(0.5 − 1) = −0.5 pE.\n(The negative sign indicates work is done by the field).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 928,
    originalQuestion: {
      question: "In a region, the potential is represented by V(x, y, z) = 6x − 8xy − 8y + 6yz, where V is in volts and x, y, z are in metres. The electric force experienced by a charge of 2 coulomb situated at point (1, 1, 1) is: [AIPMT 2014]",
      option_a: "6√5 N",
      option_b: "30 N",
      option_c: "24 N",
      option_d: "4√35 N",
      correct_option: "D",
      explanation: "1. Find the components of the electric field E⃗ = −∇V:\n- E_x = −∂V/∂x = −(6 − 8y) = 8y − 6\nAt (1, 1, 1): E_x = 8(1) − 6 = 2 V/m\n- E_y = −∂V/∂y = −(−8x − 8 + 6z) = 8x + 8 − 6z\nAt (1, 1, 1): E_y = 8(1) + 8 − 6(1) = 10 V/m\n- E_z = −∂V/∂z = −(6y) = −6y\nAt (1, 1, 1): E_z = −6(1) = −6 V/m\n2. Calculate the magnitude of the electric field |E⃗|:\n|E⃗| = √(E_x² + E_y² + E_z²) = √(2² + 10² + (−6)²)\n|E⃗| = √(4 + 100 + 36) = √140 = √(4 × 35) = 2√35 V/m\n3. Calculate the electric force on charge q = 2 C:\nF = q · |E⃗| = 2 × 2√35 = 4√35 N\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The electric potential is given by V = 2x + 3y − z volts. What is the magnitude of the electric force on a 3 C charge situated in this field?",
      option_a: "3√14 N",
      option_b: "√14 N",
      option_c: "14 N",
      option_d: "42 N",
      correct_option: "A",
      explanation: "E_x = −2, E_y = −3, E_z = +1.\n|E⃗| = √(4 + 9 + 1) = √14 V/m.\nF = q · |E| = 3√14 N.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 927,
    originalQuestion: {
      question: "A conducting sphere of radius R is given a charge Q. The electric potential and the electric field at the centre of the sphere, respectively, are: [AIPMT 2014]",
      option_a: "Zero and Q/(4πε₀R²)",
      option_b: "Q/(4πε₀R) and zero",
      option_c: "Q/(4πε₀R) and Q/(4πε₀R²)",
      option_d: "Both are zero",
      correct_option: "B",
      explanation: "For a charged conducting sphere of radius R carrying charge Q:\n1. All the excess charge resides entirely on the outer surface.\n2. In electrostatic equilibrium, the electric field inside any conductor is identically zero everywhere, including at its centre:\nE = 0\n3. Since E = −dV/dr = 0 inside the conductor, the electric potential is constant throughout the entire volume of the sphere and is equal to the potential on its surface:\nV = Q / (4πε₀R)\nThus, the electric potential and electric field at the centre are Q / (4πε₀R) and zero, respectively.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A hollow metallic sphere of radius 10 cm is charged to 50 V. What are the potential and electric field at its centre?",
      option_a: "50 V and 0 N/C",
      option_b: "0 V and 0 N/C",
      option_c: "50 V and 500 N/C",
      option_d: "0 V and 500 N/C",
      correct_option: "A",
      explanation: "The potential inside a charged conducting sphere is uniform and equal to the surface potential (50 V), while the electric field inside is zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 926,
    originalQuestion: {
      question: "The electric field in a certain region is acting radially outward and is given by E = Ar. A charge contained in a sphere of radius a centred at the origin of the field will be given by: [AIPMT 2015 Cancelled]",
      option_a: "4πε₀Aa³",
      option_b: "ε₀A",
      option_c: "4πε₀Aa²",
      option_d: "Aε₀a²",
      correct_option: "A",
      explanation: "Consider a spherical Gaussian surface of radius a centred at the origin:\n1. The electric field is directed radially outward, so at every point on the sphere of radius a, E⃗ is parallel to the outward area normal vector dA⃗:\nE⃗ · dA⃗ = E · dA\n2. At r = a, the magnitude of the electric field is:\nE = A · a\n3. The total electric flux through the sphere of surface area 4πa² is:\nΦ = ∮ E⃗ · dA⃗ = E · (4πa²) = (A · a) · (4πa²) = 4πA a³\n4. By Gauss's law, Φ = q_enclosed / ε₀:\nq_enclosed = ε₀ · Φ = ε₀ · (4πA a³) = 4πε₀Aa³\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the radial electric field in a region is given by E = kr², what is the charge enclosed within a sphere of radius R centred at the origin?",
      option_a: "4πε₀kR⁴",
      option_b: "4πε₀kR³",
      option_c: "ε₀kR²",
      option_d: "2πε₀kR⁴",
      correct_option: "A",
      explanation: "Flux Φ = E(R) · 4πR² = (kR²) · 4πR² = 4πkR⁴.\nCharge enclosed q = ε₀ · Φ = 4πε₀kR⁴.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 925,
    originalQuestion: {
      question: "Two identical charged spheres suspended from a common point by two massless strings of lengths l, are initially at a distance d (d ≪ l) apart because of their mutual repulsion. The charges begin to leak from both spheres at a constant rate. As a result, the spheres approach each other with a velocity v. Then v varies as a function of the distance x between the spheres, as: [NEET 2016 Phase 1]",
      option_a: "v ∝ x⁻¹/²",
      option_b: "v ∝ x⁻¹",
      option_c: "v ∝ x¹/²",
      option_d: "v ∝ x",
      correct_option: "A",
      explanation: "1. At equilibrium separation x, each string makes an angle θ with the vertical:\ntan θ = F_e / (mg) = [q² / (4πε₀x²)] / (mg)\nSince x ≪ l, θ is very small: tan θ ≈ sin θ = (x/2) / l = x / (2l).\nEquating the two:\nx / (2l) = q² / (4πε₀mg · x²)\nRearranging gives:\nq² = [4πε₀mg / (2l)] · x³ ⇒ q ∝ x³ᐟ²\n2. Differentiating with respect to time t:\ndq/dt ∝ (3/2) · x¹ᐟ² · (dx/dt)\nSince charge leaks at a constant rate, dq/dt = constant:\nconstant ∝ x¹ᐟ² · v\nSolving for the approach velocity v = dx/dt:\nv ∝ 1 / x¹ᐟ² = x⁻¹ᐟ²\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In the charge leakage experiment from two suspended spheres where q ∝ x³ᐟ², how does the separation x between the spheres depend on elapsed time t if v = dx/dt ∝ x⁻¹ᐟ²?",
      option_a: "x ∝ t²ᐟ³",
      option_b: "x ∝ t¹ᐟ²",
      option_c: "x ∝ t³ᐟ²",
      option_d: "x ∝ t⁻¹ᐟ²",
      correct_option: "A",
      explanation: "dx/dt ∝ x⁻¹/² ⇒ x¹/² dx ∝ dt.\nIntegrating gives (2/3) x³ᐟ² ∝ t ⇒ x ∝ t²ᐟ³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 924,
    originalQuestion: {
      question: "An electric dipole is placed at an angle of 30° with an electric field intensity of 2 × 10⁵ N C⁻¹. It experiences a torque equal to 4 N m. The charge on the dipole, if the dipole length is 2 cm, is: [NEET 2016 Phase 2]",
      option_a: "8 mC",
      option_b: "2 mC",
      option_c: "5 mC",
      option_d: "7 μC",
      correct_option: "B",
      explanation: "The torque acting on an electric dipole in an electric field is given by:\nτ = p · E · sin θ\nwhere dipole moment p = q · 2a (charge × length of dipole 2a).\nGiven:\nTorque τ = 4 N m\nElectric field E = 2 × 10⁵ N C⁻¹\nAngle θ = 30° (so sin 30° = 0.5)\nLength 2a = 2 cm = 2 × 10⁻² m\nSubstituting into the torque equation:\n4 = p × (2 × 10⁵) × 0.5\n4 = p × 10⁵\np = 4 × 10⁻⁵ C m\nNow calculate charge q:\nq = p / (2a) = (4 × 10⁻⁵ C m) / (2 × 10⁻² m) = 2 × 10⁻³ C = 2 mC\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "An electric dipole of length 4 cm experiences a torque of 8 N m when placed at an angle of 30° in a uniform field of 4 × 10⁵ N/C. What is the magnitude of charge on the dipole?",
      option_a: "1 mC",
      option_b: "2 mC",
      option_c: "4 mC",
      option_d: "0.5 mC",
      correct_option: "A",
      explanation: "p = τ / (E sin 30°) = 8 / (4 × 10⁵ × 0.5) = 4 × 10⁻⁵ C m.\nq = p / (0.04 m) = 4 × 10⁻⁵ / 0.04 = 10⁻³ C = 1 mC.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 923,
    originalQuestion: {
      question: "The diagrams below show regions of equipotentials. A positive charge is moved from A to B in each diagram. [NEET 2017]",
      option_a: "In all four cases, the work done is the same.",
      option_b: "Minimum work is required to move q in figure (I).",
      option_c: "Maximum work is required to move q in figure (II).",
      option_d: "Maximum work is required to move q in figure (III).",
      correct_option: "A",
      explanation: "The work done (W) by an external force in moving a charge q from an initial point A to a final point B in an electrostatic field is given by:\nW = q · (V_B − V_A)\nIn all four figures given in the question:\n- Potential at point A is V_A = 10 V (or same initial equipotential value).\n- Potential at point B is V_B = 40 V (or same final equipotential value).\nBecause the potential difference ΔV = V_B − V_A is identical across all four configurations, and work done in an electrostatic field is path-independent:\nW = q · ΔV = constant\nTherefore, in all four cases, the work done is the same.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A charge of 2 μC is moved between two equipotential surfaces of 20 V and 60 V along three different paths of lengths 5 cm, 10 cm, and 20 cm. How does the work done compare along the three paths?",
      option_a: "Work done is equal along all three paths (80 μJ)",
      option_b: "Work done is greatest along the 20 cm path",
      option_c: "Work done is least along the 5 cm path",
      option_d: "Work done is zero along all paths",
      correct_option: "A",
      explanation: "Electrostatic force is conservative, so work depends only on the potential difference ΔV = 60 − 20 = 40 V.\nW = q · ΔV = (2 × 10⁻⁶ C) × 40 V = 80 μJ, identical for all paths.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 922,
    originalQuestion: {
      question: "Suppose the charge of a proton and an electron differ slightly. One of them is −e, and the other is (e + Δe). If the net of electrostatic force and gravitational force between two hydrogen atoms placed at a distance d (much greater than atomic size) apart is zero, then Δe is of the order of [Given: mass of hydrogen mₕ = 1.67 × 10⁻²⁷ kg]: [NEET 2017]",
      option_a: "10⁻²³ C",
      option_b: "10⁻³⁷ C",
      option_c: "10⁻⁴⁷ C",
      option_d: "10⁻²⁰ C",
      correct_option: "B",
      explanation: "Each hydrogen atom contains one proton and one electron:\nNet charge on each hydrogen atom = (e + Δe) + (−e) = Δe\n1. Repulsive electrostatic force between two such hydrogen atoms separated by distance d is:\nF_e = (Δe)² / (4πε₀d²)\n2. Attractive gravitational force between the two hydrogen atoms of mass m_h is:\nF_g = (G · m_h²) / d²\n3. Since the net force is zero, the two forces must balance:\n(Δe)² / (4πε₀d²) = (G · m_h²) / d²\n(Δe)² = 4πε₀ · G · m_h²\nSubstituting the physical constants:\n1 / (4πε₀) = 9 × 10⁹ N m² C⁻² ⇒ 4πε₀ = 1 / (9 × 10⁹) ≈ 1.11 × 10⁻¹⁰\nG = 6.67 × 10⁻¹¹ N m² kg⁻²\nm_h = 1.67 × 10⁻²⁷ kg\n(Δe)² = (1.11 × 10⁻¹⁰) × (6.67 × 10⁻¹¹) × (1.67 × 10⁻²⁷)²\n(Δe)² ≈ 7.4 × 10⁻²¹ × 2.79 × 10⁻⁵⁴ ≈ 2.06 × 10⁻⁷⁴ C²\nTaking the square root:\nΔe ≈ √(2.06 × 10⁻⁷⁴) ≈ 1.43 × 10⁻³⁷ C\nThus, Δe is of the order of 10⁻³⁷ C.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the repulsive electrostatic force between two particles of charge q balances their gravitational attraction of mass m, what is the ratio q / m in terms of G and ε₀?",
      option_a: "√(4πε₀G)",
      option_b: "4πε₀G",
      option_c: "√(G / (4πε₀))",
      option_d: "G / (4πε₀)",
      correct_option: "A",
      explanation: "q² / (4πε₀d²) = Gm² / d² ⇒ q² / m² = 4πε₀G ⇒ q / m = √(4πε₀G).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 921,
    originalQuestion: {
      question: "An electron falls from rest through a vertical distance h in a uniform and vertically upward directed electric field E. The direction of the electric field is now reversed, keeping its magnitude the same. A proton is allowed to fall from rest in it through the same vertical distance h. The time of fall of the electron, in comparison to the time of fall of the proton is: [NEET 2018]",
      option_a: "Smaller",
      option_b: "5 times greater",
      option_c: "10 times greater",
      option_d: "Equal",
      correct_option: "A",
      explanation: "1. The electric force on a charge q in electric field E is F = qE.\nIgnoring gravity (since electrostatic acceleration is orders of magnitude greater than g), the acceleration of the falling charged particle is:\na = qE / m\n2. From kinematics, the time t taken to fall through distance h from rest is:\nh = (1/2) · a · t² ⇒ t = √(2h / a) = √[(2h · m) / (qE)]\n3. Since both the electron and proton have the same magnitude of charge (|q| = e) and fall through the same height h in the same field magnitude E:\nt ∝ √m\n4. Because the mass of an electron (m_e ≈ 9.1 × 10⁻³¹ kg) is vastly smaller than the mass of a proton (m_p ≈ 1.67 × 10⁻²⁷ kg, m_p ≈ 1836 m_e):\nt_electron << t_proton\nThus, the time of fall of the electron is smaller.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In the above experiment, what is the ratio of the time of fall of the electron to that of the proton, in terms of their masses m_e and m_p?",
      option_a: "√(m_e / m_p)",
      option_b: "√(m_p / m_e)",
      option_c: "m_e / m_p",
      option_d: "1",
      correct_option: "A",
      explanation: "Since t = √(2hm / qE) and q, h, E are identical: t_e / t_p = √(m_e / m_p).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 920,
    originalQuestion: {
      question: "Two parallel infinite line charges with linear charge densities +λ C/m and −λ C/m are placed at a distance of 2R in free space. What is the electric field midway between the two line charges? [NEET 2019]",
      option_a: "2λ/(πε₀R) N/C",
      option_b: "Zero",
      option_c: "λ/(πε₀R) N/C",
      option_d: "λ/(2πε₀R) N/C",
      correct_option: "C",
      explanation: "1. The electric field due to an infinite line charge of linear density λ at distance r is:\nE = λ / (2πε₀r)\n2. At the midpoint between the two parallel lines separated by 2R, the distance to each line is r = R.\n- The positively charged line (+λ) produces an electric field directed away from itself (towards the negative line):\nE₁ = λ / (2πε₀R)\n- The negatively charged line (−λ) produces an electric field directed towards itself (in the exact same direction as E₁):\nE₂ = λ / (2πε₀R)\n3. Since both electric field vectors point in the identical direction (from the positive line toward the negative line), they add constructively:\nE_net = E₁ + E₂ = [λ / (2πε₀R)] + [λ / (2πε₀R)] = (2λ) / (2πε₀R) = λ / (πε₀R) N/C\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two parallel infinite line charges each having the same positive linear charge density +λ are placed at a separation 2d. What is the net electric field at the midpoint between them?",
      option_a: "Zero",
      option_b: "λ / (πε₀d)",
      option_c: "λ / (2πε₀d)",
      option_d: "2λ / (πε₀d)",
      correct_option: "A",
      explanation: "Both lines are positive, so their electric fields at the midpoint are equal in magnitude (λ / 2πε₀d) but point in exactly opposite directions, canceling to zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 919,
    originalQuestion: {
      question: "Two point charges A and B, having charges +Q and −Q respectively, are placed at a certain distance apart and the force acting between them is F. If 25% charge of A is transferred to B, then the force between the charges becomes: [NEET 2019]",
      option_a: "F",
      option_b: "16F/9",
      option_c: "9F/16",
      option_d: "4F/3",
      correct_option: "C",
      explanation: "1. Initial charges and force:\nCharge on A: q_A = +Q\nCharge on B: q_B = −Q\nInitial force: F = k · |(+Q)(−Q)| / r² = k · Q² / r²\n2. 25% of charge A is transferred to B:\nAmount of charge transferred = 0.25 Q = Q / 4\n- New charge on A: q_A′ = Q − 0.25 Q = +0.75 Q = +(3/4) Q\n- New charge on B: q_B′ = −Q + 0.25 Q = −0.75 Q = −(3/4) Q\n3. Calculate the new electrostatic force F′:\nF′ = k · |q_A′ · q_B′| / r² = k · |(3/4 Q)(−3/4 Q)| / r² = (9/16) · [k · Q² / r²] = (9/16) · F\nTherefore, the force between the charges becomes 9F/16.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two point charges +Q and −Q at distance d attract each other with force F. If 50% of the charge of the positive charge is transferred to the negative charge, what does the force become?",
      option_a: "F / 4",
      option_b: "F / 2",
      option_c: "3F / 4",
      option_d: "Zero",
      correct_option: "A",
      explanation: "q_A′ = Q − 0.5Q = +0.5Q; q_B′ = −Q + 0.5Q = −0.5Q.\nNew force F′ ∝ (0.5)(0.5) = 0.25 = 1/4 F.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 918,
    originalQuestion: {
      question: "A hollow metal sphere of radius R is uniformly charged. The electric field due to the sphere at a distance r from the centre: [NEET 2019]",
      option_a: "Is zero as r increases for r < R, and decreases as r increases for r > R",
      option_b: "Is zero as r increases for r < R, and increases as r increases for r > R",
      option_c: "Decreases as r increases for r < R and for r > R",
      option_d: "Increases as r increases for r < R and for r > R",
      correct_option: "A",
      explanation: "For a uniformly charged hollow metal sphere (conducting shell) of radius R carrying charge Q:\n1. Inside the sphere (r < R):\nAll charge resides on the outer surface, so any Gaussian surface of radius r < R encloses zero net charge (q_enclosed = 0).\nBy Gauss's law, the electric field is identically zero everywhere inside: E = 0 for r < R.\n2. Outside the sphere (r > R):\nApplying Gauss's law with a spherical surface of radius r > R enclosing the entire charge Q:\nE · (4πr²) = Q / ε₀ ⇒ E = Q / (4πε₀r²)\nThus, E is inversely proportional to r² (E ∝ 1/r²), meaning the electric field decreases continuously as r increases for r > R.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "How does the electric potential V vary with distance r from the centre of a charged conducting spherical shell of radius R?",
      option_a: "Constant for r ≤ R, and proportional to 1/r for r > R",
      option_b: "Zero for r < R, and proportional to 1/r² for r > R",
      option_c: "Directly proportional to r for r < R",
      option_d: "Constant everywhere in space",
      correct_option: "A",
      explanation: "Inside the shell (r ≤ R), V = kQ/R (constant). Outside (r > R), V = kQ/r (decreases as 1/r).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 917,
    originalQuestion: {
      question: "A spherical conductor of radius 10 cm has a charge of 3.2 × 10⁻⁷ C distributed uniformly. What is the magnitude of electric field at a point 15 cm from the centre of the sphere? (1/(4πε₀) = 9 × 10⁹ N m²/C²) [NEET 2020 Phase 1]",
      option_a: "1.28 × 10⁵ N/C",
      option_b: "1.28 × 10⁶ N/C",
      option_c: "1.28 × 10⁷ N/C",
      option_d: "1.28 × 10⁴ N/C",
      correct_option: "A",
      explanation: "1. Notice that the point of observation is at r = 15 cm = 0.15 m from the centre, which is outside the spherical conductor (r > R = 10 cm).\n2. For any point outside a uniformly charged spherical conductor, the entire charge behaves electrostatically as if it were concentrated at the centre of the sphere:\nE = [1 / (4πε₀)] · (q / r²)\nGiven:\n1 / (4πε₀) = 9 × 10⁹ N m² C⁻²\nq = 3.2 × 10⁻⁷ C\nr = 0.15 m ⇒ r² = (0.15)² = 0.0225 m² = 2.25 × 10⁻² m²\n3. Calculate the electric field:\nE = (9 × 10⁹ × 3.2 × 10⁻⁷) / (2.25 × 10⁻²)\nE = (28.8 × 10²) / (2.25 × 10⁻²) = (28.8 / 2.25) × 10⁴ = 12.8 × 10⁴ = 1.28 × 10⁵ N/C\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the electric field at a distance of 30 cm from the centre of a charged spherical conductor carrying 2.0 × 10⁻⁷ C? (1/(4πε₀) = 9 × 10⁹ N m²/C²)",
      option_a: "2.0 × 10⁴ N/C",
      option_b: "6.0 × 10⁴ N/C",
      option_c: "1.8 × 10⁵ N/C",
      option_d: "2.0 × 10⁵ N/C",
      correct_option: "A",
      explanation: "E = kQ / r² = (9 × 10⁹ × 2.0 × 10⁻⁷) / (0.30)² = 1800 / 0.09 = 20000 N/C = 2.0 × 10⁴ N/C.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 916,
    originalQuestion: {
      question: "In a certain region of space with volume 0.2 m³, the electric potential is found to be 5 V throughout. The magnitude of electric field in this region is: [NEET 2020 Phase 1]",
      option_a: "0.5 N/C",
      option_b: "1 N/C",
      option_c: "5 N/C",
      option_d: "Zero",
      correct_option: "D",
      explanation: "The relationship between the electric field E and electric potential V is given by the potential gradient:\nE = −dV / dr\nGiven that the electric potential is constant (V = 5 V) throughout the entire region of space:\ndV / dr = d(5) / dr = 0\nTherefore, the magnitude of the electric field everywhere in this region is identically zero:\nE = 0\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If the electric potential is uniform and equal to 100 V across a cubic box of side 1 m, what is the electric flux through any face of the box?",
      option_a: "Zero",
      option_b: "100 V m",
      option_c: "50 V m",
      option_d: "600 V m",
      correct_option: "A",
      explanation: "Since V is uniform, E = −dV/dr = 0 everywhere in and on the box.\nWith E = 0, the electric flux Φ = ∮ E⃗ · dA⃗ is zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 915,
    originalQuestion: {
      question: "A short electric dipole has a dipole moment of 16 × 10⁻⁹ C m. The electric potential due to the dipole at a point at a distance of 0.6 m from the centre of the dipole, situated on a line making an angle of 60° with the dipole axis is (1/(4πε₀) = 9 × 10⁹ N m²/C²): [NEET 2020 Phase 1]",
      option_a: "200 V",
      option_b: "400 V",
      option_c: "Zero",
      option_d: "50 V",
      correct_option: "A",
      explanation: "The electric potential V due to a short electric dipole of dipole moment p at a distance r and angle θ with the dipole axis is:\nV = [1 / (4πε₀)] · [(p · cos θ) / r²]\nGiven:\n1 / (4πε₀) = 9 × 10⁹ N m² C⁻²\np = 16 × 10⁻⁹ C m\nr = 0.6 m ⇒ r² = (0.6)² = 0.36 m²\nθ = 60° ⇒ cos(60°) = 0.5\nSubstituting the values:\nV = (9 × 10⁹) × [(16 × 10⁻⁹ × 0.5) / 0.36]\nV = 9 × [(8) / 0.36] = 72 / 0.36 = 200 V\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the electric potential at an equatorial point (θ = 90°) at a distance of 0.5 m from a short electric dipole of moment 20 × 10⁻⁹ C m?",
      option_a: "Zero",
      option_b: "360 V",
      option_c: "720 V",
      option_d: "180 V",
      correct_option: "A",
      explanation: "V = [1 / (4πε₀)] · [(p · cos 90°) / r²]. Since cos 90° = 0, V = 0 at every point on the equatorial plane.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 914,
    originalQuestion: {
      question: "The electric potential at a distance r from an electric dipole on its axis varies as: [NEET 2020 Phase 1]",
      option_a: "1/r²",
      option_b: "1/r",
      option_c: "1/r³",
      option_d: "r",
      correct_option: "A",
      explanation: "The electric potential due to a short electric dipole at distance r along its axial line (θ = 0°) is given by:\nV_axial = [1 / (4πε₀)] · (p / r²)\nThis shows that the electric potential of a dipole is inversely proportional to the square of the distance:\nV ∝ 1 / r²\n(In contrast, the potential of a single monopole point charge varies as 1/r, and the electric field of a dipole varies as 1/r³).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "How does the magnitude of the electric field intensity due to a short electric dipole vary with distance r along its equatorial line?",
      option_a: "E ∝ 1 / r³",
      option_b: "E ∝ 1 / r²",
      option_c: "E ∝ 1 / r",
      option_d: "E ∝ r",
      correct_option: "A",
      explanation: "For a short dipole, E_equatorial = p / (4πε₀r³), so E varies inversely as r³ (E ∝ 1/r³).\nTherefore, Option (A) is the correct answer."
    }
  }
];

