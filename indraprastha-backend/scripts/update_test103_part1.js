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
    id: 3840,
    similarQuestion: {
      question: "Which of the following ammonium salts undergoes thermal decomposition to release N₂O gas instead of ammonia (NH₃)?",
      option_a: "(NH₄)₂SO₄",
      option_b: "NH₄Cl",
      option_c: "NH₄NO₃",
      option_d: "(NH₄)₂CO₃",
      correct_option: "C",
      explanation: "1. Most ammonium salts of non-oxidizing acids (such as NH₄Cl, (NH₄)₂SO₄, (NH₄)₂CO₃) undergo reversible thermal dissociation upon heating to produce ammonia gas (NH₃) and the corresponding acid.\n2. In contrast, ammonium nitrate (NH₄NO₃) contains the nitrate anion (NO₃⁻) which acts as an internal oxidizing agent. On controlled heating (around 250°C), it undergoes redox decomposition:\nNH₄NO₃(s) → N₂O(g) + 2 H₂O(g)\nTherefore, nitrous oxide (N₂O) is evolved rather than ammonia.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3841,
    similarQuestion: {
      question: "Which of the following statements regarding the oxides of copper (CuO and Cu₂O) is/are correct?\n(A) In cupric oxide (CuO), copper is in the +2 oxidation state with a 3d⁹ configuration and is paramagnetic.\n(B) In cuprous oxide (Cu₂O), copper is in the +1 oxidation state with a fully filled 3d¹⁰ configuration and is diamagnetic.\n(C) Thermal decomposition of malachite green, CuCO₃·Cu(OH)₂, yields black cupric oxide (CuO), CO₂, and H₂O.\n(D) All of the above statements are correct.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us examine each statement:\n1. In black CuO, copper is Cu²⁺ with 3d⁹ electronic configuration (one unpaired electron in d-subshell), rendering it paramagnetic. (Statement A is correct)\n2. In red Cu₂O, copper is Cu⁺ with 3d¹⁰ configuration (all electrons paired), making it diamagnetic. (Statement B is correct)\n3. Basic copper carbonate CuCO₃·Cu(OH)₂ on heating decomposes according to:\nCuCO₃·Cu(OH)₂ → 2 CuO(s) + CO₂(g) + H₂O(g). (Statement C is correct)\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3842,
    similarQuestion: {
      question: "When oxygen gas (O₂) is chemisorbed onto a transition metal surface, electron transfer occurs from the metal to the O₂ molecule, forming a superoxide (O₂⁻) or peroxide (O₂²⁻) species. Which of the following statements is TRUE regarding this chemisorption process?",
      option_a: "The adsorption process is endothermic (heat is absorbed).",
      option_b: "The O-O bond order decreases and the O-O bond length increases.",
      option_c: "The incoming electrons enter the bonding π₂ₚ molecular orbitals of O₂.",
      option_d: "The chemisorption is completely reversible with negligible enthalpy of adsorption.",
      correct_option: "B",
      explanation: "1. According to Molecular Orbital Theory, the lowest unoccupied molecular orbitals (LUMO) of ground-state O₂ (bond order = 2) are antibonding π*₂p orbitals.\n2. When electron density is donated from the metal d-orbitals to O₂, the electrons occupy these antibonding π*₂p orbitals:\nO₂ + e⁻ → O₂⁻ (bond order drops to 1.5)\nO₂ + 2 e⁻ → O₂²⁻ (bond order drops to 1.0)\n3. Because the bond order decreases, the O-O bond is significantly weakened and the bond length increases.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3843,
    similarQuestion: {
      question: "Which of the following pairs is INCORRECTLY matched with regard to the potential energy (U) dependence on intermolecular separation distance (r)?",
      option_a: "Ion - Dipole interaction : U ∝ r⁻²",
      option_b: "Dipole - Dipole interaction (stationary polar molecules) : U ∝ r⁻³",
      option_c: "London dispersion forces : U ∝ r⁻⁶",
      option_d: "Ion - Induced dipole interaction : U ∝ r⁻²",
      correct_option: "D",
      explanation: "The theoretical distance dependencies of intermolecular potential energies are:\n1. Ion - Dipole interaction: U ∝ 1 / r²\n2. Dipole - Dipole (stationary): U ∝ 1 / r³\n3. Dipole - Dipole (rotating Keesom forces): U ∝ 1 / r⁶\n4. Dipole - Induced dipole (Debye forces): U ∝ 1 / r⁶\n5. London dispersion forces: U ∝ 1 / r⁶\n6. Ion - Induced dipole interaction: The electric field of the ion is E ∝ 1/r², so the induced dipole is μ_ind ∝ 1/r², giving interaction energy U = -(1/2) α E² ∝ 1 / r⁴ (not 1/r²).\nTherefore, pair (D) is INCORRECTLY matched.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3844,
    similarQuestion: {
      question: "Which of the following comparisons of boiling points is INCORRECT?",
      option_a: "H₂O < H₂S",
      option_b: "B(OCH₃)₃ < B(OH)₃",
      option_c: "CH₄ < SiH₄",
      option_d: "HF > HCl",
      correct_option: "A",
      explanation: "1. Due to strong intermolecular hydrogen bonding, water (H₂O, bp = 373 K) has a dramatically higher boiling point than hydrogen sulfide (H₂S, bp = 213 K). Thus, H₂O < H₂S is INCORRECT.\n2. Boric acid B(OH)₃ forms an extensive two-dimensional hydrogen-bonded planar network, giving it a much higher melting/boiling point than trimethyl borate B(OCH₃)₃, which has no H-bonding.\n3. SiH₄ has greater molecular mass and surface area than CH₄, hence stronger London dispersion forces and higher boiling point.\n4. HF exhibits hydrogen bonding, giving it a higher boiling point than HCl.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3845,
    similarQuestion: {
      question: "As the percentage of s-character in a hybrid orbital decreases (for example, transitioning from sp to sp² to sp³):\n(I) The bond angle decreases (180° → 120° → 109.5°)\n(II) The electronegativity of the hybrid orbital decreases\n(III) The bond length increases\n(IV) The size and directional lobe length of the hybrid orbital increases\nWhich of the statements given above are correct?",
      option_a: "(I) and (III) only",
      option_b: "(I), (II), (III), and (IV)",
      option_c: "(II) and (IV) only",
      option_d: "(I), (III), and (IV) only",
      correct_option: "B",
      explanation: "Let us evaluate the consequences of decreasing s-character (sp → sp² → sp³):\n1. Bond angle decreases from 180° (sp) to 120° (sp²) to 109.5° (sp³). (Statement I is correct)\n2. Since s-orbitals are held more tightly by the nucleus, a decrease in s-character reduces the effective electronegativity: sp > sp² > sp³. (Statement II is correct)\n3. As s-character decreases, hybrid orbitals become more elongated, resulting in longer bond lengths (C-C single bond > double bond > triple bond). (Statement III is correct)\n4. p-orbitals are more diffuse and larger than s-orbitals, so higher p-character increases the size and reach of the hybrid orbital. (Statement IV is correct)\nTherefore, all four statements are correct.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3846,
    similarQuestion: {
      question: "Using Coulson's theorem for hybridized orbitals, the inter-orbital angle θ between two equivalent hybrid orbitals is related to their hybridization spⁱ by the relation:\n1 + i cos θ = 0\nFor a water molecule (H₂O), the experimental bond angle is ∠H-O-H = 104.5° (with cos 104.5° = -0.25). What is the percentage of s-character in the O-H bonding hybrid orbitals of oxygen?",
      option_a: "20%",
      option_b: "25%",
      option_c: "33.3%",
      option_d: "15%",
      correct_option: "A",
      explanation: "From Coulson's hybridization formula:\n1 + i cos θ = 0\n\nGiven cos θ = -0.25:\n1 + i (-0.25) = 0\n0.25 i = 1  ⇒  i = 1 / 0.25 = 4\n\nThis means the O-H bonding orbital is sp⁴ hybridized.\nThe fraction of s-character is:\n% s-character = [1 / (1 + i)] × 100% = [1 / (1 + 4)] × 100% = (1/5) × 100% = 20%\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3847,
    similarQuestion: {
      question: "In a water molecule (H₂O), the two O-H bonding orbitals have 20% s-character and 80% p-character each. Considering that the total s-character from the central oxygen atom is 100% and total p-character is 300% (three 2p orbitals), what is the percentage of s-character in each of the two lone pair orbitals of oxygen?",
      option_a: "20%",
      option_b: "30%",
      option_c: "50%",
      option_d: "70%",
      correct_option: "B",
      explanation: "Total s-character available from the valence shell of oxygen is 100% (from the 2s orbital).\n1. The two O-H bonding orbitals utilize:\n2 × 20% = 40% of the total s-character.\n\n2. The remaining s-character is distributed equally between the two lone pair orbitals:\nRemaining s-character = 100% - 40% = 60%\n\n3. Percentage of s-character in each lone pair orbital:\n% s = 60% / 2 = 30%\n(Consequently, each lone pair orbital has 100% - 30% = 70% p-character).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3848,
    similarQuestion: {
      question: "Which of the following combinations of properties of a solvent and solute favors high solubility of an ionic crystalline compound in that solvent?",
      option_a: "High dielectric constant of solvent, high hydration enthalpy of ions, and low lattice energy of the crystal.",
      option_b: "Low dielectric constant of solvent, high lattice energy, and low hydration enthalpy.",
      option_c: "High lattice energy, non-polar solvent, and high dipole moment.",
      option_d: "Low dielectric constant of solvent, high hydration enthalpy, and high lattice energy.",
      correct_option: "A",
      explanation: "Dissolution of an ionic solid is thermodynamically favorable when:\n1. The hydration enthalpy (solvation energy) is greater than the lattice energy (ΔH_solution < 0).\n2. The solvent has a high dielectric constant (like water, ε_r ≈ 80), which effectively weakens the electrostatic Coulombic forces between the oppositely charged ions, facilitating ion separation.\n3. The solvent molecules have high dipole moments, leading to strong ion-dipole attractions.\nTherefore, high dielectric constant, high hydration energy, and lower lattice energy maximize solubility.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3849,
    similarQuestion: {
      question: "In an antibonding molecular orbital (such as σ* or π*), what is the value of the electron probability density in the nodal plane located between the two nuclei?",
      option_a: "Maximum",
      option_b: "Equal to that in the bonding orbital",
      option_c: "Zero",
      option_d: "Infinite",
      correct_option: "C",
      explanation: "An antibonding molecular orbital is formed by destructive interference (out-of-phase combination) of atomic orbitals (ψ_A - ψ_B):\n1. In the region midway between the nuclei, the wavefunctions cancel each other out, resulting in ψ = 0.\n2. Since electron probability density is given by |ψ|², it is identically zero at the nodal plane.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3850,
    similarQuestion: {
      question: "According to Bent's rule, more electronegative substituents preferentially occupy hybrid orbitals with greater p-character (axial positions in trigonal bipyramidal geometry). For the molecule PCl₃F₂:\n(A) The geometry around phosphorus is trigonal bipyramidal.\n(B) Both fluorine atoms occupy the axial positions.\n(C) All three chlorine atoms occupy the equatorial positions.\n(D) The molecule has a net dipole moment of zero (μ = 0).",
      option_a: "A and B only",
      option_b: "A, B, and C only",
      option_c: "A, B, C, and D",
      option_d: "B and D only",
      correct_option: "C",
      explanation: "Let us analyze the PCl₃F₂ molecule:\n1. Phosphorus has 5 valence electrons and forms 5 single bonds: steric number = 5 (sp³d hybridization, trigonal bipyramidal geometry). (Statement A is correct)\n2. According to Bent's rule, more electronegative substituents prefer orbitals with lower s-character (axial orbitals have 0% s-character, pd hybridized). Since F is more electronegative than Cl, both F atoms occupy axial positions. (Statement B is correct)\n3. Chlorine atoms occupy the three equatorial positions (sp² hybridized with 33.3% s-character). (Statement C is correct)\n4. The axial P-F dipoles cancel directly along the 180° axis, and the three equatorial P-Cl bond dipoles cancel symmetrically at 120°, making the net molecular dipole moment zero (μ = 0). (Statement D is correct)\nTherefore, all four statements are correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3851,
    similarQuestion: {
      question: "Which of the following free radicals has a strictly planar (sp² hybridized) geometry?",
      option_a: "•CF₃",
      option_b: "•CH₃",
      option_c: "•CHF₂",
      option_d: "•NF₂",
      correct_option: "B",
      explanation: "1. In the methyl radical (•CH₃), carbon is sp² hybridized with bond angles close to 120°. The odd electron resides in an unhybridized pure 2p_z orbital perpendicular to the molecular plane, giving it a planar geometry.\n2. In contrast, in the trifluoromethyl radical (•CF₃), the high electronegativity of the three fluorine atoms withdraws electron density, concentrating s-character in the orbital containing the odd electron according to Bent's rule. Consequently, •CF₃ is sp³ hybridized with a pyramidal geometry.\nTherefore, •CH₃ is strictly planar.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3852,
    similarQuestion: {
      question: "Which of the following statements regarding odd-electron molecules is/are correct?\n(A) The nitric oxide (NO) molecule is paramagnetic in the gaseous state with one unpaired electron in its π* antibonding molecular orbital.\n(B) In the trifluoromethyl radical (•CF₃), the odd electron resides in an sp³ hybrid orbital, giving it a pyramidal geometry.\n(C) In the methyl radical (•CH₃), the odd electron resides in an unhybridized 2p_z orbital, resulting in a planar geometry.\n(D) All of the above statements are correct.",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A and C only",
      option_d: "All of the above (A, B, and C)",
      correct_option: "D",
      explanation: "Let us review odd-electron species:\n1. NO has 15 valence electrons. According to Molecular Orbital Theory, its configuration is σ₁s² σ*₁s² σ₂s² σ*₂s² π₂p_x² π₂p_y² σ₂p_z² (π*₂p_x)¹, with one unpaired electron in a π* antibonding orbital, making it paramagnetic. Statement (A) is correct.\n2. In •CF₃, strong electronegativity of fluorine induces sp³ hybridization with the single electron occupying an sp³ lobe, giving a pyramidal shape. Statement (B) is correct.\n3. In •CH₃, carbon is sp² hybridized and planar, with the odd electron in an unhybridized p_z orbital. Statement (C) is correct.\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3853,
    similarQuestion: {
      question: "Consider the dimerization of the methyl radical:\n2 •CH₃ → C₂H₆ (ethane)\nWhich of the following statements regarding this dimerization is INCORRECT?",
      option_a: "The hybridization of the carbon atom changes from sp² in •CH₃ to sp³ in C₂H₆.",
      option_b: "The H-C-H bond angle increases from approximately 109.5° in •CH₃ to 120° in C₂H₆.",
      option_c: "The geometry around each carbon changes from trigonal planar to tetrahedral.",
      option_d: "The unpaired electron pair is converted into a localized C-C σ bonding pair.",
      correct_option: "B",
      explanation: "Let us analyze the dimerization reaction:\n1. In the planar methyl radical (•CH₃), carbon is sp² hybridized with H-C-H bond angles of approximately 120°.\n2. In ethane (C₂H₆), each carbon is sp³ hybridized with tetrahedral geometry and H-C-H bond angles of approximately 109.5°.\n3. Therefore, the H-C-H bond angle DECREASES from 120° to 109.5°, not increases. Hence, statement (B) is INCORRECT.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3854,
    similarQuestion: {
      question: "In which of the following pairs of substances is dipole-dipole attraction the predominant intermolecular force?",
      option_a: "NaCl and H₂O",
      option_b: "Benzene (C₆H₆) and Carbon tetrachloride (CCl₄)",
      option_c: "Acetone (CH₃COCH₃) and Acetonitrile (CH₃CN)",
      option_d: "Water (H₂O) and Ethanol (C₂H₅OH)",
      correct_option: "C",
      explanation: "Let us inspect the intermolecular interactions:\n1. NaCl and H₂O: Ion-dipole interaction.\n2. Benzene and CCl₄: Both are non-polar symmetrical molecules; London dispersion forces predominate.\n3. Water and Ethanol: Both contain O-H groups and form strong intermolecular hydrogen bonds.\n4. Acetone (μ = 2.88 D) and Acetonitrile (μ = 3.92 D): Both are highly polar aprotic molecules with strong permanent dipoles, but neither possesses hydrogen bonded to N, O, or F. Therefore, dipole-dipole forces predominate.\nTherefore, Option (C) is the correct answer."
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
    console.log(`Test 103 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
