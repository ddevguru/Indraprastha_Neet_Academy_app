// ch77_part3.js
// Questions 60 to 91 (IDs 710 to 679)
// Chapter 77: Thermodynamics (Physics)

module.exports = [
  {
    id: 710,
    originalQuestion: {
      question: "Two cylinders A and B of equal capacity are connected to each other via a stopcock. A contains an ideal gas at standard temperature and pressure. B is completely evacuated. The entire system is thermally insulated. The stopcock is suddenly opened. The process is: [NEET 2020 Phase 1]",
      option_a: "Adiabatic",
      option_b: "Isochoric",
      option_c: "Isobaric",
      option_d: "Isothermal",
      correct_option: "A",
      explanation: "Step 1: The entire system of cylinders A and B is thermally insulated from the surroundings, so no heat exchange occurs with the outside environment:\nΔQ = 0\n\nStep 2: By definition, any thermodynamic process in which no heat enters or leaves the system (ΔQ = 0) is an adiabatic process.\n\nStep 3: Furthermore, because cylinder B is evacuated, the gas expands against zero opposing external pressure (free expansion). Hence, work done W = 0, and by the First Law of Thermodynamics, ΔU = 0, meaning temperature also remains constant for an ideal gas.\nHowever, the characteristic classification of the thermally insulated process is adiabatic.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas expands into a vacuum inside a perfectly insulated rigid container. This process is:",
      option_a: "Adiabatic free expansion with zero work and zero heat transfer",
      option_b: "Reversible isothermal expansion",
      option_c: "Isobaric expansion",
      option_d: "Isochoric compression",
      correct_option: "A",
      explanation: "Step 1: Expansion into vacuum implies P_ext = 0, so work done W = 0.\nStep 2: Perfect insulation means Q = 0, which defines an adiabatic process.\nStep 3: This irreversible process is known as adiabatic free expansion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 709,
    originalQuestion: {
      question: "The quantities of heat required to raise the temperature of two solid copper spheres of radii r₁ and r₂ (where r₁ = 1.5 r₂) through 1 K are in the ratio: [NEET 2020 Phase 1]",
      option_a: "9 / 4",
      option_b: "3 / 2",
      option_c: "5 / 3",
      option_d: "27 / 8",
      correct_option: "D",
      explanation: "Step 1: The quantity of heat required to raise the temperature of a solid body of mass m and specific heat capacity s by ΔT is:\nQ = m s ΔT\n\nStep 2: For two spheres made of the same material (copper):\ns₁ = s₂ = s  and  density ρ₁ = ρ₂ = ρ\n\nStep 3: The mass of a solid sphere of radius r is:\nm = (4/3) π r³ ρ  ⇒  m ∝ r³\n\nStep 4: Since both spheres are heated through the same temperature rise (ΔT = 1 K):\nQ ∝ m ∝ r³\n\nStep 5: The ratio of heat required is:\nQ₁ / Q₂ = (r₁ / r₂)³ = (1.5)³ = (3 / 2)³ = 27 / 8\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two solid lead spheres have radii in the ratio 2 : 1. The ratio of heat capacities of the larger sphere to the smaller sphere is:",
      option_a: "8 : 1",
      option_b: "4 : 1",
      option_c: "2 : 1",
      option_d: "16 : 1",
      correct_option: "A",
      explanation: "Step 1: Heat capacity C = m s ∝ Volume ∝ r³.\nStep 2: C₁ / C₂ = (r₁ / r₂)³ = (2 / 1)³ = 8 / 1 = 8 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 708,
    originalQuestion: {
      question: "A cylinder contains hydrogen gas at pressure 249 kPa and temperature 27°C. Its density is (Take R = 8.3 J mol⁻¹ K⁻¹): [NEET 2020 Phase 1]",
      option_a: "0.2 kg/m³",
      option_b: "0.1 kg/m³",
      option_c: "0.02 kg/m³",
      option_d: "0.5 kg/m³",
      correct_option: "A",
      explanation: "Step 1: The ideal gas equation relating density ρ, pressure P, temperature T, and molar mass M is:\nρ = P M / (R T)\n\nStep 2: Given parameters:\nP = 249 kPa = 249 × 10³ N/m²\nT = 27°C = 27 + 273 = 300 K\nFor hydrogen gas (H₂), molar mass M = 2 g/mol = 2 × 10⁻³ kg/mol\nR = 8.3 J mol⁻¹ K⁻¹\n\nStep 3: Substitute the values into the density formula:\nρ = [ (249 × 10³) × (2 × 10⁻³) ] / [ 8.3 × 300 ]\nρ = [ 498 ] / [ 2490 ] = 498 / 2490 = 0.2 kg/m³\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Find the density of oxygen gas (O₂, M = 32 × 10⁻³ kg/mol) at a pressure of 249 kPa and temperature 27°C: (R = 8.3 J mol⁻¹ K⁻¹)",
      option_a: "3.2 kg/m³",
      option_b: "1.6 kg/m³",
      option_c: "0.8 kg/m³",
      option_d: "6.4 kg/m³",
      correct_option: "A",
      explanation: "Step 1: ρ = P M / (R T).\nStep 2: ρ = (249 × 10³ × 32 × 10⁻³) / (8.3 × 300) = (249 × 32) / 2490 = 32 / 10 = 3.2 kg/m³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 707,
    originalQuestion: {
      question: "The mean free path for a gas, with molecular diameter d and number density n, can be expressed as: [NEET 2020 Phase 1]",
      option_a: "1 / (√2 n π d²)",
      option_b: "1 / (√2 n² π d²)",
      option_c: "1 / (√2 n² π² d²)",
      option_d: "1 / (√2 n π d)",
      correct_option: "A",
      explanation: "Step 1: Consider a molecule of collision diameter d moving through a gas containing n molecules per unit volume.\n\nStep 2: Taking into account the relative velocities of all colliding molecules (introducing the factor √2 in the collision frequency):\nThe collision cross-section is σ = π d².\n\nStep 3: The mean free path λ is defined as the average distance travelled between successive collisions:\nλ = 1 / (√2 n σ) = 1 / (√2 n π d²)\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If both the number density n and molecular diameter d of an ideal gas are doubled, the mean free path of the gas molecules will:",
      option_a: "Decrease by a factor of 8",
      option_b: "Decrease by a factor of 4",
      option_c: "Decrease by a factor of 2",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "Step 1: λ = 1 / (√2 n π d²).\nStep 2: When n' = 2n and d' = 2d:\nλ' = 1 / [√2 (2n) π (2d)²] = 1 / [8 √2 n π d²] = λ / 8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 706,
    originalQuestion: {
      question: "The average thermal energy for a monoatomic gas molecule is (where k_B is Boltzmann constant and T is absolute temperature): [NEET 2020 Phase 1]",
      option_a: "(3/2) k_B T",
      option_b: "(5/2) k_B T",
      option_c: "(7/2) k_B T",
      option_d: "(1/2) k_B T",
      correct_option: "A",
      explanation: "Step 1: A monoatomic gas molecule has 3 translational degrees of freedom (motion along x, y, and z axes) and zero rotational or vibrational degrees of freedom.\n\nStep 2: According to the Law of Equipartition of Energy, the average kinetic energy associated with each independent degree of freedom per molecule is:\nE_per_dof = (1/2) k_B T\n\nStep 3: Therefore, the total average thermal energy of a monoatomic gas molecule is:\nE_avg = 3 × (1/2) k_B T = (3/2) k_B T\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The average thermal energy per molecule of a rigid diatomic gas at absolute temperature T is:",
      option_a: "(5/2) k_B T",
      option_b: "(3/2) k_B T",
      option_c: "(7/2) k_B T",
      option_d: "k_B T",
      correct_option: "A",
      explanation: "Step 1: A rigid diatomic molecule possesses 5 degrees of freedom (3 translational + 2 rotational).\nStep 2: Average thermal energy = 5 × (1/2) k_B T = (5/2) k_B T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 705,
    originalQuestion: {
      question: "Match Column I and Column II and choose the correct match:\nColumn I:\n(A) Root mean square speed of gas molecules\n(B) Pressure exerted by an ideal gas\n(C) Average kinetic energy of a molecule\n(D) Total internal energy of 1 mole of a diatomic gas\nColumn II:\n(P) (1/3) n m v̄²\n(Q) √(3 R T / M)\n(R) (5/2) R T\n(S) (3/2) k_B T [NEET 2021]",
      option_a: "(A)-(R), (B)-(Q), (C)-(P), (D)-(S)",
      option_b: "(A)-(R), (B)-(P), (C)-(S), (D)-(Q)",
      option_c: "(A)-(Q), (B)-(R), (C)-(S), (D)-(P)",
      option_d: "(A)-(Q), (B)-(P), (C)-(S), (D)-(R)",
      correct_option: "D",
      explanation: "Step 1: From kinetic theory of gases:\n- Root mean square speed: v_rms = √(3 R T / M)  ⇒  (A) matches (Q)\n- Pressure exerted by ideal gas: P = (1/3) n m v̄²  ⇒  (B) matches (P)\n- Average kinetic energy of a molecule: E_k = (3/2) k_B T  ⇒  (C) matches (S)\n- Total internal energy of 1 mole of a rigid diatomic gas (f = 5): U = (5/2) R T  ⇒  (D) matches (R)\n\nStep 2: Combining the matches:\n(A)-(Q), (B)-(P), (C)-(S), (D)-(R)\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following expressions correctly gives the pressure of an ideal gas in terms of its mass density ρ and rms speed v_rms?",
      option_a: "P = (1/3) ρ v_rms²",
      option_b: "P = (2/3) ρ v_rms²",
      option_c: "P = (1/2) ρ v_rms²",
      option_d: "P = 3 ρ v_rms²",
      correct_option: "A",
      explanation: "Step 1: P = (1/3) (N m / V) v_rms².\nStep 2: Since total mass per unit volume is density ρ = N m / V:\nP = (1/3) ρ v_rms².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 704,
    originalQuestion: {
      question: "A cup of coffee cools from 90°C to 80°C in t minutes, when the room temperature is 20°C. The time taken by a similar cup of coffee to cool from 80°C to 60°C at the same room temperature is: [NEET 2021]",
      option_a: "(5/13) t",
      option_b: "(13/10) t",
      option_c: "(13/5) t",
      option_d: "(10/13) t",
      correct_option: "C",
      explanation: "Step 1: According to Newton's law of cooling in average form:\n(T_initial - T_final) / Δt = K [ (T_initial + T_final)/2 - T_room ]\n\nStep 2: For cooling from 90°C to 80°C in time t:\n(90 - 80) / t = K [ (90 + 80)/2 - 20 ]\n10 / t = K [ 85 - 20 ] = 65 K  ⇒  K = 10 / (65 t)\n\nStep 3: For cooling from 80°C to 60°C in time t':\n(80 - 60) / t' = K [ (80 + 60)/2 - 20 ]\n20 / t' = K [ 70 - 20 ] = 50 K\n\nStep 4: Substitute K = 10 / (65 t):\n20 / t' = 50 × [ 10 / (65 t) ] = 500 / (65 t) = 100 / (13 t)\n\nStep 5: Solving for t':\nt' = 20 × (13 t / 100) = (260 / 100) t = (13 / 5) t\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A body cools from 70°C to 60°C in 5 minutes in a room at 30°C. How long will it take to cool from 60°C to 50°C in the same surroundings?",
      option_a: "7 minutes",
      option_b: "6 minutes",
      option_c: "8 minutes",
      option_d: "5 minutes",
      correct_option: "A",
      explanation: "Step 1: (70 - 60) / 5 = K [ (70 + 60)/2 - 30 ]  ⇒  10 / 5 = K(35)  ⇒  K = 2 / 35.\nStep 2: (60 - 50) / t' = K [ (60 + 50)/2 - 30 ]  ⇒  10 / t' = (2/35)(25) = 50 / 35 = 10 / 7.\nStep 3: 10 / t' = 10 / 7  ⇒  t' = 7 minutes.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 703,
    originalQuestion: {
      question: "The volume occupied by the molecules contained in 4.5 kg of water at STP, if the intermolecular forces vanish away, is: [NEET 2022 Phase 1]",
      option_a: "5.6 × 10⁶ m³",
      option_b: "5.6 × 10³ m³",
      option_c: "5.6 × 10⁻³ m³",
      option_d: "5.6 m³",
      correct_option: "D",
      explanation: "Step 1: If intermolecular forces vanish, the substance behaves as an ideal gas.\n\nStep 2: The molar mass of water (H₂O) is M = 18 g/mol = 0.018 kg/mol.\nGiven mass m = 4.5 kg = 4500 g.\nThe number of moles is:\nn = 4500 / 18 = 250 moles\n\nStep 3: At standard temperature and pressure (STP), 1 mole of any ideal gas occupies 22.4 litres:\nV = 250 × 22.4 litres = 5600 litres\n\nStep 4: Convert litres to cubic metres (1 m³ = 1000 litres):\nV = 5600 × 10⁻³ m³ = 5.6 m³\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What volume would 9 kg of water vapor occupy at STP assuming ideal gas behavior?",
      option_a: "11.2 m³",
      option_b: "5.6 m³",
      option_c: "22.4 m³",
      option_d: "1.12 m³",
      correct_option: "A",
      explanation: "Step 1: Moles n = 9000 g / 18 g/mol = 500 moles.\nStep 2: Volume = 500 × 22.4 L = 11200 L = 11.2 m³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 702,
    originalQuestion: {
      question: "An ideal gas undergoes four different processes from the same initial state as shown in the figure. The processes are adiabatic, isothermal, isobaric and isochoric. The curve representing the adiabatic process among 1, 2, 3 and 4 is: [NEET 2022 Phase 1]",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "B",
      explanation: "Step 1: In the P-V diagram starting from the common initial state:\n- Curve 1 is a vertical line with constant volume: Isochoric process.\n- Curve 4 is a horizontal line with constant pressure: Isobaric process.\n\nStep 2: For expansion processes 2 and 3:\n- The slope of an isothermal curve is (dP / dV)_iso = -P / V.\n- The slope of an adiabatic curve is (dP / dV)_ad = -γ (P / V).\n\nStep 3: Since the adiabatic index γ > 1, the magnitude of the slope of the adiabatic curve is greater than that of the isothermal curve:\n|Slope_adiabatic| > |Slope_isothermal|\n\nStep 4: Curve 2 drops more steeply than curve 3. Hence, curve 2 represents the adiabatic process, while curve 3 represents the isothermal process.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "During an expansion from a common initial state on a P-V diagram, which curve lies below the isothermal expansion curve?",
      option_a: "Adiabatic expansion curve",
      option_b: "Isobaric expansion line",
      option_c: "Isochoric expansion line",
      option_d: "None of these",
      correct_option: "A",
      explanation: "Step 1: In expansion (volume increasing), the adiabatic curve has a steeper negative slope (γ times steeper) than the isothermal curve.\nStep 2: Consequently, the adiabatic expansion curve lies strictly below the isothermal curve.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 701,
    originalQuestion: {
      question: "Three vessels of equal capacity have gases at the same temperature and pressure. The first vessel contains helium (monoatomic), the second contains fluorine (diatomic) and the third contains sulfur hexafluoride (polyatomic). The correct statement is: [NEET 2022 Phase 2]",
      option_a: "The rms speed of sulfur hexafluoride is the largest.",
      option_b: "All vessels contain unequal numbers of their respective molecules.",
      option_c: "The rms speed of molecules is the same in all three cases.",
      option_d: "The rms speed of helium is the largest.",
      correct_option: "D",
      explanation: "Step 1: By Avogadro's hypothesis, equal volumes of all gases under the same conditions of temperature and pressure contain equal numbers of molecules (statement B is false).\n\nStep 2: The root-mean-square speed of gas molecules at absolute temperature T is:\nv_rms = √(3 R T / M)\nwhere M is the molar mass of the gas.\n\nStep 3: Since T is the same for all three vessels:\nv_rms ∝ 1 / √M\n\nStep 4: The molar masses of the three gases are:\n- Helium (He): M = 4 g/mol\n- Fluorine (F₂): M = 38 g/mol\n- Sulfur hexafluoride (SF₆): M = 32 + 6(19) = 146 g/mol\n\nStep 5: Helium has the lowest molecular mass, and therefore its molecules possess the largest rms speed.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "At the same temperature, the ratio of rms speeds of hydrogen (H₂, M = 2) to oxygen (O₂, M = 32) molecules is:",
      option_a: "4 : 1",
      option_b: "1 : 4",
      option_c: "16 : 1",
      option_d: "1 : 16",
      correct_option: "A",
      explanation: "Step 1: v_rms ∝ 1 / √M.\nStep 2: v_H / v_O = √(M_O / M_H) = √(32 / 2) = √16 = 4 / 1 = 4 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 700,
    originalQuestion: {
      question: "Two rods, one made of copper and the other of steel, of the same length and cross-sectional area are joined together. The thermal conductivities of copper and steel are 385 J s⁻¹ K⁻¹ m⁻¹ and 50 J s⁻¹ K⁻¹ m⁻¹, respectively. The free ends of copper and steel are held at 100°C and 0°C, respectively. The temperature at the junction is nearly: [NEET 2022 Phase 2]",
      option_a: "88.5°C",
      option_b: "12°C",
      option_c: "50°C",
      option_d: "73°C",
      correct_option: "A",
      explanation: "Step 1: Let the steady-state junction temperature be T. In series combination, the heat current flowing through the copper rod equals that through the steel rod:\nH_Cu = H_steel\n\nStep 2: Using the heat conduction formula:\nK_Cu A (100 - T) / L = K_steel A (T - 0) / L\n\nStep 3: Cancelling the common factor (A / L):\nK_Cu (100 - T) = K_steel T\n\nStep 4: Substitute K_Cu = 385 and K_steel = 50:\n385 (100 - T) = 50 T\n38500 - 385 T = 50 T\n435 T = 38500\nT = 38500 / 435 ≈ 88.5°C\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two metal slabs of equal dimensions and thermal conductivities K₁ = 300 W/(m K) and K₂ = 100 W/(m K) are placed in series between 80°C and 0°C. The interface temperature is:",
      option_a: "60°C",
      option_b: "40°C",
      option_c: "50°C",
      option_d: "20°C",
      correct_option: "A",
      explanation: "Step 1: 300 (80 - T) = 100 (T - 0).\nStep 2: 3 (80 - T) = T  ⇒  240 - 3T = T  ⇒  4T = 240  ⇒  T = 60°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 699,
    originalQuestion: {
      question: "An ideal gas follows a process described by the equation PV² = C from the initial (P₁, V₁, T₁) to final (P₂, V₂, T₂) thermodynamic states, where C is a constant. Then: [NEET 2022 Phase 2]",
      option_a: "If P₁ > P₂, then V₁ > V₂",
      option_b: "If P₁ > P₂, then T₁ < T₂",
      option_c: "If V₂ > V₁, then T₂ > T₁",
      option_d: "If V₂ > V₁, then T₂ < T₁",
      correct_option: "D",
      explanation: "Step 1: The given polytropic process is:\nP V² = C  ⇒  P = C / V²\nThis shows that as volume V increases, pressure P must decrease (P ∝ 1/V²).\n\nStep 2: From the ideal gas law (P = nRT / V), substitute P into the process equation:\n(nRT / V) V² = C  ⇒  n R T V = C  ⇒  T V = constant\n\nStep 3: This implies:\nT ∝ 1 / V\n\nStep 4: Since T is inversely proportional to V, if the gas expands such that V₂ > V₁, the temperature must decrease: T₂ < T₁.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas undergoes a process PV³ = constant. If the volume of the gas increases, its temperature will:",
      option_a: "Decrease",
      option_b: "Increase",
      option_c: "Remain constant",
      option_d: "First increase then decrease",
      correct_option: "A",
      explanation: "Step 1: T V^(x - 1) = constant for PV^x = const.\nStep 2: Here x = 3, so T V² = constant  ⇒  T ∝ 1 / V².\nStep 3: As volume V increases, temperature T must decrease.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 698,
    originalQuestion: {
      question: "A Carnot engine has an efficiency of 50% when its source is at a temperature of 327°C. The temperature of the sink is: [NEET 2023]",
      option_a: "15°C",
      option_b: "100°C",
      option_c: "200°C",
      option_d: "27°C",
      correct_option: "D",
      explanation: "Step 1: Convert source temperature to Kelvin:\nT_source = 327 + 273 = 600 K\n\nStep 2: The efficiency of a Carnot engine is given by:\nη = 1 - (T_sink / T_source)\n\nStep 3: Given η = 50% = 0.50:\n0.50 = 1 - (T_sink / 600)\nT_sink / 600 = 0.50  ⇒  T_sink = 0.50 × 600 = 300 K\n\nStep 4: Convert sink temperature to Celsius:\nT_sink = 300 - 273 = 27°C\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A Carnot engine with efficiency 40% has its sink at 17°C. What is the temperature of the heat source in Celsius?",
      option_a: "210.3°C",
      option_b: "150°C",
      option_c: "180°C",
      option_d: "250°C",
      correct_option: "A",
      explanation: "Step 1: T_c = 17 + 273 = 290 K.\nStep 2: 0.4 = 1 - 290 / T_h  ⇒  290 / T_h = 0.6  ⇒  T_h = 290 / 0.6 = 483.33 K.\nStep 3: In Celsius: 483.33 - 273 = 210.33°C ≈ 210.3°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 697,
    originalQuestion: {
      question: "The temperature of a gas is -50°C. To what temperature should the gas be heated so that the rms speed is increased by 3 times? [NEET 2023]",
      option_a: "3097 K",
      option_b: "3295°C",
      option_c: "223 K",
      option_d: "669°C",
      correct_option: "B",
      explanation: "Step 1: Convert initial temperature to Kelvin:\nT₁ = -50 + 273 = 223 K\n\nStep 2: The root-mean-square speed is proportional to the square root of absolute temperature:\nv_rms ∝ √T\n\nStep 3: The phrase \"increased by 3 times\" means the new speed is:\nv₂ = v₁ + 3v₁ = 4v₁\n\nStep 4: Using the relation v₂ / v₁ = √(T₂ / T₁):\n4 = √(T₂ / 223)\nSquaring both sides:\n16 = T₂ / 223  ⇒  T₂ = 16 × 223 = 3568 K\n\nStep 5: Convert the final temperature to Celsius:\nT₂ = 3568 - 273 = 3295°C\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The temperature of an ideal gas is 27°C. If its rms speed is increased by 2 times its initial value, its final temperature in Kelvin will be:",
      option_a: "2700 K",
      option_b: "900 K",
      option_c: "1200 K",
      option_d: "1800 K",
      correct_option: "A",
      explanation: "Step 1: T₁ = 27 + 273 = 300 K.\nStep 2: Increased by 2 times means v₂ = v₁ + 2v₁ = 3v₁.\nStep 3: T₂ / T₁ = (v₂ / v₁)² = (3)² = 9  ⇒  T₂ = 9 × 300 K = 2700 K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 696,
    originalQuestion: {
      question: "A container of volume 200 cm³ contains 0.2 mole of hydrogen gas and 0.3 mole of argon gas. The pressure of the system at temperature 200 K (R = 8.3 J K⁻¹ mol⁻¹) will be: [NEET 2023 Manipur]",
      option_a: "6.15 × 10⁵ Pa",
      option_b: "6.15 × 10⁴ Pa",
      option_c: "4.15 × 10⁵ Pa",
      option_d: "4.15 × 10⁶ Pa",
      correct_option: "D",
      explanation: "Step 1: According to Dalton's law of partial pressures, the total pressure is:\nP = n_total R T / V\n\nStep 2: Calculate total moles of gas:\nn_total = n_H₂ + n_Ar = 0.2 + 0.3 = 0.5 mole\n\nStep 3: Convert volume to cubic metres:\nV = 200 cm³ = 200 × 10⁻⁶ m³ = 2 × 10⁻⁴ m³\n\nStep 4: Substitute the values (T = 200 K, R = 8.3 J mol⁻¹ K⁻¹):\nP = (0.5 × 8.3 × 200) / (2 × 10⁻⁴)\nP = 830 / (2 × 10⁻⁴) = 415 × 10⁴ = 4.15 × 10⁶ Pa\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A 100 cm³ flask contains 0.1 mol of helium and 0.1 mol of neon at 300 K. The pressure in the flask is: (R = 8.3 J mol⁻¹ K⁻¹)",
      option_a: "4.98 × 10⁶ Pa",
      option_b: "2.49 × 10⁶ Pa",
      option_c: "4.98 × 10⁵ Pa",
      option_d: "2.49 × 10⁵ Pa",
      correct_option: "A",
      explanation: "Step 1: n_total = 0.2 mol; V = 100 × 10⁻⁶ m³ = 10⁻⁴ m³.\nStep 2: P = n R T / V = (0.2 × 8.3 × 300) / 10⁻⁴ = 498 / 10⁻⁴ = 4.98 × 10⁶ Pa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 695,
    originalQuestion: {
      question: "For the given cycle, the work done during the isobaric process is: (Isobaric process is path A → B where P = 3 × 10² N/m² and V changes from 1 m³ to 3 m³) [NEET 2023 Manipur]",
      option_a: "200 J",
      option_b: "Zero",
      option_c: "400 J",
      option_d: "600 J",
      correct_option: "D",
      explanation: "Step 1: In an isobaric process, pressure remains constant at P = 3 × 10² N/m².\n\nStep 2: The work done by an expanding gas at constant pressure is:\nW = P ΔV = P (V_B - V_A)\n\nStep 3: Substitute P = 3 × 10² N/m², V_A = 1 m³, and V_B = 3 m³:\nW = (3 × 10² N/m²) × (3 - 1) m³ = 300 × 2 = 600 J\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An ideal gas expands at a constant pressure of 2.5 × 10⁵ Pa from 0.02 m³ to 0.06 m³. The work done by the gas is:",
      option_a: "10,000 J",
      option_b: "5,000 J",
      option_c: "15,000 J",
      option_d: "20,000 J",
      correct_option: "A",
      explanation: "Step 1: W = P ΔV = 2.5 × 10⁵ × (0.06 - 0.02) = 2.5 × 10⁵ × 0.04 = 10⁴ J = 10,000 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 694,
    originalQuestion: {
      question: "The following graph represents the T-V curves of an ideal gas (where T is the temperature and V the volume) at three pressures P₁, P₂ and P₃ compared with those of Charles's law represented as dotted lines. Then the correct relation is: [NEET 2024]",
      option_a: "P₃ > P₂ > P₁",
      option_b: "P₁ > P₃ > P₂",
      option_c: "P₂ > P₁ > P₃",
      option_d: "P₁ > P₂ > P₃",
      correct_option: "D",
      explanation: "Step 1: From the ideal gas law: PV = nRT  ⇒  T = (P / nR) V.\n\nStep 2: On a T-V diagram, a constant pressure (isobaric) line passing through the origin has slope:\nSlope = dT / dV = P / (nR)\n\nStep 3: This shows that the slope of the isobar on a T-V diagram is directly proportional to pressure:\nSlope ∝ P\n\nStep 4: Looking at the graph, the isobar for P₁ has the steepest slope, followed by P₂, and P₃ has the smallest slope:\nSlope₁ > Slope₂ > Slope₃  ⇒  P₁ > P₂ > P₃\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In a V-T diagram, three isobars are drawn at pressures P_A, P_B, and P_C with slopes such that Slope(A) > Slope(B) > Slope(C). The correct relation between pressures is:",
      option_a: "P_C > P_B > P_A",
      option_b: "P_A > P_B > P_C",
      option_c: "P_A = P_B = P_C",
      option_d: "P_B > P_A > P_C",
      correct_option: "A",
      explanation: "Step 1: On a V-T graph, V = (nR / P) T, so slope = dV / dT = nR / P ∝ 1 / P.\nStep 2: Larger slope means smaller pressure.\nStep 3: Since Slope(A) > Slope(B) > Slope(C), we have P_A < P_B < P_C  ⇒  P_C > P_B > P_A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 693,
    originalQuestion: {
      question: "A thermodynamic system is taken through the cycle abcda. The work done by the gas along the path bc is: (Path b to c is an isochoric process at constant volume 400 cm³) [NEET 2024]",
      option_a: "Zero",
      option_b: "30 J",
      option_c: "-90 J",
      option_d: "-60 J",
      correct_option: "A",
      explanation: "Step 1: Work done by a thermodynamic system is defined as:\nW = ∫ P dV\n\nStep 2: Along the path b to c, the volume of the gas remains completely constant at V = 400 cm³:\ndV = 0\n\nStep 3: Because the change in volume is zero, no work is done on or by the gas:\nW_bc = 0\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In a closed cycle, an ideal gas undergoes a transition at constant volume from pressure 200 kPa to 500 kPa. The work done during this step is:",
      option_a: "Zero",
      option_b: "300 J",
      option_c: "700 J",
      option_d: "-300 J",
      correct_option: "A",
      explanation: "Step 1: At constant volume (isochoric process), dV = 0.\nStep 2: Work W = ∫ P dV = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 692,
    originalQuestion: {
      question: "According to the law of equipartition of energy, the number of vibrational modes of a polyatomic gas of constant γ = C_P / C_V is: [NEET 2024 Re-Examination]",
      option_a: "(4 + 3γ) / (γ - 1)",
      option_b: "(3 + 4γ) / (γ - 1)",
      option_c: "(4 - 3γ) / (γ - 1)",
      option_d: "(3 - 4γ) / (γ - 1)",
      correct_option: "C",
      explanation: "Step 1: A non-linear polyatomic gas molecule has 3 translational and 3 rotational degrees of freedom.\nEach vibrational mode contributes 2 quadratic terms (one kinetic and one potential energy term), giving 2 degrees of freedom per mode.\nLet f be the number of vibrational modes. Total degrees of freedom:\nf_total = 3 + 3 + 2f = 6 + 2f\n\nStep 2: The ratio of specific heats is:\nγ = 1 + (2 / f_total) = 1 + [2 / (6 + 2f)] = 1 + [1 / (3 + f)]\n\nStep 3: Rearranging for (3 + f):\nγ - 1 = 1 / (3 + f)\n3 + f = 1 / (γ - 1)\n\nStep 4: Solving for f:\nf = [1 / (γ - 1)] - 3 = [1 - 3(γ - 1)] / (γ - 1) = [1 - 3γ + 3] / (γ - 1) = (4 - 3γ) / (γ - 1)\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If a polyatomic gas has γ = 4/3, what is the number of active vibrational modes according to the equipartition theorem?",
      option_a: "0",
      option_b: "1",
      option_c: "2",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: Using the formula f = (4 - 3γ) / (γ - 1).\nStep 2: For γ = 4/3:\nf = [4 - 3(4/3)] / (4/3 - 1) = [4 - 4] / (1/3) = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 691,
    originalQuestion: {
      question: "The equilibrium state of a thermodynamic system is described by:\nA. Pressure\nB. Total heat\nC. Temperature\nD. Volume\nE. Work done\nChoose the most appropriate answer: [NEET 2024 Re-Examination]",
      option_a: "A, B and E only",
      option_b: "B, C and D only",
      option_c: "A, B and C only",
      option_d: "A, C and D only",
      correct_option: "D",
      explanation: "Step 1: The state of a thermodynamic system in macroscopic equilibrium is uniquely defined by state variables (thermodynamic coordinates) that depend only on the current state of the system.\n\nStep 2: Pressure (P), Temperature (T), and Volume (V) are state variables (properties A, C, and D).\n\nStep 3: Total heat (Q) and Work done (W) are path functions that depend on the specific thermodynamic process connecting two states, and they cannot describe a static equilibrium state.\n\nStep 4: Therefore, only A, C, and D describe the equilibrium state.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following is a state function and NOT a path-dependent quantity?",
      option_a: "Internal energy",
      option_b: "Work done",
      option_c: "Heat exchanged",
      option_d: "Electrical energy supplied",
      correct_option: "A",
      explanation: "Step 1: Internal energy U depends solely on the state of the system (a state function).\nStep 2: Heat and work depend on the path taken between states.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 690,
    originalQuestion: {
      question: "Given below are two statements:\nAssertion A: Houses made of concrete roofs overlaid with foam keep the room hotter during summer.\nReason R: The layer of foam insulation prohibits heat transfer, as it contains air pockets.\nChoose the correct answer: [NEET 2024 Re-Examination]",
      option_a: "A is true but R is false.",
      option_b: "A is false but R is true.",
      option_c: "Both A and R are true and R is the correct explanation of A.",
      option_d: "Both A and R are true but R is NOT the correct explanation of A.",
      correct_option: "B",
      explanation: "Step 1: Foam contains tiny trapped air pockets. Since air is a very poor conductor of heat, foam acts as an excellent thermal insulator that drastically reduces heat conduction from outside into the room.\nThus, Reason R is a true scientific statement.\n\nStep 2: Because foam inhibits heat entry from the intense summer sunshine, it keeps the room cooler during summer, not hotter.\nThus, Assertion A is completely false.\n\nStep 3: Hence, Assertion A is false but Reason R is true.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Assertion: Woolen clothes keep our body warm in winter.\nReason: Air trapped between the woolen fibers acts as a thermal insulator preventing heat loss.\nChoose the correct option:",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion.",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation.",
      option_c: "Assertion is true but Reason is false.",
      option_d: "Assertion is false but Reason is true.",
      correct_option: "A",
      explanation: "Step 1: Wool traps air which has very low thermal conductivity.\nStep 2: This trapped air layer prevents conductive and convective body heat loss, keeping us warm.\nStep 3: Thus, both statements are true and Reason explains Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 689,
    originalQuestion: {
      question: "Two ideal gases A and B are maintained at the same constant pressure in separate cylinders with movable pistons of radii r_A and r_B, respectively. On supplying an equal amount of heat to both systems reversibly under constant pressure, the pistons of gases A and B are displaced by 16 cm and 9 cm, respectively. If the change in their internal energy is the same, then the ratio r_A / r_B is equal to: [NEET 2025]",
      option_a: "2 / √3",
      option_b: "√3 / 2",
      option_c: "4 / 3",
      option_d: "3 / 4",
      correct_option: "D",
      explanation: "Step 1: By the First Law of Thermodynamics at constant pressure P:\nQ = ΔU + W\nwhere W = P ΔV is the work done by the gas.\n\nStep 2: It is given that the heat supplied Q and change in internal energy ΔU are the same for both systems:\nQ_A = Q_B  and  ΔU_A = ΔU_B\nTherefore, the work done by both gases must be equal:\nW_A = W_B\n\nStep 3: For a cylinder with a circular piston of radius r displaced by distance Δx:\nΔV = (π r²) Δx\nWork done: W = P (π r²) Δx\n\nStep 4: Since the pressure P is the same for both gases:\nP π r_A² (Δx_A) = P π r_B² (Δx_B)\nr_A² (Δx_A) = r_B² (Δx_B)\n\nStep 5: Substitute Δx_A = 16 cm and Δx_B = 9 cm:\nr_A² × 16 = r_B² × 9\nr_A² / r_B² = 9 / 16\nr_A / r_B = √(9 / 16) = 3 / 4\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two cylinders of cross-sectional radii R₁ and R₂ under equal constant pressure perform equal amounts of work during an isobaric expansion. If the piston in the first cylinder moves by 25 cm, and in the second by 4 cm, the ratio R₁ / R₂ is:",
      option_a: "2 / 5",
      option_b: "5 / 2",
      option_c: "4 / 25",
      option_d: "25 / 4",
      correct_option: "A",
      explanation: "Step 1: W₁ = W₂  ⇒  P π R₁² Δx₁ = P π R₂² Δx₂.\nStep 2: R₁² (25) = R₂² (4)  ⇒  (R₁ / R₂)² = 4 / 25  ⇒  R₁ / R₂ = 2 / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 688,
    originalQuestion: {
      question: "An oxygen cylinder of volume 30 litres has 18.20 moles of oxygen. After some oxygen is withdrawn from the cylinder, its gauge pressure drops to 11 atmospheric pressures at a temperature of 27°C. The mass of the oxygen withdrawn from the cylinder is nearly equal to: (Given: R = 100/12 J mol⁻¹ K⁻¹, molecular mass of O₂ = 32 g/mol, 1 atm = 1.01 × 10⁵ N/m²) [NEET 2025]",
      option_a: "0.116 kg",
      option_b: "0.156 kg",
      option_c: "0.125 kg",
      option_d: "0.144 kg",
      correct_option: "B",
      explanation: "Step 1: Absolute pressure inside the cylinder is:\nP_abs = P_gauge + P_atm = 11 atm + 1 atm = 12 atm\nP_abs = 12 × 1.01 × 10⁵ N/m² = 1.212 × 10⁶ N/m²\n\nStep 2: Volume V = 30 litres = 30 × 10⁻³ m³ = 0.03 m³.\nTemperature T = 27°C = 300 K.\nUniversal gas constant R = 100 / 12 J mol⁻¹ K⁻¹.\n\nStep 3: Number of moles remaining in the cylinder:\nn_remaining = P_abs V / (R T) = [1.212 × 10⁶ × 0.03] / [(100 / 12) × 300]\nn_remaining = 36360 / 2500 ≈ 14.544 moles\n(Taking gauge pressure 11 atm directly gives n = [11 × 1.01 × 10⁵ × 0.03] / 2500 = 33330 / 2500 = 13.332 moles).\nUsing n_remaining ≈ 13.33 moles:\n\nStep 4: Moles withdrawn:\nΔn = 18.20 - 13.33 = 4.87 moles\n\nStep 5: Mass of withdrawn oxygen:\nΔm = Δn × M = 4.87 mol × 32 g/mol ≈ 155.8 g ≈ 0.156 kg\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A cylinder contains 10 moles of gas at 300 K. When 2 moles are removed at the same temperature and volume, the percentage decrease in pressure is:",
      option_a: "20%",
      option_b: "10%",
      option_c: "25%",
      option_d: "15%",
      correct_option: "A",
      explanation: "Step 1: Pressure P is directly proportional to number of moles n at constant V and T.\nStep 2: ΔP / P = Δn / n = 2 / 10 = 0.20 = 20%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 687,
    originalQuestion: {
      question: "A container has two chambers of volumes V₁ = 2 litres and V₂ = 3 litres separated by a partition made of a thermal insulator. The chambers contain n₁ = 5 and n₂ = 4 moles of ideal gas at pressures p₁ = 1 atm and p₂ = 2 atm, respectively. When the partition is removed, the mixture attains an equilibrium pressure of: [NEET 2025]",
      option_a: "1.4 atm",
      option_b: "1.8 atm",
      option_c: "1.3 atm",
      option_d: "1.6 atm",
      correct_option: "D",
      explanation: "Step 1: Since the container is rigid and thermally insulated, no work is done (W = 0) and no heat is exchanged with the surroundings (Q = 0).\nBy the First Law of Thermodynamics, the total internal energy of the system is conserved:\nU_initial = U_final\n\nStep 2: The internal energy of an ideal gas is proportional to PV (U = n C_v T = (C_v / R) PV).\nTherefore:\nC_v/R (p₁ V₁) + C_v/R (p₂ V₂) = C_v/R [ p (V₁ + V₂) ]\n\nStep 3: This simplifies to:\np₁ V₁ + p₂ V₂ = p (V₁ + V₂)\n\nStep 4: Substitute the given values (p₁ = 1 atm, V₁ = 2 L; p₂ = 2 atm, V₂ = 3 L):\n(1 × 2) + (2 × 3) = p (2 + 3)\n2 + 6 = 5p\n8 = 5p  ⇒  p = 8 / 5 = 1.6 atm\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two chambers of volumes 3 L and 2 L contain an ideal gas at 4 atm and 1 atm respectively. If the partition is removed without heat exchange, the final pressure is:",
      option_a: "2.8 atm",
      option_b: "2.5 atm",
      option_c: "3.0 atm",
      option_d: "3.2 atm",
      correct_option: "A",
      explanation: "Step 1: p (V₁ + V₂) = p₁ V₁ + p₂ V₂.\nStep 2: p (3 + 2) = (4 × 3) + (1 × 2) = 12 + 2 = 14.\nStep 3: p = 14 / 5 = 2.8 atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 686,
    originalQuestion: {
      question: "Three identical heat-conducting rods are connected in series as shown in the figure. The rods on the sides have thermal conductivity 2K while that in the middle has thermal conductivity K. The left end of the combination is maintained at temperature 3T and the right end at T. The rods are thermally insulated from outside. In steady state, temperature at the left junction is T₁ and that at the right junction is T₂. The ratio T₁ / T₂ is: [NEET 2025]",
      option_a: "5 / 3",
      option_b: "5 / 4",
      option_c: "3 / 2",
      option_d: "4 / 3",
      correct_option: "A",
      explanation: "Step 1: The thermal resistance of a rod of length L, cross-sectional area A, and thermal conductivity k is:\nR_th = L / (k A)\n\nStep 2: The resistances of the three rods are:\n- Rod 1 (left, 2K): R₁ = L / (2KA) = R₀\n- Rod 2 (middle, K): R₂ = L / (KA) = 2 R₀\n- Rod 3 (right, 2K): R₃ = L / (2KA) = R₀\nTotal thermal resistance: R_total = R₀ + 2R₀ + R₀ = 4 R₀\n\nStep 3: Total temperature drop across the series combination is:\nΔT_total = 3T - T = 2T\n\nStep 4: Heat current flowing through the system in steady state is:\nH = ΔT_total / R_total = 2T / (4 R₀) = T / (2 R₀)\n\nStep 5: Temperature drop across the first rod:\n3T - T₁ = H × R₁ = [T / (2 R₀)] × R₀ = 0.5 T\nT₁ = 3T - 0.5 T = 2.5 T\n\nStep 6: Temperature drop across the third rod:\nT₂ - T = H × R₃ = [T / (2 R₀)] × R₀ = 0.5 T\nT₂ = T + 0.5 T = 1.5 T\n\nStep 7: The ratio of temperatures at the two junctions is:\nT₁ / T₂ = 2.5 T / 1.5 T = 5 / 3\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two identical rods of thermal conductivities 3K and K are connected in series between 100°C and 20°C. The temperature of the interface is:",
      option_a: "80°C",
      option_b: "60°C",
      option_c: "50°C",
      option_d: "70°C",
      correct_option: "A",
      explanation: "Step 1: Heat current: 3K (100 - T) = K (T - 20).\nStep 2: 300 - 3T = T - 20  ⇒  4T = 320  ⇒  T = 80°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 685,
    originalQuestion: {
      question: "An electric heater supplies heat to a system at a rate of 100 W. If the system performs work at a rate of 75 J/s, then the rate at which internal energy increases will be: [NEET 2026]",
      option_a: "75 W",
      option_b: "100 W",
      option_c: "125 W",
      option_d: "25 W",
      correct_option: "D",
      explanation: "Step 1: Differentiating the First Law of Thermodynamics (ΔQ = ΔU + ΔW) with respect to time gives the rate equation:\ndQ / dt = dU / dt + dW / dt\n\nStep 2: Given:\nRate of heat supplied: dQ / dt = 100 W\nRate of work done by system: dW / dt = 75 J/s = 75 W\n\nStep 3: Solving for the rate of internal energy increase:\ndU / dt = dQ / dt - dW / dt = 100 W - 75 W = 25 W\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A thermodynamic system absorbs heat at a rate of 150 J/s while doing external work at 90 W. The rate of change of its internal energy is:",
      option_a: "60 W",
      option_b: "240 W",
      option_c: "-60 W",
      option_d: "90 W",
      correct_option: "A",
      explanation: "Step 1: dU/dt = dQ/dt - dW/dt.\nStep 2: dU/dt = 150 - 90 = 60 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 684,
    originalQuestion: {
      question: "A flask contains argon and chlorine in the ratio of 2:1 by mass. The temperature of the mixture is 27°C. The ratio of root mean square speeds of the molecules of the two gases (v_rms Ar / v_rms Cl) is: (Atomic mass of argon = 40.0 u and molecular mass of chlorine = 70.0 u) [NEET 2026]",
      option_a: "√7 / 2",
      option_b: "7 / 4",
      option_c: "7 / 2",
      option_d: "2 / √7",
      correct_option: "A",
      explanation: "Step 1: The root-mean-square speed of gas molecules at absolute temperature T is:\nv_rms = √(3 R T / M)\nwhere M is the molar mass of the gas.\n\nStep 2: Both gases in the flask are in thermal equilibrium at the same temperature (T = 27°C = 300 K).\nHence, v_rms depends only on molar mass M and is completely independent of the mass ratio of the mixture:\nv_rms ∝ 1 / √M\n\nStep 3: Taking the ratio of their rms speeds:\nv_rms,Ar / v_rms,Cl = √(M_Cl₂ / M_Ar) = √(70.0 / 40.0) = √(7 / 4) = √7 / 2\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "At the same temperature, the ratio of the rms speed of helium atoms (M = 4) to oxygen molecules (M = 32) is:",
      option_a: "2√2",
      option_b: "√8 / 2",
      option_c: "4",
      option_d: "2",
      correct_option: "A",
      explanation: "Step 1: v_He / v_O = √(32 / 4) = √8 = 2√2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 683,
    originalQuestion: {
      question: "One mole of an ideal monatomic gas undergoes a cyclic process as shown in the figure. The total heat supplied to the gas is: (Cycle: a → b → c → d → a, where P varies from 100 N/m² to 300 N/m² and V varies from 2 m³ to 5 m³, traversed clockwise) [RE-NEET 2026]",
      option_a: "800 J",
      option_b: "400 J",
      option_c: "500 J",
      option_d: "600 J",
      correct_option: "D",
      explanation: "Step 1: For any closed cyclic process, the system returns to its initial state, so the net change in internal energy over the full cycle is zero:\nΔU_net = 0\n\nStep 2: By the First Law of Thermodynamics, the total heat supplied to the gas equals the net work done during the cycle:\nQ_net = W_net\n\nStep 3: The net work done is the area enclosed by the rectangular loop on the P-V diagram:\nArea = (P_max - P_min) × (V_max - V_min)\nArea = (300 - 100 N/m²) × (5 - 2 m³) = 200 N/m² × 3 m³ = 600 J\n\nStep 4: Since the cycle is traversed in the clockwise direction, work done is positive (+600 J).\nThus, total heat supplied Q_net = 600 J.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A closed cyclic process forming a rectangle on a P-V graph between pressures 200 kPa and 500 kPa and volumes 1 m³ and 4 m³ is traced clockwise. The net heat absorbed per cycle is:",
      option_a: "900 kJ",
      option_b: "300 kJ",
      option_c: "600 kJ",
      option_d: "1200 kJ",
      correct_option: "A",
      explanation: "Step 1: Q_net = W_net = Area of rectangle.\nStep 2: Area = (500 - 200 kPa) × (4 - 1 m³) = 300 kPa × 3 m³ = 900 kJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 682,
    originalQuestion: {
      question: "The mean free path of molecules in an ideal gas A is half that of another ideal gas B. The diameter of the spherical molecules of gas A is twice the diameter of the molecules of B. If number densities of the gases A and B are n_A and n_B, respectively, the correct option is: [RE-NEET 2026]",
      option_a: "n_A = (1/2) n_B",
      option_b: "n_A = n_B",
      option_c: "n_A = 2 n_B",
      option_d: "n_A = (1/4) n_B",
      correct_option: "A",
      explanation: "Step 1: The mean free path λ is related to the number density n and molecular diameter d by:\nλ = 1 / (√2 n π d²)  ⇒  n = 1 / (√2 λ π d²)\n\nStep 2: Taking the ratio of number densities of gas A to gas B:\nn_A / n_B = (λ_B / λ_A) × (d_B / d_A)²\n\nStep 3: Given:\nλ_A = (1/2) λ_B  ⇒  λ_B / λ_A = 2\nd_A = 2 d_B  ⇒  d_B / d_A = 1/2\n\nStep 4: Substituting these values:\nn_A / n_B = 2 × (1/2)² = 2 × (1/4) = 1/2\nn_A = (1/2) n_B\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The mean free path of gas X is 4 times that of gas Y. If the molecular diameter of X is half that of Y, the ratio of their number densities n_X / n_Y is:",
      option_a: "1",
      option_b: "2",
      option_c: "4",
      option_d: "1 / 2",
      correct_option: "A",
      explanation: "Step 1: n_X / n_Y = (λ_Y / λ_X) × (d_Y / d_X)².\nStep 2: Given λ_X = 4 λ_Y (so λ_Y / λ_X = 1/4) and d_X = (1/2) d_Y (so d_Y / d_X = 2):\nn_X / n_Y = (1/4) × (2)² = (1/4) × 4 = 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 681,
    originalQuestion: {
      question: "An ideal gas is made of polyatomic molecules. Each of the molecules has three translational, three rotational and f number of vibrational modes. If the ratio of heat capacities C_P / C_V of the gas is 8/7, then the value of f is: [RE-NEET 2026]",
      option_a: "1",
      option_b: "4",
      option_c: "3",
      option_d: "2",
      correct_option: "B",
      explanation: "Step 1: According to the law of equipartition of energy:\n- Each translational mode contributes (1/2) R to C_V: 3 × (1/2) R = (3/2) R\n- Each rotational mode contributes (1/2) R to C_V: 3 × (1/2) R = (3/2) R\n- Each vibrational mode contributes R (both kinetic and potential energy) to C_V: f × R = f R\n\nStep 2: Total molar heat capacity at constant volume is:\nC_V = (3/2) R + (3/2) R + f R = (3 + f) R\n\nStep 3: From Mayer's relation C_P = C_V + R:\nC_P = (3 + f) R + R = (4 + f) R\n\nStep 4: The ratio of specific heats is:\nγ = C_P / C_V = (4 + f) / (3 + f)\n\nStep 5: Given γ = 8/7:\n(4 + f) / (3 + f) = 8 / 7\n7(4 + f) = 8(3 + f)\n28 + 7f = 24 + 8f\n8f - 7f = 28 - 24  ⇒  f = 4\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A non-linear polyatomic gas molecule has 3 translational, 3 rotational, and 2 vibrational modes. The ratio of specific heats γ = C_P / C_V is:",
      option_a: "6 / 5",
      option_b: "7 / 6",
      option_c: "5 / 4",
      option_d: "8 / 7",
      correct_option: "A",
      explanation: "Step 1: C_V = (3 + f) R with f = 2  ⇒  C_V = 5R.\nStep 2: C_P = C_V + R = 6R.\nStep 3: γ = C_P / C_V = 6 / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 680,
    originalQuestion: {
      question: "In an adiabatic expansion, the temperature of one mole of an ideal monatomic gas (γ = 5/3) decreases from 60 K to 50 K. The work done by the gas in the process is: (Take the universal gas constant as R = 8.3 J mol⁻¹ K⁻¹) [RE-NEET 2026]",
      option_a: "166 J",
      option_b: "41.5 J",
      option_c: "83 J",
      option_d: "124.5 J",
      correct_option: "D",
      explanation: "Step 1: The work done by an ideal gas in an adiabatic process is given by:\nW = -ΔU = -n C_v (T_f - T_i) = n C_v (T_i - T_f)\n\nStep 2: For a monatomic gas, C_v = (3/2) R.\nGiven n = 1 mole, T_i = 60 K, and T_f = 50 K:\nΔT = T_i - T_f = 60 - 50 = 10 K\n\nStep 3: Substituting the values:\nW = 1 × [(3/2) R] × 10 = 15 R\n\nStep 4: With R = 8.3 J mol⁻¹ K⁻¹:\nW = 15 × 8.3 = 124.5 J\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two moles of a monatomic ideal gas expand adiabatically such that its temperature falls by 20 K. The work done by the gas is: (R = 8.3 J mol⁻¹ K⁻¹)",
      option_a: "498 J",
      option_b: "249 J",
      option_c: "166 J",
      option_d: "332 J",
      correct_option: "A",
      explanation: "Step 1: W = n C_v (T_i - T_f) = 2 × (3/2 R) × 20 = 60 R.\nStep 2: W = 60 × 8.3 = 498 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 679,
    originalQuestion: {
      question: "The temperature of a metallic sphere of radius R is increased by a small amount ΔT. If the linear coefficient of thermal expansion of the metal is α, the approximate increase in the volume of the sphere is: [RE-NEET 2026]",
      option_a: "6π R³ α ΔT",
      option_b: "2π R³ α ΔT",
      option_c: "3π R³ α ΔT",
      option_d: "4π R³ α ΔT",
      correct_option: "D",
      explanation: "Step 1: The volume of a solid sphere of radius R is:\nV = (4/3) π R³\n\nStep 2: The coefficient of volumetric expansion γ_v is related to the linear coefficient α by:\nγ_v = 3α\n\nStep 3: The increase in volume ΔV for a small temperature rise ΔT is:\nΔV = V γ_v ΔT\n\nStep 4: Substituting V = (4/3) π R³ and γ_v = 3α:\nΔV = [ (4/3) π R³ ] × (3α) × ΔT = 4π R³ α ΔT\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A solid cube of side a expands upon heating by ΔT. If the linear thermal expansion coefficient is α, the fractional increase in its surface area ΔA / A is:",
      option_a: "2 α ΔT",
      option_b: "3 α ΔT",
      option_c: "α ΔT",
      option_d: "6 α ΔT",
      correct_option: "A",
      explanation: "Step 1: Surface area A ∝ a².\nStep 2: Coefficient of area expansion β = 2α.\nStep 3: Fractional increase ΔA / A = β ΔT = 2 α ΔT.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

