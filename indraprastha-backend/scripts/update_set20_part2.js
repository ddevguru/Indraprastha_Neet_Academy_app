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
    id: 4141,
    question: "What is the correct increasing order of bond angles in ClO₂⁻, Cl₂O, and ClO₂?",
    option_a: "ClO₂⁻ < Cl₂O < ClO₂",
    option_b: "Cl₂O < ClO₂⁻ < ClO₂",
    option_c: "ClO₂ < Cl₂O < ClO₂⁻",
    option_d: "ClO₂⁻ < ClO₂ < Cl₂O",
    correct_option: "A",
    explanation: "1. In ClO₂⁻ (chlorite ion): The central Cl atom has two bonding pairs and two lone pairs (sp³ hybridization). Strong lone-pair/lone-pair and lone-pair/bond-pair repulsions compress the O-Cl-O bond angle to approximately 110.5°.\n2. In Cl₂O (dichlorine monoxide): The central O atom has two bond pairs and two lone pairs, but the bulky Chlorine atoms experience strong steric repulsion with each other, widening the Cl-O-Cl angle to approximately 111°.\n3. In ClO₂ (chlorine dioxide): The central Cl atom has two bond pairs, one lone pair, and one odd (single) electron. The single electron exerts significantly less repulsion than a full lone pair, opening up the O-Cl-O bond angle to 117.6°.\n4. Hence, the increasing order of bond angle is: ClO₂⁻ (110.5°) < Cl₂O (111°) < ClO₂ (117.6°).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4142,
    question: "Which of the following pairs of ions possesses the same hybridization of the central atom?",
    option_a: "NO₂⁻ and NO₃⁻",
    option_b: "NH₄⁺ and NO₃⁻",
    option_c: "CO₃²⁻ and SO₄²⁻",
    option_d: "ClO₃⁻ and BF₄⁻",
    correct_option: "A",
    explanation: "1. For NO₂⁻:\n   - Valence electrons on N = 5 + 1 (charge) = 6.\n   - Forms 2 σ-bonds with oxygen and retains 1 lone pair.\n   - Steric number = 2 + 1 = 3 → sp² hybridization.\n2. For NO₃⁻:\n   - Valence electrons on N = 5 + 1 (charge) = 6.\n   - Forms 3 σ-bonds with oxygen and has 0 lone pairs.\n   - Steric number = 3 + 0 = 3 → sp² hybridization.\n3. In contrast, NH₄⁺ (sp³), SO₄²⁻ (sp³), and BF₄⁻ (sp³) have different hybridizations.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4143,
    question: "Which of the following pairs contains both species as paramagnetic?",
    option_a: "O₂ and O₂⁺",
    option_b: "O₂²⁻ and O₂",
    option_c: "N₂ and O₂",
    option_d: "C₂ and O₂²⁻",
    correct_option: "A",
    explanation: "From Molecular Orbital Theory for oxygen species:\n1. O₂ (16 e⁻): Configuration ends in (π*2p_x¹ = π*2p_y¹) → 2 unpaired electrons → Paramagnetic.\n2. O₂⁺ (15 e⁻): Configuration ends in (π*2p_x¹ = π*2p_y⁰) → 1 unpaired electron → Paramagnetic.\n3. O₂²⁻ (18 e⁻): All orbitals up to π*2p are completely filled → 0 unpaired electrons → Diamagnetic.\n4. N₂ (14 e⁻) and C₂ (12 e⁻) are both diamagnetic.\nThus, both species in pair (A) are paramagnetic.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4144,
    question: "Which of the following oxygen species has a bond order of 1.5?",
    option_a: "O₂⁺",
    option_b: "O₂⁻ (Superoxide ion)",
    option_c: "O₂²⁻ (Peroxide ion)",
    option_d: "O₂ (Dioxygen)",
    correct_option: "B",
    explanation: "Using the Molecular Orbital formula: Bond Order = (N_b - N_a) / 2\n1. O₂⁺ (15 e⁻): N_b = 10, N_a = 5 ⇒ Bond Order = (10 - 5) / 2 = 2.5\n2. O₂ (16 e⁻): N_b = 10, N_a = 6 ⇒ Bond Order = (10 - 6) / 2 = 2.0\n3. O₂⁻ (17 e⁻): N_b = 10, N_a = 7 ⇒ Bond Order = (10 - 7) / 2 = 1.5\n4. O₂²⁻ (18 e⁻): N_b = 10, N_a = 8 ⇒ Bond Order = (10 - 8) / 2 = 1.0\nTherefore, Option (B) is the correct answer."
  },
  {
    id: 4145,
    question: "Which of the following hydride molecules is classified as an electron-deficient hydride?",
    option_a: "B₂H₆",
    option_b: "CH₄",
    option_c: "NH₃",
    option_d: "H₂O",
    correct_option: "A",
    explanation: "1. Electron-deficient hydrides have fewer electrons than required to write standard 2-center-2-electron (2c-2e) Lewis structures for all bonds.\n2. In Diborane (B₂H₆), there are only 12 valence electrons available (3 from each B, 1 from each H), but 8 bonds would classically require 16 electrons.\n3. B₂H₆ solves this deficiency via two 3-center-2-electron (3c-2e) B-H-B bridge bonds ('banana bonds').\n4. CH₄ is electron-precise, while NH₃ and H₂O are electron-rich hydrides.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4146,
    question: "Xenon difluoride (XeF₂) has a linear shape. Which of the following species is isostructural with XeF₂?",
    option_a: "ICl₂⁻",
    option_b: "TeF₂",
    option_c: "OF₂",
    option_d: "SO₂",
    correct_option: "A",
    explanation: "1. For XeF₂:\n   - Central Xe has 8 valence electrons + 2 bond pairs with F = 10 electrons around Xe.\n   - It possesses 2 bond pairs and 3 lone pairs (Steric number = 5, sp³d hybridization).\n   - The 3 lone pairs occupy equatorial positions, resulting in a strictly Linear molecular geometry.\n2. For ICl₂⁻:\n   - Central Iodine has 7 valence electrons + 1 negative charge = 8 electrons.\n   - Forms 2 bond pairs with Cl and retains 3 lone pairs (Steric number = 5, sp³d hybridization).\n   - The 3 lone pairs occupy equatorial positions, resulting in a strictly Linear molecular geometry.\n3. TeF₂, OF₂, and SO₂ all have bent (V-shaped) geometries.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4147,
    question: "Which of the following polyatomic species possesses a trigonal planar geometry?",
    option_a: "NO₃⁻",
    option_b: "NH₃",
    option_c: "PCl₃",
    option_d: "ClO₃⁻",
    correct_option: "A",
    explanation: "1. In the nitrate ion (NO₃⁻):\n   - Central Nitrogen atom forms 3 σ-bonds with oxygen atoms and has 0 lone pairs.\n   - Steric number = 3 + 0 = 3.\n   - Hybridization is sp², and with no lone pairs, its molecular geometry is planar triangular (trigonal planar) with 120° bond angles.\n2. NH₃, PCl₃, and ClO₃⁻ all have 3 bond pairs and 1 lone pair (steric number 4, sp³), making them trigonal pyramidal.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4148,
    question: "What is the correct sequence of increasing bond order for the species O₂²⁻, O₂⁻, O₂, and O₂⁺?",
    option_a: "O₂²⁻ < O₂⁻ < O₂ < O₂⁺",
    option_b: "O₂⁺ < O₂ < O₂⁻ < O₂²⁻",
    option_c: "O₂⁻ < O₂²⁻ < O₂⁺ < O₂",
    option_d: "O₂²⁻ < O₂ < O₂⁻ < O₂⁺",
    correct_option: "A",
    explanation: "According to Molecular Orbital Theory:\n- O₂²⁻ (18 electrons): Bond order = (10 - 8)/2 = 1.0\n- O₂⁻ (17 electrons): Bond order = (10 - 7)/2 = 1.5\n- O₂ (16 electrons): Bond order = (10 - 6)/2 = 2.0\n- O₂⁺ (15 electrons): Bond order = (10 - 5)/2 = 2.5\nThe order of increasing bond order is:\nO₂²⁻ (1.0) < O₂⁻ (1.5) < O₂ (2.0) < O₂⁺ (2.5).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4149,
    question: "According to VSEPR theory, what is the correct decreasing order of electron pair repulsions?",
    option_a: "Lone pair - Lone pair > Lone pair - Bond pair > Bond pair - Bond pair",
    option_b: "Bond pair - Bond pair > Lone pair - Bond pair > Lone pair - Lone pair",
    option_c: "Lone pair - Lone pair > Bond pair - Bond pair > Lone pair - Bond pair",
    option_d: "Lone pair - Bond pair > Lone pair - Lone pair > Bond pair - Bond pair",
    correct_option: "A",
    explanation: "1. Lone pair electrons are localized on only a single nucleus and spread out broadly in space, occupying a larger orbital volume.\n2. Bond pair electrons are shared between two positively charged nuclei and are therefore constrained in a localized internuclear region.\n3. Consequently, repulsion between two lone pairs is the strongest, followed by lone pair - bond pair repulsion, while bond pair - bond pair repulsion is the weakest:\n   lp - lp > lp - bp > bp - bp.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4150,
    question: "Match the Xenon compounds in Column I with their corresponding molecular shapes in Column II:\nColumn I:\n(a) XeF₄\n(b) XeF₆\n(c) XeO₃\n(d) XeOF₄\nColumn II:\n(i) Distorted octahedral\n(ii) Square planar\n(iii) Pyramidal\n(iv) Square pyramidal",
    option_a: "a-(ii), b-(i), c-(iii), d-(iv)",
    option_b: "a-(i), b-(ii), c-(iii), d-(iv)",
    option_c: "a-(ii), b-(iv), c-(iii), d-(i)",
    option_d: "a-(iv), b-(i), c-(ii), d-(iii)",
    correct_option: "A",
    explanation: "- (a) XeF₄: 4 bond pairs + 2 lone pairs = steric number 6 (sp³d²), shape is Square Planar → (ii).\n- (b) XeF₆: 6 bond pairs + 1 lone pair = steric number 7 (sp³d³), shape is Distorted Octahedral → (i).\n- (c) XeO₃: 3 σ-bonds + 1 lone pair = steric number 4 (sp³), shape is Trigonal Pyramidal → (iii).\n- (d) XeOF₄: 5 σ-bonds + 1 lone pair = steric number 6 (sp³d²), shape is Square Pyramidal → (iv).\nThus, the correct matching is a-(ii), b-(i), c-(iii), d-(iv).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4151,
    question: "Which of the following diatomic molecules/ions is diamagnetic (has zero unpaired electrons)?",
    option_a: "CO",
    option_b: "O₂",
    option_c: "B₂",
    option_d: "NO",
    correct_option: "A",
    explanation: "1. Carbon monoxide (CO) has 6 + 8 = 14 electrons (isoelectronic with N₂).\n2. Its molecular orbital configuration is:\n   σ1s² σ*1s² σ2s² σ*2s² (π2p_x² = π2p_y²) σ2p_z²\n3. All 14 electrons are paired; unpaired electrons = 0. Hence, CO is diamagnetic.\n4. O₂ has 2 unpaired electrons, B₂ has 2 unpaired electrons, and NO has 1 unpaired electron (all paramagnetic).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4152,
    question: "Among the species CN⁺, CN, CN⁻, and NO, which one has the highest bond order?",
    option_a: "CN⁻",
    option_b: "CN",
    option_c: "CN⁺",
    option_d: "NO",
    correct_option: "A",
    explanation: "1. Total valence/molecular electrons:\n   - CN⁺: 6 + 7 - 1 = 12 electrons → Bond order = 2.0\n   - CN: 6 + 7 = 13 electrons → Bond order = 2.5\n   - CN⁻: 6 + 7 + 1 = 14 electrons → Isoelectronic with N₂ → Bond order = 3.0\n   - NO: 7 + 8 = 15 electrons → Bond order = 2.5\n2. CN⁻ has 14 electrons and a bond order of 3.0, which is the highest.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4153,
    question: "Which of the following homonuclear diatomic molecules is paramagnetic in its ground state?",
    option_a: "O₂",
    option_b: "N₂",
    option_c: "C₂",
    option_d: "Li₂",
    correct_option: "A",
    explanation: "1. In O₂ (16 electrons), the molecular orbital configuration is:\n   σ1s² σ*1s² σ2s² σ*2s² σ2p_z² (π2p_x² = π2p_y²) (π*2p_x¹ = π*2p_y¹)\n2. By Hund's rule, the two electrons in the degenerate antibonding π* orbitals occupy separate orbitals with parallel spins, giving 2 unpaired electrons.\n3. Therefore, O₂ is paramagnetic and attracted into a magnetic field.\n4. N₂, C₂, and Li₂ have all electrons paired and are diamagnetic.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4154,
    question: "Arrange the following molecules in order of increasing dipole moment: BF₃, NF₃, NH₃, and H₂O.",
    option_a: "BF₃ < NF₃ < NH₃ < H₂O",
    option_b: "NF₃ < BF₃ < NH₃ < H₂O",
    option_c: "BF₃ < NH₃ < NF₃ < H₂O",
    option_d: "H₂O < NH₃ < NF₃ < BF₃",
    correct_option: "A",
    explanation: "1. BF₃ has symmetrical trigonal planar geometry; its bond dipoles cancel out completely: μ = 0 D.\n2. NF₃ has a small dipole moment (μ = 0.24 D) because the highly electronegative F atoms pull electron density opposite to the lone pair dipole.\n3. NH₃ has a significant dipole moment (μ = 1.47 D) because the N-H bond dipoles reinforce the lone pair dipole.\n4. H₂O has two lone pairs and two polar O-H bonds at a 104.5° angle, giving a large dipole moment of μ = 1.85 D.\n5. Thus, the increasing order is: BF₃ (0 D) < NF₃ (0.24 D) < NH₃ (1.47 D) < H₂O (1.85 D).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4155,
    question: "Which of the following sets contains only molecules that possess a net zero dipole moment?",
    option_a: "BF₃, BeCl₂, CO₂, and 1,4-dichlorobenzene",
    option_b: "NH₃, H₂O, CH₄, and CO₂",
    option_c: "NF₃, BeF₂, CHCl₃, and CCl₄",
    option_d: "SO₂, CO₂, BF₃, and trans-2-butene",
    correct_option: "A",
    explanation: "1. BF₃: Symmetrical trigonal planar geometry (μ = 0).\n2. BeCl₂: Symmetrical linear geometry (μ = 0).\n3. CO₂: Symmetrical linear geometry (μ = 0).\n4. 1,4-dichlorobenzene (para-dichlorobenzene): Symmetrical planar ring with two opposing C-Cl bond dipoles in the 1 and 4 positions that cancel each other (μ = 0).\n5. All molecules in Set (A) have zero net dipole moment.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4156,
    question: "What are the structural forms of Beryllium chloride (BeCl₂) in the solid state and in the vapor phase (below 1200 K), respectively?",
    option_a: "Polymeric chain and Dimer",
    option_b: "Dimer and Linear monomer",
    option_c: "Polymeric chain and Linear monomer",
    option_d: "Linear monomer and Polymeric chain",
    correct_option: "A",
    explanation: "1. In the solid state: BeCl₂ exists as a polymeric infinite chain where each Be atom is surrounded tetrahedrally by four Cl atoms (two shared via coordinate bonds from chlorine lone pairs, sp³ hybridized).\n2. In the vapor phase at temperatures below 1200 K: BeCl₂ exists predominantly as a chloro-bridged planar dimer (Be₂Cl₄), where Be is sp² hybridized.\n3. (At very high temperatures above 1200 K, it dissociates into a linear monomer BeCl₂ with sp hybridization).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4157,
    question: "Match each molecule in List I with its correct molecular shape in List II:\nList I:\n(a) PCl₅\n(b) SF₆\n(c) ClF₅\n(d) BCl₃\nList II:\n(i) Octahedral\n(ii) Trigonal planar\n(iii) Trigonal bipyramidal\n(iv) Square pyramidal",
    option_a: "a-(iii), b-(i), c-(iv), d-(ii)",
    option_b: "a-(iv), b-(i), c-(iii), d-(ii)",
    option_c: "a-(iii), b-(ii), c-(iv), d-(i)",
    option_d: "a-(i), b-(iii), c-(ii), d-(iv)",
    correct_option: "A",
    explanation: "- (a) PCl₅: 5 bond pairs + 0 lone pairs = steric number 5 (sp³d) → Trigonal bipyramidal (iii).\n- (b) SF₆: 6 bond pairs + 0 lone pairs = steric number 6 (sp³d²) → Octahedral (i).\n- (c) ClF₅: 5 bond pairs + 1 lone pair = steric number 6 (sp³d²) → Square pyramidal (iv).\n- (d) BCl₃: 3 bond pairs + 0 lone pairs = steric number 3 (sp²) → Trigonal planar (ii).\nThus, the correct matching is a-(iii), b-(i), c-(iv), d-(ii).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4158,
    question: "Statement I: In Lewis's early atomic model, an atom was pictured in terms of a positively charged 'kernel' (nucleus plus inner electrons) and an outer shell.\nStatement II: The outer valence shell was postulated to accommodate a maximum of eight electrons located at the eight corners of a cube.",
    option_a: "Both Statement I and Statement II are correct",
    option_b: "Both Statement I and Statement II are incorrect",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. G.N. Lewis (1916) envisioned an atom as composed of a positively charged 'kernel' (comprising the atomic nucleus and the core electrons) surrounded by a valence shell.\n2. He postulated that the outer shell could hold up to eight electrons, which occupied the eight corners of a cube surrounding the kernel.\n3. This cubic model provided the original conceptual basis for the 'octet rule.'\n4. Hence, both Statement I and Statement II are historically and conceptually correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4159,
    question: "Statement I: In the periodic table, the highly electronegative halogens and the highly electropositive alkali metals are separated by the noble gases.\nStatement II: The formation of a negative ion from a halogen and a positive ion from an alkali metal is accompanied by the attainment of stable noble gas configurations, and the ions are stabilized by electrostatic attraction.",
    option_a: "Both Statement I and Statement II are correct",
    option_b: "Both Statement I and Statement II are incorrect",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. Kossel pointed out that in the periodic table, the group of highly electronegative halogens (Group 17) and highly electropositive alkali metals (Group 1) are directly separated by the inert noble gases (Group 18).\n2. Alkali metals lose an electron to form a noble gas-like cation, and halogens gain an electron to form a noble gas-like anion.\n3. The resulting oppositely charged ions are held together and stabilized by strong electrostatic attraction (ionic/electrovalent bonding).\n4. Both statements are correct according to Kossel's theory.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4160,
    question: "Statement I: A standard covalent bond is formed exclusively by the unequal sharing of electron pairs between two atoms.\nStatement II: In VSEPR theory, a multiple bond (double or triple bond) is treated as a single super electron pair for predicting geometry.",
    option_a: "Statement I is incorrect but Statement II is correct",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Both Statement I and Statement II are incorrect",
    option_d: "Statement I is correct but Statement II is incorrect",
    correct_option: "A",
    explanation: "1. A covalent bond is primarily defined by the sharing of electron pairs contributed equally by the participating atoms (equal sharing; unequal sharing occurs in coordinate covalent bonds or leads to bond polarity, but is not the defining universal nature of covalent bonding). Thus, Statement I is incorrect.\n2. In VSEPR theory, double and triple bonds are regarded as single units of negative charge (super pairs) located along the bond axis, occupying space in a manner similar to a single bond pair. Thus, Statement II is correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4161,
    question: "Statement I: The Lewis electronic theory successfully explains the three-dimensional shapes and bond angles of polyatomic molecules.\nStatement II: The Lewis approach provides a quantitative explanation for the release of energy and relative stability of covalent bonds during molecule formation.",
    option_a: "Both Statement I and Statement II are incorrect",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. Lewis dot theory is a two-dimensional bookkeeping model of electron pairs. It fails completely to explain the three-dimensional shapes, molecular geometry, and bond angles of molecules (which required VSEPR and Valence Bond Theory).\n2. Furthermore, Lewis theory does not provide any quantum mechanical or energetic account of why bonds form, the magnitude of bond energies, or the relative stabilities of molecules.\n3. Therefore, both Statement I and Statement II are incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4162,
    question: "Statement I: In most ionic compounds, the cations are derived from metallic elements and the anions are derived from non-metallic elements.\nStatement II: The ammonium cation (NH₄⁺) is made up of metallic atoms and is not an exception to this general rule.",
    option_a: "Statement I is correct but Statement II is incorrect",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Both Statement I and Statement II are incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. It is a well-established general chemical rule that cations in ionic compounds are typically formed from electropositive metals (e.g., Na⁺, Ca²⁺), while anions are derived from electronegative non-metals (e.g., Cl⁻, O²⁻). Hence, Statement I is correct.\n2. Ammonium ion (NH₄⁺) is a prominent exception to this rule because it is an inorganic polyatomic cation composed entirely of non-metallic elements (Nitrogen and Hydrogen) that forms ionic salts such as NH₄Cl. Hence, Statement II is incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4163,
    question: "Statement I: The lattice enthalpy of an ionic solid is defined as the energy required to completely separate one mole of a solid ionic compound into its constituent gaseous ions.\nStatement II: The thermodynamic stability of an ionic compound is primarily determined by its lattice enthalpy rather than merely the attainment of octet by individual ions.",
    option_a: "Both Statement I and Statement II are correct",
    option_b: "Both Statement I and Statement II are incorrect",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. By thermodynamic definition, lattice enthalpy is the amount of energy required to separate one mole of a crystalline ionic solid into its gaseous constituent ions at infinite separation: MX(s) + U → M⁺(g) + X⁻(g). Statement I is correct.\n2. In many ionic compounds, the ionization enthalpy to form cations is highly endothermic. The process is made spontaneous and thermodynamically favorable by the massive release of lattice energy during the condensation of gaseous ions into the crystalline lattice. Hence, lattice enthalpy is the decisive factor determining the stability of ionic compounds. Statement II is correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4164,
    question: "Statement I: In a water molecule (H₂O), the energy required to break the first O-H bond is identical to the energy required to break the second O-H bond.\nStatement II: The electronic environment and coordination around the oxygen atom remain completely identical after the cleavage of the first O-H bond.",
    option_a: "Both Statement I and Statement II are incorrect",
    option_b: "Both Statement I and Statement II are correct",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. In H₂O, the first bond dissociation enthalpy to break H-OH into H(g) + OH(g) is ΔH₁ = 502 kJ/mol.\n2. The second bond dissociation enthalpy to break the remaining O-H in the hydroxyl radical OH(g) into O(g) + H(g) is ΔH₂ = 427 kJ/mol. They are clearly not equal.\n3. This difference arises because after the first hydrogen atom leaves, the chemical and electronic environment around the oxygen atom changes significantly (a neutral H₂O molecule versus an open-shell hydroxyl radical •OH).\n4. Therefore, both Statement I and Statement II are incorrect.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4165,
    question: "Statement I: sp hybridization is also referred to as diagonal hybridization.\nStatement II: The two sp hybrid orbitals are oriented linearly in opposite directions along an axis at an angle of 180°.",
    option_a: "Both Statement I and Statement II are correct",
    option_b: "Statement I is correct but Statement II is incorrect",
    option_c: "Both Statement I and Statement II are incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. When one s orbital and one p orbital belonging to the same shell mix, they form two equivalent sp hybrid orbitals. This process is commonly called diagonal hybridization because of the linear (diagonal) alignment of the orbitals.\n2. The two hybrid orbitals point in opposite directions along a straight line (the z-axis) with an angle of 180° between their major lobes, minimizing electron repulsion.\n3. Therefore, both Statement I and Statement II are correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4166,
    question: "Statement I: In the Lewis resonance structure of Ozone (O₃), there is one single coordinate/covalent bond and one double bond between the oxygen atoms.\nStatement II: The formal charges on the central oxygen atom, the double-bonded end oxygen atom, and the single-bonded end oxygen atom are +1, 0, and -1, respectively.",
    option_a: "Both Statement I and Statement II are correct",
    option_b: "Both Statement I and Statement II are incorrect",
    option_c: "Statement I is correct but Statement II is incorrect",
    option_d: "Statement I is incorrect but Statement II is correct",
    correct_option: "A",
    explanation: "1. In the Lewis structure of Ozone (O₃), the central oxygen forms a double bond with one terminal oxygen (O=O) and a single bond with the other terminal oxygen (O-O).\n2. Calculating formal charges (FC = Valence e⁻ - Lone pair e⁻ - 1/2 Shared e⁻):\n   - Central O: FC = 6 - 2 - (6/2) = +1\n   - Double-bonded terminal O: FC = 6 - 4 - (4/2) = 0\n   - Single-bonded terminal O: FC = 6 - 6 - (2/2) = -1\n3. Both Statement I and Statement II are correct.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 20 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
