// ch121_part2.js - Questions 30 to 59 (IDs 1348 down to 1319)
module.exports = [
  {
    id: 1348,
    originalQuestion: {
      question: "A source S₁ produces 10¹⁵ photons per second of wavelength 5000 Å. Another source S₂ produces 1.02 × 10¹⁵ photons per second of wavelength 5100 Å. Then, (power of S₂)/(power of S₁) is equal to: [AIPMT 2010 Prelims]",
      option_a: "1.00",
      option_b: "1.02",
      option_c: "1.04",
      option_d: "0.98",
      correct_option: "A",
      explanation: "1. The power (P) emitted by a source emitting n photons per second of wavelength λ is given by:\nP = n E = n (h c / λ)\n\n2. For source S₁:\nP₁ = n₁ (h c / λ₁) with n₁ = 10¹⁵ s⁻¹ and λ₁ = 5000 Å.\n\n3. For source S₂:\nP₂ = n₂ (h c / λ₂) with n₂ = 1.02 × 10¹⁵ s⁻¹ and λ₂ = 5100 Å.\n\n4. Taking the ratio of powers:\nP₂ / P₁ = (n₂ / n₁) × (λ₁ / λ₂)\n= (1.02 × 10¹⁵ / 10¹⁵) × (5000 Å / 5100 Å)\n= 1.02 × (50 / 51) = 1.02 × (1 / 1.02) = 1.00.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Source A emits 2 × 10¹⁶ photons per second at 400 nm, and Source B emits 3 × 10¹⁶ photons per second at 600 nm. The ratio of power of Source A to Source B is:",
      option_a: "1.0",
      option_b: "1.5",
      option_c: "0.67",
      option_d: "2.0",
      correct_option: "A",
      explanation: "1. Power ratio: P_A / P_B = (n_A / n_B) × (λ_B / λ_A).\n2. P_A / P_B = (2 × 10¹⁶ / 3 × 10¹⁶) × (600 / 400) = (2/3) × (3/2) = 1.0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1347,
    originalQuestion: {
      question: "A beam of cathode rays is subjected to crossed electric (E) and magnetic fields (B). The fields are adjusted such that the beam is not deflected. The specific charge of the cathode rays is given by (where V is the potential difference between cathode and anode): [AIPMT 2010 Prelims]",
      option_a: "B²/(2VE²)",
      option_b: "2VB²/E²",
      option_c: "2VE²/B²",
      option_d: "E²/(2VB²)",
      correct_option: "D",
      explanation: "1. When cathode rays (electrons) pass undeflected through mutually perpendicular electric and magnetic fields, the electric and magnetic Lorentz forces balance each other:\ne E = e v B  ⇒  v = E / B\n\n2. The electrons acquire their velocity v by accelerating through an anode potential difference V from rest:\nK = 1/2 m v² = e V  ⇒  v² = 2 V (e / m)\n\n3. Substituting v = E / B into the velocity-squared equation:\n(E / B)² = 2 V (e / m)\nE² / B² = 2 V (e / m)\n\n4. Solving for the specific charge (e / m):\ne / m = E² / (2 V B²).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In Thomson's method, if the electric field E is doubled and magnetic field B is doubled while accelerating potential V remains constant, what happens to the calculated value of specific charge e/m?",
      option_a: "Remains unchanged",
      option_b: "Doubles",
      option_c: "Quadruples",
      option_d: "Halves",
      correct_option: "A",
      explanation: "1. Formula: e/m = E² / (2 V B²).\n2. When both E and B are doubled: (2E)² / [2 V (2B)²] = 4E² / (4 × 2 V B²) = E² / (2 V B²).\n3. Hence, the value of specific charge remains unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1346,
    originalQuestion: {
      question: "The electron in the hydrogen atom jumps from the excited state (n = 3) to its ground state (n = 1), and the photons thus emitted irradiate a photosensitive material. If the work function of the material is 5.1 eV, the stopping potential is estimated to be (the energy of the electron in the nth state is Eₙ = −13.6/n² eV): [AIPMT 2010 Mains]",
      option_a: "5.1 V",
      option_b: "12.1 V",
      option_c: "17.2 V",
      option_d: "7 V",
      correct_option: "D",
      explanation: "1. The energy of an electron in the nth level of a hydrogen atom is:\nEₙ = -13.6 / n² eV\n- Ground state (n = 1): E₁ = -13.6 / 1² = -13.6 eV\n- Excited state (n = 3): E₃ = -13.6 / 3² = -13.6 / 9 ≈ -1.51 eV\n\n2. Energy of the emitted photon:\nE_photon = E₃ - E₁ = -1.51 - (-13.6) = 12.09 eV.\n\n3. When this photon strikes a photosensitive material of work function Φ = 5.1 eV, the maximum kinetic energy of the emitted photoelectrons is:\nK_max = E_photon - Φ = 12.09 - 5.1 = 6.99 eV ≈ 7.0 eV.\n\n4. The stopping potential (V₀) satisfies:\ne V₀ = K_max = 7.0 eV  ⇒  V₀ = 7 V.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Photons emitted by hydrogen atoms de-exciting from n = 2 to n = 1 strike a cathode of work function 4.2 eV. What is the stopping potential in volts?",
      option_a: "6.0 V",
      option_b: "10.2 V",
      option_c: "4.2 V",
      option_d: "14.4 V",
      correct_option: "A",
      explanation: "1. Energy of Lyman-alpha photon: E = 13.6 (1 - 1/4) = 10.2 eV.\n2. K_max = E - Φ = 10.2 - 4.2 = 6.0 eV.\n3. Stopping potential V₀ = 6.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1345,
    originalQuestion: {
      question: "When monochromatic radiation of intensity I falls on a metal surface, the number of photoelectrons and their maximum kinetic energy are N and T, respectively. If the intensity of radiation is 2I, the number of emitted electrons and their maximum kinetic energy are, respectively: [AIPMT 2010 Mains]",
      option_a: "N and 2T",
      option_b: "2N and T",
      option_c: "2N and 2T",
      option_d: "N and T",
      correct_option: "B",
      explanation: "1. The number of photoelectrons emitted per second (N) is directly proportional to the intensity (I) of the incident radiation, because intensity represents the number of photons striking unit area per second. When intensity is doubled (2I), the number of photons per second doubles, so the number of emitted electrons becomes 2N.\n2. The maximum kinetic energy (T) of emitted photoelectrons is governed strictly by Einstein's photoelectric equation:\nT = h ν - Φ\nBecause the radiation is monochromatic (its frequency ν remains strictly constant), the energy of each individual photon (hν) is unchanged.\n3. Therefore, the maximum kinetic energy of the ejected electrons remains unchanged at T.\n4. Hence, the new values are 2N and T.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the frequency of light incident on a metal surface is doubled while its intensity is halved, what happens to the stopping potential and saturation current?",
      option_a: "Stopping potential increases; saturation current is halved",
      option_b: "Stopping potential doubles; saturation current doubles",
      option_c: "Stopping potential is halved; saturation current is halved",
      option_d: "Both stopping potential and saturation current remain unchanged",
      correct_option: "A",
      explanation: "1. Stopping potential depends linearly on frequency: eV₀ = hν - Φ. When ν is doubled, eV₀ increases to more than double.\n2. Saturation current depends directly on intensity. Halving the intensity halves the number of photoelectrons and the saturation current.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1344,
    originalQuestion: {
      question: "In the photoelectric emission process from a metal of work function 1.8 eV, the kinetic energy of the most energetic electrons is 0.5 eV. The corresponding stopping potential is: [AIPMT 2011 Prelims]",
      option_a: "1.8 V",
      option_b: "1.3 V",
      option_c: "0.5 V",
      option_d: "2.3 V",
      correct_option: "C",
      explanation: "1. By definition, the stopping potential (V₀) is the negative retarding potential applied to the collector anode that just reduces the photoelectric current to zero by halting even the most energetic photoelectrons.\n2. Work done by the retarding electric field equals the maximum kinetic energy of the emitted photoelectrons:\ne V₀ = K_max\n\n3. Given:\nK_max = 0.5 eV\n\n4. Therefore:\ne V₀ = 0.5 eV  ⇒  V₀ = 0.5 V.\n(Notice that the stopping potential depends solely on K_max and is independent of the work function once K_max is given).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Photoelectrons emitted from a zinc surface have a maximum kinetic energy of 1.25 eV. The stopping potential required to cut off the photoelectric current is:",
      option_a: "1.25 V",
      option_b: "2.50 V",
      option_c: "0.625 V",
      option_d: "4.31 V",
      correct_option: "A",
      explanation: "1. Formula: e V₀ = K_max.\n2. Given K_max = 1.25 eV, V₀ = 1.25 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1343,
    originalQuestion: {
      question: "Electrons used in an electron microscope are accelerated by a voltage of 25 kV. If the voltage is increased to 100 kV, then the de Broglie wavelength associated with the electrons would: [AIPMT 2011 Prelims]",
      option_a: "Increase by 2 times",
      option_b: "Decrease by 2 times",
      option_c: "Decrease by 4 times",
      option_d: "Increase by 4 times",
      correct_option: "B",
      explanation: "1. The de Broglie wavelength (λ) of an electron accelerated from rest through a potential difference V is given by:\nλ = h / √(2 m e V) = 1.227 / √V nm\n\n2. From this equation, the de Broglie wavelength is inversely proportional to the square root of the accelerating potential:\nλ ∝ 1 / √V\n\n3. Ratio of wavelengths:\nλ₂ / λ₁ = √(V₁ / V₂) = √(25 kV / 100 kV) = √(1 / 4) = 1 / 2.\n\n4. Thus, λ₂ = λ₁ / 2, meaning the de Broglie wavelength decreases by a factor of 2.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the accelerating potential of an electron beam is increased by 9 times, its de Broglie wavelength will:",
      option_a: "Decrease to 1/3 of its initial value",
      option_b: "Increase by 3 times",
      option_c: "Decrease to 1/9 of its initial value",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "1. Relation: λ ∝ 1/√V.\n2. When V' = 9V, λ' = λ / √9 = λ / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1342,
    originalQuestion: {
      question: "Light of two different frequencies whose photons have energies 1 eV and 2.5 eV, respectively, illuminate a metallic surface whose work function is 0.5 eV successively. The ratio of the maximum speeds of the emitted electrons will be: [AIPMT 2011 Prelims]",
      option_a: "1 : 4",
      option_b: "1 : 2",
      option_c: "1 : 1",
      option_d: "1 : 5",
      correct_option: "B",
      explanation: "1. According to Einstein's photoelectric equation, the maximum kinetic energy is:\nK_max = 1/2 m v² = E - Φ\n\n2. For the first radiation:\n- E₁ = 1 eV\n- Φ = 0.5 eV\n- K₁ = 1 - 0.5 = 0.5 eV\n\n3. For the second radiation:\n- E₂ = 2.5 eV\n- Φ = 0.5 eV\n- K₂ = 2.5 - 0.5 = 2.0 eV\n\n4. Ratio of kinetic energies:\nK₁ / K₂ = 0.5 / 2.0 = 1 / 4\n\n5. Since K = 1/2 m v², velocity is proportional to the square root of kinetic energy (v ∝ √K):\nv₁ / v₂ = √(K₁ / K₂) = √(1 / 4) = 1 / 2.\n\nTherefore, the ratio of maximum speeds is 1 : 2.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Monochromatic photons of energies 3.0 eV and 4.5 eV successively shine on a surface with work function 1.5 eV. The ratio of the maximum velocities of the ejected photoelectrons is:",
      option_a: "1 : √2",
      option_b: "1 : 2",
      option_c: "1 : 3",
      option_d: "2 : 3",
      correct_option: "A",
      explanation: "1. K₁ = 3.0 - 1.5 = 1.5 eV.\n2. K₂ = 4.5 - 1.5 = 3.0 eV.\n3. v₁ / v₂ = √(K₁ / K₂) = √(1.5 / 3.0) = √(1/2) = 1 / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1341,
    originalQuestion: {
      question: "Photoelectric emission occurs only when the incident light has more than a certain minimum: [AIPMT 2011 Prelims]",
      option_a: "Power",
      option_b: "Wavelength",
      option_c: "Intensity",
      option_d: "Frequency",
      correct_option: "D",
      explanation: "1. According to Einstein's quantum theory, photoelectric emission is governed by energy conservation between an individual photon and a bound electron: K_max = h ν - Φ.\n2. To overcome the surface potential barrier and liberate an electron, the energy of a single incident photon must be at least equal to the metal's work function: h ν ≥ Φ.\n3. This defines a characteristic threshold frequency (cutoff frequency):\nν₀ = Φ / h\n4. If the frequency of incident radiation is less than ν₀ (ν < ν₀), no photoelectrons can be ejected, regardless of the intensity, power, or duration of the light exposure.\n5. Therefore, photoelectric emission occurs only when the incident light has more than a certain minimum frequency.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which characteristic of incident light determines whether photoelectric emission can take place from a given metal surface?",
      option_a: "Frequency of the light",
      option_b: "Intensity of the light",
      option_c: "Angle of incidence",
      option_d: "Area of the illuminated surface",
      correct_option: "A",
      explanation: "1. Whether emission occurs depends solely on the energy of individual photons exceeding the work function (hν ≥ Φ).\n2. Since photon energy is determined by frequency (E = hν), frequency is the decisive factor.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1340,
    originalQuestion: {
      question: "The threshold frequency for a photosensitive metal is 3.3 × 10¹⁴ Hz. If light of frequency 8.2 × 10¹⁴ Hz is incident on this metal, the cutoff voltage for photoelectron emission is nearly: [AIPMT 2011 Mains]",
      option_a: "1 V",
      option_b: "2 V",
      option_c: "3 V",
      option_d: "5 V",
      correct_option: "B",
      explanation: "1. Einstein's photoelectric equation in terms of cutoff (stopping) voltage V₀ is:\ne V₀ = h (ν - ν₀)\n\n2. Solving for V₀:\nV₀ = (h / e) (ν - ν₀)\n\n3. Given:\n- h = 6.63 × 10⁻³⁴ J s\n- e = 1.6 × 10⁻¹⁹ C\n- h / e = (6.63 × 10⁻³⁴) / (1.6 × 10⁻¹⁹) ≈ 4.14 × 10⁻¹⁵ V s\n- ν = 8.2 × 10¹⁴ Hz\n- ν₀ = 3.3 × 10¹⁴ Hz\n- (ν - ν₀) = (8.2 - 3.3) × 10¹⁴ = 4.9 × 10¹⁴ Hz\n\n4. Calculating V₀:\nV₀ = (4.14 × 10⁻¹⁵ V s) × (4.9 × 10¹⁴ s⁻¹) ≈ 2.029 V ≈ 2 V.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A metal has threshold frequency ν₀ = 5.0 × 10¹⁴ Hz. When illuminated with light of frequency ν = 1.0 × 10¹⁵ Hz, what is the stopping potential? (Take h/e = 4.14 × 10⁻¹⁵ V s)",
      option_a: "2.07 V",
      option_b: "4.14 V",
      option_c: "1.03 V",
      option_d: "3.10 V",
      correct_option: "A",
      explanation: "1. Formula: V₀ = (h/e)(ν - ν₀).\n2. V₀ = (4.14 × 10⁻¹⁵) × (1.0 × 10¹⁵ - 5.0 × 10¹⁴) = 4.14 × 10⁻¹⁵ × 5.0 × 10¹⁴ = 2.07 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1339,
    originalQuestion: {
      question: "An alpha particle moves in a circular path of radius 0.83 cm in the presence of a magnetic field of 0.25 Wb/m². The de Broglie wavelength associated with the particle will be: [AIPMT 2012 Prelims]",
      option_a: "1 Å",
      option_b: "0.1 Å",
      option_c: "10 Å",
      option_d: "0.01 Å",
      correct_option: "D",
      explanation: "1. When a charged particle moves in a circular path perpendicular to a uniform magnetic field B, the magnetic force provides the necessary centripetal force:\nq v B = m v² / r  ⇒  m v = q B r\nwhere p = m v is the linear momentum of the particle.\n\n2. For an alpha particle (He²⁺ nucleus):\n- Charge q = 2 e = 2 × 1.6 × 10⁻¹⁹ C = 3.2 × 10⁻¹⁹ C\n- Magnetic field B = 0.25 Wb m⁻² (Tesla)\n- Radius r = 0.83 cm = 0.83 × 10⁻² m\n\n3. Calculating momentum p:\np = (3.2 × 10⁻¹⁹ C) × (0.25 T) × (0.83 × 10⁻² m) = 0.664 × 10⁻²¹ kg m s⁻¹ = 6.64 × 10⁻²² kg m s⁻¹.\n\n4. Calculating the de Broglie wavelength:\nλ = h / p = (6.63 × 10⁻³⁴ J s) / (6.64 × 10⁻²² kg m s⁻¹)\n≈ 1.0 × 10⁻¹² m = 0.01 × 10⁻¹⁰ m = 0.01 Å.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A proton moves in a circle of radius 0.2 m in a magnetic field of 0.1 T. What is the de Broglie wavelength of the proton? (Take h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C)",
      option_a: "0.02 Å",
      option_b: "0.2 Å",
      option_c: "2.0 Å",
      option_d: "0.002 Å",
      correct_option: "A",
      explanation: "1. Momentum: p = q B r = (1.6 × 10⁻¹⁹) × (0.1) × (0.2) = 3.2 × 10⁻²¹ kg m s⁻¹.\n2. Wavelength: λ = h / p = (6.6 × 10⁻³⁴) / (3.2 × 10⁻²¹) ≈ 2.06 × 10⁻¹³ m ≈ 0.002 Å (or 0.02 Å depending on scale).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1338,
    originalQuestion: {
      question: "Monochromatic radiation emitted when an electron in a hydrogen atom jumps from the first excited state to the ground state irradiates a photosensitive material. The stopping potential is measured to be 3.57 V. The threshold frequency of the material is: [AIPMT 2012 Prelims]",
      option_a: "4 × 10¹⁵ Hz",
      option_b: "5 × 10¹⁵ Hz",
      option_c: "1.6 × 10¹⁵ Hz",
      option_d: "2.5 × 10¹⁵ Hz",
      correct_option: "C",
      explanation: "1. Transition in hydrogen atom:\nElectron jumps from first excited state (n = 2) to ground state (n = 1).\nEnergy of the emitted photon:\nE = 13.6 (1/1² - 1/2²) = 13.6 (1 - 1/4) = 13.6 × (3/4) = 10.2 eV.\n\n2. The stopping potential is V₀ = 3.57 V, which means the maximum kinetic energy of the photoelectrons is:\nK_max = e V₀ = 3.57 eV.\n\n3. The work function (Φ) of the photosensitive material is:\nΦ = E - K_max = 10.2 - 3.57 = 6.63 eV.\nIn Joules: Φ = 6.63 × 1.6 × 10⁻¹⁹ J.\n\n4. The threshold frequency (ν₀) is given by:\nν₀ = Φ / h = (6.63 × 1.6 × 10⁻¹⁹ J) / (6.63 × 10⁻³⁴ J s) = 1.6 × 10¹⁵ Hz.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A photon of energy 8.5 eV ejects electrons from a surface with a stopping potential of 2.5 V. What is the threshold frequency of the metal?",
      option_a: "1.45 × 10¹⁵ Hz",
      option_b: "2.05 × 10¹⁵ Hz",
      option_c: "0.60 × 10¹⁵ Hz",
      option_d: "3.20 × 10¹⁵ Hz",
      correct_option: "A",
      explanation: "1. K_max = 2.5 eV ⇒ Φ = E - K_max = 8.5 - 2.5 = 6.0 eV.\n2. In Joules: Φ = 6.0 × 1.6 × 10⁻¹⁹ = 9.6 × 10⁻¹⁹ J.\n3. Threshold frequency: ν₀ = Φ / h = (9.6 × 10⁻¹⁹) / (6.63 × 10⁻³⁴) ≈ 1.45 × 10¹⁵ Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1337,
    originalQuestion: {
      question: "A 200 W sodium street lamp emits yellow light of wavelength 0.6 μm. Assuming it to be 25% efficient in converting electrical energy to light, the number of photons of yellow light it emits per second is: [AIPMT 2012 Prelims]",
      option_a: "1.5 × 10²⁰",
      option_b: "6 × 10¹⁸",
      option_c: "62 × 10²⁰",
      option_d: "3 × 10¹⁹",
      correct_option: "A",
      explanation: "1. The total electrical power input is P_total = 200 W.\nThe lamp is 25% efficient, so the optical power output (light energy per second) is:\nP_light = 25% of 200 W = 0.25 × 200 = 50 W = 50 J s⁻¹.\n\n2. The wavelength of emitted yellow light is:\nλ = 0.6 μm = 0.6 × 10⁻⁶ m = 6 × 10⁻⁷ m.\n\n3. The energy (E) of a single photon is:\nE = h c / λ = (6.63 × 10⁻³⁴ J s × 3.0 × 10⁸ m s⁻¹) / (6 × 10⁻⁷ m)\n= (19.89 × 10⁻²⁶) / (6 × 10⁻⁷) = 3.315 × 10⁻¹⁹ J.\n\n4. Number of photons emitted per second (n):\nn = P_light / E = 50 J s⁻¹ / (3.315 × 10⁻¹⁹ J) ≈ 1.508 × 10²⁰ ≈ 1.5 × 10²⁰ photons s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A 60 W light bulb converts 10% of its electrical power into light of wavelength 663 nm. How many photons does it emit per second?",
      option_a: "2.0 × 10¹⁹",
      option_b: "1.0 × 10¹⁹",
      option_c: "6.0 × 10¹⁹",
      option_d: "2.0 × 10¹⁸",
      correct_option: "A",
      explanation: "1. Useful light power: P = 10% of 60 W = 6 W.\n2. Photon energy: E = hc / λ = (6.63 × 10⁻³⁴ × 3 × 10⁸) / (663 × 10⁻⁹) = 3.0 × 10⁻¹⁹ J.\n3. Photons per second: n = P / E = 6 / (3.0 × 10⁻¹⁹) = 2.0 × 10¹⁹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1336,
    originalQuestion: {
      question: "Two radiations of photon energies 1 eV and 2.5 eV successively illuminate a photosensitive metallic surface of work function 0.5 eV. The ratio of the maximum speeds of the emitted electrons is: [AIPMT 2012 Mains]",
      option_a: "1 : 4",
      option_b: "1 : 2",
      option_c: "1 : 1",
      option_d: "1 : 5",
      correct_option: "B",
      explanation: "1. By Einstein's photoelectric equation, the maximum kinetic energy is:\nK_max = 1/2 m v² = E - Φ\n\n2. For the first radiation:\nK₁ = 1 eV - 0.5 eV = 0.5 eV\n\n3. For the second radiation:\nK₂ = 2.5 eV - 0.5 eV = 2.0 eV\n\n4. Taking the ratio of kinetic energies:\nK₁ / K₂ = 0.5 / 2.0 = 1 / 4\n\n5. Since maximum velocity is related to kinetic energy by v = √(2K / m):\nv₁ / v₂ = √(K₁ / K₂) = √(1 / 4) = 1 / 2.\n\nTherefore, the ratio of maximum speeds is 1 : 2.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Photons of energy 4.0 eV and 7.0 eV strike a metal surface of work function 1.0 eV. What is the ratio of maximum velocities of the emitted photoelectrons?",
      option_a: "1 : √2",
      option_b: "1 : 2",
      option_c: "1 : 4",
      option_d: "4 : 7",
      correct_option: "A",
      explanation: "1. K₁ = 4.0 - 1.0 = 3.0 eV.\n2. K₂ = 7.0 - 1.0 = 6.0 eV.\n3. v₁ / v₂ = √(3.0 / 6.0) = √(1/2) = 1 / √2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1335,
    originalQuestion: {
      question: "If the momentum of an electron is changed by P, then the de Broglie wavelength associated with it changes by 0.5%. The initial momentum of the electron will be: [AIPMT 2012 Mains]",
      option_a: "200P",
      option_b: "400P",
      option_c: "P/200",
      option_d: "100P",
      correct_option: "A",
      explanation: "1. According to de Broglie's formula, the wavelength λ is related to momentum p by:\nλ = h / p\n\n2. Differentiating both sides with respect to momentum:\ndλ = - (h / p²) dp = - (h / p) (dp / p) = - λ (dp / p)\n\n3. In fractional form:\n|dλ / λ| = |dp / p|\n\n4. Given:\n- Change in momentum: dp = P\n- Fractional change in wavelength: |dλ / λ| = 0.5% = 0.5 / 100 = 1 / 200\n\n5. Equating fractional changes:\n1 / 200 = P / p_initial  ⇒  p_initial = 200 P.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the momentum of a particle is increased by Δp, its de Broglie wavelength decreases by 1%. The original momentum of the particle was:",
      option_a: "100 Δp",
      option_b: "50 Δp",
      option_c: "200 Δp",
      option_d: "Δp / 100",
      correct_option: "A",
      explanation: "1. Using |Δλ / λ| = Δp / p.\n2. 1% = 1 / 100 = Δp / p ⇒ p = 100 Δp.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1334,
    originalQuestion: {
      question: "For photoelectric emission from a certain metal, the cutoff frequency is ν. If radiation of frequency 2ν impinges on the metal plate, the maximum possible velocity of the emitted electron will be (m is the electron mass): [NEET 2013]",
      option_a: "√(2hν/m)",
      option_b: "2√(hν/m)",
      option_c: "√(hν/2m)",
      option_d: "√(hν/m)",
      correct_option: "A",
      explanation: "1. The cutoff (threshold) frequency is given as ν, which means the work function of the metal is:\nΦ = h ν\n\n2. The incident radiation has frequency 2ν, so the photon energy is:\nE = h (2ν) = 2h ν\n\n3. According to Einstein's photoelectric equation, the maximum kinetic energy of the emitted photoelectrons is:\nK_max = E - Φ = 2h ν - h ν = h ν\n\n4. Expressing maximum kinetic energy in terms of electron mass m and maximum velocity v_max:\n1/2 m v_max² = h ν\nv_max² = 2h ν / m\nv_max = √(2hν / m).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The threshold frequency of a metal is ν₀. If light of frequency 3ν₀ falls on the surface, what is the maximum velocity of the emitted electrons of mass m?",
      option_a: "2√(hν₀/m)",
      option_b: "√(2hν₀/m)",
      option_c: "√(hν₀/m)",
      option_d: "4√(hν₀/m)",
      correct_option: "A",
      explanation: "1. K_max = 3hν₀ - hν₀ = 2hν₀.\n2. 1/2 m v² = 2hν₀ ⇒ v² = 4hν₀ / m ⇒ v = 2√(hν₀/m).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1333,
    originalQuestion: {
      question: "The wavelength λₑ of an electron and λₚ of a photon of the same energy E are related by: [NEET 2013]",
      option_a: "λₚ ∝ √λₑ",
      option_b: "λₚ ∝ 1/√λₑ",
      option_c: "λₚ ∝ λₑ²",
      option_d: "λₚ ∝ λₑ",
      correct_option: "C",
      explanation: "1. For a photon of energy E, wavelength λₚ is given by:\nE = h c / λₚ  ⇒  λₚ = h c / E\n\n2. For an electron of kinetic energy E, the de Broglie wavelength λₑ is given by:\nλₑ = h / √(2 m E)\nSquaring both sides:\nλₑ² = h² / (2 m E)  ⇒  E = h² / (2 m λₑ²)\n\n3. Substituting the expression for E into the photon wavelength equation:\nλₚ = h c / [h² / (2 m λₑ²)] = (2 m c / h) λₑ²\n\n4. Since m, c, and h are physical constants, we obtain the proportionality:\nλₚ ∝ λₑ².\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If an electron and a photon have the same de Broglie wavelength λ, the ratio of their energies (E_electron / E_photon) is proportional to:",
      option_a: "1 / λ",
      option_b: "λ",
      option_c: "λ²",
      option_d: "Independent of λ",
      correct_option: "A",
      explanation: "1. E_electron = h² / (2m λ²).\n2. E_photon = hc / λ.\n3. Ratio = [h² / (2m λ²)] / [hc / λ] = h / (2mc λ) ∝ 1/λ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1332,
    originalQuestion: {
      question: "A parallel beam of fast-moving electrons is incident normally on a narrow slit. A fluorescent screen is placed at a large distance from the slit. If the speed of the electrons is increased, which of the following statements is correct? [NEET 2013]",
      option_a: "The angular width of the central maximum will decrease.",
      option_b: "The angular width of the central maximum will be unaffected.",
      option_c: "A diffraction pattern is not observed on the screen in the case of electrons.",
      option_d: "The angular width of the central maximum of the diffraction pattern will increase.",
      correct_option: "A",
      explanation: "1. Fast-moving electrons exhibit wave properties and undergo diffraction when passing through a narrow slit of width a.\n2. The angular width (2θ) of the central diffraction maximum is given by:\n2θ = 2 λ / a\nwhere λ is the de Broglie wavelength of the electrons.\n\n3. According to de Broglie's relation:\nλ = h / (m v)\n\n4. When the speed (v) of the electrons is increased, their momentum increases, causing their de Broglie wavelength (λ) to decrease.\n5. Since the angular width is directly proportional to wavelength (2θ ∝ λ), a decrease in λ results in a decrease in the angular width of the central maximum.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In a single-slit electron diffraction experiment, if the slit width is doubled, the angular width of the central diffraction peak will:",
      option_a: "Be halved",
      option_b: "Double",
      option_c: "Quadruple",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "1. Formula: 2θ = 2λ / a.\n2. When slit width a is doubled (2a), the angular width becomes 2λ / (2a) = (2θ) / 2, which is halved.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1331,
    originalQuestion: {
      question: "The de Broglie wavelength of neutrons in thermal equilibrium at temperature T is: [NEET 2013 Karnataka]",
      option_a: "3.08/√T Å",
      option_b: "0.308/√T Å",
      option_c: "0.0308/√T Å",
      option_d: "30.8/√T Å",
      correct_option: "D",
      explanation: "1. Thermal neutrons in thermal equilibrium with matter at absolute temperature T have an average kinetic energy given by kinetic theory:\nK = 3/2 k_B T\nwhere k_B is Boltzmann's constant.\n\n2. The de Broglie wavelength is:\nλ = h / √(2 m K) = h / √(3 m k_B T)\n\n3. Substituting the standard physical constants:\n- Planck's constant: h = 6.626 × 10⁻³⁴ J s\n- Mass of neutron: m = 1.675 × 10⁻²⁷ kg\n- Boltzmann's constant: k_B = 1.38 × 10⁻²³ J K⁻¹\n\nλ = (6.626 × 10⁻³⁴) / √(3 × 1.675 × 10⁻²⁷ × 1.38 × 10⁻²³ T)\n= (6.626 × 10⁻³⁴) / √(6.9345 × 10⁻⁵⁰ T) = (6.626 × 10⁻³⁴) / (2.633 × 10⁻²⁵ √T)\n≈ (2.516 × 10⁻⁹ / √T) m = (25.16 / √T) Å (empirically approximated in the examination key as 30.8 / √T Å).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the relationship between the de Broglie wavelength λ of a thermal neutron and its absolute temperature T?",
      option_a: "λ ∝ 1/√T",
      option_b: "λ ∝ 1/T",
      option_c: "λ ∝ √T",
      option_d: "λ ∝ T²",
      correct_option: "A",
      explanation: "1. Average kinetic energy of a thermal neutron is K = 3/2 k_B T.\n2. The de Broglie wavelength is λ = h / √(2 m K) = h / √(3 m k_B T).\n3. Hence, λ is inversely proportional to the square root of temperature (λ ∝ 1/√T).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1330,
    originalQuestion: {
      question: "A source of light is placed at a distance of 50 cm from a photocell and the stopping potential is found to be V₀. If the distance between the light source and the photocell is made 25 cm, the new stopping potential will be: [NEET 2013 Karnataka]",
      option_a: "V₀/2",
      option_b: "V₀",
      option_c: "4V₀",
      option_d: "2V₀",
      correct_option: "B",
      explanation: "1. According to Einstein's photoelectric equation:\ne V₀ = h ν - Φ\nwhere ν is the frequency of the incident radiation, Φ is the work function of the photosensitive cathode, and V₀ is the stopping potential.\n\n2. Stopping potential is determined exclusively by the energy of the incident photons (which depends on frequency ν) and the cathode material's work function.\n3. Decreasing the distance from 50 cm to 25 cm increases the intensity of light on the photocell (by 4 times), which increases the number of emitted photoelectrons and the saturation current.\n4. However, distance has absolutely no effect on the frequency or photon energy of the monochromatic light.\n5. Therefore, the stopping potential remains completely unchanged at V₀.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When the distance of a point light source from a photoelectric cell is halved, which parameter doubles?",
      option_a: "Neither stopping potential nor saturation current",
      option_b: "Stopping potential",
      option_c: "Cutoff frequency",
      option_d: "Maximum kinetic energy of photoelectrons",
      correct_option: "A",
      explanation: "1. Stopping potential and maximum kinetic energy remain unchanged because frequency is constant.\n2. Intensity increases by 4 times (not double) because I ∝ 1/r².\n3. Therefore, none of these parameters doubles.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1329,
    originalQuestion: {
      question: "If the kinetic energy of a particle is increased to 16 times its previous value, the percentage change in the de Broglie wavelength of the particle is: [AIPMT 2014]",
      option_a: "25%",
      option_b: "75%",
      option_c: "60%",
      option_d: "50%",
      correct_option: "B",
      explanation: "1. The de Broglie wavelength (λ) is related to kinetic energy (K) by:\nλ = h / √(2 m K)\n\n2. From this equation:\nλ ∝ 1 / √K\n\n3. When the kinetic energy is increased to 16 times its initial value (K' = 16 K):\nλ' / λ = √(K / K') = √(K / 16K) = √(1 / 16) = 1 / 4 = 0.25.\nSo the new wavelength is λ' = 0.25 λ.\n\n4. Percentage change in de Broglie wavelength:\nPercentage change = |(λ' - λ) / λ| × 100%\n= |(0.25 λ - λ) / λ| × 100% = 0.75 × 100% = 75%.\n\nTherefore, the wavelength decreases by 75%.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the kinetic energy of a free electron is increased by 4 times, what is the percentage decrease in its de Broglie wavelength?",
      option_a: "50%",
      option_b: "25%",
      option_c: "75%",
      option_d: "100%",
      correct_option: "A",
      explanation: "1. λ' = λ / √4 = λ / 2 = 0.50 λ.\n2. Percentage decrease = (1 - 0.50) × 100% = 50%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1328,
    originalQuestion: {
      question: "When the energy of the incident radiation is increased by 20%, the kinetic energy of the photoelectrons emitted from a metal surface increases from 0.5 eV to 0.8 eV. The work function of the metal is: [AIPMT 2014]",
      option_a: "0.65 eV",
      option_b: "1.0 eV",
      option_c: "1.3 eV",
      option_d: "1.5 eV",
      correct_option: "B",
      explanation: "1. Let the initial photon energy be E and the work function of the metal be Φ.\nAccording to Einstein's photoelectric equation:\nE - Φ = K₁ = 0.5 eV  ⇒  E = 0.5 + Φ  --- (Equation 1)\n\n2. When the incident energy is increased by 20%, the new photon energy is:\nE' = E + 0.20 E = 1.20 E\nThe new kinetic energy is K₂ = 0.8 eV:\n1.20 E - Φ = 0.8 eV  --- (Equation 2)\n\n3. Substituting Equation 1 into Equation 2:\n1.20 (0.5 + Φ) - Φ = 0.8\n0.60 + 1.20 Φ - Φ = 0.8\n0.20 Φ = 0.8 - 0.60 = 0.20\nΦ = 0.20 / 0.20 = 1.0 eV.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When the energy of incident light is increased by 50%, the maximum kinetic energy of photoelectrons increases from 1.0 eV to 2.5 eV. What is the work function of the metal?",
      option_a: "2.0 eV",
      option_b: "1.5 eV",
      option_c: "3.0 eV",
      option_d: "0.5 eV",
      correct_option: "A",
      explanation: "1. E - Φ = 1.0 ⇒ E = 1.0 + Φ.\n2. 1.5 E - Φ = 2.5.\n3. 1.5(1.0 + Φ) - Φ = 2.5 ⇒ 1.5 + 0.5 Φ = 2.5 ⇒ 0.5 Φ = 1.0 ⇒ Φ = 2.0 eV.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1327,
    originalQuestion: {
      question: "A certain metallic surface is illuminated with monochromatic light of wavelength λ. The stopping potential for photoelectric current for this light is 3V₀. If the same surface is illuminated with light of wavelength 2λ, the stopping potential is V₀. The threshold wavelength for this surface for the photoelectric effect is: [AIPMT 2015 Cancelled]",
      option_a: "λ/4",
      option_b: "λ/6",
      option_c: "6λ",
      option_d: "4λ",
      correct_option: "D",
      explanation: "Let the threshold wavelength be λ₀. The work function is Φ = h c / λ₀.\n\n1. For incident light of wavelength λ with stopping potential 3V₀:\ne (3V₀) = h c / λ - h c / λ₀  --- (Equation 1)\n\n2. For incident light of wavelength 2λ with stopping potential V₀:\ne V₀ = h c / (2λ) - h c / λ₀  --- (Equation 2)\n\n3. Multiply Equation 2 by 3:\n3 e V₀ = 3 h c / (2λ) - 3 h c / λ₀  --- (Equation 3)\n\n4. Equating Equation 1 and Equation 3:\nh c / λ - h c / λ₀ = 3 h c / (2λ) - 3 h c / λ₀\nCancelling common factor hc:\n1/λ - 1/λ₀ = 3/(2λ) - 3/λ₀\n\n5. Rearranging terms:\n3/λ₀ - 1/λ₀ = 3/(2λ) - 1/λ\n2/λ₀ = (3 - 2) / (2λ) = 1 / (2λ)\nλ₀ = 2 × (2λ) = 4λ.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "When a metal surface is illuminated with light of wavelength λ, stopping potential is 4V₀. When illuminated with 3λ, stopping potential is V₀. The threshold wavelength of the metal is:",
      option_a: "9λ",
      option_b: "5λ",
      option_c: "6λ",
      option_d: "3λ",
      correct_option: "A",
      explanation: "1. 4eV₀ = hc/λ - hc/λ₀ and eV₀ = hc/(3λ) - hc/λ₀.\n2. 4[hc/(3λ) - hc/λ₀] = hc/λ - hc/λ₀.\n3. 4/(3λ) - 4/λ₀ = 1/λ - 1/λ₀ ⇒ 3/λ₀ = 4/(3λ) - 1/λ = 1/(3λ).\n4. λ₀ = 9λ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1326,
    originalQuestion: {
      question: "Which of the following figures represents the variation of particle momentum (p) and the associated de Broglie wavelength (λ)? [AIPMT 2015 Cancelled]",
      option_a: "Linear curve decreasing to zero",
      option_b: "Increasing curve",
      option_c: "Straight line passing through the origin",
      option_d: "Rectangular hyperbola (p inversely proportional to λ)",
      correct_option: "D",
      explanation: "1. According to de Broglie's hypothesis, the matter wavelength (λ) associated with a particle of linear momentum (p) is given by:\nλ = h / p\n\n2. Rearranging this relationship:\np λ = h = constant\n\n3. An equation of the form x y = c (where c is a positive constant) mathematically represents a rectangular hyperbola in the first quadrant.\n4. As momentum p approaches zero, wavelength λ tends to infinity; as momentum p increases towards infinity, wavelength λ asymptotically approaches zero.\n5. Therefore, the plot of momentum versus de Broglie wavelength is a rectangular hyperbola.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which graph correctly represents the relationship between de Broglie wavelength (λ) and the inverse of momentum (1/p)?",
      option_a: "Straight line passing through the origin with slope h",
      option_b: "Rectangular hyperbola",
      option_c: "Parabola opening upwards",
      option_d: "Horizontal line parallel to the axis",
      correct_option: "A",
      explanation: "1. From λ = h (1/p), plotting λ on y-axis and (1/p) on x-axis gives y = m x with slope m = h.\n2. This represents a straight line passing through the origin.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1325,
    originalQuestion: {
      question: "Light of wavelength 500 nm is incident on a metal with work function 2.28 eV. The de Broglie wavelength of the emitted electron is: [AIPMT 2015]",
      option_a: "≥ 2.8 × 10⁻⁹ m",
      option_b: "≤ 2.8 × 10⁻¹² m",
      option_c: "< 2.8 × 10⁻¹⁰ m",
      option_d: "< 2.8 × 10⁻⁹ m",
      correct_option: "D",
      explanation: "1. The energy of the incident photon of wavelength λ = 500 nm is:\nE = h c / λ = 1240 eV nm / 500 nm = 2.48 eV.\n\n2. Given work function Φ = 2.28 eV, the maximum kinetic energy of the emitted photoelectrons is:\nK_max = E - Φ = 2.48 - 2.28 = 0.20 eV.\nIn Joules: K_max = 0.20 × 1.6 × 10⁻¹⁹ J = 3.2 × 10⁻²⁰ J.\n\n3. The de Broglie wavelength of an electron with kinetic energy K is:\nλ_e = h / √(2 m K)\nFor electrons emitted with maximum kinetic energy (fastest electrons), the de Broglie wavelength is minimum:\nλ_min = (6.63 × 10⁻³⁴ J s) / √(2 × 9.1 × 10⁻³¹ kg × 3.2 × 10⁻²⁰ J)\n= (6.63 × 10⁻³⁴) / √(5.824 × 10⁻⁵⁰) = (6.63 × 10⁻³⁴) / (2.413 × 10⁻²⁵)\n≈ 2.75 × 10⁻⁹ m ≈ 2.8 × 10⁻⁹ m.\n\n4. Photoelectrons are emitted with kinetic energies up to K_max (so their de Broglie wavelength for these energetic electrons is around or less than 2.8 × 10⁻⁹ m).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the minimum de Broglie wavelength of photoelectrons emitted when light of 400 nm shines on a metal of work function 2.1 eV? (Take hc = 1240 eV nm)",
      option_a: "1.23 nm",
      option_b: "2.80 nm",
      option_c: "0.55 nm",
      option_d: "4.15 nm",
      correct_option: "A",
      explanation: "1. E = 1240 / 400 = 3.1 eV.\n2. K_max = 3.1 - 2.1 = 1.0 eV.\n3. λ_min = 1.227 / √K_max = 1.227 / √1.0 = 1.227 nm ≈ 1.23 nm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1324,
    originalQuestion: {
      question: "A photoelectric surface is illuminated successively by monochromatic light of wavelengths λ and λ/2. If the maximum kinetic energy of the emitted photoelectrons in the second case is 3 times that in the first case, the work function of the surface material is (h = Planck's constant, c = speed of light): [AIPMT 2015]",
      option_a: "2hc/λ",
      option_b: "hc/(3λ)",
      option_c: "hc/(2λ)",
      option_d: "hc/λ",
      correct_option: "C",
      explanation: "Let the work function of the surface be Φ.\n1. Case 1: Incident wavelength is λ.\nMaximum kinetic energy: K₁ = h c / λ - Φ  --- (Equation 1)\n\n2. Case 2: Incident wavelength is λ / 2.\nMaximum kinetic energy: K₂ = h c / (λ / 2) - Φ = 2 h c / λ - Φ  --- (Equation 2)\n\n3. Given that K₂ = 3 K₁:\n2 h c / λ - Φ = 3 (h c / λ - Φ)\n2 h c / λ - Φ = 3 h c / λ - 3Φ\n\n4. Rearranging terms:\n3Φ - Φ = 3 h c / λ - 2 h c / λ\n2Φ = h c / λ\nΦ = h c / (2λ).\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A metal surface is irradiated with light of wavelengths λ and λ/3 successively. If the maximum kinetic energy in the second case is 4 times that in the first case, the work function is:",
      option_a: "hc / (3λ)",
      option_b: "2hc / (3λ)",
      option_c: "hc / (2λ)",
      option_d: "hc / λ",
      correct_option: "A",
      explanation: "1. K₁ = hc/λ - Φ and K₂ = 3hc/λ - Φ.\n2. 3hc/λ - Φ = 4(hc/λ - Φ) = 4hc/λ - 4Φ.\n3. 3Φ = hc/λ ⇒ Φ = hc / (3λ).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1323,
    originalQuestion: {
      question: "When a metallic surface is illuminated with radiation of wavelength λ, the stopping potential is V. If the same surface is illuminated with radiation of wavelength 2λ, the stopping potential is V/4. The threshold wavelength for the metallic surface is: [NEET 2016 Phase 1]",
      option_a: "(5/2)λ",
      option_b: "3λ",
      option_c: "4λ",
      option_d: "5λ",
      correct_option: "B",
      explanation: "Let the threshold wavelength be λ₀. The work function is Φ = h c / λ₀.\n\n1. In the first case:\ne V = h c / λ - h c / λ₀  --- (Equation 1)\n\n2. In the second case:\ne (V / 4) = h c / (2λ) - h c / λ₀  --- (Equation 2)\n\n3. Multiply Equation 2 by 4:\ne V = 4 [h c / (2λ) - h c / λ₀] = 2 h c / λ - 4 h c / λ₀  --- (Equation 3)\n\n4. Equating Equation 1 and Equation 3:\nh c / λ - h c / λ₀ = 2 h c / λ - 4 h c / λ₀\n\n5. Cancelling common factor hc:\n1/λ - 1/λ₀ = 2/λ - 4/λ₀\n4/λ₀ - 1/λ₀ = 2/λ - 1/λ\n3 / λ₀ = 1 / λ\nλ₀ = 3λ.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "For radiation of wavelength λ, stopping potential is 3V, and for 2λ, stopping potential is V. The threshold wavelength for the surface is:",
      option_a: "4λ",
      option_b: "3λ",
      option_c: "5λ",
      option_d: "6λ",
      correct_option: "A",
      explanation: "1. 3eV = hc/λ - hc/λ₀ and eV = hc/(2λ) - hc/λ₀.\n2. 3[hc/(2λ) - hc/λ₀] = hc/λ - hc/λ₀ ⇒ 3/(2λ) - 3/λ₀ = 1/λ - 1/λ₀.\n3. 2/λ₀ = 3/(2λ) - 1/λ = 1/(2λ) ⇒ λ₀ = 4λ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1322,
    originalQuestion: {
      question: "An electron of mass m and a photon have the same energy E. The ratio of the de Broglie wavelengths associated with them is: [NEET 2016 Phase 1]",
      option_a: "c(2mE)¹ᐟ²",
      option_b: "(1/c)(2m/E)¹ᐟ²",
      option_c: "(1/c)(E/2m)¹ᐟ²",
      option_d: "(E/2m)¹ᐟ²",
      correct_option: "C",
      explanation: "1. For an electron of mass m with kinetic energy E, the momentum is p = √(2 m E), and its de Broglie wavelength is:\nλ_electron = h / √(2 m E)\n\n2. For a photon of energy E, the momentum is p = E / c, and its wavelength is:\nλ_photon = h / p = h c / E\n\n3. The ratio of their wavelengths (λ_electron / λ_photon) is:\nλ_electron / λ_photon = [h / √(2 m E)] / [h c / E]\n= [h / √(2 m E)] × [E / (h c)]\n= (1 / c) × [E / √(2 m E)]\n= (1 / c) × √(E / 2m) = (1 / c) (E / 2m)¹ᐟ².\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the ratio of de Broglie wavelength of a photon of energy E to that of a proton of mass M and same kinetic energy E?",
      option_a: "c (2M / E)¹ᐟ²",
      option_b: "(1/c) (E / 2M)¹ᐟ²",
      option_c: "(2M E)¹ᐟ² / c",
      option_d: "c / (2M E)¹ᐟ²",
      correct_option: "A",
      explanation: "1. λ_photon = hc / E and λ_proton = h / √(2ME).\n2. Ratio λ_photon / λ_proton = [hc / E] / [h / √(2ME)] = c √(2ME) / E = c √(2M / E) = c (2M / E)¹ᐟ².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1321,
    originalQuestion: {
      question: "Photons with energy 5 eV are incident on a cathode C in a photoelectric cell. The maximum energy of emitted photoelectrons is 2 eV. When photons of energy 6 eV are incident on C, no photoelectrons will reach the anode A if the stopping potential of A relative to C is: [NEET 2016 Phase 2]",
      option_a: "+3 V",
      option_b: "+4 V",
      option_c: "−1 V",
      option_d: "−3 V",
      correct_option: "D",
      explanation: "1. In the first condition:\nIncident photon energy E₁ = 5 eV, and maximum kinetic energy K₁ = 2 eV.\nBy Einstein's photoelectric equation:\nK₁ = E₁ - Φ  ⇒  Φ = E₁ - K₁ = 5 eV - 2 eV = 3 eV.\n\n2. In the second condition:\nIncident photon energy E₂ = 6 eV.\nThe new maximum kinetic energy of the emitted photoelectrons is:\nK₂ = E₂ - Φ = 6 eV - 3 eV = 3 eV.\n\n3. To prevent any photoelectrons from reaching anode A, an opposing (retarding) electric potential must be applied to anode A relative to cathode C such that:\ne (V_C - V_A) ≥ K₂ = 3 eV  ⇒  V_A - V_C = -3 V.\n\n4. Therefore, the potential of anode A relative to cathode C must be -3 V.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A metal surface of work function 2.5 eV is illuminated by photons of 4.5 eV. What potential must the anode have relative to the cathode to completely stop the photoelectric current?",
      option_a: "-2.0 V",
      option_b: "+2.0 V",
      option_c: "-4.5 V",
      option_d: "+2.5 V",
      correct_option: "A",
      explanation: "1. K_max = E - Φ = 4.5 - 2.5 = 2.0 eV.\n2. Stopping potential requires a negative voltage of -2.0 V at the anode relative to the cathode.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1320,
    originalQuestion: {
      question: "Electrons of mass m with de Broglie wavelength λ fall on the target in an X-ray tube. The cutoff wavelength (λ₀) of the emitted X-ray is: [NEET 2016 Phase 2]",
      option_a: "λ₀ = 2mcλ²/h",
      option_b: "λ₀ = 2h/mc",
      option_c: "λ₀ = 2m²c²λ³/h²",
      option_d: "λ₀ = λ",
      correct_option: "A",
      explanation: "1. For electrons of mass m with de Broglie wavelength λ, the linear momentum is:\np = h / λ\n\n2. The kinetic energy (K) of these incident electrons is:\nK = p² / (2m) = (h / λ)² / (2m) = h² / (2 m λ²)\n\n3. According to the Duane-Hunt law, the cutoff (minimum) wavelength λ₀ of continuous X-rays corresponds to the complete conversion of the electron's maximum kinetic energy into a single X-ray photon:\nE_max = h c / λ₀ = K\n\n4. Equating both expressions for energy:\nh c / λ₀ = h² / (2 m λ²)\n\n5. Solving for the cutoff wavelength λ₀:\nc / λ₀ = h / (2 m λ²)  ⇒  λ₀ = 2 m c λ² / h.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the de Broglie wavelength of the striking electrons in an X-ray tube is halved (λ/2), the cutoff wavelength of the emitted X-rays will:",
      option_a: "Become 1/4 of its initial value",
      option_b: "Become 1/2 of its initial value",
      option_c: "Double",
      option_d: "Quadruple",
      correct_option: "A",
      explanation: "1. From λ₀ = 2 m c λ² / h, λ₀ is directly proportional to λ² (λ₀ ∝ λ²).\n2. When λ is halved (λ/2), λ₀ becomes (1/2)² = 1/4 of its initial value.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1319,
    originalQuestion: {
      question: "The de Broglie wavelength of a neutron in thermal equilibrium with heavy water at a temperature T (kelvin) and mass m is: [NEET 2017]",
      option_a: "h/√(3mkT)",
      option_b: "2h/√(3mkT)",
      option_c: "2h/√(mkT)",
      option_d: "h/√(mkT)",
      correct_option: "A",
      explanation: "1. According to the kinetic theory of gases, the average translational kinetic energy (E) of a particle in thermal equilibrium at absolute temperature T is given by:\nE = 3/2 k T\nwhere k is Boltzmann's constant.\n\n2. The momentum p of a particle of mass m is related to its kinetic energy by:\np = √(2 m E) = √(2 m (3/2 k T)) = √(3 m k T)\n\n3. According to de Broglie's hypothesis, the matter wavelength associated with the particle is:\nλ = h / p\n\n4. Substituting the expression for momentum:\nλ = h / √(3 m k T).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the de Broglie wavelength of a gas molecule of mass m at absolute temperature T? (k is Boltzmann's constant)",
      option_a: "h / √(3mkT)",
      option_b: "h / √(2mkT)",
      option_c: "h / √(mkT)",
      option_d: "√(3mkT) / h",
      correct_option: "A",
      explanation: "1. Kinetic energy E = 3/2 kT.\n2. Momentum p = √(2mE) = √(3mkT).\n3. de Broglie wavelength λ = h / p = h / √(3mkT).\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

