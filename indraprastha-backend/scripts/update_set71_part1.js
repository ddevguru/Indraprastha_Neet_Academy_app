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
    id: 4432,
    data: {
      question: "When hydrogen peroxide (H₂O₂) is added to an acidified solution of potassium dichromate (K₂Cr₂O₇) in the presence of ether, a deep blue color is observed in the organic layer. This deep blue coloration is due to the formation of:",
      option_a: "CrO₃",
      option_b: "Cr₂O₃",
      option_c: "CrO₅",
      option_d: "CrO₄²⁻",
      "correct_option": "C",
      explanation: "Step 1: Reaction between acidified potassium dichromate and hydrogen peroxide:\nK₂Cr₂O₇ + H₂SO₄ + 4H₂O₂ → 2CrO₅ + K₂SO₄ + 5H₂O\n\nStep 2: Nature and structure of CrO₅:\nChromium pentoxide (CrO₅) is a peroxo complex often formulated as CrO(O₂)₂. It has a distinctive butterfly-like structure containing two peroxo groups (-O-O-) and one oxo group (=O) coordinated to chromium in the +6 oxidation state.\n\nStep 3: Stability in ether:\nCrO₅ is unstable in aqueous solution and rapidly decomposes to Cr³⁺ and O₂. However, it is extracted into ether or amyl alcohol to give a stable deep blue solution.\n\nStep 4: Therefore, the blue color is due to the formation of CrO₅.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4433,
    data: {
      question: "In the metallurgical extraction of silver from its sulfide ore (argentite, Ag₂S), the crushed ore is leached with a dilute aqueous solution of:",
      option_a: "HCl",
      option_b: "HNO₃",
      option_c: "NaCN or KCN",
      option_d: "H₂SO₄",
      "correct_option": "C",
      explanation: "Step 1: The hydrometallurgical extraction of silver from argentite (Ag₂S) is carried out via the MacArthur-Forrest cyanide process.\n\nStep 2: Leaching reaction:\nThe finely powdered ore is treated with a dilute (~0.5%) aqueous solution of sodium cyanide (NaCN) or potassium cyanide (KCN) while blowing a current of air through the mixture:\nAg₂S + 4NaCN + 2O₂ ⇌ 2Na[Ag(CN)₂] + Na₂SO₄\nor Ag₂S + 4CN⁻ ⇌ 2[Ag(CN)₂]⁻ + S²⁻ (where S²⁻ is oxidized to SO₄²⁻ by O₂ to drive the equilibrium forward).\n\nStep 3: The silver dissolves completely as the soluble coordination complex dicyanoargentate(I), [Ag(CN)₂]⁻.\n\nStep 4: Therefore, dilute KCN or NaCN solution is used for leaching Ag₂S.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4434,
    data: {
      question: "The meniscus of liquid mercury in a narrow glass capillary tube is:",
      option_a: "Convex upwards",
      option_b: "Concave upwards",
      option_c: "Completely flat/planar",
      option_d: "Irregularly curved",
      "correct_option": "A",
      explanation: "Step 1: Liquid surface shape in a tube depends on the relative magnitudes of cohesive forces (forces of attraction between liquid molecules themselves) and adhesive forces (forces of attraction between liquid molecules and the glass container wall).\n\nStep 2: In the case of mercury in glass:\nMercury does not wet glass because the cohesive forces between mercury atoms (strong metallic bonding) are much stronger than the adhesive forces between mercury and glass molecules.\n\nStep 3: Because cohesive forces exceed adhesive forces, the contact angle θ is obtuse (θ > 90°), resulting in capillary depression and a curved surface that bulges upward (convex upwards).\n\nStep 4: Therefore, the meniscus of mercury in a glass tube is convex upwards.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4435,
    data: {
      question: "The impure form of iron obtained directly from the bottom of a blast furnace during the smelting of hematite ore is known as:",
      option_a: "Pig iron",
      option_b: "Cast iron",
      option_c: "Wrought iron",
      option_d: "Stainless steel",
      "correct_option": "A",
      explanation: "Step 1: In the blast furnace, iron ore (Fe₂O₃) is reduced by carbon monoxide (CO) and coke (C) at high temperatures.\n\nStep 2: The molten metal collected at the bottom of the blast furnace is called pig iron. It contains approximately 4% carbon along with impurities like S, P, Si, and Mn.\n\nStep 3: Distinctions between commercial forms of iron:\n- Pig iron: Directly tapped from blast furnace (~4% C), hard and brittle.\n- Cast iron: Made by melting pig iron with scrap iron and coke (~3% C).\n- Wrought iron: Purest commercial form of iron (~0.2-0.5% C), malleable and ductile.\n\nStep 4: Therefore, the iron directly obtained from the blast furnace is pig iron.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4436,
    data: {
      question: "Which of the following 3d transition metals has the highest melting point and exhibits the strongest metallic bonding?",
      option_a: "Sc (Z = 21)",
      option_b: "V (Z = 23)",
      option_c: "Cr (Z = 24)",
      option_d: "Fe (Z = 26)",
      "correct_option": "C",
      explanation: "Step 1: The strength of metallic bonding in transition metals depends directly on the number of unpaired d-electrons that can participate in forming interatomic covalent and metallic bonds, which also correlates with their enthalpy of atomization and melting point.\n\nStep 2: Ground state electronic configurations of the 3d elements:\n- Sc: [Ar] 3d¹ 4s² (1 unpaired d-electron)\n- V: [Ar] 3d³ 4s² (3 unpaired d-electrons)\n- Cr: [Ar] 3d⁵ 4s¹ (6 unpaired valence electrons: 5 in 3d and 1 in 4s)\n- Fe: [Ar] 3d⁶ 4s² (4 unpaired d-electrons)\n\nStep 3: Chromium has the maximum number of unpaired electrons (6) in the 3d series, resulting in extensive interatomic d-orbital overlap, exceptionally strong metallic bonding, and the highest melting point (~2180 K) among the given elements.\n\nStep 4: Therefore, Cr exhibits the strongest metallic bonding.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4437,
    data: {
      question: "Which of the following alloys contains nickel as an essential component?",
      option_a: "Brass",
      option_b: "Bronze",
      option_c: "Bell metal",
      option_d: "German silver",
      "correct_option": "D",
      explanation: "Step 1: Analyze the compositions of the given alloys:\n- Brass: Alloy of Copper (Cu ~60-80%) and Zinc (Zn ~20-40%). Contains no nickel.\n- Bronze: Alloy of Copper (Cu ~88%) and Tin (Sn ~12%). Contains no nickel.\n- Bell metal: Alloy of Copper (Cu ~78%) and Tin (Sn ~22%). Contains no nickel.\n- German silver (nickel silver): Alloy consisting of Copper (Cu ~50%), Zinc (Zn ~30%), and Nickel (Ni ~20%). Despite its name, it contains no silver at all.\n\nStep 2: Therefore, German silver is the alloy that contains nickel.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4438,
    data: {
      question: "A very hard, wear-resistant, and corrosion-proof natural alloy used for tipping high-grade fountain pen nibs and pivot bearings is composed of:",
      option_a: "Osmium and Iridium (Osmiridium)",
      option_b: "Platinum and Chromium",
      option_c: "Vanadium and Iron",
      option_d: "Cobalt and Nickel",
      "correct_option": "A",
      explanation: "Step 1: Osmiridium (or iridosmine) is a naturally occurring alloy of the platinum-group transition metals osmium (Os) and iridium (Ir).\n\nStep 2: Osmium and iridium are among the densest known elements (~22.6 g/cm³) and are extremely hard, refractory, and chemically unreactive.\n\nStep 3: Because of its extreme hardness and superior resistance to friction and wear, osmiridium is historically and widely used to tip the nibs of fountain pens and precision instrument pivots.\n\nStep 4: Therefore, the alloy is composed of Os and Ir.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4439,
    data: {
      question: "In the metallurgical extraction of which metal is a Bessemer converter utilized to carry out 'bessemerization' and auto-reduction?",
      option_a: "Aluminium",
      option_b: "Silver",
      option_c: "Copper",
      option_d: "Iron",
      "correct_option": "C",
      explanation: "Step 1: During the extraction of copper from copper pyrites (CuFeS₂), molten copper matte (consisting mainly of Cu₂S and FeS) is transferred to a silica-lined Bessemer converter.\n\nStep 2: A blast of hot air and sand (SiO₂) is blown through the molten matte:\n- FeS is oxidized and removed as slag: 2FeS + 3O₂ → 2FeO + 2SO₂; FeO + SiO₂ → FeSiO₃ (slag).\n- Cu₂S undergoes partial oxidation and subsequent self-reduction (auto-reduction):\n2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂\n2Cu₂O + Cu₂S → 6Cu + SO₂ ↑\n\nStep 3: The solidified copper with blistered surface due to escaping SO₂ is called blister copper (98-99% pure).\n\nStep 4: Hence, bessemerization is a key step in the extraction of copper.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4440,
    data: {
      question: "A solution of cuprous chloride (CuCl) in concentrated hydrochloric acid or aqueous ammonia readily absorbs which of the following gases to form a coordination adduct?",
      option_a: "Carbon dioxide (CO₂)",
      option_b: "Sulfur dioxide (SO₂)",
      option_c: "Carbon monoxide (CO)",
      option_d: "Methane (CH₄)",
      "correct_option": "C",
      explanation: "Step 1: An ammoniacal or hydrochloric acid solution of cuprous chloride (CuCl) acts as a specific absorbent for carbon monoxide (CO) gas in Orsat gas analysis apparatus.\n\nStep 2: Absorption reaction:\nCuCl reacts with carbon monoxide in the presence of water to form a crystalline addition compound:\nCuCl + CO + 2H₂O ⇌ [Cu(CO)Cl·2H₂O]\nor [Cu(CO)(H₂O)₂]⁺ Cl⁻\n\nStep 3: The empty d-orbitals and filled d-orbitals of Cu⁺ engage in synergistic bonding with the lone pair and π* antibonding orbital of carbon monoxide.\n\nStep 4: Therefore, CuCl solution absorbs carbon monoxide (CO).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4441,
    data: {
      question: "When chromium trioxide (CrO₃) is dissolved in an aqueous solution of sodium hydroxide (NaOH), the resulting bright yellow solution contains which anion?",
      option_a: "Chromate ion, CrO₄²⁻",
      option_b: "Dichromate ion, Cr₂O₇²⁻",
      option_c: "Chromite ion, CrO₂⁻",
      option_d: "Chromic hydroxide ion, [Cr(OH)₆]³⁻",
      "correct_option": "A",
      explanation: "Step 1: CrO₃ is the acidic anhydride of chromic acid (H₂CrO₄).\n\nStep 2: Being an acidic oxide, CrO₃ readily neutralizes bases such as sodium hydroxide (NaOH):\nCrO₃ + 2NaOH → Na₂CrO₄ + H₂O\n\nStep 3: In alkaline solution (pH > 8), chromium(VI) exists predominantly as the tetrahedral, bright yellow chromate ion (CrO₄²⁻):\nCr₂O₇²⁻ (orange) + 2OH⁻ ⇌ 2CrO₄²⁻ (yellow) + H₂O\n\nStep 4: Therefore, CrO₃ dissolves in aqueous NaOH to produce the chromate ion (CrO₄²⁻).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4442,
    data: {
      question: "Which of the following precious metals is commercially extracted from its native ore or sulfide ore by cyanidation (leaching with a dilute aqueous solution of NaCN in the presence of air)?",
      option_a: "Titanium",
      option_b: "Silver",
      option_c: "Vanadium",
      option_d: "Nickel",
      "correct_option": "B",
      explanation: "Step 1: The MacArthur-Forrest cyanide process is a classic hydrometallurgical method used specifically for the extraction of gold (Au) and silver (Ag).\n\nStep 2: Silver in its native state or as argentite (Ag₂S) dissolves in dilute sodium cyanide solution in the presence of atmospheric oxygen, forming a soluble complex:\n4Ag + 8NaCN + 2H₂O + O₂ → 4Na[Ag(CN)₂] + 4NaOH\nAg₂S + 4NaCN ⇌ 2Na[Ag(CN)₂] + Na₂S (O₂ oxidizes S²⁻ to SO₄²⁻).\n\nStep 3: Silver is then displaced from the soluble dicyanoargentate(I) complex by adding zinc dust:\n2Na[Ag(CN)₂] + Zn → Na₂[Zn(CN)₄] + 2Ag ↓\n\nStep 4: Therefore, silver is the metal obtained by cyanide leaching.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4443,
    data: {
      question: "What is the elemental composition of the commercial alloy known as 'German silver'?",
      option_a: "Copper, Zinc, and Nickel",
      option_b: "Copper, Zinc, and Silver",
      option_c: "Silver, Nickel, and Aluminium",
      option_d: "Copper, Tin, and Germanium",
      "correct_option": "A",
      explanation: "Step 1: German silver (also called nickel silver, new silver, or argentan) is named so because of its silvery white luster and appearance resembling silver metal.\n\nStep 2: However, it contains zero percent silver. Its actual typical elemental composition is:\n- Copper (Cu): ~50% to 60%\n- Zinc (Zn): ~20% to 30%\n- Nickel (Ni): ~15% to 20%\n\nStep 3: Hence, German silver is a ternary alloy composed of Copper, Zinc, and Nickel.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4444,
    data: {
      question: "Copper of very high purity (99.99%), required for electrical conductivity cables, is obtained by which refining process?",
      option_a: "Liquation",
      option_b: "Zone refining",
      option_c: "Electrolytic refining",
      option_d: "Mond process",
      "correct_option": "C",
      explanation: "Step 1: Crude copper obtained from the converter is blister copper (~98-99% pure), containing impurities like Fe, Ni, Zn, Ag, Au, and Pt.\n\nStep 2: In electrolytic refining of copper:\n- Anode: Thick slabs of impure blister copper.\n- Cathode: Thin sheets of pure copper.\n- Electrolyte: Acidified copper sulfate solution (15% CuSO₄ + 5% H₂SO₄).\n\nStep 3: When electric current is passed:\n- Anode oxidation: Cu (impure) → Cu²⁺ + 2e⁻\n- Cathode reduction: Cu²⁺ + 2e⁻ → Cu (pure, deposited with 99.99% purity)\nMore electropositive impurities (Fe, Ni, Zn) remain in solution as sulfates, while less electropositive noble metals (Ag, Au, Pt) settle beneath the anode as 'anode mud'.\n\nStep 4: Therefore, electrolytic refining yields high-purity copper.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4445,
    data: {
      question: "In black-and-white photography, unexposed silver bromide (AgBr) on the photographic plate is removed during the fixing process by dissolving in hypo (sodium thiosulfate) solution. The soluble complex formed is:",
      option_a: "[Ag(S₂O₃)]⁻",
      option_b: "Ag₂S₂O₃",
      option_c: "[Ag(S₂O₃)₂]³⁻",
      option_d: "[Ag₂(S₂O₃)₃]⁴⁻",
      "correct_option": "C",
      explanation: "Step 1: During the photographic fixing process, unreacted insoluble silver bromide (AgBr) must be removed so that the negative image is permanently preserved.\n\nStep 2: Sodium thiosulfate (Na₂S₂O₃·5H₂O), commonly called hypo, reacts with silver bromide to form a water-soluble coordination complex:\nAgBr (s) + 2Na₂S₂O₃ (aq) → Na₃[Ag(S₂O₃)₂] (aq) + NaBr (aq)\n\nStep 3: The complex anion formed in solution is the bis(thiosulfato)argentate(I) ion, [Ag(S₂O₃)₂]³⁻.\n\nStep 4: Therefore, the soluble species is [Ag(S₂O₃)₂]³⁻.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4446,
    data: {
      question: "Which of the following is a ferrous alloy having a nearly zero coefficient of thermal expansion, making it ideal for precision measuring tapes and clock pendulums?",
      option_a: "Invar",
      option_b: "Solder",
      option_c: "Magnalium",
      option_d: "Duralumin",
      "correct_option": "A",
      explanation: "Step 1: Definition of ferrous and non-ferrous alloys:\nA ferrous alloy contains iron (Fe) as its principal base constituent.\n\nStep 2: Composition and properties of Invar:\nInvar is a ferrous alloy composed of ~64% Iron (Fe) and ~36% Nickel (Ni), along with small traces of carbon.\nIts name derives from 'invariable' because of its remarkably low coefficient of thermal expansion near room temperature (~1.2 × 10⁻⁶ K⁻¹).\n\nStep 3: Other given alloys:\n- Solder: Pb + Sn (non-ferrous)\n- Magnalium: Al + Mg (non-ferrous)\n- Duralumin: Al + Cu + Mg + Mn (non-ferrous)\n\nStep 4: Therefore, Invar is the ferrous alloy.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4447,
    data: {
      question: "Consider the following statements regarding f-block lanthanoid elements:\n(I) La(OH)₃ is the least basic while Lu(OH)₃ is the most basic hydroxide among lanthanoids.\n(II) Zr⁴⁺ (radius 80 pm) and Hf⁴⁺ (radius 79 pm) have nearly identical ionic radii due to lanthanoid contraction.\n(III) Ce⁴⁺ has a noble gas configuration [Xe] 4f⁰ and acts as a strong oxidizing agent in aqueous solution.\nWhich of the above statements are correct?",
      option_a: "(I) and (II) only",
      option_b: "(II) and (III) only",
      option_c: "(I) and (III) only",
      option_d: "(I), (II), and (III)",
      "correct_option": "B",
      explanation: "Step 1: Evaluate statement (I):\nDue to lanthanoid contraction, the ionic radius of Ln³⁺ decreases continuously from La³⁺ (103 pm) to Lu³⁺ (86 pm). By Fajan's rules, the smaller cation Lu³⁺ has higher polarizing power, increasing covalent character of the Lu–OH bond. Consequently, basic strength decreases from La(OH)₃ to Lu(OH)₃. Thus, La(OH)₃ is the MOST basic and Lu(OH)₃ is the LEAST basic. Statement (I) is INCORRECT.\n\nStep 2: Evaluate statement (II):\nThe steady decrease in ionic radii across the 4f series (lanthanoid contraction) cancels out the expected size increase going from the second (4d) to third (5d) transition series. Thus, Zr⁴⁺ and Hf⁴⁺ have nearly identical radii and very similar chemical properties. Statement (II) is CORRECT.\n\nStep 3: Evaluate statement (III):\nCerium has ground state configuration [Xe] 4f¹ 5d¹ 6s². Ce⁴⁺ loses four electrons to achieve the noble gas [Xe] 4f⁰ configuration. However, the most stable oxidation state for all lanthanoids is +3 (E° for Ce⁴⁺/Ce³⁺ = +1.74 V). Hence, Ce⁴⁺ readily reduces to Ce³⁺, acting as a powerful one-electron oxidizing agent. Statement (III) is CORRECT.\n\nStep 4: Therefore, only statements (II) and (III) are correct.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4448,
    data: {
      question: "When Nessler's reagent (alkaline solution of K₂[HgI₄]) is added to an aqueous ammonium salt solution, a characteristic brown precipitate of the iodide of Millon's base is formed. What is the chemical formula of the iodide of Millon's base?",
      option_a: "K₂[HgI₄]",
      option_b: "[Hg₂N]I·H₂O or [O(Hg)₂NH₂]I",
      option_c: "Hg(NH₂)I",
      option_d: "Hg₂I₂",
      "correct_option": "B",
      explanation: "Step 1: Nessler's test for ammonium ion:\nNessler's reagent is an alkaline solution of potassium tetraiodomercurate(II), K₂[HgI₄] in KOH/NaOH.\n\nStep 2: Reaction with ammonia:\n2K₂[HgI₄] + NH₃ + 3KOH → [Hg₂N]I·H₂O ↓ + 7KI + 2H₂O\nor formulated as [O(Hg)₂NH₂]I (oxydimercuric ammonium iodide).\n\nStep 3: This compound is known as the iodide of Millon's base and appears as a distinctive reddish-brown precipitate, providing an extremely sensitive analytical test for NH₄⁺/NH₃.\n\nStep 4: Therefore, the formula is [Hg₂N]I·H₂O or [O(Hg)₂NH₂]I.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4449,
    data: {
      question: "Which alloy steel containing chromium (12-20%) and nickel (~8%) is widely used for manufacturing surgical instruments, cooking utensils, and automobile parts due to its corrosion resistance?",
      option_a: "Stainless steel",
      option_b: "Invar",
      option_c: "Tungsten steel",
      option_d: "Manganese steel",
      "correct_option": "A",
      explanation: "Step 1: Stainless steel is an alloy of iron with chromium (usually 12-20%), nickel (~8%), and carbon (~0.1-0.2%).\n\nStep 2: The chromium present forms a very thin, invisible, adherent, and self-healing passive oxide film (Cr₂O₃) on the steel surface that prevents atmospheric corrosion and rust formation.\n\nStep 3: Because of its chemical resistance and luster, stainless steel is the material of choice for kitchen utensils, surgical equipment, cutlery, and automobile trim parts.\n\nStep 4: Therefore, stainless steel is the correct alloy.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4450,
    data: {
      question: "Which gold alloy is commonly used as a commercial substitute for expensive platinum in making fine jewellery?",
      option_a: "Rolled gold",
      option_b: "White gold",
      option_c: "Purple of Cassius",
      option_d: "Mosaic gold",
      "correct_option": "B",
      explanation: "Step 1: Platinum is a dense, corrosion-resistant, silvery-white precious metal used in jewellery.\n\nStep 2: White gold is an alloy of yellow gold (Au) with at least one white metal, typically nickel (Ni), palladium (Pd), or platinum itself, often coated with rhodium for high brilliance.\n\nStep 3: Because it closely mimics the silvery-white appearance of platinum at a lower cost, white gold is widely utilized as a substitute for platinum in the jewellery industry.\n\nStep 4: Therefore, white gold is the substitute for platinum.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4451,
    data: {
      question: "What is the highest oxidation state exhibited by transition metals in their stable chemical compounds, and which elements show it?",
      option_a: "+7 (by Mn and Tc)",
      option_b: "+8 (by Os and Ru)",
      option_c: "+6 (by Cr and Mo)",
      option_d: "+5 (by V and Nb)",
      "correct_option": "B",
      explanation: "Step 1: Across the transition series, the maximum oxidation state increases up to the middle of the d-block and reaches a maximum for elements with the greatest number of valence electrons (combining ns and (n-1)d electrons).\n\nStep 2: In the 3d series, manganese reaches +7 in MnO₄⁻.\n\nStep 3: In the 4d and 5d series, ruthenium (Ru) and osmium (Os) of Group 8 have valence configurations 4d⁷ 5s¹ and 5d⁶ 6s² (8 valence electrons). They can involve all 8 valence electrons in bonding to highly electronegative oxygen atoms to form stable tetroxides:\n- Osmium tetroxide (OsO₄)\n- Ruthenium tetroxide (RuO₄)\nIn these compounds, Os and Ru exhibit an oxidation state of +8.\n\nStep 4: Therefore, +8 is the highest oxidation state exhibited by transition metals.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4452,
    data: {
      question: "When dry chlorine (Cl₂) gas is passed over freshly precipitated and dried mercuric oxide (HgO) at room temperature, which halogen oxide is produced?",
      option_a: "Dichlorine monoxide, Cl₂O",
      option_b: "Chlorine dioxide, ClO₂",
      option_c: "Dichlorine hexoxide, Cl₂O₆",
      option_d: "Dichlorine heptoxide, Cl₂O₇",
      "correct_option": "A",
      explanation: "Step 1: Preparation of dichlorine monoxide (Cl₂O):\nDichlorine monoxide is classically prepared by passing dry chlorine gas through freshly prepared mercuric oxide (HgO) at approximately 273 K:\n2Cl₂ + 2HgO → Cl₂O + HgO·HgCl₂\nor 2Cl₂ + HgO → Cl₂O + HgCl₂\n\nStep 2: The reaction yields gaseous dichlorine monoxide (Cl₂O), which condenses as a brownish-yellow gas / orange liquid, along with mercuric oxychloride or mercuric chloride.\n\nStep 3: Therefore, dichlorine monoxide (Cl₂O) is produced.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4453,
    data: {
      question: "Which of the following electronic configurations corresponds to a typical transition metal in its ground state?",
      option_a: "[Ar] 3d⁵ 4s¹",
      option_b: "[Ar] 3d¹⁰ 4s² 4p³",
      option_c: "[Ar] 3d¹⁰ 4s² 4p¹",
      option_d: "[Kr] 4d¹⁰ 5s² 5p⁵",
      "correct_option": "A",
      explanation: "Step 1: By definition, a transition element is an element having an incompletely filled d-subshell in its ground state or in any of its common oxidation states.\n\nStep 2: Analyze each configuration:\n- Option A: [Ar] 3d⁵ 4s¹ corresponds to Chromium (Cr, Z = 24). It has an incompletely filled 3d subshell (3d⁵), placing it directly in the d-block as a transition metal.\n- Option B: [Ar] 3d¹⁰ 4s² 4p³ corresponds to Arsenic (As, Z = 33), a p-block representative element.\n- Option C: [Ar] 3d¹⁰ 4s² 4p¹ corresponds to Gallium (Ga, Z = 31), a p-block element.\n- Option D: [Kr] 4d¹⁰ 5s² 5p⁵ corresponds to Iodine (I, Z = 53), a p-block halogen.\n\nStep 3: Therefore, [Ar] 3d⁵ 4s¹ belongs to a transition element.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4454,
    data: {
      question: "A divalent transition metal ion (M²⁺) of the 3d series has an observed spin-only magnetic moment of approximately √15 BM (~3.87 BM). How many unpaired electrons are present in the d-subshell of this ion?",
      option_a: "3",
      option_b: "4",
      option_c: "2",
      option_d: "1",
      "correct_option": "A",
      explanation: "Step 1: The spin-only magnetic moment (μ_s) of a transition metal ion is given by the formula:\nμ_s = √[n(n + 2)] Bohr Magnetons (BM)\nwhere n is the number of unpaired electrons.\n\nStep 2: Given μ_s = √15 BM:\n√[n(n + 2)] = √15\nn(n + 2) = 15\nn² + 2n - 15 = 0\n(n + 5)(n - 3) = 0\nSince the number of unpaired electrons must be positive, n = 3.\n\nStep 3: An example of such an ion is Cr³⁺ ([Ar] 3d³) or Co²⁺ ([Ar] 3d⁷, high spin), each having 3 unpaired electrons.\n\nStep 4: Therefore, the number of unpaired electrons is 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4455,
    data: {
      question: "Which of the following statements regarding transition metals is INCORRECT?",
      option_a: "They are malleable and ductile with high electrical and thermal conductivity",
      option_b: "They exhibit high melting and boiling points due to participation of both (n-1)d and ns electrons in metallic bonding",
      option_c: "They crystallize exclusively in body-centered cubic (bcc) and hexagonal close-packed (hcp) crystal lattices only",
      option_d: "They show variable oxidation states due to the comparable energies of (n-1)d and ns orbitals",
      "correct_option": "C",
      explanation: "Step 1: Analyze statement (A):\nTransition metals are typical electropositive metals possessing metallic luster, high ductility, malleability, and excellent thermal and electrical conductivities. (Correct)\n\nStep 2: Analyze statement (B):\nThe involvement of unpaired (n-1)d electrons alongside valence ns electrons gives rise to strong metallic bonding, resulting in high enthalpies of atomization, high densities, and high melting/boiling points. (Correct)\n\nStep 3: Analyze statement (C):\nTransition metals exhibit diverse close-packed structures, including face-centered cubic (fcc / ccp, e.g., Cu, Ag, Au, Ni, Pt), body-centered cubic (bcc, e.g., V, Cr, Fe, Mo, W), and hexagonal close-packed (hcp, e.g., Ti, Zr, Co, Zn). Stating that they crystallize exclusively in bcc and hcp only is factually incorrect.\n\nStep 4: Analyze statement (D):\nThe energy difference between (n-1)d and ns orbitals is small, allowing both sets of electrons to be utilized in bond formation, giving rise to multiple variable oxidation states. (Correct)\n\nStep 5: Hence, statement (C) is the incorrect statement.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4456,
    data: {
      question: "The formation of a colored solution by transition metal ions in aqueous medium is primarily attributed to:",
      option_a: "Completely paired electrons in the valence shell",
      option_b: "Presence of unpaired d-electrons undergoing d–d electronic transitions within split d-orbitals",
      option_c: "High density of the transition metal",
      option_d: "Emission of alpha particles by radioactive isotopes",
      "correct_option": "B",
      explanation: "Step 1: When a transition metal ion is surrounded by water molecules (acting as ligands in an octahedral field), the degenerate five d-orbitals split into two sets of different energies: the lower energy t₂g set and the higher energy e_g set.\n\nStep 2: If the metal ion has an incompletely filled d-subshell (1 to 9 d-electrons, i.e., possessing unpaired d-electrons), an electron can absorb light of a specific wavelength in the visible region to promote from the t₂g to the e_g orbital (a d–d transition).\n\nStep 3: The transmitted light (the complementary color to the absorbed wavelength) is perceived by the eye as the color of the complex solution.\n\nStep 4: Metal ions with completely empty (d⁰, e.g., Sc³⁺, Ti⁴⁺) or completely filled (d¹⁰, e.g., Zn²⁺, Cu⁺) d-subshells cannot undergo d–d transitions and are colorless.\n\nStep 5: Therefore, color is due to the presence of unpaired d-electrons undergoing d–d transitions.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 71 Part 1 questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 71 Part 1 questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
