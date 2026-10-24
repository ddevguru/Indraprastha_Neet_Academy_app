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
    id: 4308,
    data: {
      question: "Given below are two statements regarding the brown ring complex [Fe(H₂O)₅(NO)]SO₄:\nStatement-I: The brown ring complex [Fe(H₂O)₅(NO)]SO₄ is paramagnetic in nature with a magnetic moment of approximately 3.87 BM.\nStatement-II: In the complex [Fe(H₂O)₅(NO)]SO₄, iron exists in the +1 oxidation state (3d⁷) and has three unpaired electrons.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Electronic state of iron in the brown ring complex:\nIn [Fe(H₂O)₅(NO)]SO₄, charge transfer from NO to Fe²⁺ occurs, forming Fe⁺ (iron in +1 oxidation state) and nitrosonium ion (NO⁺):\nFe⁺ has the electronic configuration [Ar] 3d⁷.\n\nStep 2: Spin state and unpaired electrons:\nWater is a weak field ligand, so the 3d⁷ configuration has 3 unpaired electrons (t₂g⁵ e_g²).\nNumber of unpaired electrons n = 3.\n\nStep 3: Magnetic moment:\nμ_s = √[n(n + 2)] = √[3(5)] = √15 ≈ 3.87 BM.\nHence, the complex is strongly paramagnetic. Statement-I is correct, and Statement-II is correct.\n\nStep 4: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4309,
    data: {
      question: "Given below are two statements regarding the octahedral complex [M(NH₃)₄Cl₂]:\nStatement-I: Both the cis and trans geometrical isomers of [M(NH₃)₄Cl₂] are optically inactive.\nStatement-II: The cis-isomer possesses a plane of symmetry, whereas the trans-isomer has a center of inversion.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Structure of [M(NH₃)₄Cl₂] (MA₄B₂ type):\nThis complex exhibits two geometrical isomers: cis-[M(NH₃)₄Cl₂] and trans-[M(NH₃)₄Cl₂].\n\nStep 2: Symmetry elements:\n- In the cis-isomer, the two Cl⁻ ligands occupy adjacent positions (90° apart). It possesses a vertical plane of symmetry bisecting the Cl–M–Cl angle.\n- In the trans-isomer, the two Cl⁻ ligands occupy mutually opposite axial positions (180° apart). It possesses a center of inversion (center of symmetry) at the metal center, as well as multiple mirror planes.\n\nStep 3: Optical activity:\nA molecule that possesses an improper axis of rotation (including a plane of symmetry σ or a center of inversion i) cannot exist as non-superimposable mirror images (enantiomers) and is strictly achiral and optically inactive.\nThus, both Statement-I and Statement-II are correct.\n\nStep 4: Therefore, Option (A) is the correct answer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4310,
    data: {
      question: "Given below are two statements:\nStatement-I: Both [Cr(H₂O)₆]²⁺ and [Fe(H₂O)₆]²⁺ behave as strong oxidizing agents in aqueous solution.\nStatement-II: The hexacyanoferrate(II) ion, [Fe(CN)₆]⁴⁻, is an outer-orbital complex with sp³d² hybridization.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "C",
      explanation: "Step 1: Evaluate Statement-I:\n- In [Cr(H₂O)₆]²⁺, chromium is in +2 oxidation state (3d⁴). It readily loses an electron to form Cr³⁺ (3d³), which has a highly stable half-filled (t₂g)³ configuration. Thus, [Cr(H₂O)₆]²⁺ is a powerful REDUCING agent (E° for Cr³⁺/Cr²⁺ = -0.41 V), NOT an oxidizing agent.\n- Similarly, Fe²⁺ is readily oxidized to Fe³⁺, making Statement-I incorrect.\n\nStep 2: Evaluate Statement-II:\nIn [Fe(CN)₆]⁴⁻, iron is in +2 oxidation state (3d⁶). The cyanide ion (CN⁻) is a strong-field ligand that forces pairing of all six 3d electrons into the three t₂g orbitals: (t₂g)⁶ (e_g)⁰.\nThis leaves two vacant 3d orbitals, resulting in d²sp³ inner-orbital hybridization (low spin, diamagnetic), NOT outer-orbital sp³d². Thus, Statement-II is incorrect.\n\nStep 3: Therefore, both Statement-I and Statement-II are incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4311,
    data: {
      question: "Given below are two statements:\nStatement-I: Cis-platin, cis-[Pt(NH₃)₂Cl₂], is clinically used as an effective anticancer drug for the treatment of solid tumors.\nStatement-II: The calcium-disodium salt of EDTA (CaNa₂-EDTA) is utilized as a chelating antidote for the treatment of lead poisoning.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Medical application of Cis-platin:\nCis-diamminedichloroplatinum(II), known as cis-platin, coordinates to DNA purine bases (specifically guanine-N7) causing intrastrand crosslinks, which inhibits DNA replication in cancer cells and triggers apoptosis. Statement-I is correct.\n\nStep 2: Medical application of EDTA:\nEDTA is a hexadentate chelating ligand. Administering CaNa₂-EDTA treats acute lead poisoning because Pb²⁺ replaces Ca²⁺ to form a far more stable, water-soluble, non-toxic lead-EDTA chelate ([Pb(EDTA)]²⁻, log K_f ≈ 18), which is safely excreted in the urine without depleting body calcium. Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4312,
    data: {
      question: "Given below are two statements:\nStatement-I: In metal carbonyls, synergistic bonding involves σ-donation from the carbon lone pair to the metal and π-backdonation from filled metal d-orbitals into empty π* antibonding orbitals of CO, which strengthens the M–C bond.\nStatement-II: Transition metal complexes having d⁰ and d¹⁰ configurations exhibit intense visible colors arising from d–d electronic transitions.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "B",
      explanation: "Step 1: Evaluate Statement-I:\nIn metal carbonyls, CO donates its lone pair into a vacant metal hybrid orbital (M ← C σ-bond), while filled metal d-orbitals donate electron density into the vacant π* antibonding molecular orbitals of CO (M → C π-backbond). This synergic effect strengthens the M–C bond while weakening the C–O bond. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nA d–d transition requires the promotion of an electron from a lower d-orbital (e.g., t₂g) to a higher d-orbital (e.g., e_g). In a d⁰ system there are no d-electrons to excite, and in a d¹⁰ system all d-orbitals are completely filled so no vacancy exists for excitation. Hence, d⁰ and d¹⁰ complexes cannot undergo d–d transitions and are typically colorless unless charge-transfer occurs. Statement-II is incorrect.\n\nStep 3: Therefore, Statement-I is correct but Statement-II is incorrect.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4313,
    data: {
      question: "According to Werner's coordination theory, which of the following statements correctly distinguishes primary valency from secondary valency?",
      option_a: "Primary valency is ionizable and corresponds to the oxidation state of the metal, while secondary valency is non-ionizable and corresponds to the coordination number",
      option_b: "Both primary and secondary valencies are non-ionizable and non-directional",
      option_c: "Primary valency is non-ionizable and directional, while secondary valency is ionizable and non-directional",
      option_d: "Secondary valency is ionizable and satisfied exclusively by anions",
      "correct_option": "A",
      explanation: "Step 1: Werner's Theory of Coordination Compounds establishes two types of valencies for metal atoms:\n\n1. Primary Valency:\n- It corresponds to the oxidation state of the central metal atom.\n- It is ionizable in aqueous solution.\n- It is satisfied exclusively by negative ions (anions).\n- It is non-directional in space.\n\n2. Secondary Valency:\n- It corresponds to the coordination number of the central metal atom.\n- It is non-ionizable.\n- It is satisfied by neutral molecules or anions (ligands).\n- It is directional, dictating the definite stereochemical geometry of the complex.\n\nStep 2: Therefore, primary valency is ionizable (oxidation state) and secondary valency is non-ionizable (coordination number).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4314,
    data: {
      question: "Given below are two statements:\nStatement-I: Valence Bond Theory (VBT) fails to provide a quantitative explanation for the electronic absorption spectra (colors) of coordination complexes.\nStatement-II: Crystal Field Theory (CFT) treats the metal-ligand bond as purely ionic, considering ligands as point charges or point dipoles.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nValence Bond Theory considers metal-ligand bonding via hybridization and overlaps, but it does not split the d-orbitals. Consequently, it cannot interpret the electronic absorption bands, wavelengths of light absorbed, or colors of coordination compounds. This is one of the major limitations of VBT. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nCrystal Field Theory is an electrostatic model that regards the interaction between the metal ion and the ligands as purely electrostatic (ionic). Ligands are treated as negative point charges (anions) or point dipoles (neutral molecules like H₂O, NH₃). Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4315,
    data: {
      question: "Given below are two statements:\nStatement-I: For d⁴ to d⁷ transition metal complexes, low-spin complexes formed with strong-field ligands are thermodynamically more stable than high-spin complexes due to larger crystal field stabilization energy (CFSE).\nStatement-II: The characteristic crimson-red color of natural ruby is due to the presence of ~0.5–1% Cr³⁺ (3d³) ions occupying octahedral sites in the Al₂O₃ mineral matrix.\nIn the light of the above statements, choose the correct answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nFor d⁴, d⁵, d⁶, and d⁷ configurations in an octahedral field, strong-field ligands cause Δ_o > P (crystal field splitting exceeds pairing energy), forcing electrons to pair in the lower t₂g orbitals. The resulting crystal field stabilization energy (CFSE) is significantly larger (more negative), imparting greater thermodynamic stability to low-spin complexes compared to high-spin complexes. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nRuby is corundum (aluminium oxide, Al₂O₃) where a small fraction (~0.5–1%) of Al³⁺ ions is isomorphously replaced by Cr³⁺ ions (3d³). The Cr³⁺ ions reside in distorted octahedral coordination environments of oxide ions, and d–d transitions (⁴A₂g → ⁴T₂g and ⁴A₂g → ⁴T₁g) absorb yellow-green light, transmitting red light that gives ruby its vivid color. Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4316,
    data: {
      question: "Given below are two statements regarding dimanganese decacarbonyl, Mn₂(CO)₁₀:\nStatement-I: The molecule Mn₂(CO)₁₀ consists of two square-pyramidal [Mn(CO)₅] units joined together by a single Mn–Mn bond.\nStatement-II: In metal carbonyls, the zero oxidation state of the transition metal is stabilized by the π-acceptor nature of the carbon monoxide ligand.\nIn the light of the above statements, choose the most appropriate answer:",
      option_a: "Both Statement-I and Statement-II are correct",
      option_b: "Statement-I is correct but Statement-II is incorrect",
      option_c: "Both Statement-I and Statement-II are incorrect",
      option_d: "Statement-I is incorrect but Statement-II is correct",
      "correct_option": "A",
      explanation: "Step 1: Evaluate Statement-I:\nDimanganese decacarbonyl, Mn₂(CO)₁₀, contains no bridging CO ligands. It consists of two octahedral-like square pyramidal [Mn(CO)₅] fragments connected by a direct Mn–Mn single bond (bond length ~2.92 Å) in a staggered conformation. Statement-I is correct.\n\nStep 2: Evaluate Statement-II:\nIn neutral binary metal carbonyls like Ni(CO)₄, Fe(CO)₅, and Mn₂(CO)₁₀, the metals are in zero oxidation state. CO acts as a strong π-acid (π-acceptor) ligand, withdrawing excess negative charge from the metal via M → CO π-backbonding. This delocalization prevents the accumulation of unfavorable electron density on the zero-valent metal, stabilizing the low oxidation state. Statement-II is correct.\n\nStep 3: Therefore, both Statement-I and Statement-II are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4317,
    data: {
      question: "Which of the following chelating agents is clinically used to remove excess copper in patients suffering from Wilson's disease?",
      option_a: "D-Penicillamine",
      option_b: "Desferrioxamine B",
      option_c: "Dimercaprol (BAL)",
      option_d: "Cis-platin",
      "correct_option": "A",
      explanation: "Step 1: Wilson's disease is an autosomal recessive genetic disorder of copper metabolism that leads to toxic accumulation of copper in the liver, brain, and cornea.\n\nStep 2: D-Penicillamine (3-mercapto-D-valine) is a potent bidentate/tridentate chelating agent containing amino, carboxyl, and thiol (-SH) donor groups that selectively binds copper(II) ions.\n\nStep 3: The resulting water-soluble copper-penicillamine chelate is excreted harmlessly by the kidneys in urine.\n\nStep 4: (Desferrioxamine B is used for iron overload; dimercaprol is used for arsenic/mercury; cis-platin is an antitumor agent).\n\nStep 5: Therefore, D-Penicillamine is used for Wilson's disease.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4318,
    data: {
      question: "Assertion (A): Ethylenediaminetetraacetate (EDTA⁴⁻) forms exceptionally stable 1:1 coordination complexes with most divalent metal cations (M²⁺).\nReason (R): EDTA⁴⁻ is a hexadentate chelating ligand possessing two tertiary nitrogen donor atoms and four carboxylate oxygen donor atoms, which wrap around the metal to form five stable chelate rings.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Denticity of EDTA⁴⁻:\nEDTA⁴⁻ has 6 potential donor atoms: 2 amine nitrogen atoms and 4 carboxylate oxygen atoms. It acts as a hexadentate ligand.\n\nStep 2: Chelate effect and stoichiometry:\nWhen EDTA⁴⁻ binds to a hexacoordinated metal ion M²⁺, all six donor atoms simultaneously coordinate to the single central metal cation, forming a 1:1 complex [M(EDTA)]²⁻.\nThis coordination creates five interconnected five-membered chelate rings, yielding an enormous increase in entropy (ΔS > 0) and thermodynamic stability known as the chelate effect.\n\nStep 3: Therefore, both (A) and (R) are true and (R) correctly explains (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4319,
    data: {
      question: "Assertion (A): The absorption wavelengths (λ_max) of light in the visible region for nickel(II) complexes follow the order:\n[Ni(NO₂)₆]⁴⁻ < [Ni(NH₃)₆]²⁺ < [Ni(H₂O)₆]²⁺\nReason (R): Absorption wavelength is inversely proportional to the crystal field splitting energy (Δ_o), and the spectrochemical series gives ligand field strength: NO₂⁻ > NH₃ > H₂O.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Relationship between crystal field splitting and absorption wavelength:\nThe energy of light absorbed in a d–d electronic transition is directly equal to the crystal field splitting parameter:\nΔ_o = hν = hc / λ\nTherefore, λ = hc / Δ_o, meaning that absorption wavelength is inversely proportional to crystal field splitting (λ ∝ 1/Δ_o).\n\nStep 2: Spectrochemical series of ligands:\nThe order of field strength of the ligands is: NO₂⁻ > NH₃ > H₂O.\nConsequently, the crystal field splitting energies follow the order:\nΔ_o([Ni(NO₂)₆]⁴⁻) > Δ_o([Ni(NH₃)₆]²⁺) > Δ_o([Ni(H₂O)₆]²⁺).\n\nStep 3: Order of absorption wavelengths:\nTaking the reciprocal, the wavelengths of light absorbed follow the order:\nλ([Ni(NO₂)₆]⁴⁻) < λ([Ni(NH₃)₆]²⁺) < λ([Ni(H₂O)₆]²⁺).\n\nStep 4: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4320,
    data: {
      question: "Assertion (A): Both aqueous solutions of potassium permanganate (KMnO₄, intense purple) and potassium dichromate (K₂Cr₂O₇, bright orange) are deeply colored.\nReason (R): The intense colors of KMnO₄ and K₂Cr₂O₇ arise from d–d electronic transitions within the central metal ions.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "C",
      explanation: "Step 1: Oxidation state and electronic configuration of central metal ions:\n- In KMnO₄, manganese is in the +7 oxidation state: Mn⁷⁺ has the electronic configuration [Ar] 3d⁰ 4s⁰.\n- In K₂Cr₂O₇, chromium is in the +6 oxidation state: Cr⁶⁺ has the electronic configuration [Ar] 3d⁰ 4s⁰.\n\nStep 2: Possibility of d–d transitions:\nSince both Mn⁷⁺ and Cr⁶⁺ possess completely empty d-orbitals (d⁰), no d-electrons exist to undergo d–d transitions. Hence, Reason (R) is completely FALSE.\n\nStep 3: Origin of intense colors:\nThe vivid colors arise from Laporte-allowed Ligand-to-Metal Charge Transfer (LMCT) transitions, where electron density is temporarily transferred from filled 2p orbitals of oxide ligands (O²⁻) into vacant 3d orbitals of Mn⁷⁺ or Cr⁶⁺.\n\nStep 4: Therefore, (A) is true but (R) is false.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4321,
    data: {
      question: "Assertion (A): Cu²⁺ ions do not form stable cupric iodide (CuI₂) or cupric cyanide (Cu(CN)₂) complexes in aqueous solution.\nReason (R): Cu²⁺ is a relatively strong oxidizing agent that spontaneously oxidizes I⁻ to elemental I₂ and CN⁻ to cyanogen (CN)₂, reducing itself to Cu⁺.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Redox interaction between Cu²⁺ and I⁻:\nWhen iodide ions are added to a Cu²⁺ solution, the standard reduction potential of Cu²⁺/Cu⁺ (+0.15 V, enhanced by precipitation of CuI to +0.86 V) is higher than that of I₂/I⁻ (+0.54 V):\n2Cu²⁺ + 4I⁻ → 2CuI ↓ (white precipitate) + I₂ (brown)\nThus, cupric iodide (CuI₂) decomposes spontaneously into cuprous iodide (CuI) and iodine.\n\nStep 2: Redox interaction between Cu²⁺ and CN⁻:\nSimilarly, cyanide is a reducing agent that reduces Cu²⁺ to Cu⁺ with evolution of cyanogen gas:\n2Cu²⁺ + 10CN⁻ → 2[Cu(CN)₄]³⁻ + (CN)₂ ↑\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4322,
    data: {
      question: "Assertion (A): The coordination compounds [Co(NH₃)₅(NO₂)]Cl₂ (yellow-brown) and [Co(NH₃)₅(ONO)]Cl₂ (red) exhibit different physical and chemical properties, including distinctly different colors.\nReason (R): Nitrite is an ambidentate ligand that can coordinate through nitrogen (-NO₂, nitro) or through oxygen (-ONO, nitrito), giving rise to linkage isomerism.\nChoose the correct option:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "(A) is false but (R) is true",
      "correct_option": "A",
      explanation: "Step 1: Ambidentate ligand and linkage isomerism:\nThe nitrite ion (NO₂⁻) possesses two different donor atoms: nitrogen (with one lone pair) and oxygen (with lone pairs). It can coordinate to the central cobalt ion through N (-NO₂, nitro form) or through O (-ONO, nitrito form).\n\nStep 2: Different ligand field strength and absorption:\nNitrogen is a stronger field ligand than oxygen in the spectrochemical series. Therefore, coordination through nitrogen produces a larger crystal field splitting (Δ_o) than coordination through oxygen.\nBecause Δ_o differs, the two isomers absorb light at different wavelengths in the visible spectrum:\n- [Co(NH₃)₅(NO₂)]²⁺ absorbs in the blue region and appears yellow-brown.\n- [Co(NH₃)₅(ONO)]²⁺ absorbs in the green-blue region and appears red.\n\nStep 3: Therefore, both (A) and (R) are true and (R) is the correct explanation of (A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4323,
    data: {
      question: "Match the coordination complex pair in Column-I with the corresponding type of structural isomerism in Column-II:\nColumn-I:\n(1) [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄\n(2) [Co(NH₃)₅(NO₂)]Cl₂ and [Co(NH₃)₅(ONO)]Cl₂\n(3) [Cr(H₂O)₆]Cl₃ and [Cr(H₂O)₅Cl]Cl₂·H₂O\n(4) [Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]\nColumn-II:\n(a) Linkage isomerism\n(b) Coordination isomerism\n(c) Ionization isomerism\n(d) Hydrate (Solvate) isomerism",
      option_a: "1-c, 2-a, 3-d, 4-b",
      option_b: "1-c, 2-d, 3-b, 4-a",
      option_c: "1-a, 2-c, 3-d, 4-b",
      option_d: "1-d, 2-a, 3-c, 4-b",
      "correct_option": "A",
      explanation: "Step 1: Match each pair:\n- (1) [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄:\nExchange of sulfate and bromide between the coordination sphere and ionization sphere gives different ions in aqueous solution → Ionization isomerism (c).\n- (2) [Co(NH₃)₅(NO₂)]Cl₂ and [Co(NH₃)₅(ONO)]Cl₂:\nAmbidentate ligand NO₂⁻ coordinates through N in one and O in the other → Linkage isomerism (a).\n- (3) [Cr(H₂O)₆]Cl₃ and [Cr(H₂O)₅Cl]Cl₂·H₂O:\nDifference in the number of water molecules inside the coordination sphere versus water of crystallization → Hydrate (Solvate) isomerism (d).\n- (4) [Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]:\nInterchange of ligands between cationic and anionic coordination spheres → Coordination isomerism (b).\n\nStep 2: Correct matching code: 1-c, 2-a, 3-d, 4-b.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4324,
    data: {
      question: "Which of the following square planar complexes can exhibit geometrical isomerism (cis-trans isomerism)?",
      option_a: "[Pt(NH₃)₄]²⁺",
      option_b: "[Pt(NH₃)₂Cl₂]",
      option_c: "[Pt(NH₃)Cl₃]⁻",
      option_d: "[PtCl₄]²⁻",
      "correct_option": "B",
      explanation: "Step 1: Conditions for geometrical isomerism in four-coordinate square planar complexes:\n- Complexes of the type [MA₄], [MA₃B], and [MB₄] have all identical relative spatial angles (90° between any adjacent ligand and 180° between trans pairs), so they do not show cis-trans isomerism.\n- Complexes of the type [MA₂B₂], [MA₂BC], and [MABCD] exhibit geometrical isomerism because two identical or different ligands can be positioned adjacent (cis, 90°) or opposite (trans, 180°) to each other.\n\nStep 2: Analyze [Pt(NH₃)₂Cl₂]:\nThis is an [MA₂B₂] square planar complex. It exists as:\n- cis-[Pt(NH₃)₂Cl₂] (the two Cl⁻ ligands at 90°)\n- trans-[Pt(NH₃)₂Cl₂] (the two Cl⁻ ligands at 180°).\n\nStep 3: Therefore, [Pt(NH₃)₂Cl₂] exhibits geometrical isomerism.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4325,
    data: {
      question: "Match the complex ion in Column-I with its spin-only magnetic moment in Column-II:\nColumn-I:\n(1) [Fe(CN)₆]³⁻\n(2) [Fe(H₂O)₆]³⁺\n(3) [Fe(H₂O)₆]²⁺\n(4) [Fe(CN)₆]⁴⁻\nColumn-II:\n(a) 5.92 BM\n(b) 4.90 BM\n(c) 0.00 BM\n(d) 1.73 BM",
      option_a: "1-d, 2-a, 3-b, 4-c",
      option_b: "1-d, 2-b, 3-a, 4-c",
      option_c: "1-a, 2-d, 3-b, 4-c",
      option_d: "1-b, 2-a, 3-d, 4-c",
      "correct_option": "A",
      explanation: "Step 1: Calculate unpaired electrons (n) and magnetic moment μ = √[n(n+2)] BM for each complex:\n\n1. [Fe(CN)₆]³⁻:\nFe³⁺ is 3d⁵. CN⁻ is a strong field ligand → low spin (t₂g)⁵ (e_g)⁰.\nUnpaired electrons n = 1 → μ = √[1(3)] = √3 ≈ 1.73 BM (d).\n\n2. [Fe(H₂O)₆]³⁺:\nFe³⁺ is 3d⁵. H₂O is a weak field ligand → high spin (t₂g)³ (e_g)².\nUnpaired electrons n = 5 → μ = √[5(7)] = √35 ≈ 5.92 BM (a).\n\n3. [Fe(H₂O)₆]²⁺:\nFe²⁺ is 3d⁶. H₂O is a weak field ligand → high spin (t₂g)⁴ (e_g)².\nUnpaired electrons n = 4 → μ = √[4(6)] = √24 ≈ 4.90 BM (b).\n\n4. [Fe(CN)₆]⁴⁻:\nFe²⁺ is 3d⁶. CN⁻ is a strong field ligand → low spin (t₂g)⁶ (e_g)⁰.\nUnpaired electrons n = 0 → μ = 0.00 BM (diamagnetic) (c).\n\nStep 2: Matching code: 1-d, 2-a, 3-b, 4-c.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4326,
    data: {
      question: "Which of the following coordination complexes is TETRAHEDRAL in shape?",
      option_a: "[Ni(CN)₄]²⁻",
      option_b: "[PtCl₄]²⁻",
      option_c: "[Ni(CO)₄]",
      option_d: "[PdCl₄]²⁻",
      "correct_option": "C",
      explanation: "Step 1: Analyze [Ni(CO)₄]:\nNickel is in zero oxidation state: Ni⁰ = [Ar] 3d⁸ 4s².\nCO is a very strong field ligand that forces the two 4s electrons into the 3d subshell, fully pairing the d-electrons: 3d¹⁰.\nThe empty 4s and three 4p orbitals hybridize to form sp³ hybrid orbitals, giving a regular tetrahedral geometry (diamagnetic).\n\nStep 2: Analyze the other complexes:\n- [Ni(CN)₄]²⁻: Ni²⁺ (3d⁸) with strong field CN⁻ forms dsp² hybrid orbitals → square planar.\n- [PtCl₄]²⁻ and [PdCl₄]²⁻: 4d and 5d transition metals have very large crystal field splitting, causing virtually all four-coordinate d⁸ complexes of Pt(II) and Pd(II) to be square planar (dsp²).\n\nStep 3: Therefore, [Ni(CO)₄] is tetrahedral.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4327,
    data: {
      question: "What is the coordination number and the oxidation state of the central cobalt atom in the complex potassium tris(oxalato)cobaltate(III), K₃[Co(C₂O₄)₃]?",
      option_a: "Coordination number = 3, Oxidation state = +3",
      option_b: "Coordination number = 6, Oxidation state = +3",
      option_c: "Coordination number = 6, Oxidation state = +2",
      option_d: "Coordination number = 4, Oxidation state = +3",
      "correct_option": "B",
      explanation: "Step 1: Calculate the oxidation state of Cobalt (x):\nIn K₃[Co(C₂O₄)₃], the complex anion is [Co(C₂O₄)₃]³⁻.\nEach potassium ion has a charge of +1 (3 × (+1) = +3).\nEach oxalate ion (C₂O₄²⁻, ox) has a charge of -2.\nx + 3(-2) = -3\nx - 6 = -3\nx = +3.\nThus, the oxidation state of cobalt is +3.\n\nStep 2: Determine the coordination number:\nThe coordination number is the total number of ligand donor atoms bonded directly to the metal center.\nOxalate is a bidentate ligand, donating 2 electron pairs per ligand.\nFor 3 oxalate ligands:\nCoordination number = 3 × 2 = 6.\n\nStep 3: Therefore, the coordination number is 6 and the oxidation state is +3.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4328,
    data: {
      question: "According to IUPAC 2005 nomenclature rules, what is the correct systematic name for the coordination compound [Co(NH₃)₄(H₂O)Cl]Cl₂?",
      option_a: "Tetraamminechloroaquacobalt(III) chloride",
      option_b: "Tetraammineaquachloridocobalt(III) chloride",
      option_c: "Aquachloridotetraamminecobalt(II) chloride",
      option_d: "Tetraamminedichlorocobalt(III) hydrate",
      "correct_option": "B",
      explanation: "Step 1: Identify ligands and order alphabetically:\n- NH₃: ammine\n- H₂O: aqua\n- Cl⁻: chlorido\nAlphabetical order: ammine (four → tetraammine) before aqua before chlorido.\n\nStep 2: Identify central metal and oxidation state:\nLet oxidation state of Co be x:\nx + 4(0) + 0 + (-1) + 2(-1) = 0\nx - 3 = 0 ⇒ x = +3.\nSince the complex cation is positive ([Co(NH₃)₄(H₂O)Cl]²⁺), the metal is named as 'cobalt' followed by its oxidation state in Roman numerals in parentheses: cobalt(III).\n\nStep 3: Anion outside coordination sphere:\nCl⁻ is named as 'chloride'.\n\nStep 4: Putting it together:\nTetraammineaquachloridocobalt(III) chloride.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4329,
    data: {
      question: "Which of the following octahedral complexes is diamagnetic and classified as an inner-orbital (low-spin) complex?",
      option_a: "[CoF₆]³⁻",
      option_b: "[Co(NH₃)₆]³⁺",
      option_c: "[FeF₆]³⁻",
      option_d: "[Ni(H₂O)₆]²⁺",
      "correct_option": "B",
      explanation: "Step 1: Analyze [Co(NH₃)₆]³⁺:\nCobalt is in the +3 oxidation state (3d⁶). NH₃ acts as a strong field ligand for Co³⁺.\nThe crystal field splitting Δ_o exceeds the pairing energy P (Δ_o > P).\nAll 6 electrons in the 3d subshell pair up completely in the three lower t₂g orbitals:\nElectronic configuration = (t₂g)⁶ (e_g)⁰.\n\nStep 2: Hybridization and magnetic property:\nTwo 3d orbitals, one 4s orbital, and three 4p orbitals hybridize to form d²sp³ hybrid orbitals (inner-orbital complex).\nSince all electrons are paired (n = 0), the complex is completely diamagnetic.\n\nStep 3: Analyze the other options:\n- [CoF₆]³⁻: F⁻ is a weak field ligand; high-spin (t₂g)⁴ (e_g)², 4 unpaired electrons (paramagnetic, sp³d² outer orbital).\n- [FeF₆]³⁻: Fe³⁺ (3d⁵) with weak field F⁻; 5 unpaired electrons (paramagnetic).\n- [Ni(H₂O)₆]²⁺: Ni²⁺ (3d⁸); 2 unpaired electrons (paramagnetic).\n\nStep 4: Therefore, [Co(NH₃)₆]³⁺ is diamagnetic and an inner-orbital complex.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4330,
    data: {
      question: "Which of the following cobalt(III) complexes are inner-orbital (d²sp³) low-spin complexes?\n(I) [Co(H₂O)₆]³⁺\n(II) [Co(C₂O₄)₃]³⁻\n(III) [CoF₆]³⁻",
      option_a: "(I) and (II) only",
      option_b: "(II) and (III) only",
      option_c: "(I) and (III) only",
      option_d: "(I), (II), and (III)",
      "correct_option": "A",
      explanation: "Step 1: Co³⁺ is a 3d⁶ ion with a high effective nuclear charge, which causes exceptionally large crystal field splitting (Δ_o) even with oxygen-donor ligands.\n\nStep 2: In [Co(H₂O)₆]³⁺:\nWater is normally a weak-field ligand, but with Co³⁺, Δ_o > P. Electrons pair up to give (t₂g)⁶ (e_g)⁰, making it a diamagnetic inner-orbital (d²sp³) complex.\n\nStep 3: In [Co(C₂O₄)₃]³⁻:\nOxalate is a bidentate chelate ligand with oxygen donor atoms. Chelation further enhances Δ_o, resulting in complete pairing: (t₂g)⁶ (e_g)⁰, d²sp³ inner-orbital complex.\n\nStep 4: In [CoF₆]³⁻:\nFluoride is a very weak field ligand where Δ_o < P, resulting in a high-spin outer-orbital (sp³d²) complex with 4 unpaired electrons.\n\nStep 5: Therefore, both [Co(H₂O)₆]³⁺ and [Co(C₂O₄)₃]³⁻ are inner-orbital complexes.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4331,
    data: {
      question: "Which of the following salts is a member of the 'alum' family having the general formula M₂SO₄·M'₂(SO₄)₃·24H₂O (or MM'(SO₄)₂·12H₂O)?",
      option_a: "Potash alum, K₂SO₄·Al₂(SO₄)₃·24H₂O",
      option_b: "Chrome alum, K₂SO₄·Cr₂(SO₄)₃·24H₂O",
      option_c: "Ferric alum, (NH₄)₂SO₄·Fe₂(SO₄)₃·24H₂O",
      option_d: "All of the above",
      "correct_option": "D",
      explanation: "Step 1: Definition of alums:\nAlums are a specific class of isomorphous double sulfates having the stoichiometric composition:\nM₂SO₄·M'₂(SO₄)₃·24H₂O or MM'(SO₄)₂·12H₂O\nwhere M is a univalent cation (e.g., K⁺, Na⁺, NH₄⁺, Rb⁺, Cs⁺) and M' is a trivalent cation (e.g., Al³⁺, Cr³⁺, Fe³⁺).\n\nStep 2: Verification of given compounds:\n- Potash alum: K₂SO₄·Al₂(SO₄)₃·24H₂O (M = K⁺, M' = Al³⁺)\n- Chrome alum: K₂SO₄·Cr₂(SO₄)₃·24H₂O (M = K⁺, M' = Cr³⁺)\n- Ferric alum: (NH₄)₂SO₄·Fe₂(SO₄)₃·24H₂O (M = NH₄⁺, M' = Fe³⁺)\nAll three compounds fulfill the structural and crystallographic definition of alums.\n\nStep 3: Therefore, all of the given compounds belong to the alum family.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4332,
    data: {
      question: "Which of the following four-coordinate transition metal complexes has a SQUARE PLANAR geometry?",
      option_a: "[Ni(CN)₄]²⁻",
      option_b: "[Pt(gly)₂]",
      option_c: "[Cu(NH₃)₄]²⁺",
      option_d: "All of the above",
      "correct_option": "D",
      explanation: "Step 1: Analyze [Ni(CN)₄]²⁻:\nNi²⁺ is 3d⁸. The strong-field ligand CN⁻ forces pairing of the two unpaired 3d electrons into a single orbital, freeing one 3d orbital to undergo dsp² hybridization, which produces a square planar geometry (diamagnetic).\n\nStep 2: Analyze [Pt(gly)₂]:\nPt²⁺ is a 5d⁸ ion. Heavy 5d transition metals produce very large crystal field splitting, ensuring that virtually all four-coordinate Pt(II) complexes adopt square planar (dsp²) geometry.\n\nStep 3: Analyze [Cu(NH₃)₄]²⁺:\nCu²⁺ is 3d⁹. Due to severe Jahn-Teller distortion and dsp² hybridization, the complex adopts a square planar geometry in solution and solid salts.\n\nStep 4: Since all three complexes adopt square planar geometry, all of the above is correct.\nTherefore, Option (D) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 72 Part 1 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 72 Part 1 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
