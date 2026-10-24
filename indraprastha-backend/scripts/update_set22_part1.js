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
    id: 3938,
    question: "Property A is a thermodynamic state function that is intensive, whereas Property B is a thermodynamic state function that is extensive. Which of the following pairs correctly represents A and B, respectively?",
    option_a: "Temperature, Enthalpy",
    option_b: "Volume, Pressure",
    option_c: "Internal energy, Entropy",
    option_d: "Density, Refractive index",
    correct_option: "A",
    explanation: "1. Intensive properties are independent of the amount or mass of matter in the system (e.g., Temperature, Pressure, Density, Boiling Point).\n2. Extensive properties depend directly on the quantity or mass of matter present in the system (e.g., Mass, Volume, Internal Energy, Enthalpy, Entropy, Heat Capacity).\n3. State functions depend only on the state of the system, not on the path followed.\n4. In Option (A), Temperature is an intensive state function, and Enthalpy is an extensive state function.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3939,
    question: "The molar heat capacity of liquid water at constant pressure (C_p,m) is 75.3 J·K⁻¹·mol⁻¹. What is the rise in temperature when 5.4 kJ of heat is supplied to 90 g of liquid water? (Molar mass of water = 18 g/mol)",
    option_a: "14.3 K",
    option_b: "7.2 K",
    option_c: "28.6 K",
    option_d: "3.6 K",
    correct_option: "A",
    explanation: "1. Number of moles of water: n = mass / molar mass = 90 g / (18 g/mol) = 5.0 mol.\n2. Heat supplied at constant pressure: q_p = 5.4 kJ = 5400 J.\n3. The relation between heat and temperature change is: q_p = n × C_p,m × ΔT.\n4. Solving for ΔT: ΔT = q_p / (n × C_p,m) = 5400 / (5.0 × 75.3) = 5400 / 376.5 ≈ 14.34 K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3940,
    question: "Given the standard enthalpies of formation:\nΔ_f H° [CH₄(g)] = -74.8 kJ/mol\nΔ_f H° [CO₂(g)] = -393.5 kJ/mol\nΔ_f H° [H₂O(l)] = -285.8 kJ/mol\nWhat is the standard enthalpy of combustion (Δ_c H°) of Methane per mole?",
    option_a: "-890.3 kJ/mol",
    option_b: "+890.3 kJ/mol",
    option_c: "-604.5 kJ/mol",
    option_d: "-965.1 kJ/mol",
    correct_option: "A",
    explanation: "1. The balanced thermochemical equation for the combustion of methane is: CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l).\n2. By Hess's law: Δ_c H° = [Δ_f H°(CO₂) + 2 × Δ_f H°(H₂O)] - [Δ_f H°(CH₄) + 2 × Δ_f H°(O₂)].\n3. Since O₂(g) is an element in its standard state, Δ_f H°[O₂] = 0.\n4. Substituting values: Δ_c H° = [(-393.5) + 2 × (-285.8)] - [-74.8] = [-393.5 - 571.6] + 74.8 = -965.1 + 74.8 = -890.3 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3941,
    question: "For a gaseous chemical reaction at 300 K: 2 NO(g) + O₂(g) → 2 NO₂(g), the standard enthalpy change is ΔH° = -114.1 kJ and the standard entropy change is ΔS° = -146.5 J/K. What is the standard Gibbs free energy change (ΔG°) at 300 K?",
    option_a: "-70.15 kJ",
    option_b: "-158.05 kJ",
    option_c: "-43.95 kJ",
    option_d: "+70.15 kJ",
    correct_option: "A",
    explanation: "1. The Gibbs-Helmholtz relation states: ΔG° = ΔH° - T ΔS°.\n2. Given: ΔH° = -114.1 kJ, T = 300 K, ΔS° = -146.5 J/K = -0.1465 kJ/K.\n3. Calculate T ΔS°: T ΔS° = 300 K × (-0.1465 kJ/K) = -43.95 kJ.\n4. Calculate ΔG°: ΔG° = -114.1 kJ - (-43.95 kJ) = -114.1 + 43.95 = -70.15 kJ.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3942,
    question: "Using the following bond enthalpy data:\nB.E. (H-H) = 436 kJ/mol\nB.E. (Cl-Cl) = 242 kJ/mol\nB.E. (H-Cl) = 431 kJ/mol\nEstimate the enthalpy of the reaction: H₂(g) + Cl₂(g) → 2 HCl(g).",
    option_a: "-184 kJ",
    option_b: "+184 kJ",
    option_c: "-92 kJ",
    option_d: "+92 kJ",
    correct_option: "A",
    explanation: "1. The enthalpy change of a reaction from bond enthalpies is: Δ_r H = Σ (Bond enthalpies of bonds broken) - Σ (Bond enthalpies of bonds formed).\n2. Bonds broken (Reactants): 1 mole of H-H bonds = 436 kJ, 1 mole of Cl-Cl bonds = 242 kJ. Total energy to break bonds = 436 + 242 = 678 kJ.\n3. Bonds formed (Products): 2 moles of H-Cl bonds = 2 × 431 = 862 kJ.\n4. Total enthalpy change: Δ_r H = 678 - 862 = -184 kJ.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3943,
    question: "An ideal gas absorbs 500 J of heat from its surroundings, and its internal energy increases by 300 J during an expansion against a constant external pressure of 1.0 bar. What is the change in volume (ΔV) in liters? (1 L·bar = 100 J)",
    option_a: "2.0 L",
    option_b: "1.0 L",
    option_c: "4.0 L",
    option_d: "0.5 L",
    correct_option: "A",
    explanation: "1. According to the First Law of Thermodynamics: ΔU = q + w.\n2. Given: ΔU = +300 J, q = +500 J (heat absorbed).\n3. Solving for work done (w): w = ΔU - q = 300 - 500 = -200 J.\n4. For expansion against constant external pressure P_ext: w = -P_ext × ΔV.\n5. Since 1 L·bar = 100 J: -200 J = -(100 J/L) × ΔV ⇒ ΔV = 2.0 L.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3944,
    question: "In which of the following thermodynamic processes undergone by an ideal gas does the temperature of the gas increase?",
    option_a: "Adiabatic compression",
    option_b: "Adiabatic expansion",
    option_c: "Isothermal expansion",
    option_d: "Free expansion in vacuum",
    correct_option: "A",
    explanation: "1. In an adiabatic process, heat exchange is zero (q = 0).\n2. By the First Law of Thermodynamics: ΔU = w.\n3. During adiabatic compression, work is done on the gas, so w > 0.\n4. Consequently, ΔU > 0.\n5. For an ideal gas, internal energy is directly proportional to temperature (ΔU = n C_v ΔT); hence ΔT > 0, and the temperature rises.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3945,
    question: "What is the work done when 1 mole of an ideal gas is compressed isothermally and reversibly from an initial pressure of 1.0 bar to a final pressure of 10.0 bar at a constant temperature of 300 K? (Take R = 8.314 J·K⁻¹·mol⁻¹ and ln 10 = 2.303)",
    option_a: "+5.74 kJ",
    option_b: "-5.74 kJ",
    option_c: "+2.49 kJ",
    option_d: "-2.49 kJ",
    correct_option: "A",
    explanation: "1. For an isothermal reversible compression of an ideal gas: w = +nRT ln(P₂ / P₁).\n2. Given: n = 1 mol, T = 300 K, P₁ = 1.0 bar, P₂ = 10.0 bar.\n3. Substituting: w = 1 × 8.314 × 300 × ln(10 / 1) = 2494.2 × 2.303 J ≈ +5744 J = +5.74 kJ.\n4. Work is done ON the gas during compression, so w is positive under IUPAC convention.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3946,
    question: "Given the following thermochemical data:\nEnthalpy of sublimation of Iodine: Δ_sub H° [I₂(s)] = +62.4 kJ/mol\nBond dissociation enthalpy of I₂(g) = +151.0 kJ/mol\nBond dissociation enthalpy of Cl₂(g) = +242.0 kJ/mol\nBond dissociation enthalpy of I-Cl(g) = +211.0 kJ/mol\nWhat is the standard enthalpy of formation of gaseous Iodine monochloride, Δ_f H° [ICl(g)]?",
    option_a: "+16.7 kJ/mol",
    option_b: "-16.7 kJ/mol",
    option_c: "-211.0 kJ/mol",
    option_d: "+33.4 kJ/mol",
    correct_option: "A",
    explanation: "1. Formation reaction: 1/2 I₂(s) + 1/2 Cl₂(g) → ICl(g).\n2. Summing enthalpies:\n   - Sublimation of 1/2 I₂(s): 1/2 × 62.4 = +31.2 kJ\n   - Dissociation of 1/2 I₂(g): 1/2 × 151.0 = +75.5 kJ\n   - Dissociation of 1/2 Cl₂(g): 1/2 × 242.0 = +121.0 kJ\n   - Formation of I-Cl bond: -211.0 kJ\n3. Total standard enthalpy of formation:\n   Δ_f H° = 31.2 + 75.5 + 121.0 - 211.0 = 227.7 - 211.0 = +16.7 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3947,
    question: "According to the Second Law of Thermodynamics, what is the mandatory condition for a reversible process in an isolated system or at equilibrium?",
    option_a: "ΔS_system + ΔS_surroundings = 0 (ΔS_total = 0)",
    option_b: "ΔS_system > ΔS_surroundings",
    option_c: "ΔS_system < 0 and ΔS_surroundings < 0",
    option_d: "ΔS_total > 0",
    correct_option: "A",
    explanation: "1. For any spontaneous (irreversible) process: ΔS_total = ΔS_system + ΔS_surroundings > 0.\n2. At dynamic chemical and physical equilibrium (or for a reversible process): ΔS_total = ΔS_system + ΔS_surroundings = 0, which implies ΔS_system = -ΔS_surroundings.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3948,
    question: "In a bomb calorimeter at 27 °C (300 K), the heat evolved during the complete combustion of 1 mole of liquid ethanol is measured to be 1364.5 kJ (q_v = ΔU = -1364.5 kJ/mol):\nC₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l)\nWhat is the enthalpy of combustion (ΔH) for this reaction at 27 °C? (Take R = 8.314 J·K⁻¹·mol⁻¹)",
    option_a: "-1367.0 kJ/mol",
    option_b: "-1362.0 kJ/mol",
    option_c: "-1364.5 kJ/mol",
    option_d: "-1369.5 kJ/mol",
    correct_option: "A",
    explanation: "1. The relationship between ΔH and ΔU is: ΔH = ΔU + Δn_g RT.\n2. For the reaction: C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l), Δn_g = 2 - 3 = -1 mol.\n3. Calculate Δn_g RT: (-1 mol) × (8.314 J·K⁻¹·mol⁻¹) × (300 K) = -2494.2 J = -2.49 kJ.\n4. Calculate ΔH: ΔH = -1364.5 kJ + (-2.49 kJ) ≈ -1367.0 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3949,
    question: "The standard heat of atomization of Ammonia (NH₃) is 1170 kJ/mol, and that of Hydrazine (N₂H₄) is 1720 kJ/mol. What is the bond energy of the N-N single bond?",
    option_a: "160 kJ/mol",
    option_b: "390 kJ/mol",
    option_c: "220 kJ/mol",
    option_d: "80 kJ/mol",
    correct_option: "A",
    explanation: "1. In NH₃, there are 3 identical N-H bonds:\n   Δ_a H(NH₃) = 3 × B.E.(N-H) = 1170 kJ/mol ⇒ B.E.(N-H) = 1170 / 3 = 390 kJ/mol.\n2. Hydrazine (H₂N-NH₂) contains four N-H bonds and one N-N single bond:\n   Δ_a H(N₂H₄) = 4 × B.E.(N-H) + B.E.(N-N) = 1720 kJ/mol.\n3. Substitute B.E.(N-H) = 390 kJ/mol: 4 × 390 + B.E.(N-N) = 1720 ⇒ 1560 + B.E.(N-N) = 1720 ⇒ B.E.(N-N) = 1720 - 1560 = 160 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3950,
    question: "For the gaseous dissociation reaction: A₂B₄(g) → 2 AB₂(g), at 300 K, the internal energy change is ΔU = +8.4 kJ and the entropy change is ΔS = +80.0 J/K. What is the Gibbs free energy change (ΔG) for the reaction at 300 K? (Take R = 8.314 J·K⁻¹·mol⁻¹)",
    option_a: "-13.1 kJ",
    option_b: "+13.1 kJ",
    option_c: "-8.4 kJ",
    option_d: "+24.0 kJ",
    correct_option: "A",
    explanation: "1. Δn_g = 2 - 1 = 1 mol.\n2. ΔH = ΔU + Δn_g RT = 8.4 kJ + (1 × 8.314 × 300 / 1000) kJ = 8.4 + 2.49 = +10.89 kJ.\n3. T ΔS = 300 K × (80.0 J/K) = 24,000 J = +24.0 kJ.\n4. ΔG = ΔH - T ΔS = 10.89 kJ - 24.0 kJ = -13.11 kJ ≈ -13.1 kJ.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3951,
    question: "Consider the following thermodynamic statements:\n(I) The entropy change (ΔS) for a reversible adiabatic process is zero.\n(II) The standard enthalpy of formation of an element in its standard reference state is assigned a value of zero.\n(III) The enthalpy of fusion (Δ_fus H) for a pure substance is always an endothermic quantity (positive).\nWhich of the statements are correct?",
    option_a: "(I), (II), and (III)",
    option_b: "(I) and (II) only",
    option_c: "(II) and (III) only",
    option_d: "(I) only",
    correct_option: "A",
    explanation: "1. Statement (I): For a reversible adiabatic process, dq_rev = 0; hence dS = dq_rev / T = 0 (isentropic process). Statement (I) is correct.\n2. Statement (II): By thermodynamic convention, the standard molar enthalpy of formation of an element in its most stable allotropic form at 298.15 K and 1 bar is defined as zero. Statement (II) is correct.\n3. Statement (III): Melting requires the absorption of heat to overcome intermolecular forces in the solid lattice; thus Δ_fus H > 0 for all substances. Statement (III) is correct.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3952,
    question: "Given the thermochemical data:\n(1) CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)  ΔH₁° = -890 kJ\n(2) H₂O(l) → H₂O(g)  ΔH₂° = +44 kJ\nWhat is the enthalpy change for the combustion of methane when water is produced in the vapor phase: CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(g)?",
    option_a: "-802 kJ",
    option_b: "-934 kJ",
    option_c: "-846 kJ",
    option_d: "-714 kJ",
    correct_option: "A",
    explanation: "1. The target thermochemical equation is: CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(g).\n2. We construct this by adding equation (1) to twice equation (2):\n   Equation (1): ΔH₁° = -890 kJ\n   2 × Equation (2): 2 × (+44 kJ) = +88 kJ\n3. Summing the two equations cancels 2 H₂O(l):\n   ΔH_target = -890 kJ + 88 kJ = -802 kJ.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3953,
    question: "For the complete combustion of liquid octane at 298 K:\nC₈H₁₈(l) + 25/2 O₂(g) → 8 CO₂(g) + 9 H₂O(g)\nWhat are the respective signs of ΔH, ΔS, and ΔG for this spontaneous reaction?",
    option_a: "ΔH < 0, ΔS > 0, ΔG < 0",
    option_b: "ΔH > 0, ΔS > 0, ΔG < 0",
    option_c: "ΔH < 0, ΔS < 0, ΔG > 0",
    option_d: "ΔH > 0, ΔS < 0, ΔG < 0",
    correct_option: "A",
    explanation: "1. Combustion reactions are strongly exothermic; therefore, ΔH < 0 (negative).\n2. For change in gaseous moles: Reactant gas = 12.5 moles of O₂(g); Product gas = 8 + 9 = 17 moles. Δn_g = 17 - 12.5 = +4.5 moles > 0. An increase in gaseous moles increases disorder; hence, ΔS > 0 (positive).\n3. With ΔH < 0 and ΔS > 0, ΔG = ΔH - T ΔS is negative at all temperatures, meaning the reaction is spontaneous (ΔG < 0).\n4. Thus, the signs are (-, +, -).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3954,
    question: "What is the standard Gibbs free energy change (ΔG°) at 27 °C (300 K) for a reversible reaction having an equilibrium constant K = 1.0 × 10⁴? (Take R = 8.314 J·K⁻¹·mol⁻¹ and 2.303 log₁₀(10) = 2.303)",
    option_a: "-22.97 kJ/mol",
    option_b: "+22.97 kJ/mol",
    option_c: "-9.18 kJ/mol",
    option_d: "-45.94 kJ/mol",
    correct_option: "A",
    explanation: "1. The standard Gibbs free energy is related to the equilibrium constant by: ΔG° = -2.303 R T log₁₀ K.\n2. Given: T = 300 K, K = 10⁴ ⇒ log₁₀ K = 4.\n3. Substituting values: ΔG° = -2.303 × (8.314 J·K⁻¹·mol⁻¹) × (300 K) × 4 = -22,971.5 J/mol ≈ -22.97 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3955,
    question: "Assertion (A): During a chemical combustion carried out inside a bomb calorimeter, the work done (w) by or on the system is zero.\nReason (R): A bomb calorimeter has a rigid, sealed container of constant volume where ΔV = 0, so no pressure-volume work can occur.",
    option_a: "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
    option_b: "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
    option_c: "(A) is correct but (R) is incorrect",
    option_d: "Both (A) and (R) are incorrect",
    correct_option: "A",
    explanation: "1. Work done in an expansion or compression process against pressure is given by w = -∫ P_ext dV.\n2. A bomb calorimeter is constructed with rigid, thick steel walls that maintain an absolutely fixed volume throughout the combustion process (isochoric process, ΔV = 0).\n3. Since ΔV = 0, the pressure-volume work w = -P ΔV = 0.\n4. Hence, all the energy evolved appears exclusively as heat at constant volume (q_v = ΔU).\n5. Both Assertion and Reason are correct, and Reason is the correct explanation.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3956,
    question: "The standard entropy of fusion of Benzene (C₆H₆, molar mass = 78 g/mol) at its normal melting point of 278.5 K is 35.6 J·K⁻¹·mol⁻¹. What is its specific latent heat of fusion in J/g?",
    option_a: "127.1 J/g",
    option_b: "9.91 kJ/g",
    option_c: "2.78 J/g",
    option_d: "35.6 J/g",
    correct_option: "A",
    explanation: "1. At the melting point, the solid and liquid phases are in equilibrium; thus: Δ_fus S = Δ_fus H / T_m.\n2. Molar enthalpy of fusion: Δ_fus H = T_m × Δ_fus S = 278.5 K × 35.6 J·K⁻¹·mol⁻¹ ≈ 9914.6 J/mol.\n3. Specific latent heat of fusion (per gram): L_f = Δ_fus H / (Molar mass) = 9914.6 J/mol / (78 g/mol) ≈ 127.1 J/g.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3957,
    question: "One mole of an ideal gas is heated from an initial temperature of 200 K to 400 K in a closed rigid container of fixed volume. If the molar heat capacity at constant volume is C_v,m = 12.5 J·K⁻¹·mol⁻¹, what is the entropy change (ΔS) of the gas? (Take ln 2 = 0.693)",
    option_a: "8.66 J/K",
    option_b: "17.32 J/K",
    option_c: "4.33 J/K",
    option_d: "0 J/K",
    correct_option: "A",
    explanation: "1. Because the container is rigid, the volume is constant (ΔV = 0, isochoric process).\n2. The entropy change for an isochoric process of an ideal gas is: ΔS = n C_v,m ln(T₂ / T₁).\n3. Given: n = 1 mol, C_v,m = 12.5 J·K⁻¹·mol⁻¹, T₁ = 200 K, T₂ = 400 K ⇒ T₂ / T₁ = 2.\n4. Calculate ΔS: ΔS = 1 × 12.5 × ln 2 = 12.5 × 0.693 ≈ 8.66 J/K.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3958,
    question: "For the synthesis of ammonia gas: N₂(g) + 3 H₂(g) → 2 NH₃(g), Δ_r H° = -92.4 kJ. What is the standard enthalpy of decomposition of ONE mole of ammonia into its constituent elements?",
    option_a: "+46.2 kJ/mol",
    option_b: "-46.2 kJ/mol",
    option_c: "+92.4 kJ/mol",
    option_d: "-92.4 kJ/mol",
    correct_option: "A",
    explanation: "1. The thermochemical equation given is: N₂(g) + 3 H₂(g) → 2 NH₃(g), Δ_r H° = -92.4 kJ.\n2. The decomposition of Ammonia is the exact reverse of the formation reaction: 2 NH₃(g) → N₂(g) + 3 H₂(g), ΔH = +92.4 kJ (for 2 moles of NH₃).\n3. For the decomposition of ONE mole of NH₃(g): NH₃(g) → 1/2 N₂(g) + 3/2 H₂(g), ΔH_decomp = (+92.4 kJ) / 2 = +46.2 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3959,
    question: "For the reversible reaction A(g) + B(g) ⇌ C(g) + D(g) at 300 K, the equilibrium concentrations of A, B, C, and D are found to be 1.0 M, 1.0 M, 5.0 M, and 2.0 M, respectively. What is the standard Gibbs free energy change (ΔG°) at 300 K? (Take R = 8.314 J·K⁻¹·mol⁻¹ and 2.303 log₁₀ 10 = 2.303)",
    option_a: "-5.74 kJ/mol",
    option_b: "+5.74 kJ/mol",
    option_c: "-2.87 kJ/mol",
    option_d: "+2.87 kJ/mol",
    correct_option: "A",
    explanation: "1. Calculate the equilibrium constant K_c: K_c = ([C] × [D]) / ([A] × [B]) = (5.0 × 2.0) / (1.0 × 1.0) = 10.0 / 1.0 = 10.\n2. The standard Gibbs free energy is given by: ΔG° = -2.303 R T log₁₀ K.\n3. Substituting values: ΔG° = -2.303 × (8.314 J·K⁻¹·mol⁻¹) × (300 K) × log₁₀(10) = -2.303 × 2494.2 × 1 = -5744 J/mol ≈ -5.74 kJ/mol.\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3960,
    question: "For a chemical reaction involving ideal gases, what is the exact thermodynamic relationship between the enthalpy change (ΔH) and internal energy change (ΔU) at constant temperature T?",
    option_a: "ΔH = ΔU + Δn_g RT",
    option_b: "ΔH = ΔU - Δn_g RT",
    option_c: "ΔU = ΔH + Δn_g RT",
    option_d: "ΔH = ΔU + Δn_g R / T",
    correct_option: "A",
    explanation: "1. By thermodynamic definition, enthalpy is: H = U + PV.\n2. For a change at constant temperature: ΔH = ΔU + Δ(PV).\n3. For ideal gases, PV = n_g RT; hence at constant temperature: Δ(PV) = Δ(n_g RT) = Δn_g RT.\n4. Substituting gives: ΔH = ΔU + Δn_g RT, where Δn_g = (total moles of gaseous products) - (total moles of gaseous reactants).\nTherefore, Option (A) is the correct answer."
  },
  {
    id: 3961,
    question: "When 2 moles of an ideal gas expand isothermally and reversibly from an initial volume of 5 L to a final volume of 50 L at 350 K, what is the change in internal energy (ΔU) of the gas?",
    option_a: "0 J",
    option_b: "6710 J",
    option_c: "-6710 J",
    option_d: "13420 J",
    correct_option: "A",
    explanation: "1. According to Joule's law, the internal energy of an ideal gas depends exclusively on its absolute temperature: U = f(T).\n2. In an isothermal process, the temperature remains strictly constant (ΔT = 0).\n3. The change in internal energy is: ΔU = n C_v ΔT.\n4. Since ΔT = 0, it follows that ΔU = 0 J regardless of the volume or pressure change.\nTherefore, Option (A) is the correct answer."
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
    console.log(`Set 22 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exit(1);
  }
}

run();
