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

const part1Updates = [
  {
    id: 926,
    similar: {
      question: "On acidic hydrolysis of an organic compound (X), two compounds (A) and (B) are obtained. Compound (A) on reaction with NaNO₂ and dilute HCl produces a primary alcohol that gives a negative iodoform test. Compound (B) reduces both Tollen's reagent and Fehling's solution. Compound (X) is:",
      option_a: "(A) Propyl isocyanide (CH₃CH₂CH₂NC)",
      option_b: "(B) Butanamide (CH₃CH₂CH₂CONH₂)",
      option_c: "(C) Butanenitrile (CH₃CH₂CH₂CN)",
      option_d: "(D) N,N-Dimethylpropanamide",
      correct_option: "A",
      explanation: "Step 1: Alkyl isocyanides (carbylamines, R-NC) undergo acidic hydrolysis to yield a primary amine (R-NH₂) and methanoic acid (formic acid, HCOOH):\nR-NC + 2H₂O + H⁺ → R-NH₃⁺ + HCOOH\nStep 2: For propyl isocyanide (CH₃CH₂CH₂NC), the products are propan-1-amine (CH₃CH₂CH₂NH₂) and formic acid (HCOOH).\nStep 3: Propan-1-amine reacts with nitrous acid (NaNO₂/HCl) to give propan-1-ol, which lacks the CH₃CH(OH)- group and does not give the iodoform test.\nStep 4: Formic acid (HCOOH) retains a formyl hydrogen and strongly reduces both Tollen's reagent and Fehling's solution.\nStep 5: Therefore, compound (X) is propyl isocyanide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 927,
    similar: {
      question: "Aniline undergoes the following sequence of reactions:\nAniline --(NaNO₂ + HCl, 273-278 K)--> [A] --(CuCN)--> [B] --(H₂ / Ni)--> [C] --(HNO₂, 273 K)--> [D]\nThe final product [D] is:",
      option_a: "(A) Benzoic acid",
      option_b: "(B) Benzaldehyde",
      option_c: "(C) Benzylamine",
      option_d: "(D) Benzyl alcohol",
      correct_option: "D",
      explanation: "Step 1: Diazotization of aniline with NaNO₂/HCl at 0-5 °C gives benzenediazonium chloride: C₆H₅NH₂ → C₆H₅N₂⁺Cl⁻ [A].\nStep 2: Sandmeyer reaction with CuCN converts the diazonium salt into benzonitrile: C₆H₅N₂⁺Cl⁻ → C₆H₅CN [B].\nStep 3: Catalytic hydrogenation of benzonitrile reduces the nitrile group to a primary amine, forming benzylamine: C₆H₅CN + 2H₂ --(Ni)--> C₆H₅CH₂NH₂ [C].\nStep 4: Benzylamine is an aliphatic primary amine. Treatment with nitrous acid (HNO₂) forms an unstable aliphatic diazonium intermediate which hydrolyzes rapidly with loss of N₂ to form benzyl alcohol: C₆H₅CH₂NH₂ --(HNO₂)--> C₆H₅CH₂OH [D] + N₂ + H₂O.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 928,
    similar: {
      question: "Consider the following sequence of reactions:\nNitrobenzene --(Fe / HCl)--> [A] --(NaNO₂ + HCl, 0-5 °C)--> [B] --(HBF₄, Δ)--> [C]\nThe final organic product [C] is:",
      option_a: "(A) Chlorobenzene",
      option_b: "(B) Phenol",
      option_c: "(C) Fluorobenzene",
      option_d: "(D) Iodobenzene",
      correct_option: "C",
      explanation: "Step 1: Reduction of nitrobenzene with Fe/HCl gives aniline: C₆H₅NO₂ → C₆H₅NH₂ [A].\nStep 2: Diazotization of aniline with NaNO₂ and HCl at 0-5 °C yields benzenediazonium chloride: C₆H₅NH₂ → C₆H₅N₂⁺Cl⁻ [B].\nStep 3: Treatment of benzenediazonium chloride with fluoroboric acid (HBF₄) precipitates benzenediazonium fluoroborate (C₆H₅N₂⁺BF₄⁻).\nStep 4: Gentle dry heating of this diazonium fluoroborate decomposes it smoothly via the Balz-Schiemann reaction to yield fluorobenzene (C₆H₅F), BF₃, and N₂.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 929,
    similar: {
      question: "Which of the following represents the correct decreasing order of basic strength of methylamines in aqueous solution?",
      option_a: "(A) (CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃",
      option_b: "(B) CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N > NH₃",
      option_c: "(C) (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃",
      option_d: "(D) NH₃ > CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N",
      correct_option: "C",
      explanation: "Step 1: In aqueous solution, the basic strength of aliphatic amines is governed by the combined interplay of three distinct factors: inductive effect (+I), extent of hydration (solvation of conjugate ammonium cation via H-bonding), and steric hindrance of alkyl groups.\nStep 2: For methyl-substituted amines, the small size of the methyl group results in secondary amine having the optimal balance of inductive donation and cation solvation stability.\nStep 3: The observed experimental order in water is:\n(CH₃)₂NH (2°) > CH₃NH₂ (1°) > (CH₃)₃N (3°) > NH₃.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 930,
    similar: {
      question: "Which of the following compounds gives a positive carbylamine test (forms an extremely foul-smelling isocyanide on heating with chloroform and alcoholic KOH)?",
      option_a: "(A) Dimethylamine ((CH₃)₂NH)",
      option_b: "(B) Aniline (C₆H₅NH₂)",
      option_c: "(C) Trimethylamine ((CH₃)₃N)",
      option_d: "(D) N-Methylaniline (C₆H₅NHCH₃)",
      correct_option: "B",
      explanation: "Step 1: The carbylamine test (isocyanide test) is a specific diagnostic test given exclusively by primary amines (both aliphatic and aromatic primary amines).\nStep 2: Reaction: R-NH₂ + CHCl₃ + 3KOH(alc) --(Δ)--> R-NC (carbylamine) + 3KCl + 3H₂O.\nStep 3: Aniline (C₆H₅NH₂) is an aromatic primary amine and reacts to produce phenyl isocyanide (C₆H₅NC), which has an offensive, foul odor.\nStep 4: Secondary amines (dimethylamine, N-methylaniline) and tertiary amines (trimethylamine) do not give this test.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 931,
    similar: {
      question: "The azo coupling reaction of benzenediazonium chloride with phenol is carried out in which pH range?",
      option_a: "(A) Highly acidic medium (pH 1-2)",
      option_b: "(B) Mildly alkaline medium (pH 9-10)",
      option_c: "(C) Highly basic medium (pH 13-14)",
      option_d: "(D) Completely anhydrous nonpolar medium",
      correct_option: "B",
      explanation: "Step 1: Azo coupling is an electrophilic aromatic substitution where the diazonium cation (ArN₂⁺) acts as a relatively weak electrophile.\nStep 2: To make phenol sufficiently nucleophilic, it must be converted into the strongly activated phenoxide ion (C₆H₅O⁻), which requires a mildly alkaline medium (pH 9-10).\nStep 3: If the pH is too high (>12), the diazonium cation is converted into the non-electrophilic diazotate ion (Ar-N=N-O⁻). If the medium is acidic, phenol remains un-ionized and is not sufficiently nucleophilic.\nStep 4: Thus, the optimum condition is mildly basic (pH 9-10).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 932,
    similar: {
      question: "How many monochloro derivatives (isomers including position isomers on the ring and side-chain) are formed when toluene undergoes chlorination in the presence of (i) FeCl₃ / dark, and (ii) UV light / heat, respectively?",
      option_a: "(A) (i) 2, (ii) 1",
      option_b: "(B) (i) 3, (ii) 2",
      option_c: "(C) (i) 1, (ii) 2",
      option_d: "(D) (i) 2, (ii) 2",
      correct_option: "A",
      explanation: "Step 1: In the presence of Lewis acid (FeCl₃) in the dark, electrophilic aromatic substitution occurs on the ring. Since -CH₃ is ortho/para-directing, chlorination yields two positional isomers: o-chlorotoluene and p-chlorotoluene (2 products).\nStep 2: In the presence of UV light and heat, free radical halogenation occurs exclusively at the benzylic side-chain carbon to give benzyl chloride (C₆H₅CH₂Cl) (1 product).\nStep 3: Hence, the numbers of monochloro products are 2 and 1, respectively.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 933,
    similar: {
      question: "Gabriel phthalimide synthesis is exclusively used for the preparation of which class of organic amines?",
      option_a: "(A) Aromatic primary amines (e.g., Aniline)",
      option_b: "(B) Secondary aliphatic amines",
      option_c: "(C) Aliphatic primary amines",
      option_d: "(D) Tertiary aliphatic amines",
      correct_option: "C",
      explanation: "Step 1: Phthalimide reacts with ethanolic KOH to form potassium phthalimide.\nStep 2: The phthalimide anion acts as a nucleophile and attacks an alkyl halide via an S_N2 mechanism to form N-alkylphthalimide.\nStep 3: Subsequent alkaline hydrolysis or hydrazinolysis yields an aliphatic primary amine (R-NH₂) and phthalate ion.\nStep 4: Aromatic primary amines cannot be prepared because aryl halides do not undergo nucleophilic substitution (S_N2) with the potassium phthalimide anion due to partial double bond character of the C-X bond and electronic repulsion.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 934,
    similar: {
      question: "When o-chlorotoluene is treated with potassium amide (KNH₂) in liquid ammonia, elimination-addition occurs via benzyne intermediates. Which isomeric toluidines are formed as products?",
      option_a: "(A) Only o-toluidine",
      option_b: "(B) A mixture of o-toluidine and m-toluidine",
      option_c: "(C) A mixture of m-toluidine and p-toluidine",
      option_d: "(D) Only p-toluidine",
      correct_option: "B",
      explanation: "Step 1: The strong base NH₂⁻ abstracts a proton adjacent to the chlorine atom from o-chlorotoluene.\nStep 2: Since the ortho position on one side is occupied by the -CH₃ group and the other ortho position has a hydrogen, elimination of HCl generates a single benzyne intermediate: 2,3-dehydrotoluene (methylbenzyne across C-1 and C-2).\nStep 3: Subsequent nucleophilic attack of NH₂⁻ can occur at either carbon of the triple bond:\n- Attack at C-2 gives o-toluidine.\n- Attack at C-3 gives m-toluidine.\nStep 4: Hence, a mixture of ortho- and meta-toluidine is obtained.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 935,
    similar: {
      question: "An aromatic compound (A) with molecular formula C₆H₇N on treatment with NaNO₂/HCl at 0-5 °C followed by alkaline β-naphthol gives an intense scarlet red azo dye. Which of the following tests will compound (A) NOT give?",
      option_a: "(A) Carbylamine test with CHCl₃ and alc. KOH",
      option_b: "(B) Reaction with benzenesulphonyl chloride (Hinsberg test) forming a product soluble in alkali",
      option_c: "(C) Formation of 2,4,6-tribromo derivative with bromine water",
      option_d: "(D) Neutral FeCl₃ test giving a violet coloration",
      correct_option: "D",
      explanation: "Step 1: Molecular formula C₆H₇N and positive azo dye test (diazo coupling with β-naphthol to give scarlet dye) uniquely confirms that compound (A) is aniline (C₆H₅NH₂).\nStep 2: As a primary amine, aniline gives a positive carbylamine test (Option A).\nStep 3: With Hinsberg's reagent (C₆H₅SO₂Cl), it forms N-phenylbenzenesulphonamide, which has an acidic N-H and dissolves in aqueous NaOH (Option B).\nStep 4: Aniline reacts instantly with bromine water to give a white precipitate of 2,4,6-tribromoaniline (Option C).\nStep 5: Neutral FeCl₃ test is specific for phenols (giving violet/blue coloration); aniline does not give a violet coloration with neutral FeCl₃.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 936,
    similar: {
      question: "Arrange the following substituted anilines in decreasing order of basic strength:\nI. 4-Methoxyaniline (p-anisidine)\nII. Aniline\nIII. 4-Nitroaniline (p-nitroaniline)",
      option_a: "(A) I > II > III",
      option_b: "(B) III > II > I",
      option_c: "(C) II > I > III",
      option_d: "(D) I > III > II",
      correct_option: "A",
      explanation: "Step 1: Basic strength of aromatic amines depends on the electron density on the nitrogen atom and the stability of the conjugate anilinium ion.\nStep 2: In 4-methoxyaniline (I), the -OCH₃ group has a strong electron-donating resonance (+M) effect, which increases electron density on the -NH₂ group, making it the most basic.\nStep 3: In aniline (II), the lone pair is delocalized into the unsubstituted benzene ring.\nStep 4: In 4-nitroaniline (III), the strongly electron-withdrawing nitro group (-M and -I) withdraws electron density heavily from the -NH₂ group, rendering it the weakest base.\nStep 5: Thus, the decreasing order of basic strength is: I > II > III.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 937,
    similar: {
      question: "Which of the following primary amines CANNOT be prepared by the Hoffmann bromamide degradation reaction?",
      option_a: "(A) Methanamine (CH₃NH₂)",
      option_b: "(B) Aniline (C₆H₅NH₂)",
      option_c: "(C) Propan-1-amine (CH₃CH₂CH₂NH₂)",
      option_d: "(D) Diethylamine ((C₂H₅)₂NH)",
      correct_option: "D",
      explanation: "Step 1: The Hoffmann bromamide degradation reaction converts an amide (R-CONH₂) into a primary amine (R-NH₂) containing one carbon atom less by treatment with Br₂ and aqueous/ethanolic KOH:\nR-CONH₂ + Br₂ + 4KOH → R-NH₂ + K₂CO₃ + 2KBr + 2H₂O\nStep 2: This reaction is strictly specific for the synthesis of primary amines.\nStep 3: Diethylamine ((C₂H₅)₂NH) is a secondary amine, so it cannot be prepared by the Hoffmann bromamide degradation reaction.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 938,
    similar: {
      question: "Among the following amines, which is the STRONGEST base in the gaseous phase where solvation effects are completely absent?",
      option_a: "(A) Ammonia (NH₃)",
      option_b: "(B) Trimethylamine ((CH₃)₃N)",
      option_c: "(C) Methylamine (CH₃NH₂)",
      option_d: "(D) Dimethylamine ((CH₃)₂NH)",
      correct_option: "B",
      explanation: "Step 1: In the gas phase, solvent molecules (water) are absent, and basic strength is determined exclusively by the electron-donating inductive (+I) effect of alkyl groups.\nStep 2: Each methyl group pushes electron density onto the nitrogen atom, increasing the availability of the lone pair and stabilizing the resulting conjugate ammonium cation.\nStep 3: Trimethylamine ((CH₃)₃N) has three electron-releasing methyl groups (+I effect), making it the most basic in the gas phase.\nStep 4: Gas phase basicity order: 3° amine > 2° amine > 1° amine > NH₃.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 939,
    similar: {
      question: "Direct nitration of aniline with concentrated HNO₃ and concentrated H₂SO₄ yields an unexpectedly large amount of meta-nitroaniline (47%). This is primarily because:",
      option_a: "(A) Aniline is oxidized by the nitrating mixture.",
      option_b: "(B) In strongly acidic medium, aniline is extensively protonated to form the anilinium ion (-NH₃⁺), which is strongly meta-directing and deactivating.",
      option_c: "(C) The amino group acts as a meta-directing group at high temperatures.",
      option_d: "(D) Nitro group undergoes nucleophilic aromatic substitution.",
      correct_option: "B",
      explanation: "Step 1: The -NH₂ group in aniline is strongly activating and ortho/para-directing under neutral or weakly basic conditions.\nStep 2: However, in the presence of strong acids (conc. HNO₃ + conc. H₂SO₄), the basic amino group accepts a proton to form the positively charged anilinium ion: C₆H₅NH₂ + H⁺ ⇌ C₆H₅NH₃⁺.\nStep 3: The -NH₃⁺ group exerts a powerful electron-withdrawing inductive (-I) effect and has no lone pair for resonance, making it strongly deactivating and meta-directing.\nStep 4: Consequently, nitration of the anilinium ion yields 47% m-nitroaniline (along with 51% p-nitroaniline and 2% o-nitroaniline).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 940,
    similar: {
      question: "Which reagent is most suitable for converting 2-phenylethanamine (C₆H₅CH₂CH₂NH₂) into 2-phenylethanol (C₆H₅CH₂CH₂OH)?",
      option_a: "(A) LiAlH₄ in dry ether",
      option_b: "(B) Alkaline KMnO₄",
      option_c: "(C) Nitrous acid (NaNO₂ + dilute HCl at room temperature)",
      option_d: "(D) PCl₅ followed by hydrolysis",
      correct_option: "C",
      explanation: "Step 1: 2-Phenylethanamine is an aliphatic primary amine (the amino group is on the aliphatic side-chain).\nStep 2: Aliphatic primary amines react with nitrous acid (generated in situ from NaNO₂ and dilute HCl) to produce an unstable aliphatic diazonium salt: R-NH₂ + HNO₂ → [R-N₂⁺Cl⁻] + 2H₂O.\nStep 3: The aliphatic diazonium intermediate rapidly decomposes with spontaneous evolution of nitrogen gas (N₂ ↑), generating a carbocation that captures water to form the corresponding alcohol (2-phenylethanol).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 941,
    similar: {
      question: "Arrange the following in increasing order of their basic strength in aqueous solution:\nI. C₆H₅NH₂ (Aniline)\nII. NH₃ (Ammonia)\nIII. C₂H₅NH₂ (Ethylamine)",
      option_a: "(A) I < II < III",
      option_b: "(B) III < II < I",
      option_c: "(C) II < I < III",
      option_d: "(D) I < III < II",
      correct_option: "A",
      explanation: "Step 1: In aniline (I), the unshared pair of electrons on nitrogen is delocalized into the benzene ring by resonance, significantly decreasing its availability for protonation (pK_b ≈ 9.4).\nStep 2: In ammonia (II), the lone pair on nitrogen is localized (pK_b ≈ 4.75), making it a much stronger base than aniline.\nStep 3: In ethylamine (III), the ethyl group exerts an electron-donating inductive (+I) effect that increases electron density on nitrogen, making it more basic than ammonia (pK_b ≈ 3.29).\nStep 4: Hence, the increasing order of basicity is: C₆H₅NH₂ < NH₃ < C₂H₅NH₂ (I < II < III).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 942,
    similar: {
      question: "What is the correct decreasing order of basic strength among the following chemical species: H₃O⁺, NH₄⁺, and NH₃?",
      option_a: "(A) NH₃ > NH₄⁺ > H₃O⁺",
      option_b: "(B) H₃O⁺ > NH₄⁺ > NH₃",
      option_c: "(C) NH₄⁺ > NH₃ > H₃O⁺",
      option_d: "(D) NH₃ > H₃O⁺ > NH₄⁺",
      correct_option: "A",
      explanation: "Step 1: Basicity refers to the ability or tendency of a species to donate a pair of electrons or accept a proton.\nStep 2: Ammonia (NH₃) is a neutral molecule with a localized lone pair of electrons on the nitrogen atom and readily acts as a Lewis base and Bronsted-Lowry base.\nStep 3: The ammonium ion (NH₄⁺) is positively charged and has no lone pair of electrons; it is a weak conjugate acid of NH₃ (pK_a ≈ 9.25).\nStep 4: The hydronium ion (H₃O⁺) is a strong Bronsted acid (pK_a = -1.74) and possesses negligible basicity compared to NH₃ and NH₄⁺.\nStep 5: Thus, the decreasing order of basic strength is: NH₃ > NH₄⁺ > H₃O⁺.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 943,
    similar: {
      question: "The reaction of aniline with benzoyl chloride in the presence of aqueous sodium hydroxide to form N-phenylbenzamide (benzanilide) is known as the:",
      option_a: "(A) Perkin reaction",
      option_b: "(B) Friedel-Crafts reaction",
      option_c: "(C) Schotten-Baumann reaction",
      option_d: "(D) Kolbe reaction",
      correct_option: "C",
      explanation: "Step 1: The acylation of aromatic amines or phenols with benzoyl chloride (C₆H₅COCl) in the presence of an aqueous base (such as NaOH or pyridine) to neutralize the byproduct HCl is known as the Schotten-Baumann reaction.\nStep 2: Reaction: C₆H₅NH₂ + C₆H₅COCl + NaOH → C₆H₅NHCOC₆H₅ (benzanilide) + NaCl + H₂O.\nStep 3: This reaction serves as an important method for benzoylation and identification of amines.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 944,
    similar: {
      question: "Which of the following reduction methods is preferred commercially for the reduction of nitrobenzene to aniline because only catalytic amounts of hydrochloric acid are required?",
      option_a: "(A) Reduction with LiAlH₄ in ether",
      option_b: "(B) Reduction with NaBH₄ in ethanol",
      option_c: "(C) Reduction with iron scrap and dilute hydrochloric acid (Fe + HCl)",
      option_d: "(D) Reduction with zinc amalgam and concentrated HCl",
      correct_option: "C",
      explanation: "Step 1: Nitrobenzene is reduced to aniline smoothly using iron scrap (Fe) and hydrochloric acid (HCl):\nC₆H₅NO₂ + 6[H] --(Fe / HCl)--> C₆H₅NH₂ + 2H₂O\nStep 2: During this reaction, the formed iron(II) chloride (FeCl₂) is hydrolyzed by water to regenerate hydrochloric acid:\nFeCl₂ + 2H₂O → Fe(OH)₂ + 2HCl\nStep 3: Because HCl is continuously regenerated, only a small catalytic amount of HCl is needed to initiate and sustain the reaction, making it the most economical and preferred industrial method.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 945,
    similar: {
      question: "Benzenediazonium chloride can be reduced directly to benzene using which of the following mild reducing agents in the presence of Cu⁺ ions?",
      option_a: "(A) Hypophosphorous acid (H₃PO₂) or ethanol (CH₃CH₂OH)",
      option_b: "(B) Nitric acid (HNO₃)",
      option_c: "(C) Potassium permanganate (KMnO₄)",
      option_d: "(D) Sodium borohydride (NaBH₄)",
      correct_option: "A",
      explanation: "Step 1: Benzenediazonium chloride undergoes replacement of the diazonium group (-N₂⁺Cl⁻) by hydrogen when treated with mild reducing agents such as hypophosphorous acid (phosphinic acid, H₃PO₂) or ethanol.\nReactions:\nC₆H₅N₂⁺Cl⁻ + H₃PO₂ + H₂O --(Cu⁺)--> C₆H₆ + N₂ ↑ + H₃PO₃ + HCl\nC₆H₅N₂⁺Cl⁻ + CH₃CH₂OH → C₆H₆ + N₂ ↑ + CH₃CHO + HCl\nStep 2: In these reactions, the diazonium salt is reduced to benzene while H₃PO₂ is oxidized to phosphorous acid (H₃PO₃) and ethanol is oxidized to acetaldehyde (ethanal).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 946,
    similar: {
      question: "An organic compound 'A' (C₃H₉N) reacts with benzenesulphonyl chloride (Hinsberg's reagent) to form a clear solution that, upon addition of excess aqueous alkali (NaOH), remains completely dissolved. Acidification of this alkaline solution precipitates compound 'B'. Compound 'A' is:",
      option_a: "(A) N,N-Dimethylmethanamine (a tertiary amine)",
      option_b: "(B) Propan-1-amine (a primary amine)",
      option_c: "(C) N-Methylethanamine (a secondary amine)",
      option_d: "(D) Nitropropane",
      correct_option: "B",
      explanation: "Step 1: Primary amines (R-NH₂) react with benzenesulphonyl chloride (C₆H₅SO₂Cl) to form N-alkylbenzenesulphonamide: C₆H₅SO₂NHR.\nStep 2: Because of the strong electron-withdrawing effect of the sulphonyl group (-SO₂-), the remaining hydrogen attached to nitrogen is acidic and readily dissolves in aqueous NaOH to form a water-soluble salt [C₆H₅SO₂N⁻R] Na⁺.\nStep 3: Subsequent acidification with mineral acid regenerates the insoluble sulfonamide precipitate.\nStep 4: Secondary amines form sulfonamides that have no acidic N-H and are insoluble in NaOH. Tertiary amines do not react at all.\nStep 5: Therefore, compound 'A' must be a primary amine: propan-1-amine (or propan-2-amine).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 947,
    similar: {
      question: "Benzonitrile (C₆H₅CN) is reduced with LiAlH₄ to yield compound 'Y'. In a separate vessel, benzonitrile is completely hydrolyzed in acidic medium to yield compound 'Z'. When equimolar quantities of 'Y' and 'Z' are mixed and strongly heated, the final product is:",
      option_a: "(A) N-Benzylbenzamide (C₆H₅CONHCH₂C₆H₅)",
      option_b: "(B) Benzophenone",
      option_c: "(C) Diphenylamine",
      option_d: "(D) Benzamide",
      correct_option: "A",
      explanation: "Step 1: Reduction of benzonitrile with LiAlH₄ yields benzylamine:\nC₆H₅CN + 4[H] --(LiAlH₄)--> C₆H₅CH₂NH₂ [Y].\nStep 2: Complete acidic hydrolysis of benzonitrile yields benzoic acid:\nC₆H₅CN + 2H₂O + H⁺ → C₆H₅COOH [Z] + NH₄⁺.\nStep 3: When benzylamine ('Y') and benzoic acid ('Z') are mixed, they form a benzylammonium benzoate salt which upon strong heating undergoes dehydration to form N-benzylbenzamide:\nC₆H₅COOH + C₆H₅CH₂NH₂ --(Δ, -H₂O)--> C₆H₅CONHCH₂C₆H₅.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 948,
    similar: {
      question: "Reduction of methyl isocyanide (CH₃NC) with sodium and ethanol (Na / C₂H₅OH) or LiAlH₄ produces:",
      option_a: "(A) Dimethylamine ((CH₃)₂NH, a secondary amine)",
      option_b: "(B) Ethylamine (CH₃CH₂NH₂, a primary amine)",
      option_c: "(C) Methylamine (CH₃NH₂)",
      option_d: "(D) Trimethylamine ((CH₃)₃N)",
      correct_option: "A",
      explanation: "Step 1: Reduction of alkyl cyanides (R-CN) gives primary amines (R-CH₂NH₂).\nStep 2: However, reduction of alkyl isocyanides (R-NC) adds four hydrogen atoms across the isocyanide group to form a secondary amine containing a methyl group attached to nitrogen:\nR-NC + 4[H] --(LiAlH₄)--> R-NH-CH₃\nStep 3: For methyl isocyanide (CH₃NC):\nCH₃NC + 4[H] → CH₃-NH-CH₃ (dimethylamine, a secondary amine).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 949,
    similar: {
      question: "Which of the following nitrogen-containing aromatic compounds is the MOST basic?",
      option_a: "(A) Aniline (C₆H₅NH₂)",
      option_b: "(B) Benzylamine (C₆H₅CH₂NH₂)",
      option_c: "(C) Acetanilide (C₆H₅NHCOCH₃)",
      option_d: "(D) 4-Nitroaniline (p-O₂NC₆H₄NH₂)",
      correct_option: "B",
      explanation: "Step 1: In aniline, acetanilide, and 4-nitroaniline, the lone pair of electrons on the nitrogen atom is directly conjugated with the aromatic benzene ring and delocalized via resonance, significantly diminishing its basic strength (pK_b of aniline = 9.4).\nStep 2: In benzylamine (C₆H₅CH₂NH₂), the amino group is attached to an sp³ hybridized benzylic carbon (-CH₂-). There is no resonance delocalization of the nitrogen lone pair into the ring.\nStep 3: Thus, benzylamine behaves as a typical aliphatic primary amine with high electron density on nitrogen and a pK_b value of ~4.7, making it far more basic than the others.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 950,
    similar: {
      question: "In the nitration of benzene using a mixture of concentrated nitric acid (conc. HNO₃) and concentrated sulfuric acid (conc. H₂SO₄), nitric acid acts as a:",
      option_a: "(A) Bronsted-Lowry acid",
      option_b: "(B) Bronsted-Lowry base",
      option_c: "(C) Dehydrating agent",
      option_d: "(D) Reducing agent",
      correct_option: "B",
      explanation: "Step 1: Concentrated sulfuric acid (H₂SO₄) is a significantly stronger acid than concentrated nitric acid (HNO₃).\nStep 2: In the nitrating mixture, H₂SO₄ donates a proton to HNO₃:\nHNO₃ + 2H₂SO₄ ⇌ H₂O⁺-NO₂ + 2HSO₄⁻ ⇌ NO₂⁺ (nitronium ion) + H₃O⁺ + 2HSO₄⁻\nStep 3: Because HNO₃ accepts a proton (H⁺) from H₂SO₄, it functions as a Bronsted-Lowry base in this reaction, while H₂SO₄ acts as the Bronsted-Lowry acid.\nStep 4: The generated nitronium ion (NO₂⁺) is the active electrophile that attacks the benzene ring.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 951,
    similar: {
      question: "An aliphatic nitrile 'X' (CH₃CN) is reduced with LiAlH₄ to yield compound 'Y'. In another experiment, 'X' is treated with dilute mineral acid and heated to yield compound 'Z'. Reaction between 'Y' and 'Z' upon strong heating produces:",
      option_a: "(A) Ethylamine",
      option_b: "(B) Ethanoic anhydride",
      option_c: "(C) N-Ethylethanamide (N-ethylacetamide)",
      option_d: "(D) Diethylamine",
      correct_option: "C",
      explanation: "Step 1: Acetonitrile (CH₃CN, 'X') on reduction with LiAlH₄ gives ethylamine:\nCH₃CN + 4[H] → CH₃CH₂NH₂ [Y].\nStep 2: Hydrolysis of acetonitrile ('X') with dilute mineral acid yields ethanoic acid (acetic acid):\nCH₃CN + 2H₂O + H⁺ → CH₃COOH [Z] + NH₄⁺.\nStep 3: Heating ethanoic acid ('Z') with ethylamine ('Y') eliminates a molecule of water to form an N-substituted amide:\nCH₃COOH + CH₃CH₂NH₂ --(Δ, -H₂O)--> CH₃CONHCH₂CH₃ (N-ethylethanamide).\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 77 Part 1 questions (IDs 926 to 951)...');
    
    for (const item of part1Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Set 77 Part 1 questions updated successfully!');
  } catch (err) {
    console.error('Error in Set 77 Part 1 update:', err);
  }
}

run();
