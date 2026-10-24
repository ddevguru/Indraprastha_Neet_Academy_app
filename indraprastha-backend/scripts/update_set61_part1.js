// scripts/update_set61_part1.js
// Update Set 61 (Dual Nature & Atoms) Part 1: Q1 to Q22 (IDs 518 to 591)

const questions = [
  {
    id: 518,
    similarQuestion: {
      question: "What is the de Broglie wavelength associated with an oxygen molecule (O₂, mass = 5.3 × 10⁻²⁶ kg) moving with a speed of 500 m/s? (h = 6.63 × 10⁻³⁴ J·s)",
      option_a: "0.25 Å",
      option_b: "0.50 Å",
      option_c: "1.25 Å",
      option_d: "0.10 Å",
      correct_option: "A",
      explanation: "Step 1: The de Broglie wavelength formula is:\nλ = h / (m v).\nStep 2: Substitute m = 5.3 × 10⁻²⁶ kg, v = 500 m/s, and h = 6.63 × 10⁻³⁴ J·s:\nλ = (6.63 × 10⁻³⁴) / (5.3 × 10⁻²⁶ × 500)\nλ = (6.63 × 10⁻³⁴) / (2.65 × 10⁻²³)\nλ = 2.50 × 10⁻¹¹ m = 0.25 × 10⁻¹⁰ m = 0.25 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 520,
    similarQuestion: {
      question: "What is the kinetic energy of an electron having a de Broglie wavelength of 0.2 nm (2 Å)?",
      option_a: "37.5 eV",
      option_b: "18.8 eV",
      option_c: "75.0 eV",
      option_d: "9.4 eV",
      correct_option: "A",
      explanation: "Step 1: The de Broglie wavelength of an electron is related to its kinetic energy (in eV) by:\nλ = √(150 / KE) Å.\nStep 2: Rearranging for kinetic energy:\nKE = 150 / λ² (where λ is in Å).\nStep 3: Substituting λ = 2 Å:\nKE = 150 / (2)² = 150 / 4 = 37.5 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 521,
    similarQuestion: {
      question: "The famous Davisson and Germer experiment directly demonstrated and confirmed the:",
      option_a: "Wave nature of electrons",
      option_b: "Particle nature of photons",
      option_c: "Wave nature of electromagnetic radiation",
      option_d: "Quantization of electric charge",
      correct_option: "A",
      explanation: "Step 1: The Davisson-Germer experiment scattered slow electrons off a nickel crystal lattice and observed distinct diffraction peaks similar to X-ray Bragg diffraction.\nStep 2: This provided the first conclusive experimental proof for de Broglie's hypothesis that moving matter particles possess wave-like properties.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 523,
    similarQuestion: {
      question: "The effective dynamic (inertial) mass of a photon of frequency ν and wavelength λ traveling in vacuum is given by:",
      option_a: "h / (c λ)",
      option_b: "hν / c²",
      option_c: "Both (A) and (B)",
      option_d: "Zero",
      correct_option: "C",
      explanation: "Step 1: By Einstein's mass-energy equivalence, E = m c², and Planck's quantum equation, E = hν.\nStep 2: Equating the two expressions:\nm c² = hν ⇒ m = hν / c².\nStep 3: Since c = νλ (or ν = c / λ):\nm = h(c / λ) / c² = h / (c λ).\nBoth forms are completely equivalent and physically valid.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 525,
    similarQuestion: {
      question: "Monochromatic light of wavelength 4000 Å is incident on a metal surface having a work function of 2.1 eV. What is the maximum velocity of the emitted photoelectrons? (Mass of electron m = 9.1 × 10⁻³¹ kg, 1 eV = 1.6 × 10⁻¹⁹ J)",
      option_a: "5.9 × 10⁵ m/s",
      option_b: "1.0 × 10⁵ m/s",
      option_c: "2.5 × 10⁶ m/s",
      option_d: "8.4 × 10⁴ m/s",
      correct_option: "A",
      explanation: "Step 1: The energy of incident photons is:\nE = 12400 / 4000 = 3.1 eV.\nStep 2: By Einstein's photoelectric equation, the maximum kinetic energy is:\nKEₘₐₓ = E - Φ = 3.1 eV - 2.1 eV = 1.0 eV = 1.6 × 10⁻¹⁹ J.\nStep 3: Relate kinetic energy to maximum velocity:\n(1/2) m vₘₐₓ² = 1.6 × 10⁻¹⁹ J\nvₘₐₓ = √(2 × 1.6 × 10⁻¹⁹ / (9.1 × 10⁻³¹)) = √(3.516 × 10¹¹) ≈ 5.93 × 10⁵ m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 527,
    similarQuestion: {
      question: "A point source of ultraviolet light of frequency ν is placed at a distance of 0.5 m from a photoelectric cell, and the stopping potential is measured to be V₀. If the distance between the source and the cell is increased to 1.5 m without changing the frequency, the stopping potential will be:",
      option_a: "V₀",
      option_b: "V₀ / 3",
      option_c: "V₀ / 9",
      option_d: "3 V₀",
      correct_option: "A",
      explanation: "Step 1: The stopping potential V₀ is governed by Einstein's photoelectric equation:\ne V₀ = hν - Φ.\nStep 2: This depends solely on the frequency ν of the incident photons and the work function Φ of the photosensitive surface.\nStep 3: Changing the distance alters only the intensity of the incident radiation (which affects saturation photocurrent), but does not alter photon energy or stopping potential.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 531,
    similarQuestion: {
      question: "When photons of energy 5.5 eV illuminate a photosensitive surface, photoelectrons are emitted with a maximum kinetic energy of 3.2 eV. What is the stopping potential required to cut off the photocurrent completely?",
      option_a: "2.3 V",
      option_b: "3.2 V",
      option_c: "5.5 V",
      option_d: "8.7 V",
      correct_option: "B",
      explanation: "Step 1: The stopping potential V₀ is the retarding potential needed to halt the fastest emitted photoelectrons:\ne V₀ = KEₘₐₓ.\nStep 2: Given KEₘₐₓ = 3.2 eV:\ne V₀ = 3.2 eV ⇒ V₀ = 3.2 V.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 534,
    similarQuestion: {
      question: "The work functions of Cesium and Platinum are 2.14 eV and 5.65 eV, respectively. Which of these metals will exhibit photoelectric emission when irradiated with light of wavelength 4500 Å?",
      option_a: "Only Cesium",
      option_b: "Only Platinum",
      option_c: "Both Cesium and Platinum",
      option_d: "Neither metal",
      correct_option: "A",
      explanation: "Step 1: The energy of photons of wavelength 4500 Å is:\nE = 12400 / 4500 ≈ 2.76 eV.\nStep 2: Photoelectric emission can occur only if the photon energy exceeds the work function of the metal (E ≥ Φ).\nStep 3: For Cesium: E (2.76 eV) > Φ (2.14 eV), so emission occurs.\nFor Platinum: E (2.76 eV) < Φ (5.65 eV), so no emission can occur.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 537,
    similarQuestion: {
      question: "Two metals X and Y have work functions in the ratio Φ_X : Φ_Y = 1 : 3. Monochromatic lights of frequencies ν and 3ν are incident on X and Y, respectively. What is the ratio of the maximum kinetic energies of the photoelectrons emitted from X and Y?",
      option_a: "1 : 1",
      option_b: "1 : 3",
      option_c: "1 : 9",
      option_d: "3 : 1",
      correct_option: "B",
      explanation: "Step 1: Let the work functions be Φ_X = Φ and Φ_Y = 3Φ.\nStep 2: By Einstein's photoelectric equation:\nKE_X = hν - Φ_X = hν - Φ.\nKE_Y = h(3ν) - Φ_Y = 3hν - 3Φ = 3(hν - Φ).\nStep 3: Taking the ratio of their kinetic energies:\nKE_X / KE_Y = (hν - Φ) / [3(hν - Φ)] = 1 / 3 = 1 : 3.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 539,
    similarQuestion: {
      question: "When radiation of wavelength λ is incident on a metal surface, the stopping potential is 3.6 V. When illuminated by radiation of wavelength 2λ, the stopping potential drops to 1.2 V. What is the threshold wavelength of this metallic surface?",
      option_a: "2λ",
      option_b: "3λ",
      option_c: "4λ",
      option_d: "5λ",
      correct_option: "C",
      explanation: "Step 1: Write Einstein's equation for both cases:\nhc / λ - Φ = 3.6 e  ...(1)\nhc / (2λ) - Φ = 1.2 e  ...(2)\nStep 2: Subtract equation (2) from equation (1):\nhc / λ - hc / (2λ) = 3.6 e - 1.2 e\nhc / (2λ) = 2.4 e ⇒ hc / λ = 4.8 e.\nStep 3: Substitute hc / λ into equation (1) to determine the work function Φ:\n4.8 e - Φ = 3.6 e ⇒ Φ = 1.2 e.\nStep 4: The threshold wavelength λ₀ is given by Φ = hc / λ₀:\nλ₀ = hc / Φ = hc / (1.2 e) = 4 × (hc / 4.8 e) = 4λ.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 544,
    similarQuestion: {
      question: "A photosensitive metal surface has work function hν₀. When photons of energy 3hν₀ fall on it, the photoelectrons have a maximum speed of 2 × 10⁶ m/s. If the photon energy is increased to 9hν₀, what will be the maximum speed of the emitted photoelectrons?",
      option_a: "4 × 10⁶ m/s",
      option_b: "6 × 10⁶ m/s",
      option_c: "8 × 10⁶ m/s",
      option_d: "2 × 10⁶ m/s",
      correct_option: "A",
      explanation: "Step 1: In the first case:\nKE₁ = (1/2) m v₁² = 3hν₀ - hν₀ = 2hν₀.\nStep 2: In the second case:\nKE₂ = (1/2) m v₂² = 9hν₀ - hν₀ = 8hν₀ = 4 × (2hν₀) = 4 KE₁.\nStep 3: Since v ∝ √KE:\nv₂ / v₁ = √(KE₂ / KE₁) = √4 = 2.\nv₂ = 2 × v₁ = 2 × (2 × 10⁶ m/s) = 4 × 10⁶ m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 547,
    similarQuestion: {
      question: "What is the ratio of the total energy of an electron in a hydrogen atom in the ground state to that in the second excited state?",
      option_a: "1 : 9",
      option_b: "9 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "B",
      explanation: "Step 1: The total energy of an electron in the n-th Bohr orbit of hydrogen is:\nEₙ = -13.6 / n² eV.\nStep 2: Ground state corresponds to n = 1: E₁ = -13.6 / 1² = -13.6 eV.\nSecond excited state corresponds to n = 3: E₃ = -13.6 / 3² = -13.6 / 9 eV.\nStep 3: The ratio of energies is:\nE₁ / E₃ = (-13.6) / (-13.6 / 9) = 9 / 1 = 9 : 1.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 561,
    similarQuestion: {
      question: "An electron in a hydrogen atom undergoes a transition from the orbit n = 5 to n = 2. What is the wave number (ν̄ = 1/λ) of the emitted spectral line in terms of Rydberg's constant R?",
      option_a: "21R / 100",
      option_b: "3R / 16",
      option_c: "5R / 36",
      option_d: "25R / 16",
      correct_option: "A",
      explanation: "Step 1: The wave number ν̄ for transition from n₂ to n₁ is given by the Rydberg formula:\nν̄ = R (1 / n₁² - 1 / n₂²).\nStep 2: Here n₁ = 2 and n₂ = 5:\nν̄ = R (1 / 2² - 1 / 5²) = R (1 / 4 - 1 / 25).\nStep 3: Calculating the difference:\nν̄ = R (25 - 4) / 100 = 21R / 100.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 563,
    similarQuestion: {
      question: "What is the ratio of the maximum wavelength of the Lyman series to the maximum wavelength of the Balmer series in the hydrogen spectrum?",
      option_a: "5 : 27",
      option_b: "27 : 5",
      option_c: "4 : 9",
      option_d: "9 : 4",
      correct_option: "A",
      explanation: "Step 1: Maximum wavelength corresponds to the transition between adjacent energy levels (minimum energy difference).\nFor Lyman series (n = 2 → 1):\n1 / λ_max,L = R (1 / 1² - 1 / 2²) = 3R / 4 ⇒ λ_max,L = 4 / (3R).\nStep 2: For Balmer series (n = 3 → 2):\n1 / λ_max,B = R (1 / 2² - 1 / 3²) = 5R / 36 ⇒ λ_max,B = 36 / (5R).\nStep 3: Taking the ratio:\nλ_max,L / λ_max,B = [4 / (3R)] / [36 / (5R)] = (4 / 3) × (5 / 36) = 20 / 108 = 5 / 27.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 565,
    similarQuestion: {
      question: "In the hydrogen atom emission spectrum, the Balmer transition from n = 3 to n = 2 corresponds to red light. What colour in the visible spectrum does the transition from n = 4 to n = 2 correspond to?",
      option_a: "Blue-green (cyan)",
      option_b: "Infrared",
      option_c: "Red",
      option_d: "Yellow",
      correct_option: "A",
      explanation: "Step 1: The transition from n = 3 to n = 2 (H-α line) has a photon energy of 1.89 eV and wavelength ~656 nm, which appears red.\nStep 2: The transition from n = 4 to n = 2 (H-β line) has a higher photon energy of 2.55 eV and shorter wavelength ~486 nm.\nStep 3: In the visible electromagnetic spectrum, light with wavelength ~486 nm corresponds to blue-green (cyan) light.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 568,
    similarQuestion: {
      question: "When an electron in a hydrogen atom transitions from n = 3 to n = 1, it emits radiation of wavelength λ₁. When it transitions from n = 2 to n = 1, the emitted wavelength is λ₂. What is the ratio λ₁ / λ₂?",
      option_a: "27 / 32",
      option_b: "32 / 27",
      option_c: "8 / 9",
      option_d: "9 / 8",
      correct_option: "A",
      explanation: "Step 1: For transition n = 3 → 1:\n1 / λ₁ = R (1 / 1² - 1 / 3²) = 8R / 9 ⇒ λ₁ = 9 / (8R).\nStep 2: For transition n = 2 → 1:\n1 / λ₂ = R (1 / 1² - 1 / 2²) = 3R / 4 ⇒ λ₂ = 4 / (3R).\nStep 3: Calculating the ratio λ₁ / λ₂:\nλ₁ / λ₂ = [9 / (8R)] / [4 / (3R)] = (9 / 8) × (3 / 4) = 27 / 32.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 574,
    similarQuestion: {
      question: "A spectral line of wavelength 1216 Å observed in the emission spectrum of atomic hydrogen belongs to which of the following spectral series?",
      option_a: "Lyman series",
      option_b: "Balmer series",
      option_c: "Paschen series",
      option_d: "Pfund series",
      correct_option: "A",
      explanation: "Step 1: A wavelength of 1216 Å lies in the ultraviolet (UV) region of the electromagnetic spectrum.\nStep 2: In the hydrogen emission spectrum, the Lyman series (transitions down to n = 1) falls entirely in the ultraviolet region, with its first line (n = 2 → 1) having λ = 1216 Å.\nStep 3: Balmer series lies in the visible region (4000 Å to 7000 Å), and Paschen, Brackett, and Pfund lie in the infrared region.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 578,
    similarQuestion: {
      question: "When an electron in a hydrogen atom transitions from the 2nd to the 4th stationary orbit, what is the change in its orbital angular momentum? (h = 6.63 × 10⁻³⁴ J·s)",
      option_a: "2.11 × 10⁻³⁴ J·s",
      option_b: "1.05 × 10⁻³⁴ J·s",
      option_c: "3.16 × 10⁻³⁴ J·s",
      option_d: "4.22 × 10⁻³⁴ J·s",
      correct_option: "A",
      explanation: "Step 1: According to Bohr's quantization condition, angular momentum in the n-th orbit is:\nLₙ = n (h / 2π).\nStep 2: The change in angular momentum for transition from n₁ = 2 to n₂ = 4 is:\nΔL = L₄ - L₂ = (4 - 2) × (h / 2π) = 2 × (h / 2π) = h / π.\nStep 3: Substitute h = 6.63 × 10⁻³⁴ J·s:\nΔL = (6.63 × 10⁻³⁴) / 3.1416 ≈ 2.11 × 10⁻³⁴ J·s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 582,
    similarQuestion: {
      question: "What is the ratio of the longest to the shortest wavelength in the Balmer series of the hydrogen spectrum?",
      option_a: "9 / 5",
      option_b: "5 / 9",
      option_c: "4 / 3",
      option_d: "36 / 5",
      correct_option: "A",
      explanation: "Step 1: For the Balmer series (n₁ = 2):\nLongest wavelength occurs for n₂ = 3:\n1 / λ_max = R (1 / 4 - 1 / 9) = 5R / 36 ⇒ λ_max = 36 / (5R).\nStep 2: Shortest wavelength occurs for n₂ = ∞:\n1 / λ_min = R (1 / 4 - 0) = R / 4 ⇒ λ_min = 4 / R.\nStep 3: Taking the ratio:\nλ_max / λ_min = [36 / (5R)] / (4 / R) = 36 / 20 = 9 / 5.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 589,
    similarQuestion: {
      question: "According to classical electromagnetic theory, an accelerating charged electron orbiting the nucleus should continuously emit radiation. As a consequence, the predicted path of the electron would be a:",
      option_a: "Spiral path terminating at the nucleus",
      option_b: "Stable circular orbit of fixed radius",
      option_c: "Uniform expanding helix",
      option_d: "Parabolic trajectory escaping the atom",
      correct_option: "A",
      explanation: "Step 1: According to Maxwell's classical electrodynamics, an accelerating charge continuously radiates energy in the form of electromagnetic waves.\nStep 2: As an orbiting electron radiates energy, its orbital radius must shrink continuously.\nStep 3: As a result, the electron would follow an inward spiral trajectory and collapse into the nucleus in ~10⁻¹⁰ seconds, predicting that classical atoms would be unstable.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 590,
    similarQuestion: {
      question: "Which quantum state (principal quantum number n) of doubly ionized lithium (Li²⁺, Z = 3) has an orbital radius 3 times the Bohr radius (ground state radius) of a hydrogen atom?",
      option_a: "n = 3",
      option_b: "n = 9",
      option_c: "n = 1",
      option_d: "n = 6",
      correct_option: "A",
      explanation: "Step 1: The radius of the n-th Bohr orbit for a hydrogen-like ion is:\nrₙ = r₀ (n² / Z), where r₀ is the Bohr radius of hydrogen.\nStep 2: For Li²⁺, Z = 3. We are given rₙ = 3 r₀:\nr₀ (n² / 3) = 3 r₀.\nStep 3: Solving for n:\nn² / 3 = 3 ⇒ n² = 9 ⇒ n = 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 591,
    similarQuestion: {
      question: "In a hydrogen atom, an electron transitions from the n = 3 state to the ground state n = 1. What is the recoil momentum imparted to the hydrogen atom?",
      option_a: "6.45 × 10⁻²⁷ N·s",
      option_b: "3.4 × 10⁻²⁷ N·s",
      option_c: "1.21 × 10⁻²⁶ N·s",
      option_d: "4.8 × 10⁻²⁷ N·s",
      correct_option: "A",
      explanation: "Step 1: The energy emitted during the transition from n = 3 to n = 1 is:\nΔE = 13.6 (1 / 1² - 1 / 3²) = 13.6 × (8 / 9) ≈ 12.09 eV.\nStep 2: Convert energy to joules:\nΔE = 12.09 × 1.6 × 10⁻¹⁹ J ≈ 1.934 × 10⁻¹⁸ J.\nStep 3: By conservation of momentum, the recoil momentum of the atom equals the photon momentum:\np = ΔE / c = (1.934 × 10⁻¹⁸ J) / (3.0 × 10⁸ m/s) ≈ 6.45 × 10⁻²⁷ N·s.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 61 Part 1.");

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
  console.log("Set 61 Part 1 completed successfully!");
}

main().catch(console.error);
