const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 4481,
    similarQuestion: {
      question: "How many Bravais space lattices exist across all seven crystal systems in three-dimensional space?",
      option_a: "7",
      option_b: "12",
      option_c: "14",
      option_d: "230",
      correct_option: "C",
      explanation: "Step 1: In three-dimensional crystallography, there are 7 crystal systems (cubic, tetragonal, orthorhombic, hexagonal, rhombohedral, monoclinic, and triclinic).\nStep 2: Combining these 7 systems with the possible lattice centerings (primitive, body-centered, face-centered, base-centered) yields exactly 14 unique Bravais lattices (in contrast to 5 Bravais lattices in two dimensions).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4482,
    similarQuestion: {
      question: "Glass and pitch are classic examples of amorphous solids. Which term is commonly used to describe their physical nature?",
      option_a: "True crystalline solids",
      option_b: "Superheated solids",
      option_c: "Supercooled liquids",
      option_d: "Polycrystalline aggregates",
      correct_option: "C",
      explanation: "Step 1: Amorphous solids (such as glass, rubber, and pitch) lack long-range positional periodicity among their constituent particles.\nStep 2: They possess fluid-like disordered structural arrangements frozen into rigidity and exhibit tendency to flow extremely slowly over long periods. Hence, they are regarded as pseudo-solids or supercooled liquids.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4483,
    similarQuestion: {
      question: "Which of the following is NOT a characteristic property of the solid state?",
      option_a: "Definite mass, volume, and shape",
      option_b: "Highly compressible nature",
      option_c: "Short intermolecular distances",
      option_d: "Strong intermolecular forces of attraction",
      correct_option: "B",
      explanation: "Step 1: In the solid state, constituent particles occupy fixed equilibrium positions with very short intermolecular distances and strong attractive forces.\nStep 2: As a consequence, solids possess high rigidity and are practically incompressible under standard conditions.\nStep 3: Therefore, possessing a highly compressible nature is NOT a property of solids.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4484,
    similarQuestion: {
      question: "Which of the following substances is an amorphous solid rather than a crystalline solid?",
      option_a: "Quartz glass (fused silica)",
      option_b: "Quartz (crystalline SiO₂)",
      option_c: "Rock salt (NaCl)",
      option_d: "Diamond",
      correct_option: "A",
      explanation: "Step 1: Crystalline solids possess orderly long-range repeating arrays of constituent atoms, ions, or molecules (e.g., crystalline quartz, rock salt NaCl, and diamond).\nStep 2: Quartz glass is formed by rapid cooling of molten SiO₂ and lacks long-range atomic order, giving it an amorphous structure with isotropic physical properties.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4485,
    similarQuestion: {
      question: "Among the following crystalline substances, which one is held together purely by weak London dispersion forces?",
      option_a: "Solid Argon (Ar)",
      option_b: "Sodium chloride (NaCl)",
      option_c: "Ice (H₂O)",
      option_d: "Quartz (SiO₂)",
      correct_option: "A",
      explanation: "Step 1: Solid Argon is a non-polar atomic molecular solid in which noble gas atoms are held together exclusively by weak London dispersion forces.\nStep 2: By comparison, NaCl is an ionic solid with strong Coulombic forces, ice has strong intermolecular hydrogen bonds, and quartz is a covalent network solid with strong Si-O covalent bonds.\nStep 3: Hence, solid Argon has the weakest intermolecular forces.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4486,
    similarQuestion: {
      question: "When sliced with a sharp-edged tool, an amorphous solid characteristically:",
      option_a: "Cleaves along definite planes into two smooth surfaces",
      option_b: "Splits irregularly into fragments with rough surfaces",
      option_c: "Explodes due to stored lattice strain",
      option_d: "Changes instantly into a fluid melt",
      correct_option: "B",
      explanation: "Step 1: Crystalline solids possess regular cleavage planes along which bonds break evenly, yielding clean, flat surfaces.\nStep 2: Amorphous solids lack any organized planes of symmetry; when cut with a sharp tool, they break randomly with irregular, uneven surfaces.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4487,
    similarQuestion: {
      question: "The axial edge lengths and interaxial angles corresponding to the rhombohedral (trigonal) crystal system are:",
      option_a: "a = b = c, α = β = γ ≠ 90°",
      option_b: "a = b ≠ c, α = β = γ = 90°",
      option_c: "a ≠ b ≠ c, α = β = γ = 90°",
      option_d: "a ≠ b ≠ c, α ≠ β ≠ γ ≠ 90°",
      correct_option: "A",
      explanation: "Step 1: In the rhombohedral (trigonal) crystal system, the three crystallographic axes are of equal length: a = b = c.\nStep 2: The three interaxial angles are also equal to one another, but none of them is equal to 90°: α = β = γ ≠ 90°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4488,
    similarQuestion: {
      question: "A crystalline unit cell has dimensions a = 4.2 Å, b = 4.2 Å, c = 6.8 Å with interfacial angles α = 90°, β = 90°, and γ = 120°. To which crystal system does it belong?",
      option_a: "Tetragonal",
      option_b: "Hexagonal",
      option_c: "Monoclinic",
      option_d: "Rhombohedral",
      correct_option: "B",
      explanation: "Step 1: Compare the axial edge lengths:\na = b = 4.2 Å, while c = 6.8 Å, which gives a = b ≠ c.\nStep 2: Compare the interaxial angles:\nα = β = 90° and γ = 120°.\nStep 3: The conditions a = b ≠ c alongside α = β = 90° and γ = 120° uniquely characterize the hexagonal crystal system.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4489,
    similarQuestion: {
      question: "In a body-centered cubic (BCC) crystal lattice formed by identical spheres, the coordination number of each sphere is:",
      option_a: "12",
      option_b: "8",
      option_c: "6",
      option_d: "4",
      correct_option: "B",
      explanation: "Step 1: In a BCC unit cell, the central sphere is in direct physical contact with each of the 8 spheres situated at the corners of the cube.\nStep 2: Similarly, each corner sphere is shared among 8 adjacent unit cells and touches the central sphere of each of those 8 cells.\nStep 3: Consequently, the nearest-neighbor coordination number in a BCC lattice is 8.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4490,
    similarQuestion: {
      question: "A metal crystallizes in a simple cubic (primitive) lattice with an edge length of 2.0 Å. If its atomic weight is 64 g/mol, what is the theoretical mass density per unit cell in amu/Å³?",
      option_a: "8 amu/Å³",
      option_b: "16 amu/Å³",
      option_c: "32 amu/Å³",
      option_d: "64 amu/Å³",
      correct_option: "A",
      explanation: "Step 1: For a simple cubic primitive lattice, the number of effective atoms per unit cell is:\nZ = 8 × (1/8) = 1 atom.\nStep 2: The volume of the cubic unit cell is:\nV = a³ = (2.0 Å)³ = 8.0 Å³.\nStep 3: The mass of one atom is M = 64 amu.\nStep 4: Density in amu/Å³ is:\nρ = (Z × M) / V = (1 × 64 amu) / (8.0 Å³) = 8.0 amu/Å³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4491,
    similarQuestion: {
      question: "What is the percentage of unoccupied (empty) space in a face-centered cubic (FCC / CCP) unit cell?",
      option_a: "26%",
      option_b: "32%",
      option_c: "48%",
      option_d: "34%",
      correct_option: "A",
      explanation: "Step 1: The packing efficiency of a face-centered cubic (FCC) lattice is:\nPacking Efficiency = [4 × (4/3)πr³ / a³] × 100% = 74%.\nStep 2: The percentage of vacant (unoccupied) volume is:\nVoid Percentage = 100% - 74% = 26%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4492,
    similarQuestion: {
      question: "In a three-dimensional cubic unit cell, what fraction of an atom located exactly at the center of an edge is shared by that unit cell?",
      option_a: "1/8",
      option_b: "1/4",
      option_c: "1/2",
      option_d: "1",
      correct_option: "B",
      explanation: "Step 1: In a three-dimensional cubic lattice, each edge is shared equally among 4 adjacent unit cells that meet along that edge.\nStep 2: Thus, an atom situated at the center of an edge contributes precisely 1/4 of its total volume to any single unit cell.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4493,
    similarQuestion: {
      question: "Barium metal crystallizes in a body-centered cubic (BCC) lattice with a unit cell edge length of 5.02 Å. The atomic radius of barium is:",
      option_a: "2.17 Å",
      option_b: "2.51 Å",
      option_c: "1.77 Å",
      option_d: "3.55 Å",
      correct_option: "A",
      explanation: "Step 1: In a body-centered cubic lattice, spheres touch along the body diagonal:\nBody diagonal = √3 × a = 4r\nStep 2: Express atomic radius r in terms of edge length a:\nr = (√3 / 4) × a\nStep 3: Substitute a = 5.02 Å:\nr = (1.732 / 4) × 5.02 Å = 0.433 × 5.02 Å ≈ 2.17 Å.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4494,
    similarQuestion: {
      question: "A metal crystallizes in a body-centered cubic lattice. If the nearest-neighbor distance (distance of closest approach between two atoms) is 3.68 Å, the edge length of the unit cell is:",
      option_a: "4.25 Å",
      option_b: "3.19 Å",
      option_c: "5.20 Å",
      option_d: "2.60 Å",
      correct_option: "A",
      explanation: "Step 1: In a BCC crystal, the nearest-neighbor distance d is half the body diagonal:\nd = 2r = (√3 / 2) × a\nStep 2: Solve for unit cell edge length a:\na = (2 × d) / √3\nStep 3: Given d = 3.68 Å:\na = (2 × 3.68 Å) / 1.732 = 7.36 / 1.732 ≈ 4.25 Å.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4495,
    similarQuestion: {
      question: "Cesium chloride (CsCl) crystallizes in a cubic lattice where each Cs⁺ ion is surrounded by 8 Cl⁻ ions and each Cl⁻ ion is surrounded by 8 Cs⁺ ions. Which type of lattice does this structure represent?",
      option_a: "Face-centered cubic (FCC)",
      option_b: "Simple cubic sublattices with BCC-like coordination (8:8)",
      option_c: "Hexagonal close packed (HCP)",
      option_d: "Diamond cubic",
      correct_option: "B",
      explanation: "Step 1: In CsCl, the Cl⁻ ions form a simple cubic framework with Cs⁺ occupying the cubic body center (or vice versa).\nStep 2: Both the cation and the anion have a coordination number of 8.\nStep 3: This structure consists of two interpenetrating primitive cubic sublattices, exhibiting body-centered cubic (BCC-like) 8:8 coordination.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4496,
    similarQuestion: {
      question: "A metal forms a cubic unit cell with an edge length of 4.00 Å. The volume of this unit cell in cm³ is:",
      option_a: "6.40 × 10⁻²³ cm³",
      option_b: "1.60 × 10⁻²² cm³",
      option_c: "6.40 × 10⁻²⁴ cm³",
      option_d: "2.56 × 10⁻²² cm³",
      correct_option: "A",
      explanation: "Step 1: Convert the edge length a from angstroms to centimeters:\na = 4.00 Å = 4.00 × 10⁻⁸ cm.\nStep 2: Calculate unit cell volume:\nV = a³ = (4.00 × 10⁻⁸ cm)³ = 64.0 × 10⁻²⁴ cm³ = 6.40 × 10⁻²³ cm³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4497,
    similarQuestion: {
      question: "In a three-dimensional hexagonal close-packed (HCP) structure of identical hard spheres, the total coordination number of each sphere is:",
      option_a: "6",
      option_b: "8",
      option_c: "12",
      option_d: "14",
      correct_option: "C",
      explanation: "Step 1: In an HCP structure, each sphere is in contact with 6 spheres in its own hexagonal close-packed layer.\nStep 2: It also touches 3 spheres in the layer directly above it and 3 spheres in the layer directly below it.\nStep 3: Total coordination number = 6 + 3 + 3 = 12.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4498,
    similarQuestion: {
      question: "The effective number of atoms belonging to one conventional hexagonal unit cell of a hexagonal close-packed (HCP) lattice is:",
      option_a: "2",
      option_b: "4",
      option_c: "6",
      option_d: "12",
      correct_option: "C",
      explanation: "Step 1: A conventional HCP unit cell has 12 corner atoms, 2 face-center atoms, and 3 completely enclosed interior atoms.\nStep 2: Determine contributions:\n- Corners: 12 × (1/6) = 2 atoms\n- Face centers: 2 × (1/2) = 1 atom\n- Interior: 3 × 1 = 3 atoms\nStep 3: Total effective atoms Z = 2 + 1 + 3 = 6 atoms.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4499,
    similarQuestion: {
      question: "In a two-dimensional hexagonal close-packed layer of identical spheres, the coordination number of each sphere within that single layer is:",
      option_a: "4",
      option_b: "6",
      option_c: "8",
      option_d: "12",
      correct_option: "B",
      explanation: "Step 1: In a single two-dimensional hexagonal close-packed layer, spheres are arranged in alternating rows.\nStep 2: Each sphere touches 6 immediate neighboring spheres in that plane, forming a regular hexagon around it.\nStep 3: Hence, the coordination number within its own layer is 6.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4500,
    similarQuestion: {
      question: "For a standard HCP unit cell containing Z = 6 effective atoms, the total number of tetrahedral voids enclosed within the cell is:",
      option_a: "6",
      option_b: "8",
      option_c: "12",
      option_d: "24",
      correct_option: "C",
      explanation: "Step 1: In any close-packed lattice containing N atoms, the number of tetrahedral voids is 2N.\nStep 2: For a conventional HCP unit cell, N = Z = 6.\nStep 3: Total number of tetrahedral voids = 2 × 6 = 12.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4501,
    similarQuestion: {
      question: "What is the packing efficiency (fraction of space occupied by spheres) in an ABABAB... hexagonal close-packed (HCP) structure?",
      option_a: "0.52",
      option_b: "0.68",
      option_c: "0.74",
      option_d: "0.26",
      correct_option: "C",
      explanation: "Step 1: The ABABAB... sequence represents hexagonal close packing (HCP) in three dimensions.\nStep 2: Both HCP and CCP have the highest possible sphere-packing density:\nPacking efficiency = (π / 3√2) ≈ 0.74 (or 74%).\nStep 3: The fraction of occupied space is 0.74 (with 0.26 fraction of empty space).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4502,
    similarQuestion: {
      question: "The number of octahedral voids associated with a conventional hexagonal close-packed (HCP) unit cell containing 6 atoms is:",
      option_a: "3",
      option_b: "6",
      option_c: "12",
      option_d: "18",
      correct_option: "B",
      explanation: "Step 1: In a close-packed arrangement containing N constituent atoms, the number of octahedral voids is equal to N.\nStep 2: For an HCP unit cell with N = 6 effective atoms, the number of octahedral voids is N = 6.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4503,
    similarQuestion: {
      question: "A metal crystallizes in an FCC lattice with a unit cell edge length of 200 pm and a density of 8.0 g/cm³. The number of atoms present in 160 g of this crystal is:",
      option_a: "1.0 × 10²⁵",
      option_b: "4.0 × 10²⁵",
      option_c: "8.0 × 10²⁴",
      option_d: "2.0 × 10²⁵",
      correct_option: "A",
      explanation: "Step 1: Convert edge length to cm:\na = 200 pm = 2.0 × 10⁻⁸ cm.\nStep 2: Unit cell volume:\nV_cell = a³ = (2.0 × 10⁻⁸ cm)³ = 8.0 × 10⁻²⁴ cm³.\nStep 3: Mass of one unit cell:\nMass_cell = Density × V_cell = 8.0 g/cm³ × 8.0 × 10⁻²⁴ cm³ = 6.4 × 10⁻²³ g.\nStep 4: Number of unit cells in 160 g:\nN_cells = 160 g / (6.4 × 10⁻²³ g) = 2.5 × 10²⁴ unit cells.\nStep 5: Since an FCC lattice contains 4 atoms per unit cell:\nTotal atoms = 4 × (2.5 × 10²⁴) = 1.0 × 10²⁵ atoms.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4504,
    similarQuestion: {
      question: "In a body-centered cubic (BCC) unit cell, what are the fractional contributions of an atom at a corner and an atom at the body center to that unit cell, respectively?",
      option_a: "1/8 and 1",
      option_b: "1/4 and 1/2",
      option_c: "1/8 and 1/2",
      option_d: "1/2 and 1",
      correct_option: "A",
      explanation: "Step 1: An atom positioned at any cube corner is shared equally among 8 adjacent unit cells, contributing 1/8 to each cell.\nStep 2: An atom located at the center of the body is situated entirely within the unit cell and is not shared with any neighbor, contributing 1.\nStep 3: Thus, the respective contributions are 1/8 and 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4505,
    similarQuestion: {
      question: "In a face-centered cubic (FCC / CCP) unit cell, where are the octahedral voids located?",
      option_a: "At the 12 edge centers and 1 at the body center",
      option_b: "Completely inside the 8 tetrahedral corners along body diagonals",
      option_c: "Only at the 6 face centers",
      option_d: "Exclusively at the 8 cube corners",
      correct_option: "A",
      explanation: "Step 1: In an FCC unit cell, an octahedral void is located at the center of each of the 12 edges (each shared by 4 unit cells: 12 × 1/4 = 3).\nStep 2: Another octahedral void is located at the center of the cube body (1 × 1 = 1).\nStep 3: This gives a total of 3 + 1 = 4 octahedral voids per unit cell, situated at the 12 edge centers and 1 body center.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4506,
    similarQuestion: {
      question: "Gold crystallizes in a face-centered cubic (FCC) lattice. If the atomic radius of gold is 1.44 Å, the unit cell edge length is approximately:",
      option_a: "4.07 Å",
      option_b: "2.88 Å",
      option_c: "3.52 Å",
      option_d: "5.12 Å",
      correct_option: "A",
      explanation: "Step 1: In an FCC unit cell, atoms touch along the face diagonal:\nFace diagonal = √2 × a = 4r\nStep 2: Rearrange to solve for edge length a:\na = (4r) / √2 = 2√2 × r\nStep 3: Substitute r = 1.44 Å:\na = 2 × 1.414 × 1.44 Å ≈ 4.07 Å.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4507,
    similarQuestion: {
      question: "A cubic solid is made of two elements A and B. Atoms of A are present at all eight corners of the cube and atoms of B are present at the centers of all six faces. If one atom of B is missing from one face center, what is the resulting empirical formula of the compound?",
      option_a: "A₂B₅",
      option_b: "AB₃",
      option_c: "A₂B₃",
      option_d: "AB₂",
      correct_option: "A",
      explanation: "Step 1: Calculate contribution of atom A:\n8 corners × (1/8) = 1 atom of A.\nStep 2: Calculate contribution of atom B:\nWith one atom missing from a face, 5 faces remain occupied:\n5 face centers × (1/2) = 2.5 atoms of B.\nStep 3: The stoichiometric ratio is A : B = 1 : 2.5 = 2 : 5.\nThus, the formula is A₂B₅.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 65 Part 1.');

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
    console.log('Set 65 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 65 Part 1:', err.message);
  }
}

run();
