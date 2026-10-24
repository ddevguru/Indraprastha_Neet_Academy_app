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
    id: 4010,
    question: "An ideal gas goes from an initial state I to a final state F along two different paths on a P-V diagram: Path A and Path B. If the work done along Path A is greater than along Path B (W_A > W_B), how do the heat quantities supplied (Q_A and Q_B) compare?",
    option_a: "Q_A > Q_B",
    option_b: "Q_A < Q_B",
    option_c: "Q_A = Q_B",
    option_d: "Cannot be determined without temperature data",
    correct_option: "A",
    explanation: "1. Since the initial state I and final state F are identical for both paths, the change in internal energy is a state function: ΔU_A = ΔU_B = U_F - U_I.\n2. By the First Law of Thermodynamics: Q_A = ΔU_A + W_A, Q_B = ΔU_B + W_B.\n3. Since ΔU_A = ΔU_B and W_A > W_B, it directly follows that: Q_A > Q_B.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4011,
    question: "An ideal gas undergoes a cyclic process represented by a rectangle on a P-V indicator diagram between pressures P₁ and 5P₁, and volumes V₁ and 4V₁. What is the net work done by the gas in one complete cycle?",
    option_a: "12 P₁ V₁",
    option_b: "15 P₁ V₁",
    option_c: "20 P₁ V₁",
    option_d: "8 P₁ V₁",
    correct_option: "A",
    explanation: "1. The net work done during a cyclic process in a P-V diagram is given by the area enclosed by the cycle: W_net = ΔP × ΔV.\n2. Here: ΔP = 5P₁ - P₁ = 4P₁, ΔV = 4V₁ - V₁ = 3V₁.\n3. The enclosed area is: W_net = 4P₁ × 3V₁ = 12 P₁ V₁.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4012,
    question: "A thermodynamic system is taken from initial state 'i' to final state 'f' along path 'iaf', absorbing Q = 60 J of heat while performing W = 25 J of work. Along an alternative path 'ibf', the heat absorbed is Q = 45 J. If on the return path from 'f' back to 'i', the work done on the system is 15 J (w = -15 J), what is the heat exchanged (Q) along the return path?",
    option_a: "-50 J (50 J heat released)",
    option_b: "+50 J",
    option_c: "-20 J",
    option_d: "+20 J",
    correct_option: "A",
    explanation: "1. For path 'iaf': ΔU = Q - W = 60 J - 25 J = +35 J (U_f - U_i = 35 J).\n2. For the return path from 'f' back to 'i': ΔU_return = U_i - U_f = -35 J.\n3. Using the First Law for the return path: ΔU_return = Q_return - W_return ⇒ -35 J = Q_return - (-15 J) = Q_return + 15 J ⇒ Q_return = -50 J.\n4. The negative sign signifies that 50 J of heat is released by the system.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4013,
    question: "For one complete cycle executed by an ideal gas in a clockwise direction on a P-V diagram, which of the following relations correctly describes the net internal energy change (ΔU) and the net heat absorbed (Q_net)?",
    option_a: "ΔU = 0 and Q_net > 0",
    option_b: "ΔU = 0 and Q_net < 0",
    option_c: "ΔU > 0 and Q_net = 0",
    option_d: "ΔU < 0 and Q_net > 0",
    correct_option: "A",
    explanation: "1. Because internal energy (U) is a thermodynamic state function, its net change over any closed cyclic path is strictly zero: ΔU_cycle = 0.\n2. By the First Law of Thermodynamics: Q_net = ΔU_cycle + W_net = 0 + W_net = W_net.\n3. For any clockwise cycle in a P-V diagram, the work done during expansion is greater than the work done during compression; hence W_net > 0.\n4. Consequently, Q_net = W_net > 0.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4014,
    question: "In a thermodynamic process, an ideal gas goes from state A to state B isochorically (V = constant), absorbing 400 J of heat. It then goes from state B to state C isobarically at a constant pressure of 2.0 × 10⁵ Pa, where its volume expands by 1.0 × 10⁻³ m³ while absorbing 350 J of heat. What is the total change in internal energy from state A to state C (ΔU_AC)?",
    option_a: "550 J",
    option_b: "750 J",
    option_c: "950 J",
    option_d: "350 J",
    correct_option: "A",
    explanation: "1. For step A → B (isochoric): W_AB = 0, so ΔU_AB = Q_AB = +400 J.\n2. For step B → C (isobaric): W_BC = P × ΔV = (2.0 × 10⁵ N/m²) × (1.0 × 10⁻³ m³) = 200 J. ΔU_BC = Q_BC - W_BC = 350 J - 200 J = +150 J.\n3. Total change in internal energy: ΔU_AC = ΔU_AB + ΔU_BC = 400 J + 150 J = +550 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4015,
    question: "What is the amount of heat required to raise the temperature of 3 moles of a monoatomic ideal gas from 300 K to 400 K under conditions where no mechanical work is performed (w = 0)?",
    option_a: "450 R",
    option_b: "300 R",
    option_c: "150 R",
    option_d: "600 R",
    correct_option: "A",
    explanation: "1. When no mechanical work is performed (w = 0), the process is isochoric (constant volume, ΔV = 0).\n2. For an isochoric process, the heat required is: q_v = n C_v,m ΔT.\n3. For a monoatomic ideal gas, C_v,m = (3/2) R.\n4. Given: n = 3 mol, ΔT = 400 K - 300 K = 100 K.\n5. Substituting these values: q_v = 3 × (3/2 R) × 100 = 450 R.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4016,
    question: "An ideal gas initially at 27 °C (300 K) is compressed adiabatically to 1/8 of its original volume. If the adiabatic exponent of the gas is γ = 5/3, what is the rise in temperature of the gas?",
    option_a: "900 K",
    option_b: "1200 K",
    option_c: "600 K",
    option_d: "300 K",
    correct_option: "A",
    explanation: "1. For an adiabatic process of an ideal gas: T₁ V₁^(γ - 1) = T₂ V₂^(γ - 1) ⇒ T₂ = T₁ × (V₁ / V₂)^(γ - 1).\n2. Given: T₁ = 300 K, V₁ / V₂ = 8, γ - 1 = 5/3 - 1 = 2/3.\n3. Calculate T₂: T₂ = 300 × (8)^(2/3) = 300 × 4 = 1200 K.\n4. The RISE in temperature is: ΔT = T₂ - T₁ = 1200 K - 300 K = 900 K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4017,
    question: "On a P-V diagram, two expansion curves starting from the same initial state represent an adiabatic expansion and an isothermal expansion. How can the adiabatic curve be uniquely identified?",
    option_a: "The adiabatic curve is steeper (has a greater negative slope) than the isothermal curve",
    option_b: "The adiabatic curve is flatter than the isothermal curve",
    option_c: "The adiabatic curve is a horizontal line",
    option_d: "The adiabatic curve is a vertical line",
    correct_option: "A",
    explanation: "1. The slope of an isothermal curve is (dP/dV)_iso = -P / V.\n2. The slope of an adiabatic curve is (dP/dV)_ad = -γ (P / V).\n3. Since the heat capacity ratio γ > 1 for any gas: |(dP/dV)_ad| > |(dP/dV)_iso|.\n4. Thus, the adiabatic curve always slopes downward more steeply than the isothermal curve.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4018,
    question: "A thermally insulated, rigid vessel is divided into two equal compartments by a partition. One compartment contains an ideal gas at temperature T, and the other compartment is evacuated (vacuum). If the partition is suddenly removed, what happens to the temperature of the ideal gas?",
    option_a: "The temperature remains exactly the same (ΔT = 0)",
    option_b: "The temperature decreases significantly",
    option_c: "The temperature increases significantly",
    option_d: "The temperature drops to absolute zero",
    correct_option: "A",
    explanation: "1. The vessel is thermally insulated, so no heat is exchanged with the environment: q = 0.\n2. The gas expands into an evacuated space (vacuum), so the external opposing pressure is zero (P_ext = 0), and therefore no work is done: w = 0.\n3. According to the First Law of Thermodynamics: ΔU = q + w = 0 + 0 = 0.\n4. For an ideal gas, internal energy depends solely on absolute temperature (ΔU = n C_v ΔT).\n5. Since ΔU = 0, it follows that ΔT = 0; hence, the temperature remains unchanged.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4019,
    question: "An ideal gas is carried through a closed cyclic thermodynamic process that traces an ellipse on a P-V diagram between pressures P_min and P_max, and volumes V_min and V_max. What is the magnitude of the work done in one complete cycle?",
    option_a: "W = (π / 4) × (P_max - P_min) × (V_max - V_min)",
    option_b: "W = π × (P_max - P_min) × (V_max - V_min)",
    option_c: "W = (π / 2) × (P_max - P_min) × (V_max - V_min)",
    option_d: "W = (P_max - P_min) × (V_max - V_min)",
    correct_option: "A",
    explanation: "1. The work done in a closed cycle is equal to the area enclosed by the path on the P-V diagram.\n2. The area of an ellipse with semi-major axis 'a' and semi-minor axis 'b' is: Area = π × a × b.\n3. Here, 2a = (P_max - P_min) ⇒ a = (P_max - P_min) / 2; 2b = (V_max - V_min) ⇒ b = (V_max - V_min) / 2.\n4. Substituting gives: Area = (π / 4) × (P_max - P_min) × (V_max - V_min).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4020,
    question: "A thermodynamic cycle consists of three steps:\n- Step 1 → 2: Isothermal expansion where 80 J of heat enters the gas.\n- Step 2 → 3: Isochoric cooling where 50 J of heat leaves the gas.\n- Step 3 → 1: Adiabatic compression returning the gas to state 1.\nWhat is the change in internal energy (ΔU₃₁) during the adiabatic step 3 → 1?",
    option_a: "+50 J",
    option_b: "-50 J",
    option_c: "+30 J",
    option_d: "-30 J",
    correct_option: "A",
    explanation: "1. For any complete thermodynamic cycle, the net change in internal energy is zero: ΔU_net = ΔU₁₂ + ΔU₂₃ + ΔU₃₁ = 0.\n2. In step 1 → 2 (isothermal process of an ideal gas): ΔU₁₂ = 0.\n3. In step 2 → 3 (isochoric process, W₂₃ = 0): ΔU₂₃ = Q₂₃ = -50 J (since heat leaves the system).\n4. Substitute into the cycle equation: 0 + (-50 J) + ΔU₃₁ = 0 ⇒ ΔU₃₁ = +50 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4021,
    question: "A 10.0 L vessel contains a mixture of H₂ (molar mass = 2 g/mol) and He (molar mass = 4 g/mol) at 27 °C (300 K) and a total pressure of 2.46 atm. If the total mass of the mixture is 3.0 g, what is the mass of H₂ present in the mixture? (Take R = 0.082 L·atm·K⁻¹·mol⁻¹)",
    option_a: "1.0 g",
    option_b: "2.0 g",
    option_c: "0.5 g",
    option_d: "1.5 g",
    correct_option: "A",
    explanation: "1. Find total number of moles of gas present using ideal gas equation: n_total = PV / (RT) = (2.46 × 10.0) / (0.082 × 300) = 24.6 / 24.6 = 1.0 mol.\n2. Let mass of H₂ be m grams; then mass of He is (3.0 - m) grams.\n3. Express total moles: n_total = m / 2 + (3.0 - m) / 4 = 1.0 ⇒ 2m + 3.0 - m = 4.0 ⇒ m = 1.0 g.\n4. Therefore, the mass of H₂ is 1.0 g.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4022,
    question: "A vertical cylinder containing an ideal gas is fitted with a frictionless piston of mass 5.0 kg and cross-sectional area 50 cm² (5.0 × 10⁻³ m²). The external atmospheric pressure is 1.0 × 10⁵ Pa. The gas is heated slowly such that the piston rises by a height of 10 cm (0.10 m). What is the work done by the gas against the total external pressure? (Take g = 10 m/s²)",
    option_a: "55 J",
    option_b: "50 J",
    option_c: "5 J",
    option_d: "100 J",
    correct_option: "A",
    explanation: "1. Total pressure exerted on the gas: P_total = P_atm + (M_piston × g) / Area = 1.0 × 10⁵ + (5.0 × 10) / (5.0 × 10⁻³ m²) = 100,000 + 10,000 = 1.1 × 10⁵ Pa.\n2. Increase in volume of the gas: ΔV = Area × height = (5.0 × 10⁻³ m²) × (0.10 m) = 5.0 × 10⁻⁴ m³.\n3. Work done by the gas: W = P_total × ΔV = (1.1 × 10⁵ N/m²) × (5.0 × 10⁻⁴ m³) = 55 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4023,
    question: "An ideal gas undergoes a cyclic process A → B → C → A. In one complete cycle, the net heat absorbed by the gas is Q_net = 70 J. If the work done by the gas during process A → B is 50 J and during process B → C is 30 J, what is the work done by the gas during process C → A?",
    option_a: "-10 J",
    option_b: "+10 J",
    option_c: "-80 J",
    option_d: "+80 J",
    correct_option: "A",
    explanation: "1. For any cyclic process, the net change in internal energy is zero (ΔU_net = 0).\n2. By the First Law of Thermodynamics: Q_net = W_net.\n3. Therefore: W_net = W_AB + W_BC + W_CA = 70 J ⇒ 50 J + 30 J + W_CA = 70 J ⇒ 80 J + W_CA = 70 J ⇒ W_CA = -10 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4024,
    question: "Two identical vessels A and B of volume V contain ideal gas of the same species at temperature T with masses m_A and m_B, respectively. When both gases are expanded isothermally to double their volume, the pressure drops by ΔP in vessel A and by 2ΔP in vessel B. What is the relation between the masses m_A and m_B?",
    option_a: "2 m_A = m_B",
    option_b: "m_A = 2 m_B",
    option_c: "m_A = m_B",
    option_d: "4 m_A = m_B",
    correct_option: "A",
    explanation: "1. For an isothermal expansion where volume doubles (V → 2V): P_initial = nRT / V; P_final = (1/2) P_initial.\n2. The pressure decrease is: ΔP = P_initial - P_final = (1/2) P_initial = (1/2) (m / M) (RT / V).\n3. Thus, ΔP is directly proportional to the mass m of gas: ΔP_A ∝ m_A and ΔP_B ∝ m_B.\n4. Given ΔP_B = 2 ΔP_A: m_B / m_A = 2 ⇒ 2 m_A = m_B.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4025,
    question: "For a monoatomic ideal gas (such as Argon, γ = 5/3) undergoing a reversible adiabatic process, which of the following relations between temperature T and pressure P is constant?",
    option_a: "T · P^(-2/5) = constant",
    option_b: "T · P^(2/5) = constant",
    option_c: "T^(5/3) · P = constant",
    option_d: "T · P^(3/5) = constant",
    correct_option: "A",
    explanation: "1. For any reversible adiabatic process: P^(1 - γ) T^γ = constant.\n2. Raising both sides to the power 1/γ: T · P^((1 - γ) / γ) = constant.\n3. For monoatomic Argon, γ = 5/3: (1 - γ) / γ = (1 - 5/3) / (5/3) = (-2/3) / (5/3) = -2/5.\n4. Therefore, the relation becomes: T · P^(-2/5) = constant.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4026,
    question: "A gas occupies 500 cm³ at a constant pressure of 1.0 atm (1.013 × 10⁵ Pa). When 120 J of heat is supplied to the gas, it expands to 1000 cm³ at constant pressure. What is the change in internal energy (ΔU) of the gas?",
    option_a: "+69.35 J",
    option_b: "+120.00 J",
    option_c: "-50.65 J",
    option_d: "+50.65 J",
    correct_option: "A",
    explanation: "1. Change in volume: ΔV = 1000 cm³ - 500 cm³ = 500 cm³ = 5.0 × 10⁻⁴ m³.\n2. Work done by the expanding gas: w_by = P × ΔV = (1.013 × 10⁵ N/m²) × (5.0 × 10⁻⁴ m³) = 50.65 J.\n3. According to the First Law of Thermodynamics: ΔU = q - w_by = 120 J - 50.65 J = +69.35 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4027,
    question: "One mole of an ideal gas at temperature T is expanded to double its volume (from V to 2V). What is the ratio of the work done in a reversible isothermal expansion (W_iso) to the work done in an isobaric expansion (W_isobar) at the same initial temperature?",
    option_a: "ln 2",
    option_b: "1 / (ln 2)",
    option_c: "2",
    option_d: "1/2",
    correct_option: "A",
    explanation: "1. In a reversible isothermal expansion from V to 2V: W_iso = nRT ln(2V / V) = nRT ln 2.\n2. In an isobaric expansion where volume doubles at initial pressure P: W_isobar = P × ΔV = P × (2V - V) = PV = nRT.\n3. The ratio of isothermal work to isobaric work is: W_iso / W_isobar = (nRT ln 2) / (nRT) = ln 2 ≈ 0.693.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4028,
    question: "An ideal Carnot heat engine operates with thermal efficiency η. If this machine is run in reverse as a refrigerator, what is its coefficient of performance (β)?",
    option_a: "β = (1 / η) - 1",
    option_b: "β = η / (1 - η)",
    option_c: "β = 1 - η",
    option_d: "β = 1 / (1 - η)",
    correct_option: "A",
    explanation: "1. The efficiency of a Carnot heat engine is: η = W / Q_hot = (Q_hot - Q_cold) / Q_hot.\n2. The coefficient of performance (COP) of the refrigerator is: β = Q_cold / W = (Q_hot - W) / W = (Q_hot / W) - 1 = (1 / η) - 1.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4029,
    question: "For small adiabatic fluctuations in an ideal gas at temperature T and pressure P, what is the relation between the temperature fluctuation (ΔT) and pressure fluctuation (ΔP)?",
    option_a: "ΔT / T = [(γ - 1) / γ] × (ΔP / P)",
    option_b: "ΔT / T = [γ / (γ - 1)] × (ΔP / P)",
    option_c: "ΔT / T = γ × (ΔP / P)",
    option_d: "ΔT / T = (γ - 1) × (ΔP / P)",
    correct_option: "A",
    explanation: "1. For an adiabatic process of an ideal gas: T^γ · P^(1 - γ) = constant.\n2. Taking natural logarithms of both sides: γ ln T + (1 - γ) ln P = constant.\n3. Differentiating: γ (dT / T) + (1 - γ) (dP / P) = 0.\n4. Rearranging: dT / T = [(γ - 1) / γ] × (dP / P).\n5. For small changes, ΔT / T = [(γ - 1) / γ] × (ΔP / P).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4030,
    question: "An insulated container is divided into two equal compartments by a removable partition. One compartment contains an ideal gas at 400 K, and the other is completely evacuated. When the partition is removed, what is the final temperature of the gas after equilibrium is restored?",
    option_a: "400 K",
    option_b: "200 K",
    option_c: "800 K",
    option_d: "0 K",
    correct_option: "A",
    explanation: "1. Because the container is insulated, q = 0.\n2. Because the gas expands into a vacuum, w = 0.\n3. By the First Law of Thermodynamics: ΔU = q + w = 0.\n4. For an ideal gas, internal energy is a function of temperature alone; hence ΔU = 0 implies ΔT = 0.\n5. Therefore, the final temperature remains exactly 400 K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4031,
    question: "The molar heat capacity of Nitrogen gas at constant pressure is C_p = 7.00 cal·mol⁻¹·K⁻¹. What is the amount of heat required to heat 4 moles of Nitrogen at constant volume from 25 °C to 35 °C? (Take R ≈ 2.00 cal·mol⁻¹·K⁻¹)",
    option_a: "200 cal",
    option_b: "280 cal",
    option_c: "80 cal",
    option_d: "400 cal",
    correct_option: "A",
    explanation: "1. By Mayer's relation: C_v = C_p - R = 7.00 - 2.00 = 5.00 cal·mol⁻¹·K⁻¹.\n2. Heat required at constant volume: q_v = n C_v ΔT.\n3. Given: n = 4 mol, ΔT = 35 - 25 = 10 K.\n4. Calculate q_v: q_v = 4 mol × 5.00 cal·mol⁻¹·K⁻¹ × 10 K = 200 cal.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4032,
    question: "A gas mixture contains 3 moles of a monoatomic gas (C_p = 5/2 R) and 2 moles of a diatomic gas (C_p = 7/2 R). What is the molar heat capacity at constant pressure (C_p,mix) of the mixture?",
    option_a: "(29/10) R (2.9 R)",
    option_b: "(12/5) R (2.4 R)",
    option_c: "(31/10) R (3.1 R)",
    option_d: "3 R",
    correct_option: "A",
    explanation: "1. For an ideal gas mixture, the molar heat capacity at constant pressure is: C_p,mix = (n₁ C_p1 + n₂ C_p2) / (n₁ + n₂).\n2. Given: n₁ = 3 mol, C_p1 = (5/2) R; n₂ = 2 mol, C_p2 = (7/2) R; Total moles n_total = 3 + 2 = 5 mol.\n3. Calculate: n₁ C_p1 + n₂ C_p2 = 3 × (5/2) R + 2 × (7/2) R = (15/2) R + (14/2) R = (29/2) R.\n4. Divide by total moles: C_p,mix = [(29/2) R] / 5 = (29/10) R = 2.9 R.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4033,
    question: "An ideal gas goes from state A to state B along three different paths on a P-V diagram: Path 1, Path 2, and Path 3. If the areas under the curves satisfy Area(Path 1) > Area(Path 2) > Area(Path 3), what is the relation between the amounts of heat absorbed?",
    option_a: "Q₁ > Q₂ > Q₃",
    option_b: "Q₁ < Q₂ < Q₃",
    option_c: "Q₁ = Q₂ = Q₃",
    option_d: "Q₂ > Q₁ > Q₃",
    correct_option: "A",
    explanation: "1. The initial and final states are identical for all three paths; thus: ΔU₁ = ΔU₂ = ΔU₃ = U_B - U_A.\n2. By the First Law of Thermodynamics: Q = ΔU + W.\n3. Because the work done W corresponds to the area under each curve: W₁ > W₂ > W₃.\n4. Adding the same ΔU to each gives: Q₁ > Q₂ > Q₃.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 22 Part 4 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
