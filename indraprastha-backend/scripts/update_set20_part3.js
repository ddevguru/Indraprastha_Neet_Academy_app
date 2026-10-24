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
    id: 4167,
    question: "Statement I: The dipole moment of Ammonia (NH₃) is lower than that of Nitrogen trifluoride (NF₃).\nStatement II: Fluorine has a higher electronegativity than Hydrogen.",
    option_a: "Statement I is incorrect but Statement II is correct",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Both Statement I and Statement II are incorrect",
    option_d: "Statement I is correct but Statement II is incorrect",
    correct_option: "A",
    explanation: "1. In NH₃, the bond dipoles of the three N-H bonds and the lone-pair orbital dipole point in the same direction, yielding a large dipole moment (μ = 1.47 D).\n2. In NF₃, the three highly polar N-F bonds point away from nitrogen and oppose the lone pair dipole, resulting in a much smaller net dipole moment (μ = 0.24 D). Thus, NH₃ is far more polar than NF₃, making Statement I incorrect.\n3. Fluorine (electronegativity 4.0) is much more electronegative than Hydrogen (electronegativity 2.1). Thus, Statement II is correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4168,
    question: "Statement I: Promotion of an electron to an excited state is an indispensable and mandatory prerequisite prior to hybridization.\nStatement II: Fully filled, half-filled, and even completely vacant atomic orbitals can participate in hybridization.",
    option_a: "Statement I is incorrect but Statement II is correct",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Both Statement I and Statement II are incorrect",
    option_d: "Statement I is correct but Statement II is incorrect",
    correct_option: "A",
    explanation: "1. Promotion of electrons is not an essential condition prior to hybridization. For instance, in NH₃ and H₂O, hybridization (sp³) occurs without any electron promotion. Hence, Statement I is incorrect.\n2. In many compounds and complexes, fully filled orbitals (carrying lone pairs, e.g., in H₂O or NH₃) as well as vacant orbitals (such as in Lewis acids like BF₃ or transition metal coordination complexes) actively participate in hybridization alongside half-filled orbitals. Hence, Statement II is correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4169,
    question: "Statement I: In the C₂ molecule, both covalent bonds between the two carbon atoms are π-bonds with four electrons in degenerate π molecular orbitals.\nStatement II: The O₂⁺ molecular ion is diamagnetic.",
    option_a: "Statement I is correct but Statement II is incorrect",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Both Statement I and Statement II are incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. According to Molecular Orbital Theory, C₂ (12 electrons) has the valence configuration: σ2s² σ*2s² π2p_x² π2p_y². The four valence bonding electrons reside entirely in the degenerate π-orbitals; therefore, the double bond in C₂ consists solely of two π-bonds with no σ-bond. Hence, Statement I is correct.\n2. For O₂⁺ (15 electrons), its configuration ends with (π*2p_x¹ = π*2p_y⁰), meaning it has one unpaired electron and is paramagnetic, not diamagnetic. Hence, Statement II is incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4170,
    question: "Assertion (A): Lithium fluoride (LiF) is only sparingly soluble in water.\nReason (R): The lattice enthalpy of LiF is exceptionally high due to the small sizes of both the Li⁺ cation and the F⁻ anion, exceeding its hydration enthalpy.",
    option_a: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_b: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. For an ionic compound to dissolve spontaneously in water, its hydration enthalpy must overcome its lattice enthalpy (ΔH_solution < 0 or TΔS favorable).\n2. In LiF, both Li⁺ and F⁻ are extremely small ions, resulting in an exceptionally compact crystal lattice with a very large lattice enthalpy (-1032 kJ/mol).\n3. The magnitude of this lattice enthalpy exceeds the total hydration enthalpy of the ions, making LiF only sparingly soluble in water.\n4. Hence, both Assertion and Reason are correct, and Reason is the correct explanation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4171,
    question: "Assertion (A): Crystalline ionic compounds generally have very high melting points and are non-volatile.\nReason (R): In an ionic lattice, the constituent ions are held together by weak intermolecular van der Waals forces.",
    option_a: "(A) is correct but (R) is incorrect",
    option_b: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_c: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. Ionic compounds form continuous three-dimensional crystalline lattices held together by strong, non-directional electrostatic (coulombic) forces of attraction between oppositely charged ions.\n2. A substantial amount of thermal energy is required to overcome these strong electrostatic attractions; hence, they have very high melting and boiling points and are non-volatile. Thus, Assertion (A) is correct.\n3. Reason (R) states that they are held by weak intermolecular van der Waals forces, which is completely false for ionic compounds. Thus, Reason (R) is incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4172,
    question: "Assertion (A): In gaseous PCl₅, all five P-Cl bonds are not equivalent in length.\nReason (R): Gaseous PCl₅ possesses a trigonal bipyramidal geometry in which the axial bonds experience greater electron pair repulsions than equatorial bonds.",
    option_a: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_b: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. In gaseous PCl₅, the phosphorus atom undergoes sp³d hybridization, forming a trigonal bipyramidal structure.\n2. There are three equatorial bonds (P-Cl_eq = 202 pm) and two axial bonds (P-Cl_ax = 214 pm).\n3. The two axial P-Cl bonds experience three 90° repulsions from equatorial bond pairs, whereas each equatorial bond experiences only two 90° repulsions.\n4. To minimize this repulsion, the axial bonds are pushed farther out and become longer and weaker than equatorial bonds.\n5. Hence, both Assertion and Reason are correct, and Reason correctly explains Assertion.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4173,
    question: "Assertion (A): The B₂ molecule is diamagnetic in its ground state.\nReason (R): The highest occupied molecular orbital (HOMO) in the B₂ molecule is the non-degenerate σ 2p_z orbital.",
    option_a: "Both (A) and (R) are incorrect",
    option_b: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "(A) is incorrect but (R) is correct",
    correct_option: "A",
    explanation: "1. For B₂ (10 electrons), the molecular orbital energy ordering (with s-p mixing) is: σ1s² σ*1s² σ2s² σ*2s² (π2p_x¹ = π2p_y¹).\n2. The HOMO consists of the degenerate π2p_x and π2p_y orbitals.\n3. According to Hund's rule, the two valence electrons occupy these degenerate π orbitals singly with parallel spins, giving 2 unpaired electrons.\n4. Therefore, B₂ is paramagnetic, not diamagnetic (Assertion is incorrect).\n5. The HOMO is π-type, not σ-type (Reason is incorrect).\n6. Thus, both Assertion (A) and Reason (R) are incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4174,
    question: "Assertion (A): The hexafluorosilicate ion [SiF₆]²⁻ is a well-known stable species, whereas the hexachlorosilicate ion [SiCl₆]²⁻ is not known.\nReason (R): Six large chloride ions cannot be comfortably accommodated around the relatively small silicon atom due to severe steric hindrance, and interaction between chlorine lone pairs and Si is weak.",
    option_a: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_b: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. [SiF₆]²⁻ readily forms because Fluorine atoms are very small and can easily coordinate around the central silicon atom without steric crowding.\n2. In contrast, Chloride ions (Cl⁻) are substantially larger in size. Six large Cl⁻ ions cannot fit around the Si⁴⁺ center due to intense steric repulsion.\n3. Additionally, the lone pair on the larger chlorine atom interacts less effectively with the 3d orbitals of silicon compared to the compact 2p lone pair of fluorine.\n4. Hence, both Assertion and Reason are correct and Reason correctly explains Assertion.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4175,
    question: "Assertion (A): The Chlorine trifluoride (ClF₃) molecule possesses a bent T-shaped geometry.\nReason (R): The two lone pairs on the central Chlorine atom occupy equatorial positions in the trigonal bipyramid to minimize lone-pair/bond-pair repulsions.",
    option_a: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_b: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. In ClF₃, the central Cl atom has 7 valence electrons, forming 3 σ-bonds with F atoms and retaining 2 lone pairs (Steric number = 3 + 2 = 5, sp³d hybridization).\n2. The electron-pair geometry is trigonal bipyramidal.\n3. Placing lone pairs in equatorial positions results in fewer 90° lone-pair repulsions than placing them in axial positions.\n4. With two equatorial lone pairs and three bonded fluorine atoms (two axial, one equatorial), the observable molecular shape is bent T-shaped.\n5. Thus, both Assertion and Reason are correct and Reason is the correct explanation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4176,
    question: "Assertion (A): The boiling point of ortho-nitrophenol is significantly higher than that of para-nitrophenol.\nReason (R): ortho-Nitrophenol forms extensive intermolecular hydrogen bonding resulting in molecular association.",
    option_a: "Both (A) and (R) are incorrect",
    option_b: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "(A) is incorrect but (R) is correct",
    correct_option: "A",
    explanation: "1. In ortho-nitrophenol, the -OH and -NO₂ groups are adjacent, forming intramolecular hydrogen bonds (chelation), which prevents intermolecular association. Consequently, it is steam-volatile and has a lower boiling point (216 °C).\n2. In para-nitrophenol, the functional groups are far apart, leading to extensive intermolecular hydrogen bonding that links molecules into associated polymeric chains. This results in a higher boiling point (279 °C).\n3. Therefore, Assertion (A) is incorrect and Reason (R) is also incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4177,
    question: "Assertion (A): Silver chloride (AgCl) exhibits significantly greater covalent character than Sodium chloride (NaCl).\nReason (R): The Ag⁺ cation has a pseudo-noble gas electronic configuration (18 valence electrons) and exerts much higher polarizability/polarizing power on the chloride ion than the Na⁺ cation.",
    option_a: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_b: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. According to Fajan's rules, a cation with a pseudo-noble gas configuration (ns² np⁶ nd¹⁰, such as Ag⁺: [Kr] 4d¹⁰) has less effective nuclear shielding by d-electrons than a noble-gas configuration cation of similar size (such as Na⁺: [Ne] 2s² 2p⁶).\n2. As a consequence, Ag⁺ has a much higher effective nuclear charge at its surface and exhibits much greater polarizing power.\n3. This greater polarizing power deforms the electron cloud of Cl⁻ more extensively, introducing substantial covalent character into AgCl compared to the predominantly ionic NaCl.\n4. Hence, both Assertion and Reason are correct, and Reason is the correct explanation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4178,
    question: "Which of the following molecules has a central atom with sp³d² hybridization and a square planar geometry?",
    option_a: "SF₆",
    option_b: "XeF₄",
    option_c: "PCl₅",
    option_d: "CH₄",
    correct_option: "B",
    explanation: "1. In XeF₄, Xenon (8 valence electrons) forms 4 single bonds with fluorine and retains 2 lone pairs.\n2. Steric number = 4 bond pairs + 2 lone pairs = 6 → sp³d² hybridization.\n3. The two lone pairs occupy opposite trans-axial positions of the octahedron to minimize electron repulsion.\n4. The remaining four bonded fluorine atoms lie in a single plane, resulting in a square planar molecular geometry.\n5. In SF₆, there are 6 bond pairs and 0 lone pairs (octahedral).\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4179,
    question: "How many lone pairs and bond pairs of electrons are present on the central atom in an SF₄ molecule?",
    option_a: "4 bond pairs and 0 lone pairs",
    option_b: "3 bond pairs and 2 lone pairs",
    option_c: "4 bond pairs and 1 lone pair",
    option_d: "2 bond pairs and 2 lone pairs",
    correct_option: "C",
    explanation: "1. The central Sulfur atom belongs to Group 16 and has 6 valence electrons.\n2. In SF₄, Sulfur shares 4 valence electrons to form 4 single σ-bonds with four fluorine atoms.\n3. The remaining 2 valence electrons form 1 lone pair on the Sulfur atom.\n4. Thus, SF₄ possesses exactly 4 bond pairs and 1 lone pair (steric number = 5, see-saw shape).\nTherefore, Option (C) is the correct answer."
  },
  {
    id: 4180,
    question: "Match the following species with their corresponding geometries:\n(I) NH₄⁺\n(II) H₃O⁺\n(III) I₃⁻\n(IV) SF₆",
    option_a: "(I)-Tetrahedral, (II)-Pyramidal, (III)-Linear, (IV)-Octahedral",
    option_b: "(I)-Square planar, (II)-Tetrahedral, (III)-Bent, (IV)-Octahedral",
    option_c: "(I)-Tetrahedral, (II)-Bent, (III)-Linear, (IV)-Square planar",
    option_d: "(I)-Pyramidal, (II)-Tetrahedral, (III)-T-shaped, (IV)-See-saw",
    correct_option: "A",
    explanation: "- NH₄⁺: 4 bond pairs + 0 lone pairs = Tetrahedral.\n- H₃O⁺: 3 bond pairs + 1 lone pair = Trigonal Pyramidal.\n- I₃⁻: 2 bond pairs + 3 lone pairs = Linear.\n- SF₆: 6 bond pairs + 0 lone pairs = Octahedral.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4181,
    question: "Match the following diatomic species with their correct bond order:\n(I) N₂\n(II) O₂\n(III) O₂⁺\n(IV) He₂⁺",
    option_a: "(I)-3.0, (II)-2.0, (III)-2.5, (IV)-0.5",
    option_b: "(I)-2.5, (II)-3.0, (III)-1.5, (IV)-1.0",
    option_c: "(I)-3.0, (II)-1.5, (III)-2.0, (IV)-0.5",
    option_d: "(I)-2.0, (II)-2.5, (III)-3.0, (IV)-1.5",
    correct_option: "A",
    explanation: "- N₂ (14 electrons): Bond order = (10 - 4)/2 = 3.0.\n- O₂ (16 electrons): Bond order = (10 - 6)/2 = 2.0.\n- O₂⁺ (15 electrons): Bond order = (10 - 5)/2 = 2.5.\n- He₂⁺ (3 electrons): Bond order = (2 - 1)/2 = 0.5.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4182,
    question: "Match the following compounds with their molecular dipole moments:\n(I) CO₂\n(II) NF₃\n(III) NH₃\n(IV) HF",
    option_a: "(I)-0 D, (II)-0.24 D, (III)-1.47 D, (IV)-1.78 D",
    option_b: "(I)-1.47 D, (II)-0 D, (III)-0.24 D, (IV)-1.78 D",
    option_c: "(I)-0 D, (II)-1.47 D, (III)-0.24 D, (IV)-1.78 D",
    option_d: "(I)-1.78 D, (II)-1.47 D, (III)-0.24 D, (IV)-0 D",
    correct_option: "A",
    explanation: "- CO₂ is linear and symmetrical, so its net dipole moment is 0 D.\n- NF₃ has opposing bond dipoles and lone pair dipole, giving μ = 0.24 D.\n- NH₃ has reinforcing bond dipoles and lone pair dipole, giving μ = 1.47 D.\n- HF is a strongly polar diatomic molecule with μ = 1.78 D.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4183,
    question: "Match the central atom in each of the following molecules with its state of hybridization:\n(I) BeCl₂\n(II) BCl₃\n(III) CCl₄\n(IV) PCl₅",
    option_a: "(I)-sp, (II)-sp², (III)-sp³, (IV)-sp³d",
    option_b: "(I)-sp², (II)-sp, (III)-sp³, (IV)-sp³d²",
    option_c: "(I)-sp³, (II)-sp², (III)-sp, (IV)-sp³d",
    option_d: "(I)-sp, (II)-sp³, (III)-sp², (IV)-sp³d",
    correct_option: "A",
    explanation: "- BeCl₂: 2 σ-bonds, 0 lone pairs → sp hybridization.\n- BCl₃: 3 σ-bonds, 0 lone pairs → sp² hybridization.\n- CCl₄: 4 σ-bonds, 0 lone pairs → sp³ hybridization.\n- PCl₅: 5 σ-bonds, 0 lone pairs → sp³d hybridization.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4184,
    question: "Match each molecule in Column I with its appropriate geometry in Column II:\nColumn I:\n(I) ClF₃\n(II) XeF₂\n(III) BrF₅\n(IV) XeF₄\nColumn II:\n(a) Linear\n(b) T-shaped\n(c) Square pyramidal\n(d) Square planar",
    option_a: "(I)-(b), (II)-(a), (III)-(c), (IV)-(d)",
    option_b: "(I)-(a), (II)-(b), (III)-(c), (IV)-(d)",
    option_c: "(I)-(b), (II)-(c), (III)-(a), (IV)-(d)",
    option_d: "(I)-(d), (II)-(a), (III)-(c), (IV)-(b)",
    correct_option: "A",
    explanation: "- ClF₃ has 3 bond pairs and 2 lone pairs → T-shaped (b).\n- XeF₂ has 2 bond pairs and 3 lone pairs → Linear (a).\n- BrF₅ has 5 bond pairs and 1 lone pair → Square pyramidal (c).\n- XeF₄ has 4 bond pairs and 2 lone pairs → Square planar (d).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4185,
    question: "Match the species with the dominant type of bonding/interaction holding its units together:\n(I) Diamond\n(II) Solid Argon\n(III) Ice\n(IV) Copper\nColumn II:\n(a) Metallic bonding\n(b) Covalent network\n(c) Hydrogen bonding\n(d) London dispersion forces",
    option_a: "(I)-(b), (II)-(d), (III)-(c), (IV)-(a)",
    option_b: "(I)-(a), (II)-(b), (III)-(c), (IV)-(d)",
    option_c: "(I)-(b), (II)-(c), (III)-(d), (IV)-(a)",
    option_d: "(I)-(d), (II)-(a), (III)-(b), (IV)-(c)",
    correct_option: "A",
    explanation: "- Diamond is a covalent network solid formed of sp³ carbon atoms.\n- Solid Argon is held entirely by weak London dispersion forces.\n- Ice consists of water molecules held in an open cage lattice by hydrogen bonding.\n- Copper metal consists of metallic cations in a sea of delocalized electrons held by metallic bonding.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4186,
    question: "Match the following atoms in the ammonium ion (NH₄⁺) and hydronium ion (H₃O⁺) with their formal charges:\n(I) Nitrogen in NH₄⁺\n(II) Each Hydrogen in NH₄⁺\n(III) Oxygen in H₃O⁺\n(IV) Each Hydrogen in H₃O⁺",
    option_a: "(I)-+1, (II)-0, (III)-+1, (IV)-0",
    option_b: "(I)-0, (II)-+1, (III)-0, (IV)-+1",
    option_c: "(I)-+1, (II)-+1, (III)-0, (IV)-0",
    option_d: "(I)- -1, (II)-+1, (III)- -1, (IV)-+1",
    correct_option: "A",
    explanation: "- In NH₄⁺: Formal charge on N = 5 - 0 - (8/2) = +1; on each H = 1 - 0 - (2/2) = 0.\n- In H₃O⁺: Formal charge on O = 6 - 2 - (6/2) = +1; on each H = 1 - 0 - (2/2) = 0.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4187,
    question: "Match the molecules with their respective bond angles:\n(I) CH₄\n(II) NH₃\n(III) H₂O\n(IV) BeF₂",
    option_a: "(I)-109.5°, (II)-107°, (III)-104.5°, (IV)-180°",
    option_b: "(I)-180°, (II)-109.5°, (III)-107°, (IV)-104.5°",
    option_c: "(I)-107°, (II)-104.5°, (III)-109.5°, (IV)-180°",
    option_d: "(I)-120°, (II)-107°, (III)-104.5°, (IV)-180°",
    correct_option: "A",
    explanation: "- CH₄ has regular tetrahedral geometry: bond angle = 109.5°.\n- NH₃ has 1 lone pair compressing the bond angle to 107°.\n- H₂O has 2 lone pairs compressing the bond angle to 104.5°.\n- BeF₂ is linear: bond angle = 180°.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4188,
    question: "Match the following diatomic species with their magnetic behavior:\n(I) O₂\n(II) N₂\n(III) B₂\n(IV) C₂",
    option_a: "(I)-Paramagnetic, (II)-Diamagnetic, (III)-Paramagnetic, (IV)-Diamagnetic",
    option_b: "(I)-Diamagnetic, (II)-Paramagnetic, (III)-Diamagnetic, (IV)-Paramagnetic",
    option_c: "(I)-Paramagnetic, (II)-Paramagnetic, (III)-Diamagnetic, (IV)-Diamagnetic",
    option_d: "(I)-Diamagnetic, (II)-Diamagnetic, (III)-Paramagnetic, (IV)-Paramagnetic",
    correct_option: "A",
    explanation: "- O₂ (16 e⁻): 2 unpaired electrons in π* orbitals → Paramagnetic.\n- N₂ (14 e⁻): All electrons paired → Diamagnetic.\n- B₂ (10 e⁻): 2 unpaired electrons in π orbitals → Paramagnetic.\n- C₂ (12 e⁻): All electrons paired in π orbitals → Diamagnetic.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4189,
    question: "Which of the following molecules have a permanent non-zero net dipole moment?\n(I) CH₂Cl₂\n(II) CCl₄\n(III) H₂O₂\n(IV) C₂H₂",
    option_a: "(I) and (III) only",
    option_b: "(II) and (IV) only",
    option_c: "(I) and (II) only",
    option_d: "(III) and (IV) only",
    correct_option: "A",
    explanation: "- (I) CH₂Cl₂: Asymmetric tetrahedral distribution of two C-H and two polar C-Cl bonds produces a net resultant dipole moment (μ ≈ 1.6 D, polar).\n- (II) CCl₄: Perfect regular tetrahedral symmetry cancels all C-Cl bond dipoles completely (μ = 0, non-polar).\n- (III) H₂O₂: Possesses a non-planar open-book structure; the two O-H dipoles do not cancel each other out (μ ≈ 2.1 D, polar).\n- (IV) C₂H₂ (acetylene): Linear symmetric molecule H-C≡C-H where opposing C-H dipoles cancel exactly (μ = 0, non-polar).\nHence, only (I) and (III) are polar.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4190,
    question: "Which of the following pairs of nitrogen species have identical bond orders?",
    option_a: "N₂⁺ and N₂⁻",
    option_b: "N₂ and N₂⁺",
    option_c: "N₂ and N₂²⁻",
    option_d: "N₂⁻ and N₂²⁻",
    correct_option: "A",
    explanation: "1. N₂ (14 electrons): Bond order = (10 - 4)/2 = 3.0.\n2. N₂⁺ (13 electrons): One electron removed from bonding σ2p_z orbital:\n   Bond order = (9 - 4)/2 = 2.5.\n3. N₂⁻ (15 electrons): One electron added to antibonding π*2p orbital:\n   Bond order = (10 - 5)/2 = 2.5.\n4. N₂²⁻ (16 electrons): Two electrons in antibonding π*2p orbitals:\n   Bond order = (10 - 6)/2 = 2.0.\nThus, both N₂⁺ and N₂⁻ have the identical bond order of 2.5.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4191,
    question: "In which of the following species does the central atom undergo sp³d hybridization?\n(I) I₃⁻\n(II) ClF₃\n(III) SF₄\n(IV) SF₆",
    option_a: "(I), (II), and (III) only",
    option_b: "(I) and (IV) only",
    option_c: "(II) and (IV) only",
    option_d: "(III) and (IV) only",
    correct_option: "A",
    explanation: "- For I₃⁻: Central I has 2 bond pairs + 3 lone pairs = steric number 5 → sp³d hybridization.\n- For ClF₃: Central Cl has 3 bond pairs + 2 lone pairs = steric number 5 → sp³d hybridization.\n- For SF₄: Central S has 4 bond pairs + 1 lone pair = steric number 5 → sp³d hybridization.\n- For SF₆: Central S has 6 bond pairs + 0 lone pairs = steric number 6 → sp³d² hybridization.\nHence, (I), (II), and (III) all feature sp³d hybridization.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4192,
    question: "Which of the following chemical species cannot exist under normal conditions due to steric or valence orbital limitations?\n(I) PH₅\n(II) [BF₆]³⁻\n(III) [AlF₆]³⁻\n(IV) PCl₅",
    option_a: "(I) and (II) only",
    option_b: "(III) and (IV) only",
    option_c: "(I) and (III) only",
    option_d: "(II) and (IV) only",
    correct_option: "A",
    explanation: "1. PH₅ does not exist because Hydrogen is not sufficiently electronegative to contract the diffuse 3d orbitals of phosphorus and participate in d-orbital hybridization; only highly electronegative atoms like F or Cl can stabilize high coordination in phosphorus.\n2. [BF₆]³⁻ cannot exist because Boron belongs to the second period and has only four valence orbitals (2s and three 2p) with no energetically accessible d-orbitals, restricting its maximum coordination number to 4 (as in BF₄⁻).\n3. In contrast, Aluminum possesses vacant 3d orbitals and readily forms [AlF₆]³⁻, and PCl₅ is a well-known stable compound.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 20 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
