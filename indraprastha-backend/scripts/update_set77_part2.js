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
    id: 952,
    similar: {
      question: "When benzenediazonium chloride is treated with N,N-dimethylaniline in mildly acidic medium (pH 4-5), an azo coupling reaction occurs. The colored product formed is:",
      option_a: "(A) p-Aminoazobenzene",
      option_b: "(B) Azobenzene",
      option_c: "(C) 4-(N,N-Dimethylamino)azobenzene (Butter yellow)",
      option_d: "(D) o-(N,N-Dimethylamino)azobenzene",
      correct_option: "C",
      explanation: "Step 1: The diazonium cation (C₆H₅N₂⁺) is a weak electrophile that attacks strongly activated aromatic rings.\nStep 2: N,N-Dimethylaniline contains the strongly activating -N(CH₃)₂ group, which directs the incoming electrophile predominantly to the less sterically hindered para position.\nStep 3: Electrophilic attack at the para position gives 4-(N,N-dimethylamino)azobenzene (C₆H₅-N=N-C₆H₄-N(CH₃)₂), a bright yellow azo dye known as butter yellow.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 953,
    similar: {
      question: "Heating an aliphatic primary amine (R-NH₂) with trichloromethane (chloroform) and ethanolic potassium hydroxide yields which characteristic foul-smelling organic compound?",
      option_a: "(A) Alkyl cyanide (R-CN)",
      option_b: "(B) Alkanol (R-OH)",
      option_c: "(C) Primary amide (R-CONH₂)",
      option_d: "(D) Alkyl isocyanide or carbylamine (R-NC)",
      correct_option: "D",
      explanation: "Step 1: In the carbylamine reaction (isocyanide test), primary amines react with chloroform (CHCl₃) in the presence of alcoholic KOH.\nStep 2: Dichlorocarbene (:CCl₂) generated in situ acts as an electrophilic intermediate and attacks the amino group.\nStep 3: Elimination of three moles of HCl yields an alkyl isocyanide (carbylamine, R-NC):\nR-NH₂ + CHCl₃ + 3KOH(alc) --(Δ)--> R-NC + 3KCl + 3H₂O\nStep 4: The resulting isocyanides are characterized by an extremely offensive and pungent odor.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 954,
    similar: {
      question: "An alkyl halide 'A' (C₂H₅Cl) reacts with aqueous NaOH to give compound 'B'. In a separate reaction, 'A' reacts with alcoholic KCN to form compound 'D'. Compounds 'B' and 'D' are, respectively:",
      option_a: "(A) Ethane and Ethanamine",
      option_b: "(B) Ethanol and Propylamine",
      option_c: "(C) Ethanol (C₂H₅OH) and Propanenitrile (C₂H₅CN)",
      option_d: "(D) Ethene and Ethyl isocyanide",
      correct_option: "C",
      explanation: "Step 1: Reaction of chloroethane (C₂H₅Cl, 'A') with aqueous NaOH proceeds via nucleophilic substitution (S_N2) to yield ethanol:\nC₂H₅Cl + NaOH(aq) → C₂H₅OH [B] + NaCl.\nStep 2: Reaction of chloroethane ('A') with alcoholic KCN replaces chlorine with the cyano group (-CN) via nucleophilic attack of the carbon atom of CN⁻, yielding propanenitrile:\nC₂H₅Cl + KCN(alc) → C₂H₅CN [D] + KCl.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 955,
    similar: {
      question: "An organic compound of molecular mass 180 u reacts completely with acetyl chloride (CH₃COCl) to yield an acetylated derivative of molecular mass 390 u. The number of primary/secondary amino groups (-NH₂ or -NH-) present per molecule of the original compound is:",
      option_a: "(A) 2",
      option_b: "(B) 3",
      option_c: "(C) 5",
      option_d: "(D) 4",
      correct_option: "C",
      explanation: "Step 1: In an acetylation reaction, each amino group (-NH₂ or -NH-) replaces one active hydrogen atom (-H) with an acetyl group (-COCH₃).\nStep 2: Mass of -COCH₃ group = 12 + 3 + 12 + 16 = 43 u.\nStep 3: Mass of replaced -H atom = 1 u.\nStep 4: Net increase in molar mass per acetylated amino group = 43 u - 1 u = 42 u.\nStep 5: Total increase in molecular mass = 390 u - 180 u = 210 u.\nStep 6: Number of amino groups = (Total mass increase) / 42 = 210 / 42 = 5.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 958,
    similar: {
      question: "Which of the following reactive intermediates are sequentially formed during the Hofmann bromamide degradation of an amide (R-CONH₂) with Br₂ and aqueous KOH?",
      option_a: "(A) N-Bromoamide (RCONHBr) and Alkyl isocyanate (RNCO)",
      option_b: "(B) Carbocation and Carbene",
      option_c: "(C) Free radical and Nitrene",
      option_d: "(D) Acyl chloride and Alkyl bromide",
      correct_option: "A",
      explanation: "Step 1: In the first step, base abstracts a proton from the amide nitrogen, followed by bromination to form an N-bromoamide intermediate (R-CO-NHBr).\nStep 2: Base abstracts the second proton from nitrogen to form the conjugate base of N-bromoamide, which loses bromide ion (Br⁻) with concerted 1,2-migration of the alkyl group (R) from carbonyl carbon to nitrogen to form an alkyl isocyanate (R-N=C=O).\nStep 3: Hydrolysis of the alkyl isocyanate with aqueous KOH yields a primary amine (R-NH₂) and potassium carbonate (K₂CO₃).\nStep 4: Thus, RCONHBr and RNCO are key reaction intermediates.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 959,
    similar: {
      question: "Aniline is treated with excess bromine water to give a precipitate of compound (A). Compound (A) is then diazotized with NaNO₂ and dilute HCl at 273-278 K, followed by reduction with hypophosphorous acid (H₃PO₂). The final organic product obtained is:",
      option_a: "(A) 1,4-Dibromobenzene",
      option_b: "(B) Bromobenzene",
      option_c: "(C) 1,2,3-Tribromobenzene",
      option_d: "(D) 1,3,5-Tribromobenzene",
      correct_option: "D",
      explanation: "Step 1: Due to the powerful activating effect of the -NH₂ group, aniline reacts rapidly with excess bromine water to precipitate 2,4,6-tribromoaniline [A].\nStep 2: Diazotization of 2,4,6-tribromoaniline with NaNO₂/HCl at 0-5 °C converts the amino group into a diazonium group, forming 2,4,6-tribromobenzenediazonium chloride.\nStep 3: Reduction of this diazonium salt with H₃PO₂ replaces the diazonium group (-N₂⁺Cl⁻) with a hydrogen atom (-H).\nStep 4: Since bromine substituents are located at positions 2, 4, and 6 relative to the original -NH₂ (C-1), replacing C-1 with -H leaves bromines at positions 1, 3, and 5, yielding 1,3,5-tribromobenzene (symmetrical tribromobenzene).\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 960,
    similar: {
      question: "Which of the following reagents selectively converts an alkyl halide (R-X) into an alkyl isocyanide (R-NC) as the major product?",
      option_a: "(A) KCN in aqueous ethanol",
      option_b: "(B) NaCN in DMSO",
      option_c: "(C) AgCN (silver cyanide) in aqueous ethanol",
      option_d: "(D) HCN in liquid ammonia",
      correct_option: "C",
      explanation: "Step 1: Cyanide ion (CN⁻) is an ambident nucleophile with nucleophilic centers at both carbon and nitrogen.\nStep 2: KCN and NaCN are predominantly ionic. The negatively charged carbon atom attacks the alkyl halide because C-C bond energy is higher than C-N bond energy, yielding alkyl cyanides (R-CN) as major product.\nStep 3: Silver cyanide (AgCN) is predominantly covalent. The silver atom is bonded covalently to carbon (Ag-C≡N:), leaving the lone pair of electrons on nitrogen freely available for nucleophilic attack.\nStep 4: Consequently, attack through nitrogen forms an alkyl isocyanide (R-NC) as the major product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 961,
    similar: {
      question: "In the Hofmann bromamide degradation reaction of one mole of ethanamide (CH₃CONH₂), what is the stoichiometric consumption of NaOH and Br₂?",
      option_a: "(A) 2 moles of NaOH and 1 mole of Br₂",
      option_b: "(B) 4 moles of NaOH and 2 moles of Br₂",
      option_c: "(C) 4 moles of NaOH and 1 mole of Br₂",
      option_d: "(D) 1 mole of NaOH and 1 mole of Br₂",
      correct_option: "C",
      explanation: "Step 1: The balanced chemical equation for the Hofmann bromamide degradation reaction is:\nR-CONH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O\nStep 2: Inspection of the stoichiometric coefficients reveals:\n- 1 mole of primary amide reacts with:\n- 1 mole of bromine (Br₂), and\n- 4 moles of sodium hydroxide (NaOH).\nStep 3: Therefore, four moles of NaOH and one mole of Br₂ are required per mole of amide.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 962,
    similar: {
      question: "What is the major product obtained when acetamide (CH₃CONH₂) is treated with phosphorus pentoxide (P₂O₅) and heated?",
      option_a: "(A) Methylamine (CH₃NH₂)",
      option_b: "(B) Acetonitrile (Ethanenitrile, CH₃CN)",
      option_c: "(C) Ethanoic acid (CH₃COOH)",
      option_d: "(D) Ethylamine (CH₃CH₂NH₂)",
      correct_option: "B",
      explanation: "Step 1: Phosphorus pentoxide (P₂O₅ or P₄O₁₀) is an exceptionally strong chemical dehydrating agent.\nStep 2: When heated with primary amides, it abstracts the elements of water (H₂O) from the -CONH₂ group:\nCH₃-CONH₂ --(P₂O₅, Δ, -H₂O)--> CH₃-C≡N (acetonitrile / ethanenitrile)\nStep 3: This reaction provides a direct, high-yield synthetic route from primary amides to alkyl nitriles.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 963,
    similar: {
      question: "Identify the final product 'Z' in the following reaction sequence:\nCH₃COOH --(NH₃, Δ)--> [X] --(Br₂ + KOH)--> [Y] --(CHCl₃ + alc. KOH, Δ)--> [Z]",
      option_a: "(A) Methylamine",
      option_b: "(B) Methyl isocyanide (CH₃NC)",
      option_c: "(C) Acetonitrile (CH₃CN)",
      option_d: "(D) Ethanamide",
      correct_option: "B",
      explanation: "Step 1: Acetic acid heated with ammonia undergoes dehydration to form acetamide: CH₃COOH + NH₃ --(Δ)--> CH₃CONH₂ [X].\nStep 2: Acetamide treated with Br₂ and KOH undergoes the Hofmann bromamide degradation to form methanamine: CH₃CONH₂ + Br₂ + 4KOH → CH₃NH₂ [Y] + K₂CO₃ + 2KBr + 2H₂O.\nStep 3: Methanamine (a primary amine) heated with chloroform and alcoholic KOH undergoes the carbylamine reaction to yield methyl isocyanide: CH₃NH₂ + CHCl₃ + 3KOH --(Δ)--> CH₃NC [Z] + 3KCl + 3H₂O.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 964,
    similar: {
      question: "Which of the following statements correctly distinguishes primary, secondary, and tertiary amines in the Hinsberg test?",
      option_a: "(A) Tertiary amines react with benzenesulphonyl chloride to form clear solutions in water.",
      option_b: "(B) Secondary amines do not react with benzenesulphonyl chloride.",
      option_c: "(C) Primary amines form sulphonamides with an acidic N-H that dissolve in aqueous NaOH, while secondary amines form insoluble sulphonamides that do not dissolve in NaOH.",
      option_d: "(D) All three classes of amines form alkali-soluble precipitates.",
      correct_option: "C",
      explanation: "Step 1: In the Hinsberg test, benzenesulphonyl chloride (C₆H₅SO₂Cl) reacts with primary amines to form N-alkylbenzenesulphonamides. The presence of a strongly electron-withdrawing -SO₂- group makes the remaining hydrogen on nitrogen acidic, so it dissolves in aqueous NaOH.\nStep 2: Secondary amines react to form N,N-dialkylbenzenesulphonamides, which lack any hydrogen atom on nitrogen and therefore remain completely insoluble in aqueous alkali.\nStep 3: Tertiary amines have no replaceable hydrogen on nitrogen and do not react with benzenesulphonyl chloride under these conditions.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 965,
    similar: {
      question: "Which of the following carboxylic acid derivatives undergoes nucleophilic acyl substitution (hydrolysis) with the SLOWEST rate among all acid derivatives?",
      option_a: "(A) Acyl chloride (R-COCl)",
      option_b: "(B) Acid anhydride ((RCO)₂O)",
      option_c: "(C) Ester (R-COOR')",
      option_d: "(D) Primary amide (R-CONH₂)",
      correct_option: "D",
      explanation: "Step 1: The rate of nucleophilic acyl substitution depends on: (i) the leaving group ability of the departing anion, and (ii) the extent of resonance stabilization of the carbonyl group.\nStep 2: In amides (R-CONH₂), the lone pair on nitrogen is strongly delocalized into the carbonyl pi system: R-C(=O)-NH₂ ↔ R-C(O⁻)=N⁺H₂. This substantially reduces the electrophilicity of the carbonyl carbon.\nStep 3: Furthermore, the amide ion (:NH₂⁻) is an extremely poor leaving group (very strong conjugate base of NH₃).\nStep 4: Consequently, amides are the least reactive among all carboxylic acid derivatives (reactivity order: acyl chloride > anhydride > ester > amide).\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 966,
    similar: {
      question: "Replacement of the diazonium group (-N₂⁺Cl⁻) of benzenediazonium chloride by chlorine or bromine using copper powder in the presence of corresponding halogen acid (HCl or HBr) is known as:",
      option_a: "(A) Sandmeyer reaction",
      option_b: "(B) Gattermann reaction",
      option_c: "(C) Wurtz-Fittig reaction",
      option_d: "(D) Balz-Schiemann reaction",
      correct_option: "B",
      explanation: "Step 1: When benzenediazonium chloride is treated with cuprous halides (Cu₂Cl₂/HCl or Cu₂Br₂/HBr), the reaction is termed the Sandmeyer reaction.\nStep 2: However, when copper powder (finely divided metallic Cu) in the presence of halogen acid (HCl or HBr) is employed instead of cuprous salt, the reaction is specifically known as the Gattermann reaction:\nC₆H₅N₂⁺Cl⁻ + HCl --(Cu powder)--> C₆H₅Cl + N₂ ↑ + CuCl\nStep 3: The Sandmeyer reaction generally gives a better yield than the Gattermann reaction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 967,
    similar: {
      question: "Which of the following organic transformations proceeds with retention of the original carbon skeleton length (same number of carbon atoms)?",
      option_a: "(A) Hofmann bromamide degradation of propanamide",
      option_b: "(B) Decarboxylation of sodium propanoate with soda-lime",
      option_c: "(C) Reduction of propanenitrile (CH₃CH₂CN) with LiAlH₄",
      option_d: "(D) Haloform reaction of acetone",
      correct_option: "C",
      explanation: "Step 1: Hofmann bromamide degradation removes the carbonyl carbon as carbonate, giving an amine with one less carbon (step-down reaction).\nStep 2: Decarboxylation with soda-lime eliminates CO₂ to form an alkane with one less carbon (step-down reaction).\nStep 3: Haloform reaction cleaves a methyl group to form CHI₃ and a carboxylate with one less carbon.\nStep 4: Reduction of a nitrile (R-CN) with LiAlH₄ or H₂/Ni preserves every carbon atom, converting the nitrile into a primary amine with the exact same number of carbon atoms (R-CH₂NH₂).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 968,
    similar: {
      question: "How many mononitro constitutional isomers are obtained upon electrophilic nitration of 1,3-dimethylbenzene (m-xylene) with a mixture of concentrated HNO₃ and H₂SO₄?",
      option_a: "(A) 2",
      option_b: "(B) 3",
      option_c: "(C) 4",
      option_d: "(D) 5",
      correct_option: "B",
      explanation: "Step 1: In m-xylene, methyl groups occupy positions 1 and 3 of the benzene ring.\nStep 2: Both -CH₃ groups are ortho/para-directing.\nStep 3: Positions available for electrophilic attack are:\n- Position 2: Ortho to both methyl groups (highly sterically hindered, but forms 2-nitro-1,3-dimethylbenzene).\n- Position 4 (equivalent to 6): Ortho to one methyl and para to the other methyl (forms 4-nitro-1,3-dimethylbenzene, major product).\n- Position 5: Meta to both methyl groups (forms 5-nitro-1,3-dimethylbenzene in very minor amounts).\nStep 4: Hence, exactly 3 distinct constitutional mononitro isomers are possible.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 969,
    similar: {
      question: "Which of the following primary amines CANNOT be prepared by the Gabriel phthalimide synthesis?",
      option_a: "(A) Methylamine",
      option_b: "(B) Ethylamine",
      option_c: "(C) Benzylamine",
      option_d: "(D) Aniline",
      correct_option: "D",
      explanation: "Step 1: Gabriel phthalimide synthesis involves an S_N2 nucleophilic substitution in which the potassium phthalimide anion attacks an organic halide: Phthalimide⁻ + R-X → N-alkylphthalimide + X⁻.\nStep 2: Methyl, ethyl, and benzyl halides are aliphatic/benzylic halides that undergo facile S_N2 displacement by the phthalimide nucleophile.\nStep 3: In aryl halides (e.g., chlorobenzene or bromobenzene required to make aniline), the C-X bond has partial double bond character due to resonance with the benzene ring, and the ring's pi-cloud repels nucleophiles. Thus, aryl halides do not undergo S_N2 substitution.\nStep 4: Therefore, aromatic primary amines like aniline cannot be prepared by Gabriel synthesis.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 970,
    similar: {
      question: "An unknown amine with molecular formula C₂H₇N reacts with benzenesulphonyl chloride to produce a precipitate that is completely insoluble in 10% aqueous NaOH. The unknown amine is:",
      option_a: "(A) Ethanamine (CH₃CH₂NH₂)",
      option_b: "(B) Dimethylamine ((CH₃)₂NH)",
      option_c: "(C) Trimethylamine ((CH₃)₃N)",
      option_d: "(D) Methanamine (CH₃NH₂)",
      correct_option: "B",
      explanation: "Step 1: Primary amines react with benzenesulphonyl chloride to form sulfonamides having an acidic N-H proton, which dissolve completely in aqueous NaOH.\nStep 2: Secondary amines react with benzenesulphonyl chloride to form N,N-dialkylbenzenesulphonamides. Since there is no hydrogen atom attached to nitrogen in this sulfonamide product, it has no acidic properties and remains completely insoluble in aqueous NaOH.\nStep 3: With molecular formula C₂H₇N, the only secondary amine isomer is dimethylamine ((CH₃)₂NH).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 971,
    similar: {
      question: "Which of the following reactions does NOT yield a primary amine as the major organic product?",
      option_a: "(A) Reduction of ethanamide (CH₃CONH₂) with LiAlH₄",
      option_b: "(B) Reaction of bromoethane with excess alcoholic ammonia",
      option_c: "(C) Reduction of methyl isocyanide (CH₃NC) with LiAlH₄",
      option_d: "(D) Reduction of nitroethane (CH₃CH₂NO₂) with Sn and HCl",
      correct_option: "C",
      explanation: "Step 1: Reduction of amides (CH₃CONH₂) with LiAlH₄ yields primary amines (CH₃CH₂NH₂).\nStep 2: Reaction of alkyl halides with large excess ammonia suppresses polyalkylation and gives primary amine as the major product.\nStep 3: Reduction of nitroalkanes (CH₃CH₂NO₂) with metal/acid yields primary amines (CH₃CH₂NH₂).\nStep 4: Reduction of alkyl isocyanides (R-NC) with LiAlH₄ or Na/alcohol specifically yields secondary amines (R-NH-CH₃), not primary amines.\nStep 5: Thus, reduction of methyl isocyanide yields dimethylamine ((CH₃)₂NH, a secondary amine).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 972,
    similar: {
      question: "Reduction of aromatic nitro compounds to primary aromatic amines is preferred industrially using iron scrap and hydrochloric acid (Fe + HCl) because:",
      option_a: "(A) It does not require any solvent.",
      option_b: "(B) Iron is completely insoluble in acids.",
      option_c: "(C) FeCl₂ formed during the reaction is hydrolyzed by water to regenerate HCl, so only a small catalytic amount of HCl is required.",
      option_d: "(D) It exclusively gives meta-substituted products.",
      correct_option: "C",
      explanation: "Step 1: In the commercial production of aniline from nitrobenzene, scrap iron (Fe) and dilute hydrochloric acid (HCl) are used.\nStep 2: The chemical reaction initially consumes HCl to generate nascent hydrogen and FeCl₂:\nC₆H₅NO₂ + 2Fe + 6HCl → C₆H₅NH₂ + 2FeCl₂ + 2H₂O\nStep 3: Crucially, the formed FeCl₂ undergoes aqueous hydrolysis under the reaction conditions to regenerate hydrochloric acid:\nFeCl₂ + 2H₂O → Fe(OH)₂ + 2HCl\nStep 4: This regeneration of HCl means only an initial catalytic quantity of acid is required, making the process highly economical and environmentally benign.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 973,
    similar: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A): Aromatic primary amines such as aniline cannot be synthesized by the Gabriel phthalimide method.\nReason (R): Aryl halides do not undergo nucleophilic substitution (S_N2) with the potassium phthalimide anion under normal conditions.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both A and R are true, and R is the correct explanation of A.",
      option_b: "(B) Both A and R are true, but R is NOT the correct explanation of A.",
      option_c: "(C) A is true, but R is false.",
      option_d: "(D) A is false, but R is true.",
      correct_option: "A",
      explanation: "Step 1: Evaluating Assertion (A): The Gabriel phthalimide synthesis is limited strictly to aliphatic primary amines; aniline cannot be prepared by this method. Thus, Assertion (A) is true.\nStep 2: Evaluating Reason (R): The key step in Gabriel synthesis is the nucleophilic attack of the phthalimide anion on an organic halide via an S_N2 mechanism. Aryl halides fail to undergo S_N2 displacement because the C-halogen bond has partial double bond character due to resonance, sp² hybridized aromatic carbon holds electrons strongly, and the approaching nucleophile faces electronic repulsion from the ring pi-electron cloud. Thus, Reason (R) is true.\nStep 3: Reason (R) correctly explains Assertion (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 974,
    similar: {
      question: "Match List I with List II:\nList I (Reaction):\nA. Ammonolysis of alkyl halides\nB. Gabriel phthalimide synthesis\nC. Hofmann bromamide degradation\nD. Carbylamine test\nList II (Characteristic / Outcome):\nI. Amine product has one carbon atom less than the substrate\nII. Specific diagnostic test for 1° amines producing foul smell\nIII. Involves reaction of phthalimide with alc. KOH followed by R-X and hydrolysis\nIV. Reaction of alkyl halides with alcoholic NH₃\nChoose the correct answer from the options given below:",
      option_a: "(A) A-IV, B-III, C-I, D-II",
      option_b: "(B) A-I, B-III, C-IV, D-II",
      option_c: "(C) A-IV, B-I, C-III, D-II",
      option_d: "(D) A-II, B-IV, C-I, D-III",
      correct_option: "A",
      explanation: "Step 1: Ammonolysis involves the nucleophilic attack of alcoholic ammonia on alkyl halides (A matches IV).\nStep 2: Gabriel phthalimide synthesis involves reacting phthalimide with ethanolic KOH to form a salt, followed by alkylation with R-X and alkaline hydrolysis (B matches III).\nStep 3: Hofmann bromamide degradation degrades amides into primary amines containing one less carbon atom (C matches I).\nStep 4: Carbylamine test specifically identifies primary amines through the formation of foul-smelling isocyanides (D matches II).\nStep 5: Thus, the correct matching is A-IV, B-III, C-I, D-II.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 975,
    similar: {
      question: "Which of the following synthetic routes results in an amine containing FEWER carbon atoms than the starting organic reactant?",
      option_a: "(A) Reduction of an alkane nitrile with LiAlH₄",
      option_b: "(B) Reduction of an amide with LiAlH₄",
      option_c: "(C) Alkylation of potassium phthalimide followed by alkaline hydrolysis",
      option_d: "(D) Treatment of an amide with Br₂ and aqueous KOH",
      correct_option: "D",
      explanation: "Step 1: In the reduction of nitriles (R-CN) with LiAlH₄, the product is R-CH₂NH₂, which retains all carbons.\nStep 2: In the reduction of amides (R-CONH₂) with LiAlH₄, the product is R-CH₂NH₂, retaining all carbons.\nStep 3: In the Gabriel synthesis, potassium phthalimide + R-X gives R-NH₂, retaining all carbons of the alkyl group.\nStep 4: In the Hofmann bromamide degradation, an amide (R-CONH₂) loses its carbonyl carbon as carbonate (CO₃²⁻), yielding a primary amine (R-NH₂) containing exactly one carbon less than the parent amide.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 976,
    similar: {
      question: "Which of the following statements regarding the molecular geometry and hybridization of the nitrogen atom in aliphatic amines is CORRECT?\n(i) The nitrogen atom is sp³ hybridized.\n(ii) The geometry around nitrogen is pyramidal due to the presence of one unshared lone pair.\n(iii) The C-N-C or C-N-H bond angles are slightly smaller than the tetrahedral angle of 109.5° due to lone pair-bond pair repulsion.",
      option_a: "(A) Only (i) and (ii)",
      option_b: "(B) (i), (ii), and (iii)",
      option_c: "(C) Only (i) and (iii)",
      option_d: "(D) Only (ii) and (iii)",
      correct_option: "B",
      explanation: "Step 1: In amines, the valence shell of nitrogen contains three bonding electron pairs and one unshared non-bonding lone pair, corresponding to sp³ hybridization. Thus, statement (i) is correct.\nStep 2: According to VSEPR theory, four electron domains with one lone pair result in a trigonal pyramidal molecular geometry. Thus, statement (ii) is correct.\nStep 3: Because lone pair-bond pair repulsion is stronger than bond pair-bond pair repulsion, the bond angles (C-N-C or C-N-H) are compressed from the ideal tetrahedral angle of 109.5° to approximately 107°-108° (e.g., 108° in trimethylamine). Thus, statement (iii) is correct.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 977,
    similar: {
      question: "Which of the following statements regarding the solubility of amines is/are CORRECT?\n(i) Lower aliphatic amines are readily soluble in water because they form intermolecular hydrogen bonds with water molecules.\n(ii) Solubility in water decreases progressively with increase in the molar mass of the amine.\n(iii) The decrease in solubility with increasing molar mass is due to the increasing size of the hydrophobic alkyl part.\n(iv) Amines are soluble in organic solvents like ethanol, ether, and benzene.",
      option_a: "(A) (i) and (ii) only",
      option_b: "(B) (i), (ii), (iii), and (iv)",
      option_c: "(C) (i), (iii), and (iv) only",
      option_d: "(D) (ii) and (iv) only",
      correct_option: "B",
      explanation: "Step 1: Lower aliphatic amines (like methylamine, ethylamine) form strong intermolecular hydrogen bonds with polar water molecules, making them readily soluble in water. (Statement i is correct)\nStep 2: As the carbon chain lengthens, the non-polar, hydrophobic hydrocarbon part grows larger and resists interaction with water molecules, causing a marked decrease in aqueous solubility. (Statements ii and iii are correct)\nStep 3: Higher amines and aromatic amines are virtually insoluble in water, but dissolve readily in nonpolar and organic solvents such as alcohols, ether, and benzene. (Statement iv is correct)\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 978,
    similar: {
      question: "Which of the following statements correctly explains why primary amines have higher boiling points than isomeric tertiary amines of identical molecular mass?",
      option_a: "(A) Primary amines have stronger London dispersion forces.",
      option_b: "(B) Primary amines possess two hydrogen atoms bonded to nitrogen and engage in extensive intermolecular hydrogen bonding, whereas tertiary amines lack N-H bonds and cannot form intermolecular hydrogen bonds among themselves.",
      option_c: "(C) Tertiary amines are more basic and therefore more volatile.",
      option_d: "(D) Primary amines have smaller molecular surface area.",
      correct_option: "B",
      explanation: "Step 1: Primary amines (R-NH₂) have two polar N-H bonds, allowing each molecule to participate in multiple intermolecular hydrogen bonds with neighboring amine molecules.\nStep 2: Secondary amines (R₂NH) have one N-H bond and form fewer hydrogen bonds.\nStep 3: Tertiary amines (R₃N) have no hydrogen atom bonded to the electronegative nitrogen atom (no N-H bond); therefore, they cannot form intermolecular hydrogen bonds among their own molecules.\nStep 4: As a result, the boiling point order among isomeric amines is strictly: Primary > Secondary > Tertiary (1° > 2° > 3°).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 979,
    similar: {
      question: "In the alkylation of benzylamine: C₆H₅CH₂NH₂ + R-X → C₆H₅CH₂NHR + HX, which of the following alkyl halides reacts MOST rapidly via an S_N1 mechanism?",
      option_a: "(A) Methyl bromide (CH₃Br)",
      option_b: "(B) Ethyl bromide (C₂H₅Br)",
      option_c: "(C) Benzyl bromide (C₆H₅CH₂Br)",
      option_d: "(D) Bromobenzene (C₆H₅Br)",
      correct_option: "C",
      explanation: "Step 1: The rate of an S_N1 reaction is governed strictly by the stability of the intermediate carbocation formed in the rate-determining ionization step.\nStep 2: Ionization of benzyl bromide (C₆H₅CH₂Br) generates the benzylic carbocation (C₆H₅CH₂⁺), which is exceptionally stable due to extensive resonance delocalization of positive charge into the aromatic benzene ring.\nStep 3: Methyl and ethyl bromides form very unstable carbocations and do not react via S_N1.\nStep 4: Bromobenzene does not ionize to the unstable phenyl cation.\nStep 5: Therefore, benzyl bromide is by far the most reactive via an S_N1 mechanism.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 77 Part 2 questions (26 questions)...');
    
    for (const item of part2Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Set 77 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error in Set 77 Part 2 update:', err);
  }
}

run();
