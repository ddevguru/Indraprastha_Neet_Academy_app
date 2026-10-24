const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 4219,
    similarQuestion: {
      question: "The magnitude of the orbital angular momentum of an electron residing in a d-orbital is given by:",
      option_a: "√2 (h / 2π)",
      option_b: "√6 (h / 2π)",
      option_c: "√12 (h / 2π)",
      option_d: "0",
      correct_option: "B",
      explanation: "The orbital angular momentum L is given by the formula L = √[l(l + 1)] ℏ = √[l(l + 1)] (h / 2π). For a d-orbital, azimuthal quantum number l = 2. Substituting l = 2: L = √[2(2 + 1)] (h / 2π) = √6 (h / 2π). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4220,
    similarQuestion: {
      question: "Which of the following electronic transitions in a hydrogen atom results in the emission of a photon with the highest energy?",
      option_a: "n = 2 → n = 1",
      option_b: "n = 3 → n = 2",
      option_c: "n = 4 → n = 3",
      option_d: "n = 5 → n = 4",
      correct_option: "A",
      explanation: "The energy emitted is ΔE = 13.6 eV × (1/n₁² - 1/n₂²). For n = 2 → n = 1: ΔE = 13.6 × (1 - 1/4) = 10.2 eV. For n = 3 → n = 2: ΔE = 13.6 × (1/4 - 1/9) = 1.89 eV. Transitions ending at lower principal quantum numbers involve much larger energy gaps. The n = 2 → n = 1 transition emits the maximum energy. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4221,
    similarQuestion: {
      question: "According to Bohr's model and de Broglie's hypothesis, what is the de Broglie wavelength of an electron revolving in the fourth (n = 4) orbit of a hydrogen atom? (r₀ = first Bohr radius)",
      option_a: "2 π r₀",
      option_b: "4 π r₀",
      option_c: "8 π r₀",
      option_d: "16 π r₀",
      correct_option: "C",
      explanation: "From de Broglie's condition for stationary orbits: 2 π r_n = n λ ⇒ λ = 2 π r_n / n. The radius of the n-th orbit is r_n = n² r₀. For n = 4: r₄ = 4² r₀ = 16 r₀. Substituting gives λ = 2 π (16 r₀) / 4 = 8 π r₀. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4222,
    similarQuestion: {
      question: "If the uncertainty in position and uncertainty in momentum of an electron are equal (Δx = Δp), what is the uncertainty in the velocity (Δv) of the electron? (Take m = mass of electron)",
      option_a: "(1 / m) √(h / 4π)",
      option_b: "(1 / 2m) √(h / π)",
      option_c: "(1 / m) √(h / 2π)",
      option_d: "√(h / 4πm)",
      correct_option: "A",
      explanation: "By Heisenberg's Uncertainty Principle: Δx · Δp ≥ h / (4π). Setting Δx = Δp: (Δp)² = h / (4π) ⇒ Δp = √(h / 4π). Since momentum uncertainty is Δp = m Δv: Δv = Δp / m = (1 / m) √(h / 4π). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4223,
    similarQuestion: {
      question: "Match the quantum numbers in List-I with their physical significance in List-II:\nList-I: (A) Principal quantum number (n), (B) Azimuthal quantum number (l), (C) Magnetic quantum number (m_l), (D) Spin quantum number (m_s)\nList-II: (1) Shape of orbital, (2) Orientation of electron spin, (3) Size and energy of main shell, (4) Spatial orientation of orbital",
      option_a: "A-3, B-1, C-4, D-2",
      option_b: "A-1, B-3, C-4, D-2",
      option_c: "A-3, B-4, C-1, D-2",
      option_d: "A-4, B-1, C-3, D-2",
      correct_option: "A",
      explanation: "Principal quantum number n gives the main shell size and energy (3). Azimuthal quantum number l gives the subshell shape (1). Magnetic quantum number m_l gives the spatial orientation of the orbital (4). Spin quantum number m_s gives the spin orientation of the electron (2). Thus, the correct matching is A-3, B-1, C-4, D-2. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4224,
    similarQuestion: {
      question: "The shortest wavelength (series limit) of the Lyman series in the hydrogen spectrum is λ_L. The wavelength of the second line of the Balmer series (n = 4 → n = 2) is:",
      option_a: "16 λ_L / 3",
      option_b: "3 λ_L / 16",
      option_c: "4 λ_L",
      option_d: "9 λ_L / 5",
      correct_option: "A",
      explanation: "For the Lyman series limit (n = ∞ → n = 1): 1 / λ_L = R_H (1/1² - 0) = R_H ⇒ R_H = 1 / λ_L. For the second line of the Balmer series (n = 4 → n = 2): 1 / λ_B = R_H (1/2² - 1/4²) = R_H (1/4 - 1/16) = 3 R_H / 16. Substituting R_H = 1 / λ_L: 1 / λ_B = 3 / (16 λ_L) ⇒ λ_B = 16 λ_L / 3. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4225,
    similarQuestion: {
      question: "The number of radial nodes in a 3p atomic orbital is given by (n - l - 1). Its value is:",
      option_a: "0",
      option_b: "1",
      option_c: "2",
      option_d: "3",
      correct_option: "B",
      explanation: "The number of radial nodes for any orbital is calculated using: Radial nodes = n - l - 1. For a 3p orbital, principal quantum number n = 3 and azimuthal quantum number l = 1. Number of radial nodes = 3 - 1 - 1 = 1. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4226,
    similarQuestion: {
      question: "An electron in a hydrogen atom is excited from the ground state to the fifth energy level (n = 5). What is the maximum number of spectral lines observed in the Lyman series (ultraviolet region) and Balmer series (visible region) upon de-excitation?",
      option_a: "4 in Lyman, 3 in Balmer",
      option_b: "5 in Lyman, 4 in Balmer",
      option_c: "4 in Lyman, 4 in Balmer",
      option_d: "3 in Lyman, 2 in Balmer",
      correct_option: "A",
      explanation: "Lyman transitions terminate at n₁ = 1 from n₂ = 5, 4, 3, 2, giving 5 - 1 = 4 lines in the UV region. Balmer transitions terminate at n₁ = 2 from n₂ = 5, 4, 3, giving 5 - 2 = 3 lines in the visible region. Therefore, 4 lines in Lyman and 3 lines in Balmer. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4227,
    similarQuestion: {
      question: "Assertion (A): The nodal plane of the p_y orbital is the xz plane.\nReason (R): At all points lying in the xz plane, the probability density of finding an electron in a p_y orbital is zero.",
      option_a: "Both (A) and (R) are true, and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)",
      option_c: "(A) is true, but (R) is false",
      option_d: "Both (A) and (R) are false",
      correct_option: "A",
      explanation: "The wave function for a p_y orbital has the coordinate y as a factor; therefore, everywhere in the xz plane (where y = 0), the electron probability density |ψ|² is zero. This makes the xz plane a nodal plane. Reason correctly explains Assertion. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4228,
    similarQuestion: {
      question: "Assertion (A): In a single-electron species (such as H, He⁺, Li²⁺), the 3s, 3p, and 3d orbitals all possess exactly the same energy.\nReason (R): In single-electron systems, the orbital energy depends solely on the principal quantum number (n) and is independent of the azimuthal quantum number (l).",
      option_a: "Both (A) and (R) are true, and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)",
      option_c: "(A) is true, but (R) is false",
      option_d: "Both (A) and (R) are false",
      correct_option: "A",
      explanation: "In single-electron species, there is no electron-electron repulsion or screening effect, so the electrostatic potential depends only on distance r from nucleus. Consequently, all subshells with the same principal quantum number n are degenerate (equal energy). Reason correctly explains Assertion. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4229,
    similarQuestion: {
      question: "A sample contains 6.54 g of Zn (atomic mass = 65.4 g/mol), 1.204 × 10²³ atoms of Cr, and 0.40 mole of O atoms. What is the empirical formula of the compound? (N_A = 6.022 × 10²³ mol⁻¹)",
      option_a: "ZnCrO₄",
      option_b: "ZnCr₂O₄",
      option_c: "ZnCr₂O₇",
      option_d: "Zn₂CrO₄",
      correct_option: "B",
      explanation: "Moles of Zn = 6.54 / 65.4 = 0.10 mol. Moles of Cr = (1.204 × 10²³) / (6.022 × 10²³) = 0.20 mol. Moles of O = 0.40 mol. Mole ratio Zn : Cr : O = 0.10 / 0.10 : 0.20 / 0.10 : 0.40 / 0.10 = 1 : 2 : 4. The empirical formula is ZnCr₂O₄. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4230,
    similarQuestion: {
      question: "Assuming liquid water has a density of 1.0 g/cm³, what is the average volume occupied by a single molecule of water? (Molar mass of H₂O = 18 g/mol, N_A = 6.02 × 10²³ mol⁻¹)",
      option_a: "18 cm³",
      option_b: "3.0 × 10⁻²³ cm³",
      option_c: "6.0 × 10⁻²³ cm³",
      option_d: "1.8 × 10⁻²² cm³",
      correct_option: "B",
      explanation: "Mass of 1 mole of water = 18 g. With density = 1.0 g/cm³, volume of 1 mole of water = 18 cm³. One mole contains 6.02 × 10²³ molecules. The volume occupied by one molecule is: V = 18 cm³ / (6.02 × 10²³) ≈ 2.99 × 10⁻²³ cm³ ≈ 3.0 × 10⁻²³ cm³. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4231,
    similarQuestion: {
      question: "At STP, 112 mL of a pure gas has a mass of 0.22 g. The gas could be:",
      option_a: "CH₄",
      option_b: "N₂",
      option_c: "CO₂",
      option_d: "SO₂",
      correct_option: "C",
      explanation: "Moles of gas at STP = 112 mL / 22,400 mL/mol = 0.0050 mol. Molar mass M = Mass / Moles = 0.22 g / 0.0050 mol = 44 g/mol. Among the options, carbon dioxide (CO₂) has a molar mass of 12 + 2(16) = 44 g/mol. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4232,
    similarQuestion: {
      question: "The density of an unknown gas at STP is 1.43 g/L. What is the approximate molar mass of the gas? (1 mole of gas at STP occupies 22.4 L)",
      option_a: "16 g/mol",
      option_b: "28 g/mol",
      option_c: "32 g/mol",
      option_d: "44 g/mol",
      correct_option: "C",
      explanation: "At STP, the molar mass M of an ideal gas is given by: M = Density × Molar volume at STP = 1.43 g/L × 22.4 L/mol = 32.03 g/mol ≈ 32 g/mol (which corresponds to O₂). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4233,
    similarQuestion: {
      question: "A gas mixture contains hydrogen gas (H₂) and methane gas (CH₄) in a 1 : 2 ratio by mass. What is the ratio of the number of hydrogen atoms contributed by H₂ to that contributed by CH₄?",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "4 : 1",
      correct_option: "B",
      explanation: "Let the mass of H₂ be 1 g and CH₄ be 2 g. Moles of H₂ = 1 / 2 = 0.50 mol ⇒ moles of H atoms = 0.50 × 2 = 1.00 mol. Moles of CH₄ = 2 / 16 = 0.125 mol ⇒ moles of H atoms = 0.125 × 4 = 0.50 mol. Ratio of H atoms = 1.00 : 0.50 = 2 : 1. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4234,
    similarQuestion: {
      question: "In the complete combustion of carbon monoxide according to 2 CO(g) + O₂(g) → 2 CO₂(g), what volume of CO₂ gas is formed when 30 mL of O₂ gas reacts completely at constant temperature and pressure?",
      option_a: "15 mL",
      option_b: "30 mL",
      option_c: "60 mL",
      option_d: "90 mL",
      correct_option: "C",
      explanation: "According to Gay-Lussac's law of combining volumes, at identical temperature and pressure, 1 volume of O₂ reacts with 2 volumes of CO to yield 2 volumes of CO₂. Therefore, 30 mL of O₂ produces 2 × 30 mL = 60 mL of CO₂ gas. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4235,
    similarQuestion: {
      question: "If 1.505 × 10²³ molecules of nitrogen gas (N₂) are reacted with 4.0 g of hydrogen gas (H₂) according to N₂ + 3 H₂ → 2 NH₃, what is the volume of ammonia gas (NH₃) produced at STP? (Molar volume at STP = 22.4 L/mol)",
      option_a: "5.6 L",
      option_b: "11.2 L",
      option_c: "22.4 L",
      option_d: "44.8 L",
      correct_option: "B",
      explanation: "Moles of N₂ = (1.505 × 10²³) / (6.022 × 10²³) = 0.25 mol. Moles of H₂ = 4.0 g / 2.0 g/mol = 2.0 mol. Reaction: 1 mol N₂ requires 3 mol H₂. For 0.25 mol N₂, 0.75 mol H₂ is required. Since 2.0 mol H₂ is available, N₂ is the limiting reactant. Moles of NH₃ formed = 2 × 0.25 = 0.50 mol. Volume of NH₃ at STP = 0.50 mol × 22.4 L/mol = 11.2 L. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4236,
    similarQuestion: {
      question: "Arrange the following samples in order of increasing mass:\n(I) 0.2 mole of CO₂ gas\n(II) 1.0 g-atom of nitrogen\n(III) 6.022 × 10²² molecules of glucose (C₆H₁₂O₆)\n(IV) 2.24 L of O₂ gas at STP",
      option_a: "IV < I < II < III",
      option_b: "IV < II < I < III",
      option_c: "I < IV < II < III",
      option_d: "II < I < IV < III",
      correct_option: "A",
      explanation: "Masses: (I) 0.2 mol × 44 g/mol = 8.8 g. (II) 1.0 g-atom N = 14.0 g. (III) 0.1 mol glucose × 180 g/mol = 18.0 g. (IV) 2.24/22.4 = 0.1 mol O₂ × 32 g/mol = 3.2 g. Increasing order: IV (3.2 g) < I (8.8 g) < II (14.0 g) < III (18.0 g). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4237,
    similarQuestion: {
      question: "A 20.0 g sample of impure magnesium carbonate (MgCO₃) is completely decomposed by heating according to MgCO₃ → MgO + CO₂, yielding 8.0 g of magnesium oxide (MgO). The percentage purity of the sample is: (Molar masses: MgCO₃ = 84 g/mol, MgO = 40 g/mol)",
      option_a: "75%",
      option_b: "80%",
      option_c: "84%",
      option_d: "90%",
      correct_option: "C",
      explanation: "Moles of MgO formed = 8.0 g / 40 g/mol = 0.20 mol. 1 mole of MgCO₃ produces 1 mole of MgO, so moles of pure MgCO₃ = 0.20 mol. Mass of pure MgCO₃ = 0.20 mol × 84 g/mol = 16.8 g. Percentage purity = (16.8 / 20.0) × 100 = 84.0%. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4238,
    similarQuestion: {
      question: "A pure sample of hydrated copper sulfate, CuSO₄·5H₂O, contains 10.0 moles of hydrogen atoms. How many moles of oxygen atoms are present in this sample?",
      option_a: "4.5 mol",
      option_b: "9.0 mol",
      option_c: "5.0 mol",
      option_d: "10.0 mol",
      correct_option: "B",
      explanation: "In one formula unit of CuSO₄·5H₂O, there are 10 hydrogen atoms and 9 oxygen atoms (4 in sulfate + 5 in water). The mole ratio of oxygen to hydrogen is 9 : 10. For 10.0 moles of hydrogen atoms, moles of oxygen atoms = (9 / 10) × 10.0 = 9.0 mol. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4239,
    similarQuestion: {
      question: "What is the wavelength (in nm) of electromagnetic radiation having a frequency of 6.0 × 10¹⁴ Hz? (c = 3.0 × 10⁸ m/s)",
      option_a: "300 nm",
      option_b: "500 nm",
      option_c: "600 nm",
      option_d: "750 nm",
      correct_option: "B",
      explanation: "Using c = ν λ: λ = c / ν = (3.0 × 10⁸ m/s) / (6.0 × 10¹⁴ s⁻¹) = 0.50 × 10⁻⁶ m = 500 × 10⁻⁹ m = 500 nm. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4240,
    similarQuestion: {
      question: "The ionization energy of a hydrogen atom in its ground state is 2.18 × 10⁻¹⁸ J. When an electron transitions from the n = 3 state to the n = 1 state, what is the frequency of the emitted photon? (Take h = 6.626 × 10⁻³⁴ J·s)",
      option_a: "1.62 × 10¹⁵ Hz",
      option_b: "2.46 × 10¹⁵ Hz",
      option_c: "2.92 × 10¹⁵ Hz",
      option_d: "3.28 × 10¹⁵ Hz",
      correct_option: "C",
      explanation: "The transition energy is ΔE = 2.18 × 10⁻¹⁸ J × (1/1² - 1/3²) = 2.18 × 10⁻¹⁸ × (8/9) = 1.938 × 10⁻¹⁸ J. The frequency of emitted radiation is ν = ΔE / h = (1.938 × 10⁻¹⁸ J) / (6.626 × 10⁻³⁴ J·s) ≈ 2.924 × 10¹⁵ Hz ≈ 2.92 × 10¹⁵ Hz. Therefore, Option (C) is the correct answer."
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
  console.log(`Set 18 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
