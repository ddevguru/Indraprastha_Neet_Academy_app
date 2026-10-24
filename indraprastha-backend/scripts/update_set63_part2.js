const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 1148,
    similarQuestion: {
      question: "The activity of a radioactive isotope is 10,000 disintegrations per second at t = 0 and decreases to 1,000 disintegrations per second at t = 10 minutes. The decay constant λ is approximately: (Take ln 10 ≈ 2.303)",
      option_a: "0.115 min⁻¹",
      option_b: "0.230 min⁻¹",
      option_c: "0.461 min⁻¹",
      option_d: "0.693 min⁻¹",
      correct_option: "B",
      explanation: "Radioactive decay obeys R(t) = R₀ e^(-λ t). Rearranging gives λ = ln(R₀ / R) / t. Here R₀ = 10000, R = 1000, and t = 10 minutes. λ = ln(10000 / 1000) / 10 = ln(10) / 10 = 2.3026 / 10 ≈ 0.230 min⁻¹. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1149,
    similarQuestion: {
      question: "A radioactive substance has a half-life of 4 hours. What is the probability that a particular nucleus will decay in 8 hours?",
      option_a: "25%",
      option_b: "50%",
      option_c: "75%",
      option_d: "87.5%",
      correct_option: "C",
      explanation: "In time t = 8 hours, the number of half-lives elapsed is n = t / T_{1/2} = 8 / 4 = 2. The fraction of nuclei remaining undecayed is (1/2)^n = (1/2)² = 1/4 = 25%. The probability of decay equals the fraction of nuclei that have decayed: P_decay = 1 - 1/4 = 3/4 = 75%. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1150,
    similarQuestion: {
      question: "Seven-eighths (7/8) of an active radioactive substance decays in 9 days. What is the half-life of the substance?",
      option_a: "1.5 days",
      option_b: "2.0 days",
      option_c: "3.0 days",
      option_d: "4.5 days",
      correct_option: "C",
      explanation: "When 7/8 of the active sample has decayed, the fraction remaining undecayed is N / N₀ = 1 - 7/8 = 1/8. Since N / N₀ = (1/2)^n: 1/8 = (1/2)³ ⇒ n = 3 half-lives. Total elapsed time t = n × T_{1/2} ⇒ 9 days = 3 × T_{1/2} ⇒ T_{1/2} = 9 / 3 = 3.0 days. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1151,
    similarQuestion: {
      question: "The half-life of a radioisotope is 2.0 × 10⁶ s. What is the activity (decay rate) of a sample containing 6.0 × 10¹⁴ active nuclei?",
      option_a: "2.08 × 10⁸ Bq",
      option_b: "3.12 × 10⁸ Bq",
      option_c: "4.16 × 10⁸ Bq",
      option_d: "6.93 × 10⁸ Bq",
      correct_option: "A",
      explanation: "The decay constant is λ = ln(2) / T_{1/2} = 0.693 / (2.0 × 10⁶ s) = 3.465 × 10⁻⁷ s⁻¹. The activity (decay rate) is R = λ N = (3.465 × 10⁻⁷ s⁻¹) × (6.0 × 10¹⁴) = 2.079 × 10⁸ Bq ≈ 2.08 × 10⁸ Bq. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1152,
    similarQuestion: {
      question: "A sample contains 16 g of a radioactive element with a half-life of 10 years. How much of the material has disintegrated after 15 years? (Take 2^(1.5) ≈ 2.828)",
      option_a: "5.66 g",
      option_b: "8.00 g",
      option_c: "10.34 g",
      option_d: "12.00 g",
      correct_option: "C",
      explanation: "Number of half-lives elapsed n = t / T_{1/2} = 15 / 10 = 1.5. Undecayed mass remaining is m = m₀ / 2^n = 16 / 2^(1.5) = 16 / 2.828 ≈ 5.658 g. Mass disintegrated = m₀ - m = 16 g - 5.66 g = 10.34 g. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1153,
    similarQuestion: {
      question: "A heavy nucleus with atomic number Z = 90 undergoes radioactive decay by consecutively emitting 4 α-particles, 2 β⁻-particles, and 1 β⁺-particle. The atomic number of the resulting daughter nucleus is:",
      option_a: "81",
      option_b: "83",
      option_c: "85",
      option_d: "87",
      correct_option: "B",
      explanation: "Each α emission reduces Z by 2; each β⁻ emission increases Z by 1; each β⁺ emission reduces Z by 1. Net change in atomic number: ΔZ = -2(4) + 1(2) - 1(1) = -8 + 2 - 1 = -7. Resulting atomic number Z' = 90 - 7 = 83. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1154,
    similarQuestion: {
      question: "A radioactive isotope has a half-life of 2 hours. If a sample initially contains 16 × 10¹⁰ active atoms at t = 0, how many atoms decay between t = 2 hours and t = 6 hours?",
      option_a: "2 × 10¹⁰",
      option_b: "4 × 10¹⁰",
      option_c: "6 × 10¹⁰",
      option_d: "8 × 10¹⁰",
      correct_option: "C",
      explanation: "Initial atoms N₀ = 16 × 10¹⁰. Half-life T_{1/2} = 2 hours. At t = 2 hours (1 half-life): N(2) = N₀ / 2¹ = 8 × 10¹⁰ atoms. At t = 6 hours (3 half-lives): N(6) = N₀ / 2³ = 2 × 10¹⁰ atoms. The number of atoms decayed in this duration is ΔN = N(2) - N(6) = 8 × 10¹⁰ - 2 × 10¹⁰ = 6 × 10¹⁰ atoms. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1155,
    similarQuestion: {
      question: "The activity of a radioactive sample drops to 1/4 of its initial activity A₀ in 10 days. After a further 10 days (total 20 days), its activity will be:",
      option_a: "A₀ / 8",
      option_b: "A₀ / 16",
      option_c: "A₀ / 32",
      option_d: "A₀ / 12",
      correct_option: "B",
      explanation: "According to the radioactive decay law, the fraction remaining after equal successive intervals of time is constant. Since the activity reduces to (1/4) of its value in 10 days, after another 10 days it will again be multiplied by 1/4: A(20) = A(10) × (1/4) = (A₀ / 4) × (1/4) = A₀ / 16. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1156,
    similarQuestion: {
      question: "A stationary nucleus of mass number A = 220 decays by emitting an α-particle (mass = 4 u). If the kinetic energy of the emitted α-particle is 5.4 MeV, what is the recoil kinetic energy of the daughter nucleus?",
      option_a: "0.05 MeV",
      option_b: "0.10 MeV",
      option_c: "0.15 MeV",
      option_d: "0.20 MeV",
      correct_option: "B",
      explanation: "By conservation of linear momentum for a parent at rest: p_daughter = p_alpha = p. Kinetic energy is K = p² / (2 m), so K_daughter / K_alpha = m_alpha / m_daughter. Here m_alpha = 4 u and m_daughter = 220 - 4 = 216 u. Thus, K_daughter = K_alpha × (4 / 216) = 5.4 MeV × (1 / 54) = 0.10 MeV. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1157,
    similarQuestion: {
      question: "The solar constant (radiation power received per unit area at Earth's distance) is S = 1.36 kW/m². If the mean distance from Earth to the Sun is R = 1.5 × 10¹¹ m, the rate of mass loss of the Sun per second is approximately: (Take c = 3 × 10⁸ m/s)",
      option_a: "4.3 × 10⁹ kg/s",
      option_b: "2.1 × 10⁸ kg/s",
      option_c: "1.5 × 10¹² kg/s",
      option_d: "3.8 × 10¹⁴ kg/s",
      correct_option: "A",
      explanation: "Total radiant power emitted by the Sun is P = S × (4 π R²) = 1360 × 4 × 3.1416 × (1.5 × 10¹¹)² ≈ 3.845 × 10²⁶ W. By Einstein's mass-energy equation, rate of mass loss is dm/dt = P / c² = (3.845 × 10²⁶ J/s) / (3 × 10⁸ m/s)² = 3.845 × 10²⁶ / (9 × 10¹⁶) ≈ 4.27 × 10⁹ kg/s ≈ 4.3 × 10⁹ kg/s. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1158,
    similarQuestion: {
      question: "A stationary nucleus disintegrates into two fragments which move apart with velocities in the ratio 27 : 1. The ratio of the radii of the two nuclear fragments (R₁ : R₂) is:",
      option_a: "1 : 3",
      option_b: "1 : 9",
      option_c: "3 : 1",
      option_d: "9 : 1",
      correct_option: "A",
      explanation: "By conservation of momentum: m₁ v₁ = m₂ v₂ ⇒ m₁ / m₂ = v₂ / v₁ = 1 / 27. Since nuclear mass is directly proportional to mass number: A₁ / A₂ = 1 / 27. Nuclear radius varies as R = R₀ A^(1/3), so R₁ / R₂ = (A₁ / A₂)^(1/3) = (1 / 27)^(1/3) = 1 / 3 = 1 : 3. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1159,
    similarQuestion: {
      question: "A radioactive isotope decays simultaneously through two different modes with half-lives of 600 years and 300 years respectively. The time after which only one-eighth (1/8) of the initial sample remains undecayed is:",
      option_a: "200 years",
      option_b: "400 years",
      option_c: "600 years",
      option_d: "900 years",
      correct_option: "C",
      explanation: "For simultaneous parallel decays, effective decay constant is λ_eff = λ₁ + λ₂ ⇒ 1 / T_eff = 1 / T₁ + 1 / T₂ = 1/600 + 1/300 = 3/600 = 1/200 ⇒ T_eff = 200 years. For the fraction remaining to be 1/8 = (1/2)³, 3 effective half-lives are required: t = 3 × T_eff = 3 × 200 = 600 years. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1160,
    similarQuestion: {
      question: "A freshly prepared radioactive source has an activity that is 64 times higher than the maximum permissible safe radiation level. If its half-life is 3 hours, after how many hours will the radiation level become safe for handling?",
      option_a: "12 hours",
      option_b: "15 hours",
      option_c: "18 hours",
      option_d: "21 hours",
      correct_option: "C",
      explanation: "The activity must reduce to 1/64 of its initial value: R = R₀ / 2^n ⇒ 1/64 = 1 / 2^n ⇒ 2^n = 64 = 2⁶ ⇒ n = 6 half-lives. Required time t = n × T_{1/2} = 6 × 3 hours = 18 hours. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1161,
    similarQuestion: {
      question: "Two radioactive substances A and B have decay constants 5 λ and 2 λ respectively. If they initially contain equal numbers of nuclei, after what time will the ratio of nuclei N_A / N_B be equal to 1/e²?",
      option_a: "2 / (3 λ)",
      option_b: "1 / (3 λ)",
      option_c: "3 / (2 λ)",
      option_d: "1 / (7 λ)",
      correct_option: "A",
      explanation: "Remaining nuclei at time t are N_A(t) = N₀ e^(-5 λ t) and N_B(t) = N₀ e^(-2 λ t). Their ratio is N_A / N_B = e^(-5 λ t + 2 λ t) = e^(-3 λ t). Given N_A / N_B = 1/e² = e^(-2): e^(-3 λ t) = e^(-2) ⇒ 3 λ t = 2 ⇒ t = 2 / (3 λ). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1162,
    similarQuestion: {
      question: "The half-life of a radioactive nuclide is 15 minutes. What is the time interval between the instant when 25% of the substance has decayed and the instant when 75% of the substance has decayed?",
      option_a: "15 minutes",
      option_b: "23.8 minutes",
      option_c: "30 minutes",
      option_d: "45 minutes",
      correct_option: "B",
      explanation: "At 25% decay, undecayed fraction is N₁ = 0.75 N₀. At 75% decay, undecayed fraction is N₂ = 0.25 N₀. The ratio is N₂ / N₁ = 0.25 / 0.75 = 1/3. Using N₂ = N₁ e^(-λ Δt): ln(3) = λ Δt = [ln(2) / T_{1/2}] Δt ⇒ Δt = T_{1/2} × [ln(3) / ln(2)] = 15 × [1.0986 / 0.6931] ≈ 15 × 1.585 = 23.77 min ≈ 23.8 minutes. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1198,
    similarQuestion: {
      question: "The ratio of the radii of the nuclei ⁴₂He and ᴬ_Z X is 1 : 3. If the atomic number of X is Z = 40, what is the number of neutrons in the nucleus of X?",
      option_a: "40",
      option_b: "68",
      option_c: "108",
      option_d: "148",
      correct_option: "B",
      explanation: "Nuclear radius is proportional to A^(1/3): R_He / R_X = (A_He / A_X)^(1/3) ⇒ 1 / 3 = (4 / A_X)^(1/3). Cubing both sides: 1 / 27 = 4 / A_X ⇒ A_X = 4 × 27 = 108. The number of neutrons in nucleus X is N = A_X - Z_X = 108 - 40 = 68 neutrons. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1250,
    similarQuestion: {
      question: "A radioactive isotope has a half-life of 60 seconds. If a sample initially contains 8 × 10⁶ active nuclei, the number of nuclei remaining after 30 seconds is:",
      option_a: "4 × 10⁶",
      option_b: "(8 × 10⁶) / √2",
      option_c: "2 × 10⁶",
      option_d: "(4 × 10⁶) √2",
      correct_option: "B",
      explanation: "The number of half-lives elapsed in 30 seconds is n = t / T_{1/2} = 30 / 60 = 1/2. The number of undecayed nuclei remaining is N = N₀ / 2^n = (8 × 10⁶) / 2^(1/2) = (8 × 10⁶) / √2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1682,
    similarQuestion: {
      question: "Consider 500 identical isolated containers, each initially containing exactly 20,000 atoms of a radioactive isotope having a half-life of 2 years. After 2 years, which of the following statements is strictly correct?",
      option_a: "Exactly 10,000 atoms will be found in every single container",
      option_b: "No container can have more than 10,000 undecayed atoms",
      option_c: "Different containers will have slightly different numbers of undecayed atoms due to statistical fluctuations, but the average count across all containers will be very close to 10,000",
      option_d: "All containers will have identical decay rates at all times",
      correct_option: "C",
      explanation: "Radioactive decay is an intrinsically random and probabilistic quantum phenomenon. Each nucleus has an independent 50% probability of decaying in one half-life. Individual containers will experience minor Poisson fluctuations around the expected value, but across a large ensemble of containers, the average number of remaining atoms will be approximately N₀ / 2 = 10,000. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1683,
    similarQuestion: {
      question: "A detector records a radiation count rate of 3,200 counts per second at t = 0 and 200 counts per second at t = 12 seconds from a radioactive source. What is the count rate recorded at t = 9 seconds?",
      option_a: "300 s⁻¹",
      option_b: "400 s⁻¹",
      option_c: "600 s⁻¹",
      option_d: "800 s⁻¹",
      correct_option: "B",
      explanation: "In t = 12 seconds, the count rate drops from 3200 to 200: R / R₀ = 200 / 3200 = 1 / 16 = (1/2)⁴. Thus, 4 half-lives elapse in 12 seconds, giving T_{1/2} = 12 / 4 = 3 seconds. At t = 9 seconds, the number of half-lives elapsed is n = 9 / 3 = 3. The count rate is R(9) = R₀ / 2³ = 3200 / 8 = 400 counts per second. Therefore, Option (B) is the correct answer."
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
  console.log(`Set 63 Part 2 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
