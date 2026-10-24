const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function post(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function put(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    };

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'PUT',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
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
    id: 4739,
    similar: {
      question: "Which of the following 3d-transition elements exhibits only a single characteristic oxidation state of +3 in its compounds?",
      option_a: "Titanium (Ti)",
      option_b: "Scandium (Sc)",
      option_c: "Vanadium (V)",
      option_d: "Cobalt (Co)",
      correct_option: "B",
      explanation: "1. Scandium (Z = 21) has the electronic configuration [Ar] 3d¹ 4s².\n2. By losing all three valence electrons (one 3d and two 4s), it achieves the exceptionally stable noble-gas configuration of argon ([Ar]).\n3. The energy required to remove all three electrons is more than compensated by lattice enthalpy or hydration enthalpy.\n4. Because of this large thermodynamic driving force, scandium does not exhibit variable oxidation states; it forms only the +3 oxidation state.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4740,
    similar: {
      question: "In the 3d transition series, which element exhibits the greatest variety and highest number of oxidation states (from +2 to +7)?",
      option_a: "Chromium (Cr, Z = 24)",
      option_b: "Iron (Fe, Z = 26)",
      option_c: "Manganese (Mn, Z = 25)",
      option_d: "Vanadium (V, Z = 23)",
      correct_option: "C",
      explanation: "1. The maximum number of oxidation states is shown by elements near the middle of a transition series.\n2. Manganese has the ground-state valence configuration 3d⁵ 4s², featuring five unpaired 3d electrons and two 4s electrons.\n3. Because the energies of the 3d and 4s orbitals are very close, manganese can involve up to all seven valence electrons in chemical bonding.\n4. Consequently, it exhibits oxidation states ranging from +2 to +7 (+2, +3, +4, +5, +6, and +7), which is the largest number of oxidation states in the 3d series.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4741,
    similar: {
      question: "Why does Cr²⁺ (d⁴) act as a strong reducing agent in aqueous solution, whereas Mn³⁺ (d⁴) acts as a strong oxidising agent?",
      option_a: "Cr²⁺ is oxidized to Cr³⁺, which attains the extra-stable half-filled t₂g³ configuration in octahedral crystal fields.",
      option_b: "Cr²⁺ has a smaller ionic radius than Mn³⁺.",
      option_c: "Cr²⁺ readily accepts electrons to become Cr⁺.",
      option_d: "Cr³⁺ possesses a completely filled eg subshell.",
      correct_option: "A",
      explanation: "1. In an octahedral aqueous environment, the 3d subshell splits into lower-energy t₂g and higher-energy eg orbitals.\n2. When Cr²⁺ (3d⁴) is oxidized to Cr³⁺ (3d³), it attains a half-filled t₂g³ subshell (t₂g¹_x y t₂g¹_y z t₂g¹_x z), which possesses significant extra crystal field stabilization energy (CFSE).\n3. Therefore, Cr²⁺ has a strong thermodynamic driving force to lose an electron and act as a reducing agent (E°(Cr³⁺/Cr²⁺) = -0.41 V).\n4. In contrast, Mn³⁺ (3d⁴) is reduced to Mn²⁺ (3d⁵), achieving a half-filled d⁵ shell in spherical fields (E°(Mn³⁺/Mn²⁺) = +1.57 V), making it an oxidising agent.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4742,
    similar: {
      question: "The ability of fluorine to stabilize the highest oxidation states of transition metals (such as in VF₅ and CrF₆) is primarily attributed to:",
      option_a: "Low ionization energy of fluorine atoms.",
      option_b: "High lattice energy in ionic fluorides and high bond enthalpy in covalent fluorides due to the small size of fluorine.",
      option_c: "High electron affinity of fluorine compared to other halogens.",
      option_d: "The capability of fluorine to form multiple pπ-dπ back-bonds.",
      correct_option: "B",
      explanation: "1. Fluorine is the most electronegative element with an exceptionally small ionic and covalent radius.\n2. In ionic metal fluorides, the small size of F⁻ leads to extremely high lattice energy.\n3. In covalent high-oxidation fluorides (like VF₅), the small size of fluorine allows high coordination numbers around the central metal without steric hindrance, yielding very high metal-fluorine bond dissociation enthalpies.\n4. These large energetic terms provide the necessary energy to compensate for the high ionization enthalpies required to reach high oxidation states.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4743,
    similar: {
      question: "The highest oxidation state of manganese in a fluoride is +4 (MnF₄), whereas in an oxide it reaches +7 (Mn₂O₇). This difference arises because:",
      option_a: "Fluorine has a larger atomic radius than oxygen.",
      option_b: "Oxygen possesses the ability to form multiple pπ-dπ bonds with transition metals, whereas fluorine forms only single bonds.",
      option_c: "Mn⁷⁺ is completely unstable in the presence of any non-metal.",
      option_d: "Oxygen is more electronegative than fluorine.",
      correct_option: "B",
      explanation: "1. The highest oxidation state stabilized by fluorine for manganese is +4 (in MnF₄), because fluorine forms only single σ-bonds; placing seven fluorine atoms around a relatively small manganese atom (MnF₇) is sterically unfeasible.\n2. In contrast, oxygen can form multiple bonds (pπ-dπ overlap) with manganese.\n3. In Mn₂O₇, each manganese atom is tetrahedrally coordinated to four oxygen atoms (three terminal double bonds Mn=O and one bridging Mn–O–Mn bond).\n4. This multiple bonding satisfies the high valency of +7 without steric crowding.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4744,
    similar: {
      question: "What is the correct increasing order of oxidising power among the following transition metal oxo-species in acidic solution: VO₂⁺, Cr₂O₇²⁻, and MnO₄⁻?",
      option_a: "MnO₄⁻ < Cr₂O₇²⁻ < VO₂⁺",
      option_b: "VO₂⁺ < Cr₂O₇²⁻ < MnO₄⁻",
      option_c: "Cr₂O₇²⁻ < VO₂⁺ < MnO₄⁻",
      option_d: "Cr₂O₇²⁻ < MnO₄⁻ < VO₂⁺",
      correct_option: "B",
      explanation: "1. The oxidising power of oxo-species depends on the standard reduction potential (E°) of their redox couples in acidic solution.\n2. The standard electrode potentials are:\n   - VO₂⁺ + 2H⁺ + e⁻ → VO²⁺ + H₂O; E° = +1.00 V\n   - Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O; E° = +1.33 V\n   - MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O; E° = +1.51 V\n3. A more positive E° value indicates a stronger tendency to undergo reduction, i.e., stronger oxidising power.\n4. Thus, the increasing order of oxidising power is: VO₂⁺ < Cr₂O₇²⁻ < MnO₄⁻.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4745,
    similar: {
      question: "Thermal decomposition of which of the following metal nitrates yields the free metallic element rather than a metal oxide?",
      option_a: "Lead(II) nitrate, Pb(NO₃)₂",
      option_b: "Copper(II) nitrate, Cu(NO₃)₂",
      option_c: "Calcium nitrate, Ca(NO₃)₂",
      option_d: "Silver nitrate, AgNO₃",
      correct_option: "D",
      explanation: "1. Most heavy metal nitrates decompose on heating to give the metal oxide, nitrogen dioxide, and oxygen gas:\n   2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂\n   2Cu(NO₃)₂ → 2CuO + 4NO₂ + O₂\n2. However, the oxides of noble metals like silver (Ag₂O) and mercury (HgO) are thermally unstable at high temperatures and decompose further into free metal and oxygen.\n3. Therefore, heating silver nitrate yields metallic silver:\n   2AgNO₃(s) → 2Ag(s) + 2NO₂(g) + O₂(g)\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4746,
    similar: {
      question: "Which of the following pairs of transition metal ions possesses the same spin-only magnetic moment in high-spin states?",
      option_a: "Fe³⁺ and Ni²⁺",
      option_b: "Fe²⁺ and Co³⁺",
      option_c: "Cu²⁺ and Ti³⁺",
      option_d: "Mn²⁺ and Cr²⁺",
      correct_option: "B",
      explanation: "1. Spin-only magnetic moment is given by μ = √(n(n + 2)) BM, where n is the number of unpaired electrons.\n2. Electronic configurations:\n   - Fe²⁺ (Z = 26): [Ar] 3d⁶ → has 4 unpaired electrons (n = 4).\n   - Co³⁺ (Z = 27): [Ar] 3d⁶ → has 4 unpaired electrons (n = 4) in high-spin state.\n3. Since both ions possess n = 4 unpaired electrons, their spin-only magnetic moments are equal:\n   μ = √(4(4 + 2)) = √24 ≈ 4.90 BM.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4747,
    similar: {
      question: "Calculate the spin-only magnetic moment of a divalent transition metal ion (M²⁺) in aqueous solution whose atomic number is 26.",
      option_a: "5.92 BM",
      option_b: "4.90 BM",
      option_c: "3.87 BM",
      option_d: "1.73 BM",
      correct_option: "B",
      explanation: "1. The atomic number Z = 26 corresponds to iron (Fe).\n2. The ground state electronic configuration of neutral iron is [Ar] 3d⁶ 4s².\n3. For the divalent ion Fe²⁺, two 4s electrons are removed: Fe²⁺ = [Ar] 3d⁶.\n4. Distributing 6 electrons among the five d-orbitals: one orbital is paired and four orbitals contain unpaired electrons (n = 4).\n5. The spin-only magnetic moment is:\n   μ = √(n(n + 2)) = √(4 × (4 + 2)) = √24 ≈ 4.90 BM.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4748,
    similar: {
      question: "Which of the following transition metal cations exhibits a characteristic colour in aqueous solution due to d–d electron transitions in the visible spectrum?",
      option_a: "Sc³⁺",
      option_b: "Ti⁴⁺",
      option_c: "Zn²⁺",
      option_d: "Ni²⁺",
      correct_option: "D",
      explanation: "1. For an ion to exhibit colour via d–d transitions, its d-subshell must be partially filled (d¹ to d⁹).\n2. Sc³⁺ and Ti⁴⁺ have 3d⁰ configurations (no d-electrons), so no d–d transition is possible (colourless).\n3. Zn²⁺ has a completely filled 3d¹⁰ configuration (no vacant d-orbitals for transition), so it is colourless.\n4. Ni²⁺ has a 3d⁸ configuration; absorption of light in the visible spectrum promotes electrons between split d-orbitals (t₂g → eg), giving aqueous Ni²⁺ solutions a characteristic green colour.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4749,
    similar: {
      question: "Which of the following pairs represents interstitial compounds formed by transition metals?",
      option_a: "NaCl and KCl",
      option_b: "TiC and Fe₃H",
      option_c: "CH₄ and NH₃",
      option_d: "SiO₂ and CO₂",
      correct_option: "B",
      explanation: "1. Interstitial compounds are formed when small non-metallic atoms like hydrogen, boron, carbon, or nitrogen are trapped inside the interstitial spaces of transition metal crystal lattices.\n2. They are typically non-stoichiometric (e.g., TiC, Fe₃H, VH₀.₅₆, Mn₄N) and retain metallic conductivity while gaining extreme hardness and high melting points.\n3. Therefore, TiC and Fe₃H are interstitial compounds.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4750,
    similar: {
      question: "Which of the following statements regarding the physical and chemical properties of interstitial compounds is INCORRECT?",
      option_a: "They have very high melting points, higher than those of pure parent metals.",
      option_b: "They are very hard; some borides approach diamond in hardness.",
      option_c: "They completely lose electrical conductivity and behave as insulators.",
      option_d: "They retain metallic electrical and thermal conductivity.",
      correct_option: "C",
      explanation: "1. Interstitial compounds possess the following key characteristics:\n   - They have very high melting points, even higher than those of the pure transition metals.\n   - They are extremely hard (for example, transition metal borides approach diamond in hardness).\n   - They retain metallic electrical and thermal conductivity because the metal band structure is preserved.\n   - They are chemically inert.\n2. Therefore, claiming that they lose electrical conductivity and behave as insulators is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4751,
    similar: {
      question: "Which of the following commercial alloys does NOT contain copper as an essential constituent?",
      option_a: "Brass",
      option_b: "Bronze",
      option_c: "German silver",
      option_d: "Solder",
      correct_option: "D",
      explanation: "1. The elemental compositions of these common alloys are:\n   - Brass: Copper (Cu, ~60-80%) and Zinc (Zn, ~20-40%)\n   - Bronze: Copper (Cu, ~88-90%) and Tin (Sn, ~10-12%)\n   - German silver: Copper (Cu, ~50%), Zinc (Zn, ~30%), and Nickel (Ni, ~20%) — despite its name, it contains no silver!\n   - Solder: Lead (Pb, ~50%) and Tin (Sn, ~50%) — contains no copper.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4752,
    similar: {
      question: "According to Hume-Rothery rules, transition metals readily form substitutional solid solution alloys because their atomic radii differ by not more than about:",
      option_a: "15%",
      option_b: "40%",
      option_c: "60%",
      option_d: "80%",
      correct_option: "A",
      explanation: "1. Transition metals have very similar atomic sizes due to the shielding effect of inner d-electrons and lanthanoid contraction.\n2. According to Hume-Rothery rules of metallurgy, two metals can form an extensive substitutional solid-solution alloy if their atomic radii do not differ by more than approximately 15%.\n3. Because atoms of one transition metal can easily replace atoms of another in the crystal lattice within this size tolerance, transition metals form a wide variety of alloys (such as steels, brass, and bronze).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4753,
    similar: {
      question: "Copper(I) ion (Cu⁺) is unstable in aqueous solutions and spontaneously undergoes disproportionation into Cu²⁺ and Cu. This occurs primarily because:",
      option_a: "The hydration enthalpy of Cu²⁺ is far more negative than that of Cu⁺, which overcompensates for the second ionization enthalpy of copper.",
      option_b: "Cu⁺ has a larger ionic radius than Cu²⁺.",
      option_c: "Metallic copper easily dissolves in pure water.",
      option_d: "Cu²⁺ has a d¹⁰ electronic configuration.",
      correct_option: "A",
      explanation: "1. In the gas phase, Cu⁺ (3d¹⁰) is more stable than Cu²⁺ (3d⁹) because removing a second electron requires a high ionization enthalpy (IE₂ = 1958 kJ/mol).\n2. However, in aqueous solution, Cu²⁺ has a much smaller radius and higher charge (+2) than Cu⁺ (+1), giving it a much higher charge density.\n3. Consequently, the hydration enthalpy of Cu²⁺ (-2121 kJ/mol) is far more negative and exothermic than that of Cu⁺ (-593 kJ/mol).\n4. This massive hydration energy compensates for the energy required to remove the second electron, driving the disproportionation reaction:\n   2Cu⁺(aq) → Cu²⁺(aq) + Cu(s)\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log("Logging in...");
  const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
  const token = loginRes.token;
  if (!token) {
    console.error("Login failed:", loginRes);
    return;
  }
  console.log("Login successful! Updating Test 105 Part 3 (15 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 105 Part 3 update complete!");
}

run().catch(console.error);
