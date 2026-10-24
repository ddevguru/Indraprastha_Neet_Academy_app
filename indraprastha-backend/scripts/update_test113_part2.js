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

const test113Part2Questions = [
  {
    id: 4817,
    similarQuestion: {
      question: "Which of the following carboxylic acid derivatives undergoes nucleophilic acyl substitution (such as alkaline hydrolysis) at the slowest rate?",
      option_a: "Ethanoic anhydride [(CH₃CO)₂O]",
      option_b: "Acetyl chloride [CH₃COCl]",
      option_c: "Ethyl ethanoate [CH₃COOCH₂CH₃]",
      option_d: "Acetamide [CH₃CONH₂]",
      correct_option: "D",
      explanation: "In nucleophilic acyl substitution reactions of carboxylic acid derivatives (R–COX), the reaction rate is primarily determined by the leaving group ability of X⁻ and resonance stabilization of the carbonyl group. The leaving group ability follows the order of basicity (weaker base = better leaving group): Cl⁻ > RCOO⁻ > RO⁻ > NH₂⁻. Furthermore, in acetamide (CH₃CONH₂), strong resonance donation from the nitrogen lone pair into the carbonyl group (–CO–NH₂ ↔ –C(O⁻)=NH₂⁺) significantly reduces the electrophilicity of the carbonyl carbon compared to acyl chlorides, anhydrides, and esters. Consequently, acetamide is the least reactive acid derivative and undergoes hydrolysis at the slowest rate. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4818,
    similarQuestion: {
      question: "In the reaction sequence: Ethanol [CH₃CH₂OH] is treated with PBr₃ to give compound 'P'. Compound 'P' reacts with ethanolic KCN to yield 'Q'. Complete acidic hydrolysis (H₃O⁺, heat) of 'Q' produces compound 'R'. What is compound 'R'?",
      option_a: "Ethanoic acid",
      option_b: "Propanoic acid",
      option_c: "Propanamide",
      option_d: "Ethanamine",
      correct_option: "B",
      explanation: "1. Treatment of ethanol (CH₃CH₂OH) with phosphorus tribromide (PBr₃) replaces the –OH group with bromine via an SN2 substitution to yield bromoethane (CH₃CH₂Br) as compound 'P'.\n2. Reaction of bromoethane with potassium cyanide (KCN) introduces a cyano group by nucleophilic displacement of bromide, yielding propanenitrile (CH₃CH₂CN) as compound 'Q'. This reaction increases the carbon skeleton length by one carbon atom.\n3. Complete acidic hydrolysis (H₃O⁺, heat) of propanenitrile converts the nitrile (–C≡N) group into a carboxylic acid (–COOH) group:\nCH₃CH₂CN + 2H₂O + H⁺ → CH₃CH₂COOH + NH₄⁺\n4. Thus, compound 'R' is propanoic acid (CH₃CH₂COOH).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4819,
    similarQuestion: {
      question: "Bromobenzene is reacted with magnesium metal in dry ether to form compound 'X'. Compound 'X' is then treated with solid carbon dioxide (dry ice) followed by acidification with dilute HCl to produce compound 'Y'. What is compound 'Y'?",
      option_a: "Benzophenone",
      option_b: "Benzyl alcohol",
      option_c: "Benzoic acid",
      option_d: "Benzaldehyde",
      correct_option: "C",
      explanation: "1. Reaction of bromobenzene (C₆H₅Br) with magnesium in dry ether generates phenylmagnesium bromide (C₆H₅MgBr), a Grignard reagent, designated as compound 'X'.\n2. The nucleophilic phenyl group of C₆H₅MgBr attacks the electrophilic carbonyl carbon of carbon dioxide (CO₂ / dry ice) to form a halomagnesium benzoate intermediate: C₆H₅MgBr + CO₂ → C₆H₅–COOMgBr.\n3. Acidic hydrolysis of this intermediate with dilute HCl protonates the carboxylate to yield benzoic acid (C₆H₅COOH) and Mg(OH)Br:\nC₆H₅–COOMgBr + H₃O⁺ → C₆H₅COOH + Mg(OH)Br\n4. Therefore, compound 'Y' is benzoic acid.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4820,
    similarQuestion: {
      question: "Which of the following statements regarding carboxylic acids and their derivatives is INCORRECT?",
      option_a: "Acetic acid exists as a cyclic dimer in both vapor phase and non-polar solvents like benzene due to intermolecular hydrogen bonding.",
      option_b: "The boiling points of carboxylic acids are higher than those of alcohols of comparable molecular mass because of stronger intermolecular hydrogen bonding.",
      option_c: "Lower aliphatic carboxylic acids (up to four carbon atoms) are completely miscible with water because they form hydrogen bonds with water molecules.",
      option_d: "Carboxylic acids do not give effervescence of CO₂ upon reaction with sodium bicarbonate (NaHCO₃) solution.",
      correct_option: "D",
      explanation: "1. Carboxylic acids (pKa ≈ 4 to 5) are stronger acids than carbonic acid (H₂CO₃, pKa ≈ 6.35).\n2. Because they are stronger than carbonic acid, carboxylic acids decompose sodium bicarbonate (NaHCO₃) solution to liberate carbon dioxide (CO₂) gas with brisk effervescence:\nR–COOH + NaHCO₃ → R–COONa + H₂O + CO₂↑\n3. This reaction serves as a standard qualitative laboratory test to distinguish carboxylic acids from phenols (which do not react with NaHCO₃).\n4. Statements A, B, and C are well-known accurate properties of carboxylic acids described in NCERT Chemistry.\n5. Hence, statement (D) is incorrect.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4821,
    similarQuestion: {
      question: "Which of the following chemical reactions does NOT occur under standard conditions?",
      option_a: "CH₃COOH + NaOH → CH₃COONa + H₂O",
      option_b: "C₆H₅OH + NaOH → C₆H₅ONa + H₂O",
      option_c: "C₆H₅OH + NaHCO₃ → C₆H₅ONa + H₂O + CO₂",
      option_d: "2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂",
      correct_option: "C",
      explanation: "1. An acid-base proton transfer reaction is thermodynamically favorable only if the conjugate acid produced is weaker than the reacting acid.\n2. Phenol (C₆H₅OH) has a pKa ≈ 10, whereas carbonic acid (H₂CO₃) has a pKa ≈ 6.35. Since phenol is a significantly weaker acid than carbonic acid, it cannot protonate the bicarbonate ion (HCO₃⁻) to liberate CO₂ gas. Thus, phenol does not react with sodium bicarbonate (NaHCO₃).\n3. In contrast, carboxylic acids (pKa ≈ 4.76) are stronger than carbonic acid and liberate CO₂ with NaHCO₃.\n4. Both phenol and acetic acid react with aqueous NaOH, while ethanol reacts with active sodium metal to liberate H₂ gas.\n5. Therefore, reaction (C) does not occur.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4822,
    similarQuestion: {
      question: "Which of the following reducing agents can selectively reduce an ester (R–COOR') to an aldehyde (R–CHO) at low temperatures (–78 °C) without over-reducing it to an alcohol?",
      option_a: "Lithium aluminium hydride [LiAlH₄]",
      option_b: "Diisobutylaluminium hydride [DIBAL-H]",
      option_c: "Sodium borohydride [NaBH₄]",
      option_d: "Sodium in boiling ethanol [Bouveault-Blanc reduction]",
      correct_option: "B",
      explanation: "1. Lithium aluminium hydride (LiAlH₄) is a powerful reducing agent that completely reduces esters to primary alcohols.\n2. Sodium in ethanol (Bouveault-Blanc reduction) also reduces esters completely to primary alcohols.\n3. Sodium borohydride (NaBH₄) is unreactive toward esters under normal conditions.\n4. Diisobutylaluminium hydride [DIBAL-H or (i-Bu)₂AlH] is a bulky, sterically hindered reducing agent. When reacted with esters at low temperature (–78 °C) followed by careful aqueous hydrolysis, it stops selectively at the aldehyde stage without further reduction to alcohol:\nR–COOR' + DIBAL-H (–78 °C) → hemiacetal intermediate → R–CHO + R'OH (on H₂O workup).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4823,
    similarQuestion: {
      question: "Propanoic acid is heated strongly with phosphorus pentoxide (P₂O₅) to yield compound 'X'. Compound 'X' is treated with PCl₅ to form compound 'Y'. Compound 'Y' then undergoes a reaction with benzene in the presence of anhydrous AlCl₃ to give compound 'Z'. What is compound 'Z'?",
      option_a: "Propiophenone (1-phenylpropan-1-one)",
      option_b: "Acetophenone (1-phenylethan-1-one)",
      option_c: "Benzophenone (diphenylmethanone)",
      option_d: "Propylbenzene",
      correct_option: "A",
      explanation: "1. Heating propanoic acid (CH₃CH₂COOH) with a dehydrating agent like phosphorus pentoxide (P₂O₅) eliminates water between two molecules to form propanoic anhydride [(CH₃CH₂CO)₂O] as compound 'X'.\n2. Treatment of propanoic anhydride with phosphorus pentachloride (PCl₅) cleaves the anhydride to produce propanoyl chloride (CH₃CH₂COCl) as compound 'Y':\n(CH₃CH₂CO)₂O + PCl₅ → 2 CH₃CH₂COCl + POCl₃\n3. In the final step, propanoyl chloride reacts with benzene (C₆H₆) in the presence of anhydrous aluminium chloride (AlCl₃) catalyst via Friedel-Crafts acylation:\nC₆H₆ + CH₃CH₂COCl + AlCl₃ → C₆H₅–CO–CH₂CH₃ (propiophenone) + HCl\n4. Thus, compound 'Z' is propiophenone (1-phenylpropan-1-one).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4824,
    similarQuestion: {
      question: "Which of the following compounds is INCORRECTLY paired with its characteristic industrial or biological application?",
      option_a: "Sodium benzoate — Food preservative",
      option_b: "Ethyl butyrate — Flavoring agent and perfume component",
      option_c: "Methanoic acid — Rubber, textile, and leather tanning industry",
      option_d: "Triiodomethane (Iodoform) — General anaesthetic in surgery",
      correct_option: "D",
      explanation: "1. Sodium benzoate (C₆H₅COONa) is widely used as a food preservative to inhibit microbial growth.\n2. Esters like ethyl butyrate possess pleasant fruity scents and are used in perfumes, flavorings, and cosmetics.\n3. Methanoic acid (formic acid, HCOOH) is utilized in rubber coagulation, leather tanning, and dye fixing in the textile industry.\n4. Triiodomethane (iodoform, CHI₃) is an antiseptic (used in dressing wounds due to the liberation of elemental iodine), NOT a general surgical anaesthetic. Historically, trichloromethane (chloroform, CHCl₃) was used as an inhalation anaesthetic.\n5. Therefore, pairing (D) is incorrect.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4825,
    similarQuestion: {
      question: "When propanoic acid (CH₃CH₂COOH) is reacted with chlorine in the presence of red phosphorus followed by hydrolysis with water (Hell-Volhard-Zelinsky reaction), the primary organic product formed is:",
      option_a: "2-Chloropropanoic acid, which is a stronger acid than propanoic acid",
      option_b: "3-Chloropropanoic acid, which is a weaker acid than propanoic acid",
      option_c: "Propanoyl chloride, which is a neutral compound",
      option_d: "2,2-Dichloropropane, which is non-acidic",
      correct_option: "A",
      explanation: "1. The Hell-Volhard-Zelinsky (HVZ) reaction specifically halogenates aliphatic carboxylic acids possessing α-hydrogens selectively at the α-position.\n2. Reaction of propanoic acid (CH₃CH₂COOH) with Cl₂ in the presence of red phosphorus followed by hydrolysis yields 2-chloropropanoic acid [CH₃CH(Cl)COOH].\n3. The electronegative chlorine atom at the α-position exerts a strong electron-withdrawing inductive effect (–I effect).\n4. This –I effect stabilizes the conjugate carboxylate anion (CH₃CH(Cl)COO⁻) by dispersing its negative charge, significantly lowering the pKa (pKa ≈ 2.88 for 2-chloropropanoic acid vs pKa ≈ 4.88 for propanoic acid).\n5. Consequently, 2-chloropropanoic acid is much more acidic than propanoic acid.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4826,
    similarQuestion: {
      question: "What is the correct increasing order of acidic strength for the following substituted acetic acid derivatives?\nI. Fluoroacetic acid [FCH₂COOH]\nII. Chloroacetic acid [ClCH₂COOH]\nIII. Bromoacetic acid [BrCH₂COOH]\nIV. Nitroacetic acid [O₂NCH₂COOH]",
      option_a: "IV < I < II < III",
      option_b: "III < II < I < IV",
      option_c: "II < III < I < IV",
      option_d: "III < I < II < IV",
      correct_option: "B",
      explanation: "1. The acidic strength of substituted carboxylic acids increases with the electron-withdrawing power (–I inductive effect) of substituents attached to the α-carbon.\n2. The –I effect disperses the negative charge of the carboxylate anion, stabilizing the conjugate base.\n3. Among halogens, electronegativity decreases down the group: F (4.0) > Cl (3.0) > Br (2.8). Thus, the –I strength follows: F > Cl > Br.\n4. The nitro group (–NO₂) possesses both a formal positive charge on nitrogen and high electronegativity, making it a stronger electron-withdrawing group than halogens.\n5. Therefore, the increasing order of –I effect and acidity is:\nBrCH₂COOH (III) < ClCH₂COOH (II) < FCH₂COOH (I) < O₂NCH₂COOH (IV).\n6. Thus, the order is III < II < I < IV.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4827,
    similarQuestion: {
      question: "In the following reaction sequence:\nPropanal [CH₃CH₂CHO] is treated with Tollens' reagent [Ag(NH₃)₂⁺/OH⁻] to give compound 'A'. Compound 'A' is neutralized with aqueous NaOH to form sodium salt 'B'. Solid 'B' is then heated with soda-lime (NaOH + CaO in 3:1 ratio) to yield hydrocarbon 'C'. What is compound 'C'?",
      option_a: "Methane [CH₄]",
      option_b: "Ethane [CH₃CH₃]",
      option_c: "Propane [CH₃CH₂CH₃]",
      option_d: "Ethene [CH₂=CH₂]",
      correct_option: "B",
      explanation: "1. Oxidation of propanal (CH₃CH₂CHO) with Tollens' reagent selectively oxidizes the aldehyde to propanoate ion, which upon acidification yields propanoic acid (CH₃CH₂COOH, compound 'A').\n2. Neutralization of propanoic acid with aqueous NaOH yields sodium propanoate (CH₃CH₂COONa, compound 'B').\n3. Decarboxylation of sodium propanoate by heating with soda-lime (NaOH + CaO) eliminates carbon dioxide as sodium carbonate (Na₂CO₃), yielding an alkane containing one less carbon atom than the parent carboxylate:\nCH₃CH₂COONa + NaOH -(CaO, Δ)→ CH₃CH₃ (ethane) + Na₂CO₃\n4. Thus, hydrocarbon 'C' is ethane (CH₃CH₃).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4828,
    similarQuestion: {
      question: "An organic compound 'Z' has the molecular formula C₄H₈O (molar mass = 72 g/mol). Compound 'Z' forms an addition product with sodium bisulfite (NaHSO₃), gives a yellow precipitate of CHI₃ on reaction with I₂/NaOH (positive iodoform test), but does NOT reduce Fehling's solution. Upon vigorous oxidation with hot alkaline KMnO₄ followed by acidification, it yields ethanoic acid as the sole carboxylic acid product. Identify compound 'Z':",
      option_a: "Butanal [CH₃CH₂CH₂CHO]",
      option_b: "2-Methylpropanal [(CH₃)₂CHCHO]",
      option_c: "Butan-2-one [CH₃COCH₂CH₃]",
      option_d: "But-3-en-2-ol [CH₃CH(OH)CH=CH₂]",
      correct_option: "C",
      explanation: "1. Since compound 'Z' (C₄H₈O) does not reduce Fehling's solution, it is not an aliphatic aldehyde; it must be a ketone.\n2. Formation of a bisulfite addition product indicates the presence of a carbonyl group.\n3. A positive iodoform test (yellow precipitate of CHI₃ with I₂/NaOH) confirms the presence of a methyl ketone (–CO–CH₃) group.\n4. Among 4-carbon carbonyl isomers, butan-2-one (CH₃COCH₂CH₃) is the only methyl ketone.\n5. Vigorous oxidation of butan-2-one with hot alkaline KMnO₄ cleaves the carbon chain across the carbonyl according to Popoff's rule, yielding two molecules of ethanoic acid (CH₃COOH):\nCH₃–CO–CH₂CH₃ -(KMnO₄/OH⁻, Δ)→ 2 CH₃COOH\n6. Therefore, compound 'Z' is butan-2-one.\nTherefore, Option (C) is the correct answer."
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

  for (const item of test113Part2Questions) {
    const payload = JSON.stringify({ similarQuestion: item.similarQuestion });
    const url = `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`;
    const res = await put(url, payload, token);
    if (res.success || res.message) {
      console.log(`Updated Test Question ID ${item.id}: SUCCESS`);
    } else {
      console.error(`Failed Test Question ID ${item.id}:`, res);
    }
  }
  console.log('All 12 questions of Test 113 Part 2 updated successfully!');
}

main().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
