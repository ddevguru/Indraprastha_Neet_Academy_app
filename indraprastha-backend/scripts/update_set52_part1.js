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
    id: 176,
    data: {
      question: "Two insulated conducting spheres of radii 15 cm and 30 cm each carry an initial charge of +12 μC. If they are connected by a thin copper wire and then separated, which sphere will retain a larger charge?",
      option_a: "The 30 cm sphere will carry a larger charge than the 15 cm sphere",
      option_b: "The 15 cm sphere will carry a larger charge than the 30 cm sphere",
      option_c: "Both spheres will continue to have the exact same charge of 12 μC",
      option_d: "The 15 cm sphere will become completely discharged",
      correct_option: "A",
      explanation: "Step 1: When two conductors are connected by a conducting wire, charge flows until both spheres reach a common electric potential V.\n\nStep 2: The electric potential of an isolated spherical conductor of radius R carrying charge q is:\nV = [1 / (4πε₀)] (q / R).\n\nStep 3: Since V₁ = V₂ at equilibrium:\nq₁ / R₁ = q₂ / R₂ => q₁ / q₂ = R₁ / R₂.\n\nStep 4: Here, R₂ = 30 cm > R₁ = 15 cm. Therefore:\nq₂ / q₁ = 30 / 15 = 2.\nThe 30 cm sphere retains twice as much charge as the 15 cm sphere.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 177,
    data: {
      question: "Twenty-seven identical spherical mercury droplets, each having an electrical capacitance C₀, coalesce to form a single large spherical drop. What is the capacitance of the combined larger drop?",
      option_a: "3 C₀",
      option_b: "9 C₀",
      option_c: "27 C₀",
      option_d: "81 C₀",
      correct_option: "A",
      explanation: "Step 1: Volume is conserved when n droplets merge to form a single large drop of radius R:\n(4/3) π R³ = n × (4/3) π r³ => R = n^(1/3) r.\n\nStep 2: Here n = 27 droplets:\nR = 27^(1/3) r = 3r.\n\nStep 3: The electrical capacitance of an isolated spherical conductor is directly proportional to its radius:\nC = 4πε₀ R.\n\nStep 4: Therefore, the capacitance of the big drop is:\nC' = 4πε₀ R = 4πε₀ (3r) = 3 (4πε₀ r) = 3 C₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 178,
    data: {
      question: "One hundred and twenty-five identical tiny conducting droplets, each carrying an electric charge q, merge together to form a single spherical drop. By conservation of charge, what is the total charge on the resulting large drop?",
      option_a: "125 q",
      option_b: "25 q",
      option_c: "5 q",
      option_d: "625 q",
      correct_option: "A",
      explanation: "Step 1: Electric charge is a conserved scalar quantity that possesses the additive property.\n\nStep 2: When n identical droplets each possessing charge q combine, the net total charge Q on the resulting large drop is the algebraic sum of individual charges:\nQ = ∑ q_i = n × q.\n\nStep 3: For n = 125:\nQ = 125 q.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 179,
    data: {
      question: "A spherical capacitor consists of two concentric spherical conductors of radii 15 cm and 10 cm. The space between them is completely filled with a dielectric medium of dielectric constant K = 5. What is the capacitance of this spherical capacitor? (Take 1 / (4πε₀) = 9 × 10⁹ N m² C⁻²).",
      option_a: "167 pF",
      option_b: "333 pF",
      option_c: "83 pF",
      option_d: "500 pF",
      correct_option: "A",
      explanation: "Step 1: The capacitance of a spherical capacitor with inner radius r₁ and outer radius r₂ filled with a dielectric of constant K is:\nC = 4πε₀ K [ (r₁ × r₂) / (r₂ − r₁) ].\n\nStep 2: Identify the given parameters in SI units:\nr₁ = 10 cm = 0.10 m,\nr₂ = 15 cm = 0.15 m,\nK = 5,\n4πε₀ = 1 / (9 × 10⁹) C² N⁻¹ m⁻².\n\nStep 3: Calculate:\nC = [ 5 / (9 × 10⁹) ] × [ (0.10 × 0.15) / (0.15 − 0.10) ]\nC = [ 5 / (9 × 10⁹) ] × [ 0.015 / 0.05 ] = [ 5 / (9 × 10⁹) ] × 0.3 = 1.5 / (9 × 10⁹) ≈ 0.1667 × 10⁻⁹ F = 167 pF.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 180,
    data: {
      question: "A parallel plate capacitor has plate separation d = 10 mm. A dielectric slab of thickness t = 8 mm and dielectric constant K = 4 is inserted between the plates. What is the ratio of the new capacitance to the initial air capacitance (C / C₀)?",
      option_a: "2.5 times",
      option_b: "4.0 times",
      option_c: "1.5 times",
      option_d: "3.0 times",
      correct_option: "A",
      explanation: "Step 1: The capacitance of a parallel plate capacitor with air between plates separated by distance d is:\nC₀ = ε₀ A / d.\n\nStep 2: When a dielectric slab of thickness t and dielectric constant K is introduced, the capacitance becomes:\nC = ε₀ A / [ (d − t) + t / K ].\n\nStep 3: Substitute d = 10 mm, t = 8 mm, and K = 4:\nEffective separation = (10 − 8) + 8 / 4 = 2 + 2 = 4 mm.\n\nStep 4: The ratio of new capacitance to initial capacitance is:\nC / C₀ = d / [ (d − t) + t / K ] = 10 mm / 4 mm = 2.5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 181,
    data: {
      question: "Circular parallel plates of radius R separated by distance d have capacitance C₀. A dielectric slab of dielectric constant K = 5, thickness d, and radius R / 2 is inserted between the plates. What is the new equivalent capacitance of the system?",
      option_a: "2 C₀",
      option_b: "3 C₀",
      option_c: "1.5 C₀",
      option_d: "4 C₀",
      correct_option: "A",
      explanation: "Step 1: The total area of the circular plate is A = π R².\n\nStep 2: The dielectric slab occupies an area A₁ = π (R / 2)² = π R² / 4 = A / 4.\nThe remaining air region occupies an area A₂ = A − A / 4 = 3A / 4.\n\nStep 3: Both regions share the same plate separation d and potential difference, so they act as two capacitors connected in parallel:\nC₁ = K ε₀ A₁ / d = 5 ε₀ (A / 4) / d = (5 / 4) C₀.\nC₂ = ε₀ A₂ / d = ε₀ (3A / 4) / d = (3 / 4) C₀.\n\nStep 4: The total equivalent capacitance is:\nC = C₁ + C₂ = (5 / 4) C₀ + (3 / 4) C₀ = (8 / 4) C₀ = 2 C₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 182,
    data: {
      question: "Sixty-four identical spherical water droplets, each charged to an electric potential V₀, coalesce into a single large spherical drop. What is the electric potential of the large drop in terms of V₀?",
      option_a: "16 V₀",
      option_b: "64 V₀",
      option_c: "4 V₀",
      option_d: "8 V₀",
      correct_option: "A",
      explanation: "Step 1: For n coalescing droplets, conservation of volume gives:\n(4/3) π R³ = n × (4/3) π r³ => R = n^(1/3) r.\nFor n = 64: R = 64^(1/3) r = 4r.\n\nStep 2: Conservation of charge gives the total charge on the large drop:\nQ = n × q = 64q.\n\nStep 3: The potential of an isolated sphere is V = [1 / (4πε₀)] (q / r).\nFor the large drop:\nV' = [1 / (4πε₀)] (Q / R) = [1 / (4πε₀)] [ (64q) / (4r) ] = 16 × [1 / (4πε₀)] (q / r) = 16 V₀.\nIn general, V' = n^(2/3) V₀ = 64^(2/3) V₀ = 16 V₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 183,
    data: {
      question: "A small particle carrying charge +q between the plates of a charged parallel plate capacitor experiences an electrostatic force F₀ due to the uniform field between the oppositely charged plates. If one of the plates is removed while the charge on the other remains unchanged, what is the force now acting on the particle?",
      option_a: "F₀ / 2",
      option_b: "Zero",
      option_c: "F₀",
      option_d: "2 F₀",
      correct_option: "A",
      explanation: "Step 1: Between two oppositely charged plates with surface charge densities +σ and −σ, each plate contributes an electric field of magnitude E₁ = σ / (2ε₀) in the same direction.\n\nStep 2: The net electric field between both plates is:\nE_net = σ / (2ε₀) + σ / (2ε₀) = σ / ε₀.\nThe initial force on charge q is F₀ = q E_net = q σ / ε₀.\n\nStep 3: When one plate is removed, only the single remaining plate produces an electric field:\nE' = σ / (2ε₀) = E_net / 2.\n\nStep 4: The new force on the particle is:\nF' = q E' = q (E_net / 2) = F₀ / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 184,
    data: {
      question: "The dielectric constant (relative permittivity, ε_r) of an electrical insulating material can never be:",
      option_a: "Infinite (∞)",
      option_b: "Greater than 1",
      option_c: "Equal to 3.5",
      option_d: "Equal to 80",
      correct_option: "A",
      explanation: "Step 1: The dielectric constant K (or ε_r) of a dielectric material is a finite dimensionless quantity that is always greater than 1 (K > 1 for matter, K = 1 for vacuum).\n\nStep 2: An infinite dielectric constant (K = ∞) represents a material where induced charges completely cancel the applied external electric field (E_internal = 0).\n\nStep 3: This characteristic belongs exclusively to ideal electrical conductors (metals), not to insulators/dielectrics.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 185,
    data: {
      question: "An isolated parallel plate capacitor carrying charge Q is disconnected from its charging battery. If the distance between its plates is doubled using insulating handles, what happens to the electrostatic potential energy stored in the capacitor?",
      option_a: "The stored electrostatic energy doubles",
      option_b: "The stored electrostatic energy is halved",
      option_c: "The stored electrostatic energy remains unchanged",
      option_d: "The stored electrostatic energy quadruples",
      correct_option: "A",
      explanation: "Step 1: Since the capacitor is disconnected from the battery, the charge Q on its plates remains constant.\n\nStep 2: The capacitance is inversely proportional to plate separation: C = ε₀ A / d. Doubling d halves the capacitance: C' = C / 2.\n\nStep 3: The electrostatic potential energy stored in a capacitor with constant charge Q is:\nU = Q² / (2C).\n\nStep 4: With C' = C / 2:\nU' = Q² / [2 (C / 2)] = 2 × [ Q² / (2C) ] = 2 U.\nThe mechanical work done by the external agent in pulling the oppositely charged plates apart against their electrostatic attraction is converted into additional stored electrostatic potential energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 186,
    data: {
      question: "A parallel plate capacitor with circular plates of radius 5 cm has the same capacitance as an isolated conducting sphere of radius 2.5 m. What is the separation distance between the circular plates?",
      option_a: "0.25 mm",
      option_b: "0.50 mm",
      option_c: "1.0 mm",
      option_d: "0.10 mm",
      correct_option: "A",
      explanation: "Step 1: The capacitance of an isolated spherical conductor of radius R is:\nC_sphere = 4πε₀ R = 4πε₀ (2.5 m) = 10πε₀.\n\nStep 2: The capacitance of a circular parallel plate capacitor of plate radius r and separation d is:\nC_plate = ε₀ A / d = ε₀ (π r²) / d.\n\nStep 3: Equating C_plate = C_sphere:\nε₀ π r² / d = 10πε₀ => d = r² / 10.\n\nStep 4: Substitute r = 5 cm = 0.05 m:\nd = (0.05)² / 10 = 0.0025 / 10 = 0.00025 m = 0.25 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 187,
    data: {
      question: "The electrical capacitance of an ideal parallel plate capacitor is independent of which of the following parameters?",
      option_a: "The nature and material of the metal from which the plates are made",
      option_b: "The surface area of the opposing plates",
      option_c: "The separation distance between the plates",
      option_d: "The dielectric constant of the insulating medium between the plates",
      correct_option: "A",
      explanation: "Step 1: The capacitance of a parallel plate capacitor is determined by the formula:\nC = K ε₀ A / d.\n\nStep 2: This demonstrates that capacitance depends purely on geometric factors (plate area A, plate separation d) and the electrical properties of the dielectric medium (permittivity ε = K ε₀).\n\nStep 3: Capacitance does not depend on the specific conducting material (e.g., copper, aluminium, or gold) as long as it behaves as an electrostatic equipotential conductor.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 188,
    data: {
      question: "A parallel plate capacitor has plate separation d and initial capacitance C₀. If an uncharged conducting metal sheet of thickness (2 / 3) d is inserted parallel between the plates, what is the new capacitance?",
      option_a: "3 C₀",
      option_b: "1.5 C₀",
      option_c: "Zero",
      option_d: "C₀ / 3",
      correct_option: "A",
      explanation: "Step 1: The initial capacitance of the air-filled capacitor is:\nC₀ = ε₀ A / d.\n\nStep 2: For a conducting slab (where dielectric constant K = ∞), the electric field inside the conductor is zero. The effective plate separation is reduced by the thickness of the slab t:\nC = ε₀ A / (d − t).\n\nStep 3: Substitute t = (2 / 3) d:\nd − t = d − (2 / 3) d = d / 3.\n\nStep 4: The new capacitance is:\nC = ε₀ A / (d / 3) = 3 (ε₀ A / d) = 3 C₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 189,
    data: {
      question: "A 5.0 μF capacitor is charged to a potential difference of 400 V and then completely discharged through an external resistor wire. What is the total thermal heat dissipated in the resistor?",
      option_a: "0.40 J",
      option_b: "0.80 J",
      option_c: "0.20 J",
      option_d: "4.0 J",
      correct_option: "A",
      explanation: "Step 1: The total electrostatic energy stored in a capacitor of capacitance C charged to voltage V is:\nU = (1/2) C V².\n\nStep 2: When the capacitor discharges through an external resistance, the entire stored electrostatic potential energy is dissipated as Joule heat.\n\nStep 3: Substitute the numerical values:\nU = (1/2) × (5.0 × 10⁻⁶ F) × (400 V)²\nU = 2.5 × 10⁻⁶ × 160,000 = 0.40 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 190,
    data: {
      question: "A parallel plate capacitor with a plate separation of 0.02 mm uses a dielectric insulator whose breakdown electric field (dielectric strength) is 25 kV mm⁻¹. What is the maximum safe potential difference that can be applied across its plates without dielectric breakdown?",
      option_a: "500 V",
      option_b: "250 V",
      option_c: "1000 V",
      option_d: "50 V",
      correct_option: "A",
      explanation: "Step 1: Dielectric strength E_max is the maximum electric field that a dielectric medium can withstand without electrical breakdown.\n\nStep 2: The relation between potential difference and uniform electric field across plate separation d is:\nV_max = E_max × d.\n\nStep 3: Given:\nE_max = 25 kV mm⁻¹ = 25 × 10³ V mm⁻¹,\nd = 0.02 mm.\n\nStep 4: Calculate V_max:\nV_max = (25 × 10³ V mm⁻¹) × (0.02 mm) = 500 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 191,
    data: {
      question: "Two conducting spheres of radii 4 cm and 12 cm each carry an initial charge of +24 μC. If they are connected by a thin conducting wire, what is the final equilibrium charge on the smaller sphere?",
      option_a: "12 μC",
      option_b: "24 μC",
      option_c: "36 μC",
      option_d: "6 μC",
      correct_option: "A",
      explanation: "Step 1: Total initial charge of the system:\nQ_total = 24 μC + 24 μC = 48 μC.\n\nStep 2: When connected by a wire, charge redistributes until both spheres attain a common potential V_c. At this point, the charges are directly proportional to their radii:\nq₁ / q₂ = R₁ / R₂.\n\nStep 3: The charge on the smaller sphere is:\nq₁ = Q_total × [ R₁ / (R₁ + R₂) ]\nq₁ = 48 μC × [ 4 cm / (4 cm + 12 cm) ] = 48 μC × (4 / 16) = 12 μC.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 192,
    data: {
      question: "A capacitor of capacitance 2 μF is charged to 100 V, and another capacitor of capacitance 3 μF is charged to 50 V. They are then connected in parallel with like terminals together. What is the energy lost by the 2 μF capacitor?",
      option_a: "5.1 mJ",
      option_b: "10.0 mJ",
      option_c: "3.2 mJ",
      option_d: "1.8 mJ",
      correct_option: "A",
      explanation: "Step 1: Initial electrostatic energy stored in the 2 μF capacitor:\nU₁ = (1/2) C₁ V₁² = (1/2) × (2 × 10⁻⁶ F) × (100 V)² = 1.0 × 10⁻² J = 10.0 mJ.\n\nStep 2: Common potential when connected in parallel:\nV_c = (C₁ V₁ + C₂ V₂) / (C₁ + C₂) = (2 × 100 + 3 × 50) / (2 + 3) = (200 + 150) / 5 = 70 V.\n\nStep 3: Final electrostatic energy stored in the 2 μF capacitor:\nU₁' = (1/2) C₁ V_c² = (1/2) × (2 × 10⁻⁶ F) × (70 V)² = 4.9 × 10⁻³ J = 4.9 mJ.\n\nStep 4: Energy lost by the 2 μF capacitor:\nΔU₁ = U₁ − U₁' = 10.0 mJ − 4.9 mJ = 5.1 mJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 193,
    data: {
      question: "A conducting sphere of radius 5 cm carrying charge Q is brought into momentary contact with an uncharged conducting sphere of radius 15 cm and then separated. What is the ratio of the surface charge density on the smaller sphere to that on the larger sphere (σ₁ : σ₂)?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "9 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: Upon contact, both spheres reach a common electrostatic potential V_c:\nV_c = q₁ / (4πε₀ R₁) = q₂ / (4πε₀ R₂).\n\nStep 2: Surface charge density σ on a sphere of radius R carrying charge q is:\nσ = q / (4π R²).\n\nStep 3: Expressing charge in terms of surface charge density:\nq₁ = σ₁ (4π R₁²) and q₂ = σ₂ (4π R₂²).\n\nStep 4: Substituting into the potential relation:\nσ₁ R₁ = σ₂ R₂ => σ₁ / σ₂ = R₂ / R₁.\n\nStep 5: For R₁ = 5 cm and R₂ = 15 cm:\nσ₁ / σ₂ = 15 / 5 = 3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 194,
    data: {
      question: "The potentials of the two plates of a capacitor are maintained at +15 V and −25 V. If the magnitude of charge on each plate is 80 μC, what is the capacitance of the capacitor?",
      option_a: "2.0 μF",
      option_b: "4.0 μF",
      option_c: "0.5 μF",
      option_d: "1.0 μF",
      correct_option: "A",
      explanation: "Step 1: The potential difference between the plates is:\nΔV = V₊ − V₋ = +15 V − (−25 V) = 40 V.\n\nStep 2: The definition of capacitance is:\nC = Q / ΔV.\n\nStep 3: Substitute Q = 80 μC and ΔV = 40 V:\nC = 80 μC / 40 V = 2.0 μF.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 195,
    data: {
      question: "An air-filled parallel plate capacitor has a capacitance of 12 μF. The area between its plates is divided into two equal halves, one half filled with a dielectric of constant K₁ = 3 and the other half with a dielectric of constant K₂ = 5 across the full plate separation d. What is the equivalent capacitance of this combination?",
      option_a: "48 μF",
      option_b: "24 μF",
      option_c: "36 μF",
      option_d: "60 μF",
      correct_option: "A",
      explanation: "Step 1: When the area of a capacitor is split into two halves A₁ = A₂ = A / 2 with the same separation d, the two regions operate in parallel.\n\nStep 2: The capacitance of each half is:\nC₁ = K₁ ε₀ (A / 2) / d = (K₁ / 2) C₀\nC₂ = K₂ ε₀ (A / 2) / d = (K₂ / 2) C₀.\n\nStep 3: The equivalent capacitance is:\nC_eq = C₁ + C₂ = [ (K₁ + K₂) / 2 ] C₀.\n\nStep 4: Substitute K₁ = 3, K₂ = 5, and C₀ = 12 μF:\nC_eq = [ (3 + 5) / 2 ] × 12 μF = 4 × 12 μF = 48 μF.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 196,
    data: {
      question: "Five identical capacitors, each of capacitance 8.0 μF, are arranged in a symmetric Wheatstone bridge network between terminals A and B. What is the equivalent capacitance between A and B?",
      option_a: "8.0 μF",
      option_b: "16.0 μF",
      option_c: "4.0 μF",
      option_d: "32.0 μF",
      correct_option: "A",
      explanation: "Step 1: In a bridge network of five identical capacitors C, the bridge condition is balanced since C₁ / C₂ = C₃ / C₄ = 1.\n\nStep 2: By bridge symmetry, the potential difference across the central bridging capacitor is zero, so no charge flows through it and it can be removed from the circuit.\n\nStep 3: The remaining circuit consists of two identical parallel branches, each containing two capacitors in series:\nC_branch = (C × C) / (C + C) = C / 2 = 8.0 / 2 = 4.0 μF.\n\nStep 4: The two branches are in parallel, so the total equivalent capacitance is:\nC_eq = C_branch + C_branch = 4.0 μF + 4.0 μF = 8.0 μF.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 197,
    data: {
      question: "Four identical capacitors of capacitance 15 μF each are connected in parallel across terminals A and B. What is the net equivalent capacitance between A and B?",
      option_a: "60 μF",
      option_b: "30 μF",
      option_c: "15 μF",
      option_d: "3.75 μF",
      correct_option: "A",
      explanation: "Step 1: When capacitors are connected in parallel, each capacitor experiences the same potential difference across its terminals.\n\nStep 2: The equivalent capacitance of n capacitors in parallel is the sum of their individual capacitances:\nC_eq = C₁ + C₂ + C₃ + C₄.\n\nStep 3: For four identical capacitors of 15 μF each:\nC_eq = 4 × 15 μF = 60 μF.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 198,
    data: {
      question: "A 6 μF capacitor is connected in series with a parallel group consisting of a 4 μF capacitor and an 8 μF capacitor across a 24 V DC power supply. What is the potential difference across the 6 μF capacitor?",
      option_a: "16 V",
      option_b: "8 V",
      option_c: "12 V",
      option_d: "4 V",
      correct_option: "A",
      explanation: "Step 1: Find the capacitance of the parallel group:\nC_p = 4 μF + 8 μF = 12 μF.\n\nStep 2: Find the total equivalent capacitance of the 6 μF capacitor in series with C_p:\nC_eq = (6 × 12) / (6 + 12) = 72 / 18 = 4 μF.\n\nStep 3: Calculate the total charge supplied by the 24 V source:\nQ = C_eq × V = 4 μF × 24 V = 96 μC.\n\nStep 4: In a series circuit, the charge on each component is the same. The voltage across the 6 μF capacitor is:\nV₁ = Q / C₁ = 96 μC / 6 μF = 16 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 199,
    data: {
      question: "A capacitor C₁ = 8 μF is charged by a 30 V battery and then disconnected. It is then connected in parallel across an uncharged capacitor C₂ = 4 μF. What is the final charge stored on capacitor C₂?",
      option_a: "80 μC",
      option_b: "160 μC",
      option_c: "240 μC",
      option_d: "40 μC",
      correct_option: "A",
      explanation: "Step 1: Initial charge on capacitor C₁:\nQ₀ = C₁ × V = 8 μF × 30 V = 240 μC.\n\nStep 2: When C₁ is connected across uncharged C₂, the charge Q₀ redistributes until both reach a common potential V_c:\nV_c = Q₀ / (C₁ + C₂) = 240 μC / (8 μF + 4 μF) = 240 / 12 = 20 V.\n\nStep 3: The final charge on capacitor C₂ is:\nQ₂ = C₂ × V_c = 4 μF × 20 V = 80 μC.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 200,
    data: {
      question: "A circuit contains a 4.0 μF capacitor connected across a 10 Ω resistor in a branch powered by a 12 V battery with internal resistance 2.0 Ω. In the DC steady state, what is the charge accumulated on the capacitor?",
      option_a: "40 μC",
      option_b: "48 μC",
      option_c: "24 μC",
      option_d: "10 μC",
      correct_option: "A",
      explanation: "Step 1: In the DC steady state, a fully charged capacitor draws zero steady current, behaving as an open circuit.\n\nStep 2: The steady current through the resistor is determined by the battery and internal resistance:\nI = E / (R + r) = 12 V / (10 Ω + 2.0 Ω) = 12 / 12 = 1.0 A.\n\nStep 3: The potential difference across the 10 Ω resistor is:\nV_R = I × R = 1.0 A × 10 Ω = 10 V.\n\nStep 4: Because the capacitor is connected across the resistor, its voltage is also 10 V. The accumulated charge is:\nQ = C × V_R = 4.0 μF × 10 V = 40 μC.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 201,
    data: {
      question: "A multi-plate capacitor is constructed by interleaving 4 identical parallel metal plates separated by distance d with air in between. Alternate plates are connected together to form two terminals. What is the equivalent capacitance if the capacitance of each single pair of plates is C₀?",
      option_a: "3 C₀",
      option_b: "4 C₀",
      option_c: "2 C₀",
      option_d: "C₀ / 3",
      correct_option: "A",
      explanation: "Step 1: An interleaved assembly of N equally spaced parallel plates with alternate plates connected forms (N − 1) identical capacitors connected in parallel.\n\nStep 2: Here N = 4 plates, which form (4 − 1) = 3 capacitor units.\n\nStep 3: Since all 3 capacitors are connected in parallel:\nC_eq = (N − 1) C₀ = 3 C₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 202,
    data: {
      question: "In a symmetric capacitor network where two identical branches each having an effective capacitance of C are connected in parallel between terminals A and B, what is the total equivalent capacitance?",
      option_a: "2 C",
      option_b: "C / 2",
      option_c: "4 C",
      option_d: "C",
      correct_option: "A",
      explanation: "Step 1: For any two branches connected in parallel between two nodes A and B, the total equivalent capacitance is the sum of their individual capacitances:\nC_eq = C₁ + C₂.\n\nStep 2: With C₁ = C and C₂ = C:\nC_eq = C + C = 2 C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 203,
    data: {
      question: "A 2.0 μF capacitor stores 400 μJ of electrostatic potential energy. What is the potential difference across its plates?",
      option_a: "20 V",
      option_b: "40 V",
      option_c: "10 V",
      option_d: "200 V",
      correct_option: "A",
      explanation: "Step 1: The electrostatic energy stored in a capacitor is given by:\nU = (1/2) C V².\n\nStep 2: Rearranging to solve for the voltage V:\nV = √(2U / C).\n\nStep 3: Substitute U = 400 μJ = 400 × 10⁻⁶ J and C = 2.0 μF = 2.0 × 10⁻⁶ F:\nV = √[ (2 × 400 × 10⁻⁶) / (2.0 × 10⁻⁶) ] = √400 = 20 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 204,
    data: {
      question: "Two identical capacitors, each of capacitance C, are connected in series across terminals X and Y. What is the equivalent capacitance between X and Y?",
      option_a: "C / 2",
      option_b: "2 C",
      option_c: "C",
      option_d: "C / 4",
      correct_option: "A",
      explanation: "Step 1: For two capacitors C₁ and C₂ in series, the reciprocal of the equivalent capacitance is:\n1 / C_eq = 1 / C₁ + 1 / C₂.\n\nStep 2: For C₁ = C₂ = C:\n1 / C_eq = 1 / C + 1 / C = 2 / C => C_eq = C / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 295,
    data: {
      question: "A parallel plate capacitor remains continuously connected to a DC battery of voltage V₀ while a dielectric slab of dielectric constant K > 1 is introduced to fill the entire space between the plates. Which of the following statements is correct regarding the new charge Q and electric field E?",
      option_a: "The charge on the plates increases (Q = K Q₀ > Q₀) while the electric field remains unchanged (E = E₀)",
      option_b: "Both the charge on the plates and the electric field increase by a factor of K",
      option_c: "The charge remains unchanged while the electric field decreases by a factor of K",
      option_d: "The potential difference increases while the stored energy remains constant",
      correct_option: "A",
      explanation: "Step 1: Because the battery remains connected, the potential difference across the plates is maintained constant at V = V₀.\n\nStep 2: The plate separation d is fixed, so the uniform electric field E = V / d = V₀ / d = E₀ remains unchanged.\n\nStep 3: Introducing a dielectric slab of constant K increases the capacitance to C = K C₀.\n\nStep 4: The new charge on the capacitor plates becomes:\nQ = C V₀ = (K C₀) V₀ = K Q₀ > Q₀.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 1 (Q1 to Q30)...');

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
