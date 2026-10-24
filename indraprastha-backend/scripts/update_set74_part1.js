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
    id: 4055,
    data: {
      question: "Which of the following general molecular formulas represents the homologous series of saturated monohydric aliphatic alcohols (alkanols)?",
      option_a: "CₙH₂ₙO",
      option_b: "CₙH₂ₙ₋₂O",
      option_c: "CₙH₂ₙ₊₁OH (or CₙH₂ₙ₊₂O)",
      option_d: "CₙH₂ₙ₋₁OH",
      "correct_option": "C",
      explanation: "Step 1: Definition of alkanols:\nMonohydric aliphatic alcohols are derivatives of alkanes where one hydrogen atom is replaced by a hydroxyl (–OH) group.\n\nStep 2: Derivation of general formula:\nAn alkane has the formula CₙH₂ₙ₊₂. Replacing one H atom with an –OH group gives CₙH₂ₙ₊₁OH.\nGrouping the atoms together gives the molecular formula CₙH₂ₙ₊₂O.\n\nStep 3: Verification for n = 1, 2:\n- n = 1: CH₃OH (CH₄O)\n- n = 2: C₂H₅OH (C₂H₆O)\nBoth fit the general formula CₙH₂ₙ₊₁OH / CₙH₂ₙ₊₂O.\n\nStep 4: Therefore, Option (C) is the correct answer.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4056,
    data: {
      question: "Which of the following functional groups defines a PRIMARY (1°) alcohol?",
      option_a: "–CH₂OH",
      option_b: ">CHOH",
      option_c: "–C(OH)<",
      option_d: "–O–",
      "correct_option": "A",
      explanation: "Step 1: Classification of alcohols:\nAlcohols are classified as primary (1°), secondary (2°), or tertiary (3°) based on the number of carbon atoms directly bonded to the carbon carrying the hydroxyl group.\n\nStep 2: Primary (1°) alcohol:\nThe –OH group is attached to a primary carbon atom (a carbon attached to zero or one other carbon atom). The characteristic group is –CH₂OH (e.g., ethanol, CH₃–CH₂OH).\n\nStep 3: Secondary and tertiary alcohols:\n- >CHOH: Secondary alcohol (attached to two carbons).\n- –C(OH)<: Tertiary alcohol (attached to three carbons).\n\nStep 4: Therefore, –CH₂OH represents a primary alcoholic group.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4057,
    data: {
      question: "Which of the following isomeric butyl alcohols is a TERTIARY (3°) alcohol?",
      option_a: "Butan-1-ol (n-butyl alcohol)",
      option_b: "Butan-2-ol (sec-butyl alcohol)",
      option_c: "2-Methylpropan-1-ol (isobutyl alcohol)",
      option_d: "2-Methylpropan-2-ol (tert-butyl alcohol)",
      "correct_option": "D",
      explanation: "Step 1: Definition of tertiary alcohol:\nAn alcohol in which the carbon atom bearing the –OH group is directly bonded to three other carbon atoms.\n\nStep 2: Analyze 2-methylpropan-2-ol ((CH₃)₃C–OH):\nThe central carbon atom is bonded to three methyl (–CH₃) groups and one –OH group. Therefore, the carbinol carbon is tertiary (3°).\n\nStep 3: Classification of the other isomers:\n- Butan-1-ol: CH₃CH₂CH₂CH₂OH (Primary, 1°)\n- Butan-2-ol: CH₃CH₂CH(OH)CH₃ (Secondary, 2°)\n- 2-Methylpropan-1-ol: (CH₃)₂CHCH₂OH (Primary, 1°)\n\nStep 4: Therefore, 2-methylpropan-2-ol is a tertiary alcohol.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4058,
    data: {
      question: "Which of the following compounds is classified as an AROMATIC ALCOHOL (rather than a phenol)?",
      option_a: "Phenol (C₆H₅OH)",
      option_b: "Benzyl alcohol (C₆H₅CH₂OH)",
      option_c: "o-Cresol (2-methylphenol)",
      option_d: "Catechol (benzene-1,2-diol)",
      "correct_option": "B",
      explanation: "Step 1: Difference between phenols and aromatic alcohols:\n- In phenols, the hydroxyl (–OH) group is bonded directly to an sp² hybridized carbon atom of an aromatic ring.\n- In aromatic alcohols, the –OH group is bonded to an sp³ hybridized carbon atom of a side chain attached to an aromatic ring.\n\nStep 2: Analyze benzyl alcohol (C₆H₅–CH₂–OH):\nThe –OH group is attached to the aliphatic methylene (–CH₂–) carbon, not directly to the benzene ring. Hence, benzyl alcohol is an aromatic alcohol and exhibits properties typical of aliphatic alcohols (e.g., neutral to litmus, does not give FeCl₃ color).\n\nStep 3: Phenol, o-cresol, and catechol have –OH directly on the aromatic ring and are phenols.\n\nStep 4: Therefore, benzyl alcohol is an aromatic alcohol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4059,
    data: {
      question: "Which of the following hydroxy compounds does NOT belong to the class of phenols?",
      option_a: "o-Cresol (2-methylphenol)",
      option_b: "Resorcinol (benzene-1,3-diol)",
      option_c: "Benzyl alcohol (phenylmethanol)",
      option_d: "Picric acid (2,4,6-trinitrophenol)",
      "correct_option": "C",
      explanation: "Step 1: Structural requirement for phenols:\nA phenol must possess at least one hydroxyl (–OH) group bonded directly to a carbon atom of an aromatic ring.\n\nStep 2: Structural classification:\n- o-Cresol, resorcinol, and picric acid all have –OH groups bonded directly to the aromatic ring carbons, classifying them as phenols.\n- In benzyl alcohol (C₆H₅–CH₂OH), the –OH group is attached to an aliphatic sp³ side-chain carbon atom, making it an aliphatic/aromatic alcohol, NOT a phenol.\n\nStep 3: Therefore, benzyl alcohol is not considered a phenol.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4060,
    data: {
      question: "Phenol (carbolic acid, C₆H₅OH) is structurally classified as an:",
      option_a: "Aromatic hydroxy compound containing an –OH group directly attached to an sp² aromatic ring carbon",
      option_b: "Aliphatic secondary alcohol",
      option_c: "Antiaromatic compound",
      option_d: "Non-aromatic ether",
      "correct_option": "A",
      explanation: "Step 1: Structure of phenol:\nPhenol consists of a benzene ring with a hydroxyl group attached to one of the ring carbons.\n\nStep 2: Aromaticity criteria:\n- The benzene ring is cyclic, planar, and completely conjugated.\n- It contains 6 π-electrons, satisfying Hückel's rule (4n + 2 where n = 1).\n- The carbon atom attached to –OH is sp² hybridized.\n\nStep 3: Therefore, phenol is an aromatic hydroxy compound.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4061,
    data: {
      question: "Which of the following compounds does NOT give a characteristic violet/blue coloration with neutral ferric chloride (FeCl₃) solution?",
      option_a: "Benzyl alcohol (C₆H₅CH₂OH)",
      option_b: "Phenol (C₆H₅OH)",
      option_c: "o-Cresol",
      option_d: "Salicylic acid",
      "correct_option": "A",
      explanation: "Step 1: Principle of neutral FeCl₃ test:\nPhenols react with neutral ferric chloride solution to form deeply colored water-soluble coordination complexes (usually violet, blue, or green) of the type [Fe(OAr)₆]³⁻.\n\nStep 2: Contrast with alcohols:\nAliphatic and side-chain aromatic alcohols (like benzyl alcohol) do not possess a phenolic –OH group directly on an aromatic ring. Their C–O bonds are not sufficiently acidic to form stable phenolate-iron coordination complexes, so they give NO characteristic color with neutral FeCl₃.\n\nStep 3: Therefore, benzyl alcohol does not show phenolic properties and does not react with FeCl₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4062,
    data: {
      question: "Match the dihydroxybenzene in Column-I with its common trivial name in Column-II:\nColumn-I:\n(A) Benzene-1,2-diol\n(B) Benzene-1,3-diol\n(C) Benzene-1,4-diol\n(D) 2-Methylphenol\nColumn-II:\n(P) Resorcinol\n(Q) Quinol (Hydroquinone)\n(R) Catechol\n(S) o-Cresol",
      option_a: "A–R, B–P, C–Q, D–S",
      option_b: "A–P, B–R, C–Q, D–S",
      option_c: "A–R, B–Q, C–P, D–S",
      option_d: "A–S, B–P, C–Q, D–R",
      "correct_option": "A",
      explanation: "Step 1: Match the structures with IUPAC names:\n- (A) Benzene-1,2-diol has two adjacent –OH groups on the benzene ring → Catechol (R).\n- (B) Benzene-1,3-diol has meta-disposed –OH groups → Resorcinol (P).\n- (C) Benzene-1,4-diol has para-disposed –OH groups → Quinol or Hydroquinone (Q).\n- (D) 2-Methylphenol has a methyl group ortho to –OH → o-Cresol (S).\n\nStep 2: Correct matching code: A–R, B–P, C–Q, D–S.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4063,
    data: {
      question: "Which of the following general structural representations corresponds to an ETHER?",
      option_a: "R–CO–R'",
      option_b: "R–COO–R'",
      option_c: "R–CHO",
      option_d: "R–O–R'",
      "correct_option": "D",
      explanation: "Step 1: Definition of ethers:\nEthers are organic compounds in which an oxygen atom is bonded to two alkyl or aryl groups: R–O–R' or Ar–O–R.\n\nStep 2: Other functional groups:\n- R–CO–R': Ketone\n- R–COO–R': Ester\n- R–CHO: Aldehyde\n\nStep 3: Therefore, R–O–R' represents an ether.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4064,
    data: {
      question: "Cyclohexanol is classified as which type of alcohol?",
      option_a: "Primary aliphatic alcohol",
      option_b: "Secondary alicyclic alcohol",
      option_c: "Tertiary alcohol",
      option_d: "Monohydric phenol",
      "correct_option": "B",
      explanation: "Step 1: Structure of cyclohexanol:\nCyclohexanol (C₆H₁₁OH) is a six-membered saturated alicyclic ring with a hydroxyl group attached to one of the ring carbons.\n\nStep 2: Degree of carbinol carbon:\nThe carbon atom bonded to the –OH group is directly attached to two adjacent ring CH₂ carbon atoms and one hydrogen atom (–CH(OH)–).\n\nStep 3: Classification:\nBecause the carbinol carbon is bonded to two carbons, cyclohexanol is a secondary (2°) alicyclic alcohol.\n\nStep 4: Therefore, it is a secondary alicyclic alcohol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4065,
    data: {
      question: "The reaction of propene with hydrogen bromide (HBr) in the presence of benzoyl peroxide yields which major alkyl bromide?",
      option_a: "2-Bromopropane (isopropyl bromide)",
      option_b: "1-Bromopropane (n-propyl bromide)",
      option_c: "1,2-Dibromopropane",
      option_d: "3-Bromoprop-1-ene (allyl bromide)",
      "correct_option": "B",
      explanation: "Step 1: Free radical addition (peroxide effect / Kharasch effect):\nIn the presence of organic peroxides, addition of HBr to unsymmetrical alkenes follows an anti-Markovnikov free-radical pathway.\n\nStep 2: Propagation steps:\n- Benzoyl peroxide dissociates to form phenyl radicals, which generate bromine free radicals (Br•):\n- Br• selectively attacks the terminal sp² carbon of propene to form the more stable secondary free radical:\nCH₃–CH=CH₂ + Br• → CH₃–•CH–CH₂Br (2° radical, stable)\n- The secondary radical abstracts hydrogen from HBr:\nCH₃–•CH–CH₂Br + HBr → CH₃–CH₂–CH₂Br + Br•\n\nStep 3: The major product is 1-bromopropane (n-propyl bromide).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4066,
    data: {
      question: "Ethanol (C₂H₅OH) and dimethyl ether (CH₃–O–CH₃) share the identical molecular formula C₂H₆O, but possess entirely different functional groups and chemical properties. They are related to each other as:",
      option_a: "Chain isomers",
      option_b: "Position isomers",
      option_c: "Functional group isomers",
      option_d: "Metamers",
      "correct_option": "C",
      explanation: "Step 1: Definition of functional isomerism:\nCompounds having the same molecular formula but containing different functional groups are called functional group isomers.\n\nStep 2: Comparison of ethanol and dimethyl ether:\nBoth have the molecular formula C₂H₆O (general formula CₙH₂ₙ₊₂O):\n- Ethanol: CH₃CH₂OH, contains a hydroxyl functional group (–OH, an alcohol, bp = 351 K due to hydrogen bonding).\n- Dimethyl ether: CH₃–O–CH₃, contains an ether functional group (–O–, an ether, bp = 249 K, cannot form intermolecular H-bonds).\n\nStep 3: Therefore, they are functional group isomers.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4067,
    data: {
      question: "Acid-catalyzed hydration of but-1-ene in the presence of dilute H₂SO₄ yields butan-2-ol as the major product because:",
      option_a: "It proceeds via an anti-Markovnikov free-radical mechanism",
      option_b: "The electrophilic addition of H⁺ forms a more stable secondary carbocation intermediate (CH₃–CH⁺–CH₂CH₃) according to Markovnikov's rule",
      option_c: "A primary carbocation is formed with higher activation energy",
      option_d: "Hydration occurs via concerted S_N2 mechanism",
      "correct_option": "B",
      explanation: "Step 1: Mechanism of acid-catalyzed hydration:\n- Protonation of the double bond: H⁺ adds to the terminal C-1 carbon of but-1-ene to generate the more stable secondary carbocation:\nCH₃CH₂CH=CH₂ + H⁺ → CH₃CH₂–CH⁺–CH₃ (2° carbocation, stabilized by 5 hyperconjugative α-hydrogens).\n- Nucleophilic attack: Water attacks the 2° carbocation:\nCH₃CH₂–CH⁺–CH₃ + H₂O → CH₃CH₂–CH(OH₂⁺)–CH₃\n- Deprotonation: Loss of H⁺ gives butan-2-ol (CH₃CH₂–CH(OH)–CH₃).\n\nStep 2: Therefore, Markovnikov addition via a more stable secondary carbocation is responsible.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4068,
    data: {
      question: "Hydroboration-oxidation of but-1-ene using diborane (B₂H₆ / THF) followed by treatment with alkaline hydrogen peroxide (H₂O₂ / NaOH) produces:",
      option_a: "Butan-1-ol (CH₃CH₂CH₂CH₂OH)",
      option_b: "Butan-2-ol (CH₃CH₂CH(OH)CH₃)",
      option_c: "Butanal (CH₃CH₂CH₂CHO)",
      option_d: "Butanoic acid (CH₃CH₂CH₂COOH)",
      "correct_option": "A",
      explanation: "Step 1: Mechanism of hydroboration-oxidation:\n- Stage 1: Diborane adds to the alkene in a concerted syn-addition manner. Boron attaches to the less sterically hindered terminal carbon, forming tri-n-butylborane:\n3CH₃CH₂CH=CH₂ + BH₃·THF → (CH₃CH₂CH₂CH₂)₃B\n- Stage 2: Alkaline H₂O₂ oxidizes the trialkylborane with retention of configuration, replacing the B atom with an –OH group:\n(CH₃CH₂CH₂CH₂)₃B + 3H₂O₂ + 3NaOH → 3CH₃CH₂CH₂CH₂OH + Na₃BO₃ + 3H₂O\n\nStep 2: Regiochemistry:\nThe net result is anti-Markovnikov hydration of the alkene without carbocation rearrangement, yielding the primary alcohol butan-1-ol.\n\nStep 3: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4069,
    data: {
      question: "Oxymercuration-demercuration of 3-methylbut-1-ene yields 3-methylbutan-2-ol without any carbocation rearrangement. Why does rearrangement NOT occur?",
      option_a: "Because the reaction involves a stable cyclic mercurinium ion intermediate that prevents 1,2-hydride shifts",
      option_b: "Because it proceeds via a free-radical chain mechanism",
      option_c: "Because mercury acts as a strong reducing agent",
      option_d: "Because the solvent is non-polar",
      "correct_option": "A",
      explanation: "Step 1: Oxymercuration mechanism:\nElectrophilic addition of mercuric acetate, Hg(OAc)₂, to 3-methylbut-1-ene forms a bridged three-membered cyclic mercurinium ion.\n\nStep 2: Absence of carbocation rearrangement:\nBecause the positive charge is partially shared by mercury and the two carbons in a bridged cyclic structure, a discrete, open planar carbocation is never formed. Consequently, 1,2-hydride or methyl shifts cannot occur.\n\nStep 3: Regiochemical attack:\nWater attacks the more substituted secondary carbon from the opposite face (anti-attack) to give 3-methylbutan-2-ol upon reductive demercuration with NaBH₄.\n\nStep 4: Therefore, the cyclic mercurinium ion prevents rearrangement.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4070,
    data: {
      question: "In the reactions of an alcohol (ROH) with phosphorus halides:\n3ROH + PCl₃ → 3RCl + Compound A\nROH + PCl₅ → RCl + HCl + Compound B\nIdentify Compounds A and B, respectively.",
      option_a: "A = H₃PO₃ and B = POCl₃",
      option_b: "A = POCl₃ and B = H₃PO₃",
      option_c: "A = H₃PO₄ and B = POCl₃",
      option_d: "A = POCl₃ and B = H₃PO₄",
      "correct_option": "A",
      explanation: "Step 1: Reaction with phosphorus trichloride (PCl₃):\n3ROH + PCl₃ → 3RCl + H₃PO₃\nPhosphorus trichloride reacts with three moles of alcohol to produce alkyl chloride and phosphorous acid (orthophosphorous acid, H₃PO₃). Thus, Compound A is H₃PO₃.\n\nStep 2: Reaction with phosphorus pentachloride (PCl₅):\nROH + PCl₅ → RCl + POCl₃ + HCl\nPhosphorus pentachloride reacts with one mole of alcohol to produce alkyl chloride, phosphoryl chloride (phosphorus oxychloride, POCl₃), and gaseous HCl. Thus, Compound B is POCl₃.\n\nStep 3: Therefore, A = H₃PO₃ and B = POCl₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4071,
    data: {
      question: "Lucas reagent is an equimolar mixture of concentrated hydrochloric acid (conc. HCl) and anhydrous zinc chloride (anhyd. ZnCl₂). When added to an unknown alcohol at room temperature, turbidity appears immediately. The alcohol is:",
      option_a: "A primary (1°) alcohol",
      option_b: "A secondary (2°) alcohol",
      option_c: "Methanol",
      option_d: "A tertiary (3°) alcohol",
      "correct_option": "D",
      explanation: "Step 1: Principle of the Lucas test:\nThe Lucas test distinguishes among primary, secondary, and tertiary alcohols based on their differing rates of reaction with Lucas reagent (conc. HCl + anhyd. ZnCl₂) to form water-insoluble alkyl chlorides (visible as cloudiness / turbidity).\n\nStep 2: Reaction rates by mechanism:\nThe reaction proceeds via an S_N1 carbocation pathway:\n- Tertiary (3°) alcohols form highly stable 3° carbocations and react almost instantaneously, producing immediate white turbidity at room temperature.\n- Secondary (2°) alcohols produce turbidity within 5–10 minutes.\n- Primary (1°) alcohols do not produce turbidity at room temperature; heating is required.\n\nStep 3: Since turbidity appears immediately, the alcohol is tertiary (3°).\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4072,
    data: {
      question: "When propan-1-ol or propan-2-ol is heated with excess concentrated sulfuric acid at 443 K (170 °C), what is the major organic product formed?",
      option_a: "Di-n-propyl ether",
      option_b: "Propane",
      option_c: "Propene (CH₃–CH=CH₂)",
      option_d: "Propanal",
      "correct_option": "C",
      explanation: "Step 1: Acid-catalyzed dehydration of alcohols:\nHeating an alcohol with concentrated H₂SO₄ at high temperature (443 K) favors intramolecular dehydration (elimination) over intermolecular substitution.\n\nStep 2: Elimination mechanism:\n- Protonation of –OH gives an alkyloxonium ion: CH₃–CH(OH₂⁺)–CH₃.\n- Elimination of H₂O produces propene:\nCH₃–CH₂–CH₂OH —(conc. H₂SO₄, 443 K)→ CH₃–CH=CH₂ + H₂O\nCH₃–CH(OH)–CH₃ —(conc. H₂SO₄, 443 K)→ CH₃–CH=CH₂ + H₂O\n\nStep 3: Note: At a lower temperature (413 K), intermolecular dehydration would yield ether.\n\nStep 4: Therefore, at 443 K, propene is the major product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4073,
    data: {
      question: "A Grignard reagent, methylmagnesium bromide (CH₃MgBr), is reacted sequentially with formaldehyde (HCHO), acetaldehyde (CH₃CHO), and acetone (CH₃COCH₃), followed by aqueous acidic workup. What classes of alcohols are produced in the three reactions, respectively?",
      option_a: "Primary, secondary, and tertiary alcohols",
      option_b: "Secondary, primary, and tertiary alcohols",
      option_c: "Primary, tertiary, and secondary alcohols",
      option_d: "Tertiary, secondary, and primary alcohols",
      "correct_option": "A",
      explanation: "Step 1: Reaction with formaldehyde (HCHO):\nHCHO + CH₃MgBr → CH₃–CH₂–OMgBr —(H₃O⁺)→ CH₃CH₂OH (Ethanol, a PRIMARY alcohol).\n\nStep 2: Reaction with higher aldehydes (acetaldehyde, CH₃CHO):\nCH₃CHO + CH₃MgBr → (CH₃)₂CH–OMgBr —(H₃O⁺)→ (CH₃)₂CHOH (Propan-2-ol, a SECONDARY alcohol).\n\nStep 3: Reaction with ketones (acetone, CH₃COCH₃):\nCH₃COCH₃ + CH₃MgBr → (CH₃)₃C–OMgBr —(H₃O⁺)→ (CH₃)₃COH (2-Methylpropan-2-ol, a TERTIARY alcohol).\n\nStep 4: Therefore, primary, secondary, and tertiary alcohols are produced, respectively.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4074,
    data: {
      question: "In the industrial manufacturing of phenol from cumene (isopropylbenzene), cumene is oxidized by air to cumene hydroperoxide, which on subsequent treatment with dilute sulfuric acid decomposes to produce phenol along with which economically valuable co-product?",
      option_a: "Acetone (propan-2-one)",
      option_b: "Acetaldehyde",
      option_c: "Benzaldehyde",
      option_d: "Ethanol",
      "correct_option": "A",
      explanation: "Step 1: Aerial oxidation of cumene:\nCumene (isopropylbenzene, C₆H₅CH(CH₃)₂) is oxidized by passing air at 368–408 K to form cumene hydroperoxide:\nC₆H₅CH(CH₃)₂ + O₂ → C₆H₅C(CH₃)₂(OOH)\n\nStep 2: Acid-catalyzed cleavage:\nCumene hydroperoxide is treated with dilute H₂SO₄ at 323–363 K. A phenyl shift to oxygen with concerted loss of water and rearrangement occurs (Hock rearrangement):\nC₆H₅C(CH₃)₂(OOH) —(H⁺)→ C₆H₅OH + CH₃COCH₃\n\nStep 3: The products obtained in high yield are phenol and acetone (propan-2-one).\n\nStep 4: Therefore, acetone is the co-product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4075,
    data: {
      question: "Pyridinium chlorochromate (PCC, C₅H₅NH⁺ ClCrO₃⁻ in anhydrous CH₂Cl₂) is the preferred reagent for which of the following selective oxidations?",
      option_a: "Primary alcohols to carboxylic acids",
      option_b: "Primary alcohols to aldehydes",
      option_c: "Ketones to esters",
      option_d: "Alkenes to vicinal diols",
      "correct_option": "B",
      explanation: "Step 1: Nature of PCC:\nPyridinium chlorochromate (PCC) is a mild, selective chromium(VI) oxidizing agent soluble in non-aqueous organic solvents like dichloromethane (CH₂Cl₂).\n\nStep 2: Selectivity of primary alcohol oxidation:\nIn aqueous media, aldehydes exist in equilibrium with aldehyde hydrates (gem-diols), which are rapidly over-oxidized by chromic acid to carboxylic acids.\nBecause PCC operates under strictly anhydrous conditions, no gem-diol hydrate can form. Consequently, the oxidation cleanly stops at the aldehyde stage:\nR–CH₂OH —(PCC, CH₂Cl₂)→ R–CHO\n\nStep 3: Therefore, PCC selectively converts primary alcohols to aldehydes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4076,
    data: {
      question: "When vapors of an alcohol are passed over red-hot copper catalyst at 573 K, which class of alcohol undergoes DEHYDRATION to yield an alkene instead of dehydrogenation?",
      option_a: "Primary (1°) alcohol",
      option_b: "Tertiary (3°) alcohol",
      option_c: "Secondary (2°) alcohol",
      option_d: "Methanol",
      "correct_option": "B",
      explanation: "Step 1: Catalytic action of Cu at 573 K:\nPassing alcohol vapors over heated metallic copper at 573 K serves as a classic diagnostic test for alcohol classification:\n- 1° alcohols undergo dehydrogenation to form aldehydes: RCH₂OH —(Cu, 573 K)→ RCHO + H₂\n- 2° alcohols undergo dehydrogenation to form ketones: R₂CHOH —(Cu, 573 K)→ R₂CO + H₂\n\nStep 2: Behavior of tertiary (3°) alcohols:\nTertiary alcohols (such as (CH₃)₃COH) have no α-hydrogen atom on the carbinol carbon to lose for dehydrogenation. Instead, under the catalytic influence of hot copper, they undergo intramolecular dehydration to eliminate a water molecule, yielding an alkene (e.g., 2-methylpropene):\n(CH₃)₃COH —(Cu, 573 K)→ (CH₃)₂C=CH₂ + H₂O\n\nStep 3: Therefore, tertiary (3°) alcohols give alkenes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4077,
    data: {
      question: "Which of the following oxidizing agents CANNOT be used to selectively oxidize a primary alcohol to an aldehyde because it causes over-oxidation directly to a carboxylic acid?",
      option_a: "Pyridinium chlorochromate (PCC)",
      option_b: "Collins reagent (CrO₃·2C₅H₅N in CH₂Cl₂)",
      option_c: "Acidified potassium permanganate (KMnO₄ / H₂SO₄)",
      option_d: "Copper metal at 573 K",
      "correct_option": "C",
      explanation: "Step 1: Strong oxidizing agents:\nPotassium permanganate in acidic or alkaline medium (KMnO₄ / H⁺) and acidified potassium dichromate (K₂Cr₂O₇ / H₂SO₄) are powerful oxidizing agents. In aqueous medium, the initially formed aldehyde is rapidly hydrated to a gem-diol, which is immediately oxidized to a carboxylic acid with the same number of carbon atoms:\nR–CH₂OH —(KMnO₄, H⁺)→ R–COOH\n\nStep 2: Mild selective agents:\nPCC, Collins reagent, and hot Cu at 573 K selectively yield aldehydes without further oxidation.\n\nStep 3: Therefore, acidified KMnO₄ cannot be used to isolate aldehydes from primary alcohols.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4078,
    data: {
      question: "What is the major organic product formed when 1-methylcyclopentene undergoes hydroboration-oxidation with B₂H₆ followed by alkaline H₂O₂?",
      option_a: "1-Methylcyclopentanol",
      option_b: "trans-2-Methylcyclopentanol",
      option_c: "cis-2-Methylcyclopentanol",
      option_d: "1-Methylcyclopentane-1,2-diol",
      "correct_option": "B",
      explanation: "Step 1: Regiochemistry of hydroboration:\nHydroboration adds H and B across the double bond in an anti-Markovnikov sense. The boron atom attaches to the less substituted, less sterically hindered carbon (C-2), while hydrogen attaches to C-1.\n\nStep 2: Stereochemistry:\nThe addition of BH₃ across the double bond is a concerted syn-addition (both H and B add to the same face of the ring). Subsequent oxidation with alkaline H₂O₂ proceeds with complete retention of configuration at C-2, replacing B with –OH on the same face.\n\nStep 3: Relative orientation of –CH₃ and –OH:\nSince H and –OH are added syn to the double bond, the original methyl group at C-1 and the incoming –OH group at C-2 end up pointing in opposite directions, resulting in the trans-isomer: trans-2-methylcyclopentanol.\n\nStep 4: Therefore, trans-2-methylcyclopentanol is the major product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4079,
    data: {
      question: "Which of the following reducing agents will selectively reduce an aldehyde or ketone carbonyl group to an alcohol WITHOUT reducing an ester or carboxylic acid group present in the same molecule?",
      option_a: "Sodium borohydride (NaBH₄)",
      option_b: "Lithium aluminium hydride (LiAlH₄)",
      option_c: "Hydrogen gas with Raney Nickel at high pressure",
      option_d: "Sodium in liquid ammonia",
      "correct_option": "A",
      explanation: "Step 1: Reducing strength comparison:\n- Lithium aluminium hydride (LiAlH₄) is a powerful, non-selective reducing agent that reduces aldehydes, ketones, esters, carboxylic acids, acyl chlorides, and amides.\n- Sodium borohydride (NaBH₄) is a mild, chemoselective hydride-transfer reducing agent.\n\nStep 2: Chemoselectivity of NaBH₄:\nNaBH₄ readily reduces aldehydes to primary alcohols and ketones to secondary alcohols, but it reacts so slowly with esters, amides, and carboxylic acids that it leaves them completely unaffected under normal reaction conditions.\n\nStep 3: Therefore, NaBH₄ is the selective reagent.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4080,
    data: {
      question: "Reduction of an unsymmetrical dialkyl ketone (R–CO–R') with sodium borohydride (NaBH₄) yields which type of alcohol?",
      option_a: "Primary alcohol",
      option_b: "Secondary alcohol",
      option_c: "Tertiary alcohol",
      option_d: "Phenol",
      "correct_option": "B",
      explanation: "Step 1: Reaction of ketone with hydride donor:\nR–CO–R' + NaBH₄ —(H₂O / MeOH)→ R–CH(OH)–R'\n\nStep 2: Nature of the product:\nThe carbonyl carbon (–C=O) is bonded to two alkyl groups. Hydride transfer adds a hydrogen atom to this carbon, converting it into a secondary carbinol carbon (–CH(OH)–) bonded to two carbon groups.\n\nStep 3: Therefore, reduction of a ketone always yields a secondary (2°) alcohol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4081,
    data: {
      question: "In the Kolbe-Schmitt reaction, sodium phenoxide is heated with carbon dioxide (CO₂) at 400 K under 4–7 atm pressure, followed by acidification. What is the major product formed?",
      option_a: "Benzaldehyde",
      option_b: "Benzoic acid",
      option_c: "Salicylic acid (2-hydroxybenzoic acid)",
      option_d: "p-Hydroxybenzoic acid",
      "correct_option": "C",
      explanation: "Step 1: Activation of phenol:\nPhenol is treated with aqueous NaOH to generate sodium phenoxide (C₆H₅O⁻Na⁺). The phenoxide ion is significantly more nucleophilic than neutral phenol towards weak electrophiles.\n\nStep 2: Electrophilic attack by CO₂:\nCarbon dioxide (a weak electrophile) attacks the activated phenoxide ring primarily at the ortho position (partially guided by coordination with the Na⁺ counter-ion in non-polar/solid phase) at ~400 K and 4–7 atm:\nC₆H₅ONa + CO₂ —(400 K, 4-7 atm)→ Sodium salicylate\n\nStep 3: Acidification:\nTreatment with mineral acid (HCl) protonates the carboxylate to yield salicylic acid (2-hydroxybenzoic acid) as the major product.\n\nStep 4: Therefore, salicylic acid is formed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4082,
    data: {
      question: "In the Reimer-Tiemann reaction, phenol is heated with chloroform (CHCl₃) in the presence of aqueous sodium hydroxide at 340 K, followed by acid hydrolysis. What is the active electrophilic intermediate and the major product formed?",
      option_a: "Dichlorocarbene (:CCl₂) intermediate and salicylaldehyde (2-hydroxybenzaldehyde) product",
      option_b: "Trichloromethyl anion intermediate and salicylic acid product",
      option_c: "Carbocation intermediate and benzoic acid product",
      option_d: "Formyl cation intermediate and benzaldehyde product",
      "correct_option": "A",
      explanation: "Step 1: Generation of the reactive intermediate:\nHydroxide ion abstracts the acidic proton from chloroform, followed by α-elimination of a chloride ion to generate neutral, electron-deficient dichlorocarbene (:CCl₂):\nCHCl₃ + OH⁻ ⇌ :CCl₃⁻ + H₂O → :CCl₂ + Cl⁻\n\nStep 2: Electrophilic attack on phenoxide:\nThe electron-deficient singlet dichlorocarbene acts as an electrophile and attacks the ortho position of the electron-rich phenoxide ring.\n\nStep 3: Hydrolysis:\nSubsequent alkaline hydrolysis of the resulting benzal chloride intermediate and acidification gives salicylaldehyde (2-hydroxybenzaldehyde) as the major product.\n\nStep 4: Therefore, the intermediate is :CCl₂ and the product is salicylaldehyde.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4083,
    data: {
      question: "In the Williamson ether synthesis, the reaction of sodium tert-butoxide with ethyl bromide yields ethyl tert-butyl ether. However, reacting tert-butyl bromide with sodium ethoxide yields 2-methylpropene instead of ether. Why?",
      option_a: "Because sodium ethoxide is an oxidizing agent",
      option_b: "Because tert-butyl bromide undergoes rearrangement",
      option_c: "Because ethoxide ion acts as a strong base with 3° alkyl halides, causing E2 elimination rather than S_N2 substitution",
      option_d: "Because ethyl bromide is an unreactive substrate",
      "correct_option": "C",
      explanation: "Step 1: Mechanism of Williamson ether synthesis:\nWilliamson ether synthesis involves an S_N2 displacement of halide by an alkoxide ion: R'O⁻ + R–X → R'–O–R + X⁻.\n\nStep 2: Limitation with tertiary alkyl halides:\nFor efficient S_N2 substitution, the alkyl halide MUST be primary (1°) or methyl. When a tertiary alkyl halide (such as tert-butyl bromide) is treated with a strong base/nucleophile like sodium ethoxide (C₂H₅O⁻Na⁺), the severe steric crowding at the tertiary carbon completely blocks backside S_N2 attack. Instead, the strongly basic ethoxide abstracts a β-proton, undergoing E2 elimination as the exclusive pathway to give 2-methylpropene (isobutene):\n(CH₃)₃C–Br + C₂H₅O⁻Na⁺ → (CH₃)₂C=CH₂ + C₂H₅OH + NaBr\n\nStep 3: Successful route to tert-butyl ethyl ether:\nUse primary alkyl halide (ethyl bromide) with tertiary alkoxide (sodium tert-butoxide):\n(CH₃)₃C–O⁻Na⁺ + CH₃CH₂Br → (CH₃)₃C–O–CH₂CH₃ + NaBr (Clean S_N2).\n\nStep 4: Therefore, Option (C) is the correct explanation.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4084,
    data: {
      question: "Which of the following reagents is the most suitable for oxidizing 2-methylpentan-1-ol selectively to 2-methylpentanal without forming 2-methylpentanoic acid?",
      option_a: "Acidified potassium dichromate (K₂Cr₂O₇ / H₂SO₄)",
      option_b: "Aqueous sodium hypochlorite",
      option_c: "Chromium trioxide in pyridine (Collins reagent / Sarrett reagent)",
      option_d: "Alkaline potassium permanganate (KMnO₄ / KOH)",
      "correct_option": "C",
      explanation: "Step 1: Requirement for selective oxidation:\n2-Methylpentan-1-ol is a primary (1°) alcohol. Converting it cleanly to the corresponding aldehyde (2-methylpentanal) requires an anhydrous, mild chromium(VI) reagent that does not allow hydration of the aldehyde to a carboxylic acid precursor.\n\nStep 2: Reagents:\n- Collins reagent (CrO₃·2C₅H₅N in dichloromethane) or PCC (pyridinium chlorochromate) smoothly stops the oxidation at the aldehyde stage under non-aqueous conditions.\n- In contrast, K₂Cr₂O₇/H₂SO₄ and alkaline KMnO₄ are strong aqueous oxidants that rapidly over-oxidize primary alcohols to carboxylic acids.\n\nStep 3: Therefore, CrO₃-pyridine is the suitable reagent.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 74 Part 1 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 74 Part 1 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
