const https = require('https');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const pyqsData = [
  {
    id: 2529,
    question: "CH₃-CH₂-CH(Cl)-CH₃ obtained by chlorination of n-butane will be: [AIPMT 2001]",
    optionA: "Meso form",
    optionB: "Racemic mixture",
    optionC: "d-form",
    optionD: "l-form",
    correctOption: "B",
    explanation: "During the free-radical chlorination of n-butane (CH₃-CH₂-CH₂-CH₃), abstraction of a secondary hydrogen atom by a chlorine radical gives a planar, sp²-hybridized secondary butyl free radical: CH₃-C•H-CH₂-CH₃.\nBecause the free radical intermediate is planar, attack of the chlorine molecule (Cl₂) can take place with equal probability from either the top face or the bottom face.\nAttack from one face yields (R)-2-chlorobutane, while attack from the opposite face yields (S)-2-chlorobutane in equal amounts (50% : 50%).\nAn equimolar mixture of enantiomers is optically inactive by external compensation and forms a racemic mixture (±).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Monochlorination of 2-methylbutane in the presence of sunlight produces an optically active monochloro derivative. Which of the following monochloro isomers contains a chiral centre and is formed as a racemic mixture?",
      option_a: "1-Chloro-2-methylbutane",
      option_b: "2-Chloro-2-methylbutane",
      option_c: "1-Chloro-3-methylbutane",
      option_d: "2,2-Dichlorobutane",
      correct_option: "A",
      explanation: "Monochlorination of 2-methylbutane at C-1 yields 1-chloro-2-methylbutane: Cl-CH₂-C*H(CH₃)-CH₂-CH₃.\nIn this compound, C-2 is bonded to four different groups: -H, -CH₃, -CH₂CH₃, and -CH₂Cl, making it a chiral carbon.\nSince chlorination at C-1 generates a chiral center from an achiral intermediate radical, it produces equal amounts of (R) and (S) enantiomers, yielding a racemic mixture.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2528,
    question: "An organic compound A (C₄H₉Cl) on reaction with Na/diethyl ether gives a hydrocarbon which on monochlorination gives only one chloro derivative. Then A is: [AIPMT 2001]",
    optionA: "tert-Butyl chloride",
    optionB: "sec-Butyl chloride",
    optionC: "Isobutyl chloride",
    optionD: "n-Butyl chloride",
    correctOption: "A",
    explanation: "In the Wurtz reaction, an alkyl halide (R-X) reacts with sodium metal in dry ether to yield a symmetrical alkane (R-R):\n2 R-Cl + 2 Na → R-R + 2 NaCl.\nWhen tert-butyl chloride, (CH₃)₃C-Cl, reacts with Na in dry ether, it couples to form 2,2,3,3-tetramethylbutane:\n2 (CH₃)₃C-Cl + 2 Na → (CH₃)₃C-C(CH₃)₃ + 2 NaCl.\nThe resulting hydrocarbon, 2,2,3,3-tetramethylbutane (hexamethylethane), has 18 equivalent primary hydrogen atoms on six identical methyl groups and no other hydrogens.\nConsequently, monochlorination of 2,2,3,3-tetramethylbutane can yield only one monochloro derivative, 1-chloro-2,2,3,3-tetramethylbutane.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An alkane (C₅H₁₂) gives only a single monochloro derivative upon photolytic monochlorination with Cl₂/hν. The alkane is:",
      option_a: "Neopentane (2,2-dimethylpropane)",
      option_b: "n-Pentane",
      option_c: "Isopentane (2-methylbutane)",
      option_d: "Cyclopentane",
      correct_option: "A",
      explanation: "Neopentane, (CH₃)₄C, has four equivalent methyl groups attached to a central quaternary carbon. All 12 hydrogen atoms are chemically and stereochemically equivalent.\nSubstitution of any one hydrogen atom by chlorine produces the identical isomer, 1-chloro-2,2-dimethylpropane (neopentyl chloride).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2527,
    question: "Reactivity order of halides for dehydrohalogenation is: [AIPMT 2002]",
    optionA: "R-F > R-Cl > R-Br > R-I",
    optionB: "R-I > R-Br > R-Cl > R-F",
    optionC: "R-I > R-Cl > R-Br > R-F",
    optionD: "R-F > R-I > R-Br > R-Cl",
    correctOption: "B",
    explanation: "Dehydrohalogenation of alkyl halides is an elimination (E2 or E1) reaction that involves the cleavage of the carbon-halogen (C-X) bond.\nThe rate of elimination depends directly on the leaving group ability of the halide ion (X⁻) and the bond dissociation energy of the C-X bond.\nAs the size of the halogen atom increases down the halogen group: F < Cl < Br < I, the C-X bond length increases and C-X bond strength decreases:\nC-I < C-Br < C-Cl < C-F.\nFurthermore, iodide (I⁻) is a larger, more polarizable ion and a much better leaving group than Br⁻, Cl⁻, and F⁻.\nHence, the order of reactivity for dehydrohalogenation is: R-I > R-Br > R-Cl > R-F.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following alkyl halides undergoes dehydrohalogenation at the fastest rate when heated with alcoholic KOH?",
      option_a: "CH₃-CH₂-CH₂-I",
      option_b: "CH₃-CH₂-CH₂-Br",
      option_c: "CH₃-CH₂-CH₂-Cl",
      option_d: "CH₃-CH₂-CH₂-F",
      correct_option: "A",
      explanation: "In the dehydrohalogenation (E2 elimination) of alkyl halides with alcoholic KOH, the leaving group ability of halides follows the order:\nI⁻ > Br⁻ > Cl⁻ > F⁻.\nBecause the C-I bond is the longest and weakest, CH₃-CH₂-CH₂-I undergoes dehydrohalogenation with the fastest rate.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2526,
    question: "Which of the following is least reactive in a nucleophilic substitution reaction? [AIPMT 2004]",
    optionA: "(CH₃)₃C-Cl",
    optionB: "CH₂=CHCl",
    optionC: "CH₃CH₂Cl",
    optionD: "CH₂=CHCH₂Cl",
    correctOption: "B",
    explanation: "In vinyl chloride (CH₂=CH-Cl), the lone pair of electrons on the chlorine atom is conjugated with the carbon-carbon double bond:\nCH₂=CH-C̈l: ↔ :⁻CH₂-CH=Cl⁺.\nDue to this resonance (+R effect), the carbon-chlorine bond acquires partial double bond character, making it shorter and significantly stronger than a normal C-Cl single bond.\nAdditionally, the carbon atom attached to chlorine is sp²-hybridized, with 33.3% s-character, making it more electronegative and holding the shared pair of electrons tightly.\nMoreover, loss of chloride would yield an extremely unstable vinyl cation (CH₂=CH⁺).\nConsequently, vinyl chloride is practically inert and least reactive towards nucleophilic substitution.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following halides is most inert towards nucleophilic substitution under ordinary reaction conditions?",
      option_a: "Chlorobenzene (C₆H₅Cl)",
      option_b: "Benzyl chloride (C₆H₅CH₂Cl)",
      option_c: "Allyl chloride (CH₂=CH-CH₂Cl)",
      option_d: "tert-Butyl chloride ((CH₃)₃C-Cl)",
      correct_option: "A",
      explanation: "In chlorobenzene, the lone pair of chlorine is in resonance with the π-electron system of the benzene ring, conferring partial double bond character to the C-Cl bond and resisting nucleophilic cleavage under ordinary conditions.\nBenzyl and allyl halides readily undergo nucleophilic substitution due to resonance stabilization of their carbocations, and tert-butyl chloride rapidly reacts via SN1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2525,
    question: "Which of the following undergoes nucleophilic substitution exclusively by SN1 mechanism? [AIPMT 2005]",
    optionA: "Ethyl chloride",
    optionB: "Isopropyl chloride",
    optionC: "Chlorobenzene",
    optionD: "Benzyl chloride",
    correctOption: "D",
    explanation: "In the SN1 mechanism, the rate-determining step is the unimolecular ionization of the alkyl halide to form a carbocation intermediate.\nBenzyl chloride (C₆H₅CH₂Cl) ionizes to form the benzyl carbocation (C₆H₅C⁺H₂), which is exceptionally stabilized by resonance with the aromatic ring through five contributing resonance structures.\nWhile primary alkyl halides typically undergo SN2 reactions, benzylic halides preferentially and rapidly react via the SN1 pathway because the resonance-stabilized benzyl cation forms very easily.\nEthyl chloride reacts almost exclusively via SN2, isopropyl chloride can undergo both SN1 and SN2, and chlorobenzene does not undergo nucleophilic substitution under normal conditions.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following alkyl halides undergoes hydrolysis most rapidly via an SN1 pathway?",
      option_a: "(C₆H₅)₃C-Cl",
      option_b: "(C₆H₅)₂CH-Cl",
      option_c: "C₆H₅CH₂-Cl",
      option_d: "CH₃CH₂Cl",
      correct_option: "A",
      explanation: "In an SN1 pathway, the rate of substitution is directly proportional to the stability of the carbocation intermediate.\nIonization of triphenylmethyl chloride, (C₆H₅)₃C-Cl, gives the triphenylmethyl carbocation (trityl cation), which is extraordinarily stable due to resonance delocalization of the positive charge across three benzene rings (10 resonance contributors).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2524,
    question: "Which of the following is not chiral? [AIPMT 2006]",
    optionA: "2-Hydroxypropanoic acid",
    optionB: "2-Butanol",
    optionC: "2,3-Dibromopentane",
    optionD: "3-Bromopentane",
    correctOption: "D",
    explanation: "A molecule is chiral if it contains at least one asymmetric (chiral) carbon atom bonded to four different groups and lacks an internal plane or center of symmetry.\nLet us inspect the carbon atoms in each option:\n1. 2-Hydroxypropanoic acid (lactic acid): CH₃-C*H(OH)-COOH (C-2 is bonded to -H, -OH, -CH₃, -COOH: 4 different groups, chiral).\n2. 2-Butanol: CH₃-C*H(OH)-CH₂CH₃ (C-2 is bonded to -H, -OH, -CH₃, -CH₂CH₃: 4 different groups, chiral).\n3. 2,3-Dibromopentane: CH₃-C*H(Br)-C*H(Br)-CH₂CH₃ (contains two chiral carbon atoms, chiral).\n4. 3-Bromopentane: CH₃-CH₂-CH(Br)-CH₂-CH₃. The central carbon (C-3) is bonded to -H, -Br, and two identical ethyl groups (-CH₂CH₃).\nSince C-3 is bonded to two identical groups, it is achiral (not chiral) and has a plane of symmetry.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following haloalkanes is optically inactive (achiral)?",
      option_a: "2-Chlorobutane",
      option_b: "2-Chloropropane",
      option_c: "1-Chloro-2-methylbutane",
      option_d: "3-Chlorohexane",
      correct_option: "B",
      explanation: "In 2-chloropropane, CH₃-CH(Cl)-CH₃, the central carbon is attached to two identical methyl groups (-CH₃, -CH₃), a chlorine atom (-Cl), and a hydrogen atom (-H).\nBecause it lacks an asymmetric carbon bonded to four distinct groups, it is achiral and optically inactive.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2523,
    question: "CH₃-CHCl-CH₂-CH₃ has a chiral centre. Which one of the following represents its R-configuration? [AIPMT 2007]",
    optionA: "Ethyl group top, H left, methyl right, Cl bottom",
    optionB: "Ethyl group top, Cl left, methyl right, H bottom",
    optionC: "Methyl group top, H left, Cl right, ethyl bottom",
    optionD: "Ethyl group top, methyl left, Cl right, H bottom",
    correctOption: "A",
    explanation: "According to the Cahn-Ingold-Prelog (CIP) priority rules for 2-chlorobutane at the chiral carbon C-2:\n- Priority 1: -Cl (atomic number = 17)\n- Priority 2: -CH₂CH₃ (ethyl carbon bonded to C, H, H)\n- Priority 3: -CH₃ (methyl carbon bonded to H, H, H)\n- Priority 4: -H (atomic number = 1)\nIn Fischer projection A:\n- Top = -CH₂CH₃ (Priority 2)\n- Bottom = -Cl (Priority 1)\n- Left = -H (Priority 4)\n- Right = -CH₃ (Priority 3)\nTracing priority from 1 → 2 → 3:\nFrom bottom (1) to top (2) to right (3) goes counter-clockwise.\nSince the lowest priority group (-H, priority 4) is on a horizontal bond, the apparent direction is reversed:\nCounter-clockwise with H on horizontal represents the (R)-configuration!\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "According to the Cahn-Ingold-Prelog (CIP) priority rules, what is the priority order of the following substituents attached to a chiral carbon: -OH, -CH₂OH, -CHO, -CH₃?",
      option_a: "-OH > -CHO > -CH₂OH > -CH₃",
      option_b: "-OH > -CH₂OH > -CHO > -CH₃",
      option_c: "-CHO > -OH > -CH₂OH > -CH₃",
      option_d: "-OH > -CHO > -CH₃ > -CH₂OH",
      correct_option: "A",
      explanation: "Comparing the directly attached atoms:\n- -OH: attached through Oxygen (atomic number 8), highest priority (1).\n- -CHO, -CH₂OH, -CH₃ are all attached through Carbon (atomic number 6).\nFor -CHO, C is bonded to (O, O, H) due to double bond.\nFor -CH₂OH, C is bonded to (O, H, H).\nFor -CH₃, C is bonded to (H, H, H).\nComparing second-level atoms: (O, O, H) > (O, H, H) > (H, H, H).\nThus, priority order is: -OH > -CHO > -CH₂OH > -CH₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2522,
    question: "In an SN2 substitution reaction of the type: R-Br + Cl⁻ → R-Cl + Br⁻ (in DMF), which one of the following has the highest relative rate? [AIPMT 2008]",
    optionA: "Neopentyl bromide",
    optionB: "Ethyl bromide (CH₃CH₂Br)",
    optionC: "n-Propyl bromide (CH₃CH₂CH₂Br)",
    optionD: "Isobutyl bromide",
    correctOption: "B",
    explanation: "The SN2 mechanism proceeds through a single concerted bimolecular step involving backside nucleophilic attack and the formation of a pentacoordinate transition state.\nThe rate of SN2 reactions is predominantly governed by steric hindrance around the carbon bearing the leaving group (α-carbon) as well as the adjacent β-carbon:\n- Methyl > 1° (unhindered) > 1° (β-branched) > 2° >> 3° / neopentyl (sterically blocked).\nAmong the given primary halides:\n- Ethyl bromide: CH₃CH₂Br (minimal steric hindrance at α and β carbons).\n- n-Propyl bromide: CH₃CH₂CH₂Br (slightly more hindrance due to ethyl group).\n- Isobutyl bromide: (CH₃)₂CHCH₂Br (β-branching slows down backside attack).\n- Neopentyl bromide: (CH₃)₃CCH₂Br (extremely crowded β-quaternary carbon, virtually unreactive in SN2).\nHence, ethyl bromide (CH₃CH₂Br) encounters the least steric hindrance and exhibits the highest relative rate.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following alkyl bromides reacts most rapidly with sodium iodide in acetone (Finkelstein reaction, SN2 mechanism)?",
      option_a: "CH₃-Br",
      option_b: "CH₃-CH₂-Br",
      option_c: "(CH₃)₂CH-Br",
      option_d: "(CH₃)₃C-Br",
      correct_option: "A",
      explanation: "The Finkelstein reaction proceeds via the SN2 mechanism.\nSteric hindrance around the reaction center decreases in the order: 3° > 2° > 1° > methyl.\nMethyl bromide (CH₃-Br) has no alkyl substituents on the carbon, providing the least steric hindrance and allowing the fastest backside attack by iodide ion.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2521,
    question: "Which of the following reactions is an example of nucleophilic substitution reaction? [AIPMT 2009]",
    optionA: "2RX + 2Na → R-R + 2NaX",
    optionB: "RX + H₂ → RH + HX",
    optionC: "RX + Mg → RMgX",
    optionD: "RX + KOH → ROH + KX",
    correctOption: "D",
    explanation: "In the reaction: R-X + KOH → R-OH + KX,\nThe hydroxide ion (OH⁻), a nucleophile containing a lone pair of electrons, attacks the partially positively charged carbon atom of the alkyl halide (R-X) and displaces the halide ion (X⁻), which acts as the leaving group.\nBecause an incoming nucleophile replaces an existing group, it is a classic nucleophilic substitution reaction (SN).\nIn contrast:\n- 2RX + 2Na → R-R + 2NaX is the Wurtz reaction (free-radical/reductive coupling).\n- RX + H₂ → RH + HX is a reduction reaction.\n- RX + Mg → RMgX is the formation of an organometallic Grignard reagent (oxidative addition).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The conversion of an alkyl halide to an ether by treatment with sodium alkoxide (Williamson synthesis) is an example of which type of reaction?",
      option_a: "Nucleophilic substitution (SN2)",
      option_b: "Electrophilic addition",
      option_c: "Electrophilic substitution",
      option_d: "Free radical elimination",
      correct_option: "A",
      explanation: "In Williamson ether synthesis: R-X + R'O⁻Na⁺ → R'-O-R + NaX.\nThe alkoxide ion (R'O⁻) acts as a strong nucleophile and attacks the primary alkyl halide via backside displacement of the halide leaving group in a bimolecular nucleophilic substitution (SN2) reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2520,
    question: "The correct order of increasing reactivity of C-X bond towards nucleophile in the following compounds is: I. Chlorobenzene II. 2,4-Dinitrochlorobenzene III. tert-Butyl chloride IV. Isopropyl chloride [AIPMT 2010 Prelims]",
    optionA: "I < IV < III < II",
    optionB: "II < III < I < IV",
    optionC: "IV < III < I < II",
    optionD: "III < II < I < IV",
    correctOption: "A",
    explanation: "Reactivity towards nucleophilic attack depends on bond strength and mechanism:\n1. Chlorobenzene (I): The C-Cl bond possesses partial double bond character due to resonance (+R effect of chlorine) and sp² hybridization of aromatic carbon. Consequently, it is extremely unreactive towards nucleophilic substitution under normal conditions (least reactive).\n2. Isopropyl chloride (IV): A secondary alkyl halide; undergoes nucleophilic substitution at a moderate rate.\n3. tert-Butyl chloride (III): A tertiary alkyl halide; rapidly ionizes via SN1 to generate a stable 3° carbocation ((CH₃)₃C⁺), reacting much faster than secondary halides.\n4. 2,4-Dinitrochlorobenzene (II): Possesses two strongly electron-withdrawing nitro (-NO₂) groups at ortho and para positions that stabilize the anionic Meisenheimer intermediate by extensive resonance, making nucleophilic aromatic substitution (SNAr) extremely facile even with mild nucleophiles.\nHence, the increasing order of reactivity is: I < IV < III < II.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following aryl halides is most reactive towards nucleophilic aromatic substitution (SNAr) with aqueous NaOH?",
      option_a: "2,4,6-Trinitrochlorobenzene (Picryl chloride)",
      option_b: "4-Nitrochlorobenzene",
      option_c: "Chlorobenzene",
      option_d: "2-Chlorotoluene",
      correct_option: "A",
      explanation: "In nucleophilic aromatic substitution (SNAr), electron-withdrawing groups (-NO₂) at ortho and para positions withdraw electron density from the benzene ring and strongly stabilize the anionic intermediate (Meisenheimer complex) via resonance.\nPicryl chloride (2,4,6-trinitrochlorobenzene) has three -NO₂ groups at the ortho and para positions, making it exceptionally reactive such that it hydrolyzes even with warm water!\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2519,
    question: "Which one is most reactive towards SN1 reaction? [AIPMT 2010 Prelims]",
    optionA: "C₆H₅CH(C₆H₅)Br",
    optionB: "C₆H₅CH(CH₃)Br",
    optionC: "C₆H₅C(CH₃)(C₆H₅)Br",
    optionD: "C₆H₅CH₂Br",
    correctOption: "C",
    explanation: "The rate-determining step in an SN1 reaction is the ionization of the substrate to form a carbocation intermediate.\nTherefore, the reactivity directly mirrors carbocation stability:\n- C₆H₅CH₂Br gives the primary benzylic cation: C₆H₅C⁺H₂ (stabilized by 1 phenyl ring).\n- C₆H₅CH(CH₃)Br gives a secondary benzylic carbocation: C₆H₅C⁺H(CH₃) (stabilized by 1 phenyl ring and 3 hyperconjugative α-hydrogens).\n- C₆H₅CH(C₆H₅)Br gives the benzhydryl cation: (C₆H₅)₂C⁺H (stabilized by resonance with 2 phenyl rings).\n- C₆H₅C(CH₃)(C₆H₅)Br gives a tertiary dibenzylic carbocation: (C₆H₅)₂C⁺(CH₃) (stabilized by resonance with 2 phenyl rings AND hyperconjugation from the methyl group).\nBecause (C₆H₅)₂C⁺(CH₃) is the most stable carbocation among all options, C₆H₅C(CH₃)(C₆H₅)Br reacts with the fastest rate in SN1.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following bromides forms the most stable carbocation and therefore reacts fastest via an SN1 pathway?",
      option_a: "Triphenylmethyl bromide ((C₆H₅)₃C-Br)",
      option_b: "Diphenylmethyl bromide ((C₆H₅)₂CH-Br)",
      option_c: "Benzyl bromide (C₆H₅CH₂-Br)",
      option_d: "Bromobenzene (C₆H₅-Br)",
      correct_option: "A",
      explanation: "Triphenylmethyl bromide ionizes to form the triphenylmethyl carbocation ((C₆H₅)₃C⁺), in which the positive charge is delocalized over three aromatic rings with 10 contributing resonance structures, imparting extraordinary stability.\nHence, it undergoes SN1 solvolysis at the fastest rate.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2518,
    question: "In the following reaction: C₆H₅CH₂Br + Mg (dry ether) → intermediate + H₃O⁺ → X. The product X is: [AIPMT 2010 Mains]",
    optionA: "C₆H₅CH₂OCH₂C₆H₅",
    optionB: "C₆H₅CH₂OH",
    optionC: "C₆H₅CH₃",
    optionD: "C₆H₅CH₂CH₂C₆H₅",
    correctOption: "C",
    explanation: "Step 1: When benzyl bromide (C₆H₅CH₂Br) reacts with magnesium metal in dry ether, it undergoes oxidative addition to form the Grignard reagent benzylmagnesium bromide:\nC₆H₅CH₂Br + Mg (dry ether) → C₆H₅CH₂MgBr.\nStep 2: Grignard reagents are strong bases and powerful nucleophiles. The carbanionic carbon (C₆H₅CH₂:⁻) readily abstracts an acidic proton from hydronium ion (H₃O⁺) or water:\nC₆H₅CH₂MgBr + H₃O⁺ → C₆H₅CH₃ + Mg(OH)Br + H₂O.\nThe resulting product is toluene (C₆H₅CH₃).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "When cyclohexyl bromide is treated with magnesium in dry ether, followed by reaction with heavy water (D₂O), the product obtained is:",
      option_a: "Monodeuteriocyclohexane (C₆H₁₁D)",
      option_b: "Cyclohexanol (C₆H₁₁OH)",
      option_c: "Dicyclohexyl",
      option_d: "Cyclohexene",
      correct_option: "A",
      explanation: "Cyclohexyl bromide reacts with Mg in dry ether to form cyclohexylmagnesium bromide (C₆H₁₁MgBr).\nReaction with D₂O introduces a deuterium atom at the nucleophilic carbon:\nC₆H₁₁MgBr + D₂O → C₆H₁₁D + Mg(OD)Br.\nThe product is deuteriocyclohexane (C₆H₁₁D).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2517,
    question: "Consider the reactions: (i) (CH₃)₂CH-CH₂Br + C₂H₅OH → (CH₃)₂CH-CH₂OC₂H₅ + HBr and (ii) (CH₃)₂CH-CH₂Br + C₂H₅O⁻ → (CH₃)₂CH-CH₂OC₂H₅ + Br⁻. The mechanisms of reactions (i) and (ii) are respectively: [AIPMT 2011 Mains]",
    optionA: "SN1 and SN2",
    optionB: "SN1 and SN1",
    optionC: "SN2 and SN2",
    optionD: "SN2 and SN1",
    correctOption: "A",
    explanation: "In reaction (i):\nThe nucleophile is ethanol (C₂H₅OH), which is a weak, neutral nucleophile and a polar protic solvent. Weak nucleophiles favor carbocation-mediated substitution via the SN1 mechanism (or ionizing rearrangement).\nIn reaction (ii):\nThe nucleophile is ethoxide ion (C₂H₅O⁻), which is a strong, negatively charged nucleophile. Strong nucleophiles attack directly in a bimolecular step via the SN2 mechanism.\nThus, reaction (i) proceeds predominantly via SN1 and reaction (ii) via SN2.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following reaction conditions predominantly favors the SN2 mechanism over the SN1 mechanism for a primary alkyl halide?",
      option_a: "High concentration of a strong nucleophile in a polar aprotic solvent",
      option_b: "Weak neutral nucleophile in a polar protic solvent",
      option_c: "Low concentration of a weak nucleophile with Lewis acid catalyst",
      option_d: "Aqueous acid at high temperature",
      correct_option: "A",
      explanation: "The SN2 rate law is Rate = k[substrate][nucleophile].\nA high concentration of a strong nucleophile (such as CN⁻, I⁻, or RO⁻) and a polar aprotic solvent (such as DMF, DMSO, or acetone, which does not solvate and deactivate the anionic nucleophile) maximally favor the SN2 mechanism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2516,
    question: "Which of the following compounds undergoes nucleophilic substitution reaction most easily? [AIPMT 2011 Mains]",
    optionA: "4-Chloronitrobenzene",
    optionB: "Chlorobenzene",
    optionC: "4-Chlorotoluene",
    optionD: "4-Chloroanisole",
    correctOption: "A",
    explanation: "Aryl halides are generally unreactive towards nucleophilic substitution due to partial double bond character of the C-Cl bond and electron repulsion from the benzene ring.\nHowever, the presence of strong electron-withdrawing groups like nitro (-NO₂) at ortho or para positions dramatically accelerates nucleophilic aromatic substitution (SNAr) via the addition-elimination mechanism.\nThe -NO₂ group withdraws electron density via both inductive (-I) and resonance (-M/-R) effects, stabilizing the anionic Meisenheimer intermediate.\n- 4-Chloronitrobenzene has a strong -NO₂ group at the para position.\n- 4-Chlorotoluene has an electron-donating methyl group (+I, hyperconjugation).\n- 4-Chloroanisole has a strongly electron-donating methoxy group (+M).\nTherefore, 4-chloronitrobenzene undergoes nucleophilic substitution most easily.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Arrange the following chlorobenzene derivatives in order of increasing reactivity towards nucleophilic aromatic substitution (SNAr) with sodium methoxide: (I) Chlorobenzene, (II) 4-Chloronitrobenzene, (III) 2,4-Dinitrochlorobenzene, (IV) 2,4,6-Trinitrochlorobenzene.",
      option_a: "I < II < III < IV",
      option_b: "IV < III < II < I",
      option_c: "I < III < II < IV",
      option_d: "II < I < III < IV",
      correct_option: "A",
      explanation: "Each additional electron-withdrawing nitro group at ortho and para positions delocalizes the negative charge of the carbanion intermediate over oxygen atoms, stabilizing the transition state and accelerating the reaction rate:\nChlorobenzene (0 -NO₂) < 4-Chloronitrobenzene (1 -NO₂) < 2,4-Dinitrochlorobenzene (2 -NO₂) < 2,4,6-Trinitrochlorobenzene (3 -NO₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2515,
    question: "In the replacement reaction: ≥C-I + MF → ≥C-F + MI. The reaction will be most favourable if M happens to be: [AIPMT 2012 Mains]",
    optionA: "Na",
    optionB: "K",
    optionC: "Rb",
    optionD: "Li",
    correctOption: "C",
    explanation: "In the fluorination reaction (Swarts-type replacement):\nR-I + MF → R-F + MI.\nFor the reaction to proceed favourably, the metal fluoride (MF) must easily dissociate to release free, active nucleophilic fluoride ions (F⁻).\nAs we descend the alkali metal group (Li → Na → K → Rb):\n- Cation size increases: r(Li⁺) < r(Na⁺) < r(K⁺) < r(Rb⁺).\n- According to lattice energy principles and Fajan's rules, larger cations have lower charge density, resulting in lowest lattice energy and highest ionic character for RbF.\nBecause RbF has the lowest lattice energy, the Rb-F bond dissociates most easily, providing maximum availability of fluoride ions.\nHence, the reaction is most favourable when M is Rb (Rubidium).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Alkyl fluorides are best synthesized by heating an alkyl chloride or bromide in the presence of a metallic fluoride such as AgF, Hg₂F₂, CoF₃, or SbF₃. This reaction is known as:",
      option_a: "Swarts reaction",
      option_b: "Finkelstein reaction",
      option_c: "Wurtz-Fittig reaction",
      option_d: "Frankland reaction",
      correct_option: "A",
      explanation: "The synthesis of alkyl fluorides by halogen exchange using inorganic fluorides (AgF, Hg₂F₂, CoF₃, or SbF₃) is known as the Swarts reaction.\nIn contrast, preparation of alkyl iodides using NaI in dry acetone is the Finkelstein reaction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2514,
    question: "Which of the following compounds will undergo racemisation when hydrolysed with aqueous KOH solution? (i) C₆H₅CH₂Cl, (ii) CH₃CH₂CH₂Cl, (iii) (CH₃)₂CHCH₂Cl, (iv) CH₃-CH₂-CH(Cl)-CH₃ [AIPMT 2014]",
    optionA: "(i) and (ii)",
    optionB: "(ii) and (iv)",
    optionC: "(iv) only",
    optionD: "(i) and (iv)",
    correctOption: "C",
    explanation: "Racemisation during nucleophilic substitution occurs when:\n1. The substrate possesses an asymmetric (chiral) carbon atom.\n2. Substitution proceeds via the SN1 mechanism involving a planar, sp²-hybridized carbocation intermediate that can be attacked with equal probability from either side.\nEvaluating the compounds:\n- (i) C₆H₅CH₂Cl (benzyl chloride): Achiral (no chiral carbon).\n- (ii) CH₃CH₂CH₂Cl (1-chloropropane): Achiral.\n- (iii) (CH₃)₂CHCH₂Cl (1-chloro-2-methylpropane): Achiral.\n- (iv) CH₃-CH₂-CH(Cl)-CH₃ (2-chlorobutane): The C-2 carbon is chiral, bonded to -H, -Cl, -CH₃, and -CH₂CH₃.\nUpon SN1 hydrolysis, 2-chlorobutane forms a planar sec-butyl carbocation, yielding an equimolar mixture of (+) and (-) 2-butanol, resulting in racemisation.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following optically active alkyl halides will undergo racemisation when subjected to solvolysis in aqueous acetone?",
      option_a: "(R)-2-Bromo-2-phenylpropane",
      option_b: "(R)-2-Bromobutane",
      option_c: "(S)-1-Bromo-2-methylbutane",
      option_d: "Both (A) and (B)",
      correct_option: "D",
      explanation: "Both (R)-2-bromo-2-phenylpropane and (R)-2-bromobutane ionize via the SN1 pathway to form planar carbocations.\nAttack by water from either face of the planar carbocation produces equal amounts of the two enantiomers, resulting in racemisation.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 2513,
    question: "The reaction of C₆H₅CH=CHCH₃ with HBr produces: [AIPMT 2015 Cancelled]",
    optionA: "C₆H₅CH₂CH₂CH₂Br",
    optionB: "C₆H₅CH₂CH(Br)CH₃",
    optionC: "C₆H₅CH(Br)CH₂CH₃",
    optionD: "p-Bromo derivative",
    correctOption: "C",
    explanation: "The reaction of 1-phenylprop-1-ene (C₆H₅CH=CHCH₃) with HBr proceeds via electrophilic addition:\nStep 1: Protonation (addition of H⁺) can yield two possible carbocations:\n- Path A: Protonation at C-2 gives C₆H₅-C⁺H-CH₂CH₃ (benzylic carbocation).\n- Path B: Protonation at C-1 gives C₆H₅-CH₂-C⁺H-CH₃ (secondary alkyl carbocation).\nThe benzylic carbocation C₆H₅-C⁺H-CH₂CH₃ is extraordinarily stabilized by resonance with the π-electrons of the benzene ring through multiple resonance contributors.\nStep 2: Attack of bromide ion (Br⁻) on this highly stable benzylic carbocation yields 1-bromo-1-phenylpropane:\nC₆H₅CH(Br)CH₂CH₃.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Addition of HBr to styrene (C₆H₅CH=CH₂) in the absence of peroxides yields which major product?",
      option_a: "1-Bromo-1-phenylethane (C₆H₅CH(Br)CH₃)",
      option_b: "2-Bromo-1-phenylethane (C₆H₅CH₂CH₂Br)",
      option_c: "1,2-Dibromo-1-phenylethane",
      option_d: "Bromobenzene and ethane",
      correct_option: "A",
      explanation: "Protonation of styrene produces the resonance-stabilized benzylic carbocation C₆H₅-C⁺H-CH₃ in preference to the primary carbocation C₆H₅-CH₂-C⁺H₂.\nNucleophilic attack by Br⁻ gives 1-bromo-1-phenylethane as the major Markovnikov product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2512,
    question: "In an SN1 reaction on chiral centres, there is: [AIPMT 2015]",
    optionA: "Inversion more than retention leading to partial racemisation",
    optionB: "100% retention",
    optionC: "100% inversion",
    optionD: "100% racemisation",
    correctOption: "A",
    explanation: "In an SN1 reaction of an optically active substrate, the leaving group departs to form a planar, sp²-hybridized carbocation.\nIdeally, attack from both faces of a free, symmetrical planar carbocation would lead to 50% inversion and 50% retention (100% complete racemisation).\nHowever, in real solutions, the leaving group (X⁻) departs and forms an intimate ion pair (solvent-separated ion pair).\nThe departing leaving group shields the front side of the carbocation, sterically hindering nucleophilic attack from the retention side.\nAs a result, attack from the backside occurs more frequently than attack from the shielded front side.\nThis causes inversion to exceed retention, leading to partial racemisation accompanied by net inversion.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An SN2 reaction at an asymmetric (chiral) carbon atom results in:",
      option_a: "Complete inversion of configuration (Walden inversion)",
      option_b: "Complete retention of configuration",
      option_c: "Racemisation",
      option_d: "Partial retention and partial inversion",
      correct_option: "A",
      explanation: "In the SN2 mechanism, the nucleophile attacks exclusively from the side opposite to the leaving group (backside attack) in a single concerted step.\nThis forces the other three substituents to invert like an umbrella turned inside out, resulting in 100% stereochemical inversion (Walden inversion).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2511,
    question: "Which of the following biphenyls is optically active? [NEET 2016 Phase 1]",
    optionA: "2,2'-Diiodobiphenyl",
    optionB: "2,6-Dimethylbiphenyl",
    optionC: "4-Nitro-4'-iodobiphenyl",
    optionD: "2,2'-Dibromo-6,6'-diiodobiphenyl",
    correctOption: "D",
    explanation: "Biphenyls exhibit atropisomerism (optical activity due to restricted rotation about the central C-C single bond) when:\n1. Bulky ortho substituents at positions 2, 2', 6, and 6' prevent co-planarity of the two phenyl rings due to steric crowding (steric hindrance forces the two rings into mutually perpendicular planes).\n2. Each individual ring lacks a plane of symmetry, meaning that the two ortho substituents on the same phenyl ring must be different (non-identical).\nIn 2,2'-dibromo-6,6'-diiodobiphenyl (Option D):\nEach phenyl ring has one -Br and one -I at the ortho positions (2 and 6). Because -Br ≠ -I, neither ring possesses an internal plane of symmetry, and the perpendicular conformation lacks both an alternating axis of symmetry and a center of inversion.\nHence, the molecule is dissymmetric, non-superimposable on its mirror image, and optically active.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following substituted biphenyl derivatives is resolvable into optical enantiomers (optically active)?",
      option_a: "Biphenyl-2,2'-dicarboxylic acid",
      option_b: "6,6'-Dinitrobiphenyl-2,2'-dicarboxylic acid",
      option_c: "4,4'-Dichlorobiphenyl",
      option_d: "Biphenyl",
      correct_option: "B",
      explanation: "In 6,6'-dinitrobiphenyl-2,2'-dicarboxylic acid, all four ortho positions are substituted with bulky groups (-NO₂ and -COOH).\nThe large steric clash forces the rings into perpendicular planes, and each ring has different substituents (-NO₂ ≠ -COOH), rendering the molecule chiral and optically active.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2510,
    question: "Consider the reaction: CH₃CH₂CH₂Br + NaCN → CH₃CH₂CH₂CN + NaBr. This reaction will be the fastest in: [NEET 2016 Phase 2]",
    optionA: "Ethanol",
    optionB: "Methanol",
    optionC: "N,N-Dimethylformamide (DMF)",
    optionD: "Water",
    correctOption: "C",
    explanation: "The reaction of 1-bromopropane (a primary alkyl halide) with sodium cyanide is a classic SN2 substitution.\nThe rate of an SN2 reaction is significantly accelerated by polar aprotic solvents (such as DMF, DMSO, acetone, or acetonitrile).\nIn polar protic solvents (ethanol, methanol, water), hydrogen bonding extensively solvates the nucleophilic cyanide anion (CN⁻), creating a \"solvent cage\" that diminishes its nucleophilicity.\nIn polar aprotic solvents like N,N-dimethylformamide (DMF), the cations (Na⁺) are solvated by the negative carbonyl oxygen, while the anion (CN⁻) remains \"naked\", unencumbered by hydrogen bonding and possessing maximum nucleophilic reactivity.\nTherefore, the SN2 reaction will be the fastest in N,N-dimethylformamide (DMF).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following solvents is classified as a polar aprotic solvent that maximizes the rate of an SN2 reaction?",
      option_a: "Dimethyl sulfoxide (DMSO)",
      option_b: "Water (H₂O)",
      option_c: "Ethanol (C₂H₅OH)",
      option_d: "Acetic acid (CH₃COOH)",
      correct_option: "A",
      explanation: "Dimethyl sulfoxide (DMSO) is a polar aprotic solvent.\nIt possesses a high dielectric constant and dipole moment but lacks acidic O-H or N-H protons, leaving anionic nucleophiles free (\"naked\") to react rapidly via SN2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2509,
    question: "Identify A and predict the type of reaction: o-Bromoanisole + NaNH₂ (in liquid NH₃) → A [NEET 2017]",
    optionA: "o-Methoxyaniline and elimination-addition reaction",
    optionB: "m-Methoxyaniline and substitution reaction",
    optionC: "o-Bromoaniline and cine substitution reaction",
    optionD: "m-Methoxyaniline and substitution (cine substitution/elimination-addition) reaction",
    correctOption: "D",
    explanation: "Reaction of o-bromoanisole (1-bromo-2-methoxybenzene) with a very strong base like sodamide (NaNH₂) in liquid ammonia proceeds via an elimination-addition (benzyne) mechanism:\nStep 1 (Elimination): The amide ion (NH₂⁻) abstracts the proton from C-3 (adjacent to C-2 bearing Br) rather than from C-1, generating the intermediate 3-methoxybenzyne.\nStep 2 (Addition): Nucleophilic attack of NH₂⁻ can occur at C-2 or C-3.\nAttack at C-3 places the resulting negative charge (carbanion) at C-2, which is inductively stabilized by the adjacent strongly electronegative -OCH₃ group (-I effect of methoxy is greatest at the adjacent position).\nSubsequent protonation yields m-methoxyaniline (m-anisidine) as the major product.\nBecause substitution occurs at a position different from the leaving group, it is termed a cine-substitution via the elimination-addition (benzyne) pathway.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "When 1-chloronaphthalene is treated with NaNH₂ in liquid NH₃, the reaction proceeds through a benzyne intermediate to yield:",
      option_a: "A mixture of 1-naphthylamine and 2-naphthylamine",
      option_b: "1-Naphthylamine only",
      option_c: "2-Naphthylamine only",
      option_d: "Naphthalene",
      correct_option: "A",
      explanation: "Reaction of 1-chloronaphthalene with NaNH₂ in liquid NH₃ forms a 1,2-naphthalyne intermediate.\nNucleophilic attack of NH₂⁻ at either C-1 or C-2 yields a mixture of 1-naphthylamine and 2-naphthylamine (cine and direct substitution).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2508,
    question: "The compound C₇H₈ undergoes the following reactions: C₇H₈ + 3 Cl₂ / Δ → A + Br₂ / Fe → B + Zn / HCl → C. The product C is: [NEET 2018]",
    optionA: "m-Bromotoluene",
    optionB: "o-Bromotoluene",
    optionC: "3-Bromo-2,4,6-trichlorotoluene",
    optionD: "p-Bromotoluene",
    correctOption: "A",
    explanation: "1. Compound C₇H₈ is toluene (C₆H₅-CH₃).\nReaction with 3 Cl₂ in the presence of heat/light causes side-chain free-radical chlorination of the methyl group to form benzotrichloride (A):\nC₆H₅CH₃ + 3 Cl₂ / Δ → C₆H₅-CCl₃ + 3 HCl.\n2. The -CCl₃ group has three electronegative chlorine atoms, making it strongly electron-withdrawing via inductive (-I) and reverse hyperconjugative effects, thus acting as a meta-directing deactivator.\nElectrophilic bromination with Br₂/Fe directs the incoming bromine to the meta-position, giving m-bromobenzotrichloride (B):\nC₆H₅-CCl₃ + Br₂/Fe → m-Br-C₆H₄-CCl₃ + HBr.\n3. Reduction of the -CCl₃ group with Zn/HCl selectively reduces the trichloromethyl side chain back to a methyl group (-CH₃) without disturbing the aromatic bromine:\nm-Br-C₆H₄-CCl₃ + Zn / HCl → m-Br-C₆H₄-CH₃ (m-bromotoluene).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In the conversion of toluene to m-chlorotoluene, which synthetic sequence is appropriate?",
      option_a: "(i) KMnO₄/KOH, Δ; (ii) Cl₂/FeCl₃; (iii) SOCl₂; (iv) NaBH₄",
      option_b: "(i) 3 Cl₂/Δ; (ii) Cl₂/Fe; (iii) Zn/HCl",
      option_c: "Both (A) and (B)",
      option_d: "Direct chlorination with Cl₂/AlCl₃",
      correct_option: "C",
      explanation: "Both pathways use a meta-directing group on the side chain (-CCl₃ or -COOH) to install the halogen at the meta-position, followed by reduction back to a methyl group to yield m-chlorotoluene.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2507,
    question: "Elimination reaction of 2-bromopentane to form pent-2-ene is: (A) β-Elimination reaction, (B) Follows Zaitsev rule, (C) Dehydrohalogenation reaction, (D) Dehydration reaction. [NEET 2020 Phase 1]",
    optionA: "(A), (C), (D)",
    optionB: "(B), (C), (D)",
    optionC: "(A), (B), (D)",
    optionD: "(A), (B), (C)",
    correctOption: "D",
    explanation: "When 2-bromopentane, CH₃-CH(Br)-CH₂-CH₂-CH₃, is heated with alcoholic KOH:\n(A) The hydrogen atom is removed from the β-carbon (C-3 or C-1) while the bromine atom is lost from the α-carbon (C-2). Hence, it is a β-elimination reaction. (Statement A is correct)\n(B) The more substituted, more stable alkene (pent-2-ene with 5 hyperconjugative α-hydrogens) is formed as the major product over pent-1-ene (2 α-hydrogens). This follows Saytzeff's (Zaitsev's) rule. (Statement B is correct)\n(C) A molecule of hydrogen halide (HBr) is eliminated, so it is a dehydrohalogenation reaction. (Statement C is correct)\n(D) Dehydration refers specifically to the loss of a water molecule (H₂O) from an alcohol, not the loss of HBr. (Statement D is incorrect)\nThus, statements (A), (B), and (C) are correct.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements is INCORRECT regarding the base-catalyzed E2 dehydrohalogenation of 2-chlorobutane?",
      option_a: "It involves loss of H from β-carbon and halogen from α-carbon.",
      option_b: "The major product is but-2-ene according to Saytzeff's rule.",
      option_c: "The reaction involves a carbocation intermediate with rearrangement.",
      option_d: "It is a concerted single-step bimolecular elimination process.",
      correct_option: "C",
      explanation: "The E2 mechanism is a concerted single-step process that passes through a transition state without forming any discrete carbocation intermediate, so no rearrangement occurs.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2506,
    question: "Which of the following alkanes cannot be made in good yield by Wurtz reaction? [NEET 2020 Phase 1]",
    optionA: "2,3-Dimethylbutane",
    optionB: "n-Heptane",
    optionC: "n-Butane",
    optionD: "n-Hexane",
    correctOption: "B",
    explanation: "The Wurtz reaction involves the coupling of two alkyl halide molecules in the presence of sodium metal in dry ether:\n2 R-X + 2 Na → R-R + 2 NaX.\nWhen two identical alkyl halide molecules couple, a symmetrical alkane with an even number of carbon atoms is produced in good yield (e.g., n-butane from ethyl bromide, n-hexane from propyl bromide, 2,3-dimethylbutane from isopropyl bromide).\nTo synthesize an alkane with an odd number of carbon atoms, such as n-heptane (C₇H₁₆), a mixture of two different alkyl halides (e.g., ethyl halide and pentyl halide, or methyl halide and hexyl halide) must be used.\nThis produces a mixture of three different alkanes (R₁-R₁, R₁-R₂, and R₂-R₂) with very close boiling points that are difficult to separate, resulting in a very poor yield of the desired cross-coupled alkane.\nTherefore, n-heptane cannot be prepared in good yield by the Wurtz reaction.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following alkanes can be prepared in high yield using the Wurtz reaction?",
      option_a: "n-Pentane",
      option_b: "n-Propane",
      option_c: "2,2,3,3-Tetramethylbutane",
      option_d: "Methane",
      correct_option: "C",
      explanation: "The Wurtz reaction is well-suited for preparing symmetrical alkanes with an even number of carbon atoms.\n2,2,3,3-Tetramethylbutane is a highly symmetrical alkane formed in good yield by coupling two tert-butyl radicals/halides.\nMethane cannot be prepared at all because the Wurtz reaction requires coupling of at least two carbon fragments.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2505,
    question: "The major product formed in the dehydrohalogenation reaction of 2-bromopentane is pent-2-ene. This product formation is based on: [NEET 2021]",
    optionA: "Huckel's Rule",
    optionB: "Saytzeff's Rule",
    optionC: "Hund's Rule",
    optionD: "Hofmann Rule",
    correctOption: "B",
    explanation: "Saytzeff's (Zaitsev's) rule states that in dehydrohalogenation reactions of alkyl halides, the hydrogen atom is predominantly eliminated from the β-carbon that has fewer hydrogen atoms, yielding the more substituted, thermodynamically more stable alkene as the major product.\nIn 2-bromopentane:\nCH₃-C(Br)H-CH₂-CH₂-CH₃\n- β₁ carbon (C-1) has 3 hydrogens. Elimination gives pent-1-ene (monosubstituted with 2 α-hydrogens).\n- β₂ carbon (C-3) has 2 hydrogens. Elimination gives pent-2-ene (disubstituted with 5 α-hydrogens).\nBecause pent-2-ene has greater hyperconjugative stabilization, it is the major product in accordance with Saytzeff's rule.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When 2-bromo-2-methylbutane is treated with a bulky base like potassium tert-butoxide (t-BuOK), the major product formed is:",
      option_a: "2-Methylbut-1-ene (Hofmann product)",
      option_b: "2-Methylbut-2-ene (Saytzeff product)",
      option_c: "3-Methylbut-1-ene",
      option_d: "2-Methylbutane",
      correct_option: "A",
      explanation: "When a sterically bulky base like potassium tert-butoxide is used, steric hindrance prevents the base from abstracting a proton from the more hindered internal β-carbon.\nInstead, it abstracts a proton from the more accessible, less hindered terminal methyl group, yielding the less substituted alkene (2-methylbut-1-ene) as the major product (Hofmann elimination).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2504,
    question: "The major product of the following chemical reaction is: (CH₃)₂CH-CH=CH₂ + HBr in presence of (C₆H₅CO)₂O₂ → Product [NEET 2021]",
    optionA: "(CH₃)₂CH-CH₂-CH₂Br",
    optionB: "(CH₃)₂CH-CH(Br)-CH₃",
    optionC: "(CH₃)₂C(Br)-CH₂-CH₃",
    optionD: "(CH₃)₂CH-CH₂-CH₂-O-COC₆H₅",
    correctOption: "A",
    explanation: "In the presence of benzoyl peroxide (C₆H₅CO)₂O₂, addition of HBr to an unsymmetrical alkene proceeds via a free-radical chain mechanism (the peroxide effect or Kharasch effect).\n1. Initiation: Benzoyl peroxide generates phenyl radicals which react with HBr to produce bromine free radicals (Br•).\n2. Propagation: The electrophilic Br• radical adds to the terminal, less hindered carbon (C-1) of 3-methylbut-1-ene to generate the more stable secondary free radical:\n(CH₃)₂CH-C•H-CH₂Br (rather than the less stable primary radical).\n3. Hydrogen abstraction: The secondary radical abstracts a hydrogen atom from HBr to give the anti-Markovnikov product:\n(CH₃)₂CH-CH₂-CH₂Br (1-bromo-3-methylbutane).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Addition of HCl to propene in the presence of benzoyl peroxide gives which major product?",
      option_a: "2-Chloropropane",
      option_b: "1-Chloropropane",
      option_c: "Allyl chloride",
      option_d: "1,2-Dichloropropane",
      correct_option: "A",
      explanation: "The peroxide effect (anti-Markovnikov addition via free radicals) is observed ONLY with HBr.\nFor HCl, the H-Cl bond is too strong (430 kJ/mol) for the alkoxy/peroxide radical to abstract a hydrogen atom homolytically.\nTherefore, HCl adds strictly via ionic Markovnikov addition even in the presence of peroxides, yielding 2-chloropropane as the major product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2503,
    question: "The given compound CH₃-CH=CH-CH(X)-CH₂CH₃ is an example of: [NEET 2023]",
    optionA: "Aryl halide",
    optionB: "Allylic halide",
    optionC: "Vinylic halide",
    optionD: "Benzylic halide",
    correctOption: "B",
    explanation: "Haloalkanes are classified according to the hybridization and environment of the carbon atom bonded to the halogen (X):\n1. Vinylic halide: Halogen is directly bonded to an sp²-hybridized carbon of a C=C double bond (-CH=CH-X).\n2. Allylic halide: Halogen is bonded to an sp³-hybridized carbon that is directly adjacent to a carbon-carbon double bond (C=C-C-X).\n3. Benzylic halide: Halogen is bonded to an sp³-hybridized carbon attached directly to an aromatic benzene ring.\n4. Aryl halide: Halogen is bonded directly to an sp²-hybridized carbon of an aromatic ring.\nIn CH₃-CH=CH-CH(X)-CH₂CH₃, the carbon bearing the halogen (X) is sp³-hybridized and directly attached to the sp² carbon of the -CH=CH- double bond.\nThus, it is an allylic halide.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following compounds is classified as a vinylic halide?",
      option_a: "CH₂=CH-Br",
      option_b: "CH₂=CH-CH₂-Br",
      option_c: "C₆H₅-CH₂-Br",
      option_d: "CH₃-CH(Br)-CH₃",
      correct_option: "A",
      explanation: "In vinyl bromide (CH₂=CH-Br), the bromine atom is directly attached to an sp²-hybridized alkene carbon atom.\nHence, it is a vinylic halide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2502,
    question: "Identify X in the following reaction: 1-Bromo-4-chlorobenzene (1.0 mol) + Mg (dry ether, 1.0 mol) → Intermediate + D₂O → X [NEET 2023 Manipur]",
    optionA: "1-Chloro-4-deuteriobenzene",
    optionB: "1-Bromo-4-deuteriobenzene",
    optionC: "Deuteriobenzene",
    optionD: "4-Chlorophenol",
    correctOption: "A",
    explanation: "1. 1-Bromo-4-chlorobenzene contains both a C-Br bond and a C-Cl bond.\nBecause the C-Br bond is longer and weaker (bond energy ~280 kJ/mol) than the C-Cl bond (bond energy ~400 kJ/mol), magnesium reacts selectively at the C-Br bond.\nThus, 1.0 mole of Mg inserts selectively into the C-Br bond to form the Grignard reagent:\np-Cl-C₆H₄-MgBr (4-chlorophenylmagnesium bromide).\n2. When treated with heavy water (D₂O), the carbanionic aryl carbon abstracts a deuterium ion (D⁺):\np-Cl-C₆H₄-MgBr + D₂O → p-Cl-C₆H₄-D + Mg(OD)Br.\nThe product X is 1-chloro-4-deuteriobenzene (4-chlorodeuteriobenzene).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "When 1-bromo-3-iodobenzene is treated with 1.0 equivalent of magnesium in dry ether followed by hydrolysis with H₂O, the major product formed is:",
      option_a: "Bromobenzene",
      option_b: "Iodobenzene",
      option_c: "Benzene",
      option_d: "1,3-Dibromobenzene",
      correct_option: "A",
      explanation: "The C-I bond is much weaker than the C-Br bond.\nTherefore, 1.0 equivalent of Mg selectively inserts into the C-I bond to form 3-bromophenylmagnesium iodide.\nHydrolysis replaces the -MgI group with hydrogen (-H), yielding bromobenzene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2501,
    question: "Identify the product in the following reaction: p-Chlorobenzyl chloride (i) KCN (ii) H₂O/HCl, Δ (iii) Br₂/red P (iv) H₂O → Product [NEET 2023 Manipur]",
    optionA: "p-Chlorobenzoyl bromide",
    optionB: "2-Bromo-2-(4-chlorophenyl)acetic acid",
    optionC: "4-Chlorophenylacetic acid",
    optionD: "2-Bromo-4-chlorotoluene",
    correctOption: "B",
    explanation: "Step-by-step synthetic sequence:\n1. Nucleophilic substitution with KCN:\np-Cl-C₆H₄-CH₂Cl + KCN → p-Cl-C₆H₄-CH₂CN + KCl (p-chlorophenylacetonitrile).\n2. Complete acidic hydrolysis of nitrile:\np-Cl-C₆H₄-CH₂CN + 2 H₂O / HCl, Δ → p-Cl-C₆H₄-CH₂COOH + NH₄Cl (4-chlorophenylacetic acid).\n3. Hell-Volhard-Zelinsky (HVZ) reaction:\nTreatment of carboxylic acid containing an α-hydrogen with Br₂ in the presence of red phosphorus brominates the α-carbon:\np-Cl-C₆H₄-CH₂COOH + Br₂/red P → p-Cl-C₆H₄-CH(Br)-COBr.\n4. Hydrolysis with H₂O:\nHydrolyzes the acyl bromide back to carboxylic acid:\np-Cl-C₆H₄-CH(Br)-COOH.\nThe IUPAC name of the product is 2-bromo-2-(4-chlorophenyl)acetic acid.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The reaction of phenylacetic acid (C₆H₅CH₂COOH) with Br₂ in the presence of red phosphorus followed by hydrolysis gives:",
      option_a: "2-Bromo-2-phenylacetic acid",
      option_b: "o-Bromophenylacetic acid",
      option_c: "p-Bromophenylacetic acid",
      option_d: "Benzoyl bromide",
      correct_option: "A",
      explanation: "The Hell-Volhard-Zelinsky (HVZ) reaction selectively brominates the α-carbon of carboxylic acids bearing α-hydrogens.\nPhenylacetic acid has an α-CH₂ group; treatment with Br₂/red P followed by water yields 2-bromo-2-phenylacetic acid.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2500,
    question: "Choose the correct sequence of reagents in the conversion of 4-nitrotoluene to 2-bromotoluene: [NEET 2023 Manipur]",
    optionA: "NaNO₂/HCl; Sn/HCl; Br₂; H₂O/H₃PO₂",
    optionB: "Sn/HCl; NaNO₂/HCl; Br₂; H₂O/H₃PO₂",
    optionC: "Br₂; Sn/HCl; NaNO₂/HCl; H₂O/H₃PO₂",
    optionD: "Sn/HCl; Br₂; NaNO₂/HCl; H₂O/H₃PO₂",
    correctOption: "C",
    explanation: "Starting material is 4-nitrotoluene (p-nitrotoluene):\n1. Bromination with Br₂/Fe (or Br₂/Lewis acid):\nThe methyl group (-CH₃) is ortho-para directing and activating, while the nitro group (-NO₂) at C-4 is meta directing and deactivating.\nBoth groups cooperatively direct incoming electrophilic bromination to C-2 (ortho to methyl, meta to nitro), giving 2-bromo-4-nitrotoluene.\n2. Reduction of the nitro group with Sn/HCl:\nReduces the -NO₂ group to an amino group (-NH₂), forming 2-bromo-4-methylaniline.\n3. Diazotization with NaNO₂/HCl (0-5 °C):\nConverts the -NH₂ group to a diazonium salt (-N₂⁺Cl⁻).\n4. Deamination (reduction) with H₃PO₂/H₂O:\nHypophosphorous acid removes the diazonium group and replaces it with hydrogen (-H), yielding 2-bromotoluene (o-bromotoluene).\nTherefore, the correct sequence is: Br₂; Sn/HCl; NaNO₂/HCl; H₂O/H₃PO₂.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which reagent is used to replace the diazonium group (-N₂⁺Cl⁻) of an arenediazonium salt with hydrogen (-H) to achieve deamination?",
      option_a: "H₃PO₂ and H₂O (or CH₃CH₂OH)",
      option_b: "CuCN / KCN",
      option_c: "CuCl / HCl",
      option_d: "HBF₄ followed by NaNO₂/Cu",
      correct_option: "A",
      explanation: "Arenediazonium salts undergo mild reduction to arenes when treated with hypophosphorous acid (H₃PO₂) in water or with ethanol (CH₃CH₂OH).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2499,
    question: "Which amongst the following reactions of alkyl halides produces isonitrile as a major product? [NEET 2023 Manipur]",
    optionA: "R-X + HCN →",
    optionB: "R-X + AgCN →",
    optionC: "R-X + KCN →",
    optionD: "R-X + NaCN (H₂O/C₂H₅OH) →",
    correctOption: "B",
    explanation: "Cyanide ion (CN⁻) is an ambident nucleophile that can attack through either carbon or nitrogen.\n1. KCN and NaCN are predominantly ionic compounds. In solution, cyanide ions are free: [:C≡N:]⁻.\nBecause the C-C bond is thermodynamically more stable than the C-N bond, attack occurs through the carbon atom, giving alkyl cyanides (R-CN, nitriles) as the major product.\n2. In contrast, AgCN is predominantly covalent in nature.\nThe silver atom is covalently bonded to the carbon atom (Ag-C≡N:), leaving only the lone pair of electrons on the nitrogen atom available for nucleophilic attack.\nHence, attack occurs through nitrogen, forming alkyl isocyanide (isonitrile, R-NC) as the major product.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Reaction of an alkyl halide with potassium nitrite (KNO₂) yields an alkyl nitrite (R-ONO) as the major product, whereas reaction with silver nitrite (AgNO₂) yields a nitroalkane (R-NO₂) as the major product. This difference occurs because:",
      option_a: "KNO₂ is ionic with attack via oxygen, whereas AgNO₂ is covalent with attack via the nitrogen lone pair.",
      option_b: "AgNO₂ is ionic and KNO₂ is covalent.",
      option_c: "KNO₂ is an oxidizing agent.",
      option_d: "AgNO₂ is insoluble in all solvents.",
      correct_option: "A",
      explanation: "Nitrite ion (NO₂⁻) is an ambident nucleophile.\nKNO₂ is ionic; the negative charge resides on the more electronegative oxygen, so nucleophilic attack occurs through oxygen forming R-O-N=O (alkyl nitrite).\nAgNO₂ is covalent; the Ag-O bond is covalent, leaving the lone pair on nitrogen free to attack, forming R-NO₂ (nitroalkane).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2498,
    question: "Identify the major product C formed in the following reaction sequence: CH₃CH₂CH₂I + NaCN → A + partial hydrolysis → B + NaOH, Br₂ → C (major) [NEET 2024]",
    optionA: "Propylamine",
    optionB: "Butylamine",
    optionC: "Butanamide",
    optionD: "α-Bromobutanoic acid",
    correctOption: "A",
    explanation: "Step-by-step synthetic sequence:\n1. Step 1: Nucleophilic substitution of 1-iodopropane with NaCN:\nCH₃CH₂CH₂I + NaCN → CH₃CH₂CH₂CN + NaI (product A is butanenitrile).\n2. Step 2: Partial alkaline hydrolysis of the nitrile:\nCH₃CH₂CH₂CN + H₂O (OH⁻) → CH₃CH₂CH₂CONH₂ (product B is butanamide).\n3. Step 3: Hoffmann bromamide degradation reaction:\nTreatment of an amide (R-CONH₂) with bromine and aqueous NaOH degrades the amide with loss of the carbonyl carbon, producing a primary amine with one less carbon atom:\nCH₃CH₂CH₂CONH₂ + Br₂ + 4 NaOH → CH₃CH₂CH₂NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O.\nThe resulting product C is propylamine (propan-1-amine).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In the reaction sequence: Ethyl bromide + KCN → X + LiAlH₄ → Y, the product Y is:",
      option_a: "Propan-1-amine",
      option_b: "Ethanamine",
      option_c: "Propanamide",
      option_d: "Propanoic acid",
      correct_option: "A",
      explanation: "Ethyl bromide (CH₃CH₂Br) reacts with KCN via SN2 to yield propanenitrile (CH₃CH₂CN).\nComplete reduction of propanenitrile with LiAlH₄ reduces the -C≡N group to -CH₂NH₂, yielding propan-1-amine (CH₃CH₂CH₂NH₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2497,
    question: "The compound that will undergo SN1 reaction with the fastest rate is: [NEET 2024]",
    optionA: "Cyclohexylmethyl bromide",
    optionB: "Bromocyclohexane",
    optionC: "Bromobenzene",
    optionD: "1-Bromo-1-phenylethane",
    correctOption: "D",
    explanation: "The rate of an SN1 reaction is directly governed by the stability of the intermediate carbocation formed during the rate-determining ionization step:\n- Bromobenzene (C): Vinylic/aryl halide; C-Br has partial double bond character and phenyl cation is extremely unstable; does not undergo SN1.\n- Cyclohexylmethyl bromide (A): Primary alkyl halide; forms an unstable 1° carbocation.\n- Bromocyclohexane (B): Secondary alkyl halide; forms a secondary carbocation.\n- 1-Bromo-1-phenylethane (D): Ionization of C₆H₅-CH(Br)-CH₃ yields a secondary benzylic carbocation, C₆H₅-C⁺H-CH₃.\nThis benzylic carbocation is extraordinarily stabilized by resonance with the benzene ring (delocalizing charge into the ortho and para positions) as well as hyperconjugation from the adjacent methyl group (3 α-hydrogens).\nBecause it generates the most stable carbocation, 1-bromo-1-phenylethane reacts with the fastest rate in SN1.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following compounds reacts fastest in an SN1 solvolysis reaction?",
      option_a: "Benzyl chloride",
      option_b: "p-Methoxybenzyl chloride",
      option_c: "p-Nitrobenzyl chloride",
      option_d: "Chlorobenzene",
      correct_option: "B",
      explanation: "Ionization of p-methoxybenzyl chloride forms the p-methoxybenzyl carbocation.\nThe methoxy group (-OCH₃) at the para position is a powerful electron-donating group via resonance (+M effect) that exceptionally stabilizes the carbocation, making it ionize orders of magnitude faster than benzyl chloride.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2496,
    question: "The following reaction method: Toluene + X₂ (Fe, dark) → o-haloarene + p-haloarene is not suitable for the preparation of the corresponding haloarene products, due to high reactivity of halogen, when X is: [NEET 2024 Re-Examination]",
    optionA: "F",
    optionB: "I",
    optionC: "Cl",
    optionD: "Br",
    correctOption: "A",
    explanation: "Fluorination of aromatic hydrocarbons with elemental fluorine (F₂) is extremely vigorous, highly exothermic, and explosive due to the very low F-F bond dissociation energy and the high energy of C-F bonds formed.\nThis high reactivity leads to extensive polyfluorination, fragmentation, and cleavage of C-C bonds rather than selective electrophilic mono-substitution.\nTherefore, direct electrophilic halogenation cannot be used to prepare fluoroarenes.\nFluoroarenes are instead prepared by the Balz-Schiemann reaction:\nAr-N₂⁺BF₄⁻ (heated) → Ar-F + BF₃ + N₂.\n(Note: Electrophilic iodination with I₂ is reversible and slow, requiring an oxidizing agent like HNO₃ or HIO₃, but the question specifically cites \"due to high reactivity of halogen\", which uniquely applies to fluorine).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Fluoroarenes are best prepared in the laboratory by which of the following reactions?",
      option_a: "Balz-Schiemann reaction",
      option_b: "Gattermann reaction",
      option_c: "Finkelstein reaction",
      option_d: "Swarts reaction",
      correct_option: "A",
      explanation: "The Balz-Schiemann reaction involves treating an arenediazonium chloride with fluoroboric acid (HBF₄) to precipitate arenediazonium fluoroborate (ArN₂⁺BF₄⁻), which upon gentle thermal decomposition yields fluoroarene (Ar-F).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2495,
    question: "The major product C in the below-mentioned reaction is: CH₃CH₂CH₂Br + alc. KOH, Δ → A + HBr → B + aq. KOH, Δ → C [NEET 2024 Re-Examination]",
    optionA: "Propan-1-ol",
    optionB: "Propan-2-ol",
    optionC: "Propane",
    optionD: "Propyne",
    correctOption: "B",
    explanation: "Step-by-step chemical transformations:\n1. Step 1 (Dehydrohalogenation):\nHeating 1-bromopropane with alcoholic KOH undergoes an E2 elimination to yield propene (A):\nCH₃CH₂CH₂Br + alc. KOH, Δ → CH₃-CH=CH₂ + KBr + H₂O.\n2. Step 2 (Electrophilic Addition):\nAddition of HBr to propene follows Markovnikov's rule. The proton adds to C-1 to form the more stable secondary carbocation (CH₃-C⁺H-CH₃), which is captured by Br⁻ to give 2-bromopropane (B):\nCH₃-CH=CH₂ + HBr → CH₃-CH(Br)-CH₃.\n3. Step 3 (Nucleophilic Substitution):\nHeating 2-bromopropane with aqueous KOH causes nucleophilic substitution of bromide by hydroxide ion:\nCH₃-CH(Br)-CH₃ + aq. KOH, Δ → CH₃-CH(OH)-CH₃ + KBr.\nThe product C is propan-2-ol (isopropyl alcohol).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In the reaction sequence: CH₃-CH(Br)-CH₃ + alc. KOH, Δ → P + HBr (peroxide) → Q + aq. NaOH → R, the product R is:",
      option_a: "Propan-1-ol",
      option_b: "Propan-2-ol",
      option_c: "Propene",
      option_d: "Acetone",
      correct_option: "A",
      explanation: "Elimination of 2-bromopropane with alc. KOH gives propene (P).\nReaction of propene with HBr in the presence of peroxide gives the anti-Markovnikov product, 1-bromopropane (Q).\nSubsequent hydrolysis of 1-bromopropane with aq. NaOH yields propan-1-ol (R).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2494,
    question: "The major product of the following reaction is: PhCH(CH₃)CH₂CH₂CN (i) CH₃MgBr (excess) (ii) H₃O⁺ → Product [NEET 2025]",
    optionA: "PhCH(CH₃)CH₂CH₂C(CH₃)₂OH",
    optionB: "PhCH(CH₃)CH₂CH₂CN",
    optionC: "PhCH(CH₃)CH₂CN",
    optionD: "PhCH(CH₃)CH₂CH₂COCH₃",
    correctOption: "D",
    explanation: "Reaction of a nitrile with a Grignard reagent (R'MgX):\n1. The carbanion of the Grignard reagent (CH₃⁻) attacks the electrophilic carbon of the cyano group (-C≡N) to form an imine salt intermediate:\nR-C≡N + CH₃MgBr → R-C(CH₃)=N-MgBr.\nBecause the resulting imine anion carries a negative charge on nitrogen, electrostatic repulsion prevents a second addition of the Grignard reagent even if excess CH₃MgBr is present.\n2. Subsequent acid hydrolysis (H₃O⁺) protonates and hydrolyzes the imine intermediate into a methyl ketone:\nR-C(CH₃)=N-MgBr + 2 H₂O / H₃O⁺ → R-CO-CH₃ + Mg²⁺ + NH₄⁺ + Br⁻.\nHere, R is PhCH(CH₃)CH₂CH₂-, so the major product is PhCH(CH₃)CH₂CH₂COCH₃ (a methyl ketone).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Treatment of benzonitrile (C₆H₅CN) with methylmagnesium bromide followed by acid hydrolysis yields:",
      option_a: "Acetophenone (C₆H₅COCH₃)",
      option_b: "2-Phenylpropan-2-ol",
      option_c: "Benzoic acid",
      option_d: "Benzylamine",
      correct_option: "A",
      explanation: "Addition of CH₃MgBr to benzonitrile yields an imine magnesium salt, C₆H₅-C(CH₃)=N-MgBr.\nAcid hydrolysis hydrolyzes the imine salt to acetophenone (C₆H₅COCH₃).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2493,
    question: "Assertion (A): CH₃I undergoes SN2 reaction faster than CH₃Cl. Reason (R): Iodine is a better leaving group because of its large size. [NEET 2025]",
    optionA: "A is true but R is false",
    optionB: "A is false but R is true",
    optionC: "Both A and R are true and R is the correct explanation of A",
    optionD: "Both A and R are true but R is not the correct explanation of A",
    correctOption: "C",
    explanation: "In an SN2 substitution reaction, the rate depends heavily on the leaving group ability of the departing halide ion.\n- Assertion (A): CH₃I reacts with nucleophiles via SN2 substantially faster than CH₃Cl. This assertion is true.\n- Reason (R): As the size of the halogen atom increases (Cl < Br < I), the C-X bond length increases (C-I is ~2.14 Å compared to C-Cl at ~1.78 Å), making the C-I bond significantly weaker (bond energy ~213 kJ/mol vs ~328 kJ/mol for C-Cl).\nFurthermore, because iodide ion (I⁻) has a large atomic radius and high polarizability, it can accommodate and disperse negative charge much more effectively, making it a very weak base and an outstanding leaving group.\nThus, both Assertion (A) and Reason (R) are true, and Reason (R) correctly explains Assertion (A).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Assertion (A): Tertiary alkyl halides primarily undergo substitution via the SN1 mechanism rather than SN2. Reason (R): Tertiary carbocations are stabilized by hyperconjugation and steric crowding prevents backside attack in SN2.",
      option_a: "Both A and R are true and R is the correct explanation of A",
      option_b: "Both A and R are true but R is not the correct explanation of A",
      option_c: "A is true but R is false",
      option_d: "A is false but R is true",
      correct_option: "A",
      explanation: "Tertiary alkyl halides undergo rapid ionization because 3° carbocations are stabilized by 9 hyperconjugative α-hydrogens (+I effects), while the three bulky alkyl groups completely block backside attack by nucleophiles.\nBoth Assertion and Reason are true, and Reason is the correct explanation.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in to live API...');
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  if (!loginRes.data || !loginRes.data.token) {
    console.error('Login failed:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.token;
  console.log(`Login successful! Updating ${pyqsData.length} PYQs in Chapter 105 (Haloalkanes & Haloalkenes)...`);

  for (let i = 0; i < pyqsData.length; i++) {
    const item = pyqsData[i];
    console.log(`[${i + 1}/${pyqsData.length}] Updating PYQ ID ${item.id}...`);

    const updatePayload = {
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctOption: item.correctOption,
      explanation: item.explanation,
      similarQuestion: item.similarQuestion
    };

    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, updatePayload);

    if (res.data && res.data.success) {
      console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
    } else {
      console.error(`  -> Failed to update PYQ ${item.id}:`, res);
      process.exit(1);
    }
  }

  console.log(`\n🎉 COMPLETED: ${pyqsData.length}/${pyqsData.length} PYQs in Chapter 105 (Haloalkanes & Haloalkenes) updated live!`);
}

run().catch(console.error);
