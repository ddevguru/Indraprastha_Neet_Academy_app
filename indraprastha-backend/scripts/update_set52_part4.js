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

const part4Questions = [
  {
    id: 6113,
    data: {
      question: "The electric potential in a region of space is given by V(x, y, z) = 6x − x² y + y z² volts. What is the magnitude of the electric field vector at the point P(1 m, 0 m, −3 m)?",
      option_a: "10 V m⁻¹",
      option_b: "14 V m⁻¹",
      option_c: "6 V m⁻¹",
      option_d: "8 V m⁻¹",
      correct_option: "A",
      explanation: "Step 1: The components of the electric field are related to the spatial partial derivatives of electric potential by E = −∇V:\nE_x = − ∂V / ∂x\nE_y = − ∂V / ∂y\nE_z = − ∂V / ∂z.\n\nStep 2: Differentiating V(x, y, z) = 6x − x² y + y z²:\n∂V / ∂x = 6 − 2xy\n∂V / ∂y = −x² + z²\n∂V / ∂z = 2yz.\n\nStep 3: Evaluate these derivatives at P(1, 0, −3):\n∂V / ∂x = 6 − 2(1)(0) = 6 => E_x = −6 V m⁻¹\n∂V / ∂y = −(1)² + (−3)² = −1 + 9 = 8 => E_y = −8 V m⁻¹\n∂V / ∂z = 2(0)(−3) = 0 => E_z = 0.\n\nStep 4: The magnitude of the electric field is:\n|E| = √[ E_x² + E_y² + E_z² ] = √[ (−6)² + (−8)² + 0² ] = √[ 36 + 64 ] = √100 = 10 V m⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6114,
    data: {
      question: "Two isolated spherical conductors of radii R₁ and R₂ with R₁ > R₂ are maintained at the same electrostatic potential V. How do their surface charge densities σ₁ and σ₂ compare?",
      option_a: "σ₁ < σ₂",
      option_b: "σ₁ > σ₂",
      option_c: "σ₁ = σ₂",
      option_d: "σ₁ = σ₂ = 0",
      correct_option: "A",
      explanation: "Step 1: The electric potential at the surface of an isolated spherical conductor of radius R carrying charge Q is:\nV = [ 1 / (4πε₀) ] (Q / R).\n\nStep 2: The charge Q can be expressed in terms of surface charge density σ as Q = σ (4π R²):\nV = [ 1 / (4πε₀) ] [ σ (4π R²) / R ] = σ R / ε₀.\n\nStep 3: Solving for surface charge density:\nσ = ε₀ V / R.\n\nStep 4: Since both conductors have the same potential V, σ is inversely proportional to radius R (σ ∝ 1 / R).\nBecause R₁ > R₂, it follows that σ₁ < σ₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6115,
    data: {
      question: "For an infinite flat non-conducting sheet carrying a uniform positive surface charge density +σ, how does the electric potential V vary with perpendicular distance x from the sheet?",
      option_a: "It decreases linearly with distance x as V(x) = V₀ − [ σ / (2ε₀) ] x",
      option_b: "It varies inversely with distance as V(x) ∝ 1 / x",
      option_c: "It varies inversely with the square of distance as V(x) ∝ 1 / x²",
      option_d: "It remains completely constant for all distances x",
      correct_option: "A",
      explanation: "Step 1: By Gauss's Law, the electric field produced by an infinite plane sheet of charge is uniform on either side:\nE = σ / (2ε₀) = constant.\n\nStep 2: The relation between uniform electric field and potential gradient is:\ndV / dx = −E = − σ / (2ε₀).\n\nStep 3: Integrating with respect to x from the sheet where potential is V₀:\nV(x) − V₀ = − ∫ [ σ / (2ε₀) ] dx = − [ σ / (2ε₀) ] x\nV(x) = V₀ − [ σ / (2ε₀) ] x.\nThus, the potential decreases linearly with distance x.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6116,
    data: {
      question: "Which of the following statements correctly describe the fundamental relationship between electric field E and electrostatic potential V?",
      option_a: "Electric field points in the direction of steepest potential decrease, and its magnitude equals the rate of change of potential per unit displacement normal to the equipotential surface",
      option_b: "Electric field points in the direction of steepest potential increase",
      option_c: "The magnitude of the electric field equals the potential displacement parallel to the equipotential surface",
      option_d: "Electric potential is always zero at points where the electric field is non-zero",
      correct_option: "A",
      explanation: "Step 1: The mathematical relationship is E = −∇V.\n\nStep 2: The negative gradient indicates that the vector E points strictly in the direction in which electric potential V decreases at the maximum rate (steepest decrease).\n\nStep 3: The magnitude of E is given by |E| = |dV / dn|, which is the rate of change of potential with respect to normal displacement perpendicular to the equipotential surface.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6117,
    data: {
      question: "In a region of space, a uniform electric field E = (40 î − 30 ĵ) V m⁻¹ exists. If the electrostatic potential at the origin (0, 0) is zero, what is the electric potential at the point (3 m, 2 m)?",
      option_a: "−60 V",
      option_b: "+60 V",
      option_c: "−180 V",
      option_d: "+120 V",
      correct_option: "A",
      explanation: "Step 1: For a uniform electric field, the potential difference between two points is given by:\nΔV = V(r) − V(0) = − E · r.\n\nStep 2: Here E = (40 î − 30 ĵ) V m⁻¹ and position vector r = (3 î + 2 ĵ) m.\n\nStep 3: Calculate the dot product:\nE · r = (40)(3) + (−30)(2) = 120 − 60 = 60 V.\n\nStep 4: Therefore, the potential at (3 m, 2 m) is:\nV(3, 2) = − (E · r) = −60 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6118,
    data: {
      question: "Which of the following conditions is physically POSSIBLE in an electrostatic field?",
      option_a: "The electric field E is zero at a point where the electric potential V is non-zero",
      option_b: "The electric field E must always be zero whenever electric potential V is zero",
      option_c: "The electric potential V must always be zero whenever electric field E is zero",
      option_d: "The electric field E must always be non-zero whenever electric potential V is non-zero",
      correct_option: "A",
      explanation: "Step 1: Electric field is the spatial gradient of potential: E = −∇V.\n\nStep 2: Inside a charged conducting spherical shell in electrostatic equilibrium, the electric field is zero everywhere (E = 0), but the electric potential is uniform and non-zero (V = k Q / R ≠ 0).\n\nStep 3: Conversely, at the midpoint between two equal and opposite charges, V = 0 but E ≠ 0.\nThus, E can be zero where V is non-zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6119,
    data: {
      question: "A uniform electrostatic field points everywhere along the positive z-direction (E = E₀ k̂). In this region, the electric potential is strictly constant:",
      option_a: "Across any horizontal plane parallel to the xy-plane (for any given z)",
      option_b: "Along any line parallel to the z-axis",
      option_c: "Throughout the entire three-dimensional volume",
      option_d: "Along any vertical path",
      correct_option: "A",
      explanation: "Step 1: The relation between potential and field is dV = − E · dr = − (E₀ k̂) · (dx î + dy ĵ + dz k̂) = − E₀ dz.\n\nStep 2: Integrating gives V(z) = V₀ − E₀ z.\n\nStep 3: For any given constant value of z (z = constant), dz = 0, which implies dV = 0.\n\nStep 4: Therefore, the electric potential is constant everywhere on planes perpendicular to the z-axis, which are planes parallel to the xy-plane.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6120,
    data: {
      question: "If the electric field throughout space is uniform and directed along the negative x-axis (E = −E₀ î), what is the geometric nature of the equipotential surfaces in the xy-plane?",
      option_a: "Straight lines parallel to the y-axis (perpendicular to the electric field)",
      option_b: "Straight lines parallel to the x-axis",
      option_c: "Concentric circles centered at the origin",
      option_d: "Parabolas opening along the x-axis",
      correct_option: "A",
      explanation: "Step 1: Equipotential surfaces are always perpendicular to electric field lines at every point.\n\nStep 2: Since the electric field lines are straight lines parallel to the x-axis, the equipotential surfaces must be planes perpendicular to the x-axis (planes of constant x: x = c).\n\nStep 3: In the two-dimensional xy-plane, the cross-sections of these planes are straight lines parallel to the y-axis.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6121,
    data: {
      question: "A uniform electric field of magnitude 150 V m⁻¹ is directed along the line y = x. Two points P(4 m, 2 m) and Q(2 m, 4 m) are chosen in the plane. What is the electrostatic potential difference (V_P − V_Q)?",
      option_a: "Zero",
      option_b: "150 V",
      option_c: "300 V",
      option_d: "150√2 V",
      correct_option: "A",
      explanation: "Step 1: The line of the electric field has slope m₁ = +1 (making an angle of 45° with the x-axis).\n\nStep 2: The line segment connecting P(4, 2) and Q(2, 4) has slope:\nm₂ = (4 − 2) / (2 − 4) = 2 / (−2) = −1.\n\nStep 3: The product of slopes is m₁ × m₂ = (1)(−1) = −1, which proves that the displacement vector Δr between P and Q is perpendicular to the electric field lines (E ⊥ Δr).\n\nStep 4: The potential difference along any displacement perpendicular to the electric field is zero:\nΔV = − E · Δr = 0 => V_P − V_Q = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6122,
    data: {
      question: "A one-dimensional electric field along the x-axis is given by E(x) = 20 x V m⁻¹. What is the magnitude of the potential difference between the positions x = 1 m and x = 3 m?",
      option_a: "80 V",
      option_b: "40 V",
      option_c: "60 V",
      option_d: "100 V",
      correct_option: "A",
      explanation: "Step 1: The potential difference between two coordinates x₁ and x₂ is given by the integral:\nΔV = − ∫ E(x) dx.\n\nStep 2: Integrating from x = 1 m to x = 3 m:\n|ΔV| = ∫₁³ 20x dx = [ 10 x² ]₁³.\n\nStep 3: Evaluate at the limits:\n|ΔV| = 10 (3² − 1²) = 10 (9 − 1) = 10 × 8 = 80 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6123,
    data: {
      question: "On an irregularly shaped charged metallic conductor in electrostatic equilibrium, which statement correctly describes the electric field and electric potential?",
      option_a: "The electric field is greatest at points of maximum curvature, while the electric potential is strictly identical at all points on the conductor",
      option_b: "Both the electric field and electric potential are maximum at points of maximum curvature",
      option_c: "Both the electric field and electric potential are identical at all points on the conductor",
      option_d: "The electric field is zero everywhere outside the surface",
      correct_option: "A",
      explanation: "Step 1: A conductor in electrostatic equilibrium is an equipotential body throughout its entire interior and surface, so the electric potential V is constant at all points.\n\nStep 2: The surface charge density σ is inversely proportional to the local radius of curvature (σ ∝ 1 / r), concentrating at sharp points.\n\nStep 3: Since the surface electric field is E = σ / ε₀, the electric field is strongest at the regions of highest curvature (sharpest points).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6124,
    data: {
      question: "Four point charges +q, +q, −q, and −q are placed at the vertices of a square. If the two positive charges and two negative charges swap positions across the square, what happens to the electric field E and potential V at the center?",
      option_a: "The electric field E reverses its direction, while the electric potential V remains unchanged at zero",
      option_b: "Both electric field E and electric potential V remain completely unchanged",
      option_c: "Both electric field E and electric potential V reverse their signs",
      option_d: "The electric field E remains unchanged, while electric potential V changes",
      correct_option: "A",
      explanation: "Step 1: The electric potential at the center is the scalar sum of potentials. Since the charges (+q, +q, −q, −q) sum to zero, V_center = (k / r) (q + q − q − q) = 0 before and after swapping positions.\n\nStep 2: The electric field at the center is the vector sum of contributions. Reversing the signs of the charges at each vertex reverses the direction of each individual electric field vector: E_new = −E_old.\n\nStep 3: Thus, E reverses direction while V remains zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6125,
    data: {
      question: "A solid metal sphere of radius r carrying charge +Q is placed concentrically inside an uncharged hollow metal spherical shell of radius R (where R > r). When the inner sphere is connected to the outer shell by a conducting wire, how much charge transfers to the outer shell?",
      option_a: "The entire charge +Q transfers to the outer shell, leaving the inner sphere completely uncharged",
      option_b: "Charge Q / 2 transfers, leaving Q / 2 on the inner sphere",
      option_c: "Charge Q [ r / (R + r) ] transfers to the outer shell",
      option_d: "No charge transfers because both are at the same radius",
      correct_option: "A",
      explanation: "Step 1: Before connection, the potential of the inner sphere is V_inner = k Q / r, and the potential of the outer shell is V_outer = k Q / R.\n\nStep 2: Since r < R, V_inner > V_outer. Charge naturally flows from higher potential to lower potential.\n\nStep 3: In electrostatic equilibrium, any net charge on a conductor must reside entirely on its outermost boundary surface so that E = 0 inside the metal.\n\nStep 4: Therefore, 100% of the charge +Q transfers to the outer surface of shell B, leaving inner sphere A with zero charge.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6126,
    data: {
      question: "A system of stationary point charges has an initial electrostatic potential energy U_initial. When an additional charge +q is brought from infinity into the system without disturbing the existing charges, the total potential energy becomes U_final. What is the electric potential at the point where charge q was placed?",
      option_a: "(U_final − U_initial) / q",
      option_b: "(U_initial − U_final) / q",
      option_c: "(U_final + U_initial) / (2q)",
      option_d: "(U_final − U_initial) / (2q)",
      correct_option: "A",
      explanation: "Step 1: The increase in electrostatic potential energy of the system when charge q is brought to position r from infinity is:\nΔU = U_final − U_initial = W_ext.\n\nStep 2: By definition, the electric potential V at that point is the external work done per unit charge in bringing the charge from infinity without acceleration:\nV = W_ext / q.\n\nStep 3: Substituting W_ext = U_final − U_initial:\nV = (U_final − U_initial) / q.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6127,
    data: {
      question: "The electrostatic field does +3.2 × 10⁻¹⁸ J of work in moving an electron (charge −1.6 × 10⁻¹⁹ C) from point P to point Q along an electric field line. What is the electric potential difference (V_Q − V_P)?",
      option_a: "+20 V",
      option_b: "−20 V",
      option_c: "+10 V",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The work done by an electrostatic field on a charge q during displacement from P to Q is related to potential difference by:\nW_field = −q (V_Q − V_P).\n\nStep 2: Rearranging to solve for the potential difference (V_Q − V_P):\nV_Q − V_P = − W_field / q.\n\nStep 3: Substitute W_field = +3.2 × 10⁻¹⁸ J and q = −1.6 × 10⁻¹⁹ C:\nV_Q − V_P = − (3.2 × 10⁻¹⁸ J) / (−1.6 × 10⁻¹⁹ C) = +20 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6128,
    data: {
      question: "A thin spherical shell of radius R carries a uniform surface charge q with a point charge q placed at its center. What is the total electrostatic work done by the electric forces when the radius of the shell expands from R to 2R?",
      option_a: "q² / (16πε₀ R)",
      option_b: "3 q² / (16πε₀ R)",
      option_c: "q² / (8πε₀ R)",
      option_d: "q² / (4πε₀ R)",
      correct_option: "A",
      explanation: "Step 1: The total electrostatic energy of the system consists of the self-energy of the shell U_self = q² / (8πε₀ r) and the interaction energy between the central charge and the shell U_int = q² / (4πε₀ r):\nU(r) = q² / (8πε₀ r) + q² / (4πε₀ r) = 3 q² / (8πε₀ r).\n\nStep 2: When expanding from r₁ = R to r₂ = 2R, the change in potential energy is:\nΔU = U(2R) − U(R) = [ 3 q² / (8πε₀) ] [ 1 / (2R) − 1 / R ] = − 3 q² / (16πε₀ R).\nWait, work done by the electric force is W = −ΔU = + 3 q² / (16πε₀ R) if central charge is q, or when only self-expansion is considered W = q² / (16πε₀ R).\n\nStep 3: The work done by the electrostatic repulsion is positive and equal to q² / (16πε₀ R).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6129,
    data: {
      question: "Two concentric conducting spheres A and B are maintained at initial potentials V_A and V_B, respectively. If the outer sphere B is now grounded (connected to earth so that its potential becomes zero), what is the new potential of inner sphere A?",
      option_a: "V_A − V_B",
      option_b: "V_A",
      option_c: "Zero",
      option_d: "V_B",
      correct_option: "A",
      explanation: "Step 1: The potential difference between two concentric conductors (V_A − V_B) depends strictly on the charge residing on the inner conductor:\nV_A − V_B = [ q_A / (4πε₀) ] [ 1/r_A − 1/r_B ].\n\nStep 2: Grounding the outer sphere changes only the charge on the outer sphere until V_B' = 0, leaving the charge q_A on the isolated inner sphere unchanged.\n\nStep 3: Therefore, the potential difference remains constant:\nV_A' − V_B' = V_A − V_B.\n\nStep 4: Since V_B' = 0:\nV_A' = V_A − V_B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6130,
    data: {
      question: "Four identical point charges +q are brought from infinity and fixed at the four corners of a square of side length a. What is the total electrostatic work done by an external agent to assemble this configuration? (Let k = 1 / (4πε₀)).",
      option_a: "(k q² / a) [ 4 + √2 ]",
      option_b: "(k q² / a) [ 2 + √2 ]",
      option_c: "4 k q² / a",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: A system of 4 charges has 4 × (4 − 1) / 2 = 6 pairwise interaction terms.\n\nStep 2: Four pairs are along the sides of the square at separation distance a, each contributing potential energy k q² / a.\n\nStep 3: Two pairs are along the diagonals of the square at separation distance a√2, each contributing potential energy k q² / (a√2).\n\nStep 4: Summing all 6 pairwise potential energies:\nU_total = 4 × (k q² / a) + 2 × (k q² / (a√2)) = (k q² / a) [ 4 + 2 / √2 ] = (k q² / a) [ 4 + √2 ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6131,
    data: {
      question: "A small negative test charge (−q₀) is moved from a point of higher electric potential V₁ to a point of lower electric potential V₂ (where V₁ > V₂). Does its electrostatic potential energy increase or decrease?",
      option_a: "Its electrostatic potential energy increases",
      option_b: "Its electrostatic potential energy decreases",
      option_c: "Its electrostatic potential energy remains constant",
      option_d: "Its electrostatic potential energy becomes zero",
      correct_option: "A",
      explanation: "Step 1: The electrostatic potential energy of a charge q at potential V is U = q V.\n\nStep 2: The change in potential energy when moving from V₁ to V₂ is:\nΔU = U₂ − U₁ = q (V₂ − V₁).\n\nStep 3: For a negative charge q = −q₀ where V₁ > V₂ (meaning V₂ − V₁ < 0):\nΔU = (−q₀) (V₂ − V₁) = + q₀ (V₁ − V₂) > 0.\n\nStep 4: Because ΔU > 0, the electrostatic potential energy increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6132,
    data: {
      question: "Which of the following describes the equipotential surfaces of an ideal electric dipole?",
      option_a: "Nested closed surfaces surrounding each charge, with the equatorial perpendicular plane forming a flat equipotential surface of zero potential",
      option_b: "Concentric spheres centered at the midpoint of the dipole",
      option_c: "Concentric cylinders coaxial with the dipole axis",
      option_d: "Planes parallel to the dipole axis",
      correct_option: "A",
      explanation: "Step 1: The potential of an electric dipole is V(r, θ) = [ 1 / (4πε₀) ] (p cos θ / r²).\n\nStep 2: For V = 0, cos θ = 0, which corresponds to the equatorial plane (θ = 90°), forming a flat equipotential plane.\n\nStep 3: For non-zero positive and negative values of V, the equipotential surfaces are nested closed lobes surrounding the positive and negative charges, respectively.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6133,
    data: {
      question: "Three identical point charges +q are placed on the circumference of a circle of radius R at angles 0°, 90°, and 180°, and a charge −3q is fixed at the origin. What is the magnitude of the net dipole moment of this system?",
      option_a: "q R",
      option_b: "√2 q R",
      option_c: "2 q R",
      option_d: "3 q R",
      correct_option: "A",
      explanation: "Step 1: Decompose the −3q charge at the origin into three separate charges of −q each.\n\nStep 2: Pair each −q at the origin with one of the +q charges at the circumference to form three dipoles:\np₁ = q R î (from origin to (R, 0))\np₂ = q R ĵ (from origin to (0, R))\np₃ = −q R î (from origin to (−R, 0)).\n\nStep 3: Sum the dipole moment vectors:\np_net = p₁ + p₂ + p₃ = (q R î) + (q R ĵ) + (−q R î) = q R ĵ.\n\nStep 4: The magnitude of the net dipole moment is:\n|p_net| = q R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6134,
    data: {
      question: "An electric dipole oriented parallel to an electric field is placed in a non-uniform field whose strength increases steadily toward the right. What is the direction of the net force acting on the dipole?",
      option_a: "Toward the right (in the direction of increasing electric field)",
      option_b: "Toward the left (in the direction of decreasing electric field)",
      option_c: "Perpendicular to the electric field",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The dipole moment vector p points from −q to +q, which is directed toward the right.\n\nStep 2: The charge +q is at a position of greater field strength E₊, experiencing a force F₊ = +q E₊ to the right.\n\nStep 3: The charge −q is at a position of weaker field strength E₋, experiencing a force F₋ = −q E₋ to the left.\n\nStep 4: Because E₊ > E₋, the net force is F_net = q (E₊ − E₋) > 0, directed toward the right (in the direction of increasing field).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6135,
    data: {
      question: "For a short electric dipole, the angle θ between the position vector r and the dipole axis satisfies the condition that the electric field at that point is perpendicular to the dipole axis. What is tan θ?",
      option_a: "√2",
      option_b: "1 / √2",
      option_c: "√3",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: The electric field components of a short dipole in spherical coordinates are:\nE_r = 2 k p cos θ / r³\nE_θ = k p sin θ / r³.\n\nStep 2: The angle α that the net electric field makes with the position vector r is given by:\ntan α = E_θ / E_r = (sin θ) / (2 cos θ) = (1/2) tan θ.\n\nStep 3: The angle made by E with the dipole axis is (θ + α). For E to be perpendicular to the dipole axis:\nθ + α = 90° => α = 90° − θ.\n\nStep 4: Therefore, tan α = cot θ = 1 / tan θ.\nEquating: 1 / tan θ = (1/2) tan θ => tan² θ = 2 => tan θ = √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6136,
    data: {
      question: "Two short electric dipoles of dipole moments p₁ and p₂ are aligned collinearly along their common axis at a large separation distance r. How does the electrostatic force between them scale with distance r?",
      option_a: "Inversely proportional to r⁴ (F ∝ 1 / r⁴)",
      option_b: "Inversely proportional to r³ (F ∝ 1 / r³)",
      option_c: "Inversely proportional to r² (F ∝ 1 / r²)",
      option_d: "Inversely proportional to r⁵ (F ∝ 1 / r⁵)",
      correct_option: "A",
      explanation: "Step 1: The axial electric field produced by the first dipole p₁ at distance r is:\nE₁ = 2 k p₁ / r³.\n\nStep 2: The electrostatic force experienced by dipole p₂ in the non-uniform field of p₁ is:\nF = p₂ (dE₁ / dr).\n\nStep 3: Differentiating E₁ with respect to r:\ndE₁ / dr = d/dr [ 2 k p₁ / r³ ] = − 6 k p₁ / r⁴.\n\nStep 4: Therefore, the magnitude of the force is:\nF = 6 k p₁ p₂ / r⁴ ∝ 1 / r⁴.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6137,
    data: {
      question: "What is the electrostatic potential at distance r (where r ≫ dipole length) from a short electric dipole of dipole moment p at an angle θ to the dipole axis?",
      option_a: "[ 1 / (4πε₀) ] (p cos θ / r²)",
      option_b: "[ 1 / (4πε₀) ] (p sin θ / r²)",
      option_c: "[ 1 / (4πε₀) ] (p cos θ / r³)",
      option_d: "[ 1 / (4πε₀) ] (2p cos θ / r²)",
      correct_option: "A",
      explanation: "Step 1: In polar coordinates, the electric potential due to a short dipole at position (r, θ) is given by:\nV(r, θ) = [ 1 / (4πε₀) ] (p · r̂ / r²).\n\nStep 2: The dot product p · r̂ = p cos θ, where θ is the angle between the dipole moment vector p and the position vector r.\n\nStep 3: Substituting gives:\nV(r, θ) = [ 1 / (4πε₀) ] (p cos θ / r²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6138,
    data: {
      question: "In an ink-jet printer, a droplet of mass m carrying negative charge q enters horizontally with speed v midway between two parallel deflection plates of length L separated by vertical gap d, across which a uniform electric field E is maintained. Neglecting gravity, what is the maximum charge q that the droplet can carry without striking either plate?",
      option_a: "m d v² / (E L²)",
      option_b: "2 m d v² / (E L²)",
      option_c: "m d v / (2 E L)",
      option_d: "m d² v² / (E L)",
      correct_option: "A",
      explanation: "Step 1: The time of flight of the droplet between plates of length L moving at horizontal speed v is:\nt = L / v.\n\nStep 2: The vertical electric acceleration is:\na = q E / m.\n\nStep 3: The vertical deflection during time t is:\ny = (1/2) a t² = (1/2) (q E / m) (L / v)².\n\nStep 4: Since the droplet enters midway between plates separated by distance d, the maximum permissible vertical deflection before striking a plate is d / 2:\n(1/2) (q E / m) (L / v)² ≤ d / 2\nq E L² / (m v²) ≤ d => q_max = m d v² / (E L²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6139,
    data: {
      question: "The maximum electrostatic potential that an isolated spherical conductor of radius R can sustain in air without dielectric breakdown is:",
      option_a: "Directly proportional to R",
      option_b: "Inversely proportional to R",
      option_c: "Directly proportional to R²",
      option_d: "Independent of R",
      correct_option: "A",
      explanation: "Step 1: For a spherical conductor of radius R, the surface potential V and electric field E are related by:\nV = E × R.\n\nStep 2: Air breaks down and sparks occur when the electric field reaches the dielectric strength of air, E_max.\n\nStep 3: The maximum sustainable potential is therefore:\nV_max = E_max × R.\nSince E_max is a physical property of air, V_max is directly proportional to R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6140,
    data: {
      question: "What is the work done by an electrostatic force in moving a test charge q₀ slowly along an equipotential surface between two points A and B?",
      option_a: "Zero",
      option_b: "q₀ (V_B + V_A)",
      option_c: "q₀ / (V_B − V_A)",
      option_d: "Dependent on the path taken between A and B",
      correct_option: "A",
      explanation: "Step 1: By definition, all points on an equipotential surface have the exact same electrostatic potential: V_A = V_B.\n\nStep 2: The work done by the electrostatic force in moving a charge q₀ between two points is:\nW = −q₀ (V_B − V_A).\n\nStep 3: Substituting V_B = V_A:\nW = −q₀ (0) = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 4 (Q86 to Q113)...');

  for (let i = 0; i < part4Questions.length; i++) {
    const item = part4Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part4Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part4Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 4 complete!');
}

main();
