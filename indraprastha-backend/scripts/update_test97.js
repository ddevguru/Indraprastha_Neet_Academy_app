const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function login() {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.token) resolve(parsed.token);
          else reject(new Error('Login failed: ' + body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(loginData);
    req.end();
  });
}

function updateTestQuestion(token, id, similarQuestion) {
  const data = JSON.stringify({ similarQuestion });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/test-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const test97Updates = [
  {
    id: 3649,
    similar: {
      question: "Which of the following reducing agent solutions is/are chemically equivalent to 20 mL of 0.25 N acidic KMnO₄ solution?\n(A) 50 mL of 0.10 M FeSO₄ (oxidized to Fe³⁺)\n(B) 25 mL of 0.10 M SnCl₂ (oxidized to Sn⁴⁺)\n(C) 50 mL of 0.05 M H₂C₂O₄ (oxidized to CO₂)\n(D) 25 mL of 0.10 M H₂O₂ (oxidized to O₂)",
      option_a: "(A) (A) and (B) only",
      option_b: "(B) (B), (C), and (D) only",
      option_c: "(C) (A), (B), (C), and (D)",
      option_d: "(D) (A) and (C) only",
      correct_option: "C",
      explanation: "Step 1: Calculate the milliequivalents of KMnO₄:\nMilliequivalents of KMnO₄ = Volume (mL) × Normality = 20 mL × 0.25 N = 5.0 meq.\nStep 2: Check sample (A): Fe²⁺ → Fe³⁺ + e⁻ (n-factor = 1).\nNormality = 0.10 M × 1 = 0.10 N.\nMilliequivalents = 50 mL × 0.10 N = 5.0 meq. (Equivalent)\nStep 3: Check sample (B): Sn²⁺ → Sn⁴⁺ + 2e⁻ (n-factor = 2).\nNormality = 0.10 M × 2 = 0.20 N.\nMilliequivalents = 25 mL × 0.20 N = 5.0 meq. (Equivalent)\nStep 4: Check sample (C): H₂C₂O₄ → 2CO₂ + 2H⁺ + 2e⁻ (n-factor = 2).\nNormality = 0.05 M × 2 = 0.10 N.\nMilliequivalents = 50 mL × 0.10 N = 5.0 meq. (Equivalent)\nStep 5: Check sample (D): H₂O₂ → O₂ + 2H⁺ + 2e⁻ (n-factor = 2).\nNormality = 0.10 M × 2 = 0.20 N.\nMilliequivalents = 25 mL × 0.20 N = 5.0 meq. (Equivalent)\nStep 6: All four solutions provide exactly 5.0 milliequivalents.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3650,
    similar: {
      question: "One mole of acidified KMnO₄ is used separately for the complete oxidation of FeSO₄, FeC₂O₄, and H₂C₂O₄. Which of the following statements is INCORRECT?",
      option_a: "(A) 5 moles of FeSO₄ can be oxidized.",
      option_b: "(B) 5/3 moles of FeC₂O₄ can be oxidized.",
      option_c: "(C) 2.5 moles of H₂C₂O₄ can be oxidized.",
      option_d: "(D) Exactly 3.0 moles of FeC₂O₄ can be oxidized.",
      correct_option: "D",
      explanation: "Step 1: In acidic medium, MnO₄⁻ is reduced to Mn²⁺ by gaining 5 electrons:\nMnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (n-factor of KMnO₄ = 5).\nThus, 1 mole of KMnO₄ accepts 5 moles of electrons (5 equivalents).\nStep 2: For FeSO₄: Fe²⁺ → Fe³⁺ + e⁻ (n-factor = 1).\nMoles of FeSO₄ oxidized = 5 / 1 = 5 moles. (Statement A is correct)\nStep 3: For FeC₂O₄: Both Fe²⁺ and C₂O₄²⁻ are oxidized:\nFe²⁺ → Fe³⁺ + e⁻ (1 e⁻)\nC₂O₄²⁻ → 2CO₂ + 2e⁻ (2 e⁻)\nTotal electrons released per mole of FeC₂O₄ = 1 + 2 = 3 (n-factor = 3).\nMoles of FeC₂O₄ oxidized = 5 / 3 moles. (Statement B is correct, Statement D is incorrect)\nStep 4: For H₂C₂O₄: C₂O₄²⁻ → 2CO₂ + 2e⁻ (n-factor = 2).\nMoles of H₂C₂O₄ oxidized = 5 / 2 = 2.5 moles. (Statement C is correct)\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3651,
    similar: {
      question: "The concentration of an aqueous oxalic acid solution is 'x' mol/L. Exactly 50 mL of this oxalic acid solution completely reacts with 20 mL of 0.050 M acidified KMnO₄ solution. Assuming complete dissociation of the diprotic acid, what is the pH of this oxalic acid solution?",
      option_a: "(A) 1.00",
      option_b: "(B) 1.30",
      option_c: "(C) 2.00",
      option_d: "(D) 0.70",
      correct_option: "A",
      explanation: "Step 1: Determine the normality and milliequivalents of KMnO₄ in acidic medium:\nn-factor of KMnO₄ = 5.\nNormality of KMnO₄ = 0.050 M × 5 = 0.25 N.\nMilliequivalents of KMnO₄ = 20 mL × 0.25 N = 5.0 meq.\nStep 2: By the law of equivalence:\nMilliequivalents of oxalic acid = Milliequivalents of KMnO₄ = 5.0 meq.\nStep 3: Oxalic acid (H₂C₂O₄) has an n-factor of 2 in redox titrations (H₂C₂O₄ → 2CO₂ + 2H⁺ + 2e⁻):\nNormality of oxalic acid = 2x N.\nMilliequivalents = 50 mL × 2x N = 100x meq.\n100x = 5.0 → x = 5.0 / 100 = 0.050 mol/L.\nStep 4: Oxalic acid is diprotic (H₂C₂O₄ → 2H⁺ + C₂O₄²⁻):\n[H⁺] = 2 × x = 2 × 0.050 M = 0.10 M = 10⁻¹ M.\nStep 5: Calculate pH:\npH = -log[H⁺] = -log(0.10) = 1.00.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3652,
    similar: {
      question: "In black-and-white photography, photographic development involves the reduction of exposed silver bromide (Ag⁺) grains to metallic silver (Ag) using hydroquinone (quinol, C₆H₄(OH)₂), which is converted to p-benzoquinone (C₆H₄O₂). In this process, hydroquinone functions as a:",
      option_a: "(A) Strong Lewis acid",
      option_b: "(B) Reducing agent",
      option_c: "(C) Oxidizing agent",
      option_d: "(D) Complexing agent",
      correct_option: "B",
      explanation: "Step 1: Write the chemical equation for the photographic development reaction:\nC₆H₄(OH)₂ + 2Ag⁺ → C₆H₄O₂ + 2Ag (s) + 2H⁺\nStep 2: Silver ions are reduced from an oxidation state of +1 to 0 (Ag⁺ + e⁻ → Ag).\nStep 3: Hydroquinone (quinol) donates two electrons and undergoes oxidation to p-benzoquinone.\nStep 4: A chemical species that reduces another species by supplying electrons and itself undergoes oxidation is called a reducing agent (reductant).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3653,
    similar: {
      question: "One mole of an equimolar mixture of ferric oxalate, Fe₂(C₂O₄)₃, and ferrous oxalate, FeC₂O₄, requires 'x' moles of KMnO₄ in acidic medium for complete oxidation. The value of 'x' is:",
      option_a: "(A) 0.5 mole",
      option_b: "(B) 0.9 mole",
      option_c: "(C) 1.2 moles",
      option_d: "(D) 1.5 moles",
      correct_option: "B",
      explanation: "Step 1: An equimolar mixture totaling 1 mole contains 0.5 mole of Fe₂(C₂O₄)₃ and 0.5 mole of FeC₂O₄.\nStep 2: For Fe₂(C₂O₄)₃: Iron is already in its maximum +3 oxidation state and cannot be oxidized further. Only the 3 oxalate groups are oxidized:\n3 C₂O₄²⁻ → 6 CO₂ + 6e⁻ (n-factor = 6).\nElectrons required = 0.5 mol × 6 = 3.0 equivalents.\nStep 3: For FeC₂O₄: Both Fe²⁺ and C₂O₄²⁻ undergo oxidation:\nFe²⁺ → Fe³⁺ + e⁻ (1 e⁻)\nC₂O₄²⁻ → 2CO₂ + 2e⁻ (2 e⁻)\nTotal electrons per mole = 1 + 2 = 3 (n-factor = 3).\nElectrons required = 0.5 mol × 3 = 1.5 equivalents.\nStep 4: Total equivalents of electrons needed = 3.0 + 1.5 = 4.5 equivalents.\nStep 5: In acidic medium, 1 mole of KMnO₄ accepts 5 electrons (5 equivalents):\nMoles of KMnO₄ (x) = 4.5 / 5 = 0.90 mole.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3654,
    similar: {
      question: "A solution containing 3.0 × 10⁻³ mole of M²⁺ ions requires 1.8 × 10⁻³ mole of MnO₄⁻ for the complete oxidation of M²⁺ to MO₃⁻. What is the nature of the reaction medium?",
      option_a: "(A) Strongly basic",
      option_b: "(B) Acidic",
      option_c: "(C) Neutral or faintly alkaline",
      option_d: "(D) Non-aqueous",
      correct_option: "B",
      explanation: "Step 1: Calculate the change in oxidation number of metal M:\nIn M²⁺, the oxidation number is +2.\nIn MO₃⁻, the oxidation number is: x + 3(-2) = -1 → x = +5.\nChange in oxidation state per ion of M = 5 - 2 = 3 units (loss of 3 electrons).\nStep 2: Total moles of electrons lost by M²⁺:\nMoles of e⁻ = (3.0 × 10⁻³ mol) × 3 = 9.0 × 10⁻³ mol.\nStep 3: These electrons are captured by 1.8 × 10⁻³ mole of MnO₄⁻:\nChange in oxidation state of Mn per formula unit = (9.0 × 10⁻³) / (1.8 × 10⁻³) = 5 units.\nStep 4: A 5-electron reduction of permanganate corresponds to:\nMn⁺⁷ + 5e⁻ → Mn²⁺\nStep 5: This 5-unit change in oxidation number (MnO₄⁻ → Mn²⁺) occurs exclusively in acidic medium. (In neutral/faintly alkaline medium, change is 3 units to MnO₂, and in strongly basic medium, change is 1 unit to MnO₄²⁻).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3655,
    similar: {
      question: "Which of the following chemical equations represents a TRUE oxidation-reduction (redox) reaction?",
      option_a: "(A) 2 Na[Ag(CN)₂] + Zn → Na₂[Zn(CN)₄] + 2 Ag",
      option_b: "(B) BaO₂ + H₂SO₄ → BaSO₄ + H₂O₂",
      option_c: "(C) CrO₄²⁻ + 2 H⁺ → Cr₂O₇²⁻ + H₂O",
      option_d: "(D) AgNO₃ + NaCl → AgCl + NaNO₃",
      correct_option: "A",
      explanation: "Step 1: Check Option (A): Zinc metal (Zn⁰, oxidation state 0) is oxidized to Zn²⁺ in the complex (oxidation state +2). Silver in [Ag(CN)₂]⁻ (oxidation state +1) is reduced to metallic silver (Ag⁰, oxidation state 0). Since oxidation states change, this is a redox reaction.\nStep 2: Check Option (B): Barium peroxide (Ba²⁺, O₂²⁻) reacts with sulphuric acid to give BaSO₄ and H₂O₂. Oxygen remains in the -1 peroxide state throughout; no change in oxidation state occurs.\nStep 3: Check Option (C): Chromium remains in the +6 state in both chromate (CrO₄²⁻) and dichromate (Cr₂O₇²⁻). This is an acid-base condensation, not redox.\nStep 4: Check Option (D): Double displacement precipitation reaction with no change in any oxidation numbers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3656,
    similar: {
      question: "The atmospheric corrosion (rusting) of iron is represented by the overall reaction: 4 Fe + 3 O₂ → 4 Fe³⁺ + 6 O²⁻. Which of the following statements concerning this reaction is INCORRECT?",
      option_a: "(A) It is an example of an oxidation-reduction reaction.",
      option_b: "(B) Metallic iron is reduced to Fe³⁺.",
      option_c: "(C) Molecular oxygen (O₂) functions as the oxidizing agent.",
      option_d: "(D) Metallic iron (Fe) functions as the reducing agent.",
      correct_option: "B",
      explanation: "Step 1: In the reaction, elemental iron (Fe⁰) loses three electrons per atom to form ferric ions (Fe³⁺): Fe → Fe³⁺ + 3e⁻.\nStep 2: An increase in oxidation number from 0 to +3 is defined as oxidation, NOT reduction. Therefore, metallic iron is oxidized to Fe³⁺, making statement (B) incorrect.\nStep 3: Molecular oxygen (O₂) gains electrons and its oxidation number decreases from 0 to -2, meaning O₂ is reduced and acts as the oxidizing agent. (Statements A, C, and D are correct)\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4446,
    similar: {
      question: "Which of the following alkali and alkaline earth metals is the STRONGEST reducing agent in the gaseous/dry state due to having the lowest first ionization enthalpy?",
      option_a: "(A) Potassium (K)",
      option_b: "(B) Magnesium (Mg)",
      option_c: "(C) Aluminium (Al)",
      option_d: "(D) Barium (Ba)",
      correct_option: "A",
      explanation: "Step 1: Reducing ability refers to the ease with which an element loses valence electrons to form cations.\nStep 2: Potassium (K) is an alkali metal with a single valence electron (4s¹) far removed from the nucleus, giving it a very low ionization enthalpy (419 kJ/mol).\nStep 3: Magnesium (Mg), Aluminium (Al), and Barium (Ba) have significantly higher effective nuclear charges and ionization enthalpies compared to potassium.\nStep 4: Consequently, potassium readily loses its valence electron, making it the strongest reducing agent among the given elements.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4447,
    similar: {
      question: "Which of the following chemical reactions is NOT an oxidation-reduction (redox) reaction?",
      option_a: "(A) Thermal decomposition of limestone: CaCO₃ (s) → CaO (s) + CO₂ (g)",
      option_b: "(B) Combustion of hydrogen: 2 H₂ (g) + O₂ (g) → 2 H₂O (l)",
      option_c: "(C) Reaction of sodium with water: 2 Na + 2 H₂O → 2 NaOH + H₂",
      option_d: "(D) Thermal decomposition of manganese trichloride: 2 MnCl₃ → 2 MnCl₂ + Cl₂",
      correct_option: "A",
      explanation: "Step 1: Examine Option (A): In CaCO₃, calcium is +2, carbon is +4, and oxygen is -2. In the products, calcium in CaO is +2, oxygen is -2, and carbon in CO₂ is +4. There is zero change in the oxidation state of any element. Thus, this is a non-redox thermal decomposition.\nStep 2: Option (B) is redox: H (0 to +1), O (0 to -2).\nStep 3: Option (C) is redox: Na (0 to +1), H (+1 to 0).\nStep 4: Option (D) is redox: Mn (+3 to +2), Cl (-1 to 0).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4448,
    similar: {
      question: "In any conjugate redox pair consisting of an oxidant and a reductant (such as Fe³⁺ / Fe²⁺ or MnO₄⁻ / Mn²⁺), the oxidant always possesses:",
      option_a: "(A) A higher oxidation number than the reductant",
      option_b: "(B) A lower oxidation number than the reductant",
      option_c: "(C) The exact same oxidation number as the reductant",
      option_d: "(D) A fractional oxidation state",
      correct_option: "A",
      explanation: "Step 1: A conjugate redox pair is related by the gain or loss of electrons: Oxidant + n e⁻ ⇌ Reductant.\nStep 2: The oxidant (electron acceptor) has a higher oxidation state because it has fewer electrons.\nStep 3: Upon accepting electrons, the oxidant is reduced to the reductant, causing the oxidation number to decrease.\nStep 4: For example, in the Fe³⁺ / Fe²⁺ pair, Fe³⁺ is the oxidant (oxidation number +3) and Fe²⁺ is the reductant (oxidation number +2). The oxidant consistently has the higher oxidation number.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4449,
    similar: {
      question: "Which of the following sulfur-containing chemical species CANNOT act as an oxidizing agent under any chemical conditions?",
      option_a: "(A) Concentrated sulfuric acid (H₂SO₄)",
      option_b: "(B) Hydrogen sulfide (H₂S)",
      option_c: "(C) Sulfur dioxide (SO₂)",
      option_d: "(D) Sulfurous acid (H₂SO₃)",
      correct_option: "B",
      explanation: "Step 1: Sulfur belongs to Group 16 with valence electron configuration 3s² 3p⁴. Its possible oxidation states range from a minimum of -2 to a maximum of +6.\nStep 2: To act as an oxidizing agent, a species must be capable of accepting electrons, which causes its oxidation number to decrease.\nStep 3: In hydrogen sulfide (H₂S), sulfur is in its minimum oxidation state of -2. It cannot decrease its oxidation state below -2 (it cannot accept more electrons).\nStep 4: Therefore, H₂S can only lose electrons (act as a reducing agent) and can never function as an oxidizing agent.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4450,
    similar: {
      question: "In which of the following redox half-reactions does a transfer of exactly FIVE electrons per mole of reactant take place?",
      option_a: "(A) MnO₄⁻ (aq) → Mn²⁺ (aq) in acidic medium",
      option_b: "(B) Cr₂O₇²⁻ (aq) → 2 Cr³⁺ (aq) in acidic medium",
      option_c: "(C) MnO₄⁻ (aq) → MnO₂ (s) in neutral medium",
      option_d: "(D) MnO₄⁻ (aq) → MnO₄²⁻ (aq) in strongly basic medium",
      correct_option: "A",
      explanation: "Step 1: In MnO₄⁻, the oxidation state of Mn is +7. In Mn²⁺, the oxidation state is +2.\nStep 2: The balanced reduction half-reaction in acidic medium is:\nMnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O.\nHere, exactly 5 electrons are transferred per mole of MnO₄⁻.\nStep 3: For Cr₂O₇²⁻ → 2 Cr³⁺, 6 electrons are transferred.\nStep 4: For MnO₄⁻ → MnO₂, 3 electrons are transferred.\nStep 5: For MnO₄⁻ → MnO₄²⁻, 1 electron is transferred.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4451,
    similar: {
      question: "In which of the following oxides of nitrogen does the nitrogen atom possess the LOWEST oxidation number?",
      option_a: "(A) Nitric oxide (NO)",
      option_b: "(B) Nitrogen dioxide (NO₂)",
      option_c: "(C) Dinitrogen monoxide / Nitrous oxide (N₂O)",
      option_d: "(D) Dinitrogen pentoxide (N₂O₅)",
      correct_option: "C",
      explanation: "Step 1: Calculate the oxidation state of nitrogen in each oxide:\n- In NO: x + (-2) = 0 → x = +2.\n- In NO₂: x + 2(-2) = 0 → x = +4.\n- In N₂O: 2x + (-2) = 0 → 2x = +2 → x = +1.\n- In N₂O₅: 2x + 5(-2) = 0 → 2x = +10 → x = +5.\nStep 2: Comparing the oxidation numbers: +1 (in N₂O) < +2 (in NO) < +4 (in NO₂) < +5 (in N₂O₅).\nStep 3: Thus, nitrogen has the lowest oxidation number in N₂O (+1).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4452,
    similar: {
      question: "In which of the following compounds does nitrogen exhibit a FRACTIONAL average oxidation number?",
      option_a: "(A) Hydrazine (N₂H₄)",
      option_b: "(B) Ammonium ion (NH₄⁺)",
      option_c: "(C) Hydrazoic acid (HN₃)",
      option_d: "(D) Dinitrogen difluoride (N₂F₂)",
      correct_option: "C",
      explanation: "Step 1: In N₂H₄: 2x + 4(+1) = 0 → 2x = -4 → x = -2 (integer).\nStep 2: In NH₄⁺: x + 4(+1) = +1 → x = -3 (integer).\nStep 3: In HN₃ (hydrazoic acid): (+1) + 3x = 0 → 3x = -1 → x = -1/3 (fractional).\nStep 4: In N₂F₂: 2x + 2(-1) = 0 → 2x = +2 → x = +1 (integer).\nStep 5: Thus, nitrogen exhibits a fractional average oxidation state of -1/3 in HN₃.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4453,
    similar: {
      question: "Which of the following elements can exhibit BOTH positive and negative oxidation states in its various chemical compounds?",
      option_a: "(A) Fluorine (F)",
      option_b: "(B) Iodine (I)",
      option_c: "(C) Sodium (Na)",
      option_d: "(D) Helium (He)",
      correct_option: "B",
      explanation: "Step 1: Fluorine is the most electronegative element in the periodic table; it exhibits only a -1 oxidation state in its chemical compounds (and 0 in F₂).\nStep 2: Sodium is an electropositive alkali metal; it exhibits only a +1 oxidation state in its compounds.\nStep 3: Helium is an inert noble gas with zero oxidation state.\nStep 4: Iodine (I) is a halogen with lower electronegativity than F, O, and Cl. It forms compounds with negative oxidation state (-1 in iodides like KI, HI) as well as positive oxidation states (+1 in ICl, +3 in ICl₃, +5 in IF₅/HIO₃, and +7 in IF₇/HIO₄).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4454,
    similar: {
      question: "When balancing the reduction half-reaction: S₂O₃²⁻ (aq) → 2 S (s) in an acidic aqueous medium, how many electrons must be added and on which side of the equation?",
      option_a: "(A) 4 electrons on the left-hand side",
      option_b: "(B) 2 electrons on the right-hand side",
      option_c: "(C) 2 electrons on the left-hand side",
      option_d: "(D) 4 electrons on the right-hand side",
      correct_option: "A",
      explanation: "Step 1: Balance sulfur atoms: S₂O₃²⁻ → 2 S.\nStep 2: Balance oxygen atoms by adding water to the right side:\nS₂O₃²⁻ → 2 S + 3 H₂O.\nStep 3: Balance hydrogen atoms by adding H⁺ to the left side in acidic medium:\nS₂O₃²⁻ + 6 H⁺ → 2 S + 3 H₂O.\nStep 4: Balance the electrical charge:\nLeft side charge = -2 + 6(+1) = +4.\nRight side charge = 0.\nStep 5: Add 4 electrons to the left-hand side to balance charge:\nS₂O₃²⁻ + 6 H⁺ + 4 e⁻ → 2 S + 3 H₂O.\nTherefore, 4 electrons must be added on the left-hand side.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4455,
    similar: {
      question: "In acidic medium, 100 mL of 0.10 M KMnO₄ solution is capable of completely oxidizing which of the following solutions?",
      option_a: "(A) 100 mL of 0.25 M C₂O₄²⁻ (oxalate ion)",
      option_b: "(B) 100 mL of 0.80 M Fe²⁺",
      option_c: "(C) 100 mL of 0.50 M Sn²⁺",
      option_d: "(D) 100 mL of 0.60 M Cr₂O₇²⁻",
      correct_option: "A",
      explanation: "Step 1: Calculate milliequivalents of KMnO₄ in acidic medium:\nn-factor of KMnO₄ = 5.\nMilliequivalents = 100 mL × (0.10 M × 5) = 100 × 0.50 N = 50 meq.\nStep 2: Calculate milliequivalents of 100 mL of 0.25 M C₂O₄²⁻:\nn-factor of C₂O₄²⁻ = 2 (C₂O₄²⁻ → 2CO₂ + 2e⁻).\nNormality = 0.25 M × 2 = 0.50 N.\nMilliequivalents = 100 mL × 0.50 N = 50 meq.\nStep 3: Because the milliequivalents of oxalate match the milliequivalents of KMnO₄ (50 meq = 50 meq), it is completely oxidized.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4456,
    similar: {
      question: "Among the following compounds of manganese: KMnO₄, K₂MnO₄, MnO₂, and Mn₂O₃, in which compound does manganese exhibit its LOWEST oxidation number?",
      option_a: "(A) KMnO₄",
      option_b: "(B) K₂MnO₄",
      option_c: "(C) MnO₂",
      option_d: "(D) Mn₂O₃",
      correct_option: "D",
      explanation: "Step 1: Calculate the oxidation state of Mn in each compound:\n- In KMnO₄: (+1) + x + 4(-2) = 0 → x = +7.\n- In K₂MnO₄: 2(+1) + x + 4(-2) = 0 → x = +6.\n- In MnO₂: x + 2(-2) = 0 → x = +4.\n- In Mn₂O₃: 2x + 3(-2) = 0 → 2x = +6 → x = +3.\nStep 2: Comparing the oxidation numbers: +3 (Mn₂O₃) < +4 (MnO₂) < +6 (K₂MnO₄) < +7 (KMnO₄).\nStep 3: Therefore, manganese shows its lowest oxidation number (+3) in Mn₂O₃.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4457,
    similar: {
      question: "The standard reduction potentials (E°) of three metals A, B, and C are +0.80 V, -3.05 V, and -1.20 V, respectively. What is the correct order of REDUCING POWER of these metals?",
      option_a: "(A) B > C > A",
      option_b: "(B) A > B > C",
      option_c: "(C) C > B > A",
      option_d: "(D) A > C > B",
      correct_option: "A",
      explanation: "Step 1: The standard reduction electrode potential (E°) measures the tendency of an electrode to gain electrons (undergo reduction).\nStep 2: A more negative standard reduction potential indicates that the oxidized form is difficult to reduce, which means the reduced metallic form has a very high tendency to lose electrons (strong reducing agent).\nStep 3: Therefore, Reducing power ∝ 1 / E° (the more negative E°, the stronger the reducing power).\nStep 4: Given E° values: B (-3.05 V) < C (-1.20 V) < A (+0.80 V).\nStep 5: Hence, the order of reducing power is: B > C > A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4458,
    similar: {
      question: "A chemical substance that causes an increase in the oxidation number of an element in another substance by accepting electrons from it is termed as an:",
      option_a: "(A) Oxidant (Oxidizing agent)",
      option_b: "(B) Reductant (Reducing agent)",
      option_c: "(C) Amphoteric catalyst",
      option_d: "(D) Auto-inhibitor",
      correct_option: "A",
      explanation: "Step 1: Oxidation is defined as an increase in oxidation number due to the loss of electrons.\nStep 2: A reagent that facilitates oxidation by accepting those electrons is an oxidizing agent or oxidant.\nStep 3: In doing so, the oxidant is itself reduced (its own oxidation number decreases).\nStep 4: Therefore, a reagent that increases the oxidation number of an element in a given substrate is called an oxidant.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Test 97 questions (21 questions)...');
    
    for (const item of test97Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateTestQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Test 97 questions updated successfully!');
  } catch (err) {
    console.error('Error in Test 97 update:', err);
  }
}

run();
