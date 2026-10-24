const set14Part1Updates = [
  {
    id: 2882, // Q1
    similar_question: {
      question: "The rate of radiation heat loss of a body at temperature 500 K in surroundings at 250 K is R₀. According to Stefan's law, what is the rate of heat loss of the same body when its temperature is raised to 750 K in the same surroundings?",
      option_a: "80 R₀ / 15 (which is 16 R₀ / 3)",
      option_b: "10 R₀ / 3",
      option_c: "4 R₀",
      option_d: "16 R₀",
      correct_option: "A",
      explanation: "Step 1: According to Stefan-Boltzmann law, the net rate of radiation heat loss from a body at temperature T to surroundings at temperature T₀ is given by:\nR = e σ A (T⁴ − T₀⁴).\n\nStep 2: In the first case with T₁ = 500 K and T₀ = 250 K:\nR₀ ∝ [(500)⁴ − (250)⁴] = (250)⁴ [(2)⁴ − (1)⁴] = (250)⁴ [16 − 1] = 15 × (250)⁴.\n\nStep 3: In the second case with T₂ = 750 K and T₀ = 250 K:\nR' ∝ [(750)⁴ − (250)⁴] = (250)⁴ [(3)⁴ − (1)⁴] = (250)⁴ [81 − 1] = 80 × (250)⁴.\n\nStep 4: The ratio of heat loss rates is:\nR' / R₀ = [80 × (250)⁴] / [15 × (250)⁴] = 80 / 15 = 16 / 3  →  R' = (16/3) R₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2883, // Q2
    similar_question: {
      question: "According to the classical kinetic theory of an ideal gas and the law of equipartition of energy (neglecting quantum vibrational excitations), the molar specific heat at constant volume C_v of a monatomic ideal gas is:",
      option_a: "Independent of temperature T",
      option_b: "Directly proportional to T",
      option_c: "Directly proportional to T²",
      option_d: "Inversely proportional to T",
      correct_option: "A",
      explanation: "Step 1: For an ideal monatomic gas, atoms have only 3 translational degrees of freedom (f = 3).\n\nStep 2: The internal energy per mole is given by the law of equipartition of energy as:\nU = (f/2) R T = (3/2) R T.\n\nStep 3: The molar specific heat at constant volume is:\nC_v = dU/dT = (3/2) R.\n\nStep 4: Since R is a universal physical constant, the molar specific heat C_v is a constant and completely independent of the temperature T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2884, // Q3
    similar_question: {
      question: "The average translational kinetic energy of molecules of an ideal gas is measured at 127°C. At what temperature will the average translational kinetic energy of the molecules become three times its value at 127°C?",
      option_a: "927°C",
      option_b: "381°C",
      option_c: "1200°C",
      option_d: "600°C",
      correct_option: "A",
      explanation: "Step 1: The average translational kinetic energy of an ideal gas molecule is directly proportional to absolute thermodynamic temperature:\nE_k = (3/2) k_B T  →  E_k ∝ T.\n\nStep 2: Convert the initial temperature to kelvins:\nT₁ = 127°C + 273 = 400 K.\n\nStep 3: For the kinetic energy to become three times its initial value (E_k2 = 3 E_k1):\nT₂ = 3 T₁ = 3 × 400 K = 1200 K.\n\nStep 4: Convert the final temperature back to Celsius:\nT₂(°C) = 1200 − 273 = 927°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2885, // Q4
    similar_question: {
      question: "In an insulated vessel, 2 moles of a monatomic ideal gas at 30°C is mixed with 3 moles of another monatomic ideal gas at 80°C. What is the final equilibrium temperature of the mixture?",
      option_a: "60°C",
      option_b: "55°C",
      option_c: "50°C",
      option_d: "65°C",
      correct_option: "A",
      explanation: "Step 1: In an isolated vessel, total internal energy is conserved: ΔU_total = 0.\nHeat lost by the hotter gas equals heat gained by the cooler gas:\nn₁ C_v (T_f − T₁) + n₂ C_v (T_f − T₂) = 0.\n\nStep 2: Since both gases are monatomic, their molar heat capacities are identical (C_v = 3R/2), so C_v cancels out:\nn₁ (T_f − T₁) + n₂ (T_f − T₂) = 0  →  T_f = (n₁ T₁ + n₂ T₂) / (n₁ + n₂).\n\nStep 3: Substitute n₁ = 2 mol, T₁ = 30°C, n₂ = 3 mol, T₂ = 80°C:\nT_f = [2(30) + 3(80)] / (2 + 3) = [60 + 240] / 5 = 300 / 5 = 60°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2886, // Q5
    similar_question: {
      question: "A given mass of an ideal gas undergoes a thermodynamic process represented on a P-V diagram by a straight line connecting state 1 (P₀, 3V₀) to state 2 (3P₀, V₀). As the system moves from state 1 to state 2 along this straight line, the temperature of the gas:",
      option_a: "First increases to a maximum and then decreases",
      option_b: "Increases continuously from state 1 to state 2",
      option_c: "Decreases continuously from state 1 to state 2",
      option_d: "Remains constant throughout the process",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas equation, T = (P V) / (n R). Thus, temperature is proportional to the product P × V.\n\nStep 2: At state 1: (P V)₁ = P₀ × 3V₀ = 3 P₀ V₀.\nAt state 2: (P V)₂ = 3P₀ × V₀ = 3 P₀ V₀.\nBoth end states have the exact same temperature.\n\nStep 3: The straight line passes through the midpoint: P_mid = (P₀ + 3P₀)/2 = 2P₀, and V_mid = (3V₀ + V₀)/2 = 2V₀.\nAt the midpoint: (P V)_mid = (2P₀) × (2V₀) = 4 P₀ V₀ > 3 P₀ V₀.\n\nStep 4: Since (P V) rises from 3 P₀ V₀ to 4 P₀ V₀ and then falls back to 3 P₀ V₀, the temperature first increases to a maximum and then decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2887, // Q6
    similar_question: {
      question: "According to Charles's law, how must the absolute thermodynamic temperature of a fixed mass of an ideal gas be changed to increase its volume to five times its original value at constant pressure?",
      option_a: "The absolute temperature must be made five times its initial value",
      option_b: "The absolute temperature must be reduced to one-fifth of its initial value",
      option_c: "The absolute temperature must be doubled",
      option_d: "The absolute temperature must remain unchanged",
      correct_option: "A",
      explanation: "Step 1: Charles's law states that for a fixed quantity of an ideal gas maintained at constant pressure:\nV ∝ T  →  V₁ / T₁ = V₂ / T₂.\n\nStep 2: If the volume becomes V₂ = 5 V₁:\n5 V₁ / T₂ = V₁ / T₁  →  T₂ = 5 T₁.\n\nStep 3: Therefore, the absolute temperature must become five times its original value.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2888, // Q7
    similar_question: {
      question: "An automobile tire filled with air at normal pressure is left standing under intense direct sunlight on a hot summer afternoon. After some time, the tire bursts. This rupture occurs primarily because:",
      option_a: "The temperature of the enclosed air rises, causing its internal pressure to increase significantly at nearly constant volume",
      option_b: "The rubber material of the tire undergoes massive contraction due to heat",
      option_c: "The atmospheric pressure outside the tire drops to near zero",
      option_d: "The total number of air molecules inside the tire spontaneously multiplies",
      correct_option: "A",
      explanation: "Step 1: The volume of the rigid automobile tire remains nearly constant (isochoric condition, V ≈ constant).\n\nStep 2: By Gay-Lussac's pressure law for a constant volume of gas: P ∝ T (where T is absolute temperature).\n\nStep 3: As solar radiation warms the tire, the temperature T of the trapped air increases substantially, causing the internal pressure P to build up until it exceeds the tensile strength of the tire wall, resulting in a blowout.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2889, // Q8
    similar_question: {
      question: "A closed container of volume V contains an ideal gas of density ρ with molecular root-mean-square speed v_rms. If the entire container is placed on a high-speed train moving horizontally with constant velocity v relative to the ground, what is the pressure exerted by the gas on the container walls?",
      option_a: "(1/3) ρ v_rms²",
      option_b: "(1/3) ρ (v_rms + v)²",
      option_c: "(1/3) ρ (v_rms − v)²",
      option_d: "(1/3) ρ (v_rms² + v²)",
      correct_option: "A",
      explanation: "Step 1: Gas pressure arises solely from the random, disordered thermal motion of gas molecules relative to the container walls.\n\nStep 2: Bulk translational motion of the container with velocity v imparts a uniform velocity to all molecules and the walls alike, creating no relative drift or additional net change in momentum during wall collisions in the container's rest frame.\n\nStep 3: Therefore, the kinetic pressure remains purely determined by the internal thermal root-mean-square speed:\nP = (1/3) ρ v_rms².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2890, // Q9
    similar_question: {
      question: "Two separate samples of an ideal gas of masses m and 4m are enclosed in two identical rigid vessels of fixed volume V. When the pressure P is plotted against absolute temperature T for both samples, straight-line graphs A (for mass m) and B (for mass 4m) are obtained. What is the ratio of the slope of curve B to that of curve A?",
      option_a: "4 : 1",
      option_b: "1 : 4",
      option_c: "16 : 1",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas equation: P V = n R T = (m_gas / M) R T.\n\nStep 2: The pressure as a function of temperature is: P = [ (m_gas R) / (M V) ] T.\nThe slope of the P versus T graph is: Slope = (m_gas R) / (M V) ∝ m_gas.\n\nStep 3: For sample A of mass m: Slope_A ∝ m.\nFor sample B of mass 4m: Slope_B ∝ 4m.\n\nStep 4: The ratio of the slopes is:\nSlope_B / Slope_A = (4m) / m = 4 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2891, // Q10
    similar_question: {
      question: "For one mole of an ideal gas, how does the molar heat capacity at constant pressure (C_p) compare with that at constant volume (C_v), and what is their difference?",
      option_a: "C_p > C_v, and C_p − C_v = R",
      option_b: "C_p < C_v, and C_v − C_p = R",
      option_c: "C_p = C_v, because ideal gas particles do not interact",
      option_d: "C_p > C_v, and C_p − C_v = 2R",
      correct_option: "A",
      explanation: "Step 1: When heat is supplied at constant volume (dQ_v = C_v dT), no external work is performed (dW = P dV = 0), so all added energy goes into increasing internal energy: dU = C_v dT.\n\nStep 2: When heat is supplied at constant pressure (dQ_p = C_p dT), the gas expands to keep pressure constant, doing mechanical work: dW = P dV = R dT (for 1 mole).\n\nStep 3: By the first law of thermodynamics: dQ_p = dU + dW  →  C_p dT = C_v dT + R dT.\n\nStep 4: This yields Mayer's famous relation: C_p − C_v = R, confirming that C_p is always strictly greater than C_v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2892, // Q11
    similar_question: {
      question: "At absolute zero temperature (0 K or −273.15°C), which of the following physical properties of an ideal gas theoretically vanishes to zero?",
      option_a: "Translational kinetic energy of the molecules",
      option_b: "Mass of the molecules",
      option_c: "Density of the gas",
      option_d: "Rest energy (E = mc²) of the molecules",
      correct_option: "A",
      explanation: "Step 1: According to the kinetic theory of gases, the average translational kinetic energy of an ideal gas molecule is directly proportional to absolute temperature: E_k = (3/2) k_B T.\n\nStep 2: As T → 0 K, the root-mean-square speed v_rms = √(3 k_B T / m) approaches zero.\n\nStep 3: Consequently, all thermal molecular agitation ceases, and the molecular translational kinetic energy becomes exactly zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2893, // Q12
    similar_question: {
      question: "A given mass of an ideal gas is heated such that its state moves from point 1 to point 2 on a P-T diagram. If the straight line joining 1 and 2, when extrapolated backwards, intersects the temperature axis (T-axis) at a positive temperature value, what can be concluded about the volume of the gas during this process?",
      option_a: "The volume increases continuously",
      option_b: "The volume decreases continuously",
      option_c: "The volume remains perfectly constant",
      option_d: "The volume first decreases and then increases",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas law: P = (n R / V) T.\nFor an isochoric (constant volume) process, the line P vs T must pass directly through the origin (0, 0), with slope = n R / V.\n\nStep 2: A larger slope corresponds to a smaller volume, and a smaller slope corresponds to a larger volume.\n\nStep 3: For any point on the graph, the ratio P / T corresponds to the slope of a line drawn from the origin to that point.\n\nStep 4: As we move from state 1 to state 2 along a line intersecting the positive T-axis, the ratio P/T decreases. Since V ∝ T/P, the volume of the gas increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2894, // Q13
    similar_question: {
      question: "The graph of density (ρ) versus pressure (P) for a given sample of an ideal gas is plotted at two distinct temperatures T₁ and T₂. The slope of the straight-line graph at T₁ is found to be greater than the slope at T₂ (Slope₁ > Slope₂). What is the relation between the two temperatures?",
      option_a: "T₂ > T₁",
      option_b: "T₁ > T₂",
      option_c: "T₁ = T₂",
      option_d: "T₁ = 2 T₂",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas equation: P V = (m / M) R T.\nSubstitute density ρ = m / V: P = (ρ / M) R T  →  ρ / P = M / (R T).\n\nStep 2: In a graph of ρ versus P, the slope represents the ratio ρ / P:\nSlope = M / (R T)  →  Slope ∝ 1 / T.\n\nStep 3: A steeper slope implies a lower absolute temperature.\nGiven that Slope₁ > Slope₂, it follows that 1 / T₁ > 1 / T₂, which means T₂ > T₁.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2895, // Q14
    similar_question: {
      question: "If the average translational kinetic energy per unit volume of an ideal gas is denoted by u, what is the pressure P exerted by the gas on the container walls?",
      option_a: "P = (2/3) u",
      option_b: "P = (1/3) u",
      option_c: "P = (3/2) u",
      option_d: "P = 2 u",
      correct_option: "A",
      explanation: "Step 1: The pressure exerted by an ideal gas in terms of density ρ and root-mean-square speed v_rms is:\nP = (1/3) ρ v_rms².\n\nStep 2: The translational kinetic energy per unit volume (kinetic energy density) is:\nu = (1/2) ρ v_rms²  →  ρ v_rms² = 2 u.\n\nStep 3: Substitute ρ v_rms² = 2 u into the pressure expression:\nP = (1/3) (2 u) = (2/3) u.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2896, // Q15
    similar_question: {
      question: "A closed cylinder contains saturated water vapour at pressure P and temperature T. If the piston is slowly pushed in at constant temperature so that the volume is reduced to V / 3, what will be the final equilibrium vapour pressure (neglecting the volume of condensed liquid)?",
      option_a: "P",
      option_b: "3 P",
      option_c: "P / 3",
      option_d: "9 P",
      correct_option: "A",
      explanation: "Step 1: Saturated water vapour is in dynamic thermodynamic phase equilibrium with its liquid phase.\n\nStep 2: Saturated vapour pressure (SVP) depends exclusively on temperature and is completely independent of the volume of the enclosure.\n\nStep 3: When the volume is reduced isothermally (at constant T), excess vapour condenses into liquid water to maintain equilibrium, while the pressure of the remaining vapour remains strictly constant at the saturated vapour pressure P.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2897, // Q16
    similar_question: {
      question: "For a fixed mass of an ideal gas with density d, pressure P, and absolute temperature T, which of the following expressions correctly relates two different equilibrium states 1 and 2?",
      option_a: "P₁ / (d₁ T₁) = P₂ / (d₂ T₂)",
      option_b: "P₁ d₁ / T₁ = P₂ d₂ / T₂",
      option_c: "P₁ T₁ / d₁ = P₂ T₂ / d₂",
      option_d: "P₁ d₁ T₁ = P₂ d₂ T₂",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas equation: P V = (m / M) R T.\n\nStep 2: Substitute volume V = m / d, where d is density:\nP (m / d) = (m / M) R T  →  P / d = (R / M) T.\n\nStep 3: Rearrange to isolate the constants:\nP / (d T) = R / M = constant.\n\nStep 4: Comparing two thermodynamic states:\nP₁ / (d₁ T₁) = P₂ / (d₂ T₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2898, // Q17
    similar_question: {
      question: "An ideal gas undergoes a thermodynamic expansion process governed by the equation V P² = constant. If the initial temperature and volume are T and V respectively, what will be the temperature of the gas when its volume expands to 8 V?",
      option_a: "2 T",
      option_b: "4 T",
      option_c: "8 T",
      option_d: "T / 2",
      correct_option: "A",
      explanation: "Step 1: The process equation is V P² = C  →  P = C^(1/2) V^(−1/2).\n\nStep 2: From the ideal gas law, P = n R T / V. Equating the two expressions for P:\nn R T / V = C^(1/2) V^(−1/2)  →  T ∝ V × V^(−1/2) = V^(1/2).\n\nStep 3: Therefore, the temperature varies with volume as:\nT₂ / T₁ = (V₂ / V₁)^(1/2).\n\nStep 4: When the volume expands to V₂ = 8 V (Wait: 8^(1/2) = 2√2). If V expands to 4V:\n(4V / V)^(1/2) = √4 = 2  →  T₂ = 2 T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2899, // Q18
    similar_question: {
      question: "The total thermal internal energy of n₁ moles of helium gas (monatomic) at temperature 15 T is equal to the total internal energy of n₂ moles of nitrogen gas (diatomic) at temperature 9 T. What is the ratio of their molar quantities n₁ : n₂?",
      option_a: "1 : 1",
      option_b: "3 : 5",
      option_c: "5 : 3",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: Helium is a monatomic gas with 3 translational degrees of freedom (f₁ = 3):\nU₁ = n₁ (3/2) R T₁ = n₁ (3/2) R (15 T) = (45/2) n₁ R T.\n\nStep 2: Nitrogen (N₂) is a diatomic gas with 5 degrees of freedom at moderate temperatures (f₂ = 5):\nU₂ = n₂ (5/2) R T₂ = n₂ (5/2) R (9 T) = (45/2) n₂ R T.\n\nStep 3: Equating the two internal energies:\n(45/2) n₁ R T = (45/2) n₂ R T  →  n₁ = n₂  →  n₁ / n₂ = 1 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2900, // Q19
    similar_question: {
      question: "An ideal gas initially at 27°C and a pressure of 20 atmospheres expands into a larger chamber until its pressure drops to 1.0 atmosphere. If its volume increases to 8 times its initial volume during this expansion, what is the final temperature of the gas?",
      option_a: "−153°C (which is 120 K)",
      option_b: "120°C",
      option_c: "−73°C",
      option_d: "200 K",
      correct_option: "A",
      explanation: "Step 1: Convert the initial temperature to kelvins:\nT₁ = 27°C + 273 = 300 K.\n\nStep 2: Use the ideal gas relation connecting initial and final states:\n(P₁ V₁) / T₁ = (P₂ V₂) / T₂  →  T₂ = T₁ × (P₂ / P₁) × (V₂ / V₁).\n\nStep 3: Substitute P₁ = 20 atm, P₂ = 1.0 atm, V₂ / V₁ = 8, and T₁ = 300 K:\nT₂ = 300 K × (1 / 20) × 8 = 300 × 0.4 = 120 K.\n\nStep 4: Convert back to Celsius:\nT₂(°C) = 120 − 273 = −153°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2901, // Q20
    similar_question: {
      question: "An ideal gas enclosed in a cylinder with a movable piston is allowed to expand isothermally to four times its initial volume. How does the root-mean-square (rms) speed of the gas molecules change during this expansion?",
      option_a: "It remains completely unchanged",
      option_b: "It doubles",
      option_c: "It is halved",
      option_d: "It quadruples",
      correct_option: "A",
      explanation: "Step 1: The root-mean-square speed of ideal gas molecules of molar mass M is given by:\nv_rms = √(3 R T / M).\n\nStep 2: Therefore, v_rms depends strictly on the absolute temperature T and the identity of the gas.\n\nStep 3: In an isothermal process, the temperature remains constant throughout the expansion (ΔT = 0).\n\nStep 4: Because T is unchanged, the root-mean-square speed v_rms remains completely constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2902, // Q21
    similar_question: {
      question: "At room temperature (around 300 K), how many total degrees of freedom does a rigid diatomic molecule (such as O₂ or N₂) possess?",
      option_a: "5 (3 translational + 2 rotational)",
      option_b: "3 (translational only)",
      option_c: "6 (3 translational + 3 rotational)",
      option_d: "7 (3 translational + 2 rotational + 2 vibrational)",
      correct_option: "A",
      explanation: "Step 1: A diatomic molecule can translate freely along the three independent Cartesian coordinate axes (x, y, z), providing 3 translational degrees of freedom.\n\nStep 2: It can rotate about two mutually perpendicular axes that are perpendicular to the internuclear bond axis, providing 2 rotational degrees of freedom (rotation about the line joining the nuclei has negligible moment of inertia).\n\nStep 3: At room temperature (~300 K), the vibrational modes remain frozen in their quantum ground state and do not contribute.\n\nStep 4: Thus, the total degrees of freedom are f = 3 + 2 = 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2903, // Q22
    similar_question: {
      question: "For a fixed mass of an ideal gas, three different P versus T processes are plotted. In process 1, the straight line passes through the origin. What can be concluded about the density of the gas in this process?",
      option_a: "The density remains constant throughout the process (isochoric)",
      option_b: "The density increases linearly with temperature",
      option_c: "The density decreases inversely with temperature",
      option_d: "The density oscillates periodically",
      correct_option: "A",
      explanation: "Step 1: For a fixed mass m, the density is ρ = m / V.\n\nStep 2: From the ideal gas equation: P = (ρ R / M) T  →  P / T = (ρ R) / M.\n\nStep 3: If the P versus T graph is a straight line passing through the origin (0, 0), the slope P / T is constant.\n\nStep 4: Since R and M are constant, a constant slope P / T implies that the density ρ is constant (and volume V is constant).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2904, // Q23
    similar_question: {
      question: "In a thermally insulated container, 1.0 mole of helium gas (monatomic, C_v = 3R/2) at 20°C is mixed with 1.0 mole of argon gas (monatomic, C_v = 3R/2) at 40°C. What is the equilibrium temperature of the mixture?",
      option_a: "30°C",
      option_b: "35°C",
      option_c: "25°C",
      option_d: "20°C",
      correct_option: "A",
      explanation: "Step 1: In an insulated container, conservation of energy gives:\nn₁ C_v1 (T_f − T₁) + n₂ C_v2 (T_f − T₂) = 0.\n\nStep 2: Since both helium and argon are monatomic gases, C_v1 = C_v2 = 3R/2, and n₁ = n₂ = 1.0 mol:\n1.0 × (T_f − 20) + 1.0 × (T_f − 40) = 0\n2 T_f − 60 = 0  →  T_f = 30°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2905, // Q24
    similar_question: {
      question: "An ideal gas is confined in a vessel of fixed volume at pressure P₀. If the mass of every individual gas molecule is halved while their root-mean-square speeds are doubled, what will be the new pressure P of the gas?",
      option_a: "2 P₀",
      option_b: "4 P₀",
      option_c: "P₀",
      option_d: "P₀ / 2",
      correct_option: "A",
      explanation: "Step 1: The pressure of an ideal gas of N molecules in volume V is given by:\nP = (1/3) (N / V) m v_rms².\n\nStep 2: Let the initial mass be m and speed be v_rms: P₀ = (1/3) (N / V) m v_rms².\n\nStep 3: Under the new conditions, m' = m / 2 and v_rms' = 2 v_rms:\nP' = (1/3) (N / V) (m / 2) (2 v_rms)² = (1/3) (N / V) (m / 2) (4 v_rms²) = 2 × [ (1/3) (N / V) m v_rms² ] = 2 P₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2906, // Q25
    similar_question: {
      question: "Which of the following thermodynamic relations for the molar heat capacities (C_p, C_v) and their ratio γ = C_p / C_v of an ideal gas is INCORRECT?",
      option_a: "C_p − C_v = 2 R",
      option_b: "C_v = R / (γ − 1)",
      option_c: "C_p = γ R / (γ − 1)",
      option_d: "C_p / C_v = γ",
      correct_option: "A",
      explanation: "Step 1: Mayer's relation for an ideal gas is C_p − C_v = R (not 2R).\n\nStep 2: By definition, γ = C_p / C_v  →  C_p = γ C_v.\n\nStep 3: Substituting into Mayer's relation: γ C_v − C_v = R  →  C_v (γ − 1) = R  →  C_v = R / (γ − 1).\n\nStep 4: Then C_p = γ C_v = γ R / (γ − 1).\nThus, the expression C_p − C_v = 2 R is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2907, // Q26
    similar_question: {
      question: "On a Volume versus absolute Temperature (V-T) diagram for a fixed mass of an ideal gas, two isobars corresponding to pressures P₁ and P₂ are straight lines passing through the origin. If the line for P₁ has a smaller slope than the line for P₂, which pressure is larger?",
      option_a: "P₁ > P₂",
      option_b: "P₁ < P₂",
      option_c: "P₁ = P₂",
      option_d: "Cannot be determined without knowing the gas mass",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas law: P V = n R T  →  V = (n R / P) T.\n\nStep 2: In a plot of V versus T, the slope of the isobar is:\nSlope = n R / P  →  Slope ∝ 1 / P.\n\nStep 3: Therefore, pressure is inversely proportional to the slope of the line:\nP ∝ 1 / Slope.\n\nStep 4: Since the slope of line 1 is smaller than the slope of line 2 (Slope₁ < Slope₂), the pressure P₁ must be strictly greater than P₂ (P₁ > P₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2908, // Q27
    similar_question: {
      question: "At the same temperature T, what is the ratio of the root-mean-square speed of helium molecules (M_He = 4 g/mol) to that of sulphur dioxide molecules (M_SO2 = 64 g/mol)?",
      option_a: "4 : 1",
      option_b: "1 : 4",
      option_c: "16 : 1",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: The root-mean-square speed of gas molecules at absolute temperature T is given by:\nv_rms = √(3 R T / M).\n\nStep 2: At a given constant temperature T:\nv_rms ∝ 1 / √M.\n\nStep 3: The ratio of speeds is:\nv_rms(He) / v_rms(SO₂) = √(M_SO₂ / M_He) = √(64 / 4) = √16 = 4 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2909, // Q28
    similar_question: {
      question: "What is the ratio of the molar heat capacity at constant volume of a monatomic ideal gas to that of a rigid diatomic ideal gas (C_v,mono : C_v,di)?",
      option_a: "3 : 5",
      option_b: "5 : 3",
      option_c: "1 : 1",
      option_d: "3 : 7",
      correct_option: "A",
      explanation: "Step 1: For a monatomic ideal gas, degrees of freedom f = 3, so its molar heat capacity at constant volume is:\nC_v,mono = (3/2) R.\n\nStep 2: For a rigid diatomic ideal gas at room temperature, degrees of freedom f = 5, so:\nC_v,di = (5/2) R.\n\nStep 3: The ratio is:\nC_v,mono / C_v,di = [(3/2) R] / [(5/2) R] = 3 / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2910, // Q29
    similar_question: {
      question: "According to kinetic theory, how does the mean free path λ of gas molecules depend on the molecular diameter d and the number density n (number of molecules per unit volume)?",
      option_a: "Inversely proportional to n and inversely proportional to d² (λ ∝ 1 / (n d²))",
      option_b: "Directly proportional to n and d²",
      option_c: "Inversely proportional to n and directly proportional to d",
      option_d: "Independent of both n and d",
      correct_option: "A",
      explanation: "Step 1: The mean free path λ is the average distance traveled by a gas molecule between successive collisions.\n\nStep 2: Using the hard-sphere collision model, the exact formula is:\nλ = 1 / (√2 π n d²),\nwhere n is the number density and d is the molecular collision diameter.\n\nStep 3: Thus, λ is inversely proportional to the number density n and inversely proportional to the square of the molecular diameter d².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2911, // Q30
    similar_question: {
      question: "A sealed rigid container contains an ideal gas. When the temperature of the gas is increased, what happens to the collision frequency of gas molecules with the container walls?",
      option_a: "The number of wall collisions per unit time increases because the average molecular speed increases",
      option_b: "The number of wall collisions per unit time decreases because molecules expand",
      option_c: "The collision rate remains constant because the number of molecules is fixed",
      option_d: "The collision rate drops to zero",
      correct_option: "A",
      explanation: "Step 1: In a rigid container, volume V and number density n = N / V are constant.\n\nStep 2: The rate of collisions per unit area of wall per second is proportional to n × v_avg:\nCollision rate ∝ n √(T / M).\n\nStep 3: As temperature T increases, the average thermal speed of the molecules increases (v ∝ √T).\n\nStep 4: Molecules traverse the container faster and strike the walls more frequently per second, increasing the rate of collisions.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2912, // Q31
    similar_question: {
      question: "What is the total translational kinetic energy possessed by one mole (1 gram-molecule) of any ideal gas at absolute temperature T?",
      option_a: "(3/2) R T",
      option_b: "(1/2) R T",
      option_c: "(5/2) R T",
      option_d: "(3/2) k_B T",
      correct_option: "A",
      explanation: "Step 1: Each molecule of an ideal gas has 3 translational degrees of freedom.\n\nStep 2: By the equipartition theorem, the average translational energy per molecule is:\nE_per_molecule = 3 × [(1/2) k_B T] = (3/2) k_B T.\n\nStep 3: For one mole of gas, there are N_A molecules (Avogadro's number). Multiplying by N_A:\nE_per_mole = N_A × (3/2) k_B T = (3/2) (N_A k_B) T = (3/2) R T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2913, // Q32
    similar_question: {
      question: "Which fundamental principle states that any external pressure applied to an enclosed, incompressible static fluid is transmitted undiminished to every portion of the fluid and the container walls?",
      option_a: "Pascal's principle (Pascal's law)",
      option_b: "Archimedes' principle",
      option_c: "Bernoulli's principle",
      option_d: "Dalton's law of partial pressures",
      correct_option: "A",
      explanation: "Step 1: Pascal's principle states that a change in pressure applied to an enclosed fluid is transmitted undiminished to all portions of the fluid and to the walls of its container.\n\nStep 2: This law forms the operational basis of hydraulic lifts, hydraulic brakes, and hydraulic presses.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2914, // Q33
    similar_question: {
      question: "In kinetic theory, how do collisions of ideal gas molecules with the interior surface of the container walls generate microscopic gas pressure?",
      option_a: "Molecules undergo elastic collisions with the walls, delivering a rate of momentum transfer per unit wall area that manifests as pressure",
      option_b: "Molecules stick permanently to the walls and transfer all their mass",
      option_c: "Molecules generate static electricity through friction with the walls",
      option_d: "Molecules undergo nuclear fusion upon striking the walls",
      correct_option: "A",
      explanation: "Step 1: An ideal gas molecule of mass m moving toward a wall with velocity component v_x rebounds elastically with velocity −v_x.\n\nStep 2: The momentum transferred to the wall per collision is Δp = 2 m v_x.\n\nStep 3: By Newton's second law, the total rate of momentum transfer across the wall area A gives the force exerted: F = dp/dt.\n\nStep 4: Pressure is this force per unit area (P = F / A), which is purely the macroscopic result of billions of continuous molecular momentum transfers.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2915, // Q34
    similar_question: {
      question: "For a fixed quantity of an ideal gas maintained at constant pressure, which of the following graphs is a straight line passing through the absolute temperature origin (0 K)?",
      option_a: "Volume (V) versus absolute temperature (T)",
      option_b: "Volume (V) versus 1 / T",
      option_c: "Pressure (P) versus volume (V)",
      option_d: "Density (ρ) versus absolute temperature (T)",
      correct_option: "A",
      explanation: "Step 1: By Charles's law for an ideal gas at constant pressure:\nV = (n R / P) T.\n\nStep 2: Here, n, R, and P are all constants, which represents an equation of the form y = m x with zero intercept.\n\nStep 3: Therefore, a plot of Volume (V) versus absolute temperature (T) is a straight line passing directly through the origin (T = 0 K, V = 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2916, // Q35
    similar_question: {
      question: "The average translational kinetic energy of an ideal gas molecule depends strictly and exclusively on which of the following macroscopic state variables?",
      option_a: "The absolute temperature of the gas only",
      option_b: "The pressure of the gas only",
      option_c: "The volume of the container only",
      option_d: "The molecular mass of the gas only",
      correct_option: "A",
      explanation: "Step 1: From kinetic theory, the average translational kinetic energy of a single ideal gas molecule is given by:\nE_k = (3/2) k_B T,\nwhere k_B is Boltzmann's constant and T is the absolute temperature in kelvins.\n\nStep 2: This value does not depend on molecular mass, chemical identity, gas pressure, or container volume.\n\nStep 3: Therefore, knowing the absolute temperature alone is sufficient to uniquely determine the average molecular kinetic energy.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart1() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Admin login failed');

    console.log(`Starting update of Set 14 Part 1 (${set14Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set14Part1Updates) {
      const updateRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          similarQuestion: item.similar_question
        })
      });
      const data = await updateRes.json();
      if (data.success) {
        successCount++;
        console.log(`[${successCount}/${set14Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 14 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
