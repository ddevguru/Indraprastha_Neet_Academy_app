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

const updates = [
  {
    id: 4250,
    similar: {
      question: "Which of the following pairs of alkenes represents a pair of constitutional (structural) isomers rather than stereoisomers?",
      option_a: "cis-but-2-ene and trans-but-2-ene",
      option_b: "(E)-pent-2-ene and (Z)-pent-2-ene",
      option_c: "1-bromobut-2-ene and 2-bromobut-2-ene",
      option_d: "cis-1,2-dichloroethene and trans-1,2-dichloroethene",
      correct_option: "C",
      explanation: "1. Constitutional (structural) isomers possess the same molecular formula but have different connectivities of atoms (different IUPAC names indicating different positions or carbon skeletons).\n2. In 1-bromobut-2-ene (Br–CH₂–CH=CH–CH₃), bromine is attached to C-1.\n3. In 2-bromobut-2-ene (CH₃–C(Br)=CH–CH₃), bromine is attached to C-2.\n4. Because the atom-to-atom connectivity is different, they are constitutional (positional) isomers.\n5. (In contrast, Options A, B, and D share the same connectivity and differ only in spatial arrangement, representing pairs of geometric stereoisomers).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4251,
    similar: {
      question: "Which of the following organic compounds has NO structural or stereochemical isomers?",
      option_a: "Chloroethane (CH₃CH₂Cl)",
      option_b: "Propane-1-ol (CH₃CH₂CH₂OH)",
      option_c: "Ethanal (CH₃CHO)",
      option_d: "1,2-Dichloroethane (ClCH₂CH₂Cl)",
      correct_option: "A",
      explanation: "1. Chloroethane (C₂H₅Cl) has only two carbon atoms. Both positions on the ethyl group are chemically equivalent (1-chloroethane is the only possible connectivity).\n2. Free rotation around the C–C single bond yields infinite conformations, but it has zero structural isomers and zero stereoisomers.\n3. In contrast:\n   - Propane-1-ol has positional isomer propan-2-ol and functional isomer methoxyethane.\n   - Ethanal (CH₃CHO) has functional isomer ethenol (vinyl alcohol) and oxirane (ethylene oxide).\n   - 1,2-Dichloroethane has positional isomer 1,1-dichloroethane.\n4. Therefore, chloroethane has no isomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4255,
    similar: {
      question: "How many chiral carbon centers are present in a molecule of 2-bromo-3-chlorobutane-1,4-diol?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "B",
      explanation: "1. The condensed formula of 2-bromo-3-chlorobutane-1,4-diol is:\n   HO–CH₂–*CH(Br)–*CH(Cl)–CH₂–OH\n2. Analyzing each carbon atom:\n   - C-1: –CH₂OH (bonded to two identical H atoms, achiral)\n   - C-2: Bonded to –H, –Br, –CH₂OH, and –CH(Cl)CH₂OH (four different groups → chiral center)\n   - C-3: Bonded to –H, –Cl, –CH₂OH, and –CH(Br)CH₂OH (four different groups → chiral center)\n   - C-4: –CH₂OH (bonded to two identical H atoms, achiral)\n3. Therefore, the molecule contains exactly 2 chiral centers.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4258,
    similar: {
      question: "How many optically active stereoisomers exist among all the constitutional isomers of butyl bromide (molecular formula C₄H₉Br)?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "B",
      explanation: "1. The four constitutional isomers of C₄H₉Br are:\n   (i) 1-Bromobutane (n-butyl bromide): CH₃CH₂CH₂CH₂Br (achiral, 0 optically active forms)\n   (ii) 2-Bromobutane (sec-butyl bromide): CH₃–*CH(Br)–CH₂CH₃ (contains 1 chiral center)\n   (iii) 1-Bromo-2-methylpropane (isobutyl bromide): (CH₃)₂CHCH₂Br (achiral)\n   (iv) 2-Bromo-2-methylpropane (tert-butyl bromide): (CH₃)₃CBr (achiral)\n2. Only 2-bromobutane contains a chiral carbon (*CH bonded to –H, –Br, –CH₃, and –CH₂CH₃).\n3. It exists as a pair of non-superimposable enantiomers: (R)-2-bromobutane and (S)-2-bromobutane.\n4. Thus, exactly 2 optically active stereoisomers exist.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4260,
    similar: {
      question: "Which of the following cycloalkanes can exhibit BOTH geometrical (cis-trans) isomerism and optical isomerism?",
      option_a: "1,1-Dimethylcyclopropane",
      option_b: "1,2-Dimethylcyclopropane",
      option_c: "Cyclopentane",
      option_d: "1,1-Dichlorocyclobutane",
      correct_option: "B",
      explanation: "1. In 1,2-dimethylcyclopropane:\n   - The methyl groups can be on the same face of the three-membered ring (cis-isomer) or on opposite faces (trans-isomer), so it exhibits geometrical isomerism.\n2. Stereochemical analysis:\n   - cis-1,2-dimethylcyclopropane has an internal plane of symmetry (σ) passing through C-3 and bisecting the C1–C2 bond; it is an achiral meso compound.\n   - trans-1,2-dimethylcyclopropane lacks a plane of symmetry and inversion center (C₂ point group); it is chiral and exists as a pair of enantiomers ((1R,2R) and (1S,2S)).\n3. Therefore, 1,2-dimethylcyclopropane exhibits both geometrical and optical isomerism.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4261,
    similar: {
      question: "1,4-Dimethylcyclohexane exhibits geometrical isomerism. Which of the following statements about its isomers is correct?",
      option_a: "It exists as cis and trans geometrical isomers, both of which are optically inactive (achiral).",
      option_b: "The trans-isomer is chiral and optically active.",
      option_c: "The cis-isomer has no plane of symmetry.",
      option_d: "It exhibits optical isomerism but no geometrical isomerism.",
      correct_option: "A",
      explanation: "1. In 1,4-dimethylcyclohexane, the two methyl groups can be oriented on the same face of the ring (cis-1,4-dimethylcyclohexane) or on opposite faces (trans-1,4-dimethylcyclohexane), giving two geometrical isomers.\n2. In the planar representation:\n   - The cis-isomer possesses two orthogonal planes of symmetry, making it achiral and optically inactive.\n   - The trans-isomer possesses a plane of symmetry and an inversion center, making it achiral and optically inactive.\n3. Neither isomer possesses chirality. Thus, it exists as cis and trans geometrical isomers, both of which are optically inactive.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4262,
    similar: {
      question: "In the absolute configuration assignment of the anti-inflammatory drug (S)-ibuprofen, what is the correct Cahn-Ingold-Prelog (CIP) priority order of the four substituents attached to the stereocenter (*CH)?",
      option_a: "–COOH > –C₆H₄(i-Bu) > –CH₃ > –H",
      option_b: "–C₆H₄(i-Bu) > –COOH > –CH₃ > –H",
      option_c: "–CH₃ > –COOH > –C₆H₄(i-Bu) > –H",
      option_d: "–COOH > –CH₃ > –C₆H₄(i-Bu) > –H",
      correct_option: "A",
      explanation: "1. The chiral carbon (*C) in ibuprofen is bonded to four groups: –COOH, –C₆H₄(i-Bu) (4-isobutylphenyl), –CH₃, and –H.\n2. Applying CIP priority rules:\n   - –H has atomic number 1 → lowest priority (4).\n   - The other three attached atoms are all carbon:\n     * In –COOH, carbon is bonded to (O, O, O) due to the C=O double bond → highest priority (1).\n     * In the aromatic ring (–C₆H₄–), the attached carbon is bonded to (C, C, C) due to aromatic resonance → priority (2).\n     * In –CH₃, carbon is bonded to (H, H, H) → priority (3).\n3. Therefore, the priority order is: –COOH (1) > –C₆H₄(i-Bu) (2) > –CH₃ (3) > –H (4).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4263,
    similar: {
      question: "How many chiral carbon centers are present in 2,3,4-trichloropentane?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "B",
      explanation: "1. The structure of 2,3,4-trichloropentane is:\n   CH₃–*CH(Cl)–CH(Cl)–*CH(Cl)–CH₃\n2. Analyzing each carbon:\n   - C-1 and C-5: –CH₃ (achiral)\n   - C-2: Bonded to –H, –Cl, –CH₃, and –CH(Cl)CH(Cl)CH₃ (four distinct groups → chiral center)\n   - C-4: Bonded to –H, –Cl, –CH₃, and –CH(Cl)CH(Cl)CH₃ (four distinct groups → chiral center)\n   - C-3: Bonded to –H, –Cl, and two constitutionally identical sec-butyl-like halves (–CH(Cl)CH₃). When C-2 and C-4 have identical configurations (R,R or S,S), C-3 is achiral. When C-2 and C-4 have opposite configurations (R,S), C-3 acts as a pseudoasymmetric center.\n3. Hence, the molecule fundamentally possesses 2 true chiral stereocenters (C-2 and C-4).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4264,
    similar: {
      question: "Which of the following pairs of stereoisomers represents a pair of enantiomers?",
      option_a: "(2R, 3R)-Tartaric acid and (2S, 3S)-Tartaric acid",
      option_b: "(2R, 3R)-Tartaric acid and (2R, 3S)-Tartaric acid",
      option_c: "(2R, 3S)-Tartaric acid and (2S, 3R)-Tartaric acid",
      option_d: "(2S, 3S)-Tartaric acid and (2R, 3S)-Tartaric acid",
      correct_option: "A",
      explanation: "1. Enantiomers are stereoisomers that are non-superimposable mirror images of each other.\n2. For two chiral molecules to be enantiomers, every chiral center must have the opposite absolute configuration: (R) becomes (S) and (S) becomes (R).\n3. Therefore, (2R, 3R)-tartaric acid and (2S, 3S)-tartaric acid have inverted configurations at all stereocenters and are a pair of enantiomers.\n4. (In contrast, (2R,3S)-tartaric acid is a meso compound where the mirror image (2S,3R) is superimposable on itself).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4265,
    similar: {
      question: "A solution containing 10 g of an optically active substance dissolved in 100 mL of water produces an observed optical rotation of +24° in a 2 dm polarimeter tube. If the solution is diluted with water to a final volume of 400 mL, what will be the new observed angle of rotation (α) and the specific rotation ([α]) in the same tube?",
      option_a: "α = +6° and [α] = +120°",
      option_b: "α = +12° and [α] = +60°",
      option_c: "α = +6° and [α] = +24°",
      option_d: "α = +3° and [α] = +120°",
      correct_option: "A",
      explanation: "1. First, calculate the initial concentration (c₁) in g/mL:\n   c₁ = 10 g / 100 mL = 0.10 g/mL\n2. The specific rotation formula is:\n   [α] = α / (l × c)\n   where l is in decimeters (dm) and c is in g/mL.\n   [α] = +24° / (2 dm × 0.10 g/mL) = +120° deg·mL·g⁻¹·dm⁻¹\n3. Since specific rotation ([α]) is an intensive property of the substance, it remains +120° upon dilution.\n4. After diluting to 400 mL, the new concentration is:\n   c₂ = 10 g / 400 mL = 0.025 g/mL\n5. The new observed angle of rotation is:\n   α₂ = [α] × l × c₂ = 120° × 2 dm × 0.025 g/mL = +6.0°\n6. Thus, α = +6° and [α] = +120°.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4266,
    similar: {
      question: "Which of the following compounds is classified as a meso compound due to the presence of an internal plane of symmetry (σ)?",
      option_a: "meso-Tartaric acid ((2R, 3S)-tartaric acid)",
      option_b: "(2R, 3R)-Tartaric acid",
      option_c: "(2S, 3S)-Tartaric acid",
      option_d: "(R)-Lactic acid",
      correct_option: "A",
      explanation: "1. A meso compound is a molecule that possesses two or more chiral centers but is superimposable on its mirror image (achiral) due to internal symmetry.\n2. In (2R, 3S)-tartaric acid, the upper half of the molecule (–CH(OH)COOH) is the exact mirror image of the lower half.\n3. The internal horizontal mirror plane (plane of symmetry, σ) causes internal compensation: the clockwise optical rotation of one chiral center is exactly cancelled by the counter-clockwise rotation of the other.\n4. Consequently, meso-tartaric acid is optically inactive by internal compensation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4267,
    similar: {
      question: "How many acyclic constitutional carbonyl isomers (aldehydes and ketones) are possible for the molecular formula C₄H₈O?",
      option_a: "2 aldehydes and 1 ketone (total 3)",
      option_b: "3 aldehydes and 1 ketone (total 4)",
      option_c: "1 aldehyde and 2 ketones (total 3)",
      option_d: "2 aldehydes and 2 ketones (total 4)",
      correct_option: "A",
      explanation: "1. Molecular formula C₄H₈O has degree of unsaturation (DBE) = 4 + 1 - (8/2) = 1, corresponding to one carbonyl double bond (C=O).\n2. Acyclic Aldehydes (–CHO group):\n   - Butanal: CH₃CH₂CH₂CHO\n   - 2-Methylpropanal: (CH₃)₂CHCHO\n   Total aldehydes = 2.\n3. Acyclic Ketones (–CO– group):\n   - Butan-2-one: CH₃–CO–CH₂CH₃\n   Total ketones = 1.\n4. Therefore, there are 2 aldehydes and 1 ketone, giving a total of 3 carbonyl constitutional isomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4268,
    similar: {
      question: "Which of the following alkenes CANNOT exhibit geometrical (cis-trans) isomerism?",
      option_a: "Prop-1-ene (CH₃–CH=CH₂)",
      option_b: "But-2-ene (CH₃–CH=CH–CH₃)",
      option_c: "Pent-2-ene (CH₃–CH=CH–CH₂CH₃)",
      option_d: "1-Chloroprop-1-ene (CH₃–CH=CH–Cl)",
      correct_option: "A",
      explanation: "1. For an alkene to exhibit geometrical isomerism, restricted rotation must exist around the double bond, and each doubly bonded carbon atom must be attached to two non-identical atoms or groups (Cab=Ccd, where a ≠ b and c ≠ d).\n2. In prop-1-ene (CH₃–CH=CH₂), the terminal carbon (C-1) is bonded to two identical hydrogen atoms.\n3. Exchanging the positions of the two hydrogen atoms produces an identical, superimposable spatial arrangement.\n4. Therefore, prop-1-ene cannot exhibit cis-trans isomerism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4269,
    similar: {
      question: "What is the total number of geometrical stereoisomers for hexa-2,4-diene (CH₃–CH=CH–CH=CH–CH₃)?",
      option_a: "3",
      option_b: "4",
      option_c: "2",
      option_d: "6",
      correct_option: "A",
      explanation: "1. Hexa-2,4-diene has two double bonds with identical terminal methyl groups (symmetrical polyene).\n2. The general formula for the number of geometrical isomers of a symmetrical alkene with an even number of double bonds (n = 2) is:\n   Total isomers = 2^(n-1) + 2^((n/2)-1)\n   Total isomers = 2^(2-1) + 2^((2/2)-1) = 2¹ + 2⁰ = 2 + 1 = 3\n3. The three distinct geometrical isomers are:\n   (i) (2E, 4E)-hexa-2,4-diene (trans, trans)\n   (ii) (2Z, 4Z)-hexa-2,4-diene (cis, cis)\n   (iii) (2E, 4Z)-hexa-2,4-diene (trans, cis), which is identical to (2Z, 4E) due to molecular symmetry.\n4. Thus, exactly 3 geometrical isomers exist.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4270,
    similar: {
      question: "In the Fischer projection of (2R, 3R)-tartaric acid: HOOC–CH(OH)–CH(OH)–COOH, where the carbon chain is placed vertically with C-1 (–COOH) at the top and C-4 (–COOH) at the bottom, what are the positions of the –OH groups at C-2 and C-3?",
      option_a: "–OH at C-2 is on the right, and –OH at C-3 is on the left.",
      option_b: "–OH groups at both C-2 and C-3 are on the right.",
      option_c: "–OH groups at both C-2 and C-3 are on the left.",
      option_d: "–OH at C-2 is on the left, and –OH at C-3 is on the right.",
      correct_option: "A",
      explanation: "1. For C-2 to have the (R) configuration:\n   - Priorities: –OH (1), –CH(OH)COOH (2), –COOH (3), –H (4).\n   - When –OH is on the right and –H is on the left (horizontal): 1 → 2 → 3 is counter-clockwise, and because –H is on a horizontal bond, the result is inverted to (2R).\n2. For C-3 to have the (R) configuration:\n   - Priorities: –OH (1), –CH(OH)COOH (2), –COOH (3), –H (4).\n   - When –OH is on the left and –H is on the right (horizontal): 1 → 2 → 3 is clockwise, and because –H is on a horizontal bond, the result is inverted to (3R).\n3. Therefore, in (2R, 3R)-tartaric acid, the –OH group at C-2 is on the right, while the –OH group at C-3 is on the left.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log("Logging in...");
  const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
  const token = loginRes.token;
  if (!token) {
    console.error("Login failed:", loginRes);
    return;
  }
  console.log("Login successful! Updating Test 108 Part 1 (15 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 108 Part 1 update complete!");
}

run().catch(console.error);
