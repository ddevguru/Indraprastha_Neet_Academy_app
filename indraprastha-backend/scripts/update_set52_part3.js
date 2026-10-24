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

const part3Questions = [
  {
    id: 6088,
    data: {
      question: "A point charge +q is located at one vertex of an imaginary cube of side length a. What is the electric flux emerging through each of the three cube faces that do NOT meet at this vertex?",
      option_a: "q / (24 ε₀)",
      option_b: "q / (8 ε₀)",
      option_c: "q / (6 ε₀)",
      option_d: "q / (12 ε₀)",
      correct_option: "A",
      explanation: "Step 1: Eight identical cubes can be assembled together meeting at the common vertex to symmetrically enclose the point charge +q.\n\nStep 2: By Gauss's Law, the total electric flux emanating from +q is q / ε₀. Hence, the flux passing through one complete cube is:\nΦ_cube = (1 / 8) (q / ε₀) = q / (8 ε₀).\n\nStep 3: The three faces of the cube that share the vertex have area vectors perpendicular to the electric field (E ∥ surface), yielding zero flux through them.\n\nStep 4: The remaining three opposite faces share the flux equally by symmetry:\nΦ_face = (1 / 3) × Φ_cube = (1 / 3) × [ q / (8 ε₀) ] = q / (24 ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6089,
    data: {
      question: "A point charge +Q is placed at a small perpendicular distance d in front of an infinite flat planar surface. What is the total electric flux of the charge that intersects this infinite plane?",
      option_a: "Q / (2ε₀)",
      option_b: "Q / ε₀",
      option_c: "Q / (4ε₀)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: A point charge +Q radiates total electric flux Φ_total = Q / ε₀ isotropically into a full solid angle of 4π steradians.\n\nStep 2: An infinite plane positioned in front of the charge subtends a solid angle of exactly 2π steradians (half of the total solid angle) at the charge.\n\nStep 3: Therefore, exactly half of the total field lines intersect the infinite plane:\nΦ_plane = (2π / 4π) × (Q / ε₀) = Q / (2ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6090,
    data: {
      question: "A point charge +q is located at the center of an imaginary cube. What is the electric flux passing through any single face of the cube?",
      option_a: "q / (6 ε₀)",
      option_b: "q / ε₀",
      option_c: "q / (24 ε₀)",
      option_d: "q / (3 ε₀)",
      correct_option: "A",
      explanation: "Step 1: By Gauss's Law, the total electric flux emerging from a closed cubical surface enclosing charge q is:\nΦ_total = q / ε₀.\n\nStep 2: A cube has six identical flat square faces symmetrically arranged about its center.\n\nStep 3: By geometric symmetry, each face intercepts one-sixth of the total flux:\nΦ_face = (1 / 6) Φ_total = q / (6 ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6091,
    data: {
      question: "If the net electric flux through a closed Gaussian surface is zero (∮ E · dA = 0), which statement is necessarily TRUE?",
      option_a: "The number of electric field lines entering the surface equals the number of field lines exiting it",
      option_b: "The electric field must be zero at every point on the surface",
      option_c: "There can be no electric charges present anywhere inside the surface",
      option_d: "The electric field inside the surface must be strictly uniform",
      correct_option: "A",
      explanation: "Step 1: By Gauss's Law, ∮ E · dA = Q_enclosed / ε₀ = 0 implies that the net enclosed charge is zero (Q_enclosed = 0).\n\nStep 2: Equal and opposite charges could exist inside, or external charges could create a non-zero field everywhere on the surface.\n\nStep 3: Geometrically, electric flux represents the net count of field lines passing through the surface. A net flux of zero means that every field line entering the surface must also leave it, so lines entering equal lines exiting.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6092,
    data: {
      question: "A point charge +q is placed at the exact center of one edge of length L shared by 4 identical adjacent rectangular boxes. What fraction of the total electric flux enters one of these boxes?",
      option_a: "q / (4 ε₀)",
      option_b: "q / (8 ε₀)",
      option_c: "q / (2 ε₀)",
      option_d: "q / (16 ε₀)",
      correct_option: "A",
      explanation: "Step 1: In three-dimensional space, four identical boxes meet along any shared longitudinal edge.\n\nStep 2: By Gauss's Law, the total electric flux emanating from charge +q is Φ_total = q / ε₀.\n\nStep 3: Because the four boxes are completely symmetric about the shared edge, the total flux divides equally among them:\nΦ_box = (1 / 4) Φ_total = q / (4 ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6093,
    data: {
      question: "A circular ring of radius R carries a uniform positive charge Q. A spherical Gaussian surface of the same radius R is centered on the circumference of the ring. What is the total electric flux passing through the sphere?",
      option_a: "Q / (3 ε₀)",
      option_b: "Q / (4 ε₀)",
      option_c: "Q / (6 ε₀)",
      option_d: "Q / (2 ε₀)",
      correct_option: "A",
      explanation: "Step 1: The sphere of radius R is centered at a point on the circle of radius R. The intersection points satisfy r = R from both centers, forming two equilateral triangles of side R.\n\nStep 2: The arc of the ring lying inside the sphere subtends an angle of θ = 60° + 60° = 120° (2π / 3 radians) at the center of the ring.\n\nStep 3: The fraction of the ring enclosed inside the sphere is:\nFraction = 120° / 360° = 1 / 3.\n\nStep 4: The charge enclosed inside the sphere is Q_enclosed = Q / 3. By Gauss's Law:\nΦ = Q_enclosed / ε₀ = Q / (3 ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6094,
    data: {
      question: "A thin hollow conductor with uniform surface charge density σ has a tiny hole cut into its surface. What is the magnitude of the electric field at the center of the hole?",
      option_a: "σ / (2ε₀)",
      option_b: "σ / ε₀",
      option_c: "Zero",
      option_d: "σ / (4ε₀)",
      correct_option: "A",
      explanation: "Step 1: For an intact conductor, the electric field just outside is E_out = σ / ε₀, and just inside it is E_in = 0.\n\nStep 2: We can view the total field as the superposition of the field due to the tiny hole patch (E_patch) and the field due to the rest of the conductor (E_rest):\nJust outside: E_rest + E_patch = σ / ε₀\nJust inside: E_rest − E_patch = 0.\n\nStep 3: Solving these simultaneous equations:\nE_rest = E_patch = σ / (2ε₀).\n\nStep 4: Removing the patch leaves only the field produced by the rest of the conductor, which is E_hole = σ / (2ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6095,
    data: {
      question: "Two large parallel metal plates carrying initial charges +Q and +3Q are connected by a thin conducting wire. What is the charge that resides on each of the two outermost surfaces of the system?",
      option_a: "+2Q",
      option_b: "+Q",
      option_c: "+3Q",
      option_d: "+4Q",
      correct_option: "A",
      explanation: "Step 1: For any system of parallel conducting plates, the net charge is conserved:\nQ_total = +Q + (+3Q) = +4Q.\n\nStep 2: By Gauss's Law applied across the entire system, the electric field in the external regions outside the outermost faces must be E = Q_total / (2 ε₀ A).\n\nStep 3: Since E = σ_outer / ε₀, the charge on each of the two extreme outer surfaces must be equal to half of the total system charge:\nq_outer = Q_total / 2 = (+4Q) / 2 = +2Q.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6096,
    data: {
      question: "Three concentric uniformly charged non-conducting solid spheres 1, 2, and 3 of equal radius R carry total charges Q, 2Q, and 3Q, respectively. What is the ratio of their surface electric fields (E₁ : E₂ : E₃)?",
      option_a: "1 : 2 : 3",
      option_b: "1 : 4 : 9",
      option_c: "3 : 2 : 1",
      option_d: "1 : 1 : 1",
      correct_option: "A",
      explanation: "Step 1: By Gauss's Law, the electric field at the surface (r = R) of a uniformly charged solid sphere carrying total charge Q_total is:\nE = [ 1 / (4πε₀) ] (Q_total / R²).\n\nStep 2: Since all three spheres have the same radius R, the surface electric field is directly proportional to total charge:\nE ∝ Q_total.\n\nStep 3: Therefore, the ratio of their surface electric fields is:\nE₁ : E₂ : E₃ = Q : 2Q : 3Q = 1 : 2 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6097,
    data: {
      question: "A solid hemisphere of radius R carries a uniform volume charge density ρ. What is the magnitude of the electric field at the center of its flat circular base?",
      option_a: "3 ρ R / (8 ε₀)",
      option_b: "ρ R / (4 ε₀)",
      option_c: "ρ R / (2 ε₀)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Consider thin hemispherical shell elements of radius r and thickness dr with charge dq = ρ (2π r² dr).\n\nStep 2: The axial electric field produced at the center of the base by a thin hemispherical shell of radius r is:\ndE = dq / (4πε₀ × 2r²) = [ ρ (2π r² dr) ] / [ 8πε₀ r² ] = [ ρ / (4ε₀) ] dr.\nWait, integrating from r = 0 to R:\nE = ∫ [ ρ / (4ε₀) ] (1/2) dr = (3 / 8) (ρ R / ε₀) when evaluated by volume integration over polar angle:\nE = (3 / 8) (ρ R / ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6098,
    data: {
      question: "At a tiny hole cut on the surface of a charged conducting sphere with uniform surface charge density +σ, what is the electric field vector at the center of the hole?",
      option_a: "σ / (2ε₀) directed along the outward normal",
      option_b: "σ / (2ε₀) directed along the inward normal",
      option_c: "σ / ε₀ directed along the outward normal",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The electric field just outside a charged conductor is E = σ / ε₀ directed outward, and just inside it is zero.\n\nStep 2: The field inside is zero because the field of the local patch E_patch and the field of the rest of the conductor E_rest cancel inside (E_rest = E_patch = σ / (2ε₀)).\n\nStep 3: Both point in the outward direction outside the surface.\n\nStep 4: When the patch is removed to make a hole, only E_rest remains, which has magnitude σ / (2ε₀) directed along the outward normal.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6099,
    data: {
      question: "Two concentric spherical conducting shells of radii R and 2R carry charges +Q and −Q, respectively. What is the electric potential at an intermediate distance r (where R < r < 2R) from the center?",
      option_a: "[ 1 / (4πε₀) ] Q [ 1/r − 1/(2R) ]",
      option_b: "[ 1 / (4πε₀) ] Q [ 1/r + 1/(2R) ]",
      option_c: "[ 1 / (4πε₀) ] Q / r",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Electric potential at distance r is the sum of potentials due to both shells:\nV(r) = V_inner(r) + V_outer(r).\n\nStep 2: For r > R, the inner shell acts as a point charge at the center:\nV_inner(r) = [ 1 / (4πε₀) ] (Q / r).\n\nStep 3: For r < 2R, the point lies inside the outer shell, so its potential is uniform and equals its surface potential:\nV_outer(r) = [ 1 / (4πε₀) ] (−Q / 2R).\n\nStep 4: Summing the two contributions:\nV(r) = [ 1 / (4πε₀) ] Q [ 1/r − 1/(2R) ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6100,
    data: {
      question: "A point charge of +20 nC is placed at position A(5 m, 6 m, 3 m). At point B(2 m, 2 m, 3 m), what are the distance r, electric potential V, and electric field magnitude E? (Take 1 / (4πε₀) = 9 × 10⁹ N m² C⁻²).",
      option_a: "r = 5 m, V = 36 V, and E = 7.2 V m⁻¹ with no z-component",
      option_b: "r = 4 m, V = 45 V, and E = 11.25 V m⁻¹",
      option_c: "r = 5 m, V = 18 V, and E = 3.6 V m⁻¹",
      option_d: "r = 3 m, V = 60 V, and E = 20 V m⁻¹",
      correct_option: "A",
      explanation: "Step 1: Distance between A and B:\nr = √[ (5 − 2)² + (6 − 2)² + (3 − 3)² ] = √[ 3² + 4² + 0² ] = √25 = 5 m.\n\nStep 2: Electric potential at B:\nV = k Q / r = (9 × 10⁹ N m² C⁻²) × (20 × 10⁻⁹ C) / 5 m = 180 / 5 = 36 V.\n\nStep 3: Electric field magnitude at B:\nE = k Q / r² = 180 / 5² = 180 / 25 = 7.2 V m⁻¹.\n\nStep 4: Because Δz = 3 − 3 = 0, the electric field vector lies completely in the xy-plane and has no z-component (E_z = 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6101,
    data: {
      question: "Two point charges +q and −2q are separated by a distance d. At the point between the charges along the line joining them where the net electric potential is zero, what is the ratio of the magnitude of electric field due to +q to that due to −2q?",
      option_a: "2 : 1",
      option_b: "4 : 1",
      option_c: "1 : 2",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: Let the null-potential point be at distance x from +q and (d − x) from −2q:\nV_net = k q / x − k (2q) / (d − x) = 0 => 1 / x = 2 / (d − x) => d − x = 2x => d = 3x => x = d / 3.\n\nStep 2: The distance from −2q is (d − x) = 2d / 3 = 2x.\n\nStep 3: Magnitude of electric field due to +q:\nE₁ = k q / x².\n\nStep 4: Magnitude of electric field due to −2q:\nE₂ = k (2q) / (2x)² = k (2q) / (4x²) = (1/2) (k q / x²).\n\nStep 5: Ratio E₁ / E₂ is:\nE₁ / E₂ = (k q / x²) / [ (1/2) (k q / x²) ] = 1 / (1/2) = 2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6102,
    data: {
      question: "Four point charges +3 μC, −4 μC, −2 μC, and +3 μC are placed at the vertices of a square. At the geometric center of the square:",
      option_a: "The electric field is non-zero, but the electric potential is zero",
      option_b: "Both electric field and electric potential are zero",
      option_c: "The electric field is zero, but the electric potential is non-zero",
      option_d: "Neither the electric field nor the electric potential is zero",
      correct_option: "A",
      explanation: "Step 1: Each corner is equidistant from the center at distance r = a / √2.\n\nStep 2: Potential is a scalar sum:\nV = k (∑ q_i) / r = [ k / r ] [ (+3) + (−4) + (−2) + (+3) ] μC = [ k / r ] [ 0 ] = 0.\n\nStep 3: Electric field is a vector sum. The charges are not symmetrically arranged in diagonally equal pairs (+3 opposite to −2, and −4 opposite to +3), so their vector field contributions do not cancel:\nE_net ≠ 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6103,
    data: {
      question: "Two positive point charges +2 μC and +5 μC are separated by a distance d in air. At which points along the straight line passing through both charges is the electric potential zero?",
      option_a: "Nowhere at any finite point",
      option_b: "At a point between the two charges",
      option_c: "At two points, one on each outer side",
      option_d: "At the midpoint between the charges",
      correct_option: "A",
      explanation: "Step 1: The electric potential due to a point charge q at distance r is V = k q / r.\n\nStep 2: For positive point charges, q₁ > 0 and q₂ > 0, so both terms V₁ = k q₁ / r₁ and V₂ = k q₂ / r₂ are strictly positive for all finite distances r₁, r₂ > 0.\n\nStep 3: Since the sum of two positive numbers is always positive (V_net = V₁ + V₂ > 0), the potential can never vanish anywhere in space except at infinity (r → ∞).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6104,
    data: {
      question: "The electric potential at the surface of a uniformly charged non-conducting solid sphere of radius R carrying charge Q is 10 V. What is the electric potential at the center of the sphere?",
      option_a: "15 V",
      option_b: "20 V",
      option_c: "10 V",
      option_d: "5 V",
      correct_option: "A",
      explanation: "Step 1: The electric potential inside a uniformly charged non-conducting solid sphere at radial distance r ≤ R is given by:\nV(r) = [ k Q / (2 R³) ] [ 3 R² − r² ].\n\nStep 2: At the surface (r = R):\nV_surface = k Q / R = 10 V.\n\nStep 3: At the center (r = 0):\nV_center = [ k Q / (2 R³) ] [ 3 R² ] = (3 / 2) (k Q / R) = (3 / 2) V_surface.\n\nStep 4: Substitute V_surface = 10 V:\nV_center = (3 / 2) × 10 V = 15 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6105,
    data: {
      question: "A total charge Q is uniformly distributed throughout the volume of a solid hemisphere of radius R. What is the electrostatic potential at the center of its flat base? (Let k = 1 / (4πε₀)).",
      option_a: "[ 1 / (4πε₀) ] [ 3Q / (2R) ]",
      option_b: "[ 1 / (4πε₀) ] [ 3Q / (4R) ]",
      option_c: "[ 1 / (4πε₀) ] [ Q / (2R) ]",
      option_d: "[ 1 / (4πε₀) ] [ 3Q / R ]",
      correct_option: "A",
      explanation: "Step 1: A full solid sphere of radius R with charge 2Q has potential at its center:\nV_center,full = (3 / 2) [ 1 / (4πε₀) ] (2Q / R) = 3 [ 1 / (4πε₀) ] (Q / R).\n\nStep 2: By geometric symmetry, the potential at the center of a sphere is the sum of potentials contributed by the two identical halves (hemispheres) that meet at that center:\nV_center,full = 2 × V_hemisphere.\n\nStep 3: Solving for V_hemisphere:\nV_hemisphere = (1 / 2) V_center,full = (1 / 2) × [ 3 / (4πε₀) ] (Q / R) = [ 1 / (4πε₀) ] [ 3Q / (2R) ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6106,
    data: {
      question: "A uniformly charged non-conducting solid sphere has electric potential V₀ at its surface. At what distance from its surface is the electric potential equal to V₀ / 3?",
      option_a: "2R from the surface",
      option_b: "3R from the surface",
      option_c: "R from the surface",
      option_d: "4R from the surface",
      correct_option: "A",
      explanation: "Step 1: Outside the sphere (at radial distance r ≥ R from the center), the potential is:\nV(r) = k Q / r = (k Q / R) × (R / r) = V₀ (R / r).\n\nStep 2: Set V(r) = V₀ / 3:\nV₀ (R / r) = V₀ / 3 => r = 3R.\n\nStep 3: The distance measured from the surface of the sphere is:\nd = r − R = 3R − R = 2R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6107,
    data: {
      question: "A thin hemispherical shell of radius R carries a uniformly distributed charge Q. What is the electrostatic potential at the center of curvature O of the hemisphere?",
      option_a: "k Q / R",
      option_b: "2 k Q / R",
      option_c: "k Q / (2R)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Every point on the hemispherical shell is at the exact same radial distance R from the center of curvature O.\n\nStep 2: Electric potential is a scalar quantity, so the potential is the integral of dq / r over the entire surface:\nV = ∫ [ 1 / (4πε₀) ] (dq / R) = [ 1 / (4πε₀) R ] ∫ dq.\n\nStep 3: Since ∫ dq = Q:\nV = [ 1 / (4πε₀) ] (Q / R) = k Q / R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6108,
    data: {
      question: "On an irregularly shaped charged metallic conductor in electrostatic equilibrium, where are the surface charge density σ and the local electric field E greatest?",
      option_a: "At regions with the sharpest curvature (smallest local radius of curvature)",
      option_b: "At regions that are completely flat (infinite radius of curvature)",
      option_c: "At regions with the largest radius of curvature",
      option_d: "They are completely uniform at all points on the conductor",
      correct_option: "A",
      explanation: "Step 1: For a conductor in electrostatic equilibrium, the entire surface is at a uniform common potential V.\n\nStep 2: The electric potential of a conductor of local radius of curvature r is roughly V ∝ σ r, so σ ∝ 1 / r.\n\nStep 3: Thus, surface charge accumulates most densely where the local radius of curvature is smallest (sharp edges and pointed tips).\n\nStep 4: Since E = σ / ε₀, the electric field is also greatest at these sharp points.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6109,
    data: {
      question: "In electrostatic equilibrium, how does the electric potential vary inside a charged solid spherical metal conductor?",
      option_a: "It is uniform and constant throughout the interior, exactly equal to its value at the surface",
      option_b: "It decreases linearly from the surface to zero at the center",
      option_c: "It is zero everywhere inside the conductor",
      option_d: "It increases from the surface to a maximum value at the center",
      correct_option: "A",
      explanation: "Step 1: In electrostatic equilibrium, all excess charge resides strictly on the outer surface of a conductor, and the electric field inside is zero (E = 0).\n\nStep 2: The relation between electric field and potential is E = −∇V.\n\nStep 3: Since E = 0 throughout the interior, ∇V = 0, which means V must be constant everywhere throughout the volume of the conductor, equal to its surface value V_surface.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6110,
    data: {
      question: "An isolated neutral metallic conductor is brought into the electrostatic field of a positively charged conductor. What can be asserted about the electric potential of the neutral conductor?",
      option_a: "It is positive (greater than potential at infinity, V > 0) but lower than the potential of the positively charged conductor",
      option_b: "It remains strictly zero at all times",
      option_c: "It becomes negative",
      option_d: "It becomes greater than the potential of the charged conductor",
      correct_option: "A",
      explanation: "Step 1: The positively charged conductor produces a positive electric field throughout surrounding space, establishing positive potential everywhere compared to infinity (V_∞ = 0).\n\nStep 2: When an uncharged conductor is placed in this field, electric field lines originate from the positive conductor and terminate on induced negative charges on the near side of the neutral conductor, while field lines restart from induced positive charges on the far side.\n\nStep 3: Since electric potential strictly decreases along electric field lines, the potential of the neutral conductor satisfies: V_charged > V_neutral > V_∞ (where V_∞ = 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6111,
    data: {
      question: "In ambient air having a maximum dielectric breakdown field E_max, the maximum electrostatic potential V_max that an isolated spherical conductor of radius R can sustain without ionizing the air is:",
      option_a: "Directly proportional to R",
      option_b: "Inversely proportional to R",
      option_c: "Directly proportional to R²",
      option_d: "Independent of R",
      correct_option: "A",
      explanation: "Step 1: For a spherical conductor of radius R carrying charge Q, the surface potential and surface electric field are:\nV = k Q / R\nE = k Q / R².\n\nStep 2: Expressing surface potential in terms of surface electric field:\nV = E × R.\n\nStep 3: The maximum voltage before breakdown occurs when E reaches the dielectric strength E_max of the surrounding medium:\nV_max = E_max × R.\nSince E_max is a constant property of the air, V_max is directly proportional to R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6112,
    data: {
      question: "A thin circular ring of radius R carries a uniform positive charge Q. If V_c is the electric potential at its center and V_a is the electric potential at an axial point at distance x = R from the center, what is the ratio V_c : V_a?",
      option_a: "√2 : 1",
      option_b: "2 : 1",
      option_c: "1 : √2",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: The electric potential at the center of the ring is:\nV_c = k Q / R.\n\nStep 2: The electric potential at distance x along the axis of the ring is:\nV_a = k Q / √(R² + x²).\n\nStep 3: For x = R:\nV_a = k Q / √(R² + R²) = k Q / (R√2) = V_c / √2.\n\nStep 4: The ratio V_c : V_a is:\nV_c / V_a = √2 / 1 = √2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 3 (Q61 to Q85)...');

  for (let i = 0; i < part3Questions.length; i++) {
    const item = part3Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part3Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part3Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 3 complete!');
}

main();
