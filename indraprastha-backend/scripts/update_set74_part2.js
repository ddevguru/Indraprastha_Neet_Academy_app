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
    id: 4085,
    data: {
      question: "Which of the following classes of alcohols upon controlled oxidation with mild oxidizing agents (such as PCC or Collins reagent) yields a KETONE?",
      option_a: "Primary (1°) alcohol",
      option_b: "Secondary (2°) alcohol",
      option_c: "Tertiary (3°) alcohol",
      option_d: "Methanol",
      "correct_option": "B",
      explanation: "Step 1: Oxidation of primary alcohols:\nPrimary alcohols (R–CH₂OH) have two α-hydrogens. Controlled oxidation yields aldehydes (R–CHO), while strong oxidation yields carboxylic acids (R–COOH).\n\nStep 2: Oxidation of secondary alcohols:\nSecondary alcohols (R–CH(OH)–R') have one α-hydrogen. Removal of two hydrogens (one from –OH and one from the carbinol carbon) yields a ketone (R–CO–R'):\nR–CH(OH)–R' —([O])→ R–CO–R' + H₂O\n\nStep 3: Oxidation of tertiary alcohols:\nTertiary alcohols have zero α-hydrogens and do not undergo oxidation under mild conditions.\n\nStep 4: Therefore, secondary alcohols yield ketones.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4086,
    data: {
      question: "Ethanol (CH₃CH₂OH) can be selectively converted into acetaldehyde (ethanal, CH₃CHO) without over-oxidation to acetic acid by treatment with:",
      option_a: "Acidified potassium permanganate (KMnO₄ / H₂SO₄)",
      option_b: "Lithium aluminium hydride (LiAlH₄)",
      option_c: "Pyridinium chlorochromate (PCC) in anhydrous CH₂Cl₂",
      option_d: "Hot concentrated nitric acid (HNO₃)",
      "correct_option": "C",
      explanation: "Step 1: Role of PCC:\nPyridinium chlorochromate (PCC, C₅H₅NH⁺ ClCrO₃⁻) dissolved in dry dichloromethane (CH₂Cl₂) is a mild oxidizing agent.\n\nStep 2: Preventing over-oxidation:\nBecause the reaction is conducted in an anhydrous organic medium, the aldehyde formed cannot undergo hydration to a gem-diol (which is required for subsequent oxidation to a carboxylic acid). Thus, the oxidation stops cleanly at acetaldehyde:\nCH₃CH₂OH —(PCC, CH₂Cl₂)→ CH₃CHO\n\nStep 3: Other reagents:\nKMnO₄ and conc. HNO₃ oxidize ethanol directly to acetic acid (CH₃COOH); LiAlH₄ is a reducing agent, not an oxidant.\n\nStep 4: Therefore, PCC is the correct reagent.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4087,
    data: {
      question: "Why is phenol significantly MORE ACIDIC than aliphatic alcohols (e.g., ethanol)?",
      option_a: "Because the phenoxide ion (C₆H₅O⁻) is resonance-stabilized by delocalization of negative charge into the aromatic ring, whereas the ethoxide ion (C₂H₅O⁻) is destabilized by the +I inductive effect of the ethyl group",
      option_b: "Because oxygen in phenol is less electronegative than in ethanol",
      option_c: "Because ethanol forms stronger intermolecular hydrogen bonds than phenol",
      option_d: "Because phenol has a higher molecular weight than ethanol",
      "correct_option": "A",
      explanation: "Step 1: Dissociation of phenol vs. alcohol:\n- C₆H₅OH ⇌ C₆H₅O⁻ + H⁺ (pK_a ≈ 10)\n- C₂H₅OH ⇌ C₂H₅O⁻ + H⁺ (pK_a ≈ 16)\n\nStep 2: Stability of conjugate base:\nIn the phenoxide ion (C₆H₅O⁻), the negative charge on oxygen is delocalized over the ortho and para positions of the aromatic ring across five resonance structures.\nIn contrast, in the alkoxide ion (C₂H₅O⁻), the negative charge is localized on a single oxygen atom and is further intensified by the electron-donating inductive effect (+I) of the ethyl group, making it much less stable.\n\nStep 3: Consequently, the ionization equilibrium for phenol lies much further to the right, making phenol ~10⁶ times more acidic than ethanol.\n\nStep 4: Therefore, Option (A) is the correct explanation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4088,
    data: {
      question: "Which of the following chemical reactions yields a KETONE as the major organic product?",
      option_a: "Oxidation of propan-1-ol with PCC",
      option_b: "Ozonolysis of propene followed by Zn/H₂O",
      option_c: "Oxidation of propan-2-ol with acidified potassium dichromate (K₂Cr₂O₇ / H₂SO₄)",
      option_d: "Hydroboration-oxidation of propyne",
      "correct_option": "C",
      explanation: "Step 1: Analyze each reaction:\n- Option A: Propan-1-ol is a primary alcohol; oxidation with PCC gives propanal (an aldehyde).\n- Option B: Ozonolysis of propene (CH₃CH=CH₂) gives acetaldehyde (CH₃CHO) and formaldehyde (HCHO).\n- Option C: Propan-2-ol is a secondary alcohol ((CH₃)₂CHOH). Oxidation with acidified K₂Cr₂O₇ removes two hydrogen atoms to yield acetone (propan-2-one, a ketone):\n(CH₃)₂CHOH —(K₂Cr₂O₇, H⁺)→ CH₃COCH₃ + H₂O\n- Option D: Hydroboration-oxidation of terminal propyne gives propanal (an aldehyde).\n\nStep 2: Therefore, oxidation of propan-2-ol yields a ketone.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4089,
    data: {
      question: "When an unsymmetrical ether containing one tertiary alkyl group and one primary alkyl group, such as tert-butyl methyl ether, is cleaved by heating with concentrated hydriodic acid (HI), what products are formed?",
      option_a: "tert-Butyl alcohol and methyl iodide",
      option_b: "tert-Butyl iodide and methanol",
      option_c: "Isobutene and methyl iodide",
      option_d: "tert-Butyl iodide and methyl iodide",
      "correct_option": "B",
      explanation: "Step 1: Protonation of ether:\n(CH₃)₃C–O–CH₃ + HI ⇌ (CH₃)₃C–O⁺(H)–CH₃ + I⁻\n\nStep 2: Mechanistic pathway (S_N1 vs. S_N2):\n- If both alkyl groups are primary or secondary, cleavage occurs via an S_N2 pathway where iodide attacks the smaller, less hindered alkyl group to form methyl iodide and an alcohol.\n- However, when one of the groups is tertiary (e.g., tert-butyl), the reaction proceeds via an S_N1 pathway because the heterolytic cleavage of the C–O bond generates an exceptionally stable tertiary carbocation: (CH₃)₃C⁺.\n\nStep 3: Attack of nucleophile:\nIodide rapidly attacks the stable (CH₃)₃C⁺ carbocation to form tert-butyl iodide ((CH₃)₃C–I), while the leaving group departs as neutral methanol (CH₃OH):\n(CH₃)₃C–O–CH₃ + HI → (CH₃)₃C–I + CH₃OH\n\nStep 4: Therefore, tert-butyl iodide and methanol are the products.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4090,
    data: {
      question: "When butan-2-ol is heated under reflux with acidified potassium permanganate (KMnO₄ / H₂SO₄), the major product formed is:",
      option_a: "Butan-1-ol",
      option_b: "Butanoic acid",
      option_c: "Butan-2-one (ethyl methyl ketone)",
      option_d: "Butanal",
      "correct_option": "C",
      explanation: "Step 1: Nature of substrate:\nButan-2-ol, CH₃–CH(OH)–CH₂CH₃, is a secondary (2°) alcohol.\n\nStep 2: Oxidation reaction:\nOxidation of a secondary alcohol involves the dehydrogenation of the –CH(OH)– unit to form a carbonyl (>C=O) group:\nCH₃–CH(OH)–CH₂CH₃ + [O] —(KMnO₄, H⁺)→ CH₃–CO–CH₂CH₃ + H₂O\n\nStep 3: The product obtained is butan-2-one (butanone / ethyl methyl ketone).\n\nStep 4: Therefore, butan-2-one is produced.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4091,
    data: {
      question: "When an aqueous solution of phenol is treated with excess bromine water at room temperature, a white precipitate is immediately formed. What is the chemical identity of this white precipitate?",
      option_a: "o-Bromophenol",
      option_b: "2,4,6-Tribromophenol",
      option_c: "p-Bromophenol",
      option_d: "2,4-Dibromophenol",
      "correct_option": "B",
      explanation: "Step 1: Reactivity of phenol in aqueous solution:\nWater is a highly polar ionizing solvent that promotes the ionization of phenol into the phenoxide ion (C₆H₅O⁻).\n\nStep 2: Super-activation of aromatic ring:\nThe phenoxide ion has an extraordinarily strong +M resonance electron-donating effect, activating all ortho and para positions simultaneously towards electrophilic aromatic bromination.\n\nStep 3: Electrophilic bromination:\nEven without any Lewis acid catalyst, bromine water rapidly brominates all available ortho and para positions:\nC₆H₅OH + 3Br₂ (aq) → C₆H₂Br₃OH ↓ (white precipitate) + 3HBr\nThe product formed is 2,4,6-tribromophenol, which precipitates as a white crystalline solid.\n\nStep 4: Therefore, 2,4,6-tribromophenol is the precipitate.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4092,
    data: {
      question: "Which of the following alcohols undergoes acid-catalyzed dehydration to form an alkene with the GREATEST ease (lowest activation energy)?",
      option_a: "Ethanol (CH₃CH₂OH)",
      option_b: "Propan-2-ol ((CH₃)₂CHOH)",
      option_c: "2-Methylpropan-2-ol ((CH₃)₃COH)",
      option_d: "Propan-1-ol (CH₃CH₂CH₂OH)",
      "correct_option": "C",
      explanation: "Step 1: Mechanism of acid-catalyzed dehydration:\nDehydration of alcohols involves protonation of the –OH group followed by the loss of a water molecule to generate a carbocation intermediate (rate-determining step in E1 pathway).\n\nStep 2: Relative stability of carbocations:\nThe rate of dehydration is directly proportional to the stability of the intermediate carbocation:\nTertiary (3°) > Secondary (2°) > Primary (1°).\n\nStep 3: Compare carbocations:\n- 2-Methylpropan-2-ol forms a tertiary carbocation ((CH₃)₃C⁺) stabilized by 9 hyperconjugative α-hydrogens, dehydrating with ~20% H₂SO₄ at 358 K.\n- Secondary alcohols dehydrate with ~85% H₂SO₄ at 440 K.\n- Primary alcohols require concentrated H₂SO₄ at 443 K.\n\nStep 4: Therefore, 2-methylpropan-2-ol undergoes dehydration with the greatest ease.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4093,
    data: {
      question: "The hydroxyl (–OH) group of methanol cannot be directly replaced by chlorine by the action of which of the following reagents?",
      option_a: "Molecular chlorine gas (Cl₂)",
      option_b: "Hydrogen chloride in the presence of anhydrous ZnCl₂ (Lucas reagent)",
      option_c: "Phosphorus trichloride (PCl₃)",
      option_d: "Thionyl chloride (SOCl₂)",
      "correct_option": "A",
      explanation: "Step 1: Replacement of –OH by –Cl requires a reagent capable of converting the poor leaving group (–OH) into a good leaving group (e.g., –OH₂⁺, –OPCl₂, –OSOCl) followed by nucleophilic substitution by chloride ion.\n\nStep 2: Reagents that successfully replace –OH:\n- HCl + anhyd. ZnCl₂: CH₃OH + HCl → CH₃Cl + H₂O\n- PCl₃: 3CH₃OH + PCl₃ → 3CH₃Cl + H₃PO₃\n- PCl₅: CH₃OH + PCl₅ → CH₃Cl + POCl₃ + HCl\n- SOCl₂: CH₃OH + SOCl₂ → CH₃Cl + SO₂ + HCl\n\nStep 3: Action of molecular chlorine (Cl₂):\nMolecular chlorine is an oxidizing and free-radical halogenating agent; it does not displace –OH via nucleophilic substitution, but rather oxidizes methanol or chlorinates C–H bonds.\n\nStep 4: Therefore, Cl₂ cannot replace –OH by chlorine.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4094,
    data: {
      question: "When butan-2-ol is oxidized by heating with acidic potassium dichromate (K₂Cr₂O₇ / H₂SO₄), the resulting carbonyl product is:",
      option_a: "Butanal",
      option_b: "Butan-2-one (methyl ethyl ketone)",
      option_c: "Butanoic acid",
      option_d: "2-Methylpropanal",
      "correct_option": "B",
      explanation: "Step 1: Structure of reactant:\nButan-2-ol is a secondary alcohol: CH₃–CH(OH)–CH₂CH₃.\n\nStep 2: Oxidation of secondary alcohols:\nSecondary alcohols have one hydrogen atom on the carbinol carbon. Oxidation removes the hydroxyl hydrogen and the carbinol hydrogen to produce a ketone with the same number of carbon atoms:\nCH₃–CH(OH)–CH₂CH₃ —(K₂Cr₂O₇, H⁺)→ CH₃–CO–CH₂CH₃ + H₂O\n\nStep 3: The product is butan-2-one.\n\nStep 4: Therefore, Option (B) is the correct answer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4095,
    data: {
      question: "Which of the following alcohols does NOT yield a ketone upon controlled oxidation?",
      option_a: "Propan-2-ol (isopropyl alcohol)",
      option_b: "Prop-2-en-1-ol (allyl alcohol)",
      option_c: "Butan-2-ol (sec-butyl alcohol)",
      option_d: "1-Phenylethanol (methylphenylcarbinol)",
      "correct_option": "B",
      explanation: "Step 1: Identify the degree of each alcohol:\n- Propan-2-ol: (CH₃)₂CHOH (Secondary alcohol → oxidizes to acetone, a ketone).\n- Butan-2-ol: CH₃CH₂CH(OH)CH₃ (Secondary alcohol → oxidizes to butanone, a ketone).\n- 1-Phenylethanol: C₆H₅CH(OH)CH₃ (Secondary alcohol → oxidizes to acetophenone, a ketone).\n- Allyl alcohol: CH₂=CH–CH₂OH (PRIMARY alcohol).\n\nStep 2: Oxidation of allyl alcohol:\nBeing a primary alcohol, controlled oxidation of allyl alcohol yields acrolein (propenal, CH₂=CH–CHO), which is an ALDEHYDE, NOT a ketone:\nCH₂=CH–CH₂OH —([O])→ CH₂=CH–CHO + H₂O\n\nStep 3: Therefore, allyl alcohol does not give a ketone on oxidation.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4096,
    data: {
      question: "Tertiary alcohols (e.g., 2-methylpropan-2-ol) are exceptionally resistant to oxidation under neutral or alkaline conditions because:",
      option_a: "They do not have any hydrogen atom on the carbinol carbon atom (no α-hydrogen)",
      option_b: "The three alkyl groups exert a strong -I effect",
      option_c: "The –OH group is strongly acidic",
      option_d: "They form cyclic dimers in solution",
      "correct_option": "A",
      explanation: "Step 1: Requirement for alcohol oxidation:\nThe oxidation of an alcohol to a carbonyl compound requires the simultaneous cleavage of both an O–H bond and a C–H bond from the carbinol carbon (the α-carbon):\n>C(H)–OH → >C=O + 2H⁺ + 2e⁻\n\nStep 2: Structure of tertiary alcohols:\nIn a tertiary alcohol (R₃C–OH), the central carbinol carbon is directly bonded to three alkyl carbons and zero hydrogen atoms. Because there is no α-hydrogen available for elimination, formation of a C=O double bond without breaking carbon-carbon bonds is impossible.\n\nStep 3: Under forceful acidic conditions at high temperatures, tertiary alcohols dehydrate to alkenes followed by destructive C–C cleavage into smaller acids/ketones.\n\nStep 4: Therefore, the lack of an α-hydrogen atom makes tertiary alcohols resistant to oxidation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4097,
    data: {
      question: "The chemical conversion of ethanol into acetaldehyde:\nCH₃CH₂OH → CH₃CHO + 2H⁺ + 2e⁻\nis an example of:",
      option_a: "Hydrolysis",
      option_b: "Oxidation (Dehydrogenation)",
      option_c: "Reduction",
      option_d: "Molecular rearrangement",
      "correct_option": "B",
      explanation: "Step 1: Oxidation state of carbon:\n- In ethanol (CH₃CH₂OH), the oxidation state of the methylene carbon is -1.\n- In acetaldehyde (CH₃CHO), the oxidation state of the carbonyl carbon is +1.\nThe increase in oxidation number from -1 to +1 corresponds to an oxidation process.\n\nStep 2: Hydrogen count:\nThe conversion involves the removal of two hydrogen atoms (dehydrogenation), which by definition is an oxidation reaction.\n\nStep 3: Therefore, the conversion is an oxidation.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4098,
    data: {
      question: "When ethylene glycol (ethane-1,2-diol, HO–CH₂–CH₂–OH) is treated with periodic acid (HIO₄) at room temperature (Malaprade reaction), what organic product is formed?",
      option_a: "Formic acid (2 HCOOH)",
      option_b: "Carbon dioxide (2 CO₂)",
      option_c: "Glyoxal (OHC–CHO)",
      option_d: "Formaldehyde (2 HCHO)",
      "correct_option": "D",
      explanation: "Step 1: Malaprade cleavage of vicinal diols:\nPeriodic acid (HIO₄) selectively and quantitatively cleaves the carbon–carbon bond of vicinal diols (1,2-diols) via a cyclic periodate ester intermediate.\n\nStep 2: Cleavage of ethylene glycol:\nHO–CH₂–CH₂–OH + HIO₄ → 2 HCHO + HIO₃ + H₂O\nEach –CH₂OH group is cleaved and oxidized to a formaldehyde molecule (HCHO).\n\nStep 3: The products are two molecules of formaldehyde (methanal, HCHO) and iodic acid (HIO₃).\n\nStep 4: Therefore, Option (D) is the correct answer.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4099,
    data: {
      question: "Which of the following alcohols is oxidized MOST EASILY to a carbonyl compound by mild oxidizing agents?",
      option_a: "Benzyl alcohol (C₆H₅CH₂OH)",
      option_b: "Ethanol (CH₃CH₂OH)",
      option_c: "Propan-1-ol (CH₃CH₂CH₂OH)",
      option_d: "Methanol (CH₃OH)",
      "correct_option": "A",
      explanation: "Step 1: Factors affecting rate of alcohol oxidation:\nThe rate-determining step in chromic acid and other hydride-transfer oxidations involves the abstraction of an α-hydrogen as a hydride ion or radical, developing partial positive/radical character on the benzylic/allylic carbon in the transition state.\n\nStep 2: Benzyl alcohol:\nIn benzyl alcohol (C₆H₅CH₂OH), the benzylic C–H bonds are significantly weaker (bond dissociation energy ~375 kJ/mol vs ~410 kJ/mol in aliphatic alcohols) because the developing π-overlap in the transition state is resonance-stabilized by the aromatic ring.\n\nStep 3: Consequently, benzylic alcohols are oxidized substantially faster and under much milder conditions than simple aliphatic primary alcohols.\n\nStep 4: Therefore, benzyl alcohol is oxidized most easily.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4100,
    data: {
      question: "Which of the following alcohols will NOT undergo oxidation when treated with pyridinium chlorochromate (PCC) in dichloromethane?",
      option_a: "2-Methylpropan-2-ol (tert-butyl alcohol)",
      option_b: "Propan-1-ol",
      option_c: "Propan-2-ol",
      option_d: "Butan-1-ol",
      "correct_option": "A",
      explanation: "Step 1: Specificity of PCC:\nPyridinium chlorochromate selectively oxidizes primary alcohols to aldehydes and secondary alcohols to ketones.\n\nStep 2: Tertiary alcohols:\n2-Methylpropan-2-ol, (CH₃)₃COH, is a tertiary alcohol. It lacks an α-hydrogen on the carbinol carbon. Because PCC operates under mild non-acidic/anhydrous conditions, it cannot dehydrate the alcohol or cleave C–C bonds. Hence, no reaction occurs with tertiary alcohols.\n\nStep 3: Therefore, 2-methylpropan-2-ol does not oxidize with PCC.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4101,
    data: {
      question: "In the reaction sequence:\nPhenol —(aqueous NaOH)→ Compound A —(CH₃I, heat)→ Compound B\nIdentify Compound B.",
      option_a: "o-Cresol",
      option_b: "Toluene",
      option_c: "Anisole (methoxybenzene)",
      option_d: "Diphenyl ether",
      "correct_option": "C",
      explanation: "Step 1: Formation of Compound A:\nPhenol reacts with aqueous sodium hydroxide to form sodium phenoxide:\nC₆H₅OH + NaOH → C₆H₅O⁻Na⁺ (Compound A) + H₂O\n\nStep 2: Williamson ether synthesis (Formation of Compound B):\nSodium phenoxide reacts with methyl iodide via an S_N2 nucleophilic displacement:\nC₆H₅O⁻Na⁺ + CH₃–I —(heat)→ C₆H₅–O–CH₃ + NaI\nThe product formed is methoxybenzene, commonly known as anisole.\n\nStep 3: Therefore, Compound B is anisole (methoxybenzene).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4102,
    data: {
      question: "What is the correct order of reactivity of alcohols towards the Lucas reagent (conc. HCl + anhydrous ZnCl₂)?",
      option_a: "1° > 2° > 3°",
      option_b: "3° > 2° > 1°",
      option_c: "2° > 1° > 3°",
      option_d: "3° > 1° > 2°",
      "correct_option": "B",
      explanation: "Step 1: Mechanism of Lucas test:\nThe Lucas test proceeds via an S_N1 mechanism involving the formation of a carbocation intermediate:\nR–OH + ZnCl₂ ⇌ R–OH⁺–ZnCl₂⁻ → R⁺ + [ZnCl₂OH]⁻ —(Cl⁻)→ R–Cl\n\nStep 2: Carbocation stability:\nThe rate-determining step is the formation of the carbocation (R⁺). The stability of carbocations follows the order:\nTertiary (3°) > Secondary (2°) > Primary (1°).\n\nStep 3: Observation:\n- 3° alcohols form carbocations immediately, producing instant white cloudiness.\n- 2° alcohols react within 5 minutes.\n- 1° alcohols do not react at room temperature.\n\nStep 4: Therefore, the reactivity order is 3° > 2° > 1°.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4103,
    data: {
      question: "In the industrial fermentation of molasses to produce alcohol, sucrose is enzymatically hydrolyzed by invertase to glucose and fructose, which are subsequently fermented by zymase (from yeast) to yield which alcohol?",
      option_a: "Methanol (CH₃OH)",
      option_b: "Acetaldehyde (CH₃CHO)",
      option_c: "Ethanol (C₂H₅OH)",
      option_d: "Ethylene glycol (HOCH₂CH₂OH)",
      "correct_option": "C",
      explanation: "Step 1: Inversion of sucrose by invertase:\nC₁₂H₂₂O₁₁ + H₂O —(Invertase)→ C₆H₁₂O₆ (Glucose) + C₆H₁₂O₆ (Fructose)\n\nStep 2: Fermentation by zymase:\nThe zymase enzyme complex present in yeast converts glucose and fructose into ethanol and carbon dioxide:\nC₆H₁₂O₆ —(Zymase)→ 2 C₂H₅OH + 2 CO₂ ↑\n\nStep 3: Therefore, ethanol (C₂H₅OH) is the alcohol produced.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4104,
    data: {
      question: "What is the correct decreasing order of acidic strength among the following substituted phenols?\n(1) 4-Nitrophenol (p-nitrophenol)\n(2) 2-Nitrophenol (o-nitrophenol)\n(3) 3-Nitrophenol (m-nitrophenol)\n(4) Phenol",
      option_a: "4-Nitrophenol > 2-Nitrophenol > 3-Nitrophenol > Phenol",
      option_b: "Phenol > 3-Nitrophenol > 2-Nitrophenol > 4-Nitrophenol",
      option_c: "3-Nitrophenol > 4-Nitrophenol > 2-Nitrophenol > Phenol",
      option_d: "2-Nitrophenol > 4-Nitrophenol > 3-Nitrophenol > Phenol",
      "correct_option": "A",
      explanation: "Step 1: Effect of nitro substituent:\nThe –NO₂ group is strongly electron-withdrawing by both -I (inductive) and -M (mesomeric) effects, stabilizing the phenoxide anion and increasing acidity.\n\nStep 2: Position effects:\n- In 4-nitrophenol (p-isomer), both -M and -I effects operate strongly without any intramolecular hydrogen bonding. It is the most acidic (pK_a = 7.15).\n- In 2-nitrophenol (o-isomer), both -M and -I operate, but intramolecular hydrogen bonding between the phenolic –OH and the adjacent –NO₂ group stabilizes the undissociated molecule, slightly lowering its acidity compared to the para-isomer (pK_a = 7.23).\n- In 3-nitrophenol (m-isomer), only the -I effect operates (no -M resonance stabilization of the negative charge on oxygen), making it less acidic than ortho and para (pK_a = 8.40).\n- Phenol has no electron-withdrawing groups (pK_a = 10.0).\n\nStep 3: Order: 4-Nitrophenol > 2-Nitrophenol > 3-Nitrophenol > Phenol.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4105,
    data: {
      question: "When anisole (methoxybenzene, C₆H₅–O–CH₃) is heated with concentrated hydriodic acid (HI) at 373 K, what are the reaction products?",
      option_a: "Iodobenzene and methanol",
      option_b: "Benzene and methyl iodide",
      option_c: "Phenol and iodomethane (CH₃I)",
      option_d: "p-Iodoanisole and water",
      "correct_option": "C",
      explanation: "Step 1: Protonation of anisole:\nC₆H₅–O–CH₃ + H⁺ ⇌ C₆H₅–O⁺(H)–CH₃\n\nStep 2: Bond cleavage and nucleophilic attack:\n- The C(phenyl)–O bond possesses partial double-bond character due to resonance (+M effect of oxygen with the aromatic ring) and involves an sp² hybridized carbon. It is much stronger and shorter than the alkyl C(methyl)–O bond.\n- The C(methyl)–O bond is a single bond involving an sp³ carbon.\n\nStep 3: S_N2 attack by iodide:\nIodide ion (I⁻) selectively attacks the less hindered methyl carbon via an S_N2 mechanism, displacing phenol as the leaving group:\nI⁻ + CH₃–O⁺(H)–C₆H₅ → CH₃I + C₆H₅OH\n\nStep 4: Therefore, phenol and methyl iodide (CH₃I) are formed.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4106,
    data: {
      question: "In the industrial Dow's process for the manufacture of phenol, chlorobenzene is heated with aqueous sodium hydroxide under which set of severe conditions?",
      option_a: "373 K and 1 atm pressure",
      option_b: "450 K and 10 atm pressure",
      option_c: "623 K and 300 atm pressure",
      option_d: "Room temperature with UV light",
      "correct_option": "C",
      explanation: "Step 1: Inertness of chlorobenzene:\nDue to partial double-bond character of the C–Cl bond (resonance) and sp² hybridization of the carbon atom, chlorobenzene does not undergo nucleophilic substitution under ordinary laboratory conditions.\n\nStep 2: Dow's process conditions:\nIn Dow's process, chlorobenzene is converted to sodium phenoxide by heating with 6–8% aqueous sodium hydroxide at 623 K (350 °C) under 300 atm pressure in the presence of a copper catalyst:\nC₆H₅Cl + 2NaOH —(623 K, 300 atm)→ C₆H₅ONa + NaCl + H₂O\n\nStep 3: Acidification:\nC₆H₅ONa + HCl → C₆H₅OH + NaCl\n\nStep 4: Therefore, 623 K and 300 atm are the required conditions.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4107,
    data: {
      question: "When phenol is heated and distilled with zinc dust, which hydrocarbon is obtained as the reduction product?",
      option_a: "Toluene",
      option_b: "Cyclohexane",
      option_c: "Benzene",
      option_d: "Diphenyl",
      "correct_option": "C",
      explanation: "Step 1: Chemical equation:\nC₆H₅OH + Zn (dust) —(distillation, heat)→ C₆H₆ + ZnO\n\nStep 2: Nature of the reaction:\nZinc acts as a powerful reducing agent, removing the phenolic oxygen atom from the aromatic ring to form zinc oxide (ZnO) and regenerating the parent hydrocarbon, benzene (C₆H₆).\n\nStep 3: Therefore, benzene is obtained.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4108,
    data: {
      question: "Which of the following isomeric alkenes releases the GREATEST amount of heat per mole during catalytic hydrogenation over Nickel catalyst (highest exothermic heat of hydrogenation)?",
      option_a: "trans-But-2-ene",
      option_b: "cis-But-2-ene",
      option_c: "But-1-ene",
      option_d: "2,3-Dimethylbut-2-ene",
      "correct_option": "C",
      explanation: "Step 1: Heat of hydrogenation and alkene stability:\nCatalytic hydrogenation converts an alkene to an alkane. The heat of hydrogenation (ΔH_hydrog) is inversely proportional to the thermodynamic stability of the alkene:\nLess stable alkene → higher potential energy → releases more heat on hydrogenation.\n\nStep 2: Alkene stability order:\nStability increases with greater substitution (hyperconjugation) and less steric crowding:\nTetrasubstituted > Trisubstituted > trans-Disubstituted > cis-Disubstituted > Monosubstituted.\n- But-1-ene is a monosubstituted alkene (only 2 hyperconjugative α-hydrogens); it is the least stable.\n\nStep 3: Since but-1-ene is the least stable among the isomers, its hydrogenation is the most exothermic.\n\nStep 4: Therefore, but-1-ene has the highest heat of hydrogenation.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4109,
    data: {
      question: "Given below are two statements:\nAssertion (A): 2-Methylpropan-2-ol produces immediate white turbidity at room temperature when treated with Lucas reagent.\nReason (R): 2-Methylpropan-2-ol is a tertiary alcohol that reacts via an S_N1 mechanism, rapidly forming a highly stable tertiary carbocation intermediate.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Analyze Assertion (A):\n2-Methylpropan-2-ol ((CH₃)₃COH) is a tertiary (3°) alcohol. When mixed with Lucas reagent (conc. HCl + anhyd. ZnCl₂) at room temperature, it turns cloudy and turbid immediately due to the instant separation of insoluble 2-chloro-2-methylpropane. Assertion (A) is true.\n\nStep 2: Analyze Reason (R):\nThe reaction proceeds via an S_N1 pathway where protonation and loss of water generate the tert-butyl carbocation ((CH₃)₃C⁺). This 3° carbocation is stabilized by 9 hyperconjugative α-hydrogens, possessing a very low activation energy of formation. Reason (R) is true and correctly explains Assertion (A).\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4110,
    data: {
      question: "What is the correct decreasing order of the rate of reaction of the following alcohols with concentrated hydrobromic acid (HBr)?\n(1) 2-Methylpropan-2-ol (tert-butyl alcohol)\n(2) Propan-2-ol (isopropyl alcohol)\n(3) Propan-1-ol (n-propyl alcohol)",
      option_a: "(1) > (2) > (3)",
      option_b: "(3) > (2) > (1)",
      option_c: "(2) > (1) > (3)",
      option_d: "(1) > (3) > (2)",
      "correct_option": "A",
      explanation: "Step 1: Mechanism of reaction of alcohols with HBr:\nThe reaction of secondary and tertiary alcohols with HBr follows an S_N1 mechanism where the rate-determining step is the loss of a water molecule from the protonated alcohol (R–OH₂⁺) to form a carbocation intermediate (R⁺).\n\nStep 2: Carbocation stability order:\n- 2-Methylpropan-2-ol forms a tertiary carbocation ((CH₃)₃C⁺, 9 α-hydrogens) → fastest rate.\n- Propan-2-ol forms a secondary carbocation ((CH₃)₂CH⁺, 6 α-hydrogens) → intermediate rate.\n- Propan-1-ol forms an unstable primary carbocation, reacting slowly via S_N2 → slowest rate.\n\nStep 3: Order of reactivity: (1) > (2) > (3).\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 74 Part 2 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 74 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
