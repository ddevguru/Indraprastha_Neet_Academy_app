module.exports = [
  {
    id: 579,
    question: "If force F, velocity V, and time T are taken as fundamental units, then the dimensions of mass are: [AIPMT 2014]",
    optionA: "[F V T⁻¹]",
    optionB: "[F V T⁻²]",
    optionC: "[F V⁻¹ T⁻¹]",
    optionD: "[F V⁻¹ T]",
    correctOption: "D",
    explanation: "Step 1: Express mass m in terms of F, V, and T:\nLet m ∝ Fᵃ Vᵇ Tᶜ.\n\nStep 2: Substitute dimensional formulas in terms of M, L, T:\n[F] = [M L T⁻²]\n[V] = [L T⁻¹]\n[T] = [T]\n[M¹ L⁰ T⁰] = [M L T⁻²]ᵃ [L T⁻¹]ᵇ [T]ᶜ\n[M¹ L⁰ T⁰] = [Mᵃ Lᵃ⁺ᵇ T⁻²ᵃ⁻ᵇ⁺ᶜ].\n\nStep 3: Equate exponents of M, L, and T:\na = 1\na + b = 0 → 1 + b = 0 → b = -1\n-2a - b + c = 0 → -2(1) - (-1) + c = 0 → -2 + 1 + c = 0 → c = 1.\n\nStep 4: Substitute the values of exponents:\nm = [F¹ V⁻¹ T¹] = [F V⁻¹ T].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If force F, acceleration A, and time T are fundamental quantities, the dimensional formula for mass is: [Same Concept Q]",
      option_a: "[F A⁻¹ T]",
      option_b: "[F A⁻¹]",
      option_c: "[F A T⁻²]",
      option_d: "[F A⁻¹ T²]",
      correct_option: "B",
      explanation: "Step 1: From Newton's second law: F = m × a → m = F / a = F × A⁻¹.\n\nStep 2: Thus, the dimensions of mass are [F A⁻¹].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 578,
    question: "If energy E, velocity V, and time T are chosen as the fundamental quantities, the dimensional formula of surface tension will be: [AIPMT 2015 Cancelled]",
    optionA: "[E V⁻² T⁻²]",
    optionB: "[E⁻² V⁻¹ T⁻³]",
    optionC: "[E V⁻² T⁻¹]",
    optionD: "[E V⁻¹ T⁻²]",
    correctOption: "A",
    explanation: "Step 1: Surface tension S = Force / Length = Work / Area = Energy / Length².\n\nStep 2: Express length L in terms of velocity V and time T:\nVelocity V = Length / Time → Length L = V × T.\n\nStep 3: Substitute Length into the surface tension expression:\n[S] = [Energy] / [Length]² = [E] / [V T]² = [E V⁻² T⁻²].\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If force F, length L, and time T are fundamental quantities, what is the dimensional formula of surface tension? [Same Concept Q]",
      option_a: "[F L⁻¹]",
      option_b: "[F L⁻²]",
      option_c: "[F L T⁻¹]",
      option_d: "[F L⁻¹ T⁻²]",
      correct_option: "A",
      explanation: "Step 1: Surface tension = Force / Length = [F / L] = [F L⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 577,
    question: "If the dimensions of critical velocity v_c of a liquid flowing through a tube are expressed as [ηˣ ρʸ rᶻ], where η, ρ, and r are coefficient of viscosity, density of liquid, and radius of the tube respectively, then the values of x, y, and z are: [AIPMT 2015]",
    optionA: "-1, -1, -1",
    optionB: "1, 1, 1",
    optionC: "1, -1, -1",
    optionD: "-1, -1, 1",
    correctOption: "C",
    explanation: "Step 1: Write dimensions of the quantities:\n[v_c] = [L T⁻¹]\n[η] = [M L⁻¹ T⁻¹]\n[ρ] = [M L⁻³]\n[r] = [L]\n\nStep 2: Set up dimensional equation: [v_c] = [η]ˣ [ρ]ʸ [r]ᶻ:\n[M⁰ L¹ T⁻¹] = [M L⁻¹ T⁻¹]ˣ [M L⁻³]ʸ [L]ᶻ\n[M⁰ L¹ T⁻¹] = [Mˣ⁺ʸ L⁻ˣ⁻³ʸ⁺ᶻ T⁻ˣ].\n\nStep 3: Equating powers:\nFor T: -x = -1 → x = 1\nFor M: x + y = 0 → 1 + y = 0 → y = -1\nFor L: -x - 3y + z = 1 → -1 - 3(-1) + z = 1 → -1 + 3 + z = 1 → 2 + z = 1 → z = -1.\n\nStep 4: Thus, x = 1, y = -1, z = -1.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Terminal velocity v of a sphere falling in a viscous fluid depends on radius r, viscosity η, and effective buoyant weight W. If v ∝ Wᵃ rᵇ ηᶜ, the power of viscosity c is: [Same Concept Q]",
      option_a: "1",
      option_b: "-1",
      option_c: "2",
      option_d: "-2",
      correct_option: "B",
      explanation: "Step 1: From Stokes' law: W = 6π η r v → v = W / (6π η r).\n\nStep 2: Terminal velocity is inversely proportional to viscosity η, so c = -1.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 576,
    question: "Planck's constant h, speed of light in vacuum c, and Newton's gravitational constant G are three fundamental constants. Which of the following combinations of these has the dimension of length? [NEET 2016 Phase 2]",
    optionA: "√(h G / c³)",
    optionB: "√(h G / c⁵)",
    optionC: "√(h c / G)",
    optionD: "√(G c / h³ᐟ²)",
    correctOption: "A",
    explanation: "Step 1: Write the dimensional formula of each constant:\n[h] = [M L² T⁻¹]\n[G] = [M⁻¹ L³ T⁻²]\n[c] = [L T⁻¹]\n\nStep 2: Evaluate the combination [h G]:\n[h G] = [M L² T⁻¹] × [M⁻¹ L³ T⁻²] = [M⁰ L⁵ T⁻³].\n\nStep 3: Divide by [c³]:\n[c³] = [L³ T⁻³]\n[h G / c³] = [L⁵ T⁻³] / [L³ T⁻³] = [L²].\n\nStep 4: Take square root:\n[√(h G / c³)] = √[L²] = [L] (Planck length).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following combinations of fundamental constants has the dimensions of time (Planck time)? [Same Concept Q]",
      option_a: "√(h G / c⁵)",
      option_b: "√(h G / c³)",
      option_c: "√(h c / G)",
      option_d: "h G / c⁴",
      correct_option: "A",
      explanation: "Step 1: Planck time t_p = Planck length / speed of light = [√(h G / c³)] / c = √(h G / c⁵).\n\nStep 2: [√(h G / c⁵)] = √([L²] / [L² T⁻²]) = √[T²] = [T].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 575,
    question: "A physical quantity of the dimensions of length that can be formed out of c, G, and e² / (4πε₀) is: (where c is speed of light, G is universal gravitational constant, and e is electric charge) [NEET 2017]",
    optionA: "c² [G · e² / (4πε₀)]¹ᐟ²",
    optionB: "(1 / c²) [e² / (4πε₀ G)]¹ᐟ²",
    optionC: "(1 / c) [G + e² / (4πε₀)]",
    optionD: "(1 / c²) [G · e² / (4πε₀)]¹ᐟ²",
    correctOption: "D",
    explanation: "Step 1: Dimensions of the given components:\n[c] = [L T⁻¹]\n[G] = [M⁻¹ L³ T⁻²]\nFrom Coulomb's law F = [e² / (4πε₀)] / r² → [e² / (4πε₀)] = [F r²] = [M L T⁻²] × [L²] = [M L³ T⁻²].\n\nStep 2: Multiply G and [e² / (4πε₀)]:\n[G · e² / (4πε₀)] = [M⁻¹ L³ T⁻²] × [M L³ T⁻²] = [L⁶ T⁻⁴].\n\nStep 3: Take square root:\n[G · e² / (4πε₀)]¹ᐟ² = [L³ T⁻²].\n\nStep 4: Divide by c²:\n[c²] = [L² T⁻²]\n[(1 / c²) [G · e² / (4πε₀)]¹ᐟ²] = [L³ T⁻²] / [L² T⁻²] = [L].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the dimensional formula of the product G × [e² / (4πε₀)]? [Same Concept Q]",
      option_a: "[L⁶ T⁻⁴]",
      option_b: "[L⁴ T⁻⁴]",
      option_c: "[M² L⁶ T⁻⁴]",
      option_d: "[L³ T⁻²]",
      correct_option: "A",
      explanation: "Step 1: [G] = [M⁻¹ L³ T⁻²].\n[e² / (4πε₀)] = [M L³ T⁻²].\n\nStep 2: Product = [M⁻¹ L³ T⁻²] × [M L³ T⁻²] = [L⁶ T⁻⁴].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 574,
    question: "A student measured the diameter of a small steel ball using a screw gauge of least count 0.001 cm. The main scale reading is 5 mm and zero of circular scale division coincides with 25 divisions above the reference level. If the screw gauge has a zero error of -0.004 cm, the correct diameter of the ball is: [NEET 2018]",
    optionA: "0.521 cm",
    optionB: "0.525 cm",
    optionC: "0.053 cm",
    optionD: "0.529 cm",
    correctOption: "D",
    explanation: "Step 1: Express all values in the same units (cm):\nLeast count (LC) = 0.001 cm\nMain scale reading (MSR) = 5 mm = 0.5 cm\nCircular scale reading (CSR) = 25 divisions\nZero error = -0.004 cm\n\nStep 2: Calculate the observed reading:\nObserved reading = MSR + (CSR × LC)\nObserved reading = 0.5 cm + (25 × 0.001 cm) = 0.5 + 0.025 = 0.525 cm.\n\nStep 3: Correct reading = Observed reading - Zero error:\nCorrect diameter = 0.525 cm - (-0.004 cm) = 0.525 + 0.004 = 0.529 cm.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A screw gauge of least count 0.01 mm gives a main scale reading of 3 mm and circular scale reading of 40 divisions. If the zero error is +0.02 mm, the true reading is: [Same Concept Q]",
      option_a: "3.42 mm",
      option_b: "3.38 mm",
      option_c: "3.40 mm",
      option_d: "3.44 mm",
      correct_option: "B",
      explanation: "Step 1: Observed reading = 3 mm + 40 × 0.01 mm = 3.40 mm.\n\nStep 2: True reading = Observed - (+Zero error) = 3.40 - 0.02 = 3.38 mm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 573,
    question: "In an experiment, the percentage errors in the measurement of physical quantities A, B, C, and D are 1%, 2%, 3%, and 4% respectively. Then the maximum percentage error in the measurement of X, where X = (A² B¹ᐟ²) / (C¹ᐟ³ D³), will be: [NEET 2019]",
    optionA: "16%",
    optionB: "-10%",
    optionC: "10%",
    optionD: "(3/13)%",
    correctOption: "A",
    explanation: "Step 1: Given relation X = A² B¹ᐟ² C⁻¹ᐟ³ D⁻³.\n\nStep 2: Formula for maximum relative error:\n(ΔX / X) = 2(ΔA / A) + (1/2)(ΔB / B) + (1/3)(ΔC / C) + 3(ΔD / D).\n\nStep 3: Multiply by 100% and substitute given percentage errors:\n% error in X = 2(1%) + (1/2)(2%) + (1/3)(3%) + 3(4%)\n% error in X = 2% + 1% + 1% + 12% = 16%.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A quantity Y is given by Y = M³ L² / T⁴. If % errors in M, L, and T are 1%, 2%, and 1% respectively, what is the maximum percentage error in Y? [Same Concept Q]",
      option_a: "11%",
      option_b: "7%",
      option_c: "9%",
      option_d: "5%",
      correct_option: "A",
      explanation: "Step 1: % error in Y = 3(% error in M) + 2(% error in L) + 4(% error in T).\n\nStep 2: % error = 3(1%) + 2(2%) + 4(1%) = 3 + 4 + 4 = 11%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 572,
    question: "The energy required to break one bond in DNA is approximately 10⁻²⁰ J. The value of this energy in electron-volts (eV) is nearly: [NEET 2020 Phase 1]",
    optionA: "0.6 eV",
    optionB: "0.06 eV",
    optionC: "0.006 eV",
    optionD: "6 eV",
    correctOption: "B",
    explanation: "Step 1: Recall the relation between Joules and electron-volts:\n1 eV = 1.6 × 10⁻¹⁹ J.\n\nStep 2: Convert 10⁻²⁰ J to eV:\nEnergy (in eV) = (10⁻²⁰ J) / (1.6 × 10⁻¹⁹ J/eV)\nEnergy = (1 / 1.6) × 10⁻¹ eV = 0.625 × 10⁻¹ eV = 0.0625 eV ≈ 0.06 eV.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Thermal energy kT at room temperature (300 K) is about 4.14 × 10⁻²¹ J. What is this value in eV? [Same Concept Q]",
      option_a: "0.26 eV",
      option_b: "0.026 eV",
      option_c: "2.6 eV",
      option_d: "0.0026 eV",
      correct_option: "B",
      explanation: "Step 1: Energy in eV = (4.14 × 10⁻²¹) / (1.6 × 10⁻¹⁹) = 0.02587 eV ≈ 0.026 eV.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 571,
    question: "The dimensions of stress are: [NEET 2020 Phase 1]",
    optionA: "[M L² T⁻²]",
    optionB: "[M L⁰ T⁻²]",
    optionC: "[M L⁻¹ T⁻²]",
    optionD: "[M L T⁻²]",
    correctOption: "C",
    explanation: "Step 1: Formula for stress:\nStress = Restoring force / Area = F / A.\n\nStep 2: Substitute dimensions of force and area:\n[F] = [M L T⁻²]\n[A] = [L²]\n\nStep 3: Calculate dimensions of stress:\n[Stress] = [M L T⁻²] / [L²] = [M L⁻¹ T⁻²].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following quantities has the same dimensional formula as stress? [Same Concept Q]",
      option_a: "Pressure",
      option_b: "Surface tension",
      option_c: "Strain",
      option_d: "Force",
      correct_option: "A",
      explanation: "Step 1: Pressure = Force / Area = [M L⁻¹ T⁻²], identical to stress.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 570,
    question: "Taking into account significant figures, what is the value of 9.99 m - 0.0099 m? [NEET 2020 Phase 1]",
    optionA: "9.98 m",
    optionB: "9.980 m",
    optionC: "9.9 m",
    optionD: "9.9801 m",
    correctOption: "A",
    explanation: "Step 1: Perform ordinary subtraction:\n9.99 - 0.0099 = 9.9801 m.\n\nStep 2: Apply the rule for significant figures in addition/subtraction:\nThe final result must retain only as many decimal places as are present in the number with the least decimal places.\nHere, 9.99 has 2 decimal places, while 0.0099 has 4 decimal places.\n\nStep 3: Round the result 9.9801 to 2 decimal places:\nRounding gives 9.98 m.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Subtract 0.25 g from 12.5 g taking into account significant figures: [Same Concept Q]",
      option_a: "12.25 g",
      option_b: "12.3 g",
      option_c: "12.2 g",
      option_d: "12 g",
      correct_option: "B",
      explanation: "Step 1: 12.5 - 0.25 = 12.25 g.\n\nStep 2: 12.5 has 1 decimal place, so round 12.25 to 1 decimal place (following standard rounding rules for 5 preceded by an even number: 12.2 or rounding up to 12.3).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 569,
    question: "A screw gauge has a least count of 0.01 mm and there are 50 divisions in its circular scale. The pitch of the screw gauge is: [NEET 2020 Phase 1]",
    optionA: "0.25 mm",
    optionB: "0.5 mm",
    optionC: "1.0 mm",
    optionD: "0.01 mm",
    correctOption: "B",
    explanation: "Step 1: Formula relating least count, pitch, and number of circular scale divisions:\nLeast Count (LC) = Pitch / (Number of circular scale divisions).\n\nStep 2: Rearranging for pitch:\nPitch = Least Count × (Number of circular scale divisions).\n\nStep 3: Substitute given values:\nPitch = 0.01 mm × 50 = 0.5 mm.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If a micrometer screw gauge has 100 circular divisions and pitch 0.5 mm, what is its least count? [Same Concept Q]",
      option_a: "0.005 mm",
      option_b: "0.05 mm",
      option_c: "0.001 mm",
      option_d: "0.02 mm",
      correct_option: "A",
      explanation: "Step 1: LC = Pitch / Divisions = 0.5 mm / 100 = 0.005 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 568,
    question: "If force [F], acceleration [A], and time [T] are chosen as fundamental physical quantities, find the dimensions of energy. [NEET 2021]",
    optionA: "[F] [A⁻¹] [T]",
    optionB: "[F] [A] [T]",
    optionC: "[F] [A] [T²]",
    optionD: "[F] [A] [T⁻¹]",
    correctOption: "C",
    explanation: "Step 1: Energy has dimensions of Work:\nWork = Force × Displacement.\n\nStep 2: Relate displacement (Length L) to acceleration [A] and time [T]:\nDisplacement s = (1/2) a t² → [L] = [A] [T²].\n\nStep 3: Substitute into the energy formula:\n[Energy] = [Force] × [Displacement] = [F] × [A T²] = [F] [A] [T²].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If force F, velocity V, and time T are fundamental quantities, what is the dimensional formula for work? [Same Concept Q]",
      option_a: "[F V T]",
      option_b: "[F V⁻¹ T]",
      option_c: "[F V T⁻¹]",
      option_d: "[F V² T]",
      correct_option: "A",
      explanation: "Step 1: Work = Force × Distance = F × (V × T) = [F V T].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 567,
    question: "A screw gauge gives the following readings when used to measure the diameter of a wire: Main scale reading = 0 mm, Circular scale reading = 52 divisions. Given that 1 mm on the main scale corresponds to 100 divisions on the circular scale, the diameter of the wire from the above data is: [NEET 2021]",
    optionA: "0.052 cm",
    optionB: "0.52 cm",
    optionC: "0.026 cm",
    optionD: "0.26 cm",
    correctOption: "A",
    explanation: "Step 1: Calculate least count (LC) of the screw gauge:\nLC = (1 mm) / 100 = 0.01 mm = 0.001 cm.\n\nStep 2: Calculate diameter of the wire in mm:\nDiameter = MSR + (CSR × LC)\nDiameter = 0 mm + (52 × 0.01 mm) = 0.52 mm.\n\nStep 3: Convert mm to cm (1 cm = 10 mm):\nDiameter = 0.52 / 10 = 0.052 cm.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A screw gauge with pitch 0.5 mm and 50 circular divisions gives MSR = 1.5 mm and CSR = 30 divisions. The measured diameter in cm is: [Same Concept Q]",
      option_a: "0.180 cm",
      option_b: "1.80 cm",
      option_c: "0.018 cm",
      option_d: "0.360 cm",
      correct_option: "A",
      explanation: "Step 1: LC = 0.5 mm / 50 = 0.01 mm.\n\nStep 2: Reading = 1.5 mm + 30 × 0.01 mm = 1.80 mm = 0.180 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 566,
    question: "If E and G respectively denote energy and gravitational constant, then the expression E / G has dimensions: [NEET 2021]",
    optionA: "[M² L² T⁻¹]",
    optionB: "[M² L⁻¹ T⁰]",
    optionC: "[M L⁻¹ T⁻¹]",
    optionD: "[M L⁰ T⁰]",
    correctOption: "B",
    explanation: "Step 1: Write the dimensional formula of Energy E:\n[E] = [M¹ L² T⁻²].\n\nStep 2: Write the dimensional formula of Gravitational constant G:\n[G] = [M⁻¹ L³ T⁻²].\n\nStep 3: Calculate the dimensions of the ratio E / G:\n[E / G] = [M¹ L² T⁻²] / [M⁻¹ L³ T⁻²]\n[E / G] = [M¹⁻⁽⁻¹⁾ L²⁻³ T⁻²⁻⁽⁻²⁾] = [M² L⁻¹ T⁰].\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What are the dimensions of the ratio G / E? [Same Concept Q]",
      option_a: "[M⁻² L T⁰]",
      option_b: "[M² L⁻¹ T⁰]",
      option_c: "[M⁻¹ L² T⁻¹]",
      option_d: "[M⁰ L T⁻¹]",
      correct_option: "A",
      explanation: "Step 1: [G / E] = 1 / [E / G] = 1 / [M² L⁻¹ T⁰] = [M⁻² L T⁰].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 565,
    question: "The area of a rectangular field (in m²) of length 55.3 m and breadth 25 m after rounding off to the correct number of significant digits is: [NEET 2022 Phase 1]",
    optionA: "138 × 10¹",
    optionB: "1382",
    optionC: "1382.5",
    optionD: "14 × 10²",
    correctOption: "D",
    explanation: "Step 1: Calculate the area mathematically:\nArea = Length × Breadth = 55.3 m × 25 m = 1382.5 m².\n\nStep 2: Apply the significant figures rule for multiplication:\nLength = 55.3 m has 3 significant figures.\nBreadth = 25 m has 2 significant figures.\nThe final answer must have only 2 significant figures (equal to the least significant figures among the measured quantities).\n\nStep 3: Round off 1382.5 to 2 significant figures:\n1382.5 becomes 1400 = 14 × 10² m² (or 1.4 × 10³ m²).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Multiply 4.25 m by 2.0 m taking into account proper significant figures: [Same Concept Q]",
      option_a: "8.5 m²",
      option_b: "8.50 m²",
      option_c: "8 m²",
      option_d: "9 m²",
      correct_option: "A",
      explanation: "Step 1: 4.25 × 2.0 = 8.5 m².\n\nStep 2: 2.0 has 2 significant figures, so the result must retain 2 significant figures: 8.5 m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 564,
    question: "Plane angle and solid angle have: [NEET 2022 Phase 1]",
    optionA: "Units but no dimensions",
    optionB: "Dimensions but no units",
    optionC: "No units and no dimensions",
    optionD: "Both units and dimensions",
    correctOption: "A",
    explanation: "Step 1: Consider Plane angle:\nPlane angle = Arc / Radius = [L] / [L] = [M⁰ L⁰ T⁰] (dimensionless).\nIts SI unit is radian (rad).\n\nStep 2: Consider Solid angle:\nSolid angle = Area / (Radius)² = [L²] / [L²] = [M⁰ L⁰ T⁰] (dimensionless).\nIts SI unit is steradian (sr).\n\nStep 3: Thus, both plane angle and solid angle have units but are dimensionless.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following supplementary SI quantities has units but no dimensions? [Same Concept Q]",
      option_a: "Solid angle",
      option_b: "Refractive index",
      option_c: "Relative density",
      option_d: "Strain",
      correct_option: "A",
      explanation: "Step 1: Refractive index, relative density, and strain have neither units nor dimensions.\n\nStep 2: Solid angle has the SI unit steradian (sr) but no dimensions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 563,
    question: "The dimensions [M L T⁻² A⁻²] belong to: [NEET 2022 Phase 1]",
    optionA: "Magnetic flux",
    optionB: "Self inductance",
    optionC: "Magnetic permeability",
    optionD: "Electric permittivity",
    correctOption: "C",
    explanation: "Step 1: Recall the magnetic force per unit length between two parallel currents:\nF / l = (μ₀ I₁ I₂) / (2π d)\n\nStep 2: Rearrange for permeability of free space μ₀:\nμ₀ = (2π d × F) / (l × I₁ × I₂)\n\nStep 3: Substitute dimensional formulas:\n[μ₀] = ([L] × [M L T⁻²]) / ([L] × [A] × [A]) = [M L T⁻² A⁻²].\n\nStep 4: Therefore, [M L T⁻² A⁻²] belongs to magnetic permeability.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the SI unit of magnetic permeability μ₀? [Same Concept Q]",
      option_a: "T m A⁻¹ (or H m⁻¹)",
      option_b: "T m² A⁻¹",
      option_c: "T A⁻¹",
      option_d: "Wb m⁻²",
      correct_option: "A",
      explanation: "Step 1: Unit of μ₀ = N / A² = Tesla metre per Ampere (T m A⁻¹) or Henry per metre (H m⁻¹).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 562,
    question: "The percentage error in the measurement of g is: (Given that g = 4π² L / T², with measured length L = (10 ± 0.1) cm and time period T = (100 ± 1) s) [NEET 2022 Phase 2]",
    optionA: "7%",
    optionB: "2%",
    optionC: "5%",
    optionD: "3%",
    correctOption: "D",
    explanation: "Step 1: Given relation for acceleration due to gravity:\ng = 4π² L / T².\n\nStep 2: The relative error expression is:\nΔg / g = (ΔL / L) + 2 × (ΔT / T).\n\nStep 3: Calculate percentage error in L:\n% error in L = (0.1 / 10) × 100% = 1%.\n\nStep 4: Calculate percentage error in T:\n% error in T = (1 / 100) × 100% = 1%.\n\nStep 5: Total percentage error in g:\n% error in g = 1% + 2(1%) = 1% + 2% = 3%.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an experiment to measure g using a pendulum, length is measured with 1.5% error and period with 1% error. What is the maximum percentage error in the calculated value of g? [Same Concept Q]",
      option_a: "2.5%",
      option_b: "3.5%",
      option_c: "4.0%",
      option_d: "5.0%",
      correct_option: "B",
      explanation: "Step 1: % error in g = % error in L + 2 × (% error in T).\n\nStep 2: % error = 1.5% + 2(1%) = 3.5%.\n\nTherefore, Option (B) is the correct answer."
    }
  }
];

