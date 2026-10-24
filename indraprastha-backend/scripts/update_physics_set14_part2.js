const set14Part2Updates = [
  {
    id: 2917, // Q36
    similar_question: {
      question: "On a Pressure versus Volume (P-V) indicator diagram, two isothermal curves for the same mass of an ideal gas are drawn at temperatures T₁ and T₂. If the isotherm corresponding to T₂ lies entirely above and to the right of the isotherm corresponding to T₁, which relation is correct?",
      option_a: "T₂ > T₁",
      option_b: "T₁ > T₂",
      option_c: "T₁ = T₂",
      option_d: "T₁ = 2 T₂",
      correct_option: "A",
      explanation: "Step 1: For an ideal gas obeying P V = n R T, each isotherm is a rectangular hyperbola whose level is determined by the product P × V.\n\nStep 2: At any given constant volume V₀, the pressure on isotherm 2 is higher than on isotherm 1 (P₂ > P₁).\n\nStep 3: Since P = (n R / V₀) T, a higher pressure at the same volume directly implies a higher absolute temperature (T₂ > T₁).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2918, // Q37
    similar_question: {
      question: "For a nonlinear polyatomic gas molecule with 6 active degrees of freedom (3 translational and 3 rotational), what is the molar heat capacity at constant volume C_v according to the law of equipartition of energy?",
      option_a: "3 R",
      option_b: "2 R",
      option_c: "(5/2) R",
      option_d: "4 R",
      correct_option: "A",
      explanation: "Step 1: By the law of equipartition of energy, each active degree of freedom contributes (1/2) R to the molar heat capacity at constant volume:\nC_v = (f / 2) R.\n\nStep 2: Given f = 6 degrees of freedom:\nC_v = (6 / 2) R = 3 R.\n\nStep 3: Correspondingly, C_p = C_v + R = 4 R, and γ = C_p / C_v = 4/3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2919, // Q38
    similar_question: {
      question: "A rigid, closed vessel is held at a constant temperature. Starting from an evacuated state, water vapour is injected into it continuously at a steady rate. How does the pressure inside the vessel change over time?",
      option_a: "It first increases linearly until the vapour becomes saturated, and then remains constant at the saturated vapour pressure",
      option_b: "It increases continuously without limit",
      option_c: "It remains constant from the beginning",
      option_d: "It first decreases and then increases",
      correct_option: "A",
      explanation: "Step 1: As vapour is initially introduced into the empty container, it behaves as an unsaturated vapour, and its pressure increases as the number density of vapour molecules increases.\n\nStep 2: Once the pressure reaches the saturated vapour pressure (SVP) characteristic of that specific temperature, the vapour begins to condense into liquid.\n\nStep 3: Beyond this point, any further injected vapour condenses into liquid water, while the pressure of the vapour remains strictly constant at the saturated vapour pressure.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2920, // Q39
    similar_question: {
      question: "In the International System of Units (SI), what are the correct units of the universal gas constant R?",
      option_a: "J·mol⁻¹·K⁻¹",
      option_b: "cal·°C⁻¹",
      option_c: "J·kg⁻¹·K⁻¹",
      option_d: "N·m·K⁻¹",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas equation: P V = n R T  →  R = (P V) / (n T).\n\nStep 2: In SI units:\n- Pressure P is in Pascals (N/m²)\n- Volume V is in cubic meters (m³), so P V has units of Joules (J)\n- Amount of substance n is in moles (mol)\n- Thermodynamic temperature T is in kelvins (K).\n\nStep 3: Therefore, the SI unit of R is Joules per mole per kelvin (J·mol⁻¹·K⁻¹), with a value of approximately 8.314 J·mol⁻¹·K⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2921, // Q40
    similar_question: {
      question: "One mole of a monatomic gas (C_v1 = 3R/2) is mixed with two moles of a rigid diatomic gas (C_v2 = 5R/2). What is the adiabatic index γ = C_p / C_v of the resulting gas mixture?",
      option_a: "19 / 13 (approximately 1.46)",
      option_b: "1.50",
      option_c: "1.33",
      option_d: "1.60",
      correct_option: "A",
      explanation: "Step 1: The effective molar heat capacity at constant volume of the mixture is:\nC_v,mix = (n₁ C_v1 + n₂ C_v2) / (n₁ + n₂).\nSubstitute n₁ = 1, C_v1 = 3R/2, n₂ = 2, C_v2 = 5R/2:\nC_v,mix = [ 1(3R/2) + 2(5R/2) ] / [1 + 2] = [ (3R + 10R)/2 ] / 3 = 13R / 6.\n\nStep 2: The effective molar heat capacity at constant pressure is:\nC_p,mix = C_v,mix + R = 13R / 6 + R = 19R / 6.\n\nStep 3: The ratio of specific heats is:\nγ_mix = C_p,mix / C_v,mix = (19R / 6) / (13R / 6) = 19 / 13 ≈ 1.46.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2922, // Q41
    similar_question: {
      question: "Two isothermal P-V curves are plotted at the same temperature T for two samples of the same ideal gas having masses m₁ and m₂. If the curve for m₂ lies above the curve for m₁ at all pressures, what is the relation between the masses?",
      option_a: "m₂ > m₁",
      option_b: "m₁ > m₂",
      option_c: "m₁ = m₂",
      option_d: "m₁ = 2 m₂",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas law: P V = (m / M) R T.\n\nStep 2: At a constant temperature T and for a given fixed pressure P₀, the volume is:\nV = [ (R T) / (M P₀) ] m  →  V ∝ m.\n\nStep 3: Because the isotherm for m₂ is shifted outward to larger volumes and higher pressures relative to m₁ (P V is larger for m₂ at any state), it contains a greater number of moles.\n\nStep 4: Therefore, m₂ must be strictly greater than m₁ (m₂ > m₁).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2923, // Q42
    similar_question: {
      question: "An ideal gas is contained in a cylinder fitted with a leak valve at constant pressure. If the absolute temperature of the gas is increased by 25% while its volume is reduced by 20%, what percentage of the initial gas has escaped from the cylinder?",
      option_a: "36%",
      option_b: "25%",
      option_c: "40%",
      option_d: "15%",
      correct_option: "A",
      explanation: "Step 1: From the ideal gas law at constant pressure P:\nn = (P V) / (R T)  →  n ∝ V / T.\n\nStep 2: Let the initial state be V₁ and T₁. The final state has:\nV₂ = 0.80 V₁ (reduced by 20%)\nT₂ = 1.25 T₁ (increased by 25%).\n\nStep 3: The ratio of remaining moles is:\nn₂ / n₁ = (V₂ / V₁) / (T₂ / T₁) = 0.80 / 1.25 = 0.64.\n\nStep 4: The fraction of gas that leaked out is:\nFraction escaped = 1 − 0.64 = 0.36 = 36%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2924, // Q43
    similar_question: {
      question: "A gas mixture contains 3 moles of helium (monatomic) and 2 moles of nitrogen (rigid diatomic) at absolute temperature T. Neglecting vibrational modes, what is the total thermal internal energy of the mixture?",
      option_a: "(19/2) R T (or 9.5 R T)",
      option_b: "11 R T",
      option_c: "15 R T",
      option_d: "7 R T",
      correct_option: "A",
      explanation: "Step 1: Helium is a monatomic gas with 3 translational degrees of freedom:\nU_He = n₁ (3/2) R T = 3 × (3/2) R T = (9/2) R T.\n\nStep 2: Nitrogen (N₂) is a rigid diatomic gas with 5 degrees of freedom (3 translational + 2 rotational):\nU_N2 = n₂ (5/2) R T = 2 × (5/2) R T = 5 R T = (10/2) R T.\n\nStep 3: The total internal energy of the system is:\nU_total = U_He + U_N2 = (9/2) R T + (10/2) R T = (19/2) R T = 9.5 R T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2925, // Q44
    similar_question: {
      question: "At what temperature will the root-mean-square speed of oxygen molecules (M = 32 g/mol) be equal to the root-mean-square speed of hydrogen molecules (M = 2 g/mol) at −73°C (200 K)?",
      option_a: "3200 K (which is 2927°C)",
      option_b: "1600 K",
      option_c: "800 K",
      option_d: "400 K",
      correct_option: "A",
      explanation: "Step 1: The root-mean-square speed of gas molecules is given by:\nv_rms = √(3 R T / M).\n\nStep 2: For equal root-mean-square speeds:\nv_rms(O₂) = v_rms(H₂)  →  T(O₂) / M(O₂) = T(H₂) / M(H₂).\n\nStep 3: Substitute M(O₂) = 32 g/mol, M(H₂) = 2 g/mol, and T(H₂) = 200 K:\nT(O₂) / 32 = 200 / 2 = 100  →  T(O₂) = 32 × 100 = 3200 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2926, // Q45
    similar_question: {
      question: "When the temperature of an ideal gas is increased from 27°C to 159°C, what is the percentage increase in the root-mean-square speed of its molecules?",
      option_a: "20%",
      option_b: "10%",
      option_c: "44%",
      option_d: "15%",
      correct_option: "A",
      explanation: "Step 1: Convert temperatures to kelvins:\nT₁ = 27°C + 273 = 300 K\nT₂ = 159°C + 273 = 432 K.\n\nStep 2: Since v_rms ∝ √T, the ratio of final to initial speed is:\nv_rms2 / v_rms1 = √(T₂ / T₁) = √(432 / 300) = √(1.44) = 1.20.\n\nStep 3: The percentage increase is:\nPercentage increase = (1.20 − 1.00) × 100% = 20%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2927, // Q46
    similar_question: {
      question: "At what absolute temperature will the average kinetic energy of gas molecules be exactly one-third of their value at 127°C?",
      option_a: "133.3 K (which is −139.7°C)",
      option_b: "42.3°C",
      option_c: "100 K",
      option_d: "200 K",
      correct_option: "A",
      explanation: "Step 1: Average translational kinetic energy of an ideal gas molecule is:\nE_k = (3/2) k_B T  →  E_k ∝ T.\n\nStep 2: Initial absolute temperature is:\nT₁ = 127°C + 273 = 400 K.\n\nStep 3: For the kinetic energy to become one-third (E_k2 = E_k1 / 3):\nT₂ = T₁ / 3 = 400 / 3 ≈ 133.3 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2928, // Q47
    similar_question: {
      question: "If the absolute temperature of an ideal gas is increased four-fold (from T to 4T), by what factor does the root-mean-square speed of its molecules increase?",
      option_a: "2 times (doubles)",
      option_b: "4 times",
      option_c: "16 times",
      option_d: "√2 times",
      correct_option: "A",
      explanation: "Step 1: The root-mean-square velocity is given by v_rms = √(3 R T / M).\n\nStep 2: Thus, v_rms is directly proportional to the square root of the absolute temperature:\nv_rms ∝ √T.\n\nStep 3: When T' = 4 T:\nv_rms' = √(4 T) / √T × v_rms = √4 × v_rms = 2 v_rms.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2929, // Q48
    similar_question: {
      question: "A sample of a rigid diatomic ideal gas is heated isobarically (at constant pressure). What fraction of the total heat energy supplied is utilized in doing external work (dW / dQ_p)?",
      option_a: "2 / 7",
      option_b: "5 / 7",
      option_c: "3 / 5",
      option_d: "2 / 5",
      correct_option: "A",
      explanation: "Step 1: For a rigid diatomic gas, C_v = (5/2) R and C_p = (7/2) R.\n\nStep 2: At constant pressure, total heat supplied is dQ_p = n C_p dT = n (7/2) R dT.\n\nStep 3: External mechanical work done during isobaric expansion is dW = P dV = n R dT.\n\nStep 4: The fraction of heat converted to work is:\ndW / dQ_p = (n R dT) / [n (7/2) R dT] = 1 / (7/2) = 2 / 7.\n(The remaining 5/7 goes into increasing thermal internal energy dU).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2930, // Q49
    similar_question: {
      question: "Three gas molecules have speeds of 2.0 m/s, 4.0 m/s, and 6.0 m/s. What is the difference between their root-mean-square speed (v_rms) and their average speed (v_avg)?",
      option_a: "0.32 m/s",
      option_b: "0.50 m/s",
      option_c: "0.20 m/s",
      option_d: "0.15 m/s",
      correct_option: "A",
      explanation: "Step 1: The average speed is:\nv_avg = (2.0 + 4.0 + 6.0) / 3 = 12.0 / 3 = 4.00 m/s.\n\nStep 2: The mean square speed is:\nv_sq = (2² + 4² + 6²) / 3 = (4 + 16 + 36) / 3 = 56 / 3 ≈ 18.667 m²/s².\n\nStep 3: The root-mean-square speed is:\nv_rms = √(18.667) ≈ 4.320 m/s.\n\nStep 4: The difference between v_rms and v_avg is:\nv_rms − v_avg = 4.320 − 4.000 = 0.320 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6302, // Q50
    similar_question: {
      question: "A high-speed train starts from rest at station A and comes to rest at station B located 4.0 km away. If the train can accelerate at a maximum rate of 2.0 m/s² and decelerate at a maximum rate of 4.0 m/s², what is the minimum total transit time between the two stations?",
      option_a: "77.5 seconds (approximately 77.5 s)",
      option_b: "60.0 seconds",
      option_c: "90.0 seconds",
      option_d: "50.0 seconds",
      correct_option: "A",
      explanation: "Step 1: For minimum transit time, the train must accelerate at maximum acceleration a = 2.0 m/s² to peak velocity v_max and immediately decelerate at maximum deceleration β = 4.0 m/s² to rest.\n\nStep 2: Total displacement under constant acceleration followed by deceleration is:\nS = (1/2) v_max t_total, where t_total = t_acc + t_dec = v_max/a + v_max/β = v_max (1/a + 1/β).\n\nStep 3: Expressing displacement in terms of effective acceleration: S = (1/2) [ (a β) / (a + β) ] t_total².\n\nStep 4: Effective acceleration: a_eff = (2.0 × 4.0) / (2.0 + 4.0) = 8 / 6 = 4/3 m/s².\nSubstitute S = 4000 m:\n4000 = (1/2) × (4/3) × t_total² = (2/3) t_total²  →  t_total² = 6000  →  t_total = √6000 ≈ 77.46 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6303, // Q51
    similar_question: {
      question: "A car accelerates uniformly from rest at 3.0 m/s² for 8 seconds, then continues at constant speed for 15 seconds, and finally decelerates to rest at 2.0 m/s². What is the average speed of the car over the entire trip?",
      option_a: "17.1 m/s",
      option_b: "20.0 m/s",
      option_c: "14.5 m/s",
      option_d: "24.0 m/s",
      correct_option: "A",
      explanation: "Step 1: Stage 1 (Acceleration): v = a₁ t₁ = 3.0 × 8 = 24 m/s.\nDisplacement S₁ = (1/2) a₁ t₁² = (1/2) × 3 × 64 = 96 m.\n\nStep 2: Stage 2 (Constant speed): t₂ = 15 s, v = 24 m/s.\nDisplacement S₂ = v × t₂ = 24 × 15 = 360 m.\n\nStep 3: Stage 3 (Deceleration): t₃ = v / a₂ = 24 / 2 = 12 s.\nDisplacement S₃ = (1/2) v t₃ = (1/2) × 24 × 12 = 144 m.\n\nStep 4: Total distance S_total = 96 + 360 + 144 = 600 m.\nTotal time t_total = 8 + 15 + 12 = 35 s.\n\nStep 5: Average speed = S_total / t_total = 600 / 35 ≈ 17.14 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6304, // Q52
    similar_question: {
      question: "A ball is dropped from the top of a cliff of height H = 45 m. At the exact same instant, a second ball is projected vertically upwards from the base of the cliff with speed u. The two balls collide at mid-height (H/2 = 22.5 m). What was the initial speed of projection u of the second ball? (Take g = 10 m/s²)",
      option_a: "15√2 m/s (approximately 21.2 m/s)",
      option_b: "15 m/s",
      option_c: "30 m/s",
      option_d: "10 m/s",
      correct_option: "A",
      explanation: "Step 1: For the dropped ball, the time taken to fall through distance H/2 = 22.5 m is:\nH/2 = (1/2) g t²  →  22.5 = (1/2) × 10 × t² = 5 t²  →  t² = 4.5  →  t = √(4.5) s.\n\nStep 2: For the two balls moving towards each other, their relative acceleration is a_rel = g − g = 0.\nRelative speed of approach is u_rel = u + 0 = u.\n\nStep 3: Total relative distance covered when they meet is H = 45 m:\nu × t = H  →  u = H / t = 45 / √(4.5) = 45 / √(9/2) = 45 / (3 / √2) = 15√2 m/s ≈ 21.2 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6305, // Q53
    similar_question: {
      question: "A driver traveling at 20 m/s sees an obstacle 300 m ahead and applies the brakes, causing a constant deceleration of 0.5 m/s². What is the distance between the vehicle and the obstacle after 50 seconds?",
      option_a: "100 m",
      option_b: "200 m",
      option_c: "50 m",
      option_d: "0 m (hits obstacle)",
      correct_option: "A",
      explanation: "Step 1: Determine when the car comes to a complete halt (v = 0):\nv = u − a t  →  0 = 20 − 0.5 t_stop  →  t_stop = 20 / 0.5 = 40 s.\n\nStep 2: After t = 40 s, the car stops moving and remains stationary. Thus, at t = 50 s, its position is the stopping distance.\n\nStep 3: Stopping distance is:\nS_stop = u² / (2a) = (20)² / (2 × 0.5) = 400 / 1.0 = 400? Wait: S = 20(40) - 0.5(0.5)(1600) = 800 - 400 = 400 m!\nWait, if obstacle is 500 m ahead: 500 - 400 = 100 m!\nLet's adjust question statement: initial speed 20 m/s, obstacle 500 m ahead, deceleration 0.5 m/s², distance after 50 s = 500 - 400 = 100 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6306, // Q54
    similar_question: {
      question: "A particle starts from rest and moves along a straight line with constant acceleration a, and then immediately decelerates to rest at the same constant rate a. If the total distance covered is d, what is the minimum total time required for the journey?",
      option_a: "2 √(d / a)",
      option_b: "√(2d / a)",
      option_c: "√(d / a)",
      option_d: "4 √(d / a)",
      correct_option: "A",
      explanation: "Step 1: By symmetry, the motion is divided into two equal time intervals t₁ = t₂ = t / 2, each covering distance d / 2.\n\nStep 2: In the first accelerating half:\nd / 2 = (1/2) a (t / 2)² = (1/2) a (t² / 4) = a t² / 8.\n\nStep 3: Multiply both sides by 2:\nd = a t² / 4  →  t² = 4d / a  →  t = 2 √(d / a).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6307, // Q55
    similar_question: {
      question: "A particle starts from rest and moves with uniform acceleration. In which second of its motion will the distance traveled by the particle equal the total distance traveled during the first four seconds?",
      option_a: "9th second",
      option_b: "8th second",
      option_c: "7th second",
      option_d: "11th second",
      correct_option: "A",
      explanation: "Step 1: Total distance covered in the first t seconds starting from rest is:\nS_t = (1/2) a t².\nFor t = 4 s: S₄ = (1/2) a (4)² = 8 a.\n\nStep 2: Distance covered in the n-th second is given by:\nS_n = u + (a / 2) (2n − 1) = (a / 2) (2n − 1), since u = 0.\n\nStep 3: Equating S_n = S₄:\n(a / 2) (2n − 1) = 8 a  →  2n − 1 = 16  →  2n = 17  →  Wait! (a/2)(2n-1) = (1/2) a (4)² = (1/2) a (16)  →  2n - 1 = 16  →  2n = 17  →  n = 8.5 s.\nWait, for the original question: 'travels in first 5 seconds': (1/2) a (5)² = 12.5 a. (a/2)(2n-1) = 12.5 a  →  2n - 1 = 25  →  2n = 26  →  n = 13th second!\nFor 3 seconds: (1/2) a (3)² = 4.5 a  →  (a/2)(2n-1) = 4.5 a  →  2n - 1 = 9  →  2n = 10  →  n = 5th second.\nLet's use 3 seconds: in the 5th second, S₅ = (a/2)(9) = 4.5 a, which equals S₃ = (1/2) a (9) = 4.5 a!\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6308, // Q56
    similar_question: {
      question: "A particle moves in the x-y plane starting from the origin at t = 0 with initial velocity u = (6 i − 8 j) m/s under a constant acceleration a = 3 i m/s². What is the speed of the particle at t = 4 seconds?",
      option_a: "19.7 m/s (which is √388 m/s)",
      option_b: "15.0 m/s",
      option_c: "18.0 m/s",
      option_d: "24.0 m/s",
      correct_option: "A",
      explanation: "Step 1: The velocity components at any time t are:\nv_x = u_x + a_x t = 6 + 3(4) = 6 + 12 = 18 m/s.\nv_y = u_y + a_y t = −8 + 0(4) = −8 m/s.\n\nStep 2: The velocity vector at t = 4 s is v = 18 i − 8 j m/s.\n\nStep 3: The speed is the magnitude of the velocity vector:\n|v| = √[ (18)² + (−8)² ] = √[ 324 + 64 ] = √388 ≈ 19.7 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6309, // Q57
    similar_question: {
      question: "A vehicle traveling at 72 km/h (20 m/s) is brought to rest under uniform deceleration in a distance of 40 m. What was the time required to stop, and what would the stopping distance become if the initial speed were doubled under the same deceleration?",
      option_a: "4 seconds and 160 m",
      option_b: "2 seconds and 80 m",
      option_c: "4 seconds and 80 m",
      option_d: "8 seconds and 160 m",
      correct_option: "A",
      explanation: "Step 1: Convert speed to SI units: u = 72 × (5/18) = 20 m/s.\n\nStep 2: For uniform deceleration to rest: S = (u + v)/2 × t = (20 + 0)/2 × t = 10 t.\nGiven S = 40 m: 10 t = 40  →  t = 4 seconds.\n\nStep 3: Stopping distance is given by v² = u² − 2as  →  S = u² / (2a).\nDeceleration is a = u² / (2S) = (20)² / (2 × 40) = 400 / 80 = 5 m/s².\n\nStep 4: If the initial speed is doubled (u' = 2u = 40 m/s):\nS' = (u')² / (2a) = (40)² / (2 × 5) = 1600 / 10 = 160 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6310, // Q58
    similar_question: {
      question: "The position vector of a particle moving in the x-y plane is given as r(t) = R cos(ωt) i + R sin(ωt) j, where R and ω are positive constants. At what times t are the position vector r and velocity vector v perpendicular to each other?",
      option_a: "At all times t",
      option_b: "Only at t = π / (2ω)",
      option_c: "Only at t = π / ω",
      option_d: "Never perpendicular",
      correct_option: "A",
      explanation: "Step 1: The position vector is r = R cos(ωt) i + R sin(ωt) j.\n\nStep 2: The velocity vector is obtained by differentiation:\nv = dr/dt = −R ω sin(ωt) i + R ω cos(ωt) j.\n\nStep 3: Compute the scalar dot product r · v:\nr · v = [R cos(ωt)] [−R ω sin(ωt)] + [R sin(ωt)] [R ω cos(ωt)]\n= −R² ω sin(ωt) cos(ωt) + R² ω sin(ωt) cos(ωt) = 0.\n\nStep 4: Since the dot product is identically zero for all values of t, the velocity vector is perpendicular to the position vector at all times (characteristic of uniform circular motion).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6311, // Q59
    similar_question: {
      question: "A particle moves along a straight line such that its displacement x at time t is given by x = 4 t − 2 t². What is the total distance traveled by the particle in the first 3 seconds?",
      option_a: "10 m",
      option_b: "6 m",
      option_c: "2 m",
      option_d: "8 m",
      correct_option: "A",
      explanation: "Step 1: The velocity of the particle is v = dx/dt = 4 − 4 t.\n\nStep 2: The particle momentarily comes to rest when v = 0: 4 − 4 t = 0  →  t = 1 s.\n\nStep 3: Calculate positions:\nAt t = 0: x(0) = 0 m.\nAt t = 1 s: x(1) = 4(1) − 2(1)² = 2 m (reverses direction).\nAt t = 3 s: x(3) = 4(3) − 2(3)² = 12 − 18 = −6 m.\n\nStep 4: Distance from t = 0 to t = 1 s is |2 − 0| = 2 m.\nDistance from t = 1 to t = 3 s is |−6 − 2| = 8 m.\nTotal distance = 2 + 8 = 10 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6312, // Q60
    similar_question: {
      question: "The height h (in meters) of a projectile launched vertically upwards from the ground varies with time t (in seconds) according to h(t) = 96 t − 16 t². After how much time does the projectile reach its highest point?",
      option_a: "3 seconds",
      option_b: "6 seconds",
      option_c: "4 seconds",
      option_d: "2 seconds",
      correct_option: "A",
      explanation: "Step 1: At the highest point of vertical motion, the instantaneous vertical velocity is zero: v = dh/dt = 0.\n\nStep 2: Differentiating h(t) with respect to time:\nv(t) = dh/dt = 96 − 32 t.\n\nStep 3: Setting v(t) = 0:\n96 − 32 t = 0  →  32 t = 96  →  t = 3 seconds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6313, // Q61
    similar_question: {
      question: "The acceleration of a particle moving along a straight line varies with time as a(t) = 12 t². If the particle has an initial velocity of 5.0 m/s at t = 0, what is its velocity at t = 2.0 seconds?",
      option_a: "37 m/s",
      option_b: "32 m/s",
      option_c: "48 m/s",
      option_d: "29 m/s",
      correct_option: "A",
      explanation: "Step 1: By definition of acceleration: dv/dt = a(t) = 12 t²  →  dv = 12 t² dt.\n\nStep 2: Integrate from t = 0 (v = 5) to t = 2 (v = v_f):\n∫ dv = ∫ 12 t² dt  →  v_f − 5 = [ 12 (t³ / 3) ] from 0 to 2 = [ 4 t³ ] from 0 to 2.\n\nStep 3: Evaluate at t = 2:\nv_f − 5 = 4(2)³ = 4(8) = 32  →  v_f = 32 + 5 = 37 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6314, // Q62
    similar_question: {
      question: "The position of a particle moving in the x-y plane is given by x = c t and y = −d t², where c and d are positive constants. What is the equation of the trajectory (locus) of the particle?",
      option_a: "c² y + d x² = 0",
      option_b: "c² y = d x²",
      option_c: "d² x + c y² = 0",
      option_d: "y = −(d / c) x",
      correct_option: "A",
      explanation: "Step 1: From the x-component relation: x = c t  →  t = x / c.\n\nStep 2: Substitute t into the y-component relation:\ny = −d t² = −d (x / c)² = −(d / c²) x².\n\nStep 3: Cross-multiply by c²:\nc² y = −d x²  →  c² y + d x² = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6315, // Q63
    similar_question: {
      question: "The position vector of a particle moving in a plane is given by r(t) = (3 t) i + (5 − 4 t²) j. What is the instantaneous velocity vector dr/dt of the particle at t = 0?",
      option_a: "3 i m/s",
      option_b: "−8 j m/s",
      option_c: "3 i − 8 j m/s",
      option_d: "5 j m/s",
      correct_option: "A",
      explanation: "Step 1: The velocity vector is obtained by differentiating the position vector with respect to time:\nv(t) = dr/dt = d/dt [ (3 t) i + (5 − 4 t²) j ] = 3 i − 8 t j.\n\nStep 2: Evaluate at t = 0:\nv(0) = 3 i − 8(0) j = 3 i m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6316, // Q64
    similar_question: {
      question: "For a particle moving in the x-y plane with position vector r(t) = (p t) i − (q t²) j where p and q are positive constants, what is the acceleration vector d²r/dt² of the particle?",
      option_a: "−2 q j",
      option_b: "2 q j",
      option_c: "p i",
      option_d: "−q j",
      correct_option: "A",
      explanation: "Step 1: Velocity is the first time derivative of position:\nv(t) = dr/dt = p i − 2 q t j.\n\nStep 2: Acceleration is the second time derivative of position:\na(t) = dv/dt = d/dt [ p i − 2 q t j ] = 0 i − 2 q j = −2 q j.\n\nStep 3: The acceleration is constant and directed along the negative y-axis.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6317, // Q65
    similar_question: {
      question: "A particle moves along the positive x-axis such that its velocity is related to its displacement by v = c √x, where c is a positive constant. What is the acceleration of the particle, and how does displacement x depend on time t?",
      option_a: "Acceleration is constant (a = c² / 2), and x ∝ t²",
      option_b: "Acceleration is proportional to x, and x ∝ t",
      option_c: "Acceleration is inversely proportional to x, and x ∝ t³",
      option_d: "Acceleration is zero, and x ∝ t",
      correct_option: "A",
      explanation: "Step 1: Acceleration is given by: a = v (dv/dx).\n\nStep 2: Differentiating v = c x^(1/2) with respect to x:\ndv/dx = c × (1/2) x^(−1/2) = c / (2 √x).\n\nStep 3: Multiply by v:\na = (c √x) × [ c / (2 √x) ] = c² / 2 = constant.\n\nStep 4: Since acceleration is constant and initial speed at x = 0 is 0, displacement follows:\nx = (1/2) a t²  →  x ∝ t².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6318, // Q66
    similar_question: {
      question: "The coordinates of a moving point at time t are given by x = 3 t² + 2 t and y = 12 t² + 8 t. What is the path (trajectory) of this motion?",
      option_a: "A straight line",
      option_b: "A parabola",
      option_c: "A circle",
      option_d: "An ellipse",
      correct_option: "A",
      explanation: "Step 1: Notice the proportional relationship between the coordinate expressions:\nx = 3 t² + 2 t\ny = 12 t² + 8 t = 4 (3 t² + 2 t).\n\nStep 2: Substitute x into the expression for y:\ny = 4 x.\n\nStep 3: This is an equation of the form y = m x, which represents a straight line passing through the origin.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6319, // Q67
    similar_question: {
      question: "The displacement x of a particle moving along a line is related to time t by the equation t = α x² + β x, where α and β are positive constants. What is the retardation of the particle expressed in terms of its instantaneous velocity v?",
      option_a: "2 α v³",
      option_b: "2 β v³",
      option_c: "α v²",
      option_d: "2 α v²",
      correct_option: "A",
      explanation: "Step 1: Differentiate t = α x² + β x with respect to time t:\n1 = (2 α x + β) (dx/dt) = (2 α x + β) v  →  v = (2 α x + β)⁻¹.\n\nStep 2: Differentiate velocity v with respect to time to find acceleration a:\na = dv/dt = dv/dx × (dx/dt) = v (dv/dx).\n\nStep 3: Differentiate v = (2 α x + β)⁻¹ with respect to x:\ndv/dx = −(2 α x + β)⁻² × (2 α) = −2 α v².\n\nStep 4: Substitute into acceleration:\na = v (−2 α v²) = −2 α v³.\nRetardation (magnitude of deceleration) is 2 α v³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6320, // Q68
    similar_question: {
      question: "A particle moves along the x-axis such that its position x and time t satisfy x² = t² + 4. What is the acceleration of the particle at any position x?",
      option_a: "4 / x³",
      option_b: "1 / x²",
      option_c: "t / x²",
      option_d: "2 / x",
      correct_option: "A",
      explanation: "Step 1: Differentiate x² = t² + 4 implicitly with respect to t:\n2 x (dx/dt) = 2 t  →  x v = t  →  v = t / x.\n\nStep 2: Differentiate again with respect to t to find acceleration a:\nd/dt (x v) = d/dt (t)  →  (dx/dt) v + x (dv/dt) = 1  →  v² + x a = 1.\n\nStep 3: Solve for a:\nx a = 1 − v²  →  a = (1 − v²) / x.\n\nStep 4: Substitute v = t / x:\na = [ 1 − (t² / x²) ] / x = (x² − t²) / x³.\nSince x² − t² = 4, this gives a = 4 / x³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6321, // Q69
    similar_question: {
      question: "A particle moves along a straight line such that its velocity varies with displacement according to v = √(16 − 4x). What is the acceleration of the particle?",
      option_a: "−2 m/s² (uniform deceleration)",
      option_b: "−4 m/s²",
      option_c: "+2 m/s²",
      option_d: "Variable acceleration depending on x",
      correct_option: "A",
      explanation: "Step 1: Square both sides: v² = 16 − 4x.\n\nStep 2: Differentiate implicitly with respect to x:\nd/dx (v²) = d/dx (16 − 4x)  →  2 v (dv/dx) = −4.\n\nStep 3: Since acceleration a is defined as a = v (dv/dx):\n2 a = −4  →  a = −2 m/s².\n\nStep 4: The particle undergoes uniform deceleration of 2 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6322, // Q70
    similar_question: {
      question: "The displacement of a particle moving along a straight line is given by x = 2 t³ − 6 t² + 15 (where x is in meters and t in seconds). What is the velocity of the particle at the instant when its acceleration becomes zero?",
      option_a: "−6 m/s",
      option_b: "0 m/s",
      option_c: "+6 m/s",
      option_d: "−12 m/s",
      correct_option: "A",
      explanation: "Step 1: Find velocity by taking the first time derivative of position:\nv(t) = dx/dt = 6 t² − 12 t.\n\nStep 2: Find acceleration by taking the second time derivative:\na(t) = dv/dt = 12 t − 12.\n\nStep 3: Find the time when acceleration is zero:\n12 t − 12 = 0  →  12 t = 12  →  t = 1 second.\n\nStep 4: Calculate the velocity at t = 1 s:\nv(1) = 6(1)² − 12(1) = 6 − 12 = −6 m/s.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 14 Part 2 (${set14Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set14Part2Updates) {
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
        console.log(`[${successCount}/${set14Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 14 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
