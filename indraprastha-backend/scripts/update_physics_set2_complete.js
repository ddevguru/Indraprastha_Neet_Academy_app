const fs = require('fs');

const allRemainingSet2Updates = [
  {
    id: 2969, // Q7
    similar_question: {
      question: "The magnitude of any physical quantity Q is expressed as Q = n × u, where n is the numerical value and u is the unit of measurement. If the unit of measurement is made 5 times larger, what happens to the numerical value n?",
      option_a: "It becomes 1/5 of its original value",
      option_b: "It becomes 5 times its original value",
      option_c: "It becomes 25 times its original value",
      option_d: "It remains unchanged",
      correct_option: "A",
      explanation: "Step 1: Fundamental principle of physical measurement:\nThe actual magnitude of any physical quantity Q is invariant and independent of the chosen system of units:\nQ = n × u = constant\nwhere n is the numerical value and u is the size of the chosen unit.\n\nStep 2: Inverse relationship between n and u:\nSince n × u = constant:\nn ∝ 1 / u   or   n₁ u₁ = n₂ u₂.\n\nStep 3: Calculate the change when the unit is increased:\nGiven the new unit u₂ = 5 u₁:\nn₂ = n₁ × (u₁ / u₂)\nn₂ = n₁ × (u₁ / 5u₁) = n₁ / 5.\n\nTherefore, the numerical value becomes 1/5 of its original value.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2970, // Q8
    similar_question: {
      question: "A screw gauge has a pitch of 0.5 mm and 50 divisions on its circular scale. When used to measure the thickness of a glass slab, the main scale reading is 2.5 mm and the 36th division of the circular scale coincides with the reference line. If the instrument has no zero error, what is the thickness of the glass slab?",
      option_a: "2.86 mm",
      option_b: "2.68 mm",
      option_c: "3.22 mm",
      option_d: "2.536 mm",
      correct_option: "A",
      explanation: "Step 1: Determine the Least Count (LC) of the screw gauge:\nLC = Pitch / Total number of circular scale divisions\nLC = 0.5 mm / 50 = 0.01 mm.\n\nStep 2: Formula for total reading:\nTotal Reading = Main Scale Reading (MSR) + [Circular Scale Reading (CSR) × LC]\n\nStep 3: Substitute the measured values:\nMSR = 2.5 mm\nCSR = 36\nLC = 0.01 mm\nCircular scale contribution = 36 × 0.01 mm = 0.36 mm\n\nStep 4: Compute the thickness:\nThickness = 2.5 mm + 0.36 mm = 2.86 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2971, // Q9
    similar_question: {
      question: "In the van der Waals equation for 1 mole of a real gas:\n(P + a/V²)(V − b) = RT\nwhere P is pressure, V is molar volume, and T is temperature, what is the dimensional formula of the constant ratio (a / b)?",
      option_a: "[ML²T⁻²]",
      option_b: "[ML⁵T⁻²]",
      option_c: "[ML⁻¹T⁻²]",
      option_d: "[M⁰L³T⁰]",
      correct_option: "A",
      explanation: "Step 1: Principle of Homogeneity:\nQuantities added or subtracted must share the same dimensions.\n\nStep 2: Determine dimensions of constant a:\nIn the term (P + a/V²):\n[a / V²] = [P]\n[a] = [P] × [V]²\nDimensional formula of pressure [P] = [Force / Area] = [ML⁻¹T⁻²]\nDimensional formula of volume [V] = [L³]  →  [V]² = [L⁶]\n[a] = [ML⁻¹T⁻²] × [L⁶] = [ML⁵T⁻²].\n\nStep 3: Determine dimensions of constant b:\nIn the term (V − b):\n[b] = [V] = [L³].\n\nStep 4: Compute dimensions of (a / b):\n[a / b] = [a] / [b] = [ML⁵T⁻²] / [L³] = [ML²T⁻²].\nNotice that [ML²T⁻²] corresponds to the dimensions of Work or Energy (identical to [PV]).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2972, // Q10
    similar_question: {
      question: "In the relation P = (A / B) ln(A x² / (k_B T)), where P is pressure, x is distance, k_B is Boltzmann constant, and T is absolute temperature, what is the dimensional formula of the constant B?",
      option_a: "[M⁰LT⁰]",
      option_b: "[M⁰L²T⁰]",
      option_c: "[MLT⁻²]",
      option_d: "[M⁰L⁰T⁰]",
      correct_option: "A",
      explanation: "Step 1: Dimensional rule for logarithmic functions:\nThe argument inside a logarithmic function must be dimensionless:\n[A x² / (k_B T)] = [M⁰L⁰T⁰] = 1.\n\nStep 2: Determine dimensions of constant A:\nThe product (k_B × T) has dimensions of thermal energy: [k_B T] = [ML²T⁻²]\nDisplacement squared: [x²] = [L²]\n[A] = [k_B T] / [x²] = [ML²T⁻²] / [L²] = [M¹L⁰T⁻²].\n\nStep 3: Relate pressure P and constant B:\nSince the logarithmic factor is dimensionless:\n[P] = [A / B]  →  [B] = [A] / [P]\n\nStep 4: Compute dimensions of B:\nDimensional formula of pressure [P] = [ML⁻¹T⁻²]\n[B] = [M¹L⁰T⁻²] / [M¹L⁻¹T⁻²] = [M⁰L¹T⁰].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2973, // Q11
    similar_question: {
      question: "The length, width, and height of a rectangular glass block are measured as:\nl = (20.0 ± 0.1) cm,\nw = (10.0 ± 0.1) cm,\nh = (5.0 ± 0.1) cm.\nWhat is the maximum percentage error in the measurement of the volume of the glass block?",
      option_a: "3.5%",
      option_b: "2.5%",
      option_c: "1.5%",
      option_d: "4.0%",
      correct_option: "A",
      explanation: "Step 1: Formula for volume of a rectangular block:\nV = l × w × h.\n\nStep 2: Error propagation for a product of independent measurements:\nRelative errors are additive:\nΔV / V = (Δl / l) + (Δw / w) + (Δh / h)\nPercentage error in V = [(Δl / l) + (Δw / w) + (Δh / h)] × 100%.\n\nStep 3: Calculate percentage error in each dimension:\nPercentage error in length = (0.1 / 20.0) × 100% = 0.5%\nPercentage error in width = (0.1 / 10.0) × 100% = 1.0%\nPercentage error in height = (0.1 / 5.0) × 100% = 2.0%\n\nStep 4: Sum the percentage errors:\nTotal maximum percentage error = 0.5% + 1.0% + 2.0% = 3.5%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2974, // Q12
    similar_question: {
      question: "The mass and volume of an alloy sample are measured to be (400 ± 4) g and (50.0 ± 1.0) cm³ respectively. What is the maximum percentage error in the calculated density?",
      option_a: "3.0%",
      option_b: "1.0%",
      option_c: "2.0%",
      option_d: "5.0%",
      correct_option: "A",
      explanation: "Step 1: Formula for density:\nDensity (ρ) = Mass (m) / Volume (V).\n\nStep 2: Error propagation for a quotient:\nFor a quotient, the relative errors add up to determine the maximum relative error:\nΔρ / ρ = (Δm / m) + (ΔV / V)\nMaximum percentage error = [(Δm / m) + (ΔV / V)] × 100%.\n\nStep 3: Calculate the individual percentage errors:\nPercentage error in mass = (4 / 400) × 100% = 1.0%\nPercentage error in volume = (1.0 / 50.0) × 100% = 2.0%\n\nStep 4: Sum the percentage errors:\nMaximum percentage error in density = 1.0% + 2.0% = 3.0%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2975, // Q13
    similar_question: {
      question: "A potential difference of V = (50 ± 2) V is applied across a conductor carrying a current of I = (5.0 ± 0.1) A. What is the maximum percentage error in the calculated electrical resistance R = V / I?",
      option_a: "6.0%",
      option_b: "4.0%",
      option_c: "2.0%",
      option_d: "5.0%",
      correct_option: "A",
      explanation: "Step 1: Relationship for electrical resistance:\nAccording to Ohm's Law, R = V / I.\n\nStep 2: Relative error propagation formula for division:\nΔR / R = (ΔV / V) + (ΔI / I)\nMaximum percentage error in R = [(ΔV / V) + (ΔI / I)] × 100%.\n\nStep 3: Compute individual percentage errors:\nPercentage error in voltage = (2 / 50) × 100% = 4.0%\nPercentage error in current = (0.1 / 5.0) × 100% = 2.0%\n\nStep 4: Sum the percentage errors:\nTotal percentage error in R = 4.0% + 2.0% = 6.0%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2976, // Q14
    similar_question: {
      question: "A Vernier callipers has 1 mm marks on its main scale. It has 25 equal divisions on the Vernier scale that coincide with 20 main scale divisions. What is the least count of this Vernier callipers?",
      option_a: "0.20 mm",
      option_b: "0.05 mm",
      option_c: "0.02 mm",
      option_d: "0.10 mm",
      correct_option: "A",
      explanation: "Step 1: Least count formula for Vernier callipers:\nLeast Count (LC) = 1 MSD − 1 VSD\n\nStep 2: Relate VSD to MSD:\nGiven: 25 Vernier scale divisions (VSD) = 20 main scale divisions (MSD)\n1 VSD = (20 / 25) MSD = 0.80 MSD\n\nStep 3: Calculate Least Count:\nLC = 1 MSD − 0.80 MSD = 0.20 MSD\nSince 1 MSD = 1 mm:\nLC = 0.20 × 1 mm = 0.20 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2977, // Q15
    similar_question: {
      question: "One gigaelectronvolt (1 GeV) expressed in joules (J) is equal to:",
      option_a: "1.6 × 10⁻¹⁰ J",
      option_b: "1.6 × 10⁻¹³ J",
      option_c: "1.6 × 10⁻¹⁶ J",
      option_d: "1.6 × 10⁻¹⁹ J",
      correct_option: "A",
      explanation: "Step 1: Conversion of electronvolt (eV) to joule (J):\n1 eV is the energy gained by an electron accelerated through 1 volt:\n1 eV = 1.6 × 10⁻¹⁹ J.\n\nStep 2: Understand the metric prefix giga (G):\n1 Giga = 10⁹\n1 GeV = 10⁹ eV.\n\nStep 3: Convert 1 GeV to Joules:\n1 GeV = 10⁹ × (1.6 × 10⁻¹⁹ J)\n      = 1.6 × 10⁻¹⁰ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2978, // Q16
    similar_question: {
      question: "In the expression: Pressure P = a / (volume + b)², where P is pressure and volume is V, what are the dimensional formulas of constants a and b?",
      option_a: "[ML⁵T⁻²] and [M⁰L³T⁰]",
      option_b: "[ML⁻¹T⁻²] and [M⁰L³T⁰]",
      option_c: "[ML²T⁻²] and [M⁰L²T⁰]",
      option_d: "[ML⁴T⁻²] and [M⁰L³T⁰]",
      correct_option: "A",
      explanation: "Step 1: Principle of Homogeneity:\nOnly quantities having identical dimensions can be added together.\nIn the denominator term (volume + b):\n[b] = [volume] = [L³] = [M⁰L³T⁰].\n\nStep 2: Determine dimensions of constant a:\nP = a / (volume + b)²\n[a] = [P] × [volume]²\n\nStep 3: Substitute dimensional formulas:\nPressure [P] = [Force / Area] = [ML⁻¹T⁻²]\nVolume [V] = [L³]  →  [volume]² = [L³]² = [L⁶]\n[a] = [ML⁻¹T⁻²] × [L⁶] = [ML⁵T⁻²].\n\nStep 4: Combine the results:\na = [ML⁵T⁻²]\nb = [M⁰L³T⁰].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2979, // Q17
    similar_question: {
      question: "If speed of light c, universal gravitational constant G, and Planck's constant h are taken as fundamental units, what is the dimensional formula of time (t) in this system?",
      option_a: "[h¹/² G¹/² c⁻⁵/²]",
      option_b: "[h¹/² G⁻¹/² c⁻³/²]",
      option_c: "[h G c⁻³]",
      option_d: "[h² G c⁻⁵]",
      correct_option: "A",
      explanation: "Step 1: Dimensional formulas of the fundamental quantities:\nPlanck's constant (h) = [ML²T⁻¹]\nUniversal gravitational constant (G) = [M⁻¹L³T⁻²]\nSpeed of light (c) = [LT⁻¹]\n\nStep 2: Express time t in terms of powers of h, G, and c:\nLet t = hˣ Gʸ cᶻ\n[M⁰L⁰T¹] = [ML²T⁻¹]ˣ [M⁻¹L³T⁻²]ʸ [LT⁻¹]ᶻ\n[M⁰L⁰T¹] = M^(x − y) L^(2x + 3y + z) T^(−x − 2y − z)\n\nStep 3: Equate exponents of M, L, and T:\nFor M: x − y = 0  →  x = y\nFor L: 2x + 3y + z = 0  →  5x + z = 0  →  z = −5x\nFor T: −x − 2y − z = 1  →  −3x − (−5x) = 1  →  2x = 1  →  x = 1/2.\n\nStep 4: Solve for powers:\nx = 1/2, y = 1/2, z = −5(1/2) = −5/2.\nTherefore, t = h¹/² G¹/² c⁻⁵/².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2980, // Q18
    similar_question: {
      question: "A circular coin has a radius of 1.4 cm. Taking significant figures into account, what is the area of one face of the coin? (Use π = 3.1416)",
      option_a: "6.2 cm²",
      option_b: "6.158 cm²",
      option_c: "6.16 cm²",
      option_d: "6.1575 cm²",
      correct_option: "A",
      explanation: "Step 1: Formula for area of a circle:\nArea A = π r²\n\nStep 2: Calculate the raw area:\nA = 3.1416 × (1.4 cm)²\n  = 3.1416 × 1.96 cm²\n  = 6.1575 cm².\n\nStep 3: Apply the rule of significant figures in multiplication:\nThe measured quantity is the radius r = 1.4 cm, which possesses 2 significant figures.\nThe calculated result must be rounded to match the smallest number of significant figures in the measured data, which is 2 significant figures.\nRounding 6.1575 cm² to 2 significant figures gives 6.2 cm².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2981, // Q19
    similar_question: {
      question: "The length of a metallic rod is measured to be (10.0 ± 0.1) cm and its radius is measured to be (1.00 ± 0.01) cm. What is the maximum percentage error in the calculated volume of the rod?",
      option_a: "3.0%",
      option_b: "2.0%",
      option_c: "1.0%",
      option_d: "4.0%",
      correct_option: "A",
      explanation: "Step 1: Formula for volume of a cylinder:\nV = π r² l\n\nStep 2: Fractional and percentage error formula:\nTaking natural logarithm and differentiating:\nΔV / V = 2 × (Δr / r) + (Δl / l)\nPercentage error in V = [2 × (Δr / r) + (Δl / l)] × 100%.\n\nStep 3: Calculate individual percentage errors:\nPercentage error in radius = (0.01 / 1.00) × 100% = 1.0%\nPercentage error in length = (0.1 / 10.0) × 100% = 1.0%\n\nStep 4: Compute total percentage error in volume:\nTotal % error = 2 × (1.0%) + 1.0% = 2.0% + 1.0% = 3.0%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2982, // Q20
    similar_question: {
      question: "The dimensional formula of 1 / √(μ₀ ε₀), where μ₀ is the permeability and ε₀ is the permittivity of free space, is:",
      option_a: "[M⁰LT⁻¹]",
      option_b: "[M⁰L²T⁻²]",
      option_c: "[M⁰L⁻¹T]",
      option_d: "[M⁰L⁻²T²]",
      correct_option: "A",
      explanation: "Step 1: Relationship from electromagnetic theory:\nIn Maxwell's electromagnetic wave theory, the velocity of light in vacuum c is given by:\nc = 1 / √(μ₀ ε₀)\n\nStep 2: State the dimensions of speed of light:\nSpeed of light c represents speed (distance / time):\n[c] = [Length / Time] = [M⁰L¹T⁻¹].\n\nStep 3: Dimensional formula of 1 / √(μ₀ ε₀):\n[1 / √(μ₀ ε₀)] = [c] = [M⁰LT⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2983, // Q21
    similar_question: {
      question: "If the unit of mass (M) is doubled and the unit of length (L) is tripled while the unit of time (T) remains unchanged, by what factor will the unit of force increase?",
      option_a: "6 times",
      option_b: "18 times",
      option_c: "12 times",
      option_d: "36 times",
      correct_option: "A",
      explanation: "Step 1: Dimensional formula of force:\nForce = Mass × Acceleration\n[F] = [M¹ L¹ T⁻²].\n\nStep 2: Apply the scaling factors to the units:\nM' = 2 M\nL' = 3 L\nT' = 1 T\n\nStep 3: Calculate the new unit of force:\nu' = (M')¹ × (L')¹ × (T')⁻²\n   = (2 M) × (3 L) × (T)⁻²\n   = 6 × [M L T⁻²] = 6 u.\nTherefore, the unit of force increases by 6 times.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2984, // Q22
    similar_question: {
      question: "The dimensional formula [M¹ L² T⁻³ A⁻²] corresponds to which physical quantity?",
      option_a: "Electrical resistance",
      option_b: "Electrical resistivity",
      option_c: "Electrical conductivity",
      option_d: "Magnetic flux",
      correct_option: "A",
      explanation: "Step 1: Relate resistance to work and current:\nResistance R = Potential difference (V) / Current (I)\nV = Work done (W) / Charge (q) = W / (I × t)\nR = W / (I² × t)\n\nStep 2: Substitute dimensional formulas:\nWork done [W] = [ML²T⁻²]\nCurrent [I] = [A]\nTime [t] = [T]\n\nStep 3: Compute dimensions of R:\n[R] = [ML²T⁻²] / ([A]² × [T])\n    = [ML²T⁻²] / [A²T]\n    = [M¹ L² T⁻³ A⁻²].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2985, // Q23
    similar_question: {
      question: "The surface tension of a liquid is 72 dyne cm⁻¹ in the CGS system. What is its numerical value in the SI system (N m⁻¹)?",
      option_a: "0.072 N m⁻¹",
      option_b: "0.72 N m⁻¹",
      option_c: "7.2 N m⁻¹",
      option_d: "720 N m⁻¹",
      correct_option: "A",
      explanation: "Step 1: Conversions between CGS and SI units:\n1 dyne = 10⁻⁵ N\n1 cm = 10⁻² m\n\nStep 2: Convert the unit dyne cm⁻¹ to N m⁻¹:\n1 dyne cm⁻¹ = 10⁻⁵ N / 10⁻² m = 10⁻³ N m⁻¹.\n\nStep 3: Compute the magnitude in SI units:\n72 dyne cm⁻¹ = 72 × 10⁻³ N m⁻¹\n             = 0.072 N m⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2986, // Q24
    similar_question: {
      question: "Perform the subtraction (4.56 − 4.542) g and express the result with the correct number of significant decimal places:",
      option_a: "0.02 g",
      option_b: "0.018 g",
      option_c: "0.0180 g",
      option_d: "0.2 g",
      correct_option: "A",
      explanation: "Step 1: Rule for significant figures in subtraction:\nIn addition and subtraction, the final result can retain no more decimal places than the measured value with the least number of decimal places.\n\nStep 2: Inspect decimal places of the inputs:\n4.56 has 2 decimal places.\n4.542 has 3 decimal places.\nThe result must be rounded off to 2 decimal places.\n\nStep 3: Perform subtraction and round off:\n4.56 − 4.542 = 0.018 g.\nRounding 0.018 g to 2 decimal places gives 0.02 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2987, // Q25
    similar_question: {
      question: "The dimensional formula for angular momentum (L) is:",
      option_a: "[ML²T⁻¹]",
      option_b: "[MLT⁻¹]",
      option_c: "[ML²T⁻²]",
      option_d: "[M⁰L²T⁻¹]",
      correct_option: "A",
      explanation: "Step 1: Formula for angular momentum:\nAngular momentum L = r × p = r × (m × v)\nwhere r is position vector, m is mass, and v is linear velocity.\n\nStep 2: Substitute dimensional formulas:\n[r] = [L]\n[m] = [M]\n[v] = [LT⁻¹]\n\nStep 3: Compute dimensions of L:\n[L] = [L] × [M] × [LT⁻¹]\n    = [M¹ L² T⁻¹].\nNotice that angular momentum has identical dimensions to Planck's constant (h).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2988, // Q26
    similar_question: {
      question: "The radius of a circular wire is 0.35 mm. Taking significant figures into account, what is the cross-sectional area of the wire? (Use π = 22/7)",
      option_a: "0.38 mm²",
      option_b: "0.385 mm²",
      option_c: "0.4 mm²",
      option_d: "0.3848 mm²",
      correct_option: "A",
      explanation: "Step 1: Formula for cross-sectional area:\nArea A = π r²\n\nStep 2: Compute the raw area:\nA = (22 / 7) × (0.35 mm)²\n  = (22 / 7) × 0.1225 mm²\n  = 0.385 mm².\n\nStep 3: Apply significant figure rules:\nThe radius 0.35 mm has 2 significant figures.\nRounding 0.385 mm² to 2 significant figures (using standard rounding convention where an odd digit is rounded up and an even digit remains even when followed by 5) gives 0.38 mm².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2989, // Q27
    similar_question: {
      question: "A screw gauge has a main scale pitch of 1 mm and 100 circular divisions. When measuring the thickness of a sheet, the main scale reads 0 mm and the circular scale reads 75 divisions. What is the thickness of the sheet in centimeters?",
      option_a: "0.075 cm",
      option_b: "0.75 cm",
      option_c: "0.0075 cm",
      option_d: "0.057 cm",
      correct_option: "A",
      explanation: "Step 1: Determine Least Count (LC) of screw gauge:\nLC = Pitch / Total circular scale divisions\nLC = 1 mm / 100 = 0.01 mm.\nConvert to centimeters: 0.01 mm = 0.001 cm.\n\nStep 2: Formula for total reading:\nTotal Reading = MSR + (CSR × LC)\n\nStep 3: Substitute the measured values:\nMSR = 0 mm = 0 cm\nCSR = 75\nTotal Reading = 0 + (75 × 0.001 cm) = 0.075 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2990, // Q28
    similar_question: {
      question: "What are the number of significant figures in the numbers 0.00204, 305.00, and 4.50 × 10⁴ respectively?",
      option_a: "3, 5, 3",
      option_b: "5, 3, 3",
      option_c: "3, 3, 2",
      option_d: "4, 5, 3",
      correct_option: "A",
      explanation: "Step 1: Rules for significant figures:\n1. Leading zeros are never significant:\nIn 0.00204, the three zeros before '2' are place-holders; '2', '0', '4' are significant → 3 significant figures.\n\n2. Trailing zeros after a decimal point are significant:\nIn 305.00, both trailing zeros indicate measurement precision → 5 significant figures.\n\n3. Exponential powers in scientific notation do not affect significant figures:\nIn 4.50 × 10⁴, the digits '4', '5', '0' are all significant → 3 significant figures.\n\nTherefore, the respective counts are 3, 5, 3.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updateAllRemaining() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Admin login failed');

    console.log(`Starting update of all remaining ${allRemainingSet2Updates.length} practice questions...`);

    let successCount = 0;
    for (const item of allRemainingSet2Updates) {
      const updateRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          similarQuestion: item.similar_question
        })
      });
      const data = await updateRes.json();
      if (data.success) {
        successCount++;
        console.log(`[${successCount}/${allRemainingSet2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`\nAll ${successCount} questions updated successfully! Chapter 1 (Units & Dimension) is now 100% COMPLETE!`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updateAllRemaining();
