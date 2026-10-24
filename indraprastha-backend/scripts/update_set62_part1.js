// scripts/update_set62_part1.js
// Update Set 62 (Atoms) Part 1: Q1 to Q28 (IDs 3528 to 3555)

const questions = [
  {
    id: 3528,
    similarQuestion: {
      question: "Consider the following statements regarding atomic models:\nStatement I: In Rutherford's nuclear model, essentially all the positive charge and mass of the atom are concentrated within an extremely compact central nucleus.\nStatement II: The plum-pudding model, which describes an atom as a uniform spherical positive charge containing embedded electrons, was proposed by J. J. Thomson.\nWhich option correctly assesses these statements?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true but Statement II is false",
      option_d: "Statement I is false but Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Rutherford's alpha particle scattering experiment established that an atom consists of a tiny, dense, positively charged nucleus surrounded by orbiting electrons, confirming Statement I.\nStep 2: J. J. Thomson proposed the plum pudding model in 1904, where electrons are embedded in a uniform sphere of positive charge, confirming Statement II.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3529,
    similarQuestion: {
      question: "Why is a classical planetary model of the atom (Rutherford model) fundamentally unstable according to classical electrodynamics?",
      option_a: "An orbiting accelerating electron continuously emits electromagnetic radiation and spirals into the nucleus",
      option_b: "The gravitational attraction between electron and nucleus overcomes the electrostatic repulsion",
      option_c: "The nucleus spontaneously decays by emitting electrons",
      option_d: "The electrostatic repulsive force between nucleus and electron causes the electron to fly away",
      correct_option: "A",
      explanation: "Step 1: An electron executing circular orbit around a nucleus experiences centripetal acceleration a = v² / r.\nStep 2: Classical electromagnetic theory dictates that any accelerating electric charge must continuously radiate energy in the form of electromagnetic waves.\nStep 3: As the electron loses energy, its orbital radius must shrink continuously, causing it to spiral into the nucleus in ~10⁻¹⁰ seconds.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3530,
    similarQuestion: {
      question: "In the Geiger-Marsden (Rutherford) α-particle scattering experiment, how does the number of scattered α-particles detected per unit area N(θ) depend on the scattering angle θ?",
      option_a: "N(θ) ∝ 1 / sin⁴(θ / 2)",
      option_b: "N(θ) ∝ sin⁴(θ / 2)",
      option_c: "N(θ) ∝ 1 / cos²(θ / 2)",
      option_d: "N(θ) ∝ 1 / sin²(θ / 2)",
      correct_option: "A",
      explanation: "Step 1: According to Rutherford's scattering formula, derived from Coulomb's inverse-square repulsion between the alpha particle and the target nucleus:\nN(θ) = [Nᵢ n t Z² e⁴] / [(8πε₀)² r² K² sin⁴(θ / 2)].\nStep 2: Hence, the number of scattered particles per unit area is inversely proportional to the fourth power of the sine of half the scattering angle:\nN(θ) ∝ 1 / sin⁴(θ / 2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3531,
    similarQuestion: {
      question: "In the Rutherford α-particle scattering experiment, which of the following trajectory features is physically impossible for an α-particle passing near a heavy nucleus?",
      option_a: "An α-particle bending towards the nucleus as if attracted",
      option_b: "An α-particle scattering backward through an angle greater than 90°",
      option_c: "An α-particle passing through with negligible deflection at large impact parameter",
      option_d: "An α-particle deflecting through 180° for head-on collision",
      correct_option: "A",
      explanation: "Step 1: Both the α-particle (charge +2e) and the target nucleus (charge +Ze) carry positive electric charges.\nStep 2: The Coulomb electrostatic force between them is strictly repulsive at all distances outside the nuclear radius.\nStep 3: Therefore, the trajectory must always bend away from the nucleus (hyperbolic path with nucleus at the external focus). Bending towards the nucleus would require an attractive force, which is physically impossible.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3532,
    similarQuestion: {
      question: "An α-particle of mass m and speed v is fired directly towards a stationary heavy nucleus of charge Ze. The distance of closest approach r₀ of the α-particle is proportional to:",
      option_a: "1 / v²",
      option_b: "v²",
      option_c: "1 / v",
      option_d: "v",
      correct_option: "A",
      explanation: "Step 1: At the distance of closest approach r₀ in a head-on collision, the initial kinetic energy is completely converted into electrostatic potential energy:\n(1/2) m v² = (1 / 4πε₀) (2e × Ze) / r₀.\nStep 2: Solving for r₀:\nr₀ = [4 k Z e²] / (m v²).\nStep 3: Thus, for a given nucleus and particle mass, r₀ is inversely proportional to the square of the initial velocity: r₀ ∝ 1 / v².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3533,
    similarQuestion: {
      question: "An α-particle with kinetic energy 10 MeV is scattered through 180° by a stationary gold nucleus (Z = 79). What is the order of magnitude of the distance of closest approach?",
      option_a: "10⁻¹² cm (10⁻¹⁴ m)",
      option_b: "10⁻¹⁰ cm",
      option_c: "10⁻⁸ cm",
      option_d: "10⁻¹⁵ cm",
      correct_option: "A",
      explanation: "Step 1: For a head-on collision (180° scattering), closest approach is:\nr₀ = (1 / 4πε₀) (2e × Ze) / E_k.\nStep 2: Substitute k = 9 × 10⁹ N·m²/C², Z = 79, e = 1.6 × 10⁻¹⁹ C, and E_k = 10 MeV = 10 × 10⁶ × 1.6 × 10⁻¹⁹ J:\nr₀ = (2 × 9 × 10⁹ × 79 × 1.6 × 10⁻¹⁹) / 10⁷\nr₀ ≈ 2.27 × 10⁻¹⁴ m = 2.27 × 10⁻¹² cm.\nStep 3: This is of the order of 10⁻¹² cm (or 10⁻¹⁴ m).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3534,
    similarQuestion: {
      question: "In a hydrogen-like atom, the energy required to excite an electron from the ground state (n = 1) to the first excited state (n = 2) is 40.8 eV. What is the atomic number Z of this ion?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "1",
      correct_option: "A",
      explanation: "Step 1: The excitation energy from n = 1 to n = 2 in a hydrogen-like ion is:\nΔE = 13.6 Z² (1 / 1² - 1 / 2²) = 13.6 Z² (3 / 4) = 10.2 Z² eV.\nStep 2: Given ΔE = 40.8 eV:\n10.2 Z² = 40.8 ⇒ Z² = 4 ⇒ Z = 2.\nStep 3: Thus the ion is singly ionized helium (He⁺).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3535,
    similarQuestion: {
      question: "For atomic hydrogen, what is the ratio of the longest wavelength in the Lyman series (λ_L) to the longest wavelength in the Balmer series (λ_B)?",
      option_a: "5 / 27",
      option_b: "27 / 5",
      option_c: "4 / 9",
      option_d: "9 / 4",
      correct_option: "A",
      explanation: "Step 1: For the Lyman series, the longest wavelength line is the first line (n = 2 → 1):\n1 / λ_L = R (1 / 1² - 1 / 2²) = 3R / 4 ⇒ λ_L = 4 / (3R).\nStep 2: For the Balmer series, the longest wavelength line is the first line (n = 3 → 2):\n1 / λ_B = R (1 / 2² - 1 / 3²) = 5R / 36 ⇒ λ_B = 36 / (5R).\nStep 3: The ratio of these wavelengths is:\nλ_L / λ_B = [4 / (3R)] / [36 / (5R)] = (4 / 3) × (5 / 36) = 20 / 108 = 5 / 27.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3536,
    similarQuestion: {
      question: "Consider the following two statements regarding quantum physics:\nStatement I: Planck's constant (h) and orbital angular momentum (L) have identical SI units (J·s) and dimensional formula [M L² T⁻¹].\nStatement II: According to Bohr's quantization postulate, the angular momentum of an electron in a stable orbit is an integral multiple of h / (2π).\nWhich of the following is correct?",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true but Statement II is false",
      option_d: "Statement I is false but Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Angular momentum has formula L = r × p, with dimensions [L][M L T⁻¹] = [M L² T⁻¹]. Planck's constant has E = hν ⇒ [h] = [M L² T⁻²] / [T⁻¹] = [M L² T⁻¹], so Statement I is true.\nStep 2: Bohr's second postulate explicitly states that L = n (h / 2π), where n is an integer, so Statement II is true.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3537,
    similarQuestion: {
      question: "According to the Bohr model, what is the ratio of the radius of the 4th orbit of an electron in Be³⁺ (Z = 4) to the radius of the 4th orbit of an electron in He⁺ (Z = 2)?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, the orbital radius is given by:\nrₙ = a₀ (n² / Z).\nStep 2: For both ions, the principal quantum number is the same (n = 4):\nr(Be³⁺) / r(He⁺) = [a₀ (4² / 4)] / [a₀ (4² / 2)] = 2 / 4 = 1 / 2 = 1 : 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3538,
    similarQuestion: {
      question: "Assertion (A): The Bohr atomic model successfully explains the spectra of H, He⁺, and Li²⁺, but fails to predict the energy levels of neutral helium (He).\nReason (R): The Bohr model takes into account only the electrostatic attraction between the nucleus and a single electron, ignoring electron-electron repulsions present in multi-electron systems.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      correct_option: "A",
      explanation: "Step 1: The Bohr model is formulated strictly for a two-body central-force problem consisting of one nucleus and one electron.\nStep 2: In multi-electron systems like neutral helium (two electrons), electron-electron electrostatic repulsion and mutual screening significantly alter the potential, rendering the simple Bohr formula inapplicable.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3539,
    similarQuestion: {
      question: "In Bohr's atomic model, the radius of the ground state of a hydrogen-like ion with atomic number Z is given by r₁ = a₀ / Z, where a₀ is the Bohr radius of hydrogen. What is the ground state radius of a Be³⁺ ion?",
      option_a: "a₀ / 4",
      option_b: "a₀ / 2",
      option_c: "a₀ / 3",
      option_d: "4 a₀",
      correct_option: "A",
      explanation: "Step 1: The radius of the n-th orbit in a hydrogen-like atom is rₙ = a₀ (n² / Z).\nStep 2: For Be³⁺ in the ground state, n = 1 and Z = 4.\nStep 3: Substituting these values: r₁ = a₀ (1² / 4) = a₀ / 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3540,
    similarQuestion: {
      question: "Which of the following electronic states across different hydrogen-like species have identical total binding energy to that of the ground state (n = 1) of atomic hydrogen?",
      option_a: "First excited state (n = 2) of He⁺ and second excited state (n = 3) of Li²⁺",
      option_b: "Ground state of He⁺ and ground state of Li²⁺",
      option_c: "Second excited state of He⁺",
      option_d: "First excited state of Li²⁺",
      correct_option: "A",
      explanation: "Step 1: Energy in n-th state is E = -13.6 (Z² / n²) eV.\nStep 2: For ground state hydrogen (Z = 1, n = 1): E = -13.6 (1 / 1) = -13.6 eV.\nStep 3: For He⁺ (Z = 2), first excited state (n = 2): E = -13.6 (2² / 2²) = -13.6 eV.\nStep 4: For Li²⁺ (Z = 3), second excited state (n = 3): E = -13.6 (3² / 3²) = -13.6 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3541,
    similarQuestion: {
      question: "If hydrogen atoms are excited to the energy level n = 6, what is the total number of spectral lines emitted in the entire spectrum during de-excitation to the ground state?",
      option_a: "15",
      option_b: "6",
      option_c: "10",
      option_d: "21",
      correct_option: "A",
      explanation: "Step 1: The maximum number of distinct spectral lines emitted when electrons in a sample of hydrogen atoms de-excite from level n to the ground state (n = 1) is:\nN = n(n - 1) / 2.\nStep 2: Here n = 6:\nN = 6 × (6 - 1) / 2 = 6 × 5 / 2 = 15 spectral lines.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3542,
    similarQuestion: {
      question: "According to the Bohr model of the hydrogen atom, the orbital frequency of revolution of the electron varies with the principal quantum number n as:",
      option_a: "1 / n³",
      option_b: "1 / n²",
      option_c: "1 / n",
      option_d: "n²",
      correct_option: "A",
      explanation: "Step 1: Orbital velocity varies as vₙ ∝ 1 / n.\nStep 2: Orbital radius varies as rₙ ∝ n².\nStep 3: The orbital frequency of revolution is f = vₙ / (2π rₙ) ∝ (1 / n) / n² = 1 / n³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3543,
    similarQuestion: {
      question: "In an atom, an electron transitions from energy level A to level C by emitting a photon of wavelength 1200 Å. Transition from level B to level C emits a photon of wavelength 2000 Å. What is the wavelength of the photon emitted during the transition from level A to level B?",
      option_a: "3000 Å",
      option_b: "3200 Å",
      option_c: "800 Å",
      option_d: "1500 Å",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy, the transition energy between A and C is the sum of energies between A to B and B to C:\nE_AC = E_AB + E_BC.\nStep 2: In terms of wavelengths:\nhc / λ_AC = hc / λ_AB + hc / λ_BC ⇒ 1 / λ_AB = 1 / λ_AC - 1 / λ_BC.\nStep 3: Substituting λ_AC = 1200 Å and λ_BC = 2000 Å:\n1 / λ_AB = 1 / 1200 - 1 / 2000 = (5 - 3) / 6000 = 2 / 6000 = 1 / 3000 Å⁻¹.\nλ_AB = 3000 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3544,
    similarQuestion: {
      question: "An electron of charge e and mass m moves in a plane perpendicular to a uniform magnetic field B. Applying Bohr's angular momentum quantization condition (mvr = nℏ), what is the orbital radius of the electron in the n-th quantum state?",
      option_a: "rₙ = √(n ℏ / (e B))",
      option_b: "rₙ = n ℏ / (e B)",
      option_c: "rₙ = √(n e B / ℏ)",
      option_d: "rₙ = n² ℏ / (e B)",
      correct_option: "A",
      explanation: "Step 1: Magnetic Lorentz force provides centripetal force:\nm v² / r = e v B ⇒ m v = e B r.\nStep 2: Apply Bohr's angular momentum quantization:\nL = m v r = (e B r) r = e B r² = n ℏ.\nStep 3: Solving for radius r:\nr² = n ℏ / (e B) ⇒ rₙ = √(n ℏ / (e B)).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3545,
    similarQuestion: {
      question: "What is the ratio of the de Broglie wavelength of an electron in the ground state (n = 1) of a hydrogen atom to its de Broglie wavelength in the second excited state (n = 3)?",
      option_a: "1 : 3",
      option_b: "1 : 9",
      option_c: "3 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: By de Broglie relation in Bohr's orbits, 2π rₙ = n λₙ ⇒ λₙ = 2π rₙ / n.\nStep 2: Since rₙ = r₁ n²:\nλₙ = 2π (r₁ n²) / n = (2π r₁) n ∝ n.\nStep 3: The ratio of de Broglie wavelengths between n = 1 and n = 3 is:\nλ₁ / λ₃ = 1 / 3 = 1 : 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3546,
    similarQuestion: {
      question: "A hydrogen atom initially in its ground state absorbs a photon of energy 12.09 eV, exciting the electron to the n = 3 level. Upon returning to the ground state directly or via cascade, how many distinct spectral lines can be emitted?",
      option_a: "3",
      option_b: "1",
      option_c: "2",
      option_d: "6",
      correct_option: "A",
      explanation: "Step 1: The excitation energy of 12.09 eV excites the hydrogen electron from n = 1 to n = 3 (since E₃ - E₁ = -1.51 - (-13.60) = 12.09 eV).\nStep 2: From the n = 3 level, possible emission transitions are:\n(1) n = 3 → 1 (Lyman-β)\n(2) n = 3 → 2 (Balmer-α)\n(3) n = 2 → 1 (Lyman-α).\nStep 3: Total number of distinct spectral lines is N = 3(3 - 1) / 2 = 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3547,
    similarQuestion: {
      question: "What is the ratio of the series limit (shortest wavelength) of the Paschen series to the series limit of the Lyman series in atomic hydrogen?",
      option_a: "9 : 1",
      option_b: "16 : 1",
      option_c: "4 : 1",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "Step 1: For the Paschen series limit (n = ∞ → 3):\n1 / λ_P = R (1 / 3² - 0) = R / 9 ⇒ λ_P = 9 / R.\nStep 2: For the Lyman series limit (n = ∞ → 1):\n1 / λ_L = R (1 / 1² - 0) = R / 1 ⇒ λ_L = 1 / R.\nStep 3: Taking the ratio:\nλ_P / λ_L = (9 / R) / (1 / R) = 9 / 1 = 9 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3548,
    similarQuestion: {
      question: "What is the longest wavelength in the Brackett series of atomic hydrogen? (Rydberg constant R = 1.097 × 10⁷ m⁻¹)",
      option_a: "4.05 × 10⁻⁶ m",
      option_b: "1.88 × 10⁻⁶ m",
      option_c: "2.62 × 10⁻⁶ m",
      option_d: "7.46 × 10⁻⁶ m",
      correct_option: "A",
      explanation: "Step 1: The Brackett series corresponds to transitions ending at n₁ = 4. The longest wavelength is the first line (minimum energy difference), corresponding to n₂ = 5:\n1 / λ = R (1 / 4² - 1 / 5²) = R (1 / 16 - 1 / 25) = 9R / 400.\nStep 2: Solving for wavelength λ:\nλ = 400 / (9R) = 400 / (9 × 1.097 × 10⁷ m⁻¹) ≈ 4.05 × 10⁻⁶ m = 4050 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3549,
    similarQuestion: {
      question: "For an electron revolving in a circular orbit about a nucleus under Coulombic attraction, what is the relation between its total mechanical energy E and its electrostatic potential energy U?",
      option_a: "E = U / 2",
      option_b: "E = -U",
      option_c: "E = 2U",
      option_d: "E = -U / 2",
      correct_option: "A",
      explanation: "Step 1: In an inverse-square central force field, by the virial theorem:\nKinetic energy KE = -E.\nStep 2: Potential energy U = 2E.\nStep 3: Rearranging for total energy: E = U / 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3550,
    similarQuestion: {
      question: "How does the orbital angular momentum L of an electron in a hydrogen-like atom depend on its orbital radius r?",
      option_a: "L ∝ √r",
      option_b: "L ∝ r",
      option_c: "L ∝ r²",
      option_d: "L ∝ 1 / √r",
      correct_option: "A",
      explanation: "Step 1: Centripetal force balance gives m v² / r = k Z e² / r² ⇒ v = √(k Z e² / (m r)) ∝ 1 / √r.\nStep 2: Angular momentum is defined as L = m v r.\nStep 3: Substituting v: L = m [√(k Z e² / (m r))] r = √(m k Z e² r) ∝ √r.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3551,
    similarQuestion: {
      question: "What is the orbital angular momentum of an electron in the 3rd Bohr orbit of a hydrogen atom in terms of Planck's constant h?",
      option_a: "3h / (2π)",
      option_b: "h / π",
      option_c: "2h / π",
      option_d: "3h / π",
      correct_option: "A",
      explanation: "Step 1: By Bohr's angular momentum quantization postulate, Lₙ = n (h / 2π).\nStep 2: For n = 3: L₃ = 3 (h / 2π) = 3h / (2π).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3552,
    similarQuestion: {
      question: "What is the minimum excitation energy that must be absorbed by a ground-state hydrogen atom so that it can subsequently emit a spectral line belonging to the Balmer series?",
      option_a: "12.09 eV",
      option_b: "10.20 eV",
      option_c: "13.60 eV",
      option_d: "1.89 eV",
      correct_option: "A",
      explanation: "Step 1: The Balmer series consists of transitions terminating at n = 2.\nStep 2: For an atom to emit a photon in the Balmer series, the electron must jump down to n = 2 from an upper state n ≥ 3.\nStep 3: Therefore, the electron must be excited from the ground state (n = 1) to at least n = 3:\nΔE_min = E₃ - E₁ = -1.51 eV - (-13.60 eV) = 12.09 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3553,
    similarQuestion: {
      question: "If the wavelength of the first line of the Balmer series (n = 3 → 2) is λ₀, what is the wavelength of the second line of the Balmer series (n = 4 → 2)?",
      option_a: "(20 / 27) λ₀",
      option_b: "(27 / 20) λ₀",
      option_c: "(16 / 25) λ₀",
      option_d: "(25 / 16) λ₀",
      correct_option: "A",
      explanation: "Step 1: First line (3 → 2): 1/λ₀ = R (1/4 - 1/9) = 5R / 36 ⇒ λ₀ = 36 / (5R).\nStep 2: Second line (4 → 2): 1/λ₂ = R (1/4 - 1/16) = 3R / 16 ⇒ λ₂ = 16 / (3R).\nStep 3: Ratio: λ₂ / λ₀ = [16 / (3R)] / [36 / (5R)] = (16 / 3) × (5 / 36) = 20 / 27 ⇒ λ₂ = (20 / 27) λ₀.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3554,
    similarQuestion: {
      question: "What is the ratio of the magnitude of kinetic energy to the magnitude of potential energy (|KE| / |PE|) for an electron in any stationary orbit of a hydrogen atom?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: By the virial theorem for Coulombic 1/r potential, PE = -2 KE.\nStep 2: Taking magnitudes: |PE| = 2 |KE| ⇒ |KE| / |PE| = 1 / 2 = 1 : 2.\nStep 3: This holds identically for all quantum states n.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3555,
    similarQuestion: {
      question: "In the Bohr model of the hydrogen atom, the magnetic dipole moment μₙ associated with the orbital motion of the electron in the n-th orbit is proportional to n^x. What is the value of x?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "0",
      correct_option: "A",
      explanation: "Step 1: The orbital magnetic dipole moment is related to the orbital angular momentum L by:\nμ = (e / 2m) L.\nStep 2: According to Bohr's quantization condition:\nL = n ℏ.\nStep 3: Substituting L:\nμₙ = (e ℏ / 2m) n = n μ_B, where μ_B is the Bohr magneton.\nHence μₙ is directly proportional to n¹ (x = 1).\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 62 Part 1.");

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
  console.log("Set 62 Part 1 completed successfully!");
}

main().catch(console.error);
