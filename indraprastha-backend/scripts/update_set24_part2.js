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
    id: 3687,
    payload: {
      question: "The oxidation number of Mn in KMnO₄ is:",
      option_a: "+4",
      option_b: "+6",
      option_c: "+7",
      option_d: "+2",
      correct_option: "C",
      explanation: "In potassium permanganate (KMnO₄):\nPotassium (K) is an alkali metal with oxidation state +1.\nOxygen (O) usually exhibits an oxidation state of −2.\nLet the oxidation state of Mn be x.\n(+1) + x + 4(−2) = 0\n1 + x − 8 = 0\nx − 7 = 0\nx = +7\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3688,
    payload: {
      question: "The oxidation state of bromine (Br) in HBrO₃ (bromic acid) is:",
      option_a: "−1",
      option_b: "+1",
      option_c: "+3",
      option_d: "+5",
      correct_option: "D",
      explanation: "In bromic acid (HBrO₃):\nHydrogen has an oxidation state of +1.\nOxygen has an oxidation state of −2.\nLet the oxidation state of Br be x.\n(+1) + x + 3(−2) = 0\n1 + x − 6 = 0\nx − 5 = 0\nx = +5\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3689,
    payload: {
      question: "The oxidation state of sulfur (S) can vary from:",
      option_a: "−2 to +6",
      option_b: "−2 to +4",
      option_c: "−4 to +6",
      option_d: "0 to +6",
      correct_option: "A",
      explanation: "Sulfur belongs to Group 16 of the periodic table with the valence shell electronic configuration [Ne] 3s² 3p⁴.\nTo achieve a stable noble gas configuration by gaining two electrons, sulfur exhibits a minimum oxidation state of −2 (e.g., in H₂S, Na₂S).\nBy sharing all 6 valence electrons with more electronegative elements (like F or O), sulfur can exhibit a maximum oxidation state of +6 (e.g., in SF₆, H₂SO₄).\nHence, the oxidation state of sulfur varies from −2 to +6.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3690,
    payload: {
      question: "In bleaching powder, Ca(OCl)Cl, the oxidation states of the two chlorine atoms are:",
      option_a: "+1 and +1",
      option_b: "+1 and −1",
      option_c: "−1 and −1",
      option_d: "0 and 0",
      correct_option: "B",
      explanation: "Bleaching powder is chemically formulated as Ca(OCl)Cl, consisting of Ca²⁺ cation, hypochlorite anion (OCl⁻), and chloride anion (Cl⁻).\nIn the chloride ion (Cl⁻), the oxidation state of chlorine is −1.\nIn the hypochlorite ion (OCl⁻):\nx + (−2) = −1\nx = +1\nThus, the two chlorine atoms possess oxidation states of +1 and −1 respectively.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3691,
    payload: {
      question: "Chlorine exhibits a +5 oxidation state in which of the following species?",
      option_a: "HClO",
      option_b: "HClO₂",
      option_c: "HClO₃",
      option_d: "HClO₄",
      correct_option: "C",
      explanation: "Let us calculate the oxidation state of Cl (denoted by x) in each oxyacid:\n1. In HClO: (+1) + x + (−2) = 0 → x = +1\n2. In HClO₂: (+1) + x + 2(−2) = 0 → x = +3\n3. In HClO₃: (+1) + x + 3(−2) = 0 → x = +5\n4. In HClO₄: (+1) + x + 4(−2) = 0 → x = +7\nThus, chlorine is in the +5 oxidation state in HClO₃ (chloric acid).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3692,
    payload: {
      question: "The oxidation state of chromium in potassium dichromate, K₂Cr₂O₇, is:",
      option_a: "+3",
      option_b: "+5",
      option_c: "+6",
      option_d: "+7",
      correct_option: "C",
      explanation: "In potassium dichromate, K₂Cr₂O₇:\nPotassium has an oxidation number of +1.\nOxygen has an oxidation number of −2.\nLet the oxidation state of Cr be x.\n2(+1) + 2x + 7(−2) = 0\n2 + 2x − 14 = 0\n2x − 12 = 0\n2x = 12\nx = +6\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3693,
    payload: {
      question: "The oxidation states of N in NO₃⁻, S in SO₃²⁻, and Cl in ClO₄⁻ are respectively:",
      option_a: "+5, +4, +7",
      option_b: "+3, +6, +7",
      option_c: "+5, +6, +5",
      option_d: "+3, +4, +7",
      correct_option: "A",
      explanation: "Calculating the oxidation states:\n1. For N in NO₃⁻:\nx + 3(−2) = −1 → x − 6 = −1 → x = +5\n2. For S in SO₃²⁻:\ny + 3(−2) = −2 → y − 6 = −2 → y = +4\n3. For Cl in ClO₄⁻:\nz + 4(−2) = −1 → z − 8 = −1 → z = +7\nThus, the oxidation states are +5, +4, and +7 respectively.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3694,
    payload: {
      question: "Arrange the following species in increasing order of the oxidation state of nitrogen:\n(i) NO₂\n(ii) N₂O\n(iii) NO\n(iv) HNO₃",
      option_a: "(ii) < (iii) < (i) < (iv)",
      option_b: "(iii) < (ii) < (i) < (iv)",
      option_c: "(ii) < (i) < (iii) < (iv)",
      option_d: "(iv) < (i) < (iii) < (ii)",
      correct_option: "A",
      explanation: "Let us determine the oxidation state of nitrogen in each compound:\n(i) In NO₂: x + 2(−2) = 0 → x = +4\n(ii) In N₂O: 2x + (−2) = 0 → x = +1\n(iii) In NO: x + (−2) = 0 → x = +2\n(iv) In HNO₃: (+1) + x + 3(−2) = 0 → x = +5\nArranging in increasing order of oxidation state:\nN₂O (+1) < NO (+2) < NO₂ (+4) < HNO₃ (+5)\nHence, (ii) < (iii) < (i) < (iv).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3695,
    payload: {
      question: "In the reaction O₂ + 4H⁺ + 4e⁻ → 2H₂O, the equivalent weight of O₂ (molecular weight = M) is:",
      option_a: "M / 2",
      option_b: "M / 4",
      option_c: "M / 8",
      option_d: "M",
      correct_option: "B",
      explanation: "In the conversion O₂ → 2H₂O:\nEach oxygen atom in elemental O₂ changes its oxidation state from 0 to −2 in H₂O, representing a gain of 2 electrons per oxygen atom.\nSince there are 2 oxygen atoms in one molecule of O₂, the total number of electrons gained per mole of O₂ is 2 × 2 = 4.\nTherefore, the n-factor (valency factor) for O₂ is 4.\nEquivalent weight = Molecular weight / n-factor = M / 4.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3696,
    payload: {
      question: "In the reaction Cu₂S + O₂ → Cu²⁺ + SO₄²⁻, the equivalent weight of Cu₂S (molecular weight = M) is:",
      option_a: "M / 8",
      option_b: "M / 10",
      option_c: "M / 6",
      option_d: "M / 4",
      correct_option: "B",
      explanation: "Let us find the total change in oxidation state (n-factor) for Cu₂S:\nIn Cu₂S, copper has an oxidation state of +1 and sulfur has an oxidation state of −2.\n1. Two Cu⁺ ions oxidize to two Cu²⁺ ions: total electron loss = 2 × (2 − 1) = 2 electrons.\n2. One S²⁻ ion oxidizes to S in SO₄²⁻ (+6): electron loss = 6 − (−2) = 8 electrons.\nTotal electrons lost per mole of Cu₂S = 2 + 8 = 10 electrons.\nHence, n-factor = 10.\nEquivalent weight = Molecular weight / 10 = M / 10.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3697,
    payload: {
      question: "The oxidation state of chlorine can vary between:",
      option_a: "−1 to +5",
      option_b: "−1 to +7",
      option_c: "0 to +7",
      option_d: "−2 to +6",
      correct_option: "B",
      explanation: "Chlorine has the valence electronic configuration [Ne] 3s² 3p⁵ with 7 valence electrons.\n- By gaining one electron, it achieves the argon octet and exhibits its minimum oxidation state of −1 (as in chlorides like NaCl, HCl).\n- By sharing all 7 valence electrons with more electronegative elements like fluorine and oxygen, it achieves its maximum oxidation state of +7 (as in Cl₂O₇, HClO₄).\nThus, chlorine can exhibit oxidation states ranging from −1 to +7.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3698,
    payload: {
      question: "In the conversion of copper to cuprous oxide: 2Cu + 1/2 O₂ → Cu₂O, if the atomic weight of copper is 63.5, its equivalent weight is:",
      option_a: "31.75",
      option_b: "63.5",
      option_c: "127",
      option_d: "42.33",
      correct_option: "B",
      explanation: "In the formation of Cu₂O:\nCu changes its oxidation state from 0 in elemental copper to +1 in Cu₂O.\nTherefore, the change in oxidation state per copper atom (n-factor) = 1.\nEquivalent weight = Atomic weight / n-factor = 63.5 / 1 = 63.5.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3699,
    payload: {
      question: "When carbon is completely converted into CO₂, the equivalent weight of carbon (atomic mass = 12) is:",
      option_a: "12",
      option_b: "6",
      option_c: "3",
      option_d: "4",
      correct_option: "C",
      explanation: "In the conversion of C to CO₂:\nC + O₂ → CO₂\nThe oxidation state of carbon changes from 0 in elemental C to +4 in CO₂.\nTherefore, the n-factor for carbon = 4.\nEquivalent weight of carbon = Atomic mass / n-factor = 12 / 4 = 3.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3700,
    payload: {
      question: "When concentrated HNO₃ is reduced to NO₂ according to the reaction HNO₃ → NO₂, the equivalent weight of HNO₃ (molecular weight = M) is:",
      option_a: "M / 1",
      option_b: "M / 2",
      option_c: "M / 3",
      option_d: "M / 5",
      correct_option: "A",
      explanation: "In the reduction of nitric acid to nitrogen dioxide:\nIn HNO₃, the oxidation state of nitrogen is +5.\nIn NO₂, the oxidation state of nitrogen is +4.\nChange in oxidation state per nitrogen atom = 5 − 4 = 1.\nThus, n-factor = 1.\nEquivalent weight = Molecular weight / n-factor = M / 1 = M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3701,
    payload: {
      question: "The number of electrons involved in the balanced half-reaction for the reduction of dichromate ion in acidic medium, Cr₂O₇²⁻ → 2Cr³⁺, is:",
      option_a: "2",
      option_b: "3",
      option_c: "6",
      option_d: "14",
      correct_option: "C",
      explanation: "In the dichromate ion (Cr₂O₇²⁻), each chromium atom has an oxidation state of +6.\nIn Cr³⁺, chromium has an oxidation state of +3.\nThe reduction half-reaction is:\nCr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O\nEach Cr atom gains 3 electrons, so 2 Cr atoms gain a total of 2 × 3 = 6 electrons.\nTherefore, 6 electrons are involved in the balanced half-reaction.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3702,
    payload: {
      question: "In the half-reaction IO₃⁻ + 6H⁺ + ne⁻ → I⁻ + 3H₂O, the value of n is:",
      option_a: "4",
      option_b: "5",
      option_c: "6",
      option_d: "7",
      correct_option: "C",
      explanation: "In IO₃⁻, let the oxidation state of iodine be x:\nx + 3(−2) = −1 → x = +5.\nIn the iodide ion (I⁻), the oxidation state of iodine is −1.\nThe change in oxidation state of iodine = (+5) − (−1) = 6.\nThus, 6 electrons are gained to balance the reduction half-reaction:\nIO₃⁻ + 6H⁺ + 6e⁻ → I⁻ + 3H₂O\nHence, n = 6.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3703,
    payload: {
      question: "Identify the correct set of stoichiometric coefficients (a, b, c, d) to balance the acidic half-reaction: aMnO₄⁻ + bH⁺ + ce⁻ → dMn²⁺ + 4H₂O",
      option_a: "1, 8, 5, 1",
      option_b: "2, 8, 5, 2",
      option_c: "1, 4, 3, 1",
      option_d: "1, 8, 6, 1",
      correct_option: "A",
      explanation: "Let us balance the half-reaction:\nMnO₄⁻ + bH⁺ + ce⁻ → Mn²⁺ + 4H₂O\n1. Manganese is balanced: a = 1, d = 1.\n2. Oxygen is balanced: 4 oxygen atoms on LHS require 4H₂O on RHS.\n3. Hydrogen is balanced: 4H₂O on RHS has 8 H atoms, requiring b = 8 H⁺ on LHS.\n4. Charge balance:\nLHS charge = (−1) + 8(+1) + c(−1) = 7 − c\nRHS charge = +2\n7 − c = 2 → c = 5.\nThus, the coefficients (a, b, c, d) are 1, 8, 5, 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3704,
    payload: {
      question: "In the balanced redox equation: aCr₂O₇²⁻ + bFe²⁺ + cH⁺ → 2aCr³⁺ + bFe³⁺ + dH₂O, the values of a, b, and c are respectively:",
      option_a: "1, 6, 14",
      option_b: "2, 6, 14",
      option_c: "1, 3, 7",
      option_d: "1, 6, 7",
      correct_option: "A",
      explanation: "Let us balance the reaction using ion-electron method:\nReduction half-reaction: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O\nOxidation half-reaction: Fe²⁺ → Fe³⁺ + e⁻\nMultiplying the oxidation half-reaction by 6 to equate electrons:\n6Fe²⁺ → 6Fe³⁺ + 6e⁻\nAdding the two half-reactions:\nCr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O\nComparing coefficients:\na = 1, b = 6, c = 14, d = 7.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3705,
    payload: {
      question: "If the molecular weight of potassium dichromate (K₂Cr₂O₇) is M, its equivalent weight in acidic medium is:",
      option_a: "M / 2",
      option_b: "M / 3",
      option_c: "M / 6",
      option_d: "M / 14",
      correct_option: "C",
      explanation: "In acidic medium, dichromate acts as an oxidizing agent and is reduced to chromium(III):\nCr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O\nIn K₂Cr₂O₇, each Cr changes its oxidation state from +6 to +3 (a decrease of 3).\nFor one formula unit containing 2 Cr atoms, the total number of electrons gained = 2 × 3 = 6.\nThus, the n-factor of K₂Cr₂O₇ in acidic medium is 6.\nEquivalent weight = Molecular weight / n-factor = M / 6.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3706,
    payload: {
      question: "In the conversion of hydrazine (N₂H₄) to nitrogen gas (N₂), the equivalent weight of N₂H₄ (molecular weight = M) is:",
      option_a: "M / 2",
      option_b: "M / 4",
      option_c: "M / 6",
      option_d: "M / 1",
      correct_option: "B",
      explanation: "In hydrazine (N₂H₄):\n2x + 4(+1) = 0 → 2x = −4 → x = −2 (oxidation state of N is −2).\nIn molecular nitrogen (N₂):\nThe oxidation state of N is 0.\nThe change in oxidation state per nitrogen atom = 0 − (−2) = 2.\nSince there are 2 nitrogen atoms in one molecule of N₂H₄, the total electron loss (n-factor) = 2 × 2 = 4.\nEquivalent weight = Molecular weight / n-factor = M / 4.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3707,
    payload: {
      question: "The equivalent weight of phosphorous acid (H₃PO₃, molecular weight = 82) in the complete neutralization reaction 2NaOH + H₃PO₃ → Na₂HPO₃ + 2H₂O is:",
      option_a: "82",
      option_b: "41",
      option_c: "27.33",
      option_d: "164",
      correct_option: "B",
      explanation: "Phosphorous acid (H₃PO₃) is a dibasic acid because it contains two ionizable P−OH protons (the third hydrogen is directly bonded to phosphorus, P−H, and is non-ionizable).\nIn this reaction with 2 moles of NaOH, both ionizable protons are neutralized:\nBasicity (n-factor) = 2.\nEquivalent weight = Molecular weight / n-factor = 82 / 2 = 41.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    const token = await login();
    console.log('Logged in successfully, token received.');

    let count = 0;
    for (const item of updates) {
      await updateQuestion(token, item.id, item.payload);
      count++;
      console.log(`[SUCCESS] Updated question ${item.id} (${count}/${updates.length})`);
    }
    console.log(`Set 24 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
