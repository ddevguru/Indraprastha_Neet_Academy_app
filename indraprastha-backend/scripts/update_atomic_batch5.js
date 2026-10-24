const fs = require('fs');

const atomicBatch5Updates = [
  {
    id: 4461, // Q25
    similar_question: {
      question: "If the Aufbau principle is not followed and orbitals are filled strictly in order of increasing principal quantum number (n = 1, then n = 2, then n = 3, and so on), what will be the values of principal quantum number (n) and azimuthal quantum number (l) for the 19th electron in a potassium atom (Z = 19)?",
      option_a: "n = 4, l = 0",
      option_b: "n = 3, l = 2",
      option_c: "n = 3, l = 1",
      option_d: "n = 3, l = 0",
      correct_option: "B",
      explanation: "Step 1: Standard filling with Aufbau principle:\nAccording to the Aufbau principle (n + l rule):\n- Energy of 4s: (4 + 0 = 4)\n- Energy of 3d: (3 + 2 = 5)\nSince 4s has lower energy than 3d, after filling 3p⁶ (18 electrons: 1s² 2s² 2p⁶ 3s² 3p⁶), the 19th electron enters the 4s orbital (n = 4, l = 0).\n\nStep 2: Filling without the Aufbau principle (strictly by principal quantum number n):\nOrbitals are filled shell by shell:\n- First shell (n = 1): accommodates up to 2 electrons (1s²)\n- Second shell (n = 2): accommodates up to 8 electrons (2s² 2p⁶)\n- Third shell (n = 3): accommodates up to 18 electrons (3s² 3p⁶ 3d¹⁰)\n\nStep 3: Determine orbital of the 19th electron:\nAfter filling 1s² 2s² 2p⁶ 3s² 3p⁶ (total 18 electrons), the 19th electron must enter the remaining subshell of the 3rd shell, which is the 3d subshell.\nFor a 3d electron:\n- Principal quantum number, n = 3\n- Azimuthal quantum number, l = 2\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4462, // Q26
    similar_question: {
      question: "The energy of a photon of radiation with wavelength 3000 Å is E₁. If the energy of another photon of radiation with wavelength 9000 Å is E₂, what is the correct relationship between E₁ and E₂?",
      option_a: "E₁ = 3 E₂",
      option_b: "E₁ = E₂ / 3",
      option_c: "E₁ = 9 E₂",
      option_d: "E₁ = E₂ / 9",
      correct_option: "A",
      explanation: "Step 1: Formula for photon energy:\nAccording to Planck's quantum theory:\nE = h × c / λ\nwhere h is Planck's constant, c is the speed of light in vacuum, and λ is the wavelength of radiation.\n\nStep 2: Relate energy inversely to wavelength:\nE ∝ 1 / λ\nTherefore:\nE₁ / E₂ = λ₂ / λ₁\n\nStep 3: Substitute the given values:\nλ₁ = 3000 Å\nλ₂ = 9000 Å\nE₁ / E₂ = 9000 Å / 3000 Å = 3\nE₁ = 3 E₂\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4463, // Q27
    similar_question: {
      question: "According to Heisenberg's Uncertainty Principle, which of the following pairs of physical variables cannot be measured simultaneously with arbitrary precision for a microscopic particle such as an electron?",
      option_a: "Position and momentum along the same axis",
      option_b: "Position along the x-axis and momentum along the y-axis",
      option_c: "Mass and velocity",
      option_d: "Energy and electric charge",
      correct_option: "A",
      explanation: "Step 1: Statement of Heisenberg's Uncertainty Principle:\nIt is impossible to determine simultaneously both the exact position (x) and exact momentum (p) of a microscopic moving particle like an electron with absolute accuracy along the same direction/axis:\nΔx × Δp_x ≥ h / 4π (or ℏ / 2)\n\nStep 2: Analysis of coordinates:\n- If position along the x-axis is measured with precision Δx → 0, the uncertainty in momentum along the x-axis becomes infinitely large (Δp_x → ∞).\n- However, uncertainty relations do not apply across orthogonal directions (for example, Δx × Δp_y = 0).\n\nTherefore, position and momentum along the same coordinate axis cannot be measured simultaneously with arbitrary precision. Option (A) is the correct answer."
    }
  },
  {
    id: 4464, // Q28
    similar_question: {
      question: "If a restriction is imposed such that the maximum permissible value of (n + l) for any orbital is 4, which of the following subshells cannot exist under this condition?",
      option_a: "3p",
      option_b: "4s",
      option_c: "3d",
      option_d: "2p",
      correct_option: "C",
      explanation: "Step 1: Determine the (n + l) value for each given subshell:\n- For an orbital, n is the principal quantum number and l is the azimuthal quantum number (s: l = 0, p: l = 1, d: l = 2, f: l = 3).\n\nStep 2: Evaluate options:\n- Option (A) 3p: n = 3, l = 1 → (n + l) = 3 + 1 = 4 (Permissible)\n- Option (B) 4s: n = 4, l = 0 → (n + l) = 4 + 0 = 4 (Permissible)\n- Option (C) 3d: n = 3, l = 2 → (n + l) = 3 + 2 = 5 (Exceeds 4, not permissible)\n- Option (D) 2p: n = 2, l = 1 → (n + l) = 2 + 1 = 3 (Permissible)\n\nStep 3: Conclusion:\nSince the value of (n + l) for the 3d subshell is 5, it violates the condition (n + l) ≤ 4.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4465, // Q29
    similar_question: {
      question: "If an electron in a hydrogen atom makes a transition from the M shell (n = 3) to the L shell (n = 2), what is the frequency (ν) of the emitted radiation in terms of the Rydberg constant (R) and the speed of light (c)?",
      option_a: "(5 / 36) R c",
      option_b: "(3 / 4) R c",
      option_c: "(8 / 9) R c",
      option_d: "(5 / 9) R c",
      correct_option: "A",
      explanation: "Step 1: Identify principal quantum numbers of the shells:\n- L shell corresponds to n₁ = 2\n- M shell corresponds to n₂ = 3\n\nStep 2: Apply the Rydberg formula for wave number (ν̄):\nν̄ = 1 / λ = R × Z² × (1 / n₁² − 1 / n₂²)\nFor hydrogen atom, Z = 1:\nν̄ = R × (1 / 2² − 1 / 3²)\n   = R × (1 / 4 − 1 / 9)\n   = R × (9 − 4) / 36\n   = (5 / 36) R\n\nStep 3: Calculate frequency (ν):\nSince ν = c / λ = c × ν̄:\nν = c × (5 / 36) R = (5 / 36) R c\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4466, // Q30
    similar_question: {
      question: "Which of the following electronic orbital representations directly violates Pauli's Exclusion Principle?",
      option_a: "An orbital containing two electrons with opposite spins: [↑↓]",
      option_b: "An orbital containing two electrons with parallel spins: [↑↑]",
      option_c: "Degenerate p-orbitals having configuration: [↑ ][↑ ][ ]",
      option_d: "An orbital containing a single electron: [↑ ]",
      correct_option: "B",
      explanation: "Step 1: Statement of Pauli's Exclusion Principle:\nNo two electrons in an atom can have the same set of all four quantum numbers (n, l, m_l, and m_s).\n\nStep 2: Spin requirement:\n- Electrons residing in the same orbital share identical values of principal (n), azimuthal (l), and magnetic (m_l) quantum numbers.\n- Therefore, they MUST differ in their spin magnetic quantum number (m_s): one electron must have m_s = +1/2 (↑) and the other must have m_s = −1/2 (↓).\n- In representation [↑↑], both electrons have identical spin values (m_s = +1/2), resulting in identical sets of four quantum numbers, which violates Pauli's Exclusion Principle.\n\nStep 3: Other options:\n- [↑↓] correctly obeys Pauli's principle.\n- [↑ ][↑ ][ ] obeys Pauli's principle (each orbital has at most one electron).\n- [↑ ] obeys Pauli's principle.\n\nTherefore, Option (B) is the correct answer."
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

    console.log('--- UPDATING ATOMIC STRUCTURE BATCH 5 (Q25 to Q30) ---');
    for (const item of atomicBatch5Updates) {
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

    console.log('\n--- DUMPING ATOMIC STRUCTURE BATCH 6 (Q31 to Q37) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_94_details.json'));
    const batch6 = allData.questions.slice(30, 37);
    batch6.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${31 + idx} [ID: ${q.id}]`);
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
