const fs = require('fs');

const atomicBatch7Updates = [
  {
    id: 4476, // Q38
    similar_question: {
      question: "For a principal quantum number n = 3, what is the total number of orbitals (or possible values of the magnetic quantum number, m_l) associated with this shell?",
      option_a: "9",
      option_b: "6",
      option_c: "18",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: Values of azimuthal quantum number (l) for n = 3:\nThe azimuthal quantum number l can have values from 0 to (n − 1):\nFor n = 3, l = 0, 1, 2.\n\nStep 2: Number of orbitals (m_l values) in each subshell:\n- For l = 0 (3s subshell): m_l = 0 (1 orbital)\n- For l = 1 (3p subshell): m_l = −1, 0, +1 (3 orbitals)\n- For l = 2 (3d subshell): m_l = −2, −1, 0, +1, +2 (5 orbitals)\n\nStep 3: Total number of orbitals in the shell:\nTotal orbitals = 1 + 3 + 5 = 9 orbitals.\n\nAlternatively, for any principal quantum number n, the total number of orbitals is given by n²:\nTotal orbitals = 3² = 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4477, // Q39
    similar_question: {
      question: "Bohr's atomic model is successfully applicable to which of the following chemical species?",
      option_a: "He⁺ ion",
      option_b: "Neutral He atom",
      option_c: "Li⁺ ion",
      option_d: "H₂ molecule",
      correct_option: "A",
      explanation: "Step 1: Postulate of Bohr's atomic model:\nBohr's theory applies strictly to single-electron (hydrogen-like) species because it does not account for inter-electronic repulsions in multi-electron systems.\n\nStep 2: Evaluate the electron count of each given species:\n- Option (A) He⁺ ion: Helium (atomic number Z = 2) has 2 electrons in the neutral state. The He⁺ ion has lost one electron: 2 − 1 = 1 electron (single-electron species; Bohr's model applies successfully).\n- Option (B) Neutral He atom: Contains 2 electrons (multi-electron system).\n- Option (C) Li⁺ ion: Lithium (Z = 3) has lost one electron: 3 − 1 = 2 electrons (multi-electron system).\n- Option (D) H₂ molecule: A diatomic molecule containing 2 electrons and two nuclei.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4478, // Q40
    similar_question: {
      question: "Calculate the de Broglie wavelength of an α-particle (mass, m = 6.64 × 10⁻²⁷ kg) moving with a kinetic energy of 3.32 × 10⁻²¹ J.\n(Given: Planck's constant, h = 6.63 × 10⁻³⁴ J s)",
      option_a: "1.0 Å",
      option_b: "0.10 Å",
      option_c: "10 Å",
      option_d: "0.01 Å",
      correct_option: "A",
      explanation: "Step 1: de Broglie wavelength formula in terms of kinetic energy (K):\nλ = h / √(2 × m × K)\n\nStep 2: Calculate linear momentum (p = √(2mK)):\n2 × m × K = 2 × (6.64 × 10⁻²⁷ kg) × (3.32 × 10⁻²¹ J)\n          = (6.64)² × 10⁻⁴⁸ kg² m² s⁻²\n√(2mK) = 6.64 × 10⁻²⁴ kg m s⁻¹.\n\nStep 3: Calculate wavelength (λ):\nλ = (6.63 × 10⁻³⁴ J s) / (6.64 × 10⁻²⁴ kg m s⁻¹)\n  ≈ 1.0 × 10⁻¹⁰ m\n  = 1.0 Å  (since 1 Å = 10⁻¹⁰ m).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4479, // Q41
    similar_question: {
      question: "Which of the following statements regarding atomic orbitals and their nodes is correct?",
      option_a: "A 3p orbital has 1 radial node and 1 angular nodal plane",
      option_b: "For a 2p_x orbital, the xy-plane is the nodal plane",
      option_c: "A 3s orbital has no radial (spherical) nodes",
      option_d: "The 3d_z² orbital possesses two planar nodal planes",
      correct_option: "A",
      explanation: "Step 1: General formulas for nodes of atomic orbitals:\n- Number of radial (spherical) nodes = n − l − 1\n- Number of angular nodes (nodal planes) = l\n- Total nodes = n − 1\n\nStep 2: Evaluate Option (A) for a 3p orbital:\nFor 3p: principal quantum number n = 3, azimuthal quantum number l = 1.\n- Radial nodes = 3 − 1 − 1 = 1\n- Angular nodes = l = 1 (one nodal plane)\nTherefore, statement (A) is correct.\n\nStep 3: Evaluate other statements:\n- Statement (B): For a 2p_x orbital, the electron cloud is oriented along the x-axis, so the nodal plane is the yz-plane, not the xy-plane.\n- Statement (C): For a 3s orbital (n = 3, l = 0), radial nodes = 3 − 0 − 1 = 2 (it has two radial nodes).\n- Statement (D): The 3d_z² orbital has two conical nodal surfaces, not planar nodal planes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4480, // Q42
    similar_question: {
      question: "If the uncertainty in the position of a moving electron is 1.0 Å (1.0 × 10⁻¹⁰ m), what is the minimum uncertainty in its velocity?\n(Given: h = 6.626 × 10⁻³⁴ J s, mass of electron m = 9.1 × 10⁻³¹ kg, π = 3.14)",
      option_a: "5.8 × 10⁵ m s⁻¹",
      option_b: "5.8 × 10⁷ m s⁻¹",
      option_c: "5.8 × 10³ m s⁻¹",
      option_d: "5.8 × 10⁻⁵ m s⁻¹",
      correct_option: "A",
      explanation: "Step 1: Heisenberg's Uncertainty Principle relation:\nΔx × Δp ≥ h / (4π)\nSince Δp = m × Δv:\nΔx × m × Δv ≥ h / (4π)\nΔv ≥ h / (4π × m × Δx)\n\nStep 2: Substitute the given values:\n- h = 6.626 × 10⁻³⁴ J s\n- m = 9.1 × 10⁻³¹ kg\n- Δx = 1.0 × 10⁻¹⁰ m\n- π = 3.14\n\nStep 3: Calculate minimum uncertainty in velocity (Δv):\nΔv = (6.626 × 10⁻³⁴) / [4 × 3.14 × (9.1 × 10⁻³¹) × (1.0 × 10⁻¹⁰)]\n   = (6.626 × 10⁻³⁴) / (1.143 × 10⁻³⁹)\n   ≈ 5.797 × 10⁵ m s⁻¹\n   ≈ 5.8 × 10⁵ m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4482, // Q43
    similar_question: {
      question: "According to Planck's Quantum Theory, which of the following statements is INCORRECT?",
      option_a: "Radiant energy is emitted or absorbed continuously in a steady stream",
      option_b: "The energy of a single quantum (photon) is directly proportional to its frequency (E = hν)",
      option_c: "The total energy emitted or absorbed by a body is an integral multiple of a quantum (E = n h ν)",
      option_d: "The smallest discrete packet of energy associated with electromagnetic radiation is called a quantum",
      correct_option: "A",
      explanation: "Step 1: Postulates of Planck's Quantum Theory (1900):\n1. Atoms and molecules emit or absorb radiant energy discontinuously in the form of small, discrete packets of energy called quanta (or photons in the case of light).\n2. The energy (E) of each quantum is directly proportional to the frequency (ν) of radiation: E = h × ν (where h is Planck's constant).\n3. Energy emission or absorption is quantized, meaning the total energy emitted or absorbed is an integral multiple of a quantum: E = n × h × ν (where n = 1, 2, 3...).\n\nStep 2: Analyze statement (A):\nStating that energy is emitted or absorbed continuously represents classical Maxwell electromagnetic wave theory, which Planck's quantum theory refuted.\n\nTherefore, Option (A) is the incorrect statement and the correct answer."
    }
  },
  {
    id: 4483, // Q44
    similar_question: {
      question: "In the ground state of a copper atom (Cu, Z = 29), what are the total number of electrons with azimuthal quantum number l = 1 and l = 2, respectively?",
      option_a: "12 and 10",
      option_b: "12 and 9",
      option_c: "14 and 10",
      option_d: "10 and 10",
      correct_option: "A",
      explanation: "Step 1: Ground state electronic configuration of copper (Z = 29):\nDue to the extra stability of a completely filled 3d subshell:\nCu: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹\n\nStep 2: Count electrons with azimuthal quantum number l = 1 (p subshell):\n- 2p subshell: 6 electrons (2p⁶)\n- 3p subshell: 6 electrons (3p⁶)\nTotal electrons with l = 1 = 6 + 6 = 12 electrons.\n\nStep 3: Count electrons with azimuthal quantum number l = 2 (d subshell):\n- 3d subshell: 10 electrons (3d¹⁰)\nTotal electrons with l = 2 = 10 electrons.\n\nTherefore, the number of electrons with l = 1 is 12 and with l = 2 is 10. Option (A) is the correct answer."
    }
  },
  {
    id: 4484, // Q45
    similar_question: {
      question: "What is the energy of an electron in the second Bohr orbit (n = 2) of a hydrogen atom expressed in kJ mol⁻¹?\n(Given: Ionization enthalpy of hydrogen atom = 1312 kJ mol⁻¹)",
      option_a: "−328.0 kJ mol⁻¹",
      option_b: "−145.8 kJ mol⁻¹",
      option_c: "−82.0 kJ mol⁻¹",
      option_d: "−656.0 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: Formula for the energy of an electron in the nth Bohr orbit in kJ mol⁻¹:\nEₙ = −(1312 / n²) kJ mol⁻¹\n\nStep 2: Calculate for the second orbit (n = 2):\nE₂ = −(1312 / 2²) kJ mol⁻¹\n   = −(1312 / 4) kJ mol⁻¹\n   = −328.0 kJ mol⁻¹.\n\n(For comparison:\n- n = 1: E₁ = −1312 kJ mol⁻¹\n- n = 3: E₃ = −1312 / 9 = −145.8 kJ mol⁻¹\n- n = 4: E₄ = −1312 / 16 = −82.0 kJ mol⁻¹).\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Login failed');

    console.log('--- UPDATING ATOMIC STRUCTURE FINAL BATCH 7 (Q38 to Q45) ---');
    for (const item of atomicBatch7Updates) {
      const res = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          similarQuestion: item.similar_question
        })
      });
      const data = await res.json();
      console.log(`Updated Question ID ${item.id}:`, data.success ? 'SUCCESS' : data);
    }
    console.log('\n--- ALL 45 QUESTIONS OF TEST 94 (ATOMIC STRUCTURE) UPDATED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('Error:', err);
  }
}

if (process.argv[2] === '--commit') {
  main();
} else {
  console.log('Script ready for execution with --commit');
}
