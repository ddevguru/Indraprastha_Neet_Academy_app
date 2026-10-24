const https = require('https');

function login() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      username: 'indraprasthaadmin',
      password: 'indraprastha@123'
    });
    const req = https.request('https://api.indraprasthaneetacademy.com/api/admin/login', {
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
          if (parsed.token) resolve(parsed.token);
          else reject(new Error('No token: ' + data));
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

function updateQuestion(token, id, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ similarQuestion: payload });
    const req = https.request(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${id}`, {
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
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
        else reject(new Error(`Failed ${res.statusCode}: ${data}`));
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const updates = [
  {
    id: 4115,
    question: "In which of the following species does the central atom possess an incomplete octet (electron-deficient central atom)?",
    option_a: "PCl₃",
    option_b: "BeCl₂ (vapor monomer)",
    option_c: "CCl₄",
    option_d: "NH₃",
    correct_option: "B",
    explanation: "In a gaseous BeCl₂ monomer, Beryllium (valence electrons = 2) shares two electrons with two chlorine atoms, forming two single covalent bonds. Thus, the total number of valence electrons around Be is 4, which is less than an octet (electron-deficient).\nIn contrast, P in PCl₃, C in CCl₄, and N in NH₃ all satisfy the octet rule with 8 valence electrons.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4116,
    question: "In the formation of IF₇, how many unpaired electrons are required by the central Iodine atom, and what excited state does Iodine attain?",
    option_a: "3 unpaired electrons, 1st excited state",
    option_b: "5 unpaired electrons, 2nd excited state",
    option_c: "7 unpaired electrons, 3rd excited state",
    option_d: "7 unpaired electrons, ground state",
    correct_option: "C",
    explanation: "Ground state valence configuration of Iodine (₅₃I) is 5s² 5p⁵ 5d⁰ (1 unpaired electron).\n- 1st excited state: One 5p electron is promoted to 5d → 5s² 5p⁴ 5d¹ (3 unpaired electrons, as in IF₃).\n- 2nd excited state: A second 5p electron is promoted to 5d → 5s² 5p³ 5d² (5 unpaired electrons, as in IF₅).\n- 3rd excited state: The 5s pair unpairs and one electron is promoted to 5d → 5s¹ 5p³ 5d³ (7 unpaired electrons, as in IF₇).\nThus, 7 unpaired electrons are required in the 3rd excited state.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4117,
    question: "Which of the following halides of group 15 elements does not exist under ordinary conditions?",
    option_a: "PF₅",
    option_b: "AsCl₅",
    option_c: "NF₅",
    option_d: "SbCl₅",
    correct_option: "C",
    explanation: "Nitrogen belongs to the second period of the periodic table and possesses only 2s and 2p valence orbitals, with no energetically accessible 2d orbitals. Consequently, Nitrogen cannot expand its octet beyond 8 electrons (maximum covalency of 4).\nPhosphorus, Arsenic, and Antimony belong to the third, fourth, and fifth periods respectively, possessing vacant d-orbitals that allow them to expand their octet to form pentahalides.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4118,
    question: "Match the following molecules with their correct VSEPR geometry / shape:\n(I) XeF₄\n(II) SF₄\n(III) ClF₃\n(IV) XeO₃",
    option_a: "(I)-Square planar, (II)-See-saw, (III)-T-shaped, (IV)-Pyramidal",
    option_b: "(I)-Tetrahedral, (II)-Square planar, (III)-Trigonal planar, (IV)-T-shaped",
    option_c: "(I)-See-saw, (II)-Square planar, (III)-Linear, (IV)-Pyramidal",
    option_d: "(I)-Square planar, (II)-T-shaped, (III)-See-saw, (IV)-Tetrahedral",
    correct_option: "A",
    explanation: "- XeF₄: 4 bond pairs + 2 lone pairs = steric number 6 (sp³d²), shape is Square Planar.\n- SF₄: 4 bond pairs + 1 lone pair = steric number 5 (sp³d), shape is See-saw.\n- ClF₃: 3 bond pairs + 2 lone pairs = steric number 5 (sp³d), shape is T-shaped.\n- XeO₃: 3 bond pairs + 1 lone pair = steric number 4 (sp³), shape is Trigonal Pyramidal.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4119,
    question: "Which of the following correctly matches the chemical species with the hybridization of its central atom and approximate bond angle?",
    option_a: "BeCl₂ — sp², 120°",
    option_b: "CH₄ — sp³, 109.5°",
    option_c: "BF₃ — sp³, 107°",
    option_d: "SF₆ — sp³d, 90°",
    correct_option: "B",
    explanation: "- In CH₄, carbon undergoes sp³ hybridization with 4 single bonds and zero lone pairs, forming a regular tetrahedral geometry with bond angles of 109.5°.\n- BeCl₂ is sp hybridized with a 180° bond angle.\n- BF₃ is sp² hybridized with a 120° bond angle.\n- SF₆ is sp³d² hybridized with 90° bond angles.\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4120,
    question: "Which of the following pairs of polyatomic species is both isoelectronic and isostructural?",
    option_a: "CO₃²⁻ and NO₃⁻",
    option_b: "ClO₃⁻ and CO₃²⁻",
    option_c: "SO₃²⁻ and NO₃⁻",
    option_d: "NH₄⁺ and BF₃",
    correct_option: "A",
    explanation: "1. Valence electrons:\n   - For CO₃²⁻: 4 (C) + 3 × 6 (O) + 2 = 24 valence electrons.\n   - For NO₃⁻: 5 (N) + 3 × 6 (O) + 1 = 24 valence electrons.\n   Both species are isoelectronic.\n2. Structure and Hybridization:\n   - In CO₃²⁻: Steric number = 3 (3 σ-bonds + 0 lone pairs), sp² hybridized, Trigonal Planar shape.\n   - In NO₃⁻: Steric number = 3 (3 σ-bonds + 0 lone pairs), sp² hybridized, Trigonal Planar shape.\nThus, both species are isoelectronic and isostructural.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4121,
    question: "In which of the following molecules are two distinctly different bond lengths present in the gas phase?",
    option_a: "PCl₅",
    option_b: "CCl₄",
    option_c: "SF₆",
    option_d: "BF₃",
    correct_option: "A",
    explanation: "1. PCl₅ adopts a trigonal bipyramidal geometry (sp³d hybridization).\n2. It features two axial P-Cl bonds and three equatorial P-Cl bonds.\n3. The axial bonds experience greater repulsion from equatorial electron pairs (three 90° repulsions) compared to equatorial bonds (two 90° repulsions).\n4. Consequently, axial bonds are weaker and longer (214 pm) than equatorial bonds (202 pm).\n5. In regular symmetric molecules like CCl₄ (tetrahedral), SF₆ (octahedral), and BF₃ (trigonal planar), all bond lengths are identical.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4122,
    question: "What is the molecular shape of Tellurium tetrachloride (TeCl₄) according to VSEPR theory?",
    option_a: "Regular tetrahedral",
    option_b: "Square planar",
    option_c: "See-saw (distorted tetrahedral)",
    option_d: "Trigonal bipyramidal",
    correct_option: "C",
    explanation: "1. Tellurium (Group 16) has 6 valence electrons.\n2. In TeCl₄, Te forms 4 single bonds with chlorine atoms and retains 1 lone pair:\n   Steric number = 4 bond pairs + 1 lone pair = 5.\n3. The electron-pair geometry is trigonal bipyramidal (sp³d hybridization).\n4. The lone pair occupies an equatorial position to minimize 90° lone-pair/bond-pair repulsions.\n5. The resulting molecular shape is see-saw (also known as a folded square or distorted tetrahedron).\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4123,
    question: "Which of the following series correctly shows identical bond angles (120°) among the trihalides of Group 13 elements in their monomeric state?",
    option_a: "BF₃ = BCl₃ = BBr₃",
    option_b: "NF₃ = PF₃ = AsF₃",
    option_c: "H₂O = H₂S = H₂Se",
    option_d: "CH₄ = NH₃ = H₂O",
    correct_option: "A",
    explanation: "1. BF₃, BCl₃, and BBr₃ all consist of a central boron atom bonded to three halogen atoms with zero lone pairs.\n2. The central boron atom is sp² hybridized in all three molecules.\n3. Because all three have a completely symmetrical trigonal planar geometry with no lone pairs to distort the bond angles, the bond angle in each molecule is strictly 120°.\n4. Hence, the bond angles are equal: BF₃ = BCl₃ = BBr₃ = 120°.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4124,
    question: "Statement I: The dipole moment of NF₃ (0.24 D) is significantly smaller than that of NH₃ (1.47 D).\nStatement II: In NH₃, the orbital dipole due to the lone pair reinforces the resultant dipole of the three N-H bonds, whereas in NF₃, the orbital dipole opposes the resultant dipole of the three N-F bonds.",
    option_a: "Both Statement I and Statement II are correct and Statement II is the correct explanation of Statement I",
    option_b: "Both Statement I and Statement II are correct but Statement II is NOT the correct explanation of Statement I",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. In NH₃, Nitrogen is more electronegative than Hydrogen; hence the bond dipoles of the three N-H bonds point towards Nitrogen, in the same direction as the lone pair's orbital dipole. They add up vectorially, yielding a large dipole moment (μ = 1.47 D).\n2. In NF₃, Fluorine is more electronegative than Nitrogen; hence the bond dipoles point away from Nitrogen towards Fluorine, directly opposing the lone pair's upward orbital dipole. They cancel each other out substantially, resulting in a very small dipole moment (μ = 0.24 D).\n3. Both statements are true and Statement II is the exact physical explanation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4125,
    question: "Which of the following molecules has polar bonds but possesses a net zero dipole moment (μ = 0)?",
    option_a: "CCl₄",
    option_b: "CHCl₃",
    option_c: "NH₃",
    option_d: "SO₂",
    correct_option: "A",
    explanation: "1. In Carbon tetrachloride (CCl₄), each C-Cl bond is polar due to the electronegativity difference between Carbon (2.55) and Chlorine (3.16).\n2. However, CCl₄ has a perfectly symmetrical tetrahedral geometry (sp³ hybridization).\n3. The four individual C-Cl bond dipole vectors cancel each other out completely in three-dimensional space:\n   μ_net = Σ μ_i = 0.\n4. CHCl₃, NH₃, and SO₂ lack spherical/tetrahedral symmetry, resulting in net non-zero dipole moments.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4126,
    question: "Which of the following molecules has the highest dipole moment?",
    option_a: "CO₂",
    option_b: "CH₄",
    option_c: "H₂O",
    option_d: "BF₃",
    correct_option: "C",
    explanation: "1. CO₂ is linear (O=C=O), so its two equal and opposite bond dipoles cancel completely (μ = 0 D).\n2. CH₄ has symmetrical tetrahedral geometry, so its bond dipoles cancel completely (μ = 0 D).\n3. BF₃ has symmetrical trigonal planar geometry, so its bond dipoles cancel completely (μ = 0 D).\n4. H₂O has a bent V-shaped geometry (bond angle ~104.5°) with two highly polar O-H bonds and two lone pairs reinforcing the net dipole vector, giving a substantial dipole moment of μ = 1.85 D.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4127,
    question: "According to Molecular Orbital Theory, when an electron is added to a neutral Oxygen molecule (O₂) to form the superoxide ion (O₂⁻), into which molecular orbital does the incoming electron enter?",
    option_a: "σ 2p_z",
    option_b: "π 2p_x",
    option_c: "π* 2p_x (or π* 2p_y)",
    option_d: "σ* 2p_z",
    correct_option: "C",
    explanation: "1. The ground state electronic configuration of O₂ (16 electrons) according to MOT is:\n   σ1s² σ*1s² σ2s² σ*2s² σ2p_z² (π2p_x² = π2p_y²) (π*2p_x¹ = π*2p_y¹)\n2. The highest occupied molecular orbitals (HOMO) in O₂ are the degenerate antibonding π* orbitals, each containing one unpaired electron.\n3. When O₂ accepts an additional electron to form the superoxide ion O₂⁻ (17 electrons), the electron enters the lowest unoccupied position in the π* 2p_x (or π* 2p_y) antibonding molecular orbital.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4128,
    question: "Which of the following represents the correct decreasing order of boiling points for the hydrogen halides?",
    option_a: "HF > HI > HBr > HCl",
    option_b: "HI > HBr > HCl > HF",
    option_c: "HF > HCl > HBr > HI",
    option_d: "HCl > HBr > HI > HF",
    correct_option: "A",
    explanation: "1. HF exhibits exceptionally strong intermolecular hydrogen bonding due to the high electronegativity and small atomic size of fluorine, resulting in the highest boiling point among hydrogen halides (293 K).\n2. For HCl, HBr, and HI, hydrogen bonding is absent; the boiling point is governed by London dispersion forces, which increase with increasing molecular weight and polarizability:\n   HI (238 K) > HBr (206 K) > HCl (188 K).\n3. Combining these effects gives the overall decreasing order:\n   HF > HI > HBr > HCl.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4129,
    question: "Which of the following compounds exhibits intramolecular hydrogen bonding (chelation)?",
    option_a: "ortho-Nitrophenol",
    option_b: "para-Nitrophenol",
    option_c: "meta-Nitrophenol",
    option_d: "Phenol",
    correct_option: "A",
    explanation: "1. In ortho-nitrophenol, the hydroxyl (-OH) group and nitro (-NO₂) group are located on adjacent carbon atoms of the benzene ring.\n2. The hydrogen atom of the -OH group forms a stable six-membered planar chelate ring with an oxygen atom of the neighboring -NO₂ group via intramolecular hydrogen bonding.\n3. In meta- and para-nitrophenol, the distance between the two functional groups is too large for intramolecular interaction, so they participate exclusively in intermolecular hydrogen bonding.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4130,
    question: "What is the total sum of angular nodes (nodal planes) present in one 3p_x orbital and one 3d_xy orbital?",
    option_a: "1",
    option_b: "2",
    option_c: "3",
    option_d: "4",
    correct_option: "C",
    explanation: "1. The number of angular nodes (nodal planes) for any atomic orbital equals its azimuthal quantum number, l.\n2. For a 3p_x orbital:\n   l = 1, so it has 1 nodal plane (the yz plane).\n3. For a 3d_xy orbital:\n   l = 2, so it has 2 nodal planes (the xz and yz planes).\n4. Total sum of nodal planes = 1 + 2 = 3.\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4131,
    question: "In which of the following homonuclear diatomic molecules are the number of σ bonds and π bonds equal to each other according to Molecular Orbital Theory?",
    option_a: "N₂",
    option_b: "C₂",
    option_c: "O₂",
    option_d: "H₂",
    correct_option: "C",
    explanation: "1. In O₂ (bond order = 2):\n   The electronic configuration is σ1s² σ*1s² σ2s² σ*2s² σ2p_z² (π2p_x² = π2p_y²) (π*2p_x¹ = π*2p_y¹).\n   Bond order = (N_b - N_a)/2 = (10 - 6)/2 = 2.\n   The double bond consists of exactly 1 σ bond and 1 π bond (net 1 σ and net 1 π), which are equal in number.\n2. In contrast:\n   - N₂ has 1 σ bond and 2 π bonds (unequal).\n   - C₂ has only 2 π bonds and 0 σ bonds (unequal).\n   - H₂ has 1 σ bond and 0 π bonds (unequal).\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4132,
    question: "Which of the following ionization processes transforms a diamagnetic species into another diamagnetic species?",
    option_a: "N₂ → N₂²⁻",
    option_b: "N₂ → N₂⁺",
    option_c: "O₂ → O₂⁺",
    option_d: "C₂²⁻ → C₂",
    correct_option: "D",
    explanation: "1. For C₂²⁻ (14 electrons, isoelectronic with N₂):\n   Electronic configuration has all paired electrons → Diamagnetic (magnetic moment μ = 0 BM).\n2. For C₂ (12 electrons):\n   Configuration: σ1s² σ*1s² σ2s² σ*2s² π2p_x² π2p_y².\n   All 12 electrons are paired in bonding orbitals → Diamagnetic (μ = 0 BM).\n3. Thus, during the process C₂²⁻ → C₂ (loss of 2 electrons from the highest σ orbital), the molecule remains strictly diamagnetic, and its magnetic moment remains zero throughout.\nTherefore, Option (D) is the correct answer."
  },
  {
    id: 4133,
    question: "According to Fajan's rules, what is the correct decreasing order of covalent character among the Lithium halides?",
    option_a: "LiI > LiBr > LiCl > LiF",
    option_b: "LiF > LiCl > LiBr > LiI",
    option_c: "LiCl > LiBr > LiI > LiF",
    option_d: "LiI > LiCl > LiBr > LiF",
    correct_option: "A",
    explanation: "1. According to Fajan's rules, covalent character is favored by:\n   - Small cation size\n   - Large anion size\n   - High charge on cation and anion\n2. For a common cation (Li⁺), the size of the halide anions increases down Group 17:\n   F⁻ < Cl⁻ < Br⁻ < I⁻\n3. Larger anions have more diffuse electron clouds, making them far more easily polarized by the Li⁺ cation.\n4. Greater polarization leads to greater electron sharing (covalent character).\n5. Hence, the covalent character decreases in the order:\n   LiI > LiBr > LiCl > LiF.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4134,
    question: "Which of the following ionic compounds exhibits the highest magnitude of lattice enthalpy?",
    option_a: "LiF",
    option_b: "MgO",
    option_c: "NaCl",
    option_d: "KBr",
    correct_option: "B",
    explanation: "1. Lattice energy (U) is approximately proportional to the product of ionic charges divided by the internuclear distance:\n   U ∝ |z₊ × z₋| / (r₊ + r₋)\n2. Comparing the charges:\n   - For LiF: |(+1) × (-1)| = 1\n   - For NaCl: |(+1) × (-1)| = 1\n   - For KBr: |(+1) × (-1)| = 1\n   - For MgO: |(+2) × (-2)| = 4\n3. The charge product for MgO is four times greater than that of the univalent salts, and both Mg²⁺ and O²⁻ are small second- and third-period ions.\n4. Consequently, MgO has by far the highest lattice enthalpy (~3791 kJ/mol).\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4135,
    question: "Which of the following pairs of species has identical shape and hybridization of the central atom?",
    option_a: "ClO₃⁻ and XeO₃",
    option_b: "SF₄ and XeF₄",
    option_c: "BF₃ and NF₃",
    option_d: "CO₂ and SO₂",
    correct_option: "A",
    explanation: "1. For ClO₃⁻:\n   - Central atom Cl (7 valence e⁻) + 1 negative charge = 8 e⁻.\n   - 3 oxygen atoms form 3 σ-bonds and 3 π-bonds, leaving 1 lone pair.\n   - Steric number = 3 + 1 = 4 → sp³ hybridization.\n   - Shape: Trigonal pyramidal.\n2. For XeO₃:\n   - Central atom Xe (8 valence e⁻).\n   - 3 oxygen atoms form 3 σ-bonds and 3 π-bonds, leaving 1 lone pair.\n   - Steric number = 3 + 1 = 4 → sp³ hybridization.\n   - Shape: Trigonal pyramidal.\n3. Therefore, both ClO₃⁻ and XeO₃ are trigonal pyramidal and isostructural.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4136,
    question: "What is the correct increasing order of the O-N-O bond angle in the following species: NO₂⁻, NO₂, and NO₂⁺?",
    option_a: "NO₂⁻ < NO₂ < NO₂⁺",
    option_b: "NO₂⁺ < NO₂ < NO₂⁻",
    option_c: "NO₂ < NO₂⁻ < NO₂⁺",
    option_d: "NO₂⁻ < NO₂⁺ < NO₂",
    correct_option: "A",
    explanation: "1. In NO₂⁺:\n   Nitrogen is sp hybridized with 2 σ-bonds and 0 lone pairs.\n   Geometry is linear; bond angle = 180°.\n2. In NO₂:\n   Nitrogen has 2 σ-bonds and 1 single unpaired electron.\n   A single electron exerts less repulsion on bond pairs than a complete lone pair; bond angle = ~134°.\n3. In NO₂⁻:\n   Nitrogen has 2 σ-bonds and 1 complete lone pair (2 electrons).\n   A full lone pair exerts strong repulsion, compressing the bond angle to ~115°.\n4. Hence, the increasing order of bond angle is:\n   NO₂⁻ (115°) < NO₂ (134°) < NO₂⁺ (180°).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4137,
    question: "Arrange the following diatomic species in order of increasing bond order: O₂²⁻, O₂⁻, O₂, and O₂⁺.",
    option_a: "O₂²⁻ < O₂⁻ < O₂ < O₂⁺",
    option_b: "O₂⁺ < O₂ < O₂⁻ < O₂²⁻",
    option_c: "O₂⁻ < O₂²⁻ < O₂ < O₂⁺",
    option_d: "O₂²⁻ < O₂ < O₂⁻ < O₂⁺",
    correct_option: "A",
    explanation: "From Molecular Orbital Theory, bond order = (N_b - N_a) / 2:\n1. O₂²⁻ (18 electrons): Bond order = (10 - 8) / 2 = 1.0\n2. O₂⁻ (17 electrons): Bond order = (10 - 7) / 2 = 1.5\n3. O₂ (16 electrons): Bond order = (10 - 6) / 2 = 2.0\n4. O₂⁺ (15 electrons): Bond order = (10 - 5) / 2 = 2.5\nThus, the increasing order of bond order is:\nO₂²⁻ (1.0) < O₂⁻ (1.5) < O₂ (2.0) < O₂⁺ (2.5).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4138,
    question: "In which of the following species is the central atom sp² hybridized?\n(I) BF₃\n(II) SO₂\n(III) NH₄⁺\n(IV) H₂O",
    option_a: "(I) and (II) only",
    option_b: "(I) and (III) only",
    option_c: "(II) and (IV) only",
    option_d: "(III) and (IV) only",
    correct_option: "A",
    explanation: "- In BF₃: Boron has 3 bond pairs and 0 lone pairs → Steric number = 3 → sp² hybridization (Trigonal planar).\n- In SO₂: Sulfur has 2 σ-bonds and 1 lone pair → Steric number = 3 → sp² hybridization (Bent).\n- In NH₄⁺: Nitrogen has 4 σ-bonds and 0 lone pairs → Steric number = 4 → sp³ hybridization (Tetrahedral).\n- In H₂O: Oxygen has 2 σ-bonds and 2 lone pairs → Steric number = 4 → sp³ hybridization (Bent).\nHence, only (I) and (II) possess an sp² hybridized central atom.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4139,
    question: "What is the primary intermolecular attractive force that must be overcome when liquid Ethanol (C₂H₅OH) is vaporized into the gas phase?",
    option_a: "Hydrogen bonding",
    option_b: "London dispersion forces",
    option_c: "Dipole-induced dipole forces",
    option_d: "Covalent bonding",
    correct_option: "A",
    explanation: "1. Ethanol contains a highly polar -O-H group where hydrogen is directly bonded to an electronegative oxygen atom.\n2. In the liquid state, ethanol molecules are held together primarily by strong intermolecular hydrogen bonds.\n3. During the phase transition from liquid to vapor, these intermolecular hydrogen bonds are broken to separate the molecules into the gas phase.\n4. (The strong intramolecular covalent bonds within each molecule remain intact during vaporization).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4140,
    question: "According to Molecular Orbital Theory, which of the following diatomic homonuclear molecules has a bond order of zero and therefore cannot exist under normal conditions?",
    option_a: "He₂",
    option_b: "Li₂",
    option_c: "B₂",
    option_d: "C₂",
    correct_option: "A",
    explanation: "1. The Helium atom has electronic configuration 1s².\n2. In a hypothetical He₂ molecule (4 electrons), the molecular orbital configuration is: σ1s² σ*1s².\n3. Number of bonding electrons (N_b) = 2.\n   Number of antibonding electrons (N_a) = 2.\n4. Bond Order = (N_b - N_a) / 2 = (2 - 2) / 2 = 0.\n5. A bond order of zero signifies that no net stabilization occurs; hence He₂ is completely unstable and does not exist.\nTherefore, Option (A) is the correct answer."
  }
];

async function run() {
  try {
    const token = await login();
    console.log('Logged in successfully, token received.');
    let count = 0;
    for (const item of updates) {
      await updateQuestion(token, item.id, item);
      count++;
      console.log(`[SUCCESS] Updated question ${item.id} (${count}/${updates.length})`);
    }
    console.log(`Set 20 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
