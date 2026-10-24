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
    id: 3665,
    question: "In the balanced redox reaction for the disproportionation of Bromine in hot concentrated alkaline medium:\na Br₂ + 6 OH⁻ → BrO₃⁻ + b Br⁻ + 3 H₂O\nWhat are the stoichiometric coefficients a and b?",
    option_a: "a = 3, b = 5",
    option_b: "a = 2, b = 4",
    option_c: "a = 5, b = 3",
    option_d: "a = 3, b = 3",
    correct_option: "A",
    explanation: "1. In elemental Bromine (Br₂), the oxidation state of Br is 0.\n2. In hot concentrated alkaline solution, bromine undergoes disproportionation:\n   - Oxidation half-reaction: 1/2 Br₂ + 6 OH⁻ → BrO₃⁻ + 3 H₂O + 5 e⁻\n   - Reduction half-reaction: (1/2 Br₂ + e⁻ → Br⁻) × 5  ⇒  5/2 Br₂ + 5 e⁻ → 5 Br⁻\n3. Adding both half-reactions to cancel the 5 electrons:\n   3 Br₂ + 6 OH⁻ → BrO₃⁻ + 5 Br⁻ + 3 H₂O\n4. Comparing with the given equation: a = 3 and b = 5.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3666,
    question: "Arrange the following oxoanions of Sulfur in order of increasing average oxidation state of Sulfur: SO₃²⁻, SO₄²⁻, and S₂O₃²⁻.",
    option_a: "S₂O₃²⁻ < SO₃²⁻ < SO₄²⁻",
    option_b: "SO₃²⁻ < S₂O₃²⁻ < SO₄²⁻",
    option_c: "SO₄²⁻ < SO₃²⁻ < S₂O₃²⁻",
    option_d: "S₂O₃²⁻ < SO₄²⁻ < SO₃²⁻",
    correct_option: "A",
    explanation: "1. In the thiosulfate ion (S₂O₃²⁻): 2x + 3(-2) = -2 ⇒ 2x = +4 ⇒ Average oxidation state x = +2.\n2. In the sulfite ion (SO₃²⁻): x + 3(-2) = -2 ⇒ x = +4.\n3. In the sulfate ion (SO₄²⁻): x + 4(-2) = -2 ⇒ x = +6.\n4. Hence, the increasing order of oxidation states is: S₂O₃²⁻ (+2) < SO₃²⁻ (+4) < SO₄²⁻ (+6).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3667,
    question: "In acidic medium, how many moles of Hydrogen peroxide (H₂O₂) are required to completely reduce 2 moles of Potassium permanganate (KMnO₄)?",
    option_a: "5 moles",
    option_b: "2.5 moles",
    option_c: "2 moles",
    option_d: "1 mole",
    correct_option: "A",
    explanation: "1. The balanced ionic redox equation in acidic medium is: 2 MnO₄⁻ + 5 H₂O₂ + 6 H⁺ → 2 Mn²⁺ + 5 O₂ + 8 H₂O.\n2. In this reaction:\n   - Mn in MnO₄⁻ is reduced from +7 to +2 (gain of 5 e⁻ per Mn, 10 e⁻ for 2 moles).\n   - O in H₂O₂ is oxidized from -1 to 0 in O₂ (loss of 2 e⁻ per H₂O₂, 10 e⁻ for 5 moles).\n3. Therefore, exactly 5 moles of H₂O₂ are required to reduce 2 moles of KMnO₄.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3668,
    question: "In the reaction:\nCl₂(g) + H₂O(l) → HOCl(aq) + HCl(aq)\nWhat is the role of Chlorine (Cl₂)?",
    option_a: "It is both oxidized and reduced simultaneously (disproportionation)",
    option_b: "It is oxidized only",
    option_c: "It is reduced only",
    option_d: "It acts strictly as a Lewis base",
    correct_option: "A",
    explanation: "1. In elemental chlorine gas (Cl₂), the oxidation state of Chlorine is 0.\n2. In hypochlorous acid (HOCl), the oxidation state of Chlorine is +1 (oxidation: 0 → +1).\n3. In hydrochloric acid (HCl), the oxidation state of Chlorine is -1 (reduction: 0 → -1).\n4. Because the same element in a single oxidation state is simultaneously oxidized and reduced, Chlorine undergoes a disproportionation reaction.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3669,
    question: "In faintly alkaline or neutral solution, Potassium permanganate (KMnO₄) oxidizes Potassium iodide (KI) to Potassium iodate (KIO₃). How many moles of KMnO₄ are reduced by ONE mole of KI?",
    option_a: "2 moles",
    option_b: "1 mole",
    option_c: "3 moles",
    option_d: "5 moles",
    correct_option: "A",
    explanation: "1. In neutral or faintly alkaline medium, permanganate is reduced to manganese dioxide (MnO₂): MnO₄⁻ + 2 H₂O + 3 e⁻ → MnO₂ + 4 OH⁻ (n-factor = 3).\n2. Iodide (I⁻) is oxidized to iodate (IO₃⁻): I⁻ + 6 OH⁻ → IO₃⁻ + 3 H₂O + 6 e⁻ (n-factor = 6).\n3. Balancing electron transfer (6 electrons): 2 MnO₄⁻ + I⁻ + H₂O → 2 MnO₂ + IO₃⁻ + 2 OH⁻.\n4. Hence, 1 mole of KI reduces exactly 2 moles of KMnO₄.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3670,
    question: "How many moles of acidified KMnO₄ are required to completely oxidize 1 mole of Ferrous oxalate (FeC₂O₄)?",
    option_a: "0.6 moles (3/5 mole)",
    option_b: "0.2 moles",
    option_c: "0.4 moles",
    option_d: "1.0 mole",
    correct_option: "A",
    explanation: "1. Ferrous oxalate contains both Fe²⁺ and C₂O₄²⁻ ions:\n   - Fe²⁺ is oxidized to Fe³⁺: Fe²⁺ → Fe³⁺ + e⁻ (1 electron lost)\n   - C₂O₄²⁻ is oxidized to 2 CO₂: C₂O₄²⁻ → 2 CO₂ + 2 e⁻ (2 electrons lost)\n2. Total electrons released per mole of FeC₂O₄: Total n-factor = 1 + 2 = 3 electrons.\n3. In acidic medium, MnO₄⁻ is reduced to Mn²⁺: MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O (5 electrons gained, n-factor = 5).\n4. Equating equivalents: Moles of MnO₄⁻ × 5 = Moles of FeC₂O₄ × 3 ⇒ Moles of MnO₄⁻ = 3/5 = 0.6 moles.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3671,
    question: "When Chlorine gas is passed into a hot, concentrated solution of Potassium hydroxide (KOH), to what oxidation states does Chlorine change from its initial elemental state (0)?",
    option_a: "-1 and +5",
    option_b: "-1 and +1",
    option_c: "-1 and +3",
    option_d: "0 and +7",
    correct_option: "A",
    explanation: "1. In cold, dilute alkali, chlorine disproportionates into chloride (-1) and hypochlorite (+1): Cl₂ + 2 OH⁻ → Cl⁻ + OCl⁻ + H₂O.\n2. In hot, concentrated alkali, hypochlorite decomposes further to chlorate (+5): 3 Cl₂ + 6 OH⁻ → 5 Cl⁻ + ClO₃⁻ + 3 H₂O.\n3. Thus, the oxidation state of Chlorine changes from 0 to -1 (in Cl⁻) and from 0 to +5 (in ClO₃⁻).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3672,
    question: "In which of the following nitrogen-containing species does Nitrogen exhibit its highest oxidation state?",
    option_a: "NO₂",
    option_b: "NH₃",
    option_c: "N₂H₄",
    option_d: "NO",
    correct_option: "A",
    explanation: "Calculating the oxidation states of Nitrogen:\n1. In NH₃: x = -3.\n2. In N₂H₄: x = -2.\n3. In NO: x = +2.\n4. In NO₂: x + 2(-2) = 0 ⇒ x = +4.\nAmong the given options, +4 in NO₂ is the highest oxidation state.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3673,
    question: "Equal molar amounts of the following iron salts are subjected to titration with acidified KMnO₄. Which salt will undergo oxidation and consume permanganate?",
    option_a: "FeSO₄",
    option_b: "Fe₂(SO₄)₃",
    option_c: "FeCl₃",
    option_d: "Fe(NO₃)₃",
    correct_option: "A",
    explanation: "1. In FeSO₄, iron is present in the +2 oxidation state (Ferrous ion, Fe²⁺). Fe²⁺ can be oxidized to Fe³⁺ (losing 1 electron) by the strong oxidizing agent acidified KMnO₄: 5 Fe²⁺ + MnO₄⁻ + 8 H⁺ → 5 Fe³⁺ + Mn²⁺ + 4 H₂O.\n2. In Fe₂(SO₄)₃, FeCl₃, and Fe(NO₃)₃, iron is already in its maximum common stable oxidation state of +3 (Ferric ion, Fe³⁺), and the counter-ions (SO₄²⁻, NO₃⁻) cannot be further oxidized by KMnO₄.\n3. Hence, only FeSO₄ is oxidizable by acidified KMnO₄.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3674,
    question: "Concentrated sulfuric acid (H₂SO₄) can act as an oxidizing agent, a dehydrating agent, or a non-oxidizing acid. In which of the following reactions does H₂SO₄ NOT act as an oxidizing agent?",
    option_a: "NaCl + H₂SO₄ → NaHSO₄ + HCl",
    option_b: "Cu + 2 H₂SO₄ → CuSO₄ + SO₂ + 2 H₂O",
    option_c: "C + 2 H₂SO₄ → CO₂ + 2 SO₂ + 2 H₂O",
    option_d: "2 HBr + H₂SO₄ → Br₂ + SO₂ + 2 H₂O",
    correct_option: "A",
    explanation: "1. In the reaction NaCl + H₂SO₄ → NaHSO₄ + HCl, Na remains +1, H remains +1, Cl remains -1, and S in sulfate remains +6. There is no change in oxidation state for any element. This is a non-redox displacement reaction based on the low volatility of H₂SO₄.\n2. In reactions B, C, and D, Sulfur in H₂SO₄ is reduced from +6 to +4 (in SO₂), acting as an oxidizing agent.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3675,
    question: "Which of the following gases acts as a reducing agent and rapidly decolourizes a pink solution of acidified Potassium permanganate (KMnO₄)?",
    option_a: "SO₂",
    option_b: "CO₂",
    option_c: "N₂",
    option_d: "O₂",
    correct_option: "A",
    explanation: "1. Sulfur dioxide (SO₂) contains Sulfur in the intermediate +4 oxidation state, which is easily oxidized to sulfate (+6): SO₂ + 2 H₂O → SO₄²⁻ + 4 H⁺ + 2 e⁻.\n2. In acidic solution, purple MnO₄⁻ (+7) is reduced by SO₂ to colorless Mn²⁺ (+2): 2 MnO₄⁻ + 5 SO₂ + 2 H₂O → 2 Mn²⁺ + 5 SO₄²⁻ + 4 H⁺.\n3. The discharge of the intense purple color serves as a standard qualitative test for SO₂ gas.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3676,
    question: "For the balanced redox equation in acidic medium:\nx MnO₄⁻ + y C₂O₄²⁻ + z H⁺ → x Mn²⁺ + 2y CO₂ + (z/2) H₂O\nWhat are the respective integer values of x, y, and z?",
    option_a: "x = 2, y = 5, z = 16",
    option_b: "x = 5, y = 2, z = 16",
    option_c: "x = 2, y = 5, z = 8",
    option_d: "x = 1, y = 2, z = 8",
    correct_option: "A",
    explanation: "1. Reduction half-reaction: (MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O) × 2 ⇒ 2 MnO₄⁻ + 16 H⁺ + 10 e⁻ → 2 Mn²⁺ + 8 H₂O.\n2. Oxidation half-reaction: (C₂O₄²⁻ → 2 CO₂ + 2 e⁻) × 5 ⇒ 5 C₂O₄²⁻ → 10 CO₂ + 10 e⁻.\n3. Adding both half-reactions: 2 MnO₄⁻ + 5 C₂O₄²⁻ + 16 H⁺ → 2 Mn²⁺ + 10 CO₂ + 8 H₂O.\n4. Matching coefficients: x = 2, y = 5, z = 16.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3677,
    question: "What is the oxidation number of Chromium in the dichromate dianion (Cr₂O₇²⁻)?",
    option_a: "+6",
    option_b: "+12",
    option_c: "+3",
    option_d: "+7",
    correct_option: "A",
    explanation: "1. In Cr₂O₇²⁻, let the oxidation state of Chromium be x.\n2. Oxygen has an oxidation state of -2.\n3. Sum of oxidation numbers equals net charge (-2): 2(x) + 7(-2) = -2 ⇒ 2x - 14 = -2 ⇒ 2x = +12 ⇒ x = +6.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3678,
    question: "Which of the following chemical reactions represent disproportionation redox processes?\n(I) 2 Cu⁺(aq) → Cu²⁺(aq) + Cu(s)\n(II) 3 ClO⁻(aq) → ClO₃⁻(aq) + 2 Cl⁻(aq)\n(III) CaCO₃(s) → CaO(s) + CO₂(g)",
    option_a: "(I) and (II) only",
    option_b: "(I) and (III) only",
    option_c: "(II) and (III) only",
    option_d: "(I), (II), and (III)",
    correct_option: "A",
    explanation: "1. In reaction (I): Cu⁺ (+1) disproportionates into Cu²⁺ (+2, oxidized) and Cu (0, reduced). This is a disproportionation reaction.\n2. In reaction (II): Cl in ClO⁻ (+1) disproportionates into ClO₃⁻ (+5, oxidized) and Cl⁻ (-1, reduced). This is a disproportionation reaction.\n3. In reaction (III): Ca remains +2, C remains +4, and O remains -2 throughout. This is a non-redox thermal decomposition.\n4. Hence, only (I) and (II) are disproportionation reactions.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3679,
    question: "According to modern electronic theory, oxidation is defined as:",
    option_a: "A chemical process involving the loss of one or more electrons by an atom, ion, or molecule",
    option_b: "A chemical process involving the gain of electrons",
    option_c: "A decrease in the oxidation number of an element",
    option_d: "Addition of electropositive elements",
    correct_option: "A",
    explanation: "1. Under the electronic concept:\n   - Oxidation corresponds to de-electronation, which is the loss of electrons.\n   - It is accompanied by an increase in the oxidation state of the species.\n2. Reduction corresponds to electronation, which is the gain of electrons.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3680,
    question: "According to electronic theory, reduction corresponds to:",
    option_a: "The gain of one or more electrons by a chemical species, accompanied by a decrease in oxidation state",
    option_b: "The loss of electrons, accompanied by an increase in oxidation state",
    option_c: "The removal of electronegative elements only",
    option_d: "The loss of protons from the nucleus",
    correct_option: "A",
    explanation: "1. Reduction is the process in which an atom, molecule, or ion accepts (gains) electrons.\n2. The gain of negatively charged electrons decreases the algebraic oxidation state of the element being reduced.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3681,
    question: "In which of the following chemical reactions does Copper undergo reduction?",
    option_a: "CuO(s) + H₂(g) → Cu(s) + H₂O(l)",
    option_b: "Cu(s) + 2 AgNO₃(aq) → Cu(NO₃)₂(aq) + 2 Ag(s)",
    option_c: "2 Cu(s) + O₂(g) → 2 CuO(s)",
    option_d: "Cu(OH)₂(s) → CuO(s) + H₂O(l)",
    correct_option: "A",
    explanation: "1. In Option (A): In CuO, copper has an oxidation state of +2; in elemental Cu(s), its oxidation state is 0. The oxidation number decreases from +2 to 0 (gain of electrons, reduction).\n2. In Option (B): Cu(s) changes from 0 to +2 in Cu(NO₃)₂ (oxidation).\n3. In Option (C): Cu(s) changes from 0 to +2 in CuO (oxidation).\n4. In Option (D): Cu remains +2 in both Cu(OH)₂ and CuO (non-redox dehydration).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3682,
    question: "In the redox reaction:\n2 MnO₄⁻(aq) + 5 SO₃²⁻(aq) + 6 H⁺(aq) → 2 Mn²⁺(aq) + 5 SO₄²⁻(aq) + 3 H₂O(l)\nWhich species undergoes reduction and which undergoes oxidation?",
    option_a: "MnO₄⁻ is reduced and SO₃²⁻ is oxidized",
    option_b: "MnO₄⁻ is oxidized and SO₃²⁻ is reduced",
    option_c: "H⁺ is reduced and MnO₄⁻ is oxidized",
    option_d: "Both MnO₄⁻ and SO₃²⁻ are oxidized",
    correct_option: "A",
    explanation: "1. Oxidation number of Mn in MnO₄⁻ is +7; it decreases to +2 in Mn²⁺ (gain of electrons, reduction).\n2. Oxidation number of S in SO₃²⁻ is +4; it increases to +6 in SO₄²⁻ (loss of electrons, oxidation).\n3. H⁺ maintains an oxidation state of +1 throughout the reaction.\n4. Therefore, MnO₄⁻ is reduced and SO₃²⁻ is oxidized.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3683,
    question: "When an element is present in a compound in its minimum (lowest possible) oxidation state, it can act:",
    option_a: "Exclusively as a reducing agent",
    option_b: "Exclusively as an oxidizing agent",
    option_c: "As both an oxidizing and reducing agent",
    option_d: "Neither as an oxidant nor as a reductant",
    correct_option: "A",
    explanation: "1. Because the element is already in its lowest permissible oxidation state, it cannot accept any more electrons to reduce its oxidation state further.\n2. It can only lose electrons, thereby increasing its oxidation state (undergoing oxidation).\n3. A chemical species that readily undergoes oxidation acts as a reducing agent (reductant).\n4. Hence, it can act exclusively as a reducing agent.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3684,
    question: "Which of the following compounds can act ONLY as an oxidizing agent and never as a reducing agent?",
    option_a: "HNO₃",
    option_b: "HNO₂",
    option_c: "SO₂",
    option_d: "H₂O₂",
    correct_option: "A",
    explanation: "1. In Nitric acid (HNO₃), Nitrogen has an oxidation state of +5, which is the maximum group valence oxidation state possible for Nitrogen (Group 15).\n2. Since Nitrogen cannot be oxidized beyond +5, it can only decrease its oxidation state (undergo reduction).\n3. A substance that can only be reduced acts exclusively as an oxidizing agent.\n4. In HNO₂ (+3), SO₂ (+4), and H₂O₂ (-1), the central element is in an intermediate oxidation state and can act as both an oxidant and a reductant.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3685,
    question: "Which of the following substances can act as both an oxidizing agent and a reducing agent?",
    option_a: "H₂O₂",
    option_b: "F₂",
    option_c: "KMnO₄",
    option_d: "H₂S",
    correct_option: "A",
    explanation: "1. In Hydrogen peroxide (H₂O₂), Oxygen is in the -1 oxidation state (peroxide).\n2. The possible oxidation states of oxygen range from -2 (as in H₂O) to 0 (as in O₂) and up to +2 (as in OF₂).\n3. In H₂O₂, oxygen can:\n   - Be oxidized to O₂ (oxidation state: -1 → 0, acting as a reducing agent).\n   - Be reduced to H₂O (oxidation state: -1 → -2, acting as an oxidizing agent).\n4. In contrast, F₂ can only be reduced, KMnO₄ (+7) can only be reduced, and H₂S (-2) can only be oxidized.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3686,
    question: "What is the oxidation number of each oxygen atom in an Ozone (O₃) molecule?",
    option_a: "0",
    option_b: "-2",
    option_c: "+2",
    option_d: "-1/2",
    correct_option: "A",
    explanation: "1. Ozone (O₃) is an allotropic elemental form of oxygen consisting exclusively of homonuclear oxygen-oxygen bonds.\n2. By the fundamental rules of assigning oxidation states, any element in its free elemental or homonuclear allotropic form has an oxidation number of zero.\n3. Therefore, the oxidation state of oxygen in O₃ is 0.\nTherefore, Option (A) is the correct answer."
  }
];

async function run() {
  try {
    const token = await login();
    console.log('Logged in successfully, token received.');
    let count = 0;
    for (const item of updates) {
      await updateQuestion(token, item.id, item);
      count++;
      console.log(`[SUCCESS] Updated question ${item.id} (${count}/${updates.length})`);
    }
    console.log(`Set 24 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
