const set12Part1Updates = [
  {
    id: 2931, // Q1
    similar_question: {
      question: "A spherical star has radius R and absolute surface temperature T. If its radius increases to 3R and its temperature increases to 2T, the ratio of the total radiant power emitted by the star now to that emitted initially is:",
      option_a: "144",
      option_b: "72",
      option_c: "36",
      option_d: "48",
      correct_option: "A",
      explanation: "Step 1: By the Stefan-Boltzmann law, the total radiant power emitted by a spherical blackbody of radius R and surface temperature T is given by:\nP = σ A T⁴ = σ (4π R²) T⁴.\n\nStep 2: For the new star with radius R' = 3R and temperature T' = 2T:\nP' = σ [4π (3R)²] (2T)⁴ = σ (4π × 9R²) (16 T⁴) = 144 × [σ (4π R²) T⁴] = 144 P.\n\nStep 3: Therefore, the ratio of radiant power emitted is:\nP' / P = 144.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2932, // Q2
    similar_question: {
      question: "A bimetallic strip is made of two thin strips of brass (coefficient of linear expansion α_b = 1.9 × 10⁻⁵ K⁻¹) and iron (α_i = 1.1 × 10⁻⁵ K⁻¹) firmly riveted together. If this strip is cooled below the temperature at which it was assembled, how will it bend?",
      option_a: "It bends with brass on the concave side and iron on the convex side",
      option_b: "It bends with iron on the concave side and brass on the convex side",
      option_c: "It remains perfectly straight but shortens in length",
      option_d: "It twists into a helical coil without bending",
      correct_option: "A",
      explanation: "Step 1: The change in length of a solid upon temperature change ΔT is given by ΔL = L₀ α ΔT.\n\nStep 2: When the bimetallic strip is cooled, ΔT is negative, meaning both strips contract.\n\nStep 3: Since α_brass (1.9 × 10⁻⁵ K⁻¹) > α_iron (1.1 × 10⁻⁵ K⁻¹), brass contracts more than iron for the same decrease in temperature.\n\nStep 4: Because the strip that becomes shorter must form the inner curve of the bend, brass will be on the concave (inner) side, and iron will be on the convex (outer) side.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2933, // Q3
    similar_question: {
      question: "In a thermos flask (Dewar flask), the space between the double glass walls is evacuated to a high vacuum. This evacuation primarily prevents heat loss by which of the following mechanisms?",
      option_a: "Conduction and convection",
      option_b: "Radiation only",
      option_c: "Convection and radiation",
      option_d: "Conduction only",
      correct_option: "A",
      explanation: "Step 1: Conduction and convection both require a material medium (atoms or molecules) to transfer thermal energy through particle collisions or bulk fluid motion.\n\nStep 2: By creating a vacuum between the double walls of the flask, all material particles are removed, thereby eliminating heat transfer via both conduction and convection.\n\nStep 3: Heat transfer by radiation does not require a medium and can still occur through a vacuum (which is why the walls are silvered to reflect radiant heat).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2934, // Q4
    similar_question: {
      question: "Two cylindrical metal rods 1 and 2 having lengths in the ratio L₁ : L₂ = 1 : 2 and diameters in the ratio d₁ : d₂ = 2 : 1 are maintained across the same temperature difference between their ends. If heat flows through both rods at the same rate in steady state, what is the ratio of their thermal conductivities K₁ : K₂?",
      option_a: "1 : 8",
      option_b: "8 : 1",
      option_c: "1 : 4",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: The rate of heat conduction through a rod in steady state is given by Fourier's law:\nH = dQ/dt = K A (ΔT) / L.\nSince the cross-section is circular, A = π d² / 4, so H = (π / 4) × K d² (ΔT) / L.\n\nStep 2: For equal heat flow rates (H₁ = H₂) under the same temperature difference (ΔT₁ = ΔT₂):\nK₁ d₁² / L₁ = K₂ d₂² / L₂  →  K₁ / K₂ = (d₂ / d₁)² × (L₁ / L₂).\n\nStep 3: Given d₁ / d₂ = 2 / 1 (so d₂ / d₁ = 1/2) and L₁ / L₂ = 1/2:\nK₁ / K₂ = (1/2)² × (1/2) = (1/4) × (1/2) = 1/8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2935, // Q5
    similar_question: {
      question: "Two identical rods A and B of the same dimensions are connected first in series and then in parallel across two heat reservoirs maintained at temperatures 100°C and 0°C. If the thermal conductivity of rod A is 2K and that of rod B is K, what is the ratio of the total heat current in the parallel combination to that in the series combination?",
      option_a: "9 / 2",
      option_b: "2 / 9",
      option_c: "3 / 1",
      option_d: "4 / 1",
      correct_option: "A",
      explanation: "Step 1: Thermal resistance of a rod of length L, area A, and conductivity K is R = L / (K A).\nLet R_B = L / (K A) = R. Then R_A = L / (2K A) = R / 2.\n\nStep 2: In series combination:\nR_series = R_A + R_B = R / 2 + R = 3R / 2.\nHeat current in series: H_series = ΔT / R_series = ΔT / (3R / 2) = 2 ΔT / (3R).\n\nStep 3: In parallel combination:\n1 / R_parallel = 1 / R_A + 1 / R_B = 2/R + 1/R = 3/R  →  R_parallel = R / 3.\nHeat current in parallel: H_parallel = ΔT / R_parallel = 3 ΔT / R.\n\nStep 4: The ratio of parallel heat current to series heat current is:\nH_parallel / H_series = (3 ΔT / R) / [2 ΔT / (3R)] = 3 × (3/2) = 9/2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2936, // Q6
    similar_question: {
      question: "In an insulated container, 200 g of water at 90°C is mixed with 300 g of water at 40°C. Assuming no heat is lost to the surroundings or container, what is the equilibrium temperature of the mixture?",
      option_a: "60°C",
      option_b: "65°C",
      option_c: "55°C",
      option_d: "70°C",
      correct_option: "A",
      explanation: "Step 1: By the principle of calorimetry, in an isolated system:\nHeat lost by hot water = Heat gained by cold water.\n\nStep 2: Let T be the equilibrium temperature:\nm₁ c (T₁ − T) = m₂ c (T − T₂).\nSince both substances are liquid water, specific heat c cancels:\nm₁ (T₁ − T) = m₂ (T − T₂).\n\nStep 3: Substitute m₁ = 200 g, T₁ = 90°C, m₂ = 300 g, T₂ = 40°C:\n200 (90 − T) = 300 (T − 40)\n18000 − 200 T = 300 T − 12000\n500 T = 30000\nT = 30000 / 500 = 60°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2937, // Q7
    similar_question: {
      question: "A mass of 50 g of water at 20°C is mixed with 150 g of water at 80°C in a calorimeter of negligible thermal capacity. What is the resulting final temperature of the mixture?",
      option_a: "65°C",
      option_b: "60°C",
      option_c: "50°C",
      option_d: "70°C",
      correct_option: "A",
      explanation: "Step 1: Apply the principle of conservation of thermal energy:\nHeat lost by hot water = Heat gained by cold water.\n\nStep 2: Let T be the final temperature of the mixture:\nm_hot × c × (T_hot − T) = m_cold × c × (T − T_cold)\n150 × (80 − T) = 50 × (T − 20).\n\nStep 3: Divide both sides by 50:\n3 × (80 − T) = 1 × (T − 20)\n240 − 3T = T − 20\n4T = 260\nT = 65°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2938, // Q8
    similar_question: {
      question: "What is the molar heat capacity of an ideal gas undergoing a reversible isothermal expansion?",
      option_a: "Infinite (∞)",
      option_b: "Zero",
      option_c: "Equal to C_v",
      option_d: "Equal to C_p",
      correct_option: "A",
      explanation: "Step 1: The molar heat capacity C is defined as:\nC = ΔQ / (n ΔT).\n\nStep 2: In an isothermal process, the temperature remains constant throughout the expansion, which means ΔT = 0.\n\nStep 3: During expansion, the gas absorbs heat (ΔQ > 0) to perform work while keeping internal energy constant:\nC = ΔQ / (n × 0) → ∞.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2939, // Q9
    similar_question: {
      question: "Two slabs of the same surface area with thermal resistances 2R and 3R are placed in series between two thermal reservoirs maintained at 120°C and 20°C respectively. What is the steady-state junction temperature θ between the two slabs?",
      option_a: "80°C",
      option_b: "70°C",
      option_c: "60°C",
      option_d: "90°C",
      correct_option: "A",
      explanation: "Step 1: In steady-state series conduction, the rate of heat flow H is uniform through both slabs:\nH = (T_hot − θ) / R₁ = (θ − T_cold) / R₂.\n\nStep 2: Substitute T_hot = 120°C, T_cold = 20°C, R₁ = 2R, and R₂ = 3R:\n(120 − θ) / (2R) = (θ − 20) / (3R).\n\nStep 3: Cancel R and cross-multiply:\n3 (120 − θ) = 2 (θ − 20)\n360 − 3θ = 2θ − 40\n5θ = 400\nθ = 80°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2940, // Q10
    similar_question: {
      question: "A patient's body temperature rises by 4.5°C during a fever. What is the corresponding rise in temperature measured on the Fahrenheit scale?",
      option_a: "8.1°F",
      option_b: "4.5°F",
      option_c: "9.0°F",
      option_d: "2.5°F",
      correct_option: "A",
      explanation: "Step 1: The relationship between a temperature interval on the Celsius scale (ΔC) and the Fahrenheit scale (ΔF) is given by:\nΔF / 180 = ΔC / 100  →  ΔF = (9/5) ΔC.\n\nStep 2: Substitute the given temperature increase ΔC = 4.5°C:\nΔF = (9/5) × 4.5 = 9 × 0.9 = 8.1°F.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2941, // Q11
    similar_question: {
      question: "Two metal cylinders A and B made of the same material have lengths in the ratio 2 : 3 and radii in the ratio 1 : 2. When the same temperature difference is maintained across their ends in steady state, what is the ratio of the rate of heat conduction through cylinder A to that through cylinder B?",
      option_a: "3 : 8",
      option_b: "8 : 3",
      option_c: "1 : 6",
      option_d: "2 : 3",
      correct_option: "A",
      explanation: "Step 1: The rate of steady-state heat conduction through a cylinder of radius r, length L, and thermal conductivity K is:\nH = K A (ΔT) / L = K (π r²) (ΔT) / L.\n\nStep 2: Since K and ΔT are identical for both cylinders:\nH ∝ r² / L.\n\nStep 3: Therefore, the ratio of heat conduction rates is:\nH_A / H_B = (r_A / r_B)² × (L_B / L_A).\nSubstitute r_A / r_B = 1/2 and L_A / L_B = 2/3 (which means L_B / L_A = 3/2):\nH_A / H_B = (1/2)² × (3/2) = (1/4) × (3/2) = 3/8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2942, // Q12
    similar_question: {
      question: "Two solid copper spheres A and B have diameters in the ratio 1 : 3. If both spheres are heated to the same uniform temperature T and placed in identical evacuated chambers at 0 K, what is the ratio of their initial rates of heat radiation emission?",
      option_a: "1 : 9",
      option_b: "1 : 27",
      option_c: "1 : 3",
      option_d: "1 : 81",
      correct_option: "A",
      explanation: "Step 1: By Stefan's law, the radiant energy emitted per second by a body of surface area A and emissivity e at absolute temperature T is:\nE = e σ A T⁴.\n\nStep 2: For a sphere of diameter d, surface area is A = 4π (d/2)² = π d².\nThus, E ∝ d² (for identical material, surface finish, and temperature).\n\nStep 3: Given d_A / d_B = 1 / 3:\nE_A / E_B = (d_A / d_B)² = (1/3)² = 1/9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2943, // Q13
    similar_question: {
      question: "Two rods of different metals have the same cross-sectional area and offer identical thermal resistance to heat flow. If the ratio of their lengths is 3 : 2, what is the ratio of their thermal conductivities K₁ : K₂?",
      option_a: "3 : 2",
      option_b: "2 : 3",
      option_c: "9 : 4",
      option_d: "4 : 9",
      correct_option: "A",
      explanation: "Step 1: Thermal resistance of a conducting rod is given by:\nR = L / (K A).\n\nStep 2: For two rods having equal thermal resistance (R₁ = R₂) and equal cross-sectional area (A₁ = A₂):\nL₁ / (K₁ A) = L₂ / (K₂ A)  →  L₁ / K₁ = L₂ / K₂  →  K₁ / K₂ = L₁ / L₂.\n\nStep 3: Given L₁ / L₂ = 3 / 2, the ratio of thermal conductivities is:\nK₁ / K₂ = 3 / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2944, // Q14
    similar_question: {
      question: "Which of the following physical quantities does NOT influence the thermal conductivity (k) of a pure elemental metal rod?",
      option_a: "Dimensions (length and cross-sectional area) of the rod",
      option_b: "Chemical purity of the material",
      option_c: "Operating temperature of the metal",
      option_d: "Lattice structure of the metal",
      correct_option: "A",
      explanation: "Step 1: Thermal conductivity (k) is an intrinsic intensive material property, determined by microscopic electron and phonon transport within the substance.\n\nStep 2: It depends strongly on the nature of the material, lattice structure, impurity levels, and temperature.\n\nStep 3: It is completely independent of the macroscopic dimensions (such as length, thickness, or cross-sectional area) of the sample.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2945, // Q15
    similar_question: {
      question: "In which mode of thermal energy transfer does heat propagate strictly through the bulk physical migration of matter from one region to another?",
      option_a: "Convection",
      option_b: "Conduction",
      option_c: "Radiation",
      option_d: "Electronic excitation",
      correct_option: "A",
      explanation: "Step 1: In conduction, heat is transferred by microscopic atomic/molecular vibrations and free electron collisions without any net displacement of the medium particles.\n\nStep 2: In radiation, heat is transmitted through electromagnetic waves and requires no material medium.\n\nStep 3: In convection, warmer fluid regions expand, become less dense, and physically move upward, while cooler, denser fluid descends, carrying thermal energy via the actual bulk motion of the fluid particles.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2946, // Q16
    similar_question: {
      question: "At what numerical temperature do the Celsius and Fahrenheit temperature scales display the exact same value?",
      option_a: "−40°",
      option_b: "+40°",
      option_c: "−32°",
      option_d: "0°",
      correct_option: "A",
      explanation: "Step 1: The conversion formula between the Celsius scale (C) and the Fahrenheit scale (F) is:\nF = (9/5) C + 32.\n\nStep 2: Set F = C = x:\nx = (9/5) x + 32.\n\nStep 3: Solve for x:\nx − (9/5) x = 32\n−(4/5) x = 32\nx = −(32 × 5) / 4 = −40.\n\nStep 4: Thus, −40°C is equal to −40°F.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2947, // Q17
    similar_question: {
      question: "A composite slab consists of two layers of equal thickness d placed in series. The thermal conductivity of the first layer is 2k and that of the second layer is k. If the outer surfaces are maintained at steady temperatures 100°C and 10°C respectively, what is the interface temperature θ?",
      option_a: "70°C",
      option_b: "60°C",
      option_c: "55°C",
      option_d: "80°C",
      correct_option: "A",
      explanation: "Step 1: Under steady-state conditions, the heat current H passing through both layers is equal:\nH = k₁ A (T₁ − θ) / d₁ = k₂ A (θ − T₂) / d₂.\n\nStep 2: Since both layers have the same thickness (d₁ = d₂ = d) and area A:\nk₁ (T₁ − θ) = k₂ (θ − T₂).\n\nStep 3: Substitute k₁ = 2k, k₂ = k, T₁ = 100°C, and T₂ = 10°C:\n2k (100 − θ) = k (θ − 10)\n2 (100 − θ) = θ − 10\n200 − 2θ = θ − 10\n3θ = 210\nθ = 70°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2948, // Q18
    similar_question: {
      question: "Two solid copper cylinders A and B have lengths in the ratio 1 : 3 and radii in the ratio 3 : 1. If both cylinders experience the same rise in temperature, what is the ratio of the increase in volume of cylinder A to that of cylinder B (ΔV_A : ΔV_B)?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "9 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: The increase in volume of a solid upon thermal expansion is:\nΔV = V₀ γ ΔT, where V₀ = π r² L is initial volume and γ is coefficient of volume expansion.\n\nStep 2: Since both cylinders are made of the same material (same γ) and experience the same temperature rise (same ΔT):\nΔV_A / ΔV_B = V₀_A / V₀_B = (π r_A² L_A) / (π r_B² L_B) = (r_A / r_B)² × (L_A / L_B).\n\nStep 3: Substitute r_A / r_B = 3 / 1 and L_A / L_B = 1 / 3:\nΔV_A / ΔV_B = (3)² × (1/3) = 9 × (1/3) = 3 / 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2949, // Q19
    similar_question: {
      question: "Which of the following statements correctly describes the anomalous expansion behavior of liquid water as its temperature is increased from 0°C to 10°C at normal atmospheric pressure?",
      option_a: "Its volume first decreases to a minimum at 4°C, then increases; its density reaches a maximum at 4°C",
      option_b: "Its volume continuously increases, and its density continuously decreases",
      option_c: "Its volume first increases to a maximum at 4°C, then decreases",
      option_d: "Its density remains completely constant between 0°C and 4°C",
      correct_option: "A",
      explanation: "Step 1: Water exhibits an anomalous expansion property between 0°C and 4°C due to the collapse of open, cage-like hydrogen-bonded structures present in ice and cold water.\n\nStep 2: As water is heated from 0°C to 4°C, it contracts, meaning its volume decreases to a minimum value at 4°C.\n\nStep 3: Correspondingly, because density ρ = mass / volume, the density of water increases from 0°C to reach its maximum value (1000 kg/m³) at 4°C, after which it expands and density decreases with further heating.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2950, // Q20
    similar_question: {
      question: "On an arbitrary linear temperature scale X, the ice point of water is marked as 20°X and the steam point is marked as 220°X. What temperature on the scale X corresponds to 45°C on the Celsius scale?",
      option_a: "110°X",
      option_b: "100°X",
      option_c: "90°X",
      option_d: "120°X",
      correct_option: "A",
      explanation: "Step 1: For any linear temperature scale, the reading relates to the Celsius scale by:\n(Reading − Lower Fixed Point) / (Upper Fixed Point − Lower Fixed Point) = (C − 0) / (100 − 0).\n\nStep 2: For scale X, LFP = 20°X and UFP = 220°X:\n(X − 20) / (220 − 20) = C / 100\n(X − 20) / 200 = C / 100\nX − 20 = 2 C  →  X = 20 + 2 C.\n\nStep 3: Substitute C = 45°C:\nX = 20 + 2(45) = 20 + 90 = 110°X.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2951, // Q21
    similar_question: {
      question: "The mechanical equivalent of heat J represents the conversion factor between mechanical work (W) and heat energy (Q). What are the SI units and approximate numerical value of J?",
      option_a: "J/cal, with a value of approximately 4.186 J/cal",
      option_b: "cal/J, with a value of approximately 0.24 cal/J",
      option_c: "Dimensionless, with a value of exactly 1.000",
      option_d: "N·m/s, with a value of 9.8 J/cal",
      correct_option: "A",
      explanation: "Step 1: Joule's mechanical equivalent of heat is defined by the relation W = J Q, where W is work done in joules (J) and Q is heat produced in calories (cal).\n\nStep 2: Therefore, J = W / Q, giving it the units of Joules per Calorie (J/cal).\n\nStep 3: Experimentally, 1 calorie of heat is equivalent to approximately 4.184 to 4.186 Joules of mechanical work.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2952, // Q22
    similar_question: {
      question: "According to Fourier's law of steady-state 1D heat conduction, the rate of heat flow dQ/dt across a uniform solid slab of thickness Δx and cross-sectional area A maintained at temperature difference ΔT is given by:",
      option_a: "dQ/dt = −k A (dT/dx)",
      option_b: "dQ/dt = −k (dT/dx) / A",
      option_c: "dQ/dt = −k A² (dT/dx)",
      option_d: "dQ/dt = −k / (A dT/dx)",
      correct_option: "A",
      explanation: "Step 1: Fourier's law states that the rate of heat conduction is directly proportional to the cross-sectional area A perpendicular to heat flow and the temperature gradient (dT/dx) in the direction of flow.\n\nStep 2: Mathematically:\ndQ/dt = −k A (dT/dx),\nwhere k is the thermal conductivity of the material.\n\nStep 3: The negative sign indicates that heat flows spontaneously down the temperature gradient, from higher to lower temperature.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2953, // Q23
    similar_question: {
      question: "Which of the following sensitive instruments operates on the principle of the Seebeck thermoelectric effect and is specifically designed to detect and measure feeble thermal infrared radiation?",
      option_a: "Thermopile",
      option_b: "Constant-volume gas thermometer",
      option_c: "Pyrometer",
      option_d: "Platinum resistance thermometer",
      correct_option: "A",
      explanation: "Step 1: A thermopile consists of numerous thermocouples connected in series.\n\nStep 2: One set of junctions is blackened to absorb incident infrared/thermal radiation, raising their temperature, while the alternate junctions are shielded at a reference temperature.\n\nStep 3: Based on the Seebeck effect, this temperature differential generates a measurable thermoelectric EMF proportional to the intensity of the incident thermal radiation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2954, // Q24
    similar_question: {
      question: "A solid at −20°C is heated at a constant rate until it vaporizes. On the temperature versus time graph, the substance is undergoing melting during which of the following stages?",
      option_a: "The first horizontal plateau where temperature remains constant while latent heat of fusion is absorbed",
      option_b: "The initial sloping line from −20°C to 0°C",
      option_c: "The intermediate sloping line representing heating of liquid",
      option_d: "The second horizontal plateau where boiling occurs",
      correct_option: "A",
      explanation: "Step 1: When heat is supplied at a constant rate to a solid, its temperature initially rises linearly until it reaches its melting point.\n\nStep 2: At the melting point, the temperature remains constant over a time interval (forming the first horizontal plateau) because the heat supplied is consumed as latent heat of fusion to overcome intermolecular bonds and convert solid into liquid.\n\nStep 3: Once melting is complete, the temperature of the liquid rises again.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2955, // Q25
    similar_question: {
      question: "A uniform copper bar of length 50 cm has its left end A maintained at 100°C and its right end B at 20°C in steady state with no lateral heat loss. What is the temperature of the bar at a point located 15 cm from end A?",
      option_a: "76°C",
      option_b: "84°C",
      option_c: "68°C",
      option_d: "70°C",
      correct_option: "A",
      explanation: "Step 1: In steady state with no lateral heat loss, the temperature gradient along the bar is uniform:\ndT/dx = (T_B − T_A) / L = (20 − 100) / 50 = −80 / 50 = −1.6 °C/cm.\n\nStep 2: The temperature at a distance x = 15 cm from end A is:\nT(x) = T_A + (dT/dx) × x = 100 + (−1.6) × 15 = 100 − 24 = 76°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2956, // Q26
    similar_question: {
      question: "Two cylindrical metal rods X and Y have equal lengths, but the radius of rod X is 3 times the radius of rod Y (r_X = 3 r_Y). If both rods conduct heat at the exact same rate under identical end-to-end temperature differences, what is the relation between their thermal conductivities K_X and K_Y?",
      option_a: "K_X = K_Y / 9",
      option_b: "K_X = 9 K_Y",
      option_c: "K_X = K_Y / 3",
      option_d: "K_X = 3 K_Y",
      correct_option: "A",
      explanation: "Step 1: Rate of heat conduction through a rod is:\nH = K A (ΔT) / L = K (π r²) (ΔT) / L.\n\nStep 2: For equal heat conduction rates (H_X = H_Y) with identical length L and temperature difference ΔT:\nK_X (π r_X²) = K_Y (π r_Y²)  →  K_X r_X² = K_Y r_Y².\n\nStep 3: Substitute r_X = 3 r_Y:\nK_X (3 r_Y)² = K_Y r_Y²\n9 K_X r_Y² = K_Y r_Y²\nK_X = K_Y / 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2957, // Q27
    similar_question: {
      question: "According to kinetic theory of gases, absolute zero (0 K or −273.15°C) is theoretically defined as the temperature at which:",
      option_a: "The translational kinetic energy of ideal gas molecules drops to zero and molecular motion ceases",
      option_b: "All gases turn into superheated steam",
      option_c: "Liquid water boils spontaneously",
      option_d: "The volume of a real gas becomes infinitely large",
      correct_option: "A",
      explanation: "Step 1: According to kinetic theory, the average translational kinetic energy of an ideal gas molecule is directly proportional to absolute temperature:\n(1/2) m v_rms² = (3/2) k_B T.\n\nStep 2: As T → 0 K, the root-mean-square speed v_rms → 0, meaning thermal molecular motion ceases completely.\n\nStep 3: Under the ideal gas law (P V = n R T), both pressure and volume extrapolated for a point-mass gas become zero at 0 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2958, // Q28
    similar_question: {
      question: "Two identical rectangular metal blocks are connected end-to-end in series, and 60 J of heat is conducted through them in 8 minutes under a given temperature difference. If the two blocks are reconnected side-by-side in parallel across the same temperature difference, in how much time will 60 J of heat flow through them?",
      option_a: "2 minutes",
      option_b: "1 minute",
      option_c: "4 minutes",
      option_d: "16 minutes",
      correct_option: "A",
      explanation: "Step 1: Let R be the thermal resistance of a single block.\nIn series: R_series = R + R = 2R.\nIn parallel: R_parallel = (R × R) / (R + R) = R / 2.\n\nStep 2: The rate of heat flow is H = Q / t = ΔT / R_eq.\nFor a fixed heat amount Q and temperature difference ΔT:\nt ∝ R_eq.\n\nStep 3: Therefore, the ratio of conduction times is:\nt_parallel / t_series = R_parallel / R_series = (R / 2) / (2R) = 1/4.\n\nStep 4: Substitute t_series = 8 minutes:\nt_parallel = 8 / 4 = 2 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2959, // Q29
    similar_question: {
      question: "Three identical metal plates each of thickness d and cross-sectional area A have thermal conductivities K, 2K, and 3K. If they are placed face-to-face in series contact, what is the equivalent thermal conductivity K_eq of the composite slab of total thickness 3d?",
      option_a: "18K / 11",
      option_b: "6K / 11",
      option_c: "2K",
      option_d: "11K / 18",
      correct_option: "A",
      explanation: "Step 1: In series combination, total thermal resistance is the sum of individual resistances:\nR_eq = R₁ + R₂ + R₃.\n\nStep 2: Thermal resistance is R = L / (K A).\nHere L_total = 3d, so:\n(3d) / (K_eq A) = d / (K A) + d / (2K A) + d / (3K A).\n\nStep 3: Cancel d / A from both sides:\n3 / K_eq = 1/K + 1/(2K) + 1/(3K) = (6 + 3 + 2) / (6K) = 11 / (6K).\n\nStep 4: Solve for K_eq:\nK_eq / 3 = 6K / 11  →  K_eq = 18K / 11.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2960, // Q30
    similar_question: {
      question: "The coefficient of volume expansion of mercury is γ = 1.8 × 10⁻⁴ K⁻¹. What is the percentage decrease in the density of mercury when its temperature is increased by 50°C?",
      option_a: "0.9%",
      option_b: "1.8%",
      option_c: "0.45%",
      option_d: "2.7%",
      correct_option: "A",
      explanation: "Step 1: The density of a substance varies with temperature as:\nρ' = ρ₀ / (1 + γ ΔT) ≈ ρ₀ (1 − γ ΔT), since γ ΔT ≪ 1.\n\nStep 2: The fractional change (decrease) in density is:\n|Δρ| / ρ₀ = γ ΔT.\n\nStep 3: Substitute γ = 1.8 × 10⁻⁴ K⁻¹ and ΔT = 50°C:\n|Δρ| / ρ₀ = (1.8 × 10⁻⁴) × 50 = 9.0 × 10⁻³ = 0.009.\n\nStep 4: Expressed as a percentage:\nPercentage decrease = 0.009 × 100% = 0.9%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2961, // Q31
    similar_question: {
      question: "According to the Stefan-Boltzmann radiation law, if the absolute temperature of an ideal blackbody radiator is doubled, by what factor does its total emissive power increase?",
      option_a: "16 times",
      option_b: "8 times",
      option_c: "4 times",
      option_d: "2 times",
      correct_option: "A",
      explanation: "Step 1: The Stefan-Boltzmann law states that the total radiant energy emitted per second per unit area of a blackbody is:\nE = σ T⁴,\nwhere σ is the Stefan-Boltzmann constant and T is absolute temperature.\n\nStep 2: When the absolute temperature increases from T to 2T:\nE' = σ (2T)⁴ = σ (16 T⁴) = 16 (σ T⁴) = 16 E.\n\nStep 3: Therefore, the total radiant emissive power increases by a factor of 16.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2962, // Q32
    similar_question: {
      question: "A glass flask is filled to the brim with water at 4°C. What will happen to the water level if the temperature is either increased to 10°C or cooled to 0°C?",
      option_a: "In both cases, water overflows because water has its minimum volume at 4°C",
      option_b: "Water overflows only when heated to 10°C, and drops when cooled to 0°C",
      option_c: "Water overflows only when cooled to 0°C, and drops when heated to 10°C",
      option_d: "The water level remains exactly at the brim in both cases",
      correct_option: "A",
      explanation: "Step 1: Water has an anomalous thermal expansion behavior in the temperature range from 0°C to 4°C.\n\nStep 2: At 4°C, water has its maximum density and correspondingly its minimum specific volume.\n\nStep 3: If water at 4°C is heated toward 10°C, it expands. If water at 4°C is cooled toward 0°C, it also expands.\n\nStep 4: Since its volume increases in both directions away from 4°C, the water will overflow the brim in both cases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6153, // Q33
    similar_question: {
      question: "Why does a burn caused by 1 gram of steam at 100°C cause significantly more severe tissue damage than a burn caused by 1 gram of boiling liquid water at 100°C?",
      option_a: "Steam releases an extra 2260 J (540 cal) of latent heat of vaporization per gram as it condenses into water at 100°C",
      option_b: "The temperature of steam is higher than the temperature of boiling water",
      option_c: "Steam has a higher thermal conductivity than liquid water",
      option_d: "Steam molecules move slower and stick to human skin for a longer duration",
      correct_option: "A",
      explanation: "Step 1: Both steam and boiling water are at 100°C, but steam possesses an additional amount of latent heat of vaporization (L_v ≈ 2260 J/g or 540 cal/g).\n\nStep 2: When 1 g of boiling water at 100°C cools on skin, it releases heat only through temperature decrease: ΔQ = m c ΔT.\n\nStep 3: When 1 g of steam at 100°C touches the skin, it must first condense into liquid water at 100°C, releasing 2260 J of latent heat before the resulting hot water cools further.\n\nStep 4: This massive additional energy release causes much deeper and more severe thermal burns.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6154, // Q34
    similar_question: {
      question: "On a temperature-heat (T vs Q) diagram for water at 1 atm, what physical process corresponds to a horizontal line segment occurring at 0°C?",
      option_a: "Phase transition from solid ice to liquid water at constant temperature (melting)",
      option_b: "Heating of ice from sub-zero temperature up to 0°C",
      option_c: "Heating of liquid water from 0°C to 100°C",
      option_d: "Vaporization of liquid water into steam at constant temperature",
      correct_option: "A",
      explanation: "Step 1: During a phase transition of a pure substance at constant pressure, temperature remains strictly constant while heat is absorbed.\n\nStep 2: At 0°C and 1 atm, solid ice absorbs latent heat of fusion (L_f ≈ 3.34 × 10⁵ J/kg or 80 cal/g) to break hydrogen-bonded lattice bonds and convert into liquid water.\n\nStep 3: Because temperature does not change during this conversion, it appears as a horizontal plateau on a T vs Q graph.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6155, // Q35
    similar_question: {
      question: "At the microscopic level, the internal thermal energy of a monatomic ideal gas is directly proportional to which of the following?",
      option_a: "Total kinetic energy of the random translational motion of its atoms",
      option_b: "Bulk kinetic energy of the container moving through space",
      option_c: "Potential energy due to intermolecular gravitational attraction",
      option_d: "Nuclear binding energy inside the atomic nuclei",
      correct_option: "A",
      explanation: "Step 1: In a monatomic ideal gas, intermolecular forces are negligible, so there is no intermolecular potential energy.\n\nStep 2: Monatomic gas atoms possess only three translational degrees of freedom with no rotational or vibrational modes.\n\nStep 3: Therefore, the total internal thermal energy consists entirely of the sum of the kinetic energies associated with the disordered, random translational motion of all the individual atoms.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 12 Part 1 (${set12Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set12Part1Updates) {
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
        console.log(`[${successCount}/${set12Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 12 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
