const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 4241,
    similarQuestion: {
      question: "If the energy of an electron in the first Bohr orbit of a hydrogen atom is -1312 kJ/mol, what is its energy in the third Bohr orbit (n = 3)?",
      option_a: "-437.3 kJ/mol",
      option_b: "-145.8 kJ/mol",
      option_c: "-328.0 kJ/mol",
      option_d: "-82.0 kJ/mol",
      correct_option: "B",
      explanation: "The energy of an electron in the n-th Bohr orbit is given by E_n = E₁ / n². For n = 3: E₃ = -1312 kJ/mol / 3² = -1312 / 9 ≈ -145.78 kJ/mol ≈ -145.8 kJ/mol. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4242,
    similarQuestion: {
      question: "According to Heisenberg's uncertainty principle, what is the minimum uncertainty in the velocity of an electron if its position is determined with an uncertainty of 0.20 Å (0.20 × 10⁻¹⁰ m)? (Take m_e = 9.1 × 10⁻³¹ kg, h = 6.626 × 10⁻³⁴ J·s)",
      option_a: "2.9 × 10⁶ m/s",
      option_b: "5.8 × 10⁶ m/s",
      option_c: "1.4 × 10⁶ m/s",
      option_d: "7.2 × 10⁵ m/s",
      correct_option: "A",
      explanation: "From Heisenberg's relation Δx · m Δv ≥ h / (4π): Δv = h / (4π m Δx) = (6.626 × 10⁻³⁴) / (4 × 3.1416 × 9.1 × 10⁻³¹ × 0.20 × 10⁻¹⁰) ≈ 2.897 × 10⁶ m/s ≈ 2.9 × 10⁶ m/s. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4243,
    similarQuestion: {
      question: "Which quantum number determines the three-dimensional spatial orientation of an atomic orbital relative to coordinate axes?",
      option_a: "Principal quantum number (n)",
      option_b: "Azimuthal quantum number (l)",
      option_c: "Magnetic orbital quantum number (m_l)",
      option_d: "Electron spin quantum number (m_s)",
      correct_option: "C",
      explanation: "The magnetic orbital quantum number (m_l) designates the three-dimensional spatial orientation of an atomic orbital relative to a set of coordinate axes. It takes (2l + 1) integer values from -l to +l. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4244,
    similarQuestion: {
      question: "Which of the following sets of four quantum numbers is NOT permissible for an electron in an atom?",
      option_a: "n = 3, l = 2, m_l = -1, m_s = +1/2",
      option_b: "n = 4, l = 0, m_l = 0, m_s = -1/2",
      option_c: "n = 2, l = 2, m_l = +1, m_s = +1/2",
      option_d: "n = 3, l = 1, m_l = 0, m_s = +1/2",
      correct_option: "C",
      explanation: "For any principal quantum number n, the azimuthal quantum number l can only range from 0 to (n - 1). For n = 2, the allowed values of l are only 0 and 1. An orbital with l = 2 (a 2d orbital) cannot exist. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4245,
    similarQuestion: {
      question: "If the uncertainty in position (Δx) of a particle of mass m is equal to its de Broglie wavelength (λ = h/p), what is the ratio of the uncertainty in momentum (Δp) to its actual momentum p? (Take Δx · Δp = h / (4π))",
      option_a: "1 / (2π)",
      option_b: "1 / (4π)",
      option_c: "1 / π",
      option_d: "4π",
      correct_option: "B",
      explanation: "Given Δx = λ = h / p. By Heisenberg's relation: Δx · Δp = h / (4π) ⇒ (h / p) · Δp = h / (4π) ⇒ Δp / p = 1 / (4π). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4246,
    similarQuestion: {
      question: "The maximum number of electrons that can be accommodated in a subshell characterized by azimuthal quantum number l is given by:",
      option_a: "2l + 1",
      option_b: "4l + 2",
      option_c: "2n²",
      option_d: "4l - 2",
      correct_option: "B",
      explanation: "A subshell of quantum number l contains (2l + 1) orbitals. Each orbital can accommodate a maximum of 2 electrons with opposite spins according to Pauli's exclusion principle. Thus, maximum electrons = 2(2l + 1) = 4l + 2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4247,
    similarQuestion: {
      question: "What is the de Broglie wavelength associated with a cricket ball of mass 0.15 kg moving with a velocity of 40 m/s? (Take h = 6.63 × 10⁻³⁴ J·s)",
      option_a: "1.1 × 10⁻³⁴ m",
      option_b: "1.1 × 10⁻³³ m",
      option_c: "2.2 × 10⁻³³ m",
      option_d: "4.4 × 10⁻³⁴ m",
      correct_option: "A",
      explanation: "The de Broglie wavelength is λ = h / (m v). Substituting h = 6.63 × 10⁻³⁴ J·s, m = 0.15 kg, and v = 40 m/s: λ = (6.63 × 10⁻³⁴) / (0.15 × 40) = (6.63 × 10⁻³⁴) / 6.0 ≈ 1.105 × 10⁻³⁴ m ≈ 1.1 × 10⁻³⁴ m. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4248,
    similarQuestion: {
      question: "What is the total number of atomic orbitals associated with the third principal energy shell (n = 3)?",
      option_a: "3",
      option_b: "6",
      option_c: "9",
      option_d: "18",
      correct_option: "C",
      explanation: "The total number of orbitals in any principal shell n is given by n². For n = 3: Number of orbitals = 3² = 9 (one 3s, three 3p, and five 3d orbitals). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4249,
    similarQuestion: {
      question: "According to the Aufbau principle, in the sixth period of the periodic table (n = 6), the correct chronological sequence of orbital filling is:",
      option_a: "6s → 4f → 5d → 6p",
      option_b: "6s → 5d → 4f → 6p",
      option_c: "6s → 6p → 5d → 4f",
      option_d: "4f → 5d → 6s → 6p",
      correct_option: "A",
      explanation: "By the (n + l) rule: 6s (6+0=6) < 4f (4+3=7) < 5d (5+2=7) < 6p (6+1=7). For equal sum 7, orbitals with lower n are filled first (4f before 5d before 6p). Hence, the order is 6s → 4f → 5d → 6p, or ns → (n-2)f → (n-1)d → np. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4250,
    similarQuestion: {
      question: "What is the correct set of four quantum numbers (n, l, m_l, m_s) for the valence (outermost) electron of a potassium atom (K, Z = 19)?",
      option_a: "3, 0, 0, +1/2",
      option_b: "4, 0, 0, +1/2",
      option_c: "4, 1, 0, +1/2",
      option_d: "3, 2, 0, +1/2",
      correct_option: "B",
      explanation: "The ground-state electronic configuration of potassium (Z = 19) is [Ar] 4s¹. The valence electron is in the 4s orbital: n = 4, l = 0 (s-subshell), m_l = 0, and m_s = +1/2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4251,
    similarQuestion: {
      question: "What is the orbital angular momentum of an electron present in an s-orbital?",
      option_a: "0",
      option_b: "h / 2π",
      option_c: "√2 (h / 2π)",
      option_d: "√6 (h / 2π)",
      correct_option: "A",
      explanation: "Orbital angular momentum is L = √[l(l + 1)] ℏ. For an s-orbital, azimuthal quantum number l = 0. Therefore, L = √[0(0 + 1)] ℏ = 0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4252,
    similarQuestion: {
      question: "What is the maximum number of electrons in an atom that can have the following set of quantum numbers: n = 4, l = 2, m_l = 0?",
      option_a: "1",
      option_b: "2",
      option_c: "6",
      option_d: "10",
      correct_option: "B",
      explanation: "Specifying n = 4, l = 2, and m_l = 0 defines a single atomic orbital (the 4d_z² orbital). By Pauli's exclusion principle, an individual orbital can accommodate at most 2 electrons with opposite spins (m_s = +1/2 and -1/2). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4253,
    similarQuestion: {
      question: "Bohr's energy expression for a hydrogenic atom is E_n = -R_H (Z² / n²). Which of the following statements is INCORRECT regarding this equation?",
      option_a: "The negative sign indicates that the electron is electrostatically bound to the nucleus",
      option_b: "As n increases, the energy E_n becomes less negative (approaching 0 at infinity)",
      option_c: "An electron in n = 1 has a more negative energy than in n = 4, meaning it is more loosely bound to the nucleus",
      option_d: "The difference in energy between two levels (ΔE = E₂ - E₁) determines the frequency of radiation absorbed or emitted",
      correct_option: "C",
      explanation: "A more negative energy indicates that the electron is more stable and more tightly bound to the positive nucleus. An electron in n = 1 has the most negative energy (-13.6 eV), meaning it is the most tightly bound state, not loosely bound. Therefore, statement (C) is incorrect. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4254,
    similarQuestion: {
      question: "What is the energy of a single photon of ultraviolet light having a wavelength of 66.3 nm? (Take h = 6.63 × 10⁻³⁴ J·s, c = 3.0 × 10⁸ m/s)",
      option_a: "1.0 × 10⁻¹⁸ J",
      option_b: "3.0 × 10⁻¹⁸ J",
      option_c: "4.5 × 10⁻¹⁸ J",
      option_d: "6.6 × 10⁻¹⁹ J",
      correct_option: "B",
      explanation: "Energy of a photon is E = h c / λ. Substituting h = 6.63 × 10⁻³⁴ J·s, c = 3.0 × 10⁸ m/s, and λ = 66.3 × 10⁻⁹ m: E = (6.63 × 10⁻³⁴ × 3.0 × 10⁸) / (66.3 × 10⁻⁹) = 3.0 × 10⁻¹⁸ J. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4255,
    similarQuestion: {
      question: "The orbital angular momentum of an electron in an f-orbital is:",
      option_a: "√6 (h / 2π)",
      option_b: "√12 (h / 2π)",
      option_c: "√20 (h / 2π)",
      option_d: "√2 (h / 2π)",
      correct_option: "B",
      explanation: "For an f-orbital, azimuthal quantum number l = 3. Orbital angular momentum L = √[l(l + 1)] (h / 2π) = √[3(3 + 1)] (h / 2π) = √12 (h / 2π) = 2√3 (h / 2π). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4256,
    similarQuestion: {
      question: "Two electrons present in the same p_x atomic orbital differ from each other in the value of their:",
      option_a: "Principal quantum number (n)",
      option_b: "Azimuthal quantum number (l)",
      option_c: "Magnetic quantum number (m_l)",
      option_d: "Spin quantum number (m_s)",
      correct_option: "D",
      explanation: "Electrons in the same orbital share identical values of n, l, and m_l. According to Pauli's Exclusion Principle, no two electrons can have all four quantum numbers identical, so they must have opposite spins (m_s = +1/2 and -1/2). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4257,
    similarQuestion: {
      question: "What is the maximum number of electrons that can be accommodated in the subshell characterized by n = 4 and l = 3?",
      option_a: "2",
      option_b: "6",
      option_c: "10",
      option_d: "14",
      correct_option: "D",
      explanation: "The azimuthal quantum number l = 3 designates an f-subshell. The maximum number of electrons in any subshell is 4l + 2. For l = 3: Maximum electrons = 4(3) + 2 = 14 electrons (residing in 7 f-orbitals). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4258,
    similarQuestion: {
      question: "Which of the following statements regarding atomic orbitals is FALSE?",
      option_a: "In a multi-electron atom, the 2s orbital has lower energy than the 2p subshell",
      option_b: "In a hydrogen atom, the 2s and 2p orbitals are degenerate (have equal energy)",
      option_c: "In a hydrogen atom, the 2s orbital has lower energy than the 2p orbital",
      option_d: "The total number of nodes in an orbital is given by (n - 1)",
      correct_option: "C",
      explanation: "In hydrogen and hydrogen-like single-electron systems, energy depends solely on the principal quantum number n. Consequently, the 2s and 2p orbitals have exactly equal energy (degenerate). Thus, statement (C) is false. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4259,
    similarQuestion: {
      question: "According to Hund's rule of maximum multiplicity, what is the ground-state electron configuration of a nitrogen atom (Z = 7)?",
      option_a: "1s² 2s² 2p_x² 2p_y¹ 2p_z⁰",
      option_b: "1s² 2s² 2p_x¹ 2p_y¹ 2p_z¹ with parallel spins",
      option_c: "1s² 2s² 2p_x³",
      option_d: "1s² 2s¹ 2p_x² 2p_y²",
      correct_option: "B",
      explanation: "Hund's rule dictates that in degenerate orbitals, pairing does not take place until each orbital is singly occupied with electrons having parallel spins. For nitrogen (Z = 7), the 2p configuration is 2p_x¹ 2p_y¹ 2p_z¹ with parallel spins. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4260,
    similarQuestion: {
      question: "According to the (n + l) rule, arrange the following atomic orbitals in order of decreasing energy: 3d, 4p, 5s, 4d.",
      option_a: "4d > 5s > 4p > 3d",
      option_b: "4d > 4p > 5s > 3d",
      option_c: "5s > 4d > 4p > 3d",
      option_d: "4d > 3d > 5s > 4p",
      correct_option: "A",
      explanation: "Using (n + l) values: 4d (4+2=6); 5s (5+0=5); 4p (4+1=5); 3d (3+2=5). For equal (n + l) = 5, higher n has higher energy: 5s > 4p > 3d. Thus, decreasing order of energy is 4d > 5s > 4p > 3d. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4261,
    similarQuestion: {
      question: "In a hydrogen atom, what is the de Broglie wavelength of an electron in the third Bohr orbit (n = 3)? (a₀ = 52.9 pm)",
      option_a: "158.7 π pm",
      option_b: "317.4 π pm",
      option_c: "476.1 π pm",
      option_d: "952.2 π pm",
      correct_option: "B",
      explanation: "Orbit radius r₃ = 3² a₀ = 9 a₀. From Bohr-de Broglie condition: 2 π r₃ = 3 λ ⇒ λ = (2/3) π r₃ = (2/3) π (9 a₀) = 6 π a₀. Substituting a₀ = 52.9 pm: λ = 6 × 52.9 π = 317.4 π pm. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4262,
    similarQuestion: {
      question: "What is the calculated spin-only magnetic moment (in Bohr Magnetons, BM) for a divalent manganese ion (Mn²⁺, Z = 25)?",
      option_a: "3.87 BM",
      option_b: "4.90 BM",
      option_c: "5.92 BM",
      option_d: "1.73 BM",
      correct_option: "C",
      explanation: "Configuration of Mn²⁺ is [Ar] 3d⁵. With 5 unpaired electrons (n = 5), spin-only magnetic moment is μ_s = √[n(n + 2)] = √[5(7)] = √35 ≈ 5.92 BM. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4263,
    similarQuestion: {
      question: "In the nuclide ²³⁵₉₂U, the respective numbers of protons, neutrons, and electrons in a neutral atom are:",
      option_a: "92, 143, 92",
      option_b: "92, 235, 92",
      option_c: "143, 92, 143",
      option_d: "92, 143, 143",
      correct_option: "A",
      explanation: "For a neutral atom of ²³⁵₉₂U: Number of protons = Z = 92; Number of electrons = Z = 92; Number of neutrons = A - Z = 235 - 92 = 143. Therefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Logged in successfully, token received.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/practice-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}: ${err}`);
    }
  }
  console.log(`Set 18 Part 2 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
