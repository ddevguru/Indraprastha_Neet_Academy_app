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

const questionsPart2 = [
  {
    id: 4271,
    similarQuestion: {
      question: "Which of the following pairs of compounds represents diastereomers?",
      option_a: "cis-1,2-dimethylcyclopropane and trans-1,2-dimethylcyclopropane",
      option_b: "(2R,3R)-tartaric acid and (2S,3S)-tartaric acid",
      option_c: "Pentan-2-one and pentan-3-one",
      option_d: "Butan-1-ol and butan-2-ol",
      correct_option: "A",
      explanation: "1. Diastereomers are stereoisomers that have the same molecular formula and atomic connectivity but are not mirror images of each other and are non-superimposable.\n2. cis-1,2-dimethylcyclopropane and trans-1,2-dimethylcyclopropane differ in the geometric orientation of their methyl groups across the ring and are non-mirror images; therefore, they are diastereomers.\n3. (2R,3R)-tartaric acid and (2S,3S)-tartaric acid are non-superimposable mirror images of each other, making them enantiomers.\n4. Pentan-2-one / pentan-3-one and butan-1-ol / butan-2-ol are constitutional (positional) isomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4272,
    similarQuestion: {
      question: "Which pair of cyclic compounds represents diastereomers?",
      option_a: "cis-1,3-dimethylcyclohexane and trans-1,3-dimethylcyclohexane",
      option_b: "(R)-lactic acid and (S)-lactic acid",
      option_c: "meso-tartaric acid and its mirror image",
      option_d: "n-butane and isobutane",
      correct_option: "A",
      explanation: "1. Diastereomers are stereoisomers that are not mirror images of one another.\n2. In substituted cycloalkanes, the cis and trans isomers have identical connectivity but distinct spatial geometries that cannot be related by reflection; hence, cis-1,3-dimethylcyclohexane and trans-1,3-dimethylcyclohexane are diastereomers.\n3. (R)-lactic acid and (S)-lactic acid are nonsuperimposable mirror images (enantiomers).\n4. meso-tartaric acid is achiral and identical to its mirror image.\n5. n-butane and isobutane are constitutional chain isomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4273,
    similarQuestion: {
      question: "Consider 2,3-dibromobutane. What is the relationship between (2R,3R)-2,3-dibromobutane and (2R,3S)-2,3-dibromobutane?",
      option_a: "Enantiomers",
      option_b: "Diastereomers",
      option_c: "Identical molecules",
      option_d: "Constitutional isomers",
      correct_option: "B",
      explanation: "1. The two isomers share the exact same molecular formula and atom connectivity.\n2. In (2R,3R)-2,3-dibromobutane, both stereocenters have the (R) configuration, giving a chiral molecule.\n3. In (2R,3S)-2,3-dibromobutane, one stereocenter is inverted while the other is unchanged, yielding an achiral meso form.\n4. Since stereoisomers differing at some but not all stereocenters are not mirror images, they are classified as diastereomers.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4274,
    similarQuestion: {
      question: "Which of the following statements correctly distinguishes resonance contributors from tautomers?",
      option_a: "Resonance structures involve only the redistribution of π electrons and lone pairs without any movement of atomic nuclei, whereas tautomers involve actual migration of an atom (such as H) along with electron rearrangement.",
      option_b: "Resonance structures are distinct isolable compounds in dynamic equilibrium, while tautomers cannot be isolated.",
      option_c: "Resonance contributors differ in the positions of their nuclei, whereas tautomers differ only in electron distribution.",
      option_d: "Resonance structures have different molecular formulas, whereas tautomers share the same molecular formula.",
      correct_option: "A",
      explanation: "1. Resonance contributors are imaginary Lewis structures used to represent delocalization in a single real molecule; atomic nuclei remain strictly stationary while only π or unshared electrons move.\n2. Tautomerism involves the actual relocation of a proton (hydrogen nucleus) and the movement of π bonds, generating distinct, interconvertible constitutional isomers that exist in dynamic equilibrium.\n3. Therefore, resonance involves only electron movement, whereas tautomerism involves migration of an atomic nucleus.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4275,
    similarQuestion: {
      question: "In the stereochemical designation D-(+)-glyceraldehyde, which statement correctly explains the notations?",
      option_a: "'D' specifies the relative spatial configuration with the –OH group on the right in standard Fischer projection, while '(+)' experimentally indicates dextrorotation.",
      option_b: "'D' indicates that the compound rotates plane-polarized light clockwise, while '(+)' denotes the Fischer configuration.",
      option_c: "'D' indicates that the –OH group is on the left in Fischer projection, while '(+)' indicates levorotation.",
      option_d: "Both 'D' and '(+)' indicate that the compound rotates plane-polarized light in the counterclockwise direction.",
      correct_option: "A",
      explanation: "1. The capital letter 'D' represents the relative configuration of the chiral center in standard Fischer projection (with the most oxidized carbon C1 at the top), indicating that the –OH group lies on the right side at the bottom-most chiral center.\n2. The sign '(+)' indicates the optical activity of the molecule determined experimentally, showing that it rotates plane-polarized light in the dextrorotatory (clockwise) direction.\n3. D and L designations represent spatial configurations and do not inherently determine the sign of optical rotation (+ or –).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4276,
    similarQuestion: {
      question: "Which of the following stereoisomers of butane-2,3-diol is optically inactive due to internal compensation (meso compound)?",
      option_a: "(2R,3S)-butane-2,3-diol",
      option_b: "(2R,3R)-butane-2,3-diol",
      option_c: "(2S,3S)-butane-2,3-diol",
      option_d: "None of the above",
      correct_option: "A",
      explanation: "1. A meso compound contains two or more stereocenters with identical sets of substituents and possesses an internal plane of symmetry (or inversion center) that renders the molecule achiral and optically inactive.\n2. In (2R,3S)-butane-2,3-diol, C2 and C3 carry identical substituents (–H, –OH, –CH₃), but one center is (R) and the other is (S).\n3. The optical rotation caused by the (2R) center is cancelled by the equal and opposite rotation of the (3S) center through internal compensation.\n4. Hence, (2R,3S)-butane-2,3-diol is the meso isomer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4278,
    similarQuestion: {
      question: "Which of the following compounds can exist in an optically inactive meso form?",
      option_a: "2,3-dichlorobutane",
      option_b: "2-chlorobutane",
      option_c: "2,3-dichloropentane",
      option_d: "2-bromobutane",
      correct_option: "A",
      explanation: "1. For a molecule to exist as a meso stereoisomer, it must possess two or more chiral centers with identical sets of substituents, allowing an internal plane of symmetry.\n2. 2,3-dichlorobutane has two chiral carbons (C2 and C3), each attached to –H, –Cl, –CH₃, and –CH(Cl)CH₃. The (2R,3S) isomer has an internal plane of symmetry, making it meso and achiral.\n3. 2-chlorobutane and 2-bromobutane have only one chiral center and cannot form a meso isomer.\n4. In 2,3-dichloropentane, C2 and C3 have different terminal groups (–CH₃ versus –CH₂CH₃), so no internal symmetry plane can exist.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4280,
    similarQuestion: {
      question: "The lowest molecular weight acyclic alkane that exhibits optical activity is:",
      option_a: "3-methylhexane",
      option_b: "2-methylbutane",
      option_c: "2,3-dimethylbutane",
      option_d: "2,2-dimethylbutane",
      correct_option: "A",
      explanation: "1. For an acyclic alkane to exhibit optical activity, it must possess at least one chiral center (a carbon bonded to four different groups).\n2. The four smallest distinct groups in an acyclic alkane are –H (mass 1), –CH₃ (mass 15), –CH₂CH₃ (mass 29), and –CH₂CH₂CH₃ (mass 43).\n3. Assembling these four groups around a single carbon gives 3-methylhexane, CH₃–CH₂–CH(CH₃)–CH₂CH₂CH₃ (molecular formula C₇H₁₆, molar mass = 100 g/mol).\n4. Alkanes with fewer than 7 carbon atoms cannot contain four different acyclic groups on a single carbon.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4291,
    similarQuestion: {
      question: "Among the five isomeric hexanes (C₆H₁₄), which isomer produces only two monochloro derivatives upon free-radical photochemical chlorination?",
      option_a: "2,3-dimethylbutane",
      option_b: "n-hexane",
      option_c: "2-methylpentane",
      option_d: "3-methylpentane",
      correct_option: "A",
      explanation: "1. The number of monochloro constitutional isomers depends on the number of non-equivalent sets of hydrogen atoms in the alkane.\n2. 2,3-dimethylbutane, (CH₃)₂CH–CH(CH₃)₂, has high symmetry with only two distinct types of hydrogen:\n   - 12 equivalent primary hydrogens (giving 1-chloro-2,3-dimethylbutane)\n   - 2 equivalent tertiary hydrogens (giving 2-chloro-2,3-dimethylbutane)\n3. Thus, it forms exactly 2 monochlorinated constitutional isomers.\n4. In contrast, n-hexane gives 3, 3-methylpentane gives 4, and 2-methylpentane gives 5 monochloro isomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4292,
    similarQuestion: {
      question: "How many pairs of enantiomers (chiral products) are formed upon monochlorination of 2-methylbutane?",
      option_a: "2",
      option_b: "1",
      option_c: "3",
      option_d: "4",
      correct_option: "A",
      explanation: "1. Free-radical monochlorination of 2-methylbutane, CH₃–CH(CH₃)–CH₂–CH₃, yields four constitutional isomers:\n   - ClCH₂–CH(CH₃)–CH₂CH₃: C2 is a chiral center; exists as 1 pair of enantiomers ((R) and (S)).\n   - CH₃–C(Cl)(CH₃)–CH₂CH₃: achiral (no chiral centers).\n   - CH₃–CH(CH₃)–CH(Cl)–CH₃: C3 is a chiral center; exists as 1 pair of enantiomers ((R) and (S)).\n   - (CH₃)₂CH–CH₂–CH₂Cl: achiral (no chiral centers).\n2. Thus, exactly 2 pairs of enantiomers (4 optically active stereoisomers in total) are formed.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4293,
    similarQuestion: {
      question: "Which of the following statements correctly describes the relationship between the keto form and enol form of pentan-2-one?",
      option_a: "They are tautomers in dynamic equilibrium, differing in both atomic connectivity and electron distribution.",
      option_b: "They are resonance contributors of a single hybrid molecule.",
      option_c: "They are enantiomers of each other.",
      option_d: "They are conformational isomers interconvertible by single bond rotation without breaking bonds.",
      correct_option: "A",
      explanation: "1. Keto-enol pairs involve the migration of an α-hydrogen atom to the carbonyl oxygen with simultaneous displacement of a π bond.\n2. Because chemical bonds are broken and reformed, altering atomic positions, keto and enol structures represent distinct constitutional isomers (tautomers) that exist in dynamic equilibrium.\n3. Resonance structures, in contrast, do not involve any displacement of atomic nuclei, and conformers do not involve bond breaking.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4294,
    similarQuestion: {
      question: "What is the total number of stereoisomers possible for the symmetrical molecule CH₃–CH(OH)–CH=CH–CH(OH)–CH₃?",
      option_a: "6",
      option_b: "4",
      option_c: "8",
      option_d: "2",
      correct_option: "A",
      explanation: "1. The molecule has two identical chiral centers (C2 and C5) and one central carbon-carbon double bond (C3=C4) that exhibits geometrical isomerism.\n2. When the central double bond is in the trans (E) configuration:\n   - (2R,5R) and (2S,5S) form a pair of enantiomers (2 isomers).\n   - (2R,5S) has an internal plane of symmetry and is a meso form (1 isomer).\n   Total trans isomers = 3.\n3. When the central double bond is in the cis (Z) configuration:\n   - (2R,5R) and (2S,5S) form a pair of enantiomers (2 isomers).\n   - (2R,5S) has an internal plane of symmetry and is a meso form (1 isomer).\n   Total cis isomers = 3.\n4. Summing both configurations gives 3 + 3 = 6 total stereoisomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4295,
    similarQuestion: {
      question: "In the staggered Newman projection along the C2–C3 bond of 2,2-dimethylbutane, which groups are attached to the front carbon (C2) and back carbon (C3)?",
      option_a: "C2 has three –CH₃ groups, while C3 has two –H atoms and one –CH₃ group.",
      option_b: "C2 has two –CH₃ and one –H, while C3 has three –H atoms.",
      option_c: "C2 has one –CH₃ and two –H, while C3 has three –CH₃ groups.",
      option_d: "C2 has two –CH₂CH₃ groups, while C3 has two –CH₃ groups.",
      correct_option: "A",
      explanation: "1. The structure of 2,2-dimethylbutane is (CH₃)₃C–CH₂–CH₃.\n2. Carbon-2 (C2) is a quaternary carbon bonded to three methyl groups (–CH₃) and to carbon-3.\n3. Carbon-3 (C3) is a secondary carbon bonded to two hydrogen atoms (–H), carbon-4 (which is a –CH₃ group), and to carbon-2.\n4. Therefore, viewing along the C2–C3 bond reveals three –CH₃ groups on C2 and two –H atoms along with one –CH₃ group on C3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4296,
    similarQuestion: {
      question: "Two stereoisomers with two chiral centers have configurations (2R,3R) and (2S,3S). What is the stereochemical relationship between them?",
      option_a: "Enantiomers",
      option_b: "Diastereomers",
      option_c: "Meso forms",
      option_d: "Structural isomers",
      correct_option: "A",
      explanation: "1. Inverting all chiral centers in a molecule ((2R,3R) becoming (2S,3S)) produces its non-superimposable mirror image.\n2. Non-superimposable mirror image stereoisomers are defined as enantiomers.\n3. If only one chiral center were inverted while the other remained identical (such as (2R,3R) and (2R,3S)), the isomers would be diastereomers.\n4. Therefore, (2R,3R) and (2S,3S) are enantiomers.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.token;
    console.log('Logged in successfully, token received.');

    for (const q of questionsPart2) {
      const res = await put(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${q.id}`,
        JSON.stringify({ similarQuestion: q.similarQuestion }),
        token
      );
      console.log(`Updated Test Question ID ${q.id}: ${res.success ? 'SUCCESS' : JSON.stringify(res)}`);
    }
    console.log('All 14 questions of Test 108 Part 2 updated successfully!');
  } catch (err) {
    console.error('Error updating questions:', err);
  }
}

run();
