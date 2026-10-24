const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 614,
    similarQuestion: {
      question: "The order of magnitude of the nuclear matter density for typical nuclei (such as gold or lead) is approximately:",
      option_a: "10¹⁴ kg/m³",
      option_b: "10¹⁷ kg/m³",
      option_c: "10¹¹ kg/m³",
      option_d: "10²⁰ kg/m³",
      correct_option: "B",
      explanation: "Nuclear density is given by ρ = Mass / Volume = (A × m_nucleon) / ((4/3) π R³). Using R = R₀ A^(1/3), we have R³ = R₀³ A, which gives ρ = m_nucleon / ((4/3) π R₀³). Since A cancels out, nuclear density is constant for all nuclei. Substituting m_nucleon ≈ 1.67 × 10⁻²⁷ kg and R₀ ≈ 1.2 × 10⁻¹⁵ m: ρ ≈ 1.67 × 10⁻²⁷ / ((4/3) × 3.1416 × (1.2 × 10⁻¹⁵)³) ≈ 2.3 × 10¹⁷ kg/m³. Thus, the order of magnitude is 10¹⁷ kg/m³. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 616,
    similarQuestion: {
      question: "The radius of a nucleus with mass number A = 64 is given by (taking R₀ = 1.2 fm):",
      option_a: "2.4 fm",
      option_b: "3.6 fm",
      option_c: "4.8 fm",
      option_d: "6.0 fm",
      correct_option: "C",
      explanation: "The radius of a nucleus varies with its mass number A according to the empirical formula: R = R₀ A^(1/3). Substituting R₀ = 1.2 fm and A = 64: R = 1.2 × (64)^(1/3) = 1.2 × 4 = 4.8 fm. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 619,
    similarQuestion: {
      question: "A neutral atom of an element has mass number A = 27 and atomic number Z = 13. The composition of its nucleus consists of:",
      option_a: "13 protons and 14 neutrons",
      option_b: "13 protons, 14 neutrons and 13 electrons",
      option_c: "14 protons and 13 neutrons",
      option_d: "27 protons and 13 neutrons",
      correct_option: "A",
      explanation: "The atomic nucleus contains only protons and neutrons; electrons revolve outside the nucleus. The number of protons is equal to the atomic number: Z = 13 protons. The number of neutrons is given by N = A - Z = 27 - 13 = 14 neutrons. Thus, the nucleus consists of 13 protons and 14 neutrons. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 629,
    similarQuestion: {
      question: "A heavy nucleus of mass number A = 240 has a binding energy per nucleon of 7.6 MeV. It undergoes fission into two equal fragments of mass number A = 120 each, with binding energy per nucleon of 8.5 MeV. The total energy liberated in this fission reaction is:",
      option_a: "120 MeV",
      option_b: "180 MeV",
      option_c: "216 MeV",
      option_d: "240 MeV",
      correct_option: "C",
      explanation: "Total initial binding energy of parent nucleus = 240 × 7.6 MeV = 1824 MeV. Total final binding energy of the two fragments = 2 × (120 × 8.5 MeV) = 240 × 8.5 MeV = 2040 MeV. Energy released Q = Total final B.E. - Total initial B.E. = 2040 MeV - 1824 MeV = 216 MeV. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 631,
    similarQuestion: {
      question: "What is the approximate average kinetic energy of thermal neutrons in thermal equilibrium at room temperature T = 300 K? (Take Boltzmann constant k_B = 8.62 × 10⁻⁵ eV/K)",
      option_a: "0.039 eV",
      option_b: "3.9 eV",
      option_c: "39 eV",
      option_d: "0.39 keV",
      correct_option: "A",
      explanation: "In thermal equilibrium at temperature T, the average kinetic energy of neutrons is given by: E_k = (3/2) k_B T. Substituting k_B = 8.62 × 10⁻⁵ eV/K and T = 300 K: E_k = 1.5 × (8.62 × 10⁻⁵ eV/K) × 300 K ≈ 0.0388 eV ≈ 0.039 eV (order of ~0.04 eV). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 639,
    similarQuestion: {
      question: "In the process of electron-positron pair production, what is the minimum threshold energy that the incident gamma-ray photon must possess?",
      option_a: "0.51 MeV",
      option_b: "1.02 MeV",
      option_c: "2.04 MeV",
      option_d: "931.5 MeV",
      correct_option: "B",
      explanation: "In pair production, the photon creates an electron and a positron, each having rest mass m_e. By conservation of energy, the threshold photon energy must equal the sum of the rest-mass energies: E_min = 2 m_e c² = 2 × 0.511 MeV = 1.022 MeV ≈ 1.02 MeV. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 644,
    similarQuestion: {
      question: "In the nuclear transmutation reaction ²⁴₁₂Mg + ⁴₂He → ¹₁p + ᴬ_Z X, what are the mass number A and atomic number Z of the product nucleus X?",
      option_a: "A = 27, Z = 13",
      option_b: "A = 28, Z = 13",
      option_c: "A = 27, Z = 14",
      option_d: "A = 28, Z = 14",
      correct_option: "A",
      explanation: "By conservation of mass number: 24 + 4 = 1 + A ⇒ A = 28 - 1 = 27. By conservation of atomic number (nuclear charge): 12 + 2 = 1 + Z ⇒ Z = 14 - 1 = 13. The element with Z = 13 is Aluminum (²⁷₁₃Al). Thus, A = 27 and Z = 13. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 891,
    similarQuestion: {
      question: "When a proton and an antiproton at rest mutually annihilate, how much energy is released in the form of electromagnetic radiation? (Take m_p = 1.67 × 10⁻²⁷ kg, c = 3 × 10⁸ m/s)",
      option_a: "1.5 × 10⁻¹⁰ J",
      option_b: "3.0 × 10⁻¹⁰ J",
      option_c: "6.0 × 10⁻¹⁰ J",
      option_d: "9.0 × 10⁻¹⁰ J",
      correct_option: "B",
      explanation: "The total rest mass annihilated is Δm = m_p + m_p-bar = 2 × 1.67 × 10⁻²⁷ kg = 3.34 × 10⁻²⁷ kg. According to Einstein's mass-energy equivalence relation: E = (Δm) c² = (3.34 × 10⁻²⁷ kg) × (3 × 10⁸ m/s)² = 3.34 × 10⁻²⁷ × 9 × 10¹⁶ J = 3.006 × 10⁻¹⁰ J ≈ 3.0 × 10⁻¹⁰ J. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 892,
    similarQuestion: {
      question: "The immense energy released in a thermonuclear weapon (hydrogen bomb) is primarily based on the principle of:",
      option_a: "Uncontrolled nuclear fission",
      option_b: "Controlled nuclear fission",
      option_c: "Uncontrolled nuclear fusion",
      option_d: "Spontaneous radioactive alpha decay",
      correct_option: "C",
      explanation: "A hydrogen bomb operates on the principle of uncontrolled nuclear fusion of light nuclei (such as deuterium and tritium into helium) at extremely high temperatures and pressures, initially triggered by an atomic fission explosion. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 893,
    similarQuestion: {
      question: "In the nuclear reaction ᴬ_Z X + ¹₀n → ⁴₂He + ³₁H, the target nucleus ᴬ_Z X is:",
      option_a: "⁶₃Li",
      option_b: "⁷₃Li",
      option_c: "⁹₄Be",
      option_d: "¹⁰₅B",
      correct_option: "A",
      explanation: "Applying conservation of mass number: A + 1 = 4 + 3 ⇒ A + 1 = 7 ⇒ A = 6. Applying conservation of atomic number: Z + 0 = 2 + 1 ⇒ Z = 3. The nuclide with Z = 3 and A = 6 is Lithium-6 (⁶₃Li). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 894,
    similarQuestion: {
      question: "In the fusion reaction ²₁H + ²₁H → ⁴₂He, if the mass of a deuteron is 2.0141 u and the mass of an alpha particle is 4.0026 u, the energy released per reaction is approximately: (Take 1 u = 931.5 MeV)",
      option_a: "12.8 MeV",
      option_b: "23.8 MeV",
      option_c: "28.3 MeV",
      option_d: "4.0 MeV",
      correct_option: "B",
      explanation: "Total mass of reactants = 2 × 2.0141 u = 4.0282 u. Total mass of product = 4.0026 u. Mass defect Δm = 4.0282 u - 4.0026 u = 0.0256 u. Energy released Q = Δm × 931.5 MeV/u = 0.0256 × 931.5 MeV ≈ 23.85 MeV ≈ 23.8 MeV. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 895,
    similarQuestion: {
      question: "Atoms having the same atomic number (same number of protons) but different mass numbers (different number of neutrons) are known as:",
      option_a: "Isobars",
      option_b: "Isotones",
      option_c: "Isotopes",
      option_d: "Isomers",
      correct_option: "C",
      explanation: "Isotopes are nuclides of the same chemical element having the same number of protons (same Z) and identical chemical properties, but possessing different numbers of neutrons (different A). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 956,
    similarQuestion: {
      question: "In a nuclear fusion reaction, two light nuclei A and B fuse to form a heavier nucleus C. If the total binding energies of A, B, and C are E_A, E_B, and E_C respectively, the energy released (Q-value) in this reaction is:",
      option_a: "E_A + E_B - E_C",
      option_b: "E_C - (E_A + E_B)",
      option_c: "E_A + E_B + E_C",
      option_d: "(E_A + E_B) / E_C",
      correct_option: "B",
      explanation: "The Q-value of a nuclear reaction expressed in terms of binding energy is given by: Q = (Total Binding Energy of Products) - (Total Binding Energy of Reactants). Since nucleus C is the product and A, B are reactants: Q = E_C - (E_A + E_B). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 957,
    similarQuestion: {
      question: "A parent nucleus ᴬ_Z X decays into ᴬ_{Z+1} Y, which then decays into ^{A-4}_{Z-1} W, which subsequently de-excites to ^{A-4}_{Z-1} W by photon emission. The sequence of radioactive emissions in these three successive transitions is:",
      option_a: "α, β⁻, γ",
      option_b: "β⁻, α, γ",
      option_c: "γ, α, β⁻",
      option_d: "β⁻, γ, α",
      correct_option: "B",
      explanation: "1. ᴬ_Z X → ᴬ_{Z+1} Y: Mass number unchanged, atomic number increases by 1; this is a β⁻ decay. 2. ᴬ_{Z+1} Y → ^{A-4}_{Z-1} W: Mass number decreases by 4, atomic number decreases by 2; this is an α decay. 3. ^{A-4}_{Z-1} W* → ^{A-4}_{Z-1} W: Transition between nuclear energy levels without change in A or Z; this is γ emission. Thus, the sequence is β⁻, α, γ. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1142,
    similarQuestion: {
      question: "A radioactive nucleus ²³⁸₉₂U undergoes decay by emitting 2 α particles and 2 β⁻ particles in series. The resulting daughter nucleus has atomic number and mass number:",
      option_a: "²³⁰₉₀Th",
      option_b: "²³⁰₈₈Ra",
      option_c: "²³⁴₉₀Th",
      option_d: "²³⁴₉₂U",
      correct_option: "A",
      explanation: "Each α emission decreases the mass number by 4 and atomic number by 2. Each β⁻ emission leaves mass number unchanged and increases atomic number by 1. For 2 α and 2 β⁻: Final mass number A' = 238 - (2 × 4) = 238 - 8 = 230. Final atomic number Z' = 92 - (2 × 2) + (2 × 1) = 92 - 4 + 2 = 90. The nucleus formed is ²³⁰₉₀Th. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1143,
    similarQuestion: {
      question: "The activity of a radioactive isotope decreases from 800 disintegrations per second to 100 disintegrations per second in 6 hours. What is the half-life of the isotope?",
      option_a: "1.5 hours",
      option_b: "2.0 hours",
      option_c: "3.0 hours",
      option_d: "4.0 hours",
      correct_option: "B",
      explanation: "The activity decreases as R = R₀ / 2^n, where n is the number of half-lives. 100 = 800 / 2^n ⇒ 2^n = 800 / 100 = 8 = 2³ ⇒ n = 3 half-lives. Total time t = n × T_{1/2} ⇒ 6 hours = 3 × T_{1/2} ⇒ T_{1/2} = 6 / 3 = 2.0 hours. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1144,
    similarQuestion: {
      question: "The half-life of a radioactive substance is 20 days. The mean life (average life) of this substance is approximately:",
      option_a: "13.86 days",
      option_b: "28.85 days",
      option_c: "40.0 days",
      option_d: "10.0 days",
      correct_option: "B",
      explanation: "The relationship between mean life τ and half-life T_{1/2} is: τ = T_{1/2} / ln(2) = T_{1/2} / 0.693 ≈ 1.443 × T_{1/2}. Given T_{1/2} = 20 days: τ = 1.4427 × 20 days ≈ 28.85 days. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1145,
    similarQuestion: {
      question: "A radioactive isotope has a half-life of 15 minutes. After 1 hour, the measured count rate is 10 counts per second. What was the initial count rate?",
      option_a: "40 s⁻¹",
      option_b: "80 s⁻¹",
      option_c: "160 s⁻¹",
      option_d: "320 s⁻¹",
      correct_option: "C",
      explanation: "Total time elapsed t = 1 hour = 60 minutes. Half-life T_{1/2} = 15 minutes. Number of half-lives n = t / T_{1/2} = 60 / 15 = 4. The count rate is related to initial count rate by: R = R₀ / 2^n ⇒ 10 = R₀ / 2⁴ = R₀ / 16 ⇒ R₀ = 10 × 16 = 160 s⁻¹. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1146,
    similarQuestion: {
      question: "In the radioactive decay series ²³²₉₀Th → ²⁰⁸₈₂Pb, how many α-particles and β⁻-particles are emitted?",
      option_a: "6 α and 4 β⁻",
      option_b: "4 α and 6 β⁻",
      option_c: "6 α and 6 β⁻",
      option_d: "8 α and 4 β⁻",
      correct_option: "A",
      explanation: "Let n_α and n_β be the number of emitted α and β⁻ particles respectively. Change in mass number: ΔA = 232 - 208 = 24. Since each α particle reduces A by 4: n_α = 24 / 4 = 6 α-particles. Change in atomic number: ΔZ = 90 - 82 = 8. Also, ΔZ = 2 n_α - n_β ⇒ 8 = 2(6) - n_β ⇒ 8 = 12 - n_β ⇒ n_β = 12 - 8 = 4 β⁻-particles. Thus, 6 α and 4 β⁻ are emitted. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1147,
    similarQuestion: {
      question: "Two radioactive substances A and B initially have nuclei in the ratio N_{A0} : N_{B0} = 4 : 1. Their half-lives are 10 hours and 20 hours respectively. After 40 hours, the ratio of remaining nuclei N_A / N_B will be:",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "For substance A: Half-life T_{A} = 10 hours. In t = 40 hours, number of half-lives n_A = 40 / 10 = 4. Remaining nuclei N_A = N_{A0} / 2⁴ = N_{A0} / 16. For substance B: Half-life T_{B} = 20 hours. In t = 40 hours, number of half-lives n_B = 40 / 20 = 2. Remaining nuclei N_B = N_{B0} / 2² = N_{B0} / 4. Ratio N_A / N_B = (N_{A0} / 16) / (N_{B0} / 4) = (N_{A0} / N_{B0}) × (4 / 16) = 4 × (1 / 4) = 1. Thus, the ratio is 1 : 1. Therefore, Option (A) is the correct answer."
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
  console.log(`Set 63 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
