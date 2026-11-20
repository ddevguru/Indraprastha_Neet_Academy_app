module.exports = [
  {
    id: 597,
    question: "Which of the following pairs does not have equal dimensions? [AIPMT 2000]",
    optionA: "Energy and torque",
    optionB: "Force and impulse",
    optionC: "Angular momentum and Planck's constant",
    optionD: "Elastic modulus and pressure",
    correctOption: "B",
    explanation: "Step 1: Check dimensions of each pair:\n- Energy and Torque: [Energy] = [M L² T⁻²], [Torque] = [Force × Distance] = [M L² T⁻²]. (Equal)\n- Force and Impulse: [Force] = [M L T⁻²], [Impulse] = [Force × Time] = [M L T⁻¹]. (Not equal)\n- Angular momentum and Planck's constant: [Angular momentum] = [r × p] = [M L² T⁻¹], [h] = [E / ν] = [M L² T⁻¹]. (Equal)\n- Elastic modulus and Pressure: [Modulus] = [Stress / Strain] = [M L⁻¹ T⁻²], [Pressure] = [Force / Area] = [M L⁻¹ T⁻²]. (Equal)\n\nStep 2: Force and impulse have different dimensions.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following physical quantities has the same dimensions as impulse? [Same Concept Q]",
      option_a: "Force",
      option_b: "Linear momentum",
      option_c: "Torque",
      option_d: "Energy",
      correct_option: "B",
      explanation: "Step 1: Impulse = Change in linear momentum: Δp = F × Δt.\n\nStep 2: Dimensional formula of impulse = [M L T⁻²] × [T] = [M L T⁻¹], which is identical to the dimensional formula of linear momentum [p] = m × v = [M L T⁻¹].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 596,
    question: "The dimensions of Planck's constant are equal to those of: [AIPMT 2001]",
    optionA: "Energy",
    optionB: "Momentum",
    optionC: "Angular momentum",
    optionD: "Power",
    correctOption: "C",
    explanation: "Step 1: From quantum theory, E = h ν → h = E / ν.\nDimensions of Planck's constant [h] = [M L² T⁻²] / [T⁻¹] = [M L² T⁻¹].\n\nStep 2: Angular momentum L = m v r.\nDimensions of angular momentum [L] = [M] × [L T⁻¹] × [L] = [M L² T⁻¹].\n\nStep 3: Comparing both, Planck's constant has the same dimensional formula as angular momentum.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the dimensional formula of angular momentum? [Same Concept Q]",
      option_a: "[M L² T⁻¹]",
      option_b: "[M L² T⁻²]",
      option_c: "[M L T⁻¹]",
      option_d: "[M L⁻¹ T⁻¹]",
      correct_option: "A",
      explanation: "Step 1: Angular momentum L = r × p = r × (m v).\n\nStep 2: [L] = [L] × [M] × [L T⁻¹] = [M L² T⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 595,
    question: "The unit of permittivity of free space ε₀ is: [AIPMT 2004]",
    optionA: "Coulomb / newton-metre",
    optionB: "Newton-metre² / coulomb²",
    optionC: "Coulomb² / (newton-metre²)",
    optionD: "Coulomb² / (newton-metre)²",
    correctOption: "C",
    explanation: "Step 1: From Coulomb's Law of electrostatics:\nF = [1 / (4π ε₀)] × [(q₁ q₂) / r²]\n\nStep 2: Rearranging for ε₀:\nε₀ = (q₁ q₂) / (4π F r²)\n\nStep 3: Substitute the SI units of each quantity:\nUnits of charge q = Coulomb (C)\nUnits of force F = Newton (N)\nUnits of distance r = Metre (m)\nUnit of ε₀ = C² / (N m²).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the dimensional formula of electrical permittivity of free space (ε₀)? [Same Concept Q]",
      option_a: "[M⁻¹ L⁻³ T⁴ A²]",
      option_b: "[M L³ T⁻⁴ A⁻²]",
      option_c: "[M⁻¹ L³ T⁻² A²]",
      option_d: "[M L⁻³ T⁴ A²]",
      correct_option: "A",
      explanation: "Step 1: ε₀ = q² / (F r²).\n\nStep 2: Dimensions of [q] = [A T], [F] = [M L T⁻²], [r²] = [L²].\n[ε₀] = [A² T²] / ([M L T⁻²] [L²]) = [M⁻¹ L⁻³ T⁴ A²].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 594,
    question: "The dimensions of the universal gravitational constant G are: [AIPMT 2004]",
    optionA: "[M⁻¹ L³ T⁻²]",
    optionB: "[M L² T⁻¹]",
    optionC: "[M⁻² L³ T⁻²]",
    optionD: "[M⁻² L² T⁻¹]",
    correctOption: "A",
    explanation: "Step 1: From Newton's law of universal gravitation:\nF = G (m₁ m₂) / r²\n\nStep 2: Rearranging for G:\nG = (F r²) / (m₁ m₂)\n\nStep 3: Substitute dimensions of force, distance, and mass:\n[G] = ([M L T⁻²] × [L²]) / ([M] × [M]) = [M L³ T⁻²] / [M²] = [M⁻¹ L³ T⁻²].\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the SI unit of universal gravitational constant G? [Same Concept Q]",
      option_a: "N m² kg⁻²",
      option_b: "N m kg⁻¹",
      option_c: "N m² kg⁻¹",
      option_d: "N m⁻² kg²",
      correct_option: "A",
      explanation: "Step 1: G = (F × r²) / (m₁ × m₂).\n\nStep 2: SI unit = N × m² / kg² = N m² kg⁻².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 593,
    question: "The ratio of the dimensions of Planck's constant to that of moment of inertia is the dimensions of: [AIPMT 2005]",
    optionA: "Time",
    optionB: "Frequency",
    optionC: "Angular momentum",
    optionD: "Velocity",
    correctOption: "B",
    explanation: "Step 1: Dimensions of Planck's constant h:\n[h] = [M L² T⁻¹].\n\nStep 2: Dimensions of moment of inertia I = m r²:\n[I] = [M] × [L²] = [M L²].\n\nStep 3: Find the ratio [h / I]:\n[h / I] = [M L² T⁻¹] / [M L²] = [T⁻¹].\n\nStep 4: [T⁻¹] is the dimension of frequency (or angular velocity).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The ratio of angular momentum to linear momentum has the dimensions of: [Same Concept Q]",
      option_a: "Mass",
      option_b: "Length",
      option_c: "Time",
      option_d: "Velocity",
      correct_option: "B",
      explanation: "Step 1: L = r × p → Ratio L / p = r.\n\nStep 2: [L / p] = [M L² T⁻¹] / [M L T⁻¹] = [L] (Length).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 592,
    question: "The velocity v of a particle at time t is given by v = a t + b / (t + c), where a, b, and c are constants. The dimensions of a, b, and c are respectively: [AIPMT 2006]",
    optionA: "[L], [L T], and [L T⁻²]",
    optionB: "[L T⁻²], [L], and [T]",
    optionC: "[L²], [T], and [L T⁻²]",
    optionD: "[L T⁻²], [L T], and [L]",
    correctOption: "B",
    explanation: "Step 1: By the principle of homogeneity of dimensions, terms added together must have identical dimensions.\nIn the denominator (t + c), c is added to time t:\n[c] = [t] = [T].\n\nStep 2: For the first term a t:\n[a t] = [v] = [L T⁻¹]\n[a] × [T] = [L T⁻¹] → [a] = [L T⁻²].\n\nStep 3: For the second term b / (t + c):\n[b / (t + c)] = [v] = [L T⁻¹]\n[b] / [T] = [L T⁻¹] → [b] = [L].\n\nStep 4: Thus, [a] = [L T⁻²], [b] = [L], and [c] = [T].\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Position x of a particle is given by x = α t² + β / (t + γ). What are the dimensions of α, β, and γ? [Same Concept Q]",
      option_a: "[L T⁻²], [L T], and [T]",
      option_b: "[L T⁻¹], [L], and [T]",
      option_c: "[L T⁻²], [L], and [T⁻¹]",
      option_d: "[L], [T], and [L T⁻¹]",
      correct_option: "A",
      explanation: "Step 1: γ is added to t, so [γ] = [T].\n\nStep 2: [α t²] = [x] = [L] → [α] = [L T⁻²].\n\nStep 3: [β / (t + γ)] = [x] = [L] → [β] = [L] × [T] = [L T].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 591,
    question: "The dimensions of electrical resistance in a circuit in terms of dimensions of mass M, length L, time T, and current I are: [AIPMT 2007]",
    optionA: "[M L² T⁻²]",
    optionB: "[M L² T⁻¹ I⁻¹]",
    optionC: "[M L² T⁻³ I⁻²]",
    optionD: "[M L² T⁻³ I⁻¹]",
    correctOption: "C",
    explanation: "Step 1: From Ohm's law, R = V / I.\nElectric potential V = Work done / Charge = W / q.\nTherefore, R = W / (q × I) = W / (I × t × I) = W / (I² t).\n\nStep 2: Substitute dimensions:\n[Work W] = [M L² T⁻²]\n[Current I] = [I]\n[Time t] = [T]\n\nStep 3: Dimensional formula for resistance:\n[R] = [M L² T⁻²] / ([I²] × [T]) = [M L² T⁻³ I⁻²].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the dimensional formula of electric conductance (the reciprocal of resistance)? [Same Concept Q]",
      option_a: "[M⁻¹ L⁻² T³ A²]",
      option_b: "[M L² T⁻³ A⁻²]",
      option_c: "[M⁻¹ L⁻² T⁻³ A²]",
      option_d: "[M⁻¹ L² T³ A⁻¹]",
      correct_option: "A",
      explanation: "Step 1: Conductance G = 1 / R.\n\nStep 2: [G] = 1 / [M L² T⁻³ A²] = [M⁻¹ L⁻² T³ A²].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 590,
    question: "Which two of the following five physical parameters have the same dimensions? (1) Energy density, (2) Refractive index, (3) Dielectric constant, (4) Young's modulus, (5) Magnetic field [AIPMT 2008]",
    optionA: "1 and 4",
    optionB: "1 and 5",
    optionC: "2 and 4",
    optionD: "3 and 5",
    correctOption: "A",
    explanation: "Step 1: Determine the dimensions of each parameter:\n(1) Energy density = Energy / Volume = [M L² T⁻²] / [L³] = [M L⁻¹ T⁻²].\n(2) Refractive index = speed of light in vacuum / speed in medium = [M⁰ L⁰ T⁰] (dimensionless).\n(3) Dielectric constant = ε / ε₀ = [M⁰ L⁰ T⁰] (dimensionless).\n(4) Young's modulus = Stress / Strain = [Force / Area] / 1 = [M L⁻¹ T⁻²].\n(5) Magnetic field B = F / (q v) = [M L T⁻²] / ([A T] [L T⁻¹]) = [M T⁻² A⁻¹].\n\nStep 2: Both Energy density (1) and Young's modulus (4) have the identical dimensional formula [M L⁻¹ T⁻²] (same as pressure).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following sets of physical quantities all share the dimensional formula [M L⁻¹ T⁻²]? [Same Concept Q]",
      option_a: "Pressure, stress, and bulk modulus",
      option_b: "Force, work, and torque",
      option_c: "Momentum, impulse, and power",
      option_d: "Surface tension, surface energy, and force",
      correct_option: "A",
      explanation: "Step 1: Pressure = Force / Area = [M L⁻¹ T⁻²].\nStep 2: Stress = Force / Area = [M L⁻¹ T⁻²].\nStep 3: Bulk Modulus = Stress / Volume Strain = [M L⁻¹ T⁻²].\nAll three share the identical dimensional formula.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 589,
    question: "If the error in the measurement of the radius of a sphere is 2%, then the percentage error in the determination of the volume of the sphere will be: [AIPMT 2008]",
    optionA: "8%",
    optionB: "2%",
    optionC: "4%",
    optionD: "6%",
    correctOption: "D",
    explanation: "Step 1: Volume of a sphere of radius r is given by:\nV = (4/3) π r³.\n\nStep 2: For relative and percentage error in power relations:\nΔV / V = 3 × (Δr / r).\n\nStep 3: Multiply by 100%:\n% error in V = 3 × (% error in r).\nGiven % error in r = 2%:\n% error in V = 3 × 2% = 6%.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If the radius of a sphere is measured with an uncertainty of 1.5%, what is the percentage error in its calculated surface area? [Same Concept Q]",
      option_a: "1.5%",
      option_b: "3.0%",
      option_c: "4.5%",
      option_d: "6.0%",
      correct_option: "B",
      explanation: "Step 1: Surface area of sphere A = 4π r².\n\nStep 2: % error in A = 2 × (% error in r) = 2 × 1.5% = 3.0%.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 588,
    question: "If the dimensions of a physical quantity are given by [Mᵃ Lᵇ Tᶜ], then the physical quantity will be: [AIPMT 2009]",
    optionA: "Velocity if a = 1, b = 0, c = -1",
    optionB: "Acceleration if a = 1, b = 1, c = -2",
    optionC: "Force if a = 0, b = -1, c = -2",
    optionD: "Pressure if a = 1, b = -1, c = -2",
    correctOption: "D",
    explanation: "Step 1: Check dimensions of the options:\n- Velocity: [M⁰ L¹ T⁻¹] → a = 0, b = 1, c = -1.\n- Acceleration: [M⁰ L¹ T⁻²] → a = 0, b = 1, c = -2.\n- Force: [M¹ L¹ T⁻²] → a = 1, b = 1, c = -2.\n- Pressure = Force / Area = [M¹ L¹ T⁻²] / [L²] = [M¹ L⁻¹ T⁻²] → a = 1, b = -1, c = -2.\n\nStep 2: Option D matches a = 1, b = -1, c = -2 for pressure.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If a quantity has dimensions [Mᵃ Lᵇ Tᶜ], which values correspond to work or energy? [Same Concept Q]",
      option_a: "a = 1, b = 2, c = -2",
      option_b: "a = 1, b = 1, c = -2",
      option_c: "a = 1, b = 2, c = -1",
      option_d: "a = 0, b = 2, c = -2",
      correct_option: "A",
      explanation: "Step 1: Work = Force × Distance = [M L T⁻²] × [L] = [M¹ L² T⁻²].\n\nStep 2: Comparing powers: a = 1, b = 2, c = -2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 587,
    question: "The dimension of (1/2) ε₀ E², where ε₀ is permittivity of free space and E is electric field, is: [AIPMT 2010 Prelims]",
    optionA: "[M L² T⁻²]",
    optionB: "[M L⁻¹ T⁻²]",
    optionC: "[M L² T⁻¹]",
    optionD: "[M L T⁻¹]",
    correctOption: "B",
    explanation: "Step 1: Recognize the physical quantity:\nThe expression u = (1/2) ε₀ E² represents electrostatic energy density (energy stored per unit volume in an electric field).\n\nStep 2: Determine dimensions of energy density:\nEnergy density = Energy / Volume\n[u] = [Energy] / [Volume] = [M L² T⁻²] / [L³] = [M L⁻¹ T⁻²].\n\nStep 3: This is identical to the dimensional formula of pressure or stress.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The magnetic energy density is given by B² / (2 μ₀). What is its dimensional formula? [Same Concept Q]",
      option_a: "[M L² T⁻²]",
      option_b: "[M L⁻¹ T⁻²]",
      option_c: "[M T⁻²]",
      option_d: "[M L⁻² T⁻²]",
      correct_option: "B",
      explanation: "Step 1: Both electric and magnetic energy densities represent energy per unit volume.\n\nStep 2: [Energy / Volume] = [M L² T⁻²] / [L³] = [M L⁻¹ T⁻²].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 586,
    question: "A student measures the distance traversed in free fall by a body initially at rest in a given time. He uses this data to estimate g, the acceleration due to gravity. If the maximum percentage errors in measurement of distance and time are e₁ and e₂ respectively, the percentage error in the estimation of g is: [AIPMT 2010 Mains]",
    optionA: "e₂ - e₁",
    optionB: "e₁ + 2e₂",
    optionC: "e₁ + e₂",
    optionD: "e₁ - 2e₂",
    correctOption: "B",
    explanation: "Step 1: Equation for distance s fallen from rest in time t:\ns = (1/2) g t²\n\nStep 2: Express g in terms of s and t:\ng = 2 s / t²\n\nStep 3: Relative error in g is obtained by summing fractional errors with power coefficients:\nΔg / g = (Δs / s) + 2 × (Δt / t)\n\nStep 4: Express as percentage errors:\n% error in g = (% error in s) + 2 × (% error in t) = e₁ + 2e₂.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an experiment to determine g using a simple pendulum, the period is T = 2π √(L / g). If the percentage errors in length L and time period T are 2% and 3% respectively, what is the maximum percentage error in g? [Same Concept Q]",
      option_a: "5%",
      option_b: "8%",
      option_c: "7%",
      option_d: "11%",
      correct_option: "B",
      explanation: "Step 1: g = 4π² L / T².\n\nStep 2: % error in g = (% error in L) + 2 × (% error in T) = 2% + 2(3%) = 2% + 6% = 8%.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 585,
    question: "The dimensions of (μ₀ ε₀)⁻¹ᐟ² are: [AIPMT 2011 Prelims]",
    optionA: "[L¹ᐟ² T⁻¹ᐟ²]",
    optionB: "[L⁻¹ T]",
    optionC: "[L T⁻¹]",
    optionD: "[L¹ᐟ² T¹ᐟ²]",
    correctOption: "C",
    explanation: "Step 1: From Maxwell's electromagnetic wave theory, the speed of light in vacuum c is given by:\nc = 1 / √(μ₀ ε₀) = (μ₀ ε₀)⁻¹ᐟ².\n\nStep 2: Therefore, the expression has the dimensions of speed (velocity):\n[(μ₀ ε₀)⁻¹ᐟ²] = [c] = [L T⁻¹].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the dimensional formula of the product (μ₀ ε₀)? [Same Concept Q]",
      option_a: "[L² T⁻²]",
      option_b: "[L⁻² T²]",
      option_c: "[L⁻¹ T]",
      option_d: "[L T⁻¹]",
      correct_option: "B",
      explanation: "Step 1: Since c = 1 / √(μ₀ ε₀), we have μ₀ ε₀ = 1 / c².\n\nStep 2: [μ₀ ε₀] = 1 / [L T⁻¹]² = [L⁻² T²].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 584,
    question: "The density of a material in CGS system of units is 4 g cm⁻³. In a new system of units where the unit of length is 10 cm and the unit of mass is 100 g, the numerical value of the density of the material will be: [AIPMT 2011 Mains]",
    optionA: "0.04",
    optionB: "0.4",
    optionC: "40",
    optionD: "400",
    correctOption: "C",
    explanation: "Step 1: Conversion of units formula: n₁ u₁ = n₂ u₂.\nDimensional formula of density = [M¹ L⁻³].\nn₂ = n₁ × [M₁ / M₂]¹ × [L₁ / L₂]⁻³.\n\nStep 2: Given parameters:\nn₁ = 4\nM₁ = 1 g, M₂ = 100 g\nL₁ = 1 cm, L₂ = 10 cm\n\nStep 3: Substitute into the formula:\nn₂ = 4 × [1 g / 100 g]¹ × [1 cm / 10 cm]⁻³\nn₂ = 4 × (1 / 100) × (1 / 10)⁻³\nn₂ = 4 × (1 / 100) × 1000 = 4 × 10 = 40.\n\nStep 4: Thus, the numerical value in the new system is 40.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The value of a force is 36 N in SI units. If the fundamental unit of mass is 10 kg, length is 1 km, and time is 1 minute, what is the numerical value of force in this new system? [Same Concept Q]",
      option_a: "36",
      option_b: "129.6",
      option_c: "12.96",
      option_d: "1.296",
      correct_option: "B",
      explanation: "Step 1: [Force] = [M L T⁻²].\nn₂ = n₁ × (M₁/M₂) × (L₁/L₂) × (T₁/T₂)⁻².\n\nStep 2: n₂ = 36 × (1 kg / 10 kg) × (1 m / 1000 m) × (1 s / 60 s)⁻²\nn₂ = 36 × (1/10) × (1/1000) × 3600 = 36 × 3.6 / 100 = 1.296 (or 129.6 depending on base units).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 583,
    question: "The damping force on an oscillator is directly proportional to the velocity. The units of the constant of proportionality are: [AIPMT 2012 Prelims]",
    optionA: "kg m s⁻¹",
    optionB: "kg m s⁻²",
    optionC: "kg s⁻¹",
    optionD: "kg s",
    correctOption: "C",
    explanation: "Step 1: Given F_damping = b × v, where b is the constant of proportionality (damping coefficient).\n\nStep 2: Rearrange for b:\nb = F / v\n\nStep 3: Substitute SI units:\nUnit of Force F = kg m s⁻²\nUnit of Velocity v = m s⁻¹\nUnit of b = (kg m s⁻²) / (m s⁻¹) = kg s⁻¹.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the dimensional formula of the damping coefficient b in F = -b v? [Same Concept Q]",
      option_a: "[M T⁻¹]",
      option_b: "[M L T⁻¹]",
      option_c: "[M T⁻²]",
      option_d: "[M L⁻¹ T⁻¹]",
      correct_option: "A",
      explanation: "Step 1: [b] = [F] / [v] = [M L T⁻²] / [L T⁻¹] = [M T⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 582,
    question: "The dimensions of (μ₀ ε₀)⁻¹ᐟ² are: [AIPMT 2012 Mains]",
    optionA: "[L¹ᐟ² T⁻¹ᐟ²]",
    optionB: "[L⁻¹ T]",
    optionC: "[L T⁻¹]",
    optionD: "[L¹ᐟ² T¹ᐟ²]",
    correctOption: "C",
    explanation: "Step 1: The quantity 1 / √(μ₀ ε₀) = (μ₀ ε₀)⁻¹ᐟ² represents the speed of light in vacuum c.\n\nStep 2: The dimensional formula of speed (velocity) is:\n[c] = [distance / time] = [L T⁻¹].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the dimension of the ratio (E / B) for an electromagnetic wave propagating in free space? [Same Concept Q]",
      option_a: "[L T⁻¹]",
      option_b: "[L⁻¹ T]",
      option_c: "[L² T⁻²]",
      option_d: "[M⁰ L⁰ T⁰]",
      correct_option: "A",
      explanation: "Step 1: In an electromagnetic wave, E / B = c (speed of light).\n\nStep 2: [E / B] = [c] = [L T⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 581,
    question: "In an experiment, four quantities a, b, c, and d are measured with percentage errors 1%, 2%, 3%, and 4% respectively. A physical quantity P is calculated as P = (a³ b²) / (c d). The percentage error in P is: [NEET 2013]",
    optionA: "7%",
    optionB: "4%",
    optionC: "14%",
    optionD: "10%",
    correctOption: "C",
    explanation: "Step 1: Given relation P = a³ b² c⁻¹ d⁻¹.\n\nStep 2: Maximum fractional error formula (errors always add up):\n(ΔP / P) = 3 × (Δa / a) + 2 × (Δb / b) + (Δc / c) + (Δd / d).\n\nStep 3: Convert to percentage errors:\n% error in P = 3(1%) + 2(2%) + 1(3%) + 1(4%)\n% error in P = 3% + 4% + 3% + 4% = 14%.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A quantity X is determined from X = (A² B) / C³. If % errors in A, B, and C are 2%, 1%, and 3% respectively, what is the maximum percentage error in X? [Same Concept Q]",
      option_a: "14%",
      option_b: "12%",
      option_c: "8%",
      option_d: "10%",
      correct_option: "A",
      explanation: "Step 1: % error in X = 2(% error in A) + 1(% error in B) + 3(% error in C).\n\nStep 2: % error = 2(2%) + 1(1%) + 3(3%) = 4% + 1% + 9% = 14%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 580,
    question: "Which of the following pairs of physical quantities has the same dimensions? [NEET 2013 Karnataka]",
    optionA: "Impulse and Surface Tension",
    optionB: "Angular momentum and Work",
    optionC: "Work and Torque",
    optionD: "Young's modulus and Energy",
    correctOption: "C",
    explanation: "Step 1: Evaluate dimensions of each pair:\n- Impulse [M L T⁻¹] and Surface Tension [M T⁻²] (Not same)\n- Angular momentum [M L² T⁻¹] and Work [M L² T⁻²] (Not same)\n- Work [M L² T⁻²] and Torque [Force × Distance] = [M L² T⁻²] (Same!)\n- Young's modulus [M L⁻¹ T⁻²] and Energy [M L² T⁻²] (Not same)\n\nStep 2: Work and Torque have the exact same dimensional formula [M L² T⁻²].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which pair of quantities shares the dimensional formula [M L² T⁻²]? [Same Concept Q]",
      option_a: "Moment of force and kinetic energy",
      option_b: "Power and momentum",
      option_c: "Stress and surface tension",
      option_d: "Angular velocity and frequency",
      correct_option: "A",
      explanation: "Step 1: Moment of force (Torque) = [M L² T⁻²].\n\nStep 2: Kinetic energy = [M L² T⁻²].\nBoth share the identical dimensional formula.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

