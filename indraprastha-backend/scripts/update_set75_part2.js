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

function updateQuestion(token, id, similarQuestion) {
  const data = JSON.stringify({ similarQuestion });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/practice-questions/${id}`,
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

const part2Updates = [
  {
    id: 1023,
    similar: {
      question: "Which of the following classes of alcohols is generally resistant to oxidation under normal mild conditions without breaking carbon-carbon bonds?",
      option_a: "(A) Primary alcohols",
      option_b: "(B) Secondary alcohols",
      option_c: "(C) Allylic primary alcohols",
      option_d: "(D) Tertiary alcohols",
      correct_option: "D",
      explanation: "Step 1: Primary alcohols are readily oxidized to aldehydes and further to carboxylic acids.\nStep 2: Secondary alcohols are oxidized to ketones.\nStep 3: Tertiary alcohols do not have any α-hydrogen atom attached to the carbinol carbon. Under mild oxidizing conditions, they resist oxidation. Under vigorous conditions with strong oxidizing agents (e.g., acidified KMnO₄ and heat), they undergo cleavage of C-C bonds to yield mixtures of carboxylic acids with fewer carbon atoms.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1024,
    similar: {
      question: "Given below are two statements:\nStatement I: Reduction of ketones with NaBH₄ produces secondary alcohols.\nStatement II: Pentan-2-one and pentan-3-one can be distinguished chemically by the iodoform test.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Statement I is incorrect, but Statement II is correct.",
      option_b: "(B) Both Statement I and Statement II are incorrect.",
      option_c: "(C) Both Statement I and Statement II are correct.",
      option_d: "(D) Statement I is correct, but Statement II is incorrect.",
      correct_option: "C",
      explanation: "Step 1: Evaluating Statement I: Ketones (R-CO-R') are reduced by reducing agents like NaBH₄ or LiAlH₄ to secondary alcohols (R-CH(OH)-R'). Thus, Statement I is correct.\nStep 2: Evaluating Statement II: Pentan-2-one (CH₃COCH₂CH₂CH₃) contains a methyl ketone group (CH₃-CO-) and gives a yellow precipitate of iodoform (CHI₃) with I₂/NaOH. Pentan-3-one (CH₃CH₂COCH₂CH₃) does not contain a methyl ketone group and does not give the iodoform test. Hence, they are easily distinguished. Thus, Statement II is correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1025,
    similar: {
      question: "Match List I (Carbonyl Derivative) with List II (Structure formed from Acetone, (CH₃)₂C=O):\nList I:\nA. Oxime\nB. Semicarbazone\nC. Hydrazone\nD. 2,4-Dinitrophenylhydrazone\nList II:\nI. (CH₃)₂C=N-NH-C₆H₃(NO₂)₂\nII. (CH₃)₂C=N-OH\nIII. (CH₃)₂C=N-NH₂\nIV. (CH₃)₂C=N-NH-CONH₂\nChoose the correct answer from the options given below:",
      option_a: "(A) A-II, B-IV, C-III, D-I",
      option_b: "(B) A-II, B-I, C-IV, D-III",
      option_c: "(C) A-IV, B-II, C-III, D-I",
      option_d: "(D) A-III, B-IV, C-II, D-I",
      correct_option: "A",
      explanation: "Step 1: Reaction of acetone with hydroxylamine (NH₂OH) produces an oxime: (CH₃)₂C=N-OH (A matches II).\nStep 2: Reaction with semicarbazide (NH₂NHCONH₂) produces a semicarbazone: (CH₃)₂C=N-NH-CONH₂ (B matches IV).\nStep 3: Reaction with hydrazine (NH₂NH₂) produces a hydrazone: (CH₃)₂C=N-NH₂ (C matches III).\nStep 4: Reaction with 2,4-dinitrophenylhydrazine gives 2,4-dinitrophenylhydrazone: (CH₃)₂C=N-NH-C₆H₃(NO₂)₂ (D matches I).\nStep 5: Thus, the correct matching is A-II, B-IV, C-III, D-I.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1026,
    similar: {
      question: "Which of the following carbonyl compounds does NOT reduce Tollen's reagent?",
      option_a: "(A) Methanal (HCHO)",
      option_b: "(B) Ethanal (CH₃CHO)",
      option_c: "(C) Benzaldehyde (C₆H₅CHO)",
      option_d: "(D) Acetophenone (C₆H₅COCH₃)",
      correct_option: "D",
      explanation: "Step 1: Tollen's reagent is ammoniacal silver nitrate, [Ag(NH₃)₂]⁺ OH⁻, a mild oxidizing agent.\nStep 2: All aldehydes—whether aliphatic (HCHO, CH₃CHO) or aromatic (C₆H₅CHO)—are easily oxidized by Tollen's reagent to form carboxylate anions and a bright silver mirror (Ag).\nStep 3: Ketones, such as acetophenone (C₆H₅COCH₃), do not possess the easily oxidizable formyl hydrogen (-CHO) and do not reduce Tollen's reagent under standard conditions.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1027,
    similar: {
      question: "The reaction of an aldehyde or ketone with a 1,2-diol (such as ethylene glycol) in the presence of dry HCl gas produces a:",
      option_a: "(A) Cyclic acetal or ketal",
      option_b: "(B) Hemiacetal",
      option_c: "(C) Cyanohydrin",
      option_d: "(D) Carboxylic acid",
      correct_option: "A",
      explanation: "Step 1: Carbonyl compounds react with monohydric alcohols in the presence of dry HCl to form hemiacetals and acetals/ketals.\nStep 2: When reacted with a dihydric alcohol such as ethylene glycol (HO-CH₂-CH₂-OH), a cyclic five-membered ring structure is formed known as a cyclic acetal (from aldehydes) or cyclic ketal (ethylene glycol ketal, from ketones).\nStep 3: Dry HCl protonates the carbonyl oxygen and acts as a dehydrating agent by absorbing the generated water to drive the equilibrium forward.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1028,
    similar: {
      question: "What is the product formed when benzoic acid reacts with thionyl chloride (SOCl₂) or PCl₅?",
      option_a: "(A) Chlorobenzene",
      option_b: "(B) Benzoyl chloride (C₆H₅COCl)",
      option_c: "(C) Benzyl chloride (C₆H₅CH₂Cl)",
      option_d: "(D) Benzal chloride (C₆H₅CHCl₂)",
      correct_option: "B",
      explanation: "Step 1: Carboxylic acids react with phosphorus pentachloride (PCl₅), phosphorus trichloride (PCl₃), or thionyl chloride (SOCl₂) to replace the -OH group with a chlorine atom (-Cl).\nStep 2: For benzoic acid:\nC₆H₅COOH + PCl₅ → C₆H₅COCl + POCl₃ + HCl\nor\nC₆H₅COOH + SOCl₂ → C₆H₅COCl + SO₂ ↑ + HCl ↑\nStep 3: The product is benzoyl chloride (C₆H₅COCl).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1029,
    similar: {
      question: "In the presence of dilute NaOH, two molecules of acetaldehyde (CH₃CHO) undergo self-condensation. Heating the resulting aldol gives which major α,β-unsaturated product?",
      option_a: "(A) But-2-enal (Crotonaldehyde)",
      option_b: "(B) But-1-en-3-one",
      option_c: "(C) But-2-enoic acid",
      option_d: "(D) Butane-1,3-diol",
      correct_option: "A",
      explanation: "Step 1: In the aldol reaction of acetaldehyde:\nCH₃CHO + CH₃CHO --(dil. NaOH)--> CH₃-CH(OH)-CH₂-CHO (3-hydroxybutanal or aldol).\nStep 2: Upon heating (dehydration), water is eliminated via an E1cB mechanism between the α-carbon and β-carbon:\nCH₃-CH(OH)-CH₂-CHO --(Δ, -H₂O)--> CH₃-CH=CH-CHO (but-2-enal or crotonaldehyde).\nStep 3: The double bond is conjugated with the carbonyl group, imparting high thermodynamic stability.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1030,
    similar: {
      question: "Dehydration of aldol condensation products gives α,β-unsaturated carbonyl compounds. Which structural feature in aldehydes or ketones is strictly mandatory for them to undergo this condensation?",
      option_a: "(A) Absence of any carbonyl group",
      option_b: "(B) Presence of at least one α-hydrogen atom",
      option_c: "(C) Presence of a phenolic -OH group",
      option_d: "(D) Presence of a halogen atom at the carbonyl carbon",
      correct_option: "B",
      explanation: "Step 1: In the aldol condensation mechanism, the base (e.g., dilute OH⁻) abstracts an acidic proton from the α-position (the carbon adjacent to the carbonyl group) to form a resonance-stabilized enolate anion.\nStep 2: This enolate nucleophile attacks the electrophilic carbonyl carbon of another aldehyde or ketone molecule.\nStep 3: Without at least one α-hydrogen atom, the required enolate cannot form, and aldol condensation cannot take place.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1031,
    similar: {
      question: "The addition of hydrogen cyanide (HCN) to propanone in the presence of a base (catalytic OH⁻) is classified as a:",
      option_a: "(A) Nucleophilic addition reaction",
      option_b: "(B) Electrophilic addition reaction",
      option_c: "(C) Nucleophilic substitution reaction",
      option_d: "(D) Free radical substitution reaction",
      correct_option: "A",
      explanation: "Step 1: Pure HCN is a weak acid and does not generate sufficient cyanide ion concentration alone.\nStep 2: Catalytic base generates the strong nucleophile CN⁻: HCN + OH⁻ ⇌ CN⁻ + H₂O.\nStep 3: The nucleophilic CN⁻ attacks the planar, sp² hybridized electrophilic carbonyl carbon to form a tetrahedral alkoxide intermediate.\nStep 4: Subsequent protonation of the alkoxide gives the cyanohydrin product ((CH₃)₂C(OH)CN).\nStep 5: Since the rate-determining initial step is the attack of a nucleophile, the reaction is a nucleophilic addition.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1032,
    similar: {
      question: "An alkyl halide reacts with alcoholic KCN to form compound 'X'. Upon complete acidic hydrolysis, compound 'X' produces a carboxylic acid (RCOOH). Compound 'X' is:",
      option_a: "(A) An alkyl cyanide (Nitrile, R-CN)",
      option_b: "(B) An alkyl isocyanide (R-NC)",
      option_c: "(C) An amine (R-NH₂)",
      option_d: "(D) An alcohol (R-OH)",
      correct_option: "A",
      explanation: "Step 1: Alkyl halides react with ionic KCN via nucleophilic substitution where CN⁻ attacks primarily through carbon, forming alkyl cyanides (alkane nitriles, R-CN).\nStep 2: Complete hydrolysis of an alkyl cyanide in acidic medium proceeds through an amide intermediate and yields a carboxylic acid:\nR-CN + 2H₂O + H⁺ → R-COOH + NH₄⁺\nStep 3: Therefore, compound 'X' is an alkyl cyanide (R-CN).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1033,
    similar: {
      question: "Which of the following compounds gives a yellow precipitate of triiodomethane (CHI₃) when treated with I₂ and aqueous NaOH?",
      option_a: "(A) Butan-2-one (CH₃COCH₂CH₃)",
      option_b: "(B) Pentan-3-one (CH₃CH₂COCH₂CH₃)",
      option_c: "(C) Methanal (HCHO)",
      option_d: "(D) Benzoic acid (C₆H₅COOH)",
      correct_option: "A",
      explanation: "Step 1: The iodoform test is given by compounds containing the methyl carbonyl group (CH₃-C=O) or methyl carbinol group (CH₃-CH(OH)-).\nStep 2: In butan-2-one (CH₃COCH₂CH₃), the CH₃-C=O group is present.\nReaction: CH₃COCH₂CH₃ + 3I₂ + 4NaOH → CHI₃ ↓ (yellow ppt) + CH₃CH₂COONa + 3NaI + 3H₂O.\nStep 3: Pentan-3-one, methanal, and benzoic acid lack this specific CH₃-C=O structural unit and do not give the iodoform test.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1034,
    similar: {
      question: "Arrange the following carbonyl compounds in decreasing order of reactivity towards nucleophilic addition of a Grignard reagent (RMgX):\nI. HCHO\nII. CH₃CHO\nIII. CH₃COCH₃",
      option_a: "(A) I > II > III",
      option_b: "(B) III > II > I",
      option_c: "(C) II > I > III",
      option_d: "(D) I > III > II",
      correct_option: "A",
      explanation: "Step 1: Reactivity towards nucleophilic addition at the carbonyl carbon depends on two major factors: electronic effects and steric hindrance.\nStep 2: Electronic factor: Alkyl groups are electron-donating (+I effect), which disperse the partial positive charge (δ+) on the carbonyl carbon and decrease its electrophilicity.\nStep 3: Steric factor: Bulky alkyl groups increase steric crowding around the carbonyl carbon in going from planar sp² (120°) to tetrahedral sp³ (109.5°).\nStep 4: Formaldehyde (HCHO) has no alkyl groups (least steric, most electrophilic). Acetaldehyde (CH₃CHO) has one +I group. Acetone (CH₃COCH₃) has two +I groups and greater steric crowding.\nStep 5: Hence, the order of reactivity is: HCHO > CH₃CHO > CH₃COCH₃ (I > II > III).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1035,
    similar: {
      question: "Which of the following reduction reactions is NOT correctly matched with its typical product?",
      option_a: "(A) Clemmensen reduction: >C=O --(Zn-Hg / conc. HCl)--> >CH₂",
      option_b: "(B) Wolff-Kishner reduction: >C=O --(NH₂NH₂ / KOH, ethylene glycol, Δ)--> >CHOH",
      option_c: "(C) Rosenmund reduction: R-COCl --(H₂ / Pd-BaSO₄)--> R-CHO",
      option_d: "(D) Stephen reaction: R-CN --(SnCl₂ + HCl, then H₃O⁺)--> R-CHO",
      correct_option: "B",
      explanation: "Step 1: Clemmensen reduction reduces carbonyl groups (>C=O) of aldehydes and ketones directly to methylene groups (>CH₂), producing alkanes. (Correctly matched)\nStep 2: Wolff-Kishner reduction also reduces carbonyl groups (>C=O) directly to methylene groups (>CH₂), yielding alkanes—NOT secondary alcohols (>CHOH). Hence, pair (B) is incorrectly matched.\nStep 3: Rosenmund reduction reduces acyl chlorides to aldehydes using poisoned Pd catalyst (Pd-BaSO₄). (Correctly matched)\nStep 4: Stephen reduction reduces nitriles to imines which hydrolyze to aldehydes. (Correctly matched)\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1036,
    similar: {
      question: "When toluene is treated with alkaline KMnO₄ followed by heating and subsequent acidification with dilute HCl, the final organic product obtained is:",
      option_a: "(A) Benzaldehyde",
      option_b: "(B) Benzoic acid",
      option_c: "(C) Benzyl alcohol",
      option_d: "(D) Benzophenone",
      correct_option: "B",
      explanation: "Step 1: Alkaline potassium permanganate (KMnO₄ / KOH) is a vigorous oxidizing agent.\nStep 2: It oxidizes the benzylic alkyl side chain of alkylbenzenes that contain benzylic hydrogen atoms completely to the carboxylate salt, regardless of chain length.\nStep 3: Toluene (C₆H₅CH₃) is oxidized to potassium benzoate (C₆H₅COOK).\nStep 4: Subsequent acidification with mineral acid (H₃O⁺ or dilute HCl) precipitates benzoic acid (C₆H₅COOH).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1037,
    similar: {
      question: "Given below are two statements:\nStatement I: Tollen's reagent consists of an ammoniacal solution of silver nitrate, [Ag(NH₃)₂]⁺ OH⁻.\nStatement II: Unlike aliphatic aldehydes, aromatic aldehydes (e.g., benzaldehyde) do not reduce Fehling's solution.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both Statement I and Statement II are correct.",
      option_b: "(B) Both Statement I and Statement II are incorrect.",
      option_c: "(C) Statement I is correct, but Statement II is incorrect.",
      option_d: "(D) Statement I is incorrect, but Statement II is correct.",
      correct_option: "A",
      explanation: "Step 1: Evaluating Statement I: Tollen's reagent is freshly prepared ammoniacal silver nitrate, containing the coordination complex [Ag(NH₃)₂]⁺ OH⁻. Thus, Statement I is correct.\nStep 2: Evaluating Statement II: Fehling's solution is a weaker oxidizing agent than Tollen's reagent. Aliphatic aldehydes readily reduce Fehling's solution to form a red cuprous oxide (Cu₂O) precipitate, but aromatic aldehydes like benzaldehyde cannot be oxidized by Fehling's solution under standard conditions. Thus, Statement II is correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1038,
    similar: {
      question: "Which of the following aldehydes does NOT undergo self-aldol condensation when treated with dilute sodium hydroxide?",
      option_a: "(A) Ethanal (CH₃CHO)",
      option_b: "(B) Propanal (CH₃CH₂CHO)",
      option_c: "(C) 2,2-Dimethylpropanal ((CH₃)₃C-CHO)",
      option_d: "(D) Butanal (CH₃CH₂CH₂CHO)",
      correct_option: "C",
      explanation: "Step 1: Aldol condensation requires the presence of at least one α-hydrogen atom adjacent to the carbonyl group to form an enolate ion in the presence of dilute base.\nStep 2: In 2,2-dimethylpropanal (neopentanal, (CH₃)₃C-CHO), the α-carbon is fully substituted by three methyl groups and possesses zero α-hydrogens.\nStep 3: Consequently, it cannot undergo aldol condensation; instead, upon treatment with concentrated alkali, it undergoes the Cannizzaro reaction.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1039,
    similar: {
      question: "Given below are two statements:\nStatement I: Oxidation of primary alcohols with pyridinium chlorochromate (PCC) in CH₂Cl₂ stops selectively at the aldehyde stage.\nStatement II: Reaction of a Grignard reagent (RMgX) with carbon dioxide (solid CO₂) followed by acidification yields a carboxylic acid with one additional carbon atom.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both Statement I and Statement II are correct.",
      option_b: "(B) Both Statement I and Statement II are incorrect.",
      option_c: "(C) Statement I is correct, but Statement II is incorrect.",
      option_d: "(D) Statement I is incorrect, but Statement II is correct.",
      correct_option: "A",
      explanation: "Step 1: Evaluating Statement I: PCC (pyridinium chlorochromate) in an anhydrous solvent like CH₂Cl₂ is a mild, selective reagent that oxidizes primary alcohols to aldehydes without further oxidizing them to carboxylic acids. Thus, Statement I is correct.\nStep 2: Evaluating Statement II: RMgX adds nucleophilically to CO₂ (O=C=O) to form a magnesium carboxylate salt (R-COOMgX), which upon acidic hydrolysis gives R-COOH containing one more carbon atom than the alkyl group R. Thus, Statement II is correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1040,
    similar: {
      question: "Which of the following organic compounds will NOT react with hydroxylamine (NH₂OH) to form an oxime?",
      option_a: "(A) Propanone",
      option_b: "(B) Benzaldehyde",
      option_c: "(C) Chloroethane",
      option_d: "(D) Ethanal",
      correct_option: "C",
      explanation: "Step 1: Oximes (>C=N-OH) are formed by the nucleophilic addition-elimination reaction of hydroxylamine (NH₂OH) with compounds containing a carbonyl group (>C=O), such as aldehydes and ketones.\nStep 2: Propanone, benzaldehyde, and ethanal all contain the carbonyl functional group and readily form oximes.\nStep 3: Chloroethane (CH₃CH₂Cl) is an alkyl halide with no carbonyl group; it does not undergo nucleophilic condensation with hydroxylamine to form oximes.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1041,
    similar: {
      question: "Given below are two statements:\nStatement I: Aldehydes having no α-hydrogen atom undergo disproportionation (self oxidation-reduction) when heated with concentrated alkali (Cannizzaro reaction).\nStatement II: The -CHO group attached to a benzene ring activates the ring towards electrophilic aromatic substitution and directs the incoming electrophile to ortho/para positions.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both Statement I and Statement II are correct.",
      option_b: "(B) Statement I is correct, but Statement II is incorrect.",
      option_c: "(C) Statement I is incorrect, but Statement II is correct.",
      option_d: "(D) Both Statement I and Statement II are incorrect.",
      correct_option: "B",
      explanation: "Step 1: Evaluating Statement I: In the Cannizzaro reaction, aldehydes with no α-hydrogen (such as HCHO and C₆H₅CHO) react with concentrated NaOH (50%) to yield one molecule of an alcohol (reduced product) and one molecule of a carboxylate salt (oxidized product). Thus, Statement I is correct.\nStep 2: Evaluating Statement II: The carbonyl group (-CHO) has a strong electron-withdrawing resonance (-M) and inductive (-I) effect. It deactivates the aromatic benzene ring towards electrophilic aromatic substitution and directs electrophiles to the meta position, not ortho/para. Thus, Statement II is incorrect.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1042,
    similar: {
      question: "Hydration of propyne (CH₃-C≡CH) in the presence of dilute H₂SO₄ and catalytic HgSO₄ (mercuric sulfate) at 333 K yields which major organic compound?",
      option_a: "(A) Propanal",
      option_b: "(B) Propan-2-one (Acetone)",
      option_c: "(C) Propanoic acid",
      option_d: "(D) Propan-1-ol",
      correct_option: "B",
      explanation: "Step 1: Markovnikov addition of water (H-OH) across the triple bond of propyne (CH₃-C≡CH) occurs in the presence of Hg²⁺/H₂SO₄.\nStep 2: The -OH group attaches to the more substituted internal carbon (C-2), yielding an enol intermediate: CH₃-C(OH)=CH₂ (prop-1-en-2-ol).\nStep 3: This enol rapidly tautomerizes to the thermodynamically far more stable keto form:\nCH₃-C(OH)=CH₂ ⇌ CH₃-CO-CH₃ (propan-2-one or acetone).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1043,
    similar: {
      question: "Reaction of formaldehyde (HCHO) with methyl magnesium bromide (CH₃MgBr) followed by acidic hydrolysis gives:",
      option_a: "(A) Methanol",
      option_b: "(B) Ethanol",
      option_c: "(C) Propan-2-ol",
      option_d: "(D) Ethanoic acid",
      correct_option: "B",
      explanation: "Step 1: Formaldehyde (HCHO) possesses two hydrogens attached to the carbonyl group.\nStep 2: Addition of the Grignard reagent nucleophile (CH₃⁻) to the carbonyl carbon gives a magnesium alkoxide:\nHCHO + CH₃MgBr → CH₃-CH₂-OMgBr\nStep 3: Subsequent acidic hydrolysis protonates the alkoxide:\nCH₃-CH₂-OMgBr + H₂O → CH₃CH₂OH (ethanol) + Mg(OH)Br\nStep 4: Formaldehyde uniquely yields primary alcohols with Grignard reagents, and CH₃MgBr adds one carbon, giving ethanol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1044,
    similar: {
      question: "What is the product formed when ethyl magnesium bromide (C₂H₅MgBr) is treated with solid carbon dioxide (dry ice) followed by acidification with dilute HCl?",
      option_a: "(A) Propanoic acid (C₂H₅COOH)",
      option_b: "(B) Ethanoic acid (CH₃COOH)",
      option_c: "(C) Butanoic acid (C₃H₇COOH)",
      option_d: "(D) Propanone ((CH₃)₂CO)",
      correct_option: "A",
      explanation: "Step 1: The nucleophilic ethyl carbanion of ethyl magnesium bromide attacks the electrophilic carbon of carbon dioxide (O=C=O):\nC₂H₅-MgBr + CO₂ → C₂H₅-COO⁻MgBr⁺\nStep 2: Acidic hydrolysis of this magnesium carboxylate complex protonates the carboxylate group:\nC₂H₅-COO⁻MgBr⁺ + H₃O⁺ → C₂H₅COOH (propanoic acid) + Mg(OH)Br\nStep 3: The carbon chain increases by one carbon (from 2 carbons in ethyl to 3 carbons in propanoic acid).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1045,
    similar: {
      question: "Which of the following alcohols yields a ketone upon controlled oxidation with potassium dichromate in acidic medium (K₂Cr₂O₇ / H₂SO₄)?",
      option_a: "(A) Propan-1-ol",
      option_b: "(B) 2-Methylpropan-2-ol",
      option_c: "(C) Propan-2-ol",
      option_d: "(D) Methanol",
      correct_option: "C",
      explanation: "Step 1: Primary alcohols (e.g., propan-1-ol, methanol) on oxidation yield aldehydes and subsequently carboxylic acids.\nStep 2: Secondary alcohols (e.g., propan-2-ol, CH₃CH(OH)CH₃) possess a single α-hydrogen. On oxidation, they lose two hydrogen atoms (one from -OH and one from α-carbon) to form ketones:\nCH₃-CH(OH)-CH₃ --([O])--> CH₃-CO-CH₃ (acetone) + H₂O.\nStep 3: Tertiary alcohols (e.g., 2-methylpropan-2-ol) have no α-hydrogen and resist oxidation under standard conditions.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1046,
    similar: {
      question: "When phthalic acid (benzene-1,2-dicarboxylic acid) is heated with ammonia (NH₃), it first forms ammonium phthalate, which on weak heating gives phthalamide. Strong heating of phthalamide with elimination of ammonia yields:",
      option_a: "(A) Phthalic anhydride",
      option_b: "(B) Benzonitrile",
      option_c: "(C) Phthalimide",
      option_d: "(D) Anthranilic acid",
      correct_option: "C",
      explanation: "Step 1: Phthalic acid reacts with two moles of NH₃ to form the diammonium salt: ammonium phthalate.\nStep 2: Gentle heating causes loss of two water molecules to yield phthalamide (C₆H₄(CONH₂)₂).\nStep 3: Strong heating of phthalamide leads to an intramolecular cyclization with loss of one molecule of ammonia (NH₃), forming a stable five-membered cyclic imide: phthalimide (C₆H₄(CO)₂NH).\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 75 Part 2 questions (IDs 1023 to 1046)...');
    
    for (const item of part2Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Set 75 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error in Set 75 Part 2 update:', err);
  }
}

run();
