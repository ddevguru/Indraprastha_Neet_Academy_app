const fs = require('fs');

const atomicBatch3Updates = [
  {
    id: 2738, // Q13
    similar_question: {
      question: "For beryllium in the gaseous state, the total energy required to completely remove all four electrons is:\nBe(g) → Be⁴⁺(g) + 4e⁻,  ΔH = 39,900 kJ/mol\nIf the first, second, and third ionisation energies of Be are 900 kJ/mol, 1,760 kJ/mol, and 14,840 kJ/mol respectively, calculate the fourth ionisation energy (IE₄) of beryllium in kJ/mol.\n(Note: Be³⁺ is a hydrogen-like species with Z = 4; 1 eV = 96.5 kJ/mol)",
      option_a: "22,400 kJ/mol",
      option_b: "14,840 kJ/mol",
      option_c: "1,760 kJ/mol",
      option_d: "37,240 kJ/mol",
      correct_option: "A",
      explanation: "Step 1: Understand total ionisation enthalpy:\nThe total enthalpy change to remove all 4 electrons from Be(g) is the sum of successive ionisation energies:\nΔH = IE₁ + IE₂ + IE₃ + IE₄\n\nStep 2: Substitute the known values:\n39,900 = 900 + 1,760 + 14,840 + IE₄\n39,900 = 17,500 + IE₄\nIE₄ = 39,900 − 17,500 = 22,400 kJ/mol.\n\nStep 3: Verification via Bohr's formula for hydrogen-like Be³⁺ (Z = 4):\nIE₄ = 13.6 × Z² eV = 13.6 × 4² eV = 13.6 × 16 eV = 217.6 eV.\nIn kJ/mol: 217.6 × 96.5 ≈ 21,000 to 22,400 kJ/mol.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2739, // Q14
    similar_question: {
      question: "Which of the following conclusions was NOT a direct deduction of Rutherford's α-particle scattering experiment?\n(A) Most of the volume occupied by an atom is empty space.\n(B) A very small, dense, positively charged nucleus exists at the centre of the atom.\n(C) Electrons revolve in stationary orbits with quantized angular momentum (L = nℏ).\n(D) The electrostatic force of attraction balances the revolving electrons.",
      option_a: "Most of the volume occupied by an atom is empty space.",
      option_b: "A very small, dense, positively charged nucleus exists at the centre of the atom.",
      option_c: "Electrons revolve in stationary orbits with quantized angular momentum (L = nℏ).",
      option_d: "The electrostatic force of attraction balances the revolving electrons.",
      correct_option: "C",
      explanation: "Step 1: Conclusions from Rutherford's α-scattering experiment:\n- Most of the space inside the atom is empty (since most α-particles passed undeflected).\n- Positive charge and most of the atomic mass are concentrated in a tiny nucleus.\n- Electrons revolve around the nucleus like planets around the Sun, held by electrostatic attraction.\n\nStep 2: Origin of stationary quantized orbits:\nThe concept of stationary orbits with quantized angular momentum (L = nℏ = nh / 2π) was introduced by Niels Bohr in 1913 to explain atomic stability. It was NOT part of Rutherford's original model.\n\nTherefore, Statement (C) is the correct answer."
    }
  },
  {
    id: 2740, // Q15
    similar_question: {
      question: "In a sample of hydrogen atoms, electrons undergo transitions from the 4th excited state down to the 1st excited state. Select the correct statement(s):\n(A) The total number of distinct spectral lines emitted is 6.\n(B) The total number of distinct spectral lines emitted is 10.\n(C) Exactly 3 spectral lines belonging to the Balmer series will be observed.\n(D) Exactly 2 spectral lines belonging to the Paschen series will be observed.",
      option_a: "A and C only",
      option_b: "B and C only",
      option_c: "A, C, and D",
      option_d: "B and D only",
      correct_option: "C",
      explanation: "Step 1: Identify the initial and final energy states:\n- 4th excited state corresponds to principal quantum level n₂ = 5.\n- 1st excited state corresponds to principal quantum level n₁ = 2.\n\nStep 2: Calculate the total number of distinct spectral lines emitted:\nNumber of spectral lines = Δn(Δn + 1) / 2\nwhere Δn = n₂ − n₁ = 5 − 2 = 3.\nTotal lines = 3 × (3 + 1) / 2 = 3 × 4 / 2 = 6 distinct spectral lines (Statement A is correct).\n\nStep 3: Analyze the series of the emitted lines:\n- Transitions ending at n = 2 (Balmer series):\n  5 → 2, 4 → 2, and 3 → 2 (Total = 3 lines) (Statement C is correct).\n- Transitions ending at n = 3 (Paschen series):\n  5 → 3 and 4 → 3 (Total = 2 lines) (Statement D is correct).\n- Transitions ending at n = 4 (Brackett series):\n  5 → 4 (Total = 1 line).\n\nStep 4: Total lines = 3 (Balmer) + 2 (Paschen) + 1 (Brackett) = 6 lines.\nTherefore, statements A, C, and D are all correct. Option (C) is the correct answer."
    }
  },
  {
    id: 2741, // Q16
    similar_question: {
      question: "Which of the following statements regarding electromagnetic radiation and atomic spectra is/are correct?\n(A) The frequency of an electromagnetic wave is inversely proportional to its wavelength in vacuum (ν = c / λ).\n(B) An infrared photon has greater energy than an ultraviolet photon.\n(C) The spectral lines of Li²⁺ and He⁺ can both be explained by the Bohr atomic model.\n(D) The total energy of an electron in any stable Bohr orbit is always negative.",
      option_a: "A and B only",
      option_b: "A, C, and D only",
      option_c: "B and C only",
      option_d: "A, B, C, and D",
      correct_option: "B",
      explanation: "Step 1: Evaluate Statement (A):\nIn vacuum, all electromagnetic waves travel at the speed of light c = ν × λ. Therefore, frequency ν = c / λ is inversely proportional to wavelength. (Statement A is correct).\n\nStep 2: Evaluate Statement (B):\nPhoton energy is given by E = hν = hc / λ. Ultraviolet (UV) radiation has a much shorter wavelength and higher frequency than infrared (IR) radiation, so UV photons have significantly higher energy than IR photons. (Statement B is incorrect).\n\nStep 3: Evaluate Statement (C):\nBohr's atomic model applies strictly to single-electron (hydrogenic) species such as H, He⁺, Li²⁺, and Be³⁺. Both Li²⁺ and He⁺ are single-electron ions, so their line spectra are governed by Bohr's theory. (Statement C is correct).\n\nStep 4: Evaluate Statement (D):\nThe total energy of an electron in a bound Bohr orbit is Eₙ = −13.6 × (Z² / n²) eV, which is always negative, signifying that the electron is electrostatically bound to the nucleus. (Statement D is correct).\n\nTherefore, statements A, C, and D are correct. Option (B) is the correct answer."
    }
  },
  {
    id: 2742, // Q17
    similar_question: {
      question: "Select the INCORRECT statement(s) among the following:\n(A) The correct decreasing order of photon energies is: X-rays > Ultraviolet > Visible > Infrared > Microwaves.\n(B) For a given hydrogen-like atom, the energy of the orbit increases as the principal quantum number n increases: E₁ < E₂ < E₃ < E₄.\n(C) The radius of the nth Bohr orbit for a given atom is inversely proportional to n².\n(D) In the ground state (n = 1), the orbital velocity of the electron follows the order: H > He⁺ > Li²⁺ > Be³⁺.",
      option_a: "A and B only",
      option_b: "C and D only",
      option_c: "B and C only",
      option_d: "A and D only",
      correct_option: "B",
      explanation: "Step 1: Evaluate Statement (A):\nEnergy of radiation is proportional to frequency: E = hν. In the electromagnetic spectrum, frequency decreases in the order: X-rays > UV > Visible > IR > Microwaves. Therefore, photon energy follows the same order. (Statement A is correct).\n\nStep 2: Evaluate Statement (B):\nEnergy of nth orbit is Eₙ = −13.6 × (Z² / n²) eV.\nFor H-atom: E₁ = −13.6 eV, E₂ = −3.4 eV, E₃ = −1.51 eV, E₄ = −0.85 eV.\nAs n increases, the energy becomes less negative, which means the energy value increases: E₁ < E₂ < E₃ < E₄. (Statement B is correct).\n\nStep 3: Evaluate Statement (C):\nThe radius of the nth Bohr orbit is rₙ = r₀ × (n² / Z). Radius is directly proportional to n², NOT inversely proportional. (Statement C is incorrect).\n\nStep 4: Evaluate Statement (D):\nThe velocity of an electron is vₙ = v₀ × (Z / n). For n = 1, velocity is directly proportional to Z.\nSince Z values are Be³⁺ (Z = 4) > Li²⁺ (Z = 3) > He⁺ (Z = 2) > H (Z = 1), the correct order of velocity is: Be³⁺ > Li²⁺ > He⁺ > H. (Statement D is incorrect).\n\nTherefore, statements (C) and (D) are incorrect. Option (B) is the correct answer."
    }
  },
  {
    id: 2743, // Q18
    similar_question: {
      question: "In Bohr's atomic model for a hydrogen atom, let K.E., P.E., and T.E. represent the kinetic energy, potential energy, and total energy of the revolving electron in the nth orbit. Which of the following relations is correct?\n(A) P.E. = −2 × K.E.\n(B) T.E. = −K.E.\n(C) P.E. = 2 × T.E.\n(D) All of the above",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above (A, B, and C)",
      correct_option: "D",
      explanation: "Step 1: Understand energy relationships in Bohr's atom:\nFor an electron revolving in an orbit of radius r under electrostatic attraction:\n- Kinetic energy: K.E. = +e² / (8πε₀r) = +13.6 × (Z² / n²) eV (always positive).\n- Potential energy: P.E. = −e² / (4πε₀r) = −27.2 × (Z² / n²) eV (always negative).\n- Total energy: T.E. = K.E. + P.E. = −13.6 × (Z² / n²) eV.\n\nStep 2: Check each relationship:\n- P.E. / K.E. = −27.2 / +13.6 = −2  ⇒  P.E. = −2 × K.E. (Statement A is correct).\n- T.E. / K.E. = −13.6 / +13.6 = −1  ⇒  T.E. = −K.E. (Statement B is correct).\n- P.E. / T.E. = −27.2 / −13.6 = +2  ⇒  P.E. = 2 × T.E. (Statement C is correct).\n\nTherefore, all the given relationships are correct. Option (D) is the correct answer."
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

    console.log('--- UPDATING ATOMIC STRUCTURE BATCH 3 (Q13 to Q18) ---');
    for (const item of atomicBatch3Updates) {
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

    console.log('\n--- DUMPING ATOMIC STRUCTURE BATCH 4 (Q19 to Q24) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_94_details.json'));
    const batch4 = allData.questions.slice(18, 24);
    batch4.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${19 + idx} [ID: ${q.id}]`);
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
