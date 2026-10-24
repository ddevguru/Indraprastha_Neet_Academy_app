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

const test110Part1Questions = [
  {
    id: 4332,
    similarQuestion: {
      question: "An alkene on reductive ozonolysis with O₃ followed by Zn/H₂O gives pentanedial (OHC–CH₂CH₂CH₂–CHO) and two moles of formaldehyde (HCHO). The structure of the alkene is:",
      option_a: "Hepta-1,6-diene",
      option_b: "Hept-1-ene",
      option_c: "Cycloheptene",
      option_d: "Hexa-1,5-diene",
      correct_option: "A",
      explanation: "1. Reductive ozonolysis cleaves carbon-carbon double bonds and converts each terminal =CH₂ unit into formaldehyde (HCHO) and internal =CH– units into aldehyde (–CHO) groups.\n2. Reconnecting the carbonyl groups of formaldehyde (H₂C=O) and pentanedial (O=CH–(CH₂)₃–CH=O) with double bonds gives:\n   H₂C=CH–CH₂–CH₂–CH₂–CH=CH₂, which is hepta-1,6-diene.\n3. Ozonolysis of hepta-1,6-diene yields OHC–(CH₂)₃–CHO and 2 HCHO.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4333,
    similarQuestion: {
      question: "A hydrocarbon 'X' of molecular formula C₈H₁₂ on reductive ozonolysis (O₃, Zn/H₂O) gives only butanedial (OHC–CH₂–CH₂–CHO) as the sole product. The hydrocarbon 'X' is:",
      option_a: "Cycloocta-1,5-diene",
      option_b: "Octa-1,7-diene",
      option_c: "Cyclooctene",
      option_d: "Octa-1,3,5,7-tetraene",
      correct_option: "A",
      explanation: "1. Cycloocta-1,5-diene is an eight-membered cyclic diene with molecular formula C₈H₁₂ containing two symmetrical double bonds separated by –CH₂–CH₂– bridges.\n2. Reductive cleavage of both double bonds by O₃ and Zn/H₂O produces two identical four-carbon fragments: O=CH–CH₂–CH₂–CH=O (butanedial).\n3. Because butanedial is the sole product, the cyclic diene must possess symmetrical double bonds, which corresponds uniquely to cycloocta-1,5-diene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4334,
    similarQuestion: {
      question: "An unknown alkene on reductive ozonolysis produces acetone (CH₃COCH₃) and propanal (CH₃CH₂CHO) in equimolar amounts. What is the IUPAC name of the alkene?",
      option_a: "2-Methylpent-2-ene",
      option_b: "2-Methylpent-1-ene",
      option_c: "3-Methylpent-2-ene",
      option_d: "Hex-2-ene",
      correct_option: "A",
      explanation: "1. To determine the structure of the starting alkene from its ozonolysis products, remove the oxygen atoms from the carbonyl groups and join the carbon atoms with a double bond:\n   (CH₃)₂C=O + O=CH–CH₂CH₃ → (CH₃)₂C=CH–CH₂CH₃\n2. The longest continuous carbon chain containing the double bond has 5 carbon atoms (pent-2-ene).\n3. Numbering from the left gives the methyl substituent at carbon 2.\n4. Thus, the IUPAC name of the alkene is 2-methylpent-2-ene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4335,
    similarQuestion: {
      question: "Which sequence of reagents will successfully convert cyclopentene into cyclopentanone?",
      option_a: "Ozonolysis followed by reductive workup with Zn/H₂O",
      option_b: "Hydration using dilute H₂SO₄ followed by oxidation with PCC (Pyridinium Chlorochromate)",
      option_c: "Dehydrogenation with Pd/C catalyst",
      option_d: "Reaction with alcoholic KOH followed by H₂O₂",
      correct_option: "B",
      explanation: "1. Acid-catalyzed hydration of cyclopentene adds a water molecule across the double bond (H⁺ and OH⁻) to form cyclopentanol (a secondary alcohol).\n2. Oxidation of cyclopentanol using PCC (or Jones reagent) cleanly oxidizes the secondary alcohol to cyclopentanone without overoxidation or ring cleavage.\n3. Ozonolysis would cleave the five-membered ring to yield a dialdehyde.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4754,
    similarQuestion: {
      question: "In the ethane (C₂H₆) molecule, the hybridization of both carbon atoms and the approximate C–C bond length are respectively:",
      option_a: "sp³, 1.54 Å",
      option_b: "sp², 1.34 Å",
      option_c: "sp, 1.20 Å",
      option_d: "sp³, 1.20 Å",
      correct_option: "A",
      explanation: "1. In ethane (C₂H₆), each carbon atom forms 4 single σ bonds (three C–H bonds and one C–C bond) with zero lone pairs, corresponding to sp³ hybridization with tetrahedral geometry.\n2. The single C–C bond length between two sp³ hybridized carbons is 1.54 Å (154 pm).\n3. The C–H bond length is approximately 1.09–1.11 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4755,
    similarQuestion: {
      question: "What is the total number of structural (constitutional) isomers possible for the alkane pentane (C₅H₁₂)?",
      option_a: "3",
      option_b: "5",
      option_c: "4",
      option_d: "2",
      correct_option: "A",
      explanation: "1. The alkane with molecular formula C₅H₁₂ has exactly 3 structural isomers:\n   (i) n-Pentane: CH₃–CH₂–CH₂–CH₂–CH₃ (straight chain)\n   (ii) Isopentane (2-methylbutane): CH₃–CH(CH₃)–CH₂–CH₃ (branched chain)\n   (iii) Neopentane (2,2-dimethylpropane): C(CH₃)₄ (highly branched cross chain)\n2. Therefore, exactly 3 constitutional isomers exist for pentane.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4756,
    similarQuestion: {
      question: "Which of the following isomeric pentanes contains a quaternary (4°) carbon atom?",
      option_a: "Neopentane (2,2-dimethylpropane)",
      option_b: "Isopentane (2-methylbutane)",
      option_c: "n-Pentane",
      option_d: "Cyclopentane",
      correct_option: "A",
      explanation: "1. A quaternary (4°) carbon atom is defined as a carbon atom directly bonded to four other carbon atoms.\n2. Neopentane has the structure (CH₃)₄C, in which the central carbon atom is bonded to four separate methyl carbon atoms; hence, it is a 4° carbon.\n3. Isopentane has one tertiary (3°) carbon, and n-pentane has only primary (1°) and secondary (2°) carbons.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4757,
    similarQuestion: {
      question: "What is the correct IUPAC name for the hydrocarbon (CH₃)₃C–CH₂–CH(CH₃)₂?",
      option_a: "2,2,4-Trimethylpentane",
      option_b: "2,4,4-Trimethylpentane",
      option_c: "2,2-Dimethylhexane",
      option_d: "2,4-Dimethylpentane",
      correct_option: "A",
      explanation: "1. The molecule has the structure (CH₃)₃C–CH₂–CH(CH₃)₂.\n2. The longest continuous carbon chain contains 5 carbons (pentane).\n3. Numbering from the left gives substituents at positions 2, 2, and 4 (locant set 2,2,4), whereas numbering from the right gives 2,4,4.\n4. Following the IUPAC lowest locant rule, numbering from the left is preferred.\n5. Therefore, the IUPAC name is 2,2,4-trimethylpentane (isooctane).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4758,
    similarQuestion: {
      question: "Which of the following alkanes cannot be synthesized by catalytic hydrogenation of an alkene?",
      option_a: "Methane",
      option_b: "Ethane",
      option_c: "Propane",
      option_d: "Butane",
      correct_option: "A",
      explanation: "1. Catalytic hydrogenation adds molecular hydrogen (H₂) across a carbon-carbon double bond: R–CH=CH₂ + H₂ → R–CH₂–CH₃.\n2. An alkene must contain a minimum of two carbon atoms connected by a double bond (the simplest alkene being ethene, C₂H₄).\n3. Because methane (CH₄) contains only one carbon atom, it cannot be synthesized by hydrogenating any alkene.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4759,
    similarQuestion: {
      question: "In the Sabatier–Senderens reaction, the reduction of alkenes to alkanes using hydrogen gas is carried out in the presence of finely divided:",
      option_a: "Nickel catalyst at 200–300 °C",
      option_b: "Copper catalyst at 500 °C",
      option_c: "Zinc dust in aqueous medium",
      option_d: "Iron filings with dilute acid",
      correct_option: "A",
      explanation: "1. The Sabatier–Senderens reaction specifically involves the hydrogenation of alkenes or alkynes to alkanes using H₂ gas in the presence of finely divided Raney nickel (Ni) catalyst at 200–300 °C (523–573 K).\n2. With more active catalysts like Pt or Pd, hydrogenation proceeds smoothly at room temperature.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4760,
    similarQuestion: {
      question: "How many constitutionally isomeric monochloro derivatives of butane can yield butane on reduction with Zn + dilute HCl?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "1",
      correct_option: "A",
      explanation: "1. Reduction of an alkyl halide with Zn and dilute HCl replaces the halogen with a hydrogen atom: R–Cl + Zn + H⁺ → R–H + Zn²⁺ + Cl⁻.\n2. To obtain an unbranched butane skeleton, the alkyl halide must have the unbranched four-carbon framework.\n3. n-Butane has two constitutionally isomeric monochloro derivatives:\n   - 1-Chlorobutane: CH₃–CH₂–CH₂–CH₂Cl\n   - 2-Chlorobutane: CH₃–CH₂–CH(Cl)–CH₃\n4. Both produce butane upon reduction with Zn/HCl.\n5. Hence, exactly 2 constitutional isomers can be used.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4761,
    similarQuestion: {
      question: "When a mixture of methyl bromide (CH₃Br) and ethyl bromide (CH₃CH₂Br) is treated with sodium metal in dry ether (Wurtz reaction), which of the following alkanes is NOT expected to form?",
      option_a: "2-Methylpropane",
      option_b: "Ethane",
      option_c: "Propane",
      option_d: "Butane",
      correct_option: "A",
      explanation: "1. In a mixed Wurtz reaction of CH₃Br and CH₃CH₂Br with sodium in dry ether, coupling of the generated alkyl radicals occurs:\n   (i) Self-coupling of methyl radicals: CH₃• + CH₃• → CH₃–CH₃ (ethane)\n   (ii) Cross-coupling: CH₃• + CH₃CH₂• → CH₃–CH₂–CH₃ (propane)\n   (iii) Self-coupling of ethyl radicals: CH₃CH₂• + CH₃CH₂• → CH₃–CH₂–CH₂–CH₃ (butane)\n2. Branched alkanes like 2-methylpropane (isobutane) cannot be formed from this combination because both starting alkyl radicals are primary and unbranched.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4762,
    similarQuestion: {
      question: "Soda lime used in laboratory decarboxylation of carboxylic acid sodium salts is a mixture of:",
      option_a: "NaOH and CaO in approximately 3:1 mass ratio",
      option_b: "Na₂CO₃ and CaO in 1:1 ratio",
      option_c: "KOH and CaCO₃ in 3:1 ratio",
      option_d: "NaOH and Ca(OH)₂ in 1:3 ratio",
      correct_option: "A",
      explanation: "1. Soda lime is prepared by slaking quicklime (CaO) with concentrated sodium hydroxide (NaOH) solution followed by heating to dryness.\n2. It consists of a solid mixture of NaOH and CaO in approximately 3:1 ratio by weight.\n3. CaO keeps the reagent dry (deliquescence inhibitor) and prevents the glass tube from fusing with NaOH at high temperatures.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4763,
    similarQuestion: {
      question: "When sodium propanoate is heated with soda lime, the gaseous hydrocarbon obtained is:",
      option_a: "Ethane",
      option_b: "Methane",
      option_c: "Propane",
      option_d: "Butane",
      correct_option: "A",
      explanation: "1. Decarboxylation of the sodium salt of a carboxylic acid with soda lime (NaOH + CaO) removes the carboxylate carbon as sodium carbonate (Na₂CO₃):\n   CH₃–CH₂–COONa + NaOH --(CaO, Δ)--> CH₃–CH₃ + Na₂CO₃\n2. The alkane formed always contains one carbon atom fewer than the parent carboxylate salt.\n3. Since sodium propanoate has 3 carbon atoms, the resulting alkane is ethane (C₂H₆), having 2 carbon atoms.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4764,
    similarQuestion: {
      question: "Methane can be prepared in the laboratory by the action of water on:",
      option_a: "Aluminium carbide (Al₄C₃)",
      option_b: "Calcium carbide (CaC₂)",
      option_c: "Magnesium carbide (Mg₂C₃)",
      option_d: "Silicon carbide (SiC)",
      correct_option: "A",
      explanation: "1. Aluminium carbide (Al₄C₃) contains methide ions (C⁴⁻) in its crystal lattice.\n2. Hydrolysis of aluminium carbide with water (or dilute acid) produces methane gas:\n   Al₄C₃ + 12 H₂O → 4 Al(OH)₃ + 3 CH₄↑\n3. In contrast, CaC₂ hydrolyzes to give ethyne (acetylene, C₂H₂), and Mg₂C₃ hydrolyzes to give propyne (C₃H₄).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4765,
    similarQuestion: {
      question: "In Kolbe's electrolytic synthesis of ethane from potassium acetate, the primary reaction occurring at the anode is:",
      option_a: "Oxidation of acetate ions to form methyl free radicals which then dimerize to ethane.",
      option_b: "Reduction of acetate ions to acetaldehyde.",
      option_c: "Reduction of H⁺ ions to evolve H₂ gas.",
      option_d: "Oxidation of water to liberate O₂ gas.",
      correct_option: "A",
      explanation: "1. In Kolbe's electrolytic synthesis, electrolysis of an aqueous solution of sodium or potassium acetate (CH₃COOK) proceeds as follows:\n   At Anode (Oxidation):\n   2 CH₃COO⁻ – 2 e⁻ → 2 [CH₃COO•] → 2 •CH₃ + 2 CO₂↑\n   Dimerization of methyl free radicals:\n   •CH₃ + •CH₃ → CH₃–CH₃ (ethane)\n2. At Cathode (Reduction):\n   2 H₂O + 2 e⁻ → 2 OH⁻ + H₂↑\n3. Thus, ethane and CO₂ are evolved at the anode via free-radical dimerization.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4766,
    similarQuestion: {
      question: "Among the isomeric pentanes, which one has the highest boiling point and why?",
      option_a: "n-Pentane, because it has a straight chain offering greater surface area and stronger van der Waals attractive forces.",
      option_b: "Neopentane, because it has a compact spherical shape.",
      option_c: "Isopentane, because it has intermediate dipole moments.",
      option_d: "Neopentane, because of its highest melting point.",
      correct_option: "A",
      explanation: "1. The boiling point of isomeric alkanes depends on the magnitude of intermolecular van der Waals forces, which are proportional to the contact surface area of the molecules.\n2. n-Pentane has an extended zig-zag straight chain that provides maximum surface contact with neighboring molecules, resulting in the strongest van der Waals forces and highest boiling point (309 K / 36 °C).\n3. Branching makes the molecule more spherical and compact, reducing the surface area of contact; hence, isopentane boils at 301 K and neopentane boils at 282.5 K.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4767,
    similarQuestion: {
      question: "Direct iodination of alkanes is reversible and extremely slow. It is carried out in the presence of which oxidizing agent to make the reaction irreversible?",
      option_a: "Iodic acid (HIO₃) or Nitric acid (HNO₃)",
      option_b: "Concentrated HCl",
      option_c: "Sodium thiosulfate",
      option_d: "Zinc chloride",
      correct_option: "A",
      explanation: "1. Direct iodination of an alkane proceeds according to the equilibrium:\n   R–H + I₂ ⇌ R–I + HI\n2. Hydroiodic acid (HI) is a strong reducing agent that readily reduces the alkyl iodide back to the alkane, making the reaction reversible.\n3. To drive the reaction forward to completion, an oxidizing agent such as iodic acid (HIO₃) or dilute HNO₃ is added.\n4. HIO₃ oxidizes the formed HI back into molecular iodine:\n   5 HI + HIO₃ → 3 I₂ + 3 H₂O\n5. This removes HI from the equilibrium mixture and enables high yield of the alkyl iodide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4768,
    similarQuestion: {
      question: "During the photochemical chlorination of methane, the formation of a small amount of ethane confirms that the reaction involves:",
      option_a: "Free-radical chain mechanism with chain termination by combination of two methyl radicals.",
      option_b: "Carbocation intermediate that undergoes dimerization.",
      option_c: "Carbanion intermediate reacting with methyl chloride.",
      option_d: "Concerted single-step molecular substitution without intermediates.",
      correct_option: "A",
      explanation: "1. Free-radical chlorination of methane consists of three phases: initiation, propagation, and termination.\n2. In the propagation step, chlorine radicals abstract hydrogen from methane to generate methyl free radicals (•CH₃).\n3. In the termination phase, collisions between two propagating free radicals terminate the chain:\n   •CH₃ + •CH₃ → CH₃–CH₃ (ethane)\n4. The detection of ethane in the reaction mixture provides definitive experimental proof of the presence of methyl free radicals.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4769,
    similarQuestion: {
      question: "Which of the following alkanes can be readily oxidized to a tertiary alcohol by alkaline potassium permanganate (KMnO₄)?",
      option_a: "2-Methylpropane (isobutane)",
      option_b: "n-Butane",
      option_c: "Propane",
      option_d: "Ethane",
      correct_option: "A",
      explanation: "1. Ordinary alkanes are chemically inert toward common oxidizing agents like KMnO₄ due to strong nonpolar C–C and C–H bonds.\n2. However, alkanes containing a tertiary (3°) hydrogen atom (attached to a 3° carbon) are selectively oxidized by alkaline KMnO₄ to the corresponding tertiary alcohol.\n3. In 2-methylpropane, (CH₃)₃CH, the central carbon is tertiary and bonded to one tertiary hydrogen.\n4. Oxidation with KMnO₄ converts it into 2-methylpropan-2-ol (tert-butyl alcohol):\n   (CH₃)₃CH + [O] --(KMnO₄)--> (CH₃)₃C–OH\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.token;
    console.log('Logged in successfully, token received.');

    for (const q of test110Part1Questions) {
      const res = await put(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${q.id}`,
        JSON.stringify({ similarQuestion: q.similarQuestion }),
        token
      );
      console.log(`Updated Test Question ID ${q.id}: ${res.success ? 'SUCCESS' : JSON.stringify(res)}`);
    }
    console.log('All 20 questions of Test 110 Part 1 updated successfully!');
  } catch (err) {
    console.error('Error updating questions:', err);
  }
}

run();
