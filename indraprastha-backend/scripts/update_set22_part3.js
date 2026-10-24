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
    id: 3986,
    question: "During an adiabatic expansion of an ideal gas, the pressure and absolute temperature are related by P ∝ T^(5/2). What is the ratio of specific heat capacities γ = C_p / C_v of the gas?",
    option_a: "1.67 (5/3)",
    option_b: "1.50",
    option_c: "1.40 (7/5)",
    option_d: "1.33 (4/3)",
    correct_option: "A",
    explanation: "1. For an adiabatic process of an ideal gas: P^(1 - γ) T^γ = constant ⇒ P ∝ T^(γ / (γ - 1)).\n2. We are given: P ∝ T^(5/2).\n3. Equating the exponents: γ / (γ - 1) = 5/2 ⇒ 2γ = 5γ - 5 ⇒ 3γ = 5 ⇒ γ = 5/3 ≈ 1.67.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3987,
    question: "An ideal gas is taken through a cyclic process ABCD consisting of two isobars (at P₀ and 3P₀) and two isochores (at V₀ and 4V₀) traversed in a clockwise direction. What is the net work done by the gas in one complete cycle?",
    option_a: "6 P₀ V₀",
    option_b: "12 P₀ V₀",
    option_c: "3 P₀ V₀",
    option_d: "4 P₀ V₀",
    correct_option: "A",
    explanation: "1. In a P-V indicator diagram, the net work done during a closed cycle equals the area enclosed by the cycle.\n2. The enclosed area is a rectangle with:\n   - Width (change in volume) = ΔV = 4V₀ - V₀ = 3V₀\n   - Height (change in pressure) = ΔP = 3P₀ - P₀ = 2P₀\n3. Enclosed area = ΔP × ΔV = (2P₀) × (3V₀) = 6 P₀ V₀.\n4. Since the cycle is traced in a clockwise direction, the net work done by the gas is positive: W_net = +6 P₀ V₀.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3988,
    question: "An inventor claims to have constructed a heat engine that produces 15 kW of mechanical power by consuming 2.0 g/s of a fuel having a calorific value of 1.5 kcal/g. Is this claim thermodynamically valid? (Take 1 kcal = 4.2 kJ)",
    option_a: "The claim is invalid because it violates the First Law of Thermodynamics",
    option_b: "The claim is valid if the engine operates at high temperatures",
    option_c: "The claim is valid and represents an efficiency of 100%",
    option_d: "The claim depends on the nature of the working substance",
    correct_option: "A",
    explanation: "1. Total thermal power supplied by the combustion of the fuel: Rate of heat input Q_in / t = (2.0 g/s) × (1.5 kcal/g) = 3.0 kcal/s.\n2. Convert this input rate to kilowatts: 3.0 kcal/s × 4.2 kJ/kcal = 12.6 kJ/s = 12.6 kW.\n3. The inventor claims an output mechanical power of 15 kW.\n4. An output of 15 kW from an input of 12.6 kW would correspond to an efficiency of (15 / 12.6) × 100% ≈ 119%, which generates energy from nothing.\n5. This is a perpetual motion machine of the first kind (PMM-1) and directly violates the First Law of Thermodynamics.\n6. Hence, the claim is completely invalid.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3989,
    question: "A Carnot engine operates between a hot reservoir at 127 °C and a cold reservoir at 27 °C. If it absorbs 8.0 kcal of heat from the hot reservoir per cycle, how much heat is converted into mechanical work?",
    option_a: "2.0 kcal",
    option_b: "6.0 kcal",
    option_c: "4.0 kcal",
    option_d: "1.5 kcal",
    correct_option: "A",
    explanation: "1. Convert operating temperatures to Kelvin: T_hot = 127 + 273 = 400 K; T_cold = 27 + 273 = 300 K.\n2. The efficiency of a Carnot engine is: η = 1 - (T_cold / T_hot) = 1 - (300 / 400) = 1 - 0.75 = 0.25 (or 25%).\n3. The work done per cycle is: W = η × Q_in = 0.25 × 8.0 kcal = 2.0 kcal.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3990,
    question: "One mole of an ideal gas expands according to the relation V = k T^(1/2), where k is a constant. What is the work done by the gas when its temperature increases by 40 K? (R is the universal gas constant)",
    option_a: "20 R",
    option_b: "40 R",
    option_c: "10 R",
    option_d: "80 R",
    correct_option: "A",
    explanation: "1. The relation is V = k T^(1/2).\n2. Differentiating with respect to T: dV = (1/2) (V / T) dT.\n3. Work done is: w = ∫ P dV.\n4. For 1 mole of an ideal gas, P = RT / V. w = ∫ (RT / V) × [(1/2) (V / T) dT] = (1/2) R ∫ dT = (1/2) R ΔT.\n5. With ΔT = 40 K: w = (1/2) R × 40 = 20 R.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3991,
    question: "An ideal gas with adiabatic exponent γ = 1.4 undergoes a reversible adiabatic expansion such that the root-mean-square (rms) speed of its molecules is halved (reduced by a factor of 2). By what factor did the volume of the gas increase?",
    option_a: "32 times",
    option_b: "16 times",
    option_c: "64 times",
    option_d: "4 times",
    correct_option: "A",
    explanation: "1. The rms speed is proportional to the square root of absolute temperature: v_rms ∝ √T ⇒ T ∝ v_rms².\n2. If v_rms is reduced by a factor of 2, the temperature must decrease by a factor of 4: T₂ / T₁ = (1/2)² = 1/4.\n3. For an adiabatic process of an ideal gas: T₁ V₁^(γ - 1) = T₂ V₂^(γ - 1) ⇒ (V₂ / V₁)^(γ - 1) = T₁ / T₂ = 4.\n4. Given γ = 1.4, we have γ - 1 = 0.4 = 2/5: (V₂ / V₁)^(2/5) = 4 = 2² ⇒ V₂ / V₁ = (2²)^(5/2) = 2⁵ = 32.\n5. Thus, the volume expands by a factor of 32.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3992,
    question: "An ideal gas with adiabatic exponent γ = 1.5 is expanded adiabatically until the root-mean-square velocity of its molecules becomes half of its initial value. What is the factor by which its volume expanded?",
    option_a: "16 times",
    option_b: "8 times",
    option_c: "4 times",
    option_d: "2 times",
    correct_option: "A",
    explanation: "1. v_rms ∝ √T ⇒ T ∝ v_rms². Since v_rms is halved, T drops to 1/4 of its initial value (T₂ / T₁ = 1/4).\n2. For an adiabatic process: T₁ V₁^(γ - 1) = T₂ V₂^(γ - 1) ⇒ (V₂ / V₁)^(γ - 1) = T₁ / T₂ = 4.\n3. Here γ = 1.5, so γ - 1 = 0.5 = 1/2.\n4. (V₂ / V₁)^(1/2) = 4 ⇒ V₂ / V₁ = 4² = 16 times.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3993,
    question: "Three identical samples of an ideal gas with γ = 1.5, each having the same initial volume V₀, are expanded to twice their initial volume (2V₀) via: (1) Adiabatic process, (2) Isothermal process, and (3) Isobaric process. If their final pressures are all found to be equal, what was the ratio of their initial pressures P₁ : P₂ : P₃?",
    option_a: "2√2 : 2 : 1",
    option_b: "1 : 2 : 2√2",
    option_c: "2 : 2√2 : 1",
    option_d: "4 : 2 : 1",
    correct_option: "A",
    explanation: "1. Let the common final pressure be P_f.\n2. In process (1) Adiabatic (V expands from V₀ to 2V₀): P₁ V₀^γ = P_f (2V₀)^γ ⇒ P₁ = P_f × 2^γ = P_f × 2^(1.5) = P_f × 2√2.\n3. In process (2) Isothermal (T constant): P₂ V₀ = P_f (2V₀) ⇒ P₂ = 2 P_f.\n4. In process (3) Isobaric (P constant): P₃ = P_f.\n5. Therefore, the ratio of initial pressures is: P₁ : P₂ : P₃ = 2√2 : 2 : 1.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3994,
    question: "For a monoatomic ideal gas undergoing an isobaric expansion (constant pressure), what is the ratio of the total heat absorbed (q) to the work done (w) by the gas?",
    option_a: "5 / 2",
    option_b: "3 / 2",
    option_c: "5 / 3",
    option_d: "7 / 2",
    correct_option: "A",
    explanation: "1. For an isobaric process:\n   - Heat absorbed: q = n C_p ΔT\n   - Work done: w = P ΔV = n R ΔT\n2. The ratio of heat absorbed to work done is: q / w = (n C_p ΔT) / (n R ΔT) = C_p / R.\n3. For a monoatomic ideal gas, C_p = (5/2) R.\n4. Therefore: q / w = [(5/2) R] / R = 5/2.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3995,
    question: "On a P-V diagram, a thermodynamic process follows a semi-circular path from an initial state A(P₁ = 2 atm, V₁ = 1 L) to a final state B(P₂ = 2 atm, V₂ = 5 L) with the semicircle lying above the chord AB. What is the work done by the gas during this expansion?",
    option_a: "(8 + 2π) atm·L",
    option_b: "2π atm·L",
    option_c: "8 atm·L",
    option_d: "(8 + π) atm·L",
    correct_option: "A",
    explanation: "1. The total work done equals the total area under the semi-circular curve down to the V-axis.\n2. The area under the chord AB (from V = 1 L to V = 5 L at P = 2 atm): Area_rect = P × ΔV = 2 atm × (5 - 1) L = 8 atm·L.\n3. The radius of the semicircle is r = (5 - 1) / 2 = 2 (in units of L and atm).\n4. The area of the upper semicircle: Area_semi = (1/2) π r² = (1/2) π (2)² = 2π atm·L.\n5. Therefore, the total work done is the sum of both areas: W = Area_rect + Area_semi = (8 + 2π) atm·L.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3996,
    question: "A system absorbs 120 J of heat and performs 40 J of work in going from state A to state B. When returned from state B back to state A along a different path, 30 J of heat is released. What is the work done during the return path?",
    option_a: "-50 J (50 J of work done on the system)",
    option_b: "+50 J",
    option_c: "-80 J",
    option_d: "+80 J",
    correct_option: "A",
    explanation: "1. For the forward process (A → B): ΔU_AB = q₁ + w₁ = +120 J + (-40 J) = +80 J (since work is done by the system, w₁ = -40 J).\n2. Internal energy is a state function; hence for the return path (B → A): ΔU_BA = -ΔU_AB = -80 J.\n3. In the return process, 30 J of heat is released, so q₂ = -30 J.\n4. Using the First Law of Thermodynamics: ΔU_BA = q₂ + w₂ ⇒ -80 J = -30 J + w₂ ⇒ w₂ = -80 - (-30) = -50 J.\n5. Thus, 50 J of work is performed on the system (w = -50 J in standard convention).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3997,
    question: "One mole of an ideal diatomic gas is maintained at a constant absolute temperature T. If 0.5 mole of the gas dissociates into monoatomic atoms at this constant temperature, what is the net change in internal energy if each diatomic bond requires energy ε per mole to dissociate?",
    option_a: "0.5 ε",
    option_b: "ε",
    option_c: "0.5 RT",
    option_d: "0",
    correct_option: "A",
    explanation: "1. Internal energy of an ideal gas consists of kinetic energy plus chemical bond dissociation energy.\n2. Because the temperature is held constant (isothermal), the change in internal energy of the system arises entirely from the chemical bond breaking: ΔU = n_dissociated × ε = 0.5 ε.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3998,
    question: "A 1.0 kg metal block of density 8000 kg/m³ and coefficient of volume expansion γ = 5.0 × 10⁻⁵ K⁻¹ is heated by ΔT = 40 K at a constant atmospheric pressure of 1.0 × 10⁵ Pa. What is the work done by the metal against atmospheric pressure?",
    option_a: "0.025 J",
    option_b: "0.050 J",
    option_c: "0.100 J",
    option_d: "1.000 J",
    correct_option: "A",
    explanation: "1. Volume of the metal block: V = mass / density = 1.0 kg / (8000 kg/m³) = 1.25 × 10⁻⁴ m³.\n2. Change in volume upon heating: ΔV = V × γ × ΔT = (1.25 × 10⁻⁴ m³) × (5.0 × 10⁻⁵ K⁻¹) × (40 K) = 2.5 × 10⁻⁷ m³.\n3. Work done against atmospheric pressure: w = P_atm × ΔV = (1.0 × 10⁵ N/m²) × (2.5 × 10⁻⁷ m³) = 0.025 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3999,
    question: "A gas releases 40 J of heat to the surroundings while 15 J of work is done on the gas. If the initial internal energy of the gas was 50 J, what is its final internal energy?",
    option_a: "25 J",
    option_b: "75 J",
    option_c: "105 J",
    option_d: "-5 J",
    correct_option: "A",
    explanation: "1. Heat released by the system: q = -40 J.\n2. Work done ON the system: w = +15 J.\n3. According to the First Law of Thermodynamics: ΔU = q + w = -40 J + 15 J = -25 J.\n4. The change in internal energy is: ΔU = U_final - U_initial ⇒ -25 J = U_final - 50 J ⇒ U_final = 50 - 25 = 25 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4000,
    question: "For a diatomic ideal gas (with γ = 7/5) undergoing a reversible adiabatic process, the pressure P varies with absolute temperature T according to P ∝ T^c. What is the value of exponent c?",
    option_a: "7 / 2 (3.5)",
    option_b: "5 / 2 (2.5)",
    option_c: "7 / 5 (1.4)",
    option_d: "2 / 7",
    correct_option: "A",
    explanation: "1. For a reversible adiabatic process of an ideal gas: P^(1 - γ) T^γ = constant.\n2. Rearranging to express P in terms of T: P ∝ T^(γ / (γ - 1)).\n3. For a diatomic gas, γ = 7/5: γ / (γ - 1) = (7/5) / (7/5 - 1) = (7/5) / (2/5) = 7/2 = 3.5.\n4. Thus, exponent c = 7/2.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4001,
    question: "Under what circumstances can the total internal energy of an ideal gas increase during a process carried out at a constant temperature (isothermal)?",
    option_a: "When the quantity of gas is increased by injecting additional molecules into the container",
    option_b: "When the gas expands freely into a vacuum",
    option_c: "When the gas is compressed reversibly",
    option_d: "The internal energy of an ideal gas can never increase under isothermal conditions",
    correct_option: "A",
    explanation: "1. For an ideal gas, the total internal energy is an extensive property given by: U = n C_v,m T.\n2. If temperature T is held constant, U is directly proportional to the amount of substance (number of moles, n).\n3. If additional gas molecules are pumped into the system at the same temperature (increasing n), the total internal energy U of the system will increase proportionally.\n4. In a closed system of fixed mass, U cannot change at constant T.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4002,
    question: "An ideal gas is taken from state A to state B along three different reversible paths: Path 1, Path 2, and Path 3. If the areas under the P-V curves satisfy Area₁ < Area₂ < Area₃, what is the relation between the heat absorbed along these paths (q₁, q₂, and q₃)?",
    option_a: "q₁ < q₂ < q₃",
    option_b: "q₁ = q₂ = q₃",
    option_c: "q₁ > q₂ > q₃",
    option_d: "q₁ < q₃ < q₂",
    correct_option: "A",
    explanation: "1. Internal energy U is a state function; hence the change in internal energy ΔU = U_B - U_A is identical for all three paths: ΔU₁ = ΔU₂ = ΔU₃.\n2. By the First Law of Thermodynamics: q = ΔU + w_by = ΔU + Area under P-V curve.\n3. Since Area₁ < Area₂ < Area₃, the work done along the paths follows: w₁ < w₂ < w₃.\n4. Adding the identical constant ΔU to each gives: q₁ < q₂ < q₃.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4003,
    question: "The isothermal compressibility β_T of a substance is defined as β_T = -(1/V) (∂V/∂P)_T. What is the expression for β_T for an ideal gas as a function of pressure P?",
    option_a: "β_T = 1 / P",
    option_b: "β_T = P",
    option_c: "β_T = 1 / P²",
    option_d: "β_T = γ / P",
    correct_option: "A",
    explanation: "1. For an ideal gas: V = nRT / P.\n2. Taking the partial derivative with respect to P at constant T: (∂V/∂P)_T = -nRT / P².\n3. Substituting this into the definition of isothermal compressibility: β_T = -(1/V) × (-nRT / P²) = (nRT / V) × (1 / P²).\n4. Since P = nRT / V: β_T = P × (1 / P²) = 1 / P.\n5. Thus, β_T varies inversely with pressure (rectangular hyperbola).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4004,
    question: "On a P-V diagram, two adiabatic expansion curves starting from the same initial state (P₀, V₀) represent one mole of Helium (He) and one mole of Oxygen (O₂). Which curve is steeper?",
    option_a: "The Helium curve is steeper because its adiabatic index γ (5/3) is greater than that of Oxygen (7/5)",
    option_b: "The Oxygen curve is steeper because it has more degrees of freedom",
    option_c: "Both curves have identical slopes",
    option_d: "The steepness depends on the molar mass rather than γ",
    correct_option: "A",
    explanation: "1. The slope of an adiabatic curve on a P-V diagram is given by: (dP/dV)_ad = -γ (P / V).\n2. A gas with a higher value of γ will have a steeper negative slope.\n3. For monoatomic Helium (He): γ = 5/3 ≈ 1.67. For diatomic Oxygen (O₂): γ = 7/5 = 1.40.\n4. Since γ_He > γ_O₂, the adiabatic curve for Helium drops more steeply than that for Oxygen.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4005,
    question: "At any given point of intersection on a P-V diagram for an ideal gas, how does the slope of an adiabatic curve compare to the slope of an isothermal curve?",
    option_a: "Slope of adiabatic = γ × (Slope of isothermal)",
    option_b: "Slope of isothermal = γ × (Slope of adiabatic)",
    option_c: "Slope of adiabatic = Slope of isothermal",
    option_d: "Slope of adiabatic = (1/γ) × (Slope of isothermal)",
    correct_option: "A",
    explanation: "1. For an isothermal process (PV = constant): P dV + V dP = 0  ⇒  (dP/dV)_iso = -P / V.\n2. For an adiabatic process (PV^γ = constant): γ P V^(γ - 1) dV + V^γ dP = 0  ⇒  (dP/dV)_ad = -γ (P / V).\n3. Comparing the two expressions: (dP/dV)_ad = γ × (dP/dV)_iso.\n4. Since γ > 1 for all gases, the adiabatic curve is always γ times steeper than the isothermal curve.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4006,
    question: "In a standard P-V diagram:\n(I) A vertical line segment represents an isochoric process.\n(II) A horizontal line segment represents an isobaric process.\n(III) A smooth rectangular hyperbolic curve represents an isothermal process for an ideal gas.\nWhich of these statements are correct?",
    option_a: "(I), (II), and (III)",
    option_b: "(I) and (II) only",
    option_c: "(II) and (III) only",
    option_d: "(I) and (III) only",
    correct_option: "A",
    explanation: "1. An isochoric process occurs at constant volume (V = constant), so it is plotted as a vertical line parallel to the P-axis (Statement I is correct).\n2. An isobaric process occurs at constant pressure (P = constant), so it is plotted as a horizontal line parallel to the V-axis (Statement II is correct).\n3. An isothermal process for an ideal gas follows Boyle's Law (P = nRT/V, PV = constant), which forms an equilateral (rectangular) hyperbola (Statement III is correct).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4007,
    question: "When a thermodynamic system is taken from state A to state C along a path, 60 J of work is done on the system and 25 cal of heat is absorbed by the system. What is the change in internal energy (ΔU = U_C - U_A)? (Take 1 cal = 4.2 J)",
    option_a: "+165 J",
    option_b: "+45 J",
    option_c: "-45 J",
    option_d: "+85 J",
    correct_option: "A",
    explanation: "1. Heat absorbed by the system: q = +25 cal = 25 × 4.2 J = +105 J.\n2. Work done ON the system: w = +60 J (positive when work is performed on the system).\n3. By the First Law of Thermodynamics: ΔU = q + w = 105 J + 60 J = +165 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4008,
    question: "An ideal gas is taken through a cyclic process consisting of three steps: A → B, B → C, and C → A. In one complete cycle, the net heat absorbed by the gas is +15 J. If the work done by the gas in step A → B is +35 J and step B → C is isochoric (W_BC = 0), what is the work done by the gas in step C → A?",
    option_a: "-20 J",
    option_b: "+20 J",
    option_c: "-50 J",
    option_d: "+50 J",
    correct_option: "A",
    explanation: "1. For any cyclic process, the net change in internal energy over a complete cycle is zero: ΔU_cycle = 0.\n2. By the First Law of Thermodynamics: Q_net = W_net.\n3. Given Q_net = +15 J: W_net = W_AB + W_BC + W_CA = +15 J.\n4. Substituting W_AB = +35 J and W_BC = 0: 35 + 0 + W_CA = 15 ⇒ W_CA = 15 - 35 = -20 J.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 4009,
    question: "In a Pressure-Volume (P-V) indicator diagram, a closed cyclic process executed in a CLOCKWISE direction represents:",
    option_a: "Net positive work done by the gas (heat engine)",
    option_b: "Net negative work done on the gas (refrigerator)",
    option_c: "Zero net work done",
    option_d: "Infinite work done",
    correct_option: "A",
    explanation: "1. In a closed P-V loop traversed in a clockwise direction:\n   - The upper path (expansion, dV > 0) is at a higher average pressure, so positive work done during expansion is large.\n   - The lower path (compression, dV < 0) is at a lower average pressure, so negative work done during compression is smaller in magnitude.\n2. The net area enclosed is positive: W_net = W_expansion - |W_compression| > 0.\n3. Hence, net positive work is done by the system on the surroundings (characteristic of a heat engine).\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 22 Part 3 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
