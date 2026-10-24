const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 4383,
    similarQuestion: {
      question: "Which of the following boron trihalides is the strongest Lewis acid and consequently forms the most stable adduct with ammonia (NH₃)?",
      option_a: "BI₃",
      option_b: "BBr₃",
      option_c: "BCl₃",
      option_d: "BF₃",
      correct_option: "A",
      explanation: "Step 1: The Lewis acidity of boron trihalides depends on the extent of pπ–pπ back-bonding from the halogen lone pair into the empty 2p orbital of boron.\nStep 2: In BF₃, 2p(F) to 2p(B) overlap is extremely effective, strongly quenching the electron deficiency.\nStep 3: In BI₃, the large 5p orbital of iodine overlaps very poorly with the small 2p orbital of boron, resulting in negligible back-bonding.\nStep 4: Therefore, the order of Lewis acidity is BF₃ < BCl₃ < BBr₃ < BI₃, making BI₃ the strongest Lewis acid and releasing maximum heat of adduct formation with NH₃.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4384,
    similarQuestion: {
      question: "Which of the following properties illustrates the diagonal relationship between boron and silicon?",
      option_a: "Both form gaseous hydrides (boranes and silanes) that spontaneously combust in air and are hydrolysed by water",
      option_b: "Both form basic oxides",
      option_c: "Both are good metallic conductors at room temperature",
      option_d: "Both chlorides (BCl₃ and SiCl₄) resist hydrolysis by water",
      correct_option: "A",
      explanation: "Step 1: Boron and silicon exhibit a diagonal relationship due to similar charge-to-size ratios and electronegativities.\nStep 2: Both elements are non-metals/metalloids that form covalent, volatile hydrides (boranes and silanes) which catch fire spontaneously in air and are readily decomposed by water.\nStep 3: Furthermore, both form acidic oxides (B₂O₃ and SiO₂) and both form covalent chlorides that readily hydrolyse.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4385,
    similarQuestion: {
      question: "Anhydrous aluminum chloride (AlCl₃) is a predominantly covalent solid; however, when dissolved in water, it exists as an ionic conducting solution containing [Al(H₂O)₆]³⁺ and Cl⁻. This transformation occurs because:",
      option_a: "The high hydration enthalpy of Al³⁺ is sufficiently large to overcome the lattice and ionization energies",
      option_b: "Aluminum undergoes sublimation",
      option_c: "Water acts as a reducing agent",
      option_d: "Aluminum chloride forms a dimer in water",
      correct_option: "A",
      explanation: "Step 1: In the anhydrous solid state, the sum of the first three ionization energies of aluminum is too high to form a purely ionic lattice; hence, AlCl₃ is covalent.\nStep 2: When added to water, the very small size and high +3 charge of the Al³⁺ cation result in an enormous hydration enthalpy: ΔH_hydration(Al³⁺) ≈ −4665 kJ mol⁻¹.\nStep 3: This large exothermic release of hydration energy readily overcomes the energy required to break covalent bonds, stabilizing the octahedral [Al(H₂O)₆]³⁺ aquo ion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4386,
    similarQuestion: {
      question: "In the crystalline structure of borax, Na₂[B₄O₅(OH)₄]·8H₂O, the polyborate anion contains:",
      option_a: "Two tetrahedral [BO₄] units and two planar triangular [BO₃] units",
      option_b: "Four tetrahedral [BO₄] units",
      option_c: "Four planar triangular [BO₃] units",
      option_d: "Three tetrahedral and one triangular unit",
      correct_option: "A",
      explanation: "Step 1: The true structural formula of borax is Na₂[B₄O₅(OH)₄]·8H₂O.\nStep 2: The tetranuclear borate anion consists of a six-membered B−O ring with a bridging oxygen atom across it.\nStep 3: Two boron atoms are sp³ hybridized with tetrahedral coordination ([BO₄]), and two boron atoms are sp² hybridized with trigonal planar coordination ([BO₃]).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4387,
    similarQuestion: {
      question: "Which of the following statements regarding the molecular structure of diborane (B₂H₆) is INCORRECT?",
      option_a: "The bridging B−H−B bond angle is exactly 180°",
      option_b: "Each boron atom is approximately sp³ hybridized",
      option_c: "There are four terminal 2-center-2-electron (2c–2e) B−H bonds",
      option_d: "There are two bridging 3-center-2-electron (3c–2e) B−H−B banana bonds",
      correct_option: "A",
      explanation: "Step 1: In diborane (B₂H₆), each boron atom is approximately sp³ hybridized.\nStep 2: The four terminal B−H bonds are regular 2-center-2-electron (2c–2e) single covalent bonds.\nStep 3: The two bridging hydrogen atoms lie above and below the B₂H₄ plane, forming bent 3-center-2-electron (3c–2e) banana bonds where the B−H−B angle is approximately 97°, not 180°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4388,
    similarQuestion: {
      question: "Why is it inadvisable to clean aluminum utensils using strongly alkaline detergents such as washing soda (Na₂CO₃)?",
      option_a: "The alkaline solution dissolves the protective aluminum oxide film to produce soluble aluminate ions",
      option_b: "Washing soda acts as a reducing agent to form aluminum metal",
      option_c: "It forms an explosive gas mixture of oxygen and nitrogen",
      option_d: "It makes aluminum porous by absorbing moisture",
      correct_option: "A",
      explanation: "Step 1: Washing soda (Na₂CO₃) hydrolyses in water to form a strongly basic solution of NaOH.\nStep 2: The amphoteric protective oxide layer on aluminum (Al₂O₃) dissolves in strong base: Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄].\nStep 3: Once the protective film is removed, the exposed aluminum metal reacts with alkali to generate soluble sodium tetrahydroxoaluminate and H₂ gas, corroding the vessel.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4389,
    similarQuestion: {
      question: "Which of the following statements concerning anhydrous aluminum chloride (AlCl₃) is correct?",
      option_a: "In the vapour phase at moderate temperatures, it exists as a dimer (Al₂Cl₆) containing coordinate bridging chlorine bonds",
      option_b: "It is a strong Lewis base",
      option_c: "It does not fume in moist air",
      option_d: "Aluminum is hexacoordinated in vapour phase",
      correct_option: "A",
      explanation: "Step 1: In vapour phase below 400°C, AlCl₃ achieves octet stability by dimerizing into Al₂Cl₆.\nStep 2: In the dimer, each aluminum atom is tetracoordinated through two bridging chlorine dative bonds.\nStep 3: At very high temperatures (>800°C), Al₂Cl₆ dissociates into trigonal planar monomeric AlCl₃.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4390,
    similarQuestion: {
      question: "In the borax bead test with cobalt oxide, the characteristic deep blue bead formed is composed of:",
      option_a: "Cobalt metaborate, Co(BO₂)₂",
      option_b: "Cobalt orthoborate, Co₃(BO₃)₂",
      option_c: "Cobalt tetraborate, CoB₄O₇",
      option_d: "Cobalt oxide, CoO",
      correct_option: "A",
      explanation: "Step 1: When borax is heated on a platinum wire loop, it first swells and then melts into a transparent glassy bead containing B₂O₃ and NaBO₂.\nStep 2: When heated with cobalt oxide (CoO), boric anhydride reacts:\nCoO + B₂O₃ → Co(BO₂)₂\nStep 3: Cobalt metaborate gives the bead an intense blue color.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4391,
    similarQuestion: {
      question: "In the extraction of elemental boron from borax, the sequence involves reacting borax with concentrated acid to produce orthoboric acid (H₃BO₃), followed by heating to obtain boric oxide (B₂O₃). Which reducing agent is commonly used to reduce B₂O₃ to elemental boron?",
      option_a: "Magnesium (Mg)",
      option_b: "Carbon monoxide (CO)",
      option_c: "Copper (Cu)",
      option_d: "Iron (Fe)",
      correct_option: "A",
      explanation: "Step 1: Borax + 2HCl + 5H₂O → 2NaCl + 4H₃BO₃.\nStep 2: Heating orthoboric acid yields boric oxide: 2H₃BO₃ → B₂O₃ + 3H₂O.\nStep 3: Reduction of B₂O₃ is carried out by heating with electropositive magnesium powder: B₂O₃ + 3Mg → 2B + 3MgO.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4392,
    similarQuestion: {
      question: "When amphoteric aluminum hydroxide, Al(OH)₃, dissolves in an excess of aqueous sodium hydroxide, the predominant complex aluminate anion formed is:",
      option_a: "[Al(OH)₄]⁻ (or [Al(H₂O)₂(OH)₄]⁻)",
      option_b: "[Al(OH)₆]³⁺",
      option_c: "[AlO₂]²⁻",
      option_d: "[Al(H₂O)₆]³⁺",
      correct_option: "A",
      explanation: "Step 1: Al(OH)₃ is amphoteric and dissolves in strong base:\nAl(OH)₃(s) + OH⁻(aq) → [Al(OH)₄]⁻(aq)\nStep 2: In aqueous solution, this species coordinates two water molecules to form the hexacoordinated diaquatetrahydroxoaluminate(III) complex ion: [Al(H₂O)₂(OH)₄]⁻.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4393,
    similarQuestion: {
      question: "Borazine (B₃N₃H₆), commonly known as 'inorganic benzene', possesses which molecular geometry?",
      option_a: "Planar six-membered hexagonal ring with delocalized π-electrons",
      option_b: "Non-planar chair conformation",
      option_c: "Non-planar boat conformation",
      option_d: "Linear polymer",
      correct_option: "A",
      explanation: "Step 1: Borazine (B₃N₃H₆) has an alternating boron-nitrogen cyclic framework.\nStep 2: Both boron and nitrogen atoms are sp² hybridized, forming a completely planar six-membered ring isoelectronic and isostructural with benzene.\nStep 3: Aromatic π-delocalization occurs via lone pairs on nitrogen donating into vacant 2p orbitals on boron.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4394,
    similarQuestion: {
      question: "In the cyclic polyborate anion of borax, [B₄O₅(OH)₄]²⁻, how many B−O−B bridging linkages are present in each discrete anion?",
      option_a: "5",
      option_b: "4",
      option_c: "3",
      option_d: "6",
      correct_option: "A",
      explanation: "Step 1: The structure of [B₄O₅(OH)₄]²⁻ consists of two fused six-membered rings.\nStep 2: Four B−O−B bridges form the perimeter of the fused bicyclic ring, and a fifth central B−O−B bridge spans between the two tetrahedral boron atoms.\nStep 3: Thus, exactly 5 B−O−B bridging oxygen linkages are present.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4395,
    similarQuestion: {
      question: "Orthoboric acid (H₃BO₃) behaves as a very weak monobasic Lewis acid in water, but it can be titrated sharply against NaOH in the presence of:",
      option_a: "Glycerol or mannitol (cis-polyols)",
      option_b: "Ethanol",
      option_c: "Formic acid",
      option_d: "Benzene",
      correct_option: "A",
      explanation: "Step 1: Boric acid ionizes weakly by abstracting OH⁻ from water: B(OH)₃ + 2H₂O ⇌ [B(OH)₄]⁻ + H₃O⁺.\nStep 2: Polyhydroxy compounds having cis-1,2-diols (such as glycerol, mannitol, or catechols) react with [B(OH)₄]⁻ to form very stable bicyclic chelate complexes.\nStep 3: This drives the equilibrium completely to the right, releasing free H₃O⁺ and allowing quantitative titration against standard NaOH using phenolphthalein.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4396,
    similarQuestion: {
      question: "Which of the following metal ions will NOT give a characteristic coloured bead in the borax bead test?",
      option_a: "Zn²⁺",
      option_b: "Cu²⁺",
      option_c: "Co²⁺",
      option_d: "Ni²⁺",
      correct_option: "A",
      explanation: "Step 1: The borax bead test depends on the formation of coloured transition metal metaborates via d–d electronic transitions.\nStep 2: Cu²⁺ gives blue/red beads, Co²⁺ gives deep blue beads, and Ni²⁺ gives brownish beads.\nStep 3: Zn²⁺ has a completely filled 3d¹⁰ configuration, which does not undergo d–d transitions, yielding only a colourless bead in both oxidizing and reducing flames.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4397,
    similarQuestion: {
      question: "Aluminum reacts with dilute aqueous hydrochloric acid (producing solution X and gas P) and also reacts with aqueous sodium hydroxide (producing solution Y and gas Q). Which statement is correct?",
      option_a: "Both gas P and gas Q are hydrogen gas (H₂)",
      option_b: "Gas P is chlorine while gas Q is hydrogen",
      option_c: "Gas P is oxygen while gas Q is hydrogen",
      option_d: "Aluminum dissolves in acid but does not dissolve in alkali",
      correct_option: "A",
      explanation: "Step 1: Reaction with acid:\n2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)  =>  Gas P is H₂.\n\nStep 2: Reaction with alkali:\n2Al(s) + 2NaOH(aq) + 6H₂O(l) → 2Na[Al(OH)₄](aq) + 3H₂(g)  =>  Gas Q is H₂.\n\nStep 3: Because aluminum is amphoteric, it evolves hydrogen gas (H₂) in both reactions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4398,
    similarQuestion: {
      question: "Diborane (B₂H₆) reacts with excess ammonia (NH₃) at low temperature followed by heating to high temperatures (~473 K) to yield:",
      option_a: "Borazine (B₃N₃H₆)",
      option_b: "Boron nitride (BN)_x",
      option_c: "Boric acid (H₃BO₃)",
      option_d: "Ammonium borate",
      correct_option: "A",
      explanation: "Step 1: At low temperature, B₂H₆ reacts with NH₃ via unsymmetrical cleavage to form an ionic diammoniate adduct: [H₂B(NH₃)₂]⁺[BH₄]⁻.\nStep 2: When heated to ~473 K (200°C), this adduct undergoes dehydrogenation to produce borazine:\n3B₂H₆ + 6NH₃ → 2B₃N₃H₆ + 12H₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4399,
    similarQuestion: {
      question: "Due to the inert pair effect, the stability of the +1 oxidation state among Group 13 elements increases in the order:",
      option_a: "Al < Ga < In < Tl",
      option_b: "Tl < In < Ga < Al",
      option_c: "In < Tl < Ga < Al",
      option_d: "Ga < Al < In < Tl",
      correct_option: "A",
      explanation: "Step 1: In Group 13, the reluctance of the valence s-electrons to participate in bonding increases down the group due to poor shielding by inner d and f electrons.\nStep 2: Consequently, the stability of the group oxidation state (+3) decreases down the group, while that of the lower (+1) oxidation state increases.\nStep 3: Thus, the stability of +1 increases as: Al⁺ < Ga⁺ < In⁺ < Tl⁺ (Tl⁺ is the most stable species).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4400,
    similarQuestion: {
      question: "Hydrolysis of dialkyl dichlorosilane, R₂SiCl₂, followed by condensation polymerization, produces:",
      option_a: "Straight-chain (linear) silicone polymers",
      option_b: "Three-dimensional cross-linked silicones",
      option_c: "Dimeric disiloxanes only",
      option_d: "Cyclic silicates",
      correct_option: "A",
      explanation: "Step 1: Hydrolysis of R₂SiCl₂ replaces both chlorine atoms with hydroxyl groups to form dialkylsilanediol: R₂Si(OH)₂.\nStep 2: Condensation polymerization of bifunctional R₂Si(OH)₂ involves intermolecular loss of water from both ends, forming linear silicones: −(SiR₂−O−SiR₂−O)ₙ−.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4401,
    similarQuestion: {
      question: "Among the dioxides of Group 14 elements (CO₂, SiO₂, GeO₂, SnO₂, PbO₂), which dioxide exhibits the most amphoteric/basic character?",
      option_a: "PbO₂",
      option_b: "SiO₂",
      option_c: "CO₂",
      option_d: "GeO₂",
      correct_option: "A",
      explanation: "Step 1: Down Group 14, metallic character increases and the ionic nature of oxides increases.\nStep 2: CO₂ and SiO₂ are purely acidic, GeO₂ is distinctly acidic, SnO₂ is amphoteric, and PbO₂ is amphoteric with the highest basic character among the group dioxides.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4402,
    similarQuestion: {
      question: "In sheet silicates (phyllosilicates) with empirical formula unit (Si₂O₅)ₙ^(2n−), how many oxygen atoms of each [SiO₄]⁴⁻ tetrahedron are shared with adjacent tetrahedra?",
      option_a: "3",
      option_b: "2",
      option_c: "1",
      option_d: "4",
      correct_option: "A",
      explanation: "Step 1: In a sheet silicate, three oxygen atoms of each [SiO₄]⁴⁻ tetrahedron are shared with neighboring tetrahedra in the basal plane.\nStep 2: This sharing yields a repeating two-dimensional network with empirical formula (Si₂O₅)ₙ^(2n−) (e.g., in talc, mica, and kaolinite).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4403,
    similarQuestion: {
      question: "In double-chain silicates (amphiboles) such as asbestos, what is the average number of shared oxygen vertices per [SiO₄] tetrahedron?",
      option_a: "2.5",
      option_b: "2.0",
      option_c: "3.0",
      option_d: "4.0",
      correct_option: "A",
      explanation: "Step 1: An amphibole structure consists of two parallel single chains cross-linked together.\nStep 2: Alternating tetrahedra share 2 and 3 corners: half of the tetrahedra share 2 oxygen atoms and the other half share 3 oxygen atoms.\nStep 3: The average number of shared oxygen corners is (2 + 3) / 2 = 2.5 per tetrahedron, giving the repeating unit [Si₄O₁₁]ₙ⁶ⁿ⁻.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4404,
    similarQuestion: {
      question: "When three [SiO₄]⁴⁻ tetrahedra join linearly by sharing two oxygen corners, what is the chemical formula and total charge of the resulting pyrosilicate/chain anion?",
      option_a: "[Si₃O₁₀]⁸⁻",
      option_b: "[Si₃O₉]⁶⁻",
      option_c: "[Si₂O₇]⁶⁻",
      option_d: "[SiO₃]²⁻",
      correct_option: "A",
      explanation: "Step 1: Three unshared tetrahedra contribute 3 × [SiO₄]⁴⁻ = Si₃O₁₂¹²⁻.\nStep 2: Sharing two bridging oxygen atoms reduces the oxygen count by 2 and the negative charge by 2 × 2 = 4.\nStep 3: The resulting trimeric linear silicate anion is [Si₃O₁₀]⁸⁻.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4405,
    similarQuestion: {
      question: "Arrange the following species in order of increasing carbon-carbon (C−C) bond length: Ethane, Ethylene, Acetylene, Benzene",
      option_a: "Acetylene < Ethylene < Benzene < Ethane",
      option_b: "Ethane < Benzene < Ethylene < Acetylene",
      option_c: "Acetylene < Benzene < Ethylene < Ethane",
      option_d: "Ethylene < Acetylene < Benzene < Ethane",
      correct_option: "A",
      explanation: "Step 1: Bond length decreases with increasing bond order and higher s-character:\n- Acetylene (C≡C, triple bond, sp): 1.20 Å\n- Ethylene (C=C, double bond, sp²): 1.34 Å\n- Benzene (C−C partial double bond, order 1.5): 1.39 Å\n- Ethane (C−C, single bond, sp³): 1.54 Å\nStep 2: The increasing order of C−C bond length is Acetylene < Ethylene < Benzene < Ethane.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4406,
    similarQuestion: {
      question: "In which class of silicates does each [SiO₄]⁴⁻ tetrahedron share exactly three of its oxygen vertices with neighboring tetrahedra to form an infinite two-dimensional planar sheet?",
      option_a: "Sheet silicates (phyllosilicates)",
      option_b: "Orthosilicates",
      option_c: "Pyrosilicates",
      option_d: "Cyclic silicates",
      correct_option: "A",
      explanation: "Step 1: In sheet silicates (phyllosilicates), each [SiO₄] tetrahedron shares 3 of its oxygen atoms with adjacent tetrahedra, leaving only one unshared apical oxygen.\nStep 2: This creates continuous 2D hexagonal sheets characterized by the unit (Si₂O₅)ₙ^(2n−).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4407,
    similarQuestion: {
      question: "Which of the following silicate structural classes involve the sharing of exactly two oxygen vertices per [SiO₄] tetrahedron?",
      option_a: "Both cyclic silicates (e.g., [Si₃O₉]⁶⁻) and single-chain pyroxenes (e.g., [SiO₃]ₙ^(2n−))",
      option_b: "Sheet silicates and 3D network silicates",
      option_c: "Orthosilicates and pyrosilicates",
      option_d: "Double-chain amphiboles only",
      correct_option: "A",
      explanation: "Step 1: In cyclic silicates (such as beryl, [Si₆O₁₈]¹²⁻), each tetrahedron shares 2 oxygen corners to close into a ring.\nStep 2: In single-chain silicates (pyroxenes, [SiO₃]ₙ^(2n−)), each tetrahedron also shares 2 oxygen corners along the linear chain.\nStep 3: Hence, both classes share exactly two corners per tetrahedron.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Login successful for Set 70 Part 1.');

    for (let i = 0; i < questionsPart1.length; i++) {
      const q = questionsPart1[i];
      const res = await fetch(`${BASE_URL}/admin/practice-questions/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ similarQuestion: q.similarQuestion })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed on ID ${q.id} [${res.status}]: ${text}`);
      }
      console.log(`Updated question ${i + 1}/${questionsPart1.length} (ID: ${q.id})`);
    }
    console.log('Set 70 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 70 Part 1:', err.message);
  }
}

run();
