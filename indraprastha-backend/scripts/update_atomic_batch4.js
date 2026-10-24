const fs = require('fs');

const atomicBatch4Updates = [
  {
    id: 2744, // Q19
    similar_question: {
      question: "Which of the following statements regarding the Bohr model of the hydrogen atom is/are correct?\n(A) The difference in orbital angular momentum between any two consecutive Bohr orbits is always a constant value of h / 2π (or ℏ).\n(B) The kinetic energy of the revolving electron increases as the electron moves to higher orbits further from the nucleus.\n(C) The potential energy of the electron increases (becomes less negative) as the principal quantum number n increases.\n(D) The frequency of the emitted spectral lines in the Balmer series follows the order: (3 → 2) < (4 → 2) < (5 → 2).",
      option_a: "A and B only",
      option_b: "B and D only",
      option_c: "A, C, and D",
      option_d: "C and D only",
      correct_option: "C",
      explanation: "Step 1: Evaluate Statement (A):\nAngular momentum in the nth orbit is Lₙ = n × (h / 2π).\nFor any two consecutive orbits:\nΔL = Lₙ₊₁ − Lₙ = (n + 1)(h / 2π) − n(h / 2π) = h / 2π = ℏ.\nThis difference is always constant and independent of n (Statement A is correct).\n\nStep 2: Evaluate Statement (B):\nKinetic energy is K.E. = +13.6 / n² eV. As n increases (moving away from the nucleus), K.E. decreases (Statement B is incorrect).\n\nStep 3: Evaluate Statement (C):\nPotential energy is P.E. = −27.2 / n² eV.\nFor n = 1: P.E. = −27.2 eV.\nFor n = 2: P.E. = −6.8 eV.\nAs n increases, P.E. becomes less negative, meaning it increases (Statement C is correct).\n\nStep 4: Evaluate Statement (D):\nPhoton frequency is ν = ΔE / h.\nFor Balmer lines:\n- (3 → 2): ΔE = 1.89 eV\n- (4 → 2): ΔE = 2.55 eV\n- (5 → 2): ΔE = 2.86 eV\nSince the energy difference increases, the frequency order is (3 → 2) < (4 → 2) < (5 → 2) (Statement D is correct).\n\nTherefore, statements A, C, and D are correct. Option (C) is the correct answer."
    }
  },
  {
    id: 2745, // Q20
    similar_question: {
      question: "If the shortest wavelength of the Lyman series for a hydrogen atom is λ₀, what is the shortest wavelength of the Balmer series for a He⁺ ion in terms of λ₀?\n(Atomic number of He, Z = 2)",
      option_a: "λ₀",
      option_b: "2λ₀",
      option_c: "4λ₀",
      option_d: "λ₀ / 2",
      correct_option: "A",
      explanation: "Step 1: Shortest wavelength of Lyman series of hydrogen (Z = 1):\nThe shortest wavelength corresponds to transition from n = ∞ to n = 1:\n1 / λ₀ = R_H × (1)² × (1/1² − 1/∞²) = R_H\nTherefore, λ₀ = 1 / R_H.\n\nStep 2: Shortest wavelength of Balmer series for He⁺ (Z = 2):\nThe shortest wavelength corresponds to transition from n = ∞ to n = 2:\n1 / λ = R_H × Z² × (1/2² − 1/∞²)\n      = R_H × (2)² × (1/4 − 0)\n      = R_H × 4 × (1/4)\n      = R_H.\n\nStep 3: Relate λ to λ₀:\nSince 1 / λ = R_H and 1 / λ₀ = R_H:\nλ = 1 / R_H = λ₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2746, // Q21
    similar_question: {
      question: "An electron in a hydrogen atom de-excites from higher energy levels to an orbit whose radius is 476.1 pm. The spectral lines emitted during this transition belong to which spectral series?\n(Given: First Bohr radius of hydrogen atom, r₁ = 52.9 pm)",
      option_a: "Lyman series",
      option_b: "Balmer series",
      option_c: "Paschen series",
      option_d: "Pfund series",
      correct_option: "C",
      explanation: "Step 1: Formula for radius of Bohr orbit in hydrogen atom:\nrₙ = r₁ × n² = 52.9 × n² pm\n\nStep 2: Determine principal quantum number n for rₙ = 476.1 pm:\n52.9 × n² = 476.1\nn² = 476.1 / 52.9 = 9\nn = √9 = 3.\n\nStep 3: Identify the spectral series:\nTransitions from higher energy levels (n > 3) ending at the energy level n = 3 belong to the Paschen series.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2747, // Q22
    similar_question: {
      question: "The de-Broglie wavelength (λ) of an electron revolving in the second Bohr orbit (n = 2) of a hydrogen atom is:\n(Given: First Bohr radius of hydrogen atom, r₁ = 0.529 Å)",
      option_a: "2π × 0.529 Å",
      option_b: "4π × 0.529 Å",
      option_c: "8π × 0.529 Å",
      option_d: "0.529 / (2π) Å",
      correct_option: "B",
      explanation: "Step 1: Formula for radius of second Bohr orbit:\nr₂ = r₁ × n² = 0.529 × 2² = 4 × 0.529 Å.\n\nStep 2: Relation between orbit circumference and de-Broglie wavelength:\nAccording to Bohr-de-Broglie condition:\n2πrₙ = n × λ\n\nStep 3: Calculate λ for n = 2:\n2πr₂ = 2 × λ\nλ = π × r₂\n  = π × (4 × 0.529 Å)\n  = 4π × 0.529 Å.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4459, // Q23
    similar_question: {
      question: "Which of the following rules or principles states that \"no two electrons in an atom can have the same set of all four quantum numbers (n, l, m_l, m_s)\"?\n(A) Aufbau Principle\n(B) Pauli Exclusion Principle\n(C) Hund's Rule of Maximum Multiplicity\n(D) Heisenberg Uncertainty Principle",
      option_a: "Aufbau Principle",
      option_b: "Pauli Exclusion Principle",
      option_c: "Hund's Rule of Maximum Multiplicity",
      option_d: "Heisenberg Uncertainty Principle",
      correct_option: "B",
      explanation: "Step 1: The Pauli Exclusion Principle, proposed by Wolfgang Pauli in 1925, states that no two electrons in an isolated atom can have identical values for all four quantum numbers (n, l, m_l, and m_s).\n\nStep 2: Consequence: An atomic orbital can accommodate a maximum of only two electrons, and these two electrons must have opposite (antiparallel) spins (+1/2 and −1/2).\n- The Aufbau principle governs filling of orbitals in increasing order of energy (n + l rule).\n- Hund's rule states pairing does not occur in degenerate orbitals until each orbital has one electron with parallel spin.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4460, // Q24
    similar_question: {
      question: "According to Bohr's postulate of angular momentum quantization, the orbital angular momentum of an electron in the fifth Bohr orbit (n = 5) of a hydrogen atom is:\n(Given: h is Planck's constant)",
      option_a: "2.5 h / π",
      option_b: "5 h / π",
      option_c: "1.5 h / π",
      option_d: "2 h / π",
      correct_option: "A",
      explanation: "Step 1: Bohr's quantization postulate:\nThe orbital angular momentum (L) of an electron in any permissible stationary orbit is an integral multiple of h / 2π:\nL = n × (h / 2π)\n\nStep 2: Calculate for the 5th orbit (n = 5):\nL = 5 × (h / 2π)\n  = (5 / 2) × (h / π)\n  = 2.5 h / π.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING ATOMIC STRUCTURE BATCH 4 (Q19 to Q24) ---');
    for (const item of atomicBatch4Updates) {
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

    console.log('\n--- DUMPING ATOMIC STRUCTURE BATCH 5 (Q25 to Q30) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_94_details.json'));
    const batch5 = allData.questions.slice(24, 30);
    batch5.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${25 + idx} [ID: ${q.id}]`);
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

main();
