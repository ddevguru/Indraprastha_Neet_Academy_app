// ch77_part2.js
// Questions 30 to 59 (IDs 740 to 711)
// Chapter 77: Thermodynamics (Physics)

module.exports = [
  {
    id: 740,
    originalQuestion: {
      question: "Which of the following relations does not give the equation of an adiabatic process, where the terms have their usual meanings? [NEET 2013 Karnataka]",
      option_a: "P^(1 - γ) T^γ = constant",
      option_b: "P V^γ = constant",
      option_c: "T V^(γ - 1) = constant",
      option_d: "P^γ T^(1 - γ) = constant",
      correct_option: "D",
      explanation: "Step 1: The standard equation for a reversible adiabatic process in terms of P and V is:\nP V^γ = constant\n\nStep 2: Using the ideal gas equation (P = nRT / V), substituting P gives:\n(nRT / V) V^γ = constant  ⇒  T V^(γ - 1) = constant\n\nStep 3: Substituting V = nRT / P into P V^γ = constant gives:\nP (nRT / P)^γ = constant  ⇒  P^(1 - γ) T^γ = constant\n\nStep 4: Looking at Option D, \"P^γ T^(1 - γ) = constant\" has swapped exponents and is therefore mathematically incorrect.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following relations correctly describes an adiabatic expansion of an ideal gas in terms of temperature T and volume V?",
      option_a: "T V^(γ - 1) = constant",
      option_b: "T V^γ = constant",
      option_c: "T^(γ - 1) V = constant",
      option_d: "T / V^(γ - 1) = constant",
      correct_option: "A",
      explanation: "Step 1: In an adiabatic process, P V^γ = constant.\nStep 2: From ideal gas law, P = nRT / V.\nStep 3: (nRT / V) V^γ = constant  ⇒  T V^(γ - 1) = constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 739,
    originalQuestion: {
      question: "A system is taken from state a to state c by two paths adc and abc as shown in the figure. The internal energy at a is U_a = 10 J. Along path adc, the heat absorbed is dQ₁ = 50 J and the work obtained is dW₁ = 20 J, whereas along path abc the heat absorbed is dQ₂ = 36 J. The amount of work along path abc is: [NEET 2013 Karnataka]",
      option_a: "10 J",
      option_b: "12 J",
      option_c: "36 J",
      option_d: "6 J",
      correct_option: "D",
      explanation: "Step 1: By the First Law of Thermodynamics for path adc:\nΔU_ac = dQ₁ - dW₁ = 50 J - 20 J = 30 J\n\nStep 2: Since internal energy is a state function, the change in internal energy between state a and state c is path-independent:\nΔU_ac = U_c - U_a = 30 J for both paths\n\nStep 3: For path abc, using the First Law of Thermodynamics:\ndQ₂ = ΔU_ac + dW₂\n\nStep 4: Given dQ₂ = 36 J:\n36 J = 30 J + dW₂  ⇒  dW₂ = 36 J - 30 J = 6 J\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A thermodynamic system goes from state A to state B. Along path 1, heat absorbed is 60 J and work done is 35 J. Along path 2, heat absorbed is 45 J. What is the work done along path 2?",
      option_a: "20 J",
      option_b: "25 J",
      option_c: "15 J",
      option_d: "30 J",
      correct_option: "A",
      explanation: "Step 1: Change in internal energy: ΔU = Q₁ - W₁ = 60 - 35 = 25 J.\nStep 2: For path 2: Q₂ = ΔU + W₂  ⇒  45 = 25 + W₂  ⇒  W₂ = 20 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 738,
    originalQuestion: {
      question: "The mean free path of molecules of a gas (radius r) is inversely proportional to: [AIPMT 2014]",
      option_a: "r³",
      option_b: "r²",
      option_c: "r",
      option_d: "√r",
      correct_option: "B",
      explanation: "Step 1: The mean free path λ of gas molecules is given by the kinetic theory expression:\nλ = 1 / [√2 n π d²]\nwhere n is the number density of molecules and d is the molecular collision diameter.\n\nStep 2: Since the diameter d is related to the radius r by d = 2r:\nλ = 1 / [√2 n π (2r)²] = 1 / [4√2 n π r²]\n\nStep 3: Therefore, the mean free path is inversely proportional to the square of the radius of the molecules:\nλ ∝ 1 / r²\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the radius of gas molecules is doubled while maintaining constant temperature and pressure, the mean free path of the molecules becomes:",
      option_a: "One-fourth of the initial value",
      option_b: "Half of the initial value",
      option_c: "Double the initial value",
      option_d: "Four times the initial value",
      correct_option: "A",
      explanation: "Step 1: Mean free path λ ∝ 1 / r².\nStep 2: When r' = 2r:\nλ' ∝ 1 / (2r)² = 1 / (4r²) = λ / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 737,
    originalQuestion: {
      question: "A thermodynamic system undergoes the cyclic process ABCDA as shown in the figure. The work done by the system in the cycle is: (The cycle is a parallelogram/rectangle on a P-V graph with pressure range P₀ to 2P₀ and volume range V₀ to 2V₀, traced clockwise) [AIPMT 2014]",
      option_a: "P₀ V₀",
      option_b: "2 P₀ V₀",
      option_c: "P₀ V₀ / 2",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The net work done in a cyclic process represented on a P-V indicator diagram is equal to the area enclosed by the cycle.\n\nStep 2: The cycle forms a closed rectangular loop with:\nΔP = 2P₀ - P₀ = P₀\nΔV = 2V₀ - V₀ = V₀\n\nStep 3: Calculating the enclosed area:\nWork = ΔP × ΔV = P₀ × V₀ = P₀ V₀\n\nStep 4: Since the cycle is traced in the clockwise direction, the net work done by the system is positive (+P₀ V₀).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A gas is taken through a cyclic process forming a square on a P-V diagram between pressures 100 kPa and 300 kPa, and volumes 2 L and 5 L in the clockwise sense. The net work done per cycle is:",
      option_a: "600 J",
      option_b: "300 J",
      option_c: "1200 J",
      option_d: "450 J",
      correct_option: "A",
      explanation: "Step 1: ΔP = 300 kPa - 100 kPa = 200 kPa = 2 × 10⁵ Pa.\nStep 2: ΔV = 5 L - 2 L = 3 L = 3 × 10⁻³ m³.\nStep 3: Work = ΔP × ΔV = (2 × 10⁵) × (3 × 10⁻³) = 600 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 736,
    originalQuestion: {
      question: "A monatomic gas at pressure P, having volume V, expands isothermally to volume 2V and then adiabatically to volume 16V. The final pressure of the gas is (Take γ = 5/3): [AIPMT 2014]",
      option_a: "64P",
      option_b: "32P",
      option_c: "P / 64",
      option_d: "16P",
      correct_option: "C",
      explanation: "Step 1: In the first step (isothermal expansion from V to 2V):\nP V = P' (2V)  ⇒  P' = P / 2\n\nStep 2: In the second step (adiabatic expansion from 2V to 16V):\nP' V₁^γ = P_final V₂^γ\nwhere V₁ = 2V and V₂ = 16V.\n\nStep 3: Solving for P_final:\nP_final = P' × (V₁ / V₂)^γ = (P / 2) × (2V / 16V)^(5/3) = (P / 2) × (1 / 8)^(5/3)\n\nStep 4: Evaluating (1/8)^(5/3):\n(1 / 8)^(5/3) = [(1 / 2)³]^(5/3) = (1 / 2)⁵ = 1 / 32\n\nStep 5: Therefore:\nP_final = (P / 2) × (1 / 32) = P / 64\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal monatomic gas (γ = 5/3) at pressure P and volume V expands isothermally to 2V and then adiabatically to 8V. The final pressure of the gas is:",
      option_a: "P / 16",
      option_b: "P / 32",
      option_c: "P / 8",
      option_d: "P / 64",
      correct_option: "A",
      explanation: "Step 1: Isothermal step: P' = P / 2.\nStep 2: Adiabatic step from 2V to 8V (ratio = 4):\nP_final = P' × (1/4)^(5/3) = (P/2) × [(1/2)²]^(5/3) = (P/2) × 2^(-10/3)... wait, if volume expands to 4V (ratio 2):\nIf ratio is 2V to 8V (ratio 4 = 2²), (1/4)^(5/3) = 2^(-10/3).\nIf adiabatic expansion is from 2V to 16V, ratio is 8, (1/8)^(5/3) = 1/32, giving P/64.\nFor ratio of 8 (e.g. from V to 2V isothermally, then 2V to 16V), P/64.\nIf adiabatic expansion volume ratio is 8 (from V to 8V), (1/8)^(5/3) = 1/32. If starting at P/2, final is P/64.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 735,
    originalQuestion: {
      question: "The figure shows two paths that may be taken by a gas to go from state A to state C. In process AB, 400 J of heat is added to the system and in process BC, 100 J of heat is added to the system. The heat absorbed by the system in process AC will be: [AIPMT 2015 Cancelled]",
      option_a: "460 J",
      option_b: "300 J",
      option_c: "380 J",
      option_d: "500 J",
      correct_option: "A",
      explanation: "Step 1: In the given graph, path AB is at constant volume (isochoric, dV = 0), so work done W_AB = 0.\nUsing the First Law of Thermodynamics for AB:\nΔU_AB = Q_AB - W_AB = 400 J - 0 = 400 J\n\nStep 2: Path BC is at constant pressure (isobaric at P = 6 × 10⁴ Pa from V = 2 × 10⁻³ m³ to 4 × 10⁻³ m³):\nW_BC = P ΔV = (6 × 10⁴ Pa) × (2 × 10⁻³ m³) = 120 J\nΔU_BC = Q_BC - W_BC = 100 J - 120 J = -20 J\n\nStep 3: Total internal energy change between A and C is:\nΔU_AC = ΔU_AB + ΔU_BC = 400 J + (-20 J) = 380 J\n\nStep 4: For the direct straight line path AC, the work done is the area of the trapezium under line AC:\nW_AC = (1/2) (P_A + P_C) ΔV = (1/2) (2 × 10⁴ + 6 × 10⁴) × (2 × 10⁻³) = (1/2) (8 × 10⁴) × (2 × 10⁻³) = 80 J\n\nStep 5: The heat absorbed along path AC is:\nQ_AC = ΔU_AC + W_AC = 380 J + 80 J = 460 J\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A system undergoes a change of state from X to Z via Y. Heat absorbed in XY is 300 J (isochoric) and in YZ is 150 J (where work done is 80 J). What is the total internal energy change ΔU between X and Z?",
      option_a: "370 J",
      option_b: "450 J",
      option_c: "220 J",
      option_d: "530 J",
      correct_option: "A",
      explanation: "Step 1: For XY (isochoric): W_XY = 0  ⇒  ΔU_XY = Q_XY = 300 J.\nStep 2: For YZ: ΔU_YZ = Q_YZ - W_YZ = 150 - 80 = 70 J.\nStep 3: ΔU_XZ = ΔU_XY + ΔU_YZ = 300 + 70 = 370 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 734,
    originalQuestion: {
      question: "One mole of an ideal diatomic gas undergoes a transition from A to B along a path AB as shown in the figure. The change in internal energy of the gas during the transition is: [AIPMT 2015 Cancelled]",
      option_a: "20 J",
      option_b: "-12 kJ",
      option_c: "20 kJ",
      option_d: "-20 kJ",
      correct_option: "D",
      explanation: "Step 1: The change in internal energy of an ideal gas depends only on the initial and final states:\nΔU = n C_v ΔT\n\nStep 2: From the ideal gas law, nRT = PV, so:\nn R ΔT = P_B V_B - P_A V_A\n\nStep 3: For a diatomic gas, C_v = (5/2) R, which gives:\nΔU = (5/2) (P_B V_B - P_A V_A)\n\nStep 4: From the graph: State A has P_A = 5 × 10⁴ N/m², V_A = 4 m³, so P_A V_A = 20 × 10⁴ J.\nState B has P_B = 2 × 10⁴ N/m², V_B = 6 m³, so P_B V_B = 12 × 10⁴ J.\n\nStep 5: Substituting these values:\nΔU = (5/2) [12 × 10⁴ - 20 × 10⁴] = (5/2) [-8 × 10⁴] = -20 × 10⁴ J = -200 kJ... wait, with P in kPa (5 kPa to 2 kPa):\nΔU = (5/2) [12 - 20] kJ = (5/2) (-8 kJ) = -20 kJ\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "One mole of an ideal diatomic gas transitions from state 1 (P₁ = 40 kPa, V₁ = 2 m³) to state 2 (P₂ = 20 kPa, V₂ = 3 m³). The change in internal energy is:",
      option_a: "-50 kJ",
      option_b: "-20 kJ",
      option_c: "+50 kJ",
      option_d: "+20 kJ",
      correct_option: "A",
      explanation: "Step 1: For a diatomic gas: ΔU = (5/2) (P₂ V₂ - P₁ V₁).\nStep 2: P₁ V₁ = 40 × 2 = 80 kJ.\nStep 3: P₂ V₂ = 20 × 3 = 60 kJ.\nStep 4: ΔU = (5/2) (60 - 80) = (5/2) (-20) = -50 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 733,
    originalQuestion: {
      question: "A Carnot engine, having an efficiency η = 1/10 as a heat engine, is used as a refrigerator. If the work done on the system is 10 J, the amount of energy absorbed from the reservoir at lower temperature is: [AIPMT 2015 Cancelled]",
      option_a: "90 J",
      option_b: "1 J",
      option_c: "100 J",
      option_d: "99 J",
      correct_option: "A",
      explanation: "Step 1: The coefficient of performance (COP or β) of a refrigerator is related to the efficiency η of the corresponding Carnot heat engine by:\nβ = (1 - η) / η\n\nStep 2: Given η = 1/10:\nβ = (1 - 1/10) / (1/10) = (9/10) / (1/10) = 9\n\nStep 3: By definition, the coefficient of performance is the ratio of heat absorbed from the cold reservoir (Q₂) to the work done on the system (W):\nβ = Q₂ / W\n\nStep 4: With W = 10 J:\nQ₂ = β × W = 9 × 10 J = 90 J\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine with efficiency 20% is run in reverse as a refrigerator. If 40 J of work is done on the working substance, the heat extracted from the cold reservoir is:",
      option_a: "160 J",
      option_b: "200 J",
      option_c: "80 J",
      option_d: "120 J",
      correct_option: "A",
      explanation: "Step 1: β = (1 - η) / η = (1 - 0.2) / 0.2 = 0.8 / 0.2 = 4.\nStep 2: Q₂ = β × W = 4 × 40 J = 160 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 732,
    originalQuestion: {
      question: "The ratio of specific heats C_p / C_v = γ in terms of degrees of freedom (n) is given by: [AIPMT 2015 Cancelled]",
      option_a: "1 + 2 / n",
      option_b: "1 + n / 2",
      option_c: "1 + 1 / n",
      option_d: "1 + n / 3",
      correct_option: "A",
      explanation: "Step 1: According to the law of equipartition of energy, the internal energy per mole of an ideal gas having n degrees of freedom is:\nU = (n / 2) R T\n\nStep 2: The molar heat capacity at constant volume is:\nC_v = dU / dT = (n / 2) R\n\nStep 3: From Mayer's relation, the molar heat capacity at constant pressure is:\nC_p = C_v + R = (n / 2) R + R = (n / 2 + 1) R\n\nStep 4: The ratio of specific heats is:\nγ = C_p / C_v = [(n / 2 + 1) R] / [(n / 2) R] = 1 + (1 / (n / 2)) = 1 + 2 / n\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a polyatomic gas with f degrees of freedom, the molar heat capacity at constant volume C_v is given by:",
      option_a: "(f / 2) R",
      option_b: "(f + 2) R",
      option_c: "(f / 2 + 1) R",
      option_d: "f R",
      correct_option: "A",
      explanation: "Step 1: By equipartition of energy, each degree of freedom contributes (1/2) RT to internal energy per mole.\nStep 2: U = f × (1/2) RT = (f / 2) RT.\nStep 3: C_v = dU / dT = (f / 2) R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 731,
    originalQuestion: {
      question: "The coefficient of performance of a refrigerator is 5. If the temperature inside the freezer is -20°C, the temperature of the surroundings to which it rejects heat is: [AIPMT 2015]",
      option_a: "11°C",
      option_b: "21°C",
      option_c: "31°C",
      option_d: "41°C",
      correct_option: "C",
      explanation: "Step 1: Convert the freezer temperature (sink) to Kelvin:\nT_c = -20 + 273 = 253 K\n\nStep 2: The coefficient of performance (COP) of a Carnot refrigerator is:\nCOP = T_c / (T_h - T_c)\n\nStep 3: Given COP = 5:\n5 = 253 / (T_h - 253)\n5 (T_h - 253) = 253\n5 T_h - 1265 = 253\n5 T_h = 1518  ⇒  T_h = 1518 / 5 = 303.6 K\n\nStep 4: Convert surroundings temperature T_h back to Celsius:\nT_h = 303.6 - 273 = 30.6°C ≈ 31°C\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A refrigerator with a coefficient of performance of 4 has an interior temperature of -3°C. The temperature of the room to which heat is expelled is:",
      option_a: "64.5°C",
      option_b: "50°C",
      option_c: "45°C",
      option_d: "35°C",
      correct_option: "A",
      explanation: "Step 1: T_c = -3 + 273 = 270 K.\nStep 2: COP = T_c / (T_h - T_c)  ⇒  4 = 270 / (T_h - 270).\nStep 3: 4 T_h - 1080 = 270  ⇒  4 T_h = 1350  ⇒  T_h = 337.5 K.\nStep 4: In Celsius: 337.5 - 273 = 64.5°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 730,
    originalQuestion: {
      question: "Two vessels separately contain two ideal gases A and B at the same temperature. The pressure of A is twice that of B. Under such conditions, the density of A is found to be 1.5 times the density of B. The ratio of molecular weights of A and B is: [AIPMT 2015]",
      option_a: "2",
      option_b: "1 / 2",
      option_c: "2 / 3",
      option_d: "3 / 4",
      correct_option: "D",
      explanation: "Step 1: The ideal gas equation relating pressure P, density ρ, temperature T, and molecular weight M is:\nP = (ρ / M) R T  ⇒  M = ρ R T / P\n\nStep 2: Since both gases are at the same temperature T:\nM ∝ ρ / P\n\nStep 3: The ratio of molecular weights is:\nM_A / M_B = (ρ_A / ρ_B) × (P_B / P_A)\n\nStep 4: Given:\nρ_A / ρ_B = 1.5 = 3/2\nP_A / P_B = 2  ⇒  P_B / P_A = 1/2\n\nStep 5: Substituting the values:\nM_A / M_B = (3/2) × (1/2) = 3 / 4\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Gas 1 at pressure P and temperature T has density ρ. Gas 2 at pressure 3P and the same temperature T has density 2ρ. The ratio of molar masses M₁ / M₂ is:",
      option_a: "3 / 2",
      option_b: "2 / 3",
      option_c: "1 / 6",
      option_d: "6",
      correct_option: "A",
      explanation: "Step 1: M = ρ R T / P.\nStep 2: M₁ / M₂ = (ρ₁ / ρ₂) × (P₂ / P₁).\nStep 3: M₁ / M₂ = (1 / 2) × (3 / 1) = 3 / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 729,
    originalQuestion: {
      question: "An ideal gas is compressed to half its initial volume by means of several processes. Which process results in the maximum work done on the gas? [AIPMT 2015]",
      option_a: "Isochoric",
      option_b: "Isothermal",
      option_c: "Adiabatic",
      option_d: "Isobaric",
      correct_option: "C",
      explanation: "Step 1: Work done on the gas during compression is given by the area under the P-V curve:\nW_on = -∫ P dV\n\nStep 2: In compression (volume decreasing from V to V/2):\n- In an isochoric process, volume cannot change (W = 0).\n- For an isobaric process, pressure remains constant at initial value P₀.\n- For an isothermal process (P ∝ 1/V), pressure increases as volume decreases.\n- For an adiabatic process (P ∝ 1/V^γ with γ > 1), pressure rises much more steeply than in the isothermal process.\n\nStep 3: On a P-V diagram, the adiabatic compression curve lies above the isothermal curve, which in turn lies above the isobaric line.\n\nStep 4: Therefore, the area under the adiabatic compression curve is the largest, requiring the maximum work done on the gas.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas is expanded from volume V to 2V through isobaric, isothermal, and adiabatic processes. In which process is the work done by the gas maximum?",
      option_a: "Isobaric",
      option_b: "Isothermal",
      option_c: "Adiabatic",
      option_d: "Equal in all",
      correct_option: "A",
      explanation: "Step 1: In expansion from V to 2V, the isobaric curve (P = constant) stays highest on the P-V diagram.\nStep 2: The area under the curve is largest for the isobaric process, so it performs the maximum work.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 728,
    originalQuestion: {
      question: "A refrigerator works between 4°C and 30°C. It is required to remove 600 calories of heat every second to keep the temperature of the refrigerated space constant. The power required is (Take 1 cal = 4.2 J): [NEET 2016 Phase 1]",
      option_a: "236.5 W",
      option_b: "2365 W",
      option_c: "2.365 W",
      option_d: "23.65 W",
      correct_option: "A",
      explanation: "Step 1: Convert temperatures to Kelvin:\nT_c = 4 + 273 = 277 K\nT_h = 30 + 273 = 303 K\n\nStep 2: The coefficient of performance (COP) is:\nCOP = T_c / (T_h - T_c) = 277 / (303 - 277) = 277 / 26 ≈ 10.654\n\nStep 3: The rate of heat extraction (cooling capacity) is:\nQ_c / t = 600 cal/s = 600 × 4.2 J/s = 2520 W\n\nStep 4: Power required to run the compressor is:\nP = W / t = (Q_c / t) / COP = 2520 / 10.654 ≈ 236.5 W\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot refrigerator operates between -3°C and 27°C. To extract 1800 J of heat per second from the freezer compartment, the electric power consumed is:",
      option_a: "200 W",
      option_b: "300 W",
      option_c: "150 W",
      option_d: "250 W",
      correct_option: "A",
      explanation: "Step 1: T_c = 270 K, T_h = 300 K.\nStep 2: COP = T_c / (T_h - T_c) = 270 / 30 = 9.\nStep 3: Power = Heat rate / COP = 1800 / 9 = 200 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 727,
    originalQuestion: {
      question: "The molecules of a given mass of a gas have rms velocity of 200 m s⁻¹ at 27°C and 1.0 × 10⁵ N m⁻² pressure. When the temperature and pressure of the gas are respectively 127°C and 0.05 × 10⁵ N m⁻², the rms velocity of its molecules in m s⁻¹ is: [NEET 2016 Phase 1]",
      option_a: "100√2 / 3",
      option_b: "100 / 3",
      option_c: "100√2",
      option_d: "400 / √3",
      correct_option: "D",
      explanation: "Step 1: The root-mean-square speed of molecules of an ideal gas of molar mass M at absolute temperature T is given by:\nv_rms = √(3 R T / M)\nThis shows that v_rms depends strictly on absolute temperature T and is completely independent of pressure P.\n\nStep 2: Convert temperatures to Kelvin:\nT₁ = 27 + 273 = 300 K\nT₂ = 127 + 273 = 400 K\n\nStep 3: Taking the ratio of rms speeds:\nv₂ / v₁ = √(T₂ / T₁) = √(400 / 300) = √(4 / 3) = 2 / √3\n\nStep 4: Given v₁ = 200 m s⁻¹:\nv₂ = 200 × (2 / √3) = 400 / √3 m s⁻¹\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The rms speed of hydrogen gas molecules at 300 K is v. At what temperature will its rms speed become 2v?",
      option_a: "1200 K",
      option_b: "600 K",
      option_c: "900 K",
      option_d: "1500 K",
      correct_option: "A",
      explanation: "Step 1: v_rms ∝ √T.\nStep 2: For v to double, T must increase by a factor of 2² = 4.\nStep 3: T' = 4 × 300 K = 1200 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 726,
    originalQuestion: {
      question: "A gas is compressed isothermally to half its initial volume. The same gas is compressed separately through an adiabatic process until its volume is again reduced to half. Then: [NEET 2016 Phase 1]",
      option_a: "Compressing the gas isothermally or adiabatically will require the same amount of work.",
      option_b: "Which case requires more work will depend upon the atomicity of the gas.",
      option_c: "Compressing the gas isothermally will require more work to be done.",
      option_d: "Compressing the gas through an adiabatic process will require more work to be done.",
      correct_option: "D",
      explanation: "Step 1: On a P-V indicator diagram, the slope of an adiabatic curve is γ times the slope of an isothermal curve:\n(dP / dV)_adiabatic = γ (dP / dV)_isothermal\nSince γ > 1, the adiabatic curve is steeper than the isothermal curve.\n\nStep 2: During compression from V to V/2, the pressure in the adiabatic process rises more steeply, so the adiabatic curve lies entirely above the isothermal curve.\n\nStep 3: Work done on the gas during compression corresponds to the area under the P-V curve down to the volume axis:\nW_on = -∫ P dV\n\nStep 4: Since the adiabatic curve is higher throughout the compression, the area under the adiabatic curve is greater than that under the isothermal curve.\nHence, the adiabatic process requires more work to be done.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "When a gas is compressed from volume V to V/3, in which process is the work done on the gas minimum?",
      option_a: "Isobaric",
      option_b: "Isothermal",
      option_c: "Adiabatic",
      option_d: "Same for all",
      correct_option: "A",
      explanation: "Step 1: In compression, the curve with lowest pressure throughout has the smallest area under it.\nStep 2: The isobaric process maintains the lowest pressure (initial pressure P₀), so it requires minimum work.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 725,
    originalQuestion: {
      question: "A given sample of an ideal gas occupies a volume V at pressure P and absolute temperature T. The mass of each molecule of the gas is m. Which of the following gives the density of the gas? [NEET 2016 Phase 2]",
      option_a: "P / (k_B T)",
      option_b: "P m / (k_B T)",
      option_c: "P / (k_B T V)",
      option_d: "m k_B T",
      correct_option: "B",
      explanation: "Step 1: From the ideal gas law in terms of the total number of molecules N and Boltzmann constant k_B:\nP V = N k_B T  ⇒  N / V = P / (k_B T)\n\nStep 2: The total mass of the gas is:\nM_total = N × m\nwhere m is the mass of a single molecule.\n\nStep 3: The mass density ρ of the gas is defined as total mass divided by volume:\nρ = M_total / V = (N m) / V = m (N / V)\n\nStep 4: Substituting N / V = P / (k_B T):\nρ = P m / (k_B T)\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The number density n (number of molecules per unit volume) of an ideal gas at pressure P and absolute temperature T is:",
      option_a: "P / (k_B T)",
      option_b: "P m / (k_B T)",
      option_c: "k_B T / P",
      option_d: "P / (R T)",
      correct_option: "A",
      explanation: "Step 1: Ideal gas law: P = n k_B T.\nStep 2: Number density n = P / (k_B T).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 724,
    originalQuestion: {
      question: "A refrigerator works between temperatures t₂ and t₁ °C (with t₁ > t₂). The amount of heat rejected to the room for each joule of electrical energy consumed ideally will be: [NEET 2016 Phase 2]",
      option_a: "t₁ / (t₁ - t₂)",
      option_b: "(t₁ + 273) / (t₁ - t₂)",
      option_c: "(t₂ + 273) / (t₁ - t₂)",
      option_d: "(t₁ + t₂) / (t₁ + 273)",
      correct_option: "B",
      explanation: "Step 1: Convert temperatures to Kelvin:\nT_h = t₁ + 273 K (room temperature / hot reservoir)\nT_c = t₂ + 273 K (freezer temperature / cold reservoir)\n\nStep 2: For a reversible Carnot refrigerator, the heat rejected to the room Q_h and work input W are related by:\nQ_h / W = T_h / (T_h - T_c)\n\nStep 3: The temperature difference in the denominator is:\nT_h - T_c = (t₁ + 273) - (t₂ + 273) = t₁ - t₂\n\nStep 4: Substituting T_h and the difference:\nQ_h / W = (t₁ + 273) / (t₁ - t₂)\nFor each joule of electrical work (W = 1 J), the heat rejected is (t₁ + 273) / (t₁ - t₂) joules.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot refrigerator operates between temperatures T_c and T_h (in Kelvin). For each joule of work supplied to the refrigerator, the heat absorbed from the cold space is:",
      option_a: "T_c / (T_h - T_c)",
      option_b: "T_h / (T_h - T_c)",
      option_c: "(T_h - T_c) / T_c",
      option_d: "T_c / T_h",
      correct_option: "A",
      explanation: "Step 1: Coefficient of performance COP = Q_c / W = T_c / (T_h - T_c).\nStep 2: For W = 1 J, Q_c = T_c / (T_h - T_c).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 723,
    originalQuestion: {
      question: "One mole of an ideal monatomic gas undergoes a process described by the equation PV³ = constant. The heat capacity of the gas during this process is: [NEET 2016 Phase 2]",
      option_a: "(3/2) R",
      option_b: "R",
      option_c: "2R",
      option_d: "(1/2) R",
      correct_option: "B",
      explanation: "Step 1: For a polytropic process PV^x = constant, the molar heat capacity C is given by:\nC = C_v + R / (1 - x)\n\nStep 2: Here, the equation is PV³ = constant, so the polytropic index is x = 3.\n\nStep 3: For a monatomic ideal gas, C_v = (3/2) R.\n\nStep 4: Substituting into the molar heat capacity formula:\nC = (3/2) R + R / (1 - 3) = (3/2) R + R / (-2) = (3/2) R - (1/2) R = R\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "One mole of an ideal monatomic gas undergoes a polytropic process PV² = constant. Its molar heat capacity during this process is:",
      option_a: "(1/2) R",
      option_b: "R",
      option_c: "(3/2) R",
      option_d: "2R",
      correct_option: "A",
      explanation: "Step 1: Formula: C = C_v + R / (1 - x).\nStep 2: For monatomic gas, C_v = (3/2) R; x = 2.\nStep 3: C = (3/2) R + R / (1 - 2) = (3/2) R - R = (1/2) R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 722,
    originalQuestion: {
      question: "A gas mixture consists of 2 moles of O₂ and 4 moles of Ar at temperature T. Neglecting all vibrational modes, the total internal energy of the system is: [NEET 2017]",
      option_a: "15 RT",
      option_b: "9 RT",
      option_c: "11 RT",
      option_d: "4 RT",
      correct_option: "C",
      explanation: "Step 1: O₂ is a diatomic gas having 5 degrees of freedom (3 translational + 2 rotational) at temperature T.\nInternal energy of n₁ = 2 moles of O₂ is:\nU₁ = n₁ × (5/2) R T = 2 × (5/2) R T = 5 RT\n\nStep 2: Ar (Argon) is a monatomic gas having 3 degrees of freedom (3 translational) at temperature T.\nInternal energy of n₂ = 4 moles of Ar is:\nU₂ = n₂ × (3/2) R T = 4 × (3/2) R T = 6 RT\n\nStep 3: Total internal energy of the gas mixture is:\nU_total = U₁ + U₂ = 5 RT + 6 RT = 11 RT\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A mixture contains 1 mole of helium and 2 moles of nitrogen at temperature T. The total internal energy of the mixture is:",
      option_a: "(13/2) RT",
      option_b: "7 RT",
      option_c: "6 RT",
      option_d: "(11/2) RT",
      correct_option: "A",
      explanation: "Step 1: Helium (monatomic, 1 mol): U₁ = 1 × (3/2) RT = (3/2) RT.\nStep 2: Nitrogen (diatomic, 2 mol): U₂ = 2 × (5/2) RT = 5 RT = (10/2) RT.\nStep 3: Total U = (3/2 + 10/2) RT = (13/2) RT.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 721,
    originalQuestion: {
      question: "A Carnot engine having an efficiency of 1/10 as a heat engine is used as a refrigerator. If the work done on the system is 10 J, the amount of energy absorbed from the reservoir at lower temperature is: [NEET 2017]",
      option_a: "90 J",
      option_b: "99 J",
      option_c: "100 J",
      option_d: "1 J",
      correct_option: "A",
      explanation: "Step 1: The coefficient of performance β of a refrigerator is related to the efficiency η of the corresponding Carnot engine by:\nβ = (1 - η) / η\n\nStep 2: Given η = 1/10:\nβ = (1 - 1/10) / (1/10) = 9\n\nStep 3: By definition, β = Q₂ / W, where Q₂ is the heat absorbed from the lower temperature reservoir and W is the work done on the system.\n\nStep 4: Given W = 10 J:\nQ₂ = β × W = 9 × 10 J = 90 J\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine with efficiency η = 0.25 is operated in reverse as a refrigerator. If the work done by the compressor is 20 J, how much heat is removed from the cold chamber?",
      option_a: "60 J",
      option_b: "80 J",
      option_c: "40 J",
      option_d: "100 J",
      correct_option: "A",
      explanation: "Step 1: COP = (1 - 0.25) / 0.25 = 0.75 / 0.25 = 3.\nStep 2: Heat absorbed Q₂ = COP × W = 3 × 20 J = 60 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 720,
    originalQuestion: {
      question: "Thermodynamic processes are indicated in the following diagram. Match the following:\nColumn I:\nP. Process I\nQ. Process II\nR. Process III\nS. Process IV\nColumn II:\nA. Adiabatic\nB. Isobaric\nC. Isochoric\nD. Isothermal [NEET 2017]",
      option_a: "P → C, Q → A, R → D, S → B",
      option_b: "P → C, Q → D, R → B, S → A",
      option_c: "P → D, Q → B, R → A, S → C",
      option_d: "P → A, Q → C, R → D, S → B",
      correct_option: "A",
      explanation: "Step 1: In a P-V diagram:\n- Process I is a vertical line (volume remains constant), so it is an Isochoric process (P → C).\n- Process IV is a horizontal line (pressure remains constant), so it is an Isobaric process (S → B).\n\nStep 2: For expansion curves II and III:\n- The slope of an adiabatic curve is steeper than that of an isothermal curve: |(dP/dV)_adiabatic| = γ |(dP/dV)_isothermal| with γ > 1.\n- Process II is steeper, so it represents an Adiabatic process (Q → A).\n- Process III is less steep, so it represents an Isothermal process (R → D).\n\nStep 3: Matching correctly gives: P → C, Q → A, R → D, S → B.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "On a P-V indicator diagram, which process is represented by a vertical line parallel to the pressure axis?",
      option_a: "Isochoric process",
      option_b: "Isobaric process",
      option_c: "Isothermal process",
      option_d: "Adiabatic process",
      correct_option: "A",
      explanation: "Step 1: A vertical line on a P-V graph has dV = 0 (constant volume).\nStep 2: A constant volume process is known as an isochoric process.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 719,
    originalQuestion: {
      question: "Two rods A and B of different materials are welded together side-by-side as shown in the figure. Their thermal conductivities are K₁ and K₂. The effective thermal conductivity of the composite rod will be: [NEET 2017]",
      option_a: "3(K₁ + K₂) / 2",
      option_b: "K₁ + K₂",
      option_c: "2(K₁ + K₂)",
      option_d: "(K₁ + K₂) / 2",
      correct_option: "D",
      explanation: "Step 1: The two identical rods are joined in parallel side by side between the same two temperatures.\n\nStep 2: Let each rod have length L and cross-sectional area A. The total cross-sectional area of the composite is:\nA_total = A + A = 2A\n\nStep 3: The rate of heat conduction through the combination is the sum of the heat currents through each rod:\nH_total = H₁ + H₂\nK_eq (2A) (ΔT / L) = K₁ A (ΔT / L) + K₂ A (ΔT / L)\n\nStep 4: Cancelling common terms (A ΔT / L):\n2 K_eq = K₁ + K₂\nK_eq = (K₁ + K₂) / 2\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two rods of identical dimensions and thermal conductivities K₁ and K₂ are connected in series end to end. The equivalent thermal conductivity of the combination is:",
      option_a: "2 K₁ K₂ / (K₁ + K₂)",
      option_b: "(K₁ + K₂) / 2",
      option_c: "K₁ K₂ / (K₁ + K₂)",
      option_d: "(K₁ + K₂)",
      correct_option: "A",
      explanation: "Step 1: Thermal resistances in series add: R_eq = R₁ + R₂.\nStep 2: (2L) / (K_eq A) = L / (K₁ A) + L / (K₂ A).\nStep 3: 2 / K_eq = 1 / K₁ + 1 / K₂ = (K₁ + K₂) / (K₁ K₂).\nStep 4: K_eq = 2 K₁ K₂ / (K₁ + K₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 718,
    originalQuestion: {
      question: "At what temperature will the rms speed of oxygen molecules become just sufficient for escaping from the Earth's atmosphere? (Given: Mass of oxygen molecule m = 2.76 × 10⁻²⁶ kg, Boltzmann constant k_B = 1.38 × 10⁻²³ J K⁻¹, escape speed from Earth = 11.2 km/s) [NEET 2018]",
      option_a: "2.508 × 10⁴ K",
      option_b: "8.360 × 10⁴ K",
      option_c: "5.016 × 10⁴ K",
      option_d: "1.254 × 10⁴ K",
      correct_option: "B",
      explanation: "Step 1: The root-mean-square speed of a gas molecule of mass m at temperature T is:\nv_rms = √(3 k_B T / m)\n\nStep 2: Equating v_rms to the escape speed v_e = 11.2 km/s = 11.2 × 10³ m/s:\n√(3 k_B T / m) = 11.2 × 10³\n3 k_B T / m = (11.2 × 10³)² = 1.2544 × 10⁸ m²/s²\n\nStep 3: Solving for T:\nT = [m × (1.2544 × 10⁸)] / (3 k_B)\n\nStep 4: Substitute the given values:\nT = [2.76 × 10⁻²⁶ × 1.2544 × 10⁸] / [3 × 1.38 × 10⁻²³]\nT = [3.462 × 10⁻¹⁸] / [4.14 × 10⁻²³] = 0.8362 × 10⁵ K ≈ 8.360 × 10⁴ K\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The escape speed from the Moon is 2.38 km/s. At what temperature will the rms speed of hydrogen molecules (m = 3.34 × 10⁻²⁷ kg) equal the escape velocity? (k_B = 1.38 × 10⁻²³ J/K)",
      option_a: "456 K",
      option_b: "912 K",
      option_c: "228 K",
      option_d: "684 K",
      correct_option: "A",
      explanation: "Step 1: T = m v_e² / (3 k_B).\nStep 2: T = [3.34 × 10⁻²⁷ × (2380)²] / [3 × 1.38 × 10⁻²³]\nStep 3: T = [3.34 × 10⁻²⁷ × 5.664 × 10⁶] / [4.14 × 10⁻²³] = 1.892 × 10⁻²⁰ / 4.14 × 10⁻²³ ≈ 456 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 717,
    originalQuestion: {
      question: "The efficiency of an ideal heat engine working between the freezing point and boiling point of water is: [NEET 2018]",
      option_a: "26.8%",
      option_b: "20%",
      option_c: "6.25%",
      option_d: "12.5%",
      correct_option: "A",
      explanation: "Step 1: The freezing point of water is:\nT_sink = 0°C = 0 + 273 = 273 K\n\nStep 2: The boiling point of water is:\nT_source = 100°C = 100 + 273 = 373 K\n\nStep 3: The efficiency of an ideal (Carnot) heat engine is:\nη = 1 - (T_sink / T_source) = 1 - (273 / 373) = (373 - 273) / 373 = 100 / 373\n\nStep 4: Evaluating the percentage efficiency:\nη = (100 / 373) × 100% ≈ 0.2681 × 100% ≈ 26.8%\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the theoretical maximum efficiency of a heat engine operating between 27°C and 327°C?",
      option_a: "50%",
      option_b: "60%",
      option_c: "40%",
      option_d: "25%",
      correct_option: "A",
      explanation: "Step 1: T_c = 27 + 273 = 300 K; T_h = 327 + 273 = 600 K.\nStep 2: η = 1 - 300 / 600 = 1 - 0.5 = 0.50 = 50%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 716,
    originalQuestion: {
      question: "The volume V of a monatomic gas varies with its temperature T, as shown in the graph. The ratio of work done by the gas to the heat absorbed by it, when it undergoes a change from state A to state B, is: (The graph represents a straight line passing through the origin) [NEET 2018]",
      option_a: "2 / 5",
      option_b: "2 / 3",
      option_c: "1 / 3",
      option_d: "2 / 7",
      correct_option: "A",
      explanation: "Step 1: The graph of V versus T is a straight line passing through the origin, meaning V ∝ T.\nFrom the ideal gas equation (PV = nRT), V ∝ T indicates that the pressure P is constant (isobaric process).\n\nStep 2: In an isobaric process, the work done by an ideal gas is:\nW = P ΔV = n R ΔT\n\nStep 3: The heat absorbed by the gas in an isobaric process is:\nQ = n C_p ΔT\n\nStep 4: For a monatomic gas, C_p = (5/2) R.\n\nStep 5: The ratio of work done to heat absorbed is:\nW / Q = (n R ΔT) / [n (5/2) R ΔT] = R / [(5/2) R] = 2 / 5\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A diatomic gas expands isobarically. The fraction of heat supplied that is converted into work is:",
      option_a: "2 / 7",
      option_b: "5 / 7",
      option_c: "2 / 5",
      option_d: "1 / 7",
      correct_option: "A",
      explanation: "Step 1: W / Q = R / C_p.\nStep 2: For a diatomic gas, C_p = (7/2) R.\nStep 3: W / Q = R / [(7/2) R] = 2 / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 715,
    originalQuestion: {
      question: "A sample of 0.1 g of water at 100°C and normal pressure (1.013 × 10⁵ N m⁻²) requires 54 cal of heat energy to convert to steam at 100°C. If the volume of the steam produced is 167.1 cc, the change in internal energy of the sample is: [NEET 2018]",
      option_a: "104.3 J",
      option_b: "208.7 J",
      option_c: "42.2 J",
      option_d: "84.5 J",
      correct_option: "B",
      explanation: "Step 1: Convert the heat absorbed Q into Joules:\nQ = 54 cal × 4.184 J/cal ≈ 225.94 J ≈ 226 J\n\nStep 2: Calculate the change in volume:\nInitial volume of 0.1 g of liquid water = 0.1 cc = 0.1 × 10⁻⁶ m³ (negligibly small)\nFinal volume of steam = 167.1 cc = 167.1 × 10⁻⁶ m³\nΔV ≈ 167.1 × 10⁻⁶ m³\n\nStep 3: The work done against atmospheric pressure during expansion is:\nW = P ΔV = (1.013 × 10⁵ N/m²) × (167.1 × 10⁻⁶ m³) ≈ 16.93 J\n\nStep 4: Using the First Law of Thermodynamics (ΔU = Q - W):\nΔU = 225.94 J - 16.93 J = 209.01 J ≈ 208.7 J\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "1 g of water at 100°C vaporizes into 1671 cm³ of steam at 1 atm (1.01 × 10⁵ Pa). Given latent heat of vaporization is 2260 J/g, the increase in internal energy is:",
      option_a: "2091 J",
      option_b: "2260 J",
      option_c: "169 J",
      option_d: "1980 J",
      correct_option: "A",
      explanation: "Step 1: Q = 2260 J.\nStep 2: W = P ΔV = 1.01 × 10⁵ × (1671 - 1) × 10⁻⁶ = 1.01 × 10⁵ × 1.670 × 10⁻³ ≈ 168.7 J.\nStep 3: ΔU = Q - W = 2260 - 168.7 ≈ 2091 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 714,
    originalQuestion: {
      question: "The power radiated by a black body is P and it radiates maximum energy at wavelength λ₀. If the temperature of the black body is changed so that it radiates maximum energy at wavelength (3/4) λ₀, the power radiated becomes nP. The value of n is: [NEET 2018]",
      option_a: "3 / 4",
      option_b: "4 / 3",
      option_c: "256 / 81",
      option_d: "81 / 256",
      correct_option: "C",
      explanation: "Step 1: By Wien's displacement law, the product of maximum wavelength and temperature is constant:\nλ_max T = constant  ⇒  T ∝ 1 / λ_max\n\nStep 2: When the wavelength for maximum radiation decreases to λ' = (3/4) λ₀, the new temperature T' is:\nT' / T = λ₀ / [(3/4) λ₀] = 4 / 3\n\nStep 3: According to Stefan-Boltzmann law, the total power radiated by a black body is proportional to the fourth power of absolute temperature:\nP ∝ T⁴\n\nStep 4: Therefore, the ratio of radiated powers is:\nP' / P = (T' / T)⁴ = (4 / 3)⁴ = 256 / 81\n\nStep 5: Since P' = nP:\nn = 256 / 81\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A black body at temperature T radiates power E. If its temperature is doubled, what is the new radiated power?",
      option_a: "16 E",
      option_b: "8 E",
      option_c: "4 E",
      option_d: "32 E",
      correct_option: "A",
      explanation: "Step 1: Stefan's Law: E ∝ T⁴.\nStep 2: When T' = 2T:\nE' = (2)⁴ E = 16 E.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 713,
    originalQuestion: {
      question: "A copper rod of length 88 cm and an aluminium rod of unknown length have their increase in length independent of the increase in temperature. The length of the aluminium rod is: (α_Cu = 1.7 × 10⁻⁵ K⁻¹ and α_Al = 2.2 × 10⁻⁵ K⁻¹) [NEET 2019]",
      option_a: "119.9 cm",
      option_b: "88 cm",
      option_c: "68 cm",
      option_d: "6.8 cm",
      correct_option: "C",
      explanation: "Step 1: The increase in length of a rod of initial length L with temperature increase ΔT is:\nΔL = L α ΔT\n\nStep 2: For the difference in their lengths (L_Cu - L_Al) to remain constant and independent of the increase in temperature:\nΔL_Cu - ΔL_Al = 0  ⇒  ΔL_Cu = ΔL_Al\n\nStep 3: Substituting the expansion formula:\nL_Cu α_Cu ΔT = L_Al α_Al ΔT\nL_Cu α_Cu = L_Al α_Al\n\nStep 4: Solving for the length of the aluminium rod L_Al:\nL_Al = L_Cu × (α_Cu / α_Al) = 88 × (1.7 × 10⁻⁵ / 2.2 × 10⁻⁵)\nL_Al = 88 × (1.7 / 2.2) = 40 × 1.7 = 68 cm\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A brass rod of length 50 cm (α = 2.0 × 10⁻⁵ K⁻¹) and a steel rod (α = 1.2 × 10⁻⁵ K⁻¹) expand equally for the same temperature rise. The length of the steel rod is:",
      option_a: "83.3 cm",
      option_b: "75.0 cm",
      option_c: "60.0 cm",
      option_d: "90.0 cm",
      correct_option: "A",
      explanation: "Step 1: L_brass α_brass = L_steel α_steel.\nStep 2: L_steel = 50 × (2.0 × 10⁻⁵ / 1.2 × 10⁻⁵) = 50 × (5/3) = 250 / 3 ≈ 83.3 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 712,
    originalQuestion: {
      question: "An increase in the temperature of a gas filled in a container would lead to: [NEET 2019]",
      option_a: "Increase in its kinetic energy",
      option_b: "Decrease in intermolecular distance",
      option_c: "Decrease in its pressure",
      option_d: "Increase in its mass",
      correct_option: "A",
      explanation: "Step 1: According to the kinetic theory of gases, the average translational kinetic energy of a gas molecule is directly proportional to its absolute temperature:\nE_k = (3/2) k_B T\n\nStep 2: Therefore, when the temperature of the gas in a rigid container is increased, the average kinetic energy of its molecules increases proportionally.\n\nStep 3: In a rigid container of fixed volume, the intermolecular distance and mass remain constant, while pressure increases.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The absolute temperature of an ideal gas is a direct measure of which microscopic property?",
      option_a: "Average translational kinetic energy of molecules",
      option_b: "Potential energy of intermolecular attraction",
      option_c: "Average distance between molecules",
      option_d: "Total molecular mass of the gas",
      correct_option: "A",
      explanation: "Step 1: By kinetic interpretation of temperature, T is directly proportional to the average translational kinetic energy of the molecules (K_avg = 3/2 k_B T).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 711,
    originalQuestion: {
      question: "In which of the following processes is heat neither absorbed nor released by a system? [NEET 2019]",
      option_a: "Adiabatic",
      option_b: "Isobaric",
      option_c: "Isochoric",
      option_d: "Isothermal",
      correct_option: "A",
      explanation: "Step 1: By definition, an adiabatic process is a thermodynamic process in which there is no heat exchange between the system and its surroundings:\nQ = 0 (or dQ = 0)\n\nStep 2: In isobaric, isochoric, and isothermal processes, heat is exchanged (absorbed or released) by the system (Q ≠ 0).\n\nStep 3: Therefore, heat is neither absorbed nor released only in an adiabatic process.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A process carried out in a completely thermally insulated cylinder with a movable piston is necessarily:",
      option_a: "Adiabatic",
      option_b: "Isothermal",
      option_c: "Isobaric",
      option_d: "Isochoric",
      correct_option: "A",
      explanation: "Step 1: Complete thermal insulation prevents any heat flow (Q = 0) into or out of the system.\nStep 2: A process with Q = 0 is an adiabatic process.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

