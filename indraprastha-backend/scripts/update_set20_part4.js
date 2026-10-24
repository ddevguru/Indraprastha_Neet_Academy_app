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
    id: 4193,
    question: "Which of the following statements correctly compares melting points based on ionic/covalent character?\n(I) SnCl₂ has a higher melting point than SnCl₄\n(II) Diamond has a higher melting point than Al₂O₃",
    option_a: "Both (I) and (II) are correct",
    option_b: "(I) is correct but (II) is incorrect",
    option_c: "(I) is incorrect but (II) is correct",
    option_d: "Both (I) and (II) are incorrect",
    correct_option: "A",
    explanation: "1. By Fajan's rules, a cation with a higher oxidation state has greater polarizing power. Sn⁴⁺ polarizes chloride ions much more strongly than Sn²⁺, making SnCl₄ predominantly covalent (liquid at room temperature, m.p. -33 °C) whereas SnCl₂ is largely ionic (solid, m.p. 247 °C). Hence, SnCl₂ has a much higher melting point than SnCl₄; statement (I) is correct.\n2. Diamond is a rigid three-dimensional covalent network solid with extraordinarily strong carbon-carbon sp³ bonds (m.p. > 4000 K), which exceeds the melting point of corundum (Al₂O₃, m.p. ~2345 K); statement (II) is correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4194,
    question: "Assuming the internuclear axis to be the z-axis, which of the following atomic orbital combinations will form a π-molecular orbital?\n(I) 2p_x + 2p_x\n(II) 2p_y + 2p_y\n(III) 2p_z + 2p_z\n(IV) 2s + 2p_z",
    option_a: "(I) and (II) only",
    option_b: "(III) and (IV) only",
    option_c: "(I) and (III) only",
    option_d: "(II) and (IV) only",
    correct_option: "A",
    explanation: "1. When the z-axis is defined as the internuclear axis:\n   - 2p_z orbitals lie directly along the internuclear axis and undergo end-to-end (axial) overlap, forming a σ-bond.\n   - 2s and 2p_z also overlap along the axis to form a σ-bond.\n2. The 2p_x and 2p_y orbitals are oriented perpendicular to the z-axis.\n3. Therefore, 2p_x + 2p_x and 2p_y + 2p_y overlap laterally (sideways), leading to the formation of π-bonds.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4195,
    question: "Which of the following compounds exhibits intramolecular hydrogen bonding?\n(I) Chloral hydrate [CCl₃CH(OH)₂]\n(II) Salicylaldehyde\n(III) para-Nitrophenol",
    option_a: "(I) and (II) only",
    option_b: "(II) and (III) only",
    option_c: "(I) and (III) only",
    option_d: "(I), (II), and (III)",
    correct_option: "A",
    explanation: "1. In Chloral hydrate, the two -OH groups on the gem-diol carbon form intramolecular hydrogen bonds with the chlorine atoms of the bulky -CCl₃ group, stabilizing the usually unstable gem-diol structure.\n2. In Salicylaldehyde (ortho-hydroxybenzaldehyde), the phenolic -OH group forms a stable six-membered chelate ring with the adjacent formyl -CHO oxygen atom via intramolecular hydrogen bonding.\n3. In para-nitrophenol, the functional groups are located far apart at opposite ends of the benzene ring and can only participate in intermolecular hydrogen bonding.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4196,
    question: "Which of the following metal salts releases only sulfur dioxide (SO₂) gas without producing any sulfur trioxide (SO₃) upon thermal decomposition?",
    option_a: "CaSO₃",
    option_b: "FeSO₄",
    option_c: "ZnSO₄",
    option_d: "Fe₂(SO₄)₃",
    correct_option: "A",
    explanation: "1. Metal sulfites decompose on heating to yield the corresponding metal oxide and pure SO₂ gas:\n   CaSO₃(s) → CaO(s) + SO₂(g)\n2. In contrast, metal sulfates undergo thermal decomposition to yield either SO₃ or mixtures of SO₂ and SO₃ (or O₂):\n   2 FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g)\n   ZnSO₄(s) → ZnO(s) + SO₃(g) (which further dissociates into SO₂ + 1/2 O₂ at high temperatures).\n3. Hence, only the sulfite (CaSO₃) cleanly yields exclusively SO₂ gas.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4197,
    question: "Which of the following represents the correct decreasing order of solubility in water for alkaline earth metal sulfates?",
    option_a: "BeSO₄ > MgSO₄ > CaSO₄ > SrSO₄ > BaSO₄",
    option_b: "BaSO₄ > SrSO₄ > CaSO₄ > MgSO₄ > BeSO₄",
    option_c: "CaSO₄ > BeSO₄ > MgSO₄ > SrSO₄ > BaSO₄",
    option_d: "MgSO₄ > BeSO₄ > CaSO₄ > BaSO₄ > SrSO₄",
    correct_option: "A",
    explanation: "1. The solubility of an ionic salt depends on the balance between lattice enthalpy and hydration enthalpy.\n2. For sulfates of Group 2, the SO₄²⁻ anion is very large.\n3. Because the anion is large, the lattice enthalpy remains relatively constant down the group.\n4. However, the hydration enthalpy of the divalent cations (M²⁺) decreases drastically from Be²⁺ to Ba²⁺ as the ionic radius increases (Be²⁺ ≪ Mg²⁺ < Ca²⁺ < Sr²⁺ < Ba²⁺).\n5. As a result, the hydration energy of Be²⁺ and Mg²⁺ easily overcomes their lattice enthalpy, making them highly soluble, whereas the solubility decreases sharply down the group:\n   BeSO₄ > MgSO₄ > CaSO₄ > SrSO₄ > BaSO₄.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4198,
    question: "Which of the following compounds releases a paramagnetic gas upon thermal decomposition?",
    option_a: "NaNO₃",
    option_b: "CaCO₃",
    option_c: "NH₄Cl",
    option_d: "NH₄NO₂",
    correct_option: "A",
    explanation: "1. On heating, alkali metal nitrates like NaNO₃ decompose to release Dioxygen (O₂) gas:\n   2 NaNO₃(s) → 2 NaNO₂(s) + O₂(g)\n2. According to Molecular Orbital Theory, O₂ contains two unpaired electrons in its degenerate π* antibonding molecular orbitals, making it paramagnetic.\n3. In contrast:\n   - CaCO₃ releases CO₂ (diamagnetic).\n   - NH₄Cl dissociates into NH₃ and HCl (both diamagnetic).\n   - NH₄NO₂ decomposes to release N₂ and H₂O (both diamagnetic).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4199,
    question: "For orbitals belonging to the same principal quantum shell (n = 2), what is the correct decreasing order of bond strength formed by axial (coaxial) orbital overlap?",
    option_a: "2p-2p > 2s-2p > 2s-2s",
    option_b: "2s-2s > 2s-2p > 2p-2p",
    option_c: "2s-2p > 2p-2p > 2s-2s",
    option_d: "2p-2p > 2s-2s > 2s-2p",
    correct_option: "A",
    explanation: "1. According to Valence Bond Theory, the directional properties of atomic orbitals dictate the extent of orbital overlap.\n2. p-orbitals are directional, with their electron density concentrated in lobes oriented along a specific Cartesian axis, enabling deeper and more effective coaxial overlap.\n3. s-orbitals are spherically symmetrical and non-directional, resulting in less concentrated overlap.\n4. Consequently, the extent of overlap and the resultant covalent bond strength decrease in the order:\n   2p-2p (axial) > 2s-2p > 2s-2s.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4200,
    question: "Which of the following elements cannot exhibit an sp³d hybridized state in any of their compounds?\n(I) Boron\n(II) Carbon\n(III) Phosphorus\n(IV) Chlorine",
    option_a: "(I) and (II) only",
    option_b: "(III) and (IV) only",
    option_c: "(I) and (III) only",
    option_d: "(II) and (IV) only",
    correct_option: "A",
    explanation: "1. sp³d hybridization requires the involvement of five atomic orbitals: one s, three p, and one d orbital.\n2. Boron (Z = 5) and Carbon (Z = 6) belong to the second period (n = 2) of the periodic table.\n3. The second shell contains only 2s and 2p subshells; there are no energetically accessible 2d orbitals.\n4. Consequently, neither Boron nor Carbon can expand their valence octet or undergo sp³d hybridization.\n5. In contrast, Phosphorus and Chlorine belong to the third period and possess vacant 3d orbitals, readily forming sp³d species such as PCl₅ and ClF₃.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4201,
    question: "Which of the following polyatomic species possesses a trigonal pyramidal shape?",
    option_a: "H₃O⁺",
    option_b: "BF₃",
    option_c: "CO₃²⁻",
    option_d: "NO₃⁻",
    correct_option: "A",
    explanation: "1. In the hydronium ion (H₃O⁺):\n   - Central Oxygen atom has 6 valence electrons - 1 (positive charge) = 5 electrons.\n   - It forms 3 σ-bonds with three hydrogen atoms and retains 1 lone pair.\n   - Steric number = 3 bond pairs + 1 lone pair = 4 → sp³ hybridization.\n   - The molecular shape is trigonal pyramidal (similar to NH₃).\n2. In BF₃, CO₃²⁻, and NO₃⁻, the central atom is sp² hybridized with 3 bond pairs and 0 lone pairs, giving a flat trigonal planar geometry.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4202,
    question: "Which of the following sets contains only non-planar (pyramidal) chemical species?",
    option_a: "XeO₃, ClO₃⁻, and SO₃²⁻",
    option_b: "CO₃²⁻, NO₃⁻, and BO₃³⁻",
    option_c: "BF₃, CO₃²⁻, and SO₃",
    option_d: "ClO₃⁻, NO₃⁻, and XeO₃",
    correct_option: "A",
    explanation: "1. In XeO₃: Xe has 3 σ-bonds to oxygen and 1 lone pair (sp³, trigonal pyramidal, non-planar).\n2. In ClO₃⁻: Cl has 3 σ-bonds to oxygen and 1 lone pair (sp³, trigonal pyramidal, non-planar).\n3. In SO₃²⁻: S has 3 σ-bonds to oxygen and 1 lone pair (sp³, trigonal pyramidal, non-planar).\n4. In contrast, CO₃²⁻, NO₃⁻, BO₃³⁻, BF₃, and SO₃ are all sp² hybridized with zero lone pairs, making them planar.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4203,
    question: "As the percentage of p-character in a hybridized orbital increases, the corresponding bond angle:",
    option_a: "Decreases",
    option_b: "Increases",
    option_c: "Remains constant",
    option_d: "Doubles",
    correct_option: "A",
    explanation: "1. Consider the standard hybrid orbitals:\n   - sp hybridization: 50% s, 50% p character → Bond angle = 180°\n   - sp² hybridization: 33.3% s, 66.7% p character → Bond angle = 120°\n   - sp³ hybridization: 25% s, 75% p character → Bond angle = 109.5°\n2. Pure p-orbitals are mutually orthogonal at 90° (100% p character).\n3. Therefore, as the p-character of the hybrid orbital increases, the bond angle systematically decreases towards 90°.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4204,
    question: "What are the hybridization states of the central Iodine atom in I₃⁻, ICl₄⁻, and ICl₂⁻, respectively?",
    option_a: "sp³d, sp³d², and sp³d",
    option_b: "sp³d, sp³d, and sp³",
    option_c: "sp³d², sp³d, and sp³d",
    option_d: "sp³, sp³d, and sp³d²",
    correct_option: "A",
    explanation: "1. For I₃⁻:\n   Central I has 7 valence e⁻ + 1 charge = 8 e⁻.\n   It forms 2 single bonds with terminal I atoms and holds 3 lone pairs.\n   Steric number = 2 + 3 = 5 → sp³d hybridization.\n2. For ICl₄⁻:\n   Central I has 7 valence e⁻ + 1 charge = 8 e⁻.\n   It forms 4 single bonds with Cl atoms and holds 2 lone pairs.\n   Steric number = 4 + 2 = 6 → sp³d² hybridization.\n3. For ICl₂⁻:\n   Central I has 7 valence e⁻ + 1 charge = 8 e⁻.\n   It forms 2 single bonds with Cl atoms and holds 3 lone pairs.\n   Steric number = 2 + 3 = 5 → sp³d hybridization.\nThus, the hybridizations are sp³d, sp³d², and sp³d.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4205,
    question: "Which of the following statements regarding molecular polarity is correct?",
    option_a: "PH₃ is a polar molecule despite possessing essentially non-polar P-H bonds",
    option_b: "All molecules containing polar covalent bonds possess a net dipole moment",
    option_c: "SO₂ is a non-polar molecule because both S-O bonds are identical",
    option_d: "CCl₄ is a polar molecule due to the high electronegativity of Chlorine",
    correct_option: "A",
    explanation: "1. The electronegativities of Phosphorus (2.19) and Hydrogen (2.20) on the Pauling scale are almost identical; thus the individual P-H bonds have virtually negligible polarity.\n2. However, PH₃ has a trigonal pyramidal geometry (steric number 4 with 1 lone pair on phosphorus).\n3. The presence of the lone pair provides an asymmetric electron distribution, giving the PH₃ molecule a small but distinct net dipole moment (μ ≈ 0.58 D).\n4. Statement B is false because symmetrical molecules like CO₂ and CCl₄ have polar bonds but zero net dipole moment.\n5. SO₂ is bent and polar, and CCl₄ is non-polar.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4206,
    question: "Phosphorus pentachloride (PCl₅) in the gaseous state has polar P-Cl bonds yet its net molecular dipole moment is zero. Why?",
    option_a: "The vector sum of the five P-Cl bond dipoles cancels out completely in its symmetric trigonal bipyramidal geometry",
    option_b: "The electronegativity difference between P and Cl is zero",
    option_c: "The axial bonds have no dipole moment",
    option_d: "Gaseous PCl₅ is a planar molecule",
    correct_option: "A",
    explanation: "1. In gaseous PCl₅, the three equatorial P-Cl bonds lie in a plane at 120° angles to each other; their resultant dipole moment is zero (120° vectors of equal magnitude cancel).\n2. The two axial P-Cl bonds are collinear and directed 180° apart along the vertical axis; their dipole vectors are equal in magnitude and point in opposite directions, cancelling each other out completely.\n3. Consequently, the overall vector sum of all five bond dipoles is exactly zero (μ_net = 0).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4207,
    question: "Among the hydrogen halides (HF, HCl, HBr, HI), which one has the highest dipole moment?",
    option_a: "HF",
    option_b: "HCl",
    option_c: "HBr",
    option_d: "HI",
    correct_option: "A",
    explanation: "1. Dipole moment is given by μ = q × d, where q is the partial charge separation and d is the bond length.\n2. Although the bond length increases from HF to HI, the electronegativity difference between Hydrogen (2.1) and the halogen decreases drastically:\n   - For H-F: Δχ = 4.0 - 2.1 = 1.9 (highly polar, μ = 1.78 D)\n   - For H-Cl: Δχ = 3.0 - 2.1 = 0.9 (μ = 1.07 D)\n   - For H-Br: Δχ = 2.8 - 2.1 = 0.7 (μ = 0.79 D)\n   - For H-I: Δχ = 2.5 - 2.1 = 0.4 (μ = 0.38 D)\n3. The charge separation factor dominates over bond length; thus, HF has the highest dipole moment.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4208,
    question: "Which of the following molecules has a non-zero permanent dipole moment (μ ≠ 0)?",
    option_a: "HCl",
    option_b: "CO₂",
    option_c: "CCl₄",
    option_d: "BF₃",
    correct_option: "A",
    explanation: "1. CO₂ is linear and symmetrical (μ = 0).\n2. CCl₄ is tetrahedral and symmetrical (μ = 0).\n3. BF₃ is trigonal planar and symmetrical (μ = 0).\n4. HCl is an unsymmetrical heteronuclear diatomic molecule with a large electronegativity difference between H and Cl, giving a permanent dipole moment of μ = 1.07 D.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4209,
    question: "Which of the following ions is isoelectronic with Carbon monoxide (CO) and possesses the same bond order?",
    option_a: "CN⁻",
    option_b: "O₂⁺",
    option_c: "O₂⁻",
    option_d: "NO",
    correct_option: "A",
    explanation: "1. Carbon monoxide (CO) has 6 (from C) + 8 (from O) = 14 electrons.\n   Its bond order is 3.0.\n2. The cyanide ion (CN⁻) has 6 (from C) + 7 (from N) + 1 (charge) = 14 electrons.\n   It is isoelectronic with CO and also has a bond order of 3.0.\n3. O₂⁺ has 15 electrons (bond order 2.5), O₂⁻ has 17 electrons (bond order 1.5), and NO has 15 electrons (bond order 2.5).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4210,
    question: "Which of the following species is paramagnetic?",
    option_a: "O₂⁻",
    option_b: "CN⁻",
    option_c: "CO",
    option_d: "NO⁺",
    correct_option: "A",
    explanation: "1. For O₂⁻ (17 electrons):\n   Configuration: σ1s² σ*1s² σ2s² σ*2s² σ2p_z² (π2p_x² = π2p_y²) (π*2p_x² = π*2p_y¹).\n   It contains 1 unpaired electron in the antibonding π* orbital; therefore, O₂⁻ is paramagnetic.\n2. In contrast, CN⁻ (14 e⁻), CO (14 e⁻), and NO⁺ (14 e⁻) all have 14 electrons with all orbitals completely paired, making them diamagnetic.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4211,
    question: "Which of the following species does NOT have a bond order of 2.5?",
    option_a: "O₂⁻",
    option_b: "O₂⁺",
    option_c: "N₂⁺",
    option_d: "NO",
    correct_option: "A",
    explanation: "1. O₂⁻ (17 electrons): Bond order = (10 - 7)/2 = 1.5. (Does not have bond order 2.5).\n2. O₂⁺ (15 electrons): Bond order = (10 - 5)/2 = 2.5.\n3. N₂⁺ (13 electrons): Bond order = (9 - 4)/2 = 2.5.\n4. NO (15 electrons): Bond order = (10 - 5)/2 = 2.5.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4212,
    question: "Among the species O₂, O₂⁻, O₂⁺, and O₂²⁻, the shortest bond length is observed in:",
    option_a: "O₂⁺",
    option_b: "O₂",
    option_c: "O₂⁻",
    option_d: "O₂²⁻",
    correct_option: "A",
    explanation: "1. Bond length is inversely proportional to bond order:\n   Bond Length ∝ 1 / (Bond Order)\n2. Determining the bond orders:\n   - O₂²⁻ (18 e⁻): Bond order = 1.0\n   - O₂⁻ (17 e⁻): Bond order = 1.5\n   - O₂ (16 e⁻): Bond order = 2.0\n   - O₂⁺ (15 e⁻): Bond order = 2.5\n3. Because O₂⁺ has the highest bond order (2.5), it has the strongest bond and consequently the shortest internuclear bond length (~112 pm).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4213,
    question: "What is the correct molecular orbital electronic configuration for the singly ionized nitrogen molecule (N₂⁺, 13 electrons)?",
    option_a: "σ1s² σ*1s² σ2s² σ*2s² (π2p_x² = π2p_y²) σ2p_z¹",
    option_b: "σ1s² σ*1s² σ2s² σ*2s² σ2p_z² (π2p_x² = π2p_y¹)",
    option_c: "σ1s² σ*1s² σ2s² σ*2s² (π2p_x¹ = π2p_y¹) σ2p_z²",
    option_d: "σ1s² σ*1s² σ2s² σ*2s² σ2p_z² (π*2p_x¹ = π*2p_y⁰)",
    correct_option: "A",
    explanation: "1. For diatomic molecules with ≤ 14 electrons (such as B₂, C₂, N₂), 2s-2p mixing causes the π2p orbitals to be lower in energy than the σ2p_z orbital:\n   σ1s < σ*1s < σ2s < σ*2s < (π2p_x = π2p_y) < σ2p_z\n2. Neutral N₂ (14 electrons) has the configuration:\n   σ1s² σ*1s² σ2s² σ*2s² (π2p_x² = π2p_y²) σ2p_z²\n3. When N₂ is ionized to form N₂⁺ (13 electrons), the electron is removed from the HOMO, which is the σ2p_z orbital.\n4. Hence, the resulting configuration for N₂⁺ is:\n   σ1s² σ*1s² σ2s² σ*2s² (π2p_x² = π2p_y²) σ2p_z¹.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4214,
    question: "What types of chemical bonds are present in a gaseous molecule of Dinitrogen pentoxide (N₂O₅)?",
    option_a: "Covalent and coordinate (dative) bonds only",
    option_b: "Ionic bonds only",
    option_c: "Covalent and ionic bonds",
    option_d: "Pure metallic bonds",
    correct_option: "A",
    explanation: "1. In the gas phase, N₂O₅ is a molecular covalent compound with the connectivity O₂N-O-NO₂.\n2. The two nitrogen atoms are bridged by a central oxygen atom through single covalent bonds.\n3. Each nitrogen atom is further bonded to two terminal oxygen atoms: one via a standard covalent double bond (N=O) and one via a coordinate (dative) covalent bond (N→O) where nitrogen donates its lone pair.\n4. Thus, gaseous N₂O₅ contains both covalent and coordinate covalent bonds.\n5. (In the solid state, it exists as an ionic solid [NO₂]⁺[NO₃]⁻).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4215,
    question: "Among the following hydrides, which one forms the strongest hydrogen bonds?",
    option_a: "HF",
    option_b: "H₂O",
    option_c: "NH₃",
    option_d: "H₂S",
    correct_option: "A",
    explanation: "1. The strength of an individual hydrogen bond depends directly on the electronegativity and small atomic size of the atom bonded to hydrogen.\n2. Fluorine is the most electronegative element in the periodic table (electronegativity = 4.0).\n3. The H-F bond possesses the highest polarity, creating the greatest partial positive charge on hydrogen (δ⁺) and partial negative charge on fluorine (δ⁻).\n4. Therefore, the H···F hydrogen bond is the strongest among all hydrogen bonds (~41.8 kJ/mol).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4216,
    question: "Which of the following substances does not conduct electricity in either the solid or liquid state?",
    option_a: "Diamond",
    option_b: "Graphite",
    option_c: "Molten NaCl",
    option_d: "Copper",
    correct_option: "A",
    explanation: "1. Electrical conduction requires the presence of mobile charged particles (free electrons or mobile ions).\n2. In Diamond, each carbon atom is sp³ hybridized and firmly bonded to four other carbon atoms via four localized σ-bonds; there are no free or delocalized electrons, making diamond an electrical insulator.\n3. Graphite conducts via delocalized π-electrons; molten NaCl conducts via mobile Na⁺ and Cl⁻ ions; Copper conducts via free delocalized valence electrons.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4217,
    question: "Among the aluminum halides AlF₃, AlCl₃, AlBr₃, and AlI₃, which compound exhibits the highest degree of covalent character according to Fajan's rules?",
    option_a: "AlI₃",
    option_b: "AlBr₃",
    option_c: "AlCl₃",
    option_d: "AlF₃",
    correct_option: "A",
    explanation: "1. According to Fajan's rules, for a common cation (Al³⁺), covalent character increases with increasing size and polarizability of the anion.\n2. The ionic radii of the halide ions increase in the order:\n   F⁻ < Cl⁻ < Br⁻ < I⁻\n3. The iodide ion (I⁻) has the largest, most diffuse electron cloud, which is most readily deformed (polarized) by the high positive charge density of the Al³⁺ cation.\n4. This extensive polarization creates significant orbital overlap and electron sharing, giving AlI₃ the highest covalent character (AlF₃ is primarily ionic with a high melting point, while AlI₃ is predominantly covalent).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4218,
    question: "According to Fajan's rules, what is the correct decreasing order of covalent character for the alkaline earth metal chlorides?",
    option_a: "BeCl₂ > MgCl₂ > CaCl₂ > SrCl₂ > BaCl₂",
    option_b: "BaCl₂ > SrCl₂ > CaCl₂ > MgCl₂ > BeCl₂",
    option_c: "BeCl₂ > CaCl₂ > MgCl₂ > SrCl₂ > BaCl₂",
    option_d: "MgCl₂ > BeCl₂ > CaCl₂ > BaCl₂ > SrCl₂",
    correct_option: "A",
    explanation: "1. According to Fajan's rules, smaller cations have higher charge density and greater polarizing power, resulting in greater covalent character in their bonds.\n2. The alkaline earth metal cations all carry a +2 charge, but their ionic radii increase down Group 2:\n   Be²⁺ < Mg²⁺ < Ca²⁺ < Sr²⁺ < Ba²⁺\n3. The smallest cation, Be²⁺, possesses the greatest polarizing power and polarizes the chloride electron cloud most intensely, making BeCl₂ predominantly covalent.\n4. The polarizing power decreases down the group as ionic size increases, making BaCl₂ almost purely ionic.\n5. Hence, the decreasing order of covalent character is:\n   BeCl₂ > MgCl₂ > CaCl₂ > SrCl₂ > BaCl₂.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 20 Part 4 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
