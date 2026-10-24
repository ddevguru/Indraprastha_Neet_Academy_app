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
    id: 4610,
    similarQuestion: {
      question: "The theoretical maximum thermodynamic efficiency of an electrochemical fuel cell is defined by the expression:",
      option_a: "η = (ΔH / ΔG) × 100",
      option_b: "η = (ΔG / ΔH) × 100",
      option_c: "η = (T ΔS / ΔH) × 100",
      option_d: "η = (ΔH / T ΔS) × 100",
      correct_option: "B",
      explanation: "Thermodynamic efficiency of a fuel cell (η) is defined as the ratio of maximum useful electrical work output (-ΔG) to the total heat of combustion (-ΔH):\nη = (ΔG / ΔH) × 100%\n\nBecause a fuel cell directly converts chemical energy into electrical energy without an intermediate thermal Carnot cycle, it is not limited by Carnot's theorem and can achieve practical efficiencies around 60-70%.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4611,
    similarQuestion: {
      question: "Which of the following is/are examples of corrosion?\n(A) Rusting of iron forming hydrated ferric oxide Fe₂O₃·xH₂O\n(B) Tarnishing of silver jewelry forming black Ag₂S\n(C) Formation of a green patina of basic copper carbonate CuCO₃·Cu(OH)₂ on copper\n(D) All of the above",
      option_a: "A only",
      option_b: "A and B only",
      option_c: "A and C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Corrosion is the slow deterioration of metals caused by chemical or electrochemical reaction with environmental gases:\n1. Rusting of iron in moist air produces reddish-brown Fe₂O₃·xH₂O. (Example of corrosion)\n2. Silver reacts with atmospheric H₂S to produce a black tarnish of Ag₂S. (Example of corrosion)\n3. Copper and bronze react with atmospheric CO₂, O₂, and moisture to form a green coating of basic carbonate CuCO₃·Cu(OH)₂. (Example of corrosion)\nTherefore, all the listed phenomena are examples of corrosion.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4612,
    similarQuestion: {
      question: "For a galvanic cell with a standard cell potential of E°_cell = 0.591 V at 298 K involving a 2-electron transfer reaction (n = 2), the equilibrium constant (K_c) is approximately: (Given: 2.303 RT / F = 0.0591 V)",
      option_a: "1.0 × 10¹⁰",
      option_b: "1.0 × 10²⁰",
      option_c: "2.0 × 10²⁰",
      option_d: "1.0 × 10⁴⁰",
      correct_option: "B",
      explanation: "The relationship between standard cell EMF (E°_cell) and the equilibrium constant (K_c) at 298 K is:\nE°_cell = (0.0591 / n) log K_c\n\nRearranging for log K_c:\nlog K_c = (n × E°_cell) / 0.0591\n\nGiven:\nn = 2\nE°_cell = 0.591 V\n\nSubstitute the values:\nlog K_c = (2 × 0.591) / 0.0591 = 2 × 10 = 20\nK_c = 10²⁰ = 1.0 × 10²⁰\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4613,
    similarQuestion: {
      question: "What volume of hydrogen gas (H₂) at STP (molar volume = 22.4 L mol⁻¹) is liberated at the cathode when an electric current of 9.65 A is passed through dilute aqueous H₂SO₄ for 1000 seconds? (Given: 1 F = 96,500 C)",
      option_a: "2.24 L",
      option_b: "1.12 L",
      option_c: "0.56 L",
      option_d: "4.48 L",
      correct_option: "B",
      explanation: "1. Total charge passed:\nQ = I × t = 9.65 A × 1000 s = 9650 C\n\n2. Number of Faradays:\nFaradays = 9650 C / 96,500 C = 0.10 F\n\n3. Cathodic reduction of H⁺:\n2 H⁺(aq) + 2 e⁻ → H₂(g)\n2 Faradays of electricity liberate 1 mole of H₂ gas.\nTherefore, 0.10 Faraday liberates:\nMoles of H₂ = 0.10 / 2 = 0.05 mol\n\n4. Volume at STP:\nVolume = 0.05 mol × 22.4 L mol⁻¹ = 1.12 L\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4614,
    similarQuestion: {
      question: "For the electrochemical cell represented as:\nCu(s) | Cu²⁺(aq) || Ag⁺(aq) | Ag(s)\nWhich of the following statements is INCORRECT?",
      option_a: "Copper acts as the anode and is the negative terminal of the cell.",
      option_b: "Silver acts as the cathode and is the positive terminal of the cell.",
      option_c: "In the external circuit, conventional current flows from copper to silver.",
      option_d: "Electrons flow from the copper electrode to the silver electrode through the external wire.",
      correct_option: "C",
      explanation: "Let us analyze the galvanic cell:\n1. Copper has a lower reduction potential (+0.34 V) than silver (+0.80 V), so Cu undergoes oxidation at the anode (negative terminal): Cu → Cu²⁺ + 2 e⁻. (Statements A is correct)\n2. Silver ions undergo reduction at the cathode (positive terminal): Ag⁺ + e⁻ → Ag. (Statement B is correct)\n3. Electrons are released at the anode (Cu) and travel through the external wire to the cathode (Ag). (Statement D is correct)\n4. By scientific convention, electric current flows in the opposite direction to electron flow, i.e., from the cathode (Ag) to the anode (Cu) in the external circuit. Thus, statement (C) is INCORRECT.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4615,
    similarQuestion: {
      question: "During the electrolysis of an aqueous copper sulfate (CuSO₄) solution using active copper electrodes, which reaction occurs preferentially at the anode?",
      option_a: "Cu(s) → Cu²⁺(aq) + 2 e⁻",
      option_b: "2 H₂O(l) → O₂(g) + 4 H⁺(aq) + 4 e⁻",
      option_c: "2 SO₄²⁻(aq) → S₂O₈²⁻(aq) + 2 e⁻",
      option_d: "Cu²⁺(aq) + 2 e⁻ → Cu(s)",
      correct_option: "A",
      explanation: "When active copper electrodes are used in the electrolysis of aqueous CuSO₄:\n1. Oxidation potentials for possible anode reactions:\nCu(s) → Cu²⁺(aq) + 2 e⁻; E°_ox = -0.34 V\n2 H₂O(l) → O₂(g) + 4 H⁺ + 4 e⁻; E°_ox = -1.23 V\n2 SO₄²⁻(aq) → S₂O₈²⁻ + 2 e⁻; E°_ox = -2.01 V\n2. Since copper metal has a much higher oxidation potential (-0.34 V is far less negative than -1.23 V), the metallic copper of the anode dissolves directly into solution as Cu²⁺ ions.\n3. Water and sulfate ions are not oxidized.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4616,
    similarQuestion: {
      question: "For the redox reaction at 298 K:\nSn²⁺(aq) + 2 Fe³⁺(aq) → Sn⁴⁺(aq) + 2 Fe²⁺(aq)\nGiven standard reduction potentials:\nE°(Sn⁴⁺ | Sn²⁺) = +0.15 V\nE°(Fe³⁺ | Fe²⁺) = +0.77 V\nWhat is the standard cell potential (E°_cell) for this reaction?",
      option_a: "+0.62 V",
      option_b: "+0.92 V",
      option_c: "+0.47 V",
      option_d: "-0.62 V",
      correct_option: "A",
      explanation: "Let us identify the cathode and anode half-reactions:\n1. Reduction (at cathode):\n2 Fe³⁺(aq) + 2 e⁻ → 2 Fe²⁺(aq); E°_cathode = +0.77 V\n\n2. Oxidation (at anode):\nSn²⁺(aq) → Sn⁴⁺(aq) + 2 e⁻; E°_anode = +0.15 V\n\n3. Standard cell potential:\nE°_cell = E°_cathode - E°_anode\nE°_cell = +0.77 V - (+0.15 V) = +0.62 V\nSince E°_cell > 0, the reaction is spontaneous under standard conditions.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4617,
    similarQuestion: {
      question: "Consider the half-cell reaction at 298 K:\nCl₂(g, 1 bar) + 2 e⁻ → 2 Cl⁻(aq, 0.01 M)\nGiven the standard reduction potential E°(Cl₂ | Cl⁻) = +1.36 V. The electrode reduction potential (E) of this half-cell is: (Given: 2.303 RT / F = 0.059 V)",
      option_a: "+1.36 V",
      option_b: "+1.48 V",
      option_c: "+1.24 V",
      option_d: "+1.18 V",
      correct_option: "B",
      explanation: "From the Nernst equation for the reduction half-reaction:\nE = E° - (0.059 / n) log( [Cl⁻]² / P_Cl₂ )\n\nGiven:\nn = 2\nE° = +1.36 V\n[Cl⁻] = 0.01 M = 10⁻² M  ⇒  [Cl⁻]² = 10⁻⁴\nP_Cl₂ = 1 bar\n\nSubstitute the values:\nE = 1.36 - (0.059 / 2) log(10⁻⁴)\nE = 1.36 - (0.059 / 2) × (-4)\nE = 1.36 + (0.059 × 2) = 1.36 + 0.118 = +1.478 V ≈ +1.48 V\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4618,
    similarQuestion: {
      question: "The standard EMF of a galvanic cell is E°_cell = 1.20 V. If 2 moles of electrons are transferred per mole of reaction (n = 2), what is the standard Gibbs free energy change (ΔG°) for the cell reaction? (Given: 1 F = 96,500 C mol⁻¹)",
      option_a: "+231.6 kJ mol⁻¹",
      option_b: "-231.6 kJ mol⁻¹",
      option_c: "-115.8 kJ mol⁻¹",
      option_d: "+115.8 kJ mol⁻¹",
      correct_option: "B",
      explanation: "The relationship between standard Gibbs free energy change and standard cell EMF is:\nΔG° = -n F E°_cell\n\nGiven:\nn = 2\nF = 96,500 C mol⁻¹\nE°_cell = 1.20 V\n\nSubstitute the values:\nΔG° = -2 × 96,500 C mol⁻¹ × 1.20 V\nΔG° = -231,600 J mol⁻¹ = -231.6 kJ mol⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4619,
    similarQuestion: {
      question: "A weak monobasic acid has an ionization constant Kₐ = 1.6 × 10⁻⁵. At a concentration of C = 0.010 M, its molar conductivity is Λₘ = 15.2 S cm² mol⁻¹. What is its limiting molar conductivity at infinite dilution (Λ°ₘ) in S cm² mol⁻¹?",
      option_a: "190 S cm² mol⁻¹",
      option_b: "304 S cm² mol⁻¹",
      option_c: "380 S cm² mol⁻¹",
      option_d: "450 S cm² mol⁻¹",
      correct_option: "C",
      explanation: "From Ostwald's dilution law for a weak acid:\nα = √(Kₐ / C)\nα = √(1.6 × 10⁻⁵ / 0.010) = √(1.6 × 10⁻³) = √(16 × 10⁻⁴) = 4 × 10⁻² = 0.04\n\nThe degree of dissociation is related to molar conductivity by Arrhenius equation:\nα = Λₘ / Λ°ₘ\n\nRearranging for limiting molar conductivity (Λ°ₘ):\nΛ°ₘ = Λₘ / α\nΛ°ₘ = 15.2 / 0.04 = 380 S cm² mol⁻¹\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4620,
    similarQuestion: {
      question: "The limiting molar ionic conductivities at 298 K are:\nλ°(Al³⁺) = 189 S cm² mol⁻¹\nλ°(SO₄²⁻) = 160 S cm² mol⁻¹\nAccording to Kohlrausch's law of independent migration of ions, what is the limiting molar conductivity (Λ°ₘ) of aluminium sulphate, Al₂(SO₄)₃?",
      option_a: "349 S cm² mol⁻¹",
      option_b: "858 S cm² mol⁻¹",
      option_c: "698 S cm² mol⁻¹",
      option_d: "538 S cm² mol⁻¹",
      correct_option: "B",
      explanation: "According to Kohlrausch's law of independent migration of ions, the limiting molar conductivity of an electrolyte is the sum of the individual contributions of its constituent ions:\nAl₂(SO₄)₃(aq) → 2 Al³⁺(aq) + 3 SO₄²⁻(aq)\n\nTherefore:\nΛ°ₘ(Al₂(SO₄)₃) = 2 λ°(Al³⁺) + 3 λ°(SO₄²⁻)\n\nSubstitute the given values:\nΛ°ₘ = 2(189) + 3(160)\nΛ°ₘ = 378 + 480 = 858 S cm² mol⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4621,
    similarQuestion: {
      question: "Iron pipes are often protected from corrosion by galvanization (coating with zinc) or by tin plating (coating with tin). If the protective surface coating is scratched exposing the underlying iron to moisture and air:\nE°(Zn²⁺ | Zn) = -0.76 V\nE°(Fe²⁺ | Fe) = -0.44 V\nE°(Sn²⁺ | Sn) = -0.14 V\nWhat will happen to the exposed iron?",
      option_a: "Iron will corrode faster when coated with zinc than with tin.",
      option_b: "Iron will corrode faster when coated with tin because iron is more electropositive than tin and acts as the sacrificial anode.",
      option_c: "Iron is protected equally well in both cases even when the coating is broken.",
      option_d: "Neither metal can prevent corrosion once the surface is broken.",
      correct_option: "B",
      explanation: "1. For zinc coating: E°(Zn²⁺ | Zn) = -0.76 V is more negative than E°(Fe²⁺ | Fe) = -0.44 V. Zinc is more reactive (more electropositive) than iron. Even when the coating is broken, zinc corrodes preferentially as a sacrificial anode, continuously protecting the iron cathode.\n2. For tin coating: E°(Sn²⁺ | Sn) = -0.14 V is less negative than iron (-0.44 V). Tin is less electropositive (more noble) than iron. When the tin layer is breached, iron becomes the anode of the galvanic cell (Fe-Sn couple) and undergoes rapid, localized pitting corrosion faster than bare iron.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4622,
    similarQuestion: {
      question: "Given the standard reduction potentials:\nE°(Cl₂ | Cl⁻) = +1.36 V\nE°(Br₂ | Br⁻) = +1.09 V\nE°(I₂ | I⁻) = +0.54 V\nIf chlorine gas (Cl₂) is bubbled into an aqueous solution containing a mixture of 1.0 M KBr and 1.0 M KI, which of the following processes will occur spontaneously under standard conditions?",
      option_a: "Chloride ions will oxidize both bromide and iodide.",
      option_b: "Bromide ions will oxidize iodide ions to iodine.",
      option_c: "Chlorine will oxidize iodide (I⁻) and bromide (Br⁻) to I₂ and Br₂, respectively.",
      option_d: "Iodine will oxidize chloride ions to chlorine.",
      correct_option: "C",
      explanation: "A halogen with a higher standard reduction potential is a stronger oxidizing agent and can displace and oxidize halide ions having lower reduction potentials:\nE°(Cl₂ | Cl⁻) = +1.36 V\nE°(Br₂ | Br⁻) = +1.09 V\nE°(I₂ | I⁻) = +0.54 V\n\n1. For oxidation of I⁻ by Cl₂:\nCl₂ + 2 I⁻ → 2 Cl⁻ + I₂; E°_cell = 1.36 - 0.54 = +0.82 V > 0 (Spontaneous)\n\n2. For oxidation of Br⁻ by Cl₂:\nCl₂ + 2 Br⁻ → 2 Cl⁻ + Br₂; E°_cell = 1.36 - 1.09 = +0.27 V > 0 (Spontaneous)\n\nTherefore, Cl₂ spontaneously oxidizes both iodide and bromide ions.\nTherefore, Option (C) is the correct answer."
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
    console.log(`Test 101 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
