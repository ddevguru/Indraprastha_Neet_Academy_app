const fs = require('fs');

const set11Part2Updates = [
  {
    id: 4736, // Q41
    similar_question: {
      question: "The CGS unit of dynamic viscosity is the poise (P) and the SI unit is the poiseuille (Pl, or Pa·s). What is the exact relationship between 1 poiseuille and 1 poise?",
      option_a: "1 poiseuille = 10 poise",
      option_b: "1 poise = 10 poiseuille",
      option_c: "1 poiseuille = 1 poise",
      option_d: "1 poiseuille = 100 poise",
      correct_option: "A",
      explanation: "Step 1: In SI units, dynamic viscosity is measured in Pa·s = (N·s) / m² = (kg·m/s² · s) / m² = kg / (m·s).\n\nStep 2: In CGS units, 1 poise = 1 g / (cm·s).\n\nStep 3: Convert SI to CGS:\n1 kg / (m·s) = (1000 g) / (100 cm·s) = 10 g / (cm·s) = 10 poise.\n\nStep 4: Therefore, 1 poiseuille (1 Pa·s) = 10 poise.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4737, // Q42
    similar_question: {
      question: "Why does clean water form spherical beads and fail to wet a glass plate that has been coated with a thin film of oil or wax?",
      option_a: "Cohesive forces among water molecules are much stronger than the adhesive forces between water and oil molecules",
      option_b: "Adhesive forces between water and oil exceed cohesive forces of water",
      option_c: "Oil chemically reacts with water molecules",
      option_d: "Water has zero surface tension on oily surfaces",
      correct_option: "A",
      explanation: "Step 1: Wetting of a surface is governed by the competition between cohesive forces (mutual attraction between liquid molecules) and adhesive forces (attraction between liquid and substrate molecules).\n\nStep 2: When water encounters an oily or waxy surface, the cohesive hydrogen-bonding forces between water molecules are substantially greater than the weak van der Waals adhesive forces between water and the non-polar oil.\n\nStep 3: Consequently, water minimizes its contact area with the oily surface, forming distinct beads (contact angle θ > 90°).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4738, // Q43
    similar_question: {
      question: "For steady laminar flow of a viscous fluid through a long circular pipe of radius R, what is the shape of the velocity profile across the pipe's cross-section?",
      option_a: "Parabolic, with maximum velocity along the central axis and zero velocity at the pipe walls",
      option_b: "Completely uniform and flat across the entire diameter",
      option_c: "Linear, increasing from one wall to the opposite wall",
      option_d: "Logarithmic, with minimum velocity at the center",
      correct_option: "A",
      explanation: "Step 1: According to Poiseuille's law for laminar pipe flow, the velocity distribution is given by:\nv(r) = [ ΔP / (4 η L) ] (R² − r²).\n\nStep 2: At the boundary r = R (no-slip condition), v(R) = 0.\nAt the central axis r = 0, the velocity reaches its maximum value v_max = ΔP R² / (4 η L).\n\nStep 3: This quadratic variation with radial distance r represents a parabolic velocity profile.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4739, // Q44
    similar_question: {
      question: "Two vertical glass capillary tubes of different internal diameters are dipped into the same beaker of water. The height to which water rises is:",
      option_a: "Greater in the tube with the smaller diameter",
      option_b: "Greater in the tube with the larger diameter",
      option_c: "Exactly the same in both tubes",
      option_d: "Independent of the tube diameter",
      correct_option: "A",
      explanation: "Step 1: By Jurin's law, capillary rise height is given by h = 2 T cos θ / (r ρ g).\n\nStep 2: Since T, θ, ρ, and g are identical for both tubes, the rise height is inversely proportional to the tube radius (or diameter): h ∝ 1 / d.\n\nStep 3: Therefore, the tube with the narrower diameter exhibits a greater height of capillary rise.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4740, // Q45
    similar_question: {
      question: "In a laboratory experiment on Earth, water rises to a height of 5.0 cm in a capillary tube of length 15 cm. If the same experiment is performed inside an artificial satellite orbiting the Earth in weightlessness (effective g = 0), what will happen to the water in the capillary tube?",
      option_a: "Water will rise to the very top end of the tube and adjust its meniscus curvature without overflowing",
      option_b: "Water will rise to exactly 5.0 cm and remain there",
      option_c: "Water will fountain out of the top continuously",
      option_d: "Water will not enter the capillary tube at all",
      correct_option: "A",
      explanation: "Step 1: Capillary rise is h = 2 T cos θ / (r ρ g). In an orbiting satellite in free fall, the effective gravitational acceleration is zero (g_eff = 0), which would theoretically make h infinite.\n\nStep 2: In practice, water rises until it reaches the upper end of the capillary tube of finite length L.\n\nStep 3: At the top, the meniscus flattens (radius of curvature R increases) so that 2 T / R matches the zero net pressure difference, preventing overflow.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4741, // Q46
    similar_question: {
      question: "In a hydraulic lift, a small piston of cross-sectional area 50 cm² is subjected to a force of 200 N. If the large piston supports an automobile of mass 1500 kg, what must be the cross-sectional area of the large piston? (Take g = 9.8 m/s²)",
      option_a: "3675 cm²",
      option_b: "1838 cm²",
      option_c: "7350 cm²",
      option_d: "1500 cm²",
      correct_option: "A",
      explanation: "Step 1: By Pascal's law, pressure transmitted through the hydraulic fluid is uniform: P₁ = P₂.\n\nStep 2: F₁ / A₁ = F₂ / A₂  →  A₂ = A₁ × (F₂ / F₁).\n\nStep 3: Weight supported by the large piston is F₂ = m g = 1500 kg × 9.8 m/s² = 14700 N.\nForce on the small piston is F₁ = 200 N, and area A₁ = 50 cm².\n\nStep 4: Compute A₂:\nA₂ = 50 cm² × (14700 / 200) = 50 × 73.5 = 3675 cm².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4742, // Q47
    similar_question: {
      question: "Consider three points A, B, and C located at the same horizontal depth h beneath the free surface of a stationary liquid in a large tank. How do the hydrostatic pressures P_A, P_B, and P_C at these points compare?",
      option_a: "P_A = P_B = P_C",
      option_b: "P_A > P_B > P_C",
      option_c: "P_A < P_B < P_C",
      option_d: "Pressures depend on the surface area of the tank above each point",
      correct_option: "A",
      explanation: "Step 1: For a continuous, incompressible fluid in static equilibrium under gravity, hydrostatic pressure is a function solely of vertical depth: P = P₀ + ρ g h.\n\nStep 2: Points that lie on the same horizontal plane have the same vertical depth h below the free liquid surface.\n\nStep 3: Therefore, the hydrostatic pressure is strictly identical at all three points: P_A = P_B = P_C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4743, // Q48
    similar_question: {
      question: "Water flows horizontally through a pipe of varying cross-section. At a wider point where the speed is 0.4 m/s, the pressure is 2.0 × 10⁴ Pa. At a narrower constriction where the speed is 1.2 m/s, what is the pressure? (Density of water = 1000 kg/m³)",
      option_a: "1.936 × 10⁴ Pa",
      option_b: "1.872 × 10⁴ Pa",
      option_c: "2.064 × 10⁴ Pa",
      option_d: "1.500 × 10⁴ Pa",
      correct_option: "A",
      explanation: "Step 1: Apply Bernoulli's equation for horizontal streamline flow:\nP₁ + (1/2) ρ v₁² = P₂ + (1/2) ρ v₂².\n\nStep 2: Rearrange for P₂:\nP₂ = P₁ + (1/2) ρ (v₁² − v₂²).\n\nStep 3: Given P₁ = 2.0 × 10⁴ Pa, v₁ = 0.4 m/s, v₂ = 1.2 m/s, ρ = 1000 kg/m³:\nv₁² − v₂² = (0.4)² − (1.2)² = 0.16 − 1.44 = −1.28 m²/s².\n(1/2) ρ (v₁² − v₂²) = (1/2) × 1000 × (−1.28) = −640 Pa.\n\nStep 4: Compute P₂:\nP₂ = 20000 Pa − 640 Pa = 19360 Pa = 1.936 × 10⁴ Pa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4744, // Q49
    similar_question: {
      question: "Air of density 1.2 kg/m³ flows horizontally past an airplane wing of planform area 25 m². The air speed over the upper surface is 70 m/s and under the lower surface is 50 m/s. What is the dynamic lift force generated on the wing?",
      option_a: "3.6 × 10⁴ N",
      option_b: "1.8 × 10⁴ N",
      option_c: "7.2 × 10⁴ N",
      option_d: "2.4 × 10⁴ N",
      correct_option: "A",
      explanation: "Step 1: By Bernoulli's principle, the pressure difference between the lower and upper surfaces is:\nΔP = P_bottom − P_top = (1/2) ρ (v_top² − v_bottom²).\n\nStep 2: Substitute values: ρ = 1.2 kg/m³, v_top = 70 m/s, v_bottom = 50 m/s:\nv_top² − v_bottom² = (70)² − (50)² = 4900 − 2500 = 2400 m²/s².\nΔP = (1/2) × 1.2 × 2400 = 0.6 × 2400 = 1440 Pa.\n\nStep 3: Total aerodynamic lift force is:\nLift = ΔP × A = 1440 Pa × 25 m² = 3.6 × 10⁴ N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4745, // Q50
    similar_question: {
      question: "Water (density 1000 kg/m³, viscosity 1.0 × 10⁻³ Pa·s) flows through a pipe of diameter 2.0 cm at a volumetric flow rate of 3.14 × 10⁻⁴ m³/s. What is the Reynolds number, and what is the nature of the flow?",
      option_a: "Re = 20000, flow is turbulent",
      option_b: "Re = 1000, flow is laminar",
      option_c: "Re = 500, flow is laminar",
      option_d: "Re = 2000, flow is critical transition",
      correct_option: "A",
      explanation: "Step 1: Cross-sectional area of the pipe is A = π D² / 4 = π (0.02 m)² / 4 = π × 10⁻⁴ m².\n\nStep 2: Flow velocity is v = Q / A = (3.14 × 10⁻⁴ m³/s) / (3.14 × 10⁻⁴ m²) = 1.0 m/s.\n\nStep 3: Compute Reynolds number:\nRe = ρ v D / η = (1000 kg/m³ × 1.0 m/s × 0.02 m) / (1.0 × 10⁻³ Pa·s) = 20 / 10⁻³ = 20000.\n\nStep 4: Since Re ≫ 3000, the flow is completely turbulent.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4746, // Q51
    similar_question: {
      question: "Water of density ρ flows steadily through a horizontal pipe of non-uniform cross-section. At a point where the flow speed is v, the pressure is P. What is the pressure at a point where the flow speed is 3v?",
      option_a: "P − 4 ρ v²",
      option_b: "P − 8 ρ v²",
      option_c: "P + 4 ρ v²",
      option_d: "P − 9 ρ v²",
      correct_option: "A",
      explanation: "Step 1: Apply Bernoulli's equation for horizontal streamline flow:\nP₁ + (1/2) ρ v₁² = P₂ + (1/2) ρ v₂².\n\nStep 2: Substitute v₁ = v, P₁ = P, and v₂ = 3v:\nP + (1/2) ρ v² = P₂ + (1/2) ρ (3v)² = P₂ + (9/2) ρ v².\n\nStep 3: Solve for P₂:\nP₂ = P + (1/2) ρ v² − (9/2) ρ v² = P − (8/2) ρ v² = P − 4 ρ v².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4747, // Q52
    similar_question: {
      question: "Two identical water droplets of radius r, each falling with terminal velocity v_t in air, coalesce to form a single larger drop. What is the terminal velocity of the combined drop?",
      option_a: "2^(2/3) v_t",
      option_b: "2^(1/3) v_t",
      option_c: "2 v_t",
      option_d: "4 v_t",
      correct_option: "A",
      explanation: "Step 1: By volume conservation: (4/3) π R³ = 2 × (4/3) π r³  →  R³ = 2 r³  →  R = 2^(1/3) r.\n\nStep 2: Terminal velocity in Stokes' regime varies as the square of the radius: v_terminal ∝ r².\n\nStep 3: For the coalesced drop of radius R:\nv_terminal' = v_t × (R / r)² = v_t × [ 2^(1/3) ]² = 2^(2/3) v_t.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4748, // Q53
    similar_question: {
      question: "How does the dynamic viscosity of air (a gas) compare between high temperatures and low temperatures?",
      option_a: "Viscosity of air is greater at higher temperatures because molecular momentum transfer increases with thermal speed",
      option_b: "Viscosity of air is smaller at higher temperatures",
      option_c: "Viscosity of air is strictly independent of temperature",
      option_d: "Viscosity of air drops to zero above 50°C",
      correct_option: "A",
      explanation: "Step 1: In gases, viscosity arises from the transport of momentum across flow layers due to random thermal molecular motion.\n\nStep 2: As temperature T increases, the average molecular speed increases (v_thermal ∝ √T), enhancing momentum exchange between adjacent layers.\n\nStep 3: According to kinetic theory, dynamic viscosity of a gas scales as η ∝ √T, so viscosity increases with temperature (unlike liquids, where viscosity decreases with temperature).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4749, // Q54
    similar_question: {
      question: "An incompressible fluid flows steadily through a tube of circular cross-section. The ratio of the entrance radius to the exit radius is 2 : 1. What is the ratio of the flow speed at the entrance to that at the exit?",
      option_a: "1 : 4",
      option_b: "4 : 1",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "Step 1: By the equation of continuity for steady incompressible flow: A₁ v₁ = A₂ v₂.\n\nStep 2: Cross-sectional areas are A₁ = π r₁² and A₂ = π r₂²:\nπ r₁² v₁ = π r₂² v₂  →  v₁ / v₂ = (r₂ / r₁)².\n\nStep 3: Given r₁ / r₂ = 2 / 1, we have r₂ / r₁ = 1 / 2:\nv₁ / v₂ = (1 / 2)² = 1 / 4 = 1 : 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4750, // Q55
    similar_question: {
      question: "The fundamental physical principle stating that any change in pressure applied to an enclosed static fluid is transmitted undiminished to every portion of the fluid and the container walls was formulated by:",
      option_a: "Blaise Pascal",
      option_b: "Daniel Bernoulli",
      option_c: "Evangelista Torricelli",
      option_d: "Osborne Reynolds",
      correct_option: "A",
      explanation: "Step 1: Pascal's principle (or Pascal's law), stated by French scientist Blaise Pascal in 1653, states that pressure applied to an enclosed fluid is transmitted without diminution throughout the fluid.\n\nStep 2: This principle forms the operational basis for hydraulic lifts, hydraulic brakes, and hydraulic presses.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4751, // Q56
    similar_question: {
      question: "A person of mass 60 kg balances momentarily on the circular heel of a high-heeled shoe of diameter 1.0 cm. Taking g = 9.8 m/s², what is the pressure exerted on the floor beneath the heel?",
      option_a: "7.49 × 10⁶ Pa",
      option_b: "3.75 × 10⁶ Pa",
      option_c: "1.87 × 10⁵ Pa",
      option_d: "7.49 × 10⁴ Pa",
      correct_option: "A",
      explanation: "Step 1: Downward force is the total weight F = m g = 60 kg × 9.8 m/s² = 588 N.\n\nStep 2: Radius of the circular heel is r = d / 2 = 0.5 cm = 5.0 × 10⁻³ m.\nCross-sectional area A = π r² = π (5.0 × 10⁻³)² = 25π × 10⁻⁶ m² ≈ 7.854 × 10⁻⁵ m².\n\nStep 3: Pressure is:\nP = F / A = 588 N / (7.854 × 10⁻⁵ m²) ≈ 7.49 × 10⁶ Pa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4752, // Q57
    similar_question: {
      question: "Water discharges under gravity through a small orifice near the bottom of an open tank. The volume of liquid flowing out per unit time does NOT depend on:",
      option_a: "The density of the liquid",
      option_b: "The cross-sectional area of the orifice",
      option_c: "The depth of the orifice below the free liquid surface",
      option_d: "The local acceleration due to gravity",
      correct_option: "A",
      explanation: "Step 1: By Torricelli's law, the efflux speed is v = √(2 g h), where h is the depth below the free surface.\n\nStep 2: The volumetric discharge rate is Q = A v = A √(2 g h).\n\nStep 3: Notice that fluid density ρ cancels completely from Torricelli's equation for ideal fluid flow, so the volumetric rate of efflux does not depend on the density of the liquid.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4753, // Q58
    similar_question: {
      question: "Bernoulli's theorem for the steady streamline flow of an ideal incompressible fluid is a direct mathematical expression of:",
      option_a: "The law of conservation of mechanical energy",
      option_b: "The law of conservation of linear momentum",
      option_c: "The law of conservation of mass",
      option_d: "The law of conservation of angular momentum",
      correct_option: "A",
      explanation: "Step 1: Bernoulli's equation, P + (1/2) ρ v² + ρ g h = constant, is obtained by applying the work-energy theorem to a fluid element moving along a streamline.\n\nStep 2: The terms represent static pressure energy, kinetic energy per unit volume, and gravitational potential energy per unit volume.\n\nStep 3: Hence, it is an expression of the conservation of mechanical energy for flowing fluids.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4754, // Q59
    similar_question: {
      question: "An ideal fluid flows through two connected circular pipes of diameters 2.0 cm and 4.0 cm respectively. What is the ratio of the flow velocity in the first pipe to that in the second pipe?",
      option_a: "4 : 1",
      option_b: "1 : 4",
      option_c: "2 : 1",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "Step 1: By the equation of continuity for incompressible flow: A₁ v₁ = A₂ v₂.\n\nStep 2: Cross-sectional areas are A₁ = π d₁² / 4 and A₂ = π d₂² / 4.\n\nStep 3: Therefore, the velocity ratio is:\nv₁ / v₂ = (d₂ / d₁)² = (4.0 cm / 2.0 cm)² = (2)² = 4 / 1 = 4 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4755, // Q60
    similar_question: {
      question: "What are the dimensions of the coefficient of dynamic viscosity η in SI base dimensions [M, L, T]?",
      option_a: "[M L⁻¹ T⁻¹]",
      option_b: "[M L⁻¹ T⁻²]",
      option_c: "[M L⁻² T⁻¹]",
      option_d: "[M² L⁻¹ T⁻¹]",
      correct_option: "A",
      explanation: "Step 1: From Newton's law of viscosity, shear force is F = η A (dv / dz).\n\nStep 2: Rearranging for η:\nη = F / [ A (dv / dz) ].\n\nStep 3: Substitute fundamental dimensions:\n[F] = [M L T⁻²]\n[A] = [L²]\n[dv / dz] = [L T⁻¹ / L] = [T⁻¹].\n\nStep 4: Combine dimensions:\n[η] = [M L T⁻²] / [ L² · T⁻¹ ] = [M L⁻¹ T⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4756, // Q61
    similar_question: {
      question: "If mechanical work W is required to blow a spherical soap bubble of radius r, what amount of work is required to blow a soap bubble of radius 3r from the same solution?",
      option_a: "9 W",
      option_b: "3 W",
      option_c: "27 W",
      option_d: "6 W",
      correct_option: "A",
      explanation: "Step 1: A soap bubble has two free surfaces, so the work done is W = 2 × (4π r² T) = 8π r² T.\n\nStep 2: Hence, work done is directly proportional to the square of the radius: W ∝ r².\n\nStep 3: For radius 3r:\nW' = 8π (3r)² T = 9 × (8π r² T) = 9 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4757, // Q62
    similar_question: {
      question: "Water flows through a horizontal pipe with a speed of 20 m/s. Taking g = 10 m/s², what is the velocity head of the water?",
      option_a: "20 m",
      option_b: "10 m",
      option_c: "40 m",
      option_d: "2 m",
      correct_option: "A",
      explanation: "Step 1: The velocity head h_v is defined as h_v = v² / (2g).\n\nStep 2: Substitute v = 20 m/s and g = 10 m/s²:\nh_v = (20)² / (2 × 10) = 400 / 20 = 20 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4758, // Q63
    similar_question: {
      question: "Two horizontal parallel layers of a liquid separated by a vertical distance of 0.05 cm move with a relative speed of 6.0 cm/s. What is the velocity gradient between the layers?",
      option_a: "120 s⁻¹",
      option_b: "60 s⁻¹",
      option_c: "300 s⁻¹",
      option_d: "12 s⁻¹",
      correct_option: "A",
      explanation: "Step 1: Velocity gradient is defined as the spatial rate of change of velocity: dv / dz.\n\nStep 2: Substitute Δv = 6.0 cm/s and Δz = 0.05 cm:\nVelocity Gradient = Δv / Δz = (6.0 cm/s) / (0.05 cm) = 120 s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4759, // Q64
    similar_question: {
      question: "When a small dense metal sphere is released from rest in a tall cylinder filled with a viscous liquid, its downward velocity:",
      option_a: "Increases with decreasing acceleration until it reaches a constant terminal velocity",
      option_b: "Increases at a uniform acceleration equal to g",
      option_c: "Remains constant from the instant of release",
      option_d: "Decreases monotonically to zero",
      correct_option: "A",
      explanation: "Step 1: Initially upon release, velocity is zero, so viscous drag is zero (F_v = 6π η r v = 0) and the downward acceleration is maximum.\n\nStep 2: As velocity increases, viscous drag increases, progressively reducing the net downward force and acceleration: a = g (1 − ρ_fluid / ρ_sphere) − (6π η r v / m).\n\nStep 3: When the upward viscous and buoyant forces balance the downward gravitational force, net force becomes zero and velocity remains constant at the terminal velocity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4760, // Q65
    similar_question: {
      question: "Water rises to a height of 15 mm in a capillary tube of radius r. If the tube is replaced by another capillary tube of the same glass having radius r / 4, what will be the height of the water column in this narrower tube?",
      option_a: "60 mm",
      option_b: "3.75 mm",
      option_c: "30 mm",
      option_d: "120 mm",
      correct_option: "A",
      explanation: "Step 1: By Jurin's law, capillary rise height is h = 2 T cos θ / (r ρ g).\n\nStep 2: Height is inversely proportional to radius: h ∝ 1 / r  →  h₁ r₁ = h₂ r₂.\n\nStep 3: Substitute h₁ = 15 mm, r₁ = r, and r₂ = r / 4:\n15 × r = h₂ × (r / 4)  →  h₂ = 15 × 4 = 60 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4761, // Q66
    similar_question: {
      question: "The excess pressure inside soap bubble 1 is four times that inside soap bubble 2. What is the ratio of the surface area of bubble 1 to that of bubble 2?",
      option_a: "1 : 16",
      option_b: "1 : 4",
      option_c: "16 : 1",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: Excess pressure inside a soap bubble is ΔP = 4 T / R  →  R ∝ 1 / ΔP.\n\nStep 2: Given ΔP₁ / ΔP₂ = 4 / 1, the ratio of radii is R₁ / R₂ = ΔP₂ / ΔP₁ = 1 / 4.\n\nStep 3: Surface area is proportional to R²: A ∝ R².\n\nStep 4: Ratio of surface areas:\nA₁ / A₂ = (R₁ / R₂)² = (1 / 4)² = 1 / 16 = 1 : 16.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4762, // Q67
    similar_question: {
      question: "A large storage tank is filled with water to a vertical height H = 20 m. A small puncture is made in the side wall at a depth h = 5.0 m below the free water surface. Taking g = 10 m/s², what is the speed of efflux of water from the puncture?",
      option_a: "10 m/s",
      option_b: "20 m/s",
      option_c: "14.1 m/s",
      option_d: "5.0 m/s",
      correct_option: "A",
      explanation: "Step 1: By Torricelli's law, the speed of efflux through an orifice at depth h below the free surface of an open tank is:\nv = √(2 g h).\n\nStep 2: Substitute h = 5.0 m and g = 10 m/s²:\nv = √(2 × 10 × 5.0) = √100 = 10 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4763, // Q68
    similar_question: {
      question: "In steady streamline flow of an incompressible fluid, which of the following is true regarding the fluid velocity at any given fixed point in space?",
      option_a: "Every fluid particle arriving at that point possesses the exact same velocity in both magnitude and direction",
      option_b: "The velocity of every particle everywhere in the fluid is identical at all points",
      option_c: "The speed of a particle remains constant as it travels along the streamline",
      option_d: "Streamlines can cross each other without turbulence",
      correct_option: "A",
      explanation: "Step 1: By definition of steady streamline flow, the velocity field at any fixed spatial point is independent of time: ∂v⃗ / ∂t = 0.\n\nStep 2: This means every fluid particle passing through a specific point will have the exact same velocity vector as its predecessors.\n\nStep 3: As a particle travels from one point to another along the streamline, its velocity may change, but at any given point it remains steady.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4764, // Q69
    similar_question: {
      question: "Assertion (A): The dynamic viscosity of pure water is lower than that of human blood at body temperature.\nReason (R): Blood is a non-Newtonian suspension containing red blood cells and plasma proteins that significantly increase internal viscous resistance.\nWhich of the following is correct?",
      option_a: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion",
      option_c: "Assertion is true, but Reason is false",
      option_d: "Both Assertion and Reason are false",
      correct_option: "A",
      explanation: "Step 1: Water has a viscosity of ~0.7 × 10⁻³ Pa·s at 37°C, whereas whole blood has a viscosity of ~3.0 × 10⁻³ to 4.0 × 10⁻³ Pa·s (roughly 4 to 5 times greater). Thus, Assertion is true.\n\nStep 2: Blood is a suspension of cellular elements (erythrocytes, leukocytes, platelets) and large proteins (fibrinogen, albumin) in plasma, which interact and produce substantial internal shear resistance. Thus, Reason is true and correctly explains the Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4765, // Q70
    similar_question: {
      question: "Assertion (A): Pascal's principle serves as the operating foundation for hydraulic brakes and hydraulic presses.\nReason (R): Pressure applied to any part of an enclosed, non-flowing liquid is transmitted undiminished in all directions throughout the liquid.\nWhich of the following is correct?",
      option_a: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion",
      option_c: "Assertion is true, but Reason is false",
      option_d: "Both Assertion and Reason are false",
      correct_option: "A",
      explanation: "Step 1: Pascal's principle states that an external pressure applied to an enclosed static fluid is transmitted equally to all parts of the fluid and the vessel walls. Thus, Reason is true.\n\nStep 2: This undiminished pressure transmission enables a small force on a small piston to produce a multiplied force on a large piston, forming the working mechanism of hydraulic machinery. Thus, Assertion is true and Reason explains it.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4766, // Q71
    similar_question: {
      question: "When a body falling through a viscous fluid reaches its constant terminal velocity, the net acceleration of the body is:",
      option_a: "Zero",
      option_b: "Equal to g",
      option_c: "Less than g but non-zero",
      option_d: "Directed upwards",
      correct_option: "A",
      explanation: "Step 1: By definition, terminal velocity is the steady speed at which the net downward force on the falling body vanishes completely.\n\nStep 2: At this speed, downward gravity is exactly balanced by the sum of upward buoyancy and viscous drag: W = F_b + F_viscous.\n\nStep 3: Because net force is zero, by Newton's second law, acceleration is a = F_net / m = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4767, // Q72
    similar_question: {
      question: "The surface tension of a soap solution is 0.03 N/m. What is the work done in blowing a soap bubble until its outer surface area becomes 50 cm²?",
      option_a: "3.0 × 10⁻⁴ J",
      option_b: "1.5 × 10⁻⁴ J",
      option_c: "6.0 × 10⁻⁴ J",
      option_d: "3.0 × 10⁻² J",
      correct_option: "A",
      explanation: "Step 1: A soap bubble has two free liquid-gas surfaces (inner and outer).\n\nStep 2: If the outer surface area is A = 50 cm² = 50 × 10⁻⁴ m², the total surface area created is:\nA_total = 2 × A = 2 × (50 × 10⁻⁴ m²) = 1.0 × 10⁻² m².\n\nStep 3: Work done is W = T × A_total:\nW = 0.03 N/m × (1.0 × 10⁻² m²) = 3.0 × 10⁻⁴ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4768, // Q73
    similar_question: {
      question: "A clean glass capillary tube of internal radius 0.5 mm is dipped vertically into water (surface tension T = 0.07 N/m, contact angle θ = 0°, density ρ = 1000 kg/m³). Taking g = 9.8 m/s², what is the height of capillary rise?",
      option_a: "2.86 cm",
      option_b: "1.43 cm",
      option_c: "5.72 cm",
      option_d: "0.71 cm",
      correct_option: "A",
      explanation: "Step 1: Jurin's formula: h = 2 T cos θ / (r ρ g).\n\nStep 2: Given T = 0.07 N/m, θ = 0° (cos 0° = 1), r = 0.5 mm = 5.0 × 10⁻⁴ m, ρ = 1000 kg/m³, g = 9.8 m/s².\n\nStep 3: Substitute:\nh = (2 × 0.07 × 1) / (5.0 × 10⁻⁴ × 1000 × 9.8) = 0.14 / (4.9) = 0.02857 m ≈ 2.86 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4769, // Q74
    similar_question: {
      question: "Two speedboats cruising parallel and close to each other in calm water experience a mutual attractive pull drawing them together. This phenomenon is explained by:",
      option_a: "Bernoulli's principle, because high water speed in the narrow gap between them creates a region of reduced pressure",
      option_b: "Gravitational attraction between the massive hulls",
      option_c: "Electrostatic attraction between spray droplets",
      option_d: "Surface tension pulling the hulls together",
      correct_option: "A",
      explanation: "Step 1: When boats travel close together, water is squeezed through the narrow channel between them, increasing the relative flow speed v.\n\nStep 2: According to Bernoulli's equation, an increase in fluid speed leads to a corresponding drop in hydrostatic pressure (P + 1/2 ρ v² = constant).\n\nStep 3: The pressure outside the boats remains higher than the pressure in the gap between them, producing a net inward lateral force that pushes the boats toward each other.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4770, // Q75
    similar_question: {
      question: "A solid wooden block floats in water inside a beaker. If the entire beaker-block system is dropped and falls freely under gravity, the buoyant force on the block during free fall is:",
      option_a: "Zero",
      option_b: "Equal to the weight of the block in air",
      option_c: "Equal to the weight of the water displaced on Earth",
      option_d: "Infinite",
      correct_option: "A",
      explanation: "Step 1: Buoyant force is given by F_b = V_submerged × ρ × g_eff.\n\nStep 2: In a freely falling elevator or frame, the effective acceleration due to gravity is zero: g_eff = g − g = 0.\n\nStep 3: In the absence of effective gravity, hydrostatic pressure is uniform everywhere (dP/dz = 0), so the buoyant force becomes identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4771, // Q76
    similar_question: {
      question: "A water tank on Earth has a small orifice at depth h below the water level. The speed of efflux is v = √(2gh) and the horizontal range of the jet is R. If this tank is transported to the Moon where acceleration due to gravity is g / 6, how do v and R change?",
      option_a: "Speed of efflux decreases to v / √6, but horizontal range R remains unchanged",
      option_b: "Both speed of efflux and horizontal range decrease by √6",
      option_c: "Both speed of efflux and horizontal range remain unchanged",
      option_d: "Horizontal range increases to 6 R",
      correct_option: "A",
      explanation: "Step 1: Efflux velocity is v = √(2 g_eff h), so on the Moon (g' = g / 6), v' = √(2 (g/6) h) = v / √6 (decreases).\n\nStep 2: Time to fall vertical distance y to the ground is t = √(2y / g').\n\nStep 3: Horizontal range is R' = v' × t' = √(2 g' h) × √(2y / g') = 2 √(h y), which is completely independent of g!\nThus, R remains unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4772, // Q77
    similar_question: {
      question: "A solid cube floats in liquid with submerged depth x. If the liquid is heated such that its density decreases, how does the submerged depth x change?",
      option_a: "x increases so that a larger volume of less dense liquid is displaced",
      option_b: "x decreases",
      option_c: "x remains unchanged",
      option_d: "x drops to zero",
      correct_option: "A",
      explanation: "Step 1: By the law of floatation, M_cube g = V_submerged ρ_liquid g.\n\nStep 2: For a cube of base area A, V_submerged = A x, so M = A x ρ_liquid  →  x = M / (A ρ_liquid).\n\nStep 3: When the liquid expands upon heating, its density ρ_liquid decreases. Since M and A are constant, x must increase to maintain equilibrium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4773, // Q78
    similar_question: {
      question: "Which of the following laboratory and industrial instruments operates directly on Bernoulli's principle to measure the volumetric rate of flow of a liquid through a pipeline?",
      option_a: "Venturimeter",
      option_b: "Barometer",
      option_c: "Hygrometer",
      option_d: "Viscometer",
      correct_option: "A",
      explanation: "Step 1: A venturimeter consists of a converging section, a constricted throat, and a diverging diffuser.\n\nStep 2: By measuring the pressure drop between the inlet pipe and the narrow throat with a differential manometer, Bernoulli's equation yields the volumetric flow rate Q.\n\nStep 3: Hence, the venturimeter is designed specifically to measure discharge rate based on Bernoulli's principle.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4774, // Q79
    similar_question: {
      question: "A light slider wire of length 20 cm is supported horizontally by a thin liquid film in a U-shaped wire frame. If the maximum downward weight (including the slider's own mass) that the film can support before breaking is 1.6 × 10⁻² N, what is the surface tension of the liquid?",
      option_a: "0.04 N/m",
      option_b: "0.08 N/m",
      option_c: "0.02 N/m",
      option_d: "0.01 N/m",
      correct_option: "A",
      explanation: "Step 1: A liquid film has two surfaces in contact with the slider wire of length L = 20 cm = 0.20 m.\n\nStep 2: The upward surface tension force is F = 2 T L.\n\nStep 3: In equilibrium, F = W  →  2 T L = 1.6 × 10⁻² N.\n\nStep 4: Solve for T:\nT = (1.6 × 10⁻² N) / [ 2 × 0.20 m ] = (1.6 × 10⁻²) / 0.40 = 0.04 N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4775, // Q80
    similar_question: {
      question: "The contact angle θ at the interface of a liquid, solid, and surrounding gas depends fundamentally on:",
      option_a: "The nature of both the liquid and the solid, and the purity of their interface",
      option_b: "The angle of inclination of the solid surface only",
      option_c: "The volume of liquid used",
      option_d: "The shape of the container",
      correct_option: "A",
      explanation: "Step 1: Young's equation balances interfacial surface tensions: γ_solid-gas = γ_solid-liquid + γ_liquid-gas cos θ.\n\nStep 2: Consequently, cos θ = (γ_solid-gas − γ_solid-liquid) / γ_liquid-gas.\n\nStep 3: This depends purely on the molecular adhesive and cohesive forces characteristic of the specific solid and liquid pair and surface cleanliness, completely independent of the macroscopic orientation or liquid volume.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 11 Part 2 (${set11Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set11Part2Updates) {
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
        console.log(`[${successCount}/${set11Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 11 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
