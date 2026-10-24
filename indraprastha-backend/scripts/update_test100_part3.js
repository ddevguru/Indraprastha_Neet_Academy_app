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
    id: 4629,
    similarQuestion: {
      question: "For the reaction:\n2 N₂O₅(g) → 4 NO₂(g) + O₂(g)\nIf the rate of disappearance of N₂O₅ is 2.4 × 10⁻³ mol L⁻¹ s⁻¹, what is the rate of formation of NO₂?",
      option_a: "1.2 × 10⁻³ mol L⁻¹ s⁻¹",
      option_b: "2.4 × 10⁻³ mol L⁻¹ s⁻¹",
      option_c: "4.8 × 10⁻³ mol L⁻¹ s⁻¹",
      option_d: "9.6 × 10⁻³ mol L⁻¹ s⁻¹",
      correct_option: "C",
      explanation: "From the stoichiometry of the reaction:\nRate of reaction = -(1/2) d[N₂O₅]/dt = (1/4) d[NO₂]/dt = d[O₂]/dt\n\nGiven the rate of disappearance of N₂O₅:\n-d[N₂O₅]/dt = 2.4 × 10⁻³ mol L⁻¹ s⁻¹\n\nTherefore, the rate of formation of NO₂ is:\nd[NO₂]/dt = 4 × (1/2) × (-d[N₂O₅]/dt) = 2 × (2.4 × 10⁻³) = 4.8 × 10⁻³ mol L⁻¹ s⁻¹\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4630,
    similarQuestion: {
      question: "The decomposition of a substance follows the reaction:\n2 A → 3 B + C\nInitially, the concentration of A is 2.80 mol L⁻¹, and after 2 hours (120 minutes), its concentration decreases to 1.20 mol L⁻¹. What is the average rate of appearance of C over this time interval?",
      option_a: "0.80 mol L⁻¹ h⁻¹",
      option_b: "0.40 mol L⁻¹ h⁻¹",
      option_c: "1.20 mol L⁻¹ h⁻¹",
      option_d: "0.20 mol L⁻¹ h⁻¹",
      correct_option: "B",
      explanation: "Decrease in concentration of A:\n-Δ[A] = 2.80 - 1.20 = 1.60 mol L⁻¹\nTime interval Δt = 2 h\n\nRate of disappearance of A:\n-Δ[A] / Δt = 1.60 / 2 = 0.80 mol L⁻¹ h⁻¹\n\nFrom the stoichiometric coefficients:\nRate = -(1/2) Δ[A]/Δt = Δ[C]/Δt\n\nTherefore, rate of appearance of C:\nΔ[C] / Δt = (1/2) × 0.80 = 0.40 mol L⁻¹ h⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4631,
    similarQuestion: {
      question: "For a gaseous reaction:\n3 A → 2 B + 2 C\nThe concentration of B increases by 6.0 × 10⁻³ mol L⁻¹ in 20 seconds. The rate of appearance of B and the overall rate of reaction are, respectively:",
      option_a: "1.5 × 10⁻⁴ mol L⁻¹ s⁻¹ and 3.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_b: "3.0 × 10⁻⁴ mol L⁻¹ s⁻¹ and 1.5 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_c: "3.0 × 10⁻⁴ mol L⁻¹ s⁻¹ and 6.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      option_d: "1.0 × 10⁻⁴ mol L⁻¹ s⁻¹ and 3.0 × 10⁻⁴ mol L⁻¹ s⁻¹",
      correct_option: "B",
      explanation: "1. Rate of appearance of B:\nΔ[B] / Δt = (6.0 × 10⁻³) / 20 = 3.0 × 10⁻⁴ mol L⁻¹ s⁻¹\n\n2. The overall rate of reaction is related to B by:\nRate = (1/2) × (Δ[B] / Δt) = (1/2) × (3.0 × 10⁻⁴) = 1.5 × 10⁻⁴ mol L⁻¹ s⁻¹\n\nThus, rate of appearance of B is 3.0 × 10⁻⁴ mol L⁻¹ s⁻¹ and overall rate is 1.5 × 10⁻⁴ mol L⁻¹ s⁻¹.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4632,
    similarQuestion: {
      question: "For the gas-phase decomposition A(g) → B(g) + C(g), the initial pressure of pure A is 100 mm Hg. After 25 seconds, the total pressure of the reaction mixture becomes 125 mm Hg. What is the average rate of reaction in mm Hg s⁻¹?",
      option_a: "1.0 mm Hg s⁻¹",
      option_b: "2.0 mm Hg s⁻¹",
      option_c: "0.5 mm Hg s⁻¹",
      option_d: "5.0 mm Hg s⁻¹",
      correct_option: "A",
      explanation: "For the reaction:\nA(g) → B(g) + C(g)\nAt t = 0: 100 mm Hg, 0, 0\nAt time t: 100 - x, x, x\n\nTotal pressure Pₜ = (100 - x) + x + x = 100 + x\nGiven Pₜ = 125 mm Hg at t = 25 s:\n100 + x = 125  ⇒  x = 25 mm Hg\n\nThe extent of reaction in pressure units is x = 25 mm Hg.\nAverage rate of reaction = x / Δt = 25 mm Hg / 25 s = 1.0 mm Hg s⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4633,
    similarQuestion: {
      question: "Which of the following statements regarding heterogeneous catalytic decomposition reactions on metal surfaces is/are correct?\n(A) The decomposition of NH₃ on a tungsten or platinum surface is zero order at high gas pressure.\n(B) The decomposition of NH₃ on a metal surface becomes first order at very low gas pressure.\n(C) The thermal decomposition of gaseous HI on a gold (Au) surface is an example of a zero-order reaction.\n(D) All of the above statements are correct.",
      option_a: "A only",
      option_b: "B only",
      option_c: "C only",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Let us review heterogeneous surface catalysis:\n1. At high pressure of ammonia, the catalytic metal surface becomes completely saturated with adsorbed molecules (coverage θ ≈ 1). The rate of reaction becomes independent of pressure: Rate = k (zero order). Statement (A) is correct.\n2. At very low pressure, the surface coverage is directly proportional to pressure (θ ∝ P), making the reaction first order. Statement (B) is correct.\n3. The thermal decomposition of HI on a gold surface is a classic textbook example of a zero-order reaction. Statement (C) is correct.\nTherefore, all statements are correct.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4634,
    similarQuestion: {
      question: "The rate constant of a first-order reaction increases by a factor of 4 when the temperature is raised from 300 K to 320 K. The activation energy (Eₐ) for the reaction is approximately: (Given: ln 4 ≈ 1.386, R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "55.3 kJ mol⁻¹",
      option_b: "27.6 kJ mol⁻¹",
      option_c: "110.6 kJ mol⁻¹",
      option_d: "42.5 kJ mol⁻¹",
      correct_option: "A",
      explanation: "Using the Arrhenius equation:\nln(k₂ / k₁) = (Eₐ / R) × [(T₂ - T₁) / (T₁ × T₂)]\n\nGiven:\nk₂ / k₁ = 4  ⇒  ln 4 = 1.386\nT₁ = 300 K, T₂ = 320 K\nΔT = 320 - 300 = 20 K\nT₁ × T₂ = 300 × 320 = 96,000 K²\nR = 8.314 J K⁻¹ mol⁻¹\n\nSubstitute the values:\n1.386 = (Eₐ / 8.314) × (20 / 96000)\n1.386 = (Eₐ / 8.314) × (1 / 4800)\nEₐ = 1.386 × 8.314 × 4800 = 55,311 J mol⁻¹ ≈ 55.3 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4635,
    similarQuestion: {
      question: "For a reaction 2 A + B → C, the rate law is given by Rate = k [A]² [B]. If the rate constant k = 3.0 × 10⁻⁴ L² mol⁻² s⁻¹, calculate the initial rate of the reaction when [A] = 0.10 mol L⁻¹ and [B] = 0.20 mol L⁻¹.",
      option_a: "3.0 × 10⁻⁶ mol L⁻¹ s⁻¹",
      option_b: "6.0 × 10⁻⁷ mol L⁻¹ s⁻¹",
      option_c: "1.2 × 10⁻⁶ mol L⁻¹ s⁻¹",
      option_d: "6.0 × 10⁻⁸ mol L⁻¹ s⁻¹",
      correct_option: "B",
      explanation: "Given the rate law:\nRate = k [A]² [B]\n\nGiven values:\nk = 3.0 × 10⁻⁴ L² mol⁻² s⁻¹\n[A] = 0.10 mol L⁻¹\n[B] = 0.20 mol L⁻¹\n\nSubstitute into the rate law:\nRate = (3.0 × 10⁻⁴) × (0.10)² × (0.20)\nRate = (3.0 × 10⁻⁴) × (0.01) × (0.20)\nRate = 6.0 × 10⁻⁷ mol L⁻¹ s⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4636,
    similarQuestion: {
      question: "The half-life of a first-order reaction is 30 minutes. What percentage of the original reactant will react in 90 minutes?",
      option_a: "25.0%",
      option_b: "50.0%",
      option_c: "87.5%",
      option_d: "75.0%",
      correct_option: "C",
      explanation: "Given:\nHalf-life t₁/₂ = 30 minutes\nTotal time elapsed t = 90 minutes\n\nNumber of half-lives elapsed (n):\nn = t / t₁/₂ = 90 / 30 = 3\n\nFraction of reactant remaining after n half-lives:\n[A] / [A]₀ = (1/2)ⁿ = (1/2)³ = 1/8 = 0.125 = 12.5%\n\nTherefore, percentage of reactant reacted is:\nPercentage reacted = 100% - 12.5% = 87.5%\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4637,
    similarQuestion: {
      question: "A first-order reaction has a rate constant k = 4.606 × 10⁻² min⁻¹. If the initial concentration of the reactant is 0.80 mol L⁻¹, how much time will it take for the concentration to decrease to 0.08 mol L⁻¹? (Given: log 10 = 1)",
      option_a: "25 min",
      option_b: "100 min",
      option_c: "50 min",
      option_d: "75 min",
      correct_option: "C",
      explanation: "For a first-order reaction:\nt = (2.303 / k) log([A]₀ / [A])\n\nGiven:\n[A]₀ = 0.80 mol L⁻¹\n[A] = 0.08 mol L⁻¹\nk = 4.606 × 10⁻² min⁻¹\n\nSubstitute the values:\n[A]₀ / [A] = 0.80 / 0.08 = 10\nt = (2.303 / 0.04606) × log(10)\nt = 50 × 1 = 50 min\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4638,
    similarQuestion: {
      question: "For the reaction:\n2 N₂O₅ → 4 NO₂ + O₂\nThe concentration of N₂O₅ decreases from 0.60 mol L⁻¹ to 0.40 mol L⁻¹ in 20 minutes. The average rate of the reaction during this period is:",
      option_a: "0.005 mol L⁻¹ min⁻¹",
      option_b: "0.010 mol L⁻¹ min⁻¹",
      option_c: "0.020 mol L⁻¹ min⁻¹",
      option_d: "0.002 mol L⁻¹ min⁻¹",
      correct_option: "A",
      explanation: "Rate of reaction is defined as:\nRate = -(1/2) (Δ[N₂O₅] / Δt)\n\nGiven:\nΔ[N₂O₅] = [N₂O₅]_final - [N₂O₅]_initial = 0.40 - 0.60 = -0.20 mol L⁻¹\nΔt = 20 min\n\nSubstitute into the rate expression:\nRate = -(1/2) × (-0.20 / 20) = (1/2) × 0.010 = 0.005 mol L⁻¹ min⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4639,
    similarQuestion: {
      question: "For a first-order chemical reaction, the half-life periods at 300 K and 320 K are 600 seconds and 150 seconds, respectively. The activation energy (Eₐ) for this reaction is: (Given: ln 4 ≈ 1.386, R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "27.65 kJ mol⁻¹",
      option_b: "55.31 kJ mol⁻¹",
      option_c: "110.62 kJ mol⁻¹",
      option_d: "82.97 kJ mol⁻¹",
      correct_option: "B",
      explanation: "For a first-order reaction:\nk = 0.693 / t₁/₂\n\nRatio of rate constants:\nk₂ / k₁ = (t₁/₂)₁ / (t₁/₂)₂ = 600 / 150 = 4\n\nFrom the Arrhenius equation:\nln(k₂ / k₁) = (Eₐ / R) × [(T₂ - T₁) / (T₁ × T₂)]\nln 4 = 1.386\n1.386 = (Eₐ / 8.314) × [20 / (300 × 320)]\n1.386 = (Eₐ / 8.314) × (20 / 96000)\nEₐ = (1.386 × 8.314 × 96000) / 20\nEₐ = 55,311 J mol⁻¹ ≈ 55.31 kJ mol⁻¹\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4640,
    similarQuestion: {
      question: "For the reaction 2 X + Y → Z, initial rates were measured at various concentrations:\nExperiment 1: [X] = 0.20 M, [Y] = 0.10 M, Initial Rate = 2.0 × 10⁻⁴ M s⁻¹\nExperiment 2: [X] = 0.20 M, [Y] = 0.20 M, Initial Rate = 4.0 × 10⁻⁴ M s⁻¹\nExperiment 3: [X] = 0.40 M, [Y] = 0.10 M, Initial Rate = 2.0 × 10⁻⁴ M s⁻¹\nWhat is the correct rate law for the reaction?",
      option_a: "Rate = k [Y]",
      option_b: "Rate = k [X][Y]",
      option_c: "Rate = k [X]²[Y]",
      option_d: "Rate = k [X]",
      correct_option: "A",
      explanation: "Let the rate law be Rate = k [X]ᵃ [Y]ᵇ.\n\n1. Comparing Exp 1 and Exp 3 (where [Y] is kept constant at 0.10 M):\n[X] doubles from 0.20 M to 0.40 M, but Rate remains 2.0 × 10⁻⁴ M s⁻¹.\n(2)ᵃ = 1 = 2⁰  ⇒  a = 0 (zero order with respect to X)\n\n2. Comparing Exp 1 and Exp 2 (where [X] is kept constant at 0.20 M):\n[Y] doubles from 0.10 M to 0.20 M, and Rate doubles from 2.0 × 10⁻⁴ to 4.0 × 10⁻⁴ M s⁻¹.\n(2)ᵇ = 2¹  ⇒  b = 1 (first order with respect to Y)\n\nTherefore, the rate law is:\nRate = k [X]⁰ [Y]¹ = k [Y]\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4641,
    similarQuestion: {
      question: "The half-life period (t₁/₂) of a reaction at different initial concentrations [A]₀ was observed as follows:\n[A]₀ = 0.10 M, t₁/₂ = 400 s\n[A]₀ = 0.20 M, t₁/₂ = 200 s\n[A]₀ = 0.40 M, t₁/₂ = 100 s\nThe order of the reaction is:",
      option_a: "2",
      option_b: "1",
      option_c: "0",
      option_d: "3",
      correct_option: "A",
      explanation: "For an nᵗʰ order reaction, the dependence of half-life on initial concentration is:\nt₁/₂ ∝ [A]₀¹⁻ⁿ\n\nNotice from the data:\n(0.10 M) × (400 s) = 40 M·s\n(0.20 M) × (200 s) = 40 M·s\n(0.40 M) × (100 s) = 40 M·s\n\nSince [A]₀ · t₁/₂ = constant:\nt₁/₂ ∝ 1 / [A]₀ = [A]₀⁻¹\n\nEquating exponents:\n1 - n = -1  ⇒  n = 2\n\nTherefore, the reaction is of second order.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4642,
    similarQuestion: {
      question: "The activation energy of a chemical reaction is Eₐ = 57.4 kJ mol⁻¹ at 300 K. According to the Boltzmann distribution, what fraction of molecules has kinetic energy equal to or greater than the activation energy? (Given: 2.303 × R × 300 = 5742 J mol⁻¹, antilog(-10) = 1.0 × 10⁻¹⁰)",
      option_a: "1.0 × 10⁻¹⁰",
      option_b: "2.0 × 10⁻⁸",
      option_c: "5.0 × 10⁻¹²",
      option_d: "1.0 × 10⁻¹⁴",
      correct_option: "A",
      explanation: "According to the Arrhenius collision theory, the fraction of molecules having energy equal to or greater than activation energy (Eₐ) is given by:\nf = exp(-Eₐ / RT) = 10^(-Eₐ / (2.303 RT))\n\nGiven:\nEₐ = 57.4 kJ mol⁻¹ = 57,400 J mol⁻¹\n2.303 × R × T = 5,742 J mol⁻¹\n\nExponent:\n-Eₐ / (2.303 RT) = -57,400 / 5,742 ≈ -10\n\nTherefore:\nf = 10⁻¹⁰ = 1.0 × 10⁻¹⁰\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4643,
    similarQuestion: {
      question: "Which of the following statements about a catalyst is FALSE?",
      option_a: "A catalyst does not change the standard Gibbs free energy change (ΔG°) of a reaction.",
      option_b: "A catalyst can make a thermodynamically non-spontaneous reaction (ΔG > 0) spontaneous.",
      option_c: "A catalyst accelerates both forward and backward reactions equally without changing the equilibrium constant (K_eq).",
      option_d: "A catalyst lowers the activation energy by providing an alternative reaction pathway.",
      correct_option: "B",
      explanation: "Let us analyze each statement:\n1. A catalyst cannot alter thermodynamic state functions such as ΔG°, ΔH°, and ΔS° because reactants and products remain unchanged. (True)\n2. A catalyst only increases the rate of thermodynamically feasible (spontaneous) reactions by reducing activation energy; it cannot initiate or drive a non-spontaneous reaction (where ΔG > 0). Hence, statement (B) is FALSE.\n3. Since a catalyst decreases the activation energy of both forward and reverse reactions equally, it accelerates both rates by the same factor, leaving K_eq completely unchanged. (True)\n4. A catalyst provides an alternate pathway with lower activation energy. (True)\nTherefore, Option (B) is the correct answer."
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
        console.log(`[SUCCESS] Updated Test 100 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 100 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
