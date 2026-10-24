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

const test149Questions = [
  {
    id: 4871,
    similarQuestion: {
      question: "Given below are two statements regarding IUPAC nomenclature of organic compounds:\nStatement I: The IUPAC name of the compound CH₃–CH(OH)–CH₂–CHO is 3-hydroxybutanal.\nStatement II: The IUPAC name of the compound CH₃–CO–CH₂–CH₂–COOH is 4-oxopentanoic acid.\nIn light of the above statements, choose the most appropriate answer from the options given below:",
      option_a: "Statement I is correct but Statement II is incorrect",
      option_b: "Statement I is incorrect but Statement II is correct",
      option_c: "Both Statement I and Statement II are correct",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "C",
      explanation: "1. According to IUPAC rules of priority for principal functional groups: –COOH > –CHO > >C=O > –OH > –NH₂ > –C=C– > –C≡C–.\n2. In Statement I: In CH₃–CH(OH)–CH₂–CHO, the aldehyde group (–CHO) has higher priority than the hydroxyl group (–OH). The aldehyde carbon is numbered C1: C1(HO–C) – C2(H₂) – C3(H,OH) – C4(H₃). The –OH group at C3 acts as a prefix 'hydroxy'. Thus, the IUPAC name is 3-hydroxybutanal. Hence, Statement I is correct.\n3. In Statement II: In CH₃–CO–CH₂–CH₂–COOH, the carboxylic acid group (–COOH) has higher priority than the keto group (>C=O). Numbering begins from the carboxyl carbon: C1(OOH) – C2(H₂) – C3(H₂) – C4(=O) – C5(H₃). The keto group at C4 is designated as 'oxo' on a 5-carbon pentanoic acid parent. Hence, the IUPAC name is 4-oxopentanoic acid. Thus, Statement II is correct.\n4. Both Statement I and Statement II are correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4872,
    similarQuestion: {
      question: "The addition of hydrogen chloride (HCl) to 2-methylprop-1-ene [(CH₃)₂C=CH₂] to yield 2-chloro-2-methylpropane [(CH₃)₃CCl] in the absence of peroxides proceeds via which type of reaction mechanism?",
      option_a: "Nucleophilic addition",
      option_b: "Electrophilic addition",
      option_c: "Electrophilic aromatic substitution",
      option_d: "Free radical addition",
      correct_option: "B",
      explanation: "1. Alkenes contain an electron-rich carbon-carbon double bond (π bond).\n2. In the reaction of 2-methylprop-1-ene with HCl, the electrophilic proton (H⁺) attacks the π electron cloud in the initial, rate-determining step.\n3. Protonation follows Markovnikov's rule to produce the more stable tertiary carbocation [(CH₃)₃C⁺].\n4. In the subsequent rapid step, the chloride nucleophile (Cl⁻) attacks the tertiary carbocation to yield 2-chloro-2-methylpropane [(CH₃)₃CCl].\n5. Because the reaction is initiated by an electrophile adding across an unsaturated π bond, it is an electrophilic addition reaction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4873,
    similarQuestion: {
      question: "Which of the following pairs of organic compounds does NOT represent functional isomerism?",
      option_a: "Ethanoic acid [CH₃COOH] and methyl formate [HCOOCH₃]",
      option_b: "Propan-1-ol [CH₃CH₂CH₂OH] and methoxyethane [CH₃OCH₂CH₃]",
      option_c: "Propan-1-ol [CH₃CH₂CH₂OH] and propan-2-ol [CH₃CH(OH)CH₃]",
      option_d: "Propanenitrile [CH₃CH₂CN] and ethyl isocyanide [CH₃CH₂NC]",
      correct_option: "C",
      explanation: "1. Functional isomers are structural isomers having the exact same molecular formula but different functional groups.\n2. In Option A: Ethanoic acid (carboxylic acid) and methyl formate (ester) share the molecular formula C₂H₄O₂ but possess different functional groups (functional isomers).\n3. In Option B: Propan-1-ol (alcohol) and methoxyethane (ether) share C₃H₈O but have different functional groups (functional isomers).\n4. In Option D: Propanenitrile (nitrile) and ethyl isocyanide (isonitrile) share C₃H₅N but have different functional groups (functional isomers).\n5. In Option C: Propan-1-ol and propan-2-ol share the molecular formula C₃H₈O and have the same functional group (–OH alcohol). They differ only in the position of the –OH group along the 3-carbon chain (C1 vs C2). Hence, they are position isomers, not functional isomers.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4874,
    similarQuestion: {
      question: "Which of the following pairs of compounds represents metamers?",
      option_a: "Diethyl ether [CH₃CH₂–O–CH₂CH₃] and methyl propyl ether [CH₃–O–CH₂CH₂CH₃]",
      option_b: "Pentanal [CH₃(CH₂)₃CHO] and pentan-2-one [CH₃COCH₂CH₂CH₃]",
      option_c: "But-1-ene [CH₂=CHCH₂CH₃] and but-2-ene [CH₃CH=CHCH₃]",
      option_d: "Propan-1-amine [CH₃CH₂CH₂NH₂] and propan-2-amine [CH₃CH(NH₂)CH₃]",
      correct_option: "A",
      explanation: "1. Metamerism arises due to different alkyl chain distributions attached to the same polyvalent functional group.\n2. Both diethyl ether and methyl propyl ether share the molecular formula C₄H₁₀O and contain the divalent oxygen functional group (–O–). In diethyl ether, two ethyl groups are attached, while in methyl propyl ether, a methyl and a propyl group are attached to the oxygen atom. Thus, they are metamers.\n3. Pentanal and pentan-2-one are functional isomers.\n4. But-1-ene and but-2-ene are position isomers.\n5. Propan-1-amine and propan-2-amine are position isomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4875,
    similarQuestion: {
      question: "When 3,3-dimethylbutan-2-ol [(CH₃)₃C–CH(OH)–CH₃] is heated with concentrated H₂SO₄, acid-catalyzed dehydration occurs accompanied by carbocation rearrangement. What is the major alkene product formed?",
      option_a: "3,3-Dimethylbut-1-ene [(CH₃)₃C–CH=CH₂]",
      option_b: "2,3-Dimethylbut-2-ene [(CH₃)₂C=C(CH₃)₂]",
      option_c: "2,3-Dimethylbut-1-ene [CH₂=C(CH₃)–CH(CH₃)₂]",
      option_d: "2-Methylpent-2-ene [(CH₃)₂C=CHCH₂CH₃]",
      correct_option: "B",
      explanation: "1. Protonation of the hydroxyl group of 3,3-dimethylbutan-2-ol followed by elimination of H₂O generates a secondary carbocation: (CH₃)₃C–CH⁺–CH₃.\n2. To achieve greater thermodynamic stability, a 1,2-methide shift occurs from the adjacent quaternary carbon to the carbocation center, generating a more stable tertiary carbocation: (CH₃)₂C⁺–CH(CH₃)₂.\n3. According to Zaitsev's rule, elimination of a proton from the adjacent C3 tertiary carbon yields the most highly substituted and thermodynamically stable alkene.\n4. The resulting product is 2,3-dimethylbut-2-ene [(CH₃)₂C=C(CH₃)₂], which has 12 hyperconjugative α-hydrogens.\n5. Thus, 2,3-dimethylbut-2-ene is the major product.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4876,
    similarQuestion: {
      question: "Match the organic conversion listed in List-I with its corresponding named reaction in List-II:\nList-I:\nA. CH₃COCl + H₂ -(Pd-BaSO₄, quinoline)→ CH₃CHO\nB. C₆H₆ + CO + HCl -(anhydrous AlCl₃ / CuCl)→ C₆H₅CHO\nC. C₆H₅CH₃ + CrO₂Cl₂ -(CS₂)→ Intermediate -(H₃O⁺)→ C₆H₅CHO\nD. CH₃C≡N + SnCl₂ + HCl → Intermediate -(H₃O⁺)→ CH₃CHO\n\nList-II:\nI. Gattermann-Koch reaction\nII. Stephen reaction\nIII. Rosenmund reduction\nIV. Etard reaction\n\nChoose the correct match from the options below:",
      option_a: "A-III, B-I, C-IV, D-II",
      option_b: "A-II, B-I, C-III, D-IV",
      option_c: "A-III, B-IV, C-I, D-II",
      option_d: "A-I, B-III, C-II, D-IV",
      correct_option: "A",
      explanation: "1. A: Hydrogenation of acyl chloride over palladium poisoned by barium sulfate (Pd-BaSO₄) to yield an aldehyde is the Rosenmund reduction (III) → A-III.\n2. B: Formylation of benzene with carbon monoxide (CO) and HCl in the presence of anhydrous AlCl₃/CuCl catalyst to produce benzaldehyde is the Gattermann-Koch reaction (I) → B-I.\n3. C: Oxidation of toluene with chromyl chloride (CrO₂Cl₂) in CS₂ followed by hydrolysis to yield benzaldehyde is the Etard reaction (IV) → C-IV.\n4. D: Reduction of nitrile with SnCl₂ and HCl followed by acidic hydrolysis to yield an aldehyde is the Stephen reaction (II) → D-II.\n5. Matching: A-III, B-I, C-IV, D-II.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4877,
    similarQuestion: {
      question: "During the preparation of arenediazonium salts from aniline:\nAniline reacts with NaNO₂ and dilute HCl at 273–278 K to form benzenediazonium chloride [C₆H₅N₂⁺Cl⁻] (Compound 'P'). Treatment of 'P' with fluoroboric acid (HBF₄) precipitates benzenediazonium fluoroborate [C₆H₅N₂⁺BF₄⁻] (Compound 'Q'). Which of the following statements regarding 'P' and 'Q' is correct?",
      option_a: "Compound 'P' is readily soluble in water and stable at room temperature, while 'Q' is insoluble in water and decomposes violently at 0 °C.",
      option_b: "Both compounds 'P' and 'Q' are highly soluble in water and stable at room temperature.",
      option_c: "Compound 'P' is water-soluble but decomposes easily above 278 K, whereas 'Q' is water-insoluble and remarkably stable at room temperature.",
      option_d: "Both compounds 'P' and 'Q' are insoluble in water and stable indefinitely at room temperature.",
      correct_option: "C",
      explanation: "1. Benzenediazonium chloride [C₆H₅N₂⁺Cl⁻] (Compound 'P') is an ionic salt that dissolves readily in water. However, it is unstable at room temperature and decomposes with the release of N₂ gas if warmed above 278 K (0–5 °C); therefore, it is kept chilled and reacted in situ.\n2. Benzenediazonium fluoroborate [C₆H₅N₂⁺BF₄⁻] (Compound 'Q'), obtained by precipitation with HBF₄, is insoluble in water.\n3. Due to the large size and stability of the BF₄⁻ anion, it has high lattice energy and can be isolated and kept as a dry solid at room temperature without decomposition.\n4. Hence, 'P' is water-soluble and unstable at room temperature, while 'Q' is water-insoluble and stable at room temperature.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4878,
    similarQuestion: {
      question: "Which of the following amino compounds will give a positive carbylamine test (isocyanide test) upon heating with chloroform and ethanolic KOH?",
      option_a: "N,N-Dimethylaniline [C₆H₅N(CH₃)₂]",
      option_b: "Benzylamine [C₆H₅CH₂NH₂]",
      option_c: "Diethylamine [(C₂H₅)₂NH]",
      option_d: "N-Methylaniline [C₆H₅NHCH₃]",
      correct_option: "B",
      explanation: "1. The carbylamine test (Hoffmann's isocyanide test) is exclusively given by primary (1°) amines, both aliphatic and aromatic.\n2. When heated with chloroform (CHCl₃) and ethanolic KOH, a primary amine forms an intensely foul-smelling isocyanide (carbylamine):\nR–NH₂ + CHCl₃ + 3KOH -(heat)→ R–N≡C + 3KCl + 3H₂O\n3. Secondary (2°) and tertiary (3°) amines do not show this reaction.\n4. Benzylamine (C₆H₅CH₂NH₂) is a primary (1°) amine and gives a positive carbylamine test.\n5. N,N-Dimethylaniline is tertiary (3°), while diethylamine and N-methylaniline are secondary (2°).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4879,
    similarQuestion: {
      question: "Which of the following organic compounds has the LOWEST acidic strength (highest pKa value)?",
      option_a: "Formic acid [HCOOH]",
      option_b: "Benzoic acid [C₆H₅COOH]",
      option_c: "Phenol [C₆H₅OH]",
      option_d: "4-Chlorobenzoic acid [4-Cl–C₆H₄COOH]",
      correct_option: "C",
      explanation: "1. Carboxylic acids (R–COOH) are significantly stronger acids than phenols (Ar–OH).\n2. In carboxylate anions (R–COO⁻), negative charge is delocalized equally over two electronegative oxygen atoms in two equivalent resonance contributors.\n3. In phenoxide ion (C₆H₅O⁻), negative charge is delocalized onto less electronegative carbon atoms in the aromatic ring, making it less stable than carboxylate.\n4. Typical pKa values at 25 °C:\n- Formic acid: pKa ≈ 3.75\n- 4-Chlorobenzoic acid: pKa ≈ 3.98\n- Benzoic acid: pKa ≈ 4.20\n- Phenol: pKa ≈ 10.0\n5. Higher pKa corresponds to lower acidity. Thus, phenol has the lowest acidic strength among the given compounds.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4880,
    similarQuestion: {
      question: "Which of the following organic halides will undergo nucleophilic substitution via the SN1 mechanism at the fastest rate upon solvolysis in aqueous ethanol?",
      option_a: "1-Chlorobutane [CH₃CH₂CH₂CH₂Cl]",
      option_b: "2-Chlorobutane [CH₃CH₂CH(Cl)CH₃]",
      option_c: "3-Chlorobut-1-ene [CH₃CH(Cl)CH=CH₂]",
      option_d: "Chlorobenzene [C₆H₅Cl]",
      correct_option: "C",
      explanation: "1. The rate of an SN1 reaction is directly proportional to the stability of the intermediate carbocation generated in the rate-determining step.\n2. Ionization of 1-chlorobutane gives an unstable primary carbocation.\n3. Ionization of 2-chlorobutane gives a secondary carbocation stabilized only by hyperconjugation and inductive effect.\n4. Chlorobenzene does not undergo SN1 because the C–Cl bond has partial double bond character and phenyl cation is extremely unstable.\n5. Ionization of 3-chlorobut-1-ene produces a secondary allylic carbocation: [CH₃–CH⁺–CH=CH₂ ↔ CH₃–CH=CH–CH₂⁺].\n6. The allylic carbocation is strongly stabilized by resonance delocalization across the adjacent π system, making it far more stable than ordinary alkyl carbocations.\n7. Hence, 3-chlorobut-1-ene reacts at the fastest rate via SN1.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
  const token = loginRes.token;
  if (!token) {
    console.error('Login failed:', loginRes);
    process.exit(1);
  }
  console.log('Logged in successfully, token received.');

  for (const item of test149Questions) {
    const payload = JSON.stringify({ similarQuestion: item.similarQuestion });
    const url = `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`;
    const res = await put(url, payload, token);
    if (res.success || res.message) {
      console.log(`Updated Test Question ID ${item.id}: SUCCESS`);
    } else {
      console.error(`Failed Test Question ID ${item.id}:`, res);
    }
  }
  console.log('All remaining 10 questions of Test 149 updated successfully!');
}

main().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
