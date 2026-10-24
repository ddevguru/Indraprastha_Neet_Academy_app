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
    id: 4003,
    similar: {
      question: "A sample of 22-carat gold used in jewellery contains what percentage of pure gold by mass?",
      option_a: "91.67%",
      option_b: "83.33%",
      option_c: "75.00%",
      option_d: "95.50%",
      correct_option: "A",
      explanation: "1. Pure gold is defined as 24-carat gold (100% pure gold).\n2. The percentage purity of gold in an n-carat alloy is calculated using the formula:\n   Purity (%) = (Carat value / 24) × 100\n3. For 22-carat gold:\n   Purity (%) = (22 / 24) × 100 = 91.67%\n4. The remaining 8.33% consists of metals like copper or silver added to impart hardness and mechanical strength.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4004,
    similar: {
      question: "Cinnabar is a principal ore of mercury and is chemically known as red mercuric sulfide. Its chemical formula is:",
      option_a: "Hg₂Cl₂",
      option_b: "HgS",
      option_c: "HgO",
      option_d: "Hg(NO₃)₂",
      correct_option: "B",
      explanation: "1. Cinnabar is the naturally occurring mineral form of mercury(II) sulfide (HgS).\n2. When purified or synthesized as a brilliant red-orange pigment, it is traditionally known as vermilion (or sindoor).\n3. Its chemical formula is HgS.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4005,
    similar: {
      question: "A noble metal 'M' does not dissolve in concentrated HNO₃, concentrated HCl, or strong alkali solutions, but readily dissolves in aqua regia to give a complex [MCl₄]⁻. The metal 'M' is:",
      option_a: "Silver (Ag)",
      option_b: "Copper (Cu)",
      option_c: "Gold (Au)",
      option_d: "Zinc (Zn)",
      correct_option: "C",
      explanation: "1. Gold (Au) is a noble transition metal with a very high standard reduction potential (E° = +1.50 V).\n2. Because of its extreme chemical inertness, it is unreactive towards individual mineral acids like conc. HNO₃ or conc. HCl, as well as strong alkali solutions.\n3. However, it dissolves in aqua regia (a 3:1 molar mixture of conc. HCl and conc. HNO₃) because nascent chlorine and nitrosyl chloride oxidize gold to Au³⁺, which is stabilized by complexation with chloride ions:\n   Au + 4HCl + HNO₃ → H[AuCl₄] + NO + 2H₂O\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4006,
    similar: {
      question: "Which d-block transition series metal exists as a liquid at 25 °C, displays a positive standard reduction potential (+0.85 V), and readily forms amalgams with other metals?",
      option_a: "Gallium (Ga)",
      option_b: "Mercury (Hg)",
      option_c: "Bromine (Br)",
      option_d: "Cesium (Cs)",
      correct_option: "B",
      explanation: "1. Mercury (Hg, Z = 80) is the only transition metal (d-block element) that is a liquid at room temperature (melting point = -38.8 °C).\n2. Because of its filled 5d¹⁰ 6s² electronic configuration and lanthanoid contraction, its 6s electrons are held tightly by the nucleus, resulting in weak metallic bonding.\n3. It has a standard reduction potential E°(Hg²⁺/Hg) = +0.85 V, indicating that it is less electropositive than hydrogen.\n4. It readily alloys with most metals to form liquid or solid amalgams.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4007,
    similar: {
      question: "Hadfield steel (manganese steel) containing about 12% to 14% manganese is widely utilized in rock crushers, excavator buckets, and railway points because:",
      option_a: "It displays exceptional toughness and undergoes severe work-hardening under high-impact stress.",
      option_b: "It has an extremely low melting point and can be easily shaped.",
      option_c: "It is an electrical insulator and prevents lightning strikes on tracks.",
      option_d: "It is completely non-magnetic and brittle at all temperatures.",
      correct_option: "A",
      explanation: "1. Manganese steel (Hadfield steel) typically contains 12% to 14% manganese and around 1% carbon.\n2. It possesses an austenitic crystal structure at room temperature, which gives it high toughness and ductility.\n3. Under impact, abrasion, or compressive mechanical shock, the surface rapidly transforms and work-hardens to an extremely hard martensitic structure, while the interior remains tough and shatter-resistant.\n4. This remarkable combination makes it ideal for railway crossings and heavy mining equipment.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4008,
    similar: {
      question: "Transition metal cations in aqueous solutions typically function as Lewis acids because:",
      option_a: "They possess vacant (n-1)d, ns, and np orbitals capable of accepting lone pairs of electrons from ligands.",
      option_b: "They easily lose protons (H⁺) to the solvent.",
      option_c: "They completely donate their d-electrons to surrounding solvent molecules.",
      option_d: "They always have a noble gas configuration.",
      correct_option: "A",
      explanation: "1. A Lewis acid is defined as a chemical species capable of accepting an electron pair from an electron donor (Lewis base).\n2. Transition metal cations have small ionic radii, relatively high nuclear charge, and energetically accessible vacant (n-1)d, ns, and np orbitals.\n3. These vacant orbitals accept lone pairs of electrons donated by neutral or anionic ligands (such as H₂O, NH₃, CN⁻), forming coordinate covalent complexes.\n4. Therefore, transition metal ions act as Lewis acids during complex formation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4009,
    similar: {
      question: "According to Fajan's rules, when a transition metal forms compounds in two different oxidation states (+2 and +4):",
      option_a: "Compounds in the +2 state are predominantly ionic, whereas compounds in the +4 state are predominantly covalent.",
      option_b: "Compounds in the +4 state are ionic, whereas compounds in the +2 state are covalent.",
      option_c: "Both oxidation states produce purely ionic compounds.",
      option_d: "Both oxidation states produce purely covalent compounds.",
      correct_option: "A",
      explanation: "1. According to Fajan's rules, covalent character in an ionic compound increases with increasing charge on the cation and decreasing cation size (higher charge-to-size ratio or polarising power).\n2. In the lower oxidation state (+2), the cation has a lower positive charge and larger ionic radius, resulting in lower polarising power; hence its compounds are predominantly ionic with high melting points.\n3. In the higher oxidation state (+4), the cation possesses a high charge density, strongly polarising the electron cloud of the anion and imparting significant covalent character.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4010,
    similar: {
      question: "Potassium dichromate (K₂Cr₂O₇) is preferred over sodium dichromate (Na₂Cr₂O₇) as a primary standard in volumetric titrations primarily because:",
      option_a: "K₂Cr₂O₇ is non-hygroscopic and can be weighed out accurately.",
      option_b: "K₂Cr₂O₇ has a higher oxidation state for chromium than Na₂Cr₂O₇.",
      option_c: "Na₂Cr₂O₇ is an insoluble yellow precipitate.",
      option_d: "K₂Cr₂O₇ acts as a reducing agent in acidic solution.",
      correct_option: "A",
      explanation: "1. A primary standard in volumetric analysis must be obtained in a state of high purity, possess high equivalent weight, and must not absorb moisture or react with atmospheric gases during weighing.\n2. Sodium dichromate (Na₂Cr₂O₇) is deliquescent / hygroscopic; it absorbs atmospheric water rapidly, making it impossible to prepare an exact standard solution by direct weighing.\n3. Potassium dichromate (K₂Cr₂O₇), on the other hand, is non-hygroscopic, stable in air, and can be weighed with high precision.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4011,
    similar: {
      question: "Which of the following statements concerning potassium permanganate (KMnO₄) is INCORRECT?",
      option_a: "In acidic medium, MnO₄⁻ is reduced to Mn²⁺ with an equivalent weight of M/5.",
      option_b: "In alkaline medium, KMnO₄ acts as a mild oxidising agent (Baeyer's reagent) and is reduced to MnO₂.",
      option_c: "KMnO₄ acts as an oxidizing agent only in acidic medium and has no oxidizing ability in alkaline solutions.",
      option_d: "Permanganate ion (MnO₄⁻) owes its intense purple colour to ligand-to-metal charge transfer (LMCT).",
      correct_option: "C",
      explanation: "1. KMnO₄ is a versatile oxidizing agent that functions effectively in acidic, neutral, and alkaline media.\n2. In acidic medium: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (n-factor = 5).\n3. In neutral / faintly alkaline medium: MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻ (n-factor = 3).\n4. Alkaline KMnO₄ is widely used in organic chemistry as Baeyer's reagent for detecting unsaturation.\n5. Therefore, stating that KMnO₄ has no oxidizing ability in alkaline medium is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4012,
    similar: {
      question: "When a bright copper coin is placed into an aqueous solution of silver nitrate (AgNO₃), what observable changes take place?",
      option_a: "The solution turns blue due to the formation of Cu²⁺ ions, and lustrous grey-white silver deposits on the copper coin.",
      option_b: "The solution turns green due to the liberation of chlorine gas.",
      option_c: "No reaction takes place because copper is less reactive than silver.",
      option_d: "A brown gas (NO₂) is evolved, and the copper coin remains unaffected.",
      correct_option: "A",
      explanation: "1. In the electrochemical series, the standard reduction potential of the Ag⁺/Ag couple (+0.80 V) is higher than that of the Cu²⁺/Cu couple (+0.34 V).\n2. Therefore, metallic copper acts as a reducing agent and spontaneously displaces silver from aqueous silver nitrate:\n   Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s)\n3. The resulting hydrated copper(II) ions, [Cu(H₂O)₆]²⁺, impart a characteristic blue colour to the solution, while metallic silver crystallizes on the copper surface.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4013,
    similar: {
      question: "The alloy 'Invar', composed of approximately 64% iron and 36% nickel, is widely used in the construction of surveying tapes and clock pendulums because:",
      option_a: "It possesses an extraordinarily low coefficient of thermal expansion near room temperature.",
      option_b: "It is exceptionally light and has low density.",
      option_c: "It is a liquid alloy that does not solidify.",
      option_d: "It is highly radioactive and emits gamma rays.",
      correct_option: "A",
      explanation: "1. Invar is an alloy consisting of approximately 64% iron (Fe) and 36% nickel (Ni).\n2. Its name derives from the word 'invariable' because its dimensions change negligibly with temperature fluctuations.\n3. It exhibits an exceptionally small coefficient of linear thermal expansion near ambient temperatures, preventing dimensional distortion in precision measurement instruments, surveyor's tapes, and clock pendulum rods.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4015,
    similar: {
      question: "Bordeaux mixture, an effective fungicide widely used in agriculture to protect grapes and fruit trees, is prepared by combining:",
      option_a: "Copper(II) sulphate (CuSO₄) and slaked lime (Ca(OH)₂)",
      option_b: "Calcium sulphate (CaSO₄) and copper(II) hydroxide (Cu(OH)₂)",
      option_c: "Copper(II) carbonate and sodium hydroxide",
      option_d: "Zinc sulphate and calcium carbonate",
      correct_option: "A",
      explanation: "1. Bordeaux mixture is a classical and widely used agricultural fungicide.\n2. It was discovered by P.M.A. Millardet in Bordeaux, France, in the late 19th century.\n3. It is prepared by mixing an aqueous solution of copper(II) sulphate (CuSO₄) with a suspension of slaked lime (calcium hydroxide, Ca(OH)₂).\n4. The precipitated basic copper sulphate adheres to plant foliage and controls fungal infestations like downy mildew.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4017,
    similar: {
      question: "Which pair of factors explains why mercury (Hg) is a liquid at room temperature with an exceptionally low melting point (-38.8 °C)?",
      option_a: "Relatively high first ionization energy and weak metallic bonding due to paired 6s² electrons",
      option_b: "Strong covalent network bonding and low electronegativity",
      option_c: "High density and strong ionic lattice energy",
      option_d: "Presence of five unpaired electrons in the 5d subshell",
      correct_option: "A",
      explanation: "1. Mercury has the ground state electronic configuration [Xe] 4f¹⁴ 5d¹⁰ 6s².\n2. Due to relativistic contraction and poor shielding by the 4f electrons (lanthanoid contraction), the outermost 6s electrons are held tightly by the nucleus, resulting in a high ionization energy.\n3. Because the 6s² electrons are paired and inert, they do not participate effectively in delocalized metallic bonding.\n4. The resulting metallic bonds between mercury atoms are exceptionally weak, allowing thermal energy at room temperature to easily disrupt the crystal lattice into the liquid state.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4018,
    similar: {
      question: "Calomel (mercurous chloride, Hg₂Cl₂) turns black upon treatment with aqueous ammonia (NH₄OH). This black precipitate is a mixture of:",
      option_a: "Finely divided black metallic mercury (Hg) and mercuric aminochloride (Hg(NH₂)Cl)",
      option_b: "Mercuric oxide (HgO) and ammonium chloride",
      option_c: "Pure mercurous oxide (Hg₂O)",
      option_d: "Millon's base and metallic mercury",
      correct_option: "A",
      explanation: "1. Calomel is mercurous chloride with the formula Hg₂Cl₂.\n2. When treated with aqueous ammonium hydroxide (NH₄OH), it undergoes a disproportionation reaction:\n   Hg₂Cl₂ + 2NH₄OH → Hg(NH₂)Cl + Hg + NH₄Cl + 2H₂O\n3. The white precipitate of amino mercuric chloride (Hg(NH₂)Cl) is masked by the finely divided black metallic mercury (Hg), turning the entire mixture black.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4019,
    similar: {
      question: "Which of the following statements concerning the oxidation states of 3d-transition elements is INCORRECT?",
      option_a: "In their highest oxidation states (such as Mn in Mn₂O₇ or Cr in CrO₃), the oxides are acidic and predominantly covalent.",
      option_b: "The maximum oxidation state increases from +3 in Sc to +7 in Mn, and then decreases abruptly in subsequent elements.",
      option_c: "Transition elements can exhibit zero oxidation states in complexes with π-acceptor ligands such as [Ni(CO)₄] and [Fe(CO)₅].",
      option_d: "In their highest oxidation states, transition metals exist as simple hydrated basic cations like Mn⁷⁺(aq) and Cr⁶⁺(aq).",
      correct_option: "D",
      explanation: "1. As the oxidation state of a transition metal increases, its ionic radius decreases and its polarising power increases dramatically.\n2. High oxidation states like +6 (Cr) or +7 (Mn) cannot exist as simple bare or hydrated cations (Mn⁷⁺ or Cr⁶⁺) due to extremely high ionization enthalpies and severe charge density.\n3. Instead, in their highest oxidation states, transition elements form covalent oxoanions (like MnO₄⁻, Cr₂O₇²⁻) or covalent acidic oxides (like Mn₂O₇, CrO₃), which are acidic rather than basic.\n4. Lower oxidation states (+2, +3) form basic ionic oxides and hydrated cations (e.g., [Mn(H₂O)₆]²⁺).\nTherefore, Option (D) is the correct answer."
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
  console.log("Login successful! Updating Test 105 Part 1 (15 questions)...");

  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    const payload = JSON.stringify({ similarQuestion: item.similar });
    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`, payload, token);
    console.log(`[${i+1}/${updates.length}] Updated ID ${item.id}:`, res.message || res.success || res);
  }

  console.log("Test 105 Part 1 update complete!");
}

run().catch(console.error);
