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
    id: 1375,
    payload: {
      question: "In Kolbe's synthesis of alkanes, an electric current is passed through an aqueous solution of:",
      option_a: "Sodium or potassium salt of a carboxylic acid",
      option_b: "Alkyl halide in dry ether",
      option_c: "Aliphatic alcohol in sulfuric acid",
      option_d: "Sodium alkoxide in alcohol",
      correct_option: "A",
      explanation: "Kolbe's electrolytic method involves the electrolysis of a concentrated aqueous solution of sodium or potassium salt of a fatty (carboxylic) acid.\nDecarboxylation at the anode generates alkyl free radicals, which couple to form symmetrical alkanes:\n2 RCOO⁻ − 2e⁻ → R−R + 2 CO₂↑\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1376,
    payload: {
      question: "Heating sodium salicylate with soda lime (NaOH + CaO) results in:",
      option_a: "Benzene",
      option_b: "Phenol",
      option_c: "Toluene",
      option_d: "Benzoic acid",
      correct_option: "B",
      explanation: "Sodium salicylate is the sodium salt of salicylic acid (2-hydroxybenzoic acid, o-HOC₆H₄COONa).\nHeating with soda lime removes the carboxyl group (−COONa) as sodium carbonate:\no-HOC₆H₄COONa + NaOH —(CaO / Δ)→ C₆H₅OH (Phenol) + Na₂CO₃\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1377,
    payload: {
      question: "To prepare a pure sample of n-butane using metallic sodium in dry ether (Wurtz reaction), the single alkyl halide required is:",
      option_a: "Methyl chloride",
      option_b: "Ethyl bromide",
      option_c: "n-Propyl bromide",
      option_d: "n-Butyl bromide",
      correct_option: "B",
      explanation: "The Wurtz reaction couples two identical alkyl groups to form a symmetrical alkane without contamination from side-coupling products:\n2 CH₃CH₂−Br + 2 Na —(dry ether)→ CH₃CH₂CH₂CH₃ (n-butane) + 2 NaBr\nUsing a mixture of different alkyl halides would produce an inseparable mixture of three alkanes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1378,
    payload: {
      question: "The Wurtz reaction is most suitable and practically used for the synthesis of:",
      option_a: "Methane",
      option_b: "Symmetrical alkanes containing an even number of carbon atoms",
      option_c: "Unsymmetrical alkanes containing an odd number of carbon atoms",
      option_d: "Aromatic hydrocarbons only",
      correct_option: "B",
      explanation: "The Wurtz reaction couples two alkyl radicals:\n2 R−X + 2 Na → R−R + 2 NaX\nWhen a single alkyl halide is used, it produces a symmetrical alkane with an even number of carbon atoms (R−R) in high yield.\nIf two different alkyl halides are used, a mixture of three alkanes (R−R, R−R', R'−R') is obtained, which are difficult to separate.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1379,
    payload: {
      question: "Which of the following alkanes can be synthesized in high yield by the Wurtz reaction?",
      option_a: "2-Methylbutane",
      option_b: "2,3-Dimethylbutane",
      option_c: "Propane",
      option_d: "n-Pentane",
      correct_option: "B",
      explanation: "2,3-Dimethylbutane is a symmetrical alkane:\n(CH₃)₂CH−CH(CH₃)₂\nIt can be prepared cleanly by treating 2-bromopropane (isopropyl bromide) with sodium metal in dry ether:\n2 (CH₃)₂CH−Br + 2 Na → (CH₃)₂CH−CH(CH₃)₂ + 2 NaBr\nPropane, n-pentane, and 2-methylbutane are unsymmetrical and would give complex mixtures.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1380,
    payload: {
      question: "Reaction of 1,4-dibromobutane with two moles of sodium metal in dry ether yields:",
      option_a: "n-Butane",
      option_b: "Cyclobutane",
      option_c: "1-Butene",
      option_d: "Cyclooctane",
      correct_option: "B",
      explanation: "When a terminal α,ω-dihaloalkane such as 1,4-dibromobutane is treated with sodium in dry ether, intramolecular Wurtz coupling (Freund reaction) occurs:\nBr−CH₂CH₂CH₂CH₂−Br + 2 Na → Cyclobutane (cyclic C₄H₈) + 2 NaBr\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1381,
    payload: {
      question: "The chain initiation step in the photochemical chlorination of methane involves:",
      option_a: "Heterolytic cleavage of C−H bond",
      option_b: "Heterolytic cleavage of Cl−Cl bond",
      option_c: "Homolytic fission of C−H bond",
      option_d: "Homolytic cleavage of Cl−Cl bond",
      correct_option: "D",
      explanation: "In photochemical chlorination, the Cl−Cl bond has a relatively low bond dissociation energy (242 kJ/mol).\nAbsorption of a photon of UV light (hν) causes homolytic fission of the chlorine molecule, producing two neutral chlorine free radicals:\nCl−Cl —(hν)→ 2 Cl•\nThis is the initiation step.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1382,
    payload: {
      question: "In the free-radical chlorination of propane, the relative reactivities of 1° and 2° hydrogens are 1.0 : 3.8. The percentage of 2-chloropropane formed is approximately:",
      option_a: "56%",
      option_b: "44%",
      option_c: "75%",
      option_d: "25%",
      correct_option: "A",
      explanation: "Propane (CH₃−CH₂−CH₃) contains six 1° hydrogens and two 2° hydrogens:\nRelative yield of 1-chloropropane = (number of 1° H) × (reactivity of 1° H) = 6 × 1.0 = 6.0\nRelative yield of 2-chloropropane = (number of 2° H) × (reactivity of 2° H) = 2 × 3.8 = 7.6\nTotal relative yield = 6.0 + 7.6 = 13.6\nPercentage of 2-chloropropane = (7.6 / 13.6) × 100% ≈ 55.9% ≈ 56%.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1383,
    payload: {
      question: "Which of the following reactions proceeds via a free-radical substitution mechanism?",
      option_a: "Reaction of ethene with cold alkaline KMnO₄",
      option_b: "Bromination of ethane with Br₂ in the presence of UV light",
      option_c: "Addition of HBr to propene in the absence of peroxides",
      option_d: "Reaction of benzene with acetyl chloride in the presence of AlCl₃",
      correct_option: "B",
      explanation: "The bromination of ethane under UV light proceeds by homolytic cleavage of Br₂, followed by hydrogen abstraction and halogen transfer by alkyl and bromine free radicals.\nThis is a classic free-radical substitution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1384,
    payload: {
      question: "A cycloalkane with molecular formula C₅H₁₀ (molecular mass = 70 g/mol) gives only one monochloro derivative upon photochemical chlorination. The compound is:",
      option_a: "1-Pentene",
      option_b: "2-Methylbut-1-ene",
      option_c: "Cyclopentane",
      option_d: "Methylcyclobutane",
      correct_option: "C",
      explanation: "Molecular mass of C₅H₁₀ = (5 × 12) + (10 × 1) = 70 g/mol.\nIn cyclopentane, all ten hydrogen atoms and all five CH₂ methylene carbons are completely chemically equivalent due to ring symmetry.\nReplacing any one hydrogen atom with chlorine yields the exact same product, chlorocyclopentane.\nThus, cyclopentane yields only one monochloro derivative.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1385,
    payload: {
      question: "Statement-I: Addition of trace amounts of oxygen (O₂) temporarily inhibits or retards the photochemical chlorination of methane.\nStatement-II: Oxygen reacts rapidly with alkyl free radicals to form less reactive alkylperoxy radicals (CH₃−O−O•), which cannot propagate the chain.",
      option_a: "Both Statement-I and Statement-II are correct.",
      option_b: "Both Statement-I and Statement-II are incorrect.",
      option_c: "Statement-I is correct but Statement-II is incorrect.",
      option_d: "Statement-I is incorrect but Statement-II is correct.",
      correct_option: "A",
      explanation: "Oxygen is a diradical (•O−O•) and acts as an inhibitor in free-radical reactions.\nIt scavenges methyl radicals: CH₃• + O₂ → CH₃−O−O• (methylperoxy radical).\nThe methylperoxy radical is unreactive toward abstracting hydrogen from methane, causing an induction period during which the reaction stops until all oxygen is consumed.\nThus, both statements are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1386,
    payload: {
      question: "The correct sequence of steps in the mechanism of chlorination of methane is:\n(1) CH₃• + Cl₂ → CH₃Cl + Cl•\n(2) Cl₂ —(hν)→ 2 Cl•\n(3) CH₄ + Cl• → CH₃• + HCl\n(4) Cl• + Cl• → Cl₂",
      option_a: "2 → 3 → 1 → 4",
      option_b: "3 → 2 → 1 → 4",
      option_c: "1 → 2 → 3 → 4",
      option_d: "2 → 1 → 3 → 4",
      correct_option: "A",
      explanation: "The free-radical chain mechanism proceeds in three phases:\n1. Initiation: Cl₂ —(hν)→ 2 Cl• (Step 2)\n2. Propagation: CH₄ + Cl• → CH₃• + HCl (Step 3) followed by CH₃• + Cl₂ → CH₃Cl + Cl• (Step 1)\n3. Termination: Cl• + Cl• → Cl₂ (Step 4)\nThus, the correct sequence is 2 → 3 → 1 → 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1387,
    payload: {
      question: "The decreasing order of exothermicity and reactivity for the halogenation of alkanes with halogens (X₂) is:",
      option_a: "F₂ > Cl₂ > Br₂ > I₂",
      option_b: "I₂ > Br₂ > Cl₂ > F₂",
      option_c: "Cl₂ > F₂ > Br₂ > I₂",
      option_d: "F₂ > Br₂ > Cl₂ > I₂",
      correct_option: "A",
      explanation: "Fluorination is violently exothermic (ΔH ≈ −431 kJ/mol) and explosive.\nChlorination is moderately exothermic (ΔH ≈ −105 kJ/mol).\nBromination is weakly exothermic (ΔH ≈ −31 kJ/mol) and highly selective.\nIodination is endothermic (ΔH ≈ +55 kJ/mol) and reversible.\nThus, the order of reactivity is: F₂ > Cl₂ > Br₂ > I₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1388,
    payload: {
      question: "An alkane with the molecular formula C₅H₁₂ gives only one monochloro substitution product upon photochemical chlorination. The alkane is:",
      option_a: "n-Pentane",
      option_b: "Isopentane (2-Methylbutane)",
      option_c: "Neopentane (2,2-Dimethylpropane)",
      option_d: "Cyclopentane",
      correct_option: "C",
      explanation: "Neopentane, C(CH₃)₄, consists of a quaternary central carbon surrounded symmetrically by four identical methyl groups.\nAll twelve hydrogen atoms are equivalent primary hydrogens.\nSubstitution of any hydrogen by chlorine produces the identical product, 1-chloro-2,2-dimethylpropane (neopentyl chloride).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1389,
    payload: {
      question: "The reaction of an alkane with bromine vapor in the presence of light is classified as:",
      option_a: "Electrophilic substitution",
      option_b: "Free-radical substitution",
      option_c: "Nucleophilic addition",
      option_d: "Thermal elimination",
      correct_option: "B",
      explanation: "In the presence of light, bromine molecules homolytically cleave to form bromine radicals, which substitute for hydrogen atoms in the alkane without changing the saturation of the carbon skeleton.\nThis is a free-radical substitution reaction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1390,
    payload: {
      question: "In the chlorination of propane, assuming that all primary and secondary hydrogen atoms are abstracted at the exact same rate (pure statistical probability), the ratio of 1-chloropropane to 2-chloropropane formed would be:",
      option_a: "50 : 50",
      option_b: "25 : 75",
      option_c: "75 : 25 (3 : 1)",
      option_d: "33 : 67",
      correct_option: "C",
      explanation: "Propane has the formula CH₃−CH₂−CH₃.\nIt contains 6 primary hydrogen atoms (two −CH₃ groups) and 2 secondary hydrogen atoms (one −CH₂− group).\nIf all hydrogens are abstracted with equal probability:\nRatio of 1-chloropropane to 2-chloropropane = 6 : 2 = 3 : 1, which corresponds to 75% : 25%.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1391,
    payload: {
      question: "Electrolytic decarboxylation of an aqueous solution of sodium ethanoate (sodium acetate) produces:",
      option_a: "Methane",
      option_b: "Ethane",
      option_c: "Ethylene",
      option_d: "Butane",
      correct_option: "B",
      explanation: "In Kolbe's electrolytic synthesis:\n2 CH₃COONa + 2 H₂O —(electrolysis)→ C₂H₆ (ethane) + 2 CO₂ + 2 NaOH + H₂\nAt the anode, methyl radicals generated by decarboxylation of acetate couple to form ethane:\n2 CH₃• → CH₃−CH₃ (ethane).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1392,
    payload: {
      question: "The formation of alkanes at the anode during Kolbe's electrolytic decarboxylation proceeds through which intermediate?",
      option_a: "Carbocations",
      option_b: "Carbanions",
      option_c: "Free radicals",
      option_d: "Carbenes",
      correct_option: "C",
      explanation: "At the anode, the carboxylate anion (RCOO⁻) loses one electron (oxidation) to form a carboxyl free radical (RCOO•).\nThis radical immediately undergoes decarboxylation to release CO₂ and generate an alkyl free radical (R•).\nTwo alkyl free radicals then dimerize to yield the alkane (R−R).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1393,
    payload: {
      question: "During the electrolysis of aqueous sodium acetate, which gas is liberated at the cathode?",
      option_a: "Carbon dioxide (CO₂)",
      option_b: "Ethane (C₂H₆)",
      option_c: "Hydrogen (H₂)",
      option_d: "Oxygen (O₂)",
      correct_option: "C",
      explanation: "At the cathode, water molecules are reduced by accepting electrons:\n2 H₂O + 2e⁻ → H₂↑ + 2 OH⁻\nThus, hydrogen gas (H₂) is liberated at the cathode, while ethane and carbon dioxide are evolved at the anode.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1394,
    payload: {
      question: "Which of the following statements about Kolbe's electrolytic reaction is FALSE?",
      option_a: "It involves a free-radical intermediate.",
      option_b: "Methane is obtained as a major product.",
      option_c: "Alkanes with even number of carbon atoms are synthesized.",
      option_d: "CO₂ is liberated at the anode.",
      correct_option: "B",
      explanation: "Kolbe's reaction occurs via coupling of two alkyl radicals: 2 R• → R−R.\nSince each alkyl radical contains at least one carbon atom, coupling always produces an alkane with at least two carbon atoms.\nMethane (CH₄) contains only one carbon atom and cannot be prepared by Kolbe's method.\nTherefore, Option (B) is the false statement."
    }
  },
  {
    id: 1395,
    payload: {
      question: "Which of the following alkanes CANNOT be prepared cleanly as a single product by Kolbe's electrolytic decarboxylation of a single carboxylic acid salt?",
      option_a: "Ethane",
      option_b: "Butane",
      option_c: "Propane",
      option_d: "Hexane",
      correct_option: "C",
      explanation: "Kolbe's electrolysis of a single carboxylic acid salt yields symmetrical alkanes with an even number of carbons (R−R, where number of carbons = 2n).\nPropane contains 3 carbons (an odd number).\nPreparing propane would require electrolyzing a mixture of sodium acetate and sodium propionate, which inevitably yields an inseparable mixture of ethane, propane, and butane.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1396,
    payload: {
      question: "Which of the following alkanes cannot be synthesized by the Wurtz reaction?",
      option_a: "Ethane",
      option_b: "Butane",
      option_c: "Methane",
      option_d: "Hexane",
      correct_option: "C",
      explanation: "The Wurtz reaction involves coupling of two alkyl halides:\n2 R−X + 2 Na → R−R + 2 NaX\nThe smallest possible alkane produced is when R = CH₃ (methyl), which gives ethane (CH₃−CH₃).\nMethane (CH₄) contains only one carbon and therefore cannot be formed by coupling of two alkyl groups.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1397,
    payload: {
      question: "To prepare pure 2,3-dimethylbutane using the Wurtz reaction, which alkyl halide should be reacted with sodium in dry ether?",
      option_a: "1-Bromobutane",
      option_b: "2-Bromobutane",
      option_c: "1-Bromopropane",
      option_d: "2-Bromopropane (Isopropyl bromide)",
      correct_option: "D",
      explanation: "2,3-Dimethylbutane has the symmetrical structure (CH₃)₂CH−CH(CH₃)₂.\nCoupling of two isopropyl radicals gives 2,3-dimethylbutane:\n2 (CH₃)₂CH−Br + 2 Na —(dry ether)→ (CH₃)₂CH−CH(CH₃)₂ + 2 NaBr\nTherefore, 2-bromopropane is the required starting material.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1398,
    payload: {
      question: "When a mixture of bromomethane and 2-bromopropane is treated with sodium in dry ether, which branched alkane is formed by cross-coupling?",
      option_a: "2-Methylpropane (Isobutane)",
      option_b: "n-Butane",
      option_c: "2,3-Dimethylbutane",
      option_d: "Propane",
      correct_option: "A",
      explanation: "In the Wurtz reaction of a mixture of bromomethane (CH₃Br) and 2-bromopropane ((CH₃)₂CHBr):\nCross-coupling between a methyl radical and an isopropyl radical produces 2-methylpropane (isobutane):\nCH₃• + (CH₃)₂CH• → (CH₃)₂CH−CH₃ (2-methylpropane).\n(Self-coupling also produces ethane and 2,3-dimethylbutane).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1399,
    payload: {
      question: "The Wurtz reaction of an alkyl halide with sodium in dry ether fails to give good yields of unsymmetrical alkanes because:",
      option_a: "Alkyl halides do not react with sodium metal",
      option_b: "A mixture of three different alkanes is formed which are difficult to separate due to close boiling points",
      option_c: "The reaction is extremely endothermic",
      option_d: "Ether reacts with sodium metal violently",
      correct_option: "B",
      explanation: "When two different alkyl halides (R−X and R'−X) are treated with sodium, three types of coupling occur simultaneously:\n1. R• + R• → R−R\n2. R• + R'• → R−R'\n3. R'• + R'• → R'−R'\nThis yields a complex mixture of three alkanes whose boiling points are very close, making separation practically difficult and lowering the yield of the desired unsymmetrical alkane.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1400,
    payload: {
      question: "Which of the following alkanes is synthesized in highest yield using the Wurtz reaction?",
      option_a: "2-Methylbutane",
      option_b: "2,2,3,3-Tetramethylbutane",
      option_c: "n-Pentane",
      option_d: "Propane",
      correct_option: "B",
      explanation: "2,2,3,3-Tetramethylbutane, (CH₃)₃C−C(CH₃)₃, is a highly symmetrical alkane that can be conceptually formed from the dimerization of identical tertiary radicals (or similarly symmetrical branched alkanes such as (CH₃)₂CH−CH₂−CH₂−CH(CH₃)₂ from isobutyl bromide).\nSymmetrical coupling of identical alkyl fragments avoids cross-coupling mixtures and gives high yields.\nTherefore, Option (B) is the correct answer."
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
    console.log(`Set 29 Part 6 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
