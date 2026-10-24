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
    id: 3764,
    similarQuestion: {
      question: "Which of the following statements regarding reaction order and molecularity is/are correct?\n(A) For an elementary reaction, the order with respect to each reactant equals its stoichiometric coefficient.\n(B) Molecularity of an elementary reaction can be zero, negative, or a fraction.\n(C) Order of a reaction is an experimentally determined quantity and can be zero or fractional.\n(D) A complex reaction does not have molecularity for the overall reaction.",
      option_a: "A, B, C",
      option_b: "A, C, D",
      option_c: "B, C, D",
      option_d: "A, D",
      correct_option: "B",
      explanation: "Let us analyze the statements:\n1. For an elementary reaction, the order with respect to each reacting species is equal to its stoichiometric coefficient in the balanced step. Thus, statement (A) is correct.\n2. Molecularity represents the number of reacting species colliding simultaneously, so it cannot be zero, negative, or fractional; it must be a positive integer (1, 2, or 3). Thus, statement (B) is incorrect.\n3. Order of a reaction is determined experimentally and can take values of zero, positive integer, or fractions. Thus, statement (C) is correct.\n4. Molecularity is defined only for individual elementary steps, not for a complex reaction as a whole. Thus, statement (D) is correct.\nHence, statements (A), (C), and (D) are correct.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3765,
    similarQuestion: {
      question: "For a reaction 2A + B → Products, when the concentration of B is doubled keeping [A] constant, the rate of reaction doubles. When the concentrations of both A and B are doubled, the rate increases by a factor of 8. The rate law for the reaction is:",
      option_a: "Rate = k[A][B]",
      option_b: "Rate = k[A][B]²",
      option_c: "Rate = k[A]²[B]",
      option_d: "Rate = k[A]²[B]²",
      correct_option: "C",
      explanation: "Let the rate law be:\nRate = k [A]ᵐ [B]ⁿ\n\n1. When [B] is doubled keeping [A] constant, rate doubles:\n2¹ = 2ⁿ  ⇒  n = 1 (first order with respect to B)\n\n2. When both [A] and [B] are doubled, rate increases by a factor of 8:\nRate' / Rate = 2ᵐ × 2ⁿ = 8\n2ᵐ × 2¹ = 8  ⇒  2ᵐ = 4 = 2²  ⇒  m = 2 (second order with respect to A)\n\nTherefore, the overall rate law is:\nRate = k [A]² [B]\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3766,
    similarQuestion: {
      question: "For a first order gaseous reaction A(g) → B(g) + C(g), the initial pressure of A is P₀ = 100 mm Hg. After 20 minutes, the total pressure of the gas mixture rises to 150 mm Hg. What is the rate constant (k) of the reaction? (Given: ln 2 ≈ 0.693)",
      option_a: "0.0347 min⁻¹",
      option_b: "0.0173 min⁻¹",
      option_c: "0.0693 min⁻¹",
      option_d: "0.0035 min⁻¹",
      correct_option: "A",
      explanation: "Consider the decomposition:\nA(g) → B(g) + C(g)\nAt t = 0: P₀ = 100 mm Hg, 0, 0\nAt time t: P₀ - x, x, x\n\nTotal pressure at time t:\nPₜ = (P₀ - x) + x + x = P₀ + x\nGiven Pₜ = 150 mm Hg at t = 20 min:\n100 + x = 150  ⇒  x = 50 mm Hg\n\nThe partial pressure of reactant A remaining is:\nP_A = P₀ - x = 100 - 50 = 50 mm Hg\n\nSince the concentration (or partial pressure) of A has reduced to half of its initial value (from 100 to 50 mm Hg) in 20 min:\nt₁/₂ = 20 min\n\nFor a first order reaction:\nk = 0.693 / t₁/₂ = 0.693 / 20 min = 0.03465 min⁻¹ ≈ 0.0347 min⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3767,
    similarQuestion: {
      question: "Which of the following statements is INCORRECT regarding a first order reaction?",
      option_a: "The half-life of the reaction is completely independent of the initial concentration of the reactant.",
      option_b: "A plot of ln[A] versus time (t) yields a straight line with slope equal to -k.",
      option_c: "The time required for 99.9% completion of the reaction is approximately equal to 5 times its half-life.",
      option_d: "The units of the rate constant are independent of concentration units and depend only on time⁻¹.",
      correct_option: "C",
      explanation: "Let us analyze each statement for a first order reaction:\n1. t₁/₂ = 0.693 / k, which is independent of initial concentration [A]₀. (Statement A is correct)\n2. The integrated rate equation is ln[A] = -k·t + ln[A]₀. A plot of ln[A] vs t gives a straight line with slope = -k and intercept = ln[A]₀. (Statement B is correct)\n3. For 99.9% completion:\n[A] = 0.001 [A]₀\nt₉₉.₉% = (2.303 / k) log(1 / 0.001) = (2.303 / k) × 3 ≈ 6.909 / k\nSince t₁/₂ = 0.693 / k:\nt₉₉.₉% ≈ 10 × t₁/₂ (not 5 times). (Statement C is INCORRECT)\n4. For a first order reaction, unit of k = (mol L⁻¹)¹⁻¹ s⁻¹ = s⁻¹ or time⁻¹, which is independent of concentration units. (Statement D is correct)\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3768,
    similarQuestion: {
      question: "Consider the following statements regarding the temperature dependence of reaction rates:\n(A) The rate constant increases with increase in temperature for both endothermic and exothermic reactions.\n(B) A catalyst decreases the activation energy by the same amount for both forward and reverse reactions.\n(C) The value of activation energy can never be zero or negative for any elementary chemical reaction.\n(D) Addition of a catalyst changes the enthalpy of reaction (ΔH).",
      option_a: "A, B, D",
      option_b: "B, C, D",
      option_c: "A, B, C",
      option_d: "C, D",
      correct_option: "C",
      explanation: "Let us evaluate the statements:\n1. According to Arrhenius equation k = A exp(-Eₐ / RT), as T increases, k increases for both endothermic and exothermic reactions. Thus, statement (A) is correct.\n2. A catalyst provides an alternate pathway with a lower activation energy, reducing Eₐ(forward) and Eₐ(reverse) by the exact same amount. Thus, statement (B) is correct.\n3. According to collision theory, reacting molecules must overcome an energy barrier; hence, Eₐ is positive and cannot be zero for an elementary reaction. Thus, statement (C) is correct.\n4. A catalyst does not alter the energies of the reactants or products; hence ΔH and ΔG remain completely unchanged. Thus, statement (D) is incorrect.\nTherefore, statements (A), (B), and (C) are correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3769,
    similarQuestion: {
      question: "Which of the following statements regarding the half-life (t₁/₂) of chemical reactions is/are correct?\n(A) For a zero order reaction, t₁/₂ is directly proportional to the initial concentration of reactant.\n(B) For a second order reaction with identical reactants, t₁/₂ is inversely proportional to the initial concentration.\n(C) For a first order reaction, doubling the initial concentration doubles the half-life.\n(D) For an nᵗʰ order reaction, the general proportionality is t₁/₂ ∝ [A]₀¹⁻ⁿ.",
      option_a: "A, B, D",
      option_b: "A, C, D",
      option_c: "B, C, D",
      option_d: "A, B, C",
      correct_option: "A",
      explanation: "For an nᵗʰ order reaction:\nt₁/₂ ∝ [A]₀¹⁻ⁿ\n\nLet us analyze each statement:\n1. For n = 0: t₁/₂ = [A]₀ / (2k) ∝ [A]₀. Hence, t₁/₂ is directly proportional to initial concentration. (Statement A is correct)\n2. For n = 2: t₁/₂ = 1 / (k [A]₀) ∝ 1 / [A]₀. Hence, t₁/₂ is inversely proportional to initial concentration. (Statement B is correct)\n3. For n = 1: t₁/₂ = 0.693 / k, which is independent of [A]₀. Doubling initial concentration does not change t₁/₂. (Statement C is incorrect)\n4. The general relationship between half-life and initial concentration is t₁/₂ ∝ [A]₀¹⁻ⁿ. (Statement D is correct)\nTherefore, statements (A), (B), and (D) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3770,
    similarQuestion: {
      question: "Identify the INCORRECT statement among the following regarding chemical kinetics:",
      option_a: "Activation energy of a simple chemical reaction decreases significantly with a decrease in temperature.",
      option_b: "The order of a complex reaction is determined by the slowest elementary step in the reaction mechanism.",
      option_c: "A catalyst speeds up the reaction rate by providing an alternate pathway of lower activation energy.",
      option_d: "The rate constant of a reaction is equal to the rate of reaction when the concentration of each reactant is unity.",
      correct_option: "A",
      explanation: "Let us analyze the options:\n1. In the Arrhenius formulation, activation energy (Eₐ) is considered a characteristic barrier of the reaction and is independent of temperature over normal temperature ranges. It does not decrease when temperature decreases. Hence, Option (A) is INCORRECT.\n2. In a multi-step (complex) reaction mechanism, the rate-determining step is the slowest step, and its rate law governs the overall reaction. (Correct)\n3. A catalyst provides an alternative reaction pathway involving a lower energy transition state, thereby reducing activation energy. (Correct)\n4. When all reactant concentrations are 1 mol L⁻¹, Rate = k [1]ⁿ = k (specific reaction rate). (Correct)\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3771,
    similarQuestion: {
      question: "Which of the following statements regarding rate constants and rate laws is/are FALSE?\n(A) The dimension of the rate constant (k) is identical for reactions of all orders.\n(B) A catalyst can never appear in the experimental rate law of a reaction.\n(C) Rate constant of a chemical reaction can never have a negative numerical value.\n(D) The order of a reaction can only be determined through experimental measurements, not from overall stoichiometry alone.",
      option_a: "A, B",
      option_b: "B, D",
      option_c: "A, C",
      option_d: "A, B, C",
      correct_option: "A",
      explanation: "Let us evaluate each statement:\n1. The dimension of rate constant k is (mol L⁻¹)¹⁻ⁿ s⁻¹, which directly depends on order n. Thus, statement (A) is FALSE.\n2. A catalyst frequently appears in experimental rate laws (for example, acid-catalysed hydrolysis: Rate = k [ester] [H⁺]). Thus, statement (B) is FALSE.\n3. The rate constant k is always positive and cannot be negative. Thus, statement (C) is TRUE.\n4. Order is strictly an experimental quantity and cannot be deduced purely from the balanced equation. Thus, statement (D) is TRUE.\nTherefore, statements (A) and (B) are false.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3772,
    similarQuestion: {
      question: "Two reactions 1 and 2 have identical Arrhenius pre-exponential factors (A₁ = A₂). The activation energy of reaction 1 exceeds that of reaction 2 by 12.47 kJ mol⁻¹ (Eₐ₁ - Eₐ₂ = 12.47 kJ mol⁻¹). At 300 K, the value of ln(k₂ / k₁) is equal to: (Given: R = 8.314 J K⁻¹ mol⁻¹)",
      option_a: "2.5",
      option_b: "5.0",
      option_c: "10.0",
      option_d: "1.25",
      correct_option: "B",
      explanation: "According to the Arrhenius equation:\nk₁ = A exp(-Eₐ₁ / RT)\nk₂ = A exp(-Eₐ₂ / RT)\n\nTaking the ratio:\nk₂ / k₁ = exp[(Eₐ₁ - Eₐ₂) / RT]\n\nTaking natural logarithm on both sides:\nln(k₂ / k₁) = (Eₐ₁ - Eₐ₂) / (RT)\n\nGiven:\nEₐ₁ - Eₐ₂ = 12.47 kJ mol⁻¹ = 12,470 J mol⁻¹\nT = 300 K\nR = 8.314 J K⁻¹ mol⁻¹\n\nSubstitute the values:\nln(k₂ / k₁) = 12470 / (8.314 × 300)\nln(k₂ / k₁) = 12470 / 2494.2 = 5.0\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3773,
    similarQuestion: {
      question: "The rate of a chemical reaction doubles when the temperature is raised from 300 K to 310 K. The activation energy (Eₐ) of the reaction is approximately: (Given: R = 8.314 J K⁻¹ mol⁻¹, ln 2 = 0.693)",
      option_a: "53.6 kJ mol⁻¹",
      option_b: "107.2 kJ mol⁻¹",
      option_c: "26.8 kJ mol⁻¹",
      option_d: "75.4 kJ mol⁻¹",
      correct_option: "A",
      explanation: "From the Arrhenius equation:\nln(k₂ / k₁) = (Eₐ / R) × [(T₂ - T₁) / (T₁ × T₂)]\n\nGiven:\nk₂ / k₁ = 2  ⇒  ln(k₂ / k₁) = ln 2 = 0.693\nT₁ = 300 K, T₂ = 310 K\nΔT = 310 - 300 = 10 K\nT₁ × T₂ = 300 × 310 = 93,000 K²\nR = 8.314 J K⁻¹ mol⁻¹\n\nSubstitute into the formula:\n0.693 = (Eₐ / 8.314) × (10 / 93000)\nEₐ = (0.693 × 8.314 × 93000) / 10\nEₐ = 53,582 J mol⁻¹ ≈ 53.6 kJ mol⁻¹\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3774,
    similarQuestion: {
      question: "The rate of reaction 1 doubles when temperature increases from 300 K to 310 K. If reaction 2 has an activation energy that is 3 times the activation energy of reaction 1 (Eₐ₂ = 3 Eₐ₁), by approximately how many Kelvins must the temperature of reaction 2 be increased from 300 K to double its rate?",
      option_a: "9.8 K",
      option_b: "3.3 K",
      option_c: "6.6 K",
      option_d: "1.5 K",
      correct_option: "B",
      explanation: "For doubling of reaction rate:\nln(k₂ / k₁) = ln 2 = (Eₐ / R) × (ΔT / (T₁ · T₂))\n\nFor moderate temperature increases near 300 K, T₁ · T₂ ≈ (300)² is nearly constant.\nTherefore:\nEₐ · ΔT ≈ constant\n\nFor reaction 1:\nEₐ₁ × ΔT₁ = Eₐ₁ × 10 K\n\nFor reaction 2:\nEₐ₂ × ΔT₂ = (3 Eₐ₁) × ΔT₂\n\nEquating both expressions:\n3 Eₐ₁ × ΔT₂ = Eₐ₁ × 10\nΔT₂ = 10 / 3 ≈ 3.3 K\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3775,
    similarQuestion: {
      question: "For the thermal decomposition of a gaseous reactant, the initial pressure is 400 Torr. The rate of reaction was measured to be 1.60 Torr s⁻¹ when 10% of the reactant had reacted, and 0.40 Torr s⁻¹ when 55% had reacted. The order of the reaction with respect to the gaseous reactant is:",
      option_a: "0",
      option_b: "1",
      option_c: "2",
      option_d: "3",
      correct_option: "C",
      explanation: "Let the rate law be:\nRate = k (P)ⁿ\n\nGiven initial pressure P₀ = 400 Torr:\n1. When 10% has reacted, fraction remaining is 90%:\nP₁ = 0.90 × 400 = 360 Torr\nRate r₁ = 1.60 Torr s⁻¹\n\n2. When 55% has reacted, fraction remaining is 45%:\nP₂ = 0.45 × 400 = 180 Torr\nRate r₂ = 0.40 Torr s⁻¹\n\nTaking the ratio of the rates:\nr₁ / r₂ = (P₁ / P₂)ⁿ\n1.60 / 0.40 = (360 / 180)ⁿ\n4 = 2ⁿ\n2² = 2ⁿ  ⇒  n = 2\n\nTherefore, the order of the reaction is 2.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3776,
    similarQuestion: {
      question: "Which of the following graphical plots is/are linear?\n(A) A plot of ln[A] versus time (t) for a first-order reaction A → Products.\n(B) A plot of 1/[A] versus time (t) for a second-order reaction 2A → Products.\n(C) A plot of ln k versus 1/T according to the Arrhenius equation.\n(D) A plot of [A] versus time (t) for a second-order reaction.",
      option_a: "A, B, C",
      option_b: "A, C, D",
      option_c: "B, C, D",
      option_d: "A, B, D",
      correct_option: "A",
      explanation: "Let us check the integrated rate laws and equations:\n1. First order: ln[A] = -k·t + ln[A]₀. A plot of ln[A] vs t is linear with slope -k. (Statement A is linear)\n2. Second order: 1/[A] = k·t + 1/[A]₀. A plot of 1/[A] vs t is linear with slope +k. (Statement B is linear)\n3. Arrhenius equation: ln k = ln A - (Eₐ / R)·(1/T). A plot of ln k vs 1/T is linear with slope -Eₐ / R. (Statement C is linear)\n4. For a second order reaction, [A] decreases hyperbolically with time, so [A] vs t is curved, not linear. (Statement D is non-linear)\nTherefore, plots (A), (B), and (C) are linear.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3777,
    similarQuestion: {
      question: "In Arrhenius plots of ln k versus 1/T for two reactions X and Y, both lines intersect the y-axis at the same point, but line X has a steeper negative slope than line Y. Which of the following conclusions is correct?",
      option_a: "Reaction X has a higher activation energy than reaction Y.",
      option_b: "Reaction Y has a higher activation energy than reaction X.",
      option_c: "Both reactions have identical activation energy.",
      option_d: "Reaction X has a higher pre-exponential factor than reaction Y.",
      correct_option: "A",
      explanation: "According to the Arrhenius equation:\nln k = ln A - (Eₐ / R) × (1 / T)\n\nA plot of ln k versus 1/T is a straight line where:\nSlope = -Eₐ / R\ny-intercept = ln A\n\n1. Since both lines have the same y-intercept, both reactions have the same pre-exponential factor A.\n2. The magnitude of the slope is |slope| = Eₐ / R.\nA steeper negative slope means a larger value of Eₐ / R, which corresponds to a higher activation energy Eₐ.\nTherefore, reaction X has a higher activation energy than reaction Y.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3778,
    similarQuestion: {
      question: "According to the collision theory of bimolecular reactions, the rate constant is given by k = P · Z_AB · exp(-Eₐ / RT), where P is the steric factor and Z_AB is collision frequency. If for a particular reaction, the steric factor P is found to be greater than 1 (P > 1), which of the following statements is/are correct?\n(A) The experimentally determined pre-exponential factor A is greater than the theoretical collision frequency Z_AB.\n(B) The activation energy of the reaction is independent of the value of the steric factor P.\n(C) The reaction cannot occur at all because P must always be less than 1.\n(D) Collisions are accompanied by an increase in entropy of activation.",
      option_a: "A, B, D",
      option_b: "A, C",
      option_c: "B, C",
      option_d: "A, B",
      correct_option: "A",
      explanation: "Let us analyze the statements:\n1. In collision theory, A_exp = P · Z_AB. If P > 1, then A_exp > Z_AB (the experimental frequency factor is higher than simple collision frequency). This often happens when rotational/vibrational energy contributes to breaking bonds (positive entropy of activation ΔS‡ > 0). Thus, statements (A) and (D) are correct.\n2. The activation energy Eₐ represents the minimum energy requirement for bonds to break and form, and is independent of the spatial orientation factor P. Thus, statement (B) is correct.\n3. Values of P > 1 do occur in complex reactions or reactions involving long-range dipole-dipole interactions, so statement (C) is incorrect.\nTherefore, statements (A), (B), and (D) are correct.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Test 100 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
