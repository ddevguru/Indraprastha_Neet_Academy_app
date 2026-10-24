const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart2 = [
  {
    id: 3147,
    similarQuestion: {
      question: "A uniform bar magnet having magnetic moment M and pole strength m is cut perpendicular to its length into two pieces such that the ratio of their lengths is 3 : 1. The ratio of the pole strengths of the two pieces is:",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "1 : 1",
      option_d: "9 : 1",
      correct_option: "C",
      explanation: "Step 1: The pole strength m of a bar magnet is determined solely by its cross-sectional area and the intensity of magnetization:\nm = I_m × A\n\nStep 2: When a magnet is cut perpendicular (transverse) to its magnetic axis (length), the cross-sectional area of both pieces remains completely unchanged.\n\nStep 3: Therefore, the pole strength of both pieces remains exactly m. The ratio of their pole strengths is 1 : 1.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3148,
    similarQuestion: {
      question: "The magnetic force of interaction between two identical short bar magnets whose centres are separated by a distance r along their common axial line is 32 mN. If their separation is increased to 2r, the force between them reduces to:",
      option_a: "16 mN",
      option_b: "8 mN",
      option_c: "4 mN",
      option_d: "2 mN",
      correct_option: "D",
      explanation: "Step 1: The magnetic interaction force between two small magnetic dipoles (short bar magnets) separated by distance r is inversely proportional to the fourth power of the distance:\nF ∝ 1 / r⁴\n\nStep 2: Relate the force at distance 2r to the initial force at distance r:\nF' / F = [r / (2r)]⁴ = (1 / 2)⁴ = 1 / 16\n\nStep 3: Calculate F':\nF' = F / 16 = 32 mN / 16 = 2 mN.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3149,
    similarQuestion: {
      question: "Two identical short bar magnets of magnetic dipole moment M each are placed mutually perpendicular to each other with their north poles pointing towards a common point O. At a point equidistant from both magnets along the angle bisector, the resultant magnetic field vector:",
      option_a: "Is directed along the bisector at 45° to both magnetic fields",
      option_b: "Is zero",
      option_c: "Is directed along the x-axis only",
      option_d: "Is directed along the y-axis only",
      correct_option: "A",
      explanation: "Step 1: Each magnet produces a magnetic field of equal magnitude B at the equidistant symmetrical point.\n\nStep 2: Since the two magnets are mutually perpendicular, their magnetic field vectors B⃗₁ and B⃗₂ are perpendicular to each other:\n|B⃗₁| = |B⃗₂| = B\n\nStep 3: The resultant field magnitude is:\nB_net = √(B² + B²) = √2 × B\nand its direction bisects the 90° angle between B⃗₁ and B⃗₂, making an angle of θ = tan⁻¹(B/B) = 45° with both field vectors.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3150,
    similarQuestion: {
      question: "To protect a delicate scientific instrument from external unwanted magnetic fields (magnetic shielding), the instrument must be completely enclosed within a casing made of:",
      option_a: "Diamagnetic substance like copper",
      option_b: "Ferromagnetic material of high permeability like soft iron",
      option_c: "Dielectric plastic insulation",
      option_d: "Aluminium sheet",
      correct_option: "B",
      explanation: "Step 1: Magnetic shielding relies on providing a path of very low magnetic reluctance for magnetic field lines around the protected region.\n\nStep 2: Soft iron and permalloy possess exceptionally high magnetic permeability (μ_r >> 1).\n\nStep 3: Consequently, external magnetic field lines crowd preferentially through the thick walls of the soft iron enclosure, leaving the hollow interior region virtually field-free.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3151,
    similarQuestion: {
      question: "Two like magnetic poles of strengths 9 A·m and 36 A·m are placed at a distance of 60 cm apart in air. The neutral point where the net magnetic field intensity is zero lies at a distance from the weaker pole of:",
      option_a: "15 cm",
      option_b: "20 cm",
      option_c: "30 cm",
      option_d: "40 cm",
      correct_option: "B",
      explanation: "Step 1: The magnetic field intensity due to a magnetic pole of strength m at distance d is:\nB = (μ₀ / 4π) × (m / d²)\n\nStep 2: At the neutral point between two like poles separated by distance L = 60 cm, the opposing fields cancel:\n(μ₀ / 4π) × (m₁ / x²) = (μ₀ / 4π) × [m₂ / (L - x)²]\nwhere x is the distance from the weaker pole m₁ = 9 A·m.\n\nStep 3: Simplify and take the square root on both sides:\n9 / x² = 36 / (60 - x)²\n3 / x = 6 / (60 - x)\n1 / x = 2 / (60 - x)\n60 - x = 2x => 3x = 60 => x = 20 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3152,
    similarQuestion: {
      question: "A small magnetic dipole of magnetic moment 5 A·m² is initially aligned parallel to a uniform external magnetic field of 0.4 T. What is the net work done in rotating the dipole by 90° from this stable equilibrium position?",
      option_a: "1.0 J",
      option_b: "2.0 J",
      option_c: "4.0 J",
      option_d: "0.5 J",
      correct_option: "B",
      explanation: "Step 1: The potential energy of a magnetic dipole in an external magnetic field B is:\nU(θ) = -M × B × cos θ\n\nStep 2: The external work done in rotating the dipole from θ₁ to θ₂ is:\nW = ΔU = -M × B × (cos θ₂ - cos θ₁)\nW = M × B × (cos θ₁ - cos θ₂)\n\nStep 3: Substitute θ₁ = 0° and θ₂ = 90°:\nW = (5 A·m²) × (0.4 T) × (cos 0° - cos 90°)\nW = 2.0 × (1 - 0) = 2.0 J.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3153,
    similarQuestion: {
      question: "At a specific geographic location, the horizontal component of Earth's magnetic field is 0.3 G and the vertical component is 0.3√3 G. The angle of magnetic dip (inclination) at this location is:",
      option_a: "30°",
      option_b: "45°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "C",
      explanation: "Step 1: The angle of dip δ is related to the horizontal component (B_H) and vertical component (B_V) of Earth's magnetic field by:\ntan δ = B_V / B_H\n\nStep 2: Substitute the given values:\nB_H = 0.3 G\nB_V = 0.3√3 G\n\ntan δ = (0.3√3) / (0.3) = √3\n\nStep 3: Solve for δ:\nδ = tan⁻¹(√3) = 60°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3154,
    similarQuestion: {
      question: "Two thin bar magnets of identical geometry and mass oscillate in the horizontal plane of Earth's magnetic field with frequencies of 12 oscillations per minute and 18 oscillations per minute respectively. The ratio of their magnetic dipole moments is:",
      option_a: "2 : 3",
      option_b: "4 : 9",
      option_c: "9 : 4",
      option_d: "3 : 2",
      correct_option: "B",
      explanation: "Step 1: The time period of oscillation of a magnetic dipole in a magnetic field B_H is:\nT = 2π × √(I / M B_H)\nTherefore, frequency f = 1 / T = (1 / 2π) × √(M B_H / I).\n\nStep 2: Since the two magnets have identical dimensions and mass, their moments of inertia I are identical. Thus:\nf ∝ √M => M ∝ f²\n\nStep 3: Take the ratio:\nM₁ / M₂ = (f₁ / f₂)² = (12 / 18)² = (2 / 3)² = 4 / 9 = 4 : 9.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3155,
    similarQuestion: {
      question: "When two identical bar magnets of equal magnetic moment M and moment of inertia I are joined together with their unlike poles adjacent to each other (anti-parallel combination), the time period of oscillation of the combination in a horizontal magnetic field becomes:",
      option_a: "Zero",
      option_b: "Double",
      option_c: "Infinite",
      option_d: "Halved",
      correct_option: "C",
      explanation: "Step 1: In the anti-parallel configuration, the net magnetic dipole moment is:\nM_net = M - M = 0\n\nStep 2: The restoring torque acting on the system in a uniform magnetic field is:\nτ = -M_net × B × sin θ = 0\n\nStep 3: Since there is zero restoring torque, the system cannot oscillate, and mathematically:\nT = 2π × √(I_net / M_net B) = 2π × √(2I / 0) = ∞ (infinite).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3156,
    similarQuestion: {
      question: "The relative magnetic permeability of a sample of annealed transformer steel is 4500. What is its magnetic susceptibility?",
      option_a: "4501",
      option_b: "4499",
      option_c: "4500 × 10⁻⁷",
      option_d: "4.5 × 10⁴",
      correct_option: "B",
      explanation: "Step 1: The relationship between relative magnetic permeability μ_r and magnetic susceptibility χ is:\nμ_r = 1 + χ\n\nStep 2: Rearrange to solve for magnetic susceptibility χ:\nχ = μ_r - 1\n\nStep 3: Substitute μ_r = 4500:\nχ = 4500 - 1 = 4499.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3157,
    similarQuestion: {
      question: "For a paramagnetic substance at room temperature, which of the following correctly describes its relative permeability μ_r and magnetic susceptibility χ?",
      option_a: "μ_r < 1 and χ < 0",
      option_b: "μ_r = 0 and χ = -1",
      option_c: "μ_r >> 1 and χ >> 1",
      option_d: "μ_r is slightly greater than 1 and χ is small and positive",
      correct_option: "D",
      explanation: "Step 1: In paramagnetic materials, the atomic magnetic dipoles align weakly in the direction of the applied external magnetic field.\n\nStep 2: Consequently, the magnetic induction inside the substance is slightly greater than the external field in vacuum.\n\nStep 3: Hence, the magnetic susceptibility χ is small and positive (0 < χ << 1), and the relative permeability μ_r = 1 + χ is slightly greater than 1.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3158,
    similarQuestion: {
      question: "Which of the following elements behaves as a paramagnetic substance at room temperature?",
      option_a: "Copper",
      option_b: "Bismuth",
      option_c: "Aluminium",
      option_d: "Water",
      correct_option: "C",
      explanation: "Step 1: Diamagnetic materials have paired electrons and negative susceptibility; examples include Copper, Bismuth, Water, Lead, and Silicon.\n\nStep 2: Paramagnetic materials have permanent dipole moments due to unpaired electrons that align weakly with an external field; examples include Aluminium, Platinum, Chromium, Sodium, and Oxygen.\n\nStep 3: Among the given choices, Aluminium is paramagnetic.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3159,
    similarQuestion: {
      question: "A permanent bar magnet has a coercivity of 3 × 10³ A/m. It is placed inside a 20 cm long solenoid having 100 turns in order to demagnetise it completely. The current that must be passed through the solenoid is:",
      option_a: "3 A",
      option_b: "6 A",
      option_c: "12 A",
      option_d: "1.5 A",
      correct_option: "B",
      explanation: "Step 1: Demagnetisation requires an opposing magnetic field intensity H equal to the coercivity of the magnet:\nH = 3 × 10³ A/m.\n\nStep 2: The magnetic intensity H inside an ideal solenoid is given by:\nH = n × I\nwhere n is the number of turns per unit length.\n\nStep 3: Calculate n:\nn = N / L = 100 turns / 0.20 m = 500 turns/m.\n\nStep 4: Solve for the required demagnetising current I:\nI = H / n = (3 × 10³ A/m) / (500 turns/m) = 3000 / 500 = 6 A.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3160,
    similarQuestion: {
      question: "According to Curie's Law, the magnetic susceptibility χ of a paramagnetic substance is inversely proportional to its absolute temperature T (χ = C / T). If a graph is plotted between 1/χ on the vertical axis and absolute temperature T on the horizontal axis, the graph is a straight line whose slope is:",
      option_a: "1 / C",
      option_b: "C",
      option_c: "C²",
      option_d: "1 / C²",
      correct_option: "A",
      explanation: "Step 1: Curie's Law states that:\nχ = C / T\nwhere C is the Curie constant and T is the absolute temperature in Kelvin.\n\nStep 2: Inverting both sides gives:\n1 / χ = (1 / C) × T\n\nStep 3: Comparing with the linear equation y = m x:\ny = 1 / χ, x = T, and the slope m = 1 / C.\nThus, the graph is a straight line passing through the origin with slope 1/C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3161,
    similarQuestion: {
      question: "A moving coil galvanometer has a coil resistance of 450 Ω. To reduce the current flowing through the galvanometer coil by 90% (so that only 10% passes through it), the value of shunt resistance connected in parallel across the coil must be:",
      option_a: "45 Ω",
      option_b: "50 Ω",
      option_c: "90 Ω",
      option_d: "100 Ω",
      correct_option: "B",
      explanation: "Step 1: Let the total incoming current be I.\nIf the galvanometer current is reduced by 90%, the current through the galvanometer is:\nI_g = 10% of I = 0.10 × I\n\nStep 2: The remaining 90% of current must pass through the shunt resistor S:\nI_s = 0.90 × I\n\nStep 3: Since the galvanometer coil and shunt resistor are in parallel, the potential difference across them is equal:\nI_g × G = I_s × S\nS = G × (I_g / I_s) = 450 × (0.10 × I) / (0.90 × I) = 450 / 9 = 50 Ω.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3162,
    similarQuestion: {
      question: "In an electric circuit, an ammeter of internal resistance R_A reads 3 A and a voltmeter of finite internal resistance R_V reads 30 V across an unknown resistor R. The true resistance of R is:",
      option_a: "Exactly 10 Ω",
      option_b: "Less than 10 Ω",
      option_c: "Greater than 10 Ω",
      option_d: "Indeterminate without knowing R_A",
      correct_option: "C",
      explanation: "Step 1: The voltmeter is connected in parallel with the unknown resistor R.\nThe equivalent resistance of this parallel combination is:\nR_eq = (R × R_V) / (R + R_V)\n\nStep 2: By Ohm's law, the apparent resistance measured is:\nR_apparent = V / I = 30 V / 3 A = 10 Ω\nThus, R_eq = 10 Ω.\n\nStep 3: Since R_eq = (R × R_V) / (R + R_V) < R (the parallel combination is always strictly less than either component resistor when R_V is finite):\nR > R_eq => R > 10 Ω.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3163,
    similarQuestion: {
      question: "A galvanometer having a coil resistance of 50 Ω gives a full-scale deflection with a current of 2 mA. To convert it into a voltmeter capable of measuring up to 10 V, the resistance that must be connected in series with the galvanometer is:",
      option_a: "5050 Ω",
      option_b: "4950 Ω",
      option_c: "5000 Ω",
      option_d: "2450 Ω",
      correct_option: "B",
      explanation: "Step 1: To convert a galvanometer of resistance G into a voltmeter with range V, a high resistance R is connected in series:\nV = I_g × (G + R)\n\nStep 2: Rearrange to solve for R:\nR = (V / I_g) - G\n\nStep 3: Substitute the given parameters:\nV = 10 V\nI_g = 2 mA = 2 × 10⁻³ A\nG = 50 Ω\n\nR = [10 / (2 × 10⁻³)] - 50 = 5000 - 50 = 4950 Ω.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3164,
    similarQuestion: {
      question: "A bar magnet is pushed rapidly towards a stationary conducting ring. Due to electromagnetic induction, an emf E, a current I, and a total charge Q flow through the ring. If the speed of the magnet is tripled, which of the following statements is INCORRECT?",
      option_a: "Induced emf E increases",
      option_b: "Induced current I increases",
      option_c: "Total induced charge Q increases",
      option_d: "Total induced charge Q remains constant",
      correct_option: "C",
      explanation: "Step 1: Faraday's law of induction states that induced emf is:\nE = -dΦ / dt ∝ v (speed)\nWhen speed is tripled, dt becomes 1/3, so E triples.\n\nStep 2: Induced current is I = E / R ∝ v, so I also triples.\n\nStep 3: The total induced charge Q flowing through the ring is given by:\nQ = ∫ I dt = (1 / R) × ∫ |dΦ/dt| dt = |ΔΦ| / R\nNotice that Q depends ONLY on the total change in magnetic flux ΔΦ and the loop resistance R, and is completely independent of the speed or time interval dt of the motion.\n\nStep 4: Therefore, Q remains constant, which makes the statement 'Total induced charge Q increases' incorrect.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3165,
    similarQuestion: {
      question: "An aeroplane with a wingspan of 40 m is flying horizontally at a speed of 720 km/h in a region where the vertical component of Earth's magnetic field is 2.5 × 10⁻⁴ T. The motional emf induced across the tips of its wings is:",
      option_a: "1.0 V",
      option_b: "2.0 V",
      option_c: "0.5 V",
      option_d: "4.0 V",
      correct_option: "B",
      explanation: "Step 1: Convert the speed of the aircraft to SI units (m/s):\nv = 720 km/h = 720 × (5 / 18) m/s = 40 × 5 = 200 m/s.\n\nStep 2: The motional emf induced across a conductor of length L moving perpendicular to a magnetic field B_V with velocity v is:\ne = B_V × v × L\n\nStep 3: Substitute the given parameters:\nB_V = 2.5 × 10⁻⁴ T\nv = 200 m/s\nL = 40 m\n\ne = (2.5 × 10⁻⁴) × 200 × 40 = (2.5 × 10⁻⁴) × 8000 = 20 × 10⁻¹ = 2.0 V.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3166,
    similarQuestion: {
      question: "In an ideal step-up transformer, the ratio of secondary turns to primary turns is 5 : 2. If the input power supplied to the primary coil is 500 W, the output power delivered by the secondary coil (neglecting all losses) is:",
      option_a: "1250 W",
      option_b: "200 W",
      option_c: "500 W",
      option_d: "1000 W",
      correct_option: "C",
      explanation: "Step 1: An ideal transformer is 100% efficient, meaning there are no iron losses (eddy currents, hysteresis) or copper losses (I²R heating):\nEfficiency η = (Power output) / (Power input) = 1.0 (100%)\n\nStep 2: By the principle of conservation of energy:\nP_output = P_input\n\nStep 3: Given P_input = 500 W:\nP_output = 500 W.\nThe turns ratio affects the voltage and current, but not the total ideal power.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3167,
    similarQuestion: {
      question: "A small circular coil of radius r is placed co-axially at the centre of a large circular coil of radius R (where R >> r). The mutual inductance M between the two coils is proportional to:",
      option_a: "r / R",
      option_b: "r² / R",
      option_c: "r / R²",
      option_d: "r² / R²",
      correct_option: "B",
      explanation: "Step 1: Suppose a current I₁ flows through the outer large coil of radius R.\nThe magnetic field produced at its centre is:\nB₁ = (μ₀ × I₁) / (2R)\n\nStep 2: Since R >> r, the magnetic field over the area of the small inner coil can be considered uniform and equal to B₁.\nThe magnetic flux linked with the inner coil of area A₂ = πr² is:\nΦ₂ = B₁ × A₂ = [(μ₀ × I₁) / (2R)] × (πr²)\n\nStep 3: The mutual inductance M is defined by Φ₂ = M × I₁:\nM = Φ₂ / I₁ = (μ₀ × π × r²) / (2R)\n\nStep 4: Therefore, M is proportional to r² / R.\n\nTherefore, Option (B) is the correct answer."
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
    console.log('Login successful for Set 55 Part 2.');

    for (let i = 0; i < questionsPart2.length; i++) {
      const q = questionsPart2[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart2.length} (ID: ${q.id})`);
    }
    console.log('Set 55 Part 2 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 55 Part 2:', err.message);
  }
}

run();
