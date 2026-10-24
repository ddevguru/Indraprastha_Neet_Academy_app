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
    id: 4457,
    data: {
      question: "In wrought iron (the purest commercial form of iron containing 0.1 to 0.25% carbon), the carbon is primarily present in the form of:",
      option_a: "Free crystalline graphite flakes",
      option_b: "Iron carbide (cementite, Fe₃C)",
      option_c: "Silicon carbide (SiC)",
      option_d: "Elemental diamond allotrope",
      "correct_option": "B",
      explanation: "Step 1: Forms of carbon in iron alloys:\n- In grey cast iron, carbon is predominantly present as free flakes of graphite.\n- In white cast iron and steels, carbon exists in combined form as iron carbide (cementite, Fe₃C).\n\nStep 2: Carbon in wrought iron:\nWrought iron contains very low carbon content (0.1–0.25%). This small amount of carbon is chemically combined with iron as iron carbide (cementite, Fe₃C) dispersed in fibrous ferrite grains containing slag inclusions.\n\nStep 3: Therefore, carbon in wrought iron is present as iron carbide.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4458,
    data: {
      question: "A transition metal ion in its trivalent state (M³⁺) has the electronic configuration [Ar] 3d¹. The metal ion is:",
      option_a: "Sc³⁺",
      option_b: "V³⁺",
      option_c: "Ti³⁺",
      option_d: "Cr³⁺",
      "correct_option": "C",
      explanation: "Step 1: Let the atomic number of the element M be Z.\nThe trivalent cation M³⁺ is formed by removing 3 electrons from neutral M:\nConfiguration of M³⁺ = [Ar] 3d¹ (total electrons = 18 + 1 = 19 electrons).\n\nStep 2: Total electrons in neutral M = 19 + 3 = 22 electrons.\nHence, atomic number Z = 22, which is Titanium (Ti).\n\nStep 3: Verify the electronic configurations:\n- Neutral Ti (Z = 22): [Ar] 3d² 4s²\n- Ti³⁺ ion (after losing two 4s and one 3d electron): [Ar] 3d¹.\n\nStep 4: Therefore, the ion is Ti³⁺.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4459,
    data: {
      question: "How many elements are present in each complete transition series (d-block series) of the periodic table?",
      option_a: "8 elements",
      option_b: "10 elements",
      option_c: "14 elements",
      option_d: "18 elements",
      "correct_option": "B",
      explanation: "Step 1: The d-subshell consists of 5 degenerate d-orbitals: d_xy, d_yz, d_zx, d_x²-y², and d_z².\n\nStep 2: According to Pauli's exclusion principle, each orbital can accommodate a maximum of 2 electrons with opposite spins.\nTherefore, the maximum electron capacity of a d-subshell is 5 × 2 = 10 electrons.\n\nStep 3: Since each added electron corresponds to a distinct element filling the (n-1)d subshell across a period, each complete transition series contains exactly 10 elements:\n- 3d series: Sc (Z = 21) to Zn (Z = 30) = 10 elements\n- 4d series: Y (Z = 39) to Cd (Z = 48) = 10 elements\n- 5d series: La (Z = 57), Hf (Z = 72) to Hg (Z = 80) = 10 elements\n\nStep 4: Therefore, each transition series contains 10 elements.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4460,
    data: {
      question: "The phenomenon of lanthanoid contraction is primarily caused by:",
      option_a: "Appreciable shielding of outer electrons by 4f-electrons",
      option_b: "Imperfect shielding of outer valence electrons by the diffused 4f-electrons against the increasing nuclear charge",
      option_c: "Rapid decrease in the effective nuclear charge across the series",
      option_d: "High penetration of 5d electrons towards the atomic nucleus",
      "correct_option": "B",
      explanation: "Step 1: As we move from Cerium (Z = 58) to Lutetium (Z = 71), each successive element gains one proton in the nucleus and one electron in the inner 4f subshell.\n\nStep 2: The 4f-orbitals have large, diffuse spatial shapes with multiple nodal planes. Consequently, their mutual shielding of one another from the nuclear charge is extremely imperfect and poor—far poorer than d, p, or s electrons.\n\nStep 3: Due to this ineffective shielding, as the nuclear charge increases by one unit with each successive element, the effective nuclear charge (Z_eff) experienced by each 4f and outer 6s electron steadily increases.\n\nStep 4: This draws the entire electron cloud closer to the nucleus, resulting in a steady, regular contraction in atomic and ionic radii known as the lanthanoid contraction.\n\nStep 5: Therefore, imperfect shielding of outer electrons by 4f-electrons is the primary cause.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4461,
    data: {
      question: "Zirconium (Zr, 4d series) and Hafnium (Hf, 5d series) exhibit almost identical chemical properties and are extremely difficult to separate because:",
      option_a: "They have identical numbers of valence electrons in their s-subshell only",
      option_b: "They have nearly identical atomic and ionic radii resulting from the lanthanoid contraction",
      option_c: "Both exist in the same period of the periodic table",
      option_d: "Both are radioactive transuranic elements",
      "correct_option": "B",
      explanation: "Step 1: Normally, down a group in the periodic table, atomic and ionic radii increase noticeably due to the addition of an extra principal shell (e.g., Ti to Zr).\n\nStep 2: However, between Zr (Period 5) and Hf (Period 6), there intervenes the 4f lanthanoid series (14 elements: Ce to Lu), where 14 electrons enter the poorly shielding 4f-orbitals.\n\nStep 3: The cumulative contraction across the lanthanoid series (~0.17 Å) almost exactly offsets the expected expansion due to adding the 6th principal energy shell.\n\nStep 4: Consequently, the ionic radii of Zr⁴⁺ (80 pm) and Hf⁴⁺ (79 pm) are nearly identical. Having the same charge, virtually the same ionic radius, and identical valence configurations, they exhibit almost identical crystal structures, coordination behavior, and chemical reactivities.\n\nStep 5: Therefore, their similarity is due to nearly identical radii caused by the lanthanoid contraction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4462,
    data: {
      question: "In the sodium nitroprusside ion, [Fe(CN)₅(NO)]²⁻, iron and the nitrosyl ligand are formulated as Fe(II) and NO⁺ rather than Fe(III) and neutral NO. These two formulations can be definitively distinguished by:",
      option_a: "Estimating the total percentage of iron by gravimetry",
      option_b: "Measuring the concentration of free cyanide ions",
      option_c: "Measuring the solid-state magnetic susceptibility (magnetic moment)",
      option_d: "Determining its thermal decomposition temperature",
      "correct_option": "C",
      explanation: "Step 1: Analyze the electronic configurations of the two possible formulations:\n- Fe(II) with NO⁺ formulation:\nFe(II) is d⁶. In the strong ligand field created by CN⁻ and NO⁺, all 6 d-electrons pair up in the lower t₂g orbitals: (t₂g)⁶ (e_g)⁰. There are 0 unpaired electrons, making the complex diamagnetic (spin-only magnetic moment μ = 0 BM).\n- Fe(III) with neutral NO formulation:\nFe(III) is d⁵. In a strong field, it would have the configuration (t₂g)⁵ (e_g)⁰ with 1 unpaired electron, making the complex paramagnetic with μ ≈ 1.73 BM.\n\nStep 2: Distinction by magnetic measurements:\nMagnetic susceptibility measurements of solid sodium nitroprusside demonstrate that the compound is completely diamagnetic (μ = 0 BM). This definitively confirms the Fe(II)–NO⁺ formulation.\n\nStep 3: Therefore, measuring the solid-state magnetic moment distinguishes between the two forms.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4463,
    data: {
      question: "The engineering process used to harden the surface of railway wagon axles and gear teeth by heating mild steel rods packed in charcoal powder at 1170–1220 K is called:",
      option_a: "Case hardening (carburizing)",
      option_b: "Tempering",
      option_c: "Sherardizing",
      option_d: "Annealing",
      "correct_option": "A",
      explanation: "Step 1: Principles of case hardening (carburizing):\nCase hardening is a thermochemical surface treatment in which low-carbon steel (mild steel) is heated while packed in a carbon-rich medium (such as charcoal powder, barium carbonate, or hydrocarbon gases) at ~1170–1220 K.\n\nStep 2: Mechanism:\nCarbon diffuses into the outer surface layer of the steel, converting it into a hard, high-carbon wear-resistant steel 'case' (outer layer), while the inner core retains its tough, ductile, and impact-resistant low-carbon nature.\n\nStep 3: Applications:\nThis process is extensively employed for manufacturing railway wagon axles, engine crankshafts, and automotive gears to withstand both heavy shock loads and surface friction.\n\nStep 4: Therefore, the process is known as case hardening.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4464,
    data: {
      question: "Which of the following transition metal compounds is DIAMAGNETIC (not paramagnetic)?",
      option_a: "Cr(ClO₄)₃",
      option_b: "KMnO₄",
      option_c: "VOCl₂",
      option_d: "FeSO₄",
      "correct_option": "B",
      explanation: "Step 1: Determine the oxidation state and d-electron count of the central metal ion in each compound:\n\n1. Cr(ClO₄)₃:\nChromium is in +3 oxidation state. Neutral Cr is [Ar] 3d⁵ 4s¹. Cr³⁺ is [Ar] 3d³ (3 unpaired electrons, paramagnetic).\n\n2. KMnO₄:\nManganese is in +7 oxidation state. Neutral Mn is [Ar] 3d⁵ 4s². Mn⁷⁺ has lost all 7 valence electrons: [Ar] 3d⁰ 4s⁰. With no d-electrons (0 unpaired electrons), it is diamagnetic. (Its intense purple color arises from ligand-to-metal charge transfer, LMCT, not d–d transitions).\n\n3. VOCl₂:\nVanadium is present as vanadyl ion, VO²⁺ (+4 oxidation state). Neutral V is [Ar] 3d³ 4s². V⁴⁺ is [Ar] 3d¹ (1 unpaired electron, paramagnetic).\n\n4. FeSO₄:\nIron is in +2 oxidation state. Fe²⁺ is [Ar] 3d⁶ (4 unpaired electrons, paramagnetic).\n\nStep 2: Therefore, KMnO₄ has no unpaired electrons and is diamagnetic.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4465,
    data: {
      question: "Which of the following pairs of transition metal species exhibits a similar characteristic blue color in aqueous solution?",
      option_a: "FeCl₃ and CuCl₂",
      option_b: "VOCl₂ (VO²⁺) and CuCl₂ (Cu²⁺)",
      option_c: "FeCl₂ and MnSO₄",
      option_d: "CrCl₃ and TiCl₄",
      "correct_option": "B",
      explanation: "Step 1: Identify the colored species in aqueous solution:\n- CuCl₂ dissolves in water to give the hydrated cupric ion, [Cu(H₂O)₆]²⁺, which has a characteristic bright sky-blue color due to d–d transitions (d⁹ system).\n- VOCl₂ contains the oxovanadium(IV) / vanadyl cation, [VO(H₂O)₅]²⁺ (d¹ system), which is well known for its characteristic bright blue color in aqueous medium.\n\nStep 2: Comparison with other options:\n- FeCl₃ gives a yellow-brown solution ([Fe(H₂O)₆]³⁺ / hydrolyzed species).\n- FeCl₂ gives a pale green solution ([Fe(H₂O)₆]²⁺).\n- MnSO₄ gives a very pale pink/almost colorless solution ([Mn(H₂O)₆]²⁺).\n- TiCl₄ is d⁰ and completely colorless.\n\nStep 3: Therefore, both VO²⁺ and Cu²⁺ impart a characteristic blue color in aqueous solution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4466,
    data: {
      question: "What is the common chemical name and formula of 'lunar caustic', traditionally used in cauterization and indelible inks?",
      option_a: "Silver chloride, AgCl",
      option_b: "Silver nitrate, AgNO₃",
      option_c: "Sodium hydroxide, NaOH",
      option_d: "Silver oxide, Ag₂O",
      "correct_option": "B",
      explanation: "Step 1: Historical naming:\nIn alchemy, silver was associated with the Moon ('Luna'). The Latin term 'caustic' means burning or corroding.\n\nStep 2: Chemical identity:\nWhen solid silver nitrate (AgNO₃) comes into contact with organic tissue or human skin in the presence of light, it is reduced to finely divided black metallic silver while denaturing and cauterizing proteins, leaving a dark caustic burn mark.\n\nStep 3: Hence, silver nitrate (AgNO₃) was historically called 'lunar caustic' and cast into sticks for medical cauterization.\n\nStep 4: Therefore, lunar caustic is silver nitrate (AgNO₃).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4467,
    data: {
      question: "Lanthanoids (4f series) and actinoids (5f series) closely resemble each other primarily in which of the following properties?",
      option_a: "Possessing +3 as their most stable and common oxidation state",
      option_b: "Identical low tendency to form coordination complexes",
      option_c: "Absence of radioactive isotopes in both series",
      option_d: "Identical magnetic properties and spectra",
      "correct_option": "A",
      explanation: "Step 1: Common oxidation state:\nBoth lanthanoids and actinoids prominently exhibit the +3 oxidation state as their principal, characteristic, and most stable oxidation state in aqueous solution and solid compounds.\n\nStep 2: Contrast in other properties:\n- Actinoids exhibit a much wider range of oxidation states (+3, +4, +5, +6, +7) than lanthanoids due to the comparable energies of 5f, 6d, and 7s subshells.\n- Actinoids have a much greater tendency to form coordination complexes than lanthanoids because of higher charge density and greater availability of 5f orbitals for bonding.\n- All actinoids are radioactive, whereas among lanthanoids only promethium (Pm) is radioactive.\n\nStep 3: Therefore, their primary resemblance lies in having +3 as their common oxidation state.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4468,
    data: {
      question: "The naturally occurring silver mineral commonly referred to as 'horn silver' (or chlorargyrite) is chemically:",
      option_a: "Silver chloride, AgCl",
      option_b: "Silver sulfide, Ag₂S",
      option_c: "Silver nitrate, AgNO₃",
      option_d: "Silver bromide, AgBr",
      "correct_option": "A",
      explanation: "Step 1: Mineral names of silver ores:\n- Horn silver (chlorargyrite): AgCl (silver chloride). It is named 'horn silver' because it is soft, sectile, and has a waxy/resinous luster resembling animal horn.\n- Argentite (silver glance): Ag₂S (silver sulfide).\n- Pyrargyrite (ruby silver): Ag₃SbS₃.\n\nStep 2: Therefore, horn silver is silver chloride, AgCl.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4469,
    data: {
      question: "When an aqueous solution of silver nitrate (AgNO₃) is added to a neutral or slightly alkaline solution of sodium chromate (Na₂CrO₄), what is observed?",
      option_a: "A white precipitate of AgCl",
      option_b: "A yellow precipitate of AgI",
      option_c: "A brick-red precipitate of silver chromate (Ag₂CrO₄)",
      option_d: "A black precipitate of Ag₂S",
      "correct_option": "C",
      explanation: "Step 1: Chemical reaction between silver nitrate and sodium chromate:\n2AgNO₃ (aq) + Na₂CrO₄ (aq) → Ag₂CrO₄ ↓ (s) + 2NaNO₃ (aq)\n\nStep 2: Properties and color of silver chromate:\nSilver chromate (Ag₂CrO₄) is a sparingly soluble salt having a characteristic brick-red or brownish-red color (K_sp ≈ 1.1 × 10⁻¹²).\n\nStep 3: Analytical application:\nThis precipitation reaction forms the basis of the end-point detection in Mohr's method of argentometric titration for determining chloride ions in water, where potassium chromate acts as the indicator.\n\nStep 4: Therefore, a brick-red precipitate of Ag₂CrO₄ is obtained.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4470,
    data: {
      question: "Among the 3d transition series elements, which valence electronic configuration allows an element to achieve the highest oxidation state (+7)?",
      option_a: "(n-1)d³ ns²",
      option_b: "(n-1)d⁸ ns²",
      option_c: "(n-1)d⁵ ns¹",
      option_d: "(n-1)d⁵ ns²",
      "correct_option": "D",
      explanation: "Step 1: For transition elements, the maximum possible oxidation state corresponds to the loss or participation of all valence electrons, which is equal to the sum of ns and (n-1)d electrons:\nMaximum oxidation state = (number of ns electrons) + (number of unpaired (n-1)d electrons).\n\nStep 2: Analyze the configuration (n-1)d⁵ ns²:\nHere, n = 4 for the 3d series:\n3d⁵ 4s² corresponds to Manganese (Mn, Z = 25).\nManganese has 2 electrons in the 4s orbital and 5 unpaired electrons in the 3d subshell.\nTotal valence electrons available for bonding = 2 + 5 = 7.\n\nStep 3: In permanganate ion (MnO₄⁻) and manganese heptoxide (Mn₂O₇), manganese achieves its maximum oxidation state of +7, which is the highest in the entire 3d transition series.\n\nStep 4: Therefore, the configuration is (n-1)d⁵ ns².\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4471,
    data: {
      question: "When powdered native silver ore is treated with a dilute aqueous solution of sodium cyanide (NaCN) while air is continuously bubbled through the slurry, silver dissolves as which water-soluble complex?",
      option_a: "Insoluble AgCN",
      option_b: "Colloidal metallic Ag",
      option_c: "Neutral [Ag(CN)₂]",
      option_d: "Sodium dicyanoargentate(I), Na[Ag(CN)₂]",
      "correct_option": "D",
      explanation: "Step 1: MacArthur-Forrest cyanide extraction of silver:\nSilver in native form is insoluble in water. However, in the presence of cyanide ions and dissolved atmospheric oxygen (which serves as an electron acceptor / oxidizing agent), silver undergoes oxidative dissolution:\n4Ag (s) + 8NaCN (aq) + 2H₂O (l) + O₂ (g) → 4Na[Ag(CN)₂] (aq) + 4NaOH (aq)\n\nStep 2: Complex formed:\nThe coordination complex formed is sodium dicyanoargentate(I), Na[Ag(CN)₂], in which silver exists as the linear complex anion [Ag(CN)₂]⁻.\n\nStep 3: Therefore, the soluble complex is Na[Ag(CN)₂].\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4472,
    data: {
      question: "Which of the following oxidation states is thermodynamically the most stable for chromium in aqueous solution?",
      option_a: "+2",
      option_b: "+3",
      option_c: "+4",
      option_d: "+6",
      "correct_option": "B",
      explanation: "Step 1: Electronic configuration of chromium (Z = 24):\nGround state neutral Cr: [Ar] 3d⁵ 4s¹.\n- Cr²⁺: [Ar] 3d⁴ (acts as a strong reducing agent in aqueous solution to reach +3).\n- Cr³⁺: [Ar] 3d³.\n- Cr⁶⁺: [Ar] 3d⁰ (in Cr₂O₇²⁻ / CrO₄²⁻, acts as a strong oxidizing agent).\n\nStep 2: Crystal field stabilization of Cr³⁺:\nIn an aqueous octahedral environment, [Cr(H₂O)₆]³⁺ splits into lower t₂g and higher e_g sets. The three 3d electrons half-fill the three degenerate t₂g orbitals:\nConfiguration = (t₂g)³ (e_g)⁰.\n\nStep 3: A half-filled t₂g level provides extraordinarily large crystal field stabilization energy (CFSE = -1.2 Δ_o) and exchange energy, making Cr³⁺ (+3 state) the most stable oxidation state in aqueous solution.\n\nStep 4: Therefore, +3 is the most stable oxidation state of chromium.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4473,
    data: {
      question: "While most cuprous (Cu⁺) salts are white/colorless due to their completely filled 3d¹⁰ electron configuration, cuprous oxide (Cu₂O) is distinctly colored. What is the color of cuprous oxide?",
      option_a: "Deep blue",
      option_b: "Bright green",
      option_c: "Red / reddish-brown",
      option_d: "White",
      "correct_option": "C",
      explanation: "Step 1: Cuprous ion (Cu⁺) has the electronic configuration [Ar] 3d¹⁰. Because all d-orbitals are fully occupied, d–d transitions cannot occur, which is why simple cuprous salts like CuCl and Cu₂SO₄ are white/colorless.\n\nStep 2: However, cuprous oxide (Cu₂O) is a solid with a distinctive red or reddish-brown color (as seen in the positive result of Fehling's and Benedict's tests for reducing sugars where Cu²⁺ is reduced to a red precipitate of Cu₂O).\n\nStep 3: The red color in Cu₂O arises from interband electronic transitions and metal-to-ligand / ligand-to-metal charge transfer interactions in the crystal lattice.\n\nStep 4: Therefore, cuprous oxide is red / reddish-brown.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4474,
    data: {
      question: "Among the various oxides of manganese, which oxide is AMPHOTERIC in character?",
      option_a: "Manganese dioxide (MnO₂)",
      option_b: "Manganese(II) oxide (MnO)",
      option_c: "Manganese heptoxide (Mn₂O₇)",
      option_d: "Manganese(II,III) oxide (Mn₃O₄)",
      "correct_option": "A",
      explanation: "Step 1: Periodic trend in acid-base character of transition metal oxides:\nAs the oxidation state of the transition metal increases, the covalent character of the metal-oxygen bond increases, shifting the nature of the oxide from basic to amphoteric to acidic.\n\nStep 2: Manganese oxides in various oxidation states:\n- MnO (+2 oxidation state): Strongly basic (dissolves only in acids).\n- Mn₂O₃ (+3 oxidation state): Weakly basic.\n- MnO₂ (+4 oxidation state): Intermediate oxidation state, weakly amphoteric (reacts with concentrated acids like HCl to give MnCl₂ + Cl₂ and with strong molten bases to give manganites).\n- Mn₂O₇ (+7 oxidation state): Covalent, green oily liquid, strongly acidic (anhydride of permanganic acid, HMnO₄).\n\nStep 3: Therefore, MnO₂ is the amphoteric oxide of manganese.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4475,
    data: {
      question: "In the refining of impure gold containing copper and silver impurities, the impurities can be removed by:\n(1) Boiling the alloy with concentrated sulfuric acid (parting process)\n(2) Electrolytic refining using an acidified gold chloride (HAuCl₄) electrolyte",
      option_a: "(1) only",
      option_b: "(2) only",
      option_c: "Neither (1) nor (2)",
      option_d: "Both (1) and (2)",
      "correct_option": "D",
      explanation: "Step 1: Analyze method (1) - Chemical parting:\nBoiling the impure gold alloy (inquartated so silver is ~75%) with concentrated sulfuric acid (or concentrated nitric acid) dissolves copper and silver as soluble sulfates (CuSO₄ and Ag₂SO₄) while noble gold remains completely unattacked as a brown spongy residue:\n2Ag + 2H₂SO₄ (conc.) → Ag₂SO₄ + SO₂ + 2H₂O\nCu + 2H₂SO₄ (conc.) → CuSO₄ + SO₂ + 2H₂O\nThis classical separation is called 'parting of gold'.\n\nStep 2: Analyze method (2) - Electrolytic refining (Wohlwill process):\nImpure gold acts as the anode in an electrolyte of chloroauric acid (HAuCl₄) with HCl. Pure gold deposits on the thin cathode sheet, silver precipitates as insoluble AgCl anode slime, and copper dissolves into the electrolyte as Cu²⁺.\n\nStep 3: Both chemical parting and electrolytic refining are standard industrial methods for removing Cu and Ag from gold.\n\nStep 4: Therefore, both (1) and (2) can be used.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4476,
    data: {
      question: "Which of the following statements regarding the f-block elements is INCORRECT?",
      option_a: "The chemistry of the various lanthanoids is remarkably similar due to almost identical ionic radii",
      option_b: "Lanthanum (La) and Lutetium (Lu) have partially filled d-orbitals with completely empty and completely filled 4f subshells, respectively",
      option_c: "Actinoids show a wider range of oxidation states than lanthanoids because 5f, 6d, and 7s levels are of comparable energies",
      option_d: "The 4f and 5f orbitals provide identical shielding efficiency to the outer electrons against the nuclear charge",
      "correct_option": "D",
      explanation: "Step 1: Analyze statements (A), (B), and (C):\n- (A) Lanthanoid contraction causes very subtle radius differences across the 14 elements, making their chemical behavior extremely homogeneous. (Correct)\n- (B) La (Z = 57) is [Xe] 4f⁰ 5d¹ 6s² and Lu (Z = 71) is [Xe] 4f¹⁴ 5d¹ 6s². Both possess one 5d electron. (Correct)\n- (C) The energy difference between 5f, 6d, and 7s orbitals is very small in early actinoids, enabling participation of all three subshells in bonding to show oxidation states up to +7. (Correct)\n\nStep 2: Analyze statement (D):\n5f-orbitals extend further in space and are more diffuse than 4f-orbitals. However, their shielding of outer electrons from the nuclear charge is significantly poorer and less effective than that of 4f-orbitals. Consequently, actinoid contraction is actually greater from element to element than lanthanoid contraction.\n\nStep 3: Hence, the statement that 4f and 5f provide identical shielding efficiency is INCORRECT.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4477,
    data: {
      question: "According to the Irving-Williams series, which of the following divalent 3d transition metal cations forms the most stable coordination complexes with a given ligand?",
      option_a: "Mn²⁺",
      option_b: "Fe²⁺",
      option_c: "Ni²⁺",
      option_d: "Cu²⁺",
      "correct_option": "D",
      explanation: "Step 1: The Irving-Williams series defines the relative stability of high-spin coordination complexes formed by divalent first-row transition metal ions:\nBa²⁺ < Sr²⁺ < Ca²⁺ < Mg²⁺ < Mn²⁺ < Fe²⁺ < Co²⁺ < Ni²⁺ < Cu²⁺ > Zn²⁺\n\nStep 2: Reasons for the stability trend:\n- Across the series from Mn²⁺ to Cu²⁺, the effective nuclear charge increases and the ionic radius decreases, leading to higher charge density and stronger electrostatic attraction for ligands.\n- Crystal field stabilization energy (CFSE) increases from d⁵ (Mn²⁺, CFSE = 0) to d⁸ (Ni²⁺).\n- For Cu²⁺ (d⁹ system), in addition to high CFSE, it experiences a strong Jahn-Teller distortion (tetragonal elongation). The four equatorial metal-ligand bonds become significantly shorter and stronger, conferring maximum overall stability constants.\n\nStep 3: Therefore, Cu²⁺ forms the most stable complex.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4478,
    data: {
      question: "Why is silver bromide (AgBr) primarily used as the photosensitive emulsion in photographic film?",
      option_a: "Because it is completely insoluble in all organic and inorganic solvents",
      option_b: "Because it undergoes photochemical reduction upon exposure to light, forming a latent image of metallic silver nuclei",
      option_c: "Because it reacts with atmospheric nitrogen to form silver nitride",
      option_d: "Because it is a strong oxidizing agent in the dark",
      "correct_option": "B",
      explanation: "Step 1: Photochemical nature of silver halides:\nSilver bromide (AgBr) has a moderate bandgap (~2.6 eV) matching visible light photons. Upon absorbing a photon (hν):\nAgBr + hν → Ag⁺ + Br + e⁻\nAg⁺ + e⁻ → Ag⁰ (metallic silver atom)\n\nStep 2: Latent image formation:\nThe released electrons migrate through the crystal lattice to defect sites (sensitivity specks), where they reduce interstitial Ag⁺ ions to form clusters of sub-microscopic metallic silver nuclei (the latent image).\n\nStep 3: During development, these silver specks act as catalysts for rapid reduction of the entire exposed grain to black metallic silver.\n\nStep 4: Therefore, AgBr is used because of its photosensitivity and photochemical reduction to silver.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4479,
    data: {
      question: "Thermal decomposition of ammonium dichromate, (NH₄)₂Cr₂O₇, evolves a colorless gas. Which of the following reactions liberates the SAME gas upon gentle heating?",
      option_a: "Heating ammonium nitrite, NH₄NO₂",
      option_b: "Heating ammonium nitrate, NH₄NO₃",
      option_c: "Reaction of magnesium nitride with water, Mg₃N₂ + 6H₂O",
      option_d: "Heating sodium nitrate, NaNO₃",
      "correct_option": "A",
      explanation: "Step 1: Gas evolved from (NH₄)₂Cr₂O₇:\n(NH₄)₂Cr₂O₇ (s) —(heat)→ N₂ (g) + Cr₂O₃ (s) + 4H₂O (g)\nThe colorless, odorless gas liberated is dinitrogen (N₂).\n\nStep 2: Examine each option:\n- Option A: Heating ammonium nitrite decomposes smoothly to yield dinitrogen gas:\nNH₄NO₂ (s) —(heat)→ N₂ (g) + 2H₂O (l)\nThis produces the same gas, N₂.\n- Option B: Heating ammonium nitrate yields nitrous oxide (N₂O):\nNH₄NO₃ —(heat)→ N₂O + 2H₂O.\n- Option C: Hydrolysis of Mg₃N₂ yields ammonia gas:\nMg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃ ↑.\n- Option D: Heating NaNO₃ yields oxygen gas:\n2NaNO₃ —(heat)→ 2NaNO₂ + O₂ ↑.\n\nStep 3: Therefore, heating NH₄NO₂ liberates the same gas (N₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4480,
    data: {
      question: "When metallic gold (Au) dissolves in aqua regia (a 3:1 volumetric mixture of concentrated HCl and concentrated HNO₃), what soluble gold coordination compound is formed?",
      option_a: "Aurous chloride, AuCl",
      option_b: "Auric nitrate, Au(NO₃)₃",
      option_c: "Tetrachloroauric(III) acid (chloroauric acid), H[AuCl₄]",
      option_d: "Gold(III) oxide, Au₂O₃",
      "correct_option": "C",
      explanation: "Step 1: Action of aqua regia:\nAqua regia is a 3:1 mixture of concentrated hydrochloric acid and concentrated nitric acid. They react to generate nascent chlorine and nitrosyl chloride (NOCl):\nHNO₃ + 3HCl → NOCl + Cl₂ + 2H₂O\n\nStep 2: Reaction with gold:\nNitric acid oxidizes gold to Au³⁺ ions, which are immediately sequestered by high concentrations of chloride ions to form the exceptionally stable tetrachloroaurate(III) complex anion, [AuCl₄]⁻:\nAu + 4HCl + HNO₃ → H[AuCl₄] + NO ↑ + 2H₂O\nor Au + 4H⁺ + 4Cl⁻ + NO₃⁻ → [AuCl₄]⁻ + NO ↑ + 2H₂O\n\nStep 3: The resulting dissolved species is tetrachloroauric(III) acid (chloroauric acid, HAuCl₄).\n\nStep 4: Therefore, chloroauric acid (H[AuCl₄]) is formed.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 71 Part 2 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 71 Part 2 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
