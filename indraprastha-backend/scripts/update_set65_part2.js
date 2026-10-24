const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart2 = [
  {
    id: 4508,
    similarQuestion: {
      question: "In a binary crystalline compound, oxide ions (O²⁻) form a cubic close-packed (ccp) array, and metal cations (M) occupy all the tetrahedral voids. What is the empirical formula of the oxide?",
      option_a: "MO",
      option_b: "M₂O",
      option_c: "MO₂",
      option_d: "M₂O₃",
      correct_option: "B",
      explanation: "Step 1: Let the number of oxide ions forming the ccp array be N.\nStep 2: In any close-packed array of N spheres, the total number of tetrahedral voids is 2N.\nStep 3: Since cations M occupy all the tetrahedral voids, the number of M atoms is 2N.\nStep 4: The stoichiometric ratio is M : O = 2N : N = 2 : 1. Hence, the empirical formula is M₂O.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4509,
    similarQuestion: {
      question: "Which of the following stacking sequences of close-packed atomic planes does NOT represent a close-packed three-dimensional structure?",
      option_a: "ABACABAC...",
      option_b: "ABCABC...",
      option_c: "ABBAABBA...",
      option_d: "ABCBCABCBC...",
      correct_option: "C",
      explanation: "Step 1: In three-dimensional close packing of identical spheres, adjacent layers cannot be identical (e.g., BB or AA placed directly atop each other) because the spheres of the upper layer must rest in the depressions between spheres of the lower layer.\nStep 2: In the sequence ABBAABBA..., a B layer sits directly on another B layer, which violates close packing geometry.\nStep 3: Therefore, ABBAABBA... does not generate a close-packed lattice.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4510,
    similarQuestion: {
      question: "If N atoms constitute a cubic close-packed (ABCABC...) crystal structure, what is the total number of tetrahedral voids generated in the crystal?",
      option_a: "N",
      option_b: "2N",
      option_c: "N/2",
      option_d: "4N",
      correct_option: "B",
      explanation: "Step 1: In any close-packed structure (ccp or hcp), each constituent atom is associated with 2 tetrahedral voids.\nStep 2: Therefore, for a total of N atoms in a ccp array, the total number of tetrahedral voids formed is 2N.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4511,
    similarQuestion: {
      question: "In a face-centered cubic (ccp) unit cell of identical atoms, what is the effective number of octahedral voids per unit cell?",
      option_a: "1",
      option_b: "2",
      option_c: "4",
      option_d: "8",
      correct_option: "C",
      explanation: "Step 1: An FCC unit cell contains Z = 4 constituent atoms.\nStep 2: In any close-packed structure, the number of octahedral voids equals the number of constituent atoms (N_oct = Z = 4).\nStep 3: These voids are located at the 12 edge centers (12 × 1/4 = 3) and at the body center (1 × 1 = 1), giving 3 + 1 = 4 octahedral voids.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4512,
    similarQuestion: {
      question: "A void formed by the intersection of two triangular voids of adjacent close-packed layers pointing in opposite directions, surrounded by six spheres, is called an:",
      option_a: "Octahedral void",
      option_b: "Tetrahedral void",
      option_c: "Trigonal void",
      option_d: "Cubic void",
      correct_option: "A",
      explanation: "Step 1: When a triangular void of three touching spheres in one layer is overlapped by another triangular void of three spheres pointing in opposite directions in the adjacent layer, an interstitial void enclosed by 6 spheres is created.\nStep 2: Connecting the centers of these 6 spheres defines the vertices of a regular octahedron.\nStep 3: Hence, this cavity is called an octahedral void.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4513,
    similarQuestion: {
      question: "In a primitive simple cubic lattice, the vacant space located at the exact center of the eight corner spheres is known as a:",
      option_a: "Cubic void",
      option_b: "Octahedral void",
      option_c: "Tetrahedral void",
      option_d: "Trigonal bipyramidal void",
      correct_option: "A",
      explanation: "Step 1: In a simple cubic unit cell, 8 spheres are located at the corners of a cube, touching along the cube edges.\nStep 2: The central interstitial site is equidistant from all 8 surrounding spheres.\nStep 3: This 8-coordinate interstitial void is called a cubic void.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4514,
    similarQuestion: {
      question: "In any three-dimensional close-packed lattice of hard spheres, which relation accurately connects the number of tetrahedral voids (T) and octahedral voids (O) to the number of close-packed spheres (N)?",
      option_a: "T = 2N and O = N",
      option_b: "T = N and O = 2N",
      option_c: "T = 4N and O = N",
      option_d: "T = N and O = N/2",
      correct_option: "A",
      explanation: "Step 1: In both ccp (fcc) and hcp three-dimensional close-packed lattices, the distribution of interstitial voids follows a fixed stoichiometric rule.\nStep 2: For N close-packed spheres, there are always twice as many tetrahedral voids (T = 2N) and an equal number of octahedral voids (O = N).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4515,
    similarQuestion: {
      question: "What is the coordination number of an interstitial site situated in an octahedral void?",
      option_a: "4",
      option_b: "6",
      option_c: "8",
      option_d: "12",
      correct_option: "B",
      explanation: "Step 1: An octahedral void is formed by 6 spheres coming from two adjacent close-packed layers.\nStep 2: Any small cation occupying this void is in direct contact with all 6 surrounding spheres.\nStep 3: Hence, the coordination number of an octahedral void is 6.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4516,
    similarQuestion: {
      question: "When three spheres in one layer touch three spheres in the adjacent layer such that the apex of one triangle points up and the other down, the resulting six-coordinate interstitial void is:",
      option_a: "Trigonal planar",
      option_b: "Tetrahedral",
      option_c: "Octahedral",
      option_d: "Square antiprismatic",
      correct_option: "C",
      explanation: "Step 1: Two staggered triangular sets of 3 spheres enclose an interstitial site enveloped by 6 spheres.\nStep 2: Joining the centers of these 6 spheres forms an 8-faced regular octahedron.\nStep 3: Therefore, the interstitial void is an octahedral void.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4517,
    similarQuestion: {
      question: "In a close-packed arrangement of N spheres, the ratio of octahedral voids to tetrahedral voids is:",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: In a close-packed array containing N spheres, the number of octahedral voids is N.\nStep 2: The number of tetrahedral voids is 2N.\nStep 3: The ratio of octahedral voids to tetrahedral voids is N : 2N = 1 : 2 (octahedral voids are half the number of tetrahedral voids).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4518,
    similarQuestion: {
      question: "In a cubic close-packed (FCC) unit cell, consider a cross-sectional diagonal plane passing through two diagonally opposite parallel vertical edges. How many whole tetrahedral voids and edge-centered octahedral voids lie completely on this plane?",
      option_a: "4 tetrahedral voids and 2 octahedral voids",
      option_b: "2 tetrahedral voids and 4 octahedral voids",
      option_c: "8 tetrahedral voids and 4 octahedral voids",
      option_d: "0 tetrahedral voids and 6 octahedral voids",
      correct_option: "A",
      explanation: "Step 1: A diagonal plane passing through two opposite vertical edges contains 2 body diagonals of the unit cell.\nStep 2: Each body diagonal contains 2 tetrahedral voids; thus, the two body diagonals lie fully on this plane and contain 2 × 2 = 4 tetrahedral voids.\nStep 3: The plane passes through 2 vertical edges (each hosting an edge-center octahedral void) and the center of the unit cell.\nStep 4: Thus, the cross-sectional plane contains 4 tetrahedral voids and 2 edge-centered octahedral voids.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4519,
    similarQuestion: {
      question: "In a normal spinel crystal with stoichiometry AB₂O₄, oxide ions form a ccp lattice. What fraction of tetrahedral voids is occupied by cation A²⁺ and what fraction of octahedral voids is occupied by cation B³⁺?",
      option_a: "1/8 of tetrahedral voids by A²⁺, 1/2 of octahedral voids by B³⁺",
      option_b: "1/4 of tetrahedral voids by A²⁺, 1/4 of octahedral voids by B³⁺",
      option_c: "1/2 of tetrahedral voids by A²⁺, 1/8 of octahedral voids by B³⁺",
      option_d: "All tetrahedral voids by A²⁺, none of octahedral voids by B³⁺",
      correct_option: "A",
      explanation: "Step 1: In an FCC unit cell of oxide ions, there are 4 O²⁻ ions, 8 tetrahedral voids, and 4 octahedral voids.\nStep 2: For the formula AB₂O₄ (containing 4 oxide ions):\n- 1 A²⁺ cation is present, occupying 1 out of 8 tetrahedral voids (fraction = 1/8).\n- 2 B³⁺ cations are present, occupying 2 out of 4 octahedral voids (fraction = 2/4 = 1/2).\nStep 3: Therefore, A²⁺ occupies 1/8 of tetrahedral voids and B³⁺ occupies 1/2 of octahedral voids.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4520,
    similarQuestion: {
      question: "In the rock-salt (NaCl) crystal lattice, chloride ions (Cl⁻) form a face-centered cubic (ccp) array. Which interstitial voids are completely occupied by sodium ions (Na⁺)?",
      option_a: "Tetrahedral voids",
      option_b: "Octahedral voids",
      option_c: "Cubic voids",
      option_d: "Trigonal voids",
      correct_option: "B",
      explanation: "Step 1: In rock-salt (NaCl), the radius ratio r(Na⁺)/r(Cl⁻) ≈ 0.52, which corresponds to stable octahedral coordination.\nStep 2: Cl⁻ ions form an fcc array with 4 Cl⁻ ions per unit cell.\nStep 3: Na⁺ ions occupy all 4 octahedral voids (12 edge centers × 1/4 + 1 body center = 4), achieving 6:6 coordination.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4521,
    similarQuestion: {
      question: "In the rock-salt (NaCl) crystalline structure, what is the status of the 8 tetrahedral voids located along the body diagonals?",
      option_a: "Completely occupied by Na⁺ ions",
      option_b: "Completely occupied by Cl⁻ ions",
      option_c: "Half-occupied by Na⁺ ions",
      option_d: "Completely vacant (empty)",
      correct_option: "D",
      explanation: "Step 1: In NaCl, all Na⁺ cations occupy the octahedral interstitial sites.\nStep 2: No ions occupy the tetrahedral interstitial sites.\nStep 3: Thus, all 8 tetrahedral voids in the NaCl unit cell remain completely vacant.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4522,
    similarQuestion: {
      question: "Magnesium oxide (MgO) crystallizes in the rock-salt (NaCl-type) crystal structure. The number of nearest O²⁻ neighbors surrounding each Mg²⁺ ion is:",
      option_a: "4",
      option_b: "6",
      option_c: "8",
      option_d: "12",
      correct_option: "B",
      explanation: "Step 1: The rock-salt structure possesses 6:6 coordination for both cations and anions.\nStep 2: Each Mg²⁺ ion sits at an octahedral site and is surrounded symmetrically by 6 nearest O²⁻ neighbors.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4523,
    similarQuestion: {
      question: "Which of the following statements concerning the rock-salt (NaCl) crystal structure is INCORRECT?",
      option_a: "Cl⁻ ions adopt a face-centered cubic (fcc) arrangement",
      option_b: "The coordination number of both Na⁺ and Cl⁻ is 6",
      option_c: "A unit cell contains 4 formula units of NaCl",
      option_d: "Every alkali metal halide adopts the rock-salt crystal structure",
      correct_option: "D",
      explanation: "Step 1: Options A, B, and C correctly describe the NaCl structure (fcc lattice of Cl⁻, 6:6 coordination, and 4 formula units per cell).\nStep 2: Not all alkali metal halides adopt this structure; for instance, CsCl, CsBr, and CsI adopt the body-centered cubic (CsCl-type, 8:8 coordination) structure due to the large ionic radius of Cs⁺.\nStep 3: Hence, statement D is incorrect.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4524,
    similarQuestion: {
      question: "In a rock-salt type crystal AB, if the interionic distance between nearest cation A⁺ and anion B⁻ is d, what is the edge length (a) of the cubic unit cell?",
      option_a: "d",
      option_b: "2d",
      option_c: "4d",
      option_d: "d / 2",
      correct_option: "B",
      explanation: "Step 1: In the NaCl rock-salt structure, adjacent cations and anions touch along the edge of the cubic unit cell.\nStep 2: The distance between adjacent cation and anion centers is d = r₊ + r₋.\nStep 3: The total edge length of the cube is a = 2 × (r₊ + r₋) = 2d.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4525,
    similarQuestion: {
      question: "In the zinc blende (sphalerite, ZnS) crystal structure, what is the coordination number of Zn²⁺ and S²⁻ ions, respectively?",
      option_a: "4 and 4",
      option_b: "6 and 6",
      option_c: "8 and 8",
      option_d: "4 and 8",
      correct_option: "A",
      explanation: "Step 1: In the zinc blende structure, S²⁻ ions form a face-centered cubic (ccp) array.\nStep 2: Zn²⁺ ions occupy alternate (half of the) tetrahedral voids.\nStep 3: Each Zn²⁺ ion is surrounded tetrahedrally by 4 S²⁻ ions, and conversely each S²⁻ ion is surrounded tetrahedrally by 4 Zn²⁺ ions, giving a 4:4 coordination.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4526,
    similarQuestion: {
      question: "A solid AB has the rock-salt structure. If the radius of the cation A⁺ is 120 pm, what is the ideal maximum radius of the anion B⁻ to maintain octahedral coordination?",
      option_a: "290 pm",
      option_b: "533 pm",
      option_c: "164 pm",
      option_d: "88 pm",
      correct_option: "A",
      explanation: "Step 1: For stable octahedral coordination (coordination number 6), the radius ratio r₊ / r₋ must satisfy:\n0.414 ≤ r₊ / r₋ < 0.732\nStep 2: The lower limiting radius ratio for octahedral coordination gives the maximum allowable radius for the anion:\nr₊ / r₋ = 0.414\nStep 3: Calculate r₋:\nr₋ = r₊ / 0.414 = 120 pm / 0.414 ≈ 290 pm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4527,
    similarQuestion: {
      question: "In the crystal structure of diamond, carbon atoms are arranged such that:",
      option_a: "Carbon forms an fcc lattice with 50% of tetrahedral voids occupied by carbon atoms",
      option_b: "Carbon forms an fcc lattice with 100% of tetrahedral voids occupied",
      option_c: "Carbon forms a bcc lattice with all octahedral sites occupied",
      option_d: "Carbon forms a simple cubic lattice",
      correct_option: "A",
      explanation: "Step 1: Diamond crystallizes in an FCC lattice where carbon atoms occupy all the lattice positions (corners and face centers).\nStep 2: Additional carbon atoms occupy exactly half (50%) of the tetrahedral voids.\nStep 3: This gives 4 + 4 = 8 carbon atoms per unit cell, each bonded tetrahedrally to 4 neighbors with sp³ hybridization.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4528,
    similarQuestion: {
      question: "Why does AgCl predominantly exhibit Frenkel defects while NaCl predominantly exhibits Schottky defects?",
      option_a: "Ag⁺ has a smaller radius and higher polarizability than Na⁺, facilitating migration to interstitial sites",
      option_b: "Na⁺ and Cl⁻ have a huge radius difference compared to Ag⁺ and Cl⁻",
      option_c: "AgCl has higher lattice energy than NaCl",
      option_d: "NaCl possesses covalent bonding whereas AgCl is purely ionic",
      correct_option: "A",
      explanation: "Step 1: A Frenkel defect is favored when there is a significant size difference between cations and anions, allowing the smaller cation to slip into interstitial voids.\nStep 2: Ag⁺ is relatively small and highly polarizable due to its pseudo-noble gas d¹⁰ electron configuration, which lowers the activation energy for interstitial migration.\nStep 3: In NaCl, Na⁺ and Cl⁻ have comparable sizes, making the creation of paired Schottky vacancies energetically favorable.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4529,
    similarQuestion: {
      question: "A stoichiometric defect in an ionic crystal wherein an equal number of cations and anions leave their regular lattice positions to create vacancies is known as:",
      option_a: "Frenkel defect",
      option_b: "Schottky defect",
      option_c: "Interstitial defect",
      option_d: "Metal excess defect",
      correct_option: "B",
      explanation: "Step 1: In a Schottky defect, stoichiometric pairs of cations and anions are missing from the crystal lattice.\nStep 2: This maintains electrical neutrality while producing equal numbers of cation and anion vacancies throughout the crystal.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4530,
    similarQuestion: {
      question: "When an ion is dislocated from its normal lattice site to an interstitial position in an ionic crystal, the defect generated is called a:",
      option_a: "Schottky defect",
      option_b: "Frenkel defect",
      option_c: "Substitution defect",
      option_d: "F-center defect",
      correct_option: "B",
      explanation: "Step 1: A Frenkel defect (dislocation defect) is created when an ion (typically the smaller cation) moves from its regular lattice site to an interstitial position.\nStep 2: This generates a vacancy at the lattice site and an interstitial defect at the new position, without changing the overall chemical stoichiometry or crystal density.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4531,
    similarQuestion: {
      question: "What is an F-center in a non-stoichiometric alkali halide crystal?",
      option_a: "An anion vacancy occupied by an unpaired electron",
      option_b: "A cation vacancy occupied by a hole",
      option_c: "An interstitial cation trapped in a void",
      option_d: "A foreign impurity atom substituted at a lattice site",
      correct_option: "A",
      explanation: "Step 1: When an alkali halide (e.g., NaCl or KCl) is heated in metal vapor, excess alkali metal atoms lose electrons.\nStep 2: Anions diffuse to the crystal surface, leaving behind anion vacancies.\nStep 3: The liberated electrons diffuse into the crystal and become trapped in these anion vacancies. These trapped electrons are called F-centers (Farbe centers) and absorb visible light to give the crystal color.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4532,
    similarQuestion: {
      question: "How does the occurrence of Schottky defects affect the density of an ionic solid?",
      option_a: "Density increases",
      option_b: "Density decreases",
      option_c: "Density remains completely unchanged",
      option_d: "Density fluctuates unpredictably",
      correct_option: "B",
      explanation: "Step 1: Schottky defects arise from missing pairs of cations and anions from the crystal lattice.\nStep 2: The missing ions decrease the total mass of the crystal without altering the overall volume of the lattice.\nStep 3: Because density = mass / volume, the presence of Schottky defects decreases the density of the solid.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4533,
    similarQuestion: {
      question: "Which of the following pairings correctly identifies the predominant point defects in AgCl and CaF₂ crystals, respectively?",
      option_a: "AgCl shows cation Frenkel defect; CaF₂ shows anion Frenkel defect",
      option_b: "AgCl shows Schottky defect; CaF₂ shows Schottky defect",
      option_c: "AgCl shows anion Frenkel defect; CaF₂ shows cation Frenkel defect",
      option_d: "AgCl shows metal excess defect; CaF₂ shows vacancy defect",
      correct_option: "A",
      explanation: "Step 1: In AgCl, the smaller Ag⁺ cations displace into interstitial sites, giving rise to cation Frenkel defects.\nStep 2: In CaF₂ (fluorite lattice), large octahedral interstitial cavities are present. Fluoride ions (F⁻) leave their normal tetrahedral sites to occupy these interstitial voids, giving rise to anion Frenkel defects.\nStep 3: Therefore, AgCl exhibits cation Frenkel defects and CaF₂ exhibits anion Frenkel defects.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 65 Part 2.');

    for (let i = 0; i < questionsPart2.length; i++) {
      const q = questionsPart2[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart2.length} (ID: ${q.id})`);
    }
    console.log('Set 65 Part 2 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 65 Part 2:', err.message);
  }
}

run();
