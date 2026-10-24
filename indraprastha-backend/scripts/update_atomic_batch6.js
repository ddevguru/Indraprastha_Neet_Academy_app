const fs = require('fs');

const atomicBatch6Updates = [
  {
    id: 4467, // Q31
    similar_question: {
      question: "What is the energy of an electron in the third Bohr orbit (n = 3) of a hydrogen atom expressed in Joules?\n(Given: Rydberg constant energy for hydrogen, E₁ = −2.18 × 10⁻¹⁸ J)",
      option_a: "−2.42 × 10⁻¹⁹ J",
      option_b: "−2.42 × 10⁻¹⁹ kJ",
      option_c: "−1.51 × 10⁻¹⁹ J",
      option_d: "−5.45 × 10⁻¹⁹ J",
      correct_option: "A",
      explanation: "Step 1: Formula for the energy of an electron in the nth Bohr orbit:\nEₙ = −(2.18 × 10⁻¹⁸ / n²) J\n\nStep 2: Calculate for the third Bohr orbit (n = 3):\nE₃ = −(2.18 × 10⁻¹⁸ / 3²) J\n   = −(2.18 × 10⁻¹⁸ / 9) J\n   = −0.2422 × 10⁻¹⁸ J\n   = −2.42 × 10⁻¹⁹ J.\n\nNote: In electron-volts, E₃ = −13.6 / 3² = −1.51 eV = −1.51 × 1.602 × 10⁻¹⁹ J = −2.42 × 10⁻¹⁹ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4468, // Q32
    similar_question: {
      question: "When an electron in a hydrogen atom transitions from the fourth energy level (n = 4) to the second energy level (n = 2), what is the energy of the emitted photon in electron-volts?",
      option_a: "2.55 eV",
      option_b: "10.20 eV",
      option_c: "1.89 eV",
      option_d: "0.66 eV",
      correct_option: "A",
      explanation: "Step 1: Formula for energy levels of a hydrogen atom:\nEₙ = −13.6 / n² eV\n\nStep 2: Calculate energies of the initial and final states:\n- For n = 2: E₂ = −13.6 / 2² = −13.6 / 4 = −3.40 eV\n- For n = 4: E₄ = −13.6 / 4² = −13.6 / 16 = −0.85 eV\n\nStep 3: Calculate energy of the emitted photon (ΔE):\nΔE = E₄ − E₂\n   = −0.85 eV − (−3.40 eV)\n   = 3.40 eV − 0.85 eV\n   = 2.55 eV.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4469, // Q33
    similar_question: {
      question: "Which of the following expressions correctly represents the de Broglie wavelength (λ) of a particle of mass m having kinetic energy K?\n(Given: h is Planck's constant)",
      option_a: "λ = h / √(2mK)",
      option_b: "λ = √(2mK) / h",
      option_c: "λ = h / (2mK)",
      option_d: "λ = 2mK / h",
      correct_option: "A",
      explanation: "Step 1: de Broglie wavelength relation:\nλ = h / p\nwhere h is Planck's constant and p is linear momentum (p = m × v).\n\nStep 2: Relation between linear momentum (p) and kinetic energy (K):\nK = (1/2) m v² = p² / (2m)\np² = 2mK\np = √(2mK)\n\nStep 3: Substitute momentum into the de Broglie relation:\nλ = h / √(2mK)\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4471, // Q34
    similar_question: {
      question: "Which quantum number determines the three-dimensional spatial orientation of an atomic orbital relative to a standard coordinate axis system?",
      option_a: "Principal quantum number (n)",
      option_b: "Azimuthal quantum number (l)",
      option_c: "Magnetic quantum number (m_l)",
      option_d: "Electron spin quantum number (m_s)",
      correct_option: "C",
      explanation: "Step 1: Physical significance of the four quantum numbers:\n1. Principal quantum number (n): Dictates the primary energy level (shell) and the overall radial size of the orbital.\n2. Azimuthal quantum number (l): Dictates the subshell and geometric shape of the orbital (s = spherical, p = dumbbell, d = double dumbbell, f = complex).\n3. Magnetic quantum number (m_l): Dictates the number of orbitals within a subshell and their specific three-dimensional spatial orientation in space (e.g., p_x, p_y, p_z).\n4. Electron spin quantum number (m_s): Dictates the intrinsic spin orientation of the electron within an orbital (+1/2 or −1/2).\n\nStep 2: Conclusion:\nThe spatial orientation of an orbital is determined by the magnetic quantum number (m_l).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4472, // Q35
    similar_question: {
      question: "Which of the following ions possesses a pseudo noble gas electron configuration containing exactly 18 electrons in its outermost shell?",
      option_a: "Zn²⁺",
      option_b: "Ca²⁺",
      option_c: "Sc³⁺",
      option_d: "Na⁺",
      correct_option: "A",
      explanation: "Step 1: Definition of pseudo noble gas configuration:\nA pseudo noble gas configuration has 18 electrons in the outermost principal energy level with the electronic structure: n s² n p⁶ n d¹⁰.\n\nStep 2: Evaluate Zn²⁺ (Z = 30):\n- Neutral Zn: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s²\n- Zn²⁺ forms by losing two 4s electrons: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰\n- The outermost shell is the 3rd shell (n = 3):\n  Number of electrons = 2 (from 3s) + 6 (from 3p) + 10 (from 3d) = 18 electrons.\n\nStep 3: Other ions:\n- Ca²⁺: [Ne] 3s² 3p⁶ (8 electrons in outermost shell, octet)\n- Sc³⁺: [Ne] 3s² 3p⁶ (8 electrons in outermost shell, octet)\n- Na⁺: 1s² 2s² 2p⁶ (8 electrons in outermost shell, octet)\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4473, // Q36
    similar_question: {
      question: "What is the energy of the photon emitted during the transition corresponding to the first line of the Balmer series (H_α line) in the hydrogen emission spectrum?",
      option_a: "1.89 eV",
      option_b: "2.55 eV",
      option_c: "10.20 eV",
      option_d: "12.09 eV",
      correct_option: "A",
      explanation: "Step 1: Transition for the first line of the Balmer series (H_α line):\nIn the hydrogen spectrum, the Balmer series corresponds to transitions terminating at n₁ = 2.\nThe first line (H_α line, longest wavelength, lowest energy) corresponds to the transition from n₂ = 3 to n₁ = 2.\n\nStep 2: Energy values of the respective orbits:\n- E₂ = −13.6 / 2² = −3.40 eV\n- E₃ = −13.6 / 3² = −1.51 eV\n\nStep 3: Calculate the emitted photon energy:\nΔE = E₃ − E₂\n   = −1.51 eV − (−3.40 eV)\n   = +1.89 eV.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4474, // Q37
    similar_question: {
      question: "If the ionization potential of a hydrogen-like species in the ground state is 36 V, what is the first excitation potential of this species?",
      option_a: "27 V",
      option_b: "32 V",
      option_c: "18 V",
      option_d: "9 V",
      correct_option: "A",
      explanation: "Step 1: Relate ionization potential to ground state energy:\nAn ionization potential (I.P.) of 36 V corresponds to an ionization energy of 36 eV.\nTherefore, the energy of the ground state (n = 1) is:\nE₁ = −36 eV.\n\nStep 2: Energy of the nth energy state:\nEₙ = E₁ / n² = −36 / n² eV\n\nStep 3: First excitation corresponds to transition from n = 1 to n = 2:\nEnergy of the first excited state (n = 2):\nE₂ = −36 / 2² = −36 / 4 = −9 eV\n\nStep 4: Calculate first excitation energy and potential:\nFirst excitation energy = E₂ − E₁\n                       = −9 eV − (−36 eV)\n                       = +27 eV\nFirst excitation potential = 27 V.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING ATOMIC STRUCTURE BATCH 6 (Q31 to Q37) ---');
    for (const item of atomicBatch6Updates) {
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

    console.log('\n--- DUMPING ATOMIC STRUCTURE BATCH 7 (Q38 to Q45) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_94_details.json'));
    const batch7 = allData.questions.slice(37, 45);
    batch7.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${38 + idx} [ID: ${q.id}]`);
      console.log(`Question: ${q.question}`);
      console.log(`Options:`);
      console.log(`  (A) ${q.option_a}`);
      console.log(`  (B) ${q.option_b}`);
      console.log(`  (C) ${q.option_c}`);
      console.log(`  (D) ${q.option_d}`);
      console.log(`Correct: ${q.correct_option}`);
      if (q.question_image_link) console.log(`Question Image: ${q.question_image_link}`);
      if (q.explanation_image_link) console.log(`Explanation Image: ${q.explanation_image_link}`);
      if (q.explanation) console.log(`Explanation Text: ${q.explanation}`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

if (process.argv[2] === '--commit') {
  main();
} else {
  console.log('Script ready for execution with --commit');
}
