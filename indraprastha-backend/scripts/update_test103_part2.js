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
    id: 3855,
    similarQuestion: {
      question: "Which of the following statements regarding the nitric oxide (NO) molecule is INCORRECT?",
      option_a: "In the gaseous state, NO is paramagnetic due to the presence of one unpaired electron in its π* antibonding molecular orbital.",
      option_b: "The bond order of the NO molecule is 2.5.",
      option_c: "In the liquid and solid states, NO dimerizes to form a diamagnetic N₂O₂ dimer.",
      option_d: "NO is an acidic oxide that turns blue litmus red in aqueous solution.",
      correct_option: "D",
      explanation: "Let us analyze the properties of nitric oxide (NO):\n1. NO has 15 electrons with one unpaired electron in a π*₂p orbital, rendering it paramagnetic in the gas phase. (Statement A is correct)\n2. Bond order = (10 - 5) / 2 = 2.5. (Statement B is correct)\n3. Upon cooling to the liquid and solid states, NO pairs its odd electrons to form a diamagnetic dimer N₂O₂. (Statement C is correct)\n4. NO is a neutral oxide (like CO and N₂O) and does not react with acids or bases, nor does it affect litmus. Thus, statement (D) is INCORRECT.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3856,
    similarQuestion: {
      question: "Which of the following alkaline earth metal sulfates is readily soluble in water due to its high hydration enthalpy overcoming its lattice enthalpy?",
      option_a: "BaSO₄",
      option_b: "SrSO₄",
      option_c: "BeSO₄",
      option_d: "CaSO₄",
      correct_option: "C",
      explanation: "1. The solubility of alkaline earth metal sulfates depends on the balance between lattice enthalpy and hydration enthalpy.\n2. Due to the very small size of the Be²⁺ cation, its charge density is exceptionally high, resulting in an extraordinarily large negative hydration enthalpy.\n3. For BeSO₄, hydration enthalpy is much greater than lattice enthalpy, making BeSO₄ highly soluble in water.\n4. Down Group 2 (from MgSO₄ to BaSO₄), hydration enthalpy drops much more rapidly than lattice enthalpy, rendering BaSO₄ practically insoluble.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3857,
    similarQuestion: {
      question: "According to Molecular Orbital Theory, the diatomic molecule C₂ has 12 electrons:\nσ₁s² σ*₁s² σ₂s² σ*₂s² π₂p_x² π₂p_y²\nWhat is the bond order and magnetic nature of the C₂ molecule?",
      option_a: "2 and diamagnetic",
      option_b: "2 and paramagnetic",
      option_c: "1 and diamagnetic",
      option_d: "3 and diamagnetic",
      correct_option: "A",
      explanation: "From the molecular orbital configuration of C₂:\nNumber of bonding electrons (N_b) = 8 (two in σ₁s, two in σ₂s, four in π₂p)\nNumber of antibonding electrons (N_a) = 4 (two in σ*₁s, two in σ*₂s)\n\n1. Bond order:\nBond order = (N_b - N_a) / 2 = (8 - 4) / 2 = 2\n\n2. All 12 electrons are paired in the orbitals, with zero unpaired electrons.\nTherefore, C₂ is diamagnetic.\n(Notably, both bonds in C₂ are π-bonds because the last 4 valence electrons reside in π₂p bonding orbitals).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3858,
    similarQuestion: {
      question: "If a planar ethene molecule (H₂C=CH₂) lies entirely in the xy-plane, the nodal plane of the carbon-carbon π-bond formed by sideways overlap of 2p_z atomic orbitals is located in the:",
      option_a: "xz-plane",
      option_b: "yz-plane",
      option_c: "xy-plane (molecular plane)",
      option_d: "A plane inclined at 45° to the molecular plane",
      correct_option: "C",
      explanation: "1. The ethene molecule lies in the xy-plane, where carbon uses 2s, 2p_x, and 2p_y orbitals for sp² hybridization to form the σ-framework.\n2. The remaining unhybridized 2p_z orbitals are oriented perpendicular to the xy-plane along the z-axis.\n3. Sideways overlap of the 2p_z orbitals creates electron lobes above and below the xy-plane.\n4. The nodal plane of a 2p_z orbital is the xy-plane, where the electron probability is zero.\n5. Therefore, the nodal plane of the resulting C-C π-bond is the xy-plane (the molecular plane itself).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3859,
    similarQuestion: {
      question: "In solid xenon hexafluoride, XeF₆ exists as an ionic solid composed of [XeF₅]⁺ and F⁻ (or [XeF₅]⁺ and [Xe₂F₁₁]⁻). The hybridization of Xe in the square pyramidal [XeF₅]⁺ cation is:",
      option_a: "sp³d",
      option_b: "sp³d²",
      option_c: "sp³d³",
      option_d: "dsp²",
      correct_option: "B",
      explanation: "In the [XeF₅]⁺ cation:\n1. Valence electrons of Xe = 8.\n2. In [XeF₅]⁺, total valence electrons on Xe = 8 - 1 = 7.\n3. Xenon forms 5 single bonds with 5 fluorine atoms, leaving 2 non-bonding electrons (1 lone pair).\n4. Steric number = 5 bond pairs + 1 lone pair = 6.\n5. A steric number of 6 corresponds to sp³d² hybridization with an octahedral electron-pair geometry and a square pyramidal molecular shape.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3860,
    similarQuestion: {
      question: "Which of the following statements regarding the structure and anomalous behavior of water and ice is/are correct?\n(A) In ice, each oxygen atom is tetrahedrally surrounded by four other oxygen atoms via two covalent O-H bonds and two hydrogen bonds.\n(B) Due to an open, cage-like crystal lattice with vacant spaces, ice has a lower density than liquid water at 0°C.\n(C) When ice melts and liquid water is heated from 0°C to 4°C, the hydrogen-bonded cage structure collapses, causing density to increase to a maximum at 4°C.\n(D) All of the above statements are correct.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us evaluate the structure of ice and water:\n1. In hexagonal ice, each oxygen is tetrahedrally coordinated to four others via two covalent O-H bonds and two O···H hydrogen bonds. (Statement A is correct)\n2. This tetrahedral framework creates a highly open cage-like lattice with extensive empty channels, giving ice a lower density than liquid water. (Statement B is correct)\n3. Between 0°C and 4°C, hydrogen bonds partially break, allowing water molecules to pack into the vacant cavities, which causes contraction and reaches maximum density at 4°C. (Statement C is correct)\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3861,
    similarQuestion: {
      question: "In which of the following solid salts is intermolecular hydrogen bonding absent because the hydrogen atom is directly bonded to phosphorus (P-H) rather than oxygen (O-H)?",
      option_a: "Sodium hypophosphite, NaH₂PO₂(s)",
      option_b: "Sodium hydrogen carbonate, NaHCO₃(s)",
      option_c: "Potassium hydrogen phosphate, K₂HPO₄(s)",
      option_d: "Potassium hydrogen sulfate, KHSO₄(s)",
      correct_option: "A",
      explanation: "1. For hydrogen bonding to occur, hydrogen must be bonded to a strongly electronegative atom (F, O, or N).\n2. In sodium hypophosphite (NaH₂PO₂), the hypophosphite ion has the structure [H₂PO₂]⁻ with two non-polar P-H bonds and one P-OH-derived P-O⁻ bond; no acidic O-H proton remains to form intermolecular hydrogen bonds.\n3. In contrast, NaHCO₃, K₂HPO₄, and KHSO₄ all contain polar O-H bonds that engage in extensive intermolecular hydrogen-bonded networks in the solid state.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3862,
    similarQuestion: {
      question: "According to Bent's rule, as the number of highly electronegative fluorine atoms attached to carbon increases in the series CH₃F, CH₂F₂, and CHF₃, what is the correct order of the carbon-hydrogen (C-H) bond lengths?",
      option_a: "CHF₃ > CH₂F₂ > CH₃F",
      option_b: "CH₃F > CH₂F₂ > CHF₃",
      option_c: "CH₂F₂ > CH₃F > CHF₃",
      option_d: "CH₃F = CH₂F₂ = CHF₃",
      correct_option: "B",
      explanation: "According to Bent's rule:\n1. Electronegative substituents (like fluorine) prefer hybrid orbitals having higher p-character.\n2. As more fluorine atoms are added (from CH₃F to CH₂F₂ to CHF₃), p-character is progressively diverted to C-F bonds.\n3. Consequently, the hybrid orbitals directed towards hydrogen atoms gain greater s-character.\n4. Increased s-character contracts the orbital and shortens the C-H bond length.\n5. Therefore, the C-H bond length decreases in the order:\nCH₃F > CH₂F₂ > CHF₃\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3863,
    similarQuestion: {
      question: "In perfluoropropane (CF₃-CF₂-CF₃), how do the C-F bond lengths of the central CF₂ group compare with those of the terminal CF₃ groups?",
      option_a: "The C-F bonds on the central carbon are shorter than those on the terminal carbons.",
      option_b: "The C-F bonds on the central carbon are longer than those on the terminal carbons.",
      option_c: "All C-F bond lengths in the molecule are exactly identical.",
      option_d: "The C-F bond lengths cannot be compared.",
      correct_option: "B",
      explanation: "1. The central carbon in CF₃-CF₂-CF₃ is bonded to two strongly electron-withdrawing CF₃ groups in addition to two fluorine atoms.\n2. According to Bent's rule, the central carbon directs more p-character into its two C-F bonds compared to the terminal carbons which are bonded to three fluorines and only one alkyl group.\n3. Greater p-character in a hybrid orbital results in an elongated orbital and hence a longer bond length.\n4. Therefore, the C-F bonds on the middle carbon are longer than those on the terminal carbons.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3864,
    similarQuestion: {
      question: "When two gaseous nitrogen dioxide molecules (NO₂, odd-electron paramagnetic radical) dimerize to form dinitrogen tetroxide (N₂O₄):\n2 NO₂(g) ⇌ N₂O₄(g)\nWhich of the following properties undergo a change?\n(A) Magnetic nature (paramagnetic to diamagnetic)\n(B) Color (brown to colorless)\n(C) Hybridization and geometry of nitrogen\n(D) All of the above",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above (A, B, and C)",
      correct_option: "D",
      explanation: "During the dimerization of NO₂ to N₂O₄:\n1. Magnetic nature changes from paramagnetic (unpaired electron on N in NO₂) to diamagnetic (electrons paired up in the N-N σ bond in N₂O₄). (Statement A is correct)\n2. Color changes from deep reddish-brown (NO₂) to completely colorless (N₂O₄). (Statement B is correct)\n3. Hybridization changes from sp² (bent, angle ~134°) in NO₂ to a planar N₂O₄ structure with an unusually long N-N bond (1.78 Å). (Statement C is correct)\nTherefore, all of the listed properties change.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3865,
    similarQuestion: {
      question: "Which of the following species contains ONLY a single σ-bond between the atoms and NO π-bonds in its molecular orbital description?",
      option_a: "O₂",
      option_b: "N₂",
      option_c: "F₂",
      option_d: "C₂",
      correct_option: "C",
      explanation: "From Molecular Orbital Theory:\n1. N₂ has a bond order of 3 (1 σ + 2 π bonds).\n2. O₂ has a bond order of 2 (1 σ + 1 π bond).\n3. C₂ has a bond order of 2 (both bonds are π-bonds).\n4. F₂ has 14 valence electrons with MO configuration: σ₂s² σ*₂s² σ₂p_z² π₂p_x² π₂p_y² π*₂p_x² π*₂p_y². The π bonding and π antibonding electrons cancel out completely, leaving only a net single σ-bond (bond order = 1).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4682,
    similarQuestion: {
      question: "According to Fajan's rules, which of the following alkali metal chlorides exhibits significant covalent character and is readily soluble in organic solvents such as ethanol and diethyl ether?",
      option_a: "NaCl",
      option_b: "LiCl",
      option_c: "KCl",
      option_d: "CsCl",
      correct_option: "B",
      explanation: "1. According to Fajan's rules, smaller cations have higher charge densities and greater polarizing power, inducing greater polarization of the anion's electron cloud and imparting significant covalent character.\n2. Li⁺ is the smallest alkali metal cation and has the highest polarizing power among Group 1 ions.\n3. Consequently, LiCl possesses considerable covalent character, making it distinctly soluble in organic solvents like alcohol, acetone, and diethyl ether, whereas NaCl and KCl are purely ionic and insoluble in non-polar organic solvents.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4683,
    similarQuestion: {
      question: "In which of the following pairs is the dipole moment of the first molecule greater than that of the second molecule (μ₁ > μ₂)?",
      option_a: "NH₃ and NF₃",
      option_b: "NF₃ and NH₃",
      option_c: "CCl₄ and CHCl₃",
      option_d: "CO₂ and SO₂",
      correct_option: "A",
      explanation: "1. In NH₃, nitrogen is more electronegative than hydrogen, so the three N-H bond dipoles point towards nitrogen in the same direction as the lone pair dipole moment, reinforcing each other (net μ = 1.47 D).\n2. In NF₃, fluorine is more electronegative than nitrogen, so the three N-F bond dipoles point away from nitrogen, opposing the lone pair dipole moment and largely cancelling it out (net μ = 0.24 D).\n3. Therefore, μ(NH₃) > μ(NF₃).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4684,
    similarQuestion: {
      question: "The experimental dipole moment of a polar diatomic molecule is 0.96 D. If its internuclear bond length is 1.0 Å (1.0 × 10⁻⁸ cm), what fraction of an electronic charge (e) resides on each atom? (Given: 1 D = 1.0 × 10⁻¹⁸ esu·cm, e = 4.8 × 10⁻¹⁰ esu)",
      option_a: "0.10",
      option_b: "0.20",
      option_c: "0.30",
      option_d: "0.50",
      correct_option: "B",
      explanation: "Dipole moment is defined as:\nμ = q × d\n\nGiven in CGS-electrostatic units:\nμ = 0.96 D = 0.96 × 10⁻¹⁸ esu·cm\nd = 1.0 × 10⁻⁸ cm\n\nCalculate charge q on each atom:\nq = μ / d = (0.96 × 10⁻¹⁸ esu·cm) / (1.0 × 10⁻⁸ cm) = 0.96 × 10⁻¹⁰ esu\n\nFraction of electronic charge:\nFraction = q / e = (0.96 × 10⁻¹⁰ esu) / (4.8 × 10⁻¹⁰ esu) = 0.20\n(Corresponding to 20% ionic character).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4685,
    similarQuestion: {
      question: "According to Molecular Orbital Theory, which of the following diatomic species has a bond order of zero and therefore cannot exist under normal conditions?",
      option_a: "He₂⁺",
      option_b: "He₂",
      option_c: "H₂⁺",
      option_d: "Be₂⁺",
      correct_option: "B",
      explanation: "For neutral He₂ (4 electrons):\nElectronic configuration: σ₁s² σ*₁s²\nNumber of bonding electrons (N_b) = 2\nNumber of antibonding electrons (N_a) = 2\nBond order = (N_b - N_a) / 2 = (2 - 2) / 2 = 0\nA bond order of zero indicates that no net chemical bond is formed, so the diatomic He₂ molecule does not exist.\nTherefore, Option (B) is the correct answer."
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
        console.log(`[SUCCESS] Updated Test 103 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 103 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
