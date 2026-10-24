const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart3 = [
  {
    id: 3450,
    similarQuestion: {
      question: "The current in a coil of self-inductance 2.5 H increases uniformly from zero to 4 A in 0.2 seconds. The magnitude of the induced electromotive force in the coil is:",
      option_a: "25 V",
      option_b: "50 V",
      option_c: "10 V",
      option_d: "100 V",
      correct_option: "B",
      explanation: "Step 1: The magnitude of the self-induced emf in a coil of inductance L is given by:\ne = L × |dI / dt|\n\nStep 2: Calculate the rate of change of current:\n|dI / dt| = (4 A - 0 A) / (0.2 s) = 20 A/s\n\nStep 3: Calculate the induced emf:\ne = 2.5 H × 20 A/s = 50 V.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3451,
    similarQuestion: {
      question: "A closely wound coil of 200 turns and cross-sectional area 2 cm² has a self-inductance of 4 mH. When carrying a steady current of 2 A, the average magnetic flux density (B) within the coil is:",
      option_a: "0.2 T",
      option_b: "0.4 T",
      option_c: "0.1 T",
      option_d: "0.05 T",
      correct_option: "A",
      explanation: "Step 1: The total magnetic flux linked with a coil of N turns is related to its self-inductance by:\nN × Φ = L × I\nwhere Φ = B × A is the flux through each single turn.\n\nStep 2: Rearrange to solve for the magnetic flux density B:\nB = (L × I) / (N × A)\n\nStep 3: Convert area to SI units and substitute values:\nA = 2 cm² = 2 × 10⁻⁴ m²\nL = 4 mH = 4 × 10⁻³ H\nN = 200\nI = 2 A\n\nB = (4 × 10⁻³ H × 2 A) / (200 × 2 × 10⁻⁴ m²) = (8 × 10⁻³) / (4 × 10⁻²) = 0.2 T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3452,
    similarQuestion: {
      question: "Which of the following statements regarding the phenomenon of self-inductance is INCORRECT?",
      option_a: "Self-inductance is the electromagnetic analogue of mechanical inertia",
      option_b: "Self-inductance accelerates the growth and decay of electric current in a circuit",
      option_c: "The SI unit of self-inductance is henry (H) or volt-second per ampere",
      option_d: "Self-induced emf always opposes any change in the current linked with the circuit",
      correct_option: "B",
      explanation: "Step 1: By Lenz's law, the self-induced back emf always opposes any change in the current (it opposes current growth as well as current decay).\n\nStep 2: Consequently, self-inductance delays or retards the rate at which current rises or falls, acting as electrical inertia.\n\nStep 3: Hence, the assertion that self-inductance accelerates current growth and decay is completely incorrect.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3453,
    similarQuestion: {
      question: "A closely wound coil has 500 turns and a self-inductance of 10 mH. When an electric current of 4 mA passes through the coil, the magnetic flux linked with each individual turn of the coil is:",
      option_a: "8.0 × 10⁻⁸ Wb",
      option_b: "4.0 × 10⁻⁸ Wb",
      option_c: "2.0 × 10⁻⁷ Wb",
      option_d: "1.6 × 10⁻⁶ Wb",
      correct_option: "A",
      explanation: "Step 1: The total magnetic flux linkage of a coil of N turns is:\nN × Φ = L × I\nwhere Φ is the flux linked with a single turn.\n\nStep 2: Solve for Φ:\nΦ = (L × I) / N\n\nStep 3: Substitute the numerical values:\nL = 10 mH = 10 × 10⁻³ H = 10⁻² H\nI = 4 mA = 4 × 10⁻³ A\nN = 500\n\nΦ = (10⁻² H × 4 × 10⁻³ A) / 500 = (4 × 10⁻⁵) / 500 = 8.0 × 10⁻⁸ Wb.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3454,
    similarQuestion: {
      question: "A planar conducting loop is placed in a uniform magnetic field of 0.4 T perpendicular to its plane. If the enclosed area of the loop increases at a steady rate of 2.5 m²/s, the magnitude of the induced emf in the loop is:",
      option_a: "0.5 V",
      option_b: "0.8 V",
      option_c: "2.0 V",
      option_d: "1.0 V",
      correct_option: "D",
      explanation: "Step 1: The magnetic flux through a planar loop of area A in a perpendicular magnetic field B is:\nΦ = B × A\n\nStep 2: By Faraday's law of induction, the induced emf is:\ne = dΦ / dt = B × (dA / dt)\n\nStep 3: Substitute B = 0.4 T and dA/dt = 2.5 m²/s:\ne = 0.4 T × 2.5 m²/s = 1.0 V.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3455,
    similarQuestion: {
      question: "In an electrical circuit containing an inductor and a resistor, the electric current does not immediately jump to its final steady-state value when the switch is closed because:",
      option_a: "The self-induced back emf opposes the growth of current according to Lenz's law",
      option_b: "Electrons experience excessive resistance only at the start",
      option_c: "The battery takes time to develop its terminal potential",
      option_d: "The heating of the resistor delays the flow of charges",
      correct_option: "A",
      explanation: "Step 1: As current begins to increase from zero, the expanding magnetic field creates a time-varying magnetic flux through the inductor coil.\n\nStep 2: According to Faraday's and Lenz's laws, this changing flux generates a back emf (e = -L di/dt) directed opposite to the battery voltage.\n\nStep 3: This opposing emf acts as electrical inertia, preventing instantaneous rise and causing the current to grow smoothly and exponentially.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3456,
    similarQuestion: {
      question: "An electric current flowing through an inductor of self-inductance L = 2.0 H changes uniformly at a rate of 5.0 A/s. The magnitude of the self-induced electromotive force across the inductor is:",
      option_a: "10.0 V",
      option_b: "2.5 V",
      option_c: "0.4 V",
      option_d: "20.0 V",
      correct_option: "A",
      explanation: "Step 1: The magnitude of the self-induced emf across an inductor is given by:\ne = L × |di / dt|\n\nStep 2: Substitute L = 2.0 H and |di/dt| = 5.0 A/s:\ne = 2.0 H × 5.0 A/s = 10.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3457,
    similarQuestion: {
      question: "If the electric current in an inductor increases linearly with time according to i(t) = k t (where k is a positive constant), the magnitude of the self-induced emf across the inductor over time:",
      option_a: "Increases linearly with time",
      option_b: "Remains constant in magnitude",
      option_c: "Decreases exponentially to zero",
      option_d: "Is identically zero",
      correct_option: "B",
      explanation: "Step 1: The self-induced emf across an inductor is:\ne = -L × (di / dt)\n\nStep 2: For current increasing linearly with time, i(t) = k t, the first derivative is:\ndi / dt = d(k t) / dt = k = constant\n\nStep 3: Therefore, the magnitude of induced emf is:\n|e| = L × k = constant over time.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3458,
    similarQuestion: {
      question: "Self-induction of an electrical coil is the fundamental property by virtue of which the coil:",
      option_a: "Increases the net electric charge in the circuit",
      option_b: "Converts DC into AC automatically",
      option_c: "Opposes any change in the magnitude or direction of current flowing through itself",
      option_d: "Eliminates all resistance in the circuit",
      correct_option: "C",
      explanation: "Step 1: Self-induction occurs when a changing current in a coil alters its own linked magnetic flux.\n\nStep 2: By Faraday's law and Lenz's law, the induced emf in the coil is directed to oppose the cause producing it.\n\nStep 3: Hence, self-induction opposes both the growth and the decay of current through the coil.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3459,
    similarQuestion: {
      question: "In the mathematical and physical analogy between translational mechanical systems and electrical circuits, the electrical analogue of mechanical mass (inertia) is:",
      option_a: "Electrical resistance R",
      option_b: "Electric charge q",
      option_c: "Self-inductance L",
      option_d: "Capacitance C",
      correct_option: "C",
      explanation: "Step 1: In mechanics, mass m represents inertia, which resists any change in linear velocity v: Kinetic Energy = (1/2) m v².\n\nStep 2: In electricity, self-inductance L resists any change in electric current i (rate of flow of charge): Magnetic Energy = (1/2) L i².\n\nStep 3: Newton's second law F = m (dv/dt) is directly analogous to inductor voltage v = L (di/dt). Thus, L is the electrical analogue of mass.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3460,
    similarQuestion: {
      question: "In a branch of a circuit, a current I = 2 A is flowing from point A to point B and is decreasing at the rate of 3 A/s. The branch contains a resistor R = 4 Ω and an inductor L = 1 H in series. The potential difference (V_A - V_B) is:",
      option_a: "11 V",
      option_b: "8 V",
      option_c: "5 V",
      option_d: "3 V",
      correct_option: "C",
      explanation: "Step 1: Apply Kirchhoff's potential loop tracking from point A to point B:\nV_A - I × R - L × (dI / dt) = V_B\n\nStep 2: Since current is decreasing, the rate of change is negative:\ndI / dt = -3 A/s.\n\nStep 3: Substitute the given numerical values:\nV_A - (2 A × 4 Ω) - [1 H × (-3 A/s)] = V_B\nV_A - 8 + 3 = V_B\nV_A - 5 = V_B => V_A - V_B = 5 V.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3461,
    similarQuestion: {
      question: "A long air-core solenoid has a self-inductance L. If all its linear dimensions (length and diameter) are doubled while keeping the total number of turns constant, its new self-inductance becomes:",
      option_a: "L / 2",
      option_b: "4 L",
      option_c: "2 L",
      option_d: "L",
      correct_option: "C",
      explanation: "Step 1: The self-inductance of a solenoid with total turns N, length l, and cross-sectional area A is:\nL = (μ₀ × N² × A) / l\n\nStep 2: Area of a circular cross-section is A = π × (d/2)² ∝ d².\nWhen diameter d is doubled, area becomes A' = 4 A.\nWhen length l is doubled, l' = 2 l.\n\nStep 3: Calculate the new self-inductance L':\nL' = [μ₀ × N² × (4 A)] / (2 l) = 2 × [(μ₀ × N² × A) / l] = 2 L.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3462,
    similarQuestion: {
      question: "The formula for the self-inductance L of a closely wound long solenoid of length l, cross-sectional area A, and total number of turns N in free space is:",
      option_a: "(μ₀ × N² × A) / l",
      option_b: "(μ₀ × N × A) / l",
      option_c: "(μ₀ × N² × l) / A",
      option_d: "(μ₀ × N × l) / A",
      correct_option: "A",
      explanation: "Step 1: The magnetic field inside a long solenoid of turns per unit length n = N / l carrying current I is B = μ₀ n I = μ₀ (N / l) I.\n\nStep 2: The magnetic flux through each turn is Φ = B × A = [μ₀ (N / l) I] × A.\n\nStep 3: The total magnetic flux linkage is:\nN × Φ = N × [μ₀ (N / l) I A] = [μ₀ N² A / l] × I\n\nStep 4: Since total flux linkage equals L × I, the self-inductance is:\nL = (μ₀ × N² × A) / l.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3463,
    similarQuestion: {
      question: "If all linear dimensions of a coil of fixed number of turns are scaled up by a factor of 3, the self-inductance of the coil increases by a factor of:",
      option_a: "9",
      option_b: "27",
      option_c: "3",
      option_d: "1",
      correct_option: "C",
      explanation: "Step 1: For any geometric inductor coil with fixed number of turns N:\nL ∝ (Area) / (Length)\n\nStep 2: When linear dimensions are multiplied by a scale factor k = 3:\nArea scales as k² = 3² = 9\nLength scales as k = 3\n\nStep 3: The new inductance scales as:\nL' / L = (k²) / k = k = 3.\nTherefore, the self-inductance increases by a factor of 3.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3464,
    similarQuestion: {
      question: "An air-core solenoid has a self-inductance of 0.25 mH. When an iron rod of relative magnetic permeability μ_r = 800 is inserted as a core inside the solenoid, its new self-inductance becomes:",
      option_a: "800 mH",
      option_b: "200 mH",
      option_c: "40 mH",
      option_d: "25 mH",
      correct_option: "B",
      explanation: "Step 1: The self-inductance of an air-core solenoid is L₀ = μ₀ n² A l.\n\nStep 2: When filled with a magnetic material of relative permeability μ_r, the permeability becomes μ = μ_r × μ₀, and the self-inductance becomes:\nL = μ_r × L₀\n\nStep 3: Substitute the given values:\nL = 800 × (0.25 mH) = 200 mH.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3465,
    similarQuestion: {
      question: "A circular toroid of mean circumference 2π R and cross-sectional area A has N closely spaced turns wound uniformly over its non-magnetic core. The self-inductance of the toroid is:",
      option_a: "(μ₀ × N × A) / (2π R)",
      option_b: "(2π μ₀ × N² × A) / R",
      option_c: "(μ₀ × N² × R) / A",
      option_d: "(μ₀ × N² × A) / (2π R)",
      correct_option: "D",
      explanation: "Step 1: The magnetic field within the core of a toroid of mean radius R carrying current I is:\nB = (μ₀ × N × I) / (2π R)\n\nStep 2: The magnetic flux linked with each turn of cross-sectional area A is:\nΦ = B × A = [(μ₀ × N × I) / (2π R)] × A\n\nStep 3: The total flux linkage is N Φ = L I:\nL = (N × Φ) / I = (μ₀ × N² × A) / (2π R).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3466,
    similarQuestion: {
      question: "The self-inductance of a solenoid having total turns N, length l, and radius r is directly proportional to:",
      option_a: "N × r / l",
      option_b: "N² × r / l",
      option_c: "N × r² / l²",
      option_d: "N² × r² / l",
      correct_option: "D",
      explanation: "Step 1: The self-inductance of a cylindrical solenoid is:\nL = (μ₀ × N² × A) / l\n\nStep 2: The cross-sectional area of the solenoid is A = π r².\n\nStep 3: Substituting A yields:\nL = (μ₀ × π × N² × r²) / l\nThus, L is directly proportional to (N² × r² / l).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3467,
    similarQuestion: {
      question: "The self-inductance of a single, straight thin metallic wire carrying direct current is considered to be:",
      option_a: "Infinite",
      option_b: "Proportional to cross-sectional area",
      option_c: "Inversely proportional to length",
      option_d: "Practically zero (negligible)",
      correct_option: "D",
      explanation: "Step 1: Self-inductance requires a closed geometrical loop or multi-turn coil to enclose magnetic flux lines.\n\nStep 2: For an isolated straight thin wire, the magnetic field lines form concentric circles around it in open space without enclosing any cross-sectional area of a loop.\n\nStep 3: Hence, the magnetic flux linkage per unit current is practically negligible, so its self-inductance is considered zero.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3468,
    similarQuestion: {
      question: "A primary circuit containing a DC battery and an open switch is located near a stationary closed secondary copper ring. At the instant the switch in the primary circuit is closed, an induced current in the secondary ring:",
      option_a: "Does not flow because there is no physical connection",
      option_b: "Flows momentarily in a direction opposing the buildup of magnetic flux",
      option_c: "Flows continuously as a steady direct current",
      option_d: "Flows in the direction that reinforces the primary field",
      correct_option: "B",
      explanation: "Step 1: When the switch is closed, current in the primary coil grows rapidly from zero to its steady-state value.\n\nStep 2: This creates an increasing magnetic field, producing a changing magnetic flux (dΦ/dt > 0) through the adjacent secondary ring.\n\nStep 3: By Lenz's law, an induced current is generated momentarily in the secondary ring to oppose this flux buildup until steady state is reached, at which point dΦ/dt = 0 and induced current ceases.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3469,
    similarQuestion: {
      question: "A small closed metallic loop is placed in the plane of and completely inside a larger circular circuit that contains a switch and battery. When the switch in the outer circuit is suddenly closed, the induced current in the small inner loop:",
      option_a: "Circulates in the opposite sense to the increasing current in the outer loop",
      option_b: "Circulates in the same sense as the increasing current in the outer loop",
      option_c: "Is zero because the loop is inside",
      option_d: "Flows along the radial direction",
      correct_option: "A",
      explanation: "Step 1: When the switch is closed, current in the outer loop increases, establishing an increasing magnetic field through the inner area.\n\nStep 2: According to Lenz's law, the induced current in the inner loop must oppose this increase by generating an opposing magnetic field.\n\nStep 3: To generate an opposing magnetic field, the induced current in the inner loop must circulate in the opposite direction (opposite sense) to the current in the outer loop.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3470,
    similarQuestion: {
      question: "In a gravity-free environment, a bar magnet is pushed with its North pole directed towards a stationary copper ring. According to Lenz's law, the side of the ring facing the approaching magnet develops:",
      option_a: "A North pole, exerting a repulsive force on the approaching magnet",
      option_b: "A South pole, exerting an attractive force on the approaching magnet",
      option_c: "No magnetic polarity",
      option_d: "Alternating poles that cause oscillation",
      correct_option: "A",
      explanation: "Step 1: As the North pole of the magnet approaches the copper ring, the magnetic flux directed towards the ring increases.\n\nStep 2: By Lenz's law, the induced current will generate an opposing magnetic field pointing back towards the approaching magnet.\n\nStep 3: This makes the facing surface of the ring act as a North magnetic pole, resulting in a repulsive force that opposes the motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3471,
    similarQuestion: {
      question: "A cylindrical bar magnet is released from rest along the vertical axis of a very long, hollow copper tube. As the magnet falls through the tube, its motion is characterized by:",
      option_a: "A constant downward acceleration equal to g at all times",
      option_b: "An acceleration initially less than g, eventually reaching a constant terminal velocity",
      option_c: "An acceleration continuously increasing and greater than g",
      option_d: "Instantaneous stopping as soon as it enters the tube",
      correct_option: "B",
      explanation: "Step 1: The moving magnet induces eddy currents in the walls of the highly conducting copper tube.\n\nStep 2: By Lenz's law, the magnetic field produced by these eddy currents exerts an upward retarding force on the falling magnet.\n\nStep 3: Consequently, the downward acceleration is a = g - (F_magnetic / m) < g. As speed increases, the magnetic retarding force increases until it equals the gravitational weight (m g), whereupon the magnet continues downward at a steady terminal velocity.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3472,
    similarQuestion: {
      question: "A cylindrical bar magnet is dropped vertically through a long vertical copper pipe that has a continuous longitudinal slit cut along its entire length. In this case, the magnet falls with an acceleration:",
      option_a: "Strictly zero",
      option_b: "Nearly equal to g (acceleration due to gravity)",
      option_c: "Much less than g due to terminal velocity",
      option_d: "Greater than g",
      correct_option: "B",
      explanation: "Step 1: Eddy currents require continuous closed conducting circular paths around the circumference of the tube to circulate and generate significant magnetic braking.\n\nStep 2: The presence of a longitudinal slit cuts all circumferential paths, introducing a high-resistance air gap that breaks the circular eddy current loops.\n\nStep 3: Without complete eddy current loops, the magnetic retarding force is practically absent, and the magnet falls freely with an acceleration approximately equal to g.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3473,
    similarQuestion: {
      question: "A cylindrical bar magnet is placed along the axis of a circular conducting coil. If the magnet is rotated continuously about its own longitudinal axis of symmetry, the electromotive force induced in the coil is:",
      option_a: "Directly proportional to the angular speed of rotation",
      option_b: "Zero at all times",
      option_c: "Alternating sinusoidally",
      option_d: "Inversely proportional to the coil resistance",
      correct_option: "B",
      explanation: "Step 1: The magnetic field produced by a cylindrical bar magnet is axisymmetric (symmetrical about its longitudinal axis).\n\nStep 2: Rotating the magnet about its own symmetry axis does not alter the spatial distribution of the magnetic field in any way.\n\nStep 3: Therefore, the magnetic flux Φ passing through the coaxial coil remains completely constant over time (dΦ / dt = 0), and by Faraday's law, the induced emf is strictly zero.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3474,
    similarQuestion: {
      question: "A light aluminium ring is placed loosely over the projecting soft-iron core of a horizontal electromagnetic solenoid connected to a battery and a switch. When the switch is suddenly closed, the aluminium ring:",
      option_a: "Remains completely stationary",
      option_b: "Is strongly attracted towards the solenoid core",
      option_c: "Jumps away from the solenoid due to mutual electromagnetic repulsion",
      option_d: "Begins to rotate about its axis without moving away",
      correct_option: "C",
      explanation: "Step 1: When the switch is closed, the current in the solenoid surges from zero to its steady-state value, producing a rapidly increasing magnetic flux.\n\nStep 2: Large eddy currents are induced in the closed aluminium ring.\n\nStep 3: According to Lenz's law, the magnetic polarity developed by the induced current opposes the growing field of the solenoid, resulting in a strong repulsive force that launches the ring away.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3475,
    similarQuestion: {
      question: "Two magnetically coupled circuits have a mutual inductance of 0.2 H. If the current in the primary circuit changes uniformly from zero to 15 A in 0.06 seconds, the average electromotive force induced in the secondary circuit is:",
      option_a: "25 V",
      option_b: "100 V",
      option_c: "50 V",
      option_d: "15 V",
      correct_option: "C",
      explanation: "Step 1: The magnitude of average induced emf in the secondary circuit is:\ne = M × |ΔI / Δt|\n\nStep 2: Substitute the given parameters:\nM = 0.2 H\nΔI = 15 A - 0 A = 15 A\nΔt = 0.06 s\n\ne = 0.2 H × (15 A / 0.06 s) = 0.2 × 250 = 50 V.\n\nTherefore, Option (C) is the correct answer."
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
    console.log('Login successful for Set 56 Part 3.');

    for (let i = 0; i < questionsPart3.length; i++) {
      const q = questionsPart3[i];
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
      console.log(`Updated question ${i + 53}/${questionsPart3.length + 52} (ID: ${q.id})`);
    }
    console.log('Set 56 Part 3 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 56 Part 3:', err.message);
  }
}

run();
