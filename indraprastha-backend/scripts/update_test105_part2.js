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
    id: 4020,
    similar: {
      question: "What is the correct order of thermodynamic stability among the following tetrahedral tetraoxo-metallate(VI) anions: CrO₄²⁻, MnO₄²⁻, and FeO₄²⁻?",
      option_a: "FeO₄²⁻ > MnO₄²⁻ > CrO₄²⁻",
      option_b: "MnO₄²⁻ > CrO₄²⁻ > FeO₄²⁻",
      option_c: "CrO₄²⁻ > MnO₄²⁻ > FeO₄²⁻",
      option_d: "CrO₄²⁻ = MnO₄²⁻ = FeO₄²⁻",
      correct_option: "C",
      explanation: "1. All three species contain the respective 3d-transition metals in the +6 oxidation state: Cr(VI) (d⁰), Mn(VI) (d¹), and Fe(VI) (d²).\n2. As we proceed from Cr to Fe across the 3d series, the nuclear charge increases and the +6 oxidation state becomes progressively less stable and much more strongly oxidizing.\n3. CrO₄²⁻ is very stable and resists reduction under neutral or alkaline conditions.\n4. MnO₄²⁻ (manganate) disproportionates readily in neutral or acidic media.\n5. FeO₄²⁻ (ferrate) is an extraordinarily powerful and unstable oxidizing agent that rapidly decomposes in aqueous solutions.\n6. Therefore, the stability order is: CrO₄²⁻ > MnO₄²⁻ > FeO₄²⁻.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4021,
    similar: {
      question: "Which oxide of chromium is an electrical conductor (metallic) and exhibits ferromagnetism at room temperature, making it suitable for magnetic recording tapes?",
      option_a: "Cr₂O₃",
      option_b: "CrO₃",
      option_c: "CrO₂",
      option_d: "CrO",
      correct_option: "C",
      explanation: "1. Chromium dioxide (CrO₂) is an oxide of chromium in the +4 oxidation state.\n2. It exhibits metallic electrical conductivity due to overlapping d-orbitals forming a conducting band.\n3. It is ferromagnetic with a Curie temperature of about 391 K (118 °C).\n4. Because of its high remanence and coercivity, CrO₂ was historically used in high-fidelity audio cassettes and magnetic recording tapes.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4023,
    similar: {
      question: "Anhydrous iron(III) chloride (FeCl₃) cannot be prepared simply by heating its hydrated salt (FeCl₃·6H₂O) because:",
      option_a: "It hydrolyses upon heating, producing Fe₂O₃ and fumes of HCl rather than anhydrous FeCl₃.",
      option_b: "It explodes violently at 50 °C.",
      option_c: "Iron is reduced to metallic iron with release of oxygen gas.",
      option_d: "It completely sublimes into chlorine gas and iron vapor.",
      correct_option: "A",
      explanation: "1. Hydrated ferric chloride, FeCl₃·6H₂O, contains strongly coordinated water molecules.\n2. When heated, rather than losing water to form anhydrous FeCl₃, it undergoes hydrolysis due to the high charge density of Fe³⁺:\n   2FeCl₃·6H₂O → Fe₂O₃ + 6HCl + 9H₂O\n3. Hence, anhydrous FeCl₃ cannot be prepared by direct dehydration. Instead, it is synthesized by passing dry chlorine gas (Cl₂) over red-hot metallic iron wire.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4024,
    similar: {
      question: "Why does the addition of 12% to 15% manganese to steel impart superior wear-resistance and hardness for railroad frogs and switches?",
      option_a: "It stabilizes the austenitic phase and induces work-hardening under severe compressive impact.",
      option_b: "It converts iron entirely into low-melting amorphous cementite.",
      option_c: "It prevents steel from absorbing sound waves.",
      option_d: "It makes the alloy porous and lightweight.",
      correct_option: "A",
      explanation: "1. Manganese is an austenite-stabilizing element in steel metallurgy.\n2. In Hadfield manganese steel (12-14% Mn, 1% C), the structure remains tough and ductile austenite at ambient temperature.\n3. When subjected to severe mechanical shock or repeated wheel impact on railroad tracks, rapid strain-induced martensitic transformation occurs at the surface.\n4. This work-hardening provides exceptional surface hardness and abrasion resistance while retaining a tough interior.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4028,
    similar: {
      question: "Liquid mercury is commercially stored and transported in containers made of iron rather than other metals because:",
      option_a: "Iron does not form an amalgam with mercury.",
      option_b: "Iron dissolves spontaneously in mercury to form a solid compound.",
      option_c: "Iron oxidizes mercury into calomel immediately.",
      option_d: "Mercury reacts with iron to form toxic mercuric oxide.",
      correct_option: "A",
      explanation: "1. An amalgam is an alloy of mercury with another metal.\n2. Most metals (such as sodium, zinc, gold, and silver) readily dissolve in liquid mercury to form amalgams.\n3. However, certain transition metals like iron (Fe), cobalt (Co), nickel (Ni), and platinum (Pt) do not form amalgams with mercury under standard conditions.\n4. For this reason, liquid mercury is safely stored and shipped in heavy iron flasks or cylinders.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4030,
    similar: {
      question: "Which of the following reducing anions will decolourise an acidified potassium permanganate (KMnO₄/H₂SO₄) solution?",
      option_a: "Sulphite ion (SO₃²⁻)",
      option_b: "Oxalate ion (C₂O₄²⁻)",
      option_c: "Ferrous ion (Fe²⁺)",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "1. Acidified KMnO₄ is a strong oxidizing agent that is readily reduced from the deep purple permanganate ion (MnO₄⁻) to the virtually colorless manganese(II) ion (Mn²⁺):\n   MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O\n2. Sulphite (SO₃²⁻) is oxidized to sulphate (SO₄²⁻):\n   5SO₃²⁻ + 2MnO₄⁻ + 6H⁺ → 5SO₄²⁻ + 2Mn²⁺ + 3H₂O\n3. Oxalate (C₂O₄²⁻) is oxidized to CO₂:\n   5C₂O₄²⁻ + 2MnO₄⁻ + 16H⁺ → 10CO₂ + 2Mn²⁺ + 8H₂O\n4. Ferrous ion (Fe²⁺) is oxidized to ferric ion (Fe³⁺):\n   5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O\n5. Therefore, all these reducing agents decolourise acidified KMnO₄.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4730,
    similar: {
      question: "According to IUPAC definition, a transition element is defined as an element that has:",
      option_a: "A completely filled d-subshell in its ground state only.",
      option_b: "An incompletely filled (n-1)d subshell either in its ground state or in any of its common oxidation states.",
      option_c: "Electrons only in the outermost s-subshell.",
      option_d: "A completely empty d-subshell in all its oxidation states.",
      correct_option: "B",
      explanation: "1. IUPAC defines a transition element as an element whose atom has a partially filled (incompletely filled) d-subshell, or which can give rise to cations with an incomplete d-subshell.\n2. For example, copper ([Ar] 3d¹⁰ 4s¹) has a filled 3d subshell in the neutral atom, but in the Cu²⁺ ion ([Ar] 3d⁹) it has an incompletely filled 3d subshell; hence it is a transition element.\n3. Elements with filled d¹⁰ configurations in both atom and all oxidation states (Zn, Cd, Hg) are not considered typical transition elements.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4731,
    similar: {
      question: "Why are Group 12 elements (zinc, cadmium, and mercury) not classified as typical transition elements according to modern chemical definition?",
      option_a: "They are completely non-metallic elements.",
      option_b: "They have completely filled (n-1)d¹⁰ subshells in both their ground state and common oxidation state (+2).",
      option_c: "They do not form any chemical compounds.",
      option_d: "They have unpaired electrons in their outer s-orbitals.",
      correct_option: "B",
      explanation: "1. Transition metals are characterized by having an incompletely filled (n-1)d subshell in their atomic or ionic states.\n2. The elements of Group 12 (Zn, Cd, Hg) have the general outer electronic configuration (n-1)d¹⁰ ns².\n3. In their ground state as well as in their most common oxidation state (+2, formed by the loss of two ns electrons), their (n-1)d subshell remains completely filled (d¹⁰).\n4. Because they lack partially filled d-orbitals, they do not exhibit typical transition metal properties (e.g., variable valency, coloured ions, paramagnetism).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4732,
    similar: {
      question: "The high melting points and high enthalpies of atomisation of transition elements are primarily attributed to:",
      option_a: "Involvement of greater number of unpaired (n-1)d electrons alongside ns electrons in strong interatomic metallic bonding.",
      option_b: "Low electronegativity and high ionic character of their crystal lattices.",
      option_c: "High volatility and weak London dispersion forces between atoms.",
      option_d: "Presence of closed octet electronic configurations in all atoms.",
      correct_option: "A",
      explanation: "1. In transition metals, both the outer ns electrons and the unpaired inner (n-1)d electrons participate in interatomic metallic bonding.\n2. The presence of partially filled d-orbitals leads to covalent-type directional d-d overlapping between adjacent metal atoms in the crystal lattice.\n3. As the number of unpaired d-electrons increases (up to Cr / Mo / W), the strength of interatomic metallic bonds increases, resulting in very high melting points and large enthalpies of atomisation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4733,
    similar: {
      question: "In the 3d transition series, zinc (Zn) has the lowest melting point (420 °C) and the lowest enthalpy of atomisation (126 kJ/mol) because:",
      option_a: "Its 3d electrons are completely paired (3d¹⁰) and do not participate in metallic bonding.",
      option_b: "It has the largest atomic size in the 3d series.",
      option_c: "It possesses an ionic lattice instead of a metallic lattice.",
      option_d: "Its 4s electrons are completely removed at room temperature.",
      correct_option: "A",
      explanation: "1. Zinc has the electronic configuration [Ar] 3d¹⁰ 4s².\n2. All ten 3d electrons are fully paired and held tightly by the nucleus; they do not participate in interatomic metallic bonding.\n3. Only the two 4s electrons contribute to metallic bonding, making the interatomic forces relatively weak.\n4. Consequently, zinc exhibits the lowest enthalpy of atomisation and the lowest melting point in the 3d series.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4734,
    similar: {
      question: "Why is the second ionization enthalpy of chromium (Cr, Z = 24) significantly higher than that of manganese (Mn, Z = 25)?",
      option_a: "In Cr⁺, the second electron must be removed from a stable, half-filled 3d⁵ configuration.",
      option_b: "Chromium has a larger nuclear charge than manganese.",
      option_c: "Manganese forms a stable noble gas core upon second ionization.",
      option_d: "Cr⁺ has a completely filled 4s orbital.",
      correct_option: "A",
      explanation: "1. The electronic configuration of neutral Cr is [Ar] 3d⁵ 4s¹, and that of Mn is [Ar] 3d⁵ 4s².\n2. After losing the first electron (IE₁):\n   Cr⁺ = [Ar] 3d⁵ (symmetrically half-filled, extra stable configuration)\n   Mn⁺ = [Ar] 3d⁵ 4s¹\n3. The second ionization enthalpy (IE₂) involves removing an electron from Cr⁺ and Mn⁺:\n   - In Cr⁺, the second electron is removed from the exceptionally stable half-filled 3d⁵ subshell, which requires a large amount of energy.\n   - In Mn⁺, the second electron is removed from the higher-energy 4s orbital, leaving behind a stable 3d⁵ core.\n4. Consequently, IE₂(Cr) (1592 kJ/mol) > IE₂(Mn) (1509 kJ/mol).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4735,
    similar: {
      question: "Which of the following statements regarding the ionization enthalpies of transition metals is INCORRECT?",
      option_a: "The first ionization enthalpy (IE₁) of any element is greater than its second ionization enthalpy (IE₂).",
      option_b: "Successive ionization enthalpies always follow the order: IE₁ < IE₂ < IE₃.",
      option_c: "The third ionization enthalpy of manganese (Mn) is exceptionally high due to the stable 3d⁵ configuration of Mn²⁺.",
      option_d: "Ionization enthalpies generally increase across a transition series, though with noticeable irregularities.",
      correct_option: "A",
      explanation: "1. When an electron is removed from a neutral atom to form a unipositive cation, the remaining electrons experience an increased effective nuclear charge (higher Z_eff / electron ratio).\n2. The ionic radius contracts and the remaining electrons are held much more firmly by the nucleus.\n3. Consequently, removing a second electron requires substantially more energy than removing the first electron: IE₂ > IE₁.\n4. Stating that IE₁ is greater than IE₂ violates fundamental principles of atomic structure and is completely incorrect.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4736,
    similar: {
      question: "Which of the following 3d-transition metals is INCORRECTLY matched with its most common and stable oxidation states?",
      option_a: "Scandium: +3 only",
      option_b: "Chromium: +1 and +2 only",
      option_c: "Iron: +2 and +3",
      option_d: "Manganese: +2 and +7",
      correct_option: "B",
      explanation: "1. Scandium ([Ar] 3d¹ 4s²) readily loses all three valence electrons to attain an argon noble-gas core, showing only the +3 oxidation state.\n2. Chromium exhibits oxidation states from +2 to +6, but its most common, thermodynamically stable oxidation states are +3 (as in Cr³⁺ / Cr₂O₃) and +6 (as in CrO₄²⁻ / Cr₂O₇²⁻). The +1 state is extraordinarily rare (only in certain π-complexes), and +2 is strongly reducing.\n3. Therefore, matching chromium with +1 and +2 as its primary states is incorrect.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4737,
    similar: {
      question: "In contrast to p-block elements, how does the stability of higher oxidation states vary down a group in d-block transition elements?",
      option_a: "Heavier members of a d-block group favour higher oxidation states, so stability of the highest oxidation state increases down the group.",
      option_b: "Lower oxidation states become more stable down a d-block group due to the inert pair effect.",
      option_c: "All elements in a d-block group have identical stability in their highest oxidation states.",
      option_d: "Higher oxidation states cannot be formed by heavier d-block elements (4d and 5d).",
      correct_option: "A",
      explanation: "1. In the p-block, lower oxidation states become more stable down a group due to the inert pair effect (e.g., Tl⁺ > Tl³⁺, Pb²⁺ > Pb⁴⁺).\n2. In contrast, in the d-block transition elements, the stability of higher oxidation states increases down the group.\n3. For example, in Group 6: Cr(VI) in CrO₃ or Cr₂O₇²⁻ is a strong oxidizing agent, whereas Mo(VI) in MoO₃ and W(VI) in WO₃ are thermodynamically stable and non-oxidizing.\n4. Similarly, in Group 8: Ru and Os form stable tetroxides (RuO₄, OsO₄) in the +8 oxidation state, which iron cannot form.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4738,
    similar: {
      question: "What is the correct order of oxidising strength among the Group 6 trioxides (CrO₃, MoO₃, WO₃)?",
      option_a: "CrO₃ > MoO₃ > WO₃",
      option_b: "WO₃ > MoO₃ > CrO₃",
      option_c: "MoO₃ > CrO₃ > WO₃",
      option_d: "CrO₃ = MoO₃ = WO₃",
      correct_option: "A",
      explanation: "1. In Group 6 of transition elements (Cr, Mo, W), the maximum oxidation state is +6.\n2. As we move down the group from 3d (Cr) to 4d (Mo) and 5d (W), the higher oxidation state becomes increasingly stable due to greater effective nuclear charge and larger 4d/5d orbitals.\n3. Consequently, chromium(VI) oxide (CrO₃) is an extremely powerful oxidizing agent because Cr(VI) readily accepts electrons to reduce to the more stable Cr(III).\n4. In contrast, MoO₃ and WO₃ are very stable and have virtually no oxidising ability.\n5. Therefore, the decreasing order of oxidising strength is: CrO₃ > MoO₃ > WO₃.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful! Updating Test 105 Part 2 (15 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 105 Part 2 update complete!");
}

run().catch(console.error);
