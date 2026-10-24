const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function post(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function put(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    };

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'PUT',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const test113Part1Questions = [
  {
    id: 4804,
    similarQuestion: {
      question: "What is the correct IUPAC name of the compound 4-methylcyclohex-2-enecarboxylic acid?",
      option_a: "4-Methylcyclohex-2-ene-1-carboxylic acid",
      option_b: "5-Methylcyclohex-1-enecarboxylic acid",
      option_c: "4-Methylcyclohex-1-enecarboxylic acid",
      option_d: "2-Methylcyclohex-4-enecarboxylic acid",
      correct_option: "A",
      explanation: "1. In alicyclic carboxylic acids, the ring carbon attached to the –COOH group is designated as C1.\n2. Numbering around the ring is chosen to give the double bond the lower locants: C2=C3.\n3. Continuing along the ring places the methyl substituent at C4.\n4. Therefore, the systematic IUPAC name is 4-methylcyclohex-2-enecarboxylic acid (or 4-methylcyclohex-2-ene-1-carboxylic acid).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4805,
    similarQuestion: {
      question: "Why is the carbonyl carbon in a carboxylic acid (R–COOH) less electrophilic (less reactive toward nucleophiles) than the carbonyl carbon in an aldehyde (R–CHO)?",
      option_a: "Resonance donation of lone pair electrons from the hydroxyl oxygen into the carbonyl group reduces the positive charge on the carbonyl carbon.",
      option_b: "The hydroxyl group exerts a strong electron-withdrawing inductive effect.",
      option_c: "The carbonyl bond in carboxylic acids has greater double bond character than in aldehydes.",
      option_d: "Carboxylic acids are completely ionized in organic solvents.",
      correct_option: "A",
      explanation: "1. In carboxylic acids, the lone pair on the –OH oxygen atom is delocalized into the carbonyl π system through resonance:\n   R–C(=O)–OH ⇌ R–C(–O⁻)=O⁺H\n2. This resonance delocalization substantially decreases the partial positive charge (electrophilicity) on the carbonyl carbon atom.\n3. In aldehydes, no such lone pair electron donation occurs, leaving the carbonyl carbon with a stronger positive charge and higher electrophilicity toward nucleophilic addition.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4806,
    similarQuestion: {
      question: "When cyclopentylmagnesium bromide is treated with dry ice (solid CO₂) in dry ether followed by acidic hydrolysis, the product formed is:",
      option_a: "Cyclopentanecarboxylic acid",
      option_b: "Cyclopentanone",
      option_c: "Cyclopentylmethanol",
      option_d: "Cyclopentanecarbaldehyde",
      correct_option: "A",
      explanation: "1. The Grignard reagent acts as a carbon nucleophile:\n   c-C₅H₉–MgBr + O=C=O → c-C₅H₉–COO⁻MgBr⁺\n2. Acidic hydrolysis of the halomagnesium carboxylate intermediate protonates the carboxylate:\n   c-C₅H₉–COO⁻MgBr⁺ + H₃O⁺ → c-C₅H₉–COOH + Mg²⁺ + Br⁻ + H₂O\n3. The resulting product is cyclopentanecarboxylic acid.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4807,
    similarQuestion: {
      question: "Saponification of methyl benzoate with aqueous sodium hydroxide yields:",
      option_a: "Sodium benzoate and Methanol",
      option_b: "Benzoic acid and Methanol",
      option_c: "Sodium methoxide and Benzoic acid",
      option_d: "Benzyl alcohol and Sodium formate",
      correct_option: "A",
      explanation: "1. Saponification is the base-catalyzed hydrolysis of an ester:\n   C₆H₅COOCH₃ + NaOH → C₆H₅COONa + CH₃OH\n2. Nucleophilic acyl substitution by OH⁻ on the ester carbonyl followed by irreversible proton transfer yields the carboxylate salt (sodium benzoate) and an alcohol (methanol).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4808,
    similarQuestion: {
      question: "Vigorous oxidation of 1,4-dimethylbenzene (p-xylene) with alkaline KMnO₄ followed by acidification produces:",
      option_a: "Terephthalic acid (Benzene-1,4-dicarboxylic acid)",
      option_b: "Phthalic acid (Benzene-1,2-dicarboxylic acid)",
      option_c: "Benzoic acid",
      option_d: "4-Methylbenzoic acid",
      correct_option: "A",
      explanation: "1. Alkyl groups attached to an aromatic ring containing benzylic hydrogen atoms are completely oxidized to carboxylic acid (–COOH) groups by hot alkaline potassium permanganate (KMnO₄).\n2. In p-xylene (1,4-dimethylbenzene), both methyl groups at positions 1 and 4 undergo exhaustive oxidation to –COOH groups.\n3. Acidification yields benzene-1,4-dicarboxylic acid, universally known as terephthalic acid.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4809,
    similarQuestion: {
      question: "Vigorous oxidation of cyclopentene with hot alkaline KMnO₄ followed by acidification yields:",
      option_a: "Glutaric acid (Pentanedioic acid)",
      option_b: "Adipic acid (Hexanedioic acid)",
      option_c: "Succinic acid (Butanedioic acid)",
      option_d: "Cyclopentanone",
      correct_option: "A",
      explanation: "1. Hot alkaline KMnO₄ oxidatively cleaves carbon-carbon double bonds in cycloalkenes.\n2. In cyclopentene, both sp² alkene carbons are attached to hydrogen atoms (=CH–).\n3. Cleavage of the double bond opens the five-membered ring and converts each =CH– into a terminal carboxylic acid group (–COOH).\n4. The product has 5 carbon atoms: HOOC–(CH₂)₃–COOH, which is pentanedioic acid (glutaric acid).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4810,
    similarQuestion: {
      question: "What is the correct decreasing order of acidity among the following carboxylic acids?",
      option_a: "Trifluoroacetic acid > Trichloroacetic acid > Chloroacetic acid > Acetic acid",
      option_b: "Acetic acid > Chloroacetic acid > Trichloroacetic acid > Trifluoroacetic acid",
      option_c: "Trichloroacetic acid > Trifluoroacetic acid > Chloroacetic acid > Acetic acid",
      option_d: "Chloroacetic acid > Trichloroacetic acid > Trifluoroacetic acid > Acetic acid",
      correct_option: "A",
      explanation: "1. Carboxylic acid strength increases with the electron-withdrawing inductive (–I) effect of substituents on the α-carbon, which stabilizes the conjugate carboxylate anion.\n2. Fluorine is more electronegative than chlorine (electronegativity: F ≈ 4.0 vs Cl ≈ 3.0), so three fluorine atoms exert the strongest cumulative –I effect (CF₃COOH, pKₐ ≈ 0.23).\n3. Three chlorine atoms exert strong –I effect (CCl₃COOH, pKₐ ≈ 0.65).\n4. Monochloroacetic acid has one chlorine (CH₂ClCOOH, pKₐ ≈ 2.86).\n5. Acetic acid (CH₃COOH, pKₐ ≈ 4.76) has an electron-donating (+I) methyl group and is the least acidic.\n6. Therefore, the acidic order is: CF₃COOH > CCl₃COOH > CH₂ClCOOH > CH₃COOH.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4811,
    similarQuestion: {
      question: "In Fischer esterification of a carboxylic acid with an alcohol, what is the primary role of the concentrated acid catalyst?",
      option_a: "Protonation of the carbonyl oxygen atom, thereby increasing the electrophilicity of the carbonyl carbon toward nucleophilic attack by the alcohol.",
      option_b: "Protonation of the alcohol to make it a better nucleophile.",
      option_c: "Shifting the equilibrium by neutralizing water.",
      option_d: "Increasing the basicity of the carboxylic acid.",
      correct_option: "A",
      explanation: "1. Alcohols are weak, neutral nucleophiles that do not attack the weakly electrophilic carbonyl carbon of unprotonated carboxylic acids at a significant rate.\n2. The mineral acid catalyst (such as conc. H₂SO₄ or dry HCl) protonates the carbonyl oxygen of the carboxylic acid:\n   R–C(=O)–OH + H⁺ ⇌ [R–C(=O⁺H)–OH ↔ R–C⁺(OH)₂]\n3. This protonation dramatically enhances the electrophilic character of the carbonyl carbon, enabling the lone pair of the alcohol to attack smoothly.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4812,
    similarQuestion: {
      question: "When phthalic acid is heated strongly with excess ammonia, the final cyclic organic product obtained is:",
      option_a: "Phthalimide",
      option_b: "Phthalamide",
      option_c: "Phthalic anhydride",
      option_d: "Anthranilic acid",
      correct_option: "A",
      explanation: "1. Phthalic acid (benzene-1,2-dicarboxylic acid) reacts with ammonia to initially form ammonium phthalate.\n2. Moderate heating causes dehydration to yield phthalamide (benzene-1,2-dicarboxamide).\n3. Upon further strong heating (pyrolysis), phthalamide undergoes intramolecular cyclization with the loss of one molecule of ammonia (NH₃) to form the five-membered cyclic imide: phthalimide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4813,
    similarQuestion: {
      question: "In the Hell–Volhard–Zelinsky (HVZ) reaction, carboxylic acids are halogenated at which specific position in the presence of red phosphorus?",
      option_a: "α-Position",
      option_b: "β-Position",
      option_c: "Carbonyl carbon",
      option_d: "Carboxyl oxygen",
      correct_option: "A",
      explanation: "1. Carboxylic acids containing α-hydrogen atoms react with chlorine or bromine in the presence of a catalytic amount of red phosphorus to give α-halocarboxylic acids:\n   R–CH₂–COOH + X₂ --(Red P)--> R–CH(X)–COOH + HX (where X = Cl, Br)\n2. The phosphorus reacts with halogen to form PX₃, which converts the acid into an acid halide that enolizes readily, directing halogenation exclusively to the α-carbon.\n3. This specific reaction is known as the Hell–Volhard–Zelinsky (HVZ) reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4814,
    similarQuestion: {
      question: "Between the carbonyl carbon of propanal and the carboxyl carbon of propanoic acid, which carbon is more electrophilic and why?",
      option_a: "Propanal, because it lacks resonance donation from a hydroxyl group that diminishes positive charge on carbon.",
      option_b: "Propanoic acid, because oxygen is more electronegative than hydrogen.",
      option_c: "Propanoic acid, because it forms intermolecular hydrogen bonds.",
      option_d: "Both have identical electrophilicity.",
      correct_option: "A",
      explanation: "1. In aldehydes like propanal, the carbonyl carbon has a significant partial positive charge (δ⁺) due to polarization of the C=O π bond toward oxygen.\n2. In propanoic acid, although oxygen is electronegative, the adjacent –OH group donates electron density through resonance (+M effect) into the carbonyl carbon:\n   CH₃CH₂–C(=O)–OH ↔ CH₃CH₂–C(–O⁻)=O⁺H\n3. This resonance stabilizes the carbonyl carbon and substantially reduces its electrophilicity.\n4. Hence, aldehydes are more electrophilic and react more readily with nucleophiles than carboxylic acids.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4815,
    similarQuestion: {
      question: "When toluene is heated with alkaline KMnO₄ followed by acidification, it gives compound 'X'. Heating 'X' with ammonia at high temperature produces:",
      option_a: "Benzamide",
      option_b: "Aniline",
      option_c: "Benzonitrile",
      option_d: "Benzylamine",
      correct_option: "A",
      explanation: "1. Oxidation of toluene (C₆H₅CH₃) with alkaline KMnO₄ followed by acidification cleanly oxidizes the methyl side chain to yield benzoic acid (C₆H₅COOH), compound 'X'.\n2. Reaction of benzoic acid with ammonia produces ammonium benzoate (C₆H₅COONH₄).\n3. Subsequent heating results in dehydration, eliminating water to form benzamide (C₆H₅CONH₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4816,
    similarQuestion: {
      question: "Hydrolysis of an alkyl nitrile (R–C≡N) under acidic or basic conditions yields:",
      option_a: "Carboxylic acid (R–COOH)",
      option_b: "Primary amine (R–CH₂NH₂)",
      option_c: "Aldehyde (R–CHO)",
      option_d: "Ketone (R–CO–R)",
      correct_option: "A",
      explanation: "1. Complete hydrolysis of nitriles in the presence of dilute mineral acid (such as HCl or H₂SO₄) or aqueous alkali proceeds through an amide intermediate to yield the corresponding carboxylic acid:\n   R–C≡N + H₂O --(H⁺)--> R–CONH₂ (amide)\n   R–CONH₂ + H₂O --(H⁺, Δ)--> R–COOH + NH₄⁺\n2. Therefore, complete hydrolysis of nitriles is a reliable method for the synthesis of carboxylic acids.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.token;
    console.log('Logged in successfully, token received.');

    for (const q of test113Part1Questions) {
      const res = await put(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${q.id}`,
        JSON.stringify({ similarQuestion: q.similarQuestion }),
        token
      );
      console.log(`Updated Test Question ID ${q.id}: ${res.success ? 'SUCCESS' : JSON.stringify(res)}`);
    }
    console.log('All 13 questions of Test 113 Part 1 updated successfully!');
  } catch (err) {
    console.error('Error updating questions:', err);
  }
}

run();
