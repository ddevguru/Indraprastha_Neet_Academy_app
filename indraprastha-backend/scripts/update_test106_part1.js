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
    id: 4099,
    similar: {
      question: "When an aqueous solution of copper(II) sulphate (CuSO₄) reacts with potassium iodide (KI), what are the principal products formed?",
      option_a: "White precipitate of cuprous iodide (Cu₂I₂) and liberated iodine (I₂)",
      option_b: "Stable black solution of cupric iodide (CuI₂)",
      option_c: "Potassium sulphate and metallic copper only",
      option_d: "Copper hydride and potassium iodate",
      correct_option: "A",
      explanation: "1. When copper(II) sulphate reacts with potassium iodide in aqueous solution, Cu²⁺ initially reacts with I⁻ to form cupric iodide (CuI₂).\n2. However, CuI₂ is thermodynamically unstable because I⁻ is a strong reducing agent and Cu²⁺ oxidizes iodide ions:\n   2Cu²⁺ + 4I⁻ → 2CuI(s) + I₂\n   (or written as Cu₂I₂ + I₂)\n3. The Cu⁺ precipitates as off-white / buff cuprous iodide (CuI / Cu₂I₂), while iodine (I₂) is liberated as a brown solution / violet vapours.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4104,
    similar: {
      question: "An aqueous solution of copper chromate (CuCrO₄) appears distinctly green in color. What is the fundamental reason for this color?",
      option_a: "It dissociates into blue hydrated Cu²⁺ ions and yellow CrO₄²⁻ ions, which blend optically to produce a green color.",
      option_b: "The Cu²⁺ ion itself turns intrinsically green in the presence of chromate.",
      option_c: "Chromate ion (CrO₄²⁻) is intrinsically bright green in water.",
      option_d: "It forms a colloidal suspension of green chromium(III) oxide (Cr₂O₃).",
      correct_option: "A",
      explanation: "1. Copper(II) chromate (CuCrO₄) is a soluble salt that completely dissociates in water into Cu²⁺(aq) and CrO₄²⁻(aq) ions.\n2. The hydrated copper(II) ion, [Cu(H₂O)₆]²⁺, absorbs red-orange light and transmits blue light.\n3. The chromate oxoanion, CrO₄²⁻, absorbs violet-blue light via charge transfer and transmits yellow light.\n4. Subtractive color mixing of the transmitted blue and yellow wavelengths produces an overall green appearance to the human eye.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4107,
    similar: {
      question: "In sodium nitroprusside, Na₂[Fe(CN)₅(NO)], the oxidation state of iron is +2 and NO exists as the nitrosonium cation (NO⁺). This formulation is confirmed experimentally because the complex is:",
      option_a: "Diamagnetic with zero magnetic moment (μ = 0 BM) in the solid state.",
      option_b: "Paramagnetic with 5 unpaired electrons (μ = 5.92 BM).",
      option_c: "Ferromagnetic at room temperature.",
      option_d: "Optically active and rotates plane-polarized light.",
      correct_option: "A",
      explanation: "1. In sodium nitroprusside, Na₂[Fe(CN)₅(NO)], the coordination entity is [Fe(CN)₅(NO)]²⁻.\n2. If iron were Fe³⁺ (3d⁵) with neutral NO, the complex would possess unpaired electrons and show paramagnetism.\n3. Magnetic susceptibility measurements demonstrate that the complex is completely diamagnetic with a spin-only magnetic moment of μ = 0 BM.\n4. This confirms that iron exists as low-spin Fe²⁺ (3d⁶, t₂g⁶ eg⁰) and the nitrosyl ligand exists as NO⁺ (isoelectronic with CO, with a formal charge of +1).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4110,
    similar: {
      question: "In the iodometric estimation of copper, CuSO₄ is reacted with excess KI to liberate I₂, which is subsequently titrated against standard sodium thiosulphate (Na₂S₂O₃). In the second step, the change in oxidation state of iodine is:",
      option_a: "From 0 in I₂ to -1 in I⁻ (iodine is reduced)",
      option_b: "From -1 in I⁻ to 0 in I₂ (iodine is oxidised)",
      option_c: "From +5 in IO₃⁻ to 0 in I₂",
      option_d: "Iodine does not undergo any change in oxidation state",
      correct_option: "A",
      explanation: "1. In the first step:\n   2Cu²⁺ + 4I⁻ → Cu₂I₂(s) + I₂\n   Cu²⁺ (+2) is reduced to Cu⁺ (+1), while iodide (-1) is oxidized to elemental iodine, I₂ (oxidation state 0).\n2. In the second step (titration with thiosulphate):\n   I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻\n   The oxidation state of iodine decreases from 0 in I₂ to -1 in I⁻, meaning iodine acts as an oxidizing agent and is itself reduced.\n3. Concurrently, thiosulphate (average sulfur oxidation state +2) is oxidized to tetrathionate (+2.5).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4111,
    similar: {
      question: "When potassium ferrocyanide, K₄[Fe(CN)₆], is heated with concentrated H₂SO₄, carbon monoxide (CO) gas is evolved. However, when it is treated with dilute H₂SO₄, which toxic gas is liberated instead?",
      option_a: "Hydrogen cyanide (HCN)",
      option_b: "Carbon dioxide (CO₂)",
      option_c: "Nitrogen dioxide (NO₂)",
      option_d: "Sulphur dioxide (SO₂)",
      correct_option: "A",
      explanation: "1. With concentrated H₂SO₄, the acid acts as a powerful dehydrating agent and hydrolyses the cyanide groups to ammonium ions while liberating carbon monoxide:\n   K₄[Fe(CN)₆] + 6H₂SO₄(conc.) + 6H₂O → 2K₂SO₄ + FeSO₄ + 3(NH₄)₂SO₄ + 6CO↑\n2. With dilute H₂SO₄, no dehydration occurs; the dilute mineral acid simply displaces the weaker volatile acid from its complex salt:\n   2K₄[Fe(CN)₆] + 6H₂SO₄(dil.) → 4K₂SO₄ + 2FeSO₄ + 12HCN↑\n3. Thus, extremely poisonous hydrogen cyanide (HCN) gas is evolved.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4153,
    similar: {
      question: "An aqueous solution of ferrous sulphate (FeSO₄) produces a green precipitate with NaOH. However, after the addition of excess potassium cyanide (KCN), the solution no longer forms a precipitate with NaOH. This is because:",
      option_a: "Fe²⁺ is incorporated into the extremely stable complex anion [Fe(CN)₆]⁴⁻, reducing the free Fe²⁺ concentration below the solubility product of Fe(OH)₂.",
      option_b: "Fe²⁺ is reduced to metallic iron precipitate.",
      option_c: "Potassium cyanide destroys the sodium hydroxide.",
      option_d: "Sulphate ions decompose into SO₂ gas.",
      correct_option: "A",
      explanation: "1. In pure FeSO₄ solution, iron exists as hexaaqua iron(II) ions, [Fe(H₂O)₆]²⁺, which readily react with OH⁻ ions to precipitate dirty-green Fe(OH)₂.\n2. Cyanide (CN⁻) is a strong field ligand with an extremely high formation constant (stability constant) for hexacyanoferrate(II):\n   Fe²⁺ + 6CN⁻ ⇌ [Fe(CN)₆]⁴⁻; log β₆ ≈ 35\n3. Because [Fe(CN)₆]⁴⁻ is extremely stable and barely dissociates, the concentration of free Fe²⁺(aq) in solution is drastically reduced.\n4. The ionic product [Fe²⁺][OH⁻]² cannot exceed the solubility product (K_sp) of Fe(OH)₂, so no precipitate forms.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4154,
    similar: {
      question: "According to Werner's coordination theory, which of the following cobalt(III) ammine complexes will exhibit the LEAST electrical conductivity in 0.01 M aqueous solution?",
      option_a: "[Co(NH₃)₆]Cl₃",
      option_b: "[Co(NH₃)₅Cl]Cl₂",
      option_c: "[Co(NH₃)₄Cl₂]Cl",
      option_d: "[Co(NH₃)₃Cl₃]",
      correct_option: "D",
      explanation: "1. The electrical conductivity of a coordination compound in aqueous solution is directly proportional to the total number of ions produced per formula unit upon dissolution.\n2. Analyzing the ionization behavior:\n   - [Co(NH₃)₆]Cl₃ → [Co(NH₃)₆]³⁺ + 3Cl⁻ (4 ions)\n   - [Co(NH₃)₅Cl]Cl₂ → [Co(NH₃)₅Cl]²⁺ + 2Cl⁻ (3 ions)\n   - [Co(NH₃)₄Cl₂]Cl → [Co(NH₃)₄Cl₂]⁺ + Cl⁻ (2 ions)\n   - [Co(NH₃)₃Cl₃] → does not ionize (neutral molecule, 0 ions)\n3. Since [Co(NH₃)₃Cl₃] is a non-electrolyte and yields no free ions in solution, it exhibits the least (virtually zero) electrical conductivity.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4156,
    similar: {
      question: "What is the correct order of infrared (IR) stretching frequency for the C–O bond (ν_CO) in the isoelectronic tetrahedral carbonyl complexes: [Fe(CO)₄]²⁻, [Co(CO)₄]⁻, and [Ni(CO)₄]?",
      option_a: "[Fe(CO)₄]²⁻ < [Co(CO)₄]⁻ < [Ni(CO)₄]",
      option_b: "[Ni(CO)₄] < [Co(CO)₄]⁻ < [Fe(CO)₄]²⁻",
      option_c: "[Co(CO)₄]⁻ < [Fe(CO)₄]²⁻ < [Ni(CO)₄]",
      option_d: "[Fe(CO)₄]²⁻ = [Co(CO)₄]⁻ = [Ni(CO)₄]",
      correct_option: "A",
      explanation: "1. In metal carbonyls, synergic bonding consists of σ-donation from the carbon lone pair to the metal vacant orbital and π-back bonding from filled metal d-orbitals into empty π* antibonding orbitals of CO.\n2. Greater electron density on the metal increases back-donation into the π* orbitals of CO, which lowers the C–O bond order and decreases the C–O stretching frequency (ν_CO).\n3. The electron density on the metal follows the order of negative charge: Fe²⁻ > Co⁻ > Ni⁰.\n4. Therefore, π-back donation is maximum in [Fe(CO)₄]²⁻ (weakest C–O bond) and minimum in [Ni(CO)₄] (strongest C–O bond).\n5. Hence, the C–O stretching frequency increases in the order: [Fe(CO)₄]²⁻ < [Co(CO)₄]⁻ < [Ni(CO)₄].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4159,
    similar: {
      question: "Between [Ni(CO)₄] and [Ni(CO)₃(PMe₃)], which complex exhibits a higher C–O infrared stretching frequency (ν_CO), and why?",
      option_a: "[Ni(CO)₄], because PMe₃ is a stronger σ-donor that increases electron density on Ni, enhancing back-bonding to remaining CO ligands in [Ni(CO)₃(PMe₃)].",
      option_b: "[Ni(CO)₃(PMe₃)], because PMe₃ withdraws electrons from Ni.",
      option_c: "Both have identical C–O stretching frequencies.",
      option_d: "[Ni(CO)₃(PMe₃)], because it has fewer CO ligands.",
      correct_option: "A",
      explanation: "1. Trimethylphosphine (PMe₃) is a much stronger σ-donor ligand and a poorer π-acceptor than carbon monoxide (CO).\n2. Replacing one CO ligand in [Ni(CO)₄] with PMe₃ significantly increases the electron density on the central nickel atom.\n3. The nickel atom relieves this excess charge by increasing π-back donation into the π* antibonding orbitals of the remaining three CO ligands.\n4. This increased population of π* orbitals weakens the C–O bonds and lowers their force constant and stretching frequency (ν_CO).\n5. Therefore, [Ni(CO)₄] has less back-bonding per CO ligand and exhibits a higher C–O stretching frequency than [Ni(CO)₃(PMe₃)].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4162,
    similar: {
      question: "Among the isoelectronic series [Ni(CO)₄], [Co(CO)₄]⁻, and [Fe(CO)₄]²⁻, which complex possesses the highest multiple-bond (double-bond) character in the Metal–Carbon (M–C) bond?",
      option_a: "[Ni(CO)₄]",
      option_b: "[Co(CO)₄]⁻",
      option_c: "[Fe(CO)₄]²⁻",
      option_d: "All three have identical M–C bond order",
      correct_option: "C",
      explanation: "1. In metal carbonyls, the Metal–Carbon bond consists of a σ-component (M ← C) and a π-component (M → C) via back-donation from metal d-orbitals to the π* orbitals of CO.\n2. Stronger π-back donation increases the M–C bond order, giving it significant double-bond character.\n3. The negative charge on the central metal increases from Ni (0) to Co (-1) to Fe (-2).\n4. Iron in [Fe(CO)₄]²⁻ bears the highest formal negative charge density, resulting in the most extensive dπ → π* back-donation.\n5. Consequently, the M–C bond has the highest multiple-bond character and the shortest M–C bond length in [Fe(CO)₄]²⁻.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4163,
    similar: {
      question: "In nonacarbonyldiiron(0), [Fe₂(CO)₉], which features three bridging CO ligands and six terminal CO ligands, how does the C–O bond length of bridging CO compare with terminal CO?",
      option_a: "The bridging C–O bond length is longer than the terminal C–O bond length.",
      option_b: "The bridging C–O bond length is shorter than the terminal C–O bond length.",
      option_c: "Both bridging and terminal C–O bonds have identical lengths.",
      option_d: "Bridging carbonyls possess a higher C–O bond order than terminal carbonyls.",
      correct_option: "A",
      explanation: "1. In [Fe₂(CO)₉], each bridging carbonyl (μ-CO) coordinates simultaneously to two iron atoms.\n2. Because two metal centers donate electron density into the π* antibonding molecular orbitals of the bridging CO group, the C–O bond order of the bridging ligand is significantly reduced (approaching a ketone-like C=O double bond, ~1.8).\n3. Terminal CO ligands receive back-donation from only one iron atom and maintain a higher bond order (~2.6).\n4. Since bond length is inversely proportional to bond order, the bridging C–O bond distance is longer than that of the terminal C–O bond.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4164,
    similar: {
      question: "Which of the following statements regarding Magnus' green salt, [Pt(NH₃)₄][PtCl₄], is INCORRECT?",
      option_a: "It is a polymerisation isomer of [Pt(NH₃)₂Cl₂].",
      option_b: "It is a coordination isomer of [Pt(NH₃)₃Cl][Pt(NH₃)Cl₃].",
      option_c: "The oxidation state of platinum is +2 in both the cationic and anionic coordination spheres.",
      option_d: "It exhibits optical isomerism and exists as a pair of non-superimposable enantiomers.",
      correct_option: "D",
      explanation: "1. In [Pt(NH₃)₄][PtCl₄], the cation [Pt(NH₃)₄]²⁺ and anion [PtCl₄]²⁻ are both square planar complexes of Pt(II).\n2. Square planar complexes with monodentate ligands possess multiple planes of symmetry and are achiral; hence they cannot exhibit optical isomerism.\n3. Its empirical formula is Pt(NH₃)₂Cl₂, making it a polymerisation isomer (dimer) of neutral [Pt(NH₃)₂Cl₂].\n4. Exchanging ligands between the coordination spheres yields the coordination isomer [Pt(NH₃)₃Cl][Pt(NH₃)Cl₃].\n5. Therefore, claiming that it exhibits optical isomerism is incorrect.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4165,
    similar: {
      question: "What type of isomerism is demonstrated by the dinuclear bridged complexes [(PEt₃)₂Pt(μ-Cl)₂PtCl₂] and [Cl(PEt₃)Pt(μ-Cl)₂PtCl(PEt₃)]?",
      option_a: "Coordination position isomerism",
      option_b: "Ionization isomerism",
      option_c: "Linkage isomerism",
      option_d: "Optical isomerism",
      correct_option: "A",
      explanation: "1. Both complexes are binuclear coordination compounds containing two platinum atoms bridged by two chloride ligands, (μ-Cl)₂.\n2. In the first complex, the terminal non-bridging ligands are distributed unsymmetrically: two PEt₃ ligands on one Pt, and two Cl ligands on the other Pt.\n3. In the second complex, the non-bridging ligands are distributed symmetrically: one PEt₃ and one Cl on each Pt atom.\n4. This difference in the distribution of ligands among the different metal centers in a polynuclear complex is called coordination position isomerism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4166,
    similar: {
      question: "For the coordination compound [Pt(NH₃)₄][PtCl₄], none of its coordination isomers exhibit geometrical isomerism because:",
      option_a: "The complex ions involved have the general formulas [PtA₄], [PtB₄], or [PtA₃B], none of which can form cis/trans isomers in square planar geometry.",
      option_b: "Platinum(II) complexes only adopt tetrahedral geometry.",
      option_c: "Chloride and ammonia cannot bind to platinum simultaneously.",
      option_d: "The coordination number of platinum in this complex is six.",
      correct_option: "A",
      explanation: "1. Coordination isomers of [Pt(NH₃)₄][PtCl₄] are formed by exchanging ligands between the two square planar coordination entities:\n   - [Pt(NH₃)₄][PtCl₄]: Contains [Pt(NH₃)₄]²⁺ (type [Ma₄]) and [PtCl₄]²⁻ (type [Mb₄]).\n   - [Pt(NH₃)₃Cl][Pt(NH₃)Cl₃]: Contains [Pt(NH₃)₃Cl]⁺ (type [Ma₃b]) and [Pt(NH₃)Cl₃]⁻ (type [Mab₃]).\n2. Square planar complexes of the types [Ma₄], [Mb₄], [Ma₃b], and [Mab₃] have only one possible spatial arrangement; all coordination positions are chemically equivalent.\n3. Therefore, none of these complex ions can exhibit geometrical (cis/trans) isomerism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4170,
    similar: {
      question: "Which of the following pairs of coordination entities represents a pair of linkage isomers?",
      option_a: "[Co(NH₃)₅(NO₂)]Cl₂ and [Co(NH₃)₅(ONO)]Cl₂",
      option_b: "[Co(NH₃)₅SO₄]Br and [Co(NH₃)₅Br]SO₄",
      option_c: "[Cr(H₂O)₆]Cl₃ and [Cr(H₂O)₅Cl]Cl₂·H₂O",
      option_d: "[Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]",
      correct_option: "A",
      explanation: "1. Linkage isomerism arises when a coordination entity contains an ambidentate ligand that can bind to the central metal atom through two different donor atoms.\n2. The nitrite ion (NO₂⁻) is ambidentate:\n   - It can coordinate through nitrogen: –NO₂ (nitro isomer, usually yellow-brown).\n   - It can coordinate through oxygen: –ONO (nitrito isomer, usually red).\n3. Therefore, [Co(NH₃)₅(NO₂)]Cl₂ and [Co(NH₃)₅(ONO)]Cl₂ are linkage isomers.\n4. (Option B is ionization isomerism, Option C is hydrate/solvate isomerism, and Option D is coordination isomerism).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4174,
    similar: {
      question: "Among the following octahedral coordination entities (where a, b, and c are monodentate ligands), which type exhibits the MAXIMUM total number of stereoisomers (including geometrical and optical isomers)?",
      option_a: "[Ma₃b₃]",
      option_b: "[Ma₃b₂c]",
      option_c: "[Ma₂b₂c₂]",
      option_d: "[Ma₄b₂]",
      correct_option: "C",
      explanation: "1. Evaluating total stereoisomers for each complex:\n   - [Ma₄b₂]: 2 geometrical isomers (cis and trans), both achiral → 2 stereoisomers.\n   - [Ma₃b₃]: 2 geometrical isomers (facial and meridional), both achiral → 2 stereoisomers.\n   - [Ma₃b₂c]: 3 geometrical isomers, all achiral → 3 stereoisomers.\n   - [Ma₂b₂c₂]: Has 5 geometrical isomers:\n     (i) trans-a, trans-b, trans-c (achiral)\n     (ii) trans-a, cis-b, cis-c (achiral)\n     (iii) cis-a, trans-b, cis-c (achiral)\n     (iv) cis-a, cis-b, trans-c (achiral)\n     (v) cis-a, cis-b, cis-c (chiral, lacks plane of symmetry and exists as a pair of d- and l-enantiomers).\n     Total stereoisomers = 4 achiral + 2 enantiomers = 6 stereoisomers.\n2. Therefore, [Ma₂b₂c₂] exhibits the maximum number of stereoisomers (6).\nTherefore, Option (C) is the correct answer."
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
  console.log("Login successful! Updating Test 106 Part 1 (16 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 106 Part 1 update complete!");
}

run().catch(console.error);
