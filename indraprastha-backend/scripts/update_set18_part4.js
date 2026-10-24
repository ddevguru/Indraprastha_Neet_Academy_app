const https = require('https');

function login() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      username: 'indraprasthaadmin',
      password: 'indraprastha@123'
    });
    const req = https.request('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.token) resolve(parsed.token);
          else reject(new Error('No token: ' + data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function updateQuestion(token, id, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ similarQuestion: payload });
    const req = https.request(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
        else reject(new Error(`Failed ${res.statusCode}: ${data}`));
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const updates = [
  {
    id: 4286,
    question: "In an isolated hydrogen atom, an electron is moved between two designated orbitals. Which of the following transitions will result in neither absorption nor emission of a photon?",
    option_a: "2s → 2p_x",
    option_b: "3d_z² → 3d_x²-y²",
    option_c: "4p_y → 4f_xyz",
    option_d: "All of the above",
    correct_option: "D",
    explanation: "For hydrogen and single-electron species (such as He⁺ and Li²⁺), the orbital energy depends exclusively on the principal quantum number n: E_n = -13.6 Z² / n² eV.\nAll subshells (s, p, d, f) having the exact same value of n are strictly degenerate in hydrogen.\n1. Transition 2s → 2p_x occurs between states with n = 2; ΔE = 0.\n2. Transition 3d_z² → 3d_x²-y² occurs between states with n = 3; ΔE = 0.\n3. Transition 4p_y → 4f occurs between states with n = 4; ΔE = 0.\nSince ΔE = 0 for all of these transitions, no electromagnetic radiation is absorbed or emitted.\nTherefore, Option (D) is the correct answer."
  },
  {
    id: 4287,
    question: "Which of the following sets of quantum numbers (n, l, m_l, m_s) is permissible for an electron residing in a 4d orbital?",
    option_a: "n = 4, l = 2, m_l = -2, m_s = +1/2",
    option_b: "n = 4, l = 3, m_l = 0, m_s = -1/2",
    option_c: "n = 4, l = 1, m_l = +2, m_s = +1/2",
    option_d: "n = 4, l = 2, m_l = +3, m_s = -1/2",
    correct_option: "A",
    explanation: "For a 4d orbital:\n1. Principal quantum number: n = 4.\n2. Azimuthal quantum number for d subshell: l = 2.\n3. Magnetic quantum number m_l can range from -l to +l, which means m_l ∈ {-2, -1, 0, +1, +2}.\n4. Spin quantum number m_s can be either +1/2 or -1/2.\nEvaluating the choices:\n- Option (A): n = 4, l = 2, m_l = -2, m_s = +1/2 is fully valid.\n- Option (B): l = 3 designates a 4f orbital.\n- Option (C): l = 1 designates a 4p orbital, and m_l cannot exceed l.\n- Option (D): For l = 2, m_l cannot equal +3.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4288,
    question: "A divalent cation M²⁺ of a 3d transition metal possesses 5 unpaired electrons and the electronic configuration [Ar] 3d⁵. What is the atomic number (Z) of the neutral element M?",
    option_a: "24",
    option_b: "25",
    option_c: "26",
    option_d: "27",
    correct_option: "B",
    explanation: "1. The electronic configuration of the divalent cation M²⁺ is given as [Ar] 3d⁵.\n2. A neutral atom M is formed by adding 2 electrons back to M²⁺.\n3. In 3d transition metals, electrons are lost first from the 4s subshell upon ionization.\n4. Thus, the ground-state electronic configuration of neutral M is [Ar] 3d⁵ 4s².\n5. Total number of electrons in neutral M = 18 (from Ar) + 5 + 2 = 25.\n6. For a neutral atom, Atomic Number (Z) = Total number of electrons = 25 (which corresponds to Manganese, Mn).\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4289,
    question: "What is the correct set of quantum numbers (n, l, m_l, m_s) for the 19th electron of a neutral potassium atom (₁₉K) in its ground state?",
    option_a: "n = 3, l = 2, m_l = 0, m_s = +1/2",
    option_b: "n = 4, l = 0, m_l = 0, m_s = +1/2",
    option_c: "n = 3, l = 1, m_l = -1, m_s = -1/2",
    option_d: "n = 4, l = 1, m_l = 0, m_s = +1/2",
    correct_option: "B",
    explanation: "1. The atomic number of Potassium is Z = 19.\n2. The ground state electronic configuration follows the Aufbau principle: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹.\n3. The first 18 electrons fill the inner shells up to the Argon core [Ar].\n4. The 19th electron enters the 4s orbital because (n + l) for 4s is 4 + 0 = 4, which is lower than (n + l) for 3d (3 + 2 = 5).\n5. For the 4s orbital:\n   - Principal quantum number, n = 4\n   - Azimuthal quantum number, l = 0 (for s orbital)\n   - Magnetic quantum number, m_l = 0\n   - Spin quantum number, m_s = +1/2 (or -1/2)\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4290,
    question: "What is the maximum number of electrons in an atom that can be accommodated in a subshell characterized by principal quantum number n = 4 and azimuthal quantum number l = 3?",
    option_a: "6",
    option_b: "10",
    option_c: "14",
    option_d: "32",
    correct_option: "C",
    explanation: "1. The given quantum numbers are n = 4 and l = 3, which designate the 4f subshell.\n2. The number of orbitals in any subshell is given by (2l + 1).\n   For l = 3: Number of orbitals = 2(3) + 1 = 7 orbitals (m_l = -3, -2, -1, 0, +1, +2, +3).\n3. According to Pauli's Exclusion Principle, each orbital can hold a maximum of 2 electrons with opposite spins.\n4. Maximum electrons = 2 × (2l + 1) = 2 × 7 = 14 electrons.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4291,
    question: "What is the maximum number of electrons that can be accommodated in the principal energy shell with n = 3?",
    option_a: "8",
    option_b: "18",
    option_c: "32",
    option_d: "10",
    correct_option: "B",
    explanation: "1. According to the Bohr-Bury scheme, the maximum capacity of a shell designated by principal quantum number n is given by 2n².\n2. For the M-shell (n = 3):\n   Number of subshells = s, p, d (where l = 0, 1, 2).\n   Total orbitals in shell n = n² = 3² = 9 orbitals (1 s-orbital + 3 p-orbitals + 5 d-orbitals).\n3. Since each orbital accommodates at most 2 electrons:\n   Maximum electrons = 2n² = 2 × 3² = 2 × 9 = 18 electrons.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4292,
    question: "The spin quantum number values m_s = +1/2 and m_s = -1/2 of an electron signify:",
    option_a: "Classical mechanical clockwise and anticlockwise rotations of the electron about its own axis",
    option_b: "Orbital angular momentum along the x and y axes",
    option_c: "Two distinct quantum mechanical spin angular momentum states with no classical mechanical equivalent",
    option_d: "The charge sign and polar orientation of the electron",
    correct_option: "C",
    explanation: "1. The concept of electron spin was introduced by Goudsmit and Uhlenbeck to account for the doublet structure of alkali spectral lines and the Stern-Gerlach experiment.\n2. Spin is an intrinsic, non-classical form of angular momentum carried by elementary particles.\n3. The electron does not literally spin on an axis like a mechanical sphere; if it did, its surface would have to rotate faster than the speed of light.\n4. Hence, m_s = +1/2 and -1/2 represent the two quantized eigenvalues of the z-component of intrinsic spin angular momentum (S_z = ±ℏ/2), which have no classical analog.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4293,
    question: "If the ionization energy of a hydrogen atom from its ground state is 13.6 eV, what is the minimum energy required to remove the electron completely from its second excited state?",
    option_a: "3.40 eV",
    option_b: "1.51 eV",
    option_c: "0.85 eV",
    option_d: "6.80 eV",
    correct_option: "B",
    explanation: "1. The energy of an electron in the n-th Bohr orbit of hydrogen is given by: E_n = -13.6 / n² eV.\n2. The ground state corresponds to n = 1.\n   The first excited state corresponds to n = 2.\n   The second excited state corresponds to n = 3.\n3. For n = 3:\n   E₃ = -13.6 / (3)² = -13.6 / 9 ≈ -1.51 eV.\n4. The ionization energy from the n = 3 state is the energy needed to transition from n = 3 to n = ∞:\n   ΔE = E_∞ - E₃ = 0 - (-1.51 eV) = +1.51 eV.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4294,
    question: "An isolated atom absorbs a photon of wavelength λ₁ = 300 nm and subsequently de-excites to the ground state by successively emitting two photons. If one of the emitted photons has a wavelength λ₂ = 500 nm, what is the wavelength λ₃ of the second emitted photon?",
    option_a: "600 nm",
    option_b: "750 nm",
    option_c: "800 nm",
    option_d: "400 nm",
    correct_option: "B",
    explanation: "1. By the law of conservation of energy: E₁ = E₂ + E₃.\n2. Expressing energy in terms of photon wavelength (E = hc / λ):\n   hc / λ₁ = hc / λ₂ + hc / λ₃\n3. Dividing through by hc:\n   1 / λ₁ = 1 / λ₂ + 1 / λ₃\n   1 / λ₃ = 1 / λ₁ - 1 / λ₂\n4. Substituting λ₁ = 300 nm and λ₂ = 500 nm:\n   1 / λ₃ = 1 / 300 - 1 / 500 = (5 - 3) / 1500 = 2 / 1500 = 1 / 750 nm⁻¹\n5. Inverting gives:\n   λ₃ = 750 nm.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4295,
    question: "Arrange the following electronic states in order of increasing energy according to the (n + l) rule:\n(I) n = 4, l = 2\n(II) n = 5, l = 0\n(III) n = 4, l = 1\n(IV) n = 3, l = 2",
    option_a: "(IV) < (III) < (II) < (I)",
    option_b: "(III) < (IV) < (II) < (I)",
    option_c: "(IV) < (II) < (III) < (I)",
    option_d: "(I) < (II) < (III) < (IV)",
    correct_option: "A",
    explanation: "According to the Bohr-Bury (n + l) rule:\n1. Lower (n + l) corresponds to lower energy.\n2. If two states have identical (n + l), the state with the lower principal quantum number n has lower energy.\nLet us evaluate each state:\n- (I) 4d: n = 4, l = 2 → n + l = 6\n- (II) 5s: n = 5, l = 0 → n + l = 5, n = 5\n- (III) 4p: n = 4, l = 1 → n + l = 5, n = 4\n- (IV) 3d: n = 3, l = 2 → n + l = 5, n = 3\nComparing the three states with n + l = 5:\nSince n = 3 < 4 < 5, their energy order is: (IV) 3d < (III) 4p < (II) 5s.\nState (I) has n + l = 6, which is higher than all of them.\nThus, the overall increasing order of energy is: (IV) < (III) < (II) < (I).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4296,
    question: "An electron in an atom undergoes an indirect transition from energy level 3 to level 1 via intermediate level 2. If the transitions are denoted as 3 → 1, 3 → 2, and 2 → 1 with corresponding frequencies ν₃₁, ν₃₂, ν₂₁ and wavelengths λ₃₁, λ₃₂, λ₂₁, which of the following relations is correct?",
    option_a: "ν₃₁ = ν₃₂ + ν₂₁",
    option_b: "1 / λ₃₁ = 1 / λ₃₂ + 1 / λ₂₁",
    option_c: "ΔE₃₁ = ΔE₃₂ + ΔE₂₁",
    option_d: "All of the above",
    correct_option: "D",
    explanation: "1. By the principle of conservation of energy:\n   ΔE₃₁ = E₃ - E₁ = (E₃ - E₂) + (E₂ - E₁) = ΔE₃₂ + ΔE₂₁\n   Hence, relation C is valid.\n2. Since ΔE = hν:\n   hν₃₁ = hν₃₂ + hν₂₁  ⇒  ν₃₁ = ν₃₂ + ν₂₁\n   Hence, relation A is valid.\n3. Since ν = c / λ:\n   c / λ₃₁ = c / λ₃₂ + c / λ₂₁  ⇒  1 / λ₃₁ = 1 / λ₃₂ + 1 / λ₂₁\n   Hence, relation B is valid.\nSince all three relations are physically correct, Option (D) is correct.\nTherefore, Option (D) is the correct answer."
  },
  {
    id: 4297,
    question: "Which of the following electronic transitions in a hydrogen atom results in the emission of a photon with the greatest energy?",
    option_a: "n = 2 → n = 1",
    option_b: "n = 3 → n = 2",
    option_c: "n = 4 → n = 3",
    option_d: "n = 5 → n = 4",
    correct_option: "A",
    explanation: "1. The energy change for a transition from n₂ to n₁ is given by:\n   ΔE = 13.6 × (1/n₁² - 1/n₂²) eV\n2. Let us compute ΔE for each transition:\n   - For n = 2 → n = 1: ΔE = 13.6 × (1 - 1/4) = 13.6 × 3/4 = 10.20 eV\n   - For n = 3 → n = 2: ΔE = 13.6 × (1/4 - 1/9) = 13.6 × 5/36 ≈ 1.89 eV\n   - For n = 4 → n = 3: ΔE = 13.6 × (1/9 - 1/16) = 13.6 × 7/144 ≈ 0.66 eV\n   - For n = 5 → n = 4: ΔE = 13.6 × (1/16 - 1/25) = 13.6 × 9/400 ≈ 0.31 eV\n3. The transition to the ground state (n = 2 → n = 1) clearly yields the highest emitted photon energy (10.20 eV).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4298,
    question: "A radio transmitter with an output power of 2 kW broadcasts electromagnetic waves at a frequency of 1000 kHz (10⁶ Hz). How many photons are emitted by the transmitter per second? (Take h = 6.626 × 10⁻³⁴ J·s)",
    option_a: "3.02 × 10²⁷",
    option_b: "3.02 × 10³⁰",
    option_c: "1.51 × 10²⁸",
    option_d: "4.85 × 10²⁶",
    correct_option: "B",
    explanation: "1. Power P = 2 kW = 2000 W = 2000 J/s.\n2. The frequency is ν = 1000 kHz = 10⁶ s⁻¹.\n3. The energy carried by a single photon is:\n   E = hν = 6.626 × 10⁻³⁴ J·s × 10⁶ s⁻¹ = 6.626 × 10⁻²⁸ J.\n4. The number of photons emitted per second (n) is:\n   n = P / E = 2000 / (6.626 × 10⁻²⁸) ≈ 3.02 × 10³⁰ photons per second.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4299,
    question: "What is the excitation energy required to raise an electron in a hydrogen atom from its ground state to its second excited state?",
    option_a: "10.20 eV",
    option_b: "12.09 eV",
    option_c: "12.75 eV",
    option_d: "13.60 eV",
    correct_option: "B",
    explanation: "1. Ground state corresponds to n₁ = 1.\n2. Second excited state corresponds to n₂ = 3 (since n = 2 is the 1st excited state).\n3. The energy levels in hydrogen are:\n   E₁ = -13.6 / 1² = -13.6 eV\n   E₃ = -13.6 / 3² = -1.51 eV\n4. The required excitation energy is:\n   ΔE = E₃ - E₁ = -1.51 - (-13.6) = 12.09 eV.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4300,
    question: "What is the minimum energy required to excite an electron in a He⁺ ion from its ground state (n = 1) to its first excited state (n = 2)?",
    option_a: "10.2 eV",
    option_b: "20.4 eV",
    option_c: "40.8 eV",
    option_d: "54.4 eV",
    correct_option: "C",
    explanation: "1. For a hydrogen-like species with atomic number Z, the energy of the n-th level is: E_n = -13.6 × (Z² / n²) eV.\n2. For helium ion (He⁺), Z = 2:\n   - Ground state (n = 1): E₁ = -13.6 × (2² / 1²) = -13.6 × 4 = -54.4 eV.\n   - First excited state (n = 2): E₂ = -13.6 × (2² / 2²) = -13.6 eV.\n3. The excitation energy needed is:\n   ΔE = E₂ - E₁ = -13.6 - (-54.4) = +40.8 eV.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4301,
    question: "In the emission spectrum of atomic hydrogen, which of the following electronic transitions results in the emission of radiation with the shortest (minimum) wavelength?",
    option_a: "n = 4 → n = 1",
    option_b: "n = 3 → n = 2",
    option_c: "n = 5 → n = 3",
    option_d: "n = 2 → n = 1",
    correct_option: "A",
    explanation: "1. The wavelength λ of the emitted photon is inversely proportional to the energy difference ΔE of the transition:\n   λ = hc / ΔE\n   Hence, the minimum wavelength corresponds to the maximum energy difference ΔE.\n2. Calculate ΔE = 13.6 × (1/n₁² - 1/n₂²) eV for each transition:\n   - For n = 4 → n = 1: ΔE = 13.6 × (1 - 1/16) = 13.6 × 15/16 = 12.75 eV\n   - For n = 2 → n = 1: ΔE = 13.6 × (1 - 1/4) = 10.20 eV\n   - For n = 3 → n = 2: ΔE = 13.6 × (1/4 - 1/9) = 1.89 eV\n   - For n = 5 → n = 3: ΔE = 13.6 × (1/9 - 1/25) = 0.97 eV\n3. The transition n = 4 → n = 1 has the largest ΔE (12.75 eV), and therefore produces the shortest wavelength radiation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4302,
    question: "What is the wavelength of the second line of the Balmer series in the emission spectrum of the hydrogen atom? (where R is Rydberg's constant)",
    option_a: "16 / (3R)",
    option_b: "3R / 16",
    option_c: "4 / R",
    option_d: "25 / (21R)",
    correct_option: "A",
    explanation: "1. For the Balmer series, the lower level is n₁ = 2.\n2. The lines of the Balmer series correspond to transitions from higher levels:\n   - 1st line (H_α): n₂ = 3\n   - 2nd line (H_β): n₂ = 4\n3. According to Rydberg's formula:\n   1 / λ = R × (1/n₁² - 1/n₂²) = R × (1/2² - 1/4²)\n   1 / λ = R × (1/4 - 1/16) = R × (4 - 1) / 16 = 3R / 16.\n4. Taking the reciprocal:\n   λ = 16 / (3R).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4303,
    question: "If the kinetic energy of an electron is increased by a factor of 9, by what factor does its associated de Broglie wavelength change?",
    option_a: "Increases by a factor of 3",
    option_b: "Decreases to 1/3 of its initial value",
    option_c: "Increases by a factor of 9",
    option_d: "Decreases to 1/9 of its initial value",
    correct_option: "B",
    explanation: "1. The de Broglie wavelength λ of a particle of mass m and kinetic energy K is given by:\n   λ = h / p = h / √(2mK)\n2. This establishes an inverse square-root proportionality:\n   λ ∝ 1 / √K\n3. When the kinetic energy is increased by a factor of 9 (K' = 9K):\n   λ' = h / √(2m × 9K) = (1 / √9) × [h / √(2mK)] = (1/3) × λ.\n4. Hence, the de Broglie wavelength decreases to 1/3 of its initial value.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4304,
    question: "A neutral atom of an element has the following electron distribution in its main shells: K = 2, L = 8, M = 14, N = 2. What is the total number of p-electrons present in this atom?",
    option_a: "6",
    option_b: "12",
    option_c: "14",
    option_d: "18",
    correct_option: "B",
    explanation: "1. Total electrons = 2 + 8 + 14 + 2 = 26, which corresponds to Iron (Fe, Z = 26).\n2. The subshell electronic configuration following the Aufbau principle is: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s².\n3. Let us tally the electrons in all p-subshells:\n   - In L-shell (n = 2): 2p⁶ contains 6 p-electrons.\n   - In M-shell (n = 3): 3p⁶ contains 6 p-electrons.\n   - N-shell has only 4s electrons.\n4. Total number of p-electrons = 6 + 6 = 12.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4305,
    question: "A neutral atom of Sulfur (Z = 16) has the shell distribution K = 2, L = 8, M = 6. What is the total number of p-electrons present in this atom?",
    option_a: "6",
    option_b: "8",
    option_c: "10",
    option_d: "12",
    correct_option: "C",
    explanation: "1. The atomic number of Sulfur is Z = 16.\n2. Writing the subshell electronic configuration: 1s² 2s² 2p⁶ 3s² 3p⁴.\n3. Let us identify the p-subshells:\n   - 2p subshell holds 6 electrons.\n   - 3p subshell holds 4 electrons.\n4. Total number of p-electrons = 6 + 4 = 10.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4306,
    question: "What is the maximum number of electrons in an atom that can be associated with the quantum numbers n = 4 and l = 1?",
    option_a: "2",
    option_b: "6",
    option_c: "10",
    option_d: "14",
    correct_option: "B",
    explanation: "1. The given quantum numbers are n = 4 and l = 1, which represents the 4p subshell.\n2. For any subshell with azimuthal quantum number l, the number of degenerate orbitals is (2l + 1).\n   For l = 1: Number of orbitals = 2(1) + 1 = 3 (namely 4p_x, 4p_y, 4p_z).\n3. By Pauli's exclusion principle, each orbital can hold at most 2 electrons with opposite spins.\n4. Maximum number of electrons = 2 × (2l + 1) = 2 × 3 = 6 electrons.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4307,
    question: "In the ground-state electronic configuration of Scandium (₂₁Sc), what is the correct relative energy ordering of the 3d and 4s subshells during filling, and why does the 4s subshell fill before the 3d subshell?",
    option_a: "Energy of 4s < 3d because (n + l) for 4s is 4, whereas (n + l) for 3d is 5",
    option_b: "Energy of 4s > 3d because 4s has a higher principal quantum number",
    option_c: "Energy of 4s = 3d because both belong to outer valence shells",
    option_d: "Energy of 3d < 4s because d-orbitals have higher penetration power",
    correct_option: "A",
    explanation: "1. According to the Aufbau principle and the Bohr-Bury (n + l) rule:\n   - For the 4s subshell: n = 4, l = 0 ⇒ (n + l) = 4 + 0 = 4.\n   - For the 3d subshell: n = 3, l = 2 ⇒ (n + l) = 3 + 2 = 5.\n2. A subshell with a lower value of (n + l) has lower energy and is filled first.\n3. Because (n + l) for 4s (4) is less than (n + l) for 3d (5), the 4s subshell is of lower energy than 3d and fills before 3d begins filling.\nTherefore, Option (A) is the correct answer."
  }
];

async function run() {
  try {
    const token = await login();
    console.log('Logged in successfully, token received.');
    let count = 0;
    for (const item of updates) {
      await updateQuestion(token, item.id, item);
      count++;
      console.log(`[SUCCESS] Updated question ${item.id} (${count}/${updates.length})`);
    }
    console.log(`Set 18 Part 4 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
