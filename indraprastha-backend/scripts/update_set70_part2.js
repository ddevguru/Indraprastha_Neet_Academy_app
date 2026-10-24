const https = require('https');

function login() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      username: 'indraprasthaadmin',
      password: 'indraprastha@123'
    });

    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: '/api/admin/login',
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
          resolve(parsed.token || parsed.jwt);
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

function updateQuestion(id, similarData, token) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      similarQuestion: similarData
    });

    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/practice-questions/${id}`,
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
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Failed with status ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const questions = [
  {
    id: 4408,
    data: {
      question: "Which of the following pairs correctly represents the relative stability of the given oxidation states due to the inert pair effect in heavy p-block elements?\n(i) Sn²⁺ < Pb²⁺\n(ii) Sn⁴⁺ > Pb⁴⁺\n(iii) Bi³⁺ > Bi⁵⁺\n(iv) Tl⁺ < Tl³⁺",
      option_a: "(i), (ii), and (iii) only",
      option_b: "(i) and (iv) only",
      option_c: "(ii) and (iv) only",
      option_d: "(iii) and (iv) only",
      "correct_option": "A",
      explanation: "Step 1: The inert pair effect is the reluctance of the valence s-electrons to participate in chemical bonding due to poor shielding by intervening d and f electrons. It becomes progressively more pronounced down a group among heavier p-block elements.\n\nStep 2: For Group 14 (C, Si, Ge, Sn, Pb):\nDown the group, the +2 oxidation state becomes increasingly stable relative to the +4 oxidation state. Thus, Pb²⁺ is more stable than Sn²⁺ (Sn²⁺ < Pb²⁺, statement i is correct), whereas the +4 state becomes less stable (Sn⁴⁺ > Pb⁴⁺, statement ii is correct; Pb⁴⁺ is a strong oxidizing agent).\n\nStep 3: For Group 15 (N, P, As, Sb, Bi):\nThe +3 oxidation state becomes much more stable than the +5 state down the group. Hence, Bi³⁺ is far more stable than Bi⁵⁺ (Bi³⁺ > Bi⁵⁺, statement iii is correct; Bi⁵⁺ acts as a powerful oxidizing agent).\n\nStep 4: For Group 13 (B, Al, Ga, In, Tl):\nThe +1 oxidation state is more stable than +3 for thallium (Tl⁺ > Tl³⁺), making statement (iv) incorrect.\n\nTherefore, statements (i), (ii), and (iii) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4409,
    data: {
      question: "Which of the following compounds liberates dinitrogen (N₂) gas upon thermal decomposition?",
      option_a: "NH₄NO₂",
      option_b: "NaN₃",
      option_c: "(NH₄)₂Cr₂O₇",
      option_d: "All of the above",
      "correct_option": "D",
      explanation: "Step 1: Analyze the thermal decomposition of ammonium nitrite (NH₄NO₂):\nNH₄NO₂ (s) → N₂ (g) + 2H₂O (l)\nThis is a standard laboratory method to prepare nitrogen gas.\n\nStep 2: Analyze the thermal decomposition of sodium azide (NaN₃):\n2NaN₃ (s) → 2Na (s) + 3N₂ (g)\nThermal decomposition of barium azide or sodium azide produces very pure dinitrogen gas.\n\nStep 3: Analyze the thermal decomposition of ammonium dichromate ((NH₄)₂Cr₂O₇):\n(NH₄)₂Cr₂O₇ (s) → N₂ (g) + Cr₂O₃ (s) + 4H₂O (g)\nThis reaction also releases dinitrogen gas along with green chromic oxide.\n\nStep 4: Since all three compounds undergo thermal decomposition to liberate N₂ gas, all of the options are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4410,
    data: {
      question: "Equimolar amounts of nitric oxide (NO) and nitrogen dioxide (NO₂) react at 243 K to form a blue liquid compound X. When X dissolves in cold water, it produces an acidic solution of Y. What is the geometry of the anion present in the salts of Y?",
      option_a: "Linear",
      option_b: "Bent (V-shaped)",
      option_c: "Trigonal planar",
      option_d: "Tetrahedral",
      "correct_option": "B",
      explanation: "Step 1: Identify compound X:\nAt low temperature (243 K), equimolar amounts of NO and NO₂ condense to form dinitrogen trioxide (N₂O₃), which is an intensely blue liquid/solid:\nNO + NO₂ → N₂O₃\nThus, X is N₂O₃.\n\nStep 2: Identify compound Y:\nDinitrogen trioxide is the anhydride of nitrous acid (HNO₂). Dissolving it in cold water yields nitrous acid:\nN₂O₃ + H₂O → 2HNO₂\nThus, compound Y is nitrous acid (HNO₂).\n\nStep 3: Determine the geometry of the anion of Y:\nThe anion of HNO₂ is the nitrite ion, NO₂⁻.\nIn NO₂⁻, nitrogen is the central atom:\nValence electrons on N = 5 + 1 (from negative charge) = 6 electrons = 3 electron pairs.\nIt forms two σ-bonds with two oxygen atoms and possesses one lone pair.\nSteric number = 2 (bond pairs) + 1 (lone pair) = 3 (sp² hybridization).\nThe electron pair geometry is trigonal planar, but due to one lone pair, the molecular geometry is bent or angular (V-shaped) with a bond angle of approximately 115°.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4411,
    data: {
      question: "In the chemical sequence:\n2NaN₃ (s) —(heat)→ 2Na (s) + 3 Gas Z\nWhat is the identity and purity of Gas Z produced?",
      option_a: "Very pure N₂",
      option_b: "NH₃",
      option_c: "N₂O",
      option_d: "NO₂",
      "correct_option": "A",
      explanation: "Step 1: Thermal decomposition of metal azides (such as sodium azide, NaN₃, or barium azide, Ba(N₃)₂) yields the free alkali or alkaline earth metal and dinitrogen gas:\n2NaN₃ (s) —(heat)→ 2Na (s) + 3N₂ (g)\nBa(N₃)₂ (s) —(heat)→ Ba (s) + 3N₂ (g)\n\nStep 2: This method produces extraordinarily pure dinitrogen because no other volatile oxides, hydrogen compounds, or impurities are generated during the decomposition.\n\nStep 3: Hence, Gas Z is very pure dinitrogen (N₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4412,
    data: {
      question: "Which of the following oxyacids of phosphorus contains a direct phosphorus–phosphorus (P–P) bond without any bridging oxygen atom?",
      option_a: "Pyrophosphoric acid (H₄P₂O₇)",
      option_b: "Hypophosphoric acid (H₄P₂O₆)",
      option_c: "Pyrophosphorous acid (H₄P₂O₅)",
      option_d: "Orthophosphoric acid (H₃PO₄)",
      "correct_option": "B",
      explanation: "Step 1: Analyze the structural connectivity of the given oxyacids of phosphorus:\n\n1. Pyrophosphoric acid (H₄P₂O₇):\nContains two (O=P(OH)₂) units linked by a bridging P–O–P bond. It has no direct P–P bond.\n\n2. Hypophosphoric acid (H₄P₂O₆):\nIts structure is (HO)₂P(=O)–P(=O)(OH)₂.\nHere, the two phosphorus atoms in the +4 oxidation state are directly bonded to each other via a P–P single bond, with four P–OH groups and two P=O bonds. It contains no bridging oxygen (no P–O–P bond).\n\n3. Pyrophosphorous acid (H₄P₂O₅):\nContains a bridging P–O–P bond along with two P–H bonds, having the structure H(HO)P(=O)–O–P(=O)(OH)H. It contains no P–P bond.\n\n4. Orthophosphoric acid (H₃PO₄):\nContains only one phosphorus atom: O=P(OH)₃.\n\nStep 2: Therefore, only hypophosphoric acid (H₄P₂O₆) contains a direct P–P bond.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4413,
    data: {
      question: "Which of the following statements correctly compares the properties of ammonia (NH₃) and phosphine (PH₃)?",
      option_a: "PH₃ is a stronger reducing agent and has a lower boiling point than NH₃",
      option_b: "NH₃ is a stronger reducing agent than PH₃",
      option_c: "PH₃ is more basic than NH₃ in aqueous solution",
      option_d: "NH₃ has a lower critical temperature and lower solubility in water than PH₃",
      "correct_option": "A",
      explanation: "Step 1: Reducing nature:\nThe E–H bond strength decreases down Group 15 due to increasing atomic size (N–H bond enthalpy > P–H bond enthalpy). The weaker P–H bond readily dissociates to release hydrogen, making PH₃ a far stronger reducing agent than NH₃.\n\nStep 2: Boiling point and intermolecular forces:\nNH₃ molecules undergo extensive intermolecular hydrogen bonding due to the high electronegativity and small size of nitrogen. PH₃ does not form hydrogen bonds. Consequently, the boiling point of NH₃ (238.5 K) is significantly higher than that of PH₃ (185.5 K). Therefore, PH₃ has a lower boiling point and a lower critical temperature than NH₃.\n\nStep 3: Basicity:\nIn NH₃, the lone pair resides in an sp³ hybrid orbital with greater directional character and higher electron density, making it a stronger Lewis base than PH₃ (where the lone pair resides in an orbital with predominantly s-character, Drago's rule).\n\nStep 4: Therefore, PH₃ is a stronger reducing agent and has a lower boiling point than NH₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4414,
    data: {
      question: "Which of the following statements regarding dinitrogen tetroxide (N₂O₄) is INCORRECT?",
      option_a: "It exists as a planar molecule in the solid state",
      option_b: "It undergoes self-ionization in liquid state as [NO]⁺[NO₃]⁻ and acts as a non-aqueous solvent",
      option_c: "The N–N bond length in N₂O₄ is significantly shorter than the N–N single bond in hydrazine (N₂H₄)",
      option_d: "It is diamagnetic in nature",
      "correct_option": "C",
      explanation: "Step 1: Structure and planarity:\nN₂O₄ in the gas and solid phase is planar with D₂ₕ symmetry, with both NO₂ units coplanar. Statement (A) is correct.\n\nStep 2: Non-aqueous solvent and self-ionization:\nLiquid N₂O₄ undergoes slight auto-ionization:\nN₂O₄ ⇌ NO⁺ + NO₃⁻ (nitrosonium and nitrate ions)\nThus, it serves as an ionizing non-aqueous solvent. Statement (B) is correct.\n\nStep 3: Magnetic property:\nEach NO₂ radical has one unpaired electron. When two NO₂ units dimerize to form N₂O₄, the unpaired electrons pair up to form a σ-bond. Hence, N₂O₄ has no unpaired electrons and is diamagnetic. Statement (D) is correct.\n\nStep 4: N–N bond length:\nThe N–N bond in N₂O₄ is unusually long (~1.78 Å) due to repulsion between the localized lone pairs and electronegative oxygen atoms on adjacent nitrogens. In contrast, the normal N–N single bond in hydrazine (N₂H₄) is ~1.45 Å. Thus, the N–N bond in N₂O₄ is significantly longer, NOT shorter, than in hydrazine.\nHence, statement (C) is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4415,
    data: {
      question: "Which of the following metal nitrates decomposes on heating to yield nitrogen dioxide (NO₂) along with oxygen and metal oxide/metal?",
      option_a: "NaNO₃",
      option_b: "KNO₃",
      option_c: "Pb(NO₃)₂",
      option_d: "RbNO₃",
      "correct_option": "C",
      explanation: "Step 1: Thermal decomposition of alkali metal nitrates (except Li):\nNitrates of heavy alkali metals (Na, K, Rb, Cs) decompose gently on heating to yield metal nitrites and oxygen gas without forming NO₂:\n2NaNO₃ (s) —(heat)→ 2NaNO₂ (s) + O₂ (g)\n2KNO₃ (s) —(heat)→ 2KNO₂ (s) + O₂ (g)\n\nStep 2: Thermal decomposition of divalent and heavy metal nitrates (and LiNO₃):\nNitrates of metals such as Pb, Cu, and Ag, as well as Li, decompose to give metal oxide (or free metal in case of Ag/Au), brown NO₂ gas, and O₂:\n2Pb(NO₃)₂ (s) —(heat)→ 2PbO (s) + 4NO₂ (g) + O₂ (g)\n\nStep 3: Thus, Pb(NO₃)₂ readily liberates NO₂ on heating.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4416,
    data: {
      question: "Concentrated nitric acid (HNO₃) acts as a powerful oxidizing agent. Which of the following balanced redox reactions of concentrated HNO₃ with non-metals is INCORRECTLY represented?",
      option_a: "P₄ + 20HNO₃ → 4H₃PO₄ + 20NO₂ + 4H₂O",
      option_b: "I₂ + 10HNO₃ → 2HIO₄ + 10NO₂ + 4H₂O",
      option_c: "S₈ + 48HNO₃ → 8H₂SO₄ + 48NO₂ + 16H₂O",
      option_d: "C + 4HNO₃ → CO₂ + 4NO₂ + 2H₂O",
      "correct_option": "B",
      explanation: "Step 1: Oxidation of iodine by concentrated HNO₃:\nConcentrated nitric acid oxidizes iodine (I₂) to iodic acid (HIO₃), in which iodine is in the +5 oxidation state, NOT periodic acid (HIO₄, +7 oxidation state):\nI₂ + 10HNO₃ → 2HIO₃ + 10NO₂ + 4H₂O\nTherefore, the equation in option B showing 2HIO₄ is incorrect.\n\nStep 2: Verification of other reactions:\n- Phosphorus is oxidized to orthophosphoric acid (H₃PO₄): P₄ + 20HNO₃ → 4H₃PO₄ + 20NO₂ + 4H₂O (Correct).\n- Sulfur is oxidized to sulfuric acid (H₂SO₄): S₈ + 48HNO₃ → 8H₂SO₄ + 48NO₂ + 16H₂O (Correct).\n- Carbon is oxidized to carbon dioxide (CO₂): C + 4HNO₃ → CO₂ + 4NO₂ + 2H₂O (Correct).\n\nStep 3: Hence, option (B) is the incorrectly represented reaction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4417,
    data: {
      question: "In the trimeric cyclometaphosphoric acid molecule, (HPO₃)₃, what is the total number of single (σ) and double (π) bonds present?",
      option_a: "12 σ-bonds and 3 π-bonds",
      option_b: "15 σ-bonds and 3 π-bonds",
      option_c: "9 σ-bonds and 3 π-bonds",
      option_d: "18 σ-bonds and 0 π-bonds",
      "correct_option": "B",
      explanation: "Step 1: Formula and structure of cyclotrimetaphosphoric acid (HPO₃)₃:\nIt has a six-membered alternating ring consisting of three phosphorus atoms and three oxygen atoms: (-P-O-P-O-P-O-).\n\nStep 2: Bonding around each of the three phosphorus atoms:\nEach phosphorus atom is bonded to:\n- Two ring bridging oxygen atoms via single bonds: 2 × 3 = 6 (P–O) ring σ-bonds.\n- One exocyclic terminal –OH group via a single bond: 3 (P–O) σ-bonds.\n- Each –OH group has an O–H single bond: 3 (O–H) σ-bonds.\n- One exocyclic terminal double-bonded oxygen: 3 (P=O) bonds. Each double bond consists of 1 σ-bond and 1 π-bond.\n\nStep 3: Count total σ-bonds and π-bonds:\n- Ring P–O σ-bonds = 6\n- Exocyclic P–OH σ-bonds = 3\n- Exocyclic O–H σ-bonds = 3\n- Exocyclic P=O σ-bonds = 3\nTotal σ-bonds = 6 + 3 + 3 + 3 = 15 σ-bonds.\n- Exocyclic P=O π-bonds = 3 π-bonds.\n\nStep 4: Total bonds = 15 σ-bonds and 3 π-bonds.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4418,
    data: {
      question: "Phosphorus pentachloride (PCl₅) reacts with water in two successive stages:\nPCl₅ + H₂O → Compound B + 2HCl\nCompound B + 3H₂O → Compound C + 3HCl\nIdentify compounds B and C, respectively.",
      option_a: "POCl₃ and H₃PO₃",
      option_b: "POCl₃ and H₃PO₄",
      option_c: "PCl₃ and H₃PO₃",
      option_d: "H₃PO₂ and H₃PO₄",
      "correct_option": "B",
      explanation: "Step 1: First stage of hydrolysis:\nPCl₅ reacts with a limited amount of moisture/water to form phosphoryl chloride (phosphorus oxychloride, POCl₃) and hydrochloric acid:\nPCl₅ + H₂O → POCl₃ + 2HCl\nThus, Compound B is POCl₃.\n\nStep 2: Second stage of hydrolysis:\nWith excess water, POCl₃ undergoes complete hydrolysis to form orthophosphoric acid (H₃PO₄) and hydrochloric acid:\nPOCl₃ + 3H₂O → H₃PO₄ + 3HCl\nThus, Compound C is H₃PO₄.\n\nStep 3: Combining both steps gives the overall complete hydrolysis:\nPCl₅ + 4H₂O → H₃PO₄ + 5HCl\n\nStep 4: Therefore, Compound B is POCl₃ and Compound C is H₃PO₄.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4419,
    data: {
      question: "Why is a bottle of liquor ammonia (concentrated aqueous ammonia) always cooled in ice before opening?",
      option_a: "Because it reacts violently with atmospheric oxygen at room temperature",
      option_b: "Because dissolved ammonia gas exerts a very high vapor pressure at room temperature, which could cause a sudden spray",
      option_c: "Because ammonia solidifies at ice temperatures, preventing leakage",
      option_d: "Because cooling neutralizes the pungent odor of ammonia",
      "correct_option": "B",
      explanation: "Step 1: Liquor ammonia is a saturated solution of ammonia gas in water (approximately 35% NH₃ by mass).\n\nStep 2: The dissolution of ammonia in water is an exothermic process:\nNH₃ (g) + H₂O (l) ⇌ NH₄⁺ (aq) + OH⁻ (aq) + Heat\n\nStep 3: According to Henry's law and Le Chatelier's principle, at room temperature, dissolved ammonia gas has a very high vapor pressure inside the sealed bottle. If opened directly, the sudden release of gas causes the liquid to violently splash out and spray, posing severe risks to the eyes and respiratory tract.\n\nStep 4: Cooling the bottle in ice significantly increases the solubility of NH₃ and lowers its vapor pressure, allowing the bottle to be opened safely.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4420,
    data: {
      question: "Consider the following statements regarding the reaction between copper metal and dilute nitric acid (~20% HNO₃):\n(I) The gaseous reduction product formed is nitric oxide (NO).\n(II) Copper is oxidized to cupric ions, giving a blue solution.\n(III) NO is a paramagnetic gas having one unpaired electron in a π* antibonding molecular orbital.\n(IV) NO reacts with atmospheric oxygen to form brown NO₂ gas, which has a linear molecular geometry.\nWhich of the above statements are correct?",
      option_a: "(I), (II), and (III) only",
      option_b: "(I) and (IV) only",
      option_c: "(II) and (IV) only",
      option_d: "(I), (II), (III), and (IV)",
      "correct_option": "A",
      explanation: "Step 1: Reaction between copper and dilute HNO₃:\n3Cu + 8HNO₃ (dilute) → 3Cu(NO₃)₂ + 2NO ↑ + 4H₂O\nCopper is oxidized from 0 to +2 oxidation state (Cu²⁺ ions impart a characteristic blue color). The primary reduction product is nitric oxide (NO). Thus, statements (I) and (II) are correct.\n\nStep 2: Electronic structure of NO:\nNO has 11 valence electrons (odd-electron molecule). According to Molecular Orbital (MO) theory, the configuration is:\nσ(2s)² σ*(2s)² π(2p_x)² = π(2p_y)² σ(2p_z)² π*(2p_x)¹\nThe single unpaired electron resides in the π* antibonding orbital, making NO paramagnetic in the gaseous state. Thus, statement (III) is correct.\n\nStep 3: Formation and geometry of NO₂:\nNO readily oxidizes in air to form nitrogen dioxide:\n2NO + O₂ → 2NO₂\nNO₂ is an angular/bent molecule with an O–N–O bond angle of ~134.3°, NOT linear. Thus, statement (IV) is incorrect.\n\nStep 4: Therefore, only statements (I), (II), and (III) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4421,
    data: {
      question: "Which of the following oxoacids of phosphorus does NOT contain a P–O–P bridging bond?",
      option_a: "Pyrophosphoric acid (H₄P₂O₇)",
      option_b: "Hypophosphoric acid (H₄P₂O₆)",
      option_c: "Pyrophosphorous acid (H₄P₂O₅)",
      option_d: "Cyclotrimetaphosphoric acid ((HPO₃)₃)",
      "correct_option": "B",
      explanation: "Step 1: Analyze the bonding in each acid:\n- Pyrophosphoric acid (H₄P₂O₇): (HO)₂P(=O)–O–P(=O)(OH)₂ contains one P–O–P bridge.\n- Pyrophosphorous acid (H₄P₂O₅): H(HO)P(=O)–O–P(=O)(OH)H contains one P–O–P bridge.\n- Cyclotrimetaphosphoric acid ((HPO₃)₃): Cyclic ring contains three P–O–P bridging bonds.\n- Hypophosphoric acid (H₄P₂O₆): (HO)₂P(=O)–P(=O)(OH)₂ contains a direct P–P bond, with no P–O–P bridge.\n\nStep 2: Therefore, hypophosphoric acid (H₄P₂O₆) does NOT contain a P–O–P bridging bond.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4422,
    data: {
      question: "In the industrial Ostwald process for the manufacture of nitric acid, ammonia is catalytically oxidized to compound A, which is then oxidized by air to compound B, and finally absorbed in water in the presence of oxygen to give nitric acid (C). Identify compounds A, B, and C.",
      option_a: "A = N₂O, B = NO₂, C = HNO₃",
      option_b: "A = NO, B = NO₂, C = HNO₃",
      option_c: "A = NO₂, B = NO, C = HNO₃",
      option_d: "A = N₂O, B = NO, C = HNO₃",
      "correct_option": "B",
      explanation: "Step 1: Primary catalytic oxidation of ammonia (Stage 1):\nAmmonia is oxidized by atmospheric oxygen in the presence of a Pt-Rh gauze catalyst at ~500 K and 9 bar pressure to form nitric oxide (NO):\n4NH₃ (g) + 5O₂ (g) —(Pt/Rh, 500 K)→ 4NO (g) + 6H₂O (g)\nThus, Compound A is nitric oxide (NO).\n\nStep 2: Secondary oxidation to nitrogen dioxide (Stage 2):\nNitric oxide cools and combines with excess oxygen to form nitrogen dioxide (NO₂):\n2NO (g) + O₂ (g) ⇌ 2NO₂ (g)\nThus, Compound B is nitrogen dioxide (NO₂).\n\nStep 3: Absorption in water (Stage 3):\nNitrogen dioxide dissolves in water in the presence of air to yield nitric acid:\n3NO₂ (g) + H₂O (l) → 2HNO₃ (aq) + NO (g)\nor 4NO₂ (g) + 2H₂O (l) + O₂ (g) → 4HNO₃ (aq)\nThus, Compound C is nitric acid (HNO₃).\n\nStep 4: Therefore, A = NO, B = NO₂, and C = HNO₃.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4423,
    data: {
      question: "Phosphine (PH₃) forms phosphonium salts (such as PH₄I) with strong acids like HI with much greater difficulty compared to ammonia (NH₃) forming ammonium salts (NH₄⁺). What is the primary reason for this?",
      option_a: "The phosphorus atom is more electronegative than nitrogen",
      option_b: "The lone pair of electrons on phosphorus resides in an orbital with predominantly s-character and is poorly accessible for protonation",
      option_c: "Phosphine has a higher dipole moment than ammonia",
      option_d: "Phosphorus cannot expand its coordination number beyond 3",
      "correct_option": "B",
      explanation: "Step 1: According to Drago's rule, for hydrides of elements in Period 3 and below with terminal atoms of low electronegativity (like H in PH₃, H₂S), hybridization does not effectively take place.\n\nStep 2: The H–P–H bond angle in PH₃ is ~93.5°, indicating that the P–H bonds are formed almost exclusively by pure 3p orbitals.\n\nStep 3: Consequently, the non-bonding lone pair of electrons on the phosphorus atom resides in a virtually pure 3s orbital. Orbitals with high s-character are held tightly and closer to the nucleus, significantly diminishing their Lewis base donor ability toward H⁺.\n\nStep 4: In contrast, the lone pair on nitrogen in NH₃ resides in a directional sp³ hybrid orbital with 25% s-character, making it much more basic and ready to coordinate with H⁺ to form NH₄⁺.\n\nStep 5: Thus, PH₄⁺ formation is difficult because the lone pair on phosphorus resides in an orbital with high s-character.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4424,
    data: {
      question: "Which of the following chemical reactions yields dinitrogen monoxide (nitrous oxide, N₂O)?",
      option_a: "Reaction of hydroxylamine with nitrous acid (NH₂OH + HNO₂)",
      option_b: "Thermal decomposition of ammonium nitrite (NH₄NO₂)",
      option_c: "Reaction of sodium nitrite with dilute hydrochloric acid",
      option_d: "Thermal decomposition of sodium azide (NaN₃)",
      "correct_option": "A",
      explanation: "Step 1: Analyze reaction between hydroxylamine and nitrous acid:\nNH₂OH + HNO₂ → N₂O + 2H₂O\nThis reaction cleanly produces dinitrogen monoxide (nitrous oxide, N₂O, also known as laughing gas).\n\nStep 2: Analyze other reactions:\n- Thermal decomposition of NH₄NO₂ yields N₂: NH₄NO₂ → N₂ + 2H₂O.\n- Reaction of NaNO₂ with dilute HCl yields HNO₂ which decomposes into NO and NO₂.\n- Thermal decomposition of NaN₃ yields pure N₂: 2NaN₃ → 2Na + 3N₂.\n\nStep 3: Therefore, reaction of hydroxylamine with nitrous acid yields N₂O.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4425,
    data: {
      question: "Linear (non-cyclic) polyphosphoric acids follow the general formula Hₙ₊₂PₙO₃ₙ₊₁. Which of the following represents a linear polyphosphoric acid?",
      option_a: "H₅P₃O₁₀ (Triphosphoric acid)",
      option_b: "H₆P₄O₁₃ (Tetraphosphoric acid)",
      option_c: "H₇P₅O₁₆ (Pentaphosphoric acid)",
      option_d: "All of the above",
      "correct_option": "D",
      explanation: "Step 1: Linear polyphosphoric acids are condensation polymers of orthophosphoric acid formed by corner-sharing of PO₄ tetrahedra via P–O–P linkages without ring closure.\n\nStep 2: Their general homologous formula is Hₙ₊₂PₙO₃ₙ₊₁:\n- For n = 2: H₄P₂O₇ (Pyrophosphoric / Diphosphoric acid)\n- For n = 3: H₅P₃O₁₀ (Triphosphoric acid)\n- For n = 4: H₆P₄O₁₃ (Tetraphosphoric acid)\n- For n = 5: H₇P₅O₁₆ (Pentaphosphoric acid)\n\nStep 3: In contrast, cyclic metaphosphoric acids follow the formula (HPO₃)ₙ or HₙPₙO₃ₙ (e.g., H₃P₃O₉, H₄P₄O₁₂).\n\nStep 4: All of H₅P₃O₁₀, H₆P₄O₁₃, and H₇P₅O₁₆ are linear polyphosphates.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4426,
    data: {
      question: "Consider the following statements regarding group 15 hydrides:\n(1) The melting point order is: NH₃ > SbH₃ > AsH₃ > PH₃\n(2) The boiling point order is: BiH₃ > SbH₃ > NH₃ > AsH₃ > PH₃\n(3) The bond angle order is: NH₃ > PH₃ > AsH₃ > SbH₃\n(4) The reducing character order is: NH₃ > PH₃ > AsH₃ > SbH₃\nWhich of the statements are TRUE?",
      option_a: "(1), (2), and (3) only",
      option_b: "(1) and (4) only",
      option_c: "(2) and (4) only",
      option_d: "(1), (2), (3), and (4)",
      "correct_option": "A",
      explanation: "Step 1: Melting point of Group 15 hydrides:\nNH₃ has an anomalously high melting point due to strong intermolecular hydrogen bonding. As molar mass increases from PH₃ to SbH₃, van der Waals forces increase. The actual observed order is:\nNH₃ (195.2 K) > SbH₃ (185 K) > AsH₃ (156.7 K) > PH₃ (139.5 K).\nStatement (1) is TRUE.\n\nStep 2: Boiling point of Group 15 hydrides:\nVan der Waals forces increase down the group with increasing molecular size and mass, but NH₃ forms hydrogen bonds. The order is:\nBiH₃ > SbH₃ (254 K) > NH₃ (238.5 K) > AsH₃ (210.6 K) > PH₃ (185.5 K).\nStatement (2) is TRUE.\n\nStep 3: Bond angle of Group 15 hydrides:\nAs the central atom size increases and electronegativity decreases, bonding electron pairs are drawn further away from the central atom, decreasing steric/bond-pair repulsions (Drago effect). The bond angles are:\nNH₃ (107.8°) > PH₃ (93.6°) > AsH₃ (91.8°) > SbH₃ (91.3°).\nStatement (3) is TRUE.\n\nStep 4: Reducing character:\nThe E–H bond strength decreases down the group. Hence, reducing character increases down the group: NH₃ < PH₃ < AsH₃ < SbH₃ < BiH₃.\nTherefore, statement (4) is FALSE.\n\nStep 5: Hence, statements (1), (2), and (3) are true.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4427,
    data: {
      question: "An orange crystalline solid X on strong heating decomposes to evolve a colorless, odorless gas Y and a green solid residue Z. When gas Y is heated with magnesium metal, it yields a white solid W. Identify compound W.",
      option_a: "Mg₃N₂",
      option_b: "MgO",
      option_c: "Mg(NO₃)₂",
      option_d: "MgCr₂O₄",
      "correct_option": "A",
      explanation: "Step 1: Identify orange solid X and its decomposition:\nThe orange crystalline solid is ammonium dichromate, (NH₄)₂Cr₂O₇.\nUpon heating, it undergoes an intramolecular redox decomposition:\n(NH₄)₂Cr₂O₇ (s) —(heat)→ N₂ (g) + Cr₂O₃ (s) + 4H₂O (g)\n- Gas Y is dinitrogen (N₂), which is colorless and odorless.\n- Solid Z is chromic oxide (Cr₂O₃), which is green.\n\nStep 2: Reaction of gas Y with magnesium:\nWhen dinitrogen (N₂) gas reacts with red-hot magnesium metal, it forms magnesium nitride (Mg₃N₂), which is a white powder:\n3Mg (s) + N₂ (g) —(heat)→ Mg₃N₂ (s)\n\nStep 3: Thus, compound W is magnesium nitride (Mg₃N₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4428,
    data: {
      question: "Hydrolysis of calcium cyanamide (nitrolim, CaCN₂) or calcium imide (CaNH) produces an alkaline gas B. When gas B is treated with bleaching powder (CaOCl₂), it is oxidized to gas C. Gas C reacts with red-hot magnesium to produce compound D, which on subsequent hydrolysis regenerates gas B. Identify B, C, and D, respectively.",
      option_a: "B = NH₃, C = N₂, D = Mg₃N₂",
      option_b: "B = N₂, C = NH₃, D = MgNH",
      option_c: "B = NH₃, C = NO₂, D = Mg(NO₂)₂",
      option_d: "B = N₂O, C = N₂, D = Mg₃N₂",
      "correct_option": "A",
      explanation: "Step 1: Hydrolysis of calcium imide / cyanamide:\nCaNH + H₂O → Ca(OH)₂ + NH₃ ↑\nor CaCN₂ + 3H₂O → CaCO₃ + 2NH₃ ↑\nThe alkaline gas evolved (B) is ammonia (NH₃).\n\nStep 2: Oxidation with bleaching powder:\nBleaching powder (CaOCl₂) oxidizes ammonia to dinitrogen gas (C):\n2NH₃ + 3CaOCl₂ → 3CaCl₂ + 3H₂O + N₂ ↑\nThus, gas C is dinitrogen (N₂).\n\nStep 3: Reaction with magnesium:\nDinitrogen reacts with magnesium metal at high temperatures to form magnesium nitride (D):\n3Mg + N₂ → Mg₃N₂\n\nStep 4: Hydrolysis of D:\nMagnesium nitride readily hydrolyzes in water to regenerate ammonia gas (B):\nMg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃ ↑\n\nStep 5: Therefore, B = NH₃, C = N₂, and D = Mg₃N₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4429,
    data: {
      question: "Which of the following reaction mixtures does NOT evolve dinitrogen (N₂) gas upon heating?",
      option_a: "(NH₄)₂Cr₂O₇ (s)",
      option_b: "NH₄Cl (aq) + NaNO₂ (aq)",
      option_c: "2NH₄Cl (s) + Ca(OH)₂ (s)",
      option_d: "Ba(N₃)₂ (s)",
      "correct_option": "C",
      explanation: "Step 1: Analyze each reaction:\n- Option A: (NH₄)₂Cr₂O₇ decomposes thermally to give N₂: (NH₄)₂Cr₂O₇ → N₂ + Cr₂O₃ + 4H₂O (Evolves N₂).\n- Option B: Reaction of NH₄Cl with NaNO₂ produces ammonium nitrite in situ, which on heating yields N₂: NH₄Cl + NaNO₂ → NaCl + NH₄NO₂ → NaCl + N₂ + 2H₂O (Evolves N₂).\n- Option C: Reaction of an ammonium salt with a strong base like Ca(OH)₂ or CaO undergoes an acid-base proton transfer, liberating ammonia (NH₃) gas, NOT N₂:\n2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃ ↑\n- Option D: Thermal decomposition of barium azide yields pure N₂: Ba(N₃)₂ → Ba + 3N₂ (Evolves N₂).\n\nStep 2: Therefore, 2NH₄Cl + Ca(OH)₂ does NOT produce N₂.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4430,
    data: {
      question: "While nitrogen trichloride (NCl₃) undergoes facile hydrolysis with water, nitrogen trifluoride (NF₃) is completely resistant to hydrolysis even at elevated temperatures. What explains this dramatic difference?",
      option_a: "In NCl₃, chlorine has vacant 3d orbitals to accept a lone pair from the water molecule, whereas in NF₃, neither nitrogen nor fluorine has accessible d-orbitals",
      option_b: "The N–Cl bond is purely ionic, whereas the N–F bond is covalent",
      option_c: "NF₃ is an unstable endothermic compound",
      option_d: "Nitrogen in NF₃ is in a negative oxidation state",
      "correct_option": "A",
      explanation: "Step 1: Mechanism of NCl₃ hydrolysis:\nIn NCl₃, chlorine is less electronegative than nitrogen (or comparable), but crucially, chlorine has vacant, energetically accessible 3d orbitals. The nucleophilic water molecule donates its oxygen lone pair into the vacant 3d orbital of chlorine, initiating an S_N2-type pathway:\nNCl₃ + 3H₂O → NH₃ + 3HOCl\n\nStep 2: Inertness of NF₃ towards hydrolysis:\nIn NF₃, fluorine is the most electronegative element, and both nitrogen and fluorine belong to Period 2. Neither nitrogen nor fluorine possesses accessible vacant d-orbitals. Consequently, water cannot form a coordinate bond / transition state with either atom. Furthermore, the strong N–F bond and low polarity toward nucleophilic attack make NF₃ kinetically and thermodynamically exceptionally stable toward hydrolysis.\n\nStep 3: Therefore, the presence of vacant 3d orbitals on chlorine facilitates the hydrolysis of NCl₃, whereas NF₃ lacks d-orbitals.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4431,
    data: {
      question: "Which of the following statements regarding phosphine (PH₃) is INCORRECT?",
      option_a: "It is prepared by the reaction of white phosphorus with boiling concentrated NaOH in an inert atmosphere",
      option_b: "It reacts with copper sulfate solution to precipitate black copper phosphide (Cu₃P₂)",
      option_c: "Pure phosphine is non-inflammable, but it catches fire spontaneously due to traces of diphosphine (P₂H₄) or phosphorus vapors",
      option_d: "It does not react with Lewis acids such as diborane (B₂H₆)",
      "correct_option": "D",
      explanation: "Step 1: Verification of statement (A):\nWhite phosphorus dissolves in boiling concentrated NaOH under an inert CO₂ atmosphere to produce phosphine and sodium hypophosphite:\nP₄ + 3NaOH + 3H₂O → PH₃ + 3NaH₂PO₂. This is correct.\n\nStep 2: Verification of statement (B):\nPassing PH₃ through aqueous CuSO₄ precipitates black cupric phosphide:\n3CuSO₄ + 2PH₃ → Cu₃P₂ ↓ (black) + 3H₂SO₄. This is correct.\n\nStep 3: Verification of statement (C):\nPure PH₃ is not spontaneously flammable. However, laboratory preparations contain traces of P₂H₄ (diphosphine) or P₄ vapors, which ignite spontaneously in air to produce smoke rings of vortex P₄O₁₀. This is correct.\n\nStep 4: Verification of statement (D):\nPhosphine acts as a Lewis base (coordinating through its phosphorus lone pair) and forms coordination adducts with Lewis acids such as diborane or boron trihalides:\nB₂H₆ + 2PH₃ → 2H₃B·PH₃\nTherefore, the statement that it does not react with Lewis acids such as B₂H₆ is INCORRECT.\n\nStep 5: Hence, statement (D) is the incorrect statement.\nTherefore, Option (D) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 70 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
