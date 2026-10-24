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
    id: 4700,
    similarQuestion: {
      question: "Due to the inert pair effect, the stability of the lower +1 oxidation state relative to the +3 oxidation state among Group 13 elements increases down the group in the order:",
      option_a: "Tl < In < Ga < Al",
      option_b: "Al < Ga < In < Tl",
      option_c: "Ga < Al < In < Tl",
      option_d: "Al = Ga = In = Tl",
      correct_option: "B",
      explanation: "In Group 13 elements:\n1. The outer electronic configuration is ns² np¹.\n2. On moving down the group, the intervening d and f electrons provide poor shielding of the nucleus, resulting in tighter binding of the ns² electrons (inert pair effect).\n3. Consequently, the tendency of ns² electrons to participate in bond formation decreases down the group.\n4. Therefore, the stability of the +1 oxidation state increases in the order:\nAl < Ga < In < Tl\n(Tl⁺ is more stable than Tl³⁺).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4701,
    similarQuestion: {
      question: "Which of the following Group 13 metal ions acts as a strong oxidizing agent because of the inert pair effect favoring the +1 oxidation state?",
      option_a: "Al³⁺",
      option_b: "Ga³⁺",
      option_c: "Tl³⁺",
      option_d: "B³⁺",
      correct_option: "C",
      explanation: "1. For thallium (Tl, Z = 81), the 6s² electrons are strongly held by the high effective nuclear charge due to poor shielding by 4f¹⁴ and 5d¹⁰ electrons (inert pair effect).\n2. As a consequence, Tl⁺ is much more stable than Tl³⁺.\n3. Therefore, Tl³⁺ readily gains two electrons to get reduced to Tl⁺, acting as a powerful oxidizing agent:\nTl³⁺ + 2 e⁻ → Tl⁺; E° = +1.26 V\n4. By contrast, Al³⁺, Ga³⁺, and In³⁺ are stable in the +3 state and do not exhibit oxidizing properties.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4702,
    similarQuestion: {
      question: "What is the correct increasing order of Lewis acid strength among boron trihalides?",
      option_a: "BF₃ < BCl₃ < BBr₃ < BI₃",
      option_b: "BI₃ < BBr₃ < BCl₃ < BF₃",
      option_c: "BF₃ < BI₃ < BCl₃ < BBr₃",
      option_d: "BCl₃ < BF₃ < BBr₃ < BI₃",
      correct_option: "A",
      explanation: "1. Boron trihalides have only 6 electrons in the valence shell of boron and act as Lewis acids by accepting an electron pair into the empty 2p orbital of boron.\n2. In BF₃, effective 2pπ-2pπ back-bonding occurs between the filled 2p orbital of fluorine and the vacant 2p orbital of boron, significantly compensating for the electron deficiency of boron.\n3. In BCl₃ (2p-3p), BBr₃ (2p-4p), and BI₃ (2p-5p), the efficiency of pπ-pπ back-bonding decreases sharply due to increasing size and energy mismatch of the halogen p-orbitals.\n4. Consequently, boron remains most electron-deficient in BI₃ and least in BF₃.\nTherefore, Lewis acid strength increases in the order:\nBF₃ < BCl₃ < BBr₃ < BI₃\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4703,
    similarQuestion: {
      question: "Among the oxides of Group 13 elements, which oxide dissolves in water to produce an acidic solution?",
      option_a: "Al₂O₃",
      option_b: "Ga₂O₃",
      option_c: "B₂O₃",
      option_d: "Tl₂O₃",
      correct_option: "C",
      explanation: "1. Boron is a non-metal, and its oxide B₂O₃ is acidic. It dissolves in water to form orthoboric acid (H₃BO₃):\nB₂O₃ + 3 H₂O → 2 H₃BO₃\n2. Al₂O₃ and Ga₂O₃ are amphoteric oxides, reacting with both acids and alkalis.\n3. In₂O₃ and Tl₂O₃ are basic oxides.\nTherefore, B₂O₃ yields an acidic solution in water.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4704,
    similarQuestion: {
      question: "When a bottle of anhydrous aluminium chloride (AlCl₃) is opened in moist air, dense white fumes are observed around the mouth of the bottle. These white fumes are due to:",
      option_a: "Sublimation of AlCl₃ solid.",
      option_b: "Hydrolysis of AlCl₃ by atmospheric moisture to evolve fumes of hydrogen chloride (HCl) gas.",
      option_c: "Decomposition of AlCl₃ to give chlorine gas (Cl₂).",
      option_d: "Reaction of AlCl₃ with atmospheric nitrogen.",
      correct_option: "B",
      explanation: "Anhydrous aluminium chloride is covalent and highly hygroscopic. In moist air, it readily absorbs atmospheric water vapor and undergoes partial hydrolysis:\nAlCl₃(s) + 3 H₂O(g) → Al(OH)₃(s) + 3 HCl(g)\nThe evolved gaseous hydrogen chloride (HCl) dissolves in airborne moisture droplets to form tiny hydrochloric acid mist droplets, which appear as dense white fumes.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4705,
    similarQuestion: {
      question: "An aqueous solution of borax (Na₂B₄O₇·10H₂O) is alkaline to litmus because:",
      option_a: "Borax is a salt of a strong acid and a weak base.",
      option_b: "Borax undergoes anionic hydrolysis in water to produce a strong base (NaOH) and a weak monobasic acid (H₃BO₃).",
      option_c: "Borax dissociates to produce free H⁺ ions.",
      option_d: "Boric acid is a strong mineral acid.",
      correct_option: "B",
      explanation: "Borax is a salt formed from a strong base (NaOH) and a weak acid (H₃BO₃). In aqueous solution, it undergoes hydrolysis:\nNa₂B₄O₇ + 7 H₂O ⇌ 2 NaOH + 4 H₃BO₃\nBecause NaOH is a strong, completely dissociated base while orthoboric acid (H₃BO₃) is a very weak, largely undissociated acid, the concentration of OH⁻ ions exceeds that of H⁺ ions in solution, making the aqueous solution alkaline (pH ≈ 9.2).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4706,
    similarQuestion: {
      question: "In the borax bead test for analytical detection of transition metal cations, the characteristic colors of the beads obtained in an oxidizing flame are due to the formation of:",
      option_a: "Transition metal orthoborates",
      option_b: "Transition metal metaborates",
      option_c: "Sodium orthoborate",
      option_d: "Boron trioxide",
      correct_option: "B",
      explanation: "1. In the borax bead test, heating borax on a platinum wire loop causes it to swell and fuse into a glassy, transparent bead of sodium metaborate and boric anhydride:\nNa₂B₄O₇·10H₂O → 2 NaBO₂ + B₂O₃ + 10 H₂O\n2. When this hot bead is touched to a trace of a transition metal salt and heated in an oxidizing flame, the metal oxide reacts with B₂O₃ to form a characteristic colored metal metaborate:\nFor example: CoO + B₂O₃ → Co(BO₂)₂ [deep blue bead]\nNiO + B₂O₃ → Ni(BO₂)₂ [brown bead]\nCr₂O₃ + 3 B₂O₃ → 2 Cr(BO₂)₃ [green bead]\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4707,
    similarQuestion: {
      question: "Which of the following statements regarding orthoboric acid (H₃BO₃) is INCORRECT?",
      option_a: "It has a layered sheet structure held together by hydrogen bonds.",
      option_b: "It is a weak, monobasic Lewis acid that accepts OH⁻ from water rather than donating a proton.",
      option_c: "It acts as a typical Arrhenius tribasic acid by releasing three protons in aqueous solution.",
      option_d: "On strong heating, it completely dehydrates to yield boron trioxide (B₂O₃).",
      correct_option: "C",
      explanation: "1. Despite having three hydrogen atoms in its formula, orthoboric acid (H₃BO₃) is NOT a protonic tribasic acid. Instead, it is a weak monobasic Lewis acid of boron:\nB(OH)₃ + 2 H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺\nIt acts by accepting an OH⁻ ion from water, liberating a single hydronium ion. Thus, statement (C) is INCORRECT.\n2. In solid H₃BO₃, triangular planar BO₃ units are joined into infinite two-dimensional sheets by hydrogen bonds. (Statement A is correct)\n3. Heating H₃BO₃ above 370 K forms metaboric acid (HBO₂), which on red heat dehydrates to B₂O₃. (Statement D is correct)\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4708,
    similarQuestion: {
      question: "When diborane (B₂H₆) reacts with excess ammonia at low temperatures, it forms an addition compound B₂H₆·2NH₃. What is the ionic formulation of this diammoniate of diborane?",
      option_a: "[BH₂(NH₃)₂]⁺ [BH₄]⁻",
      option_b: "[BH₄]⁺ [BH₂(NH₃)₂]⁻",
      option_c: "[B(NH₃)₄]³⁺ [BH₄]₃⁻",
      option_d: "2 [BH₃·NH₃]",
      correct_option: "A",
      explanation: "1. When diborane undergoes unsymmetrical cleavage with ammonia at low temperatures, one boron atom coordinates with two NH₃ molecules to form a complex cation, while the remaining boron forms a tetrahydroborate anion:\nB₂H₆ + 2 NH₃ → [BH₂(NH₃)₂]⁺ [BH₄]⁻\n2. When this diammoniate is heated to higher temperatures (~200°C), it undergoes de-hydrogenation to yield borazine (inorganic benzene, B₃N₃H₆).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4709,
    similarQuestion: {
      question: "Which of the following statements regarding diborane (B₂H₆) is FALSE?",
      option_a: "It is an electron-deficient molecule containing two 3-center-2-electron (3c-2e) bridge bonds.",
      option_b: "It is a toxic, flammable gas that catches fire spontaneously in air, releasing high heat.",
      option_c: "It is completely inert and does not react with water.",
      option_d: "It readily hydrolyzes in water to yield orthoboric acid and hydrogen gas.",
      correct_option: "C",
      explanation: "1. Diborane contains four terminal 2-center-2-electron (2c-2e) B-H bonds and two bridging 3-center-2-electron (3c-2e) B-H-B banana bonds. (True)\n2. It burns spontaneously in air with an extremely high heat of combustion (-1976 kJ mol⁻¹). (True)\n3. Diborane is NOT inert to water; it hydrolyzes rapidly and completely to produce boric acid and hydrogen gas:\nB₂H₆(g) + 6 H₂O(l) → 2 H₃BO₃(aq) + 6 H₂(g)\nTherefore, statement (C) is FALSE.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4710,
    similarQuestion: {
      question: "Aluminium is an amphoteric metal. It dissolves to liberate hydrogen gas (H₂) upon reaction with which of the following reagents?\n(A) Dilute hydrochloric acid (HCl)\n(B) Aqueous sodium hydroxide (NaOH)\n(C) Concentrated nitric acid (HNO₃)",
      option_a: "A only",
      option_b: "B only",
      option_c: "A and B only",
      option_d: "A, B, and C",
      correct_option: "C",
      explanation: "1. Aluminium reacts with dilute non-oxidizing acids like HCl to evolve hydrogen gas:\n2 Al + 6 HCl → 2 AlCl₃ + 3 H₂↑\n2. Because aluminium is amphoteric, it also dissolves in strong aqueous alkalis like NaOH to evolve hydrogen gas:\n2 Al + 2 NaOH + 6 H₂O → 2 Na[Al(OH)₄] + 3 H₂↑\n3. Concentrated HNO₃ is a strong oxidizing agent that oxidizes aluminium to form a tough, non-porous surface film of Al₂O₃, making aluminium passive and inert to further attack.\nTherefore, aluminium evolves hydrogen gas with (A) and (B) only.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4711,
    similarQuestion: {
      question: "The elements of Group 14 (carbon family) exhibit common oxidation states of +4 and +2. Down the group from carbon to lead, the relative stability of the +2 oxidation state:",
      option_a: "Decreases due to electronegativity changes.",
      option_b: "Increases due to the inert pair effect.",
      option_c: "Remains constant throughout the group.",
      option_d: "Becomes zero for lead.",
      correct_option: "B",
      explanation: "For Group 14 elements (valence configuration ns² np²):\n1. The common oxidation states are +4 and +2.\n2. As atomic number increases down the group from C to Pb, the ns² electrons become increasingly reluctant to unpair and participate in covalent bonding due to poor shielding by intervening d and f electrons (inert pair effect).\n3. Consequently, the +4 oxidation state becomes less stable and more oxidizing, while the +2 state becomes increasingly stable.\n4. For lead (Pb), the +2 state is thermodynamically more stable than the +4 state (Pb⁴⁺ acts as a strong oxidizing agent).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4712,
    similarQuestion: {
      question: "Silicon dioxide (quartz, SiO₂) is chemically very inert under normal ambient conditions primarily because:",
      option_a: "It has an exceptionally high silicon-oxygen (Si-O) single bond enthalpy (~466 kJ mol⁻¹) in a rigid, three-dimensional network.",
      option_b: "Silicon is in the +2 oxidation state.",
      option_c: "It exists as discrete gaseous diatomic molecules.",
      option_d: "Silicon possesses no vacant d-orbitals.",
      correct_option: "A",
      explanation: "In silica (SiO₂):\n1. Each silicon atom is tetrahedrally bonded to four oxygen atoms, and each oxygen atom bridges two silicon atoms, forming an infinite, continuous 3D network solid.\n2. The Si-O single bond has a remarkably high bond enthalpy (approximately 466 kJ mol⁻¹), which requires immense energy to cleave.\n3. Therefore, quartz is chemically inert and does not react with halogens, hydrogen, or most acids under ordinary conditions.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4713,
    similarQuestion: {
      question: "Although silica (SiO₂) is resistant to attack by almost all common mineral acids, it readily dissolves in hydrofluoric acid (HF) due to the formation of:",
      option_a: "Hexafluorosilicic acid (H₂SiF₆)",
      option_b: "Silicon tetrachloride (SiCl₄)",
      option_c: "Silicic acid (H₄SiO₄)",
      option_d: "Silicon monoxide (SiO)",
      correct_option: "A",
      explanation: "Silica dissolves in hydrofluoric acid (HF) in a two-step process:\n1. First, gaseous silicon tetrafluoride is formed:\nSiO₂ + 4 HF → SiF₄ + 2 H₂O\n2. In the presence of excess hydrofluoric acid, SiF₄ coordinates with additional fluoride ions (acting as a Lewis acid) to form the soluble complex hexafluorosilicic acid:\nSiF₄ + 2 HF → H₂SiF₆\nThis reaction is the basis for the etching of glass.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4714,
    similarQuestion: {
      question: "In the industrial synthesis of linear silicone polymers from organochlorosilanes, which compound is added as a chain-terminating agent to control and limit the polymer chain length?",
      option_a: "Dimethyldichlorosilane, (CH₃)₂SiCl₂",
      option_b: "Trimethylchlorosilane, (CH₃)₃SiCl",
      option_c: "Methyltrichlorosilane, CH₃SiCl₃",
      option_d: "Silicon tetrachloride, SiCl₄",
      correct_option: "B",
      explanation: "1. Hydrolysis of (CH₃)₂SiCl₂ yields (CH₃)₂Si(OH)₂, which contains two reactive -OH groups and undergoes step-growth condensation to propagate long linear silicone chains.\n2. Hydrolysis of (CH₃)₃SiCl yields trimethylsilanol, (CH₃)₃SiOH, which has only one reactive -OH group.\n3. When (CH₃)₃SiOH condenses onto the terminal hydroxyl group of a growing silicone chain, it caps the chain end with three inert methyl groups, preventing further condensation.\nTherefore, (CH₃)₃SiCl is used as a chain-stopper to regulate average molecular weight.\nTherefore, Option (B) is the correct answer."
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
    console.log(`Test 104 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
