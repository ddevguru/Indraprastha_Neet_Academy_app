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
    id: 1199,
    data: {
      question: "What is the correct order of reactivity towards E2 dehydrohalogenation when the following alkyl bromides are treated with alcoholic KOH?\n(I) 2-Bromo-2-methylpropane (tert-butyl bromide)\n(II) 2-Bromopropane (isopropyl bromide)\n(III) 1-Bromopropane (n-propyl bromide)",
      option_a: "(I) > (II) > (III)",
      option_b: "(III) > (II) > (I)",
      option_c: "(II) > (I) > (III)",
      option_d: "(I) > (III) > (II)",
      "correct_option": "A",
      explanation: "Step 1: Mechanism of E2 elimination:\nThe E2 reaction occurs via a concerted bimolecular transition state where base removes a β-hydrogen simultaneously with the departure of the halide leaving group, developing partial double-bond character in the transition state.\n\nStep 2: Stability of alkene product and transition state:\nThe more alkyl-substituted and hyperconjugated the forming alkene, the lower the activation energy for the E2 transition state (Saytzeff's rule):\n- (I) 2-Bromo-2-methylpropane (3° alkyl halide) forms 2-methylpropene (a stable disubstituted alkene with 6 hyperconjugative α-hydrogens).\n- (II) 2-Bromopropane (2° alkyl halide) forms propene (a monosubstituted alkene with 3 α-hydrogens).\n- (III) 1-Bromopropane (1° alkyl halide) forms propene, but has higher steric barrier for base attack and slower rate.\n\nStep 3: General E2 reactivity order:\nFor dehydrohalogenation: 3° alkyl halide > 2° alkyl halide > 1° alkyl halide.\nThus, the order is (I) > (II) > (III).\n\nStep 4: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1200,
    data: {
      question: "When ethanol (CH₃CH₂OH) is treated with excess chlorine (Cl₂) in the presence of water, it undergoes sequential oxidation and α-chlorination to yield trichloroacetaldehyde (chloral, Compound A). What is the chemical formula of Compound A?",
      option_a: "CCl₃–CHO",
      option_b: "CCl₃–COOH",
      option_c: "CCl₃–CH₂OH",
      option_d: "CHCl₂–CHO",
      "correct_option": "A",
      explanation: "Step 1: Chlorine acts as both an oxidizing agent and a chlorinating agent:\n- Stage 1 (Oxidation):\nCH₃CH₂OH + Cl₂ → CH₃CHO + 2HCl\nEthanol is oxidized to acetaldehyde.\n\n- Stage 2 (Chlorination):\nAcetaldehyde has three enolizable α-hydrogens that are successively substituted by chlorine:\nCH₃CHO + 3Cl₂ → CCl₃–CHO + 3HCl\n\nStep 2: Identification of Compound A:\nThe final product formed is trichloroacetaldehyde, commonly known as chloral (CCl₃–CHO).\n\nStep 3: (Chloral further reacts with chlorobenzene in the presence of conc. H₂SO₄ to form the insecticide DDT).\n\nStep 4: Therefore, Compound A is CCl₃–CHO.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1201,
    data: {
      question: "Match the reaction of alkyl / aryl halides in Column-I with the corresponding named reaction in Column-II:\nColumn-I:\n(A) 2R–X + 2Na —(dry ether)→ R–R + 2NaX\n(B) R–X + NaI —(dry acetone)→ R–I + NaX\n(C) R–Cl + AgF —(heat)→ R–F + AgCl\n(D) C₆H₅–Br + 2Na + Br–C₆H₅ —(dry ether)→ C₆H₅–C₆H₅ + 2NaBr\nColumn-II:\n(P) Swarts reaction\n(Q) Fittig reaction\n(R) Wurtz reaction\n(S) Finkelstein reaction",
      option_a: "A–R, B–S, C–P, D–Q",
      option_b: "A–S, B–R, C–P, D–Q",
      option_c: "A–R, B–S, C–Q, D–P",
      option_d: "A–P, B–S, C–R, D–Q",
      "correct_option": "A",
      explanation: "Step 1: Match each reaction:\n- (A) 2R–X + 2Na → R–R + 2NaX is the Wurtz reaction for symmetrical alkane coupling → (R).\n- (B) Halide exchange of alkyl chloride/bromide with NaI in dry acetone is the Finkelstein reaction → (S).\n- (C) Synthesis of alkyl fluorides using metallic fluorides like AgF is the Swarts reaction → (P).\n- (D) Coupling of two aryl halides with sodium in dry ether to form diphenyl is the Fittig reaction → (Q).\n\nStep 2: Correct matching code: A–R, B–S, C–P, D–Q.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1202,
    data: {
      question: "What is the correct decreasing order of reactivity towards S_N2 nucleophilic substitution among the following isomeric butyl bromides?\n(1) 1-Bromobutane (n-butyl bromide)\n(2) 1-Bromo-2-methylpropane (isobutyl bromide)\n(3) 2-Bromobutane (sec-butyl bromide)",
      option_a: "1-Bromobutane > 1-Bromo-2-methylpropane > 2-Bromobutane",
      option_b: "2-Bromobutane > 1-Bromobutane > 1-Bromo-2-methylpropane",
      option_c: "1-Bromo-2-methylpropane > 1-Bromobutane > 2-Bromobutane",
      option_d: "2-Bromobutane > 1-Bromo-2-methylpropane > 1-Bromobutane",
      "correct_option": "A",
      explanation: "Step 1: Factor governing S_N2 reactivity:\nThe S_N2 mechanism proceeds via backside attack by the nucleophile on the carbon bearing the halogen. Thus, steric hindrance at the reaction center is the dominant rate-determining factor.\n\nStep 2: Comparison of steric environments:\n- 1-Bromobutane: Primary (1°) alkyl halide with an unbranched β-carbon (–CH₂–CH₂–Br). Minimal steric crowding at the backside → highest S_N2 rate.\n- 1-Bromo-2-methylpropane: Primary (1°) alkyl halide, but possessing branching at the adjacent β-carbon (–CH(CH₃)–CH₂–Br). The bulky methyl groups cause moderate steric hindrance → intermediate rate.\n- 2-Bromobutane: Secondary (2°) alkyl halide with two alkyl substituents directly attached to the α-carbon (–CH(CH₃)–Br). Severe steric crowding inhibits backside approach → lowest rate among the three.\n\nStep 3: Reactivity order: 1-Bromobutane > 1-Bromo-2-methylpropane > 2-Bromobutane.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1203,
    data: {
      question: "Given below are two statements:\nAssertion (A): Chloroform (CHCl₃) is always stored in tightly stoppered, dark amber-colored bottles filled completely up to the brim.\nReason (R): In the presence of sunlight and atmospheric oxygen, chloroform is slowly photo-oxidized to form a highly poisonous gas, phosgene (carbonyl chloride, COCl₂).\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Photo-oxidation of chloroform:\nWhen exposed to air and light, chloroform undergoes a free-radical oxidation:\n2CHCl₃ + O₂ —(light)→ 2COCl₂ (phosgene) + 2HCl\n\nStep 2: Toxicity of product:\nPhosgene (carbonyl chloride) is an intensely poisonous, asphyxiating gas that can cause fatal pulmonary edema.\n\nStep 3: Storage precautions:\nTo prevent light penetration and eliminate air headspace, chloroform is stored in dark amber bottles filled to the neck. Often, ~1% ethanol is added to convert any trace phosgene formed into harmless, non-toxic diethyl carbonate:\nCOCl₂ + 2C₂H₅OH → (C₂H₅O)₂C=O + 2HCl\n\nStep 4: Therefore, both (A) and (R) are true and (R) correctly explains (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1204,
    data: {
      question: "For a second-order nucleophilic substitution (S_N2) reaction of an alkyl halide with hydroxide ion:\nR–X + OH⁻ → R–OH + X⁻\nWhich of the following statements is correct?",
      option_a: "The reaction rate is independent of the concentration of OH⁻",
      option_b: "The reaction proceeds with complete retention of stereochemical configuration",
      option_c: "The reaction rate depends on the concentrations of both the alkyl halide and the hydroxide ion: Rate = k[R–X][OH⁻]",
      option_d: "A stable, long-lived planar carbocation intermediate is formed",
      "correct_option": "C",
      explanation: "Step 1: Kinetic law of S_N2 reactions:\nS_N2 stands for Substitution Nucleophilic Bimolecular. Both the alkyl halide substrate and the incoming nucleophile participate simultaneously in the single, rate-determining transition state.\nRate = k[R–X][OH⁻] (overall second order).\n\nStep 2: Stereochemical course:\nThe incoming nucleophile attacks from the side directly opposite to the leaving group (backside attack), leading to 100% inversion of configuration (Walden inversion).\n\nStep 3: Intermediate:\nNo carbocation intermediate is formed; it passes through a single, concerted pentacoordinate transition state.\n\nStep 4: Therefore, the rate depends on both [R–X] and [OH⁻].\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1205,
    data: {
      question: "Given below are two statements:\nStatement-I: Pure alkyl iodides (R–I) can be conveniently prepared by heating alcohols with potassium iodide (KI) in the presence of 95% orthophosphoric acid (H₃PO₄).\nStatement-II: Aryl iodides (Ar–I) can also be prepared with high yield by heating phenol with KI in 95% H₃PO₄.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "B",
      explanation: "Step 1: Evaluate Statement-I:\nWhen alcohols react with KI, sulfuric acid cannot be used because H₂SO₄ is a strong oxidizing agent that oxidizes HI to elemental I₂ (2HI + H₂SO₄ → I₂ + SO₂ + 2H₂O). Instead, non-oxidizing 95% orthophosphoric acid (H₃PO₄) is employed to generate HI in situ without oxidation, smoothly converting alcohols to alkyl iodides:\nR–OH + KI + H₃PO₄ → R–I + KH₂PO₄ + H₂O. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nIn phenol, the C–O bond possesses partial double-bond character due to resonance (+M effect) with the aromatic ring, making the C–O bond significantly shorter, stronger, and completely resistant to nucleophilic substitution by I⁻. Phenol does not react with KI/H₃PO₄. Statement-II is incorrect.\n\nStep 3: Therefore, Statement-I is correct but Statement-II is incorrect.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1206,
    data: {
      question: "Which of the following halide ions acts as the BEST (most reactive) leaving group in nucleophilic substitution reactions?",
      option_a: "F⁻",
      option_b: "Cl⁻",
      option_c: "Br⁻",
      option_d: "I⁻",
      "correct_option": "D",
      explanation: "Step 1: Criteria for a good leaving group:\nA good leaving group is one that can stably accommodate the pair of electrons it departs with. The weaker the basicity of a species, the better is its leaving group ability.\n\nStep 2: Basicity and bond strength trends:\n- Hydrohalic acid strength: HI > HBr > HCl > HF.\n- Conjugate base strength (basicity): I⁻ < Br⁻ < Cl⁻ < F⁻.\nIodide (I⁻) is the weakest base among the halides because its large ionic radius spreads the negative charge over a huge volume.\n- Furthermore, the C–I bond enthalpy (~234 kJ/mol) is much lower than C–Br (~293 kJ/mol), C–Cl (~351 kJ/mol), and C–F (~452 kJ/mol).\n\nStep 3: Consequently, alkyl iodides have the weakest C–X bond and release the most stable leaving group (I⁻), making I⁻ the best leaving group.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1207,
    data: {
      question: "When chlorobenzene is nitrated by heating with a mixture of concentrated HNO₃ and concentrated H₂SO₄, the major product obtained is:",
      option_a: "o-Nitrochlorobenzene",
      option_b: "m-Nitrochlorobenzene",
      option_c: "1-Chloro-4-nitrobenzene (p-nitrochlorobenzene)",
      option_d: "2,4,6-Trinitrochlorobenzene",
      "correct_option": "C",
      explanation: "Step 1: Directing influence of the chlorine substituent:\nIn chlorobenzene, the unshared electron pairs of chlorine delocalize into the aromatic π-system (+M effect), increasing the electron density selectively at the ortho and para positions relative to the meta positions. Hence, chlorine is ortho- and para-directing.\n\nStep 2: Product distribution:\nElectrophilic attack by the nitronium ion (NO₂⁺) occurs at both ortho and para positions to yield a mixture of:\n- 1-Chloro-2-nitrobenzene (o-nitrochlorobenzene, ~30%)\n- 1-Chloro-4-nitrobenzene (p-nitrochlorobenzene, ~70%)\n\nStep 3: Major isomer:\nThe para-isomer is the major product because steric hindrance between the bulky chlorine atom and the incoming NO₂⁺ group at the adjacent ortho position disfavors ortho-attack.\n\nStep 4: Therefore, 1-chloro-4-nitrobenzene is the major product.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1208,
    data: {
      question: "Among the three isomeric dichlorobenzenes (ortho, meta, and para), which isomer has the highest melting point?",
      option_a: "o-Dichlorobenzene",
      option_b: "m-Dichlorobenzene",
      option_c: "p-Dichlorobenzene",
      option_d: "All three have identical melting points",
      "correct_option": "C",
      explanation: "Step 1: Melting point values of dichlorobenzene isomers:\n- o-Dichlorobenzene: Melting point = 256 K (-17 °C)\n- m-Dichlorobenzene: Melting point = 249 K (-24 °C)\n- p-Dichlorobenzene: Melting point = 326 K (+53 °C)\n\nStep 2: Origin of higher melting point in p-isomer:\np-Dichlorobenzene has a centrosymmetric, highly symmetrical molecular shape with zero net dipole moment. In the solid crystal state, these symmetrical molecules pack much more closely and uniformly into the crystal lattice compared to the less symmetrical ortho and meta isomers.\n\nStep 3: Stronger lattice energy:\nTight crystal packing maximizes intermolecular attractive forces, requiring significantly greater thermal energy to break down the solid lattice during fusion.\n\nStep 4: Therefore, p-dichlorobenzene has the highest melting point.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1209,
    data: {
      question: "Which of the following haloalkane reactions does NOT give the expected nucleophilic substitution product under normal conditions?",
      option_a: "CH₃CH₂Br + KCN (alc.) → CH₃CH₂CN",
      option_b: "CH₃CH₂Br + AgCN (alc.) → CH₃CH₂NC",
      option_c: "CH₂=CH–Cl + aqueous NaOH (at room temperature) → CH₂=CH–OH",
      option_d: "CH₃CH₂Br + KNO₂ (alc.) → CH₃CH₂ONO",
      "correct_option": "C",
      explanation: "Step 1: Analyze vinyl chloride (CH₂=CH–Cl):\nIn vinyl chloride, the lone pair on chlorine enters into resonance with the adjacent carbon-carbon double bond:\nCH₂=CH–Cl ↔ ⁻CH₂–CH=Cl⁺\n\nStep 2: Consequence of resonance:\n- The C–Cl bond acquires partial double-bond character, making it shorter (1.69 Å vs 1.77 Å in ethyl chloride) and far stronger.\n- The carbon atom is sp² hybridized, which is more electronegative than sp³ carbon, holding the chlorine tightly.\n\nStep 3: Reactivity:\nDue to these factors, vinyl chloride is extraordinarily inert and does NOT undergo nucleophilic substitution with aqueous NaOH under ordinary conditions.\n\nStep 4: Therefore, reaction (C) does not take place under normal conditions.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1210,
    data: {
      question: "Which of the following organic halides is completely inert towards BOTH S_N1 and S_N2 nucleophilic substitution reactions under normal conditions?",
      option_a: "Vinyl chloride (CH₂=CH–Cl)",
      option_b: "Chlorobenzene (C₆H₅–Cl)",
      option_c: "1-Bromobicyclo[2.2.1]heptane (a bridgehead halide)",
      option_d: "All of the above",
      "correct_option": "D",
      explanation: "Step 1: Why vinyl and aryl halides fail S_N1 and S_N2:\n- S_N2 is impossible because backside attack is geometrically blocked by the aromatic ring / alkene π-cloud and electrostatic repulsion from π-electrons.\n- S_N1 is impossible because dissociation would produce an extremely unstable sp-hybridized phenyl/vinyl cation.\n- Furthermore, partial double-bond character strengthens the C–X bond.\n\nStep 2: Why bridgehead halides fail S_N1 and S_N2:\n- S_N2 is impossible because the cage structure completely blocks the backside of the bridgehead carbon.\n- S_N1 is impossible because according to Bredt's rule, a bridgehead carbocation cannot attain the required planar geometry (sp²) due to geometric strain in the rigid bicyclic cage.\n\nStep 3: Therefore, all of vinyl halides, aryl halides, and bridgehead halides are inert towards both S_N1 and S_N2.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1211,
    data: {
      question: "The reaction of an alcohol with thionyl chloride (SOCl₂) in the presence of pyridine (Darzens procedure) is considered the BEST laboratory method for preparing alkyl chlorides because:",
      option_a: "It gives 100% inversion of configuration",
      option_b: "The byproducts formed (SO₂ and HCl) are gases and escape readily from the reaction mixture, leaving pure alkyl chloride",
      option_c: "It does not require any heat or catalyst",
      option_d: "It works equally well for preparing aryl chlorides from phenols",
      "correct_option": "B",
      explanation: "Step 1: Reaction equation:\nR–OH + SOCl₂ —(pyridine)→ R–Cl + SO₂ ↑ + HCl ↑\n\nStep 2: Separation and purity:\nBoth byproducts of the reaction, sulfur dioxide (SO₂) and hydrogen chloride (HCl), are gases under the reaction conditions. Pyridine traps the acidic HCl as pyridinium chloride, while SO₂ gas simply bubbles out of the reaction flask.\n\nStep 3: This self-purification eliminates the need for tedious purification and extraction steps, yielding nearly pure alkyl chloride with excellent yield.\n\nStep 4: Therefore, the gaseous nature of byproducts makes it the best method.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1212,
    data: {
      question: "Which of the following compounds is classified as a VINYLIC halide?",
      option_a: "3-Chloroprop-1-ene (allyl chloride)",
      option_b: "1-Chlorocyclohex-1-ene",
      option_c: "Benzyl chloride",
      option_d: "2-Bromobutane",
      "correct_option": "B",
      explanation: "Step 1: Definition of a vinylic halide:\nA vinylic halide is a compound in which the halogen atom is bonded directly to an sp²-hybridized carbon atom belonging to a carbon–carbon double bond (C=C–X).\n\nStep 2: Analyze the given compounds:\n- Allyl chloride (CH₂=CH–CH₂Cl): Halogen is bonded to an sp³ carbon adjacent to a double bond → Allylic halide.\n- 1-Chlorocyclohex-1-ene: Halogen is directly attached to the sp² alkene carbon of the cyclohexene ring → Vinylic halide.\n- Benzyl chloride (C₆H₅–CH₂Cl): Halogen is on an sp³ carbon attached to an aromatic ring → Benzylic halide.\n- 2-Bromobutane: Alkyl halide.\n\nStep 3: Therefore, 1-chlorocyclohex-1-ene is a vinylic halide.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1213,
    data: {
      question: "In nucleophilic aromatic substitution (S_NAr / addition-elimination mechanism) of aryl halides, which substituent G on the benzene ring at the ortho/para position provides the FASTEST rate of reaction?",
      option_a: "–CH₃",
      option_b: "–NH₂",
      option_c: "–NO₂",
      option_d: "–H",
      "correct_option": "C",
      explanation: "Step 1: Mechanism of S_NAr:\nThe rate-determining step is the attack of the nucleophile on the carbon bearing the leaving group, generating a resonance-stabilized carbanion intermediate (Meisenheimer complex).\n\nStep 2: Stabilization of Meisenheimer complex:\nStrong electron-withdrawing groups with -M and -I effects, such as the nitro group (–NO₂), withdraw negative charge from the aromatic ring, dramatically stabilizing the negative charge on ortho and para positions of the Meisenheimer intermediate.\n\nStep 3: Electron-donating groups like –NH₂ (+M) and –CH₃ (+I) destabilize the anionic intermediate, slowing down the reaction.\n\nStep 4: Therefore, the reaction rate is fastest when G is –NO₂.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1214,
    data: {
      question: "In a polar protic solvent such as water, what is the correct order of nucleophilicity among the halide anions?",
      option_a: "F⁻ > Cl⁻ > Br⁻ > I⁻",
      option_b: "I⁻ > Br⁻ > Cl⁻ > F⁻",
      option_c: "Cl⁻ > Br⁻ > I⁻ > F⁻",
      option_d: "Br⁻ > I⁻ > Cl⁻ > F⁻",
      "correct_option": "B",
      explanation: "Step 1: Effect of polar protic solvents (e.g., H₂O):\nPolar protic solvents possess hydrogen atoms bonded to highly electronegative oxygen atoms, enabling strong hydrogen bonding with anions.\n\nStep 2: Solvation of halide ions:\nThe small fluoride ion (F⁻) has a very high charge density, forming an exceptionally tight and bulky hydration shell of water molecules. This strong solvation cage severely impedes its lone pairs from attacking an electrophilic carbon.\nIn contrast, the large iodide ion (I⁻) has a diffused charge, experiences weak hydrogen bonding with water, and is easily desolvated.\n\nStep 3: Polarizability:\nIodide is also much more polarizable than fluoride, allowing its electron cloud to distort easily to begin bond formation with the carbon atom.\n\nStep 4: Therefore, in water, nucleophilicity follows: I⁻ > Br⁻ > Cl⁻ > F⁻.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1215,
    data: {
      question: "When optically pure (R)-2-chlorobutane undergoes solvolysis by heating in pure water via an S_N1 mechanism, what is the stereochemical nature of the resulting butan-2-ol?",
      option_a: "Exclusively (R)-butan-2-ol with 100% retention",
      option_b: "Exclusively (S)-butan-2-ol with 100% inversion",
      option_c: "A racemic mixture of (R)- and (S)-butan-2-ol with partial net inversion (optically inactive or slightly levorotatory/dextrorotatory)",
      option_d: "1-Butanol via complete elimination",
      "correct_option": "C",
      explanation: "Step 1: Rate-determining step of S_N1:\nThe C–Cl bond heterolytically cleaves to produce an sp²-hybridized, trigonal planar secondary carbocation: [CH₃–CH⁺–CH₂CH₃].\n\nStep 2: Attack of nucleophile:\nThe planar carbocation has an empty p-orbital perpendicular to the molecular plane. A water molecule can attack with equal probability from the front face (leading to retention of configuration) or from the back face (leading to inversion of configuration).\n\nStep 3: Outcome:\nAttack from both faces yields an equimolar mixture of (R)-butan-2-ol and (S)-butan-2-ol (racemization). In practice, slight shielding by the departing chloride leaving group often causes a minor excess of inversion over retention.\n\nStep 4: Therefore, it yields a racemic mixture of (±)-butan-2-ol.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1216,
    data: {
      question: "Which of the following statements regarding the physical properties of haloalkanes is INCORRECT?",
      option_a: "Density of monohaloalkanes increases with increasing atomic weight of the halogen: R–Cl < R–Br < R–I",
      option_b: "Among isomeric alkyl halides, branching of the carbon chain increases the boiling point (e.g., tert-butyl bromide boils higher than n-butyl bromide)",
      option_c: "Haloalkanes are only very slightly soluble in water because they cannot form effective hydrogen bonds with water molecules",
      option_d: "For a given alkyl group, boiling points decrease in the order: R–I > R–Br > R–Cl > R–F",
      "correct_option": "B",
      explanation: "Step 1: Analyze statement (B):\nAs branching increases, the molecule adopts a more compact, spherical shape. This reduces the total surface area of contact between adjacent molecules, thereby decreasing the magnitude of intermolecular London dispersion forces.\nConsequently, branching DECREASES the boiling point:\nBoiling point: n-butyl bromide (375 K) > isobutyl bromide (364 K) > sec-butyl bromide (364 K) > tert-butyl bromide (346 K).\nHence, statement (B) stating that tert-butyl bromide has a higher boiling point is INCORRECT.\n\nStep 2: Statements (A), (C), and (D) are all established facts.\n\nStep 3: Therefore, Option (B) is the incorrect statement.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1217,
    data: {
      question: "Which of the following alkyl halides undergoes S_N1 solvolysis at the FASTEST rate?",
      option_a: "Benzyl bromide (C₆H₅CH₂Br)",
      option_b: "tert-Butyl bromide ((CH₃)₃CBr)",
      option_c: "Triphenylmethyl bromide ((C₆H₅)₃CBr)",
      option_d: "Isopropyl bromide ((CH₃)₂CHBr)",
      "correct_option": "C",
      explanation: "Step 1: The rate of an S_N1 reaction is directly proportional to the thermodynamic stability of the carbocation formed in the rate-determining ionization step.\n\nStep 2: Compare carbocation stabilities:\n- Isopropyl bromide forms (CH₃)₂CH⁺ (2° carbocation, 6 α-hydrogens).\n- tert-Butyl bromide forms (CH₃)₃C⁺ (3° carbocation, 9 α-hydrogens).\n- Benzyl bromide forms C₆H₅CH₂⁺ (resonance-stabilized over 1 phenyl ring).\n- Triphenylmethyl bromide forms the triphenylmethyl carbocation, (C₆H₅)₃C⁺ (trityl cation). In this cation, the positive charge is extensively delocalized across three aromatic benzene rings over a total of 10 resonance contributors, providing exceptional resonance stabilization.\n\nStep 3: Due to this extraordinary stability, triphenylmethyl bromide ionizes almost instantaneously, reacting at the fastest rate.\n\nStep 4: Therefore, Option (C) is the correct answer.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1218,
    data: {
      question: "Assertion (A): Dehydrohalogenation of 2-bromobutane with alcoholic KOH yields but-2-ene as the major product (~80%) and but-1-ene as the minor product (~20%).\nReason (R): According to Saytzeff's rule, in dehydrohalogenation reactions, the preferred product is the more highly substituted alkene because it is thermodynamically more stable due to greater hyperconjugation.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Elimination reaction of 2-bromobutane:\nCH₃–CH₂–CH(Br)–CH₃ + alc. KOH —(heat)→\n- Path a: Elimination of β-hydrogen from C-3 gives but-2-ene (CH₃–CH=CH–CH₃, 80% major).\n- Path b: Elimination of β-hydrogen from C-1 gives but-1-ene (CH₃–CH₂–CH=CH₂, 20% minor).\nAssertion (A) is true.\n\nStep 2: Saytzeff's rule and stability:\nAlexander Saytzeff formulated that the alkene with the greater number of alkyl substituents attached to the double-bonded carbons predominates. But-2-ene is a disubstituted alkene with 6 hyperconjugative α-hydrogens, whereas but-1-ene is monosubstituted with only 2 α-hydrogens. The transition state leading to but-2-ene is lower in free energy because of this hyperconjugative stabilization. Reason (R) is true and correctly explains (A).\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 73 Part 1 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 73 Part 1 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
