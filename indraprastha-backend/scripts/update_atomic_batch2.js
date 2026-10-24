const fs = require('fs');

const atomicBatch2Updates = [
  {
    id: 2565, // Q7
    similar_question: {
      question: "A charged particle with charge q = 1.6 × 10⁻¹⁹ C is accelerated from rest through a potential difference of V = 150 V. If its de-Broglie wavelength is 0.10 Å (1.0 × 10⁻¹¹ m), the mass of the particle is approximately:\n(Given: h = 6.6 × 10⁻³⁴ J·s)",
      option_a: "9.1 × 10⁻³¹ kg",
      option_b: "1.67 × 10⁻²⁷ kg",
      option_c: "6.64 × 10⁻²⁷ kg",
      option_d: "4.5 × 10⁻³⁰ kg",
      correct_option: "A",
      explanation: "Step 1: Formula for de-Broglie wavelength of an accelerated charged particle:\nλ = h / √(2 × m × q × V)\n\nStep 2: Square both sides to express mass m:\nλ² = h² / (2 × m × q × V)\nm = h² / (2 × q × V × λ²)\n\nStep 3: Substitute the given values:\nm = (6.6 × 10⁻³⁴)² / [2 × (1.6 × 10⁻¹⁹) × 150 × (1.0 × 10⁻¹¹)²]\n  = (43.56 × 10⁻⁶⁸) / [48000 × 10⁻⁴¹]\n  = (43.56 × 10⁻⁶⁸) / (4.8 × 10⁻³⁷)\n  = 9.075 × 10⁻³¹ kg ≈ 9.1 × 10⁻³¹ kg (mass of an electron).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2566, // Q8
    similar_question: {
      question: "A blue light source and a yellow light source emit radiation with the same total power. If n_blue and n_yellow represent the number of photons emitted per second by the blue and yellow sources respectively, which of the following relations is correct?\n(Given: Wavelength of yellow light > Wavelength of blue light)",
      option_a: "n_blue = n_yellow",
      option_b: "n_blue < n_yellow",
      option_c: "n_blue > n_yellow",
      option_d: "Cannot be determined without frequency values",
      correct_option: "B",
      explanation: "Step 1: Express total power in terms of photon emission rate:\nTotal power (P) is the total energy emitted per second:\nP = n × E_photon = n × (h × c / λ)\nwhere n is the number of photons emitted per second, h is Planck's constant, c is the speed of light, and λ is the wavelength of the emitted radiation.\n\nStep 2: Relate n to wavelength λ for equal power:\nn = (P × λ) / (h × c)\nSince power P, h, and c are constant:\nn is directly proportional to λ (n ∝ λ).\n\nStep 3: Compare wavelengths:\nYellow light has a longer wavelength than blue light (λ_yellow > λ_blue).\nTherefore, the yellow source must emit more photons per second to produce the same total energy:\nn_yellow > n_blue, which means n_blue < n_yellow.\n\nOption (B) is the correct answer."
    }
  },
  {
    id: 2734, // Q9
    similar_question: {
      question: "What is the orbital angular momentum of an electron present in a 4f orbital? (Given: ℏ = h / 2π)",
      option_a: "√6 ℏ",
      option_b: "√12 ℏ",
      option_c: "√20 ℏ",
      option_d: "2 ℏ",
      correct_option: "B",
      explanation: "Step 1: Formula for orbital angular momentum:\nThe orbital angular momentum (L) of an electron is given by:\nL = √[l(l + 1)] ℏ\nwhere l is the azimuthal quantum number and ℏ = h / 2π.\n\nStep 2: Identify l for an f orbital:\n- For s orbital: l = 0\n- For p orbital: l = 1\n- For d orbital: l = 2\n- For f orbital: l = 3\n\nStep 3: Calculate L for l = 3:\nL = √[3(3 + 1)] ℏ\n  = √[3 × 4] ℏ\n  = √12 ℏ (or 2√3 ℏ).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2735, // Q10
    similar_question: {
      question: "How many radial nodes and angular nodes are present respectively in a 3p orbital of a hydrogen atom?",
      option_a: "1 radial node and 1 angular node",
      option_b: "2 radial nodes and 0 angular nodes",
      option_c: "0 radial nodes and 2 angular nodes",
      option_d: "1 radial node and 2 angular nodes",
      correct_option: "A",
      explanation: "Step 1: Identify quantum numbers for a 3p orbital:\n- Principal quantum number, n = 3\n- Azimuthal quantum number, l = 1 (since it is a p orbital)\n\nStep 2: Calculate number of angular nodes:\nNumber of angular nodes = l = 1.\n\nStep 3: Calculate number of radial nodes:\nNumber of radial nodes = n − l − 1\n                       = 3 − 1 − 1\n                       = 1.\n\nStep 4: Total nodes:\nTotal nodes = (n − 1) = 3 − 1 = 2 (consisting of 1 radial node and 1 angular node).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2736, // Q11
    similar_question: {
      question: "In a hydrogen-like ion, the energy of the electron in the 3rd orbit (n = 3) is −13.6 eV. Which of the following statements is INCORRECT regarding this ion?\n(A) The atomic number (Z) of the hydrogen-like ion is 3 (Li²⁺ ion).\n(B) The ground state energy (n = 1) of this ion is −122.4 eV.\n(C) The ionization energy of this ion from its ground state is +122.4 eV.\n(D) The radius of the first Bohr orbit of this ion is 3 times the first Bohr radius of a hydrogen atom.",
      option_a: "The atomic number (Z) of the hydrogen-like ion is 3 (Li²⁺ ion).",
      option_b: "The ground state energy (n = 1) of this ion is −122.4 eV.",
      option_c: "The ionization energy of this ion from its ground state is +122.4 eV.",
      option_d: "The radius of the first Bohr orbit of this ion is 3 times the first Bohr radius of a hydrogen atom.",
      correct_option: "D",
      explanation: "Step 1: Determine the atomic number Z:\nEnergy of nth orbit for a hydrogen-like species is given by:\nEₙ = −13.6 × (Z² / n²) eV\nGiven E₃ = −13.6 eV:\n−13.6 = −13.6 × (Z² / 3²)\nZ² / 9 = 1 ⇒ Z² = 9 ⇒ Z = 3.\nThus, the ion is Li²⁺ (Statement A is correct).\n\nStep 2: Ground state energy (n = 1):\nE₁ = −13.6 × (3² / 1²) = −13.6 × 9 = −122.4 eV (Statement B is correct).\n\nStep 3: Ionization energy from ground state:\nIonization energy = E_∞ − E₁ = 0 − (−122.4 eV) = +122.4 eV (Statement C is correct).\n\nStep 4: Check radius of first orbit:\nr₁ = r₀ × (n² / Z) = r₀ × (1² / 3) = (1/3) r₀.\nThe radius is (1/3) of the first Bohr radius of hydrogen, NOT 3 times (Statement D is incorrect).\n\nTherefore, Statement (D) is incorrect and hence the correct answer. Option (D)."
    }
  },
  {
    id: 2737, // Q12
    similar_question: {
      question: "An electron in a hydrogen atom in its ground state absorbs energy equal to the ionisation energy of a He⁺ ion. The de-Broglie wavelength of the ejected photoelectron is approximately:\n(Given: Ionisation energy of H-atom = 13.6 eV; Z for He = 2; formula for electron wavelength: λ ≈ √(150 / V) Å where V is kinetic energy in eV)",
      option_a: "1.92 Å",
      option_b: "0.96 Å",
      option_c: "3.32 Å",
      option_d: "0.53 Å",
      correct_option: "A",
      explanation: "Step 1: Calculate the ionisation energy of He⁺ ion (Z = 2):\nIE(He⁺) = 13.6 × Z² eV = 13.6 × 2² = 13.6 × 4 = 54.4 eV.\n\nStep 2: Energy absorbed by hydrogen atom:\nEnergy absorbed, E = 54.4 eV.\nBinding energy of electron in ground state of H-atom = 13.6 eV.\n\nStep 3: Kinetic energy of the ejected photoelectron:\nKE = E_absorbed − Binding energy\n   = 54.4 eV − 13.6 eV\n   = 40.8 eV.\n\nStep 4: Calculate the de-Broglie wavelength of the emitted electron:\nλ = √(150 / V) Å (where V = 40.8 V)\n  = √(150 / 40.8) Å\n  = √(3.676) Å\n  ≈ 1.917 Å ≈ 1.92 Å.\n\nTherefore, Option (A) is the correct answer."
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

    console.log('--- UPDATING ATOMIC STRUCTURE BATCH 2 (Q7 to Q12) ---');
    for (const item of atomicBatch2Updates) {
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

    console.log('\n--- DUMPING ATOMIC STRUCTURE BATCH 3 (Q13 to Q18) ---');
    const allData = JSON.parse(fs.readFileSync('./scripts/test_94_details.json'));
    const batch3 = allData.questions.slice(12, 18);
    batch3.forEach((q, idx) => {
      console.log(`----------------------------------------`);
      console.log(`Q#${13 + idx} [ID: ${q.id}]`);
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
