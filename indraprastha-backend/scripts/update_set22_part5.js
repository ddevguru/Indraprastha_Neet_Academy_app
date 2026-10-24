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
    id: 4034,
    question: "For any cyclic thermodynamic process ABCDA executed by an ideal gas where the system returns to its initial state, what is the net change in internal energy (ΔU)?",
    option_a: "Zero in all cases",
    option_b: "Positive if the cycle is clockwise",
    option_c: "Negative if the cycle is anticlockwise",
    option_d: "Dependent on the path taken",
    correct_option: "A",
    explanation: "1. Internal energy (U) is a thermodynamic state property that depends only on the initial and final thermodynamic states of the system.\n2. In any cyclic process, the system returns to its exact initial state (State_final = State_initial).\n3. Therefore: ΔU_cyclic = U_final - U_initial = 0.\n4. Hence, the net change in internal energy is strictly zero for any cyclic process regardless of the path.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4035,
    question: "A person of mass 70 kg consumes a meal providing 10,000 cal of energy. If the muscular efficiency of the human body in converting this thermal food energy into mechanical potential energy is 28%, to what height can this person climb? (Take 1 cal = 4.2 J and g = 9.8 m/s²)",
    option_a: "17.1 m",
    option_b: "34.2 m",
    option_c: "8.5 m",
    option_d: "25.0 m",
    correct_option: "A",
    explanation: "1. Total food energy input: E_input = 10,000 cal × 4.2 J/cal = 42,000 J.\n2. Useful mechanical energy available (at 28% efficiency): E_useful = 0.28 × 42,000 J = 11,760 J.\n3. This energy is converted into gravitational potential energy (mgh): mgh = 11,760 J ⇒ (70 kg) × (9.8 m/s²) × h = 11,760 ⇒ 686 × h = 11,760 ⇒ h = 11,760 / 686 ≈ 17.14 m.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4036,
    question: "An ideal gas goes from state A to state B along Path 1, absorbing 6.0 × 10⁵ J of heat while performing 4.5 × 10⁵ J of work. Along a different path (Path 2) between the same two states, the gas absorbs 1.0 × 10⁵ J of heat. What is the work done in Path 2?",
    option_a: "0.5 × 10⁵ J of work is done ON the gas (W = -0.5 × 10⁵ J)",
    option_b: "0.5 × 10⁵ J of work is done BY the gas (W = +0.5 × 10⁵ J)",
    option_c: "1.5 × 10⁵ J of work is done ON the gas",
    option_d: "1.5 × 10⁵ J of work is done BY the gas",
    correct_option: "A",
    explanation: "1. For Path 1: ΔU = Q₁ - W₁ = 6.0 × 10⁵ J - 4.5 × 10⁵ J = +1.5 × 10⁵ J.\n2. Since ΔU is a state function, for Path 2 between the same initial and final states: ΔU = +1.5 × 10⁵ J.\n3. Using the First Law for Path 2: ΔU = Q₂ - W₂ ⇒ 1.5 × 10⁵ J = 1.0 × 10⁵ J - W₂ ⇒ W₂ = -0.5 × 10⁵ J.\n4. The negative sign means that 0.5 × 10⁵ J of work is performed ON the gas.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4037,
    question: "A gas is taken from state 'i' to state 'f' along path 'iaf', with Q = 100 cal and W = 60 cal. On returning from 'f' back to 'i' along a curved path, the work done ON the system is 40 cal (W_fi = -40 cal). What is the heat exchanged (Q_fi) along the return path?",
    option_a: "-80 cal (80 cal released)",
    option_b: "+80 cal",
    option_c: "-40 cal",
    option_d: "+40 cal",
    correct_option: "A",
    explanation: "1. For path 'iaf': ΔU_if = U_f - U_i = Q - W = 100 cal - 60 cal = +40 cal.\n2. For the return path 'fi': ΔU_fi = U_i - U_f = -40 cal.\n3. Applying the First Law: ΔU_fi = Q_fi - W_fi ⇒ -40 cal = Q_fi - (-40 cal) = Q_fi + 40 cal ⇒ Q_fi = -80 cal.\n4. Hence, 80 cal of heat is released.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4038,
    question: "An ideal gas undergoes a reversible adiabatic process in which its pressure is proportional to the square of its absolute temperature (P ∝ T²). What is the ratio of specific heats γ = C_p / C_v for this gas?",
    option_a: "2.0",
    option_b: "1.5",
    option_c: "1.67",
    option_d: "1.4",
    correct_option: "A",
    explanation: "1. The adiabatic relationship between P and T is: P^(1 - γ) T^γ = constant ⇒ P ∝ T^(γ / (γ - 1)).\n2. We are given: P ∝ T².\n3. Equating exponents: γ / (γ - 1) = 2 ⇒ γ = 2γ - 2 ⇒ γ = 2.0.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4039,
    question: "In a cyclic process represented on a P-V diagram, the path forms a right-angled triangle with a base of ΔV = (4 - 1) L = 3 L and a height of ΔP = (3 - 1) atm = 2 atm. Tracing the cycle in a clockwise direction, what is the work done by the gas? (1 L·atm = 101.3 J)",
    option_a: "303.9 J",
    option_b: "607.8 J",
    option_c: "151.9 J",
    option_d: "455.8 J",
    correct_option: "A",
    explanation: "1. The work done during one complete cycle is equal to the area of the triangle: Area = (1/2) × base × height = (1/2) × (3 L) × (2 atm) = 3.0 L·atm.\n2. Convert into Joules using 1 L·atm = 101.3 J: W = 3.0 × 101.3 J = 303.9 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4040,
    question: "Two moles of an ideal gas undergo a polytropic process described by P ∝ V⁻² (PV² = constant) during which the temperature increases from 300 K to 400 K. What is the work done by the gas?",
    option_a: "-200 R",
    option_b: "+200 R",
    option_c: "-100 R",
    option_d: "+100 R",
    correct_option: "A",
    explanation: "1. For a polytropic process PV^x = constant with x = 2: W = nR (T₁ - T₂) / (x - 1).\n2. Here: n = 2 mol, x = 2, T₁ = 300 K, T₂ = 400 K.\n3. Substituting values: W = 2 R (300 - 400) / (2 - 1) = 2 R (-100) / 1 = -200 R.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4041,
    question: "A Carnot heat engine operating between a source at 227 °C and a sink at 77 °C absorbs 5.0 × 10⁴ cal of heat from the source. How much heat is converted into mechanical work?",
    option_a: "1.5 × 10⁴ cal",
    option_b: "3.5 × 10⁴ cal",
    option_c: "2.0 × 10⁴ cal",
    option_d: "1.0 × 10⁴ cal",
    correct_option: "A",
    explanation: "1. Convert temperatures to Kelvin: T_hot = 227 + 273 = 500 K; T_cold = 77 + 273 = 350 K.\n2. Carnot efficiency: η = 1 - (T_cold / T_hot) = 1 - (350 / 500) = 0.30 (30%).\n3. Work done per cycle: W = η × Q_in = 0.30 × (5.0 × 10⁴ cal) = 1.5 × 10⁴ cal.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4042,
    question: "An ideal refrigerator operates between an internal temperature of 260 K and an external room temperature of 300 K. For every 1.0 J of electrical work consumed by the compressor, approximately how much heat is delivered to the room?",
    option_a: "7.5 J",
    option_b: "6.5 J",
    option_c: "13.0 J",
    option_d: "1.0 J",
    correct_option: "A",
    explanation: "1. The coefficient of performance (COP) of a Carnot refrigerator is: β = T_cold / (T_hot - T_cold) = 260 / (300 - 260) = 6.5.\n2. Heat extracted from inside for W = 1.0 J: Q_cold = β × W = 6.5 × 1.0 J = 6.5 J.\n3. Heat delivered to the room: Q_hot = Q_cold + W = 6.5 J + 1.0 J = 7.5 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4043,
    question: "A Carnot engine operates with a sink temperature of 300 K and an efficiency of 40%. By how much must the temperature of the heat source be increased to raise the efficiency to 60%?",
    option_a: "250 K",
    option_b: "200 K",
    option_c: "150 K",
    option_d: "300 K",
    correct_option: "A",
    explanation: "1. Initial state: η₁ = 0.40 = 1 - (300 / T_source1) ⇒ 300 / T_source1 = 0.60 ⇒ T_source1 = 500 K.\n2. Final state: η₂ = 0.60 = 1 - (300 / T_source2) ⇒ 300 / T_source2 = 0.40 ⇒ T_source2 = 750 K.\n3. Required increase in source temperature: ΔT = 750 K - 500 K = 250 K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4044,
    question: "A Carnot engine has an efficiency of 20% as a heat engine. When operated in reverse as a refrigerator, if 20 J of mechanical work is supplied to it per cycle, how much heat is extracted from the lower temperature reservoir?",
    option_a: "80 J",
    option_b: "100 J",
    option_c: "20 J",
    option_d: "40 J",
    correct_option: "A",
    explanation: "1. For a Carnot heat engine: η = W / Q_hot = 0.20 ⇒ Q_hot = 20 J / 0.20 = 100 J.\n2. For the refrigerator: Q_cold = Q_hot - W = 100 J - 20 J = 80 J.\n3. Therefore, 80 J of heat energy is extracted from the cold reservoir.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4045,
    question: "Match the following thermodynamic processes with their defining condition:\n(I) Isochoric\n(II) Isobaric\n(III) Isothermal\n(IV) Adiabatic",
    option_a: "(I)-Constant volume (ΔV = 0), (II)-Constant pressure (ΔP = 0), (III)-Constant temperature (ΔT = 0), (IV)-No heat exchange (q = 0)",
    option_b: "(I)-Constant pressure, (II)-Constant volume, (III)-No heat exchange, (IV)-Constant temperature",
    option_c: "(I)-Constant temperature, (II)-No heat exchange, (III)-Constant volume, (IV)-Constant pressure",
    option_d: "(I)-No heat exchange, (II)-Constant volume, (III)-Constant pressure, (IV)-Constant temperature",
    correct_option: "A",
    explanation: "- Isochoric: Occurs at constant volume (ΔV = 0, W = 0).\n- Isobaric: Occurs at constant pressure (ΔP = 0).\n- Isothermal: Occurs at constant temperature (ΔT = 0, ΔU = 0 for ideal gas).\n- Adiabatic: Occurs with zero heat exchange with the surroundings (q = 0).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4046,
    question: "A refrigerator has an interior temperature of t₂ °C and is located in a room at t₁ °C (where t₁ > t₂). Assuming ideal Carnot operation, what is the heat delivered to the room per Joule of electrical energy consumed?",
    option_a: "(t₁ + 273) / (t₁ - t₂)",
    option_b: "(t₂ + 273) / (t₁ - t₂)",
    option_c: "(t₁ - t₂) / (t₁ + 273)",
    option_d: "(t₁ - t₂) / (t₂ + 273)",
    correct_option: "A",
    explanation: "1. Absolute temperatures: T_cold = t₂ + 273 K, T_hot = t₁ + 273 K. T_hot - T_cold = t₁ - t₂.\n2. For an ideal refrigerator: Q_hot / W = T_hot / (T_hot - T_cold).\n3. For W = 1 Joule of electrical work: Q_hot = (t₁ + 273) / (t₁ - t₂) Joules.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4047,
    question: "A refrigerator working between a cold space at 7 °C (280 K) and ambient surroundings at 35 °C (308 K) removes heat at a rate of 500 cal/s. What is the minimum theoretical mechanical power required to drive this refrigerator? (Take 1 cal = 4.2 J)",
    option_a: "210 W",
    option_b: "420 W",
    option_c: "105 W",
    option_d: "2100 W",
    correct_option: "A",
    explanation: "1. Convert rate of heat extraction into Watts: dQ_cold / dt = 500 cal/s × 4.2 J/cal = 2100 J/s = 2100 W.\n2. Calculate the Carnot coefficient of performance: COP = T_cold / (T_hot - T_cold) = 280 / (308 - 280) = 280 / 28 = 10.0.\n3. Power required: Power = (dQ_cold / dt) / COP = 2100 W / 10.0 = 210 W.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4048,
    question: "An ideal gas of molar mass M = 4.0 g/mol (0.004 kg/mol) has a molar heat capacity at constant volume of C_v = 12.5 J·K⁻¹·mol⁻¹. If the speed of sound in this gas at 300 K is 1019 m/s, what is its molar heat capacity at constant pressure C_p? (Take R = 8.31 J·K⁻¹·mol⁻¹)",
    option_a: "20.8 J·K⁻¹·mol⁻¹",
    option_b: "12.5 J·K⁻¹·mol⁻¹",
    option_c: "16.6 J·K⁻¹·mol⁻¹",
    option_d: "25.0 J·K⁻¹·mol⁻¹",
    correct_option: "A",
    explanation: "1. Mayer's relation for an ideal gas is: C_p = C_v + R.\n2. Given C_v = 12.5 J·K⁻¹·mol⁻¹ and R = 8.31 J·K⁻¹·mol⁻¹: C_p = 12.5 + 8.31 = 20.81 ≈ 20.8 J·K⁻¹·mol⁻¹.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4049,
    question: "An ideal gas is taken around a rectangular cycle on a P-V diagram between pressures P₁ and P₂ (P₂ > P₁) and volumes V₁ and V₂ (V₂ > V₁). What is the net work done by the system during this cycle?",
    option_a: "(P₂ - P₁) (V₂ - V₁)",
    option_b: "(P₂ + P₁) (V₂ - V₁)",
    option_c: "(P₂ - P₁) (V₂ + V₁)",
    option_d: "(1/2) (P₂ - P₁) (V₂ - V₁)",
    correct_option: "A",
    explanation: "1. The area enclosed by a rectangular cycle on a P-V indicator diagram is simply the product of the length of the sides.\n2. Side along the volume axis: ΔV = V₂ - V₁; Side along the pressure axis: ΔP = P₂ - P₁.\n3. Therefore, the net work done is: W_net = ΔP × ΔV = (P₂ - P₁) (V₂ - V₁).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4050,
    question: "One mole of an ideal gas initially at state A(P₀, V₀) expands isothermally to three times its volume (3V₀). It is then compressed back to its original volume V₀ at constant pressure. How is this two-step process correctly represented on a P-V diagram?",
    option_a: "An isothermal hyperbolic curve sloping downward from V₀ to 3V₀, followed by a horizontal line directed to the left from 3V₀ back to V₀",
    option_b: "A horizontal line from V₀ to 3V₀, followed by an isothermal curve",
    option_c: "A vertical line from V₀ to 3V₀, followed by a horizontal line",
    option_d: "An adiabatic curve followed by an isochoric vertical line",
    correct_option: "A",
    explanation: "1. In the first step (isothermal expansion from V₀ to 3V₀ at constant temperature T₀): P varies as P = nRT₀ / V, which is represented by a downward-sloping rectangular hyperbolic curve from (P₀, V₀) to (P₀/3, 3V₀).\n2. In the second step (isobaric compression from 3V₀ back to V₀ at constant pressure P = P₀/3): Because pressure remains constant while volume decreases, this path is represented by a straight horizontal line pointing to the left from (P₀/3, 3V₀) to (P₀/3, V₀).\n3. Hence, Option (A) correctly portrays the two-step thermodynamic trajectory.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4051,
    question: "One mole of an ideal gas initially at state A(P₀, V₀) expands isothermally to 2V₀ and then returns to V₀ at constant pressure. On a P-V diagram, what shape does this trajectory follow?",
    option_a: "A hyperbolic downward curve from V₀ to 2V₀, followed by a horizontal line segment returning from 2V₀ to V₀",
    option_b: "A straight diagonal line from V₀ to 2V₀, followed by a vertical segment",
    option_c: "A vertical line segment from V₀ to 2V₀, followed by a horizontal line",
    option_d: "A circle centered at (P₀, V₀)",
    correct_option: "A",
    explanation: "1. Isothermal expansion for an ideal gas follows PV = constant, which plots as a downward curve (rectangular hyperbola).\n2. Isobaric compression occurs at constant pressure (P = constant), which plots as a horizontal straight line towards decreasing volume.\n3. Hence, Option (A) is the correct graphical description.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4052,
    question: "An ideal gas transitions from state A to state B via three distinct paths on a P-V diagram: Path 1, Path 2, and Path 3. If the paths are situated such that the area under Path 1 > Path 2 > Path 3, which of the following relations correctly compares the heats absorbed (Q₁, Q₂, Q₃) and the internal energy changes (ΔU₁, ΔU₂, ΔU₃)?",
    option_a: "Q₁ > Q₂ > Q₃ and ΔU₁ = ΔU₂ = ΔU₃",
    option_b: "Q₁ = Q₂ = Q₃ and ΔU₁ = ΔU₂ = ΔU₃",
    option_c: "Q₁ < Q₂ < Q₃ and ΔU₁ > ΔU₂ > ΔU₃",
    option_d: "Q₁ > Q₂ > Q₃ and ΔU₁ > ΔU₂ > ΔU₃",
    correct_option: "A",
    explanation: "1. Internal energy (U) is a state function; because all three paths share the identical initial state A and final state B, the internal energy change is identical for all three paths: ΔU₁ = ΔU₂ = ΔU₃ = U_B - U_A.\n2. By the First Law of Thermodynamics: Q = ΔU + W.\n3. Work done W is the area under the curve on the P-V diagram. Since W₁ > W₂ > W₃, adding the same ΔU to each yields: Q₁ > Q₂ > Q₃.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4053,
    question: "Two thermally insulated containers of equal volume V are connected by a valve. Initially, one container holds 1 mole of an ideal gas while the second container is completely evacuated. When the valve is opened and the gas undergoes free expansion to fill both containers (final volume 2V), what is the entropy change of the gas? (Take R = 8.314 J·K⁻¹·mol⁻¹ and ln 2 = 0.693)",
    option_a: "+5.76 J/K",
    option_b: "0 J/K",
    option_c: "-5.76 J/K",
    option_d: "+2.88 J/K",
    correct_option: "A",
    explanation: "1. Free expansion of an ideal gas into a vacuum is an irreversible adiabatic process with q = 0, w = 0, and ΔT = 0 (temperature remains constant).\n2. To compute the entropy change of the system, we can replace the irreversible path with a reversible isothermal expansion between the same initial state (V₁ = V) and final state (V₂ = 2V): ΔS = n R ln(V₂ / V₁).\n3. Given n = 1 mole and V₂ / V₁ = 2: ΔS = 1 mol × (8.314 J·K⁻¹·mol⁻¹) × ln 2 = 8.314 × 0.693 ≈ +5.76 J/K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4054,
    question: "A Carnot heat engine has an efficiency of 20% and operates between two heat reservoirs whose temperature difference is 60 K. What is the temperature of the cold reservoir in °C?",
    option_a: "-33 °C (240 K)",
    option_b: "27 °C (300 K)",
    option_c: "-73 °C (200 K)",
    option_d: "0 °C (273 K)",
    correct_option: "A",
    explanation: "1. The efficiency of a Carnot engine is given by: η = (T_hot - T_cold) / T_hot.\n2. Given: η = 0.20 (20%), T_hot - T_cold = 60 K.\n3. Solving for T_hot: 0.20 = 60 / T_hot ⇒ T_hot = 60 / 0.20 = 300 K.\n4. The temperature of the cold reservoir is: T_cold = T_hot - 60 = 300 K - 60 K = 240 K.\n5. Converting to Celsius: T_cold = 240 - 273 = -33 °C.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 22 Part 5 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
