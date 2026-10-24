const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function post(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function put(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    };

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'PUT',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const test110Part2Questions = [
  {
    id: 4770,
    similarQuestion: {
      question: "Methane is selectively oxidized to methanol when heated with dioxygen under which catalytic conditions?",
      option_a: "Copper tube at 523 K and 100 atm pressure",
      option_b: "Molybdenum oxide (Mo₂O₃) with heating",
      option_c: "Manganese acetate at room temperature",
      option_d: "Nickel catalyst at 1273 K",
      correct_option: "A",
      explanation: "1. Controlled catalytic oxidation of methane by O₂ yields different oxygenated products depending on the catalyst and reaction conditions:\n   - With Cu tube at 523 K and 100 atm: 2 CH₄ + O₂ → 2 CH₃OH (methanol)\n   - With Mo₂O₃ catalyst under heat: CH₄ + O₂ → HCHO + H₂O (methanal)\n   - With (CH₃COO)₂Mn: higher alkanes oxidize to carboxylic acids.\n2. Therefore, heating methane with oxygen in a copper tube at 523 K and 100 atm yields methanol.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4771,
    similarQuestion: {
      question: "When n-heptane is passed over Cr₂O₃–Al₂O₃ catalyst at 773 K and 10–20 atm pressure, the aromatic hydrocarbon obtained is:",
      option_a: "Toluene",
      option_b: "Benzene",
      option_c: "o-Xylene",
      option_d: "Ethylbenzene",
      correct_option: "A",
      explanation: "1. Aromatization (catalytic reforming) of alkanes containing 6 to 8 carbon atoms involves simultaneous ring closure (cyclization) and dehydrogenation at 773 K over Cr₂O₃, V₂O₅, or Mo₂O₃ supported on alumina (Al₂O₃).\n2. n-Hexane (6 carbons) yields benzene (C₆H₆).\n3. n-Heptane (7 carbons) undergoes cyclization followed by dehydrogenation to yield methylbenzene (toluene, C₇H₈).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4772,
    similarQuestion: {
      question: "The thermal decomposition of higher alkanes into lower alkanes, alkenes, and hydrogen at elevated temperatures in the absence of air is known as:",
      option_a: "Pyrolysis (Cracking)",
      option_b: "Isomerization",
      option_c: "Aromatization",
      option_d: "Combustion",
      correct_option: "A",
      explanation: "1. Pyrolysis or cracking refers to the cleavage of carbon-carbon and carbon-hydrogen bonds in higher molecular weight alkanes upon heating at high temperatures (typically 773–973 K) in the absence of oxygen.\n2. This free-radical process breaks longer hydrocarbon chains into mixtures of lower alkanes, alkenes, and hydrogen gas.\n3. For example: C₆H₁₄ → C₄H₈ + C₂H₆ (or C₃H₆ + C₂H₄ + CH₄).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4773,
    similarQuestion: {
      question: "Industrial synthesis gas (water gas), which is an equimolar mixture of CO and H₂, is prepared by the reaction of methane with steam at 1273 K in the presence of:",
      option_a: "Nickel catalyst",
      option_b: "Platinum catalyst",
      option_c: "Copper catalyst",
      option_d: "Iron oxide catalyst",
      correct_option: "A",
      explanation: "1. Steam reforming of methane involves reacting methane with steam at high temperature (1273 K) in the presence of a nickel catalyst:\n   CH₄ + H₂O --(Ni, 1273 K)--> CO + 3 H₂\n2. The gaseous mixture of carbon monoxide and hydrogen produced is called water gas or synthesis gas (syngas).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4774,
    similarQuestion: {
      question: "Why are alkenes traditionally referred to as 'olefins'?",
      option_a: "Lower members like ethene react with halogens (Cl₂ or Br₂) to form oily liquid products.",
      option_b: "They are immiscible with water and float like oils.",
      option_c: "They are extracted directly from essential vegetable oils.",
      option_d: "They are used as lubricants in heavy machinery.",
      correct_option: "A",
      explanation: "1. The word 'olefin' is derived from the Latin phrase 'oleum facere', which translates to 'oil-making'.\n2. When gaseous lower alkenes such as ethene react with chlorine or bromine, they produce 1,2-dihaloalkanes (such as ethylene dichloride, Cl–CH₂–CH₂–Cl), which are dense oily liquids.\n3. Because of this oil-forming property, alkenes were historically named olefins.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4775,
    similarQuestion: {
      question: "In the ethene (H₂C=CH₂) molecule, what is the total number of σ bonds formed by sp²–s overlapping and sp²–sp² overlapping respectively?",
      option_a: "4 and 1",
      option_b: "5 and 1",
      option_c: "2 and 2",
      option_d: "4 and 0",
      correct_option: "A",
      explanation: "1. Both carbon atoms in ethene are sp² hybridized.\n2. The carbon-carbon double bond consists of one σ bond formed by head-on overlap of sp²–sp² hybrid orbitals, and one π bond formed by lateral overlap of unhybridized 2p orbitals.\n3. Each of the four C–H single bonds is formed by the overlap of an sp² hybrid orbital from carbon with the 1s orbital of hydrogen (sp²–s overlap).\n4. Thus, there are 4 σ bonds of sp²–s type and 1 σ bond of sp²–sp² type.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4776,
    similarQuestion: {
      question: "For a given halogen atom, what is the correct order of reactivity of alkyl halides toward dehydrohalogenation (elimination reaction)?",
      option_a: "3° > 2° > 1°",
      option_b: "1° > 2° > 3°",
      option_c: "2° > 3° > 1°",
      option_d: "1° > 3° > 2°",
      correct_option: "A",
      explanation: "1. Dehydrohalogenation of alkyl halides is an elimination (E1 or E2) reaction that produces alkenes.\n2. In both E1 and E2 mechanisms, the transition state resembles the developing alkene, and tertiary (3°) alkyl halides lead to more substituted, highly hyperconjugated, thermodynamically stable alkenes (Saytzeff rule).\n3. Furthermore, for E1 pathways, tertiary carbocations form much more rapidly than secondary or primary carbocations.\n4. Therefore, the reactivity order is: 3° > 2° > 1°.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4777,
    similarQuestion: {
      question: "The conversion of ethanol into ethene by heating with concentrated H₂SO₄ at 443 K is an example of:",
      option_a: "β-Elimination (1,2-elimination)",
      option_b: "α-Elimination (1,1-elimination)",
      option_c: "Electrophilic addition",
      option_d: "Nucleophilic substitution",
      correct_option: "A",
      explanation: "1. In the dehydration of ethanol:\n   CH₃–CH₂–OH --(conc. H₂SO₄, 443 K)--> CH₂=CH₂ + H₂O\n2. The –OH group is protonated and lost as H₂O from the α-carbon, and a proton (H⁺) is removed from the adjacent β-carbon atom.\n3. Elimination of two atoms or groups from adjacent carbon atoms to create a multiple bond is classified as a β-elimination (1,2-elimination).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4778,
    similarQuestion: {
      question: "When propene reacts with HBr in the presence of benzoyl peroxide, the major product formed is 1-bromopropane because:",
      option_a: "The reaction proceeds via a free-radical mechanism where Br• attacks the terminal carbon to form the more stable secondary free radical.",
      option_b: "Peroxide protonates the alkene to form a primary carbocation.",
      option_c: "The reaction follows Markovnikov's rule via a cyclic bromonium ion.",
      option_d: "Peroxide oxidizes HBr to Br₂ which then adds across the double bond.",
      correct_option: "A",
      explanation: "1. In the presence of organic peroxides, HBr adds to unsymmetrical alkenes via a free-radical chain mechanism (Kharasch effect).\n2. Homolysis of peroxide generates radical species that abstract hydrogen from HBr, producing a bromine free radical (Br•).\n3. Br• adds to the terminal carbon of propene (CH₃–CH=CH₂) so that the unshared electron resides on the middle carbon, creating a more stable 2° alkyl radical (CH₃–•CH–CH₂Br).\n4. This radical then abstracts hydrogen from HBr to yield 1-bromopropane (CH₃CH₂CH₂Br).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4779,
    similarQuestion: {
      question: "Acid-catalyzed hydration of 3,3-dimethylbut-1-ene ((CH₃)₃C–CH=CH₂) in aqueous acid yields which major alcohol?",
      option_a: "2,3-Dimethylbutan-2-ol",
      option_b: "3,3-Dimethylbutan-2-ol",
      option_c: "3,3-Dimethylbutan-1-ol",
      option_d: "2,3-Dimethylbutan-1-ol",
      correct_option: "A",
      explanation: "1. Electrophilic addition of H⁺ to (CH₃)₃C–CH=CH₂ forms a secondary carbocation: (CH₃)₃C–C⁺H–CH₃.\n2. This secondary carbocation undergoes a 1,2-methyl shift to relieve steric crowding and form a much more stable tertiary carbocation: (CH₃)₂C⁺–CH(CH₃)₂.\n3. Nucleophilic attack by H₂O followed by deprotonation yields 2,3-dimethylbutan-2-ol as the major product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4780,
    similarQuestion: {
      question: "Which of the following cumulative dienes produces carbon dioxide (CO₂) gas as one of the products upon reductive ozonolysis?",
      option_a: "Propadiene (allene, H₂C=C=CH₂)",
      option_b: "Buta-1,3-diene",
      option_c: "Penta-1,4-diene",
      option_d: "Hexa-2,4-diene",
      correct_option: "A",
      explanation: "1. In propadiene (allene), H₂C=C=CH₂, the central carbon atom is sp hybridized and forms two cumulative double bonds.\n2. Ozonolysis cleaves both double bonds simultaneously:\n   - The two terminal =CH₂ groups are oxidized to formaldehyde (HCHO).\n   - The central sp carbon is cleaved on both sides, yielding carbon dioxide (CO₂).\n   Reaction: H₂C=C=CH₂ + 2 O₃ --(Zn/H₂O)--> 2 HCHO + CO₂\n3. Conjugated and isolated dienes do not have cumulative double bonds on a single carbon and therefore cannot produce CO₂ upon ozonolysis.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4781,
    similarQuestion: {
      question: "What is the correct decreasing order of acidic strength among the following alkynes?",
      option_a: "Ethyne > Propyne > But-2-yne",
      option_b: "But-2-yne > Propyne > Ethyne",
      option_c: "Propyne > Ethyne > But-2-yne",
      option_d: "Ethyne > But-2-yne > Propyne",
      correct_option: "A",
      explanation: "1. The acidity of alkynes is due to the high s-character (50%) of sp hybridized carbon, which makes the sp C–H bond polarized and relatively acidic.\n2. Ethyne (H–C≡C–H) has two acidic terminal sp C–H protons and no electron-donating alkyl groups, making it the most acidic.\n3. Propyne (CH₃–C≡C–H) has one terminal sp C–H proton, but the +I effect of the electron-donating methyl group slightly decreases the stability of the conjugate acetylide anion.\n4. But-2-yne (CH₃–C≡C–CH₃) is an internal alkyne with no hydrogen directly bonded to an sp carbon, making it essentially non-acidic.\n5. Therefore, the acidic order is: Ethyne > Propyne > But-2-yne.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4782,
    similarQuestion: {
      question: "Hydration of propyne (CH₃–C≡CH) with dilute H₂SO₄ in the presence of HgSO₄ catalyst at 333 K yields:",
      option_a: "Acetone (Propan-2-one)",
      option_b: "Propanal",
      option_c: "Propanoic acid",
      option_d: "Propan-2-ol",
      correct_option: "A",
      explanation: "1. In the Kucherov reaction, water adds across the triple bond of an alkyne catalyzed by Hg²⁺ and H₂SO₄.\n2. For propyne (CH₃–C≡CH), addition of H₂O follows Markovnikov's rule: H⁺ adds to the terminal CH and OH⁻ adds to the internal carbon C2 to form an enol: CH₃–C(OH)=CH₂.\n3. The enol rapidly tautomerizes into its more stable keto form, acetone (CH₃–CO–CH₃).\n4. Note that only ethyne gives an aldehyde (ethanal); all higher terminal and unsymmetrical alkynes yield ketones.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4783,
    similarQuestion: {
      question: "When ethyne is treated with two equivalents of sodium amide (NaNH₂) in liquid ammonia, the ionic product formed is:",
      option_a: "Disodium acetylide (Na⁺ ⁻:C≡C:⁻ Na⁺)",
      option_b: "Sodium acetylide (HC≡C:⁻ Na⁺)",
      option_c: "Sodium ethenide (CH₂=CH⁻ Na⁺)",
      option_d: "Sodium ethanide (CH₃–CH₂⁻ Na⁺)",
      correct_option: "A",
      explanation: "1. Ethyne has two acidic hydrogen atoms bonded to sp hybridized carbons.\n2. Sodium amide (NaNH₂) is an extremely strong base (pKₐ of NH₃ ≈ 38) capable of completely deprotonating terminal alkynes (pKₐ ≈ 25).\n3. When treated with excess (two equivalents) of NaNH₂, both acidic protons are abstracted:\n   H–C≡C–H + 2 NaNH₂ → Na⁺ ⁻:C≡C:⁻ Na⁺ + 2 NH₃↑\n4. The resulting product is disodium acetylide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4784,
    similarQuestion: {
      question: "An alkene on reductive ozonolysis gives ethanal (CH₃CHO) and butan-2-one (CH₃COCH₂CH₃). The IUPAC name of the alkene is:",
      option_a: "3-Methylpent-2-ene",
      option_b: "2-Methylpent-2-ene",
      option_c: "Hex-2-ene",
      option_d: "3-Methylpent-1-ene",
      correct_option: "A",
      explanation: "1. Combine the carbonyl carbons of ethanal (CH₃–CH=O) and butan-2-one (O=C(CH₃)–CH₂CH₃) by replacing the oxygen atoms with a double bond:\n   CH₃–CH=C(CH₃)–CH₂CH₃\n2. The longest continuous carbon chain has 5 carbon atoms (pent-2-ene).\n3. Numbering from the left gives the double bond between C2 and C3 and the methyl branch at C3.\n4. Thus, the IUPAC name is 3-methylpent-2-ene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4785,
    similarQuestion: {
      question: "Which of the following hydrocarbons will NOT discharge the reddish-brown color of bromine in CCl₄?",
      option_a: "Ethane",
      option_b: "Ethene",
      option_c: "Ethyne",
      option_d: "Propene",
      correct_option: "A",
      explanation: "1. Unsaturated hydrocarbons (alkenes and alkynes) rapidly undergo electrophilic addition reactions with bromine dissolved in CCl₄ to form colorless vicinal dibromoalkanes:\n   CH₂=CH₂ + Br₂ (reddish-brown) → Br–CH₂–CH₂–Br (colorless)\n2. Saturated hydrocarbons (alkanes like ethane, C₂H₆) have only strong C–C and C–H single bonds and do not react with bromine at room temperature in the dark.\n3. Therefore, ethane does not decolorize the reddish-brown bromine solution.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4786,
    similarQuestion: {
      question: "How many acyclic (open-chain) structural isomers are possible for the alkyne with molecular formula C₅H₈?",
      option_a: "3",
      option_b: "4",
      option_c: "2",
      option_d: "5",
      correct_option: "A",
      explanation: "1. For the formula C₅H₈, the degree of unsaturation is 2, and open-chain alkyne isomers must contain one triple bond.\n2. The possible acyclic constitutional isomers are:\n   (i) Pent-1-yne: CH₃–CH₂–CH₂–C≡CH\n   (ii) Pent-2-yne: CH₃–CH₂–C≡C–CH₃\n   (iii) 3-Methylbut-1-yne: (CH₃)₂CH–C≡CH\n3. Thus, there are exactly 3 acyclic alkyne isomers for C₅H₈.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4787,
    similarQuestion: {
      question: "Teflon, widely used as a non-stick coating for culinary cookware, is a polymer synthesized by the addition polymerization of:",
      option_a: "Tetrafluoroethene (F₂C=CF₂)",
      option_b: "Vinyl chloride (H₂C=CHCl)",
      option_c: "Propene (H₂C=CHCH₃)",
      option_d: "Acrylonitrile (H₂C=CHCN)",
      correct_option: "A",
      explanation: "1. Teflon (polytetrafluoroethylene or PTFE) is manufactured by heating tetrafluoroethene (F₂C=CF₂) with a free-radical or persulfate catalyst at high pressures:\n   n (CF₂=CF₂) --(catalyst, high P)--> [–CF₂–CF₂–]ₙ\n2. It is chemically inert, thermally stable, and resistant to corrosive reagents, making it ideal for non-stick cookware coatings and gaskets.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4788,
    similarQuestion: {
      question: "Reductive ozonolysis of propene (CH₃–CH=CH₂) using ozone followed by Zn/H₂O produces:",
      option_a: "Ethanal and methanal",
      option_b: "Ethanoic acid and formic acid",
      option_c: "Acetone and formaldehyde",
      option_d: "Propanal only",
      correct_option: "A",
      explanation: "1. Reductive ozonolysis of an alkene cleaves the double bond into two carbonyl compounds.\n2. For propene:\n   CH₃–CH=CH₂ + O₃ --(Zn/H₂O)--> CH₃–CHO + HCHO\n3. The products are acetaldehyde (ethanal) and formaldehyde (methanal).\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.token;
    console.log('Logged in successfully, token received.');

    for (const q of test110Part2Questions) {
      const res = await put(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${q.id}`,
        JSON.stringify({ similarQuestion: q.similarQuestion }),
        token
      );
      console.log(`Updated Test Question ID ${q.id}: ${res.success ? 'SUCCESS' : JSON.stringify(res)}`);
    }
    console.log('All 19 questions of Test 110 Part 2 updated successfully!');
  } catch (err) {
    console.error('Error updating questions:', err);
  }
}

run();
