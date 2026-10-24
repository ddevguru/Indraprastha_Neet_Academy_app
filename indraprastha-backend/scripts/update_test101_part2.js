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
    id: 3793,
    similarQuestion: {
      question: "How long (in hours) must an electric current of 50 A be passed through water during electrolysis so that the oxygen gas (O₂) liberated at the anode can completely combust 16.0 g of methane (CH₄)? (Given: Molar mass of CH₄ = 16.0 g mol⁻¹, 1 F = 96,500 C)",
      option_a: "2.1 hours",
      option_b: "4.3 hours",
      option_c: "8.6 hours",
      option_d: "1.5 hours",
      correct_option: "B",
      explanation: "1. Complete combustion of methane:\nCH₄ + 2 O₂ → CO₂ + 2 H₂O\n1 mole of CH₄ (16.0 g) requires 2 moles of O₂.\n\n2. From the electrolysis of water at the anode:\n2 H₂O(l) → O₂(g) + 4 H⁺(aq) + 4 e⁻\nLiberation of 1 mole of O₂ requires 4 Faradays of charge.\nTherefore, 2 moles of O₂ require: 2 × 4 = 8 Faradays of charge.\n\n3. Total electric charge:\nQ = 8 F = 8 × 96,500 C = 772,000 C\n\n4. Time required:\nt = Q / I = 772,000 C / 50 A = 15,440 seconds\nt in hours = 15,440 / 3600 ≈ 4.29 hours ≈ 4.3 hours\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3794,
    similarQuestion: {
      question: "When an electric current of 9.65 A is passed for 1.0 hour through an aqueous solution of CuSO₄, what mass of pure copper will be deposited at the cathode? (Given: Atomic mass of Cu = 63.5 g mol⁻¹, 1 F = 96,500 C)",
      option_a: "5.72 g",
      option_b: "22.86 g",
      option_c: "11.43 g",
      option_d: "1.14 g",
      correct_option: "C",
      explanation: "Reduction of copper at cathode:\nCu²⁺(aq) + 2 e⁻ → Cu(s)\nEquivalent weight of copper = Atomic mass / n = 63.5 / 2 = 31.75 g equiv⁻¹\n\nTotal charge passed:\nQ = I × t = 9.65 A × (1 × 3600 s) = 34,740 C\n\nNumber of Faradays passed:\nFaradays = 34,740 / 96,500 = 0.36 F\n\nMass of copper deposited:\nMass = Number of Faradays × Equivalent weight\nMass = 0.36 × 31.75 = 11.43 g\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3795,
    similarQuestion: {
      question: "For the electrochemical rusting of iron, the half-cell reactions are:\nAnode: 2 Fe(s) → 2 Fe²⁺(aq) + 4 e⁻; E° = +0.44 V\nCathode: O₂(g) + 4 H⁺(aq) + 4 e⁻ → 2 H₂O(l); E° = +1.23 V\nThe standard Gibbs free energy change (ΔG°) for the overall reaction 2 Fe(s) + O₂(g) + 4 H⁺(aq) → 2 Fe²⁺(aq) + 2 H₂O(l) at 298 K is: (Given: 1 F = 96,500 C mol⁻¹)",
      option_a: "-322.3 kJ mol⁻¹",
      option_b: "-644.6 kJ mol⁻¹",
      option_c: "+644.6 kJ mol⁻¹",
      option_d: "-161.2 kJ mol⁻¹",
      correct_option: "B",
      explanation: "1. Standard cell potential:\nE°_cell = E°_cathode + E°_anode_ox = 1.23 V + 0.44 V = 1.67 V\n\n2. Number of electrons transferred in the balanced equation:\nn = 4\n\n3. Standard Gibbs free energy change:\nΔG° = -n F E°_cell\nΔG° = -4 × 96,500 C mol⁻¹ × 1.67 V\nΔG° = -644,620 J mol⁻¹ = -644.6 kJ mol⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3796,
    similarQuestion: {
      question: "Consider the cell reaction at 298 K:\n2 Al(s) + 3 Cu²⁺(aq, 0.01 M) → 2 Al³⁺(aq, 0.1 M) + 3 Cu(s)\nGiven standard reduction potentials:\nE°(Al³⁺ | Al) = -1.66 V\nE°(Cu²⁺ | Cu) = +0.34 V\nWhat is the EMF (E_cell) of the cell? (Given: 2.303 RT / F = 0.059 V)",
      option_a: "2.04 V",
      option_b: "1.96 V",
      option_c: "2.00 V",
      option_d: "1.88 V",
      correct_option: "B",
      explanation: "1. Standard cell potential:\nE°_cell = E°_cathode - E°_anode = +0.34 V - (-1.66 V) = +2.00 V\n\n2. Total electrons transferred n = 2 × 3 = 6.\nReaction quotient Q is:\nQ = [Al³⁺]² / [Cu²⁺]³ = (0.1)² / (0.01)³ = 10⁻² / 10⁻⁶ = 10⁴\nlog Q = log(10⁴) = 4\n\n3. Nernst equation:\nE_cell = E°_cell - (0.059 / n) log Q\nE_cell = 2.00 - (0.059 / 6) × 4\nE_cell = 2.00 - 0.0393 = 1.96 V\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3797,
    similarQuestion: {
      question: "For the concentration cell at 298 K:\nPt(s) | H₂(g, 1 bar) | H⁺(aq, pH = 4) || H⁺(aq, pH = 2) | H₂(g, 1 bar) | Pt(s)\nThe EMF of the cell is: (Given: 2.303 RT / F = 0.059 V)",
      option_a: "+0.118 V",
      option_b: "-0.118 V",
      option_c: "+0.059 V",
      option_d: "+0.236 V",
      correct_option: "A",
      explanation: "For the hydrogen concentration cell:\nAnode: (1/2) H₂(g) → H⁺(anode) + e⁻\nCathode: H⁺(cathode) + e⁻ → (1/2) H₂(g)\n\nNet cell reaction: H⁺(cathode) → H⁺(anode)\nNumber of electrons n = 1.\n\nFrom the Nernst equation:\nE_cell = - (0.059 / 1) log( [H⁺]_anode / [H⁺]_cathode )\nE_cell = 0.059 × [ -log[H⁺]_anode - (-log[H⁺]_cathode) ]\nE_cell = 0.059 × ( pH_anode - pH_cathode )\n\nGiven:\npH_anode = 4\npH_cathode = 2\n\nSubstitute the values:\nE_cell = 0.059 × (4 - 2) = 0.059 × 2 = +0.118 V\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3798,
    similarQuestion: {
      question: "For the cell:\nZn(s) | Zn²⁺(aq, 1.0 M) || Cu²⁺(aq, 0.1 M) | Cu(s)\nGiven E°_cell = 1.10 V, the Gibbs free energy change (ΔG) for the cell reaction at temperature T is given by:",
      option_a: "-2.2 F - 2.303 RT",
      option_b: "2.303 RT - 2.2 F",
      option_c: "1.1 F - 2.303 RT",
      option_d: "-1.1 F",
      correct_option: "B",
      explanation: "Cell reaction:\nZn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)\nNumber of electrons n = 2.\n\nThermodynamic relation:\nΔG = ΔG° + 2.303 RT log Q\n\n1. Standard Gibbs energy change:\nΔG° = -n F E°_cell = -2(1.10) F = -2.2 F\n\n2. Reaction quotient:\nQ = [Zn²⁺] / [Cu²⁺] = 1.0 / 0.1 = 10\nlog Q = log(10) = 1\n\n3. Substitute into the expression:\nΔG = -2.2 F + 2.303 RT (1) = 2.303 RT - 2.2 F\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3799,
    similarQuestion: {
      question: "Statement 1: The cell potential of a mercury cell remains practically constant at ~1.35 V throughout its operational life.\nStatement 2: The overall cell reaction of a mercury cell does not involve any ions in the electrolyte solution whose concentration can change during operation.",
      option_a: "Both Statement 1 and Statement 2 are true, and Statement 2 is the correct explanation of Statement 1.",
      option_b: "Both Statement 1 and Statement 2 are true, but Statement 2 is NOT the correct explanation of Statement 1.",
      option_c: "Statement 1 is true, but Statement 2 is false.",
      option_d: "Statement 1 is false, but Statement 2 is true.",
      correct_option: "A",
      explanation: "The overall cell reaction in a mercury button cell is:\nZn(Hg) + HgO(s) → ZnO(s) + Hg(l)\n\n1. The overall reaction consists entirely of solids, liquids, and amalgam, and does not contain any free dissolved ions in the solution whose concentrations could vary during discharge.\n2. According to the Nernst equation, because no solution ionic concentrations appear in the reaction quotient Q, the cell potential is constant and independent of the state of discharge throughout its lifespan.\nTherefore, Statement 1 is true, Statement 2 is true, and Statement 2 is the correct explanation for Statement 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3800,
    similarQuestion: {
      question: "Statement 1: Standard electrode potentials (E°) of half-cells cannot be directly added or subtracted to obtain the standard potential of a new half-cell reaction.\nStatement 2: Electrode potential (E°) is an intensive thermodynamic property, whereas Gibbs free energy change (ΔG°) is an extensive property.",
      option_a: "Both Statement 1 and Statement 2 are true, and Statement 2 is the correct explanation of Statement 1.",
      option_b: "Both Statement 1 and Statement 2 are true, but Statement 2 is NOT the correct explanation of Statement 1.",
      option_c: "Statement 1 is true, but Statement 2 is false.",
      option_d: "Statement 1 is false, but Statement 2 is true.",
      correct_option: "A",
      explanation: "1. Electrode potential E° is an intensive property (does not depend on the quantity of matter). Intensive properties are non-additive; thus, E° values of two half-reactions cannot be directly added to find the potential of an intermediate half-reaction.\n2. To find the standard potential of a new half-reaction, one must convert potentials into extensive quantities, namely ΔG° = -n F E°, add the ΔG° values, and then divide by -n_net F.\nTherefore, both Statement 1 and Statement 2 are true, and Statement 2 correctly explains Statement 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4604,
    similarQuestion: {
      question: "Which of the following statements regarding a Daniell cell and electrochemical cells is/are correct?\n(A) A galvanic cell converts the chemical energy of a spontaneous redox reaction into electrical energy.\n(B) If an opposing external potential greater than 1.1 V (E_ext > 1.1 V) is applied across a Daniell cell, current flows in the reverse direction and the cell functions as an electrolytic cell.\n(C) In any electrochemical cell, oxidation always takes place at the anode, while reduction always takes place at the cathode.\n(D) All of the above statements are correct.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us review electrochemical cell fundamentals:\n1. A galvanic cell transforms chemical free energy into electrical work via spontaneous reactions (ΔG < 0). Statement (A) is correct.\n2. When an opposing external voltage E_ext exceeds the standard cell EMF of 1.1 V (E_ext > 1.1 V), electrons are forced in the opposite direction (from Cu to Zn), reversing the chemical reaction so that the cell behaves as an electrolytic cell. Statement (B) is correct.\n3. By IUPAC definition, oxidation always occurs at the anode and reduction at the cathode in all electrochemical devices. Statement (C) is correct.\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4605,
    similarQuestion: {
      question: "Standard reduction potentials at 298 K are:\nE°(Li⁺ | Li) = -3.05 V\nE°(Ca²⁺ | Ca) = -2.87 V\nE°(Zn²⁺ | Zn) = -0.76 V\nE°(Cu²⁺ | Cu) = +0.34 V\nE°(Au³⁺ | Au) = +1.50 V\nThe correct decreasing order of reducing power of the respective metals is:",
      option_a: "Au > Cu > Zn > Ca > Li",
      option_b: "Li > Ca > Zn > Cu > Au",
      option_c: "Li > Zn > Ca > Cu > Au",
      option_d: "Ca > Li > Zn > Au > Cu",
      correct_option: "B",
      explanation: "Reducing power represents the ability of a metal to lose electrons and get oxidized:\nM → Mⁿ⁺ + n e⁻\n\nStandard oxidation potential is E°_ox = -E°_red.\nTherefore, the more negative the standard reduction potential, the stronger is the reducing ability of the metal.\nComparing the given reduction potentials:\nE°(Li⁺ | Li) = -3.05 V (most negative ⇒ strongest reducing agent)\nE°(Ca²⁺ | Ca) = -2.87 V\nE°(Zn²⁺ | Zn) = -0.76 V\nE°(Cu²⁺ | Cu) = +0.34 V\nE°(Au³⁺ | Au) = +1.50 V (least negative ⇒ weakest reducing agent)\n\nDecreasing order of reducing power:\nLi > Ca > Zn > Cu > Au\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4606,
    similarQuestion: {
      question: "The electrical conductivity (κ) of an electrolytic solution depends on which of the following factors?\n(A) Nature of the electrolyte and concentration of ions.\n(B) Size of the ions produced and their degree of solvation.\n(C) Nature of the solvent and its viscosity.\n(D) Temperature of the electrolytic solution.",
      option_a: "A and D only",
      option_b: "B and C only",
      option_c: "A, B, and C only",
      option_d: "All of the above (A, B, C, and D)",
      correct_option: "D",
      explanation: "Conductivity of electrolytic solutions is governed by:\n1. Nature of electrolyte: Strong vs weak electrolytes produce different numbers of charge-carrying ions per unit volume.\n2. Ion size and solvation: Larger, heavily hydrated ions experience greater frictional resistance and lower mobility.\n3. Solvent nature and viscosity: Highly viscous solvents impede ionic drift.\n4. Temperature: Conductivity increases with temperature as ionic mobility increases and solvent viscosity decreases.\nTherefore, conductivity depends on all the mentioned factors.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4607,
    similarQuestion: {
      question: "Which of the following statements regarding the cell constant (G*) of a conductivity cell is INCORRECT?",
      option_a: "The cell constant is defined as the ratio of the distance between the electrodes (l) to their cross-sectional area (A): G* = l / A.",
      option_b: "The SI unit of cell constant is m⁻¹, and in CGS units it is expressed as cm⁻¹.",
      option_c: "The relationship between cell constant (G*), resistance (R), and conductivity (κ) is given by G* = R × κ.",
      option_d: "The cell constant varies significantly with the concentration and nature of the electrolyte solution placed inside the cell.",
      correct_option: "D",
      explanation: "Let us examine the properties of the cell constant (G*):\n1. G* = l / A, where l is distance between the two electrodes and A is their surface area. (Statement A is correct)\n2. Dimension is length⁻¹, so SI unit is m⁻¹ and CGS unit is cm⁻¹. (Statement B is correct)\n3. Since resistance R = ρ(l/A) = (1/κ) × G*, it follows that G* = R × κ. (Statement C is correct)\n4. G* is a geometric constant that depends solely on the fixed dimensions and physical geometry of the cell; it is completely independent of the nature or concentration of the electrolyte solution placed inside. (Statement D is INCORRECT)\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4608,
    similarQuestion: {
      question: "How much electricity in terms of Faradays (F) is required for the complete reduction of 1 mole of dichromate ions (Cr₂O₇²⁻) to Cr³⁺ in acidic medium?",
      option_a: "3 F",
      option_b: "6 F",
      option_c: "1 F",
      option_d: "14 F",
      correct_option: "B",
      explanation: "The reduction half-reaction of dichromate in acidic medium is:\nCr₂O₇²⁻(aq) + 14 H⁺(aq) + 6 e⁻ → 2 Cr³⁺(aq) + 7 H₂O(l)\n\n1. In this reaction, the oxidation state of chromium changes from +6 (in Cr₂O₇²⁻) to +3 (in Cr³⁺).\n2. For each molecule of Cr₂O₇²⁻, two chromium atoms undergo reduction, requiring a total of 2 × 3 = 6 electrons.\n3. Therefore, 1 mole of Cr₂O₇²⁻ consumes 6 moles of electrons, which is equivalent to 6 Faradays (6 F) of electrical charge.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4609,
    similarQuestion: {
      question: "Which of the following electrode reactions represents the cathodic reduction process occurring during the operation of a dry cell (Leclanché cell)?",
      option_a: "Zn(s) → Zn²⁺(aq) + 2 e⁻",
      option_b: "MnO₂(s) + NH₄⁺(aq) + e⁻ → MnO(OH)(s) + NH₃(g)",
      option_c: "PbO₂(s) + SO₄²⁻(aq) + 4 H⁺(aq) + 2 e⁻ → PbSO₄(s) + 2 H₂O(l)",
      option_d: "HgO(s) + H₂O(l) + 2 e⁻ → Hg(l) + 2 OH⁻(aq)",
      correct_option: "B",
      explanation: "In a Leclanché dry cell:\n1. Anode (zinc container): Zinc is oxidized:\nZn(s) → Zn²⁺(aq) + 2 e⁻\n\n2. Cathode (carbon rod surrounded by MnO₂ and carbon black):\nManganese dioxide is reduced from +4 to +3:\nMnO₂(s) + NH₄⁺(aq) + e⁻ → MnO(OH)(s) + NH₃(g)\n\n3. The released ammonia combines with Zn²⁺ ions to form the complex [Zn(NH₃)₄]²⁺.\nTherefore, Option (B) is the correct answer."
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
        console.log(`[SUCCESS] Updated Test 101 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 101 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
