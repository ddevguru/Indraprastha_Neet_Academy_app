// scripts/update_set62_part4.js
// Update Set 62 (Atoms) Part 4: Q83 to Q109 (IDs 3610 to 3636)

const questions = [
  {
    id: 3610,
    similarQuestion: {
      question: "A rigid diatomic molecule consists of two point masses m₁ and m₂ separated by a fixed bond distance r. If its rotational angular momentum is quantized according to Bohr's rule L = n ℏ = n h / (2π), what is its quantized rotational kinetic energy?",
      option_a: "[n² h² (m₁ + m₂)] / [8π² m₁ m₂ r²]",
      option_b: "[n² h²] / [8π² (m₁ + m₂) r²]",
      option_c: "[n h (m₁ + m₂)] / [4π m₁ m₂ r²]",
      option_d: "[n² h² m₁ m₂] / [8π² (m₁ + m₂) r²]",
      correct_option: "A",
      explanation: "Step 1: The moment of inertia of a diatomic molecule about its center of mass is I = μ r², where μ = m₁ m₂ / (m₁ + m₂) is the reduced mass.\nStep 2: The rotational kinetic energy is E_rot = L² / (2I).\nStep 3: Quantizing angular momentum as L = n ℏ = n h / (2π):\nE_rot = (n h / 2π)² / (2 μ r²) = [n² h²] / [8π² μ r²] = [n² h² (m₁ + m₂)] / [8π² m₁ m₂ r²].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3611,
    similarQuestion: {
      question: "Which type of curve correctly describes the variation of electron orbital speed vₙ with the principal quantum number n in the Bohr model of the hydrogen atom?",
      option_a: "Rectangular hyperbola (vₙ ∝ 1/n)",
      option_b: "Straight line through origin",
      option_c: "Parabola opening upwards",
      option_d: "Exponential decay",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, the orbital speed in the n-th orbit is given by vₙ = v₁ / n.\nStep 2: Since vₙ varies inversely with n (vₙ ∝ 1/n), the product vₙ × n is constant.\nStep 3: The graph of vₙ versus n is therefore a rectangular hyperbola.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3612,
    similarQuestion: {
      question: "In a hydrogen atom, an electron transitions from orbit (n + 1) to orbit n. For very large principal quantum numbers (n ≫ 1), the wavelength λ of the emitted radiation varies with n as:",
      option_a: "λ ∝ n³",
      option_b: "λ ∝ n²",
      option_c: "λ ∝ n",
      option_d: "λ ∝ n⁴",
      correct_option: "A",
      explanation: "Step 1: By the Rydberg formula: 1 / λ = R [1 / n² - 1 / (n + 1)²] = R [2n + 1] / [n² (n + 1)²].\nStep 2: For n ≫ 1, 2n + 1 ≈ 2n and n + 1 ≈ n:\n1 / λ ≈ R (2n) / n⁴ = 2R / n³.\nStep 3: Taking the reciprocal gives λ ≈ n³ / (2R) ∝ n³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3613,
    similarQuestion: {
      question: "What is the energy required to excite an electron in a singly ionized helium ion (He⁺, Z = 2) from the ground state (n = 1) to the third Bohr orbit (n = 3)?",
      option_a: "48.36 eV",
      option_b: "40.80 eV",
      option_c: "51.00 eV",
      option_d: "54.40 eV",
      correct_option: "A",
      explanation: "Step 1: The transition energy in a single-electron ion is given by:\nΔE = 13.6 Z² (1 / n₁² - 1 / n₂²) eV.\nStep 2: For He⁺, Z = 2, n₁ = 1, and n₂ = 3:\nΔE = 13.6 × 2² × (1 / 1 - 1 / 9) = 13.6 × 4 × (8 / 9) = 54.4 × (8 / 9) ≈ 48.36 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3614,
    similarQuestion: {
      question: "In a certain hydrogen-like ion, the transition n = 4 → 3 produces ultraviolet radiation. Which of the following transitions in the same ion will produce radiation of lower photon energy (in the infrared region)?",
      option_a: "n = 5 → n = 4",
      option_b: "n = 3 → n = 2",
      option_c: "n = 4 → n = 2",
      option_d: "n = 2 → n = 1",
      correct_option: "A",
      explanation: "Step 1: Energy gaps between adjacent orbits decrease rapidly with increasing n: ΔE(5 → 4) < ΔE(4 → 3) < ΔE(3 → 2) < ΔE(2 → 1).\nStep 2: If n = 4 → 3 produces ultraviolet light, a transition with a smaller energy gap will emit longer wavelengths (infrared radiation).\nStep 3: The transition n = 5 → 4 has a smaller energy gap than n = 4 → 3, shifting the radiation into the infrared region.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3615,
    similarQuestion: {
      question: "An electron is bound to a central nucleus by an attractive force F(r) = C / r, where C is a constant. Applying Bohr's quantization condition, how do the orbital radius rₙ and the kinetic energy Tₙ depend on the quantum number n?",
      option_a: "rₙ ∝ n and Tₙ is independent of n",
      option_b: "rₙ ∝ n² and Tₙ ∝ 1/n²",
      option_c: "rₙ ∝ n and Tₙ ∝ 1/n",
      option_d: "rₙ ∝ √n and Tₙ ∝ n",
      correct_option: "A",
      explanation: "Step 1: Centripetal force balance gives m v² / r = C / r ⇒ v = √(C / m), which is constant.\nStep 2: Kinetic energy is Tₙ = (1/2) m v² = C / 2, which is independent of n.\nStep 3: Bohr quantization gives m v r = n ℏ ⇒ rₙ = (n ℏ) / √(m C) ∝ n.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3616,
    similarQuestion: {
      question: "Which of the following transitions in an atomic hydrogen emission spectrum produces a photon of the highest frequency?",
      option_a: "n = 2 → n = 1",
      option_b: "n = 6 → n = 2",
      option_c: "n = 5 → n = 3",
      option_d: "n = 4 → n = 3",
      correct_option: "A",
      explanation: "Step 1: Frequency is directly proportional to transition energy: f = ΔE / h.\nStep 2: The n = 2 → 1 transition has ΔE = 10.2 eV.\nStep 3: The highest possible Balmer transition (from n = ∞ to 2) has ΔE = 3.4 eV, and higher series have even smaller energies.\nThus, n = 2 → 1 emits the highest frequency.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3617,
    similarQuestion: {
      question: "In the energy level diagram of atomic hydrogen, what is the energy difference between the n = 4 level (E₄ = -0.85 eV) and the n = 2 level (E₂ = -3.40 eV)?",
      option_a: "2.55 eV",
      option_b: "1.89 eV",
      option_c: "10.20 eV",
      option_d: "0.66 eV",
      correct_option: "A",
      explanation: "Step 1: The energy of the emitted photon in the n = 4 → 2 transition (H-β line) is:\nΔE = E₄ - E₂.\nStep 2: Substituting E₄ = -0.85 eV and E₂ = -3.40 eV:\nΔE = -0.85 eV - (-3.40 eV) = 2.55 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3618,
    similarQuestion: {
      question: "The spectral lines of deuterium are slightly shifted towards shorter wavelengths compared to the corresponding lines of ordinary hydrogen primarily because:",
      option_a: "The nuclear mass of deuterium is approximately twice that of hydrogen, resulting in a slightly larger reduced mass",
      option_b: "The nuclear charge of deuterium is twice that of hydrogen",
      option_c: "The nuclear radius of deuterium produces extra electrostatic screening",
      option_d: "Deuterium has two orbiting electrons",
      correct_option: "A",
      explanation: "Step 1: Rydberg constant depends on reduced mass: R_M = R_∞ / (1 + m_e / M_nucleus).\nStep 2: Because the deuteron is about twice as massive as the proton, the reduced mass of the electron-deuteron system is slightly greater.\nStep 3: A larger reduced mass increases transition energies and slightly shifts spectral lines towards shorter wavelengths.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3619,
    similarQuestion: {
      question: "If the ionization energy of hydrogen from its ground state is 13.6 eV, what is the energy required to ionize a hydrogen atom from its second excited state (n = 3)?",
      option_a: "1.51 eV",
      option_b: "3.40 eV",
      option_c: "4.53 eV",
      option_d: "0.85 eV",
      correct_option: "A",
      explanation: "Step 1: The binding energy of an electron in the n-th state of hydrogen is:\nE_b = 13.6 / n² eV.\nStep 2: The second excited state corresponds to n = 3.\nStep 3: Calculating E_b:\nE_b = 13.6 / 3² = 13.6 / 9 ≈ 1.51 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3620,
    similarQuestion: {
      question: "If the radius of the first orbit of a single-electron ion with atomic number Z = 50 is R₀, what is the radius of the fourth orbit (n = 4) of this ion?",
      option_a: "16 R₀",
      option_b: "4 R₀",
      option_c: "8 R₀",
      option_d: "2 R₀",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, the orbital radius is proportional to n²:\nrₙ = r₁ n².\nStep 2: For n = 4:\nr₄ = R₀ (4)² = 16 R₀.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3621,
    similarQuestion: {
      question: "According to Bohr's postulates for the hydrogen atom, which of the following physical quantities are quantized in stationary states?",
      option_a: "Orbital angular momentum and total energy",
      option_b: "Linear momentum and linear velocity",
      option_c: "Electric potential and charge",
      option_d: "Only radius",
      correct_option: "A",
      explanation: "Step 1: Bohr's second postulate directly quantizes orbital angular momentum: L = n (h / 2π).\nStep 2: As a direct consequence, the stationary orbital radii and total energy states Eₙ = -13.6 / n² eV are also quantized.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3622,
    similarQuestion: {
      question: "A positively charged alpha particle with velocity v heads directly towards a fixed heavy nucleus and reaches a minimum distance of closest approach d. If its initial velocity is tripled (3v), what will be the new distance of closest approach?",
      option_a: "d / 9",
      option_b: "d / 3",
      option_c: "3d",
      option_d: "9d",
      correct_option: "A",
      explanation: "Step 1: By conservation of energy at closest approach: (1/2) m v² = k Q q / d ⇒ d ∝ 1 / v².\nStep 2: When velocity becomes 3v:\nd' = d / (3)² = d / 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3623,
    similarQuestion: {
      question: "What is the ratio of the area enclosed by the second excited state (n = 3) to the ground state (n = 1) in a Bohr hydrogen atom?",
      option_a: "81 : 1",
      option_b: "9 : 1",
      option_c: "27 : 1",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "Step 1: The radius of the n-th orbit is rₙ = r₁ n².\nStep 2: The circular area enclosed is Aₙ = π rₙ² = π (r₁ n²)² = π r₁² n⁴ = A₁ n⁴.\nStep 3: For the second excited state (n = 3) compared to the ground state (n = 1):\nA₃ / A₁ = 3⁴ / 1⁴ = 81 / 1 = 81 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3624,
    similarQuestion: {
      question: "What is the centripetal acceleration of an electron in the first orbit of hydrogen in terms of its orbital speed v₁ and radius r₁?",
      option_a: "v₁² / r₁",
      option_b: "v₁ / r₁²",
      option_c: "v₁² r₁",
      option_d: "v₁ r₁",
      correct_option: "A",
      explanation: "Step 1: For any particle moving in a uniform circle of radius r with speed v, the acceleration directed towards the center is the centripetal acceleration.\nStep 2: The standard kinematic relation gives a = v² / r.\nStep 3: For the first orbit, this is a₁ = v₁² / r₁.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3625,
    similarQuestion: {
      question: "In Rutherford scattering, the distance of closest approach in a head-on collision between a projectile of charge q and mass m moving at speed v and a stationary nucleus of charge Q is proportional to:",
      option_a: "1 / (m v²)",
      option_b: "m v²",
      option_c: "v² / m",
      option_d: "m / v",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy equals electrostatic potential energy at closest approach:\n(1/2) m v² = (1 / 4πε₀) (q Q / r₀).\nStep 2: Solving for r₀:\nr₀ = [2 k q Q] / (m v²).\nStep 3: Hence r₀ ∝ 1 / (m v²).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3626,
    similarQuestion: {
      question: "In the Bohr model of the hydrogen atom, let rₙ be the orbital radius and vₙ be the orbital speed of the electron. Which of the following combinations is directly proportional to the principal quantum number n?",
      option_a: "vₙ × rₙ",
      option_b: "vₙ / rₙ",
      option_c: "rₙ / vₙ²",
      option_d: "vₙ² × rₙ",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, vₙ ∝ 1 / n and rₙ ∝ n².\nStep 2: Multiplying both quantities:\nvₙ × rₙ ∝ (1 / n) × n² = n.\nStep 3: Furthermore, vₙ × rₙ = L / m = n ℏ / m, which is directly proportional to n.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3627,
    similarQuestion: {
      question: "In a hydrogen-like atom, the orbital angular momentum L of an electron is related to its orbital radius r as:",
      option_a: "L ∝ √r",
      option_b: "L ∝ 1 / √r",
      option_c: "L ∝ r",
      option_d: "L ∝ r²",
      correct_option: "A",
      explanation: "Step 1: Centripetal force balance gives m v² / r = k Z e² / r² ⇒ v = √(k Z e² / (m r)).\nStep 2: Angular momentum is L = m v r.\nStep 3: Substituting v:\nL = m √(k Z e² / (m r)) × r = √(m k Z e² r) ∝ √r.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3628,
    similarQuestion: {
      question: "What is the orbital angular momentum (moment of linear momentum) of an electron in the 4th Bohr orbit of hydrogen?",
      option_a: "2h / π",
      option_b: "h / π",
      option_c: "4h / π",
      option_d: "h / (2π)",
      correct_option: "A",
      explanation: "Step 1: Bohr's angular momentum quantization formula is Lₙ = n (h / 2π).\nStep 2: For n = 4:\nL₄ = 4 (h / 2π) = 2h / π.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3629,
    similarQuestion: {
      question: "If the potential energy of a hydrogen atom in its ground state (n = 1) is chosen to be zero, what will be its potential energy in the second excited state (n = 3)?",
      option_a: "24.18 eV",
      option_b: "20.40 eV",
      option_c: "27.20 eV",
      option_d: "3.02 eV",
      correct_option: "A",
      explanation: "Step 1: In the standard convention (zero at infinity), potential energy is Uₙ = -27.2 / n² eV:\nU₁ = -27.2 eV\nU₃ = -27.2 / 3² = -27.2 / 9 ≈ -3.02 eV.\nStep 2: To make ground state potential energy equal to zero, add +27.2 eV to all potential energies:\nShift = +27.2 eV.\nStep 3: The new potential energy in the n = 3 state is:\nU₃' = -3.02 eV + 27.20 eV = 24.18 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3630,
    similarQuestion: {
      question: "A hydrogen atom drops from an excited state with principal quantum number n directly to the ground state (n = 1) emitting a photon of wavelength λ. The value of n in terms of Rydberg constant R and λ is:",
      option_a: "√[λ R / (λ R - 1)]",
      option_b: "√[(λ R - 1) / (λ R)]",
      option_c: "λ R / (λ R - 1)",
      option_d: "√[λ R - 1]",
      correct_option: "A",
      explanation: "Step 1: From the Rydberg formula: 1 / λ = R (1 / 1² - 1 / n²) = R (1 - 1 / n²).\nStep 2: Rearranging:\n1 / (λ R) = 1 - 1 / n² ⇒ 1 / n² = 1 - 1 / (λ R) = (λ R - 1) / (λ R).\nStep 3: Inverting and taking the square root:\nn = √[λ R / (λ R - 1)].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3631,
    similarQuestion: {
      question: "The orbital angular velocity ω of an electron in a Bohr orbit of the hydrogen atom is proportional to:",
      option_a: "1 / n³",
      option_b: "1 / n²",
      option_c: "1 / n",
      option_d: "n²",
      correct_option: "A",
      explanation: "Step 1: Angular velocity is defined as ω = vₙ / rₙ.\nStep 2: In the Bohr model, vₙ ∝ 1 / n and rₙ ∝ n².\nStep 3: Substituting these scalings:\nω ∝ (1 / n) / n² = 1 / n³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3632,
    similarQuestion: {
      question: "What is the ratio of the kinetic energy to the total energy of an electron in any stationary orbit of a hydrogen atom?",
      option_a: "-1",
      option_b: "+1",
      option_c: "-2",
      option_d: "+2",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, kinetic energy is KE = +13.6 / n² eV.\nStep 2: Total mechanical energy is E = -13.6 / n² eV.\nStep 3: Taking the ratio:\nKE / E = (+13.6 / n²) / (-13.6 / n²) = -1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3633,
    similarQuestion: {
      question: "When continuous white light is transmitted through a coloured transparent chemical solution (such as copper sulfate or potassium permanganate), the emergent light produces a:",
      option_a: "Band absorption spectrum",
      option_b: "Line emission spectrum",
      option_c: "Continuous emission spectrum",
      option_d: "Line absorption spectrum",
      correct_option: "A",
      explanation: "Step 1: Molecules in liquid solution possess closely spaced electronic, vibrational, and rotational energy levels.\nStep 2: When white light passes through, absorption occurs over continuous bands of wavelengths rather than discrete isolated lines.\nStep 3: The transmitted light displays dark broad regions known as a band absorption spectrum.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3634,
    similarQuestion: {
      question: "In the Bohr model of the hydrogen atom, the product of the electron's orbital speed vₙ and its orbital radius rₙ varies with the principal quantum number n as n^x. What is the value of x?",
      option_a: "1",
      option_b: "0",
      option_c: "2",
      option_d: "-1",
      correct_option: "A",
      explanation: "Step 1: In the Bohr model, orbital speed varies as vₙ ∝ 1 / n.\nStep 2: Orbital radius varies as rₙ ∝ n².\nStep 3: The product is vₙ × rₙ ∝ (1 / n) × n² = n¹.\nThus, x = 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3635,
    similarQuestion: {
      question: "In an atom with energy levels E₁ = -15 eV, E₂ = -10 eV, E₃ = -5 eV, and E₄ = -2 eV, which emission transition produces the photon of greatest energy?",
      option_a: "n = 4 → n = 1 (ΔE = 13 eV)",
      option_b: "n = 3 → n = 1 (ΔE = 10 eV)",
      option_c: "n = 4 → n = 2 (ΔE = 8 eV)",
      option_d: "n = 2 → n = 1 (ΔE = 5 eV)",
      correct_option: "A",
      explanation: "Step 1: The energy emitted in a transition between two levels is ΔE = E_initial - E_final.\nStep 2: Evaluating the choices:\n(A) 4 → 1: -2 eV - (-15 eV) = 13 eV\n(B) 3 → 1: -5 eV - (-15 eV) = 10 eV\n(C) 4 → 2: -2 eV - (-10 eV) = 8 eV\n(D) 2 → 1: -10 eV - (-15 eV) = 5 eV.\nStep 3: The transition n = 4 → 1 releases the largest energy (13 eV).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3636,
    similarQuestion: {
      question: "An electron is in an excited orbit of a hydrogen atom from which a maximum of 10 spectral lines can be emitted upon de-excitation. Another electron is in an orbit of a hydrogen atom from which a maximum of 6 spectral lines can be emitted. What is the ratio of the orbital velocities of the electrons in these two orbits?",
      option_a: "4 : 5",
      option_b: "5 : 4",
      option_c: "2 : 3",
      option_d: "3 : 2",
      correct_option: "A",
      explanation: "Step 1: The number of emission lines is N = n(n - 1) / 2.\nFor the first atom: n₁(n₁ - 1) / 2 = 10 ⇒ n₁ = 5.\nFor the second atom: n₂(n₂ - 1) / 2 = 6 ⇒ n₂ = 4.\nStep 2: In the Bohr model, orbital velocity varies as v ∝ 1 / n.\nStep 3: Taking the ratio of velocities:\nv₁ / v₂ = (1 / n₁) / (1 / n₂) = n₂ / n₁ = 4 / 5 = 4 : 5.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 62 Part 4.");

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
  console.log("Set 62 Part 4 completed successfully!");
}

main().catch(console.error);
