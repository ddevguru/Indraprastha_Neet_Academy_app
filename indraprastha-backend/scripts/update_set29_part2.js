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
    id: 1268,
    payload: {
      question: "Reductive ozonolysis of 3-methylpent-2-ene yields:",
      option_a: "Only aldehydes",
      option_b: "Only ketones",
      option_c: "A mixture of an aldehyde and a ketone",
      option_d: "Only carboxylic acids",
      correct_option: "C",
      explanation: "The structure of 3-methylpent-2-ene is CH₃−CH=C(CH₃)−CH₂CH₃.\nDuring reductive ozonolysis (O₃ followed by Zn/H₂O), the double bond is cleaved oxidatively:\n- The CH₃−CH= part forms ethanal (acetaldehyde, an aldehyde): CH₃CHO.\n- The =C(CH₃)−CH₂CH₃ part forms butan-2-one (ethyl methyl ketone, a ketone): CH₃−CO−CH₂CH₃.\nThus, both an aldehyde and a ketone are formed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1269,
    payload: {
      question: "Reductive ozonolysis of hexa-1,5-diene (CH₂=CH−CH₂−CH₂−CH=CH₂) produces:",
      option_a: "Two moles of formaldehyde and one mole of butanedial",
      option_b: "Two moles of acetaldehyde and one mole of glyoxal",
      option_c: "Two moles of formaldehyde and one mole of propanedial",
      option_d: "Two moles of acetone and one mole of formic acid",
      correct_option: "A",
      explanation: "Hexa-1,5-diene possesses two terminal double bonds at C1 and C5:\nCH₂=CH−CH₂−CH₂−CH=CH₂\nCleavage of the two double bonds with O₃ / Zn-H₂O produces:\n- Two terminal =CH₂ groups become two moles of formaldehyde (HCHO).\n- The internal −CH−CH₂−CH₂−CH− fragment becomes one mole of butanedial (succinaldehyde, OHC−CH₂−CH₂−CHO).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1270,
    payload: {
      question: "Reductive ozonolysis of any straight-chain (unbranched) mono-alkene always produces:",
      option_a: "Only ketones",
      option_b: "Only aldehydes",
      option_c: "One ketone and one aldehyde",
      option_d: "Only carboxylic acids",
      correct_option: "B",
      explanation: "In an unbranched (straight-chain) alkene, every doubly bonded carbon atom has at least one hydrogen attached to it (i.e., −CH=CH− or −CH=CH₂).\nUpon reductive ozonolysis with Zn and H₂O, carbons of the type =CH− are converted into formyl groups (−CHO).\nSince neither doubly bonded carbon has two alkyl branches, no ketones can be formed; only aldehydes are produced.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1271,
    payload: {
      question: "Which of the following alkenes upon vigorous oxidation with hot acidified KMnO₄ produces acetone and acetic acid?",
      option_a: "2-Methylpropene",
      option_b: "2-Methylbut-2-ene",
      option_c: "Pent-2-ene",
      option_d: "But-2-ene",
      correct_option: "B",
      explanation: "Under hot, vigorous KMnO₄ oxidation, the double bond is cleaved completely:\n- A doubly bonded carbon bearing two alkyl groups, =C(R)₂, is oxidized to a ketone (R₂C=O).\n- A doubly bonded carbon bearing one hydrogen, =CH(R), is oxidized to a carboxylic acid (RCOOH).\nFor 2-methylbut-2-ene, (CH₃)₂C=CH−CH₃:\n- (CH₃)₂C= gives acetone ((CH₃)₂C=O).\n- =CH−CH₃ gives ethanoic acid (acetic acid, CH₃COOH).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1272,
    payload: {
      question: "One mole of a hydrocarbon on reductive ozonolysis produces one mole of glyoxal (CHO−CHO) and two moles of formaldehyde (HCHO). The hydrocarbon is:",
      option_a: "But-2-yne",
      option_b: "Buta-1,3-diene",
      option_c: "But-1-ene",
      option_d: "Cyclobutene",
      correct_option: "B",
      explanation: "Joining the carbonyl fragments back together by replacing =O with double bonds:\nFormaldehyde (CH₂=O) + Glyoxal (O=CH−CH=O) + Formaldehyde (O=CH₂)\nJoining them gives: CH₂=CH−CH=CH₂ (buta-1,3-diene).\nThus, 1 mole of buta-1,3-diene yields 2 moles of HCHO and 1 mole of CHO−CHO.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1273,
    payload: {
      question: "An alkene on oxidative ozonolysis gives only propanoic acid (CH₃CH₂COOH). The alkene is:",
      option_a: "Hex-1-ene",
      option_b: "Hex-3-ene",
      option_c: "Hex-2-ene",
      option_d: "2-Methylpent-2-ene",
      correct_option: "B",
      explanation: "Under oxidative ozonolysis, each =CH−R fragment is converted into RCOOH.\nSince only propanoic acid (CH₃CH₂COOH) is formed, the alkene must be symmetrical with two identical CH₃CH₂CH= halves:\nCH₃CH₂CH=CHCH₂CH₃ (hex-3-ene).\nOxidative cleavage of hex-3-ene yields two molecules of propanoic acid.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1274,
    payload: {
      question: "Which of the following compounds upon reductive ozonolysis (or controlled ozonolysis) yields butane-2,3-dione (diacetyl, CH₃−CO−CO−CH₃)?",
      option_a: "But-1-ene",
      option_b: "But-2-yne",
      option_c: "Buta-1,3-diene",
      option_d: "Cyclobutane",
      correct_option: "B",
      explanation: "Alkynes react with ozone to form an ozonide that on reductive cleavage with Zn/H₂O gives an α-dicarbonyl compound (1,2-diketone):\nCH₃−C≡C−CH₃ + O₃ —(Zn/H₂O)→ CH₃−CO−CO−CH₃ (butane-2,3-dione).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1275,
    payload: {
      question: "When but-1-yne is treated with warm dilute H₂SO₄ in the presence of HgSO₄ catalyst, the predominant product is:",
      option_a: "Butan-2-one",
      option_b: "Butanal",
      option_c: "Butanoic acid",
      option_d: "But-2-yne",
      correct_option: "A",
      explanation: "Hydration of terminal alkynes follows Markovnikov's rule:\nAddition of H₂O to but-1-yne (CH₃CH₂−C≡CH) adds the −OH group to the internal sp-carbon (C2):\nCH₃CH₂−C(OH)=CH₂ (an enol).\nThis unstable enol tautomerizes rapidly to its keto form, butan-2-one (CH₃CH₂−CO−CH₃).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1276,
    payload: {
      question: "Reductive ozonolysis of an alkene with the general formula R₂C=CHR' produces:",
      option_a: "A ketone (R₂C=O) and an aldehyde (R'CHO)",
      option_b: "Two molecules of aldehydes",
      option_c: "Two molecules of ketones",
      option_d: "A carboxylic acid and a ketone",
      correct_option: "A",
      explanation: "In the alkene R₂C=CHR':\n- The disubstituted carbon R₂C= has no hydrogen atoms, so upon reductive ozonolysis it forms a ketone, R₂C=O.\n- The monosubstituted carbon =CHR' has one hydrogen atom, so it forms an aldehyde, R'CHO.\nTherefore, a ketone and an aldehyde are produced.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1277,
    payload: {
      question: "The reaction of cis-but-2-ene with cold, dilute alkaline KMnO₄ (Baeyer's reagent) yields:",
      option_a: "meso-Butane-2,3-diol",
      option_b: "(±)-Butane-2,3-diol (racemic mixture)",
      option_c: "Butan-2-ol",
      option_d: "Butane-1,4-diol",
      correct_option: "A",
      explanation: "Baeyer's reagent (cold dilute alkaline KMnO₄) undergoes stereospecific syn-dihydroxylation.\nSyn-addition to a cis-alkene (cis + syn) yields the meso stereoisomer:\ncis-but-2-ene + KMnO₄ / OH⁻ → meso-butane-2,3-diol.\n(Syn-addition to a trans-alkene yields the (±)-racemic mixture).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1278,
    payload: {
      question: "The reaction of trans-but-2-ene with cold dilute alkaline KMnO₄ produces:",
      option_a: "meso-Butane-2,3-diol",
      option_b: "(±)-Butane-2,3-diol (racemic mixture)",
      option_c: "2-Butanone",
      option_d: "Ethanal",
      correct_option: "B",
      explanation: "Cold dilute alkaline KMnO₄ brings about stereospecific syn-addition of two −OH groups.\nSyn-addition across a trans-alkene (trans + syn) produces a pair of enantiomers in equal amounts, i.e., a racemic mixture, (±)-butane-2,3-diol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1279,
    payload: {
      question: "Which pair of reagents can be used to achieve syn-dihydroxylation of an alkene to form a cis-1,2-diol?",
      option_a: "Cold dilute alkaline KMnO₄ or OsO₄ followed by NaHSO₃",
      option_b: "Concentrated H₂SO₄ followed by H₂O",
      option_c: "Peracid (RCOOOH) followed by H₃O⁺",
      option_d: "Br₂ water followed by NaOH",
      correct_option: "A",
      explanation: "Both cold dilute alkaline KMnO₄ (Baeyer's reagent) and osmium tetroxide (OsO₄ followed by reductive workup with NaHSO₃) deliver two hydroxyl groups to the same face of the alkene double bond via cyclic metallate ester intermediates, resulting in syn-dihydroxylation (cis-diols).\nPeracid followed by aqueous acid gives anti-dihydroxylation (trans-diols).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1280,
    payload: {
      question: "When cyclopentene is treated with peroxybenzoic acid (C₆H₅COOOH) followed by aqueous acid hydrolysis (H₃O⁺), the product obtained is:",
      option_a: "cis-Cyclopentane-1,2-diol",
      option_b: "Cyclopentanone",
      option_c: "trans-Cyclopentane-1,2-diol",
      option_d: "Cyclopentanol",
      correct_option: "C",
      explanation: "Epoxidation of cyclopentene with peroxy acid forms an epoxide (oxirane) ring.\nSubsequent acid-catalyzed ring opening involves nucleophilic attack by H₂O from the backside (anti-attack) on the protonated epoxide.\nThis results in anti-dihydroxylation, yielding trans-cyclopentane-1,2-diol.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1281,
    payload: {
      question: "Which of the following hydrocarbons does NOT decolorize cold, dilute neutral or alkaline KMnO₄ solution?",
      option_a: "Ethene",
      option_b: "Propene",
      option_c: "Ethane",
      option_d: "Acetylene",
      correct_option: "C",
      explanation: "Cold dilute KMnO₄ (Baeyer's reagent) oxidizes unsaturated hydrocarbons (alkenes and alkynes) with the disappearance of its purple color (Baeyer's test for unsaturation).\nEthane is a saturated alkane containing only strong C−C and C−H σ-bonds, and is unreactive toward Baeyer's reagent at room temperature.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1282,
    payload: {
      question: "Two unlabelled bottles contain liquid hydrocarbons: one is cyclohexane and the other is cyclohexene. They can be distinguished chemically by adding:",
      option_a: "Bromine in CCl₄ solution",
      option_b: "Aqueous sodium chloride",
      option_c: "Dilute hydrochloric acid",
      option_d: "Fehling's solution",
      correct_option: "A",
      explanation: "Cyclohexene is an alkene and rapidly decolorizes reddish-brown bromine in CCl₄ by forming 1,2-dibromocyclohexane without evolution of HBr.\nCyclohexane is a saturated cycloalkane and does not react with bromine in CCl₄ in the dark, leaving the reddish-brown color unchanged.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1283,
    payload: {
      question: "Which of the following alkenes reacts slowest with bromine in CCl₄ due to extreme steric hindrance?",
      option_a: "Ethene, CH₂=CH₂",
      option_b: "2,3-Dimethylbut-2-ene, (CH₃)₂C=C(CH₃)₂",
      option_c: "Propene, CH₃CH=CH₂",
      option_d: "cis-But-2-ene, CH₃CH=CHCH₃",
      correct_option: "B",
      explanation: "In 2,3-dimethylbut-2-ene (tetramethylethylene), four bulky methyl groups surround the double bond.\nAlthough methyl groups release electron density, the immense steric hindrance severely restricts electrophilic approach of the incoming bulky bromine species, significantly reducing the reaction rate compared to less hindered alkenes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1284,
    payload: {
      question: "Addition of two moles of HBr to propyne (CH₃−C≡CH) in the absence of peroxides yields:",
      option_a: "2,2-Dibromopropane",
      option_b: "1,2-Dibromopropane",
      option_c: "1,1-Dibromopropane",
      option_d: "1,3-Dibromopropane",
      correct_option: "A",
      explanation: "The electrophilic addition proceeds in two successive Markovnikov steps:\n1. CH₃−C≡CH + HBr → CH₃−C(Br)=CH₂ (2-bromopropene).\n2. CH₃−C(Br)=CH₂ + HBr → CH₃−C(Br)₂−CH₃ (2,2-dibromopropane).\nIn the second step, protonation gives the carbocation stabilized by resonance with the lone pair of bromine, directing the second bromide to the same carbon, forming a geminal dibromide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1285,
    payload: {
      question: "Assertion (A): In non-conjugated enynes (hydrocarbons with separated double and triple bonds), electrophilic addition of bromine occurs preferentially at the double bond.\nReason (R): The alkene double bond has greater electron density and higher HOMO energy, making it more nucleophilic towards electrophiles than the alkyne triple bond.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A).",
      option_b: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A).",
      option_c: "(A) is true but (R) is false.",
      option_d: "(A) is false but (R) is true.",
      correct_option: "A",
      explanation: "In an isolated enyne, electrophiles preferentially attack the double bond because the π-electrons of an alkene (sp² carbon) are held less tightly by the nucleus than the π-electrons of an alkyne (sp carbon with 50% s-character).\nMoreover, electrophilic addition to an alkene proceeds via a more stable alkyl/bromonium intermediate rather than an unstable vinylic carbocation.\nThus, both (A) and (R) are true and (R) correctly explains (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1286,
    payload: {
      question: "When acetylene (ethyne) is passed into dilute sulfuric acid containing mercuric sulfate at 333 K, the final stable organic product is:",
      option_a: "Ethanol",
      option_b: "Ethanoic acid",
      option_c: "Ethanal (Acetaldehyde)",
      option_d: "Diethyl ether",
      correct_option: "C",
      explanation: "Acetylene undergoes electrophilic hydration catalyzed by Hg²⁺ and H⁺:\nHC≡CH + H₂O → [H₂C=CH−OH] (vinyl alcohol)\nVinyl alcohol is an unstable enol that spontaneously tautomerizes to ethanal (acetaldehyde, CH₃CHO).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1287,
    payload: {
      question: "Addition of HBr to 3,3-dimethylbut-1-ene in the absence of peroxides yields predominantly:",
      option_a: "3,3-Dimethyl-1-bromobutane",
      option_b: "3,3-Dimethyl-2-bromobutane",
      option_c: "2,3-Dimethyl-2-bromobutane",
      option_d: "2,2-Dimethyl-1-bromobutane",
      correct_option: "C",
      explanation: "Addition proceeds via a carbocation intermediate:\n1. Protonation of (CH₃)₃C−CH=CH₂ gives a 2° carbocation: (CH₃)₃C−C⁺H−CH₃.\n2. This 2° carbocation undergoes a 1,2-methyl shift to form the much more stable 3° carbocation: (CH₃)₂C⁺−CH(CH₃)₂.\n3. Attack of Br⁻ on the rearranged 3° carbocation gives 2-bromo-2,3-dimethylbutane as the major product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1288,
    payload: {
      question: "A tertiary alkyl halide is obtained as the major product when HBr is added to:",
      option_a: "Propene",
      option_b: "But-1-ene",
      option_c: "Pent-1-ene",
      option_d: "2-Methylpropene",
      correct_option: "D",
      explanation: "In 2-methylpropene, (CH₃)₂C=CH₂, protonation occurs at the CH₂ carbon to generate the highly stable 3° tert-butyl carbocation, (CH₃)₃C⁺.\nBromide ion attacks this tertiary center to yield tert-butyl bromide (2-bromo-2-methylpropane), a tertiary alkyl halide.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1289,
    payload: {
      question: "When HCl is added to propene in the presence of benzoyl peroxide, the major product formed is:",
      option_a: "1-Chloropropane (n-propyl chloride)",
      option_b: "2-Chloropropane (isopropyl chloride)",
      option_c: "1,2-Dichloropropane",
      option_d: "Allyl chloride",
      correct_option: "B",
      explanation: "The peroxide effect (anti-Markovnikov addition) operates ONLY with HBr.\nIt does NOT occur with HCl because the H−Cl bond is too strong (431 kJ/mol) for the alkoxy free radical to abstract hydrogen in the propagation step.\nConsequently, HCl adds to propene via the normal ionic electrophilic mechanism following Markovnikov's rule, yielding 2-chloropropane (isopropyl chloride) as the major product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1290,
    payload: {
      question: "The reactive intermediate formed in the first step of the ionic addition of bromine (Br₂) to ethene in CCl₄ is:",
      option_a: "A cyclic bromonium ion",
      option_b: "A free radical",
      option_c: "A carbanion",
      option_d: "A carbene",
      correct_option: "A",
      explanation: "Electrophilic addition of Br₂ across an alkene double bond proceeds via polarization of the Br−Br bond followed by attack of π-electrons.\nThe electrophilic bromine atom forms a three-membered cyclic bromonium ion intermediate, which prevents carbocation rearrangement and ensures anti-stereospecific opening by the bromide ion.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1291,
    payload: {
      question: "Reaction of 3-phenylpropene (C₆H₅CH₂CH=CH₂) with HBr in the presence of benzoyl peroxide gives primarily:",
      option_a: "3-Phenyl-2-bromopropane",
      option_b: "3-Phenyl-1-bromopropane",
      option_c: "1-Phenyl-2-bromopropane",
      option_d: "1-Phenyl-1-bromopropane",
      correct_option: "B",
      explanation: "In the presence of peroxide, addition of HBr follows a free-radical chain mechanism:\nBromine radical (Br•) adds to the terminal double-bond carbon (C1) to generate the secondary alkyl radical: C₆H₅CH₂−ĊH−CH₂Br.\nThis radical then abstracts a hydrogen from HBr to form 3-phenyl-1-bromopropane (1-bromo-3-phenylpropane).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1292,
    payload: {
      question: "When propene reacts with HBr in the absence of peroxides, product A is formed; in the presence of peroxides, product B is formed. A and B are respectively:",
      option_a: "1-Bromopropane and 2-Bromopropane",
      option_b: "1-Bromopropane and 1-Bromopropane",
      option_c: "2-Bromopropane and 1-Bromopropane",
      option_d: "2-Bromopropane and 2-Bromopropane",
      correct_option: "C",
      explanation: "1. In the absence of peroxides, HBr adds to propene via an ionic mechanism (Markovnikov's rule) giving 2-bromopropane (isopropyl bromide) as product A.\n2. In the presence of organic peroxides, HBr adds via a free-radical mechanism (peroxide effect or Kharasch effect) giving 1-bromopropane (n-propyl bromide) as product B.\nTherefore, A is 2-bromopropane and B is 1-bromopropane.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1293,
    payload: {
      question: "Which of the following statements correctly distinguishes the Markovnikov addition of HBr to an alkene from its peroxide-catalyzed addition?",
      option_a: "Markovnikov addition proceeds via a carbocation intermediate (ionic), whereas peroxide addition proceeds via a free-radical intermediate.",
      option_b: "Both additions proceed via free-radical intermediates.",
      option_c: "Both additions proceed via cyclic halonium ions.",
      option_d: "Markovnikov addition is a free-radical process, while peroxide addition is an ionic process.",
      correct_option: "A",
      explanation: "In the absence of peroxides, H⁺ attacks the double bond first to generate the more stable carbocation (ionic pathway, Markovnikov's rule).\nIn the presence of peroxides, homolytic cleavage initiates a radical chain where Br• adds first to generate the more stable free radical (free-radical pathway, anti-Markovnikov rule).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1294,
    payload: {
      question: "Reaction of 3-methylbut-1-ene with HBr in the absence of peroxide produces mainly:",
      option_a: "1-Bromo-3-methylbutane",
      option_b: "2-Bromo-2-methylbutane",
      option_c: "2-Bromo-3-methylbutane",
      option_d: "1,2-Dibromo-3-methylbutane",
      correct_option: "B",
      explanation: "Electrophilic addition of HBr to 3-methylbut-1-ene:\n1. Protonation of CH₃−CH(CH₃)−CH=CH₂ gives the 2° carbocation: CH₃−CH(CH₃)−C⁺H−CH₃.\n2. A 1,2-hydride shift occurs from the adjacent tertiary carbon to form the more stable 3° carbocation: CH₃−C⁺(CH₃)−CH₂−CH₃.\n3. Bromide ion attacks this 3° carbocation to give 2-bromo-2-methylbutane as the major rearranged Markovnikov product.\nTherefore, Option (B) is the correct answer."
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
    console.log(`Set 29 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
