// scripts/update_set62_part5.js
// Update Set 62 (Atoms) Part 5: Q110 to Q137 (IDs 3637 to 3664)

const questions = [
  {
    id: 3637,
    similarQuestion: {
      question: "In the hydrogen atom, what is the energy of the photon emitted when an electron undergoes a transition from the fifth orbit (n = 5, E₅ = -0.54 eV) to the fourth orbit (n = 4, E₄ = -0.85 eV)?",
      option_a: "0.31 eV",
      option_b: "0.54 eV",
      option_c: "0.85 eV",
      option_d: "0.66 eV",
      correct_option: "A",
      explanation: "Step 1: The energy of an emitted photon is given by the difference between the initial and final stationary states:\nΔE = E₅ - E₄.\nStep 2: Substituting E₅ = -0.54 eV and E₄ = -0.85 eV:\nΔE = -0.54 eV - (-0.85 eV) = 0.31 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3638,
    similarQuestion: {
      question: "When an electron in a hydrogen atom jumps from n = 4 to n = 2, the emitted wavelength is λ₁. If it jumps from n = 3 to n = 2, the emitted wavelength is λ₂. What is the ratio λ₁ / λ₂?",
      option_a: "20 / 27",
      option_b: "27 / 20",
      option_c: "16 / 25",
      option_d: "25 / 16",
      correct_option: "A",
      explanation: "Step 1: For the n = 4 → 2 transition:\n1 / λ₁ = R (1 / 4 - 1 / 16) = 3R / 16 ⇒ λ₁ = 16 / (3R).\nStep 2: For the n = 3 → 2 transition:\n1 / λ₂ = R (1 / 4 - 1 / 9) = 5R / 36 ⇒ λ₂ = 36 / (5R).\nStep 3: Calculating the ratio:\nλ₁ / λ₂ = [16 / (3R)] / [36 / (5R)] = (16 / 3) × (5 / 36) = 20 / 27.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3639,
    similarQuestion: {
      question: "In a quantum system, transition from an energy state 3E to E emits a photon of wavelength λ. What will be the wavelength of the photon emitted in the transition from an energy state 5E/3 to E?",
      option_a: "3λ",
      option_b: "2λ",
      option_c: "λ / 3",
      option_d: "1.5λ",
      correct_option: "A",
      explanation: "Step 1: In the first transition: ΔE₁ = 3E - E = 2E ⇒ λ = hc / (2E).\nStep 2: In the second transition: ΔE₂ = (5/3)E - E = (2/3)E.\nStep 3: The emitted wavelength is:\nλ' = hc / [(2/3)E] = 3 × [hc / (2E)] = 3λ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3640,
    similarQuestion: {
      question: "Two electrons in an atom move in circular orbits of radii r and 9r. What is the ratio of their orbital periods of revolution?",
      option_a: "1 : 27",
      option_b: "1 : 9",
      option_c: "1 : 3",
      option_d: "27 : 1",
      correct_option: "A",
      explanation: "Step 1: In a circular orbit under an inverse-square force, Kepler's third law applies: T² ∝ r³ ⇒ T ∝ r^(3/2).\nStep 2: The ratio of their time periods is:\nT₁ / T₂ = (r / 9r)^(3/2) = (1 / 9)^(3/2) = (1 / 3)³ = 1 / 27 = 1 : 27.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3641,
    similarQuestion: {
      question: "The orbital frequency of an electron in a hydrogen atom varies with the principal quantum number n as:",
      option_a: "n⁻³",
      option_b: "n⁻²",
      option_c: "n⁻¹",
      option_d: "n³",
      correct_option: "A",
      explanation: "Step 1: Orbital velocity scales as vₙ ∝ 1 / n.\nStep 2: Orbital radius scales as rₙ ∝ n².\nStep 3: Orbital frequency is fₙ = vₙ / (2π rₙ) ∝ (1 / n) / n² = 1 / n³ = n⁻³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3642,
    similarQuestion: {
      question: "Assuming the Bohr model applies to the outermost electron in a hydrogen-like ion of fermium (₁₀₀Fm, Z = 100), in which orbit (principal quantum number n) will the orbital radius be exactly equal to the Bohr radius of ground-state hydrogen (a₀)?",
      option_a: "n = 10",
      option_b: "n = 100",
      option_c: "n = 5",
      option_d: "n = 20",
      correct_option: "A",
      explanation: "Step 1: The radius of the n-th orbit for atomic number Z is rₙ = a₀ (n² / Z).\nStep 2: For Z = 100, we require rₙ = a₀:\na₀ (n² / 100) = a₀.\nStep 3: Solving for n:\nn² / 100 = 1 ⇒ n² = 100 ⇒ n = 10.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3643,
    similarQuestion: {
      question: "In Rutherford's alpha-particle scattering experiment, what is the scattering angle for an alpha particle approaching with an impact parameter b = 0?",
      option_a: "180°",
      option_b: "90°",
      option_c: "0°",
      option_d: "45°",
      correct_option: "A",
      explanation: "Step 1: The impact parameter b is the perpendicular distance of the initial velocity vector from the center of the target nucleus.\nStep 2: For b = 0, the collision is head-on.\nStep 3: The electrostatic repulsion brings the alpha particle to momentary rest and repels it straight back along its original trajectory, resulting in a scattering angle of θ = 180°.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3644,
    similarQuestion: {
      question: "According to de Broglie's hypothesis as applied to Bohr's stationary orbits, the circumference of the n-th circular orbit in a hydrogen atom is equal to:",
      option_a: "n λ",
      option_b: "n² λ",
      option_c: "λ / n",
      option_d: "2π n λ",
      correct_option: "A",
      explanation: "Step 1: For a stationary quantum state to exist without destructive interference, the electron de Broglie wave must form a standing wave around the orbit.\nStep 2: This condition requires an integer number of full wavelengths to fit into the orbit's circumference:\n2π rₙ = n λ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3645,
    similarQuestion: {
      question: "Which spectral series of atomic hydrogen lies predominantly in the visible spectrum of electromagnetic radiation?",
      option_a: "Balmer series",
      option_b: "Lyman series",
      option_c: "Paschen series",
      option_d: "Pfund series",
      correct_option: "A",
      explanation: "Step 1: Transitions ending at n₁ = 2 form the Balmer series.\nStep 2: The wavelengths of Balmer emission lines fall between 365 nm and 656 nm, covering the human visible spectrum.\nStep 3: Lyman series lies in the ultraviolet, while Paschen, Brackett, and Pfund series lie in the infrared.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3646,
    similarQuestion: {
      question: "Let ν_L be the series limit frequency of the Lyman series, ν_1 be the frequency of the first line of the Lyman series (n = 2 → 1), and ν_B be the series limit frequency of the Balmer series. What is the relation between them?",
      option_a: "ν_L - ν_1 = ν_B",
      option_b: "ν_L + ν_1 = ν_B",
      option_c: "ν_1 - ν_B = ν_L",
      option_d: "1/ν_L = 1/ν_1 + 1/ν_B",
      correct_option: "A",
      explanation: "Step 1: The frequencies are given by:\nν_L = c R (1 / 1² - 0) = c R\nν_1 = c R (1 / 1² - 1 / 2²) = (3 / 4) c R\nν_B = c R (1 / 2² - 0) = (1 / 4) c R.\nStep 2: Subtracting ν_1 from ν_L:\nν_L - ν_1 = c R - (3 / 4) c R = (1 / 4) c R = ν_B.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3647,
    similarQuestion: {
      question: "If the ionization energy of a hydrogen atom in its ground state is 13.6 eV, what is the binding energy (energy required to liberate the electron) in the first excited state (n = 2)?",
      option_a: "3.4 eV",
      option_b: "10.2 eV",
      option_c: "1.51 eV",
      option_d: "13.6 eV",
      correct_option: "A",
      explanation: "Step 1: The energy in the n-th state is Eₙ = -13.6 / n² eV.\nStep 2: For the first excited state, n = 2:\nE₂ = -13.6 / 2² = -3.4 eV.\nStep 3: The binding energy required to ionize the atom from this state is |E₂| = 3.4 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3648,
    similarQuestion: {
      question: "Rutherford's alpha-particle scattering experiment successfully established:",
      option_a: "The existence of a tiny, dense, positively charged atomic nucleus",
      option_b: "The quantization of atomic energy levels",
      option_c: "The wave nature of the electron",
      option_d: "The discrete line spectra of hydrogen",
      correct_option: "A",
      explanation: "Step 1: The observation that a tiny fraction of alpha particles deflected through large angles (> 90°) led Rutherford to deduce that almost all of an atom's mass and positive charge are concentrated in a microscopic central nucleus.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3649,
    similarQuestion: {
      question: "If atomic hydrogen is excited from the ground state to the principal quantum state n = 4, how many spectral lines are possible in the emission spectrum?",
      option_a: "6",
      option_b: "3",
      option_c: "4",
      option_d: "10",
      correct_option: "A",
      explanation: "Step 1: The maximum number of distinct emission lines from level n down to ground state is:\nN = n(n - 1) / 2.\nStep 2: For n = 4:\nN = 4 × (4 - 1) / 2 = 4 × 3 / 2 = 6 spectral lines.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3650,
    similarQuestion: {
      question: "The nucleus of an ordinary atom (with atomic mass number A > 1) is composed of:",
      option_a: "Protons and neutrons",
      option_b: "Electrons and protons",
      option_c: "Neutrons and electrons",
      option_d: "Protons only",
      correct_option: "A",
      explanation: "Step 1: Atomic nuclei consist of positively charged protons and electrically neutral neutrons, collectively called nucleons, bound together by the strong nuclear force.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3651,
    similarQuestion: {
      question: "What is the ground-state ionization energy of a singly ionized helium ion (He⁺, Z = 2)?",
      option_a: "54.4 eV",
      option_b: "13.6 eV",
      option_c: "27.2 eV",
      option_d: "108.8 eV",
      correct_option: "A",
      explanation: "Step 1: The ionization energy of a single-electron ion from its ground state is:\nE_ion = 13.6 × Z² eV.\nStep 2: For helium, Z = 2:\nE_ion = 13.6 × 2² = 13.6 × 4 = 54.4 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3652,
    similarQuestion: {
      question: "What is the ratio of the minimum wavelength of the Lyman series to the minimum wavelength of the Balmer series in atomic hydrogen?",
      option_a: "0.25",
      option_b: "0.50",
      option_c: "4.0",
      option_d: "1.25",
      correct_option: "A",
      explanation: "Step 1: Minimum wavelength corresponds to transitions from n = ∞:\nFor Lyman series: 1 / λ_L,min = R (1 / 1² - 0) = R ⇒ λ_L,min = 1 / R.\nFor Balmer series: 1 / λ_B,min = R (1 / 2² - 0) = R / 4 ⇒ λ_B,min = 4 / R.\nStep 2: Taking the ratio:\nλ_L,min / λ_B,min = (1 / R) / (4 / R) = 1 / 4 = 0.25.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3653,
    similarQuestion: {
      question: "According to the Bohr model of the hydrogen atom, which of the following dependencies on the principal quantum number n is/are correct?\n(I) Orbital radius rₙ ∝ n²\n(II) Orbital speed vₙ ∝ 1/n\n(III) Orbital angular momentum Lₙ ∝ n",
      option_a: "(I), (II), and (III) are all correct",
      option_b: "Only (I) and (II) are correct",
      option_c: "Only (II) and (III) are correct",
      option_d: "Only (I) is correct",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, rₙ = a₀ n² ⇒ rₙ ∝ n² (Statement I is correct).\nStep 2: Orbital velocity is vₙ = v₁ / n ⇒ vₙ ∝ 1/n (Statement II is correct).\nStep 3: Angular momentum is Lₙ = n ℏ ⇒ Lₙ ∝ n (Statement III is correct).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3654,
    similarQuestion: {
      question: "When an electron in a hydrogen atom absorbs radiation and jumps from the n = 2 level to the n = 4 level, what is the wavelength of the absorbed radiation in terms of Rydberg constant R?",
      option_a: "16 / (3R)",
      option_b: "3R / 16",
      option_c: "4 / (3R)",
      option_d: "9 / (8R)",
      correct_option: "A",
      explanation: "Step 1: By Rydberg's equation for transition between n₁ = 2 and n₂ = 4:\n1 / λ = R (1 / 2² - 1 / 4²) = R (1 / 4 - 1 / 16) = 3R / 16.\nStep 2: Taking the reciprocal:\nλ = 16 / (3R).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3655,
    similarQuestion: {
      question: "In a hypothetical hydrogen atom, if the mass of the electron were three times its actual value (m' = 3m_e), what would be the ground state energy E₁ and Bohr radius r₁ in terms of standard values E₀ = -13.6 eV and a₀?",
      option_a: "E₁ = -40.8 eV and r₁ = a₀ / 3",
      option_b: "E₁ = -13.6 eV and r₁ = 3 a₀",
      option_c: "E₁ = -40.8 eV and r₁ = 3 a₀",
      option_d: "E₁ = -4.53 eV and r₁ = a₀ / 3",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, orbital energy is directly proportional to mass: E ∝ m.\nE₁ = 3 × (-13.6 eV) = -40.8 eV.\nStep 2: Orbital radius is inversely proportional to mass: r ∝ 1 / m.\nr₁ = a₀ / 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3656,
    similarQuestion: {
      question: "Which of the following assumptions is/are fundamental to Bohr's model of the hydrogen atom?",
      option_a: "All of the above",
      option_b: "Electrons in certain non-radiating orbits have quantized angular momentum",
      option_c: "The nucleus is infinitely heavy compared to the electron and remains stationary",
      option_d: "Radiation is emitted only during transitions between discrete stationary states",
      correct_option: "A",
      explanation: "Step 1: Bohr's model postulates that the nucleus is infinitely massive and at rest at the center.\nStep 2: Electrons move in discrete stationary orbits without radiating electromagnetic energy, with angular momentum quantized as L = n (h / 2π).\nStep 3: Radiation is emitted or absorbed only when an electron jumps from one stationary orbit to another.\nAll these postulates are central to Bohr's model.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3657,
    similarQuestion: {
      question: "What is the ratio of the shortest wavelength (series limit) to the longest wavelength (first line) in the Balmer series of the hydrogen spectrum?",
      option_a: "5 : 9",
      option_b: "9 : 5",
      option_c: "1 : 4",
      option_d: "3 : 4",
      correct_option: "A",
      explanation: "Step 1: For the Balmer series (n₁ = 2):\nShortest wavelength (n = ∞ → 2): 1 / λ_min = R (1 / 4 - 0) = R / 4 ⇒ λ_min = 4 / R.\nLongest wavelength (n = 3 → 2): 1 / λ_max = R (1 / 4 - 1 / 9) = 5R / 36 ⇒ λ_max = 36 / (5R).\nStep 2: Taking the ratio:\nλ_min / λ_max = (4 / R) / [36 / (5R)] = (4 / 1) × (5 / 36) = 20 / 36 = 5 / 9 = 5 : 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3658,
    similarQuestion: {
      question: "What is the excitation energy required to raise a hydrogen atom from its ground state to its first excited state?",
      option_a: "10.2 eV",
      option_b: "13.6 eV",
      option_c: "3.4 eV",
      option_d: "1.51 eV",
      correct_option: "A",
      explanation: "Step 1: Ground state energy is E₁ = -13.6 eV.\nStep 2: First excited state (n = 2) energy is E₂ = -13.6 / 4 = -3.4 eV.\nStep 3: Excitation energy is:\nΔE = E₂ - E₁ = -3.4 eV - (-13.6 eV) = 10.2 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3659,
    similarQuestion: {
      question: "What is the wavelength of radiation emitted when an electron in a hydrogen atom transitions from the n = 2 state to the ground state (n = 1)?",
      option_a: "1215 Å",
      option_b: "6563 Å",
      option_c: "4861 Å",
      option_d: "1026 Å",
      correct_option: "A",
      explanation: "Step 1: By Rydberg's equation: 1 / λ = R (1 / 1² - 1 / 2²) = 3R / 4.\nStep 2: Solving for λ:\nλ = 4 / (3R) = 4 / (3 × 1.097 × 10⁷ m⁻¹) ≈ 1.215 × 10⁻⁷ m = 1215 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3660,
    similarQuestion: {
      question: "If λ is the wavelength of the photon emitted in the transition n = 2 → 1 of atomic hydrogen, what is the wavelength of the photon emitted for the identical transition in a singly ionized helium ion (He⁺, Z = 2)?",
      option_a: "λ / 4",
      option_b: "λ / 2",
      option_c: "4λ",
      option_d: "2λ",
      correct_option: "A",
      explanation: "Step 1: Transition wavelength in single-electron ions scales inversely with Z²: λ ∝ 1 / Z².\nStep 2: For He⁺ (Z = 2):\nλ(He⁺) = λ(H) / 2² = λ / 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3661,
    similarQuestion: {
      question: "The wavelength of the first line of the Balmer series in hydrogen (H-α) is 6563 Å. What is the wavelength of the second line of the Balmer series (H-β)?",
      option_a: "4861 Å",
      option_b: "4102 Å",
      option_c: "4340 Å",
      option_d: "5400 Å",
      correct_option: "A",
      explanation: "Step 1: First Balmer line (3 → 2): λ₁ = 36 / (5R) = 6563 Å.\nStep 2: Second Balmer line (4 → 2): λ₂ = 16 / (3R).\nStep 3: Ratio λ₂ / λ₁ = 20 / 27.\nλ₂ = (20 / 27) × 6563 Å ≈ 4861 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3662,
    similarQuestion: {
      question: "What is the ratio of the longest wavelength to the shortest wavelength in the Brackett series (fourth spectral series, n₁ = 4) of atomic hydrogen?",
      option_a: "25 / 9",
      option_b: "9 / 25",
      option_c: "16 / 9",
      option_d: "9 / 16",
      correct_option: "A",
      explanation: "Step 1: For the Brackett series (n₁ = 4):\nLongest wavelength (5 → 4): 1 / λ_max = R (1 / 16 - 1 / 25) = 9R / 400 ⇒ λ_max = 400 / (9R).\nShortest wavelength (∞ → 4): 1 / λ_min = R / 16 ⇒ λ_min = 16 / R.\nStep 2: Taking the ratio:\nλ_max / λ_min = [400 / (9R)] / (16 / R) = 400 / (9 × 16) = 25 / 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3663,
    similarQuestion: {
      question: "Which of the following transitions in a hydrogen atom results in the emission of an electromagnetic photon with the highest frequency?",
      option_a: "n = 2 → n = 1",
      option_b: "n = 3 → n = 2",
      option_c: "n = 4 → n = 3",
      option_d: "n = 1 → n = 2",
      correct_option: "A",
      explanation: "Step 1: Emission requires transition from higher to lower quantum level.\nStep 2: Frequency is given by f = ΔE / h.\nStep 3: The transition n = 2 → 1 releases ΔE = 10.2 eV, which is greater than all other emission transitions listed.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3664,
    similarQuestion: {
      question: "The wave number of the spectral line emitted during the transition from n = 3 to n = 1 in atomic hydrogen is 97,490 cm⁻¹. What will be the wave number for the same transition in a singly ionized helium ion (He⁺, Z = 2)?",
      option_a: "389,960 cm⁻¹",
      option_b: "194,980 cm⁻¹",
      option_c: "97,490 cm⁻¹",
      option_d: "24,372 cm⁻¹",
      correct_option: "A",
      explanation: "Step 1: The wave number ν̄ for transition between two states in a single-electron ion of atomic number Z is:\nν̄ = R Z² (1 / n₁² - 1 / n₂²).\nStep 2: For He⁺ (Z = 2), the wave number is scaled by Z² = 4 relative to hydrogen:\nν̄(He⁺) = 4 × ν̄(H).\nStep 3: Calculating ν̄(He⁺):\nν̄(He⁺) = 4 × (97,490 cm⁻¹) = 389,960 cm⁻¹.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 62 Part 5.");

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
  console.log("Set 62 Part 5 completed successfully!");
}

main().catch(console.error);
