const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

function put(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
        'Authorization': `Bearer ${token}`
      }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => {
        try {
          resolve(JSON.parse(b));
        } catch (_) {
          resolve(b);
        }
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

const updates = [
  {
    id: 1614,
    explanation: "1. In SO₃²⁻: Let oxidation state of S be x. x + 3(−2) = −2 ⇒ x = +4.\n2. In S₂O₄²⁻: 2x + 4(−2) = −2 ⇒ 2x = +6 ⇒ x = +3.\n3. In S₂O₆²⁻: 2x + 6(−2) = −2 ⇒ 2x = +10 ⇒ x = +5.\n4. Arranging in increasing order: S₂O₄²⁻ (+3) < SO₃²⁻ (+4) < S₂O₆²⁻ (+5).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The oxidation states of sulphur in the oxoanions SO₄²⁻, SO₃²⁻ and S₂O₃²⁻ follow which of the following orders?",
      option_a: "S₂O₃²⁻ < SO₃²⁻ < SO₄²⁻",
      option_b: "SO₃²⁻ < S₂O₃²⁻ < SO₄²⁻",
      option_c: "SO₄²⁻ < SO₃²⁻ < S₂O₃²⁻",
      option_d: "S₂O₃²⁻ < SO₄²⁻ < SO₃²⁻",
      correct_option: "A",
      explanation: "1. In thiosulphate ion (S₂O₃²⁻): Let the average oxidation state of S be x. 2x + 3(−2) = −2 ⇒ 2x = +4 ⇒ x = +2.\n2. In sulphite ion (SO₃²⁻): x + 3(−2) = −2 ⇒ x = +4.\n3. In sulphate ion (SO₄²⁻): x + 4(−2) = −2 ⇒ x = +6.\n4. Arranging in increasing order: S₂O₃²⁻ (+2) < SO₃²⁻ (+4) < SO₄²⁻ (+6).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1613,
    explanation: "1. In H₂O + Br₂ → HOBr + HBr, the oxidation state of bromine in elemental Br₂ is 0.\n2. In HOBr (hypobromous acid), bromine has an oxidation state of +1 (oxidation: 0 → +1).\n3. In HBr (hydrobromic acid), bromine has an oxidation state of −1 (reduction: 0 → −1).\n4. Since bromine is simultaneously oxidised and reduced, it exhibits disproportionation behaviour.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In the chemical reaction: Cl₂ + 2NaOH(cold, dil.) → NaCl + NaOCl + H₂O, the behaviour of chlorine is best described as:",
      option_a: "Both oxidised and reduced (disproportionation)",
      option_b: "Oxidised only",
      option_c: "Reduced only",
      option_d: "Neither oxidised nor reduced",
      correct_option: "A",
      explanation: "1. In elemental chlorine (Cl₂), the oxidation state of chlorine is 0.\n2. In sodium chloride (NaCl), chlorine has an oxidation state of −1 (reduction: 0 → −1).\n3. In sodium hypochlorite (NaOCl), chlorine has an oxidation state of +1 (oxidation: 0 → +1).\n4. Because the same element undergoes simultaneous oxidation and reduction, this reaction is a classic disproportionation reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1612,
    explanation: "1. In acidic medium, MnO₄⁻ is reduced to Mn²⁺ with an exchange of 5 electrons (n-factor of MnO₄⁻ = 5).\n2. Ferrous oxalate (FeC₂O₄) dissociates into Fe²⁺ and C₂O₄²⁻:\n   Fe²⁺ → Fe³⁺ + e⁻ (1 electron lost)\n   C₂O₄²⁻ → 2CO₂ + 2e⁻ (2 electrons lost)\n   Total electrons lost per mole of FeC₂O₄ = 1 + 2 = 3 electrons (n-factor of FeC₂O₄ = 3).\n3. By equivalence principle: Moles of MnO₄⁻ × 5 = Moles of FeC₂O₄ × 3.\n   Moles of MnO₄⁻ = 3/5 = 0.6 moles.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "How many moles of acidified KMnO₄ are required to completely oxidise one mole of ferrous sulphate (FeSO₄)?",
      option_a: "0.2 moles",
      option_b: "0.4 moles",
      option_c: "0.6 moles",
      option_d: "1.0 mole",
      correct_option: "A",
      explanation: "1. In acidic medium, MnO₄⁻ is reduced to Mn²⁺: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (n-factor of MnO₄⁻ = 5).\n2. Ferrous sulphate (FeSO₄) is oxidised to ferric ion (Fe³⁺): Fe²⁺ → Fe³⁺ + e⁻ (n-factor of FeSO₄ = 1).\n3. Equating gram equivalents: Equivalents of KMnO₄ = Equivalents of FeSO₄.\n   Moles of KMnO₄ × 5 = Moles of FeSO₄ × 1.\n   Moles of KMnO₄ = 1 / 5 = 0.2 moles.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1611,
    explanation: "1. In PO₄³⁻: x + 4(−2) = −3 ⇒ x = +5.\n2. In SO₄²⁻: x + 4(−2) = −2 ⇒ x = +6.\n3. In Cr₂O₇²⁻: 2x + 7(−2) = −2 ⇒ 2x = +12 ⇒ x = +6.\n4. Therefore, the oxidation numbers are +5, +6, and +6, respectively.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The oxidation states of central atoms in ClO₄⁻, MnO₄⁻ and NO₃⁻ are, respectively:",
      option_a: "+7, +7 and +5",
      option_b: "+5, +7 and +3",
      option_c: "+7, +6 and +5",
      option_d: "+5, +6 and +3",
      correct_option: "A",
      explanation: "1. In perchlorate ion (ClO₄⁻): x + 4(−2) = −1 ⇒ x = +7.\n2. In permanganate ion (MnO₄⁻): x + 4(−2) = −1 ⇒ x = +7.\n3. In nitrate ion (NO₃⁻): x + 3(−2) = −1 ⇒ x = +5.\n4. Therefore, the respective oxidation numbers are +7, +7, and +5.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1610,
    explanation: "1. In KClO₃, the oxidation state of chlorine is +5; during the reaction it reduces to Cl⁻ (−1) or ClO₂ (+4). Change in oxidation number of Cl is up to 6 units (+5 to −1).\n2. Carbon in oxalic acid (H₂C₂O₄) has an oxidation state of +3 and oxidises to CO₂ (+4), change = 1 unit.\n3. Sulphur in H₂SO₄ remains +6 throughout as sulphate.\n4. Hydrogen remains +1 throughout.\n5. Therefore, chlorine undergoes the maximum change in oxidation number.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In the reaction: 2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 5O₂ + 8H₂O, which element undergoes the maximum change in oxidation number?",
      option_a: "Mn",
      option_b: "O",
      option_c: "S",
      option_d: "H",
      correct_option: "A",
      explanation: "1. In KMnO₄, manganese has an oxidation state of +7; in MnSO₄, it has an oxidation state of +2. Change in oxidation number of Mn = |+2 − (+7)| = 5 units.\n2. In H₂O₂, oxygen has an oxidation state of −1 (peroxide); in molecular O₂, it is 0. Change = |0 − (−1)| = 1 unit.\n3. Sulphur remains in the +6 state throughout as sulphate (SO₄²⁻), and hydrogen remains +1.\n4. Thus, manganese undergoes the maximum change in oxidation number (5 units).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1609,
    explanation: "1. When Cl₂ gas reacts with hot and concentrated NaOH, the balanced reaction is: 3Cl₂ + 6NaOH(hot, conc.) → 5NaCl + NaClO₃ + 3H₂O.\n2. Oxidation state of Cl in Cl₂ = 0.\n3. Oxidation state of Cl in NaCl = −1 (reduction: 0 → −1).\n4. Oxidation state of Cl in NaClO₃ = +5 (oxidation: 0 → +5).\n5. Thus, the oxidation number changes from zero to −1 and zero to +5.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When chlorine gas reacts with cold and dilute sodium hydroxide solution, the oxidation number of chlorine changes from:",
      option_a: "Zero to −1 and zero to +1",
      option_b: "Zero to −1 and zero to +5",
      option_c: "Zero to +1 and zero to +3",
      option_d: "Zero to −2 and zero to +2",
      correct_option: "A",
      explanation: "1. The reaction of chlorine with cold and dilute NaOH is: Cl₂ + 2NaOH(cold, dil.) → NaCl + NaOCl + H₂O.\n2. In Cl₂, the oxidation state is 0.\n3. In NaCl (chloride), the oxidation state is −1 (reduction: 0 → −1).\n4. In NaOCl (hypochlorite), the oxidation state is +1 (oxidation: 0 → +1).\n5. Hence, chlorine changes from 0 to −1 and 0 to +1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1608,
    explanation: "1. Chromium pentoxide (CrO₅) has a characteristic butterfly structure containing one oxo oxygen (=O) and two peroxo groups (−O−O−).\n2. The oxidation state of the oxo oxygen is −2, while each of the four peroxo oxygens has an oxidation state of −1.\n3. Let the oxidation state of Cr be x: x + 1(−2) + 4(−1) = 0 ⇒ x − 6 = 0 ⇒ x = +6.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Peroxodisulphuric acid (Marshall's acid, H₂S₂O₈) contains one peroxo linkage (−O−O−). The oxidation state of each sulphur atom in H₂S₂O₈ is:",
      option_a: "+6",
      option_b: "+7",
      option_c: "+8",
      option_d: "+5",
      correct_option: "A",
      explanation: "1. The structural formula of Marshall's acid is HO−SO₂−O−O−SO₂−OH.\n2. Out of the 8 oxygen atoms, 2 are part of a peroxo linkage (−O−O−) with oxidation number −1 each.\n3. The remaining 6 oxygen atoms have an oxidation number of −2 each.\n4. Setting up the oxidation state equation: 2(+1) + 2x + 2(−1) + 6(−2) = 0 ⇒ 2 + 2x − 2 − 12 = 0 ⇒ 2x = +12 ⇒ x = +6.\n5. Hence, the oxidation state of sulphur in H₂S₂O₈ is +6.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1607,
    explanation: "1. In reaction (I): H₂O₂ + O₃ → H₂O + 2O₂. Ozone (O₃) is reduced to O₂, while oxygen in H₂O₂ is oxidised from −1 to 0 in O₂. Thus, H₂O₂ acts as a reducing agent.\n2. In reaction (II): H₂O₂ + Ag₂O → 2Ag + H₂O + O₂. Silver is reduced from +1 (in Ag₂O) to metallic Ag (0), while oxygen in H₂O₂ is oxidised from −1 to 0 in O₂. Thus, H₂O₂ acts as a reducing agent here as well.\n3. Therefore, H₂O₂ acts as a reducing agent in both reactions (I) and (II).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Consider the following reactions involving H₂O₂:\n(I) 2Fe²⁺ + H₂O₂ + 2H⁺ → 2Fe³⁺ + 2H₂O\n(II) 2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O\nThe behaviour of H₂O₂ in reactions (I) and (II) is, respectively:",
      option_a: "Oxidising agent in (I) and reducing agent in (II)",
      option_b: "Reducing agent in (I) and oxidising agent in (II)",
      option_c: "Oxidising agent in both (I) and (II)",
      option_d: "Reducing agent in both (I) and (II)",
      correct_option: "A",
      explanation: "1. In reaction (I), Fe²⁺ is oxidised to Fe³⁺, while oxygen in H₂O₂ is reduced from −1 to −2 (in H₂O). Thus, H₂O₂ acts as an oxidising agent.\n2. In reaction (II), Mn⁷⁺ (in MnO₄⁻) is reduced to Mn²⁺, while oxygen in H₂O₂ is oxidised from −1 to 0 (in O₂). Thus, H₂O₂ acts as a reducing agent.\n3. Therefore, H₂O₂ acts as an oxidising agent in (I) and as a reducing agent in (II).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1606,
    explanation: "1. FeCl₃ is an oxidising agent (Fe³⁺), while SnCl₂ is a reducing agent (Sn²⁺); they spontaneously react via: 2FeCl₃ + SnCl₂ → 2FeCl₂ + SnCl₄.\n2. HgCl₂ reacts with SnCl₂ to form Hg₂Cl₂ and then metallic Hg.\n3. FeCl₃ oxidises KI to I₂ (2FeCl₃ + 2KI → 2FeCl₂ + 2KCl + I₂).\n4. In FeCl₂ and SnCl₂, both Fe²⁺ and Sn²⁺ are in their lower stable oxidation states and do not undergo any mutually feasible redox reaction. Thus, they can coexist together.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs of substances cannot coexist together in an aqueous solution because of a spontaneous redox reaction?",
      option_a: "SnCl₂ and FeCl₃",
      option_b: "SnCl₂ and FeCl₂",
      option_c: "FeCl₂ and CuCl₂",
      option_d: "NaCl and KNO₃",
      correct_option: "A",
      explanation: "1. Sn²⁺ (in SnCl₂) is a strong reducing agent that readily oxidises to Sn⁴⁺ (E° for Sn⁴⁺/Sn²⁺ = +0.15 V).\n2. Fe³⁺ (in FeCl₃) is a good oxidising agent that readily reduces to Fe²⁺ (E° for Fe³⁺/Fe²⁺ = +0.77 V).\n3. When mixed together, a spontaneous redox reaction occurs: 2FeCl₃ + SnCl₂ → 2FeCl₂ + SnCl₄.\n4. Therefore, SnCl₂ and FeCl₃ cannot exist together in solution.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1605,
    explanation: "1. In reaction D: CaF₂ + H₂SO₄ → CaSO₄ + 2HF, the oxidation numbers are Ca (+2), F (−1), H (+1), S (+6), and O (−2) on both reactant and product sides.\n2. There is no change in oxidation state of any element; this is a double decomposition reaction due to the lower volatility of H₂SO₄.\n3. In reactions A, B, and C, sulphur in H₂SO₄ is reduced from +6 to +4 (in SO₂), demonstrating oxidising behaviour.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following reactions does NOT represent the oxidising property of concentrated sulphuric acid (H₂SO₄)?",
      option_a: "NaCl + H₂SO₄ → NaHSO₄ + HCl",
      option_b: "C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O",
      option_c: "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
      option_d: "2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O",
      correct_option: "A",
      explanation: "1. In the reaction NaCl + H₂SO₄ → NaHSO₄ + HCl, Na remains +1, H remains +1, Cl remains −1, and S remains +6. There is no change in oxidation number of any element; it is an acid-base double decomposition reaction representing non-volatile acid behaviour.\n2. In options B, C, and D, S is reduced from +6 (in H₂SO₄) to +4 (in SO₂), showing true oxidising action.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1604,
    explanation: "1. Reduction half-reaction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (multiply by 2 to give 10e⁻).\n2. Oxidation half-reaction: C₂O₄²⁻ → 2CO₂ + 2e⁻ (multiply by 5 to give 10e⁻).\n3. Summing both half-reactions:\n   2MnO₄⁻ + 16H⁺ + 10e⁻ + 5C₂O₄²⁻ → 2Mn²⁺ + 8H₂O + 10CO₂ + 10e⁻\n   2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O.\n4. The coefficients for MnO₄⁻, C₂O₄²⁻, and H⁺ are 2, 5, and 16, respectively.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In the balanced redox reaction: aCr₂O₇²⁻ + bFe²⁺ + cH⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O, the stoichiometric coefficients a, b and c are, respectively:",
      option_a: "1, 6 and 14",
      option_b: "2, 6 and 14",
      option_c: "1, 3 and 7",
      option_d: "2, 3 and 14",
      correct_option: "A",
      explanation: "1. Half-reaction for dichromate reduction: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.\n2. Half-reaction for ferrous oxidation: Fe²⁺ → Fe³⁺ + e⁻. Multiplying by 6 gives: 6Fe²⁺ → 6Fe³⁺ + 6e⁻.\n3. Adding both half-reactions: Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O.\n4. Matching coefficients: a = 1, b = 6, c = 14.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1603,
    explanation: "1. In HNO₃: 1 + x + 3(−2) = 0 ⇒ x = +5.\n2. In NO: x + (−2) = 0 ⇒ x = +2.\n3. In N₂: Elemental form, oxidation state = 0.\n4. In NH₄Cl: x + 4(+1) + (−1) = 0 ⇒ x = −3.\n5. Decreasing order: HNO₃ (+5) > NO (+2) > N₂ (0) > NH₄Cl (−3).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the correct arrangement of the following phosphorus species in decreasing order of the oxidation state of phosphorus: H₃PO₄, H₃PO₃, H₃PO₂, PH₃?",
      option_a: "H₃PO₄ > H₃PO₃ > H₃PO₂ > PH₃",
      option_b: "H₃PO₄ > H₃PO₂ > H₃PO₃ > PH₃",
      option_c: "PH₃ > H₃PO₂ > H₃PO₃ > H₃PO₄",
      option_d: "H₃PO₃ > H₃PO₄ > H₃PO₂ > PH₃",
      correct_option: "A",
      explanation: "1. In H₃PO₄ (orthophosphoric acid): 3(+1) + x + 4(−2) = 0 ⇒ x = +5.\n2. In H₃PO₃ (orthophosphorous acid): 3(+1) + x + 3(−2) = 0 ⇒ x = +3.\n3. In H₃PO₂ (hypophosphorous acid): 3(+1) + x + 2(−2) = 0 ⇒ x = +1.\n4. In PH₃ (phosphine): x + 3(+1) = 0 ⇒ x = −3.\n5. Decreasing order: H₃PO₄ (+5) > H₃PO₃ (+3) > H₃PO₂ (+1) > PH₃ (−3).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1602,
    explanation: "1. Reaction (a): 2Cu⁺ → Cu²⁺ + Cu⁰. Cu (+1) is oxidised to +2 and reduced to 0; this is a disproportionation reaction.\n2. Reaction (b): 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O. Mn (+6) is oxidised to +7 (MnO₄⁻) and reduced to +4 (MnO₂); this is a disproportionation reaction.\n3. Reaction (c): 2KMnO₄ → K₂MnO₄ + MnO₂ + O₂. Mn (+7) is reduced to +6 and +4; oxygen is oxidised from −2 to 0. This is an intramolecular redox reaction, not disproportionation.\n4. Reaction (d): 2MnO₄⁻ + 3Mn²⁺ + 2H₂O → 5MnO₂ + 4H⁺ is comproportionation.\nTherefore, (a) and (b) only are disproportionation reactions.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following is a disproportionation reaction?",
      option_a: "4H₃PO₃ → 3H₃PO₄ + PH₃",
      option_b: "CaCO₃ → CaO + CO₂",
      option_c: "2KClO₃ → 2KCl + 3O₂",
      option_d: "Zn + H₂SO₄ → ZnSO₄ + H₂",
      correct_option: "A",
      explanation: "1. In 4H₃PO₃ → 3H₃PO₄ + PH₃:\n- Phosphorus in H₃PO₃ has an oxidation state of +3.\n- In H₃PO₄, phosphorus has an oxidation state of +5 (oxidation: +3 → +5).\n- In PH₃, phosphorus has an oxidation state of −3 (reduction: +3 → −3).\n2. Because the same element in a single oxidation state is simultaneously oxidised and reduced, it is a disproportionation reaction.\n3. In CaCO₃ → CaO + CO₂, oxidation states remain unchanged (non-redox).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1601,
    explanation: "1. In methane (CH₄): Hydrogen is more electropositive than carbon (+1). x + 4(+1) = 0 ⇒ x = −4.\n2. In carbon tetrachloride (CCl₄): Chlorine is more electronegative than carbon (−1). x + 4(−1) = 0 ⇒ x = +4.\n3. Therefore, the change in oxidation number of carbon is from −4 to +4.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In the conversion of ethanol to acetic acid: CH₃CH₂OH → CH₃COOH, what is the change in the oxidation number of the carbonyl carbon?",
      option_a: "−1 to +3",
      option_b: "−2 to +4",
      option_c: "−1 to +1",
      option_d: "0 to +2",
      correct_option: "A",
      explanation: "1. For the carbon bonded to oxygen in ethanol (CH₃−CH₂−OH): The −CH₂OH carbon is bonded to C (0 contribution), two H atoms (−1 each), and one OH group (+1). Sum: x + 2(+1) + 1(−1) = 0 ⇒ x = −1.\n2. For the carboxylic carbon in acetic acid (CH₃−COOH): The −COOH carbon is bonded to C (0 contribution), one =O group (+2), and one −OH group (+1). Sum: x + 1(+2) + 1(+1) = 0 ⇒ x = +3.\n3. Therefore, the oxidation number of that carbon changes from −1 to +3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1600,
    explanation: "1. A decomposition redox reaction involves the breakdown of a single compound into two or more components accompanied by changes in oxidation states.\n2. In 2Pb(NO₃)₂(s) → 2PbO(s) + 4NO₂(g) + O₂(g):\n   - Lead (Pb) remains +2.\n   - Nitrogen is reduced from +5 (in NO₃⁻) to +4 (in NO₂).\n   - Oxygen is oxidised from −2 (in nitrate) to 0 (in O₂).\n3. Because one reactant decomposes and undergoes redox changes, it is a decomposition redox reaction.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following reactions is an example of an intramolecular decomposition redox reaction?",
      option_a: "2KClO₃(s) → 2KCl(s) + 3O₂(g)",
      option_b: "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)",
      option_c: "Cl₂(g) + 2OH⁻(aq) → ClO⁻(aq) + Cl⁻(aq) + H₂O(l)",
      option_d: "2Na(s) + H₂(g) → 2NaH(s)",
      correct_option: "A",
      explanation: "1. In 2KClO₃ → 2KCl + 3O₂, a single compound decomposes upon heating into simpler substances.\n2. Chlorine is reduced from +5 (in KClO₃) to −1 (in KCl), while oxygen is oxidised from −2 (in KClO₃) to 0 (in O₂).\n3. Because both oxidation and reduction take place within the same decomposing molecule, it is an intramolecular decomposition redox reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1599,
    explanation: "1. Half-reaction for Cr: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.\n2. Half-reaction for S: SO₃²⁻ + H₂O → SO₄²⁻ + 2H⁺ + 2e⁻ (multiply by 3 to balance electrons: 3SO₃²⁻ + 3H₂O → 3SO₄²⁻ + 6H⁺ + 6e⁻).\n3. Adding both:\n   Cr₂O₇²⁻ + 3SO₃²⁻ + (14 − 6)H⁺ → 2Cr³⁺ + 3SO₄²⁻ + (7 − 3)H₂O\n   Cr₂O₇²⁻ + 3SO₃²⁻ + 8H⁺ → 2Cr³⁺ + 3SO₄²⁻ + 4H₂O.\n4. Matching coefficients: a = 1, b = 3, c = 8.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In the balanced redox reaction in acidic medium: aMnO₄⁻ + bSO₃²⁻ + cH⁺ → 2Mn²⁺ + 5SO₄²⁻ + 3H₂O, the coefficients a, b and c are, respectively:",
      option_a: "2, 5 and 6",
      option_b: "5, 2 and 6",
      option_c: "2, 5 and 16",
      option_d: "1, 5 and 6",
      correct_option: "A",
      explanation: "1. Reduction half-reaction: 2MnO₄⁻ + 16H⁺ + 10e⁻ → 2Mn²⁺ + 8H₂O.\n2. Oxidation half-reaction: 5SO₃²⁻ + 5H₂O → 5SO₄²⁻ + 10H⁺ + 10e⁻.\n3. Combining both half-reactions cancels 10e⁻ and simplifies H⁺ and H₂O:\n   2MnO₄⁻ + 5SO₃²⁻ + 6H⁺ → 2Mn²⁺ + 5SO₄²⁻ + 3H₂O.\n4. Comparing coefficients: a = 2, b = 5, c = 6.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1598,
    explanation: "1. A redox couple is defined as a pair of species containing the oxidised and reduced forms of the same element that take part in an oxidation or reduction half-reaction.\n2. For instance, in the half-reaction Cu²⁺(aq) + 2e⁻ ⇌ Cu(s), Cu²⁺/Cu represents a redox couple.\n3. Therefore, both the reduced and oxidised forms involve the same chemical element.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs represents a valid redox couple?",
      option_a: "Fe³⁺ / Fe²⁺",
      option_b: "Fe³⁺ / Cu²⁺",
      option_c: "Na⁺ / Cl⁻",
      option_d: "H⁺ / OH⁻",
      correct_option: "A",
      explanation: "1. By definition, a redox couple consists of the oxidised and reduced forms of the same substance/element participating in a half-reaction.\n2. For the half-reaction Fe³⁺ + e⁻ ⇌ Fe²⁺, Fe³⁺ is the oxidised form and Fe²⁺ is the reduced form of the same element (iron), convention written as Fe³⁺/Fe²⁺.\n3. Pairs in B, C, and D involve different chemical elements or acid-base conjugates.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1597,
    explanation: "1. In reaction C: NaCl + AgNO₃ → AgCl + NaNO₃, Na remains +1, Cl remains −1, Ag remains +1, N remains +5, and O remains −2. No atom changes its oxidation state; it is an ionic precipitation reaction (non-redox).\n2. In A: Zn (0 → +2) and Cu (+2 → 0) undergo redox changes.\n3. In B: Cl (+5 → −1) and O (−2 → 0) undergo redox changes.\n4. In D: H (0 → +1) and Cl (0 → −1) undergo redox changes.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following reactions is NOT a redox reaction?",
      option_a: "BaCl₂(aq) + H₂SO₄(aq) → BaSO₄(s) + 2HCl(aq)",
      option_b: "2Na + Cl₂ → 2NaCl",
      option_c: "CuO + H₂ → Cu + H₂O",
      option_d: "2H₂O₂ → 2H₂O + O₂",
      correct_option: "A",
      explanation: "1. In BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl, Ba remains +2, Cl remains −1, H remains +1, S remains +6, and O remains −2 throughout. No atom undergoes any change in oxidation state (it is a double displacement precipitation reaction).\n2. In B, C, and D, changes in oxidation numbers occur (Na from 0 to +1, Cu from +2 to 0, O from −1 to 0 and −2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1596,
    explanation: "1. In the reaction: 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O:\n   - In MnO₄²⁻, Mn is in the +6 oxidation state (A).\n   - In MnO₄⁻, Mn is in the +7 oxidation state (D).\n   - In MnO₂, Mn is in the +4 oxidation state (C).\n2. Therefore, the oxidation states shown are +6, +7, and +4.\n3. The states NOT shown in this reaction are +2 (B) and +3 (E).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In the disproportionation reaction of hypochlorite ion: 3ClO⁻ → ClO₃⁻ + 2Cl⁻, which of the following oxidation states of chlorine is NOT exhibited by any species in the reaction?",
      option_a: "+3",
      option_b: "+1",
      option_c: "−1",
      option_d: "+5",
      correct_option: "A",
      explanation: "1. In ClO⁻ (reactant), chlorine has an oxidation state of +1.\n2. In ClO₃⁻ (product), chlorine has an oxidation state of +5 (x + 3(−2) = −1 ⇒ x = +5).\n3. In Cl⁻ (product), chlorine has an oxidation state of −1.\n4. The oxidation state +3 (characteristic of chlorite, ClO₂⁻) is not shown by any species in this reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1595,
    explanation: "1. In KO₂ (potassium superoxide): Potassium is an alkali metal with oxidation state +1. 1 + 2x = 0 ⇒ 2x = −1 ⇒ x = −1/2.\n2. In H₂S₂O₇ (pyrosulphuric acid / oleum): 2(+1) + 2x + 7(−2) = 0 ⇒ 2 + 2x − 14 = 0 ⇒ 2x = +12 ⇒ x = +6.\n3. In K₂Cr₂O₇ (potassium dichromate): 2(+1) + 2x + 7(−2) = 0 ⇒ 2 + 2x − 14 = 0 ⇒ 2x = +12 ⇒ x = +6.\n4. The respective oxidation states are −1/2, +6, and +6.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The oxidation states of the underlined elements in CsO₂, H₂SO₅ (Caro's acid) and Na₂CrO₄ are, respectively:",
      option_a: "−1/2, +6 and +6",
      option_b: "−1, +6 and +6",
      option_c: "−1/2, +8 and +6",
      option_d: "−2, +6 and +4",
      correct_option: "A",
      explanation: "1. In caesium superoxide (CsO₂): Cs is an alkali metal with oxidation state +1. 1 + 2x = 0 ⇒ 2x = −1 ⇒ x = −1/2.\n2. In Caro's acid (peroxomonosulphuric acid, H₂SO₅): Structure is HO−SO₂(O−OH), containing one peroxo group (−1 each) and three oxo groups (−2 each). 2(+1) + x + 2(−1) + 3(−2) = 0 ⇒ x = +6.\n3. In sodium chromate (Na₂CrO₄): 2(+1) + x + 4(−2) = 0 ⇒ x = +6.\n4. Therefore, the oxidation states are −1/2, +6, and +6.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1594,
    explanation: "1. In XeF₆: x + 6(−1) = 0 ⇒ x = +6.\n2. In XeO₃: x + 3(−2) = 0 ⇒ x = +6.\n3. In XeOF₄: x + 1(−2) + 4(−1) = 0 ⇒ x = +6.\n4. In XeF₄: x + 4(−1) = 0 ⇒ x = +4.\n5. Therefore, the oxidation states follow: XeO₃ (+6) = XeF₆ (+6) = XeOF₄ (+6) > XeF₄ (+4).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The oxidation states of Xe in XeO₂F₂, XeF₄ and XeF₂ follow the order:",
      option_a: "XeO₂F₂ > XeF₄ > XeF₂",
      option_b: "XeF₄ > XeO₂F₂ > XeF₂",
      option_c: "XeF₂ > XeF₄ > XeO₂F₂",
      option_d: "XeO₂F₂ = XeF₄ > XeF₂",
      correct_option: "A",
      explanation: "1. In XeO₂F₂: x + 2(−2) + 2(−1) = 0 ⇒ x − 4 − 2 = 0 ⇒ x = +6.\n2. In XeF₄: x + 4(−1) = 0 ⇒ x = +4.\n3. In XeF₂: x + 2(−1) = 0 ⇒ x = +2.\n4. Therefore, the decreasing order is: XeO₂F₂ (+6) > XeF₄ (+4) > XeF₂ (+2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1593,
    explanation: "1. Oxalic acid (H₂C₂O₄) has an n-factor of 2 in redox titration: C₂O₄²⁻ → 2CO₂ + 2e⁻.\n   Normality of oxalic acid = Molarity × n-factor = 0.25 M × 2 = 0.50 N.\n2. Milliequivalents of oxalic acid = V(mL) × N = 10 mL × 0.50 N = 5.0 meq.\n3. At equivalence point: Milliequivalents of KMnO₄ = Milliequivalents of oxalic acid = 5.0 meq.\n   Normality of KMnO₄ = 5.0 meq / 10 mL = 0.50 N.\n4. In acidic medium, KMnO₄ has an n-factor of 5 (Mn⁷⁺ → Mn²⁺).\n   Molarity of KMnO₄ = Normality / n-factor = 0.50 N / 5 = 0.10 M.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an acidic medium, 20 mL of 0.10 M FeSO₄ solution is completely oxidised by 10 mL of acidified KMnO₄ solution. What is the molarity of the KMnO₄ solution?",
      option_a: "0.04 M",
      option_b: "0.02 M",
      option_c: "0.10 M",
      option_d: "0.05 M",
      correct_option: "A",
      explanation: "1. In acidic medium, Fe²⁺ is oxidised to Fe³⁺ (n-factor of FeSO₄ = 1). Milliequivalents of FeSO₄ = Volume in mL × Molarity × n-factor = 20 × 0.10 × 1 = 2.0 meq.\n2. In acidic medium, MnO₄⁻ is reduced to Mn²⁺ (n-factor of KMnO₄ = 5). Milliequivalents of KMnO₄ = 10 mL × Molarity (M) × 5 = 50 × M.\n3. At the end point: Milliequivalents of KMnO₄ = Milliequivalents of FeSO₄.\n   50 × M = 2.0 ⇒ M = 2.0 / 50 = 0.04 M.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in to live API...');
  const login = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
  if (!login.token) {
    console.error('Login failed:', login);
    return;
  }
  const token = login.token;
  console.log('Login successful! Updating ' + updates.length + ' PYQs in Chapter 58 (Redox Reactions)...');

  let successCount = 0;
  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    console.log(`[${i + 1}/${updates.length}] Updating PYQ ID ${item.id}...`);

    const payload = {};
    if (item.question !== undefined) payload.question = item.question;
    if (item.optionA !== undefined) payload.optionA = item.optionA;
    if (item.optionB !== undefined) payload.optionB = item.optionB;
    if (item.optionC !== undefined) payload.optionC = item.optionC;
    if (item.optionD !== undefined) payload.optionD = item.optionD;
    if (item.correctOption !== undefined) payload.correctOption = item.correctOption;
    if (item.explanation !== undefined) payload.explanation = item.explanation;
    if (item.similarQuestion !== undefined) payload.similarQuestion = item.similarQuestion;

    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, payload, token);
    if (res.success || res.id || res.pyq) {
      console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
      successCount++;
    } else {
      console.error(`  -> Failed to update PYQ ${item.id}:`, res);
    }
  }

  console.log(`\n🎉 COMPLETED: ${successCount}/${updates.length} PYQs in Chapter 58 (Redox Reactions) updated live!`);
}

run().catch(console.error);
