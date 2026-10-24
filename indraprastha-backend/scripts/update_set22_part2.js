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
    id: 3962,
    question: "A sample of 2.8 g of N₂ gas at STP occupies an initial volume of 2.24 L. The gas is transferred into another closed vessel at the same temperature, where its pressure decreases to one-half of its original value. What is the volume of the new vessel?",
    option_a: "4.48 L",
    option_b: "1.12 L",
    option_c: "2.24 L",
    option_d: "8.96 L",
    correct_option: "A",
    explanation: "1. Since temperature and the quantity of gas remain constant, Boyle's Law applies: P₁ V₁ = P₂ V₂.\n2. Given: V₁ = 2.24 L, P₂ = 1/2 P₁ ⇒ P₁ / P₂ = 2.\n3. Solving for the new volume V₂: V₂ = (P₁ / P₂) × V₁ = 2 × 2.24 L = 4.48 L.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3963,
    question: "In which of the following thermodynamic processes undergone by an ideal gas between the same initial state (P₁, V₁) and final volume (V₂ > V₁) is the maximum amount of expansion work done by the gas?",
    option_a: "Isobaric expansion",
    option_b: "Isothermal expansion",
    option_c: "Adiabatic expansion",
    option_d: "Isochoric process",
    correct_option: "A",
    explanation: "1. The magnitude of work done by an expanding gas is represented by the area under the curve in a P-V indicator diagram: w = ∫ P dV.\n2. For an expansion from V₁ to V₂:\n   - In an isobaric process, pressure remains at the maximum initial value P₁ throughout the expansion; hence the area under the horizontal isobaric line is the largest.\n   - In isothermal expansion, pressure drops along a hyperbola (P ∝ 1/V).\n   - In adiabatic expansion, pressure drops even more steeply (P ∝ 1/V^γ).\n   - In an isochoric process, work done is zero (dV = 0).\n3. Therefore, isobaric expansion yields the maximum work done.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3964,
    question: "What is Mayer's relation connecting the molar heat capacity at constant pressure (C_p,m) and at constant volume (C_v,m) for one mole of an ideal gas?",
    option_a: "C_p,m - C_v,m = R",
    option_b: "C_v,m - C_p,m = R",
    option_c: "C_p,m + C_v,m = R",
    option_d: "C_p,m / C_v,m = R",
    correct_option: "A",
    explanation: "1. By definition, enthalpy is H = U + PV = U + RT (for 1 mole of an ideal gas).\n2. Differentiating with respect to temperature T: dH/dT = dU/dT + R.\n3. Since C_p,m = (dH/dT)_p and C_v,m = (dU/dT)_v: C_p,m = C_v,m + R  ⇒  C_p,m - C_v,m = R.\n4. This fundamental equation is known as Mayer's relation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3965,
    question: "For the irreversible expansion of an ideal gas under isothermal conditions, which of the following statements is strictly correct?",
    option_a: "ΔU = 0 and ΔS_total > 0",
    option_b: "ΔU > 0 and ΔS_total = 0",
    option_c: "ΔU < 0 and ΔS_total < 0",
    option_d: "ΔU = 0 and ΔS_total = 0",
    correct_option: "A",
    explanation: "1. For an ideal gas, internal energy depends only on temperature. Since the process is isothermal (ΔT = 0), ΔU = 0.\n2. For any spontaneous, irreversible process occurring in the universe, the total entropy change (Second Law of Thermodynamics) must be strictly positive: ΔS_total = ΔS_system + ΔS_surroundings > 0.\n3. Therefore, ΔU = 0 and ΔS_total > 0.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3966,
    question: "For the free expansion of an ideal gas into a vacuum under adiabatic conditions, which set of thermodynamic parameters is correct?",
    option_a: "q = 0, w = 0, and ΔT = 0",
    option_b: "q = 0, w > 0, and ΔT < 0",
    option_c: "q > 0, w = 0, and ΔT > 0",
    option_d: "q < 0, w < 0, and ΔT = 0",
    correct_option: "A",
    explanation: "1. Free expansion occurs into a vacuum (P_ext = 0), so work done w = -P_ext ΔV = 0.\n2. The process is adiabatic, so no heat enters or leaves the system: q = 0.\n3. By the First Law of Thermodynamics: ΔU = q + w = 0 + 0 = 0.\n4. For an ideal gas, ΔU = n C_v ΔT. Since ΔU = 0, it follows that ΔT = 0 (no change in temperature).\n5. Hence, q = 0, w = 0, and ΔT = 0.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3967,
    question: "An endothermic reaction has a standard enthalpy change of ΔH = +40.0 kJ at 400 K. What is the minimum value of entropy change (ΔS) required for the reaction to be spontaneous at this temperature?",
    option_a: "Greater than +100 J/K",
    option_b: "Less than +100 J/K",
    option_c: "Exactly zero",
    option_d: "Negative",
    correct_option: "A",
    explanation: "1. A reaction is spontaneous when Gibbs free energy change is negative: ΔG = ΔH - T ΔS < 0.\n2. Rearranging gives: T ΔS > ΔH  ⇒  ΔS > ΔH / T.\n3. Substituting the given values: ΔS > (+40,000 J) / (400 K) = +100 J/K.\n4. Hence, for spontaneity at 400 K, ΔS must be greater than +100 J/K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3968,
    question: "For the gaseous reaction: H₂(g) + I₂(g) → 2 HI(g), the enthalpy of the reaction is ΔH = -11.0 kJ. If the bond dissociation enthalpies of H₂ and I₂ are 436.0 kJ/mol and 151.0 kJ/mol respectively, what is the bond dissociation enthalpy of H-I?",
    option_a: "299.0 kJ/mol",
    option_b: "598.0 kJ/mol",
    option_c: "149.5 kJ/mol",
    option_d: "436.0 kJ/mol",
    correct_option: "A",
    explanation: "1. The enthalpy of reaction from bond enthalpies is: ΔH = B.E.(H-H) + B.E.(I-I) - 2 × B.E.(H-I).\n2. Substitute the known values: -11.0 = 436.0 + 151.0 - 2 × B.E.(H-I) ⇒ -11.0 = 587.0 - 2 × B.E.(H-I).\n3. Rearranging for 2 × B.E.(H-I): 2 × B.E.(H-I) = 587.0 + 11.0 = 598.0 kJ ⇒ B.E.(H-I) = 598.0 / 2 = 299.0 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3969,
    question: "An ideal gas at 300 K expands from an initial volume of 0.20 L to 0.50 L against a constant external pressure of 3.0 bar. What is the work done (w) on the gas? (1 L·bar = 100 J)",
    option_a: "-90 J",
    option_b: "+90 J",
    option_c: "-45 J",
    option_d: "+45 J",
    correct_option: "A",
    explanation: "1. Work done in an irreversible expansion against a constant external pressure P_ext is: w = -P_ext × ΔV.\n2. Here: P_ext = 3.0 bar, ΔV = V₂ - V₁ = 0.50 L - 0.20 L = 0.30 L.\n3. Calculate work in L·bar: w = -(3.0 bar) × (0.30 L) = -0.90 L·bar.\n4. Convert to Joules using 1 L·bar = 100 J: w = -0.90 × 100 J = -90 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3970,
    question: "In which of the following chemical or physical processes is the entropy change of the system negative (ΔS < 0)?",
    option_a: "2 Cl(g) → Cl₂(g)",
    option_b: "H₂O(s) → H₂O(l)",
    option_c: "CaCO₃(s) → CaO(s) + CO₂(g)",
    option_d: "I₂(s) → I₂(g)",
    correct_option: "A",
    explanation: "1. In the combination of chlorine free radicals: 2 Cl(g) → Cl₂(g), two moles of gaseous atoms combine to form one mole of diatomic gas molecules.\n2. The number of independent particles decreases from 2 to 1, reducing molecular degrees of freedom and randomness; hence ΔS < 0.\n3. In melting of ice, decomposition forming CO₂ gas, and sublimation of iodine, randomness increases (ΔS > 0).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3971,
    question: "The bond dissociation enthalpies of A₂, B₂, and AB are in the ratio 1 : 0.5 : 1. If the standard enthalpy of formation of AB(g) from its elements is Δ_f H° = -150 kJ/mol, what is the bond dissociation enthalpy of A₂?",
    option_a: "600 kJ/mol",
    option_b: "300 kJ/mol",
    option_c: "150 kJ/mol",
    option_d: "1200 kJ/mol",
    correct_option: "A",
    explanation: "1. The thermochemical formation reaction of AB is: 1/2 A₂(g) + 1/2 B₂(g) → AB(g).\n2. Express bond energies in terms of x: B.E.(A₂) = x, B.E.(B₂) = 0.5 x, B.E.(AB) = x.\n3. The enthalpy of formation is: Δ_f H° = [1/2 B.E.(A₂) + 1/2 B.E.(B₂)] - B.E.(AB) ⇒ -150 = [0.5 x + 0.25 x] - x = -0.25 x.\n4. Solving for x: x = (-150) / (-0.25) = 600 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3972,
    question: "Given that the bond dissociation energies of diatomic molecules X₂, Y₂, and XY are in the ratio 1 : 0.5 : 1, and the enthalpy of formation of XY is -100 kJ/mol, what is the bond dissociation energy of X₂?",
    option_a: "400 kJ/mol",
    option_b: "200 kJ/mol",
    option_c: "100 kJ/mol",
    option_d: "800 kJ/mol",
    correct_option: "A",
    explanation: "1. Formation reaction: 1/2 X₂(g) + 1/2 Y₂(g) → XY(g).\n2. Let B.E.(X₂) = x, B.E.(Y₂) = 0.5 x, B.E.(XY) = x.\n3. Δ_f H = [0.5 x + 0.25 x] - x = -0.25 x.\n4. -100 kJ/mol = -0.25 x ⇒ x = 400 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3973,
    question: "An ideal gas contained in a thermally insulated cylinder expands against a constant external pressure of 2.0 atm from an initial volume of 1.50 L to a final volume of 3.50 L. What is the change in internal energy (ΔU) of the gas? (Take 1 L·atm = 101.3 J)",
    option_a: "-405.2 J",
    option_b: "+405.2 J",
    option_c: "-202.6 J",
    option_d: "0 J",
    correct_option: "A",
    explanation: "1. Because the cylinder is thermally insulated, the process is adiabatic: q = 0.\n2. By the First Law of Thermodynamics: ΔU = q + w = 0 + w = w.\n3. The work done during expansion against a constant external pressure is: w = -P_ext × ΔV = -(2.0 atm) × (3.50 L - 1.50 L) = -4.0 L·atm.\n4. Convert to Joules using 1 L·atm = 101.3 J: ΔU = w = -4.0 × 101.3 J = -405.2 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3974,
    question: "For a chemical reaction, the enthalpy change is ΔH = +45.0 kJ and the entropy change is ΔS = +90.0 J/K. Above what temperature will this reaction become spontaneous?",
    option_a: "T > 500 K",
    option_b: "T < 500 K",
    option_c: "T > 250 K",
    option_d: "T < 250 K",
    correct_option: "A",
    explanation: "1. A reaction is at equilibrium when ΔG = 0: ΔH - T_eq ΔS = 0 ⇒ T_eq = ΔH / ΔS.\n2. Given: ΔH = +45,000 J, ΔS = +90.0 J/K.\n3. Calculate transition temperature: T_eq = 45,000 J / (90.0 J/K) = 500 K.\n4. Since both ΔH > 0 and ΔS > 0, the -T ΔS term becomes increasingly negative with increasing temperature.\n5. For ΔG < 0 (spontaneity), the temperature must satisfy: T > 500 K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3975,
    question: "Among the following gaseous hydrocarbons at 298 K and 1 bar, which molecule possesses the highest standard molar entropy (S°_m)?",
    option_a: "Propane (C₃H₈)",
    option_b: "Ethane (C₂H₆)",
    option_c: "Methane (CH₄)",
    option_d: "Acetylene (C₂H₂)",
    correct_option: "A",
    explanation: "1. Standard molar entropy increases with increasing molecular mass, molecular complexity, and the number of vibrational degrees of freedom.\n2. Propane (C₃H₈, molar mass = 44 g/mol) is the largest and most complex molecule in the series, with more atoms and conformational/vibrational states.\n3. Consequently, Propane has the greatest number of available microstates and the highest molar entropy (S°_m ≈ 270 J·K⁻¹·mol⁻¹) compared to C₂H₆, CH₄, and C₂H₂.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3976,
    question: "Under conditions of constant temperature and constant pressure, the decrease in Gibbs free energy (-ΔG) represents:",
    option_a: "The maximum amount of non-expansion (useful) work that can be obtained from the system",
    option_b: "The total expansion work done by the system",
    option_c: "The heat absorbed by the system",
    option_d: "The change in enthalpy of the system",
    correct_option: "A",
    explanation: "1. In thermodynamics, the total work can be split into pressure-volume work (expansion work) and other forms of useful work (non-expansion work, such as electrical work): w_total = w_PV + w_non-PV.\n2. At constant T and P, fundamental relations give: dG = dw_non-PV.\n3. For a reversible process: -ΔG = w_non-expansion (maximum useful work done by the system).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3977,
    question: "When n moles of an ideal gas undergo an isothermal reversible change in pressure from an initial pressure P_i to a final pressure P_f, what is the entropy change (ΔS) of the gas?",
    option_a: "ΔS = nR ln(P_i / P_f)",
    option_b: "ΔS = nR ln(P_f / P_i)",
    option_c: "ΔS = nRT ln(P_i / P_f)",
    option_d: "ΔS = 0",
    correct_option: "A",
    explanation: "1. For an isothermal process of an ideal gas, Boyle's Law states: P_i V_i = P_f V_f  ⇒  V_f / V_i = P_i / P_f.\n2. The entropy change as a function of volume for an isothermal process is: ΔS = nR ln(V_f / V_i).\n3. Substituting the pressure ratio gives: ΔS = nR ln(P_i / P_f).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3978,
    question: "Under which of the following thermodynamic conditions will a reaction be spontaneous at all temperatures?",
    option_a: "ΔH < 0 and ΔS > 0",
    option_b: "ΔH > 0 and ΔS > 0",
    option_c: "ΔH < 0 and ΔS < 0",
    option_d: "ΔH > 0 and ΔS < 0",
    correct_option: "A",
    explanation: "1. The criterion for spontaneity at constant T and P is ΔG < 0: ΔG = ΔH - T ΔS.\n2. If the reaction is exothermic (ΔH < 0) and the entropy change is positive (ΔS > 0):\n   - The first term ΔH is negative.\n   - The second term (-T ΔS) is also negative for all positive temperatures T.\n3. Therefore, their sum is always strictly negative (ΔG < 0) regardless of the numerical value of T.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3979,
    question: "Which of the following represents the differential form of the Clausius-Clapeyron equation for a liquid-vapor equilibrium?",
    option_a: "d(ln P) / dT = Δ_vap H / (R T²)",
    option_b: "d(ln P) / dT = -Δ_vap H / (R T²)",
    option_c: "dP / dT = Δ_vap H / (R T)",
    option_d: "d(ln P) / dT = Δ_vap H / (R T)",
    correct_option: "A",
    explanation: "1. The Clapeyron equation is dP/dT = Δ_vap H / (T ΔV).\n2. For liquid-vapor phase transitions, the molar volume of vapor is much larger than that of liquid (ΔV ≈ V_m,vapor) and assuming ideal gas behavior (V_m,vapor = RT/P):\n   dP/dT = (Δ_vap H × P) / (R T²).\n3. Rearranging (dP / P = d(ln P)) gives: d(ln P) / dT = Δ_vap H / (R T²).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3980,
    question: "The standard enthalpy of combustion of carbon to form CO₂(g) is -393.5 kJ/mol: C(s) + O₂(g) → CO₂(g), ΔH° = -393.5 kJ/mol. How much heat is released when 22.0 g of CO₂(g) is formed? (Molar mass of CO₂ = 44.0 g/mol)",
    option_a: "196.75 kJ",
    option_b: "393.50 kJ",
    option_c: "787.00 kJ",
    option_d: "98.38 kJ",
    correct_option: "A",
    explanation: "1. Calculate the number of moles of CO₂ produced: n = mass / molar mass = 22.0 g / (44.0 g/mol) = 0.50 mol.\n2. Heat released during the formation of 1 mole of CO₂ is 393.5 kJ.\n3. Therefore, heat released for 0.50 mole is: q = 0.50 mol × 393.5 kJ/mol = 196.75 kJ.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3981,
    question: "For the reaction: M₂O₄(l) → 2 MO₂(g), at 300 K, the internal energy change is ΔU = +2.0 kcal and the entropy change is ΔS = +25.0 cal/K. What is the Gibbs free energy change (ΔG) at 300 K? (Take R = 2.0 cal·K⁻¹·mol⁻¹)",
    option_a: "-4.3 kcal",
    option_b: "+4.3 kcal",
    option_c: "-2.3 kcal",
    option_d: "+2.3 kcal",
    correct_option: "A",
    explanation: "1. Find Δn_g for the reaction: M₂O₄ is a liquid; products consist of 2 moles of gas. Δn_g = 2 - 0 = 2 mol.\n2. Calculate ΔH: ΔH = ΔU + Δn_g RT = 2.0 kcal + (2 × 2.0 × 300 / 1000) kcal = 2.0 + 1.2 = +3.2 kcal.\n3. Calculate T ΔS: T ΔS = 300 K × (25.0 cal/K) = 7500 cal = +7.5 kcal.\n4. Calculate ΔG: ΔG = ΔH - T ΔS = 3.2 kcal - 7.5 kcal = -4.3 kcal.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3982,
    question: "One mole of a monoatomic ideal gas undergoes an isobaric expansion where its temperature increases from T₁ to T₂. If the molar heat capacity at constant pressure is C_p,m = (5/2) R, what is the heat absorbed (q) by the gas?",
    option_a: "(5/2) R (T₂ - T₁)",
    option_b: "(3/2) R (T₂ - T₁)",
    option_c: "R (T₂ - T₁)",
    option_d: "(7/2) R (T₂ - T₁)",
    correct_option: "A",
    explanation: "1. For any isobaric process (constant pressure), the heat absorbed is related to the temperature change by: q_p = n C_p,m ΔT.\n2. For 1 mole of a monoatomic ideal gas: n = 1, C_p,m = (5/2) R, and ΔT = T₂ - T₁.\n3. Substituting these gives: q_p = (5/2) R (T₂ - T₁).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3983,
    question: "A sample of an ideal gas initially at 300 K is expanded adiabatically to 16 times its initial volume. If the adiabatic index of the gas is γ = 1.5, what is the final temperature of the gas in Kelvin?",
    option_a: "75 K",
    option_b: "150 K",
    option_c: "37.5 K",
    option_d: "100 K",
    correct_option: "A",
    explanation: "1. For a reversible adiabatic process of an ideal gas: T₁ V₁^(γ - 1) = T₂ V₂^(γ - 1).\n2. Rearranging for T₂: T₂ = T₁ × (V₁ / V₂)^(γ - 1).\n3. Given: T₁ = 300 K, V₂ / V₁ = 16 ⇒ V₁ / V₂ = 1/16, γ = 1.5 ⇒ γ - 1 = 0.5 = 1/2.\n4. Compute T₂: T₂ = 300 × (1/16)^(1/2) = 300 × (1/4) = 75 K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3984,
    question: "In an adiabatic compression, 150 J of mechanical work is performed on an ideal gas. What is the change in internal energy (ΔU) of the gas?",
    option_a: "+150 J",
    option_b: "-150 J",
    option_c: "0 J",
    option_d: "+300 J",
    correct_option: "A",
    explanation: "1. For an adiabatic process, there is no heat exchange with the surroundings: q = 0.\n2. By the First Law of Thermodynamics: ΔU = q + w.\n3. Since work is done ON the gas, by IUPAC sign convention, w = +150 J.\n4. Therefore: ΔU = 0 + 150 J = +150 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3985,
    question: "What is the thermal efficiency of a Carnot engine operating between a hot reservoir at 227 °C and a cold reservoir at 27 °C?",
    option_a: "40%",
    option_b: "50%",
    option_c: "20%",
    option_d: "88%",
    correct_option: "A",
    explanation: "1. Convert temperatures to Kelvin: T_hot = 227 + 273 = 500 K; T_cold = 27 + 273 = 300 K.\n2. The efficiency of a Carnot engine is: η = 1 - (T_cold / T_hot).\n3. Substitute the temperatures: η = 1 - (300 / 500) = 1 - 0.60 = 0.40 = 40%.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 22 Part 2 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
