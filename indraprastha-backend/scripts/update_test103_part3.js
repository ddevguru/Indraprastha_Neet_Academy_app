const https = require('https');

const loginData = JSON.stringify({
  username: 'indraprasthaadmin',
  password: 'indraprastha@123'
});

function postRequest(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function putRequest(url, data, token) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
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
    id: 4686,
    similarQuestion: {
      question: "Which of the following diatomic species has a bond order different from that of N₂ (bond order = 3)?",
      option_a: "CO",
      option_b: "NO⁺",
      option_c: "CN⁻",
      option_d: "O₂⁺",
      correct_option: "D",
      explanation: "From Molecular Orbital Theory:\n1. N₂, CO, NO⁺, and CN⁻ are isoelectronic species with 14 electrons each, possessing a bond order of 3:\nBond order = (10 - 4) / 2 = 3\n2. O₂⁺ has 15 electrons, with MO configuration having one electron in the π* antibonding level:\nBond order = (10 - 5) / 2 = 2.5\nTherefore, O₂⁺ has a bond order different from N₂.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4687,
    similarQuestion: {
      question: "The bond order of O₂ is 2, while that of O₂⁺ is 2.5. Which of the following statements correctly compares the oxygen-oxygen bond in O₂ and O₂⁺?",
      option_a: "The O-O bond length in O₂⁺ is greater than in O₂.",
      option_b: "The O-O bond length in O₂⁺ is shorter than in O₂.",
      option_c: "The O-O bond dissociation energy is greater in O₂ than in O₂⁺.",
      option_d: "Both species have identical bond lengths and bond strengths.",
      correct_option: "B",
      explanation: "Bond length is inversely related to bond order:\nBond order of O₂ = 2.0\nBond order of O₂⁺ = 2.5\n\nBecause O₂⁺ has a higher bond order, the electrostatic attraction between the nuclei and the bonding electrons is stronger, resulting in a stronger bond and a shorter O-O bond length compared to neutral O₂.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4688,
    similarQuestion: {
      question: "In an ideal octahedral molecule like SF₆ (sp³d² hybridization with zero lone pairs), how many adjacent 90° F-S-F bond angles exist?",
      option_a: "6",
      option_b: "8",
      option_c: "12",
      option_d: "4",
      correct_option: "C",
      explanation: "In an octahedral SF₆ geometry:\n1. In the equatorial plane, there are 4 fluorine atoms forming four adjacent 90° F-S-F bond angles with one another.\n2. The top axial fluorine forms a 90° bond angle with each of the four equatorial fluorines (4 angles).\n3. The bottom axial fluorine likewise forms a 90° bond angle with each of the four equatorial fluorines (4 angles).\n4. Total number of 90° bond angles = 4 + 4 + 4 = 12.\n(The remaining 3 angles are 180° collinear axes).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4689,
    similarQuestion: {
      question: "According to VSEPR theory, what is the molecular geometry and hybridization of the central atom in antimony pentafluoride, SbF₅?",
      option_a: "Square pyramidal, sp³d²",
      option_b: "Trigonal bipyramidal, sp³d",
      option_c: "Pentagonal planar, sp³d³",
      option_d: "Tetrahedral, sp³",
      correct_option: "B",
      explanation: "Antimony (Sb) belongs to Group 15 with 5 valence electrons.\n1. It forms 5 single covalent bonds with 5 fluorine atoms and possesses 0 lone pairs.\n2. Steric number = 5 bond pairs + 0 lone pairs = 5.\n3. Hybridization = sp³d.\n4. According to VSEPR theory, 5 bond pairs arrange themselves to minimize repulsion by adopting a trigonal bipyramidal geometry.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4690,
    similarQuestion: {
      question: "Although both carbon dioxide (CO₂) and sulfur dioxide (SO₂) are triatomic molecules, CO₂ is strictly linear while SO₂ has an angular (bent) structure. This difference arises because:",
      option_a: "The central carbon in CO₂ forms two σ-bonds and has zero lone pairs (sp hybridization), while sulfur in SO₂ has two σ-bonds and one lone pair (sp² hybridization).",
      option_b: "Carbon is more electronegative than sulfur.",
      option_c: "Oxygen forms only single bonds in SO₂ but triple bonds in CO₂.",
      option_d: "SO₂ is non-polar, whereas CO₂ is strongly polar.",
      correct_option: "A",
      explanation: "1. In CO₂, carbon has 4 valence electrons and forms two double bonds (O=C=O) with zero lone pairs on carbon. Steric number = 2 ⇒ sp hybridization ⇒ linear geometry with bond angle 180°.\n2. In SO₂, sulfur has 6 valence electrons, forming two bonds with oxygen while retaining one non-bonding lone pair. Steric number = 2 bond pairs + 1 lone pair = 3 ⇒ sp² hybridization ⇒ bent (V-shaped) geometry with bond angle ~119° due to lone pair-bond pair repulsion.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4691,
    similarQuestion: {
      question: "Taking the z-axis as the internuclear axis between two bonding atoms, which of the following combinations of atomic orbitals will result in a π-bond rather than a σ-bond?",
      option_a: "2s and 2s",
      option_b: "2s and 2p_z",
      option_c: "2p_x and 2p_x",
      option_d: "2p_z and 2p_z",
      correct_option: "C",
      explanation: "With the z-axis designated as the internuclear axis:\n1. Orbitals aligned along the internuclear axis undergo coaxial head-on overlap, forming cylindrical σ-bonds (2s-2s, 2s-2p_z, and 2p_z-2p_z).\n2. Orbitals oriented perpendicular to the z-axis (such as 2p_x and 2p_y) undergo lateral (sideways) overlap above and below the internuclear axis, forming π-bonds.\nTherefore, 2p_x and 2p_x produce a π-bond.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4692,
    similarQuestion: {
      question: "What are the hybridization states of carbon 1 and carbon 2 in ethanenitrile (CH₃-C≡N), from left to right?",
      option_a: "sp³ and sp²",
      option_b: "sp³ and sp",
      option_c: "sp² and sp",
      option_d: "sp and sp³",
      correct_option: "B",
      explanation: "In ethanenitrile (CH₃-C≡N):\n1. The methyl carbon (C₁) forms four single σ-bonds (three with H, one with C). Steric number = 4 ⇒ sp³ hybridization.\n2. The nitrile carbon (C₂) forms two σ-bonds (one C-C σ-bond and one C-N σ-bond) along with two mutually perpendicular C-N π-bonds. Steric number = 2 ⇒ sp hybridization (linear).\nTherefore, the hybridizations are sp³ and sp, respectively.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4693,
    similarQuestion: {
      question: "According to the Linear Combination of Atomic Orbitals (LCAO) approximation in Molecular Orbital Theory, which of the following conditions must be satisfied for two atomic orbitals to combine effectively?\n(A) The combining atomic orbitals must have comparable energies.\n(B) The combining atomic orbitals must have the same symmetry with respect to the molecular axis.\n(C) The combining atomic orbitals must overlap to an appreciable extent.\n(D) All of the above.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "For effective linear combination of atomic orbitals to produce bonding and antibonding molecular orbitals, three fundamental LCAO criteria must be satisfied:\n1. Energy criterion: Combining atomic orbitals must possess nearly equal or comparable energies (e.g., 1s combines with 1s, but not 1s with 2s in homonuclear diatomics).\n2. Symmetry criterion: The orbitals must have proper spatial symmetry relative to the internuclear axis (e.g., 2p_z combines with 2p_z along the z-axis, but not 2p_x with 2p_z).\n3. Overlap criterion: The atomic orbitals must overlap to a maximum extent to build up electron density in the internuclear region.\nTherefore, all conditions are necessary.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4694,
    similarQuestion: {
      question: "In gaseous phosphorus pentachloride (PCl₅), the two axial P-Cl bonds are distinctly longer and weaker than the three equatorial P-Cl bonds because:",
      option_a: "The axial P-Cl bond pairs experience greater electrostatic repulsion from three equatorial bond pairs at 90°.",
      option_b: "The axial bonds are formed by pure s-orbitals.",
      option_c: "Chlorine atoms at the axial positions have higher electronegativity.",
      option_d: "The equatorial bonds experience greater repulsion from axial bonds at 180°.",
      correct_option: "A",
      explanation: "In the trigonal bipyramidal structure of PCl₅:\n1. Each axial bond pair lies at 90° to three equatorial bond pairs, experiencing strong repulsion from three electron pairs.\n2. In contrast, each equatorial bond pair experiences 90° repulsion from only two axial bond pairs (the other two equatorial bonds are at 120°, where repulsion is minimal).\n3. Because repulsions are stronger for axial bonds, they are pushed farther outward, making axial P-Cl bonds (240 pm) significantly longer and weaker than equatorial P-Cl bonds (202 pm).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4695,
    similarQuestion: {
      question: "In the Lewis electron dot structure of the oxide ion (O²⁻), what is the total number of valence electrons shown around the oxygen symbol, and what is its net bracket charge?",
      option_a: "6 electrons, charge 2-",
      option_b: "8 electrons (four lone pairs), enclosed in brackets with a 2- charge: [:Ö:]²⁻",
      option_c: "8 electrons, without brackets and neutral charge",
      option_d: "10 electrons, charge 2-",
      correct_option: "B",
      explanation: "A neutral oxygen atom has 6 valence electrons (2s² 2p⁴). Upon gaining two electrons to form the oxide anion (O²⁻), its valence shell achieves a complete octet of 8 electrons (four lone pairs), written as [:Ö:]²⁻ enclosed in brackets with an overall 2- superscript charge.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4696,
    similarQuestion: {
      question: "During the formation of crystalline sodium chloride (NaCl) from neutral sodium and chlorine atoms, chemical bond formation primarily occurs through:",
      option_a: "Equal sharing of electron pairs to form covalent bonds.",
      option_b: "Complete transfer of a valence electron from sodium to chlorine, followed by electrostatic attraction between Na⁺ and Cl⁻ ions.",
      option_c: "Overlap of empty 3d orbitals on sodium with 3p orbitals on chlorine.",
      option_d: "Formation of coordinate covalent bonds.",
      correct_option: "B",
      explanation: "In the formation of NaCl:\n1. Sodium (1s² 2s² 2p⁶ 3s¹) readily loses its single 3s valence electron to form a stable Na⁺ cation ([Ne] configuration).\n2. Chlorine (1s² 2s² 2p⁶ 3s² 3p⁵) gains this electron to achieve a stable Cl⁻ anion ([Ar] configuration).\n3. The oppositely charged ions are subsequently held together in a three-dimensional crystal lattice by strong, non-directional electrostatic Coulombic forces (ionic bonding).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4697,
    similarQuestion: {
      question: "According to the Mendeleev and modern periodic classifications, the common chemical valency of a representative element is generally equal to:",
      option_a: "Its atomic number.",
      option_b: "Its mass number.",
      option_c: "The number of valence electrons or (8 minus the number of valence electrons).",
      option_d: "The total number of inner shell electrons.",
      correct_option: "C",
      explanation: "For main group (representative) elements:\n1. For elements of Groups 1 to 14, the group valency is equal to the number of valence electrons (e.g., Na = 1, Mg = 2, Al = 3, C = 4).\n2. For elements of Groups 15 to 18, the valency is commonly equal to (8 - number of valence electrons) (e.g., N = 8 - 5 = 3, O = 8 - 6 = 2, F = 8 - 7 = 1, Ne = 8 - 8 = 0).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4698,
    similarQuestion: {
      question: "In the formation of the ammonium ion (NH₄⁺) from an ammonia molecule (NH₃) and a proton (H⁺), the fourth N-H bond is classified as a:",
      option_a: "Pure ionic bond formed by electron transfer.",
      option_b: "Coordinate (dative) covalent bond formed by one-sided donation of the nitrogen lone pair to the vacant 1s orbital of H⁺.",
      option_c: "Hydrogen bond.",
      option_d: "Metallic bond.",
      correct_option: "B",
      explanation: "In ammonia (NH₃), the nitrogen atom possesses a non-bonding lone pair of electrons in an sp³ hybrid orbital. When a proton (H⁺, having an empty 1s orbital) approaches, nitrogen donates both electrons of this lone pair into the empty orbital of H⁺. This one-sided sharing constitutes a coordinate (dative covalent) bond: H₃N: → H⁺.\n(Once formed, all four N-H bonds in NH₄⁺ become identical due to resonance and charge delocalization).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4699,
    similarQuestion: {
      question: "In the classic resonance Lewis structure of the ozone molecule (O₃):\nO(1) = O(2) - O(3)\nWhat are the formal charges on the terminal double-bonded oxygen O(1), the central oxygen O(2), and the terminal single-bonded oxygen O(3), respectively?",
      option_a: "0, 0, 0",
      option_b: "+1, -1, 0",
      option_c: "0, +1, -1",
      option_d: "-1, +1, -1",
      correct_option: "C",
      explanation: "Formal charge = (Valence electrons) - (Non-bonding electrons) - (1/2 × Bonding electrons)\nFor neutral oxygen, valence electrons = 6.\n\n1. Terminal double-bonded oxygen O(1):\nNon-bonding electrons = 4 (two lone pairs)\nBonding electrons = 4 (double bond)\nFormal charge = 6 - 4 - (1/2 × 4) = 6 - 4 - 2 = 0\n\n2. Central oxygen O(2):\nNon-bonding electrons = 2 (one lone pair)\nBonding electrons = 6 (three bonds: one double, one single)\nFormal charge = 6 - 2 - (1/2 × 6) = 6 - 2 - 3 = +1\n\n3. Terminal single-bonded oxygen O(3):\nNon-bonding electrons = 6 (three lone pairs)\nBonding electrons = 2 (single bond)\nFormal charge = 6 - 6 - (1/2 × 2) = 6 - 6 - 1 = -1\n\nTherefore, formal charges are 0, +1, -1.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await postRequest('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.data.token;
    console.log('Logged in successfully.');

    let count = 0;
    for (const item of updates) {
      count++;
      const res = await putRequest(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`,
        JSON.stringify({ similarQuestion: item.similarQuestion }),
        token
      );
      if (res.status === 200) {
        console.log(`[SUCCESS] Updated Test 103 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 103 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
