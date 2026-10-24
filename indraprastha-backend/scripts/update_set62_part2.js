// scripts/update_set62_part2.js
// Update Set 62 (Atoms) Part 2: Q29 to Q55 (IDs 3556 to 3582)

const questions = [
  {
    id: 3556,
    similarQuestion: {
      question: "If the radius of the second Bohr orbit of a hydrogen atom is r₂, what is the radius of its fifth Bohr orbit in terms of r₂?",
      option_a: "(25 / 4) r₂ = 6.25 r₂",
      option_b: "(5 / 2) r₂",
      option_c: "(4 / 25) r₂",
      option_d: "25 r₂",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, orbital radius rₙ varies as n²: rₙ = r₁ n².\nStep 2: For n = 2: r₂ = 4 r₁. For n = 5: r₅ = 25 r₁.\nStep 3: Dividing the two: r₅ / r₂ = 25 / 4 = 6.25 ⇒ r₅ = (25 / 4) r₂ = 6.25 r₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3557,
    similarQuestion: {
      question: "A beam of electrons with kinetic energy 12.2 eV bombards hydrogen atoms in their ground state. How many distinct spectral lines can be emitted by the gas as the atoms de-excite?",
      option_a: "3",
      option_b: "6",
      option_c: "1",
      option_d: "4",
      correct_option: "A",
      explanation: "Step 1: The excitation energies of hydrogen from the ground state (n = 1) are:\nTo n = 2: ΔE = 10.2 eV\nTo n = 3: ΔE = 12.09 eV\nTo n = 4: ΔE = 12.75 eV.\nStep 2: Since the incident electron energy is 12.2 eV, which satisfies 12.09 eV < E < 12.75 eV, the atoms can be excited at most to the n = 3 level.\nStep 3: The number of distinct spectral lines emitted from n = 3 is:\nN = n(n - 1) / 2 = 3(2) / 2 = 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3558,
    similarQuestion: {
      question: "What is the total energy of an electron in the second excited state (n = 3) of a doubly ionized lithium ion (Li²⁺, Z = 3)?",
      option_a: "-13.6 eV",
      option_b: "-3.4 eV",
      option_c: "-40.8 eV",
      option_d: "-122.4 eV",
      correct_option: "A",
      explanation: "Step 1: The energy of an electron in the n-th Bohr orbit of a hydrogen-like atom is:\nEₙ = -13.6 (Z² / n²) eV.\nStep 2: For Li²⁺, Z = 3. In the second excited state, n = 3.\nStep 3: Substituting Z = 3 and n = 3:\nE₃ = -13.6 × (3² / 3²) = -13.6 × 1 = -13.6 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3559,
    similarQuestion: {
      question: "If the orbital angular momentum of an electron in the ground state of a hydrogen atom is L₀, what is the change in its angular momentum when it is excited to the third Bohr orbit (n = 3)?",
      option_a: "2 L₀",
      option_b: "3 L₀",
      option_c: "L₀",
      option_d: "4 L₀",
      correct_option: "A",
      explanation: "Step 1: According to Bohr's quantization condition, angular momentum in the n-th orbit is Lₙ = n ℏ.\nStep 2: For ground state (n = 1), L₁ = 1 ℏ = L₀.\nFor n = 3, L₃ = 3 ℏ = 3 L₀.\nStep 3: The change in angular momentum is:\nΔL = L₃ - L₁ = 3 L₀ - L₀ = 2 L₀.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3560,
    similarQuestion: {
      question: "In the hydrogen atom emission spectrum, which electronic transition results in the emission of a photon with the shortest wavelength?",
      option_a: "n = 4 → n = 1",
      option_b: "n = 4 → n = 3",
      option_c: "n = 3 → n = 2",
      option_d: "n = 2 → n = 1",
      correct_option: "A",
      explanation: "Step 1: The wavelength of an emitted photon is related to the transition energy by λ = hc / ΔE.\nStep 2: The shortest wavelength corresponds to the transition releasing the greatest amount of energy (largest ΔE).\nStep 3: Comparing the transitions:\nn = 4 → 1: ΔE = 12.75 eV\nn = 2 → 1: ΔE = 10.20 eV\nn = 3 → 2: ΔE = 1.89 eV\nn = 4 → 3: ΔE = 0.66 eV.\nThe transition n = 4 → 1 has the maximum energy, producing the shortest wavelength.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3561,
    similarQuestion: {
      question: "An electron in a hydrogen-like ion with atomic number Z = 3 undergoes a transition from n = 3 to n = 2. What is the energy of the emitted photon?",
      option_a: "17.0 eV",
      option_b: "10.2 eV",
      option_c: "25.5 eV",
      option_d: "40.8 eV",
      correct_option: "A",
      explanation: "Step 1: Transition energy in a single-electron ion is given by:\nΔE = 13.6 Z² (1 / n₁² - 1 / n₂²) eV.\nStep 2: Here Z = 3, n₁ = 2, and n₂ = 3:\nΔE = 13.6 × 3² × (1 / 4 - 1 / 9) = 13.6 × 9 × (5 / 36).\nStep 3: Simplifying:\nΔE = 13.6 × (45 / 36) = 13.6 × (5 / 4) = 17.0 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3562,
    similarQuestion: {
      question: "If the radius of the first orbit of a hydrogen atom is r₁, what is the radius of its fourth orbit?",
      option_a: "16 r₁",
      option_b: "4 r₁",
      option_c: "8 r₁",
      option_d: "2 r₁",
      correct_option: "A",
      explanation: "Step 1: According to the Bohr model, the radius of the n-th orbit is proportional to n²:\nrₙ = r₁ n².\nStep 2: For n = 4:\nr₄ = r₁ (4)² = 16 r₁.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3563,
    similarQuestion: {
      question: "The speed of an electron in the 4th Bohr orbit of an atom is 1.5 × 10⁶ m/s. What is its orbital speed in the 2nd Bohr orbit?",
      option_a: "3.0 × 10⁶ m/s",
      option_b: "0.75 × 10⁶ m/s",
      option_c: "6.0 × 10⁶ m/s",
      option_d: "4.5 × 10⁶ m/s",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, the orbital speed of an electron is inversely proportional to the principal quantum number: vₙ ∝ 1 / n.\nStep 2: Therefore: v₂ / v₄ = 4 / 2 = 2.\nStep 3: Calculating v₂:\nv₂ = 2 × v₄ = 2 × (1.5 × 10⁶ m/s) = 3.0 × 10⁶ m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3564,
    similarQuestion: {
      question: "In an atom with discrete energy levels, an electron transitions between two states and emits a photon of wavelength 124 nm. What is the energy difference between the two states? (hc ≈ 1240 eV·nm)",
      option_a: "10.0 eV",
      option_b: "1.24 eV",
      option_c: "5.0 eV",
      option_d: "12.4 eV",
      correct_option: "A",
      explanation: "Step 1: The energy difference ΔE between two stationary levels emitting light of wavelength λ is:\nΔE = hc / λ.\nStep 2: Using the handy conversion hc ≈ 1240 eV·nm:\nΔE = (1240 eV·nm) / (124 nm) = 10.0 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3565,
    similarQuestion: {
      question: "An electron in a hydrogen atom jumps from the n = 3 orbit to the n = 1 ground state. What is the wavelength of the emitted ultraviolet photon? (Using hc ≈ 1240 eV·nm)",
      option_a: "102.6 nm",
      option_b: "121.6 nm",
      option_c: "91.2 nm",
      option_d: "656.3 nm",
      correct_option: "A",
      explanation: "Step 1: The energy of the photon emitted in the n = 3 → 1 transition is:\nΔE = 13.6 (1 / 1² - 1 / 3²) = 13.6 × (8 / 9) ≈ 12.09 eV.\nStep 2: The wavelength is:\nλ = hc / ΔE ≈ (1240 eV·nm) / (12.09 eV) ≈ 102.6 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3566,
    similarQuestion: {
      question: "What is the ratio of the energy of the photon emitted in the transition from n = 3 to n = 1 to the ionization energy of hydrogen from its ground state (n = ∞ to n = 1)?",
      option_a: "8 : 9",
      option_b: "3 : 4",
      option_c: "1 : 9",
      option_d: "9 : 8",
      correct_option: "A",
      explanation: "Step 1: The photon energy for transition from n = 3 to n = 1 is:\nΔE(3 → 1) = 13.6 (1 / 1² - 1 / 3²) = 13.6 × (8 / 9) eV.\nStep 2: The ionization energy from the ground state is:\nE_ion = 13.6 (1 / 1² - 0) = 13.6 eV.\nStep 3: The ratio of energies is:\nΔE(3 → 1) / E_ion = [13.6 × (8 / 9)] / 13.6 = 8 / 9 = 8 : 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3567,
    similarQuestion: {
      question: "In the Bohr model of the hydrogen atom, what is the linear momentum p of an electron in terms of its orbital radius r, principal quantum number n, and Planck's constant h?",
      option_a: "p = n h / (2π r)",
      option_b: "p = 2π r / (n h)",
      option_c: "p = n h r / (2π)",
      option_d: "p = n² h / (2π r)",
      correct_option: "A",
      explanation: "Step 1: Bohr's quantization condition is L = m v r = n ℏ = n h / (2π).\nStep 2: Since linear momentum is p = m v, we have:\np = (m v r) / r = n h / (2π r).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3568,
    similarQuestion: {
      question: "A hydrogen atom drops from an excited state with principal quantum number n directly to the ground state, emitting a photon of wavelength λ. The quantum number n is given by:",
      option_a: "n = √[λ R / (λ R - 1)]",
      option_b: "n = √[λ R - 1]",
      option_c: "n = λ R / (λ R - 1)",
      option_d: "n = √[(λ R - 1) / (λ R)]",
      correct_option: "A",
      explanation: "Step 1: The transition from n to 1 satisfies: 1 / λ = R (1 / 1² - 1 / n²) = R (1 - 1 / n²).\nStep 2: 1 / (λ R) = 1 - 1 / n² ⇒ 1 / n² = 1 - 1 / (λ R) = (λ R - 1) / (λ R).\nStep 3: Taking the reciprocal and square root: n = √[λ R / (λ R - 1)].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3569,
    similarQuestion: {
      question: "A ground-state hydrogen atom absorbs 10.2 eV of energy, exciting its electron to the first excited state. What is the increase in the orbital angular momentum of the electron? (h = 6.63 × 10⁻³⁴ J·s)",
      option_a: "1.05 × 10⁻³⁴ J·s",
      option_b: "2.11 × 10⁻³⁴ J·s",
      option_c: "3.16 × 10⁻³⁴ J·s",
      option_d: "0",
      correct_option: "A",
      explanation: "Step 1: An absorbed energy of 10.2 eV excites the electron from n = 1 to n = 2 (since E₂ - E₁ = -3.4 - (-13.6) = 10.2 eV).\nStep 2: According to Bohr's quantization postulate, the angular momentum in the n-th orbit is Lₙ = n (h / 2π).\nStep 3: The increase in angular momentum is:\nΔL = L₂ - L₁ = (2 - 1) (h / 2π) = h / (2π).\nSubstituting h = 6.63 × 10⁻³⁴ J·s:\nΔL = 6.63 × 10⁻³⁴ / (2 × 3.1416) ≈ 1.05 × 10⁻³⁴ J·s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3570,
    similarQuestion: {
      question: "A hydrogen atom in its ground state absorbs a photon of energy 12.75 eV, promoting the electron to the n = 4 level. By how much does its orbital angular momentum increase?",
      option_a: "3.16 × 10⁻³⁴ J·s",
      option_b: "1.05 × 10⁻³⁴ J·s",
      option_c: "2.11 × 10⁻³⁴ J·s",
      option_d: "4.22 × 10⁻³⁴ J·s",
      correct_option: "A",
      explanation: "Step 1: The excitation to n = 4 increases the quantum number from n₁ = 1 to n₂ = 4.\nStep 2: The increase in orbital angular momentum is:\nΔL = (4 - 1) × (h / 2π) = 3 × (h / 2π).\nStep 3: Substituting h = 6.63 × 10⁻³⁴ J·s:\nΔL = 3 × (1.054 × 10⁻³⁴ J·s) ≈ 3.16 × 10⁻³⁴ J·s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3571,
    similarQuestion: {
      question: "Consider the following statements regarding atomic transitions:\nStatement I: Radiation is absorbed when an electron makes a transition from an inner orbit of lower energy E₁ to an outer orbit of higher energy E₂.\nStatement II: The frequency of the emitted photon when an electron jumps from a higher energy state E₂ to a lower energy state E₁ is given by f = (E₂ - E₁) / h.\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is false but Statement II is true",
      option_d: "Statement I is true but Statement II is false",
      correct_option: "A",
      explanation: "Step 1: An electron transitions from a lower to a higher energy orbit only by absorbing external radiation of energy hf = E₂ - E₁, making Statement I true.\nStep 2: When an electron drops from a higher energy level E₂ to a lower level E₁, it emits a photon whose frequency is governed by Bohr's frequency condition f = (E₂ - E₁) / h, making Statement II true.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3572,
    similarQuestion: {
      question: "What is the ratio of the orbital speed of an electron in the 2nd orbit of a Li²⁺ ion (Z = 3) to that in the 2nd orbit of a hydrogen atom (Z = 1)?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "9 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, orbital speed varies as vₙ = v₁ (Z / n).\nStep 2: For the same principal quantum number n = 2:\nv(Li²⁺) / v(H) = Z(Li²⁺) / Z(H) = 3 / 1 = 3 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3573,
    similarQuestion: {
      question: "When an electron in a hydrogen atom undergoes an excitation transition from an inner orbit to an outer orbit of higher principal quantum number n, what happens to its kinetic energy (K), potential energy (P), and total energy (E)?",
      option_a: "K decreases, while both P and E increase",
      option_b: "All K, P, and E increase",
      option_c: "K increases, while P and E decrease",
      option_d: "K and P increase, while E remains constant",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy is K = +13.6 / n² eV. As n increases, K decreases.\nStep 2: Potential energy is P = -27.2 / n² eV. As n increases, P becomes less negative (increases).\nStep 3: Total energy is E = -13.6 / n² eV. As n increases, E becomes less negative (increases).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3574,
    similarQuestion: {
      question: "A free electron having kinetic energy 1.4 eV is captured by a bare proton (H⁺ ion) to form a neutral hydrogen atom in its second excited state (n = 3, E₃ = -1.51 eV). What is the frequency of the emitted photon? (h = 6.63 × 10⁻³⁴ J·s)",
      option_a: "7.02 × 10¹⁴ Hz (7.02 × 10⁸ MHz)",
      option_b: "1.45 × 10¹⁵ Hz",
      option_c: "3.51 × 10¹⁴ Hz",
      option_d: "2.91 × 10¹⁵ Hz",
      correct_option: "A",
      explanation: "Step 1: The total energy released in radiative recombination is the difference between the initial energy of the free electron and the final bound state energy:\nE_photon = KE_free - E₃ = 1.4 eV - (-1.51 eV) = 2.91 eV.\nStep 2: Convert energy to Joules:\nE_photon = 2.91 × 1.6 × 10⁻¹⁹ J = 4.656 × 10⁻¹⁹ J.\nStep 3: Calculate the frequency:\nf = E_photon / h = (4.656 × 10⁻¹⁹ J) / (6.63 × 10⁻³⁴ J·s) ≈ 7.02 × 10¹⁴ Hz = 7.02 × 10⁸ MHz.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3575,
    similarQuestion: {
      question: "A hydrogen-like ion emits a photon of frequency 3.20 × 10¹⁵ Hz during the transition from n = 3 to n = 1. What is the frequency of the radiation emitted by the same ion during the transition from n = 2 to n = 1?",
      option_a: "2.70 × 10¹⁵ Hz",
      option_b: "2.40 × 10¹⁵ Hz",
      option_c: "3.60 × 10¹⁵ Hz",
      option_d: "1.80 × 10¹⁵ Hz",
      correct_option: "A",
      explanation: "Step 1: The transition frequencies are given by:\nν(3 → 1) = c R Z² (1 / 1² - 1 / 3²) = (8 / 9) c R Z²\nν(2 → 1) = c R Z² (1 / 1² - 1 / 2²) = (3 / 4) c R Z².\nStep 2: Taking the ratio of frequencies:\nν(2 → 1) / ν(3 → 1) = (3 / 4) / (8 / 9) = (3 / 4) × (9 / 8) = 27 / 32.\nStep 3: Calculating ν(2 → 1):\nν(2 → 1) = (27 / 32) × (3.20 × 10¹⁵ Hz) = 2.70 × 10¹⁵ Hz.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3576,
    similarQuestion: {
      question: "If the electron in a hydrogen atom is replaced by a negatively charged particle having the same charge but a mass 200 times that of an electron, what would be the ionization energy of this exotic atom from its ground state?",
      option_a: "2720 eV",
      option_b: "13.6 eV",
      option_c: "1360 eV",
      option_d: "680 eV",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, orbital energy is directly proportional to the mass of the orbiting particle: Eₙ ∝ m.\nStep 2: For standard hydrogen, the ionization energy is 13.6 eV.\nStep 3: For an orbiting particle of mass m' = 200 m_e:\nE_ion' = 200 × 13.6 eV = 2720 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3577,
    similarQuestion: {
      question: "What is the ratio of the wavelength of the second member of the Lyman series (λ₁, n = 3 → 1) to the first member of the Balmer series (λ₂, n = 3 → 2) in atomic hydrogen?",
      option_a: "5 : 32",
      option_b: "27 : 32",
      option_c: "5 : 27",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: For the second member of the Lyman series (n = 3 → 1):\n1 / λ₁ = R (1 / 1² - 1 / 3²) = 8R / 9 ⇒ λ₁ = 9 / (8R).\nStep 2: For the first member of the Balmer series (n = 3 → 2):\n1 / λ₂ = R (1 / 2² - 1 / 3²) = 5R / 36 ⇒ λ₂ = 36 / (5R).\nStep 3: Taking the ratio λ₁ / λ₂:\nλ₁ / λ₂ = [9 / (8R)] / [36 / (5R)] = (9 / 8) × (5 / 36) = 5 / 32 = 5 : 32.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3578,
    similarQuestion: {
      question: "A stationary hydrogen atom emits a photon during the transition from the n = 2 state to the n = 1 state. What is the recoil speed of the hydrogen atom? (Mass of hydrogen atom m_H = 1.67 × 10⁻²⁷ kg)",
      option_a: "3.26 m/s",
      option_b: "4.17 m/s",
      option_c: "1.63 m/s",
      option_d: "2.19 m/s",
      correct_option: "A",
      explanation: "Step 1: The energy emitted in the transition n = 2 → 1 is ΔE = 10.2 eV = 1.632 × 10⁻¹⁸ J.\nStep 2: By conservation of momentum, the recoil momentum of the atom is equal to the momentum of the emitted photon:\np_recoil = ΔE / c = (1.632 × 10⁻¹⁸ J) / (3.0 × 10⁸ m/s) = 5.44 × 10⁻²⁷ kg·m/s.\nStep 3: The recoil speed is:\nv_recoil = p_recoil / m_H = (5.44 × 10⁻²⁷ kg·m/s) / (1.67 × 10⁻²⁷ kg) ≈ 3.26 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3579,
    similarQuestion: {
      question: "What is the wavelength of the Lyman-alpha line (transition n = 2 → 1) in the emission spectrum of atomic hydrogen? (R = 1.097 × 10⁷ m⁻¹)",
      option_a: "121.5 nm",
      option_b: "656.3 nm",
      option_c: "486.1 nm",
      option_d: "91.2 nm",
      correct_option: "A",
      explanation: "Step 1: The Lyman-alpha transition corresponds to n₂ = 2 to n₁ = 1:\n1 / λ = R (1 / 1² - 1 / 2²) = 3R / 4.\nStep 2: Solving for λ:\nλ = 4 / (3R) = 4 / (3 × 1.097 × 10⁷ m⁻¹) ≈ 1.215 × 10⁻⁷ m = 121.5 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3580,
    similarQuestion: {
      question: "In the energy level diagram of atomic hydrogen, transitions ending at n = 1, n = 2, and n = 3 are labeled. Which spectral series correspond to transitions terminating at n = 1, n = 2, and n = 3, respectively?",
      option_a: "Lyman series, Balmer series, and Paschen series",
      option_b: "Balmer series, Paschen series, and Brackett series",
      option_c: "Lyman series, Paschen series, and Pfund series",
      option_d: "Pfund series, Brackett series, and Paschen series",
      correct_option: "A",
      explanation: "Step 1: Transitions terminating at the ground state (n = 1) form the Lyman series.\nStep 2: Transitions terminating at the first excited state (n = 2) form the Balmer series.\nStep 3: Transitions terminating at the second excited state (n = 3) form the Paschen series.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3581,
    similarQuestion: {
      question: "Among the following transitions in a hydrogen atom, which one results in the emission of radiation with the highest frequency?",
      option_a: "n = 2 → n = 1",
      option_b: "n = 3 → n = 2",
      option_c: "n = 4 → n = 3",
      option_d: "n = 5 → n = 4",
      correct_option: "A",
      explanation: "Step 1: Radiation frequency is directly proportional to transition energy: f = ΔE / h.\nStep 2: The energy gap between n = 2 and n = 1 is ΔE = 10.2 eV.\nStep 3: Transitions between higher adjacent levels have significantly smaller energy gaps (e.g., 3 → 2 is 1.89 eV, 4 → 3 is 0.66 eV).\nHence, n = 2 → 1 has the maximum frequency.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3582,
    similarQuestion: {
      question: "In a hydrogen atom, an electron transitions from orbit (n + 1) to orbit n. For very large quantum numbers (n ≫ 1), the frequency of the emitted radiation varies with n as:",
      option_a: "1 / n³",
      option_b: "1 / n²",
      option_c: "1 / n",
      option_d: "1 / n⁴",
      correct_option: "A",
      explanation: "Step 1: The transition frequency is:\nf = c R [1 / n² - 1 / (n + 1)²].\nStep 2: Combining terms over a common denominator:\nf = c R [(n + 1)² - n²] / [n² (n + 1)²] = c R [2n + 1] / [n² (n + 1)²].\nStep 3: For n ≫ 1, 2n + 1 ≈ 2n and n + 1 ≈ n:\nf ≈ c R (2n) / n⁴ = 2 c R / n³ ∝ 1 / n³.\nThis matches the classical orbital frequency of revolution (Bohr's correspondence principle).\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch("https://api.indraprasthaneetacademy.com/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "indraprasthaadmin",
      password: "indraprastha@123"
    })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  if (!token) {
    console.error("Login failed:", loginData);
    process.exit(1);
  }
  console.log("Login successful for Set 62 Part 2.");

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const updateRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${q.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        similarQuestion: q.similarQuestion
      })
    });
    const updateData = await updateRes.json();
    if (!updateRes.ok) {
      console.error(`Error updating Q ID ${q.id}:`, updateData);
    } else {
      console.log(`Updated question ${i + 1}/${questions.length} (ID: ${q.id})`);
    }
    await new Promise(r => setTimeout(r, 100));
  }
  console.log("Set 62 Part 2 completed successfully!");
}

main().catch(console.error);
