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
    id: 1005,
    data: {
      question: "The catalytic hydrogenation of an acyl chloride (acid chloride) to an aldehyde over palladium supported on barium sulfate (Pd/BaSO₄) poisoned with sulfur or quinoline:\nR–COCl + H₂ —(Pd/BaSO₄, quinoline)→ R–CHO + HCl\nis known as:",
      option_a: "Stephen reduction",
      option_b: "Rosenmund reduction",
      option_c: "Clemmensen reduction",
      option_d: "Cannizzaro reaction",
      "correct_option": "B",
      explanation: "Step 1: Reaction details:\nThe Rosenmund reduction is a classical organic method for preparing aldehydes from acyl chlorides.\n\nStep 2: Role of catalyst and poison:\nPalladium on barium sulfate serves as the hydrogenation catalyst. It is deliberately partially deactivated ('poisoned') by adding sulfur, quinoline, or thiourea to suppress the catalytic activity just enough to prevent subsequent over-reduction of the aldehyde product to a primary alcohol.\n\nStep 3: Therefore, this named reaction is the Rosenmund reduction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1006,
    data: {
      question: "When an alkyl or aryl nitrile is reduced with stannous chloride and concentrated hydrochloric acid (SnCl₂ + HCl) in ether, followed by steam hydrolysis of the resulting aldimine hydrochloride intermediate:\nR–C≡N —(1. SnCl₂ + HCl / 2. H₃O⁺)→ R–CHO\nWhat is the name of this reaction?",
      option_a: "Rosenmund reduction",
      option_b: "Stephen reduction",
      option_c: "Etard reaction",
      option_d: "Gattermann-Koch reaction",
      "correct_option": "B",
      explanation: "Step 1: Reaction sequence:\n- Step 1: Reduction of nitrile to imine salt:\nR–C≡N + 2[H] + HCl —(SnCl₂ + HCl)→ R–CH=NH·HCl (aldimine hydrochloride precipitate).\n- Step 2: Hydrolysis of the imine intermediate:\nR–CH=NH·HCl + H₂O —(boiling)→ R–CHO + NH₄Cl\n\nStep 2: Name of the reaction:\nThis method of converting nitriles into aldehydes is named the Stephen reduction (Stephen reaction).\n\nStep 3: Therefore, Option (B) is the correct answer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1007,
    data: {
      question: "Match the aldehyde synthesis reaction in Column-I with its corresponding named reaction in Column-II:\nColumn-I:\n(A) C₆H₆ + CO + HCl —(anhyd. AlCl₃ / CuCl)→ C₆H₅CHO\n(B) C₆H₅CH₃ + CrO₂Cl₂ —(1. CS₂ / 2. H₃O⁺)→ C₆H₅CHO\n(C) C₆H₅COCl + H₂ —(Pd/BaSO₄)→ C₆H₅CHO\n(D) C₆H₅CN + SnCl₂ + HCl —(1. ether / 2. H₃O⁺)→ C₆H₅CHO\nColumn-II:\n(P) Etard reaction\n(Q) Stephen reduction\n(R) Gattermann-Koch reaction\n(S) Rosenmund reduction",
      option_a: "A–R, B–P, C–S, D–Q",
      option_b: "A–P, B–R, C–S, D–Q",
      option_c: "A–R, B–S, C–P, D–Q",
      option_d: "A–S, B–P, C–Q, D–R",
      "correct_option": "A",
      explanation: "Step 1: Match each transformation:\n- (A) Direct formylation of benzene with CO + HCl in the presence of AlCl₃/CuCl is the Gattermann-Koch reaction → (R).\n- (B) Oxidation of methylbenzene (toluene) to benzaldehyde via a brown chromium complex with CrO₂Cl₂ is the Etard reaction → (P).\n- (C) Catalytic hydrogenation of benzoyl chloride to benzaldehyde over Pd/BaSO₄ is the Rosenmund reduction → (S).\n- (D) Reduction of benzonitrile with SnCl₂/HCl followed by hydrolysis is the Stephen reduction → (Q).\n\nStep 2: Correct matching code: A–R, B–P, C–S, D–Q.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1008,
    data: {
      question: "Which of the following carbonyl compounds can undergo self-aldol condensation in the presence of dilute aqueous sodium hydroxide?",
      option_a: "Formaldehyde (HCHO)",
      option_b: "Benzaldehyde (C₆H₅CHO)",
      option_c: "Acetaldehyde (CH₃CHO)",
      option_d: "2,2-Dimethylpropanal ((CH₃)₃CCHO)",
      "correct_option": "C",
      explanation: "Step 1: Structural requirement for aldol condensation:\nTo undergo aldol condensation, an aldehyde or ketone MUST possess at least one enolizable α-hydrogen atom attached to the carbon adjacent to the carbonyl group.\n\nStep 2: Check each compound for α-hydrogens:\n- Formaldehyde (HCHO): No α-carbon, 0 α-hydrogens (undergoes Cannizzaro reaction).\n- Benzaldehyde (C₆H₅CHO): The α-carbon is an aromatic ring carbon bonded to 3 carbons; 0 α-hydrogens (undergoes Cannizzaro reaction).\n- 2,2-Dimethylpropanal ((CH₃)₃CCHO): The α-carbon is quaternary with three methyl groups; 0 α-hydrogens (undergoes Cannizzaro reaction).\n- Acetaldehyde (CH₃CHO): The α-carbon has 3 enolizable α-hydrogens. Base abstracts an α-proton to form an enolate ion that attacks another molecule of acetaldehyde to yield 3-hydroxybutanal (aldol).\n\nStep 3: Therefore, acetaldehyde undergoes aldol condensation.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1009,
    data: {
      question: "The controlled oxidation of toluene to benzaldehyde using chromyl chloride (CrO₂Cl₂) in carbon disulfide or carbon tetrachloride, followed by aqueous hydrolysis, is known as the:",
      option_a: "Etard reaction",
      option_b: "Reimer-Tiemann reaction",
      option_c: "Wurtz-Fittig reaction",
      option_d: "Cannizzaro reaction",
      "correct_option": "A",
      explanation: "Step 1: Reaction details:\nToluene reacts with chromyl chloride (CrO₂Cl₂) in CS₂ or CCl₄ to form a brown insoluble chromium complex:\nC₆H₅CH₃ + 2CrO₂Cl₂ → C₆H₅CH(OCrOHCl₂)₂ (brown complex)\n\nStep 2: Hydrolysis:\nDecomposition of this complex with water yields benzaldehyde:\nC₆H₅CH(OCrOHCl₂)₂ + H₂O → C₆H₅CHO + 2Cr(OH)Cl₂\n\nStep 3: This selective oxidation of an aromatic methyl group to a formyl group is named the Etard reaction.\n\nStep 4: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1010,
    data: {
      question: "An alkene X upon reductive ozonolysis (1. O₃ / 2. Zn, H₂O) produces acetone (propan-2-one) and formaldehyde (methanal) in equimolar amounts. What is the structural formula and IUPAC name of alkene X?",
      option_a: "2-Methylprop-1-ene (isobutene, (CH₃)₂C=CH₂)",
      option_b: "But-2-ene (CH₃CH=CHCH₃)",
      option_c: "But-1-ene (CH₃CH₂CH=CH₂)",
      option_d: "2-Methylbut-2-ene ((CH₃)₂C=CHCH₃)",
      "correct_option": "A",
      explanation: "Step 1: Reconstruct the alkene from ozonolysis fragments:\nIn reductive ozonolysis, the carbon-carbon double bond (C=C) is cleaved, and each carbon atom becomes bonded to an oxygen atom (>C=O).\nFragments produced:\n1. Acetone: (CH₃)₂C=O\n2. Formaldehyde: O=CH₂\n\nStep 2: Join the carbonyl carbons by a double bond:\n(CH₃)₂C = CH₂\n\nStep 3: Identify the alkene:\nThe alkene is 2-methylprop-1-ene (isobutene).\n\nStep 4: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1011,
    data: {
      question: "The chemical reduction of an aldehyde or ketone to the corresponding hydrocarbon by heating with hydrazine (NH₂NH₂) and potassium hydroxide (KOH) in a high-boiling solvent such as ethylene glycol at 453–473 K is called the:",
      option_a: "Clemmensen reduction",
      option_b: "Wolff-Kishner reduction",
      option_c: "Stephen reduction",
      option_d: "Rosenmund reduction",
      "correct_option": "B",
      explanation: "Step 1: Wolff-Kishner reduction:\n>C=O + NH₂NH₂ —(-H₂O)→ >C=N–NH₂ (hydrazone)\n>C=N–NH₂ —(KOH, ethylene glycol, 453-473 K)→ >CH₂ + N₂ ↑\n\nStep 2: Contrast with Clemmensen reduction:\n- Wolff-Kishner uses basic conditions (NH₂NH₂ / KOH / ethylene glycol), suitable for acid-sensitive substrates.\n- Clemmensen reduction uses strongly acidic conditions (Zn-Hg / conc. HCl), suitable for base-sensitive substrates.\n\nStep 3: Therefore, the reaction is the Wolff-Kishner reduction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1012,
    data: {
      question: "Given below are two statements regarding carbonyl reactivity:\nAssertion (A): Aldehydes are generally more reactive than ketones towards nucleophilic addition reactions.\nReason (R): In ketones, two electron-donating alkyl groups reduce the electrophilic character of the carbonyl carbon (+I effect) and sterically hinder the approach of the incoming nucleophile.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Electronic factor:\nIn aldehydes (R–CHO), there is only one electron-donating alkyl group attached to the carbonyl carbon, leaving the carbonyl carbon with significant partial positive charge (δ+). In ketones (R–CO–R'), two alkyl groups donate electron density via inductive (+I) and hyperconjugative effects, substantially diminishing the electrophilicity of the carbonyl carbon.\n\nStep 2: Steric factor:\nAn aldehyde has one relatively small hydrogen atom attached to the carbonyl carbon, offering minimal spatial hindrance to an attacking nucleophile. A ketone has two bulky alkyl groups that crowd the transition state as the planar sp² carbon changes to tetrahedral sp³.\n\nStep 3: Conclusion:\nBoth electronic and steric effects make aldehydes significantly more reactive than ketones towards nucleophilic attack. Both (A) and (R) are true and (R) correctly explains (A).\n\nStep 4: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1013,
    data: {
      question: "A semicarbazone derivative of an aldehyde or ketone is prepared by reacting the carbonyl compound with semicarbazide. What is the chemical formula of semicarbazide?",
      option_a: "NH₂OH",
      option_b: "NH₂NH₂",
      option_c: "NH₂NHC₆H₅",
      option_d: "NH₂NHCONH₂",
      "correct_option": "D",
      explanation: "Step 1: Formula of semicarbazide:\nSemicarbazide is formulated as NH₂–NH–CO–NH₂.\n\nStep 2: Condensation reaction:\n>C=O + H₂N–NH–CO–NH₂ → >C=N–NH–CO–NH₂ (semicarbazone) + H₂O\n\nStep 3: Note on reactivity of amine groups:\nOnly the terminal hydrazine nitrogen (–NH–NH₂) acts as the nucleophile. The amide nitrogen (–CO–NH₂) is non-nucleophilic because its lone pair is delocalized into the carbonyl group via resonance (cross-conjugation).\n\nStep 4: Therefore, semicarbazide is NH₂NHCONH₂.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1014,
    data: {
      question: "When acetaldehyde is warmed with Fehling's solution (an alkaline solution of cupric tartrate complex), what precipitate is obtained?",
      option_a: "Metallic copper (Cu)",
      option_b: "Black cupric oxide (CuO)",
      option_c: "Red precipitate of cuprous oxide (Cu₂O)",
      option_d: "White copper carbonate",
      "correct_option": "C",
      explanation: "Step 1: Fehling's test reaction:\nAcetaldehyde (ethanal) is readily oxidized by Fehling's solution (alkaline Cu²⁺ complexed with sodium potassium tartrate / Rochelle salt):\nCH₃CHO + 2Cu²⁺ + 5OH⁻ —(heat)→ CH₃COO⁻ + Cu₂O ↓ (red precipitate) + 3H₂O\n\nStep 2: Oxidation states:\n- Acetaldehyde is oxidized to acetate ion.\n- Blue copper(II) ions are reduced to copper(I), which precipitates as insoluble, bright brick-red cuprous oxide (Cu₂O).\n\nStep 3: Therefore, a red precipitate of Cu₂O is obtained.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1015,
    data: {
      question: "What is the characteristic functional nature of the primary addition product obtained in an aldol reaction (before dehydration)?",
      option_a: "A β-hydroxy aldehyde or β-hydroxy ketone",
      option_b: "An α-hydroxy aldehyde or ketone",
      option_c: "An α,β-unsaturated ester",
      option_d: "A β-hydroxy carboxylic acid",
      "correct_option": "A",
      explanation: "Step 1: Aldol addition mechanism:\nIn the presence of dilute base (e.g., dilute NaOH), an enolate ion generated by deprotonating the α-carbon attacks the electrophilic carbonyl carbon of a second aldehyde or ketone molecule:\n2 CH₃CHO —(dil. NaOH)→ CH₃–CH(OH)–CH₂–CHO\n\nStep 2: Identification of functional positions:\nThe resulting compound contains both an alcohol (–OH) and a carbonyl group (>C=O). Counting from the carbonyl carbon (C-1):\n- C-2 is the α-carbon.\n- C-3 is the β-carbon, which carries the newly formed hydroxyl group.\n\nStep 3: Hence, the product is a β-hydroxy aldehyde (an 'aldol') or a β-hydroxy ketone (a 'ketol').\n\nStep 4: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1016,
    data: {
      question: "When benzaldehyde is heated with concentrated (50%) aqueous sodium hydroxide solution, it undergoes a self-redox disproportionation known as the Cannizzaro reaction. What are the reaction products?",
      option_a: "Two moles of benzoic acid",
      option_b: "Two moles of benzyl alcohol",
      option_c: "Equimolar amounts of benzyl alcohol and sodium benzoate",
      option_d: "Benzophenone and water",
      "correct_option": "C",
      explanation: "Step 1: Cannizzaro reaction conditions:\nAldehydes that lack any α-hydrogen atoms (e.g., benzaldehyde, C₆H₅CHO) cannot form enolate ions to undergo aldol condensation. In concentrated strong alkali (50% NaOH), they undergo intermolecular hydride transfer (disproportionation).\n\nStep 2: Reaction equation:\n2 C₆H₅CHO + NaOH —(conc., heat)→ C₆H₅CH₂OH (benzyl alcohol) + C₆H₅COONa (sodium benzoate)\n\nStep 3: Redox balance:\n- One molecule of benzaldehyde is reduced to the primary alcohol (benzyl alcohol).\n- The other molecule of benzaldehyde is oxidized to the carboxylic acid salt (sodium benzoate).\n\nStep 4: Therefore, equimolar amounts of benzyl alcohol and sodium benzoate are formed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1017,
    data: {
      question: "Which of the following aromatic carboxylic acids possesses the MAXIMUM acidic strength (lowest pK_a value)?",
      option_a: "o-Nitrobenzoic acid",
      option_b: "m-Nitrobenzoic acid",
      option_c: "p-Nitrobenzoic acid",
      option_d: "Benzoic acid",
      "correct_option": "A",
      explanation: "Step 1: The ortho effect in substituted benzoic acids:\nNearly all ortho-substituted benzoic acids are significantly stronger acids than benzoic acid and their corresponding meta and para isomers, regardless of whether the ortho-substituent is electron-withdrawing or electron-donating. This phenomenon is known as the ortho effect.\n\nStep 2: Origin of the ortho effect:\nThe bulky ortho-substituent forces the carboxyl group (–COOH) out of the plane of the benzene ring. This steric hindrance prevents resonance delocalization of the ring π-electrons into the carbonyl group, allowing the negative charge of the carboxylate anion (–COO⁻) to be fully stabilized by the two equivalent oxygen atoms.\n\nStep 3: Electronic contribution of nitro group:\nIn o-nitrobenzoic acid, in addition to the powerful ortho effect, the –NO₂ group is in close proximity to exert a very strong electron-withdrawing inductive (-I) effect. The pK_a values are:\n- o-Nitrobenzoic acid: pK_a = 2.17 (strongest acid)\n- p-Nitrobenzoic acid: pK_a = 3.44\n- m-Nitrobenzoic acid: pK_a = 3.45\n- Benzoic acid: pK_a = 4.20\n\nStep 4: Therefore, o-nitrobenzoic acid has the maximum acidic strength.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1018,
    data: {
      question: "An organic compound with molecular formula C₃H₆O forms a crystalline phenylhydrazone derivative and gives a positive 2,4-DNP test, but gives a NEGATIVE Tollen's test and negative Fehling's test. The compound is:",
      option_a: "Propanal (CH₃CH₂CHO)",
      option_b: "Allyl alcohol (CH₂=CH–CH₂OH)",
      option_c: "Acetone (propan-2-one, CH₃COCH₃)",
      option_d: "Methyl acetate (CH₃COOCH₃)",
      "correct_option": "C",
      explanation: "Step 1: Formula and unsaturation:\nMolecular formula = C₃H₆O. Degree of unsaturation = 3 + 1 - (6/2) = 1 (one double bond or ring).\n\nStep 2: Reaction with 2,4-DNP and phenylhydrazine:\nFormation of a phenylhydrazone confirms the presence of a carbonyl group (>C=O).\n\nStep 3: Tollen's and Fehling's tests:\n- Aldehydes (such as propanal) reduce Tollen's and Fehling's reagents (positive test).\n- Ketones do NOT reduce Tollen's or Fehling's reagents (negative test).\n\nStep 4: Identification:\nSince the compound is a three-carbon carbonyl compound that fails Tollen's test, it must be the ketone acetone (propan-2-one, CH₃COCH₃).\n\nStep 5: Therefore, Option (C) is the correct answer.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1019,
    data: {
      question: "Trifluoroacetic acid (CF₃COOH, pK_a = 0.23) is a substantially stronger acid than acetic acid (CH₃COOH, pK_a = 4.76). What is the primary reason for this dramatic difference in acidity?",
      option_a: "The three strongly electronegative fluorine atoms exert a powerful electron-withdrawing inductive effect (-I), which stabilizes the conjugate trifluoroacetate base by dispersing the negative charge",
      option_b: "Trifluoroacetic acid forms stronger intramolecular hydrogen bonds than acetic acid",
      option_c: "Fluorine donates electrons into the carbonyl group via resonance (+M effect)",
      option_d: "The C–F bond is weaker than the C–H bond",
      "correct_option": "A",
      explanation: "Step 1: Acid ionization equilibrium:\nR–COOH ⇌ R–COO⁻ + H⁺\nAcidity depends on the thermodynamic stability of the carboxylate conjugate base (R–COO⁻).\n\nStep 2: Inductive effect comparison:\n- In acetic acid (CH₃COOH), the methyl group is electron-donating (+I), which intensifies the negative charge on the carboxylate group, destabilizing it.\n- In trifluoroacetic acid (CF₃COOH), the three fluorine atoms are the most electronegative elements on the periodic table. They exert an extremely strong -I (electron-withdrawing inductive) effect across the C–C bond, pulling electron density away from the carboxylate group and delocalizing the negative charge.\n\nStep 3: This marked charge dispersion stabilizes CF₃COO⁻ relative to undissociated acid, shifting the dissociation equilibrium far to the right (over 30,000 times more acidic than acetic acid).\n\nStep 4: Therefore, Option (A) is the correct explanation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1020,
    data: {
      question: "In the Clemmensen reduction, aldehydes and ketones are reduced to corresponding alkanes by treatment with which reagent combination?",
      option_a: "Lithium aluminium hydride (LiAlH₄) in dry ether",
      option_b: "Sodium borohydride (NaBH₄) in methanol",
      option_c: "Hydrazine and potassium hydroxide in ethylene glycol",
      option_d: "Amalgamated zinc and concentrated hydrochloric acid (Zn-Hg / conc. HCl)",
      "correct_option": "D",
      explanation: "Step 1: Clemmensen reduction:\n>C=O + 4[H] —(Zn-Hg / conc. HCl, reflux)→ >CH₂ + H₂O\nThe carbonyl group (>C=O) of an aldehyde or ketone is cleanly reduced to a methylene group (>CH₂).\n\nStep 2: Reagents involved:\nThe reducing system consists of granulated zinc amalgamated with mercury (Zn-Hg) in the presence of boiling concentrated hydrochloric acid.\n\nStep 3: Other reagents:\n- LiAlH₄ and NaBH₄ reduce carbonyls to alcohols.\n- NH₂NH₂ / KOH is the Wolff-Kishner reduction.\n\nStep 4: Therefore, Zn-Hg / conc. HCl is the Clemmensen reduction reagent.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1021,
    data: {
      question: "In the reaction sequence:\nCH₃–C≡N + CH₃MgBr —(dry ether)→ Intermediate A —(H₃O⁺)→ Final Product B\nWhat is the identity of Final Product B?",
      option_a: "Acetaldehyde (CH₃CHO)",
      option_b: "Acetone (propan-2-one, CH₃COCH₃)",
      option_c: "Acetic acid (CH₃COOH)",
      option_d: "Ethanol (CH₃CH₂OH)",
      "correct_option": "B",
      explanation: "Step 1: Nucleophilic addition of Grignard reagent to nitrile:\nThe carbanionic methyl group of CH₃MgBr attacks the electrophilic carbon of acetonitrile (ethanenitrile), while the MgBr fragment coordinates to nitrogen:\nCH₃–C≡N + CH₃MgBr → (CH₃)₂C=N–MgBr (Intermediate A, magnesium imine complex).\n\nStep 2: Acidic hydrolysis:\nHydrolysis of the imine intermediate with aqueous acid produces a ketone and ammonia:\n(CH₃)₂C=N–MgBr + 2H₂O + HCl → (CH₃)₂C=O + NH₄Cl + Mg(OH)Br\n\nStep 3: The final product is acetone (propan-2-one, CH₃COCH₃).\n\nStep 4: Therefore, Option (B) is the correct answer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1022,
    data: {
      question: "Which of the following carbonyl compounds will FAIL to give a positive iodoform test (no yellow precipitate of CHI₃ with I₂/NaOH)?",
      option_a: "Pentan-2-one (CH₃COCH₂CH₂CH₃)",
      option_b: "Butan-2-one (CH₃COCH₂CH₃)",
      option_c: "Propanone (CH₃COCH₃)",
      option_d: "Pentan-3-one (CH₃CH₂COCH₂CH₃)",
      "correct_option": "D",
      explanation: "Step 1: Structural requirement for positive iodoform test:\nThe compound must contain a methyl carbonyl group, CH₃–C(=O)–, directly attached to carbon or hydrogen (or a CH₃–CH(OH)– group oxidizable to it).\n\nStep 2: Analyze each compound:\n- Pentan-2-one: CH₃–CO–CH₂CH₂CH₃ (contains CH₃–CO– group → positive test).\n- Butan-2-one: CH₃–CO–CH₂CH₃ (contains CH₃–CO– group → positive test).\n- Propanone: CH₃–CO–CH₃ (contains CH₃–CO– group → positive test).\n- Pentan-3-one: CH₃CH₂–CO–CH₂CH₃ (both alkyl groups are ethyl; it lacks a methyl group directly bonded to the carbonyl carbon).\n\nStep 3: Because pentan-3-one has no terminal methyl group on the carbonyl, it gives a negative iodoform test.\n\nStep 4: Therefore, Option (D) is the correct answer.\nTherefore, Option (D) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 75 Part 1 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 75 Part 1 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
