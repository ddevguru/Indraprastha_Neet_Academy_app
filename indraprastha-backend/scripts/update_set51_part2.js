const https = require('https');

const ADMIN_CREDENTIALS = {
  username: 'indraprasthaadmin',
  password: 'indraprastha@123'
};

const BASE_URL = 'api.indraprasthaneetacademy.com';

function login() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(ADMIN_CREDENTIALS);
    const req = https.request({
      hostname: BASE_URL,
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.token) resolve(json.token);
          else reject(new Error('Login failed: ' + body));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function updateQuestion(token, id, similarData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ similarQuestion: similarData });
    const req = https.request({
      hostname: BASE_URL,
      path: `/api/admin/practice-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(body);
        else reject(new Error(`Failed to update ${id} [${res.statusCode}]: ${body}`));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const part2Questions = [
  {
    id: 171,
    data: {
      question: "What is the electric potential at the surface of a gold nucleus (atomic number Z = 79) assuming it to be a spherical conductor of radius 7.0 × 10⁻¹⁵ m? (Take elementary charge e = 1.6 × 10⁻¹⁹ C, 1 / (4πε₀) = 9.0 × 10⁹ N m² C⁻²).",
      option_a: "1.62 × 10⁷ V",
      option_b: "1.62 × 10⁶ V",
      option_c: "8.12 × 10⁶ V",
      option_d: "3.24 × 10⁷ V",
      correct_option: "A",
      explanation: "Step 1: The total positive charge of a nucleus with atomic number Z is:\nQ = Z × e = 79 × (1.6 × 10⁻¹⁹ C) = 1.264 × 10⁻¹⁷ C.\n\nStep 2: The electric potential at the surface of a spherical charge distribution of radius R is:\nV = [1 / (4πε₀)] [Q / R].\n\nStep 3: Substitute the numerical values:\nV = (9.0 × 10⁹ N m² C⁻²) × (1.264 × 10⁻¹⁷ C) / (7.0 × 10⁻¹⁵ m)\nV = 1.1376 × 10⁻⁷ / 7.0 × 10⁻¹⁵ ≈ 1.625 × 10⁷ V = 1.62 × 10⁷ V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 172,
    data: {
      question: "Two large parallel conducting plates are maintained at potentials of −20 V and +60 V. If the distance between the plates is 4 cm, what is the magnitude of the uniform electric field between them?",
      option_a: "2000 V m⁻¹",
      option_b: "1000 V m⁻¹",
      option_c: "1500 V m⁻¹",
      option_d: "4000 V m⁻¹",
      correct_option: "A",
      explanation: "Step 1: The potential difference between the plates is:\nΔV = V₂ − V₁ = 60 V − (−20 V) = 80 V.\n\nStep 2: The separation between the plates in meters is:\nd = 4 cm = 0.04 m.\n\nStep 3: The uniform electric field between parallel plates is given by:\nE = ΔV / d = 80 V / 0.04 m = 2000 V m⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 173,
    data: {
      question: "Four identical positive point charges +q are placed at the four corners of a square of side length a. At the intersection of the diagonals (the geometric center of the square):",
      option_a: "The electric field E = 0 and the electric potential V > 0",
      option_b: "Both electric field E = 0 and electric potential V = 0",
      option_c: "The electric field E ≠ 0 and electric potential V = 0",
      option_d: "Both electric field E ≠ 0 and electric potential V > 0",
      correct_option: "A",
      explanation: "Step 1: The distance from each corner of the square to the center is r = a / √2.\n\nStep 2: Electric field is a vector quantity. For each pair of diagonally opposite charges +q, the electric field vectors at the center are equal in magnitude and point in opposite directions, cancelling out:\nE_net = 0.\n\nStep 3: Electric potential is a scalar quantity. The total potential is the algebraic sum of potentials due to each of the four positive charges:\nV_net = 4 × [1 / (4πε₀)] [q / r] = 4 [1 / (4πε₀)] [q / (a / √2)] = 4√2 [1 / (4πε₀)] (q / a) > 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 174,
    data: {
      question: "In the electric field of an electric dipole oriented along the z-axis with its center at the origin, consider all points on the equatorial plane (xy-plane). What can be asserted about the electric potential on this plane?",
      option_a: "The electric potential is zero at every point on the equatorial plane",
      option_b: "The electric potential increases with distance from the origin",
      option_c: "The electric potential is strictly positive everywhere",
      option_d: "The electric potential depends on the azimuthal angle φ",
      correct_option: "A",
      explanation: "Step 1: The equatorial plane of an electric dipole is the perpendicular bisector plane of the dipole axis.\n\nStep 2: Every point P on this plane is strictly equidistant from the positive charge (+q) and the negative charge (−q):\nr₊ = r₋ = r.\n\nStep 3: The electric potential at point P is:\nV = [1 / (4πε₀)] [q / r₊ − q / r₋] = [1 / (4πε₀)] [q / r − q / r] = 0.\nThus, the entire equatorial plane is an equipotential surface with potential V = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 175,
    data: {
      question: "An electric dipole of dipole moment p is placed in a uniform electric field E. The dipole is in stable equilibrium with minimum potential energy when the angle θ between p and E is:",
      option_a: "0°",
      option_b: "90°",
      option_c: "180°",
      option_d: "270°",
      correct_option: "A",
      explanation: "Step 1: The potential energy of an electric dipole in a uniform electric field is:\nU(θ) = −p · E = −p E cos θ.\n\nStep 2: The potential energy is minimum when cos θ attains its maximum positive value, which is +1:\ncos θ = 1 => θ = 0°.\n\nStep 3: At θ = 0°, U_min = −p E, and torque τ = p × E = 0. This corresponds to the state of stable equilibrium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 236,
    data: {
      question: "An electric dipole consists of charges +e and −e separated by a distance of 1.0 Å (1.0 × 10⁻¹⁰ m). What is the electric potential produced by this dipole at an axial point located at a distance of 10 Å (1.0 × 10⁻⁹ m) from the center of the dipole? (Take e = 1.6 × 10⁻¹⁹ C, 1 / (4πε₀) = 9.0 × 10⁹ N m² C⁻²).",
      option_a: "0.144 V",
      option_b: "1.44 V",
      option_c: "0.0144 V",
      option_d: "14.4 V",
      correct_option: "A",
      explanation: "Step 1: The dipole moment is:\np = q × (2a) = (1.6 × 10⁻¹⁹ C) × (1.0 × 10⁻¹⁰ m) = 1.6 × 10⁻²⁹ C m.\n\nStep 2: For an axial point at distance r ≫ a from the center of the dipole, the electric potential is:\nV = [1 / (4πε₀)] [p / r²].\n\nStep 3: Substitute the numerical values:\nV = (9.0 × 10⁹ N m² C⁻²) × (1.6 × 10⁻²⁹ C m) / (1.0 × 10⁻⁹ m)²\nV = (1.44 × 10⁻¹⁹) / (1.0 × 10⁻¹⁸) = 0.144 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 237,
    data: {
      question: "Two short electric dipoles having dipole moments P and 27 P are aligned collinearly in opposite orientations at a separation distance of 20 cm. At what distance from the dipole of moment P along the line connecting them will the net electric field be zero?",
      option_a: "5 cm",
      option_b: "4 cm",
      option_c: "10 cm",
      option_d: "2 cm",
      correct_option: "A",
      explanation: "Step 1: The electric field on the axis of a short dipole of moment p at distance r is:\nE = 2 k p / r³.\n\nStep 2: Let the point of zero electric field be at distance x from the dipole P. The distance from the dipole 27 P is then (20 − x) cm.\n\nStep 3: Because the dipoles are oriented in opposite directions, their axial electric fields at an intermediate point point in opposite directions. Equating their magnitudes:\n2 k P / x³ = 2 k (27 P) / (20 − x)³\n1 / x³ = 27 / (20 − x)³.\n\nStep 4: Taking the cube root on both sides:\n1 / x = 3 / (20 − x)\n20 − x = 3x => 4x = 20 => x = 5 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 238,
    data: {
      question: "A closed cubical box of edge length L is placed in a uniform electric field E = E₀ ĵ. What is the total electric flux passing through the entire surface of the cube?",
      option_a: "Zero",
      option_b: "E₀ L²",
      option_c: "2 E₀ L²",
      option_d: "6 E₀ L²",
      correct_option: "A",
      explanation: "Step 1: According to Gauss's Law, the net electric flux through any closed Gaussian surface is:\nΦ_net = Q_enclosed / ε₀.\n\nStep 2: The electric field is uniform throughout the region, which means there are no free charges enclosed within the volume of the cube (Q_enclosed = 0).\n\nStep 3: Furthermore, the electric flux entering through the face at y = 0 (−E₀ L²) exactly equals the electric flux leaving through the opposite face at y = L (+E₀ L²), while the flux through the remaining four faces parallel to the field is zero. Hence, Φ_net = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 239,
    data: {
      question: "Ten electric dipoles, each consisting of charges +q and −q, are completely enclosed within an arbitrary closed Gaussian surface. What is the total electric flux emerging from the surface?",
      option_a: "Zero",
      option_b: "10 q / ε₀",
      option_c: "20 q / ε₀",
      option_d: "q / (10 ε₀)",
      correct_option: "A",
      explanation: "Step 1: An electric dipole consists of two equal and opposite charges (+q and −q). The net charge of a single dipole is:\nQ_dipole = +q + (−q) = 0.\n\nStep 2: For ten dipoles enclosed within the surface, the total enclosed charge is:\nQ_enclosed = 10 × 0 = 0.\n\nStep 3: By Gauss's Law, the total electric flux through any closed surface enclosing zero net charge is:\nΦ_total = Q_enclosed / ε₀ = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 240,
    data: {
      question: "The inward and outward electric flux through a closed Gaussian surface are measured to be 9 × 10³ N m² C⁻¹ and 3 × 10³ N m² C⁻¹, respectively. What is the net electric charge enclosed inside the surface? (Let ε₀ denote the permittivity of free space).",
      option_a: "−6 × 10³ ε₀",
      option_b: "+6 × 10³ ε₀",
      option_c: "−12 × 10³ ε₀",
      option_d: "−6 × 10³ / ε₀",
      correct_option: "A",
      explanation: "Step 1: By convention, electric flux entering a closed surface is negative, and flux exiting the surface is positive:\nΦ_in = −9 × 10³ N m² C⁻¹\nΦ_out = +3 × 10³ N m² C⁻¹.\n\nStep 2: The net electric flux through the closed surface is:\nΦ_net = Φ_out + Φ_in = 3 × 10³ − 9 × 10³ = −6 × 10³ N m² C⁻¹.\n\nStep 3: By Gauss's Law:\nΦ_net = Q_enclosed / ε₀ => Q_enclosed = ε₀ × Φ_net = −6 × 10³ ε₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 241,
    data: {
      question: "A solid conducting sphere of radius r₁ carries a net charge of +4Q. It is surrounded concentrically by a thin conducting spherical shell of radius r₂ (where r₂ > r₁) carrying a net charge of −2Q. What is the magnitude of the electric field at a distance r from the common center in the region r₁ < r < r₂?",
      option_a: "4Q / (4πε₀ r²)",
      option_b: "2Q / (4πε₀ r²)",
      option_c: "6Q / (4πε₀ r²)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Choose a spherical Gaussian surface of radius r concentric with the system such that r₁ < r < r₂.\n\nStep 2: By Gauss's Law:\n∮ E · dA = E (4π r²) = Q_enclosed / ε₀.\n\nStep 3: In the region between the sphere and the shell, the only charge enclosed by the Gaussian surface is the charge on the inner sphere:\nQ_enclosed = +4Q.\n\nStep 4: Solving for E:\nE (4π r²) = 4Q / ε₀ => E = 4Q / (4πε₀ r²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 242,
    data: {
      question: "For an electrostatic field in a finite region containing no electric charges, which of the following conditions is fundamentally NOT possible?",
      option_a: "The electric field E is non-zero everywhere while the electric potential V is strictly uniform and constant throughout the entire region",
      option_b: "Both electric field E and electric potential V are zero everywhere in the region",
      option_c: "The electric potential varies linearly with position while the electric field is uniform and non-zero",
      option_d: "The electric field lines are everywhere perpendicular to the equipotential surfaces",
      correct_option: "A",
      explanation: "Step 1: The fundamental relation between electrostatic field and electric potential is:\nE = − ∇V.\n\nStep 2: If the electric potential V is strictly uniform and constant throughout a finite region (V = constant), all spatial derivatives must vanish identically:\n∂V / ∂x = 0, ∂V / ∂y = 0, ∂V / ∂z = 0.\n\nStep 3: Consequently, E = − ∇V = 0 everywhere in that region.\nIt is physically impossible to have a non-zero electric field while the electric potential remains constant over a finite volume.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 243,
    data: {
      question: "A central point charge +q is surrounded symmetrically by four identical point charges +q placed at the vertices of a square of side 2r (so that the distance from the center to each vertex is d = r√2). What is the total electrostatic potential energy of the central charge due to its interaction with the four surrounding charges? (Let k = 1 / (4πε₀)).",
      option_a: "4 k q² / (r√2)",
      option_b: "2 k q² / (r√2)",
      option_c: "k q² / (r√2)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The distance from the center of the square to each of the four vertices is:\nd = √[(r)² + (r)²] = r√2.\n\nStep 2: The electrostatic potential energy of interaction between the central charge +q and any one vertex charge +q is:\nU_i = k q² / d = k q² / (r√2).\n\nStep 3: By the principle of superposition, the total potential energy of the central charge is the scalar sum of its interaction energies with all four charges:\nU_total = 4 × U_i = 4 k q² / (r√2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 244,
    data: {
      question: "Five identical positive point charges +q are fixed at five of the six vertices of a regular hexagon of side length a. The net electric field at the center O is measured to be E₀ directed towards the vacant sixth vertex. If a charge Q is placed at this sixth vertex such that the net electric field at center O becomes 5 E₀ in the same direction, what must be the value of charge Q?",
      option_a: "−4q",
      option_b: "−5q",
      option_c: "+4q",
      option_d: "+5q",
      correct_option: "A",
      explanation: "Step 1: For five identical charges +q at the vertices of a regular hexagon, four of the charges cancel in opposite pairs. The unpaired fifth charge at vertex A produces an electric field E₀ = k q / a² away from it, directed straight toward the opposite vacant sixth vertex B.\n\nStep 2: When a charge Q is placed at vertex B (at distance a from O), it produces an electric field E_Q = k |Q| / a² along the line OB.\n\nStep 3: For the resultant electric field at O to be 5 E₀ directed towards B, the field E_Q produced by Q must also point toward B (attractive force, meaning Q is negative) with magnitude:\nE_net = E₀ + E_Q = 5 E₀ => E_Q = 4 E₀.\n\nStep 4: Substituting E_Q = k |Q| / a² and E₀ = k q / a²:\nk |Q| / a² = 4 (k q / a²) => |Q| = 4q.\nSince the field points toward B, Q must be negative: Q = −4q.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 245,
    data: {
      question: "Three identical electric dipoles, each of dipole moment p, are placed in a plane with their centers at the origin and oriented at angles 0°, 120°, and 240° relative to the positive x-axis. What is the net electric field produced by this combination at an axial distance r (where r ≫ dipole length) along the z-axis perpendicular to the plane?",
      option_a: "Zero",
      option_b: "3 k p / r³",
      option_c: "√3 k p / r³",
      option_d: "2 k p / r³",
      correct_option: "A",
      explanation: "Step 1: The dipole moment is a vector quantity. The net dipole moment of the system is the vector sum of the three dipoles:\np_net = p₁ + p₂ + p₃.\n\nStep 2: Decomposing into Cartesian components:\np_x = p cos 0° + p cos 120° + p cos 240° = p [ 1 + (−1/2) + (−1/2) ] = 0.\np_y = p sin 0° + p sin 120° + p sin 240° = p [ 0 + (√3/2) + (−√3/2) ] = 0.\n\nStep 3: Since p_net = 0, the combination has zero net dipole moment. Consequently, the leading dipole electric field produced at any distant point (r ≫ dipole length) is identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 246,
    data: {
      question: "In the electrostatic field of an isolated positive point charge +Q located at the origin, a test charge q₀ is moved between various points K, L, M, and N, all of which lie on the circumference of a circle of radius R centered at the origin. What is the work done by the electrostatic field in moving q₀ between any two of these points?",
      option_a: "Zero along all paths connecting any of these points",
      option_b: "Greatest along the path of maximum linear chord distance",
      option_c: "Dependent on whether the path is curved along the circle or straight",
      option_d: "Directly proportional to the angle subtended at the center",
      correct_option: "A",
      explanation: "Step 1: The electric potential due to a point charge Q at any radial distance r is:\nV(r) = [1 / (4πε₀)] [Q / r].\n\nStep 2: All points K, L, M, and N lie on the circle of radius R centered at the charge, so they all have the exact same electrostatic potential:\nV_K = V_L = V_M = V_N = [1 / (4πε₀)] [Q / R].\n\nStep 3: The circle is an equipotential surface. The work done by the electrostatic force between any two points on an equipotential surface is:\nW = −q₀ ΔV = −q₀ (V_final − V_initial) = −q₀ (0) = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 247,
    data: {
      question: "An uncharged hollow metallic conductor of arbitrary shape is placed in an external non-uniform electrostatic field. Let V_X, V_Y, and V_Z be the electrostatic potentials at a point X on the outer surface, a point Y inside the metallic wall, and a point Z in the inner cavity, respectively. Which relation is correct?",
      option_a: "V_X = V_Y = V_Z",
      option_b: "V_X > V_Y > V_Z",
      option_c: "V_Z > V_Y > V_X",
      option_d: "V_X = V_Y ≠ V_Z",
      correct_option: "A",
      explanation: "Step 1: Under electrostatic conditions, free charges in a conductor redistribute until the internal electric field is zero everywhere inside the conducting material (E = 0).\n\nStep 2: Since E = −∇V, the condition E = 0 throughout the conductor implies that the electric potential V is constant across the entire body and outer surface of the conductor (V_X = V_Y).\n\nStep 3: In the absence of any charge inside the cavity, the electric field inside the cavity is also zero everywhere (electrostatic shielding). Consequently, the potential inside the cavity is uniform and equals that of the surrounding conductor: V_Z = V_Y = V_X.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 248,
    data: {
      question: "Point charges +q, +q, and −2q are placed at the vertices A, B, and C of an equilateral triangle of side length d. What is the magnitude of the net electric dipole moment of this three-charge system?",
      option_a: "√3 q d",
      option_b: "2 q d",
      option_c: "q d",
      option_d: "√2 q d",
      correct_option: "A",
      explanation: "Step 1: The charge of −2q at vertex C can be split into two individual charges of −q each, located at C.\n\nStep 2: One charge −q pairs with +q at vertex A to form a dipole with moment p₁ = q d directed from C to A.\nThe second charge −q pairs with +q at vertex B to form a dipole with moment p₂ = q d directed from C to B.\n\nStep 3: Since ABC is an equilateral triangle, the angle between the two dipole moment vectors p₁ and p₂ is θ = 60°.\n\nStep 4: The magnitude of the resultant dipole moment is:\np_net = √(p₁² + p₂² + 2 p₁ p₂ cos 60°)\np_net = √[(q d)² + (q d)² + 2 (q d)² (1/2)] = √[3 (q d)²] = √3 q d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 249,
    data: {
      question: "Three point charges +2q, +2q, and −4q are placed at the vertices of an equilateral triangle of side length L. What is the net electric dipole moment of the system?",
      option_a: "2√3 q L",
      option_b: "4 q L",
      option_c: "√3 q L",
      option_d: "2 q L",
      correct_option: "A",
      explanation: "Step 1: The charge −4q at vertex C can be resolved into two constituent charges of −2q each.\n\nStep 2: Each −2q charge pairs with one of the +2q charges at vertices A and B to create two separate dipoles of equal magnitude:\np₀ = (2q) × L = 2 q L.\n\nStep 3: The two dipole vectors originate from C and make an angle of 60° with each other.\n\nStep 4: The magnitude of the resultant dipole moment is:\np_net = √(p₀² + p₀² + 2 p₀² cos 60°) = √[p₀² + p₀² + p₀²] = √3 p₀\np_net = √3 (2 q L) = 2√3 q L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 250,
    data: {
      question: "A point charge +q is moved along the paths of a square loop ABCDA of side length d in a uniform electric field E = E₀ î. The coordinates of the vertices are A(0, 0), B(d, 0), C(d, d), and D(0, d). What is the net work done by the electrostatic field as the charge travels along the path A → B → C?",
      option_a: "+q E₀ d",
      option_b: "−q E₀ d",
      option_c: "+2 q E₀ d",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The electrostatic force exerted by the uniform field on the charge +q is constant and conservative:\nF = q E = q E₀ î.\n\nStep 2: Along segment A(0, 0) to B(d, 0), the displacement is Δr₁ = d î:\nW₁ = F · Δr₁ = (q E₀ î) · (d î) = +q E₀ d.\n\nStep 3: Along segment B(d, 0) to C(d, d), the displacement is Δr₂ = d ĵ:\nW₂ = F · Δr₂ = (q E₀ î) · (d ĵ) = 0.\n\nStep 4: The total work done along the path A → B → C is:\nW_net = W₁ + W₂ = +q E₀ d + 0 = +q E₀ d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 251,
    data: {
      question: "In a certain spherically symmetric region, the electric potential varies with radial distance r as V(r) = 50 − 5 r² volts (where r is in meters). What is the radial electric field E_r at a distance r = 3 m from the origin?",
      option_a: "+30 V m⁻¹ (directed radially outward)",
      option_b: "−30 V m⁻¹ (directed radially inward)",
      option_c: "+15 V m⁻¹ (directed radially outward)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The radial electric field is related to the radial potential gradient by:\nE_r = − dV / dr.\n\nStep 2: Differentiating V(r) = 50 − 5 r² with respect to r:\ndV / dr = d/dr (50 − 5 r²) = −10 r.\n\nStep 3: Substituting into the electric field formula:\nE_r = − (−10 r) = +10 r.\n\nStep 4: At radial distance r = 3 m:\nE_r = +10 × (3) = +30 V m⁻¹.\nThe positive sign indicates that the field is directed radially outward, in the direction of decreasing potential.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 252,
    data: {
      question: "A point charge +q is placed inside the spherical cavity of a thick neutral metallic spherical shell. Which of the following statements correctly describes the electrostatic field lines in this system?",
      option_a: "Field lines emanate radially from the charge, terminate perpendicularly on the inner cavity surface, are completely absent within the metal bulk, and restart perpendicularly from the outer surface into the external space",
      option_b: "Field lines pass straight through the metal shell without interruption or termination",
      option_c: "Field lines exist only inside the cavity and do not appear anywhere in the external space outside the shell",
      option_d: "Field lines inside the cavity form closed concentric circles around the charge",
      correct_option: "A",
      explanation: "Step 1: The positive charge +q inside the cavity induces an equal negative charge −q uniformly on the inner surface of the cavity, and a charge +q on the outer surface of the neutral conductor.\n\nStep 2: Field lines originate radially from +q and terminate normally on the induced negative charges at the inner boundary of the cavity.\n\nStep 3: Inside the bulk metal of the conductor, the net electric field is zero in electrostatic equilibrium (E = 0), so no electric field lines exist within the conductor.\n\nStep 4: Field lines restart normally from the outer surface (which carries charge +q) and extend radially outward into space.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 253,
    data: {
      question: "A uniformly charged circular ring of radius R carries a total positive charge +Q. If a small circular arc of length ΔL (where ΔL ≪ R) is removed from the ring, the electric field at the center of the ring becomes E₀ pointing toward the gap. If instead the removed arc alone were placed at its original position with its original charge, what would be the electric field produced by it at the center of the ring?",
      option_a: "E₀ pointing directly away from the arc",
      option_b: "E₀ pointing directly toward the arc",
      option_c: "Zero",
      option_d: "2 E₀ pointing away from the arc",
      correct_option: "A",
      explanation: "Step 1: For a complete, intact uniformly charged ring, the net electric field at its center is zero by circular symmetry:\nE_ring = E_remaining + E_arc = 0.\n\nStep 2: Rearranging this relation yields:\nE_arc = − E_remaining.\n\nStep 3: Since the remaining part produces an electric field E₀ pointing toward the gap (toward the location of the removed arc), the field produced by the arc alone must have the exact same magnitude E₀ and point in the opposite direction, i.e., directly away from the arc.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 2 (Q25 to Q47)...');

  for (let i = 0; i < part2Questions.length; i++) {
    const item = part2Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part2Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part2Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 2 complete!');
}

main();
