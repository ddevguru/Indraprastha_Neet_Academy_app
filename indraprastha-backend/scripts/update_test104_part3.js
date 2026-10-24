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
    id: 4715,
    similar: {
      question: "Which of the following statements about carbon monoxide (CO) is INCORRECT?",
      option_a: "It acts as a powerful reducing agent at high temperatures.",
      option_b: "It acts as a ligand forming metal carbonyls.",
      option_c: "It behaves as a basic oxide and dissolves in water to form a strong base.",
      option_d: "It is a neutral oxide that is sparingly soluble in water.",
      correct_option: "C",
      explanation: "1. Carbon monoxide (CO) is a neutral oxide, meaning it does not react with acids or bases, nor does it form basic or acidic solutions in water.\n2. CO acts as a reducing agent in metallurgical processes (e.g., reducing Fe₂O₃ to Fe).\n3. CO contains a lone pair of electrons on carbon and acts as a σ-donor and π-acceptor ligand, readily forming coordination complexes like Ni(CO)₄ and Fe(CO)₅.\n4. Therefore, describing CO as a basic oxide forming a strong base in water is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4716,
    similar: {
      question: "In graphite, the C–C bond length within a planar layer is 141.5 pm, which is shorter than a standard single C–C bond (154 pm). This is primarily due to:",
      option_a: "Extensive delocalized pπ-pπ bonding across the sp² hybridized planar sheet.",
      option_b: "Strong covalent bonding connecting successive parallel sheets.",
      option_c: "sp³ hybridization of each carbon atom in the lattice.",
      option_d: "Weak van der Waals forces acting within each hexagonal ring.",
      correct_option: "A",
      explanation: "1. In graphite, each carbon atom undergoes sp² hybridization, forming three localized σ-bonds with neighbouring carbon atoms in a hexagonal planar network.\n2. The fourth valence electron of each carbon occupies an unhybridized 2p orbital perpendicular to the layer.\n3. These parallel 2p orbitals overlap laterally throughout the planar network, creating a delocalized π-electron system (pπ-pπ bonding).\n4. This delocalization imparts partial double-bond character to the C–C bonds, decreasing the bond length from 154 pm (pure single bond) to 141.5 pm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4717,
    similar: {
      question: "Which of the following ligands can act as a π-acceptor by forming dπ-dπ back-bonding with transition metals?",
      option_a: "N(CH₃)₃",
      option_b: "P(C₂H₅)₃",
      option_c: "NF₃",
      option_d: "NH₃",
      correct_option: "B",
      explanation: "1. In transition metal complexes, a ligand with vacant d-orbitals can accept electron density from the filled d-orbitals of the transition metal to form a dπ-dπ back-bond.\n2. Nitrogen belongs to the second period (valence shell n = 2) and lacks d-orbitals completely. Hence, nitrogen ligands such as N(CH₃)₃, NF₃, and NH₃ cannot participate in dπ-dπ bonding.\n3. Phosphorus (belonging to the third period) possesses energetically accessible vacant 3d-orbitals.\n4. Therefore, phosphines such as P(C₂H₅)₃ can readily act as π-acceptor ligands through dπ-dπ back-bonding.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4718,
    similar: {
      question: "Among the trihalides of nitrogen (NX₃), which compound is exothermic, chemically stable, and non-explosive at room temperature?",
      option_a: "NF₃",
      option_b: "NCl₃",
      option_c: "NBr₃",
      option_d: "NI₃",
      correct_option: "A",
      explanation: "1. Nitrogen forms trihalides of the type NX₃ (where X = F, Cl, Br, I).\n2. Due to the small sizes of both nitrogen and fluorine, the overlap between their 2p orbitals is exceptionally strong and effective, leading to a very high N–F bond dissociation energy.\n3. As a result, NF₃ is thermodynamically stable with a negative enthalpy of formation (exothermic).\n4. The other trihalides (NCl₃, NBr₃, NI₃) have significantly weaker, longer N–X bonds and are endothermic, unstable, and explosive compounds.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4719,
    similar: {
      question: "Which of the following factors is primarily responsible for bismuthine (BiH₃) being the strongest reducing agent among Group 15 hydrides?",
      option_a: "Its high thermal stability and planar geometry",
      option_b: "Its lowest E–H bond dissociation enthalpy and weakest Bi–H bond",
      option_c: "Its highest electronegativity difference between Bi and H",
      option_d: "Its ability to form exceptionally strong intermolecular hydrogen bonds",
      correct_option: "B",
      explanation: "1. The reducing character of Group 15 hydrides (EH₃: NH₃, PH₃, AsH₃, SbH₃, BiH₃) depends directly on their ability to release hydrogen.\n2. As we descend Group 15 from N to Bi, the atomic radius of the central atom increases significantly, resulting in poorer orbital overlap and a longer, weaker E–H bond.\n3. Consequently, the bond dissociation enthalpy of the E–H bond decreases markedly: N–H > P–H > As–H > Sb–H > Bi–H.\n4. Because BiH₃ has the lowest bond dissociation enthalpy, it releases hydrogen most readily, making it the strongest reducing agent among the group.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4720,
    similar: {
      question: "Pure phosphine (PH₃) is non-flammable in air at room temperature. However, crude commercial samples often catch fire spontaneously due to the presence of traces of:",
      option_a: "Diphosphane (P₂H₄) or P₄ vapours",
      option_b: "Phosphorus pentoxide (P₄O₁₀)",
      option_c: "Hypophosphorous acid (H₃PO₂)",
      option_d: "Orthophosphoric acid (H₃PO₄)",
      correct_option: "A",
      explanation: "1. Pure phosphine (PH₃) is completely non-flammable in air when unheated.\n2. During preparation (e.g., heating white phosphorus with aqueous NaOH), small amounts of diphosphane (P₂H₄) or unreacted P₄ vapours are formed as impurities.\n3. P₂H₄ is spontaneously flammable in air. Its ignition causes the main phosphine gas to catch fire and burn with characteristic smoky rings of P₄O₁₀.\n4. Phosphine is purified by absorbing it in cold HI to form phosphonium iodide (PH₄I), which is then treated with KOH to release pure, non-flammable PH₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4721,
    similar: {
      question: "In the vapour / gaseous state, what is the molecular geometry and arrangement of atoms in nitric acid (HNO₃)?",
      option_a: "Planar",
      option_b: "Pyramidal",
      option_c: "Tetrahedral",
      option_d: "T-shaped",
      correct_option: "A",
      explanation: "1. In the gaseous phase, the nitric acid (HNO₃) molecule is planar.\n2. The central nitrogen atom is sp² hybridized, surrounded by three oxygen atoms in a planar geometry (ONO bond angle is approximately 130°, and HON angle is approximately 102°).\n3. Resonance between the non-protonated oxygen atoms maintains the planarity of the molecule.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4722,
    similar: {
      question: "An aqueous solution of phosphine (PH₃) on exposure to light decomposes slowly to deposit which form of phosphorus along with liberation of hydrogen gas?",
      option_a: "Red phosphorus (P₄, red) and H₂",
      option_b: "White phosphorus (P₄, white) and O₂",
      option_c: "Black phosphorus and H₂O",
      option_d: "Phosphorus pentoxide (P₄O₁₀)",
      correct_option: "A",
      explanation: "1. Phosphine (PH₃) is sparingly soluble in water.\n2. When its aqueous solution is exposed to sunlight or UV radiation, it undergoes photochemical decomposition:\n   4PH₃ → P₄ (red phosphorus) + 6H₂\n3. Red phosphorus precipitates out as a red deposit while hydrogen gas is evolved.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4723,
    similar: {
      question: "Which of the following oxoacids of phosphorus does NOT undergo thermal disproportionation upon heating?",
      option_a: "Orthophosphorous acid (H₃PO₃)",
      option_b: "Hypophosphorous acid (H₃PO₂)",
      option_c: "Orthophosphoric acid (H₃PO₄)",
      option_d: "Pyrophosphorous acid (H₄P₂O₅)",
      correct_option: "C",
      explanation: "1. Disproportionation is a redox reaction in which an element in an intermediate oxidation state is simultaneously oxidized and reduced.\n2. In H₃PO₃ and H₃PO₂, phosphorus is in the +3 and +1 oxidation states, respectively. Upon heating, they disproportionate into PH₃ (-3) and H₃PO₄ (+5).\n   4H₃PO₃ → 3H₃PO₄ + PH₃\n   2H₃PO₂ → H₃PO₄ + PH₃\n3. In orthophosphoric acid (H₃PO₄), phosphorus is already in its maximum possible oxidation state of +5. It cannot be oxidized any further, so it cannot undergo disproportionation. On heating, it simply loses water to form pyrophosphoric acid (H₄P₂O₇).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4724,
    similar: {
      question: "Although nitrogen and chlorine have nearly identical Pauling electronegativities (3.0), N₂ is chemically inert at ambient conditions whereas Cl₂ is highly reactive. What is the fundamental reason for this difference?",
      option_a: "Chlorine has a much smaller atomic radius than nitrogen.",
      option_b: "The N≡N triple bond has an extraordinarily large bond dissociation enthalpy (946 kJ/mol).",
      option_c: "Nitrogen lacks lone pairs on its atoms.",
      option_d: "Chlorine forms intermolecular hydrogen bonds.",
      correct_option: "B",
      explanation: "1. Nitrogen exists as a diatomic molecule with a strong triple bond (one σ and two π bonds) between the two nitrogen atoms (:N≡N:).\n2. The bond dissociation enthalpy of the N≡N triple bond is exceptionally high (approximately 946 kJ/mol), making N₂ kinetically and thermodynamically very unreactive at room temperature.\n3. In contrast, Cl₂ contains a single covalent bond (Cl–Cl) with a much lower bond dissociation enthalpy (approximately 242 kJ/mol), allowing it to readily undergo chemical reactions.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4725,
    similar: {
      question: "Phosphorus trichloride (PCl₃) fumes in moist air because it rapidly hydrolyses to produce:",
      option_a: "H₃PO₃ and fumes of HCl",
      option_b: "H₃PO₄ and fumes of Cl₂",
      option_c: "H₃PO₂ and fumes of HCl",
      option_d: "P₄O₁₀ and fumes of HCl",
      correct_option: "A",
      explanation: "1. Phosphorus trichloride (PCl₃) reacts readily with water / moisture in the air via a nucleophilic substitution hydrolysis reaction:\n   PCl₃ + 3H₂O → H₃PO₃ + 3HCl\n2. The products are orthophosphorous acid (H₃PO₃) and hydrogen chloride (HCl).\n3. The released HCl gas dissolves in moisture to form dense white fumes of hydrochloric acid droplets.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4726,
    similar: {
      question: "In the industrial manufacture of nitric acid by Ostwald's process, the primary raw material catalytically oxidized by atmospheric oxygen is:",
      option_a: "Nitrogen gas (N₂)",
      option_b: "Ammonia gas (NH₃)",
      option_c: "Nitrogen dioxide (NO₂)",
      option_d: "Dinitrogen pentoxide (N₂O₅)",
      correct_option: "B",
      explanation: "1. In Ostwald's process, nitric acid is produced on a large scale starting from ammonia (NH₃).\n2. The first step involves catalytic oxidation of ammonia by atmospheric oxygen over a Pt/Rh gauge catalyst at 500 K and 9 bar:\n   4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g)\n3. The nitric oxide (NO) formed is subsequently oxidized to NO₂, which is absorbed in water to yield HNO₃.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4727,
    similar: {
      question: "Containers used in Holme's signals thrown into the sea contain a mixture of calcium carbide and calcium phosphide. When pierced and thrown in water, they produce:",
      option_a: "Acetylene (C₂H₂) and phosphine (PH₃), which ignites and gives a bright signal.",
      option_b: "Methane (CH₄) and ammonia (NH₃).",
      option_c: "Carbon monoxide (CO) and phosphorus trichloride (PCl₃).",
      option_d: "Ethylene (C₂H₄) and orthophosphoric acid (H₃PO₄).",
      correct_option: "A",
      explanation: "1. Holme's signals contain a perforated mixture of calcium carbide (CaC₂) and calcium phosphide (Ca₃P₂).\n2. Upon contact with sea water, they react according to the reactions:\n   CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂ (acetylene)\n   Ca₃P₂ + 6H₂O → 3Ca(OH)₂ + 2PH₃ (phosphine)\n3. Traces of diphosphane (P₂H₄) accompanying the phosphine cause spontaneous ignition in air.\n4. The burning phosphine ignites the acetylene, producing a luminous flame and dense white smoke that serves as a distress signal at sea.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4728,
    similar: {
      question: "What is the correct decreasing order of acidic strength among the dioxides of Group 16 elements (SO₂, SeO₂, TeO₂)?",
      option_a: "TeO₂ > SeO₂ > SO₂",
      option_b: "SO₂ > SeO₂ > TeO₂",
      option_c: "SeO₂ > SO₂ > TeO₂",
      option_d: "SO₂ = SeO₂ = TeO₂",
      correct_option: "B",
      explanation: "1. As we move down Group 16 from sulphur to tellurium, the non-metallic character of the elements decreases and their metallic character increases.\n2. Consequently, the acidic nature of their oxides decreases down the group.\n3. SO₂ is strongly acidic (forms sulphurous acid, H₂SO₃), SeO₂ is moderately acidic, and TeO₂ is amphoteric with weakly basic properties.\n4. Thus, the decreasing order of acidic character is: SO₂ > SeO₂ > TeO₂.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4729,
    similar: {
      question: "Which of the following compounds is classified as a mixed oxide?",
      option_a: "Carbon dioxide (CO₂)",
      option_b: "Dichlorine heptoxide (Cl₂O₇)",
      option_c: "Red lead / Minium (Pb₃O₄)",
      option_d: "Sulphur dioxide (SO₂)",
      correct_option: "C",
      explanation: "1. A mixed oxide is a chemical compound consisting of two simpler oxides of the same metal in different oxidation states.\n2. Red lead (Pb₃O₄) is a stoichiometric combination of lead(II) oxide and lead(IV) oxide in the ratio 2:1, represented as 2PbO·PbO₂.\n3. In contrast, CO₂, Cl₂O₇, and SO₂ are simple non-metal covalent acidic oxides containing the respective central atoms in a single oxidation state.\nTherefore, Option (C) is the correct answer."
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
  console.log("Login successful! Updating Test 104 Part 3 (15 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res);
  }

  console.log("Test 104 Part 3 update complete!");
}

run().catch(console.error);
