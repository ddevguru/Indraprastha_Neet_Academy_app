const fs = require('fs');

const set11Part1Updates = [
  {
    id: 4696, // Q1
    similar_question: {
      question: "An open rectangular container of length L and height H is filled with a liquid. A small orifice is situated at a depth h below the free liquid surface on the rear vertical wall. What minimum forward horizontal acceleration 'a' must be given to the container so that no liquid emerges from the orifice?",
      option_a: "2 g h / L",
      option_b: "g h / L",
      option_c: "g L / (2 h)",
      option_d: "2 g L / h",
      correct_option: "A",
      explanation: "Step 1: When the container accelerates forward with acceleration a, the liquid surface tilts at an angle θ to the horizontal, where tan θ = a / g.\n\nStep 2: The liquid level drops at the rear wall by an amount Δy = (L / 2) tan θ = a L / (2 g).\n\nStep 3: For no liquid to emerge from the orifice at depth h below the initial liquid level, the free surface at the rear wall must drop by at least h: Δy ≥ h.\n\nStep 4: Set a L / (2 g) = h  →  a = 2 g h / L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4697, // Q2
    similar_question: {
      question: "What is the absolute hydrostatic pressure experienced by a diver at a depth of 30 m in a freshwater lake? (Assume atmospheric pressure P₀ = 1.01 × 10⁵ Pa, density of water ρ = 1000 kg/m³, and g = 9.8 m/s²)",
      option_a: "3.95 × 10⁵ Pa (approximately 3.9 atm)",
      option_b: "2.94 × 10⁵ Pa (approximately 2.9 atm)",
      option_c: "4.95 × 10⁵ Pa (approximately 4.9 atm)",
      option_d: "1.01 × 10⁵ Pa (approximately 1.0 atm)",
      correct_option: "A",
      explanation: "Step 1: Gauge pressure due to the water column at depth h = 30 m is:\nP_gauge = ρ g h = 1000 kg/m³ × 9.8 m/s² × 30 m = 2.94 × 10⁵ Pa.\n\nStep 2: Total absolute pressure is the sum of atmospheric pressure and gauge pressure:\nP_abs = P₀ + P_gauge = 1.01 × 10⁵ Pa + 2.94 × 10⁵ Pa = 3.95 × 10⁵ Pa.\n\nStep 3: In atmospheres, 3.95 × 10⁵ / 1.01 × 10⁵ ≈ 3.91 atm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4698, // Q3
    similar_question: {
      question: "When a single large spherical liquid drop of radius R is broken into numerous tiny droplets of radius r at constant temperature, the total surface energy of the system:",
      option_a: "Increases because the total surface area increases",
      option_b: "Decreases because the droplets disperse",
      option_c: "Remains constant by conservation of energy",
      option_d: "Becomes zero",
      correct_option: "A",
      explanation: "Step 1: The total volume is conserved: (4/3) π R³ = n × (4/3) π r³  →  n = (R / r)³.\n\nStep 2: Initial surface area is A₁ = 4π R².\nFinal total surface area is A₂ = n × 4π r² = (R / r)³ × 4π r² = 4π R² (R / r) = A₁ (R / r).\n\nStep 3: Since r < R, the total surface area increases (A₂ > A₁). Because surface energy U = T × A, the total surface energy increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4699, // Q4
    similar_question: {
      question: "An incompressible, non-viscous fluid flows steadily through a horizontal pipe of varying cross-section. At a section of radius 4.0 cm, the flow speed is 2.0 m/s. What is the speed of the fluid at a constriction where the radius is reduced to 2.0 cm?",
      option_a: "8.0 m/s",
      option_b: "4.0 m/s",
      option_c: "1.0 m/s",
      option_d: "16.0 m/s",
      correct_option: "A",
      explanation: "Step 1: By the equation of continuity for an incompressible fluid:\nA₁ v₁ = A₂ v₂.\n\nStep 2: Cross-sectional areas are A₁ = π r₁² and A₂ = π r₂²:\nπ r₁² v₁ = π r₂² v₂  →  v₂ = v₁ (r₁ / r₂)².\n\nStep 3: Substitute r₁ = 4.0 cm, r₂ = 2.0 cm, and v₁ = 2.0 m/s:\nv₂ = 2.0 × (4.0 / 2.0)² = 2.0 × (2)² = 2.0 × 4 = 8.0 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4700, // Q5
    similar_question: {
      question: "What is the total surface energy stored in a spherical soap bubble of radius 3.5 cm if the surface tension of the soap solution is 3.0 × 10⁻² N/m?",
      option_a: "9.24 × 10⁻⁴ J (or 0.924 mJ)",
      option_b: "4.62 × 10⁻⁴ J",
      option_c: "1.85 × 10⁻³ J",
      option_d: "3.08 × 10⁻⁴ J",
      correct_option: "A",
      explanation: "Step 1: A soap bubble in air has two free liquid-gas interfaces (an inner surface and an outer surface).\n\nStep 2: Total surface area of both surfaces is:\nA = 2 × (4π R²) = 8π R².\n\nStep 3: Substitute R = 3.5 cm = 0.035 m:\nA = 8π (0.035)² = 8π (1.225 × 10⁻³) = 9.8π × 10⁻³ m² ≈ 3.079 × 10⁻² m².\n\nStep 4: Surface energy is U = T × A:\nU = 3.0 × 10⁻² N/m × (9.8π × 10⁻³ m²) = 2.94π × 10⁻⁴ ≈ 9.24 × 10⁻⁴ J = 0.924 mJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4701, // Q6
    similar_question: {
      question: "The velocity head of a flowing stream of water is measured to be 20 cm. Taking g = 10 m/s², what is the flow speed of the water?",
      option_a: "2.0 m/s",
      option_b: "1.4 m/s",
      option_c: "4.0 m/s",
      option_d: "0.2 m/s",
      correct_option: "A",
      explanation: "Step 1: By definition in Bernoulli's equation, the velocity head is given by h_v = v² / (2g).\n\nStep 2: Given h_v = 20 cm = 0.20 m and g = 10 m/s²:\n0.20 = v² / (2 × 10)  →  v² = 0.20 × 20 = 4.0 m²/s².\n\nStep 3: Taking the square root:\nv = √4.0 = 2.0 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4702, // Q7
    similar_question: {
      question: "At what depth in a lake is the absolute hydrostatic pressure equal to twice atmospheric pressure P₀? (Take P₀ = 1.0 × 10⁵ Pa, density of water ρ = 1000 kg/m³, and g = 10 m/s²)",
      option_a: "10 m",
      option_b: "20 m",
      option_c: "5 m",
      option_d: "15 m",
      correct_option: "A",
      explanation: "Step 1: Absolute pressure at depth h is P = P₀ + ρ g h.\n\nStep 2: We are given P = 2 P₀:\nP₀ + ρ g h = 2 P₀  →  ρ g h = P₀.\n\nStep 3: Solve for h:\nh = P₀ / (ρ g) = (1.0 × 10⁵ Pa) / (1000 kg/m³ × 10 m/s²) = 1.0 × 10⁵ / 10⁴ = 10 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4703, // Q8
    similar_question: {
      question: "When a liquid rises in a narrow glass capillary tube, the meniscus is concave upwards and the angle of contact between the liquid and glass is:",
      option_a: "Acute (less than 90°)",
      option_b: "Obtuse (greater than 90°)",
      option_c: "Exactly 90°",
      option_d: "180°",
      correct_option: "A",
      explanation: "Step 1: Capillary rise is governed by Jurin's law: h = 2 T cos θ / (r ρ g).\n\nStep 2: For the liquid to rise (h > 0), cos θ must be positive.\n\nStep 3: A positive value of cos θ corresponds to an acute angle of contact: 0° ≤ θ < 90°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4704, // Q9
    similar_question: {
      question: "Two parallel horizontal layers of water separated by a perpendicular distance of 0.2 cm move relative to each other with a relative speed of 10 cm/s. What is the velocity gradient between these layers?",
      option_a: "50 s⁻¹",
      option_b: "25 s⁻¹",
      option_c: "100 s⁻¹",
      option_d: "5 s⁻¹",
      correct_option: "A",
      explanation: "Step 1: Velocity gradient is defined as the change in flow speed per unit perpendicular distance: dv / dz.\n\nStep 2: Substitute Δv = 10 cm/s and Δz = 0.2 cm:\nVelocity Gradient = Δv / Δz = (10 cm/s) / (0.2 cm) = 50 s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4705, // Q10
    similar_question: {
      question: "Water flows horizontally through a pipe of varying cross-section. At point 1, the speed is 2.0 m/s and the pressure is 60 kPa. At point 2, the speed increases to 4.0 m/s. Taking the density of water to be 1000 kg/m³, what is the pressure at point 2?",
      option_a: "54 kPa",
      option_b: "48 kPa",
      option_c: "66 kPa",
      option_d: "58 kPa",
      correct_option: "A",
      explanation: "Step 1: Apply Bernoulli's equation for horizontal streamline flow (constant height):\nP₁ + (1/2) ρ v₁² = P₂ + (1/2) ρ v₂².\n\nStep 2: Rearrange for P₂:\nP₂ = P₁ + (1/2) ρ (v₁² − v₂²).\n\nStep 3: Substitute values: P₁ = 60 × 10³ Pa, v₁ = 2.0 m/s, v₂ = 4.0 m/s, ρ = 1000 kg/m³:\nv₁² − v₂² = (2.0)² − (4.0)² = 4 − 16 = −12 m²/s².\n(1/2) ρ (v₁² − v₂²) = (1/2) × 1000 × (−12) = −6000 Pa = −6 kPa.\n\nStep 4: Compute P₂:\nP₂ = 60 kPa − 6 kPa = 54 kPa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4706, // Q11
    similar_question: {
      question: "At the base of a hill, a mercury barometer reads 76 cm of Hg, while at the top of the hill, it reads 70 cm of Hg. If the ratio of the density of mercury to that of air is 10⁴, what is the height of the hill?",
      option_a: "600 m",
      option_b: "60 m",
      option_c: "1200 m",
      option_d: "760 m",
      correct_option: "A",
      explanation: "Step 1: The difference in pressure between the base and top of the hill corresponds to the weight of the air column of height h_hill:\nΔP = ρ_air g h_hill.\n\nStep 2: The barometer reading decreases by Δh_Hg = 76 cm − 70 cm = 6 cm = 0.06 m of Hg:\nΔP = ρ_Hg g Δh_Hg.\n\nStep 3: Equating the two expressions for ΔP:\nρ_air g h_hill = ρ_Hg g Δh_Hg  →  h_hill = (ρ_Hg / ρ_air) Δh_Hg.\n\nStep 4: Given ρ_Hg / ρ_air = 10⁴:\nh_hill = 10⁴ × 0.06 m = 600 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4707, // Q12
    similar_question: {
      question: "How does the angle of contact between a liquid and a solid surface generally change as the temperature of the liquid is increased?",
      option_a: "It decreases because surface tension decreases and wetting improves",
      option_b: "It increases linearly",
      option_c: "It remains completely independent of temperature",
      option_d: "It increases to 180°",
      correct_option: "A",
      explanation: "Step 1: As temperature increases, intermolecular cohesive forces within the liquid weaken more rapidly than adhesive forces between liquid and solid.\n\nStep 2: Surface tension of the liquid decreases, allowing the liquid to spread more easily across the solid surface (enhanced wetting).\n\nStep 3: Consequently, the contact angle θ decreases with increasing temperature.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4708, // Q13
    similar_question: {
      question: "A small solid sphere of radius R and density ρ₁ falls through a viscous fluid of viscosity η with terminal velocity v_t. Another solid sphere of radius 2R but made of a lighter material such that it has the exact same total mass M as the first sphere is dropped in the same fluid. What is the terminal velocity of the second sphere? (Assume buoyancy is negligible)",
      option_a: "v_t / 2",
      option_b: "2 v_t",
      option_c: "v_t / 4",
      option_d: "4 v_t",
      correct_option: "A",
      explanation: "Step 1: At terminal velocity, the downward gravitational force equals the Stokes viscous drag:\nM g = 6π η R v_t.\n\nStep 2: Solve for terminal velocity:\nv_t = M g / (6π η R).\n\nStep 3: For the second sphere, mass M and fluid viscosity η are unchanged, but radius is doubled (R' = 2R):\nv_t' = M g / [ 6π η (2R) ] = (1/2) [ M g / (6π η R) ] = v_t / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4709, // Q14
    similar_question: {
      question: "What is the mechanical work required to stretch a rectangular soap film on a wire frame from dimensions 6.0 cm × 5.0 cm to 8.0 cm × 6.0 cm, given that the surface tension of the soap solution is 0.04 N/m?",
      option_a: "1.44 × 10⁻⁴ J",
      option_b: "7.20 × 10⁻⁵ J",
      option_c: "2.88 × 10⁻⁴ J",
      option_d: "3.60 × 10⁻⁴ J",
      correct_option: "A",
      explanation: "Step 1: Initial area of one face is A₁ = 6.0 cm × 5.0 cm = 30 cm² = 30 × 10⁻⁴ m².\nFinal area of one face is A₂ = 8.0 cm × 6.0 cm = 48 cm² = 48 × 10⁻⁴ m².\nChange in area of one face: ΔA = 48 − 30 = 18 cm² = 18 × 10⁻⁴ m².\n\nStep 2: A soap film has two free surfaces, so the total increase in surface area is:\nΔA_total = 2 × ΔA = 2 × (18 × 10⁻⁴ m²) = 36 × 10⁻⁴ m².\n\nStep 3: The work done is W = T × ΔA_total:\nW = 0.04 N/m × (36 × 10⁻⁴ m²) = 1.44 × 10⁻⁴ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4710, // Q15
    similar_question: {
      question: "In a hydroelectric power station, water falls from a dam through a vertical height of 20 m to drive turbines. What mass of water must flow through the turbines per second to generate a power output of 2.0 MW? (Take g = 10 m/s² and assume 100% conversion efficiency)",
      option_a: "1.0 × 10⁴ kg/s",
      option_b: "2.0 × 10⁴ kg/s",
      option_c: "1.0 × 10⁵ kg/s",
      option_d: "5.0 × 10³ kg/s",
      correct_option: "A",
      explanation: "Step 1: Power generated by falling water is P = (dm / dt) g h.\n\nStep 2: Given P = 2.0 MW = 2.0 × 10⁶ W, h = 20 m, and g = 10 m/s².\n\nStep 3: Solve for mass flow rate dm / dt:\ndm / dt = P / (g h) = (2.0 × 10⁶ W) / (10 m/s² × 20 m) = (2.0 × 10⁶) / 200 = 1.0 × 10⁴ kg/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4711, // Q16
    similar_question: {
      question: "A soap film is supported on a flexible rectangular wire frame of surface area A. If the area of the frame is smoothly reduced by 40% isothermally, by what percentage does the total surface energy of the film decrease?",
      option_a: "40%",
      option_b: "20%",
      option_c: "60%",
      option_d: "80%",
      correct_option: "A",
      explanation: "Step 1: Surface energy of a soap film of area A and surface tension T is U = 2 T A.\n\nStep 2: Since surface tension T remains constant at constant temperature, the surface energy is directly proportional to area: U ∝ A.\n\nStep 3: When the area decreases by 40% (A' = 0.60 A), the surface energy decreases by the exact same percentage: ΔU / U = 40%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4712, // Q17
    similar_question: {
      question: "When a highly soluble salt (such as sodium chloride, NaCl) is dissolved in pure water, the surface tension of the resulting solution:",
      option_a: "Increases because strong electrostatic ionic-dipole interactions enhance intermolecular attraction",
      option_b: "Decreases significantly",
      option_c: "Remains strictly unaffected",
      option_d: "Drops to zero",
      correct_option: "A",
      explanation: "Step 1: Dissolving a highly soluble inorganic electrolyte like NaCl introduces strong Na⁺ and Cl⁻ ions into the water.\n\nStep 2: The ion-dipole attractions between water molecules and ions are significantly stronger than the dipole-dipole hydrogen bonds between water molecules alone.\n\nStep 3: This increases the net inward cohesive force at the surface, thereby increasing the surface tension.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4713, // Q18
    similar_question: {
      question: "The excess pressures inside two soap bubbles are measured to be 20 Pa and 40 Pa respectively. What is the ratio of their respective volumes V₁ : V₂?",
      option_a: "8 : 1",
      option_b: "4 : 1",
      option_c: "2 : 1",
      option_d: "1 : 8",
      correct_option: "A",
      explanation: "Step 1: Excess pressure inside a soap bubble is ΔP = 4 T / R, which means radius R is inversely proportional to excess pressure: R ∝ 1 / ΔP.\n\nStep 2: Ratio of radii:\nR₁ / R₂ = ΔP₂ / ΔP₁ = 40 Pa / 20 Pa = 2 / 1.\n\nStep 3: Volume of a spherical bubble is V = (4/3) π R³ ∝ R³.\n\nStep 4: Ratio of volumes:\nV₁ / V₂ = (R₁ / R₂)³ = (2 / 1)³ = 8 / 1 = 8 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4714, // Q19
    similar_question: {
      question: "A spherical liquid drop of diameter D and surface tension T breaks up into 64 identical tiny droplets at constant temperature. What is the increase in total surface energy of the liquid?",
      option_a: "3 π D² T",
      option_b: "7 π D² T",
      option_c: "π D² T",
      option_d: "15 π D² T",
      correct_option: "A",
      explanation: "Step 1: Volume conservation for n = 64 droplets: (4/3) π R³ = 64 × (4/3) π r³  →  R³ = 64 r³  →  r = R / 4 = D / 8.\n\nStep 2: Initial surface area of the single drop: A₁ = 4π R² = π D².\n\nStep 3: Final total surface area of 64 droplets:\nA₂ = 64 × 4π r² = 64 × 4π (R / 4)² = 64 × 4π (R² / 16) = 4 × (4π R²) = 4 π D².\n\nStep 4: Increase in surface area: ΔA = A₂ − A₁ = 4 π D² − π D² = 3 π D².\n\nStep 5: Increase in surface energy: ΔU = T ΔA = 3 π D² T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4715, // Q20
    similar_question: {
      question: "Eight identical spherical raindrops of radius r, each falling with terminal velocity v_t in air, coalesce to form a single larger spherical raindrop of radius R. What is the terminal velocity of the coalesced raindrop?",
      option_a: "4 v_t",
      option_b: "2 v_t",
      option_c: "8 v_t",
      option_d: "v_t / 2",
      correct_option: "A",
      explanation: "Step 1: Volume conservation for 8 drops: (4/3) π R³ = 8 × (4/3) π r³  →  R = 2r.\n\nStep 2: Terminal velocity in Stokes' flow is proportional to the square of the radius: v_terminal ∝ r².\n\nStep 3: For the new drop of radius R = 2r:\nv_new = v_t × (R / r)² = v_t × (2)² = 4 v_t.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4716, // Q21
    similar_question: {
      question: "Why are the retaining walls of dams made progressively thicker and wider toward the bottom?",
      option_a: "Hydrostatic pressure of the liquid increases linearly with depth (P = ρ g h)",
      option_b: "The density of water increases substantially toward the bottom",
      option_c: "Water temperature drops near the reservoir floor",
      option_d: "To reduce viscous shear stress at the base",
      correct_option: "A",
      explanation: "Step 1: Hydrostatic pressure in a fluid at rest depends directly on depth h: P = ρ g h.\n\nStep 2: Consequently, the horizontal force exerted by water per unit area is greatest near the bottom of the dam.\n\nStep 3: To withstand this enormous hydrostatic pressure and the resulting toppling moment, the base of the dam must be built much thicker.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4717, // Q22
    similar_question: {
      question: "A large cylindrical water tank is filled to a height of 5.0 m. A small circular hole of cross-sectional area 2.0 cm² is punctured at the bottom. Taking g = 10 m/s², what is the initial volumetric discharge rate (rate of leakage) from the hole?",
      option_a: "2.0 × 10⁻³ m³/s",
      option_b: "1.0 × 10⁻³ m³/s",
      option_c: "4.0 × 10⁻³ m³/s",
      option_d: "1.0 × 10⁻² m³/s",
      correct_option: "A",
      explanation: "Step 1: By Torricelli's theorem, the velocity of efflux from a hole at depth h is:\nv = √(2 g h) = √(2 × 10 × 5.0) = √100 = 10 m/s.\n\nStep 2: Cross-sectional area of the orifice is A = 2.0 cm² = 2.0 × 10⁻⁴ m².\n\nStep 3: The volumetric discharge rate is:\nQ = A v = (2.0 × 10⁻⁴ m²) × (10 m/s) = 2.0 × 10⁻³ m³/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4718, // Q23
    similar_question: {
      question: "Two solid objects of different materials are completely submerged in the same liquid and experience identical buoyant forces (upthrust). What must be true about these two objects?",
      option_a: "Both objects have identical volumes",
      option_b: "Both objects have identical masses",
      option_c: "Both objects have identical densities",
      option_d: "Both objects have identical surface areas",
      correct_option: "A",
      explanation: "Step 1: According to Archimedes' principle, the buoyant force on a submerged body equals the weight of the displaced liquid:\nF_b = V_submerged × ρ_liquid × g.\n\nStep 2: Since both objects are fully submerged in the exact same liquid, ρ_liquid and g are identical.\n\nStep 3: For F_b to be equal, their submerged volumes must be identical: V₁ = V₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4719, // Q24
    similar_question: {
      question: "Streamline (laminar) flow is most likely to be maintained in a fluid having:",
      option_a: "Low density and high dynamic viscosity",
      option_b: "High density and low dynamic viscosity",
      option_c: "High density and high velocity",
      option_d: "Low viscosity and large flow channel diameter",
      correct_option: "A",
      explanation: "Step 1: The nature of fluid flow is determined by the dimensionless Reynolds number:\nRe = ρ v D / η.\n\nStep 2: Streamline laminar flow persists when Re is below the critical threshold (Re < 2000).\n\nStep 3: A lower Reynolds number is favored by low density ρ and high viscosity η.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4720, // Q25
    similar_question: {
      question: "The mechanical work done in blowing a spherical liquid drop of radius R is W₁. The work done in blowing a drop of radius 2R from the same liquid is W₂. What is the ratio W₁ : W₂?",
      option_a: "1 : 4",
      option_b: "1 : 2",
      option_c: "1 : 8",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: The work done in forming a liquid drop of radius r with surface tension T is W = T × A = T × (4π r²).\n\nStep 2: Therefore, work done is proportional to the square of the radius: W ∝ r².\n\nStep 3: Compute the ratio:\nW₁ / W₂ = (R / 2R)² = (1 / 2)² = 1 / 4 = 1 : 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4721, // Q26
    similar_question: {
      question: "Two glass capillary tubes of radii 0.1 mm and 0.3 mm are dipped vertically into the same beaker of water. What is the ratio of the capillary rise h₁ in the first tube to h₂ in the second tube?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "9 : 1",
      option_d: "1 : 9",
      correct_option: "A",
      explanation: "Step 1: According to Jurin's law, capillary rise is given by h = 2 T cos θ / (r ρ g).\n\nStep 2: For the same liquid and glass tube, T, θ, ρ, and g are constant, so height is inversely proportional to radius: h ∝ 1 / r.\n\nStep 3: Compute the ratio:\nh₁ / h₂ = r₂ / r₁ = 0.3 mm / 0.1 mm = 3 / 1 = 3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4722, // Q27
    similar_question: {
      question: "At which of the following temperatures does pure water have the lowest surface tension?",
      option_a: "80°C",
      option_b: "50°C",
      option_c: "20°C",
      option_d: "4°C",
      correct_option: "A",
      explanation: "Step 1: The surface tension of liquids decreases monotonically with increasing temperature as molecular thermal motion weakens cohesive intermolecular bonds.\n\nStep 2: At the critical temperature, surface tension vanishes completely.\n\nStep 3: Among the listed options, 80°C is the highest temperature, so water exhibits its lowest surface tension at 80°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4723, // Q28
    similar_question: {
      question: "A solid body floats in water with 1/4 of its volume above the surface. When placed in an unknown oil, it floats with 1/2 of its volume above the surface. What is the specific gravity (relative density) of the oil?",
      option_a: "1.5",
      option_b: "1.2",
      option_c: "0.75",
      option_d: "0.5",
      correct_option: "A",
      explanation: "Step 1: By the principle of floatation, weight of the body equals buoyant force: V ρ_body g = V_submerged ρ_liquid g.\n\nStep 2: In water: fraction submerged is (1 − 1/4) = 3/4, so:\nρ_body = (3/4) ρ_water.\n\nStep 3: In oil: fraction submerged is (1 − 1/2) = 1/2, so:\nρ_body = (1/2) ρ_oil.\n\nStep 4: Equating both expressions for ρ_body:\n(1/2) ρ_oil = (3/4) ρ_water  →  ρ_oil / ρ_water = (3/4) / (1/2) = 3 / 2 = 1.5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4724, // Q29
    similar_question: {
      question: "Water flows horizontally through a pipe that narrows from cross-sectional area 12 cm² to 4 cm². At the wider section, the speed is 1.0 m/s and static pressure is 3000 Pa. Taking density of water ρ = 1000 kg/m³, what is the static pressure at the narrow section?",
      option_a: "–1000 Pa (or suction of 1000 Pa below datum)",
      option_b: "1000 Pa",
      option_c: "2000 Pa",
      option_d: "500 Pa",
      correct_option: "A",
      explanation: "Step 1: Continuity equation: A₁ v₁ = A₂ v₂  →  v₂ = v₁ (A₁ / A₂) = 1.0 × (12 / 4) = 3.0 m/s.\n\nStep 2: Bernoulli's equation for horizontal flow: P₁ + (1/2) ρ v₁² = P₂ + (1/2) ρ v₂².\n\nStep 3: Solve for P₂:\nP₂ = P₁ + (1/2) ρ (v₁² − v₂²) = 3000 + (1/2)(1000)(1.0² − 3.0²)\nP₂ = 3000 + 500 (1 − 9) = 3000 − 4000 = −1000 Pa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4725, // Q30
    similar_question: {
      question: "A manometer attached to a closed horizontal water pipe reads 4.5 × 10⁵ N/m². When a valve is opened and water begins to flow, the pressure reading drops to 4.0 × 10⁵ N/m². Taking the density of water to be 1000 kg/m³, what is the flow speed of the water?",
      option_a: "10 m/s",
      option_b: "5 m/s",
      option_c: "20 m/s",
      option_d: "1 m/s",
      correct_option: "A",
      explanation: "Step 1: When the valve is closed, water is static (v₁ = 0), so total pressure head is P₁ = 4.5 × 10⁵ N/m².\n\nStep 2: When flowing, Bernoulli's equation gives: P₁ = P₂ + (1/2) ρ v₂².\n\nStep 3: Solve for v₂:\n(1/2) ρ v₂² = P₁ − P₂ = 4.5 × 10⁵ − 4.0 × 10⁵ = 5.0 × 10⁴ N/m².\n\nStep 4: Compute v₂²:\nv₂² = 2 × (5.0 × 10⁴) / 1000 = 100  →  v₂ = 10 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4726, // Q31
    similar_question: {
      question: "A hydraulic press has a small piston of radius 2.0 cm and a large piston of radius 10 cm. When a downward force of 20 N is exerted on the small piston, what upward force is exerted on the large piston?",
      option_a: "500 N",
      option_b: "100 N",
      option_c: "250 N",
      option_d: "1000 N",
      correct_option: "A",
      explanation: "Step 1: By Pascal's principle, pressure is transmitted undiminished through an enclosed static fluid: P₁ = P₂.\n\nStep 2: F₁ / A₁ = F₂ / A₂  →  F₂ = F₁ × (A₂ / A₁).\n\nStep 3: Since A = π r², the area ratio is (r₂ / r₁)²:\nF₂ = F₁ × (r₂ / r₁)² = 20 N × (10 cm / 2.0 cm)² = 20 × (5)² = 20 × 25 = 500 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4727, // Q32
    similar_question: {
      question: "What is the total hydrostatic pressure P at a depth h below the surface of an open liquid of uniform density ρ, if atmospheric pressure is P₀?",
      option_a: "P₀ + ρ g h",
      option_b: "P₀ − ρ g h",
      option_c: "ρ g h",
      option_d: "P₀ / (ρ g h)",
      correct_option: "A",
      explanation: "Step 1: The free surface of the liquid is exposed to the atmosphere, exerting downward pressure P₀.\n\nStep 2: A liquid column of depth h exerts additional downward hydrostatic pressure equal to the weight of the column per unit area: P_gauge = ρ g h.\n\nStep 3: Total pressure at depth h is the sum of atmospheric and gauge pressures: P = P₀ + ρ g h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4728, // Q33
    similar_question: {
      question: "Sewing needles and thumbtacks are manufactured with very sharp pointed tips primarily because:",
      option_a: "A very small contact area generates a huge pressure for a modest applied force (P = F / A)",
      option_b: "A sharp tip reduces friction inside the material",
      option_c: "A pointed end increases surface tension",
      option_d: "A small area prevents heat generation",
      correct_option: "A",
      explanation: "Step 1: Pressure is defined as force per unit area: P = F / A.\n\nStep 2: For a sharply pointed tip, the contact area A is extremely small.\n\nStep 3: Even a small applied force F produces an immense localized pressure P, easily puncturing the material.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4729, // Q34
    similar_question: {
      question: "What is the absolute pressure at a depth of 400 m in the ocean? (Assume density of seawater ρ = 1.025 × 10³ kg/m³, atmospheric pressure P₀ = 1.01 × 10⁵ Pa, and g = 9.8 m/s²)",
      option_a: "4.12 × 10⁶ Pa (approximately 40.7 atm)",
      option_b: "3.02 × 10⁶ Pa",
      option_c: "5.12 × 10⁶ Pa",
      option_d: "2.12 × 10⁶ Pa",
      correct_option: "A",
      explanation: "Step 1: Gauge pressure at depth h = 400 m is:\nP_gauge = ρ g h = (1.025 × 10³ kg/m³) × (9.8 m/s²) × 400 m = 4.018 × 10⁶ Pa.\n\nStep 2: Total absolute pressure is P = P₀ + P_gauge:\nP = 1.01 × 10⁵ Pa + 4.018 × 10⁶ Pa = 4.119 × 10⁶ Pa ≈ 4.12 × 10⁶ Pa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4730, // Q35
    similar_question: {
      question: "Four open vessels of different shapes but identical base area are filled with water to the exact same vertical depth h. The hydrostatic pressures P_A, P_B, P_C, and P_D at the bottom of the four vessels satisfy:",
      option_a: "P_A = P_B = P_C = P_D",
      option_b: "The vessel with the largest volume has the highest pressure",
      option_c: "The narrowest vessel has the highest pressure",
      option_d: "P_A > P_B > P_C > P_D",
      correct_option: "A",
      explanation: "Step 1: Hydrostatic pressure in a continuous fluid depends only on vertical depth h, fluid density ρ, and acceleration due to gravity g: P = P₀ + ρ g h.\n\nStep 2: It is completely independent of the shape of the vessel and total volume of liquid contained (Hydrostatic Paradox).\n\nStep 3: Since depth h and liquid density ρ are identical, pressures at the bottom are all equal.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4731, // Q36
    similar_question: {
      question: "An object weighs 8.0 N in air and 5.0 N when completely immersed in water. What is the magnitude of the buoyant force exerted by the water on the object?",
      option_a: "3.0 N",
      option_b: "13.0 N",
      option_c: "5.0 N",
      option_d: "8.0 N",
      correct_option: "A",
      explanation: "Step 1: Apparent weight of an object submerged in a fluid is W_apparent = W_air − F_buoyant.\n\nStep 2: Rearranging for the buoyant force gives:\nF_buoyant = W_air − W_apparent.\n\nStep 3: Substitute W_air = 8.0 N and W_apparent = 5.0 N:\nF_buoyant = 8.0 N − 5.0 N = 3.0 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4732, // Q37
    similar_question: {
      question: "For a given liquid and solid, how does the capillary rise height h vary with the tube radius r according to Jurin's law?",
      option_a: "h ∝ 1 / r (a rectangular hyperbola curve)",
      option_b: "h ∝ r (a straight line passing through the origin)",
      option_c: "h ∝ 1 / r²",
      option_d: "h is independent of r",
      correct_option: "A",
      explanation: "Step 1: Jurin's law states that capillary rise is h = 2 T cos θ / (r ρ g).\n\nStep 2: With T, θ, ρ, and g held constant, h × r = constant.\n\nStep 3: This inverse relationship represents a rectangular hyperbola when plotting h versus r.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4733, // Q38
    similar_question: {
      question: "In two capillary tubes A and B dipped in water, the height of the water column in tube A is 3/4 of that in tube B. What is the ratio of the diameter of tube A to that of tube B?",
      option_a: "4 : 3",
      option_b: "3 : 4",
      option_c: "16 : 9",
      option_d: "9 : 16",
      correct_option: "A",
      explanation: "Step 1: Capillary rise is inversely proportional to diameter: h ∝ 1 / d.\n\nStep 2: Therefore, h_A / h_B = d_B / d_A.\n\nStep 3: Given h_A / h_B = 3 / 4, we have d_B / d_A = 3 / 4  →  d_A / d_B = 4 / 3 = 4 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4734, // Q39
    similar_question: {
      question: "A liquid barometer is constructed using an oil of density 850 kg/m³. What is the height of the oil column when a standard mercury barometer reads 76 cm of Hg? (Density of mercury = 13600 kg/m³)",
      option_a: "12.16 m",
      option_b: "6.08 m",
      option_c: "1.36 m",
      option_d: "13.6 m",
      correct_option: "A",
      explanation: "Step 1: Equate the hydrostatic pressure of both liquid columns:\nρ_oil g h_oil = ρ_Hg g h_Hg.\n\nStep 2: Solve for h_oil:\nh_oil = (ρ_Hg / ρ_oil) × h_Hg.\n\nStep 3: Substitute values: ρ_Hg = 13600 kg/m³, ρ_oil = 850 kg/m³, h_Hg = 0.76 m:\nh_oil = (13600 / 850) × 0.76 = 16 × 0.76 = 12.16 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4735, // Q40
    similar_question: {
      question: "A uniform wooden block floats in water with 2/5 of its total volume above the water surface. What is the density of the wood? (Density of water = 1000 kg/m³)",
      option_a: "600 kg/m³",
      option_b: "400 kg/m³",
      option_c: "800 kg/m³",
      option_d: "250 kg/m³",
      correct_option: "A",
      explanation: "Step 1: By the law of floatation, weight of the block equals weight of displaced water:\nV ρ_wood g = V_submerged ρ_water g.\n\nStep 2: The volume submerged is V_submerged = (1 − 2/5) V = (3/5) V.\n\nStep 3: Substitute and solve for ρ_wood:\nρ_wood = (3/5) ρ_water = (3/5) × 1000 kg/m³ = 600 kg/m³.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 11 Part 1 (${set11Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set11Part1Updates) {
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
        console.log(`[${successCount}/${set11Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 11 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
