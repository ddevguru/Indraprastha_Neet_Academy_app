const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 4264,
    similarQuestion: {
      question: "If the mass of a neutron is assumed to become 1.5 times its original value and the mass of a proton becomes half of its original value, what would be the percentage change in the atomic mass of a carbon-12 atom (¹²₆C)?",
      option_a: "Decreases by 25%",
      option_b: "Remains unchanged",
      option_c: "Increases by 25%",
      option_d: "Increases by 50%",
      correct_option: "B",
      explanation: "A neutral ¹²₆C atom contains 6 protons and 6 neutrons (electron mass is negligible). Original atomic mass ≈ 6(1) + 6(1) = 12 u. New mass ≈ 6(0.5) + 6(1.5) = 3 + 9 = 12 u. Because the decrease in proton mass is exactly balanced by the increase in neutron mass, the atomic mass remains completely unchanged (0% change). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4265,
    similarQuestion: {
      question: "If the mass of a proton is halved while the mass of a neutron remains unchanged, the approximate atomic mass of a nitrogen atom (¹⁴₇N) will:",
      option_a: "Decrease by 50%",
      option_b: "Decrease by 25%",
      option_c: "Increase by 25%",
      option_d: "Remain unchanged",
      correct_option: "B",
      explanation: "A ¹⁴₇N nucleus has 7 protons and 7 neutrons. Original mass ≈ 7(1) + 7(1) = 14 u. With halved proton mass: New mass ≈ 7(0.5) + 7(1) = 3.5 + 7 = 10.5 u. Percentage decrease = [(14 - 10.5) / 14] × 100 = (3.5 / 14) × 100 = 25%. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4266,
    similarQuestion: {
      question: "What is the wavelength (in Å) of a photon having an energy of 3.313 × 10⁻¹⁹ J? (h = 6.626 × 10⁻³⁴ J·s, c = 3.0 × 10⁸ m/s, 1 Å = 10⁻¹⁰ m)",
      option_a: "3000 Å",
      option_b: "6000 Å",
      option_c: "1200 Å",
      option_d: "4500 Å",
      correct_option: "B",
      explanation: "Wavelength λ = h c / E = (6.626 × 10⁻³⁴ × 3.0 × 10⁸) / (3.313 × 10⁻¹⁹) = (1.9878 × 10⁻²⁵) / (3.313 × 10⁻¹⁹) = 6.0 × 10⁻⁷ m = 6000 × 10⁻¹⁰ m = 6000 Å. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4267,
    similarQuestion: {
      question: "What is the orbital angular momentum of an electron in a 3p orbital?",
      option_a: "0",
      option_b: "h / 2π",
      option_c: "√2 (h / 2π)",
      option_d: "√6 (h / 2π)",
      correct_option: "C",
      explanation: "Orbital angular momentum is L = √[l(l + 1)] (h / 2π). For any p-orbital, azimuthal quantum number l = 1. Therefore, L = √[1(1 + 1)] (h / 2π) = √2 (h / 2π). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4268,
    similarQuestion: {
      question: "Neglecting slight nuclear motion (reduced mass effect), the ratio of the radius of the first Bohr orbit of protium (¹H) to that of tritium (³H) is:",
      option_a: "1 : 1",
      option_b: "1 : 3",
      option_c: "3 : 1",
      option_d: "1 : 9",
      correct_option: "A",
      explanation: "The radius of the n-th Bohr orbit is given by r_n = n² a₀ / Z. Since protium and tritium are isotopes with identical nuclear charge Z = 1 and both are in the ground state (n = 1), their Bohr radii are identical (ratio = 1 : 1). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4269,
    similarQuestion: {
      question: "If the energy of an electron in the second Bohr orbit of a hydrogen atom is -3.4 eV, what is its energy in the fourth Bohr orbit (n = 4)?",
      option_a: "-0.85 eV",
      option_b: "-1.51 eV",
      option_c: "-0.54 eV",
      option_d: "-13.6 eV",
      correct_option: "A",
      explanation: "Since E_n ∝ 1/n²: E₄ / E₂ = 2² / 4² = 4 / 16 = 1/4 ⇒ E₄ = E₂ / 4 = -3.4 eV / 4 = -0.85 eV. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4270,
    similarQuestion: {
      question: "When an electron in a hydrogen atom is promoted from the K-shell (n = 1) to the M-shell (n = 3), how do its kinetic energy (K) and potential energy (U) change?",
      option_a: "K decreases and U increases",
      option_b: "K increases and U decreases",
      option_c: "Both K and U increase",
      option_d: "Both K and U decrease",
      correct_option: "A",
      explanation: "In Bohr's atom: Kinetic energy K = +13.6/n² eV and Potential energy U = -27.2/n² eV. As n increases from 1 to 3, K decreases (from 13.6 eV to 1.51 eV), while U becomes less negative, meaning it increases (from -27.2 eV to -3.02 eV). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4271,
    similarQuestion: {
      question: "The energy of an electron in a Bohr orbit of hydrogen is given by E_n = -1312 / n² kJ/mol. If the energy of an excited state is -82 kJ/mol, what is the value of n?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "5",
      correct_option: "C",
      explanation: "Using E_n = -1312 / n² = -82: n² = 1312 / 82 = 16 ⇒ n = 4. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4272,
    similarQuestion: {
      question: "If the ionization energy of a hydrogen atom is 13.6 eV, what is the excitation energy required to transition an electron from the ground state (n = 1) to the first excited state (n = 2)?",
      option_a: "3.4 eV",
      option_b: "10.2 eV",
      option_c: "12.1 eV",
      option_d: "13.6 eV",
      correct_option: "B",
      explanation: "Ground state energy E₁ = -13.6 eV. First excited state (n = 2) energy E₂ = -13.6 / 2² = -3.4 eV. The excitation energy is ΔE = E₂ - E₁ = -3.4 eV - (-13.6 eV) = 10.2 eV. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4273,
    similarQuestion: {
      question: "The second line of the Balmer series in the hydrogen emission spectrum corresponds to the electronic transition:",
      option_a: "n = 3 → n = 2",
      option_b: "n = 4 → n = 2",
      option_c: "n = 5 → n = 2",
      option_d: "n = 4 → n = 1",
      correct_option: "B",
      explanation: "In the Balmer series, transitions terminate at n₁ = 2. The first line (H-α) is from n = 3 → n = 2. The second line (H-β) is from n = 4 → n = 2. The third line (H-γ) is from n = 5 → n = 2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4274,
    similarQuestion: {
      question: "What is the ratio of the wavelength of the first line of the Lyman series in a He⁺ ion to that in a hydrogen atom?",
      option_a: "1 : 4",
      option_b: "4 : 1",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "By Rydberg's formula, 1 / λ = R_H Z² (1/1² - 1/2²), so λ ∝ 1 / Z². For He⁺ (Z = 2) and H (Z = 1): λ(He⁺) / λ(H) = 1² / 2² = 1 / 4. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4275,
    similarQuestion: {
      question: "If the shortest wavelength of the Lyman series for a hydrogen atom is λ₀, what is the wavelength of the first line of the Lyman series (n = 2 → n = 1)?",
      option_a: "4 λ₀ / 3",
      option_b: "3 λ₀ / 4",
      option_c: "2 λ₀",
      option_d: "9 λ₀ / 8",
      correct_option: "A",
      explanation: "Shortest Lyman wavelength (n = ∞ → 1): 1 / λ₀ = R_H ⇒ R_H = 1 / λ₀. First line (n = 2 → 1): 1 / λ₁ = R_H (1 - 1/4) = 3 R_H / 4 = 3 / (4 λ₀) ⇒ λ₁ = 4 λ₀ / 3. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4276,
    similarQuestion: {
      question: "Which electronic transition in a singly ionized helium ion (He⁺, Z = 2) emits radiation of the same wavelength as the transition from n = 2 to n = 1 in a hydrogen atom?",
      option_a: "n = 3 → n = 2",
      option_b: "n = 4 → n = 2",
      option_c: "n = 6 → n = 3",
      option_d: "n = 4 → n = 1",
      correct_option: "B",
      explanation: "For H (2 → 1): 1 / λ = R_H (1²)(1 - 1/4) = (3/4) R_H. For He⁺: 1 / λ = R_H (2²)(1/n₁² - 1/n₂²) = 4 R_H (1/n₁² - 1/n₂²). Setting equal: 4 (1/n₁² - 1/n₂²) = 3/4 ⇒ 1/n₁² - 1/n₂² = 3/16. For n₁ = 2 and n₂ = 4: 1/4 - 1/16 = 3/16. Thus, transition is n = 4 → n = 2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4277,
    similarQuestion: {
      question: "An isolated hydrogen atom has an electron excited to the n-th energy level. What is the maximum number of spectral emission lines that can be observed when it de-excites to the ground state?",
      option_a: "n(n - 1) / 2",
      option_b: "n(n + 1) / 2",
      option_c: "n²",
      option_d: "2n - 1",
      correct_option: "A",
      explanation: "The total number of spectral lines possible from level n is given by ⁿC₂ = n(n - 1) / 2 = 1 + 2 + ... + (n - 1). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4278,
    similarQuestion: {
      question: "What is the ratio of de Broglie wavelengths of two electrons accelerated from rest through potential differences of 100 V and 400 V respectively?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "B",
      explanation: "The de Broglie wavelength is λ = h / √(2 m e V) ∝ 1 / √V. Therefore, λ₁ / λ₂ = √(V₂ / V₁) = √(400 / 100) = √4 = 2 / 1 = 2 : 1. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4279,
    similarQuestion: {
      question: "How many atomic orbitals in an atom are designated by the quantum numbers n = 4, l = 3, m_l = -2?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "7",
      correct_option: "A",
      explanation: "A specific set of principal (n), azimuthal (l), and magnetic (m_l) quantum numbers uniquely defines exactly one single atomic orbital. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4280,
    similarQuestion: {
      question: "Which of the following subshell notations represents an orbital that CANNOT exist according to quantum mechanics?",
      option_a: "1p",
      option_b: "2s",
      option_c: "3d",
      option_d: "4f",
      correct_option: "A",
      explanation: "For n = 1, the only allowed value of l is 0 (1s subshell). A p-subshell has l = 1, which requires n ≥ 2. Therefore, 1p is not permissible. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4281,
    similarQuestion: {
      question: "Which of the following sets of quantum numbers is valid for an electron located in a 5p orbital?",
      option_a: "n = 5, l = 1, m_l = 0, m_s = +1/2",
      option_b: "n = 5, l = 2, m_l = 1, m_s = -1/2",
      option_c: "n = 5, l = 0, m_l = 0, m_s = +1/2",
      option_d: "n = 5, l = 1, m_l = +2, m_s = -1/2",
      correct_option: "A",
      explanation: "For a 5p orbital, n = 5 and l = 1. The allowed values of m_l are -1, 0, +1, and m_s = ±1/2. Option (A) satisfies all criteria. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4282,
    similarQuestion: {
      question: "In a multi-electron atom, for a given principal quantum number n, what is the order of increasing energy of the subshells?",
      option_a: "s < p < d < f",
      option_b: "f < d < p < s",
      option_c: "s < d < p < f",
      option_d: "p < s < d < f",
      correct_option: "A",
      explanation: "Due to orbital penetration and electron shielding in multi-electron atoms, s-orbitals experience the highest effective nuclear charge and lowest energy. The energy increases in the order: s < p < d < f. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4283,
    similarQuestion: {
      question: "In the d_xy atomic orbital, the lobes of maximum electron probability density lie:",
      option_a: "Along the x-axis and y-axis",
      option_b: "In between the x and y axes, at an angle of 45° to the axes",
      option_c: "Exclusively along the z-axis",
      option_d: "In the yz plane",
      correct_option: "B",
      explanation: "The four lobes of the d_xy orbital lie in the xy-plane oriented at 45° between the x and y axes, while the xz and yz planes serve as nodal planes. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4284,
    similarQuestion: {
      question: "Which of the following orbital box diagrams violates Pauli's Exclusion Principle?",
      option_a: "[↑↓]",
      option_b: "[↑↑]",
      option_c: "[↑ ]",
      option_d: "[ ]",
      correct_option: "B",
      explanation: "Pauli's Exclusion Principle states that no two electrons can have all four quantum numbers identical. Two electrons in the same orbital must have opposite spins (↑↓). The configuration [↑↑] has identical spins, violating Pauli's principle. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4285,
    similarQuestion: {
      question: "According to Hund's rule of maximum multiplicity, how are three electrons arranged in the 2p subshell in the ground state of a nitrogen atom?",
      option_a: "One paired orbital and one singly occupied orbital [↑↓][↑ ][ ]",
      option_b: "Three singly occupied orbitals with parallel spins [↑ ][↑ ][↑ ]",
      option_c: "Three singly occupied orbitals with anti-parallel spins [↑ ][↓ ][↑ ]",
      option_d: "All three electrons paired in a single orbital",
      correct_option: "B",
      explanation: "Hund's rule dictates that electrons occupy degenerate orbitals singly with parallel spins before any pairing occurs, maximizing total exchange energy. Hence, the three 2p orbitals are each singly occupied with parallel spins: [↑ ][↑ ][↑ ]. Therefore, Option (B) is the correct answer."
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
  console.log(`Set 18 Part 3 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
