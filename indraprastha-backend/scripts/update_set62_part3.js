// scripts/update_set62_part3.js
// Update Set 62 (Atoms) Part 3: Q56 to Q82 (IDs 3583 to 3609)

const questions = [
  {
    id: 3583,
    similarQuestion: {
      question: "The ionization energy of a hydrogen-like ion from its ground state is 4 Rydbergs. What is the wavelength of the photon emitted when the electron transitions from the first excited state (n = 2) to the ground state (n = 1)? (R = 1.097 × 10⁷ m⁻¹)",
      option_a: "30.4 nm",
      option_b: "11.4 nm",
      option_c: "60.8 nm",
      option_d: "91.2 nm",
      correct_option: "A",
      explanation: "Step 1: The ground state ionization energy is E_ion = Z² Rydbergs = 4 Rydbergs ⇒ Z² = 4 ⇒ Z = 2 (singly ionized helium, He⁺).\nStep 2: The Rydberg formula for transition from n = 2 to n = 1 is:\n1 / λ = R Z² (1 / 1² - 1 / 2²) = R (4) (3 / 4) = 3R.\nStep 3: Solving for wavelength λ:\nλ = 1 / (3R) = 1 / (3 × 1.097 × 10⁷ m⁻¹) ≈ 3.038 × 10⁻⁸ m = 30.4 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3584,
    similarQuestion: {
      question: "The orbital period of revolution of an electron in the ground state of a hydrogen atom is 1.5 × 10⁻¹⁶ s. What is the frequency of revolution of the electron in its first excited state (n = 2)?",
      option_a: "8.33 × 10¹⁴ s⁻¹",
      option_b: "1.67 × 10¹⁵ s⁻¹",
      option_c: "4.17 × 10¹⁴ s⁻¹",
      option_d: "6.67 × 10¹⁵ s⁻¹",
      correct_option: "A",
      explanation: "Step 1: The orbital period of revolution in the n-th Bohr orbit varies as n³: Tₙ = T₁ n³.\nStep 2: For the first excited state (n = 2):\nT₂ = T₁ (2)³ = 8 T₁ = 8 × (1.5 × 10⁻¹⁶ s) = 1.2 × 10⁻¹⁵ s.\nStep 3: The orbital frequency of revolution is the reciprocal of the time period:\nf₂ = 1 / T₂ = 1 / (1.2 × 10⁻¹⁵ s) ≈ 8.33 × 10¹⁴ s⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3585,
    similarQuestion: {
      question: "An excited He⁺ ion (Z = 2) de-excites to its ground state by emitting two photons in succession. The second photon has a wavelength of 30.4 nm, corresponding to the transition from n = 2 to n = 1. If the first photon has a wavelength of 164.0 nm, what was the principal quantum number n of the initial excited state?",
      option_a: "n = 3",
      option_b: "n = 4",
      option_c: "n = 5",
      option_d: "n = 6",
      correct_option: "A",
      explanation: "Step 1: The energy of the first emitted photon of wavelength 164.0 nm is:\nE₁ = 1240 / 164.0 ≈ 7.56 eV.\nStep 2: The transition corresponding to this first emission is from level n to level 2:\nΔE = 13.6 × Z² (1 / 2² - 1 / n²) = 13.6 × 4 × (1 / 4 - 1 / n²) = 54.4 (1 / 4 - 1 / n²).\nStep 3: Equating to 7.56 eV:\n54.4 (1 / 4 - 1 / n²) = 7.56 ⇒ 1 / 4 - 1 / n² = 0.139 ⇒ 1 / n² = 0.25 - 0.139 = 0.111 = 1 / 9.\nn = 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3586,
    similarQuestion: {
      question: "In a hydrogen atom, an electron drops from the 4th Bohr orbit to the 3rd orbit, emitting a photon of wavelength λ₁. It then drops from the 3rd orbit to the 2nd orbit, emitting a photon of wavelength λ₂. What is the ratio λ₁ : λ₂?",
      option_a: "20 : 7",
      option_b: "7 : 20",
      option_c: "27 : 5",
      option_d: "5 : 27",
      correct_option: "A",
      explanation: "Step 1: For the transition n = 4 → 3:\n1 / λ₁ = R (1 / 3² - 1 / 4²) = R (1 / 9 - 1 / 16) = 7R / 144 ⇒ λ₁ = 144 / (7R).\nStep 2: For the transition n = 3 → 2:\n1 / λ₂ = R (1 / 2² - 1 / 3²) = R (1 / 4 - 1 / 9) = 5R / 36 ⇒ λ₂ = 36 / (5R).\nStep 3: Taking the ratio:\nλ₁ / λ₂ = [144 / (7R)] / [36 / (5R)] = (144 / 36) × (5 / 7) = 4 × (5 / 7) = 20 / 7 = 20 : 7.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3587,
    similarQuestion: {
      question: "An electron in a hydrogen atom revolves in its first excited state (n = 2) where the orbital radius is 2.12 Å. What is the de Broglie wavelength of the electron in this state?",
      option_a: "6.66 Å",
      option_b: "3.33 Å",
      option_c: "13.32 Å",
      option_d: "2.12 Å",
      correct_option: "A",
      explanation: "Step 1: According to de Broglie's hypothesis for stationary Bohr orbits, the circumference of the orbit contains an integer number of de Broglie wavelengths:\n2π rₙ = n λₙ.\nStep 2: For the first excited state, n = 2:\n2π r₂ = 2 λ₂ ⇒ λ₂ = π r₂.\nStep 3: Substitute r₂ = 2.12 Å:\nλ₂ = 3.1416 × 2.12 Å ≈ 6.66 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3588,
    similarQuestion: {
      question: "An electron in the ground state of a He⁺ ion (Z = 2) is excited to a higher level by absorbing a photon of wavelength λ. During de-excitation, a total of 6 distinct spectral lines are observed. What is the wavelength λ of the absorbed photon?",
      option_a: "24.3 nm",
      option_b: "10.8 nm",
      option_c: "30.4 nm",
      option_d: "12.1 nm",
      correct_option: "A",
      explanation: "Step 1: The total number of emission lines is N = n(n - 1) / 2 = 6 ⇒ n = 4.\nStep 2: The energy required to excite the electron from n = 1 to n = 4 in He⁺ (Z = 2) is:\nΔE = 13.6 × 2² × (1 / 1² - 1 / 4²) = 54.4 × (15 / 16) = 51.0 eV.\nStep 3: The absorbed photon wavelength is:\nλ = hc / ΔE = (1240 eV·nm) / (51.0 eV) ≈ 24.3 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3589,
    similarQuestion: {
      question: "If the wavelength of the H-α line (first Balmer line, n = 3 → 2) in atomic hydrogen is 656.3 nm, what is the wavelength of the H-β line (second Balmer line, n = 4 → 2)?",
      option_a: "486.1 nm",
      option_b: "434.0 nm",
      option_c: "410.2 nm",
      option_d: "540.5 nm",
      correct_option: "A",
      explanation: "Step 1: For the first Balmer line (3 → 2): 1 / λ₁ = R (1 / 4 - 1 / 9) = 5R / 36 ⇒ λ₁ = 36 / (5R).\nStep 2: For the second Balmer line (4 → 2): 1 / λ₂ = R (1 / 4 - 1 / 16) = 3R / 16 ⇒ λ₂ = 16 / (3R).\nStep 3: The ratio is:\nλ₂ / λ₁ = [16 / (3R)] / [36 / (5R)] = 20 / 27.\nStep 4: Calculating λ₂:\nλ₂ = (20 / 27) × 656.3 nm ≈ 486.1 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3590,
    similarQuestion: {
      question: "What is the ionization energy required to remove an electron from the second excited state (n = 3) of a singly ionized helium ion (He⁺, Z = 2)?",
      option_a: "6.04 eV",
      option_b: "13.60 eV",
      option_c: "54.40 eV",
      option_d: "3.40 eV",
      correct_option: "A",
      explanation: "Step 1: The binding (ionization) energy of an electron in the n-th orbit of a hydrogen-like atom is:\nE_ion = 13.6 (Z² / n²) eV.\nStep 2: For He⁺, Z = 2. In the second excited state, n = 3.\nStep 3: Calculating E_ion:\nE_ion = 13.6 × (2² / 3²) = 13.6 × (4 / 9) ≈ 6.04 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3591,
    similarQuestion: {
      question: "Photons emitted by the transition n = 2 → 1 in hydrogen atoms (energy = 10.2 eV) illuminate a gas of He⁺ ions. Which transition in the He⁺ ion can be excited by resonant absorption of these photons?",
      option_a: "n = 2 → n = 4",
      option_b: "n = 1 → n = 2",
      option_c: "n = 2 → n = 3",
      option_d: "n = 1 → n = 4",
      correct_option: "A",
      explanation: "Step 1: In hydrogen, the transition from n = 2 to n = 1 releases energy ΔE = -3.4 - (-13.6) = 10.2 eV.\nStep 2: For He⁺ (Z = 2), energy levels are Eₙ = -54.4 / n² eV:\nE₂ = -54.4 / 4 = -13.6 eV\nE₄ = -54.4 / 16 = -3.4 eV.\nStep 3: The excitation energy between n = 2 and n = 4 is:\nE₄ - E₂ = -3.4 eV - (-13.6 eV) = 10.2 eV.\nSince this matches the incident photon energy exactly, resonant absorption occurs from n = 2 to n = 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3592,
    similarQuestion: {
      question: "A hydrogen atom initially in its ground state absorbs an ultraviolet photon of wavelength 97.2 nm. In terms of the first Bohr radius a₀, what is the radius of the electronic orbit in the resulting excited state?",
      option_a: "16 a₀",
      option_b: "9 a₀",
      option_c: "4 a₀",
      option_d: "25 a₀",
      correct_option: "A",
      explanation: "Step 1: The energy of the absorbed photon is:\nE = 1240 / 97.2 ≈ 12.75 eV.\nStep 2: The final energy state of the electron is:\nE_final = E₁ + ΔE = -13.60 eV + 12.75 eV = -0.85 eV.\nSince Eₙ = -13.6 / n², n = √(-13.6 / -0.85) = √16 = 4.\nStep 3: The orbital radius scales as n²: r₄ = a₀ (4)² = 16 a₀.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3593,
    similarQuestion: {
      question: "In a hydrogen-like atom, an electron jump from the M shell (n = 3) to the L shell (n = 2) emits light of wavelength λ₁. An electron jump from the N shell (n = 4) to the L shell (n = 2) emits light of wavelength λ₂. What is the relation between λ₂ and λ₁?",
      option_a: "λ₂ = (20 / 27) λ₁",
      option_b: "λ₂ = (27 / 20) λ₁",
      option_c: "λ₂ = (3 / 4) λ₁",
      option_d: "λ₂ = (4 / 3) λ₁",
      correct_option: "A",
      explanation: "Step 1: For the M → L transition (3 → 2):\n1 / λ₁ = R Z² (1 / 4 - 1 / 9) = 5 R Z² / 36 ⇒ λ₁ = 36 / (5 R Z²).\nStep 2: For the N → L transition (4 → 2):\n1 / λ₂ = R Z² (1 / 4 - 1 / 16) = 3 R Z² / 16 ⇒ λ₂ = 16 / (3 R Z²).\nStep 3: Taking the ratio:\nλ₂ / λ₁ = [16 / (3 R Z²)] / [36 / (5 R Z²)] = (16 / 3) × (5 / 36) = 20 / 27 ⇒ λ₂ = (20 / 27) λ₁.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3594,
    similarQuestion: {
      question: "An electron transitions from an excited state with principal quantum number n to the ground state (n = 1) in atomic hydrogen. If λ_e is the de Broglie wavelength of the electron in the n-th orbit (λ_e ∝ n) and λ_ph is the wavelength of the emitted photon, then for large n, the photon wavelength λ_ph can be expressed in terms of constants A and C as:",
      option_a: "λ_ph ≈ A + C / λ_e²",
      option_b: "λ_ph ≈ A λ_e",
      option_c: "λ_ph ≈ C λ_e²",
      option_d: "λ_ph ≈ A - C λ_e",
      correct_option: "A",
      explanation: "Step 1: By the Rydberg equation for transition to ground state: 1 / λ_ph = R (1 - 1 / n²).\nStep 2: For large n, using binomial approximation: λ_ph = (1 / R) (1 - 1 / n²)⁻¹ ≈ (1 / R) (1 + 1 / n²).\nStep 3: The de Broglie wavelength in orbit n satisfies λ_e = 2π rₙ / n ∝ n, so n = k λ_e.\nSubstituting n gives λ_ph ≈ (1 / R) + (1 / R k²) / λ_e² = A + C / λ_e².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3595,
    similarQuestion: {
      question: "If the series limit frequency of the Lyman series of atomic hydrogen is ν_L, what is the series limit frequency of the Brackett series (n = ∞ → 4)?",
      option_a: "ν_L / 16",
      option_b: "ν_L / 4",
      option_c: "16 ν_L",
      option_d: "ν_L / 9",
      correct_option: "A",
      explanation: "Step 1: The series limit frequency for any spectral series with lower level n₁ is:\nν_limit = c R (1 / n₁² - 0) = c R / n₁².\nStep 2: For the Lyman series (n₁ = 1): ν_L = c R / 1² = c R.\nStep 3: For the Brackett series (n₁ = 4): ν_B = c R / 4² = c R / 16 = ν_L / 16.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3596,
    similarQuestion: {
      question: "The second ionization energy of a helium atom (He⁺ → He²⁺ + e⁻) is 54.4 eV. If the first ionization energy of helium is 24.6 eV, what is the total energy required to completely strip both electrons from a neutral helium atom?",
      option_a: "79.0 eV",
      option_b: "54.4 eV",
      option_c: "24.6 eV",
      option_d: "108.8 eV",
      correct_option: "A",
      explanation: "Step 1: Complete ionization of neutral helium requires removing both electrons sequentially:\nHe → He⁺ + e⁻ (first ionization energy IE₁ = 24.6 eV)\nHe⁺ → He²⁺ + e⁻ (second ionization energy IE₂ = 54.4 eV).\nStep 2: By conservation of energy, the total energy required is the sum of both ionization energies:\nE_total = IE₁ + IE₂ = 24.6 eV + 54.4 eV = 79.0 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3597,
    similarQuestion: {
      question: "In an atomic energy level diagram, three energy levels satisfy E_C > E_B > E_A with E_C - E_B = 2 eV and E_B - E_A = 4 eV. If transition C → B emits light of wavelength λ₁ and transition B → A emits light of wavelength λ₂, what is the ratio λ₁ / λ₂?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: Photon wavelength is inversely proportional to the transition energy: λ = hc / ΔE.\nStep 2: For transition C → B: ΔE₁ = 2 eV ⇒ λ₁ = hc / 2.\nFor transition B → A: ΔE₂ = 4 eV ⇒ λ₂ = hc / 4.\nStep 3: Calculating the ratio:\nλ₁ / λ₂ = (hc / 2) / (hc / 4) = 4 / 2 = 2 / 1 = 2 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3598,
    similarQuestion: {
      question: "In the Bohr model of the hydrogen atom, what is the centripetal acceleration of the electron in the n-th stationary orbit in terms of its radius rₙ, electron mass m, and principal quantum number n?",
      option_a: "aₙ = n² h² / (4π² m² rₙ³)",
      option_b: "aₙ = n h / (2π m rₙ²)",
      option_c: "aₙ = n² h / (4π² m rₙ)",
      option_d: "aₙ = 4π² m rₙ / (n² h²)",
      correct_option: "A",
      explanation: "Step 1: Centripetal acceleration is a = v² / rₙ.\nStep 2: From Bohr's angular momentum quantization: m v rₙ = n h / (2π) ⇒ v = n h / (2π m rₙ).\nStep 3: Substituting v into the acceleration formula:\na = [n² h² / (4π² m² rₙ²)] / rₙ = n² h² / (4π² m² rₙ³).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3599,
    similarQuestion: {
      question: "According to the Bohr model, the magnetic field produced at the nucleus of a hydrogen atom by the orbiting electron in the n-th orbit varies with the principal quantum number n as:",
      option_a: "n⁻⁵",
      option_b: "n⁻³",
      option_c: "n⁻⁴",
      option_d: "n⁻²",
      correct_option: "A",
      explanation: "Step 1: The magnetic field at the center of a circular current loop is B = μ₀ I / (2 rₙ).\nStep 2: The effective orbital current is I = e / Tₙ = e fₙ.\nSince orbital frequency fₙ ∝ 1 / n³ and radius rₙ ∝ n²:\nI ∝ 1 / n³.\nStep 3: Therefore:\nB ∝ (1 / n³) / n² = 1 / n⁵ = n⁻⁵.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3600,
    similarQuestion: {
      question: "A photon of energy 10.2 eV emitted by a hydrogen atom (n = 2 → 1) is absorbed by a singly ionized helium ion (He⁺, Z = 2) in an excited state n, ejecting the electron completely into the continuum. What is the minimum principal quantum number n of this excited state of He⁺?",
      option_a: "n = 3",
      option_b: "n = 2",
      option_c: "n = 4",
      option_d: "n = 5",
      correct_option: "A",
      explanation: "Step 1: The binding energy of He⁺ (Z = 2) in quantum state n is:\nE_b = 13.6 × Z² / n² = 13.6 × 4 / n² = 54.4 / n² eV.\nStep 2: For photoionization to occur, the photon energy must be at least equal to the binding energy:\n10.2 eV ≥ 54.4 / n² eV ⇒ n² ≥ 54.4 / 10.2 ≈ 5.33.\nStep 3: The smallest integer quantum number satisfying this inequality is n = 3 (since 3² = 9 ≥ 5.33, while 2² = 4 < 5.33).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3601,
    similarQuestion: {
      question: "When an electron transitions from a higher excited state to the ground state in a hydrogen-like atom, how do its kinetic energy (K), potential energy (U), and total energy (E) change?",
      option_a: "K increases, while U and E decrease",
      option_b: "K decreases, while U and E increase",
      option_c: "All K, U, and E decrease",
      option_d: "All K, U, and E increase",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy is K = +13.6 Z² / n² eV. As n decreases towards 1, K increases.\nStep 2: Potential energy is U = -27.2 Z² / n² eV. As n decreases, U becomes more negative (decreases).\nStep 3: Total energy is E = -13.6 Z² / n² eV. As n decreases, E becomes more negative (decreases).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3602,
    similarQuestion: {
      question: "What is the relation between the de Broglie wavelength of an electron in the n = 3 orbit of a hydrogen atom and that in the ground state (n = 1)?",
      option_a: "Three times the ground state wavelength",
      option_b: "Nine times the ground state wavelength",
      option_c: "One-third the ground state wavelength",
      option_d: "Equal to the ground state wavelength",
      correct_option: "A",
      explanation: "Step 1: By Bohr's orbit quantization condition, 2π rₙ = n λₙ.\nStep 2: Since rₙ = r₁ n²:\nλₙ = 2π (r₁ n²) / n = n (2π r₁) = n λ₁.\nStep 3: For n = 3, λ₃ = 3 λ₁ (three times the ground state de Broglie wavelength).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3603,
    similarQuestion: {
      question: "Photons emitted by the transition n = 3 → 2 in hydrogen atoms (energy = 1.89 eV) strike a metal target. The ejected photoelectrons enter a uniform magnetic field of 2 × 10⁻⁴ T perpendicular to their velocity and execute circles of maximum radius 12.0 mm. What is the work function of the metal target? (m = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C)",
      option_a: "1.38 eV",
      option_b: "1.89 eV",
      option_c: "0.51 eV",
      option_d: "2.40 eV",
      correct_option: "A",
      explanation: "Step 1: In the magnetic field, magnetic force provides centripetal force: p = e B r.\nSubstitute B = 2 × 10⁻⁴ T and r = 1.2 × 10⁻² m:\np = 1.6 × 10⁻¹⁹ × 2 × 10⁻⁴ × 1.2 × 10⁻² = 3.84 × 10⁻²⁵ kg·m/s.\nStep 2: The maximum kinetic energy of the photoelectrons is:\nKEₘₐₓ = p² / (2m) = (3.84 × 10⁻²⁵)² / (2 × 9.1 × 10⁻³¹) ≈ 8.11 × 10⁻²⁰ J ≈ 0.507 eV.\nStep 3: By Einstein's photoelectric equation:\nΦ = E_photon - KEₘₐₓ = 1.89 eV - 0.51 eV = 1.38 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3604,
    similarQuestion: {
      question: "Consider the emission transition from n = 3 to n = 1 in single-electron atoms: Hydrogen (Z = 1), Deuterium (Z = 1), and He⁺ (Z = 2). If their respective emitted wavelengths are λ_H, λ_D, and λ_He, what is the relationship between them?",
      option_a: "λ_H ≈ λ_D = 4 λ_He",
      option_b: "4 λ_H = 4 λ_D = λ_He",
      option_c: "λ_H = 2 λ_D = 4 λ_He",
      option_d: "λ_H = λ_D = 2 λ_He",
      correct_option: "A",
      explanation: "Step 1: The transition wavelength is inversely proportional to Z²: λ ∝ 1 / Z².\nStep 2: Since Hydrogen and Deuterium both have Z = 1, λ_H ≈ λ_D.\nStep 3: For He⁺ with Z = 2, λ_He = λ_H / 2² = λ_H / 4 ⇒ λ_H = 4 λ_He.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3605,
    similarQuestion: {
      question: "The binding energy of an electron in ground-state hydrogen is 13.6 eV. What is the energy required to remove an electron from the second excited state (n = 3) of a Be³⁺ ion (Z = 4)?",
      option_a: "24.18 eV",
      option_b: "30.60 eV",
      option_c: "54.40 eV",
      option_d: "13.60 eV",
      correct_option: "A",
      explanation: "Step 1: The binding energy of an electron in the n-th orbit of a single-electron ion is:\nE_b = 13.6 (Z² / n²) eV.\nStep 2: For Be³⁺, Z = 4. In the second excited state, n = 3.\nStep 3: Calculating E_b:\nE_b = 13.6 × (4² / 3²) = 13.6 × (16 / 9) ≈ 24.18 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3606,
    similarQuestion: {
      question: "In a hydrogen-like atom, an electron transitions from quantum level n to level (n - 1). For very high excitation states (n ≫ 1), the frequency of the emitted photon is proportional to:",
      option_a: "n⁻³",
      option_b: "n⁻²",
      option_c: "n⁻¹",
      option_d: "n⁻⁴",
      correct_option: "A",
      explanation: "Step 1: Using the Rydberg formula: ν = c R Z² [1 / (n - 1)² - 1 / n²].\nStep 2: Putting over a common denominator: ν = c R Z² [2n - 1] / [n² (n - 1)²].\nStep 3: For n ≫ 1, 2n - 1 ≈ 2n and n - 1 ≈ n:\nν ≈ c R Z² (2n / n⁴) = 2 c R Z² / n³ ∝ n⁻³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3607,
    similarQuestion: {
      question: "A beam of electrons of kinetic energy 12.5 eV bombards hydrogen atoms in their ground state. Which spectral lines will be present in the resulting emission spectrum?",
      option_a: "Two lines of the Lyman series and one line of the Balmer series",
      option_b: "Three lines of the Balmer series",
      option_c: "One line of the Lyman series and two of the Balmer series",
      option_d: "Three lines of the Lyman series only",
      correct_option: "A",
      explanation: "Step 1: 12.5 eV can excite hydrogen atoms up to n = 3 (since E₃ - E₁ = 12.09 eV < 12.5 eV < E₄ - E₁ = 12.75 eV).\nStep 2: The possible radiative transitions from n = 3 down to n = 1 are:\n(i) n = 3 → 1 (Lyman)\n(ii) n = 2 → 1 (Lyman)\n(iii) n = 3 → 2 (Balmer).\nStep 3: Thus, exactly 2 lines in the Lyman series and 1 line in the Balmer series are emitted.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3608,
    similarQuestion: {
      question: "Applying the Bohr-Sommerfeld quantization rule (orbital perimeter equals n de Broglie wavelengths) to a non-relativistic charged particle of charge q moving in a plane perpendicular to a uniform magnetic field B, the orbital radius rₙ scales with the quantum number n as:",
      option_a: "rₙ ∝ n^(1/2)",
      option_b: "rₙ ∝ n",
      option_c: "rₙ ∝ n²",
      option_d: "rₙ ∝ n^(-1/2)",
      correct_option: "A",
      explanation: "Step 1: The de Broglie quantization condition is 2π r = n λ = n h / p.\nStep 2: The momentum of a charged particle in a magnetic field is p = q B r.\nStep 3: Substituting p:\n2π r = n h / (q B r) ⇒ r² = [n h] / (2π q B) ⇒ rₙ ∝ n^(1/2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3609,
    similarQuestion: {
      question: "A hydrogen atom is excited from the ground state to the state with principal quantum number n = 5. What is the maximum number of spectral lines that can be emitted during de-excitation to the ground state?",
      option_a: "10",
      option_b: "6",
      option_c: "4",
      option_d: "15",
      correct_option: "A",
      explanation: "Step 1: The total number of distinct emission lines possible when an electron de-excites from level n to the ground state (n = 1) is:\nN = n(n - 1) / 2.\nStep 2: For n = 5:\nN = 5 × (5 - 1) / 2 = 5 × 4 / 2 = 10 spectral lines.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 62 Part 3.");

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
  console.log("Set 62 Part 3 completed successfully!");
}

main().catch(console.error);
