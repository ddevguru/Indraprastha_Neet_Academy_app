const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart4 = [
  {
    id: 3476,
    similarQuestion: {
      question: "An ideal step-up transformer has 100 turns in its primary coil and 500 turns in its secondary coil. If an alternating voltage of 24 V is supplied to the primary coil, the voltage developed across the secondary coil is:",
      option_a: "4.8 V",
      option_b: "48 V",
      option_c: "120 V",
      option_d: "240 V",
      correct_option: "C",
      explanation: "Step 1: For an ideal transformer, the ratio of voltages is equal to the turns ratio:\nV_s / V_p = N_s / N_p\n\nStep 2: Solve for secondary voltage V_s:\nV_s = V_p × (N_s / N_p)\n\nStep 3: Substitute the given values:\nV_s = 24 V × (500 / 100) = 24 × 5 = 120 V.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3477,
    similarQuestion: {
      question: "A long, straight wire carrying a current I is placed precisely along the central symmetry axis of a circular conducting loop of radius R. The mutual inductance between the straight wire and the loop is:",
      option_a: "μ₀ R / 2",
      option_b: "μ₀ R",
      option_c: "μ₀ / (2π R)",
      option_d: "Zero",
      correct_option: "D",
      explanation: "Step 1: The magnetic field lines produced by a long, straight current-carrying wire form concentric circles centered on the wire in planes perpendicular to the wire.\n\nStep 2: Since the circular loop is positioned coaxially with the wire, the plane of the loop contains the concentric magnetic field lines.\n\nStep 3: Consequently, the magnetic field vectors lie entirely within the plane of the loop and do not pierce its surface (B⃗ is parallel to the surface, B⃗ · n̂ = 0).\nTherefore, the magnetic flux through the loop is zero, and the mutual inductance is zero.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3478,
    similarQuestion: {
      question: "A small square conducting loop of side length a is placed coplanar and concentric at the centre of a large square loop of side length b (where b >> a). The mutual inductance M between the two square loops is proportional to:",
      option_a: "a / b",
      option_b: "a² / b",
      option_c: "a / b²",
      option_d: "a² / b²",
      correct_option: "B",
      explanation: "Step 1: When a current I flows through the large outer square loop of side b, the magnetic field at its centre is:\nB ∝ μ₀ I / b\n\nStep 2: Since the inner loop is small (b >> a), the magnetic field over its area can be treated as uniform and equal to B.\n\nStep 3: The magnetic flux linked with the inner loop of area A = a² is:\nΦ = B × A ∝ (I / b) × a²\n\nStep 4: Since mutual inductance is defined by M = Φ / I, we have:\nM ∝ a² / b.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3479,
    similarQuestion: {
      question: "A small circular loop of radius r is placed coplanar and concentric at the centre of a large circular loop of radius R (where R >> r). The mutual inductance between the two loops is proportional to:",
      option_a: "r / R",
      option_b: "r² / R",
      option_c: "r² / R²",
      option_d: "r / R²",
      correct_option: "B",
      explanation: "Step 1: The magnetic field at the centre of the large loop of radius R carrying current I is:\nB = (μ₀ × I) / (2R)\n\nStep 2: Because r << R, this field is uniform across the small loop's area A = π r².\n\nStep 3: The magnetic flux linked with the small loop is:\nΦ = B × A = [(μ₀ × I) / (2R)] × (π r²)\n\nStep 4: The mutual inductance is M = Φ / I = (μ₀ π r²) / (2R), which is proportional to r² / R.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3480,
    similarQuestion: {
      question: "Two magnetically coupled coils have self-inductance coefficients L₁ = 16 mH and L₂ = 9 mH. If all the magnetic flux from one coil links completely with the other (coupling coefficient k = 1), their coefficient of mutual inductance M is:",
      option_a: "12 mH",
      option_b: "25 mH",
      option_c: "144 mH",
      option_d: "7 mH",
      correct_option: "A",
      explanation: "Step 1: The coefficient of mutual inductance M between two coils is related to their self-inductances by:\nM = k × √(L₁ × L₂)\nwhere k is the coupling coefficient (0 ≤ k ≤ 1).\n\nStep 2: For perfect magnetic coupling, k = 1:\nM = √(L₁ × L₂)\n\nStep 3: Substitute L₁ = 16 mH and L₂ = 9 mH:\nM = √(16 × 9) = √144 = 12 mH.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3481,
    similarQuestion: {
      question: "The coefficient of mutual inductance between two circular coils of given fixed radii is maximum when the two coils are arranged:",
      option_a: "Coaxially with their planes parallel and close to each other",
      option_b: "With their planes mutually perpendicular",
      option_c: "In the same plane with large separation",
      option_d: "At an angle of 45° to each other",
      correct_option: "A",
      explanation: "Step 1: Mutual inductance depends on the degree of magnetic flux linkage between the two coils.\n\nStep 2: When the coils are coaxial with their planes parallel and placed close together, virtually all magnetic field lines from the primary pass directly through the secondary coil (coupling coefficient k approaches 1).\n\nStep 3: If their planes are perpendicular, k approaches 0 because the field lines run parallel to the plane of the other coil.\nHence, mutual inductance is maximum in the coaxial configuration.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3482,
    similarQuestion: {
      question: "Two pure inductors, each of self-inductance L = 6 H, are connected in parallel such that their magnetic fields do not interact (negligible mutual inductance). The equivalent self-inductance of the combination is:",
      option_a: "12 H",
      option_b: "6 H",
      option_c: "3 H",
      option_d: "1.5 H",
      correct_option: "C",
      explanation: "Step 1: For parallel-connected inductors without mutual inductance, the equivalent inductance formula is analogous to resistors in parallel:\n1 / L_eq = 1 / L₁ + 1 / L₂\n\nStep 2: When L₁ = L₂ = L:\n1 / L_eq = 1/L + 1/L = 2/L => L_eq = L / 2\n\nStep 3: For L = 6 H:\nL_eq = 6 H / 2 = 3 H.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3483,
    similarQuestion: {
      question: "Three identical pure inductors of self-inductance 9.0 H each are connected in parallel. Assuming zero mutual inductance between them, the equivalent inductance of the combination is:",
      option_a: "27.0 H",
      option_b: "3.0 H",
      option_c: "9.0 H",
      option_d: "1.0 H",
      correct_option: "B",
      explanation: "Step 1: For n identical uncoupled inductors connected in parallel:\nL_eq = L / n\n\nStep 2: With L = 9.0 H and n = 3:\nL_eq = 9.0 H / 3 = 3.0 H.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3484,
    similarQuestion: {
      question: "In the International System of Units (SI), the unit of magnetic flux is the:",
      option_a: "Tesla (T)",
      option_b: "Weber (Wb)",
      option_c: "Henry (H)",
      option_d: "Gauss (G)",
      correct_option: "B",
      explanation: "Step 1: Magnetic flux is defined as the surface integral of magnetic field over an area: Φ = ∫ B⃗ · dA⃗.\n\nStep 2: The SI unit of magnetic field B is tesla (T) and area A is m².\n\nStep 3: Thus, the unit of magnetic flux is tesla-metre² (T·m²), which is given the special SI name Weber (Wb).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3485,
    similarQuestion: {
      question: "The dimensional formula of magnetic flux Φ is:",
      option_a: "[M¹ L² T⁻¹ A⁻¹]",
      option_b: "[M¹ L¹ T⁻² A⁻¹]",
      option_c: "[M¹ L² T⁻³ A⁻¹]",
      option_d: "[M¹ L² T⁻² A⁻¹]",
      correct_option: "D",
      explanation: "Step 1: From Faraday's law of induction: e = dΦ / dt => Φ = e × t.\n\nStep 2: Electromotive force e has the dimensions of electric potential (Work / Charge):\n[e] = [Work] / [q] = [M¹ L² T⁻²] / [A¹ T¹] = [M¹ L² T⁻³ A⁻¹].\n\nStep 3: Multiply by time [T¹]:\n[Φ] = [M¹ L² T⁻³ A⁻¹] × [T¹] = [M¹ L² T⁻² A⁻¹].\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3486,
    similarQuestion: {
      question: "A flat circular coil of area 0.04 m² is placed with its plane perpendicular to a uniform magnetic field of 0.5 T. The magnetic flux linked with the coil is:",
      option_a: "0.02 Wb",
      option_b: "0.20 Wb",
      option_c: "0.08 Wb",
      option_d: "0.01 Wb",
      correct_option: "A",
      explanation: "Step 1: When the plane of the coil is perpendicular to the magnetic field, the normal area vector n̂ is parallel to B⃗ (angle θ = 0°).\n\nStep 2: The magnetic flux linked with the coil is:\nΦ = B × A × cos 0° = B × A\n\nStep 3: Substitute B = 0.5 T and A = 0.04 m²:\nΦ = 0.5 T × 0.04 m² = 0.02 Wb = 2.0 × 10⁻² Wb.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3487,
    similarQuestion: {
      question: "A planar square loop of side length ℓ lies in the xy-plane. A uniform magnetic field B⃗ = B₀ k̂ is directed along the +z-axis. The total magnetic flux passing through the square loop is:",
      option_a: "Zero",
      option_b: "B₀ × ℓ²",
      option_c: "2 B₀ × ℓ²",
      option_d: "B₀ × ℓ² / 2",
      correct_option: "B",
      explanation: "Step 1: The area vector of the loop lying in the xy-plane is directed along the normal to the plane: A⃗ = ℓ² k̂.\n\nStep 2: The magnetic flux is given by the dot product:\nΦ = B⃗ · A⃗ = (B₀ k̂) · (ℓ² k̂) = B₀ × ℓ² × (k̂ · k̂) = B₀ × ℓ².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3488,
    similarQuestion: {
      question: "According to Gauss's Law for magnetism (one of Maxwell's fundamental equations), the net magnetic flux through any closed Gaussian surface enclosing any volume is:",
      option_a: "Directly proportional to the enclosed magnetic pole strength",
      option_b: "Equal to μ₀ times the enclosed current",
      option_c: "Always identically zero",
      option_d: "Dependent on the shape of the surface",
      correct_option: "C",
      explanation: "Step 1: Gauss's Law for magnetism is expressed mathematically as:\n∮ B⃗ · dA⃗ = 0\n\nStep 2: This law reflects the empirical physical fact that isolated magnetic monopoles do not exist in nature; magnetic poles always occur in matched pairs (dipoles).\n\nStep 3: Hence, every magnetic field line entering a closed volume must also exit it, making the net outward magnetic flux identically zero.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3489,
    similarQuestion: {
      question: "Which of the following correctly describes the properties of magnetic field lines produced by a permanent bar magnet?",
      option_a: "They form continuous, unbroken closed loops running from North to South outside and South to North inside",
      option_b: "They originate at the North pole and terminate abruptly at the South pole",
      option_c: "They intersect each other at points of zero magnetic field",
      option_d: "They exist only outside the magnet and cannot pass through its interior",
      correct_option: "A",
      explanation: "Step 1: Unlike electrostatic field lines that begin on positive charges and end on negative charges, magnetic field lines form continuous closed curves.\n\nStep 2: Outside the bar magnet, the field lines emerge from the North pole and curve towards the South pole.\n\nStep 3: Inside the magnet, the field lines continue straight from the South pole to the North pole to complete the closed loop.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3490,
    similarQuestion: {
      question: "When the magnetic flux linked with a circuit of electrical resistance R changes by an amount ΔΦ during a time interval Δt, the total electric charge Q that flows through the circuit during this interval is:",
      option_a: "ΔΦ / Δt",
      option_b: "(ΔΦ / R) × Δt",
      option_c: "R × (ΔΦ / Δt)",
      option_d: "ΔΦ / R",
      correct_option: "D",
      explanation: "Step 1: By Faraday's law of induction, the induced electromotive force is:\ne = |dΦ / dt|\n\nStep 2: The instantaneous induced electric current is:\ni = e / R = (1 / R) × |dΦ / dt|\n\nStep 3: The total induced charge Q is the time integral of current:\nQ = ∫ i dt = (1 / R) × ∫ |dΦ / dt| dt = ΔΦ / R.\nNotice that Q depends ONLY on the total change in flux ΔΦ and circuit resistance R, and is completely independent of the time interval Δt.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3491,
    similarQuestion: {
      question: "According to Faraday's law of electromagnetic induction, the magnitude of the induced electromotive force in a circuit is directly proportional to:",
      option_a: "The total magnetic flux linked with the circuit",
      option_b: "The time rate of change of magnetic flux linked with the circuit",
      option_c: "The electrical resistance of the circuit",
      option_d: "The temperature of the conductor",
      correct_option: "B",
      explanation: "Step 1: Faraday's law states that an emf is induced in a circuit whenever the magnetic flux through it changes with time.\n\nStep 2: Quantitatively, the induced emf is given by:\ne = -dΦ / dt\n\nStep 3: Thus, e is directly proportional to the time rate of change of magnetic flux.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3492,
    similarQuestion: {
      question: "The magnetic flux Φ (in Wb) linked with a closed coil of resistance 5 Ω varies with time according to Φ(t) = 4 t² + 2 t + 3. The magnitude of induced electric current in the coil at time t = 1 s is:",
      option_a: "1.0 A",
      option_b: "5.0 A",
      option_c: "3.0 A",
      option_d: "2.0 A",
      correct_option: "D",
      explanation: "Step 1: Differentiate the magnetic flux function with respect to time to find the induced emf:\ne = |dΦ / dt| = d(4 t² + 2 t + 3) / dt = 8 t + 2\n\nStep 2: Evaluate the induced emf at t = 1 s:\ne(1) = 8(1) + 2 = 10 V.\n\nStep 3: Use Ohm's law to find the induced current:\nI = e / R = 10 V / 5 Ω = 2.0 A.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3493,
    similarQuestion: {
      question: "A flat circular coil having 100 turns and an area of 50 cm² is placed perpendicular to a uniform magnetic field of 0.2 T. If the coil is flipped by 180° in a time interval of 0.1 s, the average induced emf is:",
      option_a: "2.0 V",
      option_b: "1.0 V",
      option_c: "4.0 V",
      option_d: "0.2 V",
      correct_option: "A",
      explanation: "Step 1: Initial flux: Φ₁ = N × B × A × cos 0° = N B A.\n\nStep 2: When rotated by 180°, the final flux is:\nΦ₂ = N × B × A × cos 180° = -N B A.\n\nStep 3: The magnitude of change in magnetic flux is:\n|ΔΦ| = |Φ₂ - Φ₁| = 2 N B A\n\nStep 4: Substitute the given values (A = 50 × 10⁻⁴ m² = 5 × 10⁻³ m²):\n|ΔΦ| = 2 × 100 × 0.2 T × (5 × 10⁻³ m²) = 40 × (5 × 10⁻³) = 0.2 Wb.\n\nStep 5: The average induced emf is:\ne = |ΔΦ| / Δt = 0.2 Wb / 0.1 s = 2.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3494,
    similarQuestion: {
      question: "Lenz's law of electromagnetic induction, which specifies the direction of induced current, is a direct manifestation of the principle of conservation of:",
      option_a: "Energy",
      option_b: "Electric charge",
      option_c: "Linear momentum",
      option_d: "Mass",
      correct_option: "A",
      explanation: "Step 1: Lenz's law states that an induced current always flows in such a direction that its magnetic field opposes the mechanical action or flux change that produces it.\n\nStep 2: An external mechanical force must do positive work against this opposing magnetic force to sustain the relative motion.\n\nStep 3: This mechanical work done is precisely transformed into electrical energy (and Joule heat) in the circuit, upholding the principle of conservation of energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3495,
    similarQuestion: {
      question: "A copper ring is held horizontally in air, and a cylindrical bar magnet is dropped vertically through the centre of the ring with its North pole pointing downward. The downward acceleration of the magnet as it falls towards the ring is:",
      option_a: "Equal to g at all times",
      option_b: "Strictly less than g",
      option_c: "Strictly greater than g",
      option_d: "Zero",
      correct_option: "B",
      explanation: "Step 1: As the falling magnet approaches the horizontal copper ring, downward magnetic flux through the ring increases.\n\nStep 2: By Lenz's law, the induced current in the ring produces an upward magnetic field to oppose the approaching magnet.\n\nStep 3: This creates an upward magnetic repulsive force F_m acting on the magnet.\n\nStep 4: The net downward force is F_net = m g - F_m < m g.\nTherefore, the downward acceleration is a = g - (F_m / m) < g.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3496,
    similarQuestion: {
      question: "In the study of electromagnetic phenomena, while Faraday's law of induction provides the quantitative magnitude of induced emf, Lenz's law uniquely provides:",
      option_a: "The magnitude of the magnetic field",
      option_b: "The direction of the induced electromotive force and induced current",
      option_c: "The speed of electromagnetic wave propagation",
      option_d: "The electrical resistance of the loop",
      correct_option: "B",
      explanation: "Step 1: Faraday's law states |e| = dΦ / dt, giving the numerical magnitude of induced emf.\n\nStep 2: The negative sign in e = -dΦ / dt represents Lenz's law, which states that the induced current establishes a magnetic field that opposes the original change in flux.\n\nStep 3: Hence, Lenz's law determines the direction of the induced emf and current.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3497,
    similarQuestion: {
      question: "A closed loop of copper wire is kept completely stationary in a region of space where a non-uniform magnetic field exists that is constant with respect to time. Under these conditions:",
      option_a: "An emf is induced but no current flows",
      option_b: "A steady direct current is induced",
      option_c: "Neither an emf nor a current is induced in the loop",
      option_d: "An alternating current is continuously induced",
      correct_option: "C",
      explanation: "Step 1: Electromagnetic induction occurs only when the magnetic flux linked with a circuit changes over time (dΦ / dt ≠ 0).\n\nStep 2: Although the magnetic field is spatially non-uniform, it is time-invariant (constant in time), and the loop itself is stationary (zero velocity).\n\nStep 3: Consequently, the magnetic flux through the loop does not vary with time: dΦ / dt = 0.\nTherefore, neither an emf nor a current is induced.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3498,
    similarQuestion: {
      question: "A square conducting loop of side length L and resistance R enters perpendicularly into a region of uniform magnetic field B with a constant velocity v. While the loop is partially inside the field (entering the field), the induced electric current flowing through it is:",
      option_a: "(B × L² × v) / R",
      option_b: "(B × v) / (R × L)",
      option_c: "(B² × L × v) / R",
      option_d: "(B × L × v) / R",
      correct_option: "D",
      explanation: "Step 1: As the leading arm of length L moves with velocity v into the magnetic field B, it cuts magnetic field lines, developing a motional emf:\ne = B × L × v\n\nStep 2: By Ohm's law, the induced current in the loop of resistance R is:\nI = e / R = (B × L × v) / R.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3499,
    similarQuestion: {
      question: "A semicircular conducting wire of radius R falls vertically in a horizontal uniform magnetic field B with its diameter horizontal. When the instantaneous downward velocity of the wire is v, the motional electromotive force induced across its two ends is:",
      option_a: "π × R × B × v",
      option_b: "2π × R × B × v",
      option_c: "B × v × R",
      option_d: "2 × B × v × R",
      correct_option: "D",
      explanation: "Step 1: The motional emf induced in any curved conductor moving with velocity v in a uniform magnetic field B is given by:\ne = B × v × L_eff\nwhere L_eff is the straight-line distance between the two endpoints of the conductor projected perpendicular to v.\n\nStep 2: For a semicircular wire of radius R whose diameter is horizontal, the straight-line displacement between its two ends is equal to the diameter:\nL_eff = 2 R\n\nStep 3: Therefore, the motional emf induced across the ends is:\ne = B × v × (2 R) = 2 B v R.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3500,
    similarQuestion: {
      question: "A rectangular conducting loop of width L and total resistance R is pulled with a constant speed v out of a uniform magnetic field B. The external mechanical power required to maintain this constant speed is:",
      option_a: "(B × L × v)² × R",
      option_b: "(B² × L² × v²) / R",
      option_c: "(B × L × v) / R",
      option_d: "(B² × L × v) / R²",
      correct_option: "B",
      explanation: "Step 1: The motional emf induced in the loop is e = B × L × v.\n\nStep 2: The induced current is I = e / R = (B L v) / R.\n\nStep 3: The magnetic force opposing the motion is:\nF = I × L × B = [(B L v) / R] × L × B = (B² L² v) / R\n\nStep 4: The mechanical power required to pull the loop at constant speed v against this opposing magnetic force is:\nP = F × v = [(B² L² v) / R] × v = (B² L² v²) / R.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3501,
    similarQuestion: {
      question: "A rectangular conducting loop containing a capacitor of capacitance C is pulled at constant speed v out of a region of uniform magnetic field B. If the length of the moving edge perpendicular to the velocity is L, the electric charge stored on the capacitor plates is:",
      option_a: "C × B × L / v",
      option_b: "C × B² × L × v",
      option_c: "C × B × L × v",
      option_d: "(B × L × v) / C",
      correct_option: "C",
      explanation: "Step 1: As the conducting wire of length L moves through the magnetic field B at velocity v, it generates a motional emf across its ends:\ne = B × L × v\n\nStep 2: This motional emf acts as a voltage source that charges the capacitor connected in the loop:\nV_cap = e = B × L × v\n\nStep 3: The electric charge accumulated on the capacitor plates is given by q = C × V_cap:\nq = C × B × L × v.\n\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Login successful for Set 56 Part 4.');

    for (let i = 0; i < questionsPart4.length; i++) {
      const q = questionsPart4[i];
      const res = await fetch(`${BASE_URL}/admin/practice-questions/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ similarQuestion: q.similarQuestion })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed on ID ${q.id} [${res.status}]: ${text}`);
      }
      console.log(`Updated question ${i + 79}/${questionsPart4.length + 78} (ID: ${q.id})`);
    }
    console.log('Set 56 Part 4 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 56 Part 4:', err.message);
  }
}

run();
