const https = require('https');

function login() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      username: 'indraprasthaadmin',
      password: 'indraprastha@123'
    });

    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.token || parsed.jwt);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function updateQuestion(id, similarData, token) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      similarQuestion: similarData
    });

    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/practice-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Failed with status ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const questions = [
  {
    id: 4333,
    data: {
      question: "Which of the following statements regarding four-coordinate nickel complexes are correct?\n(A) [Ni(CO)₄] is tetrahedral and diamagnetic.\n(B) [Ni(CN)₄]²⁻ is square planar and diamagnetic.\n(C) [NiCl₄]²⁻ is tetrahedral and paramagnetic with two unpaired electrons.",
      option_a: "(A) and (B) only",
      option_b: "(B) and (C) only",
      option_c: "(A) and (C) only",
      option_d: "(A), (B), and (C)",
      "correct_option": "D",
      explanation: "Step 1: Analyze [Ni(CO)₄]:\nNi⁰ is [Ar] 3d⁸ 4s². Strong field ligand CO forces pairing of 4s electrons into 3d: 3d¹⁰. The 4s and 4p orbitals undergo sp³ hybridization → tetrahedral geometry. All electrons are paired → diamagnetic. Statement (A) is correct.\n\nStep 2: Analyze [Ni(CN)₄]²⁻:\nNi²⁺ is [Ar] 3d⁸. Strong field ligand CN⁻ forces pairing of the two unpaired 3d electrons into one orbital, freeing one 3d orbital for dsp² hybridization → square planar geometry. All electrons are paired → diamagnetic. Statement (B) is correct.\n\nStep 3: Analyze [NiCl₄]²⁻:\nNi²⁺ is [Ar] 3d⁸. Weak field ligand Cl⁻ cannot cause pairing (Δ_t < P). The 4s and 4p orbitals undergo sp³ hybridization → tetrahedral geometry. It retains 2 unpaired electrons (t₂g⁴ e_g⁴ / e⁴ t₂⁴) → paramagnetic (μ ≈ 2.83 BM). Statement (C) is correct.\n\nStep 4: Therefore, all statements (A), (B), and (C) are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4334,
    data: {
      question: "Which of the following coordination complexes are PARAMAGNETIC?\n(I) [Ni(CO)₄]\n(II) [Mn(CN)₆]³⁻\n(III) [Co(NH₃)₆]³⁺\n(IV) [Ni(NH₃)₆]²⁺",
      option_a: "(I) and (III) only",
      option_b: "(II) and (IV) only",
      option_c: "(II) and (III) only",
      option_d: "(I) and (IV) only",
      "correct_option": "B",
      explanation: "Step 1: Analyze [Ni(CO)₄]:\nNi⁰ (3d¹⁰), sp³ hybridized, zero unpaired electrons → diamagnetic.\n\nStep 2: Analyze [Mn(CN)₆]³⁻:\nMn³⁺ has 3d⁴ configuration. Strong-field ligand CN⁻ gives a low-spin octahedral complex: (t₂g)⁴ (e_g)⁰. There are 2 unpaired electrons in the t₂g set → PARAMAGNETIC.\n\nStep 3: Analyze [Co(NH₃)₆]³⁺:\nCo³⁺ has 3d⁶ configuration. NH₃ is a strong field ligand for Co³⁺, causing complete pairing: (t₂g)⁶ (e_g)⁰. Unpaired electrons n = 0 → diamagnetic.\n\nStep 4: Analyze [Ni(NH₃)₆]²⁺:\nNi²⁺ has 3d⁸ configuration in an octahedral field: (t₂g)⁶ (e_g)². It inherently has 2 unpaired electrons in the e_g orbitals regardless of ligand strength → PARAMAGNETIC.\n\nStep 5: Therefore, complexes (II) and (IV) are paramagnetic.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4335,
    data: {
      question: "Which of the following formulas correctly represents Wilkinson's catalyst, widely used for the homogeneous catalytic hydrogenation of alkenes?",
      option_a: "[RhCl(PPh₃)₃]",
      option_b: "[Fe(η⁵-C₅H₅)₂]",
      option_c: "[PtCl₂(NH₃)₂]",
      option_d: "TiCl₄ + Al(C₂H₅)₃",
      "correct_option": "A",
      explanation: "Step 1: Wilkinson's catalyst:\nChemically named chloridotris(triphenylphosphine)rhodium(I), its formula is [RhCl(PPh₃)₃].\n\nStep 2: Structure and function:\nRh(I) is a 4d⁸ transition metal ion. The complex has a square planar geometry (16-electron species). In solution, it dissociates a PPh₃ ligand to generate a coordinatively unsaturated 14-electron active catalytic intermediate that binds H₂ and alkenes for selective, homogeneous hydrogenation.\n\nStep 3: Other compounds:\n- [Fe(η⁵-C₅H₅)₂]: Ferrocene\n- [PtCl₂(NH₃)₂]: Cisplatin\n- TiCl₄ + Al(C₂H₅)₃: Ziegler-Natta catalyst\n\nStep 4: Therefore, [RhCl(PPh₃)₃] is Wilkinson's catalyst.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4336,
    data: {
      question: "Which of the following descriptors correctly applies to the ethylenediaminetetraacetate ion (EDTA⁴⁻)?",
      option_a: "Monodentate and non-chelating",
      option_b: "Bidentate and ambidentate",
      option_c: "Hexadentate, polydentate, and chelating",
      option_d: "Bridging ligand only",
      "correct_option": "C",
      explanation: "Step 1: Molecular structure of EDTA⁴⁻:\nFormula: [⁻OOC-CH₂]₂N-CH₂-CH₂-N[CH₂-COO⁻]₂.\n\nStep 2: Donor atoms and denticity:\nIt contains two tertiary nitrogen atoms (each with a lone pair) and four carboxylate oxygen atoms (each bearing negative charge). Thus, it has 6 donor atoms capable of coordinating simultaneously to a single central metal atom, making it a hexadentate (polydentate) ligand.\n\nStep 3: Chelation:\nWhen it binds to a metal ion, it wraps around it to form 5 stable five-membered rings, functioning as a powerful chelating agent.\n\nStep 4: Therefore, EDTA⁴⁻ is hexadentate, polydentate, and chelating.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4337,
    data: {
      question: "Which of the following compounds is an organometallic compound (containing at least one direct metal–carbon bond)?",
      option_a: "Zeise's salt, K[PtCl₃(η²-C₂H₄)]",
      option_b: "Ferrocene, [Fe(η⁵-C₅H₅)₂]",
      option_c: "Methylmagnesium bromide, CH₃MgBr (Grignard reagent)",
      option_d: "All of the above",
      "correct_option": "D",
      explanation: "Step 1: Definition of organometallic compounds:\nA compound containing at least one direct chemical bond between a metal (or metalloid) atom and a carbon atom of an organic group.\n\nStep 2: Analyze each compound:\n- Zeise's salt: K[PtCl₃(η²-C₂H₄)] has direct bonding between the platinum metal and the π-electrons of the ethylene carbon atoms (first synthesized organometallic compound).\n- Ferrocene: [Fe(η⁵-C₅H₅)₂] is a sandwich compound with direct Fe–C bonds to cyclopentadienyl rings.\n- Grignard reagent: CH₃MgBr contains a direct polarized covalent Mg–C bond.\n\nStep 3: Since all three contain metal–carbon bonds, all of the above are organometallic compounds.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4338,
    data: {
      question: "When phenol is treated with concentrated sulfuric acid at low temperature (288–293 K) and at high temperature (373 K), the principal products obtained are, respectively:",
      option_a: "o-Phenolsulfonic acid at low temperature and p-phenolsulfonic acid at high temperature",
      option_b: "p-Phenolsulfonic acid at low temperature and o-phenolsulfonic acid at high temperature",
      option_c: "m-Phenolsulfonic acid at both temperatures",
      option_d: "2,4,6-Phenoltrisulfonic acid at all temperatures",
      "correct_option": "A",
      explanation: "Step 1: Electronic effect of -OH in phenol:\nThe phenolic -OH group activates the benzene ring via resonance (+M effect) and directs electrophilic aromatic substitution to the ortho and para positions.\n\nStep 2: Temperature dependence of sulfonation:\nSulfonation of phenol is a reversible reaction exhibiting kinetic vs. thermodynamic control:\n- At lower temperature (~288–293 K), the reaction is under kinetic control, and the faster-forming ortho-isomer (o-phenolsulfonic acid) is the major product.\n- At higher temperature (~373 K), the reaction is under thermodynamic control, and the more stable, less sterically hindered para-isomer (p-phenolsulfonic acid) predominates.\n\nStep 3: Therefore, o-phenolsulfonic acid forms at low temperature and p-phenolsulfonic acid forms at high temperature.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4339,
    data: {
      question: "Zeise's salt, K[PtCl₃(η²-C₂H₄)], is a classic example of an organometallic complex involving which type of metal–alkene bonding?",
      option_a: "Pure σ-bonding only",
      option_b: "Pure ionic electrostatic attraction only",
      option_c: "Both σ-donation from filled π-orbitals of ethylene and π-backdonation from filled metal d-orbitals into empty π* orbitals of ethylene",
      option_d: "Covalent metal–metal quadruple bonding",
      "correct_option": "C",
      explanation: "Step 1: Dewar-Chatt-Duncanson model for metal-alkene bonding:\nIn Zeise's salt, K[PtCl₃(η²-C₂H₄)]·H₂O, the platinum-ethylene bonding involves two synergic components:\n1. The filled π-bonding molecular orbital of ethylene donates electron density into a vacant 5d-6s-6p hybrid orbital of Pt(II) (σ-type donation).\n2. Filled 5d orbitals of Pt(II) donate electron density back into the empty π* antibonding molecular orbital of ethylene (π-backdonation).\n\nStep 2: This synergic mechanism lowers the C=C bond order in ethylene (lengthening the C=C bond from 1.34 Å in free ethylene to ~1.37 Å in the complex).\n\nStep 3: Therefore, it involves both σ-donation and π-backdonation.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4340,
    data: {
      question: "How many carbon–carbon double bonds (C=C) are present in the molecule of benzene hexachloride (BHC / gammexane / lindane, C₆H₆Cl₆)?",
      option_a: "3",
      option_b: "2",
      option_c: "1",
      option_d: "Zero",
      "correct_option": "D",
      explanation: "Step 1: Synthesis of BHC (gammexane):\nBenzene reacts with three molecules of chlorine (Cl₂) in the presence of ultraviolet light (hν):\nC₆H₆ + 3Cl₂ —(UV light)→ C₆H₆Cl₆\n\nStep 2: Nature of reaction:\nThis is a free-radical addition reaction across all three π-bonds of the aromatic benzene ring.\n\nStep 3: Structure of product:\nThe product is 1,2,3,4,5,6-hexachlorocyclohexane. It is a completely saturated six-membered cyclohexane ring where every carbon atom is sp³ hybridized and bonded to one H, one Cl, and two adjacent C atoms.\n\nStep 4: Therefore, there are ZERO carbon-carbon double bonds in BHC.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4341,
    data: {
      question: "Consider three cobalt ammine complexes: (A) CoCl₃·6NH₃, (B) CoCl₃·5NH₃, and (C) CoCl₃·4NH₃. According to Werner's coordination theory, what are the primary valencies of cobalt in complexes (A), (B), and (C), respectively?",
      option_a: "6, 5, 4",
      option_b: "3, 2, 1",
      option_c: "3, 3, 3",
      option_d: "0, 1, 2",
      "correct_option": "C",
      explanation: "Step 1: Formulation according to Werner's theory:\n- Complex A: [Co(NH₃)₆]Cl₃ (precipitates 3 moles of AgCl with excess AgNO₃)\n- Complex B: [Co(NH₃)₅Cl]Cl₂ (precipitates 2 moles of AgCl)\n- Complex C: [Co(NH₃)₄Cl₂]Cl (precipitates 1 mole of AgCl)\n\nStep 2: Definition of primary valency:\nIn Werner's theory, the primary valency corresponds strictly to the oxidation state of the central transition metal ion.\n\nStep 3: Oxidation state of cobalt in each complex:\n- In [Co(NH₃)₆]Cl₃: Co is in +3 oxidation state (Primary valency = 3)\n- In [Co(NH₃)₅Cl]Cl₂: Co is in +3 oxidation state (Primary valency = 3)\n- In [Co(NH₃)₄Cl₂]Cl: Co is in +3 oxidation state (Primary valency = 3)\n\nStep 4: Therefore, the primary valency in all three complexes is 3, 3, 3.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4342,
    data: {
      question: "The coordination compound pentaammine(nitro)chromium(III) chloride, [Cr(NH₃)₅(NO₂)]Cl₂, exhibits which type of structural isomerism due to the ambidentate nature of the NO₂⁻ ligand?",
      option_a: "Coordination isomerism",
      option_b: "Hydrate isomerism",
      option_c: "Linkage isomerism",
      option_d: "Optical isomerism",
      "correct_option": "C",
      explanation: "Step 1: An ambidentate ligand is a monodentate ligand that has two or more different donor atoms through which it can coordinate to a central metal ion.\n\nStep 2: The nitrite ion (NO₂⁻) can coordinate either through its nitrogen atom (-NO₂, nitro form) or through one of its oxygen atoms (-ONO, nitrito form):\n- [Cr(NH₃)₅(NO₂)]Cl₂ (nitro isomer, yellow)\n- [Cr(NH₃)₅(ONO)]Cl₂ (nitrito isomer, red)\n\nStep 3: Compounds that have the same molecular formula but differ in the atom through which an ambidentate ligand is attached to the central metal atom are called linkage isomers.\n\nStep 4: Therefore, it exhibits linkage isomerism.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4343,
    data: {
      question: "The hexaaquascandium(III) complex ion, [Sc(H₂O)₆]³⁺, is observed to be:",
      option_a: "Paramagnetic and deeply colored",
      option_b: "Diamagnetic and completely colorless",
      option_c: "Paramagnetic and colorless",
      option_d: "Ferromagnetic and red",
      "correct_option": "B",
      explanation: "Step 1: Electronic configuration of Scandium (Z = 21):\nNeutral Sc is [Ar] 3d¹ 4s².\n\nStep 2: Configuration of Sc³⁺:\nIn [Sc(H₂O)₆]³⁺, scandium is in the +3 oxidation state. It loses all 3 valence electrons:\nSc³⁺ = [Ar] 3d⁰ 4s⁰.\n\nStep 3: Magnetic and spectroscopic properties:\n- Since there are no unpaired electrons (n = 0), the complex is completely DIAMAGNETIC.\n- Because the 3d subshell is completely empty (d⁰), no d–d electronic transitions can take place in the visible spectrum. Consequently, the ion does not absorb visible light and is COLORLESS.\n\nStep 4: Therefore, [Sc(H₂O)₆]³⁺ is diamagnetic and colorless.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4344,
    data: {
      question: "Which of the following octahedral complexes (where A and B are monodentate ligands) CANNOT exhibit geometrical isomerism?",
      option_a: "[MA₄B₂]",
      option_b: "[MA₅B]",
      option_c: "[MA₃B₃]",
      option_d: "[MA₂B₄]",
      "correct_option": "B",
      explanation: "Step 1: Geometrical isomerism in octahedral complexes requires the existence of at least two non-equivalent spatial arrangements of ligands.\n\nStep 2: Analyze [MA₅B]:\nIn an octahedron, all 6 coordination positions are mutually equivalent. Wherever the single B ligand is positioned, all five A ligands occupy identical spatial relationships (one trans to B, four cis to B). No other arrangement is possible. Hence, [MA₅B] has only 1 possible isomer and CANNOT exhibit geometrical isomerism.\n\nStep 3: Analyze the other complexes:\n- [MA₄B₂] exhibits 2 geometrical isomers: cis and trans.\n- [MA₃B₃] exhibits 2 geometrical isomers: facial (fac) and meridional (mer).\n- [MA₂B₄] exhibits 2 geometrical isomers: cis and trans.\n\nStep 4: Therefore, [MA₅B] cannot show geometrical isomerism.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4345,
    data: {
      question: "Which of the following complex ions is colorless and does NOT absorb light in the visible region of the electromagnetic spectrum?",
      option_a: "[Ni(CN)₄]²⁻",
      option_b: "[Cr(H₂O)₆]³⁺",
      option_c: "[Fe(H₂O)₆]²⁺",
      option_d: "[Cu(H₂O)₆]²⁺",
      "correct_option": "A",
      explanation: "Step 1: Analyze [Ni(CN)₄]²⁻:\nNi²⁺ is 3d⁸. With the very strong field ligand CN⁻, it adopts a low-spin square planar geometry (dsp²). The energy gap between the highest occupied d-orbital and the empty d_x²-y² orbital (Δ_sp) is exceptionally large. Consequently, electronic transitions require high energy and occur exclusively in the ultraviolet (UV) region, leaving the complex completely colorless in visible light.\n\nStep 2: Analyze the other complexes:\n- [Cr(H₂O)₆]³⁺ (3d³): absorbs visible light → violet/green.\n- [Fe(H₂O)₆]²⁺ (3d⁶): absorbs visible light → pale green.\n- [Cu(H₂O)₆]²⁺ (3d⁹): absorbs visible light → bright blue.\n\nStep 3: Therefore, [Ni(CN)₄]²⁻ is colorless and does not absorb visible light.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4346,
    data: {
      question: "What is the correct decreasing order of ring-activating power towards electrophilic aromatic substitution among the following substituents on benzene?",
      option_a: "-NH₂ > -NHCOCH₃ > -CH₃",
      option_b: "-CH₃ > -NHCOCH₃ > -NH₂",
      option_c: "-NHCOCH₃ > -NH₂ > -CH₃",
      option_d: "-NH₂ > -CH₃ > -NHCOCH₃",
      "correct_option": "A",
      explanation: "Step 1: Effect of -NH₂ (amino group):\nThe unshared electron pair on nitrogen is directly conjugated with the benzene ring, offering a very strong +M (mesomeric/resonance) electron-donating effect. It is a powerful ring activator.\n\nStep 2: Effect of -NHCOCH₃ (acetamido group):\nThe nitrogen lone pair is delocalized not only into the benzene ring (+M) but also into the adjacent strongly electronegative carbonyl group (-C=O) by cross-conjugation. This reduces the availability of the lone pair for donation into the aromatic ring, making -NHCOCH₃ a moderate activating group.\n\nStep 3: Effect of -CH₃ (methyl group):\nActivates solely via weak inductive (+I) and hyperconjugative effects, making it a weakly activating group.\n\nStep 4: Therefore, the activating power order is: -NH₂ > -NHCOCH₃ > -CH₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4347,
    data: {
      question: "Which of the following pairs of compounds contains transition metals in their highest possible group oxidation states (+7 and +6)?",
      option_a: "MnO₂ and FeCl₃",
      option_b: "[MnO₄]⁻ and CrO₂Cl₂",
      option_c: "[Fe(CN)₆]³⁻ and [Co(CN)₆]³⁻",
      option_d: "[NiCl₄]²⁻ and [CuCl₄]²⁻",
      "correct_option": "B",
      explanation: "Step 1: Determine the oxidation state in [MnO₄]⁻ (permanganate ion):\nx + 4(-2) = -1 ⇒ x = +7.\nManganese is in Group 7, and +7 is its maximum group oxidation state.\n\nStep 2: Determine the oxidation state in CrO₂Cl₂ (chromyl chloride):\nx + 2(-2) + 2(-1) = 0 ⇒ x - 6 = 0 ⇒ x = +6.\nChromium is in Group 6, and +6 is its maximum group oxidation state.\n\nStep 3: Check other options:\n- MnO₂ (+4), FeCl₃ (+3)\n- [Fe(CN)₆]³⁻ (+3), [Co(CN)₆]³⁻ (+3)\n- [NiCl₄]²⁻ (+2), [CuCl₄]²⁻ (+2)\n\nStep 4: Therefore, [MnO₄]⁻ and CrO₂Cl₂ contain metals in their highest oxidation states (+7 and +6).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4348,
    data: {
      question: "How many total geometrical isomers are possible for the four-coordinate square planar complex [RhCl(CO)(PPh₃)(NH₃)]?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      "correct_option": "C",
      explanation: "Step 1: Identify the complex type:\nThe complex [RhCl(CO)(PPh₃)(NH₃)] is a square planar complex of the general formula [MABCD], where all four ligands A, B, C, and D are different monodentate ligands.\n\nStep 2: Determine the number of geometrical isomers:\nTo find the number of geometrical isomers for an [MABCD] square planar complex:\n- Fix one ligand (e.g., A = Cl) at position 1.\n- The trans position (opposite to A) can be occupied by any of the remaining three ligands: B (CO), C (PPh₃), or D (NH₃).\n\nStep 3: This yields exactly 3 distinct diastereomers (geometrical isomers):\n1. trans-(Cl, CO)\n2. trans-(Cl, PPh₃)\n3. trans-(Cl, NH₃)\n\nStep 4: Therefore, there are 3 geometrical isomers.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4349,
    data: {
      question: "When a primary aromatic amine like p-toluidine (4-methylaniline) is heated with chloroform and alcoholic potassium hydroxide, what product is formed?",
      option_a: "p-Tolyl isocyanate",
      option_b: "p-Tolyl isocyanide (carbylamine)",
      option_c: "p-Tolyl cyanide",
      option_d: "p-Chlorotoluene",
      "correct_option": "B",
      explanation: "Step 1: Reaction type:\nThis is the Carbylamine reaction (Hoffmann's isocyanide test), which is a specific diagnostic test for primary aliphatic and aromatic amines.\n\nStep 2: Chemical equation:\np-CH₃-C₆H₄-NH₂ + CHCl₃ + 3KOH (alc.) —(heat)→ p-CH₃-C₆H₄-NC + 3KCl + 3H₂O\n\nStep 3: The product formed is p-tolyl isocyanide (or p-tolyl carbylamine), which is characterized by an extremely obnoxious and foul odor.\n\nStep 4: Therefore, p-tolyl isocyanide is formed.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4350,
    data: {
      question: "Which of the following represents the correct increasing order of ligand field strength in the spectrochemical series?",
      option_a: "Cl⁻ < F⁻ < C₂O₄²⁻ < H₂O < CN⁻",
      option_b: "CN⁻ < C₂O₄²⁻ < Cl⁻ < F⁻ < H₂O",
      option_c: "C₂O₄²⁻ < F⁻ < Cl⁻ < CN⁻ < H₂O",
      option_d: "F⁻ < Cl⁻ < CN⁻ < C₂O₄²⁻ < H₂O",
      "correct_option": "A",
      explanation: "Step 1: The spectrochemical series is an experimentally determined ordering of ligands according to increasing magnitude of crystal field splitting (Δ_o):\nI⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < N₃⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < edta⁴⁻ < NH₃ < en < bpy < phen < NO₂⁻ < PPh₃ < CN⁻ < CO\n\nStep 2: Comparing the given ligands:\nHalide ions (Cl⁻, F⁻) produce weak fields: Cl⁻ < F⁻.\nOxygen donor chelates like oxalate (C₂O₄²⁻) produce intermediate fields.\nWater (H₂O) comes after oxalate: C₂O₄²⁻ < H₂O.\nCarbon-donor cyanide (CN⁻) produces an extraordinarily strong ligand field.\n\nStep 3: Hence, the correct increasing order is: Cl⁻ < F⁻ < C₂O₄²⁻ < H₂O < CN⁻.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4351,
    data: {
      question: "According to IUPAC 2005 rules, what is the systematic name of the brown ring / nitroprusside complex salt K₃[Fe(CN)₅(NO)]?",
      option_a: "Potassium pentacyanonitrosylferrate(II)",
      option_b: "Potassium pentacyanonitrosylferrate(III)",
      option_c: "Pentacyanonitrosylpotassium ferrate(II)",
      option_d: "Potassium cyanonitrosylferrate(I)",
      "correct_option": "A",
      explanation: "Step 1: Cation is named first:\nK⁺ is named as 'potassium'.\n\nStep 2: Anion naming:\n- Ligands: CN⁻ is 'cyano' (or 'cyanido', 5 → pentacyano), NO⁺ is 'nitrosyl' (or 'nitrosonium').\n- Ligands arranged alphabetically: cyano before nitrosyl → pentacyanonitrosyl.\n\nStep 3: Metal and oxidation state:\nIn K₃[Fe(CN)₅(NO)], with NO coordinated as NO⁺:\n3(+1) + x + 5(-1) + (+1) = 0 ⇒ 3 + x - 4 = 0 ⇒ x = +2.\nSince the complex is an anion, iron takes the Latinate suffix '-ate': ferrate(II).\n\nStep 4: Putting it together:\nPotassium pentacyanonitrosylferrate(II).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4352,
    data: {
      question: "The characteristic violet/purple color of the hexaquatitanium(III) complex ion, [Ti(H₂O)₆]³⁺, is primarily caused by:",
      option_a: "Ligand-to-metal charge transfer (LMCT)",
      option_b: "Metal-to-ligand charge transfer (MLCT)",
      option_c: "A d–d electronic transition promoting a 3d electron from a lower t₂g orbital to an upper e_g orbital",
      option_d: "Vibrational relaxation of coordinated water molecules",
      "correct_option": "C",
      explanation: "Step 1: Electronic configuration of Ti³⁺ in [Ti(H₂O)₆]³⁺:\nTitanium (Z = 22) in +3 state has one d-electron: [Ar] 3d¹.\n\nStep 2: Crystal field splitting:\nUnder the octahedral field of six water ligands, the degenerate 3d orbitals split into a lower-energy triply degenerate t₂g set and a higher-energy doubly degenerate e_g set.\nGround state configuration = (t₂g)¹ (e_g)⁰.\n\nStep 3: Electronic excitation:\nUpon absorption of yellow-green light (~498 nm, corresponding to Δ_o = 20,400 cm⁻¹), the single d-electron is promoted from the t₂g to the e_g orbital (a d–d transition):\n(t₂g)¹ (e_g)⁰ + hν → (t₂g)⁰ (e_g)¹\nThe transmitted light is complementary to yellow-green, appearing violet/purple.\n\nStep 4: Therefore, the color is due to a d–d electronic transition.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4353,
    data: {
      question: "What is the oxidation state of iron in potassium ferrocyanide, K₄[Fe(CN)₆]?",
      option_a: "+3",
      option_b: "+4",
      option_c: "+2",
      option_d: "0",
      "correct_option": "C",
      explanation: "Step 1: Dissociation of potassium ferrocyanide:\nK₄[Fe(CN)₆] dissociates in aqueous solution into 4 K⁺ ions and one complex anion [Fe(CN)₆]⁴⁻.\n\nStep 2: Calculate the oxidation state of Fe (x):\nIn [Fe(CN)₆]⁴⁻, each cyanide ligand (CN⁻) carries a charge of -1.\nx + 6(-1) = -4\nx - 6 = -4\nx = +2.\n\nStep 3: Therefore, the oxidation state of iron is +2.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4354,
    data: {
      question: "Which of the following octahedral complexes exhibits both geometrical (cis-trans) and optical isomerism?",
      option_a: "cis-[Co(en)₂Cl₂]⁺",
      option_b: "trans-[Co(en)₂Cl₂]⁺",
      option_c: "[Co(NH₃)₆]³⁺",
      option_d: "[Co(en)₃]³⁺",
      "correct_option": "A",
      explanation: "Step 1: Analyze the isomers of [Co(en)₂Cl₂]⁺:\nThis complex exhibits two geometrical isomers: cis and trans.\n\nStep 2: Optical activity of trans-[Co(en)₂Cl₂]⁺:\nThe trans-isomer has two trans Cl⁻ ligands (180°) and two en rings lying in the equatorial plane. It has a plane of symmetry (and an inversion center), making it achiral and optically inactive.\n\nStep 3: Optical activity of cis-[Co(en)₂Cl₂]⁺:\nThe cis-isomer has two adjacent Cl⁻ ligands (90°). It lacks any plane of symmetry or center of inversion (C₂ symmetry point group). Consequently, it is chiral and exists as a pair of non-superimposable mirror-image enantiomers (dextrorotatory and laevorotatory).\n\nStep 4: Therefore, cis-[Co(en)₂Cl₂]⁺ represents the optically active geometrical isomer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4355,
    data: {
      question: "In the metallurgical cyanide extraction process:\n4M + 8CN⁻ + 2H₂O + O₂ → 4[M(CN)₂]⁻ + 4OH⁻\n2[M(CN)₂]⁻ + Zn → [Zn(CN)₄]²⁻ + 2M\nWhat is the metal M extracted by this process?",
      option_a: "Nickel",
      option_b: "Silver (or Gold)",
      option_c: "Copper",
      option_d: "Mercury",
      "correct_option": "B",
      explanation: "Step 1: The given chemical equations depict the MacArthur-Forrest cyanide process.\n\nStep 2: Step 1 involves oxidative dissolution (leaching) of native or crushed ore of silver (or gold) by dilute NaCN in the presence of atmospheric oxygen, forming the soluble dicyanoargentate(I) complex, [Ag(CN)₂]⁻.\n\nStep 3: Step 2 involves displacement (cementation) where zinc dust acts as a reducing agent to reduce Ag⁺ back to metallic silver (M) precipitate while forming soluble sodium tetracyanozincate(II), [Zn(CN)₄]²⁻.\n\nStep 4: Therefore, the metal M is Silver (or Gold).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4356,
    data: {
      question: "What is the Effective Atomic Number (EAN) of chromium in the coordination complex [Cr(NH₃)₆]Cl₃? (Atomic number of Cr = 24)",
      option_a: "32",
      option_b: "33",
      option_c: "34",
      option_d: "36",
      "correct_option": "B",
      explanation: "Step 1: Effective Atomic Number (EAN) formula:\nEAN = Z - (Oxidation State) + 2 × (Coordination Number)\nwhere Z is the atomic number of the central metal.\n\nStep 2: Values for [Cr(NH₃)₆]Cl₃:\n- Atomic number of Cr: Z = 24\n- Oxidation state of Cr: x + 6(0) + 3(-1) = 0 ⇒ x = +3\n- Coordination number: 6 (six monodentate NH₃ ligands donate 6 pairs = 12 electrons)\n\nStep 3: Calculate EAN:\nEAN = 24 - 3 + (2 × 6) = 21 + 12 = 33.\n\nStep 4: Therefore, the EAN of chromium is 33.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4357,
    data: {
      question: "How many total ions are produced per formula unit when hexaammineplatinum(IV) chloride, [Pt(NH₃)₆]Cl₄, is dissolved in water?",
      option_a: "5 ions",
      option_b: "4 ions",
      option_c: "6 ions",
      option_d: "2 ions",
      "correct_option": "A",
      explanation: "Step 1: Dissociation of coordination compound in water:\nIn [Pt(NH₃)₆]Cl₄, the species inside the square brackets represents the non-ionizable coordination sphere, while the four chloride ions outside the brackets represent the ionizable counter-ions.\n\nStep 2: Ionization equation:\n[Pt(NH₃)₆]Cl₄ (s) —(H₂O)→ [Pt(NH₃)₆]⁴⁺ (aq) + 4Cl⁻ (aq)\n\nStep 3: Count total ions produced:\n- One complex cation: [Pt(NH₃)₆]⁴⁺\n- Four chloride anions: 4Cl⁻\nTotal number of ions = 1 + 4 = 5 ions.\n\nStep 4: Therefore, it furnishes 5 ions.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 72 Part 2 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 72 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
