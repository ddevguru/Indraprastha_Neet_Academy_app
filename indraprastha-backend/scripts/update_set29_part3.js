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
    id: 1295,
    payload: {
      question: "Which of the following reagents brings about anti-addition across an alkene carbon-carbon double bond?",
      option_a: "Br₂ in CCl₄",
      option_b: "Cold dilute alkaline KMnO₄",
      option_c: "H₂ / Pd-CaCO₃ (Lindlar's catalyst)",
      option_d: "OsO₄ followed by NaHSO₃",
      correct_option: "A",
      explanation: "Addition of bromine (Br₂) in CCl₄ to an alkene involves the formation of a three-membered cyclic bromonium ion intermediate.\nThe bromide ion (Br⁻) is sterically forced to attack from the opposite face (backside attack), leading exclusively to anti-addition.\nCold dilute alkaline KMnO₄, OsO₄, and catalytic hydrogenation all proceed via syn-addition.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1296,
    payload: {
      question: "Treatment of cyclopentene with cold, dilute alkaline KMnO₄ produces:",
      option_a: "trans-Cyclopentane-1,2-diol",
      option_b: "Glutaric acid",
      option_c: "cis-Cyclopentane-1,2-diol",
      option_d: "Cyclopentanone",
      correct_option: "C",
      explanation: "Cold, dilute alkaline KMnO₄ (Baeyer's reagent) carries out syn-dihydroxylation through a cyclic manganate ester intermediate.\nBoth hydroxyl groups are transferred from the same face of the cyclopentene ring, yielding cis-cyclopentane-1,2-diol (meso compound).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1297,
    payload: {
      question: "Baeyer's reagent, widely used as a laboratory test for unsaturation in organic compounds, is chemically:",
      option_a: "1% cold alkaline KMnO₄ solution",
      option_b: "Acidified KMnO₄ solution",
      option_c: "Neutral aqueous K₂Cr₂O₇",
      option_d: "Ammoniacal cuprous chloride",
      correct_option: "A",
      explanation: "Baeyer's reagent is a 1% cold, dilute, alkaline solution of potassium permanganate (KMnO₄).\nWhen added to an unsaturated hydrocarbon (alkene or alkyne), it oxidizes the π-bond to a vicinal diol while its purple color disappears, depositing a dark brown precipitate of manganese dioxide (MnO₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1298,
    payload: {
      question: "The anti-stereospecific addition of bromine to an alkene is best explained by the formation of:",
      option_a: "A planar carbocation intermediate",
      option_b: "A three-membered cyclic bromonium ion intermediate",
      option_c: "A free-radical intermediate",
      option_d: "A carbanion intermediate",
      correct_option: "B",
      explanation: "Electrophilic attack of bromine generates a three-membered cyclic bromonium ion intermediate.\nBecause the three-membered ring blocks one face of the molecule, the incoming nucleophilic bromide ion (Br⁻) must attack from the opposite side (anti-coplanar approach), yielding exclusively the anti-addition product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1299,
    payload: {
      question: "When ethyl vinyl ether (CH₂=CH−OCH₂CH₃) reacts with anhydrous HBr, the major product is:",
      option_a: "BrCH₂−CH₂−OCH₂CH₃",
      option_b: "CH₃−CH(Br)−OCH₂CH₃",
      option_c: "CH₃−CH₂−Br + CH₃CH₂OH",
      option_d: "CH₂=CH−Br + CH₃CH₂OH",
      correct_option: "B",
      explanation: "Protonation occurs at the terminal CH₂ carbon to produce a carbocation on the adjacent carbon:\nCH₃−C⁺H−OCH₂CH₃\nThis carbocation is extraordinarily stabilized by resonance donation from the lone pairs of the adjacent ether oxygen atom: [CH₃−C⁺H−Ö−CH₂CH₃ ↔ CH₃−CH=O⁺−CH₂CH₃].\nSubsequent attack by Br⁻ gives 1-bromo-1-ethoxyethane: CH₃−CH(Br)−OCH₂CH₃.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1300,
    payload: {
      question: "Which of the following additions to an unsymmetrical, branched alkene is accompanied by carbocation rearrangement?",
      option_a: "Addition of Br₂ in CCl₄",
      option_b: "Addition of aqueous H₂SO₄ (acid-catalyzed hydration)",
      option_c: "Addition of HBr in the presence of peroxides",
      option_d: "Hydroboration-oxidation (B₂H₆ / H₂O₂, OH⁻)",
      correct_option: "B",
      explanation: "Acid-catalyzed hydration generates a free, classical carbocation intermediate that is free to rearrange (via 1,2-hydride or 1,2-methyl shifts) to a more stable tertiary or resonance-stabilized carbocation.\nBr₂ in CCl₄ proceeds via a bridged halonium ion (no rearrangement), peroxide addition proceeds via free radicals, and hydroboration occurs concertedly through a 4-membered cyclic transition state.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1301,
    payload: {
      question: "Which of the following alkenes is most reactive towards electrophilic addition of HBr?",
      option_a: "Ethene, CH₂=CH₂",
      option_b: "Propene, CH₃CH=CH₂",
      option_c: "2-Methylpropene, (CH₃)₂C=CH₂",
      option_d: "trans-But-2-ene, CH₃CH=CHCH₃",
      correct_option: "C",
      explanation: "The rate of electrophilic addition depends directly on the stability of the carbocation intermediate formed in the rate-determining step:\nProtonation of 2-methylpropene gives a 3° carbocation, (CH₃)₃C⁺, which is much more stable than the 2° carbocations from propene and but-2-ene or the 1° carbocation from ethene.\nTherefore, 2-methylpropene reacts fastest.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1302,
    payload: {
      question: "Arrange the following alkenes in decreasing order of reactivity towards electrophilic addition of HX:\n(I) (CH₃)₂C=CH₂\n(II) CH₃CH=CH₂\n(III) CH₂=CH₂\n(IV) CH₂=CH−Cl",
      option_a: "I > II > III > IV",
      option_b: "IV > III > II > I",
      option_c: "I > III > II > IV",
      option_d: "II > I > III > IV",
      correct_option: "A",
      explanation: "Reactivity towards HX depends on the stability of the intermediate carbocation and ring electron density:\n- (CH₃)₂C=CH₂ forms a highly stable 3° carbocation (fastest).\n- CH₃CH=CH₂ forms a 2° carbocation.\n- CH₂=CH₂ forms a 1° carbocation.\n- CH₂=CH−Cl has a strongly electronegative −I chlorine group that deactivates the double bond toward electrophilic attack (slowest).\nThus, the order is: I > II > III > IV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1303,
    payload: {
      question: "Markovnikov's rule is fundamentally used to predict:",
      option_a: "The major alkene formed in dehydrohalogenation",
      option_b: "The relative stability of free radicals",
      option_c: "The regiochemistry of electrophilic addition of unsymmetrical reagents to unsymmetrical alkenes",
      option_d: "The stereochemistry of SN2 substitution reactions",
      correct_option: "C",
      explanation: "Markovnikov's rule states that in the addition of an unsymmetrical reagent (such as HX, H₂O) to an unsymmetrical alkene, the positive part (electrophile, H⁺) attaches to the doubly bonded carbon bearing the greater number of hydrogen atoms, yielding the more stable carbocation intermediate.\nIt therefore governs the regiochemistry of electrophilic additions.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1304,
    payload: {
      question: "When propene is treated with chlorine water (aqueous Cl₂), the main product formed is:",
      option_a: "1,2-Dichloropropane",
      option_b: "1-Chloropropan-2-ol (propylene chlorohydrin)",
      option_c: "2-Chloropropan-1-ol",
      option_d: "1-Chloropropene",
      correct_option: "B",
      explanation: "Chlorine water contains HOCl (Cl⁺ and OH⁻):\n1. Electrophilic Cl⁺ adds to the terminal double-bond carbon (C1) to form the more stable 2° carbocation / unsymmetrical chloronium intermediate.\n2. The nucleophile H₂O (present in large excess) attacks the more substituted internal carbon (C2) where partial positive charge is greatest.\nLoss of a proton gives 1-chloropropan-2-ol (propylene chlorohydrin) as the major product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1305,
    payload: {
      question: "Reaction of 2-methylbut-2-ene with hypochlorous acid (HOCl) yields as the major product:",
      option_a: "2-Chloro-2-methylbutan-3-ol",
      option_b: "3-Chloro-2-methylbutan-2-ol",
      option_c: "2,3-Dichloro-2-methylbutane",
      option_d: "2-Methylbutane-2,3-diol",
      correct_option: "B",
      explanation: "In HOCl, chlorine acts as the electrophile (Cl⁺) and hydroxide as the nucleophile (OH⁻):\n1. Cl⁺ attacks the less substituted carbon (C3 of 2-methylbut-2-ene) to form a tertiary carbocation at C2: (CH₃)₂C⁺−CH(Cl)−CH₃.\n2. The nucleophile (−OH) attacks the tertiary carbon C2.\nHence, the product is 3-chloro-2-methylbutan-2-ol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1306,
    payload: {
      question: "When 1-methylcyclohexene reacts with HBr in the absence of peroxides, the major product is:",
      option_a: "1-Bromo-1-methylcyclohexane",
      option_b: "1-Bromo-2-methylcyclohexane",
      option_c: "Bromocyclohexane",
      option_d: "3-Bromo-1-methylcyclohexane",
      correct_option: "A",
      explanation: "Protonation of 1-methylcyclohexene occurs at the less substituted ring carbon (C2) to generate the more stable tertiary carbocation at C1 (bearing the methyl group).\nBromide ion then attacks C1 to form 1-bromo-1-methylcyclohexane as the major Markovnikov product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1307,
    payload: {
      question: "The electrophilic addition of HI to propene yields 2-iodopropane exclusively because:",
      option_a: "The reaction proceeds through a more stable 2° carbocation intermediate rather than a 1° carbocation",
      option_b: "The reaction proceeds through a free radical",
      option_c: "The iodide ion is too small to attack the secondary carbon",
      option_d: "1-Iodopropane is unstable at room temperature",
      correct_option: "A",
      explanation: "Protonation of propene (CH₃CH=CH₂) can yield either a 2° carbocation (CH₃−C⁺H−CH₃) or a 1° carbocation (CH₃CH₂−C⁺H₂).\nThe secondary carbocation is much more stable due to 6 hyperconjugative α-hydrogens and greater inductive stabilization.\nSince it forms much faster, subsequent attack by I⁻ gives 2-iodopropane.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1308,
    payload: {
      question: "The stereospecific anti-addition of Br₂ to trans-but-2-ene results in the formation of:",
      option_a: "meso-2,3-Dibromobutane",
      option_b: "(±)-2,3-Dibromobutane (racemic mixture)",
      option_c: "1,2-Dibromobutane",
      option_d: "2-Bromobutane",
      correct_option: "A",
      explanation: "Anti-addition to a trans-alkene follows the stereochemical mnemonic (trans + anti = meso):\nFormation of the cyclic bromonium ion followed by backside attack by Br⁻ at either carbon of the symmetrical intermediate produces meso-2,3-dibromobutane, which possesses a plane of symmetry and is optically inactive.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1309,
    payload: {
      question: "When 3,3-dimethylbut-1-ene is hydrated in the presence of dilute H₂SO₄, the major alcohol formed is:",
      option_a: "3,3-Dimethylbutan-1-ol",
      option_b: "3,3-Dimethylbutan-2-ol",
      option_c: "2,3-Dimethylbutan-2-ol",
      option_d: "2,3-Dimethylbutan-1-ol",
      correct_option: "C",
      explanation: "In acid-catalyzed hydration:\n1. Protonation gives a 2° carbocation: (CH₃)₃C−C⁺H−CH₃.\n2. A 1,2-methyl shift occurs to generate the more stable 3° carbocation: (CH₃)₂C⁺−CH(CH₃)₂.\n3. Nucleophilic attack by H₂O followed by deprotonation yields 2,3-dimethylbutan-2-ol as the major rearranged product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1310,
    payload: {
      question: "Acid-catalyzed hydration of 2-phenylpropene, C₆H₅−C(CH₃)=CH₂, yields as the major product:",
      option_a: "2-Phenylpropan-2-ol",
      option_b: "2-Phenylpropan-1-ol",
      option_c: "1-Phenylpropan-2-ol",
      option_d: "3-Phenylpropan-1-ol",
      correct_option: "A",
      explanation: "Protonation of the terminal double-bond carbon generates a tertiary benzylic carbocation: C₆H₅−C⁺(CH₃)₂.\nThis carbocation is exceptionally stable due to extensive benzylic resonance delocalization with the benzene ring and hyperconjugation from the methyl group.\nSubsequent capture by H₂O gives 2-phenylpropan-2-ol as the exclusive product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1311,
    payload: {
      question: "Addition of HBr to 1-butene in the absence of peroxides yields:",
      option_a: "1-Bromobutane",
      option_b: "2-Bromobutane",
      option_c: "1,2-Dibromobutane",
      option_d: "2,2-Dibromobutane",
      correct_option: "B",
      explanation: "In the absence of peroxides, electrophilic addition follows Markovnikov's rule:\nProtonation of 1-butene (CH₃CH₂CH=CH₂) at C1 generates the secondary carbocation CH₃CH₂−C⁺H−CH₃.\nBromide ion attacks C2 to yield 2-bromobutane (sec-butyl bromide) as the major product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1312,
    payload: {
      question: "To convert propene into 1-propanol (anti-Markovnikov hydration without rearrangement), the best synthetic method is:",
      option_a: "Acid-catalyzed hydration (dilute H₂SO₄)",
      option_b: "Hydroboration-oxidation (B₂H₆ / THF followed by H₂O₂ / NaOH)",
      option_c: "Oxymercuration-demercuration (Hg(OAc)₂ followed by NaBH₄)",
      option_d: "Reaction with concentrated H₂SO₄ followed by boiling with water",
      correct_option: "B",
      explanation: "Hydroboration-oxidation adds H and OH across the double bond in an anti-Markovnikov and syn-stereospecific manner without carbocation intermediates or rearrangements:\nCH₃CH=CH₂ + B₂H₆ → (CH₃CH₂CH₂)₃B —(H₂O₂/OH⁻)→ 3 CH₃CH₂CH₂OH (1-propanol).\nOxymercuration-demercuration and acid hydration yield 2-propanol (Markovnikov product).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1313,
    payload: {
      question: "Oxymercuration-demercuration of 3,3-dimethylbut-1-ene gives:",
      option_a: "2,3-Dimethylbutan-2-ol",
      option_b: "3,3-Dimethylbutan-1-ol",
      option_c: "3,3-Dimethylbutan-2-ol",
      option_d: "2,3-Dimethylbutan-1-ol",
      correct_option: "C",
      explanation: "Oxymercuration involves a cyclic mercurinium ion intermediate, which prevents carbocation rearrangement.\nNucleophilic attack of water occurs at the more substituted carbon (C2) with Markovnikov regioselectivity.\nReduction with NaBH₄ replaces the −HgOAc group with −H without rearrangement, giving 3,3-dimethylbutan-2-ol.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1314,
    payload: {
      question: "Which of the following reactions is the most efficient and selective method for preparing pure 2-bromobutane without isomeric mixtures?",
      option_a: "Direct bromination of n-butane with Br₂ / hv",
      option_b: "Addition of HBr to but-2-ene",
      option_c: "Addition of HBr to but-1-ene in the presence of peroxides",
      option_d: "Heating 1-butanol with concentrated HBr",
      correct_option: "B",
      explanation: "But-2-ene (CH₃CH=CHCH₃) is a symmetrical alkene.\nAddition of HBr to either carbon of the double bond yields the same product, 2-bromobutane, with 100% regiochemical selectivity and no structural isomers.\nIn contrast, direct alkane bromination gives a mixture of products.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1315,
    payload: {
      question: "The predominant formation of but-2-ene over but-1-ene during the dehydrohalogenation of 2-bromobutane with alcoholic KOH is governed by:",
      option_a: "Markovnikov's rule",
      option_b: "Hund's rule",
      option_c: "Saytzeff's (Zaitsev's) rule",
      option_d: "Hofmann's rule",
      correct_option: "C",
      explanation: "Saytzeff's rule states that in β-elimination (dehydrohalogenation) reactions of alkyl halides with non-bulky bases like alcoholic KOH, the hydrogen is preferentially eliminated from the β-carbon having fewer hydrogens.\nThis yields the more substituted and thermodynamically more stable alkene (but-2-ene with 6 hyperconjugative α-hydrogens) as the major product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1316,
    payload: {
      question: "When propene reacts with dry HCl gas in the presence of a peroxide, the major product is:",
      option_a: "1-Chloropropane",
      option_b: "2-Chloropropane",
      option_c: "1,2-Dichloropropane",
      option_d: "Allyl chloride",
      correct_option: "B",
      explanation: "The peroxide effect applies exclusively to HBr and does NOT occur with HCl or HI.\nBecause the H−Cl bond is too strong for homolytic cleavage by alkoxy radicals, the reaction proceeds strictly via the electrophilic carbocation mechanism according to Markovnikov's rule, yielding 2-chloropropane.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1317,
    payload: {
      question: "When 1-phenylprop-1-yne (C₆H₅−C≡C−CH₃) is hydrated with dilute H₂SO₄ in the presence of HgSO₄, the major ketone formed is:",
      option_a: "3-Phenylpropanal",
      option_b: "1-Phenylpropan-1-one (Propiophenone)",
      option_c: "1-Phenylpropan-2-one",
      option_d: "Diphenyl ketone",
      correct_option: "B",
      explanation: "In C₆H₅−C≡C−CH₃, electrophilic attack by Hg²⁺/H⁺ occurs such that the carbocation character is developed at the benzylic carbon (C1) rather than C2.\nThe benzylic carbocation is strongly resonance-stabilized by the phenyl ring.\nAddition of water at C1 followed by tautomerization produces propiophenone (C₆H₅−CO−CH₂CH₃) as the major product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1318,
    payload: {
      question: "Hydration of propyne (CH₃−C≡CH) in the presence of dilute H₂SO₄ and HgSO₄ at 333 K yields:",
      option_a: "Propanal",
      option_b: "Propanoic acid",
      option_c: "Acetone (Propanone)",
      option_d: "Allyl alcohol",
      correct_option: "C",
      explanation: "Hydration of propyne follows Markovnikov addition:\nWater adds across the triple bond to form the enol: CH₃−C(OH)=CH₂.\nDue to keto-enol tautomerism, the enol rearranges spontaneously into the far more stable ketone, acetone (CH₃−CO−CH₃).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1319,
    payload: {
      question: "The conversion of terminal alkynes to methyl ketones by hydration requires which of the following catalyst systems?",
      option_a: "HgSO₄ in dilute H₂SO₄ at 333 K",
      option_b: "Pd / BaSO₄ in quinoline",
      option_c: "AlCl₃ in dry ether",
      option_d: "Cu₂Cl₂ in aqueous NH₄Cl",
      correct_option: "A",
      explanation: "The Kucherov reaction uses mercuric sulfate (HgSO₄) as catalyst in warm dilute sulfuric acid (H₂SO₄) at 333 K to carry out hydration of alkynes.\nMercuric ion (Hg²⁺) coordinates with the π-electron cloud of the triple bond, facilitating nucleophilic attack by water to yield enols that tautomerize to methyl ketones.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1320,
    payload: {
      question: "Which of the following hydrocarbons possesses an acidic hydrogen and readily reacts with sodium metal with the evolution of hydrogen gas?",
      option_a: "Ethyne (HC≡CH)",
      option_b: "Ethene (H₂C=CH₂)",
      option_c: "Ethane (CH₃−CH₃)",
      option_d: "Benzene (C₆H₆)",
      correct_option: "A",
      explanation: "In ethyne (acetylene), the carbon atoms are sp-hybridized with 50% s-character.\nThe high electronegativity of sp-hybridized carbon atoms stabilizes the carbanion conjugate base (acetylide ion, HC≡C⁻).\nConsequently, ethyne is sufficiently acidic (pKa ≈ 25) to react with active metals like sodium, liberating hydrogen gas and forming sodium acetylide:\n2 HC≡CH + 2 Na → 2 HC≡C⁻Na⁺ + H₂↑\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 29 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
