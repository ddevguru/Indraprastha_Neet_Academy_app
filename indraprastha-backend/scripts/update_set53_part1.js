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
    id: 3081,
    data: {
      question: "A copper wire of cross-sectional area 4.0 × 10⁻⁶ m² carries a steady electric current of 16 A. If the free electron density in copper is 8.0 × 10²⁸ m⁻³, what is the drift velocity of the conduction electrons? (Take e = 1.6 × 10⁻¹⁹ C).",
      option_a: "3.125 × 10⁻⁵ m s⁻¹",
      option_b: "6.25 × 10⁻⁵ m s⁻¹",
      option_c: "1.56 × 10⁻⁴ m s⁻¹",
      option_d: "3.125 × 10⁻⁴ m s⁻¹",
      correct_option: "A",
      explanation: "Step 1: The relation between electric current I and drift velocity v_d is:\nI = n e A v_d.\n\nStep 2: Rearranging to solve for drift velocity:\nv_d = I / (n e A).\n\nStep 3: Substitute the given values:\nI = 16 A,\nn = 8.0 × 10²⁸ m⁻³,\ne = 1.6 × 10⁻¹⁹ C,\nA = 4.0 × 10⁻⁶ m².\n\nStep 4: Compute the denominator:\nn e A = (8.0 × 10²⁸) × (1.6 × 10⁻¹⁹) × (4.0 × 10⁻⁶) = 5.12 × 10⁵ C m⁻¹.\nv_d = 16 / (5.12 × 10⁵) = 3.125 × 10⁻⁵ m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3082,
    data: {
      question: "Why does a lead-acid car battery deliver a larger starting current to an automobile starter motor on a warm summer day than on a freezing winter morning?",
      option_a: "Because the internal resistance of the battery decreases with increasing temperature due to enhanced ionic mobility in the electrolyte",
      option_b: "Because the EMF of the battery increases by a factor of 10 at higher temperatures",
      option_c: "Because the resistance of copper connecting cables increases with temperature",
      option_d: "Because the chemical reactions inside the battery cease completely in winter",
      correct_option: "A",
      explanation: "Step 1: The terminal current drawn during starting is I = E / (R_starter + r), where r is the internal resistance of the battery.\n\nStep 2: In electrolytic cells, electrical conduction occurs via the migration of dissolved ions in the electrolyte solution.\n\nStep 3: At higher temperatures, the viscosity of the liquid electrolyte decreases and the thermal kinetic energy increases, leading to higher ionic mobility.\n\nStep 4: Consequently, internal resistance r decreases with temperature rise, allowing a much higher cranking current on hot days.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3083,
    data: {
      question: "Below its critical transition temperature T_c, the electrical conductivity of an ideal superconductor becomes:",
      option_a: "Infinite (∞)",
      option_b: "Extremely small but non-zero",
      option_c: "Zero",
      option_d: "Unity (1)",
      correct_option: "A",
      explanation: "Step 1: In a superconducting state (T < T_c), Cooper pairs of electrons experience zero lattice scattering, causing the electrical resistivity ρ to drop strictly to zero:\nρ = 0.\n\nStep 2: Electrical conductivity σ is defined as the reciprocal of resistivity:\nσ = 1 / ρ.\n\nStep 3: As ρ → 0, σ = 1 / 0 = ∞.\nThus, the conductivity of a superconductor is infinite.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3084,
    data: {
      question: "The electrical resistance of a metallic wire is 8.0 Ω at 40°C and 10.0 Ω at 90°C. What is its resistance at 0°C?",
      option_a: "6.4 Ω",
      option_b: "7.0 Ω",
      option_c: "5.5 Ω",
      option_d: "6.0 Ω",
      correct_option: "A",
      explanation: "Step 1: Resistance varies linearly with temperature according to:\nR(T) = R₀ (1 + α T) = R₀ + (R₀ α) T.\n\nStep 2: The rate of change of resistance with temperature is constant:\nk = ΔR / ΔT = (10.0 Ω − 8.0 Ω) / (90°C − 40°C) = 2.0 Ω / 50°C = 0.04 Ω °C⁻¹.\n\nStep 3: Finding resistance at 0°C:\nR₀ = R(40°C) − k × (40°C) = 8.0 Ω − (0.04 Ω °C⁻¹ × 40°C) = 8.0 − 1.6 = 6.4 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3085,
    data: {
      question: "In a Bohr atom model, an electron revolves in a circular orbit at a frequency of 6.25 × 10¹⁵ revolutions per second. What is the equivalent electric current associated with this orbital motion? (Take e = 1.6 × 10⁻¹⁹ C).",
      option_a: "1.0 mA",
      option_b: "0.5 mA",
      option_c: "2.0 mA",
      option_d: "1.6 mA",
      correct_option: "A",
      explanation: "Step 1: Electric current is defined as the charge passing through a cross-section per unit time: I = q / T.\n\nStep 2: Since frequency f = 1 / T:\nI = q × f = e × f.\n\nStep 3: Substitute given values:\nI = (1.6 × 10⁻¹⁹ C) × (6.25 × 10¹⁵ s⁻¹) = 10.0 × 10⁻⁴ A = 1.0 × 10⁻³ A = 1.0 mA.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3086,
    data: {
      question: "The temperature coefficient of resistance of a wire is α = 2.5 × 10⁻³ °C⁻¹. At what temperature will the electrical resistance of the wire become double its resistance at 0°C?",
      option_a: "400°C",
      option_b: "250°C",
      option_c: "500°C",
      option_d: "200°C",
      correct_option: "A",
      explanation: "Step 1: The temperature dependence of resistance is given by:\nR_T = R₀ (1 + α T).\n\nStep 2: For R_T = 2 R₀:\n2 R₀ = R₀ (1 + α T) => 1 + α T = 2 => α T = 1.\n\nStep 3: Solving for temperature T:\nT = 1 / α = 1 / (2.5 × 10⁻³ °C⁻¹) = 1000 / 2.5 = 400°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3087,
    data: {
      question: "A resistance wire of length 2.0 m and uniform cross-sectional area 0.5 mm² (0.5 × 10⁻⁶ m²) draws a current of 2.5 A when connected across a 10 V DC supply. What is the resistivity of the wire material?",
      option_a: "1.0 × 10⁻⁶ Ω m",
      option_b: "2.0 × 10⁻⁶ Ω m",
      option_c: "5.0 × 10⁻⁷ Ω m",
      option_d: "4.0 × 10⁻⁶ Ω m",
      correct_option: "A",
      explanation: "Step 1: By Ohm's law, the resistance of the wire is:\nR = V / I = 10 V / 2.5 A = 4.0 Ω.\n\nStep 2: The relation between resistance and resistivity is:\nR = ρ L / A => ρ = R A / L.\n\nStep 3: Substitute the numerical values:\nρ = (4.0 Ω × 0.5 × 10⁻⁶ m²) / 2.0 m = (2.0 × 10⁻⁶) / 2.0 = 1.0 × 10⁻⁶ Ω m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3088,
    data: {
      question: "A carbon resistor has color bands in the sequence: Red, Violet, Orange, and Silver. What is the nominal resistance and tolerance of this resistor?",
      option_a: "27 kΩ ± 10%",
      option_b: "270 Ω ± 5%",
      option_c: "37 kΩ ± 10%",
      option_d: "2.7 kΩ ± 20%",
      correct_option: "A",
      explanation: "Step 1: Standard color code values:\nRed = 2 (first significant digit)\nViolet = 7 (second significant digit)\nOrange = 10³ (multiplier)\nSilver = ±10% (tolerance).\n\nStep 2: Combining these parameters:\nR = 27 × 10³ Ω ± 10% = 27 kΩ ± 10%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3089,
    data: {
      question: "The drift speed of electrons in a cylindrical conductor carrying current I is v₀. If the wire is replaced by another wire of the same material whose diameter is doubled while carrying three times the current, what is the new drift speed of electrons?",
      option_a: "0.75 v₀",
      option_b: "1.5 v₀",
      option_c: "0.5 v₀",
      option_d: "3.0 v₀",
      correct_option: "A",
      explanation: "Step 1: Drift velocity is related to current and cross-sectional area by:\nv_d = I / (n e A) = I / [ n e π (d / 2)² ] ∝ I / d².\n\nStep 2: Here, the new current is I' = 3I and the new diameter is d' = 2d:\nv_d' / v₀ = (I' / I) × (d / d')² = (3) × (1 / 2)² = 3 / 4 = 0.75.\n\nStep 3: Therefore, v_d' = 0.75 v₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3090,
    data: {
      question: "Two wires made of the same metal have lengths in the ratio 1 : 3 and cross-sectional areas in the ratio 2 : 5. What is the ratio of their specific resistances (resistivities)?",
      option_a: "1 : 1",
      option_b: "5 : 6",
      option_c: "6 : 5",
      option_d: "2 : 15",
      correct_option: "A",
      explanation: "Step 1: Specific resistance (resistivity, ρ) is an intrinsic physical property of the material that depends solely on chemical composition, temperature, and pressure.\n\nStep 2: Resistivity is completely independent of extrinsic geometric dimensions like length, radius, or cross-sectional area.\n\nStep 3: Because both wires are fabricated from the exact same metal, their specific resistances are identical: ρ₁ = ρ₂ => ρ₁ : ρ₂ = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3091,
    data: {
      question: "In an ionized gas discharge tube, 2.0 × 10¹⁶ electrons move from right to left per second while 3.0 × 10¹⁶ singly ionized positive ions move from left to right per second. What is the total electric current and its conventional direction? (Take e = 1.6 × 10⁻¹⁹ C).",
      option_a: "8.0 mA towards right",
      option_b: "8.0 mA towards left",
      option_c: "1.6 mA towards right",
      option_d: "1.6 mA towards left",
      correct_option: "A",
      explanation: "Step 1: Conventional current is defined in the direction of motion of positive charges and opposite to the direction of motion of negative charges.\n\nStep 2: Positive ions moving from left to right produce a current directed toward the right:\nI₊ = n₊ e = (3.0 × 10¹⁶ s⁻¹) × (1.6 × 10⁻¹⁹ C) = 4.8 × 10⁻³ A = 4.8 mA (to the right).\n\nStep 3: Electrons moving from right to left also produce a conventional current directed toward the right:\nI₋ = n₋ e = (2.0 × 10¹⁶ s⁻¹) × (1.6 × 10⁻¹⁹ C) = 3.2 × 10⁻³ A = 3.2 mA (to the right).\n\nStep 4: The total electric current is the sum of both contributions:\nI_total = I₊ + I₋ = 4.8 mA + 3.2 mA = 8.0 mA (towards right).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3092,
    data: {
      question: "The current flowing through a circuit element varies with time as i(t) = (2.0 t + 4.0) A, where t is in seconds. What is the total electric charge that passes through the element in the first 4 seconds?",
      option_a: "32 C",
      option_b: "24 C",
      option_c: "16 C",
      option_d: "48 C",
      correct_option: "A",
      explanation: "Step 1: The instantaneous electric current is the time rate of flow of charge: i = dq / dt.\n\nStep 2: The total charge passing during a time interval is the definite integral:\nq = ∫₀⁴ i(t) dt = ∫₀⁴ (2.0 t + 4.0) dt.\n\nStep 3: Integrating:\nq = [ t² + 4.0 t ]₀⁴ = [ 4² + 4.0(4) ] − 0 = 16 + 16 = 32 C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3093,
    data: {
      question: "Why are alloys such as manganin and constantan standardly chosen for manufacturing laboratory standard resistance coils?",
      option_a: "Because they possess high electrical resistivity and a negligible (very low) temperature coefficient of resistance",
      option_b: "Because they have low resistivity and high temperature coefficient",
      option_c: "Because they are superconducting at room temperature",
      option_d: "Because their resistance decreases dramatically when heated",
      correct_option: "A",
      explanation: "Step 1: Standard resistors require a resistance value that remains stable and constant despite temperature changes caused by Joule heating or ambient weather.\n\nStep 2: Alloys like manganin and constantan exhibit high electrical resistivity (allowing compact wire lengths) and an extremely low temperature coefficient of resistance α (near zero).\n\nStep 3: Hence, their resistance remains virtually unchanged over standard operating temperature ranges.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3094,
    data: {
      question: "Two wires made of different metals have resistivities in the ratio 3 : 2, lengths in the ratio 2 : 5, and cross-sectional areas in the ratio 3 : 4. What is the ratio of their electrical resistances (R₁ : R₂)?",
      option_a: "4 : 5",
      option_b: "5 : 4",
      option_c: "2 : 3",
      option_d: "3 : 5",
      correct_option: "A",
      explanation: "Step 1: Resistance is related to dimensions and resistivity by:\nR = ρ L / A.\n\nStep 2: Expressing the ratio of resistances:\nR₁ / R₂ = (ρ₁ / ρ₂) × (L₁ / L₂) × (A₂ / A₁).\n\nStep 3: Substitute the given ratios:\nρ₁ / ρ₂ = 3 / 2\nL₁ / L₂ = 2 / 5\nA₁ / A₂ = 3 / 4 => A₂ / A₁ = 4 / 3.\n\nStep 4: Compute the product:\nR₁ / R₂ = (3 / 2) × (2 / 5) × (4 / 3) = (6 / 10) × (4 / 3) = 24 / 30 = 4 / 5 = 4 : 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3095,
    data: {
      question: "In a circuit branch, node A is at potential V_A = +12 V and node C is grounded (V_C = 0 V). Two resistors R₁ = 4 Ω and R₂ = 2 Ω are connected in series between nodes A and C. What is the electric potential at the intermediate node B between R₁ and R₂?",
      option_a: "+4 V",
      option_b: "+8 V",
      option_c: "+6 V",
      option_d: "+2 V",
      correct_option: "A",
      explanation: "Step 1: The current flowing through the series branch from A to C is:\nI = (V_A − V_C) / (R₁ + R₂) = (12 V − 0 V) / (4 Ω + 2 Ω) = 12 / 6 = 2.0 A.\n\nStep 2: Potential drop across R₁ is:\nΔV₁ = I × R₁ = 2.0 A × 4 Ω = 8 V.\n\nStep 3: The potential at junction B is:\nV_B = V_A − ΔV₁ = 12 V − 8 V = +4 V.\n(Alternatively, V_B = V_C + I R₂ = 0 + 2.0 × 2 = +4 V).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3096,
    data: {
      question: "A uniform metallic wire of resistance R is cut into eight equal pieces. Pairs of two pieces are connected in series to form four branches, and then all four branches are connected in parallel. What is the equivalent resistance of this combination?",
      option_a: "R / 16",
      option_b: "R / 8",
      option_c: "R / 4",
      option_d: "R / 32",
      correct_option: "A",
      explanation: "Step 1: When cut into 8 equal pieces, the resistance of each piece is:\nr = R / 8.\n\nStep 2: When two pieces are joined in series, each branch has resistance:\nr_branch = r + r = 2 × (R / 8) = R / 4.\n\nStep 3: There are 4 such branches connected in parallel. The equivalent resistance is:\nR_eq = r_branch / 4 = (R / 4) / 4 = R / 16.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3097,
    data: {
      question: "Two cylindrical wires of equal cross-sectional area A have resistivities ρ₁ and ρ₂ and lengths L₁ and L₂, respectively. If they are joined end-to-end in series, what is the effective resistivity of the combination?",
      option_a: "(ρ₁ L₁ + ρ₂ L₂) / (L₁ + L₂)",
      option_b: "(ρ₁ + ρ₂) / 2",
      option_c: "2 ρ₁ ρ₂ / (ρ₁ + ρ₂)",
      option_d: "√(ρ₁ ρ₂)",
      correct_option: "A",
      explanation: "Step 1: The total resistance of the series combination is R = R₁ + R₂.\n\nStep 2: Expressing individual and equivalent resistances:\nR₁ = ρ₁ L₁ / A\nR₂ = ρ₂ L₂ / A\nR = ρ_eq (L₁ + L₂) / A.\n\nStep 3: Equating:\nρ_eq (L₁ + L₂) / A = ρ₁ L₁ / A + ρ₂ L₂ / A.\n\nStep 4: Cancelling the common cross-sectional area A:\nρ_eq = (ρ₁ L₁ + ρ₂ L₂) / (L₁ + L₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3098,
    data: {
      question: "In a balanced Wheatstone bridge, four resistors of resistances 6 Ω, 12 Ω, 3 Ω, and 6 Ω are connected in arms AB, BC, AD, and DC, respectively. What is the equivalent resistance between terminals A and C?",
      option_a: "6 Ω",
      option_b: "9 Ω",
      option_c: "18 Ω",
      option_d: "4 Ω",
      correct_option: "A",
      explanation: "Step 1: Check bridge balance condition:\nR_AB / R_BC = 6 / 12 = 1 / 2.\nR_AD / R_DC = 3 / 6 = 1 / 2.\nSince R_AB / R_BC = R_AD / R_DC, the bridge is balanced and no current flows across the diagonal galvanometer branch BD.\n\nStep 2: Top branch resistance: R_top = 6 + 12 = 18 Ω.\n\nStep 3: Bottom branch resistance: R_bottom = 3 + 6 = 9 Ω.\n\nStep 4: The two branches are in parallel across A and C:\nR_eq = (R_top × R_bottom) / (R_top + R_bottom) = (18 × 9) / (18 + 9) = 162 / 27 = 6 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3099,
    data: {
      question: "Two resistors connected in parallel have an equivalent resistance of 2.4 Ω. When one resistor is removed from the circuit, the remaining resistance is measured to be 6.0 Ω. What is the resistance of the other resistor?",
      option_a: "4.0 Ω",
      option_b: "3.6 Ω",
      option_c: "8.0 Ω",
      option_d: "1.2 Ω",
      correct_option: "A",
      explanation: "Step 1: The parallel combination formula is:\n1 / R_p = 1 / R₁ + 1 / R₂.\n\nStep 2: Substitute R_p = 2.4 Ω = 12 / 5 Ω and R₁ = 6.0 Ω:\n5 / 12 = 1 / 6 + 1 / R₂.\n\nStep 3: Solving for 1 / R₂:\n1 / R₂ = 5 / 12 − 1 / 6 = 5 / 12 − 2 / 12 = 3 / 12 = 1 / 4.\n\nStep 4: Inverting gives:\nR₂ = 4.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3100,
    data: {
      question: "A 12 V battery with negligible internal resistance is connected across a series combination of two resistors R₁ = 3 Ω and R₂ = 6 Ω. What is the potential difference across resistor R₂?",
      option_a: "8.0 V",
      option_b: "4.0 V",
      option_c: "6.0 V",
      option_d: "12.0 V",
      correct_option: "A",
      explanation: "Step 1: Total series resistance is R_total = R₁ + R₂ = 3 Ω + 6 Ω = 9 Ω.\n\nStep 2: The current flowing through the circuit is:\nI = V / R_total = 12 V / 9 Ω = 4 / 3 A.\n\nStep 3: Potential difference across R₂ is:\nV₂ = I × R₂ = (4 / 3 A) × 6 Ω = 8.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3101,
    data: {
      question: "In a circuit branch, a current of 2.0 A flows through a resistor of 5 Ω from node A to node B, and an ideal 4 V battery with its positive terminal toward B is placed in series between them. What is the potential difference (V_A − V_B)?",
      option_a: "14 V",
      option_b: "6 V",
      option_c: "10 V",
      option_d: "4 V",
      correct_option: "A",
      explanation: "Step 1: Applying Kirchhoff's voltage equation from node A to node B along the direction of current:\nV_A − I R − E = V_B.\n\nStep 2: Substitute given values (I = 2.0 A, R = 5 Ω, E = 4 V):\nV_A − (2.0 × 5) − 4 = V_B\nV_A − 10 − 4 = V_B\nV_A − 14 = V_B.\n\nStep 3: Rearranging gives the potential difference:\nV_A − V_B = 14 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3102,
    data: {
      question: "In a Wheatstone bridge network, the resistances in the four arms taken in cyclic order are P = 5 Ω, Q = 15 Ω, S = X, and R = 2 Ω. If the potential difference across the diagonal galvanometer branch is zero, what is the value of the unknown resistance X?",
      option_a: "6 Ω",
      option_b: "3 Ω",
      option_c: "10 Ω",
      option_d: "12 Ω",
      correct_option: "A",
      explanation: "Step 1: A zero potential difference across the galvanometer branch indicates that the bridge is balanced.\n\nStep 2: The balanced Wheatstone bridge condition is:\nP / Q = R / X.\n\nStep 3: Substitute given values:\n5 / 15 = 2 / X\n1 / 3 = 2 / X.\n\nStep 4: Solving for X:\nX = 2 × 3 = 6 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3103,
    data: {
      question: "A 12 V battery is connected across an external circuit network of equivalent resistance 4.0 Ω. If the internal resistance of the battery is 2.0 Ω, what is the total current supplied by the battery to the circuit?",
      option_a: "2.0 A",
      option_b: "3.0 A",
      option_c: "6.0 A",
      option_d: "1.5 A",
      correct_option: "A",
      explanation: "Step 1: The total resistance of the closed circuit is the sum of the external load resistance R_ext and internal battery resistance r:\nR_total = R_ext + r = 4.0 Ω + 2.0 Ω = 6.0 Ω.\n\nStep 2: By Ohm's Law, the total current supplied by the battery EMF is:\nI = E / R_total = 12 V / 6.0 Ω = 2.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 1 (Q1 to Q23)...');

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
