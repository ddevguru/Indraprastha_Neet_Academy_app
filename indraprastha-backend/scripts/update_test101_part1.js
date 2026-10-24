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
    id: 3779,
    similarQuestion: {
      question: "Standard reduction potentials for four half-cells are given below:\nE°(Zn²⁺ | Zn) = -0.76 V\nE°(Fe²⁺ | Fe) = -0.44 V\nE°(Cu²⁺ | Cu) = +0.34 V\nE°(Ag⁺ | Ag) = +0.80 V\nWhich of the following statements is/are correct?\n(A) Zn can reduce Cu²⁺, Fe²⁺, and Ag⁺ ions in aqueous solution.\n(B) Ag can displace copper from aqueous CuSO₄ solution.\n(C) Ag⁺ is the strongest oxidizing agent among the given metal ions.\n(D) Zn is the strongest reducing agent among the given metals.",
      option_a: "A, B, D",
      option_b: "B, C",
      option_c: "A, C, D",
      option_d: "A, B, C",
      correct_option: "C",
      explanation: "Let us analyze the statements:\n1. The more negative the standard reduction potential, the greater is the tendency of the metal to lose electrons (stronger reducing agent). Since Zn has the lowest (most negative) E° (-0.76 V), it is the strongest reducing agent and readily reduces Fe²⁺, Cu²⁺, and Ag⁺. Thus, statements (A) and (D) are correct.\n2. Ag has a more positive reduction potential (+0.80 V) than Cu (+0.34 V). Therefore, Ag cannot reduce Cu²⁺ to Cu and cannot displace copper from CuSO₄ solution. Thus, statement (B) is incorrect.\n3. The species with the highest (most positive) reduction potential has the strongest tendency to accept electrons, making it the strongest oxidizing agent. E°(Ag⁺ | Ag) is highest (+0.80 V), so Ag⁺ is the strongest oxidizing agent. Thus, statement (C) is correct.\nHence, statements (A), (C), and (D) are correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3780,
    similarQuestion: {
      question: "Consider the galvanic cell reaction:\nZn(s) + 2 Ag⁺(aq) → Zn²⁺(aq) + 2 Ag(s)\nWhich of the following changes will INCREASE the cell potential (E_cell) at 298 K?\n(A) Increasing [Ag⁺] concentration in the cathodic half-cell.\n(B) Increasing [Zn²⁺] concentration in the anodic half-cell.\n(C) Decreasing [Zn²⁺] concentration in the anodic half-cell.\n(D) Increasing the surface area of the Ag electrode.",
      option_a: "A, B",
      option_b: "A, C",
      option_c: "B, D",
      option_d: "A, D",
      correct_option: "B",
      explanation: "From the Nernst equation for the cell reaction:\nE_cell = E°_cell - (0.0591 / 2) log( [Zn²⁺] / [Ag⁺]² )\n\nTo increase E_cell, the reaction quotient Q = [Zn²⁺] / [Ag⁺]² must be reduced:\n1. Increasing [Ag⁺] decreases Q, thereby increasing E_cell. (Statement A is correct)\n2. Increasing [Zn²⁺] increases Q, thereby decreasing E_cell. (Statement B is incorrect)\n3. Decreasing [Zn²⁺] decreases Q, thereby increasing E_cell. (Statement C is correct)\n4. Changing the surface area of pure solid electrodes does not alter active masses (activity = 1) and does not affect the cell potential. (Statement D is incorrect)\nTherefore, actions (A) and (C) increase the cell potential.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3781,
    similarQuestion: {
      question: "Given the standard reduction potentials:\nE°(Fe³⁺ | Fe²⁺) = +0.77 V\nE°(I₂ | I⁻) = +0.54 V\nWhat is the standard cell potential (E°_cell) for the spontaneous redox reaction:\n2 Fe³⁺(aq) + 2 I⁻(aq) → 2 Fe²⁺(aq) + I₂(s)?",
      option_a: "0.23 V",
      option_b: "1.31 V",
      option_c: "1.00 V",
      option_d: "0.54 V",
      correct_option: "A",
      explanation: "Let us identify the cathode and anode half-reactions:\n1. Reduction (at cathode):\n2 Fe³⁺ + 2 e⁻ → 2 Fe²⁺; E°_cathode = +0.77 V\n\n2. Oxidation (at anode):\n2 I⁻ → I₂ + 2 e⁻; E°_anode = +0.54 V\n\nStandard EMF of the cell is:\nE°_cell = E°_cathode - E°_anode\nE°_cell = +0.77 V - (+0.54 V) = +0.23 V\nSince E°_cell > 0, the reaction is spontaneous as written.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3782,
    similarQuestion: {
      question: "Standard reduction potentials at 298 K are:\nE°(Mg²⁺ | Mg) = -2.37 V\nE°(Al³⁺ | Al) = -1.66 V\nE°(Zn²⁺ | Zn) = -0.76 V\nE°(Cu²⁺ | Cu) = +0.34 V\nWhich of the following metals is the strongest reducing agent?",
      option_a: "Al",
      option_b: "Mg",
      option_c: "Zn",
      option_d: "Cu",
      correct_option: "B",
      explanation: "A metal acts as a reducing agent by undergoing oxidation (losing electrons):\nM → Mⁿ⁺ + n e⁻\n\nThe standard oxidation potential is E°_ox = -E°_red.\nThe more negative the standard reduction potential (E°_red), the more positive is the oxidation potential, meaning the metal loses electrons most readily and acts as the strongest reducing agent.\nComparing the given standard reduction potentials:\nE°(Mg²⁺ | Mg) = -2.37 V (most negative)\nE°(Al³⁺ | Al) = -1.66 V\nE°(Zn²⁺ | Zn) = -0.76 V\nE°(Cu²⁺ | Cu) = +0.34 V\nTherefore, magnesium (Mg) has the greatest tendency to oxidize and is the strongest reducing agent.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3783,
    similarQuestion: {
      question: "In an electrolytic cell containing an aqueous electrolyte solution, current flows when both electrodes are immersed. If one of the electrodes (e.g., the cathode) is completely removed from the solution while the external circuit switch remains on, what happens to the ionic movement in the solution?",
      option_a: "Anions continue to migrate towards the anode, while cations stop moving.",
      option_b: "Cations migrate towards the anode, and anions move towards the cathode.",
      option_c: "The circuit is broken and net directed migration of both cations and anions stops completely.",
      option_d: "Only neutral solvent molecules carry the entire electrical current.",
      correct_option: "C",
      explanation: "When an electrode is removed from the electrolyte solution:\n1. The external circuit is interrupted, creating an open circuit condition.\n2. In an open circuit, no potential gradient (electric field) can be maintained across the solution.\n3. Without an electric field to exert electrostatic forces on the ions, the directed movement (drift) of both cations and anions ceases immediately.\n4. The ions merely undergo random thermal Brownian motion with zero net displacement.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3784,
    similarQuestion: {
      question: "During the electrolytic refining of blister copper using an impure copper anode, pure copper cathode, and acidified CuSO₄ solution, if 3.18 g of pure copper is deposited on the cathode, the decrease in the mass of the impure copper anode will be:",
      option_a: "More than 3.18 g",
      option_b: "Exactly equal to 3.18 g",
      option_c: "Less than 3.18 g",
      option_d: "Zero, because anode mass remains unchanged",
      correct_option: "A",
      explanation: "In electro-refining of copper:\n1. The impure copper anode contains copper along with active metal impurities (like Fe, Ni, Zn) and noble metal impurities (like Ag, Au, Pt).\n2. During electrolysis, copper and the active impurities dissolve into solution at the anode:\nCu → Cu²⁺ + 2 e⁻\nFe → Fe²⁺ + 2 e⁻\nZn → Zn²⁺ + 2 e⁻\n3. Noble impurities (Ag, Au) do not oxidize and fall to the bottom of the cell as 'anode mud'.\n4. At the cathode, only Cu²⁺ ions are reduced and deposited because Cu²⁺ has a higher reduction potential than Fe²⁺ and Zn²⁺.\n5. Therefore, the total loss of mass from the anode equals the mass of dissolved copper + mass of dissolved active impurities + mass of anode mud, which is strictly greater than the mass of pure copper deposited at the cathode (> 3.18 g).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3785,
    similarQuestion: {
      question: "For an H₂ - O₂ fuel cell operating at 298 K, the standard Gibbs free energy change is ΔG° = -474.4 kJ mol⁻¹ and the standard enthalpy change is ΔH° = -571.6 kJ mol⁻¹ for the reaction:\n2 H₂(g) + O₂(g) → 2 H₂O(l)\nWhat is the standard entropy change (ΔS°) for this fuel cell reaction?",
      option_a: "+0.326 kJ K⁻¹",
      option_b: "-0.652 kJ K⁻¹",
      option_c: "-326 kJ K⁻¹",
      option_d: "-0.326 kJ K⁻¹",
      correct_option: "D",
      explanation: "The thermodynamic relationship between Gibbs free energy, enthalpy, and entropy is:\nΔG° = ΔH° - T ΔS°\n\nRearranging for ΔS°:\nT ΔS° = ΔH° - ΔG°\nΔS° = (ΔH° - ΔG°) / T\n\nGiven:\nΔG° = -474.4 kJ mol⁻¹\nΔH° = -571.6 kJ mol⁻¹\nT = 298 K\n\nSubstitute the values:\nΔS° = [-571.6 - (-474.4)] / 298\nΔS° = (-571.6 + 474.4) / 298\nΔS° = -97.2 / 298 = -0.3262 kJ K⁻¹ ≈ -0.326 kJ K⁻¹\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3786,
    similarQuestion: {
      question: "The electrical resistance of a 0.20 M solution of an electrolyte in a conductivity cell is 100 Ω. The electrodes in the cell are 1.5 cm apart with a cross-sectional area of 3.0 cm². What is the molar conductivity (Λₘ) of the solution in S m² mol⁻¹?",
      option_a: "0.025 S m² mol⁻¹",
      option_b: "0.25 S m² mol⁻¹",
      option_c: "0.0025 S m² mol⁻¹",
      option_d: "0.00025 S m² mol⁻¹",
      correct_option: "C",
      explanation: "1. Cell constant (G*):\nG* = l / A = 1.5 cm / 3.0 cm² = 0.50 cm⁻¹ = 50 m⁻¹\n\n2. Conductivity (κ):\nκ = G* / R = 50 m⁻¹ / 100 Ω = 0.50 S m⁻¹\n\n3. Concentration in SI units (mol m⁻³):\nC = 0.20 mol L⁻¹ = 0.20 × 1000 mol m⁻³ = 200 mol m⁻³\n\n4. Molar conductivity (Λₘ):\nΛₘ = κ / C = 0.50 S m⁻¹ / 200 mol m⁻³ = 0.0025 S m² mol⁻¹\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3787,
    similarQuestion: {
      question: "During the discharging process of a lead storage battery, which of the following statements is/are correct?\n(A) PbSO₄ is formed at both the anode and the cathode.\n(B) Sulfuric acid (H₂SO₄) is consumed and water (H₂O) is produced.\n(C) The density of the H₂SO₄ electrolyte solution increases.\n(D) Lead dioxide (PbO₂) acts as the cathode and is reduced.",
      option_a: "A, B, D",
      option_b: "A, C, D",
      option_c: "B, C",
      option_d: "A, C",
      correct_option: "A",
      explanation: "The overall cell reaction during discharge of a lead storage battery is:\nPb(s) + PbO₂(s) + 2 H₂SO₄(aq) → 2 PbSO₄(s) + 2 H₂O(l)\n\nLet us evaluate the statements:\n1. Insoluble PbSO₄ precipitates at both the anode (Pb → PbSO₄) and the cathode (PbO₂ → PbSO₄). Thus, statement (A) is correct.\n2. H₂SO₄ is consumed and H₂O is produced, causing dilution of the electrolyte and decreasing its density (typically from 1.30 g/mL to 1.15 g/mL). Thus, statement (B) is correct, and statement (C) is incorrect.\n3. PbO₂ undergoes reduction from oxidation state +4 to +2 (in PbSO₄) at the cathode. Thus, statement (D) is correct.\nTherefore, statements (A), (B), and (D) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3788,
    similarQuestion: {
      question: "Which of the following electrolysis setups will result in the liberation of oxygen gas (O₂) at the anode?\n(A) Electrolysis of dilute aqueous H₂SO₄ using inert Pt electrodes.\n(B) Electrolysis of aqueous CuSO₄ using copper electrodes.\n(C) Electrolysis of molten NaOH using inert nickel/iron electrodes.\n(D) Electrolysis of very dilute aqueous NaCl solution using inert Pt electrodes.",
      option_a: "A, B, C",
      option_b: "B, C, D",
      option_c: "A, C, D",
      option_d: "A, D",
      correct_option: "C",
      explanation: "Let us analyze the anode reactions:\n1. Dilute H₂SO₄ with Pt electrodes: Water is oxidized at the anode in preference to sulfate ions:\n2 H₂O(l) → O₂(g) + 4 H⁺(aq) + 4 e⁻. O₂ is evolved. (A is correct)\n2. Aqueous CuSO₄ with Cu electrodes: Copper anode is active and oxidizes directly: Cu(s) → Cu²⁺(aq) + 2 e⁻. No O₂ is evolved. (B is incorrect)\n3. Molten NaOH with inert electrodes: OH⁻ ions are discharged at the anode:\n4 OH⁻ → 2 H₂O + O₂(g) + 4 e⁻. O₂ is evolved. (C is correct)\n4. Very dilute NaCl with Pt electrodes: Due to low Cl⁻ concentration, oxidation of water occurs, liberating O₂. (D is correct)\nTherefore, setups (A), (C), and (D) liberate oxygen at the anode.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3789,
    similarQuestion: {
      question: "During the electrolysis of acidified water, 180 g of H₂O (10 moles) is completely decomposed into H₂(g) and O₂(g). At standard temperature and pressure (STP, molar volume of gas = 22.4 L mol⁻¹), which of the following statements is/are correct?\n(A) 112 L of O₂(g) is liberated at the anode.\n(B) 224 L of H₂(g) is liberated at the cathode.\n(C) The total volume of gases produced at STP is 336 L.\n(D) A total of 10 Faradays of charge is required for this decomposition.",
      option_a: "A, B, C",
      option_b: "A, C, D",
      option_c: "B, D",
      option_d: "A, B",
      correct_option: "A",
      explanation: "The balanced equation for the decomposition of water is:\n2 H₂O(l) → 2 H₂(g) + O₂(g)\n\nGiven 10 moles of H₂O:\n1. Moles of H₂ produced = 10 moles (at cathode).\nVolume of H₂ at STP = 10 × 22.4 L = 224 L. (Statement B is correct)\n\n2. Moles of O₂ produced = 5 moles (at anode).\nVolume of O₂ at STP = 5 × 22.4 L = 112 L. (Statement A is correct)\n\n3. Total volume of gas = 224 L + 112 L = 336 L. (Statement C is correct)\n\n4. For 1 mole of H₂O, 2 moles of electrons (2 Faradays) are transferred (2 H⁺ + 2 e⁻ → H₂).\nThus, for 10 moles of H₂O, charge required = 20 F, not 10 F. (Statement D is incorrect)\nTherefore, statements (A), (B), and (C) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3790,
    similarQuestion: {
      question: "Standard reduction potentials are given as:\nE°(Cr³⁺ | Cr) = -0.74 V\nE°(Fe³⁺ | Fe²⁺) = +0.77 V\nE°(Cl₂ | Cl⁻) = +1.36 V\nE°(MnO₄⁻, H⁺ | Mn²⁺) = +1.51 V\nWhich of the following statements is/are correct?\n(A) MnO₄⁻ in acidic medium can oxidize Fe²⁺ to Fe³⁺.\n(B) Cl₂ can oxidize Mn²⁺ to MnO₄⁻ in acidic medium.\n(C) Fe³⁺ can oxidize Cr to Cr³⁺ under standard conditions.\n(D) Cr³⁺ can oxidize Fe²⁺ to Fe³⁺.",
      option_a: "A, C",
      option_b: "B, C",
      option_c: "A, B",
      option_d: "C, D",
      correct_option: "A",
      explanation: "A redox reaction is spontaneous under standard conditions if E°_cell = E°_reduction(cathode) - E°_reduction(anode) > 0:\n1. Oxidation of Fe²⁺ by MnO₄⁻:\nE°_cell = 1.51 - 0.77 = +0.74 V > 0. Spontaneous. Thus, statement (A) is correct.\n2. Oxidation of Mn²⁺ by Cl₂:\nE°_cell = 1.36 - 1.51 = -0.15 V < 0. Non-spontaneous. Thus, statement (B) is incorrect.\n3. Oxidation of Cr by Fe³⁺:\nE°_cell = 0.77 - (-0.74) = +1.51 V > 0. Spontaneous. Thus, statement (C) is correct.\n4. Oxidation of Fe²⁺ by Cr³⁺:\nE°_cell = -0.74 - 0.77 = -1.51 V < 0. Non-spontaneous. Thus, statement (D) is incorrect.\nTherefore, statements (A) and (C) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3791,
    similarQuestion: {
      question: "Consider the cell:\nPt(s) | H₂(g, 1 atm) | H⁺(aq, 1 M) || Cu²⁺(aq, 1 M) | Cu(s)\nCell reaction: H₂(g) + Cu²⁺(aq) → 2 H⁺(aq) + Cu(s)\nWhich of the following changes will DECREASE the EMF of the cell at 298 K?\n(A) Increasing the pressure of H₂(g) at the anode.\n(B) Increasing the concentration of H⁺(aq) in the anodic compartment.\n(C) Decreasing the concentration of Cu²⁺(aq) in the cathodic compartment.\n(D) Increasing the surface area of the Cu cathode.",
      option_a: "B, C",
      option_b: "A, B",
      option_c: "C, D",
      option_d: "A, D",
      correct_option: "A",
      explanation: "From the Nernst equation for the cell reaction:\nE_cell = E°_cell - (0.0591 / 2) log [ [H⁺]² / (P_H₂ · [Cu²⁺]) ]\n\nTo DECREASE the EMF (E_cell), the reaction quotient Q = [H⁺]² / (P_H₂ · [Cu²⁺]) must INCREASE:\n1. Increasing P_H₂ increases the denominator, which decreases Q and increases E_cell. (Does not decrease EMF)\n2. Increasing [H⁺] increases the numerator, which increases Q and decreases E_cell. (Statement B decreases EMF)\n3. Decreasing [Cu²⁺] decreases the denominator, which increases Q and decreases E_cell. (Statement C decreases EMF)\n4. Surface area of solid copper does not alter its activity (activity of pure solid = 1) and has no effect on EMF. (No effect)\nTherefore, changes (B) and (C) decrease the EMF of the cell.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3792,
    similarQuestion: {
      question: "For an electrode reaction involving a metal M:\nM³⁺(aq) + 3 e⁻ → M(s)\nA cell is set up with a standard hydrogen electrode (SHE):\nPt(s) | H₂(g, 1 bar) | H⁺(aq, 1 M) || M³⁺(aq, 0.001 M) | M(s)\nAt 298 K, the measured cell potential is E_cell = +0.281 V. What is the standard reduction potential E°(M³⁺ | M)? (Given: 2.303 RT / F = 0.059 V)",
      option_a: "+0.340 V",
      option_b: "+0.222 V",
      option_c: "-0.340 V",
      option_d: "+0.163 V",
      correct_option: "A",
      explanation: "The cell reaction is:\n(3/2) H₂(g) + M³⁺(aq) → 3 H⁺(aq) + M(s)\nNumber of electrons transferred n = 3.\n\nFrom the Nernst equation:\nE_cell = E°_cell - (0.059 / 3) log[ [H⁺]³ / (P_H₂^(3/2) · [M³⁺]) ]\n\nGiven standard conditions for hydrogen electrode:\n[H⁺] = 1 M and P_H₂ = 1 bar:\nE_cell = E°_cell - (0.059 / 3) log(1 / [M³⁺])\nE_cell = E°_cell + (0.059 / 3) log[M³⁺]\n\nGiven [M³⁺] = 0.001 M = 10⁻³ M:\nlog[M³⁺] = -3\nE_cell = E°_cell + (0.059 / 3) × (-3) = E°_cell - 0.059 V\n\nSince anode is SHE (E°_SHE = 0 V):\nE°_cell = E°(M³⁺ | M) - 0 = E°(M³⁺ | M)\n0.281 V = E°(M³⁺ | M) - 0.059 V\nE°(M³⁺ | M) = 0.281 + 0.059 = +0.340 V\nTherefore, Option (A) is the correct answer."
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
        console.log(`[SUCCESS] Updated Test 101 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 101 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
