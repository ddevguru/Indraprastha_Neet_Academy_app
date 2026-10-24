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
    id: 4358,
    data: {
      question: "When an ammoniacal solution of nickel cyanide, Ni(CN)₂, is shaken with benzene, a light-violet crystalline clathrate compound (Hofmann's clathrate) is formed. What is its chemical formula?",
      option_a: "Ni(CN)₂·C₆H₆",
      option_b: "Ni(CN)₂·NH₃·C₆H₆",
      option_c: "[Ni(NH₃)₆][Ni(CN)₄]",
      option_d: "Ni(CN)₂·2C₆H₆",
      "correct_option": "B",
      explanation: "Step 1: Reaction of ammoniacal nickel cyanide with benzene:\nNi(CN)₂ + NH₃ + C₆H₆ → Ni(CN)₂·NH₃·C₆H₆\n\nStep 2: Nature of the compound:\nThis compound is known as Hofmann's benzene clathrate. In its crystal structure, octahedral and square planar nickel centers cross-link via cyanide bridges to build a two-dimensional polymeric network [Ni(NH₃)₂Ni(CN)₄]_n that traps guest benzene (C₆H₆) molecules inside the host lattice cavities.\n\nStep 3: Therefore, the formula is Ni(CN)₂·NH₃·C₆H₆.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4359,
    data: {
      question: "Copper(II) ions readily form the deep-blue tetraamminecopper(II) complex, [Cu(NH₃)₄]²⁺, in alkaline or neutral aqueous solution, but this complex does NOT form in strongly acidic solution. Why?",
      option_a: "Because copper(II) is reduced to metallic copper by acid",
      option_b: "Because hydrogen ions (H⁺) protonate ammonia molecules to form ammonium ions (NH₄⁺), depriving them of lone pairs for coordination",
      option_c: "Because copper hydroxide precipitates in acid",
      option_d: "Because water molecules are stronger field ligands than ammonia in acid",
      "correct_option": "B",
      explanation: "Step 1: Coordination of ammonia with Cu²⁺:\nIn aqueous solution, free ammonia molecules act as monodentate Lewis bases, donating their lone pair of electrons into vacant hybrid orbitals of Cu²⁺:\nCu²⁺ (aq) + 4NH₃ (aq) ⇌ [Cu(NH₃)₄]²⁺ (aq)\n\nStep 2: Effect of adding acid (high [H⁺]):\nAmmonia is a Brønsted base and reacts quantitatively with hydrogen ions:\nNH₃ + H⁺ ⇌ NH₄⁺\n\nStep 3: Consequence:\nIn the ammonium ion (NH₄⁺), the nitrogen lone pair is already engaged in a coordinate covalent bond with H⁺. There are no free electron pairs left to coordinate to Cu²⁺. Consequently, the equilibrium shifts completely to dissociate the complex into hydrated Cu²⁺ and NH₄⁺.\n\nStep 4: Therefore, protonation of ammonia to NH₄⁺ prevents complex formation in acid.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4360,
    data: {
      question: "What is the spatial geometry and hybridization of the central silver atom in the diamminesilver(I) complex ion, [Ag(NH₃)₂]⁺?",
      option_a: "Tetrahedral, sp³",
      option_b: "Square planar, dsp²",
      option_c: "Linear, sp",
      option_d: "Octahedral, sp³d²",
      "correct_option": "C",
      explanation: "Step 1: Determine the oxidation state and electronic configuration of Ag:\nSilver (Z = 47) has the ground state configuration [Kr] 4d¹⁰ 5s¹.\nIn [Ag(NH₃)₂]⁺, silver is in the +1 oxidation state:\nAg⁺ = [Kr] 4d¹⁰ 5s⁰ 5p⁰.\n\nStep 2: Coordination number and hybridization:\nThe coordination number is 2 (two NH₃ ligands). Ag⁺ utilizes its empty 5s and one empty 5p orbital to form two equivalent sp hybrid orbitals.\n\nStep 3: Spatial arrangement:\nTwo sp hybrid orbitals point in opposite directions at an angle of 180°, giving a LINEAR complex geometry [H₃N—Ag—NH₃]⁺.\n\nStep 4: Therefore, the geometry is linear with sp hybridization.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4361,
    data: {
      question: "Which of the following organometallic compounds is a π-complex containing an ethylene (ethene) molecule coordinated to a transition metal?",
      option_a: "Ferrocene",
      option_b: "Zeise's salt",
      option_c: "Dibenzenechromium",
      option_d: "Tetraethyllead",
      "correct_option": "B",
      explanation: "Step 1: Identify the ligand and structure in each compound:\n- Ferrocene: [Fe(η⁵-C₅H₅)₂], containing cyclopentadienyl π-ligands.\n- Zeise's salt: K[PtCl₃(η²-C₂H₄)]·H₂O, contains an ethene (C₂H₄) molecule coordinated side-on via its π-electrons to platinum(II).\n- Dibenzenechromium: [Cr(η⁶-C₆H₆)₂], containing benzene π-rings.\n- Tetraethyllead: Pb(C₂H₅)₄, a σ-bonded main-group organometallic compound.\n\nStep 2: Therefore, Zeise's salt is the π-complex containing ethene.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4362,
    data: {
      question: "Which of the following statements is/are correct regarding tetracarbonylnickel(0), [Ni(CO)₄]?\n(1) The oxidation state of nickel is zero.\n(2) The hybridization of nickel is sp³ and its geometry is tetrahedral.\n(3) The complex is diamagnetic with zero unpaired electrons.\n(4) Bonding involves synergic σ-donation and π-backbonding.",
      option_a: "(1) and (2) only",
      option_b: "(2) and (3) only",
      option_c: "(1), (2), and (3) only",
      option_d: "(1), (2), (3), and (4)",
      "correct_option": "D",
      explanation: "Step 1: Nickel is in zero oxidation state: Ni⁰ = [Ar] 3d⁸ 4s². (Statement 1 is correct)\n\nStep 2: Carbon monoxide is a strong π-acid ligand that forces the two 4s electrons into the 3d orbitals to give a closed 3d¹⁰ configuration. The empty 4s and 4p orbitals undergo sp³ hybridization to form a regular tetrahedral geometry. (Statement 2 is correct)\n\nStep 3: Since all electrons in the 3d subshell are completely paired, the complex has n = 0 unpaired electrons and is diamagnetic. (Statement 3 is correct)\n\nStep 4: The Ni–C bond is strengthened by synergic bonding involving OC → Ni σ-donation and Ni → CO π-backdonation into empty π* orbitals of CO. (Statement 4 is correct)\n\nStep 5: Therefore, all statements (1), (2), (3), and (4) are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4363,
    data: {
      question: "The chemical conversion of benzenediazonium chloride to chlorobenzene by treatment with cuprous chloride dissolved in hydrochloric acid (Cu₂Cl₂ / HCl):\nC₆H₅N₂⁺Cl⁻ —(Cu₂Cl₂/HCl)→ C₆H₅Cl + N₂ ↑\nis known as the:",
      option_a: "Gattermann reaction",
      option_b: "Sandmeyer reaction",
      option_c: "Wurtz-Fittig reaction",
      option_d: "Etard reaction",
      "correct_option": "B",
      explanation: "Step 1: The Sandmeyer reaction involves the displacement of the diazonium group (-N₂⁺Cl⁻) of an aromatic diazonium salt by halide (-Cl, -Br) or cyanide (-CN) using the corresponding cuprous salt (Cu₂Cl₂, Cu₂Br₂, or CuCN) in aqueous acid.\n\nStep 2: Contrast with Gattermann reaction:\nIf copper powder in HCl/HBr is used instead of cuprous halide, the reaction is known as the Gattermann reaction.\n\nStep 3: Therefore, the reaction using Cu₂Cl₂/HCl is the Sandmeyer reaction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4364,
    data: {
      question: "Which of the following octahedral complexes CANNOT exhibit optical isomerism (is completely optically inactive)?",
      option_a: "[Co(en)₃]³⁺",
      option_b: "cis-[Co(en)₂Cl₂]⁺",
      option_c: "[Co(NH₃)₃Cl₃]",
      option_d: "cis-[Co(en)Cl₂(NH₃)₂]⁺",
      "correct_option": "C",
      explanation: "Step 1: Optical activity requires the absence of improper rotation axes, specifically a plane of symmetry (σ) or a center of inversion (i).\n\nStep 2: Analyze [Co(NH₃)₃Cl₃] ([MA₃B₃] type):\nIt exists as two geometrical isomers: facial (fac) and meridional (mer).\n- The fac-isomer has a threefold axis and three vertical mirror planes passing through the metal and opposite ligands.\n- The mer-isomer has a mirror plane containing the three coplanar meridional ligands.\nSince both fac and mer isomers possess planes of symmetry, neither isomer can exist as non-superimposable mirror images. Hence, [Co(NH₃)₃Cl₃] is strictly optically inactive.\n\nStep 3: In contrast, [Co(en)₃]³⁺ and cis-chelated complexes like cis-[Co(en)₂Cl₂]⁺ lack a plane of symmetry and show optical isomerism.\n\nStep 4: Therefore, [Co(NH₃)₃Cl₃] cannot exhibit optical isomerism.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4365,
    data: {
      question: "In the preparation of a nitrating mixture containing concentrated HNO₃ and concentrated H₂SO₄ for aromatic nitration, which electrophilic active species is generated?",
      option_a: "Nitrite ion, NO₂⁻",
      option_b: "Nitronium ion, NO₂⁺",
      option_c: "Nitrate ion, NO₃⁻",
      option_d: "Nitric oxide, NO",
      "correct_option": "B",
      explanation: "Step 1: Acid-base reaction in nitrating mixture:\nConcentrated sulfuric acid is a stronger acid than nitric acid. It acts as an acid and protonates nitric acid (which acts as a base):\nHNO₃ + 2H₂SO₄ ⇌ H₂O⁺–NO₂ + 2HSO₄⁻ ⇌ NO₂⁺ + H₃O⁺ + 2HSO₄⁻\n\nStep 2: Active electrophile:\nThe nitronium ion (NO₂⁺) is a linear, strongly electrophilic cation that attacks the electron-rich aromatic ring in the rate-determining step of aromatic nitration.\n\nStep 3: Therefore, the active species produced is the nitronium ion, NO₂⁺.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4366,
    data: {
      question: "What is the correct IUPAC name for the coordination compound [Co(NH₃)₅(CO₃)]Cl?",
      option_a: "Pentaamminecarbonatocobalt(II) chloride",
      option_b: "Carbonatopentaamminecobalt(III) chloride",
      option_c: "Pentaamminecarbonatocobalt(III) chloride",
      option_d: "Pentaamminechlorocobalt(III) carbonate",
      "correct_option": "C",
      explanation: "Step 1: Identify ligands in the coordination sphere:\n- NH₃: ammine (5 → pentaammine)\n- CO₃²⁻: carbonato\nArranging alphabetically: pentaammine before carbonato.\n\nStep 2: Determine oxidation state of cobalt (x):\nx + 5(0) + (-2) + (-1) = 0 ⇒ x - 3 = 0 ⇒ x = +3.\nSince the coordination sphere is cationic, cobalt retains its regular name followed by (III): cobalt(III).\n\nStep 3: Counter-ion:\nCl⁻ is named chloride.\n\nStep 4: Putting it together:\nPentaamminecarbonatocobalt(III) chloride.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4367,
    data: {
      question: "Which of the following combinations of isomerisms can be exhibited by the coordination compound [Co(NH₃)₄(NO₂)₂]Cl?",
      option_a: "Linkage, geometrical, and ionization isomerism",
      option_b: "Linkage, optical, and coordination isomerism",
      option_c: "Ionization, optical, and coordination isomerism",
      option_d: "Geometrical and optical isomerism only",
      "correct_option": "A",
      explanation: "Step 1: Linkage isomerism:\nDue to the ambidentate ligand NO₂⁻, which can bind through N (nitro, -NO₂) or through O (nitrito, -ONO).\n\nStep 2: Geometrical isomerism:\nIt has the general formula [MA₄B₂], giving rise to cis and trans geometrical isomers.\n\nStep 3: Ionization isomerism:\nExchange of NO₂⁻ in the coordination sphere with Cl⁻ outside the sphere gives [Co(NH₃)₄(NO₂)Cl]NO₂, an ionization isomer yielding different ions in solution.\n\nStep 4: Therefore, it exhibits linkage, geometrical, and ionization isomerism.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4368,
    data: {
      question: "Which of the following transition metal complexes is INCORRECTLY matched with the hybridization of its central metal atom?\n(1) [Ni(CO)₄] — sp³\n(2) [Ni(CN)₄]²⁻ — sp³\n(3) [CoF₆]³⁻ — d²sp³\n(4) [Fe(CN)₆]³⁻ — d²sp³",
      option_a: "(1) and (4) only",
      option_b: "(2) and (3) only",
      option_c: "(1) and (2) only",
      option_d: "(3) and (4) only",
      "correct_option": "B",
      explanation: "Step 1: Evaluate (1) [Ni(CO)₄]:\nNi⁰ is 3d¹⁰ 4s⁰. Vacant 4s and 4p orbitals hybridize to form sp³ (tetrahedral). MATCH IS CORRECT.\n\nStep 2: Evaluate (2) [Ni(CN)₄]²⁻:\nNi²⁺ is 3d⁸. Strong-field ligand CN⁻ forces pairing, leaving one 3d orbital vacant. Hybridization is dsp² (square planar), NOT sp³. MATCH IS INCORRECT.\n\nStep 3: Evaluate (3) [CoF₆]³⁻:\nCo³⁺ is 3d⁶. Fluoride is a weak-field ligand (Δ_o < P). Outer 4d orbitals are used, giving sp³d² outer-orbital hybridization, NOT d²sp³. MATCH IS INCORRECT.\n\nStep 4: Evaluate (4) [Fe(CN)₆]³⁻:\nFe³⁺ is 3d⁵. Strong-field ligand CN⁻ forces pairing to leave two 3d orbitals vacant, giving d²sp³ inner-orbital hybridization. MATCH IS CORRECT.\n\nStep 5: Therefore, complexes (2) and (3) are incorrectly matched.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4369,
    data: {
      question: "Which of the following derivatives of phenol is a powerful explosive substance known as picric acid?",
      option_a: "2,4-Dinitrophenol",
      option_b: "2,4,6-Trinitrophenol",
      option_c: "o-Nitrophenol",
      option_d: "p-Cresol",
      "correct_option": "B",
      explanation: "Step 1: Preparation of picric acid:\nPhenol is first treated with concentrated H₂SO₄ to form phenolsulfonic acids, followed by reaction with concentrated HNO₃ to yield 2,4,6-trinitrophenol:\nC₆H₅OH + 3HNO₃ —(conc. H₂SO₄)→ C₆H₂(OH)(NO₂)₃ + 3H₂O\n\nStep 2: Explosive properties:\n2,4,6-Trinitrophenol is commercially called picric acid. The presence of three strongly electron-withdrawing nitro groups (-NO₂) dramatically stabilizes the conjugate base (making it strongly acidic, pK_a = 0.38) and provides high chemical energy density, making picric acid and its heavy metal salts shock-sensitive military explosives.\n\nStep 3: Therefore, 2,4,6-trinitrophenol is picric acid.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4370,
    data: {
      question: "What is the coordination number of chromium in the complex [Cr(NH₃)₃(H₂O)₃]Cl₃?",
      option_a: "3",
      option_b: "4",
      option_c: "6",
      option_d: "8",
      "correct_option": "C",
      explanation: "Step 1: Definition of coordination number:\nThe coordination number of a central metal atom/ion in a complex is the total number of ligand donor atoms directly bonded to it.\n\nStep 2: Identify ligands and denticity:\n- NH₃ is a monodentate ligand (3 molecules = 3 donor atoms).\n- H₂O is a monodentate ligand (3 molecules = 3 donor atoms).\n\nStep 3: Total coordination number:\nCoordination number = 3 + 3 = 6.\n\nStep 4: Therefore, the coordination number of chromium is 6.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4371,
    data: {
      question: "When 3-phenylpropane-1,2-diol is heated with concentrated sulfuric acid, it undergoes dehydration and carbocation rearrangement to yield which major carbonyl product?",
      option_a: "Benzyl methyl ketone (1-phenylpropan-2-one)",
      option_b: "3-Phenylpropanal",
      option_c: "Allylbenzene",
      option_d: "Acetophenone",
      "correct_option": "A",
      explanation: "Step 1: Structure of reactant:\nPhCH₂–CH(OH)–CH₂OH (a 1,2-diol / vicinal diol).\n\nStep 2: Mechanism of pinacol-type dehydration:\n- Protonation occurs preferentially at the primary –OH group: PhCH₂–CH(OH)–CH₂OH₂⁺.\n- Loss of H₂O generates a primary carbocation: PhCH₂–CH(OH)–CH₂⁺.\n- A 1,2-hydride shift from C-2 to C-1 produces the resonance-stabilized oxonium ion at C-2: PhCH₂–C⁺(OH)–CH₃.\n- Deprotonation yields benzyl methyl ketone (PhCH₂–CO–CH₃, 1-phenylpropan-2-one).\n\nStep 3: Therefore, benzyl methyl ketone (1-phenylpropan-2-one) is the major product.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4372,
    data: {
      question: "Electrophilic aromatic substitution reactions (such as bromination, nitration, and sulfonation) occur much faster in phenol than in benzene because:",
      option_a: "The -OH group exerts a powerful electron-withdrawing -I effect",
      option_b: "The lone pair of electrons on the oxygen atom strongly activates the aromatic ring through resonance (+M effect), increasing electron density particularly at ortho and para positions",
      option_c: "Phenol is less soluble in polar solvents than benzene",
      option_d: "The hydroxyl hydrogen acts as an electrophile",
      "correct_option": "B",
      explanation: "Step 1: Electronic effect of the -OH group:\nIn phenol, the non-bonding electron pairs on the oxygen atom overlap with the π-orbitals of the aromatic ring.\n\nStep 2: Resonance stabilization:\nThrough resonance (+M effect), electron density is delocalized into the ring, creating partial negative charges at the ortho and para carbons. This stabilizes the arenium ion (Wheland / σ-complex) formed during electrophilic attack, lowering the activation energy.\n\nStep 3: Reaction rate:\nConsequently, electrophilic aromatic substitution is several orders of magnitude faster in phenol than in unactivated benzene.\n\nStep 4: Therefore, the +M resonance activation by the -OH group is responsible.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4373,
    data: {
      question: "The spin-only magnetic moment of the complex ion [Ag(CN)₂]⁻ is zero (μ = 0 BM). How many unpaired electrons are present in the valence shell of silver in this ion?",
      option_a: "Zero",
      option_b: "1",
      option_c: "2",
      option_d: "3",
      "correct_option": "A",
      explanation: "Step 1: Formula for spin-only magnetic moment:\nμ_s = √[n(n + 2)] BM, where n is the number of unpaired electrons.\n\nStep 2: Given μ_s = 0 BM:\n√[n(n + 2)] = 0 ⇒ n = 0.\n\nStep 3: Verification with electronic configuration:\nIn [Ag(CN)₂]⁻, silver is in the +1 oxidation state.\nAg⁺ has the ground state configuration [Kr] 4d¹⁰ 5s⁰.\nSince the 4d subshell is completely filled with 10 paired electrons, there are ZERO unpaired electrons, making it completely diamagnetic.\n\nStep 4: Therefore, the number of unpaired electrons is zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4374,
    data: {
      question: "Which metal ion is coordinated at the center of the porphyrin (chlorin) ring in the photosynthetic pigment chlorophyll?",
      option_a: "Calcium, Ca²⁺",
      option_b: "Magnesium, Mg²⁺",
      option_c: "Iron, Fe²⁺",
      option_d: "Zinc, Zn²⁺",
      "correct_option": "B",
      explanation: "Step 1: Structure of chlorophyll:\nChlorophyll is a green magnesium porphyrin coordination complex essential for photosynthesis in plants and algae.\n\nStep 2: Metal coordination:\nThe central metal atom is Magnesium(II), Mg²⁺, which is coordinated to the four pyrrole nitrogen atoms of a modified tetrapyrrole ring called a chlorin ring.\n\nStep 3: Biological role:\nThe Mg²⁺ center maintains the planarity and electronic characteristics of the macrocycle, allowing efficient absorption of blue and red light for energy transduction.\n\nStep 4: Therefore, Magnesium (Mg) is the central atom in chlorophyll.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4375,
    data: {
      question: "According to Werner's coordination theory, which of the following statements is INCORRECT regarding K₃[Fe(CN)₆]?",
      option_a: "The secondary valency of iron is 6 and is satisfied by six cyanide ligands",
      option_b: "The cyanide ligands satisfy only the secondary valency, while the primary valency is satisfied by potassium ions",
      option_c: "The cyanide ligands simultaneously satisfy BOTH primary and secondary valencies of iron",
      option_d: "The complex anion [Fe(CN)₆]³⁻ does not ionize in water to yield free Fe³⁺ or CN⁻ ions",
      "correct_option": "C",
      explanation: "Step 1: Werner's formulations for K₃[Fe(CN)₆]:\n- Primary valency corresponds to the oxidation state of Fe (+3). In the neutral salt K₃[Fe(CN)₆], the positive charge of the central metal is balanced by the three outer K⁺ counter-ions (via the complex entity as a whole), while the cyanide ions are within the coordination sphere.\n- Secondary valency corresponds to the coordination number (6) and is satisfied by the six CN⁻ ligands.\n\nStep 2: Stating that CN⁻ satisfies both primary and secondary valencies is typical of neutral complexes like [Co(NH₃)₃Cl₃] where Cl⁻ acts as both a ligand and charge-balancer. In K₃[Fe(CN)₆], the six CN⁻ ligands provide the coordination sphere (secondary valency).\n\nStep 3: Therefore, statement (C) is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4376,
    data: {
      question: "What is the total number of open-chain alkene isomers (including stereoisomers) having the molecular formula C₄H₈?",
      option_a: "3",
      option_b: "4",
      option_c: "5",
      option_d: "2",
      "correct_option": "B",
      explanation: "Step 1: Open-chain structural isomers of C₄H₈ alkenes:\n1. But-1-ene: CH₂=CH–CH₂–CH₃ (no geometrical isomerism).\n2. But-2-ene: CH₃–CH=CH–CH₃ (exhibits cis-trans geometrical isomerism):\n   - cis-But-2-ene\n   - trans-But-2-ene\n3. 2-Methylprop-1-ene (isobutene): CH₂=C(CH₃)₂ (no geometrical isomerism).\n\nStep 2: Total count including stereoisomers:\n- But-1-ene (1)\n- cis-But-2-ene (1)\n- trans-But-2-ene (1)\n- 2-Methylprop-1-ene (1)\nTotal = 1 + 1 + 1 + 1 = 4 isomers.\n\nStep 3: Therefore, the total number of open-chain alkene isomers is 4.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4377,
    data: {
      question: "Which of the following statements is INCORRECT regarding classification of organic compounds?",
      option_a: "Open-chain organic compounds are called aliphatic compounds",
      option_b: "Unsaturated hydrocarbons contain at least one carbon–carbon double or triple bond",
      option_c: "Saturated open-chain hydrocarbons are called alkenes",
      option_d: "Cyclic compounds with delocalized (4n + 2) π-electrons are called aromatic compounds",
      "correct_option": "C",
      explanation: "Step 1: Definition of saturated hydrocarbons:\nSaturated hydrocarbons are compounds containing only carbon–carbon single bonds (C–C σ-bonds) with the general formula CₙH₂ₙ₊₂. They are called ALKANES (or paraffins).\n\nStep 2: Definition of alkenes:\nAlkenes (olefins) are UNSATURATED hydrocarbons containing at least one carbon–carbon double bond (C=C) with the general formula CₙH₂ₙ.\n\nStep 3: Hence, the statement that saturated hydrocarbons are called alkenes is factually incorrect.\n\nStep 4: Therefore, Option (C) is the incorrect statement.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4378,
    data: {
      question: "According to Werner's coordination theory, which of the following statements is TRUE?",
      option_a: "Primary valencies are ionizable, while secondary valencies are non-ionizable",
      option_b: "Secondary valencies are ionizable, while primary valencies are non-ionizable",
      option_c: "Both primary and secondary valencies are ionizable",
      option_d: "Both primary and secondary valencies are non-ionizable",
      "correct_option": "A",
      explanation: "Step 1: Postulates of Werner's Theory:\n1. Most metals exhibit two types of valency: primary valency and secondary valency.\n2. Primary valencies are ionizable in aqueous solution, correspond to the oxidation state, and are satisfied by negative ions.\n3. Secondary valencies are non-ionizable, correspond to the coordination number, and are satisfied by neutral molecules or anions oriented towards fixed positions in space.\n\nStep 2: Therefore, primary valencies are ionizable and secondary valencies are non-ionizable.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4379,
    data: {
      question: "Which of the following transition metal carbonyl or cyanide complexes is PARAMAGNETIC?\n(Atomic numbers: Cr = 24, Fe = 26)",
      option_a: "[Cr(CO)₆]",
      option_b: "[Fe(CO)₅]",
      option_c: "[Fe(CN)₆]⁴⁻",
      option_d: "[Cr(NH₃)₆]³⁺",
      "correct_option": "D",
      explanation: "Step 1: Analyze [Cr(CO)₆]:\nCr⁰ is 3d⁶. Strong-field ligand CO forces complete pairing into the lower t₂g orbitals: (t₂g)⁶ (e_g)⁰. Unpaired electrons n = 0 → DIAMAGNETIC.\n\nStep 2: Analyze [Fe(CO)₅]:\nFe⁰ is 3d⁸. Strong-field CO causes pairing and dsp³ hybridization. All electrons are paired (n = 0) → DIAMAGNETIC.\n\nStep 3: Analyze [Fe(CN)₆]⁴⁻:\nFe²⁺ is 3d⁶. Strong-field CN⁻ forces complete pairing: (t₂g)⁶ (e_g)⁰ (n = 0) → DIAMAGNETIC.\n\nStep 4: Analyze [Cr(NH₃)₆]³⁺:\nCr³⁺ is 3d³. The three electrons occupy the three degenerate t₂g orbitals with parallel spins according to Hund's rule: (t₂g)³ (e_g)⁰.\nThere are n = 3 unpaired electrons → PARAMAGNETIC (μ_s ≈ 3.87 BM).\n\nStep 5: Therefore, [Cr(NH₃)₆]³⁺ is paramagnetic.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4380,
    data: {
      question: "Which of the following coordination compounds can exist as a pair of non-superimposable mirror-image enantiomers (enantiomorphs)?",
      option_a: "cis-[Co(en)₂Cl₂]Cl",
      option_b: "trans-[Co(en)₂Cl₂]Cl",
      option_c: "[Cr(NH₃)₆][Co(CN)₆]",
      option_d: "[Co(NH₃)₄Cl₂]NO₂",
      "correct_option": "A",
      explanation: "Step 1: Optical isomerism (enantiomorphism) in coordination compounds requires molecular chirality, meaning the complex must lack an alternating axis of symmetry (specifically a mirror plane or center of inversion).\n\nStep 2: Analyze cis-[Co(en)₂Cl₂]⁺:\nThe two bidentate ethylenediamine rings are perpendicular to each other, and the two Cl⁻ ligands are at 90°. It lacks any plane of symmetry or center of inversion (point group C₂). Consequently, its mirror image cannot be superimposed upon it, existing as a pair of dextro (d) and laevo (l) enantiomers.\n\nStep 3: Analyze the other options:\n- trans-[Co(en)₂Cl₂]⁺ has an inversion center and mirror planes → achiral (optically inactive).\n- [Cr(NH₃)₆][Co(CN)₆] and [Co(NH₃)₄Cl₂]NO₂ possess high symmetry with mirror planes → achiral.\n\nStep 4: Therefore, cis-[Co(en)₂Cl₂]Cl gives a pair of enantiomers.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4381,
    data: {
      question: "What is the relationship between crystal field splitting in a tetrahedral field (Δ_t) and in an octahedral field (Δ_o) for the same metal ion and ligands with identical metal–ligand distances?",
      option_a: "Δ_t = 2 Δ_o",
      option_b: "4 Δ_o = 9 Δ_t (or Δ_t = (4/9) Δ_o)",
      option_c: "9 Δ_o = 4 Δ_t",
      option_d: "Δ_t = Δ_o",
      "correct_option": "B",
      explanation: "Step 1: Comparison of tetrahedral and octahedral crystal fields:\nThere are two main reasons why crystal field splitting in tetrahedral complexes is smaller than in octahedral complexes:\n1. There are only 4 ligands in a tetrahedral complex compared to 6 in an octahedral complex (contributing a factor of 4/6 = 2/3).\n2. In a tetrahedron, the ligands do not point directly along any of the metal d-orbitals, reducing the electrostatic repulsion by another geometric factor of 2/3.\n\nStep 2: Mathematical relationship:\nCombining both factors:\nΔ_t = (2/3) × (2/3) × Δ_o = (4/9) Δ_o\nMultiplying both sides by 9 gives:\n9 Δ_t = 4 Δ_o (or 4 Δ_o = 9 Δ_t).\n\nStep 3: Therefore, 4 Δ_o = 9 Δ_t is the correct relationship.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4382,
    data: {
      question: "According to IUPAC 2005 recommendations, what is the systematic name of the coordination compound [Cu(NH₃)₄](NO₃)₂?",
      option_a: "Cuprammonium nitrate",
      option_b: "Tetraamminecopper(II) dinitrate",
      option_c: "Tetraamminecopper(II) nitrate",
      option_d: "Tetraamminecopper(I) nitrate",
      "correct_option": "C",
      explanation: "Step 1: Identify and name ligands:\nThe coordination entity is [Cu(NH₃)₄]²⁺ containing 4 ammonia ligands.\nNH₃ is named 'ammine', and 4 ammines is named 'tetraammine'.\n\nStep 2: Identify central metal and oxidation state:\nLet oxidation state of Cu be x:\nx + 4(0) + 2(-1) = 0 ⇒ x = +2.\nSince the complex is cationic, copper retains its regular name: copper(II).\n\nStep 3: Name the counter-ion:\nNO₃⁻ is named 'nitrate' (the prefix 'di-' is not used for simple counter-ions outside brackets).\n\nStep 4: Putting it together:\nTetraamminecopper(II) nitrate.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 72 Part 3 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 72 Part 3 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
