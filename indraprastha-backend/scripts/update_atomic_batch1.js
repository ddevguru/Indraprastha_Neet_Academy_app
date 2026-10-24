const fs = require('fs');

const atomicBatch1Updates = [
  {
    id: 2559, // Q1
    similar_question: {
      question: "An electron in an excited hydrogen atom drops to an energy state by emitting a photon corresponding to the longest wavelength of the Brackett series. Subsequent emissions from this atom cannot include which of the following?\n(A) The longest wavelength of the Paschen series\n(B) The longest wavelength of the Balmer series\n(C) The longest wavelength of the Lyman series\n(D) The second longest wavelength of the Paschen series",
      option_a: "The longest wavelength of the Paschen series",
      option_b: "The longest wavelength of the Balmer series",
      option_c: "The longest wavelength of the Lyman series",
      option_d: "The second longest wavelength of the Paschen series",
      correct_option: "D",
      explanation: "Step 1: Identify the current state of the electron:\n- The Brackett series involves transitions ending at n = 4.\n- The longest wavelength corresponds to the minimum energy transition in this series, which is from n = 5 to n = 4.\n- Therefore, after this emission, the electron resides in the state n = 4.\n\nStep 2: Determine all possible subsequent transitions from n = 4:\n- Paschen series transitions (ending at n = 3): only 4 → 3 (longest wavelength of Paschen series).\n- Balmer series transitions (ending at n = 2): 4 → 2 or 3 → 2 (longest wavelength of Balmer series).\n- Lyman series transitions (ending at n = 1): 4 → 1, 3 → 1, or 2 → 1 (longest wavelength of Lyman series).\n\nStep 3: Check which emission is impossible:\n- The second longest wavelength of the Paschen series corresponds to the transition from n = 5 to n = 3.\n- Since the electron is already at n = 4, it cannot jump from n = 5 to n = 3.\n\nTherefore, subsequent emissions cannot include the second longest wavelength of the Paschen series. Option (D) is the correct answer."
    }
  },
  {
    id: 2560, // Q2
    similar_question: {
      question: "Whenever an excited hydrogen atom emits a photon belonging to the Paschen series, select the correct statement(s) regarding any subsequent emission from this atom:\n(A) It may subsequently emit another photon in the Paschen series.\n(B) It may emit a subsequent photon in the Balmer series with a wavelength of approximately 656 nm.\n(C) It may emit a photon directly in the Lyman series.\n(D) It can never reach the ground state.",
      option_a: "A and D only",
      option_b: "B and C only",
      option_c: "A, B, and C",
      option_d: "B only",
      correct_option: "B",
      explanation: "Step 1: Understand the Paschen series:\nA photon emitted in the Paschen series corresponds to an electron transition ending at principal energy level n = 3.\n\nStep 2: Analyze subsequent possible transitions from n = 3:\nFrom n = 3, the electron can de-excite to lower levels:\n- Transition from n = 3 to n = 2: This belongs to the Balmer series (Balmer-α, H_α).\n  1/λ = R_H × (1/2² - 1/3²) = R_H × (5/36)\n  λ = 36 / (5 × 1.097 × 10⁷ m⁻¹) ≈ 656.3 nm ≈ 656 nm (Statement B is correct).\n- Transition from n = 3 to n = 1: This is a direct de-excitation to the ground state belonging to the Lyman series (Lyman-β) (Statement C is correct).\n- Since n = 3 is the lower level for the Paschen series, the electron cannot emit another Paschen photon (levels below n = 3 are only n = 2 and n = 1) (Statement A is incorrect).\n- The atom can reach the ground state (n = 1) (Statement D is incorrect).\n\nTherefore, statements (B) and (C) are correct. Option (B) is the correct answer."
    }
  },
  {
    id: 2561, // Q3
    similar_question: {
      question: "If the radius of the first Bohr orbit of a hydrogen atom is r₀, which of the following conclusions is/are correct?\n(A) The de-Broglie wavelength of an electron in the second Bohr orbit of hydrogen is 4πr₀.\n(B) The radius of the third Bohr orbit of He⁺ ion is 4.5r₀.\n(C) The radius of the second Bohr orbit of Li²⁺ ion is (4/3)r₀.\n(D) The de-Broglie wavelength of an electron in the first Bohr orbit of hydrogen is 2πr₀.",
      option_a: "A and B only",
      option_b: "A, B, and C only",
      option_c: "B, C, and D only",
      option_d: "A, B, C, and D",
      correct_option: "D",
      explanation: "Step 1: Bohr radius formula:\nrₙ = (n² / Z) × r₀\n\nStep 2: de-Broglie wavelength in Bohr orbits:\nBy Bohr's quantization condition, the circumference of the nth orbit equals n de-Broglie wavelengths:\n2πrₙ = n × λ\nλ = (2πrₙ) / n\n\nStep 3: Evaluate each statement:\n- Statement (A): For n = 2 of H-atom (Z = 1):\n  r₂ = (2² / 1) × r₀ = 4r₀.\n  λ = (2π × 4r₀) / 2 = 4πr₀ (Statement A is correct).\n\n- Statement (B): For n = 3 of He⁺ ion (Z = 2):\n  r₃ = (3² / 2) × r₀ = (9/2) × r₀ = 4.5r₀ (Statement B is correct).\n\n- Statement (C): For n = 2 of Li²⁺ ion (Z = 3):\n  r₂ = (2² / 3) × r₀ = (4/3)r₀ (Statement C is correct).\n\n- Statement (D): For n = 1 of H-atom (Z = 1):\n  r₁ = r₀.\n  λ = (2π × r₀) / 1 = 2πr₀ (Statement D is correct).\n\nTherefore, all statements A, B, C, and D are correct. Option (D) is the correct answer."
    }
  },
  {
    id: 2562, // Q4
    similar_question: {
      question: "The ratio of the de-Broglie wavelength of a proton to that of an α-particle (λₚ : λ_α) is 2 : 1. This condition is satisfied if:\n(Assume mass of α-particle = 4 × mass of proton)\n(A) The ratio of the velocity of the proton to that of the α-particle (vₚ : v_α) is 2 : 1.\n(B) The ratio of the velocity of the proton to that of the α-particle (vₚ : v_α) is 1 : 2.\n(C) The ratio of the kinetic energy of the proton to that of the α-particle (KEₚ : KE_α) is 1 : 1.\n(D) The ratio of the kinetic energy of the proton to that of the α-particle (KEₚ : KE_α) is 4 : 1.",
      option_a: "A and C",
      option_b: "A and D",
      option_c: "B and C",
      option_d: "B and D",
      correct_option: "A",
      explanation: "Step 1: Relation between de-Broglie wavelength and velocity:\nλ = h / (m × v)\nλₚ / λ_α = (m_α / mₚ) × (v_α / vₚ)\n\nGiven λₚ / λ_α = 2 / 1, and m_α = 4mₚ:\n2 / 1 = 4 × (v_α / vₚ)\nvₚ / v_α = 4 / 2 = 2 / 1\nTherefore, vₚ : v_α = 2 : 1 (Statement A is correct).\n\nStep 2: Relation between de-Broglie wavelength and kinetic energy:\nλ = h / √(2 × m × KE)\nλₚ / λ_α = √[ (m_α × KE_α) / (mₚ × KEₚ) ]\n\nSquare both sides:\n(2 / 1)² = (4 × KE_α) / (1 × KEₚ)\n4 = 4 × (KE_α / KEₚ)\nKEₚ / KE_α = 1 / 1\nTherefore, KEₚ : KE_α = 1 : 1 (Statement C is correct).\n\nThus, statements (A) and (C) are correct. Option (A) is the correct answer."
    }
  },
  {
    id: 2563, // Q5
    similar_question: {
      question: "According to Bohr's atomic model for hydrogen and hydrogen-like species, which of the following statements is correct?\n(A) The velocity of an electron in the 2nd orbit of a He⁺ ion is equal to the velocity of an electron in the 1st orbit of a hydrogen atom.\n(B) The radius of the 2nd orbit of a He⁺ ion is equal to the radius of the 1st orbit of a hydrogen atom.\n(C) The kinetic energy of an electron in the nth orbit is directly proportional to n².\n(D) The time period of revolution of an electron in the nth orbit is proportional to n².",
      option_a: "The velocity of an electron in the 2nd orbit of a He⁺ ion is equal to the velocity of an electron in the 1st orbit of a hydrogen atom.",
      option_b: "The radius of the 2nd orbit of a He⁺ ion is equal to the radius of the 1st orbit of a hydrogen atom.",
      option_c: "The kinetic energy of an electron in the nth orbit is directly proportional to n².",
      option_d: "The time period of revolution of an electron in the nth orbit is proportional to n².",
      correct_option: "A",
      explanation: "Step 1: Velocity in Bohr orbit:\nThe velocity of an electron in the nth orbit of a hydrogen-like species is given by:\nvₙ = v₀ × (Z / n)\n- For 1st orbit of H-atom: Z = 1, n = 1 ⇒ v = v₀.\n- For 2nd orbit of He⁺ ion: Z = 2, n = 2 ⇒ v = v₀ × (2 / 2) = v₀.\nSince both velocities are equal to v₀, Statement (A) is correct.\n\nStep 2: Check other statements:\n- Radius: rₙ = r₀ × (n² / Z). For He⁺ in n = 2: r = r₀ × (4 / 2) = 2r₀ (not equal to r₀, so B is incorrect).\n- Kinetic energy: KE is proportional to Z² / n² (inversely proportional to n², so C is incorrect).\n- Time period: T = (2πr) / v is proportional to (n² / Z) / (Z / n) = n³ / Z² (proportional to n³, so D is incorrect).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2564, // Q6
    similar_question: {
      question: "In a sample of hydrogen atoms, all the electrons are in the 3rd excited state. When these atoms de-excite to the ground state, what is the ratio of the longest wavelength to the shortest wavelength of the emitted spectral lines?",
      option_a: "135 : 7",
      option_b: "15 : 1",
      option_c: "64 : 7",
      option_d: "45 : 4",
      correct_option: "A",
      explanation: "Step 1: Identify states:\n- 3rd excited state corresponds to principal quantum number n = 4.\n- Ground state corresponds to n = 1.\n\nStep 2: Shortest wavelength (maximum energy transition):\nThe transition with maximum energy is from n = 4 to n = 1:\n1 / λₘᵢₙ = R_H × (1/1² - 1/4²) = R_H × (1 - 1/16) = (15 / 16)R_H\nλₘᵢₙ = 16 / (15R_H)\n\nStep 3: Longest wavelength (minimum energy transition):\nThe transition with minimum energy difference among all possible transitions is between the highest adjacent levels, n = 4 to n = 3:\n1 / λₘₐₓ = R_H × (1/3² - 1/4²) = R_H × (1/9 - 1/16) = (7 / 144)R_H\nλₘₐₓ = 144 / (7R_H)\n\nStep 4: Calculate ratio of longest to shortest wavelength:\nλₘₐₓ / λₘᵢₙ = [144 / (7R_H)] / [16 / (15R_H)]\n             = (144 / 7) × (15 / 16)\n             = (9 / 7) × 15\n             = 135 / 7\n\nTherefore, the ratio is 135 : 7. Option (A) is the correct answer."
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

    console.log('--- UPDATING ATOMIC STRUCTURE BATCH 1 (Q1 to Q6) ---');
    for (const item of atomicBatch1Updates) {
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

    console.log('\n--- DUMPING ATOMIC STRUCTURE BATCH 2 (Q7 to Q12) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_94_details.json'));
    const batch2 = allData.questions.slice(6, 12);
    batch2.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${7 + idx} [ID: ${q.id}]`);
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
