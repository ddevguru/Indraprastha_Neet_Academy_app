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

const test111Questions = [
  {
    id: 4789,
    similarQuestion: {
      question: "Acetylation of salicylic acid (2-hydroxybenzoic acid) with acetic anhydride in the presence of an acid catalyst yields which widely used analgesic and antipyretic drug?",
      option_a: "Aspirin (Acetylsalicylic acid)",
      option_b: "Paracetamol (Acetaminophen)",
      option_c: "Methyl salicylate (Oil of wintergreen)",
      option_d: "Salol (Phenyl salicylate)",
      correct_option: "A",
      explanation: "1. Salicylic acid contains both a phenolic –OH group and a carboxylic –COOH group.\n2. Reaction with acetic anhydride ((CH₃CO)₂O) in the presence of trace concentrated H₂SO₄ selectively acetylates the phenolic –OH group:\n   o-HO–C₆H₄–COOH + (CH₃CO)₂O → o-CH₃COO–C₆H₄–COOH + CH₃COOH\n3. The product, 2-acetoxybenzoic acid, is commonly known as Aspirin, a major nonsteroidal anti-inflammatory and antipyretic drug.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4790,
    similarQuestion: {
      question: "During mononitration of phenol with dilute HNO₃ at 298 K, which products are obtained?",
      option_a: "A mixture of ortho-nitrophenol and para-nitrophenol",
      option_b: "meta-Nitrophenol only",
      option_c: "2,4,6-Trinitrophenol (Picric acid)",
      option_d: "Benzoic acid",
      correct_option: "A",
      explanation: "1. The –OH group in phenol is strongly activating and ortho/para-directing due to resonance (+M effect) donating electron density into the ring.\n2. Reaction with dilute HNO₃ at low temperature (298 K) yields a mixture of ortho-nitrophenol and para-nitrophenol.\n3. Concentrated HNO₃ is required to produce 2,4,6-trinitrophenol (picric acid).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4791,
    similarQuestion: {
      question: "Catalytic hydrogenation of propanal (CH₃CH₂CHO) using H₂ in the presence of Raney nickel catalyst yields:",
      option_a: "Propan-1-ol",
      option_b: "Propan-2-ol",
      option_c: "Propane",
      option_d: "Propanoic acid",
      correct_option: "A",
      explanation: "1. Catalytic reduction of aldehydes adds H₂ across the carbonyl double bond:\n   R–CHO + H₂ --(Ni, Δ)--> R–CH₂OH\n2. Propanal (CH₃CH₂CHO) is reduced to the primary alcohol propan-1-ol (CH₃CH₂CH₂OH).\n3. Ketones are reduced to secondary alcohols, whereas aldehydes yield primary alcohols.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4792,
    similarQuestion: {
      question: "Reaction of acetone (propan-2-one) with ethylmagnesium bromide (CH₃CH₂MgBr) followed by acidic hydrolysis produces:",
      option_a: "2-Methylbutan-2-ol",
      option_b: "Pentan-2-ol",
      option_c: "Pentan-3-ol",
      option_d: "2-Methylbutan-1-ol",
      correct_option: "A",
      explanation: "1. Grignard reagents add nucleophilically to the carbonyl carbon of ketones to form a magnesium alkoxide complex:\n   (CH₃)₂C=O + CH₃CH₂MgBr → (CH₃)₂C(OMgBr)–CH₂CH₃\n2. Acidic hydrolysis of this complex yields a tertiary alcohol:\n   (CH₃)₂C(OMgBr)–CH₂CH₃ + H₂O → (CH₃)₂C(OH)–CH₂CH₃ + Mg(OH)Br\n3. The IUPAC name of the tertiary alcohol formed is 2-methylbutan-2-ol.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4793,
    similarQuestion: {
      question: "Reduction of ethanoic acid (CH₃COOH) with lithium aluminium hydride (LiAlH₄) followed by acidic workup produces:",
      option_a: "Ethanol (CH₃CH₂OH)",
      option_b: "Ethanal (CH₃CHO)",
      option_c: "Ethane",
      option_d: "Diethyl ether",
      correct_option: "A",
      explanation: "1. Carboxylic acids are cleanly reduced to primary alcohols by strong hydride reducing agents like LiAlH₄:\n   CH₃COOH --(1. LiAlH₄ / ether, 2. H₂O)--> CH₃CH₂OH\n2. Thus, ethanol is obtained as the exclusive reduction product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4794,
    similarQuestion: {
      question: "What is the correct decreasing order of boiling points for compounds with comparable molecular masses: Butan-1-ol, Butanal, Methoxypropane, and Pentane?",
      option_a: "Butan-1-ol > Butanal > Methoxypropane > Pentane",
      option_b: "Pentane > Methoxypropane > Butanal > Butan-1-ol",
      option_c: "Butanal > Butan-1-ol > Methoxypropane > Pentane",
      option_d: "Methoxypropane > Butan-1-ol > Butanal > Pentane",
      correct_option: "A",
      explanation: "1. Intermolecular forces dictate boiling point trends among molecules of comparable molecular mass:\n   - Butan-1-ol has a polar –OH group forming strong intermolecular hydrogen bonds, giving it the highest boiling point (≈ 391 K).\n   - Butanal has polar carbonyl dipole-dipole attractions without H-bonding (≈ 349 K).\n   - Methoxypropane (ether) has weaker dipole-dipole interactions (≈ 312 K).\n   - Pentane experiences only weak London dispersion forces (≈ 309 K).\n2. Therefore, the boiling point order is: Butan-1-ol > Butanal > Methoxypropane > Pentane.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4795,
    similarQuestion: {
      question: "Cleavage of methoxyethane (CH₃–O–CH₂CH₃) with one equivalent of concentrated HI at 373 K yields:",
      option_a: "Methyl iodide (CH₃I) and Ethanol (CH₃CH₂OH)",
      option_b: "Methanol (CH₃OH) and Ethyl iodide (CH₃CH₂I)",
      option_c: "Methyl iodide and Ethyl iodide",
      option_d: "Methanol and Ethanol",
      correct_option: "A",
      explanation: "1. In an unsymmetrical ether containing two primary alkyl groups, protonation by HI yields an oxonium ion: [CH₃–O⁺(H)–CH₂CH₃].\n2. The iodide nucleophile (I⁻) attacks via an Sₙ2 mechanism at the less sterically hindered carbon atom.\n3. Because the methyl group is less hindered than the ethyl group, I⁻ attacks methyl to form methyl iodide (CH₃I), displacing ethanol (CH₃CH₂OH).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4796,
    similarQuestion: {
      question: "When anisole (methoxybenzene, C₆H₅–O–CH₃) is heated with concentrated HI, the products formed are:",
      option_a: "Phenol (C₆H₅OH) and Methyl iodide (CH₃I)",
      option_b: "Iodobenzene (C₆H₅I) and Methanol (CH₃OH)",
      option_c: "Phenol and Methanol",
      option_d: "Iodobenzene and Methyl iodide",
      correct_option: "A",
      explanation: "1. In anisole, resonance delocalization of the oxygen lone pair into the aromatic ring gives partial double bond character to the C(phenyl)–O bond, making it short and strong.\n2. The alkyl C(sp³)–O bond is a normal single bond and is much more readily cleaved.\n3. Upon protonation, iodide ion (I⁻) attacks the methyl carbon via an Sₙ2 displacement to produce methyl iodide (CH₃I) and phenol (C₆H₅OH).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4797,
    similarQuestion: {
      question: "In Williamson's ether synthesis, the reaction of sodium phenoxide (C₆H₅O⁻Na⁺) with ethyl bromide (CH₃CH₂Br) yields:",
      option_a: "Phenetole (Ethoxybenzene)",
      option_b: "Anisole (Methoxybenzene)",
      option_c: "2-Ethylphenol",
      option_d: "Diphenyl ether",
      correct_option: "A",
      explanation: "1. Williamson ether synthesis involves an Sₙ2 nucleophilic displacement of halide from a primary alkyl halide by an alkoxide or phenoxide ion:\n   C₆H₅O⁻Na⁺ + CH₃CH₂Br → C₆H₅–O–CH₂CH₃ + NaBr\n2. The product formed is ethoxybenzene, commonly known as phenetole.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4798,
    similarQuestion: {
      question: "When anisole is treated with bromine in ethanoic acid (acetic acid), the major product formed is:",
      option_a: "4-Bromoanisole (p-Bromoanisole)",
      option_b: "2-Bromoanisole (o-Bromoanisole)",
      option_c: "2,4,6-Tribromoanisole",
      option_d: "3-Bromoanisole (m-Bromoanisole)",
      correct_option: "A",
      explanation: "1. The methoxy (–OCH₃) group strongly activates the aromatic ring toward electrophilic substitution and directs incoming electrophiles to ortho and para positions.\n2. Bromination in ethanoic acid proceeds smoothly without needing a Lewis acid catalyst.\n3. Due to steric hindrance at the ortho positions caused by the methoxy group, substitution occurs predominantly at the para position.\n4. Hence, 4-bromoanisole is the major product (≈ 90% yield).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4799,
    similarQuestion: {
      question: "Ortho-nitrophenol and para-nitrophenol can be effectively separated by steam distillation because:",
      option_a: "Ortho-nitrophenol possesses intramolecular hydrogen bonding and is steam volatile, whereas para-nitrophenol possesses intermolecular hydrogen bonding and has higher boiling point.",
      option_b: "Para-nitrophenol has lower molecular mass than ortho-nitrophenol.",
      option_c: "Ortho-nitrophenol forms stronger intermolecular hydrogen bonds with water.",
      option_d: "Para-nitrophenol is completely insoluble in organic solvents.",
      correct_option: "A",
      explanation: "1. In ortho-nitrophenol, the –NO₂ and –OH groups are adjacent, allowing intramolecular hydrogen bonding (chelation). This prevents association between neighboring molecules, giving it lower boiling point and high steam volatility.\n2. In para-nitrophenol, the groups are positioned opposite to each other, resulting in extensive intermolecular hydrogen bonding. This causes strong association between molecules, leading to higher boiling point and non-steam volatility.\n3. Steam distillation cleanly distills off ortho-nitrophenol, separating it from the non-volatile para isomer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4800,
    similarQuestion: {
      question: "What is the correct decreasing order of acidity among the following phenolic and alcoholic compounds?",
      option_a: "2,4,6-Trinitrophenol (Picric acid) > 4-Nitrophenol > Phenol > Ethanol",
      option_b: "Ethanol > Phenol > 4-Nitrophenol > 2,4,6-Trinitrophenol",
      option_c: "4-Nitrophenol > 2,4,6-Trinitrophenol > Phenol > Ethanol",
      option_d: "Phenol > 4-Nitrophenol > 2,4,6-Trinitrophenol > Ethanol",
      correct_option: "A",
      explanation: "1. Phenols are more acidic than aliphatic alcohols because phenoxide ions are stabilized by resonance delocalization into the aromatic ring.\n2. Electron-withdrawing nitro (–NO₂) groups exert strong –M and –I effects that stabilize the phenoxide anion, greatly increasing acidity.\n3. In 2,4,6-trinitrophenol (picric acid), three –NO₂ groups at ortho and para positions provide massive resonance stabilization (pKₐ ≈ 0.38), making it stronger than many mineral acids.\n4. 4-Nitrophenol has one –NO₂ group at para position (pKₐ ≈ 7.15), phenol has pKₐ ≈ 10, and ethanol has pKₐ ≈ 16.\n5. The acidity order is: 2,4,6-Trinitrophenol > 4-Nitrophenol > Phenol > Ethanol.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4801,
    similarQuestion: {
      question: "Acid-catalyzed ring opening of ethylene oxide (oxirane) in the presence of dilute aqueous H₂SO₄ yields:",
      option_a: "Ethane-1,2-diol (Ethylene glycol)",
      option_b: "Ethanol",
      option_c: "Ethanal",
      option_d: "Diethyl ether",
      correct_option: "A",
      explanation: "1. Epoxides (oxiranes) possess a highly strained three-membered ring that readily undergoes ring-opening reactions.\n2. In the presence of aqueous acid (H₂SO₄), the epoxide oxygen is protonated, creating a good leaving group and increasing electrophilicity of the ring carbons: H₂C–CH₂(O) + H⁺ → [H₂C–CH₂(O⁺H)].\n3. Nucleophilic attack by water (H₂O) opens the strained ring, and subsequent deprotonation produces ethane-1,2-diol (ethylene glycol, HO–CH₂–CH₂–OH).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4802,
    similarQuestion: {
      question: "In the commercial preparation of phenol from aniline, aniline is first diazotized with NaNO₂/HCl at 273–278 K to form compound 'A', which on warming with water produces phenol. What is compound 'A'?",
      option_a: "Benzenediazonium chloride",
      option_b: "Chlorobenzene",
      option_c: "Nitrobenzene",
      option_d: "Phenylhydrazine",
      correct_option: "A",
      explanation: "1. Treatment of aniline (C₆H₅NH₂) with nitrous acid (generated in situ from NaNO₂ and dilute HCl) at ice-cold temperatures (273–278 K) converts the primary aromatic amino group into a diazonium salt:\n   C₆H₅NH₂ + NaNO₂ + 2 HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2 H₂O\n2. Compound 'A' is benzenediazonium chloride.\n3. Warming an aqueous solution of benzenediazonium chloride hydrolyzes it to phenol, releasing N₂ gas and HCl:\n   C₆H₅N₂⁺Cl⁻ + H₂O --(warm)--> C₆H₅OH + N₂↑ + HCl\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4803,
    similarQuestion: {
      question: "In the synthesis of tert-butyl ethyl ether via Williamson ether synthesis, which combination of reactants gives the best yield?",
      option_a: "Sodium tert-butoxide and Ethyl bromide",
      option_b: "Potassium ethoxide and tert-Butyl bromide",
      option_c: "tert-Butyl alcohol and Ethanol in dilute acid",
      option_d: "tert-Butyl chloride and Ethanol",
      correct_option: "A",
      explanation: "1. Williamson ether synthesis follows an Sₙ2 substitution pathway where alkoxide attacks the alkyl halide.\n2. If a tertiary alkyl halide (such as tert-butyl bromide) is used with a strong base like ethoxide, elimination (E2) completely predominates over substitution, producing 2-methylpropene (isobutene) as the major product instead of an ether.\n3. To successfully prepare a tertiary-primary mixed ether, a primary alkyl halide (ethyl bromide, CH₃CH₂Br) must be reacted with a sterically bulky tertiary alkoxide (sodium tert-butoxide, (CH₃)₃CO⁻Na⁺).\n4. Since ethyl bromide is primary, substitution (Sₙ2) occurs without competing E2 elimination, giving an excellent yield of tert-butyl ethyl ether.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.token;
    console.log('Logged in successfully, token received.');

    for (const q of test111Questions) {
      const res = await put(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${q.id}`,
        JSON.stringify({ similarQuestion: q.similarQuestion }),
        token
      );
      console.log(`Updated Test Question ID ${q.id}: ${res.success ? 'SUCCESS' : JSON.stringify(res)}`);
    }
    console.log('All 15 questions of Test 111 updated successfully!');
  } catch (err) {
    console.error('Error updating questions:', err);
  }
}

run();
