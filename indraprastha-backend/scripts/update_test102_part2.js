const https = require('https');

const loginData = JSON.stringify({
  username: 'indraprasthaadmin',
  password: 'indraprastha@123'
});

function postRequest(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function putRequest(url, data, token) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const updates = [
  {
    id: 4664,
    similarQuestion: {
      question: "According to the IUPAC systematic nomenclature for elements with atomic number Z > 100, what is the IUPAC systematic name and symbol for the element with atomic number 106 (Seaborgium)?",
      option_a: "Unnilhexium (Unh)",
      option_b: "Unnilpentium (Unp)",
      option_c: "Unnilseptium (Uns)",
      option_d: "Unniloctium (Uno)",
      correct_option: "A",
      explanation: "Using the IUPAC numerical roots for atomic digits:\n1 = un\n0 = nil\n6 = hex\n\nCombining the roots and adding the suffix '-ium':\nFor Z = 106: un + nil + hex + ium = Unnilhexium\nSymbol = Unh\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4665,
    similarQuestion: {
      question: "The maximum number of elements accommodated in any given period of the modern periodic table is equal to:",
      option_a: "The number of atomic orbitals available in that energy level.",
      option_b: "Twice the total number of atomic orbitals available in the energy subshells being filled.",
      option_c: "Equal to 2n², where n is the principal quantum number.",
      option_d: "Equal to n², where n is the principal quantum number.",
      correct_option: "B",
      explanation: "According to Pauli's exclusion principle, each atomic orbital can accommodate a maximum of two electrons with opposite spins.\nTherefore, the number of elements in a period is exactly equal to twice the number of atomic orbitals available in the subshells being filled across that period:\n- Period 1: 1s orbital (1 orbital) ⇒ 2 elements\n- Period 2 & 3: s + p orbitals (1 + 3 = 4 orbitals) ⇒ 8 elements\n- Period 4 & 5: s + d + p orbitals (1 + 5 + 3 = 9 orbitals) ⇒ 18 elements\n- Period 6 & 7: s + f + d + p orbitals (1 + 7 + 5 + 3 = 16 orbitals) ⇒ 32 elements\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4666,
    similarQuestion: {
      question: "In which of the following species are all atomic orbitals completely filled with paired electrons (pseudo-noble gas or noble gas configuration)?",
      option_a: "Zn²⁺",
      option_b: "Cu⁺",
      option_c: "Ar",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us inspect the electronic configuration of each species:\n1. Zn²⁺ (Z = 30): [Ar] 3d¹⁰ (all 3d orbitals are completely filled with 10 paired electrons).\n2. Cu⁺ (Z = 29): [Ar] 3d¹⁰ (all 3d orbitals are fully filled, pseudo-noble gas shell).\n3. Ar (Z = 18): 1s² 2s² 2p⁶ 3s² 3p⁶ (noble gas with fully filled octet).\nTherefore, all atomic orbitals are completely filled in each of the given species.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4667,
    similarQuestion: {
      question: "Which of the following pairs of elements have almost identical atomic radii due to the phenomenon of lanthanoid contraction?",
      option_a: "Sc and Y",
      option_b: "Zr and Hf",
      option_c: "Fe and Co",
      option_d: "Na and K",
      correct_option: "B",
      explanation: "1. Zirconium (Zr, 4d series, radius = 160 pm) and Hafnium (Hf, 5d series, radius = 159 pm) belong to Group 4.\n2. Although Hf has an extra electron shell compared to Zr, the 14 intervening 4f electrons preceding Hf exert poor shielding on the nuclear charge.\n3. This steady reduction in size across the 4f series is termed 'lanthanoid contraction', which counterbalances the normal expected increase in atomic size from 4d to 5d.\nHence, Zr and Hf have virtually identical atomic and ionic radii.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4668,
    similarQuestion: {
      question: "The isotopes of hydrogen, namely protium (¹H), deuterium (²H), and tritium (³H), have essentially identical atomic radii because:",
      option_a: "They possess different numbers of electrons.",
      option_b: "They possess identical nuclear charge (Z = 1) and identical electronic configuration (1s¹).",
      option_c: "Neutrons strongly shield the nuclear charge.",
      option_d: "Mass number dictates atomic size in isotopes.",
      correct_option: "B",
      explanation: "Atomic radius is determined by the electrostatic attraction between the positive nuclear charge (protons) and the surrounding electron cloud:\n1. Isotopes have the same number of protons (Z = 1) and identical electronic configurations (1s¹).\n2. Neutrons carry zero charge and reside entirely within the nucleus, having no significant effect on the electronic probability distribution.\n3. Therefore, all three isotopes of hydrogen have virtually identical atomic radii.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4669,
    similarQuestion: {
      question: "Which of the following comparisons of ionization potentials (IP) is CORRECT?",
      option_a: "IE₁(N) < IE₁(O)",
      option_b: "IE₂(Na) > IE₂(Mg)",
      option_c: "IE₁(B) > IE₁(Be)",
      option_d: "IE₁(Al) > IE₁(Mg)",
      correct_option: "B",
      explanation: "Let us analyze second ionization energy:\n1. For Na (Z = 11): Na⁺ has the configuration of Neon (1s² 2s² 2p⁶). Removing a second electron requires disrupting a highly stable noble-gas closed octet, leading to an extremely high IE₂ (4562 kJ mol⁻¹).\n2. For Mg (Z = 12): Mg⁺ has the configuration [Ne] 3s¹. Removing the second electron simply removes the single 3s valence electron to attain a noble-gas octet, requiring much lower energy (IE₂ = 1450 kJ mol⁻¹).\n3. Thus, IE₂(Na) > IE₂(Mg) is correct.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4670,
    similarQuestion: {
      question: "In a lithium atom (Z = 3), the outermost 2s electron experiences an effective nuclear charge (Z_eff) that is:",
      option_a: "Equal to the actual nuclear charge (+3).",
      option_b: "Greater than the actual nuclear charge (+3).",
      option_c: "Less than the actual nuclear charge (+3) due to shielding by the inner 1s² electrons.",
      option_d: "Zero, because inner electrons completely neutralize the nucleus.",
      correct_option: "C",
      explanation: "In a multi-electron atom like lithium:\n1. The actual nuclear charge is Z = +3.\n2. The two inner 1s electrons screen (shield) the valence 2s electron from the full attraction of the nucleus.\n3. According to Slater's rules, the effective nuclear charge experienced by the valence electron is:\nZ_eff = Z - σ\nWhere σ is the shielding constant (σ ≈ 1.70), making Z_eff ≈ +1.30, which is significantly less than +3.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4671,
    similarQuestion: {
      question: "Which of the following periodic properties is NOT a directly measurable physical quantity and instead represents a relative tendency of an atom in a chemical bond?",
      option_a: "Ionization enthalpy",
      option_b: "Electron gain enthalpy",
      option_c: "Electronegativity",
      option_d: "Atomic radius",
      correct_option: "C",
      explanation: "1. Ionization enthalpy and electron gain enthalpy are strictly measurable thermodynamic quantities expressed in kJ mol⁻¹ or eV/atom.\n2. Atomic radii can be experimentally determined using X-ray diffraction and spectroscopic techniques.\n3. In contrast, electronegativity is not a property of an isolated atom and is not directly measurable; it is a qualitative, dimensionless scale (such as Pauling, Mulliken, or Allred-Rochow) that describes the relative tendency of a bonded atom to attract shared electron pairs towards itself.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4672,
    similarQuestion: {
      question: "An element M has 2 valence electrons in its outermost shell and a non-metal X has 5 valence electrons in its outermost shell. What is the expected formula of the binary compound formed between M and X?",
      option_a: "M₂X₃",
      option_b: "M₃X₂",
      option_c: "MX₂",
      option_d: "M₅X₂",
      correct_option: "B",
      explanation: "1. Element M has 2 valence electrons, so it loses 2 electrons to attain an octet: Valency of M = 2 (forms M²⁺).\n2. Element X has 5 valence electrons, so it needs (8 - 5) = 3 electrons to complete its valence octet: Valency of X = 3 (forms X³⁻).\n3. By criss-cross rule of valencies:\nM (valency 2) and X (valency 3) form the formula M₃X₂.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4673,
    similarQuestion: {
      question: "For which of the following elements is its primary valency NOT equal to the total number of valence electrons present in its outermost shell?",
      option_a: "Sodium (Na)",
      option_b: "Magnesium (Mg)",
      option_c: "Carbon (C)",
      option_d: "Nitrogen (N)",
      correct_option: "D",
      explanation: "Valency of representative elements is equal to the number of valence electrons (for groups 1 to 4) or (8 - number of valence electrons) (for groups 15 to 18):\n1. Na (Group 1): 1 valence electron, valency = 1 (equal).\n2. Mg (Group 2): 2 valence electrons, valency = 2 (equal).\n3. C (Group 14): 4 valence electrons, valency = 4 (equal).\n4. N (Group 15): 5 valence electrons, but its primary covalency is 8 - 5 = 3, which is not equal to 5.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4674,
    similarQuestion: {
      question: "Which of the following electronic configurations corresponds to the element with the lowest first ionization enthalpy (IE₁)?",
      option_a: "[Ne] 3s¹",
      option_b: "[Ne] 3s² 3p¹",
      option_c: "[Ne] 3s² 3p³",
      option_d: "[Ne] 3s² 3p⁶",
      correct_option: "A",
      explanation: "1. The configuration [Ne] 3s¹ belongs to Sodium (Na), an alkali metal.\n2. In [Ne] 3s¹, the single 3s electron experiences strong screening from the inner 10 electrons and can be lost easily to produce a stable noble gas core ([Ne]), requiring only 496 kJ mol⁻¹.\n3. Across the period, [Ne] 3s² 3p¹ (Al = 577 kJ/mol), [Ne] 3s² 3p³ (P = 1012 kJ/mol), and [Ne] 3s² 3p⁶ (Ar = 1521 kJ/mol) have substantially higher ionization enthalpies.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4675,
    similarQuestion: {
      question: "Among the following electronic configurations of neutral gaseous atoms, which one has the most negative electron gain enthalpy (highest electron affinity)?",
      option_a: "1s² 2s² 2p⁵",
      option_b: "1s² 2s² 2p³",
      option_c: "1s² 2s² 2p⁶",
      option_d: "1s² 2s²",
      correct_option: "A",
      explanation: "1. The configuration 1s² 2s² 2p⁵ corresponds to Fluorine (a halogen), which requires only one additional electron to complete a stable noble-gas octet (2p⁶). Due to strong nuclear attraction, this electron addition releases a large amount of energy (-328 kJ mol⁻¹).\n2. 1s² 2s² 2p³ has a stable half-filled 2p subshell with much lower affinity.\n3. 1s² 2s² 2p⁶ is a noble gas with positive electron gain enthalpy.\n4. 1s² 2s² has a fully-filled 2s subshell with negligible or positive electron gain enthalpy.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4676,
    similarQuestion: {
      question: "Which of the following represents the correct increasing order of acidic character of oxides?",
      option_a: "SO₃ < P₄O₁₀ < SiO₂ < Al₂O₃",
      option_b: "Na₂O < MgO < Al₂O₃ < SiO₂",
      option_c: "Al₂O₃ < SiO₂ < MgO < Na₂O",
      option_d: "MgO < Na₂O < SiO₂ < Al₂O₃",
      correct_option: "B",
      explanation: "Across Period 3 from left to right, metallic character decreases and non-metallic character increases:\n- Na₂O: strongly basic metal oxide\n- MgO: basic oxide\n- Al₂O₃: amphoteric oxide (reacts with both acids and bases)\n- SiO₂: weakly acidic non-metal oxide\nTherefore, the acidic character increases in the order:\nNa₂O < MgO < Al₂O₃ < SiO₂\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4677,
    similarQuestion: {
      question: "Which of the following electronic configurations corresponds to a genuine s-block element?",
      option_a: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹",
      option_b: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
      option_c: "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹",
      option_d: "Both (A) and (B)",
      correct_option: "B",
      explanation: "An element is classified into a particular block based on the subshell that receives its differentiating (last) electron:\n1. 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ corresponds to Potassium (K, Z = 19). The last electron enters the 4s orbital with no prior d electrons, so it is an s-block alkali metal.\n2. 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹ corresponds to Copper (Cu, Z = 29), where electrons fill the 3d subshell; hence it belongs to the d-block.\n3. 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ 4s¹ corresponds to Chromium (Cr, Z = 24), which is also a d-block transition metal.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await postRequest('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.data.token;
    console.log('Logged in successfully.');

    let count = 0;
    for (const item of updates) {
      count++;
      const res = await putRequest(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`,
        JSON.stringify({ similarQuestion: item.similarQuestion }),
        token
      );
      if (res.status === 200) {
        console.log(`[SUCCESS] Updated Test 102 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 102 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
