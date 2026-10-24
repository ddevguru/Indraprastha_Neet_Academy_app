const set12Part2Updates = [
  {
    id: 6156, // Q36
    similar_question: {
      question: "An open thin-walled glass beaker containing pure water at 100°C is placed inside a large open pot of vigorously boiling water at 100°C over a stove at standard atmospheric pressure. Will the water inside the glass beaker boil?",
      option_a: "No, because although it reaches 100°C, there is no temperature difference between the pot and the beaker to supply latent heat of vaporization",
      option_b: "Yes, it will boil at 100°C at the same rate as the water in the pot",
      option_c: "Yes, but it will boil only above 102°C",
      option_d: "Yes, but it will boil at a lower temperature due to convection currents",
      correct_option: "A",
      explanation: "Step 1: For boiling to occur and continue, water must not only reach its boiling point (100°C at 1 atm), but it must also continuously absorb latent heat of vaporization (ΔQ = m L_v).\n\nStep 2: Heat flows from one body to another only when a non-zero temperature gradient (ΔT > 0) exists.\n\nStep 3: The water in the outer pot is boiling at 100°C. Therefore, the water inside the inner beaker can only reach a maximum temperature of 100°C.\n\nStep 4: Once both reach 100°C, ΔT = 0, so no further heat can conduct into the inner beaker to supply the required latent heat of vaporization. Hence, the water inside the beaker does not boil.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6157, // Q37
    similar_question: {
      question: "A block of ice of mass 500 g at its melting point (0°C) is placed in an insulated calorimeter. If 100 g of water at 80°C is poured onto the ice, what mass of ice will melt? (Take latent heat of fusion of ice L_f = 80 cal/g and specific heat of water c = 1 cal/g·°C)",
      option_a: "100 g",
      option_b: "80 g",
      option_c: "50 g",
      option_d: "125 g",
      correct_option: "A",
      explanation: "Step 1: The warm water cools from 80°C to 0°C, releasing thermal energy:\nQ_released = m_water × c × ΔT = 100 g × 1 cal/(g·°C) × (80°C − 0°C) = 8000 cal.\n\nStep 2: The ice is already at its melting point (0°C). Any heat absorbed by the ice is used entirely for melting (phase change):\nQ_absorbed = m_ice_melted × L_f.\n\nStep 3: Equating heat released to heat absorbed:\n8000 cal = m_ice_melted × 80 cal/g  →  m_ice_melted = 8000 / 80 = 100 g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6158, // Q38
    similar_question: {
      question: "An electric heater supplying heat at a uniform rate takes 5 minutes to heat a given mass of water from 20°C to 100°C in an open vessel of negligible heat capacity. It then takes another 34 minutes to convert the entire quantity of boiling water into steam at 100°C. Taking the specific heat of water as 1.0 cal/g·°C, what is the experimental latent heat of vaporization of water?",
      option_a: "544 cal/g",
      option_b: "530 cal/g",
      option_c: "550 cal/g",
      option_d: "510 cal/g",
      correct_option: "A",
      explanation: "Step 1: Let m be the mass of water and P be the constant heat supply rate (cal/min).\nTo raise temperature from 20°C to 100°C (ΔT = 80°C) in t₁ = 5 min:\nP × t₁ = m × c × ΔT  →  P × 5 = m × 1.0 × 80 = 80 m  →  P = 16 m cal/min.\n\nStep 2: To vaporize the entire mass m at 100°C in t₂ = 34 min:\nQ_vap = P × t₂ = m × L_v.\n\nStep 3: Substitute P = 16 m and t₂ = 34 min:\n(16 m) × 34 = m × L_v  →  L_v = 16 × 34 = 544 cal/g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6159, // Q39
    similar_question: {
      question: "On a standard Pressure-Temperature (P-T) phase diagram of water, what phase exists in the region lying below the vaporization curve and above the sublimation curve (at temperatures above 273.16 K and low pressures)?",
      option_a: "Water vapour (gas)",
      option_b: "Liquid water",
      option_c: "Solid ice",
      option_d: "Supercritical fluid",
      correct_option: "A",
      explanation: "Step 1: In the P-T phase diagram of water, three distinct coexistence curves meet at the triple point (T = 273.16 K, P = 4.58 mm Hg or 611 Pa):\n- Fusion curve (dividing solid and liquid)\n- Vaporization curve (dividing liquid and gas)\n- Sublimation curve (dividing solid and gas).\n\nStep 2: Region I at lower temperatures and higher pressures corresponds to solid ice.\nRegion II at intermediate temperatures and higher pressures corresponds to liquid water.\nRegion III at lower pressures and higher temperatures corresponds to water vapour (gaseous phase).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6160, // Q40
    similar_question: {
      question: "A 3.0 kg metal block at 100°C is dropped into 1.0 kg of water at 20°C in a thermally insulated container. If the specific heat capacity of the metal is 0.40 kJ/kg·K and that of water is 4.2 kJ/kg·K, what is the final equilibrium temperature of the mixture?",
      option_a: "37.8°C",
      option_b: "45.0°C",
      option_c: "52.4°C",
      option_d: "60.0°C",
      correct_option: "A",
      explanation: "Step 1: By the principle of calorimetry, in an insulated container:\nHeat lost by metal = Heat gained by water.\n\nStep 2: Let T be the equilibrium temperature in °C:\nm_metal × c_metal × (100 − T) = m_water × c_water × (T − 20).\n\nStep 3: Substitute the given values:\n3.0 × 0.40 × (100 − T) = 1.0 × 4.2 × (T − 20)\n1.2 (100 − T) = 4.2 (T − 20)\n120 − 1.2 T = 4.2 T − 84\n5.4 T = 204\nT = 204 / 5.4 ≈ 37.78°C ≈ 37.8°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6161, // Q41
    similar_question: {
      question: "Two cylindrical rods A and B of identical cross-sectional area are connected end-to-end in series. In steady state with no heat loss from the lateral surfaces, the temperature gradient along rod A is 4.0 °C/cm and that along rod B is 2.0 °C/cm. What is the ratio of their thermal conductivities K_A : K_B?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: By Fourier's law of heat conduction, the rate of heat flow H in steady state through a rod of cross-sectional area A and thermal conductivity K is:\nH = K A |dT/dx|.\n\nStep 2: In a series combination with no lateral heat loss, the heat current H must be identical through both rods:\nH_A = H_B  →  K_A A (dT/dx)_A = K_B A (dT/dx)_B.\n\nStep 3: Since the cross-sectional area A is identical:\nK_A / K_B = (dT/dx)_B / (dT/dx)_A = 2.0 / 4.0 = 1 / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6162, // Q42
    similar_question: {
      question: "Four identical metal rods each having thermal resistance R are connected to form a balanced bridge network between hot reservoir T₁ = 100°C and cold reservoir T₂ = 0°C. What is the steady-state temperature at the central junction between the two equal series branches?",
      option_a: "50°C",
      option_b: "40°C",
      option_c: "60°C",
      option_d: "75°C",
      correct_option: "A",
      explanation: "Step 1: Due to the exact structural symmetry of identical rods having equal thermal resistance R in each symmetric half, the temperature drops uniformly across equal resistances.\n\nStep 2: Along any continuous branch from 100°C to 0°C consisting of two identical resistances R in series, the midpoint junction temperature T_j satisfies:\n(100 − T_j) / R = (T_j − 0) / R.\n\nStep 3: Solving gives:\n100 − T_j = T_j  →  2 T_j = 100  →  T_j = 50°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6163, // Q43
    similar_question: {
      question: "Two rods of identical dimensions have thermal conductivities in the ratio 1 : 2 (K and 2K). They are connected between two thermal reservoirs maintained at a constant temperature difference ΔT. What is the ratio of the total heat current conducted when they are connected in series to that when connected in parallel?",
      option_a: "2 : 9",
      option_b: "9 : 2",
      option_c: "1 : 3",
      option_d: "3 : 8",
      correct_option: "A",
      explanation: "Step 1: Let R = L / (K A). Then R₁ = R and R₂ = L / (2K A) = R / 2.\n\nStep 2: In series combination:\nR_series = R₁ + R₂ = R + R/2 = 3R / 2.\nHeat current: H_series = ΔT / R_series = ΔT / (3R/2) = 2 ΔT / (3R).\n\nStep 3: In parallel combination:\n1 / R_parallel = 1/R₁ + 1/R₂ = 1/R + 2/R = 3/R  →  R_parallel = R / 3.\nHeat current: H_parallel = ΔT / R_parallel = 3 ΔT / R.\n\nStep 4: The ratio of series heat current to parallel heat current is:\nH_series / H_parallel = [2 ΔT / (3R)] / (3 ΔT / R) = (2/3) / 3 = 2 / 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6164, // Q44
    similar_question: {
      question: "Three identical metal rods of equal length and cross-section meet at a central junction J. The outer ends of the three rods are maintained at steady temperatures of 90°C, 60°C, and 30°C. In the steady state with no heat loss to the surroundings, what is the temperature of the junction J?",
      option_a: "60°C",
      option_b: "70°C",
      option_c: "50°C",
      option_d: "45°C",
      correct_option: "A",
      explanation: "Step 1: By Kirchhoff's heat junction rule, the algebraic sum of heat currents entering the central junction J in steady state must be zero:\nΣ H = 0.\n\nStep 2: Let T_J be the temperature of junction J, and R be the thermal resistance of each rod:\n(90 − T_J)/R + (60 − T_J)/R + (30 − T_J)/R = 0.\n\nStep 3: Multiply through by R:\n(90 − T_J) + (60 − T_J) + (30 − T_J) = 0\n180 − 3 T_J = 0  →  3 T_J = 180  →  T_J = 60°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6165, // Q45
    similar_question: {
      question: "A single conducting rod of length L and thermal conductivity K₃ connects two points P and Q. In parallel with it, two rods each of length L and thermal conductivities K₁ and K₂ are connected in series between P and Q. All rods have identical cross-sectional area. If heat flows at the same rate through both branches for any temperature difference between P and Q, what is the relation between K₃, K₁, and K₂?",
      option_a: "K₃ = K₁ K₂ / (K₁ + K₂)",
      option_b: "K₃ = 2 K₁ K₂ / (K₁ + K₂)",
      option_c: "K₃ = (K₁ + K₂) / 2",
      option_d: "K₃ = K₁ + K₂",
      correct_option: "A",
      explanation: "Step 1: The thermal resistance of the single rod branch between P and Q is:\nR_single = L / (K₃ A).\n\nStep 2: The thermal resistance of the two-rod series branch is:\nR_series = L / (K₁ A) + L / (K₂ A) = (L / A) [ (K₁ + K₂) / (K₁ K₂) ].\n\nStep 3: For heat to flow at the same rate through both branches under the same temperature difference ΔT, the two thermal resistances must be equal:\nR_single = R_series  →  L / (K₃ A) = (L / A) [ (K₁ + K₂) / (K₁ K₂) ].\n\nStep 4: Cancel L/A and invert:\n1 / K₃ = (K₁ + K₂) / (K₁ K₂)  →  K₃ = K₁ K₂ / (K₁ + K₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6166, // Q46
    similar_question: {
      question: "Three slabs of identical thickness L and cross-sectional area A having thermal conductivities 4K, 2K, and K are joined face-to-face in series. What is the equivalent thermal conductivity K_eq of the composite slab?",
      option_a: "12K / 7",
      option_b: "7K / 12",
      option_c: "2K / 3",
      option_d: "4K / 3",
      correct_option: "A",
      explanation: "Step 1: In series combination, total thermal resistance is the sum of the individual thermal resistances:\nR_eq = R₁ + R₂ + R₃.\n\nStep 2: The total thickness is 3L, so:\n(3L) / (K_eq A) = L / (4K A) + L / (2K A) + L / (K A).\n\nStep 3: Divide both sides by L / A:\n3 / K_eq = 1/(4K) + 1/(2K) + 1/K = (1 + 2 + 4) / (4K) = 7 / (4K).\n\nStep 4: Solve for K_eq:\nK_eq = 3 × (4K / 7) = 12K / 7.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6167, // Q47
    similar_question: {
      question: "Two conducting slabs of equal cross-sectional area and thickness d, with thermal conductivities 2K and 6K, are connected in series. A separate single slab of the same area and thickness d has thermal conductivity K'. If the single slab conducts twice the heat current of the two-slab series combination under the same temperature difference, what is the ratio K' / K?",
      option_a: "3",
      option_b: "6",
      option_c: "4",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: The thermal resistance of the two slabs in series is:\nR_series = d / (2K A) + d / (6K A) = (d / KA) [1/2 + 1/6] = (d / KA) [4/6] = 2d / (3K A).\n\nStep 2: The thermal resistance of the single slab is:\nR' = d / (K' A).\n\nStep 3: Heat current H = ΔT / R. The condition H' = 2 H_series implies:\nR_series = 2 R'  →  2d / (3K A) = 2 [ d / (K' A) ].\n\nStep 4: Cancel 2d / A from both sides:\n1 / (3K) = 1 / K'  →  K' = 3K  →  K' / K = 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6168, // Q48
    similar_question: {
      question: "Two blackened solid copper spheres A and B have radii R and 3R respectively. In their thermal emission spectra, the peak emission wavelengths are observed to be in the ratio λ_A : λ_B = 1 : 2. What is the ratio of their absolute surface temperatures T_A : T_B?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: By Wien's displacement law, the product of the peak wavelength λ_max and the absolute temperature T of a blackbody is constant:\nλ_max × T = b = constant.\n\nStep 2: Therefore, absolute temperature is inversely proportional to peak wavelength:\nT ∝ 1 / λ_max.\n\nStep 3: The ratio of temperatures is:\nT_A / T_B = λ_B / λ_A.\nGiven λ_A / λ_B = 1 / 2, we have λ_B / λ_A = 2 / 1.\nThus, T_A / T_B = 2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6169, // Q49
    similar_question: {
      question: "A metal sphere suspended in an evacuated chamber at 300 K requires 200 W of electrical power to maintain its temperature at 600 K. When its entire surface is coated with lampblack (turning it into a perfect blackbody with emissivity e = 1), the electrical power required to maintain 600 K becomes 500 W. What is the emissivity of the original metal sphere?",
      option_a: "0.40",
      option_b: "0.25",
      option_c: "0.50",
      option_d: "0.60",
      correct_option: "A",
      explanation: "Step 1: In an evacuated chamber, heat loss occurs solely by thermal radiation according to the Stefan-Boltzmann law:\nP = e σ A (T⁴ − T₀⁴).\n\nStep 2: For the original uncoated sphere (power P₁ = 200 W):\n200 = e σ A (600⁴ − 300⁴).\n\nStep 3: For the blackened sphere with e = 1.0 (power P₂ = 500 W):\n500 = 1.0 × σ A (600⁴ − 300⁴).\n\nStep 4: Dividing the two expressions:\ne / 1.0 = 200 / 500 = 0.40.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6170, // Q50
    similar_question: {
      question: "In a differential air thermometer, two identical air-filled bulbs X and Y are connected by a U-tube containing colored liquid. Bulb X is painted dull black, while bulb Y is polished silver. When an electric heater is placed exactly midway between the two bulbs:",
      option_a: "The liquid level falls in limb X and rises in limb Y",
      option_b: "The liquid level rises in limb X and falls in limb Y",
      option_c: "The liquid level remains unchanged in both limbs",
      option_d: "The liquid level falls equally in both limbs",
      correct_option: "A",
      explanation: "Step 1: A dull black surface is an excellent absorber of thermal radiation (absorptivity a ≈ 1), whereas a polished silver surface reflects nearly all incident radiation (reflectivity r ≈ 1).\n\nStep 2: Consequently, bulb X absorbs significantly more radiant heat than bulb Y, causing the air inside bulb X to reach a higher temperature.\n\nStep 3: By the ideal gas law (P ∝ T at constant volume), the pressure inside bulb X increases more than inside bulb Y.\n\nStep 4: This excess pressure in bulb X pushes the liquid down in limb X and up into limb Y.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6171, // Q51
    similar_question: {
      question: "When a piece of white porcelain with a dark blue cobalt oxide spot is placed inside a furnace and heated to 1100°C, how does the dark spot appear relative to the surrounding white porcelain when viewed in the dark?",
      option_a: "The dark spot appears brighter than the white porcelain background",
      option_b: "The dark spot appears darker than the white porcelain background",
      option_c: "Both appear equally bright with identical luminance",
      option_d: "The spot disappears completely into the background",
      correct_option: "A",
      explanation: "Step 1: By Kirchhoff's law of thermal radiation, at thermal equilibrium the monochromatic emissive power is directly proportional to absorptivity: e_λ / a_λ = E_λ(blackbody).\n\nStep 2: Good absorbers of radiation at room temperature are necessarily good emitters of radiation at elevated temperatures.\n\nStep 3: At room temperature, the dark cobalt spot absorbs most light (high absorptivity), while the white porcelain reflects most light (low absorptivity).\n\nStep 4: Therefore, at 1100°C, the dark spot emits much more thermal radiation than the white porcelain and appears distinctly brighter.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6172, // Q52
    similar_question: {
      question: "A solid copper sphere of radius R and a hollow copper sphere of outer radius R and inner radius r are heated to the same temperature and placed in the same cool evacuated enclosure. Which of the two spheres has a higher initial rate of cooling (−dT/dt)?",
      option_a: "The hollow sphere cools faster",
      option_b: "The solid sphere cools faster",
      option_c: "Both spheres cool at the same rate",
      option_d: "The solid sphere loses heat at twice the rate of the hollow sphere",
      correct_option: "A",
      explanation: "Step 1: The rate of heat loss by radiation is given by Stefan's law: dQ/dt = e σ A (T⁴ − T₀⁴).\nSince both spheres have the same outer radius R, their external radiating surface areas A = 4π R² are identical, so dQ/dt is the same for both.\n\nStep 2: The rate of cooling is the rate of temperature decrease: −dT/dt = (dQ/dt) / (m c).\n\nStep 3: The hollow sphere has less volume of copper, so its mass m_hollow < m_solid.\n\nStep 4: Because m_hollow is smaller, (−dT/dt)_hollow > (−dT/dt)_solid. Hence, the hollow sphere cools faster.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6173, // Q53
    similar_question: {
      question: "Two bodies X and Y have identical external surface areas and identical black surfaces, but body X has twice the heat capacity of body Y. If both are heated to 80°C and placed in an identical room at 20°C, which body cools faster?",
      option_a: "Body Y cools twice as fast as body X",
      option_b: "Body X cools twice as fast as body Y",
      option_c: "Both bodies cool at exactly the same rate",
      option_d: "Neither body cools until thermal equilibrium is established",
      correct_option: "A",
      explanation: "Step 1: The rate of heat loss dQ/dt depends on surface area A, emissivity e, and temperature difference: dQ/dt = e σ A (T⁴ − T₀⁴).\nBecause A, e, and temperatures are identical, dQ/dt is equal for both bodies.\n\nStep 2: The rate of cooling is defined as the rate of temperature drop: −dT/dt = (dQ/dt) / C, where C is the heat capacity.\n\nStep 3: Given C_X = 2 C_Y:\n(−dT/dt)_Y = (dQ/dt) / C_Y = 2 × [ (dQ/dt) / C_X ] = 2 × (−dT/dt)_X.\n\nStep 4: Therefore, body Y cools twice as fast as body X.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6174, // Q54
    similar_question: {
      question: "Consider the following statements regarding heat and thermal radiation:\n(i) A body with high reflectivity is a poor emitter of radiation.\n(ii) A brass tumbler feels colder to touch than a wooden table on a chilly day because brass has higher thermal conductivity.\n(iii) Earth without an atmosphere would be inhospitably cold due to the absence of the greenhouse effect.\n(iv) Steam heating systems are more effective than hot water systems because steam carries latent heat of vaporization.\nWhich of the above statements are correct?",
      option_a: "(i), (ii), (iii), and (iv)",
      option_b: "(i) and (ii) only",
      option_c: "(ii), (iii), and (iv) only",
      option_d: "(i), (iii), and (iv) only",
      correct_option: "A",
      explanation: "Step 1: Statement (i) is correct: by Kirchhoff's law, a good reflector has low absorptivity (a = 1 − r), so its emissivity e = a is also low (poor emitter).\n\nStep 2: Statement (ii) is correct: brass conducts heat away from the skin much faster than wood, making it feel colder even at the same temperature.\n\nStep 3: Statement (iii) is correct: atmospheric greenhouse gases trap terrestrial infrared radiation, keeping Earth's average surface temperature at ~15°C instead of −18°C.\n\nStep 4: Statement (iv) is correct: 1 g of condensing steam at 100°C releases 2260 J of latent heat before cooling, delivering far more heat than liquid water.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6175, // Q55
    similar_question: {
      question: "A cup of hot liquid cools from 70°C to 50°C in 6 minutes when placed in surroundings maintained at a constant temperature of 30°C. What will be the temperature of the liquid after another 6 minutes?",
      option_a: "40.0°C",
      option_b: "37.5°C",
      option_c: "35.0°C",
      option_d: "42.5°C",
      correct_option: "A",
      explanation: "Step 1: According to Newton's law of cooling in integrated form:\n(T − T₀) = (T_initial − T₀) e^(−kt).\n\nStep 2: Initially, excess temperature is (70 − 30) = 40°C.\nAfter t = 6 minutes, excess temperature becomes (50 − 30) = 20°C.\nThus: e^(−6k) = 20 / 40 = 1/2.\n\nStep 3: In every subsequent 6-minute interval, the excess temperature reduces by half:\nAfter another 6 minutes (total 12 min):\n(T_final − 30) = 20°C × (1/2) = 10°C.\n\nStep 4: Therefore, the final temperature is:\nT_final = 30°C + 10°C = 40.0°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6176, // Q56
    similar_question: {
      question: "A laboratory blackbody furnace emits 5.0 W/cm² of radiant power at a temperature of 600 K. A distant celestial body is observed to radiate 80.0 W/cm² from its surface. Assuming blackbody radiation, what is the surface temperature of the celestial body?",
      option_a: "1200 K",
      option_b: "1000 K",
      option_c: "1500 K",
      option_d: "2400 K",
      correct_option: "A",
      explanation: "Step 1: By the Stefan-Boltzmann law, radiant power per unit area of a blackbody is proportional to the fourth power of absolute temperature:\nE = σ T⁴.\n\nStep 2: Taking the ratio for the two radiators:\nE₂ / E₁ = (T₂ / T₁)⁴.\n\nStep 3: Substitute E₁ = 5.0 W/cm², T₁ = 600 K, and E₂ = 80.0 W/cm²:\n80.0 / 5.0 = (T₂ / 600)⁴\n16 = (T₂ / 600)⁴.\n\nStep 4: Take the fourth root of both sides:\n2 = T₂ / 600  →  T₂ = 2 × 600 = 1200 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6177, // Q57
    similar_question: {
      question: "Two stars, a red giant and a blue dwarf, emit thermal radiation with identical total luminosity (total energy radiated per second). Which star has the larger radius?",
      option_a: "The red giant star",
      option_b: "The blue dwarf star",
      option_c: "Both stars have the exact same radius",
      option_d: "Cannot be determined without knowing their masses",
      correct_option: "A",
      explanation: "Step 1: By Wien's displacement law (λ_max T = constant), red light has a longer wavelength than blue light (λ_red > λ_blue), which means the red star has a lower surface temperature (T_red < T_blue).\n\nStep 2: Total luminosity is given by Stefan's law: L = 4π R² σ T⁴.\n\nStep 3: Since both stars have the same luminosity L:\nR² ∝ 1 / T⁴  →  R ∝ 1 / T².\n\nStep 4: Because T_red < T_blue, the red star must possess a significantly larger radius R to produce the same total radiant output.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6178, // Q58
    similar_question: {
      question: "A cup of coffee cools from 80°C to 60°C in 5.0 minutes in a room kept at 20°C. Using the average form of Newton's law of cooling, how much time will it take to cool from 60°C to 50°C in the same room?",
      option_a: "3.57 minutes (approximately 3.6 min)",
      option_b: "2.50 minutes",
      option_c: "5.00 minutes",
      option_d: "1.75 minutes",
      correct_option: "A",
      explanation: "Step 1: The average form of Newton's law of cooling is:\n(T₁ − T₂) / t = K [ (T₁ + T₂)/2 − T₀ ].\n\nStep 2: For the first cooling stage (80°C to 60°C in 5 min, T₀ = 20°C):\n(80 − 60) / 5 = K [ (80 + 60)/2 − 20 ]\n20 / 5 = K [ 70 − 20 ]  →  4 = 50 K  →  K = 4 / 50 = 0.08 min⁻¹.\n\nStep 3: For the second stage (60°C to 50°C in time t₂):\n(60 − 50) / t₂ = K [ (60 + 50)/2 − 20 ]\n10 / t₂ = 0.08 × [ 55 − 20 ] = 0.08 × 35 = 2.8 °C/min.\n\nStep 4: Solve for t₂:\nt₂ = 10 / 2.8 ≈ 3.57 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6179, // Q59
    similar_question: {
      question: "The solar constant S is defined as the radiant solar energy received per second per unit area perpendicular to the rays of the sun at an orbital distance d from the sun. Neglecting atmospheric absorption, how does S depend on d?",
      option_a: "S ∝ d⁻²",
      option_b: "S ∝ d⁻¹",
      option_c: "S ∝ d²",
      option_d: "S ∝ d⁻⁴",
      correct_option: "A",
      explanation: "Step 1: The sun radiates total energy at power P isotropically into space in all directions.\n\nStep 2: At an orbital distance d from the sun, this radiant power is distributed uniformly over the surface of an imaginary sphere of radius d, having surface area A = 4π d².\n\nStep 3: The solar constant S is the intensity (power per unit area):\nS = P / (4π d²) ∝ 1 / d² = d⁻².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6180, // Q60
    similar_question: {
      question: "In Newton's law of cooling, dθ/dt = −k (θ − θ₀), the cooling rate constant is given by k = (4 e σ A θ₀³) / (m s). For two objects 1 and 2, the ratios are: A₁/A₂ = 2, e₁/e₂ = 1, m₁/m₂ = 3, and s₁/s₂ = 2/3. In identical surroundings at temperature θ₀, what is the ratio of their cooling rate constants k₁ / k₂?",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "4 : 9",
      option_d: "3 : 2",
      correct_option: "A",
      explanation: "Step 1: The cooling constant is proportional to:\nk ∝ (e A) / (m s).\n\nStep 2: Taking the ratio k₁ / k₂:\nk₁ / k₂ = (e₁ / e₂) × (A₁ / A₂) / [ (m₁ / m₂) × (s₁ / s₂) ].\n\nStep 3: Substitute the given values:\nk₁ / k₂ = (1) × (2) / [ (3) × (2/3) ] = 2 / 2 = 1.\n\nStep 4: Thus, k₁ : k₂ = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6181, // Q61
    similar_question: {
      question: "Three rods A, B, and C have initial lengths 2L, 4L, and 3L respectively. When their temperatures are increased by ΔT, 2ΔT, and ΔT, their elongation values are observed to be Δl, 4Δl, and 1.5Δl respectively. Which of the rods are made of the same material?",
      option_a: "All three rods are made of the same material",
      option_b: "Rods A and B only",
      option_c: "Rods B and C only",
      option_d: "No two rods are made of the same material",
      correct_option: "A",
      explanation: "Step 1: Elongation upon thermal expansion is given by Δl = L₀ α ΔT, so α = Δl / (L₀ ΔT).\n\nStep 2: For rod A: α_A = Δl / (2L × ΔT) = 0.5 (Δl / L ΔT).\n\nStep 3: For rod B: α_B = (4Δl) / (4L × 2ΔT) = 4 / 8 × (Δl / L ΔT) = 0.5 (Δl / L ΔT).\n\nStep 4: For rod C: α_C = (1.5Δl) / (3L × ΔT) = 1.5 / 3 × (Δl / L ΔT) = 0.5 (Δl / L ΔT).\n\nStep 5: Since α_A = α_B = α_C, all three rods possess the identical coefficient of linear expansion and are made of the same material.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6182, // Q62
    similar_question: {
      question: "A vertical bimetallic strip fixed rigidly at its base consists of strip 1 on the left and strip 2 on the right. If the coefficient of linear expansion of strip 1 is greater than that of strip 2 (α₁ > α₂), in which direction will the strip bend when its temperature is increased?",
      option_a: "It bends towards the right (concave towards strip 2)",
      option_b: "It bends towards the left (concave towards strip 1)",
      option_c: "It remains completely straight and stretches upward",
      option_d: "It twists into a helical spiral",
      correct_option: "A",
      explanation: "Step 1: Upon heating (ΔT > 0), both strips expand: ΔL = L₀ α ΔT.\n\nStep 2: Since α₁ > α₂, strip 1 expands more in length than strip 2 (ΔL₁ > ΔL₂).\n\nStep 3: Because the two strips are welded firmly together, strip 1 must form the outer (convex) curve with the larger radius of curvature, while strip 2 forms the inner (concave) curve.\n\nStep 4: Since strip 1 is on the left, the compound strip curves away from strip 1, bending towards the right.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6183, // Q63
    similar_question: {
      question: "A flat triangular copper sheet contains two internal holes: one circular cavity of diameter d and one rectangular cavity of dimensions a × b. When the copper sheet is heated uniformly, what happens to the dimensions d, a, and b?",
      option_a: "All three dimensions (d, a, and b) increase",
      option_b: "d increases, but a and b decrease",
      option_c: "The outer sheet expands outward so the holes shrink",
      option_d: "d, a, and b remain unchanged",
      correct_option: "A",
      explanation: "Step 1: Thermal expansion of an isotropic solid behaves like a photographic enlargement.\n\nStep 2: Every linear dimension between any two points in the body increases by the factor (1 + α ΔT).\n\nStep 3: Cavities or holes expand exactly as if they were made of the surrounding solid material.\n\nStep 4: Therefore, the diameter d of the circular hole, the length a, and the width b of the rectangular hole all increase upon heating.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6184, // Q64
    similar_question: {
      question: "For most typical substances, specific heat at constant pressure exceeds that at constant volume (C_p > C_v). When pure liquid water is heated between 0°C and 4°C, it contracts in volume. How does C_p compare to C_v for water in this temperature range?",
      option_a: "C_p < C_v",
      option_b: "C_p > C_v",
      option_c: "C_p = C_v",
      option_d: "C_p − C_v = R",
      correct_option: "A",
      explanation: "Step 1: The general thermodynamic relation between specific heats is:\nC_p − C_v = T V α² / κ_T  or from the first law: dQ_p = dU + P dV.\n\nStep 2: When water is heated between 0°C and 4°C, its volume decreases (dV < 0, anomalous contraction).\n\nStep 3: Under constant atmospheric pressure, work is done on the water by atmospheric pressure (W = P dV < 0), adding energy to the system.\n\nStep 4: Consequently, less external heat is required to achieve the same temperature rise at constant pressure than at constant volume, making C_p < C_v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6185, // Q65
    similar_question: {
      question: "On a fictitious temperature scale Z, pure water freezes at −40°Z and boils at +160°Z at standard pressure. What reading on scale Z corresponds to an absolute temperature of 323.15 K (which is 50°C)?",
      option_a: "+60°Z",
      option_b: "+40°Z",
      option_c: "+80°Z",
      option_d: "+100°Z",
      correct_option: "A",
      explanation: "Step 1: First convert the absolute temperature to Celsius:\nT(°C) = 323.15 − 273.15 = 50°C.\n\nStep 2: Use the standard scale transformation formula:\n(Reading − Lower Fixed Point) / (Upper Fixed Point − Lower Fixed Point) = (C − 0) / (100 − 0).\n\nStep 3: For scale Z, LFP = −40°Z and UFP = +160°Z:\n[Z − (−40)] / [160 − (−40)] = 50 / 100\n(Z + 40) / 200 = 1/2.\n\nStep 4: Solve for Z:\nZ + 40 = 100  →  Z = +60°Z.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6186, // Q66
    similar_question: {
      question: "The apparent coefficient of cubical expansion of a liquid when measured in a copper container (linear expansion α_Cu = 1.7 × 10⁻⁵ K⁻¹) is 15.0 × 10⁻⁵ K⁻¹. What is the apparent coefficient of expansion of the same liquid when measured in an aluminum container (α_Al = 2.4 × 10⁻⁵ K⁻¹)?",
      option_a: "12.9 × 10⁻⁵ K⁻¹",
      option_b: "17.1 × 10⁻⁵ K⁻¹",
      option_c: "14.3 × 10⁻⁵ K⁻¹",
      option_d: "10.5 × 10⁻⁵ K⁻¹",
      correct_option: "A",
      explanation: "Step 1: The real coefficient of volume expansion of a liquid is related to its apparent coefficient by:\nγ_real = γ_apparent + γ_vessel = γ_apparent + 3α_vessel.\n\nStep 2: From the copper vessel measurement:\nγ_real = 15.0 × 10⁻⁵ + 3 × (1.7 × 10⁻⁵) = 15.0 × 10⁻⁵ + 5.1 × 10⁻⁵ = 20.1 × 10⁻⁵ K⁻¹.\n\nStep 3: When measured in an aluminum container:\nγ_app(Al) = γ_real − 3α_Al = 20.1 × 10⁻⁵ − 3 × (2.4 × 10⁻⁵) = 20.1 × 10⁻⁵ − 7.2 × 10⁻⁵ = 12.9 × 10⁻⁵ K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6187, // Q67
    similar_question: {
      question: "An ideal gas undergoes a polytropic expansion process according to the relation P T³ = constant. What is the coefficient of volume expansion γ = (1/V)(dV/dT) of the gas in this process?",
      option_a: "4 / T",
      option_b: "3 / T",
      option_c: "1 / T",
      option_d: "2 / T",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas equation of state, P = n R T / V.\n\nStep 2: Substitute P into the process relation P T³ = constant:\n(n R T / V) × T³ = constant  →  T⁴ / V = constant.\n\nStep 3: Taking the natural logarithm on both sides:\n4 ln T − ln V = constant.\n\nStep 4: Differentiate with respect to temperature T:\n4/T − (1/V)(dV/dT) = 0  →  (1/V)(dV/dT) = 4/T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6188, // Q68
    similar_question: {
      question: "A thin uniform metallic ring rotates freely about its central axis perpendicular to its plane with an angular speed ω₀ in vacuum. If the ring is heated uniformly so that its temperature rises by ΔT, what happens to its angular speed?",
      option_a: "Its angular speed decreases because its moment of inertia increases due to thermal expansion",
      option_b: "Its angular speed increases because thermal energy converts into rotational energy",
      option_c: "Its angular speed remains exactly unchanged",
      option_d: "Its angular speed immediately drops to zero",
      correct_option: "A",
      explanation: "Step 1: In the absence of any external torque, the total angular momentum L of the rotating ring must be conserved:\nL = I ω = constant.\n\nStep 2: The moment of inertia of a thin ring of mass M and radius R is I = M R².\n\nStep 3: When heated by ΔT, thermal expansion causes the radius to increase: R' = R (1 + α ΔT).\nThus, the new moment of inertia is I' = M (R')² ≈ I (1 + 2α ΔT) > I.\n\nStep 4: To keep L = I ω constant, as I increases, the angular speed ω must decrease:\nω' = ω₀ / (1 + 2α ΔT) < ω₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6189, // Q69
    similar_question: {
      question: "For an ideal gas at constant pressure, how does the coefficient of volume expansion γ = (1/V)(∂V/∂T)_p depend on the absolute thermodynamic temperature T?",
      option_a: "Inversely proportional to T (γ = 1 / T)",
      option_b: "Directly proportional to T (γ ∝ T)",
      option_c: "Directly proportional to T² (γ ∝ T²)",
      option_d: "Completely independent of temperature",
      correct_option: "A",
      explanation: "Step 1: The ideal gas equation of state is:\nP V = n R T.\n\nStep 2: Differentiating with respect to temperature T at constant pressure P gives:\nP (∂V/∂T)_p = n R  →  (∂V/∂T)_p = n R / P.\n\nStep 3: Since n R / P = V / T, we substitute this into the definition of the volume expansion coefficient:\nγ = (1/V) (∂V/∂T)_p = (1/V) × (V / T) = 1 / T.\n\nStep 4: Therefore, the coefficient of volume expansion at constant pressure is inversely proportional to the absolute temperature T.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart2() {
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

    console.log(`Starting update of Set 12 Part 2 (${set12Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set12Part2Updates) {
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
        console.log(`[${successCount}/${set12Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 12 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
