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
    id: 4219,
    similar: {
      question: "One mole of each of the following coordination compounds is treated with an excess of aqueous AgNO₃. Which complex produces the GREATEST mass of AgCl precipitate?",
      option_a: "[Cr(H₂O)₆]Cl₃",
      option_b: "[Cr(H₂O)₅Cl]Cl₂·H₂O",
      option_c: "[Cr(H₂O)₄Cl₂]Cl·2H₂O",
      option_d: "[Cr(H₂O)₃Cl₃]·3H₂O",
      correct_option: "A",
      explanation: "1. In coordination chemistry (Werner's theory), only chloride ions residing outside the coordination sphere ionize in water and precipitate with silver nitrate.\n2. Analyzing the ionizable chloride content per mole of complex:\n   - [Cr(H₂O)₆]Cl₃: Yields 3 moles of free Cl⁻ ions → 3 moles of AgCl precipitate.\n   - [Cr(H₂O)₅Cl]Cl₂·H₂O: Yields 2 moles of free Cl⁻ ions → 2 moles of AgCl precipitate.\n   - [Cr(H₂O)₄Cl₂]Cl·2H₂O: Yields 1 mole of free Cl⁻ ion → 1 mole of AgCl precipitate.\n   - [Cr(H₂O)₃Cl₃]·3H₂O: Yields 0 moles of free Cl⁻ ions → no precipitate.\n3. Therefore, [Cr(H₂O)₆]Cl₃ produces the greatest mass of AgCl precipitate.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4220,
    similar: {
      question: "In the solid state, octacarbonyldicobalt(0), [Co₂(CO)₈], possesses which of the following structural features?",
      option_a: "No Co–Co bond, eight terminal CO ligands",
      option_b: "One Co–Co single bond, six terminal CO ligands, and two bridging CO ligands",
      option_c: "Two Co=Co double bonds and four bridging CO ligands",
      option_d: "One Co–Co single bond and eight bridging CO ligands",
      correct_option: "B",
      explanation: "1. In the crystalline (solid) state, octacarbonyldicobalt(0), [Co₂(CO)₈], adopts a bridged structure with C₂ᵥ symmetry.\n2. Each cobalt atom has an oxidation state of zero and an electronic configuration of 3d⁷ 4s².\n3. To satisfy the 18-electron rule (EAN = 36), the two cobalt atoms form a direct Co–Co single bond.\n4. The molecule contains two bridging carbonyl ligands (μ-CO) and six terminal carbonyl ligands (three on each cobalt atom).\n5. Therefore, the formula can be represented as [(CO)₃Co(μ-CO)₂Co(CO)₃].\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4221,
    similar: {
      question: "When 100 mL of a 0.1 M solution of a chromium(III) chloride hydrate is treated with excess AgNO₃, exactly 0.01 mol of AgCl precipitate is formed. What is the structural formula of this hydrate isomer?",
      option_a: "[Cr(H₂O)₄Cl₂]Cl·2H₂O",
      option_b: "[Cr(H₂O)₆]Cl₃",
      option_c: "[Cr(H₂O)₅Cl]Cl₂·H₂O",
      option_d: "[Cr(H₂O)₃Cl₃]·3H₂O",
      correct_option: "A",
      explanation: "1. Calculate the moles of the chromium complex present:\n   Moles of complex = Molarity × Volume (L) = 0.1 M × 0.100 L = 0.010 mol\n2. Moles of AgCl precipitated = 0.010 mol.\n3. The ratio of ionizable Cl⁻ to complex is:\n   Moles of AgCl / Moles of complex = 0.010 / 0.010 = 1\n4. This means exactly 1 chloride ion is outside the coordination sphere as an ionizable counter-ion.\n5. The remaining 2 chloride ions and 4 water molecules are coordinated directly to the chromium ion: [Cr(H₂O)₄Cl₂]Cl·2H₂O.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4222,
    similar: {
      question: "What is the spin-only magnetic moment of the coordination compound mercury tetrathiocyanatocobaltate(II), Hg[Co(NCS)₄]?",
      option_a: "√3 BM (1.73 BM)",
      option_b: "√15 BM (3.87 BM)",
      option_c: "√24 BM (4.90 BM)",
      option_d: "√35 BM (5.92 BM)",
      correct_option: "B",
      explanation: "1. In the compound Hg[Co(NCS)₄], mercury exists as the diamagnetic cation Hg²⁺ ([Xe] 4f¹⁴ 5d¹⁰, n = 0).\n2. The complex anion is [Co(NCS)₄]²⁻, where cobalt has an oxidation state of +2 (3d⁷ configuration).\n3. Tetrahedral complexes with monodentate ligands are always high-spin because the tetrahedral crystal field splitting (Δₜ) is much smaller than the pairing energy (Δₜ ≈ 4/9 Δₒ < P).\n4. In tetrahedral crystal fields, the d-orbitals split into lower e and higher t₂ sets. The configuration of d⁷ is e⁴ t₂³.\n5. There are n = 3 unpaired electrons in the t₂ set.\n6. The spin-only magnetic moment is:\n   μ = √(n(n + 2)) = √(3(3 + 2)) = √15 ≈ 3.87 BM.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4224,
    similar: {
      question: "Which of the following coordination complexes is DIAMAGNETIC?",
      option_a: "[Fe(CN)₆]³⁻",
      option_b: "[Ni(H₂O)₆]²⁺",
      option_c: "[Co(NH₃)₆]³⁺",
      option_d: "[Cr(H₂O)₆]³⁺",
      correct_option: "C",
      explanation: "1. [Co(NH₃)₆]³⁺: Co³⁺ is a 3d⁶ ion. Ammonia is a strong-field ligand that causes large crystal field splitting (Δₒ > P). All 6 electrons pair up in the lower t₂g orbitals (t₂g⁶ eg⁰), leaving n = 0 unpaired electrons (diamagnetic).\n2. [Fe(CN)₆]³⁻: Fe³⁺ is 3d⁵ (t₂g⁵ eg⁰), which has n = 1 unpaired electron (paramagnetic).\n3. [Ni(H₂O)₆]²⁺: Ni²⁺ is 3d⁸ (t₂g⁶ eg²), which has n = 2 unpaired electrons (paramagnetic).\n4. [Cr(H₂O)₆]³⁺: Cr³⁺ is 3d³ (t₂g³ eg⁰), which has n = 3 unpaired electrons (paramagnetic).\n5. Therefore, [Co(NH₃)₆]³⁺ is diamagnetic.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4229,
    similar: {
      question: "The complex NiCl₂[P(C₂H₅)₂(C₆H₅)]₂ exhibits temperature-dependent magnetic behavior, existing as a paramagnetic species at higher temperatures and a diamagnetic species at lower temperatures. What are the coordination geometries of Ni²⁺ in the paramagnetic and diamagnetic states, respectively?",
      option_a: "Square planar and square planar",
      option_b: "Tetrahedral and tetrahedral",
      option_c: "Tetrahedral and square planar",
      option_d: "Square planar and tetrahedral",
      correct_option: "C",
      explanation: "1. The central nickel ion is Ni²⁺ with a 3d⁸ electronic configuration.\n2. In a tetrahedral geometry (sp³ hybridization), the 3d⁸ electrons occupy orbitals as e⁴ t₂⁴, leaving n = 2 unpaired electrons; hence, the tetrahedral form is paramagnetic.\n3. In a square planar geometry (dsp² hybridization), strong in-plane ligand field forces all eight 3d electrons to pair up in the four lower d-orbitals (dxy, dyz, dxz, dz²), leaving the dx²-y² orbital vacant; hence, the square planar form is diamagnetic (n = 0).\n4. Because the energy difference between the square planar and tetrahedral arrangements is small, a thermal equilibrium exists. At low temperature, the more compact square planar form dominates, while at higher temperatures thermal entropy favors the tetrahedral geometry.\n5. Thus, the geometries are tetrahedral (paramagnetic) and square planar (diamagnetic).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4232,
    similar: {
      question: "The coordination complex [Cr(NH₃)₄Cl₂]⁺ is classified as:",
      option_a: "Paramagnetic with 3 unpaired electrons, exhibiting cis-trans geometrical isomerism",
      option_b: "Diamagnetic, exhibiting optical isomerism",
      option_c: "Paramagnetic with 1 unpaired electron, exhibiting linkage isomerism",
      option_d: "Diamagnetic, exhibiting no geometrical isomerism",
      correct_option: "A",
      explanation: "1. In [Cr(NH₃)₄Cl₂]⁺, the central chromium ion is Cr³⁺ with a 3d³ electronic configuration.\n2. In an octahedral field, the three 3d electrons singly occupy the three degenerate t₂g orbitals (t₂g³ eg⁰), giving n = 3 unpaired electrons and paramagnetism (μ = √15 ≈ 3.87 BM).\n3. The complex is of the general type [Ma₄b₂], which forms two geometrical isomers:\n   - cis-isomer (the two chloride ligands are at 90° to each other, violet)\n   - trans-isomer (the two chloride ligands are at 180° to each other, green).\n4. Therefore, it is paramagnetic and exhibits cis-trans geometrical isomerism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4233,
    similar: {
      question: "Which of the following chemical reagents can be used to distinguish between aqueous solutions of iron(II) (Fe²⁺) and iron(III) (Fe³⁺) ions?",
      option_a: "Potassium hexacyanoferrate(II), K₄[Fe(CN)₆]",
      option_b: "Potassium thiocyanate, KSCN",
      option_c: "Potassium hexacyanoferrate(III), K₃[Fe(CN)₆]",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "1. K₄[Fe(CN)₆]: Gives a dark Prussian blue precipitate with Fe³⁺ (Fe₄[Fe(CN)₆]₃), but gives a white precipitate (turning light blue in air) with Fe²⁺.\n2. KSCN: Forms a deep blood-red complex [Fe(SCN)(H₂O)₅]²⁺ with Fe³⁺, whereas pure Fe²⁺ produces no red color.\n3. K₃[Fe(CN)₆]: Gives a deep Turnbull's blue precipitate with Fe²⁺, but produces a brown/green solution with Fe³⁺.\n4. Because all three reagents yield distinct color changes, all of them can distinguish Fe²⁺ from Fe³⁺.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4236,
    similar: {
      question: "Which of the following is an unsymmetrical bidentate chelating ligand that contains an inherently chiral carbon center?",
      option_a: "Propylenediamine / 1,2-diaminopropane (pn)",
      option_b: "Glycinate ion (gly⁻)",
      option_c: "Ethylenediamine (en)",
      option_d: "Oxalate ion (ox²⁻)",
      correct_option: "A",
      explanation: "1. An unsymmetrical bidentate ligand has two non-equivalent donor groups or an unsymmetrical backbone.\n2. Propylenediamine (1,2-diaminopropane, pn) has the structure CH₃–*CH(NH₂)–CH₂–NH₂.\n3. The C-2 carbon is bonded to four different groups: –H, –CH₃, –NH₂, and –CH₂NH₂.\n4. Thus, it contains an asymmetric (chiral) carbon atom, making the ligand itself intrinsically chiral as well as unsymmetrical.\n5. Glycinate is unsymmetrical but achiral; ethylenediamine and oxalate are both symmetrical and achiral.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4238,
    similar: {
      question: "Which of the following anions acts as an ambidentate ligand capable of coordinating to a central metal ion through two different donor atoms?",
      option_a: "Carbonate ion (CO₃²⁻)",
      option_b: "Sulphate ion (SO₄²⁻)",
      option_c: "Thiocyanate ion (SCN⁻)",
      option_d: "Oxalate ion (C₂O₄²⁻)",
      correct_option: "C",
      explanation: "1. An ambidentate ligand is a monodentate ligand that possesses two different donor atoms through which it can coordinate to a metal center.\n2. The thiocyanate ion, [S–C≡N]⁻, has two nucleophilic donor sites:\n   - Coordination through sulfur yields thiocyanato complexes (M–SCN).\n   - Coordination through nitrogen yields isothiocyanato complexes (M–NCS).\n3. This dual coordinating ability gives rise to linkage isomerism.\n4. In contrast, carbonate, sulphate, and oxalate coordinate through oxygen atoms only.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4240,
    similar: {
      question: "In Zeise's salt, K[PtCl₃(C₂H₄)], how does the Carbon–Carbon (C–C) bond length of the coordinated ethene ligand compare with that of free ethene gas?",
      option_a: "The C–C bond length is longer in Zeise's salt than in free ethene due to dπ → π* back-bonding from platinum.",
      option_b: "The C–C bond length is shorter in Zeise's salt due to increased s-character.",
      option_c: "The C–C bond lengths in both species are exactly identical.",
      option_d: "The C–C bond is completely cleaved upon coordination.",
      correct_option: "A",
      explanation: "1. In Zeise's salt, bonding between the platinum(II) ion and the ethene molecule follows the Dewar-Chatt-Duncanson model:\n   - σ-component: The filled π-electron cloud of ethene donates electron density into a vacant 5d/6s/6p hybrid orbital of Pt²⁺.\n   - π-back bonding: Filled d-orbitals of Pt²⁺ donate electron density back into the empty π* antibonding molecular orbital of ethene.\n2. Populating the π* antibonding orbital reduces the C–C bond order (from 2.0 towards ~1.5) and lengthens the C–C bond from 134 pm in free ethene to 137 pm in the complex.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4241,
    similar: {
      question: "What is the total number of coordination isomers possible for the compound [Co(en)₃][Cr(C₂O₄)₃]?",
      option_a: "2",
      option_b: "3",
      option_c: "4",
      option_d: "6",
      correct_option: "C",
      explanation: "1. Coordination isomerism occurs when both the cation and the anion are complex ions, allowing interchange of ligands between the two metal centers.\n2. The possible distributions of bidentate ligands (en and ox) maintaining charge neutrality (+3 and -3) are:\n   (i) [Co(en)₃][Cr(ox)₃]\n   (ii) [Co(en)₂(ox)]⁺ [Cr(en)(ox)₂]⁻\n   (iii) [Cr(en)₂(ox)]⁺ [Co(en)(ox)₂]⁻\n   (iv) [Cr(en)₃][Co(ox)₃]\n3. Thus, there are exactly 4 coordination isomers.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4243,
    similar: {
      question: "The octahedral complex anion [Cr(NH₃)₂Cl₂Br₂]⁻ can exhibit which of the following types of isomerisms?",
      option_a: "Geometrical and optical isomerism",
      option_b: "Ionization isomerism only",
      option_c: "Coordination isomerism only",
      option_d: "Linkage isomerism only",
      correct_option: "A",
      explanation: "1. The complex [Cr(NH₃)₂Cl₂Br₂]⁻ is an octahedral complex of the general formula [Ma₂b₂c₂].\n2. Complexes of the type [Ma₂b₂c₂] exhibit geometrical isomerism, having 5 distinct geometrical diastereomers:\n   (i) trans-a, trans-b, trans-c\n   (ii) trans-a, cis-b, cis-c\n   (iii) cis-a, trans-b, cis-c\n   (iv) cis-a, cis-b, trans-c\n   (v) cis-a, cis-b, cis-c (all-cis).\n3. The all-cis isomer possesses no plane or center of inversion; it is chiral and exhibits optical isomerism (existing as a pair of non-superimposable enantiomers).\n4. Therefore, it exhibits both geometrical and optical isomerism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4246,
    similar: {
      question: "Why does a square planar complex of the type [Pt(NH₃)(py)(Cl)(Br)] exhibit geometrical isomerism but NO optical isomerism?",
      option_a: "The molecular plane containing the platinum atom and all four donor atoms serves as an internal plane of symmetry (σ_h), rendering the molecule achiral.",
      option_b: "Platinum complexes cannot coordinate to four different ligands.",
      option_c: "Square planar complexes have no geometrical isomers.",
      option_d: "The bond angles are all exactly 109.5°.",
      correct_option: "A",
      explanation: "1. In square planar geometry, all four coordinating ligand donor atoms and the central metal atom lie in the exact same geometric plane.\n2. This plane of the molecule forms an internal plane of symmetry (horizontal mirror plane, σ_h) that bisects all atoms into two identical halves.\n3. Because any molecule containing an improper axis of rotation (such as a plane of symmetry) is superimposable on its mirror image, square planar complexes are achiral and cannot show optical activity.\n4. However, arranging four different ligands in the plane yields 3 geometrical diastereomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4247,
    similar: {
      question: "For which of the following octahedral complexes is the statement 'Δₒ > P (low-spin state)' INCORRECT?",
      option_a: "[Co(H₂O)₆]³⁺",
      option_b: "[Fe(CN)₆]⁴⁻",
      option_c: "[CoF₆]³⁻",
      option_d: "[PtCl₆]²⁻",
      correct_option: "C",
      explanation: "1. In [CoF₆]³⁻, fluoride (F⁻) is a weak-field ligand located near the bottom of the spectrochemical series.\n2. The crystal field splitting energy (Δₒ) produced by fluoride is smaller than the electron pairing energy: Δₒ < P.\n3. Consequently, [CoF₆]³⁻ is a high-spin complex with an electronic configuration of t₂g⁴ eg², featuring 4 unpaired electrons.\n4. Stating that Δₒ > P for [CoF₆]³⁻ is incorrect.\n5. (In contrast, [Co(H₂O)₆]³⁺, [Fe(CN)₆]⁴⁻, and [PtCl₆]²⁻ all have Δₒ > P and are low-spin complexes).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4248,
    similar: {
      question: "An octahedral coordination entity of the type [Ma₂b₂c₂] (where a, b, and c are monodentate ligands) has how many geometrical isomers and how many total stereoisomers, respectively?",
      option_a: "5 geometrical isomers and 6 total stereoisomers",
      option_b: "3 geometrical isomers and 4 total stereoisomers",
      option_c: "4 geometrical isomers and 4 total stereoisomers",
      option_d: "6 geometrical isomers and 8 total stereoisomers",
      correct_option: "A",
      explanation: "1. For an octahedral complex of type [Ma₂b₂c₂]:\n   - Five geometrical isomers are possible:\n     (1) trans-a, trans-b, trans-c\n     (2) trans-a, cis-b, cis-c\n     (3) cis-a, trans-b, cis-c\n     (4) cis-a, cis-b, trans-c\n     (5) cis-a, cis-b, cis-c (all-cis).\n2. Among these five geometrical forms, the first four possess planes of symmetry and are achiral.\n3. The fifth isomer (all-cis) lacks any plane or center of inversion; it is chiral and exists as a pair of non-superimposable optical enantiomers (d- and l-forms).\n4. Therefore, there are 5 geometrical isomers and a total of 4 + 2 = 6 stereoisomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4249,
    similar: {
      question: "Calculate the Effective Atomic Number (EAN) of iron in potassium ferrocyanide, K₄[Fe(CN)₆], and determine whether it obeys the Sidgwick EAN rule (atomic number of Fe = 26).",
      option_a: "36, and it obeys the EAN rule by achieving the electronic configuration of krypton (Kr).",
      option_b: "35, and it does not obey the EAN rule.",
      option_c: "38, and it exceeds the noble gas configuration.",
      option_d: "34, and it is two electrons short of krypton.",
      correct_option: "A",
      explanation: "1. The Effective Atomic Number (EAN) formula is:\n   EAN = Z - Oxidation State + 2 × (Coordination Number)\n2. For [Fe(CN)₆]⁴⁻:\n   - Atomic number of Fe (Z) = 26\n   - Oxidation state of Fe = +2 (Fe²⁺ has 26 - 2 = 24 electrons)\n   - Each of the 6 cyanide ligands donates a pair of electrons: 2 × 6 = 12 electrons\n3. Calculating EAN:\n   EAN = 26 - 2 + 12 = 36\n4. Since 36 is the atomic number of the noble gas krypton (Kr), the complex obeys Sidgwick's EAN rule, explaining its high thermodynamic stability.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful! Updating Test 106 Part 3 (17 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 106 Part 3 update complete!");
}

run().catch(console.error);
