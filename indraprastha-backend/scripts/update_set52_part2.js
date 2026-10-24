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
    id: 298,
    data: {
      question: "A parallel plate capacitor of capacitance C₀ stores electrostatic energy U₀ with air between its plates. It is charged, disconnected from the battery, and then a dielectric slab of constant K = 4 is inserted to fill the entire space between the plates. What are the new capacitance and stored energy?",
      option_a: "4 C₀ and U₀ / 4",
      option_b: "4 C₀ and 4 U₀",
      option_c: "C₀ / 4 and U₀ / 4",
      option_d: "C₀ / 4 and 4 U₀",
      correct_option: "A",
      explanation: "Step 1: Introducing a dielectric of constant K increases capacitance by a factor of K:\nC' = K C₀ = 4 C₀.\n\nStep 2: Since the battery was disconnected, the stored charge Q remains constant.\n\nStep 3: Stored electrostatic energy with constant charge is:\nU' = Q² / (2 C') = Q² / [2 (4 C₀)] = [ Q² / (2 C₀) ] / 4 = U₀ / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 301,
    data: {
      question: "A parallel plate capacitor with plate area A and separation distance d is charged to potential V₀ and then isolated from the battery. A dielectric slab of constant K is inserted to fill the capacitor. What is the new electrostatic potential energy stored in the capacitor?",
      option_a: "ε₀ A V₀² / (2 K d)",
      option_b: "K ε₀ A V₀² / (2 d)",
      option_c: "ε₀ A V₀² / (2 d)",
      option_d: "ε₀ A V₀² / (K d)",
      correct_option: "A",
      explanation: "Step 1: The initial charge on the capacitor is:\nQ₀ = C₀ V₀ = (ε₀ A / d) V₀.\n\nStep 2: Upon insertion of the dielectric slab, the capacitance becomes C = K C₀ = K ε₀ A / d.\n\nStep 3: The battery is disconnected, so the charge remains Q₀. The stored electrostatic energy is:\nU = Q₀² / (2C) = [ (ε₀ A V₀ / d)² ] / [ 2 (K ε₀ A / d) ] = ε₀ A V₀² / (2 K d).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 303,
    data: {
      question: "Two dielectric slabs of thicknesses d₁ and d₂ with dielectric constants K₁ and K₂ completely fill the space between parallel capacitor plates of area A (where total separation d = d₁ + d₂). What is the capacitance of this compound capacitor?",
      option_a: "ε₀ A / [ (d₁ / K₁) + (d₂ / K₂) ]",
      option_b: "ε₀ A [ (K₁ / d₁) + (K₂ / d₂) ]",
      option_c: "(K₁ + K₂) ε₀ A / (d₁ + d₂)",
      option_d: "ε₀ A / [ K₁ d₁ + K₂ d₂ ]",
      correct_option: "A",
      explanation: "Step 1: The two dielectric slabs stacked one above the other between the plates act as two capacitors connected in series.\n\nStep 2: The capacitance of each section is:\nC₁ = K₁ ε₀ A / d₁ and C₂ = K₂ ε₀ A / d₂.\n\nStep 3: For capacitors in series, the reciprocal of the equivalent capacitance is:\n1 / C_eq = 1 / C₁ + 1 / C₂ = d₁ / (K₁ ε₀ A) + d₂ / (K₂ ε₀ A) = [ (d₁ / K₁) + (d₂ / K₂) ] / (ε₀ A).\n\nStep 4: Inverting gives:\nC_eq = ε₀ A / [ (d₁ / K₁) + (d₂ / K₂) ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 306,
    data: {
      question: "Two identical alpha particles (each carrying charge +2e) are placed at different positions in the uniform electric field between the oppositely charged plates of a parallel plate capacitor. What is the ratio of the electrostatic forces experienced by the two particles?",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: The electric field E between two large oppositely charged parallel plates is uniform throughout the space between them (E = σ / ε₀ = constant).\n\nStep 2: The electrostatic force on a charged particle in an electric field is:\nF = q E.\n\nStep 3: Because both alpha particles have the exact same charge (q₁ = q₂ = +2e) and experience the exact same uniform electric field E, the forces are identical:\nF₁ = F₂ => F₁ : F₂ = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 309,
    data: {
      question: "A parallel plate capacitor has a uniform electric field of 2 × 10⁴ V m⁻¹ between its plates. If the charge on each plate is 4 μC, what is the magnitude of the electrostatic force of attraction between the plates?",
      option_a: "0.04 N",
      option_b: "0.08 N",
      option_c: "0.02 N",
      option_d: "0.40 N",
      correct_option: "A",
      explanation: "Step 1: The total electric field between the plates is E = σ / ε₀.\n\nStep 2: Each single plate produces an electric field of magnitude E_single = σ / (2ε₀) = E / 2.\n\nStep 3: The electrostatic force exerted by one plate on the charge Q residing on the other plate is:\nF = Q × E_single = (1/2) Q E.\n\nStep 4: Substitute Q = 4 × 10⁻⁶ C and E = 2 × 10⁴ V m⁻¹:\nF = (1/2) × (4 × 10⁻⁶ C) × (2 × 10⁴ V m⁻¹) = 0.04 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 320,
    data: {
      question: "What is the total electrostatic potential energy stored in the electric field of an air-filled parallel plate capacitor having plate area A and separation distance d, charged to potential difference V₀?",
      option_a: "ε₀ A V₀² / (2d)",
      option_b: "ε₀ A V₀² / d",
      option_c: "2 ε₀ A V₀² / d",
      option_d: "ε₀ A V₀² / (4d)",
      correct_option: "A",
      explanation: "Step 1: The capacitance of the air-filled parallel plate capacitor is:\nC = ε₀ A / d.\n\nStep 2: The electrostatic potential energy stored in a capacitor charged to potential difference V₀ is:\nU = (1/2) C V₀².\n\nStep 3: Substituting C = ε₀ A / d:\nU = (1/2) (ε₀ A / d) V₀² = ε₀ A V₀² / (2d).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 321,
    data: {
      question: "A parallel plate capacitor with plate separation 1 mm is charged to a potential difference of 200 V. What is the electrostatic energy density in the region between the plates? (Take ε₀ = 8.85 × 10⁻¹² F m⁻¹).",
      option_a: "0.18 J m⁻³",
      option_b: "0.36 J m⁻³",
      option_c: "1.80 J m⁻³",
      option_d: "0.09 J m⁻³",
      correct_option: "A",
      explanation: "Step 1: The electric field strength between the plates is:\nE = V / d = 200 V / (1 × 10⁻³ m) = 2 × 10⁵ V m⁻¹.\n\nStep 2: The electrostatic energy density (energy per unit volume) in an electric field is:\nu = (1/2) ε₀ E².\n\nStep 3: Substitute the numerical values:\nu = (1/2) × (8.85 × 10⁻¹² F m⁻¹) × (2 × 10⁵ V m⁻¹)²\nu = 0.5 × 8.85 × 10⁻¹² × 4 × 10¹⁰ = 1.77 × 10⁻¹ J m⁻³ ≈ 0.18 J m⁻³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 322,
    data: {
      question: "Four identical parallel conducting plates of area A are spaced equally at distance d apart in air. Alternate plates are connected to terminals A and B. What is the equivalent capacitance of this combination?",
      option_a: "3 ε₀ A / d",
      option_b: "4 ε₀ A / d",
      option_c: "2 ε₀ A / d",
      option_d: "ε₀ A / d",
      correct_option: "A",
      explanation: "Step 1: Four parallel plates placed successively with alternate connections form (4 − 1) = 3 independent capacitor pairs.\n\nStep 2: Each consecutive pair of plates has plate area A, separation d, and air dielectric, giving capacitance C₀ = ε₀ A / d.\n\nStep 3: Because alternating plates are joined together, all 3 capacitor units are connected in parallel across terminals A and B:\nC_eq = 3 × C₀ = 3 ε₀ A / d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 323,
    data: {
      question: "Three capacitors of capacitances 2 μF, 4 μF, and 4 μF are connected first in series and then in parallel. What is the ratio of their series equivalent capacitance to their parallel equivalent capacitance (C_s : C_p)?",
      option_a: "1 : 10",
      option_b: "1 : 5",
      option_c: "1 : 20",
      option_d: "2 : 5",
      correct_option: "A",
      explanation: "Step 1: In series connection:\n1 / C_s = 1 / 2 + 1 / 4 + 1 / 4 = 1 / 2 + 2 / 4 = 1 / 2 + 1 / 2 = 1 => C_s = 1.0 μF.\n\nStep 2: In parallel connection:\nC_p = 2 + 4 + 4 = 10.0 μF.\n\nStep 3: The ratio C_s : C_p is:\nC_s / C_p = 1.0 μF / 10.0 μF = 1 / 10 = 1 : 10.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 324,
    data: {
      question: "What is the electrostatic attractive force exerted by one plate on the other in a parallel plate capacitor of plate area A having a uniform electric field E between the plates?",
      option_a: "(1/2) ε₀ A E²",
      option_b: "ε₀ A E²",
      option_c: "2 ε₀ A E²",
      option_d: "(1/4) ε₀ A E²",
      correct_option: "A",
      explanation: "Step 1: The total electric field between the plates is E = σ / ε₀, so the charge on a plate is Q = σ A = ε₀ A E.\n\nStep 2: The electric field produced by one plate alone at the position of the other plate is E_single = E / 2.\n\nStep 3: The attractive electrostatic force on the second plate carrying charge Q is:\nF = Q × E_single = (ε₀ A E) × (E / 2) = (1/2) ε₀ A E².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 325,
    data: {
      question: "Infinite rows of identical capacitors, each of capacitance 3 μF, are connected in parallel. The first row contains 1 capacitor, the second contains 3 capacitors in series, the third contains 9 capacitors in series, and so forth in geometric progression. What is the total equivalent capacitance of the network?",
      option_a: "4.5 μF",
      option_b: "3.0 μF",
      option_c: "6.0 μF",
      option_d: "9.0 μF",
      correct_option: "A",
      explanation: "Step 1: The equivalent capacitance of the n-th row containing 3^(n−1) identical capacitors in series is:\nC_n = C₀ / 3^(n−1) = 3 μF / 3^(n−1) = 3 × (1/3)^(n−1) μF.\n\nStep 2: All rows are connected in parallel, so the total capacitance is the sum of an infinite geometric series:\nC_total = C₁ + C₂ + C₃ + ... = 3 [ 1 + 1/3 + 1/9 + ... ].\n\nStep 3: The sum of the infinite GP with first term a = 1 and common ratio r = 1/3 is S = 1 / (1 − 1/3) = 3 / 2 = 1.5.\n\nStep 4: Therefore:\nC_total = 3 × 1.5 = 4.5 μF.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 326,
    data: {
      question: "Which of the following correctly describes how the capacitance C of a parallel plate capacitor varies with the separation distance d between its plates?",
      option_a: "C varies inversely with d (hyperbolic decrease, C ∝ 1 / d)",
      option_b: "C varies directly with d (linear increase, C ∝ d)",
      option_c: "C varies inversely with the square of d (C ∝ 1 / d²)",
      option_d: "C is completely independent of d",
      correct_option: "A",
      explanation: "Step 1: The formula for the capacitance of a parallel plate capacitor is:\nC = ε₀ A / d.\n\nStep 2: Holding the plate area A and permittivity ε₀ constant, C is inversely proportional to d:\nC ∝ 1 / d.\n\nStep 3: A plot of C versus d is a rectangular hyperbola asymptotically approaching zero as d → ∞.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 327,
    data: {
      question: "In a circuit containing resistors and capacitors in DC steady state, which statement is always TRUE?",
      option_a: "The steady-state DC current through any branch containing an ideal capacitor is zero",
      option_b: "The charge on all capacitors in the circuit is always equal",
      option_c: "The potential difference across every capacitor is zero",
      option_d: "Capacitors act as short circuits to DC current",
      correct_option: "A",
      explanation: "Step 1: In a DC circuit, when capacitors become fully charged, the potential difference across each capacitor opposes the applied EMF.\n\nStep 2: By the relation i = dq/dt = C (dv/dt), in the DC steady state dv/dt = 0, so i = 0.\n\nStep 3: Thus, an ideal capacitor acts as an open circuit in the DC steady state, blocking any continuous flow of direct current through its branch.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6001,
    data: {
      question: "What is the capacitive time constant τ of an RC charging circuit comprising a resistor of resistance R and a capacitor of capacitance C?",
      option_a: "R C",
      option_b: "R / C",
      option_c: "C / R",
      option_d: "1 / (R C)",
      correct_option: "A",
      explanation: "Step 1: In an RC circuit, the charge on the capacitor as a function of time during charging is given by:\nq(t) = Q_max [ 1 − e^(−t / τ) ].\n\nStep 2: Dimensional analysis of the exponential argument requires (−t / τ) to be dimensionless, meaning τ has dimensions of time.\n\nStep 3: Here, τ = R C is the characteristic time constant representing the time required for the capacitor to charge to approximately 63.2% of its maximum steady-state charge.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6002,
    data: {
      question: "In a discharging RC circuit consisting of a 2.0 μF capacitor connected across a 1.5 MΩ resistor, what is the capacitive time constant?",
      option_a: "3.0 s",
      option_b: "0.75 s",
      option_c: "1.33 s",
      option_d: "30.0 s",
      correct_option: "A",
      explanation: "Step 1: The capacitive time constant of an RC circuit is:\nτ = R × C.\n\nStep 2: Convert given parameters into base SI units:\nR = 1.5 MΩ = 1.5 × 10⁶ Ω,\nC = 2.0 μF = 2.0 × 10⁻⁶ F.\n\nStep 3: Calculate τ:\nτ = (1.5 × 10⁶ Ω) × (2.0 × 10⁻⁶ F) = 3.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6003,
    data: {
      question: "Two capacitors C₁ and C₂ are connected in series across a constant DC voltage source V₀. What is the steady-state voltage across capacitor C₁?",
      option_a: "V₀ [ C₂ / (C₁ + C₂) ]",
      option_b: "V₀ [ C₁ / (C₁ + C₂) ]",
      option_c: "V₀ [ (C₁ + C₂) / C₁ ]",
      option_d: "V₀ / 2",
      correct_option: "A",
      explanation: "Step 1: In a series combination of capacitors, both capacitors accumulate the exact same magnitude of charge Q:\nQ = C_eq V₀ = [ (C₁ C₂) / (C₁ + C₂) ] V₀.\n\nStep 2: The potential difference across C₁ is:\nV₁ = Q / C₁ = [ 1 / C₁ ] × [ (C₁ C₂) / (C₁ + C₂) ] V₀ = V₀ [ C₂ / (C₁ + C₂) ].\n\nStep 3: In a series circuit, voltage divides inversely proportional to capacitance.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6004,
    data: {
      question: "Three identical capacitors charged to the same initial voltage are allowed to discharge separately through three different resistors R₁, R₂, and R₃, where R₁ < R₂ < R₃. Which resistor will discharge its capacitor most rapidly?",
      option_a: "R₁",
      option_b: "R₂",
      option_c: "R₃",
      option_d: "All three discharge at the exact same rate",
      correct_option: "A",
      explanation: "Step 1: The rate of discharge is governed by the capacitive time constant τ = R C.\n\nStep 2: A smaller time constant corresponds to a more rapid exponential decay of charge: q(t) = Q₀ e^(−t / τ).\n\nStep 3: Since C is identical for all three and R₁ < R₂ < R₃, the time constant τ₁ = R₁ C is the smallest.\nTherefore, the capacitor connected to resistor R₁ discharges in the shortest time.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6005,
    data: {
      question: "An ideal capacitor is connected directly across an ideal battery having zero internal resistance (r = 0) with zero lead resistance. The theoretical time required for the capacitor to charge to its full steady-state voltage is:",
      option_a: "Zero (instantaneous charging)",
      option_b: "Infinite",
      option_c: "1 second",
      option_d: "loge(2) seconds",
      correct_option: "A",
      explanation: "Step 1: The time constant for charging a capacitor through resistance R is τ = R C.\n\nStep 2: When an ideal battery and connecting wires have zero resistance (R = 0), the time constant is:\nτ = 0 × C = 0.\n\nStep 3: With τ = 0, the exponential term e^(−t / τ) vanishes instantaneously for any t > 0, meaning the capacitor charges to full battery voltage instantly.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6006,
    data: {
      question: "An RC circuit has a time constant of 2.0 s with capacitor C. If a second identical capacitor C is connected in parallel with the first, what is the new time constant of the circuit?",
      option_a: "4.0 s",
      option_b: "1.0 s",
      option_c: "2.0 s",
      option_d: "8.0 s",
      correct_option: "A",
      explanation: "Step 1: The initial time constant is τ = R C = 2.0 s.\n\nStep 2: Connecting an identical capacitor in parallel doubles the equivalent capacitance:\nC_new = C + C = 2C.\n\nStep 3: The new time constant is:\nτ_new = R C_new = R (2C) = 2 (R C) = 2 × 2.0 s = 4.0 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6007,
    data: {
      question: "A 400 pF capacitor is charged to 300 V by a DC power supply. The supply is disconnected, and the capacitor is then connected in parallel with an uncharged identical 400 pF capacitor. What is the electrostatic energy lost in the process?",
      option_a: "9.0 × 10⁻⁶ J",
      option_b: "1.8 × 10⁻⁵ J",
      option_c: "4.5 × 10⁻⁶ J",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The formula for electrostatic energy lost when a charged capacitor C₁ at voltage V₁ shares charge with an uncharged capacitor C₂ is:\nΔU = [ (C₁ C₂) / (2 (C₁ + C₂)) ] V₁².\n\nStep 2: For identical capacitors (C₁ = C₂ = C):\nΔU = [ C² / (2 (2C)) ] V₁² = (1/4) C V₁².\n\nStep 3: Substitute C = 400 pF = 400 × 10⁻¹² F and V₁ = 300 V:\nΔU = (1/4) × (400 × 10⁻¹² F) × (300 V)² = 100 × 10⁻¹² × 90,000 = 9.0 × 10⁻⁶ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6008,
    data: {
      question: "A Van de Graaff generator has a spherical conducting dome that must be maintained at a high potential of 6.0 × 10⁶ V. If the surrounding insulating gas has a dielectric breakdown strength of 3.0 × 10⁷ V m⁻¹, what is the minimum radius required for the spherical dome?",
      option_a: "20 cm",
      option_b: "10 cm",
      option_c: "30 cm",
      option_d: "50 cm",
      correct_option: "A",
      explanation: "Step 1: For a spherical conductor of radius R carrying charge Q, the surface potential and surface electric field are:\nV = k Q / R\nE = k Q / R².\n\nStep 2: Dividing V by E gives the relation:\nR = V / E.\n\nStep 3: To prevent electrical breakdown of the gas, the surface electric field must not exceed the dielectric breakdown strength (E ≤ E_breakdown). Thus:\nR_min = V / E_breakdown.\n\nStep 4: Substitute the given values:\nR_min = (6.0 × 10⁶ V) / (3.0 × 10⁷ V m⁻¹) = 0.20 m = 20 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6079,
    data: {
      question: "Which of the following electric field line configurations is physically IMPOSSIBLE in an electrostatic field (where there are no time-varying magnetic fields)?",
      option_a: "Field lines forming continuous, closed loops",
      option_b: "Field lines diverging radially from a positive point charge",
      option_c: "Field lines converging radially toward a negative point charge",
      option_d: "Uniform parallel field lines between two oppositely charged plates",
      correct_option: "A",
      explanation: "Step 1: Electrostatic fields are conservative vector fields produced by stationary charges.\n\nStep 2: By Faraday's Law in electrostatics, ∇ × E = 0, which implies that the line integral around any closed loop is zero:\n∮ E · dr = 0.\n\nStep 3: If an electric field line formed a closed loop, the line integral along that closed line would be strictly positive, violating the conservative nature of electrostatic forces. Hence, electrostatic field lines never form closed loops.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6080,
    data: {
      question: "Across the boundary surface of a charged conductor in electrostatic equilibrium, which component of the electric field exhibits a discontinuity?",
      option_a: "The normal component (which jumps from zero inside to σ / ε₀ just outside)",
      option_b: "The tangential component (which is non-zero inside and zero outside)",
      option_c: "Both normal and tangential components are completely continuous",
      option_d: "Both normal and tangential components are discontinuous with value zero",
      correct_option: "A",
      explanation: "Step 1: In electrostatic equilibrium, the electric field inside a conductor is zero everywhere (E_inside = 0).\n\nStep 2: Electrostatic boundary conditions dictate that the tangential component of the electric field is continuous across any interface: E_parallel = 0 both inside and just outside.\n\nStep 3: By Gauss's Law, the normal component jumps by σ / ε₀:\nE_normal,out − E_normal,in = σ / ε₀ − 0 = σ / ε₀.\nThus, the normal component is discontinuous across the surface.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6081,
    data: {
      question: "In a convention where an electric charge of 1.0 μC is represented by 5.0 × 10⁶ electric field lines, what is the magnitude of electric charge that is associated with 2.5 × 10⁷ field lines?",
      option_a: "5.0 μC",
      option_b: "2.5 μC",
      option_c: "10.0 μC",
      option_d: "1.25 μC",
      correct_option: "A",
      explanation: "Step 1: By definition, the number of electric field lines N originating from or terminating on a charge is directly proportional to the magnitude of the charge:\nN ∝ |q|.\n\nStep 2: Using the given proportionality factor:\nq = N / (lines per unit charge) = (2.5 × 10⁷ lines) / (5.0 × 10⁶ lines μC⁻¹) = 5.0 μC.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6082,
    data: {
      question: "The electrostatic field vector E(r) is spatially continuous in which of the following regions?",
      option_a: "In any region that contains no surface charge distributions",
      option_b: "Across a surface carrying a finite surface charge density σ",
      option_c: "At the exact location of a point charge",
      option_d: "Across the charged plate of a capacitor",
      correct_option: "A",
      explanation: "Step 1: According to Maxwell's equations (Gauss's Law), the divergence of the electric field is ∇ · E = ρ / ε₀.\n\nStep 2: A discontinuity in the electric field occurs only when crossing a two-dimensional sheet of surface charge where the normal component jumps by ΔE_n = σ / ε₀.\n\nStep 3: In any region devoid of surface charge distributions (even if continuous volume charge density ρ is present), the electric field vector varies smoothly and is continuous.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6083,
    data: {
      question: "A point charge +q is located at the center of the flat circular base of an imaginary hemisphere of radius R. What is the electric flux passing through the curved hemispherical surface?",
      option_a: "q / (2ε₀)",
      option_b: "q / ε₀",
      option_c: "q / (4ε₀)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Imagine completing the hemisphere into a full spherical Gaussian surface centered on the charge +q.\n\nStep 2: By Gauss's Law, the total electric flux emerging from the complete sphere is:\nΦ_total = q / ε₀.\n\nStep 3: By spherical symmetry, half of the total flux passes through the upper hemisphere and half through the lower hemisphere:\nΦ_curved = (1/2) Φ_total = q / (2ε₀).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6084,
    data: {
      question: "A uniform electric field E = (4 î + 3 ĵ) V m⁻¹ exists in space. What is the electric flux through a flat square surface of side length 2 m oriented parallel to the y-z plane (normal vector along +î)?",
      option_a: "16 V m",
      option_b: "12 V m",
      option_c: "20 V m",
      option_d: "8 V m",
      correct_option: "A",
      explanation: "Step 1: The area of the square is A = (2 m)² = 4 m².\n\nStep 2: Since the square lies parallel to the y-z plane, its outward normal area vector points along the positive x-axis:\nA = 4 î m².\n\nStep 3: Electric flux is the scalar dot product of electric field and area vector:\nΦ = E · A = (4 î + 3 ĵ) · (4 î) = 4 × 4 + 3 × 0 = 16 V m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6085,
    data: {
      question: "A solid right circular cone of base radius R and vertical height h is placed with its flat base on a horizontal surface in a uniform horizontal electric field E. What is the magnitude of the electric flux entering the curved surface of the cone?",
      option_a: "E R h",
      option_b: "2 E R h",
      option_c: "(1/3) E R h",
      option_d: "(1/2) E R h",
      correct_option: "A",
      explanation: "Step 1: Since there is no net charge enclosed within the cone, the total flux through the closed surface is zero: Φ_net = Φ_in + Φ_out = 0.\n\nStep 2: The flat base lies on a horizontal plane, so its normal is vertical (perpendicular to the horizontal electric field E), giving zero flux through the base: Φ_base = 0.\n\nStep 3: Therefore, the total flux entering the curved surface equals the electric field times the projected cross-sectional area perpendicular to E.\n\nStep 4: The vertical cross-section of the cone perpendicular to E is a triangle of base 2R and height h:\nA_projected = (1/2) × (base) × (height) = (1/2) × (2R) × h = R h.\n\nStep 5: Thus, the magnitude of entering flux is:\nΦ_in = E × A_projected = E R h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6086,
    data: {
      question: "Which of the following statements regarding electrostatics is INCORRECT?",
      option_a: "Coulomb's inverse-square formula can be applied directly to extended charged cylinders by treating them as point charges at their centers",
      option_b: "Electrostatic field lines cannot form closed continuous loops",
      option_c: "Gauss's law is valid for any closed Gaussian surface of arbitrary shape enclosing charge",
      option_d: "The electrostatic field is a conservative vector field",
      correct_option: "A",
      explanation: "Step 1: Coulomb's inverse-square law F = k q₁ q₂ / r² is strictly formulated for point charges or spherically symmetric charge distributions outside their boundaries.\n\nStep 2: For extended non-spherical geometries like cylinders, the electric field does not fall off as 1/r² (it falls off as 1/r for infinite line/cylinder charges), so Coulomb's point-charge formula cannot be applied directly without volume integration.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6087,
    data: {
      question: "A point charge +q is fixed at the center of the planar base of a hollow hemisphere. If an additional external charge Q is brought near the curved surface from outside, what can be asserted about the total net electric flux through the entire closed surface of the hemisphere?",
      option_a: "The net contribution of the external charge Q to the total closed flux is zero",
      option_b: "The external charge Q changes the net enclosed charge of the hemisphere",
      option_c: "The electric flux through the curved surface becomes completely independent of q",
      option_d: "The electric field inside the hemisphere vanishes completely",
      correct_option: "A",
      explanation: "Step 1: According to Gauss's Law, the total electric flux through any closed surface depends strictly on the net charge enclosed within that surface:\nΦ_total = Q_enclosed / ε₀.\n\nStep 2: Any charge located outside the Gaussian surface sends field lines that enter through one part of the surface and exit through another, contributing zero net flux through the closed surface.\n\nStep 3: Therefore, the external charge Q contributes zero net flux to the total closed Gaussian surface.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 2 (Q31 to Q60)...');

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
