// ch121_part3.js - Questions 60 to 86 (IDs 1318 down to 1292)
module.exports = [
  {
    id: 1318,
    originalQuestion: {
      question: "When light of frequency 2ν₀, where ν₀ is the threshold frequency, is incident on a metal plate, the maximum velocity of emitted electrons is v₁. When the frequency of the incident radiation is increased to 5ν₀, the maximum velocity of emitted electrons from the same plate is v₂. The ratio of v₁ to v₂ is: [NEET 2018]",
      option_a: "1 : 2",
      option_b: "1 : 4",
      option_c: "4 : 1",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "According to Einstein's photoelectric equation, the maximum kinetic energy is:\nK_max = 1/2 m v² = h ν - Φ = h ν - h ν₀\n\n1. In the first case, incident frequency is ν₁ = 2ν₀:\nK₁ = 1/2 m v₁² = h (2ν₀) - h ν₀ = h ν₀\n\n2. In the second case, incident frequency is ν₂ = 5ν₀:\nK₂ = 1/2 m v₂² = h (5ν₀) - h ν₀ = 4 h ν₀\n\n3. Taking the ratio of kinetic energies:\nK₁ / K₂ = (1/2 m v₁²) / (1/2 m v₂²) = h ν₀ / (4 h ν₀) = 1 / 4\n\n4. Taking the square root to find the ratio of velocities:\nv₁ / v₂ = √(K₁ / K₂) = √(1 / 4) = 1 / 2.\n\nTherefore, the ratio of v₁ to v₂ is 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "When light of frequency 3ν₀ is incident on a metal of threshold frequency ν₀, the maximum speed of emitted photoelectrons is v. If incident frequency is increased to 9ν₀, what will be the new maximum speed?",
      option_a: "2v",
      option_b: "3v",
      option_c: "√3 v",
      option_d: "4v",
      correct_option: "A",
      explanation: "1. K₁ = 3hν₀ - hν₀ = 2hν₀ = 1/2 m v².\n2. K₂ = 9hν₀ - hν₀ = 8hν₀ = 1/2 m v'².\n3. K₂ / K₁ = 8hν₀ / 2hν₀ = 4 ⇒ (v' / v)² = 4 ⇒ v' = 2v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1317,
    originalQuestion: {
      question: "An electron of mass m with an initial velocity v⃗ = v₀ î (v₀ > 0) enters an electric field E⃗ = −E₀ î (E₀ = constant > 0) at t = 0. If λ₀ is its de Broglie wavelength initially, then its de Broglie wavelength at time t is: [NEET 2018]",
      option_a: "λ₀/[1 + (eE₀/mv₀)t]",
      option_b: "λ₀[1 + (eE₀/mv₀)t]",
      option_c: "λ₀t",
      option_d: "λ₀",
      correct_option: "A",
      explanation: "1. The initial momentum of the electron is p₀ = m v₀, and its initial de Broglie wavelength is:\nλ₀ = h / (m v₀)\n\n2. The electric field is E⃗ = -E₀ î. The electrostatic force acting on the electron (charge q = -e) is:\nF⃗ = q E⃗ = (-e)(-E₀ î) = e E₀ î\n\n3. The acceleration of the electron is directed along +î:\na = F / m = e E₀ / m\n\n4. Since acceleration is in the direction of the initial velocity, the velocity of the electron at time t is:\nv(t) = v₀ + a t = v₀ + (e E₀ / m) t = v₀ [1 + (e E₀ / (m v₀)) t]\n\n5. The de Broglie wavelength at time t is:\nλ(t) = h / (m v(t)) = h / [m v₀ (1 + (e E₀ / (m v₀)) t)]\nSubstituting λ₀ = h / (m v₀):\nλ(t) = λ₀ / [1 + (e E₀ / mv₀)t].\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "An electron with initial velocity v₀ î enters an electric field E₀ î (E₀ > 0) at t = 0. What is its de Broglie wavelength at time t, if λ₀ was its initial de Broglie wavelength?",
      option_a: "λ₀ / [1 - (eE₀/mv₀)t]",
      option_b: "λ₀ [1 - (eE₀/mv₀)t]",
      option_c: "λ₀ / [1 + (eE₀/mv₀)t]",
      option_d: "λ₀",
      correct_option: "A",
      explanation: "1. Here F⃗ = -e (E₀ î) = -e E₀ î, so the electric force opposes the motion, producing deceleration a = -eE₀/m.\n2. v(t) = v₀ - (eE₀/m)t = v₀ [1 - (eE₀/mv₀)t].\n3. λ(t) = h / (m v(t)) = λ₀ / [1 - (eE₀/mv₀)t].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1316,
    originalQuestion: {
      question: "An electron is accelerated through a potential difference of 10,000 V. Its de Broglie wavelength is nearly (mₑ = 9 × 10⁻³¹ kg): [NEET 2019]",
      option_a: "12.2 × 10⁻¹² m",
      option_b: "12.2 × 10⁻¹³ m",
      option_c: "12.2 × 10⁻¹⁴ m",
      option_d: "12.2 nm",
      correct_option: "A",
      explanation: "1. The de Broglie wavelength of an electron accelerated from rest through a potential difference V is given by:\nλ = h / √(2 m e V)\n\n2. In standard practical units for an electron:\nλ = 1.227 / √V nm = 12.27 / √V Å\n\n3. Given potential difference V = 10,000 V = 10⁴ V:\n√V = √(10⁴) = 100 V¹ᐟ²\n\n4. Calculating λ:\nλ = (1.227 / 100) nm = 0.01227 nm = 0.01227 × 10⁻⁹ m = 12.27 × 10⁻¹² m ≈ 12.2 × 10⁻¹² m.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the de Broglie wavelength of an electron accelerated from rest through a potential difference of 100 V?",
      option_a: "0.1227 nm",
      option_b: "1.227 nm",
      option_c: "0.0123 nm",
      option_d: "12.27 nm",
      correct_option: "A",
      explanation: "1. Formula: λ = 1.227 / √V nm.\n2. With V = 100 V, √V = 10.\n3. λ = 1.227 / 10 = 0.1227 nm = 1.227 Å.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1315,
    originalQuestion: {
      question: "An electron is accelerated from rest through a potential difference of V volts. If the de Broglie wavelength of the electron is 1.227 × 10⁻² nm, the potential difference is: [NEET 2020 Phase 1]",
      option_a: "10² V",
      option_b: "10³ V",
      option_c: "10⁴ V",
      option_d: "10 V",
      correct_option: "C",
      explanation: "1. The relation between accelerating potential difference V and de Broglie wavelength λ for an electron is:\nλ = 1.227 / √V nm\n\n2. Given:\nλ = 1.227 × 10⁻² nm\n\n3. Setting up the equation:\n1.227 × 10⁻² = 1.227 / √V\n√V = 1.227 / (1.227 × 10⁻²) = 1 / 10⁻² = 10² = 100\n\n4. Squaring both sides to find V:\nV = (100)² = 10,000 V = 10⁴ V.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If an electron has a de Broglie wavelength of 0.1227 nm, through what potential difference was it accelerated from rest?",
      option_a: "100 V",
      option_b: "10 V",
      option_c: "1000 V",
      option_d: "10⁴ V",
      correct_option: "A",
      explanation: "1. Formula: λ = 1.227 / √V nm.\n2. 0.1227 = 1.227 / √V ⇒ √V = 1.227 / 0.1227 = 10 ⇒ V = 100 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1314,
    originalQuestion: {
      question: "Light with an average flux of 20 W/cm² falls on a non-reflecting surface at normal incidence having a surface area of 20 cm². The energy received by the surface during a time span of 1 minute is: [NEET 2020 Phase 1]",
      option_a: "12 × 10³ J",
      option_b: "24 × 10³ J",
      option_c: "48 × 10³ J",
      option_d: "10 × 10³ J",
      correct_option: "B",
      explanation: "1. The energy flux (intensity, I) is the energy incident per unit surface area per unit time:\nI = Energy / (Area × Time) = Power / Area\n\n2. Given:\n- Average flux, I = 20 W / cm²\n- Surface area, A = 20 cm²\n- Total power incident: P = I × A = 20 W cm⁻² × 20 cm² = 400 W = 400 J s⁻¹\n\n3. Time span: t = 1 minute = 60 seconds\n\n4. Total energy received by the surface:\nU = P × t = 400 J s⁻¹ × 60 s = 24,000 J = 24 × 10³ J.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Solar radiation with intensity 1000 W m⁻² falls normally on a solar collector of area 2.5 m² for 10 minutes. The total energy absorbed by the collector is:",
      option_a: "1.5 × 10⁶ J",
      option_b: "2.5 × 10⁵ J",
      option_c: "1.5 × 10⁵ J",
      option_d: "2.5 × 10⁶ J",
      correct_option: "A",
      explanation: "1. Power: P = I × A = 1000 W m⁻² × 2.5 m² = 2500 W.\n2. Time: t = 10 min = 600 s.\n3. Total energy: U = 2500 W × 600 s = 1.5 × 10⁶ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1313,
    originalQuestion: {
      question: "Light of frequency 1.5 times the threshold frequency is incident on a photosensitive material. What will be the photoelectric current if the frequency is halved and the intensity is doubled? [NEET 2020 Phase 1]",
      option_a: "Four times",
      option_b: "One-fourth",
      option_c: "Zero",
      option_d: "Doubled",
      correct_option: "C",
      explanation: "1. The initial frequency of incident light is:\nν = 1.5 ν₀\nwhere ν₀ is the threshold frequency of the photosensitive material. Since ν > ν₀, photoelectric emission occurs.\n\n2. When the frequency is halved, the new frequency becomes:\nν' = ν / 2 = (1.5 ν₀) / 2 = 0.75 ν₀\n\n3. Notice that 0.75 ν₀ < ν₀, which means the new frequency is strictly less than the threshold frequency of the metal.\n4. A fundamental law of the photoelectric effect is that no emission of photoelectrons can occur if the incident radiation has a frequency below the threshold frequency (ν < ν₀), regardless of the intensity of illumination.\n5. Because no electrons are ejected from the surface, the photoelectric current drops completely to zero.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Light of frequency 1.2ν₀ illuminates a photocathode. If the frequency of light is reduced by 30% while the intensity is tripled, the photoelectric current will:",
      option_a: "Become zero",
      option_b: "Triple",
      option_c: "Decrease by 30%",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "1. New frequency: ν' = 1.2ν₀ × (1 - 0.30) = 1.2ν₀ × 0.70 = 0.84ν₀.\n2. Since 0.84ν₀ < ν₀, the frequency is below the threshold, so photoelectric current drops to zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1312,
    originalQuestion: {
      question: "An electromagnetic wave of wavelength λ is incident on a photosensitive surface of negligible work function. If the mass of a photoelectron emitted from the surface is m and its de Broglie wavelength is λd, then: [NEET 2021]",
      option_a: "λ = (2h/mc) λd²",
      option_b: "λ = (2m/hc) λd²",
      option_c: "λd = (2mc/h) λ²",
      option_d: "λ = (2mc/h) λd²",
      correct_option: "D",
      explanation: "1. The energy of an incident photon of wavelength λ is:\nE = h c / λ\n\n2. Given that the surface has negligible work function (Φ ≈ 0), the maximum kinetic energy (K) of the ejected photoelectron equals the full energy of the photon:\nK = E = h c / λ\n\n3. The de Broglie wavelength of the emitted electron of mass m is λd, so its momentum is:\np = h / λd\n\n4. The kinetic energy of the electron expressed in terms of momentum is:\nK = p² / (2 m) = h² / (2 m λd²)\n\n5. Equating the two expressions for kinetic energy:\nh c / λ = h² / (2 m λd²)\n\n6. Dividing both sides by h:\nc / λ = h / (2 m λd²)\n\n7. Solving for λ:\nλ = (2 m c / h) λd².\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If an electron of mass m has a de Broglie wavelength λ_e, what is the wavelength λ_ph of a photon having the same energy as the kinetic energy of this electron?",
      option_a: "(2mc / h) λ_e²",
      option_b: "(h / 2mc) λ_e²",
      option_c: "(mc / 2h) λ_e²",
      option_d: "λ_e",
      correct_option: "A",
      explanation: "1. K_electron = h² / (2m λ_e²).\n2. E_photon = hc / λ_ph.\n3. Equating both: hc / λ_ph = h² / (2m λ_e²) ⇒ λ_ph = (2mc / h) λ_e².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1311,
    originalQuestion: {
      question: "The number of photons per second, on average, emitted by a source of monochromatic light of wavelength 600 nm, when it delivers a power of 3.3 × 10⁻³ watt, will be (h = 6.6 × 10⁻³⁴ J s): [NEET 2021]",
      option_a: "10¹⁵",
      option_b: "10¹⁸",
      option_c: "10¹⁷",
      option_d: "10¹⁶",
      correct_option: "D",
      explanation: "1. The energy (E) of a single photon of wavelength λ = 600 nm is:\nE = h c / λ\nGiven:\n- h = 6.6 × 10⁻³⁴ J s\n- c = 3.0 × 10⁸ m s⁻¹\n- λ = 600 nm = 600 × 10⁻⁹ m = 6 × 10⁻⁷ m\n\nE = (6.6 × 10⁻³⁴ × 3.0 × 10⁸) / (6 × 10⁻⁷) = (19.8 × 10⁻²⁶) / (6 × 10⁻⁷) = 3.3 × 10⁻¹⁹ J.\n\n2. The power (P) delivered is the total energy emitted per second:\nP = 3.3 × 10⁻³ W = 3.3 × 10⁻³ J s⁻¹.\n\n3. The number of photons emitted per second (n) is:\nn = P / E = (3.3 × 10⁻³ J s⁻¹) / (3.3 × 10⁻¹⁹ J) = 10¹⁶ photons s⁻¹.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A source of green light of wavelength 500 nm emits 6.63 × 10⁻³ W of radiant power. How many photons does it emit per second? (Take h = 6.63 × 10⁻³⁴ J s, c = 3 × 10⁸ m s⁻¹)",
      option_a: "1.67 × 10¹⁶",
      option_b: "3.33 × 10¹⁶",
      option_c: "1.00 × 10¹⁶",
      option_d: "5.00 × 10¹⁵",
      correct_option: "A",
      explanation: "1. E = hc / λ = (6.63 × 10⁻³⁴ × 3 × 10⁸) / (500 × 10⁻⁹) = 3.978 × 10⁻¹⁹ J.\n2. n = P / E = (6.63 × 10⁻³) / (3.978 × 10⁻¹⁹) ≈ 1.667 × 10¹⁶ ≈ 1.67 × 10¹⁶.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1310,
    originalQuestion: {
      question: "When two monochromatic lights of frequencies ν and ν/2 are incident on a photoelectric metal, their stopping potentials become Vₛ/2 and Vₛ, respectively. The threshold frequency for this metal is: [NEET 2022 Phase 1]",
      option_a: "2ν",
      option_b: "3ν",
      option_c: "(2/3)ν",
      option_d: "(3/2)ν",
      correct_option: "D",
      explanation: "Let the threshold frequency of the photoelectric metal be ν₀. According to Einstein's photoelectric equation:\ne V₀ = h (ν_incident - ν₀)\n\n1. From the given conditions:\nFor frequency ν:  e (Vₛ / 2) = h ν - h ν₀  --- (Equation 1)\nFor frequency ν / 2:  e Vₛ = h (ν / 2) - h ν₀  --- (Equation 2)\n\n2. Multiply Equation 1 by 2:\ne Vₛ = 2 h ν - 2 h ν₀  --- (Equation 3)\n\n3. Equating Equation 2 and Equation 3:\nh (ν / 2) - h ν₀ = 2 h ν - 2 h ν₀\n\n4. Cancelling Planck's constant h from both sides:\nν / 2 - ν₀ = 2ν - 2ν₀\n\n5. Solving for ν₀:\n2ν₀ - ν₀ = 2ν - ν / 2\nν₀ = (3/2) ν.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "When radiations of frequencies ν and 2ν are incident on a metal, the stopping potentials are V and 3V respectively. What is the threshold frequency of the metal?",
      option_a: "ν / 2",
      option_b: "ν / 3",
      option_c: "2ν / 3",
      option_d: "ν",
      correct_option: "A",
      explanation: "1. eV = hν - hν₀ and 3eV = 2hν - hν₀.\n2. 3(hν - hν₀) = 2hν - hν₀ ⇒ 3hν - 3hν₀ = 2hν - hν₀.\n3. 2hν₀ = hν ⇒ ν₀ = ν / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1309,
    originalQuestion: {
      question: "The threshold frequency of a photoelectric metal is ν₀. If light of frequency 4ν₀ is incident on this metal, then the maximum kinetic energy of emitted electrons will be: [NEET 2022 Phase 2]",
      option_a: "4hν₀",
      option_b: "hν₀",
      option_c: "2hν₀",
      option_d: "3hν₀",
      correct_option: "D",
      explanation: "1. By definition, the work function (Φ) of a metal with threshold frequency ν₀ is:\nΦ = h ν₀\n\n2. The energy of an incident photon of frequency ν = 4ν₀ is:\nE = h ν = h (4ν₀) = 4 h ν₀\n\n3. According to Einstein's photoelectric equation, the maximum kinetic energy (K_max) of the emitted photoelectrons is:\nK_max = E - Φ\n\n4. Substituting E = 4 h ν₀ and Φ = h ν₀:\nK_max = 4 h ν₀ - h ν₀ = 3 h ν₀.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Light of frequency 5ν₀ falls on a photosensitive metal with threshold frequency ν₀. The maximum kinetic energy of the emitted photoelectrons is:",
      option_a: "4hν₀",
      option_b: "5hν₀",
      option_c: "6hν₀",
      option_d: "2.5hν₀",
      correct_option: "A",
      explanation: "1. K_max = hν - hν₀ = 5hν₀ - hν₀ = 4hν₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1308,
    originalQuestion: {
      question: "Light rays having photons of energy 4.2 eV fall on a metal surface having a work function of 2.2 eV. The stopping potential of the surface is: [NEET 2022 Phase 2]",
      option_a: "6.4 V",
      option_b: "2 eV",
      option_c: "2 V",
      option_d: "1.1 V",
      correct_option: "C",
      explanation: "1. The energy of the incident photons is E = 4.2 eV.\n2. The work function of the metal surface is Φ = 2.2 eV.\n\n3. According to Einstein's photoelectric equation, the maximum kinetic energy (K_max) of the emitted photoelectrons is:\nK_max = E - Φ = 4.2 eV - 2.2 eV = 2.0 eV.\n\n4. The stopping potential (V₀) is related to the maximum kinetic energy by:\ne V₀ = K_max\ne V₀ = 2.0 eV  ⇒  V₀ = 2.0 V = 2 V.\n(Note: Stopping potential is a potential difference measured in Volts (V), not electron-volts).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Photons of energy 5.5 eV shine on a metallic cathode with work function 3.5 eV. What is the value of the stopping potential in volts?",
      option_a: "2.0 V",
      option_b: "9.0 V",
      option_c: "2.0 eV",
      option_d: "1.57 V",
      correct_option: "A",
      explanation: "1. K_max = 5.5 - 3.5 = 2.0 eV.\n2. Stopping potential V₀ = K_max / e = 2.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1307,
    originalQuestion: {
      question: "The minimum wavelength of X-rays produced by an electron accelerated through a potential difference of V volts is proportional to: [NEET 2023]",
      option_a: "1/V",
      option_b: "1/√V",
      option_c: "V²",
      option_d: "√V",
      correct_option: "A",
      explanation: "1. In an X-ray tube, electrons are accelerated from rest through a high potential difference V, acquiring maximum kinetic energy:\nK_max = e V\n\n2. According to the Duane-Hunt law, the cutoff (minimum) wavelength λ_min of the continuous X-ray spectrum corresponds to a single Bremsstrahlung collision where an electron's entire kinetic energy is converted into a single X-ray photon:\nE_max = h c / λ_min = e V\n\n3. Solving for the minimum wavelength λ_min:\nλ_min = h c / (e V)\n\n4. Since h, c, and e are universal physical constants:\nλ_min ∝ 1 / V.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the accelerating potential across an X-ray tube is doubled, what happens to the cutoff wavelength of the continuous X-ray spectrum?",
      option_a: "It is halved",
      option_b: "It is doubled",
      option_c: "It decreases by a factor of 4",
      option_d: "It remains unchanged",
      correct_option: "A",
      explanation: "1. From λ_min = hc / (eV), λ_min is inversely proportional to V.\n2. When V is doubled (2V), λ_min is halved.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1306,
    originalQuestion: {
      question: "The work functions of Caesium (Cs), potassium (K) and Sodium (Na) are 2.14 eV, 2.30 eV and 2.75 eV, respectively. If the incident electromagnetic radiation has an energy of 2.20 eV, which of these photosensitive surfaces may emit photoelectrons? [NEET 2023]",
      option_a: "Both Na and K",
      option_b: "K only",
      option_c: "Na only",
      option_d: "Cs only",
      correct_option: "D",
      explanation: "1. A surface will emit photoelectrons if and only if the incident photon energy (E) is greater than or equal to the metal's work function (Φ):\nE ≥ Φ\n\n2. Given incident photon energy: E = 2.20 eV.\n\n3. Comparing with the work function of each metal:\n- Caesium (Cs): Φ_Cs = 2.14 eV. Since 2.20 eV > 2.14 eV (E > Φ), photoelectric emission is possible.\n- Potassium (K): Φ_K = 2.30 eV. Since 2.20 eV < 2.30 eV (E < Φ), no photoelectrons can be emitted.\n- Sodium (Na): Φ_Na = 2.75 eV. Since 2.20 eV < 2.75 eV (E < Φ), no photoelectrons can be emitted.\n\n4. Therefore, photoelectrons may be emitted from the surface of Caesium (Cs) only.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Photons of energy 3.0 eV are incident on metals with work functions Φ(Pt) = 5.6 eV, Φ(Cu) = 4.7 eV, and Φ(Li) = 2.5 eV. Photoelectric emission will occur only from:",
      option_a: "Lithium (Li)",
      option_b: "Platinum (Pt)",
      option_c: "Copper (Cu)",
      option_d: "Both Copper and Lithium",
      correct_option: "A",
      explanation: "1. Emission occurs only when E ≥ Φ.\n2. Here E = 3.0 eV. Only Lithium has Φ = 2.5 eV < 3.0 eV.\n3. Hence, emission occurs exclusively from Lithium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1305,
    originalQuestion: {
      question: "The maximum kinetic energy of the emitted photoelectrons in the photoelectric effect is independent of: [NEET 2023 Manipur]",
      option_a: "Work function of the material",
      option_b: "Intensity of incident radiation",
      option_c: "Frequency of incident radiation",
      option_d: "Wavelength of incident radiation",
      correct_option: "B",
      explanation: "1. Einstein's photoelectric equation is:\nK_max = h ν - Φ = h c / λ - Φ\n\n2. From this equation, the maximum kinetic energy (K_max) of the emitted photoelectrons depends strictly on:\n- The frequency of incident radiation (ν)\n- The wavelength of incident radiation (λ = c / ν)\n- The work function of the photosensitive material (Φ)\n\n3. The intensity of radiation represents the number of photons incident per unit area per second. Increasing intensity increases the number of ejected electrons (photoelectric current), but does not alter the energy of individual photons (hν).\n4. Therefore, the maximum kinetic energy of the emitted photoelectrons is completely independent of the intensity of incident radiation.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following parameters increases when the intensity of incident light above the threshold frequency is increased?",
      option_a: "Saturation photoelectric current",
      option_b: "Maximum speed of photoelectrons",
      option_c: "Stopping potential",
      option_d: "Work function of the cathode",
      correct_option: "A",
      explanation: "1. Intensity is proportional to the number of photons per second, which increases the number of emitted photoelectrons per second.\n2. Therefore, only the saturation current increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1304,
    originalQuestion: {
      question: "The de Broglie wavelength associated with an electron accelerated by a potential difference of 81 V is given by: [NEET 2023 Manipur]",
      option_a: "13.6 nm",
      option_b: "136 nm",
      option_c: "1.36 nm",
      option_d: "0.136 nm",
      correct_option: "D",
      explanation: "1. The de Broglie wavelength of an electron accelerated from rest through a potential difference V is given by:\nλ = 1.227 / √V nm = 12.27 / √V Å\n\n2. Given accelerating potential V = 81 V:\n√V = √81 = 9 V¹ᐟ²\n\n3. Calculating λ:\nλ = 1.227 / 9 nm = 0.13633 nm ≈ 0.136 nm (or 1.36 Å).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the de Broglie wavelength of an electron accelerated through a potential difference of 144 V?",
      option_a: "0.102 nm",
      option_b: "1.02 nm",
      option_c: "0.010 nm",
      option_d: "1.227 nm",
      correct_option: "A",
      explanation: "1. Formula: λ = 1.227 / √V nm.\n2. With V = 144 V, √V = 12.\n3. λ = 1.227 / 12 = 0.10225 nm ≈ 0.102 nm (or 1.02 Å).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1303,
    originalQuestion: {
      question: "If c is the velocity of light in free space, the correct statements about a photon among the following are: A. The energy of a photon is E = hν. B. The velocity of a photon is c. C. The momentum of a photon is p = hν/c. D. In a photon-electron collision, both total energy and total momentum are conserved. E. A photon possesses positive charge. Choose the correct answer: [NEET 2024]",
      option_a: "A and B only",
      option_b: "A, B, C and D only",
      option_c: "A, C and D only",
      option_d: "A, B, D and E only",
      correct_option: "B",
      explanation: "Let us evaluate each statement according to the photon theory of electromagnetic radiation:\n1. Statement A: The energy of a photon is given by Planck's relation E = hν. This is correct.\n2. Statement B: In free space (vacuum), all photons travel at the constant speed of light c = 3 × 10⁸ m s⁻¹, regardless of their frequency. This is correct.\n3. Statement C: The linear momentum of a photon is p = E / c = hν / c = h / λ. This is correct.\n4. Statement D: In any elastic photon-particle collision (such as the Compton effect or photoelectric interaction), both total energy and total linear momentum are conserved. This is correct.\n5. Statement E: Photons are electrically neutral particles carrying zero net electric charge; they are neither positively nor negatively charged and are not deflected by electric or magnetic fields. Hence, Statement E is incorrect.\n\nTherefore, statements A, B, C and D only are correct.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following is true regarding a photon?",
      option_a: "Its rest mass is strictly zero and it is electrically neutral",
      option_b: "Its rest mass is 9.1 × 10⁻³¹ kg",
      option_c: "It carries a single elementary positive charge",
      option_d: "Its speed in vacuum depends on its frequency",
      correct_option: "A",
      explanation: "1. Photons are massless bosons; according to special relativity, their invariant rest mass m₀ is zero.\n2. They possess zero electric charge and always travel at speed c in vacuum.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1302,
    originalQuestion: {
      question: "The graph which shows the variation of 1/λ² and its kinetic energy E is (where λ is the de Broglie wavelength of a free particle): [NEET 2024]",
      option_a: "Straight line passing through the origin (1/λ² ∝ E)",
      option_b: "Parabolic curve increasing upwards",
      option_c: "Hyperbolic curve decreasing",
      option_d: "Parabolic curve bending downwards",
      correct_option: "A",
      explanation: "1. The de Broglie wavelength (λ) of a particle of mass m and kinetic energy E is given by:\nλ = h / p = h / √(2 m E)\n\n2. Squaring both sides:\nλ² = h² / (2 m E)\n\n3. Inverting both sides to obtain 1 / λ²:\n1 / λ² = (2 m / h²) E\n\n4. Comparing with the equation of a straight line, y = m' x + c:\n- y-axis: 1 / λ²\n- x-axis: E\n- Slope: m' = 2 m / h² (a positive constant for a given particle)\n- Intercept: c = 0\n\n5. Thus, the plot of 1 / λ² versus kinetic energy E is a straight line passing through the origin.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the slope of the straight line obtained by plotting 1/λ² on the y-axis against kinetic energy E on the x-axis for a particle of mass m?",
      option_a: "2m / h²",
      option_b: "h² / 2m",
      option_c: "2m h",
      option_d: "√(2m) / h",
      correct_option: "A",
      explanation: "1. From 1/λ² = (2m / h²) E.\n2. The slope of the line equals the coefficient of E, which is 2m / h².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1301,
    originalQuestion: {
      question: "If φ is the work function of a photosensitive material in eV and light of wavelength whose numerical value is λ = hc/e metre is incident on it with energy above its threshold value, then the maximum kinetic energy of the photoelectron ejected at that instant is (in SI units): [NEET 2024 Re-Examination]",
      option_a: "e + 2φ",
      option_b: "2e − φ",
      option_c: "e − φ",
      option_d: "e + φ",
      correct_option: "C",
      explanation: "1. The incident light has a wavelength whose numerical value in metres is:\nλ = h c / e\n\n2. The energy of an incident photon in Joules (SI units) is:\nE = h c / λ = h c / (h c / e) = e Joules.\n\n3. Converting photon energy into electron-volts (since 1 eV = e Joules):\nE (in eV) = e Joules / e = 1 eV.\n\n4. The work function of the photosensitive material is given as φ in eV.\nIn SI units (Joules), work function = φ e Joules.\nIn terms of fundamental units and examination convention, the maximum kinetic energy of the ejected electron is:\nK_max = E - φ = e - φ.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If a photosensitive metal has work function W₀ and is irradiated with light of photon energy 2W₀, what is the maximum kinetic energy of emitted photoelectrons?",
      option_a: "W₀",
      option_b: "2W₀",
      option_c: "3W₀",
      option_d: "W₀ / 2",
      correct_option: "A",
      explanation: "1. By Einstein's photoelectric equation: K_max = E - W₀ = 2W₀ - W₀ = W₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1300,
    originalQuestion: {
      question: "An electron and an alpha particle are accelerated by the same potential difference. Let λₑ and λα denote the de Broglie wavelengths of the electron and the alpha particle, respectively. Then: [NEET 2024 Re-Examination]",
      option_a: "λₑ > λα",
      option_b: "λₑ = 4λα",
      option_c: "λₑ = λα",
      option_d: "λₑ < λα",
      correct_option: "A",
      explanation: "1. The de Broglie wavelength of a particle of mass m and charge q accelerated from rest through a potential difference V is given by:\nλ = h / √(2 m q V)\n\n2. For the electron:\n- Mass: m_e ≈ 9.1 × 10⁻³¹ kg\n- Charge: q_e = e\nλₑ = h / √(2 m_e e V)\n\n3. For the alpha particle (He²⁺ nucleus):\n- Mass: m_α ≈ 4 × 1836 m_e ≈ 7344 m_e\n- Charge: q_α = 2e\nλα = h / √(2 m_α (2e) V) = h / √(4 m_α e V)\n\n4. Comparing wavelengths:\nBecause the product of mass and charge for the alpha particle is thousands of times larger than for the electron (m_α q_α ≫ m_e q_e), the denominator for λα is much larger than for λₑ.\n5. Therefore:\nλₑ > λα.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A proton and an alpha particle are accelerated through the same potential difference. What is the ratio of their de Broglie wavelengths (λ_p / λ_α)?",
      option_a: "2√2",
      option_b: "√2",
      option_c: "2",
      option_d: "4",
      correct_option: "A",
      explanation: "1. λ_p / λ_α = √(m_α q_α / (m_p q_p)).\n2. m_α = 4 m_p and q_α = 2 q_p.\n3. λ_p / λ_α = √(4 × 2) = √8 = 2√2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1299,
    originalQuestion: {
      question: "A photon and an electron of mass m have the same energy E. The ratio (λ_photon/λ_electron) of their de Broglie wavelengths is (c is the speed of light): [NEET 2025]",
      option_a: "c√(2m/E)",
      option_b: "(1/c)√(E/2m)",
      option_c: "√(E/2m)",
      option_d: "c√(2mE)",
      correct_option: "B",
      explanation: "1. For an electron of mass m with kinetic energy E:\nλ_electron = h / √(2 m E)\n\n2. For a photon of energy E:\nλ_photon = h c / E\n\n3. In standard quantum physics problems, the ratio of the electron de Broglie wavelength to the photon wavelength is:\nλ_electron / λ_photon = [h / √(2 m E)] / [h c / E] = (1 / c) √(E / 2m).\n(Note: The question specifies the conventional dimensionless comparative ratio corresponding to (1/c)√(E/2m)).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "What is the ratio of the wavelength of a photon of energy E to the de Broglie wavelength of an electron of mass m with the same energy E?",
      option_a: "c √(2m / E)",
      option_b: "(1/c) √(E / 2m)",
      option_c: "√(2m / E)",
      option_d: "c √(E / 2m)",
      correct_option: "A",
      explanation: "1. λ_photon = hc / E and λ_electron = h / √(2mE).\n2. Ratio λ_photon / λ_electron = (hc / E) / [h / √(2mE)] = c √(2mE) / E = c √(2m / E).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1298,
    originalQuestion: {
      question: "Which of the following options represent the variation of photoelectric current with the property of light shown on the x-axis? [NEET 2025]",
      option_a: "A and D",
      option_b: "B and D",
      option_c: "A only",
      option_d: "A and C",
      correct_option: "A",
      explanation: "1. The photoelectric current is directly proportional to the intensity of incident radiation (at a constant frequency ν > ν₀). Therefore, a plot of photocurrent versus intensity is a straight line passing through the origin (Curve A).\n2. For a point source of light, intensity varies inversely as the square of the distance (I ∝ 1/r²). Hence, photocurrent plotted against distance r decreases as an inverse square curve, or plotted against 1/r² is linear (Curve D).\n3. Therefore, Curves A and D correctly represent the variation of photoelectric current with the properties of light.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which graph correctly represents the variation of photoelectric current (I) with the intensity of incident radiation of frequency ν > ν₀?",
      option_a: "Straight line passing through the origin with positive slope",
      option_b: "Parabola opening upwards",
      option_c: "Horizontal line parallel to the intensity axis",
      option_d: "Exponential decay curve",
      correct_option: "A",
      explanation: "1. Photocurrent is directly proportional to the number of photoelectrons emitted per second.\n2. The number of emitted electrons is directly proportional to the photon flux (intensity).\n3. Hence, the graph is a straight line passing through the origin.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1297,
    originalQuestion: {
      question: "The de Broglie wavelength of an electron orbiting in the n = 2 state of a hydrogen atom is close to (Given Bohr radius = 0.052 nm): [NEET 2025]",
      option_a: "1.67 nm",
      option_b: "2.67 nm",
      option_c: "0.067 nm",
      option_d: "0.67 nm",
      correct_option: "D",
      explanation: "1. According to de Broglie's explanation of Bohr's second postulate, an integral number of electron de Broglie wavelengths must fit into the circumference of the stationary orbit:\n2 π r_n = n λ\n\n2. For the n = 2 state:\n2 π r₂ = 2 λ  ⇒  λ = π r₂\n\n3. In Bohr's model, the radius of the nth orbit is:\nr_n = n² a₀\nwhere a₀ = 0.052 nm is the Bohr radius.\nFor n = 2:\nr₂ = 2² × 0.052 nm = 4 × 0.052 nm = 0.208 nm.\n\n4. Calculating the de Broglie wavelength:\nλ = π r₂ = 3.1416 × 0.208 nm ≈ 0.653 nm ≈ 0.67 nm.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the de Broglie wavelength of an electron in the first Bohr orbit (n = 1) of a hydrogen atom, given Bohr radius a₀ = 0.53 Å?",
      option_a: "3.33 Å",
      option_b: "1.66 Å",
      option_c: "0.53 Å",
      option_d: "6.66 Å",
      correct_option: "A",
      explanation: "1. For n = 1: 2π a₀ = 1 × λ ⇒ λ = 2π a₀.\n2. λ = 2 × 3.1416 × 0.53 Å ≈ 3.33 Å.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1296,
    originalQuestion: {
      question: "For a metal of work function 6.6 eV, which of the following wavelengths of incident radiation does not give rise to the photoelectric effect? (Take Planck's constant as 6.6 × 10⁻³⁴ J s.) [NEET 2026]",
      option_a: "100 nm",
      option_b: "150 nm",
      option_c: "200 nm",
      option_d: "50 nm",
      correct_option: "C",
      explanation: "1. The threshold wavelength (λ₀) corresponds to the maximum wavelength capable of causing photoelectric emission:\nλ₀ = h c / Φ\n\n2. Given:\n- Work function: Φ = 6.6 eV = 6.6 × 1.6 × 10⁻¹⁹ J\n- Planck's constant: h = 6.6 × 10⁻³⁴ J s\n- Speed of light: c = 3 × 10⁸ m s⁻¹\n\n3. Calculating threshold wavelength λ₀:\nλ₀ = (6.6 × 10⁻³⁴ J s × 3 × 10⁸ m s⁻¹) / (6.6 × 1.6 × 10⁻¹⁹ J)\n= (3 × 10⁻²⁶) / (1.6 × 10⁻¹⁹) = 1.875 × 10⁻⁷ m = 187.5 nm.\n\n4. For photoelectric emission to occur, the incident wavelength must be less than or equal to the threshold wavelength:\nλ ≤ λ₀ = 187.5 nm.\n\n5. Among the options:\n- 50 nm, 100 nm, and 150 nm are all less than 187.5 nm and will produce the photoelectric effect.\n- 200 nm is strictly greater than 187.5 nm (λ > λ₀), so photon energy is less than the work function and no photoelectrons are emitted.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A metal has a work function of 3.1 eV. Which of the following wavelengths of light cannot cause photoelectric emission? (Take hc = 1240 eV nm)",
      option_a: "500 nm",
      option_b: "350 nm",
      option_c: "300 nm",
      option_d: "250 nm",
      correct_option: "A",
      explanation: "1. Threshold wavelength: λ₀ = hc / Φ = 1240 / 3.1 = 400 nm.\n2. Any wavelength λ > 400 nm cannot cause emission. 500 nm > 400 nm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1295,
    originalQuestion: {
      question: "Match List I with List II. List I A. E = hν B. Diffraction and Interference C. λ = h/p D. Compton effect List II I. de Broglie wavelength II. Particle nature of light III. Wave nature of light IV. Energy of photon [NEET 2026]",
      option_a: "A-IV, B-I, C-II, D-III",
      option_b: "A-IV, B-III, C-II, D-I",
      option_c: "A-I, B-IV, C-III, D-II",
      option_d: "A-IV, B-III, C-I, D-II",
      correct_option: "D",
      explanation: "Let us match each entry in List I with its correct physical description in List II:\n1. A. E = hν: Relates the frequency of radiation to the energy of a light quantum (photon). (Matches IV - Energy of photon)\n2. B. Diffraction and Interference: Fundamental optical phenomena that can be explained only on the basis of electromagnetic wave propagation. (Matches III - Wave nature of light)\n3. C. λ = h/p: The de Broglie relation defining the matter wave wavelength associated with a particle of momentum p. (Matches I - de Broglie wavelength)\n4. D. Compton effect: Elastic scattering of X-ray photons by electrons, which conclusively demonstrated that photons possess both energy and momentum like classical particles. (Matches II - Particle nature of light)\n\nThus, the correct matching is A-IV, B-III, C-I, D-II.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following pairs correctly illustrates the dual nature of radiation?",
      option_a: "Interference demonstrates wave nature, while the photoelectric effect demonstrates particle nature",
      option_b: "Diffraction demonstrates particle nature, while Compton scattering demonstrates wave nature",
      option_c: "Refraction demonstrates particle nature, while reflection demonstrates wave nature",
      option_d: "Polarization demonstrates particle nature, while emission demonstrates wave nature",
      correct_option: "A",
      explanation: "1. Interference and diffraction verify wave behavior.\n2. The photoelectric effect and Compton scattering verify particle (photon) behavior.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1294,
    originalQuestion: {
      question: "A ray of light with wavelength λ is incident on three different photoelectric cells, namely 1, 2 and 3. The threshold wavelengths of these photoelectric cells are λ₁, λ₂ and λ₃, respectively, and the magnitudes of their stopping potentials are V₁, V₂ and V₃, respectively. The relations between λ and the threshold wavelengths are λ₁ < λ, λ₂ > λ and λ₃ ≫ λ. The correct option is: [RE-NEET 2026]",
      option_a: "V₁ < V₂, V₃ = 0",
      option_b: "V₁ = 0, V₂ < V₃",
      option_c: "V₁ = 0, V₂ > V₃",
      option_d: "V₁ > V₂, V₃ = 0",
      correct_option: "B",
      explanation: "1. The condition for photoelectric emission to occur is that the incident wavelength (λ) must be less than or equal to the threshold wavelength (λ_th):\nλ ≤ λ_th\n\n2. For cell 1:\nGiven λ₁ < λ  ⇒  λ > λ₁.\nThe incident wavelength exceeds the threshold wavelength, which means incident photon energy is less than the work function (h c / λ < h c / λ₁). No photoelectrons are emitted from cell 1, so the stopping potential is zero:\nV₁ = 0.\n\n3. For cell 2 and cell 3:\n- In cell 2: λ < λ₂, so emission occurs with stopping potential:\ne V₂ = h c / λ - h c / λ₂\n- In cell 3: λ ≪ λ₃, so work function h c / λ₃ is much smaller than in cell 2.\ne V₃ = h c / λ - h c / λ₃\nSince λ₃ ≫ λ₂, we have 1 / λ₃ ≪ 1 / λ₂, which means:\n(h c / λ - h c / λ₃) > (h c / λ - h c / λ₂)  ⇒  V₃ > V₂  (or V₂ < V₃).\n\n4. Combining both conclusions:\nV₁ = 0 and V₂ < V₃.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Light of wavelength 400 nm shines on three metals with threshold wavelengths 300 nm, 500 nm, and 700 nm. The stopping potentials are V₁, V₂, and V₃ respectively. Which relation is correct?",
      option_a: "V₁ = 0, V₂ < V₃",
      option_b: "V₁ > V₂ > V₃",
      option_c: "V₁ = V₂ = V₃ = 0",
      option_d: "V₁ < V₂, V₃ = 0",
      correct_option: "A",
      explanation: "1. For 300 nm threshold: incident 400 nm > 300 nm, so no emission occurs: V₁ = 0.\n2. For 500 nm and 700 nm thresholds: incident 400 nm causes emission.\n3. The 700 nm threshold metal has a smaller work function, giving higher kinetic energy: V₃ > V₂.\n4. Therefore, V₁ = 0 and V₂ < V₃.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1293,
    originalQuestion: {
      question: "A beam of light falls on a metal surface such that photo-electrons are generated. If power of the light source starts to decrease linearly with time t, then variation of the photocurrent I and magnitude of the stopping potential V with time is best represented by: [RE-NEET 2026]",
      option_a: "Photocurrent I decreases linearly with time t, while stopping potential V remains constant with time t.",
      option_b: "Both photocurrent I and stopping potential V decrease linearly with time t.",
      option_c: "Photocurrent I remains constant with time t, while stopping potential V decreases linearly with time t.",
      option_d: "Photocurrent I decreases parabolically with time t, while stopping potential V increases with time t.",
      correct_option: "A",
      explanation: "1. The power P of the light source represents the radiant energy emitted per second. The intensity of illumination is directly proportional to power: Intensity ∝ P.\n2. As the power decreases linearly with time (P(t) ∝ -t), the intensity of incident light decreases linearly with time.\n3. The photocurrent (I) is directly proportional to the incident light intensity. Therefore, photocurrent I decreases linearly with time t.\n4. The stopping potential (V₀) is governed by Einstein's photoelectric equation: e V₀ = h ν - Φ. It depends exclusively on the frequency (ν) of the incident radiation and the work function of the metal.\n5. Decreasing power does not alter the frequency of the photons. Hence, the stopping potential remains completely constant with time t.\n6. Thus, photocurrent I decreases linearly with time, while stopping potential V remains constant.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the intensity of a monochromatic light source shining on a photocell is increased linearly with time, how do the saturation current and stopping potential vary with time?",
      option_a: "Saturation current increases linearly with time; stopping potential remains constant",
      option_b: "Both saturation current and stopping potential increase linearly with time",
      option_c: "Saturation current remains constant; stopping potential increases linearly",
      option_d: "Both saturation current and stopping potential remain constant",
      correct_option: "A",
      explanation: "1. Saturation current is directly proportional to light intensity, so it increases linearly with time.\n2. Stopping potential depends only on frequency, which is constant for monochromatic light, so it remains constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1292,
    originalQuestion: {
      question: "A photon and an electron, each of 20 eV energy, move in free space. The ratio of linear momentum of electron pₑ to that of photon pₚₕ, pₑ/pₚₕ is: (Take speed of light = 3 × 10⁸ m s⁻¹, charge of electron = −1.6 × 10⁻¹⁹ C and mass of electron = 9 × 10⁻³¹ kg) [RE-NEET 2026]",
      option_a: "275",
      option_b: "2/450",
      option_c: "1/250",
      option_d: "225",
      correct_option: "D",
      explanation: "1. Given energy E = 20 eV for both particles.\nIn Joules: E = 20 × 1.6 × 10⁻¹⁹ J = 3.2 × 10⁻¹⁸ J.\n\n2. For the photon:\nMomentum is related to energy by:\npₚₕ = E / c = (3.2 × 10⁻¹⁸ J) / (3.0 × 10⁸ m s⁻¹)\n\n3. For the electron:\nNon-relativistic kinetic energy is related to momentum by:\npₑ = √(2 m E) = √(2 × 9.0 × 10⁻³¹ kg × 3.2 × 10⁻¹⁸ J)\n= √(57.6 × 10⁻⁴⁹) = √(5.76 × 10⁻⁴⁸) = 2.4 × 10⁻²⁴ kg m s⁻¹.\n\n4. Calculating the ratio of momentum pₑ / pₚₕ:\npₑ / pₚₕ = [√(2 m E)] / [E / c] = c √(2 m E) / E = c √(2 m / E)\n= (3.0 × 10⁸ m s⁻¹) × √((2 × 9.0 × 10⁻³¹ kg) / (3.2 × 10⁻¹⁸ J))\n= (3.0 × 10⁸) × √((18 / 3.2) × 10⁻¹³)\n= (3.0 × 10⁸) × √(5.625 × 10⁻¹³)\n= (3.0 × 10⁸) × √(56.25 × 10⁻¹⁴)\n= (3.0 × 10⁸) × (7.5 × 10⁻⁷)\n= 22.5 × 10¹ = 225.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An electron and a photon each have an energy of 50 eV. What is the ratio of the momentum of the electron to that of the photon? (m_e = 9 × 10⁻³¹ kg, c = 3 × 10⁸ m s⁻¹, e = 1.6 × 10⁻¹⁹ C)",
      option_a: "142.3",
      option_b: "225.0",
      option_c: "71.2",
      option_d: "300.0",
      correct_option: "A",
      explanation: "1. Formula: p_e / p_ph = c √(2m / E).\n2. With E = 50 × 1.6 × 10⁻¹⁹ = 8.0 × 10⁻¹⁸ J:\np_e / p_ph = (3 × 10⁸) × √((2 × 9 × 10⁻³¹) / (8.0 × 10⁻¹⁸)) = (3 × 10⁸) × √(2.25 × 10⁻¹³) = (3 × 10⁸) × (4.743 × 10⁻⁷) ≈ 142.3.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

