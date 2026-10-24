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
    id: 1321,
    payload: {
      question: "When but-2-yne is reacted with H₂ in the presence of Lindlar's catalyst to give product A, and A is subsequently treated with Br₂ in CCl₄, the final product B is:",
      option_a: "meso-2,3-Dibromobutane",
      option_b: "(±)-2,3-Dibromobutane (racemic mixture)",
      option_c: "1,2-Dibromobutane",
      option_d: "2-Bromobutane",
      correct_option: "B",
      explanation: "1. Hydrogenation of but-2-yne over Lindlar's catalyst gives cis-but-2-ene (syn-addition).\n2. Addition of Br₂ in CCl₄ to an alkene is stereospecifically anti.\n3. Anti-addition of bromine to a cis-alkene (cis + anti) produces a pair of enantiomers in equal amounts, i.e., a racemic mixture: (±)-2,3-dibromobutane.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1322,
    payload: {
      question: "When propene is treated with bromine dissolved in carbon tetrachloride (Br₂ / CCl₄), the product formed is:",
      option_a: "1-Bromopropane",
      option_b: "1,2-Dibromopropane",
      option_c: "2-Bromopropane",
      option_d: "1,3-Dibromopropane",
      correct_option: "B",
      explanation: "Bromine adds across the carbon-carbon double bond of propene via electrophilic addition:\nCH₃−CH=CH₂ + Br₂ → CH₃−CH(Br)−CH₂Br\nThis yields 1,2-dibromopropane (propylene dibromide, a vicinal dibromide) while discharging the reddish-brown color of bromine.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1323,
    payload: {
      question: "When methyl iodide is treated with metallic sodium in dry ether (Wurtz reaction), the hydrocarbon obtained is:",
      option_a: "Methane",
      option_b: "Ethane",
      option_c: "Propane",
      option_d: "Ethene",
      correct_option: "B",
      explanation: "The Wurtz reaction involves coupling of two alkyl radicals/carbanions mediated by sodium metal:\n2 CH₃−I + 2 Na —(dry ether)→ CH₃−CH₃ + 2 NaI\nThe product is ethane (C₂H₆).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1324,
    payload: {
      question: "Electrolysis of a concentrated aqueous solution of sodium propionate (Kolbe's electrolytic synthesis) produces which hydrocarbon at the anode?",
      option_a: "Ethane",
      option_b: "n-Butane",
      option_c: "Propane",
      option_d: "Methane",
      correct_option: "B",
      explanation: "In Kolbe's electrolytic decarboxylation:\nAt the anode, propionate ions (CH₃CH₂COO⁻) lose electrons to form ethyl radicals and carbon dioxide:\n2 CH₃CH₂COO⁻ − 2e⁻ → 2 CH₃CH₂• + 2 CO₂↑\nCoupling of two ethyl radicals produces n-butane:\n2 CH₃CH₂• → CH₃CH₂CH₂CH₃ (n-butane).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1325,
    payload: {
      question: "How many monochloro structural isomers (excluding stereoisomers) are possible upon photochemical chlorination of 2-methylbutane?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "5",
      correct_option: "C",
      explanation: "The structure of 2-methylbutane is CH₃−CH(CH₃)−CH₂−CH₃.\nSubstitution of hydrogen at different positions gives:\n1. ClCH₂−CH(CH₃)−CH₂−CH₃ (1-chloro-2-methylbutane)\n2. CH₃−C(Cl)(CH₃)−CH₂−CH₃ (2-chloro-2-methylbutane)\n3. CH₃−CH(CH₃)−CH(Cl)−CH₃ (2-chloro-3-methylbutane)\n4. CH₃−CH(CH₃)−CH₂−CH₂Cl (1-chloro-3-methylbutane)\nThus, exactly 4 structural isomers are formed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1326,
    payload: {
      question: "Among the monochloro derivatives of 2-methylbutane, how many contain a chiral carbon and can exist as enantiomeric pairs?",
      option_a: "2",
      option_b: "3",
      option_c: "1",
      option_d: "4",
      correct_option: "A",
      explanation: "Let us inspect the chiral centers of the 4 monochloro derivatives:\n1. 1-Chloro-2-methylbutane: C2 is bonded to −H, −CH₃, −CH₂Cl, −CH₂CH₃ (chiral → 1 enantiomeric pair).\n2. 2-Chloro-2-methylbutane: achiral.\n3. 2-Chloro-3-methylbutane: C2 is bonded to −H, −Cl, −CH₃, −CH(CH₃)₂ (chiral → 1 enantiomeric pair).\n4. 1-Chloro-3-methylbutane: achiral.\nTherefore, exactly 2 enantiomeric pairs (4 stereoisomers) are formed.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1327,
    payload: {
      question: "Photochemical bromination of 2-methylpropane (isobutane) with Br₂ / hv at 400 K yields predominantly:",
      option_a: "2-Bromo-2-methylpropane (tert-butyl bromide)",
      option_b: "1-Bromo-2-methylpropane (isobutyl bromide)",
      option_c: "2-Bromobutane",
      option_d: "1,2-Dibromo-2-methylpropane",
      correct_option: "A",
      explanation: "Bromine radicals are highly selective (reactivity ratio 3° : 2° : 1° ≈ 1600 : 82 : 1).\nIn 2-methylpropane, abstraction of the single tertiary hydrogen forms the highly stable tertiary radical (CH₃)₃C•, leading almost exclusively (>99%) to 2-bromo-2-methylpropane (tert-butyl bromide).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1328,
    payload: {
      question: "In the addition of H⁺ to propene, carbocation A is the 1° propyl carbocation (CH₃CH₂CH₂⁺) and carbocation B is the 2° isopropyl carbocation (CH₃−C⁺H−CH₃). Which statement is correct?",
      option_a: "Carbocation A is more stable and formed at a faster rate",
      option_b: "Carbocation B is more stable and formed at a faster rate",
      option_c: "Carbocation A is more stable but formed at a slower rate",
      option_d: "Carbocation B is less stable but formed at a faster rate",
      correct_option: "B",
      explanation: "Carbocation B (2° isopropyl cation) has 6 hyperconjugative α-hydrogens and two electron-donating alkyl groups, making it significantly more stable than carbocation A (1° propyl cation with only 2 α-hydrogens).\nAccording to the Hammond postulate, the transition state leading to the more stable intermediate has lower activation energy, so B forms much faster.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1329,
    payload: {
      question: "Addition of one mole of HBr to buta-1,3-diene at low temperature (193 K) yields mainly:",
      option_a: "1-Bromobut-2-ene (1,4-addition product)",
      option_b: "1,4-Dibromobut-2-ene",
      option_c: "3-Bromobut-1-ene (1,2-addition product)",
      option_d: "2-Bromobutane",
      correct_option: "C",
      explanation: "At low temperatures (193 K), the reaction is kinetically controlled.\nThe 1,2-addition product (3-bromobut-1-ene) forms faster because the bromide ion is in closer proximity to C2 immediately after protonation at C1 (proximity effect), making it the predominant kinetic product.\n(At higher temperatures, the thermodynamically more stable 1,4-addition product dominates).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1330,
    payload: {
      question: "Addition of one mole of HBr to buta-1,3-diene at elevated temperature (313 K) yields predominantly:",
      option_a: "3-Bromobut-1-ene",
      option_b: "1-Bromobut-2-ene",
      option_c: "2-Bromobutane",
      option_d: "1,2-Dibromobutane",
      correct_option: "B",
      explanation: "At elevated temperatures (313 K), the reaction is under thermodynamic control.\n1-Bromobut-2-ene is an internal, disubstituted alkene, which is thermodynamically more stable than the terminal monosubstituted 3-bromobut-1-ene.\nAt higher temperatures, reversible equilibration favors the more stable 1,4-addition product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1331,
    payload: {
      question: "The correct increasing order of reactivity of the following alkenes towards electrophilic addition of hydrogen halides (HX) is:",
      option_a: "Ethene < Propene < 2-Methylpropene",
      option_b: "2-Methylpropene < Propene < Ethene",
      option_c: "Propene < Ethene < 2-Methylpropene",
      option_d: "Ethene < 2-Methylpropene < Propene",
      correct_option: "A",
      explanation: "Reactivity towards HX increases with the stability of the carbocation formed upon protonation:\n- Ethene forms a 1° carbocation (least stable, slowest).\n- Propene forms a 2° carbocation.\n- 2-Methylpropene forms a 3° carbocation (most stable, fastest).\nThus, the increasing order of reactivity is: Ethene < Propene < 2-Methylpropene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1332,
    payload: {
      question: "Alkenes characteristically undergo which of the following general classes of organic reactions?",
      option_a: "Electrophilic addition",
      option_b: "Nucleophilic substitution",
      option_c: "Free radical elimination only",
      option_d: "Electrophilic substitution",
      correct_option: "A",
      explanation: "The carbon-carbon double bond contains a loosely bound, exposed π-electron cloud situated above and below the internuclear axis.\nThis makes alkenes electron-rich (Lewis bases / nucleophiles), allowing them to be readily attacked by electron-deficient species (electrophiles) to undergo electrophilic addition reactions.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1333,
    payload: {
      question: "Markovnikov's rule is NOT needed to predict the major product for the addition of HBr to which of the following alkenes?",
      option_a: "Propene",
      option_b: "2-Methylpropene",
      option_c: "Hex-1-ene",
      option_d: "But-2-ene",
      correct_option: "D",
      explanation: "Markovnikov's rule applies specifically to unsymmetrical alkenes where the two doubly bonded carbons bear different numbers of hydrogen atoms.\nBut-2-ene (CH₃−CH=CH−CH₃) is symmetrical; both sp² carbons have exactly one hydrogen and one methyl group.\nAddition of HBr gives the exact same product (2-bromobutane) regardless of which carbon receives the proton, so Markovnikov's rule is not required.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1334,
    payload: {
      question: "The rule stating that during the electrophilic addition of an unsymmetrical reagent to an unsymmetrical alkene, the reaction proceeds through the more stable carbocation intermediate, is known as:",
      option_a: "Saytzeff's rule",
      option_b: "Hund's rule",
      option_c: "Markovnikov's rule",
      option_d: "Hückel's rule",
      correct_option: "C",
      explanation: "Markovnikov's rule, in its modern mechanistic formulation, states that electrophilic addition to an unsymmetrical alkene proceeds in the direction that forms the more stable carbocation intermediate in the rate-determining step.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1335,
    payload: {
      question: "When n-octane is heated at 773 K and 10–20 atm pressure over a Cr₂O₃ / Al₂O₃ catalyst, the aromatic hydrocarbon obtained is:",
      option_a: "Toluene",
      option_b: "o-Xylene (and ethylbenzene)",
      option_c: "Benzene",
      option_d: "Cyclooctane",
      correct_option: "B",
      explanation: "Catalytic aromatization (reforming) of an 8-carbon straight-chain alkane (n-octane) at 773 K over Cr₂O₃/Al₂O₃ leads to dehydrocyclization, producing 1,2-dimethylbenzene (o-xylene) and ethylbenzene with the elimination of hydrogen gas.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1336,
    payload: {
      question: "In which of the following molecules is the carbon-carbon bond length shortest?",
      option_a: "Ethane (C₂H₆)",
      option_b: "Ethyne (C₂H₂)",
      option_c: "Ethene (C₂H₄)",
      option_d: "Benzene (C₆H₆)",
      correct_option: "B",
      explanation: "The carbon-carbon bond lengths are:\n- Ethane (C−C single bond, sp³): 154 pm (1.54 Å)\n- Benzene (partial double bond): 139 pm (1.39 Å)\n- Ethene (C=C double bond, sp²): 134 pm (1.34 Å)\n- Ethyne (C≡C triple bond, sp): 120 pm (1.20 Å)\nThe triple bond in ethyne is the shortest due to higher bond order (3) and greater s-character (50%).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1337,
    payload: {
      question: "Which of the following organic compounds has its carbon atoms in the same state of hybridization as carbon dioxide (CO₂)?",
      option_a: "Ethene",
      option_b: "Ethyne",
      option_c: "Ethane",
      option_d: "Methanol",
      correct_option: "B",
      explanation: "In carbon dioxide (O=C=O), the central carbon forms two σ-bonds and two π-bonds, possessing sp hybridization with a linear geometry (180° bond angle).\nIn ethyne (HC≡CH), each carbon atom forms two σ-bonds and two π-bonds, and is also sp-hybridized with linear geometry.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1338,
    payload: {
      question: "The anti-Markovnikov addition of HBr to an unsymmetrical alkene is initiated in the presence of:",
      option_a: "Anhydrous AlCl₃",
      option_b: "An organic peroxide (such as benzoyl peroxide)",
      option_c: "Concentrated H₂SO₄",
      option_d: "Finely divided nickel",
      correct_option: "B",
      explanation: "The Kharasch effect (peroxide effect) requires an organic peroxide (ROOR), such as benzoyl peroxide.\nUnder heat or UV light, the weak O−O peroxide bond undergoes homolytic cleavage to generate free radicals that initiate the radical chain mechanism for anti-Markovnikov addition.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1339,
    payload: {
      question: "Arrange the following alkenes in decreasing order of reactivity towards electrophilic addition of HBr:\n(I) 2,3-Dimethylbut-2-ene\n(II) 2-Methylpropene\n(III) Propene\n(IV) Ethene",
      option_a: "IV > III > II > I",
      option_b: "I > II > III > IV",
      option_c: "II > I > III > IV",
      option_d: "I > III > II > IV",
      correct_option: "B",
      explanation: "Electrophilic addition of HBr is faster when the alkene double bond is more electron-rich and the carbocation formed is more stable:\n- 2,3-Dimethylbut-2-ene has 4 electron-donating methyl groups (forms 3° carbocation with 12 α-H hyperconjugation).\n- 2-Methylpropene forms a 3° carbocation.\n- Propene forms a 2° carbocation.\n- Ethene forms a 1° carbocation.\nThus, decreasing reactivity order is: I > II > III > IV.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1340,
    payload: {
      question: "The increasing rate of addition of HX to alkenes follows the sequence: Ethene < Propene < 2-Methylpropene. This is primarily explained by:",
      option_a: "Increasing stability of the intermediate carbocation",
      option_b: "Decreasing boiling point of the alkene",
      option_c: "Increasing molecular weight",
      option_d: "Decreasing solubility in acid",
      correct_option: "A",
      explanation: "The rate-determining step in the addition of HX is the formation of the carbocation intermediate.\nAlkyl groups stabilize the carbocation through inductive (+I) and hyperconjugative effects.\nThe stability sequence: 3° carbocation > 2° carbocation > 1° carbocation accounts directly for the observed reactivity order.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1341,
    payload: {
      question: "Arrange the following alkenes in decreasing order of the number of hyperconjugative α-hydrogens:\n(I) 2,3-Dimethylbut-2-ene\n(II) 2-Methylbut-2-ene\n(III) Propene",
      option_a: "I > II > III",
      option_b: "III > II > I",
      option_c: "II > I > III",
      option_d: "I > III > II",
      correct_option: "A",
      explanation: "Counting the α-hydrogens attached to sp³ carbons adjacent to the double bond:\n- (I) 2,3-Dimethylbut-2-ene, (CH₃)₂C=C(CH₃)₂: 4 methyl groups = 4 × 3 = 12 α-hydrogens.\n- (II) 2-Methylbut-2-ene, (CH₃)₂C=CH−CH₃: 3 methyl groups = 3 × 3 = 9 α-hydrogens.\n- (III) Propene, CH₃−CH=CH₂: 1 methyl group = 3 α-hydrogens.\nThus, decreasing order is: I (12) > II (9) > III (3).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1342,
    payload: {
      question: "Complete combustion of any hydrocarbon in excess oxygen gas yields exclusively:",
      option_a: "Carbon monoxide and water vapor",
      option_b: "Carbon black and hydrogen gas",
      option_c: "Carboxylic acids",
      option_d: "Carbon dioxide and water",
      correct_option: "D",
      explanation: "Under complete combustion in excess oxygen, all carbon atoms in the hydrocarbon are oxidized to carbon dioxide (CO₂) and all hydrogen atoms are oxidized to water (H₂O):\nCₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O + Heat\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1343,
    payload: {
      question: "Incomplete combustion of methane in a limited supply of air produces water and:",
      option_a: "Carbon dioxide (CO₂)",
      option_b: "Methanol (CH₃OH)",
      option_c: "Carbon black (soot, C)",
      option_d: "Formaldehyde (HCHO)",
      correct_option: "C",
      explanation: "When methane is burned with an insufficient (limited) supply of oxygen or air, incomplete combustion takes place, producing carbon black (soot) and water vapor:\nCH₄(g) + O₂(g) → C(s) + 2 H₂O(g)\nCarbon black is used industrially in manufacturing printing inks, black pigments, and automobile tires.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1344,
    payload: {
      question: "Controlled catalytic oxidation of methane by passing a mixture of CH₄ and O₂ in a 9:1 volume ratio through a copper tube at 523 K and 100 atm yields:",
      option_a: "Methanol (CH₃OH)",
      option_b: "Methanal (HCHO)",
      option_c: "Methanoic acid (HCOOH)",
      option_d: "Carbon dioxide and water",
      correct_option: "A",
      explanation: "When a mixture of methane and oxygen is passed through a copper tube at 523 K under a pressure of 100 atm, controlled oxidation takes place:\n2 CH₄ + O₂ —(Cu / 523 K / 100 atm)→ 2 CH₃OH (Methanol)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1345,
    payload: {
      question: "Which of the following statements regarding the reactions of alkanes is INCORRECT?",
      option_a: "Lower alkanes do not undergo nitration and sulfonation under ambient conditions.",
      option_b: "Combustion of alkanes is a highly exothermic process.",
      option_c: "Methane reacts with steam at 1273 K in the presence of nickel catalyst to produce synthesis gas (CO + 3H₂).",
      option_d: "Isomerization of n-alkanes into branched alkanes is catalyzed solely by Cr₂O₃.",
      correct_option: "D",
      explanation: "Isomerization of n-alkanes into branched alkanes requires anhydrous aluminium chloride and hydrogen chloride gas (anhydrous AlCl₃ + HCl) at 573 K.\nCr₂O₃ supported on Al₂O₃ is used for aromatization (dehydrocyclization), NOT for isomerization.\nTherefore, Option (D) is the incorrect statement."
    }
  },
  {
    id: 1346,
    payload: {
      question: "The thermal decomposition of higher liquid alkanes at high temperatures into a mixture of lower gaseous and liquid hydrocarbons is called:",
      option_a: "Aromatization",
      option_b: "Isomerization",
      option_c: "Cracking (Pyrolysis)",
      option_d: "Hydrolysis",
      correct_option: "C",
      explanation: "Higher alkanes on heating to higher temperatures decompose into lower alkanes, alkenes, and hydrogen.\nThis thermal decomposition through the breaking of C−C and C−H bonds is known as pyrolysis or cracking, which is widely utilized in petroleum refining.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1347,
    payload: {
      question: "When anhydrous sodium acetate is heated with soda lime (NaOH + CaO), the hydrocarbon gas evolved is:",
      option_a: "Ethane",
      option_b: "Methane",
      option_c: "Propane",
      option_d: "Ethene",
      correct_option: "B",
      explanation: "Heating sodium acetate with soda lime brings about decarboxylation, removing carbon dioxide as sodium carbonate and releasing methane gas:\nCH₃COONa + NaOH —(CaO / Δ)→ CH₄↑ + Na₂CO₃\nTherefore, Option (B) is the correct answer."
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
    console.log(`Set 29 Part 4 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
