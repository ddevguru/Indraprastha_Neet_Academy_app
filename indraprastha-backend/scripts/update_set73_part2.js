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
    id: 1219,
    data: {
      question: "Match the reaction of bromoethane in Column-I with the principal organic functional group formed in Column-II:\nColumn-I:\n(A) CH₃CH₂Br + aqueous KOH —(heat)→\n(B) CH₃CH₂Br + alcoholic KCN —(heat)→\n(C) CH₃CH₂Br + alcoholic AgCN —(heat)→\n(D) CH₃CH₂Br + sodium ethoxide (NaOCH₂CH₃) —(heat)→\nColumn-II:\n(P) Alkyl isocyanide (Isonitrile)\n(Q) Alcohol\n(R) Ether (Williamson synthesis)\n(S) Alkyl cyanide (Nitrile)",
      option_a: "A–Q, B–S, C–P, D–R",
      option_b: "A–P, B–S, C–Q, D–R",
      option_c: "A–Q, B–P, C–S, D–R",
      option_d: "A–S, B–Q, C–P, D–R",
      "correct_option": "A",
      explanation: "Step 1: Match each reaction:\n- (A) CH₃CH₂Br + aq. KOH yields ethanol (alcohol) via nucleophilic substitution → (Q).\n- (B) KCN is predominantly ionic (K⁺ and :C≡N:⁻). Attack occurs primarily through the carbon atom, yielding ethyl cyanide (propanenitrile) → (S).\n- (C) AgCN is predominantly covalent with silver bonded to carbon (Ag–C≡N:). Attack occurs through the unshared electron pair of nitrogen, yielding ethyl isocyanide → (P).\n- (D) Reaction with sodium ethoxide yields diethyl ether via Williamson ether synthesis → (R).\n\nStep 2: Correct matching code: A–Q, B–S, C–P, D–R.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1220,
    data: {
      question: "Match the commercially important polyhalogen compound in Column-I with its primary industrial application in Column-II:\nColumn-I:\n(A) Dichlorodifluoromethane (Freon-12, CCl₂F₂)\n(B) Triiodomethane (Iodoform, CHI₃)\n(C) Dichlorodiphenyltrichloroethane (p,p'-DDT)\n(D) Tetrachloromethane (Carbon tetrachloride, CCl₄)\nColumn-II:\n(P) Fire extinguisher under the trade name Pyrene\n(Q) Non-biodegradable contact insecticide\n(R) Aerosol propellant and refrigerant in air conditioning\n(S) Antiseptic due to slow liberation of elemental iodine",
      option_a: "A–R, B–S, C–Q, D–P",
      option_b: "A–R, B–P, C–S, D–Q",
      option_c: "A–S, B–R, C–Q, D–P",
      option_d: "A–P, B–S, C–Q, D–R",
      "correct_option": "A",
      explanation: "Step 1: Match each polyhalogen compound:\n- (A) Freon-12 (CCl₂F₂) is chemically unreactive, non-toxic, and non-corrosive, used extensively as a refrigerant and aerosol propellant → (R).\n- (B) Iodoform (CHI₃) was traditionally used as a mild medicinal antiseptic due to its slow decomposition releasing free elemental iodine → (S).\n- (C) p,p'-DDT is a persistent organochlorine pesticide widely employed as a contact insecticide against mosquitoes and crop pests → (Q).\n- (D) Carbon tetrachloride (CCl₄) is a non-flammable volatile liquid used historically as an industrial solvent and fire extinguisher under the brand Pyrene → (P).\n\nStep 2: Correct matching code: A–R, B–S, C–Q, D–P.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1221,
    data: {
      question: "Match the reaction mechanism in Column-I with its characteristic stereochemical or kinetic feature in Column-II:\nColumn-I:\n(A) S_N2 mechanism\n(B) S_N1 mechanism\n(C) E2 elimination\n(D) E1 elimination\nColumn-II:\n(P) Two-step mechanism via a carbocation intermediate, leading to racemization\n(Q) Concerted single-step mechanism with 100% Walden inversion of configuration\n(R) Anti-periplanar coplanar transition state following Saytzeff's rule\n(S) Two-step unimolecular elimination without requiring a strong base",
      option_a: "A–Q, B–P, C–R, D–S",
      option_b: "A–P, B–Q, C–R, D–S",
      option_c: "A–Q, B–R, C–P, D–S",
      option_d: "A–R, B–P, C–Q, D–S",
      "correct_option": "A",
      explanation: "Step 1: Match each mechanistic pathway:\n- (A) S_N2 is a concerted bimolecular pathway involving backside nucleophilic attack, resulting in complete Walden inversion of stereochemical configuration → (Q).\n- (B) S_N1 proceeds via a planar carbocation intermediate that can be attacked from either face, yielding a racemic mixture → (P).\n- (C) E2 occurs via an anti-periplanar transition state where β-H and the leaving group are in the same plane at 180°, predominantly yielding the Saytzeff alkene → (R).\n- (D) E1 is a two-step unimolecular elimination where carbocation formation is rate-determining, followed by base loss of H⁺ → (S).\n\nStep 2: Correct matching code: A–Q, B–P, C–R, D–S.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1222,
    data: {
      question: "Match the coupling reaction of organohalides in Column-I with its appropriate description in Column-II:\nColumn-I:\n(A) Wurtz reaction\n(B) Fittig reaction\n(C) Wurtz-Fittig reaction\n(D) Ullmann reaction\nColumn-II:\n(P) Reaction of an aryl halide with copper powder at high temperature to give biaryls\n(Q) Reaction of an alkyl halide with sodium metal in dry ether to form symmetrical higher alkanes\n(R) Reaction of an equimolar mixture of an alkyl halide and an aryl halide with sodium in dry ether to give alkylarenes\n(S) Reaction of two moles of an aryl halide with sodium metal in dry ether to form diaryls",
      option_a: "A–Q, B–S, C–R, D–P",
      option_b: "A–Q, B–R, C–S, D–P",
      option_c: "A–S, B–Q, C–R, D–P",
      option_d: "A–P, B–S, C–R, D–Q",
      "correct_option": "A",
      explanation: "Step 1: Match each named reaction:\n- (A) 2R–X + 2Na → R–R + 2NaX is the Wurtz reaction for symmetrical alkanes → (Q).\n- (B) 2Ar–X + 2Na → Ar–Ar + 2NaX is the Fittig reaction for biaryls → (S).\n- (C) Ar–X + R–X + 2Na → Ar–R + 2NaX is the Wurtz-Fittig reaction for alkylated benzenes → (R).\n- (D) 2Ar–I + Cu (powder) —(heat)→ Ar–Ar + CuI₂ is the classical Ullmann reaction → (P).\n\nStep 2: Correct matching code: A–Q, B–S, C–R, D–P.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1223,
    data: {
      question: "Match the halogenated organic compound in Column-I with its systematic classification in Column-II:\nColumn-I:\n(A) CH₂=CH–Cl\n(B) CH₂=CH–CH₂–Br\n(C) C₆H₅–CH₂–Cl\n(D) C₆H₅–Br\nColumn-II:\n(P) Benzylic halide\n(Q) Aryl halide\n(R) Vinylic halide\n(S) Allylic halide",
      option_a: "A–R, B–S, C–P, D–Q",
      option_b: "A–S, B–R, C–P, D–Q",
      option_c: "A–R, B–P, C–S, D–Q",
      option_d: "A–P, B–S, C–R, D–Q",
      "correct_option": "A",
      explanation: "Step 1: Match each structure:\n- (A) CH₂=CH–Cl: Halogen attached directly to sp² carbon of C=C → Vinylic halide (R).\n- (B) CH₂=CH–CH₂–Br: Halogen attached to sp³ carbon adjacent to C=C → Allylic halide (S).\n- (C) C₆H₅–CH₂–Cl: Halogen attached to sp³ carbon adjacent to an aromatic ring → Benzylic halide (P).\n- (D) C₆H₅–Br: Halogen attached directly to an sp² carbon of an aromatic benzene ring → Aryl halide (Q).\n\nStep 2: Correct matching code: A–R, B–S, C–P, D–Q.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1224,
    data: {
      question: "Match the stereochemical term in Column-I with its correct defining characteristic in Column-II:\nColumn-I:\n(A) Enantiomers\n(B) Diastereomers\n(C) Meso compound\n(D) Racemic mixture\nColumn-II:\n(P) Stereoisomers that are not mirror images of each other\n(Q) An equimolar mixture of two enantiomers exhibiting zero net optical rotation due to external compensation\n(R) Non-superimposable mirror-image stereoisomers having identical physical properties except the sign of optical rotation\n(S) An optically inactive stereoisomer possessing chiral centers but containing an internal plane or center of symmetry",
      option_a: "A–R, B–P, C–S, D–Q",
      option_b: "A–R, B–S, C–P, D–Q",
      option_c: "A–P, B–R, C–S, D–Q",
      option_d: "A–S, B–P, C–R, D–Q",
      "correct_option": "A",
      explanation: "Step 1: Match stereochemical terms:\n- (A) Enantiomers: Non-superimposable mirror images; rotate plane-polarized light in equal and opposite directions → (R).\n- (B) Diastereomers: Stereoisomers that are not mirror images of each other; possess different physical and chemical properties → (P).\n- (C) Meso compound: Achiral diastereomer containing multiple chiral centers neutralized by an internal mirror plane (internal compensation) → (S).\n- (D) Racemic mixture: Equimolar 50:50 mixture of d- and l-enantiomers having zero net rotation (external compensation) → (Q).\n\nStep 2: Correct matching code: A–R, B–P, C–S, D–Q.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1225,
    data: {
      question: "Match the alkyl halide in Column-I with its primary mechanism of nucleophilic substitution in Column-II:\nColumn-I:\n(A) (CH₃)₃C–Br (tert-butyl bromide) in polar protic solvent (H₂O)\n(B) CH₃–I (methyl iodide) with sodium methoxide in methanol\n(C) CH₃CH₂–Br with dilute aqueous sodium hydroxide\n(D) (C₆H₅)₃C–Cl (trityl chloride) in aqueous acetone\nColumn-II:\n(P) Pure S_N2 mechanism\n(Q) Predominantly S_N2 mechanism\n(R) Pure S_N1 mechanism via a planar tertiary carbocation\n(S) Extremely fast S_N1 mechanism via a resonance-stabilized triaryl carbocation",
      option_a: "A–R, B–P, C–Q, D–S",
      option_b: "A–P, B–R, C–Q, D–S",
      option_c: "A–R, B–Q, C–P, D–S",
      option_d: "A–S, B–P, C–Q, D–R",
      "correct_option": "A",
      explanation: "Step 1: Match each substrate:\n- (A) (CH₃)₃C–Br is 3° and highly sterically hindered. In polar protic solvent, it reacts purely by S_N1 via (CH₃)₃C⁺ → (R).\n- (B) CH₃–I is completely unhindered and reacts with strong nucleophile CH₃O⁻ purely by S_N2 → (P).\n- (C) CH₃CH₂–Br is a 1° unhindered alkyl halide reacting predominantly by S_N2 with OH⁻ → (Q).\n- (D) (C₆H₅)₃C–Cl ionizes almost instantaneously to the exceptionally resonance-stabilized trityl cation, reacting purely via ultra-fast S_N1 → (S).\n\nStep 2: Correct matching code: A–R, B–P, C–Q, D–S.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1226,
    data: {
      question: "Which of the following organic halides will readily react with alcoholic potassium cyanide (KCN) via an S_N2 pathway to yield the corresponding alkyl/allyl/benzyl cyanide?\n(A) Chlorobenzene\n(B) Allyl bromide (CH₂=CH–CH₂Br)\n(C) Vinyl chloride (CH₂=CHCl)\n(D) Benzyl bromide (C₆H₅CH₂Br)",
      option_a: "(A) and (C) only",
      option_b: "(B) and (D) only",
      option_c: "(A), (B), and (C)",
      option_d: "(B), (C), and (D)",
      "correct_option": "B",
      explanation: "Step 1: Reactivity of aryl and vinyl halides:\nIn chlorobenzene and vinyl chloride, the halogen lone pair is delocalized into the adjacent π-system, imparting partial double-bond character to the C–Cl bond. Furthermore, the sp² carbon holds the chlorine tightly, and backside attack is sterically and electrostatically blocked. Consequently, aryl and vinyl halides do NOT undergo S_N2 substitution with KCN.\n\nStep 2: Reactivity of allylic and benzylic halides:\nAllyl bromide and benzyl bromide are primary halides with an adjacent π-bond. The transition state of S_N2 attack is strongly stabilized by overlap with the adjacent p/π-orbitals of the double bond or aromatic ring, making them exceptionally reactive towards nucleophilic displacement by CN⁻ to produce allyl cyanide and benzyl cyanide.\n\nStep 3: Therefore, (B) and (D) readily yield cyanides.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1227,
    data: {
      question: "Which of the following chemical reactions proceed via a carbon free-radical intermediate?\n(1) Free-radical chlorination of methane in the presence of ultraviolet light (hν)\n(2) Addition of hydrogen bromide (HBr) to propene in the presence of benzoyl peroxide (peroxide effect)\n(3) S_N2 hydrolysis of bromoethane with aqueous NaOH",
      option_a: "(1) and (2) only",
      option_b: "(2) and (3) only",
      option_c: "(1) and (3) only",
      option_d: "(1), (2), and (3)",
      "correct_option": "A",
      explanation: "Step 1: Analyze reaction (1):\nPhotochemical chlorination of methane occurs via a homolytic free-radical chain mechanism involving chlorine radicals (Cl•) and methyl radicals (•CH₃). (Proceeds via carbon free radical)\n\nStep 2: Analyze reaction (2):\nIn the presence of organic peroxides, HBr adds to alkenes via a free-radical mechanism (Kharasch effect) involving bromine radicals (Br•) and a secondary carbon radical (CH₃–•CH–CH₂Br) that dictates anti-Markovnikov regioselectivity. (Proceeds via carbon free radical)\n\nStep 3: Analyze reaction (3):\nS_N2 hydrolysis is a polar, heterolytic concerted substitution where OH⁻ attacks backside with simultaneous departure of Br⁻. No free-radical intermediate is involved.\n\nStep 4: Therefore, only reactions (1) and (2) proceed via carbon free radicals.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1228,
    data: {
      question: "Given below are two statements regarding the elimination reaction of 2-bromopentane:\nStatement-I: When 2-bromopentane is heated with alcoholic KOH, pent-2-ene is obtained as the major product (~80%) and pent-1-ene as the minor product (~20%).\nStatement-II: In dehydrohalogenation reactions, Saytzeff's rule states that the preferred alkene product is always the one that has the greater number of alkyl substituents attached to the double-bonded carbon atoms.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nHeating 2-bromopentane with alc. KOH removes HBr:\nCH₃–CH₂–CH₂–CH(Br)–CH₃ —(alc. KOH, heat)→\n- Elimination from C-3 gives pent-2-ene (CH₃–CH₂–CH=CH–CH₃, disubstituted alkene, 80% major).\n- Elimination from C-1 gives pent-1-ene (CH₃–CH₂–CH₂–CH=CH₂, monosubstituted alkene, 20% minor).\nThus, Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nAccording to Saytzeff's rule (Zaitsev's rule), base-induced dehydrohalogenation predominantly yields the more highly substituted alkene because greater hyperconjugation and alkyl substitution confer greater thermodynamic stability. Thus, Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1229,
    data: {
      question: "Given below are two statements regarding the isomeric dihalobenzenes:\nStatement-I: The boiling points of ortho, meta, and para isomers of dichlorobenzene are nearly identical, but the para-isomer has a significantly higher melting point than the ortho and meta isomers.\nStatement-II: The high melting point of the para-isomer is due to its symmetrical molecular geometry, which allows closer packing in the solid crystal lattice.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nThe boiling points of the three dichlorobenzene isomers are very close to one another (o-isomer: 453 K, m-isomer: 446 K, p-isomer: 448 K). However, the melting point of p-dichlorobenzene (326 K) is much higher than that of o-dichlorobenzene (256 K) and m-dichlorobenzene (249 K). Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\np-Dichlorobenzene is centrosymmetric with a linear Cl–C₆H₄–Cl axis. This high molecular symmetry enables the molecules to fit closely and snugly into the three-dimensional crystal lattice, maximizing intermolecular lattice interactions. Statement-II is correct and directly explains Statement-I.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1230,
    data: {
      question: "Given below are two statements regarding stereochemistry:\nStatement-I: Molecules that are non-superimposable on their mirror images are called chiral molecules, and this property is known as chirality.\nStatement-II: Any molecule that is superimposable on its mirror image is called a meso compound.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Statement-I is correct but Statement-II is incorrect",
      option_b: "Both Statement-I and Statement-II are correct",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nBy definition, an object or molecule that cannot be superimposed onto its mirror image is chiral (handed), and the phenomenon is called chirality. A chiral molecule lacks an alternating axis of symmetry. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nA molecule that is superimposable on its mirror image is simply defined as ACHIRAL. A meso compound is a specific subset of achiral molecules that contains two or more chiral stereocenters but is optically inactive due to an internal plane or center of symmetry (e.g., meso-tartaric acid). Simple achiral molecules like methane, ethanol, or chlorobenzene are NOT meso compounds. Statement-II is incorrect.\n\nStep 3: Therefore, Statement-I is correct but Statement-II is incorrect.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1231,
    data: {
      question: "Given below are two statements regarding the solubility of haloalkanes:\nStatement-I: Haloalkanes are very slightly soluble in water, but dissolve readily in typical non-polar or moderately polar organic solvents.\nStatement-II: In water, haloalkane molecules cannot form hydrogen bonds, and the new dipole-dipole attractions between haloalkanes and water are weaker than the strong hydrogen bonding network existing between water molecules.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nAlthough haloalkanes are polar compounds, they have very low solubility in water. In contrast, they dissolve easily in organic solvents like alcohol, ether, benzene, and chloroform. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nFor a haloalkane to dissolve in water, energy is required to overcome the strong hydrogen bonds between water molecules and dipole-dipole forces between alkyl halide molecules. When a haloalkane dissolves, the energy released from the new dipole-dipole interactions with water is insufficient to compensate for the disruption of water's hydrogen bonding network. In organic solvents, the new intermolecular attractions have similar strengths to the broken solvent-solvent interactions. Statement-II is correct and correctly explains Statement-I.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1232,
    data: {
      question: "Given below are two statements regarding the haloform / iodoform reaction:\nStatement-I: Acetaldehyde (ethanal) gives a positive iodoform test with alkaline sodium hypoiodite (I₂ + NaOH), forming a yellow precipitate of CHI₃.\nStatement-II: Only aldehydes and ketones having at least one methyl group directly attached to the carbonyl carbon atom (CH₃–C=O group), or secondary alcohols with a CH₃–CH(OH)– group, undergo the iodoform reaction.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nAcetaldehyde (CH₃CHO) contains the required terminal methyl carbonyl group (CH₃–C=O). On treatment with I₂ and NaOH, it is oxidized to sodium formate, and a characteristic yellow crystalline precipitate of triiodomethane (iodoform, CHI₃, mp ~119 °C) separates out:\nCH₃CHO + 3I₂ + 4NaOH → CHI₃ ↓ + HCOONa + 3NaI + 3H₂O.\nStatement-I is correct.\n\nStep 2: Evaluate Statement-II:\nThe iodoform reaction specifically tests for compounds containing the CH₃–C=O unit (methyl ketones and acetaldehyde) or compounds containing the CH₃–CH(OH)– group that can be oxidized in situ to a methyl ketone by hypoiodite. Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1233,
    data: {
      question: "Given below are two statements regarding halogen exchange reactions:\nStatement-I: In the Finkelstein reaction, alkyl iodides are prepared by treating alkyl chlorides or bromides with NaI in dry acetone, where precipitation of insoluble NaCl or NaBr drives the equilibrium forward by Le Chatelier's principle.\nStatement-II: In the Swarts reaction, alkyl fluorides are synthesized by heating alkyl chlorides or bromides in the presence of heavy metallic fluorides such as AgF, Hg₂F₂, CoF₃, or SbF₃.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nThe Finkelstein reaction involves halogen exchange in dry acetone:\nR–X + NaI —(dry acetone)→ R–I + NaX ↓ (where X = Cl, Br)\nSodium iodide is soluble in acetone, whereas NaCl and NaBr are sparingly soluble in acetone and precipitate out. According to Le Chatelier's principle, continuous removal of the precipitate drives the equilibrium in the forward direction. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nDirect fluorination of alkanes with F₂ is violently exothermic and explosive. The standard laboratory route to alkyl fluorides is the Swarts reaction, in which an alkyl bromide or chloride is heated with inorganic metallic fluorides such as AgF, Hg₂F₂, CoF₃, or SbF₃:\nR–Br + AgF → R–F + AgBr ↓. Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1234,
    data: {
      question: "Given below are two statements regarding electrophilic aromatic halogenation of arenes:\nStatement-I: Aryl chlorides and bromides are readily prepared by electrophilic aromatic substitution of arenes with Cl₂ and Br₂ in the dark in the presence of a Lewis acid catalyst such as anhydrous FeCl₃ or FeBr₃.\nStatement-II: Aromatic iodination with I₂ is a reversible reaction that requires the addition of an oxidizing agent (such as concentrated HNO₃ or HIO₃) to oxidize the by-product HI into I₂ and drive the reaction to completion.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nChlorination and bromination of benzene take place smoothly via electrophilic aromatic substitution (EAS) in the presence of Lewis acid catalysts (FeCl₃, AlCl₃), which polarize the halogen molecule to generate the active electrophile (Cl⁺ / Br⁺):\nC₆H₆ + Cl₂ —(FeCl₃)→ C₆H₅Cl + HCl. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nDirect iodination of benzene with I₂ is reversible because hydrogen iodide (HI) is a strong reducing agent that reduces iodobenzene back to benzene:\nC₆H₆ + I₂ ⇌ C₆H₅I + HI\nTo shift the equilibrium forward, an oxidizing acid like HNO₃ or HIO₃ is added to oxidize HI into I₂:\n5HI + HIO₃ → 3I₂ + 3H₂O. Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1235,
    data: {
      question: "Given below are two statements regarding the replacement of diazonium group in benzenediazonium salts:\nStatement-I: Replacement of the diazonium group by –Cl or –Br requires treatment with cuprous chloride (Cu₂Cl₂) or cuprous bromide (Cu₂Br₂) in the corresponding halogen acid (Sandmeyer reaction).\nStatement-II: Replacement of the diazonium group by iodine does NOT require any cuprous catalyst and is achieved simply by warming or shaking the aqueous diazonium salt solution with potassium iodide (KI).\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Sandmeyer reaction for –Cl and –Br:\nIntroduction of chlorine or bromine into the aromatic ring from benzenediazonium chloride requires copper(I) catalysts (Cu₂Cl₂/HCl or Cu₂Br₂/HBr):\nAr–N₂⁺Cl⁻ —(Cu₂Cl₂/HCl)→ Ar–Cl + N₂ ↑\nAr–N₂⁺Cl⁻ —(Cu₂Br₂/HBr)→ Ar–Br + N₂ ↑\nStatement-I is correct.\n\nStep 2: Synthesis of aryl iodides:\nIodide is a much stronger nucleophile and one-electron reducing agent than chloride or bromide. Consequently, the replacement of the diazonium group by iodine occurs smoothly without requiring any copper catalyst—simply shaking the diazonium salt with aqueous KI produces iodobenzene with high yield:\nAr–N₂⁺Cl⁻ + KI → Ar–I + KCl + N₂ ↑\nStatement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1236,
    data: {
      question: "Assertion (A): Thionyl chloride (SOCl₂) is the preferred reagent for converting alcohols into alkyl chlorides.\nReason (R): The gaseous by-products of the reaction, SO₂ and HCl, escape spontaneously from the reaction vessel, yielding pure alkyl chloride without complicated purification.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Chemical equation of Darzens reaction:\nR–OH + SOCl₂ —(pyridine)→ R–Cl + SO₂ ↑ + HCl ↑\n\nStep 2: Comparison with other reagents:\nWhen alcohols are treated with PCl₃ or PCl₅, the by-products formed are phosphorous acid (H₃PO₃) or phosphorus oxychloride (POCl₃), which are liquids requiring fractional distillation to separate from the alkyl chloride product.\nWith SOCl₂, both SO₂ and HCl are volatile gases that escape into the fume hood, leaving behind virtually pure alkyl chloride.\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1237,
    data: {
      question: "Assertion (A): The boiling points of alkyl chlorides, bromides, and iodides are considerably higher than those of the parent hydrocarbons of comparable carbon number.\nReason (R): Haloalkanes possess polar carbon–halogen bonds giving rise to dipole–dipole attractions, and the presence of heavy halogen atoms increases the molecular mass and the magnitude of London dispersion forces.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Intermolecular forces in haloalkanes vs. alkanes:\n- Parent alkanes are non-polar molecules held together purely by weak London dispersion forces.\n- Alkyl halides possess permanent C^(δ+)–X^(δ-) bond dipoles, resulting in significant dipole-dipole attractions.\n\nStep 2: Effect of molecular size and mass:\nHalogen atoms (Cl, Br, I) have much larger electron clouds and higher atomic weights than hydrogen. This markedly increases the polarizability of the molecule and the strength of van der Waals dispersion forces.\n\nStep 3: Consequence on boiling points:\nBecause both dipole-dipole attractions and London dispersion forces are much stronger in alkyl halides than in parent hydrocarbons, more thermal energy is required to vaporize them, giving them substantially higher boiling points.\n\nStep 4: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1238,
    data: {
      question: "Assertion (A): For a given alkyl group R, the boiling points of alkyl halides follow the decreasing order:\nR–I > R–Br > R–Cl > R–F\nReason (R): As the size and mass of the halogen atom increase from F to I, the magnitude of van der Waals dispersion forces increases significantly.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Assertion (A):\nFor a given alkyl group, boiling points decrease in the order R–I > R–Br > R–Cl > R–F. For example, for methyl halides: CH₃I (315 K) > CH₃Br (277 K) > CH₃Cl (249 K) > CH₃F (195 K). Assertion (A) is true.\n\nStep 2: Evaluate Reason (R):\nThe strength of London dispersion forces is directly proportional to the total number of electrons, the polarizability, and the molecular surface area of the molecule. Iodine has the largest atomic size and mass among the halogens, generating the strongest dispersion forces, which weaken progressively from I to Br to Cl to F. Reason (R) is true and correctly explains (A).\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1239,
    data: {
      question: "Assertion (A): Chlorobenzene is extremely unreactive towards nucleophilic substitution with aqueous NaOH under mild conditions, whereas chloroethane readily hydrolyzes.\nReason (R): In chlorobenzene, the lone pair of electrons on chlorine is delocalized over the benzene ring via resonance, imparting partial double-bond character to the C–Cl bond and making it shorter and stronger than in chloroethane.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Analyze Assertion (A):\nChloroethane (CH₃CH₂Cl) reacts readily with aqueous NaOH at 373 K to give ethanol via an S_N2 mechanism. In contrast, chlorobenzene does not react with aqueous NaOH under mild conditions; conversion to phenol requires extreme conditions (Dow's process: molten NaOH at 623 K and 300 atm pressure). Assertion (A) is true.\n\nStep 2: Analyze Reason (R):\nIn chlorobenzene, resonance delocalizes the chlorine lone pairs into the aromatic π-electron cloud. This imparts partial double-bond character to the C–Cl bond (bond length 1.69 Å vs. 1.78 Å in chloroethane). Furthermore, the carbon atom attached to chlorine is sp² hybridized (33.3% s-character) and more electronegative than the sp³ carbon (25% s-character) in chloroethane, binding the chlorine electron pair more tightly. Reason (R) is true and correctly explains (A).\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 73 Part 2 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 73 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
