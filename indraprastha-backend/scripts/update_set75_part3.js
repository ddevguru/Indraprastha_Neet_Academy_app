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

const part3Updates = [
  {
    id: 1047,
    similar: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A): Formic acid (HCOOH) gives a positive silver mirror test with Tollen's reagent, whereas acetic acid (CH₃COOH) does not.\nReason (R): Formic acid contains a formyl hydrogen atom (-CHO group) in its structure alongside the carboxylic acid group (-COOH).\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both A and R are true, and R is the correct explanation of A.",
      option_b: "(B) Both A and R are true, but R is NOT the correct explanation of A.",
      option_c: "(C) A is true, but R is false.",
      option_d: "(D) A is false, but R is true.",
      correct_option: "A",
      explanation: "Step 1: In formic acid (H-COOH), the hydrogen atom is directly attached to the carbonyl group, which gives it the characteristic properties of both an aldehyde (formyl group, H-C=O) and a carboxylic acid (-COOH).\nStep 2: Because of this formyl group, formic acid acts as a mild reducing agent and reduces Tollen's reagent [Ag(NH₃)₂]⁺ to metallic silver (Ag), forming CO₂ and H₂O.\nStep 3: Other carboxylic acids like acetic acid lack this formyl hydrogen and cannot reduce Tollen's reagent.\nStep 4: Therefore, Assertion A is true, Reason R is true, and R correctly explains A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1048,
    similar: {
      question: "Which of the following reaction sequences can be used for the preparation of benzophenone (diphenyl ketone, C₆H₅-CO-C₆H₅)?\nI. Friedel-Crafts acylation of benzene with benzoyl chloride in the presence of anhydrous AlCl₃.\nII. Reaction of benzoyl chloride with diphenylcadmium [(C₆H₅)₂Cd].\nChoose the most appropriate option:",
      option_a: "(A) Both I and II",
      option_b: "(B) I only",
      option_c: "(C) II only",
      option_d: "(D) Neither I nor II",
      correct_option: "A",
      explanation: "Step 1: Method I: Benzene reacts with benzoyl chloride (C₆H₅COCl) in the presence of anhydrous AlCl₃ via Friedel-Crafts acylation to give benzophenone: C₆H₆ + C₆H₅COCl --(anhyd. AlCl₃)--> C₆H₅-CO-C₆H₅ + HCl. (Valid method)\nStep 2: Method II: Dialkylcadmium or diarylcadmium reagents are less reactive than Grignard reagents and react smoothly with acyl chlorides to give ketones without adding further to the ketone: 2 C₆H₅COCl + (C₆H₅)₂Cd → 2 C₆H₅-CO-C₆H₅ + CdCl₂. (Valid method)\nStep 3: Both methods cleanly yield benzophenone.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1049,
    similar: {
      question: "The addition of sodium hydrogen sulphite (NaHSO₃) to aldehydes and ketones yields crystalline bisulphite addition compounds. Which of the following statements regarding this reaction is INCORRECT?",
      option_a: "(A) The bisulphite addition compounds are water-soluble crystalline solids.",
      option_b: "(B) The position of equilibrium lies largely to the right for most aldehydes, but to the left for sterically hindered ketones.",
      option_c: "(C) The addition compounds cannot be regenerated back to the original aldehyde or ketone by treatment with dilute acid or base.",
      option_d: "(D) This reaction is widely used for the separation and purification of aldehydes.",
      correct_option: "C",
      explanation: "Step 1: Carbonyl compounds add sodium hydrogen sulphite (NaHSO₃) reversibly to form crystalline bisulphite addition adducts.\nStep 2: Aldehydes have less steric hindrance, so equilibrium lies predominantly to the right (product side). For sterically hindered ketones, steric crowding shifts equilibrium to the left.\nStep 3: The crystalline addition compound can be readily decomposed by treating with dilute mineral acids or aqueous alkalies to regenerate the pure original aldehyde or ketone.\nStep 4: Therefore, the statement claiming they cannot be regenerated is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1050,
    similar: {
      question: "An organic compound 'X' with molecular formula C₈H₈O gives an orange-red precipitate with 2,4-DNP and forms a silver mirror with Tollen's reagent. It does not have any α-hydrogen atoms and undergoes the Cannizzaro reaction. Vigorous oxidation of 'X' with alkaline KMnO₄ yields terephthalic acid (benzene-1,4-dicarboxylic acid). Compound 'X' is:",
      option_a: "(A) Acetophenone",
      option_b: "(B) 4-Methylbenzaldehyde",
      option_c: "(C) 2-Methylbenzaldehyde",
      option_d: "(D) Phenylethanal",
      correct_option: "B",
      explanation: "Step 1: Positive 2,4-DNP test indicates the presence of a carbonyl group (>C=O).\nStep 2: Positive Tollen's test confirms that the compound is an aldehyde (-CHO).\nStep 3: Undergoing the Cannizzaro reaction indicates the absence of α-hydrogen atoms, meaning the -CHO group is attached directly to the aromatic ring (an aromatic aldehyde).\nStep 4: Vigorous oxidation gives terephthalic acid (benzene-1,4-dicarboxylic acid), indicating that two substituents are in a 1,4- (para) relationship on the benzene ring.\nStep 5: With molecular formula C₈H₈O, compound 'X' is 4-methylbenzaldehyde (p-methylbenzaldehyde).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1051,
    similar: {
      question: "Which of the following carbonyl compounds is the MOST reactive towards nucleophilic addition reactions?",
      option_a: "(A) Benzaldehyde (C₆H₅CHO)",
      option_b: "(B) Acetone (CH₃COCH₃)",
      option_c: "(C) Formaldehyde (HCHO)",
      option_d: "(D) Acetophenone (C₆H₅COCH₃)",
      correct_option: "C",
      explanation: "Step 1: Nucleophilic addition reactivity depends on: (i) the magnitude of partial positive charge (δ+) on the carbonyl carbon, and (ii) steric hindrance around the carbonyl carbon.\nStep 2: Formaldehyde (HCHO) has no alkyl or aryl groups. It exhibits zero +I inductive effect and minimal steric hindrance, leaving its carbonyl carbon highly electrophilic.\nStep 3: In aldehydes with alkyl groups (CH₃CHO) and ketones ((CH₃)₂CO), +I donor groups diminish the electrophilicity and introduce steric crowding.\nStep 4: In aromatic carbonyls (C₆H₅CHO, C₆H₅COCH₃), resonance (+R effect) from the benzene ring strongly stabilizes the carbonyl group and reduces electrophilicity.\nStep 5: Hence, HCHO is by far the most reactive.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1052,
    similar: {
      question: "In the mechanism of the Cannizzaro reaction of benzaldehyde in the presence of concentrated alkali, which of the following is the slow, rate-determining step?",
      option_a: "(A) Reversible attack of hydroxide ion (OH⁻) on the carbonyl carbon.",
      option_b: "(B) Transfer of a hydride ion (:H⁻) from the tetrahedral monoanion/dianion intermediate to a second aldehyde molecule.",
      option_c: "(C) Rapid proton transfer between the carboxylic acid and alkoxide ion.",
      option_d: "(D) Coordination of the alkali metal cation with the carbonyl oxygen.",
      correct_option: "B",
      explanation: "Step 1: The first step is the rapid, reversible nucleophilic attack of OH⁻ on the carbonyl carbon of benzaldehyde to form a tetrahedral intermediate [C₆H₅-CH(OH)-O⁻].\nStep 2: The second step involves the transfer of a hydride ion (:H⁻) from this intermediate to the carbonyl carbon of a second benzaldehyde molecule. Because hydride ion is a very poor leaving group, this step has the highest activation energy and is the rate-determining (slow) step of the reaction.\nStep 3: The final step is a fast proton exchange between benzoic acid and benzyl alkoxide to form benzoate anion and benzyl alcohol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1053,
    similar: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A): 2,2-Dimethylpropanoic acid ((CH₃)₃C-COOH) does not undergo the Hell-Volhard-Zelinsky (HVZ) reaction.\nReason (R): Carboxylic acids require at least one α-hydrogen atom to undergo halogenation at the α-position in the HVZ reaction.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both A and R are true, and R is the correct explanation of A.",
      option_b: "(B) Both A and R are true, but R is NOT the correct explanation of A.",
      option_c: "(C) A is true, but R is false.",
      option_d: "(D) A is false, but R is true.",
      correct_option: "A",
      explanation: "Step 1: The Hell-Volhard-Zelinsky (HVZ) reaction involves the halogenation of aliphatic carboxylic acids at the α-position using X₂ (Cl₂ or Br₂) in the presence of red phosphorus.\nStep 2: The mechanism proceeds via the enol or enolized acid halide intermediate, which strictly requires the presence of an α-hydrogen atom on the carbon adjacent to the -COOH group.\nStep 3: In 2,2-dimethylpropanoic acid (pivalic acid, (CH₃)₃C-COOH), the α-carbon is quaternary and bonded to three methyl groups, having zero α-hydrogens. Thus, it cannot undergo the HVZ reaction.\nStep 4: Both Assertion A and Reason R are true, and R correctly explains A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1054,
    similar: {
      question: "Which pair of carbonyl compounds undergoes cross-aldol condensation in the presence of dilute NaOH followed by heating to produce 1,3-diphenylprop-2-en-1-one (chalcone, C₆H₅-CH=CH-CO-C₆H₅)?",
      option_a: "(A) Benzaldehyde and Acetophenone",
      option_b: "(B) Benzaldehyde and Benzaldehyde",
      option_c: "(C) Acetophenone and Acetone",
      option_d: "(D) Benzaldehyde and Acetaldehyde",
      correct_option: "A",
      explanation: "Step 1: In the cross-aldol reaction between benzaldehyde (C₆H₅CHO) and acetophenone (C₆H₅COCH₃):\nStep 2: Benzaldehyde has no α-hydrogen and cannot form an enolate ion.\nStep 3: Acetophenone has three α-hydrogens on its methyl group (CH₃-CO-C₆H₅). The base abstracts an α-proton to form the enolate ion (⁻CH₂-CO-C₆H₅).\nStep 4: This enolate attacks the electrophilic carbonyl carbon of benzaldehyde to form a β-hydroxy ketone:\nC₆H₅-CH(OH)-CH₂-CO-C₆H₅.\nStep 5: Subsequent dehydration gives 1,3-diphenylprop-2-en-1-one (chalcone, C₆H₅-CH=CH-CO-C₆H₅).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1055,
    similar: {
      question: "In the Etard reaction, oxidation of toluene with chromyl chloride (CrO₂Cl₂) in CS₂ or CCl₄ produces a brown intermediate complex 'X'. Hydrolysis of 'X' gives benzaldehyde. The structure of 'X' is:",
      option_a: "(A) C₆H₅CH(OCrOHCl₂)₂",
      option_b: "(B) C₆H₅CH₂CrO₂Cl",
      option_c: "(C) C₆H₅CrO₂Cl",
      option_d: "(D) C₆H₅CH(CrO₂Cl)₂",
      correct_option: "A",
      explanation: "Step 1: In the Etard reaction, toluene (C₆H₅CH₃) is treated with chromyl chloride (CrO₂Cl₂) dissolved in a nonpolar solvent like carbon disulfide (CS₂) or CCl₄.\nStep 2: Chromyl chloride selectively oxidizes the methyl group to form an insoluble brown chromium complex intermediate: C₆H₅CH(OCrOHCl₂)₂.\nStep 3: Subsequent acidic hydrolysis of this complex decomposes it to yield benzaldehyde (C₆H₅CHO).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1056,
    similar: {
      question: "When benzene is treated with carbon monoxide (CO) and hydrogen chloride (HCl) gas in the presence of anhydrous aluminium chloride (AlCl₃) and cuprous chloride (CuCl), the major organic product formed is:",
      option_a: "(A) Chlorobenzene",
      option_b: "(B) Toluene",
      option_c: "(C) Benzoic acid",
      option_d: "(D) Benzaldehyde",
      correct_option: "D",
      explanation: "Step 1: This reaction is the classic Gattermann-Koch reaction.\nStep 2: Carbon monoxide and HCl react in the presence of anhydrous AlCl₃ and CuCl catalyst to generate the transient electrophilic formylating agent, formyl cation or formyl chloride (HCO⁺ / HCOCl).\nStep 3: Electrophilic aromatic substitution on benzene by this electrophile introduces the formyl group (-CHO) onto the benzene ring:\nC₆H₆ + CO + HCl --(anhyd. AlCl₃ / CuCl)--> C₆H₅CHO + HCl\nStep 4: The product obtained is benzaldehyde.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1057,
    similar: {
      question: "Given below are two statements:\nStatement I: The boiling points of aldehydes and ketones are higher than nonpolar hydrocarbons and ethers of comparable molecular masses due to dipole-dipole attractions.\nStatement II: The boiling points of aldehydes and ketones are lower than those of alcohols of comparable molecular masses because carbonyl compounds cannot form intermolecular hydrogen bonds with themselves.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
      option_a: "(A) Both Statement I and Statement II are correct.",
      option_b: "(B) Both Statement I and Statement II are incorrect.",
      option_c: "(C) Statement I is correct, but Statement II is incorrect.",
      option_d: "(D) Statement I is incorrect, but Statement II is correct.",
      correct_option: "A",
      explanation: "Step 1: Evaluating Statement I: The carbonyl group (>C=O) is strongly polar due to the electronegativity difference between carbon and oxygen. This leads to intermolecular dipole-dipole attractions, giving aldehydes and ketones higher boiling points than nonpolar alkanes and weakly polar ethers of similar molecular mass. Thus, Statement I is correct.\nStep 2: Evaluating Statement II: Unlike alcohols, aldehydes and ketones do not possess a hydrogen atom covalently bonded to an electronegative atom (like -O-H). Consequently, they cannot form intermolecular hydrogen bonds among themselves, resulting in significantly lower boiling points compared to alcohols of comparable molar mass. Thus, Statement II is correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1058,
    similar: {
      question: "Nucleophilic addition of methyllithium (CH₃Li) to cyclopentanone followed by protonation with water yields which organic product?",
      option_a: "(A) Cyclopentanol",
      option_b: "(B) 1-Methylcyclopentanol",
      option_c: "(C) Methylcyclopentane",
      option_d: "(D) Cyclopentanone oxime",
      correct_option: "B",
      explanation: "Step 1: Methyllithium (CH₃Li) acts as a powerful source of nucleophilic methyl carbanion (CH₃⁻).\nStep 2: Attack of the methyl group on the carbonyl carbon of cyclopentanone breaks the C=O pi bond, generating a lithium alkoxide intermediate (1-methylcyclopentan-1-olate lithium salt).\nStep 3: Upon quenching/protonation with water (H₂O), the alkoxide is converted into a tertiary alcohol: 1-methylcyclopentanol.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1059,
    similar: {
      question: "Which of the following reducing agents converts an aldehyde or ketone into the corresponding hydrocarbon (>C=O to >CH₂) under strongly acidic conditions?",
      option_a: "(A) LiAlH₄ in dry ether",
      option_b: "(B) NaBH₄ in ethanol",
      option_c: "(C) NH₂NH₂ / KOH in ethylene glycol",
      option_d: "(D) Amalgamated zinc and concentrated hydrochloric acid (Zn-Hg / conc. HCl)",
      correct_option: "D",
      explanation: "Step 1: Clemmensen reduction employs zinc amalgam and concentrated hydrochloric acid (Zn-Hg / conc. HCl), which operates under strongly acidic conditions to reduce carbonyl groups (>C=O) of aldehydes and ketones directly to methylene groups (>CH₂).\nStep 2: Wolff-Kishner reduction (NH₂NH₂ / KOH, Δ) also reduces >C=O to >CH₂, but operates under strongly basic conditions.\nStep 3: LiAlH₄ and NaBH₄ reduce carbonyls to alcohols, not hydrocarbons.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1060,
    similar: {
      question: "A compound contains both a keto group and an ester group. Treatment of this compound with sodium borohydride (NaBH₄) in ethanol results in:",
      option_a: "(A) Reduction of both keto and ester groups to alcohols",
      option_b: "(B) Selective reduction of the keto group to a secondary alcohol while leaving the ester group intact",
      option_c: "(C) Selective reduction of the ester group while leaving the keto group intact",
      option_d: "(D) Hydrolysis of the ester group to a carboxylic acid",
      correct_option: "B",
      explanation: "Step 1: Sodium borohydride (NaBH₄) is a mild and chemoselective reducing agent.\nStep 2: It readily reduces aldehydes to primary alcohols and ketones to secondary alcohols.\nStep 3: Under standard conditions, NaBH₄ is not reactive enough to reduce esters, carboxylic acids, or amides.\nStep 4: Therefore, NaBH₄ selectively reduces the ketone group to a secondary alcohol while the ester group remains completely intact.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1061,
    similar: {
      question: "Reductive ozonolysis (O₃ followed by Zn / H₂O) of 2-methylbut-2-ene ((CH₃)₂C=CH-CH₃) yields which pair of products?",
      option_a: "(A) Propanone and Ethanoic acid",
      option_b: "(B) Propanone and Ethanal",
      option_c: "(C) Ethanal and Methanal",
      option_d: "(D) Two moles of Acetone",
      correct_option: "B",
      explanation: "Step 1: In reductive ozonolysis, the carbon-carbon double bond (C=C) is cleaved completely, and an oxygen atom is added to each doubly bonded carbon atom.\nStep 2: For 2-methylbut-2-ene: (CH₃)₂C=CH-CH₃:\n- The left carbon carries two methyl groups: (CH₃)₂C=O (propan-2-one or acetone).\n- The right carbon carries a hydrogen and a methyl group: O=CH-CH₃ (ethanal or acetaldehyde).\nStep 3: The presence of Zn dust prevents further oxidation of ethanal to ethanoic acid.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1062,
    similar: {
      question: "Given below are two statements:\nStatement I: Aldehydes and ketones possessing at least one α-hydrogen atom undergo aldol condensation in the presence of dilute alkali.\nStatement II: Cross-aldol condensation can only take place between two different aldehydes; ketones cannot participate in cross-aldol condensations.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
      option_a: "(A) Both Statement I and Statement II are correct.",
      option_b: "(B) Both Statement I and Statement II are incorrect.",
      option_c: "(C) Statement I is correct, but Statement II is incorrect.",
      option_d: "(D) Statement I is incorrect, but Statement II is correct.",
      correct_option: "C",
      explanation: "Step 1: Evaluating Statement I: Aldehydes and ketones containing at least one α-hydrogen atom are deprotonated by dilute bases (NaOH, Ba(OH)₂) to form nucleophilic enolate ions, which add to another carbonyl molecule in an aldol reaction. Thus, Statement I is correct.\nStep 2: Evaluating Statement II: Cross-aldol condensation readily occurs between two different aldehydes, between an aldehyde and a ketone (e.g., Claisen-Schmidt condensation between benzaldehyde and acetone), or between two different ketones. Thus, Statement II is completely incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1063,
    similar: {
      question: "Which of the following alkylbenzenes does NOT produce benzoic acid upon vigorous heating with alkaline KMnO₄ followed by acidification?",
      option_a: "(A) Toluene (C₆H₅CH₃)",
      option_b: "(B) Ethylbenzene (C₆H₅CH₂CH₃)",
      option_c: "(C) tert-Butylbenzene (C₆H₅C(CH₃)₃)",
      option_d: "(D) Isopropylbenzene (C₆H₅CH(CH₃)₂)",
      correct_option: "C",
      explanation: "Step 1: Oxidation of an alkylbenzene side chain to benzoic acid with hot alkaline KMnO₄ requires the presence of at least one benzylic hydrogen atom on the carbon directly attached to the benzene ring.\nStep 2: Toluene has three benzylic hydrogens, ethylbenzene has two, and isopropylbenzene (cumene) has one benzylic hydrogen. All of these are oxidized to benzoic acid.\nStep 3: tert-Butylbenzene (C₆H₅-C(CH₃)₃) has a tertiary benzylic carbon with zero benzylic hydrogens. Consequently, it is completely resistant to permanganate oxidation and does not form benzoic acid.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1064,
    similar: {
      question: "When a Grignard reagent (RMgX) is bubbled with carbon dioxide (CO₂) in dry ether, it forms an addition complex 'Y'. What is the chemical structure of 'Y'?",
      option_a: "(A) R₃C-OMgX",
      option_b: "(B) R-CO-X",
      option_c: "(C) (RCOO)₂Mg",
      option_d: "(D) R-COO⁻ Mg⁺X",
      correct_option: "D",
      explanation: "Step 1: The nucleophilic alkyl or aryl carbanion (R⁻) of the Grignard reagent attacks the electrophilic carbon of carbon dioxide (O=C=O):\nStep 2: R-MgX + O=C=O → R-COO⁻ Mg⁺X (magnesium halocarboxylate salt).\nStep 3: This salt 'Y' subsequently hydrolyzes in aqueous mineral acid to yield the carboxylic acid: R-COOH + Mg(OH)X.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1065,
    similar: {
      question: "Carboxylic acids exhibit higher boiling points than aldehydes, ketones, and even alcohols of comparable molecular masses. This exceptionally high boiling point is primarily due to:",
      option_a: "(A) Intramolecular hydrogen bonding",
      option_b: "(B) Strong intermolecular hydrogen bonding forming stable cyclic dimers in vapor and liquid states",
      option_c: "(C) Weak London dispersion forces",
      option_d: "(D) Formation of carboxylate anions in pure liquid",
      correct_option: "B",
      explanation: "Step 1: Carboxylic acid molecules possess both a carbonyl oxygen (hydrogen bond acceptor) and a hydroxyl group (hydrogen bond donor).\nStep 2: This unique geometry allows two molecules of carboxylic acid to pair together through two strong intermolecular hydrogen bonds, forming very stable cyclic dimers even in the vapor phase.\nStep 3: Alcohols form linear hydrogen-bonded chains, which are more easily disrupted than the dual hydrogen-bonded cyclic dimers of carboxylic acids. Hence, carboxylic acids have higher boiling points.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1066,
    similar: {
      question: "Given below are two statements:\nStatement I: Carboxylic acids produce brisk effervescence when treated with an aqueous solution of sodium hydrogen carbonate (NaHCO₃).\nStatement II: The brisk effervescence observed is due to the rapid evolution of hydrogen gas (H₂).\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
      option_a: "(A) Both Statement I and Statement II are correct.",
      option_b: "(B) Statement I is correct, but Statement II is incorrect.",
      option_c: "(C) Statement I is incorrect, but Statement II is correct.",
      option_d: "(D) Both Statement I and Statement II are incorrect.",
      correct_option: "B",
      explanation: "Step 1: Evaluating Statement I: Carboxylic acids are stronger acids than carbonic acid (H₂CO₃). They decompose aqueous sodium hydrogen carbonate (NaHCO₃) to form sodium carboxylate, water, and carbon dioxide:\nRCOOH + NaHCO₃ → RCOONa + H₂O + CO₂ ↑. Thus, Statement I is correct.\nStep 2: Evaluating Statement II: The brisk effervescence is caused by the evolution of carbon dioxide (CO₂) gas, NOT hydrogen (H₂) gas. Thus, Statement II is incorrect.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1067,
    similar: {
      question: "Which of the following reagents selectively reduces the carboxylic acid group (-COOH) to a primary alcohol (-CH₂OH) without readily reducing other reducible functional groups such as esters or nitro groups?",
      option_a: "(A) Diborane (B₂H₆ in THF)",
      option_b: "(B) Sodium borohydride (NaBH₄)",
      option_c: "(C) H₂ / Pd",
      option_d: "(D) Concentrated HCl",
      correct_option: "A",
      explanation: "Step 1: Diborane (B₂H₆) in ether/THF reduces carboxylic acids rapidly and cleanly to primary alcohols.\nStep 2: Diborane is unique because it reduces carboxylic acids much faster than esters, nitro groups, or halides.\nStep 3: NaBH₄ does not reduce carboxylic acids at all.\nStep 4: LiAlH₄ reduces carboxylic acids, but it also non-selectively reduces esters, amides, and nitro groups.\nStep 5: Thus, diborane (B₂H₆) is the reagent of choice for selective reduction of carboxylic acids.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1068,
    similar: {
      question: "When sodium ethanoate (CH₃COONa) is heated with soda-lime (a mixture of NaOH and CaO in 3:1 ratio), the gaseous hydrocarbon evolved is:",
      option_a: "(A) Ethane",
      option_b: "(B) Methane",
      option_c: "(C) Ethene",
      option_d: "(D) Propane",
      correct_option: "B",
      explanation: "Step 1: Heating sodium salts of carboxylic acids with soda-lime (NaOH + CaO) results in decarboxylation (loss of carbon dioxide as carbonate):\nCH₃COONa + NaOH --(CaO, Δ)--> CH₄ ↑ + Na₂CO₃\nStep 2: The product alkane contains one carbon atom less than the parent carboxylic acid salt.\nStep 3: For sodium ethanoate (2 carbons), the resulting alkane is methane (CH₄, 1 carbon).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1069,
    similar: {
      question: "Which sequence of reagents effectively transforms prop-1-ene (CH₃-CH=CH₂) into propanal (CH₃-CH₂-CHO)?",
      option_a: "(A) (i) Acid-catalyzed hydration (H₂O / H⁺), (ii) Oxidation with acidified K₂Cr₂O₇",
      option_b: "(B) (i) Hydroboration-oxidation (B₂H₆ / THF, then H₂O₂ / OH⁻), (ii) Oxidation with PCC in CH₂Cl₂",
      option_c: "(C) (i) Addition of HBr in the presence of peroxides, (ii) Reaction with KCN",
      option_d: "(D) (i) Ozonolysis with O₃/Zn, (ii) Reduction with LiAlH₄",
      correct_option: "B",
      explanation: "Step 1: Acid-catalyzed hydration yields propan-2-ol (Markovnikov addition), which on oxidation gives propanone (acetone), not propanal.\nStep 2: Hydroboration-oxidation of prop-1-ene with B₂H₆ followed by alkaline H₂O₂ results in anti-Markovnikov hydration to give propan-1-ol (CH₃CH₂CH₂OH).\nStep 3: Subsequent oxidation of propan-1-ol with pyridinium chlorochromate (PCC) in anhydrous CH₂Cl₂ selectively oxidizes the primary alcohol to propanal (CH₃CH₂CHO) without over-oxidation to propanoic acid.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1070,
    similar: {
      question: "In the reaction of a ketone with semicarbazide (NH₂-NH-CO-NH₂), condensation occurs exclusively at the hydrazine -NH₂ group rather than the amide -NH₂ group. This is because:",
      option_a: "(A) The amide -NH₂ nitrogen has a greater steric hindrance than the hydrazine -NH₂.",
      option_b: "(B) The lone pair of electrons on the amide -NH₂ is delocalized into the adjacent carbonyl group by resonance, rendering it far less nucleophilic.",
      option_c: "(C) The hydrazine -NH₂ is more acidic than the amide -NH₂.",
      option_d: "(D) The amide group decomposes under the reaction conditions.",
      correct_option: "B",
      explanation: "Step 1: Semicarbazide has the formula H₂N-NH-CO-NH₂ with two different amino groups.\nStep 2: The amide nitrogen (-CO-NH₂) is adjacent to the electron-withdrawing carbonyl group. Its lone pair participates in resonance: -C(=O)-NH₂ ↔ -C(O⁻)=N⁺H₂.\nStep 3: This resonance delocalization substantially decreases the electron density and nucleophilicity of the amide nitrogen.\nStep 4: The hydrazine nitrogen (H₂N-NH-) is not conjugated with the carbonyl group, so its lone pair is localized and freely available for nucleophilic attack on the carbonyl carbon of the aldehyde or ketone to form a semicarbazone.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 75 Part 3 questions (IDs 1047 to 1070)...');
    
    for (const item of part3Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Set 75 Part 3 questions updated successfully!');
  } catch (err) {
    console.error('Error in Set 75 Part 3 update:', err);
  }
}

run();
