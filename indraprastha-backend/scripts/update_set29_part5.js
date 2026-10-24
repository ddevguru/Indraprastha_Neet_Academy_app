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
    id: 1348,
    payload: {
      question: "Match the alkane synthesis method in List-I with its characteristic reagent in List-II:\n(A) Wurtz reaction — (1) NaOH + CaO\n(B) Decarboxylation — (2) Na in dry ether\n(C) Kolbe's electrolysis — (3) Aqueous carboxylate salt\n(D) Catalytic hydrogenation — (4) H₂ / Ni",
      option_a: "A–2, B–1, C–3, D–4",
      option_b: "A–1, B–2, C–3, D–4",
      option_c: "A–2, B–3, C–1, D–4",
      option_d: "A–4, B–1, C–3, D–2",
      correct_option: "A",
      explanation: "Matching each synthesis method:\n- Wurtz reaction uses sodium metal in dry ether with alkyl halides (A–2).\n- Decarboxylation uses soda lime (NaOH + CaO) on sodium carboxylates (B–1).\n- Kolbe's synthesis electrolyzes concentrated aqueous solutions of sodium/potassium carboxylate salts (C–3).\n- Catalytic hydrogenation adds H₂ across alkenes/alkynes using Ni, Pt, or Pd (D–4).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1349,
    payload: {
      question: "Which of the following statements regarding Kolbe's electrolytic method for alkane synthesis is INCORRECT?",
      option_a: "Alkanes with an even number of carbon atoms are formed symmetrically at the anode.",
      option_b: "Hydrogen gas (H₂) is liberated at the cathode.",
      option_c: "Methane can be readily prepared by this method.",
      option_d: "Carbon dioxide gas (CO₂) is liberated at the anode along with the alkane.",
      correct_option: "C",
      explanation: "Kolbe's electrolysis involves the coupling of two alkyl radicals (R• + R• → R−R) formed by decarboxylation at the anode.\nBecause coupling requires at least two alkyl radicals (each with at least one carbon), the simplest alkane that can be produced is ethane (from acetate).\nMethane (CH₄), which contains only one carbon atom, can never be prepared by Kolbe's electrolysis.\nTherefore, Option (C) is the incorrect statement."
    }
  },
  {
    id: 1350,
    payload: {
      question: "Incomplete combustion of methane occurs when:",
      option_a: "Excess oxygen is present at 1000 K",
      option_b: "Methane is passed through a red-hot copper tube",
      option_c: "An insufficient or limited supply of air/oxygen is available, forming carbon black",
      option_d: "Methane reacts with steam over nickel catalyst",
      correct_option: "C",
      explanation: "When methane is burned in a limited (insufficient) supply of oxygen or air, incomplete combustion occurs:\nCH₄(g) + O₂(g) → C(s) + 2 H₂O(g)\nFine particles of elemental carbon (carbon black) are deposited along with water vapor.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1351,
    payload: {
      question: "The ease of abstraction of hydrogen atoms in alkanes during free-radical halogenation follows the order:",
      option_a: "1° > 2° > 3°",
      option_b: "2° > 1° > 3°",
      option_c: "3° > 1° > 2°",
      option_d: "3° > 2° > 1°",
      correct_option: "D",
      explanation: "The ease of hydrogen abstraction depends directly on the stability of the alkyl free radical formed in the propagation step.\nTertiary (3°) radicals are stabilized by 9 hyperconjugative structures, secondary (2°) by 6, and primary (1°) by 3.\nDue to lower C−H bond dissociation energy at tertiary positions, the order of reactivity is: 3° > 2° > 1°.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1352,
    payload: {
      question: "Photochemical chlorination of methane is an example of which reaction mechanism?",
      option_a: "Electrophilic substitution",
      option_b: "Nucleophilic substitution",
      option_c: "Free radical substitution",
      option_d: "Electrophilic addition",
      correct_option: "C",
      explanation: "Under UV light (hν) or heat, the Cl−Cl bond undergoes homolytic fission to generate chlorine free radicals (Cl•).\nThese radicals abstract hydrogen from methane via a self-propagating free-radical chain mechanism consisting of initiation, propagation, and termination steps.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1353,
    payload: {
      question: "Which halogen does NOT react directly with alkanes via free radical substitution under normal conditions due to an endothermic initiation and reversible reaction?",
      option_a: "Fluorine (F₂)",
      option_b: "Chlorine (Cl₂)",
      option_c: "Iodine (I₂)",
      option_d: "Bromine (Br₂)",
      correct_option: "C",
      explanation: "Iodination of alkanes is very slow and reversible because the hydrogen abstraction step (propagation step: R−H + I• → R• + HI) is endothermic (+55 kJ/mol).\nTo drive the reaction forward, it must be carried out in the presence of strong oxidizing agents (such as HIO₃ or HNO₃) to oxidize HI as soon as it is formed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1354,
    payload: {
      question: "When 2-methylpropane (isobutane) is treated with Br₂ in the presence of light, the major product is:",
      option_a: "1-Bromo-2-methylpropane",
      option_b: "2-Bromobutane",
      option_c: "2-Bromo-2-methylpropane",
      option_d: "1-Bromobutane",
      correct_option: "C",
      explanation: "Bromine radicals are extremely selective for tertiary C−H bonds over primary C−H bonds (reactivity ratio ≈ 1600 : 1).\nAbstraction of the tertiary hydrogen generates the highly stable tert-butyl radical, (CH₃)₃C•, yielding 2-bromo-2-methylpropane as >99% of the product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1355,
    payload: {
      question: "Select the INCORRECT statement regarding the chemical behavior of alkanes:",
      option_a: "Alkanes are generally inert towards acids, bases, and oxidizing agents at room temperature.",
      option_b: "Vapor-phase nitration of alkanes takes place at 673–773 K via free-radical mechanism.",
      option_c: "Thermal cracking of higher alkanes involves free-radical cleavage of C−C and C−H bonds.",
      option_d: "Aromatization of n-hexane into benzene is brought about by heating with anhydrous AlCl₃ and HCl.",
      correct_option: "D",
      explanation: "Aromatization (dehydrocyclization) of n-hexane to benzene requires heating at 773 K and 10–20 atm over oxides of Cr, V, or Mo supported on alumina (Cr₂O₃/Al₂O₃).\nAnhydrous AlCl₃ + HCl is used for isomerization of alkanes, NOT aromatization.\nTherefore, Option (D) is the incorrect statement."
    }
  },
  {
    id: 1356,
    payload: {
      question: "Statement-I: When n-hexane is heated with anhydrous AlCl₃ and HCl gas at 573 K, branched isomers such as 2-methylpentane and 3-methylpentane are formed.\nStatement-II: This reaction is known as isomerization and involves carbocation rearrangements.",
      option_a: "Both Statement-I and Statement-II are correct.",
      option_b: "Both Statement-I and Statement-II are incorrect.",
      option_c: "Statement-I is correct but Statement-II is incorrect.",
      option_d: "Statement-I is incorrect but Statement-II is correct.",
      correct_option: "A",
      explanation: "Straight-chain alkanes on heating with anhydrous aluminium chloride (AlCl₃) and hydrogen chloride (HCl) gas at 573 K and 35 atm pressure rearrange to form branched-chain alkanes.\nThe reaction proceeds through hydride abstraction to generate carbocation intermediates that undergo 1,2-shifts.\nThus, both statements are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1357,
    payload: {
      question: "When propane is subjected to vapor-phase nitration with concentrated HNO₃ at 673–773 K, the product mixture obtained consists of:",
      option_a: "1-Nitropropane and 2-nitropropane only",
      option_b: "1-Nitropropane, 2-nitropropane, nitroethane, and nitromethane",
      option_c: "Nitromethane only",
      option_d: "2-Nitropropane only",
      correct_option: "B",
      explanation: "At the high temperatures (673–773 K) of vapor-phase nitration, C−C bonds as well as C−H bonds are cleaved homolytically.\nConsequently, propane yields not only substitution products of intact propane (1-nitropropane and 2-nitropropane), but also cleavage products (nitroethane and nitromethane).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1358,
    payload: {
      question: "The thermal reaction: C₁₄H₃₀ ⟶ C₇H₁₆ + C₇H₁₄ represents:",
      option_a: "Substitution",
      option_b: "Isomerization",
      option_c: "Cracking (Pyrolysis)",
      option_d: "Aromatization",
      correct_option: "C",
      explanation: "The decomposition of a higher alkane (tetradecane, C₁₄H₃₀) into a lower alkane (heptane, C₇H₁₆) and a lower alkene (heptene, C₇H₁₄) at elevated temperatures involves the homolytic breaking of carbon-carbon bonds.\nThis process is known as cracking or pyrolysis.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1359,
    payload: {
      question: "Which industrial process is used to break down high-molecular-weight fractions of petroleum into gasoline and gaseous alkenes?",
      option_a: "Hydrolysis",
      option_b: "Polymerization",
      option_c: "Thermal and catalytic cracking",
      option_d: "Electrolysis",
      correct_option: "C",
      explanation: "Cracking (both thermal and catalytic cracking) decomposes long-chain liquid hydrocarbons into shorter-chain liquid hydrocarbons (gasoline, petrol) and valuable gaseous alkenes (ethene, propene) by cleaving C−C σ-bonds.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1360,
    payload: {
      question: "Conversion of n-pentane into 2-methylbutane (isopentane) is brought about by heating with:",
      option_a: "Concentrated H₂SO₄",
      option_b: "Cr₂O₃ supported on Al₂O₃",
      option_c: "Anhydrous AlCl₃ and HCl",
      option_d: "Soda lime",
      correct_option: "C",
      explanation: "Isomerization of straight-chain alkanes to branched-chain isomers is achieved by heating with anhydrous AlCl₃ and HCl gas at 573 K.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1361,
    payload: {
      question: "In the catalytic aromatization of n-heptane to toluene at 773 K, the catalyst used is:",
      option_a: "Ni / H₂",
      option_b: "Anhydrous AlCl₃ / HCl",
      option_c: "KMnO₄ / KOH",
      option_d: "Cr₂O₃ supported on Al₂O₃",
      correct_option: "D",
      explanation: "Aromatization of alkanes having 6 to 8 carbon atoms is catalyzed by transition metal oxides such as Cr₂O₃, V₂O₅, or Mo₂O₃ supported on porous alumina (Al₂O₃) at 773 K and 10–20 atm pressure.\nn-Heptane is dehydrogenated and cyclized to toluene.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1362,
    payload: {
      question: "Controlled oxidation of methane with molybdenum oxide (Mo₂O₃) catalyst at elevated temperature produces:",
      option_a: "Methanal (Formaldehyde, HCHO)",
      option_b: "Methanol (CH₃OH)",
      option_c: "Methanoic acid (HCOOH)",
      option_d: "Carbon dioxide",
      correct_option: "A",
      explanation: "Controlled catalytic oxidation of methane depends on the catalyst used:\n- CH₄ + O₂ over Cu at 523 K / 100 atm gives CH₃OH (methanol).\n- CH₄ + O₂ over Mo₂O₃ on heating gives HCHO (methanal / formaldehyde) and H₂O.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1363,
    payload: {
      question: "Which of the following equations represents the incomplete combustion of methane to yield carbon black?",
      option_a: "CH₄ + 2 O₂ → CO₂ + 2 H₂O",
      option_b: "2 CH₄ + O₂ → 2 CH₃OH",
      option_c: "CH₄ + O₂ → C + 2 H₂O",
      option_d: "CH₄ + H₂O → CO + 3 H₂",
      correct_option: "C",
      explanation: "When methane is burned in an insufficient supply of air or oxygen, incomplete combustion yields elemental carbon (carbon black) and water:\nCH₄ + O₂ → C + 2 H₂O\nReaction (A) is complete combustion, (B) is catalytic oxidation, and (D) is steam reforming.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1364,
    payload: {
      question: "Normally, alkanes resist oxidation by aqueous KMnO₄. However, 2-methylpropane containing a tertiary hydrogen atom is oxidized by alkaline KMnO₄ to:",
      option_a: "2-Methylpropan-2-ol (tert-butyl alcohol)",
      option_b: "2-Methylpropanoic acid",
      option_c: "Acetone and carbon dioxide",
      option_d: "Isobutyl alcohol",
      correct_option: "A",
      explanation: "Alkanes containing a tertiary (3°) hydrogen atom can be oxidized by potassium permanganate (KMnO₄) to the corresponding tertiary alcohols:\n(CH₃)₃C−H + [O] —(KMnO₄)→ (CH₃)₃C−OH (2-methylpropan-2-ol or tert-butyl alcohol).\nPrimary and secondary C−H bonds in alkanes do not react under these conditions.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1365,
    payload: {
      question: "Among isomeric alkanes of formula C₅H₁₂, the correct decreasing order of heat of combustion (ΔH_comb) is:\n(I) n-Pentane\n(II) 2-Methylbutane (Isopentane)\n(III) 2,2-Dimethylpropane (Neopentane)",
      option_a: "III > II > I",
      option_b: "II > I > III",
      option_c: "I > II > III",
      option_d: "I > III > II",
      correct_option: "C",
      explanation: "Branching increases the thermodynamic stability of isomeric alkanes (due to stronger dispersion interactions within more compact spherical structures and more stable C−C bonds).\nGreater stability corresponds to lower heat of combustion.\nSince neopentane (III) is the most stable and n-pentane (I) is the least stable, the heat of combustion released follows the sequence: n-Pentane > Isopentane > Neopentane (I > II > III).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1366,
    payload: {
      question: "Statement-I: When n-butane is treated with anhydrous AlCl₃ and HCl at 573 K, it isomerizes to 2-methylpropane.\nStatement-II: Branching in alkanes lowers the boiling point because it reduces the surface area and van der Waals forces.",
      option_a: "Both Statement-I and Statement-II are correct.",
      option_b: "Both Statement-I and Statement-II are incorrect.",
      option_c: "Statement-I is correct but Statement-II is incorrect.",
      option_d: "Statement-I is incorrect but Statement-II is correct.",
      correct_option: "A",
      explanation: "Statement-I is correct: n-butane undergoes catalytic isomerization to 2-methylpropane (isobutane) in the presence of AlCl₃ and HCl.\nStatement-II is correct: branching makes the molecule more spherical and compact, reducing molecular surface area and weakening intermolecular van der Waals forces, which lowers the boiling point.\nThus, both statements are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1367,
    payload: {
      question: "The correct sequence of halogens in order of increasing reactivity with alkanes in free-radical halogenation is:",
      option_a: "I₂ < Br₂ < Cl₂ < F₂",
      option_b: "F₂ < Cl₂ < Br₂ < I₂",
      option_c: "I₂ < Cl₂ < Br₂ < F₂",
      option_d: "Br₂ < I₂ < Cl₂ < F₂",
      correct_option: "A",
      explanation: "The reactivity of halogens towards alkanes depends on the exothermicity of the reaction steps:\n- F₂ reacts explosively even in the dark (most reactive).\n- Cl₂ reacts rapidly in diffused sunlight.\n- Br₂ reacts smoothly at higher temperatures or under light.\n- I₂ is sluggish and reversible (least reactive).\nThus, the increasing order of reactivity is: I₂ < Br₂ < Cl₂ < F₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1368,
    payload: {
      question: "Which of the following is an example of a free radical substitution reaction?",
      option_a: "Addition of HBr to ethene",
      option_b: "Bromination of methane with Br₂ in the presence of sunlight (hν)",
      option_c: "Nitration of benzene with conc. HNO₃ and conc. H₂SO₄",
      option_d: "Hydrolysis of ethyl bromide with aqueous KOH",
      correct_option: "B",
      explanation: "Bromination of methane under sunlight involves photochemical homolysis of the Br−Br bond into bromine free radicals, which initiate a chain reaction replacing H atoms with Br atoms.\nThis is a classic free-radical substitution reaction.\nAddition of HBr is electrophilic addition, nitration of benzene is electrophilic aromatic substitution, and hydrolysis of ethyl bromide is nucleophilic substitution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1369,
    payload: {
      question: "Decarboxylation of sodium butanoate (CH₃CH₂CH₂COONa) using soda lime (NaOH + CaO) on heating produces:",
      option_a: "Butane",
      option_b: "Propane",
      option_c: "Ethane",
      option_d: "Pentane",
      correct_option: "B",
      explanation: "Soda lime decarboxylation removes the carboxyl group (−COONa) as sodium carbonate (Na₂CO₃), leaving an alkane containing one less carbon atom than the parent carboxylic acid salt:\nCH₃CH₂CH₂COONa + NaOH —(CaO / Δ)→ CH₃CH₂CH₃ (Propane) + Na₂CO₃\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1370,
    payload: {
      question: "Which of the following alkanes cannot be prepared by Kolbe's electrolytic method?",
      option_a: "Ethane",
      option_b: "Butane",
      option_c: "Methane",
      option_d: "Hexane",
      correct_option: "C",
      explanation: "In Kolbe's electrolytic synthesis, radicals generated by anode decarboxylation dimerize (2 R• → R−R).\nSince at least two methyl radicals must combine (CH₃• + CH₃• → C₂H₆), ethane is the smallest alkane that can be formed.\nMethane (a one-carbon alkane) cannot be formed by coupling.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1371,
    payload: {
      question: "Electrolysis of an aqueous solution containing an equimolar mixture of sodium acetate (CH₃COONa) and sodium propionate (CH₃CH₂COONa) produces which of the following alkanes at the anode?",
      option_a: "Ethane only",
      option_b: "Propane only",
      option_c: "Butane only",
      option_d: "A mixture of ethane, propane, and butane",
      correct_option: "D",
      explanation: "Anodic decarboxylation generates both methyl radicals (CH₃•) and ethyl radicals (CH₃CH₂•).\nThese radicals couple in all possible combinations:\n1. CH₃• + CH₃• → CH₃−CH₃ (Ethane)\n2. CH₃• + CH₃CH₂• → CH₃−CH₂−CH₃ (Propane)\n3. CH₃CH₂• + CH₃CH₂• → CH₃−CH₂−CH₂−CH₃ (Butane)\nThus, a mixture of ethane, propane, and butane is obtained.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1372,
    payload: {
      question: "Electrolysis of a concentrated aqueous solution of potassium butanoate yields at the anode:",
      option_a: "Propane",
      option_b: "Butane",
      option_c: "Hexane",
      option_d: "Octane",
      correct_option: "C",
      explanation: "Potassium butanoate contains the propyl carboxylate anion: CH₃CH₂CH₂COO⁻.\nAt the anode, loss of electrons and decarboxylation gives propyl radicals:\n2 CH₃CH₂CH₂COO⁻ − 2e⁻ → 2 CH₃CH₂CH₂• + 2 CO₂↑\nCoupling of two propyl radicals yields n-hexane:\n2 CH₃CH₂CH₂• → CH₃(CH₂)₄CH₃ (n-hexane).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1373,
    payload: {
      question: "When a concentrated aqueous solution of potassium acetate is electrolyzed, the gases evolved at the anode are:",
      option_a: "Methane and oxygen",
      option_b: "Ethane and hydrogen",
      option_c: "Ethane and carbon dioxide",
      option_d: "Ethene and carbon dioxide",
      correct_option: "C",
      explanation: "In Kolbe's electrolysis of potassium acetate:\nAt the anode: 2 CH₃COO⁻ − 2e⁻ → C₂H₆ (ethane) + 2 CO₂↑\nAt the cathode: 2 H₂O + 2e⁻ → H₂↑ + 2 OH⁻\nThus, ethane and carbon dioxide are liberated at the anode.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1374,
    payload: {
      question: "Which of the following statements regarding Kolbe's electrolytic synthesis of alkanes are correct?\n(A) Symmetrical alkanes with an even number of carbon atoms are synthesized in good yields.\n(B) Sodium or potassium salts of monocarboxylic acids are used as starting materials.\n(C) Hydrogen gas is evolved at the cathode.\n(D) The solution becomes increasingly basic (alkaline) as electrolysis proceeds.",
      option_a: "All (A), (B), (C), and (D)",
      option_b: "Both (A) and (B) only",
      option_c: "Both (B) and (C) only",
      option_d: "Both (A) and (D) only",
      correct_option: "A",
      explanation: "In Kolbe's electrolysis:\n- Symmetrical even-carbon alkanes are obtained in high yields at the anode (A is correct).\n- Alkali metal salts of carboxylic acids are used as substrates (B is correct).\n- Reduction of water at the cathode liberates H₂ gas and produces OH⁻ ions (C is correct).\n- Generation of OH⁻ makes the solution alkaline with increasing pH (D is correct).\nHence, all statements are correct.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 29 Part 5 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Update failed:', err.message);
  }
}

run();
