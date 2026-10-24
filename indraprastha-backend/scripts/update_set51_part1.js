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

const part1Questions = [
  {
    id: 134,
    data: {
      question: "Two identical positive point charges +q₀ are fixed at a distance 2d apart. A third charge Q is placed at the midpoint between them. What must be the value of Q so that the entire three-charge system remains in electrostatic equilibrium?",
      option_a: "−q₀ / 4",
      option_b: "+q₀ / 4",
      option_c: "−q₀ / 2",
      option_d: "+q₀ / 2",
      correct_option: "A",
      explanation: "Step 1: The charge Q placed at the midpoint is at distance d from both charges +q₀. It experiences equal and opposite forces from both charges, so it is in equilibrium for any value of Q.\n\nStep 2: For the entire system to be in equilibrium, each of the outer charges +q₀ must also experience zero net force.\n\nStep 3: Consider the net force on one of the outer charges +q₀:\nF_net = [1 / (4πε₀)] × [(q₀ × Q) / d²] + [1 / (4πε₀)] × [(q₀ × q₀) / (2d)²] = 0\n\nStep 4: Factoring out common non-zero terms:\nQ / d² + q₀ / (4d²) = 0\nQ = −q₀ / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 135,
    data: {
      question: "Two equal positive charges +Q are fixed on the y-axis at positions (0, d) and (0, −d). A small particle of mass m carrying a negative charge −q is placed at the origin and constrained to move along the x-axis. If it is given a small displacement x (where x ≪ d) and released, the particle will:",
      option_a: "Execute simple harmonic motion with frequency f = (1 / 2π) √(q Q / (2πε₀ m d³))",
      option_b: "Accelerate indefinitely along the positive x-axis without returning",
      option_c: "Remain permanently at the displaced position in neutral equilibrium",
      option_d: "Oscillate with an amplitude that increases exponentially with time",
      correct_option: "A",
      explanation: "Step 1: When displaced to coordinate (x, 0) with x ≪ d, the distance from each charge +Q is r = √(d² + x²).\n\nStep 2: Each charge exerts an attractive force on −q of magnitude F = [1 / (4πε₀)] [q Q / (d² + x²)].\n\nStep 3: The y-components of the two forces cancel by symmetry, while the x-components add along the −x direction:\nF_net = − 2 F cos θ = − 2 [1 / (4πε₀)] [q Q / (d² + x²)] [x / √(d² + x²)] = − [q Q / (2πε₀)] [x / (d² + x²)^(3/2)].\n\nStep 4: For x ≪ d, (d² + x²)^(3/2) ≈ d³. Thus:\nF_net ≈ − [q Q / (2πε₀ d³)] x.\nSince restoring force is directly proportional to −x, the motion is simple harmonic motion (SHM) with angular frequency ω = √(q Q / (2πε₀ m d³)) and frequency f = (1 / 2π) √(q Q / (2πε₀ m d³)).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 136,
    data: {
      question: "A point charge +q is transported from point A(2d, d, 0) to point B(0, 0, 0) along an arbitrary path in a region of uniform electric field E directed along the positive x-axis (E = E₀ î). The work done by the electrostatic field on the charge is:",
      option_a: "−2 q E₀ d",
      option_b: "+2 q E₀ d",
      option_c: "−q E₀ d",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The electrostatic force F = q E = q E₀ î is a conservative force, so the work done depends only on the initial and final position vectors.\n\nStep 2: Displacement vector Δr = r_B − r_A = (0 − 2d) î + (0 − d) ĵ + (0 − 0) k̂ = −2d î − d ĵ.\n\nStep 3: Work done by the electric field is given by the dot product:\nW = F · Δr = (q E₀ î) · (−2d î − d ĵ) = q E₀ (−2d) = −2 q E₀ d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 137,
    data: {
      question: "Two point charges of +15 μC and +6 μC are initially separated by a distance of 30 cm in air. How much external work must be done against electrostatic repulsion to reduce the separation between them to 10 cm? (Take 1 / (4πε₀) = 9 × 10⁹ N m² C⁻²).",
      option_a: "5.4 J",
      option_b: "2.7 J",
      option_c: "8.1 J",
      option_d: "1.8 J",
      correct_option: "A",
      explanation: "Step 1: The work done by an external agent against conservative electrostatic repulsion equals the change in electrostatic potential energy:\nW_ext = ΔU = U_final − U_initial.\n\nStep 2: The potential energy formula is U = k q₁ q₂ / r.\nΔU = k q₁ q₂ [1 / r₂ − 1 / r₁].\n\nStep 3: Given:\nk = 9 × 10⁹ N m² C⁻²,\nq₁ = 15 × 10⁻⁶ C, q₂ = 6 × 10⁻⁶ C,\nr₁ = 0.30 m, r₂ = 0.10 m.\n\nStep 4: Calculating:\nΔU = (9 × 10⁹) × (15 × 10⁻⁶) × (6 × 10⁻⁶) × [1 / 0.10 − 1 / 0.30]\nΔU = 810 × 10⁻³ × [10 − 3.333] = 0.81 × (20 / 3) = 0.81 × 6.667 = 5.4 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 138,
    data: {
      question: "A small bead of mass 1 g and charge +3 × 10⁻⁸ C moves from point X (potential V_X = 500 V) to point Y (potential V_Y = 0 V). If its speed at point Y is 20 cm s⁻¹, what was its initial speed at point X?",
      option_a: "10 cm s⁻¹",
      option_b: "15 cm s⁻¹",
      option_c: "5 cm s⁻¹",
      option_d: "14.1 cm s⁻¹",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem and conservation of mechanical energy:\nK_X + q V_X = K_Y + q V_Y\n(1/2) m v_X² + q V_X = (1/2) m v_Y² + q V_Y.\n\nStep 2: Substitute given values in SI units:\nm = 1 g = 10⁻³ kg,\nq = 3 × 10⁻⁸ C,\nV_X = 500 V, V_Y = 0 V,\nv_Y = 20 cm s⁻¹ = 0.2 m s⁻¹.\n\nStep 3: Compute energies:\nK_Y = (1/2) × 10⁻³ × (0.2)² = 0.5 × 10⁻³ × 0.04 = 2.0 × 10⁻⁵ J.\nq (V_X − V_Y) = (3 × 10⁻⁸ C) × 500 V = 1.5 × 10⁻⁵ J.\n\nStep 4: Solve for K_X:\nK_X = K_Y − q (V_X − V_Y) = 2.0 × 10⁻⁵ − 1.5 × 10⁻⁵ = 0.5 × 10⁻⁵ J.\n(1/2) m v_X² = 0.5 × 10⁻⁵ => (1/2) × 10⁻³ × v_X² = 0.5 × 10⁻⁵\nv_X² = 10⁻² = 0.01 m² s⁻² => v_X = 0.1 m s⁻¹ = 10 cm s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 139,
    data: {
      question: "A set of parallel planar equipotential surfaces are perpendicular to the x-axis at potentials V₁ = 40 V at x = 0 cm, V₂ = 30 V at x = 2 cm, V₃ = 20 V at x = 4 cm, and V₄ = 10 V at x = 6 cm. What is the magnitude and direction of the uniform electric field in this region?",
      option_a: "500 V m⁻¹ along the positive x-direction",
      option_b: "500 V m⁻¹ along the negative x-direction",
      option_c: "5 V m⁻¹ along the positive x-direction",
      option_d: "250 V m⁻¹ along the negative x-direction",
      correct_option: "A",
      explanation: "Step 1: The relation between electric field and electric potential along the x-axis is:\nE_x = − dV / dx.\n\nStep 2: Here, the change in potential with position is uniform:\nΔV / Δx = (10 − 40) V / (0.06 − 0) m = −30 / 0.06 = −500 V m⁻¹.\n\nStep 3: Calculating E_x:\nE_x = − (−500 V m⁻¹) = +500 V m⁻¹.\nBecause the electric field always points in the direction of steepest decrease of electric potential, it is directed along the positive x-direction.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 140,
    data: {
      question: "A thin non-conducting rod of radius R is bent into a semicircle. The upper quadrant carries a uniform positive charge +Q and the lower quadrant carries a uniform negative charge −Q. What is the magnitude of the net electric field at the center of curvature O? (Let k = 1 / (4πε₀)).",
      option_a: "4 k Q / (π R²)",
      option_b: "2 k Q / (π R²)",
      option_c: "2√2 k Q / (π R²)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The arc length of each quadrant is L = (π R) / 2. The linear charge density of the upper quadrant is λ = +Q / L = + 2Q / (π R), and for the lower quadrant it is −λ = − 2Q / (π R).\n\nStep 2: For an element dθ in the upper quadrant at angle θ to the horizontal axis (0 ≤ θ ≤ π/2):\ndE_x = − (k λ dθ / R) cos θ, dE_y = − (k λ dθ / R) sin θ.\nIntegrating from 0 to π/2:\nE_x1 = − (k λ / R) ∫ cos θ dθ = − k λ / R.\nE_y1 = − (k λ / R) ∫ sin θ dθ = − k λ / R.\n\nStep 3: For the lower quadrant (−π/2 ≤ θ ≤ 0) with negative charge, field lines point toward the arc:\nE_x2 = + k λ / R, and E_y2 = − k λ / R.\n\nStep 4: Summing the components:\nE_x,net = E_x1 + E_x2 = − k λ / R + k λ / R = 0.\nE_y,net = E_y1 + E_y2 = − 2 k λ / R = − 2 k (2Q / (π R)) / R = − 4 k Q / (π R²).\nThus the net magnitude is E_net = 4 k Q / (π R²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 154,
    data: {
      question: "Two stationary point charges of magnitudes +2 μC and +8 μC are placed at a distance d apart in vacuum. What is the ratio of the magnitude of the electrostatic force exerted by the +2 μC charge on the +8 μC charge to that exerted by the +8 μC charge on the +2 μC charge?",
      option_a: "1 : 1",
      option_b: "1 : 4",
      option_c: "4 : 1",
      option_d: "1 : 16",
      correct_option: "A",
      explanation: "Step 1: According to Coulomb's Law, the electrostatic force between two point charges q₁ and q₂ separated by distance d is given by:\nF = [1 / (4πε₀)] [|q₁ q₂| / d²].\n\nStep 2: By Newton's third law of motion, the force exerted by charge 1 on charge 2 (F₁₂) is equal in magnitude and opposite in direction to the force exerted by charge 2 on charge 1 (F₂₁):\nF₁₂ = − F₂₁.\n\nStep 3: Therefore, the ratio of the magnitudes of the forces is:\n|F₁₂| : |F₂₁| = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 155,
    data: {
      question: "Three point charges +9q, Q, and +q are placed along a straight line at positions x = 0, x = L / 2, and x = L, respectively. What must be the value of charge Q so that the net electrostatic force acting on the charge +q at x = L is zero?",
      option_a: "−9q / 4",
      option_b: "−9q / 2",
      option_c: "−q",
      option_d: "+9q / 4",
      correct_option: "A",
      explanation: "Step 1: The net electrostatic force on the charge +q at x = L is the vector sum of forces due to +9q (at x = 0) and Q (at x = L / 2):\nF_net = [1 / (4πε₀)] [(9q × q) / L²] + [1 / (4πε₀)] [(Q × q) / (L / 2)²] = 0.\n\nStep 2: Simplifying:\n9q / L² + 4Q / L² = 0.\n\nStep 3: Solving for Q:\n4Q = −9q => Q = −9q / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 156,
    data: {
      question: "Two identical point charges of +3 μC and +9 μC repel each other with an electrostatic force of 18 N at a given distance. If an additional charge of −3 μC is given to each of them while keeping their distance unchanged, what will be the new electrostatic force between them?",
      option_a: "Zero",
      option_b: "6 N (repulsive)",
      option_c: "12 N (attractive)",
      option_d: "18 N (repulsive)",
      correct_option: "A",
      explanation: "Step 1: When an additional charge of −3 μC is added to each charge:\nNew charge q₁' = +3 μC + (−3 μC) = 0 μC.\nNew charge q₂' = +9 μC + (−3 μC) = +6 μC.\n\nStep 2: By Coulomb's law, the electrostatic force between two charges is proportional to the product of the charges:\nF' = [1 / (4πε₀)] [|q₁' × q₂'| / r²].\n\nStep 3: Since q₁' = 0, the product q₁' × q₂' = 0, which gives F' = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 157,
    data: {
      question: "An isolated right-angled triangle ABC has sides AB = 3 cm, BC = 4 cm, and ∠ABC = 90°. Point charges of +27 e.s.u., +10 e.s.u., and −64 e.s.u. are placed at vertices A, B, and C, respectively. What is the net electrostatic force acting on the charge at vertex B? (In CGS electrostatic units, k = 1 dyne cm² / (e.s.u.)²).",
      option_a: "50 dynes",
      option_b: "70 dynes",
      option_c: "10 dynes",
      option_d: "25 dynes",
      correct_option: "A",
      explanation: "Step 1: Force on B due to charge at A along the line AB:\nF_A = (q_A × q_B) / (AB)² = (27 × 10) / 3² = 270 / 9 = 30 dynes (repulsive, directed along BA, away from A).\n\nStep 2: Force on B due to charge at C along the line BC:\nF_C = (|q_C| × q_B) / (BC)² = (64 × 10) / 4² = 640 / 16 = 40 dynes (attractive, directed along BC, toward C).\n\nStep 3: Since ∠ABC = 90°, the two force vectors F_A and F_C are mutually perpendicular.\n\nStep 4: The magnitude of the resultant force is:\nF_net = √(F_A² + F_C²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50 dynes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 158,
    data: {
      question: "Two identical conducting spheres of equal radius carrying charges +12 μC and −36 μC are separated by a distance d and experience an electrostatic force F₁. If they are brought into contact and then separated back to the same distance d, they experience an electrostatic force F₂. What is the ratio F₁ / F₂?",
      option_a: "−3 : 1",
      option_b: "−12 : 1",
      option_c: "−4 : 1",
      option_d: "+3 : 1",
      correct_option: "A",
      explanation: "Step 1: The initial force before contact is:\nF₁ = k (q₁ q₂) / d² = k (+12)(−36) / d² = − 432 k / d² (attractive force).\n\nStep 2: When brought into contact, charge redistributes equally between the two identical spheres:\nTotal charge Q = +12 μC + (−36 μC) = −24 μC.\nCharge on each sphere after separation: q' = Q / 2 = −12 μC.\n\nStep 3: The new force after contact is:\nF₂ = k (q' q') / d² = k (−12)(−12) / d² = + 144 k / d² (repulsive force).\n\nStep 4: The ratio F₁ / F₂ is:\nF₁ / F₂ = (− 432 k / d²) / (+ 144 k / d²) = − 432 / 144 = − 3 / 1 = −3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 159,
    data: {
      question: "Two identical copper balls, each weighing 10 g, are kept in air 10 cm apart. If one electron from every 10⁷ copper atoms is transferred from one ball to the other, what is the magnitude of the Coulomb force between them? (Atomic weight of copper = 63.5 g mol⁻¹, Avogadro's constant N_A = 6.02 × 10²³ mol⁻¹, elementary charge e = 1.6 × 10⁻¹⁹ C, and 1 / (4πε₀) = 9 × 10⁹ N m² C⁻²).",
      option_a: "2.0 × 10⁶ N",
      option_b: "2.0 × 10⁴ N",
      option_c: "2.0 × 10⁸ N",
      option_d: "2.0 × 10¹⁰ N",
      correct_option: "A",
      explanation: "Step 1: Number of copper atoms in a 10 g sphere:\nN = (m / M) × N_A = (10 / 63.5) × 6.02 × 10²³ ≈ 9.48 × 10²² atoms.\n\nStep 2: Number of electrons transferred (1 per 10⁷ atoms):\nn = N / 10⁷ = (9.48 × 10²²) / 10⁷ = 9.48 × 10¹⁵ electrons.\n\nStep 3: Magnitude of charge transferred:\nq = n × e = (9.48 × 10¹⁵) × (1.6 × 10⁻¹⁹ C) = 1.517 × 10⁻³ C.\n\nStep 4: Electrostatic force between the spheres:\nF = [1 / (4πε₀)] [q² / r²] = (9 × 10⁹) × (1.517 × 10⁻³)² / (0.10)²\nF = (9 × 10⁹) × (2.30 × 10⁻⁶) / 0.01 = 2.07 × 10⁴ / 0.01 ≈ 2.0 × 10⁶ N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 160,
    data: {
      question: "Two identical point charges placed in air experience a mutual electrostatic repulsion of 1.8 × 10⁻³ N. When immersed in a liquid dielectric medium at the same separation distance, the force between them is reduced to 3.6 × 10⁻⁴ N. What is the dielectric constant (relative permittivity) of the liquid?",
      option_a: "5.0",
      option_b: "2.5",
      option_c: "4.0",
      option_d: "0.2",
      correct_option: "A",
      explanation: "Step 1: The electrostatic force between two charges in a medium of dielectric constant K is related to the force in vacuum/air by:\nF_medium = F_air / K.\n\nStep 2: Rearranging to solve for dielectric constant K:\nK = F_air / F_medium.\n\nStep 3: Substituting the given values:\nK = (1.8 × 10⁻³ N) / (3.6 × 10⁻⁴ N) = 18 / 3.6 = 5.0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 161,
    data: {
      question: "When an ebonite rod is rubbed with cat's fur, which of the following processes occurs?",
      option_a: "The ebonite rod gains electrons from the fur and becomes negatively charged",
      option_b: "The ebonite rod gives electrons to the fur and becomes positively charged",
      option_c: "The ebonite rod gains protons from the fur and becomes positively charged",
      option_d: "The ebonite rod gives protons to the fur and becomes negatively charged",
      correct_option: "A",
      explanation: "Step 1: Triboelectric charging involves the transfer of loosely bound valence electrons between materials with different electron affinities.\n\nStep 2: Cat's fur has a lower work function (lower electron affinity) than ebonite (hard vulcanized rubber).\n\nStep 3: Friction causes electrons to transfer from the cat's fur onto the ebonite rod, leaving the fur with a deficiency of electrons (positively charged) and imparting an excess of electrons to the ebonite rod (negatively charged).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 162,
    data: {
      question: "What is the theoretical value of the dielectric constant (relative permittivity, ε_r) for an ideal metal (perfect conductor)?",
      option_a: "Infinite (∞)",
      option_b: "Zero",
      option_c: "Unity (1)",
      option_d: "Greater than 1 but finite",
      correct_option: "A",
      explanation: "Step 1: The dielectric constant K is defined as the ratio of the external applied electric field E₀ to the net internal electric field E_in:\nK = E₀ / E_in.\n\nStep 2: In electrostatic equilibrium, free electrons in a metal conductor redistribute instantaneously until the induced electric field completely cancels the external field inside the conductor, resulting in E_in = 0.\n\nStep 3: Taking the limit as E_in → 0:\nK = E₀ / 0 = ∞.\nThus, the dielectric constant for an ideal metal is infinite.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 163,
    data: {
      question: "An infinite sequence of identical point charges, each of magnitude +2 μC, are placed along the positive x-axis at positions x = 1 m, 2 m, 4 m, 8 m, 16 m, ... What is the net electrostatic force exerted by these charges on a test charge of +1 C placed at the origin?",
      option_a: "24,000 N",
      option_b: "18,000 N",
      option_c: "12,000 N",
      option_d: "36,000 N",
      correct_option: "A",
      explanation: "Step 1: The force on the charge Q = 1 C at x = 0 due to each charge q = 2 μC at x_n = 2ⁿ m (for n = 0, 1, 2, ...) is directed along the −x axis with magnitude:\nF = k Q q [ 1/1² + 1/2² + 1/4² + 1/8² + ... ] = k Q q [ 1 + 1/4 + 1/16 + 1/64 + ... ].\n\nStep 2: The series in brackets is an infinite geometric progression with first term a = 1 and common ratio r = 1/4:\nS = a / (1 − r) = 1 / (1 − 1/4) = 4 / 3.\n\nStep 3: Calculating the magnitude:\nF = (9 × 10⁹ N m² C⁻²) × (1 C) × (2 × 10⁻⁶ C) × (4 / 3)\nF = 18,000 × (4 / 3) = 24,000 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 164,
    data: {
      question: "The electric potential in a region of space is given by V(x, y, z) = 5x² − 3y volts, where x, y, z are in meters. What is the electric field vector E at the point (2 m, 1 m, 0 m)?",
      option_a: "(−20 î + 3 ĵ) V m⁻¹",
      option_b: "(+20 î − 3 ĵ) V m⁻¹",
      option_c: "(−10 î + 3 ĵ) V m⁻¹",
      option_d: "(−20 î − 3 ĵ) V m⁻¹",
      correct_option: "A",
      explanation: "Step 1: The electric field vector is related to the spatial gradient of electric potential by:\nE = − ∇V = − [ (∂V/∂x) î + (∂V/∂y) ĵ + (∂V/∂z) k̂ ].\n\nStep 2: Evaluate the partial derivatives of V(x, y, z) = 5x² − 3y:\n∂V / ∂x = 10x\n∂V / ∂y = −3\n∂V / ∂z = 0.\n\nStep 3: Substitute the coordinates x = 2 m, y = 1 m, z = 0 m:\nE = − [ (10 × 2) î + (−3) ĵ + 0 k̂ ] = − [ 20 î − 3 ĵ ] = (−20 î + 3 ĵ) V m⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 165,
    data: {
      question: "Two positive point charges of +16 μC and +49 μC are separated by a distance of 22 cm in air. At what distance from the +16 μC charge along the line joining them will the net electric field intensity be zero?",
      option_a: "8 cm",
      option_b: "14 cm",
      option_c: "6 cm",
      option_d: "11 cm",
      correct_option: "A",
      explanation: "Step 1: Let the null point where E_net = 0 be at a distance x from the +16 μC charge. The distance from the +49 μC charge is then (22 − x) cm.\n\nStep 2: At this point, the electric fields produced by both positive charges point in opposite directions and have equal magnitudes:\n[1 / (4πε₀)] [16 / x²] = [1 / (4πε₀)] [49 / (22 − x)²].\n\nStep 3: Taking square roots on both sides:\n4 / x = 7 / (22 − x).\n\nStep 4: Cross-multiplying:\n4(22 − x) = 7x\n88 − 4x = 7x\n11x = 88 => x = 8 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 166,
    data: {
      question: "A point charge +q is moved at constant speed once around a complete circular orbit of radius R centered on a fixed point charge +Q. What is the total work done by the electrostatic force during one complete revolution?",
      option_a: "Zero",
      option_b: "q Q / (2ε₀ R)",
      option_c: "2π R q Q / (4πε₀)",
      option_d: "4π R² q Q",
      correct_option: "A",
      explanation: "Step 1: The electrostatic field E = [1 / (4πε₀)] [Q / r²] r̂ is a central and conservative field.\n\nStep 2: Work done by any conservative force around a closed path is identically zero:\nW = ∮ F · dr = 0.\n\nStep 3: Furthermore, at every point on the circular path of radius R, the electrostatic force is directed radially outward, which is perpendicular to the tangential displacement vector (F ⊥ dr), so dW = F · dr = 0 at every point.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 167,
    data: {
      question: "At a certain distance from an isolated point charge, the electric field strength is 400 V m⁻¹ and the electric potential is 2400 V. What is the distance of this point from the charge?",
      option_a: "6 m",
      option_b: "8 m",
      option_c: "12 m",
      option_d: "3 m",
      correct_option: "A",
      explanation: "Step 1: For an isolated point charge Q, the electric potential and electric field at distance r are given by:\nV = k Q / r\nE = k Q / r².\n\nStep 2: Dividing potential by electric field:\nV / E = (k Q / r) / (k Q / r²) = r.\n\nStep 3: Substitute the given values:\nr = 2400 V / 400 V m⁻¹ = 6 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 168,
    data: {
      question: "An external agent does 45 J of work in moving a point charge of +3 C at constant speed between two points A and B in an electric field. What is the electric potential difference (V_B − V_A) between these two points?",
      option_a: "15 V",
      option_b: "135 V",
      option_c: "0.067 V",
      option_d: "45 V",
      correct_option: "A",
      explanation: "Step 1: The electric potential difference (V_B − V_A) between two points is defined as the external work done per unit positive charge in moving the charge without acceleration:\nΔV = V_B − V_A = W_ext / q.\n\nStep 2: Substitute the given values:\nW_ext = 45 J\nq = 3 C.\n\nStep 3: Calculate:\nΔV = 45 J / 3 C = 15 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 169,
    data: {
      question: "A solid conducting sphere of radius 12 cm carries a net charge Q. The electric potential at a point 6 cm from its center is V₀. What is the electric potential at a point located 18 cm from the center of the sphere?",
      option_a: "(2 / 3) V₀",
      option_b: "(1 / 3) V₀",
      option_c: "(3 / 2) V₀",
      option_d: "(4 / 9) V₀",
      correct_option: "A",
      explanation: "Step 1: Inside a conducting sphere in electrostatic equilibrium, the electric field is zero everywhere. Thus, the electric potential is uniform throughout its interior and equals the surface potential:\nV_in (r = 6 cm) = V_surface = k Q / R = V₀, where R = 12 cm.\n\nStep 2: For any external point at distance r > R:\nV(r) = k Q / r.\n\nStep 3: Expressing V(r) in terms of V_surface:\nV(r) = (k Q / R) × (R / r) = V₀ × (R / r).\n\nStep 4: At r = 18 cm:\nV(18 cm) = V₀ × (12 cm / 18 cm) = (2 / 3) V₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 170,
    data: {
      question: "A charged oil droplet of mass 4.0 × 10⁻⁵ kg remains suspended stationary in air in a uniform electric field of magnitude 2.0 × 10⁶ N C⁻¹ directed vertically downward. Taking g = 10 m s⁻², what is the charge on the droplet?",
      option_a: "−2.0 × 10⁻⁴ μC",
      option_b: "+2.0 × 10⁻⁴ μC",
      option_c: "−4.0 × 10⁻⁴ μC",
      option_d: "+4.0 × 10⁻⁴ μC",
      correct_option: "A",
      explanation: "Step 1: For the droplet to remain stationary in equilibrium, the upward electrostatic force must exactly balance the downward gravitational force:\nF_e = F_g => |q| E = m g.\n\nStep 2: Since the electric field E is directed vertically downward, an upward electrostatic force requires the charge on the droplet to be negative:\nq < 0.\n\nStep 3: Calculate the magnitude of charge |q|:\n|q| = (m g) / E = (4.0 × 10⁻⁵ kg × 10 m s⁻²) / (2.0 × 10⁶ N C⁻¹)\n|q| = 4.0 × 10⁻⁴ / 2.0 × 10⁶ = 2.0 × 10⁻¹⁰ C.\n\nStep 4: Convert to microcoulombs (μC):\n|q| = 2.0 × 10⁻⁴ μC => q = −2.0 × 10⁻⁴ μC.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 1 (Q1 to Q24)...');

  for (let i = 0; i < part1Questions.length; i++) {
    const item = part1Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part1Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part1Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 1 complete!');
}

main();
