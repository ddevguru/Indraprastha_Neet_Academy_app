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
    id: 4176,
    similar: {
      question: "The octahedral complex ion [Co(en)Cl₂Br₂]⁻ exists as both geometrical and optical isomers. Which of its geometrical isomers is optically active and exists as a pair of non-superimposable enantiomers?",
      option_a: "The trans-dichloro, trans-dibromo isomer",
      option_b: "The all-cis isomer (cis-dichloro, cis-dibromo)",
      option_c: "The trans-dichloro, cis-dibromo isomer",
      option_d: "The cis-dichloro, trans-dibromo isomer",
      correct_option: "B",
      explanation: "1. In an octahedral complex of the type [M(AA)a₂b₂] (where AA is a symmetrical bidentate chelating ligand like ethylenediamine):\n   - Any isomer possessing a trans arrangement of identical ligands (such as trans-dichloro or trans-dibromo) has an internal plane of symmetry (σ) or an inversion center (i).\n   - Such trans isomers are achiral and optically inactive.\n2. The all-cis isomer, in which the bidentate ring and both pairs of monodentate ligands occupy mutually adjacent (cis) positions, possesses no plane or center of symmetry (C₁ point group).\n3. Because it is strictly asymmetric (chiral), it exists as a pair of non-superimposable mirror-image enantiomers (d- and l-forms).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4184,
    similar: {
      question: "A transition metal complex has a spin-only magnetic moment of 1.73 BM. According to crystal field theory, which of the following electronic configurations and geometries corresponds to this magnetic moment?",
      option_a: "Low-spin octahedral d⁷ complex (t₂g⁶ eg¹)",
      option_b: "Square planar d⁹ complex",
      option_c: "Tetrahedral d⁹ complex (e⁴ t₂⁵)",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "1. The spin-only magnetic moment formula is μ = √(n(n + 2)) BM.\n2. A magnetic moment of 1.73 BM corresponds to √(1(1 + 2)) = √3 ≈ 1.73 BM, which requires exactly n = 1 unpaired electron.\n3. Evaluating each case:\n   - Low-spin octahedral d⁷: In a strong crystal field, 6 electrons pair in the t₂g set and 1 electron enters the eg set (t₂g⁶ eg¹), giving n = 1 unpaired electron.\n   - Square planar d⁹: 8 electrons fill the four lower d-orbitals and 1 electron resides in the highest dx²-y² orbital, giving n = 1 unpaired electron.\n   - Tetrahedral d⁹: The configuration is e⁴ t₂⁵, which leaves n = 1 unpaired electron in the t₂ set.\n4. Thus, all three cases have exactly 1 unpaired electron and μ = 1.73 BM.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4185,
    similar: {
      question: "For the octahedral complex [Fe(H₂O)₆]²⁺, the crystal field splitting energy (Δₒ) is 10,400 cm⁻¹ and the mean pairing energy (P) is 17,600 cm⁻¹. Based on these values, the complex is:",
      option_a: "A low-spin, diamagnetic complex",
      option_b: "A high-spin, paramagnetic complex with 4 unpaired electrons",
      option_c: "A low-spin, paramagnetic complex with 1 unpaired electron",
      option_d: "A high-spin, diamagnetic complex",
      correct_option: "B",
      explanation: "1. In [Fe(H₂O)₆]²⁺, the central iron ion is Fe²⁺ with a 3d⁶ valence configuration.\n2. The given parameters are Δₒ = 10,400 cm⁻¹ and P = 17,600 cm⁻¹.\n3. Since Δₒ < P (crystal field splitting is less than pairing energy), it is energetically more favorable for electrons to occupy the higher-energy eg orbitals with parallel spins rather than pairing up in the t₂g orbitals.\n4. Consequently, the complex is high-spin with an electronic configuration of t₂g⁴ eg².\n5. It possesses 4 unpaired electrons, making it strongly paramagnetic (μ = √24 ≈ 4.90 BM).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4186,
    similar: {
      question: "A divalent 3d-transition metal ion forms a complex with water having a magnetic moment of 4.90 BM, but with cyanide (CN⁻) it forms a complex with zero magnetic moment (diamagnetic). The divalent metal ion is:",
      option_a: "Co²⁺",
      option_b: "Mn²⁺",
      option_c: "Fe²⁺",
      option_d: "Ni²⁺",
      correct_option: "C",
      explanation: "1. Consider Fe²⁺ (Z = 26, 3d⁶ configuration):\n   - With weak field ligand H₂O: Δₒ < P, forming high-spin [Fe(H₂O)₆]²⁺ (t₂g⁴ eg²). It contains 4 unpaired electrons, giving μ = √(4(6)) = √24 ≈ 4.90 BM.\n   - With strong field ligand CN⁻: Δₒ > P, forming low-spin [Fe(CN)₆]⁴⁻ (t₂g⁶ eg⁰). All six d-electrons pair up completely in the t₂g orbitals, resulting in n = 0 unpaired electrons and μ = 0 BM (diamagnetic).\n2. For Co²⁺ (d⁷), high-spin has n = 3 (3.87 BM) and low-spin has n = 1 (1.73 BM), never zero.\n3. For Mn²⁺ (d⁵), high-spin has n = 5 (5.92 BM) and low-spin has n = 1 (1.73 BM).\n4. Therefore, the metal ion is Fe²⁺.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4189,
    similar: {
      question: "A square planar complex of the formula [PtCl₂(NH₃)₂] exists in two isomeric forms (X and Y). Isomer X reacts with oxalic acid (a bidentate ligand) to form [Pt(C₂O₄)(NH₃)₂], while isomer Y does not react with oxalic acid. Which of the following correctly identifies X and Y?",
      option_a: "X is the trans-isomer and Y is the cis-isomer",
      option_b: "X is the cis-isomer and Y is the trans-isomer",
      option_c: "Both X and Y are identical cis-isomers",
      option_d: "Both X and Y are tetrahedral complexes",
      correct_option: "B",
      explanation: "1. Oxalic acid provides the bidentate oxalate ligand (C₂O₄²⁻), which has a small bite angle and can coordinate only to two mutually adjacent (cis) coordination sites of a square planar metal center.\n2. In the cis-isomer (X), the two chloride leaving groups are in cis positions (90° apart), allowing the chelating oxalate ligand to substitute both chlorides and form a stable 5-membered chelate ring.\n3. In the trans-isomer (Y), the two chloride ligands are located in trans positions (180° apart); a bidentate oxalate ligand cannot bridge across 180° due to geometric strain.\n4. Therefore, X is the cis-isomer and Y is the trans-isomer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4208,
    similar: {
      question: "Which of the following monodentate ligands forms an octahedral cobalt(III) complex of the type [CoL₆]³⁺ that is low-spin and completely diamagnetic (μ = 0 BM)?",
      option_a: "F⁻",
      option_b: "Cl⁻",
      option_c: "H₂O",
      option_d: "Br⁻",
      correct_option: "C",
      explanation: "1. Cobalt(III) has a 3d⁶ electronic configuration with a relatively high charge (+3), which substantially increases the crystal field splitting parameter (Δₒ).\n2. With halide ligands (F⁻, Cl⁻, Br⁻), Δₒ remains smaller than pairing energy P, resulting in high-spin paramagnetic complexes (e.g., [CoF₆]³⁻ is t₂g⁴ eg², with 4 unpaired electrons).\n3. However, with water (H₂O), the increased effective nuclear charge of Co³⁺ causes Δₒ to exceed the pairing energy (Δₒ > P).\n4. Consequently, [Co(H₂O)₆]³⁺ is a low-spin complex with an electronic configuration of t₂g⁶ eg⁰, featuring zero unpaired electrons and a diamagnetic state (μ = 0 BM).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4209,
    similar: {
      question: "The hexaaquatitanium(III) ion, [Ti(H₂O)₆]³⁺, absorbs light in the yellow-green region (~500 nm) and appears purple. What is the electronic configuration of the titanium ion in its photo-excited state?",
      option_a: "t₂g¹ eg⁰",
      option_b: "t₂g² eg⁰",
      option_c: "t₂g¹ eg¹",
      option_d: "t₂g⁰ eg¹",
      correct_option: "D",
      explanation: "1. In [Ti(H₂O)₆]³⁺, titanium is in the +3 oxidation state with a 3d¹ electronic configuration.\n2. In the ground state of an octahedral crystal field, the single d-electron occupies one of the lower-energy t₂g orbitals: (t₂g)¹ (eg)⁰.\n3. When the complex absorbs a photon of yellow-green light corresponding to the energy difference Δₒ, the electron is promoted via a d–d transition to a higher-energy eg orbital.\n4. Therefore, the electronic configuration in the excited state is (t₂g)⁰ (eg)¹.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4210,
    similar: {
      question: "Consider the complex ions [Cu(CN)₄]³⁻ and [Cd(CN)₄]²⁻. Which of the following statements correctly describes their behavior upon passing H₂S gas through an aqueous mixture of both complexes?",
      option_a: "Both copper and cadmium precipitate as black sulphides.",
      option_b: "Neither copper nor cadmium precipitates because both are completely inert.",
      option_c: "Cadmium precipitates as yellow CdS, whereas copper remains in solution as [Cu(CN)₄]³⁻.",
      option_d: "Copper precipitates as CuS, whereas cadmium remains in solution as [Cd(CN)₄]²⁻.",
      correct_option: "C",
      explanation: "1. In qualitative inorganic analysis (Group II cation separation), [Cu(CN)₄]³⁻ and [Cd(CN)₄]²⁻ have drastically different stability constants.\n2. The formation constant of the tetracyanocuprate(I) complex, [Cu(CN)₄]³⁻, is extraordinarily high (log β₄ ≈ 27); it dissociates so little that the free Cu⁺ concentration is insufficient to exceed the solubility product of Cu₂S.\n3. In contrast, the tetracyanocadmate(II) complex, [Cd(CN)₄]²⁻, is far less stable (log β₄ ≈ 17) and dissociates enough to yield a sufficient concentration of free Cd²⁺ ions.\n4. When H₂S gas is bubbled through the solution, the ionic product [Cd²⁺][S²⁻] exceeds the K_sp of CdS, causing bright yellow CdS to precipitate, while copper remains in solution.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4211,
    similar: {
      question: "Which of the following statements regarding geometric (cis-trans) isomers in coordination chemistry is INCORRECT?",
      option_a: "cis and trans isomers have identical chemical formulas and atom connectivities but different spatial arrangements.",
      option_b: "cis and trans isomers are non-superimposable and are NOT mirror images of each other; thus, they are diastereomers.",
      option_c: "cis and trans isomers typically have different dipole moments, boiling points, and solubilities.",
      option_d: "cis and trans isomers are enantiomers of each other and always rotate plane-polarized light in equal and opposite directions.",
      correct_option: "D",
      explanation: "1. Enantiomers are stereoisomers that are non-superimposable mirror images of each other.\n2. cis and trans isomers are stereoisomers that are NOT mirror images of each other; therefore, by definition, they are diastereomers.\n3. Diastereomers have different spatial distances between atoms, leading to different dipole moments, physical properties, and chemical reactivities.\n4. Stating that cis and trans isomers are enantiomers that rotate plane-polarized light in opposite directions is completely incorrect.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4212,
    similar: {
      question: "The coordination compound [Co(NH₃)₄(SCN)₂]₃[Co(ox)₃] can exhibit which of the following combinations of isomerisms?",
      option_a: "Geometrical isomerism only",
      option_b: "Geometrical isomerism, optical isomerism, and linkage isomerism",
      option_c: "Ionization isomerism only",
      option_d: "Hydrate isomerism only",
      correct_option: "B",
      explanation: "1. In the cationic entity [Co(NH₃)₄(SCN)₂]⁺:\n   - It is an octahedral complex of type [Ma₄b₂], which exhibits geometrical (cis and trans) isomerism.\n   - Thiocyanate (SCN⁻) is an ambidentate ligand capable of coordinating via sulphur (–SCN) or nitrogen (–NCS), giving rise to linkage isomerism.\n2. In the anionic entity [Co(ox)₃]³⁻:\n   - It is a tris-chelate octahedral complex of type [M(AA)₃], which possesses D₃ symmetry and lacks any plane of symmetry; it exists as a pair of non-superimposable optical isomers (d- and l-enantiomers).\n3. Therefore, this compound exhibits geometrical, optical, and linkage isomerisms.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4213,
    similar: {
      question: "Which of the following coordination compounds can exhibit optical isomerism (exist as a pair of enantiomers)?",
      option_a: "Square planar [Pt(NH₃)₂Cl₂]",
      option_b: "Tetrahedral [NiCl₄]²⁻",
      option_c: "Octahedral trans-[Co(NH₃)₄Cl₂]⁺",
      option_d: "Tris(ethylenediamine)cobalt(III) ion, [Co(en)₃]³⁺",
      correct_option: "D",
      explanation: "1. Optical isomerism requires the coordination entity to be chiral (lacking an improper axis of rotation, including planes of symmetry and centers of inversion).\n2. Square planar complexes like [Pt(NH₃)₂Cl₂] have the molecular plane as a plane of symmetry, so they are always achiral.\n3. trans-[Co(NH₃)₄Cl₂]⁺ has horizontal and vertical planes of symmetry and a center of inversion, making it achiral and optically inactive.\n4. In [Co(en)₃]³⁺, three bidentate ethylenediamine rings wrap around the central cobalt atom in a propeller-like helical arrangement (D₃ point group). It has no plane or center of inversion, and exists as two optically active enantiomers (Δ and Λ forms).\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4214,
    similar: {
      question: "When 0.1 mol of a coordination compound with empirical formula CoCl₃·5NH₃ is treated with excess AgNO₃ solution, exactly 0.2 mol of AgCl is precipitated. According to Werner's theory, the structural formula of the complex is:",
      option_a: "[Co(NH₃)₅Cl₃]",
      option_b: "[Co(NH₃)₄Cl₂]Cl·NH₃",
      option_c: "[Co(NH₃)₅Cl]Cl₂",
      option_d: "[Co(NH₃)₆]Cl₃",
      correct_option: "C",
      explanation: "1. According to Werner's coordination theory, only chloride ions present outside the coordination sphere (ionizable chlorides satisfying primary valency) can react with Ag⁺ to form an AgCl precipitate.\n2. The molar ratio of precipitated AgCl to the complex is:\n   Moles of AgCl / Moles of complex = 0.2 mol / 0.1 mol = 2\n3. This indicates that exactly 2 chloride ions reside outside the coordination sphere as counter-ions.\n4. The remaining 1 chloride ion and all 5 ammonia molecules reside inside the coordination sphere, satisfying the cobalt(III) coordination number of 6.\n5. Thus, the formulation is [Co(NH₃)₅Cl]Cl₂.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4215,
    similar: {
      question: "Copper(II) ions readily form the deep-blue complex [Cu(NH₃)₄]²⁺ in aqueous ammonia, but addition of dilute sulphuric acid immediately discharges the blue color. What is the fundamental chemical reason?",
      option_a: "Sulphuric acid reduces Cu²⁺ to metallic copper.",
      option_b: "H⁺ ions protonate NH₃ to form ammonium ions (NH₄⁺), removing the lone pair on nitrogen needed for coordination.",
      option_c: "Sulphate ions precipitate insoluble copper sulphate.",
      option_d: "Dilute acid increases the pH of the solution.",
      correct_option: "B",
      explanation: "1. In [Cu(NH₃)₄]²⁺, neutral ammonia molecules act as Lewis bases by donating the lone pair of electrons on the nitrogen atom to vacant orbitals of Cu²⁺.\n2. When an acid (such as H₂SO₄) is added, the high concentration of H⁺ ions reacts with the basic ammonia ligands:\n   NH₃ + H⁺ ⇌ NH₄⁺\n3. Protons bind firmly to the lone pair of nitrogen, destroying its electron-donor (ligand) ability.\n4. This pulls the coordination equilibrium to the left, decomposing [Cu(NH₃)₄]²⁺ back into pale blue hydrated copper ions [Cu(H₂O)₆]²⁺ and NH₄⁺.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4216,
    similar: {
      question: "The cyanide ion (CN⁻) acts towards transition metal ions primarily as:",
      option_a: "A powerful complexing agent (ligand) and a reducing agent",
      option_b: "A strong oxidising agent only",
      option_c: "An inert spectator ion",
      option_d: "A dehydrating agent only",
      correct_option: "A",
      explanation: "1. Cyanide (CN⁻) possesses a lone pair of electrons on carbon and acts as a strong σ-donor and π-acceptor ligand, readily forming very stable coordinate complexes (such as [Fe(CN)₆]⁴⁻, [Ni(CN)₄]²⁻, [Au(CN)₂]⁻). Thus, it has strong complexing ability.\n2. In addition, cyanide can act as a reducing agent towards certain metal ions in high oxidation states (for instance, reducing Cu²⁺ to Cu⁺ with the liberation of cyanogen gas, (CN)₂: 2Cu²⁺ + 4CN⁻ → 2CuCN + (CN)₂).\n3. It does not act as an oxidizing agent.\n4. Therefore, the properties shown by CN⁻ are complexing and reducing.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4217,
    similar: {
      question: "By definition, the coordination number (CN) of a central metal atom or ion in a coordination complex is equal to:",
      option_a: "The total number of ligand donor atoms directly bonded to the metal ion by coordinate σ-bonds.",
      option_b: "The total number of π-bonds formed between the metal and ligands.",
      option_c: "The sum of the primary and secondary valencies of the metal.",
      option_d: "The oxidation state of the metal ion.",
      correct_option: "A",
      explanation: "1. The coordination number of a central metal ion in a complex is defined as the total number of coordinate σ-bonds formed between the central metal and donor atoms of the surrounding ligands.\n2. For monodentate ligands, the coordination number is equal to the number of ligands.\n3. For polydentate ligands, each donor atom forming a σ-bond contributes to the coordination number (e.g., in [Fe(C₂O₄)₃]³⁻, three bidentate oxalate ligands provide 3 × 2 = 6 σ-bonds, so CN = 6).\n4. π-bonds (such as back-bonding in metal carbonyls) do not alter the coordination number.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4218,
    similar: {
      question: "A solution containing 2.515 g of a cobalt(III) chloride ammine complex with molar mass 251.5 g/mol is treated with an excess of silver nitrate (AgNO₃). If 2.870 g of silver chloride (AgCl, molar mass = 143.5 g/mol) is precipitated, what is the Werner structural formula of the complex?",
      option_a: "[Co(NH₃)₆]Cl₃",
      option_b: "[Co(NH₃)₅Cl]Cl₂",
      option_c: "[Co(NH₃)₄Cl₂]Cl",
      option_d: "[Co(NH₃)₃Cl₃]",
      correct_option: "B",
      explanation: "1. First, calculate the moles of the coordination complex:\n   Moles of complex = Mass / Molar mass = 2.515 g / 251.5 g/mol = 0.010 mol\n2. Next, calculate the moles of AgCl precipitate formed:\n   Moles of AgCl = Mass / Molar mass = 2.870 g / 143.5 g/mol = 0.020 mol\n3. Determine the number of ionizable chloride ions per formula unit:\n   Ionizable Cl⁻ = Moles of AgCl / Moles of complex = 0.020 / 0.010 = 2\n4. Since 2 chloride ions are ionizable (precipitated by Ag⁺), they reside outside the coordination sphere as counter-ions.\n5. The remaining 1 chloride ion is coordinated directly to the central cobalt ion inside the sphere: [Co(NH₃)₅Cl]Cl₂.\nTherefore, Option (B) is the correct answer."
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
  console.log("Login successful! Updating Test 106 Part 2 (16 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 106 Part 2 update complete!");
}

run().catch(console.error);
