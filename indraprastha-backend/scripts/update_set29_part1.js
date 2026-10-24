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
    id: 1240,
    payload: {
      question: "The catalyst used for the conversion of ethyne (acetylene) into ethanal (acetaldehyde) by hydration in the presence of warm dilute H₂SO₄ is:",
      option_a: "HgSO₄",
      option_b: "Pd / C",
      option_c: "Ni",
      option_d: "FeCl₃",
      correct_option: "A",
      explanation: "In the Kucherov reaction, alkynes undergo hydration upon treatment with warm dilute sulfuric acid (H₂SO₄) in the presence of mercuric sulfate (HgSO₄) as catalyst at 333 K.\nEthyne initially forms vinyl alcohol (an enol), which rapidly tautomerizes to ethanal (acetaldehyde).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1241,
    payload: {
      question: "When propyne (CH₃−C≡CH) is treated with dilute H₂SO₄ in the presence of HgSO₄ at 333 K, the final product formed is:",
      option_a: "Propanal",
      option_b: "Propanoic acid",
      option_c: "Propanone (Acetone)",
      option_d: "1-Propanol",
      correct_option: "C",
      explanation: "Hydration of propyne (CH₃−C≡CH) follows Markovnikov's rule:\n1. Addition of H₂O across the triple bond forms the enol: CH₃−C(OH)=CH₂ (prop-1-en-2-ol).\n2. This unstable enol rapidly tautomerizes (keto-enol tautomerism) to give the stable ketone, propanone (CH₃−CO−CH₃).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1242,
    payload: {
      question: "Benzene reacts with chlorine in the presence of anhydrous AlCl₃ in the dark to form:",
      option_a: "Chlorobenzene",
      option_b: "Hexachlorocyclohexane (BHC)",
      option_c: "Benzyl chloride",
      option_d: "1,2-Dichlorobenzene only",
      correct_option: "A",
      explanation: "In the presence of a Lewis acid catalyst such as anhydrous AlCl₃ in the dark, benzene undergoes electrophilic aromatic substitution (EAS).\nAnhydrous AlCl₃ polarizes the chlorine molecule generating the electrophile Cl⁺ (chloronium ion), which substitutes a ring hydrogen to form chlorobenzene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1243,
    payload: {
      question: "Which of the following statements concerning benzene is INCORRECT?",
      option_a: "All twelve atoms in benzene lie in the same plane.",
      option_b: "All carbon-carbon bond lengths in benzene are identical (139 pm).",
      option_c: "Benzene readily decolorizes bromine in carbon tetrachloride at room temperature.",
      option_d: "Benzene exhibits extra stability due to resonance energy of approximately 150 kJ/mol.",
      correct_option: "C",
      explanation: "Unlike typical alkenes, benzene does not readily undergo addition reactions and does not decolorize bromine in CCl₄ or aqueous bromine water under normal conditions.\nThis resistance to addition reactions is due to the high aromatic resonance stabilization energy (approx. 150 kJ/mol) of its delocalized 6 π-electron sextet.\nBenzene instead undergoes electrophilic substitution reactions.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1244,
    payload: {
      question: "When sodium benzoate is heated with soda lime (NaOH + CaO), the hydrocarbon obtained is:",
      option_a: "Toluene",
      option_b: "Methane",
      option_c: "Benzene",
      option_d: "Biphenyl",
      correct_option: "C",
      explanation: "Decarboxylation of the sodium salt of benzoic acid occurs when sodium benzoate is heated with soda lime (a mixture of NaOH and CaO in 3:1 ratio):\nC₆H₅COONa + NaOH → C₆H₆ + Na₂CO₃\nBenzene is formed with the removal of carbon dioxide as sodium carbonate.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1245,
    payload: {
      question: "The conversion of chlorobenzene to benzene by catalytic hydrogenation using Ni-Al alloy in alkaline medium represents:",
      option_a: "Reduction",
      option_b: "Oxidation",
      option_c: "Electrophilic addition",
      option_d: "Elimination",
      correct_option: "A",
      explanation: "The conversion involves replacement of the chlorine atom by hydrogen:\nC₆H₅Cl + 2[H] → C₆H₆ + HCl\nReplacement of an electronegative halogen by hydrogen (or addition of hydrogen) is a reduction reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1246,
    payload: {
      question: "Assertion (A): Benzene undergoes electrophilic substitution rather than electrophilic addition.\nReason (R): Electrophilic substitution allows benzene to retain its aromatic sextet and high resonance stability.",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A).",
      option_b: "Both (A) and (R) are true but (R) is NOT the correct explanation of (A).",
      option_c: "(A) is true but (R) is false.",
      option_d: "(A) is false but (R) is true.",
      correct_option: "A",
      explanation: "Electrophilic addition to benzene would convert its cyclic conjugated 6 π-electron aromatic system into a non-aromatic conjugated or unconjugated system, losing resonance energy (~150 kJ/mol).\nIn contrast, electrophilic substitution involves initial addition of the electrophile followed by rapid loss of a proton, which regenerates the fully aromatic ring.\nThus, both (A) and (R) are true and (R) correctly explains (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1247,
    payload: {
      question: "Which of the following reactions is an electrophilic aromatic substitution reaction?",
      option_a: "Reaction of benzene with H₂ in the presence of Ni at high temperature and pressure",
      option_b: "Friedel-Crafts alkylation of benzene with CH₃Cl in the presence of anhydrous AlCl₃",
      option_c: "Reaction of benzene with Cl₂ in the presence of UV light",
      option_d: "Combustion of benzene in excess air",
      correct_option: "B",
      explanation: "In Friedel-Crafts alkylation, anhydrous AlCl₃ generates the carbocation electrophile CH₃⁺, which attacks the benzene ring to replace an H⁺ ion, forming toluene.\nThis is a classic electrophilic aromatic substitution reaction.\nHydrogenation and chlorination under UV light are addition reactions.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1248,
    payload: {
      question: "The correct increasing order of reactivity towards electrophilic nitration for the following compounds is:\n(i) Nitrobenzene\n(ii) Benzene\n(iii) Toluene\n(iv) Phenol",
      option_a: "(i) < (ii) < (iii) < (iv)",
      option_b: "(ii) < (i) < (iii) < (iv)",
      option_c: "(i) < (iii) < (ii) < (iv)",
      option_d: "(iv) < (iii) < (ii) < (i)",
      correct_option: "A",
      explanation: "Reactivity towards electrophilic nitration depends on the electron density on the aromatic ring:\n1. Nitrobenzene has a strongly electron-withdrawing −NO₂ group (−M, −I), strongly deactivating the ring (least reactive).\n2. Benzene has no substituent.\n3. Toluene has a methyl group (−CH₃) which activates the ring via +I effect and hyperconjugation.\n4. Phenol has an −OH group with strong +M resonance donation, making it highly activated.\nTherefore, the increasing order of reactivity is: Nitrobenzene < Benzene < Toluene < Phenol, i.e., (i) < (ii) < (iii) < (iv).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1249,
    payload: {
      question: "Which of the following aromatic compounds is most reactive towards electrophilic aromatic substitution?",
      option_a: "Chlorobenzene",
      option_b: "Benzaldehyde",
      option_c: "Aniline",
      option_d: "Nitrobenzene",
      correct_option: "C",
      explanation: "In aniline (C₆H₅NH₂), the lone pair of electrons on the nitrogen atom is strongly delocalized into the aromatic π-system by resonance (+M effect).\nThis increases the electron density on the ring enormously (especially at ortho and para positions), making aniline exceptionally reactive towards electrophiles.\nChlorobenzene is weakly deactivated (−I > +M), while benzaldehyde and nitrobenzene are strongly deactivated (−M, −I).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1251,
    payload: {
      question: "Among the following compounds, which one is the most reactive towards electrophilic attack?",
      option_a: "Toluene",
      option_b: "Anisole (Methoxybenzene)",
      option_c: "Benzoic acid",
      option_d: "Benzonitrile",
      correct_option: "B",
      explanation: "In anisole (C₆H₅OCH₃), the methoxy group (−OCH₃) provides powerful electron donation through resonance (+M effect) into the aromatic ring, significantly increasing ring electron density.\nMethyl in toluene activates only by weak hyperconjugation and +I effect.\nBenzoic acid (−COOH) and benzonitrile (−CN) are strong electron-withdrawing deactivating groups.\nThus, anisole is the most reactive towards electrophilic attack.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1252,
    payload: {
      question: "When n-hexane is passed over Cr₂O₃ / Al₂O₃ catalyst at 773 K and 10–20 atm pressure, the product formed is:",
      option_a: "Cyclohexane",
      option_b: "Benzene",
      option_c: "Hexene",
      option_d: "Toluene",
      correct_option: "B",
      explanation: "This reaction is known as catalytic reforming or aromatization.\nWhen alkanes having 6 or more carbons are heated at 773 K and 10–20 atm in the presence of oxides of chromium, vanadium, or molybdenum supported on alumina, they undergo dehydrogenation and cyclization to yield aromatic hydrocarbons.\nn-Hexane yields benzene (C₆H₆) with elimination of 4 moles of H₂.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1253,
    payload: {
      question: "Reduction of 2-butyne with H₂ in the presence of Lindlar's catalyst and with Na in liquid NH₃ gives respectively:",
      option_a: "cis-2-butene and trans-2-butene",
      option_b: "trans-2-butene and cis-2-butene",
      option_c: "cis-2-butene and butane",
      option_d: "butane and trans-2-butene",
      correct_option: "A",
      explanation: "1. Hydrogenation of an alkyne using Lindlar's catalyst (Pd/CaCO₃ poisoned with lead acetate/quinoline) proceeds via syn-addition of hydrogen, yielding the cis-alkene (cis-2-butene).\n2. Birch reduction of an alkyne using sodium in liquid ammonia (Na / liq. NH₃) proceeds via anti-addition of hydrogen through a radical-anion intermediate, yielding the trans-alkene (trans-2-butene).\nTherefore, the products are cis-2-butene and trans-2-butene respectively.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1254,
    payload: {
      question: "Lindlar's catalyst, used for stereoselective partial reduction of alkynes to cis-alkenes, consists of:",
      option_a: "Finely divided nickel heated to 573 K",
      option_b: "Palladised barium sulfate (or CaCO₃) deactivated with quinoline or lead salts",
      option_c: "Sodium metal dissolved in liquid ammonia",
      option_d: "Zinc-mercury amalgam with concentrated HCl",
      correct_option: "B",
      explanation: "Lindlar's catalyst is partially deactivated (poisoned) palladium deposited on calcium carbonate (or barium sulfate), with poisons such as quinoline, sulfur, or lead acetate.\nThe poisoning prevents over-reduction of the resulting alkene into an alkane and ensures stereospecific syn-addition, producing cis-alkenes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1255,
    payload: {
      question: "The reagent used for stereoselective anti-reduction of non-terminal alkynes to trans-alkenes is:",
      option_a: "H₂ / Pd-C",
      option_b: "H₂ / Lindlar's catalyst",
      option_c: "Na / liquid NH₃ (Birch reduction)",
      option_d: "LiAlH₄ in dry ether",
      correct_option: "C",
      explanation: "Dissolving metal reduction using alkali metals (such as sodium or lithium) in liquid ammonia (Birch reduction) reduces non-terminal alkynes stereoselectively to trans-alkenes.\nThe mechanism involves sequential single-electron transfers and protonations forming the more stable trans-vinylic radical/anion intermediate.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1256,
    payload: {
      question: "When 2-pentyne is reduced with H₂ over Lindlar's catalyst, the predominant product obtained is:",
      option_a: "trans-2-pentene",
      option_b: "cis-2-pentene",
      option_c: "n-pentane",
      option_d: "1-pentyne",
      correct_option: "B",
      explanation: "Lindlar's catalyst (Pd/CaCO₃ poisoned with quinoline) directs syn-addition of two hydrogen atoms to the carbon-carbon triple bond from the same face of the catalyst surface.\nHence, 2-pentyne (CH₃−C≡C−CH₂CH₃) is converted stereoselectively into cis-2-pentene.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1257,
    payload: {
      question: "The addition of HBr to propene in the presence of benzoyl peroxide yields primarily:",
      option_a: "2-Bromopropane",
      option_b: "1-Bromopropane",
      option_c: "1,2-Dibromopropane",
      option_d: "2,2-Dibromopropane",
      correct_option: "B",
      explanation: "In the presence of an organic peroxide (peroxide effect or Kharasch effect), addition of HBr to an unsymmetrical alkene proceeds via a free-radical chain mechanism.\nThe bromine radical (Br•) adds to the terminal carbon to form the more stable 2° alkyl radical:\nCH₃−CH=CH₂ + Br• → CH₃−ĊH−CH₂Br\nSubsequent hydrogen abstraction from HBr yields 1-bromopropane (anti-Markovnikov product).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1258,
    payload: {
      question: "An alkene on reductive ozonolysis (O₃ followed by Zn / H₂O) produces methanal (formaldehyde) and propanone (acetone). The alkene is:",
      option_a: "2-Methylpropene (Isobutylene)",
      option_b: "But-2-ene",
      option_c: "But-1-ene",
      option_d: "2-Methylbut-2-ene",
      correct_option: "A",
      explanation: "To find the parent alkene from ozonolysis products, remove the carbonyl oxygens and join the carbonyl carbons by a double bond:\nPropanone is (CH₃)₂C=O and methanal is O=CH₂.\nJoining them gives: (CH₃)₂C=CH₂ (2-methylpropene or isobutylene).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1259,
    payload: {
      question: "Which of the following reagents converts an alkene into a vicinal cis-diol (syn-dihydroxylation)?",
      option_a: "Cold dilute alkaline KMnO₄ (Baeyer's reagent)",
      option_b: "Acidified K₂Cr₂O₇",
      option_c: "Concentrated H₂SO₄",
      option_d: "Br₂ in CCl₄",
      correct_option: "A",
      explanation: "Cold, dilute (1%), alkaline solution of potassium permanganate is known as Baeyer's reagent.\nIt reacts with alkenes via a cyclic manganate ester intermediate, resulting in syn-addition of two −OH groups across the double bond to produce vicinal cis-diols (glycols) while decolorizing the purple color of KMnO₄.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1260,
    payload: {
      question: "Ozonolysis of benzene followed by reductive cleavage with Zn and H₂O produces three molecules of:",
      option_a: "Glyoxal (CHO−CHO)",
      option_b: "Oxalic acid (HOOC−COOH)",
      option_c: "Formic acid (HCOOH)",
      option_d: "Acetaldehyde (CH₃CHO)",
      correct_option: "A",
      explanation: "Benzene contains three conjugated double bonds in its resonance hybrid.\nReaction with three moles of ozone forms benzene triozonide (C₆H₆O₉).\nSubsequent reductive hydrolysis with Zn and H₂O cleaves all three ozonide rings, yielding 3 moles of glyoxal (ethanedial, CHO−CHO):\nC₆H₆ + 3O₃ → C₆H₆O₉ —(Zn/H₂O)→ 3 CHO−CHO + 3 H₂O₂\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1261,
    payload: {
      question: "Arrange the following compounds in decreasing order of reactivity towards electrophilic aromatic substitution:\n(I) Phenol\n(II) Toluene\n(III) Benzene\n(IV) Benzoic acid",
      option_a: "I > II > III > IV",
      option_b: "IV > III > II > I",
      option_c: "I > III > II > IV",
      option_d: "II > I > III > IV",
      correct_option: "A",
      explanation: "1. Phenol (I) has an −OH group which strongly activates the ring through +M resonance effect.\n2. Toluene (II) has a −CH₃ group which moderately activates the ring via hyperconjugation and +I effect.\n3. Benzene (III) has no substituents (reference standard).\n4. Benzoic acid (IV) has a −COOH group which strongly deactivates the ring through −M and −I effects.\nTherefore, the decreasing order of reactivity is: I > II > III > IV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1262,
    payload: {
      question: "Among the following ortho/para-directing groups, which one is an activating group acting solely through hyperconjugation and inductive effect rather than resonance (+M)?",
      option_a: "−OH",
      option_b: "−NH₂",
      option_c: "−OCH₃",
      option_d: "−CH₃",
      correct_option: "D",
      explanation: "The −OH, −NH₂, and −OCH₃ groups possess unshared lone pairs on the key atom directly bonded to the aromatic ring and activate the ring strongly through resonance (+M effect).\nIn contrast, the methyl group (−CH₃) has no lone pairs; it activates the aromatic ring moderately through hyperconjugation (σ-π conjugation) and positive inductive (+I) effect, making it the weakest activating group among them.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1263,
    payload: {
      question: "Which of the following substituent groups directs the incoming electrophile to the ortho and para positions of the benzene ring?",
      option_a: "−CHO",
      option_b: "−COOH",
      option_c: "−OCH₃",
      option_d: "−NO₂",
      correct_option: "C",
      explanation: "Groups that have non-bonding lone pairs on the atom directly attached to the benzene ring (such as −OCH₃, −OH, −NH₂, −Cl) donate electron density to the ring via resonance (+M effect).\nResonance structures show that the electron density increases specifically at the ortho and para positions relative to the meta position, making them ortho/para directing.\nCarbonyl (−CHO), carboxylic (−COOH), and nitro (−NO₂) groups withdraw electrons (−M effect) and are meta-directing.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1264,
    payload: {
      question: "The correct sequence of decreasing rate of nitration for the following substituted benzenes is:\n(a) Chlorobenzene\n(b) Benzene\n(c) Toluene\n(d) Nitrobenzene",
      option_a: "c > b > a > d",
      option_b: "c > a > b > d",
      option_c: "b > c > a > d",
      option_d: "d > a > b > c",
      correct_option: "A",
      explanation: "The rate of electrophilic nitration depends directly on electron density in the aromatic ring:\n- Toluene (c): Activated by the +I and hyperconjugative electron-releasing effect of −CH₃ (fastest).\n- Benzene (b): Standard unsubstituted ring.\n- Chlorobenzene (a): Deactivated by the strong −I inductive effect of Cl (which outweighs its weak +M effect).\n- Nitrobenzene (d): Strongly deactivated by the potent −M and −I effects of −NO₂ (slowest).\nTherefore, the order is: c > b > a > d.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1265,
    payload: {
      question: "The position and structure of the carbon-carbon double bond in an unknown alkene are most definitively determined by:",
      option_a: "Catalytic hydrogenation",
      option_b: "Ozonolysis followed by zinc/water reduction",
      option_c: "Addition of halogen acids",
      option_d: "Hydroboration-oxidation",
      correct_option: "B",
      explanation: "Ozonolysis cleaves the carbon-carbon double bond completely and converts both sp² carbons into carbonyl groups (>C=O).\nBy identifying the exact carbonyl products (aldehydes and/or ketones) obtained after reductive workup with Zn/H₂O, the precise location of the double bond and any branching in the original alkene can be unambiguously deduced.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1266,
    payload: {
      question: "Reductive ozonolysis of 2,3-dimethylbut-2-ene, (CH₃)₂C=C(CH₃)₂, yields exclusively:",
      option_a: "Acetaldehyde (Ethanal)",
      option_b: "Formaldehyde (Methanal)",
      option_c: "Acetone (Propan-2-one)",
      option_d: "Butan-2-one",
      correct_option: "C",
      explanation: "During reductive ozonolysis, the carbon-carbon double bond is cleaved and each carbon of the double bond forms a carbonyl group with oxygen:\n(CH₃)₂C=C(CH₃)₂ + O₃ —(Zn/H₂O)→ 2 (CH₃)₂C=O\nSince both ends of the symmetrical alkene are identical (each bearing two methyl groups), two molecules of propan-2-one (acetone) are produced.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1267,
    payload: {
      question: "When 2-methylpropene reacts with concentrated hydrochloric acid (HCl), the major product formed according to Markovnikov's rule is:",
      option_a: "1-Chloro-2-methylpropane",
      option_b: "2-Chloro-2-methylpropane (tert-butyl chloride)",
      option_c: "2-Chlorobutane",
      option_d: "1-Chlorobutane",
      correct_option: "B",
      explanation: "The electrophilic addition proceeds via protonation of 2-methylpropene (CH₃)₂C=CH₂:\nProton (H⁺) adds to the less substituted CH₂ carbon to yield the more stable 3° carbocation intermediate: (CH₃)₃C⁺.\nAttack of chloride ion (Cl⁻) on the tertiary carbocation yields 2-chloro-2-methylpropane (tert-butyl chloride) as the predominant Markovnikov product.\nTherefore, Option (B) is the correct answer."
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
    console.log(`Set 29 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
