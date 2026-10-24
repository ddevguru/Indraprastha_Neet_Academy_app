const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart5 = [
  {
    id: 3502,
    similarQuestion: {
      question: "A straight conducting rod of length 1.5 m moves with a constant speed of 4.0 m/s perpendicular to its length and perpendicular to a uniform magnetic field of 0.25 T. The motional electromotive force induced across the rod is:",
      option_a: "0.75 V",
      option_b: "3.0 V",
      option_c: "1.5 V",
      option_d: "6.0 V",
      correct_option: "C",
      explanation: "Step 1: The motional emf induced in a straight conductor of length L moving with velocity v perpendicular to a uniform magnetic field B is:\ne = B × v × L\n\nStep 2: Substitute the given values:\nB = 0.25 T\nv = 4.0 m/s\nL = 1.5 m\n\ne = 0.25 T × 4.0 m/s × 1.5 m = 1.0 × 1.5 = 1.5 V.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3503,
    similarQuestion: {
      question: "A square metallic wire loop of side length 0.2 m and total electrical resistance 2 Ω is pulled at a constant velocity of 5 m/s out of a uniform magnetic field of 0.5 T perpendicular to the loop. While the loop is emerging from the field, the steady induced current is:",
      option_a: "0.25 A",
      option_b: "0.50 A",
      option_c: "1.0 A",
      option_d: "0.10 A",
      correct_option: "A",
      explanation: "Step 1: As the loop leaves the magnetic field, one edge of length L cuts magnetic field lines, inducing a motional emf:\ne = B × L × v\n\nStep 2: Calculate e:\ne = 0.5 T × 0.2 m × 5 m/s = 0.5 V.\n\nStep 3: By Ohm's law, the induced current is:\nI = e / R = 0.5 V / 2 Ω = 0.25 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3504,
    similarQuestion: {
      question: "A conducting slider of length 0.5 m moves on two parallel frictionless conducting rails at a constant speed of 2.0 m/s in a perpendicular magnetic field of 1.2 T. If the total resistance of the closed loop is 3.0 Ω, the external mechanical force required to maintain this constant speed is:",
      option_a: "0.12 N",
      option_b: "0.24 N",
      option_c: "0.48 N",
      option_d: "0.36 N",
      correct_option: "B",
      explanation: "Step 1: The motional emf induced across the slider is:\ne = B × L × v = 1.2 T × 0.5 m × 2.0 m/s = 1.2 V.\n\nStep 2: The induced electric current is:\nI = e / R = 1.2 V / 3.0 Ω = 0.4 A.\n\nStep 3: The magnetic retarding force opposing the motion is:\nF_mag = I × L × B = 0.4 A × 0.5 m × 1.2 T = 0.24 N.\nTo maintain constant velocity, the external applied force must balance F_mag: F_ext = 0.24 N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3505,
    similarQuestion: {
      question: "A metal rod of length 0.8 m slides at 10 m/s along two parallel conducting rails connected through a resistor of 4 Ω in a uniform perpendicular magnetic field of 0.5 T. The rate of electrical energy dissipation (Joule heating) in the circuit is:",
      option_a: "4.0 W",
      option_b: "8.0 W",
      option_c: "2.0 W",
      option_d: "16.0 W",
      correct_option: "A",
      explanation: "Step 1: The motional emf induced across the rod is:\ne = B × L × v = 0.5 T × 0.8 m × 10 m/s = 4.0 V.\n\nStep 2: The rate of Joule heat dissipation in resistance R is:\nP = e² / R = (4.0 V)² / (4 Ω) = 16 / 4 = 4.0 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3506,
    similarQuestion: {
      question: "A conducting connector rod of length L and electrical resistance r slides with velocity v on frictionless parallel conducting rails of negligible resistance connected to an external load resistor R in a uniform magnetic field B. The magnetic retarding force acting on the rod is:",
      option_a: "(B × L × v) / (R + r)",
      option_b: "(B² × L² × v) / (R + r)",
      option_c: "(B² × L × v²) / (R + r)",
      option_d: "(B × L² × v²) / (R + r)",
      correct_option: "B",
      explanation: "Step 1: The induced motional emf in the moving rod is e = B × L × v.\n\nStep 2: The total circuit resistance is R_total = R + r.\nThe induced current flowing through the rod is:\nI = e / R_total = (B × L × v) / (R + r)\n\nStep 3: The Lorentz magnetic force opposing the motion is:\nF = I × L × B = [(B L v) / (R + r)] × L × B = (B² × L² × v) / (R + r).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3507,
    similarQuestion: {
      question: "A conducting bar of mass m and length L slides on horizontal smooth conducting rails connected across a resistor R in a vertical uniform magnetic field B. When pulled with a constant external horizontal force F_ext, the terminal velocity achieved by the bar is:",
      option_a: "(F_ext × B² × L²) / R",
      option_b: "(F_ext × B × L) / R",
      option_c: "(F_ext × R) / (B² × L²)",
      option_d: "(F_ext × R²) / (B × L)",
      correct_option: "C",
      explanation: "Step 1: At terminal velocity v_term, the acceleration of the bar is zero, which means the external force is exactly balanced by the opposing magnetic braking force:\nF_ext = F_mag\n\nStep 2: The magnetic force on the bar carrying induced current I = (B L v) / R is:\nF_mag = (B² × L² × v) / R\n\nStep 3: Equating the two forces gives:\nF_ext = (B² × L² × v_term) / R\nv_term = (F_ext × R) / (B² × L²).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3508,
    similarQuestion: {
      question: "A conducting rod of length L rotates with a constant angular velocity ω about one of its ends in a plane perpendicular to a uniform magnetic field B. The motional emf induced between the two ends of the rod is:",
      option_a: "(1/2) × B × ω × L²",
      option_b: "B × ω × L²",
      option_c: "(1/4) × B × ω × L²",
      option_d: "2 × B × ω × L²",
      correct_option: "A",
      explanation: "Step 1: Consider a small element of length dr located at distance r from the pivot.\nIts linear speed is v = ω × r.\n\nStep 2: The motional emf induced in this element is:\nde = B × v × dr = B × (ω r) × dr\n\nStep 3: Integrate from r = 0 to r = L:\ne = ∫₀^L B ω r dr = B ω [r² / 2]₀^L = (1/2) × B × ω × L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3509,
    similarQuestion: {
      question: "A uniform conducting rod rotates with a constant angular velocity ω about one end in a uniform magnetic field B parallel to its axis of rotation. The induced electric field inside the rod:",
      option_a: "Is uniform and directed radially inward",
      option_b: "Is uniform and directed radially outward",
      option_c: "Is non-uniform, directed radially, and directly proportional to distance r from the axis",
      option_d: "Is identically zero everywhere",
      correct_option: "C",
      explanation: "Step 1: In equilibrium, the free conduction electrons experience zero net force in the rotating frame of the rod:\nq × (E + v × B) = 0 => E = -v × B\n\nStep 2: The linear speed at radial distance r is v = ω × r.\nTherefore, the magnitude of the induced electric field is:\nE(r) = B × ω × r\n\nStep 3: Thus, the induced electric field is non-uniform and varies linearly with the radial distance r from the pivot axis.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3510,
    similarQuestion: {
      question: "A straight conducting rod of total length L rotates about an axis perpendicular to a uniform magnetic field B passing through a point located at distance L/3 from one end. If the angular velocity of rotation is ω, the potential difference between the two ends of the rod is:",
      option_a: "(1/3) × B × ω × L²",
      option_b: "(1/6) × B × ω × L²",
      option_c: "(1/2) × B × ω × L²",
      option_d: "Zero",
      correct_option: "B",
      explanation: "Step 1: Let the pivot be O. The two segments from O have lengths l₁ = 2L/3 and l₂ = L/3.\n\nStep 2: The potential developed across each segment relative to O is:\nV₁ - V_O = (1/2) B ω l₁² = (1/2) B ω (2L/3)² = (4/18) B ω L²\nV₂ - V_O = (1/2) B ω l₂² = (1/2) B ω (L/3)² = (1/18) B ω L²\n\nStep 3: The potential difference between the two extreme ends is:\n|V₁ - V₂| = |(V₁ - V_O) - (V₂ - V_O)| = (4/18 - 1/18) B ω L² = (3/18) B ω L² = (1/6) B ω L².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3511,
    similarQuestion: {
      question: "An annular metallic copper disc of inner radius a and outer radius b rotates with a uniform angular velocity ω about its central axis in a uniform magnetic field B directed along the axis of rotation. The electromotive force induced between the inner rim and outer rim of the disc is:",
      option_a: "(1/2) × B × ω × (b² + a²)",
      option_b: "(1/2) × B × ω × (b - a)²",
      option_c: "B × ω × (b² - a²)",
      option_d: "(1/2) × B × ω × (b² - a²)",
      correct_option: "D",
      explanation: "Step 1: The motional emf induced in a radial segment from radius r to r + dr is de = B (ω r) dr.\n\nStep 2: Integrating between the inner radius r = a and the outer radius r = b:\ne = ∫_a^b B ω r dr = B ω [r² / 2]_a^b = (1/2) × B × ω × (b² - a²).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3512,
    similarQuestion: {
      question: "A metallic rod of length 1.0 m rotates at 50 rad/s about one of its ends in a plane perpendicular to a uniform magnetic field of 0.4 T. The potential difference developed between the ends of the rod is:",
      option_a: "20.0 V",
      option_b: "5.0 V",
      option_c: "10.0 V",
      option_d: "40.0 V",
      correct_option: "C",
      explanation: "Step 1: The formula for motional emf induced in a rod rotating about one end is:\ne = (1/2) × B × ω × L²\n\nStep 2: Substitute the given parameters:\nB = 0.4 T\nω = 50 rad/s\nL = 1.0 m\n\ne = (1/2) × 0.4 T × 50 rad/s × (1.0 m)² = 0.2 × 50 = 10.0 V.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3513,
    similarQuestion: {
      question: "A conducting spoke of length R in a bicycle wheel rotates with angular frequency ω in a plane perpendicular to Earth's magnetic field component B. The emf induced between the central axle and the outer circular rim is:",
      option_a: "(1/2) × B × ω × R²",
      option_b: "B × ω × R²",
      option_c: "2 × B × ω × R²",
      option_d: "Zero because the rim is conducting",
      correct_option: "A",
      explanation: "Step 1: Each spoke of length R rotates about one end (the axle) with angular speed ω in a transverse magnetic field B.\n\nStep 2: The emf generated across the ends of any single spoke is:\ne = (1/2) × B × ω × R²\n\nStep 3: All spokes are connected in parallel between the axle and the conducting rim. In a parallel combination of identical voltage sources, the net terminal emf remains equal to the emf of a single source: e = (1/2) B ω R².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3514,
    similarQuestion: {
      question: "A rigid planar L-shaped conducting wire with perpendicular arms of lengths a and b rotates with constant angular velocity ω about their common corner junction in a uniform magnetic field B perpendicular to the plane of rotation. The magnitude of emf induced across the two free outer tips is:",
      option_a: "(1/2) × B × ω × (a² + b²)",
      option_b: "B × ω × √(a² + b²)",
      option_c: "(1/2) × B × ω × |a² - b²|",
      option_d: "(1/2) × B × ω × (a + b)²",
      correct_option: "C",
      explanation: "Step 1: Let the junction be O, and the two tips be P and Q. The potential differences of the tips relative to O are:\nV_P - V_O = (1/2) B ω a²\nV_Q - V_O = (1/2) B ω b²\n\nStep 2: The potential difference between tips P and Q is:\n|V_P - V_Q| = |(V_P - V_O) - (V_Q - V_O)| = (1/2) × B × ω × |a² - b²|.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3515,
    similarQuestion: {
      question: "A rod of total length L has its inner third (from r = 0 to L/3) made of insulating wood and its outer two-thirds (from r = L/3 to L) made of conducting copper. If it rotates about r = 0 with angular speed ω in a perpendicular magnetic field B, the potential difference across the copper portion is:",
      option_a: "(1/2) × B × ω × L²",
      option_b: "(1/9) × B × ω × L²",
      option_c: "(4/9) × B × ω × L²",
      option_d: "(2/3) × B × ω × L²",
      correct_option: "C",
      explanation: "Step 1: Motional emf is established across the conducting portion between r₁ = L/3 and r₂ = L:\ne = ∫_{L/3}^L B (ω r) dr = (1/2) B ω [r²]_{L/3}^L\n\nStep 2: Evaluate the limits:\n[L² - (L/3)²] = L² - L²/9 = (8/9) L²\n\nStep 3: Calculate e:\ne = (1/2) × B × ω × (8/9 L²) = (4/9) × B × ω × L².\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3516,
    similarQuestion: {
      question: "A circular metallic disc of radius R rotates with constant angular velocity ω about its central axis in the absence of any magnetic field. Due to the centrifugal force acting on conduction electrons (mass m, charge -e), the electrostatic potential difference developed between the centre and the rim of the disc is:",
      option_a: "(m × ω² × R²) / (2 e)",
      option_b: "(e × ω² × R²) / (2 m)",
      option_c: "(m × ω × R) / e",
      option_d: "Zero in the absence of a magnetic field",
      correct_option: "A",
      explanation: "Step 1: In the steady rotating state, the radial electrostatic force -e E on each electron must provide the required inward centripetal force:\n-e E = -m ω² r => E(r) = (m ω² r) / e\n\nStep 2: The potential difference between the centre (r = 0) and rim (r = R) is:\nV = ∫₀^R E(r) dr = (m ω² / e) ∫₀^R r dr = (m × ω² × R²) / (2 e).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3517,
    similarQuestion: {
      question: "A conducting ring of radius r rolls without slipping on a horizontal surface with a constant angular velocity ω in a uniform magnetic field B directed perpendicular to the plane of the ring. The motional emf induced between the highest point of the ring and its lowest instantaneous point of contact with the surface is:",
      option_a: "2 × B × ω × r²",
      option_b: "B × ω × r²",
      option_c: "(1/2) × B × ω × r²",
      option_d: "4 × B × ω × r²",
      correct_option: "A",
      explanation: "Step 1: In rolling without slipping, the lowest instantaneous contact point P is at rest (instantaneous centre of zero velocity).\n\nStep 2: Every point on the ring can be considered to be executing pure rotation about this contact point P with angular velocity ω.\n\nStep 3: The distance from the contact point P to the highest point Q is the full diameter: d = 2 r.\n\nStep 4: The motional emf induced between P and Q is that of a conductor of length d rotating about one end:\ne = (1/2) × B × ω × d² = (1/2) × B × ω × (2r)² = (1/2) × B × ω × 4r² = 2 B ω r².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3518,
    similarQuestion: {
      question: "A conducting rectangular loop is rotated at a constant angular speed about an axis parallel to a long straight wire carrying a steady direct current. The electric current induced in the rotating loop:",
      option_a: "Is a steady unidirectional direct current",
      option_b: "Alternates sinusoidally in direction with the frequency of rotation",
      option_c: "Is strictly zero at all times",
      option_d: "Increases exponentially without bound",
      correct_option: "B",
      explanation: "Step 1: The magnetic field produced by the long wire decreases with distance from the wire.\n\nStep 2: As the loop rotates about its parallel axis, the magnetic flux linked with it increases and decreases periodically between positive and negative extrema.\n\nStep 3: By Faraday's and Lenz's laws, this continuously alternating change in flux induces an alternating current (AC) whose direction reverses twice every full rotation.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3519,
    similarQuestion: {
      question: "A conducting rod PQ is oriented parallel to a long straight wire carrying a steady upward current I. The rod is moved horizontally away from the wire with a constant velocity v. Which end of the rod is at a higher electric potential?",
      option_a: "End P is at higher potential than end Q",
      option_b: "End Q is at higher potential than end P (depending on orientation along field)",
      option_c: "Both ends P and Q are at identical potentials",
      option_d: "No potential can be determined because it is not a closed circuit",
      correct_option: "B",
      explanation: "Step 1: A long straight vertical wire carrying an upward current produces a magnetic field directed into the page on its right side.\n\nStep 2: The rod is moved rightwards (v⃗ = v î) in a magnetic field directed into the page (B⃗ = -B k̂).\n\nStep 3: The magnetic Lorentz force on free positive test charges inside the rod is:\nF⃗_m = q × (v⃗ × B⃗) = q × [v î × (-B k̂)] = q × v B ĵ (directed upward along +y).\n\nStep 4: Hence, mobile electrons are driven downward, making the upper end of the rod positive and at a higher potential than the lower end.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3520,
    similarQuestion: {
      question: "An infinitely long straight wire carries a steady electric current I. A conducting rod PQ is aligned perpendicular to the wire and moves parallel to the wire with constant velocity v. The potential difference (V_P - V_Q) between its ends:",
      option_a: "Is strictly zero",
      option_b: "Is independent of the distance from the wire",
      option_c: "Is non-zero and depends on the logarithmic ratio of the distances of P and Q from the wire",
      option_d: "Reverses direction periodically",
      correct_option: "C",
      explanation: "Step 1: The magnetic field at distance x from the long wire is B(x) = (μ₀ I) / (2π x) perpendicular to the plane.\n\nStep 2: The velocity v⃗ is parallel to the wire (along y), and the rod is along the x-axis.\n\nStep 3: The induced Lorentz electric field is E⃗ = v⃗ × B⃗, which acts along the x-axis (along the length of the rod).\n\nStep 4: Integrating from distance x₁ to x₂ gives:\nV_P - V_Q = ∫ E dx = (μ₀ I v / 2π) ∫ (1/x) dx = (μ₀ I v / 2π) ln(x₂ / x₁) ≠ 0.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3521,
    similarQuestion: {
      question: "A straight conducting rod is oriented parallel to an infinitely long straight wire carrying a steady current I. The rod is now moved parallel to the wire with a constant velocity v. The potential difference developed between the two ends of the rod is:",
      option_a: "Directly proportional to the length of the rod",
      option_b: "Inversely proportional to distance from the wire",
      option_c: "Strictly zero",
      option_d: "Infinite",
      correct_option: "C",
      explanation: "Step 1: The velocity vector v⃗ is parallel to the wire (+y-direction), and the magnetic field B⃗ is perpendicular to the plane (-z-direction).\n\nStep 2: The induced Lorentz field is:\nE⃗_ind = v⃗ × B⃗ = (v ĵ) × (-B k̂) = -v B î\nwhich is directed perpendicular to the wire (along the x-axis).\n\nStep 3: However, the conducting rod is aligned parallel to the wire (along the y-axis, dl⃗ = dy ĵ).\n\nStep 4: The motional emf between the ends of the rod is the line integral along its length:\ne = ∫ E⃗_ind · dl⃗ = ∫ (-v B î) · (dy ĵ) = 0.\nTherefore, the potential difference between the ends of the rod is strictly zero.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3522,
    similarQuestion: {
      question: "A closed circular coil of copper wire is kept completely stationary in a spatially non-uniform magnetic field that does NOT change with time. Which of the following statements is correct?",
      option_a: "An emf is induced and a steady current flows",
      option_b: "A current is induced but no emf is present",
      option_c: "An emf is induced but no current flows",
      option_d: "Neither an emf nor an induced current is generated in the coil",
      correct_option: "D",
      explanation: "Step 1: Electromagnetic induction occurs if and only if the magnetic flux through a circuit varies with time: e = -dΦ / dt.\n\nStep 2: Since the magnetic field is time-invariant (∂B/∂t = 0) and the coil is at rest (v = 0), the total magnetic flux linked with the coil remains strictly constant.\n\nStep 3: Hence, dΦ / dt = 0, meaning neither an emf nor an electric current is generated.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3523,
    similarQuestion: {
      question: "A planar stiff wire bent into a semicircle of radius a is rotated about its diameter with a steady rotational frequency f in a uniform perpendicular magnetic field B. The frequency of the alternating emf induced in the loop is:",
      option_a: "f",
      option_b: "2 f",
      option_c: "f / 2",
      option_d: "4 f",
      correct_option: "A",
      explanation: "Step 1: As the semicircle rotates with angular frequency ω = 2π f, the projected area perpendicular to B varies sinusoidally as A(t) = A_max cos(ω t).\n\nStep 2: The magnetic flux varies as Φ(t) = B × A_max × cos(ω t).\n\nStep 3: The induced emf is e(t) = -dΦ/dt = B A_max ω sin(ω t).\n\nStep 4: The angular frequency of the induced emf is ω = 2π f, so the cyclic frequency of the alternating emf is exactly f.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3524,
    similarQuestion: {
      question: "A planar rectangular coil rotates at a constant speed in a uniform magnetic field. At the exact instant when the plane of the coil is parallel to the magnetic field lines, the induced electromotive force in the coil is:",
      option_a: "Zero",
      option_b: "At its maximum value",
      option_c: "At its minimum non-zero value",
      option_d: "Indeterminate",
      correct_option: "B",
      explanation: "Step 1: Let θ be the angle between the normal to the coil and the magnetic field. When the plane of the coil is parallel to the magnetic field lines, the normal is perpendicular to B (θ = 90°).\n\nStep 2: The magnetic flux is Φ = B A cos θ = B A cos 90° = 0 (flux is zero).\n\nStep 3: However, the time rate of change of flux is dΦ / dt = -B A ω sin 90° = -B A ω, which is at its maximum magnitude.\n\nStep 4: Therefore, the magnitude of induced emf |e| = |dΦ/dt| is at its absolute maximum.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3525,
    similarQuestion: {
      question: "A planar square loop of side length a is placed perpendicular to a time-varying magnetic field given by B(t) = B₀ - c t, where B₀ and c are positive constants. The magnitude of the induced electromotive force in the loop is:",
      option_a: "c × a",
      option_b: "c × a²",
      option_c: "B₀ × a² - c t",
      option_d: "c² × a²",
      correct_option: "B",
      explanation: "Step 1: The area of the square loop is A = a².\n\nStep 2: The magnetic flux through the loop at time t is:\nΦ(t) = B(t) × A = (B₀ - c t) × a²\n\nStep 3: By Faraday's law of induction, the magnitude of induced emf is:\ne = |dΦ / dt| = |d[(B₀ - c t) a²] / dt| = |-c a²| = c × a².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3526,
    similarQuestion: {
      question: "A planar figure-eight shaped conducting wire consists of two square loops of side lengths a and b (where a > b) connected in opposition. The entire loop is placed perpendicular to an alternating magnetic field B(t) = B₀ sin(ω t). If the resistance of the loop is R, the amplitude of the induced current in the loop is:",
      option_a: "[B₀ × ω × (a² + b²)] / R",
      option_b: "[B₀ × (a² - b²)] / (R × ω)",
      option_c: "[B₀ × ω × (a² - b²)] / R",
      option_d: "[2 B₀ × ω × (a - b)²] / R",
      correct_option: "C",
      explanation: "Step 1: Because the two square loops are connected in opposite senses, the net effective area linked with magnetic flux is:\nA_eff = a² - b²\n\nStep 2: The net magnetic flux is:\nΦ(t) = B(t) × A_eff = B₀ (a² - b²) sin(ω t)\n\nStep 3: The induced electromotive force is:\ne(t) = -dΦ / dt = -B₀ ω (a² - b²) cos(ω t)\n\nStep 4: The amplitude of induced current is I₀ = e₀ / R:\nI₀ = [B₀ × ω × (a² - b²)] / R.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3527,
    similarQuestion: {
      question: "A flat circular coil having 50 turns, radius 10 cm, and resistance 5.0 Ω is rotated at 50 revolutions per second about an axis perpendicular to a uniform magnetic field of 20 mT. The peak amplitude of the induced current in the coil is approximately: (Take π² ≈ 10)",
      option_a: "20 A",
      option_b: "2.0 A",
      option_c: "0.2 A",
      option_d: "10 A",
      correct_option: "B",
      explanation: "Step 1: The peak induced electromotive force in a rotating coil of N turns, area A = π r², at rotational frequency f in field B is:\ne₀ = N × B × A × ω = N × B × (π r²) × (2π f)\n\nStep 2: Substitute the given parameters:\nN = 50\nB = 20 mT = 20 × 10⁻³ T = 0.02 T\nr = 10 cm = 0.1 m => r² = 0.01 m²\nf = 50 rev/s => ω = 2π × 50 = 100π rad/s\n\ne₀ = 50 × 0.02 T × (π × 0.01 m²) × (100π) = 1.0 × 0.01 × 100 × π² = π² V.\nWith π² ≈ 10, e₀ ≈ 10 V.\n\nStep 3: The peak current amplitude is:\nI₀ = e₀ / R = 10 V / 5.0 Ω = 2.0 A.\n\nTherefore, Option (B) is the correct answer."
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
    console.log('Login successful for Set 56 Part 5.');

    for (let i = 0; i < questionsPart5.length; i++) {
      const q = questionsPart5[i];
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
      console.log(`Updated question ${i + 105}/${questionsPart5.length + 104} (ID: ${q.id})`);
    }
    console.log('Set 56 Part 5 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 56 Part 5:', err.message);
  }
}

run();
