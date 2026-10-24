const https = require('https');

const loginData = JSON.stringify({
  username: 'indraprasthaadmin',
  password: 'indraprastha@123'
});

function postRequest(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function putRequest(url, data, token) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
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
    id: 3866,
    similarQuestion: {
      question: "Which of the following hydrated chlorides CANNOT be converted into its anhydrous form simply by heating, because it undergoes hydrolysis to form an oxide or oxychloride and HCl gas?\n(A) AlCl₃·6H₂O\n(B) MgCl₂·6H₂O\n(C) CaCl₂·6H₂O\n(D) BaCl₂·2H₂O",
      option_a: "A and B only",
      option_b: "C and D only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "A",
      explanation: "1. Due to high charge densities and strong polarizing power of small trivalent Al³⁺ and divalent Mg²⁺, their hydrated chlorides undergo hydrolysis upon heating rather than simple dehydration:\n2 AlCl₃·6H₂O → Al₂O₃ + 6 HCl + 9 H₂O\nMgCl₂·6H₂O → MgO + 2 HCl + 5 H₂O\nTherefore, anhydrous AlCl₃ and MgCl₂ cannot be prepared by heating their hydrates.\n2. In contrast, larger cations with lower polarizing power like Ca²⁺ and Ba²⁺ do not undergo hydrolysis and lose water of crystallization cleanly to yield anhydrous salts.\nTherefore, hydrated salts (A) and (B) cannot be converted to anhydrous form by heating.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3867,
    similarQuestion: {
      question: "When chlorine gas (Cl₂) is passed into a cold, dilute aqueous solution of sodium hydroxide (NaOH), which chlorine-containing oxoanion is formed?",
      option_a: "Hypochlorite ion (ClO⁻)",
      option_b: "Chlorate ion (ClO₃⁻)",
      option_c: "Perchlorate ion (ClO₄⁻)",
      option_d: "Chlorite ion (ClO₂⁻)",
      correct_option: "A",
      explanation: "1. With cold, dilute NaOH, chlorine undergoes disproportionation to form chloride and hypochlorite:\nCl₂ + 2 NaOH (cold, dilute) → NaCl + NaOCl + H₂O\nThe oxoanion produced is hypochlorite (ClO⁻ or OCl⁻).\n2. In contrast, with hot, concentrated NaOH, chlorine disproportionates to produce chloride and chlorate:\n3 Cl₂ + 6 NaOH (hot, conc.) → 5 NaCl + NaClO₃ + 3 H₂O\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3868,
    similarQuestion: {
      question: "Which of the following is an example of a mixed oxide consisting of a metal in two different oxidation states?",
      option_a: "Fe₃O₄ (FeO · Fe₂O₃)",
      option_b: "Pb₃O₄ (2 PbO · PbO₂)",
      option_c: "Mn₃O₄ (2 MnO · MnO₂)",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "A mixed oxide is composed of stoichiometric ratios of two simple oxides of the same metal in different oxidation states:\n1. Magnetite (Fe₃O₄) is a stoichiometric mixture of FeO (Fe²⁺) and Fe₂O₃ (Fe³⁺).\n2. Red lead (Pb₃O₄) consists of two parts of lead(II) oxide (PbO) and one part of lead(IV) oxide (PbO₂).\n3. Hausmannite (Mn₃O₄) consists of two parts of manganese(II) oxide (MnO) and one part of manganese(IV) oxide (MnO₂).\nTherefore, all of the given oxides are mixed oxides.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3869,
    similarQuestion: {
      question: "In the chromyl chloride test for detection of chloride ions, heating a chloride salt with solid K₂Cr₂O₇ and concentrated H₂SO₄ produces deep red vapours of:",
      option_a: "Chromic anhydride (CrO₃)",
      option_b: "Chromyl chloride (CrO₂Cl₂)",
      option_c: "Chromium trichloride (CrCl₃)",
      option_d: "Chromic oxide (Cr₂O₃)",
      correct_option: "B",
      explanation: "In the chromyl chloride test:\nK₂Cr₂O₇ + 4 NaCl + 6 H₂SO₄ → 2 KHSO₄ + 4 NaHSO₄ + 2 CrO₂Cl₂↑ + 3 H₂O\n1. The deep brownish-red vapours evolved are chromyl chloride (CrO₂Cl₂).\n2. When these vapours are passed into NaOH solution, a yellow solution of sodium chromate (Na₂CrO₄) is formed, which on addition of lead acetate and acetic acid yields a yellow precipitate of lead chromate (PbCrO₄).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3870,
    similarQuestion: {
      question: "When orange crystalline ammonium dichromate, (NH₄)₂Cr₂O₇, is heated, it undergoes self-oxidation-reduction to produce a green solid residue (Z) and a colourless gas (Y). When heated magnesium ribbon is introduced into a jar of gas (Y), a white compound is formed. What is the formula of this white compound?",
      option_a: "Mg₃N₂",
      option_b: "MgO",
      option_c: "Mg(NO₃)₂",
      option_d: "MgCrO₄",
      correct_option: "A",
      explanation: "1. Thermal decomposition of orange ammonium dichromate:\n(NH₄)₂Cr₂O₇(s) → N₂(g) [colorless gas Y] + Cr₂O₃(s) [green residue Z] + 4 H₂O(g)\n2. When heated magnesium reacts with nitrogen gas (Y):\n3 Mg(s) + N₂(g) → Mg₃N₂(s) [magnesium nitride, a white solid]\nTherefore, the white compound is Mg₃N₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3871,
    similarQuestion: {
      question: "In the layer test for halide detection, chlorine water is added to an aqueous halide solution in the presence of an organic solvent (CCl₄ or CHCl₃):\nThe organic layer turns reddish-brown due to liberation of halogen X₂. Upon passing excess chlorine water, the color does NOT disappear. This test confirms the presence of:",
      option_a: "Chloride (Cl⁻)",
      option_b: "Bromide (Br⁻)",
      option_c: "Iodide (I⁻)",
      option_d: "Fluoride (F⁻)",
      correct_option: "B",
      explanation: "In the organic layer test:\n1. Chlorine water oxidizes bromide ions to free bromine (Br₂):\nCl₂ + 2 Br⁻ → 2 Cl⁻ + Br₂\n2. The liberated bromine dissolves in the organic layer (CHCl₃ or CCl₄) giving a distinct orange-red/reddish-brown layer.\n3. Unlike iodide (which gives a violet layer that turns colorless with excess chlorine due to oxidation to HIO₃), bromine remains persistent and does not decolorize with excess chlorine.\nTherefore, this test confirms bromide (Br⁻).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3872,
    similarQuestion: {
      question: "An oily, explosive yellow liquid trihalide of nitrogen (X) undergoes hydrolysis with water to yield ammonia (or ammonium hydroxide) and hypochlorous acid (HOCl). What is the chemical formula of compound X?",
      option_a: "NF₃",
      option_b: "NCl₃",
      option_c: "PCl₃",
      option_d: "AsCl₃",
      correct_option: "B",
      explanation: "1. Nitrogen trichloride (NCl₃) is an oily, dense, explosive liquid.\n2. In NCl₃, chlorine has vacant 3d orbitals that can coordinate with the lone pair of water during nucleophilic attack, causing hydrolysis:\nNCl₃ + 3 H₂O → NH₃ + 3 HOCl\nIn aqueous solution, NH₃ forms NH₄OH.\n3. By contrast, NF₃ does not hydrolyze because neither N nor F possesses vacant d-orbitals.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3873,
    similarQuestion: {
      question: "Green vitriol (FeSO₄·7H₂O) loses its water of crystallization on heating to yield anhydrous FeSO₄, which on strong heating decomposes into a brown-red solid residue (D) and two pungent gases (B) and (C). Gas (B) reduces acidic K₂Cr₂O₇ to green Cr³⁺, and gas (C) fumes in moist air to form sulfuric acid. The solid residue (D) and gases (B) and (C) are:",
      option_a: "Fe₂O₃, SO₂, and SO₃",
      option_b: "FeO, SO₂, and O₂",
      option_c: "Fe₃O₄, SO₃, and H₂S",
      option_d: "Fe₂O₃, CO, and CO₂",
      correct_option: "A",
      explanation: "Thermal decomposition of ferrous sulfate occurs according to:\n2 FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g)\n1. The reddish-brown solid residue (D) is ferric oxide (Fe₂O₃).\n2. Gas (B) is sulfur dioxide (SO₂), a reducing gas that reduces orange dichromate to green Cr³⁺.\n3. Gas (C) is sulfur trioxide (SO₃), which dissolves in water to form H₂SO₄ and readily trimerizes to cyclic S₃O₉ without any S-S bonds.\n4. Fe₂O₃ reacts with HCl to produce FeCl₃, which exists as a dimeric Lewis acid (Fe₂Cl₆).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3874,
    similarQuestion: {
      question: "A white crystalline solid salt (A) imparts a golden-yellow color to a Bunsen flame. When heated with solid MnO₂ and concentrated H₂SO₄, it evolves a suffocating, greenish-yellow gas (B) which bleaches moist litmus paper. An aqueous solution of (A) gives a curdy white precipitate (C) with AgNO₃, which dissolves readily in dilute aqueous ammonia. The substances (A), (B), and (C) are:",
      option_a: "NaCl, Cl₂, and AgCl",
      option_b: "NaBr, Br₂, and AgBr",
      option_c: "KCl, Cl₂, and AgCl",
      option_d: "NaI, I₂, and AgI",
      correct_option: "A",
      explanation: "1. The golden-yellow flame test confirms sodium (Na⁺).\n2. When NaCl is heated with MnO₂ and conc. H₂SO₄, chlorine gas is evolved:\n2 NaCl + MnO₂ + 2 H₂SO₄ → Na₂SO₄ + MnSO₄ + 2 H₂O + Cl₂↑ [greenish-yellow gas B]\n3. With AgNO₃, chloride forms a curdy white precipitate of silver chloride (AgCl):\nNaCl + AgNO₃ → AgCl↓ [white precipitate C] + NaNO₃\nAgCl dissolves in aqueous ammonia to form the soluble complex [Ag(NH₃)₂]Cl.\nTherefore, (A) is NaCl, (B) is Cl₂, and (C) is AgCl.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3875,
    similarQuestion: {
      question: "Which of the following non-metal oxides can exist as a monomer in the gas phase and polymerizes into three distinct solid allotropic forms (α, β, and γ forms, with cyclic trimer and linear helical chain structures)?",
      option_a: "SO₂",
      option_b: "SO₃",
      option_c: "CO₂",
      option_d: "N₂O₅",
      correct_option: "B",
      explanation: "1. In the gas phase, sulfur trioxide (SO₃) exists as a planar monomeric molecule with D₃h symmetry.\n2. In the solid state, SO₃ condenses into three allotropic forms:\n- γ-SO₃: A low-melting ice-like trimer (S₃O₉) with a six-membered ring of alternating S and O atoms.\n- β-SO₃: An asbestos-like fibrous polymer consisting of infinite helical chains of linked SO₄ tetrahedra.\n- α-SO₃: The highest melting, most stable cross-linked sheet-like polymer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3876,
    similarQuestion: {
      question: "Red lead (Pb₃O₄) is a mixed oxide of lead with the composition 2PbO·PbO₂. When treated with dilute nitric acid (HNO₃), PbO dissolves while PbO₂ remains as a dark brown insoluble residue. What is the reaction that occurs?",
      option_a: "Pb₃O₄ + 4 HNO₃ → 2 Pb(NO₃)₂ + PbO₂ + 2 H₂O",
      option_b: "Pb₃O₄ + 6 HNO₃ → 3 Pb(NO₃)₂ + 3 H₂O + O₂",
      option_c: "Pb₃O₄ + 2 HNO₃ → PbO + 2 Pb(NO₃)₂ + H₂O",
      option_d: "Pb₃O₄ + 4 HNO₃ → 3 Pb(NO₃)₂ + 2 H₂O",
      correct_option: "A",
      explanation: "1. Red lead (Pb₃O₄) is chemically 2PbO·PbO₂.\n2. When reacted with dilute HNO₃, the basic oxide component PbO dissolves by acid-base neutralization to form soluble lead nitrate:\n2 PbO + 4 HNO₃ → 2 Pb(NO₃)₂ + 2 H₂O\n3. The amphoteric, tetravalent lead dioxide (PbO₂) does not react with dilute nitric acid and remains as an insoluble dark brown solid.\n4. Combining these gives the overall reaction:\nPb₃O₄ + 4 HNO₃ → 2 Pb(NO₃)₂ + PbO₂↓ + 2 H₂O\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3877,
    similarQuestion: {
      question: "Which of the following metal oxides CANNOT oxidize concentrated hydrochloric acid (HCl) to chlorine gas (Cl₂) because the metal is already in its stable lowest oxidation state (+2) and lacks oxidizing ability?",
      option_a: "MnO₂",
      option_b: "PbO₂",
      option_c: "PbO",
      option_d: "KMnO₄",
      correct_option: "C",
      explanation: "1. In PbO, lead is in the +2 oxidation state and functions as a simple basic oxide. Reaction with HCl is an acid-base neutralization forming salt and water with no redox change:\nPbO + 2 HCl → PbCl₂ + H₂O\n2. In contrast, in PbO₂ and MnO₂, the metals are in the +4 state; they act as strong oxidizing agents and readily oxidize Cl⁻ to chlorine gas:\nPbO₂ + 4 HCl → PbCl₂ + Cl₂↑ + 2 H₂O\nMnO₂ + 4 HCl → MnCl₂ + Cl₂↑ + 2 H₂O\nTherefore, PbO cannot produce chlorine gas.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3878,
    similarQuestion: {
      question: "Which of the following statements regarding borax, Na₂[B₄O₅(OH)₄]·8H₂O, is/are correct?\n(A) The tetranuclear borate anion contains two sp² hybridized boron atoms and two sp³ hybridized boron atoms.\n(B) Borax dissolves in water to give an alkaline solution due to hydrolysis forming a buffer of boric acid and sodium metaborate.\n(C) In the borax bead test, heating borax with a cobalt salt in an oxidizing flame produces a deep blue bead of cobalt metaborate, Co(BO₂)₂.\n(D) All of the above statements are correct.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us evaluate the statements for borax:\n1. The [B₄O₅(OH)₄]²⁻ anion contains two tetrahedral BO₄ units (sp³ hybridized) and two triangular BO₃ units (sp² hybridized). (Statement A is correct)\n2. In aqueous solution, borax hydrolyzes: Na₂B₄O₇ + 7 H₂O → 2 NaOH + 4 H₃BO₃. The strong base NaOH makes the solution distinctly alkaline (pH ~9). (Statement B is correct)\n3. When borax is fused with a cobalt salt, cobalt metaborate is formed: CoO + B₂O₃ → Co(BO₂)₂, which imparts a characteristic deep blue color to the bead. (Statement C is correct)\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3879,
    similarQuestion: {
      question: "Silicon carbide (SiC, known commercially as carborundum) is a network covalent solid. Which of the following statements regarding SiC is/are correct?\n(A) Both silicon and carbon atoms are sp³ hybridized and tetrahedrally coordinated to four other atoms, forming a diamond-like three-dimensional network.\n(B) Due to strong covalent bonds throughout the lattice, it has an extremely high melting point and hardness (close to diamond).\n(C) It is chemically inert and unattacked by most acids.\n(D) All of the above statements are correct.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us review silicon carbide (SiC):\n1. Structure: SiC has a crystal structure analogous to diamond (zinc blende lattice), where each Si is tetrahedrally bonded to 4 C atoms and each C is tetrahedrally bonded to 4 Si atoms via sp³-sp³ σ-bonds. (Statement A is correct)\n2. Physical properties: Because of the continuous giant covalent lattice, it exhibits extreme hardness (Mohs hardness ~9.5) and a very high melting point (~2700°C). (Statement B is correct)\n3. Chemical properties: SiC is remarkably chemical resistant and inert to attack by almost all common mineral acids. (Statement C is correct)\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3880,
    similarQuestion: {
      question: "Match the oxoacids of phosphorus in Column I with the correct number of P-OH bonds present per molecule in Column II:\nColumn I:\n(A) Hypophosphorous acid (H₃PO₂)\n(B) Orthophosphoric acid (H₃PO₄)\n(C) Pyrophosphoric acid (H₄P₂O₇)\n(D) Orthophosphorous acid (H₃PO₃)\nColumn II:\n(1) 1 P-OH bond\n(2) 2 P-OH bonds\n(3) 3 P-OH bonds\n(4) 4 P-OH bonds",
      option_a: "A-1, B-2, C-3, D-4",
      option_b: "A-1, B-3, C-4, D-2",
      option_c: "A-2, B-3, C-4, D-1",
      option_d: "A-3, B-4, C-1, D-2",
      correct_option: "B",
      explanation: "From the molecular structures of the oxoacids of phosphorus:\n1. Hypophosphorous acid (H₃PO₂): Has one P=O, two P-H, and one P-OH bond (monobasic) ⇒ (1).\n2. Orthophosphoric acid (H₃PO₄): Has one P=O and three P-OH bonds (tribasic) ⇒ (3).\n3. Pyrophosphoric acid (H₄P₂O₇): Has two P=O, one P-O-P bridge, and four P-OH bonds (tetrabasic) ⇒ (4).\n4. Orthophosphorous acid (H₃PO₃): Has one P=O, one P-H, and two P-OH bonds (dibasic) ⇒ (2).\nTherefore, the correct matching is A-1, B-3, C-4, D-2.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await postRequest('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.data.token;
    console.log('Logged in successfully.');

    let count = 0;
    for (const item of updates) {
      count++;
      const res = await putRequest(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`,
        JSON.stringify({ similarQuestion: item.similarQuestion }),
        token
      );
      if (res.status === 200) {
        console.log(`[SUCCESS] Updated Test 104 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 104 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
