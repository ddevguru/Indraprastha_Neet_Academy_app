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
    id: 980,
    similar: {
      question: "The organic product obtained by heating ethanamine with trichloromethane (chloroform) and alcoholic potassium hydroxide is:",
      option_a: "(A) Ethyl cyanide (CH₃CH₂CN)",
      option_b: "(B) Ethyl isocyanide (CH₃CH₂NC)",
      option_c: "(C) Ethyl isocyanate (CH₃CH₂NCO)",
      option_d: "(D) Ethanamide (CH₃CONH₂)",
      correct_option: "B",
      explanation: "Step 1: The reaction between a primary amine, chloroform, and alcoholic KOH is the carbylamine reaction (isocyanide test).\nStep 2: Ethanamine (CH₃CH₂NH₂) reacts with CHCl₃ and alc. KOH upon heating:\nCH₃CH₂NH₂ + CHCl₃ + 3KOH(alc) --(Δ)--> CH₃CH₂NC + 3KCl + 3H₂O\nStep 3: The product is ethyl isocyanide (ethyl carbylamine), known for its repulsive, choking odor.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 981,
    similar: {
      question: "The hydrogen atom attached to the nitrogen atom in N-alkylbenzenesulphonamide (formed by reaction of a 1° amine with benzenesulphonyl chloride) is strongly ________ due to the powerful electron-withdrawing sulphonyl group (-SO₂-). Consequently, the compound is ________ in aqueous NaOH.",
      option_a: "(A) basic, insoluble",
      option_b: "(B) acidic, soluble",
      option_c: "(C) neutral, insoluble",
      option_d: "(D) basic, soluble",
      correct_option: "B",
      explanation: "Step 1: In N-alkylbenzenesulphonamide (C₆H₅SO₂-NH-R), the -SO₂- group exerts a powerful electron-withdrawing inductive (-I) and resonance effect.\nStep 2: This pulls electron density away from the N-H bond, polarizing it and releasing the proton readily. Thus, the hydrogen atom is strongly acidic.\nStep 3: Because of its acidic character, it reacts with bases like aqueous NaOH to form a water-soluble sodium salt: [C₆H₅SO₂-N⁻-R] Na⁺ + H₂O.\nStep 4: Therefore, the hydrogen is acidic, and the sulphonamide is soluble in aqueous NaOH.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 982,
    similar: {
      question: "Read the following statements regarding amines and identify the correct statements:\n(i) In the ammonolysis of alkyl halides, primary amine is obtained as the major product by using a large excess of ammonia.\n(ii) Secondary and tertiary amines can be distinguished by the carbylamine test.\n(iii) Quantitative liberation of nitrogen gas during the reaction of primary aliphatic amines with nitrous acid is used for the estimation of amino acids and proteins (Van Slyke method).\n(iv) N,N-Dialkylbenzenesulphonamides are acidic and dissolve in aqueous NaOH.",
      option_a: "(A) (i), (ii), and (iii)",
      option_b: "(B) (ii) and (iv)",
      option_c: "(C) (i) and (iii) only",
      option_d: "(D) (i), (iii), and (iv)",
      correct_option: "C",
      explanation: "Step 1: Statement (i): Large excess of ammonia ensures that incoming alkyl halide molecules predominantly encounter NH₃ rather than already formed amine, preventing polyalkylation and yielding primary amine as major product. (Correct)\nStep 2: Statement (ii): Carbylamine test is given exclusively by primary amines; both secondary and tertiary amines give a negative test, so it cannot distinguish between them. (Incorrect)\nStep 3: Statement (iii): Aliphatic primary amines react quantitatively with nitrous acid to liberate N₂ gas, a principle employed in the Van Slyke method for nitrogen estimation. (Correct)\nStep 4: Statement (iv): N,N-Dialkylbenzenesulphonamides have no hydrogen on nitrogen and are insoluble in aqueous NaOH. (Incorrect)\nStep 5: Thus, only statements (i) and (iii) are correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 983,
    similar: {
      question: "The powerful activating effect of the amino group (-NH₂) in aniline during electrophilic aromatic substitution can be controlled (moderated) by protecting the group via reaction with:",
      option_a: "(A) Acetyl chloride (CH₃COCl) or Acetic anhydride ((CH₃CO)₂O)",
      option_b: "(B) Chloromethane (CH₃Cl)",
      option_c: "(C) Acetamide (CH₃CONH₂)",
      option_d: "(D) Formaldehyde (HCHO)",
      correct_option: "A",
      explanation: "Step 1: The lone pair of electrons on nitrogen in aniline makes the aromatic ring extremely electron-rich, often leading to poly-substitution (e.g., 2,4,6-tribromination with bromine water).\nStep 2: To obtain mono-substituted derivatives, the activating effect of -NH₂ is moderated by acetylation using acetyl chloride or acetic anhydride in pyridine to form acetanilide (C₆H₅NHCOCH₃).\nStep 3: In acetanilide, the lone pair on nitrogen is delocalized into the carbonyl group of the acetyl moiety (-C(=O)-CH₃) through resonance, diminishing its availability to the benzene ring.\nStep 4: Subsequent electrophilic substitution gives the desired mono-substituted product, followed by acidic or alkaline hydrolysis to regenerate the free amino group.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 984,
    similar: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A): Aniline does not undergo Friedel-Crafts alkylation or acylation reactions.\nReason (R): The basic amino group (-NH₂) of aniline reacts with anhydrous AlCl₃ (a Lewis acid catalyst) to form an acid-base adduct, placing a positive charge on nitrogen that strongly deactivates the benzene ring.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both A and R are true, and R is the correct explanation of A.",
      option_b: "(B) Both A and R are true, but R is NOT the correct explanation of A.",
      option_c: "(C) A is true, but R is false.",
      option_d: "(D) A is false, but R is true.",
      correct_option: "A",
      explanation: "Step 1: Evaluating Assertion (A): Friedel-Crafts alkylation and acylation fail completely with aniline. Thus, Assertion (A) is true.\nStep 2: Evaluating Reason (R): Aniline acts as a Lewis base due to the lone pair of electrons on its nitrogen atom. Anhydrous aluminium chloride (AlCl₃) is an electron-deficient Lewis acid catalyst. They react instantly in an acid-base neutralization to form a coordination complex: C₆H₅NH₂ + AlCl₃ → C₆H₅NH₂⁺-AlCl₃⁻.\nStep 3: The resulting positive charge on nitrogen (-NH₂⁺-) exerts a powerful electron-withdrawing inductive (-I) effect, heavily deactivating the aromatic ring towards electrophilic attack and consuming the catalyst.\nStep 4: Thus, Reason (R) is true and correctly explains Assertion (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 985,
    similar: {
      question: "When benzenediazonium chloride is treated with alkaline β-naphthol (2-naphthol) at 273-278 K, a brilliant red-orange dye is obtained. The coupling occurs predominantly at which position of β-naphthol?",
      option_a: "(A) Position 1 (C-1)",
      option_b: "(B) Position 3 (C-3)",
      option_c: "(C) Position 6 (C-6)",
      option_d: "(D) Position 7 (C-7)",
      correct_option: "A",
      explanation: "Step 1: In β-naphthol (2-naphthol), the hydroxyl group (-OH) is at the C-2 position.\nStep 2: Electrophilic attack by the benzenediazonium cation (C₆H₅N₂⁺) occurs selectively at the activated C-1 (alpha) position because attack at C-1 preserves the aromaticity of the adjacent benzene ring during the arenium ion intermediate.\nStep 3: Attack at C-3 would disrupt the aromaticity of both fused rings in the transition state.\nStep 4: The product is 1-(phenyldiazenyl)naphthalen-2-ol (Sudan I / red azo dye).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 986,
    similar: {
      question: "Arenediazonium salts (e.g., C₆H₅N₂⁺Cl⁻) are stable for a short period in aqueous solution at 273-278 K, whereas alkanediazonium salts (e.g., CH₃N₂⁺Cl⁻) decompose spontaneously and explosively even at 0 °C. The stability of arenediazonium salts is primarily attributed to:",
      option_a: "(A) Resonance delocalization of the positive charge over the aromatic benzene ring",
      option_b: "(B) Strong ionic bond with the chloride anion",
      option_c: "(C) Higher electronegativity of nitrogen compared to carbon",
      option_d: "(D) Steric protection of the diazonium group by ortho hydrogens",
      correct_option: "A",
      explanation: "Step 1: In arenediazonium ions (Ar-N⁺≡N), the diazonium group is directly attached to an sp² hybridized aromatic ring.\nStep 2: The pi-electrons of the benzene ring participate in resonance with the diazonium group, delocalizing the positive charge over the ortho and para positions of the benzene ring:\nC₆H₅-N⁺≡N ↔ o-quinoid structures.\nStep 3: This resonance stabilization imparts a partial double bond character to the C-N bond and significantly strengthens it at low temperatures (0-5 °C).\nStep 4: Alkanediazonium salts lack any such resonance delocalization and immediately lose N₂ gas to form carbocations.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 987,
    similar: {
      question: "Which of the following statements comparing the Sandmeyer reaction and Gattermann reaction is CORRECT?\n(i) In the Sandmeyer reaction, the diazonium group is replaced by Cl, Br, or CN using Cu(I) salts (CuCl/HCl, CuBr/HBr, CuCN/KCN).\n(ii) In the Gattermann reaction, the diazonium group is replaced by Cl or Br using copper powder in the presence of halogen acid (Cu/HCl or Cu/HBr).\n(iii) The yield of aryl halide obtained in the Sandmeyer reaction is generally superior to that obtained in the Gattermann reaction.",
      option_a: "(A) (i), (ii), and (iii)",
      option_b: "(B) (i) and (ii) only",
      option_c: "(C) (ii) and (iii) only",
      option_d: "(D) (i) and (iii) only",
      correct_option: "A",
      explanation: "Step 1: Statement (i): Sandmeyer reaction employs cuprous salts (Cu₂Cl₂, Cu₂Br₂, CuCN) as catalysts to replace the diazonium moiety with Cl, Br, or CN. (Correct)\nStep 2: Statement (ii): Gattermann reaction is a modification that uses finely divided copper powder with concentrated HCl or HBr instead of cuprous salts. (Correct)\nStep 3: Statement (iii): Experimental findings demonstrate that Sandmeyer reaction consistently provides cleaner conversions and higher percentage yields (>70-80%) compared to the Gattermann reaction. (Correct)\nStep 4: All three statements are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 988,
    similar: {
      question: "Identify the product 'X' in the following synthetic sequence:\nC₆H₅CONH₂ --(P₂O₅, Δ)--> [A] --(LiAlH₄ in ether)--> [X]",
      option_a: "(A) Benzoic acid",
      option_b: "(B) Benzaldehyde",
      option_c: "(C) Aniline",
      option_d: "(D) Benzylamine (C₆H₅CH₂NH₂)",
      correct_option: "D",
      explanation: "Step 1: Benzamide (C₆H₅CONH₂) heated with the dehydrating agent P₂O₅ undergoes dehydration with loss of water to form benzonitrile:\nC₆H₅CONH₂ --(P₂O₅, Δ, -H₂O)--> C₆H₅CN [A].\nStep 2: Reduction of benzonitrile with LiAlH₄ adds four hydrogen atoms across the nitrile triple bond (-C≡N) to yield benzylamine:\nC₆H₅CN + 4[H] --(LiAlH₄)--> C₆H₅CH₂NH₂ [X].\nStep 3: The final organic product 'X' is benzylamine.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 989,
    similar: {
      question: "What is the final organic product obtained when benzenediazonium chloride is heated with aqueous potassium iodide (KI)?",
      option_a: "(A) Chlorobenzene",
      option_b: "(B) Phenol",
      option_c: "(C) Iodobenzene (C₆H₅I)",
      option_d: "(D) Biphenyl",
      correct_option: "C",
      explanation: "Step 1: Replacement of the diazonium group by iodine does not require a cuprous halide catalyst due to the high nucleophilicity of iodide ion (I⁻).\nStep 2: Simply warming an aqueous solution of benzenediazonium chloride with potassium iodide (KI) gives iodobenzene with evolution of nitrogen:\nC₆H₅N₂⁺Cl⁻ + KI → C₆H₅I + KCl + N₂ ↑\nStep 3: This is the most practical and convenient laboratory method for preparing iodobenzene.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 990,
    similar: {
      question: "Match List I with List II:\nList I (Chemical Species):\nA. Sulphanilic acid\nB. Benzenediazonium chloride\nC. Alkanediazonium salts\nD. Anilinium chloride\nList II (Property / Characteristic):\nI. Exists as an internal dipolar zwitterion\nII. Decomposes instantaneously even at 0 °C with quantitative N₂ evolution to give alcohols\nIII. Coupling with phenols/amines to form azo dyes\nIV. Strong conjugate acid salt of a weak base\nChoose the correct answer from the options given below:",
      option_a: "(A) A-I, B-III, C-II, D-IV",
      option_b: "(B) A-II, B-I, C-III, D-IV",
      option_c: "(C) A-I, B-II, C-III, D-IV",
      option_d: "(D) A-III, B-I, C-IV, D-II",
      correct_option: "A",
      explanation: "Step 1: Sulphanilic acid contains both a basic amino group (-NH₂) and an acidic sulphonic group (-SO₃H). Internal proton transfer forms a dipolar zwitterion: ⁺H₃N-C₆H₄-SO₃⁻ (A matches I).\nStep 2: Benzenediazonium chloride undergoes azo coupling with phenols and aromatic amines to form intensely colored azo dyes (B matches III).\nStep 3: Alkanediazonium salts are extremely unstable and decompose spontaneously into carbocations, evolving N₂ gas and forming alcohols (C matches II).\nStep 4: Anilinium chloride (C₆H₅NH₃⁺Cl⁻) is the salt of a weak base and strong acid (D matches IV).\nStep 5: Thus, the correct matching is A-I, B-III, C-II, D-IV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 991,
    similar: {
      question: "Which of the following reducing systems can be successfully utilized to reduce nitrobenzene to aniline?\nI. H₂ / Pd in ethanol\nII. Sn and concentrated HCl\nIII. Fe scrap and dilute HCl\nChoose the correct option:",
      option_a: "(A) I and II only",
      option_b: "(B) II and III only",
      option_c: "(C) I and III only",
      option_d: "(D) All I, II, and III",
      correct_option: "D",
      explanation: "Step 1: Catalytic hydrogenation of nitrobenzene over Pd, Pt, or Ni in ethanol smoothly reduces the nitro group (-NO₂) to an amino group (-NH₂).\nStep 2: Chemical reduction using tin and hydrochloric acid (Sn + HCl) reduces nitrobenzene to anilinium hexachlorostannate, which on treatment with excess alkali liberates aniline.\nStep 3: Chemical reduction using iron scrap and dilute HCl (Fe + HCl) is the preferred industrial method due to catalyst regeneration.\nStep 4: All three reagents effectively reduce nitrobenzene to aniline.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 992,
    similar: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A): tert-Butylamine cannot be synthesized by the nucleophilic substitution reaction of tert-butyl bromide with ammonia/NaOH.\nReason (R): tert-Butyl bromide is a sterically hindered tertiary alkyl halide and predominantly undergoes elimination (E2) rather than substitution when treated with basic nucleophiles, yielding 2-methylpropene.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both A and R are true, and R is the correct explanation of A.",
      option_b: "(B) Both A and R are true, but R is NOT the correct explanation of A.",
      option_c: "(C) A is true, but R is false.",
      option_d: "(D) A is false, but R is true.",
      correct_option: "A",
      explanation: "Step 1: Evaluating Assertion (A): Attempting to prepare tert-butylamine by reacting (CH₃)₃C-Br with ammonia or NaOH yields an alkene instead of the amine. Thus, Assertion (A) is true.\nStep 2: Evaluating Reason (R): In tertiary alkyl halides, the central carbon is crowded by three bulky methyl groups, hindering backside nucleophilic attack (S_N2). Since ammonia and hydroxide ions are bases as well as nucleophiles, base-induced E2 elimination of HBr occurs almost exclusively to give 2-methylpropene (isobutylene):\n(CH₃)₃C-Br + Base → (CH₃)₂C=CH₂ + Base-H⁺ + Br⁻.\nStep 3: Thus, Reason (R) is true and correctly explains Assertion (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 993,
    similar: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A): Aromatic primary amines like aniline cannot be prepared by Gabriel phthalimide synthesis.\nReason (R): Aryl halides do not undergo electrophilic substitution with the phthalimide anion.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "(A) Both A and R are true, and R is the correct explanation of A.",
      option_b: "(B) Both A and R are true, but R is NOT the correct explanation of A.",
      option_c: "(C) A is true, but R is false.",
      option_d: "(D) A is false, but R is true.",
      correct_option: "C",
      explanation: "Step 1: Evaluating Assertion (A): Aromatic primary amines cannot be synthesized by the Gabriel phthalimide method. Thus, Assertion (A) is true.\nStep 2: Evaluating Reason (R): The reason aryl halides fail to react with potassium phthalimide is that they do NOT undergo NUCLEOPHILIC substitution (S_N2) due to resonance partial double bond character of the C-X bond and electronic repulsion. Reason (R) incorrectly states 'electrophilic substitution' instead of nucleophilic substitution. Thus, Reason (R) is false.\nStep 3: Therefore, A is true, but R is false.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 994,
    similar: {
      question: "In the Hofmann ammonolysis of alkyl halides (R-X + NH₃), which experimental condition is employed to ensure that the primary amine (R-NH₂) is obtained as the major product?",
      option_a: "(A) Using a large excess of the alkyl halide (R-X)",
      option_b: "(B) Using a large excess of ammonia (NH₃)",
      option_c: "(C) Carrying out the reaction in strongly acidic aqueous solution",
      option_d: "(D) Using stoichiometric equimolar quantities of R-X and NH₃",
      correct_option: "B",
      explanation: "Step 1: When an alkyl halide reacts with ammonia, the primary amine formed (R-NH₂) is a stronger nucleophile than ammonia itself, and readily attacks further alkyl halide molecules to form secondary and tertiary amines and quaternary ammonium salts.\nStep 2: To prevent consecutive alkylation, a large molar excess of ammonia (NH₃) is employed.\nStep 3: The excess NH₃ drastically increases the statistical probability that an alkyl halide molecule will collide with NH₃ rather than with R-NH₂, making the primary amine the predominant product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 995,
    similar: {
      question: "Which of the following reaction pathways produces a primary amine with ONE MORE carbon atom than the starting alkyl halide?",
      option_a: "(A) Reaction of alkyl halide with alcoholic KCN followed by reduction with LiAlH₄",
      option_b: "(B) Hofmann bromamide degradation of an amide",
      option_c: "(C) Gabriel phthalimide synthesis using the alkyl halide",
      option_d: "(D) Direct ammonolysis of the alkyl halide with excess ammonia",
      correct_option: "A",
      explanation: "Step 1: Reaction of alkyl halide (R-X) with KCN adds a cyano carbon to form an alkane nitrile (R-CN), stepping up the chain length by one carbon:\nR-X + KCN → R-CN + KX.\nStep 2: Subsequent reduction of the nitrile with LiAlH₄ or H₂/Ni yields a primary amine: R-CN + 4[H] → R-CH₂NH₂.\nStep 3: This amine has one more carbon than the original alkyl group R.\nStep 4: Gabriel synthesis and ammonolysis retain the same number of carbons, while Hofmann degradation steps down by one carbon.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 996,
    similar: {
      question: "Which of the following reducing agents is/are capable of converting an alkane nitrile (R-CN) into a primary amine (R-CH₂NH₂)?\n(i) Lithium aluminium hydride (LiAlH₄)\n(ii) Catalytic hydrogenation (H₂ / Ni)\n(iii) Sodium and ethanol (Na / C₂H₅OH, Mendius reaction)",
      option_a: "(A) (i) only",
      option_b: "(B) (i), (ii), and (iii)",
      option_c: "(C) (ii) only",
      option_d: "(D) (i) and (iii) only",
      correct_option: "B",
      explanation: "Step 1: Nitriles (R-CN) contain a carbon-nitrogen triple bond that can be completely reduced by adding four hydrogen atoms.\nStep 2: LiAlH₄ in dry ether cleanly reduces nitriles to primary amines.\nStep 3: Catalytic hydrogenation using H₂ gas in the presence of Raney nickel, Pd, or Pt also reduces nitriles to primary amines.\nStep 4: Reduction using sodium metal in boiling absolute ethanol is specifically known as the Mendius reaction and efficiently yields primary amines.\nStep 5: All three reagents are standard and effective reducing agents for this conversion.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 997,
    similar: {
      question: "Which of the following statements regarding the Hofmann bromamide degradation reaction is INCORRECT?",
      option_a: "(A) It converts a primary amide into a primary amine containing one carbon atom less than the starting amide.",
      option_b: "(B) During the reaction, the migrating alkyl or aryl group migrates with its electron pair from the carbonyl carbon to the nitrogen atom.",
      option_c: "(C) The migration of the alkyl group takes place via a free radical mechanism with complete racemization of stereocenters.",
      option_d: "(D) The carbonyl carbon of the amide is eliminated as a carbonate ion (CO₃²⁻).",
      correct_option: "C",
      explanation: "Step 1: The Hofmann bromamide reaction converts R-CONH₂ into R-NH₂ with loss of the carbonyl group as CO₃²⁻. (Statements A and D are correct)\nStep 2: The key step is an intramolecular 1,2-shift where the migrating group R shifts from carbonyl carbon to nitrogen in an electron-deficient nitrene-like intermediate (or concerted with Br⁻ departure). (Statement B is correct)\nStep 3: The migration is strictly intramolecular and concerted; if the migrating alkyl group contains a chiral center at the migrating carbon, it migrates with complete retention of stereochemical configuration, NOT through free radicals or with racemization. (Statement C is incorrect)\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 998,
    similar: {
      question: "Which of the following statements regarding the physical properties and solubility of amines is/are CORRECT?\n(i) Lower aliphatic amines are gases or volatile liquids with fishy odors.\n(ii) Lower aliphatic amines are completely miscible with water due to hydrogen bonding with water molecules.\n(iii) As the hydrophobic alkyl chain grows larger (molar mass > 6 carbon atoms), the solubility in water drops sharply.\n(iv) Almost all amines dissolve freely in common organic solvents like benzene, ether, and alcohol.",
      option_a: "(A) (i) and (ii) only",
      option_b: "(B) (ii) and (iii) only",
      option_c: "(C) (i), (ii), and (iv) only",
      option_d: "(D) All (i), (ii), (iii), and (iv)",
      correct_option: "D",
      explanation: "Step 1: Methylamine and ethylamine are gases with pungent fishy smells; higher homologues are liquids/solids. (Statement i is correct)\nStep 2: Nitrogen in lower aliphatic amines readily accepts and donates hydrogen bonds with water, resulting in high solubility. (Statement ii is correct)\nStep 3: The nonpolar hydrocarbon tail resists interaction with polar water, so higher amines are practically insoluble in water. (Statement iii is correct)\nStep 4: Because of their covalent organic nature, amines dissolve readily in organic solvents such as alcohols, ether, and benzene. (Statement iv is correct)\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 999,
    similar: {
      question: "Which of the following statements regarding amines is INCORRECT?",
      option_a: "(A) Higher aliphatic amines are completely insoluble in water due to large hydrophobic alkyl chains.",
      option_b: "(B) Primary amines have lower boiling points than isomeric tertiary amines.",
      option_c: "(C) Amines are soluble in organic solvents such as ethanol, diethyl ether, and benzene.",
      option_d: "(D) Primary and secondary amines exhibit intermolecular hydrogen bonding.",
      correct_option: "B",
      explanation: "Step 1: Primary amines (R-NH₂) have two polar N-H bonds that participate extensively in intermolecular hydrogen bonding.\nStep 2: Isomeric tertiary amines (R₃N) have zero N-H bonds and cannot form intermolecular hydrogen bonds among their own molecules.\nStep 3: Consequently, primary amines have substantially higher boiling points than isomeric tertiary amines, making statement (B) incorrect.\nStep 4: Statements (A), (C), and (D) are all factually and scientifically correct.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1000,
    similar: {
      question: "Which class of amines CANNOT form intermolecular hydrogen bonds among molecules of its own kind?",
      option_a: "(A) Primary aliphatic amines (e.g., CH₃CH₂NH₂)",
      option_b: "(B) Tertiary amines (e.g., (CH₃)₃N)",
      option_c: "(C) Secondary aliphatic amines (e.g., (CH₃)₂NH)",
      option_d: "(D) Primary aromatic amines (e.g., C₆H₅NH₂)",
      correct_option: "B",
      explanation: "Step 1: For a molecule to form intermolecular hydrogen bonds with itself, it must possess both a hydrogen bond donor (a hydrogen atom bonded to an electronegative atom like N, O, or F) and a hydrogen bond acceptor (a lone pair on an electronegative atom).\nStep 2: Primary amines have two N-H bonds, and secondary amines have one N-H bond; both form intermolecular hydrogen bonds.\nStep 3: Tertiary amines have all three valence positions on nitrogen occupied by alkyl or aryl groups, possessing zero N-H bonds.\nStep 4: While tertiary amines can accept hydrogen bonds from water, they cannot form intermolecular hydrogen bonds with other tertiary amine molecules.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1001,
    similar: {
      question: "The basic strength of aliphatic amines in aqueous solution is determined by the combined influence of which of the following effects?\n(i) Inductive (+I) effect of alkyl groups\n(ii) Extent of solvation and hydration of the conjugate ammonium cation\n(iii) Steric hindrance around the nitrogen atom",
      option_a: "(A) (i) and (ii) only",
      option_b: "(B) (i) and (iii) only",
      option_c: "(C) All (i), (ii), and (iii)",
      option_d: "(D) (ii) only",
      correct_option: "C",
      explanation: "Step 1: Inductive effect (+I): Electron-releasing alkyl groups disperse positive charge on the conjugate cation and increase electron density on nitrogen, favoring basicity (3° > 2° > 1° > NH₃).\nStep 2: Solvation effect: The conjugate ammonium cation is stabilized by hydrogen bonding with water molecules. More hydrogens on nitrogen mean greater hydration stability (1° > 2° > 3°).\nStep 3: Steric factor: Bulky alkyl groups crowd the nitrogen atom, hindering the attack of protons and reducing hydration.\nStep 4: In aqueous medium, basicity is governed by the delicate balance of all three effects (yielding 2° > 1° > 3° for methyl and 2° > 3° > 1° for ethyl).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1002,
    similar: {
      question: "Arrange the substituted ammonium cations formed by protonation of amines in DECREASING order of stability achieved through hydration (solvation by hydrogen bonding with water molecules):\nI. RNH₃⁺ (from 1° amine)\nII. R₂NH₂⁺ (from 2° amine)\nIII. R₃NH⁺ (from 3° amine)",
      option_a: "(A) I > II > III",
      option_b: "(B) III > II > I",
      option_c: "(C) II > I > III",
      option_d: "(D) I > III > II",
      correct_option: "A",
      explanation: "Step 1: Hydration of substituted ammonium ions in aqueous solution occurs primarily through hydrogen bonding between the hydrogens attached to the positively charged nitrogen atom and water molecules.\nStep 2: The cation derived from a primary amine (RNH₃⁺) has three hydrogen atoms available to form three strong hydrogen bonds with water molecules, maximizing solvation energy.\nStep 3: The secondary ammonium cation (R₂NH₂⁺) has two hydrogens (two H-bonds).\nStep 4: The tertiary ammonium cation (R₃NH⁺) has only one hydrogen (one H-bond).\nStep 5: Thus, the decreasing order of stability due to hydration is: RNH₃⁺ > R₂NH₂⁺ > R₃NH⁺ (I > II > III).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1003,
    similar: {
      question: "Which of the following statements regarding the acylation of amines is/are CORRECT?\n(i) Aliphatic and aromatic primary and secondary amines react with acid chlorides, acid anhydrides, and esters by nucleophilic acyl substitution.\n(ii) Acylation involves replacing a hydrogen atom attached to nitrogen with an acyl group (-COR).\n(iii) The reaction is carried out in the presence of a base stronger than the amine (such as pyridine) to neutralize the byproduct acid (HCl).\n(iv) The products formed are substituted amides.",
      option_a: "(A) (i) and (ii) only",
      option_b: "(B) (i), (ii), and (iv) only",
      option_c: "(C) (ii) and (iii) only",
      option_d: "(D) All (i), (ii), (iii), and (iv)",
      correct_option: "D",
      explanation: "Step 1: Primary (R-NH₂) and secondary (R₂NH) amines have active hydrogen atoms on nitrogen and undergo nucleophilic attack on the carbonyl carbon of acyl chlorides, anhydrides, or esters. (Statement i is correct)\nStep 2: An acyl group replaces the active N-H hydrogen atom to form an N-substituted amide. (Statements ii and iv are correct)\nStep 3: A base such as pyridine is added to remove the byproduct hydrochloric acid (HCl), which would otherwise protonate the unreacted amine and halt the reaction. (Statement iii is correct)\nStep 4: All statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1004,
    similar: {
      question: "Which of the following statements regarding the diazotization of aromatic primary amines is/are CORRECT?\n(i) Primary aromatic amines react with nitrous acid (NaNO₂ + HCl) at low temperatures (273-278 K) to form arenediazonium salts.\n(ii) The reaction mixture must be kept cold (0-5 °C) because diazonium salts decompose rapidly at temperatures above 5 °C.\n(iii) Byproducts formed during the preparation of benzenediazonium chloride include sodium chloride (NaCl) and water (H₂O).",
      option_a: "(A) (i) and (ii) only",
      option_b: "(B) (ii) and (iii) only",
      option_c: "(C) All (i), (ii), and (iii)",
      option_d: "(D) (i) and (iii) only",
      correct_option: "C",
      explanation: "Step 1: In diazotization, aniline is treated with sodium nitrite and excess hydrochloric acid at 0-5 °C (273-278 K):\nC₆H₅NH₂ + NaNO₂ + 2HCl --(273-278 K)--> C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O. (Statements i and iii are correct)\nStep 2: Arenediazonium salts are thermally unstable and decompose readily above 5 °C (278 K) to evolve nitrogen gas and form phenols. Hence, strict temperature control at 0-5 °C is mandatory. (Statement ii is correct)\nStep 3: Therefore, all statements (i), (ii), and (iii) are correct.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 77 Part 3 questions (25 questions)...');
    
    for (const item of part3Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Set 77 Part 3 questions updated successfully!');
  } catch (err) {
    console.error('Error in Set 77 Part 3 update:', err);
  }
}

run();
